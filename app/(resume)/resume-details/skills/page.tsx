// "use client";

// import React, {
//   useContext,
//   useState,
//   useEffect,
//   useImperativeHandle,
//   forwardRef,
//   ForwardedRef,
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

// // // Define interfaces
// // interface Skill {
// //   id: string | number;
// //   skill: string;
// //   level: number | null;
// //   error?: {
// //     skill?: string;
// //   };
// // }

// interface SkillsFormProps {
//   // Add any props you need here
// }

// interface SkillsFormRef {
//   handleSubmit: (e?: React.FormEvent) => Promise<boolean>;
// }

// const steps = ["Beginner", "Basic", "Intermediate", "Advanced", "Expert"];

// const SkillsForm = forwardRef<SkillsFormRef, SkillsFormProps>((props, ref) => {
//   const UseContext = useContext(CreateContext);
//   const Contactid = UseContext?.contactid;
//   const [isActive, setIsActive] = useState(true);
//   const stepWidth = 55;

//   const { skills, setSkills } = UseContext || {
//     skills: [],
//     setSkills: () => {},
//   };
//   const [Airesponse, setAireseponse] = useState<string[] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);

//   const addExperience = () => {
//     setSkills([
//       ...skills,
//       { skill: "", level: isActive ? 2 : null, id: Date.now() + Math.random() },
//     ]);
//   };

//   const handleSubmitAi = async () => {
//     setLoading(true);
//     setAireseponse(null);

//     try {
//       let experienceTitlesList =
//         UseContext?.experiences?.map((item: any) => item.jobTitle) || [];

//       const formData = {
//         job_title: experienceTitlesList,
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
//     if (!skills[0]?.skill) {
//       setSkills([{ skill: item, level: 2, id: Date.now() + Math.random() }]);
//     } else {
//       const updated = [
//         ...skills,
//         { skill: item, level: 2, id: Date.now() + Math.random() },
//       ];
//       setSkills(updated);
//     }

//     if (Airesponse) {
//       const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
//       setAireseponse(newAiResponse.length > 0 ? newAiResponse : null);
//     }
//   };

//   const fetchSkill = async () => {
//     try {
//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
//       const response = await axios.get(
//         `${API_URL}/api/skill/get-skill/${Contactid}`,
//       );

//       const skillsList = response.data?.[0]?.skills || [];

//       if (skillsList.length > 0) {
//         const formattedData = skillsList.map((item: any) => ({
//           id: item._id || Date.now(),
//           skill: item?.skill || "",
//           level: item?.level || null,
//         }));

//         setSkills(formattedData);
//       } else {
//         console.log("No skills data found for user");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (Contactid) {
//       fetchSkill();
//     }
//   }, [Contactid]);

//   const handleSubmit = async (e?: React.FormEvent) => {
//     if (e) e.preventDefault();

//     let isValid = true;

//     // Validate each skill
//     const updatedSkills = skills.map((exp) => {
//       const newErrors: Record<string, string> = {};

//       // Validate skill name
//       if (!exp.skill?.trim()) {
//         newErrors.skill = "Skill name is required";
//         isValid = false;
//       }

//       return { ...exp, error: newErrors };
//     });

//     setSkills(updatedSkills);

//     if (!isValid) {
//       toast.error("Please fix the validation errors");
//       return false;
//     }

//     try {
//       const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
//       const formData = {
//         skills,
//       };

//       const response = await axios.post(
//         `${API_URL}/api/skill/update`,
//         formData,
//         { params: { contactId: Contactid } },
//       );

//       toast.success("Skills saved successfully!");
//       return true;
//     } catch (err: any) {
//       console.error("Error sending message:", err);
//       toast.error("Failed to save Skills!");
//       return false;
//     }
//   };

//   useImperativeHandle(ref, () => ({
//     handleSubmit,
//   }));

//   const handleInputChange = (skillsSectionIndex: number, value: string) => {
//     const updatedSkills = [...skills];
//     updatedSkills[skillsSectionIndex].skill = value;
//     setSkills(updatedSkills);
//   };

//   // Update skill or level individually
//   const handleStepsChange = (
//     skillsSectionIndex: number,
//     stepsIndex: number,
//   ) => {
//     const updatedSkills = [...skills];
//     updatedSkills[skillsSectionIndex].level = stepsIndex;
//     setSkills(updatedSkills);
//   };

//   const toggleActive = () => {
//     setIsActive((prev) => {
//       const newActive = !prev;

//       setSkills((prevSkills) =>
//         prevSkills.map((exp) => ({
//           ...exp,
//           level: newActive ? (exp.level === null ? 2 : exp.level) : null,
//         })),
//       );

//       return newActive;
//     });
//   };

//   // Delete a skill
//   const handleDelete = (skillsSectionIndex: number) => {
//     setSkills((prev) =>
//       prev.filter((_, index) => index !== skillsSectionIndex),
//     );
//   };

//   const [skillTipsClicked, setSkillTipsClicked] = useState(false);
//   const router = useRouter();

//   return (
//     <section className="relative h-screen overflow-hidden">
//       <div className="p-3 md:p-4 lg:p-5 bg-white rounded-xl sm:rounded-2xl shadow-soft h-full flex flex-col">
//         {/* Header Section */}
//           <Stepper/>

//         <div className="flex-1 overflow-y-auto pb-5 mt-3">

//           <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 mb-3">
//             <div className="flex items-center gap-2 sm:gap-3">
//               <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//                 <FaGraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]" />
//               </div>
//               <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
//                 Skills
//               </h1>
//             </div>

//             <div className="flex justify-end">
//               <button
//                 onClick={() => setSkillTipsClicked((prev) => !prev)}
//                 className="flex items-center justify-center xs:justify-start gap-2 bg-linear-to-r from-white to-gray-50/80 border border-gray-200 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-gray-700 text-xs sm:text-sm font-medium hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 w-fit"
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
//                   <FaRegLightbulb className="text-[#c40116] text-base sm:text-lg" />
//                 </motion.div>
//                 <span className="truncate">Skills Tips</span>
//                 <motion.div
//                   animate={{ rotate: skillTipsClicked ? 180 : 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="text-gray-500 flex-shrink-0"
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
//                 className="bg-[#f3f4f6]/80 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-subtle  transition-all duration-300 hover:shadow-md"
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
//                           value={exp.skill}
//                           onChange={(e) =>
//                             handleInputChange(
//                               skillsSectionIndex,
//                               e.target.value,
//                             )
//                           }
//                           placeholder="Enter a skill..."
//                           className=" px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 w-full min-w-52"
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
//                           {exp.level !== null ? steps[exp.level] : "Not set"}
//                         </div>
//                       </div>

//                       <div className="flex items-center flex-wrap gap-4 sm:gap-6">
//                         <div
//                           className={`relative  w-full max-w-[280px] sm:w-[300px] h-8 sm:h-10 transition ${
//                             isActive ? "" : "opacity-50 pointer-events-none"
//                           }`}
//                         >
//                           {/* Background line */}
//                           <div className="absolute top-1/2 transform -translate-y-1/2 w-[calc(100%-25px)] sm:w-[275px] h-8 sm:h-[50px] bg-[#c40116]/5 rounded-md"></div>

//                           {/* Vertical dividers */}
//                           {steps.slice(1).map((_, index) => (
//                             <div
//                               key={index}
//                               className="absolute top-1 bottom-0 md:w-[1px] h-6 sm:h-8 bg-[#c40116]/40"
//                               style={{ left: `${(index + 1) * stepWidth}px` }}
//                             ></div>
//                           ))}

//                           {/* Moving indicator */}
//                           {exp.level !== null && (
//                             <div
//                               className="absolute bg-[#c40116]/80 -top-0.5 sm:-top-1 left-0 h-8 sm:h-[50px] w-[45px] sm:w-[55px] rounded-md transition-all duration-500"
//                               style={{
//                                 transform: `translateX(${exp.level * stepWidth}px)`,
//                               }}
//                             ></div>
//                           )}

//                           {/* Clickable steps */}
//                           {steps.map((_, stepsIndex) => (
//                             <div
//                               key={stepsIndex}
//                               onClick={() =>
//                                 handleStepsChange(
//                                   skillsSectionIndex,
//                                   stepsIndex,
//                                 )
//                               }
//                               className="absolute top-0 left-0 w-[45px] sm:w-[55px] h-8 sm:h-10 cursor-pointer"
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

//         <div className="flex-shrink-0 pt-4 mt-4 border-t border-gray-200">
//           <div className=" flex justify-between">
//             <button
//               className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg  font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300"
//               onClick={() => router.push("/resume-details/education")}
//             >
//               Back
//             </button>

//             <button
//               className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold s transition-colors duration-300"
//               onClick={() => router.push("/resume-details/summary")}
//             >
//               Next Summry
//             </button>
//           </div>
//         </div>

//         {/* Skills Tips Modal */}
//         {skillTipsClicked && (
//           <AnimatePresence>
//             <div className="fixed inset-0 z-50 flex items-start justify-center  overflow-hidden p-4">
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
//                           <div className="flex-shrink-0 mt-0.5">
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
//                           <div className="flex-shrink-0 mt-0.5">
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
//                     className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
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
//       </div>
//     </section>
//   );
// });

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

// const steps = ["Beginner", "Basic", "Intermediate", "Advanced", "Expert"];
// const stepWidth = 55;

// const SkillsForm = () => {
//   const [skillTipsClicked, setSkillTipsClicked] = useState(false);
//   const router = useRouter();
//   const UseContext = useContext(CreateContext);
//   const Contactid = UseContext?.contact.contactId;
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
//     if (!Contactid) {
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
//         { params: { contactId: Contactid } },
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
//     [Contactid, lastSavedData],
//   );

//   const addExperience = () => {
//     setSkills((prev) => {
//       const updated = [
//         ...prev,
//         {
//           skill: "",
//           level: isActive ? 2 : null,
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
//         job_title: experienceTitlesList,
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
//         updated = [{ skill: item, level: 2, id: Date.now() + Math.random() }];
//       } else {
//         updated = [
//           ...prev,
//           { skill: item, level: 2, id: Date.now() + Math.random() },
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
//         `${API_URL}/api/skill/get-skill/${Contactid}`,
//       );

//       const skillsList = response.data?.[0]?.skills || [];

//       if (skillsList.length > 0) {
//         const formattedData = skillsList.map((item: any) => ({
//           id: item._id || Date.now(),
//           skill: item?.skill || "",
//           level: item?.level !== undefined ? item.level : null,
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

//   useEffect(() => {
//     if (Contactid) {
//       fetchSkill();
//     }
//   }, [Contactid]);

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

//   // Update skill or level individually
//   const handleStepsChange = (
//     skillsSectionIndex: number,
//     stepsIndex: number,
//   ) => {
//     setSkills((prev) => {
//       const updated = [...prev];
//       updated[skillsSectionIndex].level = stepsIndex;
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
//           level: newActive ? (exp.level === null ? 2 : exp.level) : null,
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
//       <div className="p-3 md:p-4 lg:p-5 bg-white rounded-xl sm:rounded-2xl shadow-soft h-full flex flex-col">
//         {/* Header Section */}
//         <Stepper />

//         {/* Auto-save indicator */}
//         {isSaving && (
//           <div className="absolute top-20 right-5 z-10 flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-md">
//             <div className="w-3 h-3 border-2 border-gray-300 border-t-[#c40116] rounded-full animate-spin"></div>
//             <span className="text-xs text-gray-600">Saving...</span>
//           </div>
//         )}

//         <div className="flex-1 overflow-y-auto pb-5 mt-3">
//           <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 mb-3">
//             <div className="flex items-center gap-2 sm:gap-3">
//               <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//                 <FaGraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]" />
//               </div>
//               <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
//                 Skills
//               </h1>
//             </div>

//             <div className="flex justify-end">
//               <button
//                 onClick={() => setSkillTipsClicked((prev) => !prev)}
//                 className="flex items-center justify-center xs:justify-start gap-2 bg-linear-to-r from-white to-gray-50/80 border border-gray-200 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-gray-700 text-xs sm:text-sm font-medium hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 w-fit"
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
//                   <FaRegLightbulb className="text-[#c40116] text-base sm:text-lg" />
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
//                           value={exp.skill}
//                           onChange={(e) =>
//                             handleInputChange(
//                               skillsSectionIndex,
//                               e.target.value,
//                             )
//                           }
//                           placeholder="Enter a skill..."
//                           className="px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 w-full min-w-52"
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
//                           {exp.level !== null ? steps[exp.level] : "Not set"}
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

//                           {/* Moving indicator */}
//                           {exp.level !== null && (
//                             <div
//                               className="absolute bg-[#c40116]/80 -top-0.5 sm:-top-1 left-0 h-8 sm:h-12.5 w-11.25 sm:w-13.75 rounded-md transition-all duration-500"
//                               style={{
//                                 transform: `translateX(${exp.level * stepWidth}px)`,
//                               }}
//                             ></div>
//                           )}

//                           {/* Clickable steps */}
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

//         <div className="shrink-0 pt-4 mt-4 border-t border-gray-200">
//           <div className="flex justify-between">
//             <button
//               className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300"
//               onClick={() => router.push("/resume-details/education")}
//             >
//               Back
//             </button>

//             <button
//               className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold transition-colors duration-300"
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

"use client";

import React, {
  useContext,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { CreateContext } from "@/app/context/CreateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { FaRegLightbulb, FaTimes, FaGraduationCap } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { BsFillLightningFill } from "react-icons/bs";
import { Skill } from "@/app/types/context.types";
import { useRouter } from "next/navigation";
import Stepper from "../../../components/resume/Steppers";
import { getLocalStorage, setLocalStorage } from "@/app/utils";
import { API_URL } from "@/app/config/api";

const steps = ["Beginner", "Basic", "Intermediate", "Advanced", "Expert"];
const stepWidth = 55;

// Helper functions to convert between display index (0-4) and stored value (1-5)
const displayToStored = (displayIndex: number | null) => {
  if (displayIndex === null) return null;
  return displayIndex + 1; // 0->1, 1->2, 2->3, 3->4, 4->5
};

const storedToDisplay = (storedValue: number | null) => {
  if (storedValue === null) return null;
  return storedValue - 1; // 1->0, 2->1, 3->2, 4->3, 5->4
};

const SkillsForm = () => {
  const [skillTipsClicked, setSkillTipsClicked] = useState(false);
  const router = useRouter();
  const UseContext = useContext(CreateContext);
  const Contactid = UseContext?.contact.contactId;
  const [isActive, setIsActive] = useState(true);

  const { skills, setSkills, fullResumeData, setFullResumeData } =
    UseContext || {
      skills: [],
      setSkills: () => {},
      fullResumeData: null,
      setFullResumeData: () => {},
    };

  const [Airesponse, setAireseponse] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedData, setLastSavedData] = useState<string>("");

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialLoadDone = useRef(false);

  // Save to localStorage whenever skills change
  useEffect(() => {
    if (!initialLoadDone.current) return;

    if (fullResumeData) {
      const updatedFullData = {
        ...fullResumeData,
        skills: skills,
      };
      setFullResumeData(updatedFullData);
      setLocalStorage("fullResumeData", updatedFullData);
    }
  }, [skills]);

  const saveToAPI = async (skillsData: typeof skills) => {
    if (!Contactid) {
      console.error("Contact ID is required");
      return false;
    }

    // Check if data has changed from last saved
    const currentDataString = JSON.stringify(skillsData);
    if (currentDataString === lastSavedData) {
      return true; // No changes to save
    }

    setIsSaving(true);

    try {
      const formData = {
        skills: skillsData,
      };

      const response = await axios.post(
        `${API_URL}/api/skill/update`,
        formData,
        { params: { contactId: Contactid } },
      );

      setLastSavedData(currentDataString);
      return true;
    } catch (err: any) {
      console.error("Error saving skills:", err);
      toast.error("Failed to save Skills!");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Debounced save function
  const debouncedSave = useCallback(
    (skillsData: typeof skills) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        saveToAPI(skillsData);
      }, 1000);
    },
    [Contactid, lastSavedData],
  );

  const addExperience = () => {
    setSkills((prev) => {
      const updated = [
        ...prev,
        {
          skill: "",
          // Store as 3 (Intermediate) when active, null when inactive
          level: isActive ? 3 : null,
          id: Date.now() + Math.random(),
        },
      ];
      debouncedSave(updated);
      return updated;
    });
  };

  const handleSubmitAi = async () => {
    setLoading(true);
    setAireseponse(null);

    try {
      let experienceTitlesList =
        UseContext?.experiences?.map((item: any) => item.jobTitle) || [];

      const formData = {
        job_title: experienceTitlesList,
      };

      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/resume/skills`,
        formData,
      );

      setAireseponse(response.data?.skills || []);
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
    setSkills((prev) => {
      let updated;
      if (prev.length === 0 || !prev[0]?.skill) {
        // Store as 3 (Intermediate) for new AI-generated skills
        updated = [{ skill: item, level: 3, id: Date.now() + Math.random() }];
      } else {
        updated = [
          ...prev,
          { skill: item, level: 3, id: Date.now() + Math.random() },
        ];
      }
      debouncedSave(updated);
      return updated;
    });

    if (Airesponse) {
      const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
      setAireseponse(newAiResponse.length > 0 ? newAiResponse : null);
    }
  };

  const fetchSkill = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/skill/get-skill/${Contactid}`,
      );

      const skillsList = response.data?.[0]?.skills || [];

      if (skillsList.length > 0) {
        const formattedData = skillsList.map((item: any) => ({
          id: item._id || Date.now(),
          skill: item?.skill || "",
          // Ensure level is stored as 1-5, default to 3 if not set
          level: item?.level !== undefined ? item.level : 3,
          error: {},
        }));

        setSkills(formattedData);
        setLastSavedData(JSON.stringify(formattedData));
      } else {
        console.log("No skills data found for user");
      }

      initialLoadDone.current = true;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Contactid) {
      fetchSkill();
    }
  }, [Contactid]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = (skillsSectionIndex: number, value: string) => {
    setSkills((prev) => {
      const updated = [...prev];
      updated[skillsSectionIndex].skill = value;
      debouncedSave(updated);
      return updated;
    });
  };

  // Update skill level - receives display index (0-4), stores as (1-5)
  const handleStepsChange = (
    skillsSectionIndex: number,
    displayIndex: number,
  ) => {
    setSkills((prev) => {
      const updated = [...prev];
      // Convert display index (0-4) to stored value (1-5)
      updated[skillsSectionIndex].level = displayToStored(displayIndex);
      debouncedSave(updated);
      return updated;
    });
  };

  const toggleActive = () => {
    setIsActive((prev) => {
      const newActive = !prev;

      setSkills((prevSkills) => {
        const updated = prevSkills.map((exp) => ({
          ...exp,
          // When turning on, set to 3 (Intermediate) if currently null
          // When turning off, set to null
          level: newActive ? (exp.level === null ? 3 : exp.level) : null,
        }));
        debouncedSave(updated);
        return updated;
      });

      return newActive;
    });
  };

  // Delete a skill
  const handleDelete = (skillsSectionIndex: number) => {
    setSkills((prev) => {
      const updated = prev.filter((_, index) => index !== skillsSectionIndex);
      saveToAPI(updated);
      return updated;
    });
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

        <div className="flex-1 overflow-y-auto pb-5 mt-3">
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
                <FaGraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]" />
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
                Skills
              </h1>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSkillTipsClicked((prev) => !prev)}
                className="flex items-center justify-center xs:justify-start gap-2 bg-linear-to-r from-white to-gray-50/80 border border-gray-200 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-gray-700 text-xs sm:text-sm font-medium hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 w-fit"
                type="button"
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
                <span className="truncate">Skills Tips</span>
                <motion.div
                  animate={{ rotate: skillTipsClicked ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-500 shrink-0"
                >
                  <IoIosArrowDown />
                </motion.div>
              </button>
            </div>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm font-medium">
            Add your most relevant professional skills.
          </p>
          {/* Toggle & AI Button Row */}
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 mb-3">
            <div className="flex items-center gap-3 sm:gap-5">
              <div
                onClick={toggleActive}
                className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full cursor-pointer transition ${
                  isActive
                    ? "bg-linear-to-r from-[#c40116] to-[#be0117]"
                    : "bg-gray-200"
                }`}
              >
                <div
                  className={`absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white transition-all duration-300 ${
                    isActive
                      ? "translate-x-5 sm:translate-x-6"
                      : "translate-x-0"
                  }`}
                ></div>
              </div>
              <div className="text-gray-600 text-xs sm:text-sm font-medium">
                Show experience level
              </div>
            </div>

            <div className="relative inline-block group ">
              <button
                onClick={handleSubmitAi}
                disabled={loading}
                className={`
            flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-white text-xs sm:text-sm font-medium transition-all duration-200 w-fit
            ${
              loading
                ? "bg-linear-to-r from-gray-300 to-gray-400 cursor-not-allowed opacity-70"
                : "bg-linear-to-r from-[#c40116] to-[#c40116]/60 hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02]"
            }
          `}
                type="button"
              >
                {loading ? (
                  <>
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 sm:w-5 sm:h-5"></span>
                    <span>Generating AI Skills...</span>
                  </>
                ) : (
                  <>
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
                    <span>Generate with AI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Skills List */}
          <div className="space-y-3 sm:space-y-4 pb-8 sm:pb-10 mt-3">
            {skills.map((exp, skillsSectionIndex) => (
              <div
                key={skillsSectionIndex}
                className="bg-[#f3f4f6]/80 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-subtle transition-all duration-300 hover:shadow-md"
              >
                <div className="p-2 sm:p-3 md:p-4 space-y-4 sm:space-y-6">
                  {/* Mobile Delete Button */}
                  <div className="flex 2xl:hidden justify-end -mt-1 -mr-1">
                    <button
                      onClick={() => handleDelete(skillsSectionIndex)}
                      className="p-1.5 rounded-lg bg-linear-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
                      type="button"
                    >
                      <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  <div className="flex flex-col flex-wrap md:flex-row md:items-start gap-4 sm:gap-6">
                    {/* Skill Input */}
                    <div className="flex-1 group">
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                        Skill Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={exp.skill}
                          onChange={(e) =>
                            handleInputChange(
                              skillsSectionIndex,
                              e.target.value,
                            )
                          }
                          placeholder="Enter a skill..."
                          className="px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 w-full min-w-52"
                        />
                        {exp.error?.skill && (
                          <p className="text-[#c40116] text-[10px] xs:text-xs mt-1.5 sm:mt-2">
                            {exp.error.skill}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Level Slider */}
                    <div className="group grow ">
                      <div className="flex items-center justify-between mb-2 sm:mb-4">
                        <div className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-[#c40116] transition-colors">
                          Proficiency Level
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-gray-800">
                          {/* Convert stored value (1-5) to display index (0-4) */}
                          {exp.level !== null
                            ? steps[storedToDisplay(exp.level) as number]
                            : "Not set"}
                        </div>
                      </div>

                      <div className="flex items-center flex-wrap gap-4 sm:gap-6">
                        <div
                          className={`relative w-full max-w-70 sm:w-75 h-8 sm:h-10 transition ${
                            isActive ? "" : "opacity-50 pointer-events-none"
                          }`}
                        >
                          {/* Background line */}
                          <div className="absolute top-1/2 transform -translate-y-1/2 w-[calc(100%-25px)] sm:w-68.75 h-8 sm:h-12.5 bg-[#c40116]/5 rounded-md"></div>

                          {/* Vertical dividers */}
                          {steps.slice(1).map((_, index) => (
                            <div
                              key={index}
                              className="absolute top-1 bottom-0 md:w-px h-6 sm:h-8 bg-[#c40116]/40"
                              style={{ left: `${(index + 1) * stepWidth}px` }}
                            ></div>
                          ))}

                          {/* Moving indicator - Convert stored value to display index for position */}
                          {exp.level !== null && (
                            <div
                              className="absolute bg-[#c40116]/80 -top-0.5 sm:-top-1 left-0 h-8 sm:h-12.5 w-11.25 sm:w-13.75 rounded-md transition-all duration-500"
                              style={{
                                transform: `translateX(${storedToDisplay(exp.level)! * stepWidth}px)`,
                              }}
                            ></div>
                          )}

                          {/* Clickable steps - Pass display index (0-4) to handler */}
                          {steps.map((_, stepsIndex) => (
                            <div
                              key={stepsIndex}
                              onClick={() =>
                                handleStepsChange(
                                  skillsSectionIndex,
                                  stepsIndex,
                                )
                              }
                              className="absolute top-0 left-0 w-11.25 sm:w-13.75 h-8 sm:h-10 cursor-pointer"
                              style={{
                                transform: `translateX(${
                                  stepsIndex * stepWidth
                                }px)`,
                              }}
                            ></div>
                          ))}
                        </div>

                        {/* Desktop Delete Button */}
                        <div className="max-2xl:hidden">
                          <button
                            onClick={() => handleDelete(skillsSectionIndex)}
                            className="p-1.5 sm:p-2 rounded-lg bg-linear-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
                            type="button"
                          >
                            <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Skills Button */}
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
                  Add New Skill
                </span>
              </div>
            </button>
          </div>
        </div>

        <div className="shrink-0 pt-4 mt-4 border-t border-gray-200">
          <div className="flex justify-between">
            <button
              className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
              onClick={() => router.push("/resume-details/education")}
            >
              Back
            </button>

            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold transition-colors duration-300 cursor-pointer"
              onClick={() => {
                if (saveTimeoutRef.current) {
                  clearTimeout(saveTimeoutRef.current);
                }
                saveToAPI(skills).then(() => {
                  router.push("/resume-details/summary");
                });
              }}
            >
              Next Summary
            </button>
          </div>
        </div>

        {/* Skills Tips Modal */}
        {skillTipsClicked && (
          <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden p-4">
              <div
                className="absolute inset-0 backdrop-blur-sm"
                onClick={() => setSkillTipsClicked(false)}
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
                        Skills Tips
                      </h3>
                    </div>
                    <button
                      onClick={() => setSkillTipsClicked(false)}
                      className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                      type="button"
                    >
                      <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <hr className="border-gray-100" />

                  <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(80vh-100px)]">
                    {/* Positive tips */}
                    <div className="space-y-3 sm:space-y-4">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        Best Practices
                      </h4>
                      {[
                        {
                          title: "List job-relevant skills",
                          desc: "Match the job you're applying for.",
                        },
                        {
                          title: "Use keywords from job description",
                          desc: "It helps you pass Applicant Tracking Systems (ATS).",
                        },
                        {
                          title: "Keep it concise",
                          desc: "Aim for 4–5 of your strongest, most relevant skills.",
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
                          title: "Don't include outdated tools and software",
                          desc: "Show you're up to date with current tech.",
                        },
                        {
                          title: "Don't list general traits as skills",
                          desc: "Avoid terms like 'hard-working' or 'fast learner.'",
                        },
                        {
                          title: "Don't lie about your skills",
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
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
                      <BsFillLightningFill className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                        AI-Generated Skills
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Click on any skill below to add it to your list
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
                    type="button"
                  >
                    <FaTimes className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
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
      </div>
    </section>
  );
};

export default SkillsForm;
