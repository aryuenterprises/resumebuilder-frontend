// "use client";

// import { useContext, useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { CreateContext } from "@/app/context/CreateContext";
// import { templateData } from "@/app/data";
// import { Template } from "@/app/types";
// import Header from "@/app/components/layouts/Header";
// import Footer from "@/app/components/layouts/Footer";
// import {
//   convertParsedResumeToFrontendFormat,
//   getLocalStorage,
//   removeSessionStorage,
//   setLocalStorage,
// } from "@/app/utils";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Sparkles,
//   FileText,
//   Upload,
//   X,
//   CheckCircle,
//   ArrowRight,
//   Star,
//   Download,
//   Eye,
//   Lock,
//   Crown,
//   AlertCircle,
//   ChevronRight,
//   Maximize2,
//   Gift,
//   Zap,
//   TrendingUp,
// } from "lucide-react";
// import { LuUsers } from "react-icons/lu";
// import { PiReadCvLogo } from "react-icons/pi";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { IoRocket } from "react-icons/io5";
// import axios from "axios";
// import { API_URL } from "@/app/config/api";
// import { User } from "@/app/types/user.types";
// import toast, { Toaster } from "react-hot-toast";
// import { ResumePreviewModal } from "@/app/components/resume";
// import api from "@/app/utils/api";

// const PLAN_CONFIG = {
//   no_plan: {
//     maxTemplates: 0,
//     label: "No Plan",
//     color: "from-gray-500 to-gray-600",
//     badgeColor: "bg-gray-100 text-gray-700",
//     canUpload: false,
//   },
//   free: {
//     maxTemplates: 1,
//     label: "Free",
//     color: "from-slate-500 to-slate-600",
//     badgeColor: "bg-slate-100 text-slate-700",
//     canUpload: false,
//   },
//   pro: {
//     maxTemplates: 3,
//     label: "Pro",
//     color: "from-indigo-600 to-indigo-500",
//     badgeColor: "bg-indigo-100 text-indigo-700",
//     canUpload: false,
//   },
//   premium: {
//     maxTemplates: Infinity,
//     label: "Premium",
//     color: "from-purple-500 to-indigo-600",
//     badgeColor: "bg-purple-100 text-purple-700",
//     canUpload: true,
//   },
// };

// const getRequiredPlanForTemplate = (
//   index: number,
// ): keyof typeof PLAN_CONFIG => {
//   if (index < PLAN_CONFIG.free.maxTemplates) return "free";
//   if (index < PLAN_CONFIG.pro.maxTemplates) return "pro";
//   return "premium";
// };

// function Choose_template() {
//   const router = useRouter();
//   const {
//     setContact,
//     setEducation,
//     setExperiences,
//     setSkills,
//     setSummary,
//     setFinalize,
//     setProjects,
//     setFullResumeData,
//     setChosenTemplate,
//     setIsUploadMode,
//     clearUploadMode,
//   } = useContext(CreateContext);

//   removeSessionStorage("oldRouteNameDashboard");
//   removeSessionStorage("editingResumeIdAndData");

//   const uploadAbortController = useRef<AbortController | null>(null);
//   const [usersCurrentPlan, setUsersCurrentPlan] = useState<string | null>(null);
//   const [showUpgradePopup, setShowUpgradePopup] = useState(false);
//   const [selectedLockedTemplate, setSelectedLockedTemplate] = useState<{
//     template: Template;
//     requiredPlan: string;
//   } | null>(null);
//   const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const [showInitialPopup, setShowInitialPopup] = useState(true);
//   const [showUploadPopup, setShowUploadPopup] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadStatus, setUploadStatus] = useState<string>("idle");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isMobile, setIsMobile] = useState(false);
//   const [showLoginPrompt, setShowLoginPrompt] = useState(false);
//   const [showPlanRequiredPopup, setShowPlanRequiredPopup] = useState(false);
//   const [selectedTemplateForMobile, setSelectedTemplateForMobile] =
//     useState<Template | null>(null);

//   // Subscription expiration states
//   const [subscriptionStatus, setSubscriptionStatus] = useState<{
//     isExpired: boolean;
//     message: string;
//     daysExpired?: number;
//   } | null>(null);
//   const [showRenewalReminder, setShowRenewalReminder] = useState(false);
//   const [dismissedReminder, setDismissedReminder] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const clickresumedetails = (template: Template) => {
//     setChosenTemplate(template);
//     setLocalStorage("chosenTemplate", template);
//     router.push(`/resume-details/contact`);
//   };

//   const getCurrentPlan = (): keyof typeof PLAN_CONFIG => {
//     const userDetails = getLocalStorage<User>("user_details");

//     if (!userDetails?.id) {
//       return "no_plan";
//     }

//     // Even if expired, show their last plan but with limited access
//     const plan = usersCurrentPlan?.toLowerCase() || "";

//     if (!plan) {
//       return "no_plan";
//     }

//     if (plan.includes("pro")) return "pro";
//     if (plan.includes("premium")) return "premium";
//     if (plan.includes("free")) return "free";

//     return "no_plan";
//   };

//   // Check if user has active access (not expired)
//   const hasActiveAccess = (): boolean => {
//     const userDetails = getLocalStorage<User>("user_details");
//     if (!userDetails?.id) return false;
//     return !subscriptionStatus?.isExpired;
//   };

//   const canUserUpload = (): boolean => {
//     const currentPlan = getCurrentPlan();
//     // Show upload button but show friendly upgrade prompt when clicked
//     return currentPlan === "premium";
//   };

//   const isTemplateAccessible = (templateIndex: number): boolean => {
//     const userDetails = getLocalStorage<User>("user_details");

//     if (!userDetails?.id) {
//       return false;
//     }

//     // If expired, show templates as "locked" but with friendly renewal message
//     if (subscriptionStatus?.isExpired) {
//       return false;
//     }

//     const currentPlan = getCurrentPlan();
//     if (currentPlan === "no_plan") return false;

//     const maxTemplates = PLAN_CONFIG[currentPlan].maxTemplates;
//     return templateIndex < maxTemplates;
//   };

//   const getAvailableTemplatesCount = (): number => {
//     const currentPlan = getCurrentPlan();
//     if (currentPlan === "no_plan") return 0;

//     const maxTemplates = PLAN_CONFIG[currentPlan].maxTemplates;
//     return Math.min(maxTemplates, templateData.length);
//   };

//   const handleTemplateSelect = (template: Template, index: number) => {
//     const userDetails = getLocalStorage<User>("user_details");

//     if (!userDetails?.id) {
//       setShowLoginPrompt(true);
//       return;
//     }

//     // Show friendly renewal prompt instead of harsh error
//     if (subscriptionStatus?.isExpired) {
//       setSelectedLockedTemplate({
//         template,
//         requiredPlan: "Renew",
//       });
//       setShowUpgradePopup(true);
//       return;
//     }

//     if (isTemplateAccessible(index)) {
//       clickresumedetails(template);
//       clearUploadMode();
//     } else {
//       const requiredPlan = getRequiredPlanForTemplate(index);
//       setSelectedLockedTemplate({
//         template,
//         requiredPlan: PLAN_CONFIG[requiredPlan].label,
//       });
//       setShowUpgradePopup(true);
//     }
//   };

//   const handlePreview = (template: Template) => {
//     setPreviewTemplate(template);
//     setShowPreview(true);
//   };

//   const handleUploadClick = () => {
//     const userDetails = getLocalStorage<User>("user_details");

//     if (!userDetails?.id) {
//       setShowLoginPrompt(true);
//       return;
//     }

//     // Show friendly renewal prompt for expired users
//     if (subscriptionStatus?.isExpired) {
//       setShowPlanRequiredPopup(true);
//       return;
//     }

//     if (!canUserUpload()) {
//       setShowPlanRequiredPopup(true);
//       return;
//     }

//     setShowInitialPopup(false);
//     setShowUploadPopup(true);
//   };

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userDetails = getLocalStorage<User>("user_details");
//       const accessToken = getLocalStorage<string>("access_token");

//       if (!userDetails?.id || !accessToken) {
//         setUsersCurrentPlan(null);
//         setSubscriptionStatus(null);
//         return;
//       }

//       try {
//         const res = await api.get("/dashboard");
//         const { subscription } = res?.data;

//         // setUsersCurrentPlan("premium");
//         // Calculate days expired for friendly message
//         let daysExpired = 0;
//         if (subscription?.is_expired === true) {
//           // Assuming you have an expiry date, calculate days
//           if (subscription.plan_details.expires_at) {
//             const expiryDate = new Date(subscription.plan_details.expires_at);
//             const today = new Date();
//             daysExpired = Math.floor(
//               (today.getTime() - expiryDate.getTime()) / (1000 * 3600 * 24),
//             );
//           }

//           setSubscriptionStatus({
//             isExpired: true,
//             message: subscription.message || "Your premium access has ended",
//             daysExpired: daysExpired,
//           });

//           // Show a subtle, friendly reminder after 2 seconds (not immediately)
//           setTimeout(() => {
//             if (!dismissedReminder) {
//               setShowRenewalReminder(true);
//               // Auto-hide after 8 seconds
//               setTimeout(() => setShowRenewalReminder(false), 8000);
//             }
//           }, 2000);
//         } else {
//           setSubscriptionStatus({ isExpired: false, message: "" });
//           setUsersCurrentPlan(subscription.current_plan.toLowerCase());
//         }
//       } catch (err) {
//         console.error("Failed to fetch user data:", err);
//         setUsersCurrentPlan(null);
//         setSubscriptionStatus(null);

//         if (
//           axios.isAxiosError(err) &&
//           (err.response?.status === 401 || err.response?.status === 403)
//         ) {
//           localStorage.removeItem("access_token");
//           localStorage.removeItem("refresh_token");
//           localStorage.removeItem("user_details");
//         }
//       }
//     };

//     fetchUserData();
//   }, [dismissedReminder]);

//   const currentPlan = getCurrentPlan();
//   const availableTemplates = getAvailableTemplatesCount();
//   const totalTemplates = templateData.length;
//   const isUpgradeNeeded =
//     currentPlan !== "no_plan" && availableTemplates < totalTemplates;
//   const isPremiumUser = currentPlan === "premium";
//   const hasValidSubscription = hasActiveAccess();

//   useEffect(() => {
//     if (
//       showPreview ||
//       showInitialPopup ||
//       showUploadPopup ||
//       showUpgradePopup ||
//       showLoginPrompt ||
//       showPlanRequiredPopup ||
//       selectedTemplateForMobile
//     ) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }
//     return () => document.body.classList.remove("overflow-hidden");
//   }, [
//     showPreview,
//     showInitialPopup,
//     showUploadPopup,
//     showUpgradePopup,
//     showLoginPrompt,
//     showPlanRequiredPopup,
//     selectedTemplateForMobile,
//   ]);

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files[0];
//     if (file && isValidFileType(file)) {
//       handleFileUpload(file);
//     } else {
//       setErrorMessage("Please upload a PDF or DOCX file");
//     }
//   };

//   const handleCreateNew = () => {
//     const userDetails = getLocalStorage<User>("user_details");

//     if (!userDetails?.id) {
//       setShowLoginPrompt(true);
//       return;
//     }

//     setShowInitialPopup(false);
//   };

//   const isValidFileType = (file: File): boolean => {
//     const validTypes = [
//       "application/pdf",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ];
//     return validTypes.includes(file.type);
//   };

//   const handleFileUpload = async (file: File) => {
//     const maxSize = 10 * 1024 * 1024;

//     if (!isPremiumUser) {
//       setShowPlanRequiredPopup(true);
//       return;
//     }

//     if (subscriptionStatus?.isExpired) {
//       setShowPlanRequiredPopup(true);
//       return;
//     }

//     if (!isValidFileType(file)) {
//       setErrorMessage("Please upload a PDF or DOCX file");
//       return;
//     }

//     if (file.size > maxSize) {
//       setErrorMessage("File size must be less than 10MB");
//       return;
//     }

//     // Create new AbortController for this upload
//     if (uploadAbortController.current) {
//       uploadAbortController.current.abort();
//     }
//     uploadAbortController.current = new AbortController();

//     setIsUploading(true);
//     setUploadStatus("uploading");
//     setUploadedFile(file);
//     setErrorMessage("");

//     let progressInterval: NodeJS.Timeout | null = null;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       // Simulate progress
//       if (uploadStatus !== "error") {
//         progressInterval = setInterval(() => {
//           setUploadProgress((prev) => {
//             if (prev >= 90) {
//               if (progressInterval) clearInterval(progressInterval);
//               return 90;
//             }
//             return prev + 10;
//           });
//         }, 200);
//       }

//       setUploadStatus("processing");
//       setUploadProgress(100);

//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/resume/parse-resume`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           signal: uploadAbortController.current.signal,
//           onUploadProgress: (progressEvent) => {
//             if (progressEvent.total && uploadStatus !== "error") {
//               const percentCompleted = Math.round(
//                 (progressEvent.loaded * 100) / progressEvent.total,
//               );
//               setUploadProgress(percentCompleted);
//             }
//           },
//         },
//       );

//       if (progressInterval) clearInterval(progressInterval);

//       const parsedResumeData = response.data.parsed;
//       const convertedData =
//         convertParsedResumeToFrontendFormat(parsedResumeData);

//       if (convertedData.contact) setContact(convertedData.contact);
//       if (convertedData.experiences) setExperiences(convertedData.experiences);
//       if (convertedData.educations) setEducation(convertedData.educations);
//       if (convertedData.skills) setSkills(convertedData.skills);
//       if (convertedData.projects) setProjects(convertedData.projects);
//       if (convertedData.summary) setSummary(convertedData.summary);
//       if (convertedData.finalize) setFinalize(convertedData.finalize);

//       setFullResumeData({
//         contact: convertedData.contact,
//         experiences: convertedData.experiences,
//         education: convertedData.educations,
//         skills: convertedData.skills,
//         summary: convertedData.summary?.[0] || "",
//         finalize: convertedData.finalize || {},
//         projects: convertedData.projects || [],
//       });

//       const defaultTemplate = templateData[0];
//       setLocalStorage("chosenTemplate", defaultTemplate);
//       setChosenTemplate(defaultTemplate);
//       setIsUploadMode(true);
//       setUploadStatus("success");

//       toast.success("Resume uploaded and processed successfully!", {
//         duration: 3000,
//         style: { background: "#10b981", color: "#fff", borderRadius: "12px" },
//       });

//       setTimeout(() => {
//         setShowUploadPopup(false);
//         router.push(`/resume-details/contact`);
//         setTimeout(() => {
//           resetUploadState();
//         }, 500);
//       }, 2000);
//     } catch (err) {
//       if (progressInterval) clearInterval(progressInterval);

//       if (axios.isCancel(err)) {
//         console.log("Upload cancelled");
//         setUploadStatus("idle");
//         setErrorMessage("Upload cancelled");
//       } else {
//         console.error("Upload error:", err);
//         setUploadStatus("error");
//         setErrorMessage("Failed to parse resume. Please try again.");
//       }
//       setIsUploading(false);
//     }
//   };

//   const resetUploadPopup = () => {
//     // Abort any ongoing upload
//     if (uploadAbortController.current) {
//       uploadAbortController.current.abort();
//       uploadAbortController.current = null;
//     }

//     // Only close if not in critical uploading state
//     if (uploadStatus !== "uploading" && uploadStatus !== "processing") {
//       setShowUploadPopup(false);
//       resetUploadState();
//     } else {
//       // Show confirmation dialog before closing during upload
//       const confirmClose = window.confirm(
//         "Upload in progress. Are you sure you want to cancel?",
//       );
//       if (confirmClose) {
//         setShowUploadPopup(false);
//         resetUploadState();
//       }
//     }
//   };

//   const resetUploadState = () => {
//     setIsUploading(false);
//     setUploadedFile(null);
//     setUploadStatus("idle");
//     setUploadProgress(0);
//     setErrorMessage("");
//     setShowUploadPopup(false);
//     if (uploadAbortController.current) {
//       uploadAbortController.current.abort();
//       uploadAbortController.current = null;
//     }
//   };

//   // Add cleanup effect
//   useEffect(() => {
//     return () => {
//       // Cleanup on component unmount
//       if (uploadAbortController.current) {
//         uploadAbortController.current.abort();
//       }
//     };
//   }, []);

//   // Mobile Bottom Sheet Component
//   const MobileTemplateBottomSheet = ({
//     template,
//     onClose,
//   }: {
//     template: Template;
//     onClose: () => void;
//   }) => {
//     const templateIndex = templateData.findIndex((t) => t.id === template.id);
//     const isAccessible = isTemplateAccessible(templateIndex);
//     const requiredPlan = getRequiredPlanForTemplate(templateIndex);
//     const requiredPlanLabel = PLAN_CONFIG[requiredPlan].label;
//     const isPremium = requiredPlan !== "free";

//     const handleUseTemplate = () => {
//       if (isAccessible) {
//         handleTemplateSelect(template, templateIndex);
//         onClose();
//       } else {
//         const userDetails = getLocalStorage<User>("user_details");
//         if (!userDetails?.id) {
//           setShowLoginPrompt(true);
//           onClose();
//           return;
//         }
//         setSelectedLockedTemplate({
//           template,
//           requiredPlan: subscriptionStatus?.isExpired
//             ? "Renew"
//             : requiredPlanLabel,
//         });
//         setShowUpgradePopup(true);
//         onClose();
//       }
//     };

//     const handleFullPreview = () => {
//       handlePreview(template);
//     };

//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-md"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ y: "100%" }}
//           animate={{ y: 0 }}
//           exit={{ y: "100%" }}
//           transition={{ type: "spring", damping: 25, stiffness: 300 }}
//           className="w-full bg-white rounded-t-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh]"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
//             <div className="w-12 h-1 bg-gray-300 rounded-full" />
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             <div

//               className="relative h-48 sm:h-56 bg-gradient-to-r from-indigo-50 to-purple-50 mx-4 rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
//               onClick={handleFullPreview}
//             >
//               <Image
//                 src={template.image}
//                 alt={template?.style || "Template"}
//                 fill
//                 className="object-contain object-center p-2"
//               />
//               <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
//                 <div className="bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg">
//                   <Maximize2 className="w-5 h-5 text-indigo-600" />
//                 </div>
//               </div>
//             </div>

//             <div className="px-4 sm:px-5 pt-4 pb-6">
//               <div className="text-center mb-5">
//                 <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
//                   <h3 className="text-xl font-bold text-gray-900">
//                     {template.style || "Resume Template"}
//                   </h3>
//                   {isPremium && (
//                     <div
//                       className={`${PLAN_CONFIG[requiredPlan].badgeColor} px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1`}
//                     >
//                       {requiredPlan === "premium" ? (
//                         <Crown className="w-3 h-3" />
//                       ) : (
//                         <Star className="w-3 h-3" />
//                       )}
//                       <span>{requiredPlanLabel}</span>
//                     </div>
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-500">
//                   Professional ATS-friendly design that gets you noticed
//                 </p>
//               </div>

//               <div className="bg-gray-50 rounded-xl p-4 mb-6">
//                 <p className="text-xs font-semibold text-gray-700 mb-2">
//                   ✨ Template Features:
//                 </p>
//                 <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
//                   <div className="flex items-center gap-1.5">
//                     <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
//                     <span>ATS Optimized</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
//                     <span>Clean Layout</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
//                     <span>Professional Fonts</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
//                     <span>Easy to Edit</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-3 flex-wrap">
//                 <button
//                   onClick={handleFullPreview}
//                   className="flex-1 py-3 sm:py-3.5 rounded-xl bg-gray-100 text-gray-700 font-semibold px-2 text-xs sm:text-sm hover:bg-gray-200 transition flex items-center justify-center gap-2"
//                 >
//                   <Eye className="w-4 h-4" />
//                   Full Preview
//                 </button>
//                 <button
//                   onClick={handleUseTemplate}
//                   className={`flex-1 py-3 sm:py-3.5 rounded-xl text-white font-semibold px-2 text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
//                     isAccessible && !subscriptionStatus?.isExpired
//                       ? "bg-indigo-600 hover:bg-indigo-700"
//                       : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
//                   }`}
//                 >
//                   {isAccessible && !subscriptionStatus?.isExpired ? (
//                     <>

//                       <Sparkles className="w-4 h-4" />
//                       Use Template
//                     </>
//                   ) : subscriptionStatus?.isExpired ? (
//                     <>
//                       <Gift className="w-4 h-4" />
//                       Renew to Access
//                     </>
//                   ) : (
//                     <>
//                       <Lock className="w-4 h-4" />
//                       Unlock with {requiredPlanLabel}
//                     </>
//                   )}
//                 </button>
//               </div>

//               <button
//                 onClick={onClose}
//                 className="w-full mt-3 py-3 text-gray-500 text-sm font-medium hover:text-gray-700 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-indigo-50/20">
//       <Toaster position="top-right" />
//       <Header />

//       {/*  Renewal Reminder - Subtle, non-intrusive */}
//       <AnimatePresence>
//         {showRenewalReminder &&
//           subscriptionStatus?.isExpired &&
//           !dismissedReminder && (
//             <motion.div
//               initial={{ opacity: 0, y: -100 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -100 }}
//               className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md"
//             >
//               <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-orange-500 rounded-lg shadow-lg p-4">
//                 <div className="flex items-start gap-3">
//                   <div className="flex-shrink-0">
//                     <Gift className="w-5 h-5 text-orange-500" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-semibold text-gray-900">
//                       ✨ Miss having full access?
//                     </p>
//                     <p className="text-xs text-gray-600 mt-1">
//                       Your {usersCurrentPlan?.toUpperCase()} plan expired
//                       {subscriptionStatus.daysExpired
//                         ? ` ${subscriptionStatus.daysExpired} days ago`
//                         : ""}
//                       . Renew now to unlock all premium templates & features.
//                     </p>
//                     <div className="mt-2 flex gap-2">
//                       <button
//                         onClick={() => {
//                           setShowRenewalReminder(false);
//                           router.push("/choose-plan");
//                         }}
//                         className="text-xs bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition"
//                       >
//                         Renew Now
//                       </button>
//                       <button
//                         onClick={() => {
//                           setDismissedReminder(true);
//                           setShowRenewalReminder(false);
//                         }}
//                         className="text-xs text-gray-500 hover:text-gray-700"
//                       >
//                         Dismiss
//                       </button>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowRenewalReminder(false)}
//                     className="flex-shrink-0"
//                   >
//                     <X className="w-4 h-4 text-gray-400" />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//       </AnimatePresence>

//       {/* Initial Popup */}
//       <AnimatePresence>
//         {showInitialPopup && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl overflow-y-auto"
//             onClick={() => setShowInitialPopup(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20, opacity: 0 }}
//               animate={{ scale: 1, y: 0, opacity: 1 }}
//               exit={{ scale: 0.9, y: 20, opacity: 0 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full shadow-2xl mx-auto my-4 sm:my-6 md:my-8 overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="relative bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 pt-6 sm:pt-8 pb-5 sm:pb-6 md:pb-8 px-4 sm:px-6 md:px-8 text-white">
//                 <button
//                   onClick={() => setShowInitialPopup(false)}
//                   className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 p-1.5 sm:p-2 hover:bg-white/20 rounded-lg sm:rounded-xl transition-all duration-200 z-10"
//                 >
//                   <X className="w-4 h-4 sm:w-5 sm:h-5" />
//                 </button>

//                 <div className="text-center">
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//                     className="inline-flex items-center gap-1.5 max-sm:hidden sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full text-white text-[10px] sm:text-sm font-semibold mb-3 sm:mb-4"
//                   >
//                     <IoRocket className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <span>AI-POWERED RESUME BUILDER</span>
//                   </motion.div>
//                   <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 px-2">
//                     Let's Build Your Job Winning Resume
//                   </h2>
//                   <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-lg mx-auto px-2">
//                     Choose how you want to create your resume and get interview
//                     ready in minutes
//                   </p>
//                 </div>
//               </div>

//               <div className="overflow-y-auto max-h-[60vh] sm:max-h-[50vh] md:max-h-[55vh] lg:max-h-[60vh]">
//                 <div className="p-4 sm:p-6 md:p-8">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                     {/* Create New Resume Option */}
//                     <motion.div
//                       onClick={handleCreateNew}
//                       initial={{ x: -20, opacity: 0 }}
//                       animate={{ x: 0, opacity: 1 }}
//                       transition={{ delay: 0.3 }}
//                       whileHover={{ y: -5 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="group cursor-pointer rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/30 p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-300 border border-indigo-100"
//                     >
//                       <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
//                         <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
//                       </div>
//                       <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
//                         Create New Resume
//                       </h3>
//                       <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
//                         No experience? No problem. AI will build your resume
//                         with the right skills, projects, and format
//                       </p>
//                       <button className="flex items-center text-indigo-600 font-semibold text-sm sm:text-base group-hover:gap-2 transition-all cursor-pointer">
//                         Get started
//                         <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
//                       </button>
//                     </motion.div>

//                     {/* Upload Existing Resume Option */}
//                     <motion.div
//                       initial={{ x: 20, opacity: 0 }}
//                       animate={{ x: 0, opacity: 1 }}
//                       transition={{ delay: 0.4 }}
//                       whileHover={{ y: -5 }}
//                       whileTap={{ scale: 0.98 }}
//                       className={`rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300 ${
//                         isPremiumUser && !subscriptionStatus?.isExpired
//                           ? "group cursor-pointer bg-gradient-to-br from-purple-50 to-indigo-50/30 hover:shadow-xl border border-purple-100"
//                           : "bg-gray-100 opacity-80 border border-gray-200"
//                       }`}
//                       onClick={handleUploadClick}
//                     >
//                       <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
//                         {(!isPremiumUser || subscriptionStatus?.isExpired) && (
//                           <Lock className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white/70" />
//                         )}
//                         {isPremiumUser && !subscriptionStatus?.isExpired && (
//                           <Upload className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
//                         )}
//                       </div>
//                       <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
//                         {subscriptionStatus?.isExpired
//                           ? "Regain Access to AI Upload"
//                           : "Improve My Existing Resume"}
//                       </h3>
//                       <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
//                         {subscriptionStatus?.isExpired
//                           ? "Your subscription has ended. Renew to let AI optimize your resume instantly"
//                           : "Already have a resume? Upload it and let AI rewrite, fix, and optimize it for better results"}
//                       </p>
//                       {(!isPremiumUser || subscriptionStatus?.isExpired) && (
//                         <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1 mb-2">
//                           <Crown className="w-3 h-3 text-amber-600" />
//                           <span className="text-amber-700 text-xs font-medium">
//                             {subscriptionStatus?.isExpired
//                               ? "Renew to Continue"
//                               : "Premium Feature"}
//                           </span>
//                         </div>
//                       )}
//                       <button
//                         className={`flex items-center ${
//                           isPremiumUser && !subscriptionStatus?.isExpired
//                             ? "text-purple-600"
//                             : "text-gray-500"
//                         } font-semibold text-sm sm:text-base transition-all cursor-pointer`}
//                       >
//                         {isPremiumUser && !subscriptionStatus?.isExpired
//                           ? "Upload now"
//                           : subscriptionStatus?.isExpired
//                             ? "Renew Subscription →"
//                             : "Upgrade to use"}
//                         <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
//                       </button>
//                     </motion.div>
//                   </div>

//                   <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 text-center">
//                     <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-gray-500">
//                       <div className="flex items-center gap-1.5 sm:gap-2">
//                         <LuUsers className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500 shrink-0" />
//                         <span className="whitespace-nowrap">
//                           Built for freshers & experienced
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-1.5 sm:gap-2">
//                         <AiOutlineThunderbolt className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500 shrink-0" />
//                         <span className="whitespace-nowrap">AI powered</span>
//                       </div>
//                       <div className="flex items-center gap-1.5 sm:gap-2">
//                         <PiReadCvLogo className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500 shrink-0" />
//                         <span className="whitespace-nowrap">
//                           Ready in 3 minutes
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Login Prompt Popup */}
//       <AnimatePresence>
//         {showLoginPrompt && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl overflow-y-auto"
//             onClick={() => setShowLoginPrompt(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden my-4 sm:my-8"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 sm:p-6 md:p-8 text-center">
//                 <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                   <Lock className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
//                 </div>
//                 <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
//                   Login Required
//                 </h3>
//                 <p className="text-white/80 text-xs sm:text-sm">
//                   Please login or create an account to use this feature
//                 </p>
//               </div>
//               <div className="p-5 sm:p-6 text-center">
//                 <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
//                   Create a free account to access our templates and build your
//                   resume
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//                   <button
//                     onClick={() => setShowLoginPrompt(false)}
//                     className="flex-1 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all cursor-pointer text-xs sm:text-sm"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowLoginPrompt(false);
//                       router.push("/login");
//                     }}
//                     className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer text-xs sm:text-sm"
//                   >
//                     Login / Sign Up
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Friendly Renewal Required Popup - Positive framing */}
//       <AnimatePresence>
//         {(showPlanRequiredPopup ||
//           (showUpgradePopup &&
//             selectedLockedTemplate?.requiredPlan === "Renew")) && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl overflow-y-auto"
//             onClick={() => {
//               setShowPlanRequiredPopup(false);
//               setShowUpgradePopup(false);
//             }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden my-4 sm:my-8"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-5 sm:p-6 md:p-8 text-center">
//                 <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                   <Gift className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
//                 </div>
//                 <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
//                   {subscriptionStatus?.isExpired
//                     ? "Your Journey Continues Here!"
//                     : "Premium Feature"}
//                 </h3>
//                 <p className="text-white/80 text-xs sm:text-sm">
//                   {subscriptionStatus?.isExpired
//                     ? "Renew your subscription to unlock everything again"
//                     : "Unlock AI-powered resume optimization"}
//                 </p>
//               </div>
//               <div className="p-5 sm:p-6 text-center">
//                 <div className="mb-4 sm:mb-6">
//                   <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-4">
//                     <div className="flex items-center justify-center gap-2 mb-2">
//                       <Zap className="w-4 h-4 text-amber-600" />
//                       <span className="text-sm font-semibold text-gray-900">
//                         What you're missing:
//                       </span>
//                     </div>
//                     <div className="space-y-2 text-left">
//                       <div className="flex items-center gap-2 text-xs text-gray-700">
//                         <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
//                         <span>Upload & AI-optimize existing resumes</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-xs text-gray-700">
//                         <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
//                         <span>
//                           Access to all {totalTemplates} professional templates
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2 text-xs text-gray-700">
//                         <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
//                         <span>Priority support & faster processing</span>
//                       </div>
//                     </div>
//                   </div>

//                   <p className="text-gray-600 text-xs sm:text-sm">
//                     {subscriptionStatus?.isExpired
//                       ? `Your ${usersCurrentPlan?.toUpperCase()} plan gave you amazing results. Ready to continue your success story?`
//                       : "Upgrade to Premium to upload your existing resume and let our AI optimize it for better results"}
//                   </p>
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//                   <button
//                     onClick={() => {
//                       setShowPlanRequiredPopup(false);
//                       setShowUpgradePopup(false);
//                     }}
//                     className="flex-1 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all cursor-pointer text-xs sm:text-sm"
//                   >
//                     Maybe Later
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowPlanRequiredPopup(false);
//                       setShowUpgradePopup(false);
//                       router.push("/choose-plan");
//                     }}
//                     className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-amber-600 to-orange-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2"
//                   >
//                     <TrendingUp className="w-3.5 h-3.5" />
//                     {subscriptionStatus?.isExpired
//                       ? "Renew Now & Save 20%"
//                       : "Upgrade to Premium"}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Template Upgrade Popup (for non-expired users) */}
//       <AnimatePresence>
//         {showUpgradePopup &&
//           selectedLockedTemplate &&
//           selectedLockedTemplate.requiredPlan !== "Renew" && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl overflow-y-auto"
//               onClick={() => setShowUpgradePopup(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, y: 20 }}
//                 animate={{ scale: 1, y: 0 }}
//                 exit={{ scale: 0.9, y: 20 }}
//                 transition={{ type: "spring", damping: 25, stiffness: 300 }}
//                 className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden my-4 sm:my-8"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 sm:p-6 md:p-8 text-center relative overflow-hidden">
//                   <div className="relative">
//                     <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                       <Star className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
//                     </div>
//                     <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
//                       Unlock Premium Template
//                     </h3>
//                     <p className="text-white/80 text-xs sm:text-sm">
//                       Get access to {selectedLockedTemplate.requiredPlan}{" "}
//                       templates
//                     </p>
//                   </div>
//                 </div>
//                 <div className="p-5 sm:p-6 text-center">
//                   <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
//                     Upgrade your plan to unlock this template and boost your
//                     interview chances by 3x
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//                     <button
//                       onClick={() => setShowUpgradePopup(false)}
//                       className="flex-1 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all cursor-pointer text-xs sm:text-sm"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={() => {
//                         setShowUpgradePopup(false);
//                         router.push("/choose-plan");
//                       }}
//                       className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer text-xs sm:text-sm"
//                     >
//                       Upgrade Now
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//       </AnimatePresence>

//       {/* Upload Popup */}
//       <AnimatePresence>
//         {showUploadPopup && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl overflow-y-auto"
//             onClick={(e) => {
//               // Only close if clicking backdrop and not during critical upload
//               if (
//                 uploadStatus !== "uploading" &&
//                 uploadStatus !== "processing"
//               ) {
//                 resetUploadPopup();
//               }
//               e.stopPropagation();
//             }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-4 sm:my-8"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-4 sm:p-5 md:p-6 relative overflow-hidden">
//                 <div className="relative flex items-center justify-between gap-3">
//                   <div className="flex-1">
//                     <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
//                       Upload Your Resume
//                     </h2>
//                     <p className="text-white/80 text-xs sm:text-sm mt-0.5 sm:mt-1">
//                       Upload file to get started
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => {
//                       if (uploadAbortController.current) {
//                         uploadAbortController.current.abort();
//                         resetUploadState();
//                       }
//                     }}
//                     // disabled={
//                     //   uploadStatus === "uploading" ||
//                     //   uploadStatus === "processing"
//                     // }
//                     className={`p-1.5 sm:p-2 hover:bg-white/20 rounded-lg sm:rounded-xl transition flex-shrink-0 `}
//                   >
//                     <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                   </button>
//                 </div>
//               </div>

//               <div className="p-4 sm:p-5 md:p-6">
//                 <div
//                   className={`relative border-2 border-dashed rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 text-center transition-all duration-300 ${
//                     uploadStatus === "error"
//                       ? "border-red-500 bg-red-50/40"
//                       : uploadStatus === "success"
//                         ? "border-emerald-500 bg-emerald-50/40"
//                         : isDragging
//                           ? "border-indigo-500 bg-indigo-50"
//                           : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/30"
//                   }`}
//                   onDragOver={handleDragOver}
//                   onDragLeave={handleDragLeave}
//                   onDrop={handleDrop}
//                 >
//                   <input
//                     type="file"
//                     id="file-upload"
//                     className="hidden"
//                     accept=".pdf,.docx"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file && isValidFileType(file)) {
//                         handleFileUpload(file);
//                       } else if (file) {
//                         setErrorMessage("Please upload a PDF or DOCX file");
//                       }
//                       // Reset the input value to allow uploading the same file again
//                       e.target.value = "";
//                     }}
//                     disabled={
//                       uploadStatus === "uploading" ||
//                       uploadStatus === "processing"
//                     }
//                   />

//                   {isUploading || uploadStatus === "processing" ? (
//                     <div className="text-center">
//                       <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 relative">
//                         <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
//                         <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
//                       </div>
//                       <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
//                         {uploadStatus === "uploading"
//                           ? "Uploading"
//                           : "Processing"}
//                         ... {uploadProgress}%
//                       </p>
//                       <div className="w-full h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <motion.div
//                           className="h-full bg-gradient-to-r from-indigo-600 to-indigo-500"
//                           initial={{ width: 0 }}
//                           animate={{ width: `${uploadProgress}%` }}
//                           transition={{ duration: 0.3 }}
//                         />
//                       </div>
//                       <p className="text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-3">
//                         {uploadStatus === "uploading" &&
//                           "Uploading file to server..."}
//                         {uploadStatus === "processing" &&
//                           "Analyzing and extracting information..."}
//                       </p>
//                       <button
//                         onClick={() => {
//                           if (uploadAbortController.current) {
//                             uploadAbortController.current.abort();
//                             resetUploadState();
//                           }
//                         }}
//                         className="mt-3 px-3 py-1 text-xs text-red-600 hover:text-red-700 font-medium"
//                       >
//                         Cancel Upload
//                       </button>
//                     </div>
//                   ) : uploadedFile && uploadStatus === "success" ? (
//                     <div className="text-center">
//                       <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 bg-emerald-100 rounded-full flex items-center justify-center">
//                         <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-emerald-500" />
//                       </div>
//                       <p className="text-xs sm:text-sm font-medium text-gray-900 mb-0.5 sm:mb-1 break-all">
//                         {uploadedFile.name}
//                       </p>
//                       <p className="text-[10px] sm:text-xs text-gray-500">
//                         {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
//                       </p>
//                       <p className="text-[10px] sm:text-xs text-emerald-600 mt-1 sm:mt-2">
//                         ✓ Successfully processed
//                       </p>
//                     </div>
//                   ) : uploadStatus === "error" ? (
//                     <div className="text-center">
//                       <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-red-100 rounded-full flex items-center justify-center">
//                         <AlertCircle className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-red-600" />
//                       </div>
//                       <p className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
//                         Upload Failed
//                       </p>
//                       <p className="text-[11px] sm:text-xs text-red-600 mb-4">
//                         {errorMessage ||
//                           "Something went wrong. Please try again."}
//                       </p>
//                       <button
//                         onClick={() => {
//                           resetUploadState();
//                           document.getElementById("file-upload")?.click();
//                         }}
//                         className="px-4 sm:px-5 py-2 bg-red-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-red-700 transition"
//                       >
//                         Try Again
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="text-center">
//                       <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
//                         <Upload className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-indigo-600" />
//                       </div>
//                       <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
//                         Drop your file here
//                       </p>
//                       <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mb-3 sm:mb-4">
//                         Supports PDF and DOCX up to 10MB
//                       </p>
//                       <button
//                         onClick={() =>
//                           document.getElementById("file-upload")?.click()
//                         }
//                         disabled={
//                           uploadStatus === "uploading" ||
//                           uploadStatus === "processing"
//                         }
//                         className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer text-xs sm:text-sm"
//                       >
//                         Browse Files
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {uploadStatus === "error" && errorMessage && !isUploading && (
//                   <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl flex items-start gap-1.5 sm:gap-2">
//                     <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 mt-0.5 flex-shrink-0" />
//                     <p className="text-[11px] sm:text-xs text-red-600">
//                       {errorMessage}
//                     </p>
//                   </div>
//                 )}

//                 <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
//                   <button
//                     onClick={() => {
//                       if (uploadAbortController.current) {
//                         uploadAbortController.current.abort();
//                         resetUploadState();
//                       }
//                     }}
//                     // disabled={
//                     //   uploadStatus === "uploading" ||
//                     //   uploadStatus === "processing"
//                     // }
//                     className="flex-1 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all  cursor-pointer text-xs sm:text-sm"
//                   >
//                     Cancel
//                   </button>
//                   {uploadedFile && uploadStatus === "success" && (
//                     <button
//                       onClick={() => {
//                         setShowUploadPopup(false);
//                         router.push(`/resume-details/contact`);
//                       }}
//                       className="flex-1 py-2.5 sm:py-3 bg-emerald-500 text-white rounded-lg sm:rounded-xl font-medium hover:bg-emerald-600 transition-all cursor-pointer text-xs sm:text-sm"
//                     >
//                       Continue to Resume
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700">
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center"
//           >
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//               className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
//             >
//               <IoRocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//               <span>PROFESSIONAL TEMPLATES</span>
//             </motion.div>
//             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
//               Pick a Resume That
//               <span className="block bg-gradient-to-r from-yellow-300 to-amber-200 bg-clip-text text-transparent mt-1 sm:mt-2">
//                 Gets You Shortlisted
//               </span>
//             </h1>
//             <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto px-3">
//               Choose a template and let AI build your job-ready resume in
//               minutes
//             </p>

//             {/* Subtle status indicator - not intrusive */}
//             {subscriptionStatus?.isExpired ? (
//               <div className="mt-5 sm:mt-6 inline-flex items-center gap-1.5 sm:gap-2 bg-amber-500/20 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
//                 <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
//                 <span className="text-xs sm:text-sm text-white/85">
//                   Your {usersCurrentPlan?.toUpperCase()} access ended •{" "}
//                   <button
//                     onClick={() => setShowRenewalReminder(true)}
//                     className="underline hover:no-underline"
//                   >
//                     Renew to unlock
//                   </button>
//                 </span>
//               </div>
//             ) : usersCurrentPlan && currentPlan !== "no_plan" ? (
//               <div className="mt-5 sm:mt-6 inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
//                 <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300" />
//                 <span className="text-xs sm:text-sm capitalize text-white/85">
//                   {currentPlan} Plan • {availableTemplates} Templates Available
//                 </span>
//               </div>
//             ) : (
//               <div className="mt-5 sm:mt-6 inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
//                 <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300" />
//                 <span className="text-xs sm:text-sm text-white/85">
//                   Login to access templates
//                 </span>
//               </div>
//             )}

//             <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto mt-6 sm:mt-8">
//               <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4">
//                 <div className="text-lg sm:text-2xl font-bold text-white">
//                   {templateData.length}
//                 </div>
//                 <div className="text-[10px] sm:text-xs text-white/80">
//                   Total Templates
//                 </div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4">
//                 <div className="text-lg sm:text-2xl font-bold text-white">
//                   100%
//                 </div>
//                 <div className="text-[10px] sm:text-xs text-white/80">
//                   ATS-Friendly
//                 </div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4">
//                 <div className="text-lg sm:text-2xl font-bold text-white">
//                   3min
//                 </div>
//                 <div className="text-[10px] sm:text-xs text-white/80">
//                   Quick Setup
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg
//             viewBox="0 0 1440 100"
//             preserveAspectRatio="none"
//             className="w-full h-8 sm:h-10"
//           >
//             <path d="M0 100L1440 0V100H0Z" fill="white" />
//           </svg>
//         </div>
//       </div>

//       {/* Upload Button */}
//       <div className="text-center mt-6 sm:mt-8 px-4">
//         <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
//           {subscriptionStatus?.isExpired
//             ? "Your AI resume optimization is waiting"
//             : "Have a resume already? Improve it instantly"}
//         </p>
//         <button
//           onClick={handleUploadClick}
//           className={`inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all ${
//             subscriptionStatus?.isExpired
//               ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:scale-105"
//               : "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-lg hover:scale-105"
//           } group cursor-pointer`}
//         >
//           <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//           <span>
//             {subscriptionStatus?.isExpired
//               ? "Renew to Unlock AI Upload"
//               : "Upload & Improve"}
//           </span>
//           {!subscriptionStatus?.isExpired && isPremiumUser && (
//             <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
//           )}
//           {subscriptionStatus?.isExpired && (
//             <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//           )}
//           {!isPremiumUser && !subscriptionStatus?.isExpired && (
//             <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//           )}
//         </button>
//         {subscriptionStatus?.isExpired ? (
//           <p className="text-xs text-amber-600 mt-2">
//             ✨ Renew now and get 20% off on annual plans + free resume review
//           </p>
//         ) : (
//           !isPremiumUser && (
//             <p className="text-xs text-amber-600 mt-2">
//               💡 Upgrade to Premium to upload and improve your existing resume
//             </p>
//           )
//         )}
//       </div>

//       {/* Templates Section */}
//       <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-8 sm:mb-10">
//             <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
//               Select Your Resume Style
//             </h2>
//             <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2 px-3">
//               Simple, clean, and ATS-friendly templates designed to get you
//               interview calls
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//             {templateData?.map((template, index) => {
//               const isAccessible = isTemplateAccessible(index);
//               const requiredPlan = getRequiredPlanForTemplate(index);
//               const requiredPlanLabel = PLAN_CONFIG[requiredPlan].label;
//               const isPremium = requiredPlan !== "free";

//               return (
//                 <motion.div
//                   key={template.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{
//                     delay: Math.min(index * 0.1, 0.5),
//                     duration: 0.5,
//                   }}
//                   className="relative group"
//                 >
//                   <motion.div
//                     className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
//                     onClick={() => {
//                       if (isMobile) {
//                         setSelectedTemplateForMobile(template);
//                       }
//                     }}
//                   >
//                     <div className="relative bg-gray-50 p-3 sm:p-4">
//                       {isPremium && (
//                         <div
//                           className={`absolute top-2 sm:top-3 right-2 sm:right-3 ${
//                             subscriptionStatus?.isExpired
//                               ? "bg-amber-100 text-amber-700"
//                               : PLAN_CONFIG[requiredPlan].badgeColor
//                           } px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold z-10 flex items-center gap-0.5 sm:gap-1 shadow-sm`}
//                         >
//                           {requiredPlan === "premium" ? (
//                             <Crown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                           ) : (
//                             <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                           )}
//                           <span className="hidden xs:inline">
//                             {subscriptionStatus?.isExpired
//                               ? "Locked"
//                               : requiredPlanLabel}
//                           </span>

//                           <span className="xs:hidden">
//                             {subscriptionStatus?.isExpired
//                               ? "Locked"
//                               : requiredPlanLabel === "Pro Plus"
//                                 ? "Pro+"
//                                 : requiredPlanLabel === "Premium"
//                                   ? "Prem"
//                                   : requiredPlanLabel.substring(0, 3)}
//                           </span>
//                         </div>
//                       )}

//                       <div className="relative w-full h-56 xs:h-64 sm:h-72 md:h-80 lg:h-96">
//                         <Image
//                           src={template.image}
//                           alt={template?.style || "Template"}
//                           fill
//                           className={`object-contain object-top transition-transform duration-500 group-hover:scale-105 `}
//                           sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 33vw, 25vw"
//                         />

//                       </div>

//                       <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-100">
//                         <div className="flex gap-3 items-center justify-between flex-wrap xl:flex-nowrap">
//                           <div>
//                             <h4 className="text-sm sm:text-base font-semibold text-gray-900">
//                               {template.style || "Template"}
//                             </h4>
//                             <p className="text-[10px] sm:text-xs text-gray-500">
//                               {template.description || "Professional design"}
//                             </p>
//                           </div>
//                           {!isMobile && (
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handlePreview(template);
//                                 }}
//                                 className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-[11px] sm:text-sm font-medium hover:bg-indigo-100 transition flex items-center gap-1 sm:gap-1.5 border border-indigo-100 cursor-pointer"
//                               >
//                                 <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                                 <span>Preview</span>
//                               </button>
//                               {isAccessible ? (
//                                 <button
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleTemplateSelect(template, index);
//                                   }}
//                                   className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-[11px] sm:text-sm font-medium hover:bg-indigo-700 transition flex items-center gap-1 sm:gap-1.5 cursor-pointer"
//                                 >
//                                   <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                                   <span>Use</span>
//                                 </button>
//                               ) : (
//                                 <button
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     const userDetails =
//                                       getLocalStorage<User>("user_details");
//                                     if (!userDetails?.id) {
//                                       setShowLoginPrompt(true);
//                                       return;
//                                     }
//                                     if (subscriptionStatus?.isExpired) {
//                                       setSelectedLockedTemplate({
//                                         template,
//                                         requiredPlan: "Renew",
//                                       });
//                                       setShowUpgradePopup(true);
//                                       return;
//                                     }
//                                     setSelectedLockedTemplate({
//                                       template,
//                                       requiredPlan: requiredPlanLabel,
//                                     });
//                                     setShowUpgradePopup(true);
//                                   }}
//                                   className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-white text-[11px] sm:text-sm font-medium transition flex items-center gap-1 sm:gap-1.5 cursor-pointer ${
//                                     subscriptionStatus?.isExpired
//                                       ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
//                                       : "bg-gray-600 hover:bg-gray-700"
//                                   }`}
//                                 >
//                                   {subscriptionStatus?.isExpired ? (
//                                     <>
//                                       <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                                       <span>Renew</span>
//                                     </>
//                                   ) : (
//                                     <>
//                                       <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                                       <span>Unlock</span>
//                                     </>
//                                   )}
//                                 </button>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               );
//             })}
//           </div>

//           {/* Value-driven upgrade prompts instead of error messages */}
//           {subscriptionStatus?.isExpired ? (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mt-8 sm:mt-10 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 sm:p-6 border border-amber-200"
//             >
//               <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
//                 <div className="flex items-center gap-3 sm:gap-4">
//                   <div>
//                     <h3 className="font-bold text-gray-900 text-base sm:text-lg">
//                       Ready to accelerate your job search?
//                     </h3>
//                     <p className="text-xs sm:text-sm text-gray-700 mt-0.5">
//                       {subscriptionStatus.daysExpired
//                         ? `Your ${usersCurrentPlan?.toUpperCase()} plan ended ${subscriptionStatus.daysExpired} days ago. Renew today and get:`
//                         : "Renew your subscription and unlock:"}
//                     </p>
//                     <div className="flex flex-wrap gap-3 mt-2">
//                       <span className="text-xs text-gray-600 flex items-center gap-1">
//                         <CheckCircle className="w-3 h-3 text-emerald-500" /> All{" "}
//                         {totalTemplates} templates
//                       </span>
//                       <span className="text-xs text-gray-600 flex items-center gap-1">
//                         <CheckCircle className="w-3 h-3 text-emerald-500" /> AI
//                         resume optimization
//                       </span>
//                       <span className="text-xs text-gray-600 flex items-center gap-1">
//                         <CheckCircle className="w-3 h-3 text-emerald-500" />{" "}
//                         Priority support
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setShowRenewalReminder(true)}
//                     className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition whitespace-nowrap"
//                   >
//                     Renew Now & Save 20% →
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ) : (
//             isUpgradeNeeded && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mt-8 sm:mt-10 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 sm:p-5 border border-indigo-100"
//               >
//                 <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
//                       <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-gray-900 text-sm sm:text-base">
//                         Unlock All {totalTemplates} Templates
//                       </h3>
//                       <p className="text-xs sm:text-sm text-gray-600">
//                         Upgrade to Premium for full access
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => router.push("/choose-plan")}
//                     className="px-4 sm:px-5 py-1.5 sm:py-2 bg-indigo-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-indigo-700 transition whitespace-nowrap"
//                   >
//                     View Plans →
//                   </button>
//                 </div>
//               </motion.div>
//             )
//           )}
//         </div>
//       </section>

//       <AnimatePresence>
//         {selectedTemplateForMobile && (
//           <MobileTemplateBottomSheet
//             template={selectedTemplateForMobile}
//             onClose={() => setSelectedTemplateForMobile(null)}
//           />
//         )}
//       </AnimatePresence>

//       <ResumePreviewModal
//         show={showPreview}
//         template={previewTemplate}
//         onClose={() => {
//           setShowPreview(false);
//           setPreviewTemplate(null);
//         }}
//         onUse={() => {
//           if (previewTemplate) {
//             const userDetails = getLocalStorage<User>("user_details");
//             if (!userDetails?.id) {
//               setShowLoginPrompt(true);
//               setShowPreview(false);
//               return;
//             }
//             if (subscriptionStatus?.isExpired) {
//               setSelectedLockedTemplate({
//                 template: previewTemplate,
//                 requiredPlan: "Renew",
//               });
//               setShowUpgradePopup(true);
//               setShowPreview(false);
//               return;
//             }

//             const templateIndex = templateData.findIndex(
//               (t) => t.id === previewTemplate.id,
//             );
//             if (isTemplateAccessible(templateIndex))
//               clickresumedetails(previewTemplate);
//             else {
//               const requiredPlan = getRequiredPlanForTemplate(templateIndex);
//               setSelectedLockedTemplate({
//                 template: previewTemplate,
//                 requiredPlan: PLAN_CONFIG[requiredPlan].label,
//               });
//               setShowPreview(false);
//               setShowUpgradePopup(true);
//             }
//           }
//         }}
//       />

//       <Footer />
//     </div>
//   );
// }

// export default Choose_template;



















// "use client";

// import { useContext, useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { CreateContext } from "@/app/context/CreateContext";
// import { templateData } from "@/app/data";
// import { Template } from "@/app/types";
// import Header from "@/app/components/layouts/Header";
// import Footer from "@/app/components/layouts/Footer";
// import {
//   convertParsedResumeToFrontendFormat,
//   getLocalStorage,
//   removeSessionStorage,
//   setLocalStorage,
// } from "@/app/utils";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Sparkles,
//   FileText,
//   Upload,
//   X,
//   CheckCircle,
//   ArrowRight,
//   Star,
//   Download,
//   Eye,
//   Lock,
//   Crown,
//   AlertCircle,
//   ChevronRight,
//   Maximize2,
//   Gift,
//   Zap,
//   TrendingUp,
// } from "lucide-react";
// import { LuUsers } from "react-icons/lu";
// import { PiReadCvLogo } from "react-icons/pi";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { IoRocket } from "react-icons/io5";
// import axios from "axios";
// import { API_URL } from "@/app/config/api";
// import { User } from "@/app/types/user.types";
// import toast, { Toaster } from "react-hot-toast";
// import { ResumePreviewModal } from "@/app/components/resume";
// import api from "@/app/utils/api";

// const PLAN_CONFIG = {
//   no_plan: {
//     maxTemplates: 0,
//     label: "No Plan",
//     color: "from-gray-500 to-gray-600",
//     badgeColor: "bg-gray-100 text-gray-700",
//     canUpload: false,
//   },
//   free: {
//     maxTemplates: 1,
//     label: "Free",
//     color: "from-slate-500 to-slate-600",
//     badgeColor: "bg-slate-100 text-slate-700",
//     canUpload: false,
//   },
//   pro: {
//     maxTemplates: 3,
//     label: "Pro",
//     color: "from-indigo-600 to-indigo-500",
//     badgeColor: "bg-indigo-100 text-indigo-700",
//     canUpload: false,
//   },
//   premium: {
//     maxTemplates: Infinity,
//     label: "Premium",
//     color: "from-purple-500 to-indigo-600",
//     badgeColor: "bg-purple-100 text-purple-700",
//     canUpload: true,
//   },
// };

// const getRequiredPlanForTemplate = (
//   index: number,
// ): keyof typeof PLAN_CONFIG => {
//   if (index < PLAN_CONFIG.free.maxTemplates) return "free";
//   if (index < PLAN_CONFIG.pro.maxTemplates) return "pro";
//   return "premium";
// };

// function Choose_template() {
//   const router = useRouter();
//   const {
//     setContact,
//     setEducation,
//     setExperiences,
//     setSkills,
//     setSummary,
//     setFinalize,
//     setProjects,
//     setFullResumeData,
//     setChosenTemplate,
//     setIsUploadMode,
//     clearUploadMode,
//   } = useContext(CreateContext);

//   removeSessionStorage("oldRouteNameDashboard");
//   removeSessionStorage("editingResumeIdAndData");

//   const uploadAbortController = useRef<AbortController | null>(null);
//   const [usersCurrentPlan, setUsersCurrentPlan] = useState<string | null>(null);
//   const [showUpgradePopup, setShowUpgradePopup] = useState(false);
//   const [selectedLockedTemplate, setSelectedLockedTemplate] = useState<{
//     template: Template;
//     requiredPlan: string;
//   } | null>(null);
//   const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const [showInitialPopup, setShowInitialPopup] = useState(true);
//   const [showUploadPopup, setShowUploadPopup] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadStatus, setUploadStatus] = useState<string>("idle");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isMobile, setIsMobile] = useState(false);
//   const [showLoginPrompt, setShowLoginPrompt] = useState(false);
//   const [showPlanRequiredPopup, setShowPlanRequiredPopup] = useState(false);
//   const [selectedTemplateForMobile, setSelectedTemplateForMobile] =
//     useState<Template | null>(null);

//   // Subscription expiration states
//   const [subscriptionStatus, setSubscriptionStatus] = useState<{
//     isExpired: boolean;
//     message: string;
//     daysExpired?: number;
//   } | null>(null);
//   const [showRenewalReminder, setShowRenewalReminder] = useState(false);
//   const [dismissedReminder, setDismissedReminder] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const clickresumedetails = (template: Template) => {
//     setChosenTemplate(template);
//     setLocalStorage("chosenTemplate", template);
//     router.push(`/resume-details/contact`);
//   };

//   const getCurrentPlan = (): keyof typeof PLAN_CONFIG => {
//     const userDetails = getLocalStorage<User>("user_details");

//     if (!userDetails?.id) {
//       return "no_plan";
//     }

//     // Even if expired, show their last plan but with limited access
//     const plan = usersCurrentPlan?.toLowerCase() || "";

//     if (!plan) {
//       return "no_plan";
//     }

//     if (plan.includes("pro")) return "pro";
//     if (plan.includes("premium")) return "premium";
//     if (plan.includes("free")) return "free";

//     return "no_plan";
//   };

//   // Check if user has active access (not expired)
//   const hasActiveAccess = (): boolean => {
//     const userDetails = getLocalStorage<User>("user_details");
//     if (!userDetails?.id) return false;
//     return !subscriptionStatus?.isExpired;
//   };

//   const canUserUpload = (): boolean => {
//     const currentPlan = getCurrentPlan();
//     // Show upload button but show friendly upgrade prompt when clicked
//     return currentPlan === "premium";
//   };

//   const isTemplateAccessible = (templateIndex: number): boolean => {
//     const userDetails = getLocalStorage<User>("user_details");

//     if (!userDetails?.id) {
//       return false;
//     }

//     // If expired, show templates as "locked" but with friendly renewal message
//     if (subscriptionStatus?.isExpired) {
//       return false;
//     }

//     const currentPlan = getCurrentPlan();
//     if (currentPlan === "no_plan") return false;

//     const maxTemplates = PLAN_CONFIG[currentPlan].maxTemplates;
//     return templateIndex < maxTemplates;
//   };

//   const getAvailableTemplatesCount = (): number => {
//     const currentPlan = getCurrentPlan();
//     if (currentPlan === "no_plan") return 0;

//     const maxTemplates = PLAN_CONFIG[currentPlan].maxTemplates;
//     return Math.min(maxTemplates, templateData.length);
//   };

//   const handleTemplateSelect = (template: Template, index: number) => {
//     const userDetails = getLocalStorage<User>("user_details");

//     if (!userDetails?.id) {
//       setShowLoginPrompt(true);
//       return;
//     }

//     // Show friendly renewal prompt instead of harsh error
//     if (subscriptionStatus?.isExpired) {
//       setSelectedLockedTemplate({
//         template,
//         requiredPlan: "Renew",
//       });
//       setShowUpgradePopup(true);
//       return;
//     }

//     if (isTemplateAccessible(index)) {
//       clickresumedetails(template);
//       clearUploadMode();
//     } else {
//       // const requiredPlan = getRequiredPlanForTemplate(index);

//       // setSelectedLockedTemplate({
//       //   template,
//       //   requiredPlan: PLAN_CONFIG[requiredPlan].label,
//       // });
//       // setShowUpgradePopup(true);

//       router.push("/choose-plan");
//     }
//   };

//   const handlePreview = (template: Template) => {
//     setPreviewTemplate(template);
//     setShowPreview(true);
//   };

//   const handleUploadClick = () => {
//     const userDetails = getLocalStorage<User>("user_details");

//     if (!userDetails?.id) {
//       setShowLoginPrompt(true);
//       return;
//     }

//     // Show friendly renewal prompt for expired users
//     if (subscriptionStatus?.isExpired) {
//       setShowPlanRequiredPopup(true);
//       return;
//     }

//     if (!canUserUpload()) {
//       setShowPlanRequiredPopup(true);
//       return;
//     }
//     setUsersCurrentPlan;

//     setShowInitialPopup(false);
//     setShowUploadPopup(true);
//   };

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userDetails = getLocalStorage<User>("user_details");
//       const accessToken = getLocalStorage<string>("access_token");

//       if (!userDetails?.id || !accessToken) {
//         setUsersCurrentPlan(null);
//         setSubscriptionStatus(null);
//         return;
//       }

//       try {
//         const res = await api.get("/dashboard");
//         const { subscription } = res?.data;

//         setUsersCurrentPlan("premium"); //for testing

//         // Calculate days expired for friendly message
//         let daysExpired = 0;
//         // if (subscription?.is_expired === true) {
//         //   // Assuming you have an expiry date, calculate days
//         //   if (subscription.plan_details.expires_at) {
//         //     const expiryDate = new Date(subscription.plan_details.expires_at);
//         //     const today = new Date();
//         //     daysExpired = Math.floor(
//         //       (today.getTime() - expiryDate.getTime()) / (1000 * 3600 * 24),
//         //     );
//         //   }

//         //   setSubscriptionStatus({
//         //     isExpired: true,
//         //     message: subscription.message || "Your premium access has ended",
//         //     daysExpired: daysExpired,
//         //   });

//         //   // Show a subtle, friendly reminder after 2 seconds (not immediately)
//         //   setTimeout(() => {
//         //     if (!dismissedReminder) {
//         //       setShowRenewalReminder(true);
//         //       // Auto-hide after 8 seconds
//         //       setTimeout(() => setShowRenewalReminder(false), 8000);
//         //     }
//         //   }, 2000);
//         // } else {
//         //   setSubscriptionStatus({ isExpired: false, message: "" });
//         //   setUsersCurrentPlan(subscription.current_plan.toLowerCase());
//         // }
//       } catch (err) {
//         console.error("Failed to fetch user data:", err);
//         setUsersCurrentPlan(null);
//         setSubscriptionStatus(null);

//         if (
//           axios.isAxiosError(err) &&
//           (err.response?.status === 401 || err.response?.status === 403)
//         ) {
//           localStorage.removeItem("access_token");
//           localStorage.removeItem("refresh_token");
//           localStorage.removeItem("user_details");
//         }
//       }
//     };

//     fetchUserData();
//   }, [dismissedReminder]);

//   const currentPlan = getCurrentPlan();
//   const availableTemplates = getAvailableTemplatesCount();
//   const totalTemplates = templateData.length;
//   const isUpgradeNeeded =
//     currentPlan !== "no_plan" && availableTemplates < totalTemplates;
//   const isPremiumUser = currentPlan === "premium";
//   const hasValidSubscription = hasActiveAccess();

//   useEffect(() => {
//     if (
//       showPreview ||
//       showInitialPopup ||
//       showUploadPopup ||
//       showUpgradePopup ||
//       showLoginPrompt ||
//       showPlanRequiredPopup ||
//       selectedTemplateForMobile
//     ) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }
//     return () => document.body.classList.remove("overflow-hidden");
//   }, [
//     showPreview,
//     showInitialPopup,
//     showUploadPopup,
//     showUpgradePopup,
//     showLoginPrompt,
//     showPlanRequiredPopup,
//     selectedTemplateForMobile,
//   ]);

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files[0];
//     if (file && isValidFileType(file)) {
//       handleFileUpload(file);
//     } else {
//       setErrorMessage("Please upload a PDF or DOCX file");
//     }
//   };

//   const handleCreateNew = () => {
//     setShowInitialPopup(false);
//   };

//   const isValidFileType = (file: File): boolean => {
//     const validTypes = [
//       "application/pdf",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ];
//     return validTypes.includes(file.type);
//   };

//   const handleFileUpload = async (file: File) => {
//     const maxSize = 10 * 1024 * 1024;

//     if (!isPremiumUser) {
//       setShowPlanRequiredPopup(true);
//       return;
//     }

//     if (subscriptionStatus?.isExpired) {
//       setShowPlanRequiredPopup(true);
//       return;
//     }

//     if (!isValidFileType(file)) {
//       setErrorMessage("Please upload a PDF or DOCX file");
//       return;
//     }

//     if (file.size > maxSize) {
//       setErrorMessage("File size must be less than 10MB");
//       return;
//     }

//     // Create new AbortController for this upload
//     if (uploadAbortController.current) {
//       uploadAbortController.current.abort();
//     }
//     uploadAbortController.current = new AbortController();

//     setIsUploading(true);
//     setUploadStatus("uploading");
//     setUploadedFile(file);
//     setErrorMessage("");

//     let progressInterval: NodeJS.Timeout | null = null;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       // Simulate progress
//       if (uploadStatus !== "error") {
//         progressInterval = setInterval(() => {
//           setUploadProgress((prev) => {
//             if (prev >= 90) {
//               if (progressInterval) clearInterval(progressInterval);
//               return 90;
//             }
//             return prev + 10;
//           });
//         }, 200);
//       }

//       setUploadStatus("processing");
//       setUploadProgress(100);

//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/resume/parse-resume`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           signal: uploadAbortController.current.signal,
//           onUploadProgress: (progressEvent) => {
//             if (progressEvent.total && uploadStatus !== "error") {
//               const percentCompleted = Math.round(
//                 (progressEvent.loaded * 100) / progressEvent.total,
//               );
//               setUploadProgress(percentCompleted);
//             }
//           },
//         },
//       );

//       if (progressInterval) clearInterval(progressInterval);

//       const parsedResumeData = response.data.parsed;
//       const convertedData =
//         convertParsedResumeToFrontendFormat(parsedResumeData);

//       if (convertedData.contact) setContact(convertedData.contact);
//       if (convertedData.experiences) setExperiences(convertedData.experiences);
//       if (convertedData.educations) setEducation(convertedData.educations);
//       if (convertedData.skills) setSkills(convertedData.skills);
//       if (convertedData.projects) setProjects(convertedData.projects);
//       if (convertedData.summary) setSummary(convertedData.summary);
//       if (convertedData.finalize) setFinalize(convertedData.finalize);

//       setFullResumeData({
//         contact: convertedData.contact,
//         experiences: convertedData.experiences,
//         education: convertedData.educations,
//         skills: convertedData.skills,
//         summary: convertedData.summary?.[0] || "",
//         finalize: convertedData.finalize || {},
//         projects: convertedData.projects || [],
//       });

//       const defaultTemplate = templateData[0];
//       setLocalStorage("chosenTemplate", defaultTemplate);
//       setChosenTemplate(defaultTemplate);
//       setIsUploadMode(true);
//       setUploadStatus("success");

//       toast.success("Resume uploaded and processed successfully!", {
//         duration: 3000,
//         style: { background: "#10b981", color: "#fff", borderRadius: "12px" },
//       });

//       setTimeout(() => {
//         setShowUploadPopup(false);
//         router.push(`/resume-details/contact`);
//         setTimeout(() => {
//           resetUploadState();
//         }, 500);
//       }, 2000);
//     } catch (err) {
//       if (progressInterval) clearInterval(progressInterval);

//       if (axios.isCancel(err)) {
//         console.log("Upload cancelled");
//         setUploadStatus("idle");
//         setErrorMessage("Upload cancelled");
//       } else {
//         console.error("Upload error:", err);
//         setUploadStatus("error");
//         setErrorMessage("Failed to parse resume. Please try again.");
//       }
//       setIsUploading(false);
//     }
//   };

//   const resetUploadPopup = () => {
//     // Abort any ongoing upload
//     if (uploadAbortController.current) {
//       uploadAbortController.current.abort();
//       uploadAbortController.current = null;
//     }

//     // Only close if not in critical uploading state
//     if (uploadStatus !== "uploading" && uploadStatus !== "processing") {
//       setShowUploadPopup(false);
//       resetUploadState();
//     } else {
//       // Show confirmation dialog before closing during upload
//       const confirmClose = window.confirm(
//         "Upload in progress. Are you sure you want to cancel?",
//       );
//       if (confirmClose) {
//         setShowUploadPopup(false);
//         resetUploadState();
//       }
//     }
//   };

//   const resetUploadState = () => {
//     setIsUploading(false);
//     setUploadedFile(null);
//     setUploadStatus("idle");
//     setUploadProgress(0);
//     setErrorMessage("");
//     setShowUploadPopup(false);
//     if (uploadAbortController.current) {
//       uploadAbortController.current.abort();
//       uploadAbortController.current = null;
//     }
//   };

//   // Add cleanup effect
//   useEffect(() => {
//     return () => {
//       // Cleanup on component unmount
//       if (uploadAbortController.current) {
//         uploadAbortController.current.abort();
//       }
//     };
//   }, []);

//   // Template Preview Bottom Sheet Component - Works on all devices
//   const TemplatePreviewBottomSheet = ({
//     template,
//     onClose,
//   }: {
//     template: Template;
//     onClose: () => void;
//   }) => {
//     const templateIndex = templateData.findIndex((t) => t.id === template.id);
//     const isAccessible = isTemplateAccessible(templateIndex);
//     const requiredPlan = getRequiredPlanForTemplate(templateIndex);
//     const requiredPlanLabel = PLAN_CONFIG[requiredPlan].label;
//     const isPremium = requiredPlan !== "free";

//     const handleUseTemplate = () => {
//       if (isAccessible) {
//         handleTemplateSelect(template, templateIndex);
//         onClose();
//       } else {
//         const userDetails = getLocalStorage<User>("user_details");
//         if (!userDetails?.id) {
//           setShowLoginPrompt(true);
//           onClose();
//           return;
//         }
//         // setSelectedLockedTemplate({
//         //   template,
//         //   requiredPlan: subscriptionStatus?.isExpired
//         //     ? "Renew"
//         //     : requiredPlanLabel,
//         // });
//         // setShowUpgradePopup(true);

//         router.push("/choose-plan");
//         onClose();
//       }
//     };

//     const handleFullPreview = () => {
//       handlePreview(template);
//     };

//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-md sm:items-center"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ y: "100%" }}
//           animate={{ y: 0 }}
//           exit={{ y: "100%" }}
//           transition={{ type: "spring", damping: 25, stiffness: 300 }}
//           className="w-full bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] sm:max-w-md md:max-w-lg"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
//             <div className="w-12 h-1 bg-gray-300 rounded-full" />
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             <div
//               className="relative h-48 sm:h-56 bg-gradient-to-r from-indigo-50 to-purple-50 mx-4 rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
//               onClick={handleFullPreview}
//             >
//               <Image
//                 src={template.image}
//                 alt={template?.style || "Template"}
//                 fill
//                 className="object-contain object-center p-2"
//               />
//               <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
//                 <div className="bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg">
//                   <Maximize2 className="w-5 h-5 text-indigo-600" />
//                 </div>
//               </div>
//             </div>

//             <div className="px-4 sm:px-5 pt-4 pb-6">
//               <div className="text-center mb-5">
//                 <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
//                   <h3 className="text-xl font-bold text-gray-900">
//                     {template.style || "Resume Template"}
//                   </h3>
//                   {isPremium && (
//                     <div
//                       className={`${PLAN_CONFIG[requiredPlan].badgeColor} px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1`}
//                     >
//                       {requiredPlan === "premium" ? (
//                         <Crown className="w-3 h-3" />
//                       ) : (
//                         <Star className="w-3 h-3" />
//                       )}
//                       <span>{requiredPlanLabel}</span>
//                     </div>
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-500">
//                   Professional ATS-friendly design that gets you noticed
//                 </p>
//               </div>

//               <div className="bg-gray-50 rounded-xl p-4 mb-6">
//                 <p className="text-xs font-semibold text-gray-700 mb-2">
//                   ✨ Template Features:
//                 </p>
//                 <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
//                   <div className="flex items-center gap-1.5">
//                     <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
//                     <span>ATS Optimized</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
//                     <span>Clean Layout</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
//                     <span>Professional Fonts</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
//                     <span>Easy to Edit</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-3 flex-wrap">
//                 <button
//                   onClick={handleFullPreview}
//                   className="flex-1 py-3 sm:py-3.5 rounded-xl bg-gray-100 text-gray-700 font-semibold px-2 text-xs sm:text-sm hover:bg-gray-200 transition flex items-center justify-center gap-2 cursor-pointer"
//                 >
//                   <Eye className="w-4 h-4" />
//                   Full Preview
//                 </button>
//                 <button
//                   onClick={handleUseTemplate}
//                   className={`cursor-pointer flex-1 py-3 sm:py-3.5 rounded-xl text-white font-semibold px-2 text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
//                     isAccessible && !subscriptionStatus?.isExpired
//                       ? "bg-indigo-600 hover:bg-indigo-700"
//                       : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
//                   }`}
//                 >
//                   {isAccessible && !subscriptionStatus?.isExpired ? (
//                     <>
//                       <Sparkles className="w-4 h-4" />
//                       Use Template
//                     </>
//                   ) : subscriptionStatus?.isExpired ? (
//                     <>
//                       <Gift className="w-4 h-4" />
//                       Renew to Access
//                     </>
//                   ) : (
//                     <>
//                       <Lock className="w-4 h-4" />
//                       Unlock with {requiredPlanLabel}
//                     </>
//                   )}
//                 </button>
//               </div>

//               <button
//                 onClick={onClose}
//                 className="cursor-pointer w-full mt-3 py-3 text-gray-500 text-sm font-medium hover:text-gray-700 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-indigo-50/20">
//       <Toaster position="top-right" />
//       <Header />

//       {/*  Renewal Reminder - Subtle, non-intrusive */}
//       <AnimatePresence>
//         {showRenewalReminder &&
//           subscriptionStatus?.isExpired &&
//           !dismissedReminder && (
//             <motion.div
//               initial={{ opacity: 0, y: -100 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -100 }}
//               className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md"
//             >
//               <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-orange-500 rounded-lg shadow-lg p-4">
//                 <div className="flex items-start gap-3">
//                   <div className="flex-shrink-0">
//                     <Gift className="w-5 h-5 text-orange-500" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-semibold text-gray-900">
//                       ✨ Miss having full access?
//                     </p>
//                     <p className="text-xs text-gray-600 mt-1">
//                       Your {usersCurrentPlan?.toUpperCase()} plan expired
//                       {subscriptionStatus.daysExpired
//                         ? ` ${subscriptionStatus.daysExpired} days ago`
//                         : ""}
//                       . Renew now to unlock all premium templates & features.
//                     </p>
//                     <div className="mt-2 flex gap-2">
//                       <button
//                         onClick={() => {
//                           setShowRenewalReminder(false);
//                           router.push("/choose-plan");
//                         }}
//                         className="text-xs bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition"
//                       >
//                         Renew Now
//                       </button>
//                       <button
//                         onClick={() => {
//                           setDismissedReminder(true);
//                           setShowRenewalReminder(false);
//                         }}
//                         className="text-xs text-gray-500 hover:text-gray-700"
//                       >
//                         Dismiss
//                       </button>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowRenewalReminder(false)}
//                     className="flex-shrink-0"
//                   >
//                     <X className="w-4 h-4 text-gray-400" />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//       </AnimatePresence>

//       {/* Initial Popup */}
//       <AnimatePresence>
//         {showInitialPopup && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl overflow-y-auto"
//             onClick={() => setShowInitialPopup(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20, opacity: 0 }}
//               animate={{ scale: 1, y: 0, opacity: 1 }}
//               exit={{ scale: 0.9, y: 20, opacity: 0 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full shadow-2xl mx-auto my-4 sm:my-6 md:my-8 overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="relative bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 pt-6 sm:pt-8 pb-5 sm:pb-6 md:pb-8 px-4 sm:px-6 md:px-8 text-white">
//                 <button
//                   onClick={() => setShowInitialPopup(false)}
//                   className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 p-1.5 sm:p-2 hover:bg-white/20 rounded-lg sm:rounded-xl transition-all duration-200 z-10"
//                 >
//                   <X className="w-4 h-4 sm:w-5 sm:h-5" />
//                 </button>

//                 <div className="text-center">
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//                     className="inline-flex items-center gap-1.5 max-sm:hidden sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full text-white text-[10px] sm:text-sm font-semibold mb-3 sm:mb-4"
//                   >
//                     <IoRocket className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <span>AI-POWERED RESUME BUILDER</span>
//                   </motion.div>
//                   <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 px-2">
//                     Let's Build Your Job Winning Resume
//                   </h2>
//                   <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-lg mx-auto px-2">
//                     Choose how you want to create your resume and get interview
//                     ready in minutes
//                   </p>
//                 </div>
//               </div>

//               <div className="overflow-y-auto max-h-[60vh] sm:max-h-[50vh] md:max-h-[55vh] lg:max-h-[60vh]">
//                 <div className="p-4 sm:p-6 md:p-8">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                     {/* Create New Resume Option */}
//                     <motion.div
//                       onClick={handleCreateNew}
//                       initial={{ x: -20, opacity: 0 }}
//                       animate={{ x: 0, opacity: 1 }}
//                       transition={{ delay: 0.3 }}
//                       whileHover={{ y: -5 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="group cursor-pointer rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/30 p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-300 border border-indigo-100"
//                     >
//                       <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
//                         <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
//                       </div>
//                       <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
//                         Create New Resume
//                       </h3>
//                       <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
//                         No experience? No problem. AI will build your resume
//                         with the right skills, projects, and format
//                       </p>
//                       <button className="flex items-center text-indigo-600 font-semibold text-sm sm:text-base group-hover:gap-2 transition-all cursor-pointer">
//                         Get started
//                         <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
//                       </button>
//                     </motion.div>

//                     {/* Upload Existing Resume Option */}
//                     <motion.div
//                       initial={{ x: 20, opacity: 0 }}
//                       animate={{ x: 0, opacity: 1 }}
//                       transition={{ delay: 0.4 }}
//                       whileHover={{ y: -5 }}
//                       whileTap={{ scale: 0.98 }}
//                       className={`rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300 ${
//                         isPremiumUser && !subscriptionStatus?.isExpired
//                           ? "group cursor-pointer bg-gradient-to-br from-purple-50 to-indigo-50/30 hover:shadow-xl border border-purple-100"
//                           : "bg-gray-100 opacity-80 border border-gray-200"
//                       }`}
//                       onClick={handleUploadClick}
//                     >
//                       <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
//                         {(!isPremiumUser || subscriptionStatus?.isExpired) && (
//                           <Lock className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white/70" />
//                         )}
//                         {isPremiumUser && !subscriptionStatus?.isExpired && (
//                           <Upload className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
//                         )}
//                       </div>
//                       <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
//                         {subscriptionStatus?.isExpired
//                           ? "Regain Access to AI Upload"
//                           : "Improve My Existing Resume"}
//                       </h3>
//                       <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
//                         {subscriptionStatus?.isExpired
//                           ? "Your subscription has ended. Renew to let AI optimize your resume instantly"
//                           : "Already have a resume? Upload it and let AI rewrite, fix, and optimize it for better results"}
//                       </p>
//                       {(!isPremiumUser || subscriptionStatus?.isExpired) && (
//                         <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1 mb-2">
//                           <Crown className="w-3 h-3 text-amber-600" />
//                           <span className="text-amber-700 text-xs font-medium">
//                             {subscriptionStatus?.isExpired
//                               ? "Renew to Continue"
//                               : "Premium Feature"}
//                           </span>
//                         </div>
//                       )}
//                       <button
//                         className={`flex items-center ${
//                           isPremiumUser && !subscriptionStatus?.isExpired
//                             ? "text-purple-600"
//                             : "text-gray-500"
//                         } font-semibold text-sm sm:text-base transition-all cursor-pointer`}
//                       >
//                         {isPremiumUser && !subscriptionStatus?.isExpired
//                           ? "Upload now"
//                           : subscriptionStatus?.isExpired
//                             ? "Renew Subscription →"
//                             : "Upgrade to use"}
//                         <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
//                       </button>
//                     </motion.div>
//                   </div>

//                   <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 text-center">
//                     <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-gray-500">
//                       <div className="flex items-center gap-1.5 sm:gap-2">
//                         <LuUsers className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500 shrink-0" />
//                         <span className="whitespace-nowrap">
//                           Built for freshers & experienced
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-1.5 sm:gap-2">
//                         <AiOutlineThunderbolt className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500 shrink-0" />
//                         <span className="whitespace-nowrap">AI powered</span>
//                       </div>
//                       <div className="flex items-center gap-1.5 sm:gap-2">
//                         <PiReadCvLogo className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500 shrink-0" />
//                         <span className="whitespace-nowrap">
//                           Ready in 3 minutes
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Login Prompt Popup */}
//       <AnimatePresence>
//         {showLoginPrompt && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl overflow-y-auto"
//             onClick={() => setShowLoginPrompt(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden my-4 sm:my-8"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 sm:p-6 md:p-8 text-center">
//                 <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                   <Lock className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
//                 </div>
//                 <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
//                   Login Required
//                 </h3>
//                 <p className="text-white/80 text-xs sm:text-sm">
//                   Please login or create an account to use this feature
//                 </p>
//               </div>
//               <div className="p-5 sm:p-6 text-center">
//                 <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
//                   Create a free account to access our templates and build your
//                   resume
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//                   <button
//                     onClick={() => setShowLoginPrompt(false)}
//                     className="flex-1 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all cursor-pointer text-xs sm:text-sm"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowLoginPrompt(false);
//                       router.push("/login");
//                     }}
//                     className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer text-xs sm:text-sm"
//                   >
//                     Login / Sign Up
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Friendly Renewal Required Popup - Positive framing */}
//       <AnimatePresence>
//         {(showPlanRequiredPopup ||
//           (showUpgradePopup &&
//             selectedLockedTemplate?.requiredPlan === "Renew")) && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl overflow-y-auto"
//             onClick={() => {
//               setShowPlanRequiredPopup(false);
//               setShowUpgradePopup(false);
//             }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden my-4 sm:my-8"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-5 sm:p-6 md:p-8 text-center">
//                 <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                   <Gift className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
//                 </div>
//                 <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
//                   {subscriptionStatus?.isExpired
//                     ? "Your Journey Continues Here!"
//                     : "Premium Feature"}
//                 </h3>
//                 <p className="text-white/80 text-xs sm:text-sm">
//                   {subscriptionStatus?.isExpired
//                     ? "Renew your subscription to unlock everything again"
//                     : "Unlock AI-powered resume optimization"}
//                 </p>
//               </div>
//               <div className="p-5 sm:p-6 text-center">
//                 <div className="mb-4 sm:mb-6">
//                   <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-4">
//                     <div className="flex items-center justify-center gap-2 mb-2">
//                       <Zap className="w-4 h-4 text-amber-600" />
//                       <span className="text-sm font-semibold text-gray-900">
//                         What you're missing:
//                       </span>
//                     </div>
//                     <div className="space-y-2 text-left">
//                       <div className="flex items-center gap-2 text-xs text-gray-700">
//                         <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
//                         <span>Upload & AI-optimize existing resumes</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-xs text-gray-700">
//                         <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
//                         <span>
//                           Access to all {totalTemplates} professional templates
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2 text-xs text-gray-700">
//                         <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
//                         <span>Priority support & faster processing</span>
//                       </div>
//                     </div>
//                   </div>

//                   <p className="text-gray-600 text-xs sm:text-sm">
//                     {subscriptionStatus?.isExpired
//                       ? `Your ${usersCurrentPlan?.toUpperCase()} plan gave you amazing results. Ready to continue your success story?`
//                       : "Upgrade to Premium to upload your existing resume and let our AI optimize it for better results"}
//                   </p>
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//                   <button
//                     onClick={() => {
//                       setShowPlanRequiredPopup(false);
//                       setShowUpgradePopup(false);
//                     }}
//                     className="flex-1 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all cursor-pointer text-xs sm:text-sm"
//                   >
//                     Maybe Later
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowPlanRequiredPopup(false);
//                       setShowUpgradePopup(false);
//                       router.push("/choose-plan");
//                     }}
//                     className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-amber-600 to-orange-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2"
//                   >
//                     <TrendingUp className="w-3.5 h-3.5" />
//                     {subscriptionStatus?.isExpired
//                       ? "Renew Now & Save 20%"
//                       : "Upgrade to Premium"}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Template Upgrade Popup (for non-expired users) */}
//       <AnimatePresence>
//         {showUpgradePopup &&
//           selectedLockedTemplate &&
//           selectedLockedTemplate.requiredPlan !== "Renew" && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl overflow-y-auto"
//               onClick={() => setShowUpgradePopup(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, y: 20 }}
//                 animate={{ scale: 1, y: 0 }}
//                 exit={{ scale: 0.9, y: 20 }}
//                 transition={{ type: "spring", damping: 25, stiffness: 300 }}
//                 className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden my-4 sm:my-8"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 sm:p-6 md:p-8 text-center relative overflow-hidden">
//                   <div className="relative">
//                     <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                       <Star className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
//                     </div>
//                     <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
//                       Unlock Premium Template
//                     </h3>
//                     <p className="text-white/80 text-xs sm:text-sm">
//                       Get access to {selectedLockedTemplate.requiredPlan}{" "}
//                       templates
//                     </p>
//                   </div>
//                 </div>
//                 <div className="p-5 sm:p-6 text-center">
//                   <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
//                     Upgrade your plan to unlock this template and boost your
//                     interview chances by 3x
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//                     <button
//                       onClick={() => setShowUpgradePopup(false)}
//                       className="flex-1 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all cursor-pointer text-xs sm:text-sm"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={() => {
//                         setShowUpgradePopup(false);
//                         router.push("/choose-plan");
//                       }}
//                       className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer text-xs sm:text-sm"
//                     >
//                       Upgrade Now
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//       </AnimatePresence>

//       {/* Upload Popup */}
//       <AnimatePresence>
//         {showUploadPopup && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl overflow-y-auto"
//             onClick={(e) => {
//               // Only close if clicking backdrop and not during critical upload
//               if (
//                 uploadStatus !== "uploading" &&
//                 uploadStatus !== "processing"
//               ) {
//                 resetUploadPopup();
//               }
//               e.stopPropagation();
//             }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-4 sm:my-8"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-4 sm:p-5 md:p-6 relative overflow-hidden">
//                 <div className="relative flex items-center justify-between gap-3">
//                   <div className="flex-1">
//                     <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
//                       Upload Your Resume
//                     </h2>
//                     <p className="text-white/80 text-xs sm:text-sm mt-0.5 sm:mt-1">
//                       Upload file to get started
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => {
//                       // If there's an ongoing upload, abort it
//                       if (uploadAbortController.current) {
//                         uploadAbortController.current.abort();
//                         uploadAbortController.current = null;
//                       }
//                       // Always close the popup and reset state
//                       resetUploadState();
//                     }}
//                     className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg sm:rounded-xl transition flex-shrink-0"
//                   >
//                     <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                   </button>
//                 </div>
//               </div>

//               <div className="p-4 sm:p-5 md:p-6">
//                 <div
//                   className={`relative border-2 border-dashed rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 text-center transition-all duration-300 ${
//                     uploadStatus === "error"
//                       ? "border-red-500 bg-red-50/40"
//                       : uploadStatus === "success"
//                         ? "border-emerald-500 bg-emerald-50/40"
//                         : isDragging
//                           ? "border-indigo-500 bg-indigo-50"
//                           : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/30"
//                   }`}
//                   onDragOver={handleDragOver}
//                   onDragLeave={handleDragLeave}
//                   onDrop={handleDrop}
//                 >
//                   <input
//                     type="file"
//                     id="file-upload"
//                     className="hidden"
//                     accept=".pdf,.docx"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file && isValidFileType(file)) {
//                         handleFileUpload(file);
//                       } else if (file) {
//                         setErrorMessage("Please upload a PDF or DOCX file");
//                       }
//                       // Reset the input value to allow uploading the same file again
//                       e.target.value = "";
//                     }}
//                     disabled={
//                       uploadStatus === "uploading" ||
//                       uploadStatus === "processing"
//                     }
//                   />

//                   {isUploading || uploadStatus === "processing" ? (
//                     <div className="text-center">
//                       <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 relative">
//                         <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
//                         <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
//                       </div>
//                       <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
//                         {uploadStatus === "uploading"
//                           ? "Uploading"
//                           : "Processing"}
//                         ... {uploadProgress}%
//                       </p>
//                       <div className="w-full h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <motion.div
//                           className="h-full bg-gradient-to-r from-indigo-600 to-indigo-500"
//                           initial={{ width: 0 }}
//                           animate={{ width: `${uploadProgress}%` }}
//                           transition={{ duration: 0.3 }}
//                         />
//                       </div>
//                       <p className="text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-3">
//                         {uploadStatus === "uploading" &&
//                           "Uploading file to server..."}
//                         {uploadStatus === "processing" &&
//                           "Analyzing and extracting information..."}
//                       </p>
//                     </div>
//                   ) : uploadedFile && uploadStatus === "success" ? (
//                     <div className="text-center">
//                       <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 bg-emerald-100 rounded-full flex items-center justify-center">
//                         {" "}
//                         // if (subscription?.is_expired === true)
//                         <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-emerald-500" />
//                       </div>
//                       <p className="text-xs sm:text-sm font-medium text-gray-900 mb-0.5 sm:mb-1 break-all">
//                         {uploadedFile.name}
//                       </p>
//                       <p className="text-[10px] sm:text-xs text-gray-500">
//                         {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
//                       </p>
//                       <p className="text-[10px] sm:text-xs text-emerald-600 mt-1 sm:mt-2">
//                         ✓ Successfully processed
//                       </p>
//                     </div>
//                   ) : uploadStatus === "error" ? (
//                     <div className="text-center">
//                       <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-red-100 rounded-full flex items-center justify-center">
//                         <AlertCircle className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-red-600" />
//                       </div>
//                       <p className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
//                         Upload Failed
//                       </p>
//                       <p className="text-[11px] sm:text-xs text-red-600 mb-4">
//                         {errorMessage ||
//                           "Something went wrong. Please try again."}
//                       </p>
//                       <button
//                         onClick={() => {
//                           resetUploadState();
//                           document.getElementById("file-upload")?.click();
//                         }}
//                         className="px-4 sm:px-5 py-2 bg-red-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-red-700 transition"
//                       >
//                         Try Again
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="text-center">
//                       <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
//                         <Upload className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-indigo-600" />
//                       </div>
//                       <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
//                         Drop your file here
//                       </p>
//                       <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mb-3 sm:mb-4">
//                         Supports PDF and DOCX up to 10MB
//                       </p>
//                       <button
//                         onClick={() =>
//                           document.getElementById("file-upload")?.click()
//                         }
//                         disabled={
//                           uploadStatus === "uploading" ||
//                           uploadStatus === "processing"
//                         }
//                         className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer text-xs sm:text-sm"
//                       >
//                         Browse Files
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {uploadStatus === "error" && errorMessage && !isUploading && (
//                   <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl flex items-start gap-1.5 sm:gap-2">
//                     <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 mt-0.5 flex-shrink-0" />
//                     <p className="text-[11px] sm:text-xs text-red-600">
//                       {errorMessage}
//                     </p>
//                   </div>
//                 )}

//                 <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
//                   <button
//                     onClick={() => {
//                       // If there's an ongoing upload, abort it
//                       if (uploadAbortController.current) {
//                         uploadAbortController.current.abort();
//                         uploadAbortController.current = null;
//                       }
//                       // Always close the popup and reset state
//                       resetUploadState();
//                     }}
//                     className="flex-1 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all cursor-pointer text-xs sm:text-sm"
//                   >
//                     Cancel
//                   </button>
//                   {uploadedFile && uploadStatus === "success" && (
//                     <button
//                       onClick={() => {
//                         setShowUploadPopup(false);
//                         router.push(`/resume-details/contact`);
//                       }}
//                       className="flex-1 py-2.5 sm:py-3 bg-emerald-500 text-white rounded-lg sm:rounded-xl font-medium hover:bg-emerald-600 transition-all cursor-pointer text-xs sm:text-sm"
//                     >
//                       Continue to Resume
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700">
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center"
//           >
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//               className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
//             >
//               <IoRocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//               <span>PROFESSIONAL TEMPLATES</span>
//             </motion.div>
//             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
//               Pick a Resume That
//               <span className="block bg-gradient-to-r from-yellow-300 to-amber-200 bg-clip-text text-transparent mt-1 sm:mt-2">
//                 Gets You Shortlisted
//               </span>
//             </h1>
//             <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto px-3">
//               Choose a template and let AI build your job-ready resume in
//               minutes
//             </p>

//             {/* Subtle status indicator - not intrusive */}
//             {subscriptionStatus?.isExpired ? (
//               <div className="mt-5 sm:mt-6 inline-flex items-center gap-1.5 sm:gap-2 bg-amber-500/20 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
//                 <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
//                 <span className="text-xs sm:text-sm text-white/85">
//                   Your {usersCurrentPlan?.toUpperCase()} access ended •{" "}
//                   <button
//                     onClick={() => setShowRenewalReminder(true)}
//                     className="underline hover:no-underline"
//                   >
//                     Renew to unlock
//                   </button>
//                 </span>
//               </div>
//             ) : usersCurrentPlan && currentPlan !== "no_plan" ? (
//               <div className="mt-5 sm:mt-6 inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
//                 <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300" />
//                 <span className="text-xs sm:text-sm capitalize text-white/85">
//                   {currentPlan} Plan • {availableTemplates} Templates Available
//                 </span>
//               </div>
//             ) : (
//               <div className="mt-5 sm:mt-6 inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
//                 <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300" />
//                 <span className="text-xs sm:text-sm text-white/85">
//                   Login to access templates
//                 </span>
//               </div>
//             )}

//             <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto mt-6 sm:mt-8">
//               <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4">
//                 <div className="text-lg sm:text-2xl font-bold text-white">
//                   {templateData.length}
//                 </div>
//                 <div className="text-[10px] sm:text-xs text-white/80">
//                   Total Templates
//                 </div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4">
//                 <div className="text-lg sm:text-2xl font-bold text-white">
//                   100%
//                 </div>
//                 <div className="text-[10px] sm:text-xs text-white/80">
//                   ATS-Friendly
//                 </div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4">
//                 <div className="text-lg sm:text-2xl font-bold text-white">
//                   3min
//                 </div>
//                 <div className="text-[10px] sm:text-xs text-white/80">
//                   Quick Setup
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg
//             viewBox="0 0 1440 100"
//             preserveAspectRatio="none"
//             className="w-full h-8 sm:h-10"
//           >
//             <path d="M0 100L1440 0V100H0Z" fill="white" />
//           </svg>
//         </div>
//       </div>

//       {/* Upload Button */}
//       <div className="text-center mt-6 sm:mt-8 px-4">
//         <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
//           {subscriptionStatus?.isExpired
//             ? "Your AI resume optimization is waiting"
//             : "Have a resume already? Improve it instantly"}
//         </p>
//         <button
//           onClick={handleUploadClick}
//           className={`inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all ${
//             subscriptionStatus?.isExpired
//               ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:scale-105"
//               : "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-lg hover:scale-105"
//           } group cursor-pointer`}
//         >
//           <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//           <span>
//             {subscriptionStatus?.isExpired
//               ? "Renew to Unlock AI Upload"
//               : "Upload & Improve"}
//           </span>
//           {!subscriptionStatus?.isExpired && isPremiumUser && (
//             <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
//           )}
//           {subscriptionStatus?.isExpired && (
//             <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//           )}
//           {!isPremiumUser && !subscriptionStatus?.isExpired && (
//             <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//           )}
//         </button>
//         {subscriptionStatus?.isExpired ? (
//           <p className="text-xs text-amber-600 mt-2">
//             ✨ Renew now and get 20% off on annual plans + free resume review
//           </p>
//         ) : (
//           !isPremiumUser && (
//             <p className="text-xs text-amber-600 mt-2">
//               💡 Upgrade to Premium to upload and improve your existing resume
//             </p>
//           )
//         )}
//       </div>

//       {/* Templates Section */}
//       <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-8 sm:mb-10">
//             <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
//               Select Your Resume Style
//             </h2>
//             <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2 px-3">
//               Simple, clean, and ATS-friendly templates designed to get you
//               interview calls
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
//             {templateData?.map((template, index) => {
//               const isAccessible = isTemplateAccessible(index);
//               const requiredPlan = getRequiredPlanForTemplate(index);
//               const requiredPlanLabel = PLAN_CONFIG[requiredPlan].label;
//               const isPremium = requiredPlan !== "free";

//               return (
//                 <motion.div
//                   key={template.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{
//                     delay: Math.min(index * 0.1, 0.5),
//                     duration: 0.5,
//                   }}
//                   className="relative group "
//                 >
//                   <motion.div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
//                     <div className="relative bg-gray-50 p-3 sm:p-4">
//                       {isPremium && (
//                         <div
//                           className={`absolute top-2 sm:top-3 right-2 sm:right-3 ${
//                             subscriptionStatus?.isExpired
//                               ? "bg-amber-100 text-amber-700"
//                               : PLAN_CONFIG[requiredPlan].badgeColor
//                           } px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold z-10 flex items-center gap-0.5 sm:gap-1 shadow-sm`}
//                         >
//                           {requiredPlan === "premium" ? (
//                             <Crown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                           ) : (
//                             <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                           )}
//                           {/* <span className="hidden xs:inline">
//                             {subscriptionStatus?.isExpired
//                               ? "Locked"
//                               : requiredPlanLabel}
//                           </span> */}
//                           {/* <span className="xs:hidden">
//                             {subscriptionStatus?.isExpired
//                               ? "Locked"
//                               : requiredPlanLabel === "Pro Plus"
//                                 ? "Pro+"
//                                 : requiredPlanLabel === "Premium"
//                                   ? "Prem"
//                                   : requiredPlanLabel.substring(0, 3)}
//                           </span> */}
//                         </div>
//                       )}

//                       {/* Clickable image - opens bottom sheet on all devices */}
//                       <div
//                         className="relative w-full h-72 md:h-80 lg:h-96 cursor-pointer"
//                         onClick={() => setSelectedTemplateForMobile(template)}
//                       >
//                         <Image
//                           src={template.image}
//                           alt={template?.style || "Template"}
//                           fill
//                           className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
//                           sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 33vw, 25vw"
//                         />
//                         {/* Hover overlay with zoom icon */}
//                         {/* <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
//                           <div className="bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg">
//                             <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
//                           </div>
//                         </div> */}
//                       </div>

//                       <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-100">
//                         <div className="flex gap-3 items-center justify-between flex-wrap xl:flex-nowrap">
//                           <div>
//                             <h4 className="text-sm sm:text-base font-semibold text-gray-900">
//                               {template.style || "Template"}
//                             </h4>
//                             <p className="text-[10px] sm:text-xs text-gray-500">
//                               {template.description || "Professional design"}
//                             </p>
//                           </div>
//                           {/* Desktop action buttons */}
//                           {/* <div className="flex gap-2">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handlePreview(template);
//                               }}
//                               className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-[11px] sm:text-sm font-medium hover:bg-indigo-100 transition flex items-center gap-1 sm:gap-1.5 border border-indigo-100 cursor-pointer"
//                             >
//                               <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                               <span>Preview</span>
//                             </button>
//                             {isAccessible ? (
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleTemplateSelect(template, index);
//                                 }}
//                                 className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-[11px] sm:text-sm font-medium hover:bg-indigo-700 transition flex items-center gap-1 sm:gap-1.5 cursor-pointer"
//                               >
//                                 <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                                 <span>Use</span>
//                               </button>
//                             ) : (
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   const userDetails =
//                                     getLocalStorage<User>("user_details");
//                                   if (!userDetails?.id) {
//                                     setShowLoginPrompt(true);
//                                     return;
//                                   }
//                                   if (subscriptionStatus?.isExpired) {
//                                     setSelectedLockedTemplate({
//                                       template,
//                                       requiredPlan: "Renew",
//                                     });
//                                     setShowUpgradePopup(true);
//                                     return;
//                                   }
//                                   setSelectedLockedTemplate({
//                                     template,
//                                     requiredPlan: requiredPlanLabel,
//                                   });
//                                   setShowUpgradePopup(true);
//                                 }}
//                                 className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-white text-[11px] sm:text-sm font-medium transition flex items-center gap-1 sm:gap-1.5 cursor-pointer ${
//                                   subscriptionStatus?.isExpired
//                                     ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
//                                     : "bg-gray-600 hover:bg-gray-700"
//                                 }`}
//                               >
//                                 {subscriptionStatus?.isExpired ? (
//                                   <>
//                                     <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                                     <span>Renew</span>
//                                   </>
//                                 ) : (
//                                   <>
//                                     <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                                     <span>Unlock</span>
//                                   </>
//                                 )}
//                               </button>
//                             )}
//                           </div> */}
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               );
//             })}
//           </div>

//           {/* Value-driven upgrade prompts instead of error messages */}
//           {subscriptionStatus?.isExpired ? (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mt-8 sm:mt-10 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 sm:p-6 border border-amber-200"
//             >
//               <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
//                 <div className="flex items-center gap-3 sm:gap-4">
//                   <div>
//                     <h3 className="font-bold text-gray-900 text-base sm:text-lg">
//                       Ready to accelerate your job search?
//                     </h3>
//                     <p className="text-xs sm:text-sm text-gray-700 mt-0.5">
//                       {subscriptionStatus.daysExpired
//                         ? `Your ${usersCurrentPlan?.toUpperCase()} plan ended ${subscriptionStatus.daysExpired} days ago. Renew today and get:`
//                         : "Renew your subscription and unlock:"}
//                     </p>
//                     <div className="flex flex-wrap gap-3 mt-2">
//                       <span className="text-xs text-gray-600 flex items-center gap-1">
//                         <CheckCircle className="w-3 h-3 text-emerald-500" /> All{" "}
//                         {totalTemplates} templates
//                       </span>
//                       <span className="text-xs text-gray-600 flex items-center gap-1">
//                         <CheckCircle className="w-3 h-3 text-emerald-500" /> AI
//                         resume optimization
//                       </span>
//                       <span className="text-xs text-gray-600 flex items-center gap-1">
//                         <CheckCircle className="w-3 h-3 text-emerald-500" />{" "}
//                         Priority support
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setShowRenewalReminder(true)}
//                     className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition whitespace-nowrap"
//                   >
//                     Renew Now & Save 20% →
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ) : (
//             isUpgradeNeeded && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mt-8 sm:mt-10 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 sm:p-5 border border-indigo-100"
//               >
//                 <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
//                       <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-gray-900 text-sm sm:text-base">
//                         Unlock All {totalTemplates} Templates
//                       </h3>
//                       <p className="text-xs sm:text-sm text-gray-600">
//                         Upgrade to Premium for full access
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => router.push("/choose-plan")}
//                     className="px-4 sm:px-5 py-1.5 sm:py-2 bg-indigo-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-indigo-700 transition whitespace-nowrap"
//                   >
//                     View Plans →
//                   </button>
//                 </div>
//               </motion.div>
//             )
//           )}
//         </div>
//       </section>

//       {/* Template Preview Bottom Sheet - Works on all devices */}
//       <AnimatePresence>
//         {selectedTemplateForMobile && (
//           <TemplatePreviewBottomSheet
//             template={selectedTemplateForMobile}
//             onClose={() => setSelectedTemplateForMobile(null)}
//           />
//         )}
//       </AnimatePresence>

//       <ResumePreviewModal
//         show={showPreview}
//         template={previewTemplate}
//         onClose={() => {
//           setShowPreview(false);
//           setPreviewTemplate(null);
//         }}
//         onUse={() => {
//           if (previewTemplate) {
//             const userDetails = getLocalStorage<User>("user_details");
//             if (!userDetails?.id) {
//               setShowLoginPrompt(true);
//               setShowPreview(false);
//               return;
//             }
//             if (subscriptionStatus?.isExpired) {
//               setSelectedLockedTemplate({
//                 template: previewTemplate,
//                 requiredPlan: "Renew",
//               });
//               setShowUpgradePopup(true);
//               setShowPreview(false);
//               return;
//             }

//             const templateIndex = templateData.findIndex(
//               (t) => t.id === previewTemplate.id,
//             );
//             if (isTemplateAccessible(templateIndex))
//               clickresumedetails(previewTemplate);
//             else {
//               const requiredPlan = getRequiredPlanForTemplate(templateIndex);
//               setSelectedLockedTemplate({
//                 template: previewTemplate,
//                 requiredPlan: PLAN_CONFIG[requiredPlan].label,
//               });
//               setShowPreview(false);
//               setShowUpgradePopup(true);
//             }
//           }
//         }}
//       />

//       <Footer />
//     </div>
//   );
// }

// export default Choose_template;











































"use client";

import { useContext, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CreateContext } from "@/app/context/CreateContext";
import { templateData } from "@/app/data";
import { Template } from "@/app/types";
import Header from "@/app/components/layouts/Header";
import Footer from "@/app/components/layouts/Footer";
import {
  convertParsedResumeToFrontendFormat,
  getLocalStorage,
  removeSessionStorage,
  setLocalStorage,
} from "@/app/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  FileText,
  Upload,
  X,
  CheckCircle,
  ArrowRight,
  Star,
  Download,
  Eye,
  Lock,
  Crown,
  AlertCircle,
  ChevronRight,
  Maximize2,
  Gift,
  Zap,
  TrendingUp,
} from "lucide-react";
import { LuUsers } from "react-icons/lu";
import { PiReadCvLogo } from "react-icons/pi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { IoRocket } from "react-icons/io5";
import axios from "axios";
import { API_URL } from "@/app/config/api";
import { User } from "@/app/types/user.types";
import toast, { Toaster } from "react-hot-toast";
import { ResumePreviewModal } from "@/app/components/resume";
import api from "@/app/utils/api";

const PLAN_CONFIG = {
  no_plan: {
    maxTemplates: 0,
    label: "No Plan",
    color: "from-gray-500 to-gray-600",
    badgeColor: "bg-gray-100 text-gray-700",
    canUpload: false,
  },
  free: {
    maxTemplates: 1,
    label: "Free",
    color: "from-slate-500 to-slate-600",
    badgeColor: "bg-slate-100 text-slate-700",
    canUpload: false,
  },
  pro: {
    maxTemplates: 3,
    label: "Pro",
    color: "from-indigo-600 to-indigo-500",
    badgeColor: "bg-indigo-100 text-indigo-700",
    canUpload: false,
  },
  premium: {
    maxTemplates: Infinity,
    label: "Premium",
    color: "from-purple-500 to-indigo-600",
    badgeColor: "bg-purple-100 text-purple-700",
    canUpload: true,
  },
};

const getRequiredPlanForTemplate = (
  index: number,
): keyof typeof PLAN_CONFIG => {
  if (index < PLAN_CONFIG.free.maxTemplates) return "free";
  if (index < PLAN_CONFIG.pro.maxTemplates) return "pro";
  return "premium";
};

// Shared, restrained visual primitives so every popup / card speaks the same
// design language insteadinsteadinstead of each one inventing its own gradients & shadows.
const cardSurface =
  "rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]";
const elevatedSurface =
  "rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_70px_-20px_rgba(15,23,42,0.35)]";
const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50 cursor-pointer";
const amberBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-700 cursor-pointer";
const ghostBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 cursor-pointer";

function IconTile({
  icon,
  tone = "indigo",
  size = "md",
}: {
  icon: React.ReactNode;
  tone?: "indigo" | "amber" | "emerald" | "rose" | "slate";
  size?: "sm" | "md" | "lg";
}) {
  const tones: Record<string, string> = {
    indigo: "bg-indigo-50 text-indigo-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
    slate: "bg-slate-100 text-slate-400",
  };
  const sizes: Record<string, string> = {
    sm: "h-8 w-8 rounded-lg",
    md: "h-11 w-11 rounded-xl",
    lg: "h-14 w-14 rounded-2xl",
  };
  return (
    <div
      className={`flex shrink-0 items-center justify-center ${sizes[size]} ${tones[tone]}`}
    >
      {icon}
    </div>
  );
}

function Choose_template() {
  const router = useRouter();
  const {
    setContact,
    setEducation,
    setExperiences,
    setSkills,
    setSummary,
    setFinalize,
    setProjects,
    setFullResumeData,
    setChosenTemplate,
    setIsUploadMode,
    clearUploadMode,
  } = useContext(CreateContext);

  removeSessionStorage("oldRouteNameDashboard");
  removeSessionStorage("editingResumeIdAndData");

  const uploadAbortController = useRef<AbortController | null>(null);
  const [usersCurrentPlan, setUsersCurrentPlan] = useState<string | null>(null);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [selectedLockedTemplate, setSelectedLockedTemplate] = useState<{
    template: Template;
    requiredPlan: string;
  } | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showInitialPopup, setShowInitialPopup] = useState(true);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showPlanRequiredPopup, setShowPlanRequiredPopup] = useState(false);
  const [selectedTemplateForMobile, setSelectedTemplateForMobile] =
    useState<Template | null>(null);

  // Subscription expiration states
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    isExpired: boolean;
    message: string;
    daysExpired?: number;
  } | null>(null);
  const [showRenewalReminder, setShowRenewalReminder] = useState(false);
  const [dismissedReminder, setDismissedReminder] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const clickresumedetails = (template: Template) => {
    setChosenTemplate(template);
    setLocalStorage("chosenTemplate", template);
    router.push(`/resume-details/contact`);
  };

  const getCurrentPlan = (): keyof typeof PLAN_CONFIG => {
    const userDetails = getLocalStorage<User>("user_details");

    if (!userDetails?.id) {
      return "no_plan";
    }

    // Even if expired, show their last plan but with limited access
    const plan = usersCurrentPlan?.toLowerCase() || "";

    if (!plan) {
      return "no_plan";
    }

    if (plan.includes("pro")) return "pro";
    if (plan.includes("premium")) return "premium";
    if (plan.includes("free")) return "free";

    return "no_plan";
  };

  // Check if user has active access (not expired)
  const hasActiveAccess = (): boolean => {
    const userDetails = getLocalStorage<User>("user_details");
    if (!userDetails?.id) return false;
    return !subscriptionStatus?.isExpired;
  };

  const canUserUpload = (): boolean => {
    const currentPlan = getCurrentPlan();
    // Show upload button but show friendly upgrade prompt when clicked
    return currentPlan === "premium";
  };

  const isTemplateAccessible = (templateIndex: number): boolean => {
    const userDetails = getLocalStorage<User>("user_details");

    if (!userDetails?.id) {
      return false;
    }

    // If expired, show templates as "locked" but with friendly renewal message
    if (subscriptionStatus?.isExpired) {
      return false;
    }

    const currentPlan = getCurrentPlan();
    if (currentPlan === "no_plan") return false;

    const maxTemplates = PLAN_CONFIG[currentPlan].maxTemplates;
    return templateIndex < maxTemplates;
  };

  const getAvailableTemplatesCount = (): number => {
    const currentPlan = getCurrentPlan();
    if (currentPlan === "no_plan") return 0;

    const maxTemplates = PLAN_CONFIG[currentPlan].maxTemplates;
    return Math.min(maxTemplates, templateData.length);
  };

  const handleTemplateSelect = (template: Template, index: number) => {
    const userDetails = getLocalStorage<User>("user_details");

    if (!userDetails?.id) {
      setShowLoginPrompt(true);
      return;
    }

    // Show friendly renewal prompt instead of harsh error
    if (subscriptionStatus?.isExpired) {
      setSelectedLockedTemplate({
        template,
        requiredPlan: "Renew",
      });
      setShowUpgradePopup(true);
      return;
    }

    if (isTemplateAccessible(index)) {
      clickresumedetails(template);
      clearUploadMode();
    } else {
    ;

      router.push("/choose-plan");
    }
  };

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
    setShowPreview(true);
  };

  const handleUploadClick = () => {
    const userDetails = getLocalStorage<User>("user_details");

    if (!userDetails?.id) {
      setShowLoginPrompt(true);
      return;
    }

    // Show friendly renewal prompt for expired users
    if (subscriptionStatus?.isExpired) {
      setShowPlanRequiredPopup(true);
      return;
    }

    if (!canUserUpload()) {
      setShowPlanRequiredPopup(true);
      return;
    }
    setUsersCurrentPlan;

    setShowInitialPopup(false);
    setShowUploadPopup(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userDetails = getLocalStorage<User>("user_details");

      if (!userDetails?.id ) {
        setUsersCurrentPlan(null);
        setSubscriptionStatus(null);
        return;
      }

      try {
        const res = await api.get("/dashboard");
        const { subscription } = res?.data;

        // setUsersCurrentPlan("premium"); //for testing

        // Calculate days expired for friendly message
        let daysExpired = 0;
        if (subscription?.is_expired === true) {
          // Assuming you have an expiry date, calculate days
          if (subscription.plan_details.expires_at) {
            const expiryDate = new Date(subscription.plan_details.expires_at);
            const today = new Date();
            daysExpired = Math.floor(
              (today.getTime() - expiryDate.getTime()) / (1000 * 3600 * 24),
            );
          }

          setSubscriptionStatus({
            isExpired: true,
            message: subscription.message || "Your premium access has ended",
            daysExpired: daysExpired,
          });

          // Show a subtle, friendly reminder after 2 seconds (not immediately)
          setTimeout(() => {
            if (!dismissedReminder) {
              setShowRenewalReminder(true);
              // Auto-hide after 8 seconds
              setTimeout(() => setShowRenewalReminder(false), 8000);
            }
          }, 2000);
        } else {
          setSubscriptionStatus({ isExpired: false, message: "" });
          setUsersCurrentPlan(subscription.current_plan.toLowerCase());
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setUsersCurrentPlan(null);
        setSubscriptionStatus(null);

        if (
          axios.isAxiosError(err) &&
          (err.response?.status === 401 || err.response?.status === 403)
        ) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user_details");
        }
      }
    };

    fetchUserData();
  }, [dismissedReminder]);

  const currentPlan = getCurrentPlan();
  const availableTemplates = getAvailableTemplatesCount();
  const totalTemplates = templateData.length;
  const isUpgradeNeeded =
    currentPlan !== "no_plan" && availableTemplates < totalTemplates;
  const isPremiumUser = currentPlan === "premium";
  const hasValidSubscription = hasActiveAccess();

  useEffect(() => {
    if (
      showPreview ||
      showInitialPopup ||
      showUploadPopup ||
      showUpgradePopup ||
      showLoginPrompt ||
      showPlanRequiredPopup ||
      selectedTemplateForMobile
    ) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [
    showPreview,
    showInitialPopup,
    showUploadPopup,
    showUpgradePopup,
    showLoginPrompt,
    showPlanRequiredPopup,
    selectedTemplateForMobile,
  ]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && isValidFileType(file)) {
      handleFileUpload(file);
    } else {
      setErrorMessage("Please upload a PDF or DOCX file");
    }
  };

  const handleCreateNew = () => {
    setShowInitialPopup(false);
  };

  const isValidFileType = (file: File): boolean => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    return validTypes.includes(file.type);
  };

  const handleFileUpload = async (file: File) => {
    const maxSize = 10 * 1024 * 1024;

    if (!isPremiumUser) {
      setShowPlanRequiredPopup(true);
      return;
    }

    if (subscriptionStatus?.isExpired) {
      setShowPlanRequiredPopup(true);
      return;
    }

    if (!isValidFileType(file)) {
      setErrorMessage("Please upload a PDF or DOCX file");
      return;
    }

    if (file.size > maxSize) {
      setErrorMessage("File size must be less than 10MB");
      return;
    }

    // Create new AbortController for this upload
    if (uploadAbortController.current) {
      uploadAbortController.current.abort();
    }
    uploadAbortController.current = new AbortController();

    setIsUploading(true);
    setUploadStatus("uploading");
    setUploadedFile(file);
    setErrorMessage("");

    let progressInterval: NodeJS.Timeout | null = null;

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulate progress
      if (uploadStatus !== "error") {
        progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              if (progressInterval) clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 200);
      }

      setUploadStatus("processing");
      setUploadProgress(100);

      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/resume/parse-resume`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          signal: uploadAbortController.current.signal,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total && uploadStatus !== "error") {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              setUploadProgress(percentCompleted);
            }
          },
        },
      );

      if (progressInterval) clearInterval(progressInterval);

      const parsedResumeData = response.data.parsed;
      const convertedData =
        convertParsedResumeToFrontendFormat(parsedResumeData);

      if (convertedData.contact) setContact(convertedData.contact);
      if (convertedData.experiences) setExperiences(convertedData.experiences);
      if (convertedData.educations) setEducation(convertedData.educations);
      if (convertedData.skills) setSkills(convertedData.skills);
      if (convertedData.projects) setProjects(convertedData.projects);
      if (convertedData.summary) setSummary(convertedData.summary);
      if (convertedData.finalize) setFinalize(convertedData.finalize);

      setFullResumeData({
        contact: convertedData.contact,
        experiences: convertedData.experiences,
        education: convertedData.educations,
        skills: convertedData.skills,
        summary: convertedData.summary?.[0] || "",
        finalize: convertedData.finalize || {},
        projects: convertedData.projects || [],
      });

      const defaultTemplate = templateData[0];
      setLocalStorage("chosenTemplate", defaultTemplate);
      setChosenTemplate(defaultTemplate);
      setIsUploadMode(true);
      setUploadStatus("success");

      toast.success("Resume uploaded and processed successfully!", {
        duration: 3000,
        style: { background: "#10b981", color: "#fff", borderRadius: "12px" },
      });

      setTimeout(() => {
        setShowUploadPopup(false);
        router.push(`/resume-details/contact`);
        setTimeout(() => {
          resetUploadState();
        }, 500);
      }, 2000);
    } catch (err) {
      if (progressInterval) clearInterval(progressInterval);

      if (axios.isCancel(err)) {
        console.log("Upload cancelled");
        setUploadStatus("idle");
        setErrorMessage("Upload cancelled");
      } else {
        console.error("Upload error:", err);
        setUploadStatus("error");
        setErrorMessage("Failed to parse resume. Please try again.");
      }
      setIsUploading(false);
    }
  };

  const resetUploadPopup = () => {
    // Abort any ongoing upload
    if (uploadAbortController.current) {
      uploadAbortController.current.abort();
      uploadAbortController.current = null;
    }

    // Only close if not in critical uploading state
    if (uploadStatus !== "uploading" && uploadStatus !== "processing") {
      setShowUploadPopup(false);
      resetUploadState();
    } else {
      // Show confirmation dialog before closing during upload
      const confirmClose = window.confirm(
        "Upload in progress. Are you sure you want to cancel?",
      );
      if (confirmClose) {
        setShowUploadPopup(false);
        resetUploadState();
      }
    }
  };

  const resetUploadState = () => {
    setIsUploading(false);
    setUploadedFile(null);
    setUploadStatus("idle");
    setUploadProgress(0);
    setErrorMessage("");
    setShowUploadPopup(false);
    if (uploadAbortController.current) {
      uploadAbortController.current.abort();
      uploadAbortController.current = null;
    }
  };

  // Add cleanup effect
  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      if (uploadAbortController.current) {
        uploadAbortController.current.abort();
      }
    };
  }, []);

  // Template Preview Bottom Sheet Component - Works on all devices
  const TemplatePreviewBottomSheet = ({
    template,
    onClose,
  }: {
    template: Template;
    onClose: () => void;
  }) => {
    const templateIndex = templateData.findIndex((t) => t.id === template.id);
    const isAccessible = isTemplateAccessible(templateIndex);
    const requiredPlan = getRequiredPlanForTemplate(templateIndex);
    const requiredPlanLabel = PLAN_CONFIG[requiredPlan].label;
    const isPremium = requiredPlan !== "free";
    const isLockedByExpiry = !!subscriptionStatus?.isExpired;

    const handleUseTemplate = () => {
      if (isAccessible) {
        handleTemplateSelect(template, templateIndex);
        onClose();
      } else {
        const userDetails = getLocalStorage<User>("user_details");
        if (!userDetails?.id) {
          setShowLoginPrompt(true);
          onClose();
          return;
        }
        // setSelectedLockedTemplate({
        //   template,
        //   requiredPlan: subscriptionStatus?.isExpired
        //     ? "Renew"
        //     : requiredPlanLabel,
        // });
        // setShowUpgradePopup(true);

        router.push("/choose-plan");
        onClose();
      }
    };

    const handleFullPreview = () => {
      handlePreview(template);
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 backdrop-blur-sm sm:items-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className={`w-full bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] sm:max-w-md md:max-w-lg ${elevatedSurface}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
            <div className="w-10 h-1 bg-slate-200 rounded-full" />
          </div>

          <div className="flex-1 overflow-y-auto">
            <div
              className="relative mx-4 mt-1 aspect-[210/280] cursor-pointer overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-100"
              onClick={handleFullPreview}
            >
              <Image
                src={template.image}
                alt={template?.style || "Template"}
                fill
                className="object-contain object-center p-3"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 opacity-0 transition-all duration-300 hover:bg-slate-950/30 hover:opacity-100">
                <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-lg">
                  <Maximize2 className="h-3.5 w-3.5 text-indigo-600" />
                  Full preview
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-5 pt-4 pb-6">
              <div className="text-center mb-5">
                <div className="flex items-center justify-center gap-2 mb-1.5 flex-wrap">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {template.style || "Resume Template"}
                  </h3>
                  {isPremium && (
                    <div
                      className={`${PLAN_CONFIG[requiredPlan].badgeColor} px-2 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1`}
                    >
                      {requiredPlan === "premium" ? (
                        <Crown className="w-3 h-3" />
                      ) : (
                        <Star className="w-3 h-3" />
                      )}
                      <span>{requiredPlanLabel}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-slate-500">
                  A clean, ATS-friendly layout recruiters can scan in seconds
                </p>
              </div>

              <div
                className={`${cardSurface} bg-slate-50/70 border-slate-100 p-4 mb-6`}
              >
                <p className="text-xs font-semibold text-slate-700 mb-3">
                  What's included
                </p>
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 text-xs text-slate-600">
                  {[
                    "ATS optimized",
                    "Clean layout",
                    "Professional fonts",
                    "Easy to edit",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={handleFullPreview}
                  className={`${ghostBtn} flex-1 px-2 text-xs sm:text-sm`}
                >
                  <Eye className="w-4 h-4" />
                  Full preview
                </button>
                <button
                  onClick={handleUseTemplate}
                  className={`flex-1 px-2 text-xs sm:text-sm ${
                    isAccessible && !isLockedByExpiry ? primaryBtn : amberBtn
                  }`}
                >
                  {isAccessible && !isLockedByExpiry ? (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Use this template
                    </>
                  ) : isLockedByExpiry ? (
                    <>
                      <Gift className="w-4 h-4" />
                      Renew to access
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Unlock with {requiredPlanLabel}
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={onClose}
                className="cursor-pointer w-full mt-3 py-2.5 text-slate-500 text-sm font-medium hover:text-slate-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      <Header />

      



       {/*  Renewal Reminder - Subtle, non-intrusive */}
      <AnimatePresence>
        {showRenewalReminder &&
          subscriptionStatus?.isExpired &&
          !dismissedReminder && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md"
            >
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-orange-500 rounded-lg shadow-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <Gift className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      ✨ Miss having full access?
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Your {usersCurrentPlan?.toUpperCase()} plan expired
                      {subscriptionStatus.daysExpired
                        ? ` ${subscriptionStatus.daysExpired} days ago`
                        : ""}
                      . Renew now to unlock all premium templates & features.
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => {
                          setShowRenewalReminder(false);
                          router.push("/choose-plan");
                        }}
                        className="text-xs bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition"
                      >
                        Renew Now
                      </button>
                      <button
                        onClick={() => {
                          setDismissedReminder(true);
                          setShowRenewalReminder(false);
                        }}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowRenewalReminder(false)}
                    className="flex-shrink-0"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
      </AnimatePresence>

      {/* Initial Popup */}
      <AnimatePresence>
        {showInitialPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl overflow-y-auto"
            onClick={() => setShowInitialPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full shadow-2xl mx-auto my-4 sm:my-6 md:my-8 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 pt-6 sm:pt-8 pb-5 sm:pb-6 md:pb-8 px-4 sm:px-6 md:px-8 text-white">
                <button
                  onClick={() => setShowInitialPopup(false)}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 p-1.5 sm:p-2 hover:bg-white/20 rounded-lg sm:rounded-xl transition-all duration-200 z-10"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center gap-1.5 max-sm:hidden sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full text-white text-[10px] sm:text-sm font-semibold mb-3 sm:mb-4"
                  >
                    <IoRocket className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>AI-POWERED RESUME BUILDER</span>
                  </motion.div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 px-2">
                    Let's Build Your Job Winning Resume
                  </h2>
                  <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-lg mx-auto px-2">
                    Choose how you want to create your resume and get interview
                    ready in minutes
                  </p>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[60vh] sm:max-h-[50vh] md:max-h-[55vh] lg:max-h-[60vh]">
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Create New Resume Option */}
                    <motion.div
                      onClick={handleCreateNew}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className="group cursor-pointer rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/30 p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-300 border border-indigo-100"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                        Create New Resume
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                        No experience? No problem. AI will build your resume
                        with the right skills, projects, and format
                      </p>
                      <button className="flex items-center text-indigo-600 font-semibold text-sm sm:text-base group-hover:gap-2 transition-all cursor-pointer">
                        Get started
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>

                    {/* Upload Existing Resume Option */}
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300 ${
                        isPremiumUser && !subscriptionStatus?.isExpired
                          ? "group cursor-pointer bg-gradient-to-br from-purple-50 to-indigo-50/30 hover:shadow-xl border border-purple-100"
                          : "bg-gray-100 opacity-80 border border-gray-200"
                      }`}
                      onClick={handleUploadClick}
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
                        {(!isPremiumUser || subscriptionStatus?.isExpired) && (
                          <Lock className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white/70" />
                        )}
                        {isPremiumUser && !subscriptionStatus?.isExpired && (
                          <Upload className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                        {subscriptionStatus?.isExpired
                          ? "Regain Access to AI Upload"
                          : "Improve My Existing Resume"}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                        {subscriptionStatus?.isExpired
                          ? "Your subscription has ended. Renew to let AI optimize your resume instantly"
                          : "Already have a resume? Upload it and let AI rewrite, fix, and optimize it for better results"}
                      </p>
                      {(!isPremiumUser || subscriptionStatus?.isExpired) && (
                        <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1 mb-2">
                          <Crown className="w-3 h-3 text-amber-600" />
                          <span className="text-amber-700 text-xs font-medium">
                            {subscriptionStatus?.isExpired
                              ? "Renew to Continue"
                              : "Premium Feature"}
                          </span>
                        </div>
                      )}
                      <button
                        className={`flex items-center ${
                          isPremiumUser && !subscriptionStatus?.isExpired
                            ? "text-purple-600"
                            : "text-gray-500"
                        } font-semibold text-sm sm:text-base transition-all cursor-pointer`}
                      >
                        {isPremiumUser && !subscriptionStatus?.isExpired
                          ? "Upload now"
                          : subscriptionStatus?.isExpired
                            ? "Renew Subscription →"
                            : "Upgrade to use"}
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
                      </button>
                    </motion.div>
                  </div>

                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-gray-500">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <LuUsers className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500 shrink-0" />
                        <span className="whitespace-nowrap">
                          Built for freshers & experienced
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <AiOutlineThunderbolt className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500 shrink-0" />
                        <span className="whitespace-nowrap">AI powered</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <PiReadCvLogo className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500 shrink-0" />
                        <span className="whitespace-nowrap">
                          Ready in 3 minutes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Prompt Popup */}
      <AnimatePresence>
        {showLoginPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl overflow-y-auto"
            onClick={() => setShowLoginPrompt(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden my-4 sm:my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 sm:p-6 md:p-8 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Lock className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
                  Login Required
                </h3>
                <p className="text-white/80 text-xs sm:text-sm">
                  Please login or create an account to use this feature
                </p>
              </div>
              <div className="p-5 sm:p-6 text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
                  Create a free account to access our templates and build your
                  resume
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => setShowLoginPrompt(false)}
                    className="flex-1 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all cursor-pointer text-xs sm:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowLoginPrompt(false);
                      router.push("/login");
                    }}
                    className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer text-xs sm:text-sm"
                  >
                    Login / Sign Up
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Friendly Renewal Required Popup - Positive framing */}
      <AnimatePresence>
        {(showPlanRequiredPopup ||
          (showUpgradePopup &&
            selectedLockedTemplate?.requiredPlan === "Renew")) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl overflow-y-auto"
            onClick={() => {
              setShowPlanRequiredPopup(false);
              setShowUpgradePopup(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden my-4 sm:my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-5 sm:p-6 md:p-8 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Gift className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
                  {subscriptionStatus?.isExpired
                    ? "Your Journey Continues Here!"
                    : "Premium Feature"}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm">
                  {subscriptionStatus?.isExpired
                    ? "Renew your subscription to unlock everything again"
                    : "Unlock AI-powered resume optimization"}
                </p>
              </div>
              <div className="p-5 sm:p-6 text-center">
                <div className="mb-4 sm:mb-6">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-semibold text-gray-900">
                        What you're missing:
                      </span>
                    </div>
                    <div className="space-y-2 text-left">
                      <div className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Upload & AI-optimize existing resumes</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>
                          Access to all {totalTemplates} professional templates
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Priority support & faster processing</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs sm:text-sm">
                    {subscriptionStatus?.isExpired
                      ? `Your ${usersCurrentPlan?.toUpperCase()} plan gave you amazing results. Ready to continue your success story?`
                      : "Upgrade to Premium to upload your existing resume and let our AI optimize it for better results"}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => {
                      setShowPlanRequiredPopup(false);
                      setShowUpgradePopup(false);
                    }}
                    className="flex-1 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all cursor-pointer text-xs sm:text-sm"
                  >
                    Maybe Later
                  </button>
                  <button
                    onClick={() => {
                      setShowPlanRequiredPopup(false);
                      setShowUpgradePopup(false);
                      router.push("/choose-plan");
                    }}
                    className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-amber-600 to-orange-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    {subscriptionStatus?.isExpired
                      ? "Renew Now & Save 20%"
                      : "Upgrade to Premium"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Template Upgrade Popup (for non-expired users) */}
      <AnimatePresence>
        {showUpgradePopup &&
          selectedLockedTemplate &&
          selectedLockedTemplate.requiredPlan !== "Renew" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl overflow-y-auto"
              onClick={() => setShowUpgradePopup(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden my-4 sm:my-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 sm:p-6 md:p-8 text-center relative overflow-hidden">
                  <div className="relative">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Star className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
                      Unlock Premium Template
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm">
                      Get access to {selectedLockedTemplate.requiredPlan}{" "}
                      templates
                    </p>
                  </div>
                </div>
                <div className="p-5 sm:p-6 text-center">
                  <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
                    Upgrade your plan to unlock this template and boost your
                    interview chances by 3x
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={() => setShowUpgradePopup(false)}
                      className="flex-1 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all cursor-pointer text-xs sm:text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setShowUpgradePopup(false);
                        router.push("/choose-plan");
                      }}
                      className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer text-xs sm:text-sm"
                    >
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>

      {/* Upload Popup */}
      <AnimatePresence>
        {showUploadPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl overflow-y-auto"
            onClick={(e) => {
              // Only close if clicking backdrop and not during critical upload
              if (
                uploadStatus !== "uploading" &&
                uploadStatus !== "processing"
              ) {
                resetUploadPopup();
              }
              e.stopPropagation();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-4 sm:my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-4 sm:p-5 md:p-6 relative overflow-hidden">
                <div className="relative flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      Upload Your Resume
                    </h2>
                    <p className="text-white/80 text-xs sm:text-sm mt-0.5 sm:mt-1">
                      Upload file to get started
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // If there's an ongoing upload, abort it
                      if (uploadAbortController.current) {
                        uploadAbortController.current.abort();
                        uploadAbortController.current = null;
                      }
                      // Always close the popup and reset state
                      resetUploadState();
                    }}
                    className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg sm:rounded-xl transition flex-shrink-0"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-5 md:p-6">
                <div
                  className={`relative border-2 border-dashed rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 text-center transition-all duration-300 ${
                    uploadStatus === "error"
                      ? "border-red-500 bg-red-50/40"
                      : uploadStatus === "success"
                        ? "border-emerald-500 bg-emerald-50/40"
                        : isDragging
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/30"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && isValidFileType(file)) {
                        handleFileUpload(file);
                      } else if (file) {
                        setErrorMessage("Please upload a PDF or DOCX file");
                      }
                      // Reset the input value to allow uploading the same file again
                      e.target.value = "";
                    }}
                    disabled={
                      uploadStatus === "uploading" ||
                      uploadStatus === "processing"
                    }
                  />

                  {isUploading || uploadStatus === "processing" ? (
                    <div className="text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 relative">
                        <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
                        <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                        {uploadStatus === "uploading"
                          ? "Uploading"
                          : "Processing"}
                        ... {uploadProgress}%
                      </p>
                      <div className="w-full h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-600 to-indigo-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-3">
                        {uploadStatus === "uploading" &&
                          "Uploading file to server..."}
                        {uploadStatus === "processing" &&
                          "Analyzing and extracting information..."}
                      </p>
                    </div>
                  ) : uploadedFile && uploadStatus === "success" ? (
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 bg-emerald-100 rounded-full flex items-center justify-center">
                        {" "}
                        // if (subscription?.is_expired === true)
                        <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-emerald-500" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-900 mb-0.5 sm:mb-1 break-all">
                        {uploadedFile.name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p className="text-[10px] sm:text-xs text-emerald-600 mt-1 sm:mt-2">
                        ✓ Successfully processed
                      </p>
                    </div>
                  ) : uploadStatus === "error" ? (
                    <div className="text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-red-600" />
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                        Upload Failed
                      </p>
                      <p className="text-[11px] sm:text-xs text-red-600 mb-4">
                        {errorMessage ||
                          "Something went wrong. Please try again."}
                      </p>
                      <button
                        onClick={() => {
                          resetUploadState();
                          document.getElementById("file-upload")?.click();
                        }}
                        className="px-4 sm:px-5 py-2 bg-red-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-red-700 transition"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-indigo-600" />
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                        Drop your file here
                      </p>
                      <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mb-3 sm:mb-4">
                        Supports PDF and DOCX up to 10MB
                      </p>
                      <button
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                        disabled={
                          uploadStatus === "uploading" ||
                          uploadStatus === "processing"
                        }
                        className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer text-xs sm:text-sm"
                      >
                        Browse Files
                      </button>
                    </div>
                  )}
                </div>

                {uploadStatus === "error" && errorMessage && !isUploading && (
                  <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl flex items-start gap-1.5 sm:gap-2">
                    <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] sm:text-xs text-red-600">
                      {errorMessage}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
                  <button
                    onClick={() => {
                      // If there's an ongoing upload, abort it
                      if (uploadAbortController.current) {
                        uploadAbortController.current.abort();
                        uploadAbortController.current = null;
                      }
                      // Always close the popup and reset state
                      resetUploadState();
                    }}
                    className="flex-1 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all cursor-pointer text-xs sm:text-sm"
                  >
                    Cancel
                  </button>
                  {uploadedFile && uploadStatus === "success" && (
                    <button
                      onClick={() => {
                        setShowUploadPopup(false);
                        router.push(`/resume-details/contact`);
                      }}
                      className="flex-1 py-2.5 sm:py-3 bg-emerald-500 text-white rounded-lg sm:rounded-xl font-medium hover:bg-emerald-600 transition-all cursor-pointer text-xs sm:text-sm"
                    >
                      Continue to Resume
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      


      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
            >
              <IoRocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>PROFESSIONAL TEMPLATES</span>
            </motion.div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
              Pick a Resume That
              <span className="block bg-gradient-to-r from-yellow-300 to-amber-200 bg-clip-text text-transparent mt-1 sm:mt-2">
                Gets You Shortlisted
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto px-3">
              Choose a template and let AI build your job-ready resume in
              minutes
            </p>

            {/* Subtle status indicator - not intrusive */}
            {subscriptionStatus?.isExpired ? (
              <div className="mt-5 sm:mt-6 inline-flex items-center gap-1.5 sm:gap-2 bg-amber-500/20 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                <span className="text-xs sm:text-sm text-white/85">
                  Your {usersCurrentPlan?.toUpperCase()} access ended •{" "}
                  <button
                    onClick={() => setShowRenewalReminder(true)}
                    className="underline hover:no-underline"
                  >
                    Renew to unlock
                  </button>
                </span>
              </div>
            ) : usersCurrentPlan && currentPlan !== "no_plan" ? (
              <div className="mt-5 sm:mt-6 inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300" />
                <span className="text-xs sm:text-sm capitalize text-white/85">
                  {currentPlan} Plan • {availableTemplates} Templates Available
                </span>
              </div>
            ) : (
              <div className="mt-5 sm:mt-6 inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300" />
                <span className="text-xs sm:text-sm text-white/85">
                  Login to access templates
                </span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto mt-6 sm:mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4">
                <div className="text-lg sm:text-2xl font-bold text-white">
                  {templateData.length}
                </div>
                <div className="text-[10px] sm:text-xs text-white/80">
                  Total Templates
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4">
                <div className="text-lg sm:text-2xl font-bold text-white">
                  100%
                </div>
                <div className="text-[10px] sm:text-xs text-white/80">
                  ATS-Friendly
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4">
                <div className="text-lg sm:text-2xl font-bold text-white">
                  3min
                </div>
                <div className="text-[10px] sm:text-xs text-white/80">
                  Quick Setup
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
      </div>

      {/* Upload CTA — layered card overlapping the hero edge */}
      <div className="relative z-10 -mt-7 sm:-mt-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={`mx-auto max-w-3xl flex flex-col sm:flex-row items-center gap-4 sm:gap-5 p-4 sm:p-5 ${cardSurface} shadow-[0_16px_40px_-16px_rgba(15,23,42,0.18)]`}
        >
          <IconTile
            icon={
              subscriptionStatus?.isExpired ? (
                <Gift className="h-5 w-5" />
              ) : (
                <FileText className="h-5 w-5" />
              )
            }
            tone={subscriptionStatus?.isExpired ? "amber" : "indigo"}
            size="md"
          />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm font-semibold text-slate-900">
              {subscriptionStatus?.isExpired
                ? "Your AI resume optimization is waiting"
                : "Already have a resume?"}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {subscriptionStatus?.isExpired
                ? "Renew now and get 20% off plus a free resume review"
                : isPremiumUser
                  ? "Upload it and let AI rewrite, fix, and optimize it for better results"
                  : "Upgrade to Premium to upload and improve it with AI"}
            </p>
          </div>
          <button
            onClick={handleUploadClick}
            className={`w-full sm:w-auto ${
              subscriptionStatus?.isExpired ? amberBtn : primaryBtn
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>
              {subscriptionStatus?.isExpired
                ? "Renew to unlock"
                : "Upload & improve"}
            </span>
            {!subscriptionStatus?.isExpired && isPremiumUser && (
              <ArrowRight className="w-4 h-4" />
            )}
            {!isPremiumUser && !subscriptionStatus?.isExpired && (
              <Lock className="w-3.5 h-3.5" />
            )}
          </button>
        </motion.div>
      </div>

      {/* Templates Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-18 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-9 sm:mb-11">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 mb-2">
              Templates
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Select your resume style
            </h2>
            <p className="text-slate-500 text-sm mt-2 px-3 max-w-md mx-auto">
              Simple, clean, and ATS-friendly templates designed to get you
              interview calls
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {templateData?.map((template, index) => {
              const isAccessible = isTemplateAccessible(index);
              const requiredPlan = getRequiredPlanForTemplate(index);
              const requiredPlanLabel = PLAN_CONFIG[requiredPlan].label;
              const isPremium = requiredPlan !== "free";

              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: Math.min(index * 0.07, 0.4),
                    duration: 0.4,
                  }}
                  className="group"
                >
                  <div
                    className={`overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_rgba(15,23,42,0.25)] hover:border-slate-300 ${cardSurface}`}
                  >
                    <div
                      className="relative aspect-[210/280] cursor-pointer bg-slate-50"
                      onClick={() => setSelectedTemplateForMobile(template)}
                    >
                      {isPremium && (
                        <div
                          className={`absolute top-2.5 right-2.5 ${
                            subscriptionStatus?.isExpired
                              ? "bg-amber-100 text-amber-700"
                              : PLAN_CONFIG[requiredPlan].badgeColor
                          } px-2 py-0.5 rounded-full text-[10px] font-semibold z-10 flex items-center gap-1 shadow-sm`}
                        >
                          {requiredPlan === "premium" ? (
                            <Crown className="w-2.5 h-2.5" />
                          ) : (
                            <Star className="w-2.5 h-2.5" />
                          )}
                          <span>
                            {subscriptionStatus?.isExpired
                              ? "Locked"
                              : requiredPlanLabel}
                          </span>
                        </div>
                      )}

                      <Image
                        src={template.image}
                        alt={template?.style || "Template"}
                        fill
                        className="object-cover object-top p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 33vw, 25vw"
                      />

                      <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-slate-950/55 via-slate-950/0 to-slate-950/0 pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-lg">
                          <Eye className="h-3.5 w-3.5 text-indigo-600" />
                          Preview template
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 px-3.5 py-3 border-t border-slate-100">
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-slate-900 truncate">
                          {template.style || "Template"}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">
                          {template.description || "Professional design"}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-500" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Value-driven upgrade prompts instead of error messages */}
          {subscriptionStatus?.isExpired ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-10 sm:mt-12 p-5 sm:p-6 border-amber-200 bg-amber-50/60 ${cardSurface}`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                <div className="flex items-start gap-3.5">
                  <IconTile
                    icon={<Gift className="h-5 w-5" />}
                    tone="amber"
                    size="md"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                      Ready to accelerate your job search?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      {subscriptionStatus.daysExpired
                        ? `Your ${usersCurrentPlan?.toUpperCase()} plan ended ${subscriptionStatus.daysExpired} days ago. Renew today and get:`
                        : "Renew your subscription and unlock:"}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2.5">
                      {[
                        `All ${totalTemplates} templates`,
                        "AI resume optimization",
                        "Priority support",
                      ].map((item) => (
                        <span
                          key={item}
                          className="text-xs text-slate-600 flex items-center gap-1.5"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowRenewalReminder(true)}
                  className={`${amberBtn} w-full sm:w-auto whitespace-nowrap`}
                >
                  Renew now — save 20%
                </button>
              </div>
            </motion.div>
          ) : (
            isUpgradeNeeded && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-10 sm:mt-12 p-4 sm:p-5 ${cardSurface}`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <IconTile
                      icon={<Crown className="h-5 w-5" />}
                      tone="indigo"
                      size="md"
                    />
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                        Unlock all {totalTemplates} templates
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Upgrade to Premium for full access
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push("/choose-plan")}
                    className={`${primaryBtn} w-full sm:w-auto whitespace-nowrap`}
                  >
                    View plans
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* Template Preview Bottom Sheet - Works on all devices */}
      <AnimatePresence>
        {selectedTemplateForMobile && (
          <TemplatePreviewBottomSheet
            template={selectedTemplateForMobile}
            onClose={() => setSelectedTemplateForMobile(null)}
          />
        )}
      </AnimatePresence>

      <ResumePreviewModal
        show={showPreview}
        template={previewTemplate}
        onClose={() => {
          setShowPreview(false);
          setPreviewTemplate(null);
        }}
        onUse={() => {
          if (previewTemplate) {
            const userDetails = getLocalStorage<User>("user_details");
            if (!userDetails?.id) {
              setShowLoginPrompt(true);
              setShowPreview(false);
              return;
            }
            if (subscriptionStatus?.isExpired) {
              setSelectedLockedTemplate({
                template: previewTemplate,
                requiredPlan: "Renew",
              });
              setShowUpgradePopup(true);
              setShowPreview(false);
              return;
            }

            const templateIndex = templateData.findIndex(
              (t) => t.id === previewTemplate.id,
            );
            if (isTemplateAccessible(templateIndex))
              clickresumedetails(previewTemplate);
            else {
              const requiredPlan = getRequiredPlanForTemplate(templateIndex);
              setSelectedLockedTemplate({
                template: previewTemplate,
                requiredPlan: PLAN_CONFIG[requiredPlan].label,
              });
              setShowPreview(false);
              setShowUpgradePopup(true);
            }
          }
        }}
      />

      <Footer />
    </div>
  );
}

export default Choose_template;
