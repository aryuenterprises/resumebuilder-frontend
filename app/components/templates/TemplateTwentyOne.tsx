// "use client";
// import React, { useContext } from "react";
// import axios, { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   formatMonthYear,
//   getLocalStorage,
//   MonthYearDisplay,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { User } from "@/app/types/user.types";
// import { ResumeProps } from "@/app/types";

// const TemplateTwo: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);

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

//   const styles = `
// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// .t21-resume body {
//   margin: 0;
//   padding: 0;
//   background-color: white;
//   font-family: 'Inter', Arial, sans-serif;
//   font-size: 13px;
//   line-height: 1.5;
// }

// .t21-resume {
//   width: 210mm;
//   min-height: 297mm;
//   box-sizing: border-box;
//   background-color: white;
//   font-family: 'Inter', Arial, sans-serif;
//   font-size: 13px;
//   line-height: 1.5;
//   display: flex;
//   flex-direction: row;
// }

// .t21-resume.is-preview {
//   transform: scale(0.36);
//   transform-origin: top left;
//   width: 210mm;
//   height: auto;
//   max-height: none;
//   min-height: auto;
//   max-width: none;
//   min-width: auto;
//   overflow: hidden;
// }

// .t21-resume p {
//   margin: 0 !important;
//   padding: 0 !important;
//   line-height: 1.5 !important;
// }

// /* ── SIDEBAR ── */
// .t21-sidebar {
//   width: 68mm;
//   min-height: 297mm;
//   background-color: #1e2a3a;
//   color: #e8ecf0;
//   padding: 20px 16px;
//   box-sizing: border-box;
//   flex-shrink: 0;
// }

// /* ── MAIN CONTENT ── */
// .t21-main {
//   flex: 1;
//   padding: 24px 20px;
//   box-sizing: border-box;
//   background-color: white;
// }

// /* ── HEADER (inside sidebar) ── */
// .t21-name {
//   font-size: 20px;
//   font-weight: 700;
//   color: #ffffff;
//   line-height: 1.2;
//   margin-bottom: 4px;
//   word-break: break-word;
// }

// .t21-jobtitle {
//   font-size: 12px;
//   font-weight: 400;
//   color: #8fa8c0;
//   margin-bottom: 16px;
//   line-height: 1.4;
// }

// .t21-divider {
//   border: none;
//   border-top: 1px solid #2e3e52;
//   margin: 14px 0;
// }

// /* ── SIDEBAR SECTION TITLE ── */
// .t21-sidebar-section-title {
//   font-size: 10px;
//   font-weight: 700;
//   letter-spacing: 0.12em;
//   text-transform: uppercase;
//   color: #5b8cb8;
//   margin-bottom: 10px;
//   margin-top: 18px;
// }

// .t21-sidebar-section-title:first-of-type {
//   margin-top: 0;
// }

// /* ── CONTACT DETAILS ── */
// .t21-contact-item {
//   font-size: 11px;
//   color: #b0c4d8;
//   margin-bottom: 6px;
//   line-height: 1.5;
//   word-break: break-word;
// }

// .t21-contact-label {
//   font-size: 10px;
//   color: #5b8cb8;
//   font-weight: 600;
//   display: block;
//   margin-bottom: 1px;
// }

// .t21-contact-link {
//   color: #7ab3d8;
//   text-decoration: none;
//   font-size: 11px;
// }

// /* ── SIDEBAR SKILLS ── */
// .t21-skill-row {
//   margin-bottom: 9px;
// }

// .t21-skill-label {
//   font-size: 11px;
//   color: #c8d8e8;
//   margin-bottom: 3px;
//   font-weight: 400;
// }

// .t21-skill-track {
//   height: 3px;
//   background: #2e3e52;
//   border-radius: 2px;
//   overflow: hidden;
// }

// .t21-skill-fill {
//   height: 100%;
//   background: #5b8cb8;
//   border-radius: 2px;
// }

// /* ── SIDEBAR LANGUAGE / ADDITIONAL ── */
// .t21-sidebar-item {
//   font-size: 11px;
//   color: #b0c4d8;
//   margin-bottom: 7px;
//   line-height: 1.5;
// }

// /* ── MAIN: SECTION TITLES ── */
// .t21-section-title {
//   font-size: 13px;
//   font-weight: 700;
//   color: #1e2a3a;
//   text-transform: uppercase;
//   letter-spacing: 0.08em;
//   padding-bottom: 5px;
//   border-bottom: 2px solid #1e2a3a;
//   margin-bottom: 12px;
//   margin-top: 20px;
// }

// .t21-section-title:first-of-type {
//   margin-top: 0;
// }

// /* ── SUMMARY ── */
// .t21-summary {
//   font-size: 12px;
//   color: #3a4a5a;
//   line-height: 1.7;
// }

// .t21-summary p {
//   font-size: 12px !important;
//   color: #3a4a5a !important;
//   line-height: 1.7 !important;
// }

// /* ── EXPERIENCE / EDUCATION ITEMS ── */
// .t21-item {
//   margin-bottom: 14px;
// }

// .t21-item-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   flex-wrap: wrap;
//   gap: 4px;
//   margin-bottom: 2px;
// }

// .t21-item-title {
//   font-size: 13px;
//   font-weight: 600;
//   color: #1e2a3a;
//   line-height: 1.3;
// }

// .t21-item-date {
//   font-size: 10px;
//   color: #7a8a9a;
//   white-space: nowrap;
//   background: #f0f4f8;
//   padding: 2px 6px;
//   border-radius: 3px;
//   line-height: 1.5;
//   font-weight: 500;
// }

// .t21-item-subtitle {
//   font-size: 11px;
//   color: #5b7a9a;
//   margin-bottom: 5px;
//   font-weight: 500;
//   line-height: 1.4;
// }

// .t21-item-content {
//   font-size: 12px;
//   color: #3a4a5a;
//   line-height: 1.6;
// }

// .t21-item-content p {
//   font-size: 12px !important;
//   color: #3a4a5a !important;
//   line-height: 1.6 !important;
// }

// .t21-item-content ul,
// .t21-experience-list,
// .t21-education-list {
//   list-style-type: disc !important;
//   padding-left: 16px !important;
//   margin: 3px 0 !important;
// }

// .t21-item-content ol {
//   list-style-type: decimal !important;
//   padding-left: 16px !important;
//   margin: 3px 0 !important;
// }

// .t21-item-content li,
// .t21-experience-list li,
// .t21-education-list li {
//   margin-bottom: 2px !important;
//   line-height: 1.5 !important;
//   list-style-position: outside !important;
//   font-size: 12px !important;
//   color: #3a4a5a !important;
// }

// .t21-item-content ul { list-style-type: disc !important; }
// .t21-item-content ul ul { list-style-type: circle !important; }

// /* ── ADDITIONAL SECTIONS (certifications, hobbies, etc.) ── */
// .t21-additional-item {
//   font-size: 12px;
//   color: #3a4a5a;
//   line-height: 1.6;
//   margin-bottom: 5px;
// }

// .t21-additional-item:last-child {
//   margin-bottom: 0;
// }

// /* ── CUSTOM SECTION ── */
// .t21-custom-section {
//   margin-bottom: 14px;
// }

// .t21-custom-content {
//   font-size: 12px;
//   color: #3a4a5a;
//   line-height: 1.6;
// }

// .t21-custom-content p {
//   font-size: 12px !important;
//   color: #3a4a5a !important;
// }

// .t21-wrap-break-word {
//   word-wrap: break-word;
//   overflow-wrap: break-word;
// }

// /* ── PRINT ── */
// @media print {
//   @page {
//     size: A4;
//     margin: 0;
//   }

//   .t21-resume {
//     width: 210mm !important;
//     min-height: 297mm !important;
//     margin: 0 !important;
//     box-shadow: none !important;
//   }

//   .t21-sidebar {
//     -webkit-print-color-adjust: exact;
//     print-color-adjust: exact;
//     min-height: 297mm !important;
//   }

//   .no-print { display: none !important; }

//   .t21-item { page-break-inside: avoid; break-inside: avoid; }
//   .t21-section-title { page-break-after: avoid; break-after: avoid; }
// }

// /* ── RESPONSIVE ── */
// @media (max-width: 768px) {
//   .t21-resume {
//     width: 100%;
//     flex-direction: column;
//   }
//   .t21-sidebar {
//     width: 100%;
//     min-height: auto;
//   }
// }
// `;

//   /* =====================================================
//      HTML GENERATION
//   ====================================================== */
//   const generateHTML = () => {
//     const stripHtmlHelper = (html: string) =>
//       html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//     const renderExperienceText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="t21-item-content t21-wrap-break-word">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
//         return `<div class="t21-item-content"><ul class="t21-experience-list">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
//             return c ? `<li>${c}</li>` : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="t21-item-content" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const renderEducationText = (text: string) => {
//       if (!text) return "";
//       if (text.includes("<") && text.includes(">")) {
//         return `<div class="t21-item-content">${text}</div>`;
//       }
//       const lines = text.split("\n").filter((l) => l.trim() !== "");
//       if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
//         return `<div class="t21-item-content"><ul class="t21-education-list">${lines
//           .map((l) => {
//             const t = l.trim();
//             const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
//             return c ? `<li>${c}</li>` : "";
//           })
//           .join("")}</ul></div>`;
//       }
//       return `<div class="t21-item-content" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
//     };

//     const jobTitle = contact?.jobTitle
//       ? typeof contact.jobTitle === "string"
//         ? contact.jobTitle
//         : (contact.jobTitle as any)?.name || ""
//       : "";

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t21-resume">

//   <!-- SIDEBAR -->
//   <div class="t21-sidebar">
//     <div class="t21-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//     <div class="t21-jobtitle">${jobTitle}</div>
//     <hr class="t21-divider"/>

//     <!-- CONTACT -->
//     <div class="t21-sidebar-section-title">Contact</div>
//     ${contact?.email ? `<div class="t21-contact-item"><span class="t21-contact-label">Email</span>${contact.email}</div>` : ""}
//     ${contact?.phone ? `<div class="t21-contact-item"><span class="t21-contact-label">Phone</span>${contact.phone}</div>` : ""}
//     ${addressParts.length > 0 ? `<div class="t21-contact-item"><span class="t21-contact-label">Address</span>${addressParts.join(", ")}</div>` : ""}
//     ${linkedinUrl ? `<div class="t21-contact-item"><span class="t21-contact-label">LinkedIn</span><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t21-contact-link">${linkedinUrl}</a></div>` : ""}
//     ${portfolioUrl ? `<div class="t21-contact-item"><span class="t21-contact-label">Portfolio</span><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t21-contact-link">${portfolioUrl}</a></div>` : ""}

//     <!-- SKILLS -->
//     ${skills.length > 0 ? `
//     <hr class="t21-divider"/>
//     <div class="t21-sidebar-section-title">Skills</div>
//     ${skills.map((s) => `
//       <div class="t21-skill-row">
//         <div class="t21-skill-label">${s.skill || ""}</div>
//         ${s.skill && s.level ? `<div class="t21-skill-track"><div class="t21-skill-fill" style="width:${(Number(s.level) / 4) * 100}%"></div></div>` : ""}
//       </div>`).join("")}
//     ` : ""}

//     <!-- LANGUAGES -->
//     ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some((l: any) => l.name && l.name.trim() !== "") ? `
//     <hr class="t21-divider"/>
//     <div class="t21-sidebar-section-title">Languages</div>
//     ${finalize.languages.filter((l: any) => l.name && l.name.trim() !== "").map((l: any) => `
//       <div class="t21-skill-row">
//         <div class="t21-skill-label">${l.name}</div>
//         ${l.level ? `<div class="t21-skill-track"><div class="t21-skill-fill" style="width:${(Number(l.level) / 4) * 100}%"></div></div>` : ""}
//       </div>`).join("")}
//     ` : ""}

//     <!-- CERTIFICATIONS -->
//     ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i: any) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//     <hr class="t21-divider"/>
//     <div class="t21-sidebar-section-title">Certifications</div>
//     ${finalize.certificationsAndLicenses.filter((i: any) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i: any) => `<div class="t21-sidebar-item">${i.name}</div>`).join("")}
//     ` : ""}

//     <!-- HOBBIES -->
//     ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i: any) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//     <hr class="t21-divider"/>
//     <div class="t21-sidebar-section-title">Interests</div>
//     ${finalize.hobbiesAndInterests.filter((i: any) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i: any) => `<div class="t21-sidebar-item">${i.name}</div>`).join("")}
//     ` : ""}

//     <!-- AWARDS -->
//     ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some((i: any) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//     <hr class="t21-divider"/>
//     <div class="t21-sidebar-section-title">Awards</div>
//     ${finalize.awardsAndHonors.filter((i: any) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i: any) => `<div class="t21-sidebar-item">${i.name}</div>`).join("")}
//     ` : ""}

//     <!-- REFERENCES -->
//     ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) && finalize.references.some((i: any) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//     <hr class="t21-divider"/>
//     <div class="t21-sidebar-section-title">References</div>
//     ${finalize.references.filter((i: any) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "").map((i: any) => `<div class="t21-sidebar-item">${i.name}</div>`).join("")}
//     ` : ""}

//     <!-- WEBSITES -->
//     ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i: any) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) ? `
//     <hr class="t21-divider"/>
//     <div class="t21-sidebar-section-title">Online</div>
//     ${finalize.websitesAndSocialMedia.filter((i: any) => i.websiteUrl || i.socialMedia).map((i: any) => `<div class="t21-sidebar-item">${i.websiteUrl ? `<div>${i.websiteUrl}</div>` : ""}${i.socialMedia ? `<div>${i.socialMedia}</div>` : ""}</div>`).join("")}
//     ` : ""}
//   </div>

//   <!-- MAIN CONTENT -->
//   <div class="t21-main">

//     <!-- SUMMARY -->
//     ${summary ? `
//     <div class="t21-section-title">Profile</div>
//     <div class="t21-summary">${summary.replace(/\n/g, "<br>")}</div>
//     ` : ""}

//     <!-- EXPERIENCE -->
//     ${experiences.length > 0 ? `
//     <div class="t21-section-title">Experience</div>
//     ${experiences.map((exp) => {
//       const s = formatMonthYear(exp.startDate, true);
//       const e = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
//       return `<div class="t21-item">
//         <div class="t21-item-header">
//           <div class="t21-item-title">${exp.jobTitle || ""}</div>
//           <div class="t21-item-date">${s} – ${e}</div>
//         </div>
//         <div class="t21-item-subtitle">${exp.employer || ""}${exp.location ? ` · ${exp.location}` : ""}</div>
//         ${exp.text ? renderExperienceText(exp.text) : ""}
//       </div>`;
//     }).join("")}
//     ` : ""}

//     <!-- EDUCATION -->
//     ${educations.length > 0 ? `
//     <div class="t21-section-title">Education</div>
//     ${educations.map((edu) => {
//       const dateStr = edu.startDate || edu.endDate
//         ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
//         : "";
//       return `<div class="t21-item">
//         <div class="t21-item-header">
//           <div class="t21-item-title">${edu.schoolname || ""}</div>
//           ${dateStr ? `<div class="t21-item-date">${dateStr}</div>` : ""}
//         </div>
//         ${edu.degree || edu.location ? `<div class="t21-item-subtitle">${edu.degree || ""}${edu.degree && edu.location ? " · " : ""}${edu.location || ""}</div>` : ""}
//         ${renderEducationText(edu.text || "")}
//       </div>`;
//     }).join("")}
//     ` : ""}

//     <!-- CUSTOM SECTIONS -->
//     ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim()) ? `
//     ${finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim()).map((s: any) => `
//       <div class="t21-custom-section">
//         ${s.name ? `<div class="t21-section-title">${s.name}</div>` : ""}
//         ${s.description ? `<div class="t21-custom-content">${s.description}</div>` : ""}
//       </div>`).join("")}
//     ` : ""}

//   </div>
// </div>
// </body>
// </html>`;
//   };

//   const UseContext = useContext(CreateContext);
//   const Contactid = UseContext?.contact.contactId;
//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;

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
//       await fetchOldResumeData(pdfBlob);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       alert("Failed to generate PDF. Please try again.");
//     }
//   };

//   const fetchOldResumeData = async (pdfBlob: Blob): Promise<void> => {
//     if (!userId || !Contactid) return;
//     try {
//       const formData = new FormData();
//       formData.append("userId", userId);
//       formData.append("message", "success");
//       formData.append("contactId", Contactid);
//       formData.append("resume", pdfBlob, "resume.pdf");
//       await axios.post(`${API_URL}/api/users/download-resume`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//     } catch (err) {
//       console.error("Upload error:", err);
//     }
//   };

//   const stripHtml = (html: string) => html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   const jobTitle = contact?.jobTitle
//     ? typeof contact.jobTitle === "string"
//       ? contact.jobTitle
//       : (contact.jobTitle as any)?.name || ""
//     : "";

//   return (
//     <>
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
//         className={`t21-resume bg-white ${alldata ? "is-preview" : ""}`}
//         style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* SIDEBAR */}
//         <div className="t21-sidebar">
//           <div className="t21-name">{contact?.firstName} {contact?.lastName}</div>
//           <div className="t21-jobtitle">{jobTitle}</div>
//           <hr className="t21-divider" />

//           {/* CONTACT */}
//           <div className="t21-sidebar-section-title">Contact</div>
//           {contact?.email && (
//             <div className="t21-contact-item">
//               <span className="t21-contact-label">Email</span>
//               {contact.email}
//             </div>
//           )}
//           {contact?.phone && (
//             <div className="t21-contact-item">
//               <span className="t21-contact-label">Phone</span>
//               {contact.phone}
//             </div>
//           )}
//           {addressParts.length > 0 && (
//             <div className="t21-contact-item">
//               <span className="t21-contact-label">Address</span>
//               {addressParts.join(", ")}
//             </div>
//           )}
//           {linkedinUrl && (
//             <div className="t21-contact-item">
//               <span className="t21-contact-label">LinkedIn</span>
//               <a
//                 href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
//                 className="t21-contact-link"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 {linkedinUrl}
//               </a>
//             </div>
//           )}
//           {portfolioUrl && (
//             <div className="t21-contact-item">
//               <span className="t21-contact-label">Portfolio</span>
//               <a
//                 href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
//                 className="t21-contact-link"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 {portfolioUrl}
//               </a>
//             </div>
//           )}

//           {/* SKILLS */}
//           {skills.length > 0 && (
//             <>
//               <hr className="t21-divider" />
//               <div className="t21-sidebar-section-title">Skills</div>
//               {skills.map((skill, i) => (
//                 <div key={i} className="t21-skill-row">
//                   <div className="t21-skill-label">{skill.skill}</div>
//                   {skill.skill && skill.level && (
//                     <div className="t21-skill-track">
//                       <div className="t21-skill-fill" style={{ width: `${(Number(skill.level) / 4) * 100}%` }} />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </>
//           )}

//           {/* LANGUAGES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) &&
//             finalize.languages.some((l: any) => l.name && l.name.trim() !== "") && (
//             <>
//               <hr className="t21-divider" />
//               <div className="t21-sidebar-section-title">Languages</div>
//               {finalize.languages.map((lang: any, index: number) =>
//                 lang.name && lang.name.trim() !== "" ? (
//                   <div key={lang._id || index} className="t21-skill-row">
//                     <div className="t21-skill-label">{lang.name}</div>
//                     {lang.level && (
//                       <div className="t21-skill-track">
//                         <div className="t21-skill-fill" style={{ width: `${(Number(lang.level) / 4) * 100}%` }} />
//                       </div>
//                     )}
//                   </div>
//                 ) : null
//               )}
//             </>
//           )}

//           {/* CERTIFICATIONS */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some((i: any) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <>
//               <hr className="t21-divider" />
//               <div className="t21-sidebar-section-title">Certifications</div>
//               {finalize.certificationsAndLicenses.map((item: any, index: number) =>
//                 item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" ? (
//                   <div key={item.id || index} className="t21-sidebar-item" dangerouslySetInnerHTML={{ __html: item.name }} />
//                 ) : null
//               )}
//             </>
//           )}

//           {/* HOBBIES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some((i: any) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <>
//               <hr className="t21-divider" />
//               <div className="t21-sidebar-section-title">Interests</div>
//               {finalize.hobbiesAndInterests.map((item: any, index: number) =>
//                 item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" ? (
//                   <div key={item.id || index} className="t21-sidebar-item" dangerouslySetInnerHTML={{ __html: item.name }} />
//                 ) : null
//               )}
//             </>
//           )}

//           {/* AWARDS */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) &&
//             finalize.awardsAndHonors.some((i: any) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <>
//               <hr className="t21-divider" />
//               <div className="t21-sidebar-section-title">Awards</div>
//               {finalize.awardsAndHonors.map((item: any, index: number) =>
//                 item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" ? (
//                   <div key={item.id || index} className="t21-sidebar-item" dangerouslySetInnerHTML={{ __html: item.name }} />
//                 ) : null
//               )}
//             </>
//           )}

//           {/* REFERENCES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) &&
//             finalize.references.some((i: any) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "") && (
//             <>
//               <hr className="t21-divider" />
//               <div className="t21-sidebar-section-title">References</div>
//               {finalize.references.map((item: any, index: number) =>
//                 item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" ? (
//                   <div key={item.id || index} className="t21-sidebar-item" dangerouslySetInnerHTML={{ __html: item.name }} />
//                 ) : null
//               )}
//             </>
//           )}

//           {/* WEBSITES */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize.websitesAndSocialMedia) &&
//             finalize.websitesAndSocialMedia.some((i: any) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== "")) && (
//             <>
//               <hr className="t21-divider" />
//               <div className="t21-sidebar-section-title">Online</div>
//               {finalize.websitesAndSocialMedia.map((item: any, index: number) =>
//                 (item.websiteUrl || item.socialMedia) ? (
//                   <div key={item.id || index} className="t21-sidebar-item">
//                     {item.websiteUrl && <div>{item.websiteUrl}</div>}
//                     {item.socialMedia && <div>{item.socialMedia}</div>}
//                   </div>
//                 ) : null
//               )}
//             </>
//           )}
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="t21-main">

//           {/* SUMMARY */}
//           {summary && (
//             <>
//               <div className="t21-section-title">Profile</div>
//               <div
//                 className="t21-summary"
//                 dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
//               />
//             </>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <>
//               <div className="t21-section-title">Experience</div>
//               {experiences.map((exp, i) => (
//                 <div key={i} className="t21-item">
//                   <div className="t21-item-header">
//                     <div className="t21-item-title">{exp.jobTitle}</div>
//                     <div className="t21-item-date">
//                       <MonthYearDisplay value={exp.startDate} shortYear />
//                       {" – "}
//                       {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear /> : "Present"}
//                     </div>
//                   </div>
//                   <div className="t21-item-subtitle">
//                     {exp.employer}{exp.location && ` · ${exp.location}`}
//                   </div>
//                   {exp.text && (
//                     <div
//                       className="t21-item-content t21-wrap-break-word"
//                       dangerouslySetInnerHTML={{ __html: exp.text }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </>
//           )}

//           {/* EDUCATION */}
//           {educations.length > 0 && (
//             <>
//               <div className="t21-section-title">Education</div>
//               {educations.map((edu, index) => {
//                 let textContent = null;
//                 if (edu.text) {
//                   if (edu.text.includes("<") && edu.text.includes(">")) {
//                     textContent = (
//                       <div className="t21-item-content" dangerouslySetInnerHTML={{ __html: edu.text }} />
//                     );
//                   } else {
//                     const lines = edu.text.split("\n").filter((l) => l.trim() !== "");
//                     if (lines.some((l) => l.trim().startsWith("-"))) {
//                       textContent = (
//                         <div className="t21-item-content">
//                           <ul className="t21-education-list">
//                             {lines.map((l, li) => {
//                               const t = l.trim();
//                               const c = t.startsWith("-") ? t.substring(1).trim() : t;
//                               return c ? <li key={li}>{c}</li> : null;
//                             })}
//                           </ul>
//                         </div>
//                       );
//                     } else {
//                       textContent = (
//                         <div className="t21-item-content" style={{ whiteSpace: "pre-wrap" }}>
//                           {stripHtml(edu.text)}
//                         </div>
//                       );
//                     }
//                   }
//                 }
//                 return (
//                   <div key={edu.id || index} className="t21-item">
//                     <div className="t21-item-header">
//                       <div className="t21-item-title">{edu.schoolname || ""}</div>
//                       {(edu.startDate || edu.endDate) && (
//                         <div className="t21-item-date">
//                           {edu.startDate || ""}
//                           {edu.startDate && edu.endDate && " – "}
//                           {edu.endDate || ""}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.degree || edu.location) && (
//                       <div className="t21-item-subtitle">
//                         {edu.degree && <span>{edu.degree}</span>}
//                         {edu.degree && edu.location && " · "}
//                         {edu.location && <span>{edu.location}</span>}
//                       </div>
//                     )}
//                     {textContent}
//                   </div>
//                 );
//               })}
//             </>
//           )}

//           {/* CUSTOM SECTIONS */}
//           {finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) &&
//             finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim()) &&
//             finalize.customSection
//               .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//               .map((section: any, index: number) => (
//                 <div key={section.id || index} className="t21-custom-section">
//                   {section.name && <div className="t21-section-title">{section.name}</div>}
//                   {section.description && (
//                     <div
//                       className="t21-custom-content"
//                       dangerouslySetInnerHTML={{ __html: section.description }}
//                     />
//                   )}
//                 </div>
//               ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateTwo;