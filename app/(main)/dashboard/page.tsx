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
//   FiCalendar,
//   FiCheckCircle,
//   FiClock,
//   FiStar,
//   FiCreditCard,
//   FiCpu,
//   FiHardDrive,
//   FiUsers,
//   FiAward,
//   FiTrendingUp,
//   FiGift,
//   FiShield,
//   FiTrash2,
//   FiCopy,
//   FiShare2,
//   FiExternalLink,
//   FiLogOut,
//   FiSettings,
//   FiBell,
//   FiMoon,
//   FiSun,
// } from "react-icons/fi";
// import {
//   HiOutlineDocumentDuplicate,
//   HiOutlineTemplate,
//   HiOutlineSparkles,
//   HiOutlineChip,
//   HiOutlineBadgeCheck,
// } from "react-icons/hi";
// import { useRouter } from "next/navigation";
// import { getLocalStorage, removeLocalStorage } from "@/app/utils";
// import { User } from "@/app/types/user.types";

// const DashboardPage = () => {
//   const router = useRouter();
//   const [greeting, setGreeting] = useState("");
//   const [showResumeMenu, setShowResumeMenu] = useState<string | null>(null);
//   const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   const userDetails = getLocalStorage<User>("user_details");
//   const userName = userDetails?.firstName || "User";
//   const userEmail = userDetails?.email || "user@example.com";
//   const userPhone = userDetails?.phone || "+1 234 567 890";
//   const userLocation = userDetails?.city
//     ? `${userDetails.city}, ${userDetails.country || "USA"}`
//     : "New York, USA";

//   const userStats = {
//     totalResumes: 8,
//     completedResumes: 5,
//     inProgressResumes: 3,
//     totalViews: 245,
//     totalDownloads: 89,
//     profileStrength: 85,
//   };

//   const currentPlan = {
//     name: "Professional",
//     price: "$19.99",
//     interval: "month",
//     status: "active",
//     nextBilling: "March 15, 2024",
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
//       { name: "Custom Domain", included: false, icon: FiExternalLink },
//     ],
//   };

//   const availablePlans = [
//     {
//       id: "basic",
//       name: "Basic",
//       price: "$9.99",
//       interval: "month",
//       features: ["5 Resumes", "Basic Templates", "Email Support"],
//       popular: false,
//       color: "gray",
//     },
//     {
//       id: "professional",
//       name: "Professional",
//       price: "$19.99",
//       interval: "month",
//       features: [
//         "Unlimited Resumes",
//         "Premium Templates",
//         "AI Suggestions",
//         "Priority Support",
//       ],
//       popular: true,
//       color: "red",
//     },
//     {
//       id: "enterprise",
//       name: "Enterprise",
//       price: "$39.99",
//       interval: "month",
//       features: [
//         "Everything in Pro",
//         "Team Access",
//         "API Access",
//         "Dedicated Manager",
//       ],
//       popular: false,
//       color: "purple",
//     },
//   ];

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

//   const handleLogout = () => {
//     // Clear all local storage
//     removeLocalStorage("user_details");
//     removeLocalStorage("fullResumeData");
//     removeLocalStorage("chosenTemplate");
//     removeLocalStorage("accessToken");

//     // Redirect to login page
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
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
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
//               className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-1 bg-gradient-to-r from-[#c40116] to-[#be0117]"></div>
//               <div className="p-8 text-center">
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.2, type: "spring", damping: 10 }}
//                   className="inline-flex items-center justify-center w-20 h-20 mb-6"
//                 >
//                   <div className="absolute w-20 h-20 bg-gradient-to-r from-[#c40116]/10 to-[#be0117]/10 rounded-full blur-xl"></div>
//                   <div className="relative w-20 h-20 bg-gradient-to-br from-[#c40116] to-[#be0117] rounded-2xl shadow-xl flex items-center justify-center transform hover:rotate-6 transition-transform">
//                     <FiLogOut className="w-10 h-10 text-white" />
//                   </div>
//                 </motion.div>

//                 <motion.h2
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="text-2xl font-bold text-gray-900 mb-3"
//                 >
//                   Ready to Leave?
//                 </motion.h2>

//                 <motion.p
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 }}
//                   className="text-gray-600 mb-8"
//                 >
//                   Are you sure you want to logout? You can always sign back in.
//                 </motion.p>

//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5 }}
//                   className="flex gap-3"
//                 >
//                   <button
//                     onClick={() => setShowLogoutModal(false)}
//                     className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleLogout}
//                     className="flex-1 px-4 py-3 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
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

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Logout Button */}
//         {/* <div className="flex justify-end">

//               <button
//                 onClick={() => setShowLogoutModal(true)}
//                 className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transform hover:scale-105 transition-all duration-300 group relative"
//               >
//                 <FiLogOut className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
//                 <span>Logout</span>
//                 <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//                   Sign out
//                 </span>
//               </button>

//                    </div> */}
//         {/* Welcome Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8 bg-gradient-to-r from-[#c40116]/5 to-[#be0117]/5 rounded-3xl p-8 border border-[#c40116]/10"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <motion.h2
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="text-4xl font-bold text-gray-900 mb-2"
//               >
//                 {greeting},{" "}
//                 <span className="bg-gradient-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
//                   {userName}
//                 </span>
//                 !
//               </motion.h2>
//               <motion.p
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="text-gray-600 text-lg"
//               >
//                 Welcome back to your resume dashboard. Here's what's happening
//                 today.
//               </motion.p>
//             </div>
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.4, type: "spring", damping: 10 }}
//               className="hidden md:block"
//             >
//               <div className="w-24 h-24 bg-gradient-to-br from-[#c40116] to-[#be0117] rounded-3xl rotate-12 shadow-2xl flex items-center justify-center">
//                 <FiFileText className="w-12 h-12 text-white" />
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* User Profile and Stats Cards */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
//         >
//           {/* Profile Card */}
//           <motion.div
//             variants={itemVariants}
//             whileHover={{ y: -5 }}
//             className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-500"
//           >
//             <div className="bg-gradient-to-r from-[#c40116] to-[#be0117] px-6 py-4 relative overflow-hidden">
//               <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
//               <h3 className="text-lg font-semibold text-white flex items-center gap-2">
//                 <FiUser className="w-5 h-5" />
//                 Profile Information
//               </h3>
//             </div>
//             <div className="p-6">
//               <div className="flex items-start gap-6 flex-wrap md:flex-nowrap">
//                 <motion.div
//                   whileHover={{ scale: 1.05, rotate: 2 }}
//                   className="w-24 h-24 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-2xl flex items-center justify-center border-2 border-[#c40116]/20 shadow-lg"
//                 >
//                   <span className="text-4xl font-bold text-[#c40116]">
//                     {userName.charAt(0)}
//                   </span>
//                 </motion.div>
//                 <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <motion.div whileHover={{ x: 5 }} className="group">
//                     <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
//                       <FiUser className="w-3 h-3" />
//                       Full Name
//                     </p>
//                     <p className="font-medium text-gray-900 group-hover:text-[#c40116] transition-colors">
//                       {userName}
//                     </p>
//                   </motion.div>
//                   <motion.div whileHover={{ x: 5 }} className="group">
//                     <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
//                       <FiMail className="w-3 h-3" />
//                       Email
//                     </p>
//                     <p className="font-medium text-gray-900 group-hover:text-[#c40116] transition-colors">
//                       {userEmail}
//                     </p>
//                   </motion.div>
//                   <motion.div whileHover={{ x: 5 }} className="group">
//                     <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
//                       <FiPhone className="w-3 h-3" />
//                       Phone
//                     </p>
//                     <p className="font-medium text-gray-900 group-hover:text-[#c40116] transition-colors">
//                       {userPhone}
//                     </p>
//                   </motion.div>
//                   <motion.div whileHover={{ x: 5 }} className="group">
//                     <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
//                       <FiMapPin className="w-3 h-3" />
//                       Location
//                     </p>
//                     <p className="font-medium text-gray-900 group-hover:text-[#c40116] transition-colors">
//                       {userLocation}
//                     </p>
//                   </motion.div>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setShowLogoutModal(true)}
//                 className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transform hover:scale-105 transition-all duration-300 group relative"
//               >
//                 <FiLogOut className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
//                 <span>Logout</span>
//                 <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//                   Sign out
//                 </span>
//               </button>
//               <motion.div
//                 whileHover={{ x: 5 }}
//                 className="mt-6 pt-6 border-t border-gray-200"
//               >
//                 <button className="text-sm text-[#c40116] hover:text-[#be0117] font-medium flex items-center gap-2 group">
//                   <span>Edit Profile</span>
//                   <FiExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* Stats Card */}
//           <motion.div
//             variants={itemVariants}
//             whileHover={{ y: -5 }}
//             className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-500"
//           >
//             <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
//               <h3 className="text-lg font-semibold text-white flex items-center gap-2">
//                 <FiTrendingUp className="w-5 h-5" />
//                 Quick Stats
//               </h3>
//             </div>
//             <div className="p-6">
//               <div className="space-y-4">
//                 {[
//                   {
//                     label: "Total Resumes",
//                     value: userStats.totalResumes,
//                     color: "gray-900",
//                   },
//                   {
//                     label: "Completed",
//                     value: userStats.completedResumes,
//                     color: "green-600",
//                   },
//                   {
//                     label: "In Progress",
//                     value: userStats.inProgressResumes,
//                     color: "yellow-600",
//                   },
//                   {
//                     label: "Total Views",
//                     value: userStats.totalViews,
//                     color: "blue-600",
//                   },
//                   {
//                     label: "Downloads",
//                     value: userStats.totalDownloads,
//                     color: "purple-600",
//                   },
//                 ].map((stat, index) => (
//                   <motion.div
//                     key={index}
//                     whileHover={{ x: 5 }}
//                     className="flex items-center justify-between group border-b border-gray-100 pb-2 last:border-0"
//                   >
//                     <span className="text-gray-600 group-hover:text-gray-900 transition-colors">
//                       {stat.label}
//                     </span>
//                     <span
//                       className={`text-2xl font-bold text-${stat.color} group-hover:scale-110 transition-transform`}
//                     >
//                       {stat.value}
//                     </span>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Current Plan Section */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="mb-8"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//               <FiCreditCard className="w-5 h-5 text-[#c40116]" />
//               Current Plan
//             </h3>
//             <button
//               onClick={() => setSelectedPlan(selectedPlan ? null : "upgrade")}
//               className="text-sm text-[#c40116] hover:text-[#be0117] font-medium"
//             >
//               {selectedPlan ? "Hide Plans" : "Change Plan →"}
//             </button>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Active Plan Card */}
//             <motion.div
//               variants={itemVariants}
//               whileHover={{ y: -5 }}
//               className="lg:col-span-2 bg-white rounded-3xl shadow-lg border-2 border-[#c40116]/20 overflow-hidden hover:shadow-xl transition-all duration-500"
//             >
//               <div className="p-6">
//                 <div className="flex items-start justify-between mb-6">
//                   <div>
//                     <div className="flex items-center gap-3 mb-2">
//                       <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
//                         ACTIVE
//                       </span>
//                       <span className="text-sm text-gray-500">
//                         Next billing: {currentPlan.nextBilling}
//                       </span>
//                     </div>
//                     <h4 className="text-2xl font-bold text-gray-900">
//                       {currentPlan.name} Plan
//                     </h4>
//                     <p className="text-gray-600 mt-1">
//                       {currentPlan.price}/{currentPlan.interval}
//                     </p>
//                   </div>
//                   <div className="p-3 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl">
//                     <HiOutlineBadgeCheck className="w-8 h-8 text-[#c40116]" />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {currentPlan.features.map((feature, index) => (
//                     <div key={index} className="flex items-center gap-3">
//                       <div
//                         className={`p-1.5 rounded-lg ${
//                           feature.included
//                             ? "bg-green-100 text-green-600"
//                             : "bg-gray-100 text-gray-400"
//                         }`}
//                       >
//                         <feature.icon className="w-4 h-4" />
//                       </div>
//                       <span
//                         className={`text-sm ${
//                           feature.included ? "text-gray-700" : "text-gray-400"
//                         }`}
//                       >
//                         {feature.name}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-4">
//                   <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
//                     Cancel Plan
//                   </button>
//                   <button className="px-4 py-2 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 transition-all text-sm font-medium">
//                     Upgrade Plan
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Available Plans */}
//         <AnimatePresence>
//           {selectedPlan && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               className="mb-8"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                   <FiGift className="w-5 h-5 text-[#c40116]" />
//                   Available Plans
//                 </h3>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {availablePlans.map((plan) => (
//                   <motion.div
//                     key={plan.id}
//                     whileHover={{ y: -5 }}
//                     className={`bg-white rounded-3xl shadow-lg border-2 overflow-hidden hover:shadow-xl transition-all duration-500 ${
//                       plan.popular
//                         ? "border-[#c40116]"
//                         : "border-gray-200 hover:border-[#c40116]/50"
//                     }`}
//                   >
//                     {plan.popular && (
//                       <div className="bg-gradient-to-r from-[#c40116] to-[#be0117] text-white text-center py-2 text-sm font-medium">
//                         Most Popular
//                       </div>
//                     )}
//                     <div className="p-6">
//                       <h4 className="text-xl font-bold text-gray-900 mb-2">
//                         {plan.name}
//                       </h4>
//                       <div className="mb-4">
//                         <span className="text-3xl font-bold text-gray-900">
//                           {plan.price}
//                         </span>
//                         <span className="text-gray-500">/{plan.interval}</span>
//                       </div>
//                       <ul className="space-y-3 mb-6">
//                         {plan.features.map((feature, index) => (
//                           <li
//                             key={index}
//                             className="flex items-center gap-2 text-sm text-gray-600"
//                           >
//                             <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
//                             <span>{feature}</span>
//                           </li>
//                         ))}
//                       </ul>
//                       <button
//                         className={`w-full py-3 rounded-lg font-medium transition-all ${
//                           plan.id === "professional"
//                             ? "bg-gradient-to-r from-[#c40116] to-[#be0117] text-white hover:shadow-lg hover:shadow-[#c40116]/25"
//                             : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                         }`}
//                       >
//                         {plan.id === "professional"
//                           ? "Current Plan"
//                           : "Switch Plan"}
//                       </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Resumes Section */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//               <FiFileText className="w-5 h-5 text-[#c40116]" />
//               Your Resumes
//             </h3>
//             <div className="flex items-center gap-3">
//               <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20">
//                 <option>All Resumes</option>
//                 <option>Completed</option>
//                 <option>In Progress</option>
//                 <option>Drafts</option>
//               </select>
//               <button
//                 onClick={() => router.push("/choose-template")}
//                 className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 transition-all"
//               >
//                 <FiPlus className="w-4 h-4" />
//                 New Resume
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {resumes.map((resume) => {
//               const StatusIcon = getStatusIcon(resume.status);
//               return (
//                 <motion.div
//                   key={resume.id}
//                   variants={itemVariants}
//                   whileHover={{ y: -5 }}
//                   className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
//                 >
//                   {/* Thumbnail */}
//                   <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                     <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
//                       <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
//                         <FiEye className="w-4 h-4 text-gray-700" />
//                       </button>
//                       <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
//                         <FiDownload className="w-4 h-4 text-gray-700" />
//                       </button>
//                       <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
//                         <FiEdit className="w-4 h-4 text-gray-700" />
//                       </button>
//                     </div>
//                     <div className="absolute top-3 left-3">
//                       <span
//                         className={`text-xs px-2 py-1 rounded-full ${getStatusColor(resume.status)}`}
//                       >
//                         {resume.status}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="p-4">
//                     <div className="flex items-start justify-between mb-2">
//                       <div>
//                         <h4 className="font-semibold text-gray-900 group-hover:text-[#c40116] transition-colors">
//                           {resume.name}
//                         </h4>
//                         <p className="text-xs text-gray-500 mt-1">
//                           Template: {resume.template}
//                         </p>
//                       </div>
//                       <div className="relative">
//                         <button
//                           onClick={() =>
//                             setShowResumeMenu(
//                               showResumeMenu === resume.id ? null : resume.id,
//                             )
//                           }
//                           className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//                         >
//                           <FiMoreVertical className="w-4 h-4 text-gray-500" />
//                         </button>
//                         {showResumeMenu === resume.id && (
//                           <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
//                             {[
//                               "Edit",
//                               "View",
//                               "Download",
//                               "Duplicate",
//                               "Delete",
//                             ].map((action) => (
//                               <button
//                                 key={action}
//                                 className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
//                                 onClick={() => setShowResumeMenu(null)}
//                               >
//                                 {action === "Edit" && (
//                                   <FiEdit className="w-4 h-4" />
//                                 )}
//                                 {action === "View" && (
//                                   <FiEye className="w-4 h-4" />
//                                 )}
//                                 {action === "Download" && (
//                                   <FiDownload className="w-4 h-4" />
//                                 )}
//                                 {action === "Duplicate" && (
//                                   <FiCopy className="w-4 h-4" />
//                                 )}
//                                 {action === "Delete" && (
//                                   <FiTrash2 className="w-4 h-4 text-red-500" />
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
//                     <div className="flex items-center gap-4 mt-3">
//                       <div className="flex items-center gap-1">
//                         <FiEye className="w-3 h-3 text-gray-400" />
//                         <span className="text-xs text-gray-600">
//                           {resume.views}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <FiDownload className="w-3 h-3 text-gray-400" />
//                         <span className="text-xs text-gray-600">
//                           {resume.downloads}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <FiClock className="w-3 h-3 text-gray-400" />
//                         <span className="text-xs text-gray-600">
//                           {resume.lastEdited}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Progress */}
//                     <div className="mt-4">
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center gap-2">
//                           <StatusIcon
//                             className={`w-4 h-4 ${
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
//                       <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-gradient-to-r from-[#c40116] to-[#be0117] transition-all duration-500"
//                           style={{ width: `${resume.progress}%` }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>

//           {/* View All Link */}
//           <div className="mt-8 text-center">
//             <button className="text-[#c40116] hover:text-[#be0117] font-medium inline-flex items-center gap-2 group">
//               View All Resumes
//               <FiExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </button>
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
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiStar,
  FiCreditCard,
  FiCpu,
  FiHardDrive,
  FiUsers,
  FiAward,
  FiTrendingUp,
  FiGift,
  FiShield,
  FiTrash2,
  FiCopy,
  FiShare2,
  FiExternalLink,
  FiLogOut,
  FiSettings,
  FiBell,
  FiMoon,
  FiSun,
  FiMenu,
  FiX,
} from "react-icons/fi";
import {
  HiOutlineDocumentDuplicate,
  HiOutlineTemplate,
  HiOutlineSparkles,
  HiOutlineChip,
  HiOutlineBadgeCheck,
} from "react-icons/hi";
import { useRouter } from "next/navigation";
import { getLocalStorage, removeLocalStorage } from "@/app/utils";
import { User } from "@/app/types/user.types";

const DashboardPage = () => {
  const router = useRouter();
  const [greeting, setGreeting] = useState("");
  const [showResumeMenu, setShowResumeMenu] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Resumes");

  const userDetails = getLocalStorage<User>("user_details");
  const userName = userDetails?.firstName || "User";
  const userEmail = userDetails?.email || "user@example.com";
  const userPhone = userDetails?.phone || "+1 234 567 890";
  const userLocation = userDetails?.city
    ? `${userDetails.city}, ${userDetails.country || "USA"}`
    : "New York, USA";

  const userStats = {
    totalResumes: 8,
    completedResumes: 5,
    inProgressResumes: 3,
    totalViews: 245,
    totalDownloads: 89,
    profileStrength: 85,
  };

  const currentPlan = {
    name: "Professional",
    price: "$19.99",
    interval: "month",
    status: "active",
    nextBilling: "March 15, 2024",
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
      { name: "Custom Domain", included: false, icon: FiExternalLink },
    ],
  };

  const availablePlans = [
    {
      id: "basic",
      name: "Basic",
      price: "$9.99",
      interval: "month",
      features: ["5 Resumes", "Basic Templates", "Email Support"],
      popular: false,
      color: "gray",
    },
    {
      id: "professional",
      name: "Professional",
      price: "$19.99",
      interval: "month",
      features: [
        "Unlimited Resumes",
        "Premium Templates",
        "AI Suggestions",
        "Priority Support",
      ],
      popular: true,
      color: "red",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$39.99",
      interval: "month",
      features: [
        "Everything in Pro",
        "Team Access",
        "API Access",
        "Dedicated Manager",
      ],
      popular: false,
      color: "purple",
    },
  ];

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
        return "text-green-600 bg-green-100 border-green-200";
      case "in-progress":
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">


      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
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
              <div className="p-1 bg-gradient-to-r from-[#c40116] to-[#be0117]"></div>
              <div className="p-6 sm:p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 10 }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6"
                >
                  <div className="absolute w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#c40116]/10 to-[#be0117]/10 rounded-full blur-xl"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#c40116] to-[#be0117] rounded-2xl shadow-xl flex items-center justify-center transform hover:rotate-6 transition-transform">
                    <FiLogOut className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3"
                >
                  Ready to Leave?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8"
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
                    className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Welcome Section - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8 bg-gradient-to-r from-[#c40116]/5 to-[#be0117]/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-[#c40116]/10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div className="w-full sm:w-auto">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2"
              >
                {greeting},{" "}
                <span className="bg-gradient-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent block sm:inline">
                  {userName}
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm sm:text-base lg:text-lg text-gray-600"
              >
                Welcome back to your resume dashboard. Here's what's happening
                today.
              </motion.p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", damping: 10 }}
              className="hidden sm:block"
            >
              <div className="w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-br from-[#c40116] to-[#be0117] rounded-2xl lg:rounded-3xl rotate-12 shadow-2xl flex items-center justify-center">
                <FiFileText className="w-8 h-8 lg:w-12 lg:h-12 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* User Profile and Stats Cards - Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          {/* Profile Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-500"
          >
            <div className="bg-gradient-to-r from-[#c40116] to-[#be0117] px-4 sm:px-6 py-3 sm:py-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
              <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
                Profile Information
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl sm:rounded-2xl flex items-center justify-center border-2 border-[#c40116]/20 shadow-lg flex-shrink-0"
                >
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#c40116]">
                    {userName.charAt(0)}
                  </span>
                </motion.div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
                  <motion.div whileHover={{ x: 5 }} className="group">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <FiUser className="w-3 h-3" />
                      Full Name
                    </p>
                    <p className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-[#c40116] transition-colors break-words">
                      {userName}
                    </p>
                  </motion.div>
                  <motion.div whileHover={{ x: 5 }} className="group">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <FiMail className="w-3 h-3" />
                      Email
                    </p>
                    <p className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-[#c40116] transition-colors break-words">
                      {userEmail}
                    </p>
                  </motion.div>
                  <motion.div whileHover={{ x: 5 }} className="group">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <FiPhone className="w-3 h-3" />
                      Phone
                    </p>
                    <p className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-[#c40116] transition-colors break-words">
                      {userPhone}
                    </p>
                  </motion.div>
                  <motion.div whileHover={{ x: 5 }} className="group">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <FiMapPin className="w-3 h-3" />
                      Location
                    </p>
                    <p className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-[#c40116] transition-colors break-words">
                      {userLocation}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Logout Button - Mobile Optimized */}
              <div className="mt-4 sm:mt-6">
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#c40116]/25 transform hover:scale-105 transition-all duration-300 group relative"
                >
                  <FiLogOut className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Logout</span>
                </button>
              </div>

              <motion.div
                whileHover={{ x: 5 }}
                className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200"
              >
                <button className="text-xs sm:text-sm text-[#c40116] hover:text-[#be0117] font-medium flex items-center gap-2 group">
                  <span>Edit Profile</span>
                  <FiExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-500"
          >
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 sm:px-6 py-3 sm:py-4">
              <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                <FiTrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                Quick Stats
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    label: "Total Resumes",
                    value: userStats.totalResumes,
                    color: "gray-900",
                  },
                  {
                    label: "Completed",
                    value: userStats.completedResumes,
                    color: "green-600",
                  },
                  {
                    label: "In Progress",
                    value: userStats.inProgressResumes,
                    color: "yellow-600",
                  },
                  {
                    label: "Total Views",
                    value: userStats.totalViews,
                    color: "blue-600",
                  },
                  {
                    label: "Downloads",
                    value: userStats.totalDownloads,
                    color: "purple-600",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between group border-b border-gray-100 pb-2 last:border-0"
                  >
                    <span className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                      {stat.label}
                    </span>
                    <span
                      className={`text-lg sm:text-2xl font-bold text-${stat.color} group-hover:scale-110 transition-transform`}
                    >
                      {stat.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Current Plan Section - Responsive */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
              <FiCreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
              Current Plan
            </h3>
            <button
              onClick={() => setSelectedPlan(selectedPlan ? null : "upgrade")}
              className="text-xs sm:text-sm text-[#c40116] hover:text-[#be0117] font-medium"
            >
              {selectedPlan ? "Hide Plans" : "Change Plan →"}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Active Plan Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl shadow-lg border-2 border-[#c40116]/20 overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4 sm:mb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
                        ACTIVE
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500">
                        Next billing: {currentPlan.nextBilling}
                      </span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {currentPlan.name} Plan
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">
                      {currentPlan.price}/{currentPlan.interval}
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl">
                    <HiOutlineBadgeCheck className="w-6 h-6 sm:w-8 sm:h-8 text-[#c40116]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {currentPlan.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      <div
                        className={`p-1 sm:p-1.5 rounded-lg ${
                          feature.included
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <feature.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                      <span
                        className={`text-xs sm:text-sm ${
                          feature.included ? "text-gray-700" : "text-gray-400"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <button className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm font-medium">
                    Cancel Plan
                  </button>
                  <button className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 transition-all text-xs sm:text-sm font-medium">
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Available Plans - Responsive */}
        <AnimatePresence>
          {selectedPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-6 sm:mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <FiGift className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
                  Available Plans
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {availablePlans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ y: -5 }}
                    className={`bg-white rounded-2xl sm:rounded-3xl shadow-lg border-2 overflow-hidden hover:shadow-xl transition-all duration-500 ${
                      plan.popular
                        ? "border-[#c40116]"
                        : "border-gray-200 hover:border-[#c40116]/50"
                    }`}
                  >
                    {plan.popular && (
                      <div className="bg-gradient-to-r from-[#c40116] to-[#be0117] text-white text-center py-1.5 sm:py-2 text-xs sm:text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    <div className="p-4 sm:p-6">
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </h4>
                      <div className="mb-3 sm:mb-4">
                        <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                          {plan.price}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">
                          /{plan.interval}
                        </span>
                      </div>
                      <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                        {plan.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
                          >
                            <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                            <span className="break-words">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        className={`w-full py-2.5 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                          plan.id === "professional"
                            ? "bg-gradient-to-r from-[#c40116] to-[#be0117] text-white hover:shadow-lg hover:shadow-[#c40116]/25"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {plan.id === "professional"
                          ? "Current Plan"
                          : "Switch Plan"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resumes Section - Responsive */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
              <FiFileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
              Your Resumes
            </h3>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20"
              >
                <option>All Resumes</option>
                <option>Completed</option>
                <option>In Progress</option>
                <option>Draft</option>
              </select>
              <button
                onClick={() => router.push("/choose-template")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white text-xs sm:text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-[#c40116]/25 transition-all"
              >
                <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                New Resume
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredResumes.map((resume) => {
              const StatusIcon = getStatusIcon(resume.status);
              return (
                <motion.div
                  key={resume.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Thumbnail */}
                  <div className="h-28 sm:h-32 lg:h-40 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 sm:p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                        <FiEye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                      </button>
                      <button className="p-1.5 sm:p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                        <FiDownload className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                      </button>
                      <button className="p-1.5 sm:p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                        <FiEdit className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                      </button>
                    </div>
                    <div className="absolute top-2 left-2">
                      <span
                        className={`text-xs px-2 py-0.5 sm:py-1 rounded-full ${getStatusColor(resume.status)}`}
                      >
                        {resume.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-[#c40116] transition-colors truncate">
                          {resume.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5 sm:mt-1 truncate">
                          Template: {resume.template}
                        </p>
                      </div>
                      <div className="relative flex-shrink-0 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowResumeMenu(
                              showResumeMenu === resume.id ? null : resume.id,
                            );
                          }}
                          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <FiMoreVertical className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                        </button>
                        {showResumeMenu === resume.id && (
                          <div className="absolute right-0 mt-2 w-36 sm:w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 sm:py-2 z-10">
                            {[
                              "Edit",
                              "View",
                              "Download",
                              "Duplicate",
                              "Delete",
                            ].map((action) => (
                              <button
                                key={action}
                                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-left text-xs sm:text-sm hover:bg-gray-50 flex items-center gap-2"
                                onClick={() => setShowResumeMenu(null)}
                              >
                                {action === "Edit" && (
                                  <FiEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                                )}
                                {action === "View" && (
                                  <FiEye className="w-3 h-3 sm:w-4 sm:h-4" />
                                )}
                                {action === "Download" && (
                                  <FiDownload className="w-3 h-3 sm:w-4 sm:h-4" />
                                )}
                                {action === "Duplicate" && (
                                  <FiCopy className="w-3 h-3 sm:w-4 sm:h-4" />
                                )}
                                {action === "Delete" && (
                                  <FiTrash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                                )}
                                <span
                                  className={
                                    action === "Delete" ? "text-red-500" : ""
                                  }
                                >
                                  {action}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-3">
                      <div className="flex items-center gap-1">
                        <FiEye className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">
                          {resume.views}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiDownload className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">
                          {resume.downloads}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiClock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">
                          {resume.lastEdited}
                        </span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-3 sm:mt-4">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <StatusIcon
                            className={`w-3 h-3 sm:w-4 sm:h-4 ${
                              resume.status === "completed"
                                ? "text-green-500"
                                : resume.status === "in-progress"
                                  ? "text-yellow-500"
                                  : "text-gray-500"
                            }`}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-700">
                          {resume.progress}%
                        </span>
                      </div>
                      <div className="h-1 sm:h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#c40116] to-[#be0117] transition-all duration-500"
                          style={{ width: `${resume.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* View All Link */}
          <div className="mt-6 sm:mt-8 text-center">
            <button className="text-xs sm:text-sm text-[#c40116] hover:text-[#be0117] font-medium inline-flex items-center gap-2 group">
              View All Resumes
              <FiExternalLink className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
