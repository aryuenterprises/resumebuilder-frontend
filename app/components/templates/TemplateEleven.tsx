// // ─── Minimalist Modern Single Column Resume Template ───────────
// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";

// // const TemplateEleven: React.FC = () => {
// const TemplateEleven: React.FC<ResumeProps> = ({ alldata }) => {

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
//      CSS — MINIMALIST MODERN BLACK & WHITE - CONSISTENT PADDING
//   ====================================================== */
//   const styles = `

//     .t11-resume  {
//        width: 210mm;
//     min-height: 297mm;
//       background: white;
//        font-family: 'Lato', 'Helvetica Neue', 'Segoe UI', sans-serif;
//       background-color: #ffffff;
//       line-height: 1.5;
//       color: #2c3e50;
//     }

//       .t11-resume.is-preview {
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

//     /* Header Section - Consistent Padding */
//     .t11-resume .resume-header {
//       padding: 45px 45px 30px 45px;
//       text-align: left;
//     }

//     .t11-resume .name {
//       font-size: 42px;
//       font-weight: 300;
//       letter-spacing: 1px;
//       margin-bottom: 12px;
//       color: #1a2a3a;
//       text-transform: uppercase;
//     }

//     .t11-resume .job-title {
//       font-size: 15px;
//       font-weight: 400;
//       color: #6c7a89;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       margin-bottom: 20px;
//     }

//     .t11-resume .divider {
//       width: 50px;
//       height: 2px;
//       background: #2c3e50;
//       margin: 18px 0;
//     }

//     .t11-resume .contact-row {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 20px;
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 15px;
//     }

//     .t11-resume .contact-item {
//       display: inline-flex;
//       align-items: center;
//       gap: 6px;
//     }

//     .t11-resume .address {
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 10px;
//     }

//     .t11-resume .links {
//       margin-top: 12px;
//       display: flex;
//       flex-wrap: wrap;
//       gap: 20px;
//     }

//     .t11-resume .link-item {
//       color: #2c3e50;
//       text-decoration: none;
//       font-size: 12px;
//       border-bottom: 1px solid transparent;
//       transition: border-color 0.2s;
//     }

//     .t11-resume .link-item:hover {
//       border-bottom-color: #2c3e50;
//     }

//     /* Main Content - Consistent Padding */
//     .t11-resume .resume-main {
//       padding: 20px 45px 50px 45px;
//       text-align: left;
//     }

//     /* Section Styles */
//     .t11-resume .section {
//       margin-bottom: 32px;
//       text-align: left;
//     }

//     .t11-resume .section:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .section-title {
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 2px;
//       color: #2c3e50;
//       margin-bottom: 18px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #e8ecef;
//       text-align: left;
//     }

//     /* Summary */
//    .t11-resume .summary-text {
//       font-size: 13px;
//       line-height: 1.6;
//       color: #4a5b6e;
//       text-align: left;
//     }

//     /* Experience Items */
//     .t11-resume .experience-item {
//       margin-bottom: 28px;
//       text-align: left;
//     }

//     .t11-resume .experience-item:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .experience-header {
//       margin-bottom: 10px;
//       text-align: left;
//     }

//     .t11-resume .experience-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 4px;
//       text-align: left;
//     }

//     .t11-resume .experience-title {
//       font-size: 16px;
//       font-weight: 600;
//       color: #1a2a3a;
//       text-align: left;
//     }

//     .t11-resume .experience-date {
//       font-size: 11px;
//       color: #8e9aab;
//       font-weight: 400;
//       letter-spacing: 0.3px;
//       text-align: right;
//     }

//     .t11-resume .experience-company {
//       font-size: 13px;
//       font-weight: 400;
//       color: #6c7a89;
//       margin-top: 2px;
//       text-align: left;
//     }

//     .t11-resume .experience-location {
//       font-size: 11px;
//       color: #9aa9b9;
//       margin-top: 3px;
//       text-align: left;
//     }

//     .t11-resume .experience-description {
//       margin-top: 12px;
//       text-align: left;
//     }

//     /* Bullet points */
//     .t11-resume .experience-description ul,
//     .t11-resume .education-description ul {
//       list-style-type: none;
//       padding-left: 0;
//       text-align: left;
//     }

//     .t11-resume .experience-description li,
//     .t11-resume .education-description li {
//       position: relative;
//       padding-left: 20px;
//       margin-bottom: 8px;
//       font-size: 13px;
//       color: #4a5b6e;
//       line-height: 1.55;
//       text-align: left;
//     }

//     .t11-resume .experience-description li::before,
//     .t11-resume .education-description li::before {
//       content: "—";
//       position: absolute;
//       left: 2px;
//       color: #2c3e50;
//     }

//     /* Education Items */
//     .t11-resume .education-item {
//       margin-bottom: 24px;
//       text-align: left;
//     }

//     .t11-resume .education-item:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .education-header {
//       margin-bottom: 8px;
//       text-align: left;
//     }

//     .t11-resume .education-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 4px;
//       text-align: left;
//     }

//     .t11-resume .education-school {
//       font-size: 16px;
//       font-weight: 600;
//       color: #1a2a3a;
//       text-align: left;
//     }

//     .t11-resume .education-date {
//       font-size: 11px;
//       color: #8e9aab;
//       text-align: right;
//     }

//     .t11-resume .education-degree {
//       font-size: 13px;
//       color: #6c7a89;
//       margin-top: 4px;
//       text-align: left;
//     }

//     .t11-resume .education-description {
//       margin-top: 10px;
//       text-align: left;
//     }

//     /* Skills */
//     .t11-resume .skills-container {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 12px 20px;
//       margin-top: 5px;
//       text-align: left;
//     }

//     .t11-resume .skill-item {
//       font-size: 13px;
//       color: #4a5b6e;
//       position: relative;
//       padding-left: 18px;
//       text-align: left;
//     }

//     .t11-resume .skill-item::before {
//       content: "▹";
//       position: absolute;
//       left: 2px;
//       color: #2c3e50;
//       font-size: 11px;
//     }

//     /* Additional content */
//     .t11-resume .additional-container {
//       margin-top: 5px;
//       text-align: left;
//     }

//     .t11-resume .additional-item {
//       font-size: 13px;
//       color: #4a5b6e;
//       margin-bottom: 8px;
//       position: relative;
//       padding-left: 18px;
//       text-align: left;
//     }

//     .t11-resume .additional-item::before {
//       content: "▹";
//       position: absolute;
//       left: 2px;
//       color: #2c3e50;
//       font-size: 11px;
//     }

//     /* Custom Sections */
//     .t11-resume .custom-section {
//       margin-bottom: 20px;
//       text-align: left;
//     }

//     .t11-resume .custom-section:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .custom-section-title {
//       font-size: 13px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//       color: #2c3e50;
//       margin-bottom: 8px;
//       text-align: left;
//     }

//     .t11-resume .custom-section-content {
//       font-size: 13px;
//       color: #4a5b6e;
//       line-height: 1.55;
//       padding-left: 18px;
//       text-align: left;
//     }

//     /* Print Styles - EXACT SAME PADDING AS SCREEN */
//     @media print {
//       @page {
//         size: A4;
//         margin: 0;
//       }

//       body {
//         background: white;
//         margin: 0;
//         padding: 0;
//       }

//       .t11-resume  {
//         margin: 0;
//         max-width: 100%;
//         box-shadow: none;
//         padding: 0;
//       }

//       /* KEEP EXACT SAME PADDING AS SCREEN */
//       .t11-resume .resume-header {
//         padding: 45px 45px 30px 45px !important;
//       }

//       .t11-resume .resume-main {
//         padding: 20px 45px 50px 45px !important;
//       }

//      .t11-resume .section {
//         page-break-inside: avoid;
//       }

//       .t11-resume .experience-item {
//         page-break-inside: avoid;
//       }

//       .t11-resume .divider {
//         background: #2c3e50;
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }
//     }

//     /* Responsive - ADJUST PADDING FOR MOBILE BUT KEEP CONSISTENT */
//     @media (max-width: 600px) {
//       .t11-resume  {
//         margin: 15px;
//       }

//       .t11-resume .resume-header {
//         padding: 30px 25px 20px 25px !important;
//       }

//       .t11-resume .resume-main {
//         padding: 15px 25px 35px 25px !important;
//       }

//       .t11-resume .name {
//         font-size: 32px;
//       }

//       .t11-resume .job-title {
//         font-size: 13px;
//       }

//       .t11-resume .contact-row {
//         flex-direction: column;
//         gap: 6px;
//       }

//       .t11-resume .experience-title-row {
//         flex-direction: column;
//         gap: 4px;
//       }

//       .t11-resume .experience-date {
//         text-align: left;
//       }

//       .t11-resume .education-title-row {
//         flex-direction: column;
//         gap: 4px;
//       }

//       .t11-resume .education-date {
//         text-align: left;
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
//       return `<div class="experience-description" style="white-space: pre-wrap; text-align: left;">${stripHtml(text)}</div>`;
//     }
//   };

//   const generateHTML = () => {
//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8"/>
//         <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//         <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&display=swap" rel="stylesheet">
//         <style>${styles}</style>
//       </head>
//       <body>
//         <div class="t11-resume ">
//           <!-- HEADER -->
//           <div class="resume-header">
//             <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//             <div class="job-title">${
//               contact?.jobTitle
//                 ? typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""
//                 : ""
//             }</div>
//             <div class="divider"></div>
//             <div class="contact-row">
//               ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
//               ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
//             </div>
//             ${addressParts.length ? `<div class="address">${addressParts.join(" | ")}</div>` : ""}
//             <div class="links">
//               ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
//               ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
//             </div>
//           </div>

//           <!-- MAIN CONTENT -->
//           <div class="resume-main">
//             <!-- SUMMARY -->
//             ${summary ? `
//               <div class="section">
//                 <h2 class="section-title">About</h2>
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
//                         <div class="experience-company">${exp.employer || ""}</div>
//                         ${exp.location ? `<div class="experience-location">${exp.location}</div>` : ""}
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

//             <!-- SKILLS -->
//             ${skills.length > 0 ? `
//               <div class="section">
//                 <h2 class="section-title">Skills</h2>
//                 <div class="skills-container">
//                   ${skills.map((s) => `
//                     <div class="skill-item">${s.skill || ""}</div>
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
//                     <div class="skill-item">${l.name}${l.level ? ` — ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</div>
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
//                     <div class="additional-item">${c.name.replace(/<[^>]*>/g, "")}</div>
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
//                     <div class="additional-item">${a.name.replace(/<[^>]*>/g, "")}</div>
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
//                     <div class="additional-item">${h.name.replace(/<[^>]*>/g, "")}</div>
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
//               backgroundColor: "#2c3e50",
//               color: "#ffffff",
//               padding: "12px 28px",
//               fontSize: "13px",
//               fontWeight: "500",
//               border: "none",
//               borderRadius: "2px",
//               cursor: "pointer",
//               fontFamily: "inherit",
//               letterSpacing: "0.8px",
//               textTransform: "uppercase"
//             }}
//           >
//             Download Resume
//           </button>
//         </div>
//       )}

//       {/* Resume Preview - EXACT SAME PADDING AS DOWNLOAD */}
//       <div         className={`t11-resume ${alldata ? 'is-preview' : ''}`}
//  style={{ margin: "0 auto",           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : ""
// }}>
//         <style>{styles}</style>

//         {/* HEADER */}
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
//           <div className="divider"></div>
//           <div className="contact-row">
//             {contact?.email && <div className="contact-item">{contact.email}</div>}
//             {contact?.phone && <div className="contact-item">{contact.phone}</div>}
//           </div>
//           {addressParts.length > 0 && (
//             <div className="address">{addressParts.join(" | ")}</div>
//           )}
//           <div className="links">
//             {linkedinUrl && (
//               <a
//                 href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 LinkedIn
//               </a>
//             )}
//             {portfolioUrl && (
//               <a
//                 href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 Portfolio
//               </a>
//             )}
//           </div>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="resume-main">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section">
//               <h2 className="section-title">About</h2>
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
//                     <div className="experience-company">{exp.employer}</div>
//                     {exp.location && <div className="experience-location">{exp.location}</div>}
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

//           {/* SKILLS */}
//           {skills.length > 0 && (
//             <div className="section">
//               <h2 className="section-title">Skills</h2>
//               <div className="skills-container">
//                 {skills.map((skill, i) => (
//                   <div key={i} className="skill-item">
//                     {skill.skill}
//                   </div>
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
//                         <div key={i} className="skill-item">
//                           {lang.name}
//                           {lang.level &&
//                             ` — ${Math.round((Number(lang.level) / 4) * 100)}%`}
//                         </div>
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
//                         <div
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
//                         <div
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
//                         <div
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

// export default TemplateEleven;

// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";

// const TemplateEleven: React.FC<ResumeProps> = ({ alldata }) => {
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
//       // Categorized Skills - Each category with its own section
//       return (
//         <div className="section">
//           <h2 className="section-title">Skills</h2>
//           {skills.map((category: any) => (
//             <div key={category.id} className="skill-category-block">
//               <div className="skill-category-title">{category.title}</div>
//               <div className="skills-container">
//                 {category.skills.map((skill: any) => (
//                   <div key={skill.id} className="skill-item">
//                     {skill.name}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     } else {
//       // Simple Skills - Grid of skill tags
//       return (
//         <div className="section">
//           <h2 className="section-title">Skills</h2>
//           <div className="skills-container">
//             {skills.map((skill: any, index: number) => (
//               <div key={skill.id || index} className="skill-item">
//                 {skill.name || skill.skill}
//               </div>
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
//             <div className="project-header">
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
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="experience-description"
//                 dangerouslySetInnerHTML={{ __html: project.description }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — MINIMALIST MODERN BLACK & WHITE
//   ====================================================== */
//   const styles = `
//     .t11-resume {
//       width: 210mm;
//       min-height: 297mm;
//       background: white;
//       font-family: 'Lato', 'Helvetica Neue', 'Segoe UI', sans-serif;
//       background-color: #ffffff;
//       line-height: 1.5;
//       color: #2c3e50;
//     }

//     .t11-resume.is-preview {
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

//     /* Header Section */
//     .t11-resume .resume-header {
//       padding: 45px 45px 30px 45px;
//       text-align: left;
//     }

//     .t11-resume .name {
//       font-size: 42px;
//       font-weight: 300;
//       letter-spacing: 1px;
//       margin-bottom: 12px;
//       color: #1a2a3a;
//       text-transform: uppercase;
//     }

//     .t11-resume .job-title {
//       font-size: 15px;
//       font-weight: 400;
//       color: #6c7a89;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       margin-bottom: 20px;
//     }

//     .t11-resume .divider {
//       width: 50px;
//       height: 2px;
//       background: #2c3e50;
//       margin: 18px 0;
//     }

//     .t11-resume .contact-row {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 20px;
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 15px;
//     }

//     .t11-resume .contact-item {
//       display: inline-flex;
//       align-items: center;
//       gap: 6px;
//     }

//     .t11-resume .address {
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 10px;
//     }

//     .t11-resume .links {
//       margin-top: 12px;
//       display: flex;
//       flex-wrap: wrap;
//       gap: 20px;
//     }

//     .t11-resume .link-item {
//       color: #2c3e50;
//       text-decoration: none;
//       font-size: 12px;
//       border-bottom: 1px solid transparent;
//       transition: border-color 0.2s;
//     }

//     /* Main Content */
//     .t11-resume .resume-main {
//       padding: 20px 45px 50px 45px;
//       text-align: left;
//     }

//     /* Section Styles */
//     .t11-resume .section {
//       margin-bottom: 32px;
//       text-align: left;
//     }

//     .t11-resume .section:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .section-title {
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 2px;
//       color: #2c3e50;
//       margin-bottom: 18px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #e8ecef;
//       text-align: left;
//     }

//     /* Summary */
//     .t11-resume .summary-text {
//       font-size: 13px;
//       line-height: 1.6;
//       color: #4a5b6e;
//       text-align: left;
//     }

//     /* Experience Items */
//     .t11-resume .experience-item {
//       margin-bottom: 28px;
//       text-align: left;
//     }

//     .t11-resume .experience-item:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .experience-header {
//       margin-bottom: 10px;
//       text-align: left;
//     }

//     .t11-resume .experience-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 4px;
//       text-align: left;
//     }

//     .t11-resume .experience-title {
//       font-size: 16px;
//       font-weight: 600;
//       color: #1a2a3a;
//       text-align: left;
//     }

//     .t11-resume .experience-date {
//       font-size: 11px;
//       color: #8e9aab;
//       font-weight: 400;
//       letter-spacing: 0.3px;
//       text-align: right;
//     }

//     .t11-resume .experience-company {
//       font-size: 13px;
//       font-weight: 400;
//       color: #6c7a89;
//       margin-top: 2px;
//       text-align: left;
//     }

//     .t11-resume .experience-description {
//       margin-top: 12px;
//       text-align: left;
//     }

//     /* Bullet points */
//     .t11-resume .experience-description ul,
//     .t11-resume .education-description ul {
//       list-style-type: none;
//       padding-left: 0;
//       text-align: left;
//     }

//     .t11-resume .experience-description li,
//     .t11-resume .education-description li {
//       position: relative;
//       padding-left: 20px;
//       margin-bottom: 8px;
//       font-size: 13px;
//       color: #4a5b6e;
//       line-height: 1.55;
//       text-align: left;
//     }

//     .t11-resume .experience-description li::before,
//     .t11-resume .education-description li::before {
//       content: "—";
//       position: absolute;
//       left: 2px;
//       color: #2c3e50;
//     }

//     /* Education Items */
//     .t11-resume .education-item {
//       margin-bottom: 24px;
//       text-align: left;
//     }

//     .t11-resume .education-item:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .education-header {
//       margin-bottom: 8px;
//       text-align: left;
//     }

//     .t11-resume .education-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 4px;
//       text-align: left;
//     }

//     .t11-resume .education-school {
//       font-size: 16px;
//       font-weight: 600;
//       color: #1a2a3a;
//       text-align: left;
//     }

//     .t11-resume .education-date {
//       font-size: 11px;
//       color: #8e9aab;
//       text-align: right;
//     }

//     .t11-resume .education-degree {
//       font-size: 13px;
//       color: #6c7a89;
//       margin-top: 4px;
//       text-align: left;
//     }

//     .t11-resume .education-description {
//       margin-top: 10px;
//       text-align: left;
//     }

//     /* SKILLS */
//     .t11-resume .skills-container {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 12px 20px;
//       margin-top: 5px;
//       text-align: left;
//     }

//     .t11-resume .skill-item {
//       font-size: 13px;
//       color: #4a5b6e;
//       position: relative;
//       padding-left: 18px;
//       text-align: left;
//     }

//     .t11-resume .skill-item::before {
//       content: "▹";
//       position: absolute;
//       left: 2px;
//       color: #2c3e50;
//       font-size: 11px;
//     }

//     /* Categorized Skills */
//     .t11-resume .skill-category-block {
//       margin-bottom: 20px;
//     }

//     .t11-resume .skill-category-block:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .skill-category-title {
//       font-size: 13px;
//       font-weight: 600;
//       color: #1a2a3a;
//       margin-bottom: 10px;
//       padding-bottom: 3px;
//       border-bottom: 1px solid #e8ecef;
//     }

//     /* PROJECTS */
//     .t11-resume .project-header {
//       margin-bottom: 10px;
//     }

//     .t11-resume .project-links {
//       display: flex;
//       gap: 15px;
//     }

//     .t11-resume .project-link {
//       font-size: 11px;
//       color: #6c7a89;
//       text-decoration: underline;
//     }

//     .t11-resume .project-tech-stack {
//       font-size: 11px;
//       color: #8e9aab;
//       margin: 6px 0;
//     }

//     /* Additional content */
//     .t11-resume .additional-container {
//       margin-top: 5px;
//       text-align: left;
//     }

//     .t11-resume .additional-item {
//       font-size: 13px;
//       color: #4a5b6e;
//       margin-bottom: 8px;
//       position: relative;
//       padding-left: 18px;
//       text-align: left;
//     }

//     .t11-resume .additional-item::before {
//       content: "▹";
//       position: absolute;
//       left: 2px;
//       color: #2c3e50;
//       font-size: 11px;
//     }

//     /* Custom Sections */
//     .t11-resume .custom-section {
//       margin-bottom: 20px;
//       text-align: left;
//     }

//     .t11-resume .custom-section:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .custom-section-title {
//       font-size: 13px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//       color: #2c3e50;
//       margin-bottom: 8px;
//       text-align: left;
//     }

//     .t11-resume .custom-section-content {
//       font-size: 13px;
//       color: #4a5b6e;
//       line-height: 1.55;
//       padding-left: 18px;
//       text-align: left;
//     }

//     /* Print Styles */
//     @media print {
//       @page {
//         size: A4;
//         margin: 0;
//       }

//       body {
//         background: white;
//         margin: 0;
//         padding: 0;
//       }

//       .t11-resume {
//         margin: 0;
//         max-width: 100%;
//         box-shadow: none;
//         padding: 0;
//       }

//       .t11-resume .resume-header {
//         padding: 45px 45px 30px 45px !important;
//       }

//       .t11-resume .resume-main {
//         padding: 20px 45px 50px 45px !important;
//       }

//       .t11-resume .section {
//         page-break-inside: avoid;
//       }

//       .t11-resume .experience-item {
//         page-break-inside: avoid;
//       }

//       .t11-resume .divider {
//         background: #2c3e50;
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }
//     }

//     /* Responsive */
//     @media (max-width: 600px) {
//       .t11-resume {
//         margin: 15px;
//       }

//       .t11-resume .resume-header {
//         padding: 30px 25px 20px 25px !important;
//       }

//       .t11-resume .resume-main {
//         padding: 15px 25px 35px 25px !important;
//       }

//       .t11-resume .name {
//         font-size: 32px;
//       }

//       .t11-resume .job-title {
//         font-size: 13px;
//       }

//       .t11-resume .contact-row {
//         flex-direction: column;
//         gap: 6px;
//       }

//       .t11-resume .experience-title-row {
//         flex-direction: column;
//         gap: 4px;
//       }

//       .t11-resume .experience-date {
//         text-align: left;
//       }

//       .t11-resume .education-title-row {
//         flex-direction: column;
//         gap: 4px;
//       }

//       .t11-resume .education-date {
//         text-align: left;
//       }

//       .t11-resume .project-links {
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
//       return `<div class="experience-description" style="white-space: pre-wrap; text-align: left;">${stripHtml(text)}</div>`;
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
//                     <div class="skill-item">${skill.name}</div>
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
//                 <div class="skill-item">${skill.name || skill.skill}</div>
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
//               <div class="project-header">
//                 <div class="experience-title-row">
//                   <span class="experience-title">${project.title || ""}</span>
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 </div>
//               </div>
//               ${project.techStack && project.techStack.length > 0 ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               ` : ""}
//               ${project.description ? `
//                 <div class="experience-description">${project.description}</div>
//               ` : ""}
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
//         <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&display=swap" rel="stylesheet">
//         <style>${styles}</style>
//       </head>
//       <body>
//         <div class="t11-resume">
//           <!-- HEADER -->
//           <div class="resume-header">
//             <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//             <div class="job-title">${
//               contact?.jobTitle
//                 ? typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""
//                 : ""
//             }</div>
//             <div class="divider"></div>
//             <div class="contact-row">
//               ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
//               ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
//             </div>
//             ${addressParts.length ? `<div class="address">${addressParts.join(" | ")}</div>` : ""}
//             <div class="links">
//               ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
//               ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
//             </div>
//           </div>

//           <!-- MAIN CONTENT -->
//           <div class="resume-main">
//             <!-- SUMMARY -->
//             ${summary ? `
//               <div class="section">
//                 <h2 class="section-title">About</h2>
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
//                         <div class="experience-company">${exp.employer || ""}</div>
//                         ${exp.location ? `<div class="experience-location">${exp.location}</div>` : ""}
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
//                     <div class="skill-item">${l.name}${l.level ? ` — ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</div>
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
//                     <div class="additional-item">${c.name.replace(/<[^>]*>/g, "")}</div>
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
//                     <div class="additional-item">${a.name.replace(/<[^>]*>/g, "")}</div>
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
//                     <div class="additional-item">${h.name.replace(/<[^>]*>/g, "")}</div>
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
//               backgroundColor: "#2c3e50",
//               color: "#ffffff",
//               padding: "12px 28px",
//               fontSize: "13px",
//               fontWeight: "500",
//               border: "none",
//               borderRadius: "2px",
//               cursor: "pointer",
//               fontFamily: "inherit",
//               letterSpacing: "0.8px",
//               textTransform: "uppercase"
//             }}
//           >
//             Download Resume
//           </button>
//         </div>
//       )}

//       {/* Resume Preview */}
//       <div className={`t11-resume ${alldata ? 'is-preview' : ''}`} style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}>
//         <style>{styles}</style>

//         {/* HEADER */}
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
//           <div className="divider"></div>
//           <div className="contact-row">
//             {contact?.email && <div className="contact-item">{contact.email}</div>}
//             {contact?.phone && <div className="contact-item">{contact.phone}</div>}
//           </div>
//           {addressParts.length > 0 && (
//             <div className="address">{addressParts.join(" | ")}</div>
//           )}
//           <div className="links">
//             {linkedinUrl && (
//               <a
//                 href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 LinkedIn
//               </a>
//             )}
//             {portfolioUrl && (
//               <a
//                 href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 Portfolio
//               </a>
//             )}
//           </div>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="resume-main">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section">
//               <h2 className="section-title">About</h2>
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
//                     <div className="experience-company">{exp.employer}</div>
//                     {exp.location && <div className="experience-location">{exp.location}</div>}
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
//                         <div key={i} className="skill-item">
//                           {lang.name}
//                           {lang.level &&
//                             ` — ${Math.round((Number(lang.level) / 4) * 100)}%`}
//                         </div>
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
//                         <div
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
//                         <div
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
//                         <div
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

// export default TemplateEleven;

// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateEleven: React.FC<ResumeProps> = ({ alldata }) => {
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

//   const linkedinUrl = contact?.linkedIn;
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
//       // Categorized Skills - Each category with its own section
//       return (
//         <div className="section">
//           <h2 className="section-title">Skills</h2>
//           {skills.map((category: any) => (
//             <div key={category.id} className="skill-category-block">
//               <div className="skill-category-title">{category.title}</div>
//               <div className="skills-container">
//                 {category.skills.map((skill: any) => (
//                   <div key={skill.id} className="skill-item">
//                     {skill.name}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     } else {
//       // Simple Skills - Grid of skill tags
//       return (
//         <div className="section">
//           <h2 className="section-title">Skills</h2>
//           <div className="skills-container">
//             {skills.map((skill: any, index: number) => (
//               <div key={skill.id || index} className="skill-item">
//                 {skill.name || skill.skill}
//               </div>
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
//             <div className="project-header">
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
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="experience-description"
//                 dangerouslySetInnerHTML={{ __html: project.description }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — MINIMALIST MODERN BLACK & WHITE
//   ====================================================== */
//   const styles = `
//     .t11-resume {
//       width: 210mm;
//       min-height: 297mm;
//       background: white;
//       font-family: 'Lato', 'Helvetica Neue', 'Segoe UI', sans-serif;
//       background-color: #ffffff;
//       line-height: 1.5;
//       color: #2c3e50;
//     }

//     .t11-resume.is-preview {
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

//     /* Header Section */
//     .t11-resume .resume-header {
//       padding: 45px 45px 30px 45px;
//       text-align: left;
//     }

//     .t11-resume .name {
//       font-size: 42px;
//       font-weight: 300;
//       letter-spacing: 1px;
//       margin-bottom: 12px;
//       color: #1a2a3a;
//       text-transform: uppercase;
//     }

//     .t11-resume .job-title {
//       font-size: 15px;
//       font-weight: 400;
//       color: #6c7a89;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       margin-bottom: 20px;
//     }

//     .t11-resume .divider {
//       width: 50px;
//       height: 2px;
//       background: #2c3e50;
//       margin: 18px 0;
//     }

//     .t11-resume .contact-row {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 20px;
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 15px;
//     }

//     .t11-resume .contact-item {
//       display: inline-flex;
//       align-items: center;
//       gap: 6px;
//     }

//     .t11-resume .address {
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 10px;
//     }

//     .t11-resume .links {
//       margin-top: 12px;
//       display: flex;
//       flex-wrap: wrap;
//       gap: 20px;
//     }

//     .t11-resume .link-item {
//       color: #2c3e50;
//       text-decoration: none;
//       font-size: 12px;
//       border-bottom: 1px solid transparent;
//       transition: border-color 0.2s;
//     }

//     /* Education Grade */
//     .t11-resume .education-grade {
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 4px;
//       font-weight: 500;
//     }

//     /* Main Content */
//     .t11-resume .resume-main {
//       padding: 20px 45px 50px 45px;
//       text-align: left;
//     }

//     /* Section Styles */
//     .t11-resume .section {
//       margin-bottom: 32px;
//       text-align: left;
//     }

//     .t11-resume .section:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .section-title {
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 2px;
//       color: #2c3e50;
//       margin-bottom: 18px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #e8ecef;
//       text-align: left;
//     }

//     /* Summary */
//     .t11-resume .summary-text {
//       font-size: 13px;
//       line-height: 1.6;
//       color: #4a5b6e;
//       text-align: left;
//     }

//     /* Experience Items */
//     .t11-resume .experience-item {
//       margin-bottom: 28px;
//       text-align: left;
//     }

//     .t11-resume .experience-item:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .experience-header {
//       margin-bottom: 10px;
//       text-align: left;
//     }

//     .t11-resume .experience-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 4px;
//       text-align: left;
//     }

//     .t11-resume .experience-title {
//       font-size: 16px;
//       font-weight: 600;
//       color: #1a2a3a;
//       text-align: left;
//     }

//     .t11-resume .experience-date {
//       font-size: 11px;
//       color: #8e9aab;
//       font-weight: 400;
//       letter-spacing: 0.3px;
//       text-align: right;
//     }

//     .t11-resume .experience-company {
//       font-size: 13px;
//       font-weight: 400;
//       color: #6c7a89;
//       margin-top: 2px;
//       text-align: left;
//     }

//     .t11-resume .experience-description {
//       margin-top: 12px;
//       text-align: left;
//     }

//     /* Bullet points */
//     .t11-resume .experience-description ul,
//     .t11-resume .education-description ul {
//       list-style-type: none;
//       padding-left: 0;
//       text-align: left;
//     }

//     .t11-resume .experience-description li,
//     .t11-resume .education-description li {
//       position: relative;
//       padding-left: 20px;
//       margin-bottom: 8px;
//       font-size: 13px;
//       color: #4a5b6e;
//       line-height: 1.55;
//       text-align: left;
//     }

//     .t11-resume .experience-description li::before,
//     .t11-resume .education-description li::before {
//       content: "—";
//       position: absolute;
//       left: 2px;
//       color: #2c3e50;
//     }

//     /* Education Items */
//     .t11-resume .education-item {
//       margin-bottom: 24px;
//       text-align: left;
//     }

//     .t11-resume .education-item:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .education-header {
//       margin-bottom: 8px;
//       text-align: left;
//     }

//     .t11-resume .education-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 4px;
//       text-align: left;
//     }

//     .t11-resume .education-school {
//       font-size: 16px;
//       font-weight: 600;
//       color: #1a2a3a;
//       text-align: left;
//     }

//     .t11-resume .education-date {
//       font-size: 11px;
//       color: #8e9aab;
//       text-align: right;
//     }

//     .t11-resume .education-degree {
//       font-size: 13px;
//       color: #6c7a89;
//       margin-top: 4px;
//       text-align: left;
//     }

//     .t11-resume .education-description {
//       margin-top: 10px;
//       text-align: left;
//     }

//     /* SKILLS */
//     .t11-resume .skills-container {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 12px 20px;
//       margin-top: 5px;
//       text-align: left;
//     }

//     .t11-resume .skill-item {
//       font-size: 13px;
//       color: #4a5b6e;
//       position: relative;
//       padding-left: 18px;
//       text-align: left;
//     }

//     .t11-resume .skill-item::before {
//       content: "▹";
//       position: absolute;
//       left: 2px;
//       color: #2c3e50;
//       font-size: 11px;
//     }

//     /* Categorized Skills */
//     .t11-resume .skill-category-block {
//       margin-bottom: 20px;
//     }

//     .t11-resume .skill-category-block:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .skill-category-title {
//       font-size: 13px;
//       font-weight: 600;
//       color: #1a2a3a;
//       margin-bottom: 10px;
//       padding-bottom: 3px;
//       border-bottom: 1px solid #e8ecef;
//     }

//     /* PROJECTS */
//     .t11-resume .project-header {
//       margin-bottom: 10px;
//     }

//     .t11-resume .project-links {
//       display: flex;
//       gap: 15px;
//     }

//     .t11-resume .project-link {
//       font-size: 11px;
//       color: #6c7a89;
//       text-decoration: underline;
//     }

//     .t11-resume .project-tech-stack {
//       font-size: 11px;
//       color: #8e9aab;
//       margin: 6px 0;
//     }

//     /* Additional content */
//     .t11-resume .additional-container {
//       margin-top: 5px;
//       text-align: left;
//     }

//     .t11-resume .additional-item {
//       font-size: 13px;
//       color: #4a5b6e;
//       margin-bottom: 8px;
//       position: relative;
//       padding-left: 18px;
//       text-align: left;
//     }

//     .t11-resume .additional-item::before {
//       content: "▹";
//       position: absolute;
//       left: 2px;
//       color: #2c3e50;
//       font-size: 11px;
//     }

//     /* Custom Sections */
//     .t11-resume .custom-section {
//       margin-bottom: 20px;
//       text-align: left;
//     }

//     .t11-resume .custom-section:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .custom-section-title {
//       font-size: 13px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//       color: #2c3e50;
//       margin-bottom: 8px;
//       text-align: left;
//     }

//     .t11-resume .custom-section-content {
//       font-size: 13px;
//       color: #4a5b6e;
//       line-height: 1.55;
//       padding-left: 18px;
//       text-align: left;
//     }

//     /* Print Styles */
//     @media print {
//       @page {
//         size: A4;
//         margin: 0;
//       }

//       body {
//         background: white;
//         margin: 0;
//         padding: 0;
//       }

//       .t11-resume {
//         margin: 0;
//         max-width: 100%;
//         box-shadow: none;
//         padding: 0;
//       }

//       .t11-resume .resume-header {
//         padding: 45px 45px 30px 45px !important;
//       }

//       .t11-resume .resume-main {
//         padding: 20px 45px 50px 45px !important;
//       }

//       .t11-resume .section {
//         page-break-inside: avoid;
//       }

//       .t11-resume .experience-item {
//         page-break-inside: avoid;
//       }

//       .t11-resume .divider {
//         background: #2c3e50;
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }
//     }

//     /* Responsive */
//     @media (max-width: 600px) {
//       .t11-resume {
//         margin: 15px;
//       }

//       .t11-resume .resume-header {
//         padding: 30px 25px 20px 25px !important;
//       }

//       .t11-resume .resume-main {
//         padding: 15px 25px 35px 25px !important;
//       }

//       .t11-resume .name {
//         font-size: 32px;
//       }

//       .t11-resume .job-title {
//         font-size: 13px;
//       }

//       .t11-resume .contact-row {
//         flex-direction: column;
//         gap: 6px;
//       }

//       .t11-resume .experience-title-row {
//         flex-direction: column;
//         gap: 4px;
//       }

//       .t11-resume .experience-date {
//         text-align: left;
//       }

//       .t11-resume .education-title-row {
//         flex-direction: column;
//         gap: 4px;
//       }

//       .t11-resume .education-date {
//         text-align: left;
//       }

//       .t11-resume .project-links {
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
//       return `<div class="experience-description" style="white-space: pre-wrap; text-align: left;">${stripHtml(text)}</div>`;
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
//                     <div class="skill-item">${skill.name}</div>
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
//                 <div class="skill-item">${skill.name || skill.skill}</div>
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
//               <div class="project-header">
//                 <div class="experience-title-row">
//                   <span class="experience-title">${project.title || ""}</span>
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 </div>
//               </div>
//               ${project.techStack && project.techStack.length > 0 ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               ` : ""}
//               ${project.description ? `
//                 <div class="experience-description">${project.description}</div>
//               ` : ""}
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
//         <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&display=swap" rel="stylesheet">
//         <style>${styles}</style>
//       </head>
//       <body>
//         <div class="t11-resume">
//           <!-- HEADER -->
//           <div class="resume-header">
//             <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//             <div class="job-title">${
//               contact?.jobTitle
//                 ? typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""
//                 : ""
//             }</div>
//             <div class="divider"></div>
//             <div class="contact-row">
//               ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
//               ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
//               ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
//             </div>
//             ${addressParts.length ? `<div class="address">${addressParts.join(" | ")}</div>` : ""}
//             <div class="links">
//               ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
//               ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item">GitHub</a>` : ""}
//               ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
//             </div>
//           </div>

//           <!-- MAIN CONTENT -->
//           <div class="resume-main">
//             <!-- SUMMARY -->
//             ${summary ? `
//               <div class="section">
//                 <h2 class="section-title">About</h2>
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
//                         <div class="experience-company">${exp.employer || ""}</div>
//                         ${exp.location ? `<div class="experience-location">${exp.location}</div>` : ""}
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
//                     <div class="skill-item">${l.name}${l.level ? ` — ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</div>
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
//                     <div class="additional-item">${c.name.replace(/<[^>]*>/g, "")}</div>
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
//                     <div class="additional-item">${a.name.replace(/<[^>]*>/g, "")}</div>
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
//                     <div class="additional-item">${h.name.replace(/<[^>]*>/g, "")}</div>
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

//     {lastSegment === "download-resume" && (
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
//       <div className={`t11-resume ${alldata ? 'is-preview' : ''}`} style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}>
//         <style>{styles}</style>

//         {/* HEADER */}
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
//           <div className="divider"></div>
//           <div className="contact-row">
//             {contact?.email && <div className="contact-item">{contact.email}</div>}
//             {contact?.phone && <div className="contact-item">{contact.phone}</div>}
//             {formattedDob && <div className="contact-item">{formattedDob}</div>}
//           </div>
//           {addressParts.length > 0 && (
//             <div className="address">{addressParts.join(" | ")}</div>
//           )}
//           <div className="links">
//             {linkedinUrl && (
//               <a
//                 href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 LinkedIn
//               </a>
//             )}
//             {githubUrl && (
//               <a
//                 href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 GitHub
//               </a>
//             )}
//             {portfolioUrl && (
//               <a
//                 href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 Portfolio
//               </a>
//             )}
//           </div>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="resume-main">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section">
//               <h2 className="section-title">About</h2>
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
//                     <div className="experience-company">{exp.employer}</div>
//                     {exp.location && <div className="experience-location">{exp.location}</div>}
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
//                         <div key={i} className="skill-item">
//                           {lang.name}
//                           {lang.level &&
//                             ` — ${Math.round((Number(lang.level) / 4) * 100)}%`}
//                         </div>
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
//                         <div
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
//                         <div
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
//                         <div
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

// export default TemplateEleven;

// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay, cleanQuillHTML, formatDateOfBirth, formatGradeToCgpdAndPercentage } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateEleven: React.FC<ResumeProps> = ({ alldata }) => {
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
//         <div
//           className="skills-content"
//           dangerouslySetInnerHTML={{ __html: cleanedSkills }}
//         />
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
//             <div className="project-header">
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
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="experience-description"
//                 dangerouslySetInnerHTML={{ __html: cleanQuillHTML(project.description) }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — MINIMALIST MODERN BLACK & WHITE
//   ====================================================== */
//   const styles = `
//   .t11-resume  * {
//       margin: 0;
//       padding: 0;
//       box-sizing: border-box;
//     }

//   .t11-resume  body {
//       background: #f5f5f5;
//       font-family: 'Lato', 'Helvetica Neue', 'Segoe UI', sans-serif;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       min-height: 100vh;
//       padding: 40px 20px;
//     }

//     /* Main container with overall margin */
//     .t11-resume {
//       width: 210mm;
//       min-height: 297mm;
//       background: white;
//       font-family: 'Lato', 'Helvetica Neue', 'Segoe UI', sans-serif;
//       background-color: #ffffff;
//       line-height: 1.5;
//       color: #2c3e50;
//       margin: 30px auto;
//       box-shadow: 0 4px 20px rgba(0,0,0,0.1);
//     }

//     .t11-resume * {
//       box-sizing: border-box;
//     }

//     .t11-resume.is-preview {
//       transform: scale(0.36);
//       transform-origin: top center;
//       width: 210mm;
//       height: auto;
//       max-height: none;
//       min-height: auto;
//       max-width: none;
//       min-width: auto;
//       overflow: visible;
//       margin: 30px auto;
//     }

//     /* IMPORTANT: Remove extra p tag margins */
//     .t11-resume p {
//       margin: 0 0 4px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     .t11-resume p:last-child {
//       margin-bottom: 0 !important;
//     }

//     /* Rich text content styles */
//     .t11-resume .experience-description ul,
//     .t11-resume .experience-description ol,
//     .t11-resume .education-description ul,
//     .t11-resume .education-description ol,
//     .t11-resume .skills-content ul,
//     .t11-resume .skills-content ol,
//     .t11-resume .custom-section-content ul,
//     .t11-resume .custom-section-content ol {
//       margin: 4px 0 4px 20px !important;
//       padding-left: 20px !important;
//     }

//     .t11-resume .experience-description li,
//     .t11-resume .education-description li,
//     .t11-resume .skills-content li,
//     .t11-resume .custom-section-content li {
//       margin-bottom: 2px !important;
//       line-height: 1.5 !important;
//     }

//     .t11-resume .experience-description ul,
//     .t11-resume .education-description ul,
//     .t11-resume .skills-content ul,
//     .t11-resume .custom-section-content ul {
//       list-style-type: disc !important;
//     }

//     .t11-resume .experience-description ol,
//     .t11-resume .education-description ol,
//     .t11-resume .skills-content ol,
//     .t11-resume .custom-section-content ol {
//       list-style-type: decimal !important;
//     }

//     .t11-resume .experience-description strong,
//     .t11-resume .education-description strong,
//     .t11-resume .skills-content strong,
//     .t11-resume .custom-section-content strong {
//       font-weight: 700 !important;
//     }

//     .t11-resume .experience-description em,
//     .t11-resume .education-description em,
//     .t11-resume .skills-content em,
//     .t11-resume .custom-section-content em {
//       font-style: italic !important;
//     }

//     .t11-resume .experience-description u,
//     .t11-resume .education-description u,
//     .t11-resume .skills-content u,
//     .t11-resume .custom-section-content u {
//       text-decoration: underline !important;
//     }

//     /* Preserve spaces in content */
//     .t11-resume .experience-description p,
//     .t11-resume .education-description p,
//     .t11-resume .skills-content p,
//     .t11-resume .custom-section-content p {
//       white-space: pre-wrap !important;
//       margin: 0 0 4px 0 !important;
//     }

//     /* Header Section - REMOVED PADDING X */
//     .t11-resume .resume-header {
//       padding: 45px 0 30px 0;
//       text-align: left;
//       margin: 0 45px;
//     }

//     .t11-resume .name {
//       font-size: 42px;
//       font-weight: 300;
//       letter-spacing: 1px;
//       margin-bottom: 12px;
//       color: #1a2a3a;
//       text-transform: uppercase;
//     }

//     .t11-resume .job-title {
//       font-size: 15px;
//       font-weight: 400;
//       color: #6c7a89;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       margin-bottom: 20px;
//     }

//     .t11-resume .divider {
//       width: 50px;
//       height: 2px;
//       background: #2c3e50;
//       margin: 18px 0;
//     }

//     .t11-resume .contact-row {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 20px;
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 15px;
//     }

//     .t11-resume .contact-item {
//       display: inline-flex;
//       align-items: center;
//       gap: 6px;
//     }

//     .t11-resume .address {
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 10px;
//     }

//     .t11-resume .links {
//       margin-top: 12px;
//       display: flex;
//       flex-wrap: wrap;
//       gap: 20px;
//     }

//     .t11-resume .link-item {
//       color: #2c3e50;
//       text-decoration: none;
//       font-size: 12px;
//       border-bottom: 1px solid transparent;
//       transition: border-color 0.2s;
//     }

//     /* Education Grade */
//     .t11-resume .education-grade {
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 4px;
//       font-weight: 500;
//     }

//     /* Main Content - REMOVED PADDING X */
//     .t11-resume .resume-main {
//       padding: 20px 0 50px 0;
//       text-align: left;
//       margin: 0 45px;
//     }

//     /* Section Styles */
//     .t11-resume .section {
//       margin-bottom: 28px;
//       text-align: left;
//     }

//     .t11-resume .section:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .section-title {
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 2px;
//       color: #2c3e50;
//       margin-bottom: 14px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #e8ecef;
//       text-align: left;
//     }

//     /* Custom Section Title - Same as other section titles */
//     .t11-resume .custom-section-title {
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 2px;
//       color: #2c3e50;
//       margin-bottom: 14px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #e8ecef;
//       text-align: left;
//     }

//     /* Summary */
//     .t11-resume .summary-text {
//       font-size: 13px;
//       line-height: 1.6;
//       color: #4a5b6e;
//       text-align: left;
//     }

//     /* Skills Content */
//     .t11-resume .skills-content {
//       font-size: 13px;
//       line-height: 1.6;
//       color: #4a5b6e;
//       text-align: left;
//     }

//     /* Experience Items */
//     .t11-resume .experience-item {
//       margin-bottom: 24px;
//       text-align: left;
//     }

//     .t11-resume .experience-item:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .experience-header {
//       margin-bottom: 8px;
//       text-align: left;
//     }

//     .t11-resume .experience-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 4px;
//       text-align: left;
//     }

//     .t11-resume .experience-title {
//       font-size: 16px;
//       font-weight: 600;
//       color: #1a2a3a;
//       text-align: left;
//     }

//     .t11-resume .experience-date {
//       font-size: 11px;
//       color: #8e9aab;
//       font-weight: 400;
//       letter-spacing: 0.3px;
//       text-align: right;
//     }

//     .t11-resume .experience-company-location {
//       font-size: 13px;
//       font-weight: 400;
//       color: #6c7a89;
//       margin-top: 2px;
//       text-align: left;
//     }

//     .t11-resume .experience-description {
//       margin-top: 8px;
//       text-align: left;
//     }

//     /* Education Items */
//     .t11-resume .education-item {
//       margin-bottom: 20px;
//       text-align: left;
//     }

//     .t11-resume .education-item:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .education-header {
//       margin-bottom: 6px;
//       text-align: left;
//     }

//     .t11-resume .education-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 4px;
//       text-align: left;
//     }

//     .t11-resume .education-degree {
//       font-size: 16px;
//       font-weight: 600;
//       color: #1a2a3a;
//       text-align: left;
//     }

//     .t11-resume .education-school {
//       font-size: 13px;
//       font-weight: 400;
//       color: #6c7a89;
//       margin-top: 2px;
//       text-align: left;
//     }

//     .t11-resume .education-date {
//       font-size: 11px;
//       color: #8e9aab;
//       text-align: right;
//     }

//     .t11-resume .education-description {
//       margin-top: 8px;
//       text-align: left;
//     }

//     /* PROJECTS */
//     .t11-resume .project-header {
//       margin-bottom: 8px;
//     }

//     .t11-resume .project-links {
//       display: flex;
//       gap: 15px;
//     }

//     .t11-resume .project-link {
//       font-size: 11px;
//       color: #6c7a89;
//       text-decoration: underline;
//     }

//     .t11-resume .project-tech-stack {
//       font-size: 11px;
//       color: #8e9aab;
//       margin: 4px 0;
//     }

//     /* Custom Sections */
//     .t11-resume .custom-section {
//       margin-bottom: 16px;
//       text-align: left;
//     }

//     .t11-resume .custom-section:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .custom-section-content {
//       font-size: 13px;
//       color: #4a5b6e;
//       line-height: 1.55;
//       text-align: left;
//     }

//     /* Print Styles - REMOVE OVERALL MARGIN */
//     @media print {
//       @page {
//         size: A4;
//         margin: 0;
//       }

//       body {
//         background: white;
//         margin: 0;
//         padding: 0;
//         display: block;
//       }

//       .t11-resume {
//         width: 100% !important;
//         max-width: 210mm;
//         margin: 0 auto !important;
//         padding: 0 !important;
//         box-shadow: none !important;
//         background: white;
//         page-break-after: avoid;
//         page-break-inside: avoid;
//       }

//       .t11-resume .resume-header {
//         padding: 45px 0 30px 0 !important;
//         margin: 0 45px !important;
//       }

//       .t11-resume .resume-main {
//         padding: 20px 0 50px 0 !important;
//         margin: 0 45px !important;
//       }

//       /* Fix p tag margins in print */
//       .t11-resume p {
//         margin: 0 0 4px 0 !important;
//         padding: 0 !important;
//         line-height: 1.5 !important;
//       }

//       /* Ensure consistent font rendering */
//       .t11-resume {
//         font-family: 'Lato', 'Helvetica Neue', 'Segoe UI', sans-serif !important;
//       }

//       .t11-resume .section {
//         page-break-inside: avoid;
//       }

//       .t11-resume .experience-item {
//         page-break-inside: avoid;
//       }

//       .t11-resume .divider {
//         background: #2c3e50;
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
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
//           <div class="skills-content">${cleanedSkills}</div>
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
//               <div class="project-header">
//                 <div class="experience-title-row">
//                   <span class="experience-title">${project.title || ""}</span>
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 </div>
//               </div>
//               ${project.techStack && project.techStack.length > 0 ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               ` : ""}
//               ${project.description ? `
//                 <div class="experience-description">${cleanQuillHTML(project.description)}</div>
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

//       return `
//         <div class="section">
//           ${finalize.customSection
//             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s: any) => `
//               <div class="custom-section">
//                 ${s.name ? `<h2 class="custom-section-title">${s.name}</h2>` : ""}
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
//         <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&display=swap" rel="stylesheet">
//         <style>${styles}</style>
//       </head>
//       <body>
//         <div class="t11-resume">
//           <!-- HEADER -->
//           <div class="resume-header">
//             <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//             <div class="job-title">${
//               contact?.jobTitle
//                 ? typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""
//                 : ""
//             }</div>
//             <div class="divider"></div>
//             <div class="contact-row">
//               ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
//               ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
//               ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
//             </div>
//             ${addressParts.length ? `<div class="address">${addressParts.join(" | ")}</div>` : ""}
//             <div class="links">
//               ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
//               ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item">GitHub</a>` : ""}
//               ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
//             </div>
//           </div>

//           <!-- MAIN CONTENT -->
//           <div class="resume-main">
//             <!-- SUMMARY -->
//             ${summary ? `
//               <div class="section">
//                 <h2 class="section-title">About</h2>
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
//                         <div class="experience-company-location">${companyLocation}</div>
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
//                   const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                   const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//                   const schoolLocation = [edu.schoolname, edu.location].filter(Boolean).join(" • ");
//                   return `
//                     <div class="education-item">
//                       <div class="education-header">
//                         <div class="education-title-row">
//                           <div>
//                             <div class="education-degree">${edu.degree || ""}</div>
//                             ${schoolLocation ? `<div class="education-school">${schoolLocation}</div>` : ""}
//                           </div>
//                           ${dateStr ? `<span class="education-date">${dateStr}</span>` : ""}
//                         </div>
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
//       <div className={`t11-resume ${alldata ? 'is-preview' : ''}`} style={{  boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}>
//         <style>{styles}</style>

//         {/* HEADER */}
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
//           <div className="divider"></div>
//           <div className="contact-row">
//             {contact?.email && <div className="contact-item">{contact.email}</div>}
//             {contact?.phone && <div className="contact-item">{contact.phone}</div>}
//             {formattedDob && <div className="contact-item">{formattedDob}</div>}
//           </div>
//           {addressParts.length > 0 && (
//             <div className="address">{addressParts.join(" | ")}</div>
//           )}
//           <div className="links">
//             {linkedinUrl && (
//               <a
//                 href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 LinkedIn
//               </a>
//             )}
//             {githubUrl && (
//               <a
//                 href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 GitHub
//               </a>
//             )}
//             {portfolioUrl && (
//               <a
//                 href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 Portfolio
//               </a>
//             )}
//           </div>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="resume-main">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section">
//               <h2 className="section-title">About</h2>
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
//                       <div className="experience-company-location">{companyLocation}</div>
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
//                 const schoolLocation = [edu.schoolname, edu.location].filter(Boolean).join(" • ");
//                 return (
//                   <div key={i} className="education-item">
//                     <div className="education-header">
//                       <div className="education-title-row">
//                         <div>
//                           <div className="education-degree">{edu.degree || ""}</div>
//                           {schoolLocation && <div className="education-school">{schoolLocation}</div>}
//                         </div>
//                         {(edu.startDate || edu.endDate) && (
//                           <span className="education-date">
//                             {edu.startDate || ""}
//                             {edu.startDate && edu.endDate && " — "}
//                             {edu.endDate || ""}
//                           </span>
//                         )}
//                       </div>
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
//                           <h2 className="custom-section-title">{section.name}</h2>
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

// export default TemplateEleven;

// "use client";
// import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, cleanQuillHTML, formatDateOfBirth, formatGradeToCgpdAndPercentage } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// // ─────────────────────────────────────────────────────────────────────────────
// // PIXEL-PERFECT A4 CONSTANTS
// const A4_W = 794; // px — A4 width at 96 dpi
// const A4_H = 1123; // px — A4 height at 96 dpi
// const MARGIN = 57; // px — 15 mm at 96 dpi
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px — usable content per page
// const HEIGHT_TOLERANCE = 5; // px

// const TemplateEleven: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const measureRef = useRef<HTMLIFrameElement>(null);
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);
//   const [isReady, setIsReady] = useState(false);

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

//   // Helper function to check if a custom section is a duplicate of the skills section
//   const isSkillsCustomSection = (sectionName: string): boolean => {
//     const name = sectionName?.toLowerCase().trim() || "";
//     return name === "skills" || name === "skill" || name === "technical skills" || name === "core skills";
//   };

//   // Filter out custom sections that are duplicates of skills
//   const getFilteredCustomSections = () => {
//     if (!finalize || Array.isArray(finalize) || !Array.isArray(finalize.customSection)) {
//       return [];
//     }

//     const hasSkillsData = skills && (typeof skills === "string" && skills.trim());

//     if (!hasSkillsData) {
//       return finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim());
//     }

//     return finalize.customSection.filter((s: any) => {
//       const hasContent = s?.name?.trim() || s?.description?.trim();
//       if (!hasContent) return false;
//       return !isSkillsCustomSection(s?.name || "");
//     });
//   };

//   /* ======================================================
//      CSS — MINIMALIST MODERN BLACK & WHITE
//   ====================================================== */
//   const styles = `
//     @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&display=swap');

//     @page {
//       size: A4;
//       margin: 15mm;
//     }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t11-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background: white;
//       font-family: 'Lato', 'Helvetica Neue', 'Segoe UI', sans-serif;
//       background-color: #ffffff;
//       line-height: 1.5;
//       color: #2c3e50;
//     }

//     .t11-resume * {
//       box-sizing: border-box;
//     }

//     /* Force all content blocks to stay together */
//     .t11-resume .section,
//     .t11-resume .experience-item,
//     .t11-resume .education-item,
//     .t11-resume .skills-content,
//     .t11-resume .custom-section,
//     .t11-resume .resume-header,
//     .t11-resume .project-header {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .section-title {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t11-resume p {
//       margin: 0 0 4px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     .t11-resume p:last-child {
//       margin-bottom: 0 !important;
//     }

//     /* Rich text content styles */
//     .t11-resume .experience-description ul,
//     .t11-resume .experience-description ol,
//     .t11-resume .education-description ul,
//     .t11-resume .education-description ol,
//     .t11-resume .skills-content ul,
//     .t11-resume .skills-content ol,
//     .t11-resume .custom-section-content ul,
//     .t11-resume .custom-section-content ol {
//       margin: 4px 0 4px 20px !important;
//       padding-left: 20px !important;
//     }

//     .t11-resume .experience-description li,
//     .t11-resume .education-description li,
//     .t11-resume .skills-content li,
//     .t11-resume .custom-section-content li {
//       margin-bottom: 2px !important;
//       line-height: 1.5 !important;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .experience-description ul,
//     .t11-resume .education-description ul,
//     .t11-resume .skills-content ul,
//     .t11-resume .custom-section-content ul {
//       list-style-type: disc !important;
//     }

//     .t11-resume .experience-description ol,
//     .t11-resume .education-description ol,
//     .t11-resume .skills-content ol,
//     .t11-resume .custom-section-content ol {
//       list-style-type: decimal !important;
//     }

//     .t11-resume .experience-description strong,
//     .t11-resume .education-description strong,
//     .t11-resume .skills-content strong,
//     .t11-resume .custom-section-content strong {
//       font-weight: 700 !important;
//     }

//     .t11-resume .experience-description em,
//     .t11-resume .education-description em,
//     .t11-resume .skills-content em,
//     .t11-resume .custom-section-content em {
//       font-style: italic !important;
//     }

//     .t11-resume .experience-description u,
//     .t11-resume .education-description u,
//     .t11-resume .skills-content u,
//     .t11-resume .custom-section-content u {
//       text-decoration: underline !important;
//     }

//     .t11-resume .experience-description p,
//     .t11-resume .education-description p,
//     .t11-resume .skills-content p,
//     .t11-resume .custom-section-content p {
//       white-space: pre-wrap !important;
//       margin: 0 0 4px 0 !important;
//     }

//     /* Header Section */
//     .t11-resume .resume-header {
//       padding: 45px 0 30px 0;
//       text-align: left;
//       margin: 0 45px;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .name {
//       font-size: 42px;
//       font-weight: 300;
//       letter-spacing: 1px;
//       margin-bottom: 12px;
//       color: #1a2a3a;
//       text-transform: uppercase;
//     }

//     .t11-resume .job-title {
//       font-size: 15px;
//       font-weight: 400;
//       color: #6c7a89;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       margin-bottom: 20px;
//     }

//     .t11-resume .divider {
//       width: 50px;
//       height: 2px;
//       background: #2c3e50;
//       margin: 18px 0;
//     }

//     .t11-resume .contact-row {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 20px;
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 15px;
//     }

//     .t11-resume .contact-item {
//       display: inline-flex;
//       align-items: center;
//       gap: 6px;
//     }

//     .t11-resume .address {
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 10px;
//     }

//     .t11-resume .links {
//       margin-top: 12px;
//       display: flex;
//       flex-wrap: wrap;
//       gap: 20px;
//     }

//     .t11-resume .link-item {
//       color: #2c3e50;
//       text-decoration: none;
//       font-size: 12px;
//       border-bottom: 1px solid transparent;
//       transition: border-color 0.2s;
//     }

//     /* Education Grade */
//     .t11-resume .education-grade {
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 4px;
//       font-weight: 500;
//     }

//     /* Main Content */
//     .t11-resume .resume-main {
//       padding: 20px 0 50px 0;
//       text-align: left;
//       margin: 0 45px;
//     }

//     /* Section Styles */
//     .t11-resume .section {
//       margin-bottom: 28px;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .section:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .section-title {
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 2px;
//       color: #2c3e50;
//       margin-bottom: 14px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #e8ecef;
//       text-align: left;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t11-resume .custom-section-title {
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 2px;
//       color: #2c3e50;
//       margin-bottom: 14px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #e8ecef;
//       text-align: left;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* Summary */
//     .t11-resume .summary-text {
//       font-size: 13px;
//       line-height: 1.6;
//       color: #4a5b6e;
//       text-align: left;
//     }

//     /* Skills Content */
//     .t11-resume .skills-content {
//       font-size: 13px;
//       line-height: 1.6;
//       color: #4a5b6e;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     /* Experience Items */
//     .t11-resume .experience-item {
//       margin-bottom: 24px;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .experience-item:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .experience-header {
//       margin-bottom: 8px;
//       text-align: left;
//     }

//     .t11-resume .experience-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 4px;
//       text-align: left;
//     }

//     .t11-resume .experience-title {
//       font-size: 16px;
//       font-weight: 600;
//       color: #1a2a3a;
//       text-align: left;
//     }

//     .t11-resume .experience-date {
//       font-size: 11px;
//       color: #8e9aab;
//       font-weight: 400;
//       letter-spacing: 0.3px;
//       text-align: right;
//     }

//     .t11-resume .experience-company-location {
//       font-size: 13px;
//       font-weight: 400;
//       color: #6c7a89;
//       margin-top: 2px;
//       text-align: left;
//     }

//     .t11-resume .experience-description {
//       margin-top: 8px;
//       text-align: left;
//     }

//     /* Education Items */
//     .t11-resume .education-item {
//       margin-bottom: 20px;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .education-item:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .education-header {
//       margin-bottom: 6px;
//       text-align: left;
//     }

//     .t11-resume .education-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 4px;
//       text-align: left;
//     }

//     .t11-resume .education-degree {
//       font-size: 16px;
//       font-weight: 600;
//       color: #1a2a3a;
//       text-align: left;
//     }

//     .t11-resume .education-school {
//       font-size: 13px;
//       font-weight: 400;
//       color: #6c7a89;
//       margin-top: 2px;
//       text-align: left;
//     }

//     .t11-resume .education-date {
//       font-size: 11px;
//       color: #8e9aab;
//       text-align: right;
//     }

//     .t11-resume .education-description {
//       margin-top: 8px;
//       text-align: left;
//     }

//     /* PROJECTS */
//     .t11-resume .project-header {
//       margin-bottom: 8px;
//     }

//     .t11-resume .project-links {
//       display: flex;
//       gap: 15px;
//     }

//     .t11-resume .project-link {
//       font-size: 11px;
//       color: #6c7a89;
//       text-decoration: underline;
//     }

//     .t11-resume .project-tech-stack {
//       font-size: 11px;
//       color: #8e9aab;
//       margin: 4px 0;
//     }

//     /* Custom Sections */
//     .t11-resume .custom-section {
//       margin-bottom: 16px;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .custom-section:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .custom-section-content {
//       font-size: 13px;
//       color: #4a5b6e;
//       line-height: 1.55;
//       text-align: left;
//     }

//     /* Print Styles */
//     @media print {
//       * {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }

//       .t11-resume {
//         width: 100% !important;
//         padding: 0 !important;
//         margin: 0 !important;
//         box-shadow: none !important;
//         background: white;
//       }

//       .t11-resume .resume-header {
//         padding: 45px 0 30px 0 !important;
//         margin: 0 45px !important;
//       }

//       .t11-resume .resume-main {
//         padding: 20px 0 50px 0 !important;
//         margin: 0 45px !important;
//       }

//       .t11-resume .divider {
//         background: #2c3e50;
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }
//     }
//   `;

//   const renderDescription = (text: string) => {
//     if (!text) return "";
//     return `<div class="experience-description">${cleanQuillHTML(text)}</div>`;
//   };

//   const generateHTML = useCallback((forPDF = false): string => {
//     const href = (url: string) =>
//       url.startsWith("http") ? url : `https://${url}`;

//     const addressStr = addressParts.join(" | ");

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";

//       return `
//         <div class="section">
//           <h2 class="section-title">Skills</h2>
//           <div class="skills-content">${cleanedSkills}</div>
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
//               <div class="project-header">
//                 <div class="experience-title-row">
//                   <span class="experience-title">${project.title || ""}</span>
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 </div>
//               </div>
//               ${project.techStack && project.techStack.length > 0 ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               ` : ""}
//               ${project.description ? `
//                 <div class="experience-description">${cleanQuillHTML(project.description)}</div>
//               ` : ""}
//             </div>
//           `).join("")}
//         </div>
//       `;
//     };

//     // Generate custom sections HTML for PDF (excluding Skills duplicates)
//     const generateCustomSectionsHTML = () => {
//       const filteredSections = getFilteredCustomSections();
//       if (filteredSections.length === 0) return "";

//       return `
//         <div class="section">
//           ${filteredSections
//             .map((s: any) => `
//               <div class="custom-section">
//                 ${s.name ? `<h2 class="custom-section-title">${s.name}</h2>` : ""}
//                 ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//               </div>
//             `)
//             .join("")}
//         </div>
//       `;
//     };

//     const pdfOverrideStyle = forPDF
//       ? `<style>.t11-resume { width: 100% !important; padding: 0 !important; }</style>`
//       : "";

//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8"/>
//         <meta name="viewport" content="width=device-width, initial-scale=1"/>
//         <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//         <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&display=swap" rel="stylesheet">
//         <style>${styles}</style>
//         ${pdfOverrideStyle}
//       </head>
//       <body style="margin:0;padding:0;background:white;">
//         <div class="t11-resume">
//           <!-- HEADER -->
//           <div class="resume-header">
//             <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//             <div class="job-title">${
//               contact?.jobTitle
//                 ? typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""
//                 : ""
//             }</div>
//             <div class="divider"></div>
//             <div class="contact-row">
//               ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
//               ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
//               ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
//             </div>
//             ${addressStr ? `<div class="address">${addressStr}</div>` : ""}
//             <div class="links">
//               ${linkedinUrl ? `<a href="${href(linkedinUrl)}" class="link-item">LinkedIn</a>` : ""}
//               ${githubUrl ? `<a href="${href(githubUrl)}" class="link-item">GitHub</a>` : ""}
//               ${portfolioUrl ? `<a href="${href(portfolioUrl)}" class="link-item">Portfolio</a>` : ""}
//             </div>
//           </div>

//           <!-- MAIN CONTENT -->
//           <div class="resume-main">
//             <!-- SUMMARY -->
//             ${summary ? `
//               <div class="section">
//                 <h2 class="section-title">About</h2>
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
//                         <div class="experience-company-location">${companyLocation}</div>
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
//                   const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                   const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//                   const schoolLocation = [edu.schoolname, edu.location].filter(Boolean).join(" • ");
//                   return `
//                     <div class="education-item">
//                       <div class="education-header">
//                         <div class="education-title-row">
//                           <div>
//                             <div class="education-degree">${edu.degree || ""}</div>
//                             ${schoolLocation ? `<div class="education-school">${schoolLocation}</div>` : ""}
//                           </div>
//                           ${dateStr ? `<span class="education-date">${dateStr}</span>` : ""}
//                         </div>
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
//   }, [contact, educations, experiences, skills, projects, finalize, summary, linkedinUrl, portfolioUrl, githubUrl, formattedDob, addressParts, styles]);

//   // ─────────────────────────────────────────────────────────────────────────
//   // PAGE SPLITTER
//   // ─────────────────────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const iframe = measureRef.current;
//         if (!iframe) {
//           resolve([fullHtml]);
//           return;
//         }

//         const doc = iframe.contentDocument || iframe.contentWindow?.document;
//         if (!doc) {
//           resolve([fullHtml]);
//           return;
//         }

//         doc.open();
//         doc.write(fullHtml);
//         doc.close();

//         const doSplit = () => {
//           const resume = doc.querySelector<HTMLElement>(".t11-resume");
//           if (!resume) {
//             resolve([fullHtml]);
//             return;
//           }

//           const resumeRect = resume.getBoundingClientRect();
//           const scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
//           const resumeTop = resumeRect.top + scrollTop;
//           const totalH = resume.scrollHeight;

//           const AVOID_SELECTORS = [
//             ".section",
//             ".experience-item",
//             ".education-item",
//             ".skills-content",
//             ".custom-section",
//             ".resume-header",
//             ".project-header"
//           ].join(", ");

//           interface Block {
//             top: number;
//             bottom: number;
//           }
//           const blocks: Block[] = [];

//           resume.querySelectorAll<HTMLElement>(AVOID_SELECTORS).forEach((el) => {
//             const rect = el.getBoundingClientRect();
//             const elTop = rect.top + scrollTop - resumeTop;
//             const elBottom = rect.bottom + scrollTop - resumeTop;
//             if (elBottom - elTop > 4) {
//               blocks.push({ top: elTop, bottom: elBottom });
//             }
//           });

//           blocks.sort((a, b) => a.top - b.top);

//           const pageStarts: number[] = [0];
//           let lastCut = 0;

//           while (true) {
//             const currentStart = pageStarts[pageStarts.length - 1];
//             const naiveCut = currentStart + PAGE_CONTENT_H;

//             if (naiveCut >= totalH - HEIGHT_TOLERANCE) break;

//             let actualCut = naiveCut;
//             let foundBlockToMove = false;

//             for (const block of blocks) {
//               if (block.top < naiveCut - HEIGHT_TOLERANCE && block.bottom > naiveCut + HEIGHT_TOLERANCE) {
//                 actualCut = block.top;
//                 foundBlockToMove = true;
//                 break;
//               }
//             }

//             if (foundBlockToMove && actualCut <= currentStart + 50) {
//               actualCut = naiveCut;
//             }

//             if (actualCut <= lastCut) {
//               actualCut = naiveCut;
//             }

//             lastCut = actualCut;
//             pageStarts.push(actualCut);
//           }

//           const pageHtmls = pageStarts.map((contentOffsetY) => `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <style>
//     ${styles}
//     html, body {
//       margin: 0 !important; padding: 0 !important;
//       width: ${A4_W}px !important; height: ${A4_H}px !important;
//       overflow: hidden !important; background: white !important;
//     }
//     .page-margin-box {
//       position: relative;
//       width: ${A4_W}px;
//       height: ${A4_H}px;
//       background: white;
//       overflow: hidden;
//     }
//     .page-content-clip {
//       position: absolute;
//       top: ${MARGIN}px;
//       left: 0;
//       width: ${A4_W}px;
//       height: ${PAGE_CONTENT_H}px;
//       overflow: hidden;
//     }
//     .page-shift {
//       position: absolute;
//       top: ${-contentOffsetY}px;
//       left: 0;
//       width: ${A4_W}px;
//     }
//     .t11-resume {
//       width: ${A4_W}px !important;
//       padding-top: 0 !important;
//       padding-bottom: 0 !important;
//       padding-left: ${MARGIN}px !important;
//       padding-right: ${MARGIN}px !important;
//       margin: 0 !important;
//     }
//   </style>
// </head>
// <body>
//   <div class="page-margin-box">
//     <div class="page-content-clip">
//       <div class="page-shift">
//         ${resume.outerHTML}
//       </div>
//     </div>
//   </div>
// </body>
// </html>`);

//           resolve(pageHtmls);
//         };

//         const win = iframe.contentWindow as any;

//         const waitForReady = () => {
//           if (win?.document?.fonts?.ready) {
//             win.document.fonts.ready.then(() => {
//               setTimeout(doSplit, 100);
//             });
//           } else {
//             setTimeout(doSplit, 350);
//           }
//         };

//         waitForReady();
//       });
//     },
//     [styles],
//   );

//   const scheduleUpdate = useCallback((html: string) => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     debounceTimerRef.current = setTimeout(() => {
//       setHtmlContent(html);
//       setIsReady(true);
//     }, 300);
//   }, []);

//   useEffect(() => {
//     scheduleUpdate(generateHTML());
//     return () => {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     };
//   }, [generateHTML, scheduleUpdate]);

//   useEffect(() => {
//     setHtmlContent(generateHTML());
//   }, [generateHTML]);

//   useEffect(() => {
//     if (!htmlContent || !isReady) return;
//     splitIntoPages(htmlContent).then(setPages);
//   }, [htmlContent, splitIntoPages, isReady]);

//   const handleDownload = async () => {
//     try {
//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html: generateHTML(true) },
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

//   // JSX Preview - also filter out Skills custom sections
//   const renderCustomSectionsPreview = () => {
//     const filteredSections = getFilteredCustomSections();
//     if (filteredSections.length === 0) return null;

//     return (
//       <div className="section">
//         {filteredSections.map((section: any, index: number) => (
//           <div key={section.id || index} className="custom-section">
//             {section.name && <h2 className="custom-section-title">{section.name}</h2>}
//             {section.description && (
//               <div
//                 className="custom-section-content"
//                 dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div style={{ textAlign: "left", marginTop: 0 }}>
//       {/* Invisible measurement iframe */}
//       <iframe
//         ref={measureRef}
//         title="resume-measure"
//         aria-hidden="true"
//         style={{
//           position: "fixed",
//           top: "-99999px",
//           left: "-99999px",
//           width: `${A4_W}px`,
//           height: `${A4_H * 10}px`,
//           border: "none",
//           visibility: "hidden",
//           pointerEvents: "none",
//         }}
//         sandbox="allow-same-origin allow-scripts"
//       />

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
//     </div>
//   );
// };

// export default TemplateEleven;

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

// // ─────────────────────────────────────────────────────────────────────────────
// // PIXEL-PERFECT A4 CONSTANTS
// // At 96 dpi: 210mm→794px, 297mm→1123px, 15mm→57px
// // PAGE_CONTENT_H = 1123 - 57*2 = 1009px (usable content per page)
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2; // 1009px

// const TemplateEleven: React.FC<ResumeProps> = ({ alldata }) => {
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

//   // Helper function to check if a custom section is a duplicate of the skills section
//   const isSkillsCustomSection = (sectionName: string): boolean => {
//     const name = sectionName?.toLowerCase().trim() || "";
//     return (
//       name === "skills" ||
//       name === "skill" ||
//       name === "technical skills" ||
//       name === "core skills"
//     );
//   };

//   // Filter out custom sections that are duplicates of skills
//   const getFilteredCustomSections = () => {
//     if (
//       !finalize ||
//       Array.isArray(finalize) ||
//       !Array.isArray(finalize.customSection)
//     ) {
//       return [];
//     }

//     const hasSkillsData = skills && typeof skills === "string" && skills.trim();

//     if (!hasSkillsData) {
//       return finalize.customSection.filter(
//         (s: any) => s?.name?.trim() || s?.description?.trim(),
//       );
//     }

//     return finalize.customSection.filter((s: any) => {
//       const hasContent = s?.name?.trim() || s?.description?.trim();
//       if (!hasContent) return false;
//       return !isSkillsCustomSection(s?.name || "");
//     });
//   };

//   /* ======================================================
//      CSS — MINIMALIST MODERN BLACK & WHITE
//   ====================================================== */
//   const styles = `
//     @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&display=swap');

//     @page {
//       size: A4;
//       margin: 0;
//     }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t11-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background: white;
//       font-family: 'Lato', 'Helvetica Neue', 'Segoe UI', sans-serif;
//       background-color: #ffffff;
//       line-height: 1.5;
//       color: #2c3e50;
//     }

//     .t11-resume * {
//       box-sizing: border-box;
//     }

//     /* Force all content blocks to stay together */
//     .t11-resume .section,
//     .t11-resume .experience-item,
//     .t11-resume .education-item,
//     .t11-resume .skills-content,
//     .t11-resume .custom-section,
//     .t11-resume .resume-header,
//     .t11-resume .project-header {
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .section-title {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t11-resume p {
//       margin: 0 0 4px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     .t11-resume p:last-child {
//       margin-bottom: 0 !important;
//     }

//     /* Rich text content styles */
//     .t11-resume .experience-description ul,
//     .t11-resume .experience-description ol,
//     .t11-resume .education-description ul,
//     .t11-resume .education-description ol,
//     .t11-resume .skills-content ul,
//     .t11-resume .skills-content ol,
//     .t11-resume .custom-section-content ul,
//     .t11-resume .custom-section-content ol {
//       margin: 4px 0 4px 20px !important;
//       padding-left: 20px !important;
//     }

//     .t11-resume .experience-description li,
//     .t11-resume .education-description li,
//     .t11-resume .skills-content li,
//     .t11-resume .custom-section-content li {
//       margin-bottom: 2px !important;
//       line-height: 1.5 !important;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .experience-description ul,
//     .t11-resume .education-description ul,
//     .t11-resume .skills-content ul,
//     .t11-resume .custom-section-content ul {
//       list-style-type: disc !important;
//     }

//     .t11-resume .experience-description ol,
//     .t11-resume .education-description ol,
//     .t11-resume .skills-content ol,
//     .t11-resume .custom-section-content ol {
//       list-style-type: decimal !important;
//     }

//     .t11-resume .experience-description strong,
//     .t11-resume .education-description strong,
//     .t11-resume .skills-content strong,
//     .t11-resume .custom-section-content strong {
//       font-weight: 700 !important;
//     }

//     .t11-resume .experience-description em,
//     .t11-resume .education-description em,
//     .t11-resume .skills-content em,
//     .t11-resume .custom-section-content em {
//       font-style: italic !important;
//     }

//     .t11-resume .experience-description u,
//     .t11-resume .education-description u,
//     .t11-resume .skills-content u,
//     .t11-resume .custom-section-content u {
//       text-decoration: underline !important;
//     }

//     .t11-resume .experience-description p,
//     .t11-resume .education-description p,
//     .t11-resume .skills-content p,
//     .t11-resume .custom-section-content p {
//       white-space: pre-wrap !important;
//       margin: 0 0 4px 0 !important;
//     }

//     /* Header Section */
//     .t11-resume .resume-header {
//       padding: 0 0 0 0;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .name {
//       font-size: 42px;
//       font-weight: 300;
//       letter-spacing: 1px;
//       margin-bottom: 12px;
//       color: #1a2a3a;
//       text-transform: uppercase;
//     }

//     .t11-resume .job-title {
//       font-size: 15px;
//       font-weight: 400;
//       color: #6c7a89;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       margin-bottom: 20px;
//     }

//     .t11-resume .divider {
//       width: 50px;
//       height: 2px;
//       background: #2c3e50;
//       margin: 18px 0;
//     }

//     .t11-resume .contact-row {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 20px;
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 15px;
//     }

//     .t11-resume .contact-item {
//       display: inline-flex;
//       align-items: center;
//       gap: 6px;
//     }

//     .t11-resume .address {
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 10px;
//     }

//     .t11-resume .links {
//       margin-top: 12px;
//       display: flex;
//       flex-wrap: wrap;
//       gap: 20px;
//     }

//     .t11-resume .link-item {
//       color: #2c3e50;
//       text-decoration: none;
//       font-size: 12px;
//       border-bottom: 1px solid transparent;
//       transition: border-color 0.2s;
//     }

//     /* Education Grade */
//     .t11-resume .education-grade {
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 4px;
//       font-weight: 500;
//     }

//     /* Main Content */
//     .t11-resume .resume-main {
//       padding: 20px 0 50px 0;
//       text-align: left;
//     }

//     /* Section Styles */
//     .t11-resume .section {
//       margin-bottom: 28px;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .section:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .section-title {
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 2px;
//       color: #2c3e50;
//       margin-bottom: 14px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #e8ecef;
//       text-align: left;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t11-resume .custom-section-title {
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 2px;
//       color: #2c3e50;
//       margin-bottom: 14px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #e8ecef;
//       text-align: left;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     /* Summary */
//     .t11-resume .summary-text {
//       font-size: 13px;
//       line-height: 1.6;
//       color: #4a5b6e;
//       text-align: left;
//     }

//     /* Skills Content */
//     .t11-resume .skills-content {
//       font-size: 13px;
//       line-height: 1.6;
//       color: #4a5b6e;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     /* Experience Items */
//     .t11-resume .experience-item {
//       margin-bottom: 24px;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .experience-item:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .experience-header {
//       margin-bottom: 8px;
//       text-align: left;
//     }

//     .t11-resume .experience-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 4px;
//       text-align: left;
//     }

//     .t11-resume .experience-title {
//       font-size: 16px;
//       font-weight: 600;
//       color: #1a2a3a;
//       text-align: left;
//     }

//     .t11-resume .experience-date {
//       font-size: 11px;
//       color: #8e9aab;
//       font-weight: 400;
//       letter-spacing: 0.3px;
//       text-align: right;
//     }

//     .t11-resume .experience-company-location {
//       font-size: 13px;
//       font-weight: 400;
//       color: #6c7a89;
//       margin-top: 2px;
//       text-align: left;
//     }

//     .t11-resume .experience-description {
//       margin-top: 8px;
//       text-align: left;
//     }

//     /* Education Items */
//     .t11-resume .education-item {
//       margin-bottom: 20px;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .education-item:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .education-header {
//       margin-bottom: 6px;
//       text-align: left;
//     }

//     .t11-resume .education-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 4px;
//       text-align: left;
//     }

//     .t11-resume .education-degree {
//       font-size: 16px;
//       font-weight: 600;
//       color: #1a2a3a;
//       text-align: left;
//     }

//     .t11-resume .education-school {
//       font-size: 13px;
//       font-weight: 400;
//       color: #6c7a89;
//       margin-top: 2px;
//       text-align: left;
//     }

//     .t11-resume .education-date {
//       font-size: 11px;
//       color: #8e9aab;
//       text-align: right;
//     }

//     .t11-resume .education-description {
//       margin-top: 8px;
//       text-align: left;
//     }

//     /* PROJECTS */
//     .t11-resume .project-header {
//       margin-bottom: 8px;
//     }

//     .t11-resume .project-links {
//       display: flex;
//       gap: 15px;
//     }

//     .t11-resume .project-link {
//       font-size: 11px;
//       color: #6c7a89;
//       text-decoration: underline;
//     }

//     .t11-resume .project-tech-stack {
//       font-size: 11px;
//       color: #8e9aab;
//       margin: 4px 0;
//     }

//     /* Custom Sections */
//     .t11-resume .custom-section {
//       margin-bottom: 16px;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .custom-section:last-child {
//       margin-bottom: 0;
//     }

//     .t11-resume .custom-section-content {
//       font-size: 13px;
//       color: #4a5b6e;
//       line-height: 1.55;
//       text-align: left;
//     }

//     /* Page break marker — injected at exact cut points for PDF */
//     .t11-page-break {
//       page-break-before: always !important;
//       break-before: page !important;
//       display: block;
//       height: 0;
//       margin: 0;
//       padding: 0;
//     }

//     /* Print Styles */
//     @media print {
//   *, *::before, *::after {
//     -webkit-print-color-adjust: exact !important;
//     print-color-adjust: exact !important;
//   }
//   html, body { margin: 0 !important; padding: 0 !important; overflow: visible; }
//   .t11-resume {
//     width: ${A4_W - MARGIN * 2}px !important;
//     padding: 0 !important;
//     margin: 0 !important;
//     box-shadow: none !important;
//     background: white;
//   }
// }
//     }
//   `;

//   const renderDescription = (text: string) => {
//     if (!text) return "";
//     return `<div class="experience-description">${cleanQuillHTML(text)}</div>`;
//   };

//   // ── HTML builder ─────────────────────────────────────────
//   // pageBreakIds: array of element data-ids where page breaks should be injected
//   // Used when forPDF=true to make Puppeteer break at the same points as preview
//   const generateHTML = useCallback(
//     (forPDF = false, pageBreakIds: string[] = []): string => {
//       const href = (url: string) =>
//         url.startsWith("http") ? url : `https://${url}`;

//       const addressStr = addressParts.join(" | ");

//       // Generate skills HTML
//       const generateSkillsHTML = () => {
//         if (!skills || (typeof skills === "string" && !skills.trim()))
//           return "";

//         const cleanedSkills = cleanQuillHTML(skills);
//         if (
//           !cleanedSkills ||
//           cleanedSkills === "<p><br></p>" ||
//           cleanedSkills === ""
//         )
//           return "";

//         return `
//         <div class="section" data-block-id="skills-section">
//           <h2 class="section-title">Skills</h2>
//           <div class="skills-content" data-block-id="skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//       };

//       // Generate projects HTML
//       const generateProjectsHTML = () => {
//         if (!projects || projects.length === 0) return "";

//         return `
//         <div class="section" data-block-id="proj-section">
//           <h2 class="section-title">Projects</h2>
//           ${projects
//             .map(
//               (project: any, i: number) => `
//             <div class="experience-item" data-block-id="proj-${i}">
//               <div class="project-header">
//                 <div class="experience-title-row">
//                   <span class="experience-title">${project.title || ""}</span>
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 </div>
//               </div>
//               ${
//                 project.techStack && project.techStack.length > 0
//                   ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               `
//                   : ""
//               }
//               ${
//                 project.description
//                   ? `
//                 <div class="experience-description">${cleanQuillHTML(project.description)}</div>
//               `
//                   : ""
//               }
//             </div>
//           `,
//             )
//             .join("")}
//         </div>
//       `;
//       };

//       // Generate custom sections HTML (excluding Skills duplicates)
//       const generateCustomSectionsHTML = () => {
//         const filteredSections = getFilteredCustomSections();
//         if (filteredSections.length === 0) return "";

//         return filteredSections
//           .map(
//             (s: any, i: number) => `
//           <div class="section" data-block-id="custom-${i}">
//             <div class="custom-section">
//               ${s.name ? `<h2 class="custom-section-title">${s.name}</h2>` : ""}
//               ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//             </div>
//           </div>
//         `,
//           )
//           .join("");
//       };

//       const pdfOverrideStyle = forPDF
//   ? `<style>
//       *, *::before, *::after {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       @page { size: A4; margin: ${MARGIN}px !important; }
//       html, body {
//         margin: 0 !important;
//         padding: 0 !important;
//         width: ${A4_W}px !important;
//       }
//       .t11-resume {
//         width: ${A4_W - MARGIN * 2}px !important;
//         padding: 0 !important;
//       }
//     </style>`
//   : "";

//       // Build the full HTML body content
//       let bodyContent = `
//       <!-- HEADER -->
//       <div class="resume-header" data-block-id="header">
//         <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//         <div class="job-title">${
//           contact?.jobTitle
//             ? typeof contact.jobTitle === "string"
//               ? contact.jobTitle
//               : (contact.jobTitle as any)?.name || ""
//             : ""
//         }</div>
//         <div class="divider"></div>
//         <div class="contact-row">
//           ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
//           ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
//           ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
//         </div>
//         ${addressStr ? `<div class="address">${addressStr}</div>` : ""}
//         <div class="links">
//           ${linkedinUrl ? `<a href="${href(linkedinUrl)}" class="link-item">LinkedIn</a>` : ""}
//           ${githubUrl ? `<a href="${href(githubUrl)}" class="link-item">GitHub</a>` : ""}
//           ${portfolioUrl ? `<a href="${href(portfolioUrl)}" class="link-item">Portfolio</a>` : ""}
//         </div>
//       </div>

//       <!-- MAIN CONTENT -->
//       <div class="resume-main">
//         <!-- SUMMARY -->
//         ${
//           summary
//             ? `
//           <div class="section" data-block-id="summary">
//             <h2 class="section-title">About</h2>
//             <div class="summary-text">${cleanQuillHTML(summary)}</div>
//           </div>
//         `
//             : ""
//         }

//         <!-- EXPERIENCE -->
//         ${
//           experiences.length > 0
//             ? `
//           <div class="section" data-block-id="exp-section">
//             <h2 class="section-title">Experience</h2>
//             ${experiences
//               .map((exp, i: number) => {
//                 const startFormatted = formatMonthYear(exp.startDate, false);
//                 const endFormatted = exp.endDate
//                   ? formatMonthYear(exp.endDate, false)
//                   : "Present";
//                 const companyLocation = [exp.employer, exp.location]
//                   .filter(Boolean)
//                   .join(" • ");
//                 return `
//                 <div class="experience-item" data-block-id="exp-${i}">
//                   <div class="experience-header">
//                     <div class="experience-title-row">
//                       <span class="experience-title">${exp.jobTitle || ""}</span>
//                       <span class="experience-date">${startFormatted} — ${endFormatted}</span>
//                     </div>
//                     <div class="experience-company-location">${companyLocation}</div>
//                   </div>
//                   ${exp.text ? renderDescription(exp.text) : ""}
//                 </div>
//               `;
//               })
//               .join("")}
//           </div>
//         `
//             : ""
//         }

//         <!-- PROJECTS -->
//         ${generateProjectsHTML()}

//         <!-- EDUCATION -->
//         ${
//           educations.length > 0
//             ? `
//           <div class="section" data-block-id="edu-section">
//             <h2 class="section-title">Education</h2>
//             ${educations
//               .map((edu, i: number) => {
//                 const dateStr =
//                   edu.startDate || edu.endDate
//                     ? `${edu.startDate || ""}${edu.startDate ? " — " : ""}${edu.endDate || "Present"}`
//                     : "";
//                 const formattedGrade = formatGradeToCgpdAndPercentage(
//                   edu.grade || "",
//                 );
//                 const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//                 const schoolLocation = [edu.schoolname, edu.location]
//                   .filter(Boolean)
//                   .join(" • ");
//                 return `
//                 <div class="education-item" data-block-id="edu-${i}">
//                   <div class="education-header">
//                     <div class="education-title-row">
//                       <div>
//                         <div class="education-degree">${edu.degree || ""}</div>
//                         ${schoolLocation ? `<div class="education-school">${schoolLocation}</div>` : ""}
//                       </div>
//                       ${dateStr ? `<span class="education-date">${dateStr}</span>` : ""}
//                     </div>
//                     ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                   </div>
//                   ${eduTextHtml ? `<div class="education-description">${eduTextHtml}</div>` : ""}
//                 </div>
//               `;
//               })
//               .join("")}
//           </div>
//         `
//             : ""
//         }

//         <!-- SKILLS -->
//         ${generateSkillsHTML()}

//         <!-- CUSTOM SECTIONS -->
//         ${generateCustomSectionsHTML()}
//       </div>
//     `;

//       // For PDF: inject <div class="t11-page-break"> before each element
//       // whose data-block-id matches one of the pageBreakIds
//       if (forPDF && pageBreakIds.length > 0) {
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = bodyContent;
//         pageBreakIds.forEach((id) => {
//           const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//           if (el) {
//             const breakDiv = document.createElement("div");
//             breakDiv.className = "t11-page-break";
//             el.parentNode?.insertBefore(breakDiv, el);
//           }
//         });
//         bodyContent = tempDiv.innerHTML;
//       }

//       return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8"/>
//         <meta name="viewport" content="width=device-width, initial-scale=1"/>
//         <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//         <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&display=swap" rel="stylesheet">
//         <style>${styles}</style>
//         ${pdfOverrideStyle}
//       </head>
//       <body style="margin:0;padding:0;background:white;">
//         <div class="t11-resume">
//           ${bodyContent}
//         </div>
//       </body>
//       </html>
//     `;
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
//   // PAGE SPLITTER
//   //
//   // Returns both the page HTMLs for preview AND the pageBreakIds for PDF.
//   // Same logic as Template One.
//   // ─────────────────────────────────────────────────────────────────────────
//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t11-resume");
//         if (!resumeEl) {
//           resolve([fullHtml]);
//           return;
//         }
//         const resumeSnapshot = resumeEl.outerHTML;

//         // Hidden measurement iframe — real iframe so fonts match render iframes
//         const iframe = document.createElement("iframe");
//         iframe.style.cssText = [
//           "position:fixed",
//           "top:0",
//           "left:-9999px",
//           `width:${A4_W}px`,
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
//   <style>
//     ${styles}
//     html, body {
//       margin: 0 !important; padding: 0 !important;
//       width: ${A4_W}px !important; height: auto !important;
//       overflow: visible !important; background: white !important;
//     }
//     .t11-resume {
//       width: ${A4_W}px !important;
//       padding-left: ${MARGIN}px !important;
//       padding-right: ${MARGIN}px !important;
//       padding-top: 0 !important; padding-bottom: 0 !important;
//       margin: 0 !important; box-sizing: border-box !important;
//     }
//   </style>
// </head>
// <body>${resumeSnapshot}</body>
// </html>`);
//         measureDoc.close();

//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t11-resume");
//           if (!resume) {
//             document.body.removeChild(iframe);
//             resolve([fullHtml]);
//             return;
//           }

//           // Force unconstrained layout
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

//           // ── Collect avoid-break blocks ──────────────────────────────
//           interface Block {
//             top: number;
//             bottom: number;
//             id?: string;
//           }
//           const blocks: Block[] = [];

//           const ITEM_SELECTORS = [
//   ".experience-item",
//   ".education-item",
//   ".skills-content",
//   ".custom-section",
// ].join(", ");

// resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//   const top = getRelTop(el);
//   const bottom = getRelBottom(el);
//   if (bottom - top > 8) {
//     blocks.push({ top, bottom, id: el.dataset.blockId });
//   }
// });

// // Section title + first item paired — prevents orphaned headings
// resume
//   .querySelectorAll<HTMLElement>(".section-title, .custom-section-title")
//   .forEach((title) => {
//     const titleTop = getRelTop(title);
//     let firstItem: HTMLElement | null = null;
//     let sib = title.nextElementSibling as HTMLElement | null;
//     while (sib) {
//       if (sib.getBoundingClientRect().height > 8) {
//         firstItem = sib;
//         break;
//       }
//       sib = sib.nextElementSibling as HTMLElement | null;
//     }
//     if (firstItem) {
//       const deepChild = firstItem.querySelector<HTMLElement>(
//         ".experience-item, .education-item, .custom-section, .skills-content",
//       );
//       const anchor = deepChild || firstItem;
//       const anchorBottom = getRelBottom(anchor);
//       if (anchorBottom - titleTop > 8) {
//         const sectionId = (title.parentElement as HTMLElement)?.dataset?.blockId;
//         blocks.push({
//           top: titleTop,
//           bottom: anchorBottom,
//           id: sectionId,
//         });
//       }
//     }
//   });

//           blocks.sort((a, b) => a.top - b.top);

//           // ── Calculate cut points ────────────────────────────────────
//           const pageStarts: number[] = [0];
//           // pageBreakIds[i] = data-block-id of element starting page i+1
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

//           document.body.removeChild(iframe);

//           // ── Store pageBreakIds so PDF download can use them ─────────
//           (window as any).__resumePageBreakIds = pageBreakIds;

//           // ── Build preview page HTMLs ────────────────────────────────
//           const pageHtmls: string[] = [];

//           for (let i = 0; i < pageStarts.length; i++) {
//             const contentOffsetY = pageStarts[i];
//             const nextStart = pageStarts[i + 1] ?? totalH;
//             // KEY FIX: clip at actual cut point, not always PAGE_CONTENT_H
//             const clipH = nextStart - contentOffsetY;

//             pageHtmls.push(`<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
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
//     .t11-resume {
//       width: ${A4_W}px !important;
//       padding-top: 0 !important; padding-bottom: 0 !important;
//       padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important;
//       margin: 0 !important;
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

//   // ── PDF download ─────────────────────────────────────────────────────────
//   // Reads pageBreakIds calculated during splitIntoPages and passes them to
//   // generateHTML so Puppeteer breaks at the exact same points as the preview.
//   const handleDownload = async () => {
//     try {
//       const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
//       const pdfHtml = generateHTML(true, pageBreakIds);

//       const res: AxiosResponse<Blob> = await api.post(
//         `${API_URL}/candidates/generate-pdf`,
//         { html: pdfHtml },
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
//     </div>
//   );
// };

// export default TemplateEleven;










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

// const TemplateEleven: React.FC<ResumeProps> = ({ alldata }) => {
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

//   const isSkillsCustomSection = (sectionName: string): boolean => {
//     const name = sectionName?.toLowerCase().trim() || "";
//     return (
//       name === "skills" ||
//       name === "skill" ||
//       name === "technical skills" ||
//       name === "core skills"
//     );
//   };

//   const getFilteredCustomSections = () => {
//     if (
//       !finalize ||
//       Array.isArray(finalize) ||
//       !Array.isArray(finalize.customSection)
//     ) {
//       return [];
//     }
//     const hasSkillsData = skills && typeof skills === "string" && skills.trim();
//     if (!hasSkillsData) {
//       return finalize.customSection.filter(
//         (s: any) => s?.name?.trim() || s?.description?.trim(),
//       );
//     }
//     return finalize.customSection.filter((s: any) => {
//       const hasContent = s?.name?.trim() || s?.description?.trim();
//       if (!hasContent) return false;
//       return !isSkillsCustomSection(s?.name || "");
//     });
//   };

//   // ── CSS ──────────────────────────────────────────────────────────────────
//   // KEY: .t11-resume keeps padding: 0 ${MARGIN}px at all times.
//   // pdfOverrideStyle NEVER changes padding/width — only adds print-color-adjust.
//   // This ensures preview and PDF see identical layout.
//   const styles = `
//     @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&display=swap');

// @page { size: A4; margin: 15mm; }

//     *, *::before, *::after { box-sizing: border-box; }

//     html, body { margin: 0; padding: 0; background: white; }

//     .t11-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background: white;
//       font-family: 'Lato', 'Helvetica Neue', 'Segoe UI', sans-serif;
//       background-color: #ffffff;
//       line-height: 1.5;
//       color: #2c3e50;
//       box-sizing: border-box;
//     }

//     .t11-resume * { box-sizing: border-box; }

//    .t11-resume .experience-item,
// .t11-resume .education-item,
// .t11-resume .skills-content,
// .t11-resume .custom-section,
// .t11-resume .resume-header,
// .t11-resume .project-header {
//   page-break-inside: avoid;
//   break-inside: avoid;
// }

//     .t11-resume .section-title {
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t11-resume p {
//       margin: 0 0 4px 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//     }

//     .t11-resume p:last-child { margin-bottom: 0 !important; }

//     .t11-resume .experience-description ul,
//     .t11-resume .experience-description ol,
//     .t11-resume .education-description ul,
//     .t11-resume .education-description ol,
//     .t11-resume .skills-content ul,
//     .t11-resume .skills-content ol,
//     .t11-resume .custom-section-content ul,
//     .t11-resume .custom-section-content ol {
//       margin: 4px 0 4px 20px !important;
//       padding-left: 20px !important;
//     }

//     .t11-resume .experience-description li,
//     .t11-resume .education-description li,
//     .t11-resume .skills-content li,
//     .t11-resume .custom-section-content li {
//       margin-bottom: 2px !important;
//       line-height: 1.5 !important;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .experience-description ul,
//     .t11-resume .education-description ul,
//     .t11-resume .skills-content ul,
//     .t11-resume .custom-section-content ul { list-style-type: disc !important; }

//     .t11-resume .experience-description ol,
//     .t11-resume .education-description ol,
//     .t11-resume .skills-content ol,
//     .t11-resume .custom-section-content ol { list-style-type: decimal !important; }

//     .t11-resume .experience-description strong,
//     .t11-resume .education-description strong,
//     .t11-resume .skills-content strong,
//     .t11-resume .custom-section-content strong { font-weight: 700 !important; }

//     .t11-resume .experience-description em,
//     .t11-resume .education-description em,
//     .t11-resume .skills-content em,
//     .t11-resume .custom-section-content em { font-style: italic !important; }

//     .t11-resume .experience-description u,
//     .t11-resume .education-description u,
//     .t11-resume .skills-content u,
//     .t11-resume .custom-section-content u { text-decoration: underline !important; }

//     .t11-resume .experience-description p,
//     .t11-resume .education-description p,
//     .t11-resume .skills-content p,
//     .t11-resume .custom-section-content p {
//       white-space: pre-wrap !important;
//       margin: 0 0 4px 0 !important;
//     }

//     .t11-resume .resume-header {
//       padding: 0;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .name {
//       font-size: 42px;
//       font-weight: 300;
//       letter-spacing: 1px;
//       margin-bottom: 12px;
//       color: #1a2a3a;
//       text-transform: uppercase;
//     }

//     .t11-resume .job-title {
//       font-size: 15px;
//       font-weight: 400;
//       color: #6c7a89;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       margin-bottom: 20px;
//     }

//     .t11-resume .divider {
//       width: 50px;
//       height: 2px;
//       background: #2c3e50;
//       margin: 18px 0;
//     }

//     .t11-resume .contact-row {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 20px;
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 15px;
//     }

//     .t11-resume .contact-item {
//       display: inline-flex;
//       align-items: center;
//       gap: 6px;
//     }

//     .t11-resume .address {
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 10px;
//     }

//     .t11-resume .links {
//       margin-top: 12px;
//       display: flex;
//       flex-wrap: wrap;
//       gap: 20px;
//     }

//     .t11-resume .link-item {
//       color: #2c3e50;
//       text-decoration: none;
//       font-size: 12px;
//       border-bottom: 1px solid transparent;
//     }

//     .t11-resume .education-grade {
//       font-size: 12px;
//       color: #6c7a89;
//       margin-top: 4px;
//       font-weight: 500;
//     }

//     .t11-resume .resume-main {
//       padding: 20px 0 50px 0;
//       text-align: left;
//     }

//    .t11-resume .section {
//   margin-bottom: 28px;
//   text-align: left;
// }
//     .t11-resume .section:last-child { margin-bottom: 0; }

//     .t11-resume .section-title {
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 2px;
//       color: #2c3e50;
//       margin-bottom: 14px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #e8ecef;
//       text-align: left;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t11-resume .custom-section-title {
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 2px;
//       color: #2c3e50;
//       margin-bottom: 14px;
//       padding-bottom: 6px;
//       border-bottom: 1px solid #e8ecef;
//       text-align: left;
//       page-break-after: avoid;
//       break-after: avoid;
//     }

//     .t11-resume .summary-text {
//       font-size: 13px;
//       line-height: 1.6;
//       color: #4a5b6e;
//       text-align: left;
//     }

//     .t11-resume .skills-content {
//       font-size: 13px;
//       line-height: 1.6;
//       color: #4a5b6e;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .experience-item {
//       margin-bottom: 24px;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .experience-item:last-child { margin-bottom: 0; }

//     .t11-resume .experience-header {
//       margin-bottom: 8px;
//       text-align: left;
//     }

//     .t11-resume .experience-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 4px;
//       text-align: left;
//     }

//     .t11-resume .experience-title {
//       font-size: 16px;
//       font-weight: 600;
//       color: #1a2a3a;
//       text-align: left;
//     }

//     .t11-resume .experience-date {
//       font-size: 11px;
//       color: #8e9aab;
//       font-weight: 400;
//       letter-spacing: 0.3px;
//       text-align: right;
//     }

//     .t11-resume .experience-company-location {
//       font-size: 13px;
//       font-weight: 400;
//       color: #6c7a89;
//       margin-top: 2px;
//       text-align: left;
//     }

//     .t11-resume .experience-description {
//       margin-top: 8px;
//       text-align: left;
//     }

//     .t11-resume .education-item {
//       margin-bottom: 20px;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .education-item:last-child { margin-bottom: 0; }

//     .t11-resume .education-header {
//       margin-bottom: 6px;
//       text-align: left;
//     }

//     .t11-resume .education-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 4px;
//       text-align: left;
//     }

//     .t11-resume .education-degree {
//       font-size: 16px;
//       font-weight: 600;
//       color: #1a2a3a;
//       text-align: left;
//     }

//     .t11-resume .education-school {
//       font-size: 13px;
//       font-weight: 400;
//       color: #6c7a89;
//       margin-top: 2px;
//       text-align: left;
//     }

//     .t11-resume .education-date {
//       font-size: 11px;
//       color: #8e9aab;
//       text-align: right;
//     }

//     .t11-resume .education-description {
//       margin-top: 8px;
//       text-align: left;
//     }

//     .t11-resume .project-header { margin-bottom: 8px; }

//     .t11-resume .project-links { display: flex; gap: 15px; }

//     .t11-resume .project-link {
//       font-size: 11px;
//       color: #6c7a89;
//       text-decoration: underline;
//     }

//     .t11-resume .project-tech-stack {
//       font-size: 11px;
//       color: #8e9aab;
//       margin: 4px 0;
//     }

//     .t11-resume .custom-section {
//       margin-bottom: 16px;
//       text-align: left;
//       page-break-inside: avoid;
//       break-inside: avoid;
//     }

//     .t11-resume .custom-section:last-child { margin-bottom: 0; }

//     .t11-resume .custom-section-content {
//       font-size: 13px;
//       color: #4a5b6e;
//       line-height: 1.55;
//       text-align: left;
//     }

//     .t11-page-break {
//       page-break-before: always !important;
//       break-before: page !important;
//       display: block;
//       height: 0;
//       margin: 0;
//       padding: 0;
//     }

//   @media print {
//   *, *::before, *::after {
//     -webkit-print-color-adjust: exact !important;
//     print-color-adjust: exact !important;
//   }
//   html, body { margin: 0 !important; padding: 0 !important; overflow: visible; }
//   .t11-resume {
//     width: 100% !important;
//     padding: 0 !important;
//     margin: 0 !important;
//     box-shadow: none !important;
//     background: white;
//   }
// }
//   `;

//   const renderDescription = (text: string) => {
//     if (!text) return "";
//     return `<div class="experience-description">${cleanQuillHTML(text)}</div>`;
//   };

//   const generateHTML = useCallback(
//     (forPDF = false, pageBreakIds: string[] = []): string => {
//       const href = (url: string) =>
//         url.startsWith("http") ? url : `https://${url}`;

//       const addressStr = addressParts.join(" | ");

//       const generateSkillsHTML = () => {
//         if (!skills || (typeof skills === "string" && !skills.trim()))
//           return "";
//         const cleanedSkills = cleanQuillHTML(skills);
//         if (
//           !cleanedSkills ||
//           cleanedSkills === "<p><br></p>" ||
//           cleanedSkills === ""
//         )
//           return "";
//         return `
//         <div class="section" data-block-id="skills-section">
//           <h2 class="section-title">Skills</h2>
//           <div class="skills-content" data-block-id="skills-content">${cleanedSkills}</div>
//         </div>`;
//       };

//       const generateProjectsHTML = () => {
//         if (!projects || projects.length === 0) return "";
//         return `
//         <div class="section" data-block-id="proj-section">
//           <h2 class="section-title">Projects</h2>
//           ${projects
//             .map(
//               (project: any, i: number) => `
//             <div class="experience-item" data-block-id="proj-${i}">
//               <div class="project-header">
//                 <div class="experience-title-row">
//                   <span class="experience-title">${project.title || ""}</span>
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 </div>
//               </div>
//               ${project.techStack && project.techStack.length > 0 ? `<div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>` : ""}
//               ${project.description ? `<div class="experience-description">${cleanQuillHTML(project.description)}</div>` : ""}
//             </div>`,
//             )
//             .join("")}
//         </div>`;
//       };

//       const generateCustomSectionsHTML = () => {
//         const filteredSections = getFilteredCustomSections();
//         if (filteredSections.length === 0) return "";
//         return filteredSections
//           .map(
//             (s: any, i: number) => `
//           <div class="section" data-block-id="custom-${i}">
//             <div class="custom-section">
//               ${s.name ? `<h2 class="custom-section-title">${s.name}</h2>` : ""}
//               ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//             </div>
//           </div>`,
//           )
//           .join("");
//       };

//      const pdfOverrideStyle = forPDF
//   ? `<style>
//       .t11-resume { width: 100% !important; padding: 0 !important; }
//       .t11-resume .section,
//       .t11-resume .experience-item,
//       .t11-resume .education-item,
//       .t11-resume .custom-section,
//       .t11-resume .skills-content,
//       .t11-resume .resume-header,
//       .t11-resume .project-header {
//         page-break-inside: auto !important;
//         break-inside: auto !important;
//       }
//     </style>`
//   : "";

//       let bodyContent = `
//       <div class="resume-header" data-block-id="header">
//         <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//         <div class="job-title">${
//           contact?.jobTitle
//             ? typeof contact.jobTitle === "string"
//               ? contact.jobTitle
//               : (contact.jobTitle as any)?.name || ""
//             : ""
//         }</div>
//         <div class="divider"></div>
//         <div class="contact-row">
//           ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
//           ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
//           ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
//         </div>
//         ${addressStr ? `<div class="address">${addressStr}</div>` : ""}
//         <div class="links">
//           ${linkedinUrl ? `<a href="${href(linkedinUrl)}" class="link-item">LinkedIn</a>` : ""}
//           ${githubUrl ? `<a href="${href(githubUrl)}" class="link-item">GitHub</a>` : ""}
//           ${portfolioUrl ? `<a href="${href(portfolioUrl)}" class="link-item">Portfolio</a>` : ""}
//         </div>
//       </div>

//       <div class="resume-main">
//         ${
//           summary
//             ? `
//           <div class="section" data-block-id="summary">
//             <h2 class="section-title">About</h2>
//             <div class="summary-text">${cleanQuillHTML(summary)}</div>
//           </div>`
//             : ""
//         }

//         ${
//           experiences.length > 0
//             ? `
//           <div class="section" data-block-id="exp-section">
//             <h2 class="section-title">Experience</h2>
//             ${experiences
//               .map((exp, i: number) => {
//                 const startFormatted = formatMonthYear(exp.startDate, false);
//                 const endFormatted = exp.endDate
//                   ? formatMonthYear(exp.endDate, false)
//                   : "Present";
//                 const companyLocation = [exp.employer, exp.location]
//                   .filter(Boolean)
//                   .join(" • ");
//                 return `
//               <div class="experience-item" data-block-id="exp-${i}">
//                 <div class="experience-header">
//                   <div class="experience-title-row">
//                     <span class="experience-title">${exp.jobTitle || ""}</span>
//                     <span class="experience-date">${startFormatted} — ${endFormatted}</span>
//                   </div>
//                   <div class="experience-company-location">${companyLocation}</div>
//                 </div>
//                 ${exp.text ? renderDescription(exp.text) : ""}
//               </div>`;
//               })
//               .join("")}
//           </div>`
//             : ""
//         }

//         ${generateProjectsHTML()}

//         ${
//           educations.length > 0
//             ? `
//           <div class="section" data-block-id="edu-section">
//             <h2 class="section-title">Education</h2>
//             ${educations
//               .map((edu, i: number) => {
//                 const dateStr =
//                   edu.startDate || edu.endDate
//                     ? `${edu.startDate || ""}${edu.startDate ? " — " : ""}${edu.endDate || "Present"}`
//                     : "";
//                 const formattedGrade = formatGradeToCgpdAndPercentage(
//                   edu.grade || "",
//                 );
//                 const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//                 const schoolLocation = [edu.schoolname, edu.location]
//                   .filter(Boolean)
//                   .join(" • ");
//                 return `
//               <div class="education-item" data-block-id="edu-${i}">
//                 <div class="education-header">
//                   <div class="education-title-row">
//                     <div>
//                       <div class="education-degree">${edu.degree || ""}</div>
//                       ${schoolLocation ? `<div class="education-school">${schoolLocation}</div>` : ""}
//                     </div>
//                     ${dateStr ? `<span class="education-date">${dateStr}</span>` : ""}
//                   </div>
//                   ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                 </div>
//                 ${eduTextHtml ? `<div class="education-description">${eduTextHtml}</div>` : ""}
//               </div>`;
//               })
//               .join("")}
//           </div>`
//             : ""
//         }

//         ${generateSkillsHTML()}
//         ${generateCustomSectionsHTML()}
//       </div>`;

//       if (forPDF && pageBreakIds.length > 0) {
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = bodyContent;
//         pageBreakIds.forEach((id) => {
//           const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//           if (el) {
//             const breakDiv = document.createElement("div");
//             breakDiv.className = "t11-page-break";
//             el.parentNode?.insertBefore(breakDiv, el);
//           }
//         });
//         bodyContent = tempDiv.innerHTML;
//       }

//       return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&display=swap" rel="stylesheet">
//   <style>${styles}</style>
//   ${pdfOverrideStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t11-resume">
//     ${bodyContent}
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

//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t11-resume");
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
//           `width:${A4_W}px`,
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
//   <style>
//     ${styles}
//     html, body {
//       margin: 0 !important; padding: 0 !important;
//       width: ${A4_W}px !important; height: auto !important;
//       overflow: visible !important; background: white !important;
//     }
//     .t11-resume {
//       width: ${A4_W}px !important;
//       padding-left: ${MARGIN}px !important;
//       padding-right: ${MARGIN}px !important;
//       padding-top: 0 !important; padding-bottom: 0 !important;
//       margin: 0 !important; box-sizing: border-box !important;
//     }
//   </style>
// </head>
// <body>${resumeSnapshot}</body>
// </html>`);
//         measureDoc.close();

//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t11-resume");
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

//           // ── Same selectors as T1 but with t11 class names ──
//        const ITEM_SELECTORS = [
//   ".experience-item",
//   ".education-item",
//   ".experience-header",
//   ".custom-section",
//   ".skills-content",
// ].join(", ");


//           resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
//             const top = getRelTop(el);
//             const bottom = getRelBottom(el);
//             if (bottom - top > 8) {
//               blocks.push({ top, bottom, id: el.dataset.blockId });
//             }
//           });

//           // Section title + first item paired — same logic as T1
//           // REPLACE the entire section title forEach block with this:
//           resume
//             .querySelectorAll<HTMLElement>(
//               ".section-title, .custom-section-title",
//             )
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
//                   ".experience-item, .education-item, .custom-section, .skills-content",
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
// const naiveCut = currentStart + PAGE_CONTENT_H;
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

//           document.body.removeChild(iframe);
//           (window as any).__resumePageBreakIds = pageBreakIds;

//           const pageHtmls: string[] = [];

//           for (let i = 0; i < pageStarts.length; i++) {
//             const contentOffsetY = pageStarts[i];
//             const nextStart = pageStarts[i + 1] ?? totalH;
//             const clipH = nextStart - contentOffsetY;

//             pageHtmls.push(`<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
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
//     .t11-resume {
//       width: ${A4_W}px !important;
//       padding-top: 0 !important; padding-bottom: 0 !important;
//       padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important;
//       margin: 0 !important;
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

//   const handleDownload = async () => {
//     try {
//       const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
//       const pdfHtml = generateHTML(true, pageBreakIds);

//       const res: AxiosResponse<Blob> = await api.post(
//         `${API_URL}/candidates/generate-pdf`,
//         { html: pdfHtml },
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
//     </div>
//   );
// };

// export default TemplateEleven;











































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
  SectionKey,
  DEFAULT_SECTION_ORDER,
} from "@/app/(resume)/download-resume/page";

const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;

interface TemplateElevenProps extends ResumeProps {
  customization?: ResumeCustomization;
}

const TemplateEleven: React.FC<TemplateElevenProps> = ({ alldata, customization }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

  // ── Customization ─────────────────────────────────────────────────────────
  const activeFontFamily = customization?.fontFamily ?? "'Lato', sans-serif";
  const activeSectionOrder: SectionKey[] = customization?.sectionOrder ?? [...DEFAULT_SECTION_ORDER];

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

  // ── Helper functions for custom sections ───────────────────────────────────
  const isSkillsCustomSection = (sectionName: string): boolean => {
    const name = sectionName?.toLowerCase().trim() || "";
    return (
      name === "skills" ||
      name === "skill" ||
      name === "technical skills" ||
      name === "core skills"
    );
  };

  const getFilteredCustomSections = () => {
    if (
      !finalize ||
      Array.isArray(finalize) ||
      !Array.isArray(finalize.customSection)
    ) {
      return [];
    }
    const hasSkillsData = skills && typeof skills === "string" && skills.trim();
    if (!hasSkillsData) {
      return finalize.customSection.filter(
        (s: any) => s?.name?.trim() || s?.description?.trim(),
      );
    }
    return finalize.customSection.filter((s: any) => {
      const hasContent = s?.name?.trim() || s?.description?.trim();
      if (!hasContent) return false;
      return !isSkillsCustomSection(s?.name || "");
    });
  };

  // ── Complete Font import map ────────────────────────────────────────────────
  const getFontImport = (fontFamily: string): string => {
    const map: Record<string, string> = {
      "'Inter', sans-serif": "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      "'-apple-system', 'BlinkMacSystemFont', sans-serif": "",
      "'Poppins', sans-serif": "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
      "'Lato', sans-serif": "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&display=swap",
      "'Nunito', sans-serif": "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap",
      "'Raleway', sans-serif": "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap",
      "'Montserrat', sans-serif": "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
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
    return map[fontFamily] || map["'Lato', sans-serif"];
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes('serif')) return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes('monospace')) return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  // ── CSS builder with dynamic font ─────────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @import url('${getFontImport(fontFamily)}');

    @page { size: A4; margin: 15mm; }

    *, *::before, *::after { box-sizing: border-box; }

    html, body { margin: 0; padding: 0; background: white; }

    .t11-resume {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background: white;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      background-color: #ffffff;
      line-height: 1.5;
      color: #2c3e50;
      box-sizing: border-box;
    }

    .t11-resume * { box-sizing: border-box; }

    .t11-resume p, .t11-resume div, .t11-resume span, .t11-resume li, .t11-resume a,
    .t11-resume h1, .t11-resume h2, .t11-resume h3 {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }

    .t11-resume .experience-item,
    .t11-resume .education-item,
    .t11-resume .skills-content,
    .t11-resume .custom-section,
    .t11-resume .resume-header,
    .t11-resume .project-header {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t11-resume .section-title {
      page-break-after: avoid;
      break-after: avoid;
    }

    .t11-resume p {
      margin: 0 0 4px 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
    }

    .t11-resume p:last-child { margin-bottom: 0 !important; }

    .t11-resume .experience-description ul,
    .t11-resume .experience-description ol,
    .t11-resume .education-description ul,
    .t11-resume .education-description ol,
    .t11-resume .skills-content ul,
    .t11-resume .skills-content ol,
    .t11-resume .custom-section-content ul,
    .t11-resume .custom-section-content ol {
      margin: 4px 0 4px 20px !important;
      padding-left: 20px !important;
    }

    .t11-resume .experience-description li,
    .t11-resume .education-description li,
    .t11-resume .skills-content li,
    .t11-resume .custom-section-content li {
      margin-bottom: 2px !important;
      line-height: 1.5 !important;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t11-resume .experience-description ul,
    .t11-resume .education-description ul,
    .t11-resume .skills-content ul,
    .t11-resume .custom-section-content ul { list-style-type: disc !important; }

    .t11-resume .experience-description ol,
    .t11-resume .education-description ol,
    .t11-resume .skills-content ol,
    .t11-resume .custom-section-content ol { list-style-type: decimal !important; }

    .t11-resume .experience-description strong,
    .t11-resume .education-description strong,
    .t11-resume .skills-content strong,
    .t11-resume .custom-section-content strong { font-weight: 700 !important; }

    .t11-resume .experience-description em,
    .t11-resume .education-description em,
    .t11-resume .skills-content em,
    .t11-resume .custom-section-content em { font-style: italic !important; }

    .t11-resume .experience-description u,
    .t11-resume .education-description u,
    .t11-resume .skills-content u,
    .t11-resume .custom-section-content u { text-decoration: underline !important; }

    .t11-resume .experience-description p,
    .t11-resume .education-description p,
    .t11-resume .skills-content p,
    .t11-resume .custom-section-content p {
      white-space: pre-wrap !important;
      margin: 0 0 4px 0 !important;
    }

    .t11-resume .resume-header {
      padding: 0;
      text-align: left;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t11-resume .name {
      font-size: 32px;
      font-weight: 300;
      letter-spacing: 1px;
      margin-bottom: 12px;
      color: #1a2a3a;
      text-transform: uppercase;
    }

    .t11-resume .job-title {
      font-size: 15px;
      font-weight: 400;
      color: #6c7a89;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    .t11-resume .divider {
      width: 50px;
      height: 2px;
      background: #2c3e50;
      margin: 18px 0;
    }

    .t11-resume .contact-row {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      font-size: 12px;
      color: #6c7a89;
      margin-top: 15px;
    }

    .t11-resume .contact-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .t11-resume .address {
      font-size: 12px;
      color: #6c7a89;
      margin-top: 10px;
    }

    .t11-resume .links {
      margin-top: 12px;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }

    .t11-resume .link-item {
      color: #2c3e50;
      text-decoration: none;
      font-size: 12px;
      border-bottom: 1px solid transparent;
    }

    .t11-resume .education-grade {
      font-size: 12px;
      color: #6c7a89;
      margin-top: 4px;
      font-weight: 500;
    }

    .t11-resume .resume-main {
      padding: 20px 0 50px 0;
      text-align: left;
    }

    .t11-resume .section {
      margin-bottom: 28px;
      text-align: left;
    }
    .t11-resume .section:last-child { margin-bottom: 0; }

    .t11-resume .section-title {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #2c3e50;
      margin-bottom: 14px;
      padding-bottom: 6px;
      border-bottom: 1px solid #e8ecef;
      text-align: left;
      page-break-after: avoid;
      break-after: avoid;
    }

    .t11-resume .custom-section-title {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #2c3e50;
      margin-bottom: 14px;
      padding-bottom: 6px;
      border-bottom: 1px solid #e8ecef;
      text-align: left;
      page-break-after: avoid;
      break-after: avoid;
    }

    .t11-resume .summary-text {
      font-size: 13px;
      line-height: 1.6;
      color: #4a5b6e;
      text-align: left;
    }

    .t11-resume .skills-content {
      font-size: 13px;
      line-height: 1.6;
      color: #4a5b6e;
      text-align: left;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t11-resume .experience-item {
      margin-bottom: 24px;
      text-align: left;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t11-resume .experience-item:last-child { margin-bottom: 0; }

    .t11-resume .experience-header {
      margin-bottom: 8px;
      text-align: left;
    }

    .t11-resume .experience-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 4px;
      text-align: left;
    }

    .t11-resume .experience-title {
      font-size: 16px;
      font-weight: 600;
      color: #1a2a3a;
      text-align: left;
    }

    .t11-resume .experience-date {
      font-size: 11px;
      color: #8e9aab;
      font-weight: 400;
      letter-spacing: 0.3px;
      text-align: right;
    }

    .t11-resume .experience-company-location {
      font-size: 13px;
      font-weight: 400;
      color: #6c7a89;
      margin-top: 2px;
      text-align: left;
    }

    .t11-resume .experience-description {
      margin-top: 8px;
      text-align: left;
    }

    .t11-resume .education-item {
      margin-bottom: 20px;
      text-align: left;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t11-resume .education-item:last-child { margin-bottom: 0; }

    .t11-resume .education-header {
      margin-bottom: 6px;
      text-align: left;
    }

    .t11-resume .education-title-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 4px;
      text-align: left;
    }

    .t11-resume .education-degree {
      font-size: 16px;
      font-weight: 600;
      color: #1a2a3a;
      text-align: left;
    }

    .t11-resume .education-school {
      font-size: 13px;
      font-weight: 400;
      color: #6c7a89;
      margin-top: 2px;
      text-align: left;
    }

    .t11-resume .education-date {
      font-size: 11px;
      color: #8e9aab;
      text-align: right;
    }

    .t11-resume .education-description {
      margin-top: 8px;
      text-align: left;
    }

    .t11-resume .project-header { margin-bottom: 8px; }

    .t11-resume .project-links { display: flex; gap: 15px; }

    .t11-resume .project-link {
      font-size: 11px;
      color: #6c7a89;
      text-decoration: underline;
    }

    .t11-resume .project-tech-stack {
      font-size: 11px;
      color: #8e9aab;
      margin: 4px 0;
    }

    .t11-resume .custom-section {
      margin-bottom: 16px;
      text-align: left;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t11-resume .custom-section:last-child { margin-bottom: 0; }

    .t11-resume .custom-section-content {
      font-size: 13px;
      color: #4a5b6e;
      line-height: 1.55;
      text-align: left;
    }

    .t11-page-break {
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
      html, body { margin: 0 !important; padding: 0 !important; overflow: visible; }
      .t11-resume {
        width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
        box-shadow: none !important;
        background: white;
      }
    }
  `,
    [],
  );

  const styles = buildCSS(activeFontFamily);

  // ── Helper functions ──────────────────────────────────────────────────────
  const href = (url: string) => url.startsWith("http") ? url : `https://${url}`;
  
  const rich = (html: string) => {
    const c = cleanQuillHTML(html);
    return c && c !== "<p><br></p>" ? c : "";
  };

  const renderDescription = (text: string) => {
    if (!text) return "";
    return `<div class="experience-description">${rich(text)}</div>`;
  };

  // ── Section builders ──────────────────────────────────────────────────────
  

  // ── HTML builder with section ordering ───────────────────────────────────
  const generateHTML = useCallback((forPDF = false, pageBreakIds: string[] = [], skillsCutIndex = -1): string => {

      const addressStr = addressParts.join(" | ");

      const fontPreloads = activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif" 
        ? `<link href="${getFontImport(activeFontFamily)}" rel="stylesheet"/>`
        : '';


        const sectionBuilders: Record<SectionKey, () => string> = {
    summary: () => summary ? `
      <div class="section" data-block-id="summary">
        <h2 class="section-title">About</h2>
        <div class="summary-text">${rich(summary)}</div>
      </div>
    ` : "",

    experience: () => experiences.length > 0 ? `
      <div class="section" data-block-id="exp-section">
        <h2 class="section-title">Experience</h2>
        ${experiences.map((exp, i: number) => {
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
                <div class="experience-company-location">${companyLocation}</div>
              </div>
              ${exp.text ? renderDescription(exp.text) : ""}
            </div>
          `;
        }).join("")}
      </div>
    ` : "",

    projects: () => projects.length > 0 ? `
      <div class="section" data-block-id="proj-section">
        <h2 class="section-title">Projects</h2>
        ${projects.map((project: any, i: number) => `
          <div class="experience-item" data-block-id="proj-${i}">
            <div class="project-header">
              <div class="experience-title-row">
                <span class="experience-title">${project.title || ""}</span>
                <div class="project-links">
                  ${project.liveUrl ? `<a href="${href(project.liveUrl)}" class="project-link">Live Demo</a>` : ""}
                  ${project.githubUrl ? `<a href="${href(project.githubUrl)}" class="project-link">GitHub</a>` : ""}
                </div>
              </div>
            </div>
            ${project.techStack && project.techStack.length > 0 ? `<div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>` : ""}
            ${project.description ? `<div class="experience-description">${rich(project.description)}</div>` : ""}
          </div>
        `).join("")}
      </div>
    ` : "",

    education: () => educations.length > 0 ? `
      <div class="section" data-block-id="edu-section">
        <h2 class="section-title">Education</h2>
        ${educations.map((edu, i: number) => {
          const dateStr = edu.startDate || edu.endDate ? `${edu.startDate || ""}${edu.startDate ? " — " : ""}${edu.endDate || "Present"}` : "";
          const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
          const eduTextHtml = edu.text ? rich(edu.text) : "";
          const schoolLocation = [edu.schoolname, edu.location].filter(Boolean).join(" • ");
          return `
            <div class="education-item" data-block-id="edu-${i}">
              <div class="education-header">
                <div class="education-title-row">
                  <div>
                    <div class="education-degree">${edu.degree || ""}</div>
                    ${schoolLocation ? `<div class="education-school">${schoolLocation}</div>` : ""}
                  </div>
                  ${dateStr ? `<span class="education-date">${dateStr}</span>` : ""}
                </div>
                ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
              </div>
              ${eduTextHtml ? `<div class="education-description">${eduTextHtml}</div>` : ""}
            </div>
          `;
        }).join("")}
      </div>
    ` : "",

    skills: () => {
      if (!skills || (typeof skills === "string" && !skills.trim())) return "";
      const cleanedSkills = rich(skills);
      if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";
      return `
        <div class="section" data-block-id="skills-section">
          <h2 class="section-title">Skills</h2>
          <div class="skills-content" data-block-id="skills-content">${cleanedSkills}</div>
        </div>
      `;
    },


    


    

    custom: () => {
      const filteredSections = getFilteredCustomSections();
      if (filteredSections.length === 0) return "";
      return filteredSections.map((s: any, i: number) => `
        <div class="section" data-block-id="custom-${i}">
          <div class="custom-section">
            ${s.name ? `<h2 class="custom-section-title">${s.name}</h2>` : ""}
            ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
          </div>
        </div>
      `).join("");
    },
  };

      // Build sections in the order defined by customization
      const sectionsHTML = activeSectionOrder
        .map(key => sectionBuilders[key]?.() ?? "")
        .join("");

      const pdfOverrideStyle = forPDF
        ? `<style>
            .t11-resume { width: 100% !important; padding: 0 !important; }
            .t11-resume .section,
            .t11-resume .experience-item,
            .t11-resume .education-item,
            .t11-resume .custom-section,
            .t11-resume .skills-content,
            .t11-resume .resume-header,
            .t11-resume .project-header {
              page-break-inside: auto !important;
              break-inside: auto !important;
            }
          </style>`
        : "";

      let bodyContent = `
        <div class="resume-header" data-block-id="header">
          <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
          <div class="job-title">${
            contact?.jobTitle
              ? typeof contact.jobTitle === "string"
                ? contact.jobTitle
                : (contact.jobTitle as any)?.name || ""
              : ""
          }</div>
          <div class="divider"></div>
          <div class="contact-row">
            ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
            ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
            ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
          </div>
          ${addressStr ? `<div class="address">${addressStr}</div>` : ""}
          <div class="links">
            ${linkedinUrl ? `<a href="${href(linkedinUrl)}" class="link-item">LinkedIn</a>` : ""}
            ${githubUrl ? `<a href="${href(githubUrl)}" class="link-item">GitHub</a>` : ""}
            ${portfolioUrl ? `<a href="${href(portfolioUrl)}" class="link-item">Portfolio</a>` : ""}
          </div>
        </div>

        <div class="resume-main">
          ${sectionsHTML}
        </div>`;

      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t11-page-break";
            el.parentNode?.insertBefore(breakDiv, el);
          }
        });
        bodyContent = tempDiv.innerHTML;
      }

      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  ${fontPreloads}
  <style>${styles}</style>
  ${pdfOverrideStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t11-resume">
    ${bodyContent}
  </div>
</body>
</html>`;
    },
    [
      activeFontFamily,
      activeSectionOrder,
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
        const resumeEl = parsed.querySelector<HTMLElement>(".t11-resume");
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
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    ${styles}
    html, body {
      margin: 0 !important; padding: 0 !important;
      width: ${A4_W}px !important; height: auto !important;
      overflow: visible !important; background: white !important;
    }
    .t11-resume {
      width: ${A4_W}px !important;
      padding-left: ${MARGIN}px !important;
      padding-right: ${MARGIN}px !important;
      padding-top: 0 !important; padding-bottom: 0 !important;
      margin: 0 !important; box-sizing: border-box !important;
    }
  </style>
</head>
<body>${resumeSnapshot}</body>
</html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t11-resume");
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

          const ITEM_SELECTORS = [
            ".experience-item",
            ".education-item",
            ".experience-header",
            ".custom-section",
          ].join(", ");

          resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
            const top = getRelTop(el);
            const bottom = getRelBottom(el);
            if (bottom - top > 8) {
              blocks.push({ top, bottom, id: el.dataset.blockId });
            }
          });

          resume.querySelectorAll<HTMLElement>(".section-title, .custom-section-title").forEach((title) => {
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
            // if (firstItem) {
            //   const deepChild = firstItem.querySelector<HTMLElement>(".experience-item, .education-item, .custom-section, .skills-content");
            //   const anchor = deepChild || firstItem;
            //   const anchorBottom = getRelBottom(anchor);
            //   if (anchorBottom - titleTop > 8) {
            //     const sectionId = (title.parentElement as HTMLElement)?.dataset?.blockId;
            //     blocks.push({ top: titleTop, bottom: anchorBottom, id: sectionId });
            //   }
            // }

            // AFTER
if (firstItem) {
  // Skip anchor logic for skills — allow it to split across pages
  if (firstItem.classList.contains("skills-content")) return;

  const deepChild = firstItem.querySelector<HTMLElement>(".entry-block, .summary-text");
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
              if (block.top >= currentStart && block.bottom > naiveCut) {
                if (block.top < actualCut) {
                  actualCut = block.top;
                  cutBlockId = block.id;
                }
              }
            }

            if (actualCut <= currentStart) actualCut = naiveCut;
            pageStarts.push(actualCut);
            if (cutBlockId) pageBreakIds.push(cutBlockId);
          }

          // document.body.removeChild(iframe);
          // (window as any).__resumePageBreakIds = pageBreakIds;


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
    if (block.top >= currentStart && block.bottom > naiveCut) {
      if (block.top < actualCut) {
        actualCut = block.top;
        cutBlockId = block.id;
      }
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
      position: absolute; top: ${MARGIN}px; left: 0;
      width: ${A4_W}px; height: ${clipH}px; overflow: hidden;
    }
    .page-shift {
      position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px;
    }
    .t11-resume {
      width: ${A4_W}px !important;
      padding-top: 0 !important; padding-bottom: 0 !important;
      padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important;
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
    [styles],
  );

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

  const handleDownload = async () => {
    try {
      // const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
      // const pdfHtml = generateHTML(true, pageBreakIds);

      // const res: AxiosResponse<Blob> = await api.post(
      //   `${API_URL}/candidates/generate-pdf`,
      //   { html: pdfHtml },
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
  };

  return (
    <div style={{ textAlign: "left", marginTop: 0 }}>
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
    </div>
  );
};

export default TemplateEleven;