// "use client";

// import React, { useContext } from "react";
// import { CreateContext } from "@/app/context/CreateContext"; // Updated import
// import MonthYearDisplay from "@/app/utils/MonthYearDisplay";

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

// const TemplateFour: React.FC<ResumeProps> = ({ alldata }) => {
//   console.log("alldetailscxc", alldata);

//   const context = useContext(CreateContext);
//   console.log("UseContextdd", context);

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

//   return (
// <div
//         className="bg-white border border-gray-100 font-nunito mx-auto"
//         style={{
//           width: "210mm",
//           padding: "5mm",
//           boxSizing: "border-box",
//         }}
//       >
//       {/* Header */}
//       <div className="text-center font-bold mt-1 mb-2">
//         <p className="text-[27px] uppercase">
//           {contact?.firstName || ""} {contact?.lastName || ""}
//         </p>
//         {contact?.jobTitle && (
//           <p className="text-[12px] font-normal mt-1">
//             {getJobTitle(contact.jobTitle)}
//           </p>
//         )}
//         <div className="flex justify-center items-center gap-4 mb-1">
//           {/* Show LinkedIn only if provided */}
//           {linkedinUrl && (
//             <a
//               href={
//                 linkedinUrl.startsWith("http")
//                   ? linkedinUrl
//                   : `https://${linkedinUrl}`
//               }
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 font-semibold underline text-black text-[13px]"
//             >
//               <p>LinkedIn</p>
//             </a>
//           )}

//           {/* Show Portfolio only if provided */}
//           {contact?.portfolio && (
//             <a
//               href={
//                 contact.portfolio.startsWith("http")
//                   ? contact.portfolio
//                   : `https://${contact.portfolio}`
//               }
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 font-semibold underline text-black text-[13px]"
//             >
//               <p>Portfolio</p>
//             </a>
//           )}
//         </div>
//       </div>

//       <hr className="border-2" />

//       <div className="flex justify-center gap-1 text-[13px] p-1 flex-wrap">
//         <p>
//           {contact?.address || ""}, {contact?.city || ""},{" "}
//           {contact?.country || ""}, {contact?.postcode || ""}
//         </p>
//         <p> • {contact?.phone || ""}</p>
//         <p> • {contact?.email || ""}</p>
//       </div>

//       {/* Summary */}
//       <div className="mt-3">
//         <p className="text-[17px] font-bold">Summary</p>
//         <div
//           className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word"
//           dangerouslySetInnerHTML={{ __html: summary || "" }}
//         />
//       </div>

//       {/* Experience */}
//       <div className="mt-2">
//         {experiences?.length > 0 ? (
//           experiences.map((exp, index) => (
//             <div key={exp.id || index} className="mb-4">
//               {index === 0 && (
//                 <p className="text-[17px] font-bold">Experience</p>
//               )}
//               {(exp.jobTitle || exp.employer || exp.location) && (
//                 <h3 className="font-semibold text-gray-900 wrap-break-word text-base mt-1">
//                   {exp.jobTitle || ""}{" "}
//                   {exp.employer && (
//                     <span className="text-gray-500 font-normal">
//                       — {exp.employer}
//                     </span>
//                   )}
//                   {exp.location && (
//                     <span className="text-gray-500 font-normal">
//                       {" "}
//                       — {exp.location}
//                     </span>
//                   )}
//                 </h3>
//               )}

//               <div className="text-gray-600 text-sm mt-1">
//                 <div className="flex items-center gap-2">
//                   {/* START DATE */}
//                   <MonthYearDisplay value={exp.startDate} shortYear={true} />

//                   {/* SHOW "-" ONLY IF BOTH DATES EXIST */}
//                   {exp.startDate && exp.endDate && <span>-</span>}

//                   {/* END DATE */}
//                   {exp.endDate ? (
//                     <MonthYearDisplay value={exp.endDate} shortYear={true} />
//                   ) : (
//                     "Present"
//                   )}
//                 </div>
//               </div>

//               <div
//                 className="pt-2 ml-6 pb-2 text-gray-700 text-[15px] wrap-break-word"
//                 dangerouslySetInnerHTML={{ __html: exp.text || "" }}
//               />
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No experience added yet.</p>
//         )}
//       </div>

//       {/* Education */}
//       <div className="mt-3">
//         <p className="text-[17px] font-bold">Education</p>
//         <div>
//           {educations?.length > 0 ? (
//             educations.map((edu, index) => (
//               <div key={edu.id || index} className="mb-3">
//                 {(edu.schoolname || edu.degree || edu.location) && (
//                   <h3 className="font-semibold text-gray-900 wrap-break-word text-base mt-1">
//                     {edu.schoolname || ""}
//                     {edu.degree && (
//                       <span className="text-gray-500 font-normal">
//                         {" "}
//                         — {edu.degree}
//                       </span>
//                     )}
//                     {edu.location && (
//                       <span className="text-gray-500 font-normal">
//                         {" "}
//                         — {edu.location}
//                       </span>
//                     )}
//                   </h3>
//                 )}

//                 {(edu.startDate || edu.endDate) && (
//                   <p className="text-gray-600 text-sm wrap-break-word mt-1">
//                     {edu.startDate || ""} — {edu.endDate || ""}
//                   </p>
//                 )}

//                 <div
//                   className="pt-2 ml-6 pb-2 text-gray-700 text-[15px] wrap-break-word"
//                   dangerouslySetInnerHTML={{ __html: edu.text || "" }}
//                 />
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No education added yet.</p>
//           )}
//         </div>
//       </div>

//       {/* Skills */}
//       <div className="mt-3">
//         <p className="text-[17px] font-bold">Skills</p>
//         {skills.length > 0 ? (
//           <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-2">
//             {skills.map((skill, index) => (
//               <div key={skill.id || index}>
//                 <p className="text-sm wrap-break-word text-gray-600 mb-1">
//                   {skill.skill || ""}
//                 </p>
//                 {skill.level && (
//                   <div className="h- w-full bg-gray-300 rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-[#0c0c1e]"
//                       style={{
//                         width: `${(Number(skill.level) / 4) * 100}%`,
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 mt-1">No skills added yet.</p>
//         )}
//       </div>

//       {/* Languages */}
//       {fixMapCalls.languages.length > 0 &&
//         fixMapCalls.languages.some(
//           (lang) => lang.name && lang.name.trim() !== "",
//         ) && (
//           <div className="mt-3">
//             <p className="text-[17px] font-bold">Languages</p>
//             <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-2">
//               {fixMapCalls.languages.map(
//                 (lang, index) =>
//                   lang.name &&
//                   lang.name.trim() !== "" && (
//                     <div key={lang._id || index}>
//                       <p className="text-sm wrap-break-word text-gray-800 mb-1">
//                         {lang.name}
//                       </p>
//                       {lang.level && (
//                         <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//                           <div
//                             className="h-full bg-[#0c0c1e]"
//                             style={{
//                               width: `${(Number(lang.level) / 4) * 100}%`,
//                             }}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   ),
//               )}
//             </div>
//           </div>
//         )}

//       {/* Certifications and Licenses */}
//       {fixMapCalls.certificationsAndLicenses.length > 0 &&
//         fixMapCalls.certificationsAndLicenses.some(
//           (item) =>
//             item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//         ) && (
//           <div className="mt-3">
//             <p className="text-[17px] font-bold">Certifications and Licenses</p>
//             <div className="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word">
//               {fixMapCalls.certificationsAndLicenses.map(
//                 (item, index) =>
//                   item.name &&
//                   item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                     <div
//                       key={item.id || index}
//                       dangerouslySetInnerHTML={{ __html: item.name }}
//                     />
//                   ),
//               )}
//             </div>
//           </div>
//         )}

//       {/* Hobbies and Interests */}
//       {fixMapCalls.hobbiesAndInterests.length > 0 &&
//         fixMapCalls.hobbiesAndInterests.some(
//           (item) =>
//             item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//         ) && (
//           <div className="mt-2">
//             <p className="text-[17px] font-bold">Hobbies and Interests</p>
//             <div className="pt-1 pb-1 text-gray-700 text-[15px] wrap-break-word">
//               {fixMapCalls.hobbiesAndInterests.map(
//                 (item, index) =>
//                   item.name &&
//                   item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                     <div
//                       key={item.id || index}
//                       dangerouslySetInnerHTML={{ __html: item.name }}
//                     />
//                   ),
//               )}
//             </div>
//           </div>
//         )}

//       {/* Awards and Honors */}
//       {fixMapCalls.awardsAndHonors.length > 0 &&
//         fixMapCalls.awardsAndHonors.some(
//           (item) =>
//             item?.name &&
//             item.name.replace(/<[^>]+>/g, "").trim() !== "" &&
//             item.name.toLowerCase() !== "<p><br></p>",
//         ) && (
//           <div className="mt-2">
//             <h2 className="text-[17px] font-bold">Awards and Honors</h2>
//             <div className="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word">
//               {fixMapCalls.awardsAndHonors.map(
//                 (item, index) =>
//                   item.name &&
//                   item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                     <div
//                       key={item.id || index}
//                       dangerouslySetInnerHTML={{ __html: item.name }}
//                     />
//                   ),
//               )}
//             </div>
//           </div>
//         )}

//       {/* Websites and Social Media */}
//       {fixMapCalls.websitesAndSocialMedia.length > 0 &&
//         fixMapCalls.websitesAndSocialMedia.some(
//           (item) =>
//             (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//             (item.socialMedia && item.socialMedia.trim() !== ""),
//         ) && (
//           <div className="mt-2">
//             <p className="text-[17px] font-bold">Websites and Social Media</p>
//             <div className="pt-1 pb-1 text-[15px] text-gray-700 wrap-break-word">
//               {fixMapCalls.websitesAndSocialMedia.map(
//                 (item, index) =>
//                   ((item.websiteUrl && item.websiteUrl.trim() !== "") ||
//                     (item.socialMedia && item.socialMedia.trim() !== "")) && (
//                     <div key={item.id || index} className="mb-2">
//                       {item.websiteUrl && (
//                         <div>
//                           <p className="font-semibold text-sm">Website URL:</p>
//                           <a
//                             href={
//                               item.websiteUrl.startsWith("http")
//                                 ? item.websiteUrl
//                                 : `https://${item.websiteUrl}`
//                             }
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-gray-700 underline wrap-break-word text-sm"
//                           >
//                             {item.websiteUrl}
//                           </a>
//                         </div>
//                       )}
//                       {item.socialMedia && (
//                         <div className="mt-1">
//                           <p className="font-semibold text-sm">
//                             Social Media URL:
//                           </p>
//                           <a
//                             href={
//                               item.socialMedia.startsWith("http")
//                                 ? item.socialMedia
//                                 : `https://${item.socialMedia}`
//                             }
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-gray-700 underline wrap-break-word text-sm"
//                           >
//                             {item.socialMedia}
//                           </a>
//                         </div>
//                       )}
//                     </div>
//                   ),
//               )}
//             </div>
//           </div>
//         )}

//       {/* References */}
//       {fixMapCalls.references.length > 0 &&
//         fixMapCalls.references.some(
//           (item) =>
//             item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//         ) && (
//           <div className="mt-2">
//             <p className="text-[17px] font-bold">References</p>
//             <div className="pt-1 pb-2 text-gray-700 text-[15px] wrap-break-word">
//               {fixMapCalls.references.map(
//                 (item, index) =>
//                   item.name &&
//                   item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                     <div
//                       key={item.id || index}
//                       dangerouslySetInnerHTML={{ __html: item.name }}
//                     />
//                   ),
//               )}
//             </div>
//           </div>
//         )}

//       {/* Custom Section */}
//       {fixMapCalls.customSection.length > 0 &&
//         fixMapCalls.customSection.some(
//           (section) => section?.name?.trim() || section?.description?.trim(),
//         ) && (
//           <div className="mt-3 mb-4">
//             {fixMapCalls.customSection
//               .filter(
//                 (section) =>
//                   section?.name?.trim() || section?.description?.trim(),
//               )
//               .map((section, index) => (
//                 <div key={section.id || index} className="pt-2 pb-3">
//                   {/* Show only content, no heading */}
//                   {section.name && (
//                     <p className="text-[17px] font-bold">{section.name}</p>
//                   )}

//                   {section.description && (
//                     <div
//                       className="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word"
//                       dangerouslySetInnerHTML={{ __html: section.description }}
//                     />
//                   )}
//                 </div>
//               ))}
//           </div>
//         )}
//     </div>
//   );
// };

// export default TemplateFour;




"use client";

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import MonthYearDisplay from "@/app/utils/MonthYearDisplay";
import {
  Contact,
  Education,
  Experience,
  Finalize,
  Skill,
} from "@/app/types/context.types";
import { usePathname } from "next/navigation";

interface AllData {
  contact?: Contact;
  educations?: Education[];
  experiences?: Experience[];
  skills?: Skill[];
  finalize?: Finalize;
  summary?: string;
}

interface ResumeProps {
  alldata?: AllData;
}

const TemplateFour: React.FC<ResumeProps> = ({ alldata }) => {
  console.log("alldetailscxc", alldata);

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

  // Helper function to get job title
  const getJobTitle = (jobTitle: any): string => {
    if (!jobTitle) return "";

    if (typeof jobTitle === "string") {
      return jobTitle;
    }

    if (typeof jobTitle === "object" && jobTitle !== null) {
      return (jobTitle as any)?.name || (jobTitle as any)?.label || "";
    }

    return "";
  };

  // Type guard for FinalizeData
  const isFinalizeData = (data: any): data is Finalize => {
    return data && typeof data === "object" && !Array.isArray(data);
  };

  // Fix typo in map function calls
  const fixMapCalls = {
    languages:
      isFinalizeData(finalize) && Array.isArray(finalize.languages)
        ? finalize.languages
        : [],
    certificationsAndLicenses:
      isFinalizeData(finalize) &&
      Array.isArray(finalize.certificationsAndLicenses)
        ? finalize.certificationsAndLicenses
        : [],
    hobbiesAndInterests:
      isFinalizeData(finalize) && Array.isArray(finalize.hobbiesAndInterests)
        ? finalize.hobbiesAndInterests
        : [],
    awardsAndHonors:
      isFinalizeData(finalize) && Array.isArray(finalize.awardsAndHonors)
        ? finalize.awardsAndHonors
        : [],
    websitesAndSocialMedia:
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

  const getSkillLevelWidth = (level: number | null | undefined) => {
    if (!level) return "0%";
    return `${(Number(level) / 5) * 100}%`;
  };

  const generateHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8"/>
        <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Nunito', sans-serif; }
          .wrap-break-word { word-wrap: break-word; overflow-wrap: break-word; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body class="bg-white">
        <div class="resume-container bg-white border border-gray-100 font-nunito mx-auto" style="width: 210mm; padding: 5mm; box-sizing: border-box; margin: 0 auto;">
          <!-- Header -->
          <div class="text-center font-bold mt-1 mb-2">
            <p class="text-[27px] uppercase">
              ${contact?.firstName || ""} ${contact?.lastName || ""}
            </p>
            ${contact?.jobTitle ? `
              <p class="text-[12px] font-normal mt-1">
                ${getJobTitle(contact.jobTitle)}
              </p>
            ` : ""}
            <div class="flex justify-center items-center gap-4 mb-1">
              ${linkedinUrl && linkedinUrl.trim() ? `
                <a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 font-semibold underline text-black text-[13px]">
                  <p>LinkedIn</p>
                </a>
              ` : ""}
              ${contact?.portfolio && contact.portfolio.trim() ? `
                <a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 font-semibold underline text-black text-[13px]">
                  <p>Portfolio</p>
                </a>
              ` : ""}
            </div>
          </div>

          <hr class="border-2 border-black" />

          <div class="flex justify-center gap-1 text-[13px] p-1 flex-wrap">
            <p>
              ${contact?.address || ""}, ${contact?.city || ""}, ${contact?.country || ""}, ${contact?.postcode || ""}
            </p>
            ${contact?.phone ? `<p> • ${contact.phone}</p>` : ""}
            ${contact?.email ? `<p> • ${contact.email}</p>` : ""}
          </div>

          <!-- Summary -->
          ${summary ? `
            <div class="mt-3">
              <p class="text-[17px] font-bold">Summary</p>
              <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
                ${summary.replace(/<[^>]*>/g, "")}
              </div>
            </div>
          ` : ""}

          <!-- Experience -->
          <div class="mt-2">
            ${experiences?.length > 0 ? `
              <p class="text-[17px] font-bold">Experience</p>
              ${experiences.map((exp, index) => `
                <div key="${exp.id || index}" class="mb-4">
                  ${(exp.jobTitle || exp.employer || exp.location) ? `
                    <h3 class="font-semibold text-gray-900 wrap-break-word text-base mt-1">
                      ${exp.jobTitle || ""}
                      ${exp.employer ? `<span class="text-gray-500 font-normal"> — ${exp.employer}</span>` : ""}
                      ${exp.location ? `<span class="text-gray-500 font-normal"> — ${exp.location}</span>` : ""}
                    </h3>
                  ` : ""}

                  <div class="text-gray-600 text-sm mt-1">
                    <div class="flex items-center gap-2">
                      ${exp.startDate || ""}
                      ${exp.startDate && exp.endDate ? `<span>-</span>` : ""}
                      ${exp.endDate ? exp.endDate : exp.startDate ? "Present" : ""}
                    </div>
                  </div>

                  ${exp.text ? `
                    <div class="pt-2 ml-6 pb-2 text-gray-700 text-[15px] wrap-break-word">
                      ${exp.text.replace(/<[^>]*>/g, "")}
                    </div>
                  ` : ""}
                </div>
              `).join("")}
            ` : `<p class="text-gray-500">No experience added yet.</p>`}
          </div>

          <!-- Education -->
          <div class="mt-3">
            <p class="text-[17px] font-bold">Education</p>
            <div>
              ${educations?.length > 0 ? educations.map((edu, index) => `
                <div key="${edu.id || index}" class="mb-3">
                  ${(edu.schoolname || edu.degree || edu.location) ? `
                    <h3 class="font-semibold text-gray-900 wrap-break-word text-base mt-1">
                      ${edu.schoolname || ""}
                      ${edu.degree ? `<span class="text-gray-500 font-normal"> — ${edu.degree}</span>` : ""}
                      ${edu.location ? `<span class="text-gray-500 font-normal"> — ${edu.location}</span>` : ""}
                    </h3>
                  ` : ""}

                  ${(edu.startDate || edu.endDate) ? `
                    <p class="text-gray-600 text-sm wrap-break-word mt-1">
                      ${edu.startDate || ""} — ${edu.endDate || ""}
                    </p>
                  ` : ""}

                  ${edu.text ? `
                    <div class="pt-2 ml-6 pb-2 text-gray-700 text-[15px] wrap-break-word">
                      ${edu.text.replace(/<[^>]*>/g, "")}
                    </div>
                  ` : ""}
                </div>
              `).join("") : `<p class="text-gray-500">No education added yet.</p>`}
            </div>
          </div>

          <!-- Skills -->
          <div class="mt-3">
            <p class="text-[17px] font-bold">Skills</p>
            ${skills.length > 0 ? `
              <div class="grid grid-cols-2 gap-x-8 gap-y-3 mt-2">
                ${skills.map((skill, index) => `
                  <div key="${skill.id || index}">
                    <p class="text-sm wrap-break-word text-gray-600 mb-1">${skill.skill || ""}</p>
                    ${skill.level ? `
                      <div class="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                        <div class="h-full bg-[#0c0c1e]" style="width: ${getSkillLevelWidth(skill.level)}"></div>
                      </div>
                    ` : ""}
                  </div>
                `).join("")}
              </div>
            ` : `<p class="text-gray-500 mt-1">No skills added yet.</p>`}
          </div>

          <!-- Languages -->
          ${fixMapCalls.languages.length > 0 && fixMapCalls.languages.some(lang => lang.name?.trim()) ? `
            <div class="mt-3">
              <p class="text-[17px] font-bold">Languages</p>
              <div class="grid grid-cols-2 gap-x-8 gap-y-3 mt-2">
                ${fixMapCalls.languages.filter(lang => lang.name?.trim()).map((lang, index) => `
                  <div key="${lang._id || index}">
                    <p class="text-sm wrap-break-word text-gray-800 mb-1">${lang.name}</p>
                    ${lang.level ? `
                      <div class="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                        <div class="h-full bg-[#0c0c1e]" style="width: ${getSkillLevelWidth(Number(lang.level))}"></div>
                      </div>
                    ` : ""}
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}

          <!-- Certifications and Licenses -->
          ${fixMapCalls.certificationsAndLicenses.length > 0 && fixMapCalls.certificationsAndLicenses.some(item => 
            item.name?.replace(/<[^>]*>/g, "").trim()
          ) ? `
            <div class="mt-3">
              <p class="text-[17px] font-bold">Certifications and Licenses</p>
              <div class="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word">
                ${fixMapCalls.certificationsAndLicenses.filter(item => 
                  item.name?.replace(/<[^>]*>/g, "").trim()
                ).map((item, index) => `
                  <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
                `).join("")}
              </div>
            </div>
          ` : ""}

          <!-- Hobbies and Interests -->
          ${fixMapCalls.hobbiesAndInterests.length > 0 && fixMapCalls.hobbiesAndInterests.some(item => 
            item.name?.replace(/<[^>]*>/g, "").trim()
          ) ? `
            <div class="mt-2">
              <p class="text-[17px] font-bold">Hobbies and Interests</p>
              <div class="pt-1 pb-1 text-gray-700 text-[15px] wrap-break-word">
                ${fixMapCalls.hobbiesAndInterests.filter(item => 
                  item.name?.replace(/<[^>]*>/g, "").trim()
                ).map((item, index) => `
                  <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
                `).join("")}
              </div>
            </div>
          ` : ""}

          <!-- Awards and Honors -->
          ${fixMapCalls.awardsAndHonors.length > 0 && fixMapCalls.awardsAndHonors.some(item => 
            item.name?.replace(/<[^>]*>/g, "").trim()
          ) ? `
            <div class="mt-2">
              <h2 class="text-[17px] font-bold">Awards and Honors</h2>
              <div class="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word">
                ${fixMapCalls.awardsAndHonors.filter(item => 
                  item.name?.replace(/<[^>]*>/g, "").trim()
                ).map((item, index) => `
                  <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
                `).join("")}
              </div>
            </div>
          ` : ""}

          <!-- Websites and Social Media -->
          ${fixMapCalls.websitesAndSocialMedia.length > 0 && fixMapCalls.websitesAndSocialMedia.some(item => 
            item.websiteUrl?.trim() || item.socialMedia?.trim()
          ) ? `
            <div class="mt-2">
              <p class="text-[17px] font-bold">Websites and Social Media</p>
              <div class="pt-1 pb-1 text-[15px] text-gray-700 wrap-break-word">
                ${fixMapCalls.websitesAndSocialMedia.filter(item => 
                  item.websiteUrl?.trim() || item.socialMedia?.trim()
                ).map((item, index) => `
                  <div key="${item.id || index}" class="mb-2">
                    ${item.websiteUrl ? `
                      <div>
                        <p class="font-semibold text-sm">Website URL:</p>
                        <a href="${item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`}" class="text-gray-700 underline wrap-break-word text-sm">
                          ${item.websiteUrl}
                        </a>
                      </div>
                    ` : ""}
                    ${item.socialMedia ? `
                      <div class="mt-1">
                        <p class="font-semibold text-sm">Social Media URL:</p>
                        <a href="${item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`}" class="text-gray-700 underline wrap-break-word text-sm">
                          ${item.socialMedia}
                        </a>
                      </div>
                    ` : ""}
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}

          <!-- References -->
          ${fixMapCalls.references.length > 0 && fixMapCalls.references.some(item => 
            item.name?.replace(/<[^>]*>/g, "").trim()
          ) ? `
            <div class="mt-2">
              <p class="text-[17px] font-bold">References</p>
              <div class="pt-1 pb-2 text-gray-700 text-[15px] wrap-break-word">
                ${fixMapCalls.references.filter(item => 
                  item.name?.replace(/<[^>]*>/g, "").trim()
                ).map((item, index) => `
                  <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
                `).join("")}
              </div>
            </div>
          ` : ""}

          <!-- Custom Section -->
          ${fixMapCalls.customSection.length > 0 && fixMapCalls.customSection.some(section => 
            section?.name?.trim() || section?.description?.trim()
          ) ? `
            <div class="mt-3 mb-4">
              ${fixMapCalls.customSection.filter(section => 
                section?.name?.trim() || section?.description?.trim()
              ).map((section, index) => `
                <div key="${section.id || index}" class="pt-2 pb-3">
                  ${section.name ? `<p class="text-[17px] font-bold">${section.name}</p>` : ""}
                  ${section.description ? `
                    <div class="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word">
                      ${section.description.replace(/<[^>]*>/g, "")}
                    </div>
                  ` : ""}
                </div>
              `).join("")}
            </div>
          ` : ""}
        </div>
      </body>
      </html>
    `;
  };

  const handleDownload = async () => {
    try {
      const html = generateHTML();
      const res = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        { html },
        { responseType: "blob" }
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
      
      {/* Preview - using Tailwind classes directly */}
      <div
        className="bg-white border border-gray-100 font-nunito mx-auto"
        style={{
          width: "210mm",
          padding: "5mm",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div className="text-center font-bold mt-1 mb-2">
          <p className="text-[27px] uppercase">
            {contact?.firstName || ""} {contact?.lastName || ""}
          </p>
          {contact?.jobTitle && (
            <p className="text-[12px] font-normal mt-1">
              {getJobTitle(contact.jobTitle)}
            </p>
          )}
          <div className="flex justify-center items-center gap-4 mb-1">
            {/* Show LinkedIn only if provided */}
            {linkedinUrl && linkedinUrl.trim() && (
              <a
                href={
                  linkedinUrl.startsWith("http")
                    ? linkedinUrl
                    : `https://${linkedinUrl}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-semibold underline text-black text-[13px]"
              >
                <p>LinkedIn</p>
              </a>
            )}

            {/* Show Portfolio only if provided */}
            {contact?.portfolio && contact.portfolio.trim() && (
              <a
                href={
                  contact.portfolio.startsWith("http")
                    ? contact.portfolio
                    : `https://${contact.portfolio}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-semibold underline text-black text-[13px]"
              >
                <p>Portfolio</p>
              </a>
            )}
          </div>
        </div>

        <hr className="border-2 border-black" />

        <div className="flex justify-center gap-1 text-[13px] p-1 flex-wrap">
          <p>
            {contact?.address || ""}, {contact?.city || ""},{" "}
            {contact?.country || ""}, {contact?.postcode || ""}
          </p>
          {contact?.phone && <p> • {contact?.phone}</p>}
          {contact?.email && <p> • {contact?.email}</p>}
        </div>

        {/* Summary */}
        <div className="mt-3">
          <p className="text-[17px] font-bold">Summary</p>
          <div
            className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word"
            dangerouslySetInnerHTML={{ __html: summary || "" }}
          />
        </div>

        {/* Experience */}
        <div className="mt-2">
          {experiences?.length > 0 ? (
            experiences.map((exp, index) => (
              <div key={exp.id || index} className="mb-4">
                {index === 0 && (
                  <p className="text-[17px] font-bold">Experience</p>
                )}
                {(exp.jobTitle || exp.employer || exp.location) && (
                  <h3 className="font-semibold text-gray-900 wrap-break-word text-base mt-1">
                    {exp.jobTitle || ""}{" "}
                    {exp.employer && (
                      <span className="text-gray-500 font-normal">
                        — {exp.employer}
                      </span>
                    )}
                    {exp.location && (
                      <span className="text-gray-500 font-normal">
                        {" "}
                        — {exp.location}
                      </span>
                    )}
                  </h3>
                )}

                <div className="text-gray-600 text-sm mt-1">
                  <div className="flex items-center gap-2">
                    {/* START DATE */}
                    <MonthYearDisplay value={exp.startDate} shortYear={true} />

                    {/* SHOW "-" ONLY IF BOTH DATES EXIST */}
                    {exp.startDate && exp.endDate && <span>-</span>}

                    {/* END DATE */}
                    {exp.endDate ? (
                      <MonthYearDisplay value={exp.endDate} shortYear={true} />
                    ) : (
                      "Present"
                    )}
                  </div>
                </div>

                <div
                  className="pt-2 ml-6 pb-2 text-gray-700 text-[15px] wrap-break-word"
                  dangerouslySetInnerHTML={{ __html: exp.text || "" }}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No experience added yet.</p>
          )}
        </div>

        {/* Education */}
        <div className="mt-3">
          <p className="text-[17px] font-bold">Education</p>
          <div>
            {educations?.length > 0 ? (
              educations.map((edu, index) => (
                <div key={edu.id || index} className="mb-3">
                  {(edu.schoolname || edu.degree || edu.location) && (
                    <h3 className="font-semibold text-gray-900 wrap-break-word text-base mt-1">
                      {edu.schoolname || ""}
                      {edu.degree && (
                        <span className="text-gray-500 font-normal">
                          {" "}
                          — {edu.degree}
                        </span>
                      )}
                      {edu.location && (
                        <span className="text-gray-500 font-normal">
                          {" "}
                          — {edu.location}
                        </span>
                      )}
                    </h3>
                  )}

                  {(edu.startDate || edu.endDate) && (
                    <p className="text-gray-600 text-sm wrap-break-word mt-1">
                      {edu.startDate || ""} — {edu.endDate || ""}
                    </p>
                  )}

                  <div
                    className="pt-2 ml-6 pb-2 text-gray-700 text-[15px] wrap-break-word"
                    dangerouslySetInnerHTML={{ __html: edu.text || "" }}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No education added yet.</p>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-3">
          <p className="text-[17px] font-bold">Skills</p>
          {skills.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-2">
              {skills.map((skill, index) => (
                <div key={skill.id || index}>
                  <p className="text-sm wrap-break-word text-gray-600 mb-1">
                    {skill.skill || ""}
                  </p>
                  {skill.level && (
                    <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0c0c1e]"
                        style={{
                          width: `${(Number(skill.level) / 5) * 100}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-1">No skills added yet.</p>
          )}
        </div>

        {/* Languages */}
        {fixMapCalls.languages.length > 0 &&
          fixMapCalls.languages.some(
            (lang) => lang.name && lang.name.trim() !== "",
          ) && (
            <div className="mt-3">
              <p className="text-[17px] font-bold">Languages</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-2">
                {fixMapCalls.languages.map(
                  (lang, index) =>
                    lang.name &&
                    lang.name.trim() !== "" && (
                      <div key={lang._id || index}>
                        <p className="text-sm wrap-break-word text-gray-800 mb-1">
                          {lang.name}
                        </p>
                        {lang.level && (
                          <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#0c0c1e]"
                              style={{
                                width: `${(Number(lang.level) / 5) * 100}%`,
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

        {/* Certifications and Licenses */}
        {fixMapCalls.certificationsAndLicenses.length > 0 &&
          fixMapCalls.certificationsAndLicenses.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <div className="mt-3">
              <p className="text-[17px] font-bold">Certifications and Licenses</p>
              <div className="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word">
                {fixMapCalls.certificationsAndLicenses.map(
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

        {/* Hobbies and Interests */}
        {fixMapCalls.hobbiesAndInterests.length > 0 &&
          fixMapCalls.hobbiesAndInterests.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <div className="mt-2">
              <p className="text-[17px] font-bold">Hobbies and Interests</p>
              <div className="pt-1 pb-1 text-gray-700 text-[15px] wrap-break-word">
                {fixMapCalls.hobbiesAndInterests.map(
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

        {/* Awards and Honors */}
        {fixMapCalls.awardsAndHonors.length > 0 &&
          fixMapCalls.awardsAndHonors.some(
            (item) =>
              item?.name &&
              item.name.replace(/<[^>]+>/g, "").trim() !== "" &&
              item.name.toLowerCase() !== "<p><br></p>",
          ) && (
            <div className="mt-2">
              <h2 className="text-[17px] font-bold">Awards and Honors</h2>
              <div className="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word">
                {fixMapCalls.awardsAndHonors.map(
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
        {fixMapCalls.websitesAndSocialMedia.length > 0 &&
          fixMapCalls.websitesAndSocialMedia.some(
            (item) =>
              (item.websiteUrl && item.websiteUrl.trim() !== "") ||
              (item.socialMedia && item.socialMedia.trim() !== ""),
          ) && (
            <div className="mt-2">
              <p className="text-[17px] font-bold">Websites and Social Media</p>
              <div className="pt-1 pb-1 text-[15px] text-gray-700 wrap-break-word">
                {fixMapCalls.websitesAndSocialMedia.map(
                  (item, index) =>
                    ((item.websiteUrl && item.websiteUrl.trim() !== "") ||
                      (item.socialMedia && item.socialMedia.trim() !== "")) && (
                      <div key={item.id || index} className="mb-2">
                        {item.websiteUrl && (
                          <div>
                            <p className="font-semibold text-sm">Website URL:</p>
                            <a
                              href={
                                item.websiteUrl.startsWith("http")
                                  ? item.websiteUrl
                                  : `https://${item.websiteUrl}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-700 underline wrap-break-word text-sm"
                            >
                              {item.websiteUrl}
                            </a>
                          </div>
                        )}
                        {item.socialMedia && (
                          <div className="mt-1">
                            <p className="font-semibold text-sm">
                              Social Media URL:
                            </p>
                            <a
                              href={
                                item.socialMedia.startsWith("http")
                                  ? item.socialMedia
                                  : `https://${item.socialMedia}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-700 underline wrap-break-word text-sm"
                            >
                              {item.socialMedia}
                            </a>
                          </div>
                        )}
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

        {/* References */}
        {fixMapCalls.references.length > 0 &&
          fixMapCalls.references.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <div className="mt-2">
              <p className="text-[17px] font-bold">References</p>
              <div className="pt-1 pb-2 text-gray-700 text-[15px] wrap-break-word">
                {fixMapCalls.references.map(
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

        {/* Custom Section */}
        {fixMapCalls.customSection.length > 0 &&
          fixMapCalls.customSection.some(
            (section) => section?.name?.trim() || section?.description?.trim(),
          ) && (
            <div className="mt-3 mb-4">
              {fixMapCalls.customSection
                .filter(
                  (section) =>
                    section?.name?.trim() || section?.description?.trim(),
                )
                .map((section, index) => (
                  <div key={section.id || index} className="pt-2 pb-3">
                    {/* Show only content, no heading */}
                    {section.name && (
                      <p className="text-[17px] font-bold">{section.name}</p>
                    )}

                    {section.description && (
                      <div
                        className="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word"
                        dangerouslySetInnerHTML={{ __html: section.description }}
                      />
                    )}
                  </div>
                ))}
            </div>
          )}
      </div>
    </>
  );
};

export default TemplateFour;