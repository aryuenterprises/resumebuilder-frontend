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

// const TemplateEight: React.FC<ResumeProps> = ({ alldata }) => {
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
//      SHARED CSS — scoped to .resume-t8
//      Navy & White | Creative Professional | Right Sidebar + Photo
//   ====================================================== */
//   const styles = `
//     @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

//     .resume-t8 * { box-sizing: border-box; }

//     .resume-t8 {
//       width: 210mm;
//       min-height: 297mm;
//       background-color: #ffffff;
//       font-family: 'Archivo', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1a2332;
//       text-align: left;
//       display: flex;
//     }

//     /* Scoped resets */
//     .resume-t8 p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; font-family: 'Archivo', Arial, sans-serif; }
//     .resume-t8 ul { list-style-type: disc !important; padding-left: 18px !important; margin: 0 !important; }
//     .resume-t8 ol { list-style-type: decimal !important; padding-left: 18px !important; margin: 0 !important; }
//     .resume-t8 li { margin-top: 0 !important; margin-bottom: 2px !important; padding: 0 !important; line-height: 1.5 !important; font-size: 13px !important; font-family: 'Archivo', Arial, sans-serif !important; }

//     /* ── MAIN LEFT COLUMN ── */
//     .t8-main {
//       width: 63%;
//       display: flex;
//       flex-direction: column;
//     }

//     /* ── TOP NAME STRIPE ── */
//     .t8-name-stripe {
//       background-color: #0a1f44;
//       padding: 26px 28px 20px;
//       position: relative;
//     }

//     .t8-name-stripe::before {
//       content: '';
//       position: absolute;
//       top: 0; left: 0; right: 0;
//       height: 5px;
//       background: repeating-linear-gradient(
//         90deg,
//         #2a6496 0px, #2a6496 20px,
//         #0a1f44 20px, #0a1f44 24px
//       );
//     }

//     .t8-name {
//       font-family: 'Archivo', Arial, sans-serif;
//       font-size: 28px;
//       font-weight: 800;
//       color: #ffffff;
//       line-height: 1.1;
//       letter-spacing: -0.3px;
//       margin-bottom: 4px;
//     }

//     .t8-name span {
//       color: #4db8e8;
//     }

//     .t8-jobtitle {
//       font-family: 'Archivo', Arial, sans-serif;
//       font-size: 10.5px;
//       font-weight: 500;
//       letter-spacing: 3.5px;
//       text-transform: uppercase;
//       color: #a8cce0;
//       line-height: 1.4;
//     }

//     /* ── MAIN BODY ── */
//     .t8-main-body {
//       padding: 18px 28px;
//       flex: 1;
//     }

//     /* ── SECTION TITLE ── */
//     .t8-section {
//       margin-bottom: 18px;
//     }

//     .t8-section-title {
//       font-family: 'Archivo', Arial, sans-serif;
//       font-size: 10px;
//       font-weight: 700;
//       letter-spacing: 3px;
//       text-transform: uppercase;
//       color: #ffffff;
//       background-color: #0a1f44;
//       padding: 4px 10px;
//       display: inline-block;
//       margin-bottom: 10px;
//       line-height: 1.6;
//     }

//     /* ── SUMMARY ── */
//     .t8-summary {
//       font-family: 'Crimson Pro', Georgia, serif;
//       font-size: 14.5px;
//       font-weight: 400;
//       font-style: italic;
//       color: #334155;
//       line-height: 1.8;
//       word-wrap: break-word;
//       border-left: 3px solid #4db8e8;
//       padding-left: 12px;
//     }

//     .t8-summary p { margin: 0 !important; line-height: 1.8 !important; font-size: 14.5px !important; font-family: 'Crimson Pro', Georgia, serif !important; }

//     /* ── ENTRY ── */
//     .t8-entry {
//       margin-bottom: 14px;
//       padding-bottom: 14px;
//       border-bottom: 1px solid #e8edf4;
//     }

//     .t8-entry:last-child {
//       border-bottom: none;
//       padding-bottom: 0;
//       margin-bottom: 0;
//     }

//     .t8-entry-top {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       gap: 8px;
//       flex-wrap: wrap;
//       margin-bottom: 2px;
//     }

//     .t8-entry-title {
//       font-family: 'Archivo', Arial, sans-serif;
//       font-size: 14px;
//       font-weight: 700;
//       color: #0a1f44;
//       line-height: 1.3;
//     }

//     .t8-entry-date {
//       font-size: 10.5px;
//       font-weight: 600;
//       color: #ffffff;
//       background-color: #2a6496;
//       padding: 2px 8px;
//       white-space: nowrap;
//       font-family: 'Archivo', Arial, sans-serif;
//       letter-spacing: 0.3px;
//       flex-shrink: 0;
//     }

//     .t8-entry-subtitle {
//       font-size: 12px;
//       font-weight: 500;
//       color: #2a6496;
//       font-family: 'Archivo', Arial, sans-serif;
//       margin-bottom: 5px;
//       letter-spacing: 0.2px;
//     }

//     .t8-entry-content {
//       font-family: 'Archivo', Arial, sans-serif;
//       font-size: 12.5px;
//       font-weight: 400;
//       color: #475569;
//       line-height: 1.6;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t8-entry-content p { margin: 0 !important; padding: 0 !important; line-height: 1.6 !important; font-size: 12.5px !important; }
//     .t8-entry-content ul { list-style-type: disc !important; padding-left: 16px !important; margin: 0 !important; }
//     .t8-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
//     .t8-entry-content li { margin: 0 !important; margin-bottom: 2px !important; line-height: 1.6 !important; font-size: 12.5px !important; }

//     /* ── RIGHT SIDEBAR ── */
//     .t8-sidebar {
//       width: 37%;
//       background-color: #f0f5fc;
//       display: flex;
//       flex-direction: column;
//       border-left: 4px solid #0a1f44;
//     }

//     /* ── PHOTO BLOCK ── */
//     .t8-photo-block {
//       background-color: #0a1f44;
//       padding: 20px;
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       gap: 0;
//       position: relative;
//     }

//     .t8-photo-block::after {
//       content: '';
//       position: absolute;
//       bottom: -10px;
//       left: 50%;
//       transform: translateX(-50%);
//       width: 0;
//       height: 0;
//       border-left: 14px solid transparent;
//       border-right: 14px solid transparent;
//       border-top: 10px solid #0a1f44;
//     }

//     .t8-photo {
//       width: 96px;
//       height: 96px;
//       border-radius: 50%;
//       object-fit: cover;
//       border: 3px solid #4db8e8;
//     }

//     .t8-photo-placeholder {
//       width: 96px;
//       height: 96px;
//       border-radius: 50%;
//       border: 3px solid #4db8e8;
//       background-color: #1a3a6e;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }

//     .t8-photo-placeholder span {
//       font-family: 'Archivo', Arial, sans-serif;
//       font-size: 26px;
//       font-weight: 800;
//       color: #4db8e8;
//     }

//     /* ── SIDEBAR SECTIONS ── */
//     .t8-sidebar-top-gap {
//       height: 20px;
//     }

//     .t8-sidebar-section {
//       padding: 14px 16px;
//       border-bottom: 1px solid #d8e4f0;
//     }

//     .t8-sidebar-section:last-child { border-bottom: none; }

//     .t8-sidebar-title {
//       font-family: 'Archivo', Arial, sans-serif;
//       font-size: 9.5px;
//       font-weight: 700;
//       letter-spacing: 2.5px;
//       text-transform: uppercase;
//       color: #0a1f44;
//       margin-bottom: 8px;
//       padding-bottom: 4px;
//       border-bottom: 2px solid #4db8e8;
//       line-height: 1.4;
//     }

//     /* ── CONTACT ITEMS ── */
//     .t8-contact-item {
//       margin-bottom: 6px;
//     }

//     .t8-contact-label {
//       font-size: 9px;
//       font-weight: 700;
//       letter-spacing: 1.5px;
//       text-transform: uppercase;
//       color: #2a6496;
//       font-family: 'Archivo', Arial, sans-serif;
//       line-height: 1.4;
//     }

//     .t8-contact-value {
//       font-size: 11.5px;
//       font-weight: 400;
//       color: #1a2332;
//       font-family: 'Archivo', Arial, sans-serif;
//       line-height: 1.5;
//       word-wrap: break-word;
//     }

//     .t8-contact-link {
//       color: #2a6496;
//       text-decoration: underline;
//       font-family: 'Archivo', Arial, sans-serif;
//       font-size: 11.5px;
//     }

//     /* ── SKILL BARS ── */
//     .t8-skill-row { margin-bottom: 9px; }

//     .t8-skill-name {
//       font-size: 11.5px;
//       font-weight: 600;
//       color: #0a1f44;
//       font-family: 'Archivo', Arial, sans-serif;
//       margin-bottom: 3px;
//       letter-spacing: 0.2px;
//     }

//     .t8-skill-bar-bg {
//       height: 4px;
//       background: #c8d8ec;
//       overflow: hidden;
//     }

//     .t8-skill-bar-fill {
//       height: 100%;
//       background-color: #0a1f44;
//     }

//     /* ── SIDEBAR TEXT ── */
//     .t8-sidebar-text {
//       font-size: 12px;
//       font-weight: 400;
//       color: #334155;
//       font-family: 'Archivo', Arial, sans-serif;
//       line-height: 1.6;
//       word-wrap: break-word;
//     }

//     .t8-sidebar-text p { margin: 0 !important; line-height: 1.6 !important; font-size: 12px !important; }
//     .t8-sidebar-text div { line-height: 1.6 !important; }

//     .t8-lang-name {
//       font-size: 12px;
//       font-weight: 600;
//       color: #0a1f44;
//       font-family: 'Archivo', Arial, sans-serif;
//       margin-bottom: 3px;
//     }

//     .t8-link {
//       color: #2a6496;
//       text-decoration: underline;
//       font-family: 'Archivo', Arial, sans-serif;
//       font-size: 11.5px;
//       word-wrap: break-word;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page { size: A4; margin: 0; }
//       @page :first { margin-top: 0; }

//       .resume-t8 { width: 100% !important; box-shadow: none !important; }
//       .t8-name-stripe { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t8-name-stripe::before { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t8-section-title { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t8-entry-date { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t8-sidebar { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t8-photo-block { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t8-photo-block::after { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t8-skill-bar-fill { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t8-sidebar-title { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

//       .t8-entry { page-break-inside: avoid; break-inside: avoid; }
//       .t8-section-title { page-break-after: avoid; break-after: avoid; }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION
//   ====================================================== */
//   const generateHTML = () => {
//     const addressStr = [contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ");
//     const initials = `${contact?.firstName?.[0] || ""}${contact?.lastName?.[0] || ""}`;
//     const photoHtml = previewUrl
//       ? `<img src="${previewUrl}" alt="Profile" class="t8-photo" />`
//       : `<div class="t8-photo-placeholder"><span>${initials || "?"}</span></div>`;

//     const sidebarTitle = (t: string) => `<div class="t8-sidebar-title">${t}</div>`;

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet"/>
//   <style>
//     * { box-sizing: border-box; margin: 0; padding: 0; }
//     body { margin: 0; padding: 0; background: #ffffff; font-family: 'Archivo', Arial, sans-serif; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="resume-t8">

//   <!-- MAIN LEFT -->
//   <div class="t8-main">
//     <div class="t8-name-stripe">
//       <div class="t8-name">${contact?.firstName || ""} <span>${contact?.lastName || ""}</span></div>
//       ${contact?.jobTitle ? `<div class="t8-jobtitle">${getJobTitle(contact.jobTitle)}</div>` : ""}
//     </div>

//     <div class="t8-main-body">

//       ${summary ? `
//       <div class="t8-section">
//         <div class="t8-section-title">Profile</div>
//         <div class="t8-summary">${stripHtml(summary)}</div>
//       </div>` : ""}

//       ${experiences?.length > 0 ? `
//       <div class="t8-section">
//         <div class="t8-section-title">Experience</div>
//         ${experiences.map((exp) => {
//           const start = formatMonthYear(exp.startDate, true);
//           const end = exp.endDate ? formatMonthYear(exp.endDate, true) : (exp.startDate ? "Present" : "");
//           return `
//         <div class="t8-entry">
//           <div class="t8-entry-top">
//             <div class="t8-entry-title">${exp.jobTitle || ""}</div>
//             ${start || end ? `<div class="t8-entry-date">${start}${start && end ? " – " : ""}${end}</div>` : ""}
//           </div>
//           ${exp.employer || exp.location ? `<div class="t8-entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" · ")}</div>` : ""}
//           ${exp.text ? `<div class="t8-entry-content">${stripHtml(exp.text)}</div>` : ""}
//         </div>`;
//         }).join("")}
//       </div>` : ""}

//       ${educations?.length > 0 ? `
//       <div class="t8-section">
//         <div class="t8-section-title">Education</div>
//         ${educations.map((edu) => {
//           const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(" – ");
//           return `
//         <div class="t8-entry">
//           <div class="t8-entry-top">
//             <div class="t8-entry-title">${edu.schoolname || ""}</div>
//             ${dateStr ? `<div class="t8-entry-date">${dateStr}</div>` : ""}
//           </div>
//           ${edu.degree || edu.location ? `<div class="t8-entry-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" · ")}</div>` : ""}
//           ${edu.text ? `<div class="t8-entry-content">${stripHtml(edu.text)}</div>` : ""}
//         </div>`;
//         }).join("")}
//       </div>` : ""}

//       ${fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//       <div class="t8-section">
//         <div class="t8-section-title">Awards & Honors</div>
//         <div class="t8-entry-content">${fin.awards.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//       </div>` : ""}

//       ${fin.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//       <div class="t8-section">
//         ${s.name ? `<div class="t8-section-title">${s.name}</div>` : ""}
//         ${s.description ? `<div class="t8-entry-content">${stripHtml(s.description)}</div>` : ""}
//       </div>`).join("")}

//     </div>
//   </div>

//   <!-- RIGHT SIDEBAR -->
//   <div class="t8-sidebar">
//     <div class="t8-photo-block">${photoHtml}</div>
//     <div class="t8-sidebar-top-gap"></div>

//     <div class="t8-sidebar-section">
//       ${sidebarTitle("Contact")}
//       ${addressStr ? `<div class="t8-contact-item"><div class="t8-contact-label">Address</div><div class="t8-contact-value">${addressStr}</div></div>` : ""}
//       ${contact?.phone ? `<div class="t8-contact-item"><div class="t8-contact-label">Phone</div><div class="t8-contact-value">${contact.phone}</div></div>` : ""}
//       ${contact?.email ? `<div class="t8-contact-item"><div class="t8-contact-label">Email</div><div class="t8-contact-value">${contact.email}</div></div>` : ""}
//       ${linkedinUrl?.trim() ? `<div class="t8-contact-item"><div class="t8-contact-label">LinkedIn</div><div class="t8-contact-value"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t8-contact-link">LinkedIn</a></div></div>` : ""}
//       ${contact?.portfolio?.trim() ? `<div class="t8-contact-item"><div class="t8-contact-label">Portfolio</div><div class="t8-contact-value"><a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" class="t8-contact-link">Portfolio</a></div></div>` : ""}
//     </div>

//     ${skills.length > 0 ? `
//     <div class="t8-sidebar-section">
//       ${sidebarTitle("Skills")}
//       ${skills.map((s) => `
//       <div class="t8-skill-row">
//         <div class="t8-skill-name">${s.skill || ""}</div>
//         ${s.level ? `<div class="t8-skill-bar-bg"><div class="t8-skill-bar-fill" style="width:${skillPct(s.level)}"></div></div>` : ""}
//       </div>`).join("")}
//     </div>` : ""}

//     ${fin.languages.some((l) => l.name?.trim()) ? `
//     <div class="t8-sidebar-section">
//       ${sidebarTitle("Languages")}
//       ${fin.languages.filter((l) => l.name?.trim()).map((l) => `
//       <div class="t8-skill-row">
//         <div class="t8-lang-name">${l.name}</div>
//         ${l.level ? `<div class="t8-skill-bar-bg"><div class="t8-skill-bar-fill" style="width:${skillPct(l.level)}"></div></div>` : ""}
//       </div>`).join("")}
//     </div>` : ""}

//     ${fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//     <div class="t8-sidebar-section">
//       ${sidebarTitle("Certifications")}
//       <div class="t8-sidebar-text">${fin.certifications.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//     </div>` : ""}

//     ${fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//     <div class="t8-sidebar-section">
//       ${sidebarTitle("Interests")}
//       <div class="t8-sidebar-text">${fin.hobbies.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//     </div>` : ""}

//     ${fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//     <div class="t8-sidebar-section">
//       ${sidebarTitle("References")}
//       <div class="t8-sidebar-text">${fin.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//     </div>` : ""}

//     ${fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) ? `
//     <div class="t8-sidebar-section">
//       ${sidebarTitle("Websites")}
//       <div class="t8-sidebar-text">${fin.websites.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((i) => `
//       <div style="margin-bottom:4px">
//         ${i.websiteUrl ? `<a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="t8-link">${i.websiteUrl}</a>` : ""}
//         ${i.socialMedia ? `<div><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="t8-link">${i.socialMedia}</a></div>` : ""}
//       </div>`).join("")}</div>
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

//       <div className="resume-t8" style={{ margin: "0 auto", boxShadow: "0 4px 24px rgba(10,31,68,0.15)" }}>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* MAIN LEFT */}
//         <div className="t8-main">
//           <div className="t8-name-stripe">
//             <div className="t8-name">
//               {contact?.firstName || ""} <span>{contact?.lastName || ""}</span>
//             </div>
//             {contact?.jobTitle && <div className="t8-jobtitle">{getJobTitle(contact.jobTitle)}</div>}
//           </div>

//           <div className="t8-main-body">

//             {summary && (
//               <div className="t8-section">
//                 <div className="t8-section-title">Profile</div>
//                 <div className="t8-summary">{stripHtml(summary)}</div>
//               </div>
//             )}

//             {experiences?.length > 0 && (
//               <div className="t8-section">
//                 <div className="t8-section-title">Experience</div>
//                 {experiences.map((exp, index) => (
//                   <div key={exp.id || index} className="t8-entry">
//                     <div className="t8-entry-top">
//                       <div className="t8-entry-title">{exp.jobTitle || ""}</div>
//                       <div className="t8-entry-date">
//                         <MonthYearDisplay value={exp.startDate} shortYear={true} />
//                         {exp.startDate && <span> – </span>}
//                         {exp.endDate
//                           ? <MonthYearDisplay value={exp.endDate} shortYear={true} />
//                           : exp.startDate && <span>Present</span>}
//                       </div>
//                     </div>
//                     {(exp.employer || exp.location) && (
//                       <div className="t8-entry-subtitle">{[exp.employer, exp.location].filter(Boolean).join(" · ")}</div>
//                     )}
//                     {exp.text && <div className="t8-entry-content">{stripHtml(exp.text)}</div>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {educations?.length > 0 && (
//               <div className="t8-section">
//                 <div className="t8-section-title">Education</div>
//                 {educations.map((edu, index) => (
//                   <div key={edu.id || index} className="t8-entry">
//                     <div className="t8-entry-top">
//                       <div className="t8-entry-title">{edu.schoolname || ""}</div>
//                       {(edu.startDate || edu.endDate) && (
//                         <div className="t8-entry-date">{[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}</div>
//                       )}
//                     </div>
//                     {(edu.degree || edu.location) && (
//                       <div className="t8-entry-subtitle">{[edu.degree, edu.location].filter(Boolean).join(" · ")}</div>
//                     )}
//                     {edu.text && <div className="t8-entry-content">{stripHtml(edu.text)}</div>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//               <div className="t8-section">
//                 <div className="t8-section-title">Awards & Honors</div>
//                 <div className="t8-entry-content">
//                   {fin.awards.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                     <div key={item.id || i}>{stripHtml(item.name || "")}</div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {fin.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((section, i) => (
//               <div key={section.id || i} className="t8-section">
//                 {section.name && <div className="t8-section-title">{section.name}</div>}
//                 {section.description && <div className="t8-entry-content">{stripHtml(section.description)}</div>}
//               </div>
//             ))}

//           </div>
//         </div>

//         {/* RIGHT SIDEBAR */}
//         <div className="t8-sidebar">
//           <div className="t8-photo-block">
//             {previewUrl
//               ? <img src={previewUrl} alt="Profile" className="t8-photo" />
//               : <div className="t8-photo-placeholder"><span>{initials || "?"}</span></div>}
//           </div>
//           <div className="t8-sidebar-top-gap" />

//           <div className="t8-sidebar-section">
//             <div className="t8-sidebar-title">Contact</div>
//             {[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).length > 0 && (
//               <div className="t8-contact-item">
//                 <div className="t8-contact-label">Address</div>
//                 <div className="t8-contact-value">{[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ")}</div>
//               </div>
//             )}
//             {contact?.phone && <div className="t8-contact-item"><div className="t8-contact-label">Phone</div><div className="t8-contact-value">{contact.phone}</div></div>}
//             {contact?.email && <div className="t8-contact-item"><div className="t8-contact-label">Email</div><div className="t8-contact-value">{contact.email}</div></div>}
//             {linkedinUrl?.trim() && (
//               <div className="t8-contact-item">
//                 <div className="t8-contact-label">LinkedIn</div>
//                 <div className="t8-contact-value"><a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer" className="t8-contact-link">LinkedIn</a></div>
//               </div>
//             )}
//             {contact?.portfolio?.trim() && (
//               <div className="t8-contact-item">
//                 <div className="t8-contact-label">Portfolio</div>
//                 <div className="t8-contact-value"><a href={contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`} target="_blank" rel="noreferrer" className="t8-contact-link">Portfolio</a></div>
//               </div>
//             )}
//           </div>

//           {skills.length > 0 && (
//             <div className="t8-sidebar-section">
//               <div className="t8-sidebar-title">Skills</div>
//               {skills.map((skill, i) => (
//                 <div key={skill.id || i} className="t8-skill-row">
//                   <div className="t8-skill-name">{skill.skill || ""}</div>
//                   {skill.level && <div className="t8-skill-bar-bg"><div className="t8-skill-bar-fill" style={{ width: skillPct(skill.level) }} /></div>}
//                 </div>
//               ))}
//             </div>
//           )}

//           {fin.languages.some((l) => l.name?.trim()) && (
//             <div className="t8-sidebar-section">
//               <div className="t8-sidebar-title">Languages</div>
//               {fin.languages.filter((l) => l.name?.trim()).map((l, i) => (
//                 <div key={l._id || i} className="t8-skill-row">
//                   <div className="t8-lang-name">{l.name}</div>
//                   {l.level && <div className="t8-skill-bar-bg"><div className="t8-skill-bar-fill" style={{ width: skillPct(l.level) }} /></div>}
//                 </div>
//               ))}
//             </div>
//           )}

//           {fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//             <div className="t8-sidebar-section">
//               <div className="t8-sidebar-title">Certifications</div>
//               <div className="t8-sidebar-text">
//                 {fin.certifications.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                   <div key={item.id || i}>{stripHtml(item.name || "")}</div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//             <div className="t8-sidebar-section">
//               <div className="t8-sidebar-title">Interests</div>
//               <div className="t8-sidebar-text">
//                 {fin.hobbies.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                   <div key={item.id || i}>{stripHtml(item.name || "")}</div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//             <div className="t8-sidebar-section">
//               <div className="t8-sidebar-title">References</div>
//               <div className="t8-sidebar-text">
//                 {fin.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                   <div key={item.id || i}>{stripHtml(item.name || "")}</div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) && (
//             <div className="t8-sidebar-section">
//               <div className="t8-sidebar-title">Websites</div>
//               <div className="t8-sidebar-text">
//                 {fin.websites.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((item, i) => (
//                   <div key={item.id || i} style={{ marginBottom: "4px" }}>
//                     {item.websiteUrl && <a href={item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`} target="_blank" rel="noreferrer" className="t8-link">{item.websiteUrl}</a>}
//                     {item.socialMedia && <div><a href={item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`} target="_blank" rel="noreferrer" className="t8-link">{item.socialMedia}</a></div>}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateEight;