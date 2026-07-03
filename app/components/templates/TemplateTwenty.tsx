// "use client";

// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { MonthYearDisplay, formatMonthYear } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import {
//   Contact,
//   Education,
//   Experience,
//   Finalize,
//   Skill,
// } from "@/app/types/context.types";

// interface AllData {
//   contact?: Contact;
//   educations?: Education[];
//   experiences?: Experience[];
//   skills?: Skill[];
//   finalize?: Finalize;
//   summary?: string;
// }

// interface ResumeProps {
//   alldata?: AllData;
// }

// const TemplateTwenty: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";

//   const getJobTitle = (jobTitle: any): string => {
//     if (!jobTitle) return "";
//     if (typeof jobTitle === "string") return jobTitle;
//     if (typeof jobTitle === "object" && jobTitle !== null)
//       return (jobTitle as any)?.name || (jobTitle as any)?.label || "";
//     return "";
//   };

//   useEffect(() => {
//     let url: string | null = null;
//     let objectUrl: string | null = null;
//     const croppedImage = contact?.croppedImage;
//     if (croppedImage) {
//       if (typeof croppedImage === "string" && croppedImage.startsWith("blob:")) {
//         url = croppedImage;
//       } else if (typeof croppedImage === "string") {
//         url = `${API_URL}/api/uploads/photos/${croppedImage}`;
//       } else if ((croppedImage as any) instanceof Blob || (croppedImage as any) instanceof File) {
//         objectUrl = URL.createObjectURL(croppedImage as Blob);
//         url = objectUrl;
//       }
//       setPreviewUrl(url);
//     } else if (contact.photo) {
//       setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
//     } else {
//       setPreviewUrl(null);
//     }
//     return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
//   }, [contact?.croppedImage, contact?.photo]);

//   const isFinalizeData = (data: any): data is Finalize =>
//     data && typeof data === "object" && !Array.isArray(data);

//   const fin = {
//     languages: isFinalizeData(finalize) && Array.isArray(finalize.languages) ? finalize.languages : [],
//     certifications: isFinalizeData(finalize) && Array.isArray(finalize.certificationsAndLicenses) ? finalize.certificationsAndLicenses : [],
//     hobbies: isFinalizeData(finalize) && Array.isArray(finalize.hobbiesAndInterests) ? finalize.hobbiesAndInterests : [],
//     awards: isFinalizeData(finalize) && Array.isArray(finalize.awardsAndHonors) ? finalize.awardsAndHonors : [],
//     websites: isFinalizeData(finalize) && Array.isArray(finalize.websitesAndSocialMedia) ? finalize.websitesAndSocialMedia : [],
//     references: isFinalizeData(finalize) && Array.isArray(finalize.references) ? finalize.references : [],
//     customSection: isFinalizeData(finalize) && Array.isArray(finalize.customSection) ? finalize.customSection : [],
//   };

//   const skillPct = (level: any) => level ? `${(Number(level) / 5) * 100}%` : "0%";
//   const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, "") || "";

//   /* ======================================================
//      SHARED CSS — scoped to .resume-t7
//      Orange & Cream | Creative Bold | Right Sidebar + Photo
//   ====================================================== */
//   const styles = `
//     @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Lato:ital,wght@0,300;0,400;0,700;1,300&display=swap');

//     .resume-t7 * { box-sizing: border-box; }

//     .resume-t7 {
//       width: 210mm;
//       min-height: 297mm;
//       background-color: #fffaf4;
//       font-family: 'Lato', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #2a2a2a;
//       text-align: left;
//       display: flex;
//     }

//     /* Scoped resets */
//     .resume-t7 p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; font-family: 'Lato', Arial, sans-serif; }
//     .resume-t7 ul { list-style-type: disc !important; padding-left: 18px !important; margin: 0 !important; }
//     .resume-t7 ol { list-style-type: decimal !important; padding-left: 18px !important; margin: 0 !important; }
//     .resume-t7 li { margin-top: 0 !important; margin-bottom: 2px !important; padding: 0 !important; line-height: 1.5 !important; font-size: 13px !important; font-family: 'Lato', Arial, sans-serif !important; }

//     /* ── LEFT MAIN COLUMN ── */
//     .t7-main {
//       width: 62%;
//       padding: 0;
//       display: flex;
//       flex-direction: column;
//     }

//     /* ── NAME BLOCK (top of main) ── */
//     .t7-name-block {
//       background-color: #1a1a1a;
//       padding: 28px 28px 22px;
//       position: relative;
//     }

//     .t7-name-block::after {
//       content: '';
//       position: absolute;
//       bottom: 0;
//       left: 0;
//       width: 60px;
//       height: 4px;
//       background-color: #e8621a;
//     }

//     .t7-name {
//       font-family: 'Montserrat', Arial, sans-serif;
//       font-size: 30px;
//       font-weight: 800;
//       color: #ffffff;
//       letter-spacing: -0.5px;
//       line-height: 1.1;
//       margin-bottom: 5px;
//       text-transform: uppercase;
//     }

//     .t7-jobtitle {
//       font-family: 'Montserrat', Arial, sans-serif;
//       font-size: 11px;
//       font-weight: 500;
//       letter-spacing: 3px;
//       text-transform: uppercase;
//       color: #e8621a;
//       line-height: 1.4;
//     }

//     /* ── MAIN BODY ── */
//     .t7-main-body {
//       padding: 20px 28px;
//       flex: 1;
//     }

//     /* ── SECTION ── */
//     .t7-section {
//       margin-bottom: 20px;
//     }

//     .t7-section-title {
//       font-family: 'Montserrat', Arial, sans-serif;
//       font-size: 11px;
//       font-weight: 700;
//       letter-spacing: 3px;
//       text-transform: uppercase;
//       color: #e8621a;
//       margin-bottom: 10px;
//       display: flex;
//       align-items: center;
//       gap: 8px;
//       line-height: 1.4;
//     }

//     .t7-section-title::after {
//       content: '';
//       flex: 1;
//       height: 2px;
//       background-color: #f0d9c8;
//     }

//     /* ── SUMMARY ── */
//     .t7-summary {
//       font-family: 'Lato', Arial, sans-serif;
//       font-size: 13px;
//       font-weight: 300;
//       color: #444;
//       line-height: 1.75;
//       word-wrap: break-word;
//     }

//     .t7-summary p { margin: 0 !important; line-height: 1.75 !important; font-size: 13px !important; }

//     /* ── ENTRY ── */
//     .t7-entry {
//       margin-bottom: 14px;
//       padding-left: 14px;
//       border-left: 3px solid #f0d9c8;
//       position: relative;
//     }

//     .t7-entry::before {
//       content: '';
//       position: absolute;
//       left: -6px;
//       top: 5px;
//       width: 9px;
//       height: 9px;
//       border-radius: 50%;
//       background-color: #e8621a;
//     }

//     .t7-entry:last-child { margin-bottom: 0; }

//     .t7-entry-title {
//       font-family: 'Montserrat', Arial, sans-serif;
//       font-size: 14px;
//       font-weight: 700;
//       color: #1a1a1a;
//       line-height: 1.3;
//       margin-bottom: 2px;
//     }

//     .t7-entry-subtitle {
//       font-size: 12px;
//       font-weight: 700;
//       color: #e8621a;
//       font-family: 'Lato', Arial, sans-serif;
//       margin-bottom: 2px;
//       letter-spacing: 0.3px;
//     }

//     .t7-entry-date {
//       font-size: 11px;
//       color: #888;
//       font-family: 'Lato', Arial, sans-serif;
//       font-weight: 300;
//       margin-bottom: 4px;
//       letter-spacing: 0.5px;
//     }

//     .t7-entry-content {
//       font-size: 12.5px;
//       color: #444;
//       font-family: 'Lato', Arial, sans-serif;
//       font-weight: 300;
//       line-height: 1.6;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t7-entry-content p { margin: 0 !important; padding: 0 !important; line-height: 1.6 !important; font-size: 12.5px !important; }
//     .t7-entry-content ul { list-style-type: disc !important; padding-left: 16px !important; margin: 0 !important; }
//     .t7-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
//     .t7-entry-content li { margin: 0 !important; margin-bottom: 2px !important; line-height: 1.6 !important; font-size: 12.5px !important; }

//     /* ── RIGHT SIDEBAR ── */
//     .t7-sidebar {
//       width: 38%;
//       background-color: #f5ece0;
//       display: flex;
//       flex-direction: column;
//     }

//     /* ── PHOTO BLOCK ── */
//     .t7-photo-block {
//       background-color: #e8621a;
//       padding: 24px 20px 20px;
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       gap: 14px;
//     }

//     .t7-photo {
//       width: 100px;
//       height: 100px;
//       border-radius: 6px;
//       object-fit: cover;
//       border: 3px solid #ffffff;
//     }

//     .t7-photo-placeholder {
//       width: 100px;
//       height: 100px;
//       border-radius: 6px;
//       border: 3px solid #ffffff;
//       background: #c95510;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }

//     .t7-photo-placeholder span {
//       font-family: 'Montserrat', Arial, sans-serif;
//       font-size: 28px;
//       font-weight: 700;
//       color: #ffffff;
//     }

//     /* ── CONTACT BLOCK ── */
//     .t7-contact-block {
//       padding: 18px 18px 14px;
//       border-bottom: 2px solid #e8d0b8;
//     }

//     .t7-sidebar-section-title {
//       font-family: 'Montserrat', Arial, sans-serif;
//       font-size: 10px;
//       font-weight: 700;
//       letter-spacing: 2.5px;
//       text-transform: uppercase;
//       color: #e8621a;
//       margin-bottom: 10px;
//       line-height: 1.4;
//     }

//     .t7-contact-item {
//       font-size: 11.5px;
//       color: #444;
//       font-family: 'Lato', Arial, sans-serif;
//       font-weight: 300;
//       line-height: 1.6;
//       margin-bottom: 3px;
//       word-wrap: break-word;
//     }

//     .t7-contact-label {
//       font-weight: 700;
//       color: #1a1a1a;
//       font-family: 'Lato', Arial, sans-serif;
//       font-size: 10px;
//       letter-spacing: 0.5px;
//       text-transform: uppercase;
//     }

//     .t7-contact-link {
//       color: #e8621a;
//       text-decoration: underline;
//       font-family: 'Lato', Arial, sans-serif;
//       font-size: 11.5px;
//       word-wrap: break-word;
//     }

//     /* ── SIDEBAR SECTIONS ── */
//     .t7-sidebar-section {
//       padding: 14px 18px;
//       border-bottom: 2px solid #e8d0b8;
//     }

//     .t7-sidebar-section:last-child { border-bottom: none; }

//     /* ── SKILL BARS ── */
//     .t7-skill-row { margin-bottom: 9px; }

//     .t7-skill-name {
//       font-size: 11.5px;
//       font-weight: 700;
//       color: #1a1a1a;
//       font-family: 'Lato', Arial, sans-serif;
//       margin-bottom: 3px;
//       letter-spacing: 0.2px;
//     }

//     .t7-skill-bar-bg {
//       height: 4px;
//       background: #e8d0b8;
//       border-radius: 2px;
//       overflow: hidden;
//     }

//     .t7-skill-bar-fill {
//       height: 100%;
//       background-color: #e8621a;
//       border-radius: 2px;
//     }

//     /* ── SIDEBAR TEXT ── */
//     .t7-sidebar-text {
//       font-size: 12px;
//       color: #444;
//       font-family: 'Lato', Arial, sans-serif;
//       font-weight: 300;
//       line-height: 1.6;
//       word-wrap: break-word;
//     }

//     .t7-sidebar-text p { margin: 0 !important; line-height: 1.6 !important; font-size: 12px !important; }
//     .t7-sidebar-text div { line-height: 1.6 !important; }

//     .t7-lang-name {
//       font-size: 12px;
//       font-weight: 700;
//       color: #1a1a1a;
//       font-family: 'Lato', Arial, sans-serif;
//       margin-bottom: 3px;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page { size: A4; margin: 0; }
//       @page :first { margin-top: 0; }

//       .resume-t7 { width: 100% !important; box-shadow: none !important; }
//       .t7-name-block { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t7-photo-block { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t7-sidebar { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t7-skill-bar-fill { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t7-entry::before { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t7-entry { page-break-inside: avoid; break-inside: avoid; }
//       .t7-section-title { page-break-after: avoid; break-after: avoid; }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION
//   ====================================================== */
//   const generateHTML = () => {
//     const addressStr = [contact?.address, contact?.city, contact?.country].filter(Boolean).join(", ");
//     const initials = `${contact?.firstName?.[0] || ""}${contact?.lastName?.[0] || ""}`;
//     const photoHtml = previewUrl
//       ? `<img src="${previewUrl}" alt="Profile" class="t7-photo" />`
//       : `<div class="t7-photo-placeholder"><span>${initials || "?"}</span></div>`;

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Lato:ital,wght@0,300;0,400;0,700;1,300&display=swap" rel="stylesheet"/>
//   <style>
//     * { box-sizing: border-box; margin: 0; padding: 0; }
//     body { margin: 0; padding: 0; background: #fffaf4; font-family: 'Lato', Arial, sans-serif; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="resume-t7">

//   <!-- MAIN LEFT -->
//   <div class="t7-main">

//     <div class="t7-name-block">
//       <div class="t7-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//       ${contact?.jobTitle ? `<div class="t7-jobtitle">${getJobTitle(contact.jobTitle)}</div>` : ""}
//     </div>

//     <div class="t7-main-body">

//       ${summary ? `
//       <div class="t7-section">
//         <div class="t7-section-title">About Me</div>
//         <div class="t7-summary">${stripHtml(summary)}</div>
//       </div>` : ""}

//       ${experiences?.length > 0 ? `
//       <div class="t7-section">
//         <div class="t7-section-title">Experience</div>
//         ${experiences.map((exp) => {
//           const start = formatMonthYear(exp.startDate, true);
//           const end = exp.endDate ? formatMonthYear(exp.endDate, true) : (exp.startDate ? "Present" : "");
//           return `
//         <div class="t7-entry">
//           <div class="t7-entry-title">${exp.jobTitle || ""}</div>
//           ${exp.employer || exp.location ? `<div class="t7-entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" · ")}</div>` : ""}
//           ${start || end ? `<div class="t7-entry-date">${start}${start && end ? " – " : ""}${end}</div>` : ""}
//           ${exp.text ? `<div class="t7-entry-content">${stripHtml(exp.text)}</div>` : ""}
//         </div>`;
//         }).join("")}
//       </div>` : ""}

//       ${educations?.length > 0 ? `
//       <div class="t7-section">
//         <div class="t7-section-title">Education</div>
//         ${educations.map((edu) => {
//           const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(" – ");
//           return `
//         <div class="t7-entry">
//           <div class="t7-entry-title">${edu.schoolname || ""}</div>
//           ${edu.degree || edu.location ? `<div class="t7-entry-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" · ")}</div>` : ""}
//           ${dateStr ? `<div class="t7-entry-date">${dateStr}</div>` : ""}
//           ${edu.text ? `<div class="t7-entry-content">${stripHtml(edu.text)}</div>` : ""}
//         </div>`;
//         }).join("")}
//       </div>` : ""}

//       ${fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//       <div class="t7-section">
//         <div class="t7-section-title">Awards & Honors</div>
//         <div class="t7-entry-content">${fin.awards.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//       </div>` : ""}

//       ${fin.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//       <div class="t7-section">
//         ${s.name ? `<div class="t7-section-title">${s.name}</div>` : ""}
//         ${s.description ? `<div class="t7-entry-content">${stripHtml(s.description)}</div>` : ""}
//       </div>`).join("")}

//     </div>
//   </div>

//   <!-- RIGHT SIDEBAR -->
//   <div class="t7-sidebar">

//     <div class="t7-photo-block">
//       ${photoHtml}
//     </div>

//     <div class="t7-contact-block">
//       <div class="t7-sidebar-section-title">Contact</div>
//       ${addressStr ? `<div class="t7-contact-item"><span class="t7-contact-label">Address</span><br/>${addressStr}</div>` : ""}
//       ${contact?.phone ? `<div class="t7-contact-item"><span class="t7-contact-label">Phone</span><br/>${contact.phone}</div>` : ""}
//       ${contact?.email ? `<div class="t7-contact-item"><span class="t7-contact-label">Email</span><br/>${contact.email}</div>` : ""}
//       ${contact?.portfolio?.trim() ? `<div class="t7-contact-item"><span class="t7-contact-label">Portfolio</span><br/><a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" class="t7-contact-link">Portfolio</a></div>` : ""}
//     </div>

   

//     ${fin.languages.some((l) => l.name?.trim()) ? `
//     <div class="t7-sidebar-section">
//       <div class="t7-sidebar-section-title">Languages</div>
//       ${fin.languages.filter((l) => l.name?.trim()).map((l) => `
//       <div class="t7-skill-row">
//         <div class="t7-lang-name">${l.name}</div>
//         ${l.level ? `<div class="t7-skill-bar-bg"><div class="t7-skill-bar-fill" style="width:${skillPct(l.level)}"></div></div>` : ""}
//       </div>`).join("")}
//     </div>` : ""}

//     ${fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//     <div class="t7-sidebar-section">
//       <div class="t7-sidebar-section-title">Certifications</div>
//       <div class="t7-sidebar-text">${fin.certifications.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//     </div>` : ""}

//     ${fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//     <div class="t7-sidebar-section">
//       <div class="t7-sidebar-section-title">Interests</div>
//       <div class="t7-sidebar-text">${fin.hobbies.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//     </div>` : ""}

//     ${fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//     <div class="t7-sidebar-section">
//       <div class="t7-sidebar-section-title">References</div>
//       <div class="t7-sidebar-text">${fin.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//     </div>` : ""}

//     ${fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) ? `
//     <div class="t7-sidebar-section">
//       <div class="t7-sidebar-section-title">Websites</div>
//       ${fin.websites.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((i) => `
//       <div style="margin-bottom:5px">
//         ${i.websiteUrl ? `<div class="t7-sidebar-text"><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="t7-contact-link">${i.websiteUrl}</a></div>` : ""}
//         ${i.socialMedia ? `<div class="t7-sidebar-text"><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="t7-contact-link">${i.socialMedia}</a></div>` : ""}
//       </div>`).join("")}
//     </div>` : ""}

//   </div>
// </div>
// </body>
// </html>`;
//   };

//   /* ======================================================
//      PDF DOWNLOAD
//   ====================================================== */
//   const handleDownload = async () => {
//     try {
//       const html = generateHTML();
//       const res = await axios.post(`${API_URL}/api/candidates/generate-pdf`, { html }, { responseType: "blob" });
//       const url = window.URL.createObjectURL(res.data);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       alert("Failed to generate PDF. Please try again.");
//     }
//   };

//   const initials = `${contact?.firstName?.[0] || ""}${contact?.lastName?.[0] || ""}`;

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <>
//       {lastSegment === "download-resume" && (
//         <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
//           <button onClick={handleDownload} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
//             Download Resume
//           </button>
//         </div>
//       )}

//       <div className="resume-t7" style={{ margin: "0 auto", boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Lato:ital,wght@0,300;0,400;0,700;1,300&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* MAIN LEFT */}
//         <div className="t7-main">
//           <div className="t7-name-block">
//             <div className="t7-name">{contact?.firstName || ""} {contact?.lastName || ""}</div>
//             {contact?.jobTitle && <div className="t7-jobtitle">{getJobTitle(contact.jobTitle)}</div>}
//           </div>

//           <div className="t7-main-body">

//             {summary && (
//               <div className="t7-section">
//                 <div className="t7-section-title">About Me</div>
//                 <div className="t7-summary">{stripHtml(summary)}</div>
//               </div>
//             )}

//             {experiences?.length > 0 && (
//               <div className="t7-section">
//                 <div className="t7-section-title">Experience</div>
//                 {experiences.map((exp, index) => (
//                   <div key={exp.id || index} className="t7-entry">
//                     <div className="t7-entry-title">{exp.jobTitle || ""}</div>
//                     {(exp.employer || exp.location) && (
//                       <div className="t7-entry-subtitle">{[exp.employer, exp.location].filter(Boolean).join(" · ")}</div>
//                     )}
//                     <div className="t7-entry-date">
//                       <MonthYearDisplay value={exp.startDate} shortYear={true} />
//                       {exp.startDate && <span> – </span>}
//                       {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear={true} /> : exp.startDate && <span>Present</span>}
//                     </div>
//                     {exp.text && <div className="t7-entry-content">{stripHtml(exp.text)}</div>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {educations?.length > 0 && (
//               <div className="t7-section">
//                 <div className="t7-section-title">Education</div>
//                 {educations.map((edu, index) => (
//                   <div key={edu.id || index} className="t7-entry">
//                     <div className="t7-entry-title">{edu.schoolname || ""}</div>
//                     {(edu.degree || edu.location) && (
//                       <div className="t7-entry-subtitle">{[edu.degree, edu.location].filter(Boolean).join(" · ")}</div>
//                     )}
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="t7-entry-date">{[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}</div>
//                     )}
//                     {edu.text && <div className="t7-entry-content">{stripHtml(edu.text)}</div>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//               <div className="t7-section">
//                 <div className="t7-section-title">Awards & Honors</div>
//                 <div className="t7-entry-content">
//                   {fin.awards.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                     <div key={item.id || i}>{stripHtml(item.name || "")}</div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {fin.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((section, i) => (
//               <div key={section.id || i} className="t7-section">
//                 {section.name && <div className="t7-section-title">{section.name}</div>}
//                 {section.description && <div className="t7-entry-content">{stripHtml(section.description)}</div>}
//               </div>
//             ))}

//           </div>
//         </div>

//         {/* RIGHT SIDEBAR */}
//         <div className="t7-sidebar">
//           <div className="t7-photo-block">
//             {previewUrl
//               ? <img src={previewUrl} alt="Profile" className="t7-photo" />
//               : <div className="t7-photo-placeholder"><span>{initials || "?"}</span></div>
//             }
//           </div>

//           <div className="t7-contact-block">
//             <div className="t7-sidebar-section-title">Contact</div>
            
//             {contact?.phone && <div className="t7-contact-item"><span className="t7-contact-label">Phone</span><br />{contact.phone}</div>}
//             {contact?.email && <div className="t7-contact-item"><span className="t7-contact-label">Email</span><br />{contact.email}</div>}
//             {contact?.portfolio?.trim() && <div className="t7-contact-item"><span className="t7-contact-label">Portfolio</span><br /><a href={contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`} target="_blank" rel="noreferrer" className="t7-contact-link">Portfolio</a></div>}
//           </div>

       

//           {fin.languages.some((l) => l.name?.trim()) && (
//             <div className="t7-sidebar-section">
//               <div className="t7-sidebar-section-title">Languages</div>
//               {fin.languages.filter((l) => l.name?.trim()).map((l, i) => (
//                 <div key={l._id || i} className="t7-skill-row">
//                   <div className="t7-lang-name">{l.name}</div>
//                   {l.level && <div className="t7-skill-bar-bg"><div className="t7-skill-bar-fill" style={{ width: skillPct(l.level) }} /></div>}
//                 </div>
//               ))}
//             </div>
//           )}

//           {fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//             <div className="t7-sidebar-section">
//               <div className="t7-sidebar-section-title">Certifications</div>
//               <div className="t7-sidebar-text">
//                 {fin.certifications.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                   <div key={item.id || i}>{stripHtml(item.name || "")}</div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//             <div className="t7-sidebar-section">
//               <div className="t7-sidebar-section-title">Interests</div>
//               <div className="t7-sidebar-text">
//                 {fin.hobbies.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                   <div key={item.id || i}>{stripHtml(item.name || "")}</div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//             <div className="t7-sidebar-section">
//               <div className="t7-sidebar-section-title">References</div>
//               <div className="t7-sidebar-text">
//                 {fin.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                   <div key={item.id || i}>{stripHtml(item.name || "")}</div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) && (
//             <div className="t7-sidebar-section">
//               <div className="t7-sidebar-section-title">Websites</div>
//               {fin.websites.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((item, i) => (
//                 <div key={item.id || i} style={{ marginBottom: "5px" }}>
//                   {item.websiteUrl && <div className="t7-sidebar-text"><a href={item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`} target="_blank" rel="noreferrer" className="t7-contact-link">{item.websiteUrl}</a></div>}
//                   {item.socialMedia && <div className="t7-sidebar-text"><a href={item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`} target="_blank" rel="noreferrer" className="t7-contact-link">{item.socialMedia}</a></div>}
//                 </div>
//               ))}
//             </div>
//           )}

//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateTwenty;











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
import { formatMonthYear } from "@/app/utils";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/app/utils/api";
import { ResumeCustomization } from "@/app/(resume)/download-resume/page";
import { FaDownload, FaSpinner } from "react-icons/fa";
import {
  Contact,
  Education,
  Experience,
  Finalize,
} from "@/app/types/context.types";

// ─────────────────────────────────────────────────────────────────────────────
// A4 CONSTANTS — identical to TemplateOne
// ─────────────────────────────────────────────────────────────────────────────
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;

interface AllData {
  contact?: Contact;
  educations?: Education[];
  experiences?: Experience[];
  projects?: any[];
  skills?: any;
  finalize?: Finalize;
  summary?: string;
}

interface TemplateTwentyProps {
  alldata?: AllData;
  customization?: ResumeCustomization;
  viewMode?: boolean;
}

const TemplateTwenty: React.FC<TemplateTwentyProps> = ({
  alldata,
  customization,
  viewMode = false,
}) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

  // ── Data ──────────────────────────────────────────────────────────────────
  const contact = alldata?.contact || context.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const projects = alldata?.projects || context?.projects || [];
  const skills = (alldata as any)?.skills?.text || (context as any)?.skills?.text || "";
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";

  const addressParts = [contact?.address, contact?.city, contact?.country].filter(Boolean);

  const isFinalizeData = (data: any): data is Finalize =>
    data && typeof data === "object" && !Array.isArray(data);

  const fin = {
    languages: isFinalizeData(finalize) && Array.isArray(finalize.languages) ? finalize.languages : [],
    certifications: isFinalizeData(finalize) && Array.isArray(finalize.certificationsAndLicenses) ? finalize.certificationsAndLicenses : [],
    hobbies: isFinalizeData(finalize) && Array.isArray(finalize.hobbiesAndInterests) ? finalize.hobbiesAndInterests : [],
    awards: isFinalizeData(finalize) && Array.isArray(finalize.awardsAndHonors) ? finalize.awardsAndHonors : [],
    websites: isFinalizeData(finalize) && Array.isArray(finalize.websitesAndSocialMedia) ? finalize.websitesAndSocialMedia : [],
    references: isFinalizeData(finalize) && Array.isArray(finalize.references) ? finalize.references : [],
    customSection: isFinalizeData(finalize) && Array.isArray(finalize.customSection) ? finalize.customSection : [],
  };

  const skillPct = (level: any) => (level ? `${(Number(level) / 5) * 100}%` : "0%");
  const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, "") || "";

  const activeFontFamily = customization?.fontFamily ?? "'Lato', sans-serif";

  // ── Font map — identical to TemplateOne ─────────────────────────────────────
  const getFontImport = (fontFamily: string): string => {
    const fontMap: Record<string, string> = {
      "'Inter', sans-serif":
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      "'Poppins', sans-serif":
        "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
      "'Lato', sans-serif":
        "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300&display=swap",
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
    return fontMap[fontFamily] || fontMap["'Lato', sans-serif"];
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes("serif")) return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes("monospace")) return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  const getJobTitle = (jobTitle: any): string => {
    if (!jobTitle) return "";
    if (typeof jobTitle === "string") return jobTitle;
    if (typeof jobTitle === "object" && jobTitle !== null)
      return (jobTitle as any)?.name || (jobTitle as any)?.label || "";
    return "";
  };

  // ── CSS builder ────────────────────────────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @import url('${getFontImport(fontFamily)}');
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

    @page { size: A4; margin: 15mm; }
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #ffffff; }

    .t20-resume {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background: #ffffff;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 13px;
      line-height: 1.5;
      color: #2a2a2a;
    }
    .t20-resume p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
    .t20-resume ul { list-style-type: disc !important; padding-left: 18px !important; margin: 0 !important; }
    .t20-resume ol { list-style-type: decimal !important; padding-left: 18px !important; margin: 0 !important; }
    .t20-resume li { margin: 0 0 2px 0 !important; padding: 0 !important; line-height: 1.5 !important; font-size: 13px !important; }

    /* ── HEADER ── */
    .t20-header {
      padding: 24px 0 20px;
      border-bottom: 3px solid #e8621a;
      margin-bottom: 20px;
      position: relative;
    }
    .t20-name {
      font-family: 'Montserrat', Arial, sans-serif;
      font-size: 30px;
      font-weight: 800;
      color: #1a1a1a;
      letter-spacing: -0.5px;
      line-height: 1.1;
      margin-bottom: 6px;
      text-transform: uppercase;
    }
    .t20-jobtitle {
      font-family: 'Montserrat', Arial, sans-serif;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #e8621a;
      line-height: 1.4;
      margin-bottom: 10px;
    }
    .t20-contact-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 18px;
    }
    .t20-contact-item {
      font-size: 11.5px;
      color: #444;
      line-height: 1.5;
    }
    .t20-contact-label {
      font-weight: 700;
      color: #1a1a1a;
      font-size: 10px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-right: 4px;
    }
    .t20-contact-link { color: #e8621a; text-decoration: underline; }

    /* ── SECTION ── */
    .t20-section { margin-bottom: 20px; }
    .t20-section-title {
      font-family: 'Montserrat', Arial, sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #e8621a;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      line-height: 1.4;
      page-break-after: avoid; break-after: avoid;
    }
    .t20-section-title::after { content: ''; flex: 1; height: 2px; background-color: #f0d9c8; }

    /* ── SUMMARY / SKILLS / TEXT BLOCKS ── */
    .t20-summary, .t20-skills-content {
      font-size: 13px; font-weight: 300; color: #444; line-height: 1.75; word-wrap: break-word;
    }
    .t20-summary p, .t20-skills-content p { margin: 0 !important; line-height: 1.75 !important; font-size: 13px !important; }

    /* ── ENTRY (experience / education) ── */
    .t20-entry {
      margin-bottom: 14px; padding-left: 14px; border-left: 3px solid #f0d9c8; position: relative;
      page-break-inside: avoid; break-inside: avoid;
    }
    .t20-entry::before {
      content: ''; position: absolute; left: -6px; top: 5px; width: 9px; height: 9px;
      border-radius: 50%; background-color: #e8621a;
    }
    .t20-entry:last-child { margin-bottom: 0; }
    .t20-entry-header { page-break-after: avoid; break-after: avoid; }
    .t20-entry-title { font-family: 'Montserrat', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #1a1a1a; line-height: 1.3; margin-bottom: 2px; }
    .t20-entry-subtitle { font-size: 12px; font-weight: 700; color: #e8621a; margin-bottom: 2px; letter-spacing: 0.3px; }
    .t20-entry-date { font-size: 11px; color: #888; font-weight: 300; margin-bottom: 4px; letter-spacing: 0.5px; }
    .t20-entry-content { font-size: 12.5px; color: #444; font-weight: 300; line-height: 1.6; word-wrap: break-word; overflow-wrap: break-word; }
    .t20-entry-content p { margin: 0 !important; padding: 0 !important; line-height: 1.6 !important; font-size: 12.5px !important; }
    .t20-entry-content ul { list-style-type: disc !important; padding-left: 16px !important; margin: 0 !important; }
    .t20-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
    .t20-entry-content li { margin: 0 0 2px 0 !important; line-height: 1.6 !important; font-size: 12.5px !important; }

    /* ── PROJECTS ── */
    .t20-project-header {
      display: flex; justify-content: space-between; align-items: baseline;
      gap: 8px; flex-wrap: wrap; margin-bottom: 3px;
    }
    .t20-project-links { display: flex; gap: 8px; flex-shrink: 0; }
    .t20-link-badge {
      font-size: 10.5px; font-weight: 700; color: #e8621a; text-decoration: underline;
      white-space: nowrap;
    }
    .t20-tech-stack { display: flex; flex-wrap: wrap; gap: 5px; margin: 4px 0 6px; }
    .t20-tech-chip {
      font-size: 10px; font-weight: 600; color: #c95510; background: #f5ece0;
      border-radius: 3px; padding: 2px 7px;
    }

    /* ── SKILL / LANGUAGE BARS ── */
    .t20-skill-row { margin-bottom: 10px; }
    .t20-skill-name { font-size: 12px; font-weight: 700; color: #1a1a1a; margin-bottom: 3px; letter-spacing: 0.2px; }
    .t20-skill-bar-bg { height: 4px; background: #f0d9c8; border-radius: 2px; overflow: hidden; }
    .t20-skill-bar-fill { height: 100%; background-color: #e8621a; border-radius: 2px; }

    /* ── SIMPLE TEXT LIST (awards / certs / hobbies / references) ── */
    .t20-text-list-item { font-size: 12.5px; color: #444; font-weight: 300; line-height: 1.6; margin-bottom: 3px; }

    .t20-page-break { page-break-before: always !important; break-before: page !important; display: block; height: 0; margin: 0; padding: 0; }

    @media print {
      *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      html, body { overflow: visible; }
      .t20-resume { width: 100% !important; padding: 0 !important; }
      .t20-contact-link { color: #e8621a !important; text-decoration: underline !important; }
      a, a:visited { color: inherit !important; }
    }
  `,
    [],
  );

  // ── HTML builder ───────────────────────────────────────────────────────────
  const generateHTML = useCallback(
    (forPDF = false, pageBreakIds: string[] = []): string => {
      const CSS = buildCSS(activeFontFamily);
      const href = (url: string) => (url.startsWith("http") ? url : `https://${url}`);
      const addressStr = addressParts.join(", ");

      const hasSkillsContent = (): boolean => {
        if (!skills?.trim()) return false;
        const textOnly = skills.replace(/<[^>]*>/g, "").trim();
        return textOnly.length > 0;
      };

      const header = `
      <div class="t20-header">
        <div class="t20-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
        ${contact?.jobTitle ? `<div class="t20-jobtitle">${getJobTitle(contact.jobTitle)}</div>` : ""}
        <div class="t20-contact-row">
          ${addressStr ? `<span class="t20-contact-item"><span class="t20-contact-label">Address</span>${addressStr}</span>` : ""}
          ${contact?.phone ? `<span class="t20-contact-item"><span class="t20-contact-label">Phone</span>${contact.phone}</span>` : ""}
          ${contact?.email ? `<span class="t20-contact-item"><span class="t20-contact-label">Email</span>${contact.email}</span>` : ""}
          ${(contact as any)?.portfolio?.trim() ? `<span class="t20-contact-item"><a href="${href((contact as any).portfolio)}" class="t20-contact-link" target="_blank">Portfolio</a></span>` : ""}
        </div>
      </div>`;

      const summaryBlock = summary?.trim()
        ? `<div class="t20-section" data-block-id="summary">
             <div class="t20-section-title">About Me</div>
             <div class="t20-summary">${stripHtml(summary)}</div>
           </div>`
        : "";

      const expBlock = experiences.length
        ? `<div class="t20-section" data-block-id="exp-section">
             <div class="t20-section-title">Experience</div>
             ${experiences
               .map((exp: any, i: number) => {
                 const start = formatMonthYear(exp.startDate, true);
                 const end = exp.endDate ? formatMonthYear(exp.endDate, true) : exp.startDate ? "Present" : "";
                 return `<div class="t20-entry" data-block-id="exp-${i}">
                 <div class="t20-entry-header">
                   <div class="t20-entry-title">${exp.jobTitle || ""}</div>
                   ${exp.employer || exp.location ? `<div class="t20-entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" · ")}</div>` : ""}
                   ${start || end ? `<div class="t20-entry-date">${start}${start && end ? " – " : ""}${end}</div>` : ""}
                 </div>
                 ${exp.text ? `<div class="t20-entry-content">${stripHtml(exp.text)}</div>` : ""}
               </div>`;
               })
               .join("")}
           </div>`
        : "";

      const projBlock = projects.length
        ? `<div class="t20-section" data-block-id="proj-section">
             <div class="t20-section-title">Projects</div>
             ${projects
               .map((p: any, i: number) => {
                 return `<div class="t20-entry" data-block-id="proj-${i}">
                 <div class="t20-entry-header">
                   <div class="t20-project-header">
                     <div class="t20-entry-title">${p.title || ""}</div>
                     ${
                       p.liveUrl || p.githubUrl
                         ? `<div class="t20-project-links">
                           ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="t20-link-badge" target="_blank">Live Demo</a>` : ""}
                           ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t20-link-badge" target="_blank">GitHub</a>` : ""}
                         </div>`
                         : ""
                     }
                   </div>
                 </div>
                 ${p.techStack?.length ? `<div class="t20-tech-stack">${p.techStack.map((t: string) => `<span class="t20-tech-chip">${t}</span>`).join("")}</div>` : ""}
                 ${p.description ? `<div class="t20-entry-content">${stripHtml(p.description)}</div>` : ""}
               </div>`;
               })
               .join("")}
           </div>`
        : "";

      const eduBlock = educations.length
        ? `<div class="t20-section" data-block-id="edu-section">
             <div class="t20-section-title">Education</div>
             ${educations
               .map((edu: any, i: number) => {
                 const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(" – ");
                 return `<div class="t20-entry" data-block-id="edu-${i}">
                 <div class="t20-entry-header">
                   <div class="t20-entry-title">${edu.schoolname || ""}</div>
                   ${edu.degree || edu.location ? `<div class="t20-entry-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" · ")}</div>` : ""}
                   ${dateStr ? `<div class="t20-entry-date">${dateStr}</div>` : ""}
                 </div>
                 ${edu.text ? `<div class="t20-entry-content">${stripHtml(edu.text)}</div>` : ""}
               </div>`;
               })
               .join("")}
           </div>`
        : "";

      const skillsBlock = hasSkillsContent()
        ? `<div class="t20-section" data-block-id="skills-section">
             <div class="t20-section-title">Skills</div>
             <div class="t20-skills-content" data-block-id="skills-content">${skills}</div>
           </div>`
        : "";

      const languagesBlock = fin.languages.some((l: any) => l.name?.trim())
        ? `<div class="t20-section" data-block-id="languages-section">
             <div class="t20-section-title">Languages</div>
             ${fin.languages
               .filter((l: any) => l.name?.trim())
               .map(
                 (l: any, i: number) => `
               <div class="t20-skill-row" data-block-id="lang-${i}">
                 <div class="t20-skill-name">${l.name}</div>
                 ${l.level ? `<div class="t20-skill-bar-bg"><div class="t20-skill-bar-fill" style="width:${skillPct(l.level)}"></div></div>` : ""}
               </div>`,
               )
               .join("")}
           </div>`
        : "";

      const certificationsBlock = fin.certifications.some((i: any) => i.name?.replace(/<[^>]*>/g, "").trim())
        ? `<div class="t20-section" data-block-id="certifications-section">
             <div class="t20-section-title">Certifications</div>
             ${fin.certifications
               .filter((i: any) => i.name?.replace(/<[^>]*>/g, "").trim())
               .map((i: any, idx: number) => `<div class="t20-text-list-item" data-block-id="cert-${idx}">${stripHtml(i.name || "")}</div>`)
               .join("")}
           </div>`
        : "";

      const awardsBlock = fin.awards.some((i: any) => i.name?.replace(/<[^>]*>/g, "").trim())
        ? `<div class="t20-section" data-block-id="awards-section">
             <div class="t20-section-title">Awards & Honors</div>
             ${fin.awards
               .filter((i: any) => i.name?.replace(/<[^>]*>/g, "").trim())
               .map((i: any, idx: number) => `<div class="t20-text-list-item" data-block-id="award-${idx}">${stripHtml(i.name || "")}</div>`)
               .join("")}
           </div>`
        : "";

      const hobbiesBlock = fin.hobbies.some((i: any) => i.name?.replace(/<[^>]*>/g, "").trim())
        ? `<div class="t20-section" data-block-id="hobbies-section">
             <div class="t20-section-title">Interests</div>
             ${fin.hobbies
               .filter((i: any) => i.name?.replace(/<[^>]*>/g, "").trim())
               .map((i: any, idx: number) => `<div class="t20-text-list-item" data-block-id="hobby-${idx}">${stripHtml(i.name || "")}</div>`)
               .join("")}
           </div>`
        : "";

      const referencesBlock = fin.references.some((i: any) => i.name?.replace(/<[^>]*>/g, "").trim())
        ? `<div class="t20-section" data-block-id="references-section">
             <div class="t20-section-title">References</div>
             ${fin.references
               .filter((i: any) => i.name?.replace(/<[^>]*>/g, "").trim())
               .map((i: any, idx: number) => `<div class="t20-text-list-item" data-block-id="ref-${idx}">${stripHtml(i.name || "")}</div>`)
               .join("")}
           </div>`
        : "";

      const websitesBlock = fin.websites.some((i: any) => i.websiteUrl?.trim() || i.socialMedia?.trim())
        ? `<div class="t20-section" data-block-id="websites-section">
             <div class="t20-section-title">Websites</div>
             ${fin.websites
               .filter((i: any) => i.websiteUrl?.trim() || i.socialMedia?.trim())
               .map(
                 (i: any, idx: number) => `
               <div class="t20-text-list-item" data-block-id="website-${idx}">
                 ${i.websiteUrl ? `<a href="${href(i.websiteUrl)}" class="t20-contact-link" target="_blank">${i.websiteUrl}</a>` : ""}
                 ${i.socialMedia ? `<br/><a href="${href(i.socialMedia)}" class="t20-contact-link" target="_blank">${i.socialMedia}</a>` : ""}
               </div>`,
               )
               .join("")}
           </div>`
        : "";

      const customBlock = fin.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim())
        ? fin.customSection
            .filter((s: any) => s?.name?.trim() || s?.description?.trim())
            .map(
              (s: any, i: number) => `
              <div class="t20-section" data-block-id="custom-${i}">
                ${s.name ? `<div class="t20-section-title">${s.name}</div>` : ""}
                ${s.description ? `<div class="t20-entry-content">${stripHtml(s.description)}</div>` : ""}
              </div>`,
            )
            .join("")
        : "";

      const pdfStyle = forPDF
        ? `<style>.t20-resume { width: 100% !important; padding: 0 !important; }</style>`
        : "";

      let bodyContent = `${header}${summaryBlock}${expBlock}${projBlock}${eduBlock}${skillsBlock}${languagesBlock}${certificationsBlock}${awardsBlock}${hobbiesBlock}${referencesBlock}${websitesBlock}${customBlock}`;

      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t20-page-break";
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
<body style="margin:0;padding:0;background:#ffffff;">
  <div class="t20-resume">${bodyContent}</div>
</body>
</html>`;
    },
    [
      activeFontFamily,
      contact,
      educations,
      experiences,
      projects,
      skills,
      finalize,
      summary,
      addressParts,
      buildCSS,
    ],
  );

  // ── Page splitter — same algorithm as TemplateOne ───────────────────────────
  const CSS_FOR_MEASURE = buildCSS(activeFontFamily);

  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t20-resume");
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
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: auto !important; overflow: visible !important; background: #ffffff !important; }
  .t20-resume { width: ${A4_W}px !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; padding-top: 0 !important; padding-bottom: 0 !important; margin: 0 !important; box-sizing: border-box !important; }
</style></head>
<body>${resumeSnapshot}</body></html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t20-resume");
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
          const getRelTop = (el: HTMLElement) => el.getBoundingClientRect().top - resumeRect.top + scrollY;
          const getRelBottom = (el: HTMLElement) => getRelTop(el) + el.getBoundingClientRect().height;

          interface Block {
            top: number;
            bottom: number;
            id?: string;
          }
          const blocks: Block[] = [];

          // Breakable item-level boundaries
          const ITEM_SELECTORS = [".t20-entry", ".t20-skill-row", ".t20-text-list-item"].join(", ");
          resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
            const top = getRelTop(el),
              bottom = getRelBottom(el);
            if (bottom - top > 8) blocks.push({ top, bottom, id: el.dataset.blockId });
          });

          // Skills content list items — breakable inside the skills block
          const skillsLis = Array.from(resume.querySelectorAll<HTMLElement>(".t20-skills-content li"));
          skillsLis.forEach((li) => {
            const top = getRelTop(li);
            const bottom = getRelBottom(li);
            if (bottom - top > 2) blocks.push({ top, bottom });
          });

          // Keep each section's title glued to its first item (avoid orphan headers)
          resume.querySelectorAll<HTMLElement>(".t20-section-title").forEach((title) => {
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
            if (firstItem) {
              // Allow long free-flowing text blocks to split across pages
              if (
                firstItem.classList.contains("t20-skills-content") ||
                firstItem.classList.contains("t20-summary")
              )
                return;

              const anchorBottom = getRelBottom(firstItem);
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
            let actualCut = naiveCut,
              cutBlockId: string | undefined;
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
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: ${A4_H}px !important; overflow: hidden !important; background: #ffffff !important; }
  .page-margin-box { position: relative; width: ${A4_W}px; height: ${A4_H}px; background: #ffffff; overflow: hidden; }
  .page-content-clip { position: absolute; top: ${MARGIN}px; left: 0; width: ${A4_W}px; height: ${clipH}px; overflow: hidden; }
  .page-shift { position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px; }
  .t20-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
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

  // ── Download handler ───────────────────────────────────────────────────────
  const handleDownload = async (): Promise<void> => {
    setIsDownloading(true);
    try {
      const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
      const pdfHtml = generateHTML(true, pageBreakIds);
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
    } finally {
      setIsDownloading(false);
    }
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  const isThumbnail = !!alldata && !viewMode;

  return (
    <>
      {/* Download button — hide in thumbnail mode */}
      {/* {!isThumbnail && lastSegment === "download-resume" && ( */}
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
                  : "bg-[#e8621a] hover:bg-[#c95510] hover:shadow-2xl cursor-pointer"
              }
            `}
          >
            <div className="relative flex items-center justify-center gap-3 text-lg">
              {isDownloading ? (
                <>
                  <FaSpinner className="animate-spin text-xl" />
                  <span>Generating PDF …</span>
                </>
              ) : (
                <>
                  <FaDownload className="text-xl group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Resume</span>
                  <span className="text-sm opacity-75 font-light ml-1">PDF</span>
                </>
              )}
            </div>
          </motion.button>
        </div>
      {/* )} */}

      {isThumbnail ? (
        // ── THUMBNAIL MODE (dashboard card) ─────────────────────────────────
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
        // ── FULL PREVIEW MODE (editor + view modal) ──────────────────────────
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

export default TemplateTwenty;