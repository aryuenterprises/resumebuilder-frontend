// "use client";
// import React, { useContext, useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiFileText,
//   FiDownload,
//   FiEye,
//   FiEdit,
//   FiMoreVertical,
//   FiPlus,
//   FiUser,
//   FiMail,
//   FiPhone,
//   FiMapPin,
//   FiCheckCircle,
//   FiClock,
//   FiCreditCard,
//   FiCpu,
//   FiUsers,
//   FiTrash2,
//   FiCopy,
//   FiLogOut,
// } from "react-icons/fi";
// import {
//   HiOutlineTemplate,
//   HiOutlineSparkles,
//   HiOutlineBadgeCheck,
// } from "react-icons/hi";
// import { useRouter } from "next/navigation";
// import { getLocalStorage, removeLocalStorage } from "@/app/utils";
// import { User } from "@/app/types/user.types";
// import { MdOutlinePublishedWithChanges } from "react-icons/md";

//  const currentPlan = {
//     name: "Premium",
//     price: "$10.99",
//     interval: "month",
//     status: "active",
//     features: [
//       { name: "Unlimited Resumes", included: true, icon: FiFileText },
//       { name: "Premium Templates", included: true, icon: HiOutlineTemplate },
//       {
//         name: "AI-Powered Suggestions",
//         included: true,
//         icon: HiOutlineSparkles,
//       },
//       { name: "ATS Optimization", included: true, icon: FiCpu },
//       { name: "Priority Support", included: true, icon: FiUsers },
//     ],
//   };

//   const resumes = [
//     {
//       id: "1",
//       name: "Software Engineer Resume",
//       template: "Modern Professional",
//       lastEdited: "2 hours ago",
//       progress: 100,
//       views: 34,
//       downloads: 12,
//       status: "completed",
//     },
//     {
//       id: "2",
//       name: "Frontend Developer Resume",
//       template: "Creative Minimal",
//       lastEdited: "Yesterday",
//       progress: 75,
//       views: 18,
//       downloads: 5,
//       status: "in-progress",
//     },
//     {
//       id: "3",
//       name: "Full Stack Developer Resume",
//       template: "Executive",
//       lastEdited: "3 days ago",
//       progress: 30,
//       views: 8,
//       downloads: 2,
//       status: "draft",
//     },
//     {
//       id: "4",
//       name: "UI/UX Designer Resume",
//       template: "Creative Portfolio",
//       lastEdited: "1 week ago",
//       progress: 100,
//       views: 45,
//       downloads: 18,
//       status: "completed",
//     },
//     {
//       id: "5",
//       name: "Product Manager Resume",
//       template: "Executive",
//       lastEdited: "2 weeks ago",
//       progress: 60,
//       views: 12,
//       downloads: 4,
//       status: "in-progress",
//     },
//     {
//       id: "6",
//       name: "DevOps Engineer Resume",
//       template: "Technical",
//       lastEdited: "3 weeks ago",
//       progress: 20,
//       views: 5,
//       downloads: 1,
//       status: "draft",
//     },
//   ];
// const DashboardPage = () => {
//   const router = useRouter();
//   const [greeting, setGreeting] = useState("");
//   const [showResumeMenu, setShowResumeMenu] = useState<string | null>(null);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState("All Resumes");

//   const userDetails = getLocalStorage<User>("user_details");
//   const userName = `${ userDetails?.firstName }  ${ userDetails?.lastName }`;
//   const userEmail = userDetails?.email;
//   const userPhone = userDetails?.phone;
//   const userLocation =userDetails?.city && `${userDetails.city}, ${userDetails.country}`;

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour >= 5 && hour < 12) {
//       setGreeting("Good Morning ☀️");
//     } else if (hour >= 12 && hour < 17) {
//       setGreeting("Good Afternoon 🌤️");
//     } else if (hour >= 17 && hour < 21) {
//       setGreeting("Good Evening 🌆");
//     } else {
//       setGreeting("Good Night 🌙");
//     }
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = () => {
//       if (showResumeMenu) setShowResumeMenu(null);
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [showResumeMenu]);

//   const handleLogout = () => {
//     removeLocalStorage("user_details");
//     removeLocalStorage("fullResumeData");
//     removeLocalStorage("chosenTemplate");
//     removeLocalStorage("accessToken");
//     router.push("/login");
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "completed":
//         return "text-green-600 bg-green-100 border-green-200";
//       case "in-progress":
//         return "text-yellow-600 bg-yellow-100 border-yellow-200";
//       default:
//         return "text-gray-600 bg-gray-100 border-gray-200";
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "completed":
//         return FiCheckCircle;
//       case "in-progress":
//         return FiClock;
//       default:
//         return FiFileText;
//     }
//   };

//   const filteredResumes =
//     selectedFilter === "All Resumes"
//       ? resumes
//       : resumes.filter((r) => r.status === selectedFilter.toLowerCase());

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//     },
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-gray-50 to-white">
//       {/* Logout Confirmation Modal */}
//       <AnimatePresence>
//         {showLogoutModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//             onClick={() => setShowLogoutModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden mx-4"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-1 bg-linear-to-r from-[#c40116] to-[#be0117]"></div>
//               <div className="p-6 sm:p-8 text-center">
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.2, type: "spring", damping: 10 }}
//                   className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6"
//                 >
//                   <div className="absolute w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-r from-[#c40116]/10 to-[#be0117]/10 rounded-full blur-xl"></div>
//                   <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-[#c40116] to-[#be0117] rounded-2xl shadow-xl flex items-center justify-center transform hover:rotate-6 transition-transform">
//                     <FiLogOut className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
//                   </div>
//                 </motion.div>

//                 <motion.h2
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3"
//                 >
//                   Ready to Leave?
//                 </motion.h2>

//                 <motion.p
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 }}
//                   className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8"
//                 >
//                   Are you sure you want to logout? You can always sign back in.
//                 </motion.p>

//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5 }}
//                   className="flex flex-col sm:flex-row gap-3"
//                 >
//                   <button
//                     onClick={() => setShowLogoutModal(false)}
//                     className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors text-sm sm:text-base"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
//                   >
//                     <FiLogOut className="w-4 h-4" />
//                     Logout
//                   </button>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
//         {/* Welcome Section - Responsive */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-6 sm:mb-8 bg-linear-to-r from-[#c40116]/5 to-[#be0117]/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-[#c40116]/10"
//         >
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
//             <div className="w-full sm:w-auto">
//               <motion.h2
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2"
//               >
//                 {greeting},{" "}
//                 <span className="bg-linear-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent block sm:inline">
//                   {userName}
//                 </span>
//               </motion.h2>
//               <motion.p
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="text-sm sm:text-base lg:text-lg text-gray-600"
//               >
//                 Welcome back to your resume dashboard. Here's what's happening
//                 today.
//               </motion.p>
//             </div>
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.4, type: "spring", damping: 10 }}
//               className="hidden sm:block"
//             >
//               <div className="w-16 h-16 lg:w-24 lg:h-24 bg-linear-to-br from-[#c40116] to-[#be0117] rounded-2xl lg:rounded-3xl rotate-12 shadow-2xl flex items-center justify-center">
//                 <FiFileText className="w-8 h-8 lg:w-12 lg:h-12 text-white" />
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* User Profile and Stats Cards - Responsive Grid */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="flex gap-4 sm:gap-6 mb-6 sm:mb-8"
//         >
//           {/* Profile Card */}
//           <motion.div
//             variants={itemVariants}
//             whileHover={{ y: -5 }}
//             className=" bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-500 w-1/2 h-fit"
//           >
//             <div className="bg-linear-to-r from-[#c40116] to-[#be0117] px-4 sm:px-6 py-3 sm:py-4 relative overflow-hidden">
//               <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
//               <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
//                 <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
//                 Profile Information
//               </h3>
//             </div>
//             <div className="p-4 sm:p-6">
//               <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
//                 <motion.div
//                   whileHover={{ scale: 1.05, rotate: 2 }}
//                   className="w-16 h-16 sm:w-20 sm:h-20  bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl sm:rounded-2xl flex items-center justify-center border-2 border-[#c40116]/20 shadow-lg shrink-0"
//                 >
//                   <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#c40116]">
//                     {userName?.charAt(0)}
//                   </span>
//                 </motion.div>
//                 <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
//                   <motion.div whileHover={{ x: 5 }} className="group">
//                     <p className="text-xs sm:text-sm text-gray-500 mb-1 flex items-center gap-2">
//                       <FiUser className="w-3 h-3" />
//                       Full Name
//                     </p>
//                     <p className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-[#c40116] transition-colors wrap-break-word">
//                       {userName}
//                     </p>
//                   </motion.div>
//                   <motion.div whileHover={{ x: 5 }} className="group">
//                     <p className="text-xs sm:text-sm text-gray-500 mb-1 flex items-center gap-2">
//                       <FiMail className="w-3 h-3" />
//                       Email
//                     </p>
//                     <p className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-[#c40116] transition-colors wrap-break-word">
//                       {userEmail}
//                     </p>
//                   </motion.div>
//                   <motion.div whileHover={{ x: 5 }} className="group">
//                     <p className="text-xs sm:text-sm text-gray-500 mb-1 flex items-center gap-2">
//                       <FiPhone className="w-3 h-3" />
//                       Phone
//                     </p>
//                     <p className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-[#c40116] transition-colors wrap-break-word">
//                       {userPhone}
//                     </p>
//                   </motion.div>
//                   <motion.div whileHover={{ x: 5 }} className="group">
//                     <p className="text-xs sm:text-sm text-gray-500 mb-1 flex items-center gap-2">
//                       <FiMapPin className="w-3 h-3" />
//                       Location
//                     </p>
//                     <p className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-[#c40116] transition-colors wrap-break-word">
//                       {userLocation}
//                     </p>
//                   </motion.div>
//                 </div>
//               </div>

//               {/* Logout Button - Mobile Optimized */}
//               <div className="mt-4 sm:mt-6">
//                 <button
//                   onClick={() => setShowLogoutModal(true)}
//                   className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transform hover:scale-105 transition-all duration-300 group relative cursor-pointer"
//                 >
//                   <FiLogOut className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             </div>
//           </motion.div>

//           {/* Current Plan Section - Responsive */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="mb-6 sm:mb-8 w-1/2"
//           >
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
//                 <FiCreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
//                 Current Plan
//               </h3>
//             </div>

//             <div className=" gap-4 sm:gap-6">
//               {/* Active Plan Card */}
//               <motion.div
//                 variants={itemVariants}
//                 whileHover={{ y: -5 }}
//                 className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl shadow-lg border-2 border-[#c40116]/20 overflow-hidden hover:shadow-xl transition-all duration-500"
//               >
//                 <div className="p-4 sm:p-6">
//                   <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4 sm:mb-6">
//                     <div>
//                       <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
//                         <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
//                           ACTIVE
//                         </span>
//                       </div>
//                       <h4 className="text-xl sm:text-2xl font-bold text-gray-900">
//                         {currentPlan.name} Plan
//                       </h4>
//                       <p className="text-sm sm:text-base text-gray-600 mt-1">
//                         {currentPlan.price}/{currentPlan.interval}
//                       </p>
//                     </div>
//                     <div className="p-2 sm:p-3 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl">
//                       <HiOutlineBadgeCheck className="w-6 h-6 sm:w-8 sm:h-8 text-[#c40116]" />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                     {currentPlan.features.map((feature, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center gap-2 sm:gap-3"
//                       >
//                         <div
//                           className={`p-1 sm:p-1.5 rounded-lg ${
//                             feature.included
//                               ? "bg-green-100 text-green-600"
//                               : "bg-gray-100 text-gray-400"
//                           }`}
//                         >
//                           <feature.icon className="w-3 h-3 sm:w-4 sm:h-4" />
//                         </div>
//                         <span
//                           className={`text-xs sm:text-sm ${
//                             feature.included ? "text-gray-700" : "text-gray-400"
//                           }`}
//                         >
//                           {feature.name}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
//                     <button onClick={()=>router.push('/choose-plan')} className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transform hover:scale-105 transition-all duration-300 group relative cursor-pointer text-sm">
//                       <MdOutlinePublishedWithChanges className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
//                       <span>Change Plan</span>
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Resumes Section - Responsive */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
//             <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
//               <FiFileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
//               Your Resumes
//             </h3>
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
//               <select
//                 value={selectedFilter}
//                 onChange={(e) => setSelectedFilter(e.target.value)}
//                 className="w-full sm:w-auto px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20"
//               >
//                 <option>All Resumes</option>
//                 <option>Completed</option>
//                 <option>In Progress</option>
//                 <option>Draft</option>
//               </select>
//               <button
//                 onClick={() => router.push("/choose-template")}
//                 className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-xs sm:text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 transition-all"
//               >
//                 <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
//                 New Resume
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//             {filteredResumes.map((resume) => {
//               const StatusIcon = getStatusIcon(resume.status);
//               return (
//                 <motion.div
//                   key={resume.id}
//                   variants={itemVariants}
//                   whileHover={{ y: -5 }}
//                   className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
//                 >
//                   {/* Thumbnail */}
//                   <div className="h-28 sm:h-32 lg:h-40 bg-linear-to-br from-gray-100 to-gray-200 relative overflow-hidden">
//                     <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                     <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
//                       <button className="p-1.5 sm:p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
//                         <FiEye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
//                       </button>
//                       <button className="p-1.5 sm:p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
//                         <FiDownload className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
//                       </button>
//                       <button className="p-1.5 sm:p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
//                         <FiEdit className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
//                       </button>
//                     </div>
//                     <div className="absolute top-2 left-2">
//                       <span
//                         className={`text-xs px-2 py-0.5 sm:py-1 rounded-full ${getStatusColor(resume.status)}`}
//                       >
//                         {resume.status}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="p-3 sm:p-4">
//                     <div className="flex items-start justify-between mb-2">
//                       <div className="flex-1 min-w-0">
//                         <h4 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-[#c40116] transition-colors truncate">
//                           {resume.name}
//                         </h4>
//                         <p className="text-xs text-gray-500 mt-0.5 sm:mt-1 truncate">
//                           Template: {resume.template}
//                         </p>
//                       </div>
//                       <div className="relative shrink-0 ml-2">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setShowResumeMenu(
//                               showResumeMenu === resume.id ? null : resume.id,
//                             );
//                           }}
//                           className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//                         >
//                           <FiMoreVertical className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
//                         </button>
//                         {showResumeMenu === resume.id && (
//                           <div className="absolute right-0 mt-2 w-36 sm:w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 sm:py-2 z-10">
//                             {[
//                               "Edit",
//                               "View",
//                               "Download",
//                               "Duplicate",
//                               "Delete",
//                             ].map((action) => (
//                               <button
//                                 key={action}
//                                 className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-left text-xs sm:text-sm hover:bg-gray-50 flex items-center gap-2"
//                                 onClick={() => setShowResumeMenu(null)}
//                               >
//                                 {action === "Edit" && (
//                                   <FiEdit className="w-3 h-3 sm:w-4 sm:h-4" />
//                                 )}
//                                 {action === "View" && (
//                                   <FiEye className="w-3 h-3 sm:w-4 sm:h-4" />
//                                 )}
//                                 {action === "Download" && (
//                                   <FiDownload className="w-3 h-3 sm:w-4 sm:h-4" />
//                                 )}
//                                 {action === "Duplicate" && (
//                                   <FiCopy className="w-3 h-3 sm:w-4 sm:h-4" />
//                                 )}
//                                 {action === "Delete" && (
//                                   <FiTrash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
//                                 )}
//                                 <span
//                                   className={
//                                     action === "Delete" ? "text-red-500" : ""
//                                   }
//                                 >
//                                   {action}
//                                 </span>
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Stats */}
//                     <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-3">
//                       <div className="flex items-center gap-1">
//                         <FiEye className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
//                         <span className="text-xs text-gray-600">
//                           {resume.views}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <FiDownload className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
//                         <span className="text-xs text-gray-600">
//                           {resume.downloads}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <FiClock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
//                         <span className="text-xs text-gray-600">
//                           {resume.lastEdited}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Progress */}
//                     <div className="mt-3 sm:mt-4">
//                       <div className="flex items-center justify-between mb-1 sm:mb-2">
//                         <div className="flex items-center gap-1 sm:gap-2">
//                           <StatusIcon
//                             className={`w-3 h-3 sm:w-4 sm:h-4 ${
//                               resume.status === "completed"
//                                 ? "text-green-500"
//                                 : resume.status === "in-progress"
//                                   ? "text-yellow-500"
//                                   : "text-gray-500"
//                             }`}
//                           />
//                         </div>
//                         <span className="text-xs font-medium text-gray-700">
//                           {resume.progress}%
//                         </span>
//                       </div>
//                       <div className="h-1 sm:h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-linear-to-r from-[#c40116] to-[#be0117] transition-all duration-500"
//                           style={{ width: `${resume.progress}%` }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

"use client";
import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFileText,
  FiDownload,
  FiEye,
  FiEdit,
  FiMoreVertical,
  FiPlus,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiCpu,
  FiUsers,
  FiTrash2,
  FiCopy,
  FiLogOut,
  FiTrendingUp,
  FiAward,
  FiTarget,
  FiPrinter,
  FiFile,
  FiCalendar,
  FiX,
  FiDollarSign,
} from "react-icons/fi";
import {
  HiOutlineTemplate,
  HiOutlineSparkles,
  HiOutlineBadgeCheck,
  HiOutlineChartBar,
  HiOutlineDocumentDuplicate,
  HiOutlineReceiptRefund,
} from "react-icons/hi";
import { useRouter } from "next/navigation";
import { getLocalStorage, removeLocalStorage } from "@/app/utils";
import { User } from "@/app/types/user.types";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineReceipt,
} from "react-icons/md";

const currentPlan = {
  name: "Premium",
  price: "$10.99",
  interval: "month",
  status: "active",
  features: [
    { name: "Unlimited Resumes", included: true, icon: FiFileText },
    { name: "Premium Templates", included: true, icon: HiOutlineTemplate },
    {
      name: "AI-Powered Suggestions",
      included: true,
      icon: HiOutlineSparkles,
    },
    { name: "ATS Optimization", included: true, icon: FiCpu },
    { name: "Priority Support", included: true, icon: FiUsers },
  ],
};

const resumes = [
  {
    id: "1",
    name: "Software Engineer Resume",
    template: "Modern Professional",
    lastEdited: "2 hours ago",
    progress: 100,
    views: 34,
    downloads: 12,
    status: "completed",
  },
  {
    id: "2",
    name: "Frontend Developer Resume",
    template: "Creative Minimal",
    lastEdited: "Yesterday",
    progress: 75,
    views: 18,
    downloads: 5,
    status: "in-progress",
  },
  {
    id: "3",
    name: "Full Stack Developer Resume",
    template: "Executive",
    lastEdited: "3 days ago",
    progress: 30,
    views: 8,
    downloads: 2,
    status: "draft",
  },
  {
    id: "4",
    name: "UI/UX Designer Resume",
    template: "Creative Portfolio",
    lastEdited: "1 week ago",
    progress: 100,
    views: 45,
    downloads: 18,
    status: "completed",
  },
  {
    id: "5",
    name: "Product Manager Resume",
    template: "Executive",
    lastEdited: "2 weeks ago",
    progress: 60,
    views: 12,
    downloads: 4,
    status: "in-progress",
  },
  {
    id: "6",
    name: "DevOps Engineer Resume",
    template: "Technical",
    lastEdited: "3 weeks ago",
    progress: 20,
    views: 5,
    downloads: 1,
    status: "draft",
  },
];

interface BillingRecord {
  date: string;
  description: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  plan: string;
}

const DashboardPage = () => {
  const router = useRouter();
  const [greeting, setGreeting] = useState("");
  const [showBillingHistory, setShowBillingHistory] = useState(false);
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>([
    {
      date: "2024-02-15",
      description: "Premium Plan - Monthly Subscription",
      amount: 10.99,
      status: "paid",
      plan: "Premium",
    },
    {
      date: "2024-01-15",
      description: "Premium Plan - Monthly Subscription",
      amount: 10.99,
      status: "paid",
      plan: "Premium",
    },
    {
      date: "2023-12-15",
      description: "Premium Plan - Monthly Subscription",
      amount: 10.99,
      status: "paid",
      plan: "Premium",
    },
    {
      date: "2023-11-15",
      description: "Premium Plan - Monthly Subscription",
      amount: 10.99,
      status: "paid",
      plan: "Premium",
    },
    {
      date: "2023-10-15",
      description: "Premium Plan - Monthly Subscription",
      amount: 10.99,
      status: "paid",
      plan: "Premium",
    },
  ]);
  const [showResumeMenu, setShowResumeMenu] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Resumes");
  const [stats, setStats] = useState({
    totalViews: 0,
    totalDownloads: 0,
    completedResumes: 0,
  });

  const userDetails = getLocalStorage<User>("user_details");
  const userName = `${userDetails?.firstName} ${userDetails?.lastName}`;
  const userEmail = userDetails?.email;
  const userPhone = userDetails?.phone;
  const userLocation =
    userDetails?.city && `${userDetails.city}, ${userDetails.country}`;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning ☀️");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon 🌤️");
    } else if (hour >= 17 && hour < 21) {
      setGreeting("Good Evening 🌆");
    } else {
      setGreeting("Good Night 🌙");
    }
  }, []);

  useEffect(() => {
    // Calculate stats from resumes
    const totalViews = resumes.reduce((acc, curr) => acc + curr.views, 0);
    const totalDownloads = resumes.reduce(
      (acc, curr) => acc + curr.downloads,
      0,
    );
    const completedResumes = resumes.filter(
      (r) => r.status === "completed",
    ).length;
    setStats({ totalViews, totalDownloads, completedResumes });
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (showResumeMenu) setShowResumeMenu(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showResumeMenu]);

  const handleLogout = () => {
    removeLocalStorage("user_details");
    removeLocalStorage("fullResumeData");
    removeLocalStorage("chosenTemplate");
    removeLocalStorage("accessToken");
    router.push("/login");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "in-progress":
        return "text-amber-600 bg-amber-50 border-amber-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return FiCheckCircle;
      case "in-progress":
        return FiClock;
      default:
        return FiFileText;
    }
  };

  const filteredResumes =
    selectedFilter === "All Resumes"
      ? resumes
      : resumes.filter((r) => r.status === selectedFilter.toLowerCase());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const BillingHistoryModal = ({
    isOpen,
    onClose,
    records,
  }: {
    isOpen: boolean;
    onClose: () => void;
    records: BillingRecord[];
  }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case "paid":
          return "text-emerald-600 bg-emerald-50 border-emerald-200";
        case "pending":
          return "text-amber-600 bg-amber-50 border-amber-200";
        case "failed":
          return "text-red-600 bg-red-50 border-red-200";
        default:
          return "text-gray-600 bg-gray-50 border-gray-200";
      }
    };

    const totalSpent = records.reduce((acc, curr) => acc + curr.amount, 0);

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-x-hidden overflow-y-auto mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-linear-to-r from-[#c40116] via-[#be0117] to-[#9a0e1a] p-6">
                <div className="absolute inset-0 bg-white/10 transform -skew-y-12 translate-y-1/2"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-8 -mb-8"></div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <MdOutlineReceipt className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Billing History
                      </h2>
                      <p className="text-white/80 text-sm">
                        View your past transactions and invoices
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="p-6 border-b border-gray-200 bg-gray-50/50">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">
                      Total Transactions
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {records.length}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${totalSpent.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Current Plan</p>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#c40116] to-[#be0117]">
                      Premium
                    </p>
                  </div>
                </div>
              </div>

              {/* Billing Records Table */}
              <div className="overflow-y-auto max-h-100 p-6">
                <table className="w-full">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <FiCalendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {new Date(record.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-600">
                            {record.description}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm font-medium text-gray-900">
                            {record.plan}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-1">
                            <FiDollarSign className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-900">
                              {record.amount.toFixed(2)}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}
                          >
                            {record.status.charAt(0).toUpperCase() +
                              record.status.slice(1)}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>

                {records.length === 0 && (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
                      <HiOutlineReceiptRefund className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No billing history
                    </h3>
                    <p className="text-gray-600">
                      Your past transactions will appear here
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setShowLogoutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-2 bg-linear-to-r from-[#c40116] via-[#be0117] to-[#9a0e1a]"></div>
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 10 }}
                  className="relative mx-auto w-20 h-20 mb-6"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-[#c40116]/20 to-[#be0117]/20 rounded-full blur-xl"></div>
                  <div className="relative w-20 h-20 bg-linear-to-br from-[#c40116] to-[#be0117] rounded-2xl shadow-xl flex items-center justify-center transform hover:rotate-6 transition-transform">
                    <FiLogOut className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-gray-900 mb-3"
                >
                  Ready to Leave?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 mb-8"
                >
                  Are you sure you want to logout? You can always sign back in.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-3 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Logout
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section  */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 relative overflow-hidden rounded-3xl "
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-linear-to-r from-[#c40116]/5 via-[#be0117]/5 to-transparent rounded-3xl"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c40116] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#be0117] rounded-full blur-3xl"></div>
          </div>

          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="px-4 py-1.5 bg-linear-to-r from-[#c40116]/10 to-[#be0117]/10 rounded-full"
                  >
                    <span className="text-sm font-medium text-[#c40116]">
                      Welcome Back!
                    </span>
                  </motion.div>
                </div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2"
                >
                  {greeting},{" "}
                  <span className="bg-linear-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
                    {userName}
                  </span>
                </motion.h2>
              </div>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring", damping: 10 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-linear-to-r from-[#c40116] to-[#be0117] rounded-3xl blur-xl opacity-30"></div>
                <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-linear-to-br from-[#c40116] to-[#be0117] rounded-2xl shadow-2xl flex items-center justify-center transform hover:rotate-12 transition-transform">
                  <FiFileText className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Profile and Plan Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Profile Card - Enhanced */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="lg:col-span-1 group"
          >
            <div className="h-full bg-white rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500">
              {/* Card Header with Animated Gradient */}
              <div className="relative h-32 bg-linear-to-r from-[#c40116] via-[#be0117] to-[#9a0e1a] overflow-hidden">
                <div className="absolute inset-0 bg-white/10 transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/10 rounded-full"></div>
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-black/10 rounded-full"></div>
              </div>

              {/* Profile Info */}
              <div className="p-6 pt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {userName}
                </h3>

                <div className="space-y-3">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FiMail className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900 break-all">
                        {userEmail}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <FiPhone className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-900">
                        {userPhone || "Not provided"}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <FiMapPin className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-900">
                        {userLocation || "Not specified"}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Logout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full mt-6 px-4 py-3 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
                >
                  <FiLogOut className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-500" />
                  <span>Logout</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Current Plan Card - Enhanced */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="lg:col-span-2"
          >
            <div className="h-full bg-white rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500">
              {/* Plan Header */}
              <div className="relative bg-linear-to-r from-[#c40116] via-[#be0117] to-[#9a0e1a] p-6 overflow-hidden">
                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-8 -mb-8"></div>

                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30">
                        ACTIVE
                      </span>
                      <HiOutlineBadgeCheck className="w-5 h-5 text-yellow-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {currentPlan.name} Plan
                    </h3>
                    <p className="text-white/80 text-sm">
                      Your current subscription
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">
                      {currentPlan.price}
                    </p>
                    <p className="text-white/80 text-sm">
                      /{currentPlan.interval}
                    </p>
                  </div>
                </div>
              </div>

              {/* Plan Features */}
              <div className="p-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiAward className="w-4 h-4 text-[#c40116]" />
                  Included Features
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentPlan.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#c40116]/20 hover:bg-linear-to-r hover:from-[#c40116]/5 hover:to-transparent transition-all"
                    >
                      <div className="p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
                        <feature.icon className="w-4 h-4 text-[#c40116]" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {feature.name}
                      </span>
                      <FiCheckCircle className="w-4 h-4 text-emerald-500 ml-auto" />
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/choose-plan")}
                    className="flex-1 px-4 py-3 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <MdOutlinePublishedWithChanges className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-500" />
                    <span>Change Plan</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowBillingHistory(true)}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FiCreditCard className="w-4 h-4" />
                    <span>Billing History</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Resumes Section  */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FiFileText className="w-5 h-5 text-[#c40116]" />
                Your Resumes
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Manage and track your resume performance
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full sm:w-48 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 shadow-sm"
              >
                <option>All Resumes</option>
                <option>Completed</option>
                <option>In Progress</option>
                <option>Draft</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/choose-template")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-linear-to-r from-[#c40116] to-[#be0117] text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transition-all duration-300 group"
              >
                <FiPlus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                New Resume
              </motion.button>
            </div>
          </div>

          {/* Resumes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((resume) => {
              const StatusIcon = getStatusIcon(resume.status);
              return (
                <motion.div
                  key={resume.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-[#c40116]/5 to-[#be0117]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                  <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-500">
                    {/* Thumbnail with Gradient Overlay */}
                    <div className="relative h-40 bg-linear-to-br from-gray-900 to-gray-700 overflow-hidden">
                      {/* Animated Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                            backgroundSize: "20px 20px",
                          }}
                        ></div>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(resume.status)} backdrop-blur-sm`}
                        >
                          {resume.status}
                        </span>
                      </div>

                      {/* Action Buttons Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-lg"
                          >
                            <FiEye className="w-4 h-4 text-gray-700" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-lg"
                          >
                            <FiDownload className="w-4 h-4 text-gray-700" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-lg"
                          >
                            <FiEdit className="w-4 h-4 text-gray-700" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Header with Menu */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-semibold text-gray-900 group-hover:text-[#c40116] transition-colors truncate">
                            {resume.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 truncate">
                            Template: {resume.template}
                          </p>
                        </div>

                        {/* Menu Dropdown */}
                        <div className="relative shrink-0 ml-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowResumeMenu(
                                showResumeMenu === resume.id ? null : resume.id,
                              );
                            }}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <FiMoreVertical className="w-4 h-4 text-gray-500" />
                          </button>

                          {showResumeMenu === resume.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-10"
                            >
                              {[
                                {
                                  icon: FiEdit,
                                  label: "Edit",
                                  color: "text-gray-700",
                                },
                                {
                                  icon: FiEye,
                                  label: "View",
                                  color: "text-gray-700",
                                },
                                {
                                  icon: FiDownload,
                                  label: "Download",
                                  color: "text-gray-700",
                                },
                                {
                                  icon: FiCopy,
                                  label: "Duplicate",
                                  color: "text-gray-700",
                                },
                                {
                                  icon: FiTrash2,
                                  label: "Delete",
                                  color: "text-red-500",
                                },
                              ].map((action) => (
                                <button
                                  key={action.label}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                  onClick={() => setShowResumeMenu(null)}
                                >
                                  <action.icon
                                    className={`w-4 h-4 ${action.color}`}
                                  />
                                  <span className={action.color}>
                                    {action.label}
                                  </span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1.5">
                          <FiEye className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-600">
                            {resume.views}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiDownload className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-600">
                            {resume.downloads}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiClock className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-600">
                            {resume.lastEdited}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <StatusIcon
                              className={`w-4 h-4 ${
                                resume.status === "completed"
                                  ? "text-emerald-500"
                                  : resume.status === "in-progress"
                                    ? "text-amber-500"
                                    : "text-gray-500"
                              }`}
                            />
                            <span className="text-xs font-medium text-gray-600">
                              {resume.status === "completed"
                                ? "Completed"
                                : resume.status === "in-progress"
                                  ? "In Progress"
                                  : "Draft"}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-gray-900">
                            {resume.progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${resume.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-linear-to-r from-[#c40116] to-[#be0117] rounded-full relative"
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Empty State */}
        {filteredResumes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-4">
              <HiOutlineDocumentDuplicate className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No resumes found
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first resume to get started
            </p>
            <button
              onClick={() => router.push("/choose-template")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transition-all duration-300"
            >
              <FiPlus className="w-5 h-5" />
              Create Resume
            </button>
          </motion.div>
        )}

        <BillingHistoryModal
          isOpen={showBillingHistory}
          onClose={() => setShowBillingHistory(false)}
          records={billingRecords}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
