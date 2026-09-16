// "use client";

// import { useState, FormEvent, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import {
//   FiMessageSquare,
//   FiSend,
//   FiUpload,
//   FiX,
//   FiLogIn,
//   FiFileText,
//   FiImage,
//   FiAlertTriangle,
//   FiChevronDown,
//   FiClock,
//   FiInbox,
//   FiPaperclip,
//   FiEye,
//   FiDownload,
//   FiTrash2,
// } from "react-icons/fi";
// import { FaTicketAlt } from "react-icons/fa";
// import { API_URL } from "@/app/config/api";
// import { sanitizeText, getLocalStorage } from "@/app/utils";
// import { User } from "@/app/types/user.types";
// import api from "@/app/utils/api";
// import apiClient from "@/app/utils/apiClient";

// // ---------- Types ----------
// interface FormErrors {
//   subject?: string;
//   message?: string;
//   general?: string;
// }

// interface TicketAttachment {
//   attachment_id: number;
//   file: string;
//   created_at?: string;
// }


// // ---------- Types ----------
// interface TicketReply {
//   reply_id: number;
//   id: number;
//   sender_type: string;
//   sender_name: string;
//   sender: {
//     name: string;
//     email: string;
//     type: string;
//     sender_type: string;
//   };
//   message: string;
//   created_at: string;
// }

// interface Ticket {
//   ticket_id: number;
//   ticket_token: string;
//   subject: string;
//   message: string;
//   ticket_type: string;
//   status: string;
//   priority: string;
//   reply_count: number;        // was replies_count
//   replies: TicketReply[];      // new
//   attachments: TicketAttachment[];
//   created_at: string;
//   updated_at: string;
// }

// interface TicketsResponse {
//   success: boolean;
//   counts: {
//     new: number;
//     in_progress: number;
//     closed: number;
//     total: number;
//   };
//   tickets: Ticket[];
// }

// type Priority = "low" | "medium" | "high" | "urgent";

// // ---------- Constants ----------
// const MAX_MESSAGE_LEN = 5000;
// const MIN_MESSAGE_LEN = 20;
// const MIN_SUBJECT_LEN = 5;
// const MAX_SUBJECT_LEN = 150;
// const MAX_FILE_SIZE = 800 * 1024; // 800KB per file

// const MAX_FILES = 5;
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
//   { value: "low",    label: "Low",    color: "text-green-700",  bg: "bg-green-50 border-green-200",   dot: "bg-green-500"  },
//   { value: "medium", label: "Medium", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200", dot: "bg-yellow-500" },
//   { value: "high",   label: "High",   color: "text-orange-700", bg: "bg-orange-50 border-orange-200", dot: "bg-orange-500" },
//   { value: "urgent", label: "Urgent", color: "text-red-700",    bg: "bg-red-50 border-red-200",       dot: "bg-red-500"    },
// ];

// const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
//   New:           { bg: "bg-blue-50 border-blue-200",   text: "text-blue-700",  dot: "bg-blue-500"  },
//   Open:          { bg: "bg-blue-50 border-blue-200",   text: "text-blue-700",  dot: "bg-blue-500"  },
//   "In Progress": { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", dot: "bg-amber-500" },
//   in_progress:   { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", dot: "bg-amber-500" },
//   Closed:        { bg: "bg-gray-100 border-gray-200",  text: "text-gray-600",  dot: "bg-gray-400"  },
//   Resolved:      { bg: "bg-green-50 border-green-200", text: "text-green-700", dot: "bg-green-500" },
// };

// const getStatusStyle = (status: string) =>
//   STATUS_STYLES[status] ||
//   { bg: "bg-gray-100 border-gray-200", text: "text-gray-600", dot: "bg-gray-400" };

// const getPriorityStyle = (p: string) =>
//   PRIORITIES.find((x) => x.value === p.toLowerCase()) || PRIORITIES[1];

// // format: "2026-09-12 12:46:30" → "12 Sep 2026, 12:46"
// const formatDate = (raw: string) => {
//   if (!raw) return "";
//   const [datePart, timePart] = raw.split(" ");
//   if (!datePart) return raw;
//   const [y, m, d] = datePart.split("-").map(Number);
//   const dt = new Date(y, (m || 1) - 1, d || 1);
//   const month = dt.toLocaleString("en-US", { month: "short" });
//   const time = timePart ? timePart.slice(0, 5) : "";
//   return `${d} ${month} ${y}${time ? `, ${time}` : ""}`;
// };

// const isImageUrl = (url: string) => {
//   const lower = url.split("?")[0].toLowerCase();
//   return /\.(jpe?g|png|gif|webp|bmp|svg)$/.test(lower);
// };

// const fileNameFromUrl = (url: string) => {
//   try {
//     const clean = url.split("?")[0];
//     const parts = clean.split("/");
//     const last = parts[parts.length - 1];
//     return decodeURIComponent(last || "file");
//   } catch {
//     return "file";
//   }
// };

// // ---------- Attachment preview modal ----------
// function AttachmentPreviewModal({
//   url,
//   onClose,
// }: {
//   url: string;
//   onClose: () => void;
// }) {
//   const isImage = isImageUrl(url);

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0, y: 20 }}
//           animate={{ scale: 1, opacity: 1, y: 0 }}
//           exit={{ scale: 0.9, opacity: 0, y: 20 }}
//           transition={{ type: "spring", damping: 25, stiffness: 300 }}
//           className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-100 shrink-0">
//             <div className="flex items-center gap-2 min-w-0">
//               <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
//                 {isImage ? (
//                   <FiImage className="w-4 h-4 text-indigo-600" />
//                 ) : (
//                   <FiFileText className="w-4 h-4 text-indigo-600" />
//                 )}
//               </div>
//               <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
//                 {fileNameFromUrl(url)}
//               </p>
//             </div>
//             <div className="flex items-center gap-1.5 shrink-0">
//               <a
//                 href={url}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
//                 aria-label="Download"
//               >
//                 <FiDownload className="w-4 h-4" />
//               </a>
//               <button
//                 onClick={onClose}
//                 className="p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
//                 aria-label="Close"
//               >
//                 <FiX className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           <div className="flex-1 overflow-auto bg-gray-50 flex items-center justify-center p-4">
//             {isImage ? (
//               // eslint-disable-next-line @next/next/no-img-element
//               <img
//                 src={url}
//                 alt="Attachment"
//                 className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md"
//               />
//             ) : (
//               <div className="text-center py-10">
//                 <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-100 flex items-center justify-center mb-4">
//                   <FiFileText className="w-8 h-8 text-indigo-600" />
//                 </div>
//                 <p className="text-sm font-semibold text-gray-700 mb-1">
//                   Preview not available
//                 </p>
//                 <p className="text-xs text-gray-500 mb-4">
//                   This file type can't be previewed in the browser.
//                 </p>
//                 <a
//                   href={url}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg text-xs sm:text-sm font-semibold hover:from-indigo-700 hover:to-indigo-600 transition-all"
//                 >
//                   <FiDownload className="w-4 h-4" />
//                   Download file
//                 </a>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// // ---------- Main page ----------
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

//   // tickets
//   const [tickets, setTickets] = useState<Ticket[]>([]);
//   const [counts, setCounts] = useState<TicketsResponse["counts"] | null>(null);
//   const [loadingTickets, setLoadingTickets] = useState(true);
//   const [expandedTicket, setExpandedTicket] = useState<number | null>(null);
//   const [showAllTickets, setShowAllTickets] = useState(false);

//   // attachment preview modal
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   // local preview for pending uploads
//   const [localPreviews, setLocalPreviews] = useState<Record<string, string>>({});

//   // ---------- Auth check ----------
//   useEffect(() => {
//     const userDetails = getLocalStorage<User>("user_details");
//     const isLoggedIn =
//       userDetails && (userDetails.email || userDetails.first_name);

//     if (!isLoggedIn) {
//       setUser(null);
//       setAuthChecked(true);
//       setShowLoginModal(true);
//       return;
//     }

//     setUser(userDetails);
//     setAuthChecked(true);
//   }, []);

//   // ---------- Fetch tickets ----------
//   const fetchTickets = async () => {
//     setLoadingTickets(true);
//     try {
//       const res = await apiClient.get(`tickets/`);
//       const data = res?.data;
//       if (data?.success) {
//         setTickets(data.tickets || []);
//         setCounts(data.counts || null);
//       } else {
//         setTickets([]);
//       }
//     } catch (err) {
//       console.error("Error fetching tickets:", err);
//       setTickets([]);
//     } finally {
//       setLoadingTickets(false);
//     }
//   };

//   useEffect(() => {
//     if (!user) return;
//     fetchTickets();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user]);

//   // ---------- Cleanup object URLs on unmount ----------
//   useEffect(() => {
//     return () => {
//       Object.values(localPreviews).forEach((url) => {
//         try {
//           URL.revokeObjectURL(url);
//         } catch {
//           /* noop */
//         }
//       });
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const userName =
//     `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || "User";

//   // ---------- Multi-file handlers ----------
//   const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const selected = Array.from(e.target.files || []);
//   if (!selected.length) return;

//   const next = [...files];

//   for (const f of selected) {
//     if (next.length >= MAX_FILES) {
//       Swal.fire({
//         icon: "warning",
//         title: "Too many files",
//         text: `You can upload up to ${MAX_FILES} files.`,
//         confirmButtonColor: "#4f46e5",
//         customClass: { popup: "rounded-2xl" },
//       });
//       break;
//     }
//   if (f.size > MAX_FILE_SIZE) {
//   Swal.fire({
//     icon: "warning",
//     title: "File too large",
//     text: `"${f.name}" exceeds the 800KB limit.`,
//     confirmButtonColor: "#4f46e5",
//     customClass: { popup: "rounded-2xl" },
//   });
//   continue;
// }
//     if (!ALLOWED_FILE_TYPES.includes(f.type)) {
//       Swal.fire({
//         icon: "warning",
//         title: "Unsupported file",
//         text: `"${f.name}" is not a supported file type.`,
//         confirmButtonColor: "#4f46e5",
//         customClass: { popup: "rounded-2xl" },
//       });
//       continue;
//     }

//     const dup = next.some((x) => x.name === f.name && x.size === f.size);
//     if (dup) continue;

//     next.push(f);

//     if (f.type.startsWith("image/")) {
//       const url = URL.createObjectURL(f);
//       setLocalPreviews((prev) => ({
//         ...prev,
//         [`${f.name}-${f.size}`]: url,
//       }));
//     }
//   }

//   setFiles(next);
//   e.target.value = "";
// };

//   const removeFile = (index: number) => {
//     setFiles((prev) => {
//       const target = prev[index];
//       if (target) {
//         const key = `${target.name}-${target.size}`;
//         setLocalPreviews((p) => {
//           const url = p[key];
//           if (url) {
//             try {
//               URL.revokeObjectURL(url);
//             } catch {
//               /* noop */
//             }
//           }
//           const { [key]: _, ...rest } = p;
//           return rest;
//         });
//       }
//       return prev.filter((_, i) => i !== index);
//     });
//   };

//   const formatSize = (bytes: number) => {
//   if (bytes < 1024) return `${bytes} B`;
//   if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
//   return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
// };

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
//       const formData = new FormData();
//       formData.append("subject", subject.trim());
//       formData.append("message", message.trim());
//       formData.append("priority", priority);
//       formData.append("ticket_type", "support");

//       // Multi-file binary upload — backend should accept multiple "attachments" entries
//       files.forEach((f) => {
//         formData.append("attachments", f, f.name);
//       });

      

//       await apiClient.post(`${API_URL}/tickets/`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       Swal.fire({
//         icon: "success",
//         title: "Ticket submitted!",
//         html: `<p>Your support ticket was created successfully.</p>
//                <p class="text-sm text-gray-500 mt-2">We'll respond within 24 hours.</p>`,
//         confirmButtonText: "Done",
//         confirmButtonColor: "#4f46e5",
//         customClass: { popup: "rounded-2xl" },
//       });

//       // Revoke local previews
//       Object.values(localPreviews).forEach((url) => {
//         try {
//           URL.revokeObjectURL(url);
//         } catch {
//           /* noop */
//         }
//       });
//       setLocalPreviews({});

//       setSubject("");
//       setMessage("");
//       setPriority("medium");
//       setFiles([]);
//       setWebsite("");
//       setErrors({});

//       fetchTickets();
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

//   // ---------- Loading ----------
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

//   // ---------- Not logged in ----------
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

//         <AnimatePresence>
//           {showLoginModal && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0, y: 20 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.9, opacity: 0, y: 20 }}
//                 transition={{ type: "spring", damping: 25, stiffness: 300 }}
//                 className="relative w-full max-w-md"
//               >
//                 <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-100">
//                   <button
//                     onClick={() => setShowLoginModal(false)}
//                     className="absolute top-4 right-4 z-10 text-white hover:text-amber-100 transition-colors cursor-pointer"
//                     aria-label="Close"
//                   >
//                     <FiX className="w-5 h-5" />
//                   </button>

//                   <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 pt-8 pb-6 text-center">
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
//                       className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4"
//                     >
//                       <FiAlertTriangle className="w-10 h-10 text-amber-500" />
//                     </motion.div>
//                     <h3 className="text-2xl font-bold text-white">
//                       Login Required
//                     </h3>
//                   </div>

//                   <div className="p-5 md:p-6">
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.2 }}
//                       className="bg-amber-50 rounded-xl p-4 mb-6 border-l-4 border-amber-400"
//                     >
//                       <div className="flex gap-3">
//                         <div className="flex-shrink-0">
//                           <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
//                             <FiAlertTriangle className="w-4 h-4 text-amber-600" />
//                           </div>
//                         </div>
//                         <div>
//                           <p className="text-amber-900 font-semibold text-sm mb-1">
//                             Please sign in to continue
//                           </p>
//                           <p className="text-amber-800/80 text-sm">
//                             You need to log in to submit a support ticket. Your
//                             contact details will be filled in automatically.
//                           </p>
//                         </div>
//                       </div>
//                     </motion.div>

//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.4 }}
//                       className="flex"
//                     >
//                       <button
//                         onClick={() => router.push("/login?redirect=/support")}
//                         className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md cursor-pointer text-[12px] sm:text-sm inline-flex items-center justify-center gap-2"
//                       >
//                         <FiLogIn className="w-4 h-4" />
//                         Go to Login
//                       </button>
//                     </motion.div>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     );
//   }

//   // ---------- Logged-in ----------
//   const inputBase =
//     "w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm focus:outline-none transition-all duration-200";
//   const inputOk =
//     "border-gray-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";
//   const inputErr = "border-red-500 bg-red-50/30 focus:border-red-500";

//   const visibleTickets = showAllTickets ? tickets : tickets.slice(0, 3);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
//       <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10">
//         {/* Page header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="mb-6 sm:mb-8"
//         >
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <div>
//               <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
//                 Support Center
//               </h1>
//               <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                 Hi {userName}, manage your tickets and get help from our team.
//               </p>
//             </div>

//             {counts && (
//               <div className="flex flex-wrap items-center gap-2">
//                 <CountBadge label="Total" value={counts.total} tone="indigo" />
//                 <CountBadge label="New" value={counts.new} tone="blue" />
//                 <CountBadge
//                   label="In Progress"
//                   value={counts.in_progress}
//                   tone="amber"
//                 />
//                 <CountBadge label="Closed" value={counts.closed} tone="gray" />
//               </div>
//             )}
//           </div>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 md:gap-6">
//           {/* ============ LEFT: Tickets list ============ */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             className="lg:col-span-3 order-2 lg:order-1"
//           >
//             <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//               <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-500"></div>

//               <div className="p-4 sm:p-5 md:p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
//                       <FaTicketAlt className="w-4 h-4 text-indigo-600" />
//                     </div>
//                     <div>
//                       <h2 className="text-sm sm:text-base font-bold text-gray-900">
//                         My Tickets
//                       </h2>
//                       <p className="text-[10px] sm:text-xs text-gray-500">
//                         {tickets.length} ticket
//                         {tickets.length !== 1 ? "s" : ""}
//                       </p>
//                     </div>
//                   </div>

//                   <button
//                     onClick={fetchTickets}
//                     disabled={loadingTickets}
//                     className="text-[10px] sm:text-xs text-indigo-600 font-semibold hover:text-indigo-700 disabled:opacity-50 cursor-pointer"
//                   >
//                     {loadingTickets ? "Loading…" : "Refresh"}
//                   </button>
//                 </div>

//                 {loadingTickets ? (
//                   <div className="space-y-3">
//                     {[0, 1, 2].map((i) => (
//                       <div
//                         key={i}
//                         className="animate-pulse border border-gray-100 rounded-xl p-4"
//                       >
//                         <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
//                         <div className="h-2 bg-gray-200 rounded w-1/2 mb-3" />
//                         <div className="flex gap-2">
//                           <div className="h-5 bg-gray-100 rounded-full w-16" />
//                           <div className="h-5 bg-gray-100 rounded-full w-20" />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : tickets.length === 0 ? (
//                   <EmptyTickets />
//                 ) : (
//                   <>
//                     <ul className="space-y-3">
//                       {visibleTickets.map((t) => (
//                         <TicketRow
//                           key={t.ticket_id}
//                           ticket={t}
//                           expanded={expandedTicket === t.ticket_id}
//                           onToggle={() =>
//                             setExpandedTicket((cur) =>
//                               cur === t.ticket_id ? null : t.ticket_id
//                             )
//                           }
//                           onPreview={(url) => setPreviewUrl(url)}
//                         />
//                       ))}
//                     </ul>

//                     {tickets.length > 3 && (
//                       <button
//                         onClick={() => setShowAllTickets((v) => !v)}
//                         className="mt-4 w-full py-2.5 text-[11px] sm:text-xs font-semibold text-indigo-600 rounded-lg border border-indigo-100 bg-indigo-50/40 hover:bg-indigo-50 transition-colors cursor-pointer"
//                       >
//                         {showAllTickets
//                           ? "Show less"
//                           : `Show all ${tickets.length} tickets`}
//                       </button>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           </motion.div>

//           {/* ============ RIGHT: New ticket form ============ */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             className="lg:col-span-2 order-1 lg:order-2"
//           >
//             <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-6">
//               <div className="h-1 bg-gradient-to-r from-indigo-600 to-indigo-500"></div>

//               <div className="p-4 sm:p-5 md:p-6">
//                 <div className="text-center mb-4 sm:mb-5">
//                   <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-indigo-100 rounded-xl mb-2">
//                     <FaTicketAlt className="w-5 h-5 text-indigo-600" />
//                   </div>
//                   <h2 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
//                     New Support Ticket
//                   </h2>
//                   <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
//                     We'll respond within 24 hours
//                   </p>
//                 </div>

//                 <form onSubmit={handleSubmit} noValidate>
//                   {/* Honeypot */}
//                   <input
//                     type="text"
//                     name="website"
//                     value={website}
//                     onChange={(e) => setWebsite(e.target.value)}
//                     tabIndex={-1}
//                     autoComplete="off"
//                     aria-hidden="true"
//                     style={{
//                       position: "absolute",
//                       left: "-9999px",
//                       opacity: 0,
//                       height: 0,
//                       width: 0,
//                     }}
//                   />

//                   {/* Subject */}
//                   <div className="mb-3 sm:mb-4">
//                     <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-1.5">
//                       Subject <span className="text-indigo-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <div
//                         className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
//                           focusedField === "subject"
//                             ? "text-indigo-600"
//                             : "text-gray-400"
//                         }`}
//                       >
//                         <FiMessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
//                       </div>
//                       <input
//                         type="text"
//                         value={subject}
//                         onChange={(e) =>
//                           setSubject(sanitizeText(e.target.value))
//                         }
//                         onFocus={() => setFocusedField("subject")}
//                         onBlur={() => setFocusedField(null)}
//                         placeholder="Brief summary"
//                         maxLength={MAX_SUBJECT_LEN}
//                         className={`${inputBase} ${
//                           errors.subject ? inputErr : inputOk
//                         }`}
//                       />
//                     </div>
//                     {errors.subject ? (
//                       <p className="text-red-500 text-[9px] sm:text-[10px] mt-1">
//                         {errors.subject}
//                       </p>
//                     ) : (
//                       <p className="text-[9px] sm:text-[10px] text-gray-400 mt-1 text-right">
//                         {subject.length}/{MAX_SUBJECT_LEN}
//                       </p>
//                     )}
//                   </div>

//                   {/* Message */}
//                   <div className="mb-3 sm:mb-4">
//                     <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-1.5">
//                       Message <span className="text-indigo-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <div
//                         className={`absolute left-3 top-3 transition-colors duration-200 ${
//                           focusedField === "message"
//                             ? "text-indigo-600"
//                             : "text-gray-400"
//                         }`}
//                       >
//                         <FiFileText className="w-4 h-4 sm:w-5 sm:h-5" />
//                       </div>
//                       <textarea
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         onFocus={() => setFocusedField("message")}
//                         onBlur={() => setFocusedField(null)}
//                         placeholder="Describe your issue in detail…"
//                         rows={4}
//                         maxLength={MAX_MESSAGE_LEN}
//                         className={`${inputBase} resize-none ${
//                           errors.message ? inputErr : inputOk
//                         }`}
//                       />
//                     </div>
//                     <div className="flex justify-between items-center mt-1">
//                       {errors.message ? (
//                         <p className="text-red-500 text-[9px] sm:text-[10px]">
//                           {errors.message}
//                         </p>
//                       ) : (
//                         <span />
//                       )}
//                       <span className="text-[9px] sm:text-[10px] text-gray-400">
//                         {message.length}/{MAX_MESSAGE_LEN}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Priority */}
//                   <div className="mb-3 sm:mb-4">
//                     <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-1.5">
//                       Priority <span className="text-indigo-500">*</span>
//                     </label>
//                     <div className="grid grid-cols-4 gap-1.5">
//                       {PRIORITIES.map((p) => {
//                         const active = priority === p.value;
//                         return (
//                           <button
//                             type="button"
//                             key={p.value}
//                             onClick={() => setPriority(p.value)}
//                             className={`flex flex-col items-center justify-center gap-1 py-2 rounded-lg border-2 text-[10px] font-semibold transition-all duration-200 cursor-pointer ${
//                               active
//                                 ? `${p.bg} ${p.color} ring-2 ring-indigo-100`
//                                 : "border-gray-200 bg-white text-gray-600 hover:border-indigo-300"
//                             }`}
//                           >
//                             <span
//                               className={`w-1.5 h-1.5 rounded-full ${p.dot}`}
//                             />
//                             {p.label}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   {/* Attachments (multi) */}
//                   <div className="mb-3 sm:mb-4">
//                     <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-1.5">
//                       Attachments{" "}
//                       <span className="text-gray-400 font-normal">
//                         (up to {MAX_FILES}, 800KB each)
//                       </span>
//                     </label>

//                     <label
//                       htmlFor="support-files"
//                       className="flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 border-dashed border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer"
//                     >
//                       <FiUpload className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0" />
//                       <span className="text-[11px] sm:text-xs text-gray-600 truncate">
//                         Click to select files
//                       </span>
//                       {files.length > 0 && (
//                         <span className="ml-auto text-[9px] sm:text-xs font-semibold text-indigo-600 shrink-0">
//                           {files.length}/{MAX_FILES}
//                         </span>
//                       )}
//                     </label>
//                     <input
//                       id="support-files"
//                       type="file"
//                       multiple
//                       className="hidden"
//                       onChange={handleFilesChange}
//                       accept={ALLOWED_FILE_TYPES.join(",")}
//                     />

//                     {/* File previews */}
//                     {files.length > 0 && (
//                       <div className="mt-2 grid grid-cols-1 gap-1.5">
//                         {files.map((f, i) => {
//                           const isImg = f.type.startsWith("image/");
//                           const previewKey = `${f.name}-${f.size}`;
//                           const previewSrc = localPreviews[previewKey];
//                           return (
//                             <div
//                               key={`${f.name}-${i}`}
//                               className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-gray-50 border border-gray-100"
//                             >
//                               {/* Thumbnail / icon */}
//                               {isImg && previewSrc ? (
//                                 <button
//                                   type="button"
//                                   onClick={() => setPreviewUrl(previewSrc)}
//                                   className="w-9 h-9 rounded-md overflow-hidden border border-gray-200 shrink-0 cursor-pointer group relative"
//                                   title="Preview"
//                                 >
//                                   {/* eslint-disable-next-line @next/next/no-img-element */}
//                                   <img
//                                     src={previewSrc}
//                                     alt={f.name}
//                                     className="w-full h-full object-cover"
//                                   />
//                                   <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                                     <FiEye className="w-3.5 h-3.5 text-white" />
//                                   </span>
//                                 </button>
//                               ) : (
//                                 <span className="w-9 h-9 rounded-md bg-indigo-100 flex items-center justify-center shrink-0">
//                                   <FiFileText className="w-4 h-4 text-indigo-600" />
//                                 </span>
//                               )}

//                               <div className="min-w-0 flex-1">
//                                 <p className="text-[11px] sm:text-xs font-medium text-gray-800 truncate">
//                                   {f.name}
//                                 </p>
//                                 <p className="text-[9px] sm:text-[10px] text-gray-500">
//                                   {formatSize(f.size)}
//                                 </p>
//                               </div>

                             

//                               <button
//                                 type="button"
//                                 onClick={() => removeFile(i)}
//                                 className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
//                                 title="Remove"
//                               >
//                                 <FiTrash2 className="w-3.5 h-3.5" />
//                               </button>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>

//                   {/* General error */}
//                   {errors.general && (
//                     <div className="mb-3 p-2.5 bg-red-50 border border-red-100 rounded-lg">
//                       <p className="text-red-600 text-[11px] sm:text-xs">
//                         {errors.general}
//                       </p>
//                     </div>
//                   )}

//                   {/* Submit */}
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full py-2.5 sm:py-3 font-semibold rounded-lg sm:rounded-xl flex items-center justify-center gap-2 text-[11px] sm:text-xs md:text-sm transition-all duration-300 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-700 hover:to-indigo-600 hover:shadow-lg hover:shadow-indigo-500/25 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         <span>Submitting...</span>
//                       </>
//                     ) : (
//                       <>
//                         <FiSend className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         <span>Submit Ticket</span>
//                       </>
//                     )}
//                   </button>

//                   <div className="mt-3 sm:mt-4 text-center">
//                     <p className="text-[8px] sm:text-[9px] text-gray-400">
//                       By submitting, you agree to our{" "}
//                       <Link
//                         href="/terms-conditions"
//                         className="text-indigo-600 hover:underline cursor-pointer"
//                       >
//                         Terms
//                       </Link>{" "}
//                       and{" "}
//                       <Link
//                         href="/privacy-policy"
//                         className="text-indigo-600 hover:underline cursor-pointer"
//                       >
//                         Privacy Policy
//                       </Link>
//                     </p>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Global attachment preview modal */}
//       {previewUrl && (
//         <AttachmentPreviewModal
//           url={previewUrl}
//           onClose={() => setPreviewUrl(null)}
//         />
//       )}
//     </div>
//   );
// };

// // ---------- Sub-components ----------

// function CountBadge({
//   label,
//   value,
//   tone,
// }: {
//   label: string;
//   value: number;
//   tone: "indigo" | "blue" | "amber" | "gray";
// }) {
//   const tones: Record<string, string> = {
//     indigo: "bg-indigo-50 border-indigo-100 text-indigo-700",
//     blue: "bg-blue-50 border-blue-100 text-blue-700",
//     amber: "bg-amber-50 border-amber-100 text-amber-700",
//     gray: "bg-gray-50 border-gray-200 text-gray-600",
//   };
//   return (
//     <div
//       className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] sm:text-xs font-semibold ${tones[tone]}`}
//     >
//       <span>{label}</span>
//       <span className="px-1.5 py-0.5 bg-white/70 rounded-full text-[9px] sm:text-[10px]">
//         {value}
//       </span>
//     </div>
//   );
// }

// function TicketRow({
//   ticket,
//   expanded,
//   onToggle,
//   onPreview,
// }: {
//   ticket: Ticket;
//   expanded: boolean;
//   onToggle: () => void;
//   onPreview: (url: string) => void;
// }) {
//   const statusStyle = getStatusStyle(ticket.status);
//   const prioStyle = getPriorityStyle(ticket.priority);
//   const attachments = ticket.attachments || [];
//   const attachmentCount = attachments.length;
//   const replies = ticket.replies || [];
//   const replyCount = ticket.reply_count ?? replies.length;

//   return (
//     <li className="border border-gray-100 rounded-xl overflow-hidden hover:border-indigo-200 transition-colors">
//       <button
//         type="button"
//         onClick={onToggle}
//         className="w-full text-left p-3 sm:p-4 hover:bg-indigo-50/20 transition-colors cursor-pointer"
//       >
//         <div className="flex items-start justify-between gap-2 mb-1.5">
//           <p className="text-[11px] sm:text-sm font-semibold text-gray-900 line-clamp-2 flex-1">
//             {ticket.subject}
//           </p>
//           <FiChevronDown
//             className={`w-4 h-4 text-gray-400 shrink-0 mt-0.5 transition-transform duration-200 ${
//               expanded ? "rotate-180" : ""
//             }`}
//           />
//         </div>

//         <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-1 mb-2">
//           {ticket.message}
//         </p>

//         <div className="flex flex-wrap items-center gap-1.5">
//           <span
//             className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] sm:text-[10px] font-semibold ${statusStyle.bg} ${statusStyle.text}`}
//           >
//             <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
//             {ticket.status}
//           </span>
//           <span
//             className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] sm:text-[10px] font-semibold ${prioStyle.bg} ${prioStyle.color}`}
//           >
//             <span className={`w-1.5 h-1.5 rounded-full ${prioStyle.dot}`} />
//             {ticket.priority}
//           </span>
//           <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-gray-500">
//             <FiClock className="w-3 h-3" />
//             {formatDate(ticket.created_at)}
//           </span>
//           {attachmentCount > 0 && (
//             <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-indigo-600 font-semibold">
//               <FiPaperclip className="w-3 h-3" />
//               {attachmentCount}
//             </span>
//           )}
//           {replyCount > 0 && (
//             <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-indigo-600 font-semibold">
//               <FiMessageSquare className="w-3 h-3" />
//               {replyCount} repl{replyCount === 1 ? "y" : "ies"}
//             </span>
//           )}
//         </div>
//       </button>

//       <AnimatePresence initial={false}>
//         {expanded && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="overflow-hidden bg-indigo-50/30 border-t border-gray-100"
//           >
//             <div className="p-3 sm:p-4">
//               <div className="flex items-center justify-between mb-2">
//                 <p className="text-[10px] sm:text-xs font-semibold text-gray-700">
//                   Full message
//                 </p>
//                 <p className="text-[9px] sm:text-[10px] text-gray-400">
//                   Ticket #{ticket.ticket_id}
//                 </p>
//               </div>
//               <p className="text-[11px] sm:text-xs text-gray-700 whitespace-pre-wrap break-words">
//                 {ticket.message}
//               </p>

//               {/* Attachments viewer */}
//               {attachmentCount > 0 && (
//                 <div className="mt-3">
//                   <p className="text-[10px] sm:text-xs font-semibold text-gray-700 mb-2">
//                     Attachments ({attachmentCount})
//                   </p>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                     {attachments.map((a) => {
//                       const url = a.file;
//                       const isImg = isImageUrl(url);
//                       const name = fileNameFromUrl(url);
//                       return (
//                         <div
//                           key={a.attachment_id}
//                           className="group relative rounded-lg overflow-hidden border border-gray-200 bg-white"
//                         >
//                           {isImg ? (
//                             <button
//                               type="button"
//                               onClick={() => onPreview(url)}
//                               className="block w-full cursor-pointer"
//                             >
//                               {/* eslint-disable-next-line @next/next/no-img-element */}
//                               <img
//                                 src={url}
//                                 alt={name}
//                                 className="w-full h-20 sm:h-24 object-cover"
//                               />
//                               <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                                 <FiEye className="w-5 h-5 text-white" />
//                               </span>
//                             </button>
//                           ) : (
//                             <div className="w-full h-20 sm:h-24 flex flex-col items-center justify-center bg-gray-50">
//                               <FiFileText className="w-6 h-6 text-indigo-600 mb-1" />
//                               <p className="text-[9px] sm:text-[10px] text-gray-600 font-medium truncate px-2 max-w-full">
//                                 {name}
//                               </p>
//                             </div>
//                           )}

//                           <div className="flex items-center justify-between px-2 py-1.5 border-t border-gray-100 bg-white">
//                             <button
//                               type="button"
//                               onClick={() => onPreview(url)}
//                               className="text-[9px] sm:text-[10px] font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer inline-flex items-center gap-1"
//                             >
//                               <FiEye className="w-3 h-3" />
//                               View
//                             </button>
//                             <a
//                               href={url}
//                               target="_blank"
//                               rel="noreferrer"
//                               download
//                               className="text-[9px] sm:text-[10px] font-semibold text-gray-500 hover:text-indigo-600 cursor-pointer inline-flex items-center gap-1"
//                               title="Download"
//                             >
//                               <FiDownload className="w-3 h-3" />
//                             </a>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Replies thread */}
//               {replyCount > 0 && (
//                 <div className="mt-4">
//                   <div className="flex items-center gap-2 mb-2">
//                     <FiMessageSquare className="w-3.5 h-3.5 text-indigo-600" />
//                     <p className="text-[10px] sm:text-xs font-semibold text-gray-700">
//                       Replies ({replyCount})
//                     </p>
//                   </div>
//                   <div className="space-y-2">
//                     {replies.map((r) => {
//                       const isAdmin = r.sender_type === "admin";
//                       return (
//                         <div
//                           key={r.reply_id}
//                           className={`rounded-lg p-2.5 sm:p-3 border ${
//                             isAdmin
//                               ? "bg-white border-indigo-100"
//                               : "bg-gray-50 border-gray-100"
//                           }`}
//                         >
//                           {/* Reply header */}
//                           <div className="flex items-center justify-between gap-2 mb-1.5">
//                             <div className="flex items-center gap-2 min-w-0">
//                               <div
//                                 className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
//                                   isAdmin ? "bg-indigo-100" : "bg-gray-200"
//                                 }`}
//                               >
//                                 <span
//                                   className={`text-[9px] sm:text-[10px] font-bold ${
//                                     isAdmin ? "text-indigo-600" : "text-gray-600"
//                                   }`}
//                                 >
//                                   {(r.sender_name || "U").charAt(0).toUpperCase()}
//                                 </span>
//                               </div>
//                               <div className="min-w-0">
//                                 <p className="text-[10px] sm:text-xs font-semibold text-gray-800 truncate">
//                                   {r.sender_name}
//                                 </p>
                              
//                               </div>
//                             </div>
//                             <div className="flex flex-col items-end shrink-0">
//                               <span
//                                 className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-semibold ${
//                                   isAdmin
//                                     ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
//                                     : "bg-gray-100 text-gray-600 border border-gray-200"
//                                 }`}
//                               >
//                                 {r.sender_type}
//                               </span>
//                               <span className="text-[8px] sm:text-[9px] text-gray-400 mt-0.5">
//                                 {formatDate(r.created_at)}
//                               </span>
//                             </div>
//                           </div>

//                           {/* Reply message */}
//                           <p className="text-[11px] sm:text-xs text-gray-700 whitespace-pre-wrap break-words">
//                             {r.message}
//                           </p>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <p className="text-[9px] sm:text-[10px] text-gray-400 mt-3">
//                 Last updated: {formatDate(ticket.updated_at)}
//               </p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </li>
//   );
// }

// function EmptyTickets() {
//   return (
//     <div className="text-center py-8 sm:py-10">
//       <div className="w-12 h-12 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-3">
//         <FiInbox className="w-6 h-6 text-indigo-600" />
//       </div>
//       <p className="text-xs sm:text-sm font-semibold text-gray-700">
//         No tickets yet
//       </p>
//       <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
//         Submit your first support ticket using the form.
//       </p>
//     </div>
//   );
// }

// export default SupportPage;

























"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FiMessageSquare,
  FiSend,
  FiUpload,
  FiX,
  FiLogIn,
  FiFileText,
  FiImage,
  FiAlertTriangle,
  FiChevronDown,
  FiClock,
  FiInbox,
  FiPaperclip,
  FiEye,
  FiDownload,
  FiTrash2,
  FiCheckCircle,
  FiRefreshCw,
  FiZap,
  FiHeadphones,
  FiShield,
} from "react-icons/fi";
import { FaTicketAlt } from "react-icons/fa";
import { API_URL } from "@/app/config/api";
import { sanitizeText, getLocalStorage } from "@/app/utils";
import { User } from "@/app/types/user.types";
import apiClient from "@/app/utils/apiClient";

// ---------- Types ----------
interface FormErrors {
  subject?: string;
  message?: string;
  general?: string;
}

interface TicketAttachment {
  attachment_id: number;
  file: string;
  created_at?: string;
}

interface TicketReply {
  reply_id: number;
  id: number;
  sender_type: string;
  sender_name: string;
  sender: {
    name: string;
    email: string;
    type: string;
    sender_type: string;
  };
  message: string;
  created_at: string;
}

interface Ticket {
  ticket_id: number;
  ticket_token: string;
  subject: string;
  message: string;
  ticket_type: string;
  status: string;
  priority: string;
  reply_count: number;
  replies: TicketReply[];
  attachments: TicketAttachment[];
  created_at: string;
  updated_at: string;
}

interface TicketsResponse {
  success: boolean;
  counts: {
    new: number;
    in_progress: number;
    closed: number;
    total: number;
  };
  tickets: Ticket[];
}

type Priority = "low" | "medium" | "high" | "urgent";

// ---------- Constants ----------
const MAX_MESSAGE_LEN = 5000;
const MIN_MESSAGE_LEN = 20;
const MIN_SUBJECT_LEN = 5;
const MAX_SUBJECT_LEN = 150;
const MAX_FILE_SIZE = 800 * 1024;
const MAX_FILES = 5;

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const URL_ONLY_RE = /^(?:https?:\/\/|www\.)\S+$/i;

const PRIORITIES: {
  value: Priority;
  label: string;
  color: string;
  bg: string;
  dot: string;
}[] = [
  { value: "low",    label: "Low",    color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" },
  { value: "medium", label: "Medium", color: "text-amber-700",   bg: "bg-amber-50 border-amber-200",     dot: "bg-amber-500"   },
  { value: "high",   label: "High",   color: "text-orange-700",  bg: "bg-orange-50 border-orange-200",   dot: "bg-orange-500"  },
];

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  New:           { bg: "bg-sky-50 border-sky-200",         text: "text-sky-700",     dot: "bg-sky-500",     label: "New" },
  Open:          { bg: "bg-sky-50 border-sky-200",         text: "text-sky-700",     dot: "bg-sky-500",     label: "Open" },
  "In Progress": { bg: "bg-amber-50 border-amber-200",     text: "text-amber-700",   dot: "bg-amber-500",   label: "In Progress" },
  in_progress:   { bg: "bg-amber-50 border-amber-200",     text: "text-amber-700",   dot: "bg-amber-500",   label: "In Progress" },
  Closed:        { bg: "bg-slate-100 border-slate-200",    text: "text-slate-600",   dot: "bg-slate-400",   label: "Closed" },
  Resolved:      { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-500", label: "Resolved" },
};

const getStatusStyle = (status: string) =>
  STATUS_STYLES[status] || {
    bg: "bg-slate-100 border-slate-200",
    text: "text-slate-600",
    dot: "bg-slate-400",
    label: status,
  };

const getPriorityStyle = (p: string) =>
  PRIORITIES.find((x) => x.value === p.toLowerCase()) || PRIORITIES[1];

const formatDate = (raw: string) => {
  if (!raw) return "";
  const [datePart, timePart] = raw.split(" ");
  if (!datePart) return raw;
  const [y, m, d] = datePart.split("-").map(Number);
  const dt = new Date(y, (m || 1) - 1, d || 1);
  const month = dt.toLocaleString("en-US", { month: "short" });
  const time = timePart ? timePart.slice(0, 5) : "";
  return `${d} ${month} ${y}${time ? `, ${time}` : ""}`;
};

const isImageUrl = (url: string) => {
  const lower = url.split("?")[0].toLowerCase();
  return /\.(jpe?g|png|gif|webp|bmp|svg)$/.test(lower);
};

const fileNameFromUrl = (url: string) => {
  try {
    const clean = url.split("?")[0];
    const parts = clean.split("/");
    const last = parts[parts.length - 1];
    return decodeURIComponent(last || "file");
  } catch {
    return "file";
  }
};

// ---------- Attachment preview modal ----------
function AttachmentPreviewModal({ url, onClose }: { url: string; onClose: () => void }) {
  const isImage = isImageUrl(url);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 24 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden ring-1 ring-black/5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
                {isImage ? <FiImage className="w-5 h-5 text-white" /> : <FiFileText className="w-5 h-5 text-white" />}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{fileNameFromUrl(url)}</p>
                <p className="text-[11px] text-slate-500">{isImage ? "Image" : "Document"}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                aria-label="Download"
              >
                <FiDownload className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl text-slate-500 hover:text-rose-500 hover:bg-rose-50 transition-all cursor-pointer"
                aria-label="Close"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-slate-50 flex items-center justify-center p-4">
            {isImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={url}
                alt="Attachment"
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-lg"
              />
            ) : (
              <div className="text-center py-10">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mb-5 shadow-xl shadow-indigo-500/20">
                  <FiFileText className="w-9 h-9 text-white" />
                </div>
                <p className="text-base font-semibold text-slate-800 mb-1">Preview not available</p>
                <p className="text-sm text-slate-500 mb-5">This file type can&apos;t be previewed in the browser.</p>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                >
                  <FiDownload className="w-4 h-4" />
                  Download file
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ---------- Stat pill ----------
function StatPill({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "indigo" | "sky" | "amber" | "slate";
}) {
  const tones: Record<string, { wrap: string; dot: string }> = {
    indigo: { wrap: "bg-indigo-50/80 border-indigo-100 text-indigo-700", dot: "bg-indigo-500" },
    sky:    { wrap: "bg-sky-50/80 border-sky-100 text-sky-700",          dot: "bg-sky-500"    },
    amber:  { wrap: "bg-amber-50/80 border-amber-100 text-amber-700",    dot: "bg-amber-500"  },
    slate:  { wrap: "bg-slate-50/80 border-slate-200 text-slate-600",    dot: "bg-slate-400"  },
  };
  const t = tones[tone];
  return (
    <div className={`inline-flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-full border ${t.wrap} backdrop-blur-sm`}>
      <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
      <span className="text-[11px] font-medium opacity-80">{label}</span>
      <span className="text-xs font-bold tabular-nums">{value}</span>
    </div>
  );
}

// ---------- Main page ----------
const SupportPage = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [files, setFiles] = useState<File[]>([]);
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [counts, setCounts] = useState<TicketsResponse["counts"] | null>(null);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [expandedTicket, setExpandedTicket] = useState<number | null>(null);
  const [showAllTickets, setShowAllTickets] = useState(false);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [localPreviews, setLocalPreviews] = useState<Record<string, string>>({});
  const localPreviewsRef = useRef(localPreviews);

  useEffect(() => {
    localPreviewsRef.current = localPreviews;
  }, [localPreviews]);

  useEffect(() => {
    const userDetails = getLocalStorage<User>("user_details");
    const isLoggedIn = userDetails && (userDetails.email || userDetails.first_name);
    if (!isLoggedIn) {
      setUser(null);
      setAuthChecked(true);
      setShowLoginModal(true);
      return;
    }
    setUser(userDetails);
    setAuthChecked(true);
  }, []);

  const fetchTickets = async () => {
    setLoadingTickets(true);
    try {
      const res = await apiClient.get(`tickets/`);
      const data = res?.data;
      if (data?.success) {
        setTickets(data.tickets || []);
        setCounts(data.counts || null);
      } else {
        setTickets([]);
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setTickets([]);
    } finally {
      setLoadingTickets(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    return () => {
      Object.values(localPreviewsRef.current).forEach((url) => {
        try { URL.revokeObjectURL(url); } catch { /* noop */ }
      });
    };
  }, []);

  const userName =
    `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || "User";

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;
    const next = [...files];

    for (const f of selected) {
      if (next.length >= MAX_FILES) {
        Swal.fire({
          icon: "warning",
          title: "Too many files",
          text: `You can upload up to ${MAX_FILES} files.`,
          confirmButtonColor: "#4f46e5",
          customClass: { popup: "rounded-2xl" },
        });
        break;
      }
      if (f.size > MAX_FILE_SIZE) {
        Swal.fire({
          icon: "warning",
          title: "File too large",
          text: `"${f.name}" exceeds the 800KB limit.`,
          confirmButtonColor: "#4f46e5",
          customClass: { popup: "rounded-2xl" },
        });
        continue;
      }
      if (!ALLOWED_FILE_TYPES.includes(f.type)) {
        Swal.fire({
          icon: "warning",
          title: "Unsupported file",
          text: `"${f.name}" is not a supported file type.`,
          confirmButtonColor: "#4f46e5",
          customClass: { popup: "rounded-2xl" },
        });
        continue;
      }
      const dup = next.some((x) => x.name === f.name && x.size === f.size);
      if (dup) continue;
      next.push(f);
      if (f.type.startsWith("image/")) {
        const url = URL.createObjectURL(f);
        setLocalPreviews((prev) => ({ ...prev, [`${f.name}-${f.size}`]: url }));
      }
    }
    setFiles(next);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const target = prev[index];
      if (target) {
        const key = `${target.name}-${target.size}`;
        setLocalPreviews((p) => {
          const url = p[key];
          if (url) { try { URL.revokeObjectURL(url); } catch { /* noop */ } }
          const { [key]: _, ...rest } = p;
          return rest;
        });
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const asTrimmed = (v: unknown) => (typeof v === "string" ? v.trim() : "");
    if (asTrimmed(website).length > 0) {
      newErrors.general = "Unable to submit. Please try again.";
      setErrors(newErrors);
      return false;
    }
    const tSubject = asTrimmed(subject);
    if (!tSubject) newErrors.subject = "Subject is required";
    else if (tSubject.length < MIN_SUBJECT_LEN) newErrors.subject = `Subject must be at least ${MIN_SUBJECT_LEN} characters`;
    else if (tSubject.length > MAX_SUBJECT_LEN) newErrors.subject = `Subject must be at most ${MAX_SUBJECT_LEN} characters`;

    const tMessage = asTrimmed(message);
    if (!tMessage) newErrors.message = "Message is required";
    else if (tMessage.length < MIN_MESSAGE_LEN) newErrors.message = `Message must be at least ${MIN_MESSAGE_LEN} characters`;
    else if (tMessage.length > MAX_MESSAGE_LEN) newErrors.message = `Message must be at most ${MAX_MESSAGE_LEN} characters`;
    else if (URL_ONLY_RE.test(tMessage)) newErrors.message = "Please describe your issue, not just a link";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) { setShowLoginModal(true); return; }
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("subject", subject.trim());
      formData.append("message", message.trim());
      formData.append("priority", priority);
      formData.append("ticket_type", "support");
      files.forEach((f) => formData.append("attachments", f, f.name));

      await apiClient.post(`${API_URL}/tickets/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Ticket submitted!",
        html: `<p class="text-slate-600">Your support ticket was created successfully.</p>
               <p class="text-sm text-slate-400 mt-2">We'll respond within 24 hours.</p>`,
        confirmButtonText: "Done",
        confirmButtonColor: "#4f46e5",
        customClass: { popup: "rounded-2xl" },
      });

      Object.values(localPreviews).forEach((url) => {
        try { URL.revokeObjectURL(url); } catch { /* noop */ }
      });
      setLocalPreviews({});
      setSubject("");
      setMessage("");
      setPriority("medium");
      setFiles([]);
      setWebsite("");
      setErrors({});
      fetchTickets();
    } catch (err: unknown) {
      console.error("Error submitting support request:", err);
      const errorMessage =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Please try again later.";
      Swal.fire({
        icon: "error",
        title: "Submission failed",
        text: errorMessage,
        confirmButtonText: "OK",
        confirmButtonColor: "#4f46e5",
        customClass: { popup: "rounded-2xl" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------- Loading ----------
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-indigo-100" />
            <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
          </div>
          <p className="text-sm text-slate-500 font-medium">Verifying your session…</p>
        </div>
      </div>
    );
  }

  // ---------- Not logged in ----------
  if (!user) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 flex flex-col">
        <div className="relative flex-1 flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-500/5 border border-white/60 overflow-hidden">
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-2xl mb-5 shadow-lg shadow-indigo-500/25">
                  <FaTicketAlt className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Support Center</h2>
                <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">
                  Please log in to submit a support ticket and track your requests.
                </p>
                <Link
                  href="/login?redirect=/support"
                  className="mt-6 inline-flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 text-sm"
                >
                  <FiLogIn className="w-4 h-4" />
                  Go to Login
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {showLoginModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-md"
              >
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <button
                    onClick={() => setShowLoginModal(false)}
                    className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                  <div className="bg-gradient-to-br from-amber-400 to-orange-500 px-6 pt-10 pb-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-xl mb-4"
                    >
                      <FiAlertTriangle className="w-9 h-9 text-amber-500" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white">Login Required</h3>
                  </div>
                  <div className="p-6">
                    <div className="bg-amber-50 rounded-2xl p-4 mb-6 border-l-4 border-amber-400">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                          <FiAlertTriangle className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-amber-900 font-semibold text-sm mb-1">Please sign in to continue</p>
                          <p className="text-amber-800/80 text-sm">
                            You need to log in to submit a support ticket. Your contact details will be filled in automatically.
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push("/login?redirect=/support")}
                      className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FiLogIn className="w-4 h-4" />
                      Go to Login
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ---------- Logged-in ----------
  const inputBase =
    "w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none transition-all duration-200";
  const inputOk =
    "hover:border-indigo-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100/60";
  const inputErr = "border-rose-400 bg-rose-50/40 focus:border-rose-500 focus:ring-4 focus:ring-rose-100";

  const visibleTickets = showAllTickets ? tickets : tickets.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Subtle background accents */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-200/40 to-violet-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-sky-200/30 to-cyan-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
                <FiHeadphones className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-xs font-semibold text-indigo-700">Support Center</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                Hey {userName.split(" ")[0]}, how can we help?
              </h1>
              <p className="text-slate-500 mt-2 text-sm lg:text-base max-w-xl">
                Submit a new request or track the status of your existing tickets. Our team typically responds within 24 hours.
              </p>
            </div>

            {counts && (
              <div className="flex flex-wrap items-center gap-2">
                <StatPill label="Total" value={counts.total} tone="indigo" />
                <StatPill label="New" value={counts.new} tone="sky" />
                <StatPill label="In Progress" value={counts.in_progress} tone="amber" />
                <StatPill label="Closed" value={counts.closed} tone="slate" />
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ============ LEFT: Tickets list ============ */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 order-2 lg:order-1"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 border border-white/60 overflow-hidden">
              <div className="p-6 lg:p-7">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                      <FaTicketAlt className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Your Tickets</h2>
                      <p className="text-xs text-slate-500">
                        {tickets.length} ticket{tickets.length !== 1 ? "s" : ""} in total
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={fetchTickets}
                    disabled={loadingTickets}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    <FiRefreshCw className={`w-3.5 h-3.5 ${loadingTickets ? "animate-spin" : ""}`} />
                    {loadingTickets ? "Loading…" : "Refresh"}
                  </button>
                </div>

                {loadingTickets ? (
                  <div className="space-y-3">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="animate-pulse border border-slate-100 rounded-2xl p-5 bg-slate-50/50">
                        <div className="h-3.5 bg-slate-200 rounded-full w-3/4 mb-3" />
                        <div className="h-2.5 bg-slate-200 rounded-full w-1/2 mb-4" />
                        <div className="flex gap-2">
                          <div className="h-6 bg-slate-100 rounded-full w-20" />
                          <div className="h-6 bg-slate-100 rounded-full w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : tickets.length === 0 ? (
                  <EmptyTickets />
                ) : (
                  <>
                    <ul className="space-y-3">
                      {visibleTickets.map((t) => (
                        <TicketRow
                          key={t.ticket_id}
                          ticket={t}
                          expanded={expandedTicket === t.ticket_id}
                          onToggle={() =>
                            setExpandedTicket((cur) =>
                              cur === t.ticket_id ? null : t.ticket_id
                            )
                          }
                          onPreview={(url) => setPreviewUrl(url)}
                        />
                      ))}
                    </ul>

                    {tickets.length > 3 && (
                      <button
                        onClick={() => setShowAllTickets((v) => !v)}
                        className="mt-5 w-full py-3 text-xs font-semibold text-indigo-600 rounded-xl border border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50 hover:border-indigo-200 transition-all cursor-pointer"
                      >
                        {showAllTickets ? "Show less" : `Show all ${tickets.length} tickets`}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* ============ RIGHT: New ticket form ============ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 order-1 lg:order-2"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 border border-white/60 overflow-hidden lg:sticky lg:top-8">
              {/* Form header */}
              <div className="relative px-6 pt-7 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <FiZap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">New Ticket</h2>
                    <p className="text-xs text-slate-500">We&apos;ll reply within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
                  />

                  {/* Subject */}
                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Subject <span className="text-indigo-500">*</span>
                    </label>
                    <div className="relative">
                      <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                        focusedField === "subject" ? "text-indigo-600" : "text-slate-400"
                      }`}>
                        <FiMessageSquare className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(sanitizeText(e.target.value))}
                        onFocus={() => setFocusedField("subject")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Brief summary of your issue"
                        maxLength={MAX_SUBJECT_LEN}
                        className={`${inputBase} ${errors.subject ? inputErr : inputOk}`}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-1.5">
                      {errors.subject ? (
                        <p className="text-rose-500 text-[11px] font-medium">{errors.subject}</p>
                      ) : <span />}
                      <p className="text-[11px] text-slate-400 tabular-nums">
                        {subject.length}/{MAX_SUBJECT_LEN}
                      </p>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Message <span className="text-indigo-500">*</span>
                    </label>
                    <div className="relative">
                      <div className={`absolute left-3.5 top-3.5 transition-colors ${
                        focusedField === "message" ? "text-indigo-600" : "text-slate-400"
                      }`}>
                        <FiFileText className="w-4 h-4" />
                      </div>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Describe your issue in detail…"
                        rows={4}
                        maxLength={MAX_MESSAGE_LEN}
                        className={`${inputBase} resize-none ${errors.message ? inputErr : inputOk}`}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-1.5">
                      {errors.message ? (
                        <p className="text-rose-500 text-[11px] font-medium">{errors.message}</p>
                      ) : <span />}
                      <p className="text-[11px] text-slate-400 tabular-nums">
                        {message.length}/{MAX_MESSAGE_LEN}
                      </p>
                    </div>
                  </div>

                  {/* Priority */}
                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Priority <span className="text-indigo-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {PRIORITIES.map((p) => {
                        const active = priority === p.value;
                        return (
                          <button
                            type="button"
                            key={p.value}
                            onClick={() => setPriority(p.value)}
                            className={`flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${
                              active
                                ? `${p.bg} ${p.color} ring-2 ring-indigo-100 shadow-sm`
                                : "border-slate-200 bg-white text-slate-500 hover:border-indigo-300 hover:bg-indigo-50/30"
                            }`}
                          >
                            <span className={`w-2 h-2 rounded-full ${p.dot}`} />
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Attachments */}
                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Attachments{" "}
                      <span className="text-slate-400 font-normal">(up to {MAX_FILES}, 800KB each)</span>
                    </label>

                    <label
                      htmlFor="support-files"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:border-indigo-400 hover:bg-indigo-50/40 transition-all cursor-pointer group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-all shrink-0">
                        <FiUpload className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-700">Click to select files</p>
                        <p className="text-[10px] text-slate-400">Images, PDFs, docs</p>
                      </div>
                      {files.length > 0 && (
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full shrink-0">
                          {files.length}/{MAX_FILES}
                        </span>
                      )}
                    </label>
                    <input
                      id="support-files"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFilesChange}
                      accept={ALLOWED_FILE_TYPES.join(",")}
                    />

                    {files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {files.map((f, i) => {
                          const isImg = f.type.startsWith("image/");
                          const previewKey = `${f.name}-${f.size}`;
                          const previewSrc = localPreviews[previewKey];
                          return (
                            <motion.div
                              key={`${f.name}-${i}`}
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100"
                            >
                              {isImg && previewSrc ? (
                                <button
                                  type="button"
                                  onClick={() => setPreviewUrl(previewSrc)}
                                  className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 shrink-0 cursor-pointer group relative"
                                  title="Preview"
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={previewSrc} alt={f.name} className="w-full h-full object-cover" />
                                  <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <FiEye className="w-4 h-4 text-white" />
                                  </span>
                                </button>
                              ) : (
                                <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center shrink-0">
                                  <FiFileText className="w-4 h-4 text-indigo-600" />
                                </span>
                              )}

                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-slate-800 truncate">{f.name}</p>
                                <p className="text-[10px] text-slate-400">{formatSize(f.size)}</p>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFile(i)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                                title="Remove"
                              >
                                <FiTrash2 className="w-3.5 h-3.5" />
                              </button>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {errors.general && (
                    <div className="mb-4 p-3 bg-rose-50 border border-rose-100 rounded-xl">
                      <p className="text-rose-600 text-xs font-medium">{errors.general}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 font-semibold rounded-xl flex items-center justify-center gap-2 text-sm transition-all duration-300 bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting…</span>
                      </>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4" />
                        <span>Submit Ticket</span>
                      </>
                    )}
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                    <FiShield className="w-3 h-3" />
                    <span>
                      By submitting, you agree to our{" "}
                      <Link href="/terms-conditions" className="text-indigo-600 hover:underline">Terms</Link>{" "}
                      &amp;{" "}
                      <Link href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {previewUrl && (
        <AttachmentPreviewModal url={previewUrl} onClose={() => setPreviewUrl(null)} />
      )}
    </div>
  );
};

// ---------- Ticket row ----------
function TicketRow({
  ticket,
  expanded,
  onToggle,
  onPreview,
}: {
  ticket: Ticket;
  expanded: boolean;
  onToggle: () => void;
  onPreview: (url: string) => void;
}) {
  const statusStyle = getStatusStyle(ticket.status);
  const prioStyle = getPriorityStyle(ticket.priority);
  const attachments = ticket.attachments || [];
  const attachmentCount = attachments.length;
  const replies = ticket.replies || [];
  const replyCount = ticket.reply_count ?? replies.length;

  return (
    <li
      className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
        expanded
          ? "border-indigo-200 bg-indigo-50/30 shadow-sm"
          : "border-slate-100 bg-white hover:border-indigo-200 hover:shadow-sm"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left p-4 sm:p-5 cursor-pointer"
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <p className="text-sm font-semibold text-slate-900 line-clamp-2 flex-1 leading-snug">
            {ticket.subject}
          </p>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
            expanded ? "bg-indigo-600 text-white rotate-180" : "bg-slate-100 text-slate-500"
          }`}>
            <FiChevronDown className="w-4 h-4" />
          </div>
        </div>

        <p className="text-xs text-slate-500 line-clamp-1 mb-3">{ticket.message}</p>

        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
            {statusStyle.label}
          </span>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold ${prioStyle.bg} ${prioStyle.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${prioStyle.dot}`} />
            {ticket.priority}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-medium">
            <FiClock className="w-3 h-3" />
            {formatDate(ticket.created_at)}
          </span>
          {attachmentCount > 0 && (
            <span className="inline-flex items-center gap-1 text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-2 py-1 rounded-full">
              <FiPaperclip className="w-3 h-3" />
              {attachmentCount}
            </span>
          )}
          {replyCount > 0 && (
            <span className="inline-flex items-center gap-1 text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-2 py-1 rounded-full">
              <FiMessageSquare className="w-3 h-3" />
              {replyCount} {replyCount === 1 ? "reply" : "replies"}
            </span>
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-indigo-100/60">
              <div className="flex items-center justify-between my-3">
                <p className="text-xs font-semibold text-slate-700">Full message</p>
                <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded-md">
                  #{ticket.ticket_id}
                </span>
              </div>
              <div className="rounded-xl bg-white border border-slate-100 p-3.5">
                <p className="text-xs text-slate-700 whitespace-pre-wrap break-words leading-relaxed">
                  {ticket.message}
                </p>
              </div>

              {/* Attachments */}
              {attachmentCount > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-slate-700 mb-2.5">
                    Attachments ({attachmentCount})
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {attachments.map((a) => {
                      const url = a.file;
                      const isImg = isImageUrl(url);
                      const name = fileNameFromUrl(url);
                      return (
                        <div
                          key={a.attachment_id}
                          className="group relative rounded-xl overflow-hidden border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all"
                        >
                          {isImg ? (
                            <button
                              type="button"
                              onClick={() => onPreview(url)}
                              className="block w-full cursor-pointer"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={url} alt={name} className="w-full h-24 object-cover" />
                              <span className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <FiEye className="w-5 h-5 text-white" />
                              </span>
                            </button>
                          ) : (
                            <div className="w-full h-24 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50/50">
                              <FiFileText className="w-7 h-7 text-indigo-600 mb-1.5" />
                              <p className="text-[10px] text-slate-600 font-medium truncate px-2 max-w-full">
                                {name}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center justify-between px-2.5 py-2 border-t border-slate-100 bg-white">
                            <button
                              type="button"
                              onClick={() => onPreview(url)}
                              className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer inline-flex items-center gap-1"
                            >
                              <FiEye className="w-3 h-3" />
                              View
                            </button>
                            <a
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              download
                              className="text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors"
                              title="Download"
                            >
                              <FiDownload className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Replies */}
              {replyCount > 0 && (
                <div className="mt-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <FiMessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <p className="text-xs font-semibold text-slate-700">
                      Replies ({replyCount})
                    </p>
                  </div>
                  <div className="space-y-2.5">
                    {replies.map((r) => {
                      const isAdmin = r.sender_type === "admin";
                      return (
                        <div
                          key={r.reply_id}
                          className={`rounded-xl p-3.5 border ${
                            isAdmin
                              ? "bg-gradient-to-br from-indigo-50/70 to-violet-50/40 border-indigo-100"
                              : "bg-slate-50 border-slate-100"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                                isAdmin
                                  ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white"
                                  : "bg-slate-200 text-slate-600"
                              }`}>
                                <span className="text-[11px] font-bold">
                                  {(r.sender_name || "U").charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-semibold text-slate-800 truncate">
                                  {r.sender_name}
                                </p>
                                <p className="text-[10px] text-slate-400 truncate">
                                  {r.sender?.email}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end shrink-0 gap-1">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide ${
                                isAdmin
                                  ? "bg-indigo-600 text-white"
                                  : "bg-slate-200 text-slate-600"
                              }`}>
                                {r.sender_type}
                              </span>
                              <span className="text-[9px] text-slate-400">
                                {formatDate(r.created_at)}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-slate-700 whitespace-pre-wrap break-words leading-relaxed">
                            {r.message}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-indigo-100/60 flex items-center gap-1.5 text-[10px] text-slate-400">
                <FiClock className="w-3 h-3" />
                Last updated: {formatDate(ticket.updated_at)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function EmptyTickets() {
  return (
    <div className="text-center py-14">
      <div className="relative w-20 h-20 mx-auto mb-5">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 blur-xl opacity-60" />
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 flex items-center justify-center">
          <FiInbox className="w-9 h-9 text-indigo-500" />
        </div>
      </div>
      <p className="text-sm font-semibold text-slate-800">No tickets yet</p>
      <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
        Submit your first support ticket using the form and we&apos;ll get back to you shortly.
      </p>
      <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium bg-emerald-50 px-3 py-1.5 rounded-full">
        <FiCheckCircle className="w-3.5 h-3.5" />
        Average response: under 24 hours
      </div>
    </div>
  );
}

export default SupportPage;