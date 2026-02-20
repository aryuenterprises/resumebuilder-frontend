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
// } from "react-icons/fi";
// import {
//   HiOutlineSparkles,
//   HiOutlineTemplate,
//   HiOutlineDocumentText,
//   HiOutlineChip,
//   HiOutlineBadgeCheck,
// } from "react-icons/hi";
// import Link from "next/link";

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
//     color: "from-purple-500 to-pink-500",
//   },
//   {
//     title: "Professional Templates",
//     description:
//       "Choose from 15+ expertly designed templates tailored for different industries and career levels.",
//     icon: HiOutlineTemplate,
//     color: "from-blue-500 to-cyan-500",
//   },
//   {
//     title: "Real-Time Preview",
//     description:
//       "See changes instantly with our live preview feature as you build your perfect resume.",
//     icon: HiOutlineDocumentText,
//     color: "from-green-500 to-emerald-500",
//   },
//   {
//     title: "ATS Optimization",
//     description:
//       "Ensure your resume passes through Applicant Tracking Systems with our smart optimization tools.",
//     icon: HiOutlineChip,
//     color: "from-orange-500 to-red-500",
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

// const testimonials = [
//   {
//     name: "Jessica Williams",
//     role: "Software Engineer",
//     content:
//       "This platform helped me land my dream job at a top tech company. The AI suggestions were incredibly accurate and the templates are gorgeous.",
//     rating: 5,
//     image: "JW",
//   },
//   {
//     name: "Robert Martinez",
//     role: "Marketing Director",
//     content:
//       "I've used many resume builders, but this one stands out. The ATS optimization feature is a game-changer. Got 3x more interview calls!",
//     rating: 5,
//     image: "RM",
//   },
//   {
//     name: "Priya Patel",
//     role: "Product Manager",
//     content:
//       "The real-time preview and customization options are amazing. I could see exactly how my resume would look as I built it. Highly recommended!",
//     rating: 5,
//     image: "PP",
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
//     <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-linear-to-br from-[#c40116] via-[#be0117] to-[#9a0e1a] text-white">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-10">
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage:
//                 "radial-gradient(circle at 2px 2px, black 3px, transparent 0)",
//               backgroundSize: "40px 40px",
//             }}
//           />
//         </div>

//         {/* Animated shapes */}
//         <div className="absolute top-20 -left-64 w-100 h-100 bg-white/50 rounded-full blur-3xl animate-pulse" />
//         {/* <div className="absolute bottom-20 right-10 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse delay-1000" /> */}

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
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
//               className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-8 backdrop-blur-sm"
//             >
//               <FiFileText className="w-10 h-10 text-white" />
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="text-4xl md:text-6xl font-bold mb-6"
//             >
//               Empowering Future,
//               <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-yellow-100">
//                        Creates      Career Success

//               </span>
              
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
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
//                 className="px-8 py-4 bg-white text-[#c40116] font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
//               >
//                 Start Building Free
//               </Link>
//               <Link
//                 href="/contact-us"
//                 className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300"
//               >
//                 Learn More
//               </Link>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Wave divider */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 1440 120"
//             className="w-full h-auto"
//           >
//             <path
//               fill="#ffffff"
//               fillOpacity="1"
//               d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
//             ></path>
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
//             className="grid grid-cols-2 md:grid-cols-4 gap-8"
//           >
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className="text-center group"
//               >
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
//                   <stat.icon className="w-8 h-8 text-[#c40116]" />
//                 </div>
//                 <div className="text-3xl font-bold text-gray-900 mb-1">
//                   {stat.value}
//                 </div>
//                 <div className="text-sm text-gray-600">{stat.label}</div>
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
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                 Our Story
//               </h2>
//               <div className="space-y-4 text-gray-600 text-lg">
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

//               <div className="mt-8 flex items-center gap-6">
//                 <div className="flex -space-x-2">
//                   {[1, 2, 3, 4].map((i) => (
//                     <div
//                       key={i}
//                       className="w-10 h-10 rounded-full bg-linear-to-br from-[#c40116] to-[#be0117] border-2 border-white flex items-center justify-center text-white text-xs font-bold"
//                     >
//                       {["SJ", "MC", "ER", "DK"][i - 1]}
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
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="relative"
//             >
//               <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//                 <img
//                   src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
//                   alt="Team collaboration"
//                   className="w-full h-auto"
//                 />
//                 <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
//               </div>

//               {/* Floating card */}
//               <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 max-w-xs">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                     <FiCheckCircle className="w-6 h-6 text-green-600" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-gray-500">Success Rate</div>
//                     <div className="text-2xl font-bold text-gray-900">98%</div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center max-w-3xl mx-auto mb-16"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Why Choose ARYU SmartCV?
//             </h2>
//             <p className="text-lg text-gray-600">
//               We combine cutting-edge technology with expert design to help you
//               create the perfect resume.
//             </p>
//           </motion.div>

//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           >
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 whileHover={{ y: -10 }}
//                 className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
//               >
//                 <div
//                   className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
//                 />

//                 <div
//                   className={`inline-flex items-center justify-center w-16 h-16 bg-linear-to-br ${feature.color} rounded-2xl mb-6 shadow-lg`}
//                 >
//                   <feature.icon className="w-8 h-8 text-white" />
//                 </div>

//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">
//                   {feature.title}
//                 </h3>

//                 <p className="text-gray-600 leading-relaxed">
//                   {feature.description}
//                 </p>

//                 <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <div className="w-8 h-8 bg-linear-to-br from-[#c40116] to-[#be0117] rounded-full flex items-center justify-center">
//                     <FiCheckCircle className="w-4 h-4 text-white" />
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Values Section */}
//       <section className="py-20 bg-linear-to-br from-[#c40116] to-[#be0117] text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center max-w-3xl mx-auto mb-16"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Our Core Values
//             </h2>
//             <p className="text-xl text-white/90">
//               These principles guide everything we do
//             </p>
//           </motion.div>

//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
//           >
//             {values.map((value, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className="text-center group"
//               >
//                 <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 backdrop-blur-sm">
//                   <value.icon className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
//                 <p className="text-white/80">{value.description}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center max-w-3xl mx-auto mb-16"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Loved by Job Seekers
//             </h2>
//             <p className="text-lg text-gray-600">
//               Join thousands of professionals who landed their dream jobs
//             </p>
//           </motion.div>

//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid grid-cols-1 md:grid-cols-3 gap-8"
//           >
//             {testimonials.map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className="bg-gray-50 rounded-3xl p-8 relative group hover:shadow-xl transition-all duration-500"
//               >
//                 <div className="absolute top-6 right-6 text-[#c40116] opacity-20 group-hover:opacity-100 transition-opacity">
//                   <svg
//                     className="w-12 h-12"
//                     fill="currentColor"
//                     viewBox="0 0 32 32"
//                   >
//                     <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2s2 .9 2 2-2 2-2 2v10h10V14c0-3.3-2.7-6-6-6zm18 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2s2 .9 2 2-2 2-2 2v10h10V14c0-3.3-2.7-6-6-6z" />
//                   </svg>
//                 </div>

//                 <div className="flex items-center gap-1 mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <FiStar
//                       key={i}
//                       className="w-5 h-5 fill-yellow-400 text-yellow-400"
//                     />
//                   ))}
//                 </div>

//                 <p className="text-gray-700 mb-6 italic">
//                   "{testimonial.content}"
//                 </p>

//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-linear-to-br from-[#c40116] to-[#be0117] rounded-xl flex items-center justify-center text-white font-bold">
//                     {testimonial.image}
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">
//                       {testimonial.name}
//                     </h4>
//                     <p className="text-sm text-gray-500">{testimonial.role}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutPage;



"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiUsers,
  FiAward,
  FiHeart,
  FiTarget,
  FiEye,
  FiTrendingUp,
  FiShield,
  FiClock,
  FiStar,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiCheckCircle,
} from "react-icons/fi";
import {
  HiOutlineSparkles,
  HiOutlineTemplate,
  HiOutlineDocumentText,
  HiOutlineChip,
  HiOutlineBadgeCheck,
} from "react-icons/hi";
import Link from "next/link";

const stats = [
  { value: "50K+", label: "Active Users", icon: FiUsers },
  { value: "100K+", label: "Resumes Created", icon: FiFileText },
  { value: "15+", label: "Expert Templates", icon: HiOutlineTemplate },
  { value: "98%", label: "Satisfaction Rate", icon: FiStar },
];

const features = [
  {
    title: "AI-Powered Suggestions",
    description:
      "Get intelligent recommendations to optimize your resume for ATS systems and stand out from the crowd.",
    icon: HiOutlineSparkles,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Professional Templates",
    description:
      "Choose from 15+ expertly designed templates tailored for different industries and career levels.",
    icon: HiOutlineTemplate,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Real-Time Preview",
    description:
      "See changes instantly with our live preview feature as you build your perfect resume.",
    icon: HiOutlineDocumentText,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "ATS Optimization",
    description:
      "Ensure your resume passes through Applicant Tracking Systems with our smart optimization tools.",
    icon: HiOutlineChip,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Secure & Private",
    description:
      "Your data is encrypted and protected. We take your privacy and security seriously.",
    icon: FiShield,
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "24/7 Support",
    description:
      "Get help whenever you need it with our round-the-clock customer support team.",
    icon: FiClock,
    color: "from-pink-500 to-rose-500",
  },
];

const values = [
  {
    title: "Innovation",
    description:
      "We constantly push boundaries to bring you the latest in resume technology.",
    icon: FiTrendingUp,
  },
  {
    title: "Quality",
    description:
      "Every template and feature is crafted with meticulous attention to detail.",
    icon: FiAward,
  },
  {
    title: "User-Centric",
    description:
      "Your success is our success. We build features that truly help you achieve your goals.",
    icon: FiHeart,
  },
  {
    title: "Integrity",
    description:
      "We operate with transparency and honesty in everything we do.",
    icon: FiEye,
  },
];

const testimonials = [
  {
    name: "Jessica Williams",
    role: "Software Engineer",
    content:
      "This platform helped me land my dream job at a top tech company. The AI suggestions were incredibly accurate and the templates are gorgeous.",
    rating: 5,
    image: "JW",
  },
  {
    name: "Robert Martinez",
    role: "Marketing Director",
    content:
      "I've used many resume builders, but this one stands out. The ATS optimization feature is a game-changer. Got 3x more interview calls!",
    rating: 5,
    image: "RM",
  },
  {
    name: "Priya Patel",
    role: "Product Manager",
    content:
      "The real-time preview and customization options are amazing. I could see exactly how my resume would look as I built it. Highly recommended!",
    rating: 5,
    image: "PP",
  },
];

const AboutPage = () => {
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
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#c40116] via-[#be0117] to-[#9a0e1a] text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, black 3px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Animated shapes - adjusted for mobile */}
        <div className="absolute top-20 -left-64 w-64 h-64 md:w-100 md:h-100 bg-white/50 rounded-full blur-3xl animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", damping: 10 }}
              className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-2xl md:rounded-3xl mb-6 md:mb-8 backdrop-blur-sm"
            >
              <FiFileText className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-4"
            >
              Empowering Future,
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-yellow-100 mt-2">
                Creates Career Success
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto px-4"
            >
              We're on a mission to help professionals worldwide create
              stunning, ATS-optimized resumes that open doors to new
              opportunities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <Link
                href="/choose-template"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#c40116] font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                Start Building Free
              </Link>
              <Link
                href="/contact-us"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 text-sm sm:text-base"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave divider - hidden on very small screens or adjust */}
        <div className="absolute bottom-0 left-0 right-0 block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-auto"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl sm:rounded-2xl mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#c40116]" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Our Story
              </h2>
              <div className="space-y-3 md:space-y-4 text-gray-600 text-base sm:text-lg">
                <p>
                  Founded in 2020, ARYU SmartCV was born from a simple
                  observation: talented professionals were struggling to create
                  resumes that truly represented their skills and caught
                  recruiters' attention.
                </p>
                <p>
                  Our founder, Sarah Johnson, a former HR director with over 15
                  years of experience, saw countless qualified candidates get
                  overlooked due to poorly formatted resumes that failed to pass
                  through ATS systems.
                </p>
                <p>
                  She assembled a team of designers, developers, and recruitment
                  experts to create a platform that combines beautiful design
                  with smart technology. Today, ARYU SmartCV has helped over
                  50,000 professionals land their dream jobs at companies like
                  Google, Microsoft, and Amazon.
                </p>
              </div>

              <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-linear-to-br from-[#c40116] to-[#be0117] border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    >
                      {["SJ", "MC", "ER", "DK"][i - 1]}
                    </div>
                  ))}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  <span className="font-bold text-gray-900">15+</span> experts
                  behind the scenes
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative order-1 lg:order-2 mb-8 lg:mb-0"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Team collaboration"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              </div>

              {/* Floating card - adjusted for mobile */}
              <div className="absolute -bottom-4 sm:-bottom-6 left-2 sm:-left-6 bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 max-w-[200px] sm:max-w-xs">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500">Success Rate</div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">98%</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Why Choose ARYU SmartCV?
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              We combine cutting-edge technology with expert design to help you
              create the perfect resume.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl sm:rounded-3xl transition-opacity duration-500`}
                />

                <div
                  className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-linear-to-br ${feature.color} rounded-xl sm:rounded-2xl mb-4 sm:mb-5 md:mb-6 shadow-lg`}
                >
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-linear-to-br from-[#c40116] to-[#be0117] rounded-full flex items-center justify-center">
                    <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 bg-linear-to-br from-[#c40116] to-[#be0117] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              Our Core Values
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90">
              These principles guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-xl sm:rounded-2xl md:rounded-3xl mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 backdrop-blur-sm">
                  <value.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-sm sm:text-base text-white/80 px-2">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Loved by Job Seekers
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Join thousands of professionals who landed their dream jobs
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 relative group hover:shadow-xl transition-all duration-500"
              >
                <div className="absolute top-4 sm:top-5 right-4 sm:right-5 text-[#c40116] opacity-20 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2s2 .9 2 2-2 2-2 2v10h10V14c0-3.3-2.7-6-6-6zm18 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2s2 .9 2 2-2 2-2 2v10h10V14c0-3.3-2.7-6-6-6z" />
                  </svg>
                </div>

                <div className="flex items-center gap-1 mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-linear-to-br from-[#c40116] to-[#be0117] rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;