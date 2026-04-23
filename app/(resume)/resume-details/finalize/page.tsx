// "use client";
// import React, {
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
//   useRef,
// } from "react";
// import dynamic from "next/dynamic";
// import { AnimatePresence, motion } from "framer-motion";
// import { CreateContext } from "@/app/context/CreateContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// // import "react-circular-progressbar/dist/styles.css";

// import {
//   FaCertificate,
//   FaHiking,
//   FaAward,
//   FaGlobe,
//   FaPlus,
//   FaChevronDown,
//   FaTrash,
// } from "react-icons/fa";
// import { BsFileEarmarkText } from "react-icons/bs";
// import { useRouter } from "next/navigation";
// import Stepper from "../../../components/resume/Steppers";
// import {
//   Finalize as FinalizeType,
//   SimpleSkill,
//   SkillCategory,
//   Template,
// } from "@/app/types/context.types";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { API_URL } from "@/app/config/api";

// // Define interfaces
// interface Section {
//   title: keyof FinalizeType;
//   heading: string;
//   icon: React.ReactNode;
//   description: string;
// }

// interface DeletePopupState {
//   show: boolean;
//   section: keyof FinalizeType | null;
//   heading: string | null;
// }

// const sections: Section[] = [
//   {
//     title: "certificationsAndLicenses",
//     heading: "Certifications & Licenses",
//     icon: <FaCertificate className="w-5 h-5 text-[#c40116]" />,
//     description: "Add credentials that back up your expertise.",
//   },
//   {
//     title: "hobbiesAndInterests",
//     heading: "Hobbies & Interests",
//     icon: <FaHiking className="w-5 h-5 text-[#c40116]" />,
//     description: "Include activities relevant to your job or industry.",
//   },
//   {
//     title: "awardsAndHonors",
//     heading: "Awards & Honors",
//     icon: <FaAward className="w-5 h-5 text-[#c40116]" />,
//     description: "Share achievements and milestones you're proud of.",
//   },
//   {
//     title: "websitesAndSocialMedia",
//     heading: "Websites & Social Media",
//     icon: <FaGlobe className="w-5 h-5 text-[#c40116]" />,
//     description:
//       "Share your portfolio, blog, LinkedIn, or other related websites.",
//   },
//   {
//     title: "customSection",
//     heading: "Custom Section",
//     icon: <BsFileEarmarkText className="w-5 h-5 text-[#c40116]" />,
//     description:
//       "Create a custom section for any extra info you'd like to add.",
//   },
// ];

// // Dynamically import Editor to avoid SSR issues
// const Editor = dynamic(
//   () => import("primereact/editor").then((mod) => mod.Editor),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200 h-35 min-h-35 flex items-center justify-center">
//         <div className="animate-pulse text-gray-400">Loading editor...</div>
//       </div>
//     ),
//   },
// );

// const FinalizeForm = () => {
//   const UseContext = useContext(CreateContext);
//   const router = useRouter();

//   // Safely destructure context with fallbacks
//   const {
//     contact,
//     summary = "",
//     skills = [],
//     experiences = [],
//     education = [],
//     finalize = {},
//     setFinalize = () => {},
//     fullResumeData,
//     setFullResumeData,
//   } = UseContext || {};

//   const [isSaving, setIsSaving] = useState(false);
//   const [lastSavedData, setLastSavedData] = useState<string>("");
//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const initialLoadDone = useRef(false);

//   const contactId = UseContext?.contact._id || UseContext?.contact.contactId;

//   console.log("contact", contact);

//   const stripHtml = (html: string) => {
//     return html?.replace(/<\/?[^>]+(>|$)/g, "") || "";
//   };

//   const textEditorTextsFormat = (text: string) => {
//     return text
//       .replace(/<\/?[^>]+(>|$)/g, "")
//       .replace(/•/g, "")
//       .replace(/\s+/g, " ")
//       .trim()
//       .split(".")
//       .map((s) => s.trim())
//       .filter(Boolean);
//   };

//   const htmlRemovedSummary = stripHtml(summary);

//   // const filteredSkills = skills
//   //   .map((item) => item?.skill || "")
//   //   .filter(Boolean);

//   const filteredSkills = skills?.length
//     ? "title" in skills[0]
//       ? (skills as SkillCategory[]).flatMap((c) => c.skills.map((s) => s.name))
//       : (skills as SimpleSkill[]).map((s) => s.name)
//     : [];

//   const filteredExperiences = experiences.map((item) => ({
//     title: item?.jobTitle || "",
//     company: item?.employer || "",
//     bullets: textEditorTextsFormat(item?.text || ""),
//   }));
//   const filteredEducation = education.map((item) => ({
//     degree: item?.degree || "",
//     educationDescription: textEditorTextsFormat(item?.text || ""),
//   }));

//   const chosenResumeDetails = getLocalStorage<Template>("chosenTemplate");

//   const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

//   // Save to localStorage whenever skillsData changes
//   useEffect(() => {
//     if (!initialLoadDone.current) return;

//     if (fullResumeData) {
//       const updatedFullData = {
//         ...fullResumeData,
//         finalize: finalize,
//       };
//       setFullResumeData(updatedFullData);
//       setLocalStorage("fullResumeData", updatedFullData);
//     }
//   }, [finalize]);

//   const saveToAPI = async (finalizeData: typeof finalize) => {
//     if (!contactId) {
//       console.error("Contact ID is required");
//       return false;
//     }

//     // Check if data has changed from last saved
//     const currentDataString = JSON.stringify(finalizeData);
//     if (currentDataString === lastSavedData) {
//       return true; // No changes to save
//     }

//     setIsSaving(true);

//     try {
//       const cleanedSkillsData = Object.fromEntries(
//         Object.entries(finalizeData).map(([section, skills]) => [
//           section,
//           (skills as any[])?.filter(
//             (skill) => skill?.name && skill.name.trim() !== "",
//           ) || [],
//         ]),
//       );

//       const formData = {
//         skillsData: cleanedSkillsData,
//         templateId: chosenResumeDetails?.id,
//       };

//       const response = await axios.post(
//         `${API_URL}/api/finalize-resume/update`,
//         formData,
//         { params: { contactId: contactId } },
//       );

//       setLastSavedData(currentDataString);
//       return true;
//     } catch (err: any) {
//       console.error("Error saving finalize data:", err);
//       toast.error("Failed to save additional information!");
//       return false;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // Debounced save function
//   const debouncedSave = useCallback(
//     (finalizeData: typeof finalize) => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//       saveTimeoutRef.current = setTimeout(() => {
//         saveToAPI(finalizeData);
//       }, 1000);
//     },
//     [contactId, lastSavedData],
//   );

//   const [deletePopup, setDeletePopup] = useState<DeletePopupState>({
//     show: false,
//     section: null,
//     heading: null,
//   });

//   const [collapseStates, setCollapseStates] = useState<Record<string, boolean>>(
//     () => {
//       const initialState: Record<string, boolean> = {};
//       sections.forEach((section) => {
//         initialState[section.title] = true;
//       });
//       return initialState;
//     },
//   );

//   const fetchSkill = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/finalize-resume/get-finalize-resume/${contactId}`,
//       );
//       const experienceList = response.data?.resume?.[0]?.skillsData || {};

//       const formattedData: FinalizeType = {
//         languages: experienceList.languages || [],
//         certificationsAndLicenses:
//           experienceList.certificationsAndLicenses || [],
//         hobbiesAndInterests: experienceList.hobbiesAndInterests || [],
//         awardsAndHonors: experienceList.awardsAndHonors || [],
//         websitesAndSocialMedia: experienceList.websitesAndSocialMedia || [],
//         references: experienceList.references || [],
//         customSection: experienceList.customSection || [],
//       };

//       setFinalize(formattedData);
//       setLastSavedData(JSON.stringify(formattedData));
//       initialLoadDone.current = true;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //   useEffect(() => {
//   //   if (contact?.contactId) {
//   //     fetchSkill();
//   //   }
//   // }, [contact?.contactId]);

//   // Cleanup timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = deletePopup.show ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [deletePopup.show]);

//   // Toggle section open/close
//   const handleToggleSection = (title: string) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [title]: !prev[title],
//     }));
//   };

//   // Confirm deletion popup
//   const confirmDeleteSection = (title: keyof FinalizeType, heading: string) => {
//     setDeletePopup({ show: true, section: title, heading: heading });
//   };

//   const deleteSection = () => {
//     const title = deletePopup.section;
//     if (!title) return;

//     setFinalize((prev) => {
//       const updated = {
//         ...prev,
//         [title]: (prev[title] as any[])?.map((item) => {
//           const clearedItem: any = {};
//           Object.keys(item).forEach((key) => {
//             clearedItem[key] = typeof item[key] === "number" ? 0 : "";
//           });
//           return clearedItem;
//         }),
//       };
//       debouncedSave(updated);
//       return updated;
//     });

//     setOpenSections((prev) => ({ ...prev, [title]: false }));
//     setDeletePopup({ show: false, section: null, heading: null });
//   };

//   const cancelDelete = () =>
//     setDeletePopup({ show: false, section: null, heading: null });

//   // Collapse toggle inside each section
//   const toggleCollapse = (section: string) => {
//     setCollapseStates((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const addSkill = (section: keyof FinalizeType) => {
//     const singleEntrySections: (keyof FinalizeType)[] = [
//       "certificationsAndLicenses",
//       "awardsAndHonors",
//       "references",
//     ];

//     if (
//       singleEntrySections.includes(section) &&
//       (finalize[section] as any[])?.length > 0
//     )
//       return;

//     setFinalize((prev) => {
//       const updated = {
//         ...prev,
//         [section]: [
//           ...((prev[section] as any[]) || []),
//           { id: Date.now(), name: "", level: 3 },
//         ],
//       };
//       debouncedSave(updated);
//       return updated;
//     });

//     setOpenSections((prev) => ({ ...prev, [section]: true }));
//   };

//   // Delete skill
//   const deleteSkill = (section: keyof FinalizeType, skillId: number) => {
//     setFinalize((prev) => {
//       const updated = {
//         ...prev,
//         [section]:
//           (prev[section] as any[])?.filter((s) => s.id !== skillId) || [],
//       };
//       debouncedSave(updated);
//       return updated;
//     });
//   };

//   const handleSkillChange = (
//     section: keyof FinalizeType,
//     skillId: number,
//     value: string,
//     type: string = "name",
//   ) => {
//     setFinalize((prev) => {
//       const updated = {
//         ...prev,
//         [section]:
//           (prev[section] as any[])?.map((s) =>
//             s.id === skillId
//               ? {
//                   ...s,
//                   [type]: value,
//                 }
//               : s,
//           ) || [],
//       };
//       debouncedSave(updated);
//       return updated;
//     });
//   };

//   const canAddNew = (sectionTitle: keyof FinalizeType) => {
//     const list = finalize[sectionTitle] as any[] | undefined;
//     const singleEntrySections: (keyof FinalizeType)[] = [
//       "certificationsAndLicenses",
//       "awardsAndHonors",
//       "references",
//     ];

//     if (singleEntrySections.includes(sectionTitle)) {
//       return !list || list.length === 0;
//     }

//     if (!list || list.length === 0) return true;
//     const last = list[list.length - 1];
//     return last.name?.trim() !== "";
//   };

//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [score, setScore] = useState(0);
//   const [atsVerdict, setAtsVerdict] = useState("");
//   const [progress, setProgress] = useState(0);
//   const [showConfetti, setShowConfetti] = useState(false);

//   const checkATSScore = async () => {
//     setLoading(true);

//     const formData = {
//       resume_data: {
//         name: `${contact?.firstName || ""} ${contact?.lastName || ""}`.trim(),
//         email: contact?.email || "",
//         phone: contact?.phone || "",
//         summary: htmlRemovedSummary,
//         skills: filteredSkills,
//         experience: filteredExperiences,
//         education: filteredEducation,
//       },
//     };

//     try {
//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/ats/scan`,
//         formData,
//       );

//       setScore(response.data.ats_score);
//       setAtsVerdict(response?.data?.summary?.ats_verdict);
//       setProgress(0);
//       setLoading(false);
//       setShowPopup(true);

//       return true;
//     } catch (err: any) {
//       toast.error("Something went wrong");
//       console.error("Error sending message:", err);
//       setLoading(false);
//       return false;
//     }
//   };

//   // Animate progress after popup opens
//   useEffect(() => {
//     if (!showPopup) return;

//     let current = 0;
//     const timer = setInterval(() => {
//       current += 1;
//       if (current >= score) {
//         current = score;
//         clearInterval(timer);

//         if (score >= 80) {
//           setShowConfetti(true);
//         }
//       }
//       setProgress(current);
//     }, 15);

//     return () => clearInterval(timer);
//   }, [score, showPopup]);

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
//           <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
//             <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
//               <svg
//                 className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
//                 />
//               </svg>
//             </div>
//             <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
//               Additional Information
//             </h1>
//           </div>

//           <p className="text-gray-600 text-xs sm:text-sm font-medium">
//             Add relevant skills, certifications, languages, and other
//             information to enhance your resume.
//           </p>

//           {/* Open Sections */}
//           <div className="space-y-3 sm:space-y-4 pb-4">
//             {sections.map(
//               (section) =>
//                 openSections[section.title] && (
//                   <div key={section.title} className="space-y-3 sm:space-y-4">
//                     <div className="bg-[#f3f4f6]/80 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-subtle transition-all duration-300 hover:shadow-md">
//                       {/* Header */}
//                       <div
//                         className="flex justify-between items-center cursor-pointer p-3 sm:p-4 lg:p-5 group hover:bg-gray-50/50 transition-all duration-300"
//                         onClick={() => toggleCollapse(section.title)}
//                       >
//                         <div className="flex gap-2 sm:gap-3 items-center">
//                           <div className="bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg">
//                             <span className="text-[#c40116] text-lg sm:text-xl">
//                               {section.icon}
//                             </span>
//                           </div>

//                           <div>
//                             <div className="text-gray-800 font-medium sm:font-semibold text-sm sm:text-base group-hover:text-[#c40116] transition-colors">
//                               {section.title === "customSection"
//                                 ? "Custom Section"
//                                 : section.heading}
//                             </div>
//                             <div className="block text-gray-500 text-xs sm:text-sm mt-0.5 sm:mt-1 group-hover:text-[#c40116]/70 transition-colors">
//                               {section.description}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex gap-2 sm:gap-4 items-center">
//                           <motion.div
//                             animate={{
//                               rotate: collapseStates[section.title] ? 180 : 0,
//                             }}
//                             transition={{ duration: 0.3 }}
//                             className="text-gray-400 group-hover:text-[#c40116] transition-colors"
//                           >
//                             <FaChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
//                           </motion.div>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               confirmDeleteSection(
//                                 section.title,
//                                 section.heading,
//                               );
//                             }}
//                             className="p-1.5 sm:p-2 rounded-lg bg-linear-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
//                             type="button"
//                           >
//                             <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
//                           </button>
//                         </div>
//                       </div>

//                       {/* Collapsible Content */}
//                       <div
//                         className={`transition-all duration-500 overflow-hidden ${
//                           collapseStates[section.title]
//                             ? "max-h-500 opacity-100"
//                             : "max-h-0 opacity-0"
//                         }`}
//                       >
//                         <div className="p-3 sm:p-4 lg:p-5 space-y-4 sm:space-y-6 border-t border-gray-100">
//                           {(finalize[section.title] as any[])?.map(
//                             (skill: any, index) => (
//                               <div
//                                 key={index}
//                                 className="flex justify-between items-start gap-3 sm:gap-4 flex-col sm:flex-row"
//                               >
//                                 {section.title ===
//                                   "certificationsAndLicenses" && (
//                                   <div className="w-full group">
//                                     <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                                       Certification Details
//                                     </label>
//                                     <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#c40116] focus-within:ring-2 focus-within:ring-[#c40116]/20 transition-all duration-300">
//                                       <Editor
//                                         className="rounded-lg"
//                                         value={skill.name || ""}

//                                          headerTemplate={
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
//                                         onTextChange={(e: any) =>
//                                           handleSkillChange(
//                                             section.title,
//                                             skill.id,
//                                             e.htmlValue,
//                                           )
//                                         }
//                                         onBlur={() => {
//                                           if (saveTimeoutRef.current) {
//                                             clearTimeout(
//                                               saveTimeoutRef.current,
//                                             );
//                                           }
//                                           saveToAPI(finalize);
//                                         }}
//                                         style={{
//                                           height: "140px",
//                                           minHeight: "140px",
//                                           padding: "12px sm:16px",
//                                           backgroundColor: "#fafafa",
//                                         }}
//                                       />
//                                     </div>
//                                   </div>
//                                 )}

//                                 {section.title === "websitesAndSocialMedia" && (
//                                   <div className="w-full space-y-3 sm:space-y-4">
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                                       <div className="group">
//                                         <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                                           Website URL
//                                         </label>
//                                         <input
//                                           type="text"
//                                           value={skill.websiteUrl || ""}
//                                           onChange={(e) =>
//                                             handleSkillChange(
//                                               section.title,
//                                               skill.id,
//                                               e.target.value,
//                                               "websiteUrl",
//                                             )
//                                           }
//                                           onBlur={() => {
//                                             if (saveTimeoutRef.current) {
//                                               clearTimeout(
//                                                 saveTimeoutRef.current,
//                                               );
//                                             }
//                                             saveToAPI(finalize);
//                                           }}
//                                           placeholder="https://example.com"
//                                           className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                                         />
//                                       </div>

//                                       <div className="group">
//                                         <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                                           Social Media URL
//                                         </label>
//                                         <input
//                                           type="text"
//                                           value={skill.socialMedia || ""}
//                                           onChange={(e) =>
//                                             handleSkillChange(
//                                               section.title,
//                                               skill.id,
//                                               e.target.value,
//                                               "socialMedia",
//                                             )
//                                           }
//                                           onBlur={() => {
//                                             if (saveTimeoutRef.current) {
//                                               clearTimeout(
//                                                 saveTimeoutRef.current,
//                                               );
//                                             }
//                                             saveToAPI(finalize);
//                                           }}
//                                           placeholder="https://linkedin.com/in/username"
//                                           className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="flex justify-end pt-1 sm:pt-2">
//                                       <button
//                                         onClick={() =>
//                                           deleteSkill(section.title, skill.id)
//                                         }
//                                         className="p-1.5 sm:p-2 rounded-lg bg-linear-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
//                                         type="button"
//                                       >
//                                         <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 )}

//                                 {section.title === "awardsAndHonors" && (
//                                   <div className="w-full group">
//                                     <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                                       Awards & Honors Details
//                                     </label>
//                                     <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#c40116] focus-within:ring-2 focus-within:ring-[#c40116]/20 transition-all duration-300">
//                                       <Editor
//                                         className="rounded-lg"
//                                          headerTemplate={
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
//                                         value={skill.name || ""}
//                                         onTextChange={(e: any) =>
//                                           handleSkillChange(
//                                             section.title,
//                                             skill.id,
//                                             e.htmlValue,
//                                           )
//                                         }
//                                         onBlur={() => {
//                                           if (saveTimeoutRef.current) {
//                                             clearTimeout(
//                                               saveTimeoutRef.current,
//                                             );
//                                           }
//                                           saveToAPI(finalize);
//                                         }}
//                                         style={{
//                                           height: "140px",
//                                           minHeight: "140px",
//                                           padding: "12px sm:16px",
//                                           backgroundColor: "#fafafa",
//                                         }}
//                                       />
//                                     </div>
//                                   </div>
//                                 )}

//                                 {section.title === "hobbiesAndInterests" && (
//                                   <div className="w-full group">
//                                     <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                                       {section.heading}
//                                     </label>
//                                     <div className="flex items-center gap-2 sm:gap-3">
//                                       <input
//                                         type="text"
//                                         value={skill.name || ""}
//                                         onChange={(e) =>
//                                           handleSkillChange(
//                                             section.title,
//                                             skill.id,
//                                             e.target.value,
//                                           )
//                                         }
//                                         onBlur={() => {
//                                           if (saveTimeoutRef.current) {
//                                             clearTimeout(
//                                               saveTimeoutRef.current,
//                                             );
//                                           }
//                                           saveToAPI(finalize);
//                                         }}
//                                         placeholder={`Enter ${section.heading.toLowerCase()}`}
//                                         className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                                       />
//                                       <button
//                                         onClick={() =>
//                                           deleteSkill(section.title, skill.id)
//                                         }
//                                         className="p-2 sm:p-3 rounded-lg bg-linear-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
//                                         type="button"
//                                       >
//                                         <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 )}

//                                 {section.title === "customSection" && (
//                                   <div className="w-full space-y-3 sm:space-y-4">
//                                     <div className="group">
//                                       <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                                         Section Name
//                                       </label>
//                                       <input
//                                         type="text"
//                                         value={skill.name || ""}
//                                         onChange={(e) =>
//                                           handleSkillChange(
//                                             section.title,
//                                             skill.id,
//                                             e.target.value,
//                                             "name",
//                                           )
//                                         }
//                                         onBlur={() => {
//                                           if (saveTimeoutRef.current) {
//                                             clearTimeout(
//                                               saveTimeoutRef.current,
//                                             );
//                                           }
//                                           saveToAPI(finalize);
//                                         }}
//                                         placeholder="Enter section name"
//                                         className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
//                                       />
//                                     </div>

//                                     <div className="group">
//                                       <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
//                                         Description
//                                       </label>
//                                       <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#c40116] focus-within:ring-2 focus-within:ring-[#c40116]/20 transition-all duration-300">
//                                         <Editor
//                                           className="rounded-lg"
//                                            headerTemplate={
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
//                                           value={skill.description || ""}
//                                           onTextChange={(e: any) =>
//                                             handleSkillChange(
//                                               section.title,
//                                               skill.id,
//                                               e.htmlValue,
//                                               "description",
//                                             )
//                                           }
//                                           onBlur={() => {
//                                             if (saveTimeoutRef.current) {
//                                               clearTimeout(
//                                                 saveTimeoutRef.current,
//                                               );
//                                             }
//                                             saveToAPI(finalize);
//                                           }}
//                                           style={{
//                                             height: "140px",
//                                             minHeight: "140px",
//                                             padding: "12px sm:16px",
//                                             backgroundColor: "#fafafa",
//                                           }}
//                                         />
//                                       </div>
//                                     </div>

//                                     <div className="flex justify-end pt-1 sm:pt-2">
//                                       <button
//                                         onClick={() =>
//                                           deleteSkill(section.title, skill.id)
//                                         }
//                                         className="p-1.5 sm:p-2 rounded-lg bg-linear-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
//                                         type="button"
//                                       >
//                                         <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 )}
//                               </div>
//                             ),
//                           )}

//                           {/* Add Button */}
//                           {canAddNew(section.title) &&
//                             ![
//                               "certificationsAndLicenses",
//                               "awardsAndHonors",
//                               "references",
//                             ].includes(section.title) && (
//                               <button
//                                 onClick={() => addSkill(section.title)}
//                                 className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-linear-to-r from-[#c40116]/10 to-[#be0117]/10 text-[#c40116] font-medium hover:from-[#c40116]/20 hover:to-[#be0117]/20 transition-all duration-200 text-sm"
//                                 type="button"
//                               >
//                                 <FaPlus className="w-4 h-4 sm:w-5 sm:h-5" />
//                                 Add {section.heading}
//                               </button>
//                             )}

//                           {/* For single-entry sections */}
//                           {canAddNew(section.title) &&
//                             [
//                               "certificationsAndLicenses",
//                               "awardsAndHonors",
//                               "references",
//                             ].includes(section.title) && (
//                               <button
//                                 onClick={() => addSkill(section.title)}
//                                 className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-linear-to-r from-[#c40116]/10 to-[#be0117]/10 text-[#c40116] font-medium hover:from-[#c40116]/20 hover:to-[#be0117]/20 transition-all duration-200 text-xs sm:text-base"
//                                 type="button"
//                               >
//                                 <FaPlus className="w-4 h-4 sm:w-5 sm:h-5" />
//                                 Add {section.heading}
//                               </button>
//                             )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ),
//             )}

//             {/* Available Sections Grid */}
//             <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4">
//               {sections.map(
//                 (section, idx) =>
//                   !openSections[section.title] && (
//                     <button
//                       key={idx}
//                       onClick={() => handleToggleSection(section.title)}
//                       className="group p-4 sm:p-5 bg-[#f3f4f6]/80 border border-gray-200 rounded-xl hover:border-[#c40116] hover:shadow-md transition-all duration-300"
//                       type="button"
//                     >
//                       <div className="flex items-center justify-between gap-2 sm:gap-3">
//                         <div className="flex items-center gap-2 sm:gap-3">
//                           <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg group-hover:from-[#c40116]/20 group-hover:to-[#be0117]/20 transition-all">
//                             <span className="text-[#c40116] text-lg sm:text-xl">
//                               {section.icon}
//                             </span>
//                           </div>
//                           <div className="text-left">
//                             <div className="font-medium md:font-semibold text-gray-800 text-sm sm:text-base group-hover:text-[#c40116] transition-colors">
//                               {section.heading}
//                             </div>
//                             <div className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
//                               {section.description}
//                             </div>
//                           </div>
//                         </div>
//                         <FaPlus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-[#c40116] transition-colors" />
//                       </div>
//                     </button>
//                   ),
//               )}
//             </div>
//           </div>

//           {/* ATS Score Button */}
//           <div className="bg-linear-to-t from-white via-white to-transparent pt-4 pb-2 mt-4">
//             <button
//               onClick={checkATSScore}
//               className="w-full sm:w-fit mx-auto p-2.5 sm:p-3 bg-linear-to-r from-[#c40116] to-[#c40116]/60 text-white font-medium rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#c40116]/25 transition-all duration-300  text-sm sm:text-base"
//               type="button"
//             >
//               Check Your ATS Score
//             </button>
//           </div>
//         </div>

//         {/* Fixed Footer */}
//         <div className="shrink-0 pt-2  lg:pt-3">
//           <div className="flex justify-between">
//             <button
//               className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
//               onClick={() => router.push("/resume-details/summary")}
//             >
//               Back
//             </button>

//             <button
//               className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold transition-colors duration-300 cursor-pointer"
//               onClick={() => {
//                 if (saveTimeoutRef.current) {
//                   clearTimeout(saveTimeoutRef.current);
//                 }
//                 saveToAPI(finalize).then(() => {
//                   router.push("/download-resume");
//                   // window.open("/download-resume", "_blank");
//                 });
//               }}
//             >
//               Download Resume
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Popup */}
//       {deletePopup.show && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
//             <div className="p-1 bg-linear-to-r from-[#c40116] to-[#be0117]"></div>

//             <div className="p-4 sm:p-6 text-center">
//               <div className="p-2 sm:p-3 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-full w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4">
//                 <FaTrash className="w-6 h-6 sm:w-8 sm:h-8 text-[#c40116]" />
//               </div>

//               <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1.5 sm:mb-2">
//                 Delete Section
//               </h3>
//               <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
//                 Are you sure you want to delete "{deletePopup.heading}"?
//               </p>

//               <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//                 <button
//                   onClick={cancelDelete}
//                   className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                   type="button"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={deleteSection}
//                   className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all text-sm"
//                   type="button"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Loader */}
//       {loading && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 text-center max-w-sm w-full">
//             <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border-3 sm:border-4 border-[#c40116] border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
//             <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-1.5 sm:mb-2">
//               Analyzing Resume...
//             </h3>
//             <p className="text-gray-500 text-xs sm:text-sm">
//               This may take a few seconds
//             </p>
//           </div>
//         </div>
//       )}

//       {/* ATS Result Modal - Shown after resume upload and analysis */}
//       <AnimatePresence mode="wait">
//         {showPopup && (
//           <>
//             {/* Backdrop overlay */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
//               onClick={() => {
//                 setShowPopup(false);
//                 setShowConfetti(false);
//               }}
//             />

//             {/* Modal */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               transition={{
//                 type: "spring",
//                 damping: 20,
//                 stiffness: 300,
//                 duration: 0.3,
//               }}
//               className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
//             >
//               <motion.div
//                 className="bg-linear-to-br from-white via-white to-gray-50 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 pointer-events-auto relative"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <div className="p-6 sm:p-8">
//                   {/* Header with icon */}
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3, delay: 0.1 }}
//                     className="text-center mb-6"
//                   >
//                     <motion.div
//                       initial={{ scale: 0, rotate: -180 }}
//                       animate={{ scale: 1, rotate: 0 }}
//                       transition={{ type: "spring", delay: 0.2, damping: 12 }}
//                       className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-2xl mb-4"
//                     >
//                       <svg
//                         className="w-8 h-8 text-[#c40116]"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={1.5}
//                           d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                         />
//                       </svg>
//                     </motion.div>
//                     <motion.h3
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ duration: 0.3, delay: 0.25 }}
//                       className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
//                     >
//                       ATS Score Analysis
//                     </motion.h3>
//                   </motion.div>

//                   {/* Score Circle with animation */}
//                   <motion.div
//                     initial={{ scale: 0, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ type: "spring", delay: 0.3, damping: 15 }}
//                     className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-6"
//                   >
//                     <CircularProgressbar
//                       value={progress}
//                       text={`${progress}%`}
//                       styles={buildStyles({
//                         pathColor:
//                           progress >= 80
//                             ? "#10b981"
//                             : progress >= 60
//                               ? "#f59e0b"
//                               : "#ef4444",
//                         textColor:
//                           progress >= 80
//                             ? "#10b981"
//                             : progress >= 60
//                               ? "#f59e0b"
//                               : "#ef4444",
//                         trailColor: "#f3f4f6",
//                         pathTransitionDuration: 1,
//                         textSize: "24px",
//                         strokeLinecap: "round",
//                       })}
//                     />
//                     <div className="absolute inset-0 rounded-full border-2 border-gray-100 -z-10"></div>
//                   </motion.div>

//                   {/* Verdict text */}
//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3, delay: 0.55 }}
//                     className="text-gray-600 text-sm sm:text-base mb-5 text-center leading-relaxed"
//                   >
//                     {atsVerdict}
//                   </motion.p>

//                   {/* Navigation to Full ATS Checker Page */}
//                   <motion.div
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.2, delay: 0.6 }}
//                     className="mb-3"
//                   >
//                     <p className="text-xs text-gray-400 text-center mb-2">
//                       Want a more detailed analysis?
//                     </p>
//                     <button
//                       onClick={() => {
//                         setShowPopup(false);
//                         window.open("/ats-checker");
//                       }}
//                       className="w-full py-3 px-4 bg-linear-to-r from-[#c40116]/5 to-[#be0117]/5 text-[#c40116] font-medium rounded-xl border border-[#c40116]/20 hover:border-[#c40116]/40 hover:shadow-md transition-all duration-300 group flex items-center justify-center gap-2 text-sm sm:text-base"
//                     >
//                       <svg
//                         className="w-4 h-4 group-hover:translate-x-1 transition-transform"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M13 7l5 5m0 0l-5 5m5-5H6"
//                         />
//                       </svg>
//                       Go to Advanced ATS Checker
//                       <span className="text-xs text-gray-500 group-hover:text-[#c40116] transition-colors">
//                         Full Analysis →
//                       </span>
//                     </button>
//                   </motion.div>

//                   {/* Close Button */}
//                   <motion.button
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     transition={{ duration: 0.2, delay: 0.65 }}
//                     onClick={() => {
//                       setShowPopup(false);
//                       setShowConfetti(false);
//                     }}
//                     className="w-full py-2.5 sm:py-3 bg-linear-to-r from-gray-100 to-gray-200 text-gray-700 font-medium rounded-xl hover:shadow-md transition-all duration-300 text-sm sm:text-base"
//                     type="button"
//                   >
//                     Close
//                   </motion.button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };

// export default FinalizeForm;

// "use client";
// import React, {
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
//   useRef,
// } from "react";
// import dynamic from "next/dynamic";
// import { AnimatePresence, motion } from "framer-motion";
// import { CreateContext } from "@/app/context/CreateContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

// import {
//   FaCertificate,
//   FaHiking,
//   FaAward,
//   FaGlobe,
//   FaPlus,
//   FaChevronDown,
//   FaTrash,
//   FaRegLightbulb,
//   FaStar,
//   FaGem,
//   FaLanguage,
// } from "react-icons/fa";
// import { BsFileEarmarkText } from "react-icons/bs";
// // import {
// //   IoSparkles,
// //   IoDiamondOutline,
// //   IoArrowForward,
// //   IoClose,
// //   IoCheckmarkCircle,
// // } from "react-icons/io";

// import {
//   IoArrowForward,
//   IoClose,
//   IoDiamondOutline,
//   IoSparkles,
// } from "react-icons/io5";
// import { FiCheckCircle, FiXCircle } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import Stepper from "../../../components/resume/Steppers";
// import {
//   Finalize as FinalizeType,
//   SimpleSkill,
//   SkillCategory,
//   Template,
// } from "@/app/types/context.types";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { API_URL } from "@/app/config/api";

// // Define interfaces
// interface Section {
//   title: keyof FinalizeType;
//   heading: string;
//   icon: React.ReactNode;
//   description: string;
// }

// interface DeletePopupState {
//   show: boolean;
//   section: keyof FinalizeType | null;
//   heading: string | null;
// }

// const sections: Section[] = [
//   {
//     title: "languages",
//     heading: "Languages",
//     icon: <FaLanguage className="w-5 h-5 text-indigo-600" />,
//     description: "Add languages you speak and your proficiency level.",
//   },
//   {
//     title: "certificationsAndLicenses",
//     heading: "Certifications & Licenses",
//     icon: <FaCertificate className="w-5 h-5 text-indigo-600" />,
//     description: "Add credentials that back up your expertise.",
//   },
//   {
//     title: "hobbiesAndInterests",
//     heading: "Hobbies & Interests",
//     icon: <FaHiking className="w-5 h-5 text-indigo-600" />,
//     description: "Include activities relevant to your job or industry.",
//   },
//   {
//     title: "awardsAndHonors",
//     heading: "Awards & Honors",
//     icon: <FaAward className="w-5 h-5 text-indigo-600" />,
//     description: "Share achievements and milestones you're proud of.",
//   },
//   {
//     title: "websitesAndSocialMedia",
//     heading: "Websites & Social Media",
//     icon: <FaGlobe className="w-5 h-5 text-indigo-600" />,
//     description:
//       "Share your portfolio, blog, LinkedIn, Twitter, GitHub, or other profiles.",
//   },
//   {
//     title: "customSection",
//     heading: "Custom Section",
//     icon: <BsFileEarmarkText className="w-5 h-5 text-indigo-600" />,
//     description:
//       "Create a custom section for any extra info you'd like to add.",
//   },
// ];

// // Dynamically import Editor to avoid SSR issues
// const Editor = dynamic(
//   () => import("primereact/editor").then((mod) => mod.Editor),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="bg-gray-50 rounded-xl border border-gray-200 h-32 flex items-center justify-center">
//         <div className="animate-pulse text-gray-400 text-sm">Loading editor...</div>
//       </div>
//     ),
//   },
// );

// const FinalizeForm = () => {
//   const UseContext = useContext(CreateContext);
//   const router = useRouter();

//   const {
//     contact,
//     summary = "",
//     skills = [],
//     experiences = [],
//     education = [],
//     finalize = {},
//     setFinalize = () => {},
//     fullResumeData,
//     setFullResumeData,
//   } = UseContext || {};

//   const [isSaving, setIsSaving] = useState(false);
//   const [lastSavedData, setLastSavedData] = useState<string>("");
//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const initialLoadDone = useRef(false);

//   const contactId = UseContext?.contact._id || UseContext?.contact.contactId;

//   const stripHtml = (html: string) => {
//     return html?.replace(/<\/?[^>]+(>|$)/g, "") || "";
//   };

//   const textEditorTextsFormat = (text: string) => {
//     return text
//       .replace(/<\/?[^>]+(>|$)/g, "")
//       .replace(/•/g, "")
//       .replace(/\s+/g, " ")
//       .trim()
//       .split(".")
//       .map((s) => s.trim())
//       .filter(Boolean);
//   };

//   const htmlRemovedSummary = stripHtml(summary);

//   const filteredSkills = skills?.length
//     ? "title" in skills[0]
//       ? (skills as SkillCategory[]).flatMap((c) => c.skills.map((s) => s.name))
//       : (skills as SimpleSkill[]).map((s) => s.name)
//     : [];

//   const filteredExperiences = experiences.map((item) => ({
//     title: item?.jobTitle || "",
//     company: item?.employer || "",
//     bullets: textEditorTextsFormat(item?.text || ""),
//   }));
//   const filteredEducation = education.map((item) => ({
//     degree: item?.degree || "",
//     educationDescription: textEditorTextsFormat(item?.text || ""),
//   }));

//   const chosenResumeDetails = getLocalStorage<Template>("chosenTemplate");

//   const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

//   // Save to localStorage whenever skillsData changes
//   useEffect(() => {
//     if (!initialLoadDone.current) return;

//     if (fullResumeData) {
//       const updatedFullData = {
//         ...fullResumeData,
//         finalize: finalize,
//       };
//       setFullResumeData(updatedFullData);
//       setLocalStorage("fullResumeData", updatedFullData);
//     }
//   }, [finalize]);

//   const saveToAPI = async (finalizeData: typeof finalize) => {
//     if (!contactId) {
//       console.error("Contact ID is required");
//       return false;
//     }

//     const currentDataString = JSON.stringify(finalizeData);
//     if (currentDataString === lastSavedData) {
//       return true;
//     }

//     setIsSaving(true);

//     try {
//       const cleanedSkillsData = Object.fromEntries(
//         Object.entries(finalizeData).map(([section, skills]) => [
//           section,
//           (skills as any[])?.filter(
//             (skill) =>
//               (skill?.name && skill.name.trim() !== "") ||
//               (skill?.language && skill.language.trim() !== ""),
//           ) || [],
//         ]),
//       );

//       const formData = {
//         skillsData: cleanedSkillsData,
//         templateId: chosenResumeDetails?.id,
//       };

//       const response = await axios.post(
//         `${API_URL}/api/finalize-resume/update`,
//         formData,
//         { params: { contactId: contactId } },
//       );

//       setLastSavedData(currentDataString);
//       return true;
//     } catch (err: any) {
//       console.error("Error saving finalize data:", err);
//       toast.error("Failed to save additional information!");
//       return false;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const debouncedSave = useCallback(
//     (finalizeData: typeof finalize) => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//       saveTimeoutRef.current = setTimeout(() => {
//         saveToAPI(finalizeData);
//       }, 1000);
//     },
//     [contactId, lastSavedData],
//   );

//   const [deletePopup, setDeletePopup] = useState<DeletePopupState>({
//     show: false,
//     section: null,
//     heading: null,
//   });

//   const [collapseStates, setCollapseStates] = useState<Record<string, boolean>>(
//     () => {
//       const initialState: Record<string, boolean> = {};
//       sections.forEach((section) => {
//         initialState[section.title] = true;
//       });
//       return initialState;
//     },
//   );

//   const fetchSkill = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/finalize-resume/get-finalize-resume/${contactId}`,
//       );
//       const experienceList = response.data?.resume?.[0]?.skillsData || {};

//       const formattedData: FinalizeType = {
//         languages: experienceList.languages || [],
//         certificationsAndLicenses:
//           experienceList.certificationsAndLicenses || [],
//         hobbiesAndInterests: experienceList.hobbiesAndInterests || [],
//         awardsAndHonors: experienceList.awardsAndHonors || [],
//         websitesAndSocialMedia: experienceList.websitesAndSocialMedia || [],
//         references: experienceList.references || [],
//         customSection: experienceList.customSection || [],
//       };

//       setFinalize(formattedData);
//       setLastSavedData(JSON.stringify(formattedData));
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

//   useEffect(() => {
//     document.body.style.overflow = deletePopup.show ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [deletePopup.show]);

//   const handleToggleSection = (title: string) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [title]: !prev[title],
//     }));
//   };

//   const confirmDeleteSection = (title: keyof FinalizeType, heading: string) => {
//     setDeletePopup({ show: true, section: title, heading: heading });
//   };

//   const deleteSection = () => {
//     const title = deletePopup.section;
//     if (!title) return;

//     setFinalize((prev) => {
//       const updated = {
//         ...prev,
//         [title]: [],
//       };
//       debouncedSave(updated);
//       return updated;
//     });

//     setOpenSections((prev) => ({ ...prev, [title]: false }));
//     setDeletePopup({ show: false, section: null, heading: null });
//   };

//   const cancelDelete = () =>
//     setDeletePopup({ show: false, section: null, heading: null });

//   const toggleCollapse = (section: string) => {
//     setCollapseStates((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const addSkill = (section: keyof FinalizeType) => {
//     const singleEntrySections: (keyof FinalizeType)[] = [
//       "certificationsAndLicenses",
//       "awardsAndHonors",
//       "references",
//     ];

//     if (
//       singleEntrySections.includes(section) &&
//       (finalize[section] as any[])?.length > 0
//     )
//       return;

//     setFinalize((prev) => {
//       let newItem: any = { id: Date.now() };

//       // Define structure based on section type
//       if (section === "languages") {
//         newItem = { id: Date.now(), language: "", proficiency: "Intermediate" };
//       } else if (section === "websitesAndSocialMedia") {
//         newItem = { id: Date.now(), platform: "", url: "" };
//       } else if (section === "customSection") {
//         newItem = { id: Date.now(), name: "", description: "" };
//       } else {
//         newItem = { id: Date.now(), name: "" };
//       }

//       const updated = {
//         ...prev,
//         [section]: [...((prev[section] as any[]) || []), newItem],
//       };
//       debouncedSave(updated);
//       return updated;
//     });

//     setOpenSections((prev) => ({ ...prev, [section]: true }));
//   };

//   const deleteSkill = (section: keyof FinalizeType, skillId: number) => {
//     setFinalize((prev) => {
//       const updated = {
//         ...prev,
//         [section]:
//           (prev[section] as any[])?.filter((s) => s.id !== skillId) || [],
//       };
//       debouncedSave(updated);
//       return updated;
//     });
//   };

//   const handleSkillChange = (
//     section: keyof FinalizeType,
//     skillId: number,
//     value: string,
//     type: string = "name",
//   ) => {
//     setFinalize((prev) => {
//       const updated = {
//         ...prev,
//         [section]:
//           (prev[section] as any[])?.map((s) =>
//             s.id === skillId
//               ? {
//                   ...s,
//                   [type]: value,
//                 }
//               : s,
//           ) || [],
//       };
//       debouncedSave(updated);
//       return updated;
//     });
//   };

//   const canAddNew = (sectionTitle: keyof FinalizeType) => {
//     const list = finalize[sectionTitle] as any[] | undefined;
//     const singleEntrySections: (keyof FinalizeType)[] = [
//       "certificationsAndLicenses",
//       "awardsAndHonors",
//       "references",
//     ];

//     if (singleEntrySections.includes(sectionTitle)) {
//       return !list || list.length === 0;
//     }

//     return true;
//   };

//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [score, setScore] = useState(0);
//   const [atsVerdict, setAtsVerdict] = useState("");
//   const [progress, setProgress] = useState(0);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [tipsClicked, setTipsClicked] = useState(false);

//   const checkATSScore = async () => {
//     setLoading(true);

//     const formData = {
//       resume_data: {
//         name: `${contact?.firstName || ""} ${contact?.lastName || ""}`.trim(),
//         email: contact?.email || "",
//         phone: contact?.phone || "",
//         summary: htmlRemovedSummary,
//         skills: filteredSkills,
//         experience: filteredExperiences,
//         education: filteredEducation,
//       },
//     };

//     try {
//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/ats/scan`,
//         formData,
//       );

//       setScore(response.data.ats_score);
//       setAtsVerdict(response?.data?.summary?.ats_verdict);
//       setProgress(0);
//       setLoading(false);
//       setShowPopup(true);

//       return true;
//     } catch (err: any) {
//       toast.error("Something went wrong");
//       console.error("Error sending message:", err);
//       setLoading(false);
//       return false;
//     }
//   };

//   useEffect(() => {
//     if (!showPopup) return;

//     let current = 0;
//     const timer = setInterval(() => {
//       current += 1;
//       if (current >= score) {
//         current = score;
//         clearInterval(timer);

//         if (score >= 80) {
//           setShowConfetti(true);
//         }
//       }
//       setProgress(current);
//     }, 15);

//     return () => clearInterval(timer);
//   }, [score, showPopup]);

//   // Proficiency levels for languages
//   const proficiencyLevels = [
//     "Native",
//     "Fluent",
//     "Professional Working",
//     "Limited Working",
//     "Elementary",
//   ];

//   // Social media platforms for websitesAndSocialMedia section
//   const socialMediaPlatforms = [
//     "LinkedIn",
//     "Twitter/X",
//     "GitHub",
//     "Portfolio Website",
//     "Personal Blog",
//     "Medium",
//     "Dev.to",
//     "Stack Overflow",
//     "Behance",
//     "Dribbble",
//     "Instagram",
//     "YouTube",
//     "Facebook",
//     "Other",
//   ];

//   // Editor header template
//   const editorHeaderTemplate = (
//     <div className="flex gap-1 p-2 flex-wrap items-center bg-gray-50 border-b border-gray-200">
//       <button type="button" className="ql-bold p-1.5 hover:bg-gray-200 rounded transition">B</button>
//       <button type="button" className="ql-italic p-1.5 hover:bg-gray-200 rounded transition">I</button>
//       <button type="button" className="ql-underline p-1.5 hover:bg-gray-200 rounded transition">U</button>
//       <button type="button" className="ql-list p-1.5 hover:bg-gray-200 rounded transition" value="ordered">1.</button>
//       <button type="button" className="ql-list p-1.5 hover:bg-gray-200 rounded transition" value="bullet">•</button>
//       <button type="button" className="ql-clean p-1.5 hover:bg-gray-200 rounded transition">⌫</button>
//     </div>
//   );

//   return (
//     <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50/40">
//       {/* Premium Background Decoration */}
//       {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
//         <div className="absolute -bottom-40 -left-40 w-64 sm:w-96 h-64 sm:h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-indigo-50 rounded-full filter blur-3xl opacity-30"></div>

//         <div
//           className="absolute inset-0 opacity-20"
//           style={{
//             backgroundImage: `
//               linear-linear(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px),
//               linear-linear(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
//             `,
//             backgroundSize: "50px 50px",
//           }}
//         />
//       </div> */}

//       {/* Sticky Stepper */}
//       <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
//         <Stepper />
//       </div>

//       {/* Scrollable Content Area */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 lg:py-10">
//           {/* Header Section */}
//           <div className="text-center mb-6 sm:mb-8">

//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
//               Additional Information
//             </h1>

//             <p className="text-gray-500 text-sm max-w-md mx-auto">
//               Add languages, certifications, awards, hobbies, and more to
//               enhance your resume
//             </p>

//             <button
//               onClick={() => setTipsClicked(true)}
//               className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
//             >
//               <FaRegLightbulb className="w-3 h-3" />
//               <span>Additional Info Tips</span>
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
//                       Extra Sections
//                     </h2>
//                     <p className="text-xs sm:text-sm text-gray-500">
//                       Add optional information to stand out
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
//               {/* Open Sections */}
//               <div className="space-y-4">
//                 {sections.map(
//                   (section) =>
//                     openSections[section.title] && (
//                       <div key={section.title} className="space-y-4">
//                         <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
//                           {/* Header */}
//                           <div
//                             className="flex justify-between items-center cursor-pointer p-4 group hover:bg-gray-50/50 transition-all duration-300"
//                             onClick={() => toggleCollapse(section.title)}
//                           >
//                             <div className="flex gap-3 items-center">
//                               <div className="p-2 bg-indigo-100 rounded-xl">
//                                 {section.icon}
//                               </div>
//                               <div>
//                                 <div className="text-gray-800 font-semibold text-sm group-hover:text-indigo-600 transition-colors">
//                                   {section.title === "customSection"
//                                     ? "Custom Section"
//                                     : section.heading}
//                                 </div>
//                                 <div className="text-gray-500 text-xs mt-0.5 group-hover:text-indigo-600/70 transition-colors">
//                                   {section.description}
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="flex gap-2 items-center">
//                               <motion.div
//                                 animate={{
//                                   rotate: collapseStates[section.title]
//                                     ? 180
//                                     : 0,
//                                 }}
//                                 transition={{ duration: 0.3 }}
//                                 className="text-gray-400 group-hover:text-indigo-600 transition-colors"
//                               >
//                                 <FaChevronDown className="w-4 h-4" />
//                               </motion.div>
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   confirmDeleteSection(
//                                     section.title,
//                                     section.heading,
//                                   );
//                                 }}
//                                 className="p-1.5 rounded-lg bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
//                                 type="button"
//                               >
//                                 <FaTrash className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>

//                           {/* Collapsible Content */}
//                           <div
//                             className={`transition-all duration-500 overflow-hidden ${
//                               collapseStates[section.title]
//                                 ? "max-h-[800px] opacity-100"
//                                 : "max-h-0 opacity-0"
//                             }`}
//                           >
//                             <div className="p-4 space-y-4 border-t border-gray-100">
//                               {(finalize[section.title] as any[])?.map(
//                                 (item: any, index) => (
//                                   <div
//                                     key={index}
//                                     className="flex justify-between items-start gap-3 flex-col sm:flex-row"
//                                   >
//                                     {/* Languages Section */}
//                                     {section.title === "languages" && (
//                                       <div className="w-full space-y-4">
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                           <div>
//                                             <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
//                                               Language
//                                             </label>
//                                             <input
//                                               type="text"
//                                               value={item.language || ""}
//                                               onChange={(e) =>
//                                                 handleSkillChange(
//                                                   section.title,
//                                                   item.id,
//                                                   e.target.value,
//                                                   "language",
//                                                 )
//                                               }
//                                               placeholder="e.g., English, Spanish, French"
//                                               className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                                             />
//                                           </div>
//                                           <div>
//                                             <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
//                                               Proficiency Level
//                                             </label>
//                                             <select
//                                               value={item.proficiency || "Intermediate"}
//                                               onChange={(e) =>
//                                                 handleSkillChange(
//                                                   section.title,
//                                                   item.id,
//                                                   e.target.value,
//                                                   "proficiency",
//                                                 )
//                                               }
//                                               className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                                             >
//                                               {proficiencyLevels.map((level) => (
//                                                 <option key={level} value={level}>
//                                                   {level}
//                                                 </option>
//                                               ))}
//                                             </select>
//                                           </div>
//                                         </div>
//                                         <div className="flex justify-end">
//                                           <button
//                                             onClick={() =>
//                                               deleteSkill(section.title, item.id)
//                                             }
//                                             className="p-1.5 rounded-lg bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
//                                           >
//                                             <FaTrash className="w-4 h-4" />
//                                           </button>
//                                         </div>
//                                       </div>
//                                     )}

//                                     {/* Certifications & Licenses */}
//                                     {section.title ===
//                                       "certificationsAndLicenses" && (
//                                       <div className="w-full">
//                                         <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
//                                           Certification Details
//                                         </label>
//                                         <Editor
//                                           className="rounded-lg bg-white border border-gray-200 overflow-hidden"
//                                           value={item.name || ""}
//                                           headerTemplate={editorHeaderTemplate}
//                                           onTextChange={(e: any) =>
//                                             handleSkillChange(
//                                               section.title,
//                                               item.id,
//                                               e.htmlValue,
//                                             )
//                                           }
//                                           style={{
//                                             height: "140px",
//                                             minHeight: "140px",
//                                             background: "white",
//                                           }}
//                                         />
//                                         <div className="flex justify-end mt-3">
//                                           <button
//                                             onClick={() =>
//                                               deleteSkill(section.title, item.id)
//                                             }
//                                             className="p-1.5 rounded-lg bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
//                                           >
//                                             <FaTrash className="w-4 h-4" />
//                                           </button>
//                                         </div>
//                                       </div>
//                                     )}

//                                     {/* Websites & Social Media */}
//                                     {section.title ===
//                                       "websitesAndSocialMedia" && (
//                                       <div className="w-full space-y-4">
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                           <div>
//                                             <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
//                                               Platform
//                                             </label>
//                                             <select
//                                               value={item.platform || ""}
//                                               onChange={(e) =>
//                                                 handleSkillChange(
//                                                   section.title,
//                                                   item.id,
//                                                   e.target.value,
//                                                   "platform",
//                                                 )
//                                               }
//                                               className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                                             >
//                                               <option value="">Select Platform</option>
//                                               {socialMediaPlatforms.map(
//                                                 (platform) => (
//                                                   <option
//                                                     key={platform}
//                                                     value={platform}
//                                                   >
//                                                     {platform}
//                                                   </option>
//                                                 ),
//                                               )}
//                                             </select>
//                                           </div>
//                                           <div>
//                                             <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
//                                               URL
//                                             </label>
//                                             <input
//                                               type="url"
//                                               value={item.url || ""}
//                                               onChange={(e) =>
//                                                 handleSkillChange(
//                                                   section.title,
//                                                   item.id,
//                                                   e.target.value,
//                                                   "url",
//                                                 )
//                                               }
//                                               placeholder="https://..."
//                                               className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                                             />
//                                           </div>
//                                         </div>
//                                         <div className="flex justify-end">
//                                           <button
//                                             onClick={() =>
//                                               deleteSkill(section.title, item.id)
//                                             }
//                                             className="p-1.5 rounded-lg bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
//                                           >
//                                             <FaTrash className="w-4 h-4" />
//                                           </button>
//                                         </div>
//                                       </div>
//                                     )}

//                                     {/* Awards & Honors */}
//                                     {section.title === "awardsAndHonors" && (
//                                       <div className="w-full">
//                                         <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
//                                           Awards & Honors Details
//                                         </label>
//                                         <Editor
//                                           className="rounded-lg bg-white border border-gray-200 overflow-hidden"
//                                           value={item.name || ""}
//                                           headerTemplate={editorHeaderTemplate}
//                                           onTextChange={(e: any) =>
//                                             handleSkillChange(
//                                               section.title,
//                                               item.id,
//                                               e.htmlValue,
//                                             )
//                                           }
//                                           style={{
//                                             height: "140px",
//                                             minHeight: "140px",
//                                             background: "white",
//                                           }}
//                                         />
//                                         <div className="flex justify-end mt-3">
//                                           <button
//                                             onClick={() =>
//                                               deleteSkill(section.title, item.id)
//                                             }
//                                             className="p-1.5 rounded-lg bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
//                                           >
//                                             <FaTrash className="w-4 h-4" />
//                                           </button>
//                                         </div>
//                                       </div>
//                                     )}

//                                     {/* Hobbies & Interests */}
//                                     {section.title === "hobbiesAndInterests" && (
//                                       <div className="w-full">
//                                         <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
//                                           {section.heading}
//                                         </label>
//                                         <div className="flex items-center gap-3">
//                                           <input
//                                             type="text"
//                                             value={item.name || ""}
//                                             onChange={(e) =>
//                                               handleSkillChange(
//                                                 section.title,
//                                                 item.id,
//                                                 e.target.value,
//                                               )
//                                             }
//                                             placeholder={`Enter ${section.heading.toLowerCase()}`}
//                                             className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                                           />
//                                           <button
//                                             onClick={() =>
//                                               deleteSkill(section.title, item.id)
//                                             }
//                                             className="p-2 rounded-lg bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
//                                           >
//                                             <FaTrash className="w-4 h-4" />
//                                           </button>
//                                         </div>
//                                       </div>
//                                     )}

//                                     {/* Custom Section */}
//                                     {section.title === "customSection" && (
//                                       <div className="w-full space-y-4">
//                                         <div>
//                                           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
//                                             Section Name
//                                           </label>
//                                           <input
//                                             type="text"
//                                             value={item.name || ""}
//                                             onChange={(e) =>
//                                               handleSkillChange(
//                                                 section.title,
//                                                 item.id,
//                                                 e.target.value,
//                                                 "name",
//                                               )
//                                             }
//                                             placeholder="Enter section name"
//                                             className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                                           />
//                                         </div>
//                                         <div>
//                                           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
//                                             Description
//                                           </label>
//                                           <Editor
//                                             className="rounded-lg bg-white border border-gray-200 overflow-hidden"
//                                             value={item.description || ""}
//                                             headerTemplate={editorHeaderTemplate}
//                                             onTextChange={(e: any) =>
//                                               handleSkillChange(
//                                                 section.title,
//                                                 item.id,
//                                                 e.htmlValue,
//                                                 "description",
//                                               )
//                                             }
//                                             style={{
//                                               height: "140px",
//                                               minHeight: "140px",
//                                               background: "white",
//                                             }}
//                                           />
//                                         </div>
//                                         <div className="flex justify-end">
//                                           <button
//                                             onClick={() =>
//                                               deleteSkill(section.title, item.id)
//                                             }
//                                             className="p-1.5 rounded-lg bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
//                                           >
//                                             <FaTrash className="w-4 h-4" />
//                                           </button>
//                                         </div>
//                                       </div>
//                                     )}
//                                   </div>
//                                 ),
//                               )}

//                               {/* Add Button */}
//                               {canAddNew(section.title) && (
//                                 <button
//                                   onClick={() => addSkill(section.title)}
//                                   className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition-all duration-200 text-sm"
//                                   type="button"
//                                 >
//                                   <FaPlus className="w-4 h-4" />
//                                   Add {section.heading}
//                                 </button>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ),
//                 )}

//                 {/* Available Sections Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
//                   {sections.map(
//                     (section, idx) =>
//                       !openSections[section.title] && (
//                         <button
//                           key={idx}
//                           onClick={() => handleToggleSection(section.title)}
//                           className="group p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 text-left"
//                           type="button"
//                         >
//                           <div className="flex items-center justify-between gap-3">
//                             <div className="flex items-center gap-3">
//                               <div className="p-2 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition-all">
//                                 {section.icon}
//                               </div>
//                               <div>
//                                 <div className="font-semibold text-gray-800 text-sm group-hover:text-indigo-600 transition-colors">
//                                   {section.heading}
//                                 </div>
//                                 <div className="text-xs text-gray-500 mt-0.5">
//                                   {section.description}
//                                 </div>
//                               </div>
//                             </div>
//                             <FaPlus className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
//                           </div>
//                         </button>
//                       ),
//                   )}
//                 </div>
//               </div>

//               {/* ATS Score Button */}
//               <div className="mt-8 pt-4 border-t border-gray-100">
//                 <button
//                   onClick={checkATSScore}
//                   className="w-full sm:w-auto px-6 py-3 bg-linear-to-r from-indigo-600 to-indigo-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm flex items-center justify-center gap-2"
//                   type="button"
//                 >
//                   <IoSparkles className="w-4 h-4" />
//                   Check Your ATS Score
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sticky Footer Buttons */}
//       <div className="sticky bottom-0 z-20 bg-white/80 backdrop-blur-md border-t border-gray-100 shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
//           <div className="flex justify-between items-center gap-3">
//             <button
//               className="text-xs sm:text-sm font-medium text-gray-500 hover:text-indigo-600 transition flex items-center gap-1 cursor-pointer"
//               onClick={() => router.push("/resume-details/summary")}
//             >
//               ← Back to Summary
//             </button>
//             <button
//               className="px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-semibold  bg-linear-to-r from-indigo-600 to-indigo-500 text-white  rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer"
//               onClick={() => {
//                 if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
//                 saveToAPI(finalize).then(() => router.push("/download-resume"));
//               }}
//             >
//               <span>Download Resume</span>
//               <IoArrowForward className="w-3 h-3 sm:w-4 sm:h-4" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Tips Modal */}
//       {tipsClicked && (
//         <AnimatePresence>
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div
//               className="absolute inset-0 backdrop-blur-md bg-black/50"
//               onClick={() => setTipsClicked(false)}
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
//                   <h3 className="text-lg font-bold text-white">
//                     Additional Info Tips
//                   </h3>
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
//                     Add relevant certifications, languages, and social profiles
//                     that showcase your expertise
//                   </p>
//                 </div>

//                 <div className="space-y-3">
//                   <h4 className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
//                     Best Practices
//                   </h4>
//                   {[
//                     "Add languages with accurate proficiency levels",
//                     "Include relevant certifications only",
//                     "Share active social/professional profiles",
//                     "Add awards that highlight achievements",
//                     "Keep custom sections focused and concise",
//                   ].map((tip, idx) => (
//                     <div key={idx} className="flex items-start gap-2">
//                       <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5" />
//                       <span className="text-xs text-gray-700">{tip}</span>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-4 pt-3 border-t border-gray-100">
//                   <button
//                     onClick={() => setTipsClicked(false)}
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

//       {/* Delete Confirmation Popup */}
//       {deletePopup.show && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
//             <div className="bg-linear-to-r from-indigo-600 to-indigo-500 px-5 py-4">
//               <div className="flex items-center gap-2">
//                 <div className="p-1.5 bg-white/20 rounded-lg">
//                   <FaTrash className="w-5 h-5 text-white" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-white">
//                   Delete Section
//                 </h3>
//               </div>
//             </div>

//             <div className="p-5 text-center">
//               <p className="text-gray-600 text-sm mb-6">
//                 Are you sure you want to delete "{deletePopup.heading}"? This
//                 action cannot be undone.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   onClick={cancelDelete}
//                   className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                   type="button"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={deleteSection}
//                   className="flex-1 px-4 py-2.5 bg-linear-to-r from-red-500 to-red-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all text-sm"
//                   type="button"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Loader */}
//       {loading && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl shadow-2xl p-6 text-center max-w-sm w-full">
//             <div className="w-12 h-12 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//             <h3 className="font-semibold text-gray-800 text-base mb-1">
//               Analyzing Resume...
//             </h3>
//             <p className="text-gray-500 text-sm">This may take a few seconds</p>
//           </div>
//         </div>
//       )}

//       {/* ATS Result Modal */}
//       <AnimatePresence mode="wait">
//         {showPopup && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
//               onClick={() => {
//                 setShowPopup(false);
//                 setShowConfetti(false);
//               }}
//             />

//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
//             >
//               <motion.div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden pointer-events-auto">
//                 <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-5 py-4">
//                   <div className="flex items-center gap-2">
//                     <div className="p-1.5 bg-white/20 rounded-lg">
//                       <svg
//                         className="w-5 h-5 text-white"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={1.5}
//                           d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                         />
//                       </svg>
//                     </div>
//                     <h3 className="text-lg font-bold text-white">
//                       ATS Score Analysis
//                     </h3>
//                   </div>
//                 </div>

//                 <div className="p-6 text-center">
//                   <div className="relative w-36 h-36 mx-auto mb-6">
//                     <CircularProgressbar
//                       value={progress}
//                       text={`${progress}%`}
//                       styles={buildStyles({
//                         pathColor:
//                           progress >= 80
//                             ? "#10b981"
//                             : progress >= 60
//                               ? "#f59e0b"
//                               : "#ef4444",
//                         textColor:
//                           progress >= 80
//                             ? "#10b981"
//                             : progress >= 60
//                               ? "#f59e0b"
//                               : "#ef4444",
//                         trailColor: "#f3f4f6",
//                         pathTransitionDuration: 1,
//                         textSize: "24px",
//                         strokeLinecap: "round",
//                       })}
//                     />
//                   </div>

//                   <p className="text-gray-600 text-sm mb-5">{atsVerdict}</p>

//                   <button
//                     onClick={() => {
//                       setShowPopup(false);
//                       window.open("/ats-checker");
//                     }}
//                     className="w-full mb-3 py-2.5 bg-indigo-50 text-indigo-600 font-medium rounded-lg hover:bg-indigo-100 transition-all text-sm flex items-center justify-center gap-2"
//                   >
//                     Go to Advanced ATS Checker
//                     <IoArrowForward className="w-4 h-4" />
//                   </button>

//                   <button
//                     onClick={() => {
//                       setShowPopup(false);
//                       setShowConfetti(false);
//                     }}
//                     className="w-full py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all text-sm"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default FinalizeForm;

"use client";
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { CreateContext } from "@/app/context/CreateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import {
  FaCertificate,
  FaHiking,
  FaAward,
  FaGlobe,
  FaPlus,
  FaChevronDown,
  FaTrash,
  FaRegLightbulb,
  FaStar,
  FaGem,
} from "react-icons/fa";
import { BsFileEarmarkText } from "react-icons/bs";
import { FiCheckCircle, FiShield, FiXCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";
import {
  Finalize as FinalizeType,
  SimpleSkill,
  SkillCategory,
  Template,
} from "@/app/types/context.types";
import { getLocalStorage, setLocalStorage } from "@/app/utils";
import { API_URL } from "@/app/config/api";
import { IoArrowForward, IoDiamondOutline, IoSparkles } from "react-icons/io5";
import { TipsModal } from "@/app/components/resume";

// Define interfaces
interface Section {
  title: keyof FinalizeType;
  heading: string;
  icon: React.ReactNode;
  description: string;
}

interface DeletePopupState {
  show: boolean;
  section: keyof FinalizeType | null;
  heading: string | null;
}

const sections: Section[] = [
  {
    title: "certificationsAndLicenses",
    heading: "Certifications & Licenses",
    icon: <FaCertificate className="w-5 h-5 text-indigo-600" />,
    description: "Add credentials that back up your expertise.",
  },
  {
    title: "hobbiesAndInterests",
    heading: "Hobbies & Interests",
    icon: <FaHiking className="w-5 h-5 text-indigo-600" />,
    description: "Include activities relevant to your job or industry.",
  },
  {
    title: "awardsAndHonors",
    heading: "Awards & Honors",
    icon: <FaAward className="w-5 h-5 text-indigo-600" />,
    description: "Share achievements and milestones you're proud of.",
  },
  {
    title: "websitesAndSocialMedia",
    heading: "Websites & Social Media",
    icon: <FaGlobe className="w-5 h-5 text-indigo-600" />,
    description:
      "Share your portfolio, blog, LinkedIn, or other related websites.",
  },
  {
    title: "customSection",
    heading: "Custom Section",
    icon: <BsFileEarmarkText className="w-5 h-5 text-indigo-600" />,
    description:
      "Create a custom section for any extra info you'd like to add.",
  },
];

// Dynamically import Editor to avoid SSR issues
const Editor = dynamic(
  () => import("primereact/editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="bg-gray-50 rounded-xl border border-gray-200 h-32 flex items-center justify-center">
        <div className="animate-pulse text-gray-400 text-sm">
          Loading editor...
        </div>
      </div>
    ),
  },
);

const FinalizeForm = () => {
  const UseContext = useContext(CreateContext);
  const router = useRouter();

  const {
    contact,
    summary = "",
    skills = [],
    experiences = [],
    education = [],
    finalize = {},
    setFinalize = () => {},
    fullResumeData,
    setFullResumeData,
  } = UseContext || {};

  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedData, setLastSavedData] = useState<string>("");

  const contactId = UseContext?.contact._id || UseContext?.contact.contactId;

  const stripHtml = (html: string) => {
    return html?.replace(/<\/?[^>]+(>|$)/g, "") || "";
  };

  const textEditorTextsFormat = (text: string) => {
    return text
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/•/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .split(".")
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const htmlRemovedSummary = stripHtml(summary);

  const filteredSkills = skills?.length
    ? "title" in skills[0]
      ? (skills as SkillCategory[]).flatMap((c) => c.skills.map((s) => s.name))
      : (skills as SimpleSkill[]).map((s) => s.name)
    : [];

  const filteredExperiences = experiences.map((item) => ({
    title: item?.jobTitle || "",
    company: item?.employer || "",
    bullets: textEditorTextsFormat(item?.text || ""),
  }));
  const filteredEducation = education.map((item) => ({
    degree: item?.degree || "",
    educationDescription: textEditorTextsFormat(item?.text || ""),
  }));

  const chosenResumeDetails = getLocalStorage<Template>("chosenTemplate");

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const saveToAPI = async (finalizeData: typeof finalize) => {
    if (!contactId) {
      console.error("Contact ID is required");
      return false;
    }

    const currentDataString = JSON.stringify(finalizeData);
    if (currentDataString === lastSavedData) {
      return true;
    }

    setIsSaving(true);

    try {
      const cleanedSkillsData = Object.fromEntries(
        Object.entries(finalizeData).map(([section, skills]) => [
          section,
          (skills as any[])?.filter(
            (skill) => skill?.name && skill.name.trim() !== "",
          ) || [],
        ]),
      );

      const formData = {
        skillsData: cleanedSkillsData,
        templateId: chosenResumeDetails?.id,
      };

      const response = await axios.post(
        `${API_URL}/api/finalize-resume/update`,
        formData,
        { params: { contactId: contactId } },
      );

      setLastSavedData(currentDataString);
      return true;
    } catch (err: any) {
      console.error("Error saving finalize data:", err);
      toast.error("Failed to save additional information!");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const [deletePopup, setDeletePopup] = useState<DeletePopupState>({
    show: false,
    section: null,
    heading: null,
  });

  const [collapseStates, setCollapseStates] = useState<Record<string, boolean>>(
    () => {
      const initialState: Record<string, boolean> = {};
      sections.forEach((section) => {
        initialState[section.title] = true;
      });
      return initialState;
    },
  );

  const fetchSkill = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/finalize-resume/get-finalize-resume/${contactId}`,
      );
      const experienceList = response.data?.resume?.[0]?.skillsData || {};

      const formattedData: FinalizeType = {
        languages: experienceList.languages || [],
        certificationsAndLicenses:
          experienceList.certificationsAndLicenses || [],
        hobbiesAndInterests: experienceList.hobbiesAndInterests || [],
        awardsAndHonors: experienceList.awardsAndHonors || [],
        websitesAndSocialMedia: experienceList.websitesAndSocialMedia || [],
        references: experienceList.references || [],
        customSection: experienceList.customSection || [],
      };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = deletePopup.show ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [deletePopup.show]);

  const handleToggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const confirmDeleteSection = (title: keyof FinalizeType, heading: string) => {
    setDeletePopup({ show: true, section: title, heading: heading });
  };

  const deleteSection = () => {
    const title = deletePopup.section;
    if (!title) return;

    setFinalize((prev) => {
      const updated = {
        ...prev,
        [title]: (prev[title] as any[])?.map((item) => {
          const clearedItem: any = {};
          Object.keys(item).forEach((key) => {
            clearedItem[key] = typeof item[key] === "number" ? 0 : "";
          });
          return clearedItem;
        }),
      };
      return updated;
    });

    setOpenSections((prev) => ({ ...prev, [title]: false }));
    setDeletePopup({ show: false, section: null, heading: null });
  };

  const cancelDelete = () =>
    setDeletePopup({ show: false, section: null, heading: null });

  const toggleCollapse = (section: string) => {
    setCollapseStates((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const addSkill = (section: keyof FinalizeType) => {
    const singleEntrySections: (keyof FinalizeType)[] = [
      "certificationsAndLicenses",
      "awardsAndHonors",
      "references",
    ];

    if (
      singleEntrySections.includes(section) &&
      (finalize[section] as any[])?.length > 0
    )
      return;

    setFinalize((prev) => {
      const updated = {
        ...prev,
        [section]: [
          ...((prev[section] as any[]) || []),
          { id: Date.now(), name: "", level: 3 },
        ],
      };
      return updated;
    });

    setOpenSections((prev) => ({ ...prev, [section]: true }));
  };

  const deleteSkill = (section: keyof FinalizeType, skillId: number) => {
    setFinalize((prev) => {
      const updated = {
        ...prev,
        [section]:
          (prev[section] as any[])?.filter((s) => s.id !== skillId) || [],
      };
      return updated;
    });
  };

  const handleSkillChange = (
    section: keyof FinalizeType,
    skillId: number,
    value: string,
    type: string = "name",
  ) => {
    setFinalize((prev) => {
      const updated = {
        ...prev,
        [section]:
          (prev[section] as any[])?.map((s) =>
            s.id === skillId
              ? {
                  ...s,
                  [type]: value,
                }
              : s,
          ) || [],
      };
      return updated;
    });
  };

  const canAddNew = (sectionTitle: keyof FinalizeType) => {
    const list = finalize[sectionTitle] as any[] | undefined;
    const singleEntrySections: (keyof FinalizeType)[] = [
      "certificationsAndLicenses",
      "awardsAndHonors",
      "references",
    ];

    if (singleEntrySections.includes(sectionTitle)) {
      return !list || list.length === 0;
    }

    if (!list || list.length === 0) return true;
    const last = list[list.length - 1];
    return last.name?.trim() !== "";
  };

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [score, setScore] = useState(0);
  const [atsVerdict, setAtsVerdict] = useState("");
  const [progress, setProgress] = useState(0);
  const [tipsClicked, setTipsClicked] = useState(false);

  const checkATSScore = async () => {
    setLoading(true);

    const formData = {
      resume_data: {
        name: `${contact?.firstName || ""} ${contact?.lastName || ""}`.trim(),
        email: contact?.email || "",
        phone: contact?.phone || "",
        summary: htmlRemovedSummary,
        skills: filteredSkills,
        experience: filteredExperiences,
        education: filteredEducation,
      },
    };

    try {
      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/ats/scan`,
        formData,
      );

      setScore(response.data.ats_score);
      setAtsVerdict(response?.data?.summary?.ats_verdict);
      setProgress(0);
      setLoading(false);
      setShowPopup(true);

      return true;
    } catch (err: any) {
      toast.error("Something went wrong");
      console.error("Error sending message:", err);
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    if (!showPopup) return;

    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      if (current >= score) {
        current = score;
        clearInterval(timer);
      }
      setProgress(current);
    }, 15);

    return () => clearInterval(timer);
  }, [score, showPopup]);

  // Editor header template
  const editorHeaderTemplate = (
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
  );

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50/40">
      {/* Sticky Stepper */}
      {/* <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <Stepper />
      </div> */}

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto px-2  py-6 sm:py-8 lg:py-10">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 rounded-full text-indigo-700 text-xs font-semibold mb-3 shadow-sm">
              <IoSparkles className="w-3 h-3" />
              <span>STEP 7 OF 7</span>
              <IoSparkles className="w-3 h-3" />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Additional Information
            </h1>

            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Add certifications, awards, hobbies, and more to enhance your
              resume
            </p>

            <button
              onClick={() => setTipsClicked(true)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <FaRegLightbulb className="w-3 h-3" />
              <span>Additional Info Tips</span>
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
                      Extra Sections
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Add optional information to stand out
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
              {/* Open Sections */}
              <div className="space-y-4">
                {sections.map(
                  (section) =>
                    openSections[section.title] && (
                      <div key={section.title} className="space-y-4">
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                          {/* Header */}
                          <div
                            className="flex justify-between items-center cursor-pointer p-4 group hover:bg-gray-50/50 transition-all duration-300"
                            onClick={() => toggleCollapse(section.title)}
                          >
                            <div className="flex gap-3 items-center">
                              <div className="p-2 bg-indigo-100 rounded-xl">
                                {section.icon}
                              </div>
                              <div>
                                <div className="text-gray-800 font-semibold text-sm group-hover:text-indigo-600 transition-colors">
                                  {section.title === "customSection"
                                    ? "Custom Section"
                                    : section.heading}
                                </div>
                                <div className="text-gray-500 text-xs mt-0.5 group-hover:text-indigo-600/70 transition-colors">
                                  {section.description}
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 items-center">
                              <motion.div
                                animate={{
                                  rotate: collapseStates[section.title]
                                    ? 180
                                    : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="text-gray-400 group-hover:text-indigo-600 transition-colors"
                              >
                                <FaChevronDown className="w-4 h-4" />
                              </motion.div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  confirmDeleteSection(
                                    section.title,
                                    section.heading,
                                  );
                                }}
                                className="p-1.5 rounded-lg bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                                type="button"
                              >
                                <FaTrash className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Collapsible Content */}
                          <div
                            className={`transition-all duration-500 overflow-hidden ${
                              collapseStates[section.title]
                                ? "max-h-200 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="p-4 space-y-4 border-t border-gray-100">
                              {(finalize[section.title] as any[])?.map(
                                (skill: any, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between items-start gap-3 flex-col sm:flex-row"
                                  >
                                    {section.title ===
                                      "certificationsAndLicenses" && (
                                      <div className="w-full">
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                                          Certification Details
                                        </label>
                                        <Editor
                                          className="rounded-lg bg-white border border-gray-200 overflow-hidden"
                                          value={skill.name || ""}
                                          headerTemplate={editorHeaderTemplate}
                                          onTextChange={(e: any) =>
                                            handleSkillChange(
                                              section.title,
                                              skill.id,
                                              e.htmlValue,
                                            )
                                          }
                                          style={{
                                            height: "140px",
                                            minHeight: "140px",
                                            background: "white",
                                          }}
                                        />
                                      </div>
                                    )}

                                    {section.title ===
                                      "websitesAndSocialMedia" && (
                                      <div className="w-full space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                          <div>
                                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                                              Website URL
                                            </label>
                                            <input
                                              type="text"
                                              value={skill.websiteUrl || ""}
                                              onChange={(e) =>
                                                handleSkillChange(
                                                  section.title,
                                                  skill.id,
                                                  e.target.value,
                                                  "websiteUrl",
                                                )
                                              }
                                              placeholder="https://example.com"
                                              className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                                              Social Media URL
                                            </label>
                                            <input
                                              type="text"
                                              value={skill.socialMedia || ""}
                                              onChange={(e) =>
                                                handleSkillChange(
                                                  section.title,
                                                  skill.id,
                                                  e.target.value,
                                                  "socialMedia",
                                                )
                                              }
                                              placeholder="https://linkedin.com/in/username"
                                              className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                                            />
                                          </div>
                                        </div>
                                        <div className="flex justify-end">
                                          <button
                                            onClick={() =>
                                              deleteSkill(
                                                section.title,
                                                skill.id,
                                              )
                                            }
                                            className="p-1.5 rounded-lg bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                          >
                                            <FaTrash className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    )}

                                    {section.title === "awardsAndHonors" && (
                                      <div className="w-full">
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                                          Awards & Honors Details
                                        </label>
                                        <Editor
                                          className="rounded-lg bg-white border border-gray-200 overflow-hidden"
                                          value={skill.name || ""}
                                          headerTemplate={editorHeaderTemplate}
                                          onTextChange={(e: any) =>
                                            handleSkillChange(
                                              section.title,
                                              skill.id,
                                              e.htmlValue,
                                            )
                                          }
                                          style={{
                                            height: "140px",
                                            minHeight: "140px",
                                            background: "white",
                                          }}
                                        />
                                      </div>
                                    )}

                                    {section.title ===
                                      "hobbiesAndInterests" && (
                                      <div className="w-full">
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                                          {section.heading}
                                        </label>
                                        <div className="flex items-center gap-3">
                                          <input
                                            type="text"
                                            value={skill.name || ""}
                                            onChange={(e) =>
                                              handleSkillChange(
                                                section.title,
                                                skill.id,
                                                e.target.value,
                                              )
                                            }
                                            placeholder={`Enter ${section.heading.toLowerCase()}`}
                                            className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                                          />
                                          <button
                                            onClick={() =>
                                              deleteSkill(
                                                section.title,
                                                skill.id,
                                              )
                                            }
                                            className="p-2 rounded-lg bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                          >
                                            <FaTrash className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    )}

                                    {section.title === "customSection" && (
                                      <div className="w-full space-y-4">
                                        <div>
                                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                                            Section Name
                                          </label>
                                          <input
                                            type="text"
                                            value={skill.name || ""}
                                            onChange={(e) =>
                                              handleSkillChange(
                                                section.title,
                                                skill.id,
                                                e.target.value,
                                                "name",
                                              )
                                            }
                                            placeholder="Enter section name"
                                            className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                                            Description
                                          </label>
                                          <Editor
                                            className="rounded-lg bg-white border border-gray-200 overflow-hidden"
                                            value={skill.description || ""}
                                            headerTemplate={
                                              editorHeaderTemplate
                                            }
                                            onTextChange={(e: any) =>
                                              handleSkillChange(
                                                section.title,
                                                skill.id,
                                                e.htmlValue,
                                                "description",
                                              )
                                            }
                                            style={{
                                              height: "140px",
                                              minHeight: "140px",
                                              background: "white",
                                            }}
                                          />
                                        </div>
                                        <div className="flex justify-end">
                                          <button
                                            onClick={() =>
                                              deleteSkill(
                                                section.title,
                                                skill.id,
                                              )
                                            }
                                            className="p-1.5 rounded-lg bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                          >
                                            <FaTrash className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ),
                              )}

                              {/* Add Button */}
                              {canAddNew(section.title) && (
                                <button
                                  onClick={() => addSkill(section.title)}
                                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition-all duration-200 text-sm"
                                  type="button"
                                >
                                  <FaPlus className="w-4 h-4" />
                                  Add {section.heading}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ),
                )}

                {/* Available Sections Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {sections.map(
                    (section, idx) =>
                      !openSections[section.title] && (
                        <button
                          key={idx}
                          onClick={() => handleToggleSection(section.title)}
                          className="group p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 text-left"
                          type="button"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition-all">
                                {section.icon}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800 text-sm group-hover:text-indigo-600 transition-colors">
                                  {section.heading}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {section.description}
                                </div>
                              </div>
                            </div>
                            <FaPlus className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                          </div>
                        </button>
                      ),
                  )}
                </div>
              </div>

              {/* ATS Score Button */}
              <div className="mt-8 pt-4 border-t border-gray-100">
                <button
                  onClick={checkATSScore}
                  className="w-full sm:w-auto px-6 py-3 bg-linear-to-r from-indigo-600 to-indigo-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm flex items-center justify-center gap-2"
                  type="button"
                >
                  <IoSparkles className="w-4 h-4" />
                  Check Your ATS Score
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
              onClick={() => router.push("/resume-details/summary")}
            >
              ← Back to Summary
            </button>
            <button
              className="px-4 sm:px-6 py-2 sm:py-2.5  bg-linear-to-r from-indigo-600 to-indigo-500 text-white t font-medium rounded-lg sm:rounded-xl shadow-md transition-all hover:shadow-indigo-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
              onClick={() => {
                saveToAPI(finalize).then(() => router.push("/download-resume"));
              }}
            >
              <span>Download Resume</span>
              <IoArrowForward className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tips Modal */}
     <TipsModal
  isOpen={tipsClicked}
  onClose={() => setTipsClicked(false)}
  title="Additional Info Tips"
  subtitle="Make your resume stand out"
  hasAI={false}
  proTip="Add relevant certifications and awards that showcase your expertise"
  bestPractices={[
    { tip: "Add relevant certifications only", example: "Pick certifications that matter for your job" },
    { tip: "Include awards that highlight achievements", example: "Employee of the Month, Best Performer" },
    { tip: "List hobbies that show useful skills", example: "Chess (strategy), Blogging (writing)" },
    { tip: "Keep custom sections short", example: "2-3 bullet points max" },
   
  ]}
  avoidList={[
    "Adding old or unused certifications",
    "Listing too many hobbies (keep it 3-4)",
    "Making custom sections too long",
  ]}
  customContent={
    <div className="bg-indigo-50 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <FiShield className="w-3 h-3 text-indigo-600" />
        <p className="text-xs sm:text-sm font-semibold text-indigo-700">What to Include</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-800">Certifications</p>
          <p className="text-xs  text-gray-600">AWS, Google, Microsoft, PMP</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-800">Awards</p>
          <p className="text-xs  text-gray-600">Best Employee, Leadership Award</p>
        </div>
     
       
      </div>
    </div>
  }
/>

      {/* Delete Confirmation Popup */}
      {deletePopup.show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="bg-linear-to-r from-indigo-600 to-indigo-500 px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <FaTrash className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Delete Section
                </h3>
              </div>
            </div>

            <div className="p-5 text-center">
              <p className="text-gray-600 text-sm mb-6">
                Are you sure you want to delete "{deletePopup.heading}"? This
                action cannot be undone.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteSection}
                  className="flex-1 px-4 py-2.5 bg-linear-to-r from-red-500 to-red-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all text-sm"
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 text-center max-w-sm w-full">
            <div className="w-12 h-12 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="font-semibold text-gray-800 text-base mb-1">
              Analyzing Resume...
            </h3>
            <p className="text-gray-500 text-sm">This may take a few seconds</p>
          </div>
        </div>
      )}

      {/* ATS Result Modal */}
      <AnimatePresence mode="wait">
        {showPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
              onClick={() => {
                setShowPopup(false);
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
            >
              <motion.div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden pointer-events-auto">
                <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-5 py-4">
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
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      ATS Score Analysis
                    </h3>
                  </div>
                </div>

                <div className="p-6 text-center">
                  <div className="relative w-36 h-36 mx-auto mb-6">
                    <CircularProgressbar
                      value={progress}
                      text={`${progress}%`}
                      styles={buildStyles({
                        pathColor:
                          progress >= 80
                            ? "#10b981"
                            : progress >= 60
                              ? "#f59e0b"
                              : "#ef4444",
                        textColor:
                          progress >= 80
                            ? "#10b981"
                            : progress >= 60
                              ? "#f59e0b"
                              : "#ef4444",
                        trailColor: "#f3f4f6",
                        pathTransitionDuration: 1,
                        textSize: "24px",
                        strokeLinecap: "round",
                      })}
                    />
                  </div>

                  <p className="text-gray-600 text-sm mb-5">{atsVerdict}</p>

                  {/* <button
                    onClick={() => {
                      setShowPopup(false);
                      window.open("/ats-checker");
                    }}
                    className="w-full mb-3 py-2.5 bg-indigo-50 text-indigo-600 font-medium rounded-lg hover:bg-indigo-100 transition-all text-sm flex items-center justify-center gap-2"
                  >
                    Go to Advanced ATS Checker
                    <IoArrowForward className="w-4 h-4" />
                  </button> */}

                  <button
                    onClick={() => {
                      setShowPopup(false);
                    }}
                    className="w-full py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all text-sm"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinalizeForm;
