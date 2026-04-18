// "use client";

// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { MonthYearDisplay, formatMonthYear } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import {

//   Finalize,
//   ResumeProps,
// } from "@/app/types/context.types";



// const TemplateSix: React.FC<ResumeProps> = ({ alldata }) => {
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
//      SHARED CSS — scoped to .resume-t6
//      Purple & Silver | Elegant Luxury | Header + 2 cols
//   ====================================================== */
//   const styles = `
//     @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Raleway:wght@300;400;500;600;700&display=swap');

//     .resume-t6 * { box-sizing: border-box; }

//     .resume-t6 {
//       width: 210mm;
//       min-height: 297mm;
//       background-color: #ffffff;
//       font-family: 'Raleway', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #2d2d2d;
//       text-align: left;
//     }

//     /* Scoped resets */
//     .resume-t6 p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; font-family: 'Raleway', Arial, sans-serif; }
//     .resume-t6 ul { list-style-type: disc !important; padding-left: 18px !important; margin: 0 !important; }
//     .resume-t6 ol { list-style-type: decimal !important; padding-left: 18px !important; margin: 0 !important; }
//     .resume-t6 li { margin-top: 0 !important; margin-bottom: 2px !important; padding: 0 !important; line-height: 1.5 !important; font-size: 13px !important; font-family: 'Raleway', Arial, sans-serif !important; }

//     /* ── HEADER ── */
//     .t6-header {
//       background: linear-gradient(135deg, #3b1f6e 0%, #5c3494 50%, #7b4db8 100%);
//       padding: 28px 32px 22px;
//       display: flex;
//       align-items: center;
//       gap: 24px;
//       position: relative;
//       overflow: hidden;
//     }

//     .t6-header::after {
//       content: '';
//       position: absolute;
//       bottom: 0;
//       left: 0;
//       right: 0;
//       height: 3px;
//       background: linear-gradient(90deg, #c0a060, #e8d5a3, #c0a060);
//     }

//     .t6-header-photo {
//       width: 110px;
//       height: 110px;
//       border-radius: 50%;
//       object-fit: cover;
//       border: 3px solid #c0a060;
//       flex-shrink: 0;
//     }

//     .t6-header-photo-placeholder {
//       width: 110px;
//       height: 110px;
//       border-radius: 50%;
//       border: 3px solid #c0a060;
//       background: #4a2880;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       flex-shrink: 0;
//     }

//     .t6-header-photo-placeholder span {
//       font-size: 36px;
//       color: #c0a060;
//       font-family: 'Cormorant Garamond', serif;
//       font-weight: 300;
//     }

//     .t6-header-info {
//       flex: 1;
//     }

//     .t6-name {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: 38px;
//       font-weight: 600;
//       color: #ffffff;
//       letter-spacing: 2px;
//       line-height: 1.1;
//       margin-bottom: 4px;
//     }

//     .t6-jobtitle {
//       font-family: 'Raleway', Arial, sans-serif;
//       font-size: 11px;
//       font-weight: 500;
//       letter-spacing: 4px;
//       text-transform: uppercase;
//       color: #c0a060;
//       margin-bottom: 14px;
//     }

//     .t6-header-meta {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 4px 20px;
//       font-size: 11px;
//       color: #d4bfed;
//       font-family: 'Raleway', Arial, sans-serif;
//       font-weight: 300;
//     }

//     .t6-header-meta-item {
//       display: flex;
//       align-items: center;
//       gap: 5px;
//       color: #d4bfed;
//     }

//     .t6-header-meta-item a { color: #c0a060; text-decoration: underline; text-underline-offset: 2px; font-family: 'Raleway', Arial, sans-serif; }

//     .t6-meta-dot {
//       width: 4px;
//       height: 4px;
//       border-radius: 50%;
//       background: #c0a060;
//       flex-shrink: 0;
//     }

//     /* ── BODY ── */
//     .t6-body {
//       display: flex;
//       gap: 0;
//     }

//     /* ── LEFT COLUMN ── */
//     .t6-left {
//       width: 38%;
//       background: #f8f5ff;
//       padding: 22px 20px;
//       border-right: 1px solid #e8e0f0;
//     }

//     /* ── RIGHT COLUMN ── */
//     .t6-right {
//       width: 62%;
//       padding: 22px 24px;
//     }

//     /* ── SECTION TITLE ── */
//     .t6-section-title {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: 17px;
//       font-weight: 600;
//       color: #3b1f6e;
//       letter-spacing: 1px;
//       margin-bottom: 10px;
//       padding-bottom: 5px;
//       border-bottom: 1px solid #c0a060;
//       line-height: 1.3;
//     }

//     .t6-section-block {
//       margin-bottom: 18px;
//     }

//     /* ── SUMMARY ── */
//     .t6-summary-text {
//       font-family: 'Raleway', Arial, sans-serif;
//       font-size: 12.5px;
//       font-weight: 300;
//       color: #444;
//       line-height: 1.7;
//       font-style: italic;
//       word-wrap: break-word;
//     }

//     .t6-summary-text p { margin: 0 !important; line-height: 1.7 !important; font-size: 12.5px !important; }

//     /* ── SKILLS ── */
//     .t6-skill-row {
//       margin-bottom: 8px;
//     }

//     .t6-skill-label {
//       font-size: 11.5px;
//       font-weight: 500;
//       color: #3b1f6e;
//       font-family: 'Raleway', Arial, sans-serif;
//       margin-bottom: 3px;
//       letter-spacing: 0.3px;
//     }

//     .t6-skill-bar-bg {
//       height: 3px;
//       background: #ddd8eb;
//       border-radius: 2px;
//       overflow: hidden;
//     }

//     .t6-skill-bar-fill {
//       height: 100%;
//       background: linear-gradient(90deg, #3b1f6e, #7b4db8);
//       border-radius: 2px;
//     }

//     /* ── ENTRY ── */
//     .t6-entry {
//       margin-bottom: 14px;
//       padding-bottom: 14px;
//       border-bottom: 1px solid #f0ecf8;
//     }

//     .t6-entry:last-child {
//       border-bottom: none;
//       padding-bottom: 0;
//       margin-bottom: 0;
//     }

//     .t6-entry-top {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       gap: 8px;
//       flex-wrap: wrap;
//       margin-bottom: 2px;
//     }

//     .t6-entry-title {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: 16px;
//       font-weight: 600;
//       color: #3b1f6e;
//       line-height: 1.3;
//     }

//     .t6-entry-date {
//       font-size: 10.5px;
//       font-weight: 500;
//       color: #8a7aaa;
//       white-space: nowrap;
//       font-family: 'Raleway', Arial, sans-serif;
//       letter-spacing: 0.5px;
//       background: #ede8f8;
//       padding: 2px 7px;
//       border-radius: 10px;
//     }

//     .t6-entry-subtitle {
//       font-size: 11.5px;
//       color: #7b4db8;
//       font-weight: 500;
//       font-family: 'Raleway', Arial, sans-serif;
//       margin-bottom: 5px;
//       letter-spacing: 0.3px;
//     }

//     .t6-entry-content {
//       font-size: 12.5px;
//       color: #444;
//       font-family: 'Raleway', Arial, sans-serif;
//       line-height: 1.6;
//       font-weight: 300;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .t6-entry-content p { margin: 0 !important; padding: 0 !important; line-height: 1.6 !important; font-size: 12.5px !important; }
//     .t6-entry-content ul { list-style-type: disc !important; padding-left: 16px !important; margin: 0 !important; }
//     .t6-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
//     .t6-entry-content li { margin: 0 !important; margin-bottom: 2px !important; line-height: 1.6 !important; font-size: 12.5px !important; }

//     /* ── LEFT ITEMS ── */
//     .t6-left-item {
//       font-size: 12px;
//       color: #444;
//       font-family: 'Raleway', Arial, sans-serif;
//       font-weight: 300;
//       line-height: 1.6;
//       margin-bottom: 3px;
//       word-wrap: break-word;
//     }

//     .t6-left-item p { margin: 0 !important; line-height: 1.6 !important; font-size: 12px !important; }
//     .t6-left-item div { line-height: 1.6 !important; }

//     .t6-lang-name {
//       font-size: 12px;
//       font-weight: 500;
//       color: #3b1f6e;
//       font-family: 'Raleway', Arial, sans-serif;
//       margin-bottom: 3px;
//     }

//     /* ── WEBSITE ── */
//     .t6-website-label {
//       font-size: 11.5px;
//       font-weight: 600;
//       color: #3b1f6e;
//       font-family: 'Raleway', Arial, sans-serif;
//     }

//     .t6-website-link {
//       font-size: 11.5px;
//       color: #7b4db8;
//       text-decoration: underline;
//       font-family: 'Raleway', Arial, sans-serif;
//       word-wrap: break-word;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page { size: A4; margin: 0; }
//       @page :first { margin-top: 0; }

//       .resume-t6 { width: 100% !important; box-shadow: none !important; }
//       .t6-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t6-left { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t6-skill-bar-fill { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//       .t6-entry-date { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

//       .t6-entry { page-break-inside: avoid; break-inside: avoid; }
//       .t6-section-title { page-break-after: avoid; break-after: avoid; }
//       .t6-body { page-break-before: avoid; }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION
//   ====================================================== */
//   const generateHTML = () => {
//     const addressStr = [contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ");
//     const initials = `${contact?.firstName?.[0] || ""}${contact?.lastName?.[0] || ""}`;
//     const photoHtml = previewUrl
//       ? `<img src="${previewUrl}" alt="Profile" class="t6-header-photo" />`
//       : `<div class="t6-header-photo-placeholder"><span>${initials || "?"}</span></div>`;

//     const sectionTitle = (t: string) => `<div class="t6-section-title">${t}</div>`;

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>
//     * { box-sizing: border-box; margin: 0; padding: 0; }
//     body { margin: 0; padding: 0; background: white; font-family: 'Raleway', Arial, sans-serif; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="resume-t6">

//   <!-- HEADER -->
//   <div class="t6-header">
//     ${photoHtml}
//     <div class="t6-header-info">
//       <div class="t6-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//       ${contact?.jobTitle ? `<div class="t6-jobtitle">${getJobTitle(contact.jobTitle)}</div>` : ""}
//       <div class="t6-header-meta">
//         ${addressStr ? `<span class="t6-header-meta-item"><span class="t6-meta-dot"></span>${addressStr}</span>` : ""}
//         ${contact?.email ? `<span class="t6-header-meta-item"><span class="t6-meta-dot"></span>${contact.email}</span>` : ""}
//         ${contact?.phone ? `<span class="t6-header-meta-item"><span class="t6-meta-dot"></span>${contact.phone}</span>` : ""}
//         ${linkedinUrl?.trim() ? `<span class="t6-header-meta-item"><span class="t6-meta-dot"></span><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>` : ""}
//         ${contact?.portfolio?.trim() ? `<span class="t6-header-meta-item"><span class="t6-meta-dot"></span><a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}">Portfolio</a></span>` : ""}
//       </div>
//     </div>
//   </div>

//   <!-- BODY -->
//   <div class="t6-body">

//     <!-- LEFT COLUMN -->
//     <div class="t6-left">

//       ${summary ? `
//       <div class="t6-section-block">
//         ${sectionTitle("Profile")}
//         <div class="t6-summary-text">${stripHtml(summary)}</div>
//       </div>` : ""}

//       ${skills.length > 0 ? `
//       <div class="t6-section-block">
//         ${sectionTitle("Skills")}
//         ${skills.map((s) => `
//         <div class="t6-skill-row">
//           <div class="t6-skill-label">${s.skill || ""}</div>
//           ${s.level ? `<div class="t6-skill-bar-bg"><div class="t6-skill-bar-fill" style="width:${skillPct(s.level)}"></div></div>` : ""}
//         </div>`).join("")}
//       </div>` : ""}

//       ${fin.languages.some((l) => l.name?.trim()) ? `
//       <div class="t6-section-block">
//         ${sectionTitle("Languages")}
//         ${fin.languages.filter((l) => l.name?.trim()).map((l) => `
//         <div class="t6-skill-row">
//           <div class="t6-lang-name">${l.name}</div>
//           ${l.level ? `<div class="t6-skill-bar-bg"><div class="t6-skill-bar-fill" style="width:${skillPct(l.level)}"></div></div>` : ""}
//         </div>`).join("")}
//       </div>` : ""}

//       ${fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//       <div class="t6-section-block">
//         ${sectionTitle("Certifications")}
//         <div class="t6-left-item">${fin.certifications.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//       </div>` : ""}

//       ${fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//       <div class="t6-section-block">
//         ${sectionTitle("Interests")}
//         <div class="t6-left-item">${fin.hobbies.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//       </div>` : ""}

//       ${fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//       <div class="t6-section-block">
//         ${sectionTitle("References")}
//         <div class="t6-left-item">${fin.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//       </div>` : ""}

//     </div>

//     <!-- RIGHT COLUMN -->
//     <div class="t6-right">

//       ${experiences?.length > 0 ? `
//       <div class="t6-section-block">
//         ${sectionTitle("Experience")}
//         ${experiences.map((exp) => {
//           const start = formatMonthYear(exp.startDate, true);
//           const end = exp.endDate ? formatMonthYear(exp.endDate, true) : (exp.startDate ? "Present" : "");
//           return `
//         <div class="t6-entry">
//           <div class="t6-entry-top">
//             <div class="t6-entry-title">${exp.jobTitle || ""}</div>
//             ${start || end ? `<div class="t6-entry-date">${start}${start && end ? " – " : ""}${end}</div>` : ""}
//           </div>
//           ${exp.employer || exp.location ? `<div class="t6-entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" · ")}</div>` : ""}
//           ${exp.text ? `<div class="t6-entry-content">${stripHtml(exp.text)}</div>` : ""}
//         </div>`;
//         }).join("")}
//       </div>` : ""}

//       ${educations?.length > 0 ? `
//       <div class="t6-section-block">
//         ${sectionTitle("Education")}
//         ${educations.map((edu) => {
//           const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(" – ");
//           return `
//         <div class="t6-entry">
//           <div class="t6-entry-top">
//             <div class="t6-entry-title">${edu.schoolname || ""}</div>
//             ${dateStr ? `<div class="t6-entry-date">${dateStr}</div>` : ""}
//           </div>
//           ${edu.degree || edu.location ? `<div class="t6-entry-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" · ")}</div>` : ""}
//           ${edu.text ? `<div class="t6-entry-content">${stripHtml(edu.text)}</div>` : ""}
//         </div>`;
//         }).join("")}
//       </div>` : ""}

//       ${fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//       <div class="t6-section-block">
//         ${sectionTitle("Awards & Honors")}
//         <div class="t6-entry-content">${fin.awards.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
//       </div>` : ""}

//       ${fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) ? `
//       <div class="t6-section-block">
//         ${sectionTitle("Websites & Social Media")}
//         ${fin.websites.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((i) => `
//         <div style="margin-bottom:5px">
//           ${i.websiteUrl ? `<div><span class="t6-website-label">Website: </span><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="t6-website-link">${i.websiteUrl}</a></div>` : ""}
//           ${i.socialMedia ? `<div><span class="t6-website-label">Social: </span><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="t6-website-link">${i.socialMedia}</a></div>` : ""}
//         </div>`).join("")}
//       </div>` : ""}

//       ${fin.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//       <div class="t6-section-block">
//         ${s.name ? sectionTitle(s.name) : ""}
//         ${s.description ? `<div class="t6-entry-content">${stripHtml(s.description)}</div>` : ""}
//       </div>`).join("")}

//     </div>
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

//       <div className="resume-t6" style={{ margin: "0 auto", boxShadow: "0 4px 24px rgba(59,31,110,0.15)" }}>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="t6-header">
//           {previewUrl
//             ? <img src={previewUrl} alt="Profile" className="t6-header-photo" />
//             : <div className="t6-header-photo-placeholder"><span>{initials || "?"}</span></div>
//           }
//           <div className="t6-header-info">
//             <div className="t6-name">{contact?.firstName || ""} {contact?.lastName || ""}</div>
//             {contact?.jobTitle && <div className="t6-jobtitle">{getJobTitle(contact.jobTitle)}</div>}
//             <div className="t6-header-meta">
//               {[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).length > 0 && (
//                 <span className="t6-header-meta-item">
//                   <span className="t6-meta-dot" />
//                   {[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ")}
//                 </span>
//               )}
//               {contact?.email && <span className="t6-header-meta-item"><span className="t6-meta-dot" />{contact.email}</span>}
//               {contact?.phone && <span className="t6-header-meta-item"><span className="t6-meta-dot" />{contact.phone}</span>}
//               {linkedinUrl?.trim() && (
//                 <span className="t6-header-meta-item">
//                   <span className="t6-meta-dot" />
//                   <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">LinkedIn</a>
//                 </span>
//               )}
//               {contact?.portfolio?.trim() && (
//                 <span className="t6-header-meta-item">
//                   <span className="t6-meta-dot" />
//                   <a href={contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`} target="_blank" rel="noreferrer">Portfolio</a>
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="t6-body">

//           {/* LEFT COLUMN */}
//           <div className="t6-left">

//             {summary && (
//               <div className="t6-section-block">
//                 <div className="t6-section-title">Profile</div>
//                 <div className="t6-summary-text">{stripHtml(summary)}</div>
//               </div>
//             )}

//             {skills.length > 0 && (
//               <div className="t6-section-block">
//                 <div className="t6-section-title">Skills</div>
//                 {skills.map((skill, i) => (
//                   <div key={skill.id || i} className="t6-skill-row">
//                     <div className="t6-skill-label">{skill.skill || ""}</div>
//                     {skill.level && <div className="t6-skill-bar-bg"><div className="t6-skill-bar-fill" style={{ width: skillPct(skill.level) }} /></div>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {fin.languages.some((l) => l.name?.trim()) && (
//               <div className="t6-section-block">
//                 <div className="t6-section-title">Languages</div>
//                 {fin.languages.filter((l) => l.name?.trim()).map((l, i) => (
//                   <div key={l._id || i} className="t6-skill-row">
//                     <div className="t6-lang-name">{l.name}</div>
//                     {l.level && <div className="t6-skill-bar-bg"><div className="t6-skill-bar-fill" style={{ width: skillPct(l.level) }} /></div>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//               <div className="t6-section-block">
//                 <div className="t6-section-title">Certifications</div>
//                 <div className="t6-left-item">
//                   {fin.certifications.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                     <div key={item.id || i}>{stripHtml(item.name || "")}</div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//               <div className="t6-section-block">
//                 <div className="t6-section-title">Interests</div>
//                 <div className="t6-left-item">
//                   {fin.hobbies.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                     <div key={item.id || i}>{stripHtml(item.name || "")}</div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//               <div className="t6-section-block">
//                 <div className="t6-section-title">References</div>
//                 <div className="t6-left-item">
//                   {fin.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                     <div key={item.id || i}>{stripHtml(item.name || "")}</div>
//                   ))}
//                 </div>
//               </div>
//             )}

//           </div>

//           {/* RIGHT COLUMN */}
//           <div className="t6-right">

//             {experiences?.length > 0 && (
//               <div className="t6-section-block">
//                 <div className="t6-section-title">Experience</div>
//                 {experiences.map((exp, index) => (
//                   <div key={exp.id || index} className="t6-entry">
//                     <div className="t6-entry-top">
//                       <div className="t6-entry-title">{exp.jobTitle || ""}</div>
//                       <div className="t6-entry-date">
//                         <MonthYearDisplay value={exp.startDate} shortYear={true} />
//                         {exp.startDate && <span> – </span>}
//                         {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear={true} /> : exp.startDate && <span>Present</span>}
//                       </div>
//                     </div>
//                     {(exp.employer || exp.location) && (
//                       <div className="t6-entry-subtitle">{[exp.employer, exp.location].filter(Boolean).join(" · ")}</div>
//                     )}
//                     {exp.text && <div className="t6-entry-content">{stripHtml(exp.text)}</div>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {educations?.length > 0 && (
//               <div className="t6-section-block">
//                 <div className="t6-section-title">Education</div>
//                 {educations.map((edu, index) => (
//                   <div key={edu.id || index} className="t6-entry">
//                     <div className="t6-entry-top">
//                       <div className="t6-entry-title">{edu.schoolname || ""}</div>
//                       {(edu.startDate || edu.endDate) && (
//                         <div className="t6-entry-date">{[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}</div>
//                       )}
//                     </div>
//                     {(edu.degree || edu.location) && (
//                       <div className="t6-entry-subtitle">{[edu.degree, edu.location].filter(Boolean).join(" · ")}</div>
//                     )}
//                     {edu.text && <div className="t6-entry-content">{stripHtml(edu.text)}</div>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//               <div className="t6-section-block">
//                 <div className="t6-section-title">Awards & Honors</div>
//                 <div className="t6-entry-content">
//                   {fin.awards.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                     <div key={item.id || i}>{stripHtml(item.name || "")}</div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) && (
//               <div className="t6-section-block">
//                 <div className="t6-section-title">Websites & Social Media</div>
//                 {fin.websites.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((item, i) => (
//                   <div key={item.id || i} style={{ marginBottom: "5px" }}>
//                     {item.websiteUrl && <div><span className="t6-website-label">Website: </span><a href={item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`} target="_blank" rel="noreferrer" className="t6-website-link">{item.websiteUrl}</a></div>}
//                     {item.socialMedia && <div><span className="t6-website-label">Social: </span><a href={item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`} target="_blank" rel="noreferrer" className="t6-website-link">{item.socialMedia}</a></div>}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {fin.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((section, i) => (
//               <div key={section.id || i} className="t6-section-block">
//                 {section.name && <div className="t6-section-title">{section.name}</div>}
//                 {section.description && <div className="t6-entry-content">{stripHtml(section.description)}</div>}
//               </div>
//             ))}

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateSix;