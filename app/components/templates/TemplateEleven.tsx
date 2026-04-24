

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














"use client";
import React, { useContext } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
import { usePathname } from "next/navigation";
import { ResumeProps } from "@/app/types";
import { motion } from "framer-motion";


const TemplateEleven: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  console.log("context,", context);

  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const contact = alldata?.contact || context.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills || context?.skills || [];
  const projects = alldata?.projects || context?.projects || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";

  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.postcode,
    contact?.country,
  ].filter(Boolean);

  const linkedinUrl = contact?.linkedin;
  const portfolioUrl = contact?.portfolio;
  const githubUrl = contact?.github;
  const dateOfBirth = contact?.dob;

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
      // Categorized Skills - Each category with its own section
      return (
        <div className="section">
          <h2 className="section-title">Skills</h2>
          {skills.map((category: any) => (
            <div key={category.id} className="skill-category-block">
              <div className="skill-category-title">{category.title}</div>
              <div className="skills-container">
                {category.skills.map((skill: any) => (
                  <div key={skill.id} className="skill-item">
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      // Simple Skills - Grid of skill tags
      return (
        <div className="section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-container">
            {skills.map((skill: any, index: number) => (
              <div key={skill.id || index} className="skill-item">
                {skill.name || skill.skill}
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  // Helper function to render projects
  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;

    return (
      <div className="section">
        <h2 className="section-title">Projects</h2>
        {projects.map((project: any, index: number) => (
          <div key={project.id || index} className="experience-item">
            <div className="project-header">
              <div className="experience-title-row">
                <span className="experience-title">{project.title}</span>
                {(project.liveUrl || project.githubUrl) && (
                  <div className="project-links">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
            {project.techStack && project.techStack.length > 0 && (
              <div className="project-tech-stack">
                <strong>Tech:</strong> {project.techStack.join(" • ")}
              </div>
            )}
            {project.description && (
              <div
                className="experience-description"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  /* ======================================================
     CSS — MINIMALIST MODERN BLACK & WHITE
  ====================================================== */
  const styles = `
    .t11-resume {
      width: 210mm;
      min-height: 297mm;
      background: white;
      font-family: 'Lato', 'Helvetica Neue', 'Segoe UI', sans-serif;
      background-color: #ffffff;
      line-height: 1.5;
      color: #2c3e50;
    }

    .t11-resume.is-preview {
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

    /* Header Section */
    .t11-resume .resume-header {
      padding: 45px 45px 30px 45px;
      text-align: left;
    }

    .t11-resume .name {
      font-size: 42px;
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
      transition: border-color 0.2s;
    }

    /* Education Grade */
    .t11-resume .education-grade {
      font-size: 12px;
      color: #6c7a89;
      margin-top: 4px;
      font-weight: 500;
    }

    /* Main Content */
    .t11-resume .resume-main {
      padding: 20px 45px 50px 45px;
      text-align: left;
    }

    /* Section Styles */
    .t11-resume .section {
      margin-bottom: 32px;
      text-align: left;
    }

    .t11-resume .section:last-child {
      margin-bottom: 0;
    }

    .t11-resume .section-title {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #2c3e50;
      margin-bottom: 18px;
      padding-bottom: 6px;
      border-bottom: 1px solid #e8ecef;
      text-align: left;
    }

    /* Summary */
    .t11-resume .summary-text {
      font-size: 13px;
      line-height: 1.6;
      color: #4a5b6e;
      text-align: left;
    }

    /* Experience Items */
    .t11-resume .experience-item {
      margin-bottom: 28px;
      text-align: left;
    }

    .t11-resume .experience-item:last-child {
      margin-bottom: 0;
    }

    .t11-resume .experience-header {
      margin-bottom: 10px;
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

    .t11-resume .experience-company {
      font-size: 13px;
      font-weight: 400;
      color: #6c7a89;
      margin-top: 2px;
      text-align: left;
    }

    .t11-resume .experience-description {
      margin-top: 12px;
      text-align: left;
    }

    /* Bullet points */
    .t11-resume .experience-description ul,
    .t11-resume .education-description ul {
      list-style-type: none;
      padding-left: 0;
      text-align: left;
    }

    .t11-resume .experience-description li,
    .t11-resume .education-description li {
      position: relative;
      padding-left: 20px;
      margin-bottom: 8px;
      font-size: 13px;
      color: #4a5b6e;
      line-height: 1.55;
      text-align: left;
    }

    .t11-resume .experience-description li::before,
    .t11-resume .education-description li::before {
      content: "—";
      position: absolute;
      left: 2px;
      color: #2c3e50;
    }

    /* Education Items */
    .t11-resume .education-item {
      margin-bottom: 24px;
      text-align: left;
    }

    .t11-resume .education-item:last-child {
      margin-bottom: 0;
    }

    .t11-resume .education-header {
      margin-bottom: 8px;
      text-align: left;
    }

    .t11-resume .education-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 4px;
      text-align: left;
    }

    .t11-resume .education-school {
      font-size: 16px;
      font-weight: 600;
      color: #1a2a3a;
      text-align: left;
    }

    .t11-resume .education-date {
      font-size: 11px;
      color: #8e9aab;
      text-align: right;
    }

    .t11-resume .education-degree {
      font-size: 13px;
      color: #6c7a89;
      margin-top: 4px;
      text-align: left;
    }

    .t11-resume .education-description {
      margin-top: 10px;
      text-align: left;
    }

    /* SKILLS */
    .t11-resume .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 20px;
      margin-top: 5px;
      text-align: left;
    }

    .t11-resume .skill-item {
      font-size: 13px;
      color: #4a5b6e;
      position: relative;
      padding-left: 18px;
      text-align: left;
    }

    .t11-resume .skill-item::before {
      content: "▹";
      position: absolute;
      left: 2px;
      color: #2c3e50;
      font-size: 11px;
    }

    /* Categorized Skills */
    .t11-resume .skill-category-block {
      margin-bottom: 20px;
    }

    .t11-resume .skill-category-block:last-child {
      margin-bottom: 0;
    }

    .t11-resume .skill-category-title {
      font-size: 13px;
      font-weight: 600;
      color: #1a2a3a;
      margin-bottom: 10px;
      padding-bottom: 3px;
      border-bottom: 1px solid #e8ecef;
    }

    /* PROJECTS */
    .t11-resume .project-header {
      margin-bottom: 10px;
    }

    .t11-resume .project-links {
      display: flex;
      gap: 15px;
    }

    .t11-resume .project-link {
      font-size: 11px;
      color: #6c7a89;
      text-decoration: underline;
    }

    .t11-resume .project-tech-stack {
      font-size: 11px;
      color: #8e9aab;
      margin: 6px 0;
    }

    /* Additional content */
    .t11-resume .additional-container {
      margin-top: 5px;
      text-align: left;
    }

    .t11-resume .additional-item {
      font-size: 13px;
      color: #4a5b6e;
      margin-bottom: 8px;
      position: relative;
      padding-left: 18px;
      text-align: left;
    }

    .t11-resume .additional-item::before {
      content: "▹";
      position: absolute;
      left: 2px;
      color: #2c3e50;
      font-size: 11px;
    }

    /* Custom Sections */
    .t11-resume .custom-section {
      margin-bottom: 20px;
      text-align: left;
    }

    .t11-resume .custom-section:last-child {
      margin-bottom: 0;
    }

    .t11-resume .custom-section-title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #2c3e50;
      margin-bottom: 8px;
      text-align: left;
    }

    .t11-resume .custom-section-content {
      font-size: 13px;
      color: #4a5b6e;
      line-height: 1.55;
      padding-left: 18px;
      text-align: left;
    }

    /* Print Styles */
    @media print {
      @page {
        size: A4;
        margin: 0;
      }

      body {
        background: white;
        margin: 0;
        padding: 0;
      }

      .t11-resume {
        margin: 0;
        max-width: 100%;
        box-shadow: none;
        padding: 0;
      }

      .t11-resume .resume-header {
        padding: 45px 45px 30px 45px !important;
      }

      .t11-resume .resume-main {
        padding: 20px 45px 50px 45px !important;
      }

      .t11-resume .section {
        page-break-inside: avoid;
      }

      .t11-resume .experience-item {
        page-break-inside: avoid;
      }

      .t11-resume .divider {
        background: #2c3e50;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }

    /* Responsive */
    @media (max-width: 600px) {
      .t11-resume {
        margin: 15px;
      }

      .t11-resume .resume-header {
        padding: 30px 25px 20px 25px !important;
      }

      .t11-resume .resume-main {
        padding: 15px 25px 35px 25px !important;
      }

      .t11-resume .name {
        font-size: 32px;
      }

      .t11-resume .job-title {
        font-size: 13px;
      }

      .t11-resume .contact-row {
        flex-direction: column;
        gap: 6px;
      }

      .t11-resume .experience-title-row {
        flex-direction: column;
        gap: 4px;
      }

      .t11-resume .experience-date {
        text-align: left;
      }

      .t11-resume .education-title-row {
        flex-direction: column;
        gap: 4px;
      }

      .t11-resume .education-date {
        text-align: left;
      }

      .t11-resume .project-links {
        margin-top: 6px;
      }
    }
  `;

  const stripHtml = (html: string) => {
    return html?.replace(/<\/?[^>]+(>|$)/g, "") || "";
  };

  const renderDescription = (text: string) => {
    if (!text) return "";

    if (text.includes("<") && text.includes(">")) {
      return `<div class="experience-description">${text}</div>`;
    }

    const lines = text.split("\n").filter((line) => line.trim() !== "");
    if (lines.some((line) => line.trim().startsWith("-") || line.trim().startsWith("•"))) {
      return `
        <div class="experience-description">
          <ul>
            ${lines
              .map((line) => {
                const trimmed = line.trim();
                if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
                  return `<li>${trimmed.substring(1).trim()}</li>`;
                } else if (trimmed) {
                  return `<li>${trimmed}</li>`;
                }
                return "";
              })
              .join("")}
          </ul>
        </div>`;
    } else {
      return `<div class="experience-description" style="white-space: pre-wrap; text-align: left;">${stripHtml(text)}</div>`;
    }
  };

  const generateHTML = () => {
    const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

    // Generate skills HTML for PDF
    const generateSkillsHTML = () => {
      if (!skills || skills.length === 0) return "";
      
      const isCategorized = isCategorizedSkills(skills);
      
      if (isCategorized) {
        return `
          <div class="section">
            <h2 class="section-title">Skills</h2>
            ${skills.map((category: any) => `
              <div class="skill-category-block">
                <div class="skill-category-title">${category.title}</div>
                <div class="skills-container">
                  ${category.skills.map((skill: any) => `
                    <div class="skill-item">${skill.name}</div>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>
        `;
      } else {
        return `
          <div class="section">
            <h2 class="section-title">Skills</h2>
            <div class="skills-container">
              ${skills.map((skill: any) => `
                <div class="skill-item">${skill.name || skill.skill}</div>
              `).join("")}
            </div>
          </div>
        `;
      }
    };

    // Generate projects HTML for PDF
    const generateProjectsHTML = () => {
      if (!projects || projects.length === 0) return "";
      
      return `
        <div class="section">
          <h2 class="section-title">Projects</h2>
          ${projects.map((project: any) => `
            <div class="experience-item">
              <div class="project-header">
                <div class="experience-title-row">
                  <span class="experience-title">${project.title || ""}</span>
                  <div class="project-links">
                    ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
                    ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
                  </div>
                </div>
              </div>
              ${project.techStack && project.techStack.length > 0 ? `
                <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
              ` : ""}
              ${project.description ? `
                <div class="experience-description">${project.description}</div>
              ` : ""}
            </div>
          `).join("")}
        </div>
      `;
    };

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8"/>
        <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&display=swap" rel="stylesheet">
        <style>${styles}</style>
      </head>
      <body>
        <div class="t11-resume">
          <!-- HEADER -->
          <div class="resume-header">
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
            ${addressParts.length ? `<div class="address">${addressParts.join(" | ")}</div>` : ""}
            <div class="links">
              ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
              ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item">GitHub</a>` : ""}
              ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
            </div>
          </div>

          <!-- MAIN CONTENT -->
          <div class="resume-main">
            <!-- SUMMARY -->
            ${summary ? `
              <div class="section">
                <h2 class="section-title">About</h2>
                <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
              </div>
            ` : ""}

            <!-- EXPERIENCE -->
            ${experiences.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Experience</h2>
                ${experiences.map((exp) => {
                  const startFormatted = formatMonthYear(exp.startDate, true);
                  const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
                  return `
                    <div class="experience-item">
                      <div class="experience-header">
                        <div class="experience-title-row">
                          <span class="experience-title">${exp.jobTitle || ""}</span>
                          <span class="experience-date">${startFormatted} — ${endFormatted}</span>
                        </div>
                        <div class="experience-company">${exp.employer || ""}</div>
                        ${exp.location ? `<div class="experience-location">${exp.location}</div>` : ""}
                      </div>
                      ${exp.text ? renderDescription(exp.text) : ""}
                    </div>
                  `;
                }).join("")}
              </div>
            ` : ""}

            <!-- PROJECTS -->
            ${generateProjectsHTML()}

            <!-- EDUCATION -->
            ${educations.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Education</h2>
                ${educations.map((edu) => {
                  const dateStr = edu.startDate || edu.endDate
                    ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " — " : ""}${edu.endDate || ""}`
                    : "";
                  const formattedGrade = formatGrade(edu.grade || "");
                  return `
                    <div class="education-item">
                      <div class="education-header">
                        <div class="education-title-row">
                          <span class="education-school">${edu.schoolname || ""}</span>
                          ${dateStr ? `<span class="education-date">${dateStr}</span>` : ""}
                        </div>
                        ${edu.degree ? `<div class="education-degree">${edu.degree}</div>` : ""}
                        ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
                      </div>
                      ${edu.text ? `<div class="education-description">${renderDescription(edu.text)}</div>` : ""}
                    </div>
                  `;
                }).join("")}
              </div>
            ` : ""}

            <!-- SKILLS -->
            ${generateSkillsHTML()}

            <!-- LANGUAGES -->
            ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some(l => l.name?.trim()) ? `
              <div class="section">
                <h2 class="section-title">Languages</h2>
                <div class="skills-container">
                  ${finalize.languages.filter(l => l.name?.trim()).map(l => `
                    <div class="skill-item">${l.name}${l.level ? ` — ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</div>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <!-- CERTIFICATIONS -->
            ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some(c => c.name?.replace(/<[^>]*>/g, "").trim()) ? `
              <div class="section">
                <h2 class="section-title">Certifications</h2>
                <div class="additional-container">
                  ${finalize.certificationsAndLicenses.filter(c => c.name?.replace(/<[^>]*>/g, "").trim()).map(c => `
                    <div class="additional-item">${c.name.replace(/<[^>]*>/g, "")}</div>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <!-- AWARDS -->
            ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some(a => a.name?.replace(/<[^>]*>/g, "").trim()) ? `
              <div class="section">
                <h2 class="section-title">Awards</h2>
                <div class="additional-container">
                  ${finalize.awardsAndHonors.filter(a => a.name?.replace(/<[^>]*>/g, "").trim()).map(a => `
                    <div class="additional-item">${a.name.replace(/<[^>]*>/g, "")}</div>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <!-- INTERESTS -->
            ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some(h => h.name?.replace(/<[^>]*>/g, "").trim()) ? `
              <div class="section">
                <h2 class="section-title">Interests</h2>
                <div class="additional-container">
                  ${finalize.hobbiesAndInterests.filter(h => h.name?.replace(/<[^>]*>/g, "").trim()).map(h => `
                    <div class="additional-item">${h.name.replace(/<[^>]*>/g, "")}</div>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <!-- CUSTOM SECTIONS -->
            ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some(s => s?.name?.trim() || s?.description?.trim()) ? `
              <div class="section">
                ${finalize.customSection.filter(s => s?.name?.trim() || s?.description?.trim()).map(s => `
                  <div class="custom-section">
                    ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
                    ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
                  </div>
                `).join("")}
              </div>
            ` : ""}
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const handleDownload = async () => {
    try {
      const html = generateHTML();
      const res = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        { html },
        { responseType: "blob" }
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

  const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

  return (
    <div style={{ textAlign: "left", marginTop: 0 }}>
    
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

      {/* Resume Preview */}
      <div className={`t11-resume ${alldata ? 'is-preview' : ''}`} style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}>
        <style>{styles}</style>

        {/* HEADER */}
        <div className="resume-header">
          <h1 className="name">
            {contact?.firstName} {contact?.lastName}
          </h1>
          <div className="job-title">
            {contact?.jobTitle
              ? typeof contact.jobTitle === "string"
                ? contact.jobTitle
                : (contact.jobTitle as any)?.name || ""
              : ""}
          </div>
          <div className="divider"></div>
          <div className="contact-row">
            {contact?.email && <div className="contact-item">{contact.email}</div>}
            {contact?.phone && <div className="contact-item">{contact.phone}</div>}
            {formattedDob && <div className="contact-item">{formattedDob}</div>}
          </div>
          {addressParts.length > 0 && (
            <div className="address">{addressParts.join(" | ")}</div>
          )}
          <div className="links">
            {linkedinUrl && (
              <a
                href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            )}
            {portfolioUrl && (
              <a
                href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                Portfolio
              </a>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="resume-main">
          {/* SUMMARY */}
          {summary && (
            <div className="section">
              <h2 className="section-title">About</h2>
              <div
                className="summary-text"
                dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
              />
            </div>
          )}

          {/* EXPERIENCE */}
          {experiences.length > 0 && (
            <div className="section">
              <h2 className="section-title">Experience</h2>
              {experiences.map((exp, i) => (
                <div key={i} className="experience-item">
                  <div className="experience-header">
                    <div className="experience-title-row">
                      <span className="experience-title">{exp.jobTitle}</span>
                      <span className="experience-date">
                        <MonthYearDisplay value={exp.startDate} shortYear /> —{" "}
                        {exp.endDate ? (
                          <MonthYearDisplay value={exp.endDate} shortYear />
                        ) : (
                          "Present"
                        )}
                      </span>
                    </div>
                    <div className="experience-company">{exp.employer}</div>
                    {exp.location && <div className="experience-location">{exp.location}</div>}
                  </div>
                  {exp.text && (
                    <div
                      className="experience-description"
                      dangerouslySetInnerHTML={{ __html: exp.text }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS */}
          {renderProjects()}

          {/* EDUCATION */}
          {educations.length > 0 && (
            <div className="section">
              <h2 className="section-title">Education</h2>
              {educations.map((edu, i) => {
                const formattedGrade = formatGrade(edu.grade || "");
                return (
                  <div key={i} className="education-item">
                    <div className="education-header">
                      <div className="education-title-row">
                        <span className="education-school">{edu.schoolname}</span>
                        {(edu.startDate || edu.endDate) && (
                          <span className="education-date">
                            {edu.startDate || ""}
                            {edu.startDate && edu.endDate && " — "}
                            {edu.endDate || ""}
                          </span>
                        )}
                      </div>
                      {edu.degree && <div className="education-degree">{edu.degree}</div>}
                      {formattedGrade && <div className="education-grade">{formattedGrade}</div>}
                    </div>
                    {edu.text && (
                      <div
                        className="education-description"
                        dangerouslySetInnerHTML={{ __html: edu.text }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* SKILLS */}
          {renderSkills()}

          {/* LANGUAGES */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize.languages) &&
            finalize.languages.some((l) => l.name?.trim()) && (
              <div className="section">
                <h2 className="section-title">Languages</h2>
                <div className="skills-container">
                  {finalize.languages.map(
                    (lang, i) =>
                      lang.name?.trim() && (
                        <div key={i} className="skill-item">
                          {lang.name}
                          {lang.level &&
                            ` — ${Math.round((Number(lang.level) / 4) * 100)}%`}
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

          {/* CERTIFICATIONS */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize.certificationsAndLicenses) &&
            finalize.certificationsAndLicenses.some(
              (c) => c.name?.replace(/<[^>]*>/g, "").trim()
            ) && (
              <div className="section">
                <h2 className="section-title">Certifications</h2>
                <div className="additional-container">
                  {finalize.certificationsAndLicenses.map(
                    (item, i) =>
                      item.name?.replace(/<[^>]*>/g, "").trim() && (
                        <div
                          key={i}
                          className="additional-item"
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      )
                  )}
                </div>
              </div>
            )}

          {/* AWARDS */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize.awardsAndHonors) &&
            finalize.awardsAndHonors.some(
              (a) => a.name?.replace(/<[^>]*>/g, "").trim()
            ) && (
              <div className="section">
                <h2 className="section-title">Awards</h2>
                <div className="additional-container">
                  {finalize.awardsAndHonors.map(
                    (item, i) =>
                      item.name?.replace(/<[^>]*>/g, "").trim() && (
                        <div
                          key={i}
                          className="additional-item"
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      )
                  )}
                </div>
              </div>
            )}

          {/* INTERESTS */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize.hobbiesAndInterests) &&
            finalize.hobbiesAndInterests.some(
              (h) => h.name?.replace(/<[^>]*>/g, "").trim()
            ) && (
              <div className="section">
                <h2 className="section-title">Interests</h2>
                <div className="additional-container">
                  {finalize.hobbiesAndInterests.map(
                    (item, i) =>
                      item.name?.replace(/<[^>]*>/g, "").trim() && (
                        <div
                          key={i}
                          className="additional-item"
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      )
                  )}
                </div>
              </div>
            )}

          {/* CUSTOM SECTIONS */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize.customSection) &&
            finalize.customSection.some(
              (s) => s?.name?.trim() || s?.description?.trim()
            ) && (
              <div className="section">
                {finalize.customSection.map(
                  (section, i) =>
                    (section?.name?.trim() || section?.description?.trim()) && (
                      <div key={i} className="custom-section">
                        {section.name && (
                          <h3 className="custom-section-title">{section.name}</h3>
                        )}
                        {section.description && (
                          <div
                            className="custom-section-content"
                            dangerouslySetInnerHTML={{ __html: section.description }}
                          />
                        )}
                      </div>
                    )
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TemplateEleven;