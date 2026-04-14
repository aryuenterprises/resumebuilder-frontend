// "use client";

// import React, {
//   useContext,
//   useState,
//   useEffect,
//   useImperativeHandle,
//   forwardRef,
//   useCallback,
//   useRef,
// } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiCheckCircle, FiXCircle } from "react-icons/fi";
// import { CreateContext } from "@/app/context/CreateContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { BsArrowLeftCircleFill } from "react-icons/bs";
// import { FaRegLightbulb, FaTimes, FaGraduationCap } from "react-icons/fa";
// import { FiTrash2 } from "react-icons/fi";
// import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
// import { BsFillLightningFill } from "react-icons/bs";
// import { Skill } from "@/app/types/context.types";
// import { useRouter } from "next/navigation";
// import Stepper from "../../../components/resume/Steppers";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { API_URL } from "@/app/config/api";

// const steps = ["Beginner", "Basic", "Intermediate", "Advanced", "Expert"];
// const stepWidth = 55;

// // Helper functions to convert between display index (0-4) and stored value (1-5)
// const displayToStored = (displayIndex: number | null) => {
//   if (displayIndex === null) return null;
//   return displayIndex + 1; // 0->1, 1->2, 2->3, 3->4, 4->5
// };

// const storedToDisplay = (storedValue: number | null) => {
//   if (storedValue === null) return null;
//   return storedValue - 1; // 1->0, 2->1, 3->2, 4->3, 5->4
// };

// const SkillsForm = () => {
//   const [skillTipsClicked, setSkillTipsClicked] = useState(false);
//   const router = useRouter();
//   const UseContext = useContext(CreateContext);
//   const contactId = UseContext?.contact._id;
//   const [isActive, setIsActive] = useState(true);

//   const { skills, setSkills, fullResumeData, setFullResumeData } =
//     UseContext || {
//       skills: [],
//       setSkills: () => {},
//       fullResumeData: null,
//       setFullResumeData: () => {},
//     };

//   const [Airesponse, setAireseponse] = useState<string[] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [lastSavedData, setLastSavedData] = useState<string>("");

//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const initialLoadDone = useRef(false);

//   // Save to localStorage whenever skills change
//   useEffect(() => {
//     if (!initialLoadDone.current) return;

//     if (fullResumeData) {
//       const updatedFullData = {
//         ...fullResumeData,
//         skills: skills,
//       };
//       setFullResumeData(updatedFullData);
//       setLocalStorage("fullResumeData", updatedFullData);
//     }
//   }, [skills]);

//   const saveToAPI = async (skillsData: typeof skills) => {
//     if (!contactId) {
//       console.error("Contact ID is required");
//       return false;
//     }

//     // Check if data has changed from last saved
//     const currentDataString = JSON.stringify(skillsData);
//     if (currentDataString === lastSavedData) {
//       return true; // No changes to save
//     }

//     setIsSaving(true);

//     try {
//       const formData = {
//         skills: skillsData,
//       };

//       const response = await axios.post(
//         `${API_URL}/api/skill/update`,
//         formData,
//         { params: { contactId: contactId } },
//       );

//       setLastSavedData(currentDataString);
//       return true;
//     } catch (err: any) {
//       console.error("Error saving skills:", err);
//       toast.error("Failed to save Skills!");
//       return false;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // Debounced save function
//   const debouncedSave = useCallback(
//     (skillsData: typeof skills) => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//       saveTimeoutRef.current = setTimeout(() => {
//         saveToAPI(skillsData);
//       }, 1000);
//     },
//     [contactId, lastSavedData],
//   );

//   const addExperience = () => {
//     setSkills((prev) => {
//       const updated = [
//         ...prev,
//         {
//           skill: "",
//           // Store as 3 (Intermediate) when active, null when inactive
//           level: isActive ? 3 : null,
//           id: Date.now() + Math.random(),
//         },
//       ];
//       debouncedSave(updated);
//       return updated;
//     });
//   };

//   const handleSubmitAi = async () => {
//     setLoading(true);
//     setAireseponse(null);

//     try {
//       let experienceTitlesList =
//         UseContext?.experiences?.map((item: any) => item.jobTitle) || [];

//       const formData = {
//         job_titles: experienceTitlesList,
//       };

//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/resume/skills`,
//         formData,
//       );

//       setAireseponse(response.data?.skills || []);
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
//     setSkills((prev) => {
//       let updated;
//       if (prev.length === 0 || !prev[0]?.skill) {
//         // Store as 3 (Intermediate) for new AI-generated skills
//         updated = [{ skill: item, level: 3, id: Date.now() + Math.random() }];
//       } else {
//         updated = [
//           ...prev,
//           { skill: item, level: 3, id: Date.now() + Math.random() },
//         ];
//       }
//       debouncedSave(updated);
//       return updated;
//     });

//     if (Airesponse) {
//       const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
//       setAireseponse(newAiResponse.length > 0 ? newAiResponse : null);
//     }
//   };

//   const fetchSkill = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/skill/get-skill/${contactId}`,
//       );

//       const skillsList = response.data?.[0]?.skills || [];

//       if (skillsList.length > 0) {
//         const formattedData = skillsList.map((item: any) => ({
//           id: item._id || Date.now(),
//           skill: item?.skill || "",
//           // Ensure level is stored as 1-5, default to 3 if not set
//           level: item?.level !== undefined ? item.level : 3,
//           error: {},
//         }));

//         setSkills(formattedData);
//         setLastSavedData(JSON.stringify(formattedData));
//       } else {
//         console.log("No skills data found for user");
//       }

//       initialLoadDone.current = true;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // useEffect(() => {
//   //   if (contactId) {
//   //     fetchSkill();
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

//   const handleInputChange = (skillsSectionIndex: number, value: string) => {
//     setSkills((prev) => {
//       const updated = [...prev];
//       updated[skillsSectionIndex].skill = value;
//       debouncedSave(updated);
//       return updated;
//     });
//   };

//   // Update skill level - receives display index (0-4), stores as (1-5)
//   const handleStepsChange = (
//     skillsSectionIndex: number,
//     displayIndex: number,
//   ) => {
//     setSkills((prev) => {
//       const updated = [...prev];
//       // Convert display index (0-4) to stored value (1-5)
//       updated[skillsSectionIndex].level = displayToStored(displayIndex);
//       debouncedSave(updated);
//       return updated;
//     });
//   };

//   const toggleActive = () => {
//     setIsActive((prev) => {
//       const newActive = !prev;

//       setSkills((prevSkills) => {
//         const updated = prevSkills.map((exp) => ({
//           ...exp,
//           // When turning on, set to 3 (Intermediate) if currently null
//           // When turning off, set to null
//           level: newActive ? (exp.level === null ? 3 : exp.level) : null,
//         }));
//         debouncedSave(updated);
//         return updated;
//       });

//       return newActive;
//     });
//   };

//   // Delete a skill
//   const handleDelete = (skillsSectionIndex: number) => {
//     setSkills((prev) => {
//       const updated = prev.filter((_, index) => index !== skillsSectionIndex);
//       saveToAPI(updated);
//       return updated;
//     });
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

//         <div className="flex-1 overflow-y-auto pb-5 mt-5">
//           <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 mb-3">
//             <div className="flex items-center gap-2 sm:gap-3">
//               <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//                 <FaGraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]" />
//               </div>
//               <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
//                 Skills
//               </h1>
//             </div>

//             <div className="flex justify-end me-3">
//               <button
//                 onClick={() => setSkillTipsClicked((prev) => !prev)}
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
//                 <span className="truncate">Skills Tips</span>
//                 <motion.div
//                   animate={{ rotate: skillTipsClicked ? 180 : 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="text-gray-500 shrink-0"
//                 >
//                   <IoIosArrowDown />
//                 </motion.div>
//               </button>
//             </div>
//           </div>

//           <p className="text-gray-600 text-xs sm:text-sm font-medium">
//             Add your most relevant professional skills.
//           </p>
//           {/* Toggle & AI Button Row */}
//           <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 mb-3">
//             <div className="flex items-center gap-3 sm:gap-5">
//               <div
//                 onClick={toggleActive}
//                 className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full cursor-pointer transition ${
//                   isActive
//                     ? "bg-linear-to-r from-[#c40116] to-[#be0117]"
//                     : "bg-gray-200"
//                 }`}
//               >
//                 <div
//                   className={`absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white transition-all duration-300 ${
//                     isActive
//                       ? "translate-x-5 sm:translate-x-6"
//                       : "translate-x-0"
//                   }`}
//                 ></div>
//               </div>
//               <div className="text-gray-600 text-xs sm:text-sm font-medium">
//                 Show experience level
//               </div>
//             </div>

//             <div className="relative inline-block group ">
//               <button
//                 onClick={handleSubmitAi}
//                 disabled={loading}
//                 className={`
//             flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-white text-xs sm:text-sm font-medium transition-all duration-200 w-fit
//             ${
//               loading
//                 ? "bg-linear-to-r from-gray-300 to-gray-400 cursor-not-allowed opacity-70"
//                 : "bg-linear-to-r from-[#c40116] to-[#c40116]/60 hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02]"
//             }
//           `}
//                 type="button"
//               >
//                 {loading ? (
//                   <>
//                     <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 sm:w-5 sm:h-5"></span>
//                     <span>Generating AI Skills...</span>
//                   </>
//                 ) : (
//                   <>
//                     <svg
//                       className="w-3.5 h-3.5 sm:w-4 sm:h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M13 10V3L4 14h7v7l9-11h-7z"
//                       />
//                     </svg>
//                     <span>Generate with AI</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Skills List */}
//           <div className="space-y-3 sm:space-y-4 pb-8 sm:pb-10 mt-3">
//             {skills.map((exp, skillsSectionIndex) => (
//               <div
//                 key={skillsSectionIndex}
//                 className="bg-[#f3f4f6]/80 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-subtle transition-all duration-300 hover:shadow-md"
//               >
//                 <div className="p-2 sm:p-3 md:p-4 space-y-4 sm:space-y-6">
//                   {/* Mobile Delete Button */}
//                   <div className="flex 2xl:hidden justify-end -mt-1 -mr-1">
//                     <button
//                       onClick={() => handleDelete(skillsSectionIndex)}
//                       className="p-1.5 rounded-lg bg-linear-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
//                       type="button"
//                     >
//                       <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </button>
//                   </div>

//                   <div className="flex flex-col flex-wrap md:flex-row md:items-start gap-4 sm:gap-6">
//                     {/* Skill Input */}
//                     <div className="flex-1 group">
//                       <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                         Skill Name
//                       </label>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           value={exp.skill || ""}
//                           onChange={(e) =>
//                             handleInputChange(
//                               skillsSectionIndex,
//                               e.target.value,
//                             )
//                           }
//                           placeholder="Enter a skill..."
//                           className="px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 w-full hover:shadow-md min-w-52"
//                         />
//                         {exp.error?.skill && (
//                           <p className="text-[#c40116] text-[10px] xs:text-xs mt-1.5 sm:mt-2">
//                             {exp.error.skill}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Level Slider */}
//                     <div className="group grow ">
//                       <div className="flex items-center justify-between mb-2 sm:mb-4">
//                         <div className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-[#c40116] transition-colors">
//                           Proficiency Level
//                         </div>
//                         <div className="text-xs sm:text-sm font-medium text-gray-800">
//                           {/* Convert stored value (1-5) to display index (0-4) */}
//                           {exp.level !== null
//                             ? steps[storedToDisplay(exp.level) as number]
//                             : "Not set"}
//                         </div>
//                       </div>

//                       <div className="flex items-center flex-wrap gap-4 sm:gap-6">
//                         <div
//                           className={`relative w-full max-w-70 sm:w-75 h-8 sm:h-10 transition ${
//                             isActive ? "" : "opacity-50 pointer-events-none"
//                           }`}
//                         >
//                           {/* Background line */}
//                           <div className="absolute top-1/2 transform -translate-y-1/2 w-[calc(100%-25px)] sm:w-68.75 h-8 sm:h-12.5 bg-[#c40116]/5 rounded-md"></div>

//                           {/* Vertical dividers */}
//                           {steps.slice(1).map((_, index) => (
//                             <div
//                               key={index}
//                               className="absolute top-1 bottom-0 md:w-px h-6 sm:h-8 bg-[#c40116]/40"
//                               style={{ left: `${(index + 1) * stepWidth}px` }}
//                             ></div>
//                           ))}

//                           {/* Moving indicator - Convert stored value to display index for position */}
//                           {exp.level !== null && (
//                             <div
//                               className="absolute bg-[#c40116]/80 -top-0.5 sm:-top-1 left-0 h-8 sm:h-12.5 w-11.25 sm:w-13.75 rounded-md transition-all duration-500"
//                               style={{
//                                 transform: `translateX(${storedToDisplay(exp.level)! * stepWidth}px)`,
//                               }}
//                             ></div>
//                           )}

//                           {/* Clickable steps - Pass display index (0-4) to handler */}
//                           {steps.map((_, stepsIndex) => (
//                             <div
//                               key={stepsIndex}
//                               onClick={() =>
//                                 handleStepsChange(
//                                   skillsSectionIndex,
//                                   stepsIndex,
//                                 )
//                               }
//                               className="absolute top-0 left-0 w-11.25 sm:w-13.75 h-8 sm:h-10 cursor-pointer"
//                               style={{
//                                 transform: `translateX(${
//                                   stepsIndex * stepWidth
//                                 }px)`,
//                               }}
//                             ></div>
//                           ))}
//                         </div>

//                         {/* Desktop Delete Button */}
//                         <div className="max-2xl:hidden">
//                           <button
//                             onClick={() => handleDelete(skillsSectionIndex)}
//                             className="p-1.5 sm:p-2 rounded-lg bg-linear-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
//                             type="button"
//                           >
//                             <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* Add Skills Button */}
//             <button
//               onClick={addExperience}
//               className="w-full py-3 sm:py-3.5 bg-linear-to-br from-gray-50 to-white border-2 border-dashed border-gray-200 rounded-xl hover:border-[#c40116] hover:bg-[#c40116]/5 text-gray-600 hover:text-[#c40116] transition-all duration-300 group"
//               type="button"
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <div className="p-1 sm:p-1.5 bg-gray-100 rounded-lg group-hover:bg-[#c40116]/10 transition-colors">
//                   <IoMdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
//                 </div>
//                 <span className="text-xs sm:text-sm font-semibold">
//                   Add New Skill
//                 </span>
//               </div>
//             </button>
//           </div>
//         </div>

//         <div className="shrink-0 pt-2  lg:pt-3">
//           <div className="flex justify-between">
//             <button
//               className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
//               onClick={() => router.push("/resume-details/education")}
//             >
//               Back
//             </button>

//             <button
//               className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold transition-colors duration-300 cursor-pointer"
//               onClick={() => {
//                 if (saveTimeoutRef.current) {
//                   clearTimeout(saveTimeoutRef.current);
//                 }
//                 saveToAPI(skills).then(() => {
//                   router.push("/resume-details/summary");
//                 });
//               }}
//             >
//               Next Summary
//             </button>
//           </div>
//         </div>

//         {/* Skills Tips Modal */}
//         {skillTipsClicked && (
//           <AnimatePresence>
//             <div className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden p-4">
//               <div
//                 className="absolute inset-0 backdrop-blur-sm"
//                 onClick={() => setSkillTipsClicked(false)}
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
//                         Skills Tips
//                       </h3>
//                     </div>
//                     <button
//                       onClick={() => setSkillTipsClicked(false)}
//                       className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
//                       type="button"
//                     >
//                       <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
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
//                           title: "List job-relevant skills",
//                           desc: "Match the job you're applying for.",
//                         },
//                         {
//                           title: "Use keywords from job description",
//                           desc: "It helps you pass Applicant Tracking Systems (ATS).",
//                         },
//                         {
//                           title: "Keep it concise",
//                           desc: "Aim for 4–5 of your strongest, most relevant skills.",
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
//                           title: "Don't include outdated tools and software",
//                           desc: "Show you're up to date with current tech.",
//                         },
//                         {
//                           title: "Don't list general traits as skills",
//                           desc: "Avoid terms like 'hard-working' or 'fast learner.'",
//                         },
//                         {
//                           title: "Don't lie about your skills",
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
//                   <div className="flex items-start gap-2 sm:gap-3">
//                     <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//                       <BsFillLightningFill className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//                         AI-Generated Skills
//                       </h2>
//                       <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                         Click on any skill below to add it to your list
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowPopup(false)}
//                     className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
//                     type="button"
//                   >
//                     <FaTimes className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
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

// export default SkillsForm;

// "use client";

// import React, {
//   useContext,
//   useState,
//   useEffect,
//   useImperativeHandle,
//   forwardRef,
//   useCallback,
//   useRef,
// } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiCheckCircle, FiXCircle } from "react-icons/fi";
// import { CreateContext } from "@/app/context/CreateContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { BsArrowLeftCircleFill } from "react-icons/bs";
// import { FaRegLightbulb, FaTimes, FaGraduationCap } from "react-icons/fa";
// import { FiTrash2 } from "react-icons/fi";
// import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
// import { BsFillLightningFill } from "react-icons/bs";
// import { Skill } from "@/app/types/context.types";
// import { useRouter } from "next/navigation";
// import Stepper from "../../../components/resume/Steppers";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { API_URL } from "@/app/config/api";

// const SkillsForm = () => {
//   const [skillTipsClicked, setSkillTipsClicked] = useState(false);
//   const router = useRouter();
//   const UseContext = useContext(CreateContext);
//   const contactId = UseContext?.contact._id;

//   const { skills, setSkills, fullResumeData, setFullResumeData } =
//     UseContext || {
//       skills: [],
//       setSkills: () => {},
//       fullResumeData: null,
//       setFullResumeData: () => {},
//     };

//   const [Airesponse, setAireseponse] = useState<string[] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [lastSavedData, setLastSavedData] = useState<string>("");

//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const initialLoadDone = useRef(false);

//   // Save to localStorage whenever skills change
//   useEffect(() => {
//     if (!initialLoadDone.current) return;

//     if (fullResumeData) {
//       const updatedFullData = {
//         ...fullResumeData,
//         skills: skills,
//       };
//       setFullResumeData(updatedFullData);
//       setLocalStorage("fullResumeData", updatedFullData);
//     }
//   }, [skills]);

//   const saveToAPI = async (skillsData: typeof skills) => {
//     if (!contactId) {
//       console.error("Contact ID is required");
//       return false;
//     }

//     // Check if data has changed from last saved
//     const currentDataString = JSON.stringify(skillsData);
//     if (currentDataString === lastSavedData) {
//       return true; // No changes to save
//     }

//     setIsSaving(true);

//     try {
//       const formData = {
//         skills: skillsData,
//       };

//       const response = await axios.post(
//         `${API_URL}/api/skill/update`,
//         formData,
//         { params: { contactId: contactId } },
//       );

//       setLastSavedData(currentDataString);
//       return true;
//     } catch (err: any) {
//       console.error("Error saving skills:", err);
//       toast.error("Failed to save Skills!");
//       return false;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // Debounced save function
//   const debouncedSave = useCallback(
//     (skillsData: typeof skills) => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//       saveTimeoutRef.current = setTimeout(() => {
//         saveToAPI(skillsData);
//       }, 1000);
//     },
//     [contactId, lastSavedData],
//   );

//   const addSkill = () => {
//     setSkills((prev) => {
//       const updated = [
//         ...prev,
//         {
//           skill: "",
//           id: Date.now() + Math.random(),
//         },
//       ];
//       debouncedSave(updated);
//       return updated;
//     });
//   };

//   const handleSubmitAi = async () => {
//     setLoading(true);
//     setAireseponse(null);

//     try {
//       let experienceTitlesList =
//         UseContext?.experiences?.map((item: any) => item.jobTitle) || [];

//       const formData = {
//         job_titles: experienceTitlesList,
//       };

//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/resume/skills`,
//         formData,
//       );

//       setAireseponse(response.data?.skills || []);
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
//     setSkills((prev) => {
//       let updated;
//       if (prev.length === 0 || !prev[0]?.skill) {
//         updated = [{ skill: item, id: Date.now() + Math.random() }];
//       } else {
//         updated = [
//           ...prev,
//           { skill: item, id: Date.now() + Math.random() },
//         ];
//       }
//       debouncedSave(updated);
//       return updated;
//     });

//     if (Airesponse) {
//       const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
//       setAireseponse(newAiResponse.length > 0 ? newAiResponse : null);
//     }
//   };

//   const fetchSkill = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/skill/get-skill/${contactId}`,
//       );

//       const skillsList = response.data?.[0]?.skills || [];

//       if (skillsList.length > 0) {
//         const formattedData = skillsList.map((item: any) => ({
//           id: item._id || Date.now(),
//           skill: item?.skill || "",
//           error: {},
//         }));

//         setSkills(formattedData);
//         setLastSavedData(JSON.stringify(formattedData));
//       } else {
//         console.log("No skills data found for user");
//       }

//       initialLoadDone.current = true;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // useEffect(() => {
//   //   if (contactId) {
//   //     fetchSkill();
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

//   const handleInputChange = (skillsSectionIndex: number, value: string) => {
//     setSkills((prev) => {
//       const updated = [...prev];
//       updated[skillsSectionIndex].skill = value;
//       debouncedSave(updated);
//       return updated;
//     });
//   };

//   // Delete a skill
//   const handleDelete = (skillsSectionIndex: number) => {
//     setSkills((prev) => {
//       const updated = prev.filter((_, index) => index !== skillsSectionIndex);
//       saveToAPI(updated);
//       return updated;
//     });
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

//         <div className="flex-1 overflow-y-auto pb-5 mt-5">
//           <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 mb-3">
//             <div className="flex items-center gap-2 sm:gap-3">
//               <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//                 <FaGraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]" />
//               </div>
//               <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
//                 Skills
//               </h1>
//             </div>

//             <div className="flex justify-end me-3">
//               <button
//                 onClick={() => setSkillTipsClicked((prev) => !prev)}
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
//                   <FaRegLightbulb className="text-[#c40116]" />
//                 </motion.div>
//                 <span className="truncate">Skills Tips</span>
//                 <motion.div
//                   animate={{ rotate: skillTipsClicked ? 180 : 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="text-gray-500 shrink-0"
//                 >
//                   <IoIosArrowDown />
//                 </motion.div>
//               </button>
//             </div>
//           </div>

//           <p className="text-gray-600 text-xs sm:text-sm font-medium">
//             Add your most relevant professional skills.
//           </p>

//           {/* AI Button Row */}
//           <div className="flex flex-col xs:flex-row xs:items-center justify-end gap-3 sm:gap-4 mb-3">
//             <div className="relative inline-block group">
//               <button
//                 onClick={handleSubmitAi}
//                 disabled={loading}
//                 className={`
//                   flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-white text-xs sm:text-sm font-medium transition-all duration-200 w-fit
//                   ${
//                     loading
//                       ? "bg-linear-to-r from-gray-300 to-gray-400 cursor-not-allowed opacity-70"
//                       : "bg-linear-to-r from-[#c40116] to-[#c40116]/60 hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02]"
//                   }
//                 `}
//                 type="button"
//               >
//                 {loading ? (
//                   <>
//                     <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 sm:w-5 sm:h-5"></span>
//                     <span>Generating AI Skills...</span>
//                   </>
//                 ) : (
//                   <>
//                     <svg
//                       className="w-3.5 h-3.5 sm:w-4 sm:h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M13 10V3L4 14h7v7l9-11h-7z"
//                       />
//                     </svg>
//                     <span>Generate with AI</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Skills List - Simple Chips Layout */}
//           <div className="mt-4">
//             <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
//               {skills.map((exp, skillsSectionIndex) => (
//                 <div
//                   key={skillsSectionIndex}
//                   className="group relative inline-flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#f3f4f6]/80 border border-gray-200 rounded-full hover:border-[#c40116] hover:bg-[#c40116]/5 transition-all duration-200"
//                 >
//                   <span className="text-gray-700 text-xs sm:text-sm font-medium">
//                     {exp.skill || "New Skill"}
//                   </span>
//                   <button
//                     onClick={() => handleDelete(skillsSectionIndex)}
//                     className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1"
//                     type="button"
//                   >
//                     <FiTrash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 hover:text-[#c40116]" />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Add Skill Input */}
//             <div className="flex items-center gap-2">
//               <input
//                 type="text"
//                 placeholder="Type a skill and press Enter..."
//                 className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 transition-all duration-300"
//                 onKeyPress={(e) => {
//                   if (e.key === "Enter") {
//                     const input = e.target as HTMLInputElement;
//                     if (input.value.trim()) {
//                       setSkills((prev) => {
//                         const updated = [
//                           ...prev,
//                           {
//                             skill: input.value.trim(),
//                             id: Date.now() + Math.random(),
//                           },
//                         ];
//                         debouncedSave(updated);
//                         return updated;
//                       });
//                       input.value = "";
//                     }
//                   }
//                 }}
//               />
//               <button
//                 onClick={() => {
//                   const input = document.querySelector("input") as HTMLInputElement;
//                   if (input?.value.trim()) {
//                     setSkills((prev) => {
//                       const updated = [
//                         ...prev,
//                         {
//                           skill: input.value.trim(),
//                           id: Date.now() + Math.random(),
//                         },
//                       ];
//                       debouncedSave(updated);
//                       return updated;
//                     });
//                     input.value = "";
//                   }
//                 }}
//                 className="px-4 py-2.5 sm:px-5 sm:py-3 bg-linear-to-r from-[#c40116] to-[#c40116]/80 text-white rounded-xl hover:shadow-lg transition-all"
//               >
//                 <IoMdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="shrink-0 pt-2 lg:pt-3">
//           <div className="flex justify-between">
//             <button
//               className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
//               onClick={() => router.push("/resume-details/education")}
//             >
//               Back
//             </button>

//             <button
//               className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold transition-colors duration-300 cursor-pointer"
//               onClick={() => {
//                 if (saveTimeoutRef.current) {
//                   clearTimeout(saveTimeoutRef.current);
//                 }
//                 saveToAPI(skills).then(() => {
//                   router.push("/resume-details/summary");
//                 });
//               }}
//             >
//               Next Summary
//             </button>
//           </div>
//         </div>

//         {/* Skills Tips Modal */}
//         {skillTipsClicked && (
//           <AnimatePresence>
//             <div className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden p-4">
//               <div
//                 className="absolute inset-0 backdrop-blur-sm"
//                 onClick={() => setSkillTipsClicked(false)}
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
//                         Skills Tips
//                       </h3>
//                     </div>
//                     <button
//                       onClick={() => setSkillTipsClicked(false)}
//                       className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
//                       type="button"
//                     >
//                       <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
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
//                           title: "List job-relevant skills",
//                           desc: "Match the job you're applying for.",
//                         },
//                         {
//                           title: "Use keywords from job description",
//                           desc: "It helps you pass Applicant Tracking Systems (ATS).",
//                         },
//                         {
//                           title: "Keep it concise",
//                           desc: "Aim for 4–5 of your strongest, most relevant skills.",
//                         },
//                         {
//                           title: "Group similar skills together",
//                           desc: "Example: Frontend: React, Vue, Angular",
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
//                           title: "Don't include outdated tools and software",
//                           desc: "Show you're up to date with current tech.",
//                         },
//                         {
//                           title: "Don't list general traits as skills",
//                           desc: "Avoid terms like 'hard-working' or 'fast learner.'",
//                         },
//                         {
//                           title: "Don't lie about your skills",
//                           desc: "False claims can backfire during interviews.",
//                         },
//                         {
//                           title: "Don't use skill rating bars",
//                           desc: "Recruiters find self-rated skill levels unhelpful.",
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
//                   <div className="flex items-start gap-2 sm:gap-3">
//                     <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//                       <BsFillLightningFill className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//                         AI-Generated Skills
//                       </h2>
//                       <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                         Click on any skill below to add it to your list
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowPopup(false)}
//                     className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
//                     type="button"
//                   >
//                     <FaTimes className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
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

// export default SkillsForm;

// "use client";

// import React, {
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
// } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiCheckCircle, FiXCircle, FiChevronDown, FiTrash2, FiPlus, FiGrid, FiList } from "react-icons/fi";
// import { CreateContext } from "@/app/context/CreateContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { BsArrowLeftCircleFill } from "react-icons/bs";
// import { FaRegLightbulb, FaTimes, FaGraduationCap, FaMagic } from "react-icons/fa";
// import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
// import { BsFillLightningFill } from "react-icons/bs";
// import { useRouter } from "next/navigation";
// import Stepper from "../../../components/resume/Steppers";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { API_URL } from "@/app/config/api";

// // Types
// interface SimpleSkill {
//   id: number | string;
//   name: string;
// }

// interface CategorySkill {
//   id: number | string;
//   name: string;
// }

// interface SkillCategory {
//   id: number | string;
//   title: string;
//   skills: CategorySkill[];
//   isOpen?: boolean;
// }

// type SkillsMode = "simple" | "categorized";

// const SkillsForm = () => {
//   const [skillTipsClicked, setSkillTipsClicked] = useState(false);
//   const [skillsMode, setSkillsMode] = useState<SkillsMode>("simple");
//   const router = useRouter();
//   const UseContext = useContext(CreateContext);
//   const contactId = UseContext?.contact._id;

//   const { skills, setSkills, fullResumeData, setFullResumeData } =
//     UseContext || {
//       skills: [],
//       setSkills: () => {},
//       fullResumeData: null,
//       setFullResumeData: () => {},
//     };

//     console.log("skills",skills)

//   // Simple mode state
//   const [simpleSkills, setSimpleSkills] = useState<SimpleSkill[]>([]);
//   const [newSkillInput, setNewSkillInput] = useState("");

//   // Categorized mode state - EMPTY by default
//   const [categorizedSkills, setCategorizedSkills] = useState<SkillCategory[]>([]);
//   const [newCategoryTitle, setNewCategoryTitle] = useState("");
//   const [showAddCategory, setShowAddCategory] = useState(false);

//   const [Airesponse, setAiresponse] = useState<string[] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [lastSavedData, setLastSavedData] = useState<string>("");
//   const [isInitialized, setIsInitialized] = useState(false);

//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const initialLoadDone = useRef(false);

//   // Initialize skills data from context based on mode
//   useEffect(() => {
//     if (isInitialized) return;

//     if (skills && skills.length > 0) {
//       // Check if skills are categorized or simple
//       if (skills[0]?.title !== undefined) {
//         setSkillsMode("categorized");
//         const normalizedSkills = skills.map((cat: SkillCategory) => ({
//           ...cat,
//           isOpen: cat.isOpen !== undefined ? cat.isOpen : true,
//         }));
//         setCategorizedSkills(normalizedSkills);
//       } else {
//         setSkillsMode("simple");
//         setSimpleSkills(skills as SimpleSkill[]);
//       }
//     } else {
//       // Empty by default - no categories, no skills
//       setSimpleSkills([]);
//       setCategorizedSkills([]);
//     }
//     setIsInitialized(true);
//   }, [skills, isInitialized]);

//   // Save to localStorage whenever skills change
//   useEffect(() => {
//     if (!initialLoadDone.current) return;

//     const currentSkills = skillsMode === "simple" ? simpleSkills : categorizedSkills;

//     if (fullResumeData) {
//       const updatedFullData = {
//         ...fullResumeData,
//         skills: currentSkills,
//       };
//       setFullResumeData(updatedFullData);
//       setLocalStorage("fullResumeData", updatedFullData);
//     }
//   }, [simpleSkills, categorizedSkills, skillsMode]);

//   const saveToAPI = async (skillsDataToSave: any[]) => {
//     if (!contactId) {
//       console.error("Contact ID is required");
//       return false;
//     }

//     const currentDataString = JSON.stringify(skillsDataToSave);
//     if (currentDataString === lastSavedData) {
//       return true;
//     }

//     setIsSaving(true);

//     try {
//       const formData = {
//         skills: skillsDataToSave,
//       };

//       await axios.post(`${API_URL}/api/skill/update`, formData, {
//         params: { contactId: contactId },
//       });

//       setLastSavedData(currentDataString);
//       return true;
//     } catch (err: any) {
//       console.error("Error saving skills:", err);
//       toast.error("Failed to save Skills!");
//       return false;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const debouncedSave = useCallback(
//     (skillsDataToSave: any[]) => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//       saveTimeoutRef.current = setTimeout(() => {
//         saveToAPI(skillsDataToSave);
//       }, 1000);
//     },
//     [contactId, lastSavedData],
//   );

//   // ========== SIMPLE MODE FUNCTIONS ==========
//   const addSimpleSkill = () => {
//     if (newSkillInput.trim()) {
//       const updated = [...simpleSkills, { id: Date.now() + Math.random(), name: newSkillInput.trim() }];
//       setSimpleSkills(updated);
//       debouncedSave(updated);
//       setNewSkillInput("");
//       toast.success("Skill added!");
//     }
//   };

//   const deleteSimpleSkill = (skillId: string | number) => {
//     const updated = simpleSkills.filter((skill) => skill.id !== skillId);
//     setSimpleSkills(updated);
//     debouncedSave(updated);
//     toast.success("Skill removed!");
//   };

//   const updateSimpleSkill = (skillId: string | number, newName: string) => {
//     const updated = simpleSkills.map((skill) =>
//       skill.id === skillId ? { ...skill, name: newName } : skill
//     );
//     setSimpleSkills(updated);
//     debouncedSave(updated);
//   };

//   // ========== CATEGORIZED MODE FUNCTIONS ==========
//   const addCategory = () => {
//     if (newCategoryTitle.trim()) {
//       const newCategory: SkillCategory = {
//         id: Date.now(),
//         title: newCategoryTitle.trim(),
//         skills: [],
//         isOpen: true,
//       };
//       const updated = [...categorizedSkills, newCategory];
//       setCategorizedSkills(updated);
//       debouncedSave(updated);
//       setNewCategoryTitle("");
//       setShowAddCategory(false);
//       toast.success("Category added!");
//     }
//   };

//   const deleteCategory = (categoryId: string | number) => {
//     const updated = categorizedSkills.filter((cat) => cat.id !== categoryId);
//     setCategorizedSkills(updated);
//     debouncedSave(updated);
//     toast.success("Category removed!");
//   };

//   const toggleCategory = (categoryId: string | number) => {
//     const updated = categorizedSkills.map((cat) =>
//       cat.id === categoryId ? { ...cat, isOpen: !cat.isOpen } : cat
//     );
//     setCategorizedSkills(updated);
//     debouncedSave(updated);
//   };

//   const addCategorizedSkill = (categoryId: string | number, skillName: string) => {
//     if (!skillName.trim()) return;

//     const updated = categorizedSkills.map((cat) =>
//       cat.id === categoryId
//         ? {
//             ...cat,
//             skills: [
//               ...cat.skills,
//               { id: Date.now() + Math.random(), name: skillName.trim() },
//             ],
//           }
//         : cat
//     );
//     setCategorizedSkills(updated);
//     debouncedSave(updated);
//   };

//   const deleteCategorizedSkill = (categoryId: string | number, skillId: string | number) => {
//     const updated = categorizedSkills.map((cat) =>
//       cat.id === categoryId
//         ? { ...cat, skills: cat.skills.filter((skill) => skill.id !== skillId) }
//         : cat
//     );
//     setCategorizedSkills(updated);
//     debouncedSave(updated);
//     toast.success("Skill removed!");
//   };

//   const updateCategorizedSkill = (
//     categoryId: string | number,
//     skillId: string | number,
//     newName: string
//   ) => {
//     const updated = categorizedSkills.map((cat) =>
//       cat.id === categoryId
//         ? {
//             ...cat,
//             skills: cat.skills.map((skill) =>
//               skill.id === skillId ? { ...skill, name: newName } : skill
//             ),
//           }
//         : cat
//     );
//     setCategorizedSkills(updated);
//     debouncedSave(updated);
//   };

//   const updateCategoryTitle = (categoryId: string | number, newTitle: string) => {
//     if (!newTitle.trim()) return;
//     const updated = categorizedSkills.map((cat) =>
//       cat.id === categoryId ? { ...cat, title: newTitle.trim() } : cat
//     );
//     setCategorizedSkills(updated);
//     debouncedSave(updated);
//   };

//   // ========== AI FUNCTIONS ==========
//   const handleSubmitAi = async () => {
//     setLoading(true);
//     setAiresponse(null);

//     try {
//       let experienceTitlesList =
//         UseContext?.experiences?.map((item: any) => item.jobTitle) || [];

//       const formData = {
//         job_titles: experienceTitlesList,
//       };

//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/resume/skills`,
//         formData,
//       );

//       setAiresponse(response.data?.skills || []);
//       setShowPopup(true);
//     } catch (err: any) {
//       console.error("Error sending message:", err);
//       toast.error("Failed to generate AI skills");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const insertAIResponse = (item: string, index: number) => {
//     if (skillsMode === "simple") {
//       const updated = [...simpleSkills, { id: Date.now() + Math.random(), name: item }];
//       setSimpleSkills(updated);
//       debouncedSave(updated);
//     } else {
//       if (categorizedSkills.length === 0) {
//         // Create first category if none exists
//         const newCategory: SkillCategory = {
//           id: Date.now(),
//           title: "Skills",
//           isOpen: true,
//           skills: [{ id: Date.now() + Math.random(), name: item }],
//         };
//         const updated = [newCategory];
//         setCategorizedSkills(updated);
//         debouncedSave(updated);
//       } else {
//         const updated = categorizedSkills.map((cat, idx) =>
//           idx === 0
//             ? {
//                 ...cat,
//                 skills: [
//                   ...cat.skills,
//                   { id: Date.now() + Math.random(), name: item },
//                 ],
//               }
//             : cat
//         );
//         setCategorizedSkills(updated);
//         debouncedSave(updated);
//       }
//     }

//     if (Airesponse) {
//       const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
//       setAiresponse(newAiResponse.length > 0 ? newAiResponse : null);
//     }
//     toast.success("Skill added!");
//   };

//   // Sync with context
//   useEffect(() => {
//     if (initialLoadDone.current && setSkills) {
//       const currentSkills = skillsMode === "simple" ? simpleSkills : categorizedSkills;
//       if (JSON.stringify(currentSkills) !== JSON.stringify(skills)) {
//         setSkills(currentSkills);
//       }
//     }
//   }, [simpleSkills, categorizedSkills, skillsMode, setSkills, skills]);

//   useEffect(() => {
//     initialLoadDone.current = true;
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//     };
//   }, []);

//   return (
//     <section className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-white">
//       <div className="py-2 lg:py-3 px-3 md:px-4 lg:px-5 bg-white rounded-xl sm:rounded-2xl shadow-soft h-full flex flex-col">
//         <Stepper />

//         {/* Auto-save indicator */}
//         <AnimatePresence>
//           {isSaving && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="absolute top-20 right-5 z-10 flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-md"
//             >
//               <div className="w-3 h-3 border-2 border-gray-300 border-t-[#c40116] rounded-full animate-spin"></div>
//               <span className="text-xs text-gray-600">Saving...</span>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <div className="flex-1 overflow-y-auto pb-5 mt-5">
//           {/* Header Section */}
//           <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl">
//                 <FaGraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-[#c40116]" />
//               </div>
//               <div>
//                 <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
//                   Skills
//                 </h1>
//                 <p className="text-gray-500 text-xs sm:text-sm mt-1">
//                   Add your professional skills
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               {/* Mode Toggle - Modern Switch */}
//               <div className="bg-gray-100 rounded-full p-1 flex gap-1">
//                 <button
//                   onClick={() => setSkillsMode("simple")}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                     skillsMode === "simple"
//                       ? "bg-white text-[#c40116] shadow-md"
//                       : "text-gray-600 hover:text-gray-800"
//                   }`}
//                 >
//                   <FiList className="w-4 h-4" />
//                   <span className="hidden sm:inline">Simple List</span>
//                 </button>
//                 <button
//                   onClick={() => setSkillsMode("categorized")}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                     skillsMode === "categorized"
//                       ? "bg-white text-[#c40116] shadow-md"
//                       : "text-gray-600 hover:text-gray-800"
//                   }`}
//                 >
//                   <FiGrid className="w-4 h-4" />
//                   <span className="hidden sm:inline">Categories</span>
//                 </button>
//               </div>

//               <button
//                 onClick={() => setSkillTipsClicked(true)}
//                 className="relative group"
//               >
//                 <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-full hover:border-[#c40116] hover:shadow-md transition-all">
//                   <FaRegLightbulb className="text-[#c40116] w-4 h-4" />
//                   <span className="text-sm font-medium text-gray-700 hidden sm:inline">Tips</span>
//                 </div>
//               </button>

//               <button
//                 onClick={handleSubmitAi}
//                 disabled={loading}
//                 className={`relative overflow-hidden group px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                   loading
//                     ? "bg-gray-300 cursor-not-allowed opacity-70"
//                     : "bg-gradient-to-r from-[#c40116] to-[#be0117] text-white hover:shadow-lg hover:scale-105"
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   {loading ? (
//                     <>
//                       <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
//                       <span>Generating...</span>
//                     </>
//                   ) : (
//                     <>
//                       <FaMagic className="w-4 h-4" />
//                       <span>AI Suggest</span>
//                     </>
//                   )}
//                 </div>
//               </button>
//             </div>
//           </div>

//           {/* SIMPLE MODE */}
//           {skillsMode === "simple" && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-6"
//             >
//               {/* Skills Cloud */}
//               <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 min-h-[300px]">
//                 {simpleSkills.length > 0 ? (
//                   <div className="flex flex-wrap gap-3">
//                     {simpleSkills.map((skill, index) => (
//                       <motion.div
//                         key={skill.id}
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: index * 0.05 }}
//                         className="group relative"
//                       >
//                         <div className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-full hover:border-[#c40116] hover:shadow-lg transition-all group-hover:scale-105">
//                           <input
//                             type="text"
//                             value={skill.name}
//                             onChange={(e) => updateSimpleSkill(skill.id, e.target.value)}
//                             className="bg-transparent text-gray-700 text-sm focus:outline-none min-w-[80px]"
//                             placeholder="Skill name"
//                           />
//                           <button
//                             onClick={() => deleteSimpleSkill(skill.id)}
//                             className="opacity-0 group-hover:opacity-100 transition-opacity"
//                           >
//                             <FiTrash2 className="w-3.5 h-3.5 text-gray-400 hover:text-[#c40116]" />
//                           </button>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center h-64 text-center">
//                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                       <FiList className="w-8 h-8 text-gray-400" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-700 mb-2">No skills added yet</h3>
//                     <p className="text-gray-400 text-sm">Type a skill below and click "Add Skill"</p>
//                   </div>
//                 )}
//               </div>

//               {/* Add Skill Input */}
//               <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
//                 <div className="flex gap-3">
//                   <div className="flex-1 relative">
//                     <input
//                       type="text"
//                       value={newSkillInput}
//                       onChange={(e) => setNewSkillInput(e.target.value)}
//                       placeholder="Type a skill and press Enter..."
//                       className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 transition-all"
//                       onKeyPress={(e) => e.key === "Enter" && addSimpleSkill()}
//                     />
//                   </div>
//                   <button
//                     onClick={addSimpleSkill}
//                     className="px-6 py-3 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
//                   >
//                     <IoMdAdd className="w-5 h-5" />
//                     <span>Add Skill</span>
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* CATEGORIZED MODE - EMPTY BY DEFAULT */}
//           {skillsMode === "categorized" && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-4"
//             >
//               {categorizedSkills.length === 0 ? (
//                 // Empty state for categories
//                 <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-12 text-center">
//                   <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <FiGrid className="w-10 h-10 text-gray-400" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-700 mb-2">No categories yet</h3>
//                   <p className="text-gray-400 mb-6">Create your first category to organize your skills</p>
//                   <button
//                     onClick={() => setShowAddCategory(true)}
//                     className="px-6 py-3 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-medium hover:shadow-lg transition-all inline-flex items-center gap-2"
//                   >
//                     <FiPlus className="w-5 h-5" />
//                     Create Category
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   {/* Categories List */}
//                   <div className="space-y-4">
//                     {categorizedSkills.map((category, catIndex) => (
//                       <motion.div
//                         key={category.id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: catIndex * 0.1 }}
//                         className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all"
//                       >
//                         {/* Category Header */}
//                         <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
//                           <div
//                             onClick={() => toggleCategory(category.id)}
//                             className="flex items-center gap-3 cursor-pointer flex-1"
//                           >
//                             <motion.div
//                               animate={{ rotate: category.isOpen ? 90 : 0 }}
//                               transition={{ duration: 0.3 }}
//                               className="text-gray-400"
//                             >
//                               <FiChevronDown size={20} />
//                             </motion.div>
//                             <input
//                               type="text"
//                               value={category.title}
//                               onChange={(e) => updateCategoryTitle(category.id, e.target.value)}
//                               onClick={(e) => e.stopPropagation()}
//                               className="text-lg font-semibold text-gray-800 bg-transparent hover:bg-white px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c40116]/20"
//                               placeholder="Category name"
//                             />
//                             <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
//                               {category.skills.length}
//                             </span>
//                           </div>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               deleteCategory(category.id);
//                             }}
//                             className="p-2 rounded-lg bg-gray-100 text-gray-400 hover:text-[#c40116] transition-all"
//                           >
//                             <FiTrash2 size={16} />
//                           </button>
//                         </div>

//                         {/* Category Content */}
//                         <AnimatePresence>
//                           {category.isOpen && (
//                             <motion.div
//                               initial={{ opacity: 0, height: 0 }}
//                               animate={{ opacity: 1, height: "auto" }}
//                               exit={{ opacity: 0, height: 0 }}
//                               transition={{ duration: 0.3 }}
//                               className="overflow-hidden"
//                             >
//                               <div className="p-4 space-y-4">
//                                 {/* Skills List */}
//                                 <div className="flex flex-wrap gap-2">
//                                   {category.skills.map((skill, skillIndex) => (
//                                     <motion.div
//                                       key={skill.id}
//                                       initial={{ opacity: 0, scale: 0.9 }}
//                                       animate={{ opacity: 1, scale: 1 }}
//                                       transition={{ delay: skillIndex * 0.05 }}
//                                       className="group relative"
//                                     >
//                                       <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full hover:border-[#c40116] hover:shadow-sm transition-all">
//                                         <input
//                                           type="text"
//                                           value={skill.name}
//                                           onChange={(e) =>
//                                             updateCategorizedSkill(category.id, skill.id, e.target.value)
//                                           }
//                                           className="bg-transparent text-gray-700 text-sm focus:outline-none min-w-[60px]"
//                                           placeholder="Skill"
//                                         />
//                                         <button
//                                           onClick={() => deleteCategorizedSkill(category.id, skill.id)}
//                                           className="opacity-0 group-hover:opacity-100 transition-opacity"
//                                         >
//                                           <FiTrash2 className="w-3 h-3 text-gray-400 hover:text-[#c40116]" />
//                                         </button>
//                                       </div>
//                                     </motion.div>
//                                   ))}
//                                 </div>

//                                 {/* Add Skill Input */}
//                                 <div className="flex items-center gap-2 pt-2">
//                                   <input
//                                     type="text"
//                                     placeholder="Add a skill..."
//                                     className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 transition-all"
//                                     onKeyPress={(e) => {
//                                       if (e.key === "Enter") {
//                                         const input = e.target as HTMLInputElement;
//                                         addCategorizedSkill(category.id, input.value);
//                                         input.value = "";
//                                       }
//                                     }}
//                                   />
//                                   <button
//                                     onClick={(e) => {
//                                       const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
//                                       if (input) {
//                                         addCategorizedSkill(category.id, input.value);
//                                         input.value = "";
//                                       }
//                                     }}
//                                     className="p-2 bg-gray-100 rounded-lg hover:bg-[#c40116]/10 transition-colors"
//                                   >
//                                     <IoMdAdd className="w-5 h-5 text-gray-600" />
//                                   </button>
//                                 </div>
//                               </div>
//                             </motion.div>
//                           )}
//                         </AnimatePresence>
//                       </motion.div>
//                     ))}
//                   </div>

//                   {/* Add Category Button */}
//                   {!showAddCategory ? (
//                     <button
//                       onClick={() => setShowAddCategory(true)}
//                       className="w-full py-4 bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-gray-300 rounded-2xl hover:border-[#c40116] hover:bg-[#c40116]/5 transition-all group"
//                     >
//                       <div className="flex items-center justify-center gap-2">
//                         <FiPlus className="w-5 h-5 text-gray-500 group-hover:text-[#c40116]" />
//                         <span className="font-semibold text-gray-600 group-hover:text-[#c40116]">
//                           Add New Category
//                         </span>
//                       </div>
//                     </button>
//                   ) : (
//                     <motion.div
//                       initial={{ opacity: 0, y: -20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="p-5 bg-gray-50 rounded-2xl border border-gray-200"
//                     >
//                       <input
//                         type="text"
//                         value={newCategoryTitle}
//                         onChange={(e) => setNewCategoryTitle(e.target.value)}
//                         placeholder="Category name (e.g., Frontend, Backend, Tools)"
//                         className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 mb-3"
//                         autoFocus
//                         onKeyPress={(e) => e.key === "Enter" && addCategory()}
//                       />
//                       <div className="flex gap-3">
//                         <button
//                           onClick={addCategory}
//                           className="flex-1 px-4 py-2 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-lg font-medium hover:shadow-lg transition-all"
//                         >
//                           Add Category
//                         </button>
//                         <button
//                           onClick={() => {
//                             setShowAddCategory(false);
//                             setNewCategoryTitle("");
//                           }}
//                           className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </>
//               )}
//             </motion.div>
//           )}
//         </div>

//         {/* Navigation Buttons */}
//         <div className="shrink-0 pt-4 border-t border-gray-100 mt-2">
//           <div className="flex justify-between gap-4">
//             <button
//               className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
//               onClick={() => router.push("/resume-details/education")}
//             >
//               ← Back
//             </button>

//             <button
//               className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
//               onClick={() => {
//                 if (saveTimeoutRef.current) {
//                   clearTimeout(saveTimeoutRef.current);
//                 }
//                 const currentSkills = skillsMode === "simple" ? simpleSkills : categorizedSkills;
//                 saveToAPI(currentSkills).then(() => {
//                   router.push("/resume-details/summary");
//                 });
//               }}
//             >
//               Next Summary →
//             </button>
//           </div>
//         </div>

//         {/* Skills Tips Modal */}
//         <AnimatePresence>
//           {skillTipsClicked && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
//               >
//                 <div className="p-1 bg-gradient-to-r from-[#c40116] to-[#be0117]"></div>
//                 <div className="p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <div className="flex items-center gap-2">
//                       <FaRegLightbulb className="text-[#c40116] w-5 h-5" />
//                       <h3 className="text-xl font-semibold">Skills Tips</h3>
//                     </div>
//                     <button onClick={() => setSkillTipsClicked(false)} className="p-1 hover:bg-gray-100 rounded-lg">
//                       <FaTimes className="w-5 h-5 text-gray-500" />
//                     </button>
//                   </div>
//                   <div className="space-y-4">
//                     <div className="flex items-start gap-3">
//                       <FiCheckCircle className="text-green-500 mt-0.5" />
//                       <div>
//                         <p className="font-semibold">Keep it relevant</p>
//                         <p className="text-sm text-gray-600">Only list skills relevant to the job you're applying for</p>
//                       </div>
//                     </div>
//                     <div className="flex items-start gap-3">
//                       <FiCheckCircle className="text-green-500 mt-0.5" />
//                       <div>
//                         <p className="font-semibold">Use keywords</p>
//                         <p className="text-sm text-gray-600">Match keywords from the job description to pass ATS</p>
//                       </div>
//                     </div>
//                     <div className="flex items-start gap-3">
//                       <FiCheckCircle className="text-green-500 mt-0.5" />
//                       <div>
//                         <p className="font-semibold">Simple list works great</p>
//                         <p className="text-sm text-gray-600">Most recruiters prefer simple, clean skill lists</p>
//                       </div>
//                     </div>
//                     <div className="flex items-start gap-3">
//                       <FiXCircle className="text-red-500 mt-0.5" />
//                       <div>
//                         <p className="font-semibold">Avoid skill bars</p>
//                         <p className="text-sm text-gray-600">Self-rated skill levels (like 4/5) are unhelpful to recruiters</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>

//         {/* AI Response Popup */}
//         <AnimatePresence>
//           {showPopup && Airesponse && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[80vh]"
//               >
//                 <div className="p-1 bg-gradient-to-r from-[#c40116] to-[#be0117]"></div>
//                 <div className="p-6 overflow-y-auto max-h-[calc(80vh-2rem)]">
//                   <div className="flex justify-between items-center mb-4">
//                     <div className="flex items-center gap-2">
//                       <FaMagic className="text-[#c40116] w-5 h-5" />
//                       <h2 className="text-xl font-semibold">AI-Generated Skills</h2>
//                     </div>
//                     <button onClick={() => setShowPopup(false)} className="p-1 hover:bg-gray-100 rounded-lg">
//                       <FaTimes className="w-5 h-5 text-gray-500" />
//                     </button>
//                   </div>
//                   <p className="text-gray-500 text-sm mb-4">Click on any skill below to add it to your list</p>
//                   <div className="space-y-2">
//                     {Airesponse.map((item, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.05 }}
//                         onClick={() => insertAIResponse(item, index)}
//                         className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#c40116] hover:bg-[#c40116]/5 cursor-pointer transition-all group"
//                       >
//                         <BsArrowLeftCircleFill className="text-[#c40116] w-5 h-5 group-hover:scale-110 transition-transform" />
//                         <p className="text-gray-700">{item}</p>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// };

// export default SkillsForm;

// "use client";

// import React, {
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
// } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiCheckCircle, FiXCircle, FiChevronDown, FiTrash2, FiPlus,
//   FiGrid, FiList, FiEdit2, FiCheck, FiX, FiZap, FiTrendingUp,
//   FiArrowRight, FiSave, FiTag, FiFolderPlus, FiCpu, FiStar
// } from "react-icons/fi";
// import { CreateContext } from "@/app/context/CreateContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { BsArrowLeftCircleFill } from "react-icons/bs";
// import { FaRegLightbulb, FaTimes, FaGraduationCap, FaMagic } from "react-icons/fa";
// import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
// import { BsFillLightningFill } from "react-icons/bs";
// import { useRouter } from "next/navigation";
// import Stepper from "../../../components/resume/Steppers";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { API_URL } from "@/app/config/api";
// import { SimpleSkill, SkillCategory, SkillsType } from "@/app/types";

// type SkillsMode = "simple" | "categorized";

// const SkillsForm = () => {
//   const [skillTipsClicked, setSkillTipsClicked] = useState(false);
//   const [skillsMode, setSkillsMode] = useState<SkillsMode>("simple");
//   const router = useRouter();
//   const UseContext = useContext(CreateContext);
//   const contactId = UseContext?.contact?._id;

//   const { skills, setSkills, fullResumeData, setFullResumeData } = UseContext

//   const [simpleSkills, setSimpleSkills] = useState<SimpleSkill[]>([]);
//   const [newSkillInput, setNewSkillInput] = useState<string>("");
//   const [editingSkillId, setEditingSkillId] = useState<string | number | null>(null);
//   const [editingSkillValue, setEditingSkillValue] = useState<string>("");

//   const [categorizedSkills, setCategorizedSkills] = useState<SkillCategory[]>([]);
//   const [newCategoryTitle, setNewCategoryTitle] = useState<string>("");
//   const [showAddCategory, setShowAddCategory] = useState<boolean>(false);

//   const [Airesponse, setAiresponse] = useState<string[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [showPopup, setShowPopup] = useState<boolean>(false);
//   const [isSaving, setIsSaving] = useState<boolean>(false);
//   const [lastSavedData, setLastSavedData] = useState<string>("");
//   const [isInitialized, setIsInitialized] = useState<boolean>(false);

//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const initialLoadDone = useRef<boolean>(false);

//   // Initialize skills data
//   useEffect(() => {
//     if (isInitialized) return;

//     if (skills && Array.isArray(skills) && skills.length > 0) {
//       const firstSkill = skills[0] as any;
//       if (firstSkill?.title !== undefined) {
//         setSkillsMode("categorized");
//         const normalizedSkills = (skills as SkillCategory[]).map((cat) => ({
//           ...cat,
//           isOpen: cat.isOpen !== undefined ? cat.isOpen : true,
//         }));
//         setCategorizedSkills(normalizedSkills);
//       } else {
//         setSkillsMode("simple");
//         setSimpleSkills(skills as SimpleSkill[]);
//       }
//     }
//     setIsInitialized(true);
//   }, [skills, isInitialized]);

//   // Auto-save effect
//   useEffect(() => {
//     if (!initialLoadDone.current) return;
//     const currentSkills = skillsMode === "simple" ? simpleSkills : categorizedSkills;
//     if (fullResumeData && setFullResumeData) {
//       const updatedFullData = { ...fullResumeData, skills: currentSkills };
//       setFullResumeData(updatedFullData);
//       setLocalStorage("fullResumeData", updatedFullData);
//     }
//   }, [simpleSkills, categorizedSkills, skillsMode]);

//   const saveToAPI = async (skillsDataToSave: SimpleSkill[] | SkillCategory[]) => {
//     if (!contactId) return false;

//     const currentDataString = JSON.stringify(skillsDataToSave);
//     if (currentDataString === lastSavedData) return true;

//     setIsSaving(true);
//     try {
//       await axios.post(`${API_URL}/api/skill/update`, { skills: skillsDataToSave }, {
//         params: { contactId },
//       });
//       setLastSavedData(currentDataString);
//       if (setSkills) setSkills(skillsDataToSave);
//       return true;
//     } catch (err) {
//       toast.error("Failed to save Skills!");
//       return false;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const debouncedSave = useCallback((data: SimpleSkill[] | SkillCategory[]) => {
//     if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
//     saveTimeoutRef.current = setTimeout(() => saveToAPI(data), 1000);
//   }, [contactId, lastSavedData]);

//   // Simple mode functions
//   const addSimpleSkill = () => {
//     if (newSkillInput.trim()) {
//       const updated = [...simpleSkills, { id: Date.now(), name: newSkillInput.trim() }];
//       setSimpleSkills(updated);
//       debouncedSave(updated);
//       setNewSkillInput("");
//       toast.success("Skill added!");
//     }
//   };

//   const startEditingSkill = (skill: SimpleSkill) => {
//     setEditingSkillId(skill.id);
//     setEditingSkillValue(skill.name);
//   };

//   const saveEditingSkill = () => {
//     if (editingSkillId && editingSkillValue.trim()) {
//       const updated = simpleSkills.map(skill =>
//         skill.id === editingSkillId ? { ...skill, name: editingSkillValue.trim() } : skill
//       );
//       setSimpleSkills(updated);
//       debouncedSave(updated);
//     }
//     setEditingSkillId(null);
//     setEditingSkillValue("");
//     toast.success("Skill updated!");
//   };

//   const cancelEditing = () => {
//     setEditingSkillId(null);
//     setEditingSkillValue("");
//   };

//   const deleteSimpleSkill = (skillId: string | number) => {
//     const updated = simpleSkills.filter(skill => skill.id !== skillId);
//     setSimpleSkills(updated);
//     debouncedSave(updated);
//     toast.success("Skill removed!");
//   };

//   // Categorized mode functions
//   const addCategory = () => {
//     if (newCategoryTitle.trim()) {
//       const newCategory: SkillCategory = {
//         id: Date.now(),
//         title: newCategoryTitle.trim(),
//         skills: [],
//         isOpen: true,
//       };
//       const updated = [...categorizedSkills, newCategory];
//       setCategorizedSkills(updated);
//       debouncedSave(updated);
//       setNewCategoryTitle("");
//       setShowAddCategory(false);
//       toast.success("Category added!");
//     }
//   };

//   const deleteCategory = (categoryId: string | number) => {
//     const updated = categorizedSkills.filter(cat => cat.id !== categoryId);
//     setCategorizedSkills(updated);
//     debouncedSave(updated);
//     toast.success("Category removed!");
//   };

//   const toggleCategory = (categoryId: string | number) => {
//     const updated = categorizedSkills.map(cat =>
//       cat.id === categoryId ? { ...cat, isOpen: !cat.isOpen } : cat
//     );
//     setCategorizedSkills(updated);
//     debouncedSave(updated);
//   };

//   const addCategorizedSkill = (categoryId: string | number, skillName: string) => {
//     if (!skillName.trim()) return;
//     const updated = categorizedSkills.map(cat =>
//       cat.id === categoryId
//         ? { ...cat, skills: [...cat.skills, { id: Date.now(), name: skillName.trim() }] }
//         : cat
//     );
//     setCategorizedSkills(updated);
//     debouncedSave(updated);
//   };

//   const deleteCategorizedSkill = (categoryId: string | number, skillId: string | number) => {
//     const updated = categorizedSkills.map(cat =>
//       cat.id === categoryId
//         ? { ...cat, skills: cat.skills.filter(skill => skill.id !== skillId) }
//         : cat
//     );
//     setCategorizedSkills(updated);
//     debouncedSave(updated);
//     toast.success("Skill removed!");
//   };

//   const updateCategoryTitle = (categoryId: string | number, newTitle: string) => {
//     if (!newTitle.trim()) return;
//     const updated = categorizedSkills.map(cat =>
//       cat.id === categoryId ? { ...cat, title: newTitle.trim() } : cat
//     );
//     setCategorizedSkills(updated);
//     debouncedSave(updated);
//   };

//   // AI Functions
//   const handleSubmitAi = async () => {
//     setLoading(true);
//     setAiresponse(null);
//     try {
//       const experienceTitlesList = UseContext?.experiences?.map((item: any) => item.jobTitle) || [];
//       const response = await axios.post(`https://ai.aryuacademy.com/api/v1/resume/skills`, {
//         job_titles: experienceTitlesList,
//       });
//       setAiresponse(response.data?.skills || []);
//       setShowPopup(true);
//     } catch (err) {
//       toast.error("Failed to generate AI skills");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const insertAIResponse = (item: string, index: number) => {
//     if (skillsMode === "simple") {
//       const updated = [...simpleSkills, { id: Date.now(), name: item }];
//       setSimpleSkills(updated);
//       debouncedSave(updated);
//     } else {
//       if (categorizedSkills.length === 0) {
//         const newCategory: SkillCategory = {
//           id: Date.now(),
//           title: "Skills",
//           isOpen: true,
//           skills: [{ id: Date.now(), name: item }],
//         };
//         setCategorizedSkills([newCategory]);
//         debouncedSave([newCategory]);
//       } else {
//         const updated = categorizedSkills.map((cat, idx) =>
//           idx === 0 ? { ...cat, skills: [...cat.skills, { id: Date.now(), name: item }] } : cat
//         );
//         setCategorizedSkills(updated);
//         debouncedSave(updated);
//       }
//     }
//     if (Airesponse) {
//       const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
//       setAiresponse(newAiResponse.length > 0 ? newAiResponse : null);
//     }
//     toast.success("Skill added!");
//   };

//   // Sync with context
//   useEffect(() => {
//     if (initialLoadDone.current && setSkills) {
//       const currentSkills: SkillsType = skillsMode === "simple" ? simpleSkills : categorizedSkills;
//       if (JSON.stringify(currentSkills) !== JSON.stringify(skills)) {
//         setSkills(currentSkills);
//       }
//     }
//   }, [simpleSkills, categorizedSkills, skillsMode]);

//   useEffect(() => { initialLoadDone.current = true; }, []);
//   useEffect(() => () => { if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current); }, []);

//   const totalSkills = skillsMode === "simple" ? simpleSkills.length : categorizedSkills.reduce((sum, cat) => sum + cat.skills.length, 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
//       <div className="max-w-6xl mx-auto px-4 py-6">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20">
//                 <FaGraduationCap className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-800">Skills & Expertise</h1>
//                 <p className="text-slate-500 text-sm mt-0.5">
//                   {totalSkills} skill{totalSkills !== 1 ? "s" : ""} • Auto-saved
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               {/* Mode Toggle */}
//               <div className="bg-slate-100 rounded-xl p-1 flex gap-1">
//                 <button
//                   onClick={() => setSkillsMode("simple")}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                     skillsMode === "simple"
//                       ? "bg-white text-rose-600 shadow-sm"
//                       : "text-slate-600 hover:text-slate-800"
//                   }`}
//                 >
//                   <FiList className="w-4 h-4" />
//                   <span>Simple</span>
//                 </button>
//                 <button
//                   onClick={() => setSkillsMode("categorized")}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                     skillsMode === "categorized"
//                       ? "bg-white text-rose-600 shadow-sm"
//                       : "text-slate-600 hover:text-slate-800"
//                   }`}
//                 >
//                   <FiGrid className="w-4 h-4" />
//                   <span>Categories</span>
//                 </button>
//               </div>
//               <button
//                 onClick={handleSubmitAi}
//                 disabled={loading}
//                 className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-rose-500/25 transition-all disabled:opacity-50"
//               >
//                 {loading ? (
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   <FaMagic className="w-4 h-4" />
//                 )}
//                 <span>AI Suggest</span>
//               </button>
//               <button
//                 onClick={() => setSkillTipsClicked(true)}
//                 className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm hover:border-rose-300 hover:text-rose-600 transition-all"
//               >
//                 <FaRegLightbulb className="w-4 h-4" />
//                 <span className="hidden sm:inline">Tips</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//           {/* Simple Mode */}
//           {skillsMode === "simple" && (
//             <div className="p-6">
//               {/* Skills Grid */}
//               {simpleSkills.length > 0 ? (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
//                   {simpleSkills.map((skill) => (
//                     <motion.div
//                       key={skill.id}
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       className="group relative"
//                     >
//                       {editingSkillId === skill.id ? (
//                         <div className="flex items-center gap-2 p-2 bg-rose-50 border-2 border-rose-400 rounded-xl">
//                           <input
//                             type="text"
//                             value={editingSkillValue}
//                             onChange={(e) => setEditingSkillValue(e.target.value)}
//                             className="flex-1 px-2 py-1 bg-transparent text-sm focus:outline-none"
//                             autoFocus
//                             onKeyPress={(e) => e.key === "Enter" && saveEditingSkill()}
//                           />
//                           <button onClick={saveEditingSkill} className="p-1 text-green-600 hover:bg-green-50 rounded">
//                             <FiCheck className="w-4 h-4" />
//                           </button>
//                           <button onClick={cancelEditing} className="p-1 text-red-600 hover:bg-red-50 rounded">
//                             <FiX className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ) : (
//                         <div className="flex items-center justify-between gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl hover:border-rose-300 hover:shadow-md transition-all group">
//                           <span className="text-slate-700 text-sm font-medium truncate">{skill.name}</span>
//                           <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                             <button onClick={() => startEditingSkill(skill)} className="p-1 text-slate-400 hover:text-rose-600 rounded">
//                               <FiEdit2 className="w-3.5 h-3.5" />
//                             </button>
//                             <button onClick={() => deleteSimpleSkill(skill.id)} className="p-1 text-slate-400 hover:text-red-600 rounded">
//                               <FiTrash2 className="w-3.5 h-3.5" />
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </motion.div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-16">
//                   <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <FiTag className="w-10 h-10 text-slate-400" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-slate-700 mb-2">No skills added yet</h3>
//                   <p className="text-slate-400 text-sm">Start adding your professional skills below</p>
//                 </div>
//               )}

//               {/* Add Skill Input */}
//               <div className="flex gap-3">
//                 <div className="flex-1 relative">
//                   <input
//                     type="text"
//                     value={newSkillInput}
//                     onChange={(e) => setNewSkillInput(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && addSimpleSkill()}
//                     placeholder="Type a skill and press Enter..."
//                     className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
//                   />
//                 </div>
//                 <button
//                   onClick={addSimpleSkill}
//                   className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
//                 >
//                   <IoMdAdd className="w-5 h-5" />
//                   <span>Add Skill</span>
//                 </button>
//               </div>

//               {/* Popular Suggestions */}
//               {simpleSkills.length === 0 && (
//                 <div className="mt-6 pt-4 border-t border-slate-100">
//                   <p className="text-xs text-slate-500 mb-3 flex items-center gap-2">
//                     <FiTrendingUp className="w-3.5 h-3.5" />
//                     Popular suggestions
//                   </p>
//                   <div className="flex flex-wrap gap-2">
//                     {["React.js", "Node.js", "TypeScript", "Python", "AWS", "Docker", "PostgreSQL", "Next.js"].map((suggestion) => (
//                       <button
//                         key={suggestion}
//                         onClick={() => {
//                           setNewSkillInput(suggestion);
//                           setTimeout(() => addSimpleSkill(), 50);
//                         }}
//                         className="px-3 py-1.5 text-xs bg-slate-100 text-slate-600 rounded-full hover:bg-rose-100 hover:text-rose-600 transition-all"
//                       >
//                         + {suggestion}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Categorized Mode */}
//           {skillsMode === "categorized" && (
//             <div className="p-6">
//               {categorizedSkills.length === 0 ? (
//                 <div className="text-center py-16">
//                   <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <FiFolderPlus className="w-10 h-10 text-slate-400" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-slate-700 mb-2">No categories yet</h3>
//                   <p className="text-slate-400 text-sm mb-6">Create categories to organize your skills</p>
//                   <button
//                     onClick={() => setShowAddCategory(true)}
//                     className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl font-medium inline-flex items-center gap-2 hover:shadow-lg transition-all"
//                   >
//                     <FiPlus className="w-5 h-5" />
//                     Create First Category
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {categorizedSkills.map((category) => (
//                     <motion.div
//                       key={category.id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="border border-slate-200 rounded-xl overflow-hidden"
//                     >
//                       <div
//                         onClick={() => toggleCategory(category.id)}
//                         className="flex items-center justify-between p-4 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
//                       >
//                         <div className="flex items-center gap-3">
//                           <motion.div animate={{ rotate: category.isOpen ? 90 : 0 }} className="text-slate-400">
//                             <FiChevronDown className="w-5 h-5" />
//                           </motion.div>
//                           <input
//                             type="text"
//                             value={category.title}
//                             onChange={(e) => updateCategoryTitle(category.id, e.target.value)}
//                             onClick={(e) => e.stopPropagation()}
//                             className="font-semibold text-slate-800 bg-transparent px-2 py-1 rounded focus:outline-none focus:bg-white focus:ring-2 focus:ring-rose-200"
//                           />
//                           <span className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded-full">
//                             {category.skills.length}
//                           </span>
//                         </div>
//                         <button
//                           onClick={(e) => { e.stopPropagation(); deleteCategory(category.id); }}
//                           className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
//                         >
//                           <FiTrash2 className="w-4 h-4" />
//                         </button>
//                       </div>

//                       <AnimatePresence>
//                         {category.isOpen && (
//                           <motion.div
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: "auto" }}
//                             exit={{ opacity: 0, height: 0 }}
//                             className="border-t border-slate-100"
//                           >
//                             <div className="p-4">
//                               <div className="flex flex-wrap gap-2 mb-4">
//                                 {category.skills.map((skill) => (
//                                   <div
//                                     key={skill.id}
//                                     className="group flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full hover:border-rose-300 hover:shadow-sm transition-all"
//                                   >
//                                     <span className="text-sm text-slate-700">{skill.name}</span>
//                                     <button
//                                       onClick={() => deleteCategorizedSkill(category.id, skill.id)}
//                                       className="opacity-0 group-hover:opacity-100 transition-opacity"
//                                     >
//                                       <FiX className="w-3.5 h-3.5 text-slate-400 hover:text-red-600" />
//                                     </button>
//                                   </div>
//                                 ))}
//                               </div>
//                               <div className="flex gap-2">
//                                 <input
//                                   type="text"
//                                   placeholder="Add a skill..."
//                                   className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
//                                   onKeyPress={(e) => {
//                                     if (e.key === "Enter") {
//                                       const input = e.target as HTMLInputElement;
//                                       addCategorizedSkill(category.id, input.value);
//                                       input.value = "";
//                                     }
//                                   }}
//                                 />
//                                 <button
//                                   onClick={(e) => {
//                                     const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
//                                     if (input) {
//                                       addCategorizedSkill(category.id, input.value);
//                                       input.value = "";
//                                     }
//                                   }}
//                                   className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-rose-100 hover:text-rose-600 transition-colors"
//                                 >
//                                   <IoMdAdd className="w-5 h-5" />
//                                 </button>
//                               </div>
//                             </div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </motion.div>
//                   ))}

//                   {!showAddCategory ? (
//                     <button
//                       onClick={() => setShowAddCategory(true)}
//                       className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
//                     >
//                       <FiPlus className="w-5 h-5" />
//                       <span className="font-medium">Add New Category</span>
//                     </button>
//                   ) : (
//                     <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
//                       <input
//                         type="text"
//                         value={newCategoryTitle}
//                         onChange={(e) => setNewCategoryTitle(e.target.value)}
//                         placeholder="Category name (e.g., Frontend, Backend, Tools)"
//                         className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 mb-3"
//                         autoFocus
//                         onKeyPress={(e) => e.key === "Enter" && addCategory()}
//                       />
//                       <div className="flex gap-3">
//                         <button onClick={addCategory} className="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg font-medium hover:bg-rose-600 transition-colors">
//                           Add Category
//                         </button>
//                         <button onClick={() => { setShowAddCategory(false); setNewCategoryTitle(""); }} className="flex-1 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors">
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex justify-between gap-4 mt-6">
//           <button
//             onClick={() => router.push("/resume-details/education")}
//             className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 hover:border-slate-300 transition-all"
//           >
//             ← Back
//           </button>
//           <button
//             onClick={() => {
//               if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
//               const currentSkills = skillsMode === "simple" ? simpleSkills : categorizedSkills;
//               saveToAPI(currentSkills).then(() => router.push("/resume-details/summary"));
//             }}
//             className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
//           >
//             Continue to Summary
//             <FiArrowRight className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Auto-save Toast */}
//         <AnimatePresence>
//           {isSaving && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               className="fixed bottom-6 right-6 flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-xl shadow-lg"
//             >
//               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               <span className="text-sm">Saving...</span>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Tips Modal */}
//         <AnimatePresence>
//           {skillTipsClicked && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
//               >
//                 <div className="p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <div className="flex items-center gap-2">
//                       <FaRegLightbulb className="text-rose-500 w-5 h-5" />
//                       <h3 className="text-xl font-semibold">Pro Tips</h3>
//                     </div>
//                     <button onClick={() => setSkillTipsClicked(false)} className="p-1 hover:bg-slate-100 rounded-lg">
//                       <FaTimes className="w-5 h-5 text-slate-500" />
//                     </button>
//                   </div>
//                   <div className="space-y-4">
//                     {[
//                       { icon: <FiCheckCircle className="text-emerald-500" />, title: "Be Relevant", desc: "Only list skills relevant to your target role" },
//                       { icon: <FiCheckCircle className="text-emerald-500" />, title: "Use Keywords", desc: "Match keywords from job descriptions to pass ATS" },
//                       { icon: <FiCheckCircle className="text-emerald-500" />, title: "Keep it Clean", desc: "Simple lists work better than skill bars" },
//                       { icon: <FiXCircle className="text-red-500" />, title: "Avoid Ratings", desc: "Self-rated skill levels are unhelpful to recruiters" },
//                     ].map((tip, i) => (
//                       <div key={i} className="flex items-start gap-3">
//                         <div className="mt-0.5">{tip.icon}</div>
//                         <div>
//                           <p className="font-semibold text-slate-800">{tip.title}</p>
//                           <p className="text-sm text-slate-500">{tip.desc}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>

//         {/* AI Popup */}
//         <AnimatePresence>
//           {showPopup && Airesponse && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[80vh]"
//               >
//                 <div className="p-6 overflow-y-auto">
//                   <div className="flex justify-between items-center mb-4">
//                     <div className="flex items-center gap-2">
//                       <FiZap className="text-rose-500 w-5 h-5" />
//                       <h2 className="text-xl font-semibold">AI Recommendations</h2>
//                     </div>
//                     <button onClick={() => setShowPopup(false)} className="p-1 hover:bg-slate-100 rounded-lg">
//                       <FaTimes className="w-5 h-5 text-slate-500" />
//                     </button>
//                   </div>
//                   <p className="text-slate-500 text-sm mb-4">Click any skill to add it to your list</p>
//                   <div className="flex flex-wrap gap-2">
//                     {Airesponse.map((item, index) => (
//                       <motion.button
//                         key={index}
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: index * 0.05 }}
//                         onClick={() => insertAIResponse(item, index)}
//                         className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
//                       >
//                         {item}
//                       </motion.button>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default SkillsForm;

"use client";

import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiXCircle,
  FiChevronDown,
  FiTrash2,
  FiPlus,
  FiGrid,
  FiList,
  FiEdit2,
  FiCheck,
  FiX,
  FiZap,
  FiTrendingUp,
  FiArrowRight,
  FiSave,
  FiTag,
  FiFolderPlus,
  FiCpu,
  FiStar,
} from "react-icons/fi";
import { CreateContext } from "@/app/context/CreateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import {
  FaRegLightbulb,
  FaTimes,
  FaGraduationCap,
  FaMagic,
} from "react-icons/fa";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { BsFillLightningFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Stepper from "../../../components/resume/Steppers";
import { getLocalStorage, setLocalStorage } from "@/app/utils";
import { API_URL } from "@/app/config/api";
import { SimpleSkill, SkillCategory, SkillsType } from "@/app/types";

type SkillsMode = "simple" | "categorized";

const SkillsForm = () => {
  const [skillTipsClicked, setSkillTipsClicked] = useState(false);
  const [skillsMode, setSkillsMode] = useState<SkillsMode>("simple");
  const router = useRouter();
  const UseContext = useContext(CreateContext);
  const contactId = UseContext?.contact?._id;

  const { skills, setSkills, fullResumeData, setFullResumeData } = UseContext;

  console.log("skills", skills);

  const [simpleSkills, setSimpleSkills] = useState<SimpleSkill[]>([]);
  const [newSkillInput, setNewSkillInput] = useState<string>("");
  const [editingSkillId, setEditingSkillId] = useState<string | number | null>(
    null,
  );
  const [editingSkillValue, setEditingSkillValue] = useState<string>("");

  const [categorizedSkills, setCategorizedSkills] = useState<SkillCategory[]>(
    [],
  );
  const [newCategoryTitle, setNewCategoryTitle] = useState<string>("");
  const [showAddCategory, setShowAddCategory] = useState<boolean>(false);

  const [Airesponse, setAiresponse] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSavedData, setLastSavedData] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialLoadDone = useRef<boolean>(false);

  // Initialize skills data
  useEffect(() => {
    if (isInitialized) return;

    if (skills && Array.isArray(skills) && skills.length > 0) {
      const firstSkill = skills[0] as any;
      if (firstSkill?.title !== undefined) {
        setSkillsMode("categorized");
        const normalizedSkills = (skills as SkillCategory[]).map((cat) => ({
          ...cat,
          isOpen: cat.isOpen !== undefined ? cat.isOpen : true,
        }));
        setCategorizedSkills(normalizedSkills);
      } else {
        setSkillsMode("simple");
        setSimpleSkills(skills as SimpleSkill[]);
      }
    }
    setIsInitialized(true);
  }, [skills, isInitialized]);

  // Auto-save effect
  useEffect(() => {
    if (!initialLoadDone.current) return;
    const currentSkills =
      skillsMode === "simple" ? simpleSkills : categorizedSkills;
    if (fullResumeData && setFullResumeData) {
      const updatedFullData = { ...fullResumeData, skills: currentSkills };
      setFullResumeData(updatedFullData);
      setLocalStorage("fullResumeData", updatedFullData);
    }
  }, [simpleSkills, categorizedSkills, skillsMode]);

  const saveToAPI = async (
    skillsDataToSave: SimpleSkill[] | SkillCategory[],
  ) => {
    if (!contactId) return false;

  
    console.log("skillsDataToSave",skillsDataToSave)

    const currentDataString = JSON.stringify(skillsDataToSave);
    if (currentDataString === lastSavedData) return true;

    setIsSaving(true);
    try {
      await axios.post(
        `${API_URL}/api/skill/update`,
        { skills: skillsDataToSave },
        {
          params: { contactId },
        },
      );
      setLastSavedData(currentDataString);
      if (setSkills) setSkills(skillsDataToSave);
      fetchSkill();
      return true;
    } catch (err) {
      toast.error("Failed to save Skills!");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const fetchSkill = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/skill/get-skill/${contactId}`,
      );

      console.log("skills response", response);

      const skillsList = response.data?.[0]?.skills || [];

      if (skillsList.length > 0) {
        //  const formattedData = skillsList.map((item: any) => ({
        //    id: item._id || Date.now(),
        //    skill: item?.skill || "",
        //     Ensure level is stored as 1-5, default to 3 if not set
        //    level: item?.level !== undefined ? item.level : 3,
        //    error: {},
        //  }));
        //  setSkills(formattedData);
        //  setLastSavedData(JSON.stringify(formattedData));
      } else {
        console.log("No skills data found for user");
      }

      initialLoadDone.current = true;
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedSave = useCallback(
    (data: SimpleSkill[] | SkillCategory[]) => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => saveToAPI(data), 1000);
    },
    [contactId, lastSavedData],
  );

  // Simple mode functions
  const addSimpleSkill = () => {
    if (newSkillInput.trim()) {
      const updated = [
        ...simpleSkills,
        { id: Date.now(), name: newSkillInput.trim() },
      ];
      setSimpleSkills(updated);
      debouncedSave(updated);
      setNewSkillInput("");
      toast.success("Skill added!");
    }
  };

  const startEditingSkill = (skill: SimpleSkill) => {
    setEditingSkillId(skill.id);
    setEditingSkillValue(skill.name);
  };

  const saveEditingSkill = () => {
    if (editingSkillId && editingSkillValue.trim()) {
      const updated = simpleSkills.map((skill) =>
        skill.id === editingSkillId
          ? { ...skill, name: editingSkillValue.trim() }
          : skill,
      );
      setSimpleSkills(updated);
      debouncedSave(updated);
    }
    setEditingSkillId(null);
    setEditingSkillValue("");
    toast.success("Skill updated!");
  };

  const cancelEditing = () => {
    setEditingSkillId(null);
    setEditingSkillValue("");
  };

  const deleteSimpleSkill = (skillId: string | number) => {
    const updated = simpleSkills.filter((skill) => skill.id !== skillId);
    setSimpleSkills(updated);
    debouncedSave(updated);
    toast.success("Skill removed!");
  };

  // Categorized mode functions
  const addCategory = () => {
    if (newCategoryTitle.trim()) {
      const newCategory: SkillCategory = {
        id: Date.now(),
        title: newCategoryTitle.trim(),
        skills: [],
        isOpen: true,
      };
      const updated = [...categorizedSkills, newCategory];
      setCategorizedSkills(updated);
      debouncedSave(updated);
      setNewCategoryTitle("");
      setShowAddCategory(false);
      toast.success("Category added!");
    }
  };

  const deleteCategory = (categoryId: string | number) => {
    const updated = categorizedSkills.filter((cat) => cat.id !== categoryId);
    setCategorizedSkills(updated);
    debouncedSave(updated);
    toast.success("Category removed!");
  };

  const toggleCategory = (categoryId: string | number) => {
    const updated = categorizedSkills.map((cat) =>
      cat.id === categoryId ? { ...cat, isOpen: !cat.isOpen } : cat,
    );
    setCategorizedSkills(updated);
    debouncedSave(updated);
  };

  const addCategorizedSkill = (
    categoryId: string | number,
    skillName: string,
  ) => {
    if (!skillName.trim()) return;
    const updated = categorizedSkills.map((cat) =>
      cat.id === categoryId
        ? {
            ...cat,
            skills: [...cat.skills, { id: Date.now(), name: skillName.trim() }],
          }
        : cat,
    );
    setCategorizedSkills(updated);
    debouncedSave(updated);
  };

  const deleteCategorizedSkill = (
    categoryId: string | number,
    skillId: string | number,
  ) => {
    const updated = categorizedSkills.map((cat) =>
      cat.id === categoryId
        ? { ...cat, skills: cat.skills.filter((skill) => skill.id !== skillId) }
        : cat,
    );
    setCategorizedSkills(updated);
    debouncedSave(updated);
    toast.success("Skill removed!");
  };

  const updateCategoryTitle = (
    categoryId: string | number,
    newTitle: string,
  ) => {
    if (!newTitle.trim()) return;
    const updated = categorizedSkills.map((cat) =>
      cat.id === categoryId ? { ...cat, title: newTitle.trim() } : cat,
    );
    setCategorizedSkills(updated);
    debouncedSave(updated);
  };

  // AI Functions
  const handleSubmitAi = async () => {
    setLoading(true);
    setAiresponse(null);
    try {
      const experienceTitlesList =
        UseContext?.experiences?.map((item: any) => item.jobTitle) || [];
      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/resume/skills`,
        {
          job_titles: experienceTitlesList,
        },
      );
      setAiresponse(response.data?.skills || []);
      setShowPopup(true);
    } catch (err) {
      toast.error("Failed to generate AI skills");
    } finally {
      setLoading(false);
    }
  };

  const insertAIResponse = (item: string, index: number) => {
    if (skillsMode === "simple") {
      const updated = [...simpleSkills, { id: Date.now(), name: item }];
      setSimpleSkills(updated);
      debouncedSave(updated);
    } else {
      if (categorizedSkills.length === 0) {
        const newCategory: SkillCategory = {
          id: Date.now(),
          title: "Skills",
          isOpen: true,
          skills: [{ id: Date.now(), name: item }],
        };
        setCategorizedSkills([newCategory]);
        debouncedSave([newCategory]);
      } else {
        const updated = categorizedSkills.map((cat, idx) =>
          idx === 0
            ? {
                ...cat,
                skills: [...cat.skills, { id: Date.now(), name: item }],
              }
            : cat,
        );
        setCategorizedSkills(updated);
        debouncedSave(updated);
      }
    }
    if (Airesponse) {
      const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
      setAiresponse(newAiResponse.length > 0 ? newAiResponse : null);
    }
    toast.success("Skill added!");
  };

  // Sync with context
  useEffect(() => {
    if (initialLoadDone.current && setSkills) {
      const currentSkills: SkillsType =
        skillsMode === "simple" ? simpleSkills : categorizedSkills;
      if (JSON.stringify(currentSkills) !== JSON.stringify(skills)) {
        setSkills(currentSkills);
      }
    }
  }, [simpleSkills, categorizedSkills, skillsMode]);

  useEffect(() => {
    initialLoadDone.current = true;
  }, []);
  useEffect(
    () => () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    },
    [],
  );

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="py-2 lg:py-3 px-3 md:px-4 lg:px-5 bg-white rounded-xl sm:rounded-2xl shadow-soft h-full flex flex-col">
        <Stepper />

        {/* Main Content */}
        <div className="bg-white  overflow-hidden pb-5 mt-5">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20">
                  <FaGraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    Skills & Expertise
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-between w-full">
                {/* Mode Toggle */}
                <div className="bg-slate-100 rounded-xl p-1 flex gap-1">
                  <button
                    onClick={() => setSkillsMode("simple")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      skillsMode === "simple"
                        ? "bg-white text-rose-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    <FiList className="w-4 h-4" />
                    <span>Simple</span>
                  </button>
                  <button
                    onClick={() => setSkillsMode("categorized")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      skillsMode === "categorized"
                        ? "bg-white text-rose-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    <FiGrid className="w-4 h-4" />
                    <span>Categories</span>
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleSubmitAi}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-rose-500/25 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FaMagic className="w-4 h-4" />
                    )}
                    <span>AI Suggest</span>
                  </button>
                  <button
                    onClick={() => setSkillTipsClicked(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm hover:border-rose-300 hover:text-rose-600 transition-all"
                  >
                    <FaRegLightbulb className="w-4 h-4" />
                    <span className="max-sm:hidden sm:inline">Tips</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl shadow-sm border border-slate-200">
            {/* Simple Mode */}
            {skillsMode === "simple" && (
              <div className="p-6">
                {/* Skills Grid */}
                {simpleSkills.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
                    {simpleSkills.map((skill) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="group relative"
                      >
                        {editingSkillId === skill.id ? (
                          <div className="flex items-center gap-2 p-2 bg-rose-50 border-2 border-rose-400 rounded-xl">
                            <input
                              type="text"
                              value={editingSkillValue}
                              onChange={(e) =>
                                setEditingSkillValue(e.target.value)
                              }
                              className="flex-1 px-2 py-1 bg-transparent text-sm focus:outline-none"
                              autoFocus
                              onKeyPress={(e) =>
                                e.key === "Enter" && saveEditingSkill()
                              }
                            />
                            <button
                              onClick={saveEditingSkill}
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                            >
                              <FiCheck className="w-4 h-4" />
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl hover:border-rose-300 hover:shadow-md transition-all group">
                            <span className="text-slate-700 text-sm font-medium truncate">
                              {skill.name}
                            </span>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => startEditingSkill(skill)}
                                className="p-1 text-slate-400 hover:text-rose-600 rounded"
                              >
                                <FiEdit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteSimpleSkill(skill.id)}
                                className="p-1 text-slate-400 hover:text-red-600 rounded"
                              >
                                <FiTrash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiTag className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">
                      No skills added yet
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Start adding your professional skills below
                    </p>
                  </div>
                )}

                {/* Add Skill Input */}
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSimpleSkill()}
                      placeholder="Type a skill and press Enter..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
                    />
                  </div>
                  <button
                    onClick={addSimpleSkill}
                    className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <IoMdAdd className="w-5 h-5" />
                    <span>Add Skill</span>
                  </button>
                </div>

                {/* Popular Suggestions */}
                {simpleSkills.length === 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500 mb-3 flex items-center gap-2">
                      <FiTrendingUp className="w-3.5 h-3.5" />
                      Popular suggestions
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React.js",
                        "Node.js",
                        "TypeScript",
                        "Python",
                        "AWS",
                        "Docker",
                        "PostgreSQL",
                        "Next.js",
                      ].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => {
                            setNewSkillInput(suggestion);
                            setTimeout(() => addSimpleSkill(), 50);
                          }}
                          className="px-3 py-1.5 text-xs bg-slate-100 text-slate-600 rounded-full hover:bg-rose-100 hover:text-rose-600 transition-all"
                        >
                          + {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Categorized Mode - FIXED VERSION */}
            {skillsMode === "categorized" && (
              <div className="p-6">
                {/* Show existing categories if any */}
                {categorizedSkills.length > 0 && (
                  <div className="space-y-4 mb-6">
                    {categorizedSkills.map((category) => (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-slate-200 rounded-xl overflow-hidden"
                      >
                        <div
                          onClick={() => toggleCategory(category.id)}
                          className="flex items-center justify-between p-4 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <motion.div
                              animate={{ rotate: category.isOpen ? 90 : 0 }}
                              className="text-slate-400"
                            >
                              <FiChevronDown className="w-5 h-5" />
                            </motion.div>
                            <input
                              type="text"
                              value={category.title}
                              onChange={(e) =>
                                updateCategoryTitle(category.id, e.target.value)
                              }
                              onClick={(e) => e.stopPropagation()}
                              className="font-semibold text-slate-800 bg-transparent px-2 py-1 rounded focus:outline-none focus:bg-white focus:ring-2 focus:ring-rose-200"
                            />
                            <span className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded-full">
                              {category.skills.length}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteCategory(category.id);
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <AnimatePresence>
                          {category.isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="border-t border-slate-100"
                            >
                              <div className="p-4">
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {category.skills.map((skill) => (
                                    <div
                                      key={skill.id}
                                      className="group flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full hover:border-rose-300 hover:shadow-sm transition-all"
                                    >
                                      <span className="text-sm text-slate-700">
                                        {skill.name}
                                      </span>
                                      <button
                                        onClick={() =>
                                          deleteCategorizedSkill(
                                            category.id,
                                            skill.id,
                                          )
                                        }
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <FiX className="w-3.5 h-3.5 text-slate-400 hover:text-red-600" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    placeholder="Add a skill..."
                                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                                    onKeyPress={(e) => {
                                      if (e.key === "Enter") {
                                        const input =
                                          e.target as HTMLInputElement;
                                        addCategorizedSkill(
                                          category.id,
                                          input.value,
                                        );
                                        input.value = "";
                                      }
                                    }}
                                  />
                                  <button
                                    onClick={(e) => {
                                      const input = (e.target as HTMLElement)
                                        .previousElementSibling as HTMLInputElement;
                                      if (input) {
                                        addCategorizedSkill(
                                          category.id,
                                          input.value,
                                        );
                                        input.value = "";
                                      }
                                    }}
                                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-rose-100 hover:text-rose-600 transition-colors"
                                  >
                                    <IoMdAdd className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Add Category Section - Always visible */}
                {!showAddCategory ? (
                  <button
                    onClick={() => setShowAddCategory(true)}
                    className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
                  >
                    <FiPlus className="w-5 h-5" />
                    <span className="font-medium">
                      {categorizedSkills.length === 0
                        ? "Create First Category"
                        : "Add New Category"}
                    </span>
                  </button>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <input
                      type="text"
                      value={newCategoryTitle}
                      onChange={(e) => setNewCategoryTitle(e.target.value)}
                      placeholder="Category name (e.g., Frontend, Backend, Tools)"
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 mb-3"
                      autoFocus
                      onKeyPress={(e) => e.key === "Enter" && addCategory()}
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={addCategory}
                        className="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg font-medium hover:bg-rose-600 transition-colors"
                      >
                        Add Category
                      </button>
                      <button
                        onClick={() => {
                          setShowAddCategory(false);
                          setNewCategoryTitle("");
                        }}
                        className="flex-1 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={() => router.push("/resume-details/education")}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            ← Back
          </button>
          <button
            onClick={() => {
              if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
              const currentSkills =
                skillsMode === "simple" ? simpleSkills : categorizedSkills;
              saveToAPI(currentSkills).then(() =>
                router.push("/resume-details/summary"),
              );
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Continue to Summary
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Auto-save Toast */}
        <AnimatePresence>
          {isSaving && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-xl shadow-lg"
            >
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Saving...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips Modal */}
        <AnimatePresence>
          {skillTipsClicked && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <FaRegLightbulb className="text-rose-500 w-5 h-5" />
                      <h3 className="text-xl font-semibold">Pro Tips</h3>
                    </div>
                    <button
                      onClick={() => setSkillTipsClicked(false)}
                      className="p-1 hover:bg-slate-100 rounded-lg"
                    >
                      <FaTimes className="w-5 h-5 text-slate-500" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        icon: <FiCheckCircle className="text-emerald-500" />,
                        title: "Be Relevant",
                        desc: "Only list skills relevant to your target role",
                      },
                      {
                        icon: <FiCheckCircle className="text-emerald-500" />,
                        title: "Use Keywords",
                        desc: "Match keywords from job descriptions to pass ATS",
                      },
                      {
                        icon: <FiCheckCircle className="text-emerald-500" />,
                        title: "Keep it Clean",
                        desc: "Simple lists work better than skill bars",
                      },
                      {
                        icon: <FiXCircle className="text-red-500" />,
                        title: "Avoid Ratings",
                        desc: "Self-rated skill levels are unhelpful to recruiters",
                      },
                    ].map((tip, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5">{tip.icon}</div>
                        <div>
                          <p className="font-semibold text-slate-800">
                            {tip.title}
                          </p>
                          <p className="text-sm text-slate-500">{tip.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* AI Popup */}
        <AnimatePresence>
          {showPopup && Airesponse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[80vh]"
              >
                <div className="p-6 overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <FiZap className="text-rose-500 w-5 h-5" />
                      <h2 className="text-xl font-semibold">
                        AI Recommendations
                      </h2>
                    </div>
                    <button
                      onClick={() => setShowPopup(false)}
                      className="p-1 hover:bg-slate-100 rounded-lg"
                    >
                      <FaTimes className="w-5 h-5 text-slate-500" />
                    </button>
                  </div>
                  <p className="text-slate-500 text-sm mb-4">
                    Click any skill to add it to your list
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Airesponse.map((item, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => insertAIResponse(item, index)}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                      >
                        {item}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillsForm;
