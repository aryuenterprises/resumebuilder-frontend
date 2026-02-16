// "use client";
// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import MonthYearDisplay from "@/app/resume-details/MonthYearDisplay";
// import {
//   Contact,
//   Education,
//   Experience,
//   FinalizeData,
//   Skill,
// } from "@/app/types/context";

// interface AllData {
//   contact?: Contact;
//   educations?: Education[];
//   experiences?: Experience[];
//   skills?: Skill[];
//   finalize?: FinalizeData;
//   summary?: string;
// }

// interface Resume4Props {
//   alldata?: AllData;
// }

// // const Resume2 = (alldetails) => {
// const TemplateTwo: React.FC<Resume4Props> = ({ alldata }) => {
//   const UseContext = useContext(CreateContext);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const contact = alldata?.contact || UseContext.contact || {};
//   const educations = alldata?.educations || UseContext?.education || [];
//   const experiences = alldata?.experiences || UseContext?.experiences || [];
//   const skills = alldata?.skills || UseContext?.skills || [];
//   const finalize = alldata?.finalize || UseContext?.globalSkillsData || {};
//   const summary = alldata?.summary || UseContext?.text || [];
//   const linkedinUrl = contact?.linkedin;

//   useEffect(() => {
//     let url;

//     if (contact.croppedImage) {
//       // Case 1: croppedImage is a blob URL (local preview)
//       if (
//         typeof contact.croppedImage === "string" &&
//         contact.croppedImage.startsWith("blob:")
//       ) {
//         url = contact.croppedImage;
//       }
//       // Case 2: croppedImage is a backend filename (string but not blob)
//       else if (typeof contact.croppedImage === "string") {
//         url = `${API_URL}/api/uploads/photos/${contact.croppedImage}`;
//       }
//       // Case 3: croppedImage is a File/Blob object
//       else if (contact.croppedImage instanceof Blob || croppedImage instanceof File) {
//         url = URL.createObjectURL(croppedImage);
//         return () => URL.revokeObjectURL(url); // cleanup
//       }

//       setPreviewUrl(url);
//       return; // stop here if croppedImage exists
//     }

//     // If no croppedImage, fallback to contact.photo
//     if (contact.photo) {
//       setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
//     }
//   }, [croppedImage, contact.photo]);

//   return (
//     <div
//       className=" bg-white border border-gray-100 font-nunito mx-auto"
//       style={{
//         width: "210mm",
//         // height: "297mm",
//         padding: "5mm",
//         boxSizing: "border-box",
//       }}
//     >
//       {/* header */}
//       <div className="flex bg-[#EADCCE] py-2 rounded-tl-3xl rounded-tr-3xl border-b border-gray-300 mx-auto">
//         <div className="flex justify-center items-center w-[22%] p-2 ">
//           {previewUrl ? (
//             <img
//               src={previewUrl}
//               alt="Cropped preview"
//               className=" rounded-md object-cover border"
//             />
//           ) : (
//             <p>
//               <IoPersonOutline className=" w-32 h-32 rounded-md object-cover border" />
//             </p>
//           )}
//         </div>
//         <div className="w-[68%] pl-10">
//           <p className="text-3xl tracking-wide text-gray-800 leading-tight capitalize">
//             {" "}
//             {contact?.firstName || ""}
//             <span className="mx-2 capitalize">
//               {contact?.lastName || ""}
//             </span>{" "}
//           </p>
//           {/* <p className='text-xs font-serif py-1 text-[11px] font-semibold  mb-1'>{contact?.jobTitle?.name || "Senior Analyst"} */}
//           {/* </p> */}
//           <p className="text-xs py-1 text-[12px] leading-snug ">
//             {contact?.address || ""} , {contact?.city || ""} ,{" "}
//             {contact?.country || ""} ,{contact?.postcode || ""}
//           </p>
//           <p className="text-xs font-serif ">{contact?.email || ""}</p>
//           <p className="text-xs py-2">{contact?.phone || ""}</p>
//           <div className="flex items-center p-0 gap-4 mt-1">
//             {/* Show LinkedIn only if provided */}
//             {linkedinUrl && (
//               <a
//                 href={
//                   linkedinUrl.startsWith("http")
//                     ? linkedinUrl
//                     : `https://${linkedinUrl}`
//                 }
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 text-black text-sm "
//               >
//                 <p className="text-[13px] font-bold underline">LinkedIn</p>
//               </a>
//             )}

//             {/* Show Portfolio only if provided */}
//             {contact?.portfolio && (
//               <a
//                 href={
//                   contact.portfolio.startsWith("http")
//                     ? contact.portfolio
//                     : `https://${contact.portfolio}`
//                 }
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 text-black text-sm"
//               >
//                 <p className="text-[13px] font-bold underline">Portfolio</p>
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* body*/}
//       <div className="flex gap-3 mx-auto ">
//         {/* left side */}
//         <div className="pt-2 pl-5 w-[40%]">
//           {/* summary */}
//           <div className="mb-2">
//             <p className="text-[15px] font-semibold underline underline-offset-4 decoration-2 decoration-gray-800 mb-2 tracking-wide">
//               SUMMARY{" "}
//             </p>
//             <p
//               className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word
//     [&_ol]:list-decimal
//     [&_ul]:list-disc
//     [&_li[data-list='bullet']]:list-disc
//     [&_li[data-list='ordered']]:list-decimal
//     [&_li]:ml-4"
//             >
//               <div
//                 className="wrap-break-word"
//                 dangerouslySetInnerHTML={{ __html: summary || "" }}
//               />
//             </p>
//           </div>

//           {/* skills */}

//           <div className="w-full max-w-md mx-auto rounded-2xl ">
//             <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//               skills
//             </p>
//             <p className="list-disc list-inside marker:mr-0 marker:text-gray-800 text-[12.5px] text-gray-700 leading-5 space-y-1 ">
//               {skills.length > 0 ? (
//                 <div className="grid grid-cols-2 gap-x-8 gap-y-3">
//                   {skills.map((skill) => (
//                     <div key={skill._id || skill.id}>
//                       <p className="text-sm text-gray-800 mb-1">
//                         {skill.skill || ""}
//                       </p>
//                       {skill.level && (
//                         <div className="h-[4px] w-full bg-gray-300 rounded-full overflow-hidden">
//                           <div
//                             className="h-full bg-[#0c0c1e]"
//                             style={{
//                               width: `${(Number(skill.level) / 4) * 100}%`,
//                             }}
//                           ></div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <ul className="list-disc pl-6 space-y-1 text-sm text-gray-800">
//                   {skills.map((skill) => (
//                     <li key={skill._id || skill.id}>{skill.skill || ""}</li>
//                   ))}
//                 </ul>
//               )}
//             </p>
//           </div>

//           {/*  Languages */}
//           {Array.isArray(finalize?.languages) &&
//             finalize.languages.some(
//               (lang) => lang.name && lang.name.trim() !== "",
//             ) && (
//               <div className="mt-2">
//                 <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                   Languages
//                 </p>
//                 <div className="grid grid-cols-2 gap-x-8 gap-y-3">
//                   {finalize.languages.map(
//                     (lang, index) =>
//                       lang.name &&
//                       lang.name.trim() !== "" && (
//                         <div key={lang._id || index}>
//                           <p className="text-sm wrap-break-word text-gray-800 mb-1">
//                             {lang.name}
//                           </p>
//                           {lang.level && (
//                             <div className="h-[4px] w-full bg-gray-300 rounded-full overflow-hidden">
//                               <div
//                                 className="h-full bg-[#0c0c1e]"
//                                 style={{
//                                   width: `${(Number(lang.level) / 4) * 100}%`,
//                                 }}
//                               ></div>
//                             </div>
//                           )}
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/*  Certifications and Licenses */}
//           {Array.isArray(finalize?.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some(
//               (item) =>
//                 item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <div className="mt-2">
//                 <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                   Certifications and Licenses
//                 </p>
//                 <div
//                   className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word
//     [&_ol]:list-decimal
//     [&_ul]:list-disc
//     [&_li[data-list='bullet']]:list-disc
//     [&_li[data-list='ordered']]:list-decimal
//     [&_li]:ml-4"
//                 >
//                   {finalize.certificationsAndLicenses.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div
//                           key={item._id || index}
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/*  Hobbies and Interests */}
//           {Array.isArray(finalize?.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some(
//               (item) =>
//                 item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <div className="mt-2">
//                 <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                   Hobbies and Interests
//                 </p>
//                 <div className="pt-1 pb-2 text-gray-500 text-[15px] wrap-break-word">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div
//                           key={item._id || index}
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/*  Awards and Honors */}
//           {Array.isArray(finalize?.awardsAndHonors) &&
//             finalize.awardsAndHonors.some(
//               (item) =>
//                 item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <div className="mt-2">
//                 <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                   Awards and Honors
//                 </p>
//                 <div
//                   className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word
//     [&_ol]:list-decimal
//     [&_ul]:list-disc
//     [&_li[data-list='bullet']]:list-disc
//     [&_li[data-list='ordered']]:list-decimal
//     [&_li]:ml-4"
//                 >
//                   {finalize.awardsAndHonors.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div
//                           key={item._id || index}
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/*  References */}
//           {Array.isArray(finalize?.references) &&
//             finalize.references.some(
//               (item) =>
//                 item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
//             ) && (
//               <div className="mt-2 ">
//                 <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                   References
//                 </p>
//                 <div className="pt-1 pb-2 text-gray-500 text-[15px] wrap-break-word">
//                   {finalize.references.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div
//                           key={item._id || index}
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}
//         </div>

//         <div className="w-1 border-l border-gray-300 mx-1"></div>
//         {/* right */}
//         <div className="w-[60%]">
//           <div className="w-full pt-2 pr-5">
//             {/* experience */}
//             <div>
//               {experiences?.length > 0 ? (
//                 experiences.map((exp, index) => (
//                   <div key={exp._id || exp.id || index} className="">
//                     <div className="text-[15px] font-semibold underline underline-offset-4 decoration-gray-800 decoration-2 mb-2">
//                       EXPERIENCE
//                     </div>
//                     <div className="flex justify-between items-center mt-1 mb-2">
//                       {exp.jobTitle && (
//                         <i className="text-[11.5px] font-semibold">
//                           {exp.jobTitle || ""}
//                         </i>
//                       )}
//                       <div className="flex justify-center items-center text-[11.5px] font-semibold gap-1">
//                         {/* START DATE */}
//                         <MonthYearDisplay
//                           value={exp.startDate}
//                           shortYear={true}
//                         />

//                         {/* SHOW "-" ONLY IF BOTH DATES EXIST */}
//                         {exp.startDate && exp.endDate && <span>-</span>}

//                         {/* END DATE */}
//                         {exp.endDate ? (
//                           <MonthYearDisplay
//                             value={exp.endDate}
//                             shortYear={true}
//                           />
//                         ) : (
//                           ""
//                         )}
//                       </div>
//                     </div>

//                     <div>
//                       {(exp.location || exp.employer) && (
//                         <p className="text-[12px] text-gray-700 mb-2">
//                           {exp.location || ""} - {exp.employer || ""}
//                         </p>
//                       )}

//                       <ul
//                         className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word
//     [&_ol]:list-decimal
//     [&_ul]:list-disc
//     [&_li[data-list='bullet']]:list-disc
//     [&_li[data-list='ordered']]:list-decimal
//     [&_li]:ml-4"
//                       >
//                         <li
//                           dangerouslySetInnerHTML={{
//                             __html: exp.text || "",
//                           }}
//                         />
//                       </ul>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No experience added yet.</p>
//               )}
//             </div>

//             {/* education */}

//             <p className="text-[15px] font-semibold underline underline-offset-4 mb-3 mt-4 decoration-2 decoration-gray-800">
//               EDUCATION
//             </p>
//             {educations?.length > 0 ? (
//               educations.map((edu, index) => (
//                 <div key={edu._id || edu.id || index} className="">
//                   <div className="flex justify-between items-center mt-1 mb-2">
//                     <i className="text-[11.5px] font-semibold">
//                       {edu.schoolname || ""}
//                     </i>
//                     <div className="flex justify-center items-center text-[11.5px] font-semibold gap-1">
//                       {(edu.startDate || edu.endDate) && (
//                         <>
//                           <i>{edu.startDate || ""}</i>
//                           <hr className="w-3 border-l border-black" />
//                           <i>{edu.endDate || ""}</i>
//                         </>
//                       )}
//                     </div>
//                   </div>

//                   <div>
//                     {(edu.location || edu.degree) && (
//                       <p className="text-[12px] text-gray-700 mb-2">
//                         {edu.location || ""} - {edu.degree || ""}
//                       </p>
//                     )}

//                     <ul
//                       className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word
//     [&_ol]:list-decimal
//     [&_ul]:list-disc
//     [&_li[data-list='bullet']]:list-disc
//     [&_li[data-list='ordered']]:list-decimal
//     [&_li]:ml-4"
//                     >
//                       <li
//                         dangerouslySetInnerHTML={{
//                           __html: edu.text || "",
//                         }}
//                       />
//                     </ul>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No education added yet.</p>
//             )}
//           </div>
//           {/*  Websites and Social Media */}
//           {Array.isArray(finalize?.websitesAndSocialMedia) &&
//             finalize.websitesAndSocialMedia.some(
//               (item) =>
//                 (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//                 (item.socialMedia && item.socialMedia.trim() !== ""),
//             ) && (
//               <div className="mt-2 ">
//                 <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                   Websites and Social Media
//                 </p>
//                 <div className="pt-1 pb-2 text-[15px] wrap-break-word">
//                   {finalize.websitesAndSocialMedia.map(
//                     (item, index) =>
//                       ((item.websiteUrl && item.websiteUrl.trim() !== "") ||
//                         (item.socialMedia &&
//                           item.socialMedia.trim() !== "")) && (
//                         <div key={item._id || index} className="mb-2">
//                           {item.websiteUrl && (
//                             <div>
//                               <p className="font-semibold">Website URL:</p>
//                               <a
//                                 href={
//                                   item.websiteUrl.startsWith("http")
//                                     ? item.websiteUrl
//                                     : `https://${item.websiteUrl}`
//                                 }
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-gray-500 underline wrap-break-word"
//                               >
//                                 {item.websiteUrl}
//                               </a>
//                             </div>
//                           )}
//                           {item.socialMedia && (
//                             <div className="mt-2">
//                               <p className="font-semibold">Social Media URL:</p>
//                               <a
//                                 href={
//                                   item.socialMedia.startsWith("http")
//                                     ? item.socialMedia
//                                     : `https://${item.socialMedia}`
//                                 }
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-gray-500 underline wrap-break-word"
//                               >
//                                 {item.socialMedia}
//                               </a>
//                             </div>
//                           )}
//                         </div>
//                       ),
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* Custom Section */}

//           {Array.isArray(finalize?.customSection) &&
//             finalize.customSection.some(
//               (section) =>
//                 section?.name?.trim() || section?.description?.trim(),
//             ) && (
//               <div className="mt-1">
//                 {/* REMOVE HEADING – DO NOT SHOW CUSTOM SECTION TITLE */}

//                 {finalize.customSection
//                   .filter(
//                     (section) =>
//                       section?.name?.trim() || section?.description?.trim(),
//                   )
//                   .map((section, index) => (
//                     <div key={section.id || index} className="mt-2 ">
//                       {/* Show only content, no heading */}
//                       {section.name && (
//                         <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 ">
//                           {section.name}
//                         </p>
//                       )}

//                       {section.description && (
//                         <div
//                           className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word
//     [&_ol]:list-decimal
//     [&_ul]:list-disc
//     [&_li[data-list='bullet']]:list-disc
//     [&_li[data-list='ordered']]:list-decimal
//     [&_li]:ml-4"
//                           dangerouslySetInnerHTML={{
//                             __html: section.description,
//                           }}
//                         />
//                       )}
//                     </div>
//                   ))}
//               </div>
//             )}
//         </div>
//       </div>
//       //{" "}
//     </div>
//   );
// };

// export default TemplateTwo;

// "use client";
// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import MonthYearDisplay from "@/app/utils/MonthYearDisplay";
// import { IoPersonOutline } from "react-icons/io5";
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

// interface Resume4Props {
//   alldata?: AllData;
// }

// const TemplateTwo: React.FC<Resume4Props> = ({ alldata }) => {
//   const UseContext = useContext(CreateContext);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const contact = alldata?.contact || UseContext?.contact || {};
//   const educations = alldata?.educations || UseContext?.education || [];
//   const experiences = alldata?.experiences || UseContext?.experiences || [];
//   const skills = alldata?.skills || UseContext?.skills || [];
//   const finalize = alldata?.finalize || UseContext?.finalize || {};
//   const summary = alldata?.summary || UseContext?.summary || "";
//   const linkedinUrl = contact?.linkedin;

//   useEffect(() => {
//     let url: string | null = null;
//     let objectUrl: string | null = null;

//     if (contact.croppedImage) {
//       // Case 1: croppedImage is a blob URL (local preview)
//       if (
//         typeof contact.croppedImage === "string" &&
//         contact.croppedImage.startsWith("blob:")
//       ) {
//         url = contact.croppedImage;
//       }
//       // Case 2: croppedImage is a backend filename (string but not blob)
//       else if (typeof contact.croppedImage === "string") {
//         url = `${API_URL}/api/uploads/photos/${contact.croppedImage}`;
//       }
//       // Case 3: croppedImage is a File/Blob object
//       else if (
//         contact.croppedImage instanceof Blob ||
//         contact.croppedImage instanceof File
//       ) {
//         objectUrl = URL.createObjectURL(contact.croppedImage);
//         url = objectUrl;
//       }

//       setPreviewUrl(url);
//     }
//     // If no croppedImage, fallback to contact.photo
//     else if (contact.photo) {
//       setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
//     } else {
//       setPreviewUrl(null);
//     }

//     // Cleanup function
//     return () => {
//       if (objectUrl) {
//         URL.revokeObjectURL(objectUrl);
//       }
//     };
//   }, [contact.croppedImage, contact.photo]);

//   // Filter out empty skills
//   const filteredSkills = skills.filter((skill) => skill.skill?.trim());

//   return (
//     <div
//       className="bg-white border border-gray-100 font-nunito mx-auto"
//       style={{
//         width: "210mm",
//         padding: "5mm",
//         boxSizing: "border-box",
//       }}
//     >
//       {/* header */}
//       <div className="flex bg-[#EADCCE] py-2 rounded-tl-3xl rounded-tr-3xl border-b border-gray-300 mx-auto">
//         <div className="flex justify-center items-center w-[22%] p-2">
//           {previewUrl ? (
//             <img
//               src={previewUrl}
//               alt="Profile"
//               className="w-32 h-32 rounded-md object-cover border"
//             />
//           ) : (
//             <IoPersonOutline className="w-32 h-32 text-gray-400" />
//           )}
//         </div>
//         <div className="w-[68%] pl-10">
//           <p className="text-3xl tracking-wide text-gray-800 leading-tight capitalize">
//             {contact?.firstName || ""}
//             <span className="mx-2 capitalize">{contact?.lastName || ""}</span>
//           </p>
//           <p className="text-xs py-1 text-[12px] leading-snug">
//             {[contact?.address, contact?.city, contact?.country, contact?.postcode]
//               .filter(Boolean)
//               .join(", ")}
//           </p>
//           <p className="text-xs font-serif">{contact?.email || ""}</p>
//           <p className="text-xs py-2">{contact?.phone || ""}</p>
//           <div className="flex items-center p-0 gap-4 mt-1">
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
//                 className="flex items-center gap-2 text-black text-sm"
//               >
//                 <p className="text-[13px] font-bold underline">LinkedIn</p>
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
//                 className="flex items-center gap-2 text-black text-sm"
//               >
//                 <p className="text-[13px] font-bold underline">Portfolio</p>
//               </a>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* body */}
//       <div className="flex gap-3 mx-auto">
//         {/* left side */}
//         <div className="pt-2 pl-5 w-[40%]">
//           {/* summary */}
//           {summary && (
//             <div className="mb-2">
//               <p className="text-[15px] font-semibold underline underline-offset-4 decoration-2 decoration-gray-800 mb-2 tracking-wide">
//                 SUMMARY
//               </p>
//               <div
//                 className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4"
//                 dangerouslySetInnerHTML={{ __html: summary }}
//               />
//             </div>
//           )}

//           {/* skills */}
//           {filteredSkills.length > 0 && (
//             <div className="w-full max-w-md mx-auto rounded-2xl mb-4">
//               <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                 Skills
//               </p>
//               <div className="grid grid-cols-2 gap-x-8 gap-y-3">
//                 {filteredSkills.map((skill) => (
//                   <div key={skill.id}>
//                     <p className="text-sm text-gray-800 mb-1">
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
//             </div>
//           )}

//           {/* Languages */}
//           {Array.isArray(finalize?.languages) &&
//             finalize.languages.some(
//               (lang) => lang.name && lang.name.trim() !== ""
//             ) && (
//               <div className="mt-2 mb-4">
//                 <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                   Languages
//                 </p>
//                 <div className="grid grid-cols-2 gap-x-8 gap-y-3">
//                   {finalize.languages.map(
//                     (lang, index) =>
//                       lang.name &&
//                       lang.name.trim() !== "" && (
//                         <div key={lang._id || index}>
//                           <p className="text-sm wrap-break-word text-gray-800 mb-1">
//                             {lang.name}
//                           </p>
//                           {lang.level && (
//                             <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//                               <div
//                                 className="h-full bg-[#0c0c1e]"
//                                 style={{
//                                   width: `${(Number(lang.level) / 4) * 100}%`,
//                                 }}
//                               />
//                             </div>
//                           )}
//                         </div>
//                       )
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* Certifications and Licenses */}
//           {Array.isArray(finalize?.certificationsAndLicenses) &&
//             finalize.certificationsAndLicenses.some(
//               (item) =>
//                 item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//             ) && (
//               <div className="mt-2 mb-4">
//                 <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                   Certifications and Licenses
//                 </p>
//                 <div className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4">
//                   {finalize.certificationsAndLicenses.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div
//                           key={item.id || index}
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       )
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* Hobbies and Interests */}
//           {Array.isArray(finalize?.hobbiesAndInterests) &&
//             finalize.hobbiesAndInterests.some(
//               (item) =>
//                 item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//             ) && (
//               <div className="mt-2 mb-4">
//                 <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                   Hobbies and Interests
//                 </p>
//                 <div className="pt-1 pb-2 text-gray-500 text-[15px] wrap-break-word">
//                   {finalize.hobbiesAndInterests.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div
//                           key={item.id || index}
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       )
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* Awards and Honors */}
//           {Array.isArray(finalize?.awardsAndHonors) &&
//             finalize.awardsAndHonors.some(
//               (item) =>
//                 item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//             ) && (
//               <div className="mt-2 mb-4">
//                 <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                   Awards and Honors
//                 </p>
//                 <div className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4">
//                   {finalize.awardsAndHonors.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div
//                           key={item.id || index}
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       )
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* References */}
//           {Array.isArray(finalize?.references) &&
//             finalize.references.some(
//               (item) =>
//                 item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
//             ) && (
//               <div className="mt-2">
//                 <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                   References
//                 </p>
//                 <div className="pt-1 pb-2 text-gray-500 text-[15px] wrap-break-word">
//                   {finalize.references.map(
//                     (item, index) =>
//                       item.name &&
//                       item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
//                         <div
//                           key={item.id || index}
//                           dangerouslySetInnerHTML={{ __html: item.name }}
//                         />
//                       )
//                   )}
//                 </div>
//               </div>
//             )}
//         </div>

//         <div className="w-1 border-l border-gray-300 mx-1" />

//         {/* right side */}
//         <div className="w-[60%]">
//           <div className="w-full pt-2 pr-5">
//             {/* experience */}
//             {experiences?.length > 0 && (
//               <div>
//                 <p className="text-[15px] font-semibold underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                   EXPERIENCE
//                 </p>
//                 {experiences.map((exp, index) => (
//                   <div key={ exp.id || index} className="mb-4">
//                     <div className="flex justify-between items-center mt-1 mb-2">
//                       {exp.jobTitle && (
//                         <i className="text-[11.5px] font-semibold">
//                           {exp.jobTitle}
//                         </i>
//                       )}
//                       <div className="flex justify-center items-center text-[11.5px] font-semibold gap-1">
//                         {/* START DATE */}
//                         <MonthYearDisplay
//                           value={exp.startDate}
//                           shortYear={true}
//                         />

//                         {/* SHOW "-" ONLY IF BOTH DATES EXIST */}
//                         {exp.startDate && exp.endDate && <span>-</span>}

//                         {/* END DATE */}
//                         {exp.endDate ? (
//                           <MonthYearDisplay
//                             value={exp.endDate}
//                             shortYear={true}
//                           />
//                         ) : (
//                           <span>Present</span>
//                         )}
//                       </div>
//                     </div>

//                     {(exp.location || exp.employer) && (
//                       <p className="text-[12px] text-gray-700 mb-2">
//                         {[exp.location, exp.employer].filter(Boolean).join(" - ")}
//                       </p>
//                     )}

//                     {exp.text && (
//                       <div
//                         className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4"
//                         dangerouslySetInnerHTML={{ __html: exp.text }}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* education */}
//             {educations?.length > 0 && (
//               <div>
//                 <p className="text-[15px] font-semibold underline underline-offset-4 mb-3 mt-4 decoration-2 decoration-gray-800">
//                   EDUCATION
//                 </p>
//                 {educations.map((edu, index) => (
//                   <div key={edu.id || index} className="mb-4">
//                     <div className="flex justify-between items-center mt-1 mb-2">
//                       <i className="text-[11.5px] font-semibold">
//                         {edu.schoolname || ""}
//                       </i>
//                       <div className="flex justify-center items-center text-[11.5px] font-semibold gap-1">
//                         {(edu.startDate || edu.endDate) && (
//                           <>
//                             <MonthYearDisplay
//                               value={edu.startDate}
//                               shortYear={true}
//                             />
//                             <hr className="w-3 border-l border-black" />
//                             <MonthYearDisplay
//                               value={edu.endDate}
//                               shortYear={true}
//                             />
//                           </>
//                         )}
//                       </div>
//                     </div>

//                     {(edu.location || edu.degree) && (
//                       <p className="text-[12px] text-gray-700 mb-2">
//                         {[edu.location, edu.degree].filter(Boolean).join(" - ")}
//                       </p>
//                     )}

//                     {edu.text && (
//                       <div
//                         className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4"
//                         dangerouslySetInnerHTML={{ __html: edu.text }}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Websites and Social Media */}
//             {Array.isArray(finalize?.websitesAndSocialMedia) &&
//               finalize.websitesAndSocialMedia.some(
//                 (item) =>
//                   (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//                   (item.socialMedia && item.socialMedia.trim() !== "")
//               ) && (
//                 <div className="mt-4">
//                   <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                     Websites and Social Media
//                   </p>
//                   <div className="pt-1 pb-2 text-[15px] wrap-break-word">
//                     {finalize.websitesAndSocialMedia.map(
//                       (item, index) =>
//                         ((item.websiteUrl && item.websiteUrl.trim() !== "") ||
//                           (item.socialMedia &&
//                             item.socialMedia.trim() !== "")) && (
//                           <div key={item.id || index} className="mb-2">
//                             {item.websiteUrl && (
//                               <div>
//                                 <p className="font-semibold">Website URL:</p>
//                                 <a
//                                   href={
//                                     item.websiteUrl.startsWith("http")
//                                       ? item.websiteUrl
//                                       : `https://${item.websiteUrl}`
//                                   }
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="text-gray-500 underline wrap-break-word"
//                                 >
//                                   {item.websiteUrl}
//                                 </a>
//                               </div>
//                             )}
//                             {item.socialMedia && (
//                               <div className="mt-2">
//                                 <p className="font-semibold">Social Media URL:</p>
//                                 <a
//                                   href={
//                                     item.socialMedia.startsWith("http")
//                                       ? item.socialMedia
//                                       : `https://${item.socialMedia}`
//                                   }
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="text-gray-500 underline wrap-break-word"
//                                 >
//                                   {item.socialMedia}
//                                 </a>
//                               </div>
//                             )}
//                           </div>
//                         )
//                     )}
//                   </div>
//                 </div>
//               )}

//             {/* Custom Section */}
//             {Array.isArray(finalize?.customSection) &&
//               finalize.customSection.some(
//                 (section) =>
//                   section?.name?.trim() || section?.description?.trim()
//               ) && (
//                 <div className="mt-4">
//                   {finalize.customSection
//                     .filter(
//                       (section) =>
//                         section?.name?.trim() || section?.description?.trim()
//                     )
//                     .map((section, index) => (
//                       <div key={section.id || index} className="mt-2">
//                         {section.name && (
//                           <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
//                             {section.name}
//                           </p>
//                         )}

//                         {section.description && (
//                           <div
//                             className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4"
//                             dangerouslySetInnerHTML={{
//                               __html: section.description,
//                             }}
//                           />
//                         )}
//                       </div>
//                     ))}
//                 </div>
//               )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateTwo;

// "use client";
// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import MonthYearDisplay from "@/app/utils/MonthYearDisplay";
// import { IoPersonOutline } from "react-icons/io5";
// import {
//   Contact,
//   Education,
//   Experience,
//   Finalize,
//   Skill,
// } from "@/app/types/context.types";
// import { usePathname } from "next/navigation";
// import { Blob } from "buffer";

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
//       // Case 1: croppedImage is a blob URL (local preview)
//       if (
//         typeof contact.croppedImage === "string" &&
//         contact.croppedImage.startsWith("blob:")
//       ) {
//         url = contact.croppedImage;
//       }
//       // Case 2: croppedImage is a backend filename (string but not blob)
//       else if (typeof contact.croppedImage === "string") {
//         url = `${API_URL}/api/uploads/photos/${contact.croppedImage}`;
//       }
//       // Case 3: croppedImage is a File/Blob object
//       else if (
//         contact.croppedImage instanceof Blob ||
//         contact.croppedImage instanceof File
//       ) {
//         objectUrl = URL.createObjectURL(contact.croppedImage);
//         url = objectUrl;
//       }

//       setPreviewUrl(url);
//     }
//     // If no croppedImage, fallback to contact.photo
//     else if (contact.photo) {
//       setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
//     } else {
//       setPreviewUrl(null);
//     }

//     // Cleanup function
//     return () => {
//       if (objectUrl) {
//         URL.revokeObjectURL(objectUrl);
//       }
//     };
//   }, [contact.croppedImage, contact.photo]);

//   // Filter out empty skills
//   const filteredSkills = skills.filter((skill) => skill.skill?.trim());

//   /* ======================================================
//      PDF GENERATION FUNCTION
//   ====================================================== */
//   const generateHTML = () => {
//     const styles = `
//       body {
//         margin: 0;
//         font-family: 'Nunito', sans-serif;
//         background-color: white;
//       }
//       .resume-container {
//         width: 210mm;
//         padding: 5mm;
//         box-sizing: border-box;
//         background-color: white;
//         margin: 0 auto;
//       }
//       .wrap-break-word {
//         word-wrap: break-word;
//         overflow-wrap: break-word;
//       }
//       .text-gray-700 { color: #374151; }
//       .text-gray-500 { color: #6b7280; }
//       .text-gray-800 { color: #1f2937; }
//       .bg-\\[\\#EADCCE\\] { background-color: #EADCCE; }
//       .border-gray-300 { border-color: #d1d5db; }
//       .border-l { border-left-width: 1px; }
//       .border-gray-100 { border-color: #f3f4f6; }
//       .bg-\\[\\#0c0c1e\\] { background-color: #0c0c1e; }
//       .bg-gray-300 { background-color: #d1d5db; }
//       .rounded-full { border-radius: 9999px; }
//       .overflow-hidden { overflow: hidden; }
//       .h-1 { height: 0.25rem; }
//       .w-full { width: 100%; }
//       .grid { display: grid; }
//       .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
//       .gap-x-8 { column-gap: 2rem; }
//       .gap-y-3 { row-gap: 0.75rem; }
//       .mb-2 { margin-bottom: 0.5rem; }
//       .mb-4 { margin-bottom: 1rem; }
//       .mt-2 { margin-top: 0.5rem; }
//       .mt-4 { margin-top: 1rem; }
//       .pt-2 { padding-top: 0.5rem; }
//       .pb-3 { padding-bottom: 0.75rem; }
//       .pb-2 { padding-bottom: 0.5rem; }
//       .pl-5 { padding-left: 1.25rem; }
//       .pr-5 { padding-right: 1.25rem; }
//       .flex { display: flex; }
//       .items-center { align-items: center; }
//       .justify-between { justify-content: space-between; }
//       .gap-1 { gap: 0.25rem; }
//       .gap-3 { gap: 0.75rem; }
//       .gap-4 { gap: 1rem; }
//       .w-\\[22\\%\\] { width: 22%; }
//       .w-\\[68\\%\\] { width: 68%; }
//       .w-\\[40\\%\\] { width: 40%; }
//       .w-\\[60\\%\\] { width: 60%; }
//       .w-32 { width: 8rem; }
//       .h-32 { height: 8rem; }
//       .rounded-md { border-radius: 0.375rem; }
//       .object-cover { object-fit: cover; }
//       .border { border-width: 1px; }
//       .border-black { border-color: #000; }
//       .text-3xl { font-size: 1.875rem; }
//       .text-\\[15px\\] { font-size: 15px; }
//       .text-\\[13px\\] { font-size: 13px; }
//       .text-\\[12px\\] { font-size: 12px; }
//       .text-\\[11\\.5px\\] { font-size: 11.5px; }
//       .font-semibold { font-weight: 600; }
//       .font-bold { font-weight: 700; }
//       .font-serif { font-family: serif; }
//       .tracking-wide { letter-spacing: 0.025em; }
//       .leading-tight { line-height: 1.25; }
//       .leading-snug { line-height: 1.375; }
//       .capitalize { text-transform: capitalize; }
//       .uppercase { text-transform: uppercase; }
//       .underline { text-decoration: underline; }
//       .underline-offset-4 { text-underline-offset: 4px; }
//       .decoration-2 { text-decoration-thickness: 2px; }
//       .decoration-gray-800 { text-decoration-color: #1f2937; }
//       .mx-auto { margin-left: auto; margin-right: auto; }
//       .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
//       .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
//       .rounded-tl-3xl { border-top-left-radius: 1.5rem; }
//       .rounded-tr-3xl { border-top-right-radius: 1.5rem; }
//       .border-b { border-bottom-width: 1px; }
//       .mx-2 { margin-left: 0.5rem; margin-right: 0.5rem; }
//       .mx-1 { margin-left: 0.25rem; margin-right: 0.25rem; }
//       .w-1 { width: 0.25rem; }
//       .list-disc { list-style-type: disc; }
//       .list-decimal { list-style-type: decimal; }
//       .ml-4 { margin-left: 1rem; }
//       [&_ul]:list-disc [&_ul] { list-style-type: disc; }
//       [&_ol]:list-decimal [&_ol] { list-style-type: decimal; }
//       [&_li]:ml-4 [&_li] { margin-left: 1rem; }
//     `;

//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8"/>
//         <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
//         <style>${styles}</style>
//         <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
//       </head>
//       <body>
//         <div class="resume-container">

//           <!-- HEADER -->
//           <div class="flex bg-[#EADCCE] py-2 rounded-tl-3xl rounded-tr-3xl border-b border-gray-300 mx-auto">
//             <div class="flex justify-center items-center w-[22%] p-2">
//               ${previewUrl ? `<img src="${previewUrl}" alt="Profile" class="w-32 h-32 rounded-md object-cover border" />` : `<div class="w-32 h-32 rounded-md border flex items-center justify-center"><span>No Photo</span></div>`}
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
//                 ${linkedinUrl && linkedinUrl.trim() ? `
//                   <a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-black text-sm">
//                     <p class="text-[13px] font-bold underline">LinkedIn</p>
//                   </a>
//                 ` : ""}
//                 ${portfolioUrl && portfolioUrl.trim() ? `
//                   <a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-black text-sm">
//                     <p class="text-[13px] font-bold underline">Portfolio</p>
//                   </a>
//                 ` : ""}
//               </div>
//             </div>
//           </div>

//           <!-- BODY -->
//           <div class="flex gap-3 mx-auto">
//             <!-- LEFT SIDE -->
//             <div class="pt-2 pl-5 w-[40%]">
//               <!-- SUMMARY -->
//               ${summary ? `
//                 <div class="mb-2">
//                   <p class="text-[15px] font-semibold underline underline-offset-4 decoration-2 decoration-gray-800 mb-2 tracking-wide">SUMMARY</p>
//                   <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">${summary}</div>
//                 </div>
//               ` : ""}

//               <!-- SKILLS -->
//               ${filteredSkills.length > 0 ? `
//                 <div class="w-full max-w-md mx-auto rounded-2xl mb-4">
//                   <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Skills</p>
//                   <div class="grid grid-cols-2 gap-x-8 gap-y-3">
//                     ${filteredSkills.map(skill => `
//                       <div>
//                         <p class="text-sm text-gray-800 mb-1">${skill.skill || ""}</p>
//                         ${skill.level ? `
//                           <div class="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//                             <div class="h-full bg-[#0c0c1e]" style="width: ${(Number(skill.level) / 5) * 100}%"></div>
//                           </div>
//                         ` : ""}
//                       </div>
//                     `).join("")}
//                   </div>
//                 </div>
//               ` : ""}

//               <!-- LANGUAGES -->
//               ${Array.isArray(finalize?.languages) && finalize.languages.some(lang => lang.name && lang.name.trim() !== "") ? `
//                 <div class="mt-2 mb-4">
//                   <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Languages</p>
//                   <div class="grid grid-cols-2 gap-x-8 gap-y-3">
//                     ${finalize.languages.filter(lang => lang.name && lang.name.trim() !== "").map(lang => `
//                       <div>
//                         <p class="text-sm wrap-break-word text-gray-800 mb-1">${lang.name}</p>
//                         ${lang.level ? `
//                           <div class="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
//                             <div class="h-full bg-[#0c0c1e]" style="width: ${(Number(lang.level) / 5) * 100}%"></div>
//                           </div>
//                         ` : ""}
//                       </div>
//                     `).join("")}
//                   </div>
//                 </div>
//               ` : ""}

//               <!-- CERTIFICATIONS AND LICENSES -->
//               ${Array.isArray(finalize?.certificationsAndLicenses) && finalize.certificationsAndLicenses.some(item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//                 <div class="mt-2 mb-4">
//                   <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Certifications and Licenses</p>
//                   <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
//                     ${finalize.certificationsAndLicenses.filter(item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "").map(item => `
//                       <div>${item.name.replace(/<[^>]*>/g, "")}</div>
//                     `).join("")}
//                   </div>
//                 </div>
//               ` : ""}

//               <!-- HOBBIES AND INTERESTS -->
//               ${Array.isArray(finalize?.hobbiesAndInterests) && finalize.hobbiesAndInterests.some(item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//                 <div class="mt-2 mb-4">
//                   <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Hobbies and Interests</p>
//                   <div class="pt-1 pb-2 text-gray-500 text-[15px] wrap-break-word">
//                     ${finalize.hobbiesAndInterests.filter(item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "").map(item => `
//                       <div>${item.name.replace(/<[^>]*>/g, "")}</div>
//                     `).join("")}
//                   </div>
//                 </div>
//               ` : ""}

//               <!-- AWARDS AND HONORS -->
//               ${Array.isArray(finalize?.awardsAndHonors) && finalize.awardsAndHonors.some(item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//                 <div class="mt-2 mb-4">
//                   <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Awards and Honors</p>
//                   <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
//                     ${finalize.awardsAndHonors.filter(item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "").map(item => `
//                       <div>${item.name.replace(/<[^>]*>/g, "")}</div>
//                     `).join("")}
//                   </div>
//                 </div>
//               ` : ""}

//               <!-- REFERENCES -->
//               ${Array.isArray(finalize?.references) && finalize.references.some(item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "") ? `
//                 <div class="mt-2">
//                   <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">References</p>
//                   <div class="pt-1 pb-2 text-gray-500 text-[15px] wrap-break-word">
//                     ${finalize.references.filter(item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "").map(item => `
//                       <div>${item.name.replace(/<[^>]*>/g, "")}</div>
//                     `).join("")}
//                   </div>
//                 </div>
//               ` : ""}
//             </div>

//             <div class="w-1 border-l border-gray-300 mx-1"></div>

//             <!-- RIGHT SIDE -->
//             <div class="w-[60%]">
//               <div class="w-full pt-2 pr-5">
//                 <!-- EXPERIENCE -->
//                 ${experiences?.length > 0 ? `
//                   <div>
//                     <p class="text-[15px] font-semibold underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">EXPERIENCE</p>
//                     ${experiences.map((exp, index) => `
//                       <div class="mb-4">
//                         <div class="flex justify-between items-center mt-1 mb-2">
//                           ${exp.jobTitle ? `<i class="text-[11.5px] font-semibold">${exp.jobTitle}</i>` : ""}
//                           <div class="flex justify-center items-center text-[11.5px] font-semibold gap-1">
//                             ${exp.startDate ? `<span>${exp.startDate}</span>` : ""}
//                             ${exp.startDate && exp.endDate ? `<span>-</span>` : ""}
//                             ${exp.endDate ? `<span>${exp.endDate}</span>` : exp.startDate ? `<span>Present</span>` : ""}
//                           </div>
//                         </div>
//                         ${(exp.location || exp.employer) ? `
//                           <p class="text-[12px] text-gray-700 mb-2">
//                             ${[exp.location, exp.employer].filter(Boolean).join(" - ")}
//                           </p>
//                         ` : ""}
//                         ${exp.text ? `
//                           <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">${exp.text}</div>
//                         ` : ""}
//                       </div>
//                     `).join("")}
//                   </div>
//                 ` : ""}

//                 <!-- EDUCATION -->
//                 ${educations?.length > 0 ? `
//                   <div>
//                     <p class="text-[15px] font-semibold underline underline-offset-4 mb-3 mt-4 decoration-2 decoration-gray-800">EDUCATION</p>
//                     ${educations.map((edu, index) => `
//                       <div class="mb-4">
//                         <div class="flex justify-between items-center mt-1 mb-2">
//                           <i class="text-[11.5px] font-semibold">${edu.schoolname || ""}</i>
//                           <div class="flex justify-center items-center text-[11.5px] font-semibold gap-1">
//                             ${(edu.startDate || edu.endDate) ? `
//                               ${edu.startDate ? `<span>${edu.startDate}</span>` : ""}
//                               ${edu.startDate && edu.endDate ? `<hr class="w-3 border-l border-black" />` : ""}
//                               ${edu.endDate ? `<span>${edu.endDate}</span>` : ""}
//                             ` : ""}
//                           </div>
//                         </div>
//                         ${(edu.location || edu.degree) ? `
//                           <p class="text-[12px] text-gray-700 mb-2">
//                             ${[edu.location, edu.degree].filter(Boolean).join(" - ")}
//                           </p>
//                         ` : ""}
//                         ${edu.text ? `
//                           <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">${edu.text}</div>
//                         ` : ""}
//                       </div>
//                     `).join("")}
//                   </div>
//                 ` : ""}

//                 <!-- WEBSITES AND SOCIAL MEDIA -->
//                 ${Array.isArray(finalize?.websitesAndSocialMedia) && finalize.websitesAndSocialMedia.some(item =>
//                   (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//                   (item.socialMedia && item.socialMedia.trim() !== "")
//                 ) ? `
//                   <div class="mt-4">
//                     <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Websites and Social Media</p>
//                     <div class="pt-1 pb-2 text-[15px] wrap-break-word">
//                       ${finalize.websitesAndSocialMedia.filter(item =>
//                         (item.websiteUrl && item.websiteUrl.trim() !== "") ||
//                         (item.socialMedia && item.socialMedia.trim() !== "")
//                       ).map(item => `
//                         <div class="mb-2">
//                           ${item.websiteUrl ? `
//                             <div>
//                               <p class="font-semibold">Website URL:</p>
//                               <a href="${item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`}" target="_blank" rel="noopener noreferrer" class="text-gray-500 underline wrap-break-word">
//                                 ${item.websiteUrl}
//                               </a>
//                             </div>
//                           ` : ""}
//                           ${item.socialMedia ? `
//                             <div class="mt-2">
//                               <p class="font-semibold">Social Media URL:</p>
//                               <a href="${item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`}" target="_blank" rel="noopener noreferrer" class="text-gray-500 underline wrap-break-word">
//                                 ${item.socialMedia}
//                               </a>
//                             </div>
//                           ` : ""}
//                         </div>
//                       `).join("")}
//                     </div>
//                   </div>
//                 ` : ""}

//                 <!-- CUSTOM SECTION -->
//                 ${Array.isArray(finalize?.customSection) && finalize.customSection.some(section =>
//                   section?.name?.trim() || section?.description?.trim()
//                 ) ? `
//                   <div class="mt-4">
//                     ${finalize.customSection.filter(section => section?.name?.trim() || section?.description?.trim()).map((section, index) => `
//                       <div class="mt-2">
//                         ${section.name ? `
//                           <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">${section.name}</p>
//                         ` : ""}
//                         ${section.description ? `
//                           <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">${section.description}</div>
//                         ` : ""}
//                       </div>
//                     `).join("")}
//                   </div>
//                 ` : ""}
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
//       <div
//         className="bg-white border border-gray-100 font-nunito mx-auto"
//         style={{
//           width: "210mm",
//           padding: "5mm",
//           boxSizing: "border-box",
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
//               {[contact?.address, contact?.city, contact?.country, contact?.postcode]
//                 .filter(Boolean)
//                 .join(", ")}
//             </p>
//             <p className="text-xs font-serif">{contact?.email || ""}</p>
//             <p className="text-xs py-2">{contact?.phone || ""}</p>
//             <div className="flex items-center p-0 gap-4 mt-1">
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
//                   className="flex items-center gap-2 text-black text-sm"
//                 >
//                   <p className="text-[13px] font-bold underline">LinkedIn</p>
//                 </a>
//               )}

//               {/* Show Portfolio only if provided */}
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
//                   {filteredSkills.map((skill) => (
//                     <div key={skill.id}>
//                       <p className="text-sm text-gray-800 mb-1">
//                         {skill.skill || ""}
//                       </p>
//                       {skill.level && (
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
//                 (lang) => lang.name && lang.name.trim() !== ""
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
//                         )
//                     )}
//                   </div>
//                 </div>
//               )}

//             {/* Certifications and Licenses */}
//             {Array.isArray(finalize?.certificationsAndLicenses) &&
//               finalize.certificationsAndLicenses.some(
//                 (item) =>
//                   item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
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
//                         )
//                     )}
//                   </div>
//                 </div>
//               )}

//             {/* Hobbies and Interests */}
//             {Array.isArray(finalize?.hobbiesAndInterests) &&
//               finalize.hobbiesAndInterests.some(
//                 (item) =>
//                   item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
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
//                         )
//                     )}
//                   </div>
//                 </div>
//               )}

//             {/* Awards and Honors */}
//             {Array.isArray(finalize?.awardsAndHonors) &&
//               finalize.awardsAndHonors.some(
//                 (item) =>
//                   item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
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
//                         )
//                     )}
//                   </div>
//                 </div>
//               )}

//             {/* References */}
//             {Array.isArray(finalize?.references) &&
//               finalize.references.some(
//                 (item) =>
//                   item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
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
//                         )
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
//                           {/* START DATE */}
//                           <MonthYearDisplay
//                             value={exp.startDate}
//                             shortYear={true}
//                           />

//                           {/* SHOW "-" ONLY IF BOTH DATES EXIST */}
//                           {exp.startDate && exp.endDate && <span>-</span>}

//                           {/* END DATE */}
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
//                           {[exp.location, exp.employer].filter(Boolean).join(" - ")}
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
//                           {[edu.location, edu.degree].filter(Boolean).join(" - ")}
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
//                     (item.socialMedia && item.socialMedia.trim() !== "")
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
//                                   <p className="font-semibold">Social Media URL:</p>
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
//                           )
//                       )}
//                     </div>
//                   </div>
//                 )}

//               {/* Custom Section */}
//               {Array.isArray(finalize?.customSection) &&
//                 finalize.customSection.some(
//                   (section) =>
//                     section?.name?.trim() || section?.description?.trim()
//                 ) && (
//                   <div className="mt-4">
//                     {finalize.customSection
//                       .filter(
//                         (section) =>
//                           section?.name?.trim() || section?.description?.trim()
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



"use client";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import MonthYearDisplay from "@/app/utils/MonthYearDisplay";
import { IoPersonOutline } from "react-icons/io5";
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

interface Resume4Props {
  alldata?: AllData;
}

const TemplateTwo: React.FC<Resume4Props> = ({ alldata }) => {
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
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [contact.croppedImage, contact.photo]);

  const filteredSkills = skills.filter((skill) => skill.skill?.trim());

  const generateHTML = () => {
    const getSkillLevelWidth = (level: number | null | undefined) => {
      if (!level) return "0%";
      return `${(Number(level) / 5) * 100}%`;
    };

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8"/>
        <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
        <style>
          /* Import Nunito font */
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

          /* Reset and base styles */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            margin: 0;
            font-family: 'Nunito', sans-serif;
            background-color: white;
            line-height: 1.5;
          }

          .resume-container {
            width: 210mm;
            padding: 5mm;
            box-sizing: border-box;
            background-color: white;
            margin: 0 auto;
          }

          /* Utility classes */
          .flex { display: flex; }
          .items-center { align-items: center; }
          .justify-center { justify-content: center; }
          .justify-between { justify-content: space-between; }
          .gap-1 { gap: 0.25rem; }
          .gap-2 { gap: 0.5rem; }
          .gap-3 { gap: 0.75rem; }
          .gap-4 { gap: 1rem; }
          .gap-x-8 { column-gap: 2rem; }
          .gap-y-3 { row-gap: 0.75rem; }
          
          .grid { display: grid; }
          .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
          
          .w-full { width: 100%; }
          .w-1 { width: 0.25rem; }
          .w-32 { width: 8rem; }
          .h-32 { height: 8rem; }
          .w-\\[22\\%\\] { width: 22%; }
          .w-\\[68\\%\\] { width: 68%; }
          .w-\\[40\\%\\] { width: 40%; }
          .w-\\[60\\%\\] { width: 60%; }
          
          .p-0 { padding: 0; }
          .p-2 { padding: 0.5rem; }
          .p-4 { padding: 1rem; }
          .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
          .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
          .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
          .pt-1 { padding-top: 0.25rem; }
          .pt-2 { padding-top: 0.5rem; }
          .pb-2 { padding-bottom: 0.5rem; }
          .pb-3 { padding-bottom: 0.75rem; }
          .pl-5 { padding-left: 1.25rem; }
          .pr-5 { padding-right: 1.25rem; }
          .pl-10 { padding-left: 2.5rem; }
          
          .mt-1 { margin-top: 0.25rem; }
          .mt-2 { margin-top: 0.5rem; }
          .mt-4 { margin-top: 1rem; }
          .mb-1 { margin-bottom: 0.25rem; }
          .mb-2 { margin-bottom: 0.5rem; }
          .mb-4 { margin-bottom: 1rem; }
          .mx-1 { margin-left: 0.25rem; margin-right: 0.25rem; }
          .mx-2 { margin-left: 0.5rem; margin-right: 0.5rem; }
          .mx-auto { margin-left: auto; margin-right: auto; }
          
          .border { border-width: 1px; border-style: solid; }
          .border-b { border-bottom-width: 1px; border-bottom-style: solid; }
          .border-l { border-left-width: 1px; border-left-style: solid; }
          .border-gray-100 { border-color: #f3f4f6; }
          .border-gray-200 { border-color: #e5e7eb; }
          .border-gray-300 { border-color: #d1d5db; }
          .border-black { border-color: #000; }
          
          .rounded-md { border-radius: 0.375rem; }
          .rounded-full { border-radius: 9999px; }
          .rounded-tl-3xl { border-top-left-radius: 1.5rem; }
          .rounded-tr-3xl { border-top-right-radius: 1.5rem; }
          
          .bg-\\[\\#EADCCE\\] { background-color: #EADCCE; }
          .bg-\\[\\#0c0c1e\\] { background-color: #0c0c1e; }
          .bg-gray-300 { background-color: #d1d5db; }
          .bg-white { background-color: white; }
          
          .text-xs { font-size: 0.75rem; }
          .text-sm { font-size: 0.875rem; }
          .text-base { font-size: 1rem; }
          .text-lg { font-size: 1.125rem; }
          .text-xl { font-size: 1.25rem; }
          .text-3xl { font-size: 1.875rem; }
          .text-\\[11\\.5px\\] { font-size: 11.5px; }
          .text-\\[12px\\] { font-size: 12px; }
          .text-\\[13px\\] { font-size: 13px; }
          .text-\\[15px\\] { font-size: 15px; }
          
          .font-normal { font-weight: 400; }
          .font-medium { font-weight: 500; }
          .font-semibold { font-weight: 600; }
          .font-bold { font-weight: 700; }
          .font-serif { font-family: serif; }
          
          .text-gray-400 { color: #9ca3af; }
          .text-gray-500 { color: #6b7280; }
          .text-gray-600 { color: #4b5563; }
          .text-gray-700 { color: #374151; }
          .text-gray-800 { color: #1f2937; }
          .text-black { color: #000; }
          
          .tracking-wide { letter-spacing: 0.025em; }
          .leading-tight { line-height: 1.25; }
          .leading-snug { line-height: 1.375; }
          .capitalize { text-transform: capitalize; }
          .uppercase { text-transform: uppercase; }
          .underline { text-decoration: underline; }
          .underline-offset-4 { text-underline-offset: 4px; }
          .decoration-2 { text-decoration-thickness: 2px; }
          .decoration-gray-800 { text-decoration-color: #1f2937; }
          
          .object-cover { object-fit: cover; }
          .overflow-hidden { overflow: hidden; }
          .h-1 { height: 0.25rem; }
          .wrap-break-word { word-wrap: break-word; overflow-wrap: break-word; }
          
          /* List styles */
          .list-disc { list-style-type: disc; }
          .list-decimal { list-style-type: decimal; }
          .ml-4 { margin-left: 1rem; }
          [class*="list-disc"] { list-style-type: disc; }
          [class*="list-decimal"] { list-style-type: decimal; }
          .skill-level {
    height: 100%;
    background: #333;
    border-radius: 2px;
  }
          
          /* Print styles */
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .resume-container { width: 100%; padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="resume-container">

          <!-- HEADER -->
          <div class="flex bg-[#EADCCE] py-2 rounded-tl-3xl rounded-tr-3xl border-b border-gray-300 mx-auto">
            <div class="flex justify-center items-center w-[22%] p-2">
              ${
                previewUrl
                  ? `
                <img src="${previewUrl}" alt="Profile" class="w-32 h-32 rounded-md object-cover border border-gray-200" />
              `
                  : `
                <div class="w-32 h-32 rounded-md border border-gray-200 flex items-center justify-center">
                  <span class="text-gray-400">No Photo</span>
                </div>
              `
              }
            </div>
            <div class="w-[68%] pl-10">
              <p class="text-3xl tracking-wide text-gray-800 leading-tight capitalize">
                ${contact?.firstName || ""}
                <span class="mx-2 capitalize">${contact?.lastName || ""}</span>
              </p>
              <p class="text-xs py-1 text-[12px] leading-snug">
                ${[contact?.address, contact?.city, contact?.country, contact?.postcode].filter(Boolean).join(", ")}
              </p>
              <p class="text-xs font-serif">${contact?.email || ""}</p>
              <p class="text-xs py-2">${contact?.phone || ""}</p>
              <div class="flex items-center p-0 gap-4 mt-1">
                ${
                  linkedinUrl && linkedinUrl.trim()
                    ? `
                  <a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-black text-sm">
                    <p class="text-[13px] font-bold underline">LinkedIn</p>
                  </a>
                `
                    : ""
                }
                ${
                  portfolioUrl && portfolioUrl.trim()
                    ? `
                  <a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-black text-sm">
                    <p class="text-[13px] font-bold underline">Portfolio</p>
                  </a>
                `
                    : ""
                }
              </div>
            </div>
          </div>

          <!-- BODY -->
          <div class="flex gap-3 mx-auto">
            <!-- LEFT SIDE -->
            <div class="pt-2 pl-5 w-[40%]">
              <!-- SUMMARY -->
              ${
                summary
                  ? `
                <div class="mb-2">
                  <p class="text-[15px] font-semibold underline underline-offset-4 decoration-2 decoration-gray-800 mb-2 tracking-wide">SUMMARY</p>
                  <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">${summary.replace(/<[^>]*>/g, "")}</div>
                </div>
              `
                  : ""
              }

              <!-- SKILLS -->
             <!-- SKILLS -->
${filteredSkills.length > 0 ? `
  <div class="w-full max-w-md mx-auto rounded-2xl mb-4">
    <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Skills</p>
    <div class="grid grid-cols-2 gap-x-8 gap-y-3">
      ${filteredSkills.map((skill) => `
        <div>
          <p class="text-sm text-gray-800 mb-1">${skill.skill || ""}</p>
          ${skill.level ? `
            <div class="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
              <div class="h-full bg-[#0c0c1e] skill-level" style="width: ${(Number(skill.level) / 5) * 100}%"></div>
            </div>
          ` : ""}
        </div>

        
      `).join("")}
    </div>
  </div>
` : ""}

              <!-- LANGUAGES -->
              ${
                Array.isArray(finalize?.languages) &&
                finalize.languages.some((lang) => lang.name?.trim())
                  ? `
                <div class="mt-2 mb-4">
                  <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Languages</p>
                  <div class="grid grid-cols-2 gap-x-8 gap-y-3">
                    ${finalize.languages
                      .filter((lang) => lang.name?.trim())
                      .map(
                        (lang) => `
                      <div>
                        <p class="text-sm wrap-break-word text-gray-800 mb-1">${lang.name}</p>
                        ${
                          lang.level
                            ? `
                          <div class="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                            <div class="h-full bg-[#0c0c1e]" style="width: ${getSkillLevelWidth(Number(lang.level))}"></div>
                          </div>
                        `
                            : ""
                        }
                      </div>
                    `,
                      )
                      .join("")}
                  </div>
                </div>
              `
                  : ""
              }

              <!-- CERTIFICATIONS AND LICENSES -->
              ${
                Array.isArray(finalize?.certificationsAndLicenses) &&
                finalize.certificationsAndLicenses.some((item) =>
                  item.name?.replace(/<[^>]*>/g, "").trim(),
                )
                  ? `
                <div class="mt-2 mb-4">
                  <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Certifications & Licenses</p>
                  <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
                    ${finalize.certificationsAndLicenses
                      .filter((item) =>
                        item.name?.replace(/<[^>]*>/g, "").trim(),
                      )
                      .map(
                        (item) => `
                      <div>${item.name?.replace(/<[^>]*>/g, "")}</div>
                    `,
                      )
                      .join("")}
                  </div>
                </div>
              `
                  : ""
              }

              <!-- HOBBIES AND INTERESTS -->
              ${
                Array.isArray(finalize?.hobbiesAndInterests) &&
                finalize.hobbiesAndInterests.some((item) =>
                  item.name?.replace(/<[^>]*>/g, "").trim(),
                )
                  ? `
                <div class="mt-2 mb-4">
                  <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Hobbies & Interests</p>
                  <div class="pt-1 pb-2 text-gray-500 text-[15px] wrap-break-word">
                    ${finalize.hobbiesAndInterests
                      .filter((item) =>
                        item.name?.replace(/<[^>]*>/g, "").trim(),
                      )
                      .map(
                        (item) => `
                      <div>${item.name?.replace(/<[^>]*>/g, "")}</div>
                    `,
                      )
                      .join("")}
                  </div>
                </div>
              `
                  : ""
              }

              <!-- AWARDS AND HONORS -->
              ${
                Array.isArray(finalize?.awardsAndHonors) &&
                finalize.awardsAndHonors.some((item) =>
                  item.name?.replace(/<[^>]*>/g, "").trim(),
                )
                  ? `
                <div class="mt-2 mb-4">
                  <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Awards & Honors</p>
                  <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
                    ${finalize.awardsAndHonors
                      .filter((item) =>
                        item.name?.replace(/<[^>]*>/g, "").trim(),
                      )
                      .map(
                        (item) => `
                      <div>${item.name?.replace(/<[^>]*>/g, "")}</div>
                    `,
                      )
                      .join("")}
                  </div>
                </div>
              `
                  : ""
              }

              <!-- REFERENCES -->
              ${
                Array.isArray(finalize?.references) &&
                finalize.references.some((item) =>
                  item.name?.replace(/<[^>]*>/g, "").trim(),
                )
                  ? `
                <div class="mt-2">
                  <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">References</p>
                  <div class="pt-1 pb-2 text-gray-500 text-[15px] wrap-break-word">
                    ${finalize.references
                      .filter((item) =>
                        item.name?.replace(/<[^>]*>/g, "").trim(),
                      )
                      .map(
                        (item) => `
                      <div>${item.name?.replace(/<[^>]*>/g, "")}</div>
                    `,
                      )
                      .join("")}
                  </div>
                </div>
              `
                  : ""
              }
            </div>

            <div class="w-1 border-l border-gray-300 mx-1"></div>

            <!-- RIGHT SIDE -->
            <div class="w-[60%]">
              <div class="w-full pt-2 pr-5">
                <!-- EXPERIENCE -->
                ${
                  experiences?.length > 0
                    ? `
                  <div>
                    <p class="text-[15px] font-semibold underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">EXPERIENCE</p>
                    ${experiences
                      .map(
                        (exp) => `
                      <div class="mb-4">
                        <div class="flex justify-between items-center mt-1 mb-2">
                          ${exp.jobTitle ? `<i class="text-[11.5px] font-semibold">${exp.jobTitle}</i>` : ""}
                          <div class="flex justify-center items-center text-[11.5px] font-semibold gap-1">
                            ${exp.startDate ? exp.startDate : ""}
                            ${exp.startDate && exp.endDate ? `<span>-</span>` : ""}
                            ${exp.endDate ? exp.endDate : exp.startDate ? "Present" : ""}
                          </div>
                        </div>
                        ${
                          exp.location || exp.employer
                            ? `
                          <p class="text-[12px] text-gray-700 mb-2">
                            ${[exp.location, exp.employer].filter(Boolean).join(" - ")}
                          </p>
                        `
                            : ""
                        }
                        ${
                          exp.text
                            ? `
                          <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">${exp.text.replace(/<[^>]*>/g, "")}</div>
                        `
                            : ""
                        }
                      </div>
                    `,
                      )
                      .join("")}
                  </div>
                `
                    : ""
                }

                <!-- EDUCATION -->
                ${
                  educations?.length > 0
                    ? `
                  <div>
                    <p class="text-[15px] font-semibold underline underline-offset-4 mb-3 mt-4 decoration-2 decoration-gray-800">EDUCATION</p>
                    ${educations
                      .map(
                        (edu) => `
                      <div class="mb-4">
                        <div class="flex justify-between items-center mt-1 mb-2">
                          <i class="text-[11.5px] font-semibold">${edu.schoolname || ""}</i>
                          <div class="flex justify-center items-center text-[11.5px] font-semibold gap-1">
                            ${
                              edu.startDate || edu.endDate
                                ? `
                              ${edu.startDate || ""}
                              ${edu.startDate && edu.endDate ? `<span>-</span>` : ""}
                              ${edu.endDate || ""}
                            `
                                : ""
                            }
                          </div>
                        </div>
                        ${
                          edu.location || edu.degree
                            ? `
                          <p class="text-[12px] text-gray-700 mb-2">
                            ${[edu.location, edu.degree].filter(Boolean).join(" - ")}
                          </p>
                        `
                            : ""
                        }
                        ${
                          edu.text
                            ? `
                          <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">${edu.text.replace(/<[^>]*>/g, "")}</div>
                        `
                            : ""
                        }
                      </div>
                    `,
                      )
                      .join("")}
                  </div>
                `
                    : ""
                }

                <!-- WEBSITES AND SOCIAL MEDIA -->
                ${
                  Array.isArray(finalize?.websitesAndSocialMedia) &&
                  finalize.websitesAndSocialMedia.some(
                    (item) =>
                      item.websiteUrl?.trim() || item.socialMedia?.trim(),
                  )
                    ? `
                  <div class="mt-4">
                    <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Websites & Social Media</p>
                    <div class="pt-1 pb-2 text-[15px] wrap-break-word">
                      ${finalize.websitesAndSocialMedia
                        .filter(
                          (item) =>
                            item.websiteUrl?.trim() || item.socialMedia?.trim(),
                        )
                        .map(
                          (item) => `
                        <div class="mb-2">
                          ${
                            item.websiteUrl
                              ? `
                            <div>
                              <p class="font-semibold">Website:</p>
                              <a href="${item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`}" class="text-gray-500 underline wrap-break-word">
                                ${item.websiteUrl}
                              </a>
                            </div>
                          `
                              : ""
                          }
                          ${
                            item.socialMedia
                              ? `
                            <div class="mt-2">
                              <p class="font-semibold">Social Media:</p>
                              <a href="${item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`}" class="text-gray-500 underline wrap-break-word">
                                ${item.socialMedia}
                              </a>
                            </div>
                          `
                              : ""
                          }
                        </div>
                      `,
                        )
                        .join("")}
                    </div>
                  </div>
                `
                    : ""
                }

                <!-- CUSTOM SECTION -->
                ${
                  Array.isArray(finalize?.customSection) &&
                  finalize.customSection.some(
                    (section) =>
                      section?.name?.trim() || section?.description?.trim(),
                  )
                    ? `
                  <div class="mt-4">
                    ${finalize.customSection
                      .filter(
                        (section) =>
                          section?.name?.trim() || section?.description?.trim(),
                      )
                      .map(
                        (section) => `
                      <div class="mt-2">
                        ${
                          section.name
                            ? `
                          <p class="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">${section.name}</p>
                        `
                            : ""
                        }
                        ${
                          section.description
                            ? `
                          <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">${section.description.replace(/<[^>]*>/g, "")}</div>
                        `
                            : ""
                        }
                      </div>
                    `,
                      )
                      .join("")}
                  </div>
                `
                    : ""
                }
              </div>
            </div>
          </div>
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
        className="bg-white border border-gray-100 font-nunito mx-auto"
        style={{
          width: "210mm",
          padding: "5mm",
          boxSizing: "border-box",
        }}
      >
        {/* header */}
        <div className="flex bg-[#EADCCE] py-2 rounded-tl-3xl rounded-tr-3xl border-b border-gray-300 mx-auto">
          <div className="flex justify-center items-center w-[22%] p-2">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile"
                className="w-32 h-32 rounded-md object-cover border"
              />
            ) : (
              <IoPersonOutline className="w-32 h-32 text-gray-400" />
            )}
          </div>
          <div className="w-[68%] pl-10">
            <p className="text-3xl tracking-wide text-gray-800 leading-tight capitalize">
              {contact?.firstName || ""}
              <span className="mx-2 capitalize">{contact?.lastName || ""}</span>
            </p>
            <p className="text-xs py-1 text-[12px] leading-snug">
              {[
                contact?.address,
                contact?.city,
                contact?.country,
                contact?.postcode,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
            <p className="text-xs font-serif">{contact?.email || ""}</p>
            <p className="text-xs py-2">{contact?.phone || ""}</p>
            <div className="flex items-center p-0 gap-4 mt-1">
              {linkedinUrl && linkedinUrl.trim() && (
                <a
                  href={
                    linkedinUrl.startsWith("http")
                      ? linkedinUrl
                      : `https://${linkedinUrl}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-black text-sm"
                >
                  <p className="text-[13px] font-bold underline">LinkedIn</p>
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
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-black text-sm"
                >
                  <p className="text-[13px] font-bold underline">Portfolio</p>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* body */}
        <div className="flex gap-3 mx-auto">
          {/* left side */}
          <div className="pt-2 pl-5 w-[40%]">
            {/* summary */}
            {summary && (
              <div className="mb-2">
                <p className="text-[15px] font-semibold underline underline-offset-4 decoration-2 decoration-gray-800 mb-2 tracking-wide">
                  SUMMARY
                </p>
                <div
                  className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4"
                  dangerouslySetInnerHTML={{ __html: summary }}
                />
              </div>
            )}

            {/* skills */}
            {filteredSkills.length > 0 && (
              <div className="w-full max-w-md mx-auto rounded-2xl mb-4">
                <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
                  Skills
                </p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {filteredSkills.map((skill) => (
                    <div key={skill.id}>
                      <p className="text-sm text-gray-800 mb-1">
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
              </div>
            )}

            {/* Languages */}
            {Array.isArray(finalize?.languages) &&
              finalize.languages.some(
                (lang) => lang.name && lang.name.trim() !== "",
              ) && (
                <div className="mt-2 mb-4">
                  <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
                    Languages
                  </p>
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
                </div>
              )}

            {/* Certifications and Licenses */}
            {Array.isArray(finalize?.certificationsAndLicenses) &&
              finalize.certificationsAndLicenses.some(
                (item) =>
                  item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
              ) && (
                <div className="mt-2 mb-4">
                  <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
                    Certifications and Licenses
                  </p>
                  <div className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4">
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

            {/* Hobbies and Interests */}
            {Array.isArray(finalize?.hobbiesAndInterests) &&
              finalize.hobbiesAndInterests.some(
                (item) =>
                  item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
              ) && (
                <div className="mt-2 mb-4">
                  <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
                    Hobbies and Interests
                  </p>
                  <div className="pt-1 pb-2 text-gray-500 text-[15px] wrap-break-word">
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

            {/* Awards and Honors */}
            {Array.isArray(finalize?.awardsAndHonors) &&
              finalize.awardsAndHonors.some(
                (item) =>
                  item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
              ) && (
                <div className="mt-2 mb-4">
                  <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
                    Awards and Honors
                  </p>
                  <div className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4">
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

            {/* References */}
            {Array.isArray(finalize?.references) &&
              finalize.references.some(
                (item) =>
                  item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
              ) && (
                <div className="mt-2">
                  <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
                    References
                  </p>
                  <div className="pt-1 pb-2 text-gray-500 text-[15px] wrap-break-word">
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
          </div>

          <div className="w-1 border-l border-gray-300 mx-1" />

          {/* right side */}
          <div className="w-[60%]">
            <div className="w-full pt-2 pr-5">
              {/* experience */}
              {experiences?.length > 0 && (
                <div>
                  <p className="text-[15px] font-semibold underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
                    EXPERIENCE
                  </p>
                  {experiences.map((exp, index) => (
                    <div key={exp.id || index} className="mb-4">
                      <div className="flex justify-between items-center mt-1 mb-2">
                        {exp.jobTitle && (
                          <i className="text-[11.5px] font-semibold">
                            {exp.jobTitle}
                          </i>
                        )}
                        <div className="flex justify-center items-center text-[11.5px] font-semibold gap-1">
                          <MonthYearDisplay
                            value={exp.startDate}
                            shortYear={true}
                          />
                          {exp.startDate && exp.endDate && <span>-</span>}
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
                        <p className="text-[12px] text-gray-700 mb-2">
                          {[exp.location, exp.employer]
                            .filter(Boolean)
                            .join(" - ")}
                        </p>
                      )}

                      {exp.text && (
                        <div
                          className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4"
                          dangerouslySetInnerHTML={{ __html: exp.text }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* education */}
              {educations?.length > 0 && (
                <div>
                  <p className="text-[15px] font-semibold underline underline-offset-4 mb-3 mt-4 decoration-2 decoration-gray-800">
                    EDUCATION
                  </p>
                  {educations.map((edu, index) => (
                    <div key={edu.id || index} className="mb-4">
                      <div className="flex justify-between items-center mt-1 mb-2">
                        <i className="text-[11.5px] font-semibold">
                          {edu.schoolname || ""}
                        </i>
                        <div className="flex justify-center items-center text-[11.5px] font-semibold gap-1">
                          {(edu.startDate || edu.endDate) && (
                            <>
                              <MonthYearDisplay
                                value={edu.startDate}
                                shortYear={true}
                              />
                              {edu.startDate && edu.endDate && (
                                <hr className="w-3 border-l border-black" />
                              )}
                              <MonthYearDisplay
                                value={edu.endDate}
                                shortYear={true}
                              />
                            </>
                          )}
                        </div>
                      </div>

                      {(edu.location || edu.degree) && (
                        <p className="text-[12px] text-gray-700 mb-2">
                          {[edu.location, edu.degree]
                            .filter(Boolean)
                            .join(" - ")}
                        </p>
                      )}

                      {edu.text && (
                        <div
                          className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4"
                          dangerouslySetInnerHTML={{ __html: edu.text }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Websites and Social Media */}
              {Array.isArray(finalize?.websitesAndSocialMedia) &&
                finalize.websitesAndSocialMedia.some(
                  (item) =>
                    (item.websiteUrl && item.websiteUrl.trim() !== "") ||
                    (item.socialMedia && item.socialMedia.trim() !== ""),
                ) && (
                  <div className="mt-4">
                    <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
                      Websites and Social Media
                    </p>
                    <div className="pt-1 pb-2 text-[15px] wrap-break-word">
                      {finalize.websitesAndSocialMedia.map(
                        (item, index) =>
                          ((item.websiteUrl && item.websiteUrl.trim() !== "") ||
                            (item.socialMedia &&
                              item.socialMedia.trim() !== "")) && (
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
                                    className="text-gray-500 underline wrap-break-word"
                                  >
                                    {item.websiteUrl}
                                  </a>
                                </div>
                              )}
                              {item.socialMedia && (
                                <div className="mt-2">
                                  <p className="font-semibold">
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
                                    className="text-gray-500 underline wrap-break-word"
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

              {/* Custom Section */}
              {Array.isArray(finalize?.customSection) &&
                finalize.customSection.some(
                  (section) =>
                    section?.name?.trim() || section?.description?.trim(),
                ) && (
                  <div className="mt-4">
                    {finalize.customSection
                      .filter(
                        (section) =>
                          section?.name?.trim() || section?.description?.trim(),
                      )
                      .map((section, index) => (
                        <div key={section.id || index} className="mt-2">
                          {section.name && (
                            <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
                              {section.name}
                            </p>
                          )}

                          {section.description && (
                            <div
                              className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4"
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
        </div>
      </div>
    </>
  );
};

export default TemplateTwo;
