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
//   FiCheckCircle,
//   FiXCircle,
//   FiChevronDown,
//   FiTrash2,
//   FiPlus,
//   FiGrid,
//   FiList,
//   FiX,
//   FiZap,
//   FiArrowRight,
//   FiTag,
// } from "react-icons/fi";
// import { CreateContext } from "@/app/context/CreateContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   FaRegLightbulb,
//   FaTimes,
//   FaGraduationCap,
//   FaMagic,
//   FaStar,
// } from "react-icons/fa";
// import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
// import {
//   IoArrowForward,
//   IoClose,
//   IoDiamondOutline,
//   IoSparkles,
// } from "react-icons/io5";
// import { useRouter } from "next/navigation";
// import Stepper from "../../../components/resume/Steppers";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { API_URL } from "@/app/config/api";
// import { SimpleSkill, SkillCategory, SkillsType } from "@/app/types";

// type SkillsMode = "simple" | "categorized";

// const SkillItem = ({
//   skill,
//   onUpdate,
//   onDelete,
// }: {
//   skill: SimpleSkill;
//   onUpdate: (id: string | number, newName: string) => void;
//   onDelete: (id: string | number) => void;
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editValue, setEditValue] = useState(skill.name);

//   const saveEdit = () => {
//     if (editValue.trim() && editValue.trim() !== skill.name) {
//       onUpdate(skill.id, editValue.trim());
//     }
//     setIsEditing(false);
//   };

//   return (
//     <div className="flex-shrink-0 max-w-full">
//       {isEditing ? (
//         <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 border-2 border-indigo-400 rounded-xl">
//           <input
//             type="text"
//             value={editValue}
//             onChange={(e) => setEditValue(e.target.value)}
//             className="flex-1 bg-transparent text-sm focus:outline-none min-w-[100px] text-gray-800"
//             autoFocus
//             onKeyPress={(e) => e.key === "Enter" && saveEdit()}
//             onBlur={saveEdit}
//           />
//           <button
//             onClick={() => setIsEditing(false)}
//             className="p-1 text-indigo-600 hover:bg-indigo-100 rounded shrink-0"
//           >
//             <FiX className="w-4 h-4" />
//           </button>
//         </div>
//       ) : (
//         <div
//           onClick={() => {
//             setIsEditing(true);
//             setEditValue(skill.name);
//           }}
//           className="group flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
//         >
//           <span className="text-gray-700 text-sm font-medium break-words max-w-[250px]">
//             {skill.name}
//           </span>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onDelete(skill.id);
//             }}
//             className="p-1 text-gray-400 hover:text-red-500 rounded opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
//           >
//             <FiTrash2 className="w-3.5 h-3.5" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // Component for categorized skill item
// const CategorizedSkillItem = ({
//   skill,
//   categoryId,
//   onUpdate,
//   onDelete,
// }: {
//   skill: SimpleSkill;
//   categoryId: string | number;
//   onUpdate: (
//     categoryId: string | number,
//     skillId: string | number,
//     newName: string,
//   ) => void;
//   onDelete: (categoryId: string | number, skillId: string | number) => void;
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editValue, setEditValue] = useState(skill.name);

//   const saveEdit = () => {
//     if (editValue.trim() && editValue.trim() !== skill.name) {
//       onUpdate(categoryId, skill.id, editValue.trim());
//     }
//     setIsEditing(false);
//   };

//   return (
//     <div className="flex-shrink-0 max-w-full">
//       {isEditing ? (
//         <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border-2 border-indigo-400 rounded-full">
//           <input
//             type="text"
//             value={editValue}
//             onChange={(e) => setEditValue(e.target.value)}
//             className="flex-1 bg-transparent text-sm focus:outline-none min-w-[100px] text-gray-800"
//             autoFocus
//             onKeyPress={(e) => e.key === "Enter" && saveEdit()}
//             onBlur={saveEdit}
//           />
//           <button
//             onClick={() => setIsEditing(false)}
//             className="text-indigo-600 hover:bg-indigo-100 rounded p-0.5 shrink-0"
//           >
//             <FiX className="w-3.5 h-3.5" />
//           </button>
//         </div>
//       ) : (
//         <div className="group flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full hover:border-indigo-300 hover:shadow-sm transition-all">
//           <span
//             onClick={() => {
//               setIsEditing(true);
//               setEditValue(skill.name);
//             }}
//             className="text-sm text-gray-700 cursor-pointer hover:text-indigo-600 transition-colors break-words max-w-[250px]"
//           >
//             {skill.name}
//           </span>
//           <button
//             onClick={() => onDelete(categoryId, skill.id)}
//             className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
//           >
//             <FiX className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// const SkillsForm = () => {
//   const [skillTipsClicked, setSkillTipsClicked] = useState(false);
//   const [skillsMode, setSkillsMode] = useState<SkillsMode>("simple");
//   const router = useRouter();
//   const UseContext = useContext(CreateContext);
//   const contactId = UseContext?.contact?._id;

//   const { skills, setSkills} = UseContext;

//   const [simpleSkills, setSimpleSkills] = useState<SimpleSkill[]>([]);
//   const [newSkillInput, setNewSkillInput] = useState<string>("");
//   const [categorizedSkills, setCategorizedSkills] = useState<SkillCategory[]>(
//     [],
//   );
//   const [newCategoryTitle, setNewCategoryTitle] = useState<string>("");
//   const [showAddCategory, setShowAddCategory] = useState<boolean>(false);

//   const [Airesponse, setAiresponse] = useState<string[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [showPopup, setShowPopup] = useState<boolean>(false);
//   const [isSaving, setIsSaving] = useState<boolean>(false);
//   const [lastSavedData, setLastSavedData] = useState<string>("");
//   const [isMobile, setIsMobile] = useState<boolean>(false);

//   // Check if mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Generate unique ID
//   const generateId = useCallback(() => {
//     return crypto.randomUUID();
//   }, []);

//   // Initialize skills data
//   useEffect(() => {
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
//   }, [skills]);

//   const saveToAPI = async (
//     skillsDataToSave: SimpleSkill[] | SkillCategory[],
//   ) => {
//     if (!contactId) return false;

//     const currentDataString = JSON.stringify(skillsDataToSave);
//     if (currentDataString === lastSavedData) return true;

//     setIsSaving(true);
//     try {
//       await axios.post(
//         `${API_URL}/api/skill/update`,
//         { skills: skillsDataToSave },
//         {
//           params: { contactId },
//         },
//       );
//       setLastSavedData(currentDataString);
//       return true;
//     } catch (err) {
//       toast.error("Failed to save Skills!");
//       return false;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const fetchSkill = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/skill/get-skill/${contactId}`,
//       );
//       const skillsList = response.data?.[0]?.skills || [];
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Simple mode functions
//   const addSimpleSkill = () => {
//     if (newSkillInput.trim()) {
//       const updated = [
//         ...simpleSkills,
//         { id: generateId(), name: newSkillInput.trim() },
//       ];
//       setSimpleSkills(updated);
//       setNewSkillInput("");
//       setSkills(updated);
//     }
//   };

//   const deleteSimpleSkill = (skillId: string | number) => {
//     const updated = simpleSkills.filter((skill) => skill.id !== skillId);
//     setSimpleSkills(updated);
//     setSkills(updated);

//   };

//   const updateSimpleSkill = (skillId: string | number, newName: string) => {
//     const updated = simpleSkills.map((skill) =>
//       skill.id === skillId ? { ...skill, name: newName } : skill,
//     );
//     setSimpleSkills(updated);
//     toast.success("Skill updated!");
//   };

//   // Categorized mode functions
//   const addCategory = () => {
//     if (newCategoryTitle.trim()) {
//       const newCategory: SkillCategory = {
//         id: generateId(),
//         title: newCategoryTitle.trim(),
//         skills: [],
//         isOpen: true,
//       };
//       const updated = [...categorizedSkills, newCategory];
//       setCategorizedSkills(updated);
//       setNewCategoryTitle("");
//       setShowAddCategory(false);
//       setSkills(updated);
//     }
//   };

//   const deleteCategory = (categoryId: string | number) => {
//     const updated = categorizedSkills.filter((cat) => cat.id !== categoryId);
//     setCategorizedSkills(updated);
//     setSkills(updated);
//   };

//   const toggleCategory = (categoryId: string | number) => {
//     const updated = categorizedSkills.map((cat) =>
//       cat.id === categoryId ? { ...cat, isOpen: !cat.isOpen } : cat,
//     );
//     setCategorizedSkills(updated);
//     setSkills(updated);
//   };

//   const addCategorizedSkill = (
//     categoryId: string | number,
//     skillName: string,
//   ) => {
//     if (!skillName.trim()) return;
//     const updated = categorizedSkills.map((cat) =>
//       cat.id === categoryId
//         ? {
//             ...cat,
//             skills: [
//               ...cat.skills,
//               { id: generateId(), name: skillName.trim() },
//             ],
//           }
//         : cat,
//     );
//     setCategorizedSkills(updated);
//     setSkills(updated);
//   };

//   const deleteCategorizedSkill = (
//     categoryId: string | number,
//     skillId: string | number,
//   ) => {
//     const updated = categorizedSkills.map((cat) =>
//       cat.id === categoryId
//         ? { ...cat, skills: cat.skills.filter((skill) => skill.id !== skillId) }
//         : cat,
//     );
//     setCategorizedSkills(updated);
//     setSkills(updated);
//   };

//   const updateCategorizedSkill = (
//     categoryId: string | number,
//     skillId: string | number,
//     newName: string,
//   ) => {
//     const updated = categorizedSkills.map((cat) =>
//       cat.id === categoryId
//         ? {
//             ...cat,
//             skills: cat.skills.map((skill) =>
//               skill.id === skillId ? { ...skill, name: newName } : skill,
//             ),
//           }
//         : cat,
//     );
//     setCategorizedSkills(updated)
//     setSkills(updated);
//   };

//   const updateCategoryTitle = (
//     categoryId: string | number,
//     newTitle: string,
//   ) => {
//     if (!newTitle.trim()) return;
//     const updated = categorizedSkills.map((cat) =>
//       cat.id === categoryId ? { ...cat, title: newTitle.trim() } : cat,
//     );
//     setCategorizedSkills(updated);
//     setSkills(updated);
//   };

//   // AI Functions
//   const handleSubmitAi = async () => {
//     setLoading(true);
//     setAiresponse(null);
//     try {
//       const experienceTitlesList =
//         UseContext?.experiences?.map((item: any) => item.jobTitle) || [];
//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/resume/skills`,
//         {
//           job_titles: experienceTitlesList,
//         },
//       );
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
//       const updated = [...simpleSkills, { id: generateId(), name: item }];
//       setSimpleSkills(updated);
//     } else {
//       if (categorizedSkills.length === 0) {
//         const newCategory: SkillCategory = {
//           id: generateId(),
//           title: "Skills",
//           isOpen: true,
//           skills: [{ id: generateId(), name: item }],
//         };
//         setCategorizedSkills([newCategory]);
//       } else {
//         const updated = categorizedSkills.map((cat, idx) =>
//           idx === 0
//             ? {
//                 ...cat,
//                 skills: [...cat.skills, { id: generateId(), name: item }],
//               }
//             : cat,
//         );
//         setCategorizedSkills(updated);
//       }
//     }
//     if (Airesponse) {
//       const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
//       setAiresponse(newAiResponse.length > 0 ? newAiResponse : null);
//     }
//     toast.success("Skill added!");
//   };

//   const experienceTitlesList =
//     UseContext?.experiences?.map((item: any) => item.jobTitle) || [];

//   const [showMobileWarning, setShowMobileWarning] = useState(false);

//   console.log("skills", skills);

//   return (
//     <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50/40">
//       {/* Sticky Stepper */}
//       <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
//         <Stepper />
//       </div>

//       {/* Scrollable Content Area */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="mx-auto px-2  py-6 sm:py-8 lg:py-10">
//           {/* Header Section */}
//           <div className="text-center mb-6 sm:mb-8">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
//               Skills & Expertise
//             </h1>

//             <p className="text-gray-500 text-sm max-w-md mx-auto">
//               Showcase your professional skills and technical expertise
//             </p>

//             <button
//               onClick={() => setSkillTipsClicked(true)}
//               className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
//             >
//               <FaRegLightbulb className="w-3 h-3" />
//               <span>Skills Tips</span>
//             </button>
//           </div>

//           {/* Main Form Card */}
//           <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//             {/* Card Header */}
//             <div className="relative px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-linear-to-r from-indigo-50 to-white border-b border-gray-100">
//               <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-100 rounded-full filter blur-3xl opacity-50"></div>
//               <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-xl">
//                     <IoDiamondOutline className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
//                   </div>
//                   <div>
//                     <h2 className="text-base sm:text-lg font-semibold text-gray-900">
//                       Professional Skills
//                     </h2>
//                     <p className="text-xs sm:text-sm text-gray-500">
//                       Add your technical and soft skills
//                     </p>
//                   </div>
//                 </div>
//                 {isSaving && (
//                   <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full self-start sm:self-auto">
//                     <div className="w-2 h-2 sm:w-3 sm:h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
//                     <span className="text-[10px] sm:text-xs text-indigo-700 font-medium">
//                       Saving...
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Form Content */}
//             <div className="p-4 sm:p-6 lg:p-8">
//               {/* Mode Toggle */}
//               <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
//                 <div className="bg-gray-100 rounded-xl p-1 flex gap-1 w-full sm:w-auto">
//                   <button
//                     onClick={() => setSkillsMode("simple")}
//                     className={`flex-1 sm:flex-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                       skillsMode === "simple"
//                         ? "bg-white text-indigo-600 shadow-sm"
//                         : "text-gray-600 hover:text-gray-800"
//                     }`}
//                   >
//                     <FiList className="w-4 h-4" />
//                     <span>Simple List</span>
//                   </button>
//                   <button
//                     onClick={() => setSkillsMode("categorized")}
//                     className={`flex-1 sm:flex-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                       skillsMode === "categorized"
//                         ? "bg-white text-indigo-600 shadow-sm"
//                         : "text-gray-600 hover:text-gray-800"
//                     }`}
//                   >
//                     <FiGrid className="w-4 h-4" />
//                     <span>Categories</span>
//                   </button>
//                 </div>

//                 <div className="relative inline-block group">
//                   <button
//                     onClick={() => {
//                       if (experienceTitlesList.length === 0) {
//                         if (window.innerWidth < 768) {
//                           setShowMobileWarning(true);
//                         }
//                       } else {
//                         handleSubmitAi();
//                       }
//                     }}
//                     disabled={loading}
//                     className={`flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all ${
//                       experienceTitlesList.length === 0
//                         ? "cursor-not-allowed opacity-50"
//                         : ""
//                     }`}
//                   >
//                     {loading ? (
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     ) : (
//                       <FaMagic className="w-4 h-4" />
//                     )}
//                     <span>AI Suggest Skills</span>
//                   </button>

//                   {/* Desktop Tooltip */}
//                   {experienceTitlesList.length === 0 && !isMobile && (
//                     <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-[100]">
//                       <div className="flex items-center gap-2">
//                         <svg
//                           className="w-3 h-3"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                         <span>
//                           Add work experience first for personalized suggestions
//                         </span>
//                       </div>
//                       <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Simple Mode */}
//               {skillsMode === "simple" && (
//                 <div>
//                   {simpleSkills.length > 0 ? (
//                     <div className="flex flex-wrap gap-3 mb-6">
//                       {simpleSkills.map((skill) => (
//                         <SkillItem
//                           key={skill.id}
//                           skill={skill}
//                           onUpdate={updateSimpleSkill}
//                           onDelete={deleteSimpleSkill}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <FiTag className="w-8 h-8 text-gray-400" />
//                       </div>
//                       <h3 className="text-base font-semibold text-gray-700 mb-2">
//                         No skills added yet
//                       </h3>
//                       <p className="text-gray-400 text-sm">
//                         Start adding your professional skills below
//                       </p>
//                     </div>
//                   )}

//                   <div className="flex flex-col sm:flex-row gap-3">
//                     <div className="flex-1 relative">
//                       <input
//                         type="text"
//                         value={newSkillInput}
//                         onChange={(e) => setNewSkillInput(e.target.value)}
//                         onKeyPress={(e) =>
//                           e.key === "Enter" && addSimpleSkill()
//                         }
//                         placeholder="Type a skill and press Enter..."
//                         className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                       />
//                     </div>
//                     <button
//                       onClick={addSimpleSkill}
//                       className="px-6 py-3 bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
//                     >
//                       <IoMdAdd className="w-5 h-5" />
//                       <span>Add Skill</span>
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Categorized Mode */}
//               {skillsMode === "categorized" && (
//                 <div>
//                   {categorizedSkills.length > 0 && (
//                     <div className="space-y-4 mb-6">
//                       {categorizedSkills.map((category) => (
//                         <motion.div
//                           key={category.id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           className="border border-gray-200 rounded-xl overflow-hidden"
//                         >
//                           <div
//                             onClick={() => toggleCategory(category.id)}
//                             className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors gap-2"
//                           >
//                             <div className="flex items-center gap-3 flex-1 min-w-0">
//                               <motion.div
//                                 animate={{ rotate: category.isOpen ? 90 : 0 }}
//                                 className="text-gray-400 shrink-0"
//                               >
//                                 <FiChevronDown className="w-5 h-5" />
//                               </motion.div>
//                               <input
//                                 type="text"
//                                 value={category.title}
//                                 onChange={(e) =>
//                                   updateCategoryTitle(
//                                     category.id,
//                                     e.target.value,
//                                   )
//                                 }
//                                 onClick={(e) => e.stopPropagation()}
//                                 className="font-semibold text-gray-800 bg-transparent px-2 py-1 rounded focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-200 flex-1 min-w-[100px]"
//                               />
//                               <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full shrink-0">
//                                 {category?.skills?.length}
//                               </span>
//                             </div>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 deleteCategory(category.id);
//                               }}
//                               className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors shrink-0 self-end sm:self-auto"
//                             >
//                               <FiTrash2 className="w-4 h-4" />
//                             </button>
//                           </div>

//                           <AnimatePresence>
//                             {category.isOpen && (
//                               <motion.div
//                                 initial={{ opacity: 0, height: 0 }}
//                                 animate={{ opacity: 1, height: "auto" }}
//                                 exit={{ opacity: 0, height: 0 }}
//                                 className="border-t border-gray-100"
//                               >
//                                 <div className="p-4">
//                                   <div className="flex flex-wrap gap-2 mb-4">
//                                     {category?.skills.map((skill) => (
//                                       <CategorizedSkillItem
//                                         key={skill.id}
//                                         skill={skill}
//                                         categoryId={category.id}
//                                         onUpdate={updateCategorizedSkill}
//                                         onDelete={deleteCategorizedSkill}
//                                       />
//                                     ))}
//                                   </div>

//                                   <div className="flex flex-col sm:flex-row gap-2">
//                                     <input
//                                       type="text"
//                                       placeholder="Add a skill..."
//                                       className="flex-1 px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                                       onKeyPress={(e) => {
//                                         if (e.key === "Enter") {
//                                           const input =
//                                             e.target as HTMLInputElement;
//                                           if (input.value.trim()) {
//                                             addCategorizedSkill(
//                                               category.id,
//                                               input.value,
//                                             );
//                                             input.value = "";
//                                           }
//                                         }
//                                       }}
//                                     />
//                                     <button
//                                       onClick={(e) => {
//                                         const container = (
//                                           e.target as HTMLElement
//                                         ).parentElement?.previousElementSibling;
//                                         const input = container?.querySelector(
//                                           "input",
//                                         ) as HTMLInputElement;
//                                         if (input && input.value.trim()) {
//                                           addCategorizedSkill(
//                                             category.id,
//                                             input.value,
//                                           );
//                                           input.value = "";
//                                         }
//                                       }}
//                                       className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
//                                     >
//                                       <IoMdAdd className="w-5 h-5" />
//                                     </button>
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </motion.div>
//                       ))}
//                     </div>
//                   )}

//                   {!showAddCategory ? (
//                     <button
//                       onClick={() => setShowAddCategory(true)}
//                       className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
//                     >
//                       <FiPlus className="w-5 h-5" />
//                       <span className="font-medium">
//                         {categorizedSkills.length === 0
//                           ? "Create First Category"
//                           : "Add New Category"}
//                       </span>
//                     </button>
//                   ) : (
//                     <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
//                       <input
//                         type="text"
//                         value={newCategoryTitle}
//                         onChange={(e) => setNewCategoryTitle(e.target.value)}
//                         placeholder="Category name (e.g., Frontend, Backend, Tools)"
//                         className="w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 mb-3"
//                         autoFocus
//                         onKeyPress={(e) => e.key === "Enter" && addCategory()}
//                       />
//                       <div className="flex flex-col sm:flex-row gap-3">
//                         <button
//                           onClick={addCategory}
//                           className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
//                         >
//                           Add Category
//                         </button>
//                         <button
//                           onClick={() => {
//                             setShowAddCategory(false);
//                             setNewCategoryTitle("");
//                           }}
//                           className="flex-1 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sticky Footer Buttons */}
//       <div className="sticky bottom-0 z-20 bg-white/80 backdrop-blur-md border-t border-gray-100 shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
//           <div className="flex justify-between items-center gap-3">
//             <button
//               className="text-xs sm:text-sm font-medium text-gray-500 hover:text-indigo-600 transition flex items-center gap-1 cursor-pointer"
//               onClick={() => router.push("/resume-details/education")}
//             >
//               ← Back to Education
//             </button>
//             <button
//               className="px-4 sm:px-6 py-2 sm:py-2.5  bg-linear-to-r from-indigo-600 to-indigo-500 text-white t font-medium rounded-lg sm:rounded-xl shadow-md transition-all hover:shadow-indigo-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
//               onClick={() => {
//                 const currentSkills =
//                   skillsMode === "simple" ? simpleSkills : categorizedSkills;
//                 saveToAPI(currentSkills).then(() =>
//                   router.push("/resume-details/project"),
//                 );
//               }}
//             >
//               <span>Continue to Projects</span>
//               <IoArrowForward className="w-3 h-3 sm:w-4 sm:h-4" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Tips Modal */}
//       {skillTipsClicked && (
//         <AnimatePresence>
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div
//               className="absolute inset-0 backdrop-blur-md bg-black/50"
//               onClick={() => setSkillTipsClicked(false)}
//             />
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
//             >
//               <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-5 py-4">
//                 <div className="flex items-center gap-2">
//                   <FaRegLightbulb className="w-5 h-5 text-white" />
//                   <h3 className="text-lg font-bold text-white">Skills Tips</h3>
//                 </div>
//               </div>

//               <div className="p-5">
//                 <div className="bg-amber-50 rounded-xl p-3 mb-4 border border-amber-100">
//                   <div className="flex items-center gap-2 mb-1">
//                     <FaStar className="w-3 h-3 text-amber-500" />
//                     <span className="text-xs font-semibold text-amber-700">
//                       Pro Tip
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-700">
//                     List job-relevant skills and use keywords from job
//                     descriptions
//                   </p>
//                 </div>

//                 <div className="space-y-3">
//                   <h4 className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
//                     Best Practices
//                   </h4>
//                   {[
//                     "List job-relevant skills matching the role",
//                     "Use keywords from job descriptions for ATS",
//                     "Keep it concise - aim for 4-5 strongest skills",
//                     "Include both technical and soft skills",
//                   ].map((tip, idx) => (
//                     <div key={idx} className="flex items-start gap-2">
//                       <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5" />
//                       <span className="text-xs text-gray-700">{tip}</span>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-4 pt-3 border-t border-gray-100">
//                   <button
//                     onClick={() => setSkillTipsClicked(false)}
//                     className="w-full px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all"
//                   >
//                     Got it, thanks! ✨
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </AnimatePresence>
//       )}

//       {/* AI Popup */}
//       {showPopup && Airesponse && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
//           >
//             <div className="bg-linear-to-r from-indigo-600 to-indigo-500 px-5 py-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="text-lg font-semibold text-white">
//                     AI Recommendations
//                   </h2>
//                   <p className="text-indigo-100 text-xs">
//                     Click any skill to add it to your list
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowPopup(false)}
//                   className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
//                 >
//                   <IoClose className="w-4 h-4 text-white" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-5 max-h-[60vh] overflow-y-auto">
//               <div className="flex flex-wrap gap-2">
//                 {Airesponse.map((item, index) => (
//                   <motion.button
//                     key={index}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: index * 0.05 }}
//                     onClick={() => insertAIResponse(item, index)}
//                     className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-indigo-500 hover:text-white transition-all cursor-pointer"
//                   >
//                     {item}
//                   </motion.button>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {/* Mobile Warning Modal */}
//       {showMobileWarning && (
//         <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 md:hidden">
//           <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
//                 <svg
//                   className="w-5 h-5 text-amber-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Cannot Generate AI Suggestions
//               </h3>
//             </div>
//             <p className="text-gray-600 mb-6">
//               Please add your work experience first to get personalized
//               AI-powered skill recommendations.
//             </p>
//             <button
//               onClick={() => setShowMobileWarning(false)}
//               className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
//             >
//               Got it
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
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
//   FiCheckCircle,
//   FiXCircle,
//   FiChevronDown,
//   FiTrash2,
//   FiPlus,
//   FiGrid,
//   FiList,
//   FiX,
//   FiZap,
//   FiArrowRight,
//   FiTag,
//   FiShield,
// } from "react-icons/fi";
// import { CreateContext } from "@/app/context/CreateContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   FaRegLightbulb,
//   FaTimes,
//   FaGraduationCap,
//   FaMagic,
//   FaStar,
// } from "react-icons/fa";
// import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
// import {
//   IoArrowForward,
//   IoClose,
//   IoDiamondOutline,
//   IoSparkles,
// } from "react-icons/io5";
// import { useRouter } from "next/navigation";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { API_URL } from "@/app/config/api";
// import { SimpleSkill, SkillCategory, SkillsType } from "@/app/types";
// import { Stepper, TipsModal } from "@/app/components/resume";

// type SkillsMode = "simple" | "categorized";

// const SkillItem = ({
//   skill,
//   onUpdate,
//   onDelete,
// }: {
//   skill: SimpleSkill;
//   onUpdate: (id: string | number, newName: string) => void;
//   onDelete: (id: string | number) => void;
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editValue, setEditValue] = useState(skill.name);

//   const saveEdit = () => {
//     if (editValue.trim() && editValue.trim() !== skill.name) {
//       onUpdate(skill.id, editValue.trim());
//     }
//     setIsEditing(false);
//   };

//   return (
//     <div className="shrink-0 max-w-full">
//       {isEditing ? (
//         <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 border-2 border-indigo-400 rounded-xl">
//           <input
//             type="text"
//             value={editValue}
//             onChange={(e) => setEditValue(e.target.value)}
//             className="flex-1 bg-transparent text-sm focus:outline-none min-w-25 text-gray-800"
//             autoFocus
//             onKeyPress={(e) => e.key === "Enter" && saveEdit()}
//             onBlur={saveEdit}
//           />
//           <button
//             onClick={() => setIsEditing(false)}
//             className="p-1 text-indigo-600 hover:bg-indigo-100 rounded shrink-0"
//           >
//             <FiX className="w-4 h-4" />
//           </button>
//         </div>
//       ) : (
//         <div
//           onClick={() => {
//             setIsEditing(true);
//             setEditValue(skill.name);
//           }}
//           className="group flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
//         >
//           <span className="text-gray-700 text-sm font-medium wrap-break-word max-w-62.5">
//             {skill.name}
//           </span>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onDelete(skill.id);
//             }}
//             className="p-1 text-gray-400 hover:text-red-500 rounded opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
//           >
//             <FiTrash2 className="w-3.5 h-3.5" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // Component for categorized skill item
// const CategorizedSkillItem = ({
//   skill,
//   categoryId,
//   onUpdate,
//   onDelete,
// }: {
//   skill: SimpleSkill;
//   categoryId: string | number;
//   onUpdate: (
//     categoryId: string | number,
//     skillId: string | number,
//     newName: string,
//   ) => void;
//   onDelete: (categoryId: string | number, skillId: string | number) => void;
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editValue, setEditValue] = useState(skill.name);

//   const saveEdit = () => {
//     if (editValue.trim() && editValue.trim() !== skill.name) {
//       onUpdate(categoryId, skill.id, editValue.trim());
//     }
//     setIsEditing(false);
//   };

//   return (
//     <div className="shrink-0 max-w-full">
//       {isEditing ? (
//         <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border-2 border-indigo-400 rounded-full">
//           <input
//             type="text"
//             value={editValue}
//             onChange={(e) => setEditValue(e.target.value)}
//             className="flex-1 bg-transparent text-sm focus:outline-none min-w-25 text-gray-800"
//             autoFocus
//             onKeyPress={(e) => e.key === "Enter" && saveEdit()}
//             onBlur={saveEdit}
//           />
//           <button
//             onClick={() => setIsEditing(false)}
//             className="text-indigo-600 hover:bg-indigo-100 rounded p-0.5 shrink-0"
//           >
//             <FiX className="w-3.5 h-3.5" />
//           </button>
//         </div>
//       ) : (
//         <div className="group flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full hover:border-indigo-300 hover:shadow-sm transition-all">
//           <span
//             onClick={() => {
//               setIsEditing(true);
//               setEditValue(skill.name);
//             }}
//             className="text-sm text-gray-700 cursor-pointer hover:text-indigo-600 transition-colors wrap-break-word  max-w-62.5"
//           >
//             {skill.name}
//           </span>
//           <button
//             onClick={() => onDelete(categoryId, skill.id)}
//             className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
//           >
//             <FiX className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// const SkillsForm = () => {
//   const [skillTipsClicked, setSkillTipsClicked] = useState(false);
//   const [skillsMode, setSkillsMode] = useState<SkillsMode>("simple");
//   const router = useRouter();
//   const UseContext = useContext(CreateContext);
//   const contactId = UseContext?.contact?._id;

//   const { skills, setSkills } = UseContext;

//   const [simpleSkills, setSimpleSkills] = useState<SimpleSkill[]>([]);
//   const [newSkillInput, setNewSkillInput] = useState<string>("");
//   const [categorizedSkills, setCategorizedSkills] = useState<SkillCategory[]>(
//     [],
//   );
//   const [newCategoryTitle, setNewCategoryTitle] = useState<string>("");
//   const [showAddCategory, setShowAddCategory] = useState<boolean>(false);

//   const [Airesponse, setAiresponse] = useState<string[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [showPopup, setShowPopup] = useState<boolean>(false);
//   const [isSaving, setIsSaving] = useState<boolean>(false);
//   const [lastSavedData, setLastSavedData] = useState<string>("");
//   const [isMobile, setIsMobile] = useState<boolean>(false);

//   // Helper function to update categorized state and sync with context
//   const updateCategorizedState = (updatedCategories: SkillCategory[]) => {
//     setCategorizedSkills(updatedCategories);
//     setSkills(updatedCategories);
//   };

//   // Helper function to update simple state and sync with context
//   const updateSimpleState = (updatedSkills: SimpleSkill[]) => {
//     setSimpleSkills(updatedSkills);
//     setSkills(updatedSkills);
//   };

//   // Check if mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Generate unique ID
//   const generateId = useCallback(() => {
//     return crypto.randomUUID();
//   }, []);

//   // Initialize skills data
//   useEffect(() => {
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
//   }, [skills]);

//   const saveToAPI = async (
//     skillsDataToSave: SimpleSkill[] | SkillCategory[],
//   ) => {
//     if (!contactId) return false;

//     const currentDataString = JSON.stringify(skillsDataToSave);
//     if (currentDataString === lastSavedData) return true;

//     setIsSaving(true);
//     try {
//       await axios.post(
//         `${API_URL}/api/skill/update`,
//         { skills: skillsDataToSave },
//         {
//           params: { contactId },
//         },
//       );
//       setLastSavedData(currentDataString);
//       return true;
//     } catch (err) {
//       toast.error("Failed to save Skills!");
//       return false;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const fetchSkill = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/skill/get-skill/${contactId}`,
//       );
//       const skillsList = response.data?.[0]?.skills || [];
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Simple mode functions
//   const addSimpleSkill = () => {
//     if (newSkillInput.trim()) {
//       const updated = [
//         ...simpleSkills,
//         { id: generateId(), name: newSkillInput.trim() },
//       ];
//       updateSimpleState(updated);
//       setNewSkillInput("");
//     }
//   };

//   const deleteSimpleSkill = (skillId: string | number) => {
//     const updated = simpleSkills.filter((skill) => skill.id !== skillId);
//     updateSimpleState(updated);
//   };

//   const updateSimpleSkill = (skillId: string | number, newName: string) => {
//     const updated = simpleSkills.map((skill) =>
//       skill.id === skillId ? { ...skill, name: newName } : skill,
//     );
//     updateSimpleState(updated);
//     toast.success("Skill updated!");
//   };

//   // Categorized mode functions
//   const addCategory = () => {
//     if (newCategoryTitle.trim()) {
//       const newCategory: SkillCategory = {
//         id: generateId(),
//         title: newCategoryTitle.trim(),
//         skills: [],
//         isOpen: true,
//       };
//       const updated = [...categorizedSkills, newCategory];
//       updateCategorizedState(updated);
//       setNewCategoryTitle("");
//       setShowAddCategory(false);
//     }
//   };

//   const deleteCategory = (categoryId: string | number) => {
//     const updated = categorizedSkills.filter((cat) => cat.id !== categoryId);
//     updateCategorizedState(updated);
//   };

//   const toggleCategory = (categoryId: string | number) => {
//     const updated = categorizedSkills.map((cat) =>
//       cat.id === categoryId ? { ...cat, isOpen: !cat.isOpen } : cat,
//     );
//     updateCategorizedState(updated);
//   };

//   const addCategorizedSkill = (
//     categoryId: string | number,
//     skillName: string,
//   ) => {
//     if (!skillName.trim()) return;
//     const updated = categorizedSkills.map((cat) =>
//       cat.id === categoryId
//         ? {
//             ...cat,
//             skills: [
//               ...cat.skills,
//               { id: generateId(), name: skillName.trim() },
//             ],
//           }
//         : cat,
//     );
//     updateCategorizedState(updated);
//   };

//   const deleteCategorizedSkill = (
//     categoryId: string | number,
//     skillId: string | number,
//   ) => {
//     const updated = categorizedSkills.map((cat) =>
//       cat.id === categoryId
//         ? { ...cat, skills: cat.skills.filter((skill) => skill.id !== skillId) }
//         : cat,
//     );
//     updateCategorizedState(updated);
//   };

//   const updateCategorizedSkill = (
//     categoryId: string | number,
//     skillId: string | number,
//     newName: string,
//   ) => {
//     const updated = categorizedSkills.map((cat) =>
//       cat.id === categoryId
//         ? {
//             ...cat,
//             skills: cat.skills.map((skill) =>
//               skill.id === skillId ? { ...skill, name: newName } : skill,
//             ),
//           }
//         : cat,
//     );
//     updateCategorizedState(updated);
//   };

//   const updateCategoryTitle = (
//     categoryId: string | number,
//     newTitle: string,
//   ) => {
//     if (!newTitle.trim()) return;
//     const updated = categorizedSkills.map((cat) =>
//       cat.id === categoryId ? { ...cat, title: newTitle.trim() } : cat,
//     );
//     updateCategorizedState(updated);
//   };

//   // AI Functions
//   const handleSubmitAi = async () => {
//     setLoading(true);
//     setAiresponse(null);
//     try {
//       const experienceTitlesList =
//         UseContext?.experiences?.map((item: any) => item.jobTitle) || [];
//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/resume/skills`,
//         {
//           job_titles: experienceTitlesList,
//         },
//       );
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
//       const updated = [...simpleSkills, { id: generateId(), name: item }];
//       updateSimpleState(updated);
//     } else {
//       if (categorizedSkills.length === 0) {
//         const newCategory: SkillCategory = {
//           id: generateId(),
//           title: "Skills",
//           isOpen: true,
//           skills: [{ id: generateId(), name: item }],
//         };
//         updateCategorizedState([newCategory]);
//       } else {
//         const updated = categorizedSkills.map((cat, idx) =>
//           idx === 0
//             ? {
//                 ...cat,
//                 skills: [...cat.skills, { id: generateId(), name: item }],
//               }
//             : cat,
//         );
//         updateCategorizedState(updated);
//       }
//     }
//     if (Airesponse) {
//       const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
//       setAiresponse(newAiResponse.length > 0 ? newAiResponse : null);
//     }
//     toast.success("Skill added!");
//   };

//   const experienceTitlesList =
//     UseContext?.experiences?.map((item: any) => item.jobTitle) || [];

//   const [showMobileWarning, setShowMobileWarning] = useState(false);

//   return (
//     <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50/40">
//       {/* Sticky Stepper */}
//       {/* <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
//         <Stepper />
//       </div> */}

//             <Stepper/>

//       {/* Scrollable Content Area */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="mx-auto px-2 py-6 sm:py-8 lg:py-10">
//           {/* Header Section */}
//           <div className="text-center mb-6 sm:mb-8">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
//               Skills & Expertise
//             </h1>

//             <p className="text-gray-500 text-sm max-w-md mx-auto">
//               Showcase your professional skills and technical expertise
//             </p>

//             <button
//               onClick={() => setSkillTipsClicked(true)}
//               className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
//             >
//               <FaRegLightbulb className="w-3 h-3" />
//               <span>Skills Tips</span>
//             </button>
//           </div>

//           {/* Main Form Card */}
//           <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//             {/* Card Header */}
//             <div className="relative px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-linear-to-r from-indigo-50 to-white border-b border-gray-100">
//               <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-100 rounded-full filter blur-3xl opacity-50"></div>
//               <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-xl">
//                     <IoDiamondOutline className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
//                   </div>
//                   <div>
//                     <h2 className="text-base sm:text-lg font-semibold text-gray-900">
//                       Professional Skills
//                     </h2>
//                     <p className="text-xs sm:text-sm text-gray-500">
//                       Add your technical and soft skills
//                     </p>
//                   </div>
//                 </div>
//                 {isSaving && (
//                   <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full self-start sm:self-auto">
//                     <div className="w-2 h-2 sm:w-3 sm:h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
//                     <span className="text-[10px] sm:text-xs text-indigo-700 font-medium">
//                       Saving...
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Form Content */}
//             <div className="p-4 sm:p-6 lg:p-8">
//               {/* Mode Toggle */}
//               <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
//                 <div className="bg-gray-100 rounded-xl p-1 flex gap-1 w-full sm:w-auto">
//                   <button
//                     onClick={() => {
//                       setSkillsMode("simple");
//                       if (simpleSkills.length > 0) {
//                         setSkills(simpleSkills);
//                       }
//                     }}
//                     className={`flex-1 sm:flex-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                       skillsMode === "simple"
//                         ? "bg-white text-indigo-600 shadow-sm"
//                         : "text-gray-600 hover:text-gray-800"
//                     }`}
//                   >
//                     <FiList className="w-4 h-4" />
//                     <span>Simple List</span>
//                   </button>
//                   <button
//                     onClick={() => {
//                       setSkillsMode("categorized");
//                       if (categorizedSkills.length > 0) {
//                         setSkills(categorizedSkills);
//                       }
//                     }}
//                     className={`flex-1 sm:flex-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                       skillsMode === "categorized"
//                         ? "bg-white text-indigo-600 shadow-sm"
//                         : "text-gray-600 hover:text-gray-800"
//                     }`}
//                   >
//                     <FiGrid className="w-4 h-4" />
//                     <span>Categories</span>
//                   </button>
//                 </div>

//                 <div className="relative inline-block group">
//                   <button
//                     onClick={() => {
//                       if (experienceTitlesList.length === 0) {
//                         if (window.innerWidth < 768) {
//                           setShowMobileWarning(true);
//                         }
//                       } else {
//                         handleSubmitAi();
//                       }
//                     }}
//                     disabled={loading}
//                     className={`flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all ${
//                       experienceTitlesList.length === 0
//                         ? "cursor-not-allowed opacity-50"
//                         : ""
//                     }`}
//                   >
//                     {loading ? (
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     ) : (
//                       <FaMagic className="w-4 h-4" />
//                     )}
//                     <span>Generate With AI</span>
//                   </button>

//                   {/* Desktop Tooltip */}
//                   {experienceTitlesList.length === 0 && !isMobile && (
//                     <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-100">
//                       <div className="flex items-center gap-2">
//                         <svg
//                           className="w-3 h-3"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                         <span>
//                           Add work experience first for personalized suggestions
//                         </span>
//                       </div>
//                       <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Simple Mode */}
//               {skillsMode === "simple" && (
//                 <div>
//                   {simpleSkills.length > 0 ? (
//                     <div className="flex flex-wrap gap-3 mb-6">
//                       {simpleSkills.map((skill) => (
//                         <SkillItem
//                           key={skill.id}
//                           skill={skill}
//                           onUpdate={updateSimpleSkill}
//                           onDelete={deleteSimpleSkill}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <FiTag className="w-8 h-8 text-gray-400" />
//                       </div>
//                       <h3 className="text-base font-semibold text-gray-700 mb-2">
//                         No skills added yet
//                       </h3>
//                       <p className="text-gray-400 text-sm">
//                         Start adding your professional skills below
//                       </p>
//                     </div>
//                   )}

//                   <div className="flex flex-col sm:flex-row gap-3">
//                     <div className="flex-1 relative">
//                       <input
//                         type="text"
//                         value={newSkillInput}
//                         onChange={(e) => setNewSkillInput(e.target.value)}
//                         onKeyPress={(e) =>
//                           e.key === "Enter" && addSimpleSkill()
//                         }
//                         placeholder="Type a skill and press Enter..."
//                         className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                       />
//                     </div>
//                     <button
//                       onClick={addSimpleSkill}
//                       className="px-6 py-3 bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
//                     >
//                       <IoMdAdd className="w-5 h-5" />
//                       <span>Add Skill</span>
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Categorized Mode */}
//               {skillsMode === "categorized" && (
//                 <div>
//                   {categorizedSkills.length > 0 && (
//                     <div className="space-y-4 mb-6">
//                       {categorizedSkills.map((category) => (
//                         <motion.div
//                           key={category.id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           className="border border-gray-200 rounded-xl overflow-hidden"
//                         >
//                           <div
//                             onClick={() => toggleCategory(category.id)}
//                             className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors gap-2"
//                           >
//                             <div className="flex items-center gap-3 flex-1 min-w-0">
//                               <motion.div
//                                 animate={{ rotate: category.isOpen ? 90 : 0 }}
//                                 className="text-gray-400 shrink-0"
//                               >
//                                 <FiChevronDown className="w-5 h-5" />
//                               </motion.div>
//                               <input
//                                 type="text"
//                                 value={category.title}
//                                 onChange={(e) =>
//                                   updateCategoryTitle(
//                                     category.id,
//                                     e.target.value,
//                                   )
//                                 }
//                                 onClick={(e) => e.stopPropagation()}
//                                 className="font-semibold text-gray-800 bg-transparent px-2 py-1 rounded focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-200 flex-1 min-w-25"
//                               />
//                               <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full shrink-0">
//                                 {category?.skills?.length}
//                               </span>
//                             </div>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 deleteCategory(category.id);
//                               }}
//                               className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors shrink-0 self-end sm:self-auto"
//                             >
//                               <FiTrash2 className="w-4 h-4" />
//                             </button>
//                           </div>

//                           <AnimatePresence>
//                             {category.isOpen && (
//                               <motion.div
//                                 initial={{ opacity: 0, height: 0 }}
//                                 animate={{ opacity: 1, height: "auto" }}
//                                 exit={{ opacity: 0, height: 0 }}
//                                 className="border-t border-gray-100"
//                               >
//                                 <div className="p-4">
//                                   <div className="flex flex-wrap gap-2 mb-4">
//                                     {category?.skills.map((skill) => (
//                                       <CategorizedSkillItem
//                                         key={skill.id}
//                                         skill={skill}
//                                         categoryId={category.id}
//                                         onUpdate={updateCategorizedSkill}
//                                         onDelete={deleteCategorizedSkill}
//                                       />
//                                     ))}
//                                   </div>

//                                   <div className="flex flex-col sm:flex-row gap-2">
//                                     <input
//                                       type="text"
//                                       placeholder="Add a skill..."
//                                       className="flex-1 px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                                       onKeyPress={(e) => {
//                                         if (e.key === "Enter") {
//                                           const input =
//                                             e.target as HTMLInputElement;
//                                           if (input.value.trim()) {
//                                             addCategorizedSkill(
//                                               category.id,
//                                               input.value,
//                                             );
//                                             input.value = "";
//                                           }
//                                         }
//                                       }}
//                                     />
//                                     <button
//                                       onClick={(e) => {
//                                         const container = (
//                                           e.target as HTMLElement
//                                         ).parentElement?.previousElementSibling;
//                                         const input = container?.querySelector(
//                                           "input",
//                                         ) as HTMLInputElement;
//                                         if (input && input.value.trim()) {
//                                           addCategorizedSkill(
//                                             category.id,
//                                             input.value,
//                                           );
//                                           input.value = "";
//                                         }
//                                       }}
//                                       className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
//                                     >
//                                       <IoMdAdd className="w-5 h-5" />
//                                     </button>
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </motion.div>
//                       ))}
//                     </div>
//                   )}

//                   {!showAddCategory ? (
//                     <button
//                       onClick={() => setShowAddCategory(true)}
//                       className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
//                     >
//                       <FiPlus className="w-5 h-5" />
//                       <span className="font-medium">
//                         {categorizedSkills.length === 0
//                           ? "Create First Category"
//                           : "Add New Category"}
//                       </span>
//                     </button>
//                   ) : (
//                     <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
//                       <input
//                         type="text"
//                         value={newCategoryTitle}
//                         onChange={(e) => setNewCategoryTitle(e.target.value)}
//                         placeholder="Category name (e.g., Frontend, Backend, Tools)"
//                         className="w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 mb-3"
//                         autoFocus
//                         onKeyPress={(e) => e.key === "Enter" && addCategory()}
//                       />
//                       <div className="flex flex-col sm:flex-row gap-3">
//                         <button
//                           onClick={addCategory}
//                           className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
//                         >
//                           Add Category
//                         </button>
//                         <button
//                           onClick={() => {
//                             setShowAddCategory(false);
//                             setNewCategoryTitle("");
//                           }}
//                           className="flex-1 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sticky Footer Buttons */}

//          <div className="sticky bottom-0 z-20 bg-white/75 backdrop-blur-md border-t border-gray-100 shadow-lg shadow-gray-200/50">
//         <div className=" mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-4">
//           <div className="flex justify-between items-center gap-3 sm:gap-4">
//             {/* Back Button - Icon only on mobile, full text on desktop */}
//             <button
//               className="group px-4 sm:px-5 py-2.5 sm:py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl hover:bg-indigo-50/50 cursor-pointer"
//               onClick={() => router.push("/resume-details/education")}
//             >
//               <svg
//                 className="w-4 h-4 transition-transform group-hover:-translate-x-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                 />
//               </svg>
//               {/* Hide text on mobile, show on sm and up */}
//               <span className="hidden sm:inline">Back to Education</span>
//               {/* Optional: Show just "Back" on medium screens */}
//               <span className="inline sm:hidden">Back</span>
//             </button>

//             {/* Continue Button - Premium Design */}
//             <button
//               className="group relative px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium md:font-semibold text-white rounded-lg md:rounded-xl shadow-lg transition-all duration-300 overflow-hidden whitespace-nowrap cursor-pointer"
//               onClick={() => {
//                 const currentSkills =
//                   skillsMode === "simple" ? simpleSkills : categorizedSkills;
//                 saveToAPI(currentSkills).then(() =>
//                   router.push("/resume-details/project"),
//                 );
//               }}
//             >
//               {/* Gradient Background with Animation */}
//               <div className="absolute inset-0 bg-linear-to-r from-indigo-600 via-indigo-500 to-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:from-indigo-500 group-hover:via-indigo-400 group-hover:to-indigo-500"></div>

//               {/* Shine Effect */}
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
//                 <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
//               </div>

//               {/* Button Content */}
//               <div className="relative flex items-center justify-center gap-2">
//                 {/* Different text for mobile vs desktop */}
//                 <span>Continue to Projects</span>
//                 <svg
//                   className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 7l5 5m0 0l-5 5m5-5H6"
//                   />
//                 </svg>
//               </div>

//               {/* Shadow Enhancement */}
//               <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(79,70,229,0.5)]"></div>
//             </button>
//           </div>
//         </div>
//       </div>

//      <TipsModal
//   isOpen={skillTipsClicked}
//   onClose={() => setSkillTipsClicked(false)}
//   title="Skills Tips"
//   subtitle="Showcase your expertise"
//   hasAI={true}
//   aiFeatureDescription="get intelligent skill recommendations based on your job title."
//   proTip="Tailor your skills to each job — mirror keywords from the job description"
//   bestPractices={[
//     { tip: "List job-relevant skills only", example: "Match your skills to the role" },
//     { tip: "Use keywords from job descriptions", example: "Helps pass ATS filters" },
//     { tip: "Keep it concise — 4-6 strongest skills", example: "Quality over quantity" },
//   ]}
//   avoidList={[
//     "Listing outdated technologies",
//     "Adding generic traits (hard-working)",
//   ]}
// />

//       {/* AI Popup */}
//       {showPopup && Airesponse && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
//           >
//             <div className="bg-linear-to-r from-indigo-600 to-indigo-500 px-5 py-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="text-lg font-semibold text-white">
//                     AI Recommendations
//                   </h2>
//                   <p className="text-indigo-100 text-xs">
//                     Click any skill to add it to your list
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowPopup(false)}
//                   className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
//                 >
//                   <IoClose className="w-4 h-4 text-white" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-5 max-h-[60vh] overflow-y-auto">
//               <div className="flex flex-wrap gap-2">
//                 {Airesponse.map((item, index) => (
//                   <motion.button
//                     key={index}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: index * 0.05 }}
//                     onClick={() => insertAIResponse(item, index)}
//                     className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-indigo-500 hover:text-white transition-all cursor-pointer"
//                   >
//                     {item}
//                   </motion.button>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {/* Mobile Warning Modal */}
//       {showMobileWarning && (
//         <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/50 md:hidden">
//           <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
//                 <svg
//                   className="w-5 h-5 text-amber-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Cannot Generate AI Suggestions
//               </h3>
//             </div>
//             <p className="text-gray-600 mb-6">
//               Please add your work experience first to get personalized
//               AI-powered skill recommendations.
//             </p>
//             <button
//               onClick={() => setShowMobileWarning(false)}
//               className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
//             >
//               Got it
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SkillsForm;
























// "use client";

// import React, { useContext, useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiCheckCircle,
//   FiTrash2,
//   FiPlus,
//   FiX,
//   FiArrowRight,
//   FiTag,
// } from "react-icons/fi";
// import { CreateContext } from "@/app/context/CreateContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { FaRegLightbulb, FaMagic, FaStar } from "react-icons/fa";
// import { IoMdAdd } from "react-icons/io";
// import { IoArrowForward, IoClose, IoDiamondOutline } from "react-icons/io5";
// import { useRouter } from "next/navigation";
// import { API_URL } from "@/app/config/api";
// // import { SimpleSkill } from "@/app/types";
// import { Stepper, TipsModal } from "@/app/components/resume";
// import dynamic from "next/dynamic";
// // import { Editor } from 'primereact/editor';
// // import 'primereact/resources/themes/lara-light-indigo/theme.css';
// // import 'primereact/resources/primereact.min.css';
// // import 'primeicons/primeicons.css';

// const Editor = dynamic(
//   () => import("primereact/editor").then((mod) => mod.Editor),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="rounded-xl mt-3 md:mt-4 bg-gray-50 h-32 flex items-center justify-center border border-gray-200">
//         <div className="animate-pulse text-gray-400 text-sm">
//           Loading editor...
//         </div>
//       </div>
//     ),
//   },
// );

// const SkillsForm = () => {
//   const [skillTipsClicked, setSkillTipsClicked] = useState(false);
//   const router = useRouter();
//   const UseContext = useContext(CreateContext);
//   const contactId = UseContext?.contact?._id;

//   const { skills, setSkills } = UseContext;

//   console.log("skills", skills);

//   const [skillsText, setSkillsText] = useState<string>("");
//   const [isSaving, setIsSaving] = useState<boolean>(false);
//   const [isMobile, setIsMobile] = useState<boolean>(false);

//   // Check if mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const saveToAPI = async (skillsDataToSave: string) => {
//     if (!contactId) return false;

//     setIsSaving(true);
//     try {
//       await axios.post(
//         `${API_URL}/api/skill/update`,
//         { text: skillsDataToSave },
//         {
//           params: { contactId },
//         },
//       );
//       toast.success("Skills saved successfully!");
//       return true;
//     } catch (err) {
//       toast.error("Failed to save Skills!");
//       return false;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // Handle text change in editor
//   const handleTextChange = (e: any) => {
//     const newText = e.htmlValue || e.textValue || e;
//     setSkillsText(newText);
//   };

//   const experienceTitlesList =
//     UseContext?.experiences?.map((item: any) => item.jobTitle) || [];

//   const [showMobileWarning, setShowMobileWarning] = useState(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [Airesponse, setAiresponse] = useState<string | null>(null);
//   const [showPopup, setShowPopup] = useState<boolean>(false);

//   // AI Functions
//   const handleSubmitAi = async () => {
//     setLoading(true);
//     setAiresponse(null);
//     try {
//       const experienceTitlesList =
//         UseContext?.experiences?.map((item: any) => item.jobTitle) || [];
//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/resume/skills`,
//         {
//           job_titles: experienceTitlesList,
//         },
//       );
//       const skillsArray = response.data?.skills || [];
//       // Format AI response as bullet list
//       const formattedSkills = skillsArray
//         .map((skill: string) => `• ${skill}`)
//         .join("\n");
//       setAiresponse(formattedSkills);
//       setShowPopup(true);
//     } catch (err) {
//       toast.error("Failed to generate AI skills");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const insertAIResponse = () => {
//     if (Airesponse) {
//       const newText = skillsText
//         ? `${skillsText}\n\n${Airesponse}`
//         : Airesponse;
//       setSkillsText(newText);
//       setShowPopup(false);
//     }
//   };

//   console.log("skills", skills);

//   return (
//     <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50/40">
//       {/* Sticky Stepper */}
//       <Stepper />

//       {/* Scrollable Content Area */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="mx-auto px-2 py-6 sm:py-8 lg:py-10">
//           {/* Header Section */}
//           <div className="text-center mb-6 sm:mb-8">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
//               Skills & Expertise
//             </h1>

//             <p className="text-gray-500 text-sm max-w-md mx-auto">
//               Showcase your professional skills and technical expertise
//             </p>

//             <button
//               onClick={() => setSkillTipsClicked(true)}
//               className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
//             >
//               <FaRegLightbulb className="w-3 h-3" />
//               <span>Skills Tips</span>
//             </button>
//           </div>

//           {/* Main Form Card */}
//           <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//             {/* Card Header */}
//             <div className="relative px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-linear-to-r from-indigo-50 to-white border-b border-gray-100">
//               <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-100 rounded-full filter blur-3xl opacity-50"></div>
//               <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-xl">
//                     <IoDiamondOutline className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
//                   </div>
//                   <div>
//                     <h2 className="text-base sm:text-lg font-semibold text-gray-900">
//                       Professional Skills
//                     </h2>
//                     <p className="text-xs sm:text-sm text-gray-500">
//                       Add your technical and soft skills
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {isSaving && (
//                     <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full">
//                       <div className="w-2 h-2 sm:w-3 sm:h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
//                       <span className="text-[10px] sm:text-xs text-indigo-700 font-medium">
//                         Saving...
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Form Content */}
//             <div className="p-4 sm:p-6 lg:p-8">
//               {/* Action Buttons */}
//               <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
//                 <div className="relative inline-block group">
//                   <button
//                     onClick={() => {
//                       if (experienceTitlesList.length === 0) {
//                         if (window.innerWidth < 768) {
//                           setShowMobileWarning(true);
//                         } else {
//                           toast.warning(
//                             "Add work experience first for personalized suggestions",
//                           );
//                         }
//                       } else {
//                         handleSubmitAi();
//                       }
//                     }}
//                     disabled={loading}
//                     className={`flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all ${
//                       experienceTitlesList.length === 0
//                         ? "cursor-not-allowed opacity-50"
//                         : ""
//                     }`}
//                   >
//                     {loading ? (
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     ) : (
//                       <FaMagic className="w-4 h-4" />
//                     )}
//                     <span>Generate With AI</span>
//                   </button>

//                   {/* Desktop Tooltip */}
//                   {experienceTitlesList.length === 0 && !isMobile && (
//                     <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-100">
//                       <div className="flex items-center gap-2">
//                         <svg
//                           className="w-3 h-3"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                         <span>
//                           Add work experience first for personalized suggestions
//                         </span>
//                       </div>
//                       <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <Editor
//                 className="rounded-lg bg-white border border-gray-200 overflow-hidden"
//                 value={skills.text || ""}
//                 headerTemplate={
//                   <div className="flex gap-1 p-2 flex-wrap items-center bg-gray-50 border-b border-gray-200">
//                     <button
//                       type="button"
//                       className="ql-bold p-1.5 hover:bg-gray-200 rounded transition"
//                     >
//                       B
//                     </button>
//                     <button
//                       type="button"
//                       className="ql-italic p-1.5 hover:bg-gray-200 rounded transition"
//                     >
//                       I
//                     </button>
//                     <button
//                       type="button"
//                       className="ql-underline p-1.5 hover:bg-gray-200 rounded transition"
//                     >
//                       U
//                     </button>
//                     <button
//                       type="button"
//                       className="ql-list p-1.5 hover:bg-gray-200 rounded transition"
//                       value="ordered"
//                     >
//                       1.
//                     </button>
//                     <button
//                       type="button"
//                       className="ql-list p-1.5 hover:bg-gray-200 rounded transition"
//                       value="bullet"
//                     >
//                       •
//                     </button>
//                     <button
//                       type="button"
//                       className="ql-clean p-1.5 hover:bg-gray-200 rounded transition"
//                     >
//                       ⌫
//                     </button>
//                   </div>
//                 }
//                 onTextChange={(e: any) => {
//                   // handleChange(
//                   //   project.id,
//                   //   "description",
//                   //   e.htmlValue,
//                   // );
//                   setSkills((prev) => ({ ...prev, text: e.htmlValue }));
//                 }}
//                 style={{
//                   height: "140px",
//                   minHeight: "140px",
//                   background: "white",
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sticky Footer Buttons */}
//       <div className="sticky bottom-0 z-20 bg-white/75 backdrop-blur-md border-t border-gray-100 shadow-lg shadow-gray-200/50">
//         <div className="mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-4">
//           <div className="flex justify-between items-center gap-3 sm:gap-4">
//             {/* Back Button */}
//             <button
//               className="group px-4 sm:px-5 py-2.5 sm:py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl hover:bg-indigo-50/50 cursor-pointer"
//               onClick={() => router.push("/resume-details/education")}
//             >
//               <svg
//                 className="w-4 h-4 transition-transform group-hover:-translate-x-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                 />
//               </svg>
//               <span className="hidden sm:inline">Back to Education</span>
//               <span className="inline sm:hidden">Back</span>
//             </button>

//             {/* Continue Button */}
//             <button
//               className="group relative px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium md:font-semibold text-white rounded-lg md:rounded-xl shadow-lg transition-all duration-300 overflow-hidden whitespace-nowrap cursor-pointer"
//               onClick={() => {
//                 saveToAPI(skills.text).then(() =>
//                   router.push("/resume-details/project"),
//                 );
//               }}
//             >
//               <div className="absolute inset-0 bg-linear-to-r from-indigo-600 via-indigo-500 to-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:from-indigo-500 group-hover:via-indigo-400 group-hover:to-indigo-500"></div>
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
//                 <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
//               </div>
//               <div className="relative flex items-center justify-center gap-2">
//                 <span>Continue to Projects</span>
//                 <svg
//                   className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 7l5 5m0 0l-5 5m5-5H6"
//                   />
//                 </svg>
//               </div>
//               <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(79,70,229,0.5)]"></div>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Tips Modal */}
//       <TipsModal
//         isOpen={skillTipsClicked}
//         onClose={() => setSkillTipsClicked(false)}
//         title="Skills Tips"
//         subtitle="Showcase your expertise"
//         hasAI={true}
//         aiFeatureDescription="get intelligent skill recommendations based on your job title."
//         proTip="Tailor your skills to each job — mirror keywords from the job description"
//         bestPractices={[
//           {
//             tip: "List job-relevant skills only",
//             example: "Match your skills to the role",
//           },
//           {
//             tip: "Use keywords from job descriptions",
//             example: "Helps pass ATS filters",
//           },
//           {
//             tip: "Keep it concise — 4-6 strongest skills",
//             example: "Quality over quantity",
//           },
//         ]}
//         avoidList={[
//           "Listing outdated technologies",
//           "Adding generic traits (hard-working)",
//         ]}
//       />

//       {/* AI Popup */}
//       {showPopup && Airesponse && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
//           >
//             <div className="bg-linear-to-r from-indigo-600 to-indigo-500 px-5 py-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="text-lg font-semibold text-white">
//                     AI Recommendations
//                   </h2>
//                   <p className="text-indigo-100 text-xs">
//                     Review and add these suggested skills
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowPopup(false)}
//                   className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
//                 >
//                   <IoClose className="w-4 h-4 text-white" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-5 max-h-[60vh] overflow-y-auto">
//               <div className="prose prose-sm max-w-none">
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: Airesponse.replace(/\n/g, "<br/>"),
//                   }}
//                 />
//               </div>
//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={insertAIResponse}
//                   className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
//                 >
//                   Add to My Skills
//                 </button>
//                 <button
//                   onClick={() => setShowPopup(false)}
//                   className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {/* Mobile Warning Modal */}
//       {showMobileWarning && (
//         <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/50 md:hidden">
//           <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
//                 <svg
//                   className="w-5 h-5 text-amber-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Cannot Generate AI Suggestions
//               </h3>
//             </div>
//             <p className="text-gray-600 mb-6">
//               Please add your work experience first to get personalized
//               AI-powered skill recommendations.
//             </p>
//             <button
//               onClick={() => setShowMobileWarning(false)}
//               className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
//             >
//               Got it
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SkillsForm;

























// "use client";

// import React, { useContext, useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiCheckCircle,
//   FiTrash2,
//   FiPlus,
//   FiX,
//   FiArrowRight,
//   FiTag,
// } from "react-icons/fi";
// import { CreateContext } from "@/app/context/CreateContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { FaRegLightbulb, FaMagic, FaStar } from "react-icons/fa";
// import { IoMdAdd } from "react-icons/io";
// import { IoArrowForward, IoClose, IoDiamondOutline } from "react-icons/io5";
// import { useRouter } from "next/navigation";
// import { API_URL } from "@/app/config/api";
// import { Stepper, TipsModal } from "@/app/components/resume";
// import dynamic from "next/dynamic";

// const Editor = dynamic(
//   () => import("primereact/editor").then((mod) => mod.Editor),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="rounded-xl mt-3 md:mt-4 bg-gray-50 h-32 flex items-center justify-center border border-gray-200">
//         <div className="animate-pulse text-gray-400 text-sm">
//           Loading editor...
//         </div>
//       </div>
//     ),
//   },
// );

// const SkillsForm = () => {
//   const [skillTipsClicked, setSkillTipsClicked] = useState(false);
//   const router = useRouter();
//   const UseContext = useContext(CreateContext);
//   const contactId = UseContext?.contact?._id;

//   const { skills, setSkills } = UseContext;

//   const [skillsText, setSkillsText] = useState<string>("");
//   const [isSaving, setIsSaving] = useState<boolean>(false);
//   const [isMobile, setIsMobile] = useState<boolean>(false);
//   const [lastSavedData, setLastSavedData] = useState<string>("");

//   // Check if mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Initialize skills data from context
//   useEffect(() => {
//     if (skills?.text) {
//       setSkillsText(skills.text);
//       setLastSavedData(skills.text);
//     } else if (typeof skills === "string") {
//       setSkillsText(skills);
//       setLastSavedData(skills);
//     } else if (skills && typeof skills === "object" && !Array.isArray(skills)) {
//       setSkillsText(skills.text || "");
//       setLastSavedData(skills.text || "");
//     }
//   }, [skills]);

//   const saveToAPI = async (skillsDataToSave: string) => {
//     if (!contactId) return false;

//     // Check if data has changed
//     if (skillsDataToSave === lastSavedData) return true;

//     setIsSaving(true);
//     try {
//       await axios.post(
//         `${API_URL}/api/skill/update`,
//         { text: skillsDataToSave },
//         {
//           params: { contactId },
//         },
//       );
//       setLastSavedData(skillsDataToSave);
//       toast.success("Skills saved successfully!");
//       return true;
//     } catch (err) {
//       toast.error("Failed to save Skills!");
//       return false;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // Handle text change in editor
//   const handleTextChange = (e: any) => {
//     const newText = e.htmlValue || e.textValue || e;
//     setSkillsText(newText);
//     // Update context
//     setSkills((prev: any) => ({ ...prev, text: newText }));
//   };

//   const experienceTitlesList =
//     UseContext?.experiences?.map((item: any) => item.jobTitle) || [];

//   const [showMobileWarning, setShowMobileWarning] = useState(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [Airesponse, setAiresponse] = useState<string | null>(null);
//   const [showPopup, setShowPopup] = useState<boolean>(false);

//   // AI Functions
//   const handleSubmitAi = async () => {
//     setLoading(true);
//     setAiresponse(null);
//     try {
//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/resume/skills`,
//         {
//           job_titles: experienceTitlesList,
//         },
//       );
//       const skillsArray = response.data?.skills || [];
//       // Format AI response as bullet list
//       const formattedSkills = skillsArray
//         .map((skill: string) => `• ${skill}`)
//         .join("\n");
//       setAiresponse(formattedSkills);
//       setShowPopup(true);
//     } catch (err) {
//       toast.error("Failed to generate AI skills");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const insertAIResponse = () => {
//     if (Airesponse) {
//       const newText = skillsText
//         ? `${skillsText}\n\n${Airesponse}`
//         : Airesponse;
//       setSkillsText(newText);
//       setSkills((prev: any) => ({ ...prev, text: newText }));
//       setShowPopup(false);
//       toast.success("AI suggestions added!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">
//       {/* Sticky Stepper */}
//       <Stepper />

//       {/* Scrollable Content Area */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="mx-auto px-2 py-6 sm:py-8 lg:py-10">
//           {/* Header Section */}
//           <div className="text-center mb-6 sm:mb-8">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
//               Skills & Expertise
//             </h1>

//             <p className="text-gray-500 text-sm max-w-md mx-auto">
//               Showcase your professional skills and technical expertise
//             </p>

//             <button
//               onClick={() => setSkillTipsClicked(true)}
//               className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
//             >
//               <FaRegLightbulb className="w-3 h-3" />
//               <span>Skills Tips</span>
//             </button>
//           </div>

//           {/* Main Form Card */}
//           <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//             {/* Card Header */}
//             <div className="relative px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-indigo-50 to-white border-b border-gray-100">
//               <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-100 rounded-full filter blur-3xl opacity-50"></div>
//               <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-xl">
//                     <IoDiamondOutline className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
//                   </div>
//                   <div>
//                     <h2 className="text-base sm:text-lg font-semibold text-gray-900">
//                       Professional Skills
//                     </h2>
//                     <p className="text-xs sm:text-sm text-gray-500">
//                       Add your technical and soft skills
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {isSaving && (
//                     <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full">
//                       <div className="w-2 h-2 sm:w-3 sm:h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
//                       <span className="text-[10px] sm:text-xs text-indigo-700 font-medium">
//                         Saving...
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Form Content */}
//             <div className="p-4 sm:p-6 lg:p-8">
//               {/* Action Buttons */}
//               <div className="flex flex-wrap justify-end items-center gap-3 mb-4">
//                 <div className="relative inline-block group">
//                   <button
//                     onClick={() => {
//                       if (experienceTitlesList.length === 0) {
//                         if (window.innerWidth < 768) {
//                           setShowMobileWarning(true);
//                         } else {
//                           toast.warning(
//                             "Add work experience first for personalized suggestions",
//                           );
//                         }
//                       } else {
//                         handleSubmitAi();
//                       }
//                     }}
//                     disabled={loading}
//                     className={`flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all ${
//                       experienceTitlesList.length === 0
//                         ? "cursor-not-allowed opacity-50"
//                         : ""
//                     }`}
//                   >
//                     {loading ? (
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     ) : (
//                       <FaMagic className="w-4 h-4" />
//                     )}
//                     <span>Generate With AI</span>
//                   </button>

//                   {/* Desktop Tooltip */}
//                   {experienceTitlesList.length === 0 && !isMobile && (
//                     <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50">
//                       <div className="flex items-center gap-2">
//                         <svg
//                           className="w-3 h-3"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                         <span>
//                           Add work experience first for personalized suggestions
//                         </span>
//                       </div>
//                       <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <Editor
//                 className="rounded-lg bg-white border border-gray-200 overflow-hidden"
//                 value={skillsText}
//                 headerTemplate={
//                   <div className="flex gap-1 p-2 flex-wrap items-center bg-gray-50 border-b border-gray-200">
//                     <button
//                       type="button"
//                       className="ql-bold p-1.5 hover:bg-gray-200 rounded transition"
//                     >
//                       B
//                     </button>
//                     <button
//                       type="button"
//                       className="ql-italic p-1.5 hover:bg-gray-200 rounded transition"
//                     >
//                       I
//                     </button>
//                     <button
//                       type="button"
//                       className="ql-underline p-1.5 hover:bg-gray-200 rounded transition"
//                     >
//                       U
//                     </button>
//                     <button
//                       type="button"
//                       className="ql-list p-1.5 hover:bg-gray-200 rounded transition"
//                       value="ordered"
//                     >
//                       1.
//                     </button>
//                     <button
//                       type="button"
//                       className="ql-list p-1.5 hover:bg-gray-200 rounded transition"
//                       value="bullet"
//                     >
//                       •
//                     </button>
//                     <button
//                       type="button"
//                       className="ql-clean p-1.5 hover:bg-gray-200 rounded transition"
//                     >
//                       ⌫
//                     </button>
//                   </div>
//                 }
//                 onTextChange={handleTextChange}
//                 style={{
//                   height: "140px",
//                   minHeight: "140px",
//                   background: "white",
//                 }}
//               />
//               {/* </div> */}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sticky Footer Buttons */}
//       <div className="sticky bottom-0 z-20 bg-white/75 backdrop-blur-md border-t border-gray-100 shadow-lg shadow-gray-200/50">
//         <div className="mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-4">
//           <div className="flex justify-between items-center gap-3 sm:gap-4">
//             {/* Back Button */}
//             <button
//               className="group px-4 sm:px-5 py-2.5 sm:py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl hover:bg-indigo-50/50 cursor-pointer"
//               onClick={() => router.push("/resume-details/education")}
//             >
//               <svg
//                 className="w-4 h-4 transition-transform group-hover:-translate-x-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                 />
//               </svg>
//               <span className="hidden sm:inline">Back to Education</span>
//               <span className="inline sm:hidden">Back</span>
//             </button>

//             {/* Continue Button */}
//             <button
//               className="group relative px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium md:font-semibold text-white rounded-lg md:rounded-xl shadow-lg transition-all duration-300 overflow-hidden whitespace-nowrap cursor-pointer"
//               onClick={() => {
//                 saveToAPI(skillsText).then(() =>
//                   router.push("/resume-details/project"),
//                 );
//               }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:from-indigo-500 group-hover:via-indigo-400 group-hover:to-indigo-500"></div>
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
//               </div>
//               <div className="relative flex items-center justify-center gap-2">
//                 <span>Continue to Projects</span>
//                 <svg
//                   className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 7l5 5m0 0l-5 5m5-5H6"
//                   />
//                 </svg>
//               </div>
//               <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(79,70,229,0.5)]"></div>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Tips Modal */}
//       <TipsModal
//         isOpen={skillTipsClicked}
//         onClose={() => setSkillTipsClicked(false)}
//         title="Skills Tips"
//         subtitle="Showcase your expertise"
//         hasAI={true}
//         aiFeatureDescription="get intelligent skill recommendations based on your job title."
//         proTip="Tailor your skills to each job — mirror keywords from the job description"
//         bestPractices={[
//           {
//             tip: "List job-relevant skills only",
//             example: "Match your skills to the role",
//           },
//           {
//             tip: "Use keywords from job descriptions",
//             example: "Helps pass ATS filters",
//           },
//           {
//             tip: "Keep it concise — 4-6 strongest skills",
//             example: "Quality over quantity",
//           },
//         ]}
//         avoidList={[
//           "Listing outdated technologies",
//           "Adding generic traits (hard-working)",
//         ]}
//       />

//       {/* AI Popup */}
//       {showPopup && Airesponse && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
//           >
//             <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="text-lg font-semibold text-white">
//                     AI Recommendations
//                   </h2>
//                   <p className="text-indigo-100 text-xs">
//                     Review and add these suggested skills
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowPopup(false)}
//                   className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
//                 >
//                   <IoClose className="w-4 h-4 text-white" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-5 max-h-[60vh] overflow-y-auto">
//               <div className="prose prose-sm max-w-none">
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: Airesponse.replace(/\n/g, "<br/>"),
//                   }}
//                 />
//               </div>
//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={insertAIResponse}
//                   className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
//                 >
//                   Add to My Skills
//                 </button>
//                 <button
//                   onClick={() => setShowPopup(false)}
//                   className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {/* Mobile Warning Modal */}
//       {showMobileWarning && (
//         <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 md:hidden">
//           <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
//                 <svg
//                   className="w-5 h-5 text-amber-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Cannot Generate AI Suggestions
//               </h3>
//             </div>
//             <p className="text-gray-600 mb-6">
//               Please add your work experience first to get personalized
//               AI-powered skill recommendations.
//             </p>
//             <button
//               onClick={() => setShowMobileWarning(false)}
//               className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
//             >
//               Got it
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SkillsForm;




















"use client";

import React, { useContext, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiTrash2,
  FiPlus,
  FiX,
  FiArrowRight,
  FiTag,
} from "react-icons/fi";
import { CreateContext } from "@/app/context/CreateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegLightbulb, FaMagic, FaStar } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoArrowForward, IoClose, IoDiamondOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/config/api";
import { Stepper, TipsModal } from "@/app/components/resume";
import dynamic from "next/dynamic";

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

const SkillsForm = () => {
  const [skillTipsClicked, setSkillTipsClicked] = useState(false);
  const router = useRouter();
  const UseContext = useContext(CreateContext);
  // const contactId = UseContext?.contact?._id;
    // const contactId =  UseContext?.contact.contactId;

      const contactId = UseContext?.contact.contactId ||  UseContext?.contact._id ;



  const { skills, setSkills } = UseContext;

  const [skillsText, setSkillsText] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [lastSavedData, setLastSavedData] = useState<string>("");

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize skills data from context
  useEffect(() => {
    if (skills?.text) {
      setSkillsText(skills.text);
      setLastSavedData(skills.text);
    } else if (typeof skills === "string") {
      setSkillsText(skills);
      setLastSavedData(skills);
    } else if (skills && typeof skills === "object" && !Array.isArray(skills)) {
      setSkillsText(skills.text || "");
      setLastSavedData(skills.text || "");
    }
  }, [skills]);

  const saveToAPI = async (skillsDataToSave: string) => {
    if (!contactId) return false;


    setIsSaving(true);
    try {
      await axios.post(
        `${API_URL}/api/skill/update`,
        { text: skillsDataToSave },
        {
          params: { contactId },
        },
      );
      setLastSavedData(skillsDataToSave);
      toast.success("Skills saved successfully!");
      return true;
    } catch (err) {
      toast.error("Failed to save Skills!");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Handle text change in editor
  const handleTextChange = (e: any) => {
    const newText = e.htmlValue || e.textValue || e;
    setSkillsText(newText);
    // Update context
    setSkills((prev: any) => ({ ...prev, text: newText }));
  };

  const experienceTitlesList =
    UseContext?.experiences?.map((item: any) => item.jobTitle) || [];

  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [Airesponse, setAiresponse] = useState<string[] | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  // AI Functions
  const handleSubmitAi = async () => {
    setLoading(true);
    setAiresponse(null);
    try {
      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/resume/skills`,
        {
          job_titles: experienceTitlesList,
        },
      );
      const skillsArray = response.data?.skills || [];
      setAiresponse(skillsArray);
      setShowPopup(true);
    } catch (err) {
      toast.error("Failed to generate AI skills");
    } finally {
      setLoading(false);
    }
  };

  const insertAIResponse = (skill: string, index: number) => {
    // Format as bullet point if not already present
    const formattedSkill = skill.startsWith('•') ? skill : `• ${skill}`;
    
    // Add the skill to existing text
    const newText = skillsText
      ? `${skillsText}\n${formattedSkill}`
      : formattedSkill;
    
    setSkillsText(newText);
    setSkills((prev: any) => ({ ...prev, text: newText }));
    
    // Remove the added skill from AI response list
    if (Airesponse) {
      const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
      setAiresponse(newAiResponse.length > 0 ? newAiResponse : null);
    }
    
    toast.success(`"${skill}" added!`);
  };

  const addAllAISkills = () => {
    if (Airesponse && Airesponse.length > 0) {
      // Format all skills as bullet points
      const formattedSkills = Airesponse
        .map(skill =>  skill) .join('\n');
      
      const newText = skillsText
        ? `${skillsText}\n\n${formattedSkills}`
        : formattedSkills;
      
      setSkillsText(newText);
      setSkills((prev: any) => ({ ...prev, text: newText }));
      setAiresponse(null);
      setShowPopup(false);
      toast.success("All AI suggestions added!");
    }
  };


  console.log("UseContext",UseContext)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">
      {/* Sticky Stepper */}
      <Stepper />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto px-2 py-6 sm:py-8 lg:py-10">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Skills & Expertise
            </h1>

            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Showcase your professional skills and technical expertise
            </p>

            <button
              onClick={() => setSkillTipsClicked(true)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <FaRegLightbulb className="w-3 h-3" />
              <span>Skills Tips</span>
            </button>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="relative px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-indigo-50 to-white border-b border-gray-100">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-100 rounded-full filter blur-3xl opacity-50"></div>
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-xl">
                    <IoDiamondOutline className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                      Professional Skills
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Add your technical and soft skills
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isSaving && (
                    <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] sm:text-xs text-indigo-700 font-medium">
                        Saving...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-end items-center gap-3 mb-4">
                <div className="relative inline-block group">
                  <button
                    onClick={() => {
                      if (experienceTitlesList.length === 0) {
                        if (window.innerWidth < 768) {
                          setShowMobileWarning(true);
                        } else {
                          toast.warning(
                            "Add work experience first for personalized suggestions",
                          );
                        }
                      } else {
                        handleSubmitAi();
                      }
                    }}
                    disabled={loading}
                    className={`flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all ${
                      experienceTitlesList.length === 0
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FaMagic className="w-4 h-4" />
                    )}
                    <span>Generate With AI</span>
                  </button>

                  {/* Desktop Tooltip */}
                  {experienceTitlesList.length === 0 && !isMobile && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>
                          Add work experience first for personalized suggestions
                        </span>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* PrimeReact Text Editor */}
              {/* <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <Editor
                  value={skillsText}
                  onTextChange={handleTextChange}
                  style={{ height: "400px" }}
                 
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["clean"],
                    ],
                  }}
                /> */}


                  <Editor
                      className="rounded-lg bg-white border border-gray-200 overflow-hidden"
                      value={skillsText || ""}
                      onTextChange={handleTextChange}
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
                      style={{
                        height: "200px",
                        minHeight: "200px",
                        background: "white",
                      }}
                    />
              </div>
              
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* Sticky Footer Buttons */}
      <div className="sticky bottom-0 z-20 bg-white/75 backdrop-blur-md border-t border-gray-100 shadow-lg shadow-gray-200/50">
        <div className="mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-3 sm:gap-4">
            {/* Back Button */}
            <button
              className="group px-4 sm:px-5 py-2.5 sm:py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl hover:bg-indigo-50/50 cursor-pointer"
              onClick={() => router.push("/resume-details/education")}
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
              <span className="hidden sm:inline">Back to Education</span>
              <span className="inline sm:hidden">Back</span>
            </button>

            {/* Continue Button */}
            <button
              className="group relative px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium md:font-semibold text-white rounded-lg md:rounded-xl shadow-lg transition-all duration-300 overflow-hidden whitespace-nowrap cursor-pointer"
              onClick={() => {
                saveToAPI(skillsText).then(() =>
                  router.push("/resume-details/project"),
                );
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:from-indigo-500 group-hover:via-indigo-400 group-hover:to-indigo-500"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
              </div>
              <div className="relative flex items-center justify-center gap-2">
                <span>Continue to Projects</span>
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
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(79,70,229,0.5)]"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Tips Modal */}
      <TipsModal
        isOpen={skillTipsClicked}
        onClose={() => setSkillTipsClicked(false)}
        title="Skills Tips"
        subtitle="Showcase your expertise"
        hasAI={true}
        aiFeatureDescription="get intelligent skill recommendations based on your job title."
        proTip="Tailor your skills to each job — mirror keywords from the job description"
        bestPractices={[
          {
            tip: "List job-relevant skills only",
            example: "Match your skills to the role",
          },
          {
            tip: "Use keywords from job descriptions",
            example: "Helps pass ATS filters",
          },
          {
            tip: "Keep it concise — 4-6 strongest skills",
            example: "Quality over quantity",
          },
        ]}
        avoidList={[
          "Listing outdated technologies",
          "Adding generic traits (hard-working)",
        ]}
      />

      {/* AI Popup */}
      {showPopup && Airesponse && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    AI Recommendations
                  </h2>
                  <p className="text-indigo-100 text-xs">
                    Click on any skill to add it to your list
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

            <div className="p-5 max-h-[60vh] overflow-y-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {Airesponse.map((skill, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => insertAIResponse(skill, index)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-indigo-500 hover:text-white transition-all cursor-pointer"
                  >
                    {skill}
                  </motion.button>
                ))}
              </div>
              
              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={addAllAISkills}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Add All Skills
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Mobile Warning Modal */}
      {showMobileWarning && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 md:hidden">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Cannot Generate AI Suggestions
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Please add your work experience first to get personalized
              AI-powered skill recommendations.
            </p>
            <button
              onClick={() => setShowMobileWarning(false)}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;