// "use client";

// import React, { useState, useEffect, useContext } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiFileText,
//   FiPlus,
//   FiMail,
//   FiPhone,
//   FiMapPin,
//   FiCheckCircle,
//   FiCreditCard,
//   FiTrash2,
//   FiLogOut,
//   FiAward,
//   FiCalendar,
//   FiX,
//   FiAlertCircle,
//   FiTrendingUp,
//   FiGrid,
//   FiList,
//   FiUser,
//   FiLayout,
//   FiBarChart2,
//   FiBriefcase,
//   FiEdit2,
//   FiDollarSign,
//   FiShoppingBag,
//   FiStar,
// } from "react-icons/fi";
// import {
//   HiOutlineTemplate,
//   HiOutlineBadgeCheck,
//   HiOutlineReceiptRefund,
// } from "react-icons/hi";
// import {
//   IoSparkles,
//   IoEllipsisVertical,
//   IoCheckmarkCircle,
// } from "react-icons/io5";
// import { useRouter } from "next/navigation";
// import {
//   getLocalStorage,
//   removeLocalStorage,
//   setLocalStorage,
//   setSessionStorage,
// } from "@/app/utils";
// import { User } from "@/app/types/user.types";
// import {
//   MdOutlinePublishedWithChanges,
//   MdOutlineReceipt,
// } from "react-icons/md";
// import ProtectedRoute from "@/app/utils/ProtectedRoute";
// import axios from "axios";
// import { API_URL } from "@/app/config/api";
// import { templateData } from "@/app/data";
// import { CreateContext } from "@/app/context/CreateContext";
// import Swal from "sweetalert2";
// import toast, { Toaster } from "react-hot-toast";

// interface BillingRecord {
//   length: number;
//   createdAt: string;
//   amount: number;
//   status: "paid" | "pending" | "failed";
//   plan: string;
//   planId: {
//     name: string;
//   };
// }

// interface usersCurrentPlan {
//   amount: number;
//   plan: string;
//   description: string;
//   access_date: string;
//   expiry_date: string;
// }

// interface ResumeItem {
//   component: React.ComponentType<any>;
//   templateId: string | number;
//   [key: string]: any;
// }

// const DashboardPage = () => {
//   const router = useRouter();
//   const [usersCurrentPlan, setusersCurrentPlan] =
//     useState<usersCurrentPlan | null>(null);
//   const [showBillingHistory, setShowBillingHistory] = useState(false);
//   const [paymentRecords, setPaymentRecords] = useState<BillingRecord[] | null>(
//     null,
//   );
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [filteredOldResumeData, setFilteredOldResumeData] = useState<
//     ResumeItem[]
//   >([]);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);
//   const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
//   const [hoveredCard, setHoveredCard] = useState<string | null>(null);
//   const [hoveredStat, setHoveredStat] = useState<number | null>(null);
//   const [hoveredRow, setHoveredRow] = useState<number | null>(null);

//   const { setIsUploadMode } = useContext(CreateContext);

//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;
//   const userName = `${userDetails?.firstName} ${userDetails?.lastName}`;
//   const userEmail = userDetails?.email;
//   const userPhone = userDetails?.phone;
//   const userLocation =
//     userDetails?.city && `${userDetails.city}, ${userDetails.country}`;

//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       setIsMobile(width < 640);
//       setIsTablet(width >= 640 && width < 1024);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/users/dashboard`, {
//           params: { userId: userId },
//         });
//         setusersCurrentPlan(response?.data?.payments?.[0]);
//         fetchOldResumeData();
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     const fetchOldResumeData = async () => {
//       try {
//         const response = await axios.get(
//           `${API_URL}/api/contact-resume/all-contact/${userId}`,
//         );
//         const filter = response.data.flatMap(
//           (data1: { templateId: string | number }) => {
//             const templateMatch = templateData.find(
//               (t) => t.id == data1.templateId,
//             );
//             return templateMatch
//               ? [{ ...data1, component: templateMatch.component }]
//               : [];
//           },
//         );
//         setFilteredOldResumeData(filter);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleDeleteResume = async (id: string, name: string) => {
//     const result = await Swal.fire({
//       title: '<span class="text-lg sm:text-xl font-bold">Delete Resume?</span>',
//       html: `
//         <div class="text-center">
//           <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
//             <svg class="w-6 h-6 sm:w-8 sm:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//             </svg>
//           </div>
//           <p class="text-gray-600 text-sm sm:text-base mb-2">Are you sure you want to delete</p>
//           <p class="font-semibold text-gray-900 text-sm sm:text-base">"${name || "this resume"}"?</p>
//           <p class="text-xs sm:text-sm text-gray-500 mt-3">This action cannot be undone.</p>
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText:
//         '<span class="flex items-center gap-2 text-xs sm:text-sm"><svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Yes, delete it!</span>',
//       cancelButtonText: '<span class="text-xs sm:text-sm">Cancel</span>',
//       reverseButtons: true,
//       customClass: {
//         popup: "rounded-xl sm:rounded-2xl",
//         confirmButton:
//           "rounded-lg px-4 py-2 sm:px-5 sm:py-2.5 transition-all duration-200",
//         cancelButton:
//           "rounded-lg px-4 py-2 sm:px-5 sm:py-2.5 transition-all duration-200",
//       },
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`${API_URL}/api/contact-resume/delete-resume/${id}`);

//         toast.custom(
//           (t) => (
//             <motion.div
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 100 }}
//               className="max-w-md w-full bg-white shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 mx-4 sm:mx-0"
//             >
//               <div className="flex-1 w-0 p-3 sm:p-4">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 pt-0.5">
//                     <div className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-100 rounded-full flex items-center justify-center">
//                       <IoCheckmarkCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
//                     </div>
//                   </div>
//                   <div className="ml-3 flex-1">
//                     <p className="text-xs sm:text-sm font-medium text-gray-900">
//                       Resume Deleted!
//                     </p>
//                     <p className="text-xs sm:text-sm text-gray-500">
//                       Your resume has been successfully removed.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex border-l border-gray-200">
//                 <button
//                   onClick={() => toast.dismiss(t.id)}
//                   className="w-full border border-transparent rounded-none rounded-r-lg p-3 sm:p-4 flex items-center justify-center text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-all duration-200"
//                 >
//                   Close
//                 </button>
//               </div>
//             </motion.div>
//           ),
//           { duration: 4000 },
//         );

//         const response = await axios.get(
//           `${API_URL}/api/contact-resume/all-contact/${userId}`,
//         );
//         const filter = response.data.flatMap(
//           (data1: { templateId: string | number }) => {
//             const templateMatch = templateData.find(
//               (t) => t.id == data1.templateId,
//             );
//             return templateMatch
//               ? [{ ...data1, component: templateMatch.component }]
//               : [];
//           },
//         );
//         setFilteredOldResumeData(filter);
//       } catch (err) {
//         toast.error("Failed to delete resume. Please try again.");
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchPaymentRecords = async () => {
//       try {
//         const response = await axios.get(
//           `${API_URL}/api/payment-razor/payment-all-records`,
//           {
//             params: { userId: userId },
//           },
//         );
//         setPaymentRecords(response?.data?.paymentRecord);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchPaymentRecords();
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = showBillingHistory ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [showBillingHistory]);

//   const handleLogout = () => {
//     removeLocalStorage("user_details");
//     removeLocalStorage("fullResumeData");
//     removeLocalStorage("chosenTemplate");
//     removeLocalStorage("accessToken");
//     router.push("/login");
//   };

//   const totalResumes = filteredOldResumeData.length;

//   // Calculate billing statistics
//   const totalTransactions = paymentRecords?.length || 0;
//   const totalAmountSpent =
//     paymentRecords?.reduce(
//       (sum, record) => (record.status === "paid" ? sum + record.amount : sum),
//       0,
//     ) || 0;

//   // Responsive grid columns based on screen size
//   const getResumeGridCols = () => {
//     if (isMobile) return "grid-cols-1";
//     if (isTablet) return "grid-cols-2";
//     return "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
//   };

//   return (
//     <ProtectedRoute>
//       <Toaster position="top-right" />

//       <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-indigo-50/20">
//         <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-5 lg:px-6 py-4 sm:py-6 lg:py-8">
//           {/* Header Section */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mb-6 sm:mb-8"
//           >
//             <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-500/10 rounded-full text-indigo-600 text-[10px] sm:text-xs font-semibold mb-3 sm:mb-4 border border-indigo-200/30">
//               <motion.div
//                 animate={{ rotate: [0, 10, -10, 0] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               >
//                 <IoSparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//               </motion.div>
//               <span>DASHBOARD</span>
//             </div>
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
//               <div>
//                 <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
//                   Welcome back,{" "}
//                   <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
//                     {userName?.split(" ")[0]}
//                   </span>
//                 </h1>
//                 <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">
//                   Manage your resumes, track performance, and land your dream
//                   job
//                 </p>
//               </div>
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => router.push("/choose-template")}
//                 className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 group cursor-pointer"
//               >
//                 <motion.div
//                   animate={{ rotate: [0, 90, 0] }}
//                   transition={{ duration: 0.5 }}
//                   className="group-hover:rotate-90 transition-transform"
//                 >
//                   <FiPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                 </motion.div>
//                 Create New Resume
//               </motion.button>
//             </div>
//           </motion.div>

//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//             {[
//               { label: " Resumes Created", value: totalResumes, icon: FiFileText, color: "purple", delay: 0 },
//               { label: "Available Templates", value: templateData.length, icon: FiLayout, color: "green", delay: 0.1 },
//               { label: "Current Plan", value: usersCurrentPlan?.plan || "Free", icon: FiStar, color: "amber", delay: 0.2 },
//             ].map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: stat.delay, duration: 0.4 }}
//                 className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 "
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs text-gray-500">{stat.label}</p>
//                     <p
//                       className={`md:text-lg lg:text-2xl font-bold text-${stat.color}-600`}
//                     >
//                       {stat.value}
//                     </p>
//                   </div>
//                   <motion.div
//                     className={`w-10 h-10 bg-${stat.color}-50 rounded-xl flex items-center justify-center group-hover:bg-${stat.color}-100 transition-all`}
//                   >
//                     <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
//                   </motion.div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Profile and Plan Section */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
//             {/* Profile Card */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//               className="lg:col-span-1 order-2 lg:order-1"
//             >
//               <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-indigo-100 overflow-hidden hover:shadow-md transition-all duration-300 group">
//                 <div className="relative h-20 sm:h-24 bg-gradient-to-br from-indigo-700 to-purple-500">
//                   <motion.div
//                     className="absolute -bottom-8 sm:-bottom-10 left-4 sm:left-6"
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ duration: 0.2 }}
//                   ></motion.div>
//                 </div>
//                 <div className="p-4 sm:p-5 md:p-6 pt-10 sm:pt-12">
//                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 truncate">
//                     {userName}
//                   </h3>
//                   <div className="space-y-2 sm:space-y-3">
//                     {[
//                       {
//                         icon: FiMail,
//                         label: "Email",
//                         value: userEmail,
//                         color: "blue",
//                       },
//                       {
//                         icon: FiPhone,
//                         label: "Phone",
//                         value: userPhone || "Not provided",
//                         color: "emerald",
//                       },
//                       {
//                         icon: FiMapPin,
//                         label: "Location",
//                         value: userLocation || "Not specified",
//                         color: "purple",
//                       },
//                     ].map((item, idx) => (
//                       <motion.div
//                         key={idx}
//                         whileHover={{ x: 3 }}
//                         transition={{ duration: 0.2 }}
//                         className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer"
//                       >
//                         <div
//                           className={`p-1.5 sm:p-2 bg-${item.color}-50 rounded-lg`}
//                         >
//                           <item.icon
//                             className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-${item.color}-600`}
//                           />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-[10px] sm:text-xs text-gray-500">
//                             {item.label}
//                           </p>
//                           <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
//                             {item.value}
//                           </p>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => setShowLogoutModal(true)}
//                     className="w-full mt-4 sm:mt-6 px-3 sm:px-4 py-2.5 sm:py-3 bg-indigo-50 text-indigo-600 font-medium rounded-lg sm:rounded-xl hover:bg-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer text-xs sm:text-sm"
//                   >
//                     <motion.div
//                       animate={{ rotate: 0 }}
//                       whileHover={{ rotate: 180 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <FiLogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                     </motion.div>
//                     Logout
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Plan Card */}
//             {usersCurrentPlan ? (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="lg:col-span-2 order-1 lg:order-2"
//               >
//                 <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-indigo-100 overflow-hidden hover:shadow-md transition-all duration-300">
//                   <div className="bg-gradient-to-r from-indigo-600 to-purple-500 p-4 sm:p-6">
//                     <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
//                       <div>
//                         <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
//                           <motion.span
//                             className="px-1.5 sm:px-2 py-0.5 bg-white/20 text-white text-[10px] sm:text-xs font-semibold rounded-full"
//                             animate={{ scale: [1, 1.05, 1] }}
//                             transition={{ duration: 2, repeat: Infinity }}
//                           >
//                             ACTIVE
//                           </motion.span>
//                           <HiOutlineBadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-200" />
//                         </div>
//                         <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1">
//                           {usersCurrentPlan?.plan} Plan
//                         </h3>
//                         <p className="text-indigo-100 text-xs sm:text-sm">
//                           Your current subscription
//                         </p>
//                       </div>
//                       <div className="text-left sm:text-right">
//                         <p className="text-2xl sm:text-3xl font-bold text-white">
//                           ₹{usersCurrentPlan?.amount || "0"}
//                         </p>
//                         <p className="text-indigo-100 text-[10px] sm:text-xs mt-0.5 sm:mt-1">
//                           per{" "}
//                           {usersCurrentPlan?.plan === "Premium"
//                             ? "Lifetime"
//                             : usersCurrentPlan?.plan === "Pro Plus"
//                               ? "3 months"
//                               : "month"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-4 sm:p-6">
//                     <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
//                       <FiAward className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />{" "}
//                       Plan Features
//                     </h4>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
//                       {usersCurrentPlan?.description &&
//                         (() => {
//                           const parser = new DOMParser();
//                           const doc = parser.parseFromString(
//                             usersCurrentPlan.description,
//                             "text/html",
//                           );
//                           const features = Array.from(
//                             doc.querySelectorAll("li"),
//                           ).map((li) => li.textContent?.trim() || "");
//                           return features.map((feature, idx) => (
//                             <motion.div
//                               key={idx}
//                               initial={{ opacity: 0, x: -10 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               transition={{ delay: idx * 0.05 }}
//                               className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-700"
//                             >
//                               <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 mt-0.5 shrink-0" />
//                               <span className="line-clamp-2">{feature}</span>
//                             </motion.div>
//                           ));
//                         })()}
//                     </div>

//                     {/* Subscription Dates Section - Add this new section */}
//                     {/* Subscription Dates Section - Updated for Lifetime plans */}
//                     {(usersCurrentPlan?.access_date ||
//                       usersCurrentPlan?.expiry_date ||
//                       usersCurrentPlan?.plan === "Premium") && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.2 }}
//                         className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-indigo-50/30 rounded-lg sm:rounded-xl border border-gray-100"
//                       >
//                         <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
//                           <FiCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
//                           Subscription Info
//                         </h4>
//                         <div className="space-y-2 sm:space-y-2.5">
//                           {/* Purchase Date - Always show if available */}
//                           {usersCurrentPlan?.access_date && (
//                             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs sm:text-sm">
//                               <span className="text-gray-600 flex items-center gap-1.5">
//                                 <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
//                                 Purchase Date:
//                               </span>
//                               <span className="font-medium text-gray-800">
//                                 {new Date(
//                                   usersCurrentPlan.access_date,
//                                 ).toLocaleDateString("en-IN", {
//                                   day: "numeric",
//                                   month: "long",
//                                   year: "numeric",
//                                 })}
//                               </span>
//                             </div>
//                           )}

//                           {/* Expiry/Validity Info - Conditional based on plan type */}
//                           {usersCurrentPlan?.plan === "Premium" ? (
//                             // Lifetime plan - Show lifetime badge instead of expiry
//                             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs sm:text-sm">
//                               <span className="text-gray-600 flex items-center gap-1.5">
//                                 <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
//                                 Validity:
//                               </span>
//                               <span className="font-medium bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-1.5">
//                                 <FiAward className="w-3.5 h-3.5 text-purple-500" />
//                                 Lifetime Access
//                               </span>
//                             </div>
//                           ) : (
//                             // Non-premium plans - Show expiry date
//                             usersCurrentPlan?.expiry_date && (
//                               <>
//                                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs sm:text-sm">
//                                   <span className="text-gray-600 flex items-center gap-1.5">
//                                     <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
//                                     Expiry Date:
//                                   </span>
//                                   <span
//                                     className={`font-medium ${new Date(usersCurrentPlan.expiry_date) < new Date() ? "text-red-600" : "text-gray-800"}`}
//                                   >
//                                     {new Date(
//                                       usersCurrentPlan.expiry_date,
//                                     ).toLocaleDateString("en-IN", {
//                                       day: "numeric",
//                                       month: "long",
//                                       year: "numeric",
//                                     })}
//                                     {new Date(usersCurrentPlan.expiry_date) <
//                                       new Date() && (
//                                       <span className="ml-2 text-red-500 text-[10px] sm:text-xs font-semibold">
//                                         (Expiring Today)
//                                       </span>
//                                     )}
//                                   </span>
//                                 </div>

//                                 {/* Days remaining - Only for non-expired non-premium plans */}
//                                 {new Date(usersCurrentPlan.expiry_date) >
//                                   new Date() && (
//                                   <div className="mt-2 pt-2 border-t border-gray-100">
//                                     <div className="flex items-center justify-between text-xs">
//                                       <span className="text-gray-600">
//                                         Days remaining:
//                                       </span>
//                                       <span className="font-semibold text-indigo-600">
//                                         {Math.ceil(
//                                           (new Date(
//                                             usersCurrentPlan.expiry_date,
//                                           ).getTime() -
//                                             new Date().getTime()) /
//                                             (1000 * 60 * 60 * 24),
//                                         )}{" "}
//                                         days
//                                       </span>
//                                     </div>
//                                   </div>
//                                 )}
//                               </>
//                             )
//                           )}

//                           {/* For Premium plans, show additional message */}
//                           {usersCurrentPlan?.plan === "Premium" && (
//                             <div className="mt-2 pt-2 border-t border-gray-100">
//                               <div className="flex items-center gap-2 text-xs text-gray-600">
//                                 <HiOutlineBadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
//                                 <span>Enjoy all premium features forever!</span>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </motion.div>
//                     )}

//                     <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => router.push("/choose-plan")}
//                         className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-600 text-white font-medium rounded-lg sm:rounded-xl hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer text-xs sm:text-sm"
//                       >
//                         <motion.div
//                           whileHover={{ rotate: 90 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <MdOutlinePublishedWithChanges className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         </motion.div>
//                         Upgrade Plan
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => setShowBillingHistory(true)}
//                         className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-50 text-indigo-600 font-medium rounded-lg sm:rounded-xl hover:bg-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
//                       >
//                         <FiCreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{" "}
//                         Billing History
//                       </motion.button>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="lg:col-span-2 order-1 lg:order-2"
//               >
//                 <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-indigo-100 overflow-hidden hover:shadow-md transition-all duration-300">
//                   <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-6 sm:p-8 text-center">
//                     <motion.div
//                       className="inline-flex p-3 sm:p-4 bg-white/20 rounded-full mb-3 sm:mb-4"
//                       animate={{ scale: [1, 1.1, 1] }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                     >
//                       <FiAlertCircle className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
//                     </motion.div>
//                     <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
//                       No Active Plan
//                     </h3>
//                     <p className="text-indigo-100 text-xs sm:text-sm">
//                       Choose a plan to unlock premium features and templates
//                     </p>
//                   </div>
//                   <div className="p-4 sm:p-6 text-center flex item-center justify-center gap-3 sm:gap-4">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => router.push("/choose-plan")}
//                       className=" px-5 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white font-medium rounded-lg sm:rounded-xl hover:bg-indigo-700 transition-all duration-300 cursor-pointer text-xs sm:text-sm"
//                     >
//                       Choose a Plan
//                     </motion.button>
//                     {paymentRecords && paymentRecords?.length > 0 && (
//                      <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => setShowBillingHistory(true)}
//                         className=" px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-50 text-indigo-600 font-medium rounded-lg sm:rounded-xl hover:bg-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
//                       >
//                         <FiCreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{" "}
//                         Billing History
//                       </motion.button>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </div>

//           {/* Resumes Section */}
//           <div>
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
//               <div>
//                 <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-1.5 sm:gap-2">
//                   <FiFileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />{" "}
//                   Your Resumes
//                 </h3>
//                 <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
//                   <p className="text-gray-500 text-[11px] sm:text-sm">
//                     Create, edit, and manage all your resumes
//                   </p>
//                   <motion.div
//                     className="px-1.5 sm:px-2 py-0.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-600 text-[10px] sm:text-xs font-semibold"
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     {totalResumes} {totalResumes === 1 ? "Resume" : "Resumes"}
//                   </motion.div>
//                 </div>
//               </div>
//             </div>

//             {/* Resume Count Badge - Mobile */}
//             {isMobile && (
//               <motion.div
//                 className="mb-3 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full inline-flex items-center gap-1.5 sm:gap-2"
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <FiFileText className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-600" />
//                 <span className="text-[10px] sm:text-xs font-semibold text-purple-600">
//                   {totalResumes} {totalResumes === 1 ? "Resume" : "Resumes"}
//                 </span>
//               </motion.div>
//             )}

//             {/* Responsive Grid View */}
//             <div
//               className={`grid ${getResumeGridCols()} gap-3 sm:gap-4 md:gap-5 lg:gap-6`}
//             >
//               {filteredOldResumeData.length > 0 ? (
//                 filteredOldResumeData.map((item, index) => {
//                   const ComponentToRender = item.component;

//                   return (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: Math.min(index * 0.05, 0.5) }}
//                       whileHover={{ y: -4 }}
//                       onMouseEnter={() => setHoveredCard(item.contact?._id)}
//                       onMouseLeave={() => setHoveredCard(null)}
//                       className="relative group cursor-pointer"
//                       style={{
//                         height: isMobile
//                           ? "clamp(240px, 45vw, 280px)"
//                           : "clamp(280px, 30vw, 340px)",
//                         overflow: "hidden",
//                         borderRadius: "16px",
//                         backgroundColor: "white",
//                         boxShadow: "0 4px 12px -4px rgba(0, 0, 0, 0.05)",
//                         transition: "all 0.3s ease",
//                       }}
//                     >
//                       <div className="w-full h-full">
//                         <ComponentToRender alldata={item} />
//                       </div>

//                       {/* Overlay with actions */}
//                       <motion.div
//                         className={`absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent ${!isMobile ? "opacity-0 group-hover:opacity-100" : ""} transition-all duration-300`}
//                         initial={{ opacity: 0 }}
//                         whileHover={{ opacity: isMobile ? 0 : 1 }}
//                       >
//                         <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//                           <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
//                             <motion.button
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => {
//                                 router.push(`/resume-details/contact`);
//                                 setLocalStorage("chosenTemplate", item);
//                                 setSessionStorage(
//                                   "oldRouteNameDashboard",
//                                   true,
//                                 );
//                                 setIsUploadMode(false);
//                               }}
//                               className="bg-white rounded-full p-1.5 sm:p-2.5 hover:bg-purple-50 transition-all duration-300 shadow-lg cursor-pointer group/btn"
//                             >
//                               <FiEdit2 className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 group-hover/btn:scale-110 transition-transform" />
//                             </motion.button>
//                             <motion.button
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() =>
//                                 handleDeleteResume(item.contact?._id, item.name)
//                               }
//                               className="bg-white rounded-full p-1.5 sm:p-2.5 hover:bg-rose-50 transition-all duration-300 shadow-lg cursor-pointer group/btn"
//                             >
//                               <FiTrash2 className="h-3 w-3 sm:h-4 sm:w-4 text-rose-600 group-hover/btn:scale-110 transition-transform" />
//                             </motion.button>
//                           </div>
//                           <p className="text-white text-[11px] sm:text-sm font-medium text-center truncate px-1 sm:px-2">
//                             {item.name || `Resume ${index + 1}`}
//                           </p>
//                           <p className="text-white/60 text-[10px] sm:text-xs text-center mt-0.5 sm:mt-1">
//                             Template: {item.templateId}
//                           </p>
//                         </div>
//                       </motion.div>

//                       {/* Mobile menu button */}
//                       {isMobile && (
//                         <>
//                           <button
//                             onClick={() =>
//                               setActiveMenuId(
//                                 activeMenuId === item.contact?._id
//                                   ? null
//                                   : item.contact?._id,
//                               )
//                             }
//                             className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow-md z-10 hover:bg-gray-50 transition"
//                           >
//                             <IoEllipsisVertical className="w-4 h-4 text-gray-700" />
//                           </button>
//                           {activeMenuId === item.contact?._id && (
//                             <>
//                               <div
//                                 className="fixed inset-0 z-10"
//                                 onClick={() => setActiveMenuId(null)}
//                               />
//                               <motion.div
//                                 initial={{ opacity: 0, scale: 0.9 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 className="absolute right-2 top-12 z-20 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5"
//                               >
//                                 <button
//                                   onClick={() => {
//                                     router.push(`/resume-details/contact`);
//                                     setLocalStorage("chosenTemplate", item);
//                                     setSessionStorage(
//                                       "oldRouteNameDashboard",
//                                       true,
//                                     );
//                                     setIsUploadMode(false);
//                                     setActiveMenuId(null);
//                                   }}
//                                   className="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors flex items-center gap-2"
//                                 >
//                                   <FiEdit2 className="w-3.5 h-3.5" /> Edit
//                                 </button>
//                                 <button
//                                   onClick={() => {
//                                     handleDeleteResume(
//                                       item.contact?._id,
//                                       item.name,
//                                     );
//                                     setActiveMenuId(null);
//                                   }}
//                                   className="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors flex items-center gap-2"
//                                 >
//                                   <FiTrash2 className="w-3.5 h-3.5" /> Delete
//                                 </button>
//                               </motion.div>
//                             </>
//                           )}
//                         </>
//                       )}
//                     </motion.div>
//                   );
//                 })
//               ) : (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="col-span-full flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20"
//                 >
//                   <div className="text-center">
//                     <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
//                       <FiFileText className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-purple-600" />
//                     </div>
//                     <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
//                       No Resumes Found
//                     </h3>
//                     <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
//                       Create your first resume to get started
//                     </p>
//                     <button
//                       onClick={() => router.push("/choose-template")}
//                       className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all text-xs sm:text-sm cursor-pointer"
//                     >
//                       Create Resume
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Billing History Modal - Responsive */}
//       <AnimatePresence>
//         {showBillingHistory && paymentRecords && (
//           <div
//             className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4"
//             onClick={() => setShowBillingHistory(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Fixed Header */}
//               <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-4 sm:p-6 flex-shrink-0">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg sm:rounded-xl">
//                       <MdOutlineReceipt className="w-4 h-4 sm:w-5 sm:h-6 text-white" />
//                     </div>
//                     <div>
//                       <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white">
//                         Billing History
//                       </h2>
//                       <p className="text-indigo-100 text-[11px] sm:text-sm">
//                         View your past transactions and invoices
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowBillingHistory(false)}
//                     className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition cursor-pointer"
//                   >
//                     <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                   </button>
//                 </div>
//               </div>

//               {/* Scrollable Content Area */}
//               <div className="flex-1 overflow-y-auto">
//                 {/* Summary Cards - Responsive */}
//                 <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50/30">
//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.1 }}
//                       whileHover={{ y: -2 }}
//                       className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-[10px] sm:text-xs text-gray-500">
//                             Total Transactions
//                           </p>
//                           <p className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900">
//                             {totalTransactions}
//                           </p>
//                         </div>
//                         <div className="w-7 h-7 sm:w-8 sm:h-10 bg-indigo-50 rounded-lg sm:rounded-xl flex items-center justify-center">
//                           <FiShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-5 text-indigo-600" />
//                         </div>
//                       </div>
//                     </motion.div>
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.2 }}
//                       whileHover={{ y: -2 }}
//                       className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-[10px] sm:text-xs text-gray-500">
//                             Total Spent
//                           </p>
//                           <p className="text-base sm:text-xl lg:text-2xl font-bold text-emerald-600">
//                             ₹{totalAmountSpent.toFixed(2)}
//                           </p>
//                         </div>
//                         <div className="w-7 h-7 sm:w-8 sm:h-10 bg-emerald-50 rounded-lg sm:rounded-xl flex items-center justify-center">
//                           <FiDollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-5 text-emerald-600" />
//                         </div>
//                       </div>
//                     </motion.div>
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.3 }}
//                       whileHover={{ y: -2 }}
//                       className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-[10px] sm:text-xs text-gray-500">
//                             Current Plan
//                           </p>
//                           <p className="text-sm sm:text-base lg:text-xl font-bold text-indigo-600 truncate">
//                             {usersCurrentPlan?.plan || "Free"}
//                           </p>
//                         </div>
//                         <div className="w-7 h-7 sm:w-8 sm:h-10 bg-purple-50 rounded-lg sm:rounded-xl flex items-center justify-center">
//                           <HiOutlineBadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-5 text-purple-600" />
//                         </div>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </div>

//                 {/* Billing Records Table - Fully Scrollable */}
//                 <div className="p-4 sm:p-6">
//                   {paymentRecords.length > 0 ? (
//                     <div className="overflow-x-auto">
//                       <table className="w-full min-w-[500px]">
//                         <thead className="bg-gray-50 sticky top-0">
//                           <tr className="border-b-2 border-gray-200">
//                             <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                               Date
//                             </th>
//                             <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                               Plan
//                             </th>
//                             <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                               Amount
//                             </th>
//                             <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                               Status
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {paymentRecords.map((record, idx) => (
//                             <motion.tr
//                               key={idx}
//                               initial={{ opacity: 0, x: -20 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               transition={{ delay: Math.min(idx * 0.05, 0.5) }}
//                               onMouseEnter={() => setHoveredRow(idx)}
//                               onMouseLeave={() => setHoveredRow(null)}
//                               className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors duration-200 cursor-pointer"
//                             >
//                               <td className="px-2 sm:px-4 py-2 sm:py-3">
//                                 <div className="flex items-center gap-1.5 sm:gap-2">
//                                   <motion.div
//                                     animate={{
//                                       rotate: hoveredRow === idx ? 360 : 0,
//                                     }}
//                                     transition={{ duration: 0.3 }}
//                                   >
//                                     <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-400" />
//                                   </motion.div>
//                                   <span className="text-[11px] sm:text-sm text-gray-700">
//                                     {new Date(
//                                       record.createdAt,
//                                     ).toLocaleDateString("en-US", {
//                                       year: "numeric",
//                                       month: "short",
//                                       day: "numeric",
//                                     })}
//                                   </span>
//                                 </div>
//                               </td>
//                               <td className="px-2 sm:px-4 py-2 sm:py-3">
//                                 <span className="text-[11px] sm:text-sm font-semibold text-gray-800">
//                                   {record.planId.name}
//                                 </span>
//                               </td>
//                               <td className="px-2 sm:px-4 py-2 sm:py-3">
//                                 <span className="text-[11px] sm:text-sm font-bold text-gray-900">
//                                   ₹{record.amount}
//                                 </span>
//                               </td>
//                               <td className="px-2 sm:px-4 py-2 sm:py-3">
//                                 <motion.span
//                                   className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium border inline-flex items-center gap-0.5 sm:gap-1 ${
//                                     record.status === "paid"
//                                       ? "text-emerald-600 bg-emerald-50 border-emerald-200"
//                                       : "text-amber-600 bg-amber-50 border-amber-200"
//                                   }`}
//                                   animate={{
//                                     scale: hoveredRow === idx ? 1.05 : 1,
//                                   }}
//                                   transition={{ duration: 0.2 }}
//                                 >
//                                   {record.status === "paid" && (
//                                     <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                                   )}
//                                   {record.status.charAt(0).toUpperCase() +
//                                     record.status.slice(1)}
//                                 </motion.span>
//                               </td>
//                             </motion.tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   ) : (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       className="text-center py-8 sm:py-12"
//                     >
//                       <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
//                         <HiOutlineReceiptRefund className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
//                       </div>
//                       <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
//                         No billing history
//                       </h3>
//                       <p className="text-gray-500 text-xs sm:text-sm">
//                         Your past transactions will appear here
//                       </p>
//                     </motion.div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* Logout Modal - Responsive */}
//       <AnimatePresence>
//         {showLogoutModal && (
//           <div
//             className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4"
//             onClick={() => setShowLogoutModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full overflow-hidden mx-3 sm:mx-0"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-4 sm:p-6 text-center">
//                 <motion.div
//                   className="inline-flex p-2.5 sm:p-3 bg-white/20 rounded-xl sm:rounded-2xl mb-2 sm:mb-3"
//                   animate={{ scale: [1, 1.1, 1] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 >
//                   <FiLogOut className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
//                 </motion.div>
//                 <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">
//                   Ready to Leave?
//                 </h3>
//                 <p className="text-indigo-100 text-xs sm:text-sm mt-0.5 sm:mt-1">
//                   Are you sure you want to logout?
//                 </p>
//               </div>
//               <div className="p-4 sm:p-6">
//                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//                   <button
//                     onClick={() => setShowLogoutModal(false)}
//                     className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors cursor-pointer text-xs sm:text-sm"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleLogout}
//                     className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-600 text-white font-medium rounded-lg sm:rounded-xl hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer text-xs sm:text-sm"
//                   >
//                     <FiLogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Logout
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </ProtectedRoute>
//   );
// };

// export default DashboardPage;

"use client";

import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFileText,
  FiPlus,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
  FiCreditCard,
  FiTrash2,
  FiLogOut,
  FiAward,
  FiCalendar,
  FiX,
  FiAlertCircle,
  FiTrendingUp,
  FiGrid,
  FiList,
  FiUser,
  FiLayout,
  FiBarChart2,
  FiBriefcase,
  FiEdit2,
  FiDollarSign,
  FiShoppingBag,
  FiStar,
} from "react-icons/fi";
import {
  HiOutlineTemplate,
  HiOutlineBadgeCheck,
  HiOutlineReceiptRefund,
} from "react-icons/hi";
import {
  IoSparkles,
  IoEllipsisVertical,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
  setSessionStorage,
} from "@/app/utils";
import { User } from "@/app/types/user.types";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineReceipt,
} from "react-icons/md";
import ProtectedRoute from "@/app/utils/ProtectedRoute";
import axios from "axios";
import { API_URL } from "@/app/config/api";
import { templateData } from "@/app/data";
import { CreateContext } from "@/app/context/CreateContext";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import api from "@/app/utils/api";

interface BillingRecord {
  invoice_date: string;
  plan_name: string;
  amount: number;
  payment_status: "created" | "failed";
  
}

interface usersCurrentPlan {
  current_plan: string;
  plan_details: {
    billing_type: string | null;
    days_remaining: string | null;
    description: string;
    discount_price: string;
    duration_days: string | null;
    expires_at: string | null;
    plan_name: string;
    price: string;
    purchased_at: string;
    validity_type: string;
  };
}

interface ResumeItem {
  component: React.ComponentType<any>;
  templateId: string | number;
  [key: string]: any;
}

interface Resume {
  id: number;
  is_completed: boolean;
  last_completed_section: string;
  resume_data: object;
  resume_title: string;
  template: {
    id: number;
    name: string;
    thumbnail: string | null;
    tier: string;
  };
  updated_at: string;
}

const DashboardPage = () => {
  const router = useRouter();

  const [usersCurrentPlan, setusersCurrentPlan] =
    useState<usersCurrentPlan | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [paymentRecords, setPaymentRecords] = useState<BillingRecord[] | null>(
    null,
  );
  const [statsData, setStatsData] = useState<any>(null);

  const [showBillingHistory, setShowBillingHistory] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [filteredOldResumeData, setFilteredOldResumeData] = useState<
    ResumeItem[]
  >([]);


  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const { setIsUploadMode } = useContext(CreateContext);
  const userDetails = getLocalStorage<User>("user_details");
  const userId = userDetails?.id;
  

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get("/dashboard");

        const { profile, resumes, statistics, subscription, transactions } =
          res?.data;

        setUserProfile(profile);
        setusersCurrentPlan(subscription);
        setPaymentRecords(transactions);
        setStatsData(statistics);


        const filter = resumes.flatMap((data1:Resume) => {
          const templateMatch = templateData.find(
            (t) => t?.id == data1.template?.id,
          );
          return templateMatch
            ? [{ ...data1, component: templateMatch.component }]
            : [];
        });

        setFilteredOldResumeData(filter);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, []);


  const handleDeleteResume = async (id: string) => {
    const result = await Swal.fire({
      title: '<span class="text-lg sm:text-xl font-bold">Delete Resume?</span>',
      html: `
        <div class="text-center">
          <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
            <svg class="w-6 h-6 sm:w-8 sm:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <p class="text-gray-600 text-sm sm:text-base mb-2">Are you sure you want to delete</p>
          <p class="font-semibold text-gray-900 text-sm sm:text-base"> this resume?</p>
          <p class="text-xs sm:text-sm text-gray-500 mt-3">This action cannot be undone.</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText:
        '<span class="flex items-center gap-2 text-xs sm:text-sm"><svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Yes, delete it!</span>',
      cancelButtonText: '<span class="text-xs sm:text-sm">Cancel</span>',
      reverseButtons: true,
      customClass: {
        popup: "rounded-xl sm:rounded-2xl",
        confirmButton:
          "rounded-lg px-4 py-2 sm:px-5 sm:py-2.5 transition-all duration-200",
        cancelButton:
          "rounded-lg px-4 py-2 sm:px-5 sm:py-2.5 transition-all duration-200",
      },
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`${API_URL}/user-resumes/${id}`);

        toast.custom(
          (t) => (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="max-w-md w-full bg-white shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 mx-4 sm:mx-0"
            >
              <div className="flex-1 w-0 p-3 sm:p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <IoCheckmarkCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">
                      Resume Deleted!
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Your resume has been successfully removed.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-3 sm:p-4 flex items-center justify-center text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          ),
          { duration: 4000 },
        );


         const fetchUserData = async () => {
      try {
        const res = await api.get("/dashboard");

        const { profile, resumes, statistics, subscription, transactions } =
          res?.data;

        setUserProfile(profile);
        setusersCurrentPlan(subscription);
        setPaymentRecords(transactions);
        setStatsData(statistics);

        const filter = resumes.flatMap((data1:Resume) => {
          const templateMatch = templateData.find(
            (t) => t?.id == data1.template?.id,
          );
          return templateMatch
            ? [{ ...data1, component: templateMatch.component }]
            : [];
        });

        setFilteredOldResumeData(filter);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();

        // const response = await axios.get(
        //   `${API_URL}/api/contact-resume/all-contact/${userId}`,
        // );
        // const filter = response.data.flatMap(
        //   (data1: { templateId: string | number }) => {
        //     const templateMatch = templateData.find(
        //       (t) => t.id == data1.templateId,
        //     );
        //     return templateMatch
        //       ? [{ ...data1, component: templateMatch.component }]
        //       : [];
        //   },
        // );
        // setFilteredOldResumeData(filter);
      } catch (err) {
        toast.error("Failed to delete resume. Please try again.");
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = showBillingHistory ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showBillingHistory]);

  const handleLogout = () => {
    removeLocalStorage("user_details");
    removeLocalStorage("fullResumeData");
    removeLocalStorage("chosenTemplate");
    removeLocalStorage("accessToken");
    router.push("/login");
  };

  const totalResumes = filteredOldResumeData.length;

  // Calculate billing statistics
  const totalTransactions = paymentRecords?.length || 0;
  const totalAmountSpent =
    paymentRecords?.reduce(
      (sum, record) =>
        record.payment_status === "created" ? sum + Number(record.amount) : sum,
      0,
    ) || 0;


  // Responsive grid columns based on screen size
  const getResumeGridCols = () => {
    if (isMobile) return "grid-cols-1";
    if (isTablet) return "grid-cols-2";
    return "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  };



  return (
    <ProtectedRoute>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-indigo-50/20">
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-5 lg:px-6 py-4 sm:py-6 lg:py-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-500/10 rounded-full text-indigo-600 text-[10px] sm:text-xs font-semibold mb-3 sm:mb-4 border border-indigo-200/30">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <IoSparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </motion.div>
              <span>DASHBOARD</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                    {/* {userName?.split(" ")[0]} */}
                    {userProfile?.first_name} {userProfile?.last_name}
                  </span>
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">
                  Manage your resumes, track performance, and land your dream
                  job
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/choose-template")}
                className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 group cursor-pointer"
              >
                <motion.div
                  animate={{ rotate: [0, 90, 0] }}
                  transition={{ duration: 0.5 }}
                  className="group-hover:rotate-90 transition-transform"
                >
                  <FiPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </motion.div>
                Create New Resume
              </motion.button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                label: " Resumes Created",
                value: statsData?.total_resumes_created,
                icon: FiFileText,
                color: "purple",
                delay: 0,
              },
              {
                label: "Available Templates",
                value: templateData.length,
                icon: FiLayout,
                color: "green",
                delay: 0.1,
              },
              {
                label: "Current Plan",
                value: usersCurrentPlan?.current_plan || "Free",
                icon: FiStar,
                color: "amber",
                delay: 0.2,
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: stat.delay, duration: 0.4 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                    <p
                      className={`md:text-lg lg:text-2xl font-bold text-${stat.color}-600`}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <motion.div
                    className={`w-10 h-10 bg-${stat.color}-50 rounded-xl flex items-center justify-center group-hover:bg-${stat.color}-100 transition-all`}
                  >
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Profile and Plan Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1 order-2 lg:order-1"
            >
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-indigo-100 overflow-hidden hover:shadow-md transition-all duration-300 group">
                <div className="relative h-20 sm:h-24 bg-gradient-to-br from-indigo-700 to-purple-500">
                  <motion.div
                    className="absolute -bottom-8 sm:-bottom-10 left-4 sm:left-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  ></motion.div>
                </div>
                <div className="p-4 sm:p-5 md:p-6 pt-10 sm:pt-12">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 truncate">
                    {userProfile?.first_name} {userProfile?.last_name}
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      {
                        icon: FiMail,
                        label: "Email",
                        value: userProfile?.email || "",
                        color: "blue",
                      },
                      {
                        icon: FiPhone,
                        label: "Phone",
                        value: userProfile?.phone || "",
                        color: "emerald",
                      },
                      {
                        icon: FiMapPin,
                        label: "Location",
                        value: userProfile?.city || "",
                        color: "purple",
                      },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer"
                      >
                        <div
                          className={`p-1.5 sm:p-2 bg-${item.color}-50 rounded-lg`}
                        >
                          <item.icon
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-${item.color}-600`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            {item.label}
                          </p>
                          <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                            {item.value}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLogoutModal(true)}
                    className="w-full mt-4 sm:mt-6 px-3 sm:px-4 py-2.5 sm:py-3 bg-indigo-50 text-indigo-600 font-medium rounded-lg sm:rounded-xl hover:bg-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer text-xs sm:text-sm"
                  >
                    <motion.div
                      animate={{ rotate: 0 }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiLogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </motion.div>
                    Logout
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Plan Card */}
            {usersCurrentPlan ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2 order-1 lg:order-2"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-indigo-100 overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-500 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                          <motion.span
                            className="px-1.5 sm:px-2 py-0.5 bg-white/20 text-white text-[10px] sm:text-xs font-semibold rounded-full"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            ACTIVE
                          </motion.span>
                          <HiOutlineBadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-200" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1">
                          {usersCurrentPlan?.current_plan} Plan
                        </h3>
                        <p className="text-indigo-100 text-xs sm:text-sm">
                          Your current subscription
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-2xl sm:text-3xl font-bold text-white">
                          ₹{usersCurrentPlan?.plan_details.price || "0"}
                        </p>
                        <p className="text-indigo-100 text-[10px] sm:text-xs mt-0.5 sm:mt-1">
                          per{" "}
                          {usersCurrentPlan?.current_plan === "Premium"
                            ? "Lifetime"
                            : usersCurrentPlan?.current_plan === "Pro Plus"
                              ? "3 months"
                              : "month"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
                      <FiAward className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />{" "}
                      Plan Features
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                      {usersCurrentPlan?.plan_details?.description &&
                        (() => {
                          const parser = new DOMParser();
                          const doc = parser.parseFromString(
                            usersCurrentPlan.plan_details.description,
                            "text/html",
                          );
                          const features = Array.from(
                            doc.querySelectorAll("li"),
                          ).map((li) => li.textContent?.trim() || "");
                          return features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-700"
                            >
                              <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                              <span className="line-clamp-2">{feature}</span>
                            </motion.div>
                          ));
                        })()}
                    </div>

                    {/* Subscription Dates Section - Add this new section */}
                    {/* Subscription Dates Section - Updated for Lifetime plans */}
                    {(usersCurrentPlan?.plan_details.purchased_at ||
                      usersCurrentPlan?.current_plan === "Premium") && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-indigo-50/30 rounded-lg sm:rounded-xl border border-gray-100"
                      >
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                          <FiCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
                          Subscription Info
                        </h4>
                        <div className="space-y-2 sm:space-y-2.5">
                          {/* Purchase Date - Always show if available */}
                          {usersCurrentPlan?.plan_details.purchased_at && (
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs sm:text-sm">
                              <span className="text-gray-600 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                Purchase Date:
                              </span>
                              <span className="font-medium text-gray-800">
                                {new Date(
                                  usersCurrentPlan.plan_details.purchased_at,
                                ).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          )}

                          {/* Expiry/Validity Info - Conditional based on plan type */}
                          {usersCurrentPlan?.current_plan === "Premium" ? (
                            // Lifetime plan - Show lifetime badge instead of expiry
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs sm:text-sm">
                              <span className="text-gray-600 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                Validity:
                              </span>
                              <span className="font-medium bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-1.5">
                                <FiAward className="w-3.5 h-3.5 text-purple-500" />
                                Lifetime Access
                              </span>
                            </div>
                          ) : (
                            // Non-premium plans - Show expiry date
                            usersCurrentPlan?.plan_details.expires_at && (
                              <>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs sm:text-sm">
                                  <span className="text-gray-600 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                                    Expiry Date:
                                  </span>
                                  <span
                                    className={`font-medium ${new Date(usersCurrentPlan.plan_details.expires_at) < new Date() ? "text-red-600" : "text-gray-800"}`}
                                  >
                                    {new Date(
                                      usersCurrentPlan.plan_details.expires_at,
                                    ).toLocaleDateString("en-IN", {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    })}
                                    {new Date(
                                      usersCurrentPlan.plan_details.expires_at,
                                    ) < new Date() && (
                                      <span className="ml-2 text-red-500 text-[10px] sm:text-xs font-semibold">
                                        (Expiring Today)
                                      </span>
                                    )}
                                  </span>
                                </div>

                                {/* Days remaining - Only for non-expired non-premium plans */}
                                {new Date(
                                  usersCurrentPlan.plan_details.expires_at,
                                ) > new Date() && (
                                  <div className="mt-2 pt-2 border-t border-gray-100">
                                    <div className="flex items-center justify-between text-xs">
                                      <span className="text-gray-600">
                                        Days remaining:
                                      </span>
                                      <span className="font-semibold text-indigo-600">
                                        {Math.ceil(
                                          (new Date(
                                            usersCurrentPlan.plan_details
                                              .expires_at,
                                          ).getTime() -
                                            new Date().getTime()) /
                                            (1000 * 60 * 60 * 24),
                                        )}{" "}
                                        days
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </>
                            )
                          )}

                          {/* For Premium plans, show additional message */}
                          {usersCurrentPlan?.current_plan === "Premium" && (
                            <div className="mt-2 pt-2 border-t border-gray-100">
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <HiOutlineBadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Enjoy all premium features forever!</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => router.push("/choose-plan")}
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-600 text-white font-medium rounded-lg sm:rounded-xl hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer text-xs sm:text-sm"
                      >
                        <motion.div
                          whileHover={{ rotate: 90 }}
                          transition={{ duration: 0.3 }}
                        >
                          <MdOutlinePublishedWithChanges className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </motion.div>
                        Upgrade Plan
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowBillingHistory(true)}
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-50 text-indigo-600 font-medium rounded-lg sm:rounded-xl hover:bg-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                      >
                        <FiCreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{" "}
                        Billing History
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2 order-1 lg:order-2"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-indigo-100 overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-6 sm:p-8 text-center">
                    <motion.div
                      className="inline-flex p-3 sm:p-4 bg-white/20 rounded-full mb-3 sm:mb-4"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FiAlertCircle className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                      No Active Plan
                    </h3>
                    <p className="text-indigo-100 text-xs sm:text-sm">
                      Choose a plan to unlock premium features and templates
                    </p>
                  </div>
                  <div className="p-4 sm:p-6 text-center flex item-center justify-center gap-3 sm:gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push("/choose-plan")}
                      className=" px-5 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white font-medium rounded-lg sm:rounded-xl hover:bg-indigo-700 transition-all duration-300 cursor-pointer text-xs sm:text-sm"
                    >
                      Choose a Plan
                    </motion.button>
                    {paymentRecords && paymentRecords?.length > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowBillingHistory(true)}
                        className=" px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-50 text-indigo-600 font-medium rounded-lg sm:rounded-xl hover:bg-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                      >
                        <FiCreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{" "}
                        Billing History
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Resumes Section */}
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-1.5 sm:gap-2">
                  <FiFileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />{" "}
                  Your Resumes
                </h3>
                <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                  <p className="text-gray-500 text-[11px] sm:text-sm">
                    Create, edit, and manage all your resumes
                  </p>
                  <motion.div
                    className="px-1.5 sm:px-2 py-0.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-600 text-[10px] sm:text-xs font-semibold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {totalResumes} {totalResumes === 1 ? "Resume" : "Resumes"}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Resume Count Badge - Mobile */}
            {isMobile && (
              <motion.div
                className="mb-3 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full inline-flex items-center gap-1.5 sm:gap-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiFileText className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-600" />
                <span className="text-[10px] sm:text-xs font-semibold text-purple-600">
                  {totalResumes} {totalResumes === 1 ? "Resume" : "Resumes"}
                </span>
              </motion.div>
            )}

            {/* Responsive Grid View */}
            <div
              className={`grid ${getResumeGridCols()} gap-3 sm:gap-4 md:gap-5 lg:gap-6`}
            >
              {filteredOldResumeData.length > 0 ? (
                filteredOldResumeData.map((item, index) => {
                  const ComponentToRender = item.component;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: Math.min(index * 0.05, 0.5) }}
                      whileHover={{ y: -4 }}
                      className="relative group cursor-pointer"
                      style={{
                        height: isMobile
                          ? "clamp(240px, 45vw, 280px)"
                          : "clamp(280px, 30vw, 340px)",
                        overflow: "hidden",
                        borderRadius: "16px",
                        backgroundColor: "white",
                        boxShadow: "0 4px 12px -4px rgba(0, 0, 0, 0.05)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div className="w-full h-full">
                        <ComponentToRender alldata={item.resume_data} />
                      </div>

                      {/* Overlay with actions */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent ${!isMobile ? "opacity-0 group-hover:opacity-100" : ""} transition-all duration-300`}
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: isMobile ? 0 : 1 }}
                      >
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setLocalStorage(
                                  "chosenTemplate",
                                  item.template,
                                );
                                setSessionStorage(
                                  "oldRouteNameDashboard",
                                  true,
                                );
                                router.push(`/resume-details/contact`);

                                setIsUploadMode(false);
                              }}
                              className="bg-white rounded-full p-1.5 sm:p-2.5 hover:bg-purple-50 transition-all duration-300 shadow-lg cursor-pointer group/btn"
                            >
                              <FiEdit2 className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 group-hover/btn:scale-110 transition-transform" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                handleDeleteResume(item.id)
                              }
                              className="bg-white rounded-full p-1.5 sm:p-2.5 hover:bg-rose-50 transition-all duration-300 shadow-lg cursor-pointer group/btn"
                            >
                              <FiTrash2 className="h-3 w-3 sm:h-4 sm:w-4 text-rose-600 group-hover/btn:scale-110 transition-transform" />
                            </motion.button>
                          </div>
                          <p className="text-white text-[11px] sm:text-sm font-medium text-center truncate px-1 sm:px-2">
                            {item.name || `Resume ${index + 1}`}
                          </p>
                          <p className="text-white/60 text-[10px] sm:text-xs text-center mt-0.5 sm:mt-1">
                            Template: {item.templateId}
                          </p>
                        </div>
                      </motion.div>

                      {/* Mobile menu button */}
                      {isMobile && (
                        <>
                          <button
                            onClick={() =>
                              setActiveMenuId(
                                activeMenuId === item.contact?._id
                                  ? null
                                  : item.contact?._id,
                              )
                            }
                            className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow-md z-10 hover:bg-gray-50 transition"
                          >
                            <IoEllipsisVertical className="w-4 h-4 text-gray-700" />
                          </button>
                          {activeMenuId === item.contact?._id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setActiveMenuId(null)}
                              />
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute right-2 top-12 z-20 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5"
                              >
                                <button
                                  onClick={() => {
                                    router.push(`/resume-details/contact`);
                                    setLocalStorage("chosenTemplate", item);
                                    setSessionStorage(
                                      "oldRouteNameDashboard",
                                      true,
                                    );
                                    setIsUploadMode(false);
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors flex items-center gap-2"
                                >
                                  <FiEdit2 className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button
                                  onClick={() => {
                                    handleDeleteResume(
                                      item.id
                                    );
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors flex items-center gap-2"
                                >
                                  <FiTrash2 className="w-3.5 h-3.5" /> Delete
                                </button>
                              </motion.div>
                            </>
                          )}
                        </>
                      )}
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="col-span-full flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                      <FiFileText className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-purple-600" />
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                      No Resumes Found
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
                      Create your first resume to get started
                    </p>
                    <button
                      onClick={() => router.push("/choose-template")}
                      className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all text-xs sm:text-sm cursor-pointer"
                    >
                      Create Resume
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Billing History Modal - Responsive */}
      <AnimatePresence>
        {showBillingHistory && paymentRecords && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4"
            onClick={() => setShowBillingHistory(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fixed Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-4 sm:p-6 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg sm:rounded-xl">
                      <MdOutlineReceipt className="w-4 h-4 sm:w-5 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white">
                        Billing History
                      </h2>
                      <p className="text-indigo-100 text-[11px] sm:text-sm">
                        View your past transactions and invoices
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBillingHistory(false)}
                    className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition cursor-pointer"
                  >
                    <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto">
                {/* Summary Cards - Responsive */}
                <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50/30">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      whileHover={{ y: -2 }}
                      className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            Total Transactions
                          </p>
                          <p className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900">
                            {totalTransactions}
                          </p>
                        </div>
                        <div className="w-7 h-7 sm:w-8 sm:h-10 bg-indigo-50 rounded-lg sm:rounded-xl flex items-center justify-center">
                          <FiShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-5 text-indigo-600" />
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ y: -2 }}
                      className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            Total Spent
                          </p>
                          <p className="text-base sm:text-xl lg:text-2xl font-bold text-emerald-600">
                            ₹{totalAmountSpent?.toFixed(2) || "0.00"}
                          </p>
                        </div>
                        <div className="w-7 h-7 sm:w-8 sm:h-10 bg-emerald-50 rounded-lg sm:rounded-xl flex items-center justify-center">
                          <FiDollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-5 text-emerald-600" />
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ y: -2 }}
                      className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            Current Plan
                          </p>
                          <p className="text-sm sm:text-base lg:text-xl font-bold text-indigo-600 truncate">
                            {usersCurrentPlan?.current_plan || "Free"}
                          </p>
                        </div>
                        <div className="w-7 h-7 sm:w-8 sm:h-10 bg-purple-50 rounded-lg sm:rounded-xl flex items-center justify-center">
                          <HiOutlineBadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-5 text-purple-600" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Billing Records Table - Fully Scrollable */}
                <div className="p-4 sm:p-6">
                  {paymentRecords.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[500px]">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr className="border-b-2 border-gray-200">
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Plan
                            </th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {paymentRecords.map((record, idx) => (
                            <motion.tr
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                              onMouseEnter={() => setHoveredRow(idx)}
                              onMouseLeave={() => setHoveredRow(null)}
                              className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors duration-200 cursor-pointer"
                            >
                              <td className="px-2 sm:px-4 py-2 sm:py-3">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                  <motion.div
                                    animate={{
                                      rotate: hoveredRow === idx ? 360 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-400" />
                                  </motion.div>
                                  <span className="text-[11px] sm:text-sm text-gray-700">
                                    {new Date(
                                      record.invoice_date,
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </span>
                                </div>
                              </td>
                              <td className="px-2 sm:px-4 py-2 sm:py-3">
                                <span className="text-[11px] sm:text-sm font-semibold text-gray-800">
                                  {record.plan_name}
                                </span>
                              </td>
                              <td className="px-2 sm:px-4 py-2 sm:py-3">
                                <span className="text-[11px] sm:text-sm font-bold text-gray-900">
                                  ₹{record.amount}
                                </span>
                              </td>
                              <td className="px-2 sm:px-4 py-2 sm:py-3">
                                <motion.span
                                  className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium border inline-flex items-center gap-0.5 sm:gap-1 ${
                                    record.payment_status === "created"
                                      ? "text-emerald-600 bg-emerald-50 border-emerald-200"
                                      : "text-amber-600 bg-amber-50 border-amber-200"
                                  }`}
                                  animate={{
                                    scale: hoveredRow === idx ? 1.05 : 1,
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {record?.payment_status === "created" && (
                                    <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                  )}
                                  {record?.payment_status
                                    .charAt(0)
                                    .toUpperCase() +
                                    record.payment_status.slice(1)}
                                </motion.span>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 sm:py-12"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
                        <HiOutlineReceiptRefund className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      </div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                        No billing history
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        Your past transactions will appear here
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Logout Modal - Responsive */}
      <AnimatePresence>
        {showLogoutModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4"
            onClick={() => setShowLogoutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full overflow-hidden mx-3 sm:mx-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-4 sm:p-6 text-center">
                <motion.div
                  className="inline-flex p-2.5 sm:p-3 bg-white/20 rounded-xl sm:rounded-2xl mb-2 sm:mb-3"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FiLogOut className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">
                  Ready to Leave?
                </h3>
                <p className="text-indigo-100 text-xs sm:text-sm mt-0.5 sm:mt-1">
                  Are you sure you want to logout?
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors cursor-pointer text-xs sm:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-600 text-white font-medium rounded-lg sm:rounded-xl hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer text-xs sm:text-sm"
                  >
                    <FiLogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ProtectedRoute>
  );
};

export default DashboardPage;
