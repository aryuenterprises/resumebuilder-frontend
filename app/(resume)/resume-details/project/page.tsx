// "use client";

// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useContext,
//   useCallback,
// } from "react";
// import { FiChevronDown, FiTrash2, FiX } from "react-icons/fi";
// import { IoMdAdd } from "react-icons/io";
// import dynamic from "next/dynamic";
// import { CreateContext } from "@/app/context/CreateContext";
// import { FaRegLightbulb } from "react-icons/fa";
// import { IoIosArrowDown } from "react-icons/io";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import Stepper from "../../../components/resume/Steppers";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { API_URL } from "@/app/config/api";
// import { Project } from "@/app/types";

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

// const ProjectsForm = () => {
//   const UseContext = useContext(CreateContext);
//   // const contactId = UseContext?.contact._id;

//   const contactId = UseContext?.contact._id || UseContext?.contact.contactId;

//   const { fullResumeData, setFullResumeData, projects, setProjects } =
//     UseContext || {};

//   console.log("projects", projects);

//   const router = useRouter();
//   const [isSaving, setIsSaving] = useState(false);
//   const [lastSavedData, setLastSavedData] = useState<string>("");
//   const [skillTipsClicked, setSkillTipsClicked] = useState(false);
//   const [techInput, setTechInput] = useState<{ [key: string]: string }>({});

//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const initialLoadDone = useRef(false);

//   // Save to localStorage whenever projects change
//   useEffect(() => {
//     if (!initialLoadDone.current) return;

//     if (fullResumeData) {
//       const updatedFullData = {
//         ...fullResumeData,
//         projects: projects,
//       };
//       setFullResumeData(updatedFullData);
//       setLocalStorage("fullResumeData", updatedFullData);
//     }
//   }, [projects]);

//   const addProject = () => {
//     if (!setProjects) return;

//     setProjects((prev: Project[]) => {
//       const updated = [
//         ...prev,
//         {
//           id: Date.now(),
//           title: "",
//           techStack: [],
//           description: "",
//           liveUrl: "",
//           githubUrl: "",
//           isOpen: true,
//           error: {},
//         },
//       ];
//       debouncedSave(updated);
//       return updated;
//     });
//   };

//   const saveToAPI = async (projectsData: Project[]) => {
//     if (!contactId) {
//       console.error("Contact ID is required");
//       return false;
//     }

//     const currentDataString = JSON.stringify(projectsData);
//     if (currentDataString === lastSavedData) {
//       return true;
//     }

//     setIsSaving(true);

//     try {
//       const formData = {
//         projects: projectsData,
//       };

//       await axios.post(`${API_URL}/api/project-resume/update`, formData, {
//         params: { contactId: contactId },
//       });

//       setLastSavedData(currentDataString);
//       fetchProjects();
//       return true;
//     } catch (err: any) {
//       console.error("Error saving projects:", err);
//       toast.error("Failed to save Projects!");
//       return false;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const debouncedSave = useCallback(
//     (projectsData: Project[]) => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//       saveTimeoutRef.current = setTimeout(() => {
//         saveToAPI(projectsData);
//       }, 1000);
//     },
//     [contactId, lastSavedData],
//   );

//   const toggleForm = (id: string | number) => {
//     if (!setProjects) return;
//     setProjects((prev: Project[]) =>
//       prev.map((project) =>
//         project.id === id ? { ...project, isOpen: !project.isOpen } : project,
//       ),
//     );
//   };

//   const handleChange = (
//     id: string | number,
//     field: keyof Project,
//     value: string | string[],
//   ) => {
//     if (!setProjects) return;
//     setProjects((prev: Project[]) => {
//       const updated = prev.map((project) =>
//         project.id === id ? { ...project, [field]: value } : project,
//       );
//       debouncedSave(updated);
//       return updated;
//     });
//   };

//   const deleteProject = (id: string | number) => {
//     if (!setProjects) return;
//     setProjects((prev: Project[]) => {
//       const updated = prev.filter((project) => project.id !== id);
//       saveToAPI(updated);
//       return updated;
//     });
//   };

//   const addTechStack = (projectId: string | number) => {
//     const techValue = techInput[projectId] || "";
//     if (techValue.trim()) {0
//       const project = projects?.find((p: Project) => p.id === projectId);
//       if (project && !project?.techStack?.includes(techValue.trim())) {
//         handleChange(projectId, "techStack", [
//           ...project.techStack,
//           techValue.trim(),
//         ]);
//         setTechInput((prev) => ({ ...prev, [projectId]: "" }));
//       }
//     }
//   };

//   const removeTechStack = (projectId: string | number, tech: string) => {
//     const project = projects?.find((p: Project) => p.id === projectId);
//     if (project) {
//       handleChange(
//         projectId,
//         "techStack",
//         project.techStack.filter((t: string) => t !== tech),
//       );
//     }
//   };

//   const fetchProjects = async () => {
//     if (!contactId) return;

//     try {
//       const response = await axios.get(
//         `${API_URL}/api/project-resume/get-project-resume/${contactId}`,
//       );

//       console.log("response", response);
//       const projectsList = response.data?.data?.projects || [];
//       console.log("projectsList", projectsList);

//       if (projectsList.length > 0) {
//         const formattedData = projectsList.map((item: any) => ({
//           id: item._id || Date.now(),
//           title: item.title || "",
//           techStack: item.techStack || [],
//           description: item.description || "",
//           liveUrl: item.liveUrl || "",
//           githubUrl: item.githubUrl || "",
//           isOpen: true,
//         }));
//         setProjects(formattedData);
//         setLastSavedData(JSON.stringify(formattedData));
//       }
//       initialLoadDone.current = true;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//     };
//   }, []);

//   // Initialize projects if not exists
//   useEffect(() => {
//     if (!projects && setProjects) {
//       setProjects([]);
//     }
//     initialLoadDone.current = true;
//   }, []);

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

//         {/* Projects List */}
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
//                     d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
//                   />
//                 </svg>
//               </div>
//               <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
//                 Projects
//               </h1>
//             </div>

//             <div className="flex justify-end me-5">
//               <button
//                 onClick={() => setSkillTipsClicked((prev) => !prev)}
//                 className="flex items-center justify-center xs:justify-start gap-2 bg-linear-to-r from-white to-gray-50/80 border border-gray-200 rounded-xl p-2 text-gray-700 text-xs sm:text-sm font-medium hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 w-fit"
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
//                 <span className="truncate">Project Tips</span>
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
//             Showcase your best projects with detailed descriptions, technologies
//             used, and links.
//           </p>

//           {projects?.map((project: Project, index: number) => (
//             <div
//               key={project.id}
//               className="bg-[#f3f4f6]/80 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-subtle transition-all duration-300 hover:shadow-md mt-4"
//             >
//               {/* Header */}
//               <div
//                 onClick={() => toggleForm(project.id)}
//                 className="flex justify-between items-center cursor-pointer p-2 sm:p-3 md:p-4 group hover:bg-gray-50/50 transition-all duration-300"
//               >
//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-0.5 sm:mb-1 truncate group-hover:text-[#c40116] transition-colors">
//                     {project.title || "Project Title"}
//                   </h3>
//                   <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] xs:text-xs text-gray-500">
//                     <span className="truncate max-w-30 sm:max-w-none">
//                       {project.techStack.length > 0
//                         ? project.techStack.join(", ")
//                         : "Tech Stack"}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 sm:gap-3 ml-2">
//                   <motion.div
//                     animate={{ rotate: project.isOpen ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="text-gray-400 group-hover:text-[#c40116] transition-colors"
//                   >
//                     <FiChevronDown size={18} className="sm:w-5 sm:h-5" />
//                   </motion.div>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       deleteProject(project.id);
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
//                   project.isOpen
//                     ? "max-h-200 opacity-100"
//                     : "max-h-0 opacity-0"
//                 }`}
//               >
//                 <div className="p-2 sm:p-3 md:p-4 space-y-4 sm:space-y-6 border-t border-gray-100">
//                   {/* Project Title */}
//                   <div className="group">
//                     <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                       Project Title
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         value={project.title || ""}
//                         onChange={(e) =>
//                           handleChange(project.id, "title", e.target.value)
//                         }
//                         placeholder="E-Commerce Platform"
//                         className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300 hover:shadow-md"
//                       />
//                     </div>
//                   </div>

//                   {/* Tech Stack */}
//                   <div className="group">
//                     <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                       Tech Stack
//                     </label>
//                     <div className="flex gap-2 mb-2">
//                       <input
//                         type="text"
//                         value={techInput[project.id] || ""}
//                         onChange={(e) =>
//                           setTechInput((prev) => ({
//                             ...prev,
//                             [project.id]: e.target.value,
//                           }))
//                         }
//                         onKeyPress={(e) =>
//                           e.key === "Enter" && addTechStack(project.id)
//                         }
//                         className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 transition-all duration-300"
//                         placeholder="React, Node.js, MongoDB"
//                       />
//                       <button
//                         onClick={() => addTechStack(project.id)}
//                         className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
//                       >
//                         Add
//                       </button>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                       {project.techStack.map((tech) => (
//                         <span
//                           key={tech}
//                           className="inline-flex items-center gap-1 px-2 py-1 bg-[#c40116]/10 text-[#c40116] text-xs rounded-lg"
//                         >
//                           {tech}
//                           <button
//                             onClick={() => removeTechStack(project.id, tech)}
//                             className="hover:text-[#c40116]/70 ml-1"
//                           >
//                             ×
//                           </button>
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Live URL & GitHub URL */}
//                   <div className="flex flex-wrap gap-4 sm:gap-6">
//                     <div className="group grow">
//                       <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                         Live URL
//                       </label>
//                       <input
//                         type="url"
//                         value={project.liveUrl || ""}
//                         onChange={(e) =>
//                           handleChange(project.id, "liveUrl", e.target.value)
//                         }
//                         placeholder="https://your-project.com"
//                         className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 transition-all duration-300"
//                       />
//                     </div>

//                     <div className="group grow">
//                       <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                         GitHub URL
//                       </label>
//                       <input
//                         type="url"
//                         value={project.githubUrl || ""}
//                         onChange={(e) =>
//                           handleChange(project.id, "githubUrl", e.target.value)
//                         }
//                         placeholder="https://github.com/username/project"
//                         className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 transition-all duration-300"
//                       />
//                     </div>
//                   </div>

//                   {/* Description with AI */}
//                   <div className="">
//                     <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                       Project Description
//                     </label>

//                     <Editor
//                       className="rounded-lg mt-3 md:mt-4 lg:mt-5 bg-white"
//                       value={project.description || ""}
//                       headerTemplate={
//                         <div className="flex gap-1 p-2 flex-wrap items-center bg-gray-50">
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
//                         handleChange(project.id, "description", e.htmlValue);
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

//           {/* Add Project Button */}
//           <button
//             onClick={addProject}
//             className="w-full py-3 sm:py-3.5 mt-4 bg-linear-to-br from-gray-50 to-white border-2 border-dashed border-gray-200 rounded-xl hover:border-[#c40116] hover:bg-[#c40116]/5 text-gray-600 hover:text-[#c40116] transition-all duration-300 group"
//             type="button"
//           >
//             <div className="flex items-center justify-center gap-2">
//               <div className="p-1 sm:p-1.5 bg-gray-100 rounded-lg group-hover:bg-[#c40116]/10 transition-colors">
//                 <IoMdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
//               </div>
//               <span className="text-xs sm:text-sm font-semibold">
//                 Add Project
//               </span>
//             </div>
//           </button>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="shrink-0 pt-2 lg:pt-3">
//           <div className="flex justify-between">
//             <button
//               className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
//               onClick={() => router.push("/resume-details/skills")}
//             >
//               Back
//             </button>

//             <button
//               className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold transition-colors duration-300 cursor-pointer"
//               onClick={() => {
//                 if (saveTimeoutRef.current) {
//                   clearTimeout(saveTimeoutRef.current);
//                 }
//                 if (projects) {
//                   saveToAPI(projects).then(() => {
//                     router.push("/resume-details/summary");
//                   });
//                 } else {
//                   router.push("/resume-details/summary");
//                 }
//               }}
//             >
//               Next Summary
//             </button>
//           </div>
//         </div>

//         {/* Project Tips Modal */}
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
//                         Project Tips
//                       </h3>
//                     </div>
//                     <button
//                       onClick={() => setSkillTipsClicked(false)}
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
//                           title: "Showcase your best work",
//                           desc: "Select 3-5 most impressive and relevant projects.",
//                         },
//                         {
//                           title: "Highlight your role",
//                           desc: "Clearly state what you specifically contributed to the project.",
//                         },
//                         {
//                           title: "Include measurable results",
//                           desc: "Use numbers: 'Increased performance by 40%' or 'Served 10K+ users'.",
//                         },
//                         {
//                           title: "Keep descriptions concise",
//                           desc: "2-4 bullet points per project is ideal.",
//                         },
//                         {
//                           title: "Link to live demos",
//                           desc: "Always provide working links when possible.",
//                         },
//                       ].map((tip, idx) => (
//                         <div
//                           key={idx}
//                           className="flex items-start gap-2 sm:gap-3"
//                         >
//                           <div className="shrink-0 mt-0.5">
//                             <div className="p-1 sm:p-1.5 bg-emerald-100 rounded-lg">
//                               <svg
//                                 className="text-emerald-500 w-3.5 h-3.5 sm:w-4 sm:h-4"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M5 13l4 4L19 7"
//                                 />
//                               </svg>
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
//                           title: "Don't list outdated technologies",
//                           desc: "Focus on modern, in-demand tech stacks.",
//                         },
//                         {
//                           title: "Avoid overly technical jargon",
//                           desc: "Make it understandable for non-technical recruiters.",
//                         },
//                         {
//                           title: "Don't include unfinished projects",
//                           desc: "Only showcase completed, polished work.",
//                         },
//                       ].map((tip, idx) => (
//                         <div
//                           key={idx}
//                           className="flex items-start gap-2 sm:gap-3"
//                         >
//                           <div className="shrink-0 mt-0.5">
//                             <div className="p-1 sm:p-1.5 bg-[#c40116]/10 rounded-lg">
//                               <svg
//                                 className="text-[#c40116] w-3.5 h-3.5 sm:w-4 sm:h-4"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M6 18L18 6M6 6l12 12"
//                                 />
//                               </svg>
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
//       </div>
//     </section>
//   );
// };

// export default ProjectsForm;










"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { FiChevronDown, FiTrash2, FiX, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import {
  IoArrowForward,
  IoClose,
  IoDiamondOutline,
  IoSparkles,
} from "react-icons/io5";
import dynamic from "next/dynamic";
import { CreateContext } from "@/app/context/CreateContext";
import { FaRegLightbulb, FaStar, FaGem } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Stepper from "../../../components/resume/Steppers";
import { getLocalStorage, setLocalStorage } from "@/app/utils";
import { API_URL } from "@/app/config/api";
import { Project } from "@/app/types";

// Dynamically import Editor to avoid SSR issues
const Editor = dynamic(
  () => import("primereact/editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl mt-3 md:mt-4 bg-gray-50 h-32 flex items-center justify-center border border-gray-200">
        <div className="animate-pulse text-gray-400 text-sm">Loading editor...</div>
      </div>
    ),
  },
);

const ProjectsForm = () => {
  const UseContext = useContext(CreateContext);
  const contactId = UseContext?.contact._id || UseContext?.contact.contactId;

  const { fullResumeData, setFullResumeData, projects, setProjects } =
    UseContext || {};

  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedData, setLastSavedData] = useState<string>("");
  const [skillTipsClicked, setSkillTipsClicked] = useState(false);
  const [techInput, setTechInput] = useState<{ [key: string]: string }>({});

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialLoadDone = useRef(false);

  // Save to localStorage whenever projects change
  useEffect(() => {
    if (!initialLoadDone.current) return;

    if (fullResumeData) {
      const updatedFullData = {
        ...fullResumeData,
        projects: projects,
      };
      setFullResumeData(updatedFullData);
      setLocalStorage("fullResumeData", updatedFullData);
    }
  }, [projects]);

  const addProject = () => {
    if (!setProjects) return;

    setProjects((prev: Project[]) => {
      const updated = [
        ...prev,
        {
          id: Date.now(),
          title: "",
          techStack: [],
          description: "",
          liveUrl: "",
          githubUrl: "",
          isOpen: true,
          error: {},
        },
      ];
      debouncedSave(updated);
      return updated;
    });
  };

  const saveToAPI = async (projectsData: Project[]) => {
    if (!contactId) {
      console.error("Contact ID is required");
      return false;
    }

    const currentDataString = JSON.stringify(projectsData);
    if (currentDataString === lastSavedData) {
      return true;
    }

    setIsSaving(true);

    try {
      const formData = {
        projects: projectsData,
      };

      await axios.post(`${API_URL}/api/project-resume/update`, formData, {
        params: { contactId: contactId },
      });

      setLastSavedData(currentDataString);
      fetchProjects();
      return true;
    } catch (err: any) {
      console.error("Error saving projects:", err);
      toast.error("Failed to save Projects!");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const debouncedSave = useCallback(
    (projectsData: Project[]) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        // saveToAPI(projectsData);
      }, 1000);
    },
    [contactId, lastSavedData],
  );

  const toggleForm = (id: string | number) => {
    if (!setProjects) return;
    setProjects((prev: Project[]) =>
      prev.map((project) =>
        project.id === id ? { ...project, isOpen: !project.isOpen } : project,
      ),
    );
  };

  const handleChange = (
    id: string | number,
    field: keyof Project,
    value: string | string[],
  ) => {
    if (!setProjects) return;
    setProjects((prev: Project[]) => {
      const updated = prev.map((project) =>
        project.id === id ? { ...project, [field]: value } : project,
      );
      debouncedSave(updated);
      return updated;
    });
  };

  const deleteProject = (id: string | number) => {
    if (!setProjects) return;
    setProjects((prev: Project[]) => {
      const updated = prev.filter((project) => project.id !== id);
      // saveToAPI(updated);
      return updated;
    });
  };

  const addTechStack = (projectId: string | number) => {
    const techValue = techInput[projectId] || "";
    if (techValue.trim()) {
      const project = projects?.find((p: Project) => p.id === projectId);
      if (project && !project?.techStack?.includes(techValue.trim())) {
        handleChange(projectId, "techStack", [
          ...project.techStack,
          techValue.trim(),
        ]);
        setTechInput((prev) => ({ ...prev, [projectId]: "" }));
      }
    }
  };

  const removeTechStack = (projectId: string | number, tech: string) => {
    const project = projects?.find((p: Project) => p.id === projectId);
    if (project) {
      handleChange(
        projectId,
        "techStack",
        project.techStack.filter((t: string) => t !== tech),
      );
    }
  };

  const fetchProjects = async () => {
    if (!contactId) return;

    try {
      const response = await axios.get(
        `${API_URL}/api/project-resume/get-project-resume/${contactId}`,
      );

      const projectsList = response.data?.data?.projects || [];

      if (projectsList.length > 0) {
        const formattedData = projectsList.map((item: any) => ({
          id: item._id || Date.now(),
          title: item.title || "",
          techStack: item.techStack || [],
          description: item.description || "",
          liveUrl: item.liveUrl || "",
          githubUrl: item.githubUrl || "",
          isOpen: true,
        }));
        setProjects(formattedData);
        setLastSavedData(JSON.stringify(formattedData));
      }
      initialLoadDone.current = true;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Initialize projects if not exists
  useEffect(() => {
    if (!projects && setProjects) {
      setProjects([]);
    }
    initialLoadDone.current = true;
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">
      {/* Premium Background Decoration */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-64 sm:w-96 h-64 sm:h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-indigo-50 rounded-full filter blur-3xl opacity-30"></div>
        
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div> */}

      {/* Sticky Stepper */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <Stepper />
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto px-2  py-6 sm:py-8 lg:py-10">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
          
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Projects
            </h1>
            
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Showcase your best work and technical projects
            </p>

            <button
              onClick={() => setSkillTipsClicked(true)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <FaRegLightbulb className="w-3 h-3" />
              <span>Project Tips</span>
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
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">Portfolio Projects</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Showcase your best work and technical projects</p>
                  </div>
                </div>
                {isSaving && (
                  <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full self-start sm:self-auto">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] sm:text-xs text-indigo-700 font-medium">Saving...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              {projects?.map((project: Project, index: number) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 mb-4"
                >
                  {/* Header */}
                  <div
                    onClick={() => toggleForm(project.id)}
                    className="flex justify-between items-center cursor-pointer p-4 sm:p-5 group hover:bg-gray-50/50 transition-all duration-300"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-0.5 sm:mb-1 truncate group-hover:text-indigo-600 transition-colors">
                        {project.title || "Project Title"}
                      </h3>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] xs:text-xs text-gray-500">
                        <span className="truncate max-w-30 sm:max-w-none">
                          {project.techStack.length > 0
                            ? project.techStack.join(", ")
                            : "No tech stack added"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 ml-2">
                      <motion.div
                        animate={{ rotate: project.isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-1.5 sm:p-2 rounded-lg text-gray-400 group-hover:text-indigo-600 cursor-pointer"
                      >
                        <FiChevronDown size={14} className="sm:w-5 sm:h-5" />
                      </motion.div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(project.id);
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
                      project.isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-4 sm:p-5 space-y-4 sm:space-y-5 border-t border-gray-100">
                      {/* Project Title */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                          Project Title
                        </label>
                        <input
                          type="text"
                          value={project.title || ""}
                          onChange={(e) => handleChange(project.id, "title", e.target.value)}
                          placeholder="E-Commerce Platform"
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                        />
                      </div>

                      {/* Tech Stack */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                          Tech Stack
                        </label>
                        <div className="flex gap-2 mb-3">
                          <input
                            type="text"
                            value={techInput[project.id] || ""}
                            onChange={(e) =>
                              setTechInput((prev) => ({
                                ...prev,
                                [project.id]: e.target.value,
                              }))
                            }
                            onKeyPress={(e) =>
                              e.key === "Enter" && addTechStack(project.id)
                            }
                            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                            placeholder="React, Node.js, MongoDB"
                          />
                          <button
                            onClick={() => addTechStack(project.id)}
                            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition-colors text-sm font-medium"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech: string) => (
                            <span
                              key={tech}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-indigo-50 text-indigo-700 text-xs rounded-lg"
                            >
                              {tech}
                              <button
                                onClick={() => removeTechStack(project.id, tech)}
                                className="hover:text-indigo-900 ml-1"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Live URL & GitHub URL */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                            Live URL
                          </label>
                          <input
                            type="url"
                            value={project.liveUrl || ""}
                            onChange={(e) => handleChange(project.id, "liveUrl", e.target.value)}
                            placeholder="https://your-project.com"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                            GitHub URL
                          </label>
                          <input
                            type="url"
                            value={project.githubUrl || ""}
                            onChange={(e) => handleChange(project.id, "githubUrl", e.target.value)}
                            placeholder="https://github.com/username/project"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                          Project Description
                        </label>
                        <Editor
                          className="rounded-lg bg-white border border-gray-200 overflow-hidden"
                          value={project.description || ""}
                          headerTemplate={
                            <div className="flex gap-1 p-2 flex-wrap items-center bg-gray-50 border-b border-gray-200">
                              <button type="button" className="ql-bold p-1.5 hover:bg-gray-200 rounded transition">B</button>
                              <button type="button" className="ql-italic p-1.5 hover:bg-gray-200 rounded transition">I</button>
                              <button type="button" className="ql-underline p-1.5 hover:bg-gray-200 rounded transition">U</button>
                              <button type="button" className="ql-list p-1.5 hover:bg-gray-200 rounded transition" value="ordered">1.</button>
                              <button type="button" className="ql-list p-1.5 hover:bg-gray-200 rounded transition" value="bullet">•</button>
                              <button type="button" className="ql-clean p-1.5 hover:bg-gray-200 rounded transition">⌫</button>
                            </div>
                          }
                          onTextChange={(e: any) => {
                            handleChange(project.id, "description", e.htmlValue);
                          }}
                          style={{ height: "140px", minHeight: "140px", background: "white" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Project Button */}
              <button
                onClick={addProject}
                className="w-full py-3 sm:py-3.5 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-all duration-300 group cursor-pointer"
                type="button"
              >
                <div className="flex items-center justify-center gap-2">
                  <IoMdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-semibold">Add Project</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Buttons */}
      <div className="sticky bottom-0 z-20 bg-white/80 backdrop-blur-md border-t border-gray-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-3">
            <button
              className="text-xs sm:text-sm font-medium text-gray-500 hover:text-indigo-600 transition flex items-center gap-1 cursor-pointer"
              onClick={() => router.push("/resume-details/skills")}
            >
              ← Back to Skills
            </button>
            <button
              className="px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-semibold  bg-gradient-to-r from-indigo-600 to-indigo-500 text-white  rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer"
              onClick={() => {
                if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
                if (projects) {
                  saveToAPI(projects).then(() => router.push("/resume-details/summary"));
                } else {
                  router.push("/resume-details/summary");
                }
              }}
            >
              <span>Continue to Summary</span>
              <IoArrowForward className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Project Tips Modal */}
      {skillTipsClicked && (
        <AnimatePresence>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 backdrop-blur-md bg-black/50"
              onClick={() => setSkillTipsClicked(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4">
                <div className="flex items-center gap-2">
                  <FaRegLightbulb className="w-5 h-5 text-white" />
                  <h3 className="text-lg font-bold text-white">Project Tips</h3>
                </div>
              </div>

              <div className="p-5">
                <div className="bg-amber-50 rounded-xl p-3 mb-4 border border-amber-100">
                  <div className="flex items-center gap-2 mb-1">
                    <FaStar className="w-3 h-3 text-amber-500" />
                    <span className="text-xs font-semibold text-amber-700">Pro Tip</span>
                  </div>
                  <p className="text-xs text-gray-700">Showcase 3-5 of your most impressive and relevant projects</p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Best Practices</h4>
                  {[
                    "Showcase your best and most relevant work",
                    "Highlight your specific role and contributions",
                    "Include measurable results and impact",
                    "Keep descriptions concise (2-4 bullet points)",
                    "Add live demo links whenever possible"
                  ].map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5" />
                      <span className="text-xs text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => setSkillTipsClicked(false)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    Got it, thanks! ✨
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ProjectsForm;