// "use client";

// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useContext,
//   useCallback,
// } from "react";
// import dynamic from "next/dynamic";
// import { motion, AnimatePresence } from "framer-motion";
// import { CreateContext } from "@/app/context/CreateContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { API_URL } from "@/app/config/api";
// // import {  } from "react-icons/io";
// import {
//   IoArrowForward,
//   IoClose,
//   IoDiamondOutline,
//   IoSparkles,
// } from "react-icons/io5";
// import { FaRegLightbulb, FaStar, FaGem, FaMagic } from "react-icons/fa";
// import { FiCheckCircle, FiShield, FiX, FiXCircle } from "react-icons/fi";
// import { Stepper, TipsModal } from "@/app/components/resume";
// import api from "@/app/utils/api";
// import apiClient from "@/app/utils/apiClient";

// // Dynamically import Editor to avoid SSR issues
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

// const SummaryForm = () => {
//   const UseContext = useContext(CreateContext);
//   // const contactId = UseContext?.contact._id || UseContext?.contact.contactId;

//   const contactId = UseContext?.contact.contactId || UseContext?.contact._id;

//   // const contactId =  UseContext?.contact.contactId;

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
//   const [Airesponse, setAiresponse] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [summaryTipsClicked, setSummaryTipsClicked] = useState(false);
//   const router = useRouter();
//   const latestResumeId = getLocalStorage("latest_resume_id");

//   const filteredExperiences =
//     experiences?.map((exp) => ({
//       job_title: exp.jobTitle,
//       company: exp.employer,
//       start_date: exp.startDate,
//       end_date: exp.endDate,
//     })) || [];

//   const filteredEducation =
//     education?.map((edu) => ({
//       degree: edu.degree,
//       institution: edu.schoolname,
//       year: edu.year,
//     })) || [];

  
//   const filteredSkills = skills?.text
//     ? (skills.text.match(/<li>(.*?)<\/li>/g) || [])
//         .map((item: string) => item.replace(/<\/?li>/g, "").trim())
//         .filter(Boolean)
//     : [];

//   const formData = {
//     experiences: filteredExperiences,
//     education: filteredEducation,
//     skills: filteredSkills,
//   };

//   const saveToAPI = async (summaryText: string) => {
//     // if (!contactId) {
//     //   console.error("Contact ID is required");
//     //   return false;
//     // }

//     setIsSaving(true);

//     try {
//       // const formData = {
//       //   text: summaryText,
//       // };

//       // const response = await axios.post(
//       //   `${API_URL}/api/summary/update`,
//       //   formData,
//       //   { params: { contactId: contactId } },
//       // );

//       const singlePayload = {
//         section_name: "summary",
//         section_payload: summaryText,
//       };

//       // 3. Send it as standard 'application/json'
//       const response = await apiClient.patch(
//         `/user-resumes/${latestResumeId}`,
//         singlePayload,
//       );

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

//   const handleTextChange = (htmlValue: string) => {
//     setSummary(htmlValue);
//   };

//   const handleSubmitAi = async (e?: React.MouseEvent) => {
//     if (e) e.preventDefault();
//     setLoading(true);
//     setAiresponse(null);

//     try {
//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/resume/summary`,
//         formData,
//       );

//       setAiresponse(response.data?.summary || "");
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
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50/40">
//       <Stepper onBeforeNavigate={() => saveToAPI(summary)} />

//       {/* Scrollable Content Area */}
//       <div className="flex-1 overflow-y-auto">
//         <div className=" mx-auto px-2 py-6 sm:py-8 lg:py-10">
//           {/* Header Section */}
//           <div className="text-center mb-6 sm:mb-8">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
//               Professional Summary
//             </h1>

//             <p className="text-gray-500 text-sm max-w-md mx-auto">
//               Write a compelling introduction that highlights your experience
//               and skills
//             </p>

//             <button
//               onClick={() => setSummaryTipsClicked(true)}
//               className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
//             >
//               <FaRegLightbulb className="w-3 h-3" />
//               <span>Summary Tips</span>
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
//                       Professional Summary
//                     </h2>
//                     <p className="text-xs sm:text-sm text-gray-500">
//                       Tell your professional story
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
//             <div className="p-4 sm:p-6">
//               <div className="bg-white overflow-hidden ">
//                 {/* Editor Content */}
//                 <div className="p-4 sm:p-5 space-y-4 sm:space-y-5">
//                   {/* AI Generation Button */}
//                   <div className="flex justify-end">
//                     <button
//                       onClick={handleSubmitAi}
//                       disabled={loading}
//                       className={`inline-flex cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                         loading
//                           ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                           : "bg-linear-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-lg"
//                       }`}
//                       type="button"
//                     >
//                       {loading ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//                           <span>Generating AI Summary...</span>
//                         </>
//                       ) : (
//                         <>
//                           <FaMagic className="w-4 h-4" />
//                           <span>Generate with AI</span>
//                         </>
//                       )}
//                     </button>
//                   </div>

//                   {/* Editor Area */}
//                   <div>
//                     <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
//                       Your Summary
//                     </label>
//                     <Editor
//                       className="rounded-lg bg-white border border-gray-200 overflow-hidden"
//                       value={summary || ""}
//                       onTextChange={(e: any) => handleTextChange(e.htmlValue)}
//                       headerTemplate={
//                         <div className="flex gap-1 p-2 flex-wrap items-center bg-gray-50 border-b border-gray-200">
//                           <button
//                             type="button"
//                             className="ql-bold p-1.5 hover:bg-gray-200 rounded transition"
//                           >
//                             B
//                           </button>
//                           <button
//                             type="button"
//                             className="ql-italic p-1.5 hover:bg-gray-200 rounded transition"
//                           >
//                             I
//                           </button>
//                           <button
//                             type="button"
//                             className="ql-underline p-1.5 hover:bg-gray-200 rounded transition"
//                           >
//                             U
//                           </button>
//                           <button
//                             type="button"
//                             className="ql-clean p-1.5 hover:bg-gray-200 rounded transition"
//                           >
//                             ⌫
//                           </button>
//                         </div>
//                       }
//                       style={{
//                         height: "200px",
//                         minHeight: "200px",
//                         background: "white",
//                       }}
//                     />
//                   </div>

//                   {/* Error Message */}
//                   {errors?.text && (
//                     <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
//                       <div className="p-1 bg-red-100 rounded-lg">
//                         <svg
//                           className="w-3.5 h-3.5 text-red-600"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                       </div>
//                       <p className="text-red-600 text-xs font-medium">
//                         {errors.text}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sticky Footer Buttons */}

//       <div className="sticky bottom-0 z-20 bg-white/75 backdrop-blur-md border-t border-gray-100 shadow-lg shadow-gray-200/50">
//         <div className=" mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-4">
//           <div className="flex justify-between items-center gap-3 sm:gap-4">
//             {/* Back Button - Icon only on mobile, full text on desktop */}
//             <button
//               className="group px-4 sm:px-5 py-2.5 sm:py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl hover:bg-indigo-50/50 cursor-pointer"
//               onClick={() => router.push("/resume-details/project")}
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
//               <span className="hidden sm:inline">Back to Projects</span>
//               {/* Optional: Show just "Back" on medium screens */}
//               <span className="inline sm:hidden">Back</span>
//             </button>

//             {/* Continue Button - Premium Design */}
//             <button
//               className="group relative px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium md:font-semibold text-white rounded-lg md:rounded-xl shadow-lg transition-all duration-300 overflow-hidden whitespace-nowrap cursor-pointer"
//               onClick={() => {
//                 saveToAPI(summary).then(() =>
//                   router.push("/resume-details/finalize"),
//                 );
//               }}
//             >
//               {/* Gradient Background with Animation */}
//               <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:from-indigo-500 group-hover:via-indigo-400 group-hover:to-indigo-500"></div>

//               {/* Shine Effect */}
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
//               </div>

//               {/* Button Content */}
//               <div className="relative flex items-center justify-center gap-2">
//                 {/* Different text for mobile vs desktop */}
//                 <span>Continue to Finalize</span>
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

//       <TipsModal
//         isOpen={summaryTipsClicked}
//         onClose={() => setSummaryTipsClicked(false)}
//         title="Summary Tips"
//         subtitle="Write a compelling introduction"
//         hasAI={true}
//         aiFeatureDescription="get a professionally written summary based on your experience."
//         proTip="Your summary is the first thing recruiters read — make it count in 3-5 sentences"
//         bestPractices={[
//           {
//             tip: "Keep it short (3-5 sentences)",
//             example: "Recruiters read quickly",
//           },
//           {
//             tip: "Focus on your best experience",
//             example: "Talk about your main jobs",
//           },
//           {
//             tip: "Add numbers to show success",
//             example: "Made processes 40% faster",
//           },
//         ]}
//         avoidList={[
//           "Writing long paragraphs (more than 5 sentences)",
//           "Using overused words like 'hardworking'",
//           "Using 'I', 'me', 'my' too much",
//         ]}
//         examples={{
//           before:
//             "I am a hard worker. I know many skills. I want to learn and grow. I am good at my job.",
//           after:
//             "Senior Software Engineer with 8+ years of experience. Led 5+ developers, delivered 15+ projects, and improved efficiency by 40%.",
//         }}
//       />

//       {/* AI Response Popup */}
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
//                     AI-Generated Summary
//                   </h2>
//                   <p className="text-indigo-100 text-xs">
//                     Review and insert below
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

//             <div className="p-5">
//               <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 max-h-64 overflow-y-auto mb-5">
//                 <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
//                   {Airesponse}
//                 </p>
//               </div>
//               <div className="flex items-center justify-end mb-4">
//                 <span className="text-xs text-gray-400 flex items-center gap-1">
//                   <FaMagic className="w-3 h-3" />
//                   Generated by AI
//                 </span>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   onClick={() => setShowPopup(false)}
//                   className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                   type="button"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={insertAIResponse}
//                   className="flex-1 px-4 py-2.5 bg-linear-to-r from-indigo-600 to-indigo-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
//                   type="button"
//                 >
//                   <span>Insert Summary</span>
//                   <IoArrowForward className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SummaryForm;













// "use client";

// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useContext,
//   useCallback,
// } from "react";
// import dynamic from "next/dynamic";
// import { motion, AnimatePresence } from "framer-motion";
// import { CreateContext } from "@/app/context/CreateContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { API_URL } from "@/app/config/api";
// import {
//   IoArrowForward,
//   IoClose,
//   IoDiamondOutline,
//   IoSparkles,
// } from "react-icons/io5";
// import { FaRegLightbulb, FaStar, FaGem, FaMagic } from "react-icons/fa";
// import { FiCheckCircle, FiShield, FiX, FiXCircle } from "react-icons/fi";
// import { Stepper, TipsModal } from "@/app/components/resume";
// import api from "@/app/utils/api";
// import apiClient from "@/app/utils/apiClient";

// // Dynamically import Editor to avoid SSR issues
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

// const SummaryForm = () => {
//   const UseContext = useContext(CreateContext);
//   const contactId = UseContext?.contact.contactId || UseContext?.contact._id;

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
//   const [Airesponse, setAiresponse] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [summaryTipsClicked, setSummaryTipsClicked] = useState(false);
//   const router = useRouter();
//   const latestResumeId = getLocalStorage("latest_resume_id");

//   // NEW: Custom prompt state
//   const [showPromptInput, setShowPromptInput] = useState<boolean>(false);
//   const [userPrompt, setUserPrompt] = useState<string>("");

//   const filteredExperiences =
//     experiences?.map((exp) => ({
//       job_title: exp.jobTitle,
//       company: exp.employer,
//       start_date: exp.startDate,
//       end_date: exp.endDate,
//     })) || [];

//   const filteredEducation =
//     education?.map((edu) => ({
//       degree: edu.degree,
//       institution: edu.schoolname,
//       year: edu.year,
//     })) || [];

//   const filteredSkills = skills?.text
//     ? (skills.text.match(/<li>(.*?)<\/li>/g) || [])
//         .map((item: string) => item.replace(/<\/?li>/g, "").trim())
//         .filter(Boolean)
//     : [];

//   const formData = {
//     experiences: filteredExperiences,
//     education: filteredEducation,
//     skills: filteredSkills,
//   };

//   const saveToAPI = async (summaryText: string) => {
//     setIsSaving(true);

//     try {
//       const singlePayload = {
//         section_name: "summary",
//         section_payload: summaryText,
//       };

//       const response = await apiClient.patch(
//         `/user-resumes/${latestResumeId}`,
//         singlePayload,
//       );

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

//   const handleTextChange = (htmlValue: string) => {
//     setSummary(htmlValue);
//   };

//   // UPDATED: handleSubmitAi now accepts optional prompt
//   const handleSubmitAi = async (
//     e?: React.MouseEvent,
//     prompt?: string,
//   ) => {
//     if (e) e.preventDefault();

//     // NEW: Guard against >1000 char prompts
//     if (prompt && prompt.length > 1000) {
//       toast.error("Prompt is too long. Maximum 1000 characters allowed.");
//       return;
//     }

//     setLoading(true);
//     setAiresponse(null);

//     try {
//       const payload: {
//         experiences: typeof filteredExperiences;
//         education: typeof filteredEducation;
//         skills: string[];
//         prompt?: string;
//       } = {
//         ...formData,
//       };

//       if (prompt && prompt.trim() !== "") {
//         payload.prompt = prompt.trim();
//       }

//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/resume/summary`,
//         payload,
//       );

//       setAiresponse(response.data?.summary || "");
//       setShowPopup(true);

//       return true;
//     } catch (err: any) {
//       setErrors(err);
//       console.error("Error sending message:", err);
//       return false;
//     } finally {
//       setLoading(false);
//       setShowPromptInput(false);
//       setUserPrompt("");
//     }
//   };

//   const insertAIResponse = () => {
//     if (Airesponse) {
//       setShowPopup(false);
//       setSummary(Airesponse);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50/40">
//       <Stepper onBeforeNavigate={() => saveToAPI(summary)} />

//       {/* Scrollable Content Area */}
//       <div className="flex-1 overflow-y-auto">
//         <div className=" mx-auto px-2 py-6 sm:py-8 lg:py-10">
//           {/* Header Section */}
//           <div className="text-center mb-6 sm:mb-8">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
//               Professional Summary
//             </h1>

//             <p className="text-gray-500 text-sm max-w-md mx-auto">
//               Write a compelling introduction that highlights your experience
//               and skills
//             </p>

//             <button
//               onClick={() => setSummaryTipsClicked(true)}
//               className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
//             >
//               <FaRegLightbulb className="w-3 h-3" />
//               <span>Summary Tips</span>
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
//                       Professional Summary
//                     </h2>
//                     <p className="text-xs sm:text-sm text-gray-500">
//                       Tell your professional story
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
//             <div className="p-4 sm:p-6">
//               <div className="bg-white overflow-hidden ">
//                 {/* Editor Content */}
//                 <div className="p-4 sm:p-5 space-y-4 sm:space-y-5">
//                   {/* AI Actions Row */}
//                   <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-2">
//                     {/* Custom Prompt Toggle Button */}
//                     <div className="relative inline-block group self-end sm:self-auto">
//                       <button
//                         onClick={() => {
//                           setShowPromptInput((prev) => !prev);
//                           setUserPrompt("");
//                         }}
//                         disabled={loading}
//                         className={`inline-flex cursor-pointer items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                           showPromptInput
//                             ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
//                             : "bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300"
//                         }`}
//                         type="button"
//                       >
//                         <svg
//                           className="w-4 h-4"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                           />
//                         </svg>
//                         {showPromptInput ? "Close Prompt" : "Custom Prompt"}
//                       </button>
//                     </div>

//                     {/* Generate with AI Button */}
//                     <div className="relative inline-block group self-end sm:self-auto">
//                       <button
//                         onClick={(e) => handleSubmitAi(e)}
//                         disabled={loading}
//                         className={`inline-flex cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                           loading
//                             ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                             : "bg-linear-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-lg"
//                         }`}
//                         type="button"
//                       >
//                         {loading ? (
//                           <>
//                             <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//                             <span>Generating AI Summary...</span>
//                           </>
//                         ) : (
//                           <>
//                             <FaMagic className="w-4 h-4" />
//                             <span>Generate with AI</span>
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   {/* Inline Custom Prompt Panel */}
//                   <AnimatePresence>
//                     {showPromptInput && (
//                       <motion.div
//                         initial={{
//                           opacity: 0,
//                           height: 0,
//                           marginBottom: 0,
//                         }}
//                         animate={{
//                           opacity: 1,
//                           height: "auto",
//                           marginBottom: 4,
//                         }}
//                         exit={{
//                           opacity: 0,
//                           height: 0,
//                           marginBottom: 0,
//                         }}
//                         transition={{ duration: 0.25, ease: "easeInOut" }}
//                         className="overflow-hidden"
//                       >
//                         <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-3 sm:p-4">
//                           <div className="flex items-start gap-2 mb-2">
//                             <div className="p-1 bg-indigo-100 rounded-md shrink-0 mt-0.5">
//                               <IoSparkles className="w-3.5 h-3.5 text-indigo-600" />
//                             </div>
//                             <div className="flex-1">
//                               <p className="text-xs font-semibold text-indigo-900 mb-0.5">
//                                 Tell AI what to focus on
//                               </p>
//                               <p className="text-[11px] text-indigo-600/80 leading-snug">
//   e.g., Focus on years of experience, top skills, and measurable
//   career highlights.
// </p>
//                             </div>
//                           </div>

//                           <textarea
//                             value={userPrompt}
//                             onChange={(e) => setUserPrompt(e.target.value)}
//                             placeholder="Type your custom prompt here..."
//                             rows={3}
//                             className="w-full px-3 py-2.5 bg-white border-2 border-indigo-200 rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
//                             maxLength={1000}
//                           />

//                           <div className="flex items-center justify-between mt-2.5">
//                             <span
//                               className={`text-[10px] ${
//                                 userPrompt.length > 900
//                                   ? userPrompt.length >= 1000
//                                     ? "text-red-500 font-semibold"
//                                     : "text-amber-500"
//                                   : "text-gray-500"
//                               }`}
//                             >
//                               {userPrompt.length}/1000
//                             </span>
//                             <div className="flex items-center gap-2">
//                               <button
//                                 onClick={() => {
//                                   setShowPromptInput(false);
//                                   setUserPrompt("");
//                                 }}
//                                 className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
//                                 type="button"
//                               >
//                                 Cancel
//                               </button>
//                               <button
//                                 onClick={(e) =>
//                                   handleSubmitAi(e, userPrompt)
//                                 }
//                                 disabled={
//                                   loading || userPrompt.trim() === ""
//                                 }
//                                 className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
//                                   loading || userPrompt.trim() === ""
//                                     ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                                     : "bg-linear-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-md cursor-pointer"
//                                 }`}
//                                 type="button"
//                               >
//                                 <svg
//                                   className={`w-3 h-3 ${
//                                     loading ? "animate-spin" : ""
//                                   }`}
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M13 10V3L4 14h7v7l9-11h-7z"
//                                   />
//                                 </svg>
//                                 {loading ? "Generating..." : "Generate"}
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   {/* Editor Area */}
//                   <div>
//                     <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
//                       Your Summary
//                     </label>
//                     <Editor
//                       className="rounded-lg bg-white border border-gray-200 overflow-hidden"
//                       value={summary || ""}
//                       onTextChange={(e: any) => handleTextChange(e.htmlValue)}
//                       headerTemplate={
//                         <div className="flex gap-1 p-2 flex-wrap items-center bg-gray-50 border-b border-gray-200">
//                           <button
//                             type="button"
//                             className="ql-bold p-1.5 hover:bg-gray-200 rounded transition"
//                           >
//                             B
//                           </button>
//                           <button
//                             type="button"
//                             className="ql-italic p-1.5 hover:bg-gray-200 rounded transition"
//                           >
//                             I
//                           </button>
//                           <button
//                             type="button"
//                             className="ql-underline p-1.5 hover:bg-gray-200 rounded transition"
//                           >
//                             U
//                           </button>
//                           <button
//                             type="button"
//                             className="ql-clean p-1.5 hover:bg-gray-200 rounded transition"
//                           >
//                             ⌫
//                           </button>
//                         </div>
//                       }
//                       style={{
//                         height: "200px",
//                         minHeight: "200px",
//                         background: "white",
//                       }}
//                     />
//                   </div>

//                   {/* Error Message */}
//                   {errors?.text && (
//                     <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
//                       <div className="p-1 bg-red-100 rounded-lg">
//                         <svg
//                           className="w-3.5 h-3.5 text-red-600"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                       </div>
//                       <p className="text-red-600 text-xs font-medium">
//                         {errors.text}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sticky Footer Buttons */}
//       <div className="sticky bottom-0 z-20 bg-white/75 backdrop-blur-md border-t border-gray-100 shadow-lg shadow-gray-200/50">
//         <div className=" mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-4">
//           <div className="flex justify-between items-center gap-3 sm:gap-4">
//             {/* Back Button */}
//             <button
//               className="group px-4 sm:px-5 py-2.5 sm:py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl hover:bg-indigo-50/50 cursor-pointer"
//               onClick={() => router.push("/resume-details/project")}
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
//               <span className="hidden sm:inline">Back to Projects</span>
//               <span className="inline sm:hidden">Back</span>
//             </button>

//             {/* Continue Button */}
//             <button
//               className="group relative px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium md:font-semibold text-white rounded-lg md:rounded-xl shadow-lg transition-all duration-300 overflow-hidden whitespace-nowrap cursor-pointer"
//               onClick={() => {
//                 saveToAPI(summary).then(() =>
//                   router.push("/resume-details/finalize"),
//                 );
//               }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:from-indigo-500 group-hover:via-indigo-400 group-hover:to-indigo-500"></div>

//               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
//               </div>

//               <div className="relative flex items-center justify-center gap-2">
//                 <span>Continue to Finalize</span>
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

//       <TipsModal
//         isOpen={summaryTipsClicked}
//         onClose={() => setSummaryTipsClicked(false)}
//         title="Summary Tips"
//         subtitle="Write a compelling introduction"
//         hasAI={true}
//         aiFeatureDescription="get a professionally written summary based on your experience."
//         proTip="Your summary is the first thing recruiters read — make it count in 3-5 sentences"
//         bestPractices={[
//           {
//             tip: "Keep it short (3-5 sentences)",
//             example: "Recruiters read quickly",
//           },
//           {
//             tip: "Focus on your best experience",
//             example: "Talk about your main jobs",
//           },
//           {
//             tip: "Add numbers to show success",
//             example: "Made processes 40% faster",
//           },
//         ]}
//         avoidList={[
//           "Writing long paragraphs (more than 5 sentences)",
//           "Using overused words like 'hardworking'",
//           "Using 'I', 'me', 'my' too much",
//         ]}
//         examples={{
//           before:
//             "I am a hard worker. I know many skills. I want to learn and grow. I am good at my job.",
//           after:
//             "Senior Software Engineer with 8+ years of experience. Led 5+ developers, delivered 15+ projects, and improved efficiency by 40%.",
//         }}
//       />

//       {/* AI Response Popup */}
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
//                     AI-Generated Summary
//                   </h2>
//                   <p className="text-indigo-100 text-xs">
//                     Review and insert below
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

//             <div className="p-5">
//               <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 max-h-64 overflow-y-auto mb-5">
//                 <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
//                   {Airesponse}
//                 </p>
//               </div>
//               <div className="flex items-center justify-end mb-4">
//                 <span className="text-xs text-gray-400 flex items-center gap-1">
//                   <FaMagic className="w-3 h-3" />
//                   Generated by AI
//                 </span>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   onClick={() => setShowPopup(false)}
//                   className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                   type="button"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={insertAIResponse}
//                   className="flex-1 px-4 py-2.5 bg-linear-to-r from-indigo-600 to-indigo-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
//                   type="button"
//                 >
//                   <span>Insert Summary</span>
//                   <IoArrowForward className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
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
import { getLocalStorage, setLocalStorage } from "@/app/utils";
import { API_URL } from "@/app/config/api";
import {
  IoArrowForward,
  IoClose,
  IoDiamondOutline,
  IoSparkles,
} from "react-icons/io5";
import { FaRegLightbulb, FaStar, FaGem, FaMagic } from "react-icons/fa";
import { FiCheckCircle, FiShield, FiX, FiXCircle } from "react-icons/fi";
import { Stepper, TipsModal } from "@/app/components/resume";
import api from "@/app/utils/api";
import apiClient from "@/app/utils/apiClient";

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

const SummaryForm = () => {
  const UseContext = useContext(CreateContext);
  const contactId = UseContext?.contact.contactId || UseContext?.contact._id;

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
  const router = useRouter();
  const latestResumeId = getLocalStorage("latest_resume_id");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Custom prompt state
  const [showPromptInput, setShowPromptInput] = useState<boolean>(false);
  const [userPrompt, setUserPrompt] = useState<string>("");

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredExperiences =
    experiences?.map((exp) => ({
      job_title: exp.jobTitle,
      company: exp.employer,
      start_date: exp.startDate,
      end_date: exp.endDate,
    })) || [];

  const filteredEducation =
    education?.map((edu) => ({
      degree: edu.degree,
      institution: edu.schoolname,
      year: edu.year,
    })) || [];

  const filteredSkills = skills?.text
    ? (skills.text.match(/<li>(.*?)<\/li>/g) || [])
        .map((item: string) => item.replace(/<\/?li>/g, "").trim())
        .filter(Boolean)
    : [];

  const formData = {
    experiences: filteredExperiences,
    education: filteredEducation,
    skills: filteredSkills,
  };

  const saveToAPI = async (summaryText: string) => {
    setIsSaving(true);

    try {
      const singlePayload = {
        section_name: "summary",
        section_payload: summaryText,
      };

      const response = await apiClient.patch(
        `/user-resumes/${latestResumeId}`,
        singlePayload,
      );

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

  const handleTextChange = (htmlValue: string) => {
    setSummary(htmlValue);
  };

  // handleSubmitAi with prompt support
  const handleSubmitAi = async (
    e?: React.MouseEvent,
    prompt?: string,
  ) => {
    if (e) e.preventDefault();

    // Guard against >1000 char prompts
    if (prompt && prompt.length > 1000) {
      toast.error("Prompt is too long. Maximum 1000 characters allowed.");
      return;
    }

    setLoading(true);
    setAiresponse(null);

    try {
      const payload: {
        experiences: typeof filteredExperiences;
        education: typeof filteredEducation;
        skills: string[];
        prompt?: string;
      } = {
        ...formData,
      };

      if (prompt && prompt.trim() !== "") {
        payload.prompt = prompt.trim();
      }

      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/resume/summary`,
        payload,
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
      setShowPromptInput(false);
      setUserPrompt("");
    }
  };

  const insertAIResponse = () => {
    if (Airesponse) {
      setShowPopup(false);
      setSummary(Airesponse);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50/40">
      <Stepper onBeforeNavigate={() => saveToAPI(summary)} />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto px-3 sm:px-4 lg:px-2 py-4 sm:py-6 lg:py-10">
          {/* Header Section */}
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1.5 sm:mb-2">
              Professional Summary
            </h1>

            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto px-2">
              Write a compelling introduction that highlights your experience
              and skills
            </p>

            <button
              onClick={() => setSummaryTipsClicked(true)}
              className="mt-3 sm:mt-4 inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 bg-linear-to-r from-amber-400 to-orange-400 text-white rounded-full text-[11px] sm:text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <FaRegLightbulb className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Summary Tips</span>
            </button>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="relative px-3 sm:px-6 lg:px-8 py-3 sm:py-5 lg:py-6 bg-linear-to-r from-indigo-50 to-white border-b border-gray-100">
              <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-indigo-100 rounded-full filter blur-3xl opacity-50"></div>
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-xl">
                    <IoDiamondOutline className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-lg font-semibold text-gray-900">
                      Professional Summary
                    </h2>
                    <p className="text-[11px] sm:text-sm text-gray-500">
                      Tell your professional story
                    </p>
                  </div>
                </div>
                {isSaving && (
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full self-start sm:self-auto">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] sm:text-xs text-indigo-700 font-medium">
                      Saving...
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Form Content */}
            {/* <div className="p-3 sm:p-6"> */}
              <div className="bg-white overflow-hidden">
                {/* Editor Content */}
                <div className="p-3 sm:p-5 space-y-3.5 sm:space-y-5">
                  {/* AI Actions Row */}
                  <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-2">
                    {/* Custom Prompt Toggle Button */}
                    <div className="relative inline-block group self-end sm:self-auto">
                      <button
                        onClick={() => {
                          setShowPromptInput((prev) => !prev);
                          setUserPrompt("");
                        }}
                        disabled={loading}
                        className={`inline-flex cursor-pointer items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-sm font-medium transition-all duration-200 ${
                          showPromptInput
                            ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                            : "bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300"
                        }`}
                        type="button"
                      >
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        {showPromptInput ? "Close Prompt" : "Custom Prompt"}
                      </button>
                    </div>

                    {/* Generate with AI Button */}
                    <div className="relative inline-block group self-end sm:self-auto">
                      <button
                        onClick={(e) => handleSubmitAi(e)}
                        disabled={loading}
                        className={`inline-flex cursor-pointer items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-sm font-medium transition-all duration-200 ${
                          loading
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-linear-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-lg"
                        }`}
                        type="button"
                      >
                        {loading ? (
                          <>
                            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                            <span>Generating AI Summary...</span>
                          </>
                        ) : (
                          <>
                            <FaMagic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span>Generate with AI</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Inline Custom Prompt Panel */}
                  <AnimatePresence>
                    {showPromptInput && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                          marginBottom: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          marginBottom: 4,
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          marginBottom: 0,
                        }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-2.5 sm:p-3 lg:p-4">
                          <div className="flex items-start gap-2 mb-2">
                            <div className="p-1 bg-indigo-100 rounded-md shrink-0 mt-0.5">
                              <IoSparkles className="w-3.5 h-3.5 text-indigo-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-indigo-900 mb-0.5">
                                Tell AI what to focus on
                              </p>
                              <p className="text-[11px] text-indigo-600/80 leading-snug">
                                e.g., Focus on years of experience, top skills,
                                and measurable career highlights.
                              </p>
                            </div>
                          </div>

                          <textarea
                            value={userPrompt}
                            onChange={(e) => setUserPrompt(e.target.value)}
                            placeholder="Type your custom prompt here..."
                            rows={3}
                            className="w-full px-3 py-2 sm:py-2.5 bg-white border-2 border-indigo-200 rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                            maxLength={1000}
                          />

                          <div className="flex items-center justify-between mt-2 sm:mt-2.5">
                            <span
                              className={`text-[10px] ${
                                userPrompt.length > 900
                                  ? userPrompt.length >= 1000
                                    ? "text-red-500 font-semibold"
                                    : "text-amber-500"
                                  : "text-gray-500"
                              }`}
                            >
                              {userPrompt.length}/1000
                            </span>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <button
                                onClick={() => {
                                  setShowPromptInput(false);
                                  setUserPrompt("");
                                }}
                                className="px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
                                type="button"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={(e) =>
                                  handleSubmitAi(e, userPrompt)
                                }
                                disabled={
                                  loading || userPrompt.trim() === ""
                                }
                                className={`inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all duration-200 ${
                                  loading || userPrompt.trim() === ""
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-linear-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-md cursor-pointer"
                                }`}
                                type="button"
                              >
                                <svg
                                  className={`w-3 h-3 ${
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
                                {loading ? "Generating..." : "Generate"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Editor Area */}
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                      Your Summary
                    </label>
                    <Editor
                      className="rounded-lg bg-white border border-gray-200 overflow-hidden"
                      value={summary || ""}
                      onTextChange={(e: any) => handleTextChange(e.htmlValue)}
                      headerTemplate={
                        <div className="flex gap-1 p-1.5 sm:p-2 flex-wrap items-center bg-gray-50 border-b border-gray-200">
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
                            className="ql-clean p-1.5 hover:bg-gray-200 rounded transition"
                          >
                            ⌫
                          </button>
                        </div>
                      }
                      style={{
                        height: isMobile ? "160px" : "200px",
                        minHeight: isMobile ? "160px" : "200px",
                        background: "white",
                      }}
                    />
                  </div>

                  {/* Error Message */}
                  {errors?.text && (
                    <div className="flex items-center gap-2 p-2.5 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="p-1 bg-red-100 rounded-lg shrink-0">
                        <svg
                          className="w-3.5 h-3.5 text-red-600"
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
                      <p className="text-red-600 text-xs font-medium">
                        {errors.text}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* Sticky Footer Buttons */}
      <div className="sticky bottom-0 z-20 bg-white/75 backdrop-blur-md border-t border-gray-100 shadow-lg shadow-gray-200/50">
        <div className="mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4">
          <div className="flex justify-between items-center gap-2 sm:gap-4">
            {/* Back Button */}
            <button
              className="group px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl hover:bg-indigo-50/50 cursor-pointer"
              onClick={() => router.push("/resume-details/project")}
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1"
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
              <span className="hidden sm:inline">Back to Projects</span>
              <span className="inline sm:hidden">Back</span>
            </button>

            {/* Continue Button */}
            <button
              className="group relative px-4 sm:px-8 py-2 sm:py-3 text-xs sm:text-base font-medium md:font-semibold text-white rounded-lg md:rounded-xl shadow-lg transition-all duration-300 overflow-hidden whitespace-nowrap cursor-pointer"
              onClick={() => {
                saveToAPI(summary).then(() =>
                  router.push("/resume-details/finalize"),
                );
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:from-indigo-500 group-hover:via-indigo-400 group-hover:to-indigo-500"></div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
              </div>

              <div className="relative flex items-center justify-center gap-1.5 sm:gap-2">
                <span className="hidden xs:inline">Continue to Finalize</span>
                <span className="inline xs:hidden">Continue</span>
                <svg
                  className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
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

      <TipsModal
        isOpen={summaryTipsClicked}
        onClose={() => setSummaryTipsClicked(false)}
        title="Summary Tips"
        subtitle="Write a compelling introduction"
        hasAI={true}
        aiFeatureDescription="get a professionally written summary based on your experience."
        proTip="Your summary is the first thing recruiters read — make it count in 3-5 sentences"
        bestPractices={[
          {
            tip: "Keep it short (3-5 sentences)",
            example: "Recruiters read quickly",
          },
          {
            tip: "Focus on your best experience",
            example: "Talk about your main jobs",
          },
          {
            tip: "Add numbers to show success",
            example: "Made processes 40% faster",
          },
        ]}
        avoidList={[
          "Writing long paragraphs (more than 5 sentences)",
          "Using overused words like 'hardworking'",
          "Using 'I', 'me', 'my' too much",
        ]}
        examples={{
          before:
            "I am a hard worker. I know many skills. I want to learn and grow. I am good at my job.",
          after:
            "Senior Software Engineer with 8+ years of experience. Led 5+ developers, delivered 15+ projects, and improved efficiency by 40%.",
        }}
      />

      {/* AI Response Popup */}
      {showPopup && Airesponse && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
          >
            <div className="bg-linear-to-r from-indigo-600 to-indigo-500 px-4 sm:px-5 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-white">
                    AI-Generated Summary
                  </h2>
                  <p className="text-indigo-100 text-[11px] sm:text-xs">
                    Review and insert below
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

            <div className="p-3 sm:p-5">
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-3 sm:p-4 max-h-64 overflow-y-auto mb-4 sm:mb-5">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {Airesponse}
                </p>
              </div>
              <div className="flex items-center justify-end mb-3 sm:mb-4">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <FaMagic className="w-3 h-3" />
                  Generated by AI
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <button
                  onClick={() => setShowPopup(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={insertAIResponse}
                  className="flex-1 px-4 py-2.5 bg-linear-to-r from-indigo-600 to-indigo-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
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