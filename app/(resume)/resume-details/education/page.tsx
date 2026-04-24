// "use client";

// // @ts-ignore
// import "primereact/resources/themes/saga-blue/theme.css";
// // @ts-ignore
// import "primereact/resources/primereact.min.css";
// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useContext,
//   useImperativeHandle,
//   forwardRef,
//   ForwardedRef,
//   useCallback,
// } from "react";
// import { FiChevronDown, FiTrash2 } from "react-icons/fi";
// import { IoMdAdd } from "react-icons/io";
// import dynamic from "next/dynamic";
// import { Calendar } from "primereact/calendar";

// import { CreateContext } from "@/app/context/CreateContext";
// import { FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";
// import { FaRegLightbulb } from "react-icons/fa";
// import { IoIosArrowDown } from "react-icons/io";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { BsArrowLeftCircleFill } from "react-icons/bs";
// import { useRouter } from "next/navigation";
// import Stepper from "../../../components/resume/Steppers";
// import { Education } from "@/app/types/context.types";
// import {
//   getLocalStorage,
//   getSessionStorage,
//   setLocalStorage,
//   setSessionStorage,
// } from "@/app/utils";
// import { API_URL } from "@/app/config/api";

// // Dynamically import Editor to avoid SSR issues
// const Editor = dynamic(
//   () => import("primereact/editor").then((mod) => mod.Editor),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="rounded-lg mt-3 md:mt-4 lg:mt-5 bg-white h-30 min-h-30 flex items-center justify-center">
//         <div className="animate-pulse text-gray-400">Loading editor...</div>
//       </div>
//     ),
//   },
// );

// const Education_form = () => {
//   const UseContext = useContext(CreateContext);
//   const contactId = UseContext?.contact._id || UseContext?.contact.contactId;

//   const { fullResumeData, setFullResumeData } = UseContext || {};

//   const router = useRouter();
//   const { education, setEducation } = UseContext || {
//     education: [],
//     setEducation: () => {},
//   };

//   const [showPopup, setShowPopup] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [Airesponse, setAireseponse] = useState<string[] | null>(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [lastSavedData, setLastSavedData] = useState<string>("");

//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const initialLoadDone = useRef(false);

//   // Save to localStorage whenever education changes
//   useEffect(() => {
//     if (!initialLoadDone.current) return;

//     if (fullResumeData) {
//       const updatedFullData = {
//         ...fullResumeData,
//         education: education,
//       };
//       setFullResumeData(updatedFullData);
//       setLocalStorage("fullResumeData", updatedFullData);
//     }
//   }, [education]);

//   const addEducation = () => {
//     setEducation((prev) => {
//       const updated = [
//         ...prev,
//         {
//           id: Date.now(),
//           schoolname: "",
//           degree: "",
//           location: "",
//           text: "",
//           startDate: "",
//           endDate: "",
//           isOpen: true,
//           showPicker: false,
//           year: new Date().getFullYear(),
//           error: {},
//         },
//       ];
//       debouncedSave(updated);
//       return updated;
//     });
//   };

//   const saveToAPI = async (educationData: typeof education) => {
//     if (!contactId) {
//       console.error("Contact ID is required");
//       return false;
//     }

//     // Check if data has changed from last saved
//     const currentDataString = JSON.stringify(educationData);
//     if (currentDataString === lastSavedData) {
//       return true; // No changes to save
//     }

//     setIsSaving(true);

//     try {
//       const formData = {
//         education: educationData,
//       };

//       const response = await axios.post(
//         `${API_URL}/api/education/update`,
//         formData,
//         { params: { contactId: contactId } },
//       );

//       setLastSavedData(currentDataString);
//       return true;
//     } catch (err: any) {
//       console.error("Error saving education:", err);
//       toast.error("Failed to save education!");
//       return false;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // Debounced save function
//   const debouncedSave = useCallback(
//     (educationData: typeof education) => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//       saveTimeoutRef.current = setTimeout(() => {
//         saveToAPI(educationData);
//       }, 1000);
//     },
//     [contactId, lastSavedData],
//   );

//   const fetched = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/education/get-education/${contactId}`,
//       );

//       const educationList = response.data?.[0]?.education || [];

//       if (educationList.length > 0) {
//         const formattedData = educationList.map((item: any) => ({
//           id: item._id || Date.now(),
//           schoolname: item?.schoolname || "",
//           degree: item?.degree || "",
//           location: item?.location || "",
//           startDate: item?.startDate || null,
//           endDate: item?.endDate || null,
//           text: item?.text || "",
//           isOpen: true,
//           touched: {},
//           showPicker: false,
//           year: item.startDate
//             ? new Date(item.startDate).getFullYear()
//             : new Date().getFullYear(),
//           error: {},
//         }));

//         setEducation(formattedData);
//         setLastSavedData(JSON.stringify(formattedData));
//       } else {
//         console.log("No education data found for user");
//       }

//       initialLoadDone.current = true;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // useEffect(() => {
//   //   if (contactId) {
//   //     fetched();
//   //   }
//   // }, [contactId]);

//   // Cleanup timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//     };
//   }, []);

//   const toggleForm = (id: string | number) => {
//     setEducation((prev) =>
//       prev.map((exp) =>
//         exp.id === id ? { ...exp, isOpen: !exp.isOpen } : exp,
//       ),
//     );
//   };

//   const handleChange = (
//     id: string | number,
//     field: keyof Education,
//     value: string | number | null,
//   ) => {
//     setEducation((prev) => {
//       const updated = prev.map((exp) =>
//         exp.id === id ? { ...exp, [field]: value } : exp,
//       );
//       debouncedSave(updated);
//       return updated;
//     });
//   };

//   const deleteEducation = (id: string | number) => {
//     setEducation((prev) => {
//       const updated = prev.filter((exp) => exp.id !== id);
//       saveToAPI(updated);
//       return updated;
//     });
//   };

//   const [clickedIndexoFGenerateWithAIBtn, setClickedIndexoFGenerateWithAIBtn] =
//     useState<number | null>(null);

//   const handleSubmitAi = async (index: number) => {
//     setClickedIndexoFGenerateWithAIBtn(index);
//     setLoading(true);
//     setAireseponse(null);

//     try {
//       const formData = {
//         degree: education[index].degree,
//         college: education[index].schoolname,
//         location: education[index].location,
//         year: education[index].endDate,
//       };

//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/resume/education`,
//         formData,
//       );

//       const bullets = response.data.education_bullets
//         .split("\n")
//         .map((item: string) => item.replace("- ", "").trim())
//         .filter(Boolean);

//       setAireseponse(bullets);
//       setShowPopup(true);

//       return true;
//     } catch (err: any) {
//       console.error("Error sending message:", err);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const insertAIResponse = (item: string, index: number) => {
//     if (clickedIndexoFGenerateWithAIBtn === null) return;

//     setEducation((prev) => {
//       const updated = [...prev];
//       updated[clickedIndexoFGenerateWithAIBtn].text =
//         (updated[clickedIndexoFGenerateWithAIBtn].text || "") + "\n" + item;
//       debouncedSave(updated);
//       return updated;
//     });

//     if (Airesponse) {
//       const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
//       setAireseponse(newAiResponse.length > 0 ? newAiResponse : null);
//     }
//   };

//   const [educationTipsClicked, setEducationTipsClicked] = useState(false);

//   return (
//     <section className="relative h-screen overflow-hidden">
//       <div className="py-2 lg:py-3 px-3 md:px-4 lg:px-5 bg-white rounded-xl sm:rounded-2xl shadow-soft h-full flex flex-col">
//         {/* Header Section */}
//         <Stepper />

//         {/* Auto-save indicator */}
//         {isSaving && (
//           <div className="absolute top-20 right-5 z-10 flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-md">
//             <div className="w-3 h-3 border-2 border-gray-300 border-t-[#c40116] rounded-full animate-spin"></div>
//             <span className="text-xs text-gray-600">Saving...</span>
//           </div>
//         )}

//         {/* Education List */}
//         <div className="flex-1 overflow-y-auto pb-5 mt-5">
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
//                     d="M12 14l9-5-9-5-9 5 9 5z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 14l9-5-9-5-9 5 9 5z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 14v6l9-5M12 20l9-5"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 14v6l-9-5M12 20l-9-5"
//                   />
//                 </svg>
//               </div>
//               <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
//                 Education
//               </h1>
//             </div>

//             <div className="flex justify-end me-5">
//               <button
//                 onClick={() => setEducationTipsClicked((prev) => !prev)}
//                 className="flex items-center justify-center xs:justify-start gap-2 bg-linear-to-r from-white to-gray-50/80 border border-gray-200 rounded-xl p-2 text-gray-700 text-xs sm:text-sm font-medium hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 w-fit text-xs sm:text-sm"
//                 type="button"
//               >
//                 <motion.div
//                   animate={{ opacity: [1, 0.4, 1] }}
//                   transition={{
//                     duration: 1,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   <FaRegLightbulb className="text-[#c40116] " />
//                 </motion.div>
//                 <span className="truncate">Education Tips</span>
//                 <motion.div
//                   animate={{ rotate: educationTipsClicked ? 180 : 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="text-gray-500 shrink-0"
//                 >
//                   <IoIosArrowDown />
//                 </motion.div>
//               </button>
//             </div>
//           </div>

//           <p className="text-gray-600 text-xs sm:text-sm font-medium">
//             List your education starting with the most recent degree first.
//           </p>
//                       <div className="space-y-3 sm:space-y-4 pb-8 sm:pb-10">

//           {education?.map((exp: Education, index: number) => (
//             <div
//               key={index}
//               className="bg-[#f3f4f6]/80 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-subtle transition-all duration-300 hover:shadow-md"
//             >
//               {/* Header */}
//               <div
//                 onClick={() => toggleForm(exp.id)}
//                 className="flex justify-between items-center cursor-pointer p-2 sm:p-3 md:p-4 group hover:bg-gray-50/50 transition-all duration-300"
//               >
//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-0.5 sm:mb-1 truncate group-hover:text-[#c40116] transition-colors">
//                     {exp.schoolname || "School Name"}
//                   </h3>
//                   <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] xs:text-xs text-gray-500">
//                     <span className="truncate max-w-30 sm:max-w-none">
//                       {exp.degree || "Degree"}
//                     </span>
//                     <span className="text-gray-300 hidden xs:inline">•</span>
//                     <span className="whitespace-nowrap">
//                       {exp.startDate ? exp.startDate : "YYYY"} -{" "}
//                       {exp.endDate ? exp.endDate : "YYYY"}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 sm:gap-3 ml-2">
//                   <motion.div
//                     animate={{ rotate: exp.isOpen ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="text-gray-400 group-hover:text-[#c40116] transition-colors"
//                   >
//                     <FiChevronDown size={18} className="sm:w-5 sm:h-5" />
//                   </motion.div>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       deleteEducation(exp.id);
//                     }}
//                     className="p-1.5 sm:p-2 rounded-lg bg-linear-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
//                     type="button"
//                   >
//                     <FiTrash2 size={14} className="sm:w-4 sm:h-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* Content */}
//               <div
//                 className={`transition-all duration-500 overflow-hidden ${
//                   exp.isOpen ? "max-h-500 opacity-100" : "max-h-0 opacity-0"
//                 }`}
//               >
//                 <div className="p-2 sm:p-3 md:p-4 space-y-4 sm:space-y-6 border-t border-gray-100">
//                   {/* School Name & Location */}
//                   <div className="flex flex-wrap gap-4 sm:gap-6">
//                     <div className="group grow">
//                       <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                         School Name
//                       </label>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           value={exp.schoolname || ""}
//                           onChange={(e) =>
//                             handleChange(exp.id, "schoolname", e.target.value)
//                           }
//                           placeholder="University Name"
//                           className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                         />
//                       </div>
//                       {exp.error?.schoolname && (
//                         <p className="text-[#c40116] text-[10px] xs:text-xs mt-1.5 sm:mt-2">
//                           {exp.error.schoolname}
//                         </p>
//                       )}
//                     </div>

//                     <div className="group grow">
//                       <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                         Location
//                       </label>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           value={exp.location || ""}
//                           onChange={(e) =>
//                             handleChange(exp.id, "location", e.target.value)
//                           }
//                           placeholder="City, State"
//                           className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                         />
//                       </div>
//                       {exp.error?.location && (
//                         <p className="text-[#c40116] text-[10px] xs:text-xs mt-1.5 sm:mt-2">
//                           {exp.error.location}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Degree & Dates */}
//                   <div className="flex flex-wrap gap-4 sm:gap-6">
//                     <div className="group grow">
//                       <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                         Degree
//                       </label>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           value={exp.degree || ""}
//                           onChange={(e) =>
//                             handleChange(exp.id, "degree", e.target.value)
//                           }
//                           placeholder="B.Sc in Computer Science"
//                           className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                         />
//                       </div>
//                       {exp.error?.degree && (
//                         <p className="text-[#c40116] text-[10px] xs:text-xs mt-1.5 sm:mt-2">
//                           {exp.error.degree}
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex grow gap-3 sm:gap-4">
//                       <div className="group grow">
//                         <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                           Start Year
//                         </label>
//                         <div className="relative ">
//                           <Calendar
//                             value={
//                               exp.startDate
//                                 ? new Date(parseInt(exp.startDate), 0, 1)
//                                 : null
//                             }
//                             onChange={(e) => {
//                               const selectedValue =
//                                 e.value instanceof Date
//                                   ? e.value.getFullYear().toString()
//                                   : "";
//                               handleChange(exp.id, "startDate", selectedValue);
//                             }}
//                             view="year"
//                             dateFormat="yy"
//                             className="w-full sm:p-3 border text-gray-800 text-xs sm:text-sm font-medium rounded-xl bg-white border-gray-200 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 [&_.p-datepicker]:border-gray-200 [&_.p-datepicker]:rounded-xl [&_.p-datepicker]:shadow-lg hover:shadow-md"
//                             placeholder="YYYY"
//                             showIcon
//                             icon={() => (
//                               <svg
//                                 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                                 />
//                               </svg>
//                             )}
//                           />
//                           {exp.error?.startDate && (
//                             <p className="text-[#c40116] text-[10px] xs:text-xs mt-1.5 sm:mt-2">
//                               {exp.error.startDate}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="group grow">
//                         <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                           End Year
//                         </label>
//                         <div className="relative">
//                           <Calendar
//                             value={
//                               exp.endDate
//                                 ? new Date(parseInt(exp.endDate), 0, 1)
//                                 : null
//                             }
//                             onChange={(e) => {
//                               const value =
//                                 e.value instanceof Date
//                                   ? e.value.getFullYear().toString()
//                                   : "";
//                               handleChange(exp.id, "endDate", value);
//                             }}
//                             view="year"
//                             dateFormat="yy"
//                             className="w-full p-2.5 sm:p-3  text-gray-800 text-xs sm:text-sm font-medium rounded-xl bg-white border-gray-200 shadow-subtle focus:outline-none focus:border-[#c40116]  focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 [&_.p-datepicker]:border-gray-200 [&_.p-datepicker]:rounded-xl [&_.p-datepicker]:shadow-lg hover:shadow-md"
//                             placeholder="YYYY"
//                             showIcon
//                             icon={() => (
//                               <svg
//                                 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                                 />
//                               </svg>
//                             )}
//                           />
//                           {exp.error?.endDate && (
//                             <p className="text-[#c40116] text-[10px] xs:text-xs mt-1.5 sm:mt-2">
//                               {exp.error.endDate}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Description with AI */}
//                   <div className="">
//                     <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                       Description
//                     </label>

//                     <div className="flex justify-end">
//                       <div className="relative w-fit group">
//                         <button
//                           onClick={() => handleSubmitAi(index)}
//                           disabled={loading || !exp.degree}
//                           className={` inline-flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 w-fit hover:shadow-md ${
//                             !exp.degree
//                               ? "bg-linear-to-r from-gray-300 text-black to-gray-400 cursor-not-allowed opacity-90"
//                               : "bg-linear-to-r from-[#c40116] to-[#c40116]/60 text-white hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02]"
//                           }`}
//                           type="button"
//                         >
//                           <svg
//                             className="w-3.5 h-3.5 sm:w-4 sm:h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M13 10V3L4 14h7v7l9-11h-7z"
//                             />
//                           </svg>
//                           {loading ? "Generating..." : "Generate with AI"}
//                         </button>

//                         {!exp.degree && !loading && (
//                           <div className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full mt-1 w-48 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 shadow-lg">
//                             <div className="relative text-center">
//                               <span className="inline-block mr-1">⚠️</span>
//                               Enter your degree to use this feature
//                               {/* Tooltip arrow pointing down to button */}
//                               <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-2 h-2 bg-gray-900 rotate-45"></div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <Editor
//                       className="rounded-lg mt-3 md:mt-4 lg:mt-5 bg-white"
//                       value={exp.text || ""}
//                       headerTemplate={
//                         <div className="flex gap-1 p-2  flex-wrap items-center bg-gray-50">
//                           {/* Text formatting */}
//                           <button
//                             type="button"
//                             className="ql-bold p-2 hover:bg-gray-200 rounded transition-colors duration-200"
//                             aria-label="Bold"
//                             title="Bold"
//                           >
//                             <span className="font-bold">B</span>
//                           </button>

//                           <button
//                             type="button"
//                             className="ql-italic p-2 hover:bg-gray-200 rounded transition-colors duration-200"
//                             aria-label="Italic"
//                             title="Italic"
//                           >
//                             <span className="italic">I</span>
//                           </button>

//                           <button
//                             type="button"
//                             className="ql-underline p-2 hover:bg-gray-200 rounded transition-colors duration-200"
//                             aria-label="Underline"
//                             title="Underline"
//                           >
//                             <span className="underline">U</span>
//                           </button>

//                           {/* Lists */}
//                           <button
//                             type="button"
//                             className="ql-list p-2 hover:bg-gray-200 rounded transition-colors duration-200"
//                             value="ordered"
//                             aria-label="Numbered List"
//                             title="Numbered List"
//                           >
//                             <span>1.</span>
//                           </button>

//                           <button
//                             type="button"
//                             className="ql-list p-2 hover:bg-gray-200 rounded transition-colors duration-200"
//                             value="bullet"
//                             aria-label="Bullet List"
//                             title="Bullet List"
//                           >
//                             <span>•</span>
//                           </button>

//                           {/* Clean formatting */}
//                           <button
//                             type="button"
//                             className="ql-clean p-2 hover:bg-gray-200 rounded transition-colors duration-200"
//                             aria-label="Clear Formatting"
//                             title="Clear Formatting"
//                           >
//                             <span>⌫</span>
//                           </button>
//                         </div>
//                       }
//                       onTextChange={(e: any) => {
//                         handleChange(exp.id, "text", e.htmlValue);
//                         // Trigger blur-like behavior after typing stops
//                         if (saveTimeoutRef.current) {
//                           clearTimeout(saveTimeoutRef.current);
//                         }
//                       }}
//                       style={{
//                         height: "120px",
//                         minHeight: "120px",
//                         background: "white",
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//           </div>

//           {/* Add Education Button */}
//           <button
//             onClick={addEducation}
//             className="w-full py-3 sm:py-3.5 bg-linear-to-br from-gray-50 to-white border-2 border-dashed border-gray-200 rounded-xl hover:border-[#c40116] hover:bg-[#c40116]/5 text-gray-600 hover:text-[#c40116] transition-all duration-300 group"
//             type="button"
//           >
//             <div className="flex items-center justify-center gap-2">
//               <div className="p-1 sm:p-1.5 bg-gray-100 rounded-lg group-hover:bg-[#c40116]/10 transition-colors">
//                 <IoMdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
//               </div>
//               <span className="text-xs sm:text-sm font-semibold">
//                 Add Education
//               </span>
//             </div>
//           </button>
//         </div>

//         <div className="shrink-0  pt-2  lg:pt-3">
//           <div className="flex justify-between">
//             <button
//               className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
//               onClick={() => router.push("/resume-details/experience")}
//             >
//               Back
//             </button>

//             <button
//               className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold transition-colors duration-300 cursor-pointer"
//               onClick={() => {
//                 if (saveTimeoutRef.current) {
//                   clearTimeout(saveTimeoutRef.current);
//                 }
//                 saveToAPI(education).then(() => {
//                   router.push("/resume-details/skills");
//                 });
//               }}
//             >
//               Next Skills
//             </button>
//           </div>
//         </div>

//         {/* Education Tips Modal */}
//         {educationTipsClicked && (
//           <AnimatePresence>
//             <div className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden p-4">
//               <div
//                 className="absolute inset-0 backdrop-blur-sm"
//                 onClick={() => setEducationTipsClicked(false)}
//               />
//               <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:w-[30vw] h-auto max-h-[80vh] mt-8 sm:mt-20">
//                 <motion.div
//                   initial={{ y: 50, opacity: 0, scale: 0.95 }}
//                   animate={{ y: 0, opacity: 1, scale: 1 }}
//                   exit={{ y: 50, opacity: 0, scale: 0.95 }}
//                   transition={{
//                     type: "spring",
//                     stiffness: 120,
//                     damping: 18,
//                     duration: 0.4,
//                   }}
//                   className="w-full rounded-xl sm:rounded-2xl bg-white border border-gray-200 shadow-2xl max-h-[inherit] overflow-hidden"
//                 >
//                   <div className="flex justify-between items-center p-4 sm:p-6">
//                     <div className="flex items-center gap-2 sm:gap-3">
//                       <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//                         <FaRegLightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
//                       </div>
//                       <h3 className="text-base sm:text-lg font-semibold text-gray-800">
//                         Education Tips
//                       </h3>
//                     </div>
//                     <button
//                       onClick={() => setEducationTipsClicked(false)}
//                       className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
//                       type="button"
//                     >
//                       <FiX size={18} className="sm:w-5 sm:h-5" />
//                     </button>
//                   </div>
//                   <hr className="border-gray-100" />

//                   <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(80vh-100px)]">
//                     {/* Positive tips */}
//                     <div className="space-y-3 sm:space-y-4">
//                       <h4 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
//                         Best Practices
//                       </h4>
//                       {[
//                         {
//                           title: "List your most recent education first",
//                           desc: "Use reverse-chronological order.",
//                         },
//                         {
//                           title: "Spell out acronyms",
//                           desc: "Write 'Bachelor of Science (B.S.)' to ensure clarity.",
//                         },
//                         {
//                           title: "Include incomplete education if relevant",
//                           desc: "It's okay to list ongoing or unfinished degrees.",
//                         },
//                         {
//                           title: "Show your impact",
//                           desc: "Highlight your accomplishments, not generic duties.",
//                         },
//                         {
//                           title:
//                             "Include GPA if it's strong (usually 3.5 or higher)",
//                           desc: "Only if requested or relevant to the role.",
//                         },
//                       ].map((tip, idx) => (
//                         <div
//                           key={idx}
//                           className="flex items-start gap-2 sm:gap-3"
//                         >
//                           <div className="shrink-0 mt-0.5">
//                             <div className="p-1 sm:p-1.5 bg-emerald-100 rounded-lg">
//                               <FiCheckCircle className="text-emerald-500 w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                             </div>
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-xs sm:text-sm font-semibold text-gray-800">
//                               {tip.title}
//                             </p>
//                             <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
//                               {tip.desc}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Negative tips */}
//                     <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-gray-100">
//                       <h4 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
//                         Avoid These
//                       </h4>
//                       {[
//                         {
//                           title: "Don't abbreviate job titles",
//                           desc: "Write the full job title so it's easy to understand.",
//                         },
//                         {
//                           title: "Don't use 'I' or full sentences",
//                           desc: "Keep bullet points short, starting with action verbs.",
//                         },
//                         {
//                           title: "Don't exaggerate or lie",
//                           desc: "False claims can backfire during interviews.",
//                         },
//                       ].map((tip, idx) => (
//                         <div
//                           key={idx}
//                           className="flex items-start gap-2 sm:gap-3"
//                         >
//                           <div className="shrink-0 mt-0.5">
//                             <div className="p-1 sm:p-1.5 bg-[#c40116]/10 rounded-lg">
//                               <FiXCircle className="text-[#c40116] w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                             </div>
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-xs sm:text-sm font-semibold text-gray-800">
//                               {tip.title}
//                             </p>
//                             <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
//                               {tip.desc}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </AnimatePresence>
//         )}

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
//                     className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
//                     type="button"
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
//                       <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg group-hover:from-[#c40116]/20 group-hover:to-[#be0117]/20 transition-all shrink-0">
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
//       </div>
//     </section>
//   );
// };

// export default Education_form;

"use client";

// @ts-ignore
import "primereact/resources/themes/saga-blue/theme.css";
// @ts-ignore
import "primereact/resources/primereact.min.css";
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  FiChevronDown,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiX,
  FiShield,
} from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import dynamic from "next/dynamic";
import { Calendar } from "primereact/calendar";

import { CreateContext } from "@/app/context/CreateContext";
import { FaRegLightbulb, FaStar, FaGem } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Education } from "@/app/types/context.types";
import {
  formatGradeToCgpdAndPercentage,
  getLocalStorage,
  setLocalStorage,
} from "@/app/utils";
import { API_URL } from "@/app/config/api";
import {
  IoArrowForward,
  IoClose,
  IoDiamondOutline,
  IoSparkles,
} from "react-icons/io5";
import { Stepper, TipsModal } from "@/app/components/resume";

// Dynamically import Editor to avoid SSR issues
const Editor = dynamic(
  () => import("primereact/editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl mt-3 md:mt-4 bg-gray-50 h-32 flex items-center justify-center border border-gray-200">
        <div className="animate-pulse text-gray-400 text-sm">
          Loading editor...
        </div>
      </div>
    ),
  },
);

const Education_form = () => {
  const UseContext = useContext(CreateContext);
  const contactId = UseContext?.contact._id || UseContext?.contact.contactId;

  const { fullResumeData, setFullResumeData } = UseContext || {};

  const router = useRouter();
  const { education, setEducation } = UseContext || {
    education: [],
    setEducation: () => {},
  };

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Airesponse, setAireseponse] = useState<string[] | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedData, setLastSavedData] = useState<string>("");
  const [showDegreeWarningModal, setShowDegreeWarningModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const addEducation = () => {
    setEducation((prev) => {
      const updated = [
        ...prev,
        {
          _id: Date.now(),
          schoolname: "",
          degree: "",
          location: "",
          text: "",
          startDate: "",
          endDate: "",
          isOpen: true,
          showPicker: false,
          year: new Date().getFullYear(),
          error: {},
          isCurrentlyStudying: false,
          grade: "",
        },
      ];
      return updated;
    });
  };

  const saveToAPI = async (educationData: typeof education) => {
    if (!contactId) {
      console.error("Contact ID is required");
      return false;
    }

    const currentDataString = JSON.stringify(educationData);
    if (currentDataString === lastSavedData) {
      return true;
    }

    setIsSaving(true);

    try {
      const formData = {
        education: educationData,
      };

      const response = await axios.post(
        `${API_URL}/api/education/update`,
        formData,
        { params: { contactId: contactId } },
      );

      return true;
    } catch (err: any) {
      console.error("Error saving education:", err);
      toast.error("Failed to save education!");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const fetched = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/education/get-education/${contactId}`,
      );

      const educationList = response.data?.[0]?.education || [];

      if (educationList.length > 0) {
        const formattedData = educationList.map((item: any) => ({
          id: item._id || Date.now(),
          schoolname: item?.schoolname || "",
          degree: item?.degree || "",
          location: item?.location || "",
          startDate: item?.startDate || null,
          endDate: item?.endDate || null,
          text: item?.text || "",
          isOpen: true,
          touched: {},
          showPicker: false,
          year: item.startDate
            ? new Date(item.startDate).getFullYear()
            : new Date().getFullYear(),
          error: {},
          isCurrentlyStudying: item?.isCurrentlyStudying || false,
          grade: item?.grade || "",
        }));

        setEducation(formattedData);
        setLastSavedData(JSON.stringify(formattedData));
      } else {
        console.log("No education data found for user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleForm = (id: string | number) => {
    setEducation((prev) =>
      prev.map((exp) =>
        exp._id === id ? { ...exp, isOpen: !exp.isOpen } : exp,
      ),
    );
  };

  const handleChange = (
    id: string | number,
    field: keyof Education,
    value: string | number | null | boolean,
  ) => {
    setEducation((prev) => {
      const updated = prev.map((exp) =>
        exp._id === id ? { ...exp, [field]: value } : exp,
      );
      return updated;
    });
  };

  const deleteEducation = (id: string | number) => {
    setEducation((prev) => {
      const updated = prev.filter((exp) => exp._id !== id);
      return updated;
    });
  };

  const [clickedIndexoFGenerateWithAIBtn, setClickedIndexoFGenerateWithAIBtn] =
    useState<number | null>(null);

  const handleSubmitAi = async (index: number) => {
    const edu = education[index];

    if (!edu.degree || edu.degree.trim() === "") {
      if (isMobile) {
        setShowDegreeWarningModal(true);
        setClickedIndexoFGenerateWithAIBtn(index);
      }
      return;
    }

    setClickedIndexoFGenerateWithAIBtn(index);
    setLoading(true);
    setAireseponse(null);

    try {
      const formData = {
        degree: edu.degree,
        college: edu.schoolname,
        location: edu.location,
        year: edu.endDate,
      };

      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/resume/education`,
        formData,
      );

      const bullets = response.data.education_bullets
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

    // 1. Calculate the new state outside of the setter
    const updatedEducation = education.map((edu, i) => {
      if (i === clickedIndexoFGenerateWithAIBtn) {
        return {
          ...edu,
          text: (edu.text || "") + "\n" + item,
        };
      }
      return edu;
    });
    setEducation(updatedEducation);
    if (Airesponse) {
      const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
      setAireseponse(newAiResponse.length > 0 ? newAiResponse : null);
    }
  };

  const [educationTipsClicked, setEducationTipsClicked] = useState(false);


  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50/40">
      {/* Sticky Stepper */}
      {/* <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <Stepper />
      </div> */}
      <Stepper/>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className=" mx-auto px-2   py-6 sm:py-8 lg:py-10">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Education
            </h1>

            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Showcase your academic background and qualifications
            </p>

            <button
              onClick={() => setEducationTipsClicked((prev) => !prev)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <FaRegLightbulb className="w-3 h-3" />
              <span>Education Tips</span>
            </button>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="relative px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-linear-to-r from-indigo-50 to-white border-b border-gray-100">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-100 rounded-full filter blur-3xl opacity-50"></div>
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-xl">
                    <IoDiamondOutline className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                      Academic Background
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Tell employers about your education
                    </p>
                  </div>
                </div>
                {isSaving && (
                  <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full self-start sm:self-auto">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] sm:text-xs text-indigo-700 font-medium">
                      Saving...
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="space-y-4 sm:space-y-5">
                {education?.map((exp: Education, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* Header */}
                    <div
                      onClick={() => toggleForm(exp._id)}
                      className="flex justify-between items-center cursor-pointer p-4 sm:p-5 group hover:bg-gray-50/50 transition-all duration-300"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-0.5 sm:mb-1 truncate group-hover:text-indigo-600 transition-colors">
                          {exp.schoolname || "School Name"}
                        </h3>
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] xs:text-xs text-gray-500">
                          <span className="truncate max-w-30 sm:max-w-none">
                            {exp.degree || "Degree"}
                          </span>
                          <span className="text-gray-300 hidden xs:inline">
                            •
                          </span>
                          <span className="whitespace-nowrap">
                            {exp.startDate ? exp.startDate : "YYYY"} -{" "}
                            {exp.isCurrentlyStudying ? (
                              <span className="text-emerald-600 font-medium">
                                Present
                              </span>
                            ) : exp.endDate ? (
                              exp.endDate
                            ) : (
                              "YYYY"
                            )}
                          </span>
                          {exp.grade && (
                            <>
                              <span className="text-gray-300 hidden xs:inline">
                                •
                              </span>
                              <span className="text-indigo-600 font-medium">
                                {formatGradeToCgpdAndPercentage(exp.grade)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 ml-2">
                        <motion.div
                          animate={{ rotate: exp.isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-1.5 sm:p-2 rounded-lg text-gray-400 group-hover:text-indigo-600 cursor-pointer"
                        >
                          <FiChevronDown size={14} className="sm:w-5 sm:h-5" />
                        </motion.div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteEducation(exp._id);
                          }}
                          className="p-1.5 sm:p-2 rounded-lg bg-gray-100 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer"
                          type="button"
                        >
                          <FiTrash2 size={14} className="sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`transition-all duration-500 overflow-hidden ${
                        exp.isOpen
                          ? "max-h-250 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="p-4 sm:p-5 space-y-4 sm:space-y-5 border-t border-gray-100">
                        {/* School Name & Location */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                              School Name
                            </label>
                            <input
                              type="text"
                              value={exp.schoolname || ""}
                              onChange={(e) =>
                                handleChange(
                                  exp._id,
                                  "schoolname",
                                  e.target.value,
                                )
                              }
                              placeholder="University Name"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                              Location
                            </label>
                            <input
                              type="text"
                              value={exp.location || ""}
                              onChange={(e) =>
                                handleChange(
                                  exp._id,
                                  "location",
                                  e.target.value,
                                )
                              }
                              placeholder="City, State"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                            />
                          </div>
                        </div>

                        {/* Degree & Dates */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                              Degree
                            </label>
                            <input
                              type="text"
                              value={exp.degree || ""}
                              onChange={(e) =>
                                handleChange(exp._id, "degree", e.target.value)
                              }
                              placeholder="B.Sc in Computer Science"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                              CGPA / Percentage{" "}
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              max="100"
                              value={exp.grade || ""}
                              onChange={(e) => {
                                let value = e.target.value;
                                if (parseFloat(value) > 100) value = "100";
                                if (parseFloat(value) < 0) value = "0";
                                handleChange(exp._id, "grade", value);
                              }}
                              placeholder="Enter CGPA  or Percentage"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                            />
                          </div>
                        </div>

                        {/* CGPA/Percentage Field */}

                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                              Start Year
                            </label>
                            <Calendar
                              value={
                                exp.startDate
                                  ? new Date(parseInt(exp.startDate), 0, 1)
                                  : null
                              }
                              onChange={(e) => {
                                const selectedValue =
                                  e.value instanceof Date
                                    ? e.value.getFullYear().toString()
                                    : "";
                                handleChange(
                                  exp._id,
                                  "startDate",
                                  selectedValue,
                                );
                              }}
                              view="year"
                              dateFormat="yy"
                              className="w-full [&_.p-inputtext]:w-full [&_.p-inputtext]:px-3 [&_.p-inputtext]:py-2.5 [&_.p-inputtext]:bg-white [&_.p-inputtext]:border-2 [&_.p-inputtext]:border-gray-200 [&_.p-inputtext]:rounded-lg [&_.p-inputtext]:text-gray-900 [&_.p-inputtext]:text-sm [&_.p-inputtext]:focus:border-indigo-500 [&_.p-inputtext]:focus:ring-2 [&_.p-inputtext]:focus:ring-indigo-100 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                              placeholder="YYYY"
                              showIcon
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                              End Year
                            </label>
                            <Calendar
                              value={
                                exp.endDate && !exp.isCurrentlyStudying
                                  ? new Date(parseInt(exp.endDate), 0, 1)
                                  : null
                              }
                              onChange={(e) => {
                                const value =
                                  e.value instanceof Date
                                    ? e.value.getFullYear().toString()
                                    : "";
                                handleChange(exp._id, "endDate", value);
                              }}
                              view="year"
                              dateFormat="yy"
                              disabled={exp.isCurrentlyStudying}
                              className={` w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all [&_.p-inputtext]:w-full [&_.p-inputtext]:px-3 [&_.p-inputtext]:py-2.5 [&_.p-inputtext]:border-2 [&_.p-inputtext]:rounded-lg [&_.p-inputtext]:text-sm ${
                                exp.isCurrentlyStudying
                                  ? "[&_.p-inputtext]:bg-gray-50 [&_.p-inputtext]:text-gray-400 [&_.p-inputtext]:border-gray-200 cursor-not-allowed"
                                  : "[&_.p-inputtext]:bg-white [&_.p-inputtext]:border-gray-200 [&_.p-inputtext]:text-gray-900 [&_.p-inputtext]:focus:border-indigo-500 [&_.p-inputtext]:focus:ring-2 [&_.p-inputtext]:focus:ring-indigo-100"
                              }`}
                              placeholder={
                                exp.isCurrentlyStudying ? "Present" : "YYYY"
                              }
                              showIcon
                            />
                          </div>
                        </div>

                        {/* Currently Studying Checkbox */}
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`currently-studying-${exp._id}`}
                            checked={exp.isCurrentlyStudying || false}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              handleChange(
                                exp._id,
                                "isCurrentlyStudying",
                                isChecked,
                              );
                              if (isChecked) {
                                handleChange(exp._id, "endDate", "");
                              }
                            }}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                          />
                          <label
                            htmlFor={`currently-studying-${exp._id}`}
                            className="text-sm text-gray-700 cursor-pointer hover:text-indigo-600 transition-colors"
                          >
                            I am currently studying here
                          </label>
                        </div>

                        {/* Description with AI Button */}
                        <div>
                          <div className="flex justify-between items-center mb-2 sm:mb-3">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                              Description
                            </label>
                            <div className="relative inline-block group">
                              <button
                                onClick={() => handleSubmitAi(index)}
                                disabled={loading}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                                  !exp.degree || exp.degree.trim() === ""
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-linear-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-md"
                                }`}
                                type="button"
                              >
                                <svg
                                  className={`w-3 h-3 transition-all duration-300 ${loading ? "animate-spin" : ""}`}
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
                                {loading ? "Generating..." : "Generate With AI"}
                              </button>

                              {/* Tooltip - Desktop only */}
                              {(!exp.degree || exp.degree.trim() === "") &&
                                !loading &&
                                !isMobile && (
                                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-100 shadow-lg whitespace-normal">
                                    <div className="relative text-center">
                                      <span className="inline-block mr-1">
                                        ⚠️
                                      </span>
                                      Enter degree to use AI Assist
                                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-2 h-2 bg-gray-900 rotate-45"></div>
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>

                          <Editor
                            className="rounded-lg bg-white border border-gray-200 overflow-hidden"
                            value={exp.text || ""}
                            headerTemplate={
                              <div className="flex gap-1 p-2 flex-wrap items-center bg-gray-50 border-b border-gray-200">
                                <button
                                  type="button"
                                  className="ql-bold p-1.5 hover:bg-gray-200 rounded transition"
                                >
                                  B
                                </button>
                                <button
                                  type="button"
                                  className="ql-italic p-1.5 hover:bg-gray-200 rounded transition"
                                >
                                  I
                                </button>
                                <button
                                  type="button"
                                  className="ql-underline p-1.5 hover:bg-gray-200 rounded transition"
                                >
                                  U
                                </button>
                                <button
                                  type="button"
                                  className="ql-list p-1.5 hover:bg-gray-200 rounded transition"
                                  value="ordered"
                                >
                                  1.
                                </button>
                                <button
                                  type="button"
                                  className="ql-list p-1.5 hover:bg-gray-200 rounded transition"
                                  value="bullet"
                                >
                                  •
                                </button>
                                <button
                                  type="button"
                                  className="ql-clean p-1.5 hover:bg-gray-200 rounded transition"
                                >
                                  ⌫
                                </button>
                              </div>
                            }
                            onTextChange={(e: any) => {
                              handleChange(exp._id, "text", e.htmlValue);
                            }}
                            style={{
                              height: "140px",
                              minHeight: "140px",
                              background: "white",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Education Button */}
                <button
                  onClick={addEducation}
                  className="w-full py-3 sm:py-3.5 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-all duration-300 group cursor-pointer"
                  type="button"
                >
                  <div className="flex items-center justify-center gap-2">
                    <IoMdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm font-semibold">
                      Add Education
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Buttons */}
      <div className="sticky bottom-0 z-20 bg-white/80 backdrop-blur-md border-t border-gray-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 ">
          <div className="flex justify-between items-center gap-3">
            <button
              className="text-xs sm:text-sm font-medium text-gray-500 hover:text-indigo-600 transition flex items-center gap-1 cursor-pointer"
              onClick={() => router.push("/resume-details/experience")}
            >
              ← Back to Experience
            </button>
            <button
              className="px-4 sm:px-6 py-2 sm:py-2.5  bg-linear-to-r from-indigo-600 to-indigo-500 text-white t font-medium rounded-lg sm:rounded-xl shadow-md transition-all hover:shadow-indigo-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
              onClick={() => {
                saveToAPI(education).then(() => {
                  router.push("/resume-details/skills");
                });
              }}
            >
              <span>Continue to Skills</span>
              <IoArrowForward className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      <TipsModal
        isOpen={educationTipsClicked}
        onClose={() => setEducationTipsClicked(false)}
        title="Education Tips"
        subtitle="Showcase your academic background"
        hasAI={true}
        aiFeatureDescription="get intelligent bullet points for your coursework and achievements."
        proTip="Put your highest degree first — recruiters scan top to bottom"
        bestPractices={[
          {
            tip: "Put your highest degree first",
            example: "MBA at top, then Bachelor's",
          },
          {
            tip: "Include relevant coursework",
            example: "Data Structures, Algorithms",
          },
          { tip: "Add CGPA (8.0+) or Percentage", example: "CGPA: 8.5/10" },
        ]}
        avoidList={[
          "Listing incomplete degrees",
          "Adding unnecessary high school details",
        ]}
      />

      {/* AI Response Popup */}
      {showPopup && Airesponse && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
          >
            <div className="bg-linear-to-r from-indigo-600 to-indigo-500 px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    AI Suggestions
                  </h2>
                  <p className="text-indigo-100 text-xs">
                    Click on any suggestion to add it
                  </p>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <IoClose className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3">
              {Airesponse?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => insertAIResponse(item, index)}
                  className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer group transition-all duration-200"
                >
                  <div className="p-1.5 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-all shrink-0">
                    <BsArrowLeftCircleFill className="w-4 h-4 text-indigo-600" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed flex-1">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Degree Warning Modal for Mobile */}
      {showDegreeWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 backdrop-blur-md bg-black/50"
            onClick={() => setShowDegreeWarningModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-linear-to-r from-amber-500 to-orange-500 px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Degree Required
                </h3>
              </div>
            </div>

            <div className="p-5">
              <p className="text-sm text-gray-700 mb-4">
                Please enter your degree first to use the AI Assist feature.
                This helps generate relevant content for your education.
              </p>
              <button
                onClick={() => setShowDegreeWarningModal(false)}
                className="w-full px-4 py-2.5 bg-linear-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Education_form;
