// "use client";
// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useContext,
// } from "react";
// import dynamic from "next/dynamic";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";
// import MonthYearDisplay from "../../../utils/MonthYearDisplay";
// import { IoMdAdd, IoIosArrowDown } from "react-icons/io";
// import {
//   FiChevronDown,
//   FiTrash2,
//   FiX,
//   FiCheckCircle,
//   FiXCircle,
// } from "react-icons/fi";
// import { FaRegLightbulb } from "react-icons/fa";
// import { BsArrowLeftCircleFill } from "react-icons/bs";

// import { CreateContext } from "@/app/context/CreateContext";
// import { useRouter } from "next/navigation";
// import Stepper from "../../../components/resume/Steppers";
// import { Experience } from "@/app/types";

// // Dynamically import Editor to avoid SSR issues
// const Editor = dynamic(
//   () => import("primereact/editor").then((mod) => mod.Editor),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="rounded-lg mt-3 md:mt-4 lg:mt-5 bg-white h-[120px] min-h-[120px] flex items-center justify-center">
//         <div className="animate-pulse text-gray-400">Loading editor...</div>
//       </div>
//     ),
//   },
// );

// const ExperienceForm = () => {
//   const UseContext = useContext(CreateContext);
//   const Contactid = UseContext?.contact.contactId;
//   const [isExperienced, setIsExperienced] = useState(true);

//   const router = useRouter();

//   // Toggle between Experienced / Fresher
//   const toggleExperienceMode = () => {
//     setIsExperienced((prev) => {
//       const newValue = !prev;

//       // If user selects Fresher → clear all experience
//       if (!newValue) {
//         setExperiences([]);
//       }

//       return newValue;
//     });
//   };

//   const { experiences, setExperiences } = UseContext;

//   const pickerRefs = useRef<Record<string | number, HTMLDivElement | null>>({});
//   const inputRefs = useRef<Record<string | number, HTMLInputElement | null>>(
//     {},
//   );

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const addExperience = () => {
//     setExperiences([
//       ...experiences,
//       {
//         id: Date.now(),
//         jobTitle: "",
//         employer: "",
//         location: "",
//         startDate: "",
//         endDate: "",
//         text: "",
//         isOpen: true,
//         showPicker: false,
//         year: new Date().getFullYear(),
//       },
//     ]);
//   };

//   const [error, setErrors] = useState<any>({});

//   useEffect(() => {
//     if (Contactid) {
//       fetchExp();
//     }
//   }, [Contactid]);

//   const fetchExp = async () => {
//     try {
//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
//       const response = await axios.get(
//         `${API_URL}/api/exs
//           zvperience/get-experience/${Contactid}`,
//       );

//       const experienceList = response.data?.[0]?.experiences || [];

//       if (experienceList.length > 0) {
//         const formattedData = experienceList.map((item: any) => ({
//           id: item._id || Date.now(),
//           jobTitle: item?.jobTitle || "",
//           employer: item?.employer || "",
//           location: item?.location || "",
//           startDate: item?.startDate ? item?.startDate.slice(0, 7) : "",
//           endDate: item?.endDate ? item?.endDate.split("T")[0] : "",
//           text: item?.text || "",
//           isOpen: true,
//           touched: {},
//           showPicker: false,
//           year: item.startDate
//             ? new Date(item.startDate).getFullYear()
//             : new Date().getFullYear(),
//         }));

//         setExperiences(formattedData);
//       } else {
//         console.log("No experience data found for user");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSubmit = async (e?: React.FormEvent) => {
//     if (e) e.preventDefault();

//     try {
//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
//       const formData = {
//         experiences,
//       };

//       const response = await axios.post(
//         `${API_URL}/api/experience/update`,
//         formData,
//         { params: { contactId: Contactid } },
//       );

//       return true;
//     } catch (err: any) {
//       setErrors(err);
//       console.error("Error sending message:", err);
//       toast.error("Failed to save experience!");

//       return false;
//     }
//   };

//   const toggleForm = (id: string | number) => {
//     setExperiences((prev) =>
//       prev.map((exp) =>
//         exp.id === id ? { ...exp, isOpen: !exp.isOpen } : exp,
//       ),
//     );
//   };

//   const handleChange = (
//     id: string | number,
//     field: keyof Experience,
//     value: string | number | boolean,
//   ) => {
//     setExperiences((prev) =>
//       prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
//     );
//   };

//   const handleBlur = (id: string | number, field: string) => {
//     setExperiences((prev) =>
//       prev.map((exp) =>
//         exp.id === id ? { ...exp, touched: { [field]: true } } : exp,
//       ),
//     );
//   };

//   const deleteExperience = (id: string | number) => {
//     setExperiences(experiences.filter((exp) => exp.id !== id));
//   };

//   const handleSelect = (id: string | number, value: string) => {
//     setExperiences((prev) =>
//       prev.map((exp) =>
//         exp.id === id ? { ...exp, endDate: value, showPicker: false } : exp,
//       ),
//     );
//   };

//   const togglePicker = (id: string | number) => {
//     setExperiences((prev) =>
//       prev.map((exp) =>
//         exp.id === id ? { ...exp, showPicker: !exp.showPicker } : exp,
//       ),
//     );
//   };

//   const [experienceTipsButtonClicked, setExperienceTipsButtonClicked] = useState(false);
//   const [Airesponse, setAireseponse] = useState<string[] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [clickedIndexoFGenerateWithAIBtn, setClickedIndexoFGenerateWithAIBtn] =
//     useState<number | null>(null);

//   const handleSubmitAi = async (index: number) => {
//     setClickedIndexoFGenerateWithAIBtn(index);
//     setLoading(true);
//     setAireseponse(null);

//     try {
//       const filteredExperiences = experiences.map((exp) => ({
//         jobTitle: exp.jobTitle,
//         employer: exp.employer,
//       }));

//       const formData = {
//         job_title: filteredExperiences[index]?.jobTitle || "",
//         company: filteredExperiences[index]?.employer || "",
//       };

//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/resume/experience`,
//         formData,
//       );

//       const bullets = response.data.experience_bullets
//         .split("\n")
//         .map((item: string) => item.replace("- ", "").trim())
//         .filter(Boolean);

//       setAireseponse(bullets);
//       setShowPopup(true);

//       return true;
//     } catch (err: any) {
//       setErrors(err);
//       console.error("Error sending message:", err);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const insertAIResponse = (item: string, index: number) => {
//     if (clickedIndexoFGenerateWithAIBtn === null) return;

//     const updated = [...experiences];
//     updated[clickedIndexoFGenerateWithAIBtn].text =
//       (updated[clickedIndexoFGenerateWithAIBtn].text || "") + "\n" + item;

//     setExperiences(updated);

//     if (Airesponse) {
//       const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
//       setAireseponse(newAiResponse.length > 0 ? newAiResponse : null);
//     }
//   };

//   console.log("experiences", experiences);
//   return (
//     <section className="relative h-screen overflow-hidden">
//       <div className="p-3 md:p-4 lg:p-5 bg-white rounded-xl sm:rounded-2xl shadow-soft h-full flex flex-col">
//         {/* Header Section */}
//         <Stepper />

//         {/* Scrollable Main Content */}
//         <div className="flex-1 overflow-y-auto pb-5 mt-3">
//           <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 mb-3">
//             <div className="flex items-center gap-2 sm:gap-3">
//               <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//                 <svg
//                   className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                   />
//                 </svg>
//               </div>
//               <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
//                 Work Experience
//               </h1>
//             </div>

//             <div className="flex justify-end">
//               <button
//                 onClick={() => setExperienceTipsButtonClicked((prev) => !prev)}
//                 className="flex items-center justify-center xs:justify-start gap-2 bg-linear-to-r from-white to-gray-50/80 border border-gray-200 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-gray-700 text-xs sm:text-sm font-medium hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 w-fit"
//               >
//                 <motion.div
//                   animate={{ opacity: [1, 0.4, 1] }}
//                   transition={{
//                     duration: 1,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   <FaRegLightbulb className="text-[#c40116] text-base sm:text-lg" />
//                 </motion.div>
//                 <span className="truncate">Experience Tips</span>
//                 <motion.div
//                   animate={{ rotate: experienceTipsButtonClicked ? 180 : 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="text-gray-500 shrink-0"
//                 >
//                   <IoIosArrowDown />
//                 </motion.div>
//               </button>
//             </div>
//           </div>

//           <p className="text-gray-600 text-xs sm:text-sm font-medium">
//             List your work experience starting with the most recent position
//             first.
//           </p>
//           {/* Experience Toggle */}
//           <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
//             <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
//               <div
//                 onClick={toggleExperienceMode}
//                 className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full cursor-pointer transition-all duration-300 ${
//                   isExperienced
//                     ? "bg-linear-to-r from-[#c40116] to-[#be0117]"
//                     : "bg-linear-to-r from-gray-200 to-gray-300"
//                 }`}
//               >
//                 <div
//                   className={`absolute top-0.5 sm:top-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white shadow-md transition-all duration-300 ${
//                     isExperienced ? "left-5 sm:left-7" : "left-0.5 sm:left-1"
//                   }`}
//                 ></div>
//               </div>
//               <div className="flex items-center gap-1.5 sm:gap-2">
//                 <span
//                   className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
//                     isExperienced ? "text-gray-400" : "text-[#c40116]"
//                   }`}
//                 >
//                   Fresher
//                 </span>
//                 <span className="text-xs sm:text-sm font-semibold text-gray-500">
//                   /
//                 </span>
//                 <span
//                   className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
//                     isExperienced ? "text-[#c40116]" : "text-gray-400"
//                   }`}
//                 >
//                   Experienced
//                 </span>
//               </div>
//             </div>
//           </div>
//           {isExperienced && (
//             <div className="space-y-3 sm:space-y-4 pb-8 sm:pb-10">
//               {experiences.map((exp, index) => (
//                 <div
//                   key={exp.id}
//                   className="bg-[#f3f4f6]/80 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-subtle transition-all duration-300 hover:shadow-md"
//                 >
//                   {/* Header */}
//                   <div
//                     onClick={() => toggleForm(exp.id)}
//                     className="flex justify-between items-center cursor-pointer p-3 sm:p-4 lg:p-5 group hover:bg-gray-50/50 transition-all duration-300"
//                   >
//                     <div className="flex-1 min-w-0">
//                       <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-0.5 sm:mb-1 truncate group-hover:text-[#c40116] transition-colors">
//                         {exp.jobTitle || "Job Title"}
//                       </h3>
//                       <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] xs:text-xs text-gray-500">
//                         <span className="truncate max-w-25 sm:max-w-none">
//                           {exp.employer || "Employer"}
//                         </span>
//                         <span className="text-gray-300 hidden xs:inline">
//                           •
//                         </span>
//                         <span className="whitespace-nowrap">
//                           <MonthYearDisplay
//                             value={exp.startDate}
//                             shortYear={true}
//                           />
//                           {" - "}
//                           <MonthYearDisplay
//                             value={exp.endDate}
//                             shortYear={true}
//                           />
//                         </span>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2 sm:gap-3 ml-2">
//                       <motion.div
//                         animate={{ rotate: exp.isOpen ? 180 : 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="text-gray-700 group-hover:text-[#c40116] transition-colors"
//                       >
//                         <FiChevronDown size={18} className="sm:w-5 sm:h-5" />
//                       </motion.div>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteExperience(exp.id);
//                         }}
//                         className="p-1.5 sm:p-2 rounded-lg bg-linear-to-r from-gray-100 to-gray-50 text-[#c40116] hover:shadow-sm transition-all duration-200"
//                         type="button"
//                       >
//                         <FiTrash2 size={14} className="sm:w-4 sm:h-4" />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div
//                     className={`transition-all duration-500 overflow-hidden ${
//                       exp.isOpen ? "max-h-500 opacity-100" : "max-h-0 opacity-0"
//                     }`}
//                   >
//                     <div className="p-2 sm:p-3 md:p-4 space-y-4 sm:space-y-6 border-t border-gray-100">
//                       {/* Job Title & Employer */}
//                       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//                         <div className="group">
//                           <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                             Job Title
//                           </label>
//                           <div className="relative">
//                             <input
//                               type="text"
//                               value={exp.jobTitle}
//                               onChange={(e) =>
//                                 handleChange(exp.id, "jobTitle", e.target.value)
//                               }
//                               placeholder="Enter your job title"
//                               className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                             />
//                           </div>
//                         </div>

//                         <div className="group">
//                           <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                             Employer
//                           </label>
//                           <div className="relative">
//                             <input
//                               type="text"
//                               value={exp.employer}
//                               onChange={(e) =>
//                                 handleChange(exp.id, "employer", e.target.value)
//                               }
//                               onBlur={() => handleBlur(exp.id, "employer")}
//                               placeholder="Company name"
//                               className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Location & Dates */}
//                       <div className="grid grid-cols-1  gap-4 sm:gap-6">
//                         <div className="group">
//                           <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                             Location
//                           </label>
//                           <div className="relative">
//                             <input
//                               type="text"
//                               value={exp.location}
//                               onChange={(e) =>
//                                 handleChange(exp.id, "location", e.target.value)
//                               }
//                               placeholder="City, State or Remote"
//                               className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                             />
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                           <div className="group">
//                             <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                               Start Date
//                             </label>
//                             <input
//                               type="month"
//                               value={exp.startDate}
//                               onChange={(e) =>
//                                 handleChange(
//                                   exp.id,
//                                   "startDate",
//                                   e.target.value,
//                                 )
//                               }
//                               className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                             />
//                           </div>

//                           <div className="relative group">
//                             <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                               End Date
//                             </label>
//                             <div className="relative">
//                               <input
//                                 type="text"
//                                 readOnly
//                                 ref={(el) => {
//                                   if (el) inputRefs.current[exp.id] = el;
//                                 }}
//                                 value={exp.endDate}
//                                 onClick={() => togglePicker(exp.id)}
//                                 placeholder="MM/YYYY"
//                                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                               />

//                               {exp.showPicker && (
//                                 <div
//                                   ref={(el) => {
//                                     if (el) pickerRefs.current[exp.id] = el;
//                                   }}
//                                   className="absolute right-0 -mt-28 sm:-mt-24 w-56 sm:w-60 bg-white shadow-xl rounded-xl p-3 sm:p-4 z-9999 border border-gray-100"
//                                 >
//                                   {/* Year Header */}
//                                   <div className="flex justify-between items-center mb-2 sm:mb-3">
//                                     <button
//                                       onClick={() =>
//                                         handleChange(
//                                           exp.id,
//                                           "year",
//                                           exp.year - 1,
//                                         )
//                                       }
//                                       className="px-1.5 sm:px-2 py-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
//                                       type="button"
//                                     >
//                                       &lt;
//                                     </button>
//                                     <span className="font-semibold text-gray-800 text-sm sm:text-base">
//                                       {exp.year}
//                                     </span>
//                                     <button
//                                       onClick={() =>
//                                         handleChange(
//                                           exp.id,
//                                           "year",
//                                           exp.year + 1,
//                                         )
//                                       }
//                                       className="px-1.5 sm:px-2 py-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
//                                       type="button"
//                                     >
//                                       &gt;
//                                     </button>
//                                   </div>

//                                   {/* Month Grid */}
//                                   <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
//                                     {months.map((month) => (
//                                       <div
//                                         key={month}
//                                         onClick={() =>
//                                           handleSelect(
//                                             exp.id,
//                                             `${month} ${exp.year}`,
//                                           )
//                                         }
//                                         className="p-1.5 sm:p-2 rounded-lg cursor-pointer hover:bg-[#c40116]/10 hover:text-[#c40116] active:bg-[#c40116]/20 transition-colors text-gray-700 text-xs sm:text-sm"
//                                       >
//                                         {month.slice(0, 3)}
//                                       </div>
//                                     ))}
//                                   </div>

//                                   {/* Currently work here */}
//                                   <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
//                                     <button
//                                       onClick={() =>
//                                         handleSelect(
//                                           exp.id,
//                                           "Currently work here",
//                                         )
//                                       }
//                                       className="w-full text-center text-[#c40116] hover:text-[#5e000b] font-medium text-xs sm:text-sm transition-colors"
//                                       type="button"
//                                     >
//                                       Currently work here
//                                     </button>
//                                   </div>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Description with AI */}
//                       <div className="group">
//                         <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                           Description
//                         </label>

//                         <div className="flex justify-end">
//                           <div className="relative inline-block group ">
//                             <button
//                               onClick={() => handleSubmitAi(index)}
//                               disabled={loading || !exp.jobTitle}
//                               className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg  text-xs sm:text-sm font-medium transition-all duration-300 w-fit ${
//                                 !exp.jobTitle
//                                   ? "bg-linear-to-r from-gray-300 text-black to-gray-400 cursor-not-allowed opacity-90"
//                                   : "bg-linear-to-r from-[#c40116] to-[#c40116]/60 hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] text-white"
//                               }`}
//                               type="button"
//                             >
//                               <svg
//                                 className="w-3.5 h-3.5 sm:w-4 sm:h-4"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M13 10V3L4 14h7v7l9-11h-7z"
//                                 />
//                               </svg>
//                               {loading ? "Generating..." : "Generate with AI"}
//                             </button>

//                             {!exp.jobTitle && (
//                               <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-40 sm:w-48 bg-gray-900 text-white text-[10px] xs:text-xs rounded-lg p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
//                                 Enter your job title to use this feature
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         <Editor
//                           className="rounded-lg mt-3 md:mt-4 lg:mt-5 bg-white"
//                           value={exp.text}
//                           onTextChange={(e: any) =>
//                             handleChange(exp.id, "text", e.htmlValue)
//                           }
//                           style={{
//                             height: "120px",
//                             minHeight: "120px",
//                             background: "white",
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               {/* Add Experience Button */}
//               <button
//                 onClick={addExperience}
//                 className="w-full py-3 sm:py-3.5 bg-linear-to-br from-gray-50 to-white border-2 border-dashed border-gray-200 rounded-xl hover:border-[#c40116] hover:bg-[#c40116]/5 text-gray-600 hover:text-[#c40116] transition-all duration-300 group"
//                 type="button"
//               >
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="p-1 sm:p-1.5 bg-gray-100 rounded-lg group-hover:bg-[#c40116]/10 transition-colors">
//                     <IoMdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </div>
//                   <span className="text-xs sm:text-sm font-semibold">
//                     Add Work Experience
//                   </span>
//                 </div>
//               </button>
//             </div>
//           )}
//         </div>

//         {/* AI Response Popup */}
//         {showPopup && Airesponse && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] sm:max-h-[70vh] overflow-hidden"
//             >
//               <div className="p-1 bg-linear-to-r from-[#c40116] to-[#be0117]"></div>

//               <div className="p-4 sm:p-6">
//                 <div className="flex items-start justify-between gap-3 mb-4 sm:mb-6">
//                   <div className="flex-1 min-w-0">
//                     <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//                       AI Suggestions
//                     </h2>
//                     <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                       Click on any suggestion below to add it to your
//                       description
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => setShowPopup(false)}
//                     className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
//                   >
//                     <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
//                   </button>
//                 </div>

//                 <div className="space-y-2 sm:space-y-3 max-h-[50vh] overflow-y-auto pr-1 sm:pr-2">
//                   {Airesponse?.map((item, index) => (
//                     <div
//                       key={index}
//                       onClick={() => insertAIResponse(item, index)}
//                       className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border border-gray-200 hover:border-[#c40116] hover:bg-[#c40116]/5 cursor-pointer group transition-all duration-200"
//                     >
//                       <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg group-hover:from-[#c40116]/20 group-hover:to-[#be0117]/20 transition-all flex-shrink-0">
//                         <BsArrowLeftCircleFill className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
//                       </div>
//                       <p className="text-gray-700 text-xs sm:text-sm leading-relaxed flex-1">
//                         {item}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}

//         {/* Fixed Footer - Always visible at bottom */}
//         <div className="shrink-0 pt-4 mt-4 border-t border-gray-200">
//           <div className="flex justify-between">
//             <button
//               className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300"
//               onClick={() => router.push("/resume-details/contact")}
//             >
//               Back
//             </button>

//             <button
//               className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold transition-colors duration-300"
//               onClick={() => router.push("/resume-details/education")}
//             >
//               Next Education
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ExperienceForm;

"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import MonthYearDisplay from "../../../utils/MonthYearDisplay";
import { IoMdAdd, IoIosArrowDown } from "react-icons/io";
import { FiCheckCircle, FiChevronDown, FiTrash2, FiX, FiXCircle } from "react-icons/fi";
import { FaRegLightbulb } from "react-icons/fa";
import { BsArrowLeftCircleFill } from "react-icons/bs";

import { CreateContext } from "@/app/context/CreateContext";
import { useRouter } from "next/navigation";
import Stepper from "../../../components/resume/Steppers";
import { Experience } from "@/app/types";
import { getLocalStorage, setLocalStorage } from "@/app/utils";
import { User } from "@/app/types/user.types";
import { API_URL } from "@/app/config/api";

// Dynamically import Editor to avoid SSR issues
const Editor = dynamic(
  () => import("primereact/editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-lg mt-3 md:mt-4 lg:mt-5 bg-white h-30 min-h-30 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading editor...</div>
      </div>
    ),
  },
);

const ExperienceForm = () => {
  const router = useRouter();
  const userDetails = getLocalStorage<User>("user_details");
  const UseContext = useContext(CreateContext);
  const Contactid = UseContext.contact.contactId;
  const [isExperienced, setIsExperienced] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedData, setLastSavedData] = useState<string>("");

  const { experiences, setExperiences, fullResumeData, setFullResumeData } =
    UseContext;

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialLoadDone = useRef(false);

  // Save to localStorage whenever experiences change
  useEffect(() => {
    if (!initialLoadDone.current) return;

    if (fullResumeData) {
      const updatedFullData = {
        ...fullResumeData,
        experiences: experiences,
      };
      setFullResumeData(updatedFullData);
      setLocalStorage("fullResumeData", updatedFullData);
    }
  }, [experiences]);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now(),
        jobTitle: "",
        employer: "",
        location: "",
        startDate: "",
        endDate: "",
        text: "",
        isOpen: true,
        showPicker: false,
        year: new Date().getFullYear(),
      },
    ]);
  };

  useEffect(() => {
    if (Contactid && userDetails) {
      fetchExp();
    }
  }, [Contactid]);

  const fetchExp = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/experience/get-experience/${Contactid}`,
      );

      const experienceList = response.data?.[0]?.experiences || [];

      if (experienceList.length > 0) {
        const formattedData = experienceList.map((item: any) => ({
          id: item._id || Date.now(),
          jobTitle: item?.jobTitle || "",
          employer: item?.employer || "",
          location: item?.location || "",
          startDate: item?.startDate ? item?.startDate.slice(0, 7) : "",
          endDate: item?.endDate ? item?.endDate.split("T")[0] : "",
          text: item?.text || "",
          isOpen: true,
          touched: {},
          showPicker: false,
          year: item.startDate
            ? new Date(item.startDate).getFullYear()
            : new Date().getFullYear(),
        }));

        setExperiences(formattedData);
        setLastSavedData(JSON.stringify(formattedData));
      } else {
        console.log("No experience data found for user");
      }

      initialLoadDone.current = true;
    } catch (error) {
      console.log(error);
    }
  };

  const saveToAPI = async (experiencesData: typeof experiences) => {
    if (!Contactid) {
      console.error("Contact ID is required");
      return false;
    }

    // Check if data has changed from last saved
    const currentDataString = JSON.stringify(experiencesData);
    if (currentDataString === lastSavedData) {
      return true; // No changes to save
    }

    setIsSaving(true);

    try {
      const formData = {
        experiences: experiencesData,
      };

      const response = await axios.post(
        `${API_URL}/api/experience/update`,
        formData,
        { params: { contactId: Contactid } },
      );

      setLastSavedData(currentDataString);
      return true;
    } catch (err: any) {
      console.error("Error saving experience:", err);
      toast.error("Failed to save experience!");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Debounced save function
  const debouncedSave = useCallback(
    (experiencesData: typeof experiences) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        saveToAPI(experiencesData);
      }, 1000);
    },
    [Contactid, lastSavedData],
  );

  const toggleExperienceMode = () => {
    const newValue = !isExperienced;

    setIsExperienced(newValue);

    if (!newValue) {
      setExperiences([]);
      debouncedSave([]);
    }
  };

  const toggleForm = (id: string | number) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, isOpen: !exp.isOpen } : exp,
      ),
    );
  };

  const handleChange = (
    id: string | number,
    field: keyof Experience,
    value: string | number | boolean,
  ) => {
    setExperiences((prev) => {
      const updated = prev.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      );
      debouncedSave(updated);
      return updated;
    });
  };

  const deleteExperience = (id: string | number) => {
    setExperiences((prev) => {
      const updated = prev.filter((exp) => exp.id !== id);
      saveToAPI(updated);
      return updated;
    });
  };

  const handleSelect = (id: string | number, value: string) => {
    setExperiences((prev) => {
      const updated = prev.map((exp) =>
        exp.id === id ? { ...exp, endDate: value, showPicker: false } : exp,
      );
      debouncedSave(updated);
      return updated;
    });
  };

  const togglePicker = (id: string | number) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, showPicker: !exp.showPicker } : exp,
      ),
    );
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const [experienceTipsButtonClicked, setExperienceTipsButtonClicked] = useState(false);
  const [Airesponse, setAireseponse] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [clickedIndexoFGenerateWithAIBtn, setClickedIndexoFGenerateWithAIBtn] =
    useState<number | null>(null);

  const handleSubmitAi = async (index: number) => {
    setClickedIndexoFGenerateWithAIBtn(index);
    setLoading(true);
    setAireseponse(null);

    try {
      const filteredExperiences = experiences.map((exp) => ({
        jobTitle: exp.jobTitle,
        employer: exp.employer,
      }));

      const formData = {
        job_title: filteredExperiences[index]?.jobTitle || "",
        company: filteredExperiences[index]?.employer || "",
      };

      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/resume/experience`,
        formData,
      );

      const bullets = response.data.experience_bullets
        .split("\n")
        .map((item: string) => item.replace("- ", "").trim())
        .filter(Boolean);

      setAireseponse(bullets);
      setShowPopup(true);

      return true;
    } catch (err: any) {
      console.error("Error sending message:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const insertAIResponse = (item: string, index: number) => {
    if (clickedIndexoFGenerateWithAIBtn === null) return;

    setExperiences((prev) => {
      const updated = [...prev];
      updated[clickedIndexoFGenerateWithAIBtn].text =
        (updated[clickedIndexoFGenerateWithAIBtn].text || "") + "\n" + item;
      debouncedSave(updated);
      return updated;
    });

    if (Airesponse) {
      const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
      setAireseponse(newAiResponse.length > 0 ? newAiResponse : null);
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="p-3 md:p-4 lg:p-5 bg-white rounded-xl sm:rounded-2xl shadow-soft h-full flex flex-col">
        {/* Header Section */}
        <Stepper />

        {/* Auto-save indicator */}
        {isSaving && (
          <div className="absolute top-20 right-5 z-10 flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-md">
            <div className="w-3 h-3 border-2 border-gray-300 border-t-[#c40116] rounded-full animate-spin"></div>
            <span className="text-xs text-gray-600">Saving...</span>
          </div>
        )}

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto pb-5 mt-3">
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
                Work Experience
              </h1>
            </div>

            <div className="flex justify-end me-5">
              <button
                onClick={() => setExperienceTipsButtonClicked((prev) => !prev)}
                className="flex items-center justify-center xs:justify-start gap-2 bg-linear-to-r from-white to-gray-50/80 border border-gray-200 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-gray-700 text-xs sm:text-sm font-medium hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 w-fit"
              >
                <motion.div
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaRegLightbulb className="text-[#c40116] text-base sm:text-lg" />
                </motion.div>
                <span className="truncate">Experience Tips</span>
                <motion.div
                  animate={{ rotate: experienceTipsButtonClicked ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-500 shrink-0"
                >
                  <IoIosArrowDown />
                </motion.div>
              </button>
            </div>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm font-medium">
            List your work experience starting with the most recent position
            first.
          </p>
          {/* Experience Toggle */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div
                onClick={toggleExperienceMode}
                className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full cursor-pointer transition-all duration-300 ${
                  isExperienced
                    ? "bg-linear-to-r from-[#c40116] to-[#be0117]"
                    : "bg-linear-to-r from-gray-200 to-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 sm:top-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white shadow-md transition-all duration-300 ${
                    isExperienced ? "left-5 sm:left-7" : "left-0.5 sm:left-1"
                  }`}
                ></div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span
                  className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                    isExperienced ? "text-gray-400" : "text-[#c40116]"
                  }`}
                >
                  Fresher
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-500">
                  /
                </span>
                <span
                  className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                    isExperienced ? "text-[#c40116]" : "text-gray-400"
                  }`}
                >
                  Experienced
                </span>
              </div>
            </div>
          </div>
          {isExperienced && (
            <div className="space-y-3 sm:space-y-4 pb-8 sm:pb-10">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className="bg-[#f3f4f6]/80 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-subtle transition-all duration-300 hover:shadow-md"
                >
                  {/* Header */}
                  <div
                    onClick={() => toggleForm(exp.id)}
                    className="flex justify-between items-center cursor-pointer p-3 sm:p-4 lg:p-5 group hover:bg-gray-50/50 transition-all duration-300"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-0.5 sm:mb-1 truncate group-hover:text-[#c40116] transition-colors">
                        {exp.jobTitle || "Job Title"}
                      </h3>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] xs:text-xs text-gray-500">
                        <span className="truncate max-w-25 sm:max-w-none">
                          {exp.employer || "Employer"}
                        </span>
                        <span className="text-gray-300 hidden xs:inline">
                          •
                        </span>
                        <span className="whitespace-nowrap">
                          <MonthYearDisplay
                            value={exp.startDate}
                            shortYear={true}
                          />
                          {" - "}
                          <MonthYearDisplay
                            value={exp.endDate || 'present'}
                            shortYear={true}
                          />
                          
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 ml-2">
                      <motion.div
                        animate={{ rotate: exp.isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-700 group-hover:text-[#c40116] transition-colors"
                      >
                        <FiChevronDown size={18} className="sm:w-5 sm:h-5" />
                      </motion.div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteExperience(exp.id);
                        }}
                        className="p-1.5 sm:p-2 rounded-lg bg-linear-to-r from-gray-100 to-gray-50 text-[#c40116] hover:shadow-sm transition-all duration-200"
                        type="button"
                      >
                        <FiTrash2 size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      exp.isOpen ? "max-h-500 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-2 sm:p-3 md:p-4 space-y-4 sm:space-y-6 border-t border-gray-100">
                      {/* Job Title & Employer */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <div className="group">
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                            Job Title
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={exp.jobTitle}
                              onChange={(e) =>
                                handleChange(exp.id, "jobTitle", e.target.value)
                              }
                              placeholder="Enter your job title"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                            />
                          </div>
                        </div>

                        <div className="group">
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                            Employer
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={exp.employer}
                              onChange={(e) =>
                                handleChange(exp.id, "employer", e.target.value)
                              }
                              placeholder="Company name"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Location & Dates */}
                      <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        <div className="group">
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                            Location
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) =>
                                handleChange(exp.id, "location", e.target.value)
                              }
                              placeholder="City, State or Remote"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="group">
                            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                              Start Date
                            </label>
                            <input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) =>
                                handleChange(
                                  exp.id,
                                  "startDate",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                            />
                          </div>

                          <div className="relative group">
                            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                              End Date
                            </label>
                             <input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) =>
                                handleChange(
                                  exp.id,
                                  "endDate",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                            />
                            {/* <div className="relative">
                              <input
                                type="text"
                                readOnly
                                ref={(el) => {
                                  if (el) inputRefs.current[exp.id] = el;
                                }}
                                value={exp.endDate}
                                onClick={() => togglePicker(exp.id)}
                                placeholder="MM/YYYY"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                              />

                              {exp.showPicker && (
                                <div
                                  ref={(el) => {
                                    if (el) pickerRefs.current[exp.id] = el;
                                  }}
                                  className="absolute right-0 -mt-28 sm:-mt-24 w-56 sm:w-60 bg-white shadow-xl rounded-xl p-3 sm:p-4 z-9999 border border-gray-100"
                                >
                                  <div className="flex justify-between items-center mb-2 sm:mb-3">
                                    <button
                                      onClick={() =>
                                        handleChange(
                                          exp.id,
                                          "year",
                                          exp.year - 1,
                                        )
                                      }
                                      className="px-1.5 sm:px-2 py-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
                                      type="button"
                                    >
                                      &lt;
                                    </button>
                                    <span className="font-semibold text-gray-800 text-sm sm:text-base">
                                      {exp.year}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleChange(
                                          exp.id,
                                          "year",
                                          exp.year + 1,
                                        )
                                      }
                                      className="px-1.5 sm:px-2 py-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
                                      type="button"
                                    >
                                      &gt;
                                    </button>
                                  </div>

                                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
                                    {months.map((month) => (
                                      <div
                                        key={month}
                                        onClick={() =>
                                          handleSelect(
                                            exp.id,
                                            `${month} ${exp.year}`,
                                          )
                                        }
                                        className="p-1.5 sm:p-2 rounded-lg cursor-pointer hover:bg-[#c40116]/10 hover:text-[#c40116] active:bg-[#c40116]/20 transition-colors text-gray-700 text-xs sm:text-sm"
                                      >
                                        {month.slice(0, 3)}
                                      </div>
                                    ))}
                                  </div>

                                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                                    <button
                                      onClick={() =>
                                        handleSelect(
                                          exp.id,
                                          "Currently work here",
                                        )
                                      }
                                      className="w-full text-center text-[#c40116] hover:text-[#5e000b] font-medium text-xs sm:text-sm transition-colors"
                                      type="button"
                                    >
                                      Currently work here
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div> */}
                          </div>
                        </div>
                      </div>

                      {/* Description with AI */}
                      <div className="group">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                          Description
                        </label>

                        <div className="flex justify-end">
                          <div className="relative inline-block group ">
                            <button
                              onClick={() => handleSubmitAi(index)}
                              disabled={loading || !exp.jobTitle}
                              className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg  text-xs sm:text-sm font-medium transition-all duration-300 w-fit ${
                                !exp.jobTitle
                                  ? "bg-linear-to-r from-gray-300 text-black to-gray-400 cursor-not-allowed opacity-90"
                                  : "bg-linear-to-r from-[#c40116] to-[#c40116]/60 hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] text-white cursor-pointer"
                              }`}
                              type="button"
                            >
                              <svg
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                              </svg>
                              {loading ? "Generating..." : "Generate with AI"}
                            </button>

                            {!exp.jobTitle && (
                              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-40 sm:w-48 bg-gray-900 text-white text-[10px] xs:text-xs rounded-lg p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                Enter your job title to use this feature
                              </div>
                            )}
                          </div>
                        </div>

                        <Editor
                          className="rounded-lg mt-3 md:mt-4 lg:mt-5 bg-white"
                          value={exp.text}
                          onTextChange={(e: any) => {
                            handleChange(exp.id, "text", e.htmlValue);
                            // Trigger blur-like behavior after typing stops
                            if (saveTimeoutRef.current) {
                              clearTimeout(saveTimeoutRef.current);
                            }
                          }}
                          style={{
                            height: "120px",
                            minHeight: "120px",
                            background: "white",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Experience Button */}
              <button
                onClick={addExperience}
                className="w-full py-3 sm:py-3.5 bg-linear-to-br from-gray-50 to-white border-2 border-dashed border-gray-200 rounded-xl hover:border-[#c40116] hover:bg-[#c40116]/5 text-gray-600 hover:text-[#c40116] transition-all duration-300 group"
                type="button"
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="p-1 sm:p-1.5 bg-gray-100 rounded-lg group-hover:bg-[#c40116]/10 transition-colors">
                    <IoMdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">
                    Add Work Experience
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* AI Response Popup */}
        {showPopup && Airesponse && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] sm:max-h-[70vh] overflow-hidden"
            >
              <div className="p-1 bg-linear-to-r from-[#c40116] to-[#be0117]"></div>

              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-3 mb-4 sm:mb-6">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                      AI Suggestions
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Click on any suggestion below to add it to your
                      description
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="p-1.5 sm:p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors shrink-0"
                  >
                    <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-2 sm:space-y-3 max-h-[50vh] overflow-y-auto pr-1 sm:pr-2">
                  {Airesponse?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => insertAIResponse(item, index)}
                      className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border border-gray-200 hover:border-[#c40116] hover:bg-[#c40116]/5 cursor-pointer group transition-all duration-200"
                    >
                      <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg group-hover:from-[#c40116]/20 group-hover:to-[#be0117]/20 transition-all shrink-0">
                        <BsArrowLeftCircleFill className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
                      </div>
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed flex-1">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

         {experienceTipsButtonClicked && (
          <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden p-4">
              <div
                className="absolute inset-0 backdrop-blur-sm"
                onClick={() => setExperienceTipsButtonClicked(false)}
              />
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:w-[30vw] h-auto max-h-[80vh] mt-8 sm:mt-20">
                <motion.div
                  initial={{ y: 50, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 50, opacity: 0, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                    duration: 0.4,
                  }}
                  className="w-full rounded-xl sm:rounded-2xl bg-white border border-gray-200 shadow-2xl max-h-[inherit] overflow-hidden"
                >
                  <div className="flex justify-between items-center p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
                        <FaRegLightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                        Experience Tips
                      </h3>
                    </div>
                    <button
                      onClick={() => setExperienceTipsButtonClicked(false)}
                      className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                      <FiX size={18} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <hr className="border-gray-100" />

                  <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 pb-8! mb-10 overflow-y-auto max-h-[calc(80vh-100px)]">
                    {/* Positive tips */}
                    <div className="space-y-3 sm:space-y-4">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        Best Practices
                      </h4>
                      {[
                        {
                          title: "Use bullet points",
                          desc: "Make your achievements stand out with concise bullet points.",
                        },
                        {
                          title: "Keep descriptions short and clear",
                          desc: "Aim for 4–5 of your strongest, most relevant skills.",
                        },
                        {
                          title: "Show your impact",
                          desc: "Highlight your accomplishments, not generic duties.",
                        },
                      ].map((tip, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 sm:gap-3"
                        >
                          <div className="shrink-0 mt-0.5">
                            <div className="p-1 sm:p-1.5 bg-emerald-100 rounded-lg">
                              <FiCheckCircle className="text-emerald-500 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-gray-800">
                              {tip.title}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                              {tip.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Negative tips */}
                    <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-gray-100">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        Avoid These
                      </h4>
                      {[
                        {
                          title: "Don't abbreviate job titles",
                          desc: "Write the full job title so it's easy to understand.",
                        },
                        {
                          title: "Don't use 'I' or full sentences",
                          desc: "Keep bullet points short, starting with action verbs.",
                        },
                        {
                          title: "Don't exaggerate or lie",
                          desc: "False claims can backfire during interviews.",
                        },
                      ].map((tip, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 sm:gap-3"
                        >
                          <div className="shrink-0 mt-0.5">
                            <div className="p-1 sm:p-1.5 bg-[#c40116]/10 rounded-lg">
                              <FiXCircle className="text-[#c40116] w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-gray-800">
                              {tip.title}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                              {tip.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatePresence>
        )}

        {/* Fixed Footer - Always visible at bottom */}
        <div className="shrink-0 pt-4 mt-4 border-t border-gray-200">
          <div className="flex justify-between">
            <button
              className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
              onClick={() => router.push("/resume-details/contact")}
            >
              Back
            </button>

            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold transition-colors duration-300 cursor-pointer"
              onClick={() => {
                if (saveTimeoutRef.current) {
                  clearTimeout(saveTimeoutRef.current);
                }
                saveToAPI(experiences).then(() => {
                  router.push("/resume-details/education");
                });
              }}
            >
              Next Education
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceForm;
