// "use client";

// import React, { useContext, useState, useEffect } from "react";
// import { CreateContext } from "@/app/context/CreateContext"; // Updated import
// import { IoPersonOutline } from "react-icons/io5";
// import { API_URL } from "@/app/config/api";
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

// const TemplateFive: React.FC<ResumeProps> = ({ alldata }) => {
//   const context = useContext(CreateContext);
//   console.log("UseContextdd", context);

//   const { croppedImage } = context.contact || {};
//   console.log("croppedImage", croppedImage);

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

//     if (croppedImage) {
//       if (
//         typeof croppedImage === "string" &&
//         croppedImage.startsWith("blob:")
//       ) {
//         url = croppedImage;
//       } else if (typeof croppedImage === "string") {
//         url = `${API_URL}/api/uploads/photos/${croppedImage}`;
//       } else if (croppedImage instanceof Blob || croppedImage instanceof File) {
//         url = URL.createObjectURL(croppedImage);
//         return () => {
//           if (url) URL.revokeObjectURL(url);
//         };
//       }

//       setPreviewUrl(url);
//       return;
//     }

//     // If no croppedImage, fallback to contact.photo
//     if (contact.photo) {
//       setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
//     } else {
//       setPreviewUrl(null);
//     }
//   }, [croppedImage, contact.photo]);

//   // Type guard for FinalizeData
//   const isFinalizeData = (data: any): data is Finalize => {
//     return data && typeof data === "object" && !Array.isArray(data);
//   };

//   return (
//     <div>
//       {/* HEADER */}
//       <div className="bg-yellow-400 p-2 rounded-md px-10">
//         <div className="flex items-center justify-between">
//           <div className="flex gap-3 items-center">
//             {previewUrl ? (
//               // eslint-disable-next-line @next/next/no-img-element
//               <img
//                 src={previewUrl}
//                 alt="Cropped preview"
//                 className="w-24 h-24 rounded-md object-cover border"
//               />
//             ) : (
//               <IoPersonOutline className="w-24 h-24 rounded-md object-cover border" />
//             )}
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 uppercase">
//                 {contact?.firstName || ""} {contact?.lastName || ""}
//               </h1>
//               {contact?.jobTitle && (
//                 <p className="text-sm text-gray-700 mt-1">
//                   {getJobTitle(contact.jobTitle)}
//                 </p>
//               )}
//             </div>
//           </div>

//           <section className="mt-6 px-10">
//             <h2 className="text-lg font-semibold text-white border-b pb-1 mb-2 bg-black w-fit p-2 rounded-md">
//               DETAILS
//             </h2>
//             <p className="text-gray-700 text-sm">
//               {contact?.address || ""}, {contact?.city || ""},{" "}
//               {contact?.country || ""}, {contact?.postcode || ""}
//             </p>
//             <p className="text-gray-700 text-sm">{contact?.phone || ""}</p>
//             <p className="text-gray-700 text-sm">{contact?.email || ""}</p>
//           </section>
//         </div>

//         <div className="flex items-center gap-4 mt-3">
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
//               className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm transition-all duration-300 shadow"
//             >
//               <i className="fab fa-linkedin text-lg"></i>
//               <span>LinkedIn</span>
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
//               className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm transition-all duration-300 shadow"
//             >
//               <i className="fas fa-globe text-lg"></i>
//               <span>Portfolio</span>
//             </a>
//           )}
//         </div>
//       </div>

//       {/* SUMMARY */}
//       <section className="mt-3 px-10">
//         <h2 className="text-lg font-semibold mb-1 text-white bg-black w-fit p-2 rounded-md">
//           SUMMARY
//         </h2>
//         <div
//           className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word"
//           dangerouslySetInnerHTML={{ __html: summary || "" }}
//         />
//       </section>

//       {/* EXPERIENCE */}
//       <section className="mt-2 px-10">
//         <div>
//           {experiences?.length > 0 ? (
//             experiences.map((exp, index) => (
//               <div key={exp.id || index} className="mb-6">
//                 <h2 className="text-lg font-semibold text-white mb-1 bg-black w-fit p-2 rounded-md">
//                   EXPERIENCE
//                 </h2>
//                 {(exp.jobTitle || exp.employer || exp.location) && (
//                   <h3 className="font-semibold text-gray-900 text-lg wrap-break-word">
//                     {exp.jobTitle && `${exp.jobTitle} `}
//                     {exp.employer && (
//                       <span className="text-gray-500 font-normal">
//                         — {exp.employer}
//                       </span>
//                     )}
//                     {exp.location && (
//                       <span className="text-gray-500 font-normal">
//                         — {exp.location}
//                       </span>
//                     )}
//                   </h3>
//                 )}

//                 <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
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

//                 <div
//                   className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word"
//                   dangerouslySetInnerHTML={{ __html: exp.text || "" }}
//                 />
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No experience added yet.</p>
//           )}
//         </div>
//       </section>

//       {/* EDUCATION */}
//       <section className="mt-3 px-10">
//         <h2 className="text-lg font-semibold text-white mb-2 bg-black w-fit p-2 rounded-md">
//           EDUCATION
//         </h2>
//         <div>
//           {educations?.length > 0 ? (
//             educations.map((edu, index) => (
//               <div key={edu.id || index} className="mb-6">
//                 <h3 className="font-semibold text-gray-900 wrap-break-word text-lg">
//                   {edu.schoolname || ""}
//                 </h3>

//                 <p className="text-gray-500 text-[15px] font-normal">
//                   {edu.degree || ""}
//                 </p>

//                 <p className="text-gray-500 font-normal">
//                   {edu.location || ""}
//                 </p>

//                 {(edu.startDate || edu.endDate) && (
//                   <p className="text-gray-600 text-sm wrap-break-word mt-1">
//                     {edu.startDate || ""} — {edu.endDate || ""}
//                   </p>
//                 )}

//                 <div
//                   className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word"
//                   dangerouslySetInnerHTML={{ __html: edu.text || "" }}
//                 />
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No education added yet.</p>
//           )}
//         </div>
//       </section>

//       {/* SKILLS */}
//       <section className="mt-3 px-10">
//         <h2 className="text-lg font-semibold text-white mb-2 bg-black w-fit p-2 rounded-md">
//           SKILLS
//         </h2>
//         <div>
//           {skills.length > 0 ? (
//             <div className="grid grid-cols-2 gap-x-8 gap-y-3">
//               {skills.map((skill, index) => (
//                 <div key={skill.id || index}>
//                   <p className="text-sm text-gray-800 wrap-break-word mb-1">
//                     {skill.skill || ""}
//                   </p>
//                   {skill.level && (
//                     <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-[#0c0c1e]"
//                         style={{
//                           width: `${(Number(skill.level) / 4) * 100}%`,
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
//       </section>

//       {/* Languages */}
//       {isFinalizeData(finalize) &&
//         Array.isArray(finalize.languages) &&
//         finalize.languages.some(
//           (lang) => lang?.name && lang.name.trim() !== "",
//         ) && (
//           <div className="mt-3 px-10">
//             <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//               Languages
//             </h2>
//             <div className="grid grid-cols-2 gap-x-8 gap-y-3">
//               {finalize.languages.map(
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
//       {isFinalizeData(finalize) &&
//         Array.isArray(finalize.certificationsAndLicenses) &&
//         finalize.certificationsAndLicenses.some(
//           (item) =>
//             item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//         ) && (
//           <div className="mt-3 px-10">
//             <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//               Certifications and Licenses
//             </h2>
//             <div className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
//               {finalize.certificationsAndLicenses.map(
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
//       {isFinalizeData(finalize) &&
//         Array.isArray(finalize.hobbiesAndInterests) &&
//         finalize.hobbiesAndInterests.some(
//           (item) =>
//             item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//         ) && (
//           <div className="mt-3 px-10">
//             <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//               Hobbies and Interests
//             </h2>
//             <div className="pt-1 pb-2 text-[15px] wrap-break-word">
//               {finalize.hobbiesAndInterests.map(
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
//       {isFinalizeData(finalize) &&
//         Array.isArray(finalize.awardsAndHonors) &&
//         finalize.awardsAndHonors.some(
//           (item) =>
//             item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//         ) && (
//           <div className="mt-3 px-10">
//             <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//               Awards and Honors
//             </h2>
//             <div className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
//               {finalize.awardsAndHonors.map(
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
//       {isFinalizeData(finalize) &&
//         Array.isArray(finalize.websitesAndSocialMedia) &&
//         finalize.websitesAndSocialMedia.some(
//           (item) =>
//             (item?.websiteUrl && item.websiteUrl.trim() !== "") ||
//             (item?.socialMedia && item.socialMedia.trim() !== ""),
//         ) && (
//           <div className="mt-3 px-10">
//             <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//               Websites and Social Media
//             </h2>
//             <div className="pt-1 pb-2 text-[15px] wrap-break-word">
//               {finalize.websitesAndSocialMedia.map(
//                 (item, index) =>
//                   ((item?.websiteUrl && item.websiteUrl.trim() !== "") ||
//                     (item?.socialMedia && item.socialMedia.trim() !== "")) && (
//                     <div key={item.id || index} className="mb-2">
//                       {item.websiteUrl && (
//                         <div>
//                           <p className="font-semibold">Website URL:</p>
//                           <a
//                             href={
//                               item.websiteUrl.startsWith("http")
//                                 ? item.websiteUrl
//                                 : `https://${item.websiteUrl}`
//                             }
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 underline wrap-break-word"
//                           >
//                             {item.websiteUrl}
//                           </a>
//                         </div>
//                       )}

//                       {item.socialMedia && (
//                         <div className="mt-2">
//                           <p className="font-semibold">Social Media URL:</p>
//                           <a
//                             href={
//                               item.socialMedia.startsWith("http")
//                                 ? item.socialMedia
//                                 : `https://${item.socialMedia}`
//                             }
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 underline wrap-break-word"
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
//       {isFinalizeData(finalize) &&
//         Array.isArray(finalize.references) &&
//         finalize.references.some(
//           (item) =>
//             item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//         ) && (
//           <div className="mt-2 px-10">
//             <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//               References
//             </h2>
//             <div className="pt-1 pb-2 text-[15px] wrap-break-word">
//               {finalize.references.map(
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
//       {isFinalizeData(finalize) &&
//         Array.isArray(finalize.customSection) &&
//         finalize.customSection.some(
//           (section) => section?.name?.trim() || section?.description?.trim(),
//         ) && (
//           <div className="mt-1">
//             {finalize.customSection
//               .filter(
//                 (section) =>
//                   section?.name?.trim() || section?.description?.trim(),
//               )
//               .map((section, index) => (
//                 <div key={section.id || index} className="mt-2 px-10">
//                   {/* Show only content, no heading */}
//                   {section.name && (
//                     <p className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
//                       {section.name}
//                     </p>
//                   )}

//                   {section.description && (
//                     <div
//                       className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word"
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

// export default TemplateFive;

"use client";

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { IoPersonOutline } from "react-icons/io5";
import { API_URL } from "@/app/config/api";
import MonthYearDisplay from "@/app/utils/MonthYearDisplay";
import { usePathname } from "next/navigation";

import {
  Contact,
  Education,
  Experience,
  Finalize,
  Skill,
} from "@/app/types/context.types";

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

  useEffect(() => {
    let url: string | null = null;
    let objectUrl: string | null = null;

    if (croppedImage) {
      if (
        typeof croppedImage === "string" &&
        croppedImage.startsWith("blob:")
      ) {
        url = croppedImage;
      } else if (typeof croppedImage === "string") {
        url = `${API_URL}/api/uploads/photos/${croppedImage}`;
      } 
      // else if (croppedImage instanceof Blob || croppedImage instanceof File) {
      //   objectUrl = URL.createObjectURL(croppedImage);
      //   url = objectUrl;
      // }
      else if ((croppedImage as any) instanceof Blob || (croppedImage as any) instanceof File) {
    objectUrl = URL.createObjectURL(croppedImage as Blob);
    url = objectUrl;
  }

      setPreviewUrl(url);
    } else if (contact.photo) {
      setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
    } else {
      setPreviewUrl(null);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [croppedImage, contact.photo]);

  // Type guard for FinalizeData
  const isFinalizeData = (data: any): data is Finalize => {
    return data && typeof data === "object" && !Array.isArray(data);
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
        <div class="resume-container" style="width: 210mm; padding: 5mm; box-sizing: border-box; margin: 0 auto;">
          <!-- HEADER -->
          <div class="bg-yellow-400 p-2 rounded-md px-10">
            <div class="flex items-center justify-between">
              <div class="flex gap-3 items-center">
                ${
                  previewUrl
                    ? `<img src="${previewUrl}" alt="Profile" class="w-24 h-24 rounded-md object-cover border" />`
                    : `<div class="w-24 h-24 rounded-md border flex items-center justify-center bg-gray-100"><span class="text-gray-400">No Photo</span></div>`
                }
                <div>
                  <h1 class="text-2xl font-bold text-gray-900 uppercase">
                    ${contact?.firstName || ""} ${contact?.lastName || ""}
                  </h1>
                  ${contact?.jobTitle ? `
                    <p class="text-sm text-gray-700 mt-1">
                      ${getJobTitle(contact.jobTitle)}
                    </p>
                  ` : ""}
                </div>
              </div>

              <section class="mt-6 px-10">
                <h2 class="text-lg font-semibold text-white border-b pb-1 mb-2 bg-black w-fit p-2 rounded-md">
                  DETAILS
                </h2>
                <p class="text-gray-700 text-sm">
                  ${contact?.address || ""}, ${contact?.city || ""}, ${contact?.country || ""}, ${contact?.postcode || ""}
                </p>
                <p class="text-gray-700 text-sm">${contact?.phone || ""}</p>
                <p class="text-gray-700 text-sm">${contact?.email || ""}</p>
              </section>
            </div>

            <div class="flex items-center gap-4 mt-3">
              ${linkedinUrl && linkedinUrl.trim() ? `
                <a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm transition-all duration-300 shadow">
                  <span>LinkedIn</span>
                </a>
              ` : ""}
              ${contact?.portfolio && contact.portfolio.trim() ? `
                <a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm transition-all duration-300 shadow">
                  <span>Portfolio</span>
                </a>
              ` : ""}
            </div>
          </div>

          <!-- SUMMARY -->
          ${summary ? `
            <section class="mt-3 px-10">
              <h2 class="text-lg font-semibold mb-1 text-white bg-black w-fit p-2 rounded-md">
                SUMMARY
              </h2>
              <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
                ${summary.replace(/<[^>]*>/g, "")}
              </div>
            </section>
          ` : ""}

          <!-- EXPERIENCE -->
          <section class="mt-2 px-10">
            ${experiences?.length > 0 ? `
              <h2 class="text-lg font-semibold text-white mb-1 bg-black w-fit p-2 rounded-md">
                EXPERIENCE
              </h2>
              ${experiences.map((exp, index) => `
                <div key="${exp.id || index}" class="mb-6">
                  ${(exp.jobTitle || exp.employer || exp.location) ? `
                    <h3 class="font-semibold text-gray-900 text-lg wrap-break-word">
                      ${exp.jobTitle || ""}
                      ${exp.employer ? `<span class="text-gray-500 font-normal"> — ${exp.employer}</span>` : ""}
                      ${exp.location ? `<span class="text-gray-500 font-normal"> — ${exp.location}</span>` : ""}
                    </h3>
                  ` : ""}

                  <div class="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    ${exp.startDate || ""}
                    ${exp.startDate && exp.endDate ? `<span>-</span>` : ""}
                    ${exp.endDate ? exp.endDate : exp.startDate ? "Present" : ""}
                  </div>

                  ${exp.text ? `
                    <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
                      ${exp.text.replace(/<[^>]*>/g, "")}
                    </div>
                  ` : ""}
                </div>
              `).join("")}
            ` : `<p class="text-gray-500">No experience added yet.</p>`}
          </section>

          <!-- EDUCATION -->
          <section class="mt-3 px-10">
            <h2 class="text-lg font-semibold text-white mb-2 bg-black w-fit p-2 rounded-md">
              EDUCATION
            </h2>
            ${educations?.length > 0 ? educations.map((edu, index) => `
              <div key="${edu.id || index}" class="mb-6">
                <h3 class="font-semibold text-gray-900 wrap-break-word text-lg">
                  ${edu.schoolname || ""}
                </h3>
                <p class="text-gray-500 text-[15px] font-normal">${edu.degree || ""}</p>
                <p class="text-gray-500 font-normal">${edu.location || ""}</p>
                ${(edu.startDate || edu.endDate) ? `
                  <p class="text-gray-600 text-sm wrap-break-word mt-1">
                    ${edu.startDate || ""} — ${edu.endDate || ""}
                  </p>
                ` : ""}
                ${edu.text ? `
                  <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
                    ${edu.text.replace(/<[^>]*>/g, "")}
                  </div>
                ` : ""}
              </div>
            `).join("") : `<p class="text-gray-500">No education added yet.</p>`}
          </section>

          <!-- SKILLS -->
          <section class="mt-3 px-10">
            <h2 class="text-lg font-semibold text-white mb-2 bg-black w-fit p-2 rounded-md">
              SKILLS
            </h2>
            ${skills.length > 0 ? `
              <div class="grid grid-cols-2 gap-x-8 gap-y-3">
                ${skills.map((skill, index) => `
                  <div key="${skill.id || index}">
                    <p class="text-sm text-gray-800 wrap-break-word mb-1">${skill.skill || ""}</p>
                    ${skill.level ? `
                      <div class="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                        <div class="h-full bg-[#0c0c1e]" style="width: ${getSkillLevelWidth(skill.level)}"></div>
                      </div>
                    ` : ""}
                  </div>
                `).join("")}
              </div>
            ` : `<p class="text-gray-500">No skills added yet.</p>`}
          </section>

          <!-- Languages -->
          ${isFinalizeData(finalize) && Array.isArray(finalize.languages) && 
            finalize.languages.some(lang => lang?.name?.trim()) ? `
            <section class="mt-3 px-10">
              <h2 class="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
                Languages
              </h2>
              <div class="grid grid-cols-2 gap-x-8 gap-y-3">
                ${finalize.languages.filter(lang => lang.name?.trim()).map((lang, index) => `
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
            </section>
          ` : ""}

          <!-- Certifications and Licenses -->
          ${isFinalizeData(finalize) && Array.isArray(finalize.certificationsAndLicenses) && 
            finalize.certificationsAndLicenses.some(item => item.name?.replace(/<[^>]*>/g, "").trim()) ? `
            <section class="mt-3 px-10">
              <h2 class="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
                Certifications and Licenses
              </h2>
              <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
                ${finalize.certificationsAndLicenses.filter(item => 
                  item.name?.replace(/<[^>]*>/g, "").trim()
                ).map((item, index) => `
                  <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
                `).join("")}
              </div>
            </section>
          ` : ""}

          <!-- Hobbies and Interests -->
          ${isFinalizeData(finalize) && Array.isArray(finalize.hobbiesAndInterests) && 
            finalize.hobbiesAndInterests.some(item => item.name?.replace(/<[^>]*>/g, "").trim()) ? `
            <section class="mt-3 px-10">
              <h2 class="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
                Hobbies and Interests
              </h2>
              <div class="pt-1 pb-2 text-[15px] wrap-break-word">
                ${finalize.hobbiesAndInterests.filter(item => 
                  item.name?.replace(/<[^>]*>/g, "").trim()
                ).map((item, index) => `
                  <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
                `).join("")}
              </div>
            </section>
          ` : ""}

          <!-- Awards and Honors -->
          ${isFinalizeData(finalize) && Array.isArray(finalize.awardsAndHonors) && 
            finalize.awardsAndHonors.some(item => item.name?.replace(/<[^>]*>/g, "").trim()) ? `
            <section class="mt-3 px-10">
              <h2 class="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
                Awards and Honors
              </h2>
              <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
                ${finalize.awardsAndHonors.filter(item => 
                  item.name?.replace(/<[^>]*>/g, "").trim()
                ).map((item, index) => `
                  <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
                `).join("")}
              </div>
            </section>
          ` : ""}

          <!-- Websites and Social Media -->
          ${isFinalizeData(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && 
            finalize.websitesAndSocialMedia.some(item => item.websiteUrl?.trim() || item.socialMedia?.trim()) ? `
            <section class="mt-3 px-10">
              <h2 class="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
                Websites and Social Media
              </h2>
              <div class="pt-1 pb-2 text-[15px] wrap-break-word">
                ${finalize.websitesAndSocialMedia.filter(item => 
                  item.websiteUrl?.trim() || item.socialMedia?.trim()
                ).map((item, index) => `
                  <div key="${item.id || index}" class="mb-2">
                    ${item.websiteUrl ? `
                      <div>
                        <p class="font-semibold">Website URL:</p>
                        <a href="${item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`}" class="text-blue-600 underline wrap-break-word">
                          ${item.websiteUrl}
                        </a>
                      </div>
                    ` : ""}
                    ${item.socialMedia ? `
                      <div class="mt-2">
                        <p class="font-semibold">Social Media URL:</p>
                        <a href="${item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`}" class="text-blue-600 underline wrap-break-word">
                          ${item.socialMedia}
                        </a>
                      </div>
                    ` : ""}
                  </div>
                `).join("")}
              </div>
            </section>
          ` : ""}

          <!-- References -->
          ${isFinalizeData(finalize) && Array.isArray(finalize.references) && 
            finalize.references.some(item => item.name?.replace(/<[^>]*>/g, "").trim()) ? `
            <section class="mt-2 px-10">
              <h2 class="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
                References
              </h2>
              <div class="pt-1 pb-2 text-[15px] wrap-break-word">
                ${finalize.references.filter(item => 
                  item.name?.replace(/<[^>]*>/g, "").trim()
                ).map((item, index) => `
                  <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
                `).join("")}
              </div>
            </section>
          ` : ""}

          <!-- Custom Section -->
          ${isFinalizeData(finalize) && Array.isArray(finalize.customSection) && 
            finalize.customSection.some(section => section?.name?.trim() || section?.description?.trim()) ? `
            <div class="mt-1">
              ${finalize.customSection.filter(section => 
                section?.name?.trim() || section?.description?.trim()
              ).map((section, index) => `
                <div key="${section.id || index}" class="mt-2 px-10">
                  ${section.name ? `
                    <p class="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
                      ${section.name}
                    </p>
                  ` : ""}
                  ${section.description ? `
                    <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
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
      
      {/* Preview */}
        <div
        className="bg-white border border-gray-100 font-nunito mx-auto"
        style={{
          width: "210mm",
          padding: "5mm",
          boxSizing: "border-box",
        }}
      >
        {/* HEADER */}
        <div className="bg-yellow-400 p-2 rounded-md px-10">
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="Cropped preview"
                  className="w-24 h-24 rounded-md object-cover border"
                />
              ) : (
                <IoPersonOutline className="w-24 h-24 rounded-md object-cover border" />
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 uppercase">
                  {contact?.firstName || ""} {contact?.lastName || ""}
                </h1>
                {contact?.jobTitle && (
                  <p className="text-sm text-gray-700 mt-1">
                    {getJobTitle(contact.jobTitle)}
                  </p>
                )}
              </div>
            </div>

            <section className="mt-6 px-10">
              <h2 className="text-lg font-semibold text-white border-b pb-1 mb-2 bg-black w-fit p-2 rounded-md">
                DETAILS
              </h2>
              <p className="text-gray-700 text-sm">
                {contact?.address || ""}, {contact?.city || ""},{" "}
                {contact?.country || ""}, {contact?.postcode || ""}
              </p>
              <p className="text-gray-700 text-sm">{contact?.phone || ""}</p>
              <p className="text-gray-700 text-sm">{contact?.email || ""}</p>
            </section>
          </div>

          <div className="flex items-center gap-4 mt-3">
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
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm transition-all duration-300 shadow"
              >
                <i className="fab fa-linkedin text-lg"></i>
                <span>LinkedIn</span>
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
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm transition-all duration-300 shadow"
              >
                <i className="fas fa-globe text-lg"></i>
                <span>Portfolio</span>
              </a>
            )}
          </div>
        </div>

        {/* SUMMARY */}
        <section className="mt-3 px-10">
          <h2 className="text-lg font-semibold mb-1 text-white bg-black w-fit p-2 rounded-md">
            SUMMARY
          </h2>
          <div
            className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word"
            dangerouslySetInnerHTML={{ __html: summary || "" }}
          />
        </section>

        {/* EXPERIENCE */}
        <section className="mt-2 px-10">
          <div>
            {experiences?.length > 0 ? (
              experiences.map((exp, index) => (
                <div key={exp.id || index} className="mb-6">
                  <h2 className="text-lg font-semibold text-white mb-1 bg-black w-fit p-2 rounded-md">
                    EXPERIENCE
                  </h2>
                  {(exp.jobTitle || exp.employer || exp.location) && (
                    <h3 className="font-semibold text-gray-900 text-lg wrap-break-word">
                      {exp.jobTitle && `${exp.jobTitle} `}
                      {exp.employer && (
                        <span className="text-gray-500 font-normal">
                          — {exp.employer}
                        </span>
                      )}
                      {exp.location && (
                        <span className="text-gray-500 font-normal">
                          — {exp.location}
                        </span>
                      )}
                    </h3>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
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

                  <div
                    className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word"
                    dangerouslySetInnerHTML={{ __html: exp.text || "" }}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No experience added yet.</p>
            )}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="mt-3 px-10">
          <h2 className="text-lg font-semibold text-white mb-2 bg-black w-fit p-2 rounded-md">
            EDUCATION
          </h2>
          <div>
            {educations?.length > 0 ? (
              educations.map((edu, index) => (
                <div key={edu.id || index} className="mb-6">
                  <h3 className="font-semibold text-gray-900 wrap-break-word text-lg">
                    {edu.schoolname || ""}
                  </h3>

                  <p className="text-gray-500 text-[15px] font-normal">
                    {edu.degree || ""}
                  </p>

                  <p className="text-gray-500 font-normal">
                    {edu.location || ""}
                  </p>

                  {(edu.startDate || edu.endDate) && (
                    <p className="text-gray-600 text-sm wrap-break-word mt-1">
                      {edu.startDate || ""} — {edu.endDate || ""}
                    </p>
                  )}

                  <div
                    className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word"
                    dangerouslySetInnerHTML={{ __html: edu.text || "" }}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No education added yet.</p>
            )}
          </div>
        </section>

        {/* SKILLS */}
        <section className="mt-3 px-10">
          <h2 className="text-lg font-semibold text-white mb-2 bg-black w-fit p-2 rounded-md">
            SKILLS
          </h2>
          <div>
            {skills.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {skills.map((skill, index) => (
                  <div key={skill.id || index}>
                    <p className="text-sm text-gray-800 wrap-break-word mb-1">
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
              <p className="text-gray-500">No skills added yet.</p>
            )}
          </div>
        </section>

        {/* Languages */}
        {isFinalizeData(finalize) &&
          Array.isArray(finalize.languages) &&
          finalize.languages.some(
            (lang) => lang?.name && lang.name.trim() !== "",
          ) && (
            <section className="mt-3 px-10">
              <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
                Languages
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {finalize.languages.map(
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
            </section>
          )}

        {/* Certifications and Licenses */}
        {isFinalizeData(finalize) &&
          Array.isArray(finalize.certificationsAndLicenses) &&
          finalize.certificationsAndLicenses.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <section className="mt-3 px-10">
              <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
                Certifications and Licenses
              </h2>
              <div className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
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
            </section>
          )}

        {/* Hobbies and Interests */}
        {isFinalizeData(finalize) &&
          Array.isArray(finalize.hobbiesAndInterests) &&
          finalize.hobbiesAndInterests.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <section className="mt-3 px-10">
              <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
                Hobbies and Interests
              </h2>
              <div className="pt-1 pb-2 text-[15px] wrap-break-word">
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
            </section>
          )}

        {/* Awards and Honors */}
        {isFinalizeData(finalize) &&
          Array.isArray(finalize.awardsAndHonors) &&
          finalize.awardsAndHonors.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <section className="mt-3 px-10">
              <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
                Awards and Honors
              </h2>
              <div className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
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
            </section>
          )}

        {/* Websites and Social Media */}
        {isFinalizeData(finalize) &&
          Array.isArray(finalize.websitesAndSocialMedia) &&
          finalize.websitesAndSocialMedia.some(
            (item) =>
              (item?.websiteUrl && item.websiteUrl.trim() !== "") ||
              (item?.socialMedia && item.socialMedia.trim() !== ""),
          ) && (
            <section className="mt-3 px-10">
              <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
                Websites and Social Media
              </h2>
              <div className="pt-1 pb-2 text-[15px] wrap-break-word">
                {finalize.websitesAndSocialMedia.map(
                  (item, index) =>
                    ((item?.websiteUrl && item.websiteUrl.trim() !== "") ||
                      (item?.socialMedia && item.socialMedia.trim() !== "")) && (
                      <div key={item.id || index} className="mb-2">
                        {item.websiteUrl && (
                          <div>
                            <p className="font-semibold">Website URL:</p>
                            <a
                              href={
                                item.websiteUrl.startsWith("http")
                                  ? item.websiteUrl
                                  : `https://${item.websiteUrl}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline wrap-break-word"
                            >
                              {item.websiteUrl}
                            </a>
                          </div>
                        )}

                        {item.socialMedia && (
                          <div className="mt-2">
                            <p className="font-semibold">Social Media URL:</p>
                            <a
                              href={
                                item.socialMedia.startsWith("http")
                                  ? item.socialMedia
                                  : `https://${item.socialMedia}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline wrap-break-word"
                            >
                              {item.socialMedia}
                            </a>
                          </div>
                        )}
                      </div>
                    ),
                )}
              </div>
            </section>
          )}

        {/* References */}
        {isFinalizeData(finalize) &&
          Array.isArray(finalize.references) &&
          finalize.references.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <section className="mt-2 px-10">
              <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
                References
              </h2>
              <div className="pt-1 pb-2 text-[15px] wrap-break-word">
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
            </section>
          )}

        {/* Custom Section */}
        {isFinalizeData(finalize) &&
          Array.isArray(finalize.customSection) &&
          finalize.customSection.some(
            (section) => section?.name?.trim() || section?.description?.trim(),
          ) && (
            <div className="mt-1">
              {finalize.customSection
                .filter(
                  (section) =>
                    section?.name?.trim() || section?.description?.trim(),
                )
                .map((section, index) => (
                  <div key={section.id || index} className="mt-2 px-10">
                    {/* Show only content, no heading */}
                    {section.name && (
                      <p className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
                        {section.name}
                      </p>
                    )}

                    {section.description && (
                      <div
                        className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word"
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

export default TemplateFive;