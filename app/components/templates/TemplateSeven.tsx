// // ─── Professional Black & White Single Column Resume Template ───────────
// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { AllData, ResumeProps } from "@/app/types";

// const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
//   // const context = useContext(CreateContext);

//   // const pathname = usePathname();
//   // const lastSegment = pathname.split("/").pop();

//   // const contact = context.contact || {};
//   // const educations = context?.education || [];
//   // const experiences = context?.experiences || [];
//   // const skills = context?.skills || [];
//   // const finalize = context?.finalize || {};
//   // const summary = context?.summary || "";

//   //   console.log("alldata", alldata);

//   const context = useContext(CreateContext);
//   console.log("context,", context);

//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
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

//   /* ======================================================
//      CSS — PROFESSIONAL BLACK & WHITE
//   ====================================================== */
//   const styles = `

//  .t7-resume  body{
//   margin:0;
//   padding:0;

//   }

//     .t7-resume  {
//     width: 210mm;
//       margin: 30px auto;
//       background: white;
//       border: 1px solid #e0e0e0;
//     }

//       .t7-resume.is-preview {
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

//     /* Header Section */
//     .t7-resume .resume-header {
//       padding: 40px 50px 25px 50px;
//       border-bottom: 2px solid #000000;
//       text-align: center;
//     }

//    .t7-resume .name {
//       font-size: 32px;
//       font-weight: 700;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       margin-bottom: 8px;
//       color: #000000;
//     }

//    .t7-resume .job-title {
//       font-size: 16px;
//       font-weight: 500;
//       letter-spacing: 1px;
//       color: #333333;
//       margin-bottom: 16px;
//       padding-bottom: 12px;
//       border-bottom: 1px solid #cccccc;
//     }

//    .t7-resume .contact-row {
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 20px;
//       font-size: 12px;
//       color: #444444;
//       margin-bottom: 8px;
//     }

//    .t7-resume .contact-item {
//       display: inline-flex;
//       align-items: center;
//       gap: 5px;
//     }

//    .t7-resume .address {
//       font-size: 12px;
//       color: #444444;
//       margin-top: 6px;
//     }

//    .t7-resume .links {
//       margin-top: 10px;
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 16px;
//     }

//   .t7-resume  .link-item {
//       color: #000000;
//       text-decoration: none;
//       font-size: 12px;
//       border-bottom: 1px dotted #999;
//     }

//     /* Main Content */
//     .t7-resume .resume-main {
//       padding: 30px 50px 45px 50px;
//     }

//     /* Section Styles */
//     .t7-resume .section {
//       margin-bottom: 25px;
//     }

//     .t7-resume  .section:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume  .section-title {
//       font-size: 16px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       color: #000000;
//       margin-bottom: 12px;
//       padding-bottom: 4px;
//       border-bottom: 1px solid #000000;
//     }

//     /* Summary */
//     .t7-resume .summary-text {
//       font-size: 13px;
//       line-height: 1.5;
//       color: #222222;
//       text-align: justify;
//     }

//     /* Experience Items */
//     .t7-resume .experience-item {
//       margin-bottom: 20px;
//     }

//     .t7-resume .experience-item:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t7-resume .experience-title {
//       font-size: 15px;
//       font-weight: 700;
//       color: #000000;
//           text-align: start;
//     }

//     .t7-resume .experience-company {
//       font-size: 13px;
//       font-weight: 500;
//       font-style: italic;
//       color: #333333;
//       margin-top: 2px;
//                 text-align: start;

//     }

//     .t7-resume .experience-date {
//       font-size: 12px;
//       color: #555555;
//       font-weight: normal;
//       white-space: nowrap;
//     }

//     .t7-resume .experience-description {
//       margin-top: 8px;
//       padding-left: 0;
//                       text-align: start;

//     }

//     /* Bullet points */
//     .t7-resume .experience-description ul,
//     .t7-resume .education-description ul {
//       list-style-type: none;
//       padding-left: 0;
//                 text-align: start;

//     }

//     .t7-resume .experience-description li,
//     .t7-resume .education-description li {
//       position: relative;
//       padding-left: 18px;
//       margin-bottom: 5px;
//       font-size: 13px;
//       color: #222222;
//       line-height: 1.45;
//                       text-align: start;

//     }

//     .t7-resume .experience-description li::before,
//     .t7-resume .education-description li::before {
//       content: "•";
//       position: absolute;
//       left: 4px;
//       color: #000000;
//       font-size: 12px;
//     }

//     /* Education Items */
//     .t7-resume .education-item {
//       margin-bottom: 18px;
//     }

//     .t7-resume .education-item:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 5px;
//     }

//     .t7-resume .education-school {
//       font-size: 15px;
//       font-weight: 700;
//       color: #000000;
//                 text-align: start;

//     }

//     .t7-resume .education-degree {
//       font-size: 13px;
//       color: #333333;
//       margin-top: 2px;
//                 text-align: start;

//     }

//     .t7-resume .education-date {
//       font-size: 12px;
//       color: #555555;
//       white-space: nowrap;
//     }

//     .t7-resume .education-description {
//       margin-top: 6px;
//                       text-align: start;

//     }

//     /* Skills */
//     .t7-resume .skills-container {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 8px 20px;
//       margin-top: 8px;
//     }

//     .t7-resume .skill-item {
//       font-size: 13px;
//       color: #222222;
//       position: relative;
//       padding-left: 14px;
//     }

//     .t7-resume .skill-item::before {
//       content: "•";
//       position: absolute;
//       left: 2px;
//       color: #000000;
//     }

//     /* Additional content */
//     .t7-resume .additional-content {
//       margin-top: 8px;
//     }

//     .t7-resume .additional-item {
//       font-size: 13px;
//       color: #222222;
//       margin-bottom: 6px;
//       position: relative;
//       padding-left: 18px;
//                       text-align: start;

//     }

//     .t7-resume .additional-item::before {
//       content: "•";
//       position: absolute;
//       left: 4px;
//       color: #000000;
//     }

//     /* Custom Sections */
//     .t7-resume .custom-section {
//       margin-bottom: 16px;
//     }

//     .t7-resume .custom-section:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .custom-section-title {

//        font-size: 16px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       color: #000000;
//       margin-bottom: 12px;
//       padding-bottom: 4px;
//       border-bottom: 1px solid #000000;
//     }

//     .t7-resume .custom-section-content {
//       font-size: 13px;
//       color: #222222;
//       line-height: 1.45;
//       margin-left: 18px;
//                       text-align: start;

//     }

//     /* Print Styles - EXACT SAME AS SCREEN */
//     @media print {
//       @page {
//         size: A4;
//         margin: 0.5in;
//       }

//    .t7-resume   body {
//         background: white;
//         margin: 0;
//         padding: 0;
//       }

//       .t7-resume  {
//         margin: 0 auto;
//         max-width: 100%;
//         border: none;
//         box-shadow: none;
//       }

//      ..t7-resume .resume-header {
//         border-bottom: 2px solid #000;
//       }

//      .t7-resume .section {
//         page-break-inside: avoid;
//       }

//       .t7-resume .experience-item {
//         page-break-inside: avoid;
//       }
//     }

//     /* Responsive */
//     @media (max-width: 768px) {
//       .t7-resume  {
//         margin: 15px;
//       }

//       .t7-resume .resume-header {
//         padding: 25px 25px 18px 25px;
//       }

//       .t7-resume .resume-main {
//         padding: 20px 25px 30px 25px;
//       }

//       .t7-resume .name {
//         font-size: 26px;
//       }

//       .t7-resume .contact-row {
//         gap: 12px;
//         flex-direction: column;
//         align-items: center;
//         gap: 5px;
//       }

//       .t7-resume .experience-header {
//         flex-direction: column;
//         gap: 4px;
//       }

//       .t7-resume .experience-date {
//         white-space: normal;
//       }

//       .t7-resume .education-date {
//         white-space: normal;
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
//     if (
//       lines.some(
//         (line) => line.trim().startsWith("-") || line.trim().startsWith("•"),
//       )
//     ) {
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
//         <style>${styles}</style>
//       </head>
//       <body>
//         <div class="t7-resume ">
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
//             ${
//               summary
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Professional Summary</h2>
//                 <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- EXPERIENCE -->
//             ${
//               experiences.length > 0
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Experience</h2>
//                 ${experiences
//                   .map((exp) => {
//                     const startFormatted = formatMonthYear(exp.startDate, true);
//                     const endFormatted = exp.endDate
//                       ? formatMonthYear(exp.endDate, true)
//                       : "Present";
//                     return `
//                     <div class="experience-item">
//                       <div class="experience-header">
//                         <div >
//                           <div class="experience-title">${exp.jobTitle || ""}</div>
//                           <div class="experience-company">${exp.employer || ""}${exp.location ? `, ${exp.location}` : ""}</div>
//                         </div>
//                         <div class="experience-date">${startFormatted} — ${endFormatted}</div>
//                       </div>
//                       ${exp.text ? renderDescription(exp.text) : ""}
//                     </div>
//                   `;
//                   })
//                   .join("")}
//               </div>
//             `
//                 : ""
//             }

//             <!-- EDUCATION -->
//             ${
//               educations.length > 0
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Education</h2>
//                 ${educations
//                   .map((edu) => {
//                     const dateStr =
//                       edu.startDate || edu.endDate
//                         ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " — " : ""}${edu.endDate || ""}`
//                         : "";
//                     return `
//                     <div class="education-item">
//                       <div class="education-header">
//                         <div>
//                           <div class="education-school">${edu.schoolname || ""}</div>
//                           ${edu.degree ? `<div class="education-degree">${edu.degree}</div>` : ""}
//                         </div>
//                         ${dateStr ? `<div class="education-date">${dateStr}</div>` : ""}
//                       </div>
//                       ${edu.text ? `<div class="education-description">${renderDescription(edu.text)}</div>` : ""}
//                     </div>
//                   `;
//                   })
//                   .join("")}
//               </div>
//             `
//                 : ""
//             }

//             <!-- SKILLS -->
//             ${
//               skills.length > 0
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Skills</h2>
//                 <div class="skills-container">
//                   ${skills
//                     .map(
//                       (s) => `
//                     <div class="skill-item">${s.skill || ""}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- LANGUAGES -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.languages) &&
//               finalize.languages.some((l) => l.name?.trim())
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Languages</h2>
//                 <div class="skills-container">
//                   ${finalize.languages
//                     .filter((l) => l.name?.trim())
//                     .map(
//                       (l) => `
//                     <div class="skill-item">${l.name}${l.level ? ` — ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- CERTIFICATIONS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.certificationsAndLicenses) &&
//               finalize.certificationsAndLicenses.some((c) =>
//                 c.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Certifications</h2>
//                 <div class="additional-content">
//                   ${finalize.certificationsAndLicenses
//                     .filter((c) => c.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (c) => `
//                     <div class="additional-item">${c.name.replace(/<[^>]*>/g, "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- AWARDS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.awardsAndHonors) &&
//               finalize.awardsAndHonors.some((a) =>
//                 a.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Awards & Honors</h2>
//                 <div class="additional-content">
//                   ${finalize.awardsAndHonors
//                     .filter((a) => a.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (a) => `
//                     <div class="additional-item">${a.name.replace(/<[^>]*>/g, "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- INTERESTS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.hobbiesAndInterests) &&
//               finalize.hobbiesAndInterests.some((h) =>
//                 h.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Interests</h2>
//                 <div class="additional-content">
//                   ${finalize.hobbiesAndInterests
//                     .filter((h) => h.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (h) => `
//                     <div class="additional-item">${h.name.replace(/<[^>]*>/g, "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- REFERENCES -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.references) &&
//               finalize.references.some((r) =>
//                 r.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">References</h2>
//                 <div class="additional-content">
//                   ${finalize.references
//                     .filter((r) => r.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (r) => `
//                     <div class="additional-item">${r.name.replace(/<[^>]*>/g, "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- CUSTOM SECTIONS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.customSection) &&
//               finalize.customSection.some(
//                 (s) => s?.name?.trim() || s?.description?.trim(),
//               )
//                 ? `
//               <div class="section">
//                 ${finalize.customSection
//                   .filter((s) => s?.name?.trim() || s?.description?.trim())
//                   .map(
//                     (s) => `
//                   <div class="custom-section">
//                     ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
//                     ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
//                   </div>
//                 `,
//                   )
//                   .join("")}
//               </div>
//             `
//                 : ""
//             }
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
//             style={{
//               backgroundColor: "#000000",
//               color: "#ffffff",
//               padding: "12px 24px",
//               fontSize: "14px",
//               fontWeight: "600",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontFamily: "inherit",
//             }}
//           >
//             Download Resume
//           </button>
//         </div>
//       )}

//       {/* Resume Preview - EXACT SAME AS DOWNLOAD */}
//       <div
//         className={`t7-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
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
//           <div className="contact-row">
//             {contact?.email && (
//               <div className="contact-item">{contact.email}</div>
//             )}
//             {contact?.phone && (
//               <div className="contact-item">{contact.phone}</div>
//             )}
//           </div>
//           {addressParts.length > 0 && (
//             <div className="address">{addressParts.join(" | ")}</div>
//           )}
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

//         {/* MAIN CONTENT */}
//         <div className="resume-main">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section">
//               <h2 className="section-title">Professional Summary</h2>
//               <div
//                 className="summary-text"
//                 dangerouslySetInnerHTML={{
//                   __html: summary.replace(/\n/g, "<br>"),
//                 }}
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
//                     <div>
//                       <div className="experience-title">{exp.jobTitle}</div>
//                       <div className="experience-company">
//                         {exp.employer}
//                         {exp.location && `, ${exp.location}`}
//                       </div>
//                     </div>
//                     <div className="experience-date">
//                       <MonthYearDisplay value={exp.startDate} shortYear /> —{" "}
//                       {exp.endDate ? (
//                         <MonthYearDisplay value={exp.endDate} shortYear />
//                       ) : (
//                         "Present"
//                       )}
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
//                     <div>
//                       <div className="education-school">{edu.schoolname}</div>
//                       {edu.degree && (
//                         <div className="education-degree">{edu.degree}</div>
//                       )}
//                     </div>
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="education-date">
//                         {edu.startDate || ""}
//                         {edu.startDate && edu.endDate && " — "}
//                         {edu.endDate || ""}
//                       </div>
//                     )}
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
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CERTIFICATIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some((c) =>
//               c.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Certifications</h2>
//                 <div className="additional-content">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* AWARDS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.awardsAndHonors) &&
//             finalize.awardsAndHonors.some((a) =>
//               a.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Awards & Honors</h2>
//                 <div className="additional-content">
//                   {finalize.awardsAndHonors.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* INTERESTS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some((h) =>
//               h.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Interests</h2>
//                 <div className="additional-content">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* REFERENCES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.references) &&
//             finalize.references.some((r) =>
//               r.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">References</h2>
//                 <div className="additional-content">
//                   {finalize.references.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim(),
//             ) && (
//               <div className="section">
//                 {finalize.customSection.map(
//                   (section, i) =>
//                     (section?.name?.trim() || section?.description?.trim()) && (
//                       <div key={i} className="custom-section">
//                         {section.name && (
//                           <h3 className="custom-section-title">
//                             {section.name}
//                           </h3>
//                         )}
//                         {section.description && (
//                           <div
//                             className="custom-section-content"
//                             dangerouslySetInnerHTML={{
//                               __html: section.description,
//                             }}
//                           />
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateSeven;

// ─── Professional Black & White Single Column Resume Template ───────────
// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { AllData, ResumeProps } from "@/app/types";

// const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);

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
//       // Categorized Skills - Horizontal chips with category titles
//       return (
//         <div className="section">
//           <h2 className="section-title">Skills</h2>
//           <div className="skills-categorized">
//             {skills.map((category: any) => (
//               <div key={category.id} className="skill-category">
//                 <div className="skill-category-title">{category.title}</div>
//                 <div className="skills-chips">
//                   {category.skills.map((skill: any) => (
//                     <span key={skill.id} className="skill-chip">
//                       {skill.name}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     } else {
//       // Simple Skills - Vertical list with bullets
//       return (
//         <div className="section">
//           <h2 className="section-title">Skills</h2>
//           <div className="skills-list">
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
//           <div key={project.id || index} className="project-item">
//             <div className="project-header">
//               <div className="project-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="project-description"
//                 dangerouslySetInnerHTML={{ __html: project.description }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — PROFESSIONAL BLACK & WHITE
//   ====================================================== */
//   const styles = `
//     .t7-resume body {
//       margin: 0;
//       padding: 0;
//     }

//     .t7-resume {
//       width: 210mm;
//       margin: 30px auto;
//       background: white;
//       border: 1px solid #e0e0e0;
//     }

//     .t7-resume.is-preview {
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
//     .t7-resume .resume-header {
//       padding: 40px 50px 25px 50px;
//       border-bottom: 2px solid #000000;
//       text-align: center;
//     }

//     .t7-resume .name {
//       font-size: 32px;
//       font-weight: 700;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       margin-bottom: 8px;
//       color: #000000;
//     }

//     .t7-resume .job-title {
//       font-size: 16px;
//       font-weight: 500;
//       letter-spacing: 1px;
//       color: #333333;
//       margin-bottom: 16px;
//       padding-bottom: 12px;
//       border-bottom: 1px solid #cccccc;
//     }

//     .t7-resume .contact-row {
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 20px;
//       font-size: 12px;
//       color: #444444;
//       margin-bottom: 8px;
//     }

//     .t7-resume .contact-item {
//       display: inline-flex;
//       align-items: center;
//       gap: 5px;
//     }

//     .t7-resume .address {
//       font-size: 12px;
//       color: #444444;
//       margin-top: 6px;
//     }

//     .t7-resume .links {
//       margin-top: 10px;
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 16px;
//     }

//     .t7-resume .link-item {
//       color: #000000;
//       text-decoration: none;
//       font-size: 12px;
//       border-bottom: 1px dotted #999;
//     }

//     /* Main Content */
//     .t7-resume .resume-main {
//       padding: 30px 50px 45px 50px;
//     }

//     /* Section Styles */
//     .t7-resume .section {
//       margin-bottom: 25px;
//     }

//     .t7-resume .section:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .section-title {
//       font-size: 16px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       color: #000000;
//       margin-bottom: 12px;
//       padding-bottom: 4px;
//       border-bottom: 1px solid #000000;
//     }

//     /* Summary */
//     .t7-resume .summary-text {
//       font-size: 13px;
//       line-height: 1.5;
//       color: #222222;
//       text-align: justify;
//     }

//     /* Experience Items */
//     .t7-resume .experience-item {
//       margin-bottom: 20px;
//     }

//     .t7-resume .experience-item:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t7-resume .experience-title {
//       font-size: 15px;
//       font-weight: 700;
//       color: #000000;
//       text-align: start;
//     }

//     .t7-resume .experience-company {
//       font-size: 13px;
//       font-weight: 500;
//       font-style: italic;
//       color: #333333;
//       margin-top: 2px;
//       text-align: start;
//     }

//     .t7-resume .experience-date {
//       font-size: 12px;
//       color: #555555;
//       font-weight: normal;
//       white-space: nowrap;
//     }

//     .t7-resume .experience-description {
//       margin-top: 8px;
//       padding-left: 0;
//       text-align: start;
//     }

//     /* Bullet points */
//     .t7-resume .experience-description ul,
//     .t7-resume .education-description ul {
//       list-style-type: none;
//       padding-left: 0;
//       text-align: start;
//     }

//     .t7-resume .experience-description li,
//     .t7-resume .education-description li {
//       position: relative;
//       padding-left: 18px;
//       margin-bottom: 5px;
//       font-size: 13px;
//       color: #222222;
//       line-height: 1.45;
//       text-align: start;
//     }

//     .t7-resume .experience-description li::before,
//     .t7-resume .education-description li::before {
//       content: "•";
//       position: absolute;
//       left: 4px;
//       color: #000000;
//       font-size: 12px;
//     }

//     /* Education Items */
//     .t7-resume .education-item {
//       margin-bottom: 18px;
//     }

//     .t7-resume .education-item:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 5px;
//     }

//     .t7-resume .education-school {
//       font-size: 15px;
//       font-weight: 700;
//       color: #000000;
//       text-align: start;
//     }

//     .t7-resume .education-degree {
//       font-size: 13px;
//       color: #333333;
//       margin-top: 2px;
//       text-align: start;
//     }

//     .t7-resume .education-date {
//       font-size: 12px;
//       color: #555555;
//       white-space: nowrap;
//     }

//     .t7-resume .education-description {
//       margin-top: 6px;
//       text-align: start;
//     }

//     /* SIMPLE SKILLS - Vertical List with Bullets */
//     .t7-resume .skills-list {
//       margin-top: 8px;
//     }

//     .t7-resume .skill-item {
//       font-size: 13px;
//       color: #222222;
//       position: relative;
//       padding-left: 18px;
//       margin-bottom: 6px;
//     }

//     .t7-resume .skill-item::before {
//       content: "•";
//       position: absolute;
//       left: 4px;
//       color: #000000;
//     }

//     /* CATEGORIZED SKILLS - Horizontal Chips */
//     .t7-resume .skills-categorized {
//       margin-top: 8px;
//     }

//     .t7-resume .skill-category {
//       margin-bottom: 16px;
//     }

//     .t7-resume .skill-category:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .skill-category-title {
//       font-size: 14px;
//       font-weight: 600;
//       color: #000000;
//       margin-bottom: 8px;
//       padding-bottom: 2px;
//       border-bottom: 1px solid #e0e0e0;
//     }

//     .t7-resume .skills-chips {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 8px;
//     }

//     .t7-resume .skill-chip {
//       display: inline-block;
//       font-size: 12px;
//       color: #222222;
//       background-color: #f5f5f5;
//       padding: 4px 12px;
//       border-radius: 20px;
//       border: 1px solid #e0e0e0;
//     }

//     /* PROJECTS */
//     .t7-resume .project-item {
//       margin-bottom: 20px;
//     }

//     .t7-resume .project-item:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t7-resume .project-title {
//       font-size: 15px;
//       font-weight: 700;
//       color: #000000;
//     }

//     .t7-resume .project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .t7-resume .project-link {
//       font-size: 11px;
//       color: #555555;
//       text-decoration: underline;
//     }

//     .t7-resume .project-tech-stack {
//       font-size: 12px;
//       color: #555555;
//       margin: 4px 0;
//     }

//     .t7-resume .project-description {
//       margin-top: 8px;
//       font-size: 13px;
//       color: #222222;
//       line-height: 1.45;
//       text-align: start;
//     }

//     /* Additional content */
//     .t7-resume .additional-content {
//       margin-top: 8px;
//     }

//     .t7-resume .additional-item {
//       font-size: 13px;
//       color: #222222;
//       margin-bottom: 6px;
//       position: relative;
//       padding-left: 18px;
//       text-align: start;
//     }

//     .t7-resume .additional-item::before {
//       content: "•";
//       position: absolute;
//       left: 4px;
//       color: #000000;
//     }

//     /* Custom Sections */
//     .t7-resume .custom-section {
//       margin-bottom: 16px;
//     }

//     .t7-resume .custom-section:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .custom-section-title {
//       font-size: 16px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       color: #000000;
//       margin-bottom: 12px;
//       padding-bottom: 4px;
//       border-bottom: 1px solid #000000;
//     }

//     .t7-resume .custom-section-content {
//       font-size: 13px;
//       color: #222222;
//       line-height: 1.45;
//       margin-left: 18px;
//       text-align: start;
//     }

//     /* Print Styles */
//     @media print {
//       @page {
//         size: A4;
//         margin: 0.5in;
//       }

//       .t7-resume body {
//         background: white;
//         margin: 0;
//         padding: 0;
//       }

//       .t7-resume {
//         margin: 0 auto;
//         max-width: 100%;
//         border: none;
//         box-shadow: none;
//       }

//       .t7-resume .resume-header {
//         border-bottom: 2px solid #000;
//       }

//       .t7-resume .section {
//         page-break-inside: avoid;
//       }

//       .t7-resume .experience-item {
//         page-break-inside: avoid;
//       }
//     }

//     /* Responsive */
//     @media (max-width: 768px) {
//       .t7-resume {
//         margin: 15px;
//       }

//       .t7-resume .resume-header {
//         padding: 25px 25px 18px 25px;
//       }

//       .t7-resume .resume-main {
//         padding: 20px 25px 30px 25px;
//       }

//       .t7-resume .name {
//         font-size: 26px;
//       }

//       .t7-resume .contact-row {
//         gap: 12px;
//         flex-direction: column;
//         align-items: center;
//         gap: 5px;
//       }

//       .t7-resume .experience-header {
//         flex-direction: column;
//         gap: 4px;
//       }

//       .t7-resume .experience-date {
//         white-space: normal;
//       }

//       .t7-resume .education-date {
//         white-space: normal;
//       }

//       .t7-resume .project-header {
//         flex-direction: column;
//         gap: 4px;
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
//     if (
//       lines.some(
//         (line) => line.trim().startsWith("-") || line.trim().startsWith("•"),
//       )
//     ) {
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
//             <div class="skills-categorized">
//               ${skills.map((category: any) => `
//                 <div class="skill-category">
//                   <div class="skill-category-title">${category.title}</div>
//                   <div class="skills-chips">
//                     ${category.skills.map((skill: any) => `
//                       <span class="skill-chip">${skill.name}</span>
//                     `).join("")}
//                   </div>
//                 </div>
//               `).join("")}
//             </div>
//           </div>
//         `;
//       } else {
//         return `
//           <div class="section">
//             <h2 class="section-title">Skills</h2>
//             <div class="skills-list">
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
//             <div class="project-item">
//               <div class="project-header">
//                 <div class="project-title">${project.title || ""}</div>
//                 <div class="project-links">
//                   ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                 </div>
//               </div>
//               ${project.techStack && project.techStack.length > 0 ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               ` : ""}
//               ${project.description ? `
//                 <div class="project-description">${project.description}</div>
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
//         <style>${styles}</style>
//       </head>
//       <body>
//         <div class="t7-resume">
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
//                 <h2 class="section-title">Professional Summary</h2>
//                 <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//               </div>
//             ` : ""}

//             <!-- EXPERIENCE -->
//             ${experiences.length > 0 ? `
//               <div class="section">
//                 <h2 class="section-title">Experience</h2>
//                 ${experiences.map((exp) => {
//                   const startFormatted = formatMonthYear(exp.startDate, true);
//                   const endFormatted = exp.endDate
//                     ? formatMonthYear(exp.endDate, true)
//                     : "Present";
//                   return `
//                     <div class="experience-item">
//                       <div class="experience-header">
//                         <div>
//                           <div class="experience-title">${exp.jobTitle || ""}</div>
//                           <div class="experience-company">${exp.employer || ""}${exp.location ? `, ${exp.location}` : ""}</div>
//                         </div>
//                         <div class="experience-date">${startFormatted} — ${endFormatted}</div>
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
//                         <div>
//                           <div class="education-school">${edu.schoolname || ""}</div>
//                           ${edu.degree ? `<div class="education-degree">${edu.degree}</div>` : ""}
//                         </div>
//                         ${dateStr ? `<div class="education-date">${dateStr}</div>` : ""}
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
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name?.trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Languages</h2>
//                 <div class="skills-list">
//                   ${finalize.languages.filter((l) => l.name?.trim()).map((l) => `
//                     <div class="skill-item">${l.name}${l.level ? ` — ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</div>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- CERTIFICATIONS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((c) => c.name?.replace(/<[^>]*>/g, "").trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Certifications</h2>
//                 <div class="additional-content">
//                   ${finalize.certificationsAndLicenses.filter((c) => c.name?.replace(/<[^>]*>/g, "").trim()).map((c) => `
//                     <div class="additional-item">${c.name.replace(/<[^>]*>/g, "")}</div>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- AWARDS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some((a) => a.name?.replace(/<[^>]*>/g, "").trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Awards & Honors</h2>
//                 <div class="additional-content">
//                   ${finalize.awardsAndHonors.filter((a) => a.name?.replace(/<[^>]*>/g, "").trim()).map((a) => `
//                     <div class="additional-item">${a.name.replace(/<[^>]*>/g, "")}</div>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- INTERESTS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((h) => h.name?.replace(/<[^>]*>/g, "").trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Interests</h2>
//                 <div class="additional-content">
//                   ${finalize.hobbiesAndInterests.filter((h) => h.name?.replace(/<[^>]*>/g, "").trim()).map((h) => `
//                     <div class="additional-item">${h.name.replace(/<[^>]*>/g, "")}</div>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- REFERENCES -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) && finalize.references.some((r) => r.name?.replace(/<[^>]*>/g, "").trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">References</h2>
//                 <div class="additional-content">
//                   ${finalize.references.filter((r) => r.name?.replace(/<[^>]*>/g, "").trim()).map((r) => `
//                     <div class="additional-item">${r.name.replace(/<[^>]*>/g, "")}</div>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- CUSTOM SECTIONS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) ? `
//               <div class="section">
//                 ${finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
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
//             style={{
//               backgroundColor: "#000000",
//               color: "#ffffff",
//               padding: "12px 24px",
//               fontSize: "14px",
//               fontWeight: "600",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontFamily: "inherit",
//             }}
//           >
//             Download Resume
//           </button>
//         </div>
//       )}

//       {/* Resume Preview */}
//       <div
//         className={`t7-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
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
//           <div className="contact-row">
//             {contact?.email && (
//               <div className="contact-item">{contact.email}</div>
//             )}
//             {contact?.phone && (
//               <div className="contact-item">{contact.phone}</div>
//             )}
//           </div>
//           {addressParts.length > 0 && (
//             <div className="address">{addressParts.join(" | ")}</div>
//           )}
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

//         {/* MAIN CONTENT */}
//         <div className="resume-main">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section">
//               <h2 className="section-title">Professional Summary</h2>
//               <div
//                 className="summary-text"
//                 dangerouslySetInnerHTML={{
//                   __html: summary.replace(/\n/g, "<br>"),
//                 }}
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
//                     <div>
//                       <div className="experience-title">{exp.jobTitle}</div>
//                       <div className="experience-company">
//                         {exp.employer}
//                         {exp.location && `, ${exp.location}`}
//                       </div>
//                     </div>
//                     <div className="experience-date">
//                       <MonthYearDisplay value={exp.startDate} shortYear /> —{" "}
//                       {exp.endDate ? (
//                         <MonthYearDisplay value={exp.endDate} shortYear />
//                       ) : (
//                         "Present"
//                       )}
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
//                     <div>
//                       <div className="education-school">{edu.schoolname}</div>
//                       {edu.degree && (
//                         <div className="education-degree">{edu.degree}</div>
//                       )}
//                     </div>
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="education-date">
//                         {edu.startDate || ""}
//                         {edu.startDate && edu.endDate && " — "}
//                         {edu.endDate || ""}
//                       </div>
//                     )}
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
//                 <div className="skills-list">
//                   {finalize.languages.map(
//                     (lang, i) =>
//                       lang.name?.trim() && (
//                         <div key={i} className="skill-item">
//                           {lang.name}
//                           {lang.level &&
//                             ` — ${Math.round((Number(lang.level) / 4) * 100)}%`}
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CERTIFICATIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some((c) =>
//               c.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Certifications</h2>
//                 <div className="additional-content">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* AWARDS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.awardsAndHonors) &&
//             finalize.awardsAndHonors.some((a) =>
//               a.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Awards & Honors</h2>
//                 <div className="additional-content">
//                   {finalize.awardsAndHonors.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* INTERESTS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some((h) =>
//               h.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Interests</h2>
//                 <div className="additional-content">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* REFERENCES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.references) &&
//             finalize.references.some((r) =>
//               r.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">References</h2>
//                 <div className="additional-content">
//                   {finalize.references.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim(),
//             ) && (
//               <div className="section">
//                 {finalize.customSection.map(
//                   (section, i) =>
//                     (section?.name?.trim() || section?.description?.trim()) && (
//                       <div key={i} className="custom-section">
//                         {section.name && (
//                           <h3 className="custom-section-title">
//                             {section.name}
//                           </h3>
//                         )}
//                         {section.description && (
//                           <div
//                             className="custom-section-content"
//                             dangerouslySetInnerHTML={{
//                               __html: section.description,
//                             }}
//                           />
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateSeven;

// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { AllData, ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);

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
//       // Categorized Skills - Horizontal chips with category titles
//       return (
//         <div className="section">
//           <h2 className="section-title">Skills</h2>
//           <div className="skills-categorized">
//             {skills.map((category: any) => (
//               <div key={category.id} className="skill-category">
//                 <div className="skill-category-title">{category.title}</div>
//                 <div className="skills-chips">
//                   {category.skills.map((skill: any) => (
//                     <span key={skill.id} className="skill-chip">
//                       {skill.name}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     } else {
//       // Simple Skills - Vertical list with bullets
//       return (
//         <div className="section">
//           <h2 className="section-title">Skills</h2>
//           <div className="skills-list">
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
//           <div key={project.id || index} className="project-item">
//             <div className="project-header">
//               <div className="project-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="project-description"
//                 dangerouslySetInnerHTML={{ __html: project.description }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — PROFESSIONAL BLACK & WHITE
//   ====================================================== */
//   const styles = `
//     .t7-resume body {
//       margin: 0;
//       padding: 0;
//     }

//     .t7-resume {
//       width: 210mm;
//       margin: 30px auto;
//       background: white;
//       border: 1px solid #e0e0e0;
//           min-height: 297mm;

//     }

//     .t7-resume.is-preview {
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
//     .t7-resume .resume-header {
//       padding: 40px 50px 25px 50px;
//       border-bottom: 2px solid #000000;
//       text-align: center;
//     }

//     .t7-resume .name {
//       font-size: 32px;
//       font-weight: 700;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       margin-bottom: 8px;
//       color: #000000;
//     }

//     .t7-resume .job-title {
//       font-size: 16px;
//       font-weight: 500;
//       letter-spacing: 1px;
//       color: #333333;
//       margin-bottom: 16px;
//       padding-bottom: 12px;
//       border-bottom: 1px solid #cccccc;
//     }

//     .t7-resume .contact-row {
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 20px;
//       font-size: 12px;
//       color: #444444;
//       margin-bottom: 8px;
//     }

//     .t7-resume .contact-item {
//       display: inline-flex;
//       align-items: center;
//       gap: 5px;
//     }

//     .t7-resume .address {
//       font-size: 12px;
//       color: #444444;
//       margin-top: 6px;
//     }

//     .t7-resume .links {
//       margin-top: 10px;
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 16px;
//     }

//     .t7-resume .link-item {
//       color: #000000;
//       text-decoration: none;
//       font-size: 12px;
//       border-bottom: 1px dotted #999;
//     }

//     /* Main Content */
//     .t7-resume .resume-main {
//       padding: 30px 50px 45px 50px;
//     }

//     /* Section Styles */
//     .t7-resume .section {
//       margin-bottom: 25px;
//     }

//     .t7-resume .section:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .section-title {
//       font-size: 16px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       color: #000000;
//       margin-bottom: 12px;
//       padding-bottom: 4px;
//       border-bottom: 1px solid #000000;
//     }

//     /* Education Grade */
//     .t7-resume .education-grade {
//       font-size: 12px;
//       color: #555555;
//       margin-top: 4px;
//       font-weight: 500;
//       text-align: start;
//     }

//     /* Summary */
//     .t7-resume .summary-text {
//       font-size: 13px;
//       line-height: 1.5;
//       color: #222222;
//       text-align: justify;
//     }

//     /* Experience Items */
//     .t7-resume .experience-item {
//       margin-bottom: 20px;
//     }

//     .t7-resume .experience-item:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t7-resume .experience-title {
//       font-size: 15px;
//       font-weight: 700;
//       color: #000000;
//       text-align: start;
//     }

//     .t7-resume .experience-company {
//       font-size: 13px;
//       font-weight: 500;
//       font-style: italic;
//       color: #333333;
//       margin-top: 2px;
//       text-align: start;
//     }

//     .t7-resume .experience-date {
//       font-size: 12px;
//       color: #555555;
//       font-weight: normal;
//       white-space: nowrap;
//     }

//     .t7-resume .experience-description {
//       margin-top: 8px;
//       padding-left: 0;
//       text-align: start;
//     }

//     /* Bullet points */
//     .t7-resume .experience-description ul,
//     .t7-resume .education-description ul {
//       list-style-type: none;
//       padding-left: 0;
//       text-align: start;
//     }

//     .t7-resume .experience-description li,
//     .t7-resume .education-description li {
//       position: relative;
//       padding-left: 18px;
//       margin-bottom: 5px;
//       font-size: 13px;
//       color: #222222;
//       line-height: 1.45;
//       text-align: start;
//     }

//     .t7-resume .experience-description li::before,
//     .t7-resume .education-description li::before {
//       content: "•";
//       position: absolute;
//       left: 4px;
//       color: #000000;
//       font-size: 12px;
//     }

//     /* Education Items */
//     .t7-resume .education-item {
//       margin-bottom: 18px;
//     }

//     .t7-resume .education-item:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 5px;
//     }

//     .t7-resume .education-school {
//       font-size: 15px;
//       font-weight: 700;
//       color: #000000;
//       text-align: start;
//     }

//     .t7-resume .education-degree {
//       font-size: 13px;
//       color: #333333;
//       margin-top: 2px;
//       text-align: start;
//     }

//     .t7-resume .education-date {
//       font-size: 12px;
//       color: #555555;
//       white-space: nowrap;
//     }

//     .t7-resume .education-description {
//       margin-top: 6px;
//       text-align: start;
//     }

//     /* SIMPLE SKILLS - Vertical List with Bullets */
//     .t7-resume .skills-list {
//       margin-top: 8px;
//     }

//     .t7-resume .skill-item {
//       font-size: 13px;
//       color: #222222;
//       position: relative;
//       padding-left: 18px;
//       margin-bottom: 6px;
//     }

//     .t7-resume .skill-item::before {
//       content: "•";
//       position: absolute;
//       left: 4px;
//       color: #000000;
//     }

//     /* CATEGORIZED SKILLS - Horizontal Chips */
//     .t7-resume .skills-categorized {
//       margin-top: 8px;
//     }

//     .t7-resume .skill-category {
//       margin-bottom: 16px;
//     }

//     .t7-resume .skill-category:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .skill-category-title {
//       font-size: 14px;
//       font-weight: 600;
//       color: #000000;
//       margin-bottom: 8px;
//       padding-bottom: 2px;
//       border-bottom: 1px solid #e0e0e0;
//     }

//     .t7-resume .skills-chips {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 8px;
//     }

//     .t7-resume .skill-chip {
//       display: inline-block;
//       font-size: 12px;
//       color: #222222;
//       background-color: #f5f5f5;
//       padding: 4px 12px;
//       border-radius: 20px;
//       border: 1px solid #e0e0e0;
//     }

//     /* PROJECTS */
//     .t7-resume .project-item {
//       margin-bottom: 20px;
//     }

//     .t7-resume .project-item:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t7-resume .project-title {
//       font-size: 15px;
//       font-weight: 700;
//       color: #000000;
//     }

//     .t7-resume .project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .t7-resume .project-link {
//       font-size: 11px;
//       color: #555555;
//       text-decoration: underline;
//     }

//     .t7-resume .project-tech-stack {
//       font-size: 12px;
//       color: #555555;
//       margin: 4px 0;
//     }

//     .t7-resume .project-description {
//       margin-top: 8px;
//       font-size: 13px;
//       color: #222222;
//       line-height: 1.45;
//       text-align: start;
//     }

//     /* Additional content */
//     .t7-resume .additional-content {
//       margin-top: 8px;
//     }

//     .t7-resume .additional-item {
//       font-size: 13px;
//       color: #222222;
//       margin-bottom: 6px;
//       position: relative;
//       padding-left: 18px;
//       text-align: start;
//     }

//     .t7-resume .additional-item::before {
//       content: "•";
//       position: absolute;
//       left: 4px;
//       color: #000000;
//     }

//     /* Custom Sections */
//     .t7-resume .custom-section {
//       margin-bottom: 16px;
//     }

//     .t7-resume .custom-section:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .custom-section-title {
//       font-size: 16px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       color: #000000;
//       margin-bottom: 12px;
//       padding-bottom: 4px;
//       border-bottom: 1px solid #000000;
//     }

//     .t7-resume .custom-section-content {
//       font-size: 13px;
//       color: #222222;
//       line-height: 1.45;
//       margin-left: 18px;
//       text-align: start;
//     }

//     /* Print Styles */
//     @media print {
//       @page {
//         size: A4;
//         margin: 0.5in;
//       }

//       .t7-resume body {
//         background: white;
//         margin: 0;
//         padding: 0;
//       }

//       .t7-resume {
//         margin: 0 auto;
//         max-width: 100%;
//         border: none;
//         box-shadow: none;
//       }

//       .t7-resume .resume-header {
//         border-bottom: 2px solid #000;
//       }

//       .t7-resume .section {
//         page-break-inside: avoid;
//       }

//       .t7-resume .experience-item {
//         page-break-inside: avoid;
//       }
//     }

//     /* Responsive */
//     @media (max-width: 768px) {
//       .t7-resume {
//         margin: 15px;
//       }

//       .t7-resume .resume-header {
//         padding: 25px 25px 18px 25px;
//       }

//       .t7-resume .resume-main {
//         padding: 20px 25px 30px 25px;
//       }

//       .t7-resume .name {
//         font-size: 26px;
//       }

//       .t7-resume .contact-row {
//         gap: 12px;
//         flex-direction: column;
//         align-items: center;
//         gap: 5px;
//       }

//       .t7-resume .experience-header {
//         flex-direction: column;
//         gap: 4px;
//       }

//       .t7-resume .experience-date {
//         white-space: normal;
//       }

//       .t7-resume .education-date {
//         white-space: normal;
//       }

//       .t7-resume .project-header {
//         flex-direction: column;
//         gap: 4px;
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
//     if (
//       lines.some(
//         (line) => line.trim().startsWith("-") || line.trim().startsWith("•"),
//       )
//     ) {
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
//             <div class="skills-categorized">
//               ${skills.map((category: any) => `
//                 <div class="skill-category">
//                   <div class="skill-category-title">${category.title}</div>
//                   <div class="skills-chips">
//                     ${category.skills.map((skill: any) => `
//                       <span class="skill-chip">${skill.name}</span>
//                     `).join("")}
//                   </div>
//                 </div>
//               `).join("")}
//             </div>
//           </div>
//         `;
//       } else {
//         return `
//           <div class="section">
//             <h2 class="section-title">Skills</h2>
//             <div class="skills-list">
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
//             <div class="project-item">
//               <div class="project-header">
//                 <div class="project-title">${project.title || ""}</div>
//                 <div class="project-links">
//                   ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                 </div>
//               </div>
//               ${project.techStack && project.techStack.length > 0 ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//               ` : ""}
//               ${project.description ? `
//                 <div class="project-description">${project.description}</div>
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
//         <style>${styles}</style>
//       </head>
//       <body>
//         <div class="t7-resume">
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
//                 <h2 class="section-title">Professional Summary</h2>
//                 <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
//               </div>
//             ` : ""}

//             <!-- EXPERIENCE -->
//             ${experiences.length > 0 ? `
//               <div class="section">
//                 <h2 class="section-title">Experience</h2>
//                 ${experiences.map((exp) => {
//                   const startFormatted = formatMonthYear(exp.startDate, true);
//                   const endFormatted = exp.endDate
//                     ? formatMonthYear(exp.endDate, true)
//                     : "Present";
//                   return `
//                     <div class="experience-item">
//                       <div class="experience-header">
//                         <div>
//                           <div class="experience-title">${exp.jobTitle || ""}</div>
//                           <div class="experience-company">${exp.employer || ""}${exp.location ? `, ${exp.location}` : ""}</div>
//                         </div>
//                         <div class="experience-date">${startFormatted} — ${endFormatted}</div>
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
//                         <div>
//                           <div class="education-school">${edu.schoolname || ""}</div>
//                           ${edu.degree ? `<div class="education-degree">${edu.degree}</div>` : ""}
//                           ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                         </div>
//                         ${dateStr ? `<div class="education-date">${dateStr}</div>` : ""}
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
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l) => l.name?.trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Languages</h2>
//                 <div class="skills-list">
//                   ${finalize.languages.filter((l) => l.name?.trim()).map((l) => `
//                     <div class="skill-item">${l.name}${l.level ? ` — ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</div>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- CERTIFICATIONS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((c) => c.name?.replace(/<[^>]*>/g, "").trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Certifications</h2>
//                 <div class="additional-content">
//                   ${finalize.certificationsAndLicenses.filter((c) => c.name?.replace(/<[^>]*>/g, "").trim()).map((c) => `
//                     <div class="additional-item">${c.name.replace(/<[^>]*>/g, "")}</div>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- AWARDS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some((a) => a.name?.replace(/<[^>]*>/g, "").trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Awards & Honors</h2>
//                 <div class="additional-content">
//                   ${finalize.awardsAndHonors.filter((a) => a.name?.replace(/<[^>]*>/g, "").trim()).map((a) => `
//                     <div class="additional-item">${a.name.replace(/<[^>]*>/g, "")}</div>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- INTERESTS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((h) => h.name?.replace(/<[^>]*>/g, "").trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">Interests</h2>
//                 <div class="additional-content">
//                   ${finalize.hobbiesAndInterests.filter((h) => h.name?.replace(/<[^>]*>/g, "").trim()).map((h) => `
//                     <div class="additional-item">${h.name.replace(/<[^>]*>/g, "")}</div>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- REFERENCES -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) && finalize.references.some((r) => r.name?.replace(/<[^>]*>/g, "").trim()) ? `
//               <div class="section">
//                 <h2 class="section-title">References</h2>
//                 <div class="additional-content">
//                   ${finalize.references.filter((r) => r.name?.replace(/<[^>]*>/g, "").trim()).map((r) => `
//                     <div class="additional-item">${r.name.replace(/<[^>]*>/g, "")}</div>
//                   `).join("")}
//                 </div>
//               </div>
//             ` : ""}

//             <!-- CUSTOM SECTIONS -->
//             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) ? `
//               <div class="section">
//                 ${finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
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

//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//   return (
//     <div style={{ textAlign: "center", marginTop: 0 }}>

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
//       <div
//         className={`t7-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
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
//           <div className="contact-row">
//             {contact?.email && (
//               <div className="contact-item">{contact.email}</div>
//             )}
//             {contact?.phone && (
//               <div className="contact-item">{contact.phone}</div>
//             )}
//             {formattedDob && (
//               <div className="contact-item"> {formattedDob}</div>
//             )}
//           </div>
//           {addressParts.length > 0 && (
//             <div className="address">{addressParts.join(" | ")}</div>
//           )}
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
//             {githubUrl && (
//               <a
//                 href={
//                   githubUrl.startsWith("http")
//                     ? githubUrl
//                     : `https://${githubUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 GitHub
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

//         {/* MAIN CONTENT */}
//         <div className="resume-main">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section">
//               <h2 className="section-title">Professional Summary</h2>
//               <div
//                 className="summary-text"
//                 dangerouslySetInnerHTML={{
//                   __html: summary.replace(/\n/g, "<br>"),
//                 }}
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
//                     <div>
//                       <div className="experience-title">{exp.jobTitle}</div>
//                       <div className="experience-company">
//                         {exp.employer}
//                         {exp.location && `, ${exp.location}`}
//                       </div>
//                     </div>
//                     <div className="experience-date">
//                       <MonthYearDisplay value={exp.startDate} shortYear /> —{" "}
//                       {exp.endDate ? (
//                         <MonthYearDisplay value={exp.endDate} shortYear />
//                       ) : (
//                         "Present"
//                       )}
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
//                       <div>
//                         <div className="education-school">{edu.schoolname}</div>
//                         {edu.degree && (
//                           <div className="education-degree">{edu.degree}</div>
//                         )}
//                         {formattedGrade && (
//                           <div className="education-grade">{formattedGrade}</div>
//                         )}
//                       </div>
//                       {(edu.startDate || edu.endDate) && (
//                         <div className="education-date">
//                           {edu.startDate || ""}
//                           {edu.startDate && edu.endDate && " — "}
//                           {edu.endDate || ""}
//                         </div>
//                       )}
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
//                 <div className="skills-list">
//                   {finalize.languages.map(
//                     (lang, i) =>
//                       lang.name?.trim() && (
//                         <div key={i} className="skill-item">
//                           {lang.name}
//                           {lang.level &&
//                             ` — ${Math.round((Number(lang.level) / 4) * 100)}%`}
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CERTIFICATIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some((c) =>
//               c.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Certifications</h2>
//                 <div className="additional-content">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* AWARDS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.awardsAndHonors) &&
//             finalize.awardsAndHonors.some((a) =>
//               a.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Awards & Honors</h2>
//                 <div className="additional-content">
//                   {finalize.awardsAndHonors.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* INTERESTS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some((h) =>
//               h.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Interests</h2>
//                 <div className="additional-content">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* REFERENCES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.references) &&
//             finalize.references.some((r) =>
//               r.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">References</h2>
//                 <div className="additional-content">
//                   {finalize.references.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim(),
//             ) && (
//               <div className="section">
//                 {finalize.customSection.map(
//                   (section, i) =>
//                     (section?.name?.trim() || section?.description?.trim()) && (
//                       <div key={i} className="custom-section">
//                         {section.name && (
//                           <h3 className="custom-section-title">
//                             {section.name}
//                           </h3>
//                         )}
//                         {section.description && (
//                           <div
//                             className="custom-section-content"
//                             dangerouslySetInnerHTML={{
//                               __html: section.description,
//                             }}
//                           />
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateSeven;

// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   formatMonthYear,
//   MonthYearDisplay,
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { AllData, ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);

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
//   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

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
//       // Categorized Skills - Horizontal chips with category titles
//       return (
//         <div className="section">
//           <h2 className="section-title">Skills</h2>
//           <div className="skills-categorized">
//             {skills.map((category: any) => (
//               <div key={category.id} className="skill-category">
//                 <div className="skill-category-title">{category.title}</div>
//                 <div className="skills-chips">
//                   {category.skills.map((skill: any) => (
//                     <span key={skill.id} className="skill-chip">
//                       {skill.name}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     } else {
//       // Simple Skills - Vertical list with bullets
//       return (
//         <div className="section">
//           <h2 className="section-title">Skills</h2>
//           <div className="skills-list">
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
//           <div key={project.id || index} className="project-item">
//             <div className="project-header">
//               <div className="project-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={
//                         project.liveUrl.startsWith("http")
//                           ? project.liveUrl
//                           : `https://${project.liveUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={
//                         project.githubUrl.startsWith("http")
//                           ? project.githubUrl
//                           : `https://${project.githubUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="project-description"
//                 dangerouslySetInnerHTML={{
//                   __html: cleanQuillHTML(project.description),
//                 }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — PROFESSIONAL BLACK & WHITE
//   ====================================================== */
//   const styles = `
//     .t7-resume body {
//       margin: 0;
//       padding: 0;
//     }

//     .t7-resume {
//       width: 210mm;
//       margin: 30px auto;
//       background: white;
//       border: 1px solid #e0e0e0;
//       min-height: 297mm;
//     }

//     .t7-resume.is-preview {
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

//     /* Rich text content styles */
//     .t7-resume .experience-description ul,
//     .t7-resume .experience-description ol,
//     .t7-resume .education-description ul,
//     .t7-resume .education-description ol,
//     .t7-resume .project-description ul,
//     .t7-resume .project-description ol,
//     .t7-resume .summary-text ul,
//     .t7-resume .summary-text ol,
//     .t7-resume .custom-section-content ul,
//     .t7-resume .custom-section-content ol {
//       margin: 8px 0 8px 20px !important;
//       padding-left: 0 !important;
//     }

//     .t7-resume .experience-description li,
//     .t7-resume .education-description li,
//     .t7-resume .project-description li,
//     .t7-resume .summary-text li,
//     .t7-resume .custom-section-content li {
//       margin-bottom: 4px !important;
//     }

//     .t7-resume .experience-description strong,
//     .t7-resume .education-description strong,
//     .t7-resume .project-description strong,
//     .t7-resume .summary-text strong,
//     .t7-resume .custom-section-content strong {
//       font-weight: 700 !important;
//     }

//     .t7-resume .experience-description em,
//     .t7-resume .education-description em,
//     .t7-resume .project-description em,
//     .t7-resume .summary-text em,
//     .t7-resume .custom-section-content em {
//       font-style: italic !important;
//     }

//     .t7-resume .experience-description u,
//     .t7-resume .education-description u,
//     .t7-resume .project-description u,
//     .t7-resume .summary-text u,
//     .t7-resume .custom-section-content u {
//       text-decoration: underline !important;
//     }

//     /* Preserve spaces in content */
//     .t7-resume .experience-description p,
//     .t7-resume .education-description p,
//     .t7-resume .project-description p,
//     .t7-resume .summary-text p,
//     .t7-resume .custom-section-content p {
//       white-space: pre-wrap !important;
//     }

//     /* Header Section */
//     .t7-resume .resume-header {
//       padding: 40px 50px 25px 50px;
//       border-bottom: 2px solid #000000;
//       text-align: center;
//     }

//     .t7-resume .name {
//       font-size: 32px;
//       font-weight: 700;
//       letter-spacing: 2px;
//       text-transform: uppercase;
//       margin-bottom: 8px;
//       color: #000000;
//     }

//     .t7-resume .job-title {
//       font-size: 16px;
//       font-weight: 500;
//       letter-spacing: 1px;
//       color: #333333;
//       margin-bottom: 16px;
//       padding-bottom: 12px;
//       border-bottom: 1px solid #cccccc;
//     }

//     .t7-resume .contact-row {
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 20px;
//       font-size: 12px;
//       color: #444444;
//       margin-bottom: 8px;
//     }

//     .t7-resume .contact-item {
//       display: inline-flex;
//       align-items: center;
//       gap: 5px;
//     }

//     .t7-resume .address {
//       font-size: 12px;
//       color: #444444;
//       margin-top: 6px;
//     }

//     .t7-resume .links {
//       margin-top: 10px;
//       display: flex;
//       justify-content: center;
//       flex-wrap: wrap;
//       gap: 16px;
//     }

//     .t7-resume .link-item {
//       color: #000000;
//       text-decoration: none;
//       font-size: 12px;
//       border-bottom: 1px dotted #999;
//     }

//     /* Main Content */
//     .t7-resume .resume-main {
//       padding: 30px 50px 45px 50px;
//     }

//     /* Section Styles */
//     .t7-resume .section {
//       margin-bottom: 25px;
//     }

//     .t7-resume .section:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .section-title {
//       font-size: 16px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       color: #000000;
//       margin-bottom: 12px;
//       padding-bottom: 4px;
//       border-bottom: 1px solid #000000;
//     }

//     /* Education Grade */
//     .t7-resume .education-grade {
//       font-size: 12px;
//       color: #555555;
//       margin-top: 4px;
//       font-weight: 500;
//       text-align: start;
//     }

//     /* Summary */
//     .t7-resume .summary-text {
//       font-size: 13px;
//       line-height: 1.5;
//       color: #222222;
//       text-align: justify;
//     }

//     /* Experience Items - NEW LAYOUT */
//     .t7-resume .experience-item {
//       margin-bottom: 20px;
//     }

//     .t7-resume .experience-item:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .experience-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t7-resume .experience-title {
//       font-size: 15px;
//       font-weight: 700;
//       color: #000000;
//     }

//     .t7-resume .experience-subtitle {
//       font-size: 13px;
//       font-weight: 500;
//       color: #555555;
//       margin-top: 2px;
//     }

//     .t7-resume .experience-date {
//       font-size: 12px;
//       color: #555555;
//       font-weight: normal;
//       white-space: nowrap;
//     }

//     .t7-resume .experience-description {
//       margin-top: 8px;
//       padding-left: 0;
//       text-align: start;
//     }

//     /* Education Items - NEW LAYOUT */
//     .t7-resume .education-item {
//       margin-bottom: 18px;
//     }

//     .t7-resume .education-item:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .education-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 5px;
//     }

//     .t7-resume .education-school {
//       font-size: 15px;
//       font-weight: 700;
//       color: #000000;
//     }

//     .t7-resume .education-subtitle {
//       font-size: 13px;
//       color: #555555;
//       margin-top: 2px;
//     }

//     .t7-resume .education-date {
//       font-size: 12px;
//       color: #555555;
//       white-space: nowrap;
//     }

//     .t7-resume .education-description {
//       margin-top: 6px;
//       text-align: start;
//     }

//     /* Bullet points for descriptions */
//     .t7-resume .experience-description ul,
//     .t7-resume .education-description ul {
//       list-style-type: none;
//       padding-left: 0;
//       text-align: start;
//     }

//     .t7-resume .experience-description li,
//     .t7-resume .education-description li {
//       position: relative;
//       padding-left: 18px;
//       margin-bottom: 5px;
//       font-size: 13px;
//       color: #222222;
//       line-height: 1.45;
//       text-align: start;
//     }

//     .t7-resume .experience-description li::before,
//     .t7-resume .education-description li::before {
//       content: "•";
//       position: absolute;
//       left: 4px;
//       color: #000000;
//       font-size: 12px;
//     }

//     /* SIMPLE SKILLS - Vertical List with Bullets */
//     .t7-resume .skills-list {
//       margin-top: 8px;
//     }

//     .t7-resume .skill-item {
//       font-size: 13px;
//       color: #222222;
//       position: relative;
//       padding-left: 18px;
//       margin-bottom: 6px;
//     }

//     .t7-resume .skill-item::before {
//       content: "•";
//       position: absolute;
//       left: 4px;
//       color: #000000;
//     }

//     /* CATEGORIZED SKILLS - Horizontal Chips */
//     .t7-resume .skills-categorized {
//       margin-top: 8px;
//     }

//     .t7-resume .skill-category {
//       margin-bottom: 16px;
//     }

//     .t7-resume .skill-category:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .skill-category-title {
//       font-size: 14px;
//       font-weight: 600;
//       color: #000000;
//       margin-bottom: 8px;
//       padding-bottom: 2px;
//       border-bottom: 1px solid #e0e0e0;
//     }

//     .t7-resume .skills-chips {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 8px;
//     }

//     .t7-resume .skill-chip {
//       display: inline-block;
//       font-size: 12px;
//       color: #222222;
//       background-color: #f5f5f5;
//       padding: 4px 12px;
//       border-radius: 20px;
//       border: 1px solid #e0e0e0;
//     }

//     /* PROJECTS */
//     .t7-resume .project-item {
//       margin-bottom: 20px;
//     }

//     .t7-resume .project-item:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t7-resume .project-title {
//       font-size: 15px;
//       font-weight: 700;
//       color: #000000;
//     }

//     .t7-resume .project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .t7-resume .project-link {
//       font-size: 11px;
//       color: #555555;
//       text-decoration: underline;
//     }

//     .t7-resume .project-tech-stack {
//       font-size: 12px;
//       color: #555555;
//       margin: 4px 0;
//     }

//     .t7-resume .project-description {
//       margin-top: 8px;
//       font-size: 13px;
//       color: #222222;
//       line-height: 1.45;
//       text-align: start;
//     }

//     /* Additional content */
//     .t7-resume .additional-content {
//       margin-top: 8px;
//     }

//     .t7-resume .additional-item {
//       font-size: 13px;
//       color: #222222;
//       margin-bottom: 6px;
//       position: relative;
//       padding-left: 18px;
//       text-align: start;
//     }

//     .t7-resume .additional-item::before {
//       content: "•";
//       position: absolute;
//       left: 4px;
//       color: #000000;
//     }

//     /* Custom Sections */
//     .t7-resume .custom-section {
//       margin-bottom: 16px;
//     }

//     .t7-resume .custom-section:last-child {
//       margin-bottom: 0;
//     }

//     .t7-resume .custom-section-title {
//       font-size: 16px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       color: #000000;
//       margin-bottom: 12px;
//       padding-bottom: 4px;
//       border-bottom: 1px solid #000000;
//     }

//     .t7-resume .custom-section-content {
//       font-size: 13px;
//       color: #222222;
//       line-height: 1.45;
//       margin-left: 18px;
//       text-align: start;
//     }

//     /* Print Styles */
//     @media print {
//       @page {
//         size: A4;
//         margin: 0.5in;
//       }

//       .t7-resume body {
//         background: white;
//         margin: 0;
//         padding: 0;
//       }

//       .t7-resume {
//         margin: 0 auto;
//         max-width: 100%;
//         border: none;
//         box-shadow: none;
//       }

//       .t7-resume .resume-header {
//         border-bottom: 2px solid #000;
//       }

//       .t7-resume .section {
//         page-break-inside: avoid;
//       }

//       .t7-resume .experience-item {
//         page-break-inside: avoid;
//       }
//     }

//     /* Responsive */
//     @media (max-width: 768px) {
//       .t7-resume {
//         margin: 15px;
//       }

//       .t7-resume .resume-header {
//         padding: 25px 25px 18px 25px;
//       }

//       .t7-resume .resume-main {
//         padding: 20px 25px 30px 25px;
//       }

//       .t7-resume .name {
//         font-size: 26px;
//       }

//       .t7-resume .contact-row {
//         gap: 12px;
//         flex-direction: column;
//         align-items: center;
//         gap: 5px;
//       }

//       .t7-resume .experience-header {
//         flex-direction: column;
//         gap: 4px;
//       }

//       .t7-resume .experience-date {
//         white-space: normal;
//       }

//       .t7-resume .education-date {
//         white-space: normal;
//       }

//       .t7-resume .project-header {
//         flex-direction: column;
//         gap: 4px;
//       }
//     }
//   `;

//   const renderDescription = (text: string) => {
//     if (!text) return "";

//     if (text.includes("<") && text.includes(">")) {
//       return `<div class="experience-description">${cleanQuillHTML(text)}</div>`;
//     }

//     const lines = text.split("\n").filter((line) => line.trim() !== "");
//     if (
//       lines.some(
//         (line) => line.trim().startsWith("-") || line.trim().startsWith("•"),
//       )
//     ) {
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
//       return `<div class="experience-description" style="white-space: pre-wrap;">${cleanQuillHTML(text)}</div>`;
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
//             <div class="skills-categorized">
//               ${skills
//                 .map(
//                   (category: any) => `
//                 <div class="skill-category">
//                   <div class="skill-category-title">${category.title}</div>
//                   <div class="skills-chips">
//                     ${category.skills
//                       .map(
//                         (skill: any) => `
//                       <span class="skill-chip">${skill.name}</span>
//                     `,
//                       )
//                       .join("")}
//                   </div>
//                 </div>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>
//         `;
//       } else {
//         return `
//           <div class="section">
//             <h2 class="section-title">Skills</h2>
//             <div class="skills-list">
//               ${skills
//                 .map(
//                   (skill: any) => `
//                 <div class="skill-item">${skill.name || skill.skill}</div>
//               `,
//                 )
//                 .join("")}
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
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="project-item">
//               <div class="project-header">
//                 <div class="project-title">${project.title || ""}</div>
//                 <div class="project-links">
//                   ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
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
//                 <div class="project-description">${cleanQuillHTML(project.description)}</div>
//               `
//                   : ""
//               }
//             </div>
//           `,
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
//         <style>${styles}</style>
//       </head>
//       <body>
//         <div class="t7-resume">
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
//             ${
//               summary
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Professional Summary</h2>
//                 <div class="summary-text">${cleanQuillHTML(summary)}</div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- EXPERIENCE - NEW LAYOUT -->
//             ${
//               experiences.length > 0
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Experience</h2>
//                 ${experiences
//                   .map((exp) => {
//                     const startFormatted = formatMonthYear(exp.startDate, true);
//                     const endFormatted = exp.endDate
//                       ? formatMonthYear(exp.endDate, true)
//                       : "Present";
//                     return `
//                     <div class="experience-item">
//                       <div class="experience-header">
//                         <div>
//                           <div class="experience-title">${exp.jobTitle || ""}</div>
//                           <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//                         </div>
//                         <div class="experience-date">${startFormatted} — ${endFormatted}</div>
//                       </div>
//                       ${exp.text ? renderDescription(exp.text) : ""}
//                     </div>
//                   `;
//                   })
//                   .join("")}
//               </div>
//             `
//                 : ""
//             }

//             <!-- PROJECTS -->
//             ${generateProjectsHTML()}

//             <!-- EDUCATION - NEW LAYOUT -->
//             ${
//               educations.length > 0
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Education</h2>
//                 ${educations
//                   .map((edu) => {
//                     const formattedGrade = formatGradeToCgpdAndPercentage(
//                       edu.grade || "",
//                     );
//                     return `
//                     <div class="education-item">
//                       <div class="education-header">
//                         <div>
//                           <div class="education-school">${edu.schoolname || ""}</div>
//                           <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//                           ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                         </div>
//                         <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//                       </div>
//                       ${edu.text ? `<div class="education-description">${renderDescription(edu.text)}</div>` : ""}
//                     </div>
//                   `;
//                   })
//                   .join("")}
//               </div>
//             `
//                 : ""
//             }

//             <!-- SKILLS -->
//             ${generateSkillsHTML()}

//             <!-- LANGUAGES -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.languages) &&
//               finalize.languages.some((l) => l.name?.trim())
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Languages</h2>
//                 <div class="skills-list">
//                   ${finalize.languages
//                     .filter((l) => l.name?.trim())
//                     .map(
//                       (l) => `
//                     <div class="skill-item">${l.name}${l.level ? ` — ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- CERTIFICATIONS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.certificationsAndLicenses) &&
//               finalize.certificationsAndLicenses.some((c) =>
//                 c.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Certifications</h2>
//                 <div class="additional-content">
//                   ${finalize.certificationsAndLicenses
//                     .filter((c) => c.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (c) => `
//                     <div class="additional-item">${cleanQuillHTML(c.name || "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- AWARDS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.awardsAndHonors) &&
//               finalize.awardsAndHonors.some((a) =>
//                 a.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Awards & Honors</h2>
//                 <div class="additional-content">
//                   ${finalize.awardsAndHonors
//                     .filter((a) => a.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (a) => `
//                     <div class="additional-item">${cleanQuillHTML(a.name || "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- INTERESTS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.hobbiesAndInterests) &&
//               finalize.hobbiesAndInterests.some((h) =>
//                 h.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Interests</h2>
//                 <div class="additional-content">
//                   ${finalize.hobbiesAndInterests
//                     .filter((h) => h.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (h) => `
//                     <div class="additional-item">${cleanQuillHTML(h.name || "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- REFERENCES -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.references) &&
//               finalize.references.some((r) =>
//                 r.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">References</h2>
//                 <div class="additional-content">
//                   ${finalize.references
//                     .filter((r) => r.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (r) => `
//                     <div class="additional-item">${cleanQuillHTML(r.name || "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- CUSTOM SECTIONS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.customSection) &&
//               finalize.customSection.some(
//                 (s) => s?.name?.trim() || s?.description?.trim(),
//               )
//                 ? `
//               <div class="section">
//                 ${finalize.customSection
//                   .filter((s) => s?.name?.trim() || s?.description?.trim())
//                   .map(
//                     (s) => `
//                   <div class="custom-section">
//                     ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
//                     ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//                   </div>
//                 `,
//                   )
//                   .join("")}
//               </div>
//             `
//                 : ""
//             }
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

//       {/* Resume Preview */}
//       <div
//         className={`t7-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
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
//           <div className="contact-row">
//             {contact?.email && (
//               <div className="contact-item">{contact.email}</div>
//             )}
//             {contact?.phone && (
//               <div className="contact-item">{contact.phone}</div>
//             )}
//             {formattedDob && (
//               <div className="contact-item"> {formattedDob}</div>
//             )}
//           </div>
//           {addressParts.length > 0 && (
//             <div className="address">{addressParts.join(" | ")}</div>
//           )}
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
//             {githubUrl && (
//               <a
//                 href={
//                   githubUrl.startsWith("http")
//                     ? githubUrl
//                     : `https://${githubUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 GitHub
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

//         {/* MAIN CONTENT */}
//         <div className="resume-main">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section">
//               <h2 className="section-title">Professional Summary</h2>
//               <div
//                 className="summary-text"
//                 dangerouslySetInnerHTML={{
//                   __html: cleanQuillHTML(summary),
//                 }}
//               />
//             </div>
//           )}

//           {/* EXPERIENCE - NEW LAYOUT */}
//           {experiences.length > 0 && (
//             <div className="section">
//               <h2 className="section-title">Experience</h2>
//               {experiences.map((exp, i) => {
//                 const start = formatMonthYear(exp.startDate, true);
//                 const end = exp.endDate
//                   ? formatMonthYear(exp.endDate, true)
//                   : exp.startDate
//                     ? "Present"
//                     : "";
//                 return (
//                   <div key={i} className="experience-item">
//                     <div className="experience-header">
//                       <div>
//                         <div className="experience-title">
//                           {exp.jobTitle || ""}
//                         </div>
//                         <div className="experience-subtitle">
//                           {[exp.employer, exp.location]
//                             .filter(Boolean)
//                             .join(" — ")}
//                         </div>
//                       </div>
//                       <div className="experience-date">
//                         {start} — {end}
//                       </div>
//                     </div>
//                     {exp.text && (
//                       <div
//                         className="experience-description"
//                         dangerouslySetInnerHTML={{
//                           __html: cleanQuillHTML(exp.text),
//                         }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* PROJECTS */}
//           {renderProjects()}

//           {/* EDUCATION - NEW LAYOUT */}
//           {educations.length > 0 && (
//             <div className="section">
//               <h2 className="section-title">Education</h2>
//               {educations.map((edu, i) => {
//                 const formattedGrade = formatGradeToCgpdAndPercentage(
//                   edu.grade || "",
//                 );
//                 return (
//                   <div key={i} className="education-item">
//                     <div className="education-header">
//                       <div>
//                         <div className="education-school">
//                           {edu.schoolname || ""}
//                         </div>
//                         <div className="education-subtitle">
//                           {[edu.degree, edu.location]
//                             .filter(Boolean)
//                             .join(" — ")}
//                         </div>
//                         {formattedGrade && (
//                           <div className="education-grade">
//                             {formattedGrade}
//                           </div>
//                         )}
//                       </div>
//                       <div className="education-date">
//                         {[edu.startDate, edu.endDate || "Present"]
//                           .filter(Boolean)
//                           .join(" — ")}
//                       </div>
//                     </div>
//                     {edu.text && (
//                       <div
//                         className="education-description"
//                         dangerouslySetInnerHTML={{
//                           __html: cleanQuillHTML(edu.text),
//                         }}
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
//                 <div className="skills-list">
//                   {finalize.languages.map(
//                     (lang, i) =>
//                       lang.name?.trim() && (
//                         <div key={i} className="skill-item">
//                           {lang.name}
//                           {lang.level &&
//                             ` — ${Math.round((Number(lang.level) / 4) * 100)}%`}
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CERTIFICATIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some((c) =>
//               c.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Certifications</h2>
//                 <div className="additional-content">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(item.name || ""),
//                           }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* AWARDS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.awardsAndHonors) &&
//             finalize.awardsAndHonors.some((a) =>
//               a.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Awards & Honors</h2>
//                 <div className="additional-content">
//                   {finalize.awardsAndHonors.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(item.name || ""),
//                           }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* INTERESTS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some((h) =>
//               h.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Interests</h2>
//                 <div className="additional-content">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(item.name || ""),
//                           }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* REFERENCES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.references) &&
//             finalize.references.some((r) =>
//               r.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">References</h2>
//                 <div className="additional-content">
//                   {finalize.references.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(item.name || ""),
//                           }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim(),
//             ) && (
//               <div className="section">
//                 {finalize.customSection.map(
//                   (section, i) =>
//                     (section?.name?.trim() || section?.description?.trim()) && (
//                       <div key={i} className="custom-section">
//                         {section.name && (
//                           <h3 className="custom-section-title">
//                             {section.name}
//                           </h3>
//                         )}
//                         {section.description && (
//                           <div
//                             className="custom-section-content"
//                             dangerouslySetInnerHTML={{
//                               __html: cleanQuillHTML(section.description),
//                             }}
//                           />
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateSeven;

// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   formatMonthYear,
//   MonthYearDisplay,
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { AllData, ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
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

//   // Helper function to render skills (now just a string with HTML content)
//   const renderSkills = () => {
//     if (!skills || (typeof skills === "string" && !skills.trim())) return null;

//     // Clean the HTML content from Quill editor
//     const cleanedSkills = cleanQuillHTML(skills);

//     if (
//       !cleanedSkills ||
//       cleanedSkills === "<p><br></p>" ||
//       cleanedSkills === ""
//     )
//       return null;

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
//           <div key={project.id || index} className="project-item">
//             <div className="project-header">
//               <div className="project-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={
//                         project.liveUrl.startsWith("http")
//                           ? project.liveUrl
//                           : `https://${project.liveUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={
//                         project.githubUrl.startsWith("http")
//                           ? project.githubUrl
//                           : `https://${project.githubUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="project-description"
//                 dangerouslySetInnerHTML={{
//                   __html: cleanQuillHTML(project.description),
//                 }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — PROFESSIONAL BLACK & WHITE
//   ====================================================== */
//   const styles = `
//   .t7-resume body {
//     margin: 0;
//     padding: 0;
//     text-align: left;
//   }

//   .t7-resume {
//     width: 210mm;
//     margin: 30px auto;
//     background: white;
//     border: 1px solid #e0e0e0;
//     min-height: 297mm;
//     font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//     text-align: left;
//     box-sizing: border-box;
//   }

//   .t7-resume.is-preview {
//     transform: scale(0.36);
//     transform-origin: top left;
//     width: 210mm;
//     height: auto;
//     max-height: none;
//     min-height: auto;
//     max-width: none;
//     min-width: auto;
//     overflow: visible;
//     font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//     text-align: left;
//   }

//   /* Header Section */
//   .t7-resume .resume-header {
//     padding: 40px 50px 25px 50px;
//     border-bottom: 2px solid #000000;
//     text-align: center;
//   }

//   /* Main Content with consistent spacing */
//   .t7-resume .resume-main {
//     padding: 30px 50px 45px 50px;
//   }

//   /* Section spacing */
//   .t7-resume .section {
//     margin-bottom: 28px;
//   }

//   .t7-resume .section:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .section-title {
//     font-size: 16px;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 1.5px;
//     color: #000000;
//     margin-bottom: 14px;
//     padding-bottom: 6px;
//     border-bottom: 1px solid #000000;
//     text-align: left;
//   }

//   /* Experience items spacing */
//   .t7-resume .experience-item {
//     margin-bottom: 22px;
//   }

//   .t7-resume .experience-item:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .experience-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t7-resume .experience-title {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     text-align: left;
//   }

//   .t7-resume .experience-subtitle {
//     font-size: 13px;
//     font-weight: 500;
//     color: #555555;
//     margin-top: 2px;
//     text-align: left;
//   }

//   .t7-resume .experience-date {
//     font-size: 12px;
//     color: #555555;
//     font-weight: normal;
//     white-space: nowrap;
//     text-align: right;
//   }

//   .t7-resume .experience-description {
//     margin-top: 10px;
//     padding-left: 0;
//     text-align: left;
//   }

//   /* Education items spacing */
//   .t7-resume .education-item {
//     margin-bottom: 20px;
//   }

//   .t7-resume .education-item:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .education-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 5px;
//     text-align: left;
//   }

//   .t7-resume .education-school {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     text-align: left;
//   }

//   .t7-resume .education-subtitle {
//     font-size: 13px;
//     color: #555555;
//     margin-top: 2px;
//     text-align: left;
//   }

//   .t7-resume .education-date {
//     font-size: 12px;
//     color: #555555;
//     white-space: nowrap;
//     text-align: right;
//   }

//   .t7-resume .education-grade {
//     font-size: 12px;
//     color: #555555;
//     margin-top: 4px;
//     font-weight: 500;
//     text-align: left;
//   }

//   .t7-resume .education-description {
//     margin-top: 8px;
//     text-align: left;
//   }

//   /* Project items spacing */
//   .t7-resume .project-item {
//     margin-bottom: 22px;
//   }

//   .t7-resume .project-item:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t7-resume .project-title {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     text-align: left;
//   }

//   .t7-resume .project-links {
//     display: flex;
//     gap: 12px;
//     text-align: right;
//   }

//   .t7-resume .project-tech-stack {
//     font-size: 12px;
//     color: #555555;
//     margin: 6px 0 8px 0;
//   }

//   .t7-resume .project-description {
//     margin-top: 8px;
//     font-size: 13px;
//     color: #222222;
//     line-height: 1.45;
//     text-align: left;
//   }

//   /* Skills content spacing */
//   .t7-resume .skills-content {
//     margin-top: 10px;
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//   }

//   .t7-resume .skills-content p {
//     margin: 0 0 8px 0 !important;
//   }

//   /* Additional content (Languages, Certifications, etc.) */
//   .t7-resume .additional-content {
//     margin-top: 10px;
//     text-align: left;
//   }

//   .t7-resume .additional-item {
//     font-size: 13px;
//     color: #222222;
//     margin-bottom: 8px;
//     position: relative;
//     padding-left: 18px;
//     text-align: left;
//   }

//   .t7-resume .additional-item:last-child {
//     margin-bottom: 0;
//   }

//   /* Custom sections spacing */
//   .t7-resume .custom-section {
//     margin-bottom: 22px;
//     text-align: left;
//   }

//   .t7-resume .custom-section:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .custom-section-title {
//     font-size: 16px;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 1.5px;
//     color: #000000;
//     margin-bottom: 14px;
//     padding-bottom: 6px;
//     border-bottom: 1px solid #000000;
//     text-align: left;
//   }

//   .t7-resume .custom-section-content {
//     font-size: 13px;
//     color: #222222;
//     line-height: 1.45;
//     margin-left: 18px;
//     text-align: left;
//   }

//   /* Summary spacing */
//   .t7-resume .summary-text {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//     text-align: left;
//     margin-top: 6px;
//   }

//   /* Contact row spacing */
//   .t7-resume .contact-row {
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 20px;
//     font-size: 12px;
//     color: #444444;
//     margin-bottom: 8px;
//     text-align: center;
//   }

//   .t7-resume .address {
//     font-size: 12px;
//     color: #444444;
//     margin-top: 8px;
//     text-align: center;
//   }

//   .t7-resume .links {
//     margin-top: 12px;
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 16px;
//     text-align: center;
//   }

//   /* Bullet points spacing */
//   .t7-resume .experience-description ul,
//   .t7-resume .education-description ul {
//     list-style-type: none;
//     padding-left: 0;
//     text-align: left;
//     margin: 4px 0 0 0;
//   }

//   .t7-resume .experience-description li,
//   .t7-resume .education-description li {
//     position: relative;
//     padding-left: 18px;
//     margin-bottom: 6px;
//     font-size: 13px;
//     color: #222222;
//     line-height: 1.45;
//     text-align: left;
//   }

//   .t7-resume .experience-description li:last-child,
//   .t7-resume .education-description li:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .experience-description li::before,
//   .t7-resume .education-description li::before {
//     content: "•";
//     position: absolute;
//     left: 4px;
//     color: #000000;
//     font-size: 12px;
//   }

//   /* Name styling */
//   .t7-resume .name {
//     font-size: 26px;
//     font-weight: 700;
//     letter-spacing: 2px;
//     text-transform: uppercase;
//     margin-bottom: 10px;
//     color: #000000;
//   }

//   /* Job title styling */
//   .t7-resume .job-title {
//     font-size: 16px;
//     font-weight: 500;
//     letter-spacing: 1px;
//     color: #333333;
//     margin-bottom: 18px;
//     padding-bottom: 14px;
//     border-bottom: 1px solid #cccccc;
//   }

//   /* Print Styles */
//   @media print {
//     @page {
//       size: A4;
//       margin: 0.5in;
//     }

//     .t7-resume body {
//       background: white;
//       margin: 0;
//       padding: 0;
//       text-align: left;
//     }

//     .t7-resume {
//       margin: 0 auto;
//       max-width: 100%;
//       border: none;
//       box-shadow: none;
//       text-align: left;
//     }

//     .t7-resume .resume-header {
//       border-bottom: 2px solid #000;
//       text-align: center;
//     }

//     .t7-resume .section-title {
//       text-align: left;
//     }

//     .t7-resume .section {
//       page-break-inside: avoid;
//     }

//     .t7-resume .experience-item {
//       page-break-inside: avoid;
//     }
//   }
// `;

//   const renderDescription = (text: string) => {
//     if (!text) return "";

//     if (text.includes("<") && text.includes(">")) {
//       return `<div class="experience-description">${cleanQuillHTML(text)}</div>`;
//     }

//     const lines = text.split("\n").filter((line) => line.trim() !== "");
//     if (
//       lines.some(
//         (line) => line.trim().startsWith("-") || line.trim().startsWith("•"),
//       )
//     ) {
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
//       return `<div class="experience-description" style="white-space: pre-wrap;">${cleanQuillHTML(text)}</div>`;
//     }
//   };

//   const generateHTML = () => {
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF (now just clean the HTML string)
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (
//         !cleanedSkills ||
//         cleanedSkills === "<p><br></p>" ||
//         cleanedSkills === ""
//       )
//         return "";

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
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="project-item">
//               <div class="project-header">
//                 <div class="project-title">${project.title || ""}</div>
//                 <div class="project-links">
//                   ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
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
//                 <div class="project-description">${cleanQuillHTML(project.description)}</div>
//               `
//                   : ""
//               }
//             </div>
//           `,
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
//         <style>${styles}</style>
//       </head>
//       <body>
//         <div class="t7-resume">
//           <!-- HEADER -->
//           <div class="resume-header">
//             <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//             <div class="job-title">${contact?.jobTitle}</div>
//             <div class="contact-row">
//               ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
//               ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
//               ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
//             </div>
//             ${addressParts.length ? `<div class="address">${addressParts.join(" , ")}</div>` : ""}
//             <div class="links">
//               ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
//               ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item">GitHub</a>` : ""}
//               ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
//             </div>
//           </div>

//           <!-- MAIN CONTENT -->
//           <div class="resume-main">
//             <!-- SUMMARY -->
//             ${
//               summary
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Professional Summary</h2>
//                 <div class="summary-text">${cleanQuillHTML(summary)}</div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- EXPERIENCE - NEW LAYOUT -->
//             ${
//               experiences.length > 0
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Experience</h2>
//                 ${experiences
//                   .map((exp) => {
//                     const startFormatted = formatMonthYear(exp.startDate, true);
//                     const endFormatted = exp.endDate
//                       ? formatMonthYear(exp.endDate, true)
//                       : "Present";
//                     return `
//                     <div class="experience-item">
//                       <div class="experience-header">
//                         <div>
//                           <div class="experience-title">${exp.jobTitle || ""}</div>
//                           <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//                         </div>
//                         <div class="experience-date">${startFormatted} — ${endFormatted}</div>
//                       </div>
//                       ${exp.text ? renderDescription(exp.text) : ""}
//                     </div>
//                   `;
//                   })
//                   .join("")}
//               </div>
//             `
//                 : ""
//             }

//             <!-- PROJECTS -->
//             ${generateProjectsHTML()}

//             <!-- EDUCATION - NEW LAYOUT -->
//             ${
//               educations.length > 0
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Education</h2>
//                 ${educations
//                   .map((edu) => {
//                     const formattedGrade = formatGradeToCgpdAndPercentage(
//                       edu.grade || "",
//                     );
//                     return `
//                     <div class="education-item">
//                       <div class="education-header">
//                         <div>
//                           <div class="education-school">${edu.schoolname || ""}</div>
//                           <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//                           ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                         </div>
//                         <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//                       </div>
//                       ${edu.text ? `<div class="education-description">${renderDescription(edu.text)}</div>` : ""}
//                     </div>
//                   `;
//                   })
//                   .join("")}
//               </div>
//             `
//                 : ""
//             }

//             <!-- SKILLS -->
//             ${generateSkillsHTML()}

//             <!-- LANGUAGES -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.languages) &&
//               finalize.languages.some((l) => l.name?.trim())
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Languages</h2>
//                 <div class="additional-content">
//                   ${finalize.languages
//                     .filter((l) => l.name?.trim())
//                     .map(
//                       (l) => `
//                     <div class="additional-item">${l.name}${l.level ? ` — ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- CERTIFICATIONS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.certificationsAndLicenses) &&
//               finalize.certificationsAndLicenses.some((c) =>
//                 c.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Certifications</h2>
//                 <div class="additional-content">
//                   ${finalize.certificationsAndLicenses
//                     .filter((c) => c.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (c) => `
//                     <div class="additional-item">${cleanQuillHTML(c.name || "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- AWARDS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.awardsAndHonors) &&
//               finalize.awardsAndHonors.some((a) =>
//                 a.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Awards & Honors</h2>
//                 <div class="additional-content">
//                   ${finalize.awardsAndHonors
//                     .filter((a) => a.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (a) => `
//                     <div class="additional-item">${cleanQuillHTML(a.name || "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- INTERESTS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.hobbiesAndInterests) &&
//               finalize.hobbiesAndInterests.some((h) =>
//                 h.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Interests</h2>
//                 <div class="additional-content">
//                   ${finalize.hobbiesAndInterests
//                     .filter((h) => h.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (h) => `
//                     <div class="additional-item">${cleanQuillHTML(h.name || "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- REFERENCES -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.references) &&
//               finalize.references.some((r) =>
//                 r.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">References</h2>
//                 <div class="additional-content">
//                   ${finalize.references
//                     .filter((r) => r.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (r) => `
//                     <div class="additional-item">${cleanQuillHTML(r.name || "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- CUSTOM SECTIONS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.customSection) &&
//               finalize.customSection.some(
//                 (s) => s?.name?.trim() || s?.description?.trim(),
//               )
//                 ? `
//               <div class="section">
//                 ${finalize.customSection
//                   .filter((s) => s?.name?.trim() || s?.description?.trim())
//                   .map(
//                     (s) => `
//                   <div class="custom-section">
//                     ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
//                     ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//                   </div>
//                 `,
//                   )
//                   .join("")}
//               </div>
//             `
//                 : ""
//             }
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
//     <div style={{ textAlign: "center", marginTop: 0 }}>
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
//       {/* )}  */}

//       {/* Resume Preview */}
//       <div
//         className={`t7-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="resume-header">
//           <h1 className="name">
//             {contact?.firstName} {contact?.lastName}
//           </h1>
//           <div className="job-title">{contact?.jobTitle}</div>
//           <div className="contact-row">
//             {contact?.email && (
//               <div className="contact-item">{contact.email}</div>
//             )}
//             {contact?.phone && (
//               <div className="contact-item">{contact.phone}</div>
//             )}
//             {formattedDob && (
//               <div className="contact-item"> {formattedDob}</div>
//             )}
//           </div>
//           {addressParts.length > 0 && (
//             <div className="address">{addressParts.join(" , ")}</div>
//           )}
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
//             {githubUrl && (
//               <a
//                 href={
//                   githubUrl.startsWith("http")
//                     ? githubUrl
//                     : `https://${githubUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 GitHub
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

//         {/* MAIN CONTENT */}
//         <div className="resume-main">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section">
//               <h2 className="section-title">Professional Summary</h2>
//               <div
//                 className="summary-text"
//                 dangerouslySetInnerHTML={{
//                   __html: cleanQuillHTML(summary),
//                 }}
//               />
//             </div>
//           )}

//           {/* EXPERIENCE - NEW LAYOUT */}
//           {experiences.length > 0 && (
//             <div className="section">
//               <h2 className="section-title">Experience</h2>
//               {experiences.map((exp, i) => {
//                 const start = formatMonthYear(exp.startDate, false);
//                 const end = exp.endDate
//                   ? formatMonthYear(exp.endDate, false)
//                   : exp.startDate
//                     ? "Present"
//                     : "";
//                 return (
//                   <div key={i} className="experience-item">
//                     <div className="experience-header">
//                       <div>
//                         <div className="experience-title">
//                           {exp.jobTitle || ""}
//                         </div>
//                         <div className="experience-subtitle">
//                           {[exp.employer, exp.location]
//                             .filter(Boolean)
//                             .join(" — ")}
//                         </div>
//                       </div>
//                       <div className="experience-date">
//                         {start} — {end}
//                       </div>
//                     </div>
//                     {exp.text && (
//                       <div
//                         className="experience-description"
//                         dangerouslySetInnerHTML={{
//                           __html: cleanQuillHTML(exp.text),
//                         }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* PROJECTS */}
//           {renderProjects()}

//           {/* EDUCATION - NEW LAYOUT */}
//           {educations.length > 0 && (
//             <div className="section">
//               <h2 className="section-title">Education</h2>
//               {educations.map((edu, i) => {
//                 const formattedGrade = formatGradeToCgpdAndPercentage(
//                   edu.grade || "",
//                 );
//                 return (
//                   <div key={i} className="education-item">
//                     <div className="education-header">
//                       <div>
//                         <div className="education-school">
//                           {edu.schoolname || ""}
//                         </div>
//                         <div className="education-subtitle">
//                           {[edu.degree, edu.location]
//                             .filter(Boolean)
//                             .join(" — ")}
//                         </div>
//                         {formattedGrade && (
//                           <div className="education-grade">
//                             {formattedGrade}
//                           </div>
//                         )}
//                       </div>
//                       <div className="education-date">
//                         {[edu.startDate, edu.endDate || "Present"]
//                           .filter(Boolean)
//                           .join(" — ")}
//                       </div>
//                     </div>
//                     {edu.text && (
//                       <div
//                         className="education-description"
//                         dangerouslySetInnerHTML={{
//                           __html: cleanQuillHTML(edu.text),
//                         }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* SKILLS - Now using text editor format */}
//           {renderSkills()}

//           {/* LANGUAGES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.languages) &&
//             finalize.languages.some((l) => l.name?.trim()) && (
//               <div className="section">
//                 <h2 className="section-title">Languages</h2>
//                 <div className="additional-content">
//                   {finalize.languages.map(
//                     (lang, i) =>
//                       lang.name?.trim() && (
//                         <div key={i} className="additional-item">
//                           {lang.name}
//                           {lang.level &&
//                             ` — ${Math.round((Number(lang.level) / 4) * 100)}%`}
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CERTIFICATIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some((c) =>
//               c.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Certifications</h2>
//                 <div className="additional-content">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(item.name || ""),
//                           }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* AWARDS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.awardsAndHonors) &&
//             finalize.awardsAndHonors.some((a) =>
//               a.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Awards & Honors</h2>
//                 <div className="additional-content">
//                   {finalize.awardsAndHonors.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(item.name || ""),
//                           }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* INTERESTS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some((h) =>
//               h.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Interests</h2>
//                 <div className="additional-content">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(item.name || ""),
//                           }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* REFERENCES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.references) &&
//             finalize.references.some((r) =>
//               r.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">References</h2>
//                 <div className="additional-content">
//                   {finalize.references.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(item.name || ""),
//                           }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim(),
//             ) && (
//               <div className="section">
//                 {finalize.customSection.map(
//                   (section, i) =>
//                     (section?.name?.trim() || section?.description?.trim()) && (
//                       <div key={i} className="custom-section">
//                         {section.name && (
//                           <h3 className="custom-section-title">
//                             {section.name}
//                           </h3>
//                         )}
//                         {section.description && (
//                           <div
//                             className="custom-section-content"
//                             dangerouslySetInnerHTML={{
//                               __html: cleanQuillHTML(section.description),
//                             }}
//                           />
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateSeven;

// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   formatMonthYear,
//   MonthYearDisplay,
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { AllData, ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
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

//   // Helper function to render skills (now just a string with HTML content)
//   const renderSkills = () => {
//     if (!skills || (typeof skills === "string" && !skills.trim())) return null;

//     // Clean the HTML content from Quill editor
//     const cleanedSkills = cleanQuillHTML(skills);
//     console.log("cleanedSkills",cleanedSkills)

//     if (
//       !cleanedSkills ||
//       cleanedSkills === "<p><br></p>" ||
//       cleanedSkills === ""
//     )
//       return null;

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
//           <div key={project.id || index} className="project-item">
//             <div className="project-header">
//               <div className="project-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={
//                         project.liveUrl.startsWith("http")
//                           ? project.liveUrl
//                           : `https://${project.liveUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={
//                         project.githubUrl.startsWith("http")
//                           ? project.githubUrl
//                           : `https://${project.githubUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="project-description"
//                 dangerouslySetInnerHTML={{
//                   __html: cleanQuillHTML(project.description),
//                 }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — PROFESSIONAL BLACK & WHITE WITH NUNITO FONT
//   ====================================================== */
//   const styles = `
//   /* Import Nunito font with multiple weights */
//   @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');

//    t7-resume body {
//     margin: 0;
//     padding: 0;
//     background: white;
//     font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//   }

//   .t7-resume {
//     width: 210mm;
//     margin: 10px;
//     background: white;
//     min-height: 297mm;
//     font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//     color: #111827;
//     text-align: left;
//     box-sizing: border-box;
//   }

//   .t7-resume.is-preview {
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

//   /* Ensure all text elements inherit Nunito font */
//   .t7-resume * {
//     font-family: inherit;
//   }

//   /* Header Section */
//   .t7-resume .resume-header {
//     padding: 40px 50px 25px 50px;
//     border-bottom: 2px solid #000000;
//     text-align: center;
//   }

//   /* Main Content with consistent spacing */
//   .t7-resume .resume-main {
//     padding: 30px 50px 45px 50px;
//   }

//   /* Section spacing */
//   .t7-resume .section {
//     margin-bottom: 28px;
//   }

//   .t7-resume .section:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .section-title {
//     font-size: 16px;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 1.5px;
//     color: #000000;
//     margin-bottom: 14px;
//     padding-bottom: 6px;
//     border-bottom: 1px solid #000000;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   /* Experience items spacing */
//   .t7-resume .experience-item {
//     margin-bottom: 22px;
//   }

//   .t7-resume .experience-item:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .experience-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t7-resume .experience-title {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-subtitle {
//     font-size: 13px;
//     font-weight: 500;
//     color: #555555;
//     margin-top: 2px;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-date {
//     font-size: 12px;
//     color: #555555;
//     font-weight: normal;
//     white-space: nowrap;
//     text-align: right;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-description {
//     margin-top: 10px;
//     padding-left: 0;
//     text-align: left;
//   }

//   /* Education items spacing */
//   .t7-resume .education-item {
//     margin-bottom: 20px;
//   }

//   .t7-resume .education-item:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .education-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 5px;
//     text-align: left;
//   }

//   .t7-resume .education-school {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .education-subtitle {
//     font-size: 13px;
//     color: #555555;
//     margin-top: 2px;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .education-date {
//     font-size: 12px;
//     color: #555555;
//     white-space: nowrap;
//     text-align: right;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .education-grade {
//     font-size: 12px;
//     color: #555555;
//     margin-top: 4px;
//     font-weight: 500;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .education-description {
//     margin-top: 8px;
//     text-align: left;
//   }

//   /* Project items spacing */
//   .t7-resume .project-item {
//     margin-bottom: 22px;
//   }

//   .t7-resume .project-item:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t7-resume .project-title {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .project-links {
//     display: flex;
//     gap: 12px;
//     text-align: right;
//   }

//   /* Link styles - consistent for both preview and PDF */
//   .t7-resume .project-link,
//   .t7-resume .link-item {
//     color: #000000 !important;
//     text-decoration: underline !important;
//     text-underline-offset: 2px;
//     font-size: 12px;
//     font-weight: 500;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .project-tech-stack {
//     font-size: 12px;
//     color: #555555;
//     margin: 6px 0 8px 0;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .project-description {
//     margin-top: 8px;
//     font-size: 13px;
//     color: #222222;
//     line-height: 1.45;
//     text-align: left;
//   }

//   /* Skills content spacing */
//   .t7-resume .skills-content {
//     margin-top: 10px;
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//   }

//   .t7-resume .skills-content p {
//     margin: 0 0 8px 0 !important;
//   }

//   /* Skills content spacing - ADD THESE LIST STYLES */
// .t7-resume .skills-content {
//   margin-top: 10px;
//   font-size: 13px;
//   line-height: 1.5;
//   color: #222222;
// }

// /* Add list styles for skills content */
// .t7-resume .skills-content ul,
// .t7-resume .skills-content ol {
//   margin: 8px 0 8px 20px !important;
//   padding-left: 20px !important;
// }

// .t7-resume .skills-content ul {
//   list-style-type: disc !important;
// }

// .t7-resume .skills-content ol {
//   list-style-type: decimal !important;
// }

// .t7-resume .skills-content li {
//   margin-bottom: 4px !important;
//   display: list-item !important;
//   font-family: 'Nunito', sans-serif;
// }

// .t7-resume .skills-content ul ul {
//   list-style-type: circle !important;
//   margin-left: 20px !important;
// }

// .t7-resume .skills-content ol ol {
//   list-style-type: lower-alpha !important;
//   margin-left: 20px !important;
// }

// .t7-resume .skills-content p {
//   margin: 0 0 8px 0 !important;
// }

//   /* Additional content (Languages, Certifications, etc.) */
//   .t7-resume .additional-content {
//     margin-top: 10px;
//     text-align: left;
//   }

//   .t7-resume .additional-item {
//     font-size: 13px;
//     color: #222222;
//     margin-bottom: 8px;
//     position: relative;
//     padding-left: 18px;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .additional-item:last-child {
//     margin-bottom: 0;
//   }

//   /* Custom sections spacing */
//   .t7-resume .custom-section {
//     margin-bottom: 22px;
//     text-align: left;
//   }

//   .t7-resume .custom-section:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .custom-section-title {
//     font-size: 16px;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 1.5px;
//     color: #000000;
//     margin-bottom: 14px;
//     padding-bottom: 6px;
//     border-bottom: 1px solid #000000;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .custom-section-content {
//     font-size: 13px;
//     color: #222222;
//     line-height: 1.45;
//     margin-left: 18px;
//     text-align: left;
//   }

//   /* Summary spacing */
//   .t7-resume .summary-text {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//     text-align: left;
//     margin-top: 6px;
//   }

//   /* Contact row spacing */
//   .t7-resume .contact-row {
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 20px;
//     font-size: 12px;
//     color: #444444;
//     margin-bottom: 8px;
//     text-align: center;
//   }

//   .t7-resume .address {
//     font-size: 12px;
//     color: #444444;
//     margin-top: 8px;
//     text-align: center;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .links {
//     margin-top: 12px;
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 16px;
//     text-align: center;
//   }

//   /* Name styling */
//   .t7-resume .name {
//     font-size: 26px;
//     font-weight: 700;
//     letter-spacing: 2px;
//     text-transform: uppercase;
//     margin-bottom: 10px;
//     color: #000000;
//     font-family: 'Nunito', sans-serif;
//   }

//   /* Job title styling */
//   .t7-resume .job-title {
//     font-size: 16px;
//     font-weight: 500;
//     letter-spacing: 1px;
//     color: #333333;
//     margin-bottom: 18px;
//     padding-bottom: 14px;
//     border-bottom: 1px solid #cccccc;
//     font-family: 'Nunito', sans-serif;
//   }

//   /* Contact item styling */
//   .t7-resume .contact-item {
//     font-family: 'Nunito', sans-serif;
//   }

//   /* Bullet points */
//   .t7-resume .experience-description ul,
//   .t7-resume .education-description ul {
//     list-style-type: none;
//     padding-left: 0;
//     text-align: left;
//     margin: 4px 0 0 0;
//   }

//   .t7-resume .experience-description li,
//   .t7-resume .education-description li {
//     position: relative;
//     padding-left: 18px;
//     margin-bottom: 6px;
//     font-size: 13px;
//     color: #222222;
//     line-height: 1.45;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-description li:last-child,
//   .t7-resume .education-description li:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .experience-description li::before,
//   .t7-resume .education-description li::before {
//     content: "•";
//     position: absolute;
//     left: 4px;
//     color: #000000;
//     font-size: 12px;
//   }

//   /* Rich text content styles */
//   .t7-resume .experience-description ul,
//   .t7-resume .experience-description ol,
//   .t7-resume .education-description ul,
//   .t7-resume .education-description ol,
//   .t7-resume .project-description ul,
//   .t7-resume .project-description ol,
//   .t7-resume .summary-text ul,
//   .t7-resume .summary-text ol,
//   .t7-resume .custom-section-content ul,
//   .t7-resume .custom-section-content ol,
//   .t7-resume .skills-content ul,
//   .t7-resume .skills-content ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t7-resume .experience-description li,
//   .t7-resume .education-description li,
//   .t7-resume .project-description li,
//   .t7-resume .summary-text li,
//   .t7-resume .custom-section-content li,
//   .t7-resume .skills-content li {
//     margin-bottom: 4px !important;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-description strong,
//   .t7-resume .education-description strong,
//   .t7-resume .project-description strong,
//   .t7-resume .summary-text strong,
//   .t7-resume .custom-section-content strong,
//   .t7-resume .skills-content strong {
//     font-weight: 700 !important;
//   }

//   .t7-resume .experience-description em,
//   .t7-resume .education-description em,
//   .t7-resume .project-description em,
//   .t7-resume .summary-text em,
//   .t7-resume .custom-section-content em,
//   .t7-resume .skills-content em {
//     font-style: italic !important;
//   }

//   .t7-resume .experience-description u,
//   .t7-resume .education-description u,
//   .t7-resume .project-description u,
//   .t7-resume .summary-text u,
//   .t7-resume .custom-section-content u,
//   .t7-resume .skills-content u {
//     text-decoration: underline !important;
//   }

//   /* Preserve spaces in content */
//   .t7-resume .experience-description p,
//   .t7-resume .education-description p,
//   .t7-resume .project-description p,
//   .t7-resume .summary-text p,
//   .t7-resume .custom-section-content p,
//   .t7-resume .skills-content p {
//     white-space: pre-wrap !important;
//     font-family: 'Nunito', sans-serif;
//   }

//     /* Skills content spacing */
//   .t7-resume .skills-content {
//     margin-top: 10px;
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//   }

//   .t7-resume .skills-content p {
//     margin: 0 0 8px 0 !important;
//   }

//   /* List styles for skills content - FIXED */
//   .t7-resume .skills-content ul {
//     list-style-type: disc !important;
//     margin: 8px 0 8px 0 !important;
//     padding-left: 25px !important;
//   }

//   .t7-resume .skills-content ol {
//     list-style-type: decimal !important;
//     margin: 8px 0 8px 0 !important;
//     padding-left: 25px !important;
//   }

//   .t7-resume .skills-content li {
//     margin-bottom: 6px !important;
//     display: list-item !important;
//     font-family: 'Nunito', sans-serif;
//     line-height: 1.5 !important;
//   }

//   .t7-resume .skills-content ul ul {
//     list-style-type: circle !important;
//     margin-left: 20px !important;
//   }

//   .t7-resume .skills-content ol ol {
//     list-style-type: lower-alpha !important;
//     margin-left: 20px !important;
//   }

//   /* Rich text content styles - EXCLUDING skills-content */
//   .t7-resume .experience-description ul,
//   .t7-resume .experience-description ol,
//   .t7-resume .education-description ul,
//   .t7-resume .education-description ol,
//   .t7-resume .project-description ul,
//   .t7-resume .project-description ol,
//   .t7-resume .summary-text ul,
//   .t7-resume .summary-text ol,
//   .t7-resume .custom-section-content ul,
//   .t7-resume .custom-section-content ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   /* List item styles for other sections */
//   .t7-resume .experience-description li,
//   .t7-resume .education-description li,
//   .t7-resume .project-description li,
//   .t7-resume .summary-text li,
//   .t7-resume .custom-section-content li {
//     margin-bottom: 4px !important;
//     font-family: 'Nunito', sans-serif;
//   }

//   /* Text formatting */
//   .t7-resume .experience-description strong,
//   .t7-resume .education-description strong,
//   .t7-resume .project-description strong,
//   .t7-resume .summary-text strong,
//   .t7-resume .custom-section-content strong,
//   .t7-resume .skills-content strong {
//     font-weight: 700 !important;
//   }

//   .t7-resume .experience-description em,
//   .t7-resume .education-description em,
//   .t7-resume .project-description em,
//   .t7-resume .summary-text em,
//   .t7-resume .custom-section-content em,
//   .t7-resume .skills-content em {
//     font-style: italic !important;
//   }

//   .t7-resume .experience-description u,
//   .t7-resume .education-description u,
//   .t7-resume .project-description u,
//   .t7-resume .summary-text u,
//   .t7-resume .custom-section-content u,
//   .t7-resume .skills-content u {
//     text-decoration: underline !important;
//   }

//   /* Preserve spaces in content */
//   .t7-resume .experience-description p,
//   .t7-resume .education-description p,
//   .t7-resume .project-description p,
//   .t7-resume .summary-text p,
//   .t7-resume .custom-section-content p,
//   .t7-resume .skills-content p {
//     white-space: pre-wrap !important;
//     font-family: 'Nunito', sans-serif;
//   }

//   /* Print Styles - Different margins for first and subsequent pages */
//   @media print {
//     @page {
//       size: A4;
//       margin-top: 15mm !important;
//     }

//     /* First page - no top margin */
//     @page :first {
//       margin-top: 0mm !important;
//     }

//     * {
//       -webkit-print-color-adjust: exact !important;
//       print-color-adjust: exact !important;
//     }

//     body {
//       margin: 0;
//       padding: 0;
//       background: white;
//       font-family: 'Nunito', sans-serif !important;
//     }

//     .t7-resume {
//       margin: 0;
//       padding: 0;
//       width: 100%;
//       border: none;
//       box-shadow: none;
//       font-family: 'Nunito', sans-serif !important;
//       background: white;
//     }

//     /* Add top margin for second page and beyond */
//     .t7-resume .resume-main > *:first-child {
//       margin-top: 0;
//     }

//     /* When content flows to second page, add margin to the first element */
//     .t7-resume {
//       page-break-after: auto;
//     }

//     /* Ensure proper page breaks */
//     .t7-resume .section {
//       page-break-inside: avoid;
//       page-break-after: auto;
//     }

//     .t7-resume .experience-item {
//       page-break-inside: avoid;
//     }

//     /* Keep links consistent in print */
//     .t7-resume .project-link,
//     .t7-resume .link-item {
//       color: #000000 !important;
//       text-decoration: underline !important;
//     }

//     /* Ensure all text uses Nunito in print */
//     .t7-resume * {
//       font-family: 'Nunito', sans-serif !important;
//     }
//   }
// `;

//   const renderDescription = (text: string) => {
//     if (!text) return "";

//     if (text.includes("<") && text.includes(">")) {
//       return `<div class="experience-description">${cleanQuillHTML(text)}</div>`;
//     }

//     const lines = text.split("\n").filter((line) => line.trim() !== "");
//     if (
//       lines.some(
//         (line) => line.trim().startsWith("-") || line.trim().startsWith("•"),
//       )
//     ) {
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
//       return `<div class="experience-description" style="white-space: pre-wrap;">${cleanQuillHTML(text)}</div>`;
//     }
//   };

//   const generateHTML = () => {
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF (now just clean the HTML string)
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (
//         !cleanedSkills ||
//         cleanedSkills === "<p><br></p>" ||
//         cleanedSkills === ""
//       )
//         return "";

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
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="project-item">
//               <div class="project-header">
//                 <div class="project-title">${project.title || ""}</div>
//                 <div class="project-links">
//                   ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link" target="_blank" rel="noopener noreferrer">GitHub</a>` : ""}
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
//                 <div class="project-description">${cleanQuillHTML(project.description)}</div>
//               `
//                   : ""
//               }
//             </div>
//           `,
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
//         <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
//         <style>
//           /* Ensure the font is loaded and applied */
//           @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');

//           * {
//             font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
//           }

//           body {
//             font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
//             margin: 0;
//             padding: 0;
//             background: white;
//           }

//           ${styles}
//         </style>
//       </head>
//       <body>
//         <div class="t7-resume" style="font-family: 'Nunito', sans-serif;">
//           <!-- HEADER -->
//           <div class="resume-header">
//             <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//             <div class="job-title">${contact?.jobTitle || ""}</div>
//             <div class="contact-row">
//               ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
//               ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
//               ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
//             </div>
//             ${addressParts.length ? `<div class="address">${addressParts.join(" , ")}</div>` : ""}
//             <div class="links">
//               ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item" target="_blank" rel="noopener noreferrer">LinkedIn</a>` : ""}
//               ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item" target="_blank" rel="noopener noreferrer">GitHub</a>` : ""}
//               ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item" target="_blank" rel="noopener noreferrer">Portfolio</a>` : ""}
//             </div>
//           </div>

//           <!-- MAIN CONTENT -->
//           <div class="resume-main">
//             <!-- SUMMARY -->
//             ${
//               summary
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Professional Summary</h2>
//                 <div class="summary-text">${cleanQuillHTML(summary)}</div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- EXPERIENCE - NEW LAYOUT -->
//             ${
//               experiences.length > 0
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Experience</h2>
//                 ${experiences
//                   .map((exp) => {
//                     const startFormatted = formatMonthYear(exp.startDate, true);
//                     const endFormatted = exp.endDate
//                       ? formatMonthYear(exp.endDate, true)
//                       : "Present";
//                     return `
//                     <div class="experience-item">
//                       <div class="experience-header">
//                         <div>
//                           <div class="experience-title">${exp.jobTitle || ""}</div>
//                           <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//                         </div>
//                         <div class="experience-date">${startFormatted} — ${endFormatted}</div>
//                       </div>
//                       ${exp.text ? renderDescription(exp.text) : ""}
//                     </div>
//                   `;
//                   })
//                   .join("")}
//               </div>
//             `
//                 : ""
//             }

//             <!-- PROJECTS -->
//             ${generateProjectsHTML()}

//             <!-- EDUCATION - NEW LAYOUT -->
//             ${
//               educations.length > 0
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Education</h2>
//                 ${educations
//                   .map((edu) => {
//                     const formattedGrade = formatGradeToCgpdAndPercentage(
//                       edu.grade || "",
//                     );
//                     return `
//                     <div class="education-item">
//                       <div class="education-header">
//                         <div>
//                           <div class="education-school">${edu.schoolname || ""}</div>
//                           <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//                           ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                         </div>
//                         <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//                       </div>
//                       ${edu.text ? `<div class="education-description">${renderDescription(edu.text)}</div>` : ""}
//                     </div>
//                   `;
//                   })
//                   .join("")}
//               </div>
//             `
//                 : ""
//             }

//             <!-- SKILLS -->
//             ${generateSkillsHTML()}

//             <!-- LANGUAGES -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.languages) &&
//               finalize.languages.some((l) => l.name?.trim())
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Languages</h2>
//                 <div class="additional-content">
//                   ${finalize.languages
//                     .filter((l) => l.name?.trim())
//                     .map(
//                       (l) => `
//                     <div class="additional-item">${l.name}${l.level ? ` — ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- CERTIFICATIONS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.certificationsAndLicenses) &&
//               finalize.certificationsAndLicenses.some((c) =>
//                 c.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Certifications</h2>
//                 <div class="additional-content">
//                   ${finalize.certificationsAndLicenses
//                     .filter((c) => c.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (c) => `
//                     <div class="additional-item">${cleanQuillHTML(c.name || "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- AWARDS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.awardsAndHonors) &&
//               finalize.awardsAndHonors.some((a) =>
//                 a.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Awards & Honors</h2>
//                 <div class="additional-content">
//                   ${finalize.awardsAndHonors
//                     .filter((a) => a.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (a) => `
//                     <div class="additional-item">${cleanQuillHTML(a.name || "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- INTERESTS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.hobbiesAndInterests) &&
//               finalize.hobbiesAndInterests.some((h) =>
//                 h.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Interests</h2>
//                 <div class="additional-content">
//                   ${finalize.hobbiesAndInterests
//                     .filter((h) => h.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (h) => `
//                     <div class="additional-item">${cleanQuillHTML(h.name || "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- REFERENCES -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.references) &&
//               finalize.references.some((r) =>
//                 r.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">References</h2>
//                 <div class="additional-content">
//                   ${finalize.references
//                     .filter((r) => r.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (r) => `
//                     <div class="additional-item">${cleanQuillHTML(r.name || "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- CUSTOM SECTIONS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.customSection) &&
//               finalize.customSection.some(
//                 (s) => s?.name?.trim() || s?.description?.trim(),
//               )
//                 ? `
//               <div class="section">
//                 ${finalize.customSection
//                   .filter((s) => s?.name?.trim() || s?.description?.trim())
//                   .map(
//                     (s) => `
//                   <div class="custom-section">
//                     ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
//                     ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//                   </div>
//                 `,
//                   )
//                   .join("")}
//               </div>
//             `
//                 : ""
//             }
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
//     <div style={{ textAlign: "center", marginTop: 0 }}>
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

//       {/* Resume Preview */}
//       <div
//         className={`t7-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="resume-header">
//           <h1 className="name">
//             {contact?.firstName} {contact?.lastName}
//           </h1>
//           <div className="job-title">{contact?.jobTitle}</div>
//           <div className="contact-row">
//             {contact?.email && (
//               <div className="contact-item">{contact.email}</div>
//             )}
//             {contact?.phone && (
//               <div className="contact-item">{contact.phone}</div>
//             )}
//             {formattedDob && (
//               <div className="contact-item"> {formattedDob}</div>
//             )}
//           </div>
//           {addressParts.length > 0 && (
//             <div className="address">{addressParts.join(" , ")}</div>
//           )}
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
//             {githubUrl && (
//               <a
//                 href={
//                   githubUrl.startsWith("http")
//                     ? githubUrl
//                     : `https://${githubUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 GitHub
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

//         {/* MAIN CONTENT */}
//         <div className="resume-main">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section">
//               <h2 className="section-title">Professional Summary</h2>
//               <div
//                 className="summary-text"
//                 dangerouslySetInnerHTML={{
//                   __html: cleanQuillHTML(summary),
//                 }}
//               />
//             </div>
//           )}

//           {/* EXPERIENCE - NEW LAYOUT */}
//           {experiences.length > 0 && (
//             <div className="section">
//               <h2 className="section-title">Experience</h2>
//               {experiences.map((exp, i) => {
//                 const start = formatMonthYear(exp.startDate, false);
//                 const end = exp.endDate
//                   ? formatMonthYear(exp.endDate, false)
//                   : exp.startDate
//                     ? "Present"
//                     : "";
//                 return (
//                   <div key={i} className="experience-item">
//                     <div className="experience-header">
//                       <div>
//                         <div className="experience-title">
//                           {exp.jobTitle || ""}
//                         </div>
//                         <div className="experience-subtitle">
//                           {[exp.employer, exp.location]
//                             .filter(Boolean)
//                             .join(" — ")}
//                         </div>
//                       </div>
//                       <div className="experience-date">
//                         {start} — {end}
//                       </div>
//                     </div>
//                     {exp.text && (
//                       <div
//                         className="experience-description"
//                         dangerouslySetInnerHTML={{
//                           __html: cleanQuillHTML(exp.text),
//                         }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* PROJECTS */}
//           {renderProjects()}

//           {/* EDUCATION - NEW LAYOUT */}
//           {educations.length > 0 && (
//             <div className="section">
//               <h2 className="section-title">Education</h2>
//               {educations.map((edu, i) => {
//                 const formattedGrade = formatGradeToCgpdAndPercentage(
//                   edu.grade || "",
//                 );
//                 return (
//                   <div key={i} className="education-item">
//                     <div className="education-header">
//                       <div>
//                         <div className="education-school">
//                           {edu.schoolname || ""}
//                         </div>
//                         <div className="education-subtitle">
//                           {[edu.degree, edu.location]
//                             .filter(Boolean)
//                             .join(" — ")}
//                         </div>
//                         {formattedGrade && (
//                           <div className="education-grade">
//                             {formattedGrade}
//                           </div>
//                         )}
//                       </div>
//                       <div className="education-date">
//                         {[edu.startDate, edu.endDate || "Present"]
//                           .filter(Boolean)
//                           .join(" — ")}
//                       </div>
//                     </div>
//                     {edu.text && (
//                       <div
//                         className="education-description"
//                         dangerouslySetInnerHTML={{
//                           __html: cleanQuillHTML(edu.text),
//                         }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* SKILLS - Now using text editor format */}
//           {renderSkills()}

//           {/* LANGUAGES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.languages) &&
//             finalize.languages.some((l) => l.name?.trim()) && (
//               <div className="section">
//                 <h2 className="section-title">Languages</h2>
//                 <div className="additional-content">
//                   {finalize.languages.map(
//                     (lang, i) =>
//                       lang.name?.trim() && (
//                         <div key={i} className="additional-item">
//                           {lang.name}
//                           {lang.level &&
//                             ` — ${Math.round((Number(lang.level) / 4) * 100)}%`}
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CERTIFICATIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some((c) =>
//               c.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Certifications</h2>
//                 <div className="additional-content">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(item.name || ""),
//                           }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* AWARDS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.awardsAndHonors) &&
//             finalize.awardsAndHonors.some((a) =>
//               a.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Awards & Honors</h2>
//                 <div className="additional-content">
//                   {finalize.awardsAndHonors.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(item.name || ""),
//                           }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* INTERESTS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some((h) =>
//               h.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Interests</h2>
//                 <div className="additional-content">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(item.name || ""),
//                           }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* REFERENCES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.references) &&
//             finalize.references.some((r) =>
//               r.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">References</h2>
//                 <div className="additional-content">
//                   {finalize.references.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(item.name || ""),
//                           }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim(),
//             ) && (
//               <div className="section">
//                 {finalize.customSection.map(
//                   (section, i) =>
//                     (section?.name?.trim() || section?.description?.trim()) && (
//                       <div key={i} className="custom-section">
//                         {section.name && (
//                           <h3 className="custom-section-title">
//                             {section.name}
//                           </h3>
//                         )}
//                         {section.description && (
//                           <div
//                             className="custom-section-content"
//                             dangerouslySetInnerHTML={{
//                               __html: cleanQuillHTML(section.description),
//                             }}
//                           />
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateSeven;

// "use client";
// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   formatMonthYear,
//   MonthYearDisplay,
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { AllData, ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
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

//   // Helper function to render skills
//   const renderSkills = () => {
//     if (!skills || (typeof skills === "string" && !skills.trim())) return null;

//     const cleanedSkills = cleanQuillHTML(skills);

//     if (
//       !cleanedSkills ||
//       cleanedSkills === "<p><br></p>" ||
//       cleanedSkills === ""
//     )
//       return null;

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
//           <div key={project.id || index} className="project-item">
//             <div className="project-header">
//               <div className="project-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={
//                         project.liveUrl.startsWith("http")
//                           ? project.liveUrl
//                           : `https://${project.liveUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={
//                         project.githubUrl.startsWith("http")
//                           ? project.githubUrl
//                           : `https://${project.githubUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="project-description"
//                 dangerouslySetInnerHTML={{
//                   __html: cleanQuillHTML(project.description),
//                 }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — PROFESSIONAL BLACK & WHITE WITH NUNITO FONT
//   ====================================================== */
//   const styles = `
//   /* Import Nunito font */
//   @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');

//  t7-resume body {
//     margin: 0;
//     padding: 0;
//     background: white;
//     font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//   }

//   .t7-resume {
//     width: 210mm;
//     margin: 0 auto;
//     background: white;
//     min-height: 297mm;
//     font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//     color: #111827;
//     text-align: left;
//     box-sizing: border-box;
//   }

//   .t7-resume.is-preview {
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

//   /* Ensure all text elements inherit Nunito font */
//   .t7-resume * {
//     font-family: inherit;
//   }

//   /* Header Section */
//   .t7-resume .resume-header {
//     padding: 40px 50px 25px 50px;
//     border-bottom: 2px solid #000000;
//     text-align: center;
//   }

//   /* Main Content */
//   .t7-resume .resume-main {
//     padding: 30px 50px 45px 50px;
//   }

//   /* Section spacing */
//   .t7-resume .section {
//     margin-bottom: 28px;
//   }

//   .t7-resume .section:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .section-title {
//     font-size: 16px;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 1.5px;
//     color: #000000;
//     margin-bottom: 14px;
//     padding-bottom: 6px;
//     border-bottom: 1px solid #000000;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   /* Experience items */
//   .t7-resume .experience-item {
//     margin-bottom: 22px;
//   }

//   .t7-resume .experience-item:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .experience-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t7-resume .experience-title {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-subtitle {
//     font-size: 13px;
//     font-weight: 500;
//     color: #555555;
//     margin-top: 2px;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-date {
//     font-size: 12px;
//     color: #555555;
//     font-weight: normal;
//     white-space: nowrap;
//     text-align: right;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-description {
//     margin-top: 10px;
//     padding-left: 0;
//     text-align: left;
//   }

//   /* Education items */
//   .t7-resume .education-item {
//     margin-bottom: 20px;
//   }

//   .t7-resume .education-item:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .education-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 5px;
//     text-align: left;
//   }

//   .t7-resume .education-school {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .education-subtitle {
//     font-size: 13px;
//     color: #555555;
//     margin-top: 2px;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .education-date {
//     font-size: 12px;
//     color: #555555;
//     white-space: nowrap;
//     text-align: right;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .education-grade {
//     font-size: 12px;
//     color: #555555;
//     margin-top: 4px;
//     font-weight: 500;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .education-description {
//     margin-top: 8px;
//     text-align: left;
//   }

//   /* Project items */
//   .t7-resume .project-item {
//     margin-bottom: 22px;
//   }

//   .t7-resume .project-item:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 6px;
//     text-align: left;
//   }

//   .t7-resume .project-title {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .project-links {
//     display: flex;
//     gap: 12px;
//     text-align: right;
//   }

//   /* Link styles */
//   .t7-resume .project-link,
//   .t7-resume .link-item {
//     color: #000000 !important;
//     text-decoration: underline !important;
//     text-underline-offset: 2px;
//     font-size: 12px;
//     font-weight: 500;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .project-tech-stack {
//     font-size: 12px;
//     color: #555555;
//     margin: 6px 0 8px 0;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .project-description {
//     margin-top: 8px;
//     font-size: 13px;
//     color: #222222;
//     line-height: 1.45;
//     text-align: left;
//   }

//   /* Skills content - PROPER LIST STYLES */
//   .t7-resume .skills-content {
//     margin-top: 10px;
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//   }

//   .t7-resume .skills-content p {
//     margin: 0 0 8px 0;
//   }

//   /* Unordered lists in skills - show bullets */
//   .t7-resume .skills-content ul {
//     list-style-type: disc !important;
//     margin: 8px 0 8px 0 !important;
//     padding-left: 25px !important;
//   }

//   /* Ordered lists in skills - show numbers */
//   .t7-resume .skills-content ol {
//     list-style-type: decimal !important;
//     margin: 8px 0 8px 0 !important;
//     padding-left: 25px !important;
//   }

//   /* Nested unordered lists */
//   .t7-resume .skills-content ul ul {
//     list-style-type: circle !important;
//     margin-left: 20px !important;
//   }

//   /* Nested ordered lists */
//   .t7-resume .skills-content ol ol {
//     list-style-type: lower-alpha !important;
//     margin-left: 20px !important;
//   }

//   /* List items */
//   .t7-resume .skills-content li {
//     margin-bottom: 6px !important;
//     display: list-item !important;
//     font-family: 'Nunito', sans-serif;
//     line-height: 1.5 !important;
//   }

//   /* Additional content */
//   .t7-resume .additional-content {
//     margin-top: 10px;
//     text-align: left;
//   }

//   .t7-resume .additional-item {
//     font-size: 13px;
//     color: #222222;
//     margin-bottom: 8px;
//     position: relative;
//     padding-left: 18px;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .additional-item:last-child {
//     margin-bottom: 0;
//   }

//   /* Custom sections */
//   .t7-resume .custom-section {
//     margin-bottom: 22px;
//     text-align: left;
//   }

//   .t7-resume .custom-section:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .custom-section-title {
//     font-size: 16px;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 1.5px;
//     color: #000000;
//     margin-bottom: 14px;
//     padding-bottom: 6px;
//     border-bottom: 1px solid #000000;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .custom-section-content {
//     font-size: 13px;
//     color: #222222;
//     line-height: 1.45;
//     margin-left: 18px;
//     text-align: left;
//   }

//   /* Summary */
//   .t7-resume .summary-text {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//     text-align: left;
//     margin-top: 6px;
//   }

//   /* Contact row */
//   .t7-resume .contact-row {
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 20px;
//     font-size: 12px;
//     color: #444444;
//     margin-bottom: 8px;
//     text-align: center;
//   }

//   .t7-resume .address {
//     font-size: 12px;
//     color: #444444;
//     margin-top: 8px;
//     text-align: center;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .links {
//     margin-top: 12px;
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 16px;
//     text-align: center;
//   }

//   /* Name styling */
//   .t7-resume .name {
//     font-size: 26px;
//     font-weight: 700;
//     letter-spacing: 2px;
//     text-transform: uppercase;
//     margin-bottom: 10px;
//     color: #000000;
//     font-family: 'Nunito', sans-serif;
//   }

//   /* Job title styling */
//   .t7-resume .job-title {
//     font-size: 16px;
//     font-weight: 500;
//     letter-spacing: 1px;
//     color: #333333;
//     margin-bottom: 18px;
//     padding-bottom: 14px;
//     border-bottom: 1px solid #cccccc;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .contact-item {
//     font-family: 'Nunito', sans-serif;
//   }

//   /* Experience and Education custom bullet points */
//   .t7-resume .experience-description ul,
//   .t7-resume .education-description ul {
//     list-style-type: none;
//     padding-left: 0;
//     text-align: left;
//     margin: 4px 0 0 0;
//   }

//   .t7-resume .experience-description li,
//   .t7-resume .education-description li {
//     position: relative;
//     padding-left: 18px;
//     margin-bottom: 6px;
//     font-size: 13px;
//     color: #222222;
//     line-height: 1.45;
//     text-align: left;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-description li:last-child,
//   .t7-resume .education-description li:last-child {
//     margin-bottom: 0;
//   }

//   .t7-resume .experience-description li::before,
//   .t7-resume .education-description li::before {
//     content: "•";
//     position: absolute;
//     left: 4px;
//     color: #000000;
//     font-size: 12px;
//   }

//   /* Rich text content styles for other sections */
//   .t7-resume .experience-description ul,
//   .t7-resume .experience-description ol,
//   .t7-resume .education-description ul,
//   .t7-resume .education-description ol,
//   .t7-resume .project-description ul,
//   .t7-resume .project-description ol,
//   .t7-resume .summary-text ul,
//   .t7-resume .summary-text ol,
//   .t7-resume .custom-section-content ul,
//   .t7-resume .custom-section-content ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   /* Default list styles for other sections */
//   .t7-resume .project-description ul {
//     list-style-type: disc !important;
//     padding-left: 20px !important;
//   }

//   .t7-resume .project-description ol {
//     list-style-type: decimal !important;
//     padding-left: 20px !important;
//   }

//   .t7-resume .summary-text ul {
//     list-style-type: disc !important;
//     padding-left: 20px !important;
//   }

//   .t7-resume .summary-text ol {
//     list-style-type: decimal !important;
//     padding-left: 20px !important;
//   }

//   .t7-resume .custom-section-content ul {
//     list-style-type: disc !important;
//     padding-left: 20px !important;
//   }

//   .t7-resume .custom-section-content ol {
//     list-style-type: decimal !important;
//     padding-left: 20px !important;
//   }

//   /* List item styles */
//   .t7-resume .experience-description li,
//   .t7-resume .education-description li,
//   .t7-resume .project-description li,
//   .t7-resume .summary-text li,
//   .t7-resume .custom-section-content li {
//     margin-bottom: 4px !important;
//     font-family: 'Nunito', sans-serif;
//   }

//   /* Text formatting */
//   .t7-resume .experience-description strong,
//   .t7-resume .education-description strong,
//   .t7-resume .project-description strong,
//   .t7-resume .summary-text strong,
//   .t7-resume .custom-section-content strong,
//   .t7-resume .skills-content strong {
//     font-weight: 700 !important;
//   }

//   .t7-resume .experience-description em,
//   .t7-resume .education-description em,
//   .t7-resume .project-description em,
//   .t7-resume .summary-text em,
//   .t7-resume .custom-section-content em,
//   .t7-resume .skills-content em {
//     font-style: italic !important;
//   }

//   .t7-resume .experience-description u,
//   .t7-resume .education-description u,
//   .t7-resume .project-description u,
//   .t7-resume .summary-text u,
//   .t7-resume .custom-section-content u,
//   .t7-resume .skills-content u {
//     text-decoration: underline !important;
//   }

//   /* Preserve spaces in content */
//   .t7-resume .experience-description p,
//   .t7-resume .education-description p,
//   .t7-resume .project-description p,
//   .t7-resume .summary-text p,
//   .t7-resume .custom-section-content p,
//   .t7-resume .skills-content p {
//     white-space: pre-wrap !important;
//     font-family: 'Nunito', sans-serif;
//   }

//   /* Print Styles - Consistent margins for ALL pages */
//   @media print {
//     @page {
//       size: A4;
//       margin: 15mm 12mm !important;
//     }

//     @page :first {
//       margin: 15mm 12mm !important;
//     }

//     * {
//       -webkit-print-color-adjust: exact !important;
//       print-color-adjust: exact !important;
//     }

//     body {
//       margin: 0;
//       padding: 0;
//       background: white;
//       font-family: 'Nunito', sans-serif !important;
//     }

//     .t7-resume {
//       margin: 0;
//       padding: 0;
//       width: 100%;
//       border: none;
//       box-shadow: none;
//       font-family: 'Nunito', sans-serif !important;
//       background: white;
//     }

//     .t7-resume .resume-header {
//       padding: 0px 0px 25px 0px;
//       margin-top: 0;
//     }

//     .t7-resume .resume-main {
//       padding: 30px 0px 45px 0px;
//     }

//     /* Ensure lists show properly in print */
//     .t7-resume .skills-content ul,
//     .t7-resume .skills-content ol {
//       padding-left: 25px !important;
//     }

//     .t7-resume .skills-content ul {
//       list-style-type: disc !important;
//     }

//     .t7-resume .skills-content ol {
//       list-style-type: decimal !important;
//     }

//     .t7-resume .project-description ul,
//     .t7-resume .project-description ol,
//     .t7-resume .summary-text ul,
//     .t7-resume .summary-text ol,
//     .t7-resume .custom-section-content ul,
//     .t7-resume .custom-section-content ol {
//       padding-left: 20px !important;
//     }

//     .t7-resume .section {
//       page-break-inside: avoid;
//       page-break-after: auto;
//     }

//     .t7-resume .experience-item {
//       page-break-inside: avoid;
//     }

//     .t7-resume .project-link,
//     .t7-resume .link-item {
//       color: #000000 !important;
//       text-decoration: underline !important;
//     }

//     .t7-resume * {
//       font-family: 'Nunito', sans-serif !important;
//     }
//   }
// `;

//   const renderDescription = (text: string) => {
//     if (!text) return "";

//     if (text.includes("<") && text.includes(">")) {
//       return `<div class="experience-description">${cleanQuillHTML(text)}</div>`;
//     }

//     const lines = text.split("\n").filter((line) => line.trim() !== "");
//     if (
//       lines.some(
//         (line) => line.trim().startsWith("-") || line.trim().startsWith("•"),
//       )
//     ) {
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
//       return `<div class="experience-description" style="white-space: pre-wrap;">${cleanQuillHTML(text)}</div>`;
//     }
//   };

//   const generateHTML = () => {
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (
//         !cleanedSkills ||
//         cleanedSkills === "<p><br></p>" ||
//         cleanedSkills === ""
//       )
//         return "";

//       return `
//         <div class="section">
//           <h2 class="section-title">Skills</h2>
//           <div class="skills-content">${cleanedSkills}</div>
//         </div>
//       `;
//     };

//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="section">
//           <h2 class="section-title">Projects</h2>
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="project-item">
//               <div class="project-header">
//                 <div class="project-title">${project.title || ""}</div>
//                 <div class="project-links">
//                   ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ""}
//                   ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link" target="_blank" rel="noopener noreferrer">GitHub</a>` : ""}
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
//                 <div class="project-description">${cleanQuillHTML(project.description)}</div>
//               `
//                   : ""
//               }
//             </div>
//           `,
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
//         <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
//         <style>
//           @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');

//           * {
//             font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
//           }

//           body {
//             font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
//             margin: 0;
//             padding: 0;
//             background: white;
//           }

//           ${styles}
//         </style>
//       </head>
//       <body>
//         <div class="t7-resume" style="font-family: 'Nunito', sans-serif;">
//           <!-- HEADER -->
//           <div class="resume-header">
//             <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//             <div class="job-title">${contact?.jobTitle || ""}</div>
//             <div class="contact-row">
//               ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
//               ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
//               ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
//             </div>
//             ${addressParts.length ? `<div class="address">${addressParts.join(" , ")}</div>` : ""}
//             <div class="links">
//               ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item" target="_blank" rel="noopener noreferrer">LinkedIn</a>` : ""}
//               ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item" target="_blank" rel="noopener noreferrer">GitHub</a>` : ""}
//               ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item" target="_blank" rel="noopener noreferrer">Portfolio</a>` : ""}
//             </div>
//           </div>

//           <!-- MAIN CONTENT -->
//           <div class="resume-main">
//             <!-- SUMMARY -->
//             ${
//               summary
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Professional Summary</h2>
//                 <div class="summary-text">${cleanQuillHTML(summary)}</div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- EXPERIENCE -->
//             ${
//               experiences.length > 0
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Experience</h2>
//                 ${experiences
//                   .map((exp) => {
//                     const startFormatted = formatMonthYear(exp.startDate, true);
//                     const endFormatted = exp.endDate
//                       ? formatMonthYear(exp.endDate, true)
//                       : "Present";
//                     return `
//                     <div class="experience-item">
//                       <div class="experience-header">
//                         <div>
//                           <div class="experience-title">${exp.jobTitle || ""}</div>
//                           <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//                         </div>
//                         <div class="experience-date">${startFormatted} — ${endFormatted}</div>
//                       </div>
//                       ${exp.text ? renderDescription(exp.text) : ""}
//                     </div>
//                   `;
//                   })
//                   .join("")}
//               </div>
//             `
//                 : ""
//             }

//             <!-- PROJECTS -->
//             ${generateProjectsHTML()}

//             <!-- EDUCATION -->
//             ${
//               educations.length > 0
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Education</h2>
//                 ${educations
//                   .map((edu) => {
//                     const formattedGrade = formatGradeToCgpdAndPercentage(
//                       edu.grade || "",
//                     );
//                     return `
//                     <div class="education-item">
//                       <div class="education-header">
//                         <div>
//                           <div class="education-school">${edu.schoolname || ""}</div>
//                           <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//                           ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//                         </div>
//                         <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//                       </div>
//                       ${edu.text ? `<div class="education-description">${renderDescription(edu.text)}</div>` : ""}
//                     </div>
//                   `;
//                   })
//                   .join("")}
//               </div>
//             `
//                 : ""
//             }

//             <!-- SKILLS -->
//             ${generateSkillsHTML()}

//             <!-- LANGUAGES -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.languages) &&
//               finalize.languages.some((l) => l.name?.trim())
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Languages</h2>
//                 <div class="additional-content">
//                   ${finalize.languages
//                     .filter((l) => l.name?.trim())
//                     .map(
//                       (l) => `
//                     <div class="additional-item">${l.name}${l.level ? ` — ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- CERTIFICATIONS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.certificationsAndLicenses) &&
//               finalize.certificationsAndLicenses.some((c) =>
//                 c.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Certifications</h2>
//                 <div class="additional-content">
//                   ${finalize.certificationsAndLicenses
//                     .filter((c) => c.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (c) => `
//                     <div class="additional-item">${cleanQuillHTML(c.name || "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- AWARDS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.awardsAndHonors) &&
//               finalize.awardsAndHonors.some((a) =>
//                 a.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Awards & Honors</h2>
//                 <div class="additional-content">
//                   ${finalize.awardsAndHonors
//                     .filter((a) => a.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (a) => `
//                     <div class="additional-item">${cleanQuillHTML(a.name || "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- INTERESTS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.hobbiesAndInterests) &&
//               finalize.hobbiesAndInterests.some((h) =>
//                 h.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">Interests</h2>
//                 <div class="additional-content">
//                   ${finalize.hobbiesAndInterests
//                     .filter((h) => h.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (h) => `
//                     <div class="additional-item">${cleanQuillHTML(h.name || "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- REFERENCES -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.references) &&
//               finalize.references.some((r) =>
//                 r.name?.replace(/<[^>]*>/g, "").trim(),
//               )
//                 ? `
//               <div class="section">
//                 <h2 class="section-title">References</h2>
//                 <div class="additional-content">
//                   ${finalize.references
//                     .filter((r) => r.name?.replace(/<[^>]*>/g, "").trim())
//                     .map(
//                       (r) => `
//                     <div class="additional-item">${cleanQuillHTML(r.name || "")}</div>
//                   `,
//                     )
//                     .join("")}
//                 </div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- CUSTOM SECTIONS -->
//             ${
//               finalize &&
//               !Array.isArray(finalize) &&
//               Array.isArray(finalize.customSection) &&
//               finalize.customSection.some(
//                 (s) => s?.name?.trim() || s?.description?.trim(),
//               )
//                 ? `
//               <div class="section">
//                 ${finalize.customSection                  .filter((s) => s?.name?.trim() || s?.description?.trim())
//                   .map(
//                     (s) => `
//                   <div class="custom-section">
//                     ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
//                     ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//                   </div>
//                 `,
//                   )
//                   .join("")}
//               </div>
//             `
//                 : ""
//             }
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
//     <div style={{ textAlign: "center", marginTop: 0 }}>
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

//       {/* Resume Preview */}
//       <div
//         className={`t7-resume ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//         }}
//       >
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="resume-header">
//           <h1 className="name">
//             {contact?.firstName} {contact?.lastName}
//           </h1>
//           <div className="job-title">{contact?.jobTitle}</div>
//           <div className="contact-row">
//             {contact?.email && (
//               <div className="contact-item">{contact.email}</div>
//             )}
//             {contact?.phone && (
//               <div className="contact-item">{contact.phone}</div>
//             )}
//             {formattedDob && (
//               <div className="contact-item"> {formattedDob}</div>
//             )}
//           </div>
//           {addressParts.length > 0 && (
//             <div className="address">{addressParts.join(" , ")}</div>
//           )}
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
//             {githubUrl && (
//               <a
//                 href={
//                   githubUrl.startsWith("http")
//                     ? githubUrl
//                     : `https://${githubUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 GitHub
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

//         {/* MAIN CONTENT */}
//         <div className="resume-main">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="section">
//               <h2 className="section-title">Professional Summary</h2>
//               <div
//                 className="summary-text"
//                 dangerouslySetInnerHTML={{
//                   __html: cleanQuillHTML(summary),
//                 }}
//               />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="section">
//               <h2 className="section-title">Experience</h2>
//               {experiences.map((exp, i) => {
//                 const start = formatMonthYear(exp.startDate, false);
//                 const end = exp.endDate
//                   ? formatMonthYear(exp.endDate, false)
//                   : exp.startDate
//                     ? "Present"
//                     : "";
//                 return (
//                   <div key={i} className="experience-item">
//                     <div className="experience-header">
//                       <div>
//                         <div className="experience-title">
//                           {exp.jobTitle || ""}
//                         </div>
//                         <div className="experience-subtitle">
//                           {[exp.employer, exp.location]
//                             .filter(Boolean)
//                             .join(" — ")}
//                         </div>
//                       </div>
//                       <div className="experience-date">
//                         {start} — {end}
//                       </div>
//                     </div>
//                     {exp.text && (
//                       <div
//                         className="experience-description"
//                         dangerouslySetInnerHTML={{
//                           __html: cleanQuillHTML(exp.text),
//                         }}
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
//                 const formattedGrade = formatGradeToCgpdAndPercentage(
//                   edu.grade || "",
//                 );
//                 return (
//                   <div key={i} className="education-item">
//                     <div className="education-header">
//                       <div>
//                         <div className="education-school">
//                           {edu.schoolname || ""}
//                         </div>
//                         <div className="education-subtitle">
//                           {[edu.degree, edu.location]
//                             .filter(Boolean)
//                             .join(" — ")}
//                         </div>
//                         {formattedGrade && (
//                           <div className="education-grade">
//                             {formattedGrade}
//                           </div>
//                         )}
//                       </div>
//                       <div className="education-date">
//                         {[edu.startDate, edu.endDate || "Present"]
//                           .filter(Boolean)
//                           .join(" — ")}
//                       </div>
//                     </div>
//                     {edu.text && (
//                       <div
//                         className="education-description"
//                         dangerouslySetInnerHTML={{
//                           __html: cleanQuillHTML(edu.text),
//                         }}
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
//                 <div className="additional-content">
//                   {finalize.languages.map(
//                     (lang, i) =>
//                       lang.name?.trim() && (
//                         <div key={i} className="additional-item">
//                           {lang.name}
//                           {lang.level &&
//                             ` — ${Math.round((Number(lang.level) / 4) * 100)}%`}
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CERTIFICATIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some((c) =>
//               c.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Certifications</h2>
//                 <div className="additional-content">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(item.name || ""),
//                           }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* AWARDS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.awardsAndHonors) &&
//             finalize.awardsAndHonors.some((a) =>
//               a.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Awards & Honors</h2>
//                 <div className="additional-content">
//                   {finalize.awardsAndHonors.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(item.name || ""),
//                           }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* INTERESTS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some((h) =>
//               h.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">Interests</h2>
//                 <div className="additional-content">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(item.name || ""),
//                           }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* REFERENCES */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.references) &&
//             finalize.references.some((r) =>
//               r.name?.replace(/<[^>]*>/g, "").trim(),
//             ) && (
//               <div className="section">
//                 <h2 className="section-title">References</h2>
//                 <div className="additional-content">
//                   {finalize.references.map(
//                     (item, i) =>
//                       item.name?.replace(/<[^>]*>/g, "").trim() && (
//                         <div
//                           key={i}
//                           className="additional-item"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(item.name || ""),
//                           }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* CUSTOM SECTIONS */}
//           {finalize &&
//             !Array.isArray(finalize) &&
//             Array.isArray(finalize.customSection) &&
//             finalize.customSection.some(
//               (s) => s?.name?.trim() || s?.description?.trim(),
//             ) && (
//               <div className="section">
//                 {finalize.customSection.map(
//                   (section, i) =>
//                     (section?.name?.trim() || section?.description?.trim()) && (
//                       <div key={i} className="custom-section">
//                         {section.name && (
//                           <h3 className="custom-section-title">
//                             {section.name}
//                           </h3>
//                         )}
//                         {section.description && (
//                           <div
//                             className="custom-section-content"
//                             dangerouslySetInnerHTML={{
//                               __html: cleanQuillHTML(section.description),
//                             }}
//                           />
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateSeven;

// "use client";
// import React, { useContext } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
//   formatMonthYear,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills?.text || context?.skills.text || "";
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

//   // Helper function to render skills
//   const renderSkills = () => {
//     if (!skills || (typeof skills === "string" && !skills.trim())) return null;

//     const cleanedSkills = cleanQuillHTML(skills);

//     if (
//       !cleanedSkills ||
//       cleanedSkills === "<p><br></p>" ||
//       cleanedSkills === ""
//     )
//       return null;

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
//           <div key={project.id || index} className="project-item">
//             <div className="project-header">
//               <div className="project-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={
//                         project.liveUrl.startsWith("http")
//                           ? project.liveUrl
//                           : `https://${project.liveUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={
//                         project.githubUrl.startsWith("http")
//                           ? project.githubUrl
//                           : `https://${project.githubUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(", ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="project-description"
//                 dangerouslySetInnerHTML={{
//                   __html: cleanQuillHTML(project.description),
//                 }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — PROFESSIONAL BLACK & WHITE WITH NUNITO FONT
//      Based on TemplateOne's working logic
//   ====================================================== */
//   const styles = `
//   .t7-resume body {
//     margin: 0;
//     padding: 0;
//     background: white;
//     font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//   }

//   .t7-resume {
//     width: 210mm;
//     padding: 15mm;
//     box-sizing: border-box;
//     background: white;
//     font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//     color: #111827;
//     text-align: left;
//   }

//   .t7-resume.is-preview {
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

//   /* Global <p> reset */
//   .t7-resume p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//   }

//   /* Header Section */
//   .t7-resume .resume-header {
//     text-align: center;
//     margin-bottom: 20px;
//     padding-bottom: 15px;
//     border-bottom: 2px solid #000000;
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   .t7-resume .name {
//     font-size: 28px;
//     font-weight: 700;
//     letter-spacing: 2px;
//     text-transform: uppercase;
//     margin-bottom: 8px;
//     color: #000000;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .job-title {
//     font-size: 16px;
//     font-weight: 500;
//     color: #333333;
//     margin-bottom: 12px;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .contact-row {
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 16px;
//     font-size: 12px;
//     color: #444444;
//     margin-bottom: 8px;
//   }

//   .t7-resume .address {
//     font-size: 12px;
//     color: #444444;
//     margin-top: 4px;
//   }

//   .t7-resume .links {
//     margin-top: 8px;
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 16px;
//   }

//   .t7-resume .link-item {
//     color: #000000;
//     text-decoration: underline;
//     font-size: 12px;
//   }

//   /* Section Styles */
//   .t7-resume .section {
//     margin-bottom: 20px;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .section-title {
//   font-size: 16px;
//   font-weight: 700;
//   text-transform: uppercase;
//   letter-spacing: 1.5px;
//   color: #000000;
//   margin-bottom: 12px;
//   padding-bottom: 6px;
//   border-bottom: 1px solid #000000;
//   text-align: center !important;
//   font-family: 'Nunito', sans-serif;
//   page-break-after: avoid;
//   break-after: avoid;
// }

//   /* Experience Items */
//   .t7-resume .experience-item {
//     margin-bottom: 20px;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .experience-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 8px;
//   }

//   .t7-resume .experience-title {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-subtitle {
//     font-size: 13px;
//     font-weight: 500;
//     color: #555555;
//     margin-top: 2px;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-date {
//     font-size: 12px;
//     color: #555555;
//     white-space: nowrap;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-description {
//     margin-top: 8px;
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//   }

//   /* Education Items */
//   .t7-resume .education-item {
//     margin-bottom: 20px;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .education-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 8px;
//   }

//   .t7-resume .education-school {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .education-subtitle {
//     font-size: 13px;
//     color: #555555;
//     margin-top: 2px;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .education-date {
//     font-size: 12px;
//     color: #555555;
//     white-space: nowrap;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .education-grade {
//     font-size: 12px;
//     color: #555555;
//     margin-top: 4px;
//     font-weight: 500;
//     display: inline-block;
//   }

//   .t7-resume .education-description {
//     margin-top: 8px;
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//   }

//   /* Project Items */
//   .t7-resume .project-item {
//     margin-bottom: 16px;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 6px;
//   }

//   .t7-resume .project-title {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t7-resume .project-link {
//     color: #000000;
//     text-decoration: underline;
//     font-size: 12px;
//   }

//   .t7-resume .project-tech-stack {
//     font-size: 12px;
//     color: #555555;
//     margin: 4px 0 6px;
//   }

//   .t7-resume .project-description {
//     margin-top: 6px;
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//   }

//   /* Skills Content - PROPER LIST STYLES (from TemplateOne) */
//   .t7-resume .skills-content {
//     padding: 0 5px;
//   }

//   .t7-resume .skills-content ul,
//   .t7-resume .skills-content ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t7-resume .skills-content ul {
//     list-style-type: disc !important;
//   }

//   .t7-resume .skills-content ol {
//     list-style-type: decimal !important;
//   }

//   .t7-resume .skills-content li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .skills-content p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//   }

//   .t7-resume .skills-content strong {
//     font-weight: 700 !important;
//   }

//   .t7-resume .skills-content em {
//     font-style: italic !important;
//   }

//   /* Additional Content (Languages, Certifications, etc.) */
//   .t7-resume .additional-content {
//     margin-top: 8px;
//   }

//   .t7-resume .additional-item {
//     font-size: 13px;
//     color: #222222;
//     margin-bottom: 6px;
//     position: relative;
//     padding-left: 18px;
//   }

//   .t7-resume .additional-item::before {
//     content: "•";
//     position: absolute;
//     left: 4px;
//     color: #000000;
//   }

//   /* Custom Sections */
//   .t7-resume .custom-section {
//     margin-bottom: 16px;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .custom-section-title {
//     font-size: 15px;
//     font-weight: 700;
//     margin-bottom: 8px;
//     color: #000000;
//   }

//   .t7-resume .custom-section-content {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//   }

//   /* Summary */
//   .t7-resume .summary-text {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//     margin-top: 6px;
//   }

//   /* Rich Text Content Styles (from TemplateOne) */
//   .t7-resume .experience-description ul,
//   .t7-resume .experience-description ol,
//   .t7-resume .education-description ul,
//   .t7-resume .education-description ol,
//   .t7-resume .project-description ul,
//   .t7-resume .project-description ol,
//   .t7-resume .custom-section-content ul,
//   .t7-resume .custom-section-content ol,
//   .t7-resume .summary-text ul,
//   .t7-resume .summary-text ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t7-resume .experience-description li,
//   .t7-resume .education-description li,
//   .t7-resume .project-description li,
//   .t7-resume .custom-section-content li,
//   .t7-resume .summary-text li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .experience-description strong,
//   .t7-resume .education-description strong,
//   .t7-resume .project-description strong,
//   .t7-resume .custom-section-content strong,
//   .t7-resume .summary-text strong {
//     font-weight: 700 !important;
//   }

//   .t7-resume .experience-description em,
//   .t7-resume .education-description em,
//   .t7-resume .project-description em,
//   .t7-resume .custom-section-content em,
//   .t7-resume .summary-text em {
//     font-style: italic !important;
//   }

//   .t7-resume .experience-description u,
//   .t7-resume .education-description u,
//   .t7-resume .project-description u,
//   .t7-resume .custom-section-content u,
//   .t7-resume .summary-text u {
//     text-decoration: underline !important;
//   }

//   /* Resume Lists */
//   .t7-resume .resume-list {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t7-resume ol.resume-list {
//     list-style-type: decimal !important;
//   }

//   .t7-resume ul.resume-list {
//     list-style-type: disc !important;
//   }

//   .t7-resume .resume-list li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   /* Preserve spaces in content */
//   .t7-resume .experience-description p,
//   .t7-resume .education-description p,
//   .t7-resume .project-description p,
//   .t7-resume .summary-text p,
//   .t7-resume .custom-section-content p,
//   .t7-resume .skills-content p {
//     white-space: pre-wrap !important;
//   }

//   /* Print Styles (from TemplateOne) */
//   @media print {
//     @page {
//       size: A4;
//       margin-top: 15mm !important;
//     }
    
//     @page :first {
//       margin: 0mm !important;
//     }

//     * {
//       -webkit-print-color-adjust: exact !important;
//       print-color-adjust: exact !important;
//     }

//     body {
//       margin: 0;
//       padding: 0;
//       background: white;
//     }

//     .t7-resume {
//       margin: 0;
//       padding: 15mm;
//       width: 100%;
//       border: none;
//       box-shadow: none;
//       background: white;
//     }

//     .t7-resume .resume-header {
//       margin-top: 0;
//       padding-top: 0;
//     }

//     .t7-resume .section {
//       page-break-inside: avoid;
//     }

//     .t7-resume .experience-item {
//       page-break-inside: avoid;
//     }

//     .t7-resume .project-link,
//     .t7-resume .link-item {
//       color: #000000 !important;
//       text-decoration: underline !important;
//     }
//   }
// `;

//   /* ======================================================
//      HTML GENERATION — for PDF download
//   ====================================================== */
//   const generateHTML = () => {
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (
//         !cleanedSkills ||
//         cleanedSkills === "<p><br></p>" ||
//         cleanedSkills === ""
//       )
//         return "";

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
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="project-item">
//               <div class="project-header">
//                 <div class="project-title">${project.title || ""}</div>
//                 ${
//                   project.liveUrl || project.githubUrl
//                     ? `
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 `
//                     : ""
//                 }
//               </div>
//               ${
//                 project.techStack && project.techStack.length > 0
//                   ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(", ")}</div>
//               `
//                   : ""
//               }
//               ${
//                 project.description
//                   ? `
//                 <div class="project-description">${cleanQuillHTML(project.description)}</div>
//               `
//                   : ""
//               }
//             </div>
//           `,
//             )
//             .join("")}
//         </div>
//       `;
//     };

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t7-resume">

//   <!-- HEADER -->
//   <div class="resume-header">
//     <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//     <div class="job-title">${contact?.jobTitle || ""}</div>
//     <div class="contact-row">
//       ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
//       ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
//       ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
//     </div>
//     ${addressParts.length ? `<div class="address">${addressParts.join(" , ")}</div>` : ""}
//     <div class="links">
//       ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
//       ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item">GitHub</a>` : ""}
//       ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
//     </div>
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `
//   <div class="section">
//     <h2 class="section-title">Professional Summary</h2>
//     <div class="summary-text">${cleanQuillHTML(summary)}</div>
//   </div>
//   `
//       : ""
//   }

//   <!-- EXPERIENCE -->
//   ${
//     experiences.length > 0
//       ? `
//   <div class="section">
//     <h2 class="section-title">Experience</h2>
//     ${experiences
//       .map((exp) => {
//         const startFormatted = formatMonthYear(exp.startDate, false);
//         const endFormatted = exp.endDate
//           ? formatMonthYear(exp.endDate, false)
//           : "Present";
//         return `
//         <div class="experience-item">
//           <div class="experience-header">
//             <div>
//               <div class="experience-title">${exp.jobTitle || ""}</div>
//               <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//             </div>
//             <div class="experience-date">${startFormatted} — ${endFormatted}</div>
//           </div>
//           ${
//             exp.text
//               ? `<div class="experience-description">${cleanQuillHTML(exp.text)}</div>`
//               : ""
//           }
//         </div>
//       `;
//       })
//       .join("")}
//   </div>
//   `
//       : ""
//   }

//   <!-- PROJECTS -->
//   ${generateProjectsHTML()}

//   <!-- EDUCATION -->
//   ${
//     educations.length > 0
//       ? `
//   <div class="section">
//     <h2 class="section-title">Education</h2>
//     ${educations
//       .map((edu) => {
//         const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//         return `
//         <div class="education-item">
//           <div class="education-header">
//             <div>
//               <div class="education-school">${edu.schoolname || ""}</div>
//               <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//               ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//             </div>
//             <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//           </div>
//           ${edu.text ? `<div class="education-description">${cleanQuillHTML(edu.text)}</div>` : ""}
//         </div>
//       `;
//       })
//       .join("")}
//   </div>
//   `
//       : ""
//   }

//   <!-- SKILLS -->
//   ${generateSkillsHTML()}

  

 

//   <!-- CUSTOM SECTIONS -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.customSection) &&
//     finalize.customSection.some(
//       (s) => s?.name?.trim() || s?.description?.trim(),
//     )
//       ? `
//   <div class="section">
//     ${finalize.customSection
//       .filter((s) => s?.name?.trim() || s?.description?.trim())
//       .map(
//         (s) => `
//       <div class="custom-section">
//         ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
//         ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//       </div>
//     `,
//       )
//       .join("")}
//   </div>
//   `
//       : ""
//   }

// </div>
// </body>
// </html>`;
//   };

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const html: string = generateHTML();

//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" },
//       );

//       const pdfBlob: Blob = res.data;

//       const url: string = URL.createObjectURL(pdfBlob);
//       const a: HTMLAnchorElement = document.createElement("a");

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

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <>
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
//         className={`t7-resume bg-white ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//           minHeight: "297mm",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="resume-header">
//           <h1 className="name">
//             {contact?.firstName} {contact?.lastName}
//           </h1>
//           <div className="job-title">{contact?.jobTitle}</div>
//           <div className="contact-row">
//             {contact?.email && (
//               <div className="contact-item">{contact.email}</div>
//             )}
//             {contact?.phone && (
//               <div className="contact-item">{contact.phone}</div>
//             )}
//             {dateOfBirth && (
//               <div className="contact-item">
//                 {formatDateOfBirth(dateOfBirth)}
//               </div>
//             )}
//           </div>
//           {addressParts.length > 0 && (
//             <div className="address">{addressParts.join(" , ")}</div>
//           )}
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
//             {githubUrl && (
//               <a
//                 href={
//                   githubUrl.startsWith("http")
//                     ? githubUrl
//                     : `https://${githubUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 GitHub
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
//           <div className="section">
//             <h2 className="section-title">Professional Summary</h2>
//             <div
//               className="summary-text"
//               dangerouslySetInnerHTML={{
//                 __html: cleanQuillHTML(summary),
//               }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section">
//             <h2 className="section-title">Experience</h2>
//             {experiences.map((exp, i) => {
//               const start = formatMonthYear(exp.startDate, false);
//               const end = exp.endDate
//                 ? formatMonthYear(exp.endDate, false)
//                 : "Present";
//               return (
//                 <div key={i} className="experience-item">
//                   <div className="experience-header">
//                     <div>
//                       <div className="experience-title">
//                         {exp.jobTitle || ""}
//                       </div>
//                       <div className="experience-subtitle">
//                         {[exp.employer, exp.location]
//                           .filter(Boolean)
//                           .join(" — ")}
//                       </div>
//                     </div>
//                     <div className="experience-date">
//                       {start} — {end}
//                     </div>
//                   </div>
//                   {exp.text && (
//                     <div
//                       className="experience-description"
//                       dangerouslySetInnerHTML={{
//                         __html: cleanQuillHTML(exp.text),
//                       }}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* PROJECTS */}
//         {renderProjects()}

//         {/* EDUCATION */}
//         {educations.length > 0 && (
//           <div className="section">
//             <h2 className="section-title">Education</h2>
//             {educations.map((edu, i) => {
//               const formattedGrade = formatGradeToCgpdAndPercentage(
//                 edu.grade || "",
//               );
//               return (
//                 <div key={i} className="education-item">
//                   <div className="education-header">
//                     <div>
//                       <div className="education-school">
//                         {edu.schoolname || ""}
//                       </div>
//                       <div className="education-subtitle">
//                         {[edu.degree, edu.location].filter(Boolean).join(" — ")}
//                       </div>
//                       {formattedGrade && (
//                         <div className="education-grade">{formattedGrade}</div>
//                       )}
//                     </div>
//                     <div className="education-date">
//                       {[edu.startDate, edu.endDate || "Present"]
//                         .filter(Boolean)
//                         .join(" — ")}
//                     </div>
//                   </div>
//                   {edu.text && (
//                     <div
//                       className="education-description"
//                       dangerouslySetInnerHTML={{
//                         __html: cleanQuillHTML(edu.text),
//                       }}
//                     />
//                   )}
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
//             (s) => s?.name?.trim() || s?.description?.trim(),
//           ) && (
//             <div className="section">
//               {finalize.customSection.map(
//                 (section, i) =>
//                   (section?.name?.trim() || section?.description?.trim()) && (
//                     <div key={i} className="custom-section">
//                       {section.name && (
//                         <h3 className="custom-section-title">{section.name}</h3>
//                       )}
//                       {section.description && (
//                         <div
//                           className="custom-section-content"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(section.description),
//                           }}
//                         />
//                       )}
//                     </div>
//                   ),
//               )}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default TemplateSeven;

















// "use client";
// import React, { useContext } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
//   formatMonthYear,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills?.text || context?.skills.text || "";
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

//   // Helper function to render skills
//   const renderSkills = () => {
//     if (!skills || (typeof skills === "string" && !skills.trim())) return null;

//     const cleanedSkills = cleanQuillHTML(skills);

//     if (
//       !cleanedSkills ||
//       cleanedSkills === "<p><br></p>" ||
//       cleanedSkills === ""
//     )
//       return null;

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
//           <div key={project.id || index} className="project-item">
//             <div className="project-header">
//               <div className="project-title">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={
//                         project.liveUrl.startsWith("http")
//                           ? project.liveUrl
//                           : `https://${project.liveUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={
//                         project.githubUrl.startsWith("http")
//                           ? project.githubUrl
//                           : `https://${project.githubUrl}`
//                       }
//                       target="_blank"
//                       rel="noreferrer"
//                       className="project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="project-tech-stack">
//                 <strong>Tech:</strong> {project.techStack.join(", ")}
//               </div>
//             )}
//             {project.description && (
//               <div
//                 className="project-description"
//                 dangerouslySetInnerHTML={{
//                   __html: cleanQuillHTML(project.description),
//                 }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — PROFESSIONAL BLACK & WHITE WITH NUNITO FONT
//   ====================================================== */
//   const styles = `
//   .t7-resume body {
//     margin: 0;
//     padding: 0;
//     background: white;
//     font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//   }

//   .t7-resume {
//     width: 210mm;
//     padding: 15mm;
//     box-sizing: border-box;
//     background: white;
//     font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//     font-size: 14px;
//     line-height: 1.5;
//     color: #111827;
//     text-align: left;
//   }

//   .t7-resume.is-preview {
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

//   /* Global <p> reset */
//   .t7-resume p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//   }

//   /* Header Section */
//   .t7-resume .resume-header {
//     text-align: center;
//     margin-bottom: 20px;
//     padding-bottom: 15px;
//     border-bottom: 2px solid #000000;
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   .t7-resume .name {
//     font-size: 28px;
//     font-weight: 700;
//     letter-spacing: 2px;
//     text-transform: uppercase;
//     margin-bottom: 8px;
//     color: #000000;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .job-title {
//     font-size: 16px;
//     font-weight: 500;
//     color: #333333;
//     margin-bottom: 12px;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .contact-row {
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 16px;
//     font-size: 12px;
//     color: #444444;
//     margin-bottom: 8px;
//   }

//   .t7-resume .address {
//     font-size: 12px;
//     color: #444444;
//     margin-top: 4px;
//   }

//   .t7-resume .links {
//     margin-top: 8px;
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     gap: 16px;
//   }

//   .t7-resume .link-item {
//     color: #000000;
//     text-decoration: underline;
//     font-size: 12px;
//   }

//   /* Section Styles */
//   .t7-resume .section {
//     margin-bottom: 20px;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .section-title {
//     font-size: 16px;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 1.5px;
//     color: #000000;
//     margin-bottom: 12px;
//     padding-bottom: 6px;
//     border-bottom: 1px solid #000000;
//     text-align: center !important;
//     font-family: 'Nunito', sans-serif;
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   /* Custom Section Title - Same as other section titles */
//   .t7-resume .custom-section-title {
//     font-size: 16px;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 1.5px;
//     color: #000000;
//     margin-bottom: 12px;
//     padding-bottom: 6px;
//     border-bottom: 1px solid #000000;
//     text-align: center !important;
//     font-family: 'Nunito', sans-serif;
//     page-break-after: avoid;
//     break-after: avoid;
//   }

//   /* Experience Items */
//   .t7-resume .experience-item {
//     margin-bottom: 20px;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .experience-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 8px;
//   }

//   .t7-resume .experience-title {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-subtitle {
//     font-size: 13px;
//     font-weight: 500;
//     color: #555555;
//     margin-top: 2px;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-date {
//     font-size: 12px;
//     color: #555555;
//     white-space: nowrap;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .experience-description {
//     margin-top: 8px;
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//   }

//   /* Education Items */
//   .t7-resume .education-item {
//     margin-bottom: 20px;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .education-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 8px;
//   }

//   .t7-resume .education-school {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .education-subtitle {
//     font-size: 13px;
//     color: #555555;
//     margin-top: 2px;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .education-date {
//     font-size: 12px;
//     color: #555555;
//     white-space: nowrap;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .education-grade {
//     font-size: 12px;
//     color: #555555;
//     margin-top: 4px;
//     font-weight: 500;
//     display: inline-block;
//   }

//   .t7-resume .education-description {
//     margin-top: 8px;
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//   }

//   /* Project Items */
//   .t7-resume .project-item {
//     margin-bottom: 16px;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .project-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: baseline;
//     flex-wrap: wrap;
//     gap: 10px;
//     margin-bottom: 6px;
//   }

//   .t7-resume .project-title {
//     font-size: 15px;
//     font-weight: 700;
//     color: #000000;
//     font-family: 'Nunito', sans-serif;
//   }

//   .t7-resume .project-links {
//     display: flex;
//     gap: 12px;
//   }

//   .t7-resume .project-link {
//     color: #000000;
//     text-decoration: underline;
//     font-size: 12px;
//   }

//   .t7-resume .project-tech-stack {
//     font-size: 12px;
//     color: #555555;
//     margin: 4px 0 6px;
//   }

//   .t7-resume .project-description {
//     margin-top: 6px;
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//   }

//   /* Skills Content */
//   .t7-resume .skills-content {
//     padding: 0 5px;
//   }

//   .t7-resume .skills-content ul,
//   .t7-resume .skills-content ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t7-resume .skills-content ul {
//     list-style-type: disc !important;
//   }

//   .t7-resume .skills-content ol {
//     list-style-type: decimal !important;
//   }

//   .t7-resume .skills-content li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .skills-content p {
//     margin: 0 0 6px 0 !important;
//     padding: 0 !important;
//     line-height: 1.5 !important;
//   }

//   .t7-resume .skills-content strong {
//     font-weight: 700 !important;
//   }

//   .t7-resume .skills-content em {
//     font-style: italic !important;
//   }

//   /* Custom Section Content */
//   .t7-resume .custom-section {
//     margin-bottom: 20px;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .custom-section-content {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//   }

//   /* Summary */
//   .t7-resume .summary-text {
//     font-size: 13px;
//     line-height: 1.5;
//     color: #222222;
//     margin-top: 6px;
//   }

//   /* Rich Text Content Styles */
//   .t7-resume .experience-description ul,
//   .t7-resume .experience-description ol,
//   .t7-resume .education-description ul,
//   .t7-resume .education-description ol,
//   .t7-resume .project-description ul,
//   .t7-resume .project-description ol,
//   .t7-resume .custom-section-content ul,
//   .t7-resume .custom-section-content ol,
//   .t7-resume .summary-text ul,
//   .t7-resume .summary-text ol {
//     margin: 8px 0 8px 20px !important;
//     padding-left: 0 !important;
//   }

//   .t7-resume .experience-description li,
//   .t7-resume .education-description li,
//   .t7-resume .project-description li,
//   .t7-resume .custom-section-content li,
//   .t7-resume .summary-text li {
//     margin-bottom: 4px !important;
//     line-height: 1.5 !important;
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .t7-resume .experience-description strong,
//   .t7-resume .education-description strong,
//   .t7-resume .project-description strong,
//   .t7-resume .custom-section-content strong,
//   .t7-resume .summary-text strong {
//     font-weight: 700 !important;
//   }

//   .t7-resume .experience-description em,
//   .t7-resume .education-description em,
//   .t7-resume .project-description em,
//   .t7-resume .custom-section-content em,
//   .t7-resume .summary-text em {
//     font-style: italic !important;
//   }

//   .t7-resume .experience-description u,
//   .t7-resume .education-description u,
//   .t7-resume .project-description u,
//   .t7-resume .custom-section-content u,
//   .t7-resume .summary-text u {
//     text-decoration: underline !important;
//   }

//   /* Preserve spaces in content */
//   .t7-resume .experience-description p,
//   .t7-resume .education-description p,
//   .t7-resume .project-description p,
//   .t7-resume .summary-text p,
//   .t7-resume .custom-section-content p,
//   .t7-resume .skills-content p {
//     white-space: pre-wrap !important;
//   }













  

//   /* Print Styles */
//   @media print {
//     @page {
//       size: A4;
//       margin-top: 15mm !important;
//     }
    
//     @page :first {
//       margin: 0mm !important;
//     }

//     * {
//       -webkit-print-color-adjust: exact !important;
//       print-color-adjust: exact !important;
//     }

//     body {
//       margin: 0;
//       padding: 0;
//       background: white;
//     }

//     .t7-resume {
//       margin: 0;
//       padding: 15mm;
//       width: 100%;
//       border: none;
//       box-shadow: none;
//       background: white;
//     }

//     .t7-resume .resume-header {
//       margin-top: 0;
//       padding-top: 0;
//     }

//     .t7-resume .section {
//       page-break-inside: avoid;
//     }

//     .t7-resume .experience-item {
//       page-break-inside: avoid;
//     }

//     .t7-resume .project-link,
//     .t7-resume .link-item {
//       color: #000000 !important;
//       text-decoration: underline !important;
//     }
//   }
// `;

//   /* ======================================================
//      HTML GENERATION — for PDF download
//   ====================================================== */
//   const generateHTML = () => {
//     const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || (typeof skills === "string" && !skills.trim())) return "";

//       const cleanedSkills = cleanQuillHTML(skills);
//       if (
//         !cleanedSkills ||
//         cleanedSkills === "<p><br></p>" ||
//         cleanedSkills === ""
//       )
//         return "";

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
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="project-item">
//               <div class="project-header">
//                 <div class="project-title">${project.title || ""}</div>
//                 ${
//                   project.liveUrl || project.githubUrl
//                     ? `
//                   <div class="project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
//                   </div>
//                 `
//                     : ""
//                 }
//               </div>
//               ${
//                 project.techStack && project.techStack.length > 0
//                   ? `
//                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(", ")}</div>
//               `
//                   : ""
//               }
//               ${
//                 project.description
//                   ? `
//                 <div class="project-description">${cleanQuillHTML(project.description)}</div>
//               `
//                   : ""
//               }
//             </div>
//           `,
//             )
//             .join("")}
//         </div>
//       `;
//     };

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t7-resume">

//   <!-- HEADER -->
//   <div class="resume-header">
//     <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//     <div class="job-title">${contact?.jobTitle || ""}</div>
//     <div class="contact-row">
//       ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
//       ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
//       ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
//     </div>
//     ${addressParts.length ? `<div class="address">${addressParts.join(" , ")}</div>` : ""}
//     <div class="links">
//       ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
//       ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item">GitHub</a>` : ""}
//       ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
//     </div>
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `
//   <div class="section">
//     <h2 class="section-title">Professional Summary</h2>
//     <div class="summary-text">${cleanQuillHTML(summary)}</div>
//   </div>
//   `
//       : ""
//   }

//   <!-- EXPERIENCE -->
//   ${
//     experiences.length > 0
//       ? `
//   <div class="section">
//     <h2 class="section-title">Experience</h2>
//     ${experiences
//       .map((exp) => {
//         const startFormatted = formatMonthYear(exp.startDate, false);
//         const endFormatted = exp.endDate
//           ? formatMonthYear(exp.endDate, false)
//           : "Present";
//         return `
//         <div class="experience-item">
//           <div class="experience-header">
//             <div>
//               <div class="experience-title">${exp.jobTitle || ""}</div>
//               <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
//             </div>
//             <div class="experience-date">${startFormatted} — ${endFormatted}</div>
//           </div>
//           ${
//             exp.text
//               ? `<div class="experience-description">${cleanQuillHTML(exp.text)}</div>`
//               : ""
//           }
//         </div>
//       `;
//       })
//       .join("")}
//   </div>
//   `
//       : ""
//   }

//   <!-- PROJECTS -->
//   ${generateProjectsHTML()}

//   <!-- EDUCATION -->
//   ${
//     educations.length > 0
//       ? `
//   <div class="section">
//     <h2 class="section-title">Education</h2>
//     ${educations
//       .map((edu) => {
//         const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
//         return `
//         <div class="education-item">
//           <div class="education-header">
//             <div>
//               <div class="education-school">${edu.schoolname || ""}</div>
//               <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
//               ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
//             </div>
//             <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
//           </div>
//           ${edu.text ? `<div class="education-description">${cleanQuillHTML(edu.text)}</div>` : ""}
//         </div>
//       `;
//       })
//       .join("")}
//   </div>
//   `
//       : ""
//   }

//   <!-- SKILLS -->
//   ${generateSkillsHTML()}

//   <!-- CUSTOM SECTIONS -->
//   ${
//     finalize &&
//     !Array.isArray(finalize) &&
//     Array.isArray(finalize.customSection) &&
//     finalize.customSection.some(
//       (s) => s?.name?.trim() || s?.description?.trim(),
//     )
//       ? `
//   <div class="section">
//     ${finalize.customSection
//       .filter((s) => s?.name?.trim() || s?.description?.trim())
//       .map(
//         (s) => `
//       <div class="custom-section">
//         ${s.name ? `<h2 class="custom-section-title">${s.name}</h2>` : ""}
//         ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
//       </div>
//     `,
//       )
//       .join("")}
//   </div>
//   `
//       : ""
//   }

// </div>
// </body>
// </html>`;
//   };

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async (): Promise<void> => {
//     try {
//       const html: string = generateHTML();

//       const res: AxiosResponse<Blob> = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" },
//       );

//       const pdfBlob: Blob = res.data;

//       const url: string = URL.createObjectURL(pdfBlob);
//       const a: HTMLAnchorElement = document.createElement("a");

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

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
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

//       <div
//         className={`t7-resume bg-white ${alldata ? "is-preview" : ""}`}
//         style={{
//           margin: "0 auto",
//           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
//           minHeight: "297mm",
//         }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="resume-header">
//           <h1 className="name">
//             {contact?.firstName} {contact?.lastName}
//           </h1>
//           <div className="job-title">{contact?.jobTitle}</div>
//           <div className="contact-row">
//             {contact?.email && (
//               <div className="contact-item">{contact.email}</div>
//             )}
//             {contact?.phone && (
//               <div className="contact-item">{contact.phone}</div>
//             )}
//             {dateOfBirth && (
//               <div className="contact-item">
//                 {formatDateOfBirth(dateOfBirth)}
//               </div>
//             )}
//           </div>
//           {addressParts.length > 0 && (
//             <div className="address">{addressParts.join(" , ")}</div>
//           )}
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
//             {githubUrl && (
//               <a
//                 href={
//                   githubUrl.startsWith("http")
//                     ? githubUrl
//                     : `https://${githubUrl}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 GitHub
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
//           <div className="section">
//             <h2 className="section-title">Professional Summary</h2>
//             <div
//               className="summary-text"
//               dangerouslySetInnerHTML={{
//                 __html: cleanQuillHTML(summary),
//               }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section">
//             <h2 className="section-title">Experience</h2>
//             {experiences.map((exp, i) => {
//               const start = formatMonthYear(exp.startDate, false);
//               const end = exp.endDate
//                 ? formatMonthYear(exp.endDate, false)
//                 : "Present";
//               return (
//                 <div key={i} className="experience-item">
//                   <div className="experience-header">
//                     <div>
//                       <div className="experience-title">
//                         {exp.jobTitle || ""}
//                       </div>
//                       <div className="experience-subtitle">
//                         {[exp.employer, exp.location]
//                           .filter(Boolean)
//                           .join(" — ")}
//                       </div>
//                     </div>
//                     <div className="experience-date">
//                       {start} — {end}
//                     </div>
//                   </div>
//                   {exp.text && (
//                     <div
//                       className="experience-description"
//                       dangerouslySetInnerHTML={{
//                         __html: cleanQuillHTML(exp.text),
//                       }}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* PROJECTS */}
//         {renderProjects()}

//         {/* EDUCATION */}
//         {educations.length > 0 && (
//           <div className="section">
//             <h2 className="section-title">Education</h2>
//             {educations.map((edu, i) => {
//               const formattedGrade = formatGradeToCgpdAndPercentage(
//                 edu.grade || "",
//               );
//               return (
//                 <div key={i} className="education-item">
//                   <div className="education-header">
//                     <div>
//                       <div className="education-school">
//                         {edu.schoolname || ""}
//                       </div>
//                       <div className="education-subtitle">
//                         {[edu.degree, edu.location].filter(Boolean).join(" — ")}
//                       </div>
//                       {formattedGrade && (
//                         <div className="education-grade">{formattedGrade}</div>
//                       )}
//                     </div>
//                     <div className="education-date">
//                       {[edu.startDate, edu.endDate || "Present"]
//                         .filter(Boolean)
//                         .join(" — ")}
//                     </div>
//                   </div>
//                   {edu.text && (
//                     <div
//                       className="education-description"
//                       dangerouslySetInnerHTML={{
//                         __html: cleanQuillHTML(edu.text),
//                       }}
//                     />
//                   )}
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
//             (s) => s?.name?.trim() || s?.description?.trim(),
//           ) && (
//             <div className="section">
//               {finalize.customSection.map(
//                 (section, i) =>
//                   (section?.name?.trim() || section?.description?.trim()) && (
//                     <div key={i} className="custom-section">
//                       {section.name && (
//                         <h2 className="custom-section-title">{section.name}</h2>
//                       )}
//                       {section.description && (
//                         <div
//                           className="custom-section-content"
//                           dangerouslySetInnerHTML={{
//                             __html: cleanQuillHTML(section.description),
//                           }}
//                         />
//                       )}
//                     </div>
//                   ),
//               )}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default TemplateSeven;










"use client";
import React, { useContext } from "react";
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

const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const contact = alldata?.contact || context.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills?.text || context?.skills.text || "";
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

  // Helper function to render skills
  const renderSkills = () => {
    if (!skills || (typeof skills === "string" && !skills.trim())) return null;

    const cleanedSkills = cleanQuillHTML(skills);

    if (
      !cleanedSkills ||
      cleanedSkills === "<p><br></p>" ||
      cleanedSkills === ""
    )
      return null;

    return (
      <div className="section">
        <h2 className="section-title">Skills</h2>
        <div
          className="skills-content"
          dangerouslySetInnerHTML={{ __html: cleanedSkills }}
        />
      </div>
    );
  };

  // Helper function to render projects
  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;

    return (
      <div className="section">
        <h2 className="section-title">Projects</h2>
        {projects.map((project: any, index: number) => (
          <div key={project.id || index} className="project-item">
            <div className="project-header">
              <div className="project-title">{project.title}</div>
              {(project.liveUrl || project.githubUrl) && (
                <div className="project-links">
                  {project.liveUrl && (
                    <a
                      href={
                        project.liveUrl.startsWith("http")
                          ? project.liveUrl
                          : `https://${project.liveUrl}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="project-link"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={
                        project.githubUrl.startsWith("http")
                          ? project.githubUrl
                          : `https://${project.githubUrl}`
                      }
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
            {project.techStack && project.techStack.length > 0 && (
              <div className="project-tech-stack">
                <strong>Tech:</strong> {project.techStack.join(", ")}
              </div>
            )}
            {project.description && (
              <div
                className="project-description"
                dangerouslySetInnerHTML={{
                  __html: cleanQuillHTML(project.description),
                }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  /* ======================================================
     CSS — PROFESSIONAL BLACK & WHITE WITH NUNITO FONT
  ====================================================== */
  const styles = `
  .t7-resume body {
    margin: 0;
    padding: 0;
    background: white;
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .t7-resume {
    width: 210mm;
    padding: 15mm;
    box-sizing: border-box;
    background: white;
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #111827;
    text-align: left;
  }

  .t7-resume.is-preview {
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

  /* Global <p> reset */
  .t7-resume p {
    margin: 0 0 6px 0 !important;
    padding: 0 !important;
    line-height: 1.5 !important;
  }

  /* Header Section */
  .t7-resume .resume-header {
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #000000;
    page-break-after: avoid;
    break-after: avoid;
  }

  .t7-resume .name {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 8px;
    color: #000000;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .job-title {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    margin-bottom: 12px;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .contact-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    font-size: 12px;
    color: #444444;
    margin-bottom: 8px;
  }

  .t7-resume .address {
    font-size: 12px;
    color: #444444;
    margin-top: 4px;
  }

  .t7-resume .links {
    margin-top: 8px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .t7-resume .link-item {
    color: #000000;
    text-decoration: underline;
    font-size: 12px;
  }

  /* Section Styles */
  .t7-resume .section {
    margin-bottom: 20px;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .t7-resume .section-title {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #000000;
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid #000000;
    text-align: center !important;
    font-family: 'Nunito', sans-serif;
    page-break-after: avoid;
    break-after: avoid;
  }

  /* Custom Section Title - Same as other section titles */
  .t7-resume .custom-section-title {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #000000;
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid #000000;
    text-align: center !important;
    font-family: 'Nunito', sans-serif;
    page-break-after: avoid;
    break-after: avoid;
  }

  /* Experience Items */
  .t7-resume .experience-item {
    margin-bottom: 20px;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .t7-resume .experience-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 8px;
  }

  .t7-resume .experience-title {
    font-size: 15px;
    font-weight: 700;
    color: #000000;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .experience-subtitle {
    font-size: 13px;
    font-weight: 500;
    color: #555555;
    margin-top: 2px;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .experience-date {
    font-size: 12px;
    color: #555555;
    white-space: nowrap;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .experience-description {
    margin-top: 8px;
    font-size: 13px;
    line-height: 1.5;
    color: #222222;
  }

  /* Education Items */
  .t7-resume .education-item {
    margin-bottom: 20px;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .t7-resume .education-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 8px;
  }

  .t7-resume .education-school {
    font-size: 15px;
    font-weight: 700;
    color: #000000;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .education-subtitle {
    font-size: 13px;
    color: #555555;
    margin-top: 2px;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .education-date {
    font-size: 12px;
    color: #555555;
    white-space: nowrap;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .education-grade {
    font-size: 12px;
    color: #555555;
    margin-top: 4px;
    font-weight: 500;
    display: inline-block;
  }

  .t7-resume .education-description {
    margin-top: 8px;
    font-size: 13px;
    line-height: 1.5;
    color: #222222;
  }

  /* Project Items */
  .t7-resume .project-item {
    margin-bottom: 16px;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .t7-resume .project-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 6px;
  }

  .t7-resume .project-title {
    font-size: 15px;
    font-weight: 700;
    color: #000000;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .project-links {
    display: flex;
    gap: 12px;
  }

  .t7-resume .project-link {
    color: #000000;
    text-decoration: underline;
    font-size: 12px;
  }

  .t7-resume .project-tech-stack {
    font-size: 12px;
    color: #555555;
    margin: 4px 0 6px;
  }

  .t7-resume .project-description {
    margin-top: 6px;
    font-size: 13px;
    line-height: 1.5;
    color: #222222;
  }

  /* Skills Content - FIXED LIST STYLES */
  .t7-resume .skills-content {
    padding: 0 5px;
  }

  .t7-resume .skills-content ul {
    list-style-type: disc !important;
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .skills-content ol {
    list-style-type: decimal !important;
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .skills-content li {
    margin-bottom: 4px !important;
    line-height: 1.5 !important;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .t7-resume .skills-content p {
    margin: 0 0 6px 0 !important;
    padding: 0 !important;
    line-height: 1.5 !important;
  }

  /* Custom Section Content - FIXED LIST STYLES */
  .t7-resume .custom-section-content ul {
    list-style-type: disc !important;
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .custom-section-content ol {
    list-style-type: decimal !important;
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .custom-section-content li {
    margin-bottom: 4px !important;
    line-height: 1.5 !important;
  }

  /* Summary Text - FIXED LIST STYLES */
  .t7-resume .summary-text ul {
    list-style-type: disc !important;
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .summary-text ol {
    list-style-type: decimal !important;
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .summary-text li {
    margin-bottom: 4px !important;
    line-height: 1.5 !important;
  }

  /* Experience Description - FIXED LIST STYLES */
  .t7-resume .experience-description ul,
  .t7-resume .experience-description ol {
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .experience-description ul {
    list-style-type: disc !important;
  }

  .t7-resume .experience-description ol {
    list-style-type: decimal !important;
  }

  .t7-resume .experience-description li {
    margin-bottom: 4px !important;
    line-height: 1.5 !important;
  }

  /* Education Description - FIXED LIST STYLES */
  .t7-resume .education-description ul,
  .t7-resume .education-description ol {
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .education-description ul {
    list-style-type: disc !important;
  }

  .t7-resume .education-description ol {
    list-style-type: decimal !important;
  }

  .t7-resume .education-description li {
    margin-bottom: 4px !important;
    line-height: 1.5 !important;
  }

  /* Project Description - FIXED LIST STYLES */
  .t7-resume .project-description ul,
  .t7-resume .project-description ol {
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .project-description ul {
    list-style-type: disc !important;
  }

  .t7-resume .project-description ol {
    list-style-type: decimal !important;
  }

  .t7-resume .project-description li {
    margin-bottom: 4px !important;
    line-height: 1.5 !important;
  }

  /* Resume Lists - General */
  .t7-resume .resume-list {
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume ol.resume-list {
    list-style-type: decimal !important;
  }

  .t7-resume ul.resume-list {
    list-style-type: disc !important;
  }

  .t7-resume .resume-list li {
    margin-bottom: 4px !important;
    line-height: 1.5 !important;
  }

  /* Preserve spaces in content */
  .t7-resume .experience-description p,
  .t7-resume .education-description p,
  .t7-resume .project-description p,
  .t7-resume .summary-text p,
  .t7-resume .custom-section-content p,
  .t7-resume .skills-content p {
    white-space: pre-wrap !important;
  }

  /* Print Styles */
  @media print {
    @page {
      size: A4;
    
    }

    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      margin: 0;
      padding: 0;
      background: white;
    }

    .t7-resume {
      margin: 0;
      width: 100%;
          padding: 15mm;  /* Keep the padding here instead of @page */

      border: none;
      box-shadow: none;
      background: white;
    }

    .t7-resume .resume-header {
      margin-top: 0;
      padding-top: 0;
    }

    .t7-resume .section {
      page-break-inside: avoid;
    }

    .t7-resume .experience-item {
      page-break-inside: avoid;
    }

    .t7-resume .project-link,
    .t7-resume .link-item {
      color: #000000 !important;
      text-decoration: underline !important;
    }
  }
`;

  /* ======================================================
     HTML GENERATION — for PDF download
  ====================================================== */
  const generateHTML = () => {
    const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

    // Generate skills HTML for PDF
    const generateSkillsHTML = () => {
      if (!skills || (typeof skills === "string" && !skills.trim())) return "";

      const cleanedSkills = cleanQuillHTML(skills);
      if (
        !cleanedSkills ||
        cleanedSkills === "<p><br></p>" ||
        cleanedSkills === ""
      )
        return "";

      return `
        <div class="section">
          <h2 class="section-title">Skills</h2>
          <div class="skills-content">${cleanedSkills}</div>
        </div>
      `;
    };

    // Generate projects HTML for PDF
    const generateProjectsHTML = () => {
      if (!projects || projects.length === 0) return "";

      return `
        <div class="section">
          <h2 class="section-title">Projects</h2>
          ${projects
            .map(
              (project: any) => `
            <div class="project-item">
              <div class="project-header">
                <div class="project-title">${project.title || ""}</div>
                ${
                  project.liveUrl || project.githubUrl
                    ? `
                  <div class="project-links">
                    ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
                    ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
                  </div>
                `
                    : ""
                }
              </div>
              ${
                project.techStack && project.techStack.length > 0
                  ? `
                <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(", ")}</div>
              `
                  : ""
              }
              ${
                project.description
                  ? `
                <div class="project-description">${cleanQuillHTML(project.description)}</div>
              `
                  : ""
              }
            </div>
          `,
            )
            .join("")}
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

      return `
        <div class="section">
          ${finalize.customSection
            .filter((s: any) => s?.name?.trim() || s?.description?.trim())
            .map(
              (s: any) => `
            <div class="custom-section">
              ${s.name ? `<h2 class="custom-section-title">${s.name}</h2>` : ""}
              ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
            </div>
          `,
            )
            .join("")}
        </div>
      `;
    };

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
  <style>${styles}</style>
</head>
<body>
<div class="t7-resume">

  <!-- HEADER -->
  <div class="resume-header">
    <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
    <div class="job-title">${contact?.jobTitle || ""}</div>
    <div class="contact-row">
      ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
      ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
      ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
    </div>
    ${addressParts.length ? `<div class="address">${addressParts.join(" , ")}</div>` : ""}
    <div class="links">
      ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
      ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item">GitHub</a>` : ""}
      ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
    </div>
  </div>

  <!-- SUMMARY -->
  ${
    summary
      ? `
  <div class="section">
    <h2 class="section-title">Professional Summary</h2>
    <div class="summary-text">${cleanQuillHTML(summary)}</div>
  </div>
  `
      : ""
  }

  <!-- EXPERIENCE -->
  ${
    experiences.length > 0
      ? `
  <div class="section">
    <h2 class="section-title">Experience</h2>
    ${experiences
      .map((exp) => {
        const startFormatted = formatMonthYear(exp.startDate, false);
        const endFormatted = exp.endDate
          ? formatMonthYear(exp.endDate, false)
          : "Present";
        return `
        <div class="experience-item">
          <div class="experience-header">
            <div>
              <div class="experience-title">${exp.jobTitle || ""}</div>
              <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
            </div>
            <div class="experience-date">${startFormatted} — ${endFormatted}</div>
          </div>
          ${
            exp.text
              ? `<div class="experience-description">${cleanQuillHTML(exp.text)}</div>`
              : ""
          }
        </div>
      `;
      })
      .join("")}
  </div>
  `
      : ""
  }

  <!-- PROJECTS -->
  ${generateProjectsHTML()}

  <!-- EDUCATION -->
  ${
    educations.length > 0
      ? `
  <div class="section">
    <h2 class="section-title">Education</h2>
    ${educations
      .map((edu) => {
        const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
        return `
        <div class="education-item">
          <div class="education-header">
            <div>
              <div class="education-school">${edu.schoolname || ""}</div>
              <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
              ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
            </div>
            <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
          </div>
          ${edu.text ? `<div class="education-description">${cleanQuillHTML(edu.text)}</div>` : ""}
        </div>
      `;
      })
      .join("")}
  </div>
  `
      : ""
  }

  <!-- SKILLS -->
  ${generateSkillsHTML()}

  <!-- CUSTOM SECTIONS -->
  ${generateCustomSectionsHTML()}

</div>
</body>
</html>`;
  };

  /* ======================================================
     PDF DOWNLOAD
  ====================================================== */
  const handleDownload = async (): Promise<void> => {
    try {
      const html: string = generateHTML();

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
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  /* ======================================================
     JSX PREVIEW
  ====================================================== */
  return (
    <>
      <div className="text-center my-5">

            {lastSegment === "download-resume" && (

        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-emerald-500 text-2xl md:text-base hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg"
        >
          Download Resume
        </motion.button>
            )}
      </div>

      <div
        className={`t7-resume bg-white ${alldata ? "is-preview" : ""}`}
        style={{
          margin: "0 auto",
          boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
          minHeight: "297mm",
        }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');`}</style>
        <style>{styles}</style>

        {/* HEADER */}
        <div className="resume-header">
          <h1 className="name">
            {contact?.firstName} {contact?.lastName}
          </h1>
          <div className="job-title">{contact?.jobTitle}</div>
          <div className="contact-row">
            {contact?.email && (
              <div className="contact-item">{contact.email}</div>
            )}
            {contact?.phone && (
              <div className="contact-item">{contact.phone}</div>
            )}
            {dateOfBirth && (
              <div className="contact-item">
                {formatDateOfBirth(dateOfBirth)}
              </div>
            )}
          </div>
          {addressParts.length > 0 && (
            <div className="address">{addressParts.join(" , ")}</div>
          )}
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
            {githubUrl && (
              <a
                href={
                  githubUrl.startsWith("http")
                    ? githubUrl
                    : `https://${githubUrl}`
                }
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
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
          <div className="section">
            <h2 className="section-title">Professional Summary</h2>
            <div
              className="summary-text"
              dangerouslySetInnerHTML={{
                __html: cleanQuillHTML(summary),
              }}
            />
          </div>
        )}

        {/* EXPERIENCE */}
        {experiences.length > 0 && (
          <div className="section">
            <h2 className="section-title">Experience</h2>
            {experiences.map((exp, i) => {
              const start = formatMonthYear(exp.startDate, false);
              const end = exp.endDate
                ? formatMonthYear(exp.endDate, false)
                : "Present";
              return (
                <div key={i} className="experience-item">
                  <div className="experience-header">
                    <div>
                      <div className="experience-title">
                        {exp.jobTitle || ""}
                      </div>
                      <div className="experience-subtitle">
                        {[exp.employer, exp.location]
                          .filter(Boolean)
                          .join(" — ")}
                      </div>
                    </div>
                    <div className="experience-date">
                      {start} — {end}
                    </div>
                  </div>
                  {exp.text && (
                    <div
                      className="experience-description"
                      dangerouslySetInnerHTML={{
                        __html: cleanQuillHTML(exp.text),
                      }}
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
        {educations.length > 0 && (
          <div className="section">
            <h2 className="section-title">Education</h2>
            {educations.map((edu, i) => {
              const formattedGrade = formatGradeToCgpdAndPercentage(
                edu.grade || "",
              );
              return (
                <div key={i} className="education-item">
                  <div className="education-header">
                    <div>
                      <div className="education-school">
                        {edu.schoolname || ""}
                      </div>
                      <div className="education-subtitle">
                        {[edu.degree, edu.location].filter(Boolean).join(" — ")}
                      </div>
                      {formattedGrade && (
                        <div className="education-grade">{formattedGrade}</div>
                      )}
                    </div>
                    <div className="education-date">
                      {[edu.startDate, edu.endDate || "Present"]
                        .filter(Boolean)
                        .join(" — ")}
                    </div>
                  </div>
                  {edu.text && (
                    <div
                      className="education-description"
                      dangerouslySetInnerHTML={{
                        __html: cleanQuillHTML(edu.text),
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* SKILLS */}
        {renderSkills()}

        {/* CUSTOM SECTIONS */}
        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize.customSection) &&
          finalize.customSection.some(
            (s) => s?.name?.trim() || s?.description?.trim(),
          ) && (
            <div className="section">
              {finalize.customSection.map(
                (section, i) =>
                  (section?.name?.trim() || section?.description?.trim()) && (
                    <div key={i} className="custom-section">
                      {section.name && (
                        <h2 className="custom-section-title">{section.name}</h2>
                      )}
                      {section.description && (
                        <div
                          className="custom-section-content"
                          dangerouslySetInnerHTML={{
                            __html: cleanQuillHTML(section.description),
                          }}
                        />
                      )}
                    </div>
                  ),
              )}
            </div>
          )}
      </div>
    </>
  );
};

export default TemplateSeven;