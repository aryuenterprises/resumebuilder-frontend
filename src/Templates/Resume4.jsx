// import React, { useContext, useRef } from "react";
// import MonthYearDisplay from "../Componets/MonthYearDisplay";

// import html2pdf from "html2pdf.js";
// import { CreateContext } from "../App";

// const Resume4 = (alldetails) => {
//   const resumeRef = useRef(null);

//   const UseContext = useContext(CreateContext);
//   const Allplans = UseContext?.allplandetails;

//   const contact = alldetails?.alldata?.contact || UseContext || {};
//   const educations =
//     alldetails?.alldata?.educations || UseContext?.education || [];
//   const experiences =
//     alldetails?.alldata?.experiences || UseContext?.experiences || [];
//   const skills = alldetails?.alldata?.skills || UseContext?.skills || [];
//   const finalize =
//     alldetails?.alldata?.finalize || UseContext?.globalSkillsData || {};
//   const summary = alldetails?.alldata?.summary || UseContext?.text || "";
//   const isFreePlan =
//     Allplans === undefined ||
//     Allplans === null ||
//     Allplans === "FREE" ||
//     (Array.isArray(Allplans) && Allplans.length === 0);
//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.country,
//     contact?.postcode,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedin || contact?.linkedIn;

//   const handleDownloadPDF = () => {
//     const element = resumeRef.current;

//     const opt = {
//   margin: 0,
//   filename: `${contact?.firstName}_${contact?.lastName}_Resume.pdf`,
//   image: { type: "jpeg", quality: 1 },
//   html2canvas: {
//     scale: 2,
//     useCORS: true,
//     backgroundColor: "#fff",
//     scrollX: 0,
//     scrollY: 0,
//     windowWidth: 794,
//   },
//   jsPDF: {
//     unit: "mm",
//     format: "a4",
//     orientation: "portrait",
//   },
//   pagebreak: {
//     mode: ["css", "avoid-all"],
//   },
// };

//     html2pdf().from(element).set(opt).save();
//   };

//   // Inline styles with better specificity
//   const styles = `
//     .resume-container {
//       width: 210mm;
//       min-height: 297mm;
//       background: #fff;
//       box-shadow: 0 0 10px rgba(0,0,0,0.1);
//       overflow: visible;
//       position: relative;
//       margin: 20px auto;
//       padding: 20px;
//       box-sizing: border-box;
//       -webkit-print-color-adjust: exact !important;
//       print-color-adjust: exact !important;
//       font-family: 'Helvetica', 'Arial', sans-serif !important;
//     }

//     .resume-container * {
//       box-sizing: border-box !important;
//       margin: 0 !important;
//       padding: 0 !important;
//       font-family: inherit !important;
//     }

//     /* CONTACT INFO */
//     .resume-container .contact-info {
//       text-align: center !important;
//       margin-bottom: 15px !important;
//     }

//     .resume-container .name {
//       font-size: 22px !important;
//       font-weight: 800 !important;
//       text-transform: uppercase !important;
//       margin-bottom: 2px !important;
//       letter-spacing: 0.5px !important;
//       color: #000 !important;
//     }

//     .resume-container .job-title {
//       font-size: 14px !important;
//       font-weight: 700 !important;
//       color: #333333 !important;
//       margin-bottom: 4px !important;
//     }

//     .resume-container .address {
//       font-size: 11px !important;
//       color: #555555 !important;
//       margin-bottom: 4px !important;
//     }

//     .resume-container .contact-details {
//       display: flex !important;
//       justify-content: center !important;
//       gap: 20px !important;
//       margin: 6px 0 !important;
//       font-size: 11px !important;
//       font-weight: 600 !important;
//       color: #333333 !important;
//     }

//     .resume-container .contact-details span {
//       color: #333333 !important;
//     }

//     .resume-container .links {
//       display: flex !important;
//       justify-content: center !important;
//       gap: 15px !important;
//       margin-bottom: 10px !important;
//     }

//     .resume-container .link-item {
//       font-size: 11px !important;
//       font-weight: 600 !important;
//       color: #333333 !important;
//       text-decoration: none !important;
//     }

//     /* SECTION TITLE - FIXED */
//    .section-title {
//   background-color: #f0f0f0 !important;
//   height: 26px !important;

//   display: flex !important;
//   align-items: center !important;
//   justify-content: center !important;

//   font-weight: 700 !important;
//   font-size: 14px !important;
//   text-transform: uppercase !important;
//   letter-spacing: 0.5px !important;

//   padding: 0 !important;
//   line-height: 1 !important;
//     page-break-after: avoid !important;

// }

//     .resume-container .section-content {
//       margin-bottom: 12px !important;
//       page-break-inside: avoid !important;
//       break-inside: avoid !important;
//     }

//     /* EXPERIENCE & EDUCATION */
//     .resume-container .experience-item,
//     .resume-container .education-item {
//       margin-bottom: 10px !important;
//       page-break-inside: avoid !important;
//       break-inside: avoid !important;
//     }

//     .resume-container .item-header {
//       display: flex !important;
//       justify-content: space-between !important;
//       align-items: flex-start !important;
//       margin-bottom: 3px !important;
//     }

//     .resume-container .item-title {
//       font-size: 13px !important;
//       font-weight: 700 !important;
//       color: #222222 !important;
//       flex: 1 !important;
//     }

//     .resume-container .item-subtitle {
//       font-size: 12px !important;
//       color: #555555 !important;
//       font-weight: 500 !important;
//     }

//     .resume-container .item-date {
//       font-size: 11px !important;
//       color: #666666 !important;
//       font-weight: 500 !important;
//       white-space: nowrap !important;
//       min-width: 90px !important;
//       text-align: right !important;
//       margin-left: 10px !important;
//     }

//     .resume-container .item-content {
//       font-size: 11px !important;
//       color: #444444 !important;
//       line-height: 1.5 !important;
//     }

//     .resume-container .item-content p,
//     .resume-container .item-content div,
//     .resume-container .item-content span {
//       font-size: 11px !important;
//       line-height: 1.5 !important;
//       color: #444444 !important;
//     }

//     /* SKILLS */
//     .resume-container .skills-grid {
//       display: grid !important;
//       grid-template-columns: repeat(2, 1fr) !important;
//       gap: 12px !important;
//       margin-top: 8px !important;
//     }

//     .resume-container .skill-item {
//       margin-bottom: 6px !important;
//     }

//     .resume-container .skill-name {
//       font-size: 11px !important;
//       color: #333333 !important;
//       margin-bottom: 2px !important;
//     }

//     .resume-container .skill-bar {
//       height: 3px !important;
//       background-color: #e0e0e0 !important;
//       border-radius: 1.5px !important;
//       overflow: hidden !important;
//       width: 100% !important;
//     }

//     .resume-container .skill-level {
//       height: 100% !important;
//       background-color: #222222 !important;
//       display: block !important;
//     }

//     /* CUSTOM SECTIONS */
//     .resume-container .custom-section {
//       margin-bottom: 12px !important;
//     }

//     /* PRINT STYLES */
//     @media print {
//       body * {
//         visibility: hidden !important;
//       }
//       .resume-container, .resume-container * {
//         visibility: visible !important;
//       }
//       .resume-container {
//         position: absolute !important;
//         left: 0 !important;
//         top: 0 !important;
//         width: 210mm !important;
//         min-height: 297mm !important;
//         margin: 0 !important;
//         padding: 20px !important;
//         box-shadow: none !important;
//         background: #fff !important;
//       }
//     }

//     @page {
//       size: A4;
//       margin: 0;
//     }
//   `;

//   return (
//     <div>
//       {/* Download Button */}
//       <div
//         style={{
//           textAlign: "center",
//           margin: "20px 0",
//           position: "sticky",
//           top: 0,
//           zIndex: 100,
//           background: "white",
//           padding: "10px",
//           boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//         }}
//       >
//         <button
//           onClick={handleDownloadPDF}
//           style={{
//             backgroundColor: "#007bff",
//             color: "white",
//             padding: "12px 24px",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//             fontSize: "16px",
//             fontWeight: "bold",
//             transition: "background-color 0.3s",
//           }}
//           onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
//           onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
//         >
//           Download PDF
//         </button>
//         <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
//           Downloads exactly what you see below
//         </p>
//       </div>

//       {/* Resume Container - This is what gets converted to PDF */}
//       <div ref={resumeRef} className="resume-container">
//         <style>{styles}</style>

//         {/* Header Section */}
//         <div className="contact-info">
//           <div className="name">
//             {contact?.firstName || ""} {contact?.lastName || ""}
//           </div>
//           <div className="job-title">{contact?.jobTitle?.name || ""}</div>
//           <div className="address">{addressParts.join(", ")}</div>
//           <div className="contact-details">
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//           </div>
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
//                 rel="noopener noreferrer"
//               >
//                 LinkedIn
//               </a>
//             )}
//             {contact?.portfolio && (
//               <a
//                 href={
//                   contact.portfolio.startsWith("http")
//                     ? contact.portfolio
//                     : `https://${contact.portfolio}`
//                 }
//                 className="link-item"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Portfolio
//               </a>
//             )}
//           </div>
//         </div>

//         {/* Summary Section */}
//         {summary && (
//           <div className="section-content">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content"
//               dangerouslySetInnerHTML={{ __html: summary }}
//             />
//           </div>
//         )}

//         {/* Experience Section */}
//         {experiences?.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, index) => (
//               <div key={exp._id || exp.id || index} className="experience-item">
//                 <div className="item-header">
//                   <div>
//                     <div className="item-title">{exp.jobTitle || ""}</div>
//                     {(exp.employer || exp.location) && (
//                       <div className="item-subtitle">
//                         {exp.employer && <span>{exp.employer}</span>}
//                         {exp.location && (
//                           <>
//                             {exp.employer && " — "}
//                             <span>{exp.location}</span>
//                           </>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   {(exp.startDate || exp.endDate) && (
//                     <div className="item-date">
//                       {exp.startDate && (
//                         <MonthYearDisplay
//                           value={exp.startDate}
//                           shortYear={true}
//                         />
//                       )}
//                       {exp.startDate && exp.endDate && " - "}
//                       {exp.endDate ? (
//                         <MonthYearDisplay
//                           value={exp.endDate}
//                           shortYear={true}
//                         />
//                       ) : (
//                         exp.startDate && "Present"
//                       )}
//                     </div>
//                   )}
//                 </div>
//                 {exp.text && (
//                   <div
//                     className="item-content"
//                     dangerouslySetInnerHTML={{ __html: exp.text }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Education Section */}
//         {educations?.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => (
//               <div key={edu._id || edu.id || index} className="education-item">
//                 <div className="item-header">
//                   <div>
//                     <div className="item-title">{edu.schoolname || ""}</div>
//                     {(edu.degree || edu.location) && (
//                       <div className="item-subtitle">
//                         {edu.degree && <span>{edu.degree}</span>}
//                         {edu.location && (
//                           <>
//                             {edu.degree && " — "}
//                             <span>{edu.location}</span>
//                           </>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   {(edu.startDate || edu.endDate) && (
//                     <div className="item-date">
//                       {edu.startDate || ""}
//                       {edu.startDate && edu.endDate && " - "}
//                       {edu.endDate || ""}
//                     </div>
//                   )}
//                 </div>
//                 {edu.text && (
//                   <div
//                     className="item-content"
//                     dangerouslySetInnerHTML={{ __html: edu.text }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Skills Section */}
//         {skills.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Skills</div>
//             <div className="skills-grid">
//               {skills.map((skill, index) => (
//                 <div
//                   key={skill._id || skill.id || index}
//                   className="skill-item"
//                 >
//                   <div className="skill-name">{skill.skill || ""}</div>
//                   {skill.level && (
//                     <div className="skill-bar">
//                       <div
//                         className="skill-level"
//                         style={{
//                           width: `${(Number(skill.level) / 4) * 100}%`,
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Languages Section */}
//         {Array.isArray(finalize?.languages) &&
//           finalize.languages.some(
//             (lang) => lang.name && lang.name.trim() !== "",
//           ) && (
//             <div className="section-content">
//               <div className="section-title">Languages</div>
//               <div className="skills-grid">
//                 {finalize.languages.map(
//                   (lang, index) =>
//                     lang.name &&
//                     lang.name.trim() !== "" && (
//                       <div key={lang._id || index} className="skill-item">
//                         <div className="skill-name">{lang.name}</div>
//                         {lang.level && (
//                           <div className="skill-bar">
//                             <div
//                               className="skill-level"
//                               style={{
//                                 width: `${(Number(lang.level) / 4) * 100}%`,
//                               }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Additional Sections */}
//         {Array.isArray(finalize?.certificationsAndLicenses) &&
//           finalize.certificationsAndLicenses.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content">
//               <div className="section-title">Certifications and Licenses</div>
//               <div className="item-content">
//                 {finalize.certificationsAndLicenses.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {Array.isArray(finalize?.hobbiesAndInterests) &&
//           finalize.hobbiesAndInterests.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content">
//               <div className="section-title">Hobbies and Interests</div>
//               <div className="item-content">
//                 {finalize.hobbiesAndInterests.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {Array.isArray(finalize?.awardsAndHonors) &&
//           finalize.awardsAndHonors.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content">
//               <div className="section-title">Awards and Honors</div>
//               <div className="item-content">
//                 {finalize.awardsAndHonors.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Websites and Social Media */}
//         {Array.isArray(finalize?.websitesAndSocialMedia) &&
//           finalize.websitesAndSocialMedia.some(
//             (item) =>
//               (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//               (item.socialMedia && item.socialMedia.trim() !== ""),
//           ) && (
//             <div className="section-content">
//               <div className="section-title">Websites and Social Media</div>
//               <div className="item-content">
//                 {finalize.websitesAndSocialMedia.map(
//                   (item, index) =>
//                     (item.websiteUrl || item.socialMedia) && (
//                       <div
//                         key={item.id || index}
//                         style={{ marginBottom: "5px" }}
//                       >
//                         {item.websiteUrl && (
//                           <div>Website: {item.websiteUrl}</div>
//                         )}
//                         {item.socialMedia && (
//                           <div>Social Media: {item.socialMedia}</div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* References */}
//         {Array.isArray(finalize?.references) &&
//           finalize.references.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content">
//               <div className="section-title">References</div>
//               <div className="item-content">
//                 {finalize.references.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Custom Sections */}
//         {Array.isArray(finalize?.customSection) &&
//           finalize.customSection.some(
//             (section) => section?.name?.trim() || section?.description?.trim(),
//           ) && (
//             <div className="section-content">
//               {finalize.customSection
//                 .filter(
//                   (section) =>
//                     section?.name?.trim() || section?.description?.trim(),
//                 )
//                 .map((section, index) => (
//                   <div key={section.id || index} className="custom-section">
//                     {section.name && (
//                       <div className="section-title">{section.name}</div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="item-content"
//                         dangerouslySetInnerHTML={{
//                           __html: section.description,
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           )}
//       </div>
//     </div>
//   );
// };

// export default Resume4;

// import React, { useContext, useLayoutEffect, useRef } from "react";
// import { useReactToPrint } from "react-to-print";
// import MonthYearDisplay from "../Componets/MonthYearDisplay";
// import { CreateContext } from "../App";

// const Resume4 = (alldetails) => {
//   const resumeRef = useRef(null);
//   const UseContext = useContext(CreateContext);

//   const Allplans = UseContext?.allplandetails;

//   const contact = alldetails?.alldata?.contact || UseContext || {};
//   const educations =
//     alldetails?.alldata?.educations || UseContext?.education || [];
//   const experiences =
//     alldetails?.alldata?.experiences || UseContext?.experiences || [];
//   const skills = alldetails?.alldata?.skills || UseContext?.skills || [];
//   const finalize =
//     alldetails?.alldata?.finalize || UseContext?.globalSkillsData || {};
//   const summary = alldetails?.alldata?.summary || UseContext?.text || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.country,
//     contact?.postcode,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedin || contact?.linkedIn;

//   /* ===========================
//      PRINT HANDLER
//   ============================ */
// const handlePrint = useReactToPrint({
//   contentRef: resumeRef,
//   documentTitle: "Resume",
// });

//   /* ===========================
//      STYLES (UNCHANGED, PRINT SAFE)
//   ============================ */
//   const styles = `
//     .resume-container {
//       width: 210mm;
//       min-height: 297mm;
//       background: #fff;
//       margin: 0 auto;
//       padding: 20px;
//       box-sizing: border-box;
//       font-family: Helvetica, Arial, sans-serif;
//     }

//     .resume-container * {
//       box-sizing: border-box;
//       margin: 0;
//       padding: 0;
//       font-family: inherit;
//     }

//     .contact-info {
//       text-align: center;
//       margin-bottom: 15px;
//     }

//     .name {
//       font-size: 22px;
//       font-weight: 800;
//       text-transform: uppercase;
//     }

//     .job-title {
//       font-size: 14px;
//       font-weight: 700;
//       margin-top: 2px;
//     }

//     .address {
//       font-size: 11px;
//       margin-top: 4px;
//     }

//     .contact-details {
//       display: flex;
//       justify-content: center;
//       gap: 20px;
//       margin-top: 6px;
//       font-size: 11px;
//       font-weight: 600;
//     }

//     .links {
//       display: flex;
//       justify-content: center;
//       gap: 15px;
//       margin-top: 6px;
//     }

//     .link-item {
//       font-size: 11px;
//       font-weight: 600;
//       text-decoration: none;
//       color: #000;
//     }

//     .section-title {
//       background: #f0f0f0;
//       height: 26px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       margin: 12px 0 8px;
//       page-break-after: avoid;
//     }

//     .section-content {
//       margin-bottom: 12px;
//       page-break-inside: avoid;
//     }

//     .item-header {
//       display: flex;
//       justify-content: space-between;
//       margin-bottom: 3px;
//     }

//     .item-title {
//       font-size: 13px;
//       font-weight: 700;
//     }

//     .item-subtitle {
//       font-size: 12px;
//       color: #555;
//     }

//     .item-date {
//       font-size: 11px;
//       white-space: nowrap;
//     }

//     .item-content {
//       font-size: 11px;
//       line-height: 1.5;
//       color: #444;
//     }

//     .skills-grid {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       gap: 12px;
//     }

//     .skill-name {
//       font-size: 11px;
//       margin-bottom: 2px;
//     }

//     .skill-bar {
//       height: 3px;
//       background: #e0e0e0;
//     }

//     .skill-level {
//       height: 100%;
//       background: #222;
//     }

//     @media print {
//       body {
//         margin: 0;
//       }
//     }

//     @page {
//       size: A4;
//       margin: 0;
//     }
//   `;

//   const PAGE_HEIGHT_MM = 297;
// const PAGE_MARGIN_MM = 20 * 2; // top + bottom
// const CONTENT_HEIGHT_MM = PAGE_HEIGHT_MM - PAGE_MARGIN_MM;

//   const autoPaginate = () => {
//   const resume = resumeRef.current;
//   if (!resume) return;

//   const sections = resume.querySelectorAll(".resume-section");

//   let currentPageHeight = 0;

//   sections.forEach((section) => {
//     const sectionHeightPx = section.offsetHeight;
//     const sectionHeightMm = sectionHeightPx * 0.264583; // px → mm

//     if (currentPageHeight + sectionHeightMm > CONTENT_HEIGHT_MM) {
//       section.classList.add("page-break");
//       currentPageHeight = sectionHeightMm;
//     } else {
//       section.classList.remove("page-break");
//       currentPageHeight += sectionHeightMm;
//     }
//   });
// };

// useLayoutEffect(() => {
//   autoPaginate();
// }, [UseContext]); // resume content changes only

//   return (
//     <>
//       {/* DOWNLOAD BUTTON (NOT PRINTED) */}
//       <div
//         style={{
//           textAlign: "center",
//           margin: "20px 0",
//           position: "sticky",
//           top: 0,
//           background: "#fff",
//           zIndex: 10,
//         }}
//       >
//         <button
//           onClick={handlePrint}
//           style={{
//             padding: "12px 24px",
//             fontSize: "16px",
//             fontWeight: "bold",
//             background: "red",
//             color: "#fff",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Download PDF
//         </button>
//       </div>

//       {/* RESUME */}
//       <div ref={resumeRef} className="resume-container resume">
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="contact-info">
//           <div className="name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="job-title">{contact?.jobTitle?.name}</div>
//           <div className="address">{addressParts.join(", ")}</div>

//           <div className="contact-details">
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//           </div>

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
//           </div>
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-content resume-section">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content"
//               dangerouslySetInnerHTML={{ __html: summary }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-content resume-section">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div key={i}>
//                 <div className="item-header">
//                   <div>
//                     <div className="item-title">{exp.jobTitle}</div>
//                     <div className="item-subtitle">
//                       {exp.employer} — {exp.location}
//                     </div>
//                   </div>
//                   <div className="item-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {" - "}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate} shortYear />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>
//                 <div
//                   className="item-content"
//                   dangerouslySetInnerHTML={{ __html: exp.text }}
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//           {educations?.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => (
//               <div key={edu._id || edu.id || index} className="education-item">
//                 <div className="item-header">
//                   <div>
//                     <div className="item-title">{edu.schoolname || ""}</div>
//                     {(edu.degree || edu.location) && (
//                       <div className="item-subtitle">
//                         {edu.degree && <span>{edu.degree}</span>}
//                         {edu.location && (
//                           <>
//                             {edu.degree && " — "}
//                             <span>{edu.location}</span>
//                           </>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   {(edu.startDate || edu.endDate) && (
//                     <div className="item-date">
//                       {edu.startDate || ""}
//                       {edu.startDate && edu.endDate && " - "}
//                       {edu.endDate || ""}
//                     </div>
//                   )}
//                 </div>
//                 {edu.text && (
//                   <div
//                     className="item-content"
//                     dangerouslySetInnerHTML={{ __html: edu.text }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* SKILLS */}
//         {skills.length > 0 && (
//           <div className="section-content resume-section">
//             <div className="section-title">Skills</div>
//             <div className="skills-grid">
//               {skills.map((skill, i) => (
//                 <div key={i}>
//                   <div className="skill-name">{skill.skill}</div>
//                   <div className="skill-bar">
//                     <div
//                       className="skill-level"
//                       style={{
//                         width: `${(Number(skill.level) / 4) * 100}%`,
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Languages Section */}
//          {Array.isArray(finalize?.languages) &&
//            finalize.languages.some(
//              (lang) => lang.name && lang.name.trim() !== "",
//            ) && (
//              <div className="section-content resume-section">
//                <div className="section-title">Languages</div>
//                <div className="skills-grid">
//                  {finalize.languages.map(
//                    (lang, index) =>
//                      lang.name &&
//                      lang.name.trim() !== "" && (
//                        <div key={lang._id || index} className="skill-item">
//                          <div className="skill-name">{lang.name}</div>
//                          {lang.level && (
//                            <div className="skill-bar">
//                              <div
//                                className="skill-level"
//                                style={{
//                                  width: `${(Number(lang.level) / 4) * 100}%`,
//                                }}
//                              />
//                            </div>
//                          )}
//                        </div>
//                      ),
//                  )}
//                </div>
//              </div>
//            )}

//          {/* Additional Sections */}
//          {Array.isArray(finalize?.certificationsAndLicenses) &&
//            finalize.certificationsAndLicenses.some(
//              (item) =>
//                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//            ) && (
//              <div className="section-content resume-section">
//                <div className="section-title">Certifications and Licenses</div>
//                <div className="item-content">
//                  {finalize.certificationsAndLicenses.map(
//                    (item, index) =>
//                      item.name &&
//                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                        <div
//                          key={item.id || index}
//                          dangerouslySetInnerHTML={{ __html: item.name }}
//                        />
//                      ),
//                  )}
//                </div>
//              </div>
//            )}

//          {Array.isArray(finalize?.hobbiesAndInterests) &&
//            finalize.hobbiesAndInterests.some(
//              (item) =>
//                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//            ) && (
//              <div className="section-content resume-section">
//                <div className="section-title">Hobbies and Interests</div>
//                <div className="item-content">
//                  {finalize.hobbiesAndInterests.map(
//                    (item, index) =>
//                      item.name &&
//                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                        <div
//                          key={item.id || index}
//                          dangerouslySetInnerHTML={{ __html: item.name }}
//                        />
//                      ),
//                  )}
//                </div>
//              </div>
//            )}

//          {Array.isArray(finalize?.awardsAndHonors) &&
//            finalize.awardsAndHonors.some(
//              (item) =>
//                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//            ) && (
//              <div className="section-content resume-section">
//                <div className="section-title">Awards and Honors</div>
//                <div className="item-content">
//                  {finalize.awardsAndHonors.map(
//                    (item, index) =>
//                      item.name &&
//                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                        <div
//                          key={item.id || index}
//                          dangerouslySetInnerHTML={{ __html: item.name }}
//                        />
//                      ),
//                  )}
//                </div>
//              </div>
//            )}

//          {/* Websites and Social Media */}
//          {Array.isArray(finalize?.websitesAndSocialMedia) &&
//            finalize.websitesAndSocialMedia.some(
//              (item) =>
//                (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//                (item.socialMedia && item.socialMedia.trim() !== ""),
//            ) && (
//              <div className="section-content resume-section">
//                <div className="section-title">Websites and Social Media</div>
//                <div className="item-content">
//                  {finalize.websitesAndSocialMedia.map(
//                    (item, index) =>
//                      (item.websiteUrl || item.socialMedia) && (
//                        <div
//                          key={item.id || index}
//                          style={{ marginBottom: "5px" }}
//                        >
//                          {item.websiteUrl && (
//                            <div>Website: {item.websiteUrl}</div>
//                          )}
//                          {item.socialMedia && (
//                            <div>Social Media: {item.socialMedia}</div>
//                          )}
//                        </div>
//                      ),
//                  )}
//                </div>
//              </div>
//            )}

//          {/* References */}
//          {Array.isArray(finalize?.references) &&
//            finalize.references.some(
//              (item) =>
//                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//            ) && (
//              <div className="section-content resume-section">
//                <div className="section-title">References</div>
//                <div className="item-content">
//                  {finalize.references.map(
//                    (item, index) =>
//                      item.name &&
//                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                        <div
//                          key={item.id || index}
//                          dangerouslySetInnerHTML={{ __html: item.name }}
//                        />
//                      ),
//                  )}
//                </div>
//              </div>
//            )}

//          {/* Custom Sections */}
//          {Array.isArray(finalize?.customSection) &&
//            finalize.customSection.some(
//              (section) => section?.name?.trim() || section?.description?.trim(),
//            ) && (
//              <div className="section-content resume-section">
//                {finalize.customSection
//                  .filter(
//                    (section) =>
//                      section?.name?.trim() || section?.description?.trim(),
//                  )
//                  .map((section, index) => (
//                    <div key={section.id || index} className="custom-section">
//                      {section.name && (
//                        <div className="section-title">{section.name}</div>
//                      )}
//                      {section.description && (
//                        <div
//                          className="item-content"
//                          dangerouslySetInnerHTML={{
//                            __html: section.description,
//                          }}
//                        />
//                      )}
//                    </div>
//                  ))}
//              </div>
//            )}
//       </div>
//     </>
//   );
// };

// export default Resume4;

// import React, {
//   useContext,
//   useLayoutEffect,
//   useRef,
//   useEffect,
//   useState,
// } from "react";
// import { useReactToPrint } from "react-to-print";
// import MonthYearDisplay from "../Componets/MonthYearDisplay";
// import { CreateContext } from "../App";

// const Resume4 = (alldetails) => {
//   const resumeRef = useRef(null);
//   const UseContext = useContext(CreateContext);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);

//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const Allplans = UseContext?.allplandetails;

//   const contact = alldetails?.alldata?.contact || UseContext || {};
//   const educations =
//     alldetails?.alldata?.educations || UseContext?.education || [];
//   const experiences =
//     alldetails?.alldata?.experiences || UseContext?.experiences || [];
//   const skills = alldetails?.alldata?.skills || UseContext?.skills || [];
//   const finalize =
//     alldetails?.alldata?.finalize || UseContext?.globalSkillsData || {};
//   const summary = alldetails?.alldata?.summary || UseContext?.text || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.country,
//     contact?.postcode,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedin || contact?.linkedIn;

//   /* ===========================
//      PRINT HANDLER
//   ============================ */
//   const handlePrint = useReactToPrint({
//     contentRef: resumeRef,
//     documentTitle: `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}`,
//     onBeforeGetContent: () => {
//       // Optional: Any pre-processing before printing
//       return Promise.resolve();
//     },
//     onPrintError: (error) => {
//       console.error("Print error:", error);
//       if (isMobile) {
//         alert(
//           "Mobile browsers may have limited PDF support.\n\nTry:\n1. Using Chrome browser\n2. Opening in desktop mode\n3. Using the HTML download option below",
//         );
//       }
//     },
//     removeAfterPrint: true,
//   });

//   /* ===========================
//      MOBILE FALLBACK DOWNLOAD
//   ============================ */
//   const handleMobileDownload = () => {
//     if (!resumeRef.current) return;

//     const resumeHtml = resumeRef.current.innerHTML;
//     const fullHtml = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Resume - ${contact?.firstName} ${contact?.lastName}</title>
//           <style>${styles}</style>
//           <style>
//             @media print {
//               body { margin: 0; }
//               .resume-container {
//                 width: 210mm !important;
//                 min-height: 297mm !important;
//               }
//             }
//             @media screen {
//               body { padding: 20px; background: #f5f5f5; }
//               .resume-container {
//                 width: 100% !important;
//                 max-width: 800px;
//                 margin: 0 auto;
//                 box-shadow: 0 0 10px rgba(0,0,0,0.1);
//               }
//             }
//             @page { size: A4; margin: 0; }
//             .download-buttons { display: none !important; }
//           </style>
//         </head>
//         <body>
//           <div class="resume-container resume">
//             ${resumeHtml}
//           </div>

//         </body>
//       </html>
//     `;

//     // Create a blob and download
//     const blob = new Blob([fullHtml], { type: "text/html" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `Resume_${contact?.firstName || "My"}_${contact?.lastName || "Resume"}.html`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   /* ===========================
//      STYLES (WITH MOBILE SUPPORT)
//   ============================ */
//   const styles = `
//     .resume-container {
//       width: 210mm;
//       min-height: 297mm;
//       background: #fff;
//       margin: 0 auto;
//       padding: 20px;
//       box-sizing: border-box;
//       font-family: Helvetica, Arial, sans-serif;
//     }

//     .resume-container * {
//       box-sizing: border-box;
//       margin: 0;
//       padding: 0;
//       font-family: inherit;
//     }

//     .contact-info {
//       text-align: center;
//       margin-bottom: 15px;
//       page-break-after: avoid;
//     }

//     .name {
//       font-size: 22px;
//       font-weight: 800;
//       text-transform: uppercase;
//     }

//     .job-title {
//       font-size: 14px;
//       font-weight: 700;
//       margin-top: 2px;
//     }

//     .address {
//       font-size: 11px;
//       margin-top: 4px;
//     }

//     .contact-details {
//       display: flex;
//       justify-content: center;
//       gap: 20px;
//       margin-top: 6px;
//       font-size: 11px;
//       font-weight: 600;
//     }

//     .links {
//       display: flex;
//       justify-content: center;
//       gap: 15px;
//       margin-top: 6px;
//     }

//     .link-item {
//       font-size: 11px;
//       font-weight: 600;
//       text-decoration: none;
//       color: #000;
//     }

//     .section-title {
//       background: #f0f0f0;
//       height: 26px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       margin: 12px 0 8px;
//       page-break-after: avoid;
//     }

//     .section-content {
//       margin-bottom: 12px;
//       page-break-inside: avoid;
//     }

//     .item-header {
//       display: flex;
//       justify-content: space-between;
//       margin-bottom: 3px;
//     }

//     .item-title {
//       font-size: 13px;
//       font-weight: 700;
//     }

//     .item-subtitle {
//       font-size: 12px;
//       color: #555;
//     }

//     .item-date {
//       font-size: 11px;
//       white-space: nowrap;
//     }

//     .item-content {
//       font-size: 11px;
//       line-height: 1.5;
//       color: #444;
//     }

//     .skills-grid {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       gap: 12px;
//     }

//     .skill-name {
//       font-size: 11px;
//       margin-bottom: 2px;
//     }

//     .skill-bar {
//       height: 3px;
//       background: #e0e0e0;
//     }

//     .skill-level {
//       height: 100%;
//       background: #222;
//     }

//     .page-break {
//       page-break-before: always;
//     }

//     /* Mobile Styles */
//     @media (max-width: 768px) {
//       .resume-container {
//         width: 100% !important;
//         padding: 15px !important;
//         min-height: auto !important;
//       }

//       .section-title {
//         height: 32px !important;
//         font-size: 16px !important;
//       }

//       .skills-grid {
//         grid-template-columns: 1fr !important;
//       }

//       .contact-details {
//         flex-direction: column;
//         gap: 8px !important;
//         align-items: center;
//       }

//       .item-header {
//         flex-direction: column;
//         gap: 8px;
//       }

//       .item-date {
//         white-space: normal;
//         font-size: 12px;
//       }

//       .name {
//         font-size: 20px;
//       }

//       .job-title {
//         font-size: 16px;
//       }
//     }

//     @media print {
//       body {
//         margin: 0;
//         padding: 0;
//       }

//       .download-buttons {
//         display: none !important;
//       }

//       .resume-container {
//         width: 210mm !important;
//         min-height: 297mm !important;
//       }
//     }

//     @page {
//       size: A4;
//       margin: 0;
//     }
//   `;

//   const PAGE_HEIGHT_MM = 297;
//   const PAGE_MARGIN_MM = 20 * 2; // top + bottom
//   const CONTENT_HEIGHT_MM = PAGE_HEIGHT_MM - PAGE_MARGIN_MM;

//   const autoPaginate = () => {
//     const resume = resumeRef.current;
//     if (!resume) return;

//     // Disable auto-pagination on mobile for better performance
//     if (isMobile) return;

//     const sections = resume.querySelectorAll(".resume-section");
//     let currentPageHeight = 0;

//     sections.forEach((section) => {
//       const sectionHeightPx = section.offsetHeight;
//       const sectionHeightMm = sectionHeightPx * 0.264583; // px → mm

//       if (currentPageHeight + sectionHeightMm > CONTENT_HEIGHT_MM) {
//         section.classList.add("page-break");
//         currentPageHeight = sectionHeightMm;
//       } else {
//         section.classList.remove("page-break");
//         currentPageHeight += sectionHeightMm;
//       }
//     });
//   };

//   useLayoutEffect(() => {
//     autoPaginate();
//   }, [UseContext, isMobile]); // Added isMobile dependency

//   const buttonContainerStyle = {
//     textAlign: "center",
//     margin: "20px 0",
//     position: "sticky",
//     top: 0,
//     background: "#fff",
//     zIndex: 10,
//     padding: "10px",
//     display: "flex",
//     flexDirection: isMobile ? "column" : "row",
//     gap: "10px",
//     justifyContent: "center",
//     alignItems: "center",
//     boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//     borderBottom: "1px solid #eee",
//   };

//   const buttonStyle = {
//     padding: "12px 24px",
//     fontSize: isMobile ? "14px" : "16px",
//     fontWeight: "bold",
//     background: "red",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     width: isMobile ? "100%" : "auto",
//     maxWidth: "300px",
//     transition: "opacity 0.2s",
//   };

//   const mobileButtonStyle = {
//     ...buttonStyle,
//     background: "#4CAF50",
//     fontSize: "14px",
//     fontWeight: "normal",
//   };

//   return (
//     <>
//       {/* DOWNLOAD BUTTONS (NOT PRINTED) */}
//       <div className="download-buttons" style={buttonContainerStyle}>
//         <button
//           onClick={handlePrint}
//           style={buttonStyle}
//           onTouchStart={(e) => {
//             e.currentTarget.style.opacity = "0.8";
//           }}
//           onTouchEnd={(e) => {
//             e.currentTarget.style.opacity = "1";
//           }}
//         >
//           Download PDF
//         </button>

//         {/* Show alternative option on mobile */}
//         <>
//           <button
//             onClick={handleMobileDownload}
//             style={mobileButtonStyle}
//             onTouchStart={(e) => {
//               e.currentTarget.style.opacity = "0.8";
//             }}
//             onTouchEnd={(e) => {
//               e.currentTarget.style.opacity = "1";
//             }}
//           >
//             Download HTML (Mobile Friendly)
//           </button>

//           <div
//             style={{
//               fontSize: "12px",
//               color: "#666",
//               marginTop: "8px",
//               textAlign: "center",
//               maxWidth: "300px",
//               lineHeight: "1.4",
//             }}
//           >
//             <strong>Mobile Tips:</strong> If PDF doesn't work:
//             <br />
//             1. Use Chrome/Safari browser
//             <br />
//             2. Enable pop-ups in settings
//             <br />
//             3. Try HTML download above
//           </div>
//         </>
//       </div>

//       {/* RESUME */}
//       <div ref={resumeRef} className="resume-container resume">
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="contact-info resume-section">
//           <div className="name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="job-title">{contact?.jobTitle?.name}</div>
//           <div className="address">{addressParts.join(", ")}</div>

//           <div className="contact-details">
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//           </div>

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
//           </div>
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-content resume-section">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content"
//               dangerouslySetInnerHTML={{ __html: summary }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-content resume-section">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div key={i}>
//                 <div className="item-header">
//                   <div>
//                     <div className="item-title">{exp.jobTitle}</div>
//                     <div className="item-subtitle">
//                       {exp.employer} — {exp.location}
//                     </div>
//                   </div>
//                   <div className="item-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {" - "}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate} shortYear />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>
//                 <div
//                   className="item-content"
//                   dangerouslySetInnerHTML={{ __html: exp.text }}
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* EDUCATION */}
//         {educations?.length > 0 && (
//           <div className="section-content resume-section">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => (
//               <div key={edu._id || edu.id || index} className="education-item">
//                 <div className="item-header">
//                   <div>
//                     <div className="item-title">{edu.schoolname || ""}</div>
//                     {(edu.degree || edu.location) && (
//                       <div className="item-subtitle">
//                         {edu.degree && <span>{edu.degree}</span>}
//                         {edu.location && (
//                           <>
//                             {edu.degree && " — "}
//                             <span>{edu.location}</span>
//                           </>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   {(edu.startDate || edu.endDate) && (
//                     <div className="item-date">
//                       {edu.startDate || ""}
//                       {edu.startDate && edu.endDate && " - "}
//                       {edu.endDate || ""}
//                     </div>
//                   )}
//                 </div>
//                 {edu.text && (
//                   <div
//                     className="item-content"
//                     dangerouslySetInnerHTML={{ __html: edu.text }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* SKILLS */}
//         {skills.length > 0 && (
//           <div className="section-content resume-section">
//             <div className="section-title">Skills</div>
//             <div className="skills-grid">
//               {skills.map((skill, i) => (
//                 <div key={i}>
//                   <div className="skill-name">{skill.skill}</div>
//                   <div className="skill-bar">
//                     <div
//                       className="skill-level"
//                       style={{
//                         width: `${(Number(skill.level) / 4) * 100}%`,
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Languages Section */}
//         {Array.isArray(finalize?.languages) &&
//           finalize.languages.some(
//             (lang) => lang.name && lang.name.trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Languages</div>
//               <div className="skills-grid">
//                 {finalize.languages.map(
//                   (lang, index) =>
//                     lang.name &&
//                     lang.name.trim() !== "" && (
//                       <div key={lang._id || index} className="skill-item">
//                         <div className="skill-name">{lang.name}</div>
//                         {lang.level && (
//                           <div className="skill-bar">
//                             <div
//                               className="skill-level"
//                               style={{
//                                 width: `${(Number(lang.level) / 4) * 100}%`,
//                               }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Additional Sections */}
//         {Array.isArray(finalize?.certificationsAndLicenses) &&
//           finalize.certificationsAndLicenses.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Certifications and Licenses</div>
//               <div className="item-content">
//                 {finalize.certificationsAndLicenses.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {Array.isArray(finalize?.hobbiesAndInterests) &&
//           finalize.hobbiesAndInterests.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Hobbies and Interests</div>
//               <div className="item-content">
//                 {finalize.hobbiesAndInterests.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {Array.isArray(finalize?.awardsAndHonors) &&
//           finalize.awardsAndHonors.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Awards and Honors</div>
//               <div className="item-content">
//                 {finalize.awardsAndHonors.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Websites and Social Media */}
//         {Array.isArray(finalize?.websitesAndSocialMedia) &&
//           finalize.websitesAndSocialMedia.some(
//             (item) =>
//               (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//               (item.socialMedia && item.socialMedia.trim() !== ""),
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Websites and Social Media</div>
//               <div className="item-content">
//                 {finalize.websitesAndSocialMedia.map(
//                   (item, index) =>
//                     (item.websiteUrl || item.socialMedia) && (
//                       <div
//                         key={item.id || index}
//                         style={{ marginBottom: "5px" }}
//                       >
//                         {item.websiteUrl && (
//                           <div>Website: {item.websiteUrl}</div>
//                         )}
//                         {item.socialMedia && (
//                           <div>Social Media: {item.socialMedia}</div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* References */}
//         {Array.isArray(finalize?.references) &&
//           finalize.references.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">References</div>
//               <div className="item-content">
//                 {finalize.references.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Custom Sections */}
//         {Array.isArray(finalize?.customSection) &&
//           finalize.customSection.some(
//             (section) => section?.name?.trim() || section?.description?.trim(),
//           ) && (
//             <div className="section-content resume-section">
//               {finalize.customSection
//                 .filter(
//                   (section) =>
//                     section?.name?.trim() || section?.description?.trim(),
//                 )
//                 .map((section, index) => (
//                   <div key={section.id || index} className="custom-section">
//                     {section.name && (
//                       <div className="section-title">{section.name}</div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="item-content"
//                         dangerouslySetInnerHTML={{
//                           __html: section.description,
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default Resume4;

// import React, { useContext, useRef, useState, useLayoutEffect } from "react";
// import { useReactToPrint } from "react-to-print";
// import MonthYearDisplay from "../Componets/MonthYearDisplay";
// import { CreateContext } from "../App";

// const Resume4 = (alldetails) => {
//   const componentRef = useRef(null);
//   const UseContext = useContext(CreateContext);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const Allplans = UseContext?.allplandetails;

//   const contact = alldetails?.alldata?.contact || UseContext || {};
//   const educations =
//     alldetails?.alldata?.educations || UseContext?.education || [];
//   const experiences =
//     alldetails?.alldata?.experiences || UseContext?.experiences || [];
//   const skills = alldetails?.alldata?.skills || UseContext?.skills || [];
//   const finalize =
//     alldetails?.alldata?.finalize || UseContext?.globalSkillsData || {};
//   const summary = alldetails?.alldata?.summary || UseContext?.text || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.country,
//     contact?.postcode,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedin || contact?.linkedIn;

//   /* ===========================
//      EXACT SAME STYLES AS ORIGINAL
//   ============================ */
//   const styles = `
//     .resume-container {
//       width: 210mm;
//       min-height: 297mm;
//       background: #fff;
//       margin: 0 auto;
//       padding: 20px;
//       box-sizing: border-box;
//       font-family: Helvetica, Arial, sans-serif;
//     }

//     .resume-container * {
//       box-sizing: border-box;
//       margin: 0;
//       padding: 0;
//       font-family: inherit;
//     }

//     .contact-info {
//       text-align: center;
//       margin-bottom: 15px;
//     }

//     .name {
//       font-size: 22px;
//       font-weight: 800;
//       text-transform: uppercase;
//     }

//     .job-title {
//       font-size: 14px;
//       font-weight: 700;
//       margin-top: 2px;
//     }

//     .address {
//       font-size: 11px;
//       margin-top: 4px;
//     }

//     .contact-details {
//       display: flex;
//       justify-content: center;
//       gap: 20px;
//       margin-top: 6px;
//       font-size: 11px;
//       font-weight: 600;
//     }

//     .links {
//       display: flex;
//       justify-content: center;
//       gap: 15px;
//       margin-top: 6px;
//     }

//     .link-item {
//       font-size: 11px;
//       font-weight: 600;
//       text-decoration: none;
//       color: #000;
//     }

//     .section-title {
//       background: #f0f0f0;
//       height: 26px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       margin: 12px 0 8px;
//       page-break-after: avoid;
//     }

//     .section-content {
//       margin-bottom: 12px;
//       page-break-inside: avoid;
//     }

//     .item-header {
//       display: flex;
//       justify-content: space-between;
//       margin-bottom: 3px;
//     }

//     .item-title {
//       font-size: 13px;
//       font-weight: 700;
//     }

//     .item-subtitle {
//       font-size: 12px;
//       color: #555;
//     }

//     .item-date {
//       font-size: 11px;
//       white-space: nowrap;
//     }

//     .item-content {
//       font-size: 11px;
//       line-height: 1.5;
//       color: #444;
//     }

//     .skills-grid {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       gap: 12px;
//     }

//     .skill-name {
//       font-size: 11px;
//       margin-bottom: 2px;
//     }

//     .skill-bar {
//       height: 3px;
//       background: #e0e0e0;
//     }

//     .skill-level {
//       height: 100%;
//       background: #222;
//     }

//     @media print {
//       body {
//         margin: 0;
//       }
//       .no-print {
//         display: none !important;
//       }
//       a[href] {
//         color: #000;
//         text-decoration: none;
//       }
//     }

//     @page {
//       size: A4;
//       margin: 0;
//     }
//   `;

//   /* ===========================
//      MULTI-PAGE HTML GENERATOR WITH EXACT DESIGN
//   ============================ */
//   const generateMultiPageHTML = () => {
//     // Create all resume sections exactly as in your original design
//     let contentHtml = '';

//     // Header Section
//     contentHtml += `
//       <div class="contact-info">
//         <div class="name">
//           ${contact?.firstName} ${contact?.lastName}
//         </div>
//         <div class="job-title">${contact?.jobTitle?.name}</div>
//         <div class="address">${addressParts.join(", ")}</div>
//         <div class="contact-details">
//           ${contact?.email ? `<span>${contact.email}</span>` : ''}
//           ${contact?.phone ? `<span>${contact.phone}</span>` : ''}
//         </div>
//         <div class="links">
//           ${linkedinUrl ? `
//             <span class="link-item">
//               LinkedIn: ${linkedinUrl.replace(/https?:\/\//, '')}
//             </span>
//           ` : ''}
//         </div>
//       </div>
//     `;

//     // Summary Section
//     if (summary) {
//       contentHtml += `
//         <div class="section-content">
//           <div class="section-title">Summary</div>
//           <div class="item-content">${summary}</div>
//         </div>
//       `;
//     }

//     // Experience Section
//     if (experiences.length > 0) {
//       contentHtml += `
//         <div class="section-content">
//           <div class="section-title">Experience</div>
//           ${experiences.map((exp, i) => `
//             <div style="margin-bottom: 8px;">
//               <div class="item-header">
//                 <div>
//                   <div class="item-title">${exp.jobTitle || ''}</div>
//                   <div class="item-subtitle">
//                     ${exp.employer || ''} ${exp.location ? `— ${exp.location}` : ''}
//                   </div>
//                 </div>
//                 <div class="item-date">
//                   ${exp.startDate ? `<MonthYearDisplay value="${exp.startDate}" shortYear />` : ''}
//                   ${exp.startDate || exp.endDate ? ' - ' : ''}
//                   ${exp.endDate ? `<MonthYearDisplay value="${exp.endDate}" shortYear />` : (exp.startDate ? 'Present' : '')}
//                 </div>
//               </div>
//               <div class="item-content">${exp.text || ''}</div>
//             </div>
//           `).join('')}
//         </div>
//       `;
//     }

//     // Education Section
//     if (educations?.length > 0) {
//       contentHtml += `
//         <div class="section-content">
//           <div class="section-title">Education</div>
//           ${educations.map((edu, index) => `
//             <div class="education-item">
//               <div class="item-header">
//                 <div>
//                   <div class="item-title">${edu.schoolname || ''}</div>
//                   ${(edu.degree || edu.location) ? `
//                     <div class="item-subtitle">
//                       ${edu.degree || ''}
//                       ${edu.degree && edu.location ? ' — ' : ''}
//                       ${edu.location || ''}
//                     </div>
//                   ` : ''}
//                 </div>
//                 ${(edu.startDate || edu.endDate) ? `
//                   <div class="item-date">
//                     ${edu.startDate || ''}
//                     ${edu.startDate && edu.endDate ? ' - ' : ''}
//                     ${edu.endDate || ''}
//                   </div>
//                 ` : ''}
//               </div>
//               ${edu.text ? `<div class="item-content">${edu.text}</div>` : ''}
//             </div>
//           `).join('')}
//         </div>
//       `;
//     }

//     // Skills Section
//     if (skills.length > 0) {
//       contentHtml += `
//         <div class="section-content">
//           <div class="section-title">Skills</div>
//           <div class="skills-grid">
//             ${skills.map((skill, i) => `
//               <div>
//                 <div class="skill-name">${skill.skill || ''}</div>
//                 <div class="skill-bar">
//                   <div class="skill-level" style="width: ${(Number(skill.level) / 4) * 100}%;"></div>
//                 </div>
//               </div>
//             `).join('')}
//           </div>
//         </div>
//       `;
//     }

//     // Languages Section
//     if (Array.isArray(finalize?.languages) &&
//       finalize.languages.some(lang => lang.name && lang.name.trim() !== "")) {
//       contentHtml += `
//         <div class="section-content">
//           <div class="section-title">Languages</div>
//           <div class="skills-grid">
//             ${finalize.languages.map((lang, index) =>
//         lang.name && lang.name.trim() !== "" ? `
//                 <div class="skill-item">
//                   <div class="skill-name">${lang.name}</div>
//                   ${lang.level ? `
//                     <div class="skill-bar">
//                       <div class="skill-level" style="width: ${(Number(lang.level) / 4) * 100}%;"></div>
//                     </div>
//                   ` : ''}
//                 </div>
//               ` : ''
//       ).join('')}
//           </div>
//         </div>
//       `;
//     }

//     // Additional sections (simplified for brevity)
//     // Add all other sections here following the same pattern...

//     // Build the complete HTML document
//     const fullHtml = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Resume - ${contact?.firstName} ${contact?.lastName}</title>
//           <style>
//             ${styles}

//             /* Multi-page specific styles */
//             .resume-page {
//               width: 210mm;
//               min-height: 297mm;
//               background: #fff;
//               padding: 20px;
//               box-sizing: border-box;
//               font-family: Helvetica, Arial, sans-serif;
//               page-break-after: always;
//             }

//             .resume-page:last-child {
//               page-break-after: auto;
//             }

//             .page-header {
//               text-align: center;
//               margin-bottom: 15px;
//               border-bottom: 1px solid #ddd;
//               padding-bottom: 10px;
//             }

//             .page-header .name {
//               font-size: 18px;
//               font-weight: 800;
//               text-transform: uppercase;
//             }

//             .page-header .page-number {
//               font-size: 10px;
//               color: #666;
//               margin-top: 5px;
//             }

//             @media print {
//               body {
//                 margin: 0;
//                 padding: 0;
//                 background: white;
//               }

//               .resume-page {
//                 margin: 0;
//                 padding: 20px;
//                 box-shadow: none;
//               }

//               .section-title {
//                 -webkit-print-color-adjust: exact;
//                 print-color-adjust: exact;
//                 background: #f0f0f0 !important;
//               }

//               .skill-level {
//                 -webkit-print-color-adjust: exact;
//                 print-color-adjust: exact;
//                 background: #222 !important;
//               }
//             }

//             @page {
//               size: A4;
//               margin: 0;
//             }
//           </style>
//         </head>
//         <body>
//           <!-- First Page with Full Header -->
//           <div class="resume-page">
//             ${contentHtml}
//           </div>
//         </body>
//       </html>
//     `;

//     return fullHtml;
//   };

//   /* ===========================
//      HANDLE DOWNLOAD (NO PRINT DIALOG)
//   ============================ */
//   const handleDownload = () => {
//     setIsGenerating(true);

//     try {
//       // Generate the HTML
//       const htmlContent = generateMultiPageHTML();

//       // Create and download HTML file
//       const blob = new Blob([htmlContent], { type: 'text/html' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `Resume_${contact?.firstName || 'My'}_${contact?.lastName || 'Resume'}.html`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);

//     } catch (error) {
//       console.error('Error generating resume:', error);
//       alert('Error generating resume. Please try again.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   /* ===========================
//      PRINT HANDLER USING REACT-TO-PRINT
//   ============================ */
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: `${contact?.firstName || "Resume"}_${contact?.lastName || ""}`,
//     onBeforeGetContent: () => {
//       const button = document.querySelector('.download-button');
//       if (button) button.style.display = 'none';
//     },
//     onAfterPrint: () => {
//       const button = document.querySelector('.download-button');
//       if (button) button.style.display = 'block';
//     }
//   });

//   return (
//     <>
//       {/* Download Buttons */}
//       <div className="no-print" style={{
//         textAlign: "center",
//         margin: "20px 0",
//         position: "sticky",
//         top: 0,
//         background: "#fff",
//         zIndex: 10,
//         padding: "10px",
//         borderBottom: "1px solid #eee"
//       }}>
//         <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
//           <button
//             onClick={handleDownload}
//             disabled={isGenerating}
//             className="download-button"
//             style={{
//               padding: "12px 24px",
//               fontSize: "16px",
//               fontWeight: "bold",
//               background: isGenerating ? "#666" : "#d32f2f",
//               color: "#fff",
//               border: "none",
//               borderRadius: "4px",
//               cursor: isGenerating ? "not-allowed" : "pointer",
//               transition: "background 0.3s",
//               boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//               minWidth: "200px"
//             }}
//             onMouseEnter={(e) => {
//               if (!isGenerating) e.target.style.background = "#b71c1c";
//             }}
//             onMouseLeave={(e) => {
//               if (!isGenerating) e.target.style.background = "#d32f2f";
//             }}
//           >
//             {isGenerating ? "Generating..." : "Download HTML Resume"}
//           </button>

//           <button
//             onClick={handlePrint}
//             style={{
//               padding: "12px 24px",
//               fontSize: "16px",
//               fontWeight: "bold",
//               background: "#1976d2",
//               color: "#fff",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               transition: "background 0.3s",
//               boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//               minWidth: "200px"
//             }}
//             onMouseEnter={(e) => e.target.style.background = "#0d47a1"}
//             onMouseLeave={(e) => e.target.style.background = "#1976d2"}
//           >
//             Print Resume
//           </button>
//         </div>

//         <p style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>
//           Download HTML file to save and print, or use Print button for direct printing
//         </p>
//       </div>

//       {/* Resume Preview - EXACT SAME AS ORIGINAL */}
//       <div ref={componentRef} className="resume-container">
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="contact-info">
//           <div className="name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="job-title">{contact?.jobTitle?.name}</div>
//           <div className="address">{addressParts.join(", ")}</div>

//           <div className="contact-details">
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//           </div>

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
//           </div>
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-content resume-section">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content"
//               dangerouslySetInnerHTML={{ __html: summary }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-content resume-section">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div key={i}>
//                 <div className="item-header">
//                   <div>
//                     <div className="item-title">{exp.jobTitle}</div>
//                     <div className="item-subtitle">
//                       {exp.employer} — {exp.location}
//                     </div>
//                   </div>
//                   <div className="item-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {" - "}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate} shortYear />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>
//                 <div
//                   className="item-content"
//                   dangerouslySetInnerHTML={{ __html: exp.text }}
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* EDUCATION */}
//         {educations?.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => (
//               <div key={edu._id || edu.id || index} className="education-item">
//                 <div className="item-header">
//                   <div>
//                     <div className="item-title">{edu.schoolname || ""}</div>
//                     {(edu.degree || edu.location) && (
//                       <div className="item-subtitle">
//                         {edu.degree && <span>{edu.degree}</span>}
//                         {edu.location && (
//                           <>
//                             {edu.degree && " — "}
//                             <span>{edu.location}</span>
//                           </>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   {(edu.startDate || edu.endDate) && (
//                     <div className="item-date">
//                       {edu.startDate || ""}
//                       {edu.startDate && edu.endDate && " - "}
//                       {edu.endDate || ""}
//                     </div>
//                   )}
//                 </div>
//                 {edu.text && (
//                   <div
//                     className="item-content"
//                     dangerouslySetInnerHTML={{ __html: edu.text }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* SKILLS */}
//         {skills.length > 0 && (
//           <div className="section-content resume-section">
//             <div className="section-title">Skills</div>
//             <div className="skills-grid">
//               {skills.map((skill, i) => (
//                 <div key={i}>
//                   <div className="skill-name">{skill.skill}</div>
//                   <div className="skill-bar">
//                     <div
//                       className="skill-level"
//                       style={{
//                         width: `${(Number(skill.level) / 4) * 100}%`,
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Languages Section */}
//         {Array.isArray(finalize?.languages) &&
//           finalize.languages.some(
//             (lang) => lang.name && lang.name.trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Languages</div>
//               <div className="skills-grid">
//                 {finalize.languages.map(
//                   (lang, index) =>
//                     lang.name &&
//                     lang.name.trim() !== "" && (
//                       <div key={lang._id || index} className="skill-item">
//                         <div className="skill-name">{lang.name}</div>
//                         {lang.level && (
//                           <div className="skill-bar">
//                             <div
//                               className="skill-level"
//                               style={{
//                                 width: `${(Number(lang.level) / 4) * 100}%`,
//                               }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Additional Sections */}
//         {Array.isArray(finalize?.certificationsAndLicenses) &&
//           finalize.certificationsAndLicenses.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Certifications and Licenses</div>
//               <div className="item-content">
//                 {finalize.certificationsAndLicenses.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {Array.isArray(finalize?.hobbiesAndInterests) &&
//           finalize.hobbiesAndInterests.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Hobbies and Interests</div>
//               <div className="item-content">
//                 {finalize.hobbiesAndInterests.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {Array.isArray(finalize?.awardsAndHonors) &&
//           finalize.awardsAndHonors.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Awards and Honors</div>
//               <div className="item-content">
//                 {finalize.awardsAndHonors.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Websites and Social Media */}
//         {Array.isArray(finalize?.websitesAndSocialMedia) &&
//           finalize.websitesAndSocialMedia.some(
//             (item) =>
//               (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//               (item.socialMedia && item.socialMedia.trim() !== ""),
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Websites and Social Media</div>
//               <div className="item-content">
//                 {finalize.websitesAndSocialMedia.map(
//                   (item, index) =>
//                     (item.websiteUrl || item.socialMedia) && (
//                       <div
//                         key={item.id || index}
//                         style={{ marginBottom: "5px" }}
//                       >
//                         {item.websiteUrl && (
//                           <div>Website: {item.websiteUrl}</div>
//                         )}
//                         {item.socialMedia && (
//                           <div>Social Media: {item.socialMedia}</div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* References */}
//         {Array.isArray(finalize?.references) &&
//           finalize.references.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">References</div>
//               <div className="item-content">
//                 {finalize.references.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Custom Sections */}
//         {Array.isArray(finalize?.customSection) &&
//           finalize.customSection.some(
//             (section) => section?.name?.trim() || section?.description?.trim(),
//           ) && (
//             <div className="section-content resume-section">
//               {finalize.customSection
//                 .filter(
//                   (section) =>
//                     section?.name?.trim() || section?.description?.trim(),
//                 )
//                 .map((section, index) => (
//                   <div key={section.id || index} className="custom-section">
//                     {section.name && (
//                       <div className="section-title">{section.name}</div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="item-content"
//                         dangerouslySetInnerHTML={{
//                           __html: section.description,
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default Resume4;

// import React, { useContext, useRef, useState } from "react";
// import MonthYearDisplay from "../Componets/MonthYearDisplay";
// import { CreateContext } from "../App";
// import axios from "axios";

// const Resume4 = (alldetails) => {
//   const resumeRef = useRef(null);
//   const UseContext = useContext(CreateContext);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const Allplans = UseContext?.allplandetails;
//   const contact = alldetails?.alldata?.contact || UseContext || {};
//   const educations =
//     alldetails?.alldata?.educations || UseContext?.education || [];
//   const experiences =
//     alldetails?.alldata?.experiences || UseContext?.experiences || [];
//   const skills = alldetails?.alldata?.skills || UseContext?.skills || [];
//   const finalize =
//     alldetails?.alldata?.finalize || UseContext?.globalSkillsData || {};
//   const summary = alldetails?.alldata?.summary || UseContext?.text || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.country,
//     contact?.postcode,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedin || contact?.linkedIn;

//   /* ===========================
//      EXACT SAME STYLES AS ORIGINAL
//   ============================ */
//   const originalStyles = `
//     .resume-container {
//       width: 210mm;
//       min-height: 297mm;
//       background: #fff;
//       margin: 0 auto;
//       padding: 20px;
//       box-sizing: border-box;
//       font-family: Helvetica, Arial, sans-serif;
//     }

//     .resume-container * {
//       box-sizing: border-box;
//       margin: 0;
//       padding: 0;
//       font-family: inherit;
//     }

//     .contact-info {
//       text-align: center;
//       margin-bottom: 15px;
//     }

//     .name {
//       font-size: 22px;
//       font-weight: 800;
//       text-transform: uppercase;
//     }

//     .job-title {
//       font-size: 14px;
//       font-weight: 700;
//       margin-top: 2px;
//     }

//     .address {
//       font-size: 11px;
//       margin-top: 4px;
//     }

//     .contact-details {
//       display: flex;
//       justify-content: center;
//       gap: 20px;
//       margin-top: 6px;
//       font-size: 11px;
//       font-weight: 600;
//     }

//     .links {
//       display: flex;
//       justify-content: center;
//       gap: 15px;
//       margin-top: 6px;
//     }

//     .link-item {
//       font-size: 11px;
//       font-weight: 600;
//       text-decoration: none;
//       color: #000;
//     }

//     .section-title {
//       background: #f0f0f0;
//       height: 26px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       margin: 12px 0 8px;
//     }

//     .section-content {
//       margin-bottom: 12px;
//     }

//     .item-header {
//       display: flex;
//       justify-content: space-between;
//       margin-bottom: 3px;
//     }

//     .item-title {
//       font-size: 13px;
//       font-weight: 700;
//     }

//     .item-subtitle {
//       font-size: 12px;
//       color: #555;
//     }

//     .item-date {
//       font-size: 11px;
//       white-space: nowrap;
//     }

//     .item-content {
//       font-size: 11px;
//       line-height: 1.5;
//       color: #444;
//     }

//     .skills-grid {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       gap: 12px;
//     }

//     .skill-name {
//       font-size: 11px;
//       margin-bottom: 2px;
//     }

//     .skill-bar {
//       height: 3px;
//       background: #e0e0e0;
//     }

//     .skill-level {
//       height: 100%;
//       background: #222;
//     }
//   `;

//   /* ===========================
//      CREATE MULTI-PAGE RESUME
//   ============================ */
//   const createMultiPageResume = () => {
//     // Get all sections from the resume
//     const sections = [];

//     // Header section
//     const headerSection = `
//       <div class="contact-info">
//         <div class="name">${contact?.firstName} ${contact?.lastName}</div>
//         <div class="job-title">${contact?.jobTitle?.name}</div>
//         <div class="address">${addressParts.join(", ")}</div>
//         <div class="contact-details">
//           ${contact?.email ? `<span>${contact.email}</span>` : ""}
//           ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//         </div>
//         <div class="links">
//           ${linkedinUrl ? `<span class="link-item">LinkedIn: ${linkedinUrl.replace(/https?:\/\//, "")}</span>` : ""}
//         </div>
//       </div>
//     `;
//     sections.push({ type: "header", html: headerSection, height: 100 });

//     // Summary section
//     if (summary) {
//       const summarySection = `
//         <div class="section-content">
//           <div class="section-title">Summary</div>
//           <div class="item-content">${summary}</div>
//         </div>
//       `;
//       sections.push({ type: "summary", html: summarySection, height: 80 });
//     }

//     // Experience section
//     if (experiences.length > 0) {
//       let expHtml = "";
//       experiences.forEach((exp, i) => {
//         expHtml += `
//           <div style="margin-bottom: 8px;">
//             <div class="item-header">
//               <div>
//                 <div class="item-title">${exp.jobTitle}</div>
//                 <div class="item-subtitle">${exp.employer} — ${exp.location}</div>
//               </div>
//               <div class="item-date">
//                 ${exp.startDate ? new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""}
//                 -
//                 ${exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"}
//               </div>
//             </div>
//             <div class="item-content">${exp.text}</div>
//           </div>
//         `;
//       });
//       const experienceSection = `
//         <div class="section-content">
//           <div class="section-title">Experience</div>
//           ${expHtml}
//         </div>
//       `;
//       sections.push({
//         type: "experience",
//         html: experienceSection,
//         height: experiences.length * 60,
//       });
//     }

//     // Education section
//     if (educations?.length > 0) {
//       let eduHtml = "";
//       educations.forEach((edu, index) => {
//         eduHtml += `
//           <div class="education-item">
//             <div class="item-header">
//               <div>
//                 <div class="item-title">${edu.schoolname || ""}</div>
//                 ${
//                   edu.degree || edu.location
//                     ? `
//                   <div class="item-subtitle">
//                     ${edu.degree || ""}
//                     ${edu.degree && edu.location ? " — " : ""}
//                     ${edu.location || ""}
//                   </div>
//                 `
//                     : ""
//                 }
//               </div>
//               ${
//                 edu.startDate || edu.endDate
//                   ? `
//                 <div class="item-date">
//                   ${edu.startDate || ""}
//                   ${edu.startDate && edu.endDate ? " - " : ""}
//                   ${edu.endDate || ""}
//                 </div>
//               `
//                   : ""
//               }
//             </div>
//             ${edu.text ? `<div class="item-content">${edu.text}</div>` : ""}
//           </div>
//         `;
//       });
//       const educationSection = `
//         <div class="section-content">
//           <div class="section-title">Education</div>
//           ${eduHtml}
//         </div>
//       `;
//       sections.push({
//         type: "education",
//         html: educationSection,
//         height: educations.length * 40,
//       });
//     }

//     // Skills section
//     if (skills.length > 0) {
//       let skillsHtml = "";
//       skills.forEach((skill, i) => {
//         skillsHtml += `
//           <div>
//             <div class="skill-name">${skill.skill}</div>
//             <div class="skill-bar">
//               <div class="skill-level" style="width: ${(Number(skill.level) / 4) * 100}%;"></div>
//             </div>
//           </div>
//         `;
//       });
//       const skillsSection = `
//         <div class="section-content">
//           <div class="section-title">Skills</div>
//           <div class="skills-grid">
//             ${skillsHtml}
//           </div>
//         </div>
//       `;
//       sections.push({
//         type: "skills",
//         html: skillsSection,
//         height: Math.ceil(skills.length / 2) * 30,
//       });
//     }

//     // Other sections (simplified for brevity)
//     // Add languages, certifications, etc. here...

//     // Split sections into pages
//     const pageHeight = 297; // A4 height in mm
//     const usableHeight = pageHeight - 40; // Account for margins
//     const pages = [];
//     let currentPage = [];
//     let currentHeight = 0;

//     sections.forEach((section, index) => {
//       // If adding this section would exceed page height, start new page
//       if (
//         currentHeight + section.height > usableHeight &&
//         currentPage.length > 0
//       ) {
//         pages.push([...currentPage]);
//         currentPage = [section];
//         currentHeight = section.height;
//       } else {
//         currentPage.push(section);
//         currentHeight += section.height;
//       }

//       // If this is the last section, add to pages
//       if (index === sections.length - 1 && currentPage.length > 0) {
//         pages.push([...currentPage]);
//       }
//     });

//     // Build HTML for each page
//     let pagesHtml = "";
//     pages.forEach((pageSections, pageIndex) => {
//       let pageContent = "";

//       pageSections.forEach((section, sectionIndex) => {
//         // For subsequent pages after first, we need to handle headers differently
//         if (pageIndex > 0 && sectionIndex === 0) {
//           // Add continuation header
//           pageContent += `
//             <div style="text-align: center; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
//               <div style="font-size: 18px; font-weight: bold;">${contact?.firstName} ${contact?.lastName}</div>
//               <div style="font-size: 10px; color: #666; margin-top: 5px;">
//                 Page ${pageIndex + 1} of ${pages.length} • Continued
//               </div>
//             </div>
//           `;
//         }
//         pageContent += section.html;
//       });

//       pagesHtml += `
//         <div class="resume-page" style="page-break-after: ${pageIndex < pages.length - 1 ? "always" : "auto"}">
//           ${pageContent}
//         </div>
//       `;
//     });

//     return pagesHtml;
//   };

//   /* ===========================
//      DOWNLOAD MULTI-PAGE HTML RESUME
//   ============================ */
//   const handleDownload = async () => {
//     setIsGenerating(true);

//     try {
//       const pagesHtml = createMultiPageResume();

//       const fullHtml = `
//           <!DOCTYPE html>
//           <html>
//           <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>${contact?.firstName} ${contact?.lastName} - Resume</title>
//             <style>
//               ${originalStyles}

//               /* Multi-page styles */
//               .resume-page {
//                 width: 210mm;
//                 min-height: 297mm;
//                 background: #fff;
//                 padding: 20px;
//                 box-sizing: border-box;
//                 font-family: Helvetica, Arial, sans-serif;
//               }

//               @media print {
//                 @page {
//                   size: A4;
//                   margin: 0;
//                 }

//                 body {
//                   margin: 0;
//                   padding: 0;
//                   background: white;
//                   width: 210mm;
//                 }

//                 .resume-page {
//                   page-break-after: always;
//                   margin: 0;
//                   padding: 20px;
//                   box-shadow: none;
//                 }

//                 .resume-page:last-child {
//                   page-break-after: auto;
//                 }

//                 .section-title {
//                   -webkit-print-color-adjust: exact;
//                   print-color-adjust: exact;
//                   background: #f0f0f0 !important;
//                 }

//                 .skill-level {
//                   -webkit-print-color-adjust: exact;
//                   print-color-adjust: exact;
//                   background: #222 !important;
//                 }
//               }

//               @media screen {
//                 body {
//                   background: #f5f5f5;
//                   padding: 20px;
//                 }

//                 .resume-page {
//                   margin-bottom: 20px;
//                   box-shadow: 0 0 10px rgba(0,0,0,0.1);
//                 }

//                 .resume-page:last-child {
//                   margin-bottom: 0;
//                 }
//               }
//             </style>
//           </head>
//           <body>
//             ${pagesHtml}
//           </body>
//           </html>
//         `;

//       const res = await axios.post(
//         "http://192.168.29.114:3015/api/candidates/generate-pdf",
//         { html: fullHtml },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           responseType: "blob", // important if API returns PDF file
//         },
//       );

//       console.log(res);

//       const blob = res.data;

//       console.log("blob",blob)

//       const url = window.URL.createObjectURL(blob);

//             console.log("url",url)

//       const a = document.createElement("a");

//       console.log("a",a)

//       a.href = url;
//       a.download = `${contact?.firstName || "Resume"}.pdf`;

//       document.body.appendChild(a); // important

//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);

//     } catch (error) {
//       console.error("Error generating resume:", error);
//       alert("Error generating resume. Please try again.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <>
//       {/* Download Buttons */}
//       <div
//         style={{
//           textAlign: "center",
//           margin: "20px 0",
//           position: "sticky",
//           top: 0,
//           background: "#fff",
//           zIndex: 10,
//           padding: "10px",
//           borderBottom: "1px solid #eee",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "20px",
//             flexWrap: "wrap",
//           }}
//         >
//           <button
//             onClick={handleDownload}
//             disabled={isGenerating}
//             style={{
//               padding: "12px 24px",
//               fontSize: "16px",
//               fontWeight: "bold",
//               background: isGenerating ? "#666" : "#d32f2f",
//               color: "#fff",
//               border: "none",
//               borderRadius: "4px",
//               cursor: isGenerating ? "not-allowed" : "pointer",
//               transition: "background 0.3s",
//               boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//               minWidth: "200px",
//             }}
//           >
//             {isGenerating ? "Generating..." : "Download Multi-Page Resume"}
//           </button>
//         </div>

//       </div>

//       {/* Resume Preview - Exactly like original */}
//       <div ref={resumeRef} className="resume-container">
//         <style>{originalStyles}</style>

//         {/* HEADER */}
//         <div className="contact-info">
//           <div className="name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="job-title">{contact?.jobTitle?.name}</div>
//           <div className="address">{addressParts.join(", ")}</div>

//           <div className="contact-details">
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//           </div>

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
//           </div>
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-content resume-section">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content"
//               dangerouslySetInnerHTML={{ __html: summary }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-content resume-section">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div key={i}>
//                 <div className="item-header">
//                   <div>
//                     <div className="item-title">{exp.jobTitle}</div>
//                     <div className="item-subtitle">
//                       {exp.employer} — {exp.location}
//                     </div>
//                   </div>
//                   <div className="item-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {" - "}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate} shortYear />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>
//                 <div
//                   className="item-content"
//                   dangerouslySetInnerHTML={{ __html: exp.text }}
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* EDUCATION */}
//         {educations?.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => (
//               <div key={edu._id || edu.id || index} className="education-item">
//                 <div className="item-header">
//                   <div>
//                     <div className="item-title">{edu.schoolname || ""}</div>
//                     {(edu.degree || edu.location) && (
//                       <div className="item-subtitle">
//                         {edu.degree && <span>{edu.degree}</span>}
//                         {edu.location && (
//                           <>
//                             {edu.degree && " — "}
//                             <span>{edu.location}</span>
//                           </>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   {(edu.startDate || edu.endDate) && (
//                     <div className="item-date">
//                       {edu.startDate || ""}
//                       {edu.startDate && edu.endDate && " - "}
//                       {edu.endDate || ""}
//                     </div>
//                   )}
//                 </div>
//                 {edu.text && (
//                   <div
//                     className="item-content"
//                     dangerouslySetInnerHTML={{ __html: edu.text }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* SKILLS */}
//         {skills.length > 0 && (
//           <div className="section-content resume-section">
//             <div className="section-title">Skills</div>
//             <div className="skills-grid">
//               {skills.map((skill, i) => (
//                 <div key={i}>
//                   <div className="skill-name">{skill.skill}</div>
//                   <div className="skill-bar">
//                     <div
//                       className="skill-level"
//                       style={{
//                         width: `${(Number(skill.level) / 4) * 100}%`,
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Languages Section */}
//         {Array.isArray(finalize?.languages) &&
//           finalize.languages.some(
//             (lang) => lang.name && lang.name.trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Languages</div>
//               <div className="skills-grid">
//                 {finalize.languages.map(
//                   (lang, index) =>
//                     lang.name &&
//                     lang.name.trim() !== "" && (
//                       <div key={lang._id || index} className="skill-item">
//                         <div className="skill-name">{lang.name}</div>
//                         {lang.level && (
//                           <div className="skill-bar">
//                             <div
//                               className="skill-level"
//                               style={{
//                                 width: `${(Number(lang.level) / 4) * 100}%`,
//                               }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Additional Sections */}
//         {Array.isArray(finalize?.certificationsAndLicenses) &&
//           finalize.certificationsAndLicenses.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Certifications and Licenses</div>
//               <div className="item-content">
//                 {finalize.certificationsAndLicenses.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {Array.isArray(finalize?.hobbiesAndInterests) &&
//           finalize.hobbiesAndInterests.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Hobbies and Interests</div>
//               <div className="item-content">
//                 {finalize.hobbiesAndInterests.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {Array.isArray(finalize?.awardsAndHonors) &&
//           finalize.awardsAndHonors.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Awards and Honors</div>
//               <div className="item-content">
//                 {finalize.awardsAndHonors.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Websites and Social Media */}
//         {Array.isArray(finalize?.websitesAndSocialMedia) &&
//           finalize.websitesAndSocialMedia.some(
//             (item) =>
//               (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//               (item.socialMedia && item.socialMedia.trim() !== ""),
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Websites and Social Media</div>
//               <div className="item-content">
//                 {finalize.websitesAndSocialMedia.map(
//                   (item, index) =>
//                     (item.websiteUrl || item.socialMedia) && (
//                       <div
//                         key={item.id || index}
//                         style={{ marginBottom: "5px" }}
//                       >
//                         {item.websiteUrl && (
//                           <div>Website: {item.websiteUrl}</div>
//                         )}
//                         {item.socialMedia && (
//                           <div>Social Media: {item.socialMedia}</div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* References */}
//         {Array.isArray(finalize?.references) &&
//           finalize.references.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">References</div>
//               <div className="item-content">
//                 {finalize.references.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Custom Sections */}
//         {Array.isArray(finalize?.customSection) &&
//           finalize.customSection.some(
//             (section) => section?.name?.trim() || section?.description?.trim(),
//           ) && (
//             <div className="section-content resume-section">
//               {finalize.customSection
//                 .filter(
//                   (section) =>
//                     section?.name?.trim() || section?.description?.trim(),
//                 )
//                 .map((section, index) => (
//                   <div key={section.id || index} className="custom-section">
//                     {section.name && (
//                       <div className="section-title">{section.name}</div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="item-content"
//                         dangerouslySetInnerHTML={{
//                           __html: section.description,
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default Resume4;

// import React, { useContext, useRef, useState } from "react";
// import MonthYearDisplay from "../Componets/MonthYearDisplay";
// import { CreateContext } from "../App";
// import axios from "axios";

// const Resume4 = (alldetails) => {
//   const resumeRef = useRef(null);
//   const UseContext = useContext(CreateContext);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const Allplans = UseContext?.allplandetails;
//   const contact = alldetails?.alldata?.contact || UseContext || {};
//   const educations =
//     alldetails?.alldata?.educations || UseContext?.education || [];
//   const experiences =
//     alldetails?.alldata?.experiences || UseContext?.experiences || [];
//   const skills = alldetails?.alldata?.skills || UseContext?.skills || [];
//   const finalize =
//     alldetails?.alldata?.finalize || UseContext?.globalSkillsData || {};
//   const summary = alldetails?.alldata?.summary || UseContext?.text || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.country,
//     contact?.postcode,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedin || contact?.linkedIn;

//   /* ===========================
//      EXACT SAME STYLES AS ORIGINAL
//   ============================ */
//   const originalStyles = `
//     .resume-container {
//       width: 210mm;
//       min-height: 297mm;
//       background: #fff;
//       margin: 0 auto;
//       padding: 20px;
//       box-sizing: border-box;
//       font-family: Helvetica, Arial, sans-serif;
//     }

//     .resume-container * {
//       box-sizing: border-box;
//       margin: 0;
//       padding: 0;
//       font-family: inherit;
//     }

//     .contact-info {
//       text-align: center;
//       margin-bottom: 15px;
//     }

//     .name {
//       font-size: 22px;
//       font-weight: 800;
//       text-transform: uppercase;
//     }

//     .job-title {
//       font-size: 14px;
//       font-weight: 700;
//       margin-top: 2px;
//     }

//     .address {
//       font-size: 11px;
//       margin-top: 4px;
//     }

//     .contact-details {
//       display: flex;
//       justify-content: center;
//       gap: 20px;
//       margin-top: 6px;
//       font-size: 11px;
//       font-weight: 600;
//     }

//     .links {
//       display: flex;
//       justify-content: center;
//       gap: 15px;
//       margin-top: 6px;
//     }

//     .link-item {
//       font-size: 11px;
//       font-weight: 600;
//       text-decoration: none;
//       color: #000;
//     }

//     .section-title {
//       background: #f0f0f0;
//       height: 26px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       margin: 12px 0 8px;
//     }

//     .section-content {
//       margin-bottom: 12px;
//     }

//     .item-header {
//       display: flex;
//       justify-content: space-between;
//       margin-bottom: 3px;
//     }

//     .item-title {
//       font-size: 13px;
//       font-weight: 700;
//     }

//     .item-subtitle {
//       font-size: 12px;
//       color: #555;
//     }

//     .item-date {
//       font-size: 11px;
//       white-space: nowrap;
//     }

//     .item-content {
//       font-size: 11px;
//       line-height: 1.5;
//       color: #444;
//     }

//     .skills-grid {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       gap: 12px;
//     }

//     .skill-name {
//       font-size: 11px;
//       margin-bottom: 2px;
//     }

//     .skill-bar {
//       height: 3px;
//       background: #e0e0e0;
//     }

//     .skill-level {
//       height: 100%;
//       background: #222;
//     }
//   `;

//   /* ===========================
//      CREATE MULTI-PAGE RESUME WITH SMART PAGE BREAKS
//   ============================ */
//   const createMultiPageResume = () => {
//     // Helper function to create section HTML
//     const createSection = (title, content) => {
//       return `
//         <div class="section-content">
//           <div class="section-title">${title}</div>
//           ${content}
//         </div>
//       `;
//     };

//     // Helper function to create experience item
//     const createExperienceItem = (exp) => {
//       return `
//         <div style="margin-bottom: 8px;">
//           <div class="item-header">
//             <div>
//               <div class="item-title">${exp.jobTitle}</div>
//               <div class="item-subtitle">${exp.employer} — ${exp.location}</div>
//             </div>
//             <div class="item-date">
//               ${exp.startDate ? new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""}
//               -
//               ${exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"}
//             </div>
//           </div>
//           <div class="item-content">${exp.text}</div>
//         </div>
//       `;
//     };

//     // Helper function to create education item
//     const createEducationItem = (edu) => {
//       return `
//         <div class="education-item">
//           <div class="item-header">
//             <div>
//               <div class="item-title">${edu.schoolname || ""}</div>
//               ${
//                 edu.degree || edu.location
//                   ? `
//                 <div class="item-subtitle">
//                   ${edu.degree || ""}
//                   ${edu.degree && edu.location ? " — " : ""}
//                   ${edu.location || ""}
//                 </div>
//               `
//                   : ""
//               }
//             </div>
//             ${
//               edu.startDate || edu.endDate
//                 ? `
//               <div class="item-date">
//                 ${edu.startDate || ""}
//                 ${edu.startDate && edu.endDate ? " - " : ""}
//                 ${edu.endDate || ""}
//               </div>
//             `
//                 : ""
//             }
//           </div>
//           ${edu.text ? `<div class="item-content">${edu.text}</div>` : ""}
//         </div>
//       `;
//     };

//     // Helper function to create skill item
//     const createSkillItem = (skill) => {
//       return `
//         <div>
//           <div class="skill-name">${skill.skill}</div>
//           <div class="skill-bar">
//             <div class="skill-level" style="width: ${(Number(skill.level) / 4) * 100}%;"></div>
//           </div>
//         </div>
//       `;
//     };

//     // Build header section
//     const headerSection = `
//       <div class="contact-info">
//         <div class="name">${contact?.firstName} ${contact?.lastName}</div>
//         <div class="job-title">${contact?.jobTitle?.name}</div>
//         <div class="address">${addressParts.join(", ")}</div>
//         <div class="contact-details">
//           ${contact?.email ? `<span>${contact.email}</span>` : ""}
//           ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//         </div>
//         <div class="links">
//           ${linkedinUrl ? `<span class="link-item">LinkedIn: ${linkedinUrl.replace(/https?:\/\//, "")}</span>` : ""}
//         </div>
//       </div>
//     `;

//     // Build summary section
//     const summarySection = summary
//       ? createSection("Summary", `<div class="item-content">${summary}</div>`)
//       : "";

//     // Build experience section
//     let experienceContent = "";
//     if (experiences.length > 0) {
//       experiences.forEach((exp) => {
//         experienceContent += createExperienceItem(exp);
//       });
//     }
//     const experienceSection = experienceContent
//       ? createSection("Experience", experienceContent)
//       : "";

//     // Build education section
//     let educationContent = "";
//     if (educations.length > 0) {
//       educations.forEach((edu) => {
//         educationContent += createEducationItem(edu);
//       });
//     }
//     const educationSection = educationContent
//       ? createSection("Education", educationContent)
//       : "";

//     // Build skills section
//     let skillsContent = "";
//     if (skills.length > 0) {
//       skillsContent = `<div class="skills-grid">`;
//       skills.forEach((skill) => {
//         skillsContent += createSkillItem(skill);
//       });
//       skillsContent += `</div>`;
//     }
//     const skillsSection = skillsContent
//       ? createSection("Skills", skillsContent)
//       : "";

//     // Build languages section
//     let languagesContent = "";
//     if (Array.isArray(finalize?.languages) && finalize.languages.length > 0) {
//       const validLanguages = finalize.languages.filter(lang => lang.name && lang.name.trim() !== "");
//       if (validLanguages.length > 0) {
//         languagesContent = `<div class="skills-grid">`;
//         validLanguages.forEach((lang) => {
//           languagesContent += `
//             <div>
//               <div class="skill-name">${lang.name}</div>
//               ${lang.level ? `
//                 <div class="skill-bar">
//                   <div class="skill-level" style="width: ${(Number(lang.level) / 4) * 100}%;"></div>
//                 </div>
//               ` : ''}
//             </div>
//           `;
//         });
//         languagesContent += `</div>`;
//       }
//     }
//     const languagesSection = languagesContent
//       ? createSection("Languages", languagesContent)
//       : "";

//     // Build other sections
//     const otherSections = [];

//     // Certifications
//     if (Array.isArray(finalize?.certificationsAndLicenses)) {
//       const validCerts = finalize.certificationsAndLicenses.filter(
//         item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//       );
//       if (validCerts.length > 0) {
//         let certContent = "";
//         validCerts.forEach((item) => {
//           certContent += `<div class="item-content">${item.name}</div>`;
//         });
//         otherSections.push(createSection("Certifications and Licenses", certContent));
//       }
//     }

//     // Hobbies
//     if (Array.isArray(finalize?.hobbiesAndInterests)) {
//       const validHobbies = finalize.hobbiesAndInterests.filter(
//         item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//       );
//       if (validHobbies.length > 0) {
//         let hobbiesContent = "";
//         validHobbies.forEach((item) => {
//           hobbiesContent += `<div class="item-content">${item.name}</div>`;
//         });
//         otherSections.push(createSection("Hobbies and Interests", hobbiesContent));
//       }
//     }

//     // Awards
//     if (Array.isArray(finalize?.awardsAndHonors)) {
//       const validAwards = finalize.awardsAndHonors.filter(
//         item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//       );
//       if (validAwards.length > 0) {
//         let awardsContent = "";
//         validAwards.forEach((item) => {
//           awardsContent += `<div class="item-content">${item.name}</div>`;
//         });
//         otherSections.push(createSection("Awards and Honors", awardsContent));
//       }
//     }

//     // Websites
//     if (Array.isArray(finalize?.websitesAndSocialMedia)) {
//       const validWebsites = finalize.websitesAndSocialMedia.filter(
//         item => (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//                 (item.socialMedia && item.socialMedia.trim() !== "")
//       );
//       if (validWebsites.length > 0) {
//         let websitesContent = "";
//         validWebsites.forEach((item) => {
//           websitesContent += `
//             <div style="margin-bottom: 5px;">
//               ${item.websiteUrl ? `<div>Website: ${item.websiteUrl}</div>` : ""}
//               ${item.socialMedia ? `<div>Social Media: ${item.socialMedia}</div>` : ""}
//             </div>
//           `;
//         });
//         otherSections.push(createSection("Websites and Social Media", `<div class="item-content">${websitesContent}</div>`));
//       }
//     }

//     // References
//     if (Array.isArray(finalize?.references)) {
//       const validRefs = finalize.references.filter(
//         item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//       );
//       if (validRefs.length > 0) {
//         let refsContent = "";
//         validRefs.forEach((item) => {
//           refsContent += `<div class="item-content">${item.name}</div>`;
//         });
//         otherSections.push(createSection("References", refsContent));
//       }
//     }

//     // Custom Sections
//     if (Array.isArray(finalize?.customSection)) {
//       const validCustomSections = finalize.customSection.filter(
//         section => section?.name?.trim() || section?.description?.trim()
//       );
//       validCustomSections.forEach((section) => {
//         const customContent = `
//           ${section.name ? `<div class="section-title">${section.name}</div>` : ""}
//           ${section.description ? `<div class="item-content">${section.description}</div>` : ""}
//         `;
//         otherSections.push(`<div class="section-content">${customContent}</div>`);
//       });
//     }

//     // Combine all sections in order
//     const allSections = [
//       { id: "header", content: headerSection, isHeader: true },
//       { id: "summary", content: summarySection },
//       { id: "experience", content: experienceSection },
//       { id: "education", content: educationSection },
//       { id: "skills", content: skillsSection },
//       { id: "languages", content: languagesSection },
//       ...otherSections.map((content, index) => ({
//         id: `other-${index}`,
//         content
//       }))
//     ].filter(section => section.content && section.content.trim() !== "");

//     // Calculate approximate content height (in pixels)
//     // A4 page: 210mm x 297mm ≈ 794px x 1123px at 96 DPI
//     const pageHeightPx = 1123;
//     const pagePaddingTop = 40;
//     const pagePaddingBottom = 40;
//     const usableHeight = pageHeightPx - pagePaddingTop - pagePaddingBottom;

//     // Split into pages
//     const pages = [];
//     let currentPageContent = "";
//     let currentHeight = 0;
//     let pageNumber = 1;

//     allSections.forEach((section, index) => {
//       // Estimate section height (very rough estimate)
//       let sectionHeight = 0;
//       if (section.isHeader) {
//         sectionHeight = 150; // Header is taller
//       } else if (section.id === "experience") {
//         sectionHeight = experiences.length * 100;
//       } else if (section.id === "education") {
//         sectionHeight = educations.length * 80;
//       } else if (section.id === "skills" || section.id === "languages") {
//         const skillCount = section.id === "skills" ? skills.length :
//                           finalize?.languages?.filter(l => l.name?.trim()).length || 0;
//         sectionHeight = Math.ceil(skillCount / 2) * 40 + 40;
//       } else {
//         sectionHeight = 100; // Default height for other sections
//       }

//       // If adding this section would exceed page height, start new page
//       if (currentHeight + sectionHeight > usableHeight && currentPageContent) {
//         // Add page header for continuation pages
//         let pageContent = "";
//         if (pageNumber === 1) {
//           pageContent = currentPageContent;
//         } else {
//           // Add proper margin-top to continuation pages
//           pageContent = `
//             <div style="margin-top: 40px;">
//               <div style="text-align: center; margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
//                 <div style="font-size: 18px; font-weight: bold;">${contact?.firstName} ${contact?.lastName}</div>
//                 <div style="font-size: 10px; color: #666; margin-top: 5px;">
//                   Page ${pageNumber}
//                 </div>
//               </div>
//               ${currentPageContent}
//             </div>
//           `;
//         }

//         pages.push({
//           number: pageNumber,
//           content: pageContent
//         });

//         pageNumber++;
//         currentPageContent = section.content;
//         currentHeight = sectionHeight;
//       } else {
//         currentPageContent += section.content;
//         currentHeight += sectionHeight;
//       }

//       // If this is the last section, add to pages
//       if (index === allSections.length - 1) {
//         let pageContent = "";
//         if (pageNumber === 1) {
//           pageContent = currentPageContent;
//         } else {
//           // Add proper margin-top to continuation pages
//           pageContent = `
//             <div style="margin-top: 40px;">
//               <div style="text-align: center; margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
//                 <div style="font-size: 18px; font-weight: bold;">${contact?.firstName} ${contact?.lastName}</div>
//                 <div style="font-size: 10px; color: #666; margin-top: 5px;">
//                   Page ${pageNumber}
//                 </div>
//               </div>
//               ${currentPageContent}
//             </div>
//           `;
//         }

//         pages.push({
//           number: pageNumber,
//           content: pageContent
//         });
//       }
//     });

//     return pages;
//   };

//   /* ===========================
//      DOWNLOAD MULTI-PAGE HTML RESUME
//   ============================ */
//   const handleDownload = async () => {
//     setIsGenerating(true);

//     try {
//       const pages = createMultiPageResume();

//       // Build HTML for all pages
//       let pagesHtml = "";
//       pages.forEach((page, index) => {
//         pagesHtml += `
//           <div class="resume-page" style="page-break-after: ${index < pages.length - 1 ? 'always' : 'auto'};">
//             <style>
//               .resume-page {
//                 width: 210mm;
//                 min-height: 297mm;
//                 background: #fff;
//                 padding: ${page.number === 1 ? '20mm' : '0 20mm'};
//                 box-sizing: border-box;
//                 font-family: Helvetica, Arial, sans-serif;
//                 ${page.number > 1 ? 'padding-top: 20mm;' : ''}
//               }

//               .resume-page * {
//                 box-sizing: border-box;
//                 margin: 0;
//                 padding: 0;
//                 font-family: inherit;
//               }

//               .contact-info {
//                 text-align: center;
//                 margin-bottom: 15px;
//               }

//               .name {
//                 font-size: 22px;
//                 font-weight: 800;
//                 text-transform: uppercase;
//               }

//               .job-title {
//                 font-size: 14px;
//                 font-weight: 700;
//                 margin-top: 2px;
//               }

//               .address {
//                 font-size: 11px;
//                 margin-top: 4px;
//               }

//               .contact-details {
//                 display: flex;
//                 justify-content: center;
//                 gap: 20px;
//                 margin-top: 6px;
//                 font-size: 11px;
//                 font-weight: 600;
//               }

//               .links {
//                 display: flex;
//                 justify-content: center;
//                 gap: 15px;
//                 margin-top: 6px;
//               }

//               .link-item {
//                 font-size: 11px;
//                 font-weight: 600;
//                 text-decoration: none;
//                 color: #000;
//               }

//               .section-title {
//                 background: #f0f0f0;
//                 height: 26px;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 font-size: 14px;
//                 font-weight: 700;
//                 text-transform: uppercase;
//                 margin: 12px 0 8px;
//               }

//               .section-content {
//                 margin-bottom: 12px;
//               }

//               .item-header {
//                 display: flex;
//                 justify-content: space-between;
//                 margin-bottom: 3px;
//               }

//               .item-title {
//                 font-size: 13px;
//                 font-weight: 700;
//               }

//               .item-subtitle {
//                 font-size: 12px;
//                 color: #555;
//               }

//               .item-date {
//                 font-size: 11px;
//                 white-space: nowrap;
//               }

//               .item-content {
//                 font-size: 11px;
//                 line-height: 1.5;
//                 color: #444;
//               }

//               .skills-grid {
//                 display: grid;
//                 grid-template-columns: repeat(2, 1fr);
//                 gap: 12px;
//               }

//               .skill-name {
//                 font-size: 11px;
//                 margin-bottom: 2px;
//               }

//               .skill-bar {
//                 height: 3px;
//                 background: #e0e0e0;
//               }

//               .skill-level {
//                 height: 100%;
//                 background: #222;
//               }

//               /* Ensure proper spacing for continuation pages */
//               .resume-page-continued {
//                 padding-top: 20mm;
//               }
//             </style>
//             ${page.content}
//           </div>
//         `;
//       });

//       const fullHtml = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>${contact?.firstName} ${contact?.lastName} - Resume</title>
//           <style>
//             /* Reset margins for print */
//             * {
//               margin: 0;
//               padding: 0;
//               box-sizing: border-box;
//             }

//             @media print {
//               @page {
//                 size: A4;
//                 margin: 0;
//               }

//               body {
//                 margin: 0;
//                 padding: 0;
//                 width: 210mm;
//                 height: 297mm;
//               }

//               .resume-page {
//                 width: 210mm;
//                 min-height: 297mm;
//                 max-height: 297mm;
//                 page-break-after: always;
//                 overflow: hidden;
//               }

//               .resume-page:last-child {
//                 page-break-after: avoid;
//               }

//               /* Page 1 has normal padding */
//               .resume-page:first-child {
//                 padding: 20mm !important;
//               }

//               /* Pages 2+ have top padding for header */
//               .resume-page:not(:first-child) {
//                 padding: 20mm 20mm !important;
//               }

//               /* Section title colors */
//               .section-title {
//                 -webkit-print-color-adjust: exact;
//                 print-color-adjust: exact;
//                 background: #f0f0f0 !important;
//               }

//               /* Skill bar colors */
//               .skill-level {
//                 -webkit-print-color-adjust: exact;
//                 print-color-adjust: exact;
//                 background: #222 !important;
//               }

//               /* Ensure header on continuation pages has proper spacing */
//               .resume-page:not(:first-child) .page-header {
//                 margin-top: 0;
//                 padding-top: 0;
//               }
//             }

//             @media screen {
//               body {
//                 background: #f5f5f5;
//                 padding: 20px;
//                 display: flex;
//                 flex-direction: column;
//                 align-items: center;
//               }

//               .resume-page {
//                 margin-bottom: 20px;
//                 box-shadow: 0 0 10px rgba(0,0,0,0.1);
//                 background: white;
//               }

//               .resume-page:last-child {
//                 margin-bottom: 0;
//               }
//             }
//           </style>
//         </head>
//         <body>
//           ${pagesHtml}
//         </body>
//         </html>
//       `;

//       const res = await axios.post(
//         "http://192.168.29.114:3015/api/candidates/generate-pdf",
//         { html: fullHtml },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           responseType: "blob",
//         }
//       );

//       const blob = res.data;
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `${contact?.firstName || "Resume"}_${contact?.lastName || ""}.pdf`.trim();
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);

//     } catch (error) {
//       console.error("Error generating resume:", error);
//       alert("Error generating resume. Please try again.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // Render the preview (single page view for UI)
//   return (
//     <>
//       {/* Download Buttons */}
//       <div
//         style={{
//           textAlign: "center",
//           margin: "20px 0",
//           position: "sticky",
//           top: 0,
//           background: "#fff",
//           zIndex: 10,
//           padding: "10px",
//           borderBottom: "1px solid #eee",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "20px",
//             flexWrap: "wrap",
//           }}
//         >
//           <button
//             onClick={handleDownload}
//             disabled={isGenerating}
//             style={{
//               padding: "12px 24px",
//               fontSize: "16px",
//               fontWeight: "bold",
//               background: isGenerating ? "#666" : "#d32f2f",
//               color: "#fff",
//               border: "none",
//               borderRadius: "4px",
//               cursor: isGenerating ? "not-allowed" : "pointer",
//               transition: "background 0.3s",
//               boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//               minWidth: "200px",
//             }}
//           >
//             {isGenerating ? "Generating..." : "Download Multi-Page Resume"}
//           </button>
//         </div>
//       </div>

//       {/* Resume Preview - Single page view for UI */}
//       <div ref={resumeRef} className="resume-container">
//         <style>{originalStyles}</style>

//         {/* HEADER */}
//         <div className="contact-info">
//           <div className="name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="job-title">{contact?.jobTitle?.name}</div>
//           <div className="address">{addressParts.join(", ")}</div>

//           <div className="contact-details">
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//           </div>

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
//           </div>
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-content resume-section">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content"
//               dangerouslySetInnerHTML={{ __html: summary }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-content resume-section">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div key={i}>
//                 <div className="item-header">
//                   <div>
//                     <div className="item-title">{exp.jobTitle}</div>
//                     <div className="item-subtitle">
//                       {exp.employer} — {exp.location}
//                     </div>
//                   </div>
//                   <div className="item-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {" - "}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate} shortYear />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>
//                 <div
//                   className="item-content"
//                   dangerouslySetInnerHTML={{ __html: exp.text }}
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* EDUCATION */}
//         {educations?.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => (
//               <div key={edu._id || edu.id || index} className="education-item">
//                 <div className="item-header">
//                   <div>
//                     <div className="item-title">{edu.schoolname || ""}</div>
//                     {(edu.degree || edu.location) && (
//                       <div className="item-subtitle">
//                         {edu.degree && <span>{edu.degree}</span>}
//                         {edu.location && (
//                           <>
//                             {edu.degree && " — "}
//                             <span>{edu.location}</span>
//                           </>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   {(edu.startDate || edu.endDate) && (
//                     <div className="item-date">
//                       {edu.startDate || ""}
//                       {edu.startDate && edu.endDate && " - "}
//                       {edu.endDate || ""}
//                     </div>
//                   )}
//                 </div>
//                 {edu.text && (
//                   <div
//                     className="item-content"
//                     dangerouslySetInnerHTML={{ __html: edu.text }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* SKILLS */}
//         {skills.length > 0 && (
//           <div className="section-content resume-section">
//             <div className="section-title">Skills</div>
//             <div className="skills-grid">
//               {skills.map((skill, i) => (
//                 <div key={i}>
//                   <div className="skill-name">{skill.skill}</div>
//                   <div className="skill-bar">
//                     <div
//                       className="skill-level"
//                       style={{
//                         width: `${(Number(skill.level) / 4) * 100}%`,
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Languages Section */}
//         {Array.isArray(finalize?.languages) &&
//           finalize.languages.some(
//             (lang) => lang.name && lang.name.trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Languages</div>
//               <div className="skills-grid">
//                 {finalize.languages.map(
//                   (lang, index) =>
//                     lang.name &&
//                     lang.name.trim() !== "" && (
//                       <div key={lang._id || index} className="skill-item">
//                         <div className="skill-name">{lang.name}</div>
//                         {lang.level && (
//                           <div className="skill-bar">
//                             <div
//                               className="skill-level"
//                               style={{
//                                 width: `${(Number(lang.level) / 4) * 100}%`,
//                               }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Additional Sections */}
//         {Array.isArray(finalize?.certificationsAndLicenses) &&
//           finalize.certificationsAndLicenses.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Certifications and Licenses</div>
//               <div className="item-content">
//                 {finalize.certificationsAndLicenses.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {Array.isArray(finalize?.hobbiesAndInterests) &&
//           finalize.hobbiesAndInterests.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Hobbies and Interests</div>
//               <div className="item-content">
//                 {finalize.hobbiesAndInterests.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {Array.isArray(finalize?.awardsAndHonors) &&
//           finalize.awardsAndHonors.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Awards and Honors</div>
//               <div className="item-content">
//                 {finalize.awardsAndHonors.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Websites and Social Media */}
//         {Array.isArray(finalize?.websitesAndSocialMedia) &&
//           finalize.websitesAndSocialMedia.some(
//             (item) =>
//               (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//               (item.socialMedia && item.socialMedia.trim() !== ""),
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Websites and Social Media</div>
//               <div className="item-content">
//                 {finalize.websitesAndSocialMedia.map(
//                   (item, index) =>
//                     (item.websiteUrl || item.socialMedia) && (
//                       <div
//                         key={item.id || index}
//                         style={{ marginBottom: "5px" }}
//                       >
//                         {item.websiteUrl && (
//                           <div>Website: {item.websiteUrl}</div>
//                         )}
//                         {item.socialMedia && (
//                           <div>Social Media: {item.socialMedia}</div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* References */}
//         {Array.isArray(finalize?.references) &&
//           finalize.references.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">References</div>
//               <div className="item-content">
//                 {finalize.references.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Custom Sections */}
//         {Array.isArray(finalize?.customSection) &&
//           finalize.customSection.some(
//             (section) => section?.name?.trim() || section?.description?.trim(),
//           ) && (
//             <div className="section-content resume-section">
//               {finalize.customSection
//                 .filter(
//                   (section) =>
//                     section?.name?.trim() || section?.description?.trim(),
//                 )
//                 .map((section, index) => (
//                   <div key={section.id || index} className="custom-section">
//                     {section.name && (
//                       <div className="section-title">{section.name}</div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="item-content"
//                         dangerouslySetInnerHTML={{
//                           __html: section.description,
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default Resume4;

// import React, { useContext, useRef, useState } from "react";
// import MonthYearDisplay from "../Componets/MonthYearDisplay";
// import { CreateContext } from "../App";
// import axios from "axios";

// const Resume4 = (alldetails) => {
//   const resumeRef = useRef(null);
//   const UseContext = useContext(CreateContext);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const Allplans = UseContext?.allplandetails;
//   const contact = alldetails?.alldata?.contact || UseContext || {};
//   const educations =
//     alldetails?.alldata?.educations || UseContext?.education || [];
//   const experiences =
//     alldetails?.alldata?.experiences || UseContext?.experiences || [];
//   const skills = alldetails?.alldata?.skills || UseContext?.skills || [];
//   const finalize =
//     alldetails?.alldata?.finalize || UseContext?.globalSkillsData || {};
//   const summary = alldetails?.alldata?.summary || UseContext?.text || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.country,
//     contact?.postcode,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedin || contact?.linkedIn;

//   /* ===========================
//      EXACT SAME STYLES AS ORIGINAL
//   ============================ */
//   const originalStyles = `
//     .resume-container {
//       width: 210mm;
//       min-height: 297mm;
//       background: #fff;
//       margin: 0 auto;
//       padding: 20px;
//       box-sizing: border-box;
//       font-family: Helvetica, Arial, sans-serif;
//     }

//     .resume-container * {
//       box-sizing border-box;
//       margin: 0;
//       padding: 0;
//       font-family: inherit;
//     }

//     .contact-info {
//       text-align: center;
//       margin-bottom: 15px;
//     }

//     .name {
//       font-size: 22px;
//       font-weight: 800;
//       text-transform: uppercase;
//     }

//     .job-title {
//       font-size: 14px;
//       font-weight: 700;
//       margin-top: 2px;
//     }

//     .address {
//       font-size: 11px;
//       margin-top: 4px;
//     }

//     .contact-details {
//       display: flex;
//       justify-content: center;
//       gap: 20px;
//       margin-top: 6px;
//       font-size: 11px;
//       font-weight: 600;
//     }

//     .links {
//       display: flex;
//       justify-content: center;
//       gap: 15px;
//       margin-top: 6px;
//     }

//     .link-item {
//       font-size: 11px;
//       font-weight: 600;
//       text-decoration: none;
//       color: #000;
//     }

//     .section-title {
//       background: #f0f0f0;
//       height: 26px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       margin: 12px 0 8px;
//     }

//     .section-content {
//       margin-bottom: 12px;
//     }

//     .item-header {
//       display: flex;
//       justify-content: space-between;
//       margin-bottom: 3px;
//     }

//     .item-title {
//       font-size: 13px;
//       font-weight: 700;
//     }

//     .item-subtitle {
//       font-size: 12px;
//       color: #555;
//     }

//     .item-date {
//       font-size: 11px;
//       white-space: nowrap;
//     }

//     .item-content {
//       font-size: 11px;
//       line-height: 1.5;
//       color: #444;
//     }

//     .skills-grid {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       gap: 12px;
//     }

//     .skill-name {
//       font-size: 11px;
//       margin-bottom: 2px;
//     }

//     .skill-bar {
//       height: 3px;
//       background: #e0e0e0;
//     }

//     .skill-level {
//       height: 100%;
//       background: #222;
//     }
//   `;

//   /* ===========================
//      CREATE MULTI-PAGE RESUME WITHOUT CONTINUATION HEADER
//   ============================ */
//   const createMultiPageResume = () => {
//     // Helper function to create section HTML
//     const createSection = (title, content) => {
//       return `
//         <div class="section-content">
//           <div class="section-title">${title}</div>
//           ${content}
//         </div>
//       `;
//     };

//     // Helper function to create experience item
//     const createExperienceItem = (exp, index) => {
//       return `
//         <div style="margin-bottom: 8px;">
//           <div class="item-header">
//             <div>
//               <div class="item-title">${exp.jobTitle}</div>
//               <div class="item-subtitle">${exp.employer} — ${exp.location}</div>
//             </div>
//             <div class="item-date">
//               ${exp.startDate ? new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""}
//               -
//               ${exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"}
//             </div>
//           </div>
//           <div class="item-content">${exp.text}</div>
//         </div>
//       `;
//     };

//     // Helper function to create education item
//     const createEducationItem = (edu, index) => {
//       return `
//         <div class="education-item">
//           <div class="item-header">
//             <div>
//               <div class="item-title">${edu.schoolname || ""}</div>
//               ${
//                 edu.degree || edu.location
//                   ? `
//                 <div class="item-subtitle">
//                   ${edu.degree || ""}
//                   ${edu.degree && edu.location ? " — " : ""}
//                   ${edu.location || ""}
//                 </div>
//               `
//                   : ""
//               }
//             </div>
//             ${
//               edu.startDate || edu.endDate
//                 ? `
//               <div class="item-date">
//                 ${edu.startDate || ""}
//                 ${edu.startDate && edu.endDate ? " - " : ""}
//                 ${edu.endDate || ""}
//               </div>
//             `
//                 : ""
//             }
//           </div>
//           ${edu.text ? `<div class="item-content">${edu.text}</div>` : ""}
//         </div>
//       `;
//     };

//     // Helper function to create skill item
//     const createSkillItem = (skill, index) => {
//       return `
//         <div>
//           <div class="skill-name">${skill.skill}</div>
//           <div class="skill-bar">
//             <div class="skill-level" style="width: ${(Number(skill.level) / 4) * 100}%;"></div>
//           </div>
//         </div>
//       `;
//     };

//     // Build header section (only for first page)
//     const headerSection = `
//       <div class="contact-info">
//         <div class="name">${contact?.firstName} ${contact?.lastName}</div>
//         <div class="job-title">${contact?.jobTitle?.name}</div>
//         <div class="address">${addressParts.join(", ")}</div>
//         <div class="contact-details">
//           ${contact?.email ? `<span>${contact.email}</span>` : ""}
//           ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//         </div>
//         <div class="links">
//           ${linkedinUrl ? `<span class="link-item">LinkedIn: ${linkedinUrl.replace(/https?:\/\//, "")}</span>` : ""}
//         </div>
//       </div>
//     `;

//     // Build summary section
//     const summarySection = summary
//       ? createSection("Summary", `<div class="item-content">${summary}</div>`)
//       : "";

//     // Build experience section
//     let experienceContent = "";
//     if (experiences.length > 0) {
//       experiences.forEach((exp, index) => {
//         experienceContent += createExperienceItem(exp, index);
//       });
//     }
//     const experienceSection = experienceContent
//       ? createSection("Experience", experienceContent)
//       : "";

//     // Build education section
//     let educationContent = "";
//     if (educations.length > 0) {
//       educations.forEach((edu, index) => {
//         educationContent += createEducationItem(edu, index);
//       });
//     }
//     const educationSection = educationContent
//       ? createSection("Education", educationContent)
//       : "";

//     // Build skills section
//     let skillsContent = "";
//     if (skills.length > 0) {
//       skillsContent = `<div class="skills-grid">`;
//       skills.forEach((skill, index) => {
//         skillsContent += createSkillItem(skill, index);
//       });
//       skillsContent += `</div>`;
//     }
//     const skillsSection = skillsContent
//       ? createSection("Skills", skillsContent)
//       : "";

//     // Build languages section
//     let languagesContent = "";
//     if (Array.isArray(finalize?.languages) && finalize.languages.length > 0) {
//       const validLanguages = finalize.languages.filter(lang => lang.name && lang.name.trim() !== "");
//       if (validLanguages.length > 0) {
//         languagesContent = `<div class="skills-grid">`;
//         validLanguages.forEach((lang, index) => {
//           languagesContent += `
//             <div>
//               <div class="skill-name">${lang.name}</div>
//               ${lang.level ? `
//                 <div class="skill-bar">
//                   <div class="skill-level" style="width: ${(Number(lang.level) / 4) * 100}%;"></div>
//                 </div>
//               ` : ''}
//             </div>
//           `;
//         });
//         languagesContent += `</div>`;
//       }
//     }
//     const languagesSection = languagesContent
//       ? createSection("Languages", languagesContent)
//       : "";

//     // Build other sections
//     const otherSections = [];

//     // Certifications
//     if (Array.isArray(finalize?.certificationsAndLicenses)) {
//       const validCerts = finalize.certificationsAndLicenses.filter(
//         item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//       );
//       if (validCerts.length > 0) {
//         let certContent = "";
//         validCerts.forEach((item, index) => {
//           certContent += `<div class="item-content">${item.name}</div>`;
//         });
//         otherSections.push(createSection("Certifications and Licenses", certContent));
//       }
//     }

//     // Hobbies
//     if (Array.isArray(finalize?.hobbiesAndInterests)) {
//       const validHobbies = finalize.hobbiesAndInterests.filter(
//         item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//       );
//       if (validHobbies.length > 0) {
//         let hobbiesContent = "";
//         validHobbies.forEach((item, index) => {
//           hobbiesContent += `<div class="item-content">${item.name}</div>`;
//         });
//         otherSections.push(createSection("Hobbies and Interests", hobbiesContent));
//       }
//     }

//     // Awards
//     if (Array.isArray(finalize?.awardsAndHonors)) {
//       const validAwards = finalize.awardsAndHonors.filter(
//         item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//       );
//       if (validAwards.length > 0) {
//         let awardsContent = "";
//         validAwards.forEach((item, index) => {
//           awardsContent += `<div class="item-content">${item.name}</div>`;
//         });
//         otherSections.push(createSection("Awards and Honors", awardsContent));
//       }
//     }

//     // Websites
//     if (Array.isArray(finalize?.websitesAndSocialMedia)) {
//       const validWebsites = finalize.websitesAndSocialMedia.filter(
//         item => (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//                 (item.socialMedia && item.socialMedia.trim() !== "")
//       );
//       if (validWebsites.length > 0) {
//         let websitesContent = "";
//         validWebsites.forEach((item, index) => {
//           websitesContent += `
//             <div style="margin-bottom: 5px;">
//               ${item.websiteUrl ? `<div>Website: ${item.websiteUrl}</div>` : ""}
//               ${item.socialMedia ? `<div>Social Media: ${item.socialMedia}</div>` : ""}
//             </div>
//           `;
//         });
//         otherSections.push(createSection("Websites and Social Media", `<div class="item-content">${websitesContent}</div>`));
//       }
//     }

//     // References
//     if (Array.isArray(finalize?.references)) {
//       const validRefs = finalize.references.filter(
//         item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//       );
//       if (validRefs.length > 0) {
//         let refsContent = "";
//         validRefs.forEach((item, index) => {
//           refsContent += `<div class="item-content">${item.name}</div>`;
//         });
//         otherSections.push(createSection("References", refsContent));
//       }
//     }

//     // Custom Sections
//     if (Array.isArray(finalize?.customSection)) {
//       const validCustomSections = finalize.customSection.filter(
//         section => section?.name?.trim() || section?.description?.trim()
//       );
//       validCustomSections.forEach((section, index) => {
//         const customContent = `
//           ${section.name ? `<div class="section-title">${section.name}</div>` : ""}
//           ${section.description ? `<div class="item-content">${section.description}</div>` : ""}
//         `;
//         otherSections.push(`<div class="section-content">${customContent}</div>`);
//       });
//     }

//     // Combine all sections in order
//     const allSections = [
//       { id: "header", content: headerSection, isHeader: true },
//       { id: "summary", content: summarySection },
//       { id: "experience", content: experienceSection },
//       { id: "education", content: educationSection },
//       { id: "skills", content: skillsSection },
//       { id: "languages", content: languagesSection },
//       ...otherSections
//     ].filter(section => section.content && section.content.trim() !== "");

//     // Simple approach: Force split after header + 2 sections for page 1
//     // This ensures multi-page when there's decent content
//     const pages = [];

//     // Page 1: Header + Summary + Experience (or first part of experience if too long)
//     const page1Sections = [];
//     let page1Height = 0;
//     const maxPage1Height = 200; // mm

//     // Always add header to page 1
//     if (allSections[0]?.isHeader) {
//       page1Sections.push(allSections[0]);
//       page1Height += 40; // header height in mm
//     }

//     // Add summary if exists
//     if (allSections.find(s => s.id === "summary")) {
//       const summarySection = allSections.find(s => s.id === "summary");
//       page1Sections.push(summarySection);
//       page1Height += 30;
//     }

//     // Add experience section (might be split)
//     const experienceSectionData = allSections.find(s => s.id === "experience");
//     if (experienceSectionData) {
//       // Check if we should split experiences
//       if (experiences.length > 2 && page1Height + (experiences.length * 20) > maxPage1Height) {
//         // Split experiences between pages
//         const halfIndex = Math.ceil(experiences.length / 2);
//         const firstHalfExps = experiences.slice(0, halfIndex);

//         // Create first half experience section for page 1
//         let firstHalfContent = "";
//         firstHalfExps.forEach((exp, index) => {
//           firstHalfContent += createExperienceItem(exp, index);
//         });
//         const firstHalfSection = createSection("Experience", firstHalfContent);

//         page1Sections.push({ id: "experience-part1", content: firstHalfSection });

//         // Create second half for page 2
//         const secondHalfExps = experiences.slice(halfIndex);
//         let secondHalfContent = "";
//         secondHalfExps.forEach((exp, index) => {
//           secondHalfContent += createExperienceItem(exp, index + halfIndex);
//         });
//         const secondHalfSection = createSection("Experience", secondHalfContent);

//         // Remove original experience section and add split versions
//         const remainingSections = allSections.filter(s =>
//           s.id !== "header" &&
//           s.id !== "summary" &&
//           s.id !== "experience"
//         );

//         // Page 1 content
//         const page1Content = page1Sections.map(s => s.content).join('');

//         // Page 2 content (starts with second half of experience)
//         const page2Sections = [
//           { id: "experience-part2", content: secondHalfSection },
//           ...remainingSections
//         ];
//         const page2Content = page2Sections.map(s => s.content).join('');

//         pages.push({
//           number: 1,
//           content: page1Content
//         });

//         pages.push({
//           number: 2,
//           content: page2Content
//         });

//       } else {
//         // All experiences fit on page 1
//         page1Sections.push(experienceSectionData);
//         page1Height += experiences.length * 20;

//         // Add remaining sections to page 2 if they exist
//         const remainingSections = allSections.filter(s =>
//           !page1Sections.includes(s)
//         );

//         const page1Content = page1Sections.map(s => s.content).join('');
//         pages.push({ number: 1, content: page1Content });

//         if (remainingSections.length > 0) {
//           const page2Content = remainingSections.map(s => s.content).join('');
//           pages.push({ number: 2, content: page2Content });
//         }
//       }
//     } else {
//       // No experience section, simple split
//       const page1SectionsSimple = allSections.slice(0, 3); // First 3 sections on page 1
//       const page2SectionsSimple = allSections.slice(3); // Rest on page 2

//       if (page1SectionsSimple.length > 0) {
//         pages.push({
//           number: 1,
//           content: page1SectionsSimple.map(s => s.content).join('')
//         });
//       }

//       if (page2SectionsSimple.length > 0) {
//         pages.push({
//           number: 2,
//           content: page2SectionsSimple.map(s => s.content).join('')
//         });
//       }
//     }

//     // Build final HTML - NO CONTINUATION HEADER on page 2+
//     return pages.map((page, index) => `
//       <div class="resume-page" style="page-break-after: ${index < pages.length - 1 ? 'always' : 'avoid'};">
//         ${page.content}
//       </div>
//     `).join('');
//   };

//   /* ===========================
//      DOWNLOAD MULTI-PAGE HTML RESUME
//   ============================ */
//   const handleDownload = async () => {
//     setIsGenerating(true);

//     try {
//       const resumeHtml = createMultiPageResume();

//       const fullHtml = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>${contact?.firstName} ${contact?.lastName} - Resume</title>
//           <style>
//             /* Base styles for all pages */
//             body {
//               margin: 0;
//               padding: 0;
//               font-family: Helvetica, Arial, sans-serif;
//               background: white;
//             }

//             .resume-page {
//               width: 210mm;
//               min-height: 297mm;
//               padding: 20mm;
//               box-sizing: border-box;
//               position: relative;
//             }

//             /* Resume content styles - EXACTLY like original */
//             .contact-info {
//               text-align: center;
//               margin-bottom: 15px;
//             }

//             .name {
//               font-size: 22px;
//               font-weight: 800;
//               text-transform: uppercase;
//               color: #000;
//             }

//             .job-title {
//               font-size: 14px;
//               font-weight: 700;
//               margin-top: 2px;
//               color: #333;
//             }

//             .address {
//               font-size: 11px;
//               margin-top: 4px;
//               color: #555;
//             }

//             .contact-details {
//               display: flex;
//               justify-content: center;
//               gap: 20px;
//               margin-top: 6px;
//               font-size: 11px;
//               font-weight: 600;
//               color: #444;
//             }

//             .links {
//               display: flex;
//               justify-content: center;
//               gap: 15px;
//               margin-top: 6px;
//             }

//             .link-item {
//               font-size: 11px;
//               font-weight: 600;
//               text-decoration: none;
//               color: #000;
//             }

//             .section-title {
//               background: #f0f0f0;
//               height: 26px;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               font-size: 14px;
//               font-weight: 700;
//               text-transform: uppercase;
//               margin: 12px 0 8px;
//               color: #000;
//             }

//             .section-content {
//               margin-bottom: 12px;
//             }

//             .item-header {
//               display: flex;
//               justify-content: space-between;
//               margin-bottom: 3px;
//             }

//             .item-title {
//               font-size: 13px;
//               font-weight: 700;
//               color: #000;
//             }

//             .item-subtitle {
//               font-size: 12px;
//               color: #555;
//             }

//             .item-date {
//               font-size: 11px;
//               white-space: nowrap;
//               color: #666;
//             }

//             .item-content {
//               font-size: 11px;
//               line-height: 1.5;
//               color: #444;
//             }

//             .skills-grid {
//               display: grid;
//               grid-template-columns: repeat(2, 1fr);
//               gap: 12px;
//             }

//             .skill-name {
//               font-size: 11px;
//               margin-bottom: 2px;
//               color: #333;
//             }

//             .skill-bar {
//               height: 3px;
//               background: #e0e0e0;
//             }

//             .skill-level {
//               height: 100%;
//               background: #222;
//             }

//             /* Print-specific styles */
//             @media print {
//               @page {
//                 size: A4;
//                 margin: 0;
//               }

//               body {
//                 width: 210mm;
//                 height: 297mm;
//                 margin: 0;
//                 padding: 0;
//               }

//               .resume-page {
//                 page-break-after: always;
//                 margin: 0;
//                 padding: 20mm;
//                 box-shadow: none;
//               }

//               .resume-page:last-child {
//                 page-break-after: avoid;
//               }

//               /* Ensure colors print correctly */
//               .section-title {
//                 -webkit-print-color-adjust: exact !important;
//                 print-color-adjust: exact !important;
//                 background: #f0f0f0 !important;
//               }

//               .skill-level {
//                 -webkit-print-color-adjust: exact !important;
//                 print-color-adjust: exact !important;
//                 background: #222 !important;
//               }
//             }

//             /* Screen preview styles */
//             @media screen {
//               body {
//                 background: #f5f5f5;
//                 padding: 20px;
//                 display: flex;
//                 flex-direction: column;
//                 align-items: center;
//               }

//               .resume-page {
//                 margin-bottom: 20px;
//                 box-shadow: 0 0 10px rgba(0,0,0,0.1);
//                 background: white;
//               }

//               .resume-page:last-child {
//                 margin-bottom: 0;
//               }
//             }
//           </style>
//         </head>
//         <body>
//           ${resumeHtml}
//         </body>
//         </html>
//       `;

//       console.log("Number of pages generated:", fullHtml.split('resume-page').length - 1);

//       const res = await axios.post(
//         "http://192.168.29.114:3015/api/candidates/generate-pdf",
//         { html: fullHtml },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           responseType: "blob",
//         }
//       );

//       const blob = res.data;
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `${contact?.firstName || "Resume"}_${contact?.lastName || ""}.pdf`.trim();
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);

//     } catch (error) {
//       console.error("Error generating resume:", error);
//       alert("Error generating resume. Please try again.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // Render the preview (single page view for UI)
//   return (
//     <>
//       {/* Download Buttons */}
//       <div
//         style={{
//           textAlign: "center",
//           margin: "20px 0",
//           position: "sticky",
//           top: 0,
//           background: "#fff",
//           zIndex: 10,
//           padding: "10px",
//           borderBottom: "1px solid #eee",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "20px",
//             flexWrap: "wrap",
//           }}
//         >
//           <button
//             onClick={handleDownload}
//             disabled={isGenerating}
//             style={{
//               padding: "12px 24px",
//               fontSize: "16px",
//               fontWeight: "bold",
//               background: isGenerating ? "#666" : "#d32f2f",
//               color: "#fff",
//               border: "none",
//               borderRadius: "4px",
//               cursor: isGenerating ? "not-allowed" : "pointer",
//               transition: "background 0.3s",
//               boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//               minWidth: "200px",
//             }}
//           >
//             {isGenerating ? "Generating..." : "Download Multi-Page Resume"}
//           </button>
//         </div>
//       </div>

//       {/* Resume Preview - Single page view for UI */}
//       <div ref={resumeRef} className="resume-container">
//         <style>{originalStyles}</style>

//         {/* HEADER */}
//         <div className="contact-info">
//           <div className="name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="job-title">{contact?.jobTitle?.name}</div>
//           <div className="address">{addressParts.join(", ")}</div>

//           <div className="contact-details">
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//           </div>

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
//           </div>
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-content resume-section">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content"
//               dangerouslySetInnerHTML={{ __html: summary }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-content resume-section">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div key={i}>
//                 <div className="item-header">
//                   <div>
//                     <div className="item-title">{exp.jobTitle}</div>
//                     <div className="item-subtitle">
//                       {exp.employer} — {exp.location}
//                     </div>
//                   </div>
//                   <div className="item-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {" - "}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate} shortYear />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>
//                 <div
//                   className="item-content"
//                   dangerouslySetInnerHTML={{ __html: exp.text }}
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* EDUCATION */}
//         {educations?.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => (
//               <div key={edu._id || edu.id || index} className="education-item">
//                 <div className="item-header">
//                   <div>
//                     <div className="item-title">{edu.schoolname || ""}</div>
//                     {(edu.degree || edu.location) && (
//                       <div className="item-subtitle">
//                         {edu.degree && <span>{edu.degree}</span>}
//                         {edu.location && (
//                           <>
//                             {edu.degree && " — "}
//                             <span>{edu.location}</span>
//                           </>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   {(edu.startDate || edu.endDate) && (
//                     <div className="item-date">
//                       {edu.startDate || ""}
//                       {edu.startDate && edu.endDate && " - "}
//                       {edu.endDate || ""}
//                     </div>
//                   )}
//                 </div>
//                 {edu.text && (
//                   <div
//                     className="item-content"
//                     dangerouslySetInnerHTML={{ __html: edu.text }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* SKILLS */}
//         {skills.length > 0 && (
//           <div className="section-content resume-section">
//             <div className="section-title">Skills</div>
//             <div className="skills-grid">
//               {skills.map((skill, i) => (
//                 <div key={i}>
//                   <div className="skill-name">{skill.skill}</div>
//                   <div className="skill-bar">
//                     <div
//                       className="skill-level"
//                       style={{
//                         width: `${(Number(skill.level) / 4) * 100}%`,
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Languages Section */}
//         {Array.isArray(finalize?.languages) &&
//           finalize.languages.some(
//             (lang) => lang.name && lang.name.trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Languages</div>
//               <div className="skills-grid">
//                 {finalize.languages.map(
//                   (lang, index) =>
//                     lang.name &&
//                     lang.name.trim() !== "" && (
//                       <div key={lang._id || index} className="skill-item">
//                         <div className="skill-name">{lang.name}</div>
//                         {lang.level && (
//                           <div className="skill-bar">
//                             <div
//                               className="skill-level"
//                               style={{
//                                 width: `${(Number(lang.level) / 4) * 100}%`,
//                               }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Additional Sections */}
//         {Array.isArray(finalize?.certificationsAndLicenses) &&
//           finalize.certificationsAndLicenses.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Certifications and Licenses</div>
//               <div className="item-content">
//                 {finalize.certificationsAndLicenses.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {Array.isArray(finalize?.hobbiesAndInterests) &&
//           finalize.hobbiesAndInterests.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Hobbies and Interests</div>
//               <div className="item-content">
//                 {finalize.hobbiesAndInterests.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {Array.isArray(finalize?.awardsAndHonors) &&
//           finalize.awardsAndHonors.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Awards and Honors</div>
//               <div className="item-content">
//                 {finalize.awardsAndHonors.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Websites and Social Media */}
//         {Array.isArray(finalize?.websitesAndSocialMedia) &&
//           finalize.websitesAndSocialMedia.some(
//             (item) =>
//               (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//               (item.socialMedia && item.socialMedia.trim() !== ""),
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Websites and Social Media</div>
//               <div className="item-content">
//                 {finalize.websitesAndSocialMedia.map(
//                   (item, index) =>
//                     (item.websiteUrl || item.socialMedia) && (
//                       <div
//                         key={item.id || index}
//                         style={{ marginBottom: "5px" }}
//                       >
//                         {item.websiteUrl && (
//                           <div>Website: {item.websiteUrl}</div>
//                         )}
//                         {item.socialMedia && (
//                           <div>Social Media: {item.socialMedia}</div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* References */}
//         {Array.isArray(finalize?.references) &&
//           finalize.references.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">References</div>
//               <div className="item-content">
//                 {finalize.references.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Custom Sections */}
//         {Array.isArray(finalize?.customSection) &&
//           finalize.customSection.some(
//             (section) => section?.name?.trim() || section?.description?.trim(),
//           ) && (
//             <div className="section-content resume-section">
//               {finalize.customSection
//                 .filter(
//                   (section) =>
//                     section?.name?.trim() || section?.description?.trim(),
//                 )
//                 .map((section, index) => (
//                   <div key={section.id || index} className="custom-section">
//                     {section.name && (
//                       <div className="section-title">{section.name}</div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="item-content"
//                         dangerouslySetInnerHTML={{
//                           __html: section.description,
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default Resume4;

// import React, { useContext, useRef, useState } from "react";
// import MonthYearDisplay from "../Componets/MonthYearDisplay";
// import { CreateContext } from "../App";
// import axios from "axios";

// const Resume4 = (alldetails) => {
//   const resumeRef = useRef(null);
//   const UseContext = useContext(CreateContext);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const Allplans = UseContext?.allplandetails;
//   const contact = alldetails?.alldata?.contact || UseContext || {};
//   const educations =
//     alldetails?.alldata?.educations || UseContext?.education || [];
//   const experiences =
//     alldetails?.alldata?.experiences || UseContext?.experiences || [];
//   const skills = alldetails?.alldata?.skills || UseContext?.skills || [];
//   const finalize =
//     alldetails?.alldata?.finalize || UseContext?.globalSkillsData || {};
//   const summary = alldetails?.alldata?.summary || UseContext?.text || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.country,
//     contact?.postcode,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedin || contact?.linkedIn;

//   /* ===========================
//      EXACT SAME STYLES AS ORIGINAL
//   ============================ */
//   const originalStyles = `
//     .resume-container {
//       width: 210mm;
//       min-height: 297mm;
//       background: #fff;
//       margin: 0 auto;
//       padding: 20px;
//       box-sizing: border-box;
//       font-family: Helvetica, Arial, sans-serif;
//     }

//     .resume-container * {
//       box-sizing border-box;
//       margin: 0;
//       padding: 0;
//       font-family: inherit;
//     }

//     .contact-info {
//       text-align: center;
//       margin-bottom: 15px;
//     }

//     .name {
//       font-size: 22px;
//       font-weight: 800;
//       text-transform: uppercase;
//     }

//     .job-title {
//       font-size: 14px;
//       font-weight: 700;
//       margin-top: 2px;
//     }

//     .address {
//       font-size: 11px;
//       margin-top: 4px;
//     }

//     .contact-details {
//       display: flex;
//       justify-content: center;
//       gap: 20px;
//       margin-top: 6px;
//       font-size: 11px;
//       font-weight: 600;
//     }

//     .links {
//       display: flex;
//       justify-content: center;
//       gap: 15px;
//       margin-top: 6px;
//     }

//     .link-item {
//       font-size: 11px;
//       font-weight: 600;
//       text-decoration: none;
//       color: #000;
//     }

//     .section-title {
//       background: #f0f0f0;
//       height: 26px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       margin: 12px 0 8px;
//     }

//     .section-content {
//       margin-bottom: 12px;
//     }

//     .item-header {
//       display: flex;
//       justify-content: space-between;
//       margin-bottom: 3px;
//     }

//     .item-title {
//       font-size: 13px;
//       font-weight: 700;
//     }

//     .item-subtitle {
//       font-size: 12px;
//       color: #555;
//     }

//     .item-date {
//       font-size: 11px;
//       white-space: nowrap;
//     }

//     .item-content {
//       font-size: 11px;
//       line-height: 1.5;
//       color: #444;
//     }

//     .skills-grid {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       gap: 12px;
//     }

//     .skill-name {
//       font-size: 11px;
//       margin-bottom: 2px;
//     }

//     .skill-bar {
//       height: 3px;
//       background: #e0e0e0;
//     }

//     .skill-level {
//       height: 100%;
//       background: #222;
//     }
//   `;

//   /* ===========================
//      CREATE MULTI-PAGE RESUME WITHOUT CONTINUATION HEADER
//   ============================ */
//   const createMultiPageResume = () => {
//     // Helper function to create section HTML
//     const createSection = (title, content) => {
//       return `
//         <div class="section-content">
//           <div class="section-title">${title}</div>
//           ${content}
//         </div>
//       `;
//     };

//     // Helper function to create experience item
//     const createExperienceItem = (exp, index) => {
//       return `
//         <div style="margin-bottom: 8px;">
//           <div class="item-header">
//             <div>
//               <div class="item-title">${exp.jobTitle}</div>
//               <div class="item-subtitle">${exp.employer} — ${exp.location}</div>
//             </div>
//             <div class="item-date">
//               ${exp.startDate ? new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""}
//               -
//               ${exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"}
//             </div>
//           </div>
//           <div class="item-content">${exp.text}</div>
//         </div>
//       `;
//     };

//     // Helper function to create education item
//     const createEducationItem = (edu, index) => {
//       return `
//         <div class="education-item">
//           <div class="item-header">
//             <div>
//               <div class="item-title">${edu.schoolname || ""}</div>
//               ${
//                 edu.degree || edu.location
//                   ? `
//                 <div class="item-subtitle">
//                   ${edu.degree || ""}
//                   ${edu.degree && edu.location ? " — " : ""}
//                   ${edu.location || ""}
//                 </div>
//               `
//                   : ""
//               }
//             </div>
//             ${
//               edu.startDate || edu.endDate
//                 ? `
//               <div class="item-date">
//                 ${edu.startDate || ""}
//                 ${edu.startDate && edu.endDate ? " - " : ""}
//                 ${edu.endDate || ""}
//               </div>
//             `
//                 : ""
//             }
//           </div>
//           ${edu.text ? `<div class="item-content">${edu.text}</div>` : ""}
//         </div>
//       `;
//     };

//     // Helper function to create skill item
//     const createSkillItem = (skill, index) => {
//       return `
//         <div>
//           <div class="skill-name">${skill.skill}</div>
//           <div class="skill-bar">
//             <div class="skill-level" style="width: ${(Number(skill.level) / 4) * 100}%;"></div>
//           </div>
//         </div>
//       `;
//     };

//     // Build header section (only for first page)
//     const headerSection = `
//       <div class="contact-info">
//         <div class="name">${contact?.firstName} ${contact?.lastName}</div>
//         <div class="job-title">${contact?.jobTitle?.name}</div>
//         <div class="address">${addressParts.join(", ")}</div>
//         <div class="contact-details">
//           ${contact?.email ? `<span>${contact.email}</span>` : ""}
//           ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//         </div>
//         <div class="links">
//           ${linkedinUrl ? `<span class="link-item">LinkedIn: ${linkedinUrl.replace(/https?:\/\//, "")}</span>` : ""}
//         </div>
//       </div>
//     `;

//     // Build summary section
//     const summarySection = summary
//       ? createSection("Summary", `<div class="item-content">${summary}</div>`)
//       : "";

//     // Build experience section
//     let experienceContent = "";
//     if (experiences.length > 0) {
//       experiences.forEach((exp, index) => {
//         experienceContent += createExperienceItem(exp, index);
//       });
//     }
//     const experienceSection = experienceContent
//       ? createSection("Experience", experienceContent)
//       : "";

//     // Build education section
//     let educationContent = "";
//     if (educations.length > 0) {
//       educations.forEach((edu, index) => {
//         educationContent += createEducationItem(edu, index);
//       });
//     }
//     const educationSection = educationContent
//       ? createSection("Education", educationContent)
//       : "";

//     // Build skills section
//     let skillsContent = "";
//     if (skills.length > 0) {
//       skillsContent = `<div class="skills-grid">`;
//       skills.forEach((skill, index) => {
//         skillsContent += createSkillItem(skill, index);
//       });
//       skillsContent += `</div>`;
//     }
//     const skillsSection = skillsContent
//       ? createSection("Skills", skillsContent)
//       : "";

//     // Build languages section
//     let languagesContent = "";
//     if (Array.isArray(finalize?.languages) && finalize.languages.length > 0) {
//       const validLanguages = finalize.languages.filter(lang => lang.name && lang.name.trim() !== "");
//       if (validLanguages.length > 0) {
//         languagesContent = `<div class="skills-grid">`;
//         validLanguages.forEach((lang, index) => {
//           languagesContent += `
//             <div>
//               <div class="skill-name">${lang.name}</div>
//               ${lang.level ? `
//                 <div class="skill-bar">
//                   <div class="skill-level" style="width: ${(Number(lang.level) / 4) * 100}%;"></div>
//                 </div>
//               ` : ''}
//             </div>
//           `;
//         });
//         languagesContent += `</div>`;
//       }
//     }
//     const languagesSection = languagesContent
//       ? createSection("Languages", languagesContent)
//       : "";

//     // Build other sections
//     const otherSections = [];

//     // Certifications
//     if (Array.isArray(finalize?.certificationsAndLicenses)) {
//       const validCerts = finalize.certificationsAndLicenses.filter(
//         item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//       );
//       if (validCerts.length > 0) {
//         let certContent = "";
//         validCerts.forEach((item, index) => {
//           certContent += `<div class="item-content">${item.name}</div>`;
//         });
//         otherSections.push(createSection("Certifications and Licenses", certContent));
//       }
//     }

//     // Hobbies
//     if (Array.isArray(finalize?.hobbiesAndInterests)) {
//       const validHobbies = finalize.hobbiesAndInterests.filter(
//         item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//       );
//       if (validHobbies.length > 0) {
//         let hobbiesContent = "";
//         validHobbies.forEach((item, index) => {
//           hobbiesContent += `<div class="item-content">${item.name}</div>`;
//         });
//         otherSections.push(createSection("Hobbies and Interests", hobbiesContent));
//       }
//     }

//     // Awards
//     if (Array.isArray(finalize?.awardsAndHonors)) {
//       const validAwards = finalize.awardsAndHonors.filter(
//         item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//       );
//       if (validAwards.length > 0) {
//         let awardsContent = "";
//         validAwards.forEach((item, index) => {
//           awardsContent += `<div class="item-content">${item.name}</div>`;
//         });
//         otherSections.push(createSection("Awards and Honors", awardsContent));
//       }
//     }

//     // Websites
//     if (Array.isArray(finalize?.websitesAndSocialMedia)) {
//       const validWebsites = finalize.websitesAndSocialMedia.filter(
//         item => (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//                 (item.socialMedia && item.socialMedia.trim() !== "")
//       );
//       if (validWebsites.length > 0) {
//         let websitesContent = "";
//         validWebsites.forEach((item, index) => {
//           websitesContent += `
//             <div style="margin-bottom: 5px;">
//               ${item.websiteUrl ? `<div>Website: ${item.websiteUrl}</div>` : ""}
//               ${item.socialMedia ? `<div>Social Media: ${item.socialMedia}</div>` : ""}
//             </div>
//           `;
//         });
//         otherSections.push(createSection("Websites and Social Media", `<div class="item-content">${websitesContent}</div>`));
//       }
//     }

//     // References
//     if (Array.isArray(finalize?.references)) {
//       const validRefs = finalize.references.filter(
//         item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//       );
//       if (validRefs.length > 0) {
//         let refsContent = "";
//         validRefs.forEach((item, index) => {
//           refsContent += `<div class="item-content">${item.name}</div>`;
//         });
//         otherSections.push(createSection("References", refsContent));
//       }
//     }

//     // Custom Sections
//     if (Array.isArray(finalize?.customSection)) {
//       const validCustomSections = finalize.customSection.filter(
//         section => section?.name?.trim() || section?.description?.trim()
//       );
//       validCustomSections.forEach((section, index) => {
//         const customContent = `
//           ${section.name ? `<div class="section-title">${section.name}</div>` : ""}
//           ${section.description ? `<div class="item-content">${section.description}</div>` : ""}
//         `;
//         otherSections.push(`<div class="section-content">${customContent}</div>`);
//       });
//     }

//     // Combine all sections in order
//     const allSections = [
//       { id: "header", content: headerSection, isHeader: true },
//       { id: "summary", content: summarySection },
//       { id: "experience", content: experienceSection },
//       { id: "education", content: educationSection },
//       { id: "skills", content: skillsSection },
//       { id: "languages", content: languagesSection },
//       ...otherSections
//     ].filter(section => section.content && section.content.trim() !== "");

//     // Simple approach: Force split after header + 2 sections for page 1
//     // This ensures multi-page when there's decent content
//     const pages = [];

//     // Page 1: Header + Summary + Experience (or first part of experience if too long)
//     const page1Sections = [];
//     let page1Height = 0;
//     const maxPage1Height = 200; // mm

//     // Always add header to page 1
//     if (allSections[0]?.isHeader) {
//       page1Sections.push(allSections[0]);
//       page1Height += 40; // header height in mm
//     }

//     // Add summary if exists
//     if (allSections.find(s => s.id === "summary")) {
//       const summarySection = allSections.find(s => s.id === "summary");
//       page1Sections.push(summarySection);
//       page1Height += 30;
//     }

//     // Add experience section (might be split)
//     const experienceSectionData = allSections.find(s => s.id === "experience");
//     if (experienceSectionData) {
//       // Check if we should split experiences
//       if (experiences.length > 2 && page1Height + (experiences.length * 20) > maxPage1Height) {
//         // Split experiences between pages
//         const halfIndex = Math.ceil(experiences.length / 2);
//         const firstHalfExps = experiences.slice(0, halfIndex);

//         // Create first half experience section for page 1
//         let firstHalfContent = "";
//         firstHalfExps.forEach((exp, index) => {
//           firstHalfContent += createExperienceItem(exp, index);
//         });
//         const firstHalfSection = createSection("Experience", firstHalfContent);

//         page1Sections.push({ id: "experience-part1", content: firstHalfSection });

//         // Create second half for page 2
//         const secondHalfExps = experiences.slice(halfIndex);
//         let secondHalfContent = "";
//         secondHalfExps.forEach((exp, index) => {
//           secondHalfContent += createExperienceItem(exp, index + halfIndex);
//         });
//         const secondHalfSection = createSection("Experience", secondHalfContent);

//         // Remove original experience section and add split versions
//         const remainingSections = allSections.filter(s =>
//           s.id !== "header" &&
//           s.id !== "summary" &&
//           s.id !== "experience"
//         );

//         // Page 1 content
//         const page1Content = page1Sections.map(s => s.content).join('');

//         // Page 2 content (starts with second half of experience)
//         const page2Sections = [
//           { id: "experience-part2", content: secondHalfSection },
//           ...remainingSections
//         ];
//         const page2Content = page2Sections.map(s => s.content).join('');

//         pages.push({
//           number: 1,
//           content: page1Content
//         });

//         pages.push({
//           number: 2,
//           content: page2Content
//         });

//       } else {
//         // All experiences fit on page 1
//         page1Sections.push(experienceSectionData);
//         page1Height += experiences.length * 20;

//         // Add remaining sections to page 2 if they exist
//         const remainingSections = allSections.filter(s =>
//           !page1Sections.includes(s)
//         );

//         const page1Content = page1Sections.map(s => s.content).join('');
//         pages.push({ number: 1, content: page1Content });

//         if (remainingSections.length > 0) {
//           const page2Content = remainingSections.map(s => s.content).join('');
//           pages.push({ number: 2, content: page2Content });
//         }
//       }
//     } else {
//       // No experience section, simple split
//       const page1SectionsSimple = allSections.slice(0, 3); // First 3 sections on page 1
//       const page2SectionsSimple = allSections.slice(3); // Rest on page 2

//       if (page1SectionsSimple.length > 0) {
//         pages.push({
//           number: 1,
//           content: page1SectionsSimple.map(s => s.content).join('')
//         });
//       }

//       if (page2SectionsSimple.length > 0) {
//         pages.push({
//           number: 2,
//           content: page2SectionsSimple.map(s => s.content).join('')
//         });
//       }
//     }

//     // Build final HTML - NO CONTINUATION HEADER on page 2+
//     return pages.map((page, index) => `
//       <div class="resume-page" style="page-break-after: ${index < pages.length - 1 ? 'always' : 'avoid'};">
//         ${page.content}
//       </div>
//     `).join('');
//   };

//   /* ===========================
//      DOWNLOAD MULTI-PAGE HTML RESUME
//   ============================ */
//   const handleDownload = async () => {
//     setIsGenerating(true);

//     try {
//       const resumeHtml = createMultiPageResume();

//       const fullHtml = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>${contact?.firstName} ${contact?.lastName} - Resume</title>
//           <style>
//             /* Base styles for all pages */
//             body {
//               margin: 0;
//               padding: 0;
//               font-family: Helvetica, Arial, sans-serif;
//               background: white;
//             }

//             .resume-page {
//               width: 210mm;
//               min-height: 297mm;
//               padding: 20mm;
//               box-sizing: border-box;
//               position: relative;
//             }

//             /* Resume content styles - EXACTLY like original */
//             .contact-info {
//               text-align: center;
//               margin-bottom: 15px;
//             }

//             .name {
//               font-size: 22px;
//               font-weight: 800;
//               text-transform: uppercase;
//               color: #000;
//             }

//             .job-title {
//               font-size: 14px;
//               font-weight: 700;
//               margin-top: 2px;
//               color: #333;
//             }

//             .address {
//               font-size: 11px;
//               margin-top: 4px;
//               color: #555;
//             }

//             .contact-details {
//               display: flex;
//               justify-content: center;
//               gap: 20px;
//               margin-top: 6px;
//               font-size: 11px;
//               font-weight: 600;
//               color: #444;
//             }

//             .links {
//               display: flex;
//               justify-content: center;
//               gap: 15px;
//               margin-top: 6px;
//             }

//             .link-item {
//               font-size: 11px;
//               font-weight: 600;
//               text-decoration: none;
//               color: #000;
//             }

//             .section-title {
//               background: #f0f0f0;
//               height: 26px;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               font-size: 14px;
//               font-weight: 700;
//               text-transform: uppercase;
//               margin: 12px 0 8px;
//               color: #000;
//             }

//             .section-content {
//               margin-bottom: 12px;
//             }

//             .item-header {
//               display: flex;
//               justify-content: space-between;
//               margin-bottom: 3px;
//             }

//             .item-title {
//               font-size: 13px;
//               font-weight: 700;
//               color: #000;
//             }

//             .item-subtitle {
//               font-size: 12px;
//               color: #555;
//             }

//             .item-date {
//               font-size: 11px;
//               white-space: nowrap;
//               color: #666;
//             }

//             .item-content {
//               font-size: 11px;
//               line-height: 1.5;
//               color: #444;
//             }

//             .skills-grid {
//               display: grid;
//               grid-template-columns: repeat(2, 1fr);
//               gap: 12px;
//             }

//             .skill-name {
//               font-size: 11px;
//               margin-bottom: 2px;
//               color: #333;
//             }

//             .skill-bar {
//               height: 3px;
//               background: #e0e0e0;
//             }

//             .skill-level {
//               height: 100%;
//               background: #222;
//             }

//             /* Print-specific styles */
//             @media print {
//               @page {
//                 size: A4;
//                 margin: 0;
//               }

//               body {
//                 width: 210mm;
//                 height: 297mm;
//                 margin: 0;
//                 padding: 0;
//               }

//               .resume-page {
//                 page-break-after: always;
//                 margin: 0;
//                 padding: 20mm;
//                 box-shadow: none;
//               }

//               .resume-page:last-child {
//                 page-break-after: avoid;
//               }

//               /* Ensure colors print correctly */
//               .section-title {
//                 -webkit-print-color-adjust: exact !important;
//                 print-color-adjust: exact !important;
//                 background: #f0f0f0 !important;
//               }

//               .skill-level {
//                 -webkit-print-color-adjust: exact !important;
//                 print-color-adjust: exact !important;
//                 background: #222 !important;
//               }
//             }

//             /* Screen preview styles */
//             @media screen {
//               body {
//                 background: #f5f5f5;
//                 padding: 20px;
//                 display: flex;
//                 flex-direction: column;
//                 align-items: center;
//               }

//               .resume-page {
//                 margin-bottom: 20px;
//                 box-shadow: 0 0 10px rgba(0,0,0,0.1);
//                 background: white;
//               }

//               .resume-page:last-child {
//                 margin-bottom: 0;
//               }
//             }
//           </style>
//         </head>
//         <body>
//           ${resumeHtml}
//         </body>
//         </html>
//       `;

//       console.log("Number of pages generated:", fullHtml.split('resume-page').length - 1);

//       const res = await axios.post(
//         "http://192.168.29.114:3015/api/candidates/generate-pdf",
//         { html: fullHtml },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           responseType: "blob",
//         }
//       );

//       const blob = res.data;
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `${contact?.firstName || "Resume"}_${contact?.lastName || ""}.pdf`.trim();
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);

//     } catch (error) {
//       console.error("Error generating resume:", error);
//       alert("Error generating resume. Please try again.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // Render the preview (single page view for UI)
//   return (
//     <>
//       {/* Download Buttons */}
//       <div
//         style={{
//           textAlign: "center",
//           margin: "20px 0",
//           position: "sticky",
//           top: 0,
//           background: "#fff",
//           zIndex: 10,
//           padding: "10px",
//           borderBottom: "1px solid #eee",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "20px",
//             flexWrap: "wrap",
//           }}
//         >
//           <button
//             onClick={handleDownload}
//             disabled={isGenerating}
//             style={{
//               padding: "12px 24px",
//               fontSize: "16px",
//               fontWeight: "bold",
//               background: isGenerating ? "#666" : "#d32f2f",
//               color: "#fff",
//               border: "none",
//               borderRadius: "4px",
//               cursor: isGenerating ? "not-allowed" : "pointer",
//               transition: "background 0.3s",
//               boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//               minWidth: "200px",
//             }}
//           >
//             {isGenerating ? "Generating..." : "Download Multi-Page Resume"}
//           </button>
//         </div>
//       </div>

//       {/* Resume Preview - Single page view for UI */}
//       <div ref={resumeRef} className="resume-container">
//         <style>{originalStyles}</style>

//         {/* HEADER */}
//         <div className="contact-info">
//           <div className="name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="job-title">{contact?.jobTitle?.name}</div>
//           <div className="address">{addressParts.join(", ")}</div>

//           <div className="contact-details">
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//           </div>

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
//           </div>
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-content resume-section">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content"
//               dangerouslySetInnerHTML={{ __html: summary }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE */}
//         {experiences.length > 0 && (
//           <div className="section-content resume-section">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div key={i}>
//                 <div className="item-header">
//                   <div>
//                     <div className="item-title">{exp.jobTitle}</div>
//                     <div className="item-subtitle">
//                       {exp.employer} — {exp.location}
//                     </div>
//                   </div>
//                   <div className="item-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {" - "}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate} shortYear />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>
//                 <div
//                   className="item-content"
//                   dangerouslySetInnerHTML={{ __html: exp.text }}
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* EDUCATION */}
//         {educations?.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => (
//               <div key={edu._id || edu.id || index} className="education-item">
//                 <div className="item-header">
//                   <div>
//                     <div className="item-title">{edu.schoolname || ""}</div>
//                     {(edu.degree || edu.location) && (
//                       <div className="item-subtitle">
//                         {edu.degree && <span>{edu.degree}</span>}
//                         {edu.location && (
//                           <>
//                             {edu.degree && " — "}
//                             <span>{edu.location}</span>
//                           </>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   {(edu.startDate || edu.endDate) && (
//                     <div className="item-date">
//                       {edu.startDate || ""}
//                       {edu.startDate && edu.endDate && " - "}
//                       {edu.endDate || ""}
//                     </div>
//                   )}
//                 </div>
//                 {edu.text && (
//                   <div
//                     className="item-content"
//                     dangerouslySetInnerHTML={{ __html: edu.text }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* SKILLS */}
//         {skills.length > 0 && (
//           <div className="section-content resume-section">
//             <div className="section-title">Skills</div>
//             <div className="skills-grid">
//               {skills.map((skill, i) => (
//                 <div key={i}>
//                   <div className="skill-name">{skill.skill}</div>
//                   <div className="skill-bar">
//                     <div
//                       className="skill-level"
//                       style={{
//                         width: `${(Number(skill.level) / 4) * 100}%`,
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Languages Section */}
//         {Array.isArray(finalize?.languages) &&
//           finalize.languages.some(
//             (lang) => lang.name && lang.name.trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Languages</div>
//               <div className="skills-grid">
//                 {finalize.languages.map(
//                   (lang, index) =>
//                     lang.name &&
//                     lang.name.trim() !== "" && (
//                       <div key={lang._id || index} className="skill-item">
//                         <div className="skill-name">{lang.name}</div>
//                         {lang.level && (
//                           <div className="skill-bar">
//                             <div
//                               className="skill-level"
//                               style={{
//                                 width: `${(Number(lang.level) / 4) * 100}%`,
//                               }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Additional Sections */}
//         {Array.isArray(finalize?.certificationsAndLicenses) &&
//           finalize.certificationsAndLicenses.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Certifications and Licenses</div>
//               <div className="item-content">
//                 {finalize.certificationsAndLicenses.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {Array.isArray(finalize?.hobbiesAndInterests) &&
//           finalize.hobbiesAndInterests.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Hobbies and Interests</div>
//               <div className="item-content">
//                 {finalize.hobbiesAndInterests.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {Array.isArray(finalize?.awardsAndHonors) &&
//           finalize.awardsAndHonors.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Awards and Honors</div>
//               <div className="item-content">
//                 {finalize.awardsAndHonors.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Websites and Social Media */}
//         {Array.isArray(finalize?.websitesAndSocialMedia) &&
//           finalize.websitesAndSocialMedia.some(
//             (item) =>
//               (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//               (item.socialMedia && item.socialMedia.trim() !== ""),
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Websites and Social Media</div>
//               <div className="item-content">
//                 {finalize.websitesAndSocialMedia.map(
//                   (item, index) =>
//                     (item.websiteUrl || item.socialMedia) && (
//                       <div
//                         key={item.id || index}
//                         style={{ marginBottom: "5px" }}
//                       >
//                         {item.websiteUrl && (
//                           <div>Website: {item.websiteUrl}</div>
//                         )}
//                         {item.socialMedia && (
//                           <div>Social Media: {item.socialMedia}</div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* References */}
//         {Array.isArray(finalize?.references) &&
//           finalize.references.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">References</div>
//               <div className="item-content">
//                 {finalize.references.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Custom Sections */}
//         {Array.isArray(finalize?.customSection) &&
//           finalize.customSection.some(
//             (section) => section?.name?.trim() || section?.description?.trim(),
//           ) && (
//             <div className="section-content resume-section">
//               {finalize.customSection
//                 .filter(
//                   (section) =>
//                     section?.name?.trim() || section?.description?.trim(),
//                 )
//                 .map((section, index) => (
//                   <div key={section.id || index} className="custom-section">
//                     {section.name && (
//                       <div className="section-title">{section.name}</div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="item-content"
//                         dangerouslySetInnerHTML={{
//                           __html: section.description,
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default Resume4;

// import React, { useContext, useRef, useState } from "react";
// import MonthYearDisplay from "../Componets/MonthYearDisplay";
// import { CreateContext } from "../App";
// import axios from "axios";

// const Resume4 = (alldetails) => {
//   const resumeRef = useRef(null);
//   const UseContext = useContext(CreateContext);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const Allplans = UseContext?.allplandetails;
//   const contact = alldetails?.alldata?.contact || UseContext || {};
//   const educations =
//     alldetails?.alldata?.educations || UseContext?.education || [];
//   const experiences =
//     alldetails?.alldata?.experiences || UseContext?.experiences || [];
//   const skills = alldetails?.alldata?.skills || UseContext?.skills || [];
//   const finalize =
//     alldetails?.alldata?.finalize || UseContext?.globalSkillsData || {};
//   const summary = alldetails?.alldata?.summary || UseContext?.text || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.country,
//     contact?.postcode,
//   ].filter(Boolean);

//   const linkedinUrl = contact?.linkedin || contact?.linkedIn;

//   /* ===========================
//      FIXED STYLES WITH PROPER ALIGNMENT
//   ============================ */
//   const originalStyles = `
//     .resume-container {
//       width: 210mm;
//       min-height: 297mm;
//       background: #fff;
//       margin: 0 auto;
//       padding: 20px;
//       box-sizing: border-box;
//       font-family: Helvetica, Arial, sans-serif;
//     }

//     .resume-container * {
//       box-sizing: border-box;
//       margin: 0;
//       padding: 0;
//       font-family: inherit;
//     }

//     .contact-info {
//       text-align: center;
//       margin-bottom: 15px;
//     }

//     .name {
//       font-size: 22px;
//       font-weight: 800;
//       text-transform: uppercase;
//     }

//     .job-title {
//       font-size: 14px;
//       font-weight: 700;
//       margin-top: 2px;
//     }

//     .address {
//       font-size: 11px;
//       margin-top: 4px;
//     }

//     .contact-details {
//       display: flex;
//       justify-content: center;
//       gap: 20px;
//       margin-top: 6px;
//       font-size: 11px;
//       font-weight: 600;
//     }

//     .links {
//       display: flex;
//       justify-content: center;
//       gap: 15px;
//       margin-top: 6px;
//     }

//     .link-item {
//       font-size: 11px;
//       font-weight: 600;
//       text-decoration: none;
//       color: #000;
//     }

//     .section-title {
//       background: #f0f0f0;
//       height: 26px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 14px;
//       font-weight: 700;
//       text-transform: uppercase;
//       margin: 12px 0 8px;
//     }

//     .section-content {
//       margin-bottom: 12px;
//     }

//     .item-header {
//       display: flex;
//       justify-content: space-between;
//       align-items: flex-start;
//       margin-bottom: 3px;
//     }

//     .item-title-container {
//       flex: 1;
//       min-width: 0; /* Crucial for text wrapping */
//     }

//     .item-title {
//       font-size: 13px;
//       font-weight: 700;
//     }

//     .item-subtitle {
//       font-size: 12px;
//       color: #555;
//       margin-top: 2px;
//     }

//     .item-date {
//       font-size: 11px;
//       white-space: nowrap;
//       text-align: right;
//       margin-left: 10px;
//       min-width: 100px; /* Fixed width for dates */
//     }

//     .item-content {
//       font-size: 11px;
//       line-height: 1.5;
//       color: #444;
//       margin-top: 4px;
//     }

//     .skills-grid {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       gap: 12px;
//     }

//     .skill-name {
//       font-size: 11px;
//       margin-bottom: 2px;
//     }

//     .skill-bar {
//       height: 3px;
//       background: #e0e0e0;
//     }

//     .skill-level {
//       height: 100%;
//       background: #222;
//     }

//     /* Fix for education content */
//     .education-content {
//       margin-top: 4px;
//       padding-left: 2px;
//     }

//     .education-list {
//       padding-left: 15px;
//       margin: 5px 0;
//     }

//     .education-list li {
//       margin-bottom: 2px;
//       font-size: 11px;
//       line-height: 1.3;
//     }
//   `;

//   /* ===========================
//      CREATE MULTI-PAGE RESUME WITHOUT CONTINUATION HEADER
//   ============================ */
//   const createMultiPageResume = () => {
//     // Helper function to create section HTML
//     const createSection = (title, content) => {
//       return `
//         <div class="section-content">
//           <div class="section-title">${title}</div>
//           ${content}
//         </div>
//       `;
//     };

//     // Helper function to create experience item
//     const createExperienceItem = (exp, index) => {
//       return `
//         <div style="margin-bottom: 8px;">
//           <div class="item-header">
//             <div class="item-title-container">
//               <div class="item-title">${exp.jobTitle}</div>
//               <div class="item-subtitle">${exp.employer} — ${exp.location}</div>
//             </div>
//             <div class="item-date">
//               ${exp.startDate ? new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""}
//               -
//               ${exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"}
//             </div>
//           </div>
//           <div class="item-content">${exp.text}</div>
//         </div>
//       `;
//     };

//     // Helper function to create education item - FIXED ALIGNMENT
//     const createEducationItem = (edu, index) => {
//       // Parse the text content to handle lists properly
//       let textContent = "";
//       if (edu.text) {
//         // Convert text with line breaks to HTML
//         const lines = edu.text.split('\n').filter(line => line.trim() !== '');
//         if (lines.some(line => line.trim().startsWith('-'))) {
//           // It has bullet points
//           textContent = `<div class="education-content"><ul class="education-list">`;
//           lines.forEach(line => {
//             const trimmed = line.trim();
//             if (trimmed.startsWith('-')) {
//               textContent += `<li>${trimmed.substring(1).trim()}</li>`;
//             } else if (trimmed) {
//               textContent += `<li>${trimmed}</li>`;
//             }
//           });
//           textContent += `</ul></div>`;
//         } else {
//           // Regular text
//           textContent = `<div class="item-content">${edu.text.replace(/\n/g, '<br>')}</div>`;
//         }
//       }

//       return `
//         <div class="education-item" style="margin-bottom: 8px;">
//           <div class="item-header">
//             <div class="item-title-container">
//               <div class="item-title">${edu.schoolname || ""}</div>
//               ${
//                 edu.degree || edu.location
//                   ? `
//                 <div class="item-subtitle">
//                   ${edu.degree || ""}
//                   ${edu.degree && edu.location ? " — " : ""}
//                   ${edu.location || ""}
//                 </div>
//               `
//                   : ""
//               }
//             </div>
//             ${
//               edu.startDate || edu.endDate
//                 ? `
//               <div class="item-date">
//                 ${edu.startDate || ""}
//                 ${edu.startDate && edu.endDate ? " - " : ""}
//                 ${edu.endDate || ""}
//               </div>
//             `
//                 : ""
//             }
//           </div>
//           ${textContent}
//         </div>
//       `;
//     };

//     // Helper function to create skill item
//     const createSkillItem = (skill, index) => {
//       return `
//         <div>
//           <div class="skill-name">${skill.skill}</div>
//           <div class="skill-bar">
//             <div class="skill-level" style="width: ${(Number(skill.level) / 4) * 100}%;"></div>
//           </div>
//         </div>
//       `;
//     };

//     // Build header section (only for first page)
//     const headerSection = `
//       <div class="contact-info">
//         <div class="name">${contact?.firstName} ${contact?.lastName}</div>
//         <div class="job-title">${contact?.jobTitle?.name}</div>
//         <div class="address">${addressParts.join(", ")}</div>
//         <div class="contact-details">
//           ${contact?.email ? `<span>${contact.email}</span>` : ""}
//           ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//         </div>
//         <div class="links">
//           ${linkedinUrl ? `<span class="link-item">LinkedIn: ${linkedinUrl.replace(/https?:\/\//, "")}</span>` : ""}
//         </div>
//       </div>
//     `;

//     // Build summary section
//     const summarySection = summary
//       ? createSection("Summary", `<div class="item-content">${summary}</div>`)
//       : "";

//     // Build experience section
//     let experienceContent = "";
//     if (experiences.length > 0) {
//       experiences.forEach((exp, index) => {
//         experienceContent += createExperienceItem(exp, index);
//       });
//     }
//     const experienceSection = experienceContent
//       ? createSection("Experience", experienceContent)
//       : "";

//     // Build education section
//     let educationContent = "";
//     if (educations.length > 0) {
//       educations.forEach((edu, index) => {
//         educationContent += createEducationItem(edu, index);
//       });
//     }
//     const educationSection = educationContent
//       ? createSection("Education", educationContent)
//       : "";

//     // Build skills section
//     let skillsContent = "";
//     if (skills.length > 0) {
//       skillsContent = `<div class="skills-grid">`;
//       skills.forEach((skill, index) => {
//         skillsContent += createSkillItem(skill, index);
//       });
//       skillsContent += `</div>`;
//     }
//     const skillsSection = skillsContent
//       ? createSection("Skills", skillsContent)
//       : "";

//     // Build languages section
//     let languagesContent = "";
//     if (Array.isArray(finalize?.languages) && finalize.languages.length > 0) {
//       const validLanguages = finalize.languages.filter(lang => lang.name && lang.name.trim() !== "");
//       if (validLanguages.length > 0) {
//         languagesContent = `<div class="skills-grid">`;
//         validLanguages.forEach((lang, index) => {
//           languagesContent += `
//             <div>
//               <div class="skill-name">${lang.name}</div>
//               ${lang.level ? `
//                 <div class="skill-bar">
//                   <div class="skill-level" style="width: ${(Number(lang.level) / 4) * 100}%;"></div>
//                 </div>
//               ` : ''}
//             </div>
//           `;
//         });
//         languagesContent += `</div>`;
//       }
//     }
//     const languagesSection = languagesContent
//       ? createSection("Languages", languagesContent)
//       : "";

//     // Build other sections
//     const otherSections = [];

//     // Certifications
//     if (Array.isArray(finalize?.certificationsAndLicenses)) {
//       const validCerts = finalize.certificationsAndLicenses.filter(
//         item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//       );
//       if (validCerts.length > 0) {
//         let certContent = "";
//         validCerts.forEach((item, index) => {
//           certContent += `<div class="item-content">${item.name}</div>`;
//         });
//         otherSections.push(createSection("Certifications and Licenses", certContent));
//       }
//     }

//     // Hobbies
//     if (Array.isArray(finalize?.hobbiesAndInterests)) {
//       const validHobbies = finalize.hobbiesAndInterests.filter(
//         item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//       );
//       if (validHobbies.length > 0) {
//         let hobbiesContent = "";
//         validHobbies.forEach((item, index) => {
//           hobbiesContent += `<div class="item-content">${item.name}</div>`;
//         });
//         otherSections.push(createSection("Hobbies and Interests", hobbiesContent));
//       }
//     }

//     // Awards
//     if (Array.isArray(finalize?.awardsAndHonors)) {
//       const validAwards = finalize.awardsAndHonors.filter(
//         item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//       );
//       if (validAwards.length > 0) {
//         let awardsContent = "";
//         validAwards.forEach((item, index) => {
//           awardsContent += `<div class="item-content">${item.name}</div>`;
//         });
//         otherSections.push(createSection("Awards and Honors", awardsContent));
//       }
//     }

//     // Websites
//     if (Array.isArray(finalize?.websitesAndSocialMedia)) {
//       const validWebsites = finalize.websitesAndSocialMedia.filter(
//         item => (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//                 (item.socialMedia && item.socialMedia.trim() !== "")
//       );
//       if (validWebsites.length > 0) {
//         let websitesContent = "";
//         validWebsites.forEach((item, index) => {
//           websitesContent += `
//             <div style="margin-bottom: 5px;">
//               ${item.websiteUrl ? `<div>Website: ${item.websiteUrl}</div>` : ""}
//               ${item.socialMedia ? `<div>Social Media: ${item.socialMedia}</div>` : ""}
//             </div>
//           `;
//         });
//         otherSections.push(createSection("Websites and Social Media", `<div class="item-content">${websitesContent}</div>`));
//       }
//     }

//     // References
//     if (Array.isArray(finalize?.references)) {
//       const validRefs = finalize.references.filter(
//         item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//       );
//       if (validRefs.length > 0) {
//         let refsContent = "";
//         validRefs.forEach((item, index) => {
//           refsContent += `<div class="item-content">${item.name}</div>`;
//         });
//         otherSections.push(createSection("References", refsContent));
//       }
//     }

//     // Custom Sections
//     if (Array.isArray(finalize?.customSection)) {
//       const validCustomSections = finalize.customSection.filter(
//         section => section?.name?.trim() || section?.description?.trim()
//       );
//       validCustomSections.forEach((section, index) => {
//         const customContent = `
//           ${section.name ? `<div class="section-title">${section.name}</div>` : ""}
//           ${section.description ? `<div class="item-content">${section.description}</div>` : ""}
//         `;
//         otherSections.push(`<div class="section-content">${customContent}</div>`);
//       });
//     }

//     // Combine all sections in order
//     const allSections = [
//       { id: "header", content: headerSection, isHeader: true },
//       { id: "summary", content: summarySection },
//       { id: "experience", content: experienceSection },
//       { id: "education", content: educationSection },
//       { id: "skills", content: skillsSection },
//       { id: "languages", content: languagesSection },
//       ...otherSections
//     ].filter(section => section.content && section.content.trim() !== "");

//     // Simple approach: Force split after header + 2 sections for page 1
//     // This ensures multi-page when there's decent content
//     const pages = [];

//     // Page 1: Header + Summary + Experience (or first part of experience if too long)
//     const page1Sections = [];
//     let page1Height = 0;
//     const maxPage1Height = 200; // mm

//     // Always add header to page 1
//     if (allSections[0]?.isHeader) {
//       page1Sections.push(allSections[0]);
//       page1Height += 40; // header height in mm
//     }

//     // Add summary if exists
//     if (allSections.find(s => s.id === "summary")) {
//       const summarySection = allSections.find(s => s.id === "summary");
//       page1Sections.push(summarySection);
//       page1Height += 30;
//     }

//     // Add experience section (might be split)
//     const experienceSectionData = allSections.find(s => s.id === "experience");
//     if (experienceSectionData) {
//       // Check if we should split experiences
//       if (experiences.length > 2 && page1Height + (experiences.length * 20) > maxPage1Height) {
//         // Split experiences between pages
//         const halfIndex = Math.ceil(experiences.length / 2);
//         const firstHalfExps = experiences.slice(0, halfIndex);

//         // Create first half experience section for page 1
//         let firstHalfContent = "";
//         firstHalfExps.forEach((exp, index) => {
//           firstHalfContent += createExperienceItem(exp, index);
//         });
//         const firstHalfSection = createSection("Experience", firstHalfContent);

//         page1Sections.push({ id: "experience-part1", content: firstHalfSection });

//         // Create second half for page 2
//         const secondHalfExps = experiences.slice(halfIndex);
//         let secondHalfContent = "";
//         secondHalfExps.forEach((exp, index) => {
//           secondHalfContent += createExperienceItem(exp, index + halfIndex);
//         });
//         const secondHalfSection = createSection("Experience", secondHalfContent);

//         // Remove original experience section and add split versions
//         const remainingSections = allSections.filter(s =>
//           s.id !== "header" &&
//           s.id !== "summary" &&
//           s.id !== "experience"
//         );

//         // Page 1 content
//         const page1Content = page1Sections.map(s => s.content).join('');

//         // Page 2 content (starts with second half of experience)
//         const page2Sections = [
//           { id: "experience-part2", content: secondHalfSection },
//           ...remainingSections
//         ];
//         const page2Content = page2Sections.map(s => s.content).join('');

//         pages.push({
//           number: 1,
//           content: page1Content
//         });

//         pages.push({
//           number: 2,
//           content: page2Content
//         });

//       } else {
//         // All experiences fit on page 1
//         page1Sections.push(experienceSectionData);
//         page1Height += experiences.length * 20;

//         // Add remaining sections to page 2 if they exist
//         const remainingSections = allSections.filter(s =>
//           !page1Sections.includes(s)
//         );

//         const page1Content = page1Sections.map(s => s.content).join('');
//         pages.push({ number: 1, content: page1Content });

//         if (remainingSections.length > 0) {
//           const page2Content = remainingSections.map(s => s.content).join('');
//           pages.push({ number: 2, content: page2Content });
//         }
//       }
//     } else {
//       // No experience section, simple split
//       const page1SectionsSimple = allSections.slice(0, 3); // First 3 sections on page 1
//       const page2SectionsSimple = allSections.slice(3); // Rest on page 2

//       if (page1SectionsSimple.length > 0) {
//         pages.push({
//           number: 1,
//           content: page1SectionsSimple.map(s => s.content).join('')
//         });
//       }

//       if (page2SectionsSimple.length > 0) {
//         pages.push({
//           number: 2,
//           content: page2SectionsSimple.map(s => s.content).join('')
//         });
//       }
//     }

//     // Build final HTML - NO CONTINUATION HEADER on page 2+
//     return pages.map((page, index) => `
//       <div class="resume-page" style="page-break-after: ${index < pages.length - 1 ? 'always' : 'avoid'};">
//         ${page.content}
//       </div>
//     `).join('');
//   };

//   /* ===========================
//      DOWNLOAD MULTI-PAGE HTML RESUME
//   ============================ */
//   const handleDownload = async () => {
//     setIsGenerating(true);

//     try {
//       const resumeHtml = createMultiPageResume();

//       const fullHtml = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>${contact?.firstName} ${contact?.lastName} - Resume</title>
//           <style>
//             /* Base styles for all pages */
//             body {
//               margin: 0;
//               padding: 0;
//               font-family: Helvetica, Arial, sans-serif;
//               background: white;
//             }

//             .resume-page {
//               width: 210mm;
//               min-height: 297mm;
//               padding: 20mm;
//               box-sizing: border-box;
//               position: relative;
//             }

//             /* Resume content styles with FIXED ALIGNMENT */
//             .contact-info {
//               text-align: center;
//               margin-bottom: 15px;
//             }

//             .name {
//               font-size: 22px;
//               font-weight: 800;
//               text-transform: uppercase;
//               color: #000;
//             }

//             .job-title {
//               font-size: 14px;
//               font-weight: 700;
//               margin-top: 2px;
//               color: #333;
//             }

//             .address {
//               font-size: 11px;
//               margin-top: 4px;
//               color: #555;
//             }

//             .contact-details {
//               display: flex;
//               justify-content: center;
//               gap: 20px;
//               margin-top: 6px;
//               font-size: 11px;
//               font-weight: 600;
//               color: #444;
//             }

//             .links {
//               display: flex;
//               justify-content: center;
//               gap: 15px;
//               margin-top: 6px;
//             }

//             .link-item {
//               font-size: 11px;
//               font-weight: 600;
//               text-decoration: none;
//               color: #000;
//             }

//             .section-title {
//               background: #f0f0f0;
//               height: 26px;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               font-size: 14px;
//               font-weight: 700;
//               text-transform: uppercase;
//               margin: 12px 0 8px;
//               color: #000;
//             }

//             .section-content {
//               margin-bottom: 12px;
//             }

//             .item-header {
//               display: flex;
//               justify-content: space-between;
//               align-items: flex-start;
//               margin-bottom: 3px;
//             }

//             .item-title-container {
//               flex: 1;
//               min-width: 0; /* CRITICAL FIX for text wrapping */
//             }

//             .item-title {
//               font-size: 13px;
//               font-weight: 700;
//               color: #000;
//             }

//             .item-subtitle {
//               font-size: 12px;
//               color: #555;
//               margin-top: 2px;
//             }

//             .item-date {
//               font-size: 11px;
//               white-space: nowrap;
//               text-align: right;
//               margin-left: 10px;
//               min-width: 100px;
//               color: #666;
//             }

//             .item-content {
//               font-size: 11px;
//               line-height: 1.5;
//               color: #444;
//               margin-top: 4px;
//             }

//             .education-content {
//               margin-top: 4px;
//               padding-left: 2px;
//             }

//             .education-list {
//               padding-left: 15px;
//               margin: 5px 0;
//             }

//             .education-list li {
//               margin-bottom: 2px;
//               font-size: 11px;
//               line-height: 1.3;
//             }

//             .skills-grid {
//               display: grid;
//               grid-template-columns: repeat(2, 1fr);
//               gap: 12px;
//             }

//             .skill-name {
//               font-size: 11px;
//               margin-bottom: 2px;
//               color: #333;
//             }

//             .skill-bar {
//               height: 3px;
//               background: #e0e0e0;
//             }

//             .skill-level {
//               height: 100%;
//               background: #222;
//             }

//             /* Print-specific styles */
//             @media print {
//               @page {
//                 size: A4;
//                 margin: 0;
//               }

//               body {
//                 width: 210mm;
//                 height: 297mm;
//                 margin: 0;
//                 padding: 0;
//               }

//               .resume-page {
//                 page-break-after: always;
//                 margin: 0;
//                 padding: 20mm;
//                 box-shadow: none;
//               }

//               .resume-page:last-child {
//                 page-break-after: avoid;
//               }

//               /* Ensure colors print correctly */
//               .section-title {
//                 -webkit-print-color-adjust: exact !important;
//                 print-color-adjust: exact !important;
//                 background: #f0f0f0 !important;
//               }

//               .skill-level {
//                 -webkit-print-color-adjust: exact !important;
//                 print-color-adjust: exact !important;
//                 background: #222 !important;
//               }
//             }

//             /* Screen preview styles */
//             @media screen {
//               body {
//                 background: #f5f5f5;
//                 padding: 20px;
//                 display: flex;
//                 flex-direction: column;
//                 align-items: center;
//               }

//               .resume-page {
//                 margin-bottom: 20px;
//                 box-shadow: 0 0 10px rgba(0,0,0,0.1);
//                 background: white;
//               }

//               .resume-page:last-child {
//                 margin-bottom: 0;
//               }
//             }
//           </style>
//         </head>
//         <body>
//           ${resumeHtml}
//         </body>
//         </html>
//       `;

//       console.log("Number of pages generated:", fullHtml.split('resume-page').length - 1);

//       const res = await axios.post(
//         "http://192.168.0.114:3015/api/candidates/generate-pdf",
//         { html: fullHtml },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           responseType: "blob",
//         }
//       );

//       const blob = res.data;
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `${contact?.firstName || "Resume"}_${contact?.lastName || ""}.pdf`.trim();
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);

//     } catch (error) {
//       console.error("Error generating resume:", error);
//       alert("Error generating resume. Please try again.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // Render the preview (single page view for UI) - WITH FIXED ALIGNMENT
//   return (
//     <>
//       {/* Download Buttons */}
//       <div
//         style={{
//           textAlign: "center",
//           margin: "20px 0",
//           position: "sticky",
//           top: 0,
//           background: "#fff",
//           zIndex: 10,
//           padding: "10px",
//           borderBottom: "1px solid #eee",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "20px",
//             flexWrap: "wrap",
//           }}
//         >
//           <button
//             onClick={handleDownload}
//             disabled={isGenerating}
//             style={{
//               padding: "12px 24px",
//               fontSize: "16px",
//               fontWeight: "bold",
//               background: isGenerating ? "#666" : "#d32f2f",
//               color: "#fff",
//               border: "none",
//               borderRadius: "4px",
//               cursor: isGenerating ? "not-allowed" : "pointer",
//               transition: "background 0.3s",
//               boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//               minWidth: "200px",
//             }}
//           >
//             {isGenerating ? "Generating..." : "Download Multi-Page Resume"}
//           </button>
//         </div>
//       </div>

//       {/* Resume Preview - Single page view for UI */}
//       <div ref={resumeRef} className="resume-container">
//         <style>{originalStyles}</style>

//         {/* HEADER */}
//         <div className="contact-info">
//           <div className="name">
//             {contact?.firstName} {contact?.lastName}
//           </div>
//           <div className="job-title">{contact?.jobTitle?.name}</div>
//           <div className="address">{addressParts.join(", ")}</div>

//           <div className="contact-details">
//             {contact?.email && <span>{contact.email}</span>}
//             {contact?.phone && <span>{contact.phone}</span>}
//           </div>

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
//           </div>
//         </div>

//         {/* SUMMARY */}
//         {summary && (
//           <div className="section-content resume-section">
//             <div className="section-title">Summary</div>
//             <div
//               className="item-content"
//               dangerouslySetInnerHTML={{ __html: summary }}
//             />
//           </div>
//         )}

//         {/* EXPERIENCE - WITH FIXED ALIGNMENT */}
//         {experiences.length > 0 && (
//           <div className="section-content resume-section">
//             <div className="section-title">Experience</div>
//             {experiences.map((exp, i) => (
//               <div key={i} style={{ marginBottom: "8px" }}>
//                 <div className="item-header">
//                   <div className="item-title-container">
//                     <div className="item-title">{exp.jobTitle}</div>
//                     <div className="item-subtitle">
//                       {exp.employer} — {exp.location}
//                     </div>
//                   </div>
//                   <div className="item-date">
//                     <MonthYearDisplay value={exp.startDate} shortYear />
//                     {" - "}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate} shortYear />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>
//                 <div
//                   className="item-content"
//                   dangerouslySetInnerHTML={{ __html: exp.text }}
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* EDUCATION - WITH FIXED ALIGNMENT */}
//         {educations?.length > 0 && (
//           <div className="section-content">
//             <div className="section-title">Education</div>
//             {educations.map((edu, index) => {
//               // Parse education text for lists
//               let textContent = null;
//               if (edu.text) {
//                 const lines = edu.text.split('\n').filter(line => line.trim() !== '');
//                 if (lines.some(line => line.trim().startsWith('-'))) {
//                   textContent = (
//                     <div className="education-content">
//                       <ul className="education-list">
//                         {lines.map((line, i) => {
//                           const trimmed = line.trim();
//                           if (trimmed.startsWith('-')) {
//                             return <li key={i}>{trimmed.substring(1).trim()}</li>;
//                           } else if (trimmed) {
//                             return <li key={i}>{trimmed}</li>;
//                           }
//                           return null;
//                         })}
//                       </ul>
//                     </div>
//                   );
//                 } else {
//                   textContent = (
//                     <div
//                       className="item-content"
//                       style={{ whiteSpace: 'pre-wrap' }}
//                     >
//                       {edu.text}
//                     </div>
//                   );
//                 }
//               }

//               return (
//                 <div key={edu._id || edu.id || index} className="education-item" style={{ marginBottom: "8px" }}>
//                   <div className="item-header">
//                     <div className="item-title-container">
//                       <div className="item-title">{edu.schoolname || ""}</div>
//                       {(edu.degree || edu.location) && (
//                         <div className="item-subtitle">
//                           {edu.degree && <span>{edu.degree}</span>}
//                           {edu.location && (
//                             <>
//                               {edu.degree && " — "}
//                               <span>{edu.location}</span>
//                             </>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     {(edu.startDate || edu.endDate) && (
//                       <div className="item-date">
//                         {edu.startDate || ""}
//                         {edu.startDate && edu.endDate && " - "}
//                         {edu.endDate || ""}
//                       </div>
//                     )}
//                   </div>
//                   {textContent}
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* SKILLS */}
//         {skills.length > 0 && (
//           <div className="section-content resume-section">
//             <div className="section-title">Skills</div>
//             <div className="skills-grid">
//               {skills.map((skill, i) => (
//                 <div key={i}>
//                   <div className="skill-name">{skill.skill}</div>
//                   <div className="skill-bar">
//                     <div
//                       className="skill-level"
//                       style={{
//                         width: `${(Number(skill.level) / 4) * 100}%`,
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Languages Section */}
//         {Array.isArray(finalize?.languages) &&
//           finalize.languages.some(
//             (lang) => lang.name && lang.name.trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Languages</div>
//               <div className="skills-grid">
//                 {finalize.languages.map(
//                   (lang, index) =>
//                     lang.name &&
//                     lang.name.trim() !== "" && (
//                       <div key={lang._id || index} className="skill-item">
//                         <div className="skill-name">{lang.name}</div>
//                         {lang.level && (
//                           <div className="skill-bar">
//                             <div
//                               className="skill-level"
//                               style={{
//                                 width: `${(Number(lang.level) / 4) * 100}%`,
//                               }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Additional Sections */}
//         {Array.isArray(finalize?.certificationsAndLicenses) &&
//           finalize.certificationsAndLicenses.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Certifications and Licenses</div>
//               <div className="item-content">
//                 {finalize.certificationsAndLicenses.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {Array.isArray(finalize?.hobbiesAndInterests) &&
//           finalize.hobbiesAndInterests.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Hobbies and Interests</div>
//               <div className="item-content">
//                 {finalize.hobbiesAndInterests.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {Array.isArray(finalize?.awardsAndHonors) &&
//           finalize.awardsAndHonors.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Awards and Honors</div>
//               <div className="item-content">
//                 {finalize.awardsAndHonors.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Websites and Social Media */}
//         {Array.isArray(finalize?.websitesAndSocialMedia) &&
//           finalize.websitesAndSocialMedia.some(
//             (item) =>
//               (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//               (item.socialMedia && item.socialMedia.trim() !== ""),
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">Websites and Social Media</div>
//               <div className="item-content">
//                 {finalize.websitesAndSocialMedia.map(
//                   (item, index) =>
//                     (item.websiteUrl || item.socialMedia) && (
//                       <div
//                         key={item.id || index}
//                         style={{ marginBottom: "5px" }}
//                       >
//                         {item.websiteUrl && (
//                           <div>Website: {item.websiteUrl}</div>
//                         )}
//                         {item.socialMedia && (
//                           <div>Social Media: {item.socialMedia}</div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* References */}
//         {Array.isArray(finalize?.references) &&
//           finalize.references.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="section-content resume-section">
//               <div className="section-title">References</div>
//               <div className="item-content">
//                 {finalize.references.map(
//                   (item, index) =>
//                     item.name &&
//                     item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                       <div
//                         key={item.id || index}
//                         dangerouslySetInnerHTML={{ __html: item.name }}
//                       />
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* Custom Sections */}
//         {Array.isArray(finalize?.customSection) &&
//           finalize.customSection.some(
//             (section) => section?.name?.trim() || section?.description?.trim(),
//           ) && (
//             <div className="section-content resume-section">
//               {finalize.customSection
//                 .filter(
//                   (section) =>
//                     section?.name?.trim() || section?.description?.trim(),
//                 )
//                 .map((section, index) => (
//                   <div key={section.id || index} className="custom-section">
//                     {section.name && (
//                       <div className="section-title">{section.name}</div>
//                     )}
//                     {section.description && (
//                       <div
//                         className="item-content"
//                         dangerouslySetInnerHTML={{
//                           __html: section.description,
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default Resume4;

import React, { useContext, useState } from "react";
import MonthYearDisplay from "../Componets/MonthYearDisplay";
import { CreateContext } from "../App";
import axios from "axios";
import { API_URL } from "../Config";

const Resume4 = (alldetails) => {
  const UseContext = useContext(CreateContext);
  const [isGenerating, setIsGenerating] = useState(false);

  const contact = alldetails?.alldata?.contact || UseContext || {};
  const educations =
    alldetails?.alldata?.educations || UseContext?.education || [];
  const experiences =
    alldetails?.alldata?.experiences || UseContext?.experiences || [];
  const skills = alldetails?.alldata?.skills || UseContext?.skills || [];
  const finalize =
    alldetails?.alldata?.finalize || UseContext?.globalSkillsData || {};
  const summary = alldetails?.alldata?.summary || UseContext?.text || "";

  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.country,
    contact?.postcode,
  ].filter(Boolean);

  const linkedinUrl = contact?.linkedin || contact?.linkedIn;

  /* ======================================================
     CSS — AUTO PAGE BREAK (NO MANUAL SPLIT)
  ====================================================== */
  const styles = `
    body {
      margin:0;
      font-family: Helvetica, Arial, sans-serif;
      background-color:'white'
    }

    .resume-container{
      width:210mm;
      padding:8mm;
      box-sizing:border-box;
    }

   

    .section-title{
      background:#f0f0f0;
      padding:6px;
      text-align:center;
      font-weight:700;
      margin:12px 0 8px;
    }

    .item-header{
      display:flex;
      justify-content:space-between;
      align-items:flex-start;
    }

    .item-title{font-weight:700}
    .item-date{white-space:nowrap;font-size:11px}

    .skills-grid{
      display:grid;
      grid-template-columns:repeat(2,1fr);
      gap:12px;
    }

    .skill-bar{
      height:3px;
      background:#e0e0e0;
    }

    .skill-level{
      height:100%;
      background:#222;
    }

   @media print {

  /* page 2,3,4... */
  @page {
    size: A4;
    margin-top: 20mm;   /* space for 2nd+ pages */
    margin-right: 20mm;
    margin-bottom: 20mm;
    margin-left: 20mm;
  }



}

  `;

  /* ======================================================
     GENERATE SINGLE HTML (browser handles pages)
  ====================================================== */
  const generateHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8"/>
        <style>${styles}</style>
      </head>

      <body>
        <div class="resume-container">

          <div style="text-align:center;margin-bottom:15px">
            <h2>${contact?.firstName || ""} ${contact?.lastName || ""}</h2>
            <div>${contact?.jobTitle?.name || ""}</div>
            <div>${addressParts.join(", ")}</div>
            <div>${contact?.email || ""} ${contact?.phone || ""}</div>
            ${linkedinUrl ? `<div>${linkedinUrl}</div>` : ""}
          </div>

          ${
            summary
              ? `<div class="section-content">
                   <div class="section-title">Summary</div>
                   <div>${summary}</div>
                 </div>`
              : ""
          }

          ${
            experiences.length
              ? `<div class="section-content">
                   <div class="section-title">Experience</div>
                   ${experiences
                     .map(
                       (e) => `
                         <div style="margin-bottom:10px">
                           <div class="item-header">
                             <div>
                               <div class="item-title">${e.jobTitle}</div>
                               <div>${e.employer} — ${e.location}</div>
                             </div>
                             <div class="item-date">
                               ${e.startDate || ""} - ${e.endDate || "Present"}
                             </div>
                           </div>
                           <div>${e.text || ""}</div>
                         </div>
                       `,
                     )
                     .join("")}
                 </div>`
              : ""
          }

          ${
            educations.length
              ? `<div class="section-content">
                   <div class="section-title">Education</div>
                   ${educations
                     .map(
                       (e) => `
                         <div class="education-item" style="margin-bottom:10px">
                           <div class="item-header">
                             <div>
                               <div class="item-title">${e.schoolname}</div>
                               <div>${e.degree || ""} ${e.location || ""}</div>
                             </div>
                             <div class="item-date">${e.startDate || ""} - ${e.endDate || ""}</div>
                           </div>
                           <div>${e.text || ""}</div>
                         </div>
                       `,
                     )
                     .join("")}
                 </div>`
              : ""
          }

          ${
            skills.length
              ? `<div class="section-content">
                   <div class="section-title">Skills</div>
                   <div class="skills-grid">
                     ${skills
                       .map(
                         (s) => `
                           <div>
                             <div>${s.skill}</div>
                             <div class="skill-bar">
                               <div class="skill-level" style="width:${(Number(s.level) / 4) * 100}%"></div>
                             </div>
                           </div>
                         `,
                       )
                       .join("")}
                   </div>
                 </div>`
              : ""
          }

        </div>
      </body>
      </html>
    `;
  };

  /* ======================================================
     DOWNLOAD PDF
  ====================================================== */
  const handleDownload = async () => {
    setIsGenerating(true);

    try {
      const html = generateHTML();

      const res = await axios.post(
        // "http://192.168.0.114:3015/api/candidates/generate-pdf",
        `${API_URL}/api/candidates/generate-pdf`,
        { html },
        { responseType: "blob" },
      );

      const url = URL.createObjectURL(res.data);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Resume.pdf";
      a.click();

      URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  };

  /* ======================================================
     UI
  ====================================================== */
  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <button onClick={handleDownload} disabled={isGenerating}  className="download-btn bg-red-600 text-white px-6 py-3 font-nunito rounded-lg font-semibold hover:bg-red-700 transition shadow-md">
        {isGenerating ? "Generating..." : "Download Resume"}
      </button>

      {/* {generateHTML()} */}

      {/* Resume Preview - Single page view for UI */}
      <div className="resume-container bg-white mt-3">
        <style>{styles}</style>

        {/* HEADER */}
        <div className="contact-info">
          <div className="name">
            {contact?.firstName} {contact?.lastName}
          </div>
          <div className="job-title">{contact?.jobTitle?.name}</div>
          <div className="address">{addressParts.join(", ")}</div>

          <div className="contact-details">
            {contact?.email && <span>{contact.email}</span>}
            {contact?.phone && <span>{contact.phone}</span>}
          </div>

          <div className="links">
            {linkedinUrl && (
              <a
                href={
                  linkedinUrl.startsWith("http")
                    ? linkedinUrl
                    : `https:${linkedinUrl}`
                }
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* SUMMARY */}
        {summary && (
          <div className="section-content resume-section">
            <div className="section-title">Summary</div>
            <div
              className="item-content"
              dangerouslySetInnerHTML={{ __html: summary }}
            />
          </div>
        )}

        {/* EXPERIENCE - WITH FIXED ALIGNMENT */}
        {experiences.length > 0 && (
          <div className="section-content resume-section">
            <div className="section-title">Experience</div>
            {experiences.map((exp, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div className="item-header">
                  <div className="item-title-container">
                    <div className="item-title">{exp.jobTitle}</div>
                    <div className="item-subtitle">
                      {exp.employer} — {exp.location}
                    </div>
                  </div>
                  <div className="item-date">
                    <MonthYearDisplay value={exp.startDate} shortYear />
                    {" - "}
                    {exp.endDate ? (
                      <MonthYearDisplay value={exp.endDate} shortYear />
                    ) : (
                      "Present"
                    )}
                  </div>
                </div>
                <div
                  className="item-content"
                  dangerouslySetInnerHTML={{ __html: exp.text }}
                />
              </div>
            ))}
          </div>
        )}

        {/* EDUCATION - WITH FIXED ALIGNMENT */}
        {educations?.length > 0 && (
          <div className="section-content">
            <div className="section-title">Education</div>
            {educations.map((edu, index) => {
              let textContent = null;
              if (edu.text) {
                const lines = edu.text
                  .split("\n")
                  .filter((line) => line.trim() !== "");
                if (lines.some((line) => line.trim().startsWith("-"))) {
                  textContent = (
                    <div className="education-content">
                      <ul className="education-list">
                        {lines.map((line, i) => {
                          const trimmed = line.trim();
                          if (trimmed.startsWith("-")) {
                            return (
                              <li key={i}>{trimmed.substring(1).trim()}</li>
                            );
                          } else if (trimmed) {
                            return <li key={i}>{trimmed}</li>;
                          }
                          return null;
                        })}
                      </ul>
                    </div>
                  );
                } else {
                  textContent = (
                    <div
                      className="item-content"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {edu.text}
                    </div>
                  );
                }
              }

              return (
                <div
                  key={edu._id || edu.id || index}
                  className="education-item"
                  style={{ marginBottom: "8px" }}
                >
                  <div className="item-header">
                    <div className="item-title-container">
                      <div className="item-title">{edu.schoolname || ""}</div>
                      {(edu.degree || edu.location) && (
                        <div className="item-subtitle">
                          {edu.degree && <span>{edu.degree}</span>}
                          {edu.location && (
                            <>
                              {edu.degree && " — "}
                              <span>{edu.location}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    {(edu.startDate || edu.endDate) && (
                      <div className="item-date">
                        {edu.startDate || ""}
                        {edu.startDate && edu.endDate && " - "}
                        {edu.endDate || ""}
                      </div>
                    )}
                  </div>
                  {textContent}
                </div>
              );
            })}
          </div>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="section-content resume-section">
            <div className="section-title">Skills</div>
            <div className="skills-grid">
              {skills.map((skill, i) => (
                <div key={i}>
                  <div className="skill-name">{skill.skill}</div>
                  <div className="skill-bar">
                    <div
                      className="skill-level"
                      style={{
                        width: `${(Number(skill.level) / 4) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {Array.isArray(finalize?.languages) &&
          finalize.languages.some(
            (lang) => lang.name && lang.name.trim() !== "",
          ) && (
            <div className="section-content resume-section">
              <div className="section-title">Languages</div>
              <div className="skills-grid">
                {finalize.languages.map(
                  (lang, index) =>
                    lang.name &&
                    lang.name.trim() !== "" && (
                      <div key={lang._id || index} className="skill-item">
                        <div className="skill-name">{lang.name}</div>
                        {lang.level && (
                          <div className="skill-bar">
                            <div
                              className="skill-level"
                              style={{
                                width: `${(Number(lang.level) / 4) * 100}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

        {/* Additional Sections */}
        {Array.isArray(finalize?.certificationsAndLicenses) &&
          finalize.certificationsAndLicenses.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <div className="section-content resume-section">
              <div className="section-title">Certifications and Licenses</div>
              <div className="item-content">
                {finalize.certificationsAndLicenses.map(
                  (item, index) =>
                    item.name &&
                    item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                      <div
                        key={item.id || index}
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
                    ),
                )}
              </div>
            </div>
          )}

        {Array.isArray(finalize?.hobbiesAndInterests) &&
          finalize.hobbiesAndInterests.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <div className="section-content resume-section">
              <div className="section-title">Hobbies and Interests</div>
              <div className="item-content">
                {finalize.hobbiesAndInterests.map(
                  (item, index) =>
                    item.name &&
                    item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                      <div
                        key={item.id || index}
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
                    ),
                )}
              </div>
            </div>
          )}

        {Array.isArray(finalize?.awardsAndHonors) &&
          finalize.awardsAndHonors.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <div className="section-content resume-section">
              <div className="section-title">Awards and Honors</div>
              <div className="item-content">
                {finalize.awardsAndHonors.map(
                  (item, index) =>
                    item.name &&
                    item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                      <div
                        key={item.id || index}
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
                    ),
                )}
              </div>
            </div>
          )}

        {/* Websites and Social Media */}
        {Array.isArray(finalize?.websitesAndSocialMedia) &&
          finalize.websitesAndSocialMedia.some(
            (item) =>
              (item.websiteUrl && item.websiteUrl.trim() !== "") ||
              (item.socialMedia && item.socialMedia.trim() !== ""),
          ) && (
            <div className="section-content resume-section">
              <div className="section-title">Websites and Social Media</div>
              <div className="item-content">
                {finalize.websitesAndSocialMedia.map(
                  (item, index) =>
                    (item.websiteUrl || item.socialMedia) && (
                      <div
                        key={item.id || index}
                        style={{ marginBottom: "5px" }}
                      >
                        {item.websiteUrl && (
                          <div>Website: {item.websiteUrl}</div>
                        )}
                        {item.socialMedia && (
                          <div>Social Media: {item.socialMedia}</div>
                        )}
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

        {/* References */}
        {Array.isArray(finalize?.references) &&
          finalize.references.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <div className="section-content resume-section">
              <div className="section-title">References</div>
              <div className="item-content">
                {finalize.references.map(
                  (item, index) =>
                    item.name &&
                    item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                      <div
                        key={item.id || index}
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
                    ),
                )}
              </div>
            </div>
          )}

        {/* Custom Sections */}
        {Array.isArray(finalize?.customSection) &&
          finalize.customSection.some(
            (section) => section?.name?.trim() || section?.description?.trim(),
          ) && (
            <div className="section-content resume-section">
              {finalize.customSection
                .filter(
                  (section) =>
                    section?.name?.trim() || section?.description?.trim(),
                )
                .map((section, index) => (
                  <div key={section.id || index} className="custom-section">
                    {section.name && (
                      <div className="section-title">{section.name}</div>
                    )}
                    {section.description && (
                      <div
                        className="item-content"
                        dangerouslySetInnerHTML={{
                          __html: section.description,
                        }}
                      />
                    )}
                  </div>
                ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default Resume4;
