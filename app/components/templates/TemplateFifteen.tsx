// // // ─── Creative Colorful Resume Template - Graphic Designer Style ───────────
// // "use client";
// // import React, { useContext } from "react";
// // import axios from "axios";
// // import { CreateContext } from "@/app/context/CreateContext";
// // import { API_URL } from "@/app/config/api";
// // import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// // import { usePathname } from "next/navigation";

// // const TemplateFifteen: React.FC = () => {
// //   const context = useContext(CreateContext);

// //   const pathname = usePathname();
// //   const lastSegment = pathname.split("/").pop();

// //   const contact = context.contact || {};
// //   const educations = context?.education || [];
// //   const experiences = context?.experiences || [];
// //   const skills = context?.skills || [];
// //   const finalize = context?.finalize || {};
// //   const summary = context?.summary || "";

// //   const addressParts = [
// //     contact?.address,
// //     contact?.city,
// //     contact?.postcode,
// //     contact?.country,
// //   ].filter(Boolean);

// //   const linkedinUrl = contact?.linkedin;
// //   const portfolioUrl = contact?.portfolio;

// //   // Creative color palette
// //   const colors = {
// //     primary: "#6366F1", // Indigo
// //     secondary: "#8B5CF6", // Purple
// //     accent: "#EC4899", // Pink
// //     dark: "#1F2937",
// //     light: "#F9FAFB",
// //     gray: "#6B7280",
// //     white: "#FFFFFF",
// //     border: "#E5E7EB",
// //   };

// //   /* ======================================================
// //      CSS — CREATIVE COLORFUL RESUME
// //   ====================================================== */
// //   const styles = `

// //     body {
// //       font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
// //       background: linear-gradient(135deg, #f5f7fa 0%, #e9eef5 100%);
// //       line-height: 1.5;
// //       color: #1F2937;
// //       // padding: 40px 20px;
// //     }

// //     .resume-container {
// //       max-width: 900px;
// //       margin: 0 auto;
// //       background: white;
// //       border-radius: 24px;
// //       box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
// //       overflow: hidden;
// //       transition: transform 0.3s ease;
// //     }

// //     /* Header Section - Gradient Background */
// //     .resume-header {
// //       padding: 50px 50px 40px 50px;
// //       background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
// //       color: white;
// //       position: relative;
// //     }

// //     .resume-header::after {
// //       content: '';
// //       position: absolute;
// //       bottom: 0;
// //       left: 0;
// //       right: 0;
// //       height: 4px;
// //       background: linear-gradient(90deg, ${colors.accent}, ${colors.primary}, ${colors.secondary});
// //     }

// //     .name {
// //       font-size: 48px;
// //       font-weight: 800;
// //       letter-spacing: -0.02em;
// //       margin-bottom: 12px;
// //       color: white;
// //       line-height: 1.2;
// //     }

// //     .job-title {
// //       font-size: 18px;
// //       font-weight: 500;
// //       color: rgba(255, 255, 255, 0.9);
// //       letter-spacing: 0.5px;
// //       margin-bottom: 25px;
// //       padding-bottom: 20px;
// //       border-bottom: 2px solid rgba(255, 255, 255, 0.2);
// //     }

// //     .contact-info {
// //       display: flex;
// //       flex-wrap: wrap;
// //       gap: 30px;
// //       margin-top: 15px;
// //     }

// //     .contact-item {
// //       display: flex;
// //       align-items: center;
// //       gap: 10px;
// //       font-size: 13px;
// //       color: rgba(255, 255, 255, 0.9);
// //     }

// //     .contact-icon {
// //       font-size: 16px;
// //     }

// //     .address {
// //       font-size: 13px;
// //       color: rgba(255, 255, 255, 0.9);
// //       margin-top: 12px;
// //     }

// //     .links {
// //       margin-top: 15px;
// //       display: flex;
// //       flex-wrap: wrap;
// //       gap: 20px;
// //     }

// //     .link-item {
// //       color: rgba(255, 255, 255, 0.9);
// //       text-decoration: none;
// //       font-size: 13px;
// //       display: inline-flex;
// //       align-items: center;
// //       gap: 6px;
// //       transition: all 0.2s;
// //     }

// //     .link-item:hover {
// //       color: white;
// //       transform: translateX(3px);
// //     }

// //     /* Main Content */
// //     .resume-main {
// //       padding: 45px 50px 50px 50px;
// //     }

// //     /* Section Styles */
// //     .section {
// //       margin-bottom: 35px;
// //     }

// //     .section:last-child {
// //       margin-bottom: 0;
// //     }

// //     .section-title {
// //       font-size: 20px;
// //       font-weight: 700;
// //       color: ${colors.dark};
// //       margin-bottom: 20px;
// //       padding-bottom: 8px;
// //       border-bottom: 3px solid ${colors.primary};
// //       display: inline-block;
// //       letter-spacing: -0.3px;
// //     }

// //     /* Summary */
// //     .summary-text {
// //       font-size: 14px;
// //       line-height: 1.7;
// //       color: ${colors.gray};
// //       font-weight: 400;
// //     }

// //     /* Experience Items */
// //     .experience-item {
// //       margin-bottom: 30px;
// //       position: relative;
// //       padding-left: 20px;
// //       border-left: 3px solid ${colors.primary};
// //     }

// //     .experience-item:last-child {
// //       margin-bottom: 0;
// //     }

// //     .experience-header {
// //       margin-bottom: 10px;
// //     }

// //     .experience-title-row {
// //       display: flex;
// //       justify-content: space-between;
// //       align-items: baseline;
// //       flex-wrap: wrap;
// //       gap: 10px;
// //       margin-bottom: 6px;
// //     }

// //     .experience-title {
// //       font-size: 18px;
// //       font-weight: 700;
// //       color: ${colors.dark};
// //     }

// //     .experience-date {
// //       font-size: 12px;
// //       font-weight: 500;
// //       color: ${colors.primary};
// //       background: rgba(99, 102, 241, 0.1);
// //       padding: 3px 10px;
// //       border-radius: 20px;
// //     }

// //     .experience-company {
// //       font-size: 14px;
// //       font-weight: 500;
// //       color: ${colors.secondary};
// //       margin-top: 4px;
// //     }

// //     .experience-location {
// //       font-size: 12px;
// //       font-weight: 400;
// //       color: ${colors.gray};
// //       margin-top: 3px;
// //     }

// //     .experience-description {
// //       margin-top: 12px;
// //     }

// //     /* Bullet points */
// //     .experience-description ul,
// //     .education-description ul {
// //       list-style-type: none;
// //       padding-left: 0;
// //     }

// //     .experience-description li,
// //     .education-description li {
// //       position: relative;
// //       padding-left: 24px;
// //       margin-bottom: 8px;
// //       font-size: 14px;
// //       color: ${colors.gray};
// //       line-height: 1.6;
// //       font-weight: 400;
// //     }

// //     .experience-description li::before,
// //     .education-description li::before {
// //       content: "✦";
// //       position: absolute;
// //       left: 4px;
// //       color: ${colors.accent};
// //       font-size: 12px;
// //       font-weight: bold;
// //     }

// //     /* Education Items */
// //     .education-item {
// //       margin-bottom: 25px;
// //       position: relative;
// //       padding-left: 20px;
// //       border-left: 3px solid ${colors.secondary};
// //     }

// //     .education-item:last-child {
// //       margin-bottom: 0;
// //     }

// //     .education-header {
// //       margin-bottom: 8px;
// //     }

// //     .education-title-row {
// //       display: flex;
// //       justify-content: space-between;
// //       align-items: baseline;
// //       flex-wrap: wrap;
// //       gap: 10px;
// //       margin-bottom: 6px;
// //     }

// //     .education-school {
// //       font-size: 17px;
// //       font-weight: 700;
// //       color: ${colors.dark};
// //     }

// //     .education-date {
// //       font-size: 12px;
// //       font-weight: 500;
// //       color: ${colors.secondary};
// //       background: rgba(139, 92, 246, 0.1);
// //       padding: 3px 10px;
// //       border-radius: 20px;
// //     }

// //     .education-degree {
// //       font-size: 14px;
// //       font-weight: 500;
// //       color: ${colors.gray};
// //       margin-top: 4px;
// //     }

// //     .education-description {
// //       margin-top: 10px;
// //     }

// //     /* Skills - Colorful Tags */
// //     .skills-container {
// //       display: flex;
// //       flex-wrap: wrap;
// //       gap: 12px;
// //       margin-top: 10px;
// //     }

// //     .skill-item {
// //       font-size: 13px;
// //       font-weight: 600;
// //       color: ${colors.primary};
// //       background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
// //       padding: 8px 20px;
// //       border-radius: 30px;
// //       letter-spacing: 0.3px;
// //       transition: all 0.2s;
// //     }

// //     .skill-item:hover {
// //       transform: translateY(-2px);
// //       background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
// //     }

// //     /* Additional content - Colorful Tags */
// //     .additional-container {
// //       margin-top: 10px;
// //       display: flex;
// //       flex-wrap: wrap;
// //       gap: 12px;
// //     }

// //     .additional-item {
// //       font-size: 13px;
// //       font-weight: 500;
// //       color: ${colors.accent};
// //       background: rgba(236, 72, 153, 0.1);
// //       padding: 8px 18px;
// //       border-radius: 30px;
// //       transition: all 0.2s;
// //     }

// //     .additional-item:hover {
// //       transform: translateY(-2px);
// //       background: rgba(236, 72, 153, 0.2);
// //     }

// //     /* Custom Sections */
// //     .custom-section {
// //       margin-bottom: 22px;
// //       position: relative;
// //       padding-left: 20px;
// //       border-left: 3px solid ${colors.accent};
// //     }

// //     .custom-section:last-child {
// //       margin-bottom: 0;
// //     }

// //     .custom-section-title {
// //       font-size: 16px;
// //       font-weight: 700;
// //       color: ${colors.dark};
// //       margin-bottom: 8px;
// //     }

// //     .custom-section-content {
// //       font-size: 14px;
// //       color: ${colors.gray};
// //       line-height: 1.6;
// //       font-weight: 400;
// //     }

// //     /* Print Styles */
// //     @media print {
// //       @page {
// //         size: A4;
// //         margin: 0;
// //       }

// //     @page :first {
// //       margin-top: 0;
// //     }

// //       body {
// //         background: white;
// //         padding: 0;
// //         margin: 0;
// //       }

// //       .resume-container {
// //         max-width: 100%;
// //         margin: 0;
// //         border-radius: 0;
// //         box-shadow: none;
// //       }

// //       .resume-header {
// //         background: ${colors.primary};
// //         -webkit-print-color-adjust: exact;
// //         print-color-adjust: exact;
// //         padding: 40px 40px 30px 40px !important;
// //       }

// //       .resume-main {
// //         padding: 35px 40px 40px 40px !important;
// //       }

// //       .skill-item {
// //         background: rgba(99, 102, 241, 0.1);
// //         -webkit-print-color-adjust: exact;
// //         print-color-adjust: exact;
// //       }

// //       .additional-item {
// //         background: rgba(236, 72, 153, 0.1);
// //         -webkit-print-color-adjust: exact;
// //         print-color-adjust: exact;
// //       }

// //     }

// //     /* Responsive */
// //     @media (max-width: 768px) {
// //       body {
// //         padding: 20px;
// //       }

// //       .resume-header {
// //         padding: 35px 30px 25px 30px !important;
// //       }

// //       .resume-main {
// //         padding: 30px 30px 35px 30px !important;
// //       }

// //       .name {
// //         font-size: 36px;
// //       }

// //       .job-title {
// //         font-size: 16px;
// //       }

// //       .contact-info {
// //         flex-direction: column;
// //         gap: 10px;
// //       }

// //       .section-title {
// //         font-size: 18px;
// //       }

// //       .experience-title-row {
// //         flex-direction: column;
// //         gap: 6px;
// //       }

// //       .education-title-row {
// //         flex-direction: column;
// //         gap: 6px;
// //       }
// //     }
// //   `;

// //   const stripHtml = (html: string) => {
// //     return html?.replace(/<\/?[^>]+(>|$)/g, "") || "";
// //   };

// //   const renderDescription = (text: string) => {
// //     if (!text) return "";

// //     if (text.includes("<") && text.includes(">")) {
// //       return `<div class="experience-description">${text}</div>`;
// //     }

// //     const lines = text.split("\n").filter((line) => line.trim() !== "");
// //     if (lines.some((line) => line.trim().startsWith("-") || line.trim().startsWith("•"))) {
// //       return `
// //         <div class="experience-description">
// //           <ul>
// //             ${lines
// //               .map((line) => {
// //                 const trimmed = line.trim();
// //                 if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
// //                   return `<li>${trimmed.substring(1).trim()}</li>`;
// //                 } else if (trimmed) {
// //                   return `<li>${trimmed}</li>`;
// //                 }
// //                 return "";
// //               })
// //               .join("")}
// //           </ul>
// //         </div>`;
// //     } else {
// //       return `<div class="experience-description" style="white-space: pre-wrap;">${stripHtml(text)}</div>`;
// //     }
// //   };

// //   const generateHTML = () => {
// //     return `
// //       <!DOCTYPE html>
// //       <html>
// //       <head>
// //         <meta charset="UTF-8"/>
// //         <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
// //         <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
// //         <style>${styles}</style>
// //       </head>
// //       <body>
// //         <div class="resume-container">
// //           <!-- HEADER - GRADIENT -->
// //           <div class="resume-header">
// //             <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
// //             <div class="job-title">${
// //               contact?.jobTitle
// //                 ? typeof contact.jobTitle === "string"
// //                   ? contact.jobTitle
// //                   : (contact.jobTitle as any)?.name || ""
// //                 : ""
// //             }</div>
// //             <div class="contact-info">
// //               ${contact?.email ? `
// //                 <div class="contact-item">
// //                   <span class="contact-icon">📧</span>
// //                   <span>${contact.email}</span>
// //                 </div>
// //               ` : ""}
// //               ${contact?.phone ? `
// //                 <div class="contact-item">
// //                   <span class="contact-icon">📱</span>
// //                   <span>${contact.phone}</span>
// //                 </div>
// //               ` : ""}
// //             </div>
// //             ${addressParts.length ? `<div class="address">📍 ${addressParts.join(" • ")}</div>` : ""}
// //             <div class="links">
// //               ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">🔗 LinkedIn</a>` : ""}
// //               ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">🎨 Portfolio</a>` : ""}
// //             </div>
// //           </div>

// //           <!-- MAIN CONTENT -->
// //           <div class="resume-main">
// //             <!-- SUMMARY -->
// //             ${summary ? `
// //               <div class="section">
// //                 <h2 class="section-title">About Me</h2>
// //                 <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
// //               </div>
// //             ` : ""}

// //             <!-- EXPERIENCE -->
// //             ${experiences.length > 0 ? `
// //               <div class="section">
// //                 <h2 class="section-title">Work Experience</h2>
// //                 ${experiences.map((exp) => {
// //                   const startFormatted = formatMonthYear(exp.startDate, true);
// //                   const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
// //                   return `
// //                     <div class="experience-item">
// //                       <div class="experience-header">
// //                         <div class="experience-title-row">
// //                           <span class="experience-title">${exp.jobTitle || ""}</span>
// //                           <span class="experience-date">${startFormatted} — ${endFormatted}</span>
// //                         </div>
// //                         <div class="experience-company">${exp.employer || ""}${exp.location ? ` • ${exp.location}` : ""}</div>
// //                       </div>
// //                       ${exp.text ? renderDescription(exp.text) : ""}
// //                     </div>
// //                   `;
// //                 }).join("")}
// //               </div>
// //             ` : ""}

// //             <!-- EDUCATION -->
// //             ${educations.length > 0 ? `
// //               <div class="section">
// //                 <h2 class="section-title">Education</h2>
// //                 ${educations.map((edu) => {
// //                   const dateStr = edu.startDate || edu.endDate
// //                     ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " — " : ""}${edu.endDate || ""}`
// //                     : "";
// //                   return `
// //                     <div class="education-item">
// //                       <div class="education-header">
// //                         <div class="education-title-row">
// //                           <span class="education-school">${edu.schoolname || ""}</span>
// //                           ${dateStr ? `<span class="education-date">${dateStr}</span>` : ""}
// //                         </div>
// //                         ${edu.degree ? `<div class="education-degree">${edu.degree}</div>` : ""}
// //                       </div>
// //                       ${edu.text ? `<div class="education-description">${renderDescription(edu.text)}</div>` : ""}
// //                     </div>
// //                   `;
// //                 }).join("")}
// //               </div>
// //             ` : ""}

// //             <!-- SKILLS - COLORFUL TAGS -->
// //             ${skills.length > 0 ? `
// //               <div class="section">
// //                 <h2 class="section-title">Skills & Expertise</h2>
// //                 <div class="skills-container">
// //                   ${skills.map((s) => `
// //                     <span class="skill-item">${s.skill || ""}</span>
// //                   `).join("")}
// //                 </div>
// //               </div>
// //             ` : ""}

// //             <!-- LANGUAGES -->
// //             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some(l => l.name?.trim()) ? `
// //               <div class="section">
// //                 <h2 class="section-title">Languages</h2>
// //                 <div class="skills-container">
// //                   ${finalize.languages.filter(l => l.name?.trim()).map(l => `
// //                     <span class="skill-item">${l.name}${l.level ? ` • ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</span>
// //                   `).join("")}
// //                 </div>
// //               </div>
// //             ` : ""}

// //             <!-- CERTIFICATIONS -->
// //             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some(c => c.name?.replace(/<[^>]*>/g, "").trim()) ? `
// //               <div class="section">
// //                 <h2 class="section-title">Certifications</h2>
// //                 <div class="additional-container">
// //                   ${finalize.certificationsAndLicenses.filter(c => c.name?.replace(/<[^>]*>/g, "").trim()).map(c => `
// //                     <span class="additional-item"> ${c.name.replace(/<[^>]*>/g, "")}</span>
// //                   `).join("")}
// //                 </div>
// //               </div>
// //             ` : ""}

// //             <!-- AWARDS -->
// //             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some(a => a.name?.replace(/<[^>]*>/g, "").trim()) ? `
// //               <div class="section">
// //                 <h2 class="section-title">Awards</h2>
// //                 <div class="additional-container">
// //                   ${finalize.awardsAndHonors.filter(a => a.name?.replace(/<[^>]*>/g, "").trim()).map(a => `
// //                     <span class="additional-item">${a.name.replace(/<[^>]*>/g, "")}</span>
// //                   `).join("")}
// //                 </div>
// //               </div>
// //             ` : ""}

// //             <!-- INTERESTS -->
// //             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some(h => h.name?.replace(/<[^>]*>/g, "").trim()) ? `
// //               <div class="section">
// //                 <h2 class="section-title">Interests</h2>
// //                 <div class="additional-container">
// //                   ${finalize.hobbiesAndInterests.filter(h => h.name?.replace(/<[^>]*>/g, "").trim()).map(h => `
// //                     <span class="additional-item"> ${h.name.replace(/<[^>]*>/g, "")}</span>
// //                   `).join("")}
// //                 </div>
// //               </div>
// //             ` : ""}

// //             <!-- CUSTOM SECTIONS -->
// //             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some(s => s?.name?.trim() || s?.description?.trim()) ? `
// //               <div class="section">
// //                 ${finalize.customSection.filter(s => s?.name?.trim() || s?.description?.trim()).map(s => `
// //                   <div class="custom-section">
// //                     ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
// //                     ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
// //                   </div>
// //                 `).join("")}
// //               </div>
// //             ` : ""}
// //           </div>
// //         </div>
// //       </body>
// //       </html>
// //     `;
// //   };

// //   const handleDownload = async () => {
// //     try {
// //       const html = generateHTML();
// //       const res = await axios.post(
// //         `${API_URL}/api/candidates/generate-pdf`,
// //         { html },
// //         { responseType: "blob" }
// //       );
// //       const url = URL.createObjectURL(res.data);
// //       const a = document.createElement("a");
// //       a.href = url;
// //       a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
// //       document.body.appendChild(a);
// //       a.click();
// //       document.body.removeChild(a);
// //       URL.revokeObjectURL(url);
// //     } catch (error) {
// //       console.error("Error generating PDF:", error);
// //       alert("Failed to generate PDF. Please try again.");
// //     }
// //   };

// //   return (
// //     <div style={{ textAlign: "left", marginTop: 0 }}>
// //       {lastSegment === "download-resume" && (
// //         <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
// //           <button
// //             onClick={handleDownload}
// //             style={{
// //               background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
// //               color: "#ffffff",
// //               padding: "14px 36px",
// //               fontSize: "14px",
// //               fontWeight: "600",
// //               border: "none",
// //               borderRadius: "40px",
// //               cursor: "pointer",
// //               fontFamily: "inherit",
// //               letterSpacing: "0.5px",
// //               boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
// //               transition: "all 0.3s ease",
// //             }}
// //             onMouseEnter={(e) => {
// //               e.currentTarget.style.transform = "translateY(-2px)";
// //               e.currentTarget.style.boxShadow = "0 6px 20px rgba(99, 102, 241, 0.4)";
// //             }}
// //             onMouseLeave={(e) => {
// //               e.currentTarget.style.transform = "translateY(0)";
// //               e.currentTarget.style.boxShadow = "0 4px 15px rgba(99, 102, 241, 0.3)";
// //             }}
// //           >
// //             📄 Download Resume
// //           </button>
// //         </div>
// //       )}

// //       {/* Resume Preview */}
// //       <div className="resume-container" style={{ margin: "0 auto" }}>
// //         <style>{styles}</style>

// //         {/* HEADER - GRADIENT */}
// //         <div className="resume-header">
// //           <h1 className="name">
// //             {contact?.firstName} {contact?.lastName}
// //           </h1>
// //           <div className="job-title">
// //             {contact?.jobTitle
// //               ? typeof contact.jobTitle === "string"
// //                 ? contact.jobTitle
// //                 : (contact.jobTitle as any)?.name || ""
// //               : ""}
// //           </div>
// //           <div className="contact-info">
// //             {contact?.email && (
// //               <div className="contact-item">
// //                 <span className="contact-icon">📧</span>
// //                 <span>{contact.email}</span>
// //               </div>
// //             )}
// //             {contact?.phone && (
// //               <div className="contact-item">
// //                 <span className="contact-icon">📱</span>
// //                 <span>{contact.phone}</span>
// //               </div>
// //             )}
// //           </div>
// //           {addressParts.length > 0 && (
// //             <div className="address">📍 {addressParts.join(" • ")}</div>
// //           )}
// //           <div className="links">
// //             {linkedinUrl && (
// //               <a
// //                 href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
// //                 className="link-item"
// //                 target="_blank"
// //                 rel="noreferrer"
// //               >
// //                 🔗 LinkedIn
// //               </a>
// //             )}
// //             {portfolioUrl && (
// //               <a
// //                 href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
// //                 className="link-item"
// //                 target="_blank"
// //                 rel="noreferrer"
// //               >
// //                 🎨 Portfolio
// //               </a>
// //             )}
// //           </div>
// //         </div>

// //         {/* MAIN CONTENT */}
// //         <div className="resume-main">
// //           {/* SUMMARY */}
// //           {summary && (
// //             <div className="section">
// //               <h2 className="section-title">About Me</h2>
// //               <div
// //                 className="summary-text"
// //                 dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
// //               />
// //             </div>
// //           )}

// //           {/* EXPERIENCE */}
// //           {experiences.length > 0 && (
// //             <div className="section">
// //               <h2 className="section-title">Work Experience</h2>
// //               {experiences.map((exp, i) => (
// //                 <div key={i} className="experience-item">
// //                   <div className="experience-header">
// //                     <div className="experience-title-row">
// //                       <span className="experience-title">{exp.jobTitle}</span>
// //                       <span className="experience-date">
// //                         <MonthYearDisplay value={exp.startDate} shortYear /> —{" "}
// //                         {exp.endDate ? (
// //                           <MonthYearDisplay value={exp.endDate} shortYear />
// //                         ) : (
// //                           "Present"
// //                         )}
// //                       </span>
// //                     </div>
// //                     <div className="experience-company">
// //                       {exp.employer}
// //                       {exp.location && ` • ${exp.location}`}
// //                     </div>
// //                   </div>
// //                   {exp.text && (
// //                     <div
// //                       className="experience-description"
// //                       dangerouslySetInnerHTML={{ __html: exp.text }}
// //                     />
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //           {/* EDUCATION */}
// //           {educations.length > 0 && (
// //             <div className="section">
// //               <h2 className="section-title">Education</h2>
// //               {educations.map((edu, i) => (
// //                 <div key={i} className="education-item">
// //                   <div className="education-header">
// //                     <div className="education-title-row">
// //                       <span className="education-school">{edu.schoolname}</span>
// //                       {(edu.startDate || edu.endDate) && (
// //                         <span className="education-date">
// //                           {edu.startDate || ""}
// //                           {edu.startDate && edu.endDate && " — "}
// //                           {edu.endDate || ""}
// //                         </span>
// //                       )}
// //                     </div>
// //                     {edu.degree && <div className="education-degree">{edu.degree}</div>}
// //                   </div>
// //                   {edu.text && (
// //                     <div
// //                       className="education-description"
// //                       dangerouslySetInnerHTML={{ __html: edu.text }}
// //                     />
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //           {/* SKILLS - COLORFUL TAGS */}
// //           {skills.length > 0 && (
// //             <div className="section">
// //               <h2 className="section-title">Skills & Expertise</h2>
// //               <div className="skills-container">
// //                 {skills.map((skill, i) => (
// //                   <span key={i} className="skill-item">
// //                     {skill.skill}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {/* LANGUAGES */}
// //           {finalize &&
// //             !Array.isArray(finalize) &&
// //             Array.isArray(finalize.languages) &&
// //             finalize.languages.some((l) => l.name?.trim()) && (
// //               <div className="section">
// //                 <h2 className="section-title">Languages</h2>
// //                 <div className="skills-container">
// //                   {finalize.languages.map(
// //                     (lang, i) =>
// //                       lang.name?.trim() && (
// //                         <span key={i} className="skill-item">
// //                           {lang.name}
// //                           {lang.level &&
// //                             ` • ${Math.round((Number(lang.level) / 4) * 100)}%`}
// //                         </span>
// //                       )
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //           {/* CERTIFICATIONS */}
// //           {finalize &&
// //             !Array.isArray(finalize) &&
// //             Array.isArray(finalize.certificationsAndLicenses) &&
// //             finalize.certificationsAndLicenses.some(
// //               (c) => c.name?.replace(/<[^>]*>/g, "").trim()
// //             ) && (
// //               <div className="section">
// //                 <h2 className="section-title">Certifications</h2>
// //                 <div className="additional-container">
// //                   {finalize.certificationsAndLicenses.map(
// //                     (item, i) =>
// //                       item.name?.replace(/<[^>]*>/g, "").trim() && (
// //                         <span
// //                           key={i}
// //                           className="additional-item"
// //                           dangerouslySetInnerHTML={{ __html: ` ${item.name}` }}
// //                         />
// //                       )
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //           {/* AWARDS */}
// //           {finalize &&
// //             !Array.isArray(finalize) &&
// //             Array.isArray(finalize.awardsAndHonors) &&
// //             finalize.awardsAndHonors.some(
// //               (a) => a.name?.replace(/<[^>]*>/g, "").trim()
// //             ) && (
// //               <div className="section">
// //                 <h2 className="section-title">Awards</h2>
// //                 <div className="additional-container">
// //                   {finalize.awardsAndHonors.map(
// //                     (item, i) =>
// //                       item.name?.replace(/<[^>]*>/g, "").trim() && (
// //                         <span
// //                           key={i}
// //                           className="additional-item"
// //                           dangerouslySetInnerHTML={{ __html: ` ${item.name}` }}
// //                         />
// //                       )
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //           {/* INTERESTS */}
// //           {finalize &&
// //             !Array.isArray(finalize) &&
// //             Array.isArray(finalize.hobbiesAndInterests) &&
// //             finalize.hobbiesAndInterests.some(
// //               (h) => h.name?.replace(/<[^>]*>/g, "").trim()
// //             ) && (
// //               <div className="section">
// //                 <h2 className="section-title">Interests</h2>
// //                 <div className="additional-container">
// //                   {finalize.hobbiesAndInterests.map(
// //                     (item, i) =>
// //                       item.name?.replace(/<[^>]*>/g, "").trim() && (
// //                         <span
// //                           key={i}
// //                           className="additional-item"
// //                           dangerouslySetInnerHTML={{ __html: ` ${item.name}` }}
// //                         />
// //                       )
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //           {/* CUSTOM SECTIONS */}
// //           {finalize &&
// //             !Array.isArray(finalize) &&
// //             Array.isArray(finalize.customSection) &&
// //             finalize.customSection.some(
// //               (s) => s?.name?.trim() || s?.description?.trim()
// //             ) && (
// //               <div className="section">
// //                 {finalize.customSection.map(
// //                   (section, i) =>
// //                     (section?.name?.trim() || section?.description?.trim()) && (
// //                       <div key={i} className="custom-section">
// //                         {section.name && (
// //                           <h3 className="custom-section-title"> {section.name}</h3>
// //                         )}
// //                         {section.description && (
// //                           <div
// //                             className="custom-section-content"
// //                             dangerouslySetInnerHTML={{ __html: section.description }}
// //                           />
// //                         )}
// //                       </div>
// //                     )
// //                 )}
// //               </div>
// //             )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TemplateFifteen;

// // ─── Creative Colorful Resume Template - Graphic Designer Style ───────────
// // "use client";
// // import React, { useContext } from "react";
// // import axios from "axios";
// // import { CreateContext } from "@/app/context/CreateContext";
// // import { API_URL } from "@/app/config/api";
// // import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
// // import { usePathname } from "next/navigation";
// // import { ResumeProps } from "@/app/types";

// // const TemplateFifteen: React.FC<ResumeProps> = ({ alldata }) => {
// //   const context = useContext(CreateContext);

// //   const pathname = usePathname();
// //   const lastSegment = pathname.split("/").pop();

// //   const contact = alldata?.contact || context.contact || {};
// //   const educations = alldata?.educations || context?.education || [];
// //   const experiences = alldata?.experiences || context?.experiences || [];
// //   const skills = alldata?.skills || context?.skills || [];
// //   const projects = alldata?.projects || context?.projects || [];
// //   const finalize = alldata?.finalize || context?.finalize || {};
// //   const summary = alldata?.summary || context?.summary || "";

// //   const addressParts = [
// //     contact?.address,
// //     contact?.city,
// //     contact?.postcode,
// //     contact?.country,
// //   ].filter(Boolean);

// //   const linkedinUrl = contact?.linkedin;
// //   const portfolioUrl = contact?.portfolio;

// //   // Helper function to check if skills are categorized
// //   const isCategorizedSkills = (skillsData: any[]) => {
// //     if (!skillsData || skillsData.length === 0) return false;
// //     return skillsData[0]?.title !== undefined;
// //   };

// //   // Helper function to render skills based on format
// //   const renderSkills = () => {
// //     if (!skills || skills.length === 0) return null;

// //     const isCategorized = isCategorizedSkills(skills);

// //     if (isCategorized) {
// //       // Categorized Skills - Each category with colorful tags
// //       return (
// //         <div className="section">
// //           <h2 className="section-title">Skills & Expertise</h2>
// //           {skills.map((category: any) => (
// //             <div key={category.id} className="skill-category-block">
// //               <div className="skill-category-title">{category.title}</div>
// //               <div className="skills-container">
// //                 {category.skills.map((skill: any) => (
// //                   <span key={skill.id} className="skill-item">
// //                     {skill.name}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       );
// //     } else {
// //       // Simple Skills - Colorful tags in a single container
// //       return (
// //         <div className="section">
// //           <h2 className="section-title">Skills & Expertise</h2>
// //           <div className="skills-container">
// //             {skills.map((skill: any, index: number) => (
// //               <span key={skill.id || index} className="skill-item">
// //                 {skill.name || skill.skill}
// //               </span>
// //             ))}
// //           </div>
// //         </div>
// //       );
// //     }
// //   };

// //   // Helper function to render projects
// //   const renderProjects = () => {
// //     if (!projects || projects.length === 0) return null;

// //     return (
// //       <div className="section">
// //         <h2 className="section-title">Projects</h2>
// //         {projects.map((project: any, index: number) => (
// //           <div key={project.id || index} className="experience-item">
// //             <div className="experience-header">
// //               <div className="experience-title-row">
// //                 <span className="experience-title">{project.title}</span>
// //                 {(project.liveUrl || project.githubUrl) && (
// //                   <div className="project-links">
// //                     {project.liveUrl && (
// //                       <a
// //                         href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
// //                         target="_blank"
// //                         rel="noreferrer"
// //                         className="project-link"
// //                       >
// //                         Live Demo
// //                       </a>
// //                     )}
// //                     {project.githubUrl && (
// //                       <a
// //                         href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
// //                         target="_blank"
// //                         rel="noreferrer"
// //                         className="project-link"
// //                       >
// //                         GitHub
// //                       </a>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //               {project.techStack && project.techStack.length > 0 && (
// //                 <div className="project-tech-stack">
// //                   <strong>Tech:</strong> {project.techStack.join(" • ")}
// //                 </div>
// //               )}
// //               {project.description && (
// //                 <div
// //                   className="experience-description"
// //                   dangerouslySetInnerHTML={{ __html: project.description }}
// //                 />
// //               )}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   };

// //   // Creative color palette
// //   const colors = {
// //     primary: "#6366F1", // Indigo
// //     secondary: "#8B5CF6", // Purple
// //     accent: "#EC4899", // Pink
// //     dark: "#1F2937",
// //     light: "#F9FAFB",
// //     gray: "#6B7280",
// //     white: "#FFFFFF",
// //     border: "#E5E7EB",
// //   };

// //   /* ======================================================
// //      CSS — CREATIVE COLORFUL RESUME
// //   ====================================================== */
// //   const styles = `
// //     body {
// //       font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
// //       background: linear-gradient(135deg, #f5f7fa 0%, #e9eef5 100%);
// //       line-height: 1.5;
// //       color: #1F2937;
// //     }

// //     .resume-container {
// //       max-width: 210mm;
// //       margin: 0 auto;
// //       background: white;
// //       border-radius: 24px;
// //       box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
// //       overflow: hidden;
// //     }

// //     .resume-container.is-preview {
// //       transform: scale(0.36);
// //       transform-origin: top left;
// //       width: 210mm;
// //       height: auto;
// //       max-height: none;
// //       min-height: auto;
// //       max-width: none;
// //       min-width: auto;
// //       overflow: visible;
// //     }

// //     /* Header Section - Gradient Background */
// //     .resume-header {
// //       padding: 50px 50px 40px 50px;
// //       background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
// //       color: white;
// //       position: relative;
// //     }

// //     .resume-header::after {
// //       content: '';
// //       position: absolute;
// //       bottom: 0;
// //       left: 0;
// //       right: 0;
// //       height: 4px;
// //       background: linear-gradient(90deg, ${colors.accent}, ${colors.primary}, ${colors.secondary});
// //     }

// //     .name {
// //       font-size: 48px;
// //       font-weight: 800;
// //       letter-spacing: -0.02em;
// //       margin-bottom: 12px;
// //       color: white;
// //       line-height: 1.2;
// //     }

// //     .job-title {
// //       font-size: 18px;
// //       font-weight: 500;
// //       color: rgba(255, 255, 255, 0.9);
// //       letter-spacing: 0.5px;
// //       margin-bottom: 25px;
// //       padding-bottom: 20px;
// //       border-bottom: 2px solid rgba(255, 255, 255, 0.2);
// //     }

// //     .contact-info {
// //       display: flex;
// //       flex-wrap: wrap;
// //       gap: 30px;
// //       margin-top: 15px;
// //     }

// //     .contact-item {
// //       display: flex;
// //       align-items: center;
// //       gap: 10px;
// //       font-size: 13px;
// //       color: rgba(255, 255, 255, 0.9);
// //     }

// //     .contact-icon {
// //       font-size: 16px;
// //     }

// //     .address {
// //       font-size: 13px;
// //       color: rgba(255, 255, 255, 0.9);
// //       margin-top: 12px;
// //     }

// //     .links {
// //       margin-top: 15px;
// //       display: flex;
// //       flex-wrap: wrap;
// //       gap: 20px;
// //     }

// //     .link-item {
// //       color: rgba(255, 255, 255, 0.9);
// //       text-decoration: none;
// //       font-size: 13px;
// //       display: inline-flex;
// //       align-items: center;
// //       gap: 6px;
// //       transition: all 0.2s;
// //     }

// //     .link-item:hover {
// //       color: white;
// //       transform: translateX(3px);
// //     }

// //     /* Main Content */
// //     .resume-main {
// //       padding: 45px 50px 50px 50px;
// //     }

// //     /* Section Styles */
// //     .section {
// //       margin-bottom: 35px;
// //     }

// //     .section:last-child {
// //       margin-bottom: 0;
// //     }

// //     .section-title {
// //       font-size: 20px;
// //       font-weight: 700;
// //       color: ${colors.dark};
// //       margin-bottom: 20px;
// //       padding-bottom: 8px;
// //       border-bottom: 3px solid ${colors.primary};
// //       display: inline-block;
// //       letter-spacing: -0.3px;
// //     }

// //     /* Summary */
// //     .summary-text {
// //       font-size: 14px;
// //       line-height: 1.7;
// //       color: ${colors.gray};
// //       font-weight: 400;
// //     }

// //     /* Experience Items */
// //     .experience-item {
// //       margin-bottom: 30px;
// //       position: relative;
// //       padding-left: 20px;
// //       border-left: 3px solid ${colors.primary};
// //     }

// //     .experience-item:last-child {
// //       margin-bottom: 0;
// //     }

// //     .experience-header {
// //       margin-bottom: 10px;
// //     }

// //     .experience-title-row {
// //       display: flex;
// //       justify-content: space-between;
// //       align-items: baseline;
// //       flex-wrap: wrap;
// //       gap: 10px;
// //       margin-bottom: 6px;
// //     }

// //     .experience-title {
// //       font-size: 18px;
// //       font-weight: 700;
// //       color: ${colors.dark};
// //     }

// //     .experience-date {
// //       font-size: 12px;
// //       font-weight: 500;
// //       color: ${colors.primary};
// //       background: rgba(99, 102, 241, 0.1);
// //       padding: 3px 10px;
// //       border-radius: 20px;
// //     }

// //     .experience-company {
// //       font-size: 14px;
// //       font-weight: 500;
// //       color: ${colors.secondary};
// //       margin-top: 4px;
// //     }

// //     .experience-description {
// //       margin-top: 12px;
// //     }

// //     /* Bullet points */
// //     .experience-description ul,
// //     .education-description ul {
// //       list-style-type: none;
// //       padding-left: 0;
// //     }

// //     .experience-description li,
// //     .education-description li {
// //       position: relative;
// //       padding-left: 24px;
// //       margin-bottom: 8px;
// //       font-size: 14px;
// //       color: ${colors.gray};
// //       line-height: 1.6;
// //       font-weight: 400;
// //     }

// //     .experience-description li::before,
// //     .education-description li::before {
// //       content: "✦";
// //       position: absolute;
// //       left: 4px;
// //       color: ${colors.accent};
// //       font-size: 12px;
// //       font-weight: bold;
// //     }

// //     /* Education Items */
// //     .education-item {
// //       margin-bottom: 25px;
// //       position: relative;
// //       padding-left: 20px;
// //       border-left: 3px solid ${colors.secondary};
// //     }

// //     .education-item:last-child {
// //       margin-bottom: 0;
// //     }

// //     .education-header {
// //       margin-bottom: 8px;
// //     }

// //     .education-title-row {
// //       display: flex;
// //       justify-content: space-between;
// //       align-items: baseline;
// //       flex-wrap: wrap;
// //       gap: 10px;
// //       margin-bottom: 6px;
// //     }

// //     .education-school {
// //       font-size: 17px;
// //       font-weight: 700;
// //       color: ${colors.dark};
// //     }

// //     .education-date {
// //       font-size: 12px;
// //       font-weight: 500;
// //       color: ${colors.secondary};
// //       background: rgba(139, 92, 246, 0.1);
// //       padding: 3px 10px;
// //       border-radius: 20px;
// //     }

// //     .education-degree {
// //       font-size: 14px;
// //       font-weight: 500;
// //       color: ${colors.gray};
// //       margin-top: 4px;
// //     }

// //     .education-description {
// //       margin-top: 10px;
// //     }

// //     /* Skills - Colorful Tags */
// //     .skills-container {
// //       display: flex;
// //       flex-wrap: wrap;
// //       gap: 12px;
// //       margin-top: 10px;
// //     }

// //     .skill-item {
// //       font-size: 13px;
// //       font-weight: 600;
// //       color: ${colors.primary};
// //       background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
// //       padding: 8px 20px;
// //       border-radius: 30px;
// //       letter-spacing: 0.3px;
// //       transition: all 0.2s;
// //     }

// //     .skill-item:hover {
// //       transform: translateY(-2px);
// //       background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
// //     }

// //     /* Categorized Skills */
// //     .skill-category-block {
// //       margin-bottom: 20px;
// //     }

// //     .skill-category-block:last-child {
// //       margin-bottom: 0;
// //     }

// //     .skill-category-title {
// //       font-size: 15px;
// //       font-weight: 600;
// //       color: ${colors.dark};
// //       margin-bottom: 10px;
// //       padding-bottom: 4px;
// //       border-bottom: 2px solid ${colors.primary};
// //       display: inline-block;
// //     }

// //     /* Projects */
// //     .project-links {
// //       display: flex;
// //       gap: 15px;
// //     }

// //     .project-link {
// //       font-size: 11px;
// //       font-weight: 500;
// //       color: ${colors.primary};
// //       text-decoration: underline;
// //     }

// //     .project-tech-stack {
// //       font-size: 12px;
// //       color: ${colors.gray};
// //       margin: 6px 0;
// //     }

// //     /* Additional content - Colorful Tags */
// //     .additional-container {
// //       margin-top: 10px;
// //       display: flex;
// //       flex-wrap: wrap;
// //       gap: 12px;
// //     }

// //     .additional-item {
// //       font-size: 13px;
// //       font-weight: 500;
// //       color: ${colors.accent};
// //       background: rgba(236, 72, 153, 0.1);
// //       padding: 8px 18px;
// //       border-radius: 30px;
// //       transition: all 0.2s;
// //     }

// //     .additional-item:hover {
// //       transform: translateY(-2px);
// //       background: rgba(236, 72, 153, 0.2);
// //     }

// //     /* Custom Sections */
// //     .custom-section {
// //       margin-bottom: 22px;
// //       position: relative;
// //       padding-left: 20px;
// //       border-left: 3px solid ${colors.accent};
// //     }

// //     .custom-section:last-child {
// //       margin-bottom: 0;
// //     }

// //     .custom-section-title {
// //       font-size: 16px;
// //       font-weight: 700;
// //       color: ${colors.dark};
// //       margin-bottom: 8px;
// //     }

// //     .custom-section-content {
// //       font-size: 14px;
// //       color: ${colors.gray};
// //       line-height: 1.6;
// //       font-weight: 400;
// //     }

// //     /* Print Styles */
// //     @media print {
// //       @page {
// //         size: A4;
// //         margin: 0;
// //       }

// //       @page :first {
// //         margin-top: 0;
// //       }

// //       body {
// //         background: white;
// //         padding: 0;
// //         margin: 0;
// //       }

// //       .resume-container {
// //         max-width: 100%;
// //         margin: 0;
// //         border-radius: 0;
// //         box-shadow: none;
// //       }

// //       .resume-header {
// //         background: ${colors.primary};
// //         -webkit-print-color-adjust: exact;
// //         print-color-adjust: exact;
// //         padding: 40px 40px 30px 40px !important;
// //       }

// //       .resume-main {
// //         padding: 35px 40px 40px 40px !important;
// //       }

// //       .skill-item {
// //         background: rgba(99, 102, 241, 0.1);
// //         -webkit-print-color-adjust: exact;
// //         print-color-adjust: exact;
// //       }

// //       .additional-item {
// //         background: rgba(236, 72, 153, 0.1);
// //         -webkit-print-color-adjust: exact;
// //         print-color-adjust: exact;
// //       }
// //     }

// //     /* Responsive */
// //     @media (max-width: 768px) {
// //       body {
// //         padding: 20px;
// //       }

// //       .resume-header {
// //         padding: 35px 30px 25px 30px !important;
// //       }

// //       .resume-main {
// //         padding: 30px 30px 35px 30px !important;
// //       }

// //       .name {
// //         font-size: 36px;
// //       }

// //       .job-title {
// //         font-size: 16px;
// //       }

// //       .contact-info {
// //         flex-direction: column;
// //         gap: 10px;
// //       }

// //       .section-title {
// //         font-size: 18px;
// //       }

// //       .experience-title-row {
// //         flex-direction: column;
// //         gap: 6px;
// //       }

// //       .education-title-row {
// //         flex-direction: column;
// //         gap: 6px;
// //       }

// //       .project-links {
// //         margin-top: 6px;
// //       }
// //     }
// //   `;

// //   const stripHtml = (html: string) => {
// //     return html?.replace(/<\/?[^>]+(>|$)/g, "") || "";
// //   };

// //   const renderDescription = (text: string) => {
// //     if (!text) return "";

// //     if (text.includes("<") && text.includes(">")) {
// //       return `<div class="experience-description">${text}</div>`;
// //     }

// //     const lines = text.split("\n").filter((line) => line.trim() !== "");
// //     if (lines.some((line) => line.trim().startsWith("-") || line.trim().startsWith("•"))) {
// //       return `
// //         <div class="experience-description">
// //           <ul>
// //             ${lines
// //               .map((line) => {
// //                 const trimmed = line.trim();
// //                 if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
// //                   return `<li>${trimmed.substring(1).trim()}</li>`;
// //                 } else if (trimmed) {
// //                   return `<li>${trimmed}</li>`;
// //                 }
// //                 return "";
// //               })
// //               .join("")}
// //           </ul>
// //         </div>`;
// //     } else {
// //       return `<div class="experience-description" style="white-space: pre-wrap;">${stripHtml(text)}</div>`;
// //     }
// //   };

// //   const generateHTML = () => {
// //     // Generate skills HTML for PDF
// //     const generateSkillsHTML = () => {
// //       if (!skills || skills.length === 0) return "";

// //       const isCategorized = isCategorizedSkills(skills);

// //       if (isCategorized) {
// //         return `
// //           <div class="section">
// //             <h2 class="section-title">Skills & Expertise</h2>
// //             ${skills.map((category: any) => `
// //               <div class="skill-category-block">
// //                 <div class="skill-category-title">${category.title}</div>
// //                 <div class="skills-container">
// //                   ${category.skills.map((skill: any) => `
// //                     <span class="skill-item">${skill.name}</span>
// //                   `).join("")}
// //                 </div>
// //               </div>
// //             `).join("")}
// //           </div>
// //         `;
// //       } else {
// //         return `
// //           <div class="section">
// //             <h2 class="section-title">Skills & Expertise</h2>
// //             <div class="skills-container">
// //               ${skills.map((skill: any) => `
// //                 <span class="skill-item">${skill.name || skill.skill}</span>
// //               `).join("")}
// //             </div>
// //           </div>
// //         `;
// //       }
// //     };

// //     // Generate projects HTML for PDF
// //     const generateProjectsHTML = () => {
// //       if (!projects || projects.length === 0) return "";

// //       return `
// //         <div class="section">
// //           <h2 class="section-title">Projects</h2>
// //           ${projects.map((project: any) => `
// //             <div class="experience-item">
// //               <div class="experience-header">
// //                 <div class="experience-title-row">
// //                   <span class="experience-title">${project.title || ""}</span>
// //                   <div class="project-links">
// //                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
// //                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
// //                   </div>
// //                 </div>
// //               </div>
// //               ${project.techStack && project.techStack.length > 0 ? `
// //                 <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
// //               ` : ""}
// //               ${project.description ? `
// //                 <div class="experience-description">${project.description}</div>
// //               ` : ""}
// //             </div>
// //           `).join("")}
// //         </div>
// //       `;
// //     };

// //     return `
// //       <!DOCTYPE html>
// //       <html>
// //       <head>
// //         <meta charset="UTF-8"/>
// //         <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
// //         <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
// //         <style>${styles}</style>
// //       </head>
// //       <body>
// //         <div class="resume-container">
// //           <!-- HEADER - GRADIENT -->
// //           <div class="resume-header">
// //             <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
// //             <div class="job-title">${
// //               contact?.jobTitle
// //                 ? typeof contact.jobTitle === "string"
// //                   ? contact.jobTitle
// //                   : (contact.jobTitle as any)?.name || ""
// //                 : ""
// //             }</div>
// //             <div class="contact-info">
// //               ${contact?.email ? `
// //                 <div class="contact-item">
// //                   <span class="contact-icon">📧</span>
// //                   <span>${contact.email}</span>
// //                 </div>
// //               ` : ""}
// //               ${contact?.phone ? `
// //                 <div class="contact-item">
// //                   <span class="contact-icon">📱</span>
// //                   <span>${contact.phone}</span>
// //                 </div>
// //               ` : ""}
// //             </div>
// //             ${addressParts.length ? `<div class="address">📍 ${addressParts.join(" • ")}</div>` : ""}
// //             <div class="links">
// //               ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">🔗 LinkedIn</a>` : ""}
// //               ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">🎨 Portfolio</a>` : ""}
// //             </div>
// //           </div>

// //           <!-- MAIN CONTENT -->
// //           <div class="resume-main">
// //             <!-- SUMMARY -->
// //             ${summary ? `
// //               <div class="section">
// //                 <h2 class="section-title">About Me</h2>
// //                 <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
// //               </div>
// //             ` : ""}

// //             <!-- EXPERIENCE -->
// //             ${experiences.length > 0 ? `
// //               <div class="section">
// //                 <h2 class="section-title">Work Experience</h2>
// //                 ${experiences.map((exp) => {
// //                   const startFormatted = formatMonthYear(exp.startDate, true);
// //                   const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
// //                   return `
// //                     <div class="experience-item">
// //                       <div class="experience-header">
// //                         <div class="experience-title-row">
// //                           <span class="experience-title">${exp.jobTitle || ""}</span>
// //                           <span class="experience-date">${startFormatted} — ${endFormatted}</span>
// //                         </div>
// //                         <div class="experience-company">${exp.employer || ""}${exp.location ? ` • ${exp.location}` : ""}</div>
// //                       </div>
// //                       ${exp.text ? renderDescription(exp.text) : ""}
// //                     </div>
// //                   `;
// //                 }).join("")}
// //               </div>
// //             ` : ""}

// //             <!-- PROJECTS -->
// //             ${generateProjectsHTML()}

// //             <!-- EDUCATION -->
// //             ${educations.length > 0 ? `
// //               <div class="section">
// //                 <h2 class="section-title">Education</h2>
// //                 ${educations.map((edu) => {
// //                   const dateStr = edu.startDate || edu.endDate
// //                     ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " — " : ""}${edu.endDate || ""}`
// //                     : "";
// //                   return `
// //                     <div class="education-item">
// //                       <div class="education-header">
// //                         <div class="education-title-row">
// //                           <span class="education-school">${edu.schoolname || ""}</span>
// //                           ${dateStr ? `<span class="education-date">${dateStr}</span>` : ""}
// //                         </div>
// //                         ${edu.degree ? `<div class="education-degree">${edu.degree}</div>` : ""}
// //                       </div>
// //                       ${edu.text ? renderDescription(edu.text) : ""}
// //                     </div>
// //                   `;
// //                 }).join("")}
// //               </div>
// //             ` : ""}

// //             <!-- SKILLS -->
// //             ${generateSkillsHTML()}

// //             <!-- LANGUAGES -->
// //             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some(l => l.name?.trim()) ? `
// //               <div class="section">
// //                 <h2 class="section-title">Languages</h2>
// //                 <div class="skills-container">
// //                   ${finalize.languages.filter(l => l.name?.trim()).map(l => `
// //                     <span class="skill-item">${l.name}${l.level ? ` • ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</span>
// //                   `).join("")}
// //                 </div>
// //               </div>
// //             ` : ""}

// //             <!-- CERTIFICATIONS -->
// //             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some(c => c.name?.replace(/<[^>]*>/g, "").trim()) ? `
// //               <div class="section">
// //                 <h2 class="section-title">Certifications</h2>
// //                 <div class="additional-container">
// //                   ${finalize.certificationsAndLicenses.filter(c => c.name?.replace(/<[^>]*>/g, "").trim()).map(c => `
// //                     <span class="additional-item"> ${c.name.replace(/<[^>]*>/g, "")}</span>
// //                   `).join("")}
// //                 </div>
// //               </div>
// //             ` : ""}

// //             <!-- AWARDS -->
// //             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some(a => a.name?.replace(/<[^>]*>/g, "").trim()) ? `
// //               <div class="section">
// //                 <h2 class="section-title">Awards</h2>
// //                 <div class="additional-container">
// //                   ${finalize.awardsAndHonors.filter(a => a.name?.replace(/<[^>]*>/g, "").trim()).map(a => `
// //                     <span class="additional-item">${a.name.replace(/<[^>]*>/g, "")}</span>
// //                   `).join("")}
// //                 </div>
// //               </div>
// //             ` : ""}

// //             <!-- INTERESTS -->
// //             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some(h => h.name?.replace(/<[^>]*>/g, "").trim()) ? `
// //               <div class="section">
// //                 <h2 class="section-title">Interests</h2>
// //                 <div class="additional-container">
// //                   ${finalize.hobbiesAndInterests.filter(h => h.name?.replace(/<[^>]*>/g, "").trim()).map(h => `
// //                     <span class="additional-item"> ${h.name.replace(/<[^>]*>/g, "")}</span>
// //                   `).join("")}
// //                 </div>
// //               </div>
// //             ` : ""}

// //             <!-- CUSTOM SECTIONS -->
// //             ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some(s => s?.name?.trim() || s?.description?.trim()) ? `
// //               <div class="section">
// //                 ${finalize.customSection.filter(s => s?.name?.trim() || s?.description?.trim()).map(s => `
// //                   <div class="custom-section">
// //                     ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
// //                     ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
// //                   </div>
// //                 `).join("")}
// //               </div>
// //             ` : ""}
// //           </div>
// //         </div>
// //       </body>
// //       </html>
// //     `;
// //   };

// //   const handleDownload = async () => {
// //     try {
// //       const html = generateHTML();
// //       const res = await axios.post(
// //         `${API_URL}/api/candidates/generate-pdf`,
// //         { html },
// //         { responseType: "blob" }
// //       );
// //       const url = URL.createObjectURL(res.data);
// //       const a = document.createElement("a");
// //       a.href = url;
// //       a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
// //       document.body.appendChild(a);
// //       a.click();
// //       document.body.removeChild(a);
// //       URL.revokeObjectURL(url);
// //     } catch (error) {
// //       console.error("Error generating PDF:", error);
// //       alert("Failed to generate PDF. Please try again.");
// //     }
// //   };

// //   return (
// //     <div style={{ textAlign: "left", marginTop: 0 }}>
// //       {lastSegment === "download-resume" && (
// //         <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
// //           <button
// //             onClick={handleDownload}
// //             style={{
// //               background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
// //               color: "#ffffff",
// //               padding: "14px 36px",
// //               fontSize: "14px",
// //               fontWeight: "600",
// //               border: "none",
// //               borderRadius: "40px",
// //               cursor: "pointer",
// //               fontFamily: "inherit",
// //               letterSpacing: "0.5px",
// //               boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
// //               transition: "all 0.3s ease",
// //             }}
// //             onMouseEnter={(e) => {
// //               e.currentTarget.style.transform = "translateY(-2px)";
// //               e.currentTarget.style.boxShadow = "0 6px 20px rgba(99, 102, 241, 0.4)";
// //             }}
// //             onMouseLeave={(e) => {
// //               e.currentTarget.style.transform = "translateY(0)";
// //               e.currentTarget.style.boxShadow = "0 4px 15px rgba(99, 102, 241, 0.3)";
// //             }}
// //           >
// //             📄 Download Resume
// //           </button>
// //         </div>
// //       )}

// //       {/* Resume Preview */}
// //       <div className={`resume-container ${alldata ? 'is-preview' : ''}`} style={{ margin: "0 auto" }}>
// //         <style>{styles}</style>

// //         {/* HEADER - GRADIENT */}
// //         <div className="resume-header">
// //           <h1 className="name">
// //             {contact?.firstName} {contact?.lastName}
// //           </h1>
// //           <div className="job-title">
// //             {contact?.jobTitle
// //               ? typeof contact.jobTitle === "string"
// //                 ? contact.jobTitle
// //                 : (contact.jobTitle as any)?.name || ""
// //               : ""}
// //           </div>
// //           <div className="contact-info">
// //             {contact?.email && (
// //               <div className="contact-item">
// //                 <span className="contact-icon">📧</span>
// //                 <span>{contact.email}</span>
// //               </div>
// //             )}
// //             {contact?.phone && (
// //               <div className="contact-item">
// //                 <span className="contact-icon">📱</span>
// //                 <span>{contact.phone}</span>
// //               </div>
// //             )}
// //           </div>
// //           {addressParts.length > 0 && (
// //             <div className="address">📍 {addressParts.join(" • ")}</div>
// //           )}
// //           <div className="links">
// //             {linkedinUrl && (
// //               <a
// //                 href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
// //                 className="link-item"
// //                 target="_blank"
// //                 rel="noreferrer"
// //               >
// //                 🔗 LinkedIn
// //               </a>
// //             )}
// //             {portfolioUrl && (
// //               <a
// //                 href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
// //                 className="link-item"
// //                 target="_blank"
// //                 rel="noreferrer"
// //               >
// //                 🎨 Portfolio
// //               </a>
// //             )}
// //           </div>
// //         </div>

// //         {/* MAIN CONTENT */}
// //         <div className="resume-main">
// //           {/* SUMMARY */}
// //           {summary && (
// //             <div className="section">
// //               <h2 className="section-title">About Me</h2>
// //               <div
// //                 className="summary-text"
// //                 dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
// //               />
// //             </div>
// //           )}

// //           {/* EXPERIENCE */}
// //           {experiences.length > 0 && (
// //             <div className="section">
// //               <h2 className="section-title">Work Experience</h2>
// //               {experiences.map((exp, i) => (
// //                 <div key={i} className="experience-item">
// //                   <div className="experience-header">
// //                     <div className="experience-title-row">
// //                       <span className="experience-title">{exp.jobTitle}</span>
// //                       <span className="experience-date">
// //                         <MonthYearDisplay value={exp.startDate} shortYear /> —{" "}
// //                         {exp.endDate ? (
// //                           <MonthYearDisplay value={exp.endDate} shortYear />
// //                         ) : (
// //                           "Present"
// //                         )}
// //                       </span>
// //                     </div>
// //                     <div className="experience-company">
// //                       {exp.employer}
// //                       {exp.location && ` • ${exp.location}`}
// //                     </div>
// //                   </div>
// //                   {exp.text && (
// //                     <div
// //                       className="experience-description"
// //                       dangerouslySetInnerHTML={{ __html: exp.text }}
// //                     />
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //           {/* PROJECTS */}
// //           {renderProjects()}

// //           {/* EDUCATION */}
// //           {educations.length > 0 && (
// //             <div className="section">
// //               <h2 className="section-title">Education</h2>
// //               {educations.map((edu, i) => (
// //                 <div key={i} className="education-item">
// //                   <div className="education-header">
// //                     <div className="education-title-row">
// //                       <span className="education-school">{edu.schoolname}</span>
// //                       {(edu.startDate || edu.endDate) && (
// //                         <span className="education-date">
// //                           {edu.startDate || ""}
// //                           {edu.startDate && edu.endDate && " — "}
// //                           {edu.endDate || ""}
// //                         </span>
// //                       )}
// //                     </div>
// //                     {edu.degree && <div className="education-degree">{edu.degree}</div>}
// //                   </div>
// //                   {edu.text && (
// //                     <div
// //                       className="education-description"
// //                       dangerouslySetInnerHTML={{ __html: edu.text }}
// //                     />
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //           {/* SKILLS */}
// //           {renderSkills()}

// //           {/* LANGUAGES */}
// //           {finalize &&
// //             !Array.isArray(finalize) &&
// //             Array.isArray(finalize.languages) &&
// //             finalize.languages.some((l) => l.name?.trim()) && (
// //               <div className="section">
// //                 <h2 className="section-title">Languages</h2>
// //                 <div className="skills-container">
// //                   {finalize.languages.map(
// //                     (lang, i) =>
// //                       lang.name?.trim() && (
// //                         <span key={i} className="skill-item">
// //                           {lang.name}
// //                           {lang.level &&
// //                             ` • ${Math.round((Number(lang.level) / 4) * 100)}%`}
// //                         </span>
// //                       )
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //           {/* CERTIFICATIONS */}
// //           {finalize &&
// //             !Array.isArray(finalize) &&
// //             Array.isArray(finalize.certificationsAndLicenses) &&
// //             finalize.certificationsAndLicenses.some(
// //               (c) => c.name?.replace(/<[^>]*>/g, "").trim()
// //             ) && (
// //               <div className="section">
// //                 <h2 className="section-title">Certifications</h2>
// //                 <div className="additional-container">
// //                   {finalize.certificationsAndLicenses.map(
// //                     (item, i) =>
// //                       item.name?.replace(/<[^>]*>/g, "").trim() && (
// //                         <span
// //                           key={i}
// //                           className="additional-item"
// //                           dangerouslySetInnerHTML={{ __html: ` ${item.name}` }}
// //                         />
// //                       )
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //           {/* AWARDS */}
// //           {finalize &&
// //             !Array.isArray(finalize) &&
// //             Array.isArray(finalize.awardsAndHonors) &&
// //             finalize.awardsAndHonors.some(
// //               (a) => a.name?.replace(/<[^>]*>/g, "").trim()
// //             ) && (
// //               <div className="section">
// //                 <h2 className="section-title">Awards</h2>
// //                 <div className="additional-container">
// //                   {finalize.awardsAndHonors.map(
// //                     (item, i) =>
// //                       item.name?.replace(/<[^>]*>/g, "").trim() && (
// //                         <span
// //                           key={i}
// //                           className="additional-item"
// //                           dangerouslySetInnerHTML={{ __html: ` ${item.name}` }}
// //                         />
// //                       )
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //           {/* INTERESTS */}
// //           {finalize &&
// //             !Array.isArray(finalize) &&
// //             Array.isArray(finalize.hobbiesAndInterests) &&
// //             finalize.hobbiesAndInterests.some(
// //               (h) => h.name?.replace(/<[^>]*>/g, "").trim()
// //             ) && (
// //               <div className="section">
// //                 <h2 className="section-title">Interests</h2>
// //                 <div className="additional-container">
// //                   {finalize.hobbiesAndInterests.map(
// //                     (item, i) =>
// //                       item.name?.replace(/<[^>]*>/g, "").trim() && (
// //                         <span
// //                           key={i}
// //                           className="additional-item"
// //                           dangerouslySetInnerHTML={{ __html: ` ${item.name}` }}
// //                         />
// //                       )
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //           {/* CUSTOM SECTIONS */}
// //           {finalize &&
// //             !Array.isArray(finalize) &&
// //             Array.isArray(finalize.customSection) &&
// //             finalize.customSection.some(
// //               (s) => s?.name?.trim() || s?.description?.trim()
// //             ) && (
// //               <div className="section">
// //                 {finalize.customSection.map(
// //                   (section, i) =>
// //                     (section?.name?.trim() || section?.description?.trim()) && (
// //                       <div key={i} className="custom-section">
// //                         {section.name && (
// //                           <h3 className="custom-section-title"> {section.name}</h3>
// //                         )}
// //                         {section.description && (
// //                           <div
// //                             className="custom-section-content"
// //                             dangerouslySetInnerHTML={{ __html: section.description }}
// //                           />
// //                         )}
// //                       </div>
// //                     )
// //                 )}
// //               </div>
// //             )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TemplateFifteen;

// // "use client";
// // import React, { useContext } from "react";
// // import axios from "axios";
// // import { CreateContext } from "@/app/context/CreateContext";
// // import { API_URL } from "@/app/config/api";
// // import { formatMonthYear, MonthYearDisplay, cleanQuillHTML, formatDateOfBirth, formatGradeToCgpdAndPercentage } from "@/app/utils";
// // import { usePathname } from "next/navigation";
// // import { ResumeProps } from "@/app/types";
// // import { motion } from "framer-motion";

// // const TemplateFifteen: React.FC<ResumeProps> = ({ alldata }) => {
// //   const context = useContext(CreateContext);

// //   const pathname = usePathname();
// //   const lastSegment = pathname.split("/").pop();

// //   const contact = alldata?.contact || context.contact || {};
// //   const educations = alldata?.educations || context?.education || [];
// //   const experiences = alldata?.experiences || context?.experiences || [];
// //   const skills = alldata?.skills?.text || context?.skills?.text || "";
// //   const projects = alldata?.projects || context?.projects || [];
// //   const finalize = alldata?.finalize || context?.finalize || {};
// //   const summary = alldata?.summary || context?.summary || "";

// //   const addressParts = [
// //     contact?.address,
// //     contact?.city,
// //     contact?.postCode,
// //     contact?.country,
// //   ].filter(Boolean);

// //   const linkedinUrl = contact?.linkedIn;
// //   const portfolioUrl = contact?.portfolio;
// //   const githubUrl = contact?.github;
// //   const dateOfBirth = contact?.dob;
// //   const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

// //   // Helper function to render skills (using cleanQuillHTML)
// //   const renderSkills = () => {
// //     if (!skills || (typeof skills === "string" && !skills.trim())) return null;

// //     const cleanedSkills = cleanQuillHTML(skills);

// //     if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return null;

// //     return (
// //       <div className="section">
// //         <h2 className="section-title">Skills & Expertise</h2>
// //         <div className="skills-container">
// //           <div
// //             className="skills-content"
// //             dangerouslySetInnerHTML={{ __html: cleanedSkills }}
// //           />
// //         </div>
// //       </div>
// //     );
// //   };

// //   // Helper function to render projects
// //   const renderProjects = () => {
// //     if (!projects || projects.length === 0) return null;

// //     return (
// //       <div className="section">
// //         <h2 className="section-title">Projects</h2>
// //         {projects.map((project: any, index: number) => (
// //           <div key={project.id || index} className="experience-item">
// //             <div className="experience-header">
// //               <div className="experience-title-row">
// //                 <span className="experience-title">{project.title}</span>
// //                 {(project.liveUrl || project.githubUrl) && (
// //                   <div className="project-links">
// //                     {project.liveUrl && (
// //                       <a
// //                         href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}
// //                         target="_blank"
// //                         rel="noreferrer"
// //                         className="project-link"
// //                       >
// //                         Live Demo
// //                       </a>
// //                     )}
// //                     {project.githubUrl && (
// //                       <a
// //                         href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}
// //                         target="_blank"
// //                         rel="noreferrer"
// //                         className="project-link"
// //                       >
// //                         GitHub
// //                       </a>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //               {project.techStack && project.techStack.length > 0 && (
// //                 <div className="project-tech-stack">
// //                   <strong>Tech:</strong> {project.techStack.join(" • ")}
// //                 </div>
// //               )}
// //               {project.description && (
// //                 <div
// //                   className="experience-description"
// //                   dangerouslySetInnerHTML={{ __html: cleanQuillHTML(project.description) }}
// //                 />
// //               )}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   };

// //   /* ======================================================
// //      CSS — CREATIVE COLORFUL RESUME
// //   ====================================================== */
// //   const styles = `
// //     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

// //     body {
// //       font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
// //       background: linear-gradient(135deg, #f5f7fa 0%, #e9eef5 100%);
// //       line-height: 1.5;
// //       color: #1F2937;
// //     }

// //     .resume-container {
// //       max-width: 210mm;
// //       margin: 0 auto;
// //       background: white;
// //       border-radius: 24px;
// //       box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
// //       overflow: hidden;
// //     }

// //     .resume-container.is-preview {
// //       transform: scale(0.36);
// //       transform-origin: top left;
// //       width: 210mm;
// //       height: auto;
// //       max-height: none;
// //       min-height: auto;
// //       max-width: none;
// //       min-width: auto;
// //       overflow: visible;
// //     }

// //     /* Fix p tag spacing */
// //     .resume-container p {
// //       margin: 0 0 6px 0 !important;
// //       padding: 0 !important;
// //       line-height: 1.6 !important;
// //     }

// //     .resume-container p:last-child {
// //       margin-bottom: 0 !important;
// //     }

// //     /* Rich text content styles */
// //     .resume-container .experience-description ul,
// //     .resume-container .experience-description ol,
// //     .resume-container .education-description ul,
// //     .resume-container .education-description ol,
// //     .resume-container .skills-content ul,
// //     .resume-container .skills-content ol,
// //     .resume-container .custom-section-content ul,
// //     .resume-container .custom-section-content ol {
// //       margin: 6px 0 6px 20px !important;
// //       padding-left: 20px !important;
// //     }

// //     .resume-container .experience-description li,
// //     .resume-container .education-description li,
// //     .resume-container .skills-content li,
// //     .resume-container .custom-section-content li {
// //       margin-bottom: 4px !important;
// //       line-height: 1.6 !important;
// //     }

// //     .resume-container .experience-description ul,
// //     .resume-container .education-description ul,
// //     .resume-container .skills-content ul,
// //     .resume-container .custom-section-content ul {
// //       list-style-type: disc !important;
// //     }

// //     .resume-container .experience-description ol,
// //     .resume-container .education-description ol,
// //     .resume-container .skills-content ol,
// //     .resume-container .custom-section-content ol {
// //       list-style-type: decimal !important;
// //     }

// //     .resume-container .experience-description strong,
// //     .resume-container .education-description strong,
// //     .resume-container .skills-content strong,
// //     .resume-container .custom-section-content strong {
// //       font-weight: 700 !important;
// //     }

// //     .resume-container .experience-description em,
// //     .resume-container .education-description em,
// //     .resume-container .skills-content em,
// //     .resume-container .custom-section-content em {
// //       font-style: italic !important;
// //     }

// //     .resume-container .experience-description u,
// //     .resume-container .education-description u,
// //     .resume-container .skills-content u,
// //     .resume-container .custom-section-content u {
// //       text-decoration: underline !important;
// //     }

// //     /* Preserve spaces in content */
// //     .resume-container .experience-description p,
// //     .resume-container .education-description p,
// //     .resume-container .skills-content p,
// //     .resume-container .custom-section-content p {
// //       white-space: pre-wrap !important;
// //     }

// //     /* Skills content styling */
// //     .resume-container .skills-content {
// //       font-size: 13px;
// //       font-weight: 500;
// //       color: #4B5563;
// //       line-height: 1.6;
// //     }

// //     /* Header Section - Gradient Background */
// //     .resume-header {
// //       padding: 50px 50px 40px 50px;
// //       background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
// //       color: white;
// //       position: relative;
// //     }

// //     .resume-header::after {
// //       content: '';
// //       position: absolute;
// //       bottom: 0;
// //       left: 0;
// //       right: 0;
// //       height: 4px;
// //       background: linear-gradient(90deg, #EC4899, #6366F1, #8B5CF6);
// //     }

// //     .name {
// //       font-size: 48px;
// //       font-weight: 800;
// //       letter-spacing: -0.02em;
// //       margin-bottom: 12px;
// //       color: white;
// //       line-height: 1.2;
// //     }

// //     .job-title {
// //       font-size: 18px;
// //       font-weight: 500;
// //       color: rgba(255, 255, 255, 0.9);
// //       letter-spacing: 0.5px;
// //       margin-bottom: 25px;
// //       padding-bottom: 20px;
// //       border-bottom: 2px solid rgba(255, 255, 255, 0.2);
// //     }

// //     .contact-info {
// //       display: flex;
// //       flex-wrap: wrap;
// //       gap: 30px;
// //       margin-top: 15px;
// //     }

// //     .contact-item {
// //       display: flex;
// //       align-items: center;
// //       gap: 10px;
// //       font-size: 13px;
// //       color: rgba(255, 255, 255, 0.9);
// //     }

// //     .contact-icon {
// //       font-size: 16px;
// //     }

// //     .address {
// //       font-size: 13px;
// //       color: rgba(255, 255, 255, 0.9);
// //       margin-top: 12px;
// //     }

// //     .links {
// //       margin-top: 15px;
// //       display: flex;
// //       flex-wrap: wrap;
// //       gap: 20px;
// //     }

// //     .link-item {
// //       color: rgba(255, 255, 255, 0.9);
// //       text-decoration: none;
// //       font-size: 13px;
// //       display: inline-flex;
// //       align-items: center;
// //       gap: 6px;
// //       transition: all 0.2s;
// //     }

// //     /* Main Content */
// //     .resume-main {
// //       padding: 45px 50px 50px 50px;
// //     }

// //     /* Section Styles */
// //     .section {
// //       margin-bottom: 35px;
// //     }

// //     .section:last-child {
// //       margin-bottom: 0;
// //     }

// //     .section-title {
// //       font-size: 20px;
// //       font-weight: 700;
// //       color: #1F2937;
// //       margin-bottom: 20px;
// //       padding-bottom: 8px;
// //       border-bottom: 3px solid #6366F1;
// //       display: inline-block;
// //       letter-spacing: -0.3px;
// //     }

// //     /* Summary */
// //     .summary-text {
// //       font-size: 14px;
// //       line-height: 1.7;
// //       color: #6B7280;
// //       font-weight: 400;
// //     }

// //     /* Experience Items */
// //     .experience-item {
// //       margin-bottom: 30px;
// //       position: relative;
// //       padding-left: 20px;
// //       border-left: 3px solid #6366F1;
// //     }

// //     .experience-item:last-child {
// //       margin-bottom: 0;
// //     }

// //     .experience-header {
// //       margin-bottom: 10px;
// //     }

// //     .experience-title-row {
// //       display: flex;
// //       justify-content: space-between;
// //       align-items: baseline;
// //       flex-wrap: wrap;
// //       gap: 10px;
// //       margin-bottom: 6px;
// //     }

// //     .experience-title {
// //       font-size: 18px;
// //       font-weight: 700;
// //       color: #1F2937;
// //     }

// //     .experience-date {
// //       font-size: 12px;
// //       font-weight: 500;
// //       color: #6366F1;
// //       background: rgba(99, 102, 241, 0.1);
// //       padding: 3px 10px;
// //       border-radius: 20px;
// //     }

// //     .experience-company {
// //       font-size: 14px;
// //       font-weight: 500;
// //       color: #8B5CF6;
// //       margin-top: 4px;
// //     }

// //     .experience-description {
// //       margin-top: 12px;
// //     }

// //     /* Education Items */
// //     .education-item {
// //       margin-bottom: 25px;
// //       position: relative;
// //       padding-left: 20px;
// //       border-left: 3px solid #8B5CF6;
// //     }

// //     .education-item:last-child {
// //       margin-bottom: 0;
// //     }

// //     .education-header {
// //       margin-bottom: 8px;
// //     }

// //     .education-title-row {
// //       display: flex;
// //       justify-content: space-between;
// //       align-items: baseline;
// //       flex-wrap: wrap;
// //       gap: 10px;
// //       margin-bottom: 6px;
// //     }

// //     .education-school {
// //       font-size: 17px;
// //       font-weight: 700;
// //       color: #1F2937;
// //     }

// //     .education-date {
// //       font-size: 12px;
// //       font-weight: 500;
// //       color: #8B5CF6;
// //       background: rgba(139, 92, 246, 0.1);
// //       padding: 3px 10px;
// //       border-radius: 20px;
// //     }

// //     .education-degree {
// //       font-size: 14px;
// //       font-weight: 500;
// //       color: #6B7280;
// //       margin-top: 4px;
// //     }

// //     .education-description {
// //       margin-top: 10px;
// //     }

// //     /* Skills - Colorful Content */
// //     .skills-container {
// //       margin-top: 10px;
// //     }

// //     .skills-content {
// //       font-size: 13px;
// //       font-weight: 500;
// //       color: #4B5563;
// //     }

// //     /* Categorized Skills */
// //     .skill-category-block {
// //       margin-bottom: 20px;
// //     }

// //     .skill-category-block:last-child {
// //       margin-bottom: 0;
// //     }

// //     .skill-category-title {
// //       font-size: 15px;
// //       font-weight: 600;
// //       color: #1F2937;
// //       margin-bottom: 10px;
// //       padding-bottom: 4px;
// //       border-bottom: 2px solid #6366F1;
// //       display: inline-block;
// //     }

// //     /* Projects */
// //     .project-links {
// //       display: flex;
// //       gap: 15px;
// //     }

// //     .project-link {
// //       font-size: 11px;
// //       font-weight: 500;
// //       color: #6366F1;
// //       text-decoration: underline;
// //     }

// //     .project-tech-stack {
// //       font-size: 12px;
// //       color: #6B7280;
// //       margin: 6px 0;
// //     }

// //     /* Custom Sections */
// //     .custom-section {
// //       margin-bottom: 22px;
// //       position: relative;
// //       padding-left: 20px;
// //       border-left: 3px solid #EC4899;
// //     }

// //     .custom-section:last-child {
// //       margin-bottom: 0;
// //     }

// //     .custom-section-title {
// //       font-size: 16px;
// //       font-weight: 700;
// //       color: #1F2937;
// //       margin-bottom: 8px;
// //     }

// //     .custom-section-content {
// //       font-size: 14px;
// //       color: #6B7280;
// //       line-height: 1.6;
// //       font-weight: 400;
// //     }

// //     /* Education Grade */
// //     .education-grade {
// //       font-size: 11px;
// //       color: #6B7280;
// //       margin-top: 4px;
// //       font-weight: 500;
// //     }

// //     /* Print Styles */
// //     @media print {
// //       @page {
// //         size: A4;
// //         margin: 0;
// //       }

// //       body {
// //         background: white;
// //         padding: 0;
// //         margin: 0;
// //       }

// //       .resume-container {
// //         max-width: 100%;
// //         margin: 0;
// //         border-radius: 0;
// //         box-shadow: none;
// //       }

// //       .resume-header {
// //         background: #6366F1 !important;
// //         -webkit-print-color-adjust: exact;
// //         print-color-adjust: exact;
// //         padding: 40px 40px 30px 40px !important;
// //       }

// //       .resume-main {
// //         padding: 35px 40px 40px 40px !important;
// //       }

// //       .resume-container p {
// //         margin: 0 0 6px 0 !important;
// //       }
// //     }

// //     /* Responsive */
// //     @media (max-width: 768px) {
// //       body {
// //         padding: 20px;
// //       }

// //       .resume-header {
// //         padding: 35px 30px 25px 30px !important;
// //       }

// //       .resume-main {
// //         padding: 30px 30px 35px 30px !important;
// //       }

// //       .name {
// //         font-size: 36px;
// //       }

// //       .job-title {
// //         font-size: 16px;
// //       }

// //       .contact-info {
// //         flex-direction: column;
// //         gap: 10px;
// //       }

// //       .section-title {
// //         font-size: 18px;
// //       }

// //       .experience-title-row {
// //         flex-direction: column;
// //         gap: 6px;
// //       }

// //       .education-title-row {
// //         flex-direction: column;
// //         gap: 6px;
// //       }

// //       .project-links {
// //         margin-top: 6px;
// //       }
// //     }
// //   `;

// //   const renderDescription = (text: string) => {
// //     if (!text) return "";
// //     return `<div class="experience-description">${cleanQuillHTML(text)}</div>`;
// //   };

// //   const generateHTML = () => {
// //     // Generate skills HTML for PDF
// //     const generateSkillsHTML = () => {
// //       if (!skills || (typeof skills === "string" && !skills.trim())) return "";

// //       const cleanedSkills = cleanQuillHTML(skills);
// //       if (!cleanedSkills || cleanedSkills === "<p><br></p>" || cleanedSkills === "") return "";

// //       return `
// //         <div class="section">
// //           <h2 class="section-title">Skills & Expertise</h2>
// //           <div class="skills-container">
// //             <div class="skills-content">${cleanedSkills}</div>
// //           </div>
// //         </div>
// //       `;
// //     };

// //     // Generate projects HTML for PDF
// //     const generateProjectsHTML = () => {
// //       if (!projects || projects.length === 0) return "";

// //       return `
// //         <div class="section">
// //           <h2 class="section-title">Projects</h2>
// //           ${projects.map((project: any) => `
// //             <div class="experience-item">
// //               <div class="experience-header">
// //                 <div class="experience-title-row">
// //                   <span class="experience-title">${project.title || ""}</span>
// //                   <div class="project-links">
// //                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
// //                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
// //                   </div>
// //                 </div>
// //                 ${project.techStack && project.techStack.length > 0 ? `
// //                   <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
// //                 ` : ""}
// //                 ${project.description ? `
// //                   <div class="experience-description">${cleanQuillHTML(project.description)}</div>
// //                 ` : ""}
// //               </div>
// //             </div>
// //           `).join("")}
// //         </div>
// //       `;
// //     };

// //     // Generate custom sections HTML for PDF
// //     const generateCustomSectionsHTML = () => {
// //       if (
// //         !finalize ||
// //         Array.isArray(finalize) ||
// //         !Array.isArray(finalize.customSection) ||
// //         !finalize.customSection.some(
// //           (s: any) => s?.name?.trim() || s?.description?.trim(),
// //         )
// //       ) {
// //         return "";
// //       }

// //       return `
// //         <div class="section">
// //           ${finalize.customSection
// //             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
// //             .map(
// //               (s: any) => `
// //               <div class="custom-section">
// //                 ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
// //                 ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
// //               </div>
// //             `,
// //             )
// //             .join("")}
// //         </div>
// //       `;
// //     };

// //     return `
// //       <!DOCTYPE html>
// //       <html>
// //       <head>
// //         <meta charset="UTF-8"/>
// //         <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
// //         <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
// //         <style>${styles}</style>
// //       </head>
// //       <body>
// //         <div class="resume-container">
// //           <!-- HEADER - GRADIENT -->
// //           <div class="resume-header">
// //             <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
// //             <div class="job-title">${
// //               contact?.jobTitle
// //                 ? typeof contact.jobTitle === "string"
// //                   ? contact.jobTitle
// //                   : (contact.jobTitle as any)?.name || ""
// //                 : ""
// //             }</div>
// //             <div class="contact-info">
// //               ${contact?.email ? `
// //                 <div class="contact-item">
// //                   <span class="contact-icon">📧</span>
// //                   <span>${contact.email}</span>
// //                 </div>
// //               ` : ""}
// //               ${contact?.phone ? `
// //                 <div class="contact-item">
// //                   <span class="contact-icon">📱</span>
// //                   <span>${contact.phone}</span>
// //                 </div>
// //               ` : ""}
// //               ${formattedDob ? `
// //                 <div class="contact-item">
// //                   <span class="contact-icon">🎂</span>
// //                   <span>${formattedDob}</span>
// //                 </div>
// //               ` : ""}
// //             </div>
// //             ${addressParts.length ? `<div class="address">📍 ${addressParts.join(" • ")}</div>` : ""}
// //             <div class="links">
// //               ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">🔗 LinkedIn</a>` : ""}
// //               ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item">🐙 GitHub</a>` : ""}
// //               ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">🎨 Portfolio</a>` : ""}
// //             </div>
// //           </div>

// //           <!-- MAIN CONTENT -->
// //           <div class="resume-main">
// //             <!-- SUMMARY -->
// //             ${summary ? `
// //               <div class="section">
// //                 <h2 class="section-title">About Me</h2>
// //                 <div class="summary-text">${cleanQuillHTML(summary)}</div>
// //               </div>
// //             ` : ""}

// //             <!-- EXPERIENCE -->
// //             ${experiences.length > 0 ? `
// //               <div class="section">
// //                 <h2 class="section-title">Work Experience</h2>
// //                 ${experiences.map((exp) => {
// //                   const startFormatted = formatMonthYear(exp.startDate, false);
// //                   const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
// //                   const companyLocation = [exp.employer, exp.location].filter(Boolean).join(" • ");
// //                   return `
// //                     <div class="experience-item">
// //                       <div class="experience-header">
// //                         <div class="experience-title-row">
// //                           <span class="experience-title">${exp.jobTitle || ""}</span>
// //                           <span class="experience-date">${startFormatted} — ${endFormatted}</span>
// //                         </div>
// //                         <div class="experience-company">${companyLocation}</div>
// //                       </div>
// //                       ${exp.text ? renderDescription(exp.text) : ""}
// //                     </div>
// //                   `;
// //                 }).join("")}
// //               </div>
// //             ` : ""}

// //             <!-- PROJECTS -->
// //             ${generateProjectsHTML()}

// //             <!-- EDUCATION -->
// //             ${educations.length > 0 ? `
// //               <div class="section">
// //                 <h2 class="section-title">Education</h2>
// //                 ${educations.map((edu) => {
// //                   const dateStr = edu.startDate || edu.endDate
// //                     ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " — " : ""}${edu.endDate || ""}`
// //                     : "";
// //                   const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
// //                   const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
// //                   return `
// //                     <div class="education-item">
// //                       <div class="education-header">
// //                         <div class="education-title-row">
// //                           <span class="education-school">${edu.schoolname || ""}</span>
// //                           ${dateStr ? `<span class="education-date">${dateStr}</span>` : ""}
// //                         </div>
// //                         ${edu.degree ? `<div class="education-degree">${edu.degree}</div>` : ""}
// //                         ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
// //                       </div>
// //                       ${eduTextHtml ? `<div class="education-description">${eduTextHtml}</div>` : ""}
// //                     </div>
// //                   `;
// //                 }).join("")}
// //               </div>
// //             ` : ""}

// //             <!-- SKILLS -->
// //             ${generateSkillsHTML()}

// //             <!-- CUSTOM SECTIONS -->
// //             ${generateCustomSectionsHTML()}
// //           </div>
// //         </div>
// //       </body>
// //       </html>
// //     `;
// //   };

// //   const handleDownload = async () => {
// //     try {
// //       const html = generateHTML();
// //       const res = await axios.post(
// //         `${API_URL}/api/candidates/generate-pdf`,
// //         { html },
// //         { responseType: "blob" }
// //       );
// //       const url = URL.createObjectURL(res.data);
// //       const a = document.createElement("a");
// //       a.href = url;
// //       a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
// //       document.body.appendChild(a);
// //       a.click();
// //       document.body.removeChild(a);
// //       URL.revokeObjectURL(url);
// //     } catch (error) {
// //       console.error("Error generating PDF:", error);
// //       alert("Failed to generate PDF. Please try again.");
// //     }
// //   };

// //   return (
// //     <div style={{ textAlign: "left", marginTop: 0 }}>
// //       {lastSegment === "download-resume" && (
// //         <div className="text-center my-5">
// //           <motion.button
// //             onClick={handleDownload}
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //             className="bg-indigo-500 text-2xl md:text-base hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg"
// //           >
// //             📄 Download Resume
// //           </motion.button>
// //         </div>
// //       )}

// //       {/* Resume Preview */}
// //       <div className={`resume-container ${alldata ? 'is-preview' : ''}`} style={{ margin: "0 auto" }}>
// //         <style>{styles}</style>

// //         {/* HEADER - GRADIENT */}
// //         <div className="resume-header">
// //           <h1 className="name">
// //             {contact?.firstName} {contact?.lastName}
// //           </h1>
// //           <div className="job-title">
// //             {contact?.jobTitle
// //               ? typeof contact.jobTitle === "string"
// //                 ? contact.jobTitle
// //                 : (contact.jobTitle as any)?.name || ""
// //               : ""}
// //           </div>
// //           <div className="contact-info">
// //             {contact?.email && (
// //               <div className="contact-item">
// //                 <span className="contact-icon">📧</span>
// //                 <span>{contact.email}</span>
// //               </div>
// //             )}
// //             {contact?.phone && (
// //               <div className="contact-item">
// //                 <span className="contact-icon">📱</span>
// //                 <span>{contact.phone}</span>
// //               </div>
// //             )}
// //             {formattedDob && (
// //               <div className="contact-item">
// //                 <span className="contact-icon">🎂</span>
// //                 <span>{formattedDob}</span>
// //               </div>
// //             )}
// //           </div>
// //           {addressParts.length > 0 && (
// //             <div className="address">📍 {addressParts.join(" • ")}</div>
// //           )}
// //           <div className="links">
// //             {linkedinUrl && (
// //               <a
// //                 href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
// //                 className="link-item"
// //                 target="_blank"
// //                 rel="noreferrer"
// //               >
// //                 🔗 LinkedIn
// //               </a>
// //             )}
// //             {githubUrl && (
// //               <a
// //                 href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}
// //                 className="link-item"
// //                 target="_blank"
// //                 rel="noreferrer"
// //               >
// //                 🐙 GitHub
// //               </a>
// //             )}
// //             {portfolioUrl && (
// //               <a
// //                 href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
// //                 className="link-item"
// //                 target="_blank"
// //                 rel="noreferrer"
// //               >
// //                 🎨 Portfolio
// //               </a>
// //             )}
// //           </div>
// //         </div>

// //         {/* MAIN CONTENT */}
// //         <div className="resume-main">
// //           {/* SUMMARY */}
// //           {summary && (
// //             <div className="section">
// //               <h2 className="section-title">About Me</h2>
// //               <div
// //                 className="summary-text"
// //                 dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }}
// //               />
// //             </div>
// //           )}

// //           {/* EXPERIENCE */}
// //           {experiences.length > 0 && (
// //             <div className="section">
// //               <h2 className="section-title">Work Experience</h2>
// //               {experiences.map((exp, i) => {
// //                 const start = formatMonthYear(exp.startDate, false);
// //                 const end = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
// //                 const companyLocation = [exp.employer, exp.location].filter(Boolean).join(" • ");
// //                 return (
// //                   <div key={i} className="experience-item">
// //                     <div className="experience-header">
// //                       <div className="experience-title-row">
// //                         <span className="experience-title">{exp.jobTitle}</span>
// //                         <span className="experience-date">{start} — {end}</span>
// //                       </div>
// //                       <div className="experience-company">{companyLocation}</div>
// //                     </div>
// //                     {exp.text && (
// //                       <div
// //                         className="experience-description"
// //                         dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }}
// //                       />
// //                     )}
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           )}

// //           {/* PROJECTS */}
// //           {renderProjects()}

// //           {/* EDUCATION */}
// //           {educations.length > 0 && (
// //             <div className="section">
// //               <h2 className="section-title">Education</h2>
// //               {educations.map((edu, i) => {
// //                 const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
// //                 const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
// //                 return (
// //                   <div key={i} className="education-item">
// //                     <div className="education-header">
// //                       <div className="education-title-row">
// //                         <span className="education-school">{edu.schoolname}</span>
// //                         {(edu.startDate || edu.endDate) && (
// //                           <span className="education-date">
// //                             {edu.startDate || ""}
// //                             {edu.startDate && edu.endDate && " — "}
// //                             {edu.endDate || ""}
// //                           </span>
// //                         )}
// //                       </div>
// //                       {edu.degree && <div className="education-degree">{edu.degree}</div>}
// //                       {formattedGrade && <div className="education-grade">{formattedGrade}</div>}
// //                     </div>
// //                     {eduTextHtml && (
// //                       <div
// //                         className="education-description"
// //                         dangerouslySetInnerHTML={{ __html: eduTextHtml }}
// //                       />
// //                     )}
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           )}

// //           {/* SKILLS */}
// //           {renderSkills()}

// //           {/* CUSTOM SECTIONS */}
// //           {finalize &&
// //             !Array.isArray(finalize) &&
// //             Array.isArray(finalize.customSection) &&
// //             finalize.customSection.some(
// //               (s) => s?.name?.trim() || s?.description?.trim()
// //             ) && (
// //               <div className="section">
// //                 {finalize.customSection.map(
// //                   (section, i) =>
// //                     (section?.name?.trim() || section?.description?.trim()) && (
// //                       <div key={i} className="custom-section">
// //                         {section.name && (
// //                           <h3 className="custom-section-title">{section.name}</h3>
// //                         )}
// //                         {section.description && (
// //                           <div
// //                             className="custom-section-content"
// //                             dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }}
// //                           />
// //                         )}
// //                       </div>
// //                     )
// //                 )}
// //               </div>
// //             )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TemplateFifteen;

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
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";

// const TemplateFifteen: React.FC<ResumeProps> = ({ alldata }) => {
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

//     if (
//       !cleanedSkills ||
//       cleanedSkills === "<p><br></p>" ||
//       cleanedSkills === ""
//     )
//       return null;

//     return (
//       <div className="t15-section">
//         <h2 className="t15-section-title">Skills & Expertise</h2>
//         <div className="t15-skills-container">
//           <div
//             className="t15-skills-content"
//             dangerouslySetInnerHTML={{ __html: cleanedSkills }}
//           />
//         </div>
//       </div>
//     );
//   };

//   // Helper function to render projects
//   const renderProjects = () => {
//     if (!projects || projects.length === 0) return null;

//     return (
//       <div className="t15-section">
//         <h2 className="t15-section-title">Projects</h2>
//         {projects.map((project: any, index: number) => (
//           <div key={project.id || index} className="t15-experience-item">
//             <div className="t15-experience-header">
//               <div className="t15-experience-title-row">
//                 <span className="t15-experience-title">{project.title}</span>
//                 {(project.liveUrl || project.githubUrl) && (
//                   <div className="t15-project-links">
//                     {project.liveUrl && (
//                       <a
//                         href={
//                           project.liveUrl.startsWith("http")
//                             ? project.liveUrl
//                             : `https://${project.liveUrl}`
//                         }
//                         target="_blank"
//                         rel="noreferrer"
//                         className="t15-project-link"
//                       >
//                         Live Demo
//                       </a>
//                     )}
//                     {project.githubUrl && (
//                       <a
//                         href={
//                           project.githubUrl.startsWith("http")
//                             ? project.githubUrl
//                             : `https://${project.githubUrl}`
//                         }
//                         target="_blank"
//                         rel="noreferrer"
//                         className="t15-project-link"
//                       >
//                         GitHub
//                       </a>
//                     )}
//                   </div>
//                 )}
//               </div>
//               {project.techStack && project.techStack.length > 0 && (
//                 <div className="t15-project-tech-stack">
//                   <strong>Tech:</strong> {project.techStack.join(" • ")}
//                 </div>
//               )}
//               {project.description && (
//                 <div
//                   className="t15-experience-description"
//                   dangerouslySetInnerHTML={{
//                     __html: cleanQuillHTML(project.description),
//                   }}
//                 />
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   /* ======================================================
//      CSS — CREATIVE COLORFUL RESUME
//   ====================================================== */
//   const styles = `
//     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

    
//  .t15-resume-container   body {
//       font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//       background: linear-gradient(135deg, #f5f7fa 0%, #e9eef5 100%);
//       line-height: 1.5;
//       color: #1F2937;
//     }

//     .t15-resume-container {
//       max-width: 210mm;
//       margin: 0 auto;
//       background: white;
//       border-radius: 24px;
//       box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
//       overflow: hidden;
//     }

//     .t15-resume-container.is-preview {
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

//     /* Fix p tag spacing */
//     .t15-resume-container p {
//       margin: 0 0 6px 0 !important;
//       padding: 0 !important;
//       line-height: 1.6 !important;
//     }

//     .t15-resume-container p:last-child {
//       margin-bottom: 0 !important;
//     }

//     /* Rich text content styles */
//     .t15-resume-container .t15-experience-description ul,
//     .t15-resume-container .t15-experience-description ol,
//     .t15-resume-container .t15-education-description ul,
//     .t15-resume-container .t15-education-description ol,
//     .t15-resume-container .t15-skills-content ul,
//     .t15-resume-container .t15-skills-content ol,
//     .t15-resume-container .t15-custom-section-content ul,
//     .t15-resume-container .t15-custom-section-content ol {
//       margin: 6px 0 6px 20px !important;
//       padding-left: 20px !important;
//     }

//     .t15-resume-container .t15-experience-description li,
//     .t15-resume-container .t15-education-description li,
//     .t15-resume-container .t15-skills-content li,
//     .t15-resume-container .t15-custom-section-content li {
//       margin-bottom: 4px !important;
//       line-height: 1.6 !important;
//     }

//     .t15-resume-container .t15-experience-description ul,
//     .t15-resume-container .t15-education-description ul,
//     .t15-resume-container .t15-skills-content ul,
//     .t15-resume-container .t15-custom-section-content ul {
//       list-style-type: disc !important;
//     }

//     .t15-resume-container .t15-experience-description ol,
//     .t15-resume-container .t15-education-description ol,
//     .t15-resume-container .t15-skills-content ol,
//     .t15-resume-container .t15-custom-section-content ol {
//       list-style-type: decimal !important;
//     }

//     .t15-resume-container .t15-experience-description strong,
//     .t15-resume-container .t15-education-description strong,
//     .t15-resume-container .t15-skills-content strong,
//     .t15-resume-container .t15-custom-section-content strong {
//       font-weight: 700 !important;
//     }

//     .t15-resume-container .t15-experience-description em,
//     .t15-resume-container .t15-education-description em,
//     .t15-resume-container .t15-skills-content em,
//     .t15-resume-container .t15-custom-section-content em {
//       font-style: italic !important;
//     }

//     .t15-resume-container .t15-experience-description u,
//     .t15-resume-container .t15-education-description u,
//     .t15-resume-container .t15-skills-content u,
//     .t15-resume-container .t15-custom-section-content u {
//       text-decoration: underline !important;
//     }

//     /* Preserve spaces in content */
//     .t15-resume-container .t15-experience-description p,
//     .t15-resume-container .t15-education-description p,
//     .t15-resume-container .t15-skills-content p,
//     .t15-resume-container .t15-custom-section-content p {
//       white-space: pre-wrap !important;
//     }

//     /* Skills content styling */
//     .t15-resume-container .t15-skills-content {
//       font-size: 13px;
//       font-weight: 500;
//       color: #4B5563;
//       line-height: 1.6;
//     }

//     /* Header Section - Gradient Background */
//     .t15-resume-container .t15-resume-header {
//       padding: 50px 50px 40px 50px;
//       background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
//       color: white;
//       position: relative;
//     }

//     .t15-resume-container .t15-resume-header::after {
//       content: '';
//       position: absolute;
//       bottom: 0;
//       left: 0;
//       right: 0;
//       height: 4px;
//       background: linear-gradient(90deg, #EC4899, #6366F1, #8B5CF6);
//     }

//     .t15-resume-container .t15-name {
//       font-size: 48px;
//       font-weight: 800;
//       letter-spacing: -0.02em;
//       margin-bottom: 12px;
//       color: white;
//       line-height: 1.2;
//     }

//     .t15-resume-container .t15-job-title {
//       font-size: 18px;
//       font-weight: 500;
//       color: rgba(255, 255, 255, 0.9);
//       letter-spacing: 0.5px;
//       margin-bottom: 25px;
//       padding-bottom: 20px;
//       border-bottom: 2px solid rgba(255, 255, 255, 0.2);
//     }

//     .t15-resume-container .t15-contact-info {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 30px;
//       margin-top: 15px;
//     }

//     .t15-resume-container .t15-contact-item {
//       display: flex;
//       align-items: center;
//       gap: 10px;
//       font-size: 13px;
//       color: rgba(255, 255, 255, 0.9);
//     }

//     .t15-resume-container .t15-contact-icon {
//       font-size: 16px;
//     }

//     .t15-resume-container .t15-address {
//       font-size: 13px;
//       color: rgba(255, 255, 255, 0.9);
//       margin-top: 12px;
//     }

//     .t15-resume-container .t15-links {
//       margin-top: 15px;
//       display: flex;
//       flex-wrap: wrap;
//       gap: 20px;
//     }

//     .t15-resume-container .t15-link-item {
//       color: rgba(255, 255, 255, 0.9);
//       text-decoration: none;
//       font-size: 13px;
//       display: inline-flex;
//       align-items: center;
//       gap: 6px;
//       transition: all 0.2s;
//     }

//     /* Main Content */
//     .t15-resume-container .t15-resume-main {
//       padding: 45px 50px 50px 50px;
//     }

//     /* Section Styles */
//     .t15-resume-container .t15-section {
//       margin-bottom: 35px;
//     }

//     .t15-resume-container .t15-section:last-child {
//       margin-bottom: 0;
//     }

//     .t15-resume-container .t15-section-title {
//       font-size: 20px;
//       font-weight: 700;
//       color: #1F2937;
//       margin-bottom: 20px;
//       padding-bottom: 8px;
//       border-bottom: 3px solid #6366F1;
//       display: inline-block;
//       letter-spacing: -0.3px;
//     }

//     /* Summary */
//     .t15-resume-container .t15-summary-text {
//       font-size: 14px;
//       line-height: 1.7;
//       color: #6B7280;
//       font-weight: 400;
//     }

//     /* Experience Items */
//     .t15-resume-container .t15-experience-item {
//       margin-bottom: 30px;
//       position: relative;
//       padding-left: 20px;
//       border-left: 3px solid #6366F1;
//     }

//     .t15-resume-container .t15-experience-item:last-child {
//       margin-bottom: 0;
//     }

//     .t15-resume-container .t15-experience-header {
//       margin-bottom: 10px;
//     }

//     .t15-resume-container .t15-experience-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t15-resume-container .t15-experience-title {
//       font-size: 18px;
//       font-weight: 700;
//       color: #1F2937;
//     }

//     .t15-resume-container .t15-experience-date {
//       font-size: 12px;
//       font-weight: 500;
//       color: #6366F1;
//       background: rgba(99, 102, 241, 0.1);
//       padding: 3px 10px;
//       border-radius: 20px;
//     }

//     .t15-resume-container .t15-experience-company {
//       font-size: 14px;
//       font-weight: 500;
//       color: #8B5CF6;
//       margin-top: 4px;
//     }

//     .t15-resume-container .t15-experience-description {
//       margin-top: 12px;
//     }

//     /* Education Items */
//     .t15-resume-container .t15-education-item {
//       margin-bottom: 25px;
//       position: relative;
//       padding-left: 20px;
//       border-left: 3px solid #8B5CF6;
//     }

//     .t15-resume-container .t15-education-item:last-child {
//       margin-bottom: 0;
//     }

//     .t15-resume-container .t15-education-header {
//       margin-bottom: 8px;
//     }

//     .t15-resume-container .t15-education-title-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: baseline;
//       flex-wrap: wrap;
//       gap: 10px;
//       margin-bottom: 6px;
//     }

//     .t15-resume-container .t15-education-school {
//       font-size: 17px;
//       font-weight: 700;
//       color: #1F2937;
//     }

//     .t15-resume-container .t15-education-date {
//       font-size: 12px;
//       font-weight: 500;
//       color: #8B5CF6;
//       background: rgba(139, 92, 246, 0.1);
//       padding: 3px 10px;
//       border-radius: 20px;
//     }

//     .t15-resume-container .t15-education-degree {
//       font-size: 14px;
//       font-weight: 500;
//       color: #6B7280;
//       margin-top: 4px;
//     }

//     .t15-resume-container .t15-education-description {
//       margin-top: 10px;
//     }

//     /* Skills - Colorful Content */
//     .t15-resume-container .t15-skills-container {
//       margin-top: 10px;
//     }

//     /* Projects */
//     .t15-resume-container .t15-project-links {
//       display: flex;
//       gap: 15px;
//     }

//     .t15-resume-container .t15-project-link {
//       font-size: 11px;
//       font-weight: 500;
//       color: #6366F1;
//       text-decoration: underline;
//     }

//     .t15-resume-container .t15-project-tech-stack {
//       font-size: 12px;
//       color: #6B7280;
//       margin: 6px 0;
//     }

//     /* Custom Sections */
//     .t15-resume-container .t15-custom-section {
//       margin-bottom: 22px;
//       position: relative;
//       padding-left: 20px;
//       border-left: 3px solid #EC4899;
//     }

//     .t15-resume-container .t15-custom-section:last-child {
//       margin-bottom: 0;
//     }

//     .t15-resume-container .t15-custom-section-title {
//       font-size: 16px;
//       font-weight: 700;
//       color: #1F2937;
//       margin-bottom: 8px;
//     }

//     .t15-resume-container .t15-custom-section-content {
//       font-size: 14px;
//       color: #6B7280;
//       line-height: 1.6;
//       font-weight: 400;
//     }

//     /* Education Grade */
//     .t15-resume-container .t15-education-grade {
//       font-size: 11px;
//       color: #6B7280;
//       margin-top: 4px;
//       font-weight: 500;
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

//       .t15-resume-container {
//         max-width: 100%;
//         margin: 0;
//         border-radius: 0;
//         box-shadow: none;
//       }

//       .t15-resume-container .t15-resume-header {
//         background: #6366F1 !important;
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//         padding: 40px 40px 30px 40px !important;
//       }

//       .t15-resume-container .t15-resume-main {
//         padding: 35px 40px 40px 40px !important;
//       }

//       .t15-resume-container p {
//         margin: 0 0 6px 0 !important;
//       }
//     }

//     /* Responsive */
//     @media (max-width: 768px) {
//       body {
//         padding: 20px;
//       }

//       .t15-resume-container .t15-resume-header {
//         padding: 35px 30px 25px 30px !important;
//       }

//       .t15-resume-container .t15-resume-main {
//         padding: 30px 30px 35px 30px !important;
//       }

//       .t15-resume-container .t15-name {
//         font-size: 36px;
//       }

//       .t15-resume-container .t15-job-title {
//         font-size: 16px;
//       }

//       .t15-resume-container .t15-contact-info {
//         flex-direction: column;
//         gap: 10px;
//       }

//       .t15-resume-container .t15-section-title {
//         font-size: 18px;
//       }

//       .t15-resume-container .t15-experience-title-row {
//         flex-direction: column;
//         gap: 6px;
//       }

//       .t15-resume-container .t15-education-title-row {
//         flex-direction: column;
//         gap: 6px;
//       }

//       .t15-resume-container .t15-project-links {
//         margin-top: 6px;
//       }
//     }
//   `;

//   const renderDescription = (text: string) => {
//     if (!text) return "";
//     return `<div class="t15-experience-description">${cleanQuillHTML(text)}</div>`;
//   };

//   const generateHTML = () => {
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
//         <div class="t15-section">
//           <h2 class="t15-section-title">Skills & Expertise</h2>
//           <div class="t15-skills-container">
//             <div class="t15-skills-content">${cleanedSkills}</div>
//           </div>
//         </div>
//       `;
//     };

//     // Generate projects HTML for PDF
//     const generateProjectsHTML = () => {
//       if (!projects || projects.length === 0) return "";

//       return `
//         <div class="t15-section">
//           <h2 class="t15-section-title">Projects</h2>
//           ${projects
//             .map(
//               (project: any) => `
//             <div class="t15-experience-item">
//               <div class="t15-experience-header">
//                 <div class="t15-experience-title-row">
//                   <span class="t15-experience-title">${project.title || ""}</span>
//                   <div class="t15-project-links">
//                     ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="t15-project-link">Live Demo</a>` : ""}
//                     ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="t15-project-link">GitHub</a>` : ""}
//                   </div>
//                 </div>
//                 ${
//                   project.techStack && project.techStack.length > 0
//                     ? `
//                   <div class="t15-project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(" • ")}</div>
//                 `
//                     : ""
//                 }
//                 ${
//                   project.description
//                     ? `
//                   <div class="t15-experience-description">${cleanQuillHTML(project.description)}</div>
//                 `
//                     : ""
//                 }
//               </div>
//             </div>
//           `,
//             )
//             .join("")}
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
//         <div class="t15-section">
//           ${finalize.customSection
//             .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//             .map(
//               (s: any) => `
//               <div class="t15-custom-section">
//                 ${s.name ? `<h3 class="t15-custom-section-title">${s.name}</h3>` : ""}
//                 ${s.description ? `<div class="t15-custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
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
//         <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
//         <style>${styles}</style>
//       </head>
//       <body>
//         <div class="t15-resume-container">
//           <!-- HEADER - GRADIENT -->
//           <div class="t15-resume-header">
//             <h1 class="t15-name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
//             <div class="t15-job-title">${
//               contact?.jobTitle
//                 ? typeof contact.jobTitle === "string"
//                   ? contact.jobTitle
//                   : (contact.jobTitle as any)?.name || ""
//                 : ""
//             }</div>
//             <div class="t15-contact-info">
//               ${
//                 contact?.email
//                   ? `
//                 <div class="t15-contact-item">
//                   <span class="t15-contact-icon">📧</span>
//                   <span>${contact.email}</span>
//                 </div>
//               `
//                   : ""
//               }
//               ${
//                 contact?.phone
//                   ? `
//                 <div class="t15-contact-item">
//                   <span class="t15-contact-icon">📱</span>
//                   <span>${contact.phone}</span>
//                 </div>
//               `
//                   : ""
//               }
//               ${
//                 formattedDob
//                   ? `
//                 <div class="t15-contact-item">
//                   <span class="t15-contact-icon">🎂</span>
//                   <span>${formattedDob}</span>
//                 </div>
//               `
//                   : ""
//               }
//             </div>
//             ${addressParts.length ? `<div class="t15-address">📍 ${addressParts.join(" • ")}</div>` : ""}
//             <div class="t15-links">
//               ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t15-link-item">🔗 LinkedIn</a>` : ""}
//               ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="t15-link-item">🐙 GitHub</a>` : ""}
//               ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="t15-link-item">🎨 Portfolio</a>` : ""}
//             </div>
//           </div>

//           <!-- MAIN CONTENT -->
//           <div class="t15-resume-main">
//             <!-- SUMMARY -->
//             ${
//               summary
//                 ? `
//               <div class="t15-section">
//                 <h2 class="t15-section-title">About Me</h2>
//                 <div class="t15-summary-text">${cleanQuillHTML(summary)}</div>
//               </div>
//             `
//                 : ""
//             }

//             <!-- EXPERIENCE -->
//             ${
//               experiences.length > 0
//                 ? `
//               <div class="t15-section">
//                 <h2 class="t15-section-title">Work Experience</h2>
//                 ${experiences
//                   .map((exp) => {
//                     const startFormatted = formatMonthYear(
//                       exp.startDate,
//                       false,
//                     );
//                     const endFormatted = exp.endDate
//                       ? formatMonthYear(exp.endDate, false)
//                       : "Present";
//                     const companyLocation = [exp.employer, exp.location]
//                       .filter(Boolean)
//                       .join(" • ");
//                     return `
//                     <div class="t15-experience-item">
//                       <div class="t15-experience-header">
//                         <div class="t15-experience-title-row">
//                           <span class="t15-experience-title">${exp.jobTitle || ""}</span>
//                           <span class="t15-experience-date">${startFormatted} — ${endFormatted}</span>
//                         </div>
//                         <div class="t15-experience-company">${companyLocation}</div>
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
//               <div class="t15-section">
//                 <h2 class="t15-section-title">Education</h2>
//                 ${educations
//                   .map((edu) => {
//                     const dateStr =
//                       edu.startDate || edu.endDate
//                         ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " — " : ""}${edu.endDate || ""}`
//                         : "";
//                     const formattedGrade = formatGradeToCgpdAndPercentage(
//                       edu.grade || "",
//                     );
//                     const eduTextHtml = edu.text
//                       ? cleanQuillHTML(edu.text)
//                       : "";
//                     return `
//                     <div class="t15-education-item">
//                       <div class="t15-education-header">
//                         <div class="t15-education-title-row">
//                           <span class="t15-education-school">${edu.schoolname || ""}</span>
//                           ${dateStr ? `<span class="t15-education-date">${dateStr}</span>` : ""}
//                         </div>
//                         ${edu.degree ? `<div class="t15-education-degree">${edu.degree}</div>` : ""}
//                         ${formattedGrade ? `<div class="t15-education-grade">${formattedGrade}</div>` : ""}
//                       </div>
//                       ${eduTextHtml ? `<div class="t15-education-description">${eduTextHtml}</div>` : ""}
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
//             className="bg-indigo-500 text-2xl md:text-base hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg"
//           >
//             📄 Download Resume
//           </motion.button>
//         </div>
//       )}

//       {/* Resume Preview */}
//       <div
//         className={`t15-resume-container ${alldata ? "is-preview" : ""}`}
//         style={{ margin: "0 auto" }}
//       >
//         <style>{styles}</style>

//         {/* HEADER - GRADIENT */}
//         <div className="t15-resume-header">
//           <h1 className="t15-name">
//             {contact?.firstName} {contact?.lastName}
//           </h1>
//           <div className="t15-job-title">
//             {contact?.jobTitle
//               ? typeof contact.jobTitle === "string"
//                 ? contact.jobTitle
//                 : (contact.jobTitle as any)?.name || ""
//               : ""}
//           </div>
//           <div className="t15-contact-info">
//             {contact?.email && (
//               <div className="t15-contact-item">
//                 <span className="t15-contact-icon">📧</span>
//                 <span>{contact.email}</span>
//               </div>
//             )}
//             {contact?.phone && (
//               <div className="t15-contact-item">
//                 <span className="t15-contact-icon">📱</span>
//                 <span>{contact.phone}</span>
//               </div>
//             )}
//             {formattedDob && (
//               <div className="t15-contact-item">
//                 <span className="t15-contact-icon">🎂</span>
//                 <span>{formattedDob}</span>
//               </div>
//             )}
//           </div>
//           {addressParts.length > 0 && (
//             <div className="t15-address">📍 {addressParts.join(" • ")}</div>
//           )}
//           <div className="t15-links">
//             {linkedinUrl && (
//               <a
//                 href={
//                   linkedinUrl.startsWith("http")
//                     ? linkedinUrl
//                     : `https://${linkedinUrl}`
//                 }
//                 className="t15-link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 🔗 LinkedIn
//               </a>
//             )}
//             {githubUrl && (
//               <a
//                 href={
//                   githubUrl.startsWith("http")
//                     ? githubUrl
//                     : `https://${githubUrl}`
//                 }
//                 className="t15-link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 🐙 GitHub
//               </a>
//             )}
//             {portfolioUrl && (
//               <a
//                 href={
//                   portfolioUrl.startsWith("http")
//                     ? portfolioUrl
//                     : `https://${portfolioUrl}`
//                 }
//                 className="t15-link-item"
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 🎨 Portfolio
//               </a>
//             )}
//           </div>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="t15-resume-main">
//           {/* SUMMARY */}
//           {summary && (
//             <div className="t15-section">
//               <h2 className="t15-section-title">About Me</h2>
//               <div
//                 className="t15-summary-text"
//                 dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary) }}
//               />
//             </div>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <div className="t15-section">
//               <h2 className="t15-section-title">Work Experience</h2>
//               {experiences.map((exp, i) => {
//                 const start = formatMonthYear(exp.startDate, false);
//                 const end = exp.endDate
//                   ? formatMonthYear(exp.endDate, false)
//                   : "Present";
//                 const companyLocation = [exp.employer, exp.location]
//                   .filter(Boolean)
//                   .join(" • ");
//                 return (
//                   <div key={i} className="t15-experience-item">
//                     <div className="t15-experience-header">
//                       <div className="t15-experience-title-row">
//                         <span className="t15-experience-title">
//                           {exp.jobTitle}
//                         </span>
//                         <span className="t15-experience-date">
//                           {start} — {end}
//                         </span>
//                       </div>
//                       <div className="t15-experience-company">
//                         {companyLocation}
//                       </div>
//                     </div>
//                     {exp.text && (
//                       <div
//                         className="t15-experience-description"
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
//             <div className="t15-section">
//               <h2 className="t15-section-title">Education</h2>
//               {educations.map((edu, i) => {
//                 const formattedGrade = formatGradeToCgpdAndPercentage(
//                   edu.grade || "",
//                 );
//                 const eduTextHtml = edu.text ? cleanQuillHTML(edu.text) : "";
//                 return (
//                   <div key={i} className="t15-education-item">
//                     <div className="t15-education-header">
//                       <div className="t15-education-title-row">
//                         <span className="t15-education-school">
//                           {edu.schoolname}
//                         </span>
//                         {(edu.startDate || edu.endDate) && (
//                           <span className="t15-education-date">
//                             {edu.startDate || ""}
//                             {edu.startDate && edu.endDate && " — "}
//                             {edu.endDate || ""}
//                           </span>
//                         )}
//                       </div>
//                       {edu.degree && (
//                         <div className="t15-education-degree">{edu.degree}</div>
//                       )}
//                       {formattedGrade && (
//                         <div className="t15-education-grade">
//                           {formattedGrade}
//                         </div>
//                       )}
//                     </div>
//                     {eduTextHtml && (
//                       <div
//                         className="t15-education-description"
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
//               (s) => s?.name?.trim() || s?.description?.trim(),
//             ) && (
//               <div className="t15-section">
//                 {finalize.customSection.map(
//                   (section, i) =>
//                     (section?.name?.trim() || section?.description?.trim()) && (
//                       <div key={i} className="t15-custom-section">
//                         {section.name && (
//                           <h3 className="t15-custom-section-title">
//                             {section.name}
//                           </h3>
//                         )}
//                         {section.description && (
//                           <div
//                             className="t15-custom-section-content"
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

// export default TemplateFifteen;

























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
import {
  cleanQuillHTML,
  formatDateOfBirth,
  formatGradeToCgpdAndPercentage,
  formatMonthYear,
} from "@/app/utils";
import { ResumeProps } from "@/app/types";
import api from "@/app/utils/api";
import {
  ResumeCustomization,
  SectionKey,
  DEFAULT_TWO_COLUMN_ORDER,
} from "@/app/(resume)/download-resume/page";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FaDownload, FaSpinner } from "react-icons/fa";

// ─────────────────────────────────────────────────────────────────────────────
// A4 CONSTANTS (same as TemplateTwo)
// ─────────────────────────────────────────────────────────────────────────────
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 50;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;

interface TemplateFifteenProps extends ResumeProps {
  customization?: ResumeCustomization;
}

const TemplateFifteen: React.FC<TemplateFifteenProps> = ({ alldata, customization }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

  // ── Customization defaults ────────────────────────────────────────────────
  const activeFontFamily = customization?.fontFamily ?? "'Inter', sans-serif";
  const activeLeftOrder: SectionKey[] = customization?.twoColumnOrder?.left ?? [...DEFAULT_TWO_COLUMN_ORDER.left];
  const activeRightOrder: SectionKey[] = customization?.twoColumnOrder?.right ?? [...DEFAULT_TWO_COLUMN_ORDER.right];

  // ── Data sources ──────────────────────────────────────────────────────────
  const contact = alldata?.contact || context?.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills?.text || context?.skills?.text || "";
  const projects = alldata?.projects || context?.projects || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";

  const linkedinUrl = contact?.linkedIn;
  const portfolioUrl = contact?.portfolio;
  const githubUrl = contact?.github;
  const dateOfBirth = contact?.dob;

  // ── Photo → base64 ────────────────────────────────────────────────────────
  const [base64Image, setBase64Image] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    const processImage = async () => {
      if (!contact.photo) {
        setBase64Image(null);
        return;
      }
      try {
        if (typeof contact.photo === "string") {
          if (contact.photo.startsWith("blob:")) {
            const res = await fetch(contact.photo);
            const blob = await res.blob();
            const reader = new FileReader();
            reader.onloadend = () => setBase64Image(reader.result as string);
            reader.readAsDataURL(blob);
          } else {
            setBase64Image(`${API_URL}/api/uploads/photos/${contact.photo}`);
          }
        } else if (
          contact.photo &&
          typeof contact.photo === "object" &&
          "size" in contact.photo
        ) {
          objectUrl = URL.createObjectURL(contact.photo as Blob);
          const reader = new FileReader();
          reader.onloadend = () => setBase64Image(reader.result as string);
          reader.readAsDataURL(contact.photo as Blob);
        }
      } catch (err) {
        console.error("Error processing image:", err);
      }
    };
    processImage();
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [contact.photo]);

  // ── Font import map ────────────────────────────────────────────────────────
  const getFontImport = (fontFamily: string): string => {
    const map: Record<string, string> = {
      "'Inter', sans-serif": "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      "'-apple-system', 'BlinkMacSystemFont', sans-serif": "",
      "'Poppins', sans-serif": "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
      "'Lato', sans-serif": "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
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
    return map[fontFamily] || map["'Inter', sans-serif"];
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes("serif")) return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes("monospace")) return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  // ── CSS builder (Deedy CV styling) ────────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @import url('${getFontImport(fontFamily)}');

    @page { size: A4; margin: 0; }

    *, *::before, *::after { box-sizing: border-box; }

    html, body { margin: 0; padding: 0; background: white; }

    .t3-resume {
      width: ${A4_W}px;
      padding: ${MARGIN}px;
      background: white;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 11px;
      line-height: 1.4;
      color: #333;
    }

    .t3-resume div, .t3-resume span, .t3-resume i, .t3-resume a,
    .t3-resume p, .t3-resume li, .t3-resume strong, .t3-resume b {
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
    }

    .t3-resume p {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.4 !important;
    }

    .t3-resume ul, .t3-resume ol {
      margin: 4px 0 4px 18px !important;
      padding: 0 !important;
    }

    .t3-resume ul {
      list-style-type: disc !important;
    }

    .t3-resume ol {
      list-style-type: decimal !important;
    }

    .t3-resume li {
      margin-bottom: 2px !important;
      line-height: 1.4 !important;
      font-size: 11px !important;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)} !important;
    }

    .t3-resume strong, .t3-resume b {
      font-weight: 600 !important;
    }

    .t3-resume em, .t3-resume i {
      font-style: italic !important;
    }

    .t3-resume u {
      text-decoration: underline !important;
    }

    /* Header */
    .t3-resume .header-wrap {
      text-align: center;
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #000;
      flex-shrink: 0;
    }

    .t3-resume .header-name {
      font-size: 26px;
      font-weight: 500;
      letter-spacing: 0.05em;
      color: #000;
      line-height: 1.2;
      margin-bottom: 2px;
      text-transform: uppercase;
    }

    .t3-resume .header-title {
      font-size: 10px;
      letter-spacing: 0.08em;
      color: #555;
      text-transform: uppercase;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .t3-resume .header-contact {
      font-size: 9px;
      color: #555;
      line-height: 1.3;
      letter-spacing: 0.05em;
    }

    .t3-resume .header-contact-item {
      display: inline;
      margin: 0 4px;
    }

    .t3-resume .header-contact-item:not(:last-child)::after {
      content: " \\2022 ";
      margin: 0 4px;
      color: #999;
    }

    /* Body two-column */
    .t3-resume .body-wrap {
      display: flex;
      gap: 16px;
      margin-top: 8px;
    }

    .t3-resume .left-col {
      width: 35%;
      padding-right: 8px;
    }

    .t3-resume .right-col {
      width: 65%;
      padding-left: 8px;
    }

    /* Section titles (all-caps, underlined) */
    .t3-resume .section-title {
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #000;
      margin-top: 6px;
      margin-bottom: 4px;
      padding-bottom: 2px;
      border-bottom: 1px solid #000;
      page-break-after: avoid;
      break-after: avoid;
    }

    .t3-resume .section-title:first-child {
      margin-top: 0;
    }

    /* Summary */
    .t3-resume .summary-block {
      margin-bottom: 6px;
    }

    .t3-resume .summary-text {
      font-size: 11px;
      color: #333;
      line-height: 1.4;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* Skills */
    .t3-resume .skills-block {
      margin-bottom: 8px;
    }

    .t3-resume .skills-content {
      margin-top: 2px;
    }

    .t3-resume .skills-content ul,
    .t3-resume .skills-content ol {
      margin: 2px 0 2px 18px !important;
    }

    .t3-resume .skills-content li {
      margin-bottom: 1px !important;
      font-size: 11px !important;
    }

    .t3-resume .skills-content p {
      margin: 0 0 2px 0 !important;
    }

    /* Entry blocks (Experience, Education, Projects) */
    .t3-resume .entry-block {
      margin-bottom: 5px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t3-resume .entry-title {
      font-size: 11px;
      font-weight: 600;
      color: #000;
      line-height: 1.3;
      margin-bottom: 1px;
    }

    .t3-resume .entry-subtitle {
      font-size: 10px;
      color: #555;
      line-height: 1.3;
      margin-bottom: 2px;
      font-style: italic;
    }

    .t3-resume .entry-date {
      font-size: 10px;
      color: #666;
      font-style: italic;
      margin-bottom: 1px;
    }

    .t3-resume .entry-content {
      font-size: 11px;
      color: #333;
      line-height: 1.4;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t3-resume .education-grade {
      font-size: 10px;
      color: #666;
      margin-top: 1px;
      font-weight: 500;
    }

    /* Projects */
    .t3-resume .project-title {
      font-size: 11px;
      font-weight: 600;
      color: #000;
      margin-bottom: 2px;
    }

    .t3-resume .project-links {
      display: inline-flex;
      gap: 8px;
      font-size: 10px;
      margin-bottom: 2px;
    }

    .t3-resume .project-link {
      color: #0066cc !important;
      text-decoration: underline !important;
      font-weight: 500;
      white-space: nowrap;
    }

    .t3-resume .project-tech-stack {
      font-size: 10px;
      color: #666;
      margin: 1px 0 3px 0;
      font-style: italic;
    }

    /* Custom sections */
    .t3-resume .custom-section-block {
      margin: 6px 0;
    }

    .t3-resume .custom-section-content {
      font-size: 11px;
      color: #333;
      line-height: 1.4;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* Page break */
    .t3-page-break {
      page-break-before: always !important;
      break-before: page !important;
      display: block;
      height: 0;
      margin: 0;
      padding: 0;
    }

    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      html, body {
        overflow: visible;
        background: white;
        margin: 0;
        padding: 0;
      }
      .t3-resume {
        width: 100% !important;
        max-width: none !important;
        box-shadow: none !important;
        margin: 0 !important;
      }
    }
  `,
    []
  );

  // ── Helper functions ──────────────────────────────────────────────────────
  const href = (url: string) => (url.startsWith("http") ? url : `https://${url}`);

  const rich = (html: string) => {
    const c = cleanQuillHTML(html);
    return c && c !== "<p><br></p>" ? c : "";
  };

  // ── HTML builder with section ordering ────────────────────────────────────
  const generateHTML = useCallback(
    (forPDF = false): string => {
      const CSS = buildCSS(activeFontFamily);

      const fontPreloads =
        activeFontFamily !== "'-apple-system', 'BlinkMacSystemFont', sans-serif"
          ? `<link rel="preconnect" href="https://fonts.googleapis.com">
             <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
             <link href="${getFontImport(activeFontFamily)}" rel="stylesheet">`
          : "";

      const formDob = formatDateOfBirth(dateOfBirth || "");
      const addressStr = [
        contact?.address,
        contact?.city,
        contact?.postCode,
        contact?.country,
      ]
        .filter(Boolean)
        .join(" ");

      // Header (Deedy style: centered, minimal)
      const jobTitle = contact?.jobTitle || "";
      const email = contact?.email || "";
      const phone = contact?.phone || "";
      const contactParts: string[] = [];

      if (email) contactParts.push(email);
      if (phone) contactParts.push(phone);
      if (linkedinUrl?.trim()) contactParts.push(`LinkedIn.com/${linkedinUrl.trim().split("/").pop()}`);
      if (githubUrl?.trim()) contactParts.push(`GitHub.com/${githubUrl.trim().split("/").pop()}`);
      if (portfolioUrl?.trim()) contactParts.push(portfolioUrl.trim());

      const header = `
      <div class="header-wrap" data-block-id="header">
        <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
        ${jobTitle ? `<div class="header-title">${jobTitle}</div>` : ""}
        <div class="header-contact">
          ${contactParts.map((part, i) => `<span class="header-contact-item">${part}</span>`).join("")}
        </div>
      </div>`;

      // Section builders
      const sectionBuilders: Record<SectionKey, () => string> = {
        summary: () =>
          summary
            ? `<div class="summary-block" data-block-id="summary">
          <div class="section-title">Summary</div>
          <div class="summary-text">${rich(summary)}</div>
        </div>`
            : "",

        skills: () => {
          const skillsClean = rich(skills || "");
          if (!skillsClean) return "";
          return `<div class="skills-block" data-block-id="skills-section">
        <div class="section-title">Skills</div>
        <div class="skills-content" data-block-id="skills-content">${skillsClean}</div>
      </div>`;
        },

        custom: () =>
          !Array.isArray(finalize) &&
          Array.isArray(finalize?.customSection) &&
          finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim())
            ? `<div class="custom-section-block" data-block-id="custom-section">
            ${finalize.customSection
              .filter((s: any) => s?.name?.trim() || s?.description?.trim())
              .map(
                (s: any, i: number) => `
              <div style="margin-bottom:5px" data-block-id="custom-${i}">
                ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
                ${s.description ? `<div class="custom-section-content">${rich(s.description)}</div>` : ""}
              </div>
            `
              )
              .join("")}
          </div>`
            : "",

        experience: () =>
          experiences.length
            ? `<div data-block-id="exp-section">
          <div class="section-title">Experience</div>
          ${experiences
            .map((exp: any, i: number) => {
              const start = formatMonthYear(exp.startDate, false);
              const end = exp.endDate
                ? formatMonthYear(exp.endDate, false)
                : exp.startDate
                ? "Present"
                : "";
              const dateRange = start || end ? `${start}${start && end ? " - " : ""}${end}` : "";
              return `<div class="entry-block" data-block-id="exp-${i}">
                ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : ""}
                ${[exp.employer, exp.location].filter(Boolean).join(" - ") ? `<div class="entry-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" - ")}</div>` : ""}
                ${dateRange ? `<div class="entry-date">${dateRange}</div>` : ""}
                ${exp.text ? `<div class="entry-content">${rich(exp.text)}</div>` : ""}
              </div>`;
            })
            .join("")}
        </div>`
            : "",

        projects: () =>
          projects.length
            ? `<div data-block-id="proj-section">
          <div class="section-title">Projects</div>
          ${projects
            .map(
              (p: any, i: number) => `
            <div class="entry-block" data-block-id="proj-${i}">
              <div class="project-title">${p.title || ""}</div>
              <div class="project-links">
                ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="project-link" target="_blank">Live Demo</a>` : ""}
                ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="project-link" target="_blank">GitHub</a>` : ""}
              </div>
              ${p.techStack?.length ? `<div class="project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(", ")}</div>` : ""}
              ${p.description ? `<div class="entry-content">${rich(p.description)}</div>` : ""}
            </div>
          `
            )
            .join("")}
        </div>`
            : "",

        education: () =>
          educations.length
            ? `<div data-block-id="edu-section">
          <div class="section-title">Education</div>
          ${educations
            .map((edu: any, i: number) => {
              const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
              const dateStr = [edu.startDate, edu.endDate || "Present"]
                .filter(Boolean)
                .join(" - ");
              return `<div class="entry-block" data-block-id="edu-${i}">
                ${edu.degree ? `<div class="entry-title">${edu.degree}</div>` : ""}
                ${[edu.schoolname, edu.location].filter(Boolean).join(" - ") ? `<div class="entry-subtitle">${[edu.schoolname, edu.location].filter(Boolean).join(" - ")}</div>` : ""}
                ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
                ${grade ? `<div class="education-grade">${grade}</div>` : ""}
                ${edu.text ? `<div class="entry-content">${rich(edu.text)}</div>` : ""}
              </div>`;
            })
            .join("")}
        </div>`
            : "",
      };

      // Build left and right columns
      const leftSections: SectionKey[] = ["summary", "skills", "custom"];
      const rightSections: SectionKey[] = ["experience", "projects", "education"];

      const orderedLeft = activeLeftOrder
        .filter((key) => leftSections.includes(key) && sectionBuilders[key]?.())
        .map((key) => sectionBuilders[key]())
        .join("");

      const orderedRight = activeRightOrder
        .filter((key) => rightSections.includes(key) && sectionBuilders[key]?.())
        .map((key) => sectionBuilders[key]())
        .join("");

      const pdfStyle = forPDF
        ? `<style>.t3-resume { width: 100% !important; padding: ${MARGIN}px !important; }</style>`
        : "";

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Resume — ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  ${fontPreloads}
  <style>${CSS}</style>
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t3-resume">
    ${header}
    <div class="body-wrap">
      <div class="left-col">${orderedLeft}</div>
      <div class="right-col">${orderedRight}</div>
    </div>
  </div>
</body>
</html>`;
    },
    [
      activeFontFamily,
      activeLeftOrder,
      activeRightOrder,
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
      dateOfBirth,
      buildCSS,
    ]
  );

  // ── Page splitter (same logic as TemplateTwo) ──────────────────────────────
  const CSS_FOR_MEASURE = buildCSS(activeFontFamily);

  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t3-resume");
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
    ${CSS_FOR_MEASURE}
    html, body {
      margin: 0 !important; padding: 0 !important;
      width: ${A4_W}px !important; height: auto !important;
      overflow: visible !important; background: white !important;
    }
    .t3-resume {
      width: ${A4_W}px !important;
      padding: ${MARGIN}px !important;
      margin: 0 !important; box-sizing: border-box !important;
    }
  </style>
</head>
<body>${resumeSnapshot}</body>
</html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t3-resume");
          if (!resume) {
            document.body.removeChild(iframe);
            resolve([fullHtml]);
            return;
          }

          measureDoc.documentElement.style.cssText =
            "height:auto!important;overflow:visible!important;";
          measureDoc.body.style.cssText =
            "margin:0;padding:0;height:auto!important;overflow:visible!important;";
          void resume.offsetHeight;

          const totalH = resume.scrollHeight;

          const resumeTop =
            resume.getBoundingClientRect().top +
            (measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop);

          const getRelTop = (el: HTMLElement): number => {
            const r = el.getBoundingClientRect();
            const docScrollY =
              measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;
            return r.top + docScrollY - resumeTop;
          };

          const getRelBottom = (el: HTMLElement): number =>
            getRelTop(el) + el.getBoundingClientRect().height;

          const leftCol = resume.querySelector<HTMLElement>(".left-col");
          const rightCol = resume.querySelector<HTMLElement>(".right-col");

          interface Block {
            top: number;
            bottom: number;
            id?: string;
          }
          const leftBlocks: Block[] = [];
          const rightBlocks: Block[] = [];

          const collectBlocks = (col: HTMLElement, blocks: Block[]) => {
            const ITEM_SELECTORS = [
              ".entry-block",
              ".summary-block",
              ".skills-block",
              ".custom-section-block",
            ].join(", ");

            col.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
              const top = getRelTop(el);
              const bottom = getRelBottom(el);
              if (bottom - top > 8) blocks.push({ top, bottom, id: el.dataset.blockId });
            });

            col.querySelectorAll<HTMLElement>(".section-title").forEach((title) => {
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
                const deepChild = firstItem.querySelector<HTMLElement>(
                  ".entry-block, .custom-section-block"
                );
                const anchor = deepChild || firstItem;
                const anchorBottom = getRelBottom(anchor);
                const combinedHeight = anchorBottom - titleTop;
                if (
                  combinedHeight > 8 &&
                  combinedHeight <= PAGE_CONTENT_H * 0.9
                ) {
                  const sectionId = (title.parentElement as HTMLElement)?.dataset
                    ?.blockId;
                  blocks.push({ top: titleTop, bottom: anchorBottom, id: sectionId });
                }
              }
            });

            blocks.sort((a, b) => a.top - b.top);
          };

          if (leftCol) collectBlocks(leftCol, leftBlocks);
          if (rightCol) collectBlocks(rightCol, rightBlocks);

          const findBestCut = (
            blocks: Block[],
            currentStart: number,
            naiveCut: number
          ): { cut: number; id?: string } => {
            let actualCut = naiveCut;
            let cutId: string | undefined;

            const pageHeight = naiveCut - currentStart;
            const minFill = currentStart + pageHeight * 0.8;

            for (const block of blocks) {
              if (block.top >= naiveCut) break;
              if (block.bottom <= currentStart) continue;

              if (block.bottom > naiveCut) {
                const blockHeight = block.bottom - block.top;

                if (
                  block.top >= minFill &&
                  blockHeight <= PAGE_CONTENT_H &&
                  block.top < actualCut
                ) {
                  actualCut = block.top;
                  cutId = block.id;
                }
              }
            }

            if (actualCut <= currentStart) actualCut = naiveCut;
            return { cut: actualCut, id: cutId };
          };

          const pageStarts: number[] = [0];
          const pageBreakIds: string[] = [];
          const MAX_PAGES = 20;

          while (pageStarts.length < MAX_PAGES) {
            const currentStart = pageStarts[pageStarts.length - 1];
            const naiveCut = currentStart + PAGE_CONTENT_H;
            if (naiveCut >= totalH) break;

            const leftResult = findBestCut(leftBlocks, currentStart, naiveCut);
            const rightResult = findBestCut(rightBlocks, currentStart, naiveCut);

            const earlier =
              leftResult.cut <= rightResult.cut ? leftResult : rightResult;

            pageStarts.push(earlier.cut);
            if (earlier.id) pageBreakIds.push(earlier.id);
          }

          document.body.removeChild(iframe);
          (window as any).__resumePageBreakIds = pageBreakIds;

          const pageHtmls: string[] = [];
          for (let i = 0; i < pageStarts.length; i++) {
            const contentOffsetY = pageStarts[i];
            const nextStart = pageStarts[i + 1] ?? totalH;
            const clipH = nextStart - contentOffsetY;
            const previewClipH = Math.max(
              clipH,
              Math.min(PAGE_CONTENT_H, totalH - contentOffsetY)
            );

            pageHtmls.push(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <style>
    ${CSS_FOR_MEASURE}
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
      width: ${A4_W}px; height: ${previewClipH}px; overflow: hidden;
    }
    .page-shift {
      position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px;
    }
    .t3-resume {
      width: ${A4_W}px !important;
      padding: ${MARGIN}px !important;
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
    [CSS_FOR_MEASURE]
  );

  // ── Debounced updates ─────────────────────────────────────────────────────
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

  // ── Download handler ──────────────────────────────────────────────────────
  const handleDownload = async (): Promise<void> => {
    setIsDownloading(true);

    try {
      const res: AxiosResponse<Blob> = await api.post(
        `${API_URL}/candidates/generate-pdf`,
        { html: generateHTML(true) },
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
    } catch (err) {
      console.error("PDF error:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      {lastSegment === "download-resume" && (
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
                  : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600"
              }
            `}
          >
            {!isDownloading && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            )}

            <div className="relative flex items-center justify-center gap-3 text-lg">
              {isDownloading ? (
                <>
                  <FaSpinner className="animate-spin text-xl" />
                  <span>Generating PDF ...</span>
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
      )}

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

export default TemplateFifteen;