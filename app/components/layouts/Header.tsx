






// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiArrowRight, FiMenu, FiUser, FiX } from "react-icons/fi";
// import { SiReaddotcv } from "react-icons/si";
// import { RedGradientButton } from "../ui";
// import { IoIosInformationCircleOutline } from "react-icons/io";

// const Header: React.FC = () => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
//   const [menuOpen, setMenuOpen] = useState<boolean>(false);
//   const [showHeader, setShowHeader] = useState<boolean>(true);
//   const [lastScrollY, setLastScrollY] = useState<number>(0);

//   // Check login status
//   useEffect(() => {
//     const user = localStorage.getItem("user_details");
//     setUserLoggedIn(Boolean(user));
//   }, []);

//   // Handle scroll show/hide
//   useEffect(() => {
//     const handleScroll = (): void => {
//       const currentScrollY = window.scrollY;

//       // Only trigger after 100px scroll
//       if (currentScrollY > 100) {
//         setShowHeader(currentScrollY < lastScrollY); // scroll up → show
//       } else {
//         setShowHeader(true); // always show at top
//       }

//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   // Lock body scroll on mobile menu
//   useEffect(() => {
//     if (menuOpen) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }
//     return () => document.body.classList.remove("overflow-hidden");
//   }, [menuOpen]);

//   // Helper function to check if path is active
//   const isActive = (path: string) => {
//     if (path === "/") return pathname === path;
//     return pathname === path;
//   };

//   return (
//     <motion.header
//       initial={{ y: -100 }}
//       animate={{ y: showHeader ? 0 : -120 }}
//       transition={{ duration: 0.4, ease: "easeInOut" }}
//       className="bg-white backdrop-blur-lg border-b overflow-hidden! shadow-red-300/10 border-gray-100 sticky top-0 z-50"
//     >
//       <div className="flex justify-between items-center px-4 lg:px-8 xl:px-10 py-3 sm:py-4 mx-auto">
//         {/* Logo */}
//         <button onClick={() => router.push("/")} className="cursor-pointer">
//           <Image
//             src="/logo.png"
//             alt="ATS Pass"
//             height={50}
//             width={150}
//             priority
//           />
//         </button>

//         {/* Desktop Menu */}
//         <nav className="max-md:hidden flex gap-2 lg:gap-3 xl:gap-4">
//           <button
//             className={`px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold transition-all duration-200 text-xs lg:text-sm cursor-pointer ${
//               isActive("/")
//                 ? "bg-indigo-50 text-indigo-600"
//                 : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
//             }`}
//             onClick={() => router.push("/")}
//           >
//             Home
//           </button>

//           <button
//             className={`px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold transition-all duration-200 text-xs lg:text-sm cursor-pointer ${
//               isActive("/choose-template")
//                 ? "bg-indigo-50 text-indigo-600"
//                 : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
//             }`}
//             onClick={() => router.push("/choose-template")}
//           >
//             Build Resume
//           </button>

//           <button
//             className={`px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold transition-all duration-200 text-xs lg:text-sm cursor-pointer ${
//               isActive("/ats-checker")
//                 ? "bg-indigo-50 text-indigo-600"
//                 : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
//             }`}
//             onClick={() => router.push("/ats-checker")}
//           >
//             ATS Checker
//           </button>

//           <button
//             className={`px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold transition-all duration-200 text-xs lg:text-sm cursor-pointer ${
//               isActive("/about-us")
//                 ? "bg-indigo-50 text-indigo-600"
//                 : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
//             }`}
//             onClick={() => router.push("/about-us")}
//           >
//             About Us
//           </button>

//           <button
//             className={`px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 rounded-lg font-nunito font-semibold transition-all duration-200 text-xs lg:text-sm cursor-pointer ${
//               isActive("/choose-plan")
//                 ? "bg-indigo-50 text-indigo-600"
//                 : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
//             }`}
//             onClick={() => router.push("/choose-plan")}
//           >
//             Pricing
//           </button>

//           {userLoggedIn ? (
//             <button
//               onClick={() => router.push("/dashboard")}
//               className={`lg:ml-3 px-5 lg:px-6 py-2 rounded-lg font-semibold transition-all duration-200 text-sm cursor-pointer flex items-center gap-2 ${
//                 isActive("/dashboard")
//                   ? "bg-indigo-50 text-indigo-600"
//                   : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
//               }`}
//             >
//               Dashboard
//             </button>
//           ) : (
//             <button
//               onClick={() => router.push("/login")}
//               className={`lg:ml-3 px-5 lg:px-6 py-2 rounded-lg font-semibold transition-all duration-200 text-sm cursor-pointer flex items-center gap-2 ${
//                 isActive("/login")
//                   ? "bg-indigo-50 text-indigo-600"
//                   : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
//               }`}
//             >
//               Sign In
//             </button>
//           )}
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setMenuOpen((prev) => !prev)}
//           className="md:hidden"
//           aria-label="Toggle menu text-slate-700 text-2xl sm:text-3xl"
//         >
//           {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {menuOpen && (
//           <div className="h-dvh overflow-hidden md:hidden">
//             {/* Backdrop Overlay */}
//             <motion.div
//               className="fixed inset-0 bg-black/10 backdrop-blur-sm z-400"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setMenuOpen(false)}
//             />

//             {/* Sidebar Menu */}
//             <motion.div
//               className="fixed top-0 right-0 z-500 h-screen w-[85%] max-w-sm bg-white shadow-2xl flex flex-col"
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//             >
//               {/* Sidebar Header */}
//               <div className="flex items-center bg-white justify-between p-4 sm:p-6 border-b border-indigo-100">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-linear-to-br from-indigo-500/10 to-indigo-600/10 rounded-lg">
//                     <svg
//                       className="w-5 h-5 text-indigo-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
//                       />
//                     </svg>
//                   </div>
//                   <span className="text-lg font-nunito font-semibold text-gray-800">
//                     Menu
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => setMenuOpen(false)}
//                   className="p-2 rounded-lg hover:bg-indigo-50 transition-colors"
//                   aria-label="Close menu"
//                 >
//                   <FiX className="text-gray-800 hover:text-indigo-600 font-semibold text-2xl" />
//                 </button>
//               </div>

//               {/* Menu Content */}
//               <div className="flex-1 overflow-y-auto p-4 sm:p-6">
//                 <div className="space-y-3">
//                   {/* Home Button */}
//                   <button
//                     onClick={() => {
//                       router.push("/");
//                       setMenuOpen(false);
//                     }}
//                     className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
//                       isActive("/")
//                         ? "bg-indigo-50 text-indigo-600"
//                         : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
//                     }`}
//                   >
//                     <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${
//                       isActive("/") ? "bg-indigo-100" : "bg-gray-100"
//                     }`}>
//                       <svg
//                         className={`w-5 h-5 ${isActive("/") ? "text-indigo-600" : "text-gray-600"}`}
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                         />
//                       </svg>
//                     </div>
//                     <span className="text-left flex-1">Home</span>
//                   </button>

//                   <button
//                     onClick={() => {
//                       router.push("/choose-template");
//                       setMenuOpen(false);
//                     }}
//                     className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
//                       isActive("/choose-template")
//                         ? "bg-indigo-50 text-indigo-600"
//                         : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
//                     }`}
//                   >
//                     <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${
//                       isActive("/choose-template") ? "bg-indigo-100" : "bg-gray-100"
//                     }`}>
//                       <SiReaddotcv className={`${isActive("/choose-template") ? "text-indigo-600" : "text-gray-600"} font-extrabold`} />
//                     </div>
//                     <span className="text-left flex-1">Build Resume</span>
//                   </button>

//                   <button
//                     onClick={() => {
//                       router.push("/choose-plan");
//                       setMenuOpen(false);
//                     }}
//                     className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
//                       isActive("/choose-plan")
//                         ? "bg-indigo-50 text-indigo-600"
//                         : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
//                     }`}
//                   >
//                     <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${
//                       isActive("/choose-plan") ? "bg-indigo-100" : "bg-gray-100"
//                     }`}>
//                       <SiReaddotcv className={`${isActive("/choose-plan") ? "text-indigo-600" : "text-gray-600"} font-extrabold`} />
//                     </div>
//                     <span className="text-left flex-1">Pricing</span>
//                   </button>

//                   <button
//                     onClick={() => {
//                       router.push("/ats-checker");
//                       setMenuOpen(false);
//                     }}
//                     className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
//                       isActive("/ats-checker")
//                         ? "bg-indigo-50 text-indigo-600"
//                         : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
//                     }`}
//                   >
//                     <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${
//                       isActive("/ats-checker") ? "bg-indigo-100" : "bg-gray-100"
//                     }`}>
//                       <SiReaddotcv className={`${isActive("/ats-checker") ? "text-indigo-600" : "text-gray-600"} font-extrabold`} />
//                     </div>
//                     <span className="text-left flex-1">ATS Checker</span>
//                   </button>

//                   {/* Contact Us Button */}
//                   <button
//                     onClick={() => {
//                       router.push("/contact-us");
//                       setMenuOpen(false);
//                     }}
//                     className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
//                       isActive("/contact-us")
//                         ? "bg-indigo-50 text-indigo-600"
//                         : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
//                     }`}
//                   >
//                     <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${
//                       isActive("/contact-us") ? "bg-indigo-100" : "bg-gray-100"
//                     }`}>
//                       <svg
//                         className={`w-5 h-5 ${isActive("/contact-us") ? "text-indigo-600" : "text-gray-600"}`}
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                         />
//                       </svg>
//                     </div>
//                     <span className="text-left flex-1">Contact Us</span>
//                   </button>

//                   <button
//                     onClick={() => {
//                       router.push("/about-us");
//                       setMenuOpen(false);
//                     }}
//                     className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
//                       isActive("/about-us")
//                         ? "bg-indigo-50 text-indigo-600"
//                         : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
//                     }`}
//                   >
//                     <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${
//                       isActive("/about-us") ? "bg-indigo-100" : "bg-gray-100"
//                     }`}>
//                       <IoIosInformationCircleOutline className={`font-extrabold text-2xl ${isActive("/about-us") ? "text-indigo-600" : "text-gray-600"}`} />
//                     </div>
//                     <span className="text-left flex-1">About Us</span>
//                   </button>

//                   {/* Divider */}
//                   <div className="my-4 border-t border-indigo-100"></div>

//                   {/* Login Button (if not logged in) */}
//                   {userLoggedIn ? (
//                     <button
//                       onClick={() => {
//                         router.push("/dashboard");
//                         setMenuOpen(false);
//                       }}
//                       className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold bg-linear-to-r from-indigo-600 to-indigo-500 text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
//                     >
//                       <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
//                         <svg
//                           className="w-5 h-5 text-white"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
//                           />
//                         </svg>
//                       </div>
//                       <span className="text-left flex-1">Dashboard</span>
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => {
//                         router.push("/login");
//                         setMenuOpen(false);
//                       }}
//                       className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl font-nunito font-semibold bg-linear-to-r from-indigo-600 to-indigo-500 text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
//                     >
//                       <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
//                         <svg
//                           className="w-5 h-5 text-white"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
//                           />
//                         </svg>
//                       </div>
//                       <span className="text-left flex-1">Log in</span>
//                     </button>
//                   )}
//                 </div>

//                 {/* Additional Info */}
//                 <div className="mt-8 pt-6 border-t border-indigo-100">
//                   <div className="text-center text-gray-500 text-xs sm:text-sm">
//                     <p>Need help? Contact us at</p>
//                     <p className="font-semibold text-indigo-600 mt-1">
//                       passats@gmail.com
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="border-t border-indigo-100 p-4">
//                 <div className="text-center text-gray-400 text-xs">
//                   © {new Date().getFullYear()} PassATS. All rights
//                   reserved.
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// };

// export default Header;













"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiMenu, FiUser, FiX } from "react-icons/fi";
import { SiReaddotcv } from "react-icons/si";
import { RedGradientButton } from "../ui";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  // Check login status
  useEffect(() => {
    const user = localStorage.getItem("user_details");
    setUserLoggedIn(Boolean(user));
  }, []);

  // Handle scroll show/hide
  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;

      // Only trigger after 100px scroll
      if (currentScrollY > 100) {
        setShowHeader(currentScrollY < lastScrollY); // scroll up → show
      } else {
        setShowHeader(true); // always show at top
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock body scroll on mobile menu
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  // Helper function to check if path is active
  const isActive = (path: string) => {
    if (path === "/") return pathname === path;
    return pathname === path;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: showHeader ? 0 : -120 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white backdrop-blur-lg border-b shadow-red-300/10 border-gray-100 sticky top-0 z-50"
    >
      <div className="flex justify-between items-center px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 py-2 xs:py-2.5 sm:py-3 md:py-4 mx-auto">
        {/* Logo - responsive sizing */}
        <button onClick={() => router.push("/")} className="cursor-pointer flex-shrink-0">
          <div className="relative w-[100px] xs:w-[120px] sm:w-[140px] md:w-[150px] h-[33px] xs:h-[40px] sm:h-[46px] md:h-[50px]">
            <Image
              src="/logo.png"
              alt="ATS Pass"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 480px) 100px, (max-width: 640px) 120px, (max-width: 768px) 140px, 150px"
            />
          </div>
        </button>

        {/* Desktop Menu - hidden on tablet and mobile */}
        <nav className="hidden lg:flex gap-1.5 xl:gap-2 2xl:gap-3">
          <button
            className={`px-3 xl:px-4 2xl:px-5 py-1.5 xl:py-2 rounded-lg font-nunito font-semibold transition-all duration-200 text-[13px] xl:text-sm cursor-pointer whitespace-nowrap ${
              isActive("/")
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
            onClick={() => router.push("/")}
          >
            Home
          </button>

          <button
            className={`px-3 xl:px-4 2xl:px-5 py-1.5 xl:py-2 rounded-lg font-nunito font-semibold transition-all duration-200 text-[13px] xl:text-sm cursor-pointer whitespace-nowrap ${
              isActive("/choose-template")
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
            onClick={() => router.push("/choose-template")}
          >
            Build Resume
          </button>

          <button
            className={`px-3 xl:px-4 2xl:px-5 py-1.5 xl:py-2 rounded-lg font-nunito font-semibold transition-all duration-200 text-[13px] xl:text-sm cursor-pointer whitespace-nowrap ${
              isActive("/ats-checker")
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
            onClick={() => router.push("/ats-checker")}
          >
            ATS Checker
          </button>

          <button
            className={`px-3 xl:px-4 2xl:px-5 py-1.5 xl:py-2 rounded-lg font-nunito font-semibold transition-all duration-200 text-[13px] xl:text-sm cursor-pointer whitespace-nowrap ${
              isActive("/about-us")
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
            onClick={() => router.push("/about-us")}
          >
            About Us
          </button>

          <button
            className={`px-3 xl:px-4 2xl:px-5 py-1.5 xl:py-2 rounded-lg font-nunito font-semibold transition-all duration-200 text-[13px] xl:text-sm cursor-pointer whitespace-nowrap ${
              isActive("/choose-plan")
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
            onClick={() => router.push("/choose-plan")}
          >
            Pricing
          </button>

          {userLoggedIn ? (
            <button
              onClick={() => router.push("/dashboard")}
              className={`lg:ml-2 xl:ml-3 px-4 xl:px-5 2xl:px-6 py-1.5 xl:py-2 rounded-lg font-semibold transition-all duration-200 text-[13px] xl:text-sm cursor-pointer flex items-center gap-1.5 xl:gap-2 whitespace-nowrap ${
                isActive("/dashboard")
                  ? "bg-indigo-50 text-indigo-600"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
              }`}
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className={`lg:ml-2 xl:ml-3 px-4 xl:px-5 2xl:px-6 py-1.5 xl:py-2 rounded-lg font-semibold transition-all duration-200 text-[13px] xl:text-sm cursor-pointer flex items-center gap-1.5 xl:gap-2 whitespace-nowrap ${
                isActive("/login")
                  ? "bg-indigo-50 text-indigo-600"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
              }`}
            >
              Sign In
            </button>
          )}
        </nav>

        {/* Mobile & Tablet Menu Button - visible on lg and below */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="lg:hidden p-1.5 sm:p-2 -mr-1.5 sm:-mr-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <FiX size={22} className="sm:w-6 sm:h-6 text-slate-700" />
          ) : (
            <FiMenu size={22} className="sm:w-6 sm:h-6 text-slate-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <div className="h-dvh overflow-hidden lg:hidden">
            {/* Backdrop Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Sidebar Menu */}
            <motion.div
              className="fixed top-0 right-0 z-50 h-screen w-[85%] max-w-sm bg-white shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Sidebar Header */}
              <div className="flex items-center bg-white justify-between p-3 xs:p-4 sm:p-5 md:p-6 border-b border-indigo-100">
                <div className="flex items-center gap-2 xs:gap-3">
                  <div className="p-1.5 xs:p-2 bg-linear-to-br from-indigo-500/10 to-indigo-600/10 rounded-lg">
                    <svg
                      className="w-4 h-4 xs:w-5 xs:h-5 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </div>
                  <span className="text-base xs:text-lg sm:text-xl font-nunito font-semibold text-gray-800">
                    Menu
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 xs:p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                  aria-label="Close menu"
                >
                  <FiX className="text-gray-800 hover:text-indigo-600 font-semibold text-xl xs:text-2xl" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto p-3 xs:p-4 sm:p-5 md:p-6">
                <div className="space-y-2 xs:space-y-2.5 sm:space-y-3">
                  {/* Home Button */}
                  <button
                    onClick={() => {
                      router.push("/");
                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 xs:gap-3 p-2.5 xs:p-3 sm:p-3.5 md:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
                      isActive("/")
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    <div className={`p-1.5 xs:p-2 rounded-lg transition-transform group-hover:scale-110 flex-shrink-0 ${
                      isActive("/") ? "bg-indigo-100" : "bg-gray-100"
                    }`}>
                      <svg
                        className={`w-4 h-4 xs:w-5 xs:h-5 ${isActive("/") ? "text-indigo-600" : "text-gray-600"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    </div>
                    <span className="text-left flex-1 text-sm xs:text-base">Home</span>
                  </button>

                  <button
                    onClick={() => {
                      router.push("/choose-template");
                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 xs:gap-3 p-2.5 xs:p-3 sm:p-3.5 md:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
                      isActive("/choose-template")
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    <div className={`p-1.5 xs:p-2 rounded-lg transition-transform group-hover:scale-110 flex-shrink-0 ${
                      isActive("/choose-template") ? "bg-indigo-100" : "bg-gray-100"
                    }`}>
                      <SiReaddotcv className={`text-base xs:text-xl ${isActive("/choose-template") ? "text-indigo-600" : "text-gray-600"} font-extrabold`} />
                    </div>
                    <span className="text-left flex-1 text-sm xs:text-base">Build Resume</span>
                  </button>

                  <button
                    onClick={() => {
                      router.push("/choose-plan");
                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 xs:gap-3 p-2.5 xs:p-3 sm:p-3.5 md:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
                      isActive("/choose-plan")
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    <div className={`p-1.5 xs:p-2 rounded-lg transition-transform group-hover:scale-110 flex-shrink-0 ${
                      isActive("/choose-plan") ? "bg-indigo-100" : "bg-gray-100"
                    }`}>
                      <svg
                        className={`w-4 h-4 xs:w-5 xs:h-5 ${isActive("/choose-plan") ? "text-indigo-600" : "text-gray-600"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-left flex-1 text-sm xs:text-base">Pricing</span>
                  </button>

                  <button
                    onClick={() => {
                      router.push("/ats-checker");
                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 xs:gap-3 p-2.5 xs:p-3 sm:p-3.5 md:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
                      isActive("/ats-checker")
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    <div className={`p-1.5 xs:p-2 rounded-lg transition-transform group-hover:scale-110 flex-shrink-0 ${
                      isActive("/ats-checker") ? "bg-indigo-100" : "bg-gray-100"
                    }`}>
                      <svg
                        className={`w-4 h-4 xs:w-5 xs:h-5 ${isActive("/ats-checker") ? "text-indigo-600" : "text-gray-600"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                    </div>
                    <span className="text-left flex-1 text-sm xs:text-base">ATS Checker</span>
                  </button>

                  {/* Contact Us Button */}
                  <button
                    onClick={() => {
                      router.push("/contact-us");
                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 xs:gap-3 p-2.5 xs:p-3 sm:p-3.5 md:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
                      isActive("/contact-us")
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    <div className={`p-1.5 xs:p-2 rounded-lg transition-transform group-hover:scale-110 flex-shrink-0 ${
                      isActive("/contact-us") ? "bg-indigo-100" : "bg-gray-100"
                    }`}>
                      <svg
                        className={`w-4 h-4 xs:w-5 xs:h-5 ${isActive("/contact-us") ? "text-indigo-600" : "text-gray-600"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-left flex-1 text-sm xs:text-base">Contact Us</span>
                  </button>

                  <button
                    onClick={() => {
                      router.push("/about-us");
                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 xs:gap-3 p-2.5 xs:p-3 sm:p-3.5 md:p-4 rounded-xl font-nunito font-semibold transition-all duration-200 group ${
                      isActive("/about-us")
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    <div className={`p-1.5 xs:p-2 rounded-lg transition-transform group-hover:scale-110 flex-shrink-0 ${
                      isActive("/about-us") ? "bg-indigo-100" : "bg-gray-100"
                    }`}>
                      <IoIosInformationCircleOutline className={`font-extrabold text-xl xs:text-2xl ${isActive("/about-us") ? "text-indigo-600" : "text-gray-600"}`} />
                    </div>
                    <span className="text-left flex-1 text-sm xs:text-base">About Us</span>
                  </button>

                  {/* Divider */}
                  <div className="my-3 xs:my-4 border-t border-indigo-100"></div>

                  {/* Login Button (if not logged in) */}
                  {userLoggedIn ? (
                    <button
                      onClick={() => {
                        router.push("/dashboard");
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 xs:gap-3 p-2.5 xs:p-3 sm:p-3.5 md:p-4 rounded-xl font-nunito font-semibold bg-linear-to-r from-indigo-600 to-indigo-500 text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
                    >
                      <div className="p-1.5 xs:p-2 bg-white/20 rounded-lg backdrop-blur-sm group-hover:scale-110 transition-transform flex-shrink-0">
                        <svg
                          className="w-4 h-4 xs:w-5 xs:h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          />
                        </svg>
                      </div>
                      <span className="text-left flex-1 text-sm xs:text-base">Dashboard</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        router.push("/login");
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 xs:gap-3 p-2.5 xs:p-3 sm:p-3.5 md:p-4 rounded-xl font-nunito font-semibold bg-linear-to-r from-indigo-600 to-indigo-500 text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
                    >
                      <div className="p-1.5 xs:p-2 bg-white/20 rounded-lg backdrop-blur-sm group-hover:scale-110 transition-transform flex-shrink-0">
                        <svg
                          className="w-4 h-4 xs:w-5 xs:h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          />
                        </svg>
                      </div>
                      <span className="text-left flex-1 text-sm xs:text-base">Log in</span>
                    </button>
                  )}
                </div>

                {/* Additional Info */}
                <div className="mt-6 xs:mt-8 pt-4 xs:pt-6 border-t border-indigo-100">
                  <div className="text-center text-gray-500 text-[11px] xs:text-xs sm:text-sm">
                    <p>Need help? Contact us at</p>
                    <p className="font-semibold text-indigo-600 mt-1 text-[11px] xs:text-xs sm:text-sm">
                      passats@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-indigo-100 p-3 xs:p-4">
                <div className="text-center text-gray-400 text-[10px] xs:text-xs">
                  © {new Date().getFullYear()} PassATS. All rights reserved.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;