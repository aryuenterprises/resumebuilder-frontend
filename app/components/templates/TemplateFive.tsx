// "use client";

// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { IoPersonOutline } from "react-icons/io5";
// import { API_URL } from "@/app/config/api";
// import {MonthYearDisplay } from "@/app/utils";

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

//   useEffect(() => {
//     let url: string | null = null;
//     let objectUrl: string | null = null;

//     if (croppedImage) {
//       if (
//         typeof croppedImage === "string" &&
//         croppedImage.startsWith("blob:")
//       ) {
//         url = croppedImage;
//       } else if (typeof croppedImage === "string") {
//         url = `${API_URL}/api/uploads/photos/${croppedImage}`;
//       } 
//       // else if (croppedImage instanceof Blob || croppedImage instanceof File) {
//       //   objectUrl = URL.createObjectURL(croppedImage);
//       //   url = objectUrl;
//       // }
//       else if ((croppedImage as any) instanceof Blob || (croppedImage as any) instanceof File) {
//     objectUrl = URL.createObjectURL(croppedImage as Blob);
//     url = objectUrl;
//   }

//       setPreviewUrl(url);
//     } else if (contact.photo) {
//       setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
//     } else {
//       setPreviewUrl(null);
//     }

//     return () => {
//       if (objectUrl) {
//         URL.revokeObjectURL(objectUrl);
//       }
//     };
//   }, [croppedImage, contact.photo]);

//   // Type guard for FinalizeData
//   const isFinalizeData = (data: any): data is Finalize => {
//     return data && typeof data === "object" && !Array.isArray(data);
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
//         <div class="resume-container" style="width: 210mm; padding: 5mm; box-sizing: border-box; margin: 0 auto;">
//           <!-- HEADER -->
//           <div class="bg-yellow-400 p-2 rounded-md px-10">
//             <div class="flex items-center justify-between">
//               <div class="flex gap-3 items-center">
//                 ${
//                   previewUrl
//                     ? `<img src="${previewUrl}" alt="Profile" class="w-24 h-24 rounded-md object-cover border" />`
//                     : `<div class="w-24 h-24 rounded-md border flex items-center justify-center bg-gray-100"><span class="text-gray-400">No Photo</span></div>`
//                 }
//                 <div>
//                   <h1 class="text-2xl font-bold text-gray-900 uppercase">
//                     ${contact?.firstName || ""} ${contact?.lastName || ""}
//                   </h1>
//                   ${contact?.jobTitle ? `
//                     <p class="text-sm text-gray-700 mt-1">
//                       ${getJobTitle(contact.jobTitle)}
//                     </p>
//                   ` : ""}
//                 </div>
//               </div>

//               <section class="mt-6 px-10">
//                 <h2 class="text-lg font-semibold text-white border-b pb-1 mb-2 bg-black w-fit p-2 rounded-md">
//                   DETAILS
//                 </h2>
//                 <p class="text-gray-700 text-sm">
//                   ${contact?.address || ""}, ${contact?.city || ""}, ${contact?.country || ""}, ${contact?.postcode || ""}
//                 </p>
//                 <p class="text-gray-700 text-sm">${contact?.phone || ""}</p>
//                 <p class="text-gray-700 text-sm">${contact?.email || ""}</p>
//               </section>
//             </div>

//             <div class="flex items-center gap-4 mt-3">
//               ${linkedinUrl && linkedinUrl.trim() ? `
//                 <a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm transition-all duration-300 shadow">
//                   <span>LinkedIn</span>
//                 </a>
//               ` : ""}
//               ${contact?.portfolio && contact.portfolio.trim() ? `
//                 <a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm transition-all duration-300 shadow">
//                   <span>Portfolio</span>
//                 </a>
//               ` : ""}
//             </div>
//           </div>

//           <!-- SUMMARY -->
//           ${summary ? `
//             <section class="mt-3 px-10">
//               <h2 class="text-lg font-semibold mb-1 text-white bg-black w-fit p-2 rounded-md">
//                 SUMMARY
//               </h2>
//               <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
//                 ${summary.replace(/<[^>]*>/g, "")}
//               </div>
//             </section>
//           ` : ""}

//           <!-- EXPERIENCE -->
//           <section class="mt-2 px-10">
//             ${experiences?.length > 0 ? `
//               <h2 class="text-lg font-semibold text-white mb-1 bg-black w-fit p-2 rounded-md">
//                 EXPERIENCE
//               </h2>
//               ${experiences.map((exp, index) => `
//                 <div key="${exp.id || index}" class="mb-6">
//                   ${(exp.jobTitle || exp.employer || exp.location) ? `
//                     <h3 class="font-semibold text-gray-900 text-lg wrap-break-word">
//                       ${exp.jobTitle || ""}
//                       ${exp.employer ? `<span class="text-gray-500 font-normal"> — ${exp.employer}</span>` : ""}
//                       ${exp.location ? `<span class="text-gray-500 font-normal"> — ${exp.location}</span>` : ""}
//                     </h3>
//                   ` : ""}

//                   <div class="flex items-center gap-2 text-sm text-gray-600 mt-1">
//                     ${exp.startDate || ""}
//                     ${exp.startDate && exp.endDate ? `<span>-</span>` : ""}
//                     ${exp.endDate ? exp.endDate : exp.startDate ? "Present" : ""}
//                   </div>

//                   ${exp.text ? `
//                     <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
//                       ${exp.text.replace(/<[^>]*>/g, "")}
//                     </div>
//                   ` : ""}
//                 </div>
//               `).join("")}
//             ` : `<p class="text-gray-500">No experience added yet.</p>`}
//           </section>

//           <!-- EDUCATION -->
//           <section class="mt-3 px-10">
//             <h2 class="text-lg font-semibold text-white mb-2 bg-black w-fit p-2 rounded-md">
//               EDUCATION
//             </h2>
//             ${educations?.length > 0 ? educations.map((edu, index) => `
//               <div key="${edu.id || index}" class="mb-6">
//                 <h3 class="font-semibold text-gray-900 wrap-break-word text-lg">
//                   ${edu.schoolname || ""}
//                 </h3>
//                 <p class="text-gray-500 text-[15px] font-normal">${edu.degree || ""}</p>
//                 <p class="text-gray-500 font-normal">${edu.location || ""}</p>
//                 ${(edu.startDate || edu.endDate) ? `
//                   <p class="text-gray-600 text-sm wrap-break-word mt-1">
//                     ${edu.startDate || ""} — ${edu.endDate || ""}
//                   </p>
//                 ` : ""}
//                 ${edu.text ? `
//                   <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
//                     ${edu.text.replace(/<[^>]*>/g, "")}
//                   </div>
//                 ` : ""}
//               </div>
//             `).join("") : `<p class="text-gray-500">No education added yet.</p>`}
//           </section>

//           <!-- SKILLS -->
//           <section class="mt-3 px-10">
//             <h2 class="text-lg font-semibold text-white mb-2 bg-black w-fit p-2 rounded-md">
//               SKILLS
//             </h2>
//             ${skills.length > 0 ? `
//               <div class="grid grid-cols-2 gap-x-8 gap-y-3">
//                 ${skills.map((skill, index) => `
//                   <div key="${skill.id || index}">
//                     <p class="text-sm text-gray-800 wrap-break-word mb-1">${skill.skill || ""}</p>
//                     ${skill.level && `
//                       <div class="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//                         <div class="h-full bg-[#0c0c1e]" style="width: ${getSkillLevelWidth(skill.level)}"></div>
//                       </div>
//                     ` }
//                   </div>
//                 `).join("")}
//               </div>
//             ` : `<p class="text-gray-500">No skills added yet.</p>`}
//           </section>

//           <!-- Languages -->
//           ${isFinalizeData(finalize) && Array.isArray(finalize.languages) && 
//             finalize.languages.some(lang => lang?.name?.trim()) ? `
//             <section class="mt-3 px-10">
//               <h2 class="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//                 Languages
//               </h2>
//               <div class="grid grid-cols-2 gap-x-8 gap-y-3">
//                 ${finalize.languages.filter(lang => lang.name?.trim()).map((lang, index) => `
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
//             </section>
//           ` : ""}

//           <!-- Certifications and Licenses -->
//           ${isFinalizeData(finalize) && Array.isArray(finalize.certificationsAndLicenses) && 
//             finalize.certificationsAndLicenses.some(item => item.name?.replace(/<[^>]*>/g, "").trim()) ? `
//             <section class="mt-3 px-10">
//               <h2 class="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//                 Certifications and Licenses
//               </h2>
//               <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
//                 ${finalize.certificationsAndLicenses.filter(item => 
//                   item.name?.replace(/<[^>]*>/g, "").trim()
//                 ).map((item, index) => `
//                   <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
//                 `).join("")}
//               </div>
//             </section>
//           ` : ""}

//           <!-- Hobbies and Interests -->
//           ${isFinalizeData(finalize) && Array.isArray(finalize.hobbiesAndInterests) && 
//             finalize.hobbiesAndInterests.some(item => item.name?.replace(/<[^>]*>/g, "").trim()) ? `
//             <section class="mt-3 px-10">
//               <h2 class="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//                 Hobbies and Interests
//               </h2>
//               <div class="pt-1 pb-2 text-[15px] wrap-break-word">
//                 ${finalize.hobbiesAndInterests.filter(item => 
//                   item.name?.replace(/<[^>]*>/g, "").trim()
//                 ).map((item, index) => `
//                   <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
//                 `).join("")}
//               </div>
//             </section>
//           ` : ""}

//           <!-- Awards and Honors -->
//           ${isFinalizeData(finalize) && Array.isArray(finalize.awardsAndHonors) && 
//             finalize.awardsAndHonors.some(item => item.name?.replace(/<[^>]*>/g, "").trim()) ? `
//             <section class="mt-3 px-10">
//               <h2 class="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//                 Awards and Honors
//               </h2>
//               <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
//                 ${finalize.awardsAndHonors.filter(item => 
//                   item.name?.replace(/<[^>]*>/g, "").trim()
//                 ).map((item, index) => `
//                   <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
//                 `).join("")}
//               </div>
//             </section>
//           ` : ""}

//           <!-- Websites and Social Media -->
//           ${isFinalizeData(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && 
//             finalize.websitesAndSocialMedia.some(item => item.websiteUrl?.trim() || item.socialMedia?.trim()) ? `
//             <section class="mt-3 px-10">
//               <h2 class="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//                 Websites and Social Media
//               </h2>
//               <div class="pt-1 pb-2 text-[15px] wrap-break-word">
//                 ${finalize.websitesAndSocialMedia.filter(item => 
//                   item.websiteUrl?.trim() || item.socialMedia?.trim()
//                 ).map((item, index) => `
//                   <div key="${item.id || index}" class="mb-2">
//                     ${item.websiteUrl ? `
//                       <div>
//                         <p class="font-semibold">Website URL:</p>
//                         <a href="${item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`}" class="text-blue-600 underline wrap-break-word">
//                           ${item.websiteUrl}
//                         </a>
//                       </div>
//                     ` : ""}
//                     ${item.socialMedia ? `
//                       <div class="mt-2">
//                         <p class="font-semibold">Social Media URL:</p>
//                         <a href="${item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`}" class="text-blue-600 underline wrap-break-word">
//                           ${item.socialMedia}
//                         </a>
//                       </div>
//                     ` : ""}
//                   </div>
//                 `).join("")}
//               </div>
//             </section>
//           ` : ""}

//           <!-- References -->
//           ${isFinalizeData(finalize) && Array.isArray(finalize.references) && 
//             finalize.references.some(item => item.name?.replace(/<[^>]*>/g, "").trim()) ? `
//             <section class="mt-2 px-10">
//               <h2 class="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//                 References
//               </h2>
//               <div class="pt-1 pb-2 text-[15px] wrap-break-word">
//                 ${finalize.references.filter(item => 
//                   item.name?.replace(/<[^>]*>/g, "").trim()
//                 ).map((item, index) => `
//                   <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
//                 `).join("")}
//               </div>
//             </section>
//           ` : ""}

//           <!-- Custom Section -->
//           ${isFinalizeData(finalize) && Array.isArray(finalize.customSection) && 
//             finalize.customSection.some(section => section?.name?.trim() || section?.description?.trim()) ? `
//             <div class="mt-1">
//               ${finalize.customSection.filter(section => 
//                 section?.name?.trim() || section?.description?.trim()
//               ).map((section, index) => `
//                 <div key="${section.id || index}" class="mt-2 px-10">
//                   ${section.name ? `
//                     <p class="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//                       ${section.name}
//                     </p>
//                   ` : ""}
//                   ${section.description ? `
//                     <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
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
      
//       {/* Preview */}
//         <div
//         className="bg-white border border-gray-100 font-nunito mx-auto"
//         style={{
//           width: "210mm",
//           padding: "5mm",
//           boxSizing: "border-box",
//         }}
//       >
//         {/* HEADER */}
//         <div className="bg-yellow-400 p-2 rounded-md px-10">
//           <div className="flex items-center justify-between">
//             <div className="flex gap-3 items-center">
//               {previewUrl ? (
//                 // eslint-disable-next-line @next/next/no-img-element
//                 <img
//                   src={previewUrl}
//                   alt="Cropped preview"
//                   className="w-24 h-24 rounded-md object-cover border"
//                 />
//               ) : (
//                 <IoPersonOutline className="w-24 h-24 rounded-md object-cover border" />
//               )}
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900 uppercase">
//                   {contact?.firstName || ""} {contact?.lastName || ""}
//                 </h1>
//                 {contact?.jobTitle && (
//                   <p className="text-sm text-gray-700 mt-1">
//                     {getJobTitle(contact.jobTitle)}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <section className="mt-6 px-10">
//               <h2 className="text-lg font-semibold text-white border-b pb-1 mb-2 bg-black w-fit p-2 rounded-md">
//                 DETAILS
//               </h2>
//               <p className="text-gray-700 text-sm">
//                 {contact?.address || ""}, {contact?.city || ""},{" "}
//              {contact?.postcode || ""},   {contact?.country || ""}
//               </p>
//               <p className="text-gray-700 text-sm">{contact?.phone || ""}</p>
//               <p className="text-gray-700 text-sm">{contact?.email || ""}</p>
//             </section>
//           </div>

//           <div className="flex items-center gap-4 mt-3">
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
//                 className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm transition-all duration-300 shadow"
//               >
//                 <i className="fab fa-linkedin text-lg"></i>
//                 <span>LinkedIn</span>
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
//                 className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm transition-all duration-300 shadow"
//               >
//                 <i className="fas fa-globe text-lg"></i>
//                 <span>Portfolio</span>
//               </a>
//             )}
//           </div>
//         </div>

//         {/* SUMMARY */}
//         <section className="mt-3 px-10">
//           <h2 className="text-lg font-semibold mb-1 text-white bg-black w-fit p-2 rounded-md">
//             SUMMARY
//           </h2>
//           <div
//             className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word"
//             dangerouslySetInnerHTML={{ __html: summary || "" }}
//           />
//         </section>

//         {/* EXPERIENCE */}
//         <section className="mt-2 px-10">
//           <div>
//             {experiences?.length > 0 ? (
//               experiences.map((exp, index) => (
//                 <div key={exp.id || index} className="mb-6">
//                   <h2 className="text-lg font-semibold text-white mb-1 bg-black w-fit p-2 rounded-md">
//                     EXPERIENCE
//                   </h2>
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

//                   <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
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

//                   <div
//                     className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word"
//                     dangerouslySetInnerHTML={{ __html: exp.text || "" }}
//                   />
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No experience added yet.</p>
//             )}
//           </div>
//         </section>

//         {/* EDUCATION */}
//         <section className="mt-3 px-10">
//           <h2 className="text-lg font-semibold text-white mb-2 bg-black w-fit p-2 rounded-md">
//             EDUCATION
//           </h2>
//           <div>
//             {educations?.length > 0 ? (
//               educations.map((edu, index) => (
//                 <div key={edu.id || index} className="mb-6">
//                   <h3 className="font-semibold text-gray-900 wrap-break-word text-lg">
//                     {edu.schoolname || ""}
//                   </h3>

//                   <p className="text-gray-500 text-[15px] font-normal">
//                     {edu.degree || ""}
//                   </p>

//                   <p className="text-gray-500 font-normal">
//                     {edu.location || ""}
//                   </p>

//                   {(edu.startDate || edu.endDate) && (
//                     <p className="text-gray-600 text-sm wrap-break-word mt-1">
//                       {edu.startDate || ""} — {edu.endDate || ""}
//                     </p>
//                   )}

//                   <div
//                     className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word"
//                     dangerouslySetInnerHTML={{ __html: edu.text || "" }}
//                   />
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No education added yet.</p>
//             )}
//           </div>
//         </section>

//         {/* SKILLS */}
//         <section className="mt-3 px-10">
//           <h2 className="text-lg font-semibold text-white mb-2 bg-black w-fit p-2 rounded-md">
//             SKILLS
//           </h2>
//           <div>
//             {skills.length > 0 ? (
//               <div className="grid grid-cols-2 gap-x-8 gap-y-3">
//                 {skills.map((skill, index) => (
//                   <div key={skill.id || index}>
//                     <p className="text-sm text-gray-800 wrap-break-word mb-1">
//                       {skill.skill || ""}
//                     </p>
//                     {skill.level && (
//                       <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-[#0c0c1e]"
//                           style={{
//                             width: `${(Number(skill.level) / 5) * 100}%`,
//                           }}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No skills added yet.</p>
//             )}
//           </div>
//         </section>

//         {/* Languages */}
//         {isFinalizeData(finalize) &&
//           Array.isArray(finalize.languages) &&
//           finalize.languages.some(
//             (lang) => lang?.name && lang.name.trim() !== "",
//           ) && (
//             <section className="mt-3 px-10">
//               <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//                 Languages
//               </h2>
//               <div className="grid grid-cols-2 gap-x-8 gap-y-3">
//                 {finalize.languages.map(
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
//             </section>
//           )}

//         {/* Certifications and Licenses */}
//         {isFinalizeData(finalize) &&
//           Array.isArray(finalize.certificationsAndLicenses) &&
//           finalize.certificationsAndLicenses.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <section className="mt-3 px-10">
//               <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//                 Certifications and Licenses
//               </h2>
//               <div className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
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
//             </section>
//           )}

//         {/* Hobbies and Interests */}
//         {isFinalizeData(finalize) &&
//           Array.isArray(finalize.hobbiesAndInterests) &&
//           finalize.hobbiesAndInterests.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <section className="mt-3 px-10">
//               <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//                 Hobbies and Interests
//               </h2>
//               <div className="pt-1 pb-2 text-[15px] wrap-break-word">
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
//             </section>
//           )}

//         {/* Awards and Honors */}
//         {isFinalizeData(finalize) &&
//           Array.isArray(finalize.awardsAndHonors) &&
//           finalize.awardsAndHonors.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <section className="mt-3 px-10">
//               <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//                 Awards and Honors
//               </h2>
//               <div className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
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
//             </section>
//           )}

//         {/* Websites and Social Media */}
//         {isFinalizeData(finalize) &&
//           Array.isArray(finalize.websitesAndSocialMedia) &&
//           finalize.websitesAndSocialMedia.some(
//             (item) =>
//               (item?.websiteUrl && item.websiteUrl.trim() !== "") ||
//               (item?.socialMedia && item.socialMedia.trim() !== ""),
//           ) && (
//             <section className="mt-3 px-10">
//               <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//                 Websites and Social Media
//               </h2>
//               <div className="pt-1 pb-2 text-[15px] wrap-break-word">
//                 {finalize.websitesAndSocialMedia.map(
//                   (item, index) =>
//                     ((item?.websiteUrl && item.websiteUrl.trim() !== "") ||
//                       (item?.socialMedia && item.socialMedia.trim() !== "")) && (
//                       <div key={item.id || index} className="mb-2">
//                         {item.websiteUrl && (
//                           <div>
//                             <p className="font-semibold">Website URL:</p>
//                             <a
//                               href={
//                                 item.websiteUrl.startsWith("http")
//                                   ? item.websiteUrl
//                                   : `https://${item.websiteUrl}`
//                               }
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-blue-600 underline wrap-break-word"
//                             >
//                               {item.websiteUrl}
//                             </a>
//                           </div>
//                         )}

//                         {item.socialMedia && (
//                           <div className="mt-2">
//                             <p className="font-semibold">Social Media URL:</p>
//                             <a
//                               href={
//                                 item.socialMedia.startsWith("http")
//                                   ? item.socialMedia
//                                   : `https://${item.socialMedia}`
//                               }
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-blue-600 underline wrap-break-word"
//                             >
//                               {item.socialMedia}
//                             </a>
//                           </div>
//                         )}
//                       </div>
//                     ),
//                 )}
//               </div>
//             </section>
//           )}

//         {/* References */}
//         {isFinalizeData(finalize) &&
//           Array.isArray(finalize.references) &&
//           finalize.references.some(
//             (item) =>
//               item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//           ) && (
//             <section className="mt-2 px-10">
//               <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//                 References
//               </h2>
//               <div className="pt-1 pb-2 text-[15px] wrap-break-word">
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
//             </section>
//           )}

//         {/* Custom Section */}
//         {isFinalizeData(finalize) &&
//           Array.isArray(finalize.customSection) &&
//           finalize.customSection.some(
//             (section) => section?.name?.trim() || section?.description?.trim(),
//           ) && (
//             <div className="mt-1">
//               {finalize.customSection
//                 .filter(
//                   (section) =>
//                     section?.name?.trim() || section?.description?.trim(),
//                 )
//                 .map((section, index) => (
//                   <div key={section.id || index} className="mt-2 px-10">
//                     {/* Show only content, no heading */}
//                     {section.name && (
//                       <p className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//                         {section.name}
//                       </p>
//                     )}

//                     {section.description && (
//                       <div
//                         className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word"
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
  Skill,
} from "@/app/types/context.types";


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

  useEffect(() => {
    let url: string | null = null;
    let objectUrl: string | null = null;

    if (croppedImage) {
      if (typeof croppedImage === "string" && croppedImage.startsWith("blob:")) {
        url = croppedImage;
      } else if (typeof croppedImage === "string") {
        url = `${API_URL}/api/uploads/photos/${croppedImage}`;
      } else if ((croppedImage as any) instanceof Blob || (croppedImage as any) instanceof File) {
        objectUrl = URL.createObjectURL(croppedImage as Blob);
        url = objectUrl;
      }
      setPreviewUrl(url);
    } else if (contact.photo) {
      setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
    } else {
      setPreviewUrl(null);
    }

    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [croppedImage, contact.photo]);

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

  const skillPct = (level: any) => level ? `${(Number(level) / 5) * 100}%` : "0%";
  const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, "") || "";

  /* ======================================================
     SHARED CSS — scoped to .resume-t5 to prevent ANY leakage
     No body rules, no global resets, no Tailwind
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
    .resume-t5 .t5-link-portfolio { background-color: #1f2937; }

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

    /* ── SKILLS GRID ── */
    .resume-t5 .t5-skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 32px;
      row-gap: 10px;
      margin-top: 4px;
    }

    .resume-t5 .t5-skill-name {
      font-size: 13px;
      color: #1f2937;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      margin-bottom: 2px;
      word-wrap: break-word;
    }

    .resume-t5 .t5-skill-bar-wrap {
      height: 4px;
      width: 100%;
      background: #d1d5db;
      border-radius: 9999px;
      overflow: hidden;
    }

    .resume-t5 .t5-skill-bar-fill {
      height: 100%;
      background: #0c0c1e;
      border-radius: 9999px;
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
      .resume-t5 .t5-skill-bar-fill { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

      .resume-t5 .t5-entry { page-break-inside: avoid; break-inside: avoid; }
      .resume-t5 .t5-section-title { page-break-after: avoid; break-after: avoid; }
    }
  `;

  /* ======================================================
     HTML GENERATION — no Tailwind, shared CSS classes
  ====================================================== */
  const generateHTML = () => {
    const addressStr = [contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ");
    const photoHtml = previewUrl
      ? `<img src="${previewUrl}" alt="Profile" class="t5-photo" />`
      : `<div class="t5-photo-placeholder"><span style="color:#9ca3af;font-size:12px;font-family:'Nunito',Arial,sans-serif">No Photo</span></div>`;

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
      </div>
    </div>
    ${linkedinUrl?.trim() || contact?.portfolio?.trim() ? `
    <div class="t5-links">
      ${linkedinUrl?.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="t5-link-btn t5-link-linkedin">LinkedIn</a>` : ""}
      ${contact?.portfolio?.trim() ? `<a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" class="t5-link-btn t5-link-portfolio">Portfolio</a>` : ""}
    </div>` : ""}
  </div>

  <!-- SUMMARY -->
  ${summary ? `
  <div class="t5-section">
    <div class="t5-section-title">Summary</div>
    <div class="t5-extra">${stripHtml(summary)}</div>
  </div>` : ""}

  <!-- EXPERIENCE -->
  ${experiences?.length > 0 ? `
  <div class="t5-section">
    <div class="t5-section-title">Experience</div>
    ${experiences.map((exp) => {
      const start = formatMonthYear(exp.startDate, true);
      const end = exp.endDate ? formatMonthYear(exp.endDate, true) : (exp.startDate ? "Present" : "");
      return `
    <div class="t5-entry">
      ${exp.jobTitle || exp.employer || exp.location ? `
      <div class="t5-entry-heading">
        ${exp.jobTitle || ""}
        ${exp.employer ? `<span class="t5-entry-heading-muted"> — ${exp.employer}</span>` : ""}
        ${exp.location ? `<span class="t5-entry-heading-muted"> — ${exp.location}</span>` : ""}
      </div>` : ""}
      <div class="t5-entry-date">${start}${start && end ? " - " : ""}${end}</div>
      ${exp.text ? `<div class="t5-entry-content">${stripHtml(exp.text)}</div>` : ""}
    </div>`;
    }).join("")}
  </div>` : ""}

  <!-- EDUCATION -->
  ${educations?.length > 0 ? `
  <div class="t5-section">
    <div class="t5-section-title">Education</div>
    ${educations.map((edu) => {
      const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(" — ");
      return `
    <div class="t5-entry">
      ${edu.schoolname ? `<div class="t5-entry-heading">${edu.schoolname}</div>` : ""}
      ${edu.degree ? `<div class="t5-entry-sub">${edu.degree}</div>` : ""}
      ${edu.location ? `<div class="t5-entry-sub">${edu.location}</div>` : ""}
      ${dateStr ? `<div class="t5-entry-date">${dateStr}</div>` : ""}
      ${edu.text ? `<div class="t5-entry-content">${stripHtml(edu.text)}</div>` : ""}
    </div>`;
    }).join("")}
  </div>` : ""}

  <!-- SKILLS -->
  ${skills.length > 0 ? `
  <div class="t5-section">
    <div class="t5-section-title">Skills</div>
    <div class="t5-skills-grid">
      ${skills.map((s) => `
      <div>
        <div class="t5-skill-name">${s.skill || ""}</div>
        ${s.level ? `<div class="t5-skill-bar-wrap"><div class="t5-skill-bar-fill" style="width:${skillPct(s.level)}"></div></div>` : ""}
      </div>`).join("")}
    </div>
  </div>` : ""}

  <!-- LANGUAGES -->
  ${fin.languages.some((l) => l.name?.trim()) ? `
  <div class="t5-section">
    <div class="t5-section-title">Languages</div>
    <div class="t5-skills-grid">
      ${fin.languages.filter((l) => l.name?.trim()).map((l) => `
      <div>
        <div class="t5-skill-name">${l.name}</div>
        ${l.level ? `<div class="t5-skill-bar-wrap"><div class="t5-skill-bar-fill" style="width:${skillPct(l.level)}"></div></div>` : ""}
      </div>`).join("")}
    </div>
  </div>` : ""}

  <!-- CERTIFICATIONS -->
  ${fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
  <div class="t5-section">
    <div class="t5-section-title">Certifications and Licenses</div>
    <div class="t5-extra">${fin.certifications.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
  </div>` : ""}

  <!-- HOBBIES -->
  ${fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
  <div class="t5-section">
    <div class="t5-section-title">Hobbies and Interests</div>
    <div class="t5-extra">${fin.hobbies.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
  </div>` : ""}

  <!-- AWARDS -->
  ${fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
  <div class="t5-section">
    <div class="t5-section-title">Awards and Honors</div>
    <div class="t5-extra">${fin.awards.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
  </div>` : ""}

  <!-- WEBSITES -->
  ${fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) ? `
  <div class="t5-section">
    <div class="t5-section-title">Websites and Social Media</div>
    <div class="t5-extra">
      ${fin.websites.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((i) => `
      <div style="margin-bottom:6px">
        ${i.websiteUrl ? `<div><span class="t5-website-label">Website URL: </span><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="t5-website-link">${i.websiteUrl}</a></div>` : ""}
        ${i.socialMedia ? `<div><span class="t5-website-label">Social Media URL: </span><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="t5-website-link">${i.socialMedia}</a></div>` : ""}
      </div>`).join("")}
    </div>
  </div>` : ""}

  <!-- REFERENCES -->
  ${fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
  <div class="t5-section">
    <div class="t5-section-title">References</div>
    <div class="t5-extra">${fin.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${stripHtml(i.name || "")}</div>`).join("")}</div>
  </div>` : ""}

  <!-- CUSTOM SECTIONS -->
  ${fin.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
  <div class="t5-section">
    ${s.name ? `<div class="t5-section-title">${s.name}</div>` : ""}
    ${s.description ? `<div class="t5-extra">${stripHtml(s.description)}</div>` : ""}
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
      const res = await axios.post(`${API_URL}/api/candidates/generate-pdf`, { html }, { responseType: "blob" });
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
  return (
    <>
      {lastSegment === "download-resume" && (
        <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
          <button onClick={handleDownload} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Download Resume
          </button>
        </div>
      )}

      <div 
              className={`resume-t5  ${alldata ? 'is-preview' : ''}`}

      style={{ margin: "0 auto",           boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" 
 }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
        <style>{styles}</style>

        {/* HEADER */}
        <div className="t5-header">
          <div className="t5-header-top">
            <div className="t5-header-left">
              {previewUrl
                ? <img src={previewUrl} alt="Profile" className="t5-photo" />
                : <div className="t5-photo-placeholder"><IoPersonOutline style={{ width: 40, height: 40, color: "#9ca3af" }} /></div>
              }
              <div>
                <div className="t5-name">{contact?.firstName || ""} {contact?.lastName || ""}</div>
                {contact?.jobTitle && <div className="t5-jobtitle">{getJobTitle(contact.jobTitle)}</div>}
              </div>
            </div>
            <div className="t5-details-block">
              <div className="t5-details-label">DETAILS</div>
              {[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).length > 0 && (
                <div className="t5-details-text">{[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ")}</div>
              )}
              {contact?.phone && <div className="t5-details-text">{contact.phone}</div>}
              {contact?.email && <div className="t5-details-text">{contact.email}</div>}
            </div>
          </div>
          {(linkedinUrl?.trim() || contact?.portfolio?.trim()) && (
            <div className="t5-links">
              {linkedinUrl?.trim() && (
                <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer" className="t5-link-btn t5-link-linkedin">LinkedIn</a>
              )}
              {contact?.portfolio?.trim() && (
                <a href={contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`} target="_blank" rel="noreferrer" className="t5-link-btn t5-link-portfolio">Portfolio</a>
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
              <div key={exp.id || index} className="t5-entry">
                {(exp.jobTitle || exp.employer || exp.location) && (
                  <div className="t5-entry-heading">
                    {exp.jobTitle || ""}
                    {exp.employer && <span className="t5-entry-heading-muted"> — {exp.employer}</span>}
                    {exp.location && <span className="t5-entry-heading-muted"> — {exp.location}</span>}
                  </div>
                )}
                <div className="t5-entry-date">
                  <MonthYearDisplay value={exp.startDate} shortYear={true} />
                  {exp.startDate && (exp.endDate || true) && <span> - </span>}
                  {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear={true} /> : exp.startDate && <span>Present</span>}
                </div>
                {exp.text && <div className="t5-entry-content">{stripHtml(exp.text)}</div>}
              </div>
            ))}
          </div>
        )}

        {/* EDUCATION */}
        {educations?.length > 0 && (
          <div className="t5-section">
            <div className="t5-section-title">Education</div>
            {educations.map((edu, index) => (
              <div key={edu.id || index} className="t5-entry">
                {edu.schoolname && <div className="t5-entry-heading">{edu.schoolname}</div>}
                {edu.degree && <div className="t5-entry-sub">{edu.degree}</div>}
                {edu.location && <div className="t5-entry-sub">{edu.location}</div>}
                {(edu.startDate || edu.endDate) && (
                  <div className="t5-entry-date">{[edu.startDate, edu.endDate].filter(Boolean).join(" — ")}</div>
                )}
                {edu.text && <div className="t5-entry-content">{stripHtml(edu.text)}</div>}
              </div>
            ))}
          </div>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="t5-section">
            <div className="t5-section-title">Skills</div>
            <div className="t5-skills-grid">
              {skills.map((skill, index) => (
                <div key={skill.id || index}>
                  <div className="t5-skill-name">{skill.skill || ""}</div>
                  {skill.level && <div className="t5-skill-bar-wrap"><div className="t5-skill-bar-fill" style={{ width: skillPct(skill.level) }} /></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LANGUAGES */}
        {fin.languages.some((l) => l.name?.trim()) && (
          <div className="t5-section">
            <div className="t5-section-title">Languages</div>
            <div className="t5-skills-grid">
              {fin.languages.filter((l) => l.name?.trim()).map((l, i) => (
                <div key={l._id || i}>
                  <div className="t5-skill-name">{l.name}</div>
                  {l.level && <div className="t5-skill-bar-wrap"><div className="t5-skill-bar-fill" style={{ width: skillPct(l.level) }} /></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS */}
        {fin.certifications.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
          <div className="t5-section">
            <div className="t5-section-title">Certifications and Licenses</div>
            <div className="t5-extra">{fin.certifications.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => <div key={item.id || i}>{stripHtml(item.name || "")}</div>)}</div>
          </div>
        )}

        {/* HOBBIES */}
        {fin.hobbies.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
          <div className="t5-section">
            <div className="t5-section-title">Hobbies and Interests</div>
            <div className="t5-extra">{fin.hobbies.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => <div key={item.id || i}>{stripHtml(item.name || "")}</div>)}</div>
          </div>
        )}

        {/* AWARDS */}
        {fin.awards.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
          <div className="t5-section">
            <div className="t5-section-title">Awards and Honors</div>
            <div className="t5-extra">{fin.awards.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => <div key={item.id || i}>{stripHtml(item.name || "")}</div>)}</div>
          </div>
        )}

        {/* WEBSITES */}
        {fin.websites.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) && (
          <div className="t5-section">
            <div className="t5-section-title">Websites and Social Media</div>
            <div className="t5-extra">
              {fin.websites.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((item, i) => (
                <div key={item.id || i} style={{ marginBottom: "6px" }}>
                  {item.websiteUrl && <div><span className="t5-website-label">Website URL: </span><a href={item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`} target="_blank" rel="noreferrer" className="t5-website-link">{item.websiteUrl}</a></div>}
                  {item.socialMedia && <div><span className="t5-website-label">Social Media URL: </span><a href={item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`} target="_blank" rel="noreferrer" className="t5-website-link">{item.socialMedia}</a></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REFERENCES */}
        {fin.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
          <div className="t5-section">
            <div className="t5-section-title">References</div>
            <div className="t5-extra">{fin.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => <div key={item.id || i}>{stripHtml(item.name || "")}</div>)}</div>
          </div>
        )}

        {/* CUSTOM SECTIONS */}
        {fin.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((section, i) => (
          <div key={section.id || i} className="t5-section">
            {section.name && <div className="t5-section-title">{section.name}</div>}
            {section.description && <div className="t5-extra">{stripHtml(section.description)}</div>}
          </div>
        ))}

      </div>
    </>
  );
};

export default TemplateFive;