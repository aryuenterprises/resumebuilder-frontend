// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import {
//   FiFileText,
//   FiUsers,
//   FiAward,
//   FiHeart,
//   FiTarget,
//   FiEye,
//   FiTrendingUp,
//   FiShield,
//   FiClock,
//   FiStar,
//   FiMail,
//   FiPhone,
//   FiMapPin,
//   FiGithub,
//   FiLinkedin,
//   FiTwitter,
//   FiCheckCircle,
//   FiArrowRight,
// } from "react-icons/fi";
// import {
//   HiOutlineSparkles,
//   HiOutlineTemplate,
//   HiOutlineDocumentText,
//   HiOutlineChip,
//   HiOutlineBadgeCheck,
// } from "react-icons/hi";
// import Link from "next/link";
// import Image from "next/image";
// import Testimonial from "@/app/components/sections/Testimonial";

// const stats = [
//   { value: "50K+", label: "Active Users", icon: FiUsers },
//   { value: "100K+", label: "Resumes Created", icon: FiFileText },
//   { value: "15+", label: "Expert Templates", icon: HiOutlineTemplate },
//   { value: "98%", label: "Satisfaction Rate", icon: FiStar },
// ];

// const features = [
//   {
//     title: "AI-Powered Suggestions",
//     description:
//       "Get intelligent recommendations to optimize your resume for ATS systems and stand out from the crowd.",
//     icon: HiOutlineSparkles,
//     color: "from-indigo-500 to-purple-500",
//   },
//   {
//     title: "Professional Templates",
//     description:
//       "Choose from 15+ expertly designed templates tailored for different industries and career levels.",
//     icon: HiOutlineTemplate,
//     color: "from-indigo-600 to-indigo-500",
//   },
//   {
//     title: "Real-Time Preview",
//     description:
//       "See changes instantly with our live preview feature as you build your perfect resume.",
//     icon: HiOutlineDocumentText,
//     color: "from-emerald-500 to-teal-500",
//   },
//   {
//     title: "ATS Optimization",
//     description:
//       "Ensure your resume passes through Applicant Tracking Systems with our smart optimization tools.",
//     icon: HiOutlineChip,
//     color: "from-amber-500 to-orange-500",
//   },
//   {
//     title: "Secure & Private",
//     description:
//       "Your data is encrypted and protected. We take your privacy and security seriously.",
//     icon: FiShield,
//     color: "from-indigo-500 to-purple-500",
//   },
//   {
//     title: "24/7 Support",
//     description:
//       "Get help whenever you need it with our round-the-clock customer support team.",
//     icon: FiClock,
//     color: "from-pink-500 to-rose-500",
//   },
// ];

// const values = [
//   {
//     title: "Innovation",
//     description:
//       "We constantly push boundaries to bring you the latest in resume technology.",
//     icon: FiTrendingUp,
//   },
//   {
//     title: "Quality",
//     description:
//       "Every template and feature is crafted with meticulous attention to detail.",
//     icon: FiAward,
//   },
//   {
//     title: "User-Centric",
//     description:
//       "Your success is our success. We build features that truly help you achieve your goals.",
//     icon: FiHeart,
//   },
//   {
//     title: "Integrity",
//     description:
//       "We operate with transparency and honesty in everything we do.",
//     icon: FiEye,
//   },
// ];

// const team = [
//   {
//     name: "Sarah Johnson",
//     role: "Founder & CEO",
//     image:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
//   },
//   {
//     name: "Michael Chen",
//     role: "CTO",
//     image:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
//   },
//   {
//     name: "Emily Rodriguez",
//     role: "Head of Design",
//     image:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
//   },
//   {
//     name: "David Kim",
//     role: "Product Lead",
//     image:
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
//   },
// ];

// const AboutPage = () => {
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
//     <div className="min-h-screen bg-white overflow-x-hidden">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white">
//         <div className="absolute inset-0 opacity-10">
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage:
//                 "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
//               backgroundSize: "40px 40px",
//             }}
//           />
//         </div>

//         <div className="absolute top-20 -left-64 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-20 -right-64 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center max-w-4xl mx-auto"
//           >
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: "spring", damping: 10 }}
//               className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6 backdrop-blur-sm"
//             >
//               <FiFileText className="w-8 h-8 text-white" />
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
//             >
//               Empowering Future,
//               <span className="block bg-gradient-to-r from-yellow-300 to-amber-200 bg-clip-text text-transparent mt-2">
//                 Creates Career Success
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
//             >
//               We're on a mission to help professionals worldwide create
//               stunning, ATS-optimized resumes that open doors to new
//               opportunities.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center"
//             >
//               <Link
//                 href="/choose-template"
//                 className="group px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
//               >
//                 Start Building Free
//                 <FiArrowRight className="transition-transform group-hover:translate-x-1" />
//               </Link>
//               <Link
//                 href="/contact-us"
//                 className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300"
//               >
//                 Learn More
//               </Link>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* <div className="absolute bottom-0 left-0 right-0 border-0">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
//             <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
//           </svg>
//         </div> */}

//         <div className="absolute bottom-0 left-0 right-0">
//           <svg
//             viewBox="0 0 1440 100"
//             preserveAspectRatio="none"
//             className="w-full h-10"
//           >
//             <path d="M0 100L1440 0V100H0Z" fill="white" />
//           </svg>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid grid-cols-2 md:grid-cols-4 gap-6"
//           >
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className="text-center group"
//               >
//                 <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-50 rounded-xl mb-3 group-hover:scale-110 transition-transform">
//                   <stat.icon className="w-6 h-6 text-indigo-600" />
//                 </div>
//                 <div className="text-2xl font-bold text-gray-900 mb-1">
//                   {stat.value}
//                 </div>
//                 <div className="text-sm text-gray-500">{stat.label}</div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Our Story Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <h2 className="text-3xl font-bold text-gray-900 mb-4">
//                 Our Story
//               </h2>
//               <div className="space-y-4 text-gray-600">
//                 <p>
//                   Founded in 2020, ARYU SmartCV was born from a simple
//                   observation: talented professionals were struggling to create
//                   resumes that truly represented their skills and caught
//                   recruiters' attention.
//                 </p>
//                 <p>
//                   Our founder, Sarah Johnson, a former HR director with over 15
//                   years of experience, saw countless qualified candidates get
//                   overlooked due to poorly formatted resumes that failed to pass
//                   through ATS systems.
//                 </p>
//                 <p>
//                   She assembled a team of designers, developers, and recruitment
//                   experts to create a platform that combines beautiful design
//                   with smart technology. Today, ARYU SmartCV has helped over
//                   50,000 professionals land their dream jobs at companies like
//                   Google, Microsoft, and Amazon.
//                 </p>
//               </div>

//               <div className="mt-6 flex items-center gap-4">
//                 <div className="flex -space-x-2">
//                   {["SJ", "MC", "ER", "DK"].map((initial, i) => (
//                     <div
//                       key={i}
//                       className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
//                     >
//                       {initial}
//                     </div>
//                   ))}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   <span className="font-bold text-gray-900">15+</span> experts
//                   behind the scenes
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="relative"
//             >
//               <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//                 <img
//                   src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
//                   alt="Team collaboration"
//                   className="w-full h-auto object-cover"
//                   loading="lazy"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//               </div>

//               <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 max-w-xs">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
//                     <FiCheckCircle className="w-5 h-5 text-emerald-600" />
//                   </div>
//                   <div>
//                     <div className="text-xs text-gray-500">Success Rate</div>
//                     <div className="text-xl font-bold text-gray-900">98%</div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center max-w-3xl mx-auto mb-12"
//           >
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Why Choose ARYU SmartCV?
//             </h2>
//             <p className="text-lg text-gray-500">
//               We combine cutting-edge technology with expert design to help you
//               create the perfect resume.
//             </p>
//           </motion.div>

//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 whileHover={{ y: -5 }}
//                 className="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
//               >
//                 <div
//                   className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl mb-4 shadow-md`}
//                 >
//                   <feature.icon className="w-5 h-5 text-white" />
//                 </div>

//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   {feature.title}
//                 </h3>

//                 <p className="text-sm text-gray-600 leading-relaxed">
//                   {feature.description}
//                 </p>

//                 <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
//                     <FiCheckCircle className="w-3 h-3 text-white" />
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Values Section */}
//       <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center max-w-3xl mx-auto mb-12"
//           >
//             <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
//             <p className="text-lg text-indigo-100">
//               These principles guide everything we do
//             </p>
//           </motion.div>

//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//           >
//             {values.map((value, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className="text-center group"
//               >
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 backdrop-blur-sm">
//                   <value.icon className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
//                 <p className="text-indigo-100 text-sm">{value.description}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       <Testimonial />
//     </div>
//   );
// };

// export default AboutPage;

// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   FiUsers,
//   FiTrendingUp,
//   FiMapPin,
//   FiDollarSign,
//   FiShield,
//   FiHeart,
//   FiTarget,
//   FiEye,
//   FiCheckCircle,
//   FiArrowRight,
//   FiGlobe,
//   FiLock,
//   FiCreditCard,
//   FiAlertCircle,
//   FiXCircle,
//   FiMail,
// } from "react-icons/fi";
// import {
//   FaGraduationCap,
//   FaLaptopCode,
//   FaChartLine,
//   FaBuilding,
//   FaUserTie,
//   FaRegBuilding,
// } from "react-icons/fa";

// export default function AboutPage() {
//   const heroRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });

//   const stats = [
//     {
//       value: "10,000+",
//       label: "Resumes Built",
//       icon: FiUsers,
//       suffix: "and counting",
//     },
//     {
//       value: "50,000+",
//       label: "ATS Scores Checked",
//       icon: FiTrendingUp,
//       suffix: "across India",
//     },
//     {
//       value: "100+",
//       label: "Cities Reached",
//       icon: FiMapPin,
//       suffix: "from metros to Tier 2",
//     },
//     {
//       value: "₹49",
//       label: "Starting Price",
//       icon: FiDollarSign,
//       suffix: "10× cheaper than global tools",
//     },
//   ];

//   const ecosystem = [
//     {
//       name: "Aryu Academy",
//       icon: <FaGraduationCap className="w-6 h-6" />,
//       description:
//         "Ed-tech platform — courses in Python, data science, web development, digital marketing, and more.",
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       name: "Aryu Technologies",
//       icon: <FaLaptopCode className="w-6 h-6" />,
//       description:
//         "Technology solutions and software development for businesses across India.",
//       color: "from-indigo-500 to-purple-500",
//     },
//     {
//       name: "Aryu Agency",
//       icon: <FaChartLine className="w-6 h-6" />,
//       description:
//         "Digital marketing agency — SEO, paid ads, social media, and content strategy.",
//       color: "from-purple-500 to-pink-500",
//     },
//     {
//       name: "Aryu Enterprises",
//       icon: <FaBuilding className="w-6 h-6" />,
//       description:
//         "Business consulting and enterprise solutions for growing organisations.",
//       color: "from-emerald-500 to-teal-500",
//     },
//   ];

//   const careerStages = [
//     {
//       title: "Final-Year Students",
//       icon: "🎓",
//       description:
//         "Applying for campus placements at TCS, Infosys, Wipro, Cognizant, and more. PassATS helps you turn projects and internships into achievement-focused bullets that pass ATS — even with no full-time experience.",
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       title: "Fresh Graduates",
//       icon: "📚",
//       description:
//         "Entering the job market for the first time with a degree and limited work history. PassATS gives you a professional resume that competes with experienced candidates on ATS scoring.",
//       color: "from-indigo-500 to-purple-500",
//     },
//     {
//       title: "Working Professionals",
//       icon: "💼",
//       description:
//         "Ready for your next role, a promotion, or a career switch. PassATS helps you reframe experience as achievements, tailor your resume to each JD, and improve your ATS score before applying.",
//       color: "from-purple-500 to-pink-500",
//     },
//     {
//       title: "Career Switchers",
//       icon: "🔄",
//       description:
//         "Moving from one industry or function to another. PassATS helps you highlight transferable skills and reposition your experience for a new direction.",
//       color: "from-orange-500 to-red-500",
//     },
//     {
//       title: "Government / PSU Applicants",
//       icon: "🏛️",
//       description:
//         "Applying for banking, UPSC, PSU, or state government roles. PassATS provides English-format government resume templates with photo box, category fields, and declaration footer.",
//       color: "from-emerald-500 to-teal-500",
//     },
//   ];

//   const promises = [
//     {
//       icon: <FiShield />,
//       title: "Never Sell Your Data",
//       description:
//         "We will never sell your resume data to employers, recruiters, or data brokers.",
//     },
//     {
//       icon: <FiLock />,
//       title: "No AI Training Without Consent",
//       description:
//         "We will never use your resume content to train AI models without your explicit consent.",
//     },
//     {
//       icon: <FiCreditCard />,
//       title: "No Billing Tricks",
//       description:
//         "We will never auto-charge you without clear notice — no trial traps, no billing tricks.",
//     },
//     {
//       icon: <FiEye />,
//       title: "Real Numbers",
//       description:
//         "We will always show you real numbers — not inflated stats designed to look impressive.",
//     },
//     {
//       icon: <FiHeart />,
//       title: "Genuinely Useful Free Plan",
//       description:
//         "We will always offer a free plan that is genuinely useful — not a tease or that forces you to pay immediately.",
//     },
//     {
//       icon: <FiDollarSign />,
//       title: "Priced in INR",
//       description:
//         "We will always price in INR — because you earn in rupees, and you should pay in rupees.",
//     },
//   ];

//   return (
//     <>
//       {/* Hero Section */}
//       <section
//         ref={heroRef}
//         className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50"
//       >
//         <div className="relative z-10 max-w-5xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg border border-indigo-100 mb-6"
//           >
//             <FaUserTie className="w-4 h-4 text-indigo-600" />
//             <span className="text-sm font-medium text-indigo-700">
//               Our Story
//             </span>
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
//           >
//             We Built the Resume Tool
//             <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mt-2">
//               Indian Job Seekers Actually Needed!
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto"
//           >
//             PassATS is an AI-powered resume builder built from the ground up for
//             the Indian job market — by the team behind Aryu Academy, one of
//             India's growing ed-tech platforms.
//           </motion.p>
//         </div>
//       </section>

//       {/* The Problem Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-5xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//             >
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 mb-4">
//                 <FiAlertCircle className="w-3 h-3 text-red-600" />
//                 <span className="text-xs font-medium text-red-700 uppercase">
//                   The Problem
//                 </span>
//               </div>
//               <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
//                 The Gap No One
//                 <span className="block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
//                   Was Filling
//                 </span>
//               </h2>
//               <div className="mt-6 space-y-4 text-gray-600">
//                 <p>
//                   At Aryu Academy, we have trained thousands of students across
//                   India in Python, data science, full-stack development, digital
//                   marketing, and more. We watched them build real skills. Gain
//                   genuine confidence. Complete projects. Earn certificates.
//                 </p>
//                 <p className="font-semibold text-gray-800">
//                   Then we watched them struggle to get shortlisted.
//                 </p>
//                 <p>The problem was never their skills. It was their resume.</p>
//                 <div className="bg-red-50 rounded-xl p-4 border border-red-100">
//                   <p className="text-red-800 font-medium">
//                     75% of resumes are filtered out by ATS software before a
//                     human recruiter ever reads them.
//                   </p>
//                   <p className="text-gray-600 text-sm mt-2">
//                     Most job seekers don't know this. And most resume tools
//                     don't fix it — they just make the resume look better.
//                   </p>
//                 </div>
//                 <p className="font-semibold text-indigo-600">
//                   We wanted to build a tool that actually fixes the problem. Not
//                   just the appearance.
//                 </p>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white"
//             >
//               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <FiGlobe className="w-5 h-5 text-indigo-400" />
//                 Global Tools. Built for Global Markets.
//               </h3>
//               <p className="text-gray-300 text-sm mb-4">
//                 We looked at every major resume builder available to our
//                 students. All of them are well-built products. But none of them
//                 are built for India.
//               </p>
//               <div className="space-y-3">
//                 <div className="flex items-start gap-2">
//                   <FiXCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
//                   <span className="text-sm text-gray-300">
//                     They charge ₹2,000-4,000/month in USD
//                   </span>
//                 </div>
//                 <div className="flex items-start gap-2">
//                   <FiXCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
//                   <span className="text-sm text-gray-300">
//                     No Indian templates or campus placement formats
//                   </span>
//                 </div>
//                 <div className="flex items-start gap-2">
//                   <FiXCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
//                   <span className="text-sm text-gray-300">
//                     No INR pricing — students pay in foreign currency
//                   </span>
//                 </div>
//                 <div className="flex items-start gap-2">
//                   <FiXCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
//                   <span className="text-sm text-gray-300">
//                     No understanding of Indian hiring patterns or JD formats
//                   </span>
//                 </div>
//                 <div className="flex items-start gap-2">
//                   <FiXCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
//                   <span className="text-sm text-gray-300">
//                     Trial traps and confusing billing practices
//                   </span>
//                 </div>
//               </div>
//               <div className="mt-4 pt-4 border-t border-gray-700">
//                 <p className="text-indigo-300 text-sm font-medium">
//                   So we built PassATS to be:
//                 </p>
//                 <div className="mt-2 space-y-1">
//                   <p className="text-sm text-green-300">
//                     ✓ Priced in INR — ₹49/month to start
//                   </p>
//                   <p className="text-sm text-green-300">
//                     ✓ Templates built for Indian roles and campus placements
//                   </p>
//                   <p className="text-sm text-green-300">
//                     ✓ ATS scoring that checks what Indian ATS systems actually
//                     look for
//                   </p>
//                   <p className="text-sm text-green-300">
//                     ✓ JD tailoring trained on Indian job descriptions
//                   </p>
//                   <p className="text-sm text-green-300">
//                     ✓ Transparent billing — no trial traps, no hidden charges
//                   </p>
//                   <p className="text-sm text-green-300">
//                     ✓ Government and PSU English resume formats included
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 to-purple-600">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
//               PassATS by the Numbers
//             </h2>
//             <p className="text-indigo-100">Real impact. Real results.</p>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
//             {stats.map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
//               >
//                 <stat.icon className="w-8 h-8 text-white mx-auto mb-3" />
//                 <div className="text-3xl sm:text-4xl font-bold text-white">
//                   {stat.value}
//                 </div>
//                 <div className="text-sm text-indigo-100 mt-1">{stat.label}</div>
//                 <div className="text-xs text-indigo-200/70 mt-1">
//                   {stat.suffix}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* About Aryu Academy */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
//               <FaRegBuilding className="w-3 h-3 text-indigo-600" />
//               <span className="text-xs font-medium text-indigo-700 uppercase">
//                 Who We Are
//               </span>
//             </div>
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
//               Backed by{" "}
//               <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Aryu Academy
//               </span>
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
//             <div>
//               <p className="text-gray-600 leading-relaxed">
//                 PassATS is a product of Aryu Academy — an ed-tech platform based
//                 in Chennai, Tamil Nadu, that has been training students and
//                 working professionals in technology, digital marketing, and
//                 career-ready skills.
//               </p>
//               <p className="text-gray-600 leading-relaxed mt-4">
//                 Aryu Academy was built on a single belief: that the gap between
//                 learning a skill and getting hired for it should not exist. Our
//                 courses are practical, our instructors are industry
//                 professionals, and our focus has always been on real outcomes —
//                 not just certificates.
//               </p>
//               <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
//                 <p className="text-indigo-800 font-medium">
//                   PassATS is the next step in that mission. Once a student
//                   completes a course at Aryu Academy, they need a resume that
//                   communicates their new skills clearly, gets past ATS, and
//                   lands them interviews. PassATS is that bridge.
//                 </p>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
//               <h3 className="text-xl font-bold text-gray-900 mb-4">
//                 The Aryu Ecosystem
//               </h3>
//               <div className="space-y-4">
//                 {ecosystem.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="flex gap-3 p-3 rounded-xl hover:bg-white transition-all"
//                   >
//                     <div
//                       className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white flex-shrink-0`}
//                     >
//                       {item.icon}
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900">
//                         {item.name}
//                       </h4>
//                       <p className="text-sm text-gray-500">
//                         {item.description}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mission & Values */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
//               <FiTarget className="w-3 h-3 text-indigo-600" />
//               <span className="text-xs font-medium text-indigo-700 uppercase">
//                 Our Mission
//               </span>
//             </div>
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
//               What We Stand For
//             </h2>
//           </div>

//           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center mb-12">
//             <p className="text-xl leading-relaxed">
//               "To make every Indian job seeker — regardless of city, college, or
//               background — able to present their skills on a resume that gets
//               through ATS, gets read by recruiters, and gets them in the room."
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all">
//               <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
//                 <FiHeart className="w-6 h-6 text-blue-600" />
//               </div>
//               <h3 className="font-bold text-gray-900 mb-2">Honesty First</h3>
//               <p className="text-sm text-gray-500">
//                 No fake stats. No trial traps. No inflated numbers. We say what
//                 we do and do what we say.
//               </p>
//             </div>
//             <div className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all">
//               <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
//                 <FiGlobe className="w-6 h-6 text-indigo-600" />
//               </div>
//               <h3 className="font-bold text-gray-900 mb-2">India First</h3>
//               <p className="text-sm text-gray-500">
//                 Every feature, every template, every pricing decision is made
//                 with the Indian job seeker in mind.
//               </p>
//             </div>
//             <div className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all">
//               <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
//                 <FiTrendingUp className="w-6 h-6 text-purple-600" />
//               </div>
//               <h3 className="font-bold text-gray-900 mb-2">
//                 Outcomes Over Aesthetics
//               </h3>
//               <p className="text-sm text-gray-500">
//                 A beautiful resume that doesn't get viewed is useless. We
//                 optimize for results.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Career Stages */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
//               Built for{" "}
//               <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Every Stage of Your Career
//               </span>
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {careerStages.map((stage, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all"
//               >
//                 <div className="flex items-start gap-3">
//                   <div
//                     className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stage.color} flex items-center justify-center text-2xl`}
//                   >
//                     {stage.icon}
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-900 text-lg">
//                       {stage.title}
//                     </h3>
//                     <p className="text-sm text-gray-500 mt-1">
//                       {stage.description}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Promises Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-indigo-100 mb-4">
//               <FiShield className="w-3 h-3 text-indigo-600" />
//               <span className="text-xs font-medium text-indigo-700 uppercase">
//                 Our Promise
//               </span>
//             </div>
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
//               What We Promise You
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             {promises.map((promise, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.05 }}
//                 viewport={{ once: true }}
//                 className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-lg transition-all"
//               >
//                 <div className="flex items-start gap-3">
//                   <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
//                     {promise.icon}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900">
//                       {promise.title}
//                     </h3>
//                     <p className="text-sm text-gray-500 mt-1">
//                       {promise.description}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Location & CTA */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-4xl mx-auto text-center">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
//             <FiMapPin className="w-3 h-3 text-indigo-600" />
//             <span className="text-xs font-medium text-indigo-700 uppercase">
//               Based in Chennai
//             </span>
//           </div>
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
//             Building for All of India
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             PassATS is developed and maintained by the team at Aryu Academy,
//             headquartered in Chennai, Tamil Nadu. We are a team of educators,
//             engineers, and career coaches who have seen firsthand how much a
//             well-crafted resume can change someone's professional trajectory.
//           </p>
//           <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               href="/choose-template"
//               className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
//             >
//               Start Building Your Resume
//               <FiArrowRight className="w-4 h-4" />
//             </Link>
//             <Link
//               href="/contact"
//               className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all"
//             >
//               Contact Our Team
//               <FiArrowRight className="w-4 h-4" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
//               <FiMail className="w-3 h-3 text-indigo-600" />
//               <span className="text-xs font-medium text-indigo-700 uppercase">
//                 Get in Touch
//               </span>
//             </div>
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
//               Connect With{" "}
//               <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Our Team
//               </span>
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
//             {/* Email Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               viewport={{ once: true }}
//               className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all"
//             >
//               <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
//                 <FiMail className="w-7 h-7 text-white" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">Email Us</h3>
//               <a
//                 href="mailto:support@aryuacademy.com"
//                 className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
//               >
//                 support@aryuacademy.com
//               </a>
//               <p className="text-sm text-gray-500 mt-2">
//                 For support, feedback, or partnership enquiries
//               </p>
//             </motion.div>

//             {/* Website Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               viewport={{ once: true }}
//               className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all"
//             >
//               <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
//                 <FiGlobe className="w-7 h-7 text-white" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">Website</h3>
//               <a
//                 href="https://passats.aryuacademy.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
//               >
//                 passats.aryuacademy.com
//               </a>
//               <p className="text-sm text-gray-500 mt-2">
//                 Build your resume and get your ATS score
//               </p>
//             </motion.div>

//             {/* Location Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               viewport={{ once: true }}
//               className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all"
//             >
//               <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
//                 <FiMapPin className="w-7 h-7 text-white" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">Location</h3>
//               <p className="text-gray-600">Chennai, Tamil Nadu</p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Aryu Academy Private Limited, India
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Final CTA Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-600">
//         <div className="max-w-4xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm mb-6">
//               <FiHeart className="w-3 h-3 text-white" />
//               <span className="text-xs font-medium text-white uppercase">
//                 Start Your Journey
//               </span>
//             </div>

//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
//               Ready to Build a Resume
//               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
//                 That Actually Works?
//               </span>
//             </h2>

//             <p className="mt-4 text-lg text-indigo-100 max-w-2xl mx-auto">
//               Join job seekers across India who are using PassATS to get past
//               ATS, get noticed by recruiters, and get the interview. Free to
//               start — no card required.
//             </p>

//             <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <Link
//                 href="/choose-template"
//                 className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:shadow-xl transition-all text-lg"
//               >
//                 Build My Resume Free
//                 <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </Link>
//             </div>

//             <div className="mt-6">
//               <p className="text-indigo-200 text-sm">
//                 Have questions?{" "}
//                 <a
//                   href="mailto:support@aryuacademy.com"
//                   className="text-white font-semibold hover:underline transition-all"
//                 >
//                   Contact us at support@aryuacademy.com
//                 </a>
//               </p>
//             </div>

//             {/* Trust Badges */}
//             <div className="mt-8 flex flex-wrap justify-center gap-4 text-indigo-200 text-xs">
//               <div className="flex items-center gap-1">
//                 <FiCheckCircle className="w-3 h-3" />
//                 <span>No credit card required</span>
//               </div>
//               <div className="w-1 h-1 bg-indigo-300 rounded-full" />
//               <div className="flex items-center gap-1">
//                 <FiShield className="w-3 h-3" />
//                 <span>14-day money-back guarantee</span>
//               </div>
//               <div className="w-1 h-1 bg-indigo-300 rounded-full" />
//               <div className="flex items-center gap-1">
//                 <FiUsers className="w-3 h-3" />
//                 <span>Trusted by 10,000+ users</span>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// }

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  FiUsers,
  FiTrendingUp,
  FiMapPin,
  FiDollarSign,
  FiShield,
  FiHeart,
  FiTarget,
  FiEye,
  FiCheckCircle,
  FiArrowRight,
  FiGlobe,
  FiLock,
  FiCreditCard,
  FiAlertCircle,
  FiXCircle,
  FiMail,
  FiZap,
  FiFileText,
} from "react-icons/fi";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaChartLine,
  FaBuilding,
  FaUserTie,
  FaRegBuilding,
  FaQuoteLeft,
} from "react-icons/fa";
import Testimonial from "@/app/components/sections/Testimonial";

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const stats = [
    {
      value: "10,000+",
      label: "Resumes Built",
      icon: FiUsers,
      suffix: "and counting",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      value: "50,000+",
      label: "ATS Scores ",
      icon: FiTrendingUp,
      suffix: "Checked",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      value: "100+",
      label: "Cities Reached",
      icon: FiMapPin,
      suffix: "from metros to Tier 2",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      value: "₹49",
      label: "Starting Price",
      icon: FiDollarSign,
      suffix: "10× cheaper than global tools",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  const ecosystem = [
    {
      name: "Aryu Academy",
      icon: <FaGraduationCap className="w-4 h-4" />,
      description:
        "Ed-tech platform — courses in Python, data science, web development, digital marketing, and more.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      name: "Aryu Technologies",
      icon: <FaLaptopCode className="w-4 h-4" />,
      description:
        "Technology solutions and software development for businesses across India.",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50",
      borderColor: "border-indigo-100",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      name: "Aryu Agency",
      icon: <FaChartLine className="w-4 h-4" />,
      description:
        "Digital marketing agency — SEO, paid ads, social media, and content strategy.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      name: "Aryu Enterprises",
      icon: <FaBuilding className="w-4 h-4" />,
      description:
        "Business consulting and enterprise solutions for growing organisations.",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-100",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  const careerStages = [
    
    {
      title: "Fresh Graduates",
      icon: "📚",
      description:
        "Entering the job market for the first time with a degree and limited work history. PassATS gives you a professional resume that competes with experienced candidates on ATS scoring.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Government / PSU Applicants",
      icon: "🏛️",
      description:
        "Applying for banking, UPSC, PSU, or state government roles. PassATS provides English-format government resume templates with photo box, category fields, and declaration footer.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Working Professionals",
      icon: "💼",
      description:
        "Ready for your next role, a promotion, or a career switch. PassATS helps you reframe experience as achievements, tailor your resume to each JD, and improve your ATS score before applying.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Career Switchers",
      icon: "🔄",
      description:
        "Moving from one industry or function to another. PassATS helps you highlight transferable skills and reposition your experience for a new direction.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Final-Year Students",
      icon: "🎓",
      description:
        "Applying for campus placements  PassATS helps you turn projects and internships into achievement even with no full-time experience.",
      gradient: "from-blue-500 to-cyan-500",
    },
    
    
  ];

  const promises = [
    {
      icon: <FiShield className="w-4 h-4" />,
      title: "Never Sell Your Data",
      description:
        "We will never sell your resume data to employers, recruiters, or data brokers.",
    },
    {
      icon: <FiLock className="w-4 h-4" />,
      title: "No AI Training Without Consent",
      description:
        "We will never use your resume content to train AI models without your explicit consent.",
    },
    {
      icon: <FiCreditCard className="w-4 h-4" />,
      title: "No Billing Tricks",
      description:
        "We will never auto-charge you without clear notice — no trial traps, no billing tricks.",
    },
    {
      icon: <FiEye className="w-4 h-4" />,
      title: "Real Numbers",
      description:
        "We will always show you real numbers — not inflated stats designed to look impressive.",
    },
    {
      icon: <FiHeart className="w-4 h-4" />,
      title: "Genuinely Useful Free Plan",
      description:
        "We will always offer a free plan that is genuinely useful — not a tease that forces you to pay immediately.",
    },
    {
      icon: <FiDollarSign className="w-4 h-4" />,
      title: "Priced in INR",
      description:
        "We will always price in INR — because you earn in rupees, and you should pay in rupees.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white"
      >
        <motion.div
          style={{ opacity, scale }}
          className="relative mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              We Built the Resume Tool
              <span className="block bg-gradient-to-r from-yellow-300 to-amber-200 bg-clip-text text-transparent mt-2">
                 Job Seekers Actually Needed!
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg text-white/95 mb-8 mx-auto"
            >
              PassATS is an AI-powered resume builder built from the ground up
              for the Indian job market — by the team behind Aryu Academy, one
              of India's growing ed-tech platforms.
            </motion.p>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="w-full h-10"
          >
            <path d="M0 100L1440 0V100H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100"
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-100 border border-red-200 mb-4">
                <FiAlertCircle className="w-3 h-3 text-red-600" />
                <span className="text-[11px] font-medium text-red-700 uppercase tracking-wide">
                  The Problem
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-3">
                The Gap No One
                <span className="block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Was Filling
                </span>
              </h2>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  At Aryu Academy, we have trained thousands of students across
                  India in Python, data science, full-stack development, digital
                  marketing, and more.
                </p>
                <p className="font-semibold text-gray-800">
                  Then we watched them struggle to get shortlisted.
                </p>
                <p>The problem was never their skills. It was their resume.</p>
                <div className="bg-white rounded-lg p-3 border border-red-200">
                  <p className="text-red-800 font-semibold">
                    75% of resumes are filtered out by ATS software
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    before a human recruiter ever reads them. Most job seekers
                    don't know this. And most resume tools don't fix it — they
                    just make the resume look better.
                  </p>
                </div>
                <p className="font-semibold text-indigo-600">
                  We built a tool that actually fixes the problem. Not just the
                  appearance.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 shadow-2xl"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <FiGlobe className="w-4 h-4 text-indigo-400" />
                </div>
                Global Tools vs PassATS
              </h3>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-around pb-2 border-b border-gray-700 text-xs">
                  <p className="text-red-400 font-medium">Global Tools</p>
                                    <p className="w-10"></p>

                  <p className="text-green-400 font-medium">PassATS</p>
                </div>
                <div className="space-y-2">
                  {[
                    { bad: "₹2,000-4,000/month", good: "₹49/month to start" },
                    {
                      bad: "No Indian templates",
                      good: "Templates for Indian roles",
                    },
                    { bad: "USD pricing", good: "INR pricing" },
                    {
                      bad: "No understanding of Indian hiring",
                      good: "Trained on Indian JDs",
                    },
                    { bad: "Trial traps", good: "Transparent billing" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="flex-1 flex items-center gap-1.5">
                        <FiXCircle className="w-3 h-3 text-red-400 shrink-0" />
                        <span className="text-gray-300  text-xs sm:text-sm md:text-base">{item.bad}</span>
                      </div>
                      <FiArrowRight className="w-3 h-3 text-gray-600" />
                      <div className="flex-1 flex items-center gap-1.5">
                        <FiCheckCircle className="w-3 h-3 text-green-400 shrink-0" />
                        <span className="text-green-300 text-xs sm:text-sm md:text-base">{item.good}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-700">
                <p className="text-indigo-300 text-sm font-medium mb-2">
                  Plus exclusive features:
                </p>
                <div className="grid sm:grid-cols-2 gap-1 text-xs text-green-300">
                  <p>✓ Government resume formats</p>
                  <p>✓ PSU application templates</p>
                  <p>✓ Campus placement formats</p>
                  <p>✓ Indian ATS scoring</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-500">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 mb-3"
            >
              <FiZap className="w-3 h-3 text-white" />
              <span className="text-[11px] font-medium text-white">
                Real Impact
              </span>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              PassATS by the Numbers
            </h2>
            <p className="text-indigo-100 text-sm">
              Real results from real job seekers
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:bg-white/15 transition-all">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r ${stat.gradient} flex items-center justify-center mx-auto mb-2`}
                  >
                    <stat.icon className="w-3 h-3 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="text-lg font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-indigo-100">
                    {stat.label}
                  </div>
                  <div className="text-sm text-indigo-100 ">
                    {stat.suffix}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Aryu Academy */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3"
            >
              <FaRegBuilding className="w-3 h-3 text-indigo-600" />
              <span className="text-[11px] font-medium text-indigo-700 uppercase tracking-wide">
                Who We Are
              </span>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Backed by{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Aryu Academy
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm md:text-base">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="text-gray-600 leading-relaxed ">
                PassATS is a product of Aryu Academy — an ed-tech platform based
                in Chennai, Tamil Nadu, that has been training students and
                working professionals in technology, digital marketing, and
                career-ready skills.
              </p>
              <p className="text-gray-600 leading-relaxed ">
                Aryu Academy was built on a single belief: that the gap between
                learning a skill and getting hired for it should not exist. Our
                courses are practical, our instructors are industry
                professionals, and our focus has always been on real outcomes —
                not just certificates.
              </p>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
                <FaQuoteLeft className="w-5 h-5 md:w-6 sm:h-6 text-indigo-400 mb-2" />
                <p className="text-indigo-800 font-medium  leading-relaxed">
                  PassATS is the next step in that mission. Once a student
                  completes a course at Aryu Academy, they need a resume that
                  communicates their new skills clearly, gets past ATS, and
                  lands them interviews. PassATS is that bridge.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-100 shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                  <FaBuilding className="w-3.5 h-3.5 text-white" />
                </div>
                The Aryu Ecosystem
              </h3>
              <div className="space-y-3">
                {ecosystem.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 3 }}
                    className={`flex gap-3 p-3 rounded-lg bg-gradient-to-r ${item.bgGradient} border ${item.borderColor} transition-all`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center ${item.iconColor} flex-shrink-0`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 ">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3"
            >
              <FiTarget className="w-3 h-3 text-indigo-600" />
              <span className="text-[11px] font-medium text-indigo-700 uppercase tracking-wide">
                Our Mission
              </span>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              What We Stand For
            </h2>
          </div>

          <div className="relative mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur-xl opacity-30" />
            <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-center shadow-xl">
              <FaQuoteLeft className="w-8 h-8 text-white/30 mx-auto mb-3" />
              <p className="text-base md:text-lg font-bold text-white leading-relaxed">
                "To make every Indian job seeker — regardless of city, college,
                or background — able to present their skills on a resume that
                gets through ATS, gets read by recruiters, and gets them in the
                room."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <FiHeart className="w-4 h-4" />,
                title: "Honesty First",
                description:
                  "No fake stats. No trial traps. No inflated numbers.",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50",
              },
              {
                icon: <FiGlobe className="w-4 h-4" />,
                title: "India First",
                description:
                  "Every feature, every template, every pricing decision is made with the Indian job seeker in mind.",
                gradient: "from-indigo-500 to-purple-500",
                bgGradient: "from-indigo-50 to-purple-50",
              },
              {
                icon: <FiTrendingUp className="w-4 h-4" />,
                title: "Outcomes Over Aesthetics",
                description:
                  "A beautiful resume that doesn't get viewed is useless. We optimize for results.",
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50",
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className={`bg-gradient-to-br ${value.bgGradient} rounded-xl p-5 text-center border border-gray-100 shadow-md hover:shadow-lg transition-all`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${value.gradient} flex items-center justify-center mx-auto mb-3 shadow-md`}
                >
                  <div className="text-white">{value.icon}</div>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Stages */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3">
              <FiUsers className="w-3 h-3 text-indigo-600" />
              <span className="text-[11px] font-medium text-indigo-700 uppercase tracking-wide">
                For Everyone
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Built for{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Every Stage of Your Career
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careerStages.map((stage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-xl p-4 border border-gray-100 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stage.gradient} flex items-center justify-center text-xl shadow-md flex-shrink-0`}
                    >
                      {stage.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900  mb-1">
                        {stage.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promises Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-sm border border-indigo-100 mb-3"
            >
              <FiShield className="w-3 h-3 text-indigo-600" />
              <span className="text-[11px] font-medium text-indigo-700 uppercase tracking-wide">
                Our Commitment
              </span>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              What We Promise You
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {promises.map((promise, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                    {promise.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900  mb-1">
                      {promise.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {promise.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonial/>

      {/* Contact Section */}
<section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3"
      >
        <FiMail className="w-3 h-3 text-indigo-600" />
        <span className="text-[11px] font-medium text-indigo-700 uppercase tracking-wide">
          Get in Touch
        </span>
      </motion.div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
        Connect With{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Our Team
        </span>
      </h2>
    </div>

    {/* Location Description */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      viewport={{ once: true }}
      className="text-center max-w-2xl mx-auto mb-12"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
        <FiMapPin className="w-3 h-3 text-indigo-600" />
        <span className="text-[11px] font-medium text-indigo-700">Based in Chennai</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">Building for All of India</h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        PassATS is developed and maintained by the team at Aryu Academy, headquartered in Chennai, 
        Tamil Nadu. We are a team of educators, engineers, and career coaches who have seen 
        firsthand how much a well-crafted resume can change someone's professional trajectory.
      </p>
    </motion.div>

    {/* Contact Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {[
        {
          icon: <FiMail className="w-5 h-5" />,
          title: "Email Us",
          value: "support@aryuacademy.com",
          description: "For support, feedback, or partnership enquiries",
          gradient: "from-blue-500 to-cyan-500",
        },
        {
          icon: <FiGlobe className="w-5 h-5" />,
          title: "Website",
          value: "passats.aryuacademy.com",
          description: "Build your resume and get your ATS score",
          gradient: "from-indigo-500 to-purple-500",
        },
        {
          icon: <FiMapPin className="w-5 h-5" />,
          title: "Location",
          value: "Chennai, Tamil Nadu",
          description: "Aryu Academy Private Limited, India",
          gradient: "from-purple-500 to-pink-500",
        },
      ].map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + idx * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          className="group relative"
        >
          <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 text-center border border-gray-100 shadow-md hover:shadow-lg transition-all">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center mx-auto mb-3 shadow-md`}
            >
              <div className="text-white">{item.icon}</div>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">
              {item.title}
            </h3>
            {item.value.startsWith("http") ? (
              <a
                href={item.value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors"
              >
                {item.value}
              </a>
            ) : item.value.includes("@") ? (
              <a
                href={`mailto:${item.value}`}
                className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors"
              >
                {item.value}
              </a>
            ) : (
              <p className="text-gray-800 text-sm font-medium">
                {item.value}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>

  
  </div>
</section>

      {/* Final CTA Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-5">
              <FiHeart className="w-3 h-3 text-white" />
              <span className="text-[11px] font-medium text-white uppercase tracking-wide">
                Start Your Journey Today
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              Ready to Build a Resume
              <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                That Actually Works?
              </span>
            </h2>

            <p className="mt-4 text-sm text-indigo-100 max-w-2xl mx-auto">
              Join job seekers across India who are using PassATS to get past
              ATS, get noticed by recruiters, and get the interview.
            </p>

            <div className="mt-6">
              <Link
                href="/choose-template"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:shadow-lg transition-all text-sm"
              >
                Build My Resume Free
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="mt-4">
              <p className="text-indigo-200 text-xs">
                Have questions?{" "}
                <a
                  href="mailto:support@aryuacademy.com"
                  className="text-white font-semibold hover:underline transition-all"
                >
                  Contact us at support@aryuacademy.com
                </a>
              </p>
            </div>

          
          </motion.div>
        </div>
      </section>
    </>
  );
}
