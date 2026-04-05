// "use client";
// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// // import MonthYearDisplay from "@/app/utils/MonthYearDisplay";
// import {MonthYearDisplay } from "@/app/utils";

// import { IoPersonOutline } from "react-icons/io5";
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

// interface Resume4Props {
//   alldata?: AllData;
// }

// const TemplateTwo: React.FC<Resume4Props> = ({ alldata }) => {
//   const UseContext = useContext(CreateContext);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || UseContext?.contact || {};
//   const educations = alldata?.educations || UseContext?.education || [];
//   const experiences = alldata?.experiences || UseContext?.experiences || [];
//   const skills = alldata?.skills || UseContext?.skills || [];
//   const finalize = alldata?.finalize || UseContext?.finalize || {};
//   const summary = alldata?.summary || UseContext?.summary || "";
//   const linkedinUrl = contact?.linkedin;
//   const portfolioUrl = contact?.portfolio;

//   useEffect(() => {
//     let url: string | null = null;
//     let objectUrl: string | null = null;

//     if (contact.croppedImage) {
//       if (
//         typeof contact.croppedImage === "string" &&
//         contact.croppedImage.startsWith("blob:")
//       ) {
//         url = contact.croppedImage;
//       } else if (typeof contact.croppedImage === "string") {
//         url = `${API_URL}/api/uploads/photos/${contact.croppedImage}`;
//       } else if (
//         contact.croppedImage &&
//         typeof contact.croppedImage === "object" &&
//         "size" in contact.croppedImage
//       ) {
//         objectUrl = URL.createObjectURL(contact.croppedImage as Blob);
//         url = objectUrl;
//       }
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
//   }, [contact.croppedImage, contact.photo]);

//   const filteredSkills = skills.filter((skill) => skill.skill?.trim());

//   const generateHTML = () => {
//     const getSkillLevelWidth = (level: number | null | undefined) => {
//       if (!level) return "0%";
//       return `${(Number(level) / 5) * 100}%`;
//     };

//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8"/>
//         <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//         <style>
//           /* Import Nunito font */
//           @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

//           /* Reset and base styles */
//           * {
//             margin: 0;
//             padding: 0;
//             box-sizing: border-box;
//           }

//           body {
//             margin: 0;
//             font-family: 'Nunito', sans-serif;
//             background-color: white;
//             line-height: 1.5;
//           }

//           .t2-resume  {
//             width: 210mm;
//             padding: 5mm;
//             box-sizing: border-box;
//             background-color: white;
//             margin: 0 auto;
//           }

//           /* Utility classes */
//           .flex { display: flex; }
//           .items-center { align-items: center; }
//           .justify-center { justify-content: center; }
//           .justify-between { justify-content: space-between; }
//           .gap-1 { gap: 0.25rem; }
//           .gap-2 { gap: 0.5rem; }
//           .gap-3 { gap: 0.75rem; }
//           .gap-4 { gap: 1rem; }
//           .gap-x-8 { column-gap: 2rem; }
//           .gap-y-3 { row-gap: 0.75rem; }

//           .grid { display: grid; }
//           .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }

//           .w-full { width: 100%; }
//           .w-1 { width: 0.25rem; }
//           .w-32 { width: 8rem; }
//           .h-32 { height: 8rem; }
//           .w-\\[22\\%\\] { width: 22%; }
//           .w-\\[68\\%\\] { width: 68%; }
//           .w-\\[40\\%\\] { width: 40%; }
//           .w-\\[60\\%\\] { width: 60%; }

//           .p-0 { padding: 0; }
//           .p-2 { padding: 0.5rem; }
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
//           .pl-10 { padding-left: 2.5rem; }

//           .mt-1 { margin-top: 0.25rem; }
//           .mt-2 { margin-top: 0.5rem; }
//           .mt-4 { margin-top: 1rem; }
//           .mb-1 { margin-bottom: 0.25rem; }
//           .mb-2 { margin-bottom: 0.5rem; }
//           .mb-4 { margin-bottom: 1rem; }
//           .mx-1 { margin-left: 0.25rem; margin-right: 0.25rem; }
//           .mx-2 { margin-left: 0.5rem; margin-right: 0.5rem; }
//           .mx-auto { margin-left: auto; margin-right: auto; }

//           .border { border-width: 1px; border-style: solid; }
//           .border-b { border-bottom-width: 1px; border-bottom-style: solid; }
//           .border-l { border-left-width: 1px; border-left-style: solid; }
//           .border-gray-100 { border-color: #f3f4f6; }
//           .border-gray-200 { border-color: #e5e7eb; }
//           .border-gray-300 { border-color: #d1d5db; }
//           .border-black { border-color: #000; }

//           .rounded-md { border-radius: 0.375rem; }
//           .rounded-full { border-radius: 9999px; }
//           .rounded-tl-3xl { border-top-left-radius: 1.5rem; }
//           .rounded-tr-3xl { border-top-right-radius: 1.5rem; }

//           .bg-\\[\\#EADCCE\\] { background-color: #EADCCE; }
//           .bg-\\[\\#0c0c1e\\] { background-color: #0c0c1e; }
//           .bg-gray-300 { background-color: #d1d5db; }
//           .bg-white { background-color: white; }

//           .text-xs { font-size: 0.75rem; }
//           .text-sm { font-size: 0.875rem; }
//           .text-base { font-size: 1rem; }
//           .text-lg { font-size: 1.125rem; }
//           .text-xl { font-size: 1.25rem; }
//           .text-3xl { font-size: 1.875rem; }
//           .text-\\[11\\.5px\\] { font-size: 11.5px; }
//           .text-\\[12px\\] { font-size: 12px; }
//           .text-\\[13px\\] { font-size: 13px; }
//           .text-\\[15px\\] { font-size: 15px; }

//           .font-normal { font-weight: 400; }
//           .font-medium { font-weight: 500; }
//           .font-semibold { font-weight: 600; }
//           .font-bold { font-weight: 700; }
//           .font-serif { font-family: serif; }

//           .text-gray-400 { color: #9ca3af; }
//           .text-gray-500 { color: #6b7280; }
//           .text-gray-600 { color: #4b5563; }
//           .text-gray-700 { color: #374151; }
//           .text-gray-800 { color: #1f2937; }
//           .text-black { color: #000; }

//           .tracking-wide { letter-spacing: 0.025em; }
//           .leading-tight { line-height: 1.25; }
//           .leading-snug { line-height: 1.375; }
//           .capitalize { text-transform: capitalize; }
//           .uppercase { text-transform: uppercase; }
//           .underline { text-decoration: underline; }
//           .underline-offset-4 { text-underline-offset: 4px; }
//           .decoration-2 { text-decoration-thickness: 2px; }
//           .decoration-gray-800 { text-decoration-color: #1f2937; }

//           .object-cover { object-fit: cover; }
//           .overflow-hidden { overflow: hidden; }
//           .h-1 { height: 0.25rem; }
//           .wrap-break-word { word-wrap: break-word; overflow-wrap: break-word; }

//           /* List styles */
//           .list-disc { list-style-type: disc; }
//           .list-decimal { list-style-type: decimal; }
//           .ml-4 { margin-left: 1rem; }
//           [class*="list-disc"] { list-style-type: disc; }
//           [class*="list-decimal"] { list-style-type: decimal; }
//           .skill-level {
//     height: 100%;
//     background: #333;
//     border-radius: 2px;
//   }

//           /* Print styles */
//           @media print {
//             body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//             .t2-resume  { width: 100%; padding: 0; }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="t2-resume ">

//           <!-- HEADER -->
//           <div class="flex bg-[#EADCCE] py-2 rounded-tl-3xl rounded-tr-3xl border-b border-gray-300 mx-auto">
//             <div class="flex justify-center items-center w-[22%] p-2">
//               ${
//                 previewUrl
//                   ? `
//                 <img src="${previewUrl}" alt="Profile" class="w-32 h-32 rounded-md object-cover border border-gray-200" />
//               `
//                   : `
//                 <div class="w-32 h-32 rounded-md border border-gray-200 flex items-center justify-center">
//                   <span class="text-gray-400">No Photo</span>
//                 </div>
//               `
//               }
//             </div>
//             <div class="w-[68%] pl-10">
//               <p class="text-3xl tracking-wide text-gray-800 leading-tight capitalize">
//                 ${contact?.firstName || ""}
//                 <span class="mx-2 capitalize">${contact?.lastName || ""}</span>
//               </p>
//               <p class="text-xs py-1 text-[12px] leading-snug">
//                 ${[contact?.address, contact?.city, contact?.country, contact?.postcode].filter(Boolean).join(", ")}
//               </p>
//               <p class="text-xs font-serif">${contact?.email || ""}</p>
//               <p class="text-xs py-2">${contact?.phone || ""}</p>
//               <div class="flex items-center p-0 gap-4 mt-1">
//                 ${
//                   linkedinUrl && linkedinUrl.trim()
//                     ? `
//                   <a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-black text-sm">
//                     <p class="text-[13px] font-bold underline">LinkedIn</p>
//                   </a>
//                 `
//                     : ""
//                 }
//                 ${
//                   portfolioUrl && portfolioUrl.trim()
//                     ? `
//                   <a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-black text-sm">
//                     <p class="text-[13px] font-bold underline">Portfolio</p>
//                   </a>
//                 `
//                     : ""
//                 }
//               </div>
//             </div>
//           </div>

//           <!-- BODY -->
//           <div class="flex gap-3 mx-auto">
//             <!-- LEFT SIDE -->
//             <div class="pt-2 pl-5 w-[40%]">
//               <!-- SUMMARY -->
//               ${
//                 summary
//                   ? `
//                 <div class="mb-2">
//                   <p class="text-[15px] font-semibold underline underline-offset-4 decoration-2 decoration-gray-800 mb-2 tracking-wide">SUMMARY</p>
//                   <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">${summary.replace(/<[^>]*>/g, "")}</div>
//                 </div>
//               `
//                   : ""
//               }

//               <!-- SKILLS -->
//              <!-- SKILLS -->
// ${filteredSkills.length > 0 ? `
//   <div class="w-full max-w-md mx-auto rounded-2xl mb-4">
//     <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Skills</p>
//     <div class="grid grid-cols-2 gap-x-8 gap-y-3">
//       ${filteredSkills.map((skill) => `
//         <div>
//           <p class="text-sm text-gray-800 mb-1">${skill.skill || ""}</p>
//           ${skill.level ? `
//             <div class="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//               <div class="h-full bg-[#0c0c1e] skill-level" style="width: ${(Number(skill.level) / 5) * 100}%"></div>
//             </div>
//           ` : ""}
//         </div>

//       `).join("")}
//     </div>
//   </div>
// ` : ""}

//               <!-- LANGUAGES -->
//               ${
//                 Array.isArray(finalize?.languages) &&
//                 finalize.languages.some((lang) => lang.name?.trim())
//                   ? `
//                 <div class="mt-2 mb-4">
//                   <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Languages</p>
//                   <div class="grid grid-cols-2 gap-x-8 gap-y-3">
//                     ${finalize.languages
//                       .filter((lang) => lang.name?.trim())
//                       .map(
//                         (lang) => `
//                       <div>
//                         <p class="text-sm wrap-break-word text-gray-800 mb-1">${lang.name}</p>
//                         ${
//                           lang.level
//                             ? `
//                           <div class="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//                             <div class="h-full bg-[#0c0c1e]" style="width: ${getSkillLevelWidth(Number(lang.level))}"></div>
//                           </div>
//                         `
//                             : ""
//                         }
//                       </div>
//                     `,
//                       )
//                       .join("")}
//                   </div>
//                 </div>
//               `
//                   : ""
//               }

//               <!-- CERTIFICATIONS AND LICENSES -->
//               ${
//                 Array.isArray(finalize?.certificationsAndLicenses) &&
//                 finalize.certificationsAndLicenses.some((item) =>
//                   item.name?.replace(/<[^>]*>/g, "").trim(),
//                 )
//                   ? `
//                 <div class="mt-2 mb-4">
//                   <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Certifications & Licenses</p>
//                   <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
//                     ${finalize.certificationsAndLicenses
//                       .filter((item) =>
//                         item.name?.replace(/<[^>]*>/g, "").trim(),
//                       )
//                       .map(
//                         (item) => `
//                       <div>${item.name?.replace(/<[^>]*>/g, "")}</div>
//                     `,
//                       )
//                       .join("")}
//                   </div>
//                 </div>
//               `
//                   : ""
//               }

//               <!-- HOBBIES AND INTERESTS -->
//               ${
//                 Array.isArray(finalize?.hobbiesAndInterests) &&
//                 finalize.hobbiesAndInterests.some((item) =>
//                   item.name?.replace(/<[^>]*>/g, "").trim(),
//                 )
//                   ? `
//                 <div class="mt-2 mb-4">
//                   <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Hobbies & Interests</p>
//                   <div class="pt-1 pb-2 text-gray-500 text-[15px] wrap-break-word">
//                     ${finalize.hobbiesAndInterests
//                       .filter((item) =>
//                         item.name?.replace(/<[^>]*>/g, "").trim(),
//                       )
//                       .map(
//                         (item) => `
//                       <div>${item.name?.replace(/<[^>]*>/g, "")}</div>
//                     `,
//                       )
//                       .join("")}
//                   </div>
//                 </div>
//               `
//                   : ""
//               }

//               <!-- AWARDS AND HONORS -->
//               ${
//                 Array.isArray(finalize?.awardsAndHonors) &&
//                 finalize.awardsAndHonors.some((item) =>
//                   item.name?.replace(/<[^>]*>/g, "").trim(),
//                 )
//                   ? `
//                 <div class="mt-2 mb-4">
//                   <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Awards & Honors</p>
//                   <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
//                     ${finalize.awardsAndHonors
//                       .filter((item) =>
//                         item.name?.replace(/<[^>]*>/g, "").trim(),
//                       )
//                       .map(
//                         (item) => `
//                       <div>${item.name?.replace(/<[^>]*>/g, "")}</div>
//                     `,
//                       )
//                       .join("")}
//                   </div>
//                 </div>
//               `
//                   : ""
//               }

//               <!-- REFERENCES -->
//               ${
//                 Array.isArray(finalize?.references) &&
//                 finalize.references.some((item) =>
//                   item.name?.replace(/<[^>]*>/g, "").trim(),
//                 )
//                   ? `
//                 <div class="mt-2">
//                   <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">References</p>
//                   <div class="pt-1 pb-2 text-gray-500 text-[15px] wrap-break-word">
//                     ${finalize.references
//                       .filter((item) =>
//                         item.name?.replace(/<[^>]*>/g, "").trim(),
//                       )
//                       .map(
//                         (item) => `
//                       <div>${item.name?.replace(/<[^>]*>/g, "")}</div>
//                     `,
//                       )
//                       .join("")}
//                   </div>
//                 </div>
//               `
//                   : ""
//               }
//             </div>

//             <div class="w-1 border-l border-gray-300 mx-1"></div>

//             <!-- RIGHT SIDE -->
//             <div class="w-[60%]">
//               <div class="w-full pt-2 pr-5">
//                 <!-- EXPERIENCE -->
//                 ${
//                   experiences?.length > 0
//                     ? `
//                   <div>
//                     <p class="text-[15px] font-semibold underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">EXPERIENCE</p>
//                     ${experiences
//                       .map(
//                         (exp) => `
//                       <div class="mb-4">
//                         <div class="flex justify-between items-center mt-1 mb-2">
//                           ${exp.jobTitle ? `<i class="text-[11.5px] font-semibold">${exp.jobTitle}</i>` : ""}
//                           <div class="flex justify-center items-center text-[11.5px] font-semibold gap-1">
//                             ${exp.startDate ? exp.startDate : ""}
//                             ${exp.startDate && exp.endDate ? `<span>-</span>` : ""}
//                             ${exp.endDate ? exp.endDate : exp.startDate ? "Present" : ""}
//                           </div>
//                         </div>
//                         ${
//                           exp.location || exp.employer
//                             ? `
//                           <p class="text-[12px] text-gray-700 mb-2">
//                             ${[exp.location, exp.employer].filter(Boolean).join(" - ")}
//                           </p>
//                         `
//                             : ""
//                         }
//                         ${
//                           exp.text
//                             ? `
//                           <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">${exp.text.replace(/<[^>]*>/g, "")}</div>
//                         `
//                             : ""
//                         }
//                       </div>
//                     `,
//                       )
//                       .join("")}
//                   </div>
//                 `
//                     : ""
//                 }

//                 <!-- EDUCATION -->
//                 ${
//                   educations?.length > 0
//                     ? `
//                   <div>
//                     <p class="text-[15px] font-semibold underline underline-offset-4 mb-3 mt-4 decoration-2 decoration-gray-800">EDUCATION</p>
//                     ${educations
//                       .map(
//                         (edu) => `
//                       <div class="mb-4">
//                         <div class="flex justify-between items-center mt-1 mb-2">
//                           <i class="text-[11.5px] font-semibold">${edu.schoolname || ""}</i>
//                           <div class="flex justify-center items-center text-[11.5px] font-semibold gap-1">
//                             ${
//                               edu.startDate || edu.endDate
//                                 ? `
//                               ${edu.startDate || ""}
//                               ${edu.startDate && edu.endDate ? `<span>-</span>` : ""}
//                               ${edu.endDate || ""}
//                             `
//                                 : ""
//                             }
//                           </div>
//                         </div>
//                         ${
//                           edu.location || edu.degree
//                             ? `
//                           <p class="text-[12px] text-gray-700 mb-2">
//                             ${[edu.location, edu.degree].filter(Boolean).join(" - ")}
//                           </p>
//                         `
//                             : ""
//                         }
//                         ${
//                           edu.text
//                             ? `
//                           <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">${edu.text.replace(/<[^>]*>/g, "")}</div>
//                         `
//                             : ""
//                         }
//                       </div>
//                     `,
//                       )
//                       .join("")}
//                   </div>
//                 `
//                     : ""
//                 }

//                 <!-- WEBSITES AND SOCIAL MEDIA -->
//                 ${
//                   Array.isArray(finalize?.websitesAndSocialMedia) &&
//                   finalize.websitesAndSocialMedia.some(
//                     (item) =>
//                       item.websiteUrl?.trim() || item.socialMedia?.trim(),
//                   )
//                     ? `
//                   <div class="mt-4">
//                     <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Websites & Social Media</p>
//                     <div class="pt-1 pb-2 text-[15px] wrap-break-word">
//                       ${finalize.websitesAndSocialMedia
//                         .filter(
//                           (item) =>
//                             item.websiteUrl?.trim() || item.socialMedia?.trim(),
//                         )
//                         .map(
//                           (item) => `
//                         <div class="mb-2">
//                           ${
//                             item.websiteUrl
//                               ? `
//                             <div>
//                               <p class="font-semibold">Website:</p>
//                               <a href="${item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`}" class="text-gray-500 underline wrap-break-word">
//                                 ${item.websiteUrl}
//                               </a>
//                             </div>
//                           `
//                               : ""
//                           }
//                           ${
//                             item.socialMedia
//                               ? `
//                             <div class="mt-2">
//                               <p class="font-semibold">Social Media:</p>
//                               <a href="${item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`}" class="text-gray-500 underline wrap-break-word">
//                                 ${item.socialMedia}
//                               </a>
//                             </div>
//                           `
//                               : ""
//                           }
//                         </div>
//                       `,
//                         )
//                         .join("")}
//                     </div>
//                   </div>
//                 `
//                     : ""
//                 }

//                 <!-- CUSTOM SECTION -->
//                 ${
//                   Array.isArray(finalize?.customSection) &&
//                   finalize.customSection.some(
//                     (section) =>
//                       section?.name?.trim() || section?.description?.trim(),
//                   )
//                     ? `
//                   <div class="mt-4">
//                     ${finalize.customSection
//                       .filter(
//                         (section) =>
//                           section?.name?.trim() || section?.description?.trim(),
//                       )
//                       .map(
//                         (section) => `
//                       <div class="mt-2">
//                         ${
//                           section.name
//                             ? `
//                           <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">${section.name}</p>
//                         `
//                             : ""
//                         }
//                         ${
//                           section.description
//                             ? `
//                           <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">${section.description.replace(/<[^>]*>/g, "")}</div>
//                         `
//                             : ""
//                         }
//                       </div>
//                     `,
//                       )
//                       .join("")}
//                   </div>
//                 `
//                     : ""
//                 }
//               </div>
//             </div>
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

//       <div
//         className={`bg-white border border-gray-100 font-nunito mx-auto `}
//         style={{
//           width: "210mm",
//           padding: "5mm",
//           boxSizing: "border-box",
//             minHeight: "297mm"

//         }}
//       >
//         {/* header */}
//         <div className="flex bg-[#EADCCE] py-2 rounded-tl-3xl rounded-tr-3xl border-b border-gray-300 mx-auto">
//           <div className="flex justify-center items-center w-[22%] p-2">
//             {previewUrl ? (
//               <img
//                 src={previewUrl}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-md object-cover border"
//               />
//             ) : (
//               <IoPersonOutline className="w-32 h-32 text-gray-400" />
//             )}
//           </div>
//           <div className="w-[68%] pl-10">
//             <p className="text-3xl tracking-wide text-gray-800 leading-tight capitalize">
//               {contact?.firstName || ""}
//               <span className="mx-2 capitalize">{contact?.lastName || ""}</span>
//             </p>
//             <p className="text-xs py-1 text-[12px] leading-snug">
//               {[
//                 contact?.address,
//                 contact?.city,
//                                 contact?.postcode,
//                 contact?.country,
//               ]
//                 .filter(Boolean)
//                 .join(", ")}
//             </p>
//             <p className="text-xs font-serif">{contact?.email || ""}</p>
//             <p className="text-xs py-2">{contact?.phone || ""}</p>
//             <div className="flex items-center p-0 gap-4 mt-1">
//               {linkedinUrl && linkedinUrl.trim() && (
//                 <a
//                   href={
//                     linkedinUrl.startsWith("http")
//                       ? linkedinUrl
//                       : `https://${linkedinUrl}`
//                   }
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-black text-sm"
//                 >
//                   <p className="text-[13px] font-bold underline">LinkedIn</p>
//                 </a>
//               )}
//               {portfolioUrl && portfolioUrl.trim() && (
//                 <a
//                   href={
//                     portfolioUrl.startsWith("http")
//                       ? portfolioUrl
//                       : `https://${portfolioUrl}`
//                   }
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-black text-sm"
//                 >
//                   <p className="text-[13px] font-bold underline">Portfolio</p>
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* body */}
//         <div className="flex gap-3 mx-auto">
//           {/* left side */}
//           <div className="pt-2 pl-5 w-[40%]">
//             {/* summary */}
//             {summary && (
//               <div className="mb-2">
//                 <p className="text-[15px] font-semibold underline underline-offset-4 decoration-2 decoration-gray-800 mb-2 tracking-wide">
//                   SUMMARY
//                 </p>
//                 <div
//                   className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4"
//                   dangerouslySetInnerHTML={{ __html: summary }}
//                 />
//               </div>
//             )}

//             {/* skills */}
//             {filteredSkills.length > 0 && (
//               <div className="w-full max-w-md mx-auto rounded-2xl mb-4">
//                 <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                   Skills
//                 </p>
//                 <div className="grid grid-cols-2 gap-x-8 gap-y-3">
//                   {filteredSkills.map((skill,index) => (
//                     <div key={index}>
//                       <p className="text-sm text-gray-800 mb-1">
//                         {skill.skill || ""}
//                       </p>
//                       {skill.skill && skill.level && (
//                         <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//                           <div
//                             className="h-full bg-[#0c0c1e]"
//                             style={{
//                               width: `${(Number(skill.level) / 5) * 100}%`,
//                             }}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Languages */}
//             {Array.isArray(finalize?.languages) &&
//               finalize.languages.some(
//                 (lang) => lang.name && lang.name.trim() !== "",
//               ) && (
//                 <div className="mt-2 mb-4">
//                   <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                     Languages
//                   </p>
//                   <div className="grid grid-cols-2 gap-x-8 gap-y-3">
//                     {finalize.languages.map(
//                       (lang, index) =>
//                         lang.name &&
//                         lang.name.trim() !== "" && (
//                           <div key={lang._id || index}>
//                             <p className="text-sm wrap-break-word text-gray-800 mb-1">
//                               {lang.name}
//                             </p>
//                             {lang.level && (
//                               <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//                                 <div
//                                   className="h-full bg-[#0c0c1e]"
//                                   style={{
//                                     width: `${(Number(lang.level) / 5) * 100}%`,
//                                   }}
//                                 />
//                               </div>
//                             )}
//                           </div>
//                         ),
//                     )}
//                   </div>
//                 </div>
//               )}

//             {/* Certifications and Licenses */}
//             {Array.isArray(finalize?.certificationsAndLicenses) &&
//               finalize.certificationsAndLicenses.some(
//                 (item) =>
//                   item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//               ) && (
//                 <div className="mt-2 mb-4">
//                   <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                     Certifications and Licenses
//                   </p>
//                   <div className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4">
//                     {finalize.certificationsAndLicenses.map(
//                       (item, index) =>
//                         item.name &&
//                         item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                           <div
//                             key={item.id || index}
//                             dangerouslySetInnerHTML={{ __html: item.name }}
//                           />
//                         ),
//                     )}
//                   </div>
//                 </div>
//               )}

//             {/* Hobbies and Interests */}
//             {Array.isArray(finalize?.hobbiesAndInterests) &&
//               finalize.hobbiesAndInterests.some(
//                 (item) =>
//                   item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//               ) && (
//                 <div className="mt-2 mb-4">
//                   <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                     Hobbies and Interests
//                   </p>
//                   <div className="pt-1 pb-2 text-gray-500 text-[15px] wrap-break-word">
//                     {finalize.hobbiesAndInterests.map(
//                       (item, index) =>
//                         item.name &&
//                         item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                           <div
//                             key={item.id || index}
//                             dangerouslySetInnerHTML={{ __html: item.name }}
//                           />
//                         ),
//                     )}
//                   </div>
//                 </div>
//               )}

//             {/* Awards and Honors */}
//             {Array.isArray(finalize?.awardsAndHonors) &&
//               finalize.awardsAndHonors.some(
//                 (item) =>
//                   item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//               ) && (
//                 <div className="mt-2 mb-4">
//                   <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                     Awards and Honors
//                   </p>
//                   <div className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4">
//                     {finalize.awardsAndHonors.map(
//                       (item, index) =>
//                         item.name &&
//                         item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                           <div
//                             key={item.id || index}
//                             dangerouslySetInnerHTML={{ __html: item.name }}
//                           />
//                         ),
//                     )}
//                   </div>
//                 </div>
//               )}

//             {/* References */}
//             {Array.isArray(finalize?.references) &&
//               finalize.references.some(
//                 (item) =>
//                   item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//               ) && (
//                 <div className="mt-2">
//                   <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                     References
//                   </p>
//                   <div className="pt-1 pb-2 text-gray-500 text-[15px] wrap-break-word">
//                     {finalize.references.map(
//                       (item, index) =>
//                         item.name &&
//                         item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                           <div
//                             key={item.id || index}
//                             dangerouslySetInnerHTML={{ __html: item.name }}
//                           />
//                         ),
//                     )}
//                   </div>
//                 </div>
//               )}
//           </div>

//           <div className="w-1 border-l border-gray-300 mx-1" />

//           {/* right side */}
//           <div className="w-[60%]">
//             <div className="w-full pt-2 pr-5">
//               {/* experience */}
//               {experiences?.length > 0 && (
//                 <div>
//                   <p className="text-[15px] font-semibold underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                     EXPERIENCE
//                   </p>
//                   {experiences.map((exp, index) => (
//                     <div key={exp.id || index} className="mb-4">
//                       <div className="flex justify-between items-center mt-1 mb-2">
//                         {exp.jobTitle && (
//                           <i className="text-[11.5px] font-semibold">
//                             {exp.jobTitle}
//                           </i>
//                         )}
//                         <div className="flex justify-center items-center text-[11.5px] font-semibold gap-1">
//                           <MonthYearDisplay
//                             value={exp.startDate}
//                             shortYear={true}
//                           />
//                           {exp.startDate && exp.endDate && <span>-</span>}
//                           {exp.endDate ? (
//                             <MonthYearDisplay
//                               value={exp.endDate}
//                               shortYear={true}
//                             />
//                           ) : (
//                             exp.startDate && <span>Present</span>
//                           )}
//                         </div>
//                       </div>

//                       {(exp.location || exp.employer) && (
//                         <p className="text-[12px] text-gray-700 mb-2">
//                           {[exp.location, exp.employer]
//                             .filter(Boolean)
//                             .join(" - ")}
//                         </p>
//                       )}

//                       {exp.text && (
//                         <div
//                           className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4"
//                           dangerouslySetInnerHTML={{ __html: exp.text }}
//                         />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* education */}
//               {educations?.length > 0 && (
//                 <div>
//                   <p className="text-[15px] font-semibold underline underline-offset-4 mb-3 mt-4 decoration-2 decoration-gray-800">
//                     EDUCATION
//                   </p>
//                   {educations.map((edu, index) => (
//                     <div key={edu.id || index} className="mb-4">
//                       <div className="flex justify-between items-center mt-1 mb-2">
//                         <i className="text-[11.5px] font-semibold">
//                           {edu.schoolname || ""}
//                         </i>
//                         <div className="flex justify-center items-center text-[11.5px] font-semibold gap-1">
//                           {(edu.startDate || edu.endDate) && (
//                             <>
//                               <MonthYearDisplay
//                                 value={edu.startDate}
//                                 shortYear={true}
//                               />
//                               {edu.startDate && edu.endDate && (
//                                 <hr className="w-3 border-l border-black" />
//                               )}
//                               <MonthYearDisplay
//                                 value={edu.endDate}
//                                 shortYear={true}
//                               />
//                             </>
//                           )}
//                         </div>
//                       </div>

//                       {(edu.location || edu.degree) && (
//                         <p className="text-[12px] text-gray-700 mb-2">
//                           {[edu.location, edu.degree]
//                             .filter(Boolean)
//                             .join(" - ")}
//                         </p>
//                       )}

//                       {edu.text && (
//                         <div
//                           className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4"
//                           dangerouslySetInnerHTML={{ __html: edu.text }}
//                         />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Websites and Social Media */}
//               {Array.isArray(finalize?.websitesAndSocialMedia) &&
//                 finalize.websitesAndSocialMedia.some(
//                   (item) =>
//                     (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//                     (item.socialMedia && item.socialMedia.trim() !== ""),
//                 ) && (
//                   <div className="mt-4">
//                     <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                       Websites and Social Media
//                     </p>
//                     <div className="pt-1 pb-2 text-[15px] wrap-break-word">
//                       {finalize.websitesAndSocialMedia.map(
//                         (item, index) =>
//                           ((item.websiteUrl && item.websiteUrl.trim() !== "") ||
//                             (item.socialMedia &&
//                               item.socialMedia.trim() !== "")) && (
//                             <div key={item.id || index} className="mb-2">
//                               {item.websiteUrl && (
//                                 <div>
//                                   <p className="font-semibold">Website URL:</p>
//                                   <a
//                                     href={
//                                       item.websiteUrl.startsWith("http")
//                                         ? item.websiteUrl
//                                         : `https://${item.websiteUrl}`
//                                     }
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-gray-500 underline wrap-break-word"
//                                   >
//                                     {item.websiteUrl}
//                                   </a>
//                                 </div>
//                               )}
//                               {item.socialMedia && (
//                                 <div className="mt-2">
//                                   <p className="font-semibold">
//                                     Social Media URL:
//                                   </p>
//                                   <a
//                                     href={
//                                       item.socialMedia.startsWith("http")
//                                         ? item.socialMedia
//                                         : `https://${item.socialMedia}`
//                                     }
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-gray-500 underline wrap-break-word"
//                                   >
//                                     {item.socialMedia}
//                                   </a>
//                                 </div>
//                               )}
//                             </div>
//                           ),
//                       )}
//                     </div>
//                   </div>
//                 )}

//               {/* Custom Section */}
//               {Array.isArray(finalize?.customSection) &&
//                 finalize.customSection.some(
//                   (section) =>
//                     section?.name?.trim() || section?.description?.trim(),
//                 ) && (
//                   <div className="mt-4">
//                     {finalize.customSection
//                       .filter(
//                         (section) =>
//                           section?.name?.trim() || section?.description?.trim(),
//                       )
//                       .map((section, index) => (
//                         <div key={section.id || index} className="mt-2">
//                           {section.name && (
//                             <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                               {section.name}
//                             </p>
//                           )}

//                           {section.description && (
//                             <div
//                               className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4"
//                               dangerouslySetInnerHTML={{
//                                 __html: section.description,
//                               }}
//                             />
//                           )}
//                         </div>
//                       ))}
//                   </div>
//                 )}
//             </div>
//           </div>
//         </div>
//       </div>

//     </>
//   );
// };

// export default TemplateTwo;

// "use client";
// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { MonthYearDisplay, formatMonthYear } from "@/app/utils";
// import { IoPersonOutline } from "react-icons/io5";
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

// interface Resume4Props {
//   alldata?: AllData;
// }

// const TemplateTwo: React.FC<Resume4Props> = ({ alldata }) => {
//   const UseContext = useContext(CreateContext);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();

//   const contact = alldata?.contact || UseContext?.contact || {};
//   const educations = alldata?.educations || UseContext?.education || [];
//   const experiences = alldata?.experiences || UseContext?.experiences || [];
//   const skills = alldata?.skills || UseContext?.skills || [];
//   const finalize = alldata?.finalize || UseContext?.finalize || {};
//   const summary = alldata?.summary || UseContext?.summary || "";
//   const linkedinUrl = contact?.linkedin;
//   const portfolioUrl = contact?.portfolio;

//   useEffect(() => {
//     let url: string | null = null;
//     let objectUrl: string | null = null;

//     if (contact.croppedImage) {
//       if (
//         typeof contact.croppedImage === "string" &&
//         contact.croppedImage.startsWith("blob:")
//       ) {
//         url = contact.croppedImage;
//       } else if (typeof contact.croppedImage === "string") {
//         url = `${API_URL}/api/uploads/photos/${contact.croppedImage}`;
//       } else if (
//         contact.croppedImage &&
//         typeof contact.croppedImage === "object" &&
//         "size" in contact.croppedImage
//       ) {
//         objectUrl = URL.createObjectURL(contact.croppedImage as Blob);
//         url = objectUrl;
//       }
//       setPreviewUrl(url);
//     } else if (contact.photo) {
//       setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
//     } else {
//       setPreviewUrl(null);
//     }

//     return () => {
//       if (objectUrl) URL.revokeObjectURL(objectUrl);
//     };
//   }, [contact.croppedImage, contact.photo]);

//   const filteredSkills = skills.filter((skill) => skill.skill?.trim());

//   /* ======================================================
//      SHARED CSS — identical output in browser + PDF renderer
//      Rules:
//      - No @import (PDF ignores it) → use <link> in generateHTML
//      - No Tailwind classes in generateHTML → all styles here
//      - font-family on every element explicitly
//      - p { margin:0 } globally to prevent PDF spacing blowout
//      - line-height locked to 1.5 everywhere
//   ====================================================== */
//   const styles = `

//     body {
//       font-family: 'Nunito', Arial, sans-serif;
//       background-color: white;
//       font-size: 13px;
//       line-height: 1.5;
//       color: #1f2937;
//       text-align: left;
//     }

//     /* Global resets to prevent PDF renderer adding extra space */
//     p, div, span, i, a {
//       margin: 0;
//       padding: 0;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     ul, ol {
//       margin: 0 !important;
//       padding: 0 !important;
//     }

//     li {
//       margin-top: 0 !important;
//       margin-bottom: 1px !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }

//     ul { list-style-type: disc !important; padding-left: 16px !important; }
//     ol { list-style-type: decimal !important; padding-left: 16px !important; }

//     /* ── CONTAINER ── */
//     .t2-resume  {
//       width: 210mm;
//       min-height: 297mm;
//       padding: 5mm;
//       box-sizing: border-box;
//       background-color: white;
//       font-family: 'Nunito', Arial, sans-serif;
//       font-size: 13px;
//       line-height: 1.5;
//       text-align: left;
//     }

//     /* ── HEADER ── */
//     .header-wrap {
//       display: flex;
//       background-color: #EADCCE;
//       padding: 8px 0;
//       border-radius: 24px 24px 0 0;
//       border-bottom: 1px solid #d1d5db;
//     }

//     .header-photo-col {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       width: 22%;
//       padding: 8px;
//     }

//     .header-photo {
//       width: 128px;
//       height: 128px;
//       border-radius: 6px;
//       object-fit: cover;
//       border: 1px solid #e5e7eb;
//     }

//     .header-photo-placeholder {
//       width: 128px;
//       height: 128px;
//       border-radius: 6px;
//       border: 1px solid #e5e7eb;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background: #f9fafb;
//     }

//     .header-photo-placeholder span {
//       color: #9ca3af;
//       font-size: 12px;
//       font-family: 'Nunito', Arial, sans-serif;
//     }

//     .header-info-col {
//       width: 78%;
//       padding-left: 40px;
//       padding-right: 12px;
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//     }

//     .header-name {
//       font-size: 28px;
//       font-weight: 400;
//       letter-spacing: 0.025em;
//       color: #1f2937;
//       line-height: 1.25;
//       text-transform: capitalize;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 3px;
//     }

//     .header-address {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 1px;
//     }

//     .header-email {
//       font-size: 11px;
//       color: #374151;
//       font-family: serif, 'Nunito', Arial;
//       line-height: 1.5;
//       margin-bottom: 1px;
//     }

//     .header-phone {
//       font-size: 11px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       margin-bottom: 4px;
//     }

//     .header-links {
//       display: flex;
//       gap: 16px;
//       align-items: center;
//     }

//     .header-link {
//       font-size: 12px;
//       font-weight: 700;
//       color: #000;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//       font-family: 'Nunito', Arial, sans-serif;
//     }

//     /* ── BODY ── */
//     .body-wrap {
//       display: flex;
//       gap: 12px;
//     }

//     /* ── LEFT COLUMN ── */
//     .left-col {
//       width: 40%;
//       padding-top: 8px;
//       padding-left: 20px;
//     }

//     /* ── DIVIDER ── */
//     .col-divider {
//       width: 1px;
//       border-left: 1px solid #d1d5db;
//       margin: 0 4px;
//       flex-shrink: 0;
//     }

//     /* ── RIGHT COLUMN ── */
//     .right-col {
//       width: 60%;
//       padding-top: 8px;
//       padding-right: 20px;
//     }

//     /* ── SECTION TITLE ── */
//     .section-title {
//       font-size: 13px;
//       font-weight: 700;
//       text-decoration: underline;
//       text-underline-offset: 3px;
//       text-decoration-thickness: 2px;
//       text-decoration-color: #1f2937;
//       letter-spacing: 0.03em;
//       text-transform: uppercase;
//       color: #111827;
//       margin-bottom: 6px;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     /* ── SUMMARY ── */
//     .summary-block {
//       margin-bottom: 10px;
//     }

//     .summary-text {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .summary-text p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

//     /* ── SKILLS ── */
//     .skills-block {
//       margin-bottom: 12px;
//     }

//     .skills-grid {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       column-gap: 20px;
//       row-gap: 8px;
//     }

//     .skill-name {
//       font-size: 12px;
//       color: #1f2937;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       margin-bottom: 2px;
//     }

//     .skill-bar-wrap {
//       height: 4px;
//       width: 100%;
//       background: #d1d5db;
//       border-radius: 9999px;
//       overflow: hidden;
//     }

//     .skill-bar-fill {
//       height: 100%;
//       background: #0c0c1e;
//       border-radius: 9999px;
//     }

//     /* ── LANGUAGES ── */
//     .lang-block {
//       margin-top: 8px;
//       margin-bottom: 12px;
//     }

//     /* ── ADDITIONAL SECTIONS ── */
//     .extra-block {
//       margin-top: 8px;
//       margin-bottom: 12px;
//     }

//     .extra-text {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     .extra-text p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
//     .extra-text div { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

//     .extra-text-muted {
//       font-size: 13px;
//       color: #6b7280;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* ── EXPERIENCE / EDUCATION ENTRIES ── */
//     .entry-block {
//       margin-bottom: 10px;
//     }

//     .entry-top-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 2px;
//     }

//     .entry-title {
//       font-size: 11.5px;
//       font-weight: 700;
//       font-style: italic;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .entry-date {
//       display: flex;
//       align-items: center;
//       gap: 3px;
//       font-size: 11.5px;
//       font-weight: 700;
//       color: #111827;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       white-space: nowrap;
//     }

//     .entry-subtitle {
//       font-size: 11px;
//       color: #374151;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//       margin-bottom: 3px;
//     }

//     .entry-content {
//       font-size: 13px;
//       color: #374151;
//       line-height: 1.5;
//       font-family: 'Nunito', Arial, sans-serif;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* Critical: reset all <p> inside entry content */
//     .entry-content p {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//     }

//     .entry-content ul {
//       list-style-type: disc !important;
//       padding-left: 16px !important;
//       margin: 0 !important;
//     }

//     .entry-content ol {
//       list-style-type: decimal !important;
//       padding-left: 16px !important;
//       margin: 0 !important;
//     }

//     .entry-content li {
//       margin: 0 !important;
//       padding: 0 !important;
//       line-height: 1.5 !important;
//       font-size: 13px !important;
//       font-family: 'Nunito', Arial, sans-serif !important;
//       margin-bottom: 1px !important;
//     }

//     /* ── WEBSITES ── */
//     .website-block {
//       margin-top: 12px;
//     }

//     .website-item {
//       margin-bottom: 6px;
//     }

//     .website-label {
//       font-size: 13px;
//       font-weight: 700;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     .website-link {
//       font-size: 13px;
//       color: #6b7280;
//       text-decoration: underline;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       font-family: 'Nunito', Arial, sans-serif;
//       line-height: 1.5;
//     }

//     /* ── PRINT ── */
//     @media print {
//       @page {
//         size: A4;
//         margin: 5mm;
//       }

//       @page :first {
//         margin-top: 0;
//       }

//       body {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }

//       .t2-resume  {
//         width: 100% !important;
//         padding: 0 !important;
//         box-shadow: none !important;
//       }

//       .header-wrap {
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }

//       .entry-block {
//         page-break-inside: avoid;
//         break-inside: avoid;
//       }

//       .section-title {
//         page-break-after: avoid;
//         break-after: avoid;
//       }
//     }
//   `;

//   /* ======================================================
//      HTML GENERATION — pixel-perfect match to JSX preview
//   ====================================================== */
//   const generateHTML = () => {
//     const photoHtml = previewUrl
//       ? `<img src="${previewUrl}" alt="Profile" class="header-photo" />`
//       : `<div class="header-photo-placeholder"><span>No Photo</span></div>`;

//     const addressStr = [
//       contact?.address,
//       contact?.city,
//       contact?.postcode,
//       contact?.country,
//     ]
//       .filter(Boolean)
//       .join(", ");

//     const skillLevelPct = (level: number | null | undefined) =>
//       level ? `${(Number(level) / 5) * 100}%` : "0%";

//     return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8"/>
//   <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//   <link rel="preconnect" href="https://fonts.googleapis.com"/>
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
//   <style>${styles}</style>
// </head>
// <body>
// <div class="t2-resume ">

//   <!-- HEADER -->
//   <div class="header-wrap">
//     <div class="header-photo-col">
//       ${photoHtml}
//     </div>
//     <div class="header-info-col">
//       <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//       ${addressStr ? `<div class="header-address">${addressStr}</div>` : ""}
//       ${contact?.email ? `<div class="header-email">${contact.email}</div>` : ""}
//       ${contact?.phone ? `<div class="header-phone">${contact.phone}</div>` : ""}
//       <div class="header-links">
//         ${linkedinUrl && linkedinUrl.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="header-link">LinkedIn</a>` : ""}
//         ${portfolioUrl && portfolioUrl.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="header-link">Portfolio</a>` : ""}
//       </div>
//     </div>
//   </div>

//   <!-- BODY -->
//   <div class="body-wrap">

//     <!-- LEFT COLUMN -->
//     <div class="left-col">

//       ${summary ? `
//       <div class="summary-block">
//         <div class="section-title">Summary</div>
//         <div class="summary-text">${summary.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>
//       </div>` : ""}

//       ${filteredSkills.length > 0 ? `
//       <div class="skills-block">
//         <div class="section-title">Skills</div>
//         <div class="skills-grid">
//           ${filteredSkills.map((skill) => `
//           <div>
//             <div class="skill-name">${skill.skill || ""}</div>
//             ${skill.level ? `<div class="skill-bar-wrap"><div class="skill-bar-fill" style="width:${skillLevelPct(Number(skill.level))}"></div></div>` : ""}
//           </div>`).join("")}
//         </div>
//       </div>` : ""}

//       ${Array.isArray(finalize?.languages) && finalize.languages.some((l) => l.name?.trim()) ? `
//       <div class="lang-block">
//         <div class="section-title">Languages</div>
//         <div class="skills-grid">
//           ${finalize.languages.filter((l) => l.name?.trim()).map((l) => `
//           <div>
//             <div class="skill-name">${l.name}</div>
//             ${l.level ? `<div class="skill-bar-wrap"><div class="skill-bar-fill" style="width:${skillLevelPct(Number(l.level))}"></div></div>` : ""}
//           </div>`).join("")}
//         </div>
//       </div>` : ""}

//       ${Array.isArray(finalize?.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//       <div class="extra-block">
//         <div class="section-title">Certifications &amp; Licenses</div>
//         <div class="extra-text">${finalize.certificationsAndLicenses.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}</div>
//       </div>` : ""}

//       ${Array.isArray(finalize?.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//       <div class="extra-block">
//         <div class="section-title">Hobbies &amp; Interests</div>
//         <div class="extra-text-muted">${finalize.hobbiesAndInterests.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}</div>
//       </div>` : ""}

//       ${Array.isArray(finalize?.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//       <div class="extra-block">
//         <div class="section-title">Awards &amp; Honors</div>
//         <div class="extra-text">${finalize.awardsAndHonors.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}</div>
//       </div>` : ""}

//       ${Array.isArray(finalize?.references) && finalize.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) ? `
//       <div class="extra-block">
//         <div class="section-title">References</div>
//         <div class="extra-text-muted">${finalize.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`).join("")}</div>
//       </div>` : ""}

//     </div>

//     <!-- DIVIDER -->
//     <div class="col-divider"></div>

//     <!-- RIGHT COLUMN -->
//     <div class="right-col">

//       ${experiences?.length > 0 ? `
//       <div>
//         <div class="section-title">Experience</div>
//         ${experiences.map((exp) => {
//           const start = formatMonthYear(exp.startDate, true);
//           const end = exp.endDate ? formatMonthYear(exp.endDate, true) : (exp.startDate ? "Present" : "");
//           return `
//         <div class="entry-block">
//           <div class="entry-top-row">
//             ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
//             <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
//           </div>
//           ${exp.location || exp.employer ? `<div class="entry-subtitle">${[exp.location, exp.employer].filter(Boolean).join(" - ")}</div>` : ""}
//           ${exp.text ? `<div class="entry-content">${exp.text.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>` : ""}
//         </div>`;
//         }).join("")}
//       </div>` : ""}

//       ${educations?.length > 0 ? `
//       <div style="margin-top:10px">
//         <div class="section-title">Education</div>
//         ${educations.map((edu) => {
//           const dateStr = [edu.startDate || "", edu.endDate || ""].filter(Boolean).join(" - ");
//           return `
//         <div class="entry-block">
//           <div class="entry-top-row">
//             <div class="entry-title">${edu.schoolname || ""}</div>
//             ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
//           </div>
//           ${edu.location || edu.degree ? `<div class="entry-subtitle">${[edu.location, edu.degree].filter(Boolean).join(" - ")}</div>` : ""}
//           ${edu.text ? `<div class="entry-content">${edu.text.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>` : ""}
//         </div>`;
//         }).join("")}
//       </div>` : ""}

//       ${Array.isArray(finalize?.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) ? `
//       <div class="website-block">
//         <div class="section-title">Websites &amp; Social Media</div>
//         ${finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((i) => `
//         <div class="website-item">
//           ${i.websiteUrl ? `<div class="website-label">Website:</div><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="website-link">${i.websiteUrl}</a>` : ""}
//           ${i.socialMedia ? `<div class="website-label" style="margin-top:4px">Social Media:</div><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="website-link">${i.socialMedia}</a>` : ""}
//         </div>`).join("")}
//       </div>` : ""}

//       ${Array.isArray(finalize?.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) ? `
//       <div style="margin-top:10px">
//         ${finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((s) => `
//         <div style="margin-bottom:8px">
//           ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
//           ${s.description ? `<div class="entry-content">${s.description.replace(/<[^>]*>/g, "")}</div>` : ""}
//         </div>`).join("")}
//       </div>` : ""}

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
//      JSX PREVIEW — uses same CSS classes as generateHTML
//   ====================================================== */
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

//       <div className="t2-resume " style={{ margin: "0 auto", boxShadow: "0 0 10px rgba(0,0,0,0.08)" }}>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
//         <style>{styles}</style>

//         {/* HEADER */}
//         <div className="header-wrap">
//           <div className="header-photo-col">
//             {previewUrl ? (
//               <img src={previewUrl} alt="Profile" className="header-photo" />
//             ) : (
//               <div className="header-photo-placeholder">
//                 <IoPersonOutline style={{ width: 48, height: 48, color: "#9ca3af" }} />
//               </div>
//             )}
//           </div>
//           <div className="header-info-col">
//             <div className="header-name">
//               {contact?.firstName || ""} {contact?.lastName || ""}
//             </div>
//             {[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).length > 0 && (
//               <div className="header-address">
//                 {[contact?.address, contact?.city, contact?.postcode, contact?.country].filter(Boolean).join(", ")}
//               </div>
//             )}
//             {contact?.email && <div className="header-email">{contact.email}</div>}
//             {contact?.phone && <div className="header-phone">{contact.phone}</div>}
//             <div className="header-links">
//               {linkedinUrl && linkedinUrl.trim() && (
//                 <a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer" className="header-link">LinkedIn</a>
//               )}
//               {portfolioUrl && portfolioUrl.trim() && (
//                 <a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer" className="header-link">Portfolio</a>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="body-wrap">

//           {/* LEFT COLUMN */}
//           <div className="left-col">

//             {summary && (
//               <div className="summary-block">
//                 <div className="section-title">Summary</div>
//                 <div className="summary-text" dangerouslySetInnerHTML={{ __html: summary.replace(/<[^>]*>/g, "") }} />
//               </div>
//             )}

//             {filteredSkills.length > 0 && (
//               <div className="skills-block">
//                 <div className="section-title">Skills</div>
//                 <div className="skills-grid">
//                   {filteredSkills.map((skill, index) => (
//                     <div key={index}>
//                       <div className="skill-name">{skill.skill || ""}</div>
//                       {skill.level && (
//                         <div className="skill-bar-wrap">
//                           <div className="skill-bar-fill" style={{ width: `${(Number(skill.level) / 5) * 100}%` }} />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {Array.isArray(finalize?.languages) && finalize.languages.some((l) => l.name?.trim()) && (
//               <div className="lang-block">
//                 <div className="section-title">Languages</div>
//                 <div className="skills-grid">
//                   {finalize.languages.filter((l) => l.name?.trim()).map((l, i) => (
//                     <div key={l._id || i}>
//                       <div className="skill-name">{l.name}</div>
//                       {l.level && (
//                         <div className="skill-bar-wrap">
//                           <div className="skill-bar-fill" style={{ width: `${(Number(l.level) / 5) * 100}%` }} />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {Array.isArray(finalize?.certificationsAndLicenses) && finalize.certificationsAndLicenses.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//               <div className="extra-block">
//                 <div className="section-title">Certifications &amp; Licenses</div>
//                 <div className="extra-text">
//                   {finalize.certificationsAndLicenses.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                     <div key={item.id || i} dangerouslySetInnerHTML={{ __html: item.name?.replace(/<[^>]*>/g, "") || "" }} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {Array.isArray(finalize?.hobbiesAndInterests) && finalize.hobbiesAndInterests.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//               <div className="extra-block">
//                 <div className="section-title">Hobbies &amp; Interests</div>
//                 <div className="extra-text-muted">
//                   {finalize.hobbiesAndInterests.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                     <div key={item.id || i} dangerouslySetInnerHTML={{ __html: item.name?.replace(/<[^>]*>/g, "") || "" }} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {Array.isArray(finalize?.awardsAndHonors) && finalize.awardsAndHonors.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//               <div className="extra-block">
//                 <div className="section-title">Awards &amp; Honors</div>
//                 <div className="extra-text">
//                   {finalize.awardsAndHonors.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                     <div key={item.id || i} dangerouslySetInnerHTML={{ __html: item.name?.replace(/<[^>]*>/g, "") || "" }} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {Array.isArray(finalize?.references) && finalize.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim()) && (
//               <div className="extra-block">
//                 <div className="section-title">References</div>
//                 <div className="extra-text-muted">
//                   {finalize.references.filter((i) => i.name?.replace(/<[^>]*>/g, "").trim()).map((item, i) => (
//                     <div key={item.id || i} dangerouslySetInnerHTML={{ __html: item.name?.replace(/<[^>]*>/g, "") || "" }} />
//                   ))}
//                 </div>
//               </div>
//             )}

//           </div>

//           {/* DIVIDER */}
//           <div className="col-divider" />

//           {/* RIGHT COLUMN */}
//           <div className="right-col">

//             {experiences?.length > 0 && (
//               <div>
//                 <div className="section-title">Experience</div>
//                 {experiences.map((exp, index) => (
//                   <div key={exp.id || index} className="entry-block">
//                     <div className="entry-top-row">
//                       {exp.jobTitle ? <div className="entry-title">{exp.jobTitle}</div> : <div />}
//                       <div className="entry-date">
//                         <MonthYearDisplay value={exp.startDate} shortYear={true} />
//                         {exp.startDate && (exp.endDate || true) && <span> - </span>}
//                         {exp.endDate
//                           ? <MonthYearDisplay value={exp.endDate} shortYear={true} />
//                           : exp.startDate && <span>Present</span>}
//                       </div>
//                     </div>
//                     {(exp.location || exp.employer) && (
//                       <div className="entry-subtitle">{[exp.location, exp.employer].filter(Boolean).join(" - ")}</div>
//                     )}
//                     {exp.text && (
//                       <div className="entry-content" dangerouslySetInnerHTML={{ __html: exp.text.replace(/<[^>]*>/g, "") }} />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {educations?.length > 0 && (
//               <div style={{ marginTop: "10px" }}>
//                 <div className="section-title">Education</div>
//                 {educations.map((edu, index) => (
//                   <div key={edu.id || index} className="entry-block">
//                     <div className="entry-top-row">
//                       <div className="entry-title">{edu.schoolname || ""}</div>
//                       <div className="entry-date">
//                         {[edu.startDate, edu.endDate].filter(Boolean).join(" - ")}
//                       </div>
//                     </div>
//                     {(edu.location || edu.degree) && (
//                       <div className="entry-subtitle">{[edu.location, edu.degree].filter(Boolean).join(" - ")}</div>
//                     )}
//                     {edu.text && (
//                       <div className="entry-content" dangerouslySetInnerHTML={{ __html: edu.text.replace(/<[^>]*>/g, "") }} />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {Array.isArray(finalize?.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()) && (
//               <div className="website-block">
//                 <div className="section-title">Websites &amp; Social Media</div>
//                 {finalize.websitesAndSocialMedia.filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim()).map((item, i) => (
//                   <div key={item.id || i} className="website-item">
//                     {item.websiteUrl && (
//                       <div>
//                         <div className="website-label">Website:</div>
//                         <a href={item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`} target="_blank" rel="noreferrer" className="website-link">{item.websiteUrl}</a>
//                       </div>
//                     )}
//                     {item.socialMedia && (
//                       <div style={{ marginTop: "4px" }}>
//                         <div className="website-label">Social Media:</div>
//                         <a href={item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`} target="_blank" rel="noreferrer" className="website-link">{item.socialMedia}</a>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {Array.isArray(finalize?.customSection) && finalize.customSection.some((s) => s?.name?.trim() || s?.description?.trim()) && (
//               <div style={{ marginTop: "10px" }}>
//                 {finalize.customSection.filter((s) => s?.name?.trim() || s?.description?.trim()).map((section, i) => (
//                   <div key={section.id || i} style={{ marginBottom: "8px" }}>
//                     {section.name && <div className="section-title">{section.name}</div>}
//                     {section.description && (
//                       <div className="entry-content" dangerouslySetInnerHTML={{ __html: section.description.replace(/<[^>]*>/g, "") }} />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemplateTwo;

"use client";
import React, { useContext, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import {
  MonthYearDisplay,
  formatMonthYear,
  getLocalStorage,
} from "@/app/utils";
import { IoPersonOutline } from "react-icons/io5";

import { usePathname } from "next/navigation";
import { User } from "@/app/types/user.types";
import { ResumeProps } from "@/app/types";

const TemplateTwo: React.FC<ResumeProps> = ({ alldata }) => {
  const UseContext = useContext(CreateContext);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const contact = alldata?.contact || UseContext?.contact || {};
  const educations = alldata?.educations || UseContext?.education || [];
  const experiences = alldata?.experiences || UseContext?.experiences || [];
  const skills = alldata?.skills || UseContext?.skills || [];
  const finalize = alldata?.finalize || UseContext?.finalize || {};
  const summary = alldata?.summary || UseContext?.summary || "";
  const linkedinUrl = contact?.linkedin;
  const portfolioUrl = contact?.portfolio;

  useEffect(() => {
    let url: string | null = null;
    let objectUrl: string | null = null;

    if (contact.croppedImage) {
      if (
        typeof contact.croppedImage === "string" &&
        contact.croppedImage.startsWith("blob:")
      ) {
        url = contact.croppedImage;
      } else if (typeof contact.croppedImage === "string") {
        url = `${API_URL}/api/uploads/photos/${contact.croppedImage}`;
      } else if (
        contact.croppedImage &&
        typeof contact.croppedImage === "object" &&
        "size" in contact.croppedImage
      ) {
        objectUrl = URL.createObjectURL(contact.croppedImage as Blob);
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
  }, [contact.croppedImage, contact.photo]);

  const filteredSkills = skills.filter((skill) => skill.skill?.trim());

  /* ======================================================
     SHARED CSS
     FIX 1: All selectors are scoped to .t2-resume 
             to prevent leaking into the rest of the website.
     FIX 2: Reduced padding/spacing/photo size so the resume
             fits on a single A4 page when exported to PDF.
  ====================================================== */
  const styles = `
    /* ── CONTAINER ── */
    .t2-resume  {
      width: 210mm;
      padding: 5mm;
      box-sizing: border-box;
      background-color: white;
      font-family: 'Nunito', Arial, sans-serif;
      font-size: 13px;
      line-height: 1.5;
      color: #1f2937;
      text-align: left;
    }

      .t2-resume.is-preview {
   

    transform: scale(0.36);
    transform-origin: top left;
    width: 210mm; 
        padding:20px;

    height: auto;
    max-height: none;
    min-height: auto;
    max-width: none;
    min-width: auto;
    overflow: hidden;
}

    /* ── SCOPED GLOBAL RESETS (FIX 1) ── */
    /* These used to be bare "p, div, span, i, a { ... }" selectors
       which applied to the entire page. Now they are scoped. */
    .t2-resume  p,
    .t2-resume  div,
    .t2-resume  span,
    .t2-resume  i,
    .t2-resume  a {
      margin: 0;
      padding: 0;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .t2-resume  ul,
    .t2-resume  ol {
      margin: 0 !important;
      padding: 0 !important;
    }

    .t2-resume  li {
      margin-top: 0 !important;
      margin-bottom: 1px !important;
      padding: 0 !important;
      line-height: 1.5 !important;
      font-size: 13px !important;
      font-family: 'Nunito', Arial, sans-serif !important;
    }

    .t2-resume  ul { list-style-type: disc !important; padding-left: 16px !important; }
    .t2-resume  ol { list-style-type: decimal !important; padding-left: 16px !important; }

    /* ── HEADER ── */
    .t2-resume  .header-wrap {
      display: flex;
      background-color: #EADCCE;
      padding: 4px 0;
      border-radius: 24px 24px 0 0;
      border-bottom: 1px solid #d1d5db;
    }

    .t2-resume  .header-photo-col {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 22%;
      padding: 4px;
    }

    /* FIX 2: Reduced photo from 128px → 100px to save vertical space */
    .t2-resume  .header-photo {
      width: 100px;
      height: 100px;
      border-radius: 6px;
      object-fit: cover;
      border: 1px solid #e5e7eb;
    }

    .t2-resume  .header-photo-placeholder {
      width: 100px;
      height: 100px;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f9fafb;
    }

    .t2-resume  .header-photo-placeholder span {
      color: #9ca3af;
      font-size: 12px;
      font-family: 'Nunito', Arial, sans-serif;
    }

    .t2-resume  .header-info-col {
      width: 78%;
      padding-left: 40px;
      padding-right: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .t2-resume  .header-name {
      font-size: 26px;
      font-weight: 400;
      letter-spacing: 0.025em;
      color: #1f2937;
      line-height: 1.25;
      text-transform: capitalize;
      font-family: 'Nunito', Arial, sans-serif;
      margin-bottom: 2px;
    }

    .t2-resume  .header-address {
      font-size: 11px;
      color: #374151;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      margin-bottom: 1px;
    }

    .t2-resume  .header-email {
      font-size: 11px;
      color: #374151;
      font-family: serif, 'Nunito', Arial;
      line-height: 1.5;
      margin-bottom: 1px;
    }

    .t2-resume  .header-phone {
      font-size: 11px;
      color: #374151;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      margin-bottom: 3px;
    }

    .t2-resume  .header-links {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .t2-resume  .header-link {
      font-size: 12px;
      font-weight: 700;
      color: #000;
      text-decoration: underline;
      text-underline-offset: 3px;
      font-family: 'Nunito', Arial, sans-serif;
    }

    /* ── BODY ── */
    .t2-resume  .body-wrap {
      display: flex;
      gap: 12px;
    }

    /* ── LEFT COLUMN ── */
    /* FIX 2: Reduced padding-top 8px → 4px */
    .t2-resume  .left-col {
      width: 40%;
      padding-top: 4px;
      padding-left: 20px;
    }

    /* ── DIVIDER ── */
    .t2-resume  .col-divider {
      width: 1px;
      border-left: 1px solid #d1d5db;
      margin: 0 4px;
      flex-shrink: 0;
    }

    /* ── RIGHT COLUMN ── */
    /* FIX 2: Reduced padding-top 8px → 4px */
    .t2-resume  .right-col {
      width: 60%;
      padding-top: 4px;
      padding-right: 20px;
    }

    /* ── SECTION TITLE ── */
    .t2-resume  .section-title {
      font-size: 13px;
      font-weight: 700;
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-thickness: 2px;
      text-decoration-color: #1f2937;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: #111827;
      margin-bottom: 4px;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    /* ── SUMMARY ── */
    /* FIX 2: Reduced margin-bottom 10px → 6px */
    .t2-resume  .summary-block {
      margin-bottom: 6px;
    }

    .t2-resume  .summary-text {
      font-size: 13px;
      color: #374151;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t2-resume  .summary-text p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

    /* ── SKILLS ── */
    /* FIX 2: Reduced margin-bottom 12px → 8px */
    .t2-resume  .skills-block {
      margin-bottom: 8px;
    }

    .t2-resume  .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 20px;
      row-gap: 6px;
    }

    .t2-resume  .skill-name {
      font-size: 12px;
      color: #1f2937;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      margin-bottom: 2px;
    }

    .t2-resume  .skill-bar-wrap {
      height: 4px;
      width: 100%;
      background: #d1d5db;
      border-radius: 9999px;
      overflow: hidden;
    }

    .t2-resume  .skill-bar-fill {
      height: 100%;
      background: #0c0c1e;
      border-radius: 9999px;
    }

    /* ── LANGUAGES ── */
    /* FIX 2: Reduced margins */
    .t2-resume  .lang-block {
      margin-top: 4px;
      margin-bottom: 6px;
    }

    /* ── ADDITIONAL SECTIONS ── */
    /* FIX 2: Reduced margins */
    .t2-resume  .extra-block {
      margin-top: 4px;
      margin-bottom: 6px;
    }

    .t2-resume  .extra-text {
      font-size: 13px;
      color: #374151;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t2-resume  .extra-text p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }
    .t2-resume  .extra-text div { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

    .t2-resume  .extra-text-muted {
      font-size: 13px;
      color: #6b7280;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* ── EXPERIENCE / EDUCATION ENTRIES ── */
    /* FIX 2: Reduced margin-bottom 10px → 6px */
    .t2-resume  .entry-block {
      margin-bottom: 6px;
    }

    .t2-resume  .entry-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1px;
    }

    .t2-resume  .entry-title {
      font-size: 11.5px;
      font-weight: 700;
      font-style: italic;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .t2-resume  .entry-date {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 11.5px;
      font-weight: 700;
      color: #111827;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      white-space: nowrap;
    }

    .t2-resume  .entry-subtitle {
      font-size: 11px;
      color: #374151;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
      margin-bottom: 2px;
    }

    .t2-resume  .entry-content {
      font-size: 13px;
      color: #374151;
      line-height: 1.5;
      font-family: 'Nunito', Arial, sans-serif;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t2-resume  .entry-content p {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
      font-size: 13px !important;
      font-family: 'Nunito', Arial, sans-serif !important;
    }

    .t2-resume  .entry-content ul {
      list-style-type: disc !important;
      padding-left: 16px !important;
      margin: 0 !important;
    }

    .t2-resume  .entry-content ol {
      list-style-type: decimal !important;
      padding-left: 16px !important;
      margin: 0 !important;
    }

    .t2-resume  .entry-content li {
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.5 !important;
      font-size: 13px !important;
      font-family: 'Nunito', Arial, sans-serif !important;
      margin-bottom: 1px !important;
    }

    /* ── WEBSITES ── */
    .t2-resume  .website-block {
      margin-top: 8px;
    }

    .t2-resume  .website-item {
      margin-bottom: 4px;
    }

    .t2-resume  .website-label {
      font-size: 13px;
      font-weight: 700;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    .t2-resume  .website-link {
      font-size: 13px;
      color: #6b7280;
      text-decoration: underline;
      word-wrap: break-word;
      overflow-wrap: break-word;
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.5;
    }

    /* ── PRINT ── */
    @media print {
      @page {
        size: A4;
        margin: 5mm;
      }

      @page :first {
        margin-top: 0;
      }

      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .t2-resume  {
        width: 100% !important;
        padding: 0 !important;
        box-shadow: none !important;
      }

      .t2-resume  .header-wrap {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .t2-resume  .entry-block {
        page-break-inside: avoid;
        break-inside: avoid;
      }

      .t2-resume  .section-title {
        page-break-after: avoid;
        break-after: avoid;
      }
    }
  `;

  /* ======================================================
     HTML GENERATION — pixel-perfect match to JSX preview
  ====================================================== */
  const generateHTML = () => {
    const photoHtml = previewUrl
      ? `<img src="${previewUrl}" alt="Profile" class="header-photo" />`
      : `<div class="header-photo-placeholder"><span>No Photo</span></div>`;

    const addressStr = [
      contact?.address,
      contact?.city,
      contact?.postcode,
      contact?.country,
    ]
      .filter(Boolean)
      .join(", ");

    const skillLevelPct = (level: number | null | undefined) =>
      level ? `${(Number(level) / 5) * 100}%` : "0%";

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    /* PDF-specific body reset — safe here because this HTML is only
       used inside the headless PDF renderer, not injected into the site */
    body {
      margin: 0;
      padding: 0;
      font-family: 'Nunito', Arial, sans-serif;
      font-size: 13px;
      line-height: 1.5;
      color: #1f2937;
      background-color: white;
    }
    ${styles}
  </style>
</head>
<body>
<div class="t2-resume ">

  <!-- HEADER -->
  <div class="header-wrap">
    <div class="header-photo-col">
      ${photoHtml}
    </div>
    <div class="header-info-col">
      <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
      ${addressStr ? `<div class="header-address">${addressStr}</div>` : ""}
      ${contact?.email ? `<div class="header-email">${contact.email}</div>` : ""}
      ${contact?.phone ? `<div class="header-phone">${contact.phone}</div>` : ""}
      <div class="header-links">
        ${linkedinUrl && linkedinUrl.trim() ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="header-link">LinkedIn</a>` : ""}
        ${portfolioUrl && portfolioUrl.trim() ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="header-link">Portfolio</a>` : ""}
      </div>
    </div>
  </div>

  <!-- BODY -->
  <div class="body-wrap">

    <!-- LEFT COLUMN -->
    <div class="left-col">

      ${
        summary
          ? `
      <div class="summary-block">
        <div class="section-title">Summary</div>
        <div class="summary-text">${summary.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>
      </div>`
          : ""
      }

      ${
        filteredSkills.length > 0
          ? `
      <div class="skills-block">
        <div class="section-title">Skills</div>
        <div class="skills-grid">
          ${filteredSkills
            .map(
              (skill) => `
          <div>
            <div class="skill-name">${skill.skill || ""}</div>
            ${skill.level ? `<div class="skill-bar-wrap"><div class="skill-bar-fill" style="width:${skillLevelPct(Number(skill.level))}"></div></div>` : ""}
          </div>`,
            )
            .join("")}
        </div>
      </div>`
          : ""
      }

      ${
        Array.isArray(finalize?.languages) &&
        finalize.languages.some((l) => l.name?.trim())
          ? `
      <div class="lang-block">
        <div class="section-title">Languages</div>
        <div class="skills-grid">
          ${finalize.languages
            .filter((l) => l.name?.trim())
            .map(
              (l) => `
          <div>
            <div class="skill-name">${l.name}</div>
            ${l.level ? `<div class="skill-bar-wrap"><div class="skill-bar-fill" style="width:${skillLevelPct(Number(l.level))}"></div></div>` : ""}
          </div>`,
            )
            .join("")}
        </div>
      </div>`
          : ""
      }

      ${
        Array.isArray(finalize?.certificationsAndLicenses) &&
        finalize.certificationsAndLicenses.some((i) =>
          i.name?.replace(/<[^>]*>/g, "").trim(),
        )
          ? `
      <div class="extra-block">
        <div class="section-title">Certifications &amp; Licenses</div>
        <div class="extra-text">${finalize.certificationsAndLicenses
          .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
          .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
          .join("")}</div>
      </div>`
          : ""
      }

      ${
        Array.isArray(finalize?.hobbiesAndInterests) &&
        finalize.hobbiesAndInterests.some((i) =>
          i.name?.replace(/<[^>]*>/g, "").trim(),
        )
          ? `
      <div class="extra-block">
        <div class="section-title">Hobbies &amp; Interests</div>
        <div class="extra-text-muted">${finalize.hobbiesAndInterests
          .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
          .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
          .join("")}</div>
      </div>`
          : ""
      }

      ${
        Array.isArray(finalize?.awardsAndHonors) &&
        finalize.awardsAndHonors.some((i) =>
          i.name?.replace(/<[^>]*>/g, "").trim(),
        )
          ? `
      <div class="extra-block">
        <div class="section-title">Awards &amp; Honors</div>
        <div class="extra-text">${finalize.awardsAndHonors
          .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
          .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
          .join("")}</div>
      </div>`
          : ""
      }

      ${
        Array.isArray(finalize?.references) &&
        finalize.references.some((i) => i.name?.replace(/<[^>]*>/g, "").trim())
          ? `
      <div class="extra-block">
        <div class="section-title">References</div>
        <div class="extra-text-muted">${finalize.references
          .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
          .map((i) => `<div>${i.name?.replace(/<[^>]*>/g, "")}</div>`)
          .join("")}</div>
      </div>`
          : ""
      }

    </div>

    <!-- DIVIDER -->
    <div class="col-divider"></div>

    <!-- RIGHT COLUMN -->
    <div class="right-col">

      ${
        experiences?.length > 0
          ? `
      <div>
        <div class="section-title">Experience</div>
        ${experiences
          .map((exp) => {
            const start = formatMonthYear(exp.startDate, true);
            const end = exp.endDate
              ? formatMonthYear(exp.endDate, true)
              : exp.startDate
                ? "Present"
                : "";
            return `
        <div class="entry-block">
          <div class="entry-top-row">
            ${exp.jobTitle ? `<div class="entry-title">${exp.jobTitle}</div>` : "<div></div>"}
            <div class="entry-date">${start}${start && end ? " - " : ""}${end}</div>
          </div>
          ${exp.location || exp.employer ? `<div class="entry-subtitle">${[exp.location, exp.employer].filter(Boolean).join(" - ")}</div>` : ""}
          ${exp.text ? `<div class="entry-content">${exp.text.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>` : ""}
        </div>`;
          })
          .join("")}
      </div>`
          : ""
      }

      ${
        educations?.length > 0
          ? `
      <div style="margin-top:6px">
        <div class="section-title">Education</div>
        ${educations
          .map((edu) => {
            const dateStr = [edu.startDate || "", edu.endDate || ""]
              .filter(Boolean)
              .join(" - ");
            return `
        <div class="entry-block">
          <div class="entry-top-row">
            <div class="entry-title">${edu.schoolname || ""}</div>
            ${dateStr ? `<div class="entry-date">${dateStr}</div>` : "<div></div>"}
          </div>
          ${edu.location || edu.degree ? `<div class="entry-subtitle">${[edu.location, edu.degree].filter(Boolean).join(" - ")}</div>` : ""}
          ${edu.text ? `<div class="entry-content">${edu.text.replace(/<[^>]*>/g, "").replace(/\n/g, "<br/>")}</div>` : ""}
        </div>`;
          })
          .join("")}
      </div>`
          : ""
      }

      ${
        Array.isArray(finalize?.websitesAndSocialMedia) &&
        finalize.websitesAndSocialMedia.some(
          (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
        )
          ? `
      <div class="website-block">
        <div class="section-title">Websites &amp; Social Media</div>
        ${finalize.websitesAndSocialMedia
          .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
          .map(
            (i) => `
        <div class="website-item">
          ${i.websiteUrl ? `<div class="website-label">Website:</div><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="website-link">${i.websiteUrl}</a>` : ""}
          ${i.socialMedia ? `<div class="website-label" style="margin-top:4px">Social Media:</div><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="website-link">${i.socialMedia}</a>` : ""}
        </div>`,
          )
          .join("")}
      </div>`
          : ""
      }

      ${
        Array.isArray(finalize?.customSection) &&
        finalize.customSection.some(
          (s) => s?.name?.trim() || s?.description?.trim(),
        )
          ? `
      <div style="margin-top:6px">
        ${finalize.customSection
          .filter((s) => s?.name?.trim() || s?.description?.trim())
          .map(
            (s) => `
        <div style="margin-bottom:6px">
          ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
          ${s.description ? `<div class="entry-content">${s.description.replace(/<[^>]*>/g, "")}</div>` : ""}
        </div>`,
          )
          .join("")}
      </div>`
          : ""
      }

    </div>
  </div>
</div>
</body>
</html>`;
  };

  /* ======================================================
     PDF DOWNLOAD
  ====================================================== */
  const handleDownload = async (): Promise<void> => {
    try {
      const html: string = generateHTML(); // Assuming this returns a string

      const res: AxiosResponse<Blob> = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        { html },
        { responseType: "blob" },
      );

      const pdfBlob: Blob = res.data;

      const url: string = URL.createObjectURL(pdfBlob);
      const a: HTMLAnchorElement = document.createElement("a");

      a.href = url;
      a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // --- Server Upload Logic ---
      // We pass the pdfBlob directly to the next function
      await fetchOldResumeData(pdfBlob);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const Contactid = UseContext?.contact.contactId;
  const userDetails = getLocalStorage<User>("user_details");
  const userId = userDetails?.id;

  const fetchOldResumeData = async (pdfBlob: Blob): Promise<void> => {
    if (!userId || !Contactid) {
      console.error("Missing userId or Contactid");
      return;
    }

    try {
      const formData = new FormData();

      // Append metadata
      formData.append("userId", userId);
      formData.append("message", "success");
      formData.append("contactId", Contactid);

      // Append the actual file
      // The third parameter provides the filename to the server
      formData.append("resume", pdfBlob, "resume.pdf");

      console.log("formData", formData);

      const response: AxiosResponse = await axios.post(
        `${API_URL}/api/users/download-resume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Upload success:", response.data);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  /* ======================================================
     JSX PREVIEW — uses same CSS classes as generateHTML
  ====================================================== */
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

      <div
        // className="t2-resume "
                className={`t2-resume  ${alldata ? 'is-preview' : ''}`}

        style={{
          margin: "0 auto",
          minHeight: "297mm",
          boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" 
        }}
      >
        {/* Font import — only applies inside this component's shadow, not globally */}
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');`}</style>
        <style>{styles}</style>

        {/* HEADER */}
        <div className="header-wrap">
          <div className="header-photo-col">
            {previewUrl ? (
              <img src={previewUrl} alt="Profile" className="header-photo" />
            ) : (
              <div className="header-photo-placeholder">
                <IoPersonOutline
                  style={{ width: 40, height: 40, color: "#9ca3af" }}
                />
              </div>
            )}
          </div>
          <div className="header-info-col">
            <div className="header-name">
              {contact?.firstName || ""} {contact?.lastName || ""}
            </div>
            {[
              contact?.address,
              contact?.city,
              contact?.postcode,
              contact?.country,
            ].filter(Boolean).length > 0 && (
              <div className="header-address">
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
            {contact?.email && (
              <div className="header-email">{contact.email}</div>
            )}
            {contact?.phone && (
              <div className="header-phone">{contact.phone}</div>
            )}
            <div className="header-links">
              {linkedinUrl && linkedinUrl.trim() && (
                <a
                  href={
                    linkedinUrl.startsWith("http")
                      ? linkedinUrl
                      : `https://${linkedinUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="header-link"
                >
                  LinkedIn
                </a>
              )}
              {portfolioUrl && portfolioUrl.trim() && (
                <a
                  href={
                    portfolioUrl.startsWith("http")
                      ? portfolioUrl
                      : `https://${portfolioUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="header-link"
                >
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="body-wrap">
          {/* LEFT COLUMN */}
          <div className="left-col">
            {summary && (
              <div className="summary-block">
                <div className="section-title">Summary</div>
                <div
                  className="summary-text"
                  dangerouslySetInnerHTML={{
                    __html: summary.replace(/<[^>]*>/g, ""),
                  }}
                />
              </div>
            )}

            {filteredSkills.length > 0 && (
              <div className="skills-block">
                <div className="section-title">Skills</div>
                <div className="skills-grid">
                  {filteredSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="skill-name">{skill.skill || ""}</div>
                      {skill.level && (
                        <div className="skill-bar-wrap">
                          <div
                            className="skill-bar-fill"
                            style={{
                              width: `${(Number(skill.level) / 5) * 100}%`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(finalize?.languages) &&
              finalize.languages.some((l) => l.name?.trim()) && (
                <div className="lang-block">
                  <div className="section-title">Languages</div>
                  <div className="skills-grid">
                    {finalize.languages
                      .filter((l) => l.name?.trim())
                      .map((l, i) => (
                        <div key={l._id || i}>
                          <div className="skill-name">{l.name}</div>
                          {l.level && (
                            <div className="skill-bar-wrap">
                              <div
                                className="skill-bar-fill"
                                style={{
                                  width: `${(Number(l.level) / 5) * 100}%`,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}

            {Array.isArray(finalize?.certificationsAndLicenses) &&
              finalize.certificationsAndLicenses.some((i) =>
                i.name?.replace(/<[^>]*>/g, "").trim(),
              ) && (
                <div className="extra-block">
                  <div className="section-title">
                    Certifications &amp; Licenses
                  </div>
                  <div className="extra-text">
                    {finalize.certificationsAndLicenses
                      .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
                      .map((item, i) => (
                        <div
                          key={item.id || i}
                          dangerouslySetInnerHTML={{
                            __html: item.name?.replace(/<[^>]*>/g, "") || "",
                          }}
                        />
                      ))}
                  </div>
                </div>
              )}

            {Array.isArray(finalize?.hobbiesAndInterests) &&
              finalize.hobbiesAndInterests.some((i) =>
                i.name?.replace(/<[^>]*>/g, "").trim(),
              ) && (
                <div className="extra-block">
                  <div className="section-title">Hobbies &amp; Interests</div>
                  <div className="extra-text-muted">
                    {finalize.hobbiesAndInterests
                      .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
                      .map((item, i) => (
                        <div
                          key={item.id || i}
                          dangerouslySetInnerHTML={{
                            __html: item.name?.replace(/<[^>]*>/g, "") || "",
                          }}
                        />
                      ))}
                  </div>
                </div>
              )}

            {Array.isArray(finalize?.awardsAndHonors) &&
              finalize.awardsAndHonors.some((i) =>
                i.name?.replace(/<[^>]*>/g, "").trim(),
              ) && (
                <div className="extra-block">
                  <div className="section-title">Awards &amp; Honors</div>
                  <div className="extra-text">
                    {finalize.awardsAndHonors
                      .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
                      .map((item, i) => (
                        <div
                          key={item.id || i}
                          dangerouslySetInnerHTML={{
                            __html: item.name?.replace(/<[^>]*>/g, "") || "",
                          }}
                        />
                      ))}
                  </div>
                </div>
              )}

            {Array.isArray(finalize?.references) &&
              finalize.references.some((i) =>
                i.name?.replace(/<[^>]*>/g, "").trim(),
              ) && (
                <div className="extra-block">
                  <div className="section-title">References</div>
                  <div className="extra-text-muted">
                    {finalize.references
                      .filter((i) => i.name?.replace(/<[^>]*>/g, "").trim())
                      .map((item, i) => (
                        <div
                          key={item.id || i}
                          dangerouslySetInnerHTML={{
                            __html: item.name?.replace(/<[^>]*>/g, "") || "",
                          }}
                        />
                      ))}
                  </div>
                </div>
              )}
          </div>

          {/* DIVIDER */}
          <div className="col-divider" />

          {/* RIGHT COLUMN */}
          <div className="right-col">
            {experiences?.length > 0 && (
              <div>
                <div className="section-title">Experience</div>
                {experiences.map((exp, index) => (
                  <div key={exp.id || index} className="entry-block">
                    <div className="entry-top-row">
                      {exp.jobTitle ? (
                        <div className="entry-title">{exp.jobTitle}</div>
                      ) : (
                        <div />
                      )}
                      <div className="entry-date">
                        <MonthYearDisplay
                          value={exp.startDate}
                          shortYear={true}
                        />
                        {exp.startDate && (exp.endDate || true) && (
                          <span> - </span>
                        )}
                        {exp.endDate ? (
                          <MonthYearDisplay
                            value={exp.endDate}
                            shortYear={true}
                          />
                        ) : (
                          exp.startDate && <span>Present</span>
                        )}
                      </div>
                    </div>
                    {(exp.location || exp.employer) && (
                      <div className="entry-subtitle">
                        {[exp.location, exp.employer]
                          .filter(Boolean)
                          .join(" - ")}
                      </div>
                    )}
                    {exp.text && (
                      <div
                        className="entry-content"
                        dangerouslySetInnerHTML={{
                          __html: exp.text.replace(/<[^>]*>/g, ""),
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {educations?.length > 0 && (
              <div style={{ marginTop: "6px" }}>
                <div className="section-title">Education</div>
                {educations.map((edu, index) => (
                  <div key={edu.id || index} className="entry-block">
                    <div className="entry-top-row">
                      <div className="entry-title">{edu.schoolname || ""}</div>
                      <div className="entry-date">
                        {[edu.startDate, edu.endDate]
                          .filter(Boolean)
                          .join(" - ")}
                      </div>
                    </div>
                    {(edu.location || edu.degree) && (
                      <div className="entry-subtitle">
                        {[edu.location, edu.degree].filter(Boolean).join(" - ")}
                      </div>
                    )}
                    {edu.text && (
                      <div
                        className="entry-content"
                        dangerouslySetInnerHTML={{
                          __html: edu.text.replace(/<[^>]*>/g, ""),
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {Array.isArray(finalize?.websitesAndSocialMedia) &&
              finalize.websitesAndSocialMedia.some(
                (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
              ) && (
                <div className="website-block">
                  <div className="section-title">
                    Websites &amp; Social Media
                  </div>
                  {finalize.websitesAndSocialMedia
                    .filter(
                      (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
                    )
                    .map((item, i) => (
                      <div key={item.id || i} className="website-item">
                        {item.websiteUrl && (
                          <div>
                            <div className="website-label">Website:</div>
                            <a
                              href={
                                item.websiteUrl.startsWith("http")
                                  ? item.websiteUrl
                                  : `https://${item.websiteUrl}`
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="website-link"
                            >
                              {item.websiteUrl}
                            </a>
                          </div>
                        )}
                        {item.socialMedia && (
                          <div style={{ marginTop: "4px" }}>
                            <div className="website-label">Social Media:</div>
                            <a
                              href={
                                item.socialMedia.startsWith("http")
                                  ? item.socialMedia
                                  : `https://${item.socialMedia}`
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="website-link"
                            >
                              {item.socialMedia}
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}

            {Array.isArray(finalize?.customSection) &&
              finalize.customSection.some(
                (s) => s?.name?.trim() || s?.description?.trim(),
              ) && (
                <div style={{ marginTop: "6px" }}>
                  {finalize.customSection
                    .filter((s) => s?.name?.trim() || s?.description?.trim())
                    .map((section, i) => (
                      <div
                        key={section.id || i}
                        style={{ marginBottom: "6px" }}
                      >
                        {section.name && (
                          <div className="section-title">{section.name}</div>
                        )}
                        {section.description && (
                          <div
                            className="entry-content"
                            dangerouslySetInnerHTML={{
                              __html: section.description.replace(
                                /<[^>]*>/g,
                                "",
                              ),
                            }}
                          />
                        )}
                      </div>
                    ))}
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateTwo;
