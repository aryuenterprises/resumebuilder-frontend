// // ─── Section Name ───────────────────────────────────────────────
// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";

// const TemplateOne: React.FC = () => {
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
//         contact?.postcode,

//     contact?.country,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedin || contact?.linkedin;
//   const portfolioUrl = contact?.portfolio || contact?.portfolio;

//   /* ======================================================
//      CSS — AUTO PAGE BREAK (NO MANUAL SPLIT)
//   ====================================================== */
//   const styles = `

// @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap');

//   body {
//     margin: 0;
//     background-color: white;
//   }

//   .resume-container {
//     width: 210mm;
//     min-height: 297mm;
//     padding: 15mm;
//     box-sizing: border-box;
//     background-color: white;
//   }

//   /* Header - Improved Alignment */
//   .contact-info {
//     text-align: center;
//     margin-bottom: 20px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid #eee;
//   }

//   .contact-info .name {
//     font-size: 24px;
//     font-weight: bold;
//     margin-bottom: 4px;
//     line-height: 1.2;
//   }

//   .contact-info .job-title {
//     font-size: 16px;
//     color: #333;
//     margin-bottom: 8px;
//     line-height: 1.3;
//   }

//   .contact-info .address {
//     font-size: 14px;
//     color: #666;
//     margin-bottom: 10px;
//     line-height: 1.4;
//   }

//   .contact-details {
//     font-size: 14px;
//     color: #444;
//     margin-bottom: 10px;
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 12px;
//   }

//   .contact-details span {
//     padding: 2px 8px;
//   }

//   .links {
//     margin-top: 5px;
//   }

//   .link-item {
//     color: #0077b5;
//     text-decoration: none;
//     font-size: 14px;
//     padding: 2px 8px;
//   }

//   /* Sections - Improved Alignment */
//   .section-content {
//     margin-bottom: 20px;
//     page-break-inside: avoid;
//   }

//   .section-title {
//     background: #f0f0f0;
//     padding: 6px 10px;
//     text-align: left;
//     font-weight: 700;
//     margin: 15px 0 10px;
//     font-size: 16px;
//     border-left: 3px solid #333;
//   }

//   /* Item Headers - Improved Alignment */
//   .item-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     margin-bottom: 6px;
//     flex-wrap: wrap;
//     gap: 10px;
//   }

//   .experience-header,
//   .education-header {
//     align-items: baseline;
//   }

//   .item-title-container {
//     min-width: 200px;
//   }

//   .item-title {
//     font-weight: 700;
//     font-size: 16px;
//     line-height: 1.3;
//     margin-bottom: 2px;
//     text-align:left
//   }

//   .item-subtitle {
//     font-size: 14px;
//     color: #555;
//     margin-top: 2px;
//     line-height: 1.4;
//   }

//   .item-date {
//     white-space: nowrap;
//     font-size: 12px;
//     color: #777;
//     min-width: fit-content;
//     text-align: right;
//   }

//   .experience-date,
//   .education-date {
//     font-size: 13px;
//     color: #666;
//     padding: 2px 6px;
//     background: #f8f8f8;
//     border-radius: 3px;
//   }

//   /* Content Areas - Improved Alignment */
//   .item-content {
//     font-size: 14px;
//     line-height: 1.6;
//     color: #444;
//     text-align: left;
//   }

//   .summary-text {
//     padding: 0 5px;
//     line-height: 1.7;
//   }

//   .experience-description,
//   .education-description {
//     margin-top: 5px;
//   }

//   /* List Styles - CRITICAL for bullet points */
//   .experience-description ul,
//   .education-description ul,
//   .experience-list ul,
//   .education-list ul {
//     list-style-type: disc !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .experience-description ol,
//   .education-description ol,
//   .experience-list ol,
//   .education-list ol {
//     list-style-type: decimal !important;
//     padding-left: 20px !important;
//     margin: 5px 0 !important;
//   }

//   .experience-description li,
//   .education-description li,
//   .experience-list li,
//   .education-list li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//     list-style-position: outside !important;
//   }

//   /* Force disc bullets for unordered lists */
//   ul, .ul, [class*="ul"] {
//     list-style-type: disc !important;
//   }

//   ul ul, .ul .ul {
//     list-style-type: circle !important;
//   }

//   ul ul ul, .ul .ul .ul {
//     list-style-type: square !important;
//   }

//   /* Education List */
//   .education-content {
//     margin-top: 5px;
//   }

//   .education-list {
//     margin: 5px 0;
//     padding-left: 20px;
//   }

//   .education-list li {
//     margin-bottom: 4px;
//     line-height: 1.5;
//   }

//   /* Skills - Improved Alignment */
//   .skills-grid {
//     display: grid;
//     grid-template-columns: repeat(2, 1fr);
//     gap: 12px;
//     margin-top: 10px;
//   }

//   .skill-item {
//     margin-bottom: 12px;
//   }

//   .skill-info {
//     display: flex;
//     flex-direction: column;
//     gap: 4px;
//   }

//   .skill-name {
//     font-size: 14px;
//     margin-bottom: 4px;
//     font-weight: 500;
//     text-align:left
//   }

//   .skill-bar {
//     height: 4px;
//     background: #e0e0e0;
//     border-radius: 2px;
//     overflow: hidden;
//     width: 100%;
//   }

//   .skill-level {
//     height: 100%;
//     background: #333;
//     border-radius: 2px;
//   }

//   /* Languages Grid */
//   .languages-grid {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   /* Additional Content - Improved Alignment */
//   .additional-content {
//     padding-left: 10px;
//   }

//   .additional-item {
//     margin-bottom: 8px;
//     line-height: 1.6;
//   }

//   .additional-item:last-child {
//     margin-bottom: 0;
//   }

//   /* Custom Sections - Improved Alignment */
//   .custom-section {
//     margin-bottom: 20px;
//   }

//   .custom-section-title {
//     margin-top: 20px;
//     margin-bottom: 10px;
//   }

//   .custom-section-content {
//     padding-left: 10px;
//   }

//   /* Print Styles - Improved */
//   @media print {
//     @page {
//       size: A4;
//       margin: 15mm;
//     }

//     body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }

//     .resume-container {
//       width: 100% !important;
//       padding: 0 !important;
//       margin: 0 !important;
//       box-shadow: none !important;
//     }

//     .no-print {
//       display: none !important;
//     }

//     /* Prevent page breaks inside important sections */
//     .resume-section {
//       page-break-inside: avoid;
//     }

//     .experience-item,
//     .education-item {
//       page-break-inside: avoid;
//     }

//     /* Ensure dates don't wrap in print */
//     .item-date {
//       white-space: nowrap;
//     }
//   }

//   /* Responsive improvements */
//   @media (max-width: 768px) {
//     .resume-container {
//       width: 100%;
//       padding: 10mm;
//     }

//     .skills-grid {
//       grid-template-columns: 1fr;
//       gap: 12px;
//     }

//     .item-header {
//       flex-direction: column;
//       align-items: flex-start;
//     }

//     .item-date {
//       text-align: left;
//       margin-top: 2px;
//     }

//     .contact-details {
//       flex-direction: column;
//       align-items: center;
//       gap: 6px;
//     }
//   }
// `;

//   const generateHTML = () => {
//     // Helper: strip HTML tags (mirrors stripHtml used in React preview)
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     // Helper: render experience text exactly as React preview does
//     const renderExperienceText = (text: string) => {
//       if (!text) return "";

//       // Check if text contains HTML (has tags)
//       if (text.includes('<') && text.includes('>')) {
//         // If it already has list items, ensure they have proper styling
//         if (text.includes('<ul>') || text.includes('<ol>') || text.includes('<li>')) {
//           return `<div class="item-content experience-description" style="list-style-type: disc !important;">${text}</div>`;
//         }
//         return `<div class="item-content experience-description">${text}</div>`;
//       }

//       // Check for bullet points in plain text
//       const lines = text.split("\n").filter((line) => line.trim() !== "");
//       if (lines.some((line) => line.trim().startsWith("-") || line.trim().startsWith("•"))) {
//         return `
//           <div class="item-content experience-description">
//             <ul class="experience-list" style="list-style-type: disc !important; padding-left: 20px; margin: 5px 0;">
//               ${lines
//                 .map((line) => {
//                   const trimmed = line.trim();
//                   if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
//                     return `<li style="margin-bottom: 4px; line-height: 1.5; list-style-type: disc !important;">${trimmed.substring(1).trim()}</li>`;
//                   } else if (trimmed) {
//                     return `<li style="margin-bottom: 4px; line-height: 1.5; list-style-type: disc !important;">${trimmed}</li>`;
//                   }
//                   return "";
//                 })
//                 .join("")}
//             </ul>
//           </div>`;
//       } else {
//         return `<div class="item-content experience-description" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//       }
//     };

//     // Helper: render education text exactly as React preview does
//     const renderEducationText = (text: string) => {
//       if (!text) return "";

//       // Check if text contains HTML
//       if (text.includes('<') && text.includes('>')) {
//         if (text.includes('<ul>') || text.includes('<ol>') || text.includes('<li>')) {
//           return `<div class="item-content education-description" style="list-style-type: disc !important;">${text}</div>`;
//         }
//         return `<div class="item-content education-description">${text}</div>`;
//       }

//       const lines = text.split("\n").filter((line) => line.trim() !== "");
//       if (lines.some((line) => line.trim().startsWith("-") || line.trim().startsWith("•"))) {
//         return `
//           <div class="education-content">
//             <ul class="education-list" style="list-style-type: disc !important; padding-left: 20px; margin: 5px 0;">
//               ${lines
//                 .map((line) => {
//                   const trimmed = line.trim();
//                   if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
//                     return `<li style="margin-bottom: 4px; line-height: 1.5; list-style-type: disc !important;">${trimmed.substring(1).trim()}</li>`;
//                   } else if (trimmed) {
//                     return `<li style="margin-bottom: 4px; line-height: 1.5; list-style-type: disc !important;">${trimmed}</li>`;
//                   }
//                   return "";
//                 })
//                 .join("")}
//             </ul>
//           </div>`;
//       } else {
//         return `<div class="item-content education-description" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//       }
//     };

//     return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8"/>
//       <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap" rel="stylesheet">
//       <style>${styles}</style>
//       <style>
//         /* Critical list styles to ensure bullets display correctly */
//         .experience-description ul,
//         .education-description ul,
//         .experience-list ul,
//         .education-list ul,
//         ul.experience-list,
//         ul.education-list {
//           list-style-type: disc !important;
//           padding-left: 20px !important;
//           margin: 5px 0 !important;
//         }

//         .experience-description ol,
//         .education-description ol,
//         .experience-list ol,
//         .education-list ol,
//         ol.experience-list,
//         ol.education-list {
//           list-style-type: decimal !important;
//           padding-left: 20px !important;
//           margin: 5px 0 !important;
//         }

//         .experience-description li,
//         .education-description li,
//         .experience-list li,
//         .education-list li {
//           margin-bottom: 4px !important;
//           line-height: 1.5 !important;
//           list-style-position: outside !important;
//         }

//         /* Force disc for any ul */
//         ul {
//           list-style-type: disc !important;
//         }

//         /* Override any potential browser defaults */
//         .item-content ul {
//           list-style-type: disc !important;
//         }

//         .wrap-break-word {
//           word-wrap: break-word;
//           overflow-wrap: break-word;
//         }
//       </style>

//     </head>
//     <body>
//       <div class="resume-container">

//         <!-- HEADER -->
//         <div class="contact-info">
//           <h2 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h2>
//           <div class="job-title">
//             ${
//               contact?.jobTitle
//                 ? typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""
//                 : ""
//             }
//           </div>
//           <div class="address">${addressParts.join(", ")}</div>
//           <div class="contact-details">
//             ${contact?.email ? `<span>${contact.email}</span>` : ""}
//             ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//           </div>
//           <div class="links">
//             ${
//               linkedinUrl
//                 ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>`
//                 : ""

//             }
//             ${
//               portfolioUrl
//                 ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>`
//                 : ""
//             }
//           </div>
//         </div>

//         <!-- SUMMARY -->
//         ${
//           summary
//             ? `<div class="section-content resume-section">
//                  <div class="section-title">Summary</div>
//                  <div class="item-content summary-text">${summary.replace(/\n/g, "<br>")}</div>
//                </div>`
//             : ""
//         }

//         <!-- EXPERIENCE -->
//         ${
//           experiences.length > 0
//             ? `<div class="section-content resume-section">
//                  <div class="section-title">Experience</div>
//                  ${experiences
//                    .map((exp) => {
//                      const startFormatted = formatMonthYear(
//                        exp.startDate,
//                        true,
//                      );
//                      const endFormatted = exp.endDate
//                        ? formatMonthYear(exp.endDate, true)
//                        : "Present";
//                      return `
//                        <div class="experience-item" style="margin-bottom:16px">
//                          <div class="item-header experience-header">
//                            <div class="item-title-container">
//                              <div class="item-title">${exp.jobTitle || ""}</div>
//                              <div class="item-subtitle">
//                                ${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}
//                              </div>
//                            </div>
//                            <div class="item-date experience-date">
//                              ${startFormatted} - ${endFormatted}
//                            </div>
//                          </div>
//                          ${
//                            exp.text
//                              ? renderExperienceText(exp.text)
//                              : ""
//                          }
//                        </div>`;
//                    })
//                    .join("")}
//                </div>`
//             : ""
//         }

//         <!-- EDUCATION -->
//         ${
//           educations.length > 0
//             ? `<div class="section-content resume-section">
//                  <div class="section-title">Education</div>
//                  ${educations
//                    .map((edu, index) => {
//                      const dateStr =
//                        edu.startDate || edu.endDate
//                          ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " - " : ""}${edu.endDate || ""}`
//                          : "";
//                      return `
//                        <div class="education-item" style="margin-bottom:16px">
//                          <div class="item-header education-header">
//                            <div class="item-title-container">
//                              <div class="item-title">${edu.schoolname || ""}</div>
//                              ${
//                                edu.degree || edu.location
//                                  ? `<div class="item-subtitle">
//                                       ${edu.degree ? `<span>${edu.degree}</span>` : ""}
//                                       ${edu.degree && edu.location ? " — " : ""}
//                                       ${edu.location ? `<span>${edu.location}</span>` : ""}
//                                     </div>`
//                                  : ""
//                              }
//                            </div>
//                            ${dateStr ? `<div class="item-date education-date">${dateStr}</div>` : ""}
//                          </div>
//                          ${renderEducationText(edu.text || "")}
//                        </div>`;
//                    })
//                    .join("")}
//                </div>`
//             : ""
//         }

//         <!-- SKILLS -->
//         ${
//           skills.length > 0
//             ? `<div class="section-content resume-section">
//                  <div class="section-title">Skills</div>
//                  <div class="skills-grid">
//                    ${skills
//                      .map(
//                        (s) => `
//                          <div class="skill-item">
//                            <div class="skill-info">
//                              <div class="skill-name">${s.skill || ""}</div>
//                              ${
//                                s.skill && s.level
//                                  ? `<div class="skill-bar">
//                                       <div class="skill-level" style="width:${(Number(s.level) / 4) * 100}%"></div>
//                                     </div>`
//                                  : ""
//                              }
//                            </div>
//                          </div>`,
//                      )
//                      .join("")}
//                  </div>
//                </div>`
//             : ""
//         }

//         <!-- LANGUAGES -->
//         ${
//           finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.languages) &&
//           finalize.languages.some(
//             (lang) => lang.name && lang.name.trim() !== "",
//           )
//             ? `<div class="section-content resume-section">
//                  <div class="section-title">Languages</div>
//                  <div class="skills-grid languages-grid">
//                    ${finalize.languages
//                      .filter((lang) => lang.name && lang.name.trim() !== "")
//                      .map(
//                        (lang) => `
//                          <div class="skill-item">
//                            <div class="skill-name">${lang.name}</div>
//                            ${
//                              lang.level
//                                ? `<div class="skill-bar">
//                                     <div class="skill-level" style="width:${(Number(lang.level) / 4) * 100}%"></div>
//                                   </div>`
//                                : ""
//                            }
//                          </div>`,
//                      )
//                      .join("")}
//                  </div>
//                </div>`
//             : ""
//         }

//         <!-- CERTIFICATIONS -->
//         ${
//           finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.certificationsAndLicenses) &&
//           finalize.certificationsAndLicenses.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           )
//             ? `<div class="section-content resume-section">
//                  <div class="section-title">Certifications and Licenses</div>
//                  <div class="item-content additional-content">
//                    ${finalize.certificationsAndLicenses
//                      .filter(
//                        (item) =>
//                          item.name &&
//                          item.name.replace(/<[^>]*>/g, "").trim() !== "",
//                      )
//                      .map(
//                        (item) =>
//                          `<div class="additional-item">${item.name}</div>`,
//                      )
//                      .join("")}
//                  </div>
//                </div>`
//             : ""
//         }

//         <!-- HOBBIES -->
//         ${
//           finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.hobbiesAndInterests) &&
//           finalize.hobbiesAndInterests.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           )
//             ? `<div class="section-content resume-section">
//                  <div class="section-title">Hobbies and Interests</div>
//                  <div class="item-content additional-content">
//                    ${finalize.hobbiesAndInterests
//                      .filter(
//                        (item) =>
//                          item.name &&
//                          item.name.replace(/<[^>]*>/g, "").trim() !== "",
//                      )
//                      .map(
//                        (item) =>
//                          `<div class="additional-item">${item.name}</div>`,
//                      )
//                      .join("")}
//                  </div>
//                </div>`
//             : ""
//         }

//         <!-- AWARDS -->
//         ${
//           finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.awardsAndHonors) &&
//           finalize.awardsAndHonors.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           )
//             ? `<div class="section-content resume-section">
//                  <div class="section-title">Awards and Honors</div>
//                  <div class="item-content additional-content">
//                    ${finalize.awardsAndHonors
//                      .filter(
//                        (item) =>
//                          item.name &&
//                          item.name.replace(/<[^>]*>/g, "").trim() !== "",
//                      )
//                      .map(
//                        (item) =>
//                          `<div class="additional-item">${item.name}</div>`,
//                      )
//                      .join("")}
//                  </div>
//                </div>`
//             : ""
//         }

//         <!-- WEBSITES -->
//         ${
//           finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.websitesAndSocialMedia) &&
//           finalize.websitesAndSocialMedia.some(
//             (item) =>
//               (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//               (item.socialMedia && item.socialMedia.trim() !== ""),
//           )
//             ? `<div class="section-content resume-section">
//                  <div class="section-title">Websites and Social Media</div>
//                  <div class="item-content additional-content">
//                    ${finalize.websitesAndSocialMedia
//                      .filter((item) => item.websiteUrl || item.socialMedia)
//                      .map(
//                        (item) => `
//                          <div class="additional-item">
//                            ${item.websiteUrl ? `<div>Website: ${item.websiteUrl}</div>` : ""}
//                            ${item.socialMedia ? `<div>Social Media: ${item.socialMedia}</div>` : ""}
//                          </div>`,
//                      )
//                      .join("")}
//                  </div>
//                </div>`
//             : ""
//         }

//         <!-- REFERENCES -->
//         ${
//           finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.references) &&
//           finalize.references.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           )
//             ? `<div class="section-content resume-section">
//                  <div class="section-title">References</div>
//                  <div class="item-content additional-content">
//                    ${finalize.references
//                      .filter(
//                        (item) =>
//                          item.name &&
//                          item.name.replace(/<[^>]*>/g, "").trim() !== "",
//                      )
//                      .map(
//                        (item) =>
//                          `<div class="additional-item">${item.name}</div>`,
//                      )
//                      .join("")}
//                  </div>
//                </div>`
//             : ""
//         }

//         <!-- CUSTOM SECTIONS -->
//         ${
//           finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.customSection) &&
//           finalize.customSection.some(
//             (section) => section?.name?.trim() || section?.description?.trim(),
//           )
//             ? `<div class="section-content resume-section">
//                  ${finalize.customSection
//                    .filter(
//                      (section) =>
//                        section?.name?.trim() || section?.description?.trim(),
//                    )
//                    .map(
//                      (section) => `
//                        <div class="custom-section">
//                          ${section.name ? `<div class="section-title custom-section-title">${section.name}</div>` : ""}
//                          ${section.description ? `<div class="item-content custom-section-content">${section.description}</div>` : ""}
//                        </div>`,
//                    )
//                    .join("")}
//                </div>`
//             : ""
//         }

//       </div>
//     </body>
//     </html>
//   `;
//   };

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

//   const stripHtml = (html: string) => {
//     return html?.replace(/<\/?[^>]+(>|$)/g, "") || "";
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: 0 }}>
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

//       {/* Resume Preview - Single page view for UI */}
//       <div
//         className="resume-container bg-white"
//         style={{ margin: "0 auto", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
//       >
//         <style>{styles}</style>

//         {/* HEADER - Alignment improvements */}
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
//           <div className="section-content resume-section">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content summary-text"
//               dangerouslySetInnerHTML={{
//                 __html: summary.replace(/\n/g, "<br>"),
//               }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE  */}
//         {experiences.length > 0 && (
//           <div className="section-content resume-section">
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
//                       {exp.employer} {exp.location && `— ${exp.location}`}
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
//           <div className="section-content resume-section">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => {
//               let textContent = null;
//               if (edu.text) {
//                 const lines = edu.text
//                   .split("\n")
//                   .filter((line) => line.trim() !== "");
//                 if (lines.some((line) => line.trim().startsWith("-"))) {
//                   textContent = (
//                     <div className="education-content">
//                       <ul className="education-list">
//                         {lines.map((line, i) => {
//                           const trimmed = line.trim();
//                           if (trimmed.startsWith("-")) {
//                             return (
//                               <li key={i}>{trimmed.substring(1).trim()}</li>
//                             );
//                           } else if (trimmed) {
//                             return <li key={i}>{trimmed}</li>;
//                           }
//                           return null;
//                         })}
//                       </ul>
//                     </div>
//                   );
//                 } else {
//                   textContent = (
//                     <div
//                       className="item-content education-description"
//                       style={{ whiteSpace: "pre-wrap" }}
//                     >
//                       {stripHtml(edu.text)}
//                     </div>
//                   );
//                 }
//               }

//               return (
//                 <div
//                   key={edu.id || edu.id || index}
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

//         {/* SKILLS  */}
//         {skills.length > 0 && (
//           <div className="section-content resume-section">
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

//         {/* Languages Section */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize.languages) &&
//           finalize.languages.some(
//             (lang) => lang.name && lang.name.trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
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

//         {/* Additional Sections */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.certificationsAndLicenses) &&
//           finalize.certificationsAndLicenses.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
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

//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.hobbiesAndInterests) &&
//           finalize.hobbiesAndInterests.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
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

//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.awardsAndHonors) &&
//           finalize.awardsAndHonors.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
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

//         {/* Websites and Social Media */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.websitesAndSocialMedia) &&
//           finalize.websitesAndSocialMedia.some(
//             (item) =>
//               (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//               (item.socialMedia && item.socialMedia.trim() !== ""),
//           ) && (
//             <div className="section-content resume-section">
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

//         {/* References */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.references) &&
//           finalize.references.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
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

//         {/* Custom Sections */}
//         {finalize &&
//           !Array.isArray(finalize) &&
//           Array.isArray(finalize?.customSection) &&
//           finalize.customSection.some(
//             (section) => section?.name?.trim() || section?.description?.trim(),
//           ) && (
//             <div className="section-content resume-section">
//               {finalize.customSection
//                 .filter(
//                   (section) =>
//                     section?.name?.trim() || section?.description?.trim(),
//                 )
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
//     </div>
//   );
// };

// export default TemplateOne;

// ─── Template One (Fixed) ───────────────────────────────────────────────
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
import { AllData } from "@/app/types";

interface ResumeProps {
  alldata?: AllData;
}

const TemplateOne: React.FC<ResumeProps> = ({ alldata }) => {
  console.log("alldata", alldata);

  const context = useContext(CreateContext);
  console.log("context,", context);

  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const contact = alldata?.contact || context.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills || context?.skills || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";

  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.postcode,
    contact?.country,
  ].filter(Boolean);

  const linkedinUrl = contact?.linkedin || contact?.linkedin;
  const portfolioUrl = contact?.portfolio || contact?.portfolio;

  /* ======================================================
     CSS — shared between preview & PDF
     Key fix: text-align:left on body + container,
     @page margin:0 on :first so the header flush,
     padding on .resume-container drives all spacing
  ====================================================== */
  const styles = `
  body {
    margin: 0;
    padding: 0;
    background-color: white;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
  }

  .resume-container {
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

  /* Global <p> reset — PDF renderers add 1em top+bottom margin by default */
resume-container  p {
    margin: 0 !important;
    padding: 0 !important;
    line-height: 1.5 !important;
  }

  /* ── HEADER ── */
  .contact-info {
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }

  .contact-info .name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 4px;
    line-height: 1.2;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .contact-info .job-title {
    font-size: 16px;
    color: #333;
    margin-bottom: 8px;
    line-height: 1.4;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .contact-info .address {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
    line-height: 1.5;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .contact-details {
    font-size: 14px;
    color: #444;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .contact-details span {
    padding: 2px 8px;
  }

  .links {
    margin-top: 5px;
    text-align: center;
  }

  .link-item {
    color: #0077b5;
    text-decoration: none;
    font-size: 14px;
    padding: 2px 8px;
  }

  /* ── SECTIONS ── */
  .section-content {
    margin-bottom: 20px;
  }

  .section-title {
    background: #f0f0f0;
    padding: 6px 10px;
    text-align: left;
    font-weight: 700;
    margin: 15px 0 10px;
    font-size: 16px;
    line-height: 1.4;
    border-left: 3px solid #333;
    font-family: 'Poppins', Arial, sans-serif;
  }

  /* ── ITEM HEADERS ── */
  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 6px;
    flex-wrap: wrap;
    gap: 10px;
  }

  .experience-header,
  .education-header {
    align-items: baseline;
  }

  .item-title-container {
    min-width: 200px;
  }

  .item-title {
    font-weight: 700;
    font-size: 16px;
    line-height: 1.4;
    margin-bottom: 2px;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .item-subtitle {
    font-size: 14px;
    color: #555;
    margin-top: 2px;
    line-height: 1.5;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .item-date {
    white-space: nowrap;
    font-size: 12px;
    color: #777;
    min-width: fit-content;
    text-align: right;
  }

  .experience-date,
  .education-date {
    font-size: 13px;
    color: #666;
    padding: 2px 6px;
    background: #f8f8f8;
    border-radius: 3px;
    line-height: 1.5;
    font-family: 'Poppins', Arial, sans-serif;
  }

  /* ── CONTENT ── */
  .item-content {
    font-size: 14px;
    line-height: 1.5;
    color: #444;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
  }

  /* Reset <p> margins inside content so PDF renderer doesn't add extra spacing */
  .item-content p,
  .experience-description p,
  .education-description p,
  .summary-text p,
  .custom-section-content p,
  .additional-content p {
    margin: 0 !important;
    padding: 0 !important;
    line-height: 1.5 !important;
    font-size: 14px !important;
    font-family: 'Poppins', Arial, sans-serif !important;
  }

  /* Reset <br> spacing — PDF renderers sometimes double-space after <br> */
  .item-content br,
  .experience-description br,
  .education-description br {
    line-height: 1.5 !important;
  }

  .summary-text {
    padding: 0 5px;
    font-size: 14px;
    line-height: 1.5;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .experience-description,
  .education-description {
    margin-top: 5px;
    text-align: left;
    font-size: 14px;
    line-height: 1.5;
    font-family: 'Poppins', Arial, sans-serif;
  }

  /* ── LIST STYLES ── */
  .experience-description ul,
  .education-description ul,
  .experience-list,
  .education-list {
    list-style-type: disc !important;
    padding-left: 20px !important;
    margin: 5px 0 !important;
  }

  .experience-description ol,
  .education-description ol {
    list-style-type: decimal !important;
    padding-left: 20px !important;
    margin: 5px 0 !important;
  }

  .experience-description li,
  .education-description li,
  .experience-list li,
  .education-list li {
    margin-top: 0 !important;
    margin-bottom: 2px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    line-height: 1.5 !important;
    list-style-position: outside !important;
    font-size: 14px !important;
    font-family: 'Poppins', Arial, sans-serif !important;
  }

  ul, ol {
    margin-top: 2px !important;
    margin-bottom: 2px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  ul {
    list-style-type: disc !important;
  }

  ul ul { list-style-type: circle !important; }
  ul ul ul { list-style-type: square !important; }

  /* Global li reset — PDF renderer adds margin to li by default */
  li {
    margin-top: 0 !important;
    margin-bottom: 2px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    line-height: 1.5 !important;
  }

  .education-content {
    margin-top: 5px;
    text-align: left;
  }

  /* ── SKILLS ── */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 10px;
  }

  .skill-item {
    margin-bottom: 12px;
  }

  .skill-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .skill-name {
    font-size: 14px;
    margin-bottom: 4px;
    font-weight: 500;
    text-align: left;
    line-height: 1.5;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .skill-bar {
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
    overflow: hidden;
    width: 100%;
  }

  .skill-level {
    height: 100%;
    background: #333;
    border-radius: 2px;
  }

  .languages-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  /* ── ADDITIONAL ── */
  .additional-content {
    padding-left: 10px;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
  }

  .additional-item {
    margin-bottom: 8px;
    line-height: 1.5;
    font-size: 14px;
    text-align: left;
    font-family: 'Poppins', Arial, sans-serif;
  }

  .additional-item:last-child {
    margin-bottom: 0;
  }

  /* ── CUSTOM SECTIONS ── */
  .custom-section {
    margin-bottom: 20px;
  }

  .custom-section-title {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .custom-section-content {
    padding-left: 10px;
    text-align: left;
  }

  .wrap-break-word {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* ── PRINT ── */
  @media print {
    @page {
      size: A4;
      margin-top: 15mm;
      margin-bottom: 15mm;
    }

    @page :first {
      margin-top: 0;
    }

    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      margin: 0;
      padding: 0;
    }

    .resume-container {
      width: 210mm !important;
      padding: 15mm !important;
      margin: 0 !important;
      box-shadow: none !important;
      box-sizing: border-box !important;
    }

    .no-print {
      display: none !important;
    }

    .experience-item,
    .education-item {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .section-title {
      page-break-after: avoid;
      break-after: avoid;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .item-date {
      white-space: nowrap;
    }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .resume-container {
      width: 100%;
      padding: 10mm;
    }

    .skills-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .item-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .item-date {
      text-align: left;
      margin-top: 2px;
    }

    .contact-details {
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
  }
`;

  /* =====================================================
     HTML GENERATION — mirrors JSX preview exactly
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
<div class="resume-container">

  <!-- HEADER -->
  <div class="contact-info">
    <h2 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h2>
    <div class="job-title">${contact?.jobTitle ? (typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || "") : ""}</div>
    <div class="address">${addressParts.join(", ")}</div>
    <div class="contact-details">
      ${contact?.email ? `<span>${contact.email}</span>` : ""}
      ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
    </div>
    <div class="links">
      ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
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
        return `<div class="education-item" style="margin-bottom:16px">
        <div class="item-header education-header">
          <div class="item-title-container">
            <div class="item-title">${edu.schoolname || ""}</div>
            ${edu.degree || edu.location ? `<div class="item-subtitle">${edu.degree ? `<span>${edu.degree}</span>` : ""}${edu.degree && edu.location ? " — " : ""}${edu.location ? `<span>${edu.location}</span>` : ""}</div>` : ""}
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
  ${
    skills.length > 0
      ? `<div class="section-content">
    <div class="section-title">Skills</div>
    <div class="skills-grid">
      ${skills
        .map(
          (s) => `<div class="skill-item"><div class="skill-info">
        <div class="skill-name">${s.skill || ""}</div>
        ${s.skill && s.level ? `<div class="skill-bar"><div class="skill-level" style="width:${(Number(s.level) / 4) * 100}%"></div></div>` : ""}
      </div></div>`,
        )
        .join("")}
    </div>
  </div>`
      : ""
  }

  <!-- LANGUAGES -->
  ${
    finalize &&
    !Array.isArray(finalize) &&
    Array.isArray(finalize.languages) &&
    finalize.languages.some((l) => l.name && l.name.trim() !== "")
      ? `<div class="section-content">
    <div class="section-title">Languages</div>
    <div class="skills-grid languages-grid">
      ${finalize.languages
        .filter((l) => l.name && l.name.trim() !== "")
        .map(
          (l) => `<div class="skill-item">
        <div class="skill-name">${l.name}</div>
        ${l.level ? `<div class="skill-bar"><div class="skill-level" style="width:${(Number(l.level) / 4) * 100}%"></div></div>` : ""}
      </div>`,
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
    <div class="item-content additional-content">
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
    <div class="item-content additional-content">
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
    <div class="item-content additional-content">
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
    <div class="item-content additional-content">
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
    <div class="item-content additional-content">
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

  /* ======================================================
     PDF DOWNLOAD
  ====================================================== */
  // const handleDownload = async () => {
  //   try {
  //     const html = generateHTML();
  //     const res = await axios.post(
  //       `${API_URL}/api/candidates/generate-pdf`,
  //       { html },
  //       { responseType: "blob" },
  //     );
  //     const url = URL.createObjectURL(res.data);
  //     const a = document.createElement("a");

  //     console.log(a)

  //     a.href = url;
  //     a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     URL.revokeObjectURL(url);
  //       fetchOldResumeData()

  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //     alert("Failed to generate PDF. Please try again.");
  //   }
  // };

  // const fetchOldResumeData = async () => {
  //   try {
  //     const response = await axios.post(`${API_URL}/api/users/download-resume`, {
  //       userId: "69ccd736435d1233e16e79a6",
  //       message: "success",
  //       contactId: "69ccdd1e435d1233e16e7afb",
  //     });

  //     console.log("response", response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  interface Contact {
    firstName?: string;
    lastName?: string;
  }

  const UseContext = useContext(CreateContext);
  const Contactid = UseContext?.contact.contactId;
  const userDetails = getLocalStorage<User>("user_details");
  const userId = userDetails?.id;

  const handleDownload = async (): Promise<void> => {
    try {
      const html: string = generateHTML(); // Assuming this returns a string

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

      // We pass the pdfBlob directly to the next function
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
    <div style={{ textAlign: "center", marginTop: 0 }}>
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
        className="resume-container bg-white"
        style={{ margin: "0 auto", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
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
              return (
                <div
                  key={edu.id || index}
                  className="education-item"
                  style={{ marginBottom: "16px" }}
                >
                  <div className="item-header education-header">
                    <div className="item-title-container">
                      <div className="item-title">{edu.schoolname || ""}</div>
                      {(edu.degree || edu.location) && (
                        <div className="item-subtitle">
                          {edu.degree && <span>{edu.degree}</span>}
                          {edu.location && (
                            <>
                              {edu.degree && " — "}
                              <span>{edu.location}</span>
                            </>
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
        {skills.length > 0 && (
          <div className="section-content">
            <div className="section-title">Skills</div>
            <div className="skills-grid">
              {skills.map((skill, i) => (
                <div key={i} className="skill-item">
                  <div className="skill-info">
                    <div className="skill-name">{skill.skill}</div>
                    {skill.skill && skill.level && (
                      <div className="skill-bar">
                        <div
                          className="skill-level"
                          style={{
                            width: `${(Number(skill.level) / 4) * 100}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LANGUAGES */}
        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize.languages) &&
          finalize.languages.some((l) => l.name && l.name.trim() !== "") && (
            <div className="section-content">
              <div className="section-title">Languages</div>
              <div className="skills-grid languages-grid">
                {finalize.languages.map(
                  (lang, index) =>
                    lang.name &&
                    lang.name.trim() !== "" && (
                      <div key={lang._id || index} className="skill-item">
                        <div className="skill-name">{lang.name}</div>
                        {lang.level && (
                          <div className="skill-bar">
                            <div
                              className="skill-level"
                              style={{
                                width: `${(Number(lang.level) / 4) * 100}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
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
              <div className="item-content additional-content">
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
              <div className="item-content additional-content">
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
              <div className="item-content additional-content">
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
              <div className="item-content additional-content">
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
              <div className="item-content additional-content">
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
    </div>
  );
};

export default TemplateOne;
