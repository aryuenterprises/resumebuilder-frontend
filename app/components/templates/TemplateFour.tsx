// "use client";

// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// // import MonthYearDisplay from "@/app/utils/MonthYearDisplay";
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

// const TemplateFour: React.FC<ResumeProps> = ({ alldata }) => {

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

//     if (typeof jobTitle === "string") {
//       return jobTitle;
//     }

//     if (typeof jobTitle === "object" && jobTitle !== null) {
//       return (jobTitle as any)?.name || (jobTitle as any)?.label || "";
//     }

//     return "";
//   };

//   // Type guard for FinalizeData
//   const isFinalizeData = (data: any): data is Finalize => {
//     return data && typeof data === "object" && !Array.isArray(data);
//   };

//   // Fix typo in map function calls
//   const fixMapCalls = {
//     languages:
//       isFinalizeData(finalize) && Array.isArray(finalize.languages)
//         ? finalize.languages
//         : [],
//     certificationsAndLicenses:
//       isFinalizeData(finalize) &&
//       Array.isArray(finalize.certificationsAndLicenses)
//         ? finalize.certificationsAndLicenses
//         : [],
//     hobbiesAndInterests:
//       isFinalizeData(finalize) && Array.isArray(finalize.hobbiesAndInterests)
//         ? finalize.hobbiesAndInterests
//         : [],
//     awardsAndHonors:
//       isFinalizeData(finalize) && Array.isArray(finalize.awardsAndHonors)
//         ? finalize.awardsAndHonors
//         : [],
//     websitesAndSocialMedia:
//       isFinalizeData(finalize) && Array.isArray(finalize.websitesAndSocialMedia)
//         ? finalize.websitesAndSocialMedia
//         : [],
//     references:
//       isFinalizeData(finalize) && Array.isArray(finalize.references)
//         ? finalize.references
//         : [],
//     customSection:
//       isFinalizeData(finalize) && Array.isArray(finalize.customSection)
//         ? finalize.customSection
//         : [],
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
//         <script src="https://cdn.tailwindcss.com"></script>
//         <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">
//         <style>
//           body { font-family: 'Nunito', sans-serif; }
//           .wrap-break-word { word-wrap: break-word; overflow-wrap: break-word; }
//           @media print {
//             body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//           }
//         </style>
//       </head>
//       <body class="bg-white">
//         <div class="t4-resume  bg-white border border-gray-100 font-nunito mx-auto" style="width: 210mm; padding: 5mm; box-sizing: border-box; margin: 0 auto;">
//           <!-- Header -->
//           <div class="text-center font-bold mt-1 mb-2">
//             <p class="text-[27px] uppercase">
//               ${contact?.firstName || ""} ${contact?.lastName || ""}
//             </p>
//             ${contact?.jobTitle ? `
//               <p class="text-[12px] font-normal mt-1">
//                 ${getJobTitle(contact.jobTitle)}
//               </p>
//             ` : ""}
//             <div class="flex justify-center items-center gap-4 mb-1">
//               ${linkedinUrl && linkedinUrl.trim() ? `
//                 <a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 font-semibold underline text-black text-[13px]">
//                   <p>LinkedIn</p>
//                 </a>
//               ` : ""}
//               ${contact?.portfolio && contact.portfolio.trim() ? `
//                 <a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 font-semibold underline text-black text-[13px]">
//                   <p>Portfolio</p>
//                 </a>
//               ` : ""}
//             </div>
//           </div>

//           <hr class="border-2 border-black" />

//           <div class="flex justify-center gap-1 text-[13px] p-1 flex-wrap">
//             <p>
//               ${contact?.address || ""}, ${contact?.city || ""}, ${contact?.country || ""}, ${contact?.postcode || ""}
//             </p>
//             ${contact?.phone ? `<p> • ${contact.phone}</p>` : ""}
//             ${contact?.email ? `<p> • ${contact.email}</p>` : ""}
//           </div>

//           <!-- Summary -->
//           ${summary ? `
//             <div class="mt-3">
//               <p class="text-[17px] font-bold">Summary</p>
//               <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
//                 ${summary.replace(/<[^>]*>/g, "")}
//               </div>
//             </div>
//           ` : ""}

//           <!-- Experience -->
//           <div class="mt-2">
//             ${experiences?.length > 0 ? `
//               <p class="text-[17px] font-bold">Experience</p>
//               ${experiences.map((exp, index) => `
//                 <div key="${exp.id || index}" class="mb-4">
//                   ${(exp.jobTitle || exp.employer || exp.location) ? `
//                     <h3 class="font-semibold text-gray-900 wrap-break-word text-base mt-1">
//                       ${exp.jobTitle || ""}
//                       ${exp.employer ? `<span class="text-gray-500 font-normal"> — ${exp.employer}</span>` : ""}
//                       ${exp.location ? `<span class="text-gray-500 font-normal"> — ${exp.location}</span>` : ""}
//                     </h3>
//                   ` : ""}

//                   <div class="text-gray-600 text-sm mt-1">
//                     <div class="flex items-center gap-2">
//                       ${exp.startDate || ""}
//                       ${exp.startDate && exp.endDate ? `<span>-</span>` : ""}
//                       ${exp.endDate ? exp.endDate : exp.startDate ? "Present" : ""}
//                     </div>
//                   </div>

//                   ${exp.text ? `
//                     <div class="pt-2 ml-6 pb-2 text-gray-700 text-[15px] wrap-break-word">
//                       ${exp.text.replace(/<[^>]*>/g, "")}
//                     </div>
//                   ` : ""}
//                 </div>
//               `).join("")}
//             ` : `<p class="text-gray-500">No experience added yet.</p>`}
//           </div>

//           <!-- Education -->
//           <div class="mt-3">
//             <p class="text-[17px] font-bold">Education</p>
//             <div>
//               ${educations?.length > 0 ? educations.map((edu, index) => `
//                 <div key="${edu.id || index}" class="mb-3">
//                   ${(edu.schoolname || edu.degree || edu.location) ? `
//                     <h3 class="font-semibold text-gray-900 wrap-break-word text-base mt-1">
//                       ${edu.schoolname || ""}
//                       ${edu.degree ? `<span class="text-gray-500 font-normal"> — ${edu.degree}</span>` : ""}
//                       ${edu.location ? `<span class="text-gray-500 font-normal"> — ${edu.location}</span>` : ""}
//                     </h3>
//                   ` : ""}

//                   ${(edu.startDate || edu.endDate) ? `
//                     <p class="text-gray-600 text-sm wrap-break-word mt-1">
//                       ${edu.startDate || ""} — ${edu.endDate || ""}
//                     </p>
//                   ` : ""}

//                   ${edu.text ? `
//                     <div class="pt-2 ml-6 pb-2 text-gray-700 text-[15px] wrap-break-word">
//                       ${edu.text.replace(/<[^>]*>/g, "")}
//                     </div>
//                   ` : ""}
//                 </div>
//               `).join("") : `<p class="text-gray-500">No education added yet.</p>`}
//             </div>
//           </div>

//           <!-- Skills -->
//           <div class="mt-3">
//             <p class="text-[17px] font-bold">Skills</p>
//             ${skills.length > 0 ? `
//               <div class="grid grid-cols-2 gap-x-8 gap-y-3 mt-2">
//                 ${skills.map((skill, index) => `
//                   <div key="${skill.id || index}">
//                     <p class="text-sm wrap-break-word text-gray-600 mb-1">${skill.skill || ""}</p>
//                     ${skill.level && `
//                       <div class="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//                         <div class="h-full bg-[#0c0c1e]" style="width: ${getSkillLevelWidth(skill.level)}"></div>
//                       </div>
//                     ` }
//                   </div>
//                 `).join("")}
//               </div>
//             ` : `<p class="text-gray-500 mt-1">No skills added yet.</p>`}
//           </div>

//           <!-- Languages -->
//           ${fixMapCalls.languages.length > 0 && fixMapCalls.languages.some(lang => lang.name?.trim()) ? `
//             <div class="mt-3">
//               <p class="text-[17px] font-bold">Languages</p>
//               <div class="grid grid-cols-2 gap-x-8 gap-y-3 mt-2">
//                 ${fixMapCalls.languages.filter(lang => lang.name?.trim()).map((lang, index) => `
//                   <div key="${lang._id || index}">
//                     <p class="text-sm wrap-break-word text-gray-800 mb-1">${lang.name}</p>
//                     ${lang.level ? `
//                       <div class="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//                         <div class="h-full bg-[#0c0c1e]" style="width: ${getSkillLevelWidth(Number(lang.level))}"></div>
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
//               <p class="text-[17px] font-bold">Certifications and Licenses</p>
//               <div class="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word">
//                 ${fixMapCalls.certificationsAndLicenses.filter(item => 
//                   item.name?.replace(/<[^>]*>/g, "").trim()
//                 ).map((item, index) => `
//                   <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
//                 `).join("")}
//               </div>
//             </div>
//           ` : ""}

//           <!-- Hobbies and Interests -->
//           ${fixMapCalls.hobbiesAndInterests.length > 0 && fixMapCalls.hobbiesAndInterests.some(item => 
//             item.name?.replace(/<[^>]*>/g, "").trim()
//           ) ? `
//             <div class="mt-2">
//               <p class="text-[17px] font-bold">Hobbies and Interests</p>
//               <div class="pt-1 pb-1 text-gray-700 text-[15px] wrap-break-word">
//                 ${fixMapCalls.hobbiesAndInterests.filter(item => 
//                   item.name?.replace(/<[^>]*>/g, "").trim()
//                 ).map((item, index) => `
//                   <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
//                 `).join("")}
//               </div>
//             </div>
//           ` : ""}

//           <!-- Awards and Honors -->
//           ${fixMapCalls.awardsAndHonors.length > 0 && fixMapCalls.awardsAndHonors.some(item => 
//             item.name?.replace(/<[^>]*>/g, "").trim()
//           ) ? `
//             <div class="mt-2">
//               <h2 class="text-[17px] font-bold">Awards and Honors</h2>
//               <div class="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word">
//                 ${fixMapCalls.awardsAndHonors.filter(item => 
//                   item.name?.replace(/<[^>]*>/g, "").trim()
//                 ).map((item, index) => `
//                   <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
//                 `).join("")}
//               </div>
//             </div>
//           ` : ""}

//           <!-- Websites and Social Media -->
//           ${fixMapCalls.websitesAndSocialMedia.length > 0 && fixMapCalls.websitesAndSocialMedia.some(item => 
//             item.websiteUrl?.trim() || item.socialMedia?.trim()
//           ) ? `
//             <div class="mt-2">
//               <p class="text-[17px] font-bold">Websites and Social Media</p>
//               <div class="pt-1 pb-1 text-[15px] text-gray-700 wrap-break-word">
//                 ${fixMapCalls.websitesAndSocialMedia.filter(item => 
//                   item.websiteUrl?.trim() || item.socialMedia?.trim()
//                 ).map((item, index) => `
//                   <div key="${item.id || index}" class="mb-2">
//                     ${item.websiteUrl ? `
//                       <div>
//                         <p class="font-semibold text-sm">Website URL:</p>
//                         <a href="${item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`}" class="text-gray-700 underline wrap-break-word text-sm">
//                           ${item.websiteUrl}
//                         </a>
//                       </div>
//                     ` : ""}
//                     ${item.socialMedia ? `
//                       <div class="mt-1">
//                         <p class="font-semibold text-sm">Social Media URL:</p>
//                         <a href="${item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`}" class="text-gray-700 underline wrap-break-word text-sm">
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
//               <p class="text-[17px] font-bold">References</p>
//               <div class="pt-1 pb-2 text-gray-700 text-[15px] wrap-break-word">
//                 ${fixMapCalls.references.filter(item => 
//                   item.name?.replace(/<[^>]*>/g, "").trim()
//                 ).map((item, index) => `
//                   <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
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
//               ).map((section, index) => `
//                 <div key="${section.id || index}" class="pt-2 pb-3">
//                   ${section.name ? `<p class="text-[17px] font-bold">${section.name}</p>` : ""}
//                   ${section.description ? `
//                     <div class="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word">
//                       ${section.description.replace(/<[^>]*>/g, "")}
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
      
//       {/* Preview - using Tailwind classes directly */}
//       <div
//         className="bg-white border border-gray-100 font-nunito mx-auto"
//         style={{
//           width: "210mm",
//           padding: "5mm",
//           boxSizing: "border-box",
//         }}
//       >
//         {/* Header */}
//         <div className="text-center font-bold mt-1 mb-2">
//           <p className="text-[27px] uppercase">
//             {contact?.firstName || ""} {contact?.lastName || ""}
//           </p>
//           {contact?.jobTitle && (
//             <p className="text-[12px] font-normal mt-1">
//               {getJobTitle(contact.jobTitle)}
//             </p>
//           )}
//           <div className="flex justify-center items-center gap-4 mb-1">
//             {/* Show LinkedIn only if provided */}
//             {linkedinUrl && linkedinUrl.trim() && (
//               <a
//                 href={
//                   linkedinUrl.startsWith("http")
//                     ? linkedinUrl
//                     : `https://${linkedinUrl}`
//                 }
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 font-semibold underline text-black text-[13px]"
//               >
//                 <p>LinkedIn</p>
//               </a>
//             )}

//             {/* Show Portfolio only if provided */}
//             {contact?.portfolio && contact.portfolio.trim() && (
//               <a
//                 href={
//                   contact.portfolio.startsWith("http")
//                     ? contact.portfolio
//                     : `https://${contact.portfolio}`
//                 }
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 font-semibold underline text-black text-[13px]"
//               >
//                 <p>Portfolio</p>
//               </a>
//             )}
//           </div>
//         </div>

//         <hr className="border-2 border-black" />

//         <div className="flex justify-center gap-2 text-[13px] p-1 flex-wrap">
//           <p>
//             {contact?.address || ""}, {contact?.city || ""},{" "}
//           {contact?.postcode || ""},  {contact?.country || ""}
//           </p>
//           {contact?.phone && <p> • {contact?.phone}</p>}
//           {contact?.email && <p> • {contact?.email}</p>}
//         </div>

//         {/* Summary */}
//         <div className="mt-3">
//           <p className="text-[17px] font-bold">Summary</p>
//           <div
//             className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word"
//             dangerouslySetInnerHTML={{ __html: summary || "" }}
//           />
//         </div>

//         {/* Experience */}
//         <div className="mt-2">
//           {experiences?.length > 0 ? (
//             experiences.map((exp, index) => (
//               <div key={exp.id || index} className="mb-4">
//                 {index === 0 && (
//                   <p className="text-[17px] font-bold">Experience</p>
//                 )}
//                 {(exp.jobTitle || exp.employer || exp.location) && (
//                   <h3 className="font-semibold text-gray-900 wrap-break-word text-base mt-1">
//                     {exp.jobTitle || ""}{" "}
//                     {exp.employer && (
//                       <span className="text-gray-500 font-normal">
//                         — {exp.employer}
//                       </span>
//                     )}
//                     {exp.location && (
//                       <span className="text-gray-500 font-normal">
//                         {" "}
//                         — {exp.location}
//                       </span>
//                     )}
//                   </h3>
//                 )}

//                 <div className="text-gray-600 text-sm mt-1">
//                   <div className="flex items-center gap-2">
//                     {/* START DATE */}
//                     <MonthYearDisplay value={exp.startDate} shortYear={true} />

//                     {/* SHOW "-" ONLY IF BOTH DATES EXIST */}
//                     {exp.startDate && exp.endDate && <span>-</span>}

//                     {/* END DATE */}
//                     {exp.endDate ? (
//                       <MonthYearDisplay value={exp.endDate} shortYear={true} />
//                     ) : (
//                       "Present"
//                     )}
//                   </div>
//                 </div>

//                 <div
//                   className="pt-2 ml-6 pb-2 text-gray-700 text-[15px] wrap-break-word"
//                   dangerouslySetInnerHTML={{ __html: exp.text || "" }}
//                 />
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No experience added yet.</p>
//           )}
//         </div>

//         {/* Education */}
//         <div className="mt-3">
//           <p className="text-[17px] font-bold">Education</p>
//           <div>
//             {educations?.length > 0 ? (
//               educations.map((edu, index) => (
//                 <div key={edu.id || index} className="mb-3">
//                   {(edu.schoolname || edu.degree || edu.location) && (
//                     <h3 className="font-semibold text-gray-900 wrap-break-word text-base mt-1">
//                       {edu.schoolname || ""}
//                       {edu.degree && (
//                         <span className="text-gray-500 font-normal">
//                           {" "}
//                           — {edu.degree}
//                         </span>
//                       )}
//                       {edu.location && (
//                         <span className="text-gray-500 font-normal">
//                           {" "}
//                           — {edu.location}
//                         </span>
//                       )}
//                     </h3>
//                   )}

//                   {(edu.startDate || edu.endDate) && (
//                     <p className="text-gray-600 text-sm wrap-break-word mt-1">
//                       {edu.startDate || ""} — {edu.endDate || ""}
//                     </p>
//                   )}

//                   <div
//                     className="pt-2 ml-6 pb-2 text-gray-700 text-[15px] wrap-break-word"
//                     dangerouslySetInnerHTML={{ __html: edu.text || "" }}
//                   />
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No education added yet.</p>
//             )}
//           </div>
//         </div>

//         {/* Skills */}
//         <div className="mt-3">
//           <p className="text-[17px] font-bold">Skills</p>
//           {skills.length > 0 ? (
//             <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-2">
//               {skills.map((skill, index) => (
//                 <div key={skill.id || index}>
//                   <p className="text-sm wrap-break-word text-gray-600 mb-1">
//                     {skill.skill || ""}
//                   </p>
//                   {skill.level && (
//                     <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-[#0c0c1e]"
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
//             <p className="text-gray-500 mt-1">No skills added yet.</p>
//           )}
//         </div>

//         {/* Languages */}
//         {fixMapCalls.languages.length > 0 &&
//           fixMapCalls.languages.some(
//             (lang) => lang.name && lang.name.trim() !== "",
//           ) && (
//             <div className="mt-3">
//               <p className="text-[17px] font-bold">Languages</p>
//               <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-2">
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
//               <p className="text-[17px] font-bold">Certifications and Licenses</p>
//               <div className="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word">
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
//               <p className="text-[17px] font-bold">Hobbies and Interests</p>
//               <div className="pt-1 pb-1 text-gray-700 text-[15px] wrap-break-word">
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
//               item?.name &&
//               item.name.replace(/<[^>]+>/g, "").trim() !== "" &&
//               item.name.toLowerCase() !== "<p><br></p>",
//           ) && (
//             <div className="mt-2">
//               <h2 className="text-[17px] font-bold">Awards and Honors</h2>
//               <div className="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word">
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
//               <p className="text-[17px] font-bold">Websites and Social Media</p>
//               <div className="pt-1 pb-1 text-[15px] text-gray-700 wrap-break-word">
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
//                             <p className="font-semibold text-sm">
//                               Social Media URL:
//                             </p>
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
//               <p className="text-[17px] font-bold">References</p>
//               <div className="pt-1 pb-2 text-gray-700 text-[15px] wrap-break-word">
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
//                   <div key={section.id || index} className="pt-2 pb-3">
//                     {/* Show only content, no heading */}
//                     {section.name && (
//                       <p className="text-[17px] font-bold">{section.name}</p>
//                     )}

//                     {section.description && (
//                       <div
//                         className="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word"
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

// export default TemplateFour;






































"use client";

import React, { useContext } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import { MonthYearDisplay, formatMonthYear } from "@/app/utils";
import {
  
  Finalize,
  ResumeProps,
} from "@/app/types/context.types";
import { usePathname } from "next/navigation";



const TemplateFour: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const contact = alldata?.contact || context.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills || context?.skills || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";
  const linkedinUrl = contact?.linkedin;

  const getJobTitle = (jobTitle: any): string => {
    if (!jobTitle) return "";
    if (typeof jobTitle === "string") return jobTitle;
    if (typeof jobTitle === "object" && jobTitle !== null)
      return (jobTitle as any)?.name || (jobTitle as any)?.label || "";
    return "";
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

  const skillPct = (level: any) =>
    level ? `${(Number(level) / 5) * 100}%` : "0%";

  /* ======================================================
     SHARED CSS — used by both JSX preview + generateHTML
     No Tailwind, no @import, explicit font-family everywhere,
     global p/li reset to prevent PDF spacing blowout
  ====================================================== */
  const styles = `
    /* All rules scoped to .t4-resume  so nothing leaks to the host website */

    /* body styles intentionally omitted — applied in generateHTML only to avoid leaking into host website */

    /* Scoped resets — only affect elements inside the resume */
    .t4-resume  * {
      box-sizing: border-box;
    }

    .t4-resume  p,
    .t4-resume  div,
    .t4-resume  span,
    .t4-resume  h2,
    .t4-resume  h3,
    .t4-resume  i,
    .t4-resume  a {
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    /* Reset <p> margins inside resume only */
    .t4-resume  p {
      margin: 0 !important;
      padding: 0 !important;
    }

    .t4-resume  ul {
      list-style-type: disc !important;
      padding-left: 20px !important;
      margin: 0 !important;
    }

    .t4-resume  ol {
      list-style-type: decimal !important;
      padding-left: 20px !important;
      margin: 0 !important;
    }

    .t4-resume  li {
      margin-top: 0 !important;
      margin-bottom: 1px !important;
      padding: 0 !important;
      line-height: 1.5 !important;
      font-size: 14px !important;
      font-family: 'Nunito', Arial, sans-serif !important;
    }

    /* ── CONTAINER ── */
    .t4-resume  {
      width: 210mm;
      min-height: 297mm;
      padding: 5mm;
      box-sizing: border-box;
      background-color: white;
      font-family: 'Nunito', Arial, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      text-align: left;
    }


      .t4-resume.is-preview {
    scale: 0.3;
    max-height: 297mm;
    overflow: hidden;
    transform-origin: top left; /* Ensures it scales from the corner */
}

    /* ── HEADER ── */
     .t4-resume .header-block {
      text-align: center;
      margin-bottom: 6px;
    }

    .t4-resume .header-name {
      font-size: 27px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.2;
      margin-bottom: 3px;
    }

    .t4-resume .header-jobtitle {
      font-size: 12px;
      font-weight: 400;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      margin-bottom: 4px;
    }

    .t4-resume .header-links {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin-bottom: 4px;
    }

    .t4-resume .header-link {
      font-size: 13px;
      font-weight: 600;
      color: #000;
      text-decoration: underline;
      text-underline-offset: 2px;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .t4-resume .header-divider {
      border: none;
      border-top: 2px solid #000;
      margin: 4px 0;
    }

    .t4-resume .header-contact-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      flex-wrap: wrap;
      padding: 3px 0;
    }

    /* ── SECTION TITLE ── */
    .t4-resume .section-title {
      font-size: 17px;
      font-weight: 700;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.4;
      margin-bottom: 4px;
      margin-top: 10px;
    }

    /* ── ENTRY ── */
    .t4-resume .entry-block {
      margin-bottom: 12px;
    }

    .t4-resume .entry-heading {
      font-size: 15px;
      font-weight: 600;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.4;
      margin-top: 4px;
      margin-bottom: 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t4-resume .entry-heading-muted {
      font-size: 15px;
      font-weight: 400;
      color: #6b7280;
      font-family: 'Nunito', Arial, sans-serif;
    }

    .t4-resume .entry-date {
      font-size: 13px;
      color: #4b5563;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      margin-top: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .t4-resume .entry-content {
      font-size: 14px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      padding-top: 4px;
      padding-left: 24px;
      padding-bottom: 4px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t4-resume .entry-content p {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
      font-size: 14px !important;
      font-family: 'Nunito', Arial, sans-serif !important;
    }

    .t4-resume .entry-content ul {
      list-style-type: disc !important;
      padding-left: 20px !important;
      margin: 0 !important;
    }

    .t4-resume .entry-content ol {
      list-style-type: decimal !important;
      padding-left: 20px !important;
      margin: 0 !important;
    }

    .t4-resume .entry-content li {
      margin: 0 !important;
      margin-bottom: 1px !important;
      padding: 0 !important;
      line-height: 1.5 !important;
      font-size: 14px !important;
      font-family: 'Nunito', Arial, sans-serif !important;
    }

    /* ── SKILLS GRID ── */
    .t4-resume .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 32px;
      row-gap: 10px;
      margin-top: 6px;
    }

    .t4-resume .skill-name {
      font-size: 13px;
      color: #4b5563;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      margin-bottom: 2px;
      word-wrap: break-word;
    }

    .t4-resume .skill-bar-wrap {
      height: 4px;
      width: 100%;
      background: #d1d5db;
      border-radius: 9999px;
      overflow: hidden;
    }

    .t4-resume .skill-bar-fill {
      height: 100%;
      background: #0c0c1e;
      border-radius: 9999px;
    }

    /* ── EXTRA CONTENT ── */
    .t4-resume .extra-content {
      font-size: 14px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      padding: 4px 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t4-resume .extra-content p {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
    }

    .t4-resume .extra-content div {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
    }

    /* ── WEBSITES ── */
    .t4-resume .website-label {
      font-size: 13px;
      font-weight: 600;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .t4-resume .website-link {
      font-size: 13px;
      color: #374151;
      text-decoration: underline;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      word-wrap: break-word;
    }

    /* ── PRINT ── */
    @media print {
      @page {
        size: A4;
        margin: 5mm;
      }
      @page :first { margin-top: 0; }

      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .t4-resume  {
        width: 100% !important;
        padding: 0 !important;
        box-shadow: none !important;
      }

      .t4-resume .entry-block {
        page-break-inside: avoid;
        break-inside: avoid;
      }

      .t4-resume .section-title {
        page-break-after: avoid;
        break-after: avoid;
      }
    }
  `;

  /* ======================================================
     HTML GENERATION — mirrors JSX exactly, no Tailwind
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

    const stripHtml = (html: string) =>
      html?.replace(/<[^>]*>/g, "") || "";

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>${styles}</style>
</head>
<body>
<div class="t4-resume ">

  <!-- HEADER -->
  <div class="header-block">
    <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
    ${contact?.jobTitle ? `<div class="header-jobtitle">${getJobTitle(contact.jobTitle)}</div>` : ""}
    ${linkedinUrl?.trim() || contact?.portfolio?.trim() ? `
    <div class="header-links">
      ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="header-link">LinkedIn</a>` : ""}
      ${contact?.portfolio?.trim() ? `<a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" class="header-link">Portfolio</a>` : ""}
    </div>` : ""}
  </div>

  <hr class="header-divider"/>

  <div class="header-contact-row">
    ${addressStr ? `<span>${addressStr}</span>` : ""}
    ${contact?.phone ? `<span> • ${contact.phone}</span>` : ""}
    ${contact?.email ? `<span> • ${contact.email}</span>` : ""}
  </div>

  <!-- SUMMARY -->
  ${summary ? `
  <div class="section-title">Summary</div>
  <div class="extra-content">${stripHtml(summary)}</div>` : ""}

  <!-- EXPERIENCE -->
  ${experiences?.length > 0 ? `
  <div class="section-title">Experience</div>
  ${experiences.map((exp) => {
    const start = formatMonthYear(exp.startDate, true);
    const end = exp.endDate ? formatMonthYear(exp.endDate, true) : (exp.startDate ? "Present" : "");
    return `
  <div class="entry-block">
    ${exp.jobTitle || exp.employer || exp.location ? `
    <div class="entry-heading">
      ${exp.jobTitle || ""}
      ${exp.employer ? `<span class="entry-heading-muted"> — ${exp.employer}</span>` : ""}
      ${exp.location ? `<span class="entry-heading-muted"> — ${exp.location}</span>` : ""}
    </div>` : ""}
    <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
    ${exp.text ? `<div class="entry-content">${stripHtml(exp.text)}</div>` : ""}
  </div>`;
  }).join("")}` : ""}

  <!-- EDUCATION -->
  ${educations?.length > 0 ? `
  <div class="section-title">Education</div>
  ${educations.map((edu) => {
    const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(" — ");
    return `
  <div class="entry-block">
    ${edu.schoolname || edu.degree || edu.location ? `
    <div class="entry-heading">
      ${edu.schoolname || ""}
      ${edu.degree ? `<span class="entry-heading-muted"> — ${edu.degree}</span>` : ""}
      ${edu.location ? `<span class="entry-heading-muted"> — ${edu.location}</span>` : ""}
    </div>` : ""}
    ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
    ${edu.text ? `<div class="entry-content">${stripHtml(edu.text)}</div>` : ""}
  </div>`;
  }).join("")}` : ""}

  <!-- SKILLS -->
  ${skills.length > 0 ? `
  <div class="section-title">Skills</div>
  <div class="skills-grid">
    ${skills.map((s) => `
    <div>
      <div class="skill-name">${s.skill || ""}</div>
      ${s.level ? `<div class="skill-bar-wrap"><div class="skill-bar-fill" style="width:${skillPct(s.level)}"></div></div>` : ""}
    </div>`).join("")}
  </div>` : ""}

  <!-- LANGUAGES -->
  ${fin.languages.some((l) => l.name?.trim()) ? `
  <div class="section-title">Languages</div>
  <div class="skills-grid">
    ${fin.languages.filter((l) => l.name?.trim()).map((l) => `
    <div>
      <div class="skill-name">${l.name}</div>
      ${l.level ? `<div class="skill-bar-wrap"><div class="skill-bar-fill" style="width:${skillPct(l.level)}"></div></div>` : ""}
    </div>`).join("")}
  </div>` : ""}

  <!-- CERTIFICATIONS -->
  ${fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
  <div class="section-title">Certifications and Licenses</div>
  <div class="extra-content">
    ${fin.certifications.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}
  </div>` : ""}

  <!-- HOBBIES -->
  ${fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
  <div class="section-title">Hobbies and Interests</div>
  <div class="extra-content">
    ${fin.hobbies.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}
  </div>` : ""}

  <!-- AWARDS -->
  ${fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
  <div class="section-title">Awards and Honors</div>
  <div class="extra-content">
    ${fin.awards.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}
  </div>` : ""}

  <!-- WEBSITES -->
  ${fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) ? `
  <div class="section-title">Websites and Social Media</div>
  <div class="extra-content">
    ${fin.websites.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((i) => `
    <div style="margin-bottom:6px">
      ${i.websiteUrl ? `<div><span class="website-label">Website URL: </span><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="website-link">${i.websiteUrl}</a></div>` : ""}
      ${i.socialMedia ? `<div><span class="website-label">Social Media URL: </span><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="website-link">${i.socialMedia}</a></div>` : ""}
    </div>`).join("")}
  </div>` : ""}

  <!-- REFERENCES -->
  ${fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
  <div class="section-title">References</div>
  <div class="extra-content">
    ${fin.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}
  </div>` : ""}

  <!-- CUSTOM SECTIONS -->
  ${fin.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
  <div>
    ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
    ${s.description ? `<div class="extra-content">${stripHtml(s.description)}</div>` : ""}
  </div>`).join("")}

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

  const stripHtmlJSX = (html: string) =>
    html?.replace(/<[^>]*>/g, "") || "";

  /* ======================================================
     JSX PREVIEW — uses same CSS classes as generateHTML
  ====================================================== */
  return (
    <>
      {lastSegment === "download-resume" && (
        <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
          <button
            onClick={handleDownload}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Download Resume
          </button>
        </div>
      )}

      <div 
      // className="t4-resume"
              className={`t4-resume  ${alldata ? 'is-preview' : ''}`}

      style={{ margin: "0 auto", boxShadow: "0 0 10px rgba(0,0,0,0.08)" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
        <style>{styles}</style>

        {/* HEADER */}
        <div className="header-block">
          <div className="header-name">
            {contact?.firstName || ""} {contact?.lastName || ""}
          </div>
          {contact?.jobTitle && (
            <div className="header-jobtitle">{getJobTitle(contact.jobTitle)}</div>
          )}
          {(linkedinUrl?.trim() || contact?.portfolio?.trim()) && (
            <div className="header-links">
              {linkedinUrl?.trim() && (
                <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer" className="header-link">LinkedIn</a>
              )}
              {contact?.portfolio?.trim() && (
                <a href={contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`} target="_blank" rel="noreferrer" className="header-link">Portfolio</a>
              )}
            </div>
          )}
        </div>

        <hr className="header-divider" />

        <div className="header-contact-row">
          {[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).length > 0 && (
            <span>{[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ")}</span>
          )}
          {contact?.phone && <span> • {contact.phone}</span>}
          {contact?.email && <span> • {contact.email}</span>}
        </div>

        {/* SUMMARY */}
        {summary && (
          <>
            <div className="section-title">Summary</div>
            <div className="extra-content">{stripHtmlJSX(summary)}</div>
          </>
        )}

        {/* EXPERIENCE */}
        {experiences?.length > 0 && (
          <>
            <div className="section-title">Experience</div>
            {experiences.map((exp, index) => (
              <div key={exp.id || index} className="entry-block">
                {(exp.jobTitle || exp.employer || exp.location) && (
                  <div className="entry-heading">
                    {exp.jobTitle || ""}
                    {exp.employer && <span className="entry-heading-muted"> — {exp.employer}</span>}
                    {exp.location && <span className="entry-heading-muted"> — {exp.location}</span>}
                  </div>
                )}
                <div className="entry-date">
                  <MonthYearDisplay value={exp.startDate} shortYear={true} />
                  {exp.startDate && (exp.endDate || true) && <span> - </span>}
                  {exp.endDate
                    ? <MonthYearDisplay value={exp.endDate} shortYear={true} />
                    : exp.startDate && <span>Present</span>}
                </div>
                {exp.text && (
                  <div className="entry-content">{stripHtmlJSX(exp.text)}</div>
                )}
              </div>
            ))}
          </>
        )}

        {/* EDUCATION */}
        {educations?.length > 0 && (
          <>
            <div className="section-title">Education</div>
            {educations.map((edu, index) => (
              <div key={edu.id || index} className="entry-block">
                {(edu.schoolname || edu.degree || edu.location) && (
                  <div className="entry-heading">
                    {edu.schoolname || ""}
                    {edu.degree && <span className="entry-heading-muted"> — {edu.degree}</span>}
                    {edu.location && <span className="entry-heading-muted"> — {edu.location}</span>}
                  </div>
                )}
                {(edu.startDate || edu.endDate) && (
                  <div className="entry-date">
                    {[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}
                  </div>
                )}
                {edu.text && (
                  <div className="entry-content">{stripHtmlJSX(edu.text)}</div>
                )}
              </div>
            ))}
          </>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <>
            <div className="section-title">Skills</div>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={skill.id || index}>
                  <div className="skill-name">{skill.skill || ""}</div>
                  {skill.level && (
                    <div className="skill-bar-wrap">
                      <div className="skill-bar-fill" style={{ width: skillPct(skill.level) }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* LANGUAGES */}
        {fin.languages.some((l) => l.name?.trim()) && (
          <>
            <div className="section-title">Languages</div>
            <div className="skills-grid">
              {fin.languages.filter((l) => l.name?.trim()).map((l, i) => (
                <div key={l._id || i}>
                  <div className="skill-name">{l.name}</div>
                  {l.level && (
                    <div className="skill-bar-wrap">
                      <div className="skill-bar-fill" style={{ width: skillPct(l.level) }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* CERTIFICATIONS */}
        {fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
          <>
            <div className="section-title">Certifications and Licenses</div>
            <div className="extra-content">
              {fin.certifications.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
                <div key={item.id || i}>{stripHtmlJSX(item.name || "")}</div>
              ))}
            </div>
          </>
        )}

        {/* HOBBIES */}
        {fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
          <>
            <div className="section-title">Hobbies and Interests</div>
            <div className="extra-content">
              {fin.hobbies.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
                <div key={item.id || i}>{stripHtmlJSX(item.name || "")}</div>
              ))}
            </div>
          </>
        )}

        {/* AWARDS */}
        {fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
          <>
            <div className="section-title">Awards and Honors</div>
            <div className="extra-content">
              {fin.awards.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
                <div key={item.id || i}>{stripHtmlJSX(item.name || "")}</div>
              ))}
            </div>
          </>
        )}

        {/* WEBSITES */}
        {fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) && (
          <>
            <div className="section-title">Websites and Social Media</div>
            <div className="extra-content">
              {fin.websites.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((item, i) => (
                <div key={item.id || i} style={{ marginBottom: "6px" }}>
                  {item.websiteUrl && (
                    <div>
                      <span className="website-label">Website URL: </span>
                      <a href={item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`} target="_blank" rel="noreferrer" className="website-link">{item.websiteUrl}</a>
                    </div>
                  )}
                  {item.socialMedia && (
                    <div>
                      <span className="website-label">Social Media URL: </span>
                      <a href={item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`} target="_blank" rel="noreferrer" className="website-link">{item.socialMedia}</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* REFERENCES */}
        {fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
          <>
            <div className="section-title">References</div>
            <div className="extra-content">
              {fin.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
                <div key={item.id || i}>{stripHtmlJSX(item.name || "")}</div>
              ))}
            </div>
          </>
        )}

        {/* CUSTOM SECTIONS */}
        {fin.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((section, i) => (
          <div key={section.id || i}>
            {section.name && <div className="section-title">{section.name}</div>}
            {section.description && <div className="extra-content">{stripHtmlJSX(section.description)}</div>}
          </div>
        ))}

      </div>
    </>
  );
};

export default TemplateFour;
