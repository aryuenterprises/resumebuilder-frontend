// "use client";

// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useContext,
//   useImperativeHandle,
//   forwardRef,
//   ForwardedRef,
// } from "react";
// import dynamic from "next/dynamic";
// import { motion } from "framer-motion";
// import "primereact/resources/themes/saga-blue/theme.css";
// import "primereact/resources/primereact.min.css";
// import { CreateContext } from "@/app/context/CreateContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import Stepper from "../../../components/resume/Steppers";

// // Define interfaces
// interface Experience {
//   jobTitle: string;
//   employer: string;
//   startDate: string;
//   endDate: string;
// }

// interface Education {
//   degree: string;
//   institution: string;
//   year: string;
// }

// interface Skill {
//   skill: string;
// }

// interface SummaryFormProps {
//   // Add any props you need here
// }

// interface SummaryFormRef {
//   handleSubmit: (e?: React.FormEvent) => Promise<boolean>;
// }

// interface CreateContextType {
//   contactid?: string;
//   text: string;
//   setText: (value: string) => void;
//   education: Education[];
//   experiences: Experience[];
//   skills: Skill[];
// }

// interface FormData {
//   experiences: {
//     job_title: string;
//     company: string;
//     start_date: string;
//     end_date: string;
//   }[];
//   education: {
//     degree: string;
//     institution: string;
//     year: number;
//   }[];
//   skills: string[];
// }

// // Dynamically import Editor to avoid SSR issues
// const Editor = dynamic(
//   () => import("primereact/editor").then((mod) => mod.Editor),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="mt-3 md:mt-4 lg:mt-5 bg-white h-[150px] min-h-[150px] flex items-center justify-center">
//         <div className="animate-pulse text-gray-400">Loading editor...</div>
//       </div>
//     ),
//   },
// );

// const Summary_form = forwardRef<SummaryFormRef, SummaryFormProps>(
//   (props, ref) => {
//     const UseContext = useContext(CreateContext);
//     const Contactid = UseContext?.contactid;

//     const { text, setText, education, experiences, skills } = UseContext || {
//       text: "",
//       setText: () => {},
//       education: [],
//       experiences: [],
//       skills: [],
//     };

//     const filteredExperiences = experiences.map((exp) => ({
//       job_title: exp.jobTitle,
//       company: exp.employer,
//       start_date: exp.startDate,
//       end_date: exp.endDate,
//     }));

//     const filteredEducation = education.map((edu) => ({
//       degree: edu.degree,
//       institution: edu.schoolname,
//       year: edu.year,
//     }));

//     const filteredSkills = skills.map((skill) => skill.skill);

//     const formData: FormData = {
//       experiences: filteredExperiences,
//       education: filteredEducation,
//       skills: filteredSkills,
//     };

//     const [errors, setErrors] = useState<{ text?: string }>({});
//     const [Airesponse, setAireseponse] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [showPopup, setShowPopup] = useState(false);
//     const router = useRouter();

//     const handleSubmitAi = async (e?: React.MouseEvent) => {
//       if (e) e.preventDefault();
//       setLoading(true);
//       setAireseponse(null);

//       try {
//         const response = await axios.post(
//           `https://ai.aryuacademy.com/api/v1/resume/summary`,
//           formData,
//         );

//         setAireseponse(response.data?.summary || "");
//         setShowPopup(true);

//         return true;
//       } catch (err: any) {
//         setErrors(err);
//         console.error("Error sending message:", err);
//         return false;
//       } finally {
//         setLoading(false);
//       }
//     };

//     const insertAIResponse = () => {
//       if (Airesponse) {
//         setShowPopup(false);
//         setText(Airesponse);
//       }
//     };

//     const fetchSummary = async () => {
//       try {
//         const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
//         const response = await axios.get(
//           `${API_URL}/api/summary/get-summary/${Contactid}`,
//         );

//         setText(response.data[0]?.text || "");
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     useEffect(() => {
//       if (Contactid) {
//         fetchSummary();
//       }
//     }, [Contactid]);

//     const handleSubmit = async (e?: React.FormEvent) => {
//       if (e) e.preventDefault();

//       let isValid = true;
//       const newErrors: { text?: string } = {};

//       const plainText = text?.replace(/<[^>]*>/g, "").trim();

//       if (!plainText) {
//         newErrors.text = "Summary description is required";
//         isValid = false;
//       }

//       setErrors(newErrors);

//       if (!isValid) {
//         toast.error("Please enter a summary description");
//         return false;
//       }

//       try {
//         const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
//         const formData = {
//           text,
//         };

//         const response = await axios.post(
//           `${API_URL}/api/summary/update`,
//           formData,
//           { params: { contactId: Contactid } },
//         );

//         toast.success("Summary saved successfully!");
//         return true;
//       } catch (err: any) {
//         setErrors(err);
//         console.error("Error sending message:", err);
//         toast.error("Failed to save Summary!");
//         return false;
//       }
//     };

//     useImperativeHandle(ref, () => ({
//       handleSubmit,
//     }));

//     return (
//       <section className="relative h-screen overflow-hidden">
//         <div className="p-3 md:p-4 lg:p-5 bg-white rounded-xl sm:rounded-2xl shadow-soft h-full flex flex-col">
//           {/* Header Section */}
//             <Stepper/>

//           {/* Summary Editor Card */}
//           <div className="flex-1 overflow-y-auto pb-5 mt-3">

//              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
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
//                     d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
//                   />
//                 </svg>
//               </div>
//               <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
//                 Professional Summary
//               </h1>
//             </div>

//             <p className="text-gray-600 text-xs sm:text-sm font-medium">
//               Write a compelling introduction that highlights your experience,
//               key skills, and career aspirations.
//             </p>
//             <div className="bg-[#f3f4f6]/80 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-subtle transition-all duration-300 hover:shadow-md">
//               {/* Editor Content */}
//               <div className="p-3 sm:p-4 lg:p-5 space-y-4 sm:space-y-6">
//                 {/* AI Generation Button */}
//                 <div className="flex justify-end">
//                   <button
//                     onClick={handleSubmitAi}
//                     disabled={loading}
//                     className={`inline-flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-white text-xs sm:text-sm font-medium transition-all duration-200 w-fit sm:w-auto ${
//                       loading
//                         ? "bg-linear-to-r from-gray-300 to-gray-400 cursor-not-allowed opacity-70"
//                         : "bg-linear-to-r from-[#c40116] to-[#c40116]/60 hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02]"
//                     }`}
//                     type="button"
//                   >
//                     {loading ? (
//                       <>
//                         <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 sm:w-5 sm:h-5"></span>
//                         <span>Generating AI Summary...</span>
//                       </>
//                     ) : (
//                       <>
//                         <svg
//                           className="w-4 h-4 sm:w-5 sm:h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M13 10V3L4 14h7v7l9-11h-7z"
//                           />
//                         </svg>
//                         <span>Generate with AI</span>
//                       </>
//                     )}
//                   </button>
//                 </div>

//                 {/* Editor Area */}
//                 <Editor
//                   className="mt-3 md:mt-4 lg:mt-5 bg-white"
//                   value={text}
//                   onTextChange={(e: any) => setText(e.htmlValue)}
//                   style={{
//                     height: "150px",
//                     minHeight: "150px",
//                     backgroundColor: "#fafafa",
//                     padding: "12px sm:16px",
//                     fontSize: "14px sm:15px",
//                     background: "white",
//                   }}
//                 />

//                 {errors?.text && (
//                   <div className="flex items-center gap-2 p-2.5 sm:p-3 bg-linear-to-r from-red-50 to-red-50/50 border border-red-200 rounded-lg rounded-t-none">
//                     <div className="p-1 sm:p-1.5 bg-[#c40116]/10 rounded-lg">
//                       <svg
//                         className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c40116]"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                         />
//                       </svg>
//                     </div>
//                     <p className="text-[#c40116] text-xs sm:text-sm font-medium">
//                       {errors.text}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="shrink-0 pt-4 mt-4 border-t border-gray-200">
//             <div className=" flex justify-between">
//               <button
//                 className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg  font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300"
//                 onClick={() => router.push("/resume-details/skills")}
//               >
//                 Back
//               </button>

//               <button
//                 className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold s transition-colors duration-300"
//                 onClick={() =>
//                   router.push("/resume-details/finalize")
//                 }
//               >
//                 Next Finalize
//               </button>
//             </div>
//           </div>

//           {/* AI Response Popup */}
//           {showPopup && Airesponse && (
//             <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] sm:max-h-[70vh] overflow-hidden"
//               >
//                 <div className="p-1 bg-linear-to-r from-[#c40116] to-[#be0117]"></div>

//                 <div className="p-4 sm:p-6">
//                   <div className="flex items-start justify-between gap-3 mb-4 sm:mb-6">
//                     <div className="flex items-start gap-2 sm:gap-3">
//                       <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg shrink-0">
//                         <svg
//                           className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M13 10V3L4 14h7v7l9-11h-7z"
//                           />
//                         </svg>
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//                           AI-Generated Summary
//                         </h2>
//                         <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                           Review the AI-generated summary and insert it below
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => setShowPopup(false)}
//                       className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
//                       type="button"
//                     >
//                       <svg
//                         className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M6 18L18 6M6 6l12 12"
//                         />
//                       </svg>
//                     </button>
//                   </div>

//                   <div className="mb-4 sm:mb-6">
//                     <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-3 sm:p-4 max-h-[200px] sm:max-h-[300px] overflow-y-auto">
//                       <p className="text-gray-700 leading-relaxed text-xs sm:text-sm whitespace-pre-line">
//                         {Airesponse}
//                       </p>
//                     </div>
//                     <div className="flex items-center justify-end mt-2 text-[10px] xs:text-xs text-gray-500">
//                       <span className="flex items-center gap-1">
//                         <svg
//                           className="w-2.5 h-2.5 sm:w-3 sm:h-3"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M13 10V3L4 14h7v7l9-11h-7z"
//                           />
//                         </svg>
//                         Generated by AI
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//                     <button
//                       onClick={() => setShowPopup(false)}
//                       className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                       type="button"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={insertAIResponse}
//                       className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2"
//                       type="button"
//                     >
//                       <span>Insert Summary</span>
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
//                           d="M14 5l7 7m0 0l-7 7m7-7H3"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </div>
//       </section>
//     );
//   },
// );

// Summary_form.displayName = "Summary_form";
// export default Summary_form;

"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { CreateContext } from "@/app/context/CreateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Stepper from "../../../components/resume/Steppers";
import { getLocalStorage, setLocalStorage } from "@/app/utils";
import { Education, Experience, Skill } from "@/app/types";
import { API_URL } from "@/app/config/api";


// Dynamically import Editor to avoid SSR issues
const Editor = dynamic(
  () => import("primereact/editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="mt-3 md:mt-4 lg:mt-5 bg-white h-37.5 min-h-37.5 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading editor...</div>
      </div>
    ),
  },
);

const SummaryForm = () => {
  const UseContext = useContext(CreateContext);
  const Contactid = UseContext?.contact.contactId;

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
  const [Airesponse, setAireseponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialLoadDone = useRef(false);
  const router = useRouter();

  const filteredExperiences = experiences.map((exp) => ({
    job_title: exp.jobTitle,
    company: exp.employer,
    start_date: exp.startDate,
    end_date: exp.endDate,
  }));

  const filteredEducation = education.map((edu) => ({
    degree: edu.degree,
    institution: edu.schoolname,
    year: edu.year,
  }));

  const filteredSkills = skills.map((skill) => skill.skill);

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
    if (!Contactid) {
      console.error("Contact ID is required");
      return false;
    }

    // Check if data has changed from last saved
    const plainText = summaryText?.replace(/<[^>]*>/g, "").trim() || "";
    if (plainText === lastSavedData) {
      return true; // No changes to save
    }

    setIsSaving(true);

    try {
      const formData = {
        text: summaryText,
      };

      const response = await axios.post(
        `${API_URL}/api/summary/update`,
        formData,
        { params: { contactId: Contactid } },
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

  // Debounced save function
  const debouncedSave = useCallback(
    (summaryText: string) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        saveToAPI(summaryText);
      }, 1000);
    },
    [Contactid, lastSavedData],
  );

  const handleTextChange = (htmlValue: string) => {
    setSummary(htmlValue);
    debouncedSave(htmlValue);
  };


  const handleSubmitAi = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setAireseponse(null);

    try {
      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/resume/summary`,
        formData,
      );

      setAireseponse(response.data?.summary || "");
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
      saveToAPI(Airesponse); // Save immediately when inserting AI response
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/summary/get-summary/${Contactid}`,
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
    if (Contactid) {
      fetchSummary();
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

        {/* Summary Editor Card */}
        <div className="flex-1 overflow-y-auto pb-5 mt-3">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
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
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
              Professional Summary
            </h1>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm font-medium">
            Write a compelling introduction that highlights your experience, key
            skills, and career aspirations.
          </p>
          <div className="bg-[#f3f4f6]/80 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-subtle transition-all duration-300 hover:shadow-md">
            {/* Editor Content */}
            <div className="p-3 sm:p-4 lg:p-5 space-y-4 sm:space-y-6">
              {/* AI Generation Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmitAi}
                  disabled={loading}
                  className={`inline-flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-white text-xs sm:text-sm font-medium transition-all duration-200 w-fit sm:w-auto ${
                    loading
                      ? "bg-linear-to-r from-gray-300 to-gray-400 cursor-not-allowed opacity-70"
                      : "bg-linear-to-r from-[#c40116] to-[#c40116]/60 hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02]"
                  }`}
                  type="button"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 sm:w-5 sm:h-5"></span>
                      <span>Generating AI Summary...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
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

              {/* Editor Area */}
              <Editor
                className="mt-3 md:mt-4 lg:mt-5 bg-white"
                value={summary}
                onTextChange={(e: any) => handleTextChange(e.htmlValue)}
                style={{
                  height: "150px",
                  minHeight: "150px",
                  backgroundColor: "#fafafa",
                  padding: "12px sm:16px",
                  fontSize: "14px sm:15px",
                  background: "white",
                }}
              />

              {errors?.text && (
                <div className="flex items-center gap-2 p-2.5 sm:p-3 bg-linear-to-r from-red-50 to-red-50/50 border border-red-200 rounded-lg rounded-t-none">
                  <div className="p-1 sm:p-1.5 bg-[#c40116]/10 rounded-lg">
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c40116]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-[#c40116] text-xs sm:text-sm font-medium">
                    {errors.text}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="shrink-0 pt-4 mt-4 border-t border-gray-200">
          <div className="flex justify-between">
            <button
              className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
              onClick={() => router.push("/resume-details/skills")}
            >
              Back
            </button>

            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold transition-colors duration-300 cursor-pointer"
              onClick={() => {
                if (saveTimeoutRef.current) {
                  clearTimeout(saveTimeoutRef.current);
                }
                saveToAPI(summary).then(() => {
                  router.push("/resume-details/finalize");
                });
              }}
            >
              Next Finalize
            </button>
          </div>
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
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]"
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
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                        AI-Generated Summary
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Review the AI-generated summary and insert it below
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
                    type="button"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mb-4 sm:mb-6">
                  <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-3 sm:p-4 max-h-50 sm:max-h-75 overflow-y-auto">
                    <p className="text-gray-700 leading-relaxed text-xs sm:text-sm whitespace-pre-line">
                      {Airesponse}
                    </p>
                  </div>
                  <div className="flex items-center justify-end mt-2 text-[10px] xs:text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3"
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
                      Generated by AI
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={insertAIResponse}
                    className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2"
                    type="button"
                  >
                    <span>Insert Summary</span>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
export default SummaryForm;
