// "use client";

// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useContext,
//   useImperativeHandle,
//   forwardRef,
//   useCallback,
// } from "react";
// import dynamic from "next/dynamic";
// import { motion } from "framer-motion";
// // import "primereact/resources/themes/saga-blue/theme.css";
// // import "primereact/resources/primereact.min.css";
// import { CreateContext } from "@/app/context/CreateContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import Stepper from "../../../components/resume/Steppers";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { API_URL } from "@/app/config/api";
// import { SimpleSkill, SkillCategory } from "@/app/types";

// // Dynamically import Editor to avoid SSR issues
// const Editor = dynamic(
//   () => import("primereact/editor").then((mod) => mod.Editor),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="mt-3 md:mt-4 lg:mt-5 bg-white h-37.5 min-h-37.5 flex items-center justify-center">
//         <div className="animate-pulse text-gray-400">Loading editor...</div>
//       </div>
//     ),
//   },
// );

// const SummaryForm = () => {
//   const UseContext = useContext(CreateContext);
//   // const contactId = UseContext?.contact._id;

//       const contactId = UseContext?.contact._id || UseContext?.contact.contactId;


//   const {
//     summary,
//     setSummary,
//     education,
//     experiences,
//     skills,
//     fullResumeData,
//     setFullResumeData,
//   } = UseContext;


//   const [isSaving, setIsSaving] = useState(false);
//   const [lastSavedData, setLastSavedData] = useState<string>("");
//   const [errors, setErrors] = useState<{ text?: string }>({});
//   const [Airesponse, setAireseponse] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);

//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const initialLoadDone = useRef(false);
//   const router = useRouter();

//   const filteredExperiences = experiences.map((exp) => ({
//     job_title: exp.jobTitle,
//     company: exp.employer,
//     start_date: exp.startDate,
//     end_date: exp.endDate,
//   }));

//   const filteredEducation = education.map((edu) => ({
//     degree: edu.degree,
//     institution: edu.schoolname,
//     year: edu.year,
//   }));

//   // const filteredSkills = skills.map((skill) => skill.skill);

  
//   const filteredSkills = skills?.length 
//   ? ('title' in skills[0] 
//       ? (skills as SkillCategory[]).flatMap(c => c.skills.map(s => s.name))
//       : (skills as SimpleSkill[]).map(s => s.name))
//   : [];

  
//   console.log("filteredSkills",filteredSkills)

//   const formData = {
//     experiences: filteredExperiences,
//     education: filteredEducation,
//     skills: filteredSkills,
//   };

//   // Save to localStorage whenever text changes
//   useEffect(() => {
//     if (!initialLoadDone.current) return;

//     if (fullResumeData) {
//       const updatedFullData = {
//         ...fullResumeData,
//         summary: summary,
//       };
//       setFullResumeData(updatedFullData);
//       setLocalStorage("fullResumeData", updatedFullData);
//     }
//   }, [summary]);

//   const saveToAPI = async (summaryText: string) => {
//     if (!contactId) {
//       console.error("Contact ID is required");
//       return false;
//     }

//     // Check if data has changed from last saved
//     const plainText = summaryText?.replace(/<[^>]*>/g, "").trim() || "";
//     if (plainText === lastSavedData) {
//       return true; // No changes to save
//     }

//     setIsSaving(true);

//     try {
//       const formData = {
//         text: summaryText,
//       };

//       const response = await axios.post(
//         `${API_URL}/api/summary/update`,
//         formData,
//         { params: { contactId: contactId } },
//       );

//       setLastSavedData(plainText);
//       return true;
//     } catch (err: any) {
//       setErrors(err);
//       console.error("Error saving summary:", err);
//       toast.error("Failed to save Summary!");
//       return false;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // Debounced save function
//   const debouncedSave = useCallback(
//     (summaryText: string) => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//       saveTimeoutRef.current = setTimeout(() => {
//         saveToAPI(summaryText);
//       }, 1000);
//     },
//     [contactId, lastSavedData],
//   );

//   const handleTextChange = (htmlValue: string) => {
//     setSummary(htmlValue);
//     debouncedSave(htmlValue);
//   };

//   const handleSubmitAi = async (e?: React.MouseEvent) => {
//     if (e) e.preventDefault();
//     setLoading(true);
//     setAireseponse(null);

//     try {
//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/resume/summary`,
//         formData,
//       );

//       setAireseponse(response.data?.summary || "");
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

//   const insertAIResponse = () => {
//     if (Airesponse) {
//       setShowPopup(false);
//       setSummary(Airesponse);
//       saveToAPI(Airesponse); // Save immediately when inserting AI response
//     }
//   };

//   const fetchSummary = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/summary/get-summary/${contactId}`,
//       );

//       const fetchedText = response.data[0]?.text || "";
//       setSummary(fetchedText);

//       const plainText = fetchedText?.replace(/<[^>]*>/g, "").trim() || "";
//       setLastSavedData(plainText);

//       initialLoadDone.current = true;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // useEffect(() => {
//   //   if (contactId) {
//   //     fetchSummary();
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

//         {/* Summary Editor Card */}
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
//                   d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
//                 />
//               </svg>
//             </div>
//             <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
//               Professional Summary
//             </h1>
//           </div>

//           <p className="text-gray-600 text-xs sm:text-sm font-medium">
//             Write a compelling introduction that highlights your experience, key
//             skills, and career aspirations.
//           </p>
//           <div className="bg-[#f3f4f6]/80 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-subtle transition-all duration-300 hover:shadow-md">
//             {/* Editor Content */}
//             <div className="p-3 sm:p-4 lg:p-5 space-y-4 sm:space-y-6">
//               {/* AI Generation Button */}
//               <div className="flex justify-end">
//                 <button
//                   onClick={handleSubmitAi}
//                   disabled={loading}
//                   className={`inline-flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-white text-xs sm:text-sm font-medium transition-all duration-200 w-fit sm:w-auto ${
//                     loading
//                       ? "bg-linear-to-r from-gray-300 to-gray-400 cursor-not-allowed opacity-70"
//                       : "bg-linear-to-r from-[#c40116] to-[#c40116]/60 hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02]"
//                   }`}
//                   type="button"
//                 >
//                   {loading ? (
//                     <>
//                       <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 sm:w-5 sm:h-5"></span>
//                       <span>Generating AI Summary...</span>
//                     </>
//                   ) : (
//                     <>
//                       <svg
//                         className="w-4 h-4 sm:w-5 sm:h-5"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M13 10V3L4 14h7v7l9-11h-7z"
//                         />
//                       </svg>
//                       <span>Generate with AI</span>
//                     </>
//                   )}
//                 </button>
//               </div>

//               {/* Editor Area */}
//               <Editor
//                 className="mt-3 md:mt-4 lg:mt-5 bg-white"
//                 value={summary}
//                 onTextChange={(e: any) => handleTextChange(e.htmlValue)}
//                 headerTemplate={
//                   <div className="flex gap-1 p-2  flex-wrap items-center bg-gray-50">
//                     <button
//                       type="button"
//                       className="ql-bold p-2 hover:bg-gray-200 rounded transition-colors duration-200"
//                       aria-label="Bold"
//                       title="Bold"
//                     >
//                       <span className="font-bold">B</span>
//                     </button>

//                     <button
//                       type="button"
//                       className="ql-italic p-2 hover:bg-gray-200 rounded transition-colors duration-200"
//                       aria-label="Italic"
//                       title="Italic"
//                     >
//                       <span className="italic">I</span>
//                     </button>

//                     <button
//                       type="button"
//                       className="ql-underline p-2 hover:bg-gray-200 rounded transition-colors duration-200"
//                       aria-label="Underline"
//                       title="Underline"
//                     >
//                       <span className="underline">U</span>
//                     </button>

//                     <button
//                       type="button"
//                       className="ql-clean p-2 hover:bg-gray-200 rounded transition-colors duration-200"
//                       aria-label="Clear Formatting"
//                       title="Clear Formatting"
//                     >
//                       <span>⌫</span>
//                     </button>
//                   </div>
//                 }
//                 style={{
//                   height: "150px",
//                   minHeight: "150px",
//                   backgroundColor: "#fafafa",
//                   padding: "12px sm:16px",
//                   fontSize: "14px sm:15px",
//                   background: "white",
//                 }}
//               />

//               {errors?.text && (
//                 <div className="flex items-center gap-2 p-2.5 sm:p-3 bg-linear-to-r from-red-50 to-red-50/50 border border-red-200 rounded-lg rounded-t-none">
//                   <div className="p-1 sm:p-1.5 bg-[#c40116]/10 rounded-lg">
//                     <svg
//                       className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c40116]"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                   </div>
//                   <p className="text-[#c40116] text-xs sm:text-sm font-medium">
//                     {errors.text}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="shrink-0 pt-2  lg:pt-3">
//           <div className="flex justify-between">
//             <button
//               className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
//               onClick={() => router.push("/resume-details/project")}
//             >
//               Back
//             </button>

//             <button
//               className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold transition-colors duration-300 cursor-pointer"
//               onClick={() => {
//                 if (saveTimeoutRef.current) {
//                   clearTimeout(saveTimeoutRef.current);
//                 }
//                 saveToAPI(summary).then(() => {
//                   router.push("/resume-details/finalize");
//                 });
//               }}
//             >
//               Next Finalize
//             </button>
//           </div>
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
//                   <div className="flex items-start gap-2 sm:gap-3">
//                     <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg shrink-0">
//                       <svg
//                         className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M13 10V3L4 14h7v7l9-11h-7z"
//                         />
//                       </svg>
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//                         AI-Generated Summary
//                       </h2>
//                       <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                         Review the AI-generated summary and insert it below
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowPopup(false)}
//                     className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
//                     type="button"
//                   >
//                     <svg
//                       className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 </div>

//                 <div className="mb-4 sm:mb-6">
//                   <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-3 sm:p-4 max-h-50 sm:max-h-75 overflow-y-auto">
//                     <p className="text-gray-700 leading-relaxed text-xs sm:text-sm whitespace-pre-line">
//                       {Airesponse}
//                     </p>
//                   </div>
//                   <div className="flex items-center justify-end mt-2 text-[10px] xs:text-xs text-gray-500">
//                     <span className="flex items-center gap-1">
//                       <svg
//                         className="w-2.5 h-2.5 sm:w-3 sm:h-3"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M13 10V3L4 14h7v7l9-11h-7z"
//                         />
//                       </svg>
//                       Generated by AI
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//                   <button
//                     onClick={() => setShowPopup(false)}
//                     className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                     type="button"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={insertAIResponse}
//                     className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2"
//                     type="button"
//                   >
//                     <span>Insert Summary</span>
//                     <svg
//                       className="w-4 h-4 sm:w-5 sm:h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M14 5l7 7m0 0l-7 7m7-7H3"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };
// export default SummaryForm;



"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { CreateContext } from "@/app/context/CreateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Stepper from "../../../components/resume/Steppers";
import { getLocalStorage, setLocalStorage } from "@/app/utils";
import { API_URL } from "@/app/config/api";
import { SimpleSkill, SkillCategory } from "@/app/types";
// import {  } from "react-icons/io";
import {
  IoArrowForward,
  IoClose,
  IoDiamondOutline,
  IoSparkles,
} from "react-icons/io5";
import { FaRegLightbulb, FaStar, FaGem, FaMagic } from "react-icons/fa";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

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

const SummaryForm = () => {
  const UseContext = useContext(CreateContext);
  const contactId = UseContext?.contact._id || UseContext?.contact.contactId;

  const {
    summary,
    setSummary,
    education,
    experiences,
    skills,
    fullResumeData,
    setFullResumeData,
  } = UseContext;

  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedData, setLastSavedData] = useState<string>("");
  const [errors, setErrors] = useState<{ text?: string }>({});
  const [Airesponse, setAiresponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [summaryTipsClicked, setSummaryTipsClicked] = useState(false);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialLoadDone = useRef(false);
  const router = useRouter();

  const filteredExperiences = experiences?.map((exp) => ({
    job_title: exp.jobTitle,
    company: exp.employer,
    start_date: exp.startDate,
    end_date: exp.endDate,
  })) || [];

  const filteredEducation = education?.map((edu) => ({
    degree: edu.degree,
    institution: edu.schoolname,
    year: edu.year,
  })) || [];

  const filteredSkills = skills?.length 
    ? ('title' in skills[0] 
        ? (skills as SkillCategory[]).flatMap(c => c.skills.map(s => s.name))
        : (skills as SimpleSkill[]).map(s => s.name))
    : [];

  const formData = {
    experiences: filteredExperiences,
    education: filteredEducation,
    skills: filteredSkills,
  };

  // Save to localStorage whenever text changes
  useEffect(() => {
    if (!initialLoadDone.current) return;

    if (fullResumeData) {
      const updatedFullData = {
        ...fullResumeData,
        summary: summary,
      };
      setFullResumeData(updatedFullData);
      setLocalStorage("fullResumeData", updatedFullData);
    }
  }, [summary]);

  const saveToAPI = async (summaryText: string) => {
    if (!contactId) {
      console.error("Contact ID is required");
      return false;
    }

    const plainText = summaryText?.replace(/<[^>]*>/g, "").trim() || "";
    if (plainText === lastSavedData) {
      return true;
    }

    setIsSaving(true);

    try {
      const formData = {
        text: summaryText,
      };

      const response = await axios.post(
        `${API_URL}/api/summary/update`,
        formData,
        { params: { contactId: contactId } },
      );

      setLastSavedData(plainText);
      return true;
    } catch (err: any) {
      setErrors(err);
      console.error("Error saving summary:", err);
      toast.error("Failed to save Summary!");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const debouncedSave = useCallback(
    (summaryText: string) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        // saveToAPI(summaryText);
      }, 1000);
    },
    [contactId, lastSavedData],
  );

  const handleTextChange = (htmlValue: string) => {
    setSummary(htmlValue);
    debouncedSave(htmlValue);
  };

  const handleSubmitAi = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setAiresponse(null);

    try {
      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/resume/summary`,
        formData,
      );

      setAiresponse(response.data?.summary || "");
      setShowPopup(true);

      return true;
    } catch (err: any) {
      setErrors(err);
      console.error("Error sending message:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const insertAIResponse = () => {
    if (Airesponse) {
      setShowPopup(false);
      setSummary(Airesponse);
      // saveToAPI(Airesponse);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/summary/get-summary/${contactId}`,
      );

      const fetchedText = response.data[0]?.text || "";
      setSummary(fetchedText);

      const plainText = fetchedText?.replace(/<[^>]*>/g, "").trim() || "";
      setLastSavedData(plainText);

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
        <div className=" mx-auto px-2 py-6 sm:py-8 lg:py-10">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Professional Summary
            </h1>
            
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Write a compelling introduction that highlights your experience and skills
            </p>

            <button
              onClick={() => setSummaryTipsClicked(true)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <FaRegLightbulb className="w-3 h-3" />
              <span>Summary Tips</span>
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
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">Professional Summary</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Tell your professional story</p>
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
            <div className="p-4 sm:p-6">
              <div className="bg-white overflow-hidden ">
                {/* Editor Content */}
                <div className="p-4 sm:p-5 space-y-4 sm:space-y-5">
                  {/* AI Generation Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleSubmitAi}
                      disabled={loading}
                      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        loading
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-lg"
                      }`}
                      type="button"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                          <span>Generating AI Summary...</span>
                        </>
                      ) : (
                        <>
                          <FaMagic className="w-4 h-4" />
                          <span>Generate with AI</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Editor Area */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                      Your Summary
                    </label>
                    <Editor
                      className="rounded-lg bg-white border border-gray-200 overflow-hidden"
                      value={summary || ""}
                      onTextChange={(e: any) => handleTextChange(e.htmlValue)}
                      headerTemplate={
                        <div className="flex gap-1 p-2 flex-wrap items-center bg-gray-50 border-b border-gray-200">
                          <button type="button" className="ql-bold p-1.5 hover:bg-gray-200 rounded transition">B</button>
                          <button type="button" className="ql-italic p-1.5 hover:bg-gray-200 rounded transition">I</button>
                          <button type="button" className="ql-underline p-1.5 hover:bg-gray-200 rounded transition">U</button>
                          <button type="button" className="ql-clean p-1.5 hover:bg-gray-200 rounded transition">⌫</button>
                        </div>
                      }
                      style={{
                        height: "200px",
                        minHeight: "200px",
                        background: "white",
                      }}
                    />
                  </div>

                  {/* Error Message */}
                  {errors?.text && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="p-1 bg-red-100 rounded-lg">
                        <svg className="w-3.5 h-3.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-red-600 text-xs font-medium">{errors.text}</p>
                    </div>
                  )}
                </div>
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
              onClick={() => router.push("/resume-details/project")}
            >
              ← Back to Projects
            </button>
            <button
            className="px-4 sm:px-6 py-2 sm:py-2.5  bg-gradient-to-r from-indigo-600 to-indigo-500 text-white t font-medium rounded-lg sm:rounded-xl shadow-md transition-all hover:shadow-indigo-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
              onClick={() => {
                if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
                saveToAPI(summary).then(() => router.push("/resume-details/finalize"));
              }}
            >
              <span>Continue to Finalize</span>
              <IoArrowForward className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary Tips Modal */}
      {summaryTipsClicked && (
        <AnimatePresence>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 backdrop-blur-md bg-black/50"
              onClick={() => setSummaryTipsClicked(false)}
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
                  <h3 className="text-lg font-bold text-white">Summary Tips</h3>
                </div>
              </div>

              <div className="p-5">
                <div className="bg-amber-50 rounded-xl p-3 mb-4 border border-amber-100">
                  <div className="flex items-center gap-2 mb-1">
                    <FaStar className="w-3 h-3 text-amber-500" />
                    <span className="text-xs font-semibold text-amber-700">Pro Tip</span>
                  </div>
                  <p className="text-xs text-gray-700">Keep your summary concise, focused, and tailored to your target role</p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Best Practices</h4>
                  {[
                    "Keep it concise (3-5 sentences maximum)",
                    "Highlight your most relevant experience",
                    "Include key skills and achievements",
                    "Tailor to your target role/industry",
                    "Use action verbs and quantifiable results"
                  ].map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5" />
                      <span className="text-xs text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => setSummaryTipsClicked(false)}
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

      {/* AI Response Popup */}
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
                  <h2 className="text-lg font-semibold text-white">AI-Generated Summary</h2>
                  <p className="text-indigo-100 text-xs">Review and insert below</p>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <IoClose className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="p-5">
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 max-h-64 overflow-y-auto mb-5">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {Airesponse}
                </p>
              </div>
              <div className="flex items-center justify-end mb-4">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <FaMagic className="w-3 h-3" />
                  Generated by AI
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowPopup(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={insertAIResponse}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  type="button"
                >
                  <span>Insert Summary</span>
                  <IoArrowForward className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SummaryForm;