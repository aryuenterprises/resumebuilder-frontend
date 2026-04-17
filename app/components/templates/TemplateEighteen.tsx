// "use client";

// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { IoPersonOutline, IoMailOutline, IoCallOutline, IoLocationOutline, IoGlobeOutline } from "react-icons/io5";
// import { API_URL } from "@/app/config/api";
// import { MonthYearDisplay, formatMonthYear } from "@/app/utils";
// import { usePathname } from "next/navigation";

// interface AllData {
//   contact?: any;
//   educations?: any[];
//   experiences?: any[];
//   skills?: any[];
//   finalize?: any;
//   summary?: string;
// }

// interface ResumeProps {
//   alldata?: AllData;
// }

// // Define types for context data
// interface Language {
//   _id?: string;
//   id?: string;
//   name?: string;
//   level?: string | number;
// }

// interface Certification {
//   _id?: string;
//   id?: string;
//   name?: string;
// }

// interface Hobby {
//   _id?: string;
//   id?: string;
//   name?: string;
// }

// interface Award {
//   _id?: string;
//   id?: string;
//   name?: string;
// }

// interface Website {
//   _id?: string;
//   id?: string;
//   websiteUrl?: string;
//   socialMedia?: string;
// }

// interface Reference {
//   _id?: string;
//   id?: string;
//   name?: string;
// }

// interface CustomSection {
//   _id?: string;
//   id?: string;
//   name?: string;
//   description?: string;
// }

// interface FinalizeData {
//   languages?: Language[];
//   certificationsAndLicenses?: Certification[];
//   hobbiesAndInterests?: Hobby[];
//   awardsAndHonors?: Award[];
//   websitesAndSocialMedia?: Website[];
//   references?: Reference[];
//   customSection?: CustomSection[];
// }

// const TemplateEighteen: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const { croppedImage } = context?.contact || {};
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const contact = alldata?.contact || context?.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";
//   const linkedinUrl = contact?.linkedin;
//   const portfolioUrl = contact?.portfolio;

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
//     } else if (contact?.photo) {
//       setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
//     } else {
//       setPreviewUrl(null);
//     }

//     return () => { 
//       if (objectUrl) URL.revokeObjectURL(objectUrl); 
//     };
//   }, [croppedImage, contact?.photo]);

//   const isFinalizeData = (data: any): data is FinalizeData =>
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

//   const skillPct = (level: any): string => {
//     if (!level) return "0%";
//     const numLevel = typeof level === "string" ? parseFloat(level) : Number(level);
//     return `${(numLevel / 5) * 100}%`;
//   };
  
//   const stripHtml = (html: string): string => {
//     if (!html) return "";
//     return html.replace(/<[^>]*>/g, "");
//   };

//   /* ======================================================
//      CSS — MODERN COLORFUL DOUBLE COLUMN
//   ====================================================== */
//   const styles = `
//   .resume-t12  * {
//       margin: 0;
//       padding: 0;
//       box-sizing: border-box;
//     }

//   .resume-t12  body {
//       font-family: 'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
//       background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//       padding: 40px;
//     }

//     .resume-t12 {
//       max-width: 1100px;
//       margin: 0 auto;
//       background: #ffffff;
//       border-radius: 24px;
//       box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
//       overflow: hidden;
//       display: flex;
//       flex-wrap: wrap;
//     }

//     /* LEFT COLUMN - COLORFUL SIDEBAR */
//     .t12-left {
//       width: 33%;
//       background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//       color: white;
//       padding: 40px 30px;
//     }

//     /* RIGHT COLUMN */
//     .t12-right {
//       width: 67%;
//       background: white;
//       padding: 40px 35px;
//     }

//     /* PHOTO */
//     .t12-photo-wrapper {
//       text-align: center;
//       margin-bottom: 30px;
//     }

//     .t12-photo {
//       width: 160px;
//       height: 160px;
//       border-radius: 50%;
//       object-fit: cover;
//       border: 4px solid rgba(255, 255, 255, 0.3);
//       box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
//     }

//     .t12-photo-placeholder {
//       width: 160px;
//       height: 160px;
//       border-radius: 50%;
//       background: rgba(255, 255, 255, 0.2);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       margin: 0 auto;
//       border: 4px solid rgba(255, 255, 255, 0.3);
//     }

//     /* LEFT COLUMN TYPOGRAPHY */
//     .t12-name {
//       font-size: 28px;
//       font-weight: 800;
//       text-align: center;
//       margin-bottom: 8px;
//       letter-spacing: -0.5px;
//     }

//     .t12-jobtitle {
//       font-size: 14px;
//       text-align: center;
//       opacity: 0.9;
//       margin-bottom: 25px;
//       padding-bottom: 20px;
//       border-bottom: 2px solid rgba(255, 255, 255, 0.2);
//     }

//     .t12-section-title-left {
//       font-size: 16px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1.5px;
//       margin-bottom: 15px;
//       margin-top: 25px;
//       color: white;
//     }

//     .t12-contact-item {
//       display: flex;
//       align-items: center;
//       gap: 12px;
//       margin-bottom: 12px;
//       font-size: 12px;
//       opacity: 0.9;
//       word-break: break-word;
//     }

//     .t12-contact-icon {
//       font-size: 16px;
//       min-width: 24px;
//     }

//     .t12-link {
//       color: white;
//       text-decoration: none;
//       transition: opacity 0.2s;
//     }

//     .t12-link:hover {
//       opacity: 0.8;
//       text-decoration: underline;
//     }

//     /* SKILLS IN LEFT COLUMN */
//     .t12-skills-list {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-top: 10px;
//     }

//     .t12-skill-tag {
//       background: rgba(255, 255, 255, 0.2);
//       padding: 6px 14px;
//       border-radius: 20px;
//       font-size: 12px;
//       font-weight: 500;
//     }

//     .t12-skill-with-bar {
//       margin-bottom: 12px;
//     }

//     .t12-skill-name {
//       font-size: 12px;
//       font-weight: 500;
//       margin-bottom: 4px;
//     }

//     .t12-skill-bar-wrap {
//       height: 4px;
//       background: rgba(255, 255, 255, 0.2);
//       border-radius: 2px;
//       overflow: hidden;
//     }

//     .t12-skill-bar-fill {
//       height: 100%;
//       background: #ffd700;
//       border-radius: 2px;
//     }

//     /* RIGHT COLUMN STYLES */
//     .t12-section-title-right {
//       font-size: 18px;
//       font-weight: 700;
//       color: #2d3748;
//       margin-bottom: 15px;
//       padding-bottom: 8px;
//       border-bottom: 3px solid #667eea;
//       display: inline-block;
//     }

//     .t12-summary {
//       font-size: 14px;
//       line-height: 1.6;
//       color: #4a5568;
//       margin-bottom: 25px;
//     }

//     /* Experience Items */
//     .t12-entry {
//       margin-bottom: 25px;
//     }

//     .t12-entry-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 5px;
//     }

//     .t12-entry-title {
//       font-size: 16px;
//       font-weight: 700;
//       color: #2d3748;
//     }

//     .t12-entry-date {
//       font-size: 12px;
//       color: #667eea;
//       font-weight: 500;
//     }

//     .t12-entry-subtitle {
//       font-size: 13px;
//       color: #718096;
//       margin-bottom: 8px;
//     }

//     .t12-entry-content {
//       font-size: 13px;
//       line-height: 1.6;
//       color: #4a5568;
//     }

//     .t12-entry-content ul {
//       list-style-type: none;
//       padding-left: 0;
//     }

//     .t12-entry-content li {
//       position: relative;
//       padding-left: 20px;
//       margin-bottom: 6px;
//     }

//     .t12-entry-content li::before {
//       content: "▹";
//       position: absolute;
//       left: 0;
//       color: #667eea;
//     }

//     /* Education */
//     .t12-education-item {
//       margin-bottom: 20px;
//     }

//     .t12-education-school {
//       font-size: 15px;
//       font-weight: 700;
//       color: #2d3748;
//     }

//     .t12-education-degree {
//       font-size: 13px;
//       color: #718096;
//       margin-top: 2px;
//     }

//     .t12-education-date {
//       font-size: 11px;
//       color: #667eea;
//       margin-top: 3px;
//     }

//     /* Languages, Certifications etc - Tags */
//     .t12-tags-container {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-top: 10px;
//     }

//     .t12-tag {
//       background: #f7fafc;
//       padding: 6px 14px;
//       border-radius: 20px;
//       font-size: 12px;
//       color: #4a5568;
//       border: 1px solid #e2e8f0;
//     }

//     /* Custom Sections */
//     .t12-custom-section {
//       margin-bottom: 20px;
//     }

//     .t12-custom-section-title {
//       font-size: 14px;
//       font-weight: 700;
//       color: #2d3748;
//       margin-bottom: 8px;
//     }

//     .t12-custom-section-content {
//       font-size: 13px;
//       color: #4a5568;
//       line-height: 1.6;
//     }

//     /* Print Styles */
//     @media print {
//       @page {
//         size: A4;
//         margin: 0;
//       }

//       body {
//         background: white;
//         padding: 0;
//         margin: 0;
//       }

//       .resume-t12 {
//         max-width: 100%;
//         border-radius: 0;
//         box-shadow: none;
//       }

//       .t12-left {
//         background: #667eea;
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }

//       .t12-skill-bar-fill {
//         background: #ffd700;
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }
//     }

//     /* Responsive */
//     @media (max-width: 768px) {
//       body {
//         padding: 20px;
//       }

//       .resume-t12 {
//         flex-direction: column;
//       }

//       .t12-left,
//       .t12-right {
//         width: 100%;
//       }

//       .t12-left {
//         padding: 30px 25px;
//       }

//       .t12-right {
//         padding: 30px 25px;
//       }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION
//   ====================================================== */
//   const generateHTML = () => {
//     const addressStr = [contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ");
//     const photoHtml = previewUrl
//       ? `<img src="${previewUrl}" alt="Profile" class="t12-photo" />`
//       : `<div class="t12-photo-placeholder"><span style="color:white;font-size:12px;">No Photo</span></div>`;

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="resume-t12">

//   <!-- LEFT COLUMN -->
//   <div class="t12-left">
//     <div class="t12-photo-wrapper">
//       ${photoHtml}
//     </div>
//     <h1 class="t12-name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//     <div class="t12-jobtitle">${getJobTitle(contact?.jobTitle)}</div>

//     <!-- CONTACT INFO -->
//     <div class="t12-section-title-left">Contact</div>
//     ${addressStr ? `
//     <div class="t12-contact-item">
//       <div class="t12-contact-icon">📍</div>
//       <div>${addressStr}</div>
//     </div>` : ""}
//     ${contact?.phone ? `
//     <div class="t12-contact-item">
//       <div class="t12-contact-icon">📱</div>
//       <div>${contact.phone}</div>
//     </div>` : ""}
//     ${contact?.email ? `
//     <div class="t12-contact-item">
//       <div class="t12-contact-icon">✉️</div>
//       <div>${contact.email}</div>
//     </div>` : ""}
//     ${linkedinUrl ? `
//     <div class="t12-contact-item">
//       <div class="t12-contact-icon">🔗</div>
//       <div><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t12-link" target="_blank">LinkedIn</a></div>
//     </div>` : ""}
//     ${portfolioUrl ? `
//     <div class="t12-contact-item">
//       <div class="t12-contact-icon">🌐</div>
//       <div><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t12-link" target="_blank">Portfolio</a></div>
//     </div>` : ""}

//     <!-- SKILLS -->
//     ${skills.length > 0 ? `
//     <div class="t12-section-title-left">Skills</div>
//     <div class="t12-skills-list">
//       ${skills.map((s: any) => `<span class="t12-skill-tag">${s.skill || ""}</span>`).join("")}
//     </div>` : ""}

//     <!-- LANGUAGES -->
//     ${fin.languages.some((l: Language) => l.name?.trim()) ? `
//     <div class="t12-section-title-left">Languages</div>
//     ${fin.languages.filter((l: Language) => l.name?.trim()).map((l: Language) => `
//     <div class="t12-skill-with-bar">
//       <div class="t12-skill-name">${l.name}</div>
//       ${l.level ? `<div class="t12-skill-bar-wrap"><div class="t12-skill-bar-fill" style="width:${skillPct(l.level)}"></div></div>` : ""}
//     </div>`).join("")}` : ""}

//     <!-- CERTIFICATIONS -->
//     ${fin.certifications.some((c: Certification) => c.name?.replace(/<[^>]*>/g, "").trim()) ? `
//     <div class="t12-section-title-left">Certifications</div>
//     <div class="t12-tags-container">
//       ${fin.certifications.filter((c: Certification) => c.name?.replace(/<[^>]*>/g, "").trim()).map((c: Certification) => `<span class="t12-tag">${stripHtml(c.name || "")}</span>`).join("")}
//     </div>` : ""}

//     <!-- INTERESTS -->
//     ${fin.hobbies.some((h: Hobby) => h.name?.replace(/<[^>]*>/g, "").trim()) ? `
//     <div class="t12-section-title-left">Interests</div>
//     <div class="t12-tags-container">
//       ${fin.hobbies.filter((h: Hobby) => h.name?.replace(/<[^>]*>/g, "").trim()).map((h: Hobby) => `<span class="t12-tag">${stripHtml(h.name || "")}</span>`).join("")}
//     </div>` : ""}
//   </div>

//   <!-- RIGHT COLUMN -->
//   <div class="t12-right">
//     <!-- SUMMARY -->
//     ${summary ? `
//     <div>
//       <h2 class="t12-section-title-right">About Me</h2>
//       <div class="t12-summary">${stripHtml(summary)}</div>
//     </div>` : ""}

//     <!-- EXPERIENCE -->
//     ${experiences?.length > 0 ? `
//     <div style="margin-top: 25px;">
//       <h2 class="t12-section-title-right">Work Experience</h2>
//       ${experiences.map((exp: any) => `
//       <div class="t12-entry">
//         <div class="t12-entry-header">
//           <span class="t12-entry-title">${exp.jobTitle || ""}</span>
//           <span class="t12-entry-date">${formatMonthYear(exp.startDate, true)} — ${exp.endDate ? formatMonthYear(exp.endDate, true) : "Present"}</span>
//         </div>
//         <div class="t12-entry-subtitle">${exp.employer || ""}${exp.location ? ` • ${exp.location}` : ""}</div>
//         ${exp.text ? `<div class="t12-entry-content">${stripHtml(exp.text)}</div>` : ""}
//       </div>`).join("")}
//     </div>` : ""}

//     <!-- EDUCATION -->
//     ${educations?.length > 0 ? `
//     <div style="margin-top: 25px;">
//       <h2 class="t12-section-title-right">Education</h2>
//       ${educations.map((edu: any) => `
//       <div class="t12-education-item">
//         <div class="t12-education-school">${edu.schoolname || ""}</div>
//         ${edu.degree ? `<div class="t12-education-degree">${edu.degree}</div>` : ""}
//         ${edu.location ? `<div class="t12-education-degree">${edu.location}</div>` : ""}
//         ${(edu.startDate || edu.endDate) ? `<div class="t12-education-date">${edu.startDate || ""}${edu.startDate && edu.endDate ? " — " : ""}${edu.endDate || ""}</div>` : ""}
//         ${edu.text ? `<div class="t12-entry-content" style="margin-top:6px">${stripHtml(edu.text)}</div>` : ""}
//       </div>`).join("")}
//     </div>` : ""}

//     <!-- AWARDS -->
//     ${fin.awards.some((a: Award) => a.name?.replace(/<[^>]*>/g, "").trim()) ? `
//     <div style="margin-top: 25px;">
//       <h2 class="t12-section-title-right">Awards & Honors</h2>
//       <div class="t12-tags-container">
//         ${fin.awards.filter((a: Award) => a.name?.replace(/<[^>]*>/g, "").trim()).map((a: Award) => `<span class="t12-tag">🏆 ${stripHtml(a.name || "")}</span>`).join("")}
//       </div>
//     </div>` : ""}

//     <!-- WEBSITES -->
//     ${fin.websites.some((w: Website) => w.websiteUrl?.trim() || w.socialMedia?.trim()) ? `
//     <div style="margin-top: 25px;">
//       <h2 class="t12-section-title-right">Online Presence</h2>
//       ${fin.websites.filter((w: Website) => w.websiteUrl?.trim() || w.socialMedia?.trim()).map((w: Website) => `
//       <div class="t12-entry-content" style="margin-bottom:8px">
//         ${w.websiteUrl ? `<div>🌐 <a href="${w.websiteUrl.startsWith("http") ? w.websiteUrl : `https://${w.websiteUrl}`}" target="_blank" style="color:#667eea">${w.websiteUrl}</a></div>` : ""}
//         ${w.socialMedia ? `<div>📱 <a href="${w.socialMedia.startsWith("http") ? w.socialMedia : `https://${w.socialMedia}`}" target="_blank" style="color:#667eea">${w.socialMedia}</a></div>` : ""}
//       </div>`).join("")}
//     </div>` : ""}

//     <!-- REFERENCES -->
//     ${fin.references.some((r: Reference) => r.name?.replace(/<[^>]*>/g, "").trim()) ? `
//     <div style="margin-top: 25px;">
//       <h2 class="t12-section-title-right">References</h2>
//       <div class="t12-tags-container">
//         ${fin.references.filter((r: Reference) => r.name?.replace(/<[^>]*>/g, "").trim()).map((r: Reference) => `<span class="t12-tag">${stripHtml(r.name || "")}</span>`).join("")}
//       </div>
//     </div>` : ""}

//     <!-- CUSTOM SECTIONS -->
//     ${fin.customSection.filter((s: CustomSection) => s?.name?.trim() || s?.description?.trim()).map((s: CustomSection) => `
//     <div style="margin-top: 25px;">
//       ${s.name ? `<h2 class="t12-section-title-right">${s.name}</h2>` : ""}
//       ${s.description ? `<div class="t12-custom-section-content">${stripHtml(s.description)}</div>` : ""}
//     </div>`).join("")}
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

//   /* ======================================================
//      JSX PREVIEW
//   ====================================================== */
//   return (
//     <>
//       {lastSegment === "download-resume" && (
//         <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
//           <button
//             onClick={handleDownload}
//             style={{
//               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//               color: "white",
//               padding: "12px 32px",
//               fontSize: "14px",
//               fontWeight: "600",
//               border: "none",
//               borderRadius: "40px",
//               cursor: "pointer",
//               fontFamily: "inherit",
//               boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
//             }}
//           >
//             📄 Download Resume
//           </button>
//         </div>
//       )}

//       <div className="resume-t12" style={{ margin: "0 auto" }}>
//         <style>{styles}</style>

//         {/* LEFT COLUMN */}
//         <div className="t12-left">
//           <div className="t12-photo-wrapper">
//             {previewUrl
//               ? <img src={previewUrl} alt="Profile" className="t12-photo" />
//               : <div className="t12-photo-placeholder"><IoPersonOutline style={{ width: 60, height: 60, color: "white" }} /></div>
//             }
//           </div>
//           <h1 className="t12-name">{contact?.firstName || ""} {contact?.lastName || ""}</h1>
//           <div className="t12-jobtitle">{getJobTitle(contact?.jobTitle)}</div>

//           {/* CONTACT INFO */}
//           <div className="t12-section-title-left">Contact</div>
//           {[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).length > 0 && (
//             <div className="t12-contact-item">
//               <div className="t12-contact-icon"><IoLocationOutline /></div>
//               <div>{[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ")}</div>
//             </div>
//           )}
//           {contact?.phone && (
//             <div className="t12-contact-item">
//               <div className="t12-contact-icon"><IoCallOutline /></div>
//               <div>{contact.phone}</div>
//             </div>
//           )}
//           {contact?.email && (
//             <div className="t12-contact-item">
//               <div className="t12-contact-icon"><IoMailOutline /></div>
//               <div>{contact.email}</div>
//             </div>
//           )}
//           {linkedinUrl && (
//             <div className="t12-contact-item">
//               <div className="t12-contact-icon"><IoGlobeOutline /></div>
//               <div><a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer" className="t12-link">LinkedIn</a></div>
//             </div>
//           )}
//           {portfolioUrl && (
//             <div className="t12-contact-item">
//               <div className="t12-contact-icon"><IoGlobeOutline /></div>
//               <div><a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer" className="t12-link">Portfolio</a></div>
//             </div>
//           )}

//           {/* SKILLS */}
//           {skills.length > 0 && (
//             <>
//               <div className="t12-section-title-left">Skills</div>
//               <div className="t12-skills-list">
//                 {skills.map((skill: any, idx: number) => (
//                   <span key={skill.id || idx} className="t12-skill-tag">{skill.skill}</span>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* LANGUAGES */}
//           {fin.languages.some((l: Language) => l.name?.trim()) && (
//             <>
//               <div className="t12-section-title-left">Languages</div>
//               {fin.languages.filter((l: Language) => l.name?.trim()).map((lang: Language, idx: number) => (
//                 <div key={lang._id || lang.id || idx} className="t12-skill-with-bar">
//                   <div className="t12-skill-name">{lang.name}</div>
//                   {lang.level && (
//                     <div className="t12-skill-bar-wrap">
//                       <div className="t12-skill-bar-fill" style={{ width: skillPct(lang.level) }} />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </>
//           )}

//           {/* CERTIFICATIONS */}
//           {fin.certifications.some((c: Certification) => c.name?.replace(/<[^>]*>/g, "").trim()) && (
//             <>
//               <div className="t12-section-title-left">Certifications</div>
//               <div className="t12-tags-container">
//                 {fin.certifications.filter((c: Certification) => c.name?.replace(/<[^>]*>/g, "").trim()).map((item: Certification, idx: number) => (
//                   <span key={item.id || idx} className="t12-tag">{stripHtml(item.name || "")}</span>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* INTERESTS */}
//           {fin.hobbies.some((h: Hobby) => h.name?.replace(/<[^>]*>/g, "").trim()) && (
//             <>
//               <div className="t12-section-title-left">Interests</div>
//               <div className="t12-tags-container">
//                 {fin.hobbies.filter((h: Hobby) => h.name?.replace(/<[^>]*>/g, "").trim()).map((item: Hobby, idx: number) => (
//                   <span key={item.id || idx} className="t12-tag">{stripHtml(item.name || "")}</span>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="t12-right">
//           {/* SUMMARY */}
//           {summary && (
//             <div>
//               <h2 className="t12-section-title-right">About Me</h2>
//               <div className="t12-summary">{stripHtml(summary)}</div>
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences?.length > 0 && (
//             <div style={{ marginTop: "25px" }}>
//               <h2 className="t12-section-title-right">Work Experience</h2>
//               {experiences.map((exp: any, idx: number) => (
//                 <div key={exp.id || idx} className="t12-entry">
//                   <div className="t12-entry-header">
//                     <span className="t12-entry-title">{exp.jobTitle || ""}</span>
//                     <span className="t12-entry-date">
//                       <MonthYearDisplay value={exp.startDate} shortYear /> —{" "}
//                       {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear /> : "Present"}
//                     </span>
//                   </div>
//                   <div className="t12-entry-subtitle">
//                     {exp.employer || ""}
//                     {exp.location && ` • ${exp.location}`}
//                   </div>
//                   {exp.text && <div className="t12-entry-content">{stripHtml(exp.text)}</div>}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* EDUCATION */}
//           {educations?.length > 0 && (
//             <div style={{ marginTop: "25px" }}>
//               <h2 className="t12-section-title-right">Education</h2>
//               {educations.map((edu: any, idx: number) => (
//                 <div key={edu.id || idx} className="t12-education-item">
//                   <div className="t12-education-school">{edu.schoolname || ""}</div>
//                   {edu.degree && <div className="t12-education-degree">{edu.degree}</div>}
//                   {edu.location && <div className="t12-education-degree">{edu.location}</div>}
//                   {(edu.startDate || edu.endDate) && (
//                     <div className="t12-education-date">
//                       {edu.startDate || ""}
//                       {edu.startDate && edu.endDate && " — "}
//                       {edu.endDate || ""}
//                     </div>
//                   )}
//                   {edu.text && <div className="t12-entry-content" style={{ marginTop: "6px" }}>{stripHtml(edu.text)}</div>}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* AWARDS */}
//           {fin.awards.some((a: Award) => a.name?.replace(/<[^>]*>/g, "").trim()) && (
//             <div style={{ marginTop: "25px" }}>
//               <h2 className="t12-section-title-right">Awards & Honors</h2>
//               <div className="t12-tags-container">
//                 {fin.awards.filter((a: Award) => a.name?.replace(/<[^>]*>/g, "").trim()).map((item: Award, idx: number) => (
//                   <span key={item.id || idx} className="t12-tag">🏆 {stripHtml(item.name || "")}</span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* WEBSITES */}
//           {fin.websites.some((w: Website) => w.websiteUrl?.trim() || w.socialMedia?.trim()) && (
//             <div style={{ marginTop: "25px" }}>
//               <h2 className="t12-section-title-right">Online Presence</h2>
//               {fin.websites.filter((w: Website) => w.websiteUrl?.trim() || w.socialMedia?.trim()).map((item: Website, idx: number) => (
//                 <div key={item.id || idx} className="t12-entry-content" style={{ marginBottom: "8px" }}>
//                   {item.websiteUrl && (
//                     <div>🌐 <a href={item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`} target="_blank" rel="noreferrer" style={{ color: "#667eea" }}>{item.websiteUrl}</a></div>
//                   )}
//                   {item.socialMedia && (
//                     <div>📱 <a href={item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`} target="_blank" rel="noreferrer" style={{ color: "#667eea" }}>{item.socialMedia}</a></div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* REFERENCES */}
//           {fin.references.some((r: Reference) => r.name?.replace(/<[^>]*>/g, "").trim()) && (
//             <div style={{ marginTop: "25px" }}>
//               <h2 className="t12-section-title-right">References</h2>
//               <div className="t12-tags-container">
//                 {fin.references.filter((r: Reference) => r.name?.replace(/<[^>]*>/g, "").trim()).map((item: Reference, idx: number) => (
//                   <span key={item.id || idx} className="t12-tag">{stripHtml(item.name || "")}</span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* CUSTOM SECTIONS */}
//           {fin.customSection.filter((s: CustomSection) => s?.name?.trim() || s?.description?.trim()).map((section: CustomSection, idx: number) => (
//             <div key={section.id || idx} style={{ marginTop: "25px" }}>
//               {section.name && <h2 className="t12-section-title-right">{section.name}</h2>}
//               {section.description && <div className="t12-custom-section-content">{stripHtml(section.description)}</div>}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateEighteen;