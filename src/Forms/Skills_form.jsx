// import React, {
//   useContext,
//   useState,
//   useEffect,
//   useImperativeHandle,
//   forwardRef,
// } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiCheckCircle, FiXCircle } from "react-icons/fi";
// import { CreateContext } from "../App";
// import axios from "axios";
// import { API_URL } from "../Config";
// import { toast } from "react-toastify";
// import { BsArrowLeftCircleFill } from "react-icons/bs";
// import {
//   FaRegLightbulb,
//   FaTimes,
//   FaGraduationCap,
// } from "react-icons/fa";
// import { FiTrash2 } from "react-icons/fi";

// import { IoIosArrowDown, IoMdAdd } from "react-icons/io";

// import { BsFillLightningFill } from "react-icons/bs";


// const SkillsForm = forwardRef((props, ref) => {
//   const UseContext = useContext(CreateContext);

//   const Contactid = UseContext?.contactid;
//   const [isActive, setIsActive] = useState(true);
//   const stepWidth = 55;

//   const { skills, setSkills } = useContext(CreateContext);
//   const [Airesponse, setAireseponse] = useState(null);

//   console.log("Airesponse", Airesponse);
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
//       let experienceTitlesList = UseContext?.experiences.map(
//         (item, index) => item.jobTitle
//       );
//       console.log(experienceTitlesList);

//       const formData = {
//         job_title: experienceTitlesList,
//       };

//       console.log("formData", formData);

//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/resume/skills`,

//         formData
//       );

//       console.log("response", response.data.skills);

//       setAireseponse(response.data?.skills);
//       setShowPopup(true);

//       return true;
//     } catch (err) {
//       console.error("Error sending message:", err);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const insertAIResponse = (item, index) => {
   
//     console.log(item)
//     console.log(index)
//     console.log(skills)

//     if (!skills[0]?.skill) {
//       setSkills([{ skill: item, level: 2 }]);
//     } else {
//       const updated = [...skills, { skill: item, level: 2 }];
//       setSkills(updated);
//     }

//     let aiResponse = [...Airesponse];

//     aiResponse = aiResponse.filter((item, index1) => index1 != index);

//     setAireseponse(aiResponse);
//   };

//   const fetchSkill = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/skill/get-skill/${Contactid}`
//       );

//       console.log("responseslilld", response);

//       const skillsList = response.data?.[0]?.skills || [];

//       if (skillsList.length > 0) {
//         const formattedData = skillsList.map((item) => ({
//           id: item._id || Date.now(),
//           skill: item?.skill || "",
//           level: item?.level || "",

//           isOpen: true,
//           touched: {},
//           showPicker: false,
//           year: item.startDate
//             ? new Date(item.startDate).getFullYear()
//             : new Date().getFullYear(),
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
//     fetchSkill();
//   }, [Contactid]);

//   const handleSubmit = async (e) => {
//     // e.preventDefault();
//     if (e) e.preventDefault();

//     let isValid = true;

//     // Validate each skill
//     const updatedSkills = skills.map((exp) => {
//       const newErrors = {};

//       // Validate skill name
//       if (!exp.skill?.trim()) {
//         newErrors.skill = "Skill name is required";
//         isValid = false;
//       }

//       return { ...exp, error: newErrors };
//     });

//     setSkills(updatedSkills);

//     if (!isValid) {
//       return false;
//     }

//     try {
//       const formData = {
//         skills,
//       };

//       console.log("formData", formData);

//       const response = await axios.post(
//         `${API_URL}/api/skill/update`,

//         formData,
//         { params: { contactId: Contactid } }
//       );
//       console.log("response", response);

//       // toast.success(" Skills  created successfully.");

//       // reset();

//       return true;
//     } catch (err) {
//       console.error("Error sending message:", err);
//       toast.error("Failed to save Skills!");

//       return false;
//     }
//   };

//   useImperativeHandle(ref, () => ({
//     handleSubmit,
//   }));

//   const handleInputChange = (skillsSectionIndex, value) => {
//     let skill = [...skills];
//     skill[skillsSectionIndex].skill = value;
//     setSkills(skill);
//   };

//   // Update skill or level individually
//   const handleStepsChange = (skillsSectionIndex, stepsIndex) => {
//     let skill = [...skills];
//     skill[skillsSectionIndex].level = stepsIndex;
//     setSkills(skill);
//   };

//   const toggleActive = () => {
//     setIsActive((prev) => {
//       const newActive = !prev;

//       setSkills((prevSkills) =>
//         prevSkills.map((exp) => ({
//           ...exp,
//           level: newActive ? (exp.level === null ? 2 : exp.level) : null,
//         }))
//       );

//       return newActive;
//     });
//   };

//   // Delete a skill
//   const handleDelete = (skillsSectionIndex) => {
//     setSkills((prev) =>
//       prev.filter((_, index) => index !== skillsSectionIndex)
//     );
//   };

//   const [skillTipsClicked, setSkillTipsClicked] = useState(false);

//   return (
//     <section>
//       <div className="p-3 md:p-4 lg:p-5 bg-white rounded-xl sm:rounded-2xl shadow-soft h-auto min-h-[500px] max-h-[700px] sm:max-h-[600px] lg:max-h-[500px]">
//         {/* Header Section */}
//         <div className="mb-6 sm:mb-8">
//           <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 mb-3">
//             <div className="flex items-center gap-2 sm:gap-3">
//               <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//                 <FaGraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]" />
//               </div>
//               <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
//                 Skills
//               </h1>
//             </div>

//             <div className="flex justify-end">
//               <button
//                 onClick={() => setSkillTipsClicked((prev) => !prev)}
//                 className="flex items-center justify-center xs:justify-start gap-2 bg-gradient-to-r from-white to-gray-50/80 border border-gray-200 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-gray-700 text-xs sm:text-sm font-medium hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 w-fit"
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
//         </div>

//         {/* Toggle & AI Button Row */}
//         <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 mb-3">
//           <div className="flex items-center gap-3 sm:gap-5">
//             <div
//               onClick={toggleActive}
//               className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full cursor-pointer transition ${
//                 isActive
//                   ? "bg-gradient-to-r from-[#c40116] to-[#be0117]"
//                   : "bg-gray-200"
//               }`}
//             >
//               <div
//                 className={`absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white transition-all duration-300 ${
//                   isActive ? "translate-x-5 sm:translate-x-6" : "translate-x-0"
//                 }`}
//               ></div>
//             </div>
//             <div className="text-gray-600 text-xs sm:text-sm font-medium">
//               Show experience level
//             </div>
//           </div>

//           <div className="relative inline-block group ">
//             <button
//               onClick={handleSubmitAi}
//               disabled={loading}
//               className={`
//             flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-white text-xs sm:text-sm font-medium transition-all duration-200 w-fit
//             ${
//               loading
//                 ? "bg-gradient-to-r from-gray-300 to-gray-400 cursor-not-allowed opacity-70"
//                 : "bg-gradient-to-r from-[#c40116] to-[#c40116]/60 hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02]"
//             }
//           `}
//             >
//               {loading ? (
//                 <>
//                   <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 sm:w-5 sm:h-5"></span>
//                   <span>Generating AI Skills...</span>
//                 </>
//               ) : (
//                 <>
//                   <svg
//                     className="w-3.5 h-3.5 sm:w-4 sm:h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M13 10V3L4 14h7v7l9-11h-7z"
//                     />
//                   </svg>
//                   <span>Generate with AI</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Skills List */}
//         <div className="space-y-3 sm:space-y-4 pb-8 sm:pb-10 mt-3">
//           {skills.map((exp, skillsSectionIndex) => (
//             <div
//               key={skillsSectionIndex}
//               className="bg-[#f3f4f6]/80 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-subtle  transition-all duration-300 hover:shadow-md"
//             >
//               <div className="p-2 sm:p-3 md:p-4 space-y-4 sm:space-y-6">
//                 {/* Mobile Delete Button */}
//                 <div className="flex 2xl:hidden justify-end -mt-1 -mr-1">
//                   <button
//                     onClick={() => handleDelete(skillsSectionIndex)}
//                     className="p-1.5 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
//                   >
//                     <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </button>
//                 </div>

//                 <div className="flex flex-col flex-wrap md:flex-row md:items-start gap-4 sm:gap-6">
//                   {/* Skill Input */}
//                   <div className="flex-1 group">
//                     <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                       Skill Name
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         value={exp.skill}
//                         onChange={(e) =>
//                           handleInputChange(skillsSectionIndex, e.target.value)
//                         }
//                         placeholder="Enter a skill..."
//                         className=" px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 w-full min-w-52"
//                       />
//                       {exp.error?.skill && (
//                         <p className="text-[#c40116] text-[10px] xs:text-xs mt-1.5 sm:mt-2">
//                           {exp.error.skill}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Level Slider */}
//                   <div className="group grow ">
//                     <div className="flex items-center justify-between mb-2 sm:mb-4">
//                       <div className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-[#c40116] transition-colors">
//                         Proficiency Level
//                       </div>
//                       <div className="text-xs sm:text-sm font-medium text-gray-800">
//                         {steps[exp.level]}
//                       </div>
//                     </div>

//                     <div className="flex items-center flex-wrap gap-4 sm:gap-6">
//                       <div
//                         className={`relative  w-full max-w-[280px] sm:w-[300px] h-8 sm:h-10 transition ${
//                           isActive ? "" : "opacity-50 pointer-events-none"
//                         }`}
//                       >
//                         {/* Background line */}
//                         <div className="absolute top-1/2 transform -translate-y-1/2 w-[calc(100%-25px)] sm:w-[275px] h-8 sm:h-[50px] bg-[#c40116]/5 rounded-md"></div>

//                         {/* Vertical dividers */}
//                         {steps.slice(1).map((_, index) => (
//                           <div
//                             key={index}
//                             className="absolute top-1 bottom-0 md:w-[1px] h-6 sm:h-8 bg-[#c40116]/40"
//                             style={{ left: `${(index + 1) * stepWidth}px` }}
//                           ></div>
//                         ))}

//                         {/* Moving indicator */}
//                         <div
//                           className="absolute bg-[#c40116]/80 -top-0.5 sm:-top-1 left-0 h-8 sm:h-[50px] w-[45px] sm:w-[55px] rounded-md transition-all duration-500"
//                           style={{
//                             transform: `translateX(${exp.level * stepWidth}px)`,
//                           }}
//                         ></div>

//                         {/* Clickable steps */}
//                         {steps.map((_, stepsIndex) => (
//                           <div
//                             key={stepsIndex}
//                             onClick={() =>
//                               handleStepsChange(skillsSectionIndex, stepsIndex)
//                             }
//                             className="absolute top-0 left-0 w-[45px] sm:w-[55px] h-8 sm:h-10 cursor-pointer"
//                             style={{
//                               transform: `translateX(${
//                                 stepsIndex * stepWidth
//                               }px)`,
//                             }}
//                           ></div>
//                         ))}
//                       </div>

//                       {/* Desktop Delete Button */}
//                       <div className="max-2xl:hidden">
//                         <button
//                           onClick={() => handleDelete(skillsSectionIndex)}
//                           className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
//                         >
//                           <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Add Skills Button */}
//           <button
//             onClick={addExperience}
//             className="w-full py-3 sm:py-3.5 bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-gray-200 rounded-xl hover:border-[#c40116] hover:bg-[#c40116]/5 text-gray-600 hover:text-[#c40116] transition-all duration-300 group"
//           >
//             <div className="flex items-center justify-center gap-2">
//               <div className="p-1 sm:p-1.5 bg-gray-100 rounded-lg group-hover:bg-[#c40116]/10 transition-colors">
//                 <IoMdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
//               </div>
//               <span className="text-xs sm:text-sm font-semibold">
//                 Add New Skill
//               </span>
//             </div>
//           </button>
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
//                       <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//                         <FaRegLightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
//                       </div>
//                       <h3 className="text-base sm:text-lg font-semibold text-gray-800">
//                         Skills Tips
//                       </h3>
//                     </div>
//                     <button
//                       onClick={() => setSkillTipsClicked(false)}
//                       className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
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
//               <div className="p-1 bg-gradient-to-r from-[#c40116] to-[#be0117]"></div>

//               <div className="p-4 sm:p-6">
//                 <div className="flex items-start justify-between gap-3 mb-4 sm:mb-6">
//                   <div className="flex items-start gap-2 sm:gap-3">
//                     <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
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
//                       <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg group-hover:from-[#c40116]/20 group-hover:to-[#be0117]/20 transition-all flex-shrink-0">
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


import React, {
  useContext,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowUp } from "react-icons/md";
// import { IoIosArrowDown } from "react-icons/io";
import { FiX } from "react-icons/fi";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { CreateContext } from "../App";
import axios from "axios";
import { API_URL } from "../Config";
import { toast } from "react-toastify";
import { Editor } from "primereact/editor";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import {
  FaRegLightbulb,
  FaCheckCircle,
  FaTimesCircle,
  FaTrashAlt,
  FaPlus,
  FaChevronDown,
  FaTimes,
  FaBolt,
  FaGraduationCap,
} from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

import { IoIosArrowDown, IoMdAdd } from "react-icons/io";

import { BsFillLightningFill } from "react-icons/bs";

const steps = ["Novice", "Beginner", "Intermediate", "Skilled", "Pro"];
const colors = ["#b2e2ff", "#98d8ff", "#64c5ff", "#30b2ff", "#05a2ff"];

// function SkillsForm() {

const SkillsForm = forwardRef((props, ref) => {
  const UseContext = useContext(CreateContext);

  const Contactid = UseContext?.contactid;

  const [isActive, setIsActive] = useState(true);

  const [selected, setSelected] = useState(2);
  const stepWidth = 55;

  const { skills, setSkills } = useContext(CreateContext);
  console.log("skills", skills);

  const [Airesponse, setAireseponse] = useState(null);

  console.log("Airesponse", Airesponse);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // const [skills, setSkills] = useState([
  //   { skill: "", level: 2, id: Date.now() + Math.random() },
  // ]);

  const addExperience = () => {
    setSkills([
      ...skills,
      { skill: "", level: isActive ? 2 : null, id: Date.now() + Math.random() },
    ]);
  };

  const handleSubmitAi = async () => {
    setLoading(true);
    setAireseponse(null);

    try {
      let experienceTitlesList = UseContext?.experiences.map(
        (item, index) => item.jobTitle
      );
      console.log(experienceTitlesList);

      const formData = {
        job_title: experienceTitlesList,
      };

      console.log("formData", formData);

      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/resume/skills`,

        formData
      );

      console.log("response", response.data.skills);

      setAireseponse(response.data?.skills);
      setShowPopup(true);

      return true;
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  // const insertAIResponse = () => {
  //   setSelectedAIText(Airesponse);
  //   setShowPopup(false);
  // };

  const insertAIResponse = (item, index) => {
   
    console.log(item)
    console.log(index)
    console.log(skills)

    if (!skills[0]?.skill) {
      setSkills([{ skill: item, level: 2 }]);
    } else {
      const updated = [...skills, { skill: item, level: 2 }];
      setSkills(updated);
    }

    let aiResponse = [...Airesponse];

    aiResponse = aiResponse.filter((item, index1) => index1 != index);

    setAireseponse(aiResponse);
  };

  const fetchSkill = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/skill/get-skill/${Contactid}`
      );

      console.log("responseslilld", response);

      const skillsList = response.data?.[0]?.skills || [];

      if (skillsList.length > 0) {
        const formattedData = skillsList.map((item) => ({
          id: item._id || Date.now(),
          skill: item?.skill || "",
          level: item?.level || "",

          isOpen: true,
          touched: {},
          showPicker: false,
          year: item.startDate
            ? new Date(item.startDate).getFullYear()
            : new Date().getFullYear(),
        }));

        setSkills(formattedData);
      } else {
        console.log("No skills data found for user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSkill();
  }, [Contactid]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (e) e.preventDefault();

    let isValid = true;

    // Validate each skill
    const updatedSkills = skills.map((exp) => {
      const newErrors = {};

      // Validate skill name
      if (!exp.skill?.trim()) {
        newErrors.skill = "Skill name is required";
        isValid = false;
      }

      return { ...exp, error: newErrors };
    });

    setSkills(updatedSkills);

    if (!isValid) {
      return false;
    }

    try {
      const formData = {
        skills,
      };

      console.log("formData", formData);

      const response = await axios.post(
        `${API_URL}/api/skill/update`,

        formData,
        { params: { contactId: Contactid } }
      );
      console.log("response", response);

      // toast.success(" Skills  created successfully.");

      // reset();

      return true;
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Failed to save Skills!");

      return false;
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  const handleInputChange = (skillsSectionIndex, value) => {
    let skill = [...skills];
    skill[skillsSectionIndex].skill = value;
    setSkills(skill);
  };

  // Update skill or level individually
  const handleStepsChange = (skillsSectionIndex, stepsIndex) => {
    let skill = [...skills];
    skill[skillsSectionIndex].level = stepsIndex;
    setSkills(skill);
  };

  const toggleActive = () => {
    setIsActive((prev) => {
      const newActive = !prev;

      setSkills((prevSkills) =>
        prevSkills.map((exp) => ({
          ...exp,
          level: newActive ? (exp.level === null ? 2 : exp.level) : null,
        }))
      );

      return newActive;
    });
  };

  // Delete a skill
  const handleDelete = (skillsSectionIndex) => {
    setSkills((prev) =>
      prev.filter((_, index) => index !== skillsSectionIndex)
    );
  };

  const [skillTipsClicked, setSkillTipsClicked] = useState(false);

  return (
    <section>
      <div className="p-3 md:p-4 lg:p-5 bg-white rounded-xl sm:rounded-2xl shadow-soft h-auto min-h-[500px] max-h-[700px] sm:max-h-[600px] lg:max-h-[500px]">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
                <FaGraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]" />
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
                Skills
              </h1>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSkillTipsClicked((prev) => !prev)}
                className="flex items-center justify-center xs:justify-start gap-2 bg-gradient-to-r from-white to-gray-50/80 border border-gray-200 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-gray-700 text-xs sm:text-sm font-medium hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 w-fit"
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
                  className="text-gray-500 flex-shrink-0"
                >
                  <IoIosArrowDown />
                </motion.div>
              </button>
            </div>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm font-medium">
            Add your most relevant professional skills.
          </p>
        </div>

        {/* Toggle & AI Button Row */}
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 mb-3">
          <div className="flex items-center gap-3 sm:gap-5">
            <div
              onClick={toggleActive}
              className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full cursor-pointer transition ${
                isActive
                  ? "bg-gradient-to-r from-[#c40116] to-[#be0117]"
                  : "bg-gray-200"
              }`}
            >
              <div
                className={`absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white transition-all duration-300 ${
                  isActive ? "translate-x-5 sm:translate-x-6" : "translate-x-0"
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
                ? "bg-gradient-to-r from-gray-300 to-gray-400 cursor-not-allowed opacity-70"
                : "bg-gradient-to-r from-[#c40116] to-[#c40116]/60 hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02]"
            }
          `}
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
              className="bg-[#f3f4f6]/80 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-subtle  transition-all duration-300 hover:shadow-md"
            >
              <div className="p-2 sm:p-3 md:p-4 space-y-4 sm:space-y-6">
                {/* Mobile Delete Button */}
                <div className="flex 2xl:hidden justify-end -mt-1 -mr-1">
                  <button
                    onClick={() => handleDelete(skillsSectionIndex)}
                    className="p-1.5 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
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
                          handleInputChange(skillsSectionIndex, e.target.value)
                        }
                        placeholder="Enter a skill..."
                        className=" px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 w-full min-w-52"
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
                        {steps[exp.level]}
                      </div>
                    </div>

                    <div className="flex items-center flex-wrap gap-4 sm:gap-6">
                      <div
                        className={`relative  w-full max-w-[280px] sm:w-[300px] h-8 sm:h-10 transition ${
                          isActive ? "" : "opacity-50 pointer-events-none"
                        }`}
                      >
                        {/* Background line */}
                        <div className="absolute top-1/2 transform -translate-y-1/2 w-[calc(100%-25px)] sm:w-[275px] h-8 sm:h-[50px] bg-[#c40116]/5 rounded-md"></div>

                        {/* Vertical dividers */}
                        {steps.slice(1).map((_, index) => (
                          <div
                            key={index}
                            className="absolute top-1 bottom-0 md:w-[1px] h-6 sm:h-8 bg-[#c40116]/40"
                            style={{ left: `${(index + 1) * stepWidth}px` }}
                          ></div>
                        ))}

                        {/* Moving indicator */}
                        <div
                          className="absolute bg-[#c40116]/80 -top-0.5 sm:-top-1 left-0 h-8 sm:h-[50px] w-[45px] sm:w-[55px] rounded-md transition-all duration-500"
                          style={{
                            transform: `translateX(${exp.level * stepWidth}px)`,
                          }}
                        ></div>

                        {/* Clickable steps */}
                        {steps.map((_, stepsIndex) => (
                          <div
                            key={stepsIndex}
                            onClick={() =>
                              handleStepsChange(skillsSectionIndex, stepsIndex)
                            }
                            className="absolute top-0 left-0 w-[45px] sm:w-[55px] h-8 sm:h-10 cursor-pointer"
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
                          className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
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
            className="w-full py-3 sm:py-3.5 bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-gray-200 rounded-xl hover:border-[#c40116] hover:bg-[#c40116]/5 text-gray-600 hover:text-[#c40116] transition-all duration-300 group"
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

        {/* Skills Tips Modal */}
        {skillTipsClicked && (
          <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-start justify-center  overflow-hidden p-4">
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
                      <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
                        <FaRegLightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                        Skills Tips
                      </h3>
                    </div>
                    <button
                      onClick={() => setSkillTipsClicked(false)}
                      className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
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
                          <div className="flex-shrink-0 mt-0.5">
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
                          <div className="flex-shrink-0 mt-0.5">
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
              <div className="p-1 bg-gradient-to-r from-[#c40116] to-[#be0117]"></div>

              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-3 mb-4 sm:mb-6">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
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
                    className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
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
                      <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg group-hover:from-[#c40116]/20 group-hover:to-[#be0117]/20 transition-all flex-shrink-0">
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
});

export default SkillsForm;