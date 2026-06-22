// // ─── Creative Bold Resume Template - FIXED FONT WEIGHTS ───────────
// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";

// // const TemplateThirteen: React.FC = () => {
//   const TemplateThirteen: React.FC<ResumeProps> = ({ alldata }) => {

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

//   const linkedinUrl = contact?.linkedin;
//   const portfolioUrl = contact?.portfolio;

//   /* ======================================================
//      CSS — CREATIVE BOLD - FIXED FONT WEIGHTS
//   ====================================================== */
//   const styles = `

//     body {
//       background-color: #ffffff;
//       line-height: 1.5;
//       color: #111111;
//       -webkit-font-smoothing: antialiased;
//       -moz-osx-font-smoothing: grayscale;
//     }

//     .t13-resume  {
//           width: 210mm;

//       margin: 40px auto;
//       background: white;
//     }

//       .t13-resume.is-preview {
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

//     /* Header Section - BOLD */
//     .t13-resume .resume-header {
//       padding: 50px 50px 35px 50px;
//       background: #111111;
//       color: white;
//     }

//    .t13-resume .name {
//       font-size: 52px;
//       font-weight: 800;
//       font-style: normal;
//       letter-spacing: -1px;
//       margin-bottom: 15px;
//       color: white;
//       text-transform: uppercase;
//       line-height: 1.2;
//     }

//    .t13-resume .job-title {
//       font-size: 18px;
//       font-weight: 600;
//       font-style: normal;
//       color: #cccccc;
//       letter-spacing: 1px;
//       text-transform: uppercase;
//       margin-bottom: 25px;
//       padding-bottom: 20px;
//       border-bottom: 3px solid rgba(255,255,255,0.2);
//     }

//    .t13-resume .contact-section {
//       display: flex;
//       flex-wrap: wrap;
//       justify-content: space-between;
//       gap: 20px;
//       margin-top: 15px;
//     }

//     .t13-resume .contact-block {
//       flex: 1;
//       min-width: 200px;
//     }

//     .t13-resume .contact-label {
//       font-size: 11px;
//       font-weight: 700;
//       font-style: normal;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//       color: #888888;
//       margin-bottom: 8px;
//     }

//     .t13-resume .contact-value {
//       font-size: 14px;
//       font-weight: 500;
//       font-style: normal;
//       color: white;
//       line-height: 1.4;
//       word-break: break-word;
//     }

//     .t13-resume .contact-value a {
//       color: white;
//       text-decoration: none;
//       font-weight: 500;
//     }

//     .t13-resume .address-value {
//       font-size: 14px;
//       font-weight: 500;
//       font-style: normal;
//       color: white;
//       line-height: 1.4;
//     }

//     /* Main Content */
//     .t13-resume .resume-main {
//       padding: 40px 50px 50px 50px;
//       background: white;
//     }

//     /* Section Styles - BOLD */
//     .t13-resume .section {
//       margin-bottom: 35px;
//     }

//     .t13-resume .section:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .section-title {
//       font-size: 20px;
//       font-weight: 800;
//       font-style: normal;
//       text-transform: uppercase;
//       letter-spacing: 2px;
//       color: #111111;
//       margin-bottom: 20px;
//       padding-bottom: 10px;
//       border-bottom: 4px solid #111111;
//       display: inline-block;
//     }

//     /* Summary */
//     .t13-resume .summary-text {
//       font-size: 14px;
//       line-height: 1.7;
//       color: #333333;
//       font-weight: 500;
//       font-style: normal;
//     }

//     /* Experience Items */
//     .t13-resume .experience-item {
//       margin-bottom: 32px;
//     }

//     .t13-resume .experience-item:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .experience-header {
//       margin-bottom: 12px;
//     }

//     .t13-resume .experience-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t13-resume .experience-title {
//       font-size: 18px;
//       font-weight: 800;
//       font-style: normal;
//       color: #111111;
//     }

//     .t13-resume .experience-date {
//       font-size: 12px;
//       font-weight: 600;
//       font-style: normal;
//       color: #666666;
//       letter-spacing: 0.5px;
//     }

//     .t13-resume .experience-company {
//       font-size: 15px;
//       font-weight: 600;
//       font-style: normal;
//       color: #444444;
//       margin-top: 4px;
//     }

//     .t13-resume .experience-location {
//       font-size: 12px;
//       font-weight: 500;
//       font-style: normal;
//       color: #777777;
//       margin-top: 3px;
//     }

//     .t13-resume .experience-description {
//       margin-top: 12px;
//     }

//     /* Bullet points */
//     .t13-resume .experience-description ul,
//     .t13-resume .education-description ul {
//       list-style-type: none;
//       padding-left: 0;
//     }

//     .t13-resume .experience-description li,
//     .t13-resume .education-description li {
//       position: relative;
//       padding-left: 24px;
//       margin-bottom: 10px;
//       font-size: 14px;
//       font-weight: 500;
//       font-style: normal;
//       color: #444444;
//       line-height: 1.6;
//     }

//     .t13-resume .experience-description li::before,
//     .t13-resume .education-description li::before {
//       content: "◆";
//       position: absolute;
//       left: 4px;
//       color: #111111;
//       font-size: 12px;
//       font-weight: 800;
//     }

//     /* Education Items */
//     .t13-resume .education-item {
//       margin-bottom: 28px;
//     }

//     .t13-resume .education-item:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .education-header {
//       margin-bottom: 10px;
//     }

//     .t13-resume .education-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t13-resume .education-school {
//       font-size: 18px;
//       font-weight: 800;
//       font-style: normal;
//       color: #111111;
//     }

//     .t13-resume .education-date {
//       font-size: 12px;
//       font-weight: 600;
//       font-style: normal;
//       color: #666666;
//     }

//     .t13-resume .education-degree {
//       font-size: 14px;
//       font-weight: 600;
//       font-style: normal;
//       color: #444444;
//       margin-top: 4px;
//     }

//     .t13-resume .education-description {
//       margin-top: 10px;
//     }

//     /* Skills - BOLD TAGS */
//     .t13-resume .skills-container {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 12px;
//       margin-top: 10px;
//     }

//     .t13-resume .skill-item {
//       font-size: 13px;
//       font-weight: 700;
//       font-style: normal;
//       color: #111111;
//       background: #f5f5f5;
//       padding: 8px 18px;
//       border-radius: 30px;
//       letter-spacing: 0.5px;
//       text-transform: uppercase;
//     }

//     /* Additional content - BOLD STYLE */
//     .t13-resume .additional-container {
//       margin-top: 10px;
//       display: flex;
//       flex-wrap: wrap;
//       gap: 12px;
//     }

//     .t13-resume .additional-item {
//       font-size: 13px;
//       font-weight: 600;
//       font-style: normal;
//       color: #111111;
//       background: #f5f5f5;
//       padding: 8px 18px;
//       border-radius: 30px;
//       letter-spacing: 0.5px;
//     }

//     /* Custom Sections */
//     .t13-resume .custom-section {
//       margin-bottom: 24px;
//     }

//     .t13-resume .custom-section:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .custom-section-title {
//       font-size: 16px;
//       font-weight: 800;
//       font-style: normal;
//       color: #111111;
//       margin-bottom: 10px;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//     }

//     .t13-resume .custom-section-content {
//       font-size: 14px;
//       font-weight: 500;
//       font-style: normal;
//       color: #444444;
//       line-height: 1.6;
//       padding-left: 0;
//     }

//     /* Print Styles - EXACT SAME AS SCREEN */
//     @media print {
//       @page {
//         size: A4;
//         margin: 0;
//       }

//       // body {
//       //   background: white;
//       //   margin: 0;
//       //   padding: 0;
//       //   -webkit-print-color-adjust: exact;
//       //   print-color-adjust: exact;
//       // }

//       .t13-resume  {
//         margin: 0;
//         max-width: 100%;
//         box-shadow: none;
//         background: white;
//         margin: 0;
//         padding: 0;
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }

//       /* EXACT SAME PADDING AND STYLES */
//      .t13-resume  .resume-header {
//         background: #111111 !important;
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//         padding: 50px 50px 35px 50px !important;
//       }

//       .t13-resume .resume-main {
//         padding: 40px 50px 50px 50px !important;
//       }

//       .t13-resume .section-title {
//         border-bottom: 4px solid #111111 !important;
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }

//       .t13-resume .skill-item {
//         background: #f5f5f5 !important;
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }

//       .t13-resume .additional-item {
//         background: #f5f5f5 !important;
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }

//       /* FIX FONT WEIGHTS FOR PRINT */
//       .t13-resume .name {
//         font-weight: 800 !important;
//       }

//       .t13-resume .job-title {
//         font-weight: 600 !important;
//       }

//       .t13-resume .section-title {
//         font-weight: 800 !important;
//       }

//       .t13-resume .experience-title {
//         font-weight: 800 !important;
//       }

//       .t13-resume .experience-company {
//         font-weight: 600 !important;
//       }

//       .t13-resume .education-school {
//         font-weight: 800 !important;
//       }

//       .t13-resume .skill-item {
//         font-weight: 700 !important;
//       }

//       .t13-resume .additional-item {
//         font-weight: 600 !important;
//       }

//      .t13-resume .section {
//         page-break-inside: avoid;
//       }

//      .t13-resume .experience-item {
//         page-break-inside: avoid;
//       }
//     }

//     /* Responsive - CONSISTENT PADDING */
//     @media (max-width: 600px) {
//       .t13-resume  {
//         margin: 15px;
//       }

//      .t13-resume .resume-header {
//         padding: 30px 25px 25px 25px !important;
//       }

//       .t13-resume .resume-main {
//         padding: 25px 25px 35px 25px !important;
//       }

//       .t13-resume .name {
//         font-size: 32px;
//       }

//       .t13-resume .job-title {
//         font-size: 14px;
//       }

//       .t13-resume .contact-section {
//         flex-direction: column;
//         gap: 12px;
//       }

//       .t13-resume .section-title {
//         font-size: 18px;
//       }

//       .t13-resume .experience-title-row {
//         flex-direction: column;
//         gap: 5px;
//       }

//       .t13-resume .education-title-row {
//         flex-direction: column;
//         gap: 5px;
//       }

//       .t13-resume .skill-item {
//         font-size: 11px;
//         padding: 6px 14px;
//       }

//       .t13-resume .additional-item {
//         font-size: 11px;
//         padding: 6px 14px;
//       }
//     }
//   `;

//   const stripHtml = (html: string) => {
//     return html?.replace(/<\/?[^>]+(>|$)/g, "") || "";
//   };

//   const renderDescription = (text: string) => {
//     if (!text) return "";

//     if (text.includes("<") && text.includes(">")) {
//       return `<div class="experience-description">${text}</div>`;
//     }

//     const lines = text.split("\n").filter((line) => line.trim() !== "");
//     if (lines.some((line) => line.trim().startsWith("-") || line.trim().startsWith("•"))) {
//       return `
//         <div class="experience-description">
//           <ul>
//             ${lines
//               .map((line) => {
//                 const trimmed = line.trim();
//                 if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
//                   return `<li>${trimmed.substring(1).trim()}</li>`;
//                 } else if (trimmed) {
//                   return `<li>${trimmed}</li>`;
//                 }
//                 return "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//     } else {
//       return `<div class="experience-description" style="white-space: pre-wrap;">${stripHtml(text)}</div>`;
//     }
//   };

//   const generateHTML = () => {
//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8"/>
//         <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//         <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
//         <style>${styles}</style>
//       </head>
//       <body>
//         <div class="t13-resume ">
//           <!-- HEADER - BOLD DARK -->
//           <div class="resume-header">
//             <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//             <div class="job-title">${
//               contact?.jobTitle
//                 ? typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""
//                 : ""
//             }</div>
//             <div class="contact-section">
//               ${contact?.email ? `
//                 <div class="contact-block">
//                   <div class="contact-label">EMAIL</div>
//                   <div class="contact-value">${contact.email}</div>
//                 </div>
//               ` : ""}
//               ${contact?.phone ? `
//                 <div class="contact-block">
//                   <div class="contact-label">PHONE</div>
//                   <div class="contact-value">${contact.phone}</div>
//                 </div>
//               ` : ""}
//               ${addressParts.length ? `
//                 <div class="contact-block">
//                   <div class="contact-label">LOCATION</div>
//                   <div class="address-value">${addressParts.join(", ")}</div>
//                 </div>
//               ` : ""}
//             </div>
//             ${(linkedinUrl || portfolioUrl) ? `
//               <div class="contact-section" style="margin-top: 15px;">
//                 ${linkedinUrl ? `
//                   <div class="contact-block">
//                     <div class="contact-label">LINKEDIN</div>
//                     <div class="contact-value"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" target="_blank">${linkedinUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}</a></div>
//                   </div>
//                 ` : ""}
//                 ${portfolioUrl ? `
//                   <div class="contact-block">
//                     <div class="contact-label">PORTFOLIO</div>
//                     <div class="contact-value"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" target="_blank">${portfolioUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}</a></div>
//                   </div>
//                 ` : ""}
//               </div>
//             ` : ""}
//           </div>

//           <!-- MAIN CONTENT -->
//           <div class="resume-main">
//             <!-- SUMMARY -->
//             ${summary ? `
//               <div class="section">
//                 <h2 class="section-title">Profile</h2>
//                 <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//               </div>
//             ` : ""}

//             <!-- EXPERIENCE -->
//             ${experiences.length > 0 ? `
//               <div class="section">
//                 <h2 class="section-title">Experience</h2>
//                 ${experiences.map((exp) => {
//                   const startFormatted = formatMonthYear(exp.startDate, true);
//                   const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//                   return `
//                     <div class="experience-item">
//                       <div class="experience-header">
//                         <div class="experience-title-row">
//                           <span class="experience-title">${exp.jobTitle || ""}</span>
//                           <span class="experience-date">${startFormatted} — ${endFormatted}</span>
//                         </div>
//                         <div class="experience-company">${exp.employer || ""}${exp.location ? ` • ${exp.location}` : ""}</div>
//                       </div>
//                       ${exp.text ? renderDescription(exp.text) : ""}
//                     </div>
//                   `;
//                 }).join("")}
//               </div>
//             ` : ""}

//             <!-- EDUCATION -->
//             ${educations.length > 0 ? `
//               <div class="section">
//                 <h2 class="section-title">Education</h2>
//                 ${educations.map((edu) => {
//                   const dateStr = edu.startDate || edu.endDate
//                     ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " — " : ""}${edu.endDate || ""}`
//                     : "";
//                   return `
//                     <div class="education-item">
//                       <div class="education-header">
//                         <div class="education-title-row">
//                           <span class="education-school">${edu.schoolname || ""}</span>
//                           ${dateStr ? `<span class="education-date">${dateStr}</span>` : ""}
//                         </div>
//                         ${edu.degree ? `<div class="education-degree">${edu.degree}</div>` : ""}
//                       </div>
//                       ${edu.text ? `<div class="education-description">${renderDescription(edu.text)}</div>` : ""}
//                     </div>
//                   `;
//                 }).join("")}
//               </div>
//             ` : ""}

//             <!-- SKILLS - BOLD TAGS -->
//             ${skills.length > 0 ? `
//               <div class="section">
//                 <h2 class="section-title">Skills</h2>
//                 <div class="skills-container">
//                   ${skills.map((s) => `
//                     <span class="skill-item">${s.skill || ""}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- LANGUAGES -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some(l => l.name?.trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Languages</h2>
//                 <div class="skills-container">
//                   ${finalize.languages.filter(l => l.name?.trim()).map(l => `
//                     <span class="skill-item">${l.name}${l.level ? ` • ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- CERTIFICATIONS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some(c => c.name?.replace(/<[^>]*>/g, "").trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Certifications</h2>
//                 <div class="additional-container">
//                   ${finalize.certificationsAndLicenses.filter(c => c.name?.replace(/<[^>]*>/g, "").trim()).map(c => `
//                     <span class="additional-item">${c.name.replace(/<[^>]*>/g, "")}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- AWARDS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some(a => a.name?.replace(/<[^>]*>/g, "").trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Awards</h2>
//                 <div class="additional-container">
//                   ${finalize.awardsAndHonors.filter(a => a.name?.replace(/<[^>]*>/g, "").trim()).map(a => `
//                     <span class="additional-item">${a.name.replace(/<[^>]*>/g, "")}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- INTERESTS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some(h => h.name?.replace(/<[^>]*>/g, "").trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Interests</h2>
//                 <div class="additional-container">
//                   ${finalize.hobbiesAndInterests.filter(h => h.name?.replace(/<[^>]*>/g, "").trim()).map(h => `
//                     <span class="additional-item">${h.name.replace(/<[^>]*>/g, "")}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- CUSTOM SECTIONS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some(s => s?.name?.trim() || s?.description?.trim()) ? `
//               <div class="section">
//                 ${finalize.customSection.filter(s => s?.name?.trim() || s?.description?.trim()).map(s => `
//                   <div class="custom-section">
//                     ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
//                     ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
//                   </div>
//                 `).join("")}
//               </div>
//             ` : ""}
//           </div>
//         </div>
//       </body>
//       </html>
//     `;
//   };

//   const handleDownload = async () => {
//     try {
//       const html = generateHTML();
//       const res = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" }
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

//   return (
//     <div style={{ textAlign: "left", marginTop: 0 }}>
//       {lastSegment === "download-resume" && (
//         <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
//           <button
//             onClick={handleDownload}
//             style={{
//               backgroundColor: "#111111",
//               color: "#ffffff",
//               padding: "14px 32px",
//               fontSize: "14px",
//               fontWeight: "700",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontFamily: "inherit",
//               letterSpacing: "1px",
//               textTransform: "uppercase"
//             }}
//           >
//             Download Resume
//           </button>
//         </div>
//       )}

//       {/* Resume Preview - EXACT SAME AS DOWNLOAD */}
//       <div className={`t13-resume ${alldata ? 'is-preview' : ''}`}
//        style={{ margin: "0 auto",          boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : ""
//  }}>
//         <style>{styles}</style>

//         {/* HEADER - BOLD DARK */}
//         <div className="resume-header">
//           <h1 className="name">
//             {contact?.firstName} {contact?.lastName}
//           </h1>
//           <div className="job-title">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="contact-section">
//             {contact?.email && (
//               <div className="contact-block">
//                 <div className="contact-label">EMAIL</div>
//                 <div className="contact-value">{contact.email}</div>
//               </div>
//             )}
//             {contact?.phone && (
//               <div className="contact-block">
//                 <div className="contact-label">PHONE</div>
//                 <div className="contact-value">{contact.phone}</div>
//               </div>
//             )}
//             {addressParts.length > 0 && (
//               <div className="contact-block">
//                 <div className="contact-label">LOCATION</div>
//                 <div className="address-value">{addressParts.join(", ")}</div>
//               </div>
//             )}
//           </div>
//           {(linkedinUrl || portfolioUrl) && (
//             <div className="contact-section" style={{ marginTop: "15px" }}>
//               {linkedinUrl && (
//                 <div className="contact-block">
//                   <div className="contact-label">LINKEDIN</div>
//                   <div className="contact-value">
//                     <a
//                       href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       {linkedinUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}
//                     </a>
//                   </div>
//                 </div>
//               )}
//               {portfolioUrl && (
//                 <div className="contact-block">
//                   <div className="contact-label">PORTFOLIO</div>
//                   <div className="contact-value">
//                     <a
//                       href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       {portfolioUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}
//                     </a>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="resume-main">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section">
//               <h2 className="section-title">Profile</h2>
//               <div
//                 className="summary-text"
//                 dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
//               />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="section">
//               <h2 className="section-title">Experience</h2>
//               {experiences.map((exp, i) => (
//                 <div key={i} className="experience-item">
//                   <div className="experience-header">
//                     <div className="experience-title-row">
//                       <span className="experience-title">{exp.jobTitle}</span>
//                       <span className="experience-date">
//                         <MonthYearDisplay value={exp.startDate} shortYear /> —{" "}
//                         {exp.endDate ? (
//                           <MonthYearDisplay value={exp.endDate} shortYear />
//                         ) : (
//                           "Present"
//                         )}
//                       </span>
//                     </div>
//                     <div className="experience-company">
//                       {exp.employer}
//                       {exp.location && ` • ${exp.location}`}
//                     </div>
//                   </div>
//                   {exp.text && (
//                     <div
//                       className="experience-description"
//                       dangerouslySetInnerHTML={{ __html: exp.text }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* EDUCATION */}
//           {educations.length > 0 && (
//             <div className="section">
//               <h2 className="section-title">Education</h2>
//               {educations.map((edu, i) => (
//                 <div key={i} className="education-item">
//                   <div className="education-header">
//                     <div className="education-title-row">
//                       <span className="education-school">{edu.schoolname}</span>
//                       {(edu.startDate || edu.endDate) && (
//                         <span className="education-date">
//                           {edu.startDate || ""}
//                           {edu.startDate && edu.endDate && " — "}
//                           {edu.endDate || ""}
//                         </span>
//                       )}
//                     </div>
//                     {edu.degree && <div className="education-degree">{edu.degree}</div>}
//                   </div>
//                   {edu.text && (
//                     <div
//                       className="education-description"
//                       dangerouslySetInnerHTML={{ __html: edu.text }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* SKILLS - BOLD TAGS */}
//           {skills.length > 0 && (
//             <div className="section">
//               <h2 className="section-title">Skills</h2>
//               <div className="skills-container">
//                 {skills.map((skill, i) => (
//                   <span key={i} className="skill-item">
//                     {skill.skill}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* LANGUAGES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.languages) &&
//             finalize.languages.some((l) => l.name?.trim()) && (
//               <div className="section">
//                 <h2 className="section-title">Languages</h2>
//                 <div className="skills-container">
//                   {finalize.languages.map(
//                     (lang, i) =>
//                       lang.name?.trim() && (
//                         <span key={i} className="skill-item">
//                           {lang.name}
//                           {lang.level &&
//                             ` • ${Math.round((Number(lang.level) / 4) * 100)}%`}
//                         </span>
//                       )
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CERTIFICATIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some(
//               (c) => c.name?.replace(/<[^>]*>/g, "").trim()
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Certifications</h2>
//                 <div className="additional-container">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <span
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       )
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* AWARDS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.awardsAndHonors) &&
//             finalize.awardsAndHonors.some(
//               (a) => a.name?.replace(/<[^>]*>/g, "").trim()
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Awards</h2>
//                 <div className="additional-container">
//                   {finalize.awardsAndHonors.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <span
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       )
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* INTERESTS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some(
//               (h) => h.name?.replace(/<[^>]*>/g, "").trim()
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Interests</h2>
//                 <div className="additional-container">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <span
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       )
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim()
//             ) && (
//               <div className="section">
//                 {finalize.customSection.map(
//                   (section, i) =>
//                     (section?.name?.trim() || section?.description?.trim()) && (
//                       <div key={i} className="custom-section">
//                         {section.name && (
//                           <h3 className="custom-section-title">{section.name}</h3>
//                         )}
//                         {section.description && (
//                           <div
//                             className="custom-section-content"
//                             dangerouslySetInnerHTML={{ __html: section.description }}
//                           />
//                         )}
//                       </div>
//                     )
//                 )}
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateThirteen;

// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";

// const TemplateThirteen: React.FC<ResumeProps> = ({ alldata }) => {
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

//   const linkedinUrl = contact?.linkedin;
//   const portfolioUrl = contact?.portfolio;

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
//       // Categorized Skills - Each category with bold tags
//       return (
//         <div className="section">
//           <h2 className="section-title">Skills</h2>
//           {skills.map((category: any) => (
//             <div key={category.id} className="skill-category-block">
//               <div className="skill-category-title">{category.title}</div>
//               <div className="skills-container">
//                 {category.skills.map((skill: any) => (
//                   <span key={skill.id} className="skill-item">
//                     {skill.name}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     } else {
//       // Simple Skills - Bold tags in a single container
//       return (
//         <div className="section">
//           <h2 className="section-title">Skills</h2>
//           <div className="skills-container">
//             {skills.map((skill: any, index: number) => (
//               <span key={skill.id || index} className="skill-item">
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
//       <div className="section">
//         <h2 className="section-title">Projects</h2>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="experience-item">
//             <div className="experience-header">
//               <div className="experience-title-row">
//                 <span className="experience-title">{project.title}</span>
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
//                   className="experience-description"
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
//      CSS — CREATIVE BOLD - FIXED FONT WEIGHTS
//   ====================================================== */
//   const styles = `
//     body {
//       background-color: #ffffff;
//       line-height: 1.5;
//       color: #111111;
//       -webkit-font-smoothing: antialiased;
//       -moz-osx-font-smoothing: grayscale;
//     }

//     .t13-resume {
//       width: 210mm;
//       margin: 40px auto;
//       background: white;
//     }

//     .t13-resume.is-preview {
//       transform: scale(0.36);
//       transform-origin: top left;
//       width: 210mm;
//       height: auto;
//       max-height: none;
//       min-height: auto;
//       max-width: none;
//       min-width: auto;
//       overflow: visible;
//     }

//     /* Header Section - BOLD */
//     .t13-resume .resume-header {
//       padding: 50px 50px 35px 50px;
//       background: #111111;
//       color: white;
//     }

//     .t13-resume .name {
//       font-size: 52px;
//       font-weight: 800;
//       font-style: normal;
//       letter-spacing: -1px;
//       margin-bottom: 15px;
//       color: white;
//       text-transform: uppercase;
//       line-height: 1.2;
//     }

//     .t13-resume .job-title {
//       font-size: 18px;
//       font-weight: 600;
//       font-style: normal;
//       color: #cccccc;
//       letter-spacing: 1px;
//       text-transform: uppercase;
//       margin-bottom: 25px;
//       padding-bottom: 20px;
//       border-bottom: 3px solid rgba(255,255,255,0.2);
//     }

//     .t13-resume .contact-section {
//       display: flex;
//       flex-wrap: wrap;
//       justify-content: space-between;
//       gap: 20px;
//       margin-top: 15px;
//     }

//     .t13-resume .contact-block {
//       flex: 1;
//       min-width: 200px;
//     }

//     .t13-resume .contact-label {
//       font-size: 11px;
//       font-weight: 700;
//       font-style: normal;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//       color: #888888;
//       margin-bottom: 8px;
//     }

//     .t13-resume .contact-value {
//       font-size: 14px;
//       font-weight: 500;
//       font-style: normal;
//       color: white;
//       line-height: 1.4;
//       word-break: break-word;
//     }

//     .t13-resume .contact-value a {
//       color: white;
//       text-decoration: none;
//       font-weight: 500;
//     }

//     .t13-resume .address-value {
//       font-size: 14px;
//       font-weight: 500;
//       font-style: normal;
//       color: white;
//       line-height: 1.4;
//     }

//     /* Main Content */
//     .t13-resume .resume-main {
//       padding: 40px 50px 50px 50px;
//       background: white;
//     }

//     /* Section Styles - BOLD */
//     .t13-resume .section {
//       margin-bottom: 35px;
//     }

//     .t13-resume .section:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .section-title {
//       font-size: 20px;
//       font-weight: 800;
//       font-style: normal;
//       text-transform: uppercase;
//       letter-spacing: 2px;
//       color: #111111;
//       margin-bottom: 20px;
//       padding-bottom: 10px;
//       border-bottom: 4px solid #111111;
//       display: inline-block;
//     }

//     /* Summary */
//     .t13-resume .summary-text {
//       font-size: 14px;
//       line-height: 1.7;
//       color: #333333;
//       font-weight: 500;
//       font-style: normal;
//     }

//     /* Experience Items */
//     .t13-resume .experience-item {
//       margin-bottom: 32px;
//     }

//     .t13-resume .experience-item:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .experience-header {
//       margin-bottom: 12px;
//     }

//     .t13-resume .experience-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t13-resume .experience-title {
//       font-size: 18px;
//       font-weight: 800;
//       font-style: normal;
//       color: #111111;
//     }

//     .t13-resume .experience-date {
//       font-size: 12px;
//       font-weight: 600;
//       font-style: normal;
//       color: #666666;
//       letter-spacing: 0.5px;
//     }

//     .t13-resume .experience-company {
//       font-size: 15px;
//       font-weight: 600;
//       font-style: normal;
//       color: #444444;
//       margin-top: 4px;
//     }

//     .t13-resume .experience-location {
//       font-size: 12px;
//       font-weight: 500;
//       font-style: normal;
//       color: #777777;
//       margin-top: 3px;
//     }

//     .t13-resume .experience-description {
//       margin-top: 12px;
//     }

//     /* Bullet points */
//     .t13-resume .experience-description ul,
//     .t13-resume .education-description ul {
//       list-style-type: none;
//       padding-left: 0;
//     }

//     .t13-resume .experience-description li,
//     .t13-resume .education-description li {
//       position: relative;
//       padding-left: 24px;
//       margin-bottom: 10px;
//       font-size: 14px;
//       font-weight: 500;
//       font-style: normal;
//       color: #444444;
//       line-height: 1.6;
//     }

//     .t13-resume .experience-description li::before,
//     .t13-resume .education-description li::before {
//       content: "◆";
//       position: absolute;
//       left: 4px;
//       color: #111111;
//       font-size: 12px;
//       font-weight: 800;
//     }

//     /* Education Items */
//     .t13-resume .education-item {
//       margin-bottom: 28px;
//     }

//     .t13-resume .education-item:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .education-header {
//       margin-bottom: 10px;
//     }

//     .t13-resume .education-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t13-resume .education-school {
//       font-size: 18px;
//       font-weight: 800;
//       font-style: normal;
//       color: #111111;
//     }

//     .t13-resume .education-date {
//       font-size: 12px;
//       font-weight: 600;
//       font-style: normal;
//       color: #666666;
//     }

//     .t13-resume .education-degree {
//       font-size: 14px;
//       font-weight: 600;
//       font-style: normal;
//       color: #444444;
//       margin-top: 4px;
//     }

//     .t13-resume .education-description {
//       margin-top: 10px;
//     }

//     /* SKILLS - BOLD TAGS */
//     .t13-resume .skills-container {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 12px;
//       margin-top: 10px;
//     }

//     .t13-resume .skill-item {
//       font-size: 13px;
//       font-weight: 700;
//       font-style: normal;
//       color: #111111;
//       background: #f5f5f5;
//       padding: 8px 18px;
//       border-radius: 30px;
//       letter-spacing: 0.5px;
//       text-transform: uppercase;
//     }

//     /* Categorized Skills */
//     .t13-resume .skill-category-block {
//       margin-bottom: 20px;
//     }

//     .t13-resume .skill-category-block:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .skill-category-title {
//       font-size: 16px;
//       font-weight: 700;
//       color: #111111;
//       margin-bottom: 12px;
//       padding-bottom: 5px;
//       border-bottom: 2px solid #111111;
//       display: inline-block;
//     }

//     /* PROJECTS */
//     .t13-resume .project-links {
//       display: flex;
//       gap: 15px;
//     }

//     .t13-resume .project-link {
//       font-size: 11px;
//       font-weight: 600;
//       color: #666666;
//       text-decoration: underline;
//     }

//     .t13-resume .project-tech-stack {
//       font-size: 12px;
//       font-weight: 500;
//       color: #777777;
//       margin: 6px 0;
//     }

//     /* Additional content - BOLD STYLE */
//     .t13-resume .additional-container {
//       margin-top: 10px;
//       display: flex;
//       flex-wrap: wrap;
//       gap: 12px;
//     }

//     .t13-resume .additional-item {
//       font-size: 13px;
//       font-weight: 600;
//       font-style: normal;
//       color: #111111;
//       background: #f5f5f5;
//       padding: 8px 18px;
//       border-radius: 30px;
//       letter-spacing: 0.5px;
//     }

//     /* Custom Sections */
//     .t13-resume .custom-section {
//       margin-bottom: 24px;
//     }

//     .t13-resume .custom-section:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .custom-section-title {
//       font-size: 16px;
//       font-weight: 800;
//       font-style: normal;
//       color: #111111;
//       margin-bottom: 10px;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//     }

//     .t13-resume .custom-section-content {
//       font-size: 14px;
//       font-weight: 500;
//       font-style: normal;
//       color: #444444;
//       line-height: 1.6;
//       padding-left: 0;
//     }

//     /* Print Styles */
//     @media print {
//       @page {
//         size: A4;
//         margin: 0;
//       }

//       .t13-resume {
//         margin: 0;
//         max-width: 100%;
//         box-shadow: none;
//         background: white;
//         margin: 0;
//         padding: 0;
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }

//       .t13-resume .resume-header {
//         background: #111111 !important;
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//         padding: 50px 50px 35px 50px !important;
//       }

//       .t13-resume .resume-main {
//         padding: 40px 50px 50px 50px !important;
//       }

//       .t13-resume .section-title {
//         border-bottom: 4px solid #111111 !important;
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }

//       .t13-resume .skill-item {
//         background: #f5f5f5 !important;
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }

//       .t13-resume .additional-item {
//         background: #f5f5f5 !important;
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }

//       .t13-resume .name {
//         font-weight: 800 !important;
//       }

//       .t13-resume .job-title {
//         font-weight: 600 !important;
//       }

//       .t13-resume .section-title {
//         font-weight: 800 !important;
//       }

//       .t13-resume .experience-title {
//         font-weight: 800 !important;
//       }

//       .t13-resume .experience-company {
//         font-weight: 600 !important;
//       }

//       .t13-resume .education-school {
//         font-weight: 800 !important;
//       }

//       .t13-resume .skill-item {
//         font-weight: 700 !important;
//       }

//       .t13-resume .additional-item {
//         font-weight: 600 !important;
//       }

//       .t13-resume .section {
//         page-break-inside: avoid;
//       }

//       .t13-resume .experience-item {
//         page-break-inside: avoid;
//       }
//     }

//     /* Responsive */
//     @media (max-width: 600px) {
//       .t13-resume {
//         margin: 15px;
//       }

//       .t13-resume .resume-header {
//         padding: 30px 25px 25px 25px !important;
//       }

//       .t13-resume .resume-main {
//         padding: 25px 25px 35px 25px !important;
//       }

//       .t13-resume .name {
//         font-size: 32px;
//       }

//       .t13-resume .job-title {
//         font-size: 14px;
//       }

//       .t13-resume .contact-section {
//         flex-direction: column;
//         gap: 12px;
//       }

//       .t13-resume .section-title {
//         font-size: 18px;
//       }

//       .t13-resume .experience-title-row {
//         flex-direction: column;
//         gap: 5px;
//       }

//       .t13-resume .education-title-row {
//         flex-direction: column;
//         gap: 5px;
//       }

//       .t13-resume .skill-item {
//         font-size: 11px;
//         padding: 6px 14px;
//       }

//       .t13-resume .additional-item {
//         font-size: 11px;
//         padding: 6px 14px;
//       }

//       .t13-resume .project-links {
//         margin-top: 6px;
//       }
//     }
//   `;

//   const stripHtml = (html: string) => {
//     return html?.replace(/<\/?[^>]+(>|$)/g, "") || "";
//   };

//   const renderDescription = (text: string) => {
//     if (!text) return "";

//     if (text.includes("<") && text.includes(">")) {
//       return `<div class="experience-description">${text}</div>`;
//     }

//     const lines = text.split("\n").filter((line) => line.trim() !== "");
//     if (lines.some((line) => line.trim().startsWith("-") || line.trim().startsWith("•"))) {
//       return `
//         <div class="experience-description">
//           <ul>
//             ${lines
//               .map((line) => {
//                 const trimmed = line.trim();
//                 if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
//                   return `<li>${trimmed.substring(1).trim()}</li>`;
//                 } else if (trimmed) {
//                   return `<li>${trimmed}</li>`;
//                 }
//                 return "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//     } else {
//       return `<div class="experience-description" style="white-space: pre-wrap;">${stripHtml(text)}</div>`;
//     }
//   };

//   const generateHTML = () => {
//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";

//       const isCategorized = isCategorizedSkills(skills);

//       if (isCategorized) {
//         return `
//           <div class="section">
//             <h2 class="section-title">Skills</h2>
//             ${skills.map((category: any) => `
//               <div class="skill-category-block">
//                 <div class="skill-category-title">${category.title}</div>
//                 <div class="skills-container">
//                   ${category.skills.map((skill: any) => `
//                     <span class="skill-item">${skill.name}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             `).join("")}
//           </div>
//         `;
//       } else {
//         return `
//           <div class="section">
//             <h2 class="section-title">Skills</h2>
//             <div class="skills-container">
//               ${skills.map((skill: any) => `
//                 <span class="skill-item">${skill.name || skill.skill}</span>
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
//         <div class="section">
//           <h2 class="section-title">Projects</h2>
//           ${projects.map((project: any) => `
//             <div class="experience-item">
//               <div class="experience-header">
//                 <div class="experience-title-row">
//                   <span class="experience-title">${project.title || ""}</span>
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 </div>
//                 ${project.techStack && project.techStack.length > 0 ? `
//                   <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//                 ` : ""}
//                 ${project.description ? `
//                   <div class="experience-description">${project.description}</div>
//                 ` : ""}
//               </div>
//             </div>
//           `).join("")}
//         </div>
//       `;
//     };

//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8"/>
//         <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//         <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
//         <style>${styles}</style>
//       </head>
//       <body>
//         <div class="t13-resume">
//           <!-- HEADER - BOLD DARK -->
//           <div class="resume-header">
//             <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//             <div class="job-title">${
//               contact?.jobTitle
//                 ? typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""
//                 : ""
//             }</div>
//             <div class="contact-section">
//               ${contact?.email ? `
//                 <div class="contact-block">
//                   <div class="contact-label">EMAIL</div>
//                   <div class="contact-value">${contact.email}</div>
//                 </div>
//               ` : ""}
//               ${contact?.phone ? `
//                 <div class="contact-block">
//                   <div class="contact-label">PHONE</div>
//                   <div class="contact-value">${contact.phone}</div>
//                 </div>
//               ` : ""}
//               ${addressParts.length ? `
//                 <div class="contact-block">
//                   <div class="contact-label">LOCATION</div>
//                   <div class="address-value">${addressParts.join(", ")}</div>
//                 </div>
//               ` : ""}
//             </div>
//             ${(linkedinUrl || portfolioUrl) ? `
//               <div class="contact-section" style="margin-top: 15px;">
//                 ${linkedinUrl ? `
//                   <div class="contact-block">
//                     <div class="contact-label">LINKEDIN</div>
//                     <div class="contact-value"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" target="_blank">${linkedinUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}</a></div>
//                   </div>
//                 ` : ""}
//                 ${portfolioUrl ? `
//                   <div class="contact-block">
//                     <div class="contact-label">PORTFOLIO</div>
//                     <div class="contact-value"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" target="_blank">${portfolioUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}</a></div>
//                   </div>
//                 ` : ""}
//               </div>
//             ` : ""}
//           </div>

//           <!-- MAIN CONTENT -->
//           <div class="resume-main">
//             <!-- SUMMARY -->
//             ${summary ? `
//               <div class="section">
//                 <h2 class="section-title">Profile</h2>
//                 <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//               </div>
//             ` : ""}

//             <!-- EXPERIENCE -->
//             ${experiences.length > 0 ? `
//               <div class="section">
//                 <h2 class="section-title">Experience</h2>
//                 ${experiences.map((exp) => {
//                   const startFormatted = formatMonthYear(exp.startDate, true);
//                   const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//                   return `
//                     <div class="experience-item">
//                       <div class="experience-header">
//                         <div class="experience-title-row">
//                           <span class="experience-title">${exp.jobTitle || ""}</span>
//                           <span class="experience-date">${startFormatted} — ${endFormatted}</span>
//                         </div>
//                         <div class="experience-company">${exp.employer || ""}${exp.location ? ` • ${exp.location}` : ""}</div>
//                       </div>
//                       ${exp.text ? renderDescription(exp.text) : ""}
//                     </div>
//                   `;
//                 }).join("")}
//               </div>
//             ` : ""}

//             <!-- PROJECTS -->
//             ${generateProjectsHTML()}

//             <!-- EDUCATION -->
//             ${educations.length > 0 ? `
//               <div class="section">
//                 <h2 class="section-title">Education</h2>
//                 ${educations.map((edu) => {
//                   const dateStr = edu.startDate || edu.endDate
//                     ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " — " : ""}${edu.endDate || ""}`
//                     : "";
//                   return `
//                     <div class="education-item">
//                       <div class="education-header">
//                         <div class="education-title-row">
//                           <span class="education-school">${edu.schoolname || ""}</span>
//                           ${dateStr ? `<span class="education-date">${dateStr}</span>` : ""}
//                         </div>
//                         ${edu.degree ? `<div class="education-degree">${edu.degree}</div>` : ""}
//                       </div>
//                       ${edu.text ? `<div class="education-description">${renderDescription(edu.text)}</div>` : ""}
//                     </div>
//                   `;
//                 }).join("")}
//               </div>
//             ` : ""}

//             <!-- SKILLS -->
//             ${generateSkillsHTML()}

//             <!-- LANGUAGES -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some(l => l.name?.trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Languages</h2>
//                 <div class="skills-container">
//                   ${finalize.languages.filter(l => l.name?.trim()).map(l => `
//                     <span class="skill-item">${l.name}${l.level ? ` • ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- CERTIFICATIONS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some(c => c.name?.replace(/<[^>]*>/g, "").trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Certifications</h2>
//                 <div class="additional-container">
//                   ${finalize.certificationsAndLicenses.filter(c => c.name?.replace(/<[^>]*>/g, "").trim()).map(c => `
//                     <span class="additional-item">${c.name.replace(/<[^>]*>/g, "")}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- AWARDS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some(a => a.name?.replace(/<[^>]*>/g, "").trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Awards</h2>
//                 <div class="additional-container">
//                   ${finalize.awardsAndHonors.filter(a => a.name?.replace(/<[^>]*>/g, "").trim()).map(a => `
//                     <span class="additional-item">${a.name.replace(/<[^>]*>/g, "")}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- INTERESTS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some(h => h.name?.replace(/<[^>]*>/g, "").trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Interests</h2>
//                 <div class="additional-container">
//                   ${finalize.hobbiesAndInterests.filter(h => h.name?.replace(/<[^>]*>/g, "").trim()).map(h => `
//                     <span class="additional-item">${h.name.replace(/<[^>]*>/g, "")}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- CUSTOM SECTIONS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some(s => s?.name?.trim() || s?.description?.trim()) ? `
//               <div class="section">
//                 ${finalize.customSection.filter(s => s?.name?.trim() || s?.description?.trim()).map(s => `
//                   <div class="custom-section">
//                     ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
//                     ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
//                   </div>
//                 `).join("")}
//               </div>
//             ` : ""}
//           </div>
//         </div>
//       </body>
//       </html>
//     `;
//   };

//   const handleDownload = async () => {
//     try {
//       const html = generateHTML();
//       const res = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" }
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

//   return (
//     <div style={{ textAlign: "left", marginTop: 0 }}>
//       {lastSegment === "download-resume" && (
//         <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
//           <button
//             onClick={handleDownload}
//             style={{
//               backgroundColor: "#111111",
//               color: "#ffffff",
//               padding: "14px 32px",
//               fontSize: "14px",
//               fontWeight: "700",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontFamily: "inherit",
//               letterSpacing: "1px",
//               textTransform: "uppercase"
//             }}
//           >
//             Download Resume
//           </button>
//         </div>
//       )}

//       {/* Resume Preview */}
//       <div className={`t13-resume ${alldata ? 'is-preview' : ''}`}
//         style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}>
//         <style>{styles}</style>

//         {/* HEADER - BOLD DARK */}
//         <div className="resume-header">
//           <h1 className="name">
//             {contact?.firstName} {contact?.lastName}
//           </h1>
//           <div className="job-title">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="contact-section">
//             {contact?.email && (
//               <div className="contact-block">
//                 <div className="contact-label">EMAIL</div>
//                 <div className="contact-value">{contact.email}</div>
//               </div>
//             )}
//             {contact?.phone && (
//               <div className="contact-block">
//                 <div className="contact-label">PHONE</div>
//                 <div className="contact-value">{contact.phone}</div>
//               </div>
//             )}
//             {addressParts.length > 0 && (
//               <div className="contact-block">
//                 <div className="contact-label">LOCATION</div>
//                 <div className="address-value">{addressParts.join(", ")}</div>
//               </div>
//             )}
//           </div>
//           {(linkedinUrl || portfolioUrl) && (
//             <div className="contact-section" style={{ marginTop: "15px" }}>
//               {linkedinUrl && (
//                 <div className="contact-block">
//                   <div className="contact-label">LINKEDIN</div>
//                   <div className="contact-value">
//                     <a
//                       href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       {linkedinUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}
//                     </a>
//                   </div>
//                 </div>
//               )}
//               {portfolioUrl && (
//                 <div className="contact-block">
//                   <div className="contact-label">PORTFOLIO</div>
//                   <div className="contact-value">
//                     <a
//                       href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       {portfolioUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}
//                     </a>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="resume-main">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section">
//               <h2 className="section-title">Profile</h2>
//               <div
//                 className="summary-text"
//                 dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
//               />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="section">
//               <h2 className="section-title">Experience</h2>
//               {experiences.map((exp, i) => (
//                 <div key={i} className="experience-item">
//                   <div className="experience-header">
//                     <div className="experience-title-row">
//                       <span className="experience-title">{exp.jobTitle}</span>
//                       <span className="experience-date">
//                         <MonthYearDisplay value={exp.startDate} shortYear /> —{" "}
//                         {exp.endDate ? (
//                           <MonthYearDisplay value={exp.endDate} shortYear />
//                         ) : (
//                           "Present"
//                         )}
//                       </span>
//                     </div>
//                     <div className="experience-company">
//                       {exp.employer}
//                       {exp.location && ` • ${exp.location}`}
//                     </div>
//                   </div>
//                   {exp.text && (
//                     <div
//                       className="experience-description"
//                       dangerouslySetInnerHTML={{ __html: exp.text }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* PROJECTS */}
//           {renderProjects()}

//           {/* EDUCATION */}
//           {educations.length > 0 && (
//             <div className="section">
//               <h2 className="section-title">Education</h2>
//               {educations.map((edu, i) => (
//                 <div key={i} className="education-item">
//                   <div className="education-header">
//                     <div className="education-title-row">
//                       <span className="education-school">{edu.schoolname}</span>
//                       {(edu.startDate || edu.endDate) && (
//                         <span className="education-date">
//                           {edu.startDate || ""}
//                           {edu.startDate && edu.endDate && " — "}
//                           {edu.endDate || ""}
//                         </span>
//                       )}
//                     </div>
//                     {edu.degree && <div className="education-degree">{edu.degree}</div>}
//                   </div>
//                   {edu.text && (
//                     <div
//                       className="education-description"
//                       dangerouslySetInnerHTML={{ __html: edu.text }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* SKILLS */}
//           {renderSkills()}

//           {/* LANGUAGES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.languages) &&
//             finalize.languages.some((l) => l.name?.trim()) && (
//               <div className="section">
//                 <h2 className="section-title">Languages</h2>
//                 <div className="skills-container">
//                   {finalize.languages.map(
//                     (lang, i) =>
//                       lang.name?.trim() && (
//                         <span key={i} className="skill-item">
//                           {lang.name}
//                           {lang.level &&
//                             ` • ${Math.round((Number(lang.level) / 4) * 100)}%`}
//                         </span>
//                       )
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CERTIFICATIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some(
//               (c) => c.name?.replace(/<[^>]*>/g, "").trim()
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Certifications</h2>
//                 <div className="additional-container">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <span
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       )
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* AWARDS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.awardsAndHonors) &&
//             finalize.awardsAndHonors.some(
//               (a) => a.name?.replace(/<[^>]*>/g, "").trim()
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Awards</h2>
//                 <div className="additional-container">
//                   {finalize.awardsAndHonors.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <span
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       )
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* INTERESTS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some(
//               (h) => h.name?.replace(/<[^>]*>/g, "").trim()
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Interests</h2>
//                 <div className="additional-container">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <span
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       )
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim()
//             ) && (
//               <div className="section">
//                 {finalize.customSection.map(
//                   (section, i) =>
//                     (section?.name?.trim() || section?.description?.trim()) && (
//                       <div key={i} className="custom-section">
//                         {section.name && (
//                           <h3 className="custom-section-title">{section.name}</h3>
//                         )}
//                         {section.description && (
//                           <div
//                             className="custom-section-content"
//                             dangerouslySetInnerHTML={{ __html: section.description }}
//                           />
//                         )}
//                       </div>
//                     )
//                 )}
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateThirteen;

// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateThirteen: React.FC<ResumeProps> = ({ alldata }) => {
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

//   const linkedinUrl = contact?.linkedin;
//   const portfolioUrl = contact?.portfolio;
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
//       // Categorized Skills - Each category with bold tags
//       return (
//         <div className="section">
//           <h2 className="section-title">Skills</h2>
//           {skills.map((category: any) => (
//             <div key={category.id} className="skill-category-block">
//               <div className="skill-category-title">{category.title}</div>
//               <div className="skills-container">
//                 {category.skills.map((skill: any) => (
//                   <span key={skill.id} className="skill-item">
//                     {skill.name}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     } else {
//       // Simple Skills - Bold tags in a single container
//       return (
//         <div className="section">
//           <h2 className="section-title">Skills</h2>
//           <div className="skills-container">
//             {skills.map((skill: any, index: number) => (
//               <span key={skill.id || index} className="skill-item">
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
//       <div className="section">
//         <h2 className="section-title">Projects</h2>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="experience-item">
//             <div className="experience-header">
//               <div className="experience-title-row">
//                 <span className="experience-title">{project.title}</span>
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
//                   className="experience-description"
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
//      CSS — CREATIVE BOLD - FIXED FONT WEIGHTS
//   ====================================================== */
//   const styles = `
//     body {
//       background-color: #ffffff;
//       line-height: 1.5;
//       color: #111111;
//       -webkit-font-smoothing: antialiased;
//       -moz-osx-font-smoothing: grayscale;
//     }

//     .t13-resume {
//       width: 210mm;
//       margin: 40px auto;
//       background: white;
//     }

//     .t13-resume.is-preview {
//       transform: scale(0.36);
//       transform-origin: top left;
//       width: 210mm;
//       height: auto;
//       max-height: none;
//       min-height: auto;
//       max-width: none;
//       min-width: auto;
//       overflow: visible;
//     }

//     /* Header Section - BOLD */
//     .t13-resume .resume-header {
//       padding: 50px 50px 35px 50px;
//       background: #111111;
//       color: white;
//     }

//     .t13-resume .name {
//       font-size: 52px;
//       font-weight: 800;
//       font-style: normal;
//       letter-spacing: -1px;
//       margin-bottom: 15px;
//       color: white;
//       text-transform: uppercase;
//       line-height: 1.2;
//     }

//     .t13-resume .job-title {
//       font-size: 18px;
//       font-weight: 600;
//       font-style: normal;
//       color: #cccccc;
//       letter-spacing: 1px;
//       text-transform: uppercase;
//       margin-bottom: 25px;
//       padding-bottom: 20px;
//       border-bottom: 3px solid rgba(255,255,255,0.2);
//     }

//     .t13-resume .contact-section {
//       display: flex;
//       flex-wrap: wrap;
//       justify-content: space-between;
//       gap: 20px;
//       margin-top: 15px;
//     }

//     .t13-resume .contact-block {
//       flex: 1;
//       min-width: 200px;
//     }

//     .t13-resume .contact-label {
//       font-size: 11px;
//       font-weight: 700;
//       font-style: normal;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//       color: #888888;
//       margin-bottom: 8px;
//     }

//     .t13-resume .contact-value {
//       font-size: 14px;
//       font-weight: 500;
//       font-style: normal;
//       color: white;
//       line-height: 1.4;
//       word-break: break-word;
//     }

//     .t13-resume .contact-value a {
//       color: white;
//       text-decoration: none;
//       font-weight: 500;
//     }

//     .t13-resume .address-value {
//       font-size: 14px;
//       font-weight: 500;
//       font-style: normal;
//       color: white;
//       line-height: 1.4;
//     }

//     /* Education Grade */
//     .t13-resume .education-grade {
//       font-size: 12px;
//       font-weight: 500;
//       color: #666666;
//       margin-top: 4px;
//     }

//     /* Main Content */
//     .t13-resume .resume-main {
//       padding: 40px 50px 50px 50px;
//       background: white;
//     }

//     /* Section Styles - BOLD */
//     .t13-resume .section {
//       margin-bottom: 35px;
//     }

//     .t13-resume .section:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .section-title {
//       font-size: 20px;
//       font-weight: 800;
//       font-style: normal;
//       text-transform: uppercase;
//       letter-spacing: 2px;
//       color: #111111;
//       margin-bottom: 20px;
//       padding-bottom: 10px;
//       border-bottom: 4px solid #111111;
//       display: inline-block;
//     }

//     /* Summary */
//     .t13-resume .summary-text {
//       font-size: 14px;
//       line-height: 1.7;
//       color: #333333;
//       font-weight: 500;
//       font-style: normal;
//     }

//     /* Experience Items */
//     .t13-resume .experience-item {
//       margin-bottom: 32px;
//     }

//     .t13-resume .experience-item:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .experience-header {
//       margin-bottom: 12px;
//     }

//     .t13-resume .experience-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t13-resume .experience-title {
//       font-size: 18px;
//       font-weight: 800;
//       font-style: normal;
//       color: #111111;
//     }

//     .t13-resume .experience-date {
//       font-size: 12px;
//       font-weight: 600;
//       font-style: normal;
//       color: #666666;
//       letter-spacing: 0.5px;
//     }

//     .t13-resume .experience-company {
//       font-size: 15px;
//       font-weight: 600;
//       font-style: normal;
//       color: #444444;
//       margin-top: 4px;
//     }

//     .t13-resume .experience-location {
//       font-size: 12px;
//       font-weight: 500;
//       font-style: normal;
//       color: #777777;
//       margin-top: 3px;
//     }

//     .t13-resume .experience-description {
//       margin-top: 12px;
//     }

//     /* Bullet points */
//     .t13-resume .experience-description ul,
//     .t13-resume .education-description ul {
//       list-style-type: none;
//       padding-left: 0;
//     }

//     .t13-resume .experience-description li,
//     .t13-resume .education-description li {
//       position: relative;
//       padding-left: 24px;
//       margin-bottom: 10px;
//       font-size: 14px;
//       font-weight: 500;
//       font-style: normal;
//       color: #444444;
//       line-height: 1.6;
//     }

//     .t13-resume .experience-description li::before,
//     .t13-resume .education-description li::before {
//       content: "◆";
//       position: absolute;
//       left: 4px;
//       color: #111111;
//       font-size: 12px;
//       font-weight: 800;
//     }

//     /* Education Items */
//     .t13-resume .education-item {
//       margin-bottom: 28px;
//     }

//     .t13-resume .education-item:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .education-header {
//       margin-bottom: 10px;
//     }

//     .t13-resume .education-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t13-resume .education-school {
//       font-size: 18px;
//       font-weight: 800;
//       font-style: normal;
//       color: #111111;
//     }

//     .t13-resume .education-date {
//       font-size: 12px;
//       font-weight: 600;
//       font-style: normal;
//       color: #666666;
//     }

//     .t13-resume .education-degree {
//       font-size: 14px;
//       font-weight: 600;
//       font-style: normal;
//       color: #444444;
//       margin-top: 4px;
//     }

//     .t13-resume .education-description {
//       margin-top: 10px;
//     }

//     /* SKILLS - BOLD TAGS */
//     .t13-resume .skills-container {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 12px;
//       margin-top: 10px;
//     }

//     .t13-resume .skill-item {
//       font-size: 13px;
//       font-weight: 700;
//       font-style: normal;
//       color: #111111;
//       background: #f5f5f5;
//       padding: 8px 18px;
//       border-radius: 30px;
//       letter-spacing: 0.5px;
//       text-transform: uppercase;
//     }

//     /* Categorized Skills */
//     .t13-resume .skill-category-block {
//       margin-bottom: 20px;
//     }

//     .t13-resume .skill-category-block:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .skill-category-title {
//       font-size: 16px;
//       font-weight: 700;
//       color: #111111;
//       margin-bottom: 12px;
//       padding-bottom: 5px;
//       border-bottom: 2px solid #111111;
//       display: inline-block;
//     }

//     /* PROJECTS */
//     .t13-resume .project-links {
//       display: flex;
//       gap: 15px;
//     }

//     .t13-resume .project-link {
//       font-size: 11px;
//       font-weight: 600;
//       color: #666666;
//       text-decoration: underline;
//     }

//     .t13-resume .project-tech-stack {
//       font-size: 12px;
//       font-weight: 500;
//       color: #777777;
//       margin: 6px 0;
//     }

//     /* Additional content - BOLD STYLE */
//     .t13-resume .additional-container {
//       margin-top: 10px;
//       display: flex;
//       flex-wrap: wrap;
//       gap: 12px;
//     }

//     .t13-resume .additional-item {
//       font-size: 13px;
//       font-weight: 600;
//       font-style: normal;
//       color: #111111;
//       background: #f5f5f5;
//       padding: 8px 18px;
//       border-radius: 30px;
//       letter-spacing: 0.5px;
//     }

//     /* Custom Sections */
//     .t13-resume .custom-section {
//       margin-bottom: 24px;
//     }

//     .t13-resume .custom-section:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .custom-section-title {
//       font-size: 16px;
//       font-weight: 800;
//       font-style: normal;
//       color: #111111;
//       margin-bottom: 10px;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//     }

//     .t13-resume .custom-section-content {
//       font-size: 14px;
//       font-weight: 500;
//       font-style: normal;
//       color: #444444;
//       line-height: 1.6;
//       padding-left: 0;
//     }

//     /* Print Styles */
//     @media print {
//       @page {
//         size: A4;
//         margin: 0;
//       }

//       .t13-resume {
//         margin: 0;
//         max-width: 100%;
//         box-shadow: none;
//         background: white;
//         margin: 0;
//         padding: 0;
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }

//       .t13-resume .resume-header {
//         background: #111111 !important;
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//         padding: 50px 50px 35px 50px !important;
//       }

//       .t13-resume .resume-main {
//         padding: 40px 50px 50px 50px !important;
//       }

//       .t13-resume .section-title {
//         border-bottom: 4px solid #111111 !important;
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }

//       .t13-resume .skill-item {
//         background: #f5f5f5 !important;
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }

//       .t13-resume .additional-item {
//         background: #f5f5f5 !important;
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }

//       .t13-resume .name {
//         font-weight: 800 !important;
//       }

//       .t13-resume .job-title {
//         font-weight: 600 !important;
//       }

//       .t13-resume .section-title {
//         font-weight: 800 !important;
//       }

//       .t13-resume .experience-title {
//         font-weight: 800 !important;
//       }

//       .t13-resume .experience-company {
//         font-weight: 600 !important;
//       }

//       .t13-resume .education-school {
//         font-weight: 800 !important;
//       }

//       .t13-resume .skill-item {
//         font-weight: 700 !important;
//       }

//       .t13-resume .additional-item {
//         font-weight: 600 !important;
//       }

//       .t13-resume .section {
//         page-break-inside: avoid;
//       }

//       .t13-resume .experience-item {
//         page-break-inside: avoid;
//       }
//     }

//     /* Responsive */
//     @media (max-width: 600px) {
//       .t13-resume {
//         margin: 15px;
//       }

//       .t13-resume .resume-header {
//         padding: 30px 25px 25px 25px !important;
//       }

//       .t13-resume .resume-main {
//         padding: 25px 25px 35px 25px !important;
//       }

//       .t13-resume .name {
//         font-size: 32px;
//       }

//       .t13-resume .job-title {
//         font-size: 14px;
//       }

//       .t13-resume .contact-section {
//         flex-direction: column;
//         gap: 12px;
//       }

//       .t13-resume .section-title {
//         font-size: 18px;
//       }

//       .t13-resume .experience-title-row {
//         flex-direction: column;
//         gap: 5px;
//       }

//       .t13-resume .education-title-row {
//         flex-direction: column;
//         gap: 5px;
//       }

//       .t13-resume .skill-item {
//         font-size: 11px;
//         padding: 6px 14px;
//       }

//       .t13-resume .additional-item {
//         font-size: 11px;
//         padding: 6px 14px;
//       }

//       .t13-resume .project-links {
//         margin-top: 6px;
//       }
//     }
//   `;

//   const stripHtml = (html: string) => {
//     return html?.replace(/<\/?[^>]+(>|$)/g, "") || "";
//   };

//   const renderDescription = (text: string) => {
//     if (!text) return "";

//     if (text.includes("<") && text.includes(">")) {
//       return `<div class="experience-description">${text}</div>`;
//     }

//     const lines = text.split("\n").filter((line) => line.trim() !== "");
//     if (lines.some((line) => line.trim().startsWith("-") || line.trim().startsWith("•"))) {
//       return `
//         <div class="experience-description">
//           <ul>
//             ${lines
//               .map((line) => {
//                 const trimmed = line.trim();
//                 if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
//                   return `<li>${trimmed.substring(1).trim()}</li>`;
//                 } else if (trimmed) {
//                   return `<li>${trimmed}</li>`;
//                 }
//                 return "";
//               })
//               .join("")}
//           </ul>
//         </div>`;
//     } else {
//       return `<div class="experience-description" style="white-space: pre-wrap;">${stripHtml(text)}</div>`;
//     }
//   };

//   const generateHTML = () => {
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";

//       const isCategorized = isCategorizedSkills(skills);

//       if (isCategorized) {
//         return `
//           <div class="section">
//             <h2 class="section-title">Skills</h2>
//             ${skills.map((category: any) => `
//               <div class="skill-category-block">
//                 <div class="skill-category-title">${category.title}</div>
//                 <div class="skills-container">
//                   ${category.skills.map((skill: any) => `
//                     <span class="skill-item">${skill.name}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             `).join("")}
//           </div>
//         `;
//       } else {
//         return `
//           <div class="section">
//             <h2 class="section-title">Skills</h2>
//             <div class="skills-container">
//               ${skills.map((skill: any) => `
//                 <span class="skill-item">${skill.name || skill.skill}</span>
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
//         <div class="section">
//           <h2 class="section-title">Projects</h2>
//           ${projects.map((project: any) => `
//             <div class="experience-item">
//               <div class="experience-header">
//                 <div class="experience-title-row">
//                   <span class="experience-title">${project.title || ""}</span>
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 </div>
//                 ${project.techStack && project.techStack.length > 0 ? `
//                   <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//                 ` : ""}
//                 ${project.description ? `
//                   <div class="experience-description">${project.description}</div>
//                 ` : ""}
//               </div>
//             </div>
//           `).join("")}
//         </div>
//       `;
//     };

//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8"/>
//         <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//         <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
//         <style>${styles}</style>
//       </head>
//       <body>
//         <div class="t13-resume">
//           <!-- HEADER - BOLD DARK -->
//           <div class="resume-header">
//             <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//             <div class="job-title">${
//               contact?.jobTitle
//                 ? typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""
//                 : ""
//             }</div>
//             <div class="contact-section">
//               ${contact?.email ? `
//                 <div class="contact-block">
//                   <div class="contact-label">EMAIL</div>
//                   <div class="contact-value">${contact.email}</div>
//                 </div>
//               ` : ""}
//               ${contact?.phone ? `
//                 <div class="contact-block">
//                   <div class="contact-label">PHONE</div>
//                   <div class="contact-value">${contact.phone}</div>
//                 </div>
//               ` : ""}
//               ${addressParts.length ? `
//                 <div class="contact-block">
//                   <div class="contact-label">LOCATION</div>
//                   <div class="address-value">${addressParts.join(", ")}</div>
//                 </div>
//               ` : ""}
//               ${formattedDob ? `
//                 <div class="contact-block">
//                   <div class="contact-label">BIRTH DATE</div>
//                   <div class="contact-value">${formattedDob}</div>
//                 </div>
//               ` : ""}
//             </div>
//             ${(linkedinUrl || githubUrl || portfolioUrl) ? `
//               <div class="contact-section" style="margin-top: 15px;">
//                 ${linkedinUrl ? `
//                   <div class="contact-block">
//                     <div class="contact-label">LINKEDIN</div>
//                     <div class="contact-value"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" target="_blank">${linkedinUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}</a></div>
//                   </div>
//                 ` : ""}
//                 ${githubUrl ? `
//                   <div class="contact-block">
//                     <div class="contact-label">GITHUB</div>
//                     <div class="contact-value"><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" target="_blank">${githubUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}</a></div>
//                   </div>
//                 ` : ""}
//                 ${portfolioUrl ? `
//                   <div class="contact-block">
//                     <div class="contact-label">PORTFOLIO</div>
//                     <div class="contact-value"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" target="_blank">${portfolioUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}</a></div>
//                   </div>
//                 ` : ""}
//               </div>
//             ` : ""}
//           </div>

//           <!-- MAIN CONTENT -->
//           <div class="resume-main">
//             <!-- SUMMARY -->
//             ${summary ? `
//               <div class="section">
//                 <h2 class="section-title">Profile</h2>
//                 <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//               </div>
//             ` : ""}

//             <!-- EXPERIENCE -->
//             ${experiences.length > 0 ? `
//               <div class="section">
//                 <h2 class="section-title">Experience</h2>
//                 ${experiences.map((exp) => {
//                   const startFormatted = formatMonthYear(exp.startDate, true);
//                   const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//                   return `
//                     <div class="experience-item">
//                       <div class="experience-header">
//                         <div class="experience-title-row">
//                           <span class="experience-title">${exp.jobTitle || ""}</span>
//                           <span class="experience-date">${startFormatted} — ${endFormatted}</span>
//                         </div>
//                         <div class="experience-company">${exp.employer || ""}${exp.location ? ` • ${exp.location}` : ""}</div>
//                       </div>
//                       ${exp.text ? renderDescription(exp.text) : ""}
//                     </div>
//                   `;
//                 }).join("")}
//               </div>
//             ` : ""}

//             <!-- PROJECTS -->
//             ${generateProjectsHTML()}

//             <!-- EDUCATION -->
//             ${educations.length > 0 ? `
//               <div class="section">
//                 <h2 class="section-title">Education</h2>
//                 ${educations.map((edu) => {
//                   const dateStr = edu.startDate || edu.endDate
//                     ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " — " : ""}${edu.endDate || ""}`
//                     : "";
//                   const formattedGrade = formatGrade(edu.grade || "");
//                   return `
//                     <div class="education-item">
//                       <div class="education-header">
//                         <div class="education-title-row">
//                           <span class="education-school">${edu.schoolname || ""}</span>
//                           ${dateStr ? `<span class="education-date">${dateStr}</span>` : ""}
//                         </div>
//                         ${edu.degree ? `<div class="education-degree">${edu.degree}</div>` : ""}
//                         ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                       </div>
//                       ${edu.text ? `<div class="education-description">${renderDescription(edu.text)}</div>` : ""}
//                     </div>
//                   `;
//                 }).join("")}
//               </div>
//             ` : ""}

//             <!-- SKILLS -->
//             ${generateSkillsHTML()}

//             <!-- LANGUAGES -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some(l => l.name?.trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Languages</h2>
//                 <div class="skills-container">
//                   ${finalize.languages.filter(l => l.name?.trim()).map(l => `
//                     <span class="skill-item">${l.name}${l.level ? ` • ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- CERTIFICATIONS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some(c => c.name?.replace(/<[^>]*>/g, "").trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Certifications</h2>
//                 <div class="additional-container">
//                   ${finalize.certificationsAndLicenses.filter(c => c.name?.replace(/<[^>]*>/g, "").trim()).map(c => `
//                     <span class="additional-item">${c.name.replace(/<[^>]*>/g, "")}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- AWARDS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some(a => a.name?.replace(/<[^>]*>/g, "").trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Awards</h2>
//                 <div class="additional-container">
//                   ${finalize.awardsAndHonors.filter(a => a.name?.replace(/<[^>]*>/g, "").trim()).map(a => `
//                     <span class="additional-item">${a.name.replace(/<[^>]*>/g, "")}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- INTERESTS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some(h => h.name?.replace(/<[^>]*>/g, "").trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Interests</h2>
//                 <div class="additional-container">
//                   ${finalize.hobbiesAndInterests.filter(h => h.name?.replace(/<[^>]*>/g, "").trim()).map(h => `
//                     <span class="additional-item">${h.name.replace(/<[^>]*>/g, "")}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- CUSTOM SECTIONS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some(s => s?.name?.trim() || s?.description?.trim()) ? `
//               <div class="section">
//                 ${finalize.customSection.filter(s => s?.name?.trim() || s?.description?.trim()).map(s => `
//                   <div class="custom-section">
//                     ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
//                     ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
//                   </div>
//                 `).join("")}
//               </div>
//             ` : ""}
//           </div>
//         </div>
//       </body>
//       </html>
//     `;
//   };

//   const handleDownload = async () => {
//     try {
//       const html = generateHTML();
//       const res = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" }
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

//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//   return (
//     <div style={{ textAlign: "left", marginTop: 0 }}>
//      {lastSegment === "download-resume" && (
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

//       {/* Resume Preview */}
//       <div className={`t13-resume ${alldata ? 'is-preview' : ''}`}
//         style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}>
//         <style>{styles}</style>

//         {/* HEADER - BOLD DARK */}
//         <div className="resume-header">
//           <h1 className="name">
//             {contact?.firstName} {contact?.lastName}
//           </h1>
//           <div className="job-title">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="contact-section">
//             {contact?.email && (
//               <div className="contact-block">
//                 <div className="contact-label">EMAIL</div>
//                 <div className="contact-value">{contact.email}</div>
//               </div>
//             )}
//             {contact?.phone && (
//               <div className="contact-block">
//                 <div className="contact-label">PHONE</div>
//                 <div className="contact-value">{contact.phone}</div>
//               </div>
//             )}
//             {addressParts.length > 0 && (
//               <div className="contact-block">
//                 <div className="contact-label">LOCATION</div>
//                 <div className="address-value">{addressParts.join(", ")}</div>
//               </div>
//             )}
//             {formattedDob && (
//               <div className="contact-block">
//                 <div className="contact-label">BIRTH DATE</div>
//                 <div className="contact-value">{formattedDob}</div>
//               </div>
//             )}
//           </div>
//           {(linkedinUrl || githubUrl || portfolioUrl) && (
//             <div className="contact-section" style={{ marginTop: "15px" }}>
//               {linkedinUrl && (
//                 <div className="contact-block">
//                   <div className="contact-label">LINKEDIN</div>
//                   <div className="contact-value">
//                     <a
//                       href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       {linkedinUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}
//                     </a>
//                   </div>
//                 </div>
//               )}
//               {githubUrl && (
//                 <div className="contact-block">
//                   <div className="contact-label">GITHUB</div>
//                   <div className="contact-value">
//                     <a
//                       href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       {githubUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}
//                     </a>
//                   </div>
//                 </div>
//               )}
//               {portfolioUrl && (
//                 <div className="contact-block">
//                   <div className="contact-label">PORTFOLIO</div>
//                   <div className="contact-value">
//                     <a
//                       href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       {portfolioUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}
//                     </a>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="resume-main">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section">
//               <h2 className="section-title">Profile</h2>
//               <div
//                 className="summary-text"
//                 dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
//               />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="section">
//               <h2 className="section-title">Experience</h2>
//               {experiences.map((exp, i) => (
//                 <div key={i} className="experience-item">
//                   <div className="experience-header">
//                     <div className="experience-title-row">
//                       <span className="experience-title">{exp.jobTitle}</span>
//                       <span className="experience-date">
//                         <MonthYearDisplay value={exp.startDate} shortYear /> —{" "}
//                         {exp.endDate ? (
//                           <MonthYearDisplay value={exp.endDate} shortYear />
//                         ) : (
//                           "Present"
//                         )}
//                       </span>
//                     </div>
//                     <div className="experience-company">
//                       {exp.employer}
//                       {exp.location && ` • ${exp.location}`}
//                     </div>
//                   </div>
//                   {exp.text && (
//                     <div
//                       className="experience-description"
//                       dangerouslySetInnerHTML={{ __html: exp.text }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* PROJECTS */}
//           {renderProjects()}

//           {/* EDUCATION */}
//           {educations.length > 0 && (
//             <div className="section">
//               <h2 className="section-title">Education</h2>
//               {educations.map((edu, i) => {
//                 const formattedGrade = formatGrade(edu.grade || "");
//                 return (
//                   <div key={i} className="education-item">
//                     <div className="education-header">
//                       <div className="education-title-row">
//                         <span className="education-school">{edu.schoolname}</span>
//                         {(edu.startDate || edu.endDate) && (
//                           <span className="education-date">
//                             {edu.startDate || ""}
//                             {edu.startDate && edu.endDate && " — "}
//                             {edu.endDate || ""}
//                           </span>
//                         )}
//                       </div>
//                       {edu.degree && <div className="education-degree">{edu.degree}</div>}
//                       {formattedGrade && <div className="education-grade">{formattedGrade}</div>}
//                     </div>
//                     {edu.text && (
//                       <div
//                         className="education-description"
//                         dangerouslySetInnerHTML={{ __html: edu.text }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* SKILLS */}
//           {renderSkills()}

//           {/* LANGUAGES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.languages) &&
//             finalize.languages.some((l) => l.name?.trim()) && (
//               <div className="section">
//                 <h2 className="section-title">Languages</h2>
//                 <div className="skills-container">
//                   {finalize.languages.map(
//                     (lang, i) =>
//                       lang.name?.trim() && (
//                         <span key={i} className="skill-item">
//                           {lang.name}
//                           {lang.level &&
//                             ` • ${Math.round((Number(lang.level) / 4) * 100)}%`}
//                         </span>
//                       )
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CERTIFICATIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some(
//               (c) => c.name?.replace(/<[^>]*>/g, "").trim()
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Certifications</h2>
//                 <div className="additional-container">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <span
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       )
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* AWARDS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.awardsAndHonors) &&
//             finalize.awardsAndHonors.some(
//               (a) => a.name?.replace(/<[^>]*>/g, "").trim()
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Awards</h2>
//                 <div className="additional-container">
//                   {finalize.awardsAndHonors.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <span
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       )
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* INTERESTS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some(
//               (h) => h.name?.replace(/<[^>]*>/g, "").trim()
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Interests</h2>
//                 <div className="additional-container">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <span
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       )
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim()
//             ) && (
//               <div className="section">
//                 {finalize.customSection.map(
//                   (section, i) =>
//                     (section?.name?.trim() || section?.description?.trim()) && (
//                       <div key={i} className="custom-section">
//                         {section.name && (
//                           <h3 className="custom-section-title">{section.name}</h3>
//                         )}
//                         {section.description && (
//                           <div
//                             className="custom-section-content"
//                             dangerouslySetInnerHTML={{ __html: section.description }}
//                           />
//                         )}
//                       </div>
//                     )
//                 )}
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateThirteen;

// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay, cleanQuillHTML, formatDateOfBirth, formatGradeToCgpdAndPercentage } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateThirteen: React.FC<ResumeProps> = ({ alldata }) => {
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
//       <div className="section">
//         <h2 className="section-title">Skills</h2>
//         <div className="skills-container">
//           <div
//             className="skills-content"
//             dangerouslySetInnerHTML={{ __html: cleanedSkills }}
//           />
//         </div>
//       </div>
//     );
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <div className="section">
//         <h2 className="section-title">Projects</h2>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="experience-item">
//             <div className="experience-header">
//               <div className="experience-title-row">
//                 <span className="experience-title">{project.title}</span>
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
//                   <strong>Tech:</strong> {project.techStack.join(", ")}
//                 </div>
//               )}
//               {project.description && (
//                 <div
//                   className="experience-description"
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
//      CSS — CREATIVE BOLD - FIXED FONT WEIGHTS
//   ====================================================== */
//   const styles = `

//   .t13-resume  body {
//       background-color: #ffffff;
//       line-height: 1.5;
//       color: #111111;
//       -webkit-font-smoothing: antialiased;
//       -moz-osx-font-smoothing: grayscale;
//       font-family: 'Montserrat', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
//     }

//     .t13-resume {
//       width: 210mm;
//       margin: 0 auto;
//       background: white;
//           min-height: 297mm;

//     }

//     .t13-resume.is-preview {
//       transform: scale(0.36);
//       transform-origin: top left;
//       width: 210mm;
//       height: auto;
//       max-height: none;
//       min-height: auto;
//       max-width: none;
//       min-width: auto;
//       overflow: visible;
//     }

//     /* Global font settings */
//     .t13-resume,
//     .t13-resume * {
//       font-family: 'Montserrat', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
//     }

//     /* Fix p tag spacing - remove extra bottom margin */
//     .t13-resume p {
//       margin: 0 0 4px 0 !important;
//       padding: 0 !important;
//       line-height: 1.6 !important;
//     }

//     .t13-resume p:last-child {
//       margin-bottom: 0 !important;
//     }

//     /* Rich text content styles */
//     .t13-resume .experience-description ul,
//     .t13-resume .experience-description ol,
//     .t13-resume .education-description ul,
//     .t13-resume .education-description ol,
//     .t13-resume .skills-content ul,
//     .t13-resume .skills-content ol,
//     .t13-resume .custom-section-content ul,
//     .t13-resume .custom-section-content ol {
//       margin: 4px 0 4px 20px !important;
//       padding-left: 20px !important;
//     }

//     .t13-resume .experience-description li,
//     .t13-resume .education-description li,
//     .t13-resume .skills-content li,
//     .t13-resume .custom-section-content li {
//       margin-bottom: 2px !important;
//       line-height: 1.6 !important;
//     }

//     .t13-resume .experience-description ul,
//     .t13-resume .education-description ul,
//     .t13-resume .skills-content ul,
//     .t13-resume .custom-section-content ul {
//       list-style-type: disc !important;
//     }

//     .t13-resume .experience-description ol,
//     .t13-resume .education-description ol,
//     .t13-resume .skills-content ol,
//     .t13-resume .custom-section-content ol {
//       list-style-type: decimal !important;
//     }

//     .t13-resume .experience-description strong,
//     .t13-resume .education-description strong,
//     .t13-resume .skills-content strong,
//     .t13-resume .custom-section-content strong {
//       font-weight: 700 !important;
//     }

//     .t13-resume .experience-description em,
//     .t13-resume .education-description em,
//     .t13-resume .skills-content em,
//     .t13-resume .custom-section-content em {
//       font-style: italic !important;
//     }

//     .t13-resume .experience-description u,
//     .t13-resume .education-description u,
//     .t13-resume .skills-content u,
//     .t13-resume .custom-section-content u {
//       text-decoration: underline !important;
//     }

//     /* Preserve spaces in content */
//     .t13-resume .experience-description p,
//     .t13-resume .education-description p,
//     .t13-resume .skills-content p,
//     .t13-resume .custom-section-content p {
//       white-space: pre-wrap !important;
//     }

//     /* Skills content styling */
//     .t13-resume .skills-content {
//       font-size: 13px;
//       font-weight: 500;
//       color: #444444;
//       line-height: 1.6;
//     }

//     /* Header Section - IMPROVED DESIGN */
//     .t13-resume .resume-header {
//       padding: 40px 50px 30px 50px;
//       background: #0a0a0a;
//       color: white;
//     }

//     .t13-resume .name {
//       font-size: 40px;
//       font-weight: 800;
//       letter-spacing: -0.5px;
//       margin-bottom: 8px;
//       color: white;
//       text-transform: uppercase;
//       line-height: 1.1;
//     }

//     .t13-resume .job-title {
//       font-size: 14px;
//       font-weight: 500;
//       letter-spacing: 3px;
//       text-transform: uppercase;
//       color: #aaaaaa;
//       margin-bottom: 25px;
//       padding-bottom: 20px;
//       border-bottom: 2px solid rgba(255,255,255,0.15);
//     }

//     /* Contact section - Horizontal layout */
//     .t13-resume .contact-grid {
//       display: grid;
//       grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//       gap: 14px;
//       margin-top: 10px;
//     }

//     .t13-resume .contact-item {
//       display: flex;
//       flex-direction: column;
//       gap: 4px;
//     }

//     .t13-resume .contact-label {
//       font-size: 10px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       color: #888888;
//     }

//     .t13-resume .contact-value {
//       font-size: 13px;
//       font-weight: 500;
//       color: white;
//       line-height: 1.4;
//       word-break: break-word;
//     }

//     .t13-resume .contact-value a {
//       color: white;
//       text-decoration: none;
//       transition: opacity 0.2s;
//     }

//     .t13-resume .contact-value a:hover {
//       opacity: 0.8;
//     }

//     /* Education Grade */
//     .t13-resume .education-grade {
//       font-size: 12px;
//       font-weight: 500;
//       color: #666666;
//       margin-top: 4px;
//     }

//     /* Main Content */
//     .t13-resume .resume-main {
//       padding: 35px 50px 45px 50px;
//       background: white;
//     }

//     /* Section Styles - BOLD */
//     .t13-resume .section {
//       margin-bottom: 30px;
//     }

//     .t13-resume .section:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .section-title {
//       font-size: 18px;
//       font-weight: 800;
//       text-transform: uppercase;
//       letter-spacing: 2px;
//       color: #111111;
//       margin-bottom: 18px;
//       padding-bottom: 8px;
//       border-bottom: 3px solid #111111;
//       display: inline-block;
//     }

//     /* Summary */
//     .t13-resume .summary-text {
//       font-size: 13.5px;
//       line-height: 1.65;
//       color: #333333;
//       font-weight: 500;
//     }

//     /* Experience Items */
//     .t13-resume .experience-item {
//       margin-bottom: 28px;
//     }

//     .t13-resume .experience-item:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .experience-header {
//       margin-bottom: 10px;
//     }

//     .t13-resume .experience-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 4px;
//     }

//     .t13-resume .experience-title {
//       font-size: 17px;
//       font-weight: 800;
//       color: #111111;
//     }

//     .t13-resume .experience-date {
//       font-size: 11.5px;
//       font-weight: 600;
//       color: #666666;
//       letter-spacing: 0.5px;
//     }

//     .t13-resume .experience-company {
//       font-size: 14px;
//       font-weight: 600;
//       color: #444444;
//       margin-top: 2px;
//     }

//     .t13-resume .experience-description {
//       margin-top: 10px;
//     }

//     /* Education Items */
//     .t13-resume .education-item {
//       margin-bottom: 24px;
//     }

//     .t13-resume .education-item:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .education-header {
//       margin-bottom: 8px;
//     }

//     .t13-resume .education-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 4px;
//     }

//     .t13-resume .education-school {
//       font-size: 17px;
//       font-weight: 800;
//       color: #111111;
//     }

//     .t13-resume .education-date {
//       font-size: 11.5px;
//       font-weight: 600;
//       color: #666666;
//     }

//     .t13-resume .education-degree {
//       font-size: 14px;
//       font-weight: 600;
//       color: #444444;
//       margin-top: 2px;
//     }

//     .t13-resume .education-description {
//       margin-top: 8px;
//     }

//     /* SKILLS CONTAINER */
//     .t13-resume .skills-container {
//       margin-top: 8px;
//     }

//     /* PROJECTS */
//     .t13-resume .project-links {
//       display: flex;
//       gap: 15px;
//     }

//     .t13-resume .project-link {
//       font-size: 10px;
//       font-weight: 600;
//       color: #666666;
//       text-decoration: underline;
//     }

//     .t13-resume .project-tech-stack {
//       font-size: 11px;
//       font-weight: 500;
//       color: #777777;
//       margin: 4px 0;
//     }

//     /* Custom Sections */
//     .t13-resume .custom-section {
//       margin-bottom: 20px;
//     }

//     .t13-resume .custom-section:last-child {
//       margin-bottom: 0;
//     }

//     .t13-resume .custom-section-title {
//       font-size: 15px;
//       font-weight: 800;
//       color: #111111;
//       margin-bottom: 8px;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//     }

//     .t13-resume .custom-section-content {
//       font-size: 13.5px;
//       font-weight: 500;
//       color: #444444;
//       line-height: 1.6;
//     }

//     /* Print Styles */
//     @media print {
//       @page {
//         size: A4;
//         margin: 0;
//       }

//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }

//       body {
//         margin: 0;
//         padding: 0;
//         background: white;
//       }

//       .t13-resume,
//       .t13-resume * {
//         font-family: 'Montserrat', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
//       }

//       .t13-resume .resume-header {
//         background: #0a0a0a !important;
//         padding: 40px 50px 30px 50px !important;
//       }

//       .t13-resume .resume-main {
//         padding: 35px 50px 45px 50px !important;
//       }

//       .t13-resume .section-title {
//         border-bottom: 3px solid #111111 !important;
//       }

//       .t13-resume .section {
//         page-break-inside: avoid;
//       }

//       .t13-resume .experience-item {
//         page-break-inside: avoid;
//       }

//       /* Fix p tag margins in print */
//       .t13-resume p {
//         margin: 0 0 4px 0 !important;
//       }
//     }

//   `;

//   const renderDescription = (text: string) => {
//     if (!text) return "";
//     return `<div class="experience-description">${cleanQuillHTML(text)}</div>`;
//   };

//   const generateHTML = () => {
//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";

//       return `
//         <div class="section">
//           <h2 class="section-title">Skills</h2>
//           <div class="skills-container">
//             <div class="skills-content">${cleanedSkills}</div>
//           </div>
//         </div>
//       `;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="section">
//           <h2 class="section-title">Projects</h2>
//           ${projects.map((project: any) => `
//             <div class="experience-item">
//               <div class="experience-header">
//                 <div class="experience-title-row">
//                   <span class="experience-title">${project.title || ""}</span>
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 </div>
//                 ${project.techStack && project.techStack.length > 0 ? `
//                   <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(", ")}</div>
//                 ` : ""}
//                 ${project.description ? `
//                   <div class="experience-description">${cleanQuillHTML(project.description)}</div>
//                 ` : ""}
//               </div>
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

//       return `
//         <div class="section">
//           ${finalize.customSection
//             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s: any) => `
//               <div class="custom-section">
//                 ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
//                 ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//               </div>
//             `,
//             )
//             .join("")}
//         </div>
//       `;
//     };

//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8"/>
//         <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//         <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
//         <style>${styles}</style>
//       </head>
//       <body>
//         <div class="t13-resume">
//           <!-- HEADER - IMPROVED DESIGN -->
//           <div class="resume-header">
//             <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//             <div class="job-title">${
//               contact?.jobTitle
//                 ? typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""
//                 : ""
//             }</div>
//             <div class="contact-grid">
//               ${contact?.email ? `
//                 <div class="contact-item">
//                   <div class="contact-label">EMAIL</div>
//                   <div class="contact-value">${contact.email}</div>
//                 </div>
//               ` : ""}
//               ${contact?.phone ? `
//                 <div class="contact-item">
//                   <div class="contact-label">PHONE</div>
//                   <div class="contact-value">${contact.phone}</div>
//                 </div>
//               ` : ""}

//               ${formattedDob ? `
//                 <div class="contact-item">
//                   <div class="contact-label">BIRTH DATE</div>
//                   <div class="contact-value">${formattedDob}</div>
//                 </div>
//               ` : ""}
//               ${linkedinUrl ? `
//                 <div class="contact-item">
//                   <div class="contact-label">LINKEDIN</div>
//                   <div class="contact-value"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" target="_blank">${linkedinUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}</a></div>
//                 </div>
//               ` : ""}
//               ${githubUrl ? `
//                 <div class="contact-item">
//                   <div class="contact-label">GITHUB</div>
//                   <div class="contact-value"><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" target="_blank">${githubUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}</a></div>
//                 </div>
//               ` : ""}
//               ${portfolioUrl ? `
//                 <div class="contact-item">
//                   <div class="contact-label">PORTFOLIO</div>
//                   <div class="contact-value"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" target="_blank">${portfolioUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}</a></div>
//                 </div>
//               ` : ""}
//                ${addressParts.length ? `
//                 <div class="contact-item">
//                   <div class="contact-label">LOCATION</div>
//                   <div class="contact-value">${addressParts.join(", ")}</div>
//                 </div>
//               ` : ""}
//             </div>
//           </div>

//           <!-- MAIN CONTENT -->
//           <div class="resume-main">
//             <!-- SUMMARY -->
//             ${summary ? `
//               <div class="section">
//                 <h2 class="section-title">Profile</h2>
//                 <div class="summary-text">${cleanQuillHTML(summary)}</div>
//               </div>
//             ` : ""}

//             <!-- EXPERIENCE -->
//             ${experiences.length > 0 ? `
//               <div class="section">
//                 <h2 class="section-title">Experience</h2>
//                 ${experiences.map((exp) => {
//                   const startFormatted = formatMonthYear(exp.startDate, false);
//                   const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
//                   const companyLocation = [exp.employer, exp.location].filter(Boolean).join(" • ");
//                   return `
//                     <div class="experience-item">
//                       <div class="experience-header">
//                         <div class="experience-title-row">
//                           <span class="experience-title">${exp.jobTitle || ""}</span>
//                           <span class="experience-date">${startFormatted} — ${endFormatted}</span>
//                         </div>
//                         <div class="experience-company">${companyLocation}</div>
//                       </div>
//                       ${exp.text ? renderDescription(exp.text) : ""}
//                     </div>
//                   `;
//                 }).join("")}
//               </div>
//             ` : ""}

//             <!-- PROJECTS -->
//             ${generateProjectsHTML()}

//             <!-- EDUCATION -->
//             ${educations.length > 0 ? `
//               <div class="section">
//                 <h2 class="section-title">Education</h2>
//                 ${educations.map((edu) => {
//                   const dateStr = edu.startDate || edu.endDate
//                     ? `${edu.startDate || ""} — ${edu.endDate || "Present"}`
//                     : "";
//                   const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                   const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//                   return `
//                     <div class="education-item">
//                       <div class="education-header">
//                         <div class="education-title-row">
//                           <span class="education-school">${edu.schoolname || ""}</span>
//                           ${dateStr ? `<span class="education-date">${dateStr}</span>` : ""}
//                         </div>
//                         ${edu.degree ? `<div class="education-degree">${edu.degree}</div>` : ""}
//                         ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                       </div>
//                       ${eduTextHtml ? `<div class="education-description">${eduTextHtml}</div>` : ""}
//                     </div>
//                   `;
//                 }).join("")}
//               </div>
//             ` : ""}

//             <!-- SKILLS -->
//             ${generateSkillsHTML()}

//             <!-- CUSTOM SECTIONS -->
//             ${generateCustomSectionsHTML()}
//           </div>
//         </div>
//       </body>
//       </html>
//     `;
//   };

//   const handleDownload = async () => {
//     try {
//       const html = generateHTML();
//       const res = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" }
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

//   return (
//     <div style={{ textAlign: "left", marginTop: 0 }}>
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

//       {/* Resume Preview */}
//       <div className={`t13-resume ${alldata ? 'is-preview' : ''}`}
//         style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}>
//         <style>{styles}</style>

//         {/* HEADER - IMPROVED DESIGN */}
//         <div className="resume-header">
//           <h1 className="name">
//             {contact?.firstName} {contact?.lastName}
//           </h1>
//           <div className="job-title">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="contact-grid">
//             {contact?.email && (
//               <div className="contact-item">
//                 <div className="contact-label">EMAIL</div>
//                 <div className="contact-value">{contact.email}</div>
//               </div>
//             )}
//             {contact?.phone && (
//               <div className="contact-item">
//                 <div className="contact-label">PHONE</div>
//                 <div className="contact-value">{contact.phone}</div>
//               </div>
//             )}

//             {formattedDob && (
//               <div className="contact-item">
//                 <div className="contact-label">BIRTH DATE</div>
//                 <div className="contact-value">{formattedDob}</div>
//               </div>
//             )}
//             {linkedinUrl && (
//               <div className="contact-item">
//                 <div className="contact-label">LINKEDIN</div>
//                 <div className="contact-value">
//                   <a
//                     href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     {linkedinUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}
//                   </a>
//                 </div>
//               </div>
//             )}
//             {githubUrl && (
//               <div className="contact-item">
//                 <div className="contact-label">GITHUB</div>
//                 <div className="contact-value">
//                   <a
//                     href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     {githubUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}
//                   </a>
//                 </div>
//               </div>
//             )}
//             {portfolioUrl && (
//               <div className="contact-item">
//                 <div className="contact-label">PORTFOLIO</div>
//                 <div className="contact-value">
//                   <a
//                     href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     {portfolioUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}
//                   </a>
//                 </div>
//               </div>
//             )}
//              {addressParts.length > 0 && (
//               <div className="contact-item">
//                 <div className="contact-label">LOCATION</div>
//                 <div className="contact-value">{addressParts.join(", ")}</div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="resume-main">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section">
//               <h2 className="section-title">Profile</h2>
//               <div
//                 className="summary-text"
//                 dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }}
//               />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="section">
//               <h2 className="section-title">Experience</h2>
//               {experiences.map((exp, i) => {
//                 const start = formatMonthYear(exp.startDate, false);
//                 const end = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
//                 const companyLocation = [exp.employer, exp.location].filter(Boolean).join(" • ");
//                 return (
//                   <div key={i} className="experience-item">
//                     <div className="experience-header">
//                       <div className="experience-title-row">
//                         <span className="experience-title">{exp.jobTitle}</span>
//                         <span className="experience-date">{start} — {end}</span>
//                       </div>
//                       <div className="experience-company">{companyLocation}</div>
//                     </div>
//                     {exp.text && (
//                       <div
//                         className="experience-description"
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
//           {educations.length > 0 && (
//             <div className="section">
//               <h2 className="section-title">Education</h2>
//               {educations.map((edu, i) => {
//                 const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                 const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//                 return (
//                   <div key={i} className="education-item">
//                     <div className="education-header">
//                       <div className="education-title-row">
//                         <span className="education-school">{edu.schoolname}</span>
//                         {(edu.startDate || edu.endDate) && (
//                           <span className="education-date">
//                             {edu.startDate || ""}
//                             {" — "}
//                             {edu.endDate || "Present"}
//                           </span>
//                         )}
//                       </div>
//                       {edu.degree && <div className="education-degree">{edu.degree}</div>}
//                       {formattedGrade && <div className="education-grade">{formattedGrade}</div>}
//                     </div>
//                     {eduTextHtml && (
//                       <div
//                         className="education-description"
//                         dangerouslySetInnerHTML={{ __html: eduTextHtml }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* SKILLS */}
//           {renderSkills()}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim()
//             ) && (
//               <div className="section">
//                 {finalize.customSection.map(
//                   (section, i) =>
//                     (section?.name?.trim() || section?.description?.trim()) && (
//                       <div key={i} className="custom-section">
//                         {section.name && (
//                           <h3 className="custom-section-title">{section.name}</h3>
//                         )}
//                         {section.description && (
//                           <div
//                             className="custom-section-content"
//                             dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }}
//                           />
//                         )}
//                       </div>
//                     )
//                 )}
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateThirteen;

// "use client";
// import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, cleanQuillHTML, formatDateOfBirth, formatGradeToCgpdAndPercentage } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px

// const TemplateThirteen: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills?.text || context?.skills?.text || "";
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";

//   const addressParts = [
//     contact?.address, contact?.city, contact?.postCode, contact?.country,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl = contact?.github;
//   const dateOfBirth = contact?.dob;
//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//   const styles = `
//     @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

//     @page { size: A4; margin: 15mm; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t13-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background: white;
//       font-family: 'Montserrat', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
//       color: #111111;
//     }

//     .t13-resume, .t13-resume * {
//       font-family: 'Montserrat', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
//     }

//     .t13-resume p {
//       margin: 0 0 4px 0 !important; padding: 0 !important; line-height: 1.6 !important;
//     }
//     .t13-resume p:last-child { margin-bottom: 0 !important; }

//     .t13-resume .experience-description ul, .t13-resume .experience-description ol,
//     .t13-resume .education-description ul,  .t13-resume .education-description ol,
//     .t13-resume .skills-content ul,         .t13-resume .skills-content ol,
//     .t13-resume .custom-section-content ul, .t13-resume .custom-section-content ol {
//       margin: 4px 0 4px 20px !important; padding-left: 20px !important;
//     }
//     .t13-resume .experience-description li, .t13-resume .education-description li,
//     .t13-resume .skills-content li,         .t13-resume .custom-section-content li {
//       margin-bottom: 2px !important; line-height: 1.6 !important;
//     }
//     .t13-resume .experience-description ul, .t13-resume .education-description ul,
//     .t13-resume .skills-content ul,         .t13-resume .custom-section-content ul { list-style-type: disc !important; }
//     .t13-resume .experience-description ol, .t13-resume .education-description ol,
//     .t13-resume .skills-content ol,         .t13-resume .custom-section-content ol { list-style-type: decimal !important; }
//     .t13-resume .experience-description strong, .t13-resume .education-description strong,
//     .t13-resume .skills-content strong,         .t13-resume .custom-section-content strong { font-weight: 700 !important; }
//     .t13-resume .experience-description em, .t13-resume .education-description em,
//     .t13-resume .skills-content em,         .t13-resume .custom-section-content em { font-style: italic !important; }
//     .t13-resume .experience-description u, .t13-resume .education-description u,
//     .t13-resume .skills-content u,          .t13-resume .custom-section-content u { text-decoration: underline !important; }
//     .t13-resume .experience-description p, .t13-resume .education-description p,
//     .t13-resume .skills-content p,          .t13-resume .custom-section-content p { white-space: pre-wrap !important; }

//     .t13-resume .skills-content {
//       font-size: 13px; font-weight: 500; color: #444444; line-height: 1.6;
//     }

//     /* Header */
//     .t13-resume .resume-header {
//       padding: 40px 0 30px 0;
//       background: #0a0a0a;
//       color: white;
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//       margin: 0 -${MARGIN}px;
//       padding-left: ${MARGIN}px;
//       padding-right: ${MARGIN}px;
//     }
//     .t13-resume .name {
//       font-size: 40px; font-weight: 800; letter-spacing: -0.5px;
//       margin: 0 0 8px 0; color: white; text-transform: uppercase; line-height: 1.1;
//     }
//     .t13-resume .job-title {
//       font-size: 14px; font-weight: 500; letter-spacing: 3px;
//       text-transform: uppercase; color: #aaaaaa; margin-bottom: 25px;
//       padding-bottom: 20px; border-bottom: 2px solid rgba(255,255,255,0.15);
//     }
//     .t13-resume .contact-grid {
//       display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//       gap: 14px; margin-top: 10px;
//     }
//     .t13-resume .contact-item { display: flex; flex-direction: column; gap: 4px; }
//     .t13-resume .contact-label {
//       font-size: 10px; font-weight: 700; text-transform: uppercase;
//       letter-spacing: 1.5px; color: #888888;
//     }
//     .t13-resume .contact-value {
//       font-size: 13px; font-weight: 500; color: white; line-height: 1.4; word-break: break-word;
//     }
//     .t13-resume .contact-value a { color: white; text-decoration: none; }

//     .t13-resume .education-grade { font-size: 12px; font-weight: 500; color: #666666; margin-top: 4px; }

//     /* Main content */
//     .t13-resume .resume-main { padding: 35px 0 45px 0; }

//     .t13-resume .section { margin-bottom: 30px; }
//     .t13-resume .section:last-child { margin-bottom: 0; }

//     .t13-resume .section-title {
//       font-size: 18px; font-weight: 800; text-transform: uppercase;
//       letter-spacing: 2px; color: #111111; margin: 0 0 18px 0;
//       padding-bottom: 8px; border-bottom: 3px solid #111111;
//       display: inline-block;
//       page-break-after: avoid; break-after: avoid;
//     }

//     .t13-resume .summary-text {
//       font-size: 13.5px; line-height: 1.65; color: #333333; font-weight: 500;
//     }

//     .t13-resume .experience-item {
//       margin-bottom: 28px;
//       page-break-inside: avoid; break-inside: avoid;
//     }
//     .t13-resume .experience-item:last-child { margin-bottom: 0; }
//     .t13-resume .experience-header { margin-bottom: 10px; }
//     .t13-resume .experience-title-row {
//       display: flex; justify-content: space-between; align-items: baseline;
//       flex-wrap: wrap; gap: 10px; margin-bottom: 4px;
//     }
//     .t13-resume .experience-title { font-size: 17px; font-weight: 800; color: #111111; }
//     .t13-resume .experience-date { font-size: 11.5px; font-weight: 600; color: #666666; letter-spacing: 0.5px; }
//     .t13-resume .experience-company { font-size: 14px; font-weight: 600; color: #444444; margin-top: 2px; }
//     .t13-resume .experience-description { margin-top: 10px; }

//     .t13-resume .education-item {
//       margin-bottom: 24px;
//       page-break-inside: avoid; break-inside: avoid;
//     }
//     .t13-resume .education-item:last-child { margin-bottom: 0; }
//     .t13-resume .education-header { margin-bottom: 8px; }
//     .t13-resume .education-title-row {
//       display: flex; justify-content: space-between; align-items: baseline;
//       flex-wrap: wrap; gap: 10px; margin-bottom: 4px;
//     }
//     .t13-resume .education-school { font-size: 17px; font-weight: 800; color: #111111; }
//     .t13-resume .education-date { font-size: 11.5px; font-weight: 600; color: #666666; }
//     .t13-resume .education-degree { font-size: 14px; font-weight: 600; color: #444444; margin-top: 2px; }
//     .t13-resume .education-description { margin-top: 8px; }

//     .t13-resume .skills-container { margin-top: 8px; }

//     .t13-resume .project-links { display: flex; gap: 15px; }
//     .t13-resume .project-link { font-size: 10px; font-weight: 600; color: #666666; text-decoration: underline; }
//     .t13-resume .project-tech-stack { font-size: 11px; font-weight: 500; color: #777777; margin: 4px 0; }

//     .t13-resume .custom-section { margin-bottom: 20px; }
//     .t13-resume .custom-section:last-child { margin-bottom: 0; }
//     .t13-resume .custom-section-title {
//       font-size: 15px; font-weight: 800; color: #111111;
//       margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;
//     }
//     .t13-resume .custom-section-content {
//       font-size: 13.5px; font-weight: 500; color: #444444; line-height: 1.6;
//     }

//     /* Page break marker injected for PDF */
//     .t13-page-break {
//       page-break-before: always !important;
//       break-before: page !important;
//       display: block; height: 0; margin: 0; padding: 0;
//     }

//     @media print {
//       * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
//       .t13-resume { width: 100% !important; padding: 0 !important; margin: 0 !important; }
//       .t13-resume .resume-header {
//         background: #0a0a0a !important;
//         margin: 0 !important;
//         padding: 40px 50px 30px 50px !important;
//       }
//       .t13-resume .resume-main { padding: 35px 0 45px 0 !important; }
//       .t13-resume .section-title { border-bottom: 3px solid #111111 !important; }
//       .t13-resume p { margin: 0 0 4px 0 !important; }
//     }
//   `;

//   // ── HTML builder ─────────────────────────────────────────
//   const generateHTML = useCallback((forPDF = false, pageBreakIds: string[] = []): string => {
//     const href = (url: string) => url.startsWith("http") ? url : `https://${url}`;
//     const cleanUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/^www\./, "");

//     const skillsClean = cleanQuillHTML(skills);
//     const skillsBlock = skillsClean && skillsClean !== "<p><br></p>"
//       ? `<div class="section" data-block-id="skills-section">
//            <h2 class="section-title">Skills</h2>
//            <div class="skills-container">
//              <div class="skills-content" data-block-id="skills-content">${skillsClean}</div>
//            </div>
//          </div>`
//       : "";

//     const projectsBlock = projects.length
//       ? `<div class="section" data-block-id="proj-section">
//            <h2 class="section-title">Projects</h2>
//            ${projects.map((p: any, i: number) => `
//              <div class="experience-item" data-block-id="proj-${i}">
//                <div class="experience-header">
//                  <div class="experience-title-row">
//                    <span class="experience-title">${p.title || ""}</span>
//                    <div class="project-links">
//                      ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link">Live Demo</a>` : ""}
//                      ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link">GitHub</a>` : ""}
//                    </div>
//                  </div>
//                  ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(", ")}</div>` : ""}
//                  ${p.description ? `<div class="experience-description">${cleanQuillHTML(p.description)}</div>` : ""}
//                </div>
//              </div>`).join("")}
//          </div>`
//       : "";

//     const customBlock =
//       !Array.isArray(finalize) &&
//       Array.isArray(finalize?.customSection) &&
//       finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim())
//         ? `<div class="section" data-block-id="custom-section">
//              ${finalize.customSection
//                .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//                .map((s: any, i: number) => `
//                  <div class="custom-section" data-block-id="custom-${i}">
//                    ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
//                    ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//                  </div>`).join("")}
//            </div>`
//         : "";

//     const summaryBlock = summary
//       ? `<div class="section" data-block-id="summary">
//            <h2 class="section-title">Profile</h2>
//            <div class="summary-text">${cleanQuillHTML(summary)}</div>
//          </div>`
//       : "";

//     const expBlock = experiences.length
//       ? `<div class="section" data-block-id="exp-section">
//            <h2 class="section-title">Experience</h2>
//            ${experiences.map((exp: any, i: number) => {
//              const startFormatted = formatMonthYear(exp.startDate, false);
//              const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
//              const companyLocation = [exp.employer, exp.location].filter(Boolean).join(" • ");
//              return `<div class="experience-item" data-block-id="exp-${i}">
//                <div class="experience-header">
//                  <div class="experience-title-row">
//                    <span class="experience-title">${exp.jobTitle || ""}</span>
//                    <span class="experience-date">${startFormatted} — ${endFormatted}</span>
//                  </div>
//                  <div class="experience-company">${companyLocation}</div>
//                </div>
//                ${exp.text ? `<div class="experience-description">${cleanQuillHTML(exp.text)}</div>` : ""}
//              </div>`;
//            }).join("")}
//          </div>`
//       : "";

//     const eduBlock = educations.length
//       ? `<div class="section" data-block-id="edu-section">
//            <h2 class="section-title">Education</h2>
//            ${educations.map((edu: any, i: number) => {
//              const dateStr = edu.startDate || edu.endDate
//                ? `${edu.startDate || ""} — ${edu.endDate || "Present"}` : "";
//              const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//              const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//              return `<div class="education-item" data-block-id="edu-${i}">
//                <div class="education-header">
//                  <div class="education-title-row">
//                    <span class="education-school">${edu.schoolname || ""}</span>
//                    ${dateStr ? `<span class="education-date">${dateStr}</span>` : ""}
//                  </div>
//                  ${edu.degree ? `<div class="education-degree">${edu.degree}</div>` : ""}
//                  ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                </div>
//                ${eduTextHtml ? `<div class="education-description">${eduTextHtml}</div>` : ""}
//              </div>`;
//            }).join("")}
//          </div>`
//       : "";

//     const pdfStyle = forPDF
//       ? `<style>
//           .t13-resume { width: 100% !important; padding: 0 !important; }
//           .t13-resume .resume-header { margin: 0 !important; padding: 40px 50px 30px 50px !important; }
//           .t13-resume .resume-main { padding: 35px 50px 45px 50px !important; }
//         </style>`
//       : "";

//     let mainContent = `
//       ${summaryBlock}
//       ${expBlock}
//       ${projectsBlock}
//       ${eduBlock}
//       ${skillsBlock}
//       ${customBlock}
//     `;

//     // Inject page-break markers before elements at cut points (PDF only)
//     if (forPDF && pageBreakIds.length > 0) {
//       const tempDiv = document.createElement("div");
//       tempDiv.innerHTML = mainContent;
//       pageBreakIds.forEach((id) => {
//         const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//         if (el) {
//           const breakDiv = document.createElement("div");
//           breakDiv.className = "t13-page-break";
//           el.parentNode?.insertBefore(breakDiv, el);
//         }
//       });
//       mainContent = tempDiv.innerHTML;
//     }

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t13-resume">
//     <div class="resume-header" data-block-id="header">
//       <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//       <div class="job-title">${
//         contact?.jobTitle
//           ? typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""
//           : ""
//       }</div>
//       <div class="contact-grid">
//         ${contact?.email ? `<div class="contact-item"><div class="contact-label">EMAIL</div><div class="contact-value">${contact.email}</div></div>` : ""}
//         ${contact?.phone ? `<div class="contact-item"><div class="contact-label">PHONE</div><div class="contact-value">${contact.phone}</div></div>` : ""}
//         ${formattedDob ? `<div class="contact-item"><div class="contact-label">BIRTH DATE</div><div class="contact-value">${formattedDob}</div></div>` : ""}
//         ${linkedinUrl ? `<div class="contact-item"><div class="contact-label">LINKEDIN</div><div class="contact-value"><a href="${href(linkedinUrl)}">${cleanUrl(linkedinUrl)}</a></div></div>` : ""}
//         ${githubUrl ? `<div class="contact-item"><div class="contact-label">GITHUB</div><div class="contact-value"><a href="${href(githubUrl)}">${cleanUrl(githubUrl)}</a></div></div>` : ""}
//         ${portfolioUrl ? `<div class="contact-item"><div class="contact-label">PORTFOLIO</div><div class="contact-value"><a href="${href(portfolioUrl)}">${cleanUrl(portfolioUrl)}</a></div></div>` : ""}
//         ${addressParts.length ? `<div class="contact-item"><div class="contact-label">LOCATION</div><div class="contact-value">${addressParts.join(", ")}</div></div>` : ""}
//       </div>
//     </div>
//     <div class="resume-main">
//       ${mainContent}
//     </div>
//   </div>
// </body>
// </html>`;
//   }, [contact, educations, experiences, skills, projects, finalize, summary, linkedinUrl, portfolioUrl, githubUrl, formattedDob, addressParts, styles]);

//   // ─────────────────────────────────────────────────────────────────────────
//   // PAGE SPLITTER — same logic as TemplateOne
//   // ─────────────────────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t13-resume");
//         if (!resumeEl) { resolve([fullHtml]); return; }
//         const resumeSnapshot = resumeEl.outerHTML;

//         const iframe = document.createElement("iframe");
//         iframe.style.cssText = [
//           "position:fixed", "top:0", "left:-9999px",
//           `width:${A4_W}px`, "height:10000px", "border:none",
//           "opacity:0", "pointer-events:none", "z-index:-1",
//         ].join(";");
//         document.body.appendChild(iframe);

//         const measureDoc = iframe.contentDocument!;
//         measureDoc.open();
//         measureDoc.write(`<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
//   <style>
//     ${styles}
//     html, body {
//       margin: 0 !important; padding: 0 !important;
//       width: ${A4_W}px !important; height: auto !important;
//       overflow: visible !important; background: white !important;
//     }
//     .t13-resume {
//       width: ${A4_W}px !important;
//       padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important;
//       padding-top: 0 !important; padding-bottom: 0 !important;
//       margin: 0 !important; box-sizing: border-box !important;
//     }
//     .t13-resume .resume-header {
//       margin: 0 -${MARGIN}px !important;
//       padding-left: ${MARGIN}px !important;
//       padding-right: ${MARGIN}px !important;
//     }
//   </style>
// </head>
// <body>${resumeSnapshot}</body>
// </html>`);
//         measureDoc.close();

//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t13-resume");
//           if (!resume) {
//             document.body.removeChild(iframe);
//             resolve([fullHtml]);
//             return;
//           }

//           measureDoc.documentElement.style.cssText = "height:auto!important;overflow:visible!important;";
//           measureDoc.body.style.cssText = "margin:0;padding:0;height:auto!important;overflow:visible!important;";
//           void resume.offsetHeight;

//           const totalH = resume.scrollHeight;
//           const resumeRect = resume.getBoundingClientRect();
//           const scrollY = measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;

//           const getRelTop = (el: HTMLElement): number => {
//             const r = el.getBoundingClientRect();
//             return r.top - resumeRect.top + scrollY;
//           };
//           const getRelBottom = (el: HTMLElement): number =>
//             getRelTop(el) + el.getBoundingClientRect().height;

//           interface Block { top: number; bottom: number; id?: string; }
//           const blocks: Block[] = [];

//           // Individual avoid-break items
//           const ITEM_SELECTORS = [
//             ".experience-item",
//             ".education-item",
//             ".custom-section",
//             ".resume-header",
//             ".summary-text",
//             ".skills-container",
//           ].join(", ");

//           resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top = getRelTop(el);
//             const bottom = getRelBottom(el);
//             if (bottom - top > 8) blocks.push({ top, bottom, id: el.dataset.blockId });
//           });

//           // Section title + first item paired — prevents orphaned titles
//           resume.querySelectorAll<HTMLElement>(".section-title").forEach((title) => {
//             const titleTop = getRelTop(title);
//             let firstItem: HTMLElement | null = null;
//             let sib = title.nextElementSibling as HTMLElement | null;
//             while (sib) {
//               if (sib.getBoundingClientRect().height > 8) { firstItem = sib; break; }
//               sib = sib.nextElementSibling as HTMLElement | null;
//             }
//             if (firstItem) {
//               const deepChild = firstItem.querySelector<HTMLElement>(
//                 ".experience-item, .education-item, .custom-section, .skills-container, .summary-text"
//               );
//               const anchor = deepChild || firstItem;
//               const anchorBottom = getRelBottom(anchor);
//               if (anchorBottom - titleTop > 8) {
//                 const sectionId = (title.parentElement as HTMLElement)?.dataset?.blockId;
//                 blocks.push({ top: titleTop, bottom: anchorBottom, id: sectionId });
//               }
//             }
//           });

//           blocks.sort((a, b) => a.top - b.top);

//           // Calculate cut points — pick min(top) among all straddling blocks
//           const pageStarts: number[] = [0];
//           const pageBreakIds: string[] = [];
//           const MAX_PAGES = 20;

//           while (pageStarts.length < MAX_PAGES) {
//             const currentStart = pageStarts[pageStarts.length - 1];
//             const naiveCut = currentStart + PAGE_CONTENT_H;
//             if (naiveCut >= totalH) break;

//             let actualCut = naiveCut;
//             let cutBlockId: string | undefined;

//             for (const block of blocks) {
//               if (block.top >= naiveCut) break;
//               if (block.bottom <= currentStart) continue;
//               if (block.top >= currentStart && block.bottom > naiveCut) {
//                 if (block.top < actualCut) {
//                   actualCut = block.top;
//                   cutBlockId = block.id;
//                 }
//               }
//             }

//             if (actualCut <= currentStart) actualCut = naiveCut;
//             pageStarts.push(actualCut);
//             if (cutBlockId) pageBreakIds.push(cutBlockId);
//           }

//           // Store pageBreakIds for PDF download
//           (window as any).__resumeT13PageBreakIds = pageBreakIds;

//           document.body.removeChild(iframe);

//           // Build page HTMLs — clip at actual cut point, not always PAGE_CONTENT_H
//           const pageHtmls: string[] = [];

//           for (let i = 0; i < pageStarts.length; i++) {
//             const contentOffsetY = pageStarts[i];
//             const nextStart = pageStarts[i + 1] ?? totalH;
//             const clipH = nextStart - contentOffsetY;

//             pageHtmls.push(`<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
//   <style>
//     ${styles}
//     html, body {
//       margin: 0 !important; padding: 0 !important;
//       width: ${A4_W}px !important; height: ${A4_H}px !important;
//       overflow: hidden !important; background: white !important;
//     }
//     .page-margin-box {
//       position: relative; width: ${A4_W}px; height: ${A4_H}px;
//       background: white; overflow: hidden;
//     }
//     .page-content-clip {
//       position: absolute; top: ${MARGIN}px; left: 0;
//       width: ${A4_W}px; height: ${clipH}px; overflow: hidden;
//     }
//     .page-shift {
//       position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px;
//     }
//     .t13-resume {
//       width: ${A4_W}px !important;
//       padding-top: 0 !important; padding-bottom: 0 !important;
//       // padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important;
//       margin: 0 !important;
//     }
//     .t13-resume .resume-header {
//       margin: 0 -${MARGIN}px !important;
//       // padding-left: ${MARGIN}px !important;
//       // padding-right: ${MARGIN}px !important;
//     }
//   </style>
// </head>
// <body>
//   <div class="page-margin-box">
//     <div class="page-content-clip">
//       <div class="page-shift">
//         ${resumeSnapshot}
//       </div>
//     </div>
//   </div>
// </body>
// </html>`);
//           }

//           resolve(pageHtmls);
//         };

//         const win = iframe.contentWindow as any;
//         if (win?.document?.fonts?.ready) {
//           win.document.fonts.ready.then(() => {
//             setTimeout(() => requestAnimationFrame(doMeasure), 100);
//           });
//         } else {
//           setTimeout(doMeasure, 500);
//         }
//       });
//     },
//     [styles],
//   );

//   // ── Debounced updates ────────────────────────────────────
//   const scheduleUpdate = useCallback((html: string) => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 300);
//   }, []);

//   useEffect(() => {
//     scheduleUpdate(generateHTML());
//     return () => { if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current); };
//   }, [generateHTML, scheduleUpdate]);

//   useEffect(() => {
//     if (!htmlContent) return;
//     splitIntoPages(htmlContent).then(setPages);
//   }, [htmlContent, splitIntoPages]);

//   // ── PDF download — uses pageBreakIds from splitIntoPages ─
//   const handleDownload = async () => {
//     try {
//       const pageBreakIds: string[] = (window as any).__resumeT13PageBreakIds || [];
//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html: generateHTML(true, pageBreakIds) },
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

//   return (
//     <>
//       {/* {lastSegment === "download-resume" && ( */}
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
//       {/* )} */}

//       {alldata ? (
//         <div style={{ width: `${A4_W}px`, height: `${A4_H}px`, transform: "scale(0.36)", transformOrigin: "top left", overflow: "hidden", pointerEvents: "none", flexShrink: 0 }}>
//           {pages[0] ? (
//             <iframe title="resume-thumb" srcDoc={pages[0]}
//               style={{ width: `${A4_W}px`, height: `${A4_H}px`, border: "none", display: "block", pointerEvents: "none" }}
//               sandbox="allow-same-origin" />
//           ) : (
//             <div style={{ width: `${A4_W}px`, height: `${A4_H}px`, background: "white", display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc", fontSize: 14, fontFamily: "sans-serif" }}>
//               Loading…
//             </div>
//           )}
//         </div>
//       ) : (
//         <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
//           {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
//             <div key={idx} style={{ marginBottom: "28px" }}>
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
//                 <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
//                 <span style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280", whiteSpace: "nowrap", padding: "3px 12px", background: "#f3f4f6", borderRadius: "999px", border: "1px solid #e5e7eb", letterSpacing: "0.05em", fontFamily: "system-ui, sans-serif" }}>
//                   Page {idx + 1}{pages.length > 1 ? ` of ${pages.length}` : ""}
//                 </span>
//                 <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
//               </div>
//               <div style={{ width: `${A4_W}px`, height: `${A4_H}px`, overflow: "hidden", background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)", borderRadius: "2px", flexShrink: 0 }}>
//                 <iframe
//                   title={`resume-page-${idx + 1}`}
//                   srcDoc={pageHtml}
//                   style={{ width: `${A4_W}px`, height: `${A4_H}px`, border: "none", display: "block", pointerEvents: "none" }}
//                   scrolling="no"
//                   sandbox="allow-same-origin allow-scripts"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default TemplateThirteen;





// "use client";
// import React, {
//   useContext,
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
// } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   formatMonthYear,
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";
// import api from "@/app/utils/api";

// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px
// const CONTENT_W = A4_W - MARGIN * 2; // 680px

// const TemplateThirteen: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

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

//   const styles = `
//     @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

// @page { size: A4; margin: ${MARGIN}px; }
//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t13-resume {
//       width: ${A4_W}px;
//       padding: 0;
//       background: white;
//      margin: ${MARGIN};
//       font-family: 'Montserrat', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
//       color: #111111;
//     }

//     .t13-resume, .t13-resume * {
//       font-family: 'Montserrat', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
//     }

//     .t13-resume p {
//       margin: 0 0 4px 0 !important; padding: 0 !important; line-height: 1.6 !important;
//     }
//     .t13-resume p:last-child { margin-bottom: 0 !important; }

//     .t13-resume .experience-description ul, .t13-resume .experience-description ol,
//     .t13-resume .education-description ul,  .t13-resume .education-description ol,
//     .t13-resume .skills-content ul,         .t13-resume .skills-content ol,
//     .t13-resume .custom-section-content ul, .t13-resume .custom-section-content ol {
//       margin: 4px 0 4px 20px !important; padding-left: 20px !important;
//     }
//     .t13-resume .experience-description li, .t13-resume .education-description li,
//     .t13-resume .skills-content li,         .t13-resume .custom-section-content li {
//       margin-bottom: 2px !important; line-height: 1.6 !important;
//     }
//     .t13-resume .experience-description ul, .t13-resume .education-description ul,
//     .t13-resume .skills-content ul,         .t13-resume .custom-section-content ul { list-style-type: disc !important; }
//     .t13-resume .experience-description ol, .t13-resume .education-description ol,
//     .t13-resume .skills-content ol,         .t13-resume .custom-section-content ol { list-style-type: decimal !important; }
//     .t13-resume .experience-description strong, .t13-resume .education-description strong,
//     .t13-resume .skills-content strong,         .t13-resume .custom-section-content strong { font-weight: 700 !important; }
//     .t13-resume .experience-description em, .t13-resume .education-description em,
//     .t13-resume .skills-content em,         .t13-resume .custom-section-content em { font-style: italic !important; }
//     .t13-resume .experience-description u, .t13-resume .education-description u,
//     .t13-resume .skills-content u,          .t13-resume .custom-section-content u { text-decoration: underline !important; }
//     .t13-resume .experience-description p, .t13-resume .education-description p,
//     .t13-resume .skills-content p,          .t13-resume .custom-section-content p { white-space: pre-wrap !important; }

//     .t13-resume .skills-content {
//       font-size: 13px; font-weight: 500; color: #444444; line-height: 1.6;
//     }

//     /* Header */
//      .t13-resume .resume-header {
//       padding: 40px ${MARGIN}px 30px ${MARGIN}px;
//       background: #0a0a0a;
//       color: white;
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t13-resume .name {
//       font-size: 40px; font-weight: 800; letter-spacing: -0.5px;
//       margin: 0 0 8px 0; color: white; text-transform: uppercase; line-height: 1.1;
//     }
//     .t13-resume .job-title {
//       font-size: 14px; font-weight: 500; letter-spacing: 3px;
//       text-transform: uppercase; color: #aaaaaa; margin-bottom: 25px;
//       padding-bottom: 20px; border-bottom: 2px solid rgba(255,255,255,0.15);
//     }
//     .t13-resume .contact-grid {
//       display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//       gap: 14px; margin-top: 10px;
//     }
//     .t13-resume .contact-item { display: flex; flex-direction: column; gap: 4px; }
//     .t13-resume .contact-label {
//       font-size: 10px; font-weight: 700; text-transform: uppercase;
//       letter-spacing: 1.5px; color: #888888;
//     }
//     .t13-resume .contact-value {
//       font-size: 13px; font-weight: 500; color: white; line-height: 1.4; word-break: break-word;
//     }
//     .t13-resume .contact-value a { color: white; text-decoration: none; }

//     .t13-resume .education-grade { font-size: 12px; font-weight: 500; color: #666666; margin-top: 4px; }

//     /* Main content */
//     .t13-resume .resume-main { padding: 35px 0px 45px 0px; }

//     .t13-resume .section { margin-bottom: 30px; }
//     .t13-resume .section:last-child { margin-bottom: 0; }

//     .t13-resume .section-title {
//       font-size: 18px; font-weight: 800; text-transform: uppercase;
//       letter-spacing: 2px; color: #111111; margin: 0 0 18px 0;
//       padding-bottom: 8px; border-bottom: 3px solid #111111;
//       display: inline-block;
//       page-break-after: avoid; break-after: avoid;
//     }

//     .t13-resume .summary-text {
//       font-size: 13.5px; line-height: 1.65; color: #333333; font-weight: 500;
//     }

//     .t13-resume .experience-item {
//       margin-bottom: 28px;
//       page-break-inside: avoid; break-inside: avoid;
//     }
//     .t13-resume .experience-item:last-child { margin-bottom: 0; }
//     .t13-resume .experience-header { margin-bottom: 10px; }
//     .t13-resume .experience-title-row {
//       display: flex; justify-content: space-between; align-items: baseline;
//       flex-wrap: wrap; gap: 10px; margin-bottom: 4px;
//     }
//     .t13-resume .experience-title { font-size: 17px; font-weight: 800; color: #111111; }
//     .t13-resume .experience-date { font-size: 11.5px; font-weight: 600; color: #666666; letter-spacing: 0.5px; }
//     .t13-resume .experience-company { font-size: 14px; font-weight: 600; color: #444444; margin-top: 2px; }
//     .t13-resume .experience-description { margin-top: 10px; }

//     .t13-resume .education-item {
//       margin-bottom: 24px;
//       page-break-inside: avoid; break-inside: avoid;
//     }
//     .t13-resume .education-item:last-child { margin-bottom: 0; }
//     .t13-resume .education-header { margin-bottom: 8px; }
//     .t13-resume .education-title-row {
//       display: flex; justify-content: space-between; align-items: baseline;
//       flex-wrap: wrap; gap: 10px; margin-bottom: 4px;
//     }
//     .t13-resume .education-school { font-size: 17px; font-weight: 800; color: #111111; }
//     .t13-resume .education-date { font-size: 11.5px; font-weight: 600; color: #666666; }
//     .t13-resume .education-degree { font-size: 14px; font-weight: 600; color: #444444; margin-top: 2px; }
//     .t13-resume .education-description { margin-top: 8px; }

//     .t13-resume .skills-container { margin-top: 8px; }

//     .t13-resume .project-links { display: flex; gap: 15px; }
//     .t13-resume .project-link { font-size: 10px; font-weight: 600; color: #666666; text-decoration: underline; }
//     .t13-resume .project-tech-stack { font-size: 11px; font-weight: 500; color: #777777; margin: 4px 0; }

//     .t13-resume .custom-section { margin-bottom: 20px; }
//     .t13-resume .custom-section:last-child { margin-bottom: 0; }
//     .t13-resume .custom-section-title {
//       font-size: 15px; font-weight: 800; color: #111111;
//       margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;
//     }
//     .t13-resume .custom-section-content {
//       font-size: 13.5px; font-weight: 500; color: #444444; line-height: 1.6;
//     }

//     /* Page break marker injected for PDF */
//     .t13-page-break {
//       page-break-before: always !important;
//       break-before: page !important;
//       display: block; height: 0; margin: 0; padding: 0;
//     }

//     @media print {
//       * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
//       .t13-resume { width: 100% !important; padding: 0 !important; margin: 0 !important; }
//        .t13-resume .resume-header {
//         background: #0a0a0a !important;
//         padding: ${MARGIN}px ${MARGIN}px 30px ${MARGIN}px !important;
//       }
//       .t13-resume .resume-main { padding: 35px 0px 45px 0px !important; }
//       .t13-resume .section-title { border-bottom: 3px solid #111111 !important; }
//       .t13-resume p { margin: 0 0 4px 0 !important; }
//     }
//   `;

//   // ── HTML builder ─────────────────────────────────────────
//   const generateHTML = useCallback(
//     (forPDF = false, pageBreakIds: string[] = []): string => {
//       const href = (url: string) =>
//         url.startsWith("http") ? url : `https://${url}`;
//       const cleanUrl = (url: string) =>
//         url.replace(/^https?:\/\//, "").replace(/^www\./, "");

//       const skillsClean = cleanQuillHTML(skills);
//       const skillsBlock =
//         skillsClean && skillsClean !== "<p><br></p>"
//           ? `<div class="section" data-block-id="skills-section">
//            <h2 class="section-title">Skills</h2>
//            <div class="skills-container">
//              <div class="skills-content" data-block-id="skills-content">${skillsClean}</div>
//            </div>
//          </div>`
//           : "";

//       const projectsBlock = projects.length
//         ? `<div class="section" data-block-id="proj-section">
//            <h2 class="section-title">Projects</h2>
//            ${projects
//              .map(
//                (p: any, i: number) => `
//              <div class="experience-item" data-block-id="proj-${i}">
//                <div class="experience-header">
//                  <div class="experience-title-row">
//                    <span class="experience-title">${p.title || ""}</span>
//                    <div class="project-links">
//                      ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link">Live Demo</a>` : ""}
//                      ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link">GitHub</a>` : ""}
//                    </div>
//                  </div>
//                  ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(", ")}</div>` : ""}
//                  ${p.description ? `<div class="experience-description">${cleanQuillHTML(p.description)}</div>` : ""}
//                </div>
//              </div>`,
//              )
//              .join("")}
//          </div>`
//         : "";

//       const customBlock =
//         !Array.isArray(finalize) &&
//         Array.isArray(finalize?.customSection) &&
//         finalize.customSection.some(
//           (s: any) => s?.name?.trim() || s?.description?.trim(),
//         )
//           ? `<div class="section" data-block-id="custom-section">
//              ${finalize.customSection
//                .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//                .map(
//                  (s: any, i: number) => `
//                  <div class="custom-section" data-block-id="custom-${i}">
//                    ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
//                    ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//                  </div>`,
//                )
//                .join("")}
//            </div>`
//           : "";

//       const summaryBlock = summary
//         ? `<div class="section" data-block-id="summary">
//            <h2 class="section-title">Profile</h2>
//            <div class="summary-text">${cleanQuillHTML(summary)}</div>
//          </div>`
//         : "";

//       const expBlock = experiences.length
//         ? `<div class="section" data-block-id="exp-section">
//            <h2 class="section-title">Experience</h2>
//            ${experiences
//              .map((exp: any, i: number) => {
//                const startFormatted = formatMonthYear(exp.startDate, false);
//                const endFormatted = exp.endDate
//                  ? formatMonthYear(exp.endDate, false)
//                  : "Present";
//                const companyLocation = [exp.employer, exp.location]
//                  .filter(Boolean)
//                  .join(" • ");
//                return `<div class="experience-item" data-block-id="exp-${i}">
//                <div class="experience-header">
//                  <div class="experience-title-row">
//                    <span class="experience-title">${exp.jobTitle || ""}</span>
//                    <span class="experience-date">${startFormatted} — ${endFormatted}</span>
//                  </div>
//                  <div class="experience-company">${companyLocation}</div>
//                </div>
//                ${exp.text ? `<div class="experience-description">${cleanQuillHTML(exp.text)}</div>` : ""}
//              </div>`;
//              })
//              .join("")}
//          </div>`
//         : "";

//       const eduBlock = educations.length
//         ? `<div class="section" data-block-id="edu-section">
//            <h2 class="section-title">Education</h2>
//            ${educations
//              .map((edu: any, i: number) => {
//                const dateStr =
//                  edu.startDate || edu.endDate
//                    ? `${edu.startDate || ""} — ${edu.endDate || "Present"}`
//                    : "";
//                const formattedGrade = formatGradeToCgpdAndPercentage(
//                  edu.grade || "",
//                );
//                const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//                return `<div class="education-item" data-block-id="edu-${i}">
//                <div class="education-header">
//                  <div class="education-title-row">
//                    <span class="education-school">${edu.schoolname || ""}</span>
//                    ${dateStr ? `<span class="education-date">${dateStr}</span>` : ""}
//                  </div>
//                  ${edu.degree ? `<div class="education-degree">${edu.degree}</div>` : ""}
//                  ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                </div>
//                ${eduTextHtml ? `<div class="education-description">${eduTextHtml}</div>` : ""}
//              </div>`;
//              })
//              .join("")}
//          </div>`
//         : "";

//       const pdfStyle = forPDF
//         ? `<style>
//       html, body { margin: 0 !important; padding: 0 !important; }
//       .t13-resume { width: 100% !important; padding: 0 !important; margin: 0 !important; }
//       .t13-resume .resume-header { padding: 40px ${MARGIN}px 30px ${MARGIN}px !important; }
//       .t13-resume .resume-main { padding: 35px 0px 45px 0px !important; }
//     </style>`
//         : "";

//       let mainContent = `
//       ${summaryBlock}
//       ${expBlock}
//       ${projectsBlock}
//       ${eduBlock}
//       ${skillsBlock}
//       ${customBlock}
//     `;

//       // Inject page-break markers before elements at cut points (PDF only)
//       if (forPDF && pageBreakIds.length > 0) {
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = mainContent;
//         pageBreakIds.forEach((id) => {
//           const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//           if (el) {
//             const breakDiv = document.createElement("div");
//             breakDiv.className = "t13-page-break";
//             el.parentNode?.insertBefore(breakDiv, el);
//           }
//         });
//         mainContent = tempDiv.innerHTML;
//       }

//       return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t13-resume">
//     <div class="resume-header" data-block-id="header">
//       <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//       <div class="job-title">${
//         contact?.jobTitle
//           ? typeof contact.jobTitle === "string"
//             ? contact.jobTitle
//             : (contact.jobTitle as any)?.name || ""
//           : ""
//       }</div>
//       <div class="contact-grid">
//         ${contact?.email ? `<div class="contact-item"><div class="contact-label">EMAIL</div><div class="contact-value">${contact.email}</div></div>` : ""}
//         ${contact?.phone ? `<div class="contact-item"><div class="contact-label">PHONE</div><div class="contact-value">${contact.phone}</div></div>` : ""}
//         ${formattedDob ? `<div class="contact-item"><div class="contact-label">BIRTH DATE</div><div class="contact-value">${formattedDob}</div></div>` : ""}
//         ${linkedinUrl ? `<div class="contact-item"><div class="contact-label">LINKEDIN</div><div class="contact-value"><a href="${href(linkedinUrl)}">${cleanUrl(linkedinUrl)}</a></div></div>` : ""}
//         ${githubUrl ? `<div class="contact-item"><div class="contact-label">GITHUB</div><div class="contact-value"><a href="${href(githubUrl)}">${cleanUrl(githubUrl)}</a></div></div>` : ""}
//         ${portfolioUrl ? `<div class="contact-item"><div class="contact-label">PORTFOLIO</div><div class="contact-value"><a href="${href(portfolioUrl)}">${cleanUrl(portfolioUrl)}</a></div></div>` : ""}
//         ${addressParts.length ? `<div class="contact-item"><div class="contact-label">LOCATION</div><div class="contact-value">${addressParts.join(", ")}</div></div>` : ""}
//       </div>
//     </div>
//     <div class="resume-main">
//       ${mainContent}
//     </div>
//   </div>
// </body>
// </html>`;
//     },
//     [
//       contact,
//       educations,
//       experiences,
//       skills,
//       projects,
//       finalize,
//       summary,
//       linkedinUrl,
//       portfolioUrl,
//       githubUrl,
//       formattedDob,
//       addressParts,
//       styles,
//     ],
//   );

//   // ─────────────────────────────────────────────────────────────────────────
//   // PAGE SPLITTER — same logic as TemplateOne
//   // ─────────────────────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t13-resume");
//         if (!resumeEl) {
//           resolve([fullHtml]);
//           return;
//         }
//         const resumeSnapshot = resumeEl.outerHTML;

//         const iframe = document.createElement("iframe");
//         iframe.style.cssText = [
//           "position:fixed",
//           "top:0",
//           "left:-9999px",
//           `width:${CONTENT_W}px`,
//           "height:10000px",
//           "border:none",
//           "opacity:0",
//           "pointer-events:none",
//           "z-index:-1",
//         ].join(";");
//         document.body.appendChild(iframe);

//         const measureDoc = iframe.contentDocument!;
//         measureDoc.open();
//         measureDoc.write(`<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
//   <style>
//     ${styles}
//     html, body {
//       margin: 0 !important; padding: 0 !important;
//       width: ${CONTENT_W}px !important; height: auto !important;
//       overflow: visible !important; background: white !important;
//     }
//     .t13-resume {
//       width: ${CONTENT_W}px !important;
//       padding: 0 !important;
//       margin: 0 !important; box-sizing: border-box !important;
//     }
//     .t13-resume .resume-header {
//       padding: 40px ${MARGIN}px 30px ${MARGIN}px !important;
//     }
//     .t13-resume .resume-main {
//       padding: 35px 0px 45px 0px !important;
//     }
//   </style>
// </head>
// <body>${resumeSnapshot}</body>
// </html>`);
//         measureDoc.close();

//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t13-resume");
//           if (!resume) {
//             document.body.removeChild(iframe);
//             resolve([fullHtml]);
//             return;
//           }

//           measureDoc.documentElement.style.cssText =
//             "height:auto!important;overflow:visible!important;";
//           measureDoc.body.style.cssText =
//             "margin:0;padding:0;height:auto!important;overflow:visible!important;";
//           void resume.offsetHeight;

//           const totalH = resume.scrollHeight;
//           const resumeRect = resume.getBoundingClientRect();
//           const scrollY =
//             measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;

//           const getRelTop = (el: HTMLElement): number => {
//             const r = el.getBoundingClientRect();
//             return r.top - resumeRect.top + scrollY;
//           };
//           const getRelBottom = (el: HTMLElement): number =>
//             getRelTop(el) + el.getBoundingClientRect().height;

//           interface Block {
//             top: number;
//             bottom: number;
//             id?: string;
//           }
//           const blocks: Block[] = [];

//           const ITEM_SELECTORS = [
//             ".experience-item",
//             ".education-item",
//             ".custom-section",
//             ".resume-header",
//             ".summary-text",
//             ".skills-container",
//           ].join(", ");

//           resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top = getRelTop(el),
//               bottom = getRelBottom(el);
//             if (bottom - top > 8)
//               blocks.push({ top, bottom, id: el.dataset.blockId });
//           });

//           resume
//             .querySelectorAll<HTMLElement>(".section-title")
//             .forEach((title) => {
//               const titleTop = getRelTop(title);
//               let firstItem: HTMLElement | null = null;
//               let sib = title.nextElementSibling as HTMLElement | null;
//               while (sib) {
//                 if (sib.getBoundingClientRect().height > 8) {
//                   firstItem = sib;
//                   break;
//                 }
//                 sib = sib.nextElementSibling as HTMLElement | null;
//               }
//               if (firstItem) {
//                 const deepChild = firstItem.querySelector<HTMLElement>(
//                   ".experience-item, .education-item, .custom-section, .skills-container, .summary-text",
//                 );
//                 const anchor = deepChild || firstItem;
//                 const anchorBottom = getRelBottom(anchor);
//                 if (anchorBottom - titleTop > 8) {
//                   const sectionId = (title.parentElement as HTMLElement)
//                     ?.dataset?.blockId;
//                   blocks.push({
//                     top: titleTop,
//                     bottom: anchorBottom,
//                     id: sectionId,
//                   });
//                 }
//               }
//             });

//           blocks.sort((a, b) => a.top - b.top);

//           const pageStarts: number[] = [0];
//           const pageBreakIds: string[] = [];
//           const MAX_PAGES = 20;

//           while (pageStarts.length < MAX_PAGES) {
//             const currentStart = pageStarts[pageStarts.length - 1];
//             const naiveCut = currentStart + PAGE_CONTENT_H;
//             if (naiveCut >= totalH) break;
//             let actualCut = naiveCut,
//               cutBlockId: string | undefined;
//             for (const block of blocks) {
//               if (block.top >= naiveCut) break;
//               if (block.bottom <= currentStart) continue;
//               if (
//                 block.top >= currentStart &&
//                 block.bottom > naiveCut &&
//                 block.top < actualCut
//               ) {
//                 actualCut = block.top;
//                 cutBlockId = block.id;
//               }
//             }
//             if (actualCut <= currentStart) actualCut = naiveCut;
//             pageStarts.push(actualCut);
//             if (cutBlockId) pageBreakIds.push(cutBlockId);
//           }

//           (window as any).__resumeT13PageBreakIds = pageBreakIds;
//           document.body.removeChild(iframe);

//           const pageHtmls: string[] = [];
//           for (let i = 0; i < pageStarts.length; i++) {
//             const contentOffsetY = pageStarts[i];
//             const nextStart = pageStarts[i + 1] ?? totalH;
//             const clipH = nextStart - contentOffsetY;

//             pageHtmls.push(`<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
//   <style>
//     ${styles}
//     html, body {
//       margin: 0 !important; padding: 0 !important;
//       width: ${A4_W}px !important; height: ${A4_H}px !important;
//       overflow: hidden !important; background: white !important;
//     }
//     .page-margin-box {
//       position: relative; width: ${A4_W}px; height: ${A4_H}px;
//       background: white; overflow: hidden;
//     }
//     .page-content-clip {
//       position: absolute;
//       top: ${MARGIN}px; left: ${MARGIN}px;
//       width: ${CONTENT_W}px; height: ${clipH}px; overflow: hidden;
//     }
//     .page-shift {
//       position: absolute; top: ${-contentOffsetY}px; left: 0;
//       width: ${CONTENT_W}px;
//     }
//     .t13-resume {
//       width: ${CONTENT_W}px !important;
//       padding: 0 !important;
//       margin: 0 !important;
//     }
//     .t13-resume .resume-header {
//       padding: 40px ${MARGIN}px 30px ${MARGIN}px !important;
//     }
//     .t13-resume .resume-main {
//       padding: 35px 0px 45px 0px !important;
//     }
//   </style>
// </head>
// <body>
//   <div class="page-margin-box">
//     <div class="page-content-clip">
//       <div class="page-shift">
//         ${resumeSnapshot}
//       </div>
//     </div>
//   </div>
// </body>
// </html>`);
//           }
//           resolve(pageHtmls);
//         };

//         const win = iframe.contentWindow as any;
//         if (win?.document?.fonts?.ready) {
//           win.document.fonts.ready.then(() => {
//             setTimeout(() => requestAnimationFrame(doMeasure), 100);
//           });
//         } else {
//           setTimeout(doMeasure, 500);
//         }
//       });
//     },
//     [styles],
//   );
//   // ── Debounced updates ────────────────────────────────────
//   const scheduleUpdate = useCallback((html: string) => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 300);
//   }, []);

//   useEffect(() => {
//     scheduleUpdate(generateHTML());
//     return () => {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     };
//   }, [generateHTML, scheduleUpdate]);

//   useEffect(() => {
//     if (!htmlContent) return;
//     splitIntoPages(htmlContent).then(setPages);
//   }, [htmlContent, splitIntoPages]);

//   // ── PDF download — uses pageBreakIds from splitIntoPages ─
//   const handleDownload = async () => {
//     try {
//       const pageBreakIds: string[] =
//         (window as any).__resumeT13PageBreakIds || [];

//       // const res: AxiosResponse<Blob> = await axios.post(
//       //   `${API_URL}/api/candidates/generate-pdf`,
//       //   { html: generateHTML(true, pageBreakIds) },
//       //   { responseType: "blob" },
//       // );

//       const res: AxiosResponse<Blob> = await api.post(
//         `${API_URL}/candidates/generate-pdf`,
//         { html: generateHTML(true, pageBreakIds) },
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

//   return (
//     <>
//       {/* {lastSegment === "download-resume" && ( */}
//       <div className="text-center my-5">
//         <motion.button
//           onClick={handleDownload}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-emerald-500 text-2xl md:text-base hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg"
//         >
//           Download Resume
//         </motion.button>
//       </div>
//       {/* )} */}

//       {alldata ? (
//         <div
//           style={{
//             width: `${A4_W}px`,
//             height: `${A4_H}px`,
//             transform: "scale(0.36)",
//             transformOrigin: "top left",
//             overflow: "hidden",
//             pointerEvents: "none",
//             flexShrink: 0,
//           }}
//         >
//           {pages[0] ? (
//             <iframe
//               title="resume-thumb"
//               srcDoc={pages[0]}
//               style={{
//                 width: `${A4_W}px`,
//                 height: `${A4_H}px`,
//                 border: "none",
//                 display: "block",
//                 pointerEvents: "none",
//               }}
//               sandbox="allow-same-origin"
//             />
//           ) : (
//             <div
//               style={{
//                 width: `${A4_W}px`,
//                 height: `${A4_H}px`,
//                 background: "white",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: "#ccc",
//                 fontSize: 14,
//                 fontFamily: "sans-serif",
//               }}
//             >
//               Loading…
//             </div>
//           )}
//         </div>
//       ) : (
//         <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
//           {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
//             <div key={idx} style={{ marginBottom: "28px" }}>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: "10px",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <div
//                   style={{ flex: 1, height: "1px", background: "#d1d5db" }}
//                 />
//                 <span
//                   style={{
//                     fontSize: "11px",
//                     fontWeight: 600,
//                     color: "#6b7280",
//                     whiteSpace: "nowrap",
//                     padding: "3px 12px",
//                     background: "#f3f4f6",
//                     borderRadius: "999px",
//                     border: "1px solid #e5e7eb",
//                     letterSpacing: "0.05em",
//                     fontFamily: "system-ui, sans-serif",
//                   }}
//                 >
//                   Page {idx + 1}
//                   {pages.length > 1 ? ` of ${pages.length}` : ""}
//                 </span>
//                 <div
//                   style={{ flex: 1, height: "1px", background: "#d1d5db" }}
//                 />
//               </div>
//               <div
//                 style={{
//                   width: `${A4_W}px`,
//                   height: `${A4_H}px`,
//                   overflow: "hidden",
//                   background: "white",
//                   boxShadow:
//                     "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
//                   borderRadius: "2px",
//                   flexShrink: 0,
//                 }}
//               >
//                 <iframe
//                   title={`resume-page-${idx + 1}`}
//                   srcDoc={pageHtml}
//                   style={{
//                     width: `${A4_W}px`,
//                     height: `${A4_H}px`,
//                     border: "none",
//                     display: "block",
//                     pointerEvents: "none",
//                   }}
//                   scrolling="no"
//                   sandbox="allow-same-origin allow-scripts"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default TemplateThirteen;












"use client";
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import axios, { AxiosResponse } from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import {
  formatMonthYear,
  cleanQuillHTML,
  formatDateOfBirth,
  formatGradeToCgpdAndPercentage,
} from "@/app/utils";
import { usePathname } from "next/navigation";
import { ResumeProps } from "@/app/types";
import { motion } from "framer-motion";
import api from "@/app/utils/api";
import {
  ResumeCustomization,
 
} from "@/app/(resume)/download-resume/page";
import { FaDownload, FaSpinner } from "react-icons/fa";

const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;
const CONTENT_W = A4_W - MARGIN * 2;

interface TemplateThirteenProps extends ResumeProps {
  customization?: ResumeCustomization;
}

const TemplateThirteen: React.FC<TemplateThirteenProps> = ({ alldata, customization }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
  

  // ── Customization ─────────────────────────────────────────────────────────
  const activeFontFamily = customization?.fontFamily ?? "'Montserrat', sans-serif";

  // ── Data sources ─────────────────────────────────────────────────────────
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

  // ── Complete Font import map ────────────────────────────────────────────────
  const getFontImport = (fontFamily: string): string => {
    const map: Record<string, string> = {
      "'Inter', sans-serif": "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
      "'-apple-system', 'BlinkMacSystemFont', sans-serif": "",
      "'Poppins', sans-serif": "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap",
      "'Lato', sans-serif": "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
      "'Nunito', sans-serif": "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&display=swap",
      "'Raleway', sans-serif": "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap",
      "'Montserrat', sans-serif": "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap",
      "'Open Sans', sans-serif": "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap",
      "'Roboto', sans-serif": "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
      "'Merriweather', serif": "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
      "'Playfair Display', serif": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
      "'DM Serif Display', serif": "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
      "'Libre Baskerville', serif": "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
      "'EB Garamond', serif": "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap",
      "'Crimson Text', serif": "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap",
      "'Source Code Pro', monospace": "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap",
      "'JetBrains Mono', monospace": "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
    };
    return map[fontFamily] || map["'Montserrat', sans-serif"];
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes("serif")) return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes("monospace")) return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  // ── CSS builder with dynamic font ─────────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @import url('${getFontImport(fontFamily)}');

    @page { size: A4; margin: ${MARGIN}px; }
    
    *, *::before, *::after { box-sizing: border-box; }

    html, body { margin: 0; padding: 0; background: white; }

    .t13-resume {
      width: ${A4_W}px;
      padding: 0;
      background: white;
      margin: 0;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      color: #111111;
    }

    .t13-resume p, .t13-resume div, .t13-resume span, .t13-resume li, .t13-resume a,
    .t13-resume h1, .t13-resume h2, .t13-resume h3 {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }

    .t13-resume p {
      margin: 0 0 4px 0 !important; padding: 0 !important; line-height: 1.6 !important;
    }
    .t13-resume p:last-child { margin-bottom: 0 !important; }

    .t13-resume .experience-description ul, .t13-resume .experience-description ol,
    .t13-resume .education-description ul,  .t13-resume .education-description ol,
    .t13-resume .skills-content ul,         .t13-resume .skills-content ol,
    .t13-resume .custom-section-content ul, .t13-resume .custom-section-content ol {
      margin: 4px 0 4px 20px !important; padding-left: 20px !important;
    }
    .t13-resume .experience-description li, .t13-resume .education-description li,
    .t13-resume .skills-content li,         .t13-resume .custom-section-content li {
      margin-bottom: 2px !important; line-height: 1.6 !important;
    }
    .t13-resume .experience-description ul, .t13-resume .education-description ul,
    .t13-resume .skills-content ul,         .t13-resume .custom-section-content ul { list-style-type: disc !important; }
    .t13-resume .experience-description ol, .t13-resume .education-description ol,
    .t13-resume .skills-content ol,         .t13-resume .custom-section-content ol { list-style-type: decimal !important; }
    .t13-resume .experience-description strong, .t13-resume .education-description strong,
    .t13-resume .skills-content strong,         .t13-resume .custom-section-content strong { font-weight: 700 !important; }
    .t13-resume .experience-description em, .t13-resume .education-description em,
    .t13-resume .skills-content em,         .t13-resume .custom-section-content em { font-style: italic !important; }
    .t13-resume .experience-description u, .t13-resume .education-description u,
    .t13-resume .skills-content u,          .t13-resume .custom-section-content u { text-decoration: underline !important; }
    .t13-resume .experience-description p, .t13-resume .education-description p,
    .t13-resume .skills-content p,          .t13-resume .custom-section-content p { white-space: pre-wrap !important; }

    .t13-resume .skills-content {
      font-size: 13px; font-weight: 500; color: #444444; line-height: 1.6;
    }

    /* Header */
    .t13-resume .resume-header {
      padding: 40px ${MARGIN}px 30px ${MARGIN}px;
      background: #0a0a0a;
      color: white;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .t13-resume .name {
      font-size: 40px; font-weight: 800; letter-spacing: -0.5px;
      margin: 0 0 8px 0; color: white; text-transform: uppercase; line-height: 1.1;
    }
    .t13-resume .job-title {
      font-size: 14px; font-weight: 500; letter-spacing: 3px;
      text-transform: uppercase; color: #aaaaaa; margin-bottom: 25px;
      padding-bottom: 20px; border-bottom: 2px solid rgba(255,255,255,0.15);
    }
    .t13-resume .contact-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 14px; margin-top: 10px;
    }
    .t13-resume .contact-item { display: flex; flex-direction: column; gap: 4px; }
    .t13-resume .contact-label {
      font-size: 10px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: #888888;
    }
    .t13-resume .contact-value {
      font-size: 13px; font-weight: 500; color: white; line-height: 1.4; word-break: break-word;
    }
    .t13-resume .contact-value a { color: white; text-decoration: none; }

    .t13-resume .education-grade { font-size: 12px; font-weight: 500; color: #666666; margin-top: 4px; }

    /* Main content */
    .t13-resume .resume-main { padding: 35px 0px 45px 0px; }

    .t13-resume .section { margin-bottom: 30px; }
    .t13-resume .section:last-child { margin-bottom: 0; }

    .t13-resume .section-title {
      font-size: 18px; font-weight: 800; text-transform: uppercase;
      letter-spacing: 2px; color: #111111; margin: 0 0 18px 0;
      padding-bottom: 8px; border-bottom: 3px solid #111111;
      display: inline-block;
      page-break-after: avoid; break-after: avoid;
    }

    .t13-resume .summary-text {
      font-size: 13.5px; line-height: 1.65; color: #333333; font-weight: 500;
    }

    .t13-resume .experience-item {
      margin-bottom: 28px;
      page-break-inside: avoid; break-inside: avoid;
    }
    .t13-resume .experience-item:last-child { margin-bottom: 0; }
    .t13-resume .experience-header { margin-bottom: 10px; }
    .t13-resume .experience-title-row {
      display: flex; justify-content: space-between; align-items: baseline;
      flex-wrap: wrap; gap: 10px; margin-bottom: 4px;
    }
    .t13-resume .experience-title { font-size: 17px; font-weight: 800; color: #111111; }
    .t13-resume .experience-date { font-size: 11.5px; font-weight: 600; color: #666666; letter-spacing: 0.5px; }
    .t13-resume .experience-company { font-size: 14px; font-weight: 600; color: #444444; margin-top: 2px; }
    .t13-resume .experience-description { margin-top: 10px; }

    .t13-resume .education-item {
      margin-bottom: 24px;
      page-break-inside: avoid; break-inside: avoid;
    }
    .t13-resume .education-item:last-child { margin-bottom: 0; }
    .t13-resume .education-header { margin-bottom: 8px; }
    .t13-resume .education-title-row {
      display: flex; justify-content: space-between; align-items: baseline;
      flex-wrap: wrap; gap: 10px; margin-bottom: 4px;
    }
    .t13-resume .education-school { font-size: 17px; font-weight: 800; color: #111111; }
    .t13-resume .education-date { font-size: 11.5px; font-weight: 600; color: #666666; }
    .t13-resume .education-degree { font-size: 14px; font-weight: 600; color: #444444; margin-top: 2px; }
    .t13-resume .education-description { margin-top: 8px; }

    .t13-resume .skills-container { margin-top: 8px; }

    .t13-resume .project-links { display: flex; gap: 15px; }
    .t13-resume .project-link { font-size: 10px; font-weight: 600; color: #666666; text-decoration: underline; }
    .t13-resume .project-tech-stack { font-size: 11px; font-weight: 500; color: #777777; margin: 4px 0; }

    .t13-resume .custom-section { margin-bottom: 20px; }
    .t13-resume .custom-section:last-child { margin-bottom: 0; }
    .t13-resume .custom-section-title {
      font-size: 15px; font-weight: 800; color: #111111;
      margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;
    }
    .t13-resume .custom-section-content {
      font-size: 13.5px; font-weight: 500; color: #444444; line-height: 1.6;
    }

    /* Page break marker injected for PDF */
    .t13-page-break {
      page-break-before: always !important;
      break-before: page !important;
      display: block; height: 0; margin: 0; padding: 0;
    }

    @media print {
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .t13-resume { width: 100% !important; padding: 0 !important; margin: 0 !important; }
      .t13-resume .resume-header {
        background: #0a0a0a !important;
        padding: 40px ${MARGIN}px 30px ${MARGIN}px !important;
      }
      .t13-resume .resume-main { padding: 35px 0px 45px 0px !important; }
      .t13-resume .section-title { border-bottom: 3px solid #111111 !important; }
      .t13-resume p { margin: 0 0 4px 0 !important; }
    }
  `,
    [],
  );

  const styles = buildCSS(activeFontFamily);

  // ── Helper functions ──────────────────────────────────────────────────────
  const href = (url: string) => url.startsWith("http") ? url : `https://${url}`;
  const cleanUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/^www\./, "");
  const rich = (html: string) => {
    const c = cleanQuillHTML(html);
    return c && c !== "<p><br></p>" ? c : "";
  };

  // ── Section builders ──────────────────────────────────────────────────────
  

  // ── HTML builder with section ordering ───────────────────────────────────
 // AFTER
const generateHTML = useCallback(
  (forPDF = false, pageBreakIds: string[] = [], skillsCutIndex = -1): string => {
      const fontPreloads = activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
        ? `<link href="${getFontImport(activeFontFamily)}" rel="stylesheet"/>`
        : "";


        const sectionBuilders = {
    summary: () => summary ? `
      <div class="section" data-block-id="summary">
        <h2 class="section-title">Profile</h2>
        <div class="summary-text">${rich(summary)}</div>
      </div>
    ` : "",

    experience: () => experiences.length ? `
      <div class="section" data-block-id="exp-section">
        <h2 class="section-title">Experience</h2>
        ${experiences.map((exp: any, i: number) => {
          const startFormatted = formatMonthYear(exp.startDate, false);
          const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
          const companyLocation = [exp.employer, exp.location].filter(Boolean).join(" • ");
          return `
            <div class="experience-item" data-block-id="exp-${i}">
              <div class="experience-header">
                <div class="experience-title-row">
                  <span class="experience-title">${exp.jobTitle || ""}</span>
                  <span class="experience-date">${startFormatted} — ${endFormatted}</span>
                </div>
                <div class="experience-company">${companyLocation}</div>
              </div>
              ${exp.text ? `<div class="experience-description">${rich(exp.text)}</div>` : ""}
            </div>
          `;
        }).join("")}
      </div>
    ` : "",

    projects: () => projects.length ? `
      <div class="section" data-block-id="proj-section">
        <h2 class="section-title">Projects</h2>
        ${projects.map((p: any, i: number) => `
          <div class="experience-item" data-block-id="proj-${i}">
            <div class="experience-header">
              <div class="experience-title-row">
                <span class="experience-title">${p.title || ""}</span>
                <div class="project-links">
                  ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link">Live Demo</a>` : ""}
                  ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link">GitHub</a>` : ""}
                </div>
              </div>
              ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(", ")}</div>` : ""}
              ${p.description ? `<div class="experience-description">${rich(p.description)}</div>` : ""}
            </div>
          </div>
        `).join("")}
      </div>
    ` : "",

    education: () => educations.length ? `
      <div class="section" data-block-id="edu-section">
        <h2 class="section-title">Education</h2>
        ${educations.map((edu: any, i: number) => {
          const dateStr = edu.startDate || edu.endDate ? `${edu.startDate || ""} — ${edu.endDate || "Present"}` : "";
          const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
          const eduTextHtml = edu.text ? rich(edu.text) : "";
          return `
            <div class="education-item" data-block-id="edu-${i}">
              <div class="education-header">
                <div class="education-title-row">
                  <span class="education-school">${edu.schoolname || ""}</span>
                  ${dateStr ? `<span class="education-date">${dateStr}</span>` : ""}
                </div>
                ${edu.degree ? `<div class="education-degree">${edu.degree}</div>` : ""}
                ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
              </div>
              ${eduTextHtml ? `<div class="education-description">${eduTextHtml}</div>` : ""}
            </div>
          `;
        }).join("")}
      </div>
    ` : "",

  skills: () => {
  const skillsClean = rich(skills);
  if (!skillsClean || skillsClean === "<p><br></p>") return "";

  if (forPDF && skillsCutIndex >= 0) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = skillsClean;
    const allLis = Array.from(tempDiv.querySelectorAll("li"));
    if (skillsCutIndex < allLis.length) {
      const beforeLis = allLis.slice(0, skillsCutIndex).map(li => `<li>${li.innerHTML}</li>`).join("");
      const afterLis = allLis.slice(skillsCutIndex).map(li => `<li>${li.innerHTML}</li>`).join("");
      return `<div class="section" data-block-id="skills-section">
        <h2 class="section-title">Skills</h2>
        <div class="skills-container">
          <div class="skills-content"><ul>${beforeLis}</ul></div>
        </div>
      </div>
      <div class="t13-page-break"></div>
      <div class="section" data-block-id="skills-section-continued">
        <h2 class="section-title">Skills (continued)</h2>
        <div class="skills-container">
          <div class="skills-content"><ul>${afterLis}</ul></div>
        </div>
      </div>`;
    }
  }

  return `<div class="section" data-block-id="skills-section">
    <h2 class="section-title">Skills</h2>
    <div class="skills-container">
      <div class="skills-content" data-block-id="skills-content">${skillsClean}</div>
    </div>
  </div>`;
},

    custom: () => {
      if (!Array.isArray(finalize?.customSection)) return "";
      const hasCustom = finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim());
      if (!hasCustom) return "";
      return `
        <div class="section" data-block-id="custom-section">
          ${finalize.customSection
            .filter((s: any) => s?.name?.trim() || s?.description?.trim())
            .map((s: any, i: number) => `
              <div class="custom-section" data-block-id="custom-${i}">
                ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
                ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
              </div>
            `).join("")}
        </div>
      `;
    },
  };

      // Build sections in the order defined by customization
      const sectionsHTML = [
  sectionBuilders.summary?.(),
  sectionBuilders.experience?.(),
  sectionBuilders.projects?.(),
  sectionBuilders.education?.(),
  sectionBuilders.skills?.(),
  sectionBuilders.custom?.(),
]
  .filter(Boolean)
  .join("");

      const pdfStyle = forPDF
        ? `<style>
            html, body { margin: 0 !important; padding: 0 !important; background: white !important; }
            .t13-resume { width: 100% !important; padding: 0 !important; margin: 0 !important; }
            .t13-resume .resume-header { padding: 40px ${MARGIN}px 30px ${MARGIN}px !important; }
            .t13-resume .resume-main { padding: 35px 0px 45px 0px !important; }
            @page { size: A4; margin: ${MARGIN}px !important; }
          </style>`
        : "";

      let mainContent = sectionsHTML;

      // Inject page-break markers before elements at cut points (PDF only)
      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = mainContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t13-page-break";
            el.parentNode?.insertBefore(breakDiv, el);
          }
        });
        mainContent = tempDiv.innerHTML;
      }

      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  ${fontPreloads}
  <style>${styles}</style>
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t13-resume">
    <div class="resume-header" data-block-id="header">
      <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
      <div class="job-title">${
        contact?.jobTitle
          ? typeof contact.jobTitle === "string"
            ? contact.jobTitle
            : (contact.jobTitle as any)?.name || ""
          : ""
      }</div>
      <div class="contact-grid">
        ${contact?.email ? `<div class="contact-item"><div class="contact-label">EMAIL</div><div class="contact-value">${contact.email}</div></div>` : ""}
        ${contact?.phone ? `<div class="contact-item"><div class="contact-label">PHONE</div><div class="contact-value">${contact.phone}</div></div>` : ""}
        ${formattedDob ? `<div class="contact-item"><div class="contact-label">BIRTH DATE</div><div class="contact-value">${formattedDob}</div></div>` : ""}
        ${linkedinUrl ? `<div class="contact-item"><div class="contact-label">LINKEDIN</div><div class="contact-value"><a href="${href(linkedinUrl)}">${cleanUrl(linkedinUrl)}</a></div></div>` : ""}
        ${githubUrl ? `<div class="contact-item"><div class="contact-label">GITHUB</div><div class="contact-value"><a href="${href(githubUrl)}">${cleanUrl(githubUrl)}</a></div></div>` : ""}
        ${portfolioUrl ? `<div class="contact-item"><div class="contact-label">PORTFOLIO</div><div class="contact-value"><a href="${href(portfolioUrl)}">${cleanUrl(portfolioUrl)}</a></div></div>` : ""}
        ${addressParts.length ? `<div class="contact-item"><div class="contact-label">LOCATION</div><div class="contact-value">${addressParts.join(", ")}</div></div>` : ""}
      </div>
    </div>
    <div class="resume-main">
      ${mainContent}
    </div>
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
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      formattedDob,
      addressParts,
      styles,
    ],
  );

  // ── PAGE SPLITTER ─────────────────────────────────────────────────────────
  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t13-resume");
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
          `width:${CONTENT_W}px`,
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
    ${styles}
    html, body {
      margin: 0 !important; padding: 0 !important;
      width: ${CONTENT_W}px !important; height: auto !important;
      overflow: visible !important; background: white !important;
    }
    .t13-resume {
      width: ${CONTENT_W}px !important;
      padding: 0 !important;
      margin: 0 !important; box-sizing: border-box !important;
    }
    .t13-resume .resume-header {
      padding: 40px ${MARGIN}px 30px ${MARGIN}px !important;
    }
    .t13-resume .resume-main {
      padding: 35px 0px 45px 0px !important;
    }
  </style>
</head>
<body>${resumeSnapshot}</body>
</html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t13-resume");
          if (!resume) {
            document.body.removeChild(iframe);
            resolve([fullHtml]);
            return;
          }

          measureDoc.documentElement.style.cssText = "height:auto!important;overflow:visible!important;";
          measureDoc.body.style.cssText = "margin:0;padding:0;height:auto!important;overflow:visible!important;";
          void resume.offsetHeight;

          const totalH = resume.scrollHeight;
          const resumeRect = resume.getBoundingClientRect();
          const scrollY = measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;

          const getRelTop = (el: HTMLElement): number => {
            const r = el.getBoundingClientRect();
            return r.top - resumeRect.top + scrollY;
          };
          const getRelBottom = (el: HTMLElement): number =>
            getRelTop(el) + el.getBoundingClientRect().height;

          interface Block { top: number; bottom: number; id?: string; }
          const blocks: Block[] = [];

          // AFTER
const ITEM_SELECTORS = [
  ".experience-item",
  ".education-item",
  ".custom-section",
  ".resume-header",
  ".summary-text",
].join(", ");

          resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
            const top = getRelTop(el);
            const bottom = getRelBottom(el);
            if (bottom - top > 8) blocks.push({ top, bottom, id: el.dataset.blockId });
          });

          resume.querySelectorAll<HTMLElement>(".section-title").forEach((title) => {
            const titleTop = getRelTop(title);
            let firstItem: HTMLElement | null = null;
            let sib = title.nextElementSibling as HTMLElement | null;
            while (sib) {
              if (sib.getBoundingClientRect().height > 8) {
                firstItem = sib;
                break;
              }
              sib = sib.nextElementSibling as HTMLElement | null;
            }
           // AFTER
// AFTER
if (firstItem) {
  // Skip anchor logic for skills — allow it to split across pages
  if (firstItem.classList.contains("skills-container")) return;

  const deepChild = firstItem.querySelector<HTMLElement>(
    ".experience-item, .education-item, .custom-section, .summary-text",
  );
  const anchor = deepChild || firstItem;
  const anchorBottom = getRelBottom(anchor);
  if (anchorBottom - titleTop > 8) {
    const sectionId = (title.parentElement as HTMLElement)?.dataset?.blockId;
    blocks.push({ top: titleTop, bottom: anchorBottom, id: sectionId });
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
            let actualCut = naiveCut;
            let cutBlockId: string | undefined;
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

          const skillsLis = Array.from(resume.querySelectorAll<HTMLElement>(".skills-content li"));
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
  let actualCut = naiveCut;
  let cutBlockId: string | undefined;
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
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <style>
    ${styles}
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
      position: absolute;
      top: ${MARGIN}px; left: ${MARGIN}px;
      width: ${CONTENT_W}px; height: ${clipH}px; overflow: hidden;
    }
    .page-shift {
      position: absolute; top: ${-contentOffsetY}px; left: 0;
      width: ${CONTENT_W}px;
    }
    .t13-resume {
      width: ${CONTENT_W}px !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    .t13-resume .resume-header {
      padding: 40px ${MARGIN}px 30px ${MARGIN}px !important;
    }
    .t13-resume .resume-main {
      padding: 35px 0px 45px 0px !important;
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
    [styles],
  );

  // ── Debounced updates ────────────────────────────────────
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

  // ── PDF download ─────────────────────────────────────────
  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      // const pageBreakIds: string[] = (window as any).__resumeT13PageBreakIds || [];

      // const res: AxiosResponse<Blob> = await api.post(
      //   `${API_URL}/candidates/generate-pdf`,
      //   { html: generateHTML(true, pageBreakIds) },
      //   { responseType: "blob" },
      // );

      // AFTER
const pageBreakIds: string[] = ((window as any).__resumePageBreakIds || []).filter(
  (id: string) => id !== "skills-section"
);
const skillsCutIndex: number = (window as any).__resumeSkillsCutIndex ?? -1;
const res: AxiosResponse<Blob> = await api.post(
  `${API_URL}/candidates/generate-pdf`,
  { html: generateHTML(true, pageBreakIds, skillsCutIndex) },
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
    finally{
          setIsDownloading(false)

    }
  };

  return (
    <>
      
      {lastSegment === "download-resume" && (
              <div className="text-center my-8">
                <motion.button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  whileHover={!isDownloading ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isDownloading ? { scale: 0.98 } : {}}
                  className={`
                                                                      relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold
                                                                      text-white transition-all duration-300 shadow-lg
                                                                      ${
                                                                        isDownloading
                                                                          ? "bg-gray-400 cursor-not-allowed opacity-80"
                                                                          : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600"
                                                                      }
                                                                    `}
                >
                  {/* Animated background gradient for premium feel */}
                  {!isDownloading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  )}
      
                  <div className="relative flex items-center justify-center gap-3 text-lg">
                    {isDownloading ? (
                      <>
                        <FaSpinner className="animate-spin text-xl" />
                        <span>Generating PDF ...</span>
                      </>
                    ) : (
                      <>
                        <FaDownload className="text-xl group-hover:translate-y-0.5 transition-transform" />
                        <span>Download Resume</span>
                        <span className="text-sm opacity-75 font-light ml-1">
                          PDF
                        </span>
                      </>
                    )}
                  </div>
                </motion.button>
              </div>
            )}

      {alldata ? (
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
                  boxShadow: "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
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

export default TemplateThirteen;