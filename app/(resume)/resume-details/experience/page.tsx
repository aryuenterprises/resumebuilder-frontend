// "use client";
// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useContext,
//   useCallback,
// } from "react";
// import dynamic from "next/dynamic";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//   MonthYearDisplay,
//   removeSessionStorage,
//   setSessionStorage,
// } from "@/app/utils";

// import { IoMdAdd, IoIosArrowDown } from "react-icons/io";
// import {
//   FiCheckCircle,
//   FiChevronDown,
//   FiTrash2,
//   FiX,
//   FiXCircle,
// } from "react-icons/fi";
// import { FaRegLightbulb } from "react-icons/fa";
// import { BsArrowLeftCircleFill } from "react-icons/bs";

// import { CreateContext } from "@/app/context/CreateContext";
// import { useRouter } from "next/navigation";
// import { Experience } from "@/app/types";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { User } from "@/app/types/user.types";
// import { API_URL } from "@/app/config/api";
// import { Stepper } from "@/app/components/resume";

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

// const ExperienceForm = () => {
//   const router = useRouter();
//   const userDetails = getLocalStorage<User>("user_details");
//   const UseContext = useContext(CreateContext);
//   // const contactId = UseContext.contact._id;
//   const contactId = UseContext?.contact._id || UseContext?.contact.contactId;

//   const [isExperienced, setIsExperienced] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const [lastSavedData, setLastSavedData] = useState<string>("");
//   // setSessionStorage("oldRouteNameDashboard", "old");
//   removeSessionStorage("oldRouteNameDashboard");

//   const { experiences, setExperiences, fullResumeData, setFullResumeData } =
//     UseContext;

//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const initialLoadDone = useRef(false);

//   // Save to localStorage whenever experiences change
//   useEffect(() => {
//     if (!initialLoadDone.current) return;

//     if (fullResumeData) {
//       const updatedFullData = {
//         ...fullResumeData,
//         experiences: experiences,
//       };
//       setFullResumeData(updatedFullData);
//       setLocalStorage("fullResumeData", updatedFullData);
//     }
//   }, [experiences]);

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

//   // useEffect(() => {
//   //   if (contactId && userDetails) {
//   //     fetchExp();
//   //   }
//   // }, [contactId]);

//   const fetchExp = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/experience/get-experience/${contactId}`,
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
//         setLastSavedData(JSON.stringify(formattedData));
//       } else {
//         console.error("No experience data found for user");
//       }

//       initialLoadDone.current = true;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const saveToAPI = async (experiencesData: typeof experiences) => {
//     if (!contactId) {
//       console.error("Contact ID is required");
//       return false;
//     }

//     // Check if data has changed from last saved
//     const currentDataString = JSON.stringify(experiencesData);
//     if (currentDataString === lastSavedData) {
//       return true; // No changes to save
//     }

//     setIsSaving(true);

//     try {
//       const formData = {
//         experiences: experiencesData,
//       };

//       const response = await axios.post(
//         `${API_URL}/api/experience/update`,
//         formData,
//         { params: { contactId: contactId } },
//       );

//       setLastSavedData(currentDataString);
//       fetchExp();
//       return true;
//     } catch (err: any) {
//       console.error("Error saving experience:", err);
//       toast.error("Failed to save experience!");
//       return false;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // Debounced save function
//   const debouncedSave = useCallback(
//     (experiencesData: typeof experiences) => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//       saveTimeoutRef.current = setTimeout(() => {
//         // saveToAPI(experiencesData);
//       }, 1000);
//     },
//     [contactId, lastSavedData],
//   );

//   const toggleExperienceMode = () => {
//     const newValue = !isExperienced;

//     setIsExperienced(newValue);

//     if (!newValue) {
//       setExperiences([]);
//       debouncedSave([]);
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
//     setExperiences((prev) => {
//       const updated = prev.map((exp) =>
//         exp.id === id ? { ...exp, [field]: value } : exp,
//       );
//       debouncedSave(updated);
//       return updated;
//     });
//   };

//   const deleteExperience = (id: string | number) => {
//     setExperiences((prev) => {
//       const updated = prev.filter((exp) => exp.id !== id);
//       saveToAPI(updated);
//       return updated;
//     });
//   };

//   // Cleanup timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//     };
//   }, []);

//   const [experienceTipsButtonClicked, setExperienceTipsButtonClicked] =
//     useState(false);
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
//       console.error("Error sending message:", err);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const insertAIResponse = (item: string, index: number) => {
//     if (clickedIndexoFGenerateWithAIBtn === null) return;

//     setExperiences((prev) => {
//       const updated = [...prev];
//       updated[clickedIndexoFGenerateWithAIBtn].text =
//         (updated[clickedIndexoFGenerateWithAIBtn].text || "") + "\n" + item;
//       // debouncedSave(updated);
//       return updated;
//     });

//     if (Airesponse) {
//       const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
//       setAireseponse(newAiResponse.length > 0 ? newAiResponse : null);
//     }
//   };

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

//         {/* Scrollable Main Content */}
//         <div className="flex-1 overflow-y-auto pb-5 mt-5">
//           <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 mb-3">
//             {/* // ─── header ─────────────────────────────────────────────── */}
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

//             {/* // ─── Experience Tips Button ─────────────────────────────────────────────── */}
//             <div className="flex justify-end me-5">
//               <button
//                 onClick={() => setExperienceTipsButtonClicked((prev) => !prev)}
//                 className="flex items-center justify-center xs:justify-start gap-2 bg-linear-to-r from-white to-gray-50/80 border border-gray-200 rounded-xl p-2 text-xs sm:text-sm text-gray-700 text-xs sm:text-sm font-medium hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 w-fit cursor-pointer"
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
//                   key={index}
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
//                             value={exp.endDate || "present"}
//                             shortYear={true}
//                           />
//                         </span>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2 sm:gap-3 ml-2">
//                       <motion.div
//                         animate={{ rotate: exp.isOpen ? 180 : 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="p-1.5 sm:p-2 rounded-lg text-gray-700 group-hover:text-[#c40116] cursor-pointer hover:shadow-lg hover:shadow-black/20 transition-all duration-200 "
//                       >
//                         <FiChevronDown size={14} className="sm:w-5 sm:h-5" />
//                       </motion.div>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteExperience(exp.id);
//                         }}
//                         className="p-1.5 sm:p-2 rounded-lg bg-linear-to-r from-gray-100 to-gray-50 text-[#c40116] hover:shadow-lg hover:shadow-black/20 transition-all duration-200 cursor-pointer"
//                         type="button"
//                       >
//                         <FiTrash2 size={14} className="sm:w-5 sm:h-5" />
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
//                               value={exp.jobTitle || ""}
//                               onChange={(e) =>
//                                 handleChange(exp.id, "jobTitle", e.target.value)
//                               }
//                               placeholder="Enter your job title"
//                               className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                             />
//                           </div>
//                         </div>

//                         <div className="group">
//                           <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                             Company name{" "}
//                           </label>
//                           <div className="relative">
//                             <input
//                               type="text"
//                               value={exp.employer || ""}
//                               onChange={(e) =>
//                                 handleChange(exp.id, "employer", e.target.value)
//                               }
//                               placeholder="Company name"
//                               className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Location & Dates */}
//                       <div className="grid grid-cols-1 gap-4 sm:gap-6">
//                         <div className="group">
//                           <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                             Location
//                           </label>
//                           <div className="relative">
//                             <input
//                               type="text"
//                               value={exp.location || ""}
//                               onChange={(e) =>
//                                 handleChange(exp.id, "location", e.target.value)
//                               }
//                               placeholder="City, State or Remote"
//                               className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
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
//                               value={exp.startDate || ""}
//                               onChange={(e) =>
//                                 handleChange(
//                                   exp.id,
//                                   "startDate",
//                                   e.target.value,
//                                 )
//                               }
//                               className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                             />
//                           </div>

//                           <div className="relative group">
//                             <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                               End Date
//                             </label>
//                             <input
//                               type="month"
//                               value={exp.endDate || ""}
//                               onChange={(e) =>
//                                 handleChange(exp.id, "endDate", e.target.value)
//                               }
//                               className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 "
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="">
//                         <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-primary-600 transition-colors">
//                           Description
//                         </label>

//                         <div className="flex justify-end">
//                           <div className="relative inline-block group">
//                             <button
//                               onClick={() => handleSubmitAi(index)}
//                               disabled={loading || !exp.jobTitle}
//                               className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg  text-xs sm:text-sm font-medium transition-all duration-300 w-fit ${
//                                 !exp.jobTitle
//                                   ? "bg-linear-to-r from-gray-300 text-black to-gray-400 cursor-not-allowed opacity-90"
//                                   : "bg-linear-to-r from-[#c40116] to-[#c40116]/60 hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] text-white cursor-pointer"
//                               }`}
//                               type="button"
//                             >
//                               {/* AI Icon with animation */}
//                               <svg
//                                 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 ${
//                                   loading
//                                     ? "animate-spin"
//                                     : "group-hover:rotate-12"
//                                 }`}
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

//                               {loading ? (
//                                 <div className="flex items-center gap-1.5">
//                                   <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                                   <span>Generating...</span>
//                                 </div>
//                               ) : (
//                                 <span>Generate with AI</span>
//                               )}
//                             </button>

//                             {/* Tooltip - Now properly positioned as a sibling of the button with group class */}
//                             {!exp.jobTitle && !loading && (
//                               <div className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full mt-1 w-48 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 shadow-lg">
//                                 <div className="relative text-center">
//                                   <span className="inline-block mr-1">⚠️</span>
//                                   Enter your job title to use this feature
//                                   {/* Tooltip arrow pointing down to button */}
//                                   <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-2 h-2 bg-gray-900 rotate-45"></div>
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         <Editor
//                           className="rounded-lg mt-3 md:mt-4 lg:mt-5 bg-white"
//                           value={exp.text || ""}
//                           headerTemplate={
//                             <div className="flex gap-1 p-2 flex-wrap items-center bg-gray-50">
//                               <button
//                                 type="button"
//                                 className="ql-bold p-2 hover:bg-gray-200 rounded transition-colors duration-200"
//                                 aria-label="Bold"
//                                 title="Bold"
//                               >
//                                 <span className="font-bold">B</span>
//                               </button>
//                               <button
//                                 type="button"
//                                 className="ql-italic p-2 hover:bg-gray-200 rounded transition-colors duration-200"
//                                 aria-label="Italic"
//                                 title="Italic"
//                               >
//                                 <span className="italic">I</span>
//                               </button>
//                               <button
//                                 type="button"
//                                 className="ql-underline p-2 hover:bg-gray-200 rounded transition-colors duration-200"
//                                 aria-label="Underline"
//                                 title="Underline"
//                               >
//                                 <span className="underline">U</span>
//                               </button>
//                               <button
//                                 type="button"
//                                 className="ql-list p-2 hover:bg-gray-200 rounded transition-colors duration-200"
//                                 value="ordered"
//                                 aria-label="Numbered List"
//                                 title="Numbered List"
//                               >
//                                 <span>1.</span>
//                               </button>
//                               <button
//                                 type="button"
//                                 className="ql-list p-2 hover:bg-gray-200 rounded transition-colors duration-200"
//                                 value="bullet"
//                                 aria-label="Bullet List"
//                                 title="Bullet List"
//                               >
//                                 <span>•</span>
//                               </button>
//                               <button
//                                 type="button"
//                                 className="ql-clean p-2 hover:bg-gray-200 rounded transition-colors duration-200"
//                                 aria-label="Clear Formatting"
//                                 title="Clear Formatting"
//                               >
//                                 <span>⌫</span>
//                               </button>
//                             </div>
//                           }
//                           onTextChange={(e: any) => {
//                             handleChange(exp.id, "text", e.htmlValue);
//                           }}
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
//                 className="w-full py-3 sm:py-3.5 bg-linear-to-br from-gray-50 to-white border-2 border-dashed border-gray-200 rounded-xl hover:border-[#c40116] hover:bg-[#c40116]/5 text-gray-600 hover:text-[#c40116] transition-all duration-300 group cursor-pointer"
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
//                     className="p-1.5 sm:p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors shrink-0"
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

//         {experienceTipsButtonClicked && (
//           <AnimatePresence>
//             <div className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden p-4">
//               <div
//                 className="absolute inset-0 backdrop-blur-sm"
//                 onClick={() => setExperienceTipsButtonClicked(false)}
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
//                         Experience Tips
//                       </h3>
//                     </div>
//                     <button
//                       onClick={() => setExperienceTipsButtonClicked(false)}
//                       className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
//                     >
//                       <FiX size={18} className="sm:w-5 sm:h-5" />
//                     </button>
//                   </div>
//                   <hr className="border-gray-100" />

//                   <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 pb-8! mb-10 overflow-y-auto max-h-[calc(80vh-100px)]">
//                     {/* Positive tips */}
//                     <div className="space-y-3 sm:space-y-4">
//                       <h4 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
//                         Best Practices
//                       </h4>
//                       {[
//                         {
//                           title: "Use bullet points",
//                           desc: "Make your achievements stand out with concise bullet points.",
//                         },
//                         {
//                           title: "Keep descriptions short and clear",
//                           desc: "Aim for 4–5 of your strongest, most relevant skills.",
//                         },
//                         {
//                           title: "Show your impact",
//                           desc: "Highlight your accomplishments, not generic duties.",
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

//         {/* Fixed Footer - Always visible at bottom */}
//         <div className="shrink-0 pt-2  lg:pt-3">
//           <div className="flex justify-between">
//             <button
//               className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
//               onClick={() => router.push("/resume-details/contact")}
//             >
//               Back
//             </button>

//             <button
//               className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold transition-colors duration-300 cursor-pointer"
//               onClick={() => {
//                 if (saveTimeoutRef.current) {
//                   clearTimeout(saveTimeoutRef.current);
//                 }
//                 saveToAPI(experiences).then(() => {
//                   router.push("/resume-details/education");
//                 });
//               }}
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
import React, { useState, useRef, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import {
  MonthYearDisplay,
  removeSessionStorage,
  setSessionStorage,
} from "@/app/utils";

import { IoMdAdd } from "react-icons/io";
import {
  FiCheckCircle,
  FiChevronDown,
  FiShield,
  FiTrash2,
  FiX,
  FiXCircle,
} from "react-icons/fi";
import { FaRegLightbulb, FaGem, FaStar, FaChartLine } from "react-icons/fa";
import { BsArrowLeftCircleFill } from "react-icons/bs";

import { CreateContext } from "@/app/context/CreateContext";
import { useRouter } from "next/navigation";
import { Experience } from "@/app/types";
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

const ExperienceForm = () => {
  const router = useRouter();
  const UseContext = useContext(CreateContext);
  const contactId = UseContext?.contact._id || UseContext?.contact.contactId;

  const [isExperienced, setIsExperienced] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  removeSessionStorage("oldRouteNameDashboard");

  const { experiences, setExperiences, fullResumeData, setFullResumeData } =
    UseContext;


    console.log("experiences",experiences)

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
        isCurrentlyWorking: false,
      },
    ]);
  };

  const fetchExp = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/experience/get-experience/${contactId}`,
      );

      const experienceList = response.data?.[0]?.experiences || [];

      if (experienceList.length > 0) {
        const formattedData = experienceList.map((item: any) => ({
          id: item.id || Date.now(),
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
          isCurrentlyWorking: item?.isCurrentlyWorking || false,
        }));

        setExperiences(formattedData);
      } else {
        console.error("No experience data found for user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveToAPI = async (experiencesData: typeof experiences) => {
    if (!contactId) {
      console.error("Contact ID is required");
      return false;
    }

    try {
      const formData = {
        experiences: experiencesData,
      };

      const response = await axios.post(
        `${API_URL}/api/experience/update`,
        formData,
        { params: { contactId: contactId } },
      );

      return true;
    } catch (err: any) {
      console.error("Error saving experience:", err);
      toast.error("Failed to save experience!");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const toggleExperienceMode = () => {
    const newValue = !isExperienced;
    setIsExperienced(newValue);
    if (!newValue) {
      setExperiences([]);
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
      return updated;
    });
  };

  const deleteExperience = (id: string | number) => {
    setExperiences((prev) => {
      const updated = prev.filter((exp) => exp.id !== id);
      return updated;
    });
  };

  const [experienceTipsButtonClicked, setExperienceTipsButtonClicked] =
    useState(false);
  const [Airesponse, setAireseponse] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showJobTitleWarningModal, setShowJobTitleWarningModal] =
    useState(false);
  const [clickedIndexoFGenerateWithAIBtn, setClickedIndexoFGenerateWithAIBtn] =
    useState<number | null>(null);
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

  const handleSubmitAi = async (index: number) => {
    const exp = experiences[index];

    // Check if job title is empty
    if (!exp.jobTitle || exp.jobTitle.trim() === "") {
      if (isMobile) {
        setShowJobTitleWarningModal(true);
        setClickedIndexoFGenerateWithAIBtn(index);
      }
      return;
    }

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
      return prev.map((exp, i) => {
        // Only update the object at the specific index
        if (i === clickedIndexoFGenerateWithAIBtn) {
          return {
            ...exp,
            text: (exp.text || "") + "\n" + item,
          };
        }
        return exp; // Return others unchanged
      });
    });

    if (Airesponse) {
      const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
      setAireseponse(newAiResponse.length > 0 ? newAiResponse : null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50/40">
      <Stepper />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto px-2  py-6 sm:py-8 lg:py-10">
          {/* Header Section - Compact */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Work Experience
            </h1>

            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Showcase your professional journey and achievements
            </p>

            <button
              onClick={() => setExperienceTipsButtonClicked((prev) => !prev)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <FaRegLightbulb className="w-3 h-3" />
              <span>Experience Tips</span>
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
                      Professional Experience
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Tell employers about your work history
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
              {/* Experience Toggle */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div
                  onClick={toggleExperienceMode}
                  className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full cursor-pointer transition-all duration-300 ${
                    isExperienced
                      ? "bg-linear-to-r from-indigo-600 to-indigo-500"
                      : "bg-gray-300"
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
                      !isExperienced ? "text-indigo-600" : "text-gray-400"
                    }`}
                  >
                    Fresher
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">/</span>
                  <span
                    className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                      isExperienced ? "text-indigo-600" : "text-gray-400"
                    }`}
                  >
                    Experienced
                  </span>
                </div>
              </div>

              {isExperienced && (
                <div className="space-y-4 sm:space-y-5">
                  {experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      {/* Header */}
                      <div
                        onClick={() => toggleForm(exp.id)}
                        className="flex justify-between items-center cursor-pointer p-4 sm:p-5 group hover:bg-gray-50/50 transition-all duration-300"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-0.5 sm:mb-1 truncate group-hover:text-indigo-600 transition-colors">
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
                              {exp.isCurrentlyWorking ? (
                                <span className="text-emerald-600 font-medium">
                                  Present
                                </span>
                              ) : (
                                <MonthYearDisplay
                                  value={exp.endDate || ""}
                                  shortYear={true}
                                />
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 ml-2">
                          <motion.div
                            animate={{ rotate: exp.isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-1.5 sm:p-2 rounded-lg text-gray-400 group-hover:text-indigo-600 cursor-pointer"
                          >
                            <FiChevronDown
                              size={14}
                              className="sm:w-5 sm:h-5"
                            />
                          </motion.div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteExperience(exp.id);
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
                            ? "max-h-225 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="p-4 sm:p-5 space-y-4 sm:space-y-5 border-t border-gray-100">
                          {/* Job Title & Employer */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                                Job Title
                              </label>
                              <input
                                type="text"
                                value={exp.jobTitle || ""}
                                onChange={(e) =>
                                  handleChange(
                                    exp.id,
                                    "jobTitle",
                                    e.target.value,
                                  )
                                }
                                placeholder="Senior Software Engineer"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                                Company Name
                              </label>
                              <input
                                type="text"
                                value={exp.employer || ""}
                                onChange={(e) =>
                                  handleChange(
                                    exp.id,
                                    "employer",
                                    e.target.value,
                                  )
                                }
                                placeholder="Google, Microsoft, etc."
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                              />
                            </div>
                          </div>

                          {/* Location */}
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                              Location
                            </label>
                            <input
                              type="text"
                              value={exp.location || ""}
                              onChange={(e) =>
                                handleChange(exp.id, "location", e.target.value)
                              }
                              placeholder="City, State or Remote"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                            />
                          </div>

                          {/* Dates with "I currently work here" checkbox */}
                          <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                              <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                                  Start Date
                                </label>
                                <input
                                  type="month"
                                  value={exp.startDate || ""}
                                  onChange={(e) =>
                                    handleChange(
                                      exp.id,
                                      "startDate",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                                  End Date
                                </label>
                                <input
                                  type="month"
                                  value={exp.endDate || ""}
                                  onChange={(e) =>
                                    handleChange(
                                      exp.id,
                                      "endDate",
                                      e.target.value,
                                    )
                                  }
                                  disabled={exp.isCurrentlyWorking}
                                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 rounded-lg sm:rounded-xl text-gray-900 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all ${
                                    exp.isCurrentlyWorking
                                      ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                                      : "border-gray-200"
                                  }`}
                                  placeholder={
                                    exp.isCurrentlyWorking ? "Present" : ""
                                  }
                                />
                              </div>
                            </div>

                            {/* Checkbox */}
                            <div className="mt-3 flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`currently-working-${exp.id}`}
                                checked={exp.isCurrentlyWorking || false}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  handleChange(
                                    exp.id,
                                    "isCurrentlyWorking",
                                    isChecked,
                                  );
                                  if (isChecked) {
                                    handleChange(exp.id, "endDate", "");
                                  }
                                }}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                              />
                              <label
                                htmlFor={`currently-working-${exp.id}`}
                                className="text-sm text-gray-700 cursor-pointer hover:text-indigo-600 transition-colors"
                              >
                                I currently work here
                              </label>
                            </div>
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
                                    !exp.jobTitle || exp.jobTitle.trim() === ""
                                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                      : "bg-linear-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-md"
                                  }`}
                                  type="button"
                                >
                                  <svg
                                    className={`w-3 h-3 transition-all duration-300 ${
                                      loading ? "animate-spin" : ""
                                    }`}
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
                                  {loading
                                    ? "Generating..."
                                    : "Generate With AI"}
                                </button>

                                {/* Tooltip - Desktop only */}
                                {(!exp.jobTitle ||
                                  exp.jobTitle.trim() === "") &&
                                  !loading &&
                                  !isMobile && (
                                    <div className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full mt-1 w-48 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 shadow-lg">
                                      <div className="relative text-center">
                                        <span className="inline-block mr-1">
                                          ⚠️
                                        </span>
                                        Enter job title to use AI Assist
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
                                handleChange(exp.id, "text", e.htmlValue);
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

                  {/* Add Experience Button */}
                  <button
                    onClick={addExperience}
                    className="w-full py-3 sm:py-3.5 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-all duration-300 group cursor-pointer"
                    type="button"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <IoMdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm font-semibold">
                        Add Work Experience
                      </span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Buttons */}

      <div className="sticky bottom-0 z-20 bg-white/75 backdrop-blur-md border-t border-gray-100 shadow-lg shadow-gray-200/50">
        <div className=" mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-3 sm:gap-4">
            {/* Back Button - Icon only on mobile, full text on desktop */}
            <button
              className="group px-4 sm:px-5 py-2.5 sm:py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl hover:bg-indigo-50/50 cursor-pointer"
              onClick={() => router.push("/resume-details/contact")}
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              {/* Hide text on mobile, show on sm and up */}
              <span className="hidden sm:inline">Back to Contact</span>
              {/* Optional: Show just "Back" on medium screens */}
              <span className="inline sm:hidden">Back</span>
            </button>

            {/* Continue Button - Premium Design */}
            <button
              className="group relative px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium md:font-semibold text-white rounded-lg md:rounded-xl shadow-lg transition-all duration-300 overflow-hidden whitespace-nowrap cursor-pointer"
              onClick={() => {
                saveToAPI(experiences).then(() => {
                  router.push("/resume-details/education");
                });
              }}
            >
              {/* Gradient Background with Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:from-indigo-500 group-hover:via-indigo-400 group-hover:to-indigo-500"></div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
              </div>

              {/* Button Content */}
              <div className="relative flex items-center justify-center gap-2">
                {/* Different text for mobile vs desktop */}
                <span>Continue to Education</span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>

              {/* Shadow Enhancement */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(79,70,229,0.5)]"></div>
            </button>
          </div>
        </div>
      </div>

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

      {/* Job Title Warning Modal for Mobile */}
      {showJobTitleWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 backdrop-blur-md bg-black/50"
            onClick={() => setShowJobTitleWarningModal(false)}
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
                  Job Title Required
                </h3>
              </div>
            </div>

            <div className="p-5">
              <p className="text-sm text-gray-700 mb-4">
                Please enter a job title first to use the AI Assist feature.
                This helps generate relevant content for your experience.
              </p>
              <button
                onClick={() => setShowJobTitleWarningModal(false)}
                className="w-full px-4 py-2.5 bg-linear-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Tips Modal */}
      {/* {experienceTipsButtonClicked && (
        <AnimatePresence>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 backdrop-blur-md bg-black/50"
              onClick={() => setExperienceTipsButtonClicked(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-5 py-4">
                <div className="flex items-center gap-2">
                  <FaRegLightbulb className="w-5 h-5 text-white" />
                  <h3 className="text-lg font-bold text-white">
                    Experience Tips
                  </h3>
                </div>
              </div>

              <div className="p-5">
                <div className="bg-amber-50 rounded-xl p-3 mb-4 border border-amber-100">
                  <div className="flex items-center gap-2 mb-1">
                    <FaStar className="w-3 h-3 text-amber-500" />
                    <span className="text-xs font-semibold text-amber-700">
                      Pro Tip
                    </span>
                  </div>
                  <p className="text-xs text-gray-700">
                    Use bullet points and action verbs to highlight achievements
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                    Best Practices
                  </h4>
                  {[
                    "Use bullet points for achievements",
                    "Start with strong action verbs",
                    "Quantify your accomplishments",
                    "Focus on results, not just duties",
                  ].map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5" />
                      <span className="text-xs text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => setExperienceTipsButtonClicked(false)}
                    className="w-full px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    Got it, thanks! ✨
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      )} */}

      <TipsModal
        isOpen={experienceTipsButtonClicked}
        onClose={() => setExperienceTipsButtonClicked(false)}
        title="Experience Tips"
        subtitle="Make your work history stand out"
        hasAI={true}
        aiFeatureDescription="get intelligent bullet points based on your job title."
        proTip="Use bullet points and action verbs to highlight achievements"
        bestPractices={[
          {
            tip: "Use bullet points for achievements",
            example: "• Led team of 5 developers",
          },
          {
            tip: "Start with strong action verbs",
            example: "Developed, Managed, Created",
          },
          {
            tip: "Quantify your accomplishments",
            example: "Increased sales by 40%",
          },
          {
            tip: "Focus on results, not just duties",
            example: "Improved efficiency by 25%",
          },
        ]}
        avoidList={[
          "Using generic descriptions",
          "Writing long paragraphs",
          "Listing duties without results",
        ]}
        examples={{
          before: "Responsible for managing team",
          after:
            "Led a team of 8 developers, delivering projects 30% ahead of schedule",
        }}
      />
    </div>
  );
};

export default ExperienceForm;
