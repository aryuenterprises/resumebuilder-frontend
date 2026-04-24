// "use client";

// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { IoPersonOutline } from "react-icons/io5";
// import { API_URL } from "@/app/config/api";
// import { MonthYearDisplay, formatMonthYear } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import {
//   Contact,
//   Education,
//   Experience,
//   Finalize,
//   ResumeProps,
//   Skill,
// } from "@/app/types/context.types";

// const TemplateFive: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const { croppedImage } = context.contact || {};
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";
//   const linkedinUrl = contact?.linkedin;

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
//   }, [croppedImage, contact.photo]);

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
//      SHARED CSS — scoped to .resume-t5 to prevent ANY leakage
//      No body rules, no global resets, no Tailwind
//   ====================================================== */
//   const styles = `
//     /* ── ALL RULES SCOPED TO .resume-t5 ── */

//     .resume-t5 * {
//       box-sizing: border-box;
//     }

//     .resume-t5 {
//       width: 210mm;
//       min-height: 297mm;
//       padding: 5mm;
//       background-color: #ffffff;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//       color: #111827;
//       text-align: left;
//     }

//       .resume-t5.is-preview {
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

//     /* Scoped resets — only inside resume */
//     .resume-t5 p {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-family: 'Nunito', Arial, sans-serif;
//     }

//     .resume-t5 ul {
//       list-style-type: disc !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .resume-t5 ol {
//       list-style-type: decimal !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .resume-t5 li {
//       margin-top: 0 !important;
//       margin-bottom: 1px !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 14px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }

//     /* ── HEADER ── */
//     .resume-t5 .t5-header {
//       background-color: #facc15;
//       padding: 8px 40px;
//       border-radius: 6px;
//       margin-bottom: 10px;
//     }

//       .resume-t5 .t5-header-top {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//     }

//      .resume-t5 .t5-header-left {
//       display: flex;
//       align-items: center;
//       gap: 12px;
//     }

//     .resume-t5 .t5-photo {
//       width: 96px;
//       height: 96px;
//       border-radius: 6px;
//       object-fit: cover;
//       border: 1px solid #e5e7eb;
//       flex-shrink: 0;
//     }

//     .resume-t5 .t5-photo-placeholder {
//       width: 96px;
//       height: 96px;
//       border-radius: 6px;
//       border: 1px solid #e5e7eb;
//       background: #f3f4f6;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       flex-shrink: 0;
//     }

//     .resume-t5 .t5-name {
//       font-size: 22px;
//       font-weight: 700;
//       text-transform: uppercase;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.2;
//       margin-bottom: 3px;
//     }

//     .resume-t5 .t5-jobtitle {
//       font-size: 13px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .resume-t5 .t5-details-block {
//       padding-left: 40px;
//     }

//     .resume-t5 .t5-details-label {
//       display: inline-block;
//       background: #000;
//       color: #fff;
//       font-size: 15px;
//       font-weight: 600;
//       padding: 4px 8px;
//       border-radius: 6px;
//       margin-bottom: 6px;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.4;
//     }

//     .resume-t5 .t5-details-text {
//       font-size: 13px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .resume-t5 .t5-links {
//       display: flex;
//       align-items: center;
//       gap: 12px;
//       margin-top: 10px;
//     }

//     .resume-t5 .t5-link-btn {
//       display: inline-flex;
//       align-items: center;
//       padding: 4px 12px;
//       border-radius: 9999px;
//       font-size: 13px;
//       font-weight: 500;
//       color: #fff;
//       text-decoration: none;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//      .resume-t5 .t5-link-linkedin { background-color: #2563eb; }
//     .resume-t5 .t5-link-portfolio { background-color: #1f2937; }

//     /* ── SECTION ── */
//     .resume-t5 .t5-section {
//       margin-top: 10px;
//       padding: 0 40px;
//     }

//     .resume-t5 .t5-section-title {
//       display: inline-block;
//       background: #000;
//       color: #fff;
//       font-size: 15px;
//       font-weight: 600;
//       text-transform: uppercase;
//       padding: 4px 8px;
//       border-radius: 6px;
//       margin-bottom: 8px;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.4;
//     }

//     /* ── ENTRY ── */
//     .resume-t5 .t5-entry {
//       margin-bottom: 14px;
//     }

//     .resume-t5 .t5-entry-heading {
//       font-size: 16px;
//       font-weight: 600;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.4;
//       margin-bottom: 1px;
//       word-wrap: break-word;
//     }

//     .resume-t5 .t5-entry-heading-muted {
//       font-size: 16px;
//       font-weight: 400;
//       color: #6b7280;
//       font-family: 'Nunito', Arial, sans-serif;
//     }

//     .resume-t5 .t5-entry-sub {
//       font-size: 14px;
//       color: #6b7280;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .resume-t5 .t5-entry-date {
//       font-size: 13px;
//       color: #4b5563;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       display: flex;
//       align-items: center;
//       gap: 4px;
//       margin-top: 2px;
//     }

//     .resume-t5 .t5-entry-content {
//       font-size: 14px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       padding-top: 4px;
//       padding-bottom: 4px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .resume-t5 .t5-entry-content p {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 14px !important;
//     }

//     .resume-t5 .t5-entry-content ul {
//       list-style-type: disc !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .resume-t5 .t5-entry-content ol {
//       list-style-type: decimal !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .resume-t5 .t5-entry-content li {
//       margin: 0 !important;
//       margin-bottom: 1px !important;
//       line-height: 1.5 !important;
//       font-size: 14px !important;
//     }

//     /* ── SKILLS GRID ── */
//     .resume-t5 .t5-skills-grid {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       column-gap: 32px;
//       row-gap: 10px;
//       margin-top: 4px;
//     }

//     .resume-t5 .t5-skill-name {
//       font-size: 13px;
//       color: #1f2937;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       margin-bottom: 2px;
//       word-wrap: break-word;
//     }

//     .resume-t5 .t5-skill-bar-wrap {
//       height: 4px;
//       width: 100%;
//       background: #d1d5db;
//       border-radius: 9999px;
//       overflow: hidden;
//     }

//     .resume-t5 .t5-skill-bar-fill {
//       height: 100%;
//       background: #0c0c1e;
//       border-radius: 9999px;
//     }

//     /* ── EXTRA CONTENT ── */
//     .resume-t5 .t5-extra {
//       font-size: 14px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .resume-t5 .t5-extra p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//     .resume-t5 .t5-extra div { line-height: 1.5 !important; }

//     /* ── WEBSITES ── */
//     .resume-t5 .t5-website-label {
//       font-size: 13px;
//       font-weight: 600;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .resume-t5 .t5-website-link {
//       font-size: 13px;
//       color: #2563eb;
//       text-decoration: underline;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       word-wrap: break-word;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page { size: A4; margin: 5mm; }
//       @page :first { margin-top: 0; }

//       .resume-t5 {
//         width: 100% !important;
//         padding: 0 !important;
//         box-shadow: none !important;
//       }

//       .resume-t5 .t5-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .resume-t5 .t5-section-title { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .resume-t5 .t5-details-label { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .resume-t5 .t5-link-btn { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .resume-t5 .t5-skill-bar-fill { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

//       .resume-t5 .t5-entry { page-break-inside: avoid; break-inside: avoid; }
//       .resume-t5 .t5-section-title { page-break-after: avoid; break-after: avoid; }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION — no Tailwind, shared CSS classes
//   ====================================================== */
//   const generateHTML = () => {
//     const addressStr = [contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ");
//     const photoHtml = previewUrl
//       ? `<img src="${previewUrl}" alt="Profile" class="t5-photo" />`
//       : `<div class="t5-photo-placeholder"><span style="color:#9ca3af;font-size:12px;font-family:'Nunito',Arial,sans-serif">No Photo</span></div>`;

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>
//     body { margin: 0; padding: 0; background: white; font-family: 'Nunito', Arial, sans-serif; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="resume-t5">

//   <!-- HEADER -->
//   <div class="t5-header">
//     <div class="t5-header-top">
//       <div class="t5-header-left">
//         ${photoHtml}
//         <div>
//           <div class="t5-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           ${contact?.jobTitle ? `<div class="t5-jobtitle">${getJobTitle(contact.jobTitle)}</div>` : ""}
//         </div>
//       </div>
//       <div class="t5-details-block">
//         <div class="t5-details-label">DETAILS</div>
//         ${addressStr ? `<div class="t5-details-text">${addressStr}</div>` : ""}
//         ${contact?.phone ? `<div class="t5-details-text">${contact.phone}</div>` : ""}
//         ${contact?.email ? `<div class="t5-details-text">${contact.email}</div>` : ""}
//       </div>
//     </div>
//     ${linkedinUrl?.trim() || contact?.portfolio?.trim() ? `
//     <div class="t5-links">
//       ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t5-link-btn t5-link-linkedin">LinkedIn</a>` : ""}
//       ${contact?.portfolio?.trim() ? `<a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" class="t5-link-btn t5-link-portfolio">Portfolio</a>` : ""}
//     </div>` : ""}
//   </div>

//   <!-- SUMMARY -->
//   ${summary ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Summary</div>
//     <div class="t5-extra">${stripHtml(summary)}</div>
//   </div>` : ""}

//   <!-- EXPERIENCE -->
//   ${experiences?.length > 0 ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Experience</div>
//     ${experiences.map((exp) => {
//       const start = formatMonthYear(exp.startDate, true);
//       const end = exp.endDate ? formatMonthYear(exp.endDate, true) : (exp.startDate ? "Present" : "");
//       return `
//     <div class="t5-entry">
//       ${exp.jobTitle || exp.employer || exp.location ? `
//       <div class="t5-entry-heading">
//         ${exp.jobTitle || ""}
//         ${exp.employer ? `<span class="t5-entry-heading-muted"> — ${exp.employer}</span>` : ""}
//         ${exp.location ? `<span class="t5-entry-heading-muted"> — ${exp.location}</span>` : ""}
//       </div>` : ""}
//       <div class="t5-entry-date">${start}${start && end ? " - " : ""}${end}</div>
//       ${exp.text ? `<div class="t5-entry-content">${stripHtml(exp.text)}</div>` : ""}
//     </div>`;
//     }).join("")}
//   </div>` : ""}

//   <!-- EDUCATION -->
//   ${educations?.length > 0 ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Education</div>
//     ${educations.map((edu) => {
//       const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(" — ");
//       return `
//     <div class="t5-entry">
//       ${edu.schoolname ? `<div class="t5-entry-heading">${edu.schoolname}</div>` : ""}
//       ${edu.degree ? `<div class="t5-entry-sub">${edu.degree}</div>` : ""}
//       ${edu.location ? `<div class="t5-entry-sub">${edu.location}</div>` : ""}
//       ${dateStr ? `<div class="t5-entry-date">${dateStr}</div>` : ""}
//       ${edu.text ? `<div class="t5-entry-content">${stripHtml(edu.text)}</div>` : ""}
//     </div>`;
//     }).join("")}
//   </div>` : ""}

//   <!-- SKILLS -->
//   ${skills.length > 0 ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Skills</div>
//     <div class="t5-skills-grid">
//       ${skills.map((s) => `
//       <div>
//         <div class="t5-skill-name">${s.skill || ""}</div>
//         ${s.level ? `<div class="t5-skill-bar-wrap"><div class="t5-skill-bar-fill" style="width:${skillPct(s.level)}"></div></div>` : ""}
//       </div>`).join("")}
//     </div>
//   </div>` : ""}

//   <!-- LANGUAGES -->
//   ${fin.languages.some((l) => l.name?.trim()) ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Languages</div>
//     <div class="t5-skills-grid">
//       ${fin.languages.filter((l) => l.name?.trim()).map((l) => `
//       <div>
//         <div class="t5-skill-name">${l.name}</div>
//         ${l.level ? `<div class="t5-skill-bar-wrap"><div class="t5-skill-bar-fill" style="width:${skillPct(l.level)}"></div></div>` : ""}
//       </div>`).join("")}
//     </div>
//   </div>` : ""}

//   <!-- CERTIFICATIONS -->
//   ${fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Certifications and Licenses</div>
//     <div class="t5-extra">${fin.certifications.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//   </div>` : ""}

//   <!-- HOBBIES -->
//   ${fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Hobbies and Interests</div>
//     <div class="t5-extra">${fin.hobbies.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//   </div>` : ""}

//   <!-- AWARDS -->
//   ${fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Awards and Honors</div>
//     <div class="t5-extra">${fin.awards.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//   </div>` : ""}

//   <!-- WEBSITES -->
//   ${fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Websites and Social Media</div>
//     <div class="t5-extra">
//       ${fin.websites.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((i) => `
//       <div style="margin-bottom:6px">
//         ${i.websiteUrl ? `<div><span class="t5-website-label">Website URL: </span><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="t5-website-link">${i.websiteUrl}</a></div>` : ""}
//         ${i.socialMedia ? `<div><span class="t5-website-label">Social Media URL: </span><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="t5-website-link">${i.socialMedia}</a></div>` : ""}
//       </div>`).join("")}
//     </div>
//   </div>` : ""}

//   <!-- REFERENCES -->
//   ${fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//   <div class="t5-section">
//     <div class="t5-section-title">References</div>
//     <div class="t5-extra">${fin.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//   </div>` : ""}

//   <!-- CUSTOM SECTIONS -->
//   ${fin.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//   <div class="t5-section">
//     ${s.name ? `<div class="t5-section-title">${s.name}</div>` : ""}
//     ${s.description ? `<div class="t5-extra">${stripHtml(s.description)}</div>` : ""}
//   </div>`).join("")}

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

//   /* ======================================================
//      JSX PREVIEW — same CSS classes, no Tailwind
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

//       <div
//               className={`resume-t5  ${alldata ? 'is-preview' : ''}`}

//       style={{ margin: "0 auto",           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : ""
//  }}>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="t5-header">
//           <div className="t5-header-top">
//             <div className="t5-header-left">
//               {previewUrl
//                 ? <img src={previewUrl} alt="Profile" className="t5-photo" />
//                 : <div className="t5-photo-placeholder"><IoPersonOutline style={{ width: 40, height: 40, color: "#9ca3af" }} /></div>
//               }
//               <div>
//                 <div className="t5-name">{contact?.firstName || ""} {contact?.lastName || ""}</div>
//                 {contact?.jobTitle && <div className="t5-jobtitle">{getJobTitle(contact.jobTitle)}</div>}
//               </div>
//             </div>
//             <div className="t5-details-block">
//               <div className="t5-details-label">DETAILS</div>
//               {[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).length > 0 && (
//                 <div className="t5-details-text">{[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ")}</div>
//               )}
//               {contact?.phone && <div className="t5-details-text">{contact.phone}</div>}
//               {contact?.email && <div className="t5-details-text">{contact.email}</div>}
//             </div>
//           </div>
//           {(linkedinUrl?.trim() || contact?.portfolio?.trim()) && (
//             <div className="t5-links">
//               {linkedinUrl?.trim() && (
//                 <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer" className="t5-link-btn t5-link-linkedin">LinkedIn</a>
//               )}
//               {contact?.portfolio?.trim() && (
//                 <a href={contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`} target="_blank" rel="noreferrer" className="t5-link-btn t5-link-portfolio">Portfolio</a>
//               )}
//             </div>
//           )}
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="t5-section">
//             <div className="t5-section-title">Summary</div>
//             <div className="t5-extra">{stripHtml(summary)}</div>
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences?.length > 0 && (
//           <div className="t5-section">
//             <div className="t5-section-title">Experience</div>
//             {experiences.map((exp, index) => (
//               <div key={exp.id || index} className="t5-entry">
//                 {(exp.jobTitle || exp.employer || exp.location) && (
//                   <div className="t5-entry-heading">
//                     {exp.jobTitle || ""}
//                     {exp.employer && <span className="t5-entry-heading-muted"> — {exp.employer}</span>}
//                     {exp.location && <span className="t5-entry-heading-muted"> — {exp.location}</span>}
//                   </div>
//                 )}
//                 <div className="t5-entry-date">
//                   <MonthYearDisplay value={exp.startDate} shortYear={true} />
//                   {exp.startDate && (exp.endDate || true) && <span> - </span>}
//                   {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear={true} /> : exp.startDate && <span>Present</span>}
//                 </div>
//                 {exp.text && <div className="t5-entry-content">{stripHtml(exp.text)}</div>}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* EDUCATION */}
//         {educations?.length > 0 && (
//           <div className="t5-section">
//             <div className="t5-section-title">Education</div>
//             {educations.map((edu, index) => (
//               <div key={edu.id || index} className="t5-entry">
//                 {edu.schoolname && <div className="t5-entry-heading">{edu.schoolname}</div>}
//                 {edu.degree && <div className="t5-entry-sub">{edu.degree}</div>}
//                 {edu.location && <div className="t5-entry-sub">{edu.location}</div>}
//                 {(edu.startDate || edu.endDate) && (
//                   <div className="t5-entry-date">{[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}</div>
//                 )}
//                 {edu.text && <div className="t5-entry-content">{stripHtml(edu.text)}</div>}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* SKILLS */}
//         {skills.length > 0 && (
//           <div className="t5-section">
//             <div className="t5-section-title">Skills</div>
//             <div className="t5-skills-grid">
//               {skills.map((skill, index) => (
//                 <div key={skill.id || index}>
//                   <div className="t5-skill-name">{skill.skill || ""}</div>
//                   {skill.level && <div className="t5-skill-bar-wrap"><div className="t5-skill-bar-fill" style={{ width: skillPct(skill.level) }} /></div>}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* LANGUAGES */}
//         {fin.languages.some((l) => l.name?.trim()) && (
//           <div className="t5-section">
//             <div className="t5-section-title">Languages</div>
//             <div className="t5-skills-grid">
//               {fin.languages.filter((l) => l.name?.trim()).map((l, i) => (
//                 <div key={l._id || i}>
//                   <div className="t5-skill-name">{l.name}</div>
//                   {l.level && <div className="t5-skill-bar-wrap"><div className="t5-skill-bar-fill" style={{ width: skillPct(l.level) }} /></div>}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* CERTIFICATIONS */}
//         {fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//           <div className="t5-section">
//             <div className="t5-section-title">Certifications and Licenses</div>
//             <div className="t5-extra">{fin.certifications.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => <div key={item.id || i}>{stripHtml(item.name || "")}</div>)}</div>
//           </div>
//         )}

//         {/* HOBBIES */}
//         {fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//           <div className="t5-section">
//             <div className="t5-section-title">Hobbies and Interests</div>
//             <div className="t5-extra">{fin.hobbies.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => <div key={item.id || i}>{stripHtml(item.name || "")}</div>)}</div>
//           </div>
//         )}

//         {/* AWARDS */}
//         {fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//           <div className="t5-section">
//             <div className="t5-section-title">Awards and Honors</div>
//             <div className="t5-extra">{fin.awards.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => <div key={item.id || i}>{stripHtml(item.name || "")}</div>)}</div>
//           </div>
//         )}

//         {/* WEBSITES */}
//         {fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) && (
//           <div className="t5-section">
//             <div className="t5-section-title">Websites and Social Media</div>
//             <div className="t5-extra">
//               {fin.websites.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((item, i) => (
//                 <div key={item.id || i} style={{ marginBottom: "6px" }}>
//                   {item.websiteUrl && <div><span className="t5-website-label">Website URL: </span><a href={item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`} target="_blank" rel="noreferrer" className="t5-website-link">{item.websiteUrl}</a></div>}
//                   {item.socialMedia && <div><span className="t5-website-label">Social Media URL: </span><a href={item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`} target="_blank" rel="noreferrer" className="t5-website-link">{item.socialMedia}</a></div>}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* REFERENCES */}
//         {fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//           <div className="t5-section">
//             <div className="t5-section-title">References</div>
//             <div className="t5-extra">{fin.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => <div key={item.id || i}>{stripHtml(item.name || "")}</div>)}</div>
//           </div>
//         )}

//         {/* CUSTOM SECTIONS */}
//         {fin.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((section, i) => (
//           <div key={section.id || i} className="t5-section">
//             {section.name && <div className="t5-section-title">{section.name}</div>}
//             {section.description && <div className="t5-extra">{stripHtml(section.description)}</div>}
//           </div>
//         ))}

//       </div>
//     </>
//   );
// };

// export default TemplateFive;

// "use client";

// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { IoPersonOutline } from "react-icons/io5";
// import { API_URL } from "@/app/config/api";
// import { MonthYearDisplay, formatMonthYear } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import {
//   Contact,
//   Education,
//   Experience,
//   Finalize,
//   ResumeProps,
// } from "@/app/types/context.types";

// const TemplateFive: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const { croppedImage } = context.contact || {};
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";
//   const linkedinUrl = contact?.linkedin;

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
//   }, [croppedImage, contact.photo]);

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

//   const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, "") || "";

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
//       return (
//         <div className="t5-section">
//           <div className="t5-section-title">Skills</div>
//           <div className="t5-skills-container">
//             {skills.map((category: any) => (
//               <div key={category.id} className="t5-skill-category">
//                 <div className="t5-skill-category-title">{category.title}</div>
//                 <div className="t5-skills-list">
//                   {category.skills.map((skill: any) => (
//                     <span key={skill.id} className="t5-skill-item">
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
//       return (
//         <div className="t5-section">
//           <div className="t5-section-title">Skills</div>
//           <div className="t5-skills-list">
//             {skills.map((skill: any, index: number) => (
//               <span key={skill.id || index} className="t5-skill-item">
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
//       <div className="t5-section">
//         <div className="t5-section-title">Projects</div>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="t5-entry">
//             <div className="t5-project-header">
//               <div className="t5-entry-heading">{project.title}</div>
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="t5-project-links">
//                   {project.liveUrl && (
//                     <a
//                       href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="t5-project-link"
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="t5-project-link"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//             {project.techStack && project.techStack.length > 0 && (
//               <div className="t5-project-tech">
//                 <strong>Tech:</strong> {project.techStack.join(" • ")}
//               </div>
//             )}
//             {project.description && (
//               <div className="t5-entry-content">
//                 {stripHtml(project.description)}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      SHARED CSS — scoped to .resume-t5
//   ====================================================== */
//   const styles = `
//     /* ── ALL RULES SCOPED TO .resume-t5 ── */

//     .resume-t5 * {
//       box-sizing: border-box;
//     }

//     .resume-t5 {
//       width: 210mm;
//       min-height: 297mm;
//       padding: 5mm;
//       background-color: #ffffff;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 14px;
//       line-height: 1.5;
//       color: #111827;
//       text-align: left;
//     }

//     .resume-t5.is-preview {
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

//     /* Scoped resets — only inside resume */
//     .resume-t5 p {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-family: 'Nunito', Arial, sans-serif;
//     }

//     .resume-t5 ul {
//       list-style-type: disc !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .resume-t5 ol {
//       list-style-type: decimal !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .resume-t5 li {
//       margin-top: 0 !important;
//       margin-bottom: 1px !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 14px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }

//     /* ── HEADER ── */
//     .resume-t5 .t5-header {
//       background-color: #facc15;
//       padding: 8px 40px;
//       border-radius: 6px;
//       margin-bottom: 10px;
//     }

//     .resume-t5 .t5-header-top {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//     }

//     .resume-t5 .t5-header-left {
//       display: flex;
//       align-items: center;
//       gap: 12px;
//     }

//     .resume-t5 .t5-photo {
//       width: 96px;
//       height: 96px;
//       border-radius: 6px;
//       object-fit: cover;
//       border: 1px solid #e5e7eb;
//       flex-shrink: 0;
//     }

//     .resume-t5 .t5-photo-placeholder {
//       width: 96px;
//       height: 96px;
//       border-radius: 6px;
//       border: 1px solid #e5e7eb;
//       background: #f3f4f6;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       flex-shrink: 0;
//     }

//     .resume-t5 .t5-name {
//       font-size: 22px;
//       font-weight: 700;
//       text-transform: uppercase;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.2;
//       margin-bottom: 3px;
//     }

//     .resume-t5 .t5-jobtitle {
//       font-size: 13px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .resume-t5 .t5-details-block {
//       padding-left: 40px;
//     }

//     .resume-t5 .t5-details-label {
//       display: inline-block;
//       background: #000;
//       color: #fff;
//       font-size: 15px;
//       font-weight: 600;
//       padding: 4px 8px;
//       border-radius: 6px;
//       margin-bottom: 6px;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.4;
//     }

//     .resume-t5 .t5-details-text {
//       font-size: 13px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .resume-t5 .t5-links {
//       display: flex;
//       align-items: center;
//       gap: 12px;
//       margin-top: 10px;
//     }

//     .resume-t5 .t5-link-btn {
//       display: inline-flex;
//       align-items: center;
//       padding: 4px 12px;
//       border-radius: 9999px;
//       font-size: 13px;
//       font-weight: 500;
//       color: #fff;
//       text-decoration: none;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .resume-t5 .t5-link-linkedin { background-color: #2563eb; }
//     .resume-t5 .t5-link-portfolio { background-color: #1f2937; }

//     /* ── SECTION ── */
//     .resume-t5 .t5-section {
//       margin-top: 10px;
//       padding: 0 40px;
//     }

//     .resume-t5 .t5-section-title {
//       display: inline-block;
//       background: #000;
//       color: #fff;
//       font-size: 15px;
//       font-weight: 600;
//       text-transform: uppercase;
//       padding: 4px 8px;
//       border-radius: 6px;
//       margin-bottom: 8px;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.4;
//     }

//     /* ── SKILLS (NEW CLEAN STYLE - NO BARS) ── */
//     .resume-t5 .t5-skills-container {
//       margin-top: 4px;
//     }

//     .resume-t5 .t5-skill-category {
//       margin-bottom: 12px;
//     }

//     .resume-t5 .t5-skill-category-title {
//       font-size: 14px;
//       font-weight: 600;
//       color: #111827;
//       margin-bottom: 6px;
//       padding-bottom: 2px;
//       border-bottom: 1px solid #e5e7eb;
//     }

//     .resume-t5 .t5-skills-list {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 4px;
//       margin-top: 4px;
//     }

//     .resume-t5 .t5-skill-item {
//       display: inline-block;
//       font-size: 13px;
//       color: #374151;
//       padding: 2px 0;
//     }

//    /* Option 1: Bullet before each skill (including first) */
// .resume-t5 .t5-skill-item::before {
//   content: "•";
//   margin-right: 8px;
//   color: #9ca3af;
// }

//     /* ── ENTRY ── */
//     .resume-t5 .t5-entry {
//       margin-bottom: 14px;
//     }

//     .resume-t5 .t5-entry-heading {
//       font-size: 16px;
//       font-weight: 600;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.4;
//       margin-bottom: 1px;
//       word-wrap: break-word;
//     }

//     .resume-t5 .t5-entry-heading-muted {
//       font-size: 16px;
//       font-weight: 400;
//       color: #6b7280;
//       font-family: 'Nunito', Arial, sans-serif;
//     }

//     .resume-t5 .t5-entry-sub {
//       font-size: 14px;
//       color: #6b7280;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .resume-t5 .t5-entry-date {
//       font-size: 13px;
//       color: #4b5563;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       display: flex;
//       align-items: center;
//       gap: 4px;
//       margin-top: 2px;
//     }

//     .resume-t5 .t5-entry-content {
//       font-size: 14px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       padding-top: 4px;
//       padding-bottom: 4px;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .resume-t5 .t5-entry-content p {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 14px !important;
//     }

//     .resume-t5 .t5-entry-content ul {
//       list-style-type: disc !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .resume-t5 .t5-entry-content ol {
//       list-style-type: decimal !important;
//       padding-left: 20px !important;
//       margin: 0 !important;
//     }

//     .resume-t5 .t5-entry-content li {
//       margin: 0 !important;
//       margin-bottom: 1px !important;
//       line-height: 1.5 !important;
//       font-size: 14px !important;
//     }

//     /* ── PROJECTS ── */
//     .resume-t5 .t5-project-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 8px;
//       margin-bottom: 4px;
//     }

//     .resume-t5 .t5-project-links {
//       display: flex;
//       gap: 12px;
//     }

//     .resume-t5 .t5-project-link {
//       font-size: 12px;
//       color: #2563eb;
//       text-decoration: underline;
//     }

//     .resume-t5 .t5-project-tech {
//       font-size: 12px;
//       color: #6b7280;
//       margin: 4px 0;
//     }

//     /* ── EXTRA CONTENT ── */
//     .resume-t5 .t5-extra {
//       font-size: 14px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .resume-t5 .t5-extra p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//     .resume-t5 .t5-extra div { line-height: 1.5 !important; }

//     /* ── WEBSITES ── */
//     .resume-t5 .t5-website-label {
//       font-size: 13px;
//       font-weight: 600;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .resume-t5 .t5-website-link {
//       font-size: 13px;
//       color: #2563eb;
//       text-decoration: underline;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       word-wrap: break-word;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page { size: A4; margin: 5mm; }
//       @page :first { margin-top: 0; }

//       .resume-t5 {
//         width: 100% !important;
//         padding: 0 !important;
//         box-shadow: none !important;
//       }

//       .resume-t5 .t5-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .resume-t5 .t5-section-title { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .resume-t5 .t5-details-label { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .resume-t5 .t5-link-btn { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

//       .resume-t5 .t5-entry { page-break-inside: avoid; break-inside: avoid; }
//       .resume-t5 .t5-section-title { page-break-after: avoid; break-after: avoid; }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION — no Tailwind, shared CSS classes
//   ====================================================== */
//   const generateHTML = () => {
//     const addressStr = [contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ");
//     const photoHtml = previewUrl
//       ? `<img src="${previewUrl}" alt="Profile" class="t5-photo" />`
//       : `<div class="t5-photo-placeholder"><span style="color:#9ca3af;font-size:12px;font-family:'Nunito',Arial,sans-serif">No Photo</span></div>`;

//     // Generate skills HTML for PDF
//     const generateSkillsHTML = () => {
//       if (!skills || skills.length === 0) return "";

//       const isCategorized = isCategorizedSkills(skills);

//       if (isCategorized) {
//         return `
//           <div class="t5-section-title">Skills</div>
//           <div class="t5-skills-container">
//             ${skills.map((category: any) => `
//               <div class="t5-skill-category">
//                 <div class="t5-skill-category-title">${category.title}</div>
//                 <div class="t5-skills-list">
//                   ${category.skills.map((skill: any) => `
//                     <span class="t5-skill-item">${skill.name}</span>
//                   `).join("")}
//                 </div>
//               </div>
//             `).join("")}
//           </div>
//         `;
//       } else {
//         return `
//           <div class="t5-section-title">Skills</div>
//           <div class="t5-skills-list">
//             ${skills.map((skill: any) => `
//               <span class="t5-skill-item">${skill.name || skill.skill}</span>
//             `).join("")}
//           </div>
//         `;
//       }
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="t5-section-title">Projects</div>
//         ${projects.map((project: any) => `
//           <div class="t5-entry">
//             <div class="t5-project-header">
//               <div class="t5-entry-heading">${project.title || ""}</div>
//               <div class="t5-project-links">
//                 ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t5-project-link">Live Demo</a>` : ""}
//                 ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t5-project-link">GitHub</a>` : ""}
//               </div>
//             </div>
//             ${project.techStack && project.techStack.length > 0 ? `
//               <div class="t5-project-tech"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//             ` : ""}
//             ${project.description ? `
//               <div class="t5-entry-content">${stripHtml(project.description)}</div>
//             ` : ""}
//           </div>
//         `).join("")}
//       `;
//     };

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>
//     body { margin: 0; padding: 0; background: white; font-family: 'Nunito', Arial, sans-serif; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="resume-t5">

//   <!-- HEADER -->
//   <div class="t5-header">
//     <div class="t5-header-top">
//       <div class="t5-header-left">
//         ${photoHtml}
//         <div>
//           <div class="t5-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//           ${contact?.jobTitle ? `<div class="t5-jobtitle">${getJobTitle(contact.jobTitle)}</div>` : ""}
//         </div>
//       </div>
//       <div class="t5-details-block">
//         <div class="t5-details-label">DETAILS</div>
//         ${addressStr ? `<div class="t5-details-text">${addressStr}</div>` : ""}
//         ${contact?.phone ? `<div class="t5-details-text">${contact.phone}</div>` : ""}
//         ${contact?.email ? `<div class="t5-details-text">${contact.email}</div>` : ""}
//       </div>
//     </div>
//     ${linkedinUrl?.trim() || contact?.portfolio?.trim() ? `
//     <div class="t5-links">
//       ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t5-link-btn t5-link-linkedin">LinkedIn</a>` : ""}
//       ${contact?.portfolio?.trim() ? `<a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" class="t5-link-btn t5-link-portfolio">Portfolio</a>` : ""}
//     </div>` : ""}
//   </div>

//   <!-- SUMMARY -->
//   ${summary ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Summary</div>
//     <div class="t5-extra">${stripHtml(summary)}</div>
//   </div>` : ""}

//   <!-- EXPERIENCE -->
//   ${experiences?.length > 0 ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Experience</div>
//     ${experiences.map((exp) => {
//       const start = formatMonthYear(exp.startDate, true);
//       const end = exp.endDate ? formatMonthYear(exp.endDate, true) : (exp.startDate ? "Present" : "");
//       return `
//     <div class="t5-entry">
//       ${exp.jobTitle || exp.employer || exp.location ? `
//       <div class="t5-entry-heading">
//         ${exp.jobTitle || ""}
//         ${exp.employer ? `<span class="t5-entry-heading-muted"> — ${exp.employer}</span>` : ""}
//         ${exp.location ? `<span class="t5-entry-heading-muted"> — ${exp.location}</span>` : ""}
//       </div>` : ""}
//       <div class="t5-entry-date">${start}${start && end ? " - " : ""}${end}</div>
//       ${exp.text ? `<div class="t5-entry-content">${stripHtml(exp.text)}</div>` : ""}
//     </div>`;
//     }).join("")}
//   </div>` : ""}

//   <!-- PROJECTS -->
//   ${generateProjectsHTML()}

//   <!-- EDUCATION -->
//   ${educations?.length > 0 ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Education</div>
//     ${educations.map((edu) => {
//       const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(" — ");
//       return `
//     <div class="t5-entry">
//       ${edu.schoolname ? `<div class="t5-entry-heading">${edu.schoolname}</div>` : ""}
//       ${edu.degree ? `<div class="t5-entry-sub">${edu.degree}</div>` : ""}
//       ${edu.location ? `<div class="t5-entry-sub">${edu.location}</div>` : ""}
//       ${dateStr ? `<div class="t5-entry-date">${dateStr}</div>` : ""}
//       ${edu.text ? `<div class="t5-entry-content">${stripHtml(edu.text)}</div>` : ""}
//     </div>`;
//     }).join("")}
//   </div>` : ""}

//   <!-- SKILLS (NEW CLEAN STYLE - NO BARS) -->
//   ${generateSkillsHTML()}

//   <!-- LANGUAGES -->
//   ${fin.languages.some((l) => l.name?.trim()) ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Languages</div>
//     <div class="t5-skills-list">
//       ${fin.languages.filter((l) => l.name?.trim()).map((l) => `
//         <span class="t5-skill-item">${l.name}${l.level ? ` (${l.level})` : ""}</span>
//       `).join("")}
//     </div>
//   </div>` : ""}

//   <!-- CERTIFICATIONS -->
//   ${fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Certifications and Licenses</div>
//     <div class="t5-extra">${fin.certifications.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//   </div>` : ""}

//   <!-- HOBBIES -->
//   ${fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Hobbies and Interests</div>
//     <div class="t5-extra">${fin.hobbies.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//   </div>` : ""}

//   <!-- AWARDS -->
//   ${fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Awards and Honors</div>
//     <div class="t5-extra">${fin.awards.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//   </div>` : ""}

//   <!-- WEBSITES -->
//   ${fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) ? `
//   <div class="t5-section">
//     <div class="t5-section-title">Websites and Social Media</div>
//     <div class="t5-extra">
//       ${fin.websites.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((i) => `
//       <div style="margin-bottom:6px">
//         ${i.websiteUrl ? `<div><span class="t5-website-label">Website URL: </span><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="t5-website-link">${i.websiteUrl}</a></div>` : ""}
//         ${i.socialMedia ? `<div><span class="t5-website-label">Social Media URL: </span><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="t5-website-link">${i.socialMedia}</a></div>` : ""}
//       </div>`).join("")}
//     </div>
//   </div>` : ""}

//   <!-- REFERENCES -->
//   ${fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//   <div class="t5-section">
//     <div class="t5-section-title">References</div>
//     <div class="t5-extra">${fin.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//   </div>` : ""}

//   <!-- CUSTOM SECTIONS -->
//   ${fin.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//   <div class="t5-section">
//     ${s.name ? `<div class="t5-section-title">${s.name}</div>` : ""}
//     ${s.description ? `<div class="t5-extra">${stripHtml(s.description)}</div>` : ""}
//   </div>`).join("")}

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

//   /* ======================================================
//      JSX PREVIEW — same CSS classes, no Tailwind
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

//       <div
//         className={`resume-t5 ${alldata ? 'is-preview' : ''}`}
//         style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}
//       >
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="t5-header">
//           <div className="t5-header-top">
//             <div className="t5-header-left">
//               {previewUrl
//                 ? <img src={previewUrl} alt="Profile" className="t5-photo" />
//                 : <div className="t5-photo-placeholder"><IoPersonOutline style={{ width: 40, height: 40, color: "#9ca3af" }} /></div>
//               }
//               <div>
//                 <div className="t5-name">{contact?.firstName || ""} {contact?.lastName || ""}</div>
//                 {contact?.jobTitle && <div className="t5-jobtitle">{getJobTitle(contact.jobTitle)}</div>}
//               </div>
//             </div>
//             <div className="t5-details-block">
//               <div className="t5-details-label">DETAILS</div>
//               {[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).length > 0 && (
//                 <div className="t5-details-text">{[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ")}</div>
//               )}
//               {contact?.phone && <div className="t5-details-text">{contact.phone}</div>}
//               {contact?.email && <div className="t5-details-text">{contact.email}</div>}
//             </div>
//           </div>
//           {(linkedinUrl?.trim() || contact?.portfolio?.trim()) && (
//             <div className="t5-links">
//               {linkedinUrl?.trim() && (
//                 <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer" className="t5-link-btn t5-link-linkedin">LinkedIn</a>
//               )}
//               {contact?.portfolio?.trim() && (
//                 <a href={contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`} target="_blank" rel="noreferrer" className="t5-link-btn t5-link-portfolio">Portfolio</a>
//               )}
//             </div>
//           )}
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="t5-section">
//             <div className="t5-section-title">Summary</div>
//             <div className="t5-extra">{stripHtml(summary)}</div>
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences?.length > 0 && (
//           <div className="t5-section">
//             <div className="t5-section-title">Experience</div>
//             {experiences.map((exp, index) => (
//               <div key={exp.id || index} className="t5-entry">
//                 {(exp.jobTitle || exp.employer || exp.location) && (
//                   <div className="t5-entry-heading">
//                     {exp.jobTitle || ""}
//                     {exp.employer && <span className="t5-entry-heading-muted"> — {exp.employer}</span>}
//                     {exp.location && <span className="t5-entry-heading-muted"> — {exp.location}</span>}
//                   </div>
//                 )}
//                 <div className="t5-entry-date">
//                   <MonthYearDisplay value={exp.startDate} shortYear={true} />
//                   {exp.startDate && (exp.endDate || true) && <span> - </span>}
//                   {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear={true} /> : exp.startDate && <span>Present</span>}
//                 </div>
//                 {exp.text && <div className="t5-entry-content">{stripHtml(exp.text)}</div>}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* PROJECTS */}
//         {renderProjects()}

//         {/* EDUCATION */}
//         {educations?.length > 0 && (
//           <div className="t5-section">
//             <div className="t5-section-title">Education</div>
//             {educations.map((edu, index) => (
//               <div key={edu.id || index} className="t5-entry">
//                 {edu.schoolname && <div className="t5-entry-heading">{edu.schoolname}</div>}
//                 {edu.degree && <div className="t5-entry-sub">{edu.degree}</div>}
//                 {edu.location && <div className="t5-entry-sub">{edu.location}</div>}
//                 {(edu.startDate || edu.endDate) && (
//                   <div className="t5-entry-date">{[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}</div>
//                 )}
//                 {edu.text && <div className="t5-entry-content">{stripHtml(edu.text)}</div>}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* SKILLS - NEW CLEAN STYLE (NO BARS) */}
//         {renderSkills()}

//         {/* LANGUAGES */}
//         {fin.languages.some((l) => l.name?.trim()) && (
//           <div className="t5-section">
//             <div className="t5-section-title">Languages</div>
//             <div className="t5-skills-list">
//               {fin.languages.filter((l) => l.name?.trim()).map((l, i) => (
//                 <span key={l._id || i} className="t5-skill-item">
//                   {l.name}{l.level && ` (${l.level})`}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* CERTIFICATIONS */}
//         {fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//           <div className="t5-section">
//             <div className="t5-section-title">Certifications and Licenses</div>
//             <div className="t5-extra">{fin.certifications.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => <div key={item.id || i}>{stripHtml(item.name || "")}</div>)}</div>
//           </div>
//         )}

//         {/* HOBBIES */}
//         {fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//           <div className="t5-section">
//             <div className="t5-section-title">Hobbies and Interests</div>
//             <div className="t5-extra">{fin.hobbies.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => <div key={item.id || i}>{stripHtml(item.name || "")}</div>)}</div>
//           </div>
//         )}

//         {/* AWARDS */}
//         {fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//           <div className="t5-section">
//             <div className="t5-section-title">Awards and Honors</div>
//             <div className="t5-extra">{fin.awards.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => <div key={item.id || i}>{stripHtml(item.name || "")}</div>)}</div>
//           </div>
//         )}

//         {/* WEBSITES */}
//         {fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) && (
//           <div className="t5-section">
//             <div className="t5-section-title">Websites and Social Media</div>
//             <div className="t5-extra">
//               {fin.websites.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((item, i) => (
//                 <div key={item.id || i} style={{ marginBottom: "6px" }}>
//                   {item.websiteUrl && <div><span className="t5-website-label">Website URL: </span><a href={item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`} target="_blank" rel="noreferrer" className="t5-website-link">{item.websiteUrl}</a></div>}
//                   {item.socialMedia && <div><span className="t5-website-label">Social Media URL: </span><a href={item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`} target="_blank" rel="noreferrer" className="t5-website-link">{item.socialMedia}</a></div>}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* REFERENCES */}
//         {fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//           <div className="t5-section">
//             <div className="t5-section-title">References</div>
//             <div className="t5-extra">{fin.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => <div key={item.id || i}>{stripHtml(item.name || "")}</div>)}</div>
//           </div>
//         )}

//         {/* CUSTOM SECTIONS */}
//         {fin.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((section, i) => (
//           <div key={section.id || i} className="t5-section">
//             {section.name && <div className="t5-section-title">{section.name}</div>}
//             {section.description && <div className="t5-extra">{stripHtml(section.description)}</div>}
//           </div>
//         ))}

//       </div>
//     </>
//   );
// };

// export default TemplateFive;

"use client";

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { IoPersonOutline } from "react-icons/io5";
import { API_URL } from "@/app/config/api";
import { MonthYearDisplay, formatMonthYear } from "@/app/utils";
import { usePathname } from "next/navigation";
import {
  Contact,
  Education,
  Experience,
  Finalize,
  ResumeProps,
} from "@/app/types/context.types";
import { motion } from "framer-motion";


const TemplateFive: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const { croppedImage } = context.contact || {};
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const contact = alldata?.contact || context.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills || context?.skills || [];
  const projects = alldata?.projects || context?.projects || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";
  const linkedinUrl = contact?.linkedin;
  const portfolioUrl = contact?.portfolio;
  const githubUrl = contact?.github;
  const dateOfBirth = contact?.dob;

  const getJobTitle = (jobTitle: any): string => {
    if (!jobTitle) return "";
    if (typeof jobTitle === "string") return jobTitle;
    if (typeof jobTitle === "object" && jobTitle !== null)
      return (jobTitle as any)?.name || (jobTitle as any)?.label || "";
    return "";
  };

  useEffect(() => {
    let url: string | null = null;
    let objectUrl: string | null = null;

    if (croppedImage) {
      if (
        typeof croppedImage === "string" &&
        croppedImage.startsWith("blob:")
      ) {
        url = croppedImage;
      } else if (typeof croppedImage === "string") {
        url = `${API_URL}/api/uploads/photos/${croppedImage}`;
      } else if (
        (croppedImage as any) instanceof Blob ||
        (croppedImage as any) instanceof File
      ) {
        objectUrl = URL.createObjectURL(croppedImage as Blob);
        url = objectUrl;
      }
      setPreviewUrl(url);
    } else if (contact.photo) {
      setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
    } else {
      setPreviewUrl(null);
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [croppedImage, contact.photo]);

  // Format date of birth for display
  const formatDateOfBirth = (dob: string) => {
    if (!dob) return "";
    try {
      const date = new Date(dob);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
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
      if (numGrade <= 10 && grade.includes(".")) {
        return `CGPA: ${grade}`;
      } else if (numGrade > 10) {
        return `Percentage: ${grade}%`;
      }
    }

    return grade;
  };

  const isFinalizeData = (data: any): data is Finalize =>
    data && typeof data === "object" && !Array.isArray(data);

  const fin = {
    languages:
      isFinalizeData(finalize) && Array.isArray(finalize.languages)
        ? finalize.languages
        : [],
    certifications:
      isFinalizeData(finalize) &&
      Array.isArray(finalize.certificationsAndLicenses)
        ? finalize.certificationsAndLicenses
        : [],
    hobbies:
      isFinalizeData(finalize) && Array.isArray(finalize.hobbiesAndInterests)
        ? finalize.hobbiesAndInterests
        : [],
    awards:
      isFinalizeData(finalize) && Array.isArray(finalize.awardsAndHonors)
        ? finalize.awardsAndHonors
        : [],
    websites:
      isFinalizeData(finalize) && Array.isArray(finalize.websitesAndSocialMedia)
        ? finalize.websitesAndSocialMedia
        : [],
    references:
      isFinalizeData(finalize) && Array.isArray(finalize.references)
        ? finalize.references
        : [],
    customSection:
      isFinalizeData(finalize) && Array.isArray(finalize.customSection)
        ? finalize.customSection
        : [],
  };

  const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, "") || "";

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
      return (
        <div className="t5-section">
          <div className="t5-section-title">Skills</div>
          <div className="t5-skills-container">
            {skills.map((category: any) => (
              <div key={category.id} className="t5-skill-category">
                <div className="t5-skill-category-title">{category.title}</div>
                <div className="t5-skills-list">
                  {category.skills.map((skill: any) => (
                    <span key={skill.id} className="t5-skill-item">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="t5-section">
          <div className="t5-section-title">Skills</div>
          <div className="t5-skills-list">
            {skills.map((skill: any, index: number) => (
              <span key={skill.id || index} className="t5-skill-item">
                {skill.name || skill.skill}
              </span>
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
      <div className="t5-section">
        <div className="t5-section-title">Projects</div>
        {projects.map((project: any, index: number) => (
          <div key={project.id || index} className="t5-entry">
            <div className="t5-project-header">
              <div className="t5-entry-heading">{project.title}</div>
              {(project.liveUrl || project.githubUrl) && (
                <div className="t5-project-links">
                  {project.liveUrl && (
                    <a
                      href={
                        project.liveUrl.startsWith("http")
                          ? project.liveUrl
                          : `https://${project.liveUrl}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="t5-project-link"
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
                      className="t5-project-link"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
            {project.techStack && project.techStack.length > 0 && (
              <div className="t5-project-tech">
                <strong>Tech:</strong> {project.techStack.join(" • ")}
              </div>
            )}
            {project.description && (
              <div className="t5-entry-content">
                {stripHtml(project.description)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  /* ======================================================
     SHARED CSS — scoped to .resume-t5
  ====================================================== */
  const styles = `
    /* ── ALL RULES SCOPED TO .resume-t5 ── */

    .resume-t5 * {
      box-sizing: border-box;
    }

    .resume-t5 {
      width: 210mm;
      min-height: 297mm;
      padding: 5mm;
      background-color: #ffffff;
      font-family: 'Nunito', Arial, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      color: #111827;
      text-align: left;
    }

    .resume-t5.is-preview {
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

    /* Scoped resets — only inside resume */
    .resume-t5 p {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
      font-family: 'Nunito', Arial, sans-serif;
    }

    .resume-t5 ul {
      list-style-type: disc !important;
      padding-left: 20px !important;
      margin: 0 !important;
    }

    .resume-t5 ol {
      list-style-type: decimal !important;
      padding-left: 20px !important;
      margin: 0 !important;
    }

    .resume-t5 li {
      margin-top: 0 !important;
      margin-bottom: 1px !important;
      padding: 0 !important;
      line-height: 1.5 !important;
      font-size: 14px !important;
      font-family: 'Nunito', Arial, sans-serif !important;
    }

    /* ── HEADER ── */
    .resume-t5 .t5-header {
      background-color: #facc15;
      padding: 8px 40px;
      border-radius: 6px;
      margin-bottom: 10px;
    }

    .resume-t5 .t5-header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .resume-t5 .t5-header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .resume-t5 .t5-photo {
      width: 96px;
      height: 96px;
      border-radius: 6px;
      object-fit: cover;
      border: 1px solid #e5e7eb;
      flex-shrink: 0;
    }

    .resume-t5 .t5-photo-placeholder {
      width: 96px;
      height: 96px;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
      background: #f3f4f6;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .resume-t5 .t5-name {
      font-size: 22px;
      font-weight: 700;
      text-transform: uppercase;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.2;
      margin-bottom: 3px;
    }

    .resume-t5 .t5-jobtitle {
      font-size: 13px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .resume-t5 .t5-details-block {
      padding-left: 40px;
    }

    .resume-t5 .t5-details-label {
      display: inline-block;
      background: #000;
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 6px;
      margin-bottom: 6px;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.4;
    }

    .resume-t5 .t5-details-text {
      font-size: 13px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .resume-t5 .t5-links {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 10px;
      flex-wrap: wrap;
    }

    .resume-t5 .t5-link-btn {
      display: inline-flex;
      align-items: center;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 500;
      color: #fff;
      text-decoration: none;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .resume-t5 .t5-link-linkedin { background-color: #2563eb; }
    .resume-t5 .t5-link-github { background-color: #1f2937; }
    .resume-t5 .t5-link-portfolio { background-color: #6b7280; }

    /* ── SECTION ── */
    .resume-t5 .t5-section {
      margin-top: 10px;
      padding: 0 40px;
    }

    .resume-t5 .t5-section-title {
      display: inline-block;
      background: #000;
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      text-transform: uppercase;
      padding: 4px 8px;
      border-radius: 6px;
      margin-bottom: 8px;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.4;
    }

    /* ── EDUCATION GRADE ── */
    .resume-t5 .t5-education-grade {
      font-size: 13px;
      color: #6b7280;
      margin-top: 2px;
      font-weight: 500;
    }

    /* ── SKILLS (NEW CLEAN STYLE - NO BARS) ── */
    .resume-t5 .t5-skills-container {
      margin-top: 4px;
    }

    .resume-t5 .t5-skill-category {
      margin-bottom: 12px;
    }

    .resume-t5 .t5-skill-category-title {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 6px;
      padding-bottom: 2px;
      border-bottom: 1px solid #e5e7eb;
    }

    .resume-t5 .t5-skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 4px;
    }

    .resume-t5 .t5-skill-item {
      display: inline-block;
      font-size: 13px;
      color: #374151;
      padding: 2px 0;
    }

    /* Option 1: Bullet before each skill (including first) */
    .resume-t5 .t5-skill-item::before {
      content: "•";
      margin-right: 8px;
      color: #9ca3af;
    }

    /* ── ENTRY ── */
    .resume-t5 .t5-entry {
      margin-bottom: 14px;
    }

    .resume-t5 .t5-entry-heading {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.4;
      margin-bottom: 1px;
      word-wrap: break-word;
    }

    .resume-t5 .t5-entry-heading-muted {
      font-size: 16px;
      font-weight: 400;
      color: #6b7280;
      font-family: 'Nunito', Arial, sans-serif;
    }

    .resume-t5 .t5-entry-sub {
      font-size: 14px;
      color: #6b7280;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .resume-t5 .t5-entry-date {
      font-size: 13px;
      color: #4b5563;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 2px;
    }

    .resume-t5 .t5-entry-content {
      font-size: 14px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      padding-top: 4px;
      padding-bottom: 4px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .resume-t5 .t5-entry-content p {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
      font-size: 14px !important;
    }

    .resume-t5 .t5-entry-content ul {
      list-style-type: disc !important;
      padding-left: 20px !important;
      margin: 0 !important;
    }

    .resume-t5 .t5-entry-content ol {
      list-style-type: decimal !important;
      padding-left: 20px !important;
      margin: 0 !important;
    }

    .resume-t5 .t5-entry-content li {
      margin: 0 !important;
      margin-bottom: 1px !important;
      line-height: 1.5 !important;
      font-size: 14px !important;
    }

    /* ── PROJECTS ── */
    .resume-t5 .t5-project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 4px;
    }

    .resume-t5 .t5-project-links {
      display: flex;
      gap: 12px;
    }

    .resume-t5 .t5-project-link {
      font-size: 12px;
      color: #2563eb;
      text-decoration: underline;
    }

    .resume-t5 .t5-project-tech {
      font-size: 12px;
      color: #6b7280;
      margin: 4px 0;
    }

    /* ── EXTRA CONTENT ── */
    .resume-t5 .t5-extra {
      font-size: 14px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .resume-t5 .t5-extra p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
    .resume-t5 .t5-extra div { line-height: 1.5 !important; }

    /* ── WEBSITES ── */
    .resume-t5 .t5-website-label {
      font-size: 13px;
      font-weight: 600;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .resume-t5 .t5-website-link {
      font-size: 13px;
      color: #2563eb;
      text-decoration: underline;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      word-wrap: break-word;
    }

    /* ── PRINT ── */
    @media print {
      @page { size: A4; margin: 5mm; }
      @page :first { margin-top: 0; }

      .resume-t5 {
        width: 100% !important;
        padding: 0 !important;
        box-shadow: none !important;
      }

      .resume-t5 .t5-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .resume-t5 .t5-section-title { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .resume-t5 .t5-details-label { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .resume-t5 .t5-link-btn { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

      .resume-t5 .t5-entry { page-break-inside: avoid; break-inside: avoid; }
      .resume-t5 .t5-section-title { page-break-after: avoid; break-after: avoid; }
    }
  `;

  /* ======================================================
     HTML GENERATION — no Tailwind, shared CSS classes
  ====================================================== */
  const generateHTML = () => {
    const addressStr = [
      contact?.address,
      contact?.city,
      contact?.postcode,
      contact?.country,
    ]
      .filter(Boolean)
      .join(", ");
    const photoHtml = previewUrl
      ? `<img src="${previewUrl}" alt="Profile" class="t5-photo" />`
      : `<div class="t5-photo-placeholder"><span style="color:#9ca3af;font-size:12px;font-family:'Nunito',Arial,sans-serif">No Photo</span></div>`;
    const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

    // Generate skills HTML for PDF
    const generateSkillsHTML = () => {
      if (!skills || skills.length === 0) return "";

      const isCategorized = isCategorizedSkills(skills);

      if (isCategorized) {
        return `
          <div class="t5-section-title">Skills</div>
          <div class="t5-skills-container">
            ${skills
              .map(
                (category: any) => `
              <div class="t5-skill-category">
                <div class="t5-skill-category-title">${category.title}</div>
                <div class="t5-skills-list">
                  ${category.skills
                    .map(
                      (skill: any) => `
                    <span class="t5-skill-item">${skill.name}</span>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        `;
      } else {
        return `
          <div class="t5-section-title">Skills</div>
          <div class="t5-skills-list">
            ${skills
              .map(
                (skill: any) => `
              <span class="t5-skill-item">${skill.name || skill.skill}</span>
            `,
              )
              .join("")}
          </div>
        `;
      }
    };

    // Generate projects HTML for PDF
    const generateProjectsHTML = () => {
      if (!projects || projects.length === 0) return "";

      return `
        <div class="t5-section-title">Projects</div>
        ${projects
          .map(
            (project: any) => `
          <div class="t5-entry">
            <div class="t5-project-header">
              <div class="t5-entry-heading">${project.title || ""}</div>
              <div class="t5-project-links">
                ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t5-project-link">Live Demo</a>` : ""}
                ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t5-project-link">GitHub</a>` : ""}
              </div>
            </div>
            ${
              project.techStack && project.techStack.length > 0
                ? `
              <div class="t5-project-tech"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
            `
                : ""
            }
            ${
              project.description
                ? `
              <div class="t5-entry-content">${stripHtml(project.description)}</div>
            `
                : ""
            }
          </div>
        `,
          )
          .join("")}
      `;
    };

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    body { margin: 0; padding: 0; background: white; font-family: 'Nunito', Arial, sans-serif; }
    ${styles}
  </style>
</head>
<body>
<div class="resume-t5">

  <!-- HEADER -->
  <div class="t5-header">
    <div class="t5-header-top">
      <div class="t5-header-left">
        ${photoHtml}
        <div>
          <div class="t5-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
          ${contact?.jobTitle ? `<div class="t5-jobtitle">${getJobTitle(contact.jobTitle)}</div>` : ""}
        </div>
      </div>
      <div class="t5-details-block">
        <div class="t5-details-label">DETAILS</div>
        ${addressStr ? `<div class="t5-details-text">${addressStr}</div>` : ""}
        ${contact?.phone ? `<div class="t5-details-text">${contact.phone}</div>` : ""}
        ${contact?.email ? `<div class="t5-details-text">${contact.email}</div>` : ""}
        ${formattedDob ? `<div class="t5-details-text">${formattedDob}</div>` : ""}
      </div>
    </div>
    ${
      linkedinUrl?.trim() || githubUrl?.trim() || portfolioUrl?.trim()
        ? `
    <div class="t5-links">
      ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t5-link-btn t5-link-linkedin">LinkedIn</a>` : ""}
      ${githubUrl?.trim() ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="t5-link-btn t5-link-github">GitHub</a>` : ""}
      ${portfolioUrl?.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t5-link-btn t5-link-portfolio">Portfolio</a>` : ""}
    </div>`
        : ""
    }
  </div>

  <!-- SUMMARY -->
  ${
    summary
      ? `
  <div class="t5-section">
    <div class="t5-section-title">Summary</div>
    <div class="t5-extra">${stripHtml(summary)}</div>
  </div>`
      : ""
  }

  <!-- EXPERIENCE -->
  ${
    experiences?.length > 0
      ? `
  <div class="t5-section">
    <div class="t5-section-title">Experience</div>
    ${experiences
      .map((exp) => {
        const start = formatMonthYear(exp.startDate, true);
        const end = exp.endDate
          ? formatMonthYear(exp.endDate, true)
          : exp.startDate
            ? "Present"
            : "";
        return `
    <div class="t5-entry">
      ${
        exp.jobTitle || exp.employer || exp.location
          ? `
      <div class="t5-entry-heading">
        ${exp.jobTitle || ""}
        ${exp.employer ? `<span class="t5-entry-heading-muted"> — ${exp.employer}</span>` : ""}
        ${exp.location ? `<span class="t5-entry-heading-muted"> — ${exp.location}</span>` : ""}
      </div>`
          : ""
      }
      <div class="t5-entry-date">${start}${start && end ? " - " : ""}${end}</div>
      ${exp.text ? `<div class="t5-entry-content">${stripHtml(exp.text)}</div>` : ""}
    </div>`;
      })
      .join("")}
  </div>`
      : ""
  }

  <!-- PROJECTS -->
  ${generateProjectsHTML()}

  <!-- EDUCATION -->
  ${
    educations?.length > 0
      ? `
  <div class="t5-section">
    <div class="t5-section-title">Education</div>
    ${educations
      .map((edu) => {
        const dateStr = [edu.startDate, edu.endDate]
          .filter(Boolean)
          .join(" — ");
        const formattedGrade = formatGrade(edu.grade || " ");
        return `
    <div class="t5-entry">
      ${edu.schoolname ? `<div class="t5-entry-heading">${edu.schoolname}</div>` : ""}
      ${edu.degree ? `<div class="t5-entry-sub">${edu.degree}</div>` : ""}
      ${edu.location ? `<div class="t5-entry-sub">${edu.location}</div>` : ""}
      ${dateStr ? `<div class="t5-entry-date">${dateStr}</div>` : ""}
      ${formattedGrade ? `<div class="t5-education-grade">${formattedGrade}</div>` : ""}
      ${edu.text ? `<div class="t5-entry-content">${stripHtml(edu.text)}</div>` : ""}
    </div>`;
      })
      .join("")}
  </div>`
      : ""
  }

  <!-- SKILLS (NEW CLEAN STYLE - NO BARS) -->
  ${generateSkillsHTML()}

  <!-- LANGUAGES -->
  ${
    fin.languages.some((l) => l.name?.trim())
      ? `
  <div class="t5-section">
    <div class="t5-section-title">Languages</div>
    <div class="t5-skills-list">
      ${fin.languages
        .filter((l) => l.name?.trim())
        .map(
          (l) => `
        <span class="t5-skill-item">${l.name}${l.level ? ` (${l.level})` : ""}</span>
      `,
        )
        .join("")}
    </div>
  </div>`
      : ""
  }

  <!-- CERTIFICATIONS -->
  ${
    fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim())
      ? `
  <div class="t5-section">
    <div class="t5-section-title">Certifications and Licenses</div>
    <div class="t5-extra">${fin.certifications
      .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
      .map((i) => `<div>${stripHtml(i.name || "")}</div>`)
      .join("")}</div>
  </div>`
      : ""
  }

  <!-- HOBBIES -->
  ${
    fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim())
      ? `
  <div class="t5-section">
    <div class="t5-section-title">Hobbies and Interests</div>
    <div class="t5-extra">${fin.hobbies
      .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
      .map((i) => `<div>${stripHtml(i.name || "")}</div>`)
      .join("")}</div>
  </div>`
      : ""
  }

  <!-- AWARDS -->
  ${
    fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim())
      ? `
  <div class="t5-section">
    <div class="t5-section-title">Awards and Honors</div>
    <div class="t5-extra">${fin.awards
      .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
      .map((i) => `<div>${stripHtml(i.name || "")}</div>`)
      .join("")}</div>
  </div>`
      : ""
  }

  <!-- WEBSITES -->
  ${
    fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
      ? `
  <div class="t5-section">
    <div class="t5-section-title">Websites and Social Media</div>
    <div class="t5-extra">
      ${fin.websites
        .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
        .map(
          (i) => `
      <div style="margin-bottom:6px">
        ${i.websiteUrl ? `<div><span class="t5-website-label">Website URL: </span><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="t5-website-link">${i.websiteUrl}</a></div>` : ""}
        ${i.socialMedia ? `<div><span class="t5-website-label">Social Media URL: </span><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="t5-website-link">${i.socialMedia}</a></div>` : ""}
      </div>`,
        )
        .join("")}
    </div>
  </div>`
      : ""
  }

  <!-- REFERENCES -->
  ${
    fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim())
      ? `
  <div class="t5-section">
    <div class="t5-section-title">References</div>
    <div class="t5-extra">${fin.references
      .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
      .map((i) => `<div>${stripHtml(i.name || "")}</div>`)
      .join("")}</div>
  </div>`
      : ""
  }

  <!-- CUSTOM SECTIONS -->
  ${fin.customSection
    .filter((s) => s?.name?.trim() || s?.description?.trim())
    .map(
      (s) => `
  <div class="t5-section">
    ${s.name ? `<div class="t5-section-title">${s.name}</div>` : ""}
    ${s.description ? `<div class="t5-extra">${stripHtml(s.description)}</div>` : ""}
  </div>`,
    )
    .join("")}

</div>
</body>
</html>`;
  };

  /* ======================================================
     PDF DOWNLOAD
  ====================================================== */
  const handleDownload = async () => {
    try {
      const html = generateHTML();
      const res = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        { html },
        { responseType: "blob" },
      );
      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  /* ======================================================
     JSX PREVIEW — same CSS classes, no Tailwind
  ====================================================== */
  const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

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

      <div
        className={`resume-t5 ${alldata ? "is-preview" : ""}`}
        style={{
          margin: "0 auto",
          boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
        }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
        <style>{styles}</style>

        {/* HEADER */}
        <div className="t5-header">
          <div className="t5-header-top">
            <div className="t5-header-left">
              {previewUrl ? (
                <img src={previewUrl} alt="Profile" className="t5-photo" />
              ) : (
                <div className="t5-photo-placeholder">
                  <IoPersonOutline
                    style={{ width: 40, height: 40, color: "#9ca3af" }}
                  />
                </div>
              )}
              <div>
                <div className="t5-name">
                  {contact?.firstName || ""} {contact?.lastName || ""}
                </div>
                {contact?.jobTitle && (
                  <div className="t5-jobtitle">
                    {getJobTitle(contact.jobTitle)}
                  </div>
                )}
              </div>
            </div>
            <div className="t5-details-block">
              <div className="t5-details-label">DETAILS</div>
              {[
                contact?.address,
                contact?.city,
                contact?.postcode,
                contact?.country,
              ].filter(Boolean).length > 0 && (
                <div className="t5-details-text">
                  {[
                    contact?.address,
                    contact?.city,
                    contact?.postcode,
                    contact?.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </div>
              )}
              {contact?.phone && (
                <div className="t5-details-text">{contact.phone}</div>
              )}
              {contact?.email && (
                <div className="t5-details-text">{contact.email}</div>
              )}
              {formattedDob && (
                <div className="t5-details-text">{formattedDob}</div>
              )}
            </div>
          </div>
          {(linkedinUrl?.trim() ||
            githubUrl?.trim() ||
            portfolioUrl?.trim()) && (
            <div className="t5-links">
              {linkedinUrl?.trim() && (
                <a
                  href={
                    linkedinUrl.startsWith("http")
                      ? linkedinUrl
                      : `https://${linkedinUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="t5-link-btn t5-link-linkedin"
                >
                  LinkedIn
                </a>
              )}
              {githubUrl?.trim() && (
                <a
                  href={
                    githubUrl.startsWith("http")
                      ? githubUrl
                      : `https://${githubUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="t5-link-btn t5-link-github"
                >
                  GitHub
                </a>
              )}
              {portfolioUrl?.trim() && (
                <a
                  href={
                    portfolioUrl.startsWith("http")
                      ? portfolioUrl
                      : `https://${portfolioUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="t5-link-btn t5-link-portfolio"
                >
                  Portfolio
                </a>
              )}
            </div>
          )}
        </div>

        {/* SUMMARY */}
        {summary && (
          <div className="t5-section">
            <div className="t5-section-title">Summary</div>
            <div className="t5-extra">{stripHtml(summary)}</div>
          </div>
        )}

        {/* EXPERIENCE */}
        {experiences?.length > 0 && (
          <div className="t5-section">
            <div className="t5-section-title">Experience</div>
            {experiences.map((exp, index) => (
              <div key={exp._id || index} className="t5-entry">
                {(exp.jobTitle || exp.employer || exp.location) && (
                  <div className="t5-entry-heading">
                    {exp.jobTitle || ""}
                    {exp.employer && (
                      <span className="t5-entry-heading-muted">
                        {" "}
                        — {exp.employer}
                      </span>
                    )}
                    {exp.location && (
                      <span className="t5-entry-heading-muted">
                        {" "}
                        — {exp.location}
                      </span>
                    )}
                  </div>
                )}
                <div className="t5-entry-date">
                  <MonthYearDisplay value={exp.startDate} shortYear={true} />
                  {exp.startDate && (exp.endDate || true) && <span> - </span>}
                  {exp.endDate ? (
                    <MonthYearDisplay value={exp.endDate} shortYear={true} />
                  ) : (
                    exp.startDate && <span>Present</span>
                  )}
                </div>
                {exp.text && (
                  <div className="t5-entry-content">{stripHtml(exp.text)}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* PROJECTS */}
        {renderProjects()}

        {/* EDUCATION */}
        {educations?.length > 0 && (
          <div className="t5-section">
            <div className="t5-section-title">Education</div>
            {educations.map((edu, index) => {
              const formattedGrade = formatGrade(edu.grade || "");
              return (
                <div key={edu._id || index} className="t5-entry">
                  {edu.schoolname && (
                    <div className="t5-entry-heading">{edu.schoolname}</div>
                  )}
                  {edu.degree && (
                    <div className="t5-entry-sub">{edu.degree}</div>
                  )}
                  {edu.location && (
                    <div className="t5-entry-sub">{edu.location}</div>
                  )}
                  {(edu.startDate || edu.endDate) && (
                    <div className="t5-entry-date">
                      {[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}
                    </div>
                  )}
                  {formattedGrade && (
                    <div className="t5-education-grade">{formattedGrade}</div>
                  )}
                  {edu.text && (
                    <div className="t5-entry-content">
                      {stripHtml(edu.text)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* SKILLS - NEW CLEAN STYLE (NO BARS) */}
        {renderSkills()}

        {/* LANGUAGES */}
        {fin.languages.some((l) => l.name?.trim()) && (
          <div className="t5-section">
            <div className="t5-section-title">Languages</div>
            <div className="t5-skills-list">
              {fin.languages
                .filter((l) => l.name?.trim())
                .map((l, i) => (
                  <span key={l._id || i} className="t5-skill-item">
                    {l.name}
                    {l.level && ` (${l.level})`}
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS */}
        {fin.certifications.some((i) =>
          i.name?.replace(/<[^>]*>/g, "").trim(),
        ) && (
          <div className="t5-section">
            <div className="t5-section-title">Certifications and Licenses</div>
            <div className="t5-extra">
              {fin.certifications
                .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
                .map((item, i) => (
                  <div key={item.id || i}>{stripHtml(item.name || "")}</div>
                ))}
            </div>
          </div>
        )}

        {/* HOBBIES */}
        {fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
          <div className="t5-section">
            <div className="t5-section-title">Hobbies and Interests</div>
            <div className="t5-extra">
              {fin.hobbies
                .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
                .map((item, i) => (
                  <div key={item.id || i}>{stripHtml(item.name || "")}</div>
                ))}
            </div>
          </div>
        )}

        {/* AWARDS */}
        {fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
          <div className="t5-section">
            <div className="t5-section-title">Awards and Honors</div>
            <div className="t5-extra">
              {fin.awards
                .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
                .map((item, i) => (
                  <div key={item.id || i}>{stripHtml(item.name || "")}</div>
                ))}
            </div>
          </div>
        )}

        {/* WEBSITES */}
        {fin.websites.some(
          (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
        ) && (
          <div className="t5-section">
            <div className="t5-section-title">Websites and Social Media</div>
            <div className="t5-extra">
              {fin.websites
                .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
                .map((item, i) => (
                  <div key={item.id || i} style={{ marginBottom: "6px" }}>
                    {item.websiteUrl && (
                      <div>
                        <span className="t5-website-label">Website URL: </span>
                        <a
                          href={
                            item.websiteUrl.startsWith("http")
                              ? item.websiteUrl
                              : `https://${item.websiteUrl}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="t5-website-link"
                        >
                          {item.websiteUrl}
                        </a>
                      </div>
                    )}
                    {item.socialMedia && (
                      <div>
                        <span className="t5-website-label">
                          Social Media URL:{" "}
                        </span>
                        <a
                          href={
                            item.socialMedia.startsWith("http")
                              ? item.socialMedia
                              : `https://${item.socialMedia}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="t5-website-link"
                        >
                          {item.socialMedia}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* REFERENCES */}
        {fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
          <div className="t5-section">
            <div className="t5-section-title">References</div>
            <div className="t5-extra">
              {fin.references
                .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
                .map((item, i) => (
                  <div key={item.id || i}>{stripHtml(item.name || "")}</div>
                ))}
            </div>
          </div>
        )}

        {/* CUSTOM SECTIONS */}
        {fin.customSection
          .filter((s) => s?.name?.trim() || s?.description?.trim())
          .map((section, i) => (
            <div key={section.id || i} className="t5-section">
              {section.name && (
                <div className="t5-section-title">{section.name}</div>
              )}
              {section.description && (
                <div className="t5-extra">{stripHtml(section.description)}</div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default TemplateFive;
