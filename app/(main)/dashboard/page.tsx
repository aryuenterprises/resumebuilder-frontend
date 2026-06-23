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
//   FiLock,
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
// import api from "@/app/utils/api";

// interface BillingRecord {
//   invoice_date: string;
//   plan_name: string;
//   amount: number;
//   payment_status: "created" | "failed";
// }

// interface usersCurrentPlan {
//   current_plan: string;
//   message?: string;
//   is_expired?: boolean;
//   plan_details: {
//     billing_type: string | null;
//     days_remaining: string | null;
//     description: string;
//     discount_price: string;
//     duration_days: string | null;
//     expires_at: string | null;
//     plan_name: string;
//     price: string;
//     purchased_at: string;
//     validity_type: string;
//   };
// }

// interface ResumeItem {
//   component: React.ComponentType<any>;
//   templateId: string | number;
//   [key: string]: any;
// }

// interface Resume {
//   id: number;
//   is_completed: boolean;
//   last_completed_section: string;
//   resume_data: object;
//   resume_title: string;
//   template: {
//     id: number;
//     name: string;
//     thumbnail: string | null;
//     tier: string;
//   };
//   updated_at: string;
// }

// const DashboardPage = () => {
//   const router = useRouter();

//   const [usersCurrentPlan, setusersCurrentPlan] =
//     useState<usersCurrentPlan | null>(null);
//   const [userProfile, setUserProfile] = useState<any>(null);
//   const [paymentRecords, setPaymentRecords] = useState<BillingRecord[] | null>(
//     null,
//   );
//   const [statsData, setStatsData] = useState<any>(null);

//   const [showBillingHistory, setShowBillingHistory] = useState(false);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [filteredOldResumeData, setFilteredOldResumeData] = useState<
//     ResumeItem[]
//   >([]);

//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);
//   const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
//   const [hoveredRow, setHoveredRow] = useState<number | null>(null);
//   const { setIsUploadMode } = useContext(CreateContext);
//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;

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
//         const res = await api.get("/dashboard");

//         const { profile, resumes, statistics, subscription, transactions } =
//           res?.data;

//         setUserProfile(profile);
//         setusersCurrentPlan(subscription);
//         setPaymentRecords(transactions);
//         setStatsData(statistics);

//         const filter = resumes.flatMap((data1: Resume) => {
//           const templateMatch = templateData.find(
//             (t) => t?.id == data1.template?.id,
//           );
//           return templateMatch
//             ? [{ ...data1, component: templateMatch.component }]
//             : [];
//         });

//         setFilteredOldResumeData(filter);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleDeleteResume = async (id: string) => {
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
//           <p class="font-semibold text-gray-900 text-sm sm:text-base"> this resume?</p>
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
//         await api.delete(`${API_URL}/user-resumes/${id}`);

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

//         const fetchUserData = async () => {
//           try {
//             const res = await api.get("/dashboard");

//             const { profile, resumes, statistics, subscription, transactions } =
//               res?.data;

//             setUserProfile(profile);
//             setusersCurrentPlan(subscription);
//             setPaymentRecords(transactions);
//             setStatsData(statistics);

//             const filter = resumes.flatMap((data1: Resume) => {
//               const templateMatch = templateData.find(
//                 (t) => t?.id == data1.template?.id,
//               );
//               return templateMatch
//                 ? [{ ...data1, component: templateMatch.component }]
//                 : [];
//             });

//             setFilteredOldResumeData(filter);
//           } catch (err) {
//             console.error(err);
//           }
//         };
//         fetchUserData();

//         // const response = await axios.get(
//         //   `${API_URL}/api/contact-resume/all-contact/${userId}`,
//         // );
//         // const filter = response.data.flatMap(
//         //   (data1: { templateId: string | number }) => {
//         //     const templateMatch = templateData.find(
//         //       (t) => t.id == data1.templateId,
//         //     );
//         //     return templateMatch
//         //       ? [{ ...data1, component: templateMatch.component }]
//         //       : [];
//         //   },
//         // );
//         // setFilteredOldResumeData(filter);
//       } catch (err) {
//         toast.error("Failed to delete resume. Please try again.");
//       }
//     }
//   };

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
//     removeLocalStorage("access_token");
//     removeLocalStorage("refresh_token");
//     removeLocalStorage("user_token");

//     removeLocalStorage("coverLetterData");
//     removeLocalStorage("editingResumeIdAndData");
//     removeLocalStorage("user_token");

//     router.push("/login");
//   };




//   const totalResumes = filteredOldResumeData.length;

//   // Calculate billing statistics
//   const totalTransactions = paymentRecords?.length || 0;
//   const totalAmountSpent =
//     paymentRecords?.reduce(
//       (sum, record) =>
//         record.payment_status === "created" ? sum + Number(record.amount) : sum,
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
//                     {/* {userName?.split(" ")[0]} */}
//                     {userProfile?.first_name} {userProfile?.last_name}
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

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//             {[
//               {
//                 label: " Resumes Created",
//                 value: statsData?.total_resumes_created,
//                 icon: FiFileText,
//                 color: "purple",
//                 delay: 0,
//               },
//               {
//                 label: "Available Templates",
//                 value: templateData.length,
//                 icon: FiLayout,
//                 color: "green",
//                 delay: 0.1,
//               },
//               {
//                 label: "Current Plan",
//                 value: usersCurrentPlan?.current_plan || "no plan",
//                 icon: FiStar,
//                 color: "amber",
//                 delay: 0.2,
//               },
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
//                     {userProfile?.first_name} {userProfile?.last_name}
//                   </h3>
//                   <div className="space-y-2 sm:space-y-3">
//                     {[
//                       {
//                         icon: FiMail,
//                         label: "Email",
//                         value: userProfile?.email || "",
//                         color: "blue",
//                       },
//                       {
//                         icon: FiPhone,
//                         label: "Phone",
//                         value: userProfile?.phone || "",
//                         color: "emerald",
//                       },
//                       {
//                         icon: FiMapPin,
//                         label: "Location",
//                         value: userProfile?.city || "",
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
//             {/* // Plan Card Section - Updated to handle expired subscription */}
//             {usersCurrentPlan ? (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="lg:col-span-2 order-1 lg:order-2"
//               >
//                 <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-indigo-100 overflow-hidden hover:shadow-md transition-all duration-300">
//                   {/* Check if plan is expired (current_plan is null and message exists) */}
//                   {usersCurrentPlan.current_plan === "" &&
//                   usersCurrentPlan.message &&
//                   usersCurrentPlan.is_expired === true ? (
//                     // Expired Plan UI
//                     <>
//                       <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 sm:p-6">
//                         <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
//                           <div>
//                             <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
//                               <motion.span
//                                 className="px-1.5 sm:px-2 py-0.5 bg-red-500/20 text-red-100 text-[10px] sm:text-xs font-semibold rounded-full"
//                                 animate={{ scale: [1, 1.05, 1] }}
//                                 transition={{ duration: 2, repeat: Infinity }}
//                               >
//                                 EXPIRED
//                               </motion.span>
//                               <FiAlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200" />
//                             </div>
//                             <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1">
//                               Subscription Expired
//                             </h3>
//                             <p className="text-amber-100 text-xs sm:text-sm">
//                               {usersCurrentPlan.message}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="p-4 sm:p-6">
//                         <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-amber-50 rounded-lg sm:rounded-xl border border-amber-100">
//                           <div className="flex items-start gap-2 sm:gap-3">
//                             <div className="p-1.5 sm:p-2 bg-amber-100 rounded-lg shrink-0">
//                               <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
//                             </div>
//                             <div>
//                               <h4 className="text-xs sm:text-sm font-semibold text-amber-800 mb-1">
//                                 Your subscription has expired
//                               </h4>
//                               <p className="text-amber-700 text-[11px] sm:text-xs">
//                                 To continue accessing premium features and
//                                 templates, please subscribe to a new plan.
//                               </p>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
//                           <motion.button
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             onClick={() => router.push("/choose-plan")}
//                             className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-600 text-white font-medium rounded-lg sm:rounded-xl hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer text-xs sm:text-sm"
//                           >
//                             <motion.div
//                               whileHover={{ rotate: 90 }}
//                               transition={{ duration: 0.3 }}
//                             >
//                               <MdOutlinePublishedWithChanges className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                             </motion.div>
//                             Subscribe Now
//                           </motion.button>
//                           {paymentRecords && paymentRecords?.length > 0 && (
//                             <motion.button
//                               whileHover={{ scale: 1.02 }}
//                               whileTap={{ scale: 0.98 }}
//                               onClick={() => setShowBillingHistory(true)}
//                               className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-50 text-indigo-600 font-medium rounded-lg sm:rounded-xl hover:bg-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
//                             >
//                               <FiCreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                               Billing History
//                             </motion.button>
//                           )}
//                         </div>
//                       </div>
//                     </>
//                   ) : usersCurrentPlan.current_plan ? (
//                     // Active Plan UI
//                     <>
//                       <div className="bg-gradient-to-r from-indigo-600 to-purple-500 p-4 sm:p-6">
//                         <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
//                           <div>
//                             <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
//                               <motion.span
//                                 className="px-1.5 sm:px-2 py-0.5 bg-white/20 text-white text-[10px] sm:text-xs font-semibold rounded-full"
//                                 animate={{ scale: [1, 1.05, 1] }}
//                                 transition={{ duration: 2, repeat: Infinity }}
//                               >
//                                 ACTIVE
//                               </motion.span>
//                               <HiOutlineBadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-200" />
//                             </div>
//                             <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1">
//                               {usersCurrentPlan?.current_plan} Plan
//                             </h3>
//                             <p className="text-indigo-100 text-xs sm:text-sm">
//                               Your current subscription
//                             </p>
//                           </div>
//                           <div className="text-left sm:text-right">
//                             <p className="text-2xl sm:text-3xl font-bold text-white">
//                               ₹{usersCurrentPlan?.plan_details?.price || "0"}
//                             </p>
//                             <p className="text-indigo-100 text-[10px] sm:text-xs mt-0.5 sm:mt-1">
//                               per{" "}
//                               {usersCurrentPlan?.current_plan === "Premium"
//                                 ? "Lifetime"
//                                 : usersCurrentPlan?.current_plan === "Pro Plus"
//                                   ? "3 months"
//                                   : "month"}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="p-4 sm:p-6">
//                         <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
//                           <FiAward className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />{" "}
//                           Plan Features
//                         </h4>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
//                           {usersCurrentPlan?.plan_details?.description &&
//                             (() => {
//                               const parser = new DOMParser();
//                               const doc = parser.parseFromString(
//                                 usersCurrentPlan.plan_details.description,
//                                 "text/html",
//                               );
//                               const features = Array.from(
//                                 doc.querySelectorAll("li"),
//                               ).map((li) => li.textContent?.trim() || "");
//                               return features.map((feature, idx) => (
//                                 <motion.div
//                                   key={idx}
//                                   initial={{ opacity: 0, x: -10 }}
//                                   animate={{ opacity: 1, x: 0 }}
//                                   transition={{ delay: idx * 0.05 }}
//                                   className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-700"
//                                 >
//                                   <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 mt-0.5 shrink-0" />
//                                   <span className="line-clamp-2">
//                                     {feature}
//                                   </span>
//                                 </motion.div>
//                               ));
//                             })()}
//                         </div>

//                         {/* Subscription Dates Section */}
//                         {(usersCurrentPlan?.plan_details?.purchased_at ||
//                           usersCurrentPlan?.current_plan === "Premium") && (
//                           <motion.div
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.2 }}
//                             className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-indigo-50/30 rounded-lg sm:rounded-xl border border-gray-100"
//                           >
//                             <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
//                               <FiCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
//                               Subscription Info
//                             </h4>
//                             <div className="space-y-2 sm:space-y-2.5">
//                               {/* Purchase Date */}
//                               {usersCurrentPlan?.plan_details.purchased_at && (
//                                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs sm:text-sm">
//                                   <span className="text-gray-600 flex items-center gap-1.5">
//                                     <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
//                                     Purchase Date:
//                                   </span>
//                                   <span className="font-medium text-gray-800">
//                                     {new Date(
//                                       usersCurrentPlan.plan_details
//                                         .purchased_at,
//                                     ).toLocaleDateString("en-IN", {
//                                       day: "numeric",
//                                       month: "long",
//                                       year: "numeric",
//                                     })}
//                                   </span>
//                                 </div>
//                               )}

//                               {/* Expiry/Validity Info */}
//                               {usersCurrentPlan?.current_plan === "Premium" ? (
//                                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs sm:text-sm">
//                                   <span className="text-gray-600 flex items-center gap-1.5">
//                                     <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
//                                     Validity:
//                                   </span>
//                                   <span className="font-medium bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-1.5">
//                                     <FiAward className="w-3.5 h-3.5 text-purple-500" />
//                                     Lifetime Access
//                                   </span>
//                                 </div>
//                               ) : (
//                                 usersCurrentPlan?.plan_details.expires_at && (
//                                   <>
//                                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs sm:text-sm">
//                                       <span className="text-gray-600 flex items-center gap-1.5">
//                                         <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
//                                         Expiry Date:
//                                       </span>
//                                       <span
//                                         className={`font-medium ${new Date(usersCurrentPlan.plan_details.expires_at) < new Date() ? "text-red-600" : "text-gray-800"}`}
//                                       >
//                                         {new Date(
//                                           usersCurrentPlan.plan_details
//                                             .expires_at,
//                                         ).toLocaleDateString("en-IN", {
//                                           day: "numeric",
//                                           month: "long",
//                                           year: "numeric",
//                                         })}
//                                         {new Date(
//                                           usersCurrentPlan.plan_details
//                                             .expires_at,
//                                         ) < new Date() && (
//                                           <span className="ml-2 text-red-500 text-[10px] sm:text-xs font-semibold">
//                                             (Expired)
//                                           </span>
//                                         )}
//                                       </span>
//                                     </div>

//                                     {/* Days remaining */}
//                                     {new Date(
//                                       usersCurrentPlan.plan_details.expires_at,
//                                     ) > new Date() && (
//                                       <div className="mt-2 pt-2 border-t border-gray-100">
//                                         <div className="flex items-center justify-between text-xs">
//                                           <span className="text-gray-600">
//                                             Days remaining:
//                                           </span>
//                                           <span className="font-semibold text-indigo-600">
//                                             {Math.ceil(
//                                               (new Date(
//                                                 usersCurrentPlan.plan_details
//                                                   .expires_at,
//                                               ).getTime() -
//                                                 new Date().getTime()) /
//                                                 (1000 * 60 * 60 * 24),
//                                             )}{" "}
//                                             days
//                                           </span>
//                                         </div>
//                                       </div>
//                                     )}
//                                   </>
//                                 )
//                               )}
//                             </div>
//                           </motion.div>
//                         )}

//                         <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
//                           <motion.button
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             onClick={() => router.push("/choose-plan")}
//                             className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-600 text-white font-medium rounded-lg sm:rounded-xl hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer text-xs sm:text-sm"
//                           >
//                             <motion.div
//                               whileHover={{ rotate: 90 }}
//                               transition={{ duration: 0.3 }}
//                             >
//                               <MdOutlinePublishedWithChanges className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                             </motion.div>
//                             Upgrade Plan
//                           </motion.button>
//                           <motion.button
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             onClick={() => setShowBillingHistory(true)}
//                             className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-50 text-indigo-600 font-medium rounded-lg sm:rounded-xl hover:bg-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
//                           >
//                             <FiCreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                             Billing History
//                           </motion.button>
//                         </div>
//                       </div>
//                     </>
//                   ) : null}
//                 </div>
//               </motion.div>
//             ) : (
//               // No Plan/Free Plan UI (existing code)
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
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => setShowBillingHistory(true)}
//                         className=" px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-50 text-indigo-600 font-medium rounded-lg sm:rounded-xl hover:bg-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
//                       >
//                         <FiCreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         Billing History
//                       </motion.button>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </div>

//           {/* Resumes Section */}
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

//             {/* Show lock message if plan is expired */}

//             {usersCurrentPlan?.current_plan === "" &&
//               usersCurrentPlan?.message &&
//               usersCurrentPlan?.is_expired === true && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="mb-4 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg sm:rounded-xl flex items-start gap-2 sm:gap-3"
//                 >
//                   <div className="p-1.5 sm:p-2 bg-amber-100 rounded-lg shrink-0">
//                     <FiLock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-xs sm:text-sm font-medium text-amber-800 mb-0.5">
//                       Subscription Required
//                     </p>
//                     <p className="text-amber-700 text-[11px] sm:text-xs">
//                       Your existing resumes are locked. Please renew your
//                       subscription to edit or create new resumes.
//                     </p>
//                   </div>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => router.push("/choose-plan")}
//                     className="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap cursor-pointer"
//                   >
//                     Renew Now
//                   </motion.button>
//                 </motion.div>
//               )}

//             {/* Responsive Grid View */}
//             <div
//               className={`grid ${getResumeGridCols()} gap-3 sm:gap-4 md:gap-5 lg:gap-6`}
//             >
//               {filteredOldResumeData.length > 0 ? (
//                 filteredOldResumeData.map((item, index) => {
//                   const ComponentToRender = item.component;
//                   const isPlanExpired =
//                     usersCurrentPlan?.current_plan === "" &&
//                     usersCurrentPlan?.message;

//                   return (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: Math.min(index * 0.05, 0.5) }}
//                       whileHover={{ y: isPlanExpired ? 0 : -4 }}
//                       className={`relative group cursor-pointer ${isPlanExpired ? "opacity-75" : ""}`}
//                       style={{
//                         height: isMobile
//                           ? "clamp(240px, 45vw, 280px)"
//                           : "clamp(280px, 30vw, 340px)",
//                         overflow: "hidden",
//                         borderRadius: "16px",
//                         backgroundColor: "white",
//                         boxShadow: "0 4px 12px -4px rgba(0, 0, 0, 0.05)",
//                         transition: "all 0.3s ease",
//                         filter: isPlanExpired ? "grayscale(0.3)" : "none",
//                       }}
//                     >
//                       <div className="w-full h-full">
//                         <ComponentToRender alldata={item.resume_data} />
//                       </div>

//                       {/* Lock Overlay for Expired Plan */}
//                       {isPlanExpired && (
//                         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
//                           <motion.div
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             transition={{ type: "spring", stiffness: 300 }}
//                             className="text-center p-3"
//                           >
//                             <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
//                               <FiLock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
//                             </div>
//                             <p className="text-white text-xs sm:text-sm font-semibold mb-1">
//                               Subscription Expired
//                             </p>
//                             <p className="text-white/70 text-[10px] sm:text-xs mb-2 sm:mb-3">
//                               Renew to edit this resume
//                             </p>
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => router.push("/choose-plan")}
//                               className="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-500 text-white text-[10px] sm:text-xs font-medium rounded-lg hover:bg-amber-600 transition-colors"
//                             >
//                               Renew Plan
//                             </motion.button>
//                           </motion.div>
//                         </div>
//                       )}

//                       {/* Overlay with actions - Only show when plan is active */}
//                       {!isPlanExpired && (
//                         <motion.div
//                           className={`absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent ${!isMobile ? "opacity-0 group-hover:opacity-100" : ""} transition-all duration-300`}
//                           initial={{ opacity: 0 }}
//                           whileHover={{ opacity: isMobile ? 0 : 1 }}
//                         >
//                           <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//                             <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
//                               <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => {
//                                   setLocalStorage(
//                                     "chosenTemplate",
//                                     item.template,
//                                   );

//                                   setLocalStorage("editingResumeIdAndData", {
//                                     id: item.id,
//                                     resume_data: item.resume_data,
//                                   });
//                                   setSessionStorage(
//                                     "oldRouteNameDashboard",
//                                     true,
//                                   );
//                                   router.push(`/resume-details/contact`);

//                                   setIsUploadMode(false);
//                                 }}
//                                 className="bg-white rounded-full p-1.5 sm:p-2.5 hover:bg-purple-50 transition-all duration-300 shadow-lg cursor-pointer group/btn"
//                               >
//                                 <FiEdit2 className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 group-hover/btn:scale-110 transition-transform" />
//                               </motion.button>
//                               <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => handleDeleteResume(item.id)}
//                                 className="bg-white rounded-full p-1.5 sm:p-2.5 hover:bg-rose-50 transition-all duration-300 shadow-lg cursor-pointer group/btn"
//                               >
//                                 <FiTrash2 className="h-3 w-3 sm:h-4 sm:w-4 text-rose-600 group-hover/btn:scale-110 transition-transform" />
//                               </motion.button>
//                             </div>
//                             <p className="text-white text-[11px] sm:text-sm font-medium text-center truncate px-1 sm:px-2">
//                               {item.name || `Resume ${index + 1}`}
//                             </p>
//                             <p className="text-white/60 text-[10px] sm:text-xs text-center mt-0.5 sm:mt-1">
//                               Template: {item.template.id}
//                             </p>
//                           </div>
//                         </motion.div>
//                       )}

//                       {/* Mobile menu button - Only show when plan is active */}
//                       {isMobile && !isPlanExpired && (
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
//                                     handleDeleteResume(item.id);
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
//                       {usersCurrentPlan?.current_plan === null &&
//                       usersCurrentPlan?.message
//                         ? "Subscribe to a plan to create your first resume"
//                         : "Create your first resume to get started"}
//                     </p>
//                     <button
//                       onClick={() => router.push("/choose-template")}
//                       // disabled={usersCurrentPlan?.message}
//                       className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all text-xs sm:text-sm cursor-pointer ${
//                         usersCurrentPlan?.current_plan === "" &&
//                         usersCurrentPlan?.message
//                           ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                           : "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg"
//                       }`}
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
//                             ₹{totalAmountSpent?.toFixed(2) || "0.00"}
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
//                             {usersCurrentPlan?.current_plan || "Free"}
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
//                                       record.invoice_date,
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
//                                   {record.plan_name}
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
//                                     record.payment_status === "created"
//                                       ? "text-emerald-600 bg-emerald-50 border-emerald-200"
//                                       : "text-amber-600 bg-amber-50 border-amber-200"
//                                   }`}
//                                   animate={{
//                                     scale: hoveredRow === idx ? 1.05 : 1,
//                                   }}
//                                   transition={{ duration: 0.2 }}
//                                 >
//                                   {record?.payment_status === "created" && (
//                                     <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                                   )}
//                                   {record?.payment_status
//                                     .charAt(0)
//                                     .toUpperCase() +
//                                     record.payment_status.slice(1)}
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
// jagumyj@mailinator.com


































































































// "use client";

// // ============================================================
// // 1. IMPORTS - All the libraries and components we need
// // ============================================================

// import React, { useState, useEffect, useContext, useMemo } from "react";
// // useState - For managing local component state
// // useEffect - For side effects like API calls and event listeners
// // useContext - For accessing global context (CreateContext)
// // useMemo - For caching expensive calculations

// import { motion, AnimatePresence } from "framer-motion";
// // motion - For smooth animations
// // AnimatePresence - For animating components when they mount/unmount

// import {
//   FiFileText, FiPlus, FiMail, FiPhone, FiMapPin, 
//   FiCheckCircle, FiCreditCard, FiTrash2, FiLogOut,
//   FiAward, FiCalendar, FiX, FiAlertCircle, FiStar,
//   FiEdit2, FiDollarSign, FiShoppingBag, FiLock,
//   FiLayout
// } from "react-icons/fi";
// // Feather Icons - Clean, minimal icons

// import {
//   HiOutlineTemplate, HiOutlineBadgeCheck, HiOutlineReceiptRefund
// } from "react-icons/hi";
// // Heroicons - Another icon set

// import {
//   IoSparkles, IoEllipsisVertical, IoCheckmarkCircle
// } from "react-icons/io5";
// // Ionicons - Modern icons

// import { useRouter } from "next/navigation";
// // Next.js router - For navigation between pages

// import {
//   getLocalStorage,
//   removeLocalStorage,
//   setLocalStorage,
//   setSessionStorage,
// } from "@/app/utils";
// // Utility functions for browser storage (localStorage/sessionStorage)

// import { User } from "@/app/types/user.types";
// // TypeScript type for user data

// import {
//   MdOutlinePublishedWithChanges,
//   MdOutlineReceipt,
// } from "react-icons/md";
// // Material Design icons

// import ProtectedRoute from "@/app/utils/ProtectedRoute";
// // HOC that prevents access if user is not logged in

// import { API_URL } from "@/app/config/api";
// // Base URL for API calls

// import { templateData } from "@/app/data";
// // Static data about available resume templates

// import { CreateContext } from "@/app/context/CreateContext";
// // Context for sharing resume creation state

// import Swal from "sweetalert2";
// // Beautiful alert/confirmation dialogs

// import toast, { Toaster } from "react-hot-toast";
// // Toast notifications

// import api from "@/app/utils/api";
// // Configured axios instance with auth headers

// // ============================================================
// // 2. REACT QUERY - Data fetching library
// // ============================================================
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // useQuery - For fetching and caching data
// // useMutation - For creating/updating/deleting data
// // useQueryClient - For interacting with the cache

// // ============================================================
// // 3. TYPE DEFINITIONS - What our data looks like
// // ============================================================

// /**
//  * BillingRecord - Represents a single billing transaction
//  * Used in the billing history modal
//  */
// interface BillingRecord {
//   invoice_date: string;      // Date of the invoice
//   plan_name: string;         // Name of the plan (e.g., "Premium")
//   amount: number;            // Amount paid in INR
//   payment_status: "created" | "failed"; // Whether payment succeeded
// }

// /**
//  * usersCurrentPlan - User's current subscription plan
//  */
// interface usersCurrentPlan {
//   current_plan: string;      // Name of the current plan
//   message?: string;          // Optional message (e.g., "Subscription expired")
//   is_expired?: boolean;      // Whether the plan has expired
//   plan_details: {
//     billing_type: string | null; // One-time or recurring
//     days_remaining: string | null; // Days left in subscription
//     description: string;     // HTML description of features
//     discount_price: string;  // Any discount applied
//     duration_days: string | null; // How long the plan lasts
//     expires_at: string | null; // When the plan expires
//     plan_name: string;       // Name of the plan
//     price: string;           // Price in INR
//     purchased_at: string;    // When the plan was purchased
//     validity_type: string;   // e.g., "Lifetime", "Monthly"
//   };
// }

// /**
//  * ResumeItem - A resume with its component
//  * Used for rendering resume cards
//  */
// interface ResumeItem {
//   component: React.ComponentType<any>; // React component to render
//   templateId: string | number;        // ID of the template used
//   id: number;                         // Resume ID
//   resume_data: object;                // All resume data
//   resume_title: string;               // Title of the resume
//   template: {
//     id: number;
//     name: string;
//     thumbnail: string | null;
//     tier: string;                     // Free or Premium
//   };
//   updated_at: string;                 // Last updated date
//   [key: string]: any;                 // Allow additional properties
// }

// /**
//  * Resume - Data structure from API
//  */
// interface Resume {
//   id: number;
//   is_completed: boolean;              // Whether user finished it
//   last_completed_section: string;     // Last section user worked on
//   resume_data: object;
//   resume_title: string;
//   template: {
//     id: number;
//     name: string;
//     thumbnail: string | null;
//     tier: string;
//   };
//   updated_at: string;
// }

// // ============================================================
// // 4. API FUNCTIONS - Functions that call the backend
// // ============================================================

// /**
//  * fetchDashboardData - Gets all dashboard data in one API call
//  * This reduces multiple API calls to a single one
//  */
// const fetchDashboardData = async () => {
//   // Make API call using our configured axios instance
//   const response = await api.get("/dashboard");
//   // Return the data (profile, resumes, statistics, etc.)
//   return response.data;
// };

// /**
//  * deleteResumeApi - Deletes a resume by ID
//  * @param id - The ID of the resume to delete
//  */
// const deleteResumeApi = async (id: string) => {
//   // Send DELETE request to the API
//   await api.delete(`${API_URL}/user-resumes/${id}`);
//   // Return the ID so we can update the cache
//   return id;
// };

// // ============================================================
// // 5. RESUME CARD COMPONENT - Memoized for performance
// // ============================================================

// /**
//  * ResumeCard - Displays a single resume with edit/delete options
//  * Wrapped in React.memo to prevent unnecessary re-renders
//  */
// const ResumeCard = React.memo(({ 
//   item,                    // Resume data
//   index,                   // Position in the list
//   isMobile,               // Is the screen mobile size?
//   isPlanExpired,          // Is user's plan expired?
//   onEdit,                 // Function to call when editing
//   onDelete,               // Function to call when deleting
//   activeMenuId,           // Which menu is currently open
//   setActiveMenuId,       // Function to toggle menu
// }: any) => {
//   // Get the component that renders this resume template
//   const ComponentToRender = item.component;
  
//   // Next.js router for navigation
//   const router = useRouter();
  
//   // Context for resume creation mode

//   // ============================================================
//   // RENDER THE RESUME CARD
//   // ============================================================
//   return (
//     <motion.div
//       // Animation when the card first appears
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ delay: Math.min(index * 0.05, 0.5) }}
      
//       // Hover animation - lift slightly (unless plan expired)
//       whileHover={{ y: isPlanExpired ? 0 : -4 }}
      
//       // Dynamic classes based on plan status
//       className={`relative group cursor-pointer ${isPlanExpired ? "opacity-75" : ""}`}
      
//       // Dynamic styles based on screen size
//       style={{
//         height: isMobile
//           ? "clamp(240px, 45vw, 280px)"  // Mobile: smaller
//           : "clamp(280px, 30vw, 340px)", // Desktop: larger
//         overflow: "hidden",
//         borderRadius: "16px",
//         backgroundColor: "white",
//         boxShadow: "0 4px 12px -4px rgba(0, 0, 0, 0.05)",
//         transition: "all 0.3s ease",
//         filter: isPlanExpired ? "grayscale(0.3)" : "none", // Gray out if expired
//       }}
//     >
//       {/* Render the actual resume content */}
//       <div className="w-full h-full">
//         <ComponentToRender alldata={item.resume_data} />
//       </div>

//       {/* ============================================================
//           LOCK OVERLAY - Shown when plan is expired
//           ============================================================ */}
//       {isPlanExpired && (
//         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
//           <motion.div
//             // Pop-in animation
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 300 }}
//             className="text-center p-3"
//           >
//             {/* Lock icon */}
//             <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
//               <FiLock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
//             </div>
//             <p className="text-white text-xs sm:text-sm font-semibold mb-1">
//               Subscription Expired
//             </p>
//             <p className="text-white/70 text-[10px] sm:text-xs mb-2 sm:mb-3">
//               Renew to edit this resume
//             </p>
//             {/* Renew button */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => router.push("/choose-plan")}
//               className="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-500 text-white text-[10px] sm:text-xs font-medium rounded-lg hover:bg-amber-600 transition-colors"
//             >
//               Renew Plan
//             </motion.button>
//           </motion.div>
//         </div>
//       )}

//       {/* ============================================================
//           ACTION OVERLAY - Shown on hover (desktop) or tap (mobile)
//           ============================================================ */}
//       {!isPlanExpired && (
//         <motion.div
//           // On desktop: show on hover, on mobile: show always
//           className={`absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent ${!isMobile ? "opacity-0 group-hover:opacity-100" : ""} transition-all duration-300`}
//           initial={{ opacity: 0 }}
//           whileHover={{ opacity: isMobile ? 0 : 1 }}
//         >
//           <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//             {/* Action buttons: Edit and Delete */}
//             <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
//               {/* Edit button */}
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => onEdit(item)}
//                 className="bg-white rounded-full p-1.5 sm:p-2.5 hover:bg-purple-50 transition-all duration-300 shadow-lg cursor-pointer group/btn"
//               >
//                 <FiEdit2 className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 group-hover/btn:scale-110 transition-transform" />
//               </motion.button>
              
//               {/* Delete button */}
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => onDelete(item.id)}
//                 className="bg-white rounded-full p-1.5 sm:p-2.5 hover:bg-rose-50 transition-all duration-300 shadow-lg cursor-pointer group/btn"
//               >
//                 <FiTrash2 className="h-3 w-3 sm:h-4 sm:w-4 text-rose-600 group-hover/btn:scale-110 transition-transform" />
//               </motion.button>
//             </div>
            
//             {/* Resume title */}
//             <p className="text-white text-[11px] sm:text-sm font-medium text-center truncate px-1 sm:px-2">
//               {item.resume_title || `Resume ${index + 1}`}
//             </p>
            
//             {/* Template info */}
//             <p className="text-white/60 text-[10px] sm:text-xs text-center mt-0.5 sm:mt-1">
//               Template: {item.template?.id || "N/A"}
//             </p>
//           </div>
//         </motion.div>
//       )}

//       {/* ============================================================
//           MOBILE MENU - Three dots menu for mobile
//           ============================================================ */}
//       {isMobile && !isPlanExpired && (
//         <>
//           {/* Menu toggle button */}
//           <button
//             onClick={() =>
//               setActiveMenuId(
//                 activeMenuId === item.id ? null : item.id, // Toggle menu
//               )
//             }
//             className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow-md z-10 hover:bg-gray-50 transition"
//           >
//             <IoEllipsisVertical className="w-4 h-4 text-gray-700" />
//           </button>
          
//           {/* Dropdown menu (shown when active) */}
//           {activeMenuId === item.id && (
//             <>
//               {/* Backdrop to close menu on outside click */}
//               <div
//                 className="fixed inset-0 z-10"
//                 onClick={() => setActiveMenuId(null)}
//               />
//               {/* Menu items */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="absolute right-2 top-12 z-20 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5"
//               >
//                 {/* Edit option */}
//                 <button
//                   onClick={() => {
//                     onEdit(item);
//                     setActiveMenuId(null);
//                   }}
//                   className="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors flex items-center gap-2"
//                 >
//                   <FiEdit2 className="w-3.5 h-3.5" /> Edit
//                 </button>
//                 {/* Delete option */}
//                 <button
//                   onClick={() => {
//                     onDelete(item.id);
//                     setActiveMenuId(null);
//                   }}
//                   className="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors flex items-center gap-2"
//                 >
//                   <FiTrash2 className="w-3.5 h-3.5" /> Delete
//                 </button>
//               </motion.div>
//             </>
//           )}
//         </>
//       )}
//     </motion.div>
//   );
// });

// // Set display name for React DevTools debugging
// ResumeCard.displayName = "ResumeCard";

// // ============================================================
// // 6. MAIN DASHBOARD COMPONENT
// // ============================================================

// const DashboardPage = () => {
//   // ============================================================
//   // 6a. HOOKS AND CONTEXT
//   // ============================================================
  
//   const router = useRouter(); // Navigation
//   const queryClient = useQueryClient(); // React Query cache controller
//   const { setIsUploadMode } = useContext(CreateContext); // Context

//   // ============================================================
//   // 6b. LOCAL STATE
//   // ============================================================
  
//   const [showBillingHistory, setShowBillingHistory] = useState(false);
//   // Show/hide billing modal
  
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   // Show/hide logout confirmation
  
//   const [isMobile, setIsMobile] = useState(false);
//   // Is screen mobile size? (< 640px)
  
//   const [isTablet, setIsTablet] = useState(false);
//   // Is screen tablet size? (640px - 1024px)
  
//   const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
//   // Which resume menu is currently open (for mobile)
  
//   const [hoveredRow, setHoveredRow] = useState<number | null>(null);
//   // Which billing row is being hovered (for animation)

//   // ============================================================
//   // 6c. GET USER ID FROM LOCAL STORAGE
//   // ============================================================
  
//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;
//   // Used to scope queries to the current user

//   // ============================================================
//   // 6d. RESPONSIVE DETECTION
//   // ============================================================
  
//   useEffect(() => {
//     /**
//      * handleResize - Detects screen size changes
//      * Updates isMobile and isTablet states
//      */
//     const handleResize = () => {
//       const width = window.innerWidth;
//       setIsMobile(width < 640); // Mobile: < 640px
//       setIsTablet(width >= 640 && width < 1024); // Tablet: 640-1024px
//     };
    
//     // Check on initial load
//     handleResize();
    
//     // Add event listener for window resize
//     window.addEventListener("resize", handleResize);
    
//     // Cleanup: remove event listener
//     return () => window.removeEventListener("resize", handleResize);
//   }, []); // Empty deps = run once on mount

//   // ============================================================
//   // 6e. REACT QUERY - FETCH DATA WITH CACHING
//   // ============================================================
  
//   /**
//    * useQuery - Fetches and caches dashboard data
//    * 
//    * How it works:
//    * 1. First visit: Fetches from API (takes 5-7s)
//    * 2. Caches the data in memory
//    * 3. Second visit: Returns cached data instantly (< 500ms)
//    * 4. Background refresh: Updates data if it's "stale"
//    * 
//    * Benefits:
//    * - Automatic caching
//    * - Background updates
//    * - Built-in loading/error states
//    * - No manual state management
//    */
//   const { 
//     data,        // The fetched data
//     isLoading,   // Boolean: currently loading?
//     error,       // Error object if something went wrong
//     refetch      // Function to manually refetch
//   } = useQuery({
//     // 🔑 Unique key for this query (used for caching)
//     queryKey: ['dashboard', userId],
    
//     // 📡 Function that fetches the data
//     queryFn: fetchDashboardData,
    
//     // ⏰ Data is considered "fresh" for 5 minutes
//     // During this time, it won't refetch automatically
//     staleTime: 5 * 60 * 1000, // 5 minutes in milliseconds
    
//     // 🗑️ Data stays in cache for 10 minutes
//     // After 10 minutes of not being used, it gets garbage collected
//     gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime in v4)
    
//     // 🔄 Don't refetch when user switches tabs
//     refetchOnWindowFocus: false,
    
//     // 🔄 Don't refetch when component mounts
//     refetchOnMount: false,
    
//     // ✅ Only run this query if we have a userId
//     enabled: !!userId,
//   });

//   // ============================================================
//   // 6f. MEMOIZED DATA PROCESSING
//   // ============================================================
  
//   /**
//    * processedData - Memoized version of the data
//    * 
//    * Why useMemo?
//    * - Prevents re-processing data on every render
//    * - Only re-processes when the source data changes
//    * - Saves CPU cycles
//    */
//   const processedData = useMemo(() => {
//     // If no data, return null
//     if (!data) return null;
    
//     // Destructure the data
//     const { profile, resumes, statistics, subscription, transactions } = data;
    
//     /**
//      * Process resumes: Match each resume with its template component
//      * 
//      * How it works:
//      * 1. For each resume, find the matching template
//      * 2. If found, add the template's component
//      * 3. If not found, skip the resume
//      */
//     const filteredResumes = resumes?.flatMap((resume: Resume) => {
//       // Find the template that matches this resume
//       const templateMatch = templateData.find(
//         (t) => t?.id === resume.template?.id
//       );
//       // If template found, add component to the resume
//       return templateMatch
//         ? [{ ...resume, component: templateMatch.component }]
//         : [];
//     }) || [];

//     // Return the processed data
//     return {
//       profile,                      // User profile data
//       subscription,                 // Plan/subscription data
//       paymentRecords: transactions, // Billing history
//       statsData: statistics,        // Statistics (resume count, etc.)
//       filteredOldResumeData: filteredResumes, // Resumes with components
//     };
//   }, [data]); // Only re-process when data changes

//   // ============================================================
//   // 6g. REACT QUERY - DELETE MUTATION WITH OPTIMISTIC UPDATE
//   // ============================================================
  
//   /**
//    * useMutation - Handles deleting a resume
//    * 
//    * OPTIMISTIC UPDATE: 
//    * - Removes resume from UI immediately (before API call)
//    * - If API fails, rolls back to previous state
//    * - User sees instant feedback
//    */
//   const deleteMutation = useMutation({
//     // 📡 Function that performs the delete
//     mutationFn: deleteResumeApi,
    
//     /**
//      * onMutate - Runs before the API call
//      * This is where we do the optimistic update
//      */
//     onMutate: async (deletedId) => {
//       // 🛑 Cancel any ongoing queries to prevent conflicts
//       await queryClient.cancelQueries({ queryKey: ['dashboard', userId] });
      
//       // 💾 Save current data in case we need to rollback
//       const previousData = queryClient.getQueryData(['dashboard', userId]);
      
//       // ✨ OPTIMISTICALLY UPDATE: Remove the resume from cache
//       queryClient.setQueryData(['dashboard', userId], (old: any) => {
//         if (!old) return old;
//         return {
//           ...old,
//           resumes: old.resumes.filter((r: any) => r.id !== deletedId),
//         };
//       });
      
//       // Return context with previous data for rollback
//       return { previousData };
//     },
    
//     /**
//      * onError - Runs if the mutation fails
//      * Rolls back to the previous data
//      */
//     onError: (error, variables, context) => {
//       // 🔄 Rollback: Restore previous data from cache
//       queryClient.setQueryData(['dashboard', userId], context?.previousData);
//       // Show error toast
//       toast.error("Failed to delete resume. Please try again.");
//     },
    
//     /**
//      * onSuccess - Runs if the mutation succeeds
//      * Shows success notification
//      */
//     onSuccess: () => {
//       // Show success toast with animation
//       toast.custom(
//         (t) => (
//           <motion.div
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 100 }}
//             className="max-w-md w-full bg-white shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 mx-4 sm:mx-0"
//           >
//             <div className="flex-1 w-0 p-3 sm:p-4">
//               <div className="flex items-start">
//                 <div className="flex-shrink-0 pt-0.5">
//                   <div className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-100 rounded-full flex items-center justify-center">
//                     <IoCheckmarkCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
//                   </div>
//                 </div>
//                 <div className="ml-3 flex-1">
//                   <p className="text-xs sm:text-sm font-medium text-gray-900">
//                     Resume Deleted!
//                   </p>
//                   <p className="text-xs sm:text-sm text-gray-500">
//                     Your resume has been successfully removed.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex border-l border-gray-200">
//               <button
//                 onClick={() => toast.dismiss(t.id)}
//                 className="w-full border border-transparent rounded-none rounded-r-lg p-3 sm:p-4 flex items-center justify-center text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-all duration-200"
//               >
//                 Close
//               </button>
//             </div>
//           </motion.div>
//         ),
//         { duration: 4000 }
//       );
//     },
//   });

//   // ============================================================
//   // 6h. EVENT HANDLERS
//   // ============================================================
  
//   /**
//    * handleDeleteResume - Shows confirmation dialog, then deletes
//    * @param id - The ID of the resume to delete
//    */
//   const handleDeleteResume = async (id: string) => {
//     // Show SweetAlert2 confirmation dialog
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
//           <p class="font-semibold text-gray-900 text-sm sm:text-base"> this resume?</p>
//           <p class="text-xs sm:text-sm text-gray-500 mt-3">This action cannot be undone.</p>
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText: '<span class="flex items-center gap-2 text-xs sm:text-sm"><svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Yes, delete it!</span>',
//       cancelButtonText: '<span class="text-xs sm:text-sm">Cancel</span>',
//       reverseButtons: true,
//       customClass: {
//         popup: "rounded-xl sm:rounded-2xl",
//         confirmButton: "rounded-lg px-4 py-2 sm:px-5 sm:py-2.5 transition-all duration-200",
//         cancelButton: "rounded-lg px-4 py-2 sm:px-5 sm:py-2.5 transition-all duration-200",
//       },
//     });

//     // If user confirmed, trigger the mutation
//     if (result.isConfirmed) {
//       deleteMutation.mutate(id);
//     }
//   };

//   /**
//    * handleEditResume - Navigates to resume editor
//    * @param item - The resume item to edit
//    */
//   const handleEditResume = (item: ResumeItem) => {
//     // Save selected template to localStorage
//     setLocalStorage("chosenTemplate", item.template);
    
//     // Save resume data and ID for editing
//     setLocalStorage("editingResumeIdAndData", {
//       id: item.id,
//       resume_data: item.resume_data,
//     });
    
//     // Remember that we came from the dashboard
//     setSessionStorage("oldRouteNameDashboard", true);
    
//     // Navigate to the resume editor
//     router.push(`/resume-details/contact`);
    
//     // Set upload mode to false (we're editing, not uploading)
//     setIsUploadMode(false);
//   };

//   /**
//    * handleLogout - Logs the user out
//    * Clears all local storage and redirects to login
//    */
//   const handleLogout = () => {
//     // Remove all user data from localStorage
//     removeLocalStorage("user_details");
//     removeLocalStorage("fullResumeData");
//     removeLocalStorage("chosenTemplate");
//     removeLocalStorage("access_token");
//     removeLocalStorage("refresh_token");
//     removeLocalStorage("user_token");
//     removeLocalStorage("coverLetterData");
//     removeLocalStorage("editingResumeIdAndData");
    
//     // Redirect to login page
//     router.push("/login");
//   };

//   // ============================================================
//   // 6i. SIDE EFFECTS
//   // ============================================================
  
//   /**
//    * useEffect - Prevents body scroll when billing modal is open
//    * This improves UX by keeping the background fixed
//    */
//   useEffect(() => {
//     document.body.style.overflow = showBillingHistory ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [showBillingHistory]); // Re-run when showBillingHistory changes

//   // ============================================================
//   // 6j. COMPUTED VALUES
//   // ============================================================
  
//   // Destructure the processed data
//   const { 
//     profile,                  // User profile
//     subscription,            // Current plan
//     paymentRecords,          // Billing history
//     statsData,              // Statistics
//     filteredOldResumeData,   // Resumes with components
//   } = processedData || {};

//   // Count total resumes
//   const totalResumes = filteredOldResumeData?.length || 0;
  
//   // Count total transactions
//   const totalTransactions = paymentRecords?.length || 0;
  
//   // Calculate total amount spent (only for successful payments)
//   const totalAmountSpent = paymentRecords?.reduce(
//     (sum: number, record: BillingRecord) =>
//       record.payment_status === "created" ? sum + Number(record.amount) : sum,
//     0,
//   ) || 0;

//   /**
//    * getResumeGridCols - Returns the grid column classes based on screen size
//    */
//   const getResumeGridCols = () => {
//     if (isMobile) return "grid-cols-1";         // 1 column on mobile
//     if (isTablet) return "grid-cols-2";         // 2 columns on tablet
//     return "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"; // 3-4 columns on desktop
//   };

//   /**
//    * isPlanExpired - Whether the user's plan has expired
//    */
//   const isPlanExpired = subscription?.current_plan === "" && subscription?.message;

//   // ============================================================
//   // 6k. LOADING STATE
//   // ============================================================
  
//   /**
//    * Show loading spinner while data is being fetched
//    * This is the first state the user sees
//    */
//   if (isLoading) {
//     return (
//       <ProtectedRoute>
//         <Toaster position="top-right" />
//         <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-indigo-50/20 flex items-center justify-center">
//           <div className="text-center">
//             <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading your dashboard...</p>
//           </div>
//         </div>
//       </ProtectedRoute>
//     );
//   }

//   // ============================================================
//   // 6l. ERROR STATE
//   // ============================================================
  
//   /**
//    * Show error message if data fetch fails
//    * Includes a "Retry" button to try again
//    */
//   if (error) {
//     return (
//       <ProtectedRoute>
//         <Toaster position="top-right" />
//         <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-indigo-50/20 flex items-center justify-center">
//           <div className="text-center">
//             <p className="text-red-600 text-xl mb-4">⚠️ Failed to load dashboard</p>
//             <button 
//               onClick={() => refetch()} 
//               className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </ProtectedRoute>
//     );
//   }

//   // ============================================================
//   // 6m. MAIN RENDER - THE DASHBOARD UI
//   // ============================================================
  
//   return (
//     <ProtectedRoute>
//       {/* Toast notifications container */}
//       <Toaster position="top-right" />

//       {/* Main dashboard container */}
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-indigo-50/20">
//         <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-5 lg:px-6 py-4 sm:py-6 lg:py-8">
          
//           {/* ============================================================
//               SECTION: HEADER
//               ============================================================ */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mb-6 sm:mb-8"
//           >
//             {/* "DASHBOARD" badge */}
//             <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-500/10 rounded-full text-indigo-600 text-[10px] sm:text-xs font-semibold mb-3 sm:mb-4 border border-indigo-200/30">
//               <motion.div
//                 animate={{ rotate: [0, 10, -10, 0] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               >
//                 <IoSparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//               </motion.div>
//               <span>DASHBOARD</span>
//             </div>
            
//             {/* Welcome message and Create Resume button */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
//               <div>
//                 <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
//                   Welcome back,{" "}
//                   <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
//                     {profile?.first_name} {profile?.last_name}
//                   </span>
//                 </h1>
//                 <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">
//                   Manage your resumes, track performance, and land your dream job
//                 </p>
//               </div>
              
//               {/* "Create New Resume" button */}
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

//           {/* ============================================================
//               SECTION: STATS CARDS
//               ============================================================ */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//             {[
//               {
//                 label: "Resumes Created",
//                 value: statsData?.total_resumes_created || 0,
//                 icon: FiFileText,
//                 color: "purple",
//                 delay: 0,
//               },
//               {
//                 label: "Available Templates",
//                 value: templateData.length,
//                 icon: FiLayout,
//                 color: "green",
//                 delay: 0.1,
//               },
//               {
//                 label: "Current Plan",
//                 value: subscription?.current_plan || "no plan",
//                 icon: FiStar,
//                 color: "amber",
//                 delay: 0.2,
//               },
//             ].map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: stat.delay, duration: 0.4 }}
//                 className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs text-gray-500">{stat.label}</p>
//                     <p className={`md:text-lg lg:text-2xl font-bold text-${stat.color}-600`}>
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

//           {/* ============================================================
//               SECTION: PROFILE AND PLAN
//               ============================================================ */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            
//             {/* PROFILE CARD */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//               className="lg:col-span-1 order-2 lg:order-1"
//             >
//               <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-indigo-100 overflow-hidden hover:shadow-md transition-all duration-300 group">
//                 {/* Gradient header */}
//                 <div className="relative h-20 sm:h-24 bg-gradient-to-br from-indigo-700 to-purple-500">
//                   <motion.div
//                     className="absolute -bottom-8 sm:-bottom-10 left-4 sm:left-6"
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ duration: 0.2 }}
//                   ></motion.div>
//                 </div>
                
//                 {/* Profile content */}
//                 <div className="p-4 sm:p-5 md:p-6 pt-10 sm:pt-12">
//                   {/* User name */}
//                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 truncate">
//                     {profile?.first_name} {profile?.last_name}
//                   </h3>
                  
//                   {/* Contact details */}
//                   <div className="space-y-2 sm:space-y-3">
//                     {[
//                       {
//                         icon: FiMail,
//                         label: "Email",
//                         value: profile?.email || "",
//                         color: "blue",
//                       },
//                       {
//                         icon: FiPhone,
//                         label: "Phone",
//                         value: profile?.phone || "",
//                         color: "emerald",
//                       },
//                       {
//                         icon: FiMapPin,
//                         label: "Location",
//                         value: profile?.city || "",
//                         color: "purple",
//                       },
//                     ].map((item, idx) => (
//                       <motion.div
//                         key={idx}
//                         whileHover={{ x: 3 }}
//                         transition={{ duration: 0.2 }}
//                         className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer"
//                       >
//                         <div className={`p-1.5 sm:p-2 bg-${item.color}-50 rounded-lg`}>
//                           <item.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-${item.color}-600`} />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-[10px] sm:text-xs text-gray-500">{item.label}</p>
//                           <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
//                             {item.value}
//                           </p>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
                  
//                   {/* Logout button */}
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

//             {/* PLAN CARD */}
//             {subscription ? (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="lg:col-span-2 order-1 lg:order-2"
//               >
//                 <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-indigo-100 overflow-hidden hover:shadow-md transition-all duration-300">
                  
//                   {/* CASE 1: EXPIRED PLAN */}
//                   {subscription.current_plan === "" &&
//                   subscription.message &&
//                   subscription.is_expired === true ? (
//                     <>
//                       {/* Expired banner */}
//                       <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 sm:p-6">
//                         <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
//                           <div>
//                             <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
//                               <motion.span
//                                 className="px-1.5 sm:px-2 py-0.5 bg-red-500/20 text-red-100 text-[10px] sm:text-xs font-semibold rounded-full"
//                                 animate={{ scale: [1, 1.05, 1] }}
//                                 transition={{ duration: 2, repeat: Infinity }}
//                               >
//                                 EXPIRED
//                               </motion.span>
//                               <FiAlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200" />
//                             </div>
//                             <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1">
//                               Subscription Expired
//                             </h3>
//                             <p className="text-amber-100 text-xs sm:text-sm">
//                               {subscription.message}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* Expired plan actions */}
//                       <div className="p-4 sm:p-6">
//                         <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-amber-50 rounded-lg sm:rounded-xl border border-amber-100">
//                           <div className="flex items-start gap-2 sm:gap-3">
//                             <div className="p-1.5 sm:p-2 bg-amber-100 rounded-lg shrink-0">
//                               <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
//                             </div>
//                             <div>
//                               <h4 className="text-xs sm:text-sm font-semibold text-amber-800 mb-1">
//                                 Your subscription has expired
//                               </h4>
//                               <p className="text-amber-700 text-[11px] sm:text-xs">
//                                 To continue accessing premium features and templates, please subscribe to a new plan.
//                               </p>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
//                           <motion.button
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             onClick={() => router.push("/choose-plan")}
//                             className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-600 text-white font-medium rounded-lg sm:rounded-xl hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer text-xs sm:text-sm"
//                           >
//                             <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.3 }}>
//                               <MdOutlinePublishedWithChanges className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                             </motion.div>
//                             Subscribe Now
//                           </motion.button>
//                           {paymentRecords && paymentRecords?.length > 0 && (
//                             <motion.button
//                               whileHover={{ scale: 1.02 }}
//                               whileTap={{ scale: 0.98 }}
//                               onClick={() => setShowBillingHistory(true)}
//                               className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-50 text-indigo-600 font-medium rounded-lg sm:rounded-xl hover:bg-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
//                             >
//                               <FiCreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                               Billing History
//                             </motion.button>
//                           )}
//                         </div>
//                       </div>
//                     </>
//                   ) : subscription.current_plan ? (
//                     // CASE 2: ACTIVE PLAN
//                     <>
//                       {/* Active plan banner */}
//                       <div className="bg-gradient-to-r from-indigo-600 to-purple-500 p-4 sm:p-6">
//                         <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
//                           <div>
//                             <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
//                               <motion.span
//                                 className="px-1.5 sm:px-2 py-0.5 bg-white/20 text-white text-[10px] sm:text-xs font-semibold rounded-full"
//                                 animate={{ scale: [1, 1.05, 1] }}
//                                 transition={{ duration: 2, repeat: Infinity }}
//                               >
//                                 ACTIVE
//                               </motion.span>
//                               <HiOutlineBadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-200" />
//                             </div>
//                             <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1">
//                               {subscription?.current_plan} Plan
//                             </h3>
//                             <p className="text-indigo-100 text-xs sm:text-sm">
//                               Your current subscription
//                             </p>
//                           </div>
//                           <div className="text-left sm:text-right">
//                             <p className="text-2xl sm:text-3xl font-bold text-white">
//                               ₹{subscription?.plan_details?.price || "0"}
//                             </p>
//                             <p className="text-indigo-100 text-[10px] sm:text-xs mt-0.5 sm:mt-1">
//                               per{" "}
//                               {subscription?.current_plan === "Premium"
//                                 ? "Lifetime"
//                                 : subscription?.current_plan === "Pro Plus"
//                                 ? "3 months"
//                                 : "month"}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* Plan features */}
//                       <div className="p-4 sm:p-6">
//                         <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
//                           <FiAward className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" /> Plan Features
//                         </h4>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
//                           {subscription?.plan_details?.description &&
//                             (() => {
//                               // Parse HTML description to extract feature list
//                               const parser = new DOMParser();
//                               const doc = parser.parseFromString(
//                                 subscription.plan_details.description,
//                                 "text/html"
//                               );
//                               const features = Array.from(
//                                 doc.querySelectorAll("li")
//                               ).map((li) => li.textContent?.trim() || "");
//                               return features.map((feature, idx) => (
//                                 <motion.div
//                                   key={idx}
//                                   initial={{ opacity: 0, x: -10 }}
//                                   animate={{ opacity: 1, x: 0 }}
//                                   transition={{ delay: idx * 0.05 }}
//                                   className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-700"
//                                 >
//                                   <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 mt-0.5 shrink-0" />
//                                   <span className="line-clamp-2">{feature}</span>
//                                 </motion.div>
//                               ));
//                             })()}
//                         </div>

//                         {/* Subscription dates */}
//                         {(subscription?.plan_details?.purchased_at ||
//                           subscription?.current_plan === "Premium") && (
//                           <motion.div
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.2 }}
//                             className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-indigo-50/30 rounded-lg sm:rounded-xl border border-gray-100"
//                           >
//                             <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
//                               <FiCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
//                               Subscription Info
//                             </h4>
//                             <div className="space-y-2 sm:space-y-2.5">
//                               {/* Purchase date */}
//                               {subscription?.plan_details.purchased_at && (
//                                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs sm:text-sm">
//                                   <span className="text-gray-600 flex items-center gap-1.5">
//                                     <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
//                                     Purchase Date:
//                                   </span>
//                                   <span className="font-medium text-gray-800">
//                                     {new Date(
//                                       subscription.plan_details.purchased_at
//                                     ).toLocaleDateString("en-IN", {
//                                       day: "numeric",
//                                       month: "long",
//                                       year: "numeric",
//                                     })}
//                                   </span>
//                                 </div>
//                               )}

//                               {/* Validity / Expiry */}
//                               {subscription?.current_plan === "Premium" ? (
//                                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs sm:text-sm">
//                                   <span className="text-gray-600 flex items-center gap-1.5">
//                                     <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
//                                     Validity:
//                                   </span>
//                                   <span className="font-medium bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-1.5">
//                                     <FiAward className="w-3.5 h-3.5 text-purple-500" />
//                                     Lifetime Access
//                                   </span>
//                                 </div>
//                               ) : (
//                                 subscription?.plan_details.expires_at && (
//                                   <>
//                                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs sm:text-sm">
//                                       <span className="text-gray-600 flex items-center gap-1.5">
//                                         <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
//                                         Expiry Date:
//                                       </span>
//                                       <span
//                                         className={`font-medium ${
//                                           new Date(subscription.plan_details.expires_at) < new Date()
//                                             ? "text-red-600"
//                                             : "text-gray-800"
//                                         }`}
//                                       >
//                                         {new Date(
//                                           subscription.plan_details.expires_at
//                                         ).toLocaleDateString("en-IN", {
//                                           day: "numeric",
//                                           month: "long",
//                                           year: "numeric",
//                                         })}
//                                         {new Date(
//                                           subscription.plan_details.expires_at
//                                         ) < new Date() && (
//                                           <span className="ml-2 text-red-500 text-[10px] sm:text-xs font-semibold">
//                                             (Expired)
//                                           </span>
//                                         )}
//                                       </span>
//                                     </div>

//                                     {/* Days remaining */}
//                                     {new Date(
//                                       subscription.plan_details.expires_at
//                                     ) > new Date() && (
//                                       <div className="mt-2 pt-2 border-t border-gray-100">
//                                         <div className="flex items-center justify-between text-xs">
//                                           <span className="text-gray-600">Days remaining:</span>
//                                           <span className="font-semibold text-indigo-600">
//                                             {Math.ceil(
//                                               (new Date(
//                                                 subscription.plan_details.expires_at
//                                               ).getTime() -
//                                                 new Date().getTime()) /
//                                                 (1000 * 60 * 60 * 24)
//                                             )}{" "}
//                                             days
//                                           </span>
//                                         </div>
//                                       </div>
//                                     )}
//                                   </>
//                                 )
//                               )}
//                             </div>
//                           </motion.div>
//                         )}

//                         {/* Action buttons */}
//                         <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
//                           <motion.button
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             onClick={() => router.push("/choose-plan")}
//                             className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-600 text-white font-medium rounded-lg sm:rounded-xl hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer text-xs sm:text-sm"
//                           >
//                             <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.3 }}>
//                               <MdOutlinePublishedWithChanges className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                             </motion.div>
//                             Upgrade Plan
//                           </motion.button>
//                           <motion.button
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             onClick={() => setShowBillingHistory(true)}
//                             className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-50 text-indigo-600 font-medium rounded-lg sm:rounded-xl hover:bg-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
//                           >
//                             <FiCreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                             Billing History
//                           </motion.button>
//                         </div>
//                       </div>
//                     </>
//                   ) : null}
//                 </div>
//               </motion.div>
//             ) : (
//               // CASE 3: NO PLAN
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
//                       className="px-5 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white font-medium rounded-lg sm:rounded-xl hover:bg-indigo-700 transition-all duration-300 cursor-pointer text-xs sm:text-sm"
//                     >
//                       Choose a Plan
//                     </motion.button>
//                     {paymentRecords && paymentRecords?.length > 0 && (
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => setShowBillingHistory(true)}
//                         className="px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-50 text-indigo-600 font-medium rounded-lg sm:rounded-xl hover:bg-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
//                       >
//                         <FiCreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         Billing History
//                       </motion.button>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </div>

//           {/* ============================================================
//               SECTION: RESUMES GRID
//               ============================================================ */}
//           <div>
//             {/* Resume section header */}
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
//               <div>
//                 <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-1.5 sm:gap-2">
//                   <FiFileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" /> Your Resumes
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

//             {/* Lock message for expired plan */}
//             {isPlanExpired && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mb-4 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg sm:rounded-xl flex items-start gap-2 sm:gap-3"
//               >
//                 <div className="p-1.5 sm:p-2 bg-amber-100 rounded-lg shrink-0">
//                   <FiLock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-xs sm:text-sm font-medium text-amber-800 mb-0.5">
//                     Subscription Required
//                   </p>
//                   <p className="text-amber-700 text-[11px] sm:text-xs">
//                     Your existing resumes are locked. Please renew your subscription to edit or create new resumes.
//                   </p>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => router.push("/choose-plan")}
//                   className="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap cursor-pointer"
//                 >
//                   Renew Now
//                 </motion.button>
//               </motion.div>
//             )}

//             {/* Resume grid */}
//             <div className={`grid ${getResumeGridCols()} gap-3 sm:gap-4 md:gap-5 lg:gap-6`}>
//               {filteredOldResumeData?.length > 0 ? (
//                 // Show resumes if there are any
//                 filteredOldResumeData.map((item: ResumeItem, index: number) => (
//                   <ResumeCard
//                     key={item.id || index}
//                     item={item}
//                     index={index}
//                     isMobile={isMobile}
//                     isPlanExpired={isPlanExpired}
//                     onEdit={handleEditResume}
//                     onDelete={handleDeleteResume}
//                     activeMenuId={activeMenuId}
//                     setActiveMenuId={setActiveMenuId}
//                   />
//                 ))
//               ) : (
//                 // Show "No Resumes" message if none exist
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
//                       {isPlanExpired
//                         ? "Subscribe to a plan to create your first resume"
//                         : "Create your first resume to get started"}
//                     </p>
//                     <button
//                       onClick={() => router.push("/choose-template")}
//                       className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all text-xs sm:text-sm cursor-pointer ${
//                         isPlanExpired
//                           ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                           : "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg"
//                       }`}
//                       disabled={isPlanExpired}
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

//       {/* ============================================================
//           MODALS
//           ============================================================ */}

//       {/* BILLING HISTORY MODAL */}
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
//               {/* Modal header */}
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

//               {/* Scrollable content */}
//               <div className="flex-1 overflow-y-auto">
//                 {/* Summary cards */}
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
//                           <p className="text-[10px] sm:text-xs text-gray-500">Total Transactions</p>
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
//                           <p className="text-[10px] sm:text-xs text-gray-500">Total Spent</p>
//                           <p className="text-base sm:text-xl lg:text-2xl font-bold text-emerald-600">
//                             ₹{totalAmountSpent?.toFixed(2) || "0.00"}
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
//                           <p className="text-[10px] sm:text-xs text-gray-500">Current Plan</p>
//                           <p className="text-sm sm:text-base lg:text-xl font-bold text-indigo-600 truncate">
//                             {subscription?.current_plan || "Free"}
//                           </p>
//                         </div>
//                         <div className="w-7 h-7 sm:w-8 sm:h-10 bg-purple-50 rounded-lg sm:rounded-xl flex items-center justify-center">
//                           <HiOutlineBadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-5 text-purple-600" />
//                         </div>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </div>

//                 {/* Billing table */}
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
//                           {paymentRecords.map((record: BillingRecord, idx: number) => (
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
//                                     animate={{ rotate: hoveredRow === idx ? 360 : 0 }}
//                                     transition={{ duration: 0.3 }}
//                                   >
//                                     <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-400" />
//                                   </motion.div>
//                                   <span className="text-[11px] sm:text-sm text-gray-700">
//                                     {new Date(record.invoice_date).toLocaleDateString("en-US", {
//                                       year: "numeric",
//                                       month: "short",
//                                       day: "numeric",
//                                     })}
//                                   </span>
//                                 </div>
//                               </td>
//                               <td className="px-2 sm:px-4 py-2 sm:py-3">
//                                 <span className="text-[11px] sm:text-sm font-semibold text-gray-800">
//                                   {record.plan_name}
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
//                                     record.payment_status === "created"
//                                       ? "text-emerald-600 bg-emerald-50 border-emerald-200"
//                                       : "text-amber-600 bg-amber-50 border-amber-200"
//                                   }`}
//                                   animate={{ scale: hoveredRow === idx ? 1.05 : 1 }}
//                                   transition={{ duration: 0.2 }}
//                                 >
//                                   {record?.payment_status === "created" && (
//                                     <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                                   )}
//                                   {record?.payment_status.charAt(0).toUpperCase() +
//                                     record.payment_status.slice(1)}
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

//       {/* LOGOUT CONFIRMATION MODAL */}
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

// ============================================================
// IMPORTS
// ============================================================
import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFileText, FiPlus, FiMail, FiPhone, FiMapPin,
  FiCheckCircle, FiCreditCard, FiTrash2, FiLogOut,
  FiAward, FiCalendar, FiX, FiAlertCircle, FiStar,
  FiEdit2, FiDollarSign, FiShoppingBag, FiLock,
  FiLayout, FiEye, FiChevronRight, FiZap, FiArrowRight
} from "react-icons/fi";
import { HiOutlineTemplate, HiOutlineBadgeCheck, HiOutlineReceiptRefund } from "react-icons/hi";
import { IoSparkles, IoEllipsisVertical, IoCheckmarkCircle } from "react-icons/io5";
import { MdOutlinePublishedWithChanges, MdOutlineReceipt } from "react-icons/md";
import { useRouter } from "next/navigation";
import {
  getLocalStorage, removeLocalStorage, setLocalStorage, setSessionStorage,
} from "@/app/utils";
import { User } from "@/app/types/user.types";
import ProtectedRoute from "@/app/utils/ProtectedRoute";
import { API_URL } from "@/app/config/api";
import { templateData } from "@/app/data";
import { CreateContext } from "@/app/context/CreateContext";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import api from "@/app/utils/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ViewResumeModal from "./ViewResumeModal";
import { FaRupeeSign } from "react-icons/fa";

// ============================================================
// TYPES
// ============================================================
interface BillingRecord {
  invoice_date: string;
  plan_name: string;
  amount: number;
  payment_status: "created" | "failed";
}

interface ResumeItem {
  component: React.ComponentType<any>;
  templateId: string | number;
  id: number;
  resume_data: object;
  resume_title: string;
  template: { id: number; name: string; thumbnail: string | null; tier: string; };
  updated_at: string;
  [key: string]: any;
}

interface Resume {
  id: number;
  is_completed: boolean;
  last_completed_section: string;
  resume_data: object;
  resume_title: string;
  template: { id: number; name: string; thumbnail: string | null; tier: string; };
  updated_at: string;
}

// ============================================================
// API FUNCTIONS
// ============================================================
const fetchDashboardData = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};

const deleteResumeApi = async (id: string) => {
  await api.delete(`${API_URL}/user-resumes/${id}`);
  return id;
};



// ============================================================
// RESUME CARD
// ============================================================
const ResumeCard = React.memo(({
  item, index, isMobile, isPlanExpired,
  onEdit, onDelete, onView, activeMenuId, setActiveMenuId,
}: any) => {
  const ComponentToRender = item.component;
  const router = useRouter();
  const A4_W = 794;
  const A4_H = 1123;


  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.06, 0.4), duration: 0.35 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "white",
        border: "1px solid #E2E8F0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
      whileHover={{
        boxShadow: "0 8px 32px rgba(79,70,229,0.12), 0 2px 8px rgba(0,0,0,0.08)",
        y: isPlanExpired ? 0 : -2,
      }}
    >
      {/* Resume Thumbnail */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{
          height: isMobile ? 200 : 330,
          background: "#F8FAFC",
        }}
      >
        {/* Scaled resume preview */}
        <div
          style={{
            width: `${A4_W}px`,
            height: `${A4_H}px`,
            transformOrigin: "top left",
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <ComponentToRender alldata={item.resume_data} />
        </div>

        {/* Gradient fade at bottom of preview */}
        <div
          className="absolute inset-x-0 bottom-0 h-12"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.15))",
          }}
        />

       

        {/* Hover actions overlay (non-expired) */}
        {!isPlanExpired && !isMobile && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2"
            style={{ background: "rgba(15,23,42,0.4)", backdropFilter: "blur(2px)" }}
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onView(item)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-colors"
              style={{ background: "#4F46E5" }}
              title="View Resume"
            >
              <FiEye className="w-3.5 h-3.5" /> View
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEdit(item)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
              style={{ background: "white", color: "#1E293B" }}
              title="Edit Resume"
            >
              <FiEdit2 className="w-3.5 h-3.5" /> Edit
            </motion.button>
          </div>
        )}

        {/* Expired hover — show view only */}
        {isPlanExpired && !isMobile && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center bg-black/10 transition-all duration-500">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onView(item)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white cursor-pointer"
              style={{ background: "#4F46E5" }}
            >
              <FiEye className="w-3.5 h-3.5" /> View Resume
            </motion.button>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="px-3 py-3 flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-800 truncate leading-tight">
            {item.resume_title || `Resume ${index + 1}`}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Template {item.template?.id || "—"}
            {item.updated_at && (
              <> · {new Date(item.updated_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</>
            )}
          </p>
        </div>

        {/* Desktop actions */}
        {!isMobile && (
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => onView(item)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-indigo-50 cursor-pointer"
              title="View"
            >
              <FiEye className="w-3.5 h-3.5 text-indigo-500" />
            </button>
            {!isPlanExpired && (
              <button
                onClick={() => onEdit(item)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-slate-100 cursor-pointer"
                title="Edit"
              >
                <FiEdit2 className="w-3.5 h-3.5 text-slate-500" />
              </button>
            )}
            
            <button
              onClick={() => onDelete(item.id)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-rose-50 cursor-pointer"
              title="Delete"
            >
              <FiTrash2 className="w-3.5 h-3.5 text-rose-400" />
            </button>
          </div>
        )}

        {/* Mobile three-dot menu */}
        {isMobile && (
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
            >
              <IoEllipsisVertical className="w-4 h-4 text-slate-500" />
            </button>
            {activeMenuId === item.id && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute right-0 bottom-full mb-1 z-20 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-1 overflow-hidden"
                >
                  <button
                    onClick={() => { onView(item); setActiveMenuId(null); }}
                    className="w-full px-3 py-2.5 text-left text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center gap-2"
                  >
                    <FiEye className="w-3.5 h-3.5" /> View Resume
                  </button>
                  {!isPlanExpired && (
                    <button
                      onClick={() => { onEdit(item); setActiveMenuId(null); }}
                      className="w-full px-3 py-2.5 text-left text-xs text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
                    >
                      <FiEdit2 className="w-3.5 h-3.5" /> Edit Resume
                    </button>
                  )}
                  <div className="border-t border-slate-100 my-1" />
                  <button
                    onClick={() => { onDelete(item.id); setActiveMenuId(null); }}
                    className="w-full px-3 py-2.5 text-left text-xs text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </motion.div>
              </>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
});

ResumeCard.displayName = "ResumeCard";

// ============================================================
// STAT CARD
// ============================================================
const StatCard = ({ label, value, icon: Icon, accent, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.35 }}
    className="rounded-2xl p-5 flex items-center justify-between"
    style={{
      background: "white",
      border: "1px solid #E2E8F0",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    }}
  >
    <div>
      <p className="text-xs font-medium text-slate-400 mb-1">{label}</p>
      <p className="text-2xl font-bold" style={{ color: accent }}>{value}</p>
    </div>
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: `${accent}14` }}
    >
      <Icon className="w-5 h-5" style={{ color: accent }} />
    </div>
  </motion.div>
);

// ============================================================
// MAIN DASHBOARD
// ============================================================
const DashboardPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setIsUploadMode } = useContext(CreateContext);

  const [showBillingHistory, setShowBillingHistory] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [viewingResume, setViewingResume] = useState<ResumeItem | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const userDetails = getLocalStorage<User>("user_details");
  const userId = userDetails?.id;

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 640);
      setIsTablet(w >= 640 && w < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["dashboard", userId],
    queryFn: fetchDashboardData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!userId,
  });

  const processedData = useMemo(() => {
    if (!data) return null;
    const { profile, resumes, statistics, subscription, transactions } = data;

    console.log("resumes",resumes)
    const filteredResumes =
      resumes?.flatMap((resume: Resume) => {
        const match = templateData.find((t) => t?.id === resume.template?.id);
        return match ? [{ ...resume, component: match.component }] : [];
      }) || [];
    return {
      profile,
      subscription,
      paymentRecords: transactions,
      statsData: statistics,
      filteredOldResumeData: filteredResumes,
    };
  }, [data]);

  const deleteMutation = useMutation({
    mutationFn: deleteResumeApi,
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: ["dashboard", userId] });
      const previousData = queryClient.getQueryData(["dashboard", userId]);
      queryClient.setQueryData(["dashboard", userId], (old: any) => {
        if (!old) return old;
        return { ...old, resumes: old.resumes.filter((r: any) => r.id !== deletedId) };
      });
      return { previousData };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["dashboard", userId], context?.previousData);
      toast.error("Failed to delete resume. Please try again.");
    },
    onSuccess: () => {
      toast.custom(
        (t) => (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            className="flex items-center gap-3 bg-white rounded-xl shadow-lg px-4 py-3 border border-slate-100"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <IoCheckmarkCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Resume deleted</p>
              <p className="text-xs text-slate-400">Successfully removed.</p>
            </div>
            <button onClick={() => toast.dismiss(t.id)} className="ml-2 text-slate-400 hover:text-slate-600">
              <FiX className="w-4 h-4" />
            </button>
          </motion.div>
        ),
        { duration: 4000 }
      );
    },
  });

  const handleDeleteResume = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Resume?",
      html: `<p class="text-gray-500 text-sm">This action cannot be undone.</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#94A3B8",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg", cancelButton: "rounded-lg" },
    });
    if (result.isConfirmed) deleteMutation.mutate(id);
  };

  const handleEditResume = (item: ResumeItem) => {
    setLocalStorage("chosenTemplate", item.template);
    setLocalStorage("editingResumeIdAndData", { id: item.id, resume_data: item.resume_data });
    setSessionStorage("oldRouteNameDashboard", true);
    router.push(`/resume-details/contact`);
    setIsUploadMode(false);
  };

  const handleLogout = () => {
    ["user_details","fullResumeData","chosenTemplate","access_token","refresh_token","user_token","coverLetterData","editingResumeIdAndData"].forEach(removeLocalStorage);
    router.push("/login");
  };

  useEffect(() => {
    document.body.style.overflow = showBillingHistory || !!viewingResume ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [showBillingHistory, viewingResume]);

  const {
    profile, subscription, paymentRecords, statsData, filteredOldResumeData,
  } = processedData || {};

  const totalResumes = filteredOldResumeData?.length || 0;
  const totalTransactions = paymentRecords?.length || 0;
  const totalAmountSpent = paymentRecords?.reduce(
    (s: number, r: BillingRecord) => r.payment_status === "created" ? s + Number(r.amount) : s, 0
  ) || 0;

  const isPlanExpired = subscription?.current_plan === "" && subscription?.message;

  const getGridCols = () => {
    if (isMobile) return "grid-cols-1 sm:grid-cols-2";
    if (isTablet) return "grid-cols-2 sm:grid-cols-3";
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  };

  // ── Loading ────────────────────────────────────────────────
  if (isLoading) {
    return (
      <ProtectedRoute>
        <Toaster position="top-right" />
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#F8FAFC" }}>
          <div className="text-center">
            <div className="w-12 h-12 border-[3px] border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500 text-sm">Loading your dashboard…</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // ── Error ──────────────────────────────────────────────────
  if (error) {
    return (
      <ProtectedRoute>
        <Toaster position="top-right" />
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#F8FAFC" }}>
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto mb-4">
              <FiAlertCircle className="w-7 h-7 text-rose-500" />
            </div>
            <p className="text-slate-800 font-semibold mb-1">Failed to load dashboard</p>
            <p className="text-slate-400 text-sm mb-4">Something went wrong. Please try again.</p>
            <button
              onClick={() => refetch()}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
              style={{ background: "#4F46E5" }}
            >
              Retry
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // ── Main render ────────────────────────────────────────────
  return (
    <ProtectedRoute>
      <Toaster position="top-right" />

      {/* View Resume Modal */}
      {viewingResume && (
        <ViewResumeModal item={viewingResume} onClose={() => setViewingResume(null)} />
      )}

      <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

          {/* ── HEADER ── */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold mb-3"
                style={{ background: "#EEF2FF", color: "#4F46E5" }}>
                <IoSparkles className="w-3 h-3" />
                Dashboard
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                Welcome back,{" "}
                <span style={{ color: "#4F46E5" }}>
                  {profile?.first_name} {profile?.last_name}
                </span>
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Manage your resumes and track your subscription
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/choose-template")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex-shrink-0 cursor-pointer"
              style={{ background: "#4F46E5", boxShadow: "0 4px 14px rgba(79,70,229,0.3)" }}
            >
              <FiPlus className="w-4 h-4" />
              Create Resume
            </motion.button>
          </motion.div>

          {/* ── STATS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StatCard label="Resumes Created" value={statsData?.total_resumes_created || 0} icon={FiFileText} accent="#4F46E5" delay={0} />
            <StatCard label="Templates Available" value={templateData.length} icon={FiLayout} accent="#10B981" delay={0.05} />
            <StatCard
              label="Current Plan"
              value={
                isPlanExpired ? "Expired" :
                subscription?.current_plan || "No Plan"
              }
              icon={FiStar}
              accent={isPlanExpired ? "#F59E0B" : "#8B5CF6"}
              delay={0.1}
            />
          </div>

          {/* ── MAIN GRID: PROFILE + PLAN ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">

            {/* PROFILE CARD */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-1 rounded-2xl overflow-hidden"
              style={{ background: "white", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
            >
              {/* Banner */}
              <div className="h-20 relative" style={{ background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)" }}>
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 0%, transparent 60%)" }} />
              </div>

              <div className="px-5 pb-5">
               

                <h3 className="font-bold text-slate-900 text-base mb-0.5 mt-8">
                  {profile?.first_name} {profile?.last_name}
                </h3>
                <p className="text-xs text-slate-400 mb-4">Member account</p>

                <div className="space-y-2.5">
                  {[
                    { icon: FiMail, label: profile?.email, color: "#4F46E5" },
                    { icon: FiPhone, label: profile?.phone, color: "#10B981" },
                    { icon: FiMapPin, label: profile?.city, color: "#8B5CF6" },
                  ].filter(i => i.label).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 group/item">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${item.color}12` }}>
                        <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                      </div>
                      <p className="text-xs text-slate-600 truncate">{item.label}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full mt-5 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                  style={{ background: "#F1F5F9", color: "#475569" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "#EEF2FF";
                    (e.currentTarget as HTMLElement).style.color = "#4F46E5";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "#F1F5F9";
                    (e.currentTarget as HTMLElement).style.color = "#475569";
                  }}
                >
                  <FiLogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </motion.div>

            {/* PLAN / SUBSCRIPTION CARD */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="lg:col-span-2 rounded-2xl overflow-hidden"
              style={{ background: "white", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
            >
              {/* ── EXPIRED ── */}
              {isPlanExpired ? (
                <>
                  <div className="p-5 sm:p-6" style={{ background: "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)" }}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-amber-800 mb-3"
                          style={{ background: "rgba(255,255,255,0.3)" }}>
                          <FiAlertCircle className="w-3 h-3" /> EXPIRED
                        </span>
                        <h3 className="text-xl font-bold text-white mb-1">Subscription Expired</h3>
                        <p className="text-amber-100 text-sm">{subscription.message}</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.2)" }}>
                        <FiLock className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="rounded-xl p-4 mb-5 flex items-start gap-3"
                      style={{ background: "#FFFBEB", border: "1px solid #FDE68A" }}>
                      <FiAlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <p className="text-amber-700 text-sm">
                        Your resumes are in view-only mode. Renew your plan to edit, create, or download resumes.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => router.push("/choose-plan")}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer"
                        style={{ background: "#4F46E5" }}
                      >
                        <FiZap className="w-4 h-4" /> Renew Subscription
                      </button>
                      {paymentRecords?.length > 0 && (
                        <button
                          onClick={() => setShowBillingHistory(true)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                          style={{ background: "#F1F5F9", color: "#475569" }}
                        >
                          <FiCreditCard className="w-4 h-4" /> Billing History
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ) : subscription?.current_plan ? (
                // ── ACTIVE PLAN ──
                <>
                  <div className="p-5 sm:p-6" style={{ background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)" }}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-indigo-200 mb-3"
                          style={{ background: "rgba(255,255,255,0.15)" }}>
                          <HiOutlineBadgeCheck className="w-3 h-3" /> ACTIVE
                        </span>
                        <h3 className="text-xl font-bold text-white mb-0.5">{subscription.current_plan} Plan</h3>
                        <p className="text-indigo-200 text-sm">Your current subscription</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-white">₹{subscription?.plan_details?.price || "0"}</p>
                        <p className="text-indigo-200 text-xs mt-0.5">
                          {subscription.current_plan === "Premium" ? "Lifetime" :
                            subscription.current_plan === "Pro Plus" ? "per 3 months" : "per month"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    {/* Features */}
                    {subscription?.plan_details?.description && (() => {
                      const parser = new DOMParser();
                      const doc = parser.parseFromString(subscription.plan_details.description, "text/html");
                      const features = Array.from(doc.querySelectorAll("li")).map(li => li.textContent?.trim() || "");
                      return features.length > 0 ? (
                        <div className="mb-5">
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Included features</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {features.map((f, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-slate-600 line-clamp-1">{f}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null;
                    })()}

                    {/* Dates */}
                    {subscription?.plan_details?.purchased_at && (
                      <div className="rounded-xl p-4 mb-5 grid grid-cols-1 sm:grid-cols-2 gap-3"
                        style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                        <div>
                          <p className="text-[11px] text-slate-400 mb-0.5">Purchased</p>
                          <p className="text-sm font-semibold text-slate-700">
                            {new Date(subscription.plan_details.purchased_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-400 mb-0.5">Validity</p>
                          {subscription.current_plan === "Premium" ? (
                            <p className="text-sm font-semibold" style={{ color: "#7C3AED" }}>Lifetime Access</p>
                          ) : subscription?.plan_details?.expires_at ? (
                            <p className="text-sm font-semibold text-slate-700">
                              {new Date(subscription.plan_details.expires_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                              {new Date(subscription.plan_details.expires_at) > new Date() && (
                                <span className="ml-2 text-[11px] font-medium px-1.5 py-0.5 rounded-full"
                                  style={{ background: "#D1FAE5", color: "#065F46" }}>
                                  {Math.ceil((new Date(subscription.plan_details.expires_at).getTime() - Date.now()) / 86400000)}d left
                                </span>
                              )}
                            </p>
                          ) : <p className="text-sm font-semibold text-slate-700">—</p>}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => router.push("/choose-plan")}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-colors"
                        style={{ background: "#4F46E5" }}
                      >
                        <MdOutlinePublishedWithChanges className="w-4 h-4" /> Upgrade Plan
                      </button>
                      <button
                        onClick={() => setShowBillingHistory(true)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-colors"
                        style={{ background: "#F1F5F9", color: "#475569" }}
                      >
                        <FiCreditCard className="w-4 h-4" /> Billing History
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                // ── NO PLAN ──
                <div className="flex flex-col items-center justify-center text-center p-10 h-full min-h-[280px]">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: "#EEF2FF" }}>
                    <FiZap className="w-7 h-7 text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">No Active Plan</h3>
                  <p className="text-slate-400 text-sm mb-6 max-w-xs">
                    Choose a plan to unlock premium templates and all features
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => router.push("/choose-plan")}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer"
                      style={{ background: "#4F46E5" }}
                    >
                      Choose a Plan <FiArrowRight className="w-4 h-4" />
                    </button>
                    {paymentRecords?.length > 0 && (
                      <button
                        onClick={() => setShowBillingHistory(true)}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                        style={{ background: "#F1F5F9", color: "#475569" }}
                      >
                        <FiCreditCard className="w-4 h-4" /> Billing
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* ── RESUMES SECTION ── */}
          <div>
            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-slate-900">My Resumes</h2>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: "#EEF2FF", color: "#4F46E5" }}
                >
                  {totalResumes}
                </span>
              </div>
              {isPlanExpired && (
                <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl">
                  <FiLock className="w-3.5 h-3.5 flex-shrink-0" />
                  Editing locked — view & delete available
                </div>
              )}
            </div>

            {/* Grid */}
            <div className={`grid ${getGridCols()} gap-4`}>
              {filteredOldResumeData?.length > 0 ? (
                filteredOldResumeData.map((item: ResumeItem, index: number) => (
                  <ResumeCard
                    key={item.id || index}
                    item={item}
                    index={index}
                    isMobile={isMobile}
                    isPlanExpired={isPlanExpired}
                    onEdit={handleEditResume}
                    onDelete={handleDeleteResume}
                    onView={(i: ResumeItem) => setViewingResume(i)}
                    activeMenuId={activeMenuId}
                    setActiveMenuId={setActiveMenuId}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full"
                >
                  <div
                    className="flex flex-col items-center justify-center py-16 rounded-2xl text-center"
                    style={{ background: "white", border: "1px dashed #CBD5E1" }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                      style={{ background: "#EEF2FF" }}
                    >
                      <FiFileText className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-700 mb-1">No resumes yet</h3>
                    <p className="text-slate-400 text-sm mb-6">
                      {isPlanExpired ? "Renew your plan to create resumes" : "Create your first resume to get started"}
                    </p>
                    {!isPlanExpired && (
                      <button
                        onClick={() => router.push("/choose-template")}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer"
                        style={{ background: "#4F46E5" }}
                      >
                        <FiPlus className="w-4 h-4" /> Create Resume
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── BILLING HISTORY MODAL ── */}
      <AnimatePresence>
        {showBillingHistory && paymentRecords && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(8px)" }}
            onClick={() => setShowBillingHistory(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col rounded-2xl"
              style={{ background: "white", boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#EEF2FF" }}>
                    <MdOutlineReceipt className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Billing History</h2>
                    <p className="text-xs text-slate-400">Your past transactions</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBillingHistory(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
                >
                  <FiX className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1">
                {/* Summary row */}
                <div className="grid grid-cols-3 gap-4 p-5 border-b border-slate-100">
                  {[
                    { label: "Transactions", value: totalTransactions, icon: FiShoppingBag, color: "#4F46E5" },
                    { label: "Total Spent", value: `₹${totalAmountSpent.toFixed(2)}`, icon: FaRupeeSign, color: "#10B981" },
                    { label: "Plan", value: subscription?.current_plan || "Free", icon: HiOutlineBadgeCheck, color: "#8B5CF6" },
                  ].map((s, i) => (
                    <div key={i} className="rounded-xl p-3 sm:p-4" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[11px] text-slate-400">{s.label}</p>
                        <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                      </div>
                      <p className="text-base sm:text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Table */}
                <div className="p-5">
                  {paymentRecords.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[480px]">
                        <thead>
                          <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                            {["Date", "Plan", "Amount", "Status"].map(h => (
                              <th key={h} className="pb-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 first:px-0">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {paymentRecords.map((record: BillingRecord, idx: number) => (
                            <tr
                              key={idx}
                              className="transition-colors"
                              style={{ borderBottom: "1px solid #F8FAFC", background: hoveredRow === idx ? "#F8FAFC" : "transparent" }}
                              onMouseEnter={() => setHoveredRow(idx)}
                              onMouseLeave={() => setHoveredRow(null)}
                            >
                              <td className="py-3 text-sm text-slate-600">
                                {new Date(record.invoice_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                              </td>
                              <td className="py-3 px-2 text-sm font-semibold text-slate-800">{record.plan_name}</td>
                              <td className="py-3 px-2 text-sm font-bold text-slate-900">₹{record.amount}</td>
                              <td className="py-3 px-2">
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                                  record.payment_status === "created"
                                    ? "text-emerald-700 bg-emerald-50"
                                    : "text-amber-700 bg-amber-50"
                                }`}>
                                  {record.payment_status === "created" && <FiCheckCircle className="w-3 h-3" />}
                                  {record.payment_status.charAt(0).toUpperCase() + record.payment_status.slice(1)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <HiOutlineReceiptRefund className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium text-sm">No transactions yet</p>
                      <p className="text-slate-400 text-xs mt-1">Your billing history will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── LOGOUT MODAL ── */}
      <AnimatePresence>
        {showLogoutModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(8px)" }}
            onClick={() => setShowLogoutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="w-full max-w-sm rounded-2xl overflow-hidden"
              style={{ background: "white", boxShadow: "0 24px 60px rgba(0,0,0,0.22)" }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#EEF2FF" }}
                >
                  <FiLogOut className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Sign out?</h3>
                <p className="text-slate-400 text-sm mb-6">You'll need to sign in again to access your account.</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-colors"
                    style={{ background: "#F1F5F9", color: "#475569" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-colors"
                    style={{ background: "#EF4444" }}
                  >
                    <FiLogOut className="w-4 h-4" /> Sign out
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