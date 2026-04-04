// "use client";

// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {MonthYearDisplay } from "@/app/utils";

// import {
//   Contact,
//   Education,
//   Experience,
//   Finalize,
//   Skill,
// } from "@/app/types/context.types";
// import { usePathname } from "next/navigation";

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

// const TemplateThree: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";

//   const linkedinUrl = contact?.linkedin;

//   // Helper function to get job title
//   const getJobTitle = (jobTitle: any): string => {
//     if (!jobTitle) return "";

//     if (typeof jobTitle === 'string') {
//       return jobTitle;
//     }

//     if (typeof jobTitle === 'object' && jobTitle !== null) {
//       return (jobTitle as any)?.name || (jobTitle as any)?.label || "";
//     }

//     return "";
//   };

//   // Type guard for FinalizeData
//   const isFinalizeData = (data: any): data is Finalize => {
//     return data && typeof data === 'object' && !Array.isArray(data);
//   };

//   // Fix typo in map function calls
//   const fixMapCalls = {
//     languages: isFinalizeData(finalize) && Array.isArray(finalize.languages)
//       ? finalize.languages
//       : [],
//     certificationsAndLicenses: isFinalizeData(finalize) && Array.isArray(finalize.certificationsAndLicenses)
//       ? finalize.certificationsAndLicenses
//       : [],
//     hobbiesAndInterests: isFinalizeData(finalize) && Array.isArray(finalize.hobbiesAndInterests)
//       ? finalize.hobbiesAndInterests
//       : [],
//     awardsAndHonors: isFinalizeData(finalize) && Array.isArray(finalize.awardsAndHonors)
//       ? finalize.awardsAndHonors
//       : [],
//     websitesAndSocialMedia: isFinalizeData(finalize) && Array.isArray(finalize.websitesAndSocialMedia)
//       ? finalize.websitesAndSocialMedia
//       : [],
//     references: isFinalizeData(finalize) && Array.isArray(finalize.references)
//       ? finalize.references
//       : [],
//     customSection: isFinalizeData(finalize) && Array.isArray(finalize.customSection)
//       ? finalize.customSection
//       : []
//   };

//   const getSkillLevelWidth = (level: number | null | undefined) => {
//     if (!level) return "0%";
//     return `${(Number(level) / 5) * 100}%`;
//   };

//   const generateHTML = () => {
//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8"/>
//         <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//         <style>
//           /* Reset and base styles */
//           * {
//             margin: 0;
//             padding: 0;
//             box-sizing: border-box;
//           }

//           body {
//             margin: 0;
//             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
//             background-color: white;
//             line-height: 1.5;
//           }

//           .resume-container {
//             width: 210mm;
//             padding: 5mm;
//             box-sizing: border-box;
//             background-color: white;
//             margin: 0 auto;
//           }

//           /* Utility classes */
//           .flex { display: flex; }
//           .justify-between { justify-content: space-between; }
//           .items-center { align-items: center; }
//           .gap-2 { gap: 0.5rem; }
//           .gap-4 { gap: 1rem; }
//           .gap-x-8 { column-gap: 2rem; }
//           .gap-y-3 { row-gap: 0.75rem; }

//           .grid { display: grid; }
//           .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }

//           .w-full { width: 100%; }
//           .w-\\[40\\%\\] { width: 40%; }
//           .w-\\[60\\%\\] { width: 60%; }

//           .p-1 { padding: 0.25rem; }
//           .p-3 { padding: 0.75rem; }
//           .p-4 { padding: 1rem; }
//           .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
//           .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
//           .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
//           .pt-1 { padding-top: 0.25rem; }
//           .pt-2 { padding-top: 0.5rem; }
//           .pb-2 { padding-bottom: 0.5rem; }
//           .pb-3 { padding-bottom: 0.75rem; }
//           .pl-5 { padding-left: 1.25rem; }
//           .pr-5 { padding-right: 1.25rem; }
//           .ml-5 { margin-left: 1.25rem; }
//           .ml-6 { margin-left: 1.5rem; }
//           .mt-1 { margin-top: 0.25rem; }
//           .mt-2 { margin-top: 0.5rem; }
//           .mt-3 { margin-top: 0.75rem; }
//           .mt-4 { margin-top: 1rem; }
//           .mb-1 { margin-bottom: 0.25rem; }
//           .mb-2 { margin-bottom: 0.5rem; }
//           .mb-4 { margin-bottom: 1rem; }

//           .bg-\\[\\#878787\\] { background-color: #878787; }
//           .bg-gray-300 { background-color: #d1d5db; }
//           .bg-\\[\\#0c0c1e\\] { background-color: #0c0c1e; }
//           .bg-white { background-color: white; }

//           .text-white { color: white; }
//           .text-gray-500 { color: #6b7280; }
//           .text-gray-600 { color: #4b5563; }
//           .text-gray-700 { color: #374151; }
//           .text-gray-800 { color: #1f2937; }
//           .text-gray-900 { color: #111827; }

//           .text-\\[14px\\] { font-size: 14px; }
//           .text-\\[15px\\] { font-size: 15px; }
//           .text-sm { font-size: 0.875rem; }
//           .text-lg { font-size: 1.125rem; }
//           .text-\\[20px\\] { font-size: 20px; }
//           .text-\\[22px\\] { font-size: 22px; }
//           .text-\\[27px\\] { font-size: 27px; }

//           .font-normal { font-weight: 400; }
//           .font-medium { font-weight: 500; }
//           .font-semibold { font-weight: 600; }
//           .font-bold { font-weight: 700; }

//           .uppercase { text-transform: uppercase; }
//           .lowercase { text-transform: lowercase; }
//           .underline { text-decoration: underline; }
//           .wrap-break-word { word-wrap: break-word; overflow-wrap: break-word; }
//           .text-end { text-align: right; }

//           .rounded-2xl { border-radius: 1rem; }
//           .rounded-full { border-radius: 9999px; }
//           .overflow-hidden { overflow: hidden; }
//           .h-1 { height: 0.25rem; }

//           /* List styles */
//           .list-disc { list-style-type: disc; }
//           .list-decimal { list-style-type: decimal; }
//           .ml-4 { margin-left: 1rem; }

//           .skill-level {
//     height: 100%;
//     background: #333;
//     border-radius: 2px;
//   }
//           /* Print styles */
//           @media print {
//             body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//             .resume-container { width: 100%; padding: 0; }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="resume-container">
//           <!-- Header -->
//           <div class="flex justify-between bg-[#878787] h-auto p-1 text-white rounded-2xl">
//             <div class="w-[40%] text-[27px] font-medium p-3 uppercase wrap-break-word">
//               ${contact?.firstName || ""} ${contact?.lastName || ""}
//               ${contact?.jobTitle ? `
//                 <div class="text-sm font-normal lowercase mt-1">
//                   ${getJobTitle(contact.jobTitle)}
//                 </div>
//               ` : ""}
//               <div class="flex items-center gap-4 pb-2 mt-1">
//                 ${linkedinUrl && linkedinUrl.trim() ? `
//                   <a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 font-semibold underline text-white text-sm">
//                     <p>LinkedIn</p>
//                   </a>
//                 ` : ""}
//                 ${contact?.portfolio && contact.portfolio.trim() ? `
//                   <a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 font-semibold underline text-white text-sm">
//                     <p>Portfolio</p>
//                   </a>
//                 ` : ""}
//               </div>
//             </div>
//             <div class="w-[60%] p-3 text-[14px]">
//               <p class="text-end wrap-break-word">
//                 ${contact?.email || ""} • ${contact?.phone || ""}
//               </p>
//               <p class="text-end wrap-break-word">
//                 ${contact?.address || ""}, ${contact?.city || ""}, ${contact?.country || ""}, ${contact?.postcode || ""}
//               </p>
//             </div>
//           </div>

//           <!-- Summary -->
//           ${summary ? `
//             <div>
//               <p class="text-[22px] ml-5 mt-2 font-semibold">Summary</p>
//               <div class="ml-5 pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
//                 ${summary.replace(/<[^>]*>/g, '')}
//               </div>
//             </div>
//           ` : ""}

//           <!-- Experience -->
//           <div>
//             ${experiences?.length > 0 ? `
//               <p class="text-[22px] ml-5 mt-1 font-semibold">Experience</p>
//               ${experiences.map((exp, index) => `
//                 <div class="ml-6 mt-2">
//                   ${(exp.jobTitle || exp.employer || exp.location) ? `
//                     <h3 class="font-semibold text-gray-900 text-lg wrap-break-word">
//                       ${exp.jobTitle ? `${exp.jobTitle} ` : ""}
//                       ${exp.employer ? `<span class="text-gray-500 font-normal">— ${exp.employer}</span>` : ""}
//                       ${exp.location ? `<span class="text-gray-500 font-normal">— ${exp.location}</span>` : ""}
//                     </h3>
//                   ` : ""}
//                   <div class="text-gray-600 text-sm wrap-break-word mt-1">
//                     <div class="flex items-center gap-2">
//                       ${exp.startDate ? exp.startDate : ""}
//                       ${exp.startDate && exp.endDate ? `<span>-</span>` : ""}
//                       ${exp.endDate ? exp.endDate : exp.startDate ? "Present" : ""}
//                     </div>
//                   </div>
//                   ${exp.text ? `
//                     <div class="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word">
//                       ${exp.text.replace(/<[^>]*>/g, '')}
//                     </div>
//                   ` : ""}
//                 </div>
//               `).join("")}
//             ` : ""}
//           </div>

//           <!-- Education -->
//           <div>
//             <p class="text-[22px] ml-5 mt-3 font-semibold">Education</p>
//             <div class="ml-6">
//               ${educations?.length > 0 ? educations.map((edu, index) => `
//                 <div class="pb-2 mt-2">
//                   ${(edu.schoolname || edu.degree || edu.location) ? `
//                     <h3 class="font-semibold wrap-break-word text-gray-900 text-lg">
//                       ${edu.schoolname || ""}
//                       ${edu.degree ? `<span class="text-gray-500 wrap-break-word font-normal"> — ${edu.degree}</span>` : ""}
//                       ${edu.location ? `<span class="text-gray-500 wrap-break-word font-normal"> — ${edu.location}</span>` : ""}
//                     </h3>
//                   ` : ""}
//                   ${(edu.startDate || edu.endDate) ? `
//                     <p class="text-gray-500 text-sm wrap-break-word mt-1">
//                       ${edu.startDate || ""} — ${edu.endDate || ""}
//                     </p>
//                   ` : ""}
//                   ${edu.text ? `
//                     <div class="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word">
//                       ${edu.text.replace(/<[^>]*>/g, '')}
//                     </div>
//                   ` : ""}
//                 </div>
//               `).join("") : `
//                 <p class="text-gray-500 wrap-break-word">No education added yet.</p>
//               `}
//             </div>
//           </div>

//           <!-- Skills -->
//           <div class="ml-5 text-[15px] mt-3">
//             <p class="text-[22px] font-semibold">Skills</p>
//             ${skills.length > 0 ? `
//               <div class="grid grid-cols-2 gap-x-8 gap-y-3 mt-2">
//                 ${skills.map(skill => `
//                   <div>
//                     <p class="text-sm text-gray-700 font-medium wrap-break-word mb-1">${skill.skill || ""}</p>
//                     ${skill.level ? `
//                       <div class="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//                         <div class="h-full bg-[#0c0c1e] transition-all duration-300 skill-level" style="width: ${(Number(skill.level) / 5) * 100}%"></div>
//                       </div>
//                     ` : ""}
//                   </div>
//                 `).join("")}
//               </div>
//             ` : `<p class="text-gray-500">No skills added yet.</p>`}
//           </div>

//           <!-- Languages -->
//           ${fixMapCalls.languages.length > 0 && fixMapCalls.languages.some(lang => lang.name?.trim()) ? `
//             <div class="mt-3">
//               <p class="text-[22px] ml-5 font-semibold">Languages</p>
//               <div class="grid grid-cols-2 gap-x-8 gap-y-3 ml-5 mt-2">
//                 ${fixMapCalls.languages.filter(lang => lang.name?.trim()).map(lang => `
//                   <div>
//                     <p class="text-sm wrap-break-word text-gray-800 mb-1">${lang.name}</p>
//                     ${lang.level ? `
//                       <div class="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//                         <div class="h-full bg-[#0c0c1e]" style="width: ${(Number(lang.level) / 5) * 100}%"></div>
//                       </div>
//                     ` : ""}
//                   </div>
//                 `).join("")}
//               </div>
//             </div>
//           ` : ""}

//           <!-- Certifications and Licenses -->
//           ${fixMapCalls.certificationsAndLicenses.length > 0 && fixMapCalls.certificationsAndLicenses.some(item =>
//             item.name?.replace(/<[^>]*>/g, "").trim()
//           ) ? `
//             <div class="mt-3">
//               <p class="text-[22px] ml-5 font-semibold">Certifications and Licenses</p>
//               <div class="pt-2 ml-5 pb-2 text-gray-700 text-[15px] wrap-break-word">
//                 ${fixMapCalls.certificationsAndLicenses.filter(item =>
//                   item.name?.replace(/<[^>]*>/g, "").trim()
//                 ).map(item => `
//                   <div>${item.name?.replace(/<[^>]*>/g, "")}</div>
//                 `).join("")}
//               </div>
//             </div>
//           ` : ""}

//           <!-- Hobbies and Interests -->
//           ${fixMapCalls.hobbiesAndInterests.length > 0 && fixMapCalls.hobbiesAndInterests.some(item =>
//             item.name?.replace(/<[^>]*>/g, "").trim()
//           ) ? `
//             <div class="mt-2">
//               <p class="text-[22px] ml-5 font-semibold">Hobbies and Interests</p>
//               <div class="pt-1 pb-1 ml-5 text-gray-700 text-[15px] wrap-break-word">
//                 ${fixMapCalls.hobbiesAndInterests.filter(item =>
//                   item.name?.replace(/<[^>]*>/g, "").trim()
//                 ).map(item => `
//                   <div>${item.name?.replace(/<[^>]*>/g, "")}</div>
//                 `).join("")}
//               </div>
//             </div>
//           ` : ""}

//           <!-- Awards and Honors -->
//           ${fixMapCalls.awardsAndHonors.length > 0 && fixMapCalls.awardsAndHonors.some(item =>
//             item.name?.replace(/<[^>]*>/g, "").trim()
//           ) ? `
//             <div class="mt-2">
//               <h2 class="text-[22px] ml-5 font-semibold">Awards and Honors</h2>
//               <div class="pt-2 ml-5 pb-2 text-gray-700 text-[15px] wrap-break-word">
//                 ${fixMapCalls.awardsAndHonors.filter(item =>
//                   item.name?.replace(/<[^>]*>/g, "").trim()
//                 ).map(item => `
//                   <div>${item.name?.replace(/<[^>]*>/g, "")}</div>
//                 `).join("")}
//               </div>
//             </div>
//           ` : ""}

//           <!-- Websites and Social Media -->
//           ${fixMapCalls.websitesAndSocialMedia.length > 0 && fixMapCalls.websitesAndSocialMedia.some(item =>
//             item.websiteUrl?.trim() || item.socialMedia?.trim()
//           ) ? `
//             <div class="mt-2">
//               <p class="text-[22px] ml-5 font-semibold">Websites and Social Media</p>
//               <div class="pt-1 pb-1 ml-5 text-[15px] text-gray-700 wrap-break-word">
//                 ${fixMapCalls.websitesAndSocialMedia.filter(item =>
//                   item.websiteUrl?.trim() || item.socialMedia?.trim()
//                 ).map(item => `
//                   <div class="mb-2">
//                     ${item.websiteUrl ? `
//                       <div>
//                         <p class="font-semibold text-sm">Website URL:</p>
//                         <a href="${item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`}" target="_blank" rel="noopener noreferrer" class="text-gray-700 underline wrap-break-word text-sm">
//                           ${item.websiteUrl}
//                         </a>
//                       </div>
//                     ` : ""}
//                     ${item.socialMedia ? `
//                       <div class="mt-1">
//                         <p class="font-semibold text-sm">Social Media URL:</p>
//                         <a href="${item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`}" target="_blank" rel="noopener noreferrer" class="text-gray-700 underline wrap-break-word text-sm">
//                           ${item.socialMedia}
//                         </a>
//                       </div>
//                     ` : ""}
//                   </div>
//                 `).join("")}
//               </div>
//             </div>
//           ` : ""}

//           <!-- References -->
//           ${fixMapCalls.references.length > 0 && fixMapCalls.references.some(item =>
//             item.name?.replace(/<[^>]*>/g, "").trim()
//           ) ? `
//             <div class="mt-2">
//               <p class="text-[22px] ml-5 font-semibold">References</p>
//               <div class="pt-1 pb-2 ml-5 text-gray-700 text-[15px] wrap-break-word">
//                 ${fixMapCalls.references.filter(item =>
//                   item.name?.replace(/<[^>]*>/g, "").trim()
//                 ).map(item => `
//                   <div>${item.name?.replace(/<[^>]*>/g, "")}</div>
//                 `).join("")}
//               </div>
//             </div>
//           ` : ""}

//           <!-- Custom Section -->
//           ${fixMapCalls.customSection.length > 0 && fixMapCalls.customSection.some(section =>
//             section?.name?.trim() || section?.description?.trim()
//           ) ? `
//             <div class="mt-3 mb-4">
//               ${fixMapCalls.customSection.filter(section =>
//                 section?.name?.trim() || section?.description?.trim()
//               ).map(section => `
//                 <div class="pb-2">
//                   ${section.name ? `
//                     <p class="text-[20px] font-semibold ml-5 mt-2">${section.name}</p>
//                   ` : ""}
//                   ${section.description ? `
//                     <div class="pt-2 ml-5 pb-2 text-gray-700 text-[15px] wrap-break-word">
//                       ${section.description.replace(/<[^>]*>/g, '')}
//                     </div>
//                   ` : ""}
//                 </div>
//               `).join("")}
//             </div>
//           ` : ""}
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
//         { responseType: "blob" }
//       );

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

//   return (
//     <>
//       {lastSegment === "download-resume" && (
//         <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
//           <button
//             onClick={handleDownload}
//             className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
//           >
//             Download Resume
//           </button>
//         </div>
//       )}
//        <div
//         className="bg-white border border-gray-100 font-nunito mx-auto"
//         style={{
//           width: "210mm",
//           padding: "5mm",
//           boxSizing: "border-box",
//         }}
//       >

//         {/* Header */}
//         <div className="flex justify-between bg-[#878787] h-auto p-1 text-white rounded-2xl">
//           <div className="w-[40%] text-[27px] font-medium p-3 uppercase wrap-break-word">
//             {contact?.firstName || ""} {contact?.lastName || ""}
//             {contact?.jobTitle && (
//               <div className="text-sm font-normal lowercase mt-1">
//                 {getJobTitle(contact.jobTitle)}
//               </div>
//             )}
//             <div className="flex items-center gap-4 pb-2 mt-1">
//               {/* Show LinkedIn only if provided */}
//               {linkedinUrl && linkedinUrl.trim() && (
//                 <a
//                   href={
//                     linkedinUrl.startsWith("http")
//                       ? linkedinUrl
//                       : `https://${linkedinUrl}`
//                   }
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 font-semibold underline text-white text-sm"
//                 >
//                   <p>LinkedIn</p>
//                 </a>
//               )}

//               {/* Show Portfolio only if provided */}
//               {contact?.portfolio && contact.portfolio.trim() && (
//                 <a
//                   href={
//                     contact.portfolio.startsWith("http")
//                       ? contact.portfolio
//                       : `https://${contact.portfolio}`
//                   }
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 font-semibold underline text-white text-sm"
//                 >
//                   <p>Portfolio</p>
//                 </a>
//               )}
//             </div>
//           </div>
//           <div className="w-[60%] p-3 text-[14px]">
//             <p className="text-end wrap-break-word">
//               {contact?.email || ""} • {contact?.phone || ""}
//             </p>
//             <p className="text-end wrap-break-word">
//               {contact?.address || ""}, {contact?.city || ""},{" "}
//              {contact?.postcode || ""}, {contact?.country || ""}
//             </p>
//           </div>
//         </div>

//         {/* Summary */}
//         <div>
//           <p className="text-[22px] ml-5 mt-2 font-semibold">Summary</p>
//           <div
//             className="ml-5 pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word"
//             dangerouslySetInnerHTML={{ __html: summary || "" }}
//           />
//         </div>

//         {/* Experience */}
//         <div>
//           {experiences?.length > 0 ? (
//             experiences.map((exp, index) => (
//               <div key={exp.id || index} className="">
//                 {index === 0 && (
//                   <p className="text-[22px] ml-5 mt-1 font-semibold">Experience</p>
//                 )}
//                 <div className="ml-6 mt-2">
//                   {(exp.jobTitle || exp.employer || exp.location) && (
//                     <h3 className="font-semibold text-gray-900 text-lg wrap-break-word">
//                       {exp.jobTitle && `${exp.jobTitle} `}
//                       {exp.employer && (
//                         <span className="text-gray-500 font-normal">
//                           — {exp.employer}
//                         </span>
//                       )}
//                       {exp.location && (
//                         <span className="text-gray-500 font-normal">
//                           — {exp.location}
//                         </span>
//                       )}
//                     </h3>
//                   )}

//                   <div className="text-gray-600 text-sm wrap-break-word mt-1">
//                     <div className="flex items-center gap-2">
//                       {/* START DATE */}
//                       <MonthYearDisplay value={exp.startDate} shortYear={true} />

//                       {/* SHOW "-" ONLY IF BOTH DATES EXIST */}
//                       {exp.startDate && exp.endDate && <span>-</span>}

//                       {/* END DATE */}
//                       {exp.endDate ? (
//                         <MonthYearDisplay value={exp.endDate} shortYear={true} />
//                       ) : (
//                         "Present"
//                       )}
//                     </div>
//                   </div>

//                   <div
//                     className="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word"
//                     dangerouslySetInnerHTML={{ __html: exp.text || "" }}
//                   />
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 wrap-break-word ml-5">No experience added yet.</p>
//           )}
//         </div>

//         {/* Education */}
//         <div>
//           <p className="text-[22px] ml-5 mt-3 font-semibold">Education</p>
//           <div className="ml-6">
//             {educations?.length > 0 ? (
//               educations.map((edu, index) => (
//                 <div key={edu.id || index} className="pb-2 mt-2">
//                   {(edu.schoolname || edu.degree || edu.location) && (
//                     <h3 className="font-semibold wrap-break-word text-gray-900 text-lg">
//                       {edu.schoolname || ""}
//                       {edu.degree && (
//                         <span className="text-gray-500 wrap-break-word font-normal">
//                           {" "}— {edu.degree}
//                         </span>
//                       )}
//                       {edu.location && (
//                         <span className="text-gray-500 wrap-break-word font-normal">
//                           {" "}— {edu.location}
//                         </span>
//                       )}
//                     </h3>
//                   )}

//                   {(edu.startDate || edu.endDate) && (
//                     <p className="text-gray-500 text-sm wrap-break-word mt-1">
//                       {edu.startDate || ""} — {edu.endDate || ""}
//                     </p>
//                   )}

//                   <div
//                     className="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word"
//                     dangerouslySetInnerHTML={{ __html: edu.text || "" }}
//                   />
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 wrap-break-word">No education added yet.</p>
//             )}
//           </div>
//         </div>

//         {/* Skills */}
//         <div className="ml-5 text-[15px] mt-3">
//           <p className="text-[22px] font-semibold">Skills</p>
//           {skills.length > 0 ? (
//             <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-2">
//               {skills.map((skill, index) => (
//                 <div key={skill.id || index}>
//                   <p className="text-sm text-gray-700 font-medium wrap-break-word mb-1">
//                     {skill.skill || ""}
//                   </p>

//                   {/* Show progress bar if level exists */}
//                   {skill.level && (
//                     <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-[#0c0c1e] transition-all duration-300"
//                         style={{
//                           width: `${(Number(skill.level) / 5) * 100}%`,
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No skills added yet.</p>
//           )}
//         </div>

//         {/* Languages */}
//         {fixMapCalls.languages.length > 0 &&
//           fixMapCalls.languages.some(
//             (lang) => lang.name && lang.name.trim() !== "",
//           ) && (
//             <div className="mt-3">
//               <p className="text-[22px] ml-5 font-semibold">Languages</p>
//               <div className="grid grid-cols-2 gap-x-8 gap-y-3 ml-5 mt-2">
//                 {fixMapCalls.languages.map(
//                   (lang, index) =>
//                     lang.name &&
//                     lang.name.trim() !== "" && (
//                       <div key={lang._id || index}>
//                         <p className="text-sm wrap-break-word text-gray-800 mb-1">
//                           {lang.name}
//                         </p>
//                         {lang.level && (
//                           <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//                             <div
//                               className="h-full bg-[#0c0c1e]"
//                               style={{
//                                 width: `${(Number(lang.level) / 5) * 100}%`,
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

//         {/* Certifications and Licenses */}
//         {fixMapCalls.certificationsAndLicenses.length > 0 &&
//           fixMapCalls.certificationsAndLicenses.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="mt-3">
//               <p className="text-[22px] ml-5 font-semibold">
//                 Certifications and Licenses
//               </p>
//               <div className="pt-2 ml-5 pb-2 text-gray-700 text-[15px] wrap-break-word">
//                 {fixMapCalls.certificationsAndLicenses.map(
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

//         {/* Hobbies and Interests */}
//         {fixMapCalls.hobbiesAndInterests.length > 0 &&
//           fixMapCalls.hobbiesAndInterests.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="mt-2">
//               <p className="text-[22px] ml-5 font-semibold">Hobbies and Interests</p>
//               <div className="pt-1 pb-1 ml-5 text-gray-700 text-[15px] wrap-break-word">
//                 {fixMapCalls.hobbiesAndInterests.map(
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

//         {/* Awards and Honors */}
//         {fixMapCalls.awardsAndHonors.length > 0 &&
//           fixMapCalls.awardsAndHonors.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="mt-2">
//               <h2 className="text-[22px] ml-5 font-semibold">Awards and Honors</h2>
//               <div className="pt-2 ml-5 pb-2 text-gray-700 text-[15px] wrap-break-word">
//                 {fixMapCalls.awardsAndHonors.map(
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
//         {fixMapCalls.websitesAndSocialMedia.length > 0 &&
//           fixMapCalls.websitesAndSocialMedia.some(
//             (item) =>
//               (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//               (item.socialMedia && item.socialMedia.trim() !== ""),
//           ) && (
//             <div className="mt-2">
//               <p className="text-[22px] ml-5 font-semibold">
//                 Websites and Social Media
//               </p>
//               <div className="pt-1 pb-1 ml-5 text-[15px] text-gray-700 wrap-break-word">
//                 {fixMapCalls.websitesAndSocialMedia.map(
//                   (item, index) =>
//                     ((item.websiteUrl && item.websiteUrl.trim() !== "") ||
//                       (item.socialMedia && item.socialMedia.trim() !== "")) && (
//                       <div key={item.id || index} className="mb-2">
//                         {item.websiteUrl && (
//                           <div>
//                             <p className="font-semibold text-sm">Website URL:</p>
//                             <a
//                               href={
//                                 item.websiteUrl.startsWith("http")
//                                   ? item.websiteUrl
//                                   : `https://${item.websiteUrl}`
//                               }
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-gray-700 underline wrap-break-word text-sm"
//                             >
//                               {item.websiteUrl}
//                             </a>
//                           </div>
//                         )}
//                         {item.socialMedia && (
//                           <div className="mt-1">
//                             <p className="font-semibold text-sm">Social Media URL:</p>
//                             <a
//                               href={
//                                 item.socialMedia.startsWith("http")
//                                   ? item.socialMedia
//                                   : `https://${item.socialMedia}`
//                               }
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-gray-700 underline wrap-break-word text-sm"
//                             >
//                               {item.socialMedia}
//                             </a>
//                           </div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           )}

//         {/* References */}
//         {fixMapCalls.references.length > 0 &&
//           fixMapCalls.references.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <div className="mt-2">
//               <p className="text-[22px] ml-5 font-semibold">References</p>
//               <div className="pt-1 pb-2 ml-5 text-gray-700 text-[15px] wrap-break-word">
//                 {fixMapCalls.references.map(
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

//         {/* Custom Section */}
//         {fixMapCalls.customSection.length > 0 &&
//           fixMapCalls.customSection.some(
//             (section) => section?.name?.trim() || section?.description?.trim(),
//           ) && (
//             <div className="mt-3 mb-4">
//               {fixMapCalls.customSection
//                 .filter(
//                   (section) =>
//                     section?.name?.trim() || section?.description?.trim(),
//                 )
//                 .map((section, index) => (
//                   <div key={section.id || index} className="pb-2">
//                     {/* Show only content, no heading */}
//                     {section.name && (
//                       <p className="text-[20px] font-semibold ml-5 mt-2">
//                         {section.name}
//                       </p>
//                     )}

//                     {section.description && (
//                       <div
//                         className="pt-2 ml-5 pb-2 text-gray-700 text-[15px] wrap-break-word"
//                         dangerouslySetInnerHTML={{ __html: section.description }}
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

// export default TemplateThree;

// "use client";

// import React, { useContext } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { formatMonthYear } from "@/app/utils";
// import {
//   Contact,
//   Education,
//   Experience,
//   Finalize,
//   Skill,
// } from "@/app/types/context.types";
// import { usePathname } from "next/navigation";

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

// /* ======================================================
//    SHARED CSS — all selectors scoped to .t3-resume so
//    nothing leaks into the rest of the website.
//    No min-height so the PDF never forces a second page.
// ====================================================== */
// const styles = `
//   .t3-resume {
//     width: 210mm;
//     padding: 5mm;
//     box-sizing: border-box;
//     background-color: white;
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//     font-size: 15px;
//     line-height: 1.5;
//     color: #374151;
//   }

//   /* Scoped resets — do NOT affect anything outside .t3-resume */
//   .t3-resume * {
//     box-sizing: border-box;
//     margin: 0;
//     padding: 0;
//   }

//   /* ── HEADER ── */
//   .t3-header {
//     display: flex;
//     justify-content: space-between;
//     background-color: #878787;
//     padding: 4px;
//     border-radius: 16px;
//     color: white;
//   }

//   .t3-header-left {
//     width: 40%;
//     font-size: 27px;
//     font-weight: 500;
//     padding: 12px;
//     text-transform: uppercase;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t3-header-job {
//     font-size: 14px;
//     font-weight: 400;
//     text-transform: lowercase;
//     margin-top: 4px;
//   }

//   .t3-header-links {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     padding-bottom: 8px;
//     margin-top: 4px;
//   }

//   .t3-header-link {
//     font-size: 14px;
//     font-weight: 600;
//     text-decoration: underline;
//     color: white;
//   }

//   .t3-header-right {
//     width: 60%;
//     padding: 12px;
//     font-size: 14px;
//   }

//   .t3-header-contact-line {
//     text-align: right;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     margin-bottom: 2px;
//   }

//   /* ── SECTION TITLE ── */
//   .t3-section-title {
//     font-size: 22px;
//     font-weight: 600;
//     margin-left: 20px;
//     margin-top: 10px;
//     margin-bottom: 4px;
//     color: #111827;
//   }

//   /* ── SUMMARY ── */
//   .t3-summary {
//     margin-left: 20px;
//     padding-top: 6px;
//     padding-bottom: 10px;
//     color: #374151;
//     font-size: 15px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── EXPERIENCE / EDUCATION ENTRY ── */
//   .t3-entry {
//     margin-left: 24px;
//     margin-top: 8px;
//     padding-bottom: 6px;
//   }

//   .t3-entry-title {
//     font-size: 18px;
//     font-weight: 600;
//     color: #111827;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t3-entry-title-muted {
//     font-weight: 400;
//     color: #6b7280;
//   }

//   .t3-entry-date {
//     font-size: 14px;
//     color: #4b5563;
//     margin-top: 4px;
//   }

//   .t3-entry-content {
//     padding-top: 6px;
//     padding-bottom: 6px;
//     color: #374151;
//     font-size: 15px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t3-entry-content p  { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//   .t3-entry-content ul { list-style-type: disc   !important; padding-left: 16px !important; margin: 0 !important; }
//   .t3-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
//   .t3-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

//   /* ── SKILLS / LANGUAGES GRID ── */
//   .t3-skills-wrap {
//     margin-left: 20px;
//     margin-top: 8px;
//   }

//   .t3-grid {
//     display: grid;
//     grid-template-columns: repeat(2, 1fr);
//     column-gap: 32px;
//     row-gap: 10px;
//   }

//   .t3-skill-name {
//     font-size: 14px;
//     font-weight: 500;
//     color: #374151;
//     margin-bottom: 3px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   .t3-bar-track {
//     height: 4px;
//     width: 100%;
//     background: #d1d5db;
//     border-radius: 9999px;
//     overflow: hidden;
//   }

//   .t3-bar-fill {
//     height: 100%;
//     background: #0c0c1e;
//     border-radius: 9999px;
//   }

//   /* ── EXTRA SECTIONS (certs, hobbies, awards, refs, custom) ── */
//   .t3-extra {
//     margin-left: 20px;
//     padding-top: 4px;
//     padding-bottom: 6px;
//     color: #374151;
//     font-size: 15px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── WEBSITES ── */
//   .t3-website-item {
//     margin-bottom: 8px;
//   }

//   .t3-website-label {
//     font-size: 14px;
//     font-weight: 600;
//     color: #111827;
//   }

//   .t3-website-link {
//     font-size: 14px;
//     color: #374151;
//     text-decoration: underline;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//   }

//   /* ── PRINT ── */
//   @media print {
//     @page { size: A4; margin: 5mm; }
//     .t3-resume {
//       width: 100% !important;
//       padding: 0 !important;
//       box-shadow: none !important;
//     }
//     .t3-header {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//     .t3-entry { page-break-inside: avoid; break-inside: avoid; }
//     .t3-section-title { page-break-after: avoid; break-after: avoid; }
//   }
// `;

// const TemplateThree: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || context?.contact || ({} as Contact);
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills || context?.skills || [];
//   const finalize = alldata?.finalize || context?.finalize || ({} as Finalize);
//   const summary = alldata?.summary || context?.summary || "";

//   /* Safe array helpers — avoids repeated Array.isArray boilerplate */
//   const languages = Array.isArray(finalize?.languages)
//     ? finalize.languages
//     : [];
//   const certificationsAndLicenses = Array.isArray(
//     finalize?.certificationsAndLicenses,
//   )
//     ? finalize.certificationsAndLicenses
//     : [];
//   const hobbiesAndInterests = Array.isArray(finalize?.hobbiesAndInterests)
//     ? finalize.hobbiesAndInterests
//     : [];
//   const awardsAndHonors = Array.isArray(finalize?.awardsAndHonors)
//     ? finalize.awardsAndHonors
//     : [];
//   const websitesAndSocialMedia = Array.isArray(finalize?.websitesAndSocialMedia)
//     ? finalize.websitesAndSocialMedia
//     : [];
//   const references = Array.isArray(finalize?.references)
//     ? finalize.references
//     : [];
//   const customSection = Array.isArray(finalize?.customSection)
//     ? finalize.customSection
//     : [];

//   const skillPct = (level: number | null | undefined) =>
//     `${((Number(level) || 0) / 5) * 100}%`;

//   const hasText = (v?: string | null) => !!v?.replace(/<[^>]*>/g, "").trim();

//   /* Date helper — uses formatMonthYear if available, otherwise raw string */
//   const fmtDate = (val?: string | null, short = true): string => {
//     if (!val) return "";
//     try {
//       return formatMonthYear(val, short);
//     } catch {
//       return val;
//     }
//   };

//   /* ======================================================
//      HTML GENERATION — mirrors the JSX exactly.
//      Uses the same `styles` string so preview === PDF.
//   ====================================================== */
//   const generateHTML = () => {
//     const addressParts = [
//       contact?.address,
//       contact?.city,
//       contact?.postcode,
//       contact?.country,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <style>
//     /* PDF body reset — safe here, only used in the headless renderer */
//     body { margin: 0; padding: 0; background: white; }
//     ${styles}
//   </style>
// </head>
// <body>
// <div class="t3-resume">

//   <!-- HEADER -->
//   <div class="t3-header">
//     <div class="t3-header-left">
//       ${contact?.firstName || ""} ${contact?.lastName || ""}
//       ${contact?.jobTitle ? `<div class="t3-header-job">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
//       <div class="t3-header-links">
//         ${contact?.linkedin?.trim() ? `<a href="${contact.linkedin.startsWith("http") ? contact.linkedin : `https://${contact.linkedin}`}" class="t3-header-link">LinkedIn</a>` : ""}
//         ${contact?.portfolio?.trim() ? `<a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" class="t3-header-link">Portfolio</a>` : ""}
//       </div>
//     </div>
//     <div class="t3-header-right">
//       <div class="t3-header-contact-line">${[contact?.email, contact?.phone].filter(Boolean).join(" • ")}</div>
//       ${addressParts ? `<div class="t3-header-contact-line">${addressParts}</div>` : ""}
//     </div>
//   </div>

//   <!-- SUMMARY -->
//   ${
//     summary
//       ? `
//   <div class="t3-section-title">Summary</div>
//   <div class="t3-summary">${summary.replace(/<[^>]*>/g, "")}</div>`
//       : ""
//   }

//   <!-- EXPERIENCE -->
//   ${
//     experiences.length > 0
//       ? `
//   <div class="t3-section-title">Experience</div>
//   ${experiences
//     .map((exp) => {
//       const start = fmtDate(exp.startDate);
//       const end = exp.endDate
//         ? fmtDate(exp.endDate)
//         : exp.startDate
//           ? "Present"
//           : "";
//       return `
//   <div class="t3-entry">
//     ${
//       exp.jobTitle || exp.employer || exp.location
//         ? `
//     <div class="t3-entry-title">
//       ${exp.jobTitle ? `${exp.jobTitle} ` : ""}
//       ${exp.employer ? `<span class="t3-entry-title-muted">— ${exp.employer}</span>` : ""}
//       ${exp.location ? `<span class="t3-entry-title-muted">— ${exp.location}</span>` : ""}
//     </div>`
//         : ""
//     }
//     ${start || end ? `<div class="t3-entry-date">${start}${start && end ? " - " : ""}${end}</div>` : ""}
//     ${exp.text ? `<div class="t3-entry-content">${exp.text.replace(/<[^>]*>/g, "")}</div>` : ""}
//   </div>`;
//     })
//     .join("")}`
//       : ""
//   }

//   <!-- EDUCATION -->
//   ${
//     educations.length > 0
//       ? `
//   <div class="t3-section-title">Education</div>
//   ${educations
//     .map(
//       (edu) => `
//   <div class="t3-entry">
//     ${
//       edu.schoolname || edu.degree || edu.location
//         ? `
//     <div class="t3-entry-title">
//       ${edu.schoolname || ""}
//       ${edu.degree ? `<span class="t3-entry-title-muted"> — ${edu.degree}</span>` : ""}
//       ${edu.location ? `<span class="t3-entry-title-muted"> — ${edu.location}</span>` : ""}
//     </div>`
//         : ""
//     }
//     ${edu.startDate || edu.endDate ? `<div class="t3-entry-date">${[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}</div>` : ""}
//     ${edu.text ? `<div class="t3-entry-content">${edu.text.replace(/<[^>]*>/g, "")}</div>` : ""}
//   </div>`,
//     )
//     .join("")}`
//       : ""
//   }

//   <!-- SKILLS -->
//   ${
//     skills.filter((s) => s.skill?.trim()).length > 0
//       ? `
//   <div class="t3-section-title">Skills</div>
//   <div class="t3-skills-wrap">
//     <div class="t3-grid">
//       ${skills
//         .filter((s) => s.skill?.trim())
//         .map(
//           (skill) => `
//       <div>
//         <div class="t3-skill-name">${skill.skill}</div>
//         ${skill.level ? `<div class="t3-bar-track"><div class="t3-bar-fill" style="width:${skillPct(Number(skill.level))}"></div></div>` : ""}
//       </div>`,
//         )
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- LANGUAGES -->
//   ${
//     languages.filter((l) => l.name?.trim()).length > 0
//       ? `
//   <div class="t3-section-title">Languages</div>
//   <div class="t3-skills-wrap">
//     <div class="t3-grid">
//       ${languages
//         .filter((l) => l.name?.trim())
//         .map(
//           (lang) => `
//       <div>
//         <div class="t3-skill-name">${lang.name}</div>
//         ${lang.level ? `<div class="t3-bar-track"><div class="t3-bar-fill" style="width:${skillPct(Number(lang.level))}"></div></div>` : ""}
//       </div>`,
//         )
//         .join("")}
//     </div>
//   </div>`
//       : ""
//   }

//   <!-- CERTIFICATIONS -->
//   ${
//     certificationsAndLicenses.filter((i) => hasText(i.name)).length > 0
//       ? `
//   <div class="t3-section-title">Certifications and Licenses</div>
//   <div class="t3-extra">
//     ${certificationsAndLicenses
//       .filter((i) => hasText(i.name))
//       .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- HOBBIES -->
//   ${
//     hobbiesAndInterests.filter((i) => hasText(i.name)).length > 0
//       ? `
//   <div class="t3-section-title">Hobbies and Interests</div>
//   <div class="t3-extra">
//     ${hobbiesAndInterests
//       .filter((i) => hasText(i.name))
//       .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- AWARDS -->
//   ${
//     awardsAndHonors.filter((i) => hasText(i.name)).length > 0
//       ? `
//   <div class="t3-section-title">Awards and Honors</div>
//   <div class="t3-extra">
//     ${awardsAndHonors
//       .filter((i) => hasText(i.name))
//       .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- WEBSITES -->
//   ${
//     websitesAndSocialMedia.filter(
//       (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
//     ).length > 0
//       ? `
//   <div class="t3-section-title">Websites and Social Media</div>
//   <div class="t3-extra">
//     ${websitesAndSocialMedia
//       .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
//       .map(
//         (i) => `
//     <div class="t3-website-item">
//       ${i.websiteUrl ? `<div class="t3-website-label">Website:</div><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="t3-website-link">${i.websiteUrl}</a>` : ""}
//       ${i.socialMedia ? `<div class="t3-website-label" style="margin-top:4px">Social Media:</div><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="t3-website-link">${i.socialMedia}</a>` : ""}
//     </div>`,
//       )
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- REFERENCES -->
//   ${
//     references.filter((i) => hasText(i.name)).length > 0
//       ? `
//   <div class="t3-section-title">References</div>
//   <div class="t3-extra">
//     ${references
//       .filter((i) => hasText(i.name))
//       .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
//       .join("")}
//   </div>`
//       : ""
//   }

//   <!-- CUSTOM SECTIONS -->
//   ${customSection
//     .filter((s) => s?.name?.trim() || s?.description?.trim())
//     .map(
//       (s) => `
//   ${s.name ? `<div class="t3-section-title">${s.name}</div>` : ""}
//   ${s.description ? `<div class="t3-extra">${s.description.replace(/<[^>]*>/g, "")}</div>` : ""}`,
//     )
//     .join("")}

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
//       const res = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" },
//       );
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
//      JSX PREVIEW — uses exact same CSS classes as generateHTML.
//      min-height only on the wrapper div (screen only),
//      never inside the .t3-resume element so PDF stays 1 page.
//   ====================================================== */
//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postcode,
//     contact?.country,
//   ]
//     .filter(Boolean)
//     .join(", ");

//   return (
//     <>
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
//             className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
//           >
//             Download Resume
//           </button>
//         </div>
//       )}

//       {/* min-height is on THIS wrapper only, not inside .t3-resume */}
//       <div
//         style={{
//           margin: "0 auto",
//           width: "210mm",
//           minHeight: "297mm",
//           boxShadow: "0 0 10px rgba(0,0,0,0.08)",
//         }}
//       >
//         <style>{styles}</style>

//         <div className="t3-resume">
//           {/* HEADER */}
//           <div className="t3-header">
//             <div className="t3-header-left">
//               {contact?.firstName || ""} {contact?.lastName || ""}
//               {contact?.jobTitle && (
//                 <div className="t3-header-job">
//                   {typeof contact.jobTitle === "string"
//                     ? contact.jobTitle
//                     : (contact.jobTitle as any)?.name || ""}
//                 </div>
//               )}
//               <div className="t3-header-links">
//                 {contact?.linkedin?.trim() && (
//                   <a
//                     href={
//                       contact.linkedin.startsWith("http")
//                         ? contact.linkedin
//                         : `https://${contact.linkedin}`
//                     }
//                     target="_blank"
//                     rel="noreferrer"
//                     className="t3-header-link"
//                   >
//                     LinkedIn
//                   </a>
//                 )}
//                 {contact?.portfolio?.trim() && (
//                   <a
//                     href={
//                       contact.portfolio.startsWith("http")
//                         ? contact.portfolio
//                         : `https://${contact.portfolio}`
//                     }
//                     target="_blank"
//                     rel="noreferrer"
//                     className="t3-header-link"
//                   >
//                     Portfolio
//                   </a>
//                 )}
//               </div>
//             </div>
//             <div className="t3-header-right">
//               <div className="t3-header-contact-line">
//                 {[contact?.email, contact?.phone].filter(Boolean).join(" • ")}
//               </div>
//               {addressParts && (
//                 <div className="t3-header-contact-line">{addressParts}</div>
//               )}
//             </div>
//           </div>

//           {/* SUMMARY */}
//           {summary && (
//             <>
//               <div className="t3-section-title">Summary</div>
//               <div
//                 className="t3-summary"
//                 dangerouslySetInnerHTML={{ __html: summary }}
//               />
//             </>
//           )}

//           {/* EXPERIENCE */}
//           {experiences.length > 0 && (
//             <>
//               <div className="t3-section-title">Experience</div>
//               {experiences.map((exp, i) => {
//                 const start = fmtDate(exp.startDate);
//                 const end = exp.endDate
//                   ? fmtDate(exp.endDate)
//                   : exp.startDate
//                     ? "Present"
//                     : "";
//                 return (
//                   <div key={exp.id || i} className="t3-entry">
//                     {(exp.jobTitle || exp.employer || exp.location) && (
//                       <div className="t3-entry-title">
//                         {exp.jobTitle && `${exp.jobTitle} `}
//                         {exp.employer && (
//                           <span className="t3-entry-title-muted">
//                             — {exp.employer}
//                           </span>
//                         )}
//                         {exp.location && (
//                           <span className="t3-entry-title-muted">
//                             — {exp.location}
//                           </span>
//                         )}
//                       </div>
//                     )}
//                     {(start || end) && (
//                       <div className="t3-entry-date">
//                         {start}
//                         {start && end ? " - " : ""}
//                         {end}
//                       </div>
//                     )}
//                     {exp.text && (
//                       <div
//                         className="t3-entry-content"
//                         dangerouslySetInnerHTML={{ __html: exp.text }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </>
//           )}

//           {/* EDUCATION */}
//           {educations.length > 0 && (
//             <>
//               <div className="t3-section-title">Education</div>
//               {educations.map((edu, i) => (
//                 <div key={edu.id || i} className="t3-entry">
//                   {(edu.schoolname || edu.degree || edu.location) && (
//                     <div className="t3-entry-title">
//                       {edu.schoolname || ""}
//                       {edu.degree && (
//                         <span className="t3-entry-title-muted">
//                           {" "}
//                           — {edu.degree}
//                         </span>
//                       )}
//                       {edu.location && (
//                         <span className="t3-entry-title-muted">
//                           {" "}
//                           — {edu.location}
//                         </span>
//                       )}
//                     </div>
//                   )}
//                   {(edu.startDate || edu.endDate) && (
//                     <div className="t3-entry-date">
//                       {[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}
//                     </div>
//                   )}
//                   {edu.text && (
//                     <div
//                       className="t3-entry-content"
//                       dangerouslySetInnerHTML={{ __html: edu.text }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </>
//           )}

//           {/* SKILLS */}
//           {skills.filter((s) => s.skill?.trim()).length > 0 && (
//             <>
//               <div className="t3-section-title">Skills</div>
//               <div className="t3-skills-wrap">
//                 <div className="t3-grid">
//                   {skills
//                     .filter((s) => s.skill?.trim())
//                     .map((skill, i) => (
//                       <div key={skill.id || i}>
//                         <div className="t3-skill-name">{skill.skill}</div>
//                         {skill.level && (
//                           <div className="t3-bar-track">
//                             <div
//                               className="t3-bar-fill"
//                               style={{ width: skillPct(Number(skill.level)) }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             </>
//           )}

//           {/* LANGUAGES */}
//           {languages.filter((l) => l.name?.trim()).length > 0 && (
//             <>
//               <div className="t3-section-title">Languages</div>
//               <div className="t3-skills-wrap">
//                 <div className="t3-grid">
//                   {languages
//                     .filter((l) => l.name?.trim())
//                     .map((lang, i) => (
//                       <div key={(lang as any)._id || i}>
//                         <div className="t3-skill-name">{lang.name}</div>
//                         {lang.level && (
//                           <div className="t3-bar-track">
//                             <div
//                               className="t3-bar-fill"
//                               style={{ width: skillPct(Number(lang.level)) }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             </>
//           )}

//           {/* CERTIFICATIONS */}
//           {certificationsAndLicenses.filter((i) => hasText(i.name)).length >
//             0 && (
//             <>
//               <div className="t3-section-title">
//                 Certifications and Licenses
//               </div>
//               <div className="t3-extra">
//                 {certificationsAndLicenses
//                   .filter((i) => hasText(i.name))
//                   .map((item, i) => (
//                     <div
//                       key={(item as any).id || i}
//                       dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                     />
//                   ))}
//               </div>
//             </>
//           )}

//           {/* HOBBIES */}
//           {hobbiesAndInterests.filter((i) => hasText(i.name)).length > 0 && (
//             <>
//               <div className="t3-section-title">Hobbies and Interests</div>
//               <div className="t3-extra">
//                 {hobbiesAndInterests
//                   .filter((i) => hasText(i.name))
//                   .map((item, i) => (
//                     <div
//                       key={(item as any).id || i}
//                       dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                     />
//                   ))}
//               </div>
//             </>
//           )}

//           {/* AWARDS */}
//           {awardsAndHonors.filter((i) => hasText(i.name)).length > 0 && (
//             <>
//               <div className="t3-section-title">Awards and Honors</div>
//               <div className="t3-extra">
//                 {awardsAndHonors
//                   .filter((i) => hasText(i.name))
//                   .map((item, i) => (
//                     <div
//                       key={(item as any).id || i}
//                       dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                     />
//                   ))}
//               </div>
//             </>
//           )}

//           {/* WEBSITES */}
//           {websitesAndSocialMedia.filter(
//             (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
//           ).length > 0 && (
//             <>
//               <div className="t3-section-title">Websites and Social Media</div>
//               <div className="t3-extra">
//                 {websitesAndSocialMedia
//                   .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
//                   .map((item, i) => (
//                     <div
//                       key={(item as any).id || i}
//                       className="t3-website-item"
//                     >
//                       {item.websiteUrl && (
//                         <div>
//                           <div className="t3-website-label">Website:</div>
//                           <a
//                             href={
//                               item.websiteUrl.startsWith("http")
//                                 ? item.websiteUrl
//                                 : `https://${item.websiteUrl}`
//                             }
//                             target="_blank"
//                             rel="noreferrer"
//                             className="t3-website-link"
//                           >
//                             {item.websiteUrl}
//                           </a>
//                         </div>
//                       )}
//                       {item.socialMedia && (
//                         <div style={{ marginTop: "4px" }}>
//                           <div className="t3-website-label">Social Media:</div>
//                           <a
//                             href={
//                               item.socialMedia.startsWith("http")
//                                 ? item.socialMedia
//                                 : `https://${item.socialMedia}`
//                             }
//                             target="_blank"
//                             rel="noreferrer"
//                             className="t3-website-link"
//                           >
//                             {item.socialMedia}
//                           </a>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             </>
//           )}

//           {/* REFERENCES */}
//           {references.filter((i) => hasText(i.name)).length > 0 && (
//             <>
//               <div className="t3-section-title">References</div>
//               <div className="t3-extra">
//                 {references
//                   .filter((i) => hasText(i.name))
//                   .map((item, i) => (
//                     <div
//                       key={(item as any).id || i}
//                       dangerouslySetInnerHTML={{ __html: item.name || "" }}
//                     />
//                   ))}
//               </div>
//             </>
//           )}

//           {/* CUSTOM SECTIONS */}
//           {customSection
//             .filter((s) => s?.name?.trim() || s?.description?.trim())
//             .map((section, i) => (
//               <div key={(section as any).id || i}>
//                 {section.name && (
//                   <div className="t3-section-title">{section.name}</div>
//                 )}
//                 {section.description && (
//                   <div
//                     className="t3-extra"
//                     dangerouslySetInnerHTML={{ __html: section.description }}
//                   />
//                 )}
//               </div>
//             ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateThree;

"use client";

import React, { useContext } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import { formatMonthYear } from "@/app/utils";
import {
  Contact,
  Education,
  Experience,
  Finalize,
  ResumeProps,
  Skill,
} from "@/app/types/context.types";
import { usePathname } from "next/navigation";

/* ======================================================
   SHARED CSS
   ROOT CAUSE FIX: The unequal skill bar widths were caused
   by scattered, inconsistent margin-left values on children:
     .t3-section-title  → margin-left: 20px
     .t3-entry          → margin-left: 24px  (different!)
     .t3-summary        → margin-left: 20px
     .t3-skills-wrap    → margin-left: 20px + margin-right: 20px
     .t3-extra          → margin-left: 20px

   When the grid sat inside .t3-skills-wrap with its own
   margin-left, the 1fr columns were calculated from a
   different origin than the section title above them,
   causing the right column bar to appear shorter.

   FIX: Remove ALL margin-left from every child.
   Wrap everything in a single .t3-body { padding: 0 20px }.
   Now every element — titles, entries, grid columns — shares
   one identical left/right boundary. Both 1fr columns are
   truly equal width and align perfectly with all other content.
====================================================== */
const styles = `
  .t3-resume {
    width: 210mm;
    padding: 5mm;
    box-sizing: border-box;
    background-color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 15px;
    line-height: 1.5;
    color: #374151;
  }

    .t3-resume.is-preview {
    scale: 0.3;
    max-height: 297mm;
    overflow: hidden;
    transform-origin: top left; /* Ensures it scales from the corner */
}

  .t3-resume * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Single source of truth for all horizontal indentation */
  .t3-body {
    padding: 0 20px;
  }

  /* ── HEADER ── */
  .t3-header {
    display: flex;
    justify-content: space-between;
    background-color: #878787;
    padding: 4px;
    border-radius: 16px;
    color: white;
  }

  .t3-header-left {
    width: 40%;
    font-size: 27px;
    font-weight: 500;
    padding: 12px;
    text-transform: uppercase;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t3-header-job {
    font-size: 14px;
    font-weight: 400;
    text-transform: lowercase;
    margin-top: 4px;
  }

  .t3-header-links {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-bottom: 8px;
    margin-top: 4px;
  }

  .t3-header-link {
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
    color: white;
  }

  .t3-header-right {
    width: 60%;
    padding: 12px;
    font-size: 14px;
  }

  .t3-header-contact-line {
    text-align: right;
    word-wrap: break-word;
    overflow-wrap: break-word;
    margin-bottom: 2px;
  }

  /* ── SECTION TITLE — no margin-left (handled by .t3-body) ── */
  .t3-section-title {
    font-size: 22px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 4px;
    color: #111827;
  }

  /* ── SUMMARY — no margin-left ── */
  .t3-summary {
    padding-top: 6px;
    padding-bottom: 10px;
    color: #374151;
    font-size: 15px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* ── ENTRY — no margin-left ── */
  .t3-entry {
    margin-top: 8px;
    padding-bottom: 6px;
  }

  .t3-entry-title {
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t3-entry-title-muted {
    font-weight: 400;
    color: #6b7280;
  }

  .t3-entry-date {
    font-size: 14px;
    color: #4b5563;
    margin-top: 4px;
  }

  .t3-entry-content {
    padding-top: 6px;
    padding-bottom: 6px;
    color: #374151;
    font-size: 15px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t3-entry-content p  { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
  .t3-entry-content ul { list-style-type: disc   !important; padding-left: 16px !important; margin: 0 !important; }
  .t3-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 0 !important; }
  .t3-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; margin-bottom: 1px !important; }

  /* ── SKILLS GRID — no margin, sits flush inside .t3-body ── */
  .t3-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 24px;
    row-gap: 10px;
    margin-top: 8px;
  }

  .t3-grid > div {
    min-width: 0;
  }

  .t3-skill-name {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 3px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t3-bar-track {
    height: 4px;
    width: 100%;
    background: #d1d5db;
    border-radius: 9999px;
    overflow: hidden;
  }

  .t3-bar-fill {
    height: 100%;
    background: #0c0c1e;
    border-radius: 9999px;
  }

  /* ── EXTRA SECTIONS — no margin-left ── */
  .t3-extra {
    padding-top: 4px;
    padding-bottom: 6px;
    color: #374151;
    font-size: 15px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* ── WEBSITES ── */
  .t3-website-item {
    margin-bottom: 8px;
  }

  .t3-website-label {
    font-size: 14px;
    font-weight: 600;
    color: #111827;
  }

  .t3-website-link {
    font-size: 14px;
    color: #374151;
    text-decoration: underline;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* ── PRINT ── */
  @media print {
    @page { size: A4; margin: 5mm; }
    .t3-resume {
      width: 100% !important;
      padding: 0 !important;
      box-shadow: none !important;
    }
    .t3-header {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .t3-entry { page-break-inside: avoid; break-inside: avoid; }
    .t3-section-title { page-break-after: avoid; break-after: avoid; }
  }
`;

const TemplateThree: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const contact = alldata?.contact || context?.contact || ({} as Contact);
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills || context?.skills || [];
  const finalize = alldata?.finalize || context?.finalize || ({} as Finalize);
  const summary = alldata?.summary || context?.summary || "";

  const languages = Array.isArray(finalize?.languages)
    ? finalize.languages
    : [];
  const certificationsAndLicenses = Array.isArray(
    finalize?.certificationsAndLicenses,
  )
    ? finalize.certificationsAndLicenses
    : [];
  const hobbiesAndInterests = Array.isArray(finalize?.hobbiesAndInterests)
    ? finalize.hobbiesAndInterests
    : [];
  const awardsAndHonors = Array.isArray(finalize?.awardsAndHonors)
    ? finalize.awardsAndHonors
    : [];
  const websitesAndSocialMedia = Array.isArray(finalize?.websitesAndSocialMedia)
    ? finalize.websitesAndSocialMedia
    : [];
  const references = Array.isArray(finalize?.references)
    ? finalize.references
    : [];
  const customSection = Array.isArray(finalize?.customSection)
    ? finalize.customSection
    : [];

  const skillPct = (level: number | null | undefined) =>
    `${((Number(level) || 0) / 5) * 100}%`;

  const hasText = (v?: string | null) => !!v?.replace(/<[^>]*>/g, "").trim();

  const fmtDate = (val?: string | null, short = true): string => {
    if (!val) return "";
    try {
      return formatMonthYear(val, short);
    } catch {
      return val;
    }
  };

  /* ======================================================
     HTML GENERATION — same styles string, preview === PDF
  ====================================================== */
  const generateHTML = () => {
    const addressParts = [
      contact?.address,
      contact?.city,
      contact?.postcode,
      contact?.country,
    ]
      .filter(Boolean)
      .join(", ");

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <style>
    body { margin: 0; padding: 0; background: white; }
    ${styles}
  </style>
</head>
<body>
<div class="t3-resume">

  <!-- HEADER -->
  <div class="t3-header">
    <div class="t3-header-left">
      ${contact?.firstName || ""} ${contact?.lastName || ""}
      ${contact?.jobTitle ? `<div class="t3-header-job">${typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || ""}</div>` : ""}
      <div class="t3-header-links">
        ${contact?.linkedin?.trim() ? `<a href="${contact.linkedin.startsWith("http") ? contact.linkedin : `https://${contact.linkedin}`}" class="t3-header-link">LinkedIn</a>` : ""}
        ${contact?.portfolio?.trim() ? `<a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" class="t3-header-link">Portfolio</a>` : ""}
      </div>
    </div>
    <div class="t3-header-right">
      <div class="t3-header-contact-line">${[contact?.email, contact?.phone].filter(Boolean).join(" • ")}</div>
      ${addressParts ? `<div class="t3-header-contact-line">${addressParts}</div>` : ""}
    </div>
  </div>

  <div class="t3-body">

    ${
      summary
        ? `
    <div class="t3-section-title">Summary</div>
    <div class="t3-summary">${summary.replace(/<[^>]*>/g, "")}</div>`
        : ""
    }

    ${
      experiences.length > 0
        ? `
    <div class="t3-section-title">Experience</div>
    ${experiences
      .map((exp) => {
        const start = fmtDate(exp.startDate);
        const end = exp.endDate
          ? fmtDate(exp.endDate)
          : exp.startDate
            ? "Present"
            : "";
        return `
    <div class="t3-entry">
      ${
        exp.jobTitle || exp.employer || exp.location
          ? `
      <div class="t3-entry-title">
        ${exp.jobTitle ? `${exp.jobTitle} ` : ""}
        ${exp.employer ? `<span class="t3-entry-title-muted">— ${exp.employer}</span>` : ""}
        ${exp.location ? `<span class="t3-entry-title-muted">— ${exp.location}</span>` : ""}
      </div>`
          : ""
      }
      ${start || end ? `<div class="t3-entry-date">${start}${start && end ? " - " : ""}${end}</div>` : ""}
      ${exp.text ? `<div class="t3-entry-content">${exp.text.replace(/<[^>]*>/g, "")}</div>` : ""}
    </div>`;
      })
      .join("")}`
        : ""
    }

    ${
      educations.length > 0
        ? `
    <div class="t3-section-title">Education</div>
    ${educations
      .map(
        (edu) => `
    <div class="t3-entry">
      ${
        edu.schoolname || edu.degree || edu.location
          ? `
      <div class="t3-entry-title">
        ${edu.schoolname || ""}
        ${edu.degree ? `<span class="t3-entry-title-muted"> — ${edu.degree}</span>` : ""}
        ${edu.location ? `<span class="t3-entry-title-muted"> — ${edu.location}</span>` : ""}
      </div>`
          : ""
      }
      ${edu.startDate || edu.endDate ? `<div class="t3-entry-date">${[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}</div>` : ""}
      ${edu.text ? `<div class="t3-entry-content">${edu.text.replace(/<[^>]*>/g, "")}</div>` : ""}
    </div>`,
      )
      .join("")}`
        : ""
    }

    ${
      skills.filter((s) => s.skill?.trim()).length > 0
        ? `
    <div class="t3-section-title">Skills</div>
    <div class="t3-grid">
      ${skills
        .filter((s) => s.skill?.trim())
        .map(
          (skill) => `
      <div>
        <div class="t3-skill-name">${skill.skill}</div>
        ${skill.level ? `<div class="t3-bar-track"><div class="t3-bar-fill" style="width:${skillPct(Number(skill.level))}"></div></div>` : ""}
      </div>`,
        )
        .join("")}
    </div>`
        : ""
    }

    ${
      languages.filter((l) => l.name?.trim()).length > 0
        ? `
    <div class="t3-section-title">Languages</div>
    <div class="t3-grid">
      ${languages
        .filter((l) => l.name?.trim())
        .map(
          (lang) => `
      <div>
        <div class="t3-skill-name">${lang.name}</div>
        ${lang.level ? `<div class="t3-bar-track"><div class="t3-bar-fill" style="width:${skillPct(Number(lang.level))}"></div></div>` : ""}
      </div>`,
        )
        .join("")}
    </div>`
        : ""
    }

    ${
      certificationsAndLicenses.filter((i) => hasText(i.name)).length > 0
        ? `
    <div class="t3-section-title">Certifications and Licenses</div>
    <div class="t3-extra">
      ${certificationsAndLicenses
        .filter((i) => hasText(i.name))
        .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
        .join("")}
    </div>`
        : ""
    }

    ${
      hobbiesAndInterests.filter((i) => hasText(i.name)).length > 0
        ? `
    <div class="t3-section-title">Hobbies and Interests</div>
    <div class="t3-extra">
      ${hobbiesAndInterests
        .filter((i) => hasText(i.name))
        .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
        .join("")}
    </div>`
        : ""
    }

    ${
      awardsAndHonors.filter((i) => hasText(i.name)).length > 0
        ? `
    <div class="t3-section-title">Awards and Honors</div>
    <div class="t3-extra">
      ${awardsAndHonors
        .filter((i) => hasText(i.name))
        .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
        .join("")}
    </div>`
        : ""
    }

    ${
      websitesAndSocialMedia.filter(
        (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
      ).length > 0
        ? `
    <div class="t3-section-title">Websites and Social Media</div>
    <div class="t3-extra">
      ${websitesAndSocialMedia
        .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
        .map(
          (i) => `
      <div class="t3-website-item">
        ${i.websiteUrl ? `<div class="t3-website-label">Website:</div><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="t3-website-link">${i.websiteUrl}</a>` : ""}
        ${i.socialMedia ? `<div class="t3-website-label" style="margin-top:4px">Social Media:</div><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="t3-website-link">${i.socialMedia}</a>` : ""}
      </div>`,
        )
        .join("")}
    </div>`
        : ""
    }

    ${
      references.filter((i) => hasText(i.name)).length > 0
        ? `
    <div class="t3-section-title">References</div>
    <div class="t3-extra">
      ${references
        .filter((i) => hasText(i.name))
        .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
        .join("")}
    </div>`
        : ""
    }

    ${customSection
      .filter((s) => s?.name?.trim() || s?.description?.trim())
      .map(
        (s) => `
    ${s.name ? `<div class="t3-section-title">${s.name}</div>` : ""}
    ${s.description ? `<div class="t3-extra">${s.description.replace(/<[^>]*>/g, "")}</div>` : ""}`,
      )
      .join("")}

  </div>
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
     JSX PREVIEW
  ====================================================== */
  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.postcode,
    contact?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      {lastSegment === "download-resume" && (
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={handleDownload}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Download Resume
          </button>
        </div>
      )}

      {/* minHeight on outer wrapper only — never inside .t3-resume so PDF stays 1 page */}
      <div
        style={{
          margin: "0 auto",
          width: "210mm",
          minHeight: "297mm",
          boxShadow: "0 0 10px rgba(0,0,0,0.08)",
          backgroundColor: "white",
        }}
      >
        <style>{styles}</style>

        <div        className={`t3-resume bg-white ${alldata ? 'is-preview' : ''}`}
>
          {/* HEADER */}
          <div className="t3-header">
            <div className="t3-header-left">
              {contact?.firstName || ""} {contact?.lastName || ""}
              {contact?.jobTitle && (
                <div className="t3-header-job">
                  {typeof contact.jobTitle === "string"
                    ? contact.jobTitle
                    : (contact.jobTitle as any)?.name || ""}
                </div>
              )}
              <div className="t3-header-links">
                {contact?.linkedin?.trim() && (
                  <a
                    href={
                      contact.linkedin.startsWith("http")
                        ? contact.linkedin
                        : `https://${contact.linkedin}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="t3-header-link"
                  >
                    LinkedIn
                  </a>
                )}
                {contact?.portfolio?.trim() && (
                  <a
                    href={
                      contact.portfolio.startsWith("http")
                        ? contact.portfolio
                        : `https://${contact.portfolio}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="t3-header-link"
                  >
                    Portfolio
                  </a>
                )}
              </div>
            </div>
            <div className="t3-header-right">
              <div className="t3-header-contact-line">
                {[contact?.email, contact?.phone].filter(Boolean).join(" • ")}
              </div>
              {addressParts && (
                <div className="t3-header-contact-line">{addressParts}</div>
              )}
            </div>
          </div>

          {/* ALL BODY CONTENT — single .t3-body, no margin-left on any child */}
          <div className="t3-body">
            {summary && (
              <>
                <div className="t3-section-title">Summary</div>
                <div
                  className="t3-summary"
                  dangerouslySetInnerHTML={{ __html: summary }}
                />
              </>
            )}

            {experiences.length > 0 && (
              <>
                <div className="t3-section-title">Experience</div>
                {experiences.map((exp, i) => {
                  const start = fmtDate(exp.startDate);
                  const end = exp.endDate
                    ? fmtDate(exp.endDate)
                    : exp.startDate
                      ? "Present"
                      : "";
                  return (
                    <div key={exp.id || i} className="t3-entry">
                      {(exp.jobTitle || exp.employer || exp.location) && (
                        <div className="t3-entry-title">
                          {exp.jobTitle && `${exp.jobTitle} `}
                          {exp.employer && (
                            <span className="t3-entry-title-muted">
                              — {exp.employer}
                            </span>
                          )}
                          {exp.location && (
                            <span className="t3-entry-title-muted">
                              — {exp.location}
                            </span>
                          )}
                        </div>
                      )}
                      {(start || end) && (
                        <div className="t3-entry-date">
                          {start}
                          {start && end ? " - " : ""}
                          {end}
                        </div>
                      )}
                      {exp.text && (
                        <div
                          className="t3-entry-content"
                          dangerouslySetInnerHTML={{ __html: exp.text }}
                        />
                      )}
                    </div>
                  );
                })}
              </>
            )}

            {educations.length > 0 && (
              <>
                <div className="t3-section-title">Education</div>
                {educations.map((edu, i) => (
                  <div key={edu.id || i} className="t3-entry">
                    {(edu.schoolname || edu.degree || edu.location) && (
                      <div className="t3-entry-title">
                        {edu.schoolname || ""}
                        {edu.degree && (
                          <span className="t3-entry-title-muted">
                            {" "}
                            — {edu.degree}
                          </span>
                        )}
                        {edu.location && (
                          <span className="t3-entry-title-muted">
                            {" "}
                            — {edu.location}
                          </span>
                        )}
                      </div>
                    )}
                    {(edu.startDate || edu.endDate) && (
                      <div className="t3-entry-date">
                        {[edu.startDate, edu.endDate]
                          .filter(Boolean)
                          .join(" — ")}
                      </div>
                    )}
                    {edu.text && (
                      <div
                        className="t3-entry-content"
                        dangerouslySetInnerHTML={{ __html: edu.text }}
                      />
                    )}
                  </div>
                ))}
              </>
            )}

            {skills.filter((s) => s.skill?.trim()).length > 0 && (
              <>
                <div className="t3-section-title">Skills</div>
                <div className="t3-grid">
                  {skills
                    .filter((s) => s.skill?.trim())
                    .map((skill, i) => (
                      <div key={skill.id || i}>
                        <div className="t3-skill-name">{skill.skill}</div>
                        {skill.level && (
                          <div className="t3-bar-track">
                            <div
                              className="t3-bar-fill"
                              style={{ width: skillPct(Number(skill.level)) }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </>
            )}

            {languages.filter((l) => l.name?.trim()).length > 0 && (
              <>
                <div className="t3-section-title">Languages</div>
                <div className="t3-grid">
                  {languages
                    .filter((l) => l.name?.trim())
                    .map((lang, i) => (
                      <div key={(lang as any)._id || i}>
                        <div className="t3-skill-name">{lang.name}</div>
                        {lang.level && (
                          <div className="t3-bar-track">
                            <div
                              className="t3-bar-fill"
                              style={{ width: skillPct(Number(lang.level)) }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </>
            )}

            {certificationsAndLicenses.filter((i) => hasText(i.name)).length >
              0 && (
              <>
                <div className="t3-section-title">
                  Certifications and Licenses
                </div>
                <div className="t3-extra">
                  {certificationsAndLicenses
                    .filter((i) => hasText(i.name))
                    .map((item, i) => (
                      <div
                        key={(item as any).id || i}
                        dangerouslySetInnerHTML={{ __html: item.name || "" }}
                      />
                    ))}
                </div>
              </>
            )}

            {hobbiesAndInterests.filter((i) => hasText(i.name)).length > 0 && (
              <>
                <div className="t3-section-title">Hobbies and Interests</div>
                <div className="t3-extra">
                  {hobbiesAndInterests
                    .filter((i) => hasText(i.name))
                    .map((item, i) => (
                      <div
                        key={(item as any).id || i}
                        dangerouslySetInnerHTML={{ __html: item.name || "" }}
                      />
                    ))}
                </div>
              </>
            )}

            {awardsAndHonors.filter((i) => hasText(i.name)).length > 0 && (
              <>
                <div className="t3-section-title">Awards and Honors</div>
                <div className="t3-extra">
                  {awardsAndHonors
                    .filter((i) => hasText(i.name))
                    .map((item, i) => (
                      <div
                        key={(item as any).id || i}
                        dangerouslySetInnerHTML={{ __html: item.name || "" }}
                      />
                    ))}
                </div>
              </>
            )}

            {websitesAndSocialMedia.filter(
              (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
            ).length > 0 && (
              <>
                <div className="t3-section-title">
                  Websites and Social Media
                </div>
                <div className="t3-extra">
                  {websitesAndSocialMedia
                    .filter(
                      (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
                    )
                    .map((item, i) => (
                      <div
                        key={(item as any).id || i}
                        className="t3-website-item"
                      >
                        {item.websiteUrl && (
                          <div>
                            <div className="t3-website-label">Website:</div>
                            <a
                              href={
                                item.websiteUrl.startsWith("http")
                                  ? item.websiteUrl
                                  : `https://${item.websiteUrl}`
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="t3-website-link"
                            >
                              {item.websiteUrl}
                            </a>
                          </div>
                        )}
                        {item.socialMedia && (
                          <div style={{ marginTop: "4px" }}>
                            <div className="t3-website-label">
                              Social Media:
                            </div>
                            <a
                              href={
                                item.socialMedia.startsWith("http")
                                  ? item.socialMedia
                                  : `https://${item.socialMedia}`
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="t3-website-link"
                            >
                              {item.socialMedia}
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </>
            )}

            {references.filter((i) => hasText(i.name)).length > 0 && (
              <>
                <div className="t3-section-title">References</div>
                <div className="t3-extra">
                  {references
                    .filter((i) => hasText(i.name))
                    .map((item, i) => (
                      <div
                        key={(item as any).id || i}
                        dangerouslySetInnerHTML={{ __html: item.name || "" }}
                      />
                    ))}
                </div>
              </>
            )}

            {customSection
              .filter((s) => s?.name?.trim() || s?.description?.trim())
              .map((section, i) => (
                <div key={(section as any).id || i}>
                  {section.name && (
                    <div className="t3-section-title">{section.name}</div>
                  )}
                  {section.description && (
                    <div
                      className="t3-extra"
                      dangerouslySetInnerHTML={{ __html: section.description }}
                    />
                  )}
                </div>
              ))}
          </div>
          {/* end .t3-body */}
        </div>
      </div>
    </>
  );
};

export default TemplateThree;
