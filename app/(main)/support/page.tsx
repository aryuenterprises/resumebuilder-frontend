// "use client";

// import { useState, FormEvent, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import {
//   FiMail,
//   FiPhone,
//   FiMessageSquare,
//   FiSend,
//   FiUpload,
//   FiX,
//   FiAlertCircle,
//   FiLogIn,
//   FiFileText,
//   FiImage,
//   FiCheckCircle,
//   FiAlertTriangle,
// } from "react-icons/fi";
// import { FaTicketAlt, FaLightbulb } from "react-icons/fa";
// import { API_URL } from "@/app/config/api";
// import { sanitizeText, getLocalStorage } from "@/app/utils";
// import { User } from "@/app/types/user.types";



// interface FormErrors {
//   subject?: string;
//   message?: string;
//   general?: string;
// }

// interface SupportFormPayload {
//   full_name: string;
//   email: string;
//   subject: string;
//   message: string;
//   priority: Priority;
//   source: string;
//   phone?: string;
// }

// type Priority = "low" | "medium" | "high" | "urgent";

// // ---------- Constants ----------
// const MAX_MESSAGE_LEN = 5000;
// const MIN_MESSAGE_LEN = 20;
// const MIN_SUBJECT_LEN = 5;
// const MAX_SUBJECT_LEN = 150;
// const MAX_FILE_SIZE = 5 * 1024 * 1024;
// const MAX_FILES = 3;
// const ALLOWED_FILE_TYPES = [
//   "image/jpeg",
//   "image/png",
//   "image/gif",
//   "image/webp",
//   "application/pdf",
//   "text/plain",
//   "application/msword",
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
// ];

// const URL_ONLY_RE = /^(?:https?:\/\/|www\.)\S+$/i;

// const PRIORITIES: {
//   value: Priority;
//   label: string;
//   color: string;
//   bg: string;
//   dot: string;
// }[] = [
//   { value: "low",      label: "Low",      color: "text-green-700",  bg: "bg-green-50 border-green-200",   dot: "bg-green-500"  },
//   { value: "medium",   label: "Medium",   color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200", dot: "bg-yellow-500" },
//   { value: "high",     label: "High",     color: "text-orange-700", bg: "bg-orange-50 border-orange-200", dot: "bg-orange-500" },
//   { value: "urgent",   label: "Urgent",   color: "text-red-700",    bg: "bg-red-50 border-red-200",       dot: "bg-red-500"    },
// ];

// const SupportPage = () => {
//   const router = useRouter();

//   const [user, setUser] = useState<User | null>(null);
//   const [authChecked, setAuthChecked] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   const [errors, setErrors] = useState<FormErrors>({});
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");
//   const [priority, setPriority] = useState<Priority>("medium");
//   const [files, setFiles] = useState<File[]>([]);
//   const [website, setWebsite] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [focusedField, setFocusedField] = useState<string | null>(null);

//   // ---------- Auth check ----------
//   useEffect(() => {
//     const userDetails = getLocalStorage<User>("user_details");

//     const isLoggedIn =
//       userDetails &&
//       (userDetails.email || userDetails.first_name || userDetails.name);

//     if (!isLoggedIn) {
//       setUser(null);
//       setAuthChecked(true);
//       setShowLoginModal(true);
//       return;
//     }

//     setUser(userDetails);
//     setAuthChecked(true);
//   }, []);

//   const userName = user?.full_name || user?.name || "User";
//   const userEmail = user?.email || "";
//   const userPhone = user?.phone || user?.mobileNum || "";

//   // ---------- File handlers ----------
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selected = Array.from(e.target.files || []);
//     if (!selected.length) return;

//     const next = [...files];

//     for (const f of selected) {
//       if (next.length >= MAX_FILES) {
//         Swal.fire({
//           icon: "warning",
//           title: "Too many files",
//           text: `You can upload up to ${MAX_FILES} files.`,
//           confirmButtonColor: "#4f46e5",
//           customClass: { popup: "rounded-2xl" },
//         });
//         break;
//       }
//       if (f.size > MAX_FILE_SIZE) {
//         Swal.fire({
//           icon: "warning",
//           title: "File too large",
//           text: `"${f.name}" exceeds the 5MB limit.`,
//           confirmButtonColor: "#4f46e5",
//           customClass: { popup: "rounded-2xl" },
//         });
//         continue;
//       }
//       if (!ALLOWED_FILE_TYPES.includes(f.type)) {
//         Swal.fire({
//           icon: "warning",
//           title: "Unsupported file",
//           text: `"${f.name}" is not a supported file type.`,
//           confirmButtonColor: "#4f46e5",
//           customClass: { popup: "rounded-2xl" },
//         });
//         continue;
//       }
//       if (!next.some((x) => x.name === f.name && x.size === f.size)) {
//         next.push(f);
//       }
//     }

//     setFiles(next);
//     e.target.value = "";
//   };

//   const removeFile = (index: number) => {
//     setFiles((prev) => prev.filter((_, i) => i !== index));
//   };

//   const formatSize = (bytes: number) => {
//     if (bytes < 1024) return `${bytes} B`;
//     if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
//     return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
//   };

//   // ---------- Validation ----------
//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};
//     const asTrimmed = (v: unknown) => (typeof v === "string" ? v.trim() : "");

//     if (asTrimmed(website).length > 0) {
//       newErrors.general = "Unable to submit. Please try again.";
//       setErrors(newErrors);
//       return false;
//     }

//     const tSubject = asTrimmed(subject);
//     if (!tSubject) {
//       newErrors.subject = "Subject is required";
//     } else if (tSubject.length < MIN_SUBJECT_LEN) {
//       newErrors.subject = `Subject must be at least ${MIN_SUBJECT_LEN} characters`;
//     } else if (tSubject.length > MAX_SUBJECT_LEN) {
//       newErrors.subject = `Subject must be at most ${MAX_SUBJECT_LEN} characters`;
//     }

//     const tMessage = asTrimmed(message);
//     if (!tMessage) {
//       newErrors.message = "Message is required";
//     } else if (tMessage.length < MIN_MESSAGE_LEN) {
//       newErrors.message = `Message must be at least ${MIN_MESSAGE_LEN} characters`;
//     } else if (tMessage.length > MAX_MESSAGE_LEN) {
//       newErrors.message = `Message must be at most ${MAX_MESSAGE_LEN} characters`;
//     } else if (URL_ONLY_RE.test(tMessage)) {
//       newErrors.message = "Please describe your issue, not just a link";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ---------- Submit ----------
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!user) {
//       setShowLoginModal(true);
//       return;
//     }
//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     try {
//       const formData: SupportFormPayload = {
//         full_name: userName,
//         email: userEmail,
//         subject: subject.trim(),
//         message: message.trim(),
//         priority,
//         source: "support",
//         phone: userPhone || undefined,
//       };

//       await axios.post(`${API_URL}/support`, formData);

//       Swal.fire({
//         icon: "success",
//         title: "Ticket submitted!",
//         html: `<p>Your support ticket was created successfully.</p>
//                <p class="text-sm text-gray-500 mt-2">We'll respond to <b>${userEmail}</b> within 24 hours.</p>`,
//         confirmButtonText: "Done",
//         confirmButtonColor: "#4f46e5",
//         customClass: { popup: "rounded-2xl" },
//       });

//       setSubject("");
//       setMessage("");
//       setPriority("medium");
//       setFiles([]);
//       setWebsite("");
//       setErrors({});
//     } catch (err: unknown) {
//       console.error("Error submitting support request:", err);
//       const errorMessage =
//         axios.isAxiosError(err) && err.response?.data?.message
//           ? err.response.data.message
//           : "Please try again later.";

//       Swal.fire({
//         icon: "error",
//         title: "Submission failed",
//         text: errorMessage,
//         confirmButtonText: "OK",
//         confirmButtonColor: "#4f46e5",
//         customClass: { popup: "rounded-2xl" },
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ---------- Loading state while checking auth ----------
//   if (!authChecked) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
//           <p className="text-xs text-gray-500">Verifying your session…</p>
//         </div>
//       </div>
//     );
//   }

//   // ---------- Not logged in: only show modal, no form ----------
//   if (!user) {
//     return (
//       <div className="min-h-[80vh] bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col">
//         <div className="relative flex-1 flex items-center justify-center p-3 sm:p-4 md:p-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="w-full max-w-md px-2 sm:px-0"
//           >
//             <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//               <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-500"></div>
//               <div className="p-6 sm:p-8 text-center">
//                 <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-2xl mb-3">
//                   <FaTicketAlt className="w-6 h-6 text-indigo-600" />
//                 </div>
//                 <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
//                   Support Center
//                 </h2>
//                 <p className="text-xs sm:text-sm text-gray-500 mt-2">
//                   Please log in to submit a support ticket.
//                 </p>
//                 <Link
//                   href="/login?redirect=/support"
//                   className="mt-5 inline-flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg sm:rounded-xl hover:from-indigo-700 hover:to-indigo-600 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 text-xs sm:text-sm"
//                 >
//                   <FiLogIn className="w-4 h-4" />
//                   Go to Login
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Login Required Modal */}
//       {/* Login Required Modal — Warning Theme */}
// <AnimatePresence>
//   {showLoginModal && (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 20 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 20 }}
//         transition={{ type: "spring", damping: 25, stiffness: 300 }}
//         className="relative w-full max-w-md"
//       >
//         <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-100">
//           <button
//             onClick={() => setShowLoginModal(false)}
//             className="absolute top-4 right-4 z-10 text-white hover:text-amber-100 transition-colors cursor-pointer"
//             aria-label="Close"
//           >
//             <FiX className="w-5 h-5" />
//           </button>

//           {/* Amber gradient header */}
//           <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 pt-8 pb-6 text-center">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
//               className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4"
//             >
//               <FiAlertTriangle className="w-10 h-10 text-amber-500" />
//             </motion.div>
//             <h3 className="text-2xl font-bold text-white">
//               Login Required
//             </h3>
//           </div>

//           {/* Content */}
//           <div className="p-5 md:p-6">
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-amber-50 rounded-xl p-4 mb-6 border-l-4 border-amber-400"
//             >
//               <div className="flex gap-3">
//                 <div className="flex-shrink-0">
//                   <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
//                     <FiAlertTriangle className="w-4 h-4 text-amber-600" />
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-amber-900 font-semibold text-sm mb-1">
//                     Please sign in to continue
//                   </p>
//                   <p className="text-amber-800/80 text-sm">
//                     You need to log in to submit a support ticket. Your contact
//                     details will be filled in automatically once you're signed
//                     in.
//                   </p>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="flex"
//             >
//               <button
//                 onClick={() => router.push("/login?redirect=/support")}
//                 className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md cursor-pointer text-[12px] sm:text-sm inline-flex items-center justify-center gap-2"
//               >
//                 <FiLogIn className="w-4 h-4" />
//                 Go to Login
//               </button>
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   )}
// </AnimatePresence>
//       </div>
//     );
//   }

//   // ---------- Logged-in: full support form ----------
//   const inputBase =
//     "w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm focus:outline-none transition-all duration-200";
//   const inputOk =
//     "border-gray-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";
//   const inputErr = "border-red-500 bg-red-50/30 focus:border-red-500";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col">
//       <div className="relative flex-1 flex items-center justify-center p-3 sm:p-4 md:p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-md px-2 sm:px-0"
//         >
//           <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//             <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-500"></div>

//             <div className="p-4 sm:p-6 md:p-8">
//               {/* Header */}
//               <div className="text-center mb-4 sm:mb-5 md:mb-6">
//                 <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-indigo-100 rounded-xl sm:rounded-2xl mb-2 sm:mb-3">
//                   <FaTicketAlt className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-indigo-600" />
//                 </div>
//                 <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
//                   Hi {userName.split(" ")[0]}, how can we help?
//                 </h2>
//                 <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1">
//                   We'll respond within 24 hours
//                 </p>
//               </div>

//               {/* Logged-in user badge */}
//               <div className="flex items-center gap-3 px-3 py-2.5 mb-5 rounded-xl bg-indigo-50/70 border border-indigo-100">
//                 <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-semibold text-xs sm:text-sm shrink-0">
//                   {userName.charAt(0).toUpperCase()}
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <p className="text-[11px] sm:text-xs font-semibold text-gray-900 truncate">
//                     {userName}
//                   </p>
//                   <p className="text-[9px] sm:text-[10px] text-gray-500 truncate">
//                     {userEmail}
//                   </p>
//                 </div>
//                 <FiCheckCircle className="w-4 h-4 text-green-500 shrink-0" />
//               </div>

//               <form onSubmit={handleSubmit} noValidate>
//                 {/* Honeypot */}
//                 <input
//                   type="text"
//                   name="website"
//                   value={website}
//                   onChange={(e) => setWebsite(e.target.value)}
//                   tabIndex={-1}
//                   autoComplete="off"
//                   aria-hidden="true"
//                   style={{
//                     position: "absolute",
//                     left: "-9999px",
//                     opacity: 0,
//                     height: 0,
//                     width: 0,
//                   }}
//                 />

//                 {/* Subject */}
//                 <div className="mb-4 sm:mb-5">
//                   <label className="block text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
//                     Subject <span className="text-indigo-500">*</span>
//                   </label>
//                   <div className="relative group">
//                     <div
//                       className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
//                         focusedField === "subject"
//                           ? "text-indigo-600"
//                           : "text-gray-400"
//                       }`}
//                     >
//                       <FiMessageSquare className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
//                     </div>
//                     <input
//                       type="text"
//                       value={subject}
//                       onChange={(e) => setSubject(sanitizeText(e.target.value))}
//                       onFocus={() => setFocusedField("subject")}
//                       onBlur={() => setFocusedField(null)}
//                       placeholder="Brief summary of your issue"
//                       maxLength={MAX_SUBJECT_LEN}
//                       className={`${inputBase} ${
//                         errors.subject ? inputErr : inputOk
//                       }`}
//                     />
//                   </div>
//                   {errors.subject ? (
//                     <p className="text-red-500 text-[9px] sm:text-[10px] md:text-xs mt-1">
//                       {errors.subject}
//                     </p>
//                   ) : (
//                     <p className="text-[9px] sm:text-[10px] text-gray-400 mt-1 text-right">
//                       {subject.length}/{MAX_SUBJECT_LEN}
//                     </p>
//                   )}
//                 </div>

//                 {/* Message */}
//                 <div className="mb-4 sm:mb-5">
//                   <label className="block text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
//                     Message <span className="text-indigo-500">*</span>
//                   </label>
//                   <div className="relative group">
//                     <div
//                       className={`absolute left-3 top-3 transition-colors duration-200 ${
//                         focusedField === "message"
//                           ? "text-indigo-600"
//                           : "text-gray-400"
//                       }`}
//                     >
//                       <FiFileText className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
//                     </div>
//                     <textarea
//                       value={message}
//                       onChange={(e) => setMessage(e.target.value)}
//                       onFocus={() => setFocusedField("message")}
//                       onBlur={() => setFocusedField(null)}
//                       placeholder="Describe your issue in detail…"
//                       rows={5}
//                       maxLength={MAX_MESSAGE_LEN}
//                       className={`${inputBase} resize-none ${
//                         errors.message ? inputErr : inputOk
//                       }`}
//                     />
//                   </div>
//                   <div className="flex justify-between items-center mt-1">
//                     {errors.message ? (
//                       <p className="text-red-500 text-[9px] sm:text-[10px] md:text-xs">
//                         {errors.message}
//                       </p>
//                     ) : (
//                       <span />
//                     )}
//                     <span className="text-[9px] sm:text-[10px] text-gray-400">
//                       {message.length}/{MAX_MESSAGE_LEN}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Priority */}
//                 <div className="mb-4 sm:mb-5">
//                   <label className="block text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
//                     Priority <span className="text-indigo-500">*</span>
//                   </label>
//                   <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
//                     {PRIORITIES.map((p) => {
//                       const active = priority === p.value;
//                       return (
//                         <button
//                           type="button"
//                           key={p.value}
//                           onClick={() => setPriority(p.value)}
//                           className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 rounded-lg sm:rounded-xl border-2 text-[10px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer ${
//                             active
//                               ? `${p.bg} ${p.color} ring-2 ring-indigo-100`
//                               : "border-gray-200 bg-white text-gray-600 hover:border-indigo-300"
//                           }`}
//                         >
//                           <span
//                             className={`w-1.5 h-1.5 rounded-full ${p.dot}`}
//                           />
//                           {p.label}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Attachments */}
//                 <div className="mb-4 sm:mb-5">
//                   <label className="block text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
//                     Attachments{" "}
//                     <span className="text-gray-400 font-normal">
//                       (up to {MAX_FILES} files, 5MB each)
//                     </span>
//                   </label>

//                   <label
//                     htmlFor="support-files"
//                     className="flex items-center gap-2 px-3 py-2.5 rounded-lg sm:rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer"
//                   >
//                     <FiUpload className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0" />
//                     <span className="text-[11px] sm:text-xs md:text-sm text-gray-600 truncate">
//                       Click to upload screenshots or documents
//                     </span>
//                     {files.length > 0 && (
//                       <span className="ml-auto text-[9px] sm:text-xs font-semibold text-indigo-600 shrink-0">
//                         {files.length}/{MAX_FILES}
//                       </span>
//                     )}
//                   </label>
//                   <input
//                     id="support-files"
//                     type="file"
//                     multiple
//                     className="hidden"
//                     onChange={handleFileChange}
//                     accept={ALLOWED_FILE_TYPES.join(",")}
//                   />

//                   {files.length > 0 && (
//                     <ul className="mt-2 space-y-1.5">
//                       {files.map((f, i) => {
//                         const isImage = f.type.startsWith("image/");
//                         return (
//                           <li
//                             key={`${f.name}-${i}`}
//                             className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-gray-50 border border-gray-100"
//                           >
//                             <span className="w-7 h-7 rounded-md bg-indigo-100 flex items-center justify-center shrink-0">
//                               {isImage ? (
//                                 <FiImage className="w-3 h-3 text-indigo-600" />
//                               ) : (
//                                 <FiFileText className="w-3 h-3 text-indigo-600" />
//                               )}
//                             </span>
//                             <div className="min-w-0 flex-1">
//                               <p className="text-[11px] sm:text-xs font-medium text-gray-800 truncate">
//                                 {f.name}
//                               </p>
//                               <p className="text-[9px] sm:text-[10px] text-gray-500">
//                                 {formatSize(f.size)}
//                               </p>
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => removeFile(i)}
//                               className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
//                               aria-label={`Remove ${f.name}`}
//                             >
//                               <FiX className="w-3 h-3" />
//                             </button>
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   )}
//                 </div>

//                 {/* General error */}
//                 {errors.general && (
//                   <div className="mb-4 p-2.5 sm:p-3 bg-red-50 border border-red-100 rounded-lg">
//                     <p className="text-red-600 text-[11px] sm:text-xs">
//                       {errors.general}
//                     </p>
//                   </div>
//                 )}

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full py-2.5 sm:py-3 font-semibold rounded-lg sm:rounded-xl flex items-center justify-center gap-2 text-[11px] sm:text-xs md:text-sm transition-all duration-300 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-700 hover:to-indigo-600 hover:shadow-lg hover:shadow-indigo-500/25 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       <span>Submitting...</span>
//                     </>
//                   ) : (
//                     <>
//                       <FiSend className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                       <span>Submit Ticket</span>
//                     </>
//                   )}
//                 </button>

//                 {/* Privacy */}
//                 <div className="mt-4 sm:mt-5 text-center">
//                   <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400">
//                     By submitting, you agree to our{" "}
//                     <Link
//                       href="/terms-conditions"
//                       className="text-indigo-600 hover:underline cursor-pointer"
//                     >
//                       Terms
//                     </Link>{" "}
//                     and{" "}
//                     <Link
//                       href="/privacy-policy"
//                       className="text-indigo-600 hover:underline cursor-pointer"
//                     >
//                       Privacy Policy
//                     </Link>
//                   </p>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default SupportPage;