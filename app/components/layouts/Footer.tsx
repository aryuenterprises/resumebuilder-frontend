

// "use client";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import {
//   FiMail,
//   FiPhone,
//   FiMapPin,
//   FiHeart,
//   FiTwitter,
//   FiLinkedin,
//   FiGithub,
//   FiFacebook,
//   FiInstagram,
//   FiYoutube,
//   FiSend,
//   FiArrowUpRight,
//   FiAward,
//   FiUsers,
//   FiTrendingUp,
//   FiShield,
//   FiStar,
// } from "react-icons/fi";


// const Footer = () => {
//   const router = useRouter();

//   const footerLinks = {
//     company: [
//       { name: "About Us", path: "/about-us" },
//       { name: "Contact Us", path: "/contact-us" },
//       { name: "Subscription", path: "/subscription" },
//       { name: "Terms & Conditions", path: "/terms-conditions" },
//       { name: "Privacy Policy", path: "/privacy-policy" },
//     ],
//     network: [
//       { name: "Aryu Academy", url: "https://aryuacademy.com/" },
//       { name: "Aryu Technologies", url: "https://aryutechnologies.com/" },
//       { name: "Aryu Agency", url: "https://aryu.agency/" },
//       { name: "Aryu Enterprises", url: "https://aryuenterprises.com/" },
//     ],
//   };

//   const socialLinks = [
//     {
//       icon: FiLinkedin,
//       url: "https://linkedin.com",
//       label: "LinkedIn",
//       color: "hover:text-[#0077b5]",
//     },
//     {
//       icon: FiTwitter,
//       url: "https://twitter.com",
//       label: "Twitter",
//       color: "hover:text-[#1DA1F2]",
//     },
//     {
//       icon: FiFacebook,
//       url: "https://facebook.com",
//       label: "Facebook",
//       color: "hover:text-[#1877f2]",
//     },
   
//     {
//       icon: FiInstagram,
//       url: "https://instagram.com",
//       label: "Instagram",
//       color: "hover:text-[#e4405f]",
//     },
//     {
//       icon: FiYoutube,
//       url: "https://youtube.com",
//       label: "YouTube",
//       color: "hover:text-[#ff0000]",
//     },
//   ];

//   return (
//     <footer className="relative bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 border-t border-gray-100 overflow-hidden">
    

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
//         <div className="flex flex-wrap gap-8 lg:gap-12">
//           {/* Brand Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="flex items-center gap-2 mb-4">
//               <div className="relative">
//                 <Image
//                   src="/logo.png"
//                   alt="ATS Pass"
//                   width={160}
//                   height={50}
//                   className="cursor-pointer"
//                   onClick={() => router.push("/")}
//                 />
//               </div>
//             </div>

//             <p className="text-sm text-gray-600 leading-relaxed max-w-md mb-6">
//               Create an ATS-friendly resume in minutes with AI. Get shortlisted.
//               Get hired faster.
//             </p>

//             {/* Contact Info */}
//             <div className="space-y-3">
//               <div className="flex items-center gap-3 text-sm text-gray-600 group">
//                 <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
//                   <FiMail className="w-4 h-4 text-indigo-600" />
//                 </div>
//                 <span className="group-hover:text-indigo-600 transition-colors">
//                   passats@gmail.com
//                 </span>
//               </div>
//               <div className="flex items-center gap-3 text-sm text-gray-600 group">
//                 <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
//                   <FiMapPin className="w-4 h-4 text-indigo-600" />
//                 </div>
//                 <span className="group-hover:text-indigo-600 transition-colors">
//                   Chennai, India
//                 </span>
//               </div>
//             </div>
//           </motion.div>

//           {/* Company Links */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//           >
//             <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
//               <span className="w-1 h-4 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></span>
//               Company
//             </h3>
//             <ul className="space-y-2">
//               {footerLinks.company.map((link, index) => (
//                 <motion.li
//                   key={link.name}
//                   initial={{ opacity: 0, x: -10 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <button
//                     onClick={() => router.push(link.path)}
//                     className="group flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-all duration-200 py-1 cursor-pointer"
//                   >
//                     <span>{link.name}</span>
//                     <FiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//                   </button>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Our Network */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
//               <span className="w-1 h-4 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></span>
//               Our Network
//             </h3>
//             <ul className="space-y-2">
//               {footerLinks.network.map((link, index) => (
//                 <motion.li
//                   key={link.name}
//                   initial={{ opacity: 0, x: -10 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <a
//                     href={link.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="group flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200 py-1 "
//                   >
//                   <span>  {link.name}</span>
//                     <FiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
//                   </a>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>
//         </div>

//         {/* Bottom Section */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="mt-8 pt-6 border-t border-gray-200"
//         >
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             {/* Copyright */}
//             <p className="text-sm  text-gray-400">
//               © {new Date().getFullYear()} Ats Pass. All rights reserved.
//             </p>

//             {/* Social Links */}
//             <div className="flex items-center gap-3">
//               {socialLinks.map((social) => (
//                 <motion.a
//                   key={social.label}
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={`text-gray-400 ${social.color} transition-all duration-300`}
//                   aria-label={social.label}
//                   whileHover={{ scale: 1.1, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <social.icon className="w-4 h-4" />
//                 </motion.a>
//               ))}
//             </div>

//             {/* Made with love */}
//             <div className="flex items-center gap-1 text-sm text-gray-400">
//               <span>Made with</span>
//               <FiHeart className="w-3 h-3 text-red-500 animate-pulse" />
//               <span>for your career</span>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
























// "use client";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import {
//   FiMail,
//   FiMapPin,
//   FiHeart,
//   FiTwitter,
//   FiLinkedin,
//   FiFacebook,
//   FiInstagram,
//   FiYoutube,
//   FiSend,
//   FiArrowUpRight,
//   FiUsers,
//   FiTrendingUp,
//   FiStar,
//   FiChevronRight,
//   FiGlobe,
// } from "react-icons/fi";

// const Footer = () => {
//   const router = useRouter();

//   const footerLinks = {
//     company: [
//       { name: "About Us", path: "/about-us" },
//       { name: "Contact Us", path: "/contact-us" },
//       { name: "Subscription", path: "/subscription" },
//       { name: "Terms & Conditions", path: "/terms-conditions" },
//       { name: "Privacy Policy", path: "/privacy-policy" },
//     ],
//     network: [
//       { name: "Aryu Academy", url: "https://aryuacademy.com/" },
//       { name: "Aryu Technologies", url: "https://aryutechnologies.com/" },
//       { name: "Aryu Agency", url: "https://aryu.agency/" },
//       { name: "Aryu Enterprises", url: "https://aryuenterprises.com/" },
//     ],
//   };

//   const socialLinks = [
//     {
//       icon: FiLinkedin,
//       url: "https://linkedin.com",
//       label: "LinkedIn",
//       color: "hover:text-[#0077b5]",
//     },
//     {
//       icon: FiTwitter,
//       url: "https://twitter.com",
//       label: "Twitter",
//       color: "hover:text-[#1DA1F2]",
//     },
//     {
//       icon: FiFacebook,
//       url: "https://facebook.com",
//       label: "Facebook",
//       color: "hover:text-[#1877f2]",
//     },
//     {
//       icon: FiInstagram,
//       url: "https://instagram.com",
//       label: "Instagram",
//       color: "hover:text-[#e4405f]",
//     },
//     {
//       icon: FiYoutube,
//       url: "https://youtube.com",
//       label: "YouTube",
//       color: "hover:text-[#ff0000]",
//     },
//   ];

//   const stats = [
//     { icon: FiUsers, value: "10K+", label: "Active Users", color: "indigo" },
//     { icon: FiTrendingUp, value: "85%", label: "Success Rate", color: "emerald" },
//     { icon: FiStar, value: "4.9", label: "Rating", color: "amber" },
//   ];

//   return (
//     <footer className="relative bg-gray-50 border-t border-gray-200 overflow-hidden">
//       {/* Decorative Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl" />
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
//         {/* Top Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
//           {/* Brand Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="space-y-4"
//           >
//             <div className="relative">
//               <Image
//                 src="/logo.png"
//                 alt="ATS Pass"
//                 width={160}
//                 height={50}
//                 className="cursor-pointer"
//                 onClick={() => router.push("/")}
//               />
//             </div>

//             <p className="text-sm text-gray-600 leading-relaxed max-w-md">
//               Create an ATS-friendly resume in minutes with AI. Get shortlisted. Get hired faster.
//             </p>

//             {/* Contact Info */}
//             <div className="space-y-3 pt-2">
//               <motion.a
//                 href="mailto:passats@gmail.com"
//                 whileHover={{ x: 5 }}
//                 className="flex items-center gap-3 text-sm text-gray-600 group cursor-pointer"
//               >
//                 <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-all duration-300 shadow-sm border border-gray-200">
//                   <FiMail className="w-4 h-4 text-indigo-600" />
//                 </div>
//                 <span className="group-hover:text-indigo-600 transition-colors">
//                   passats@gmail.com
//                 </span>
//               </motion.a>
              
//               <motion.div
//                 whileHover={{ x: 5 }}
//                 className="flex items-center gap-3 text-sm text-gray-600 group"
//               >
//                 <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-all duration-300 shadow-sm border border-gray-200">
//                   <FiMapPin className="w-4 h-4 text-indigo-600" />
//                 </div>
//                 <span className="group-hover:text-indigo-600 transition-colors">
//                   Chennai, India
//                 </span>
//               </motion.div>
//             </div>

//             {/* Stats Section */}
//             <div className="grid grid-cols-3 gap-2 pt-4">
//               {stats.map((stat, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.1 }}
//                   className="text-center bg-white rounded-xl p-2 border border-gray-200 shadow-sm"
//                 >
//                   <stat.icon className={`w-4 h-4 text-${stat.color}-500 mx-auto mb-1`} />
//                   <p className="text-xs font-bold text-gray-800">{stat.value}</p>
//                   <p className="text-[10px] text-gray-500">{stat.label}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Company Links */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//           >
//             <h3 className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2">
//               <span className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
//               Company
//             </h3>
//             <ul className="space-y-2">
//               {footerLinks.company.map((link, index) => (
//                 <motion.li
//                   key={link.name}
//                   initial={{ opacity: 0, x: -10 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <button
//                     onClick={() => router.push(link.path)}
//                     className="group flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-all duration-200 py-1.5 cursor-pointer w-full"
//                   >
//                     <FiChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
//                     <span>{link.name}</span>
//                   </button>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Our Network */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <h3 className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2">
//               <span className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
//               Our Network
//             </h3>
//             <ul className="space-y-2">
//               {footerLinks.network.map((link, index) => (
//                 <motion.li
//                   key={link.name}
//                   initial={{ opacity: 0, x: -10 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <a
//                     href={link.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="group flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200 py-1.5"
//                   >
//                     <FiGlobe className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
//                     <span>{link.name}</span>
//                     <FiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//                   </a>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>

          
//         </div>

//         {/* Bottom Section */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="mt-12 pt-8 border-t border-gray-200"
//         >
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             {/* Copyright */}
//             <p className="text-xs text-gray-500">
//               © {new Date().getFullYear()} Ats Pass. All rights reserved.
//             </p>

//             {/* Social Links */}
//             <div className="flex items-center gap-2">
//               {socialLinks.map((social) => (
//                 <motion.a
//                   key={social.label}
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={`text-gray-500 ${social.color} transition-all duration-300 p-2 rounded-lg bg-white hover:shadow-md border border-gray-200`}
//                   aria-label={social.label}
//                   whileHover={{ y: -3, scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <social.icon className="w-4 h-4" />
//                 </motion.a>
//               ))}
//             </div>

//             {/* Made with love */}
//             <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
//               <span>Made with</span>
//               <motion.div
//                 animate={{ scale: [1, 1.2, 1] }}
//                 transition={{ duration: 1.5, repeat: Infinity }}
//               >
//                 <FiHeart className="w-3 h-3 text-red-500" />
//               </motion.div>
//               <span>for your career journey</span>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Back to Top Button */}
//       <motion.button
//         initial={{ opacity: 0, scale: 0 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.6 }}
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-110 group z-50"
//       >
//         <FiArrowUpRight className="w-5 h-5 rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300" />
//       </motion.button>
//     </footer>
//   );
// };

// export default Footer;


















"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiMail,
  FiMapPin,
  FiHeart,
  FiTwitter,
  FiLinkedin,
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiArrowUpRight,
  FiUsers,
  FiTrendingUp,
  FiStar,
  FiChevronRight,
  FiGlobe,
  FiFileText,
  FiCheckCircle,
  FiCreditCard,
} from "react-icons/fi";
import { useEffect, useState } from "react";

const Footer = () => {
  const router = useRouter();

  const footerLinks = {
    company: [
      { name: "About Us", path: "/about-us" },
      { name: "Contact Us", path: "/contact-us" },
      { name: "Subscription", path: "/subscription" },
      { name: "Terms & Conditions", path: "/terms-conditions" },
      { name: "Privacy Policy", path: "/privacy-policy" },
    ],
    network: [
      { name: "Aryu Academy", url: "https://aryuacademy.com/" },
      { name: "Aryu Technologies", url: "https://aryutechnologies.com/" },
      { name: "Aryu Agency", url: "https://aryu.agency/" },
      { name: "Aryu Enterprises", url: "https://aryuenterprises.com/" },
    ],
    quickLinks: [
      { name: "ATS Checker", path: "/ats-checker", icon: FiCheckCircle, color: "text-emerald-500" },
      { name: "Build Resume", path: "/choose-template", icon: FiFileText, color: "text-indigo-500" },
      { name: "Plans", path: "/choose-plan", icon: FiCreditCard, color: "text-purple-500" },
    ],
  };

  const socialLinks = [
    {
      icon: FiLinkedin,
      url: "https://linkedin.com",
      label: "LinkedIn",
      color: "hover:text-[#0077b5]",
    },
    
    {
      icon: FiFacebook,
      url: "https://facebook.com",
      label: "Facebook",
      color: "hover:text-[#1877f2]",
    },
    {
      icon: FiInstagram,
      url: "https://instagram.com",
      label: "Instagram",
      color: "hover:text-[#e4405f]",
    },
    {
      icon: FiYoutube,
      url: "https://youtube.com",
      label: "YouTube",
      color: "hover:text-[#ff0000]",
    },
  ];

  const stats = [
    { icon: FiUsers, value: "10K+", label: "Active Users", color: "indigo" },
    { icon: FiTrendingUp, value: "85%", label: "Success Rate", color: "emerald" },
    { icon: FiStar, value: "4.9", label: "Rating", color: "amber" },
  ];



      const [showButton, setShowButton] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setShowButton(window.scrollY > 300);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <footer className="relative bg-gray-50 border-t border-gray-200 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* <div className="relative">
              <Image
                src="/logo.png"
                alt="ATS Pass"
                width={160}
                height={50}
                className="cursor-pointer"
                onClick={() => router.push("/")}
              />

              
            </div> */}

             <div className="relative w-[100px] xs:w-[120px] sm:w-[140px] md:w-[150px] h-[33px] xs:h-[40px] sm:h-[46px] md:h-[50px]">
                        <Image
                          src="/logo.png"
                                          onClick={() => router.push("/")}

                          alt="ATS Pass"
                          fill
                          className="object-contain"
                          priority
                          sizes="(max-width: 480px) 100px, (max-width: 640px) 120px, (max-width: 768px) 140px, 150px"
                        />
                      </div>

            <p className="text-sm text-gray-600 leading-relaxed max-w-md">
              Create an ATS-friendly resume in minutes with AI. Get shortlisted. Get hired faster
            </p>

            {/* Contact Info */}
            <div className="space-y-3 pt-2">
              <motion.a
                href="mailto:passats@gmail.com"
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm text-gray-600 group cursor-pointer"
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-all duration-300 shadow-sm border border-gray-200">
                  <FiMail className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="group-hover:text-indigo-600 transition-colors">
                  passats@gmail.com
                </span>
              </motion.a>
              
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm text-gray-600 group"
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-all duration-300 shadow-sm border border-gray-200">
                  <FiMapPin className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="group-hover:text-indigo-600 transition-colors">
                  Chennai, India
                </span>
              </motion.div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-2 pt-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center bg-white rounded-xl p-2 border border-gray-200 shadow-sm"
                >
                  <stat.icon className={`w-4 h-4 text-${stat.color}-500 mx-auto mb-1`} />
                  <p className="text-xs font-bold text-gray-800">{stat.value}</p>
                  <p className="text-[10px] text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
              Company
            </h3>
            <ul className="md:space-y-2">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => router.push(link.path)}
                    className="group flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-all duration-200 py-1.5 cursor-pointer w-full"
                  >
                    <FiChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    <span>{link.name}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>


 {/* Quick Links Section - Replacing Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="md:space-y-2">
              {footerLinks.quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => router.push(link.path)}
                    className="group flex items-center gap-3 text-sm text-gray-600 hover:text-indigo-600 transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white w-full"
                  >
                    <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-indigo-50 transition-all duration-200">
                      <link.icon className={`w-4 h-4 ${link.color} group-hover:scale-110 transition-transform duration-200`} />
                    </div>
                    <span className="flex-1 text-left">{link.name}</span>
                    <FiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Support Text */}
            <div className="mt-6 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
              <p className="text-xs text-indigo-700 text-center">
                Need help? Contact our support team
              </p>
            </div>
          </motion.div>

          {/* Our Network */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
              Our Network
            </h3>
            <ul className="md:space-y-2">
              {footerLinks.network.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200 py-1.5"
                  >
                    <FiGlobe className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                    <span>{link.name}</span>
                    <FiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

         
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} PassATS. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-500 ${social.color} transition-all duration-300 p-2 rounded-lg bg-white hover:shadow-md border border-gray-200`}
                  aria-label={social.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

           
          </div>
        </motion.div>
      </div>




  

{showButton && (
<motion.button
  initial={{ opacity: 0, scale: 0 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.6 }}
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  className="group cursor-pointer fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 p-2.5 sm:p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-110 active:scale-95 z-10"
  aria-label="Back to top"
>
  {/* Tooltip */}
  <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-900 text-white text-xs sm:text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg">
    Go to top
    {/* Tooltip arrow */}
    <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></span>
  </span>
  
  <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:group-hover:rotate-[-45deg] md:rotate-0 transition-transform duration-300" />
</motion.button>
)}

     
    </footer>
  );
};

export default Footer;