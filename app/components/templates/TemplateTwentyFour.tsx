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

// const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
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
//     const addressStr = [contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ");
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
//       ${linkedinUrl?.trim() ? `<div class="t7-contact-item"><span class="t7-contact-label">LinkedIn</span><br/><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t7-contact-link">LinkedIn</a></div>` : ""}
//       ${contact?.portfolio?.trim() ? `<div class="t7-contact-item"><span class="t7-contact-label">Portfolio</span><br/><a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" class="t7-contact-link">Portfolio</a></div>` : ""}
//     </div>

//     ${skills.length > 0 ? `
//     <div class="t7-sidebar-section">
//       <div class="t7-sidebar-section-title">Skills</div>
//       ${skills.map((s) => `
//       <div class="t7-skill-row">
//         <div class="t7-skill-name">${s.skill || ""}</div>
//         ${s.level ? `<div class="t7-skill-bar-bg"><div class="t7-skill-bar-fill" style="width:${skillPct(s.level)}"></div></div>` : ""}
//       </div>`).join("")}
//     </div>` : ""}

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
//             {[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).length > 0 && (
//               <div className="t7-contact-item">
//                 <span className="t7-contact-label">Address</span><br />
//                 {[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ")}
//               </div>
//             )}
//             {contact?.phone && <div className="t7-contact-item"><span className="t7-contact-label">Phone</span><br />{contact.phone}</div>}
//             {contact?.email && <div className="t7-contact-item"><span className="t7-contact-label">Email</span><br />{contact.email}</div>}
//             {linkedinUrl?.trim() && <div className="t7-contact-item"><span className="t7-contact-label">LinkedIn</span><br /><a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer" className="t7-contact-link">LinkedIn</a></div>}
//             {contact?.portfolio?.trim() && <div className="t7-contact-item"><span className="t7-contact-label">Portfolio</span><br /><a href={contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`} target="_blank" rel="noreferrer" className="t7-contact-link">Portfolio</a></div>}
//           </div>

//           {skills.length > 0 && (
//             <div className="t7-sidebar-section">
//               <div className="t7-sidebar-section-title">Skills</div>
//               {skills.map((skill, i) => (
//                 <div key={skill.id || i} className="t7-skill-row">
//                   <div className="t7-skill-name">{skill.skill || ""}</div>
//                   {skill.level && <div className="t7-skill-bar-bg"><div className="t7-skill-bar-fill" style={{ width: skillPct(skill.level) }} /></div>}
//                 </div>
//               ))}
//             </div>
//           )}

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

// export default TemplateSeven;