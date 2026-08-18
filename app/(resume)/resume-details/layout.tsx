// "use client";
// import { templateData } from "@/app/data";
// import { useState, useEffect, useContext, useRef, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FiChevronRight,
//   FiLayout,
//   FiLogIn,
//   FiEye,
//   FiX,
//   FiArrowRight,
//   FiMove,
// } from "react-icons/fi";
// import { getLocalStorage } from "@/app/utils";
// import { Template } from "@/app/types";
// import { motion, AnimatePresence } from "framer-motion";
// import LoginModel from "@/app/components/auth/LoginModel";
// import { ResumeDataFetcher, usePreventReload } from "@/app/hooks";
// import { SimpleCanvasPreview } from "@/app/components/resume";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const router = useRouter();
//   const chosenTemplate = getLocalStorage<Template>("chosenTemplate");
//   const [isTemplateHovered, setIsTemplateHovered] = useState(false);
//   const [isDragHovered, setIsDragHovered] = useState(false);
//   const [showMobilePreview, setShowMobilePreview] = useState(false);

//   // State for drag divider
//   const [leftWidth, setLeftWidth] = useState(50); // percentage
//   const [isDragging, setIsDragging] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isLargeScreen, setIsLargeScreen] = useState(false);

//   const selectedResume = templateData.find(
//     (resume) => resume.id == (chosenTemplate?.id || chosenTemplate?.templateId),
//   );

//   const SelectedComponent = selectedResume?.component;

//   // Check screen size
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsLargeScreen(window.innerWidth >= 1024);
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);

//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   // Handle mouse drag
//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (!isLargeScreen) return;
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleMouseMove = useCallback((e: MouseEvent) => {
//     if (!isDragging || !containerRef.current || !isLargeScreen) return;

//     const containerRect = containerRef.current.getBoundingClientRect();
//     const containerWidth = containerRect.width;
//     const mouseX = e.clientX - containerRect.left;

//     let percentage = (mouseX / containerWidth) * 100;
//     percentage = Math.max(20, Math.min(80, percentage));

//     setLeftWidth(percentage);
//   }, [isDragging, isLargeScreen]);

//   const handleMouseUp = useCallback(() => {
//     setIsDragging(false);
//   }, []);

//   // Add/remove event listeners
//   useEffect(() => {
//     if (isDragging && isLargeScreen) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//       document.body.style.userSelect = 'none';
//       document.body.style.cursor = 'col-resize';
//     } else {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//       document.body.style.userSelect = '';
//       document.body.style.cursor = '';
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//       document.body.style.userSelect = '';
//       document.body.style.cursor = '';
//     };
//   }, [isDragging, isLargeScreen, handleMouseMove, handleMouseUp]);

//   return (
//     <div
//       ref={containerRef}
//       className="flex h-screen bg-gray-100 relative overflow-hidden"
//     >
//       <LoginModel />

//       {/* Left Section - Form */}
//       <aside
//         className={`overflow-y-auto no-scollbar ${isLargeScreen ? '' : 'lg:w-1/2 w-full'}`}
//         style={isLargeScreen ? {
//           width: `${leftWidth}%`,
//           minWidth: '20%',
//         } : undefined}
//       >
//         <ResumeDataFetcher>{children}</ResumeDataFetcher>
//       </aside>

//       {/* Draggable Divider - Enhanced UI */}
//       {isLargeScreen && (
//         <div
//           className={`relative flex-shrink-0 z-10 group transition-all duration-200 ${
//             isDragging ? 'cursor-col-resize' : 'cursor-col-resize'
//           }`}
//           style={{ width: '8px' }}
//           onMouseDown={handleMouseDown}
//           onMouseEnter={() => setIsDragHovered(true)}
//           onMouseLeave={() => setIsDragHovered(false)}
//         >
//           {/* Background glow - always visible but subtle */}
//           <div className={`absolute inset-0 transition-all duration-300 ${
//             isDragging
//               ? 'bg-indigo-500/30'
//               : 'bg-indigo-400/10 group-hover:bg-indigo-400/20'
//           }`} />

//           {/* Main divider line */}
//           <div className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] transition-all duration-300 ${
//             isDragging
//               ? 'bg-indigo-600 shadow-lg shadow-indigo-400/50'
//               : 'bg-gray-400 group-hover:bg-indigo-500 group-hover:shadow-lg group-hover:shadow-indigo-400/30'
//           }`} />

//           {/* Drag handle - centered with pulsing animation */}
//           <motion.div
//             className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
//               flex flex-col items-center justify-center gap-0.5
//               bg-white shadow-lg rounded-lg p-1.5
//               transition-all duration-300 pointer-events-none
//               ${isDragging ? 'scale-110 ring-2 ring-indigo-500' : 'group-hover:scale-110'}`}
//             animate={{
//               scale: isDragging ? 1.1 : 1,
//               boxShadow: isDragging ? '0 0 20px rgba(99, 102, 241, 0.4)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             <FiMove className={`w-3 h-3 transition-colors duration-300 ${
//               isDragging ? 'text-indigo-600' : 'text-gray-500 group-hover:text-indigo-600'
//             }`} />
//             <div className="flex gap-0.5">
//               {[1, 2, 3].map((dot) => (
//                 <motion.div
//                   key={dot}
//                   className={`w-0.5 h-0.5 rounded-full transition-colors duration-300 ${
//                     isDragging ? 'bg-indigo-600' : 'bg-gray-400 group-hover:bg-indigo-500'
//                   }`}
//                   animate={isDragging ? {
//                     scaleY: [1, 1.5, 1],
//                   } : {}}
//                   transition={{
//                     repeat: isDragging ? Infinity : 0,
//                     duration: 0.5,
//                     delay: dot * 0.1,
//                   }}
//                 />
//               ))}
//             </div>
//           </motion.div>

//           {/* Tooltip - "Drag to resize" - Now uses isDragHovered instead of isHovered */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{
//               opacity: isDragHovered || isDragging ? 1 : 0,
//               y: isDragHovered || isDragging ? 0 : 10,
//             }}
//             transition={{ duration: 0.3 }}
//             className={`absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-16
//               bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap
//               shadow-lg pointer-events-none ${(isDragHovered || isDragging) ? 'opacity-100' : 'opacity-0'}`}
//           >
//             {isDragging ? 'Release to resize' : 'Drag to resize'}
//             <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900" />
//           </motion.div>

//         </div>
//       )}

//       {/* Right Section - Resume Preview */}
//       <section
//         className={`bg-[#e8e6f2] overflow-hidden ${isLargeScreen ? '' : 'max-lg:hidden lg:w-1/2'}`}
//         style={isLargeScreen ? {
//           width: `${100 - leftWidth}%`,
//           minWidth: '20%',
//         } : undefined}
//       >

//         {/* change template - Now uses isTemplateHovered */}
//         <div
//           className="absolute top-4 right-4 z-10"
//           onMouseEnter={() => setIsTemplateHovered(true)}
//           onMouseLeave={() => setIsTemplateHovered(false)}
//         >
//           <motion.button
//             onClick={() => router.push("/change-template")}
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             whileHover={{ scale: 1.02, y: -2 }}
//             whileTap={{ scale: 0.98 }}
//             className={`flex items-center gap-2 px-4 py-2.5 bg-white backdrop-blur-md border border-gray-200/50 hover:border-indigo-400 text-gray-700 hover:text-indigo-600 font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer ${isTemplateHovered ? "shadow-lg bg-white" : ""}`}
//           >
//             <div className="relative">
//               <motion.div
//                 animate={{ rotate: isTemplateHovered ? 180 : 0 }}
//                 transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
//                 className="p-0.5"
//               >
//                 <FiLayout className="w-4 h-4" />
//               </motion.div>
//               {isTemplateHovered && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="absolute inset-0 bg-indigo-400 rounded-full blur-md -z-10"
//                 />
//               )}
//             </div>
//             <span className="text-sm font-medium">Change Template</span>
//             <motion.div
//               animate={{ x: isTemplateHovered ? 5 : 0 }}
//               transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
//             >
//               <FiChevronRight className="w-4 h-4" />
//             </motion.div>
//           </motion.button>
//         </div>

//         {SelectedComponent && (
//           <SimpleCanvasPreview>
//             <SelectedComponent />
//           </SimpleCanvasPreview>
//         )}
//       </section>

//       {/* Mobile Preview Button */}
//       {SelectedComponent && (
//         <motion.button
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => setShowMobilePreview(true)}
//           className="lg:hidden fixed top-16 right-4 z-20 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
//         >
//           <FiEye className="w-3 h-3" />
//         </motion.button>
//       )}

//       {/* Mobile Preview Drawer */}
//       <AnimatePresence>
//         {showMobilePreview && SelectedComponent && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setShowMobilePreview(false)}
//               className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-50"
//             />

//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="lg:hidden fixed top-0 right-0 h-full w-full sm:w-[90%] bg-white shadow-2xl z-50 overflow-hidden sm:rounded-l-3xl"
//             >
//               <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3 flex justify-between items-center z-10">
//                 <div className="flex items-center gap-2">
//                   <div className="p-1.5 bg-white/20 rounded-lg">
//                     <FiEye className="w-4 h-4 text-white" />
//                   </div>
//                   <span className="text-white font-semibold text-sm">
//                     Resume Preview
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => setShowMobilePreview(false)}
//                   className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
//                 >
//                   <FiX className="w-5 h-5 text-white" />
//                 </button>
//               </div>

//               <div className="absolute top-12 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-2 z-10">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
//                     <span className="text-xs text-gray-500">Live Preview</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="h-full pt-24 pb-6 overflow-y-auto">
//                 <div className="">
//                   <SimpleCanvasPreview>
//                     <SelectedComponent />
//                   </SimpleCanvasPreview>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";
import { templateData } from "@/app/data";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FiChevronRight,
  FiLayout,
  FiLogIn,
  FiEye,
  FiX,
  FiArrowRight,
  FiMove,
} from "react-icons/fi";
import {
  getLocalStorage,
  setLocalStorage,
  getSessionStorage,
} from "@/app/utils";
import { Template } from "@/app/types";
import { User } from "@/app/types/user.types";
import { motion, AnimatePresence } from "framer-motion";
import LoginModel from "@/app/components/auth/LoginModel";
import { ResumeDataFetcher, usePreventReload } from "@/app/hooks";
import { SimpleCanvasPreview } from "@/app/components/resume";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import api from "@/app/utils/api";
import { IoDiamondOutline } from "react-icons/io5";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const chosenTemplate = getLocalStorage<Template>("chosenTemplate");
  const [isTemplateHovered, setIsTemplateHovered] = useState(false);
  const [isDragHovered, setIsDragHovered] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // State for drag divider
  const [leftWidth, setLeftWidth] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // --- Resume choice modal state ---
  const [showResumeChoiceModal, setShowResumeChoiceModal] = useState(false);
  const {
    setContact,
    setEducation,
    setExperiences,
    setProjects,
    setSkills,
    setSummary,
    setFinalize,
    setFullResumeData,
  } = useContext(CreateContext);

  const userDetails = getLocalStorage<User>("user_details");
  const userId = userDetails?.id;
  const isOldRouteNameDashboard = getSessionStorage("oldRouteNameDashboard");

  const selectedResume = templateData.find(
    (resume) => resume.id == (chosenTemplate?.id || chosenTemplate?.templateId),
  );

  const SelectedComponent = selectedResume?.component;

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // --- Ask "Continue last resume?" vs "Create new resume?" ---
  // Runs every time the user lands on the contact page (flow entry point),
  // as long as they're not coming from a dashboard "Edit" click.
  // No session persistence — this check (and the modal) fires on every visit.
 // In your layout — add a ref to track first mount
const hasCheckedResumeChoice = useRef(false);

useEffect(() => {
  const isContactPage = pathname === "/resume-details/contact";
  if (!isContactPage || !userId) return;
  if (isOldRouteNameDashboard) return;

  // Only run this check once per full page load — not on every
  // in-app navigation back to the contact step
  if (hasCheckedResumeChoice.current) return;
  hasCheckedResumeChoice.current = true;

  const checkExisting = async () => {
    try {
      const response = await api.get(`${API_URL}/user-resumes`);
      const hasExisting = Array.isArray(response.data) && response.data.length > 0;

      if (hasExisting) {
        setShowResumeChoiceModal(true);
      }
    } catch (err) {
      console.error("Error checking existing resumes:", err);
    }
  };

  checkExisting();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [pathname, userId]); 

  const handleContinueLastResume = () => {
    setShowResumeChoiceModal(false);
    // ResumeDataFetcher's normal fetch runs as-is and prefills the last resume
  };

  const handleCreateNewResume = () => {
    localStorage.removeItem("latest_resume_id");

     setContact({
      contactId: "",
      firstName: "",
      lastName: "",
      jobTitle: "",
      phone: "",
      email: "",
      linkedIn: "",
      portfolio: "",
      address: "",
      city: "",
      country: "",
      postCode: "",
      croppedImage: null,
    });
    setEducation([]);
    setExperiences([]);
    setProjects([]);
    setSkills({});
    setSummary("");
    setFinalize({});
    setFullResumeData(null);

    setLocalStorage("isNewResumeMode", "true");
    setShowResumeChoiceModal(false);
  };

  // Handle mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isLargeScreen) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current || !isLargeScreen) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const mouseX = e.clientX - containerRect.left;

      let percentage = (mouseX / containerWidth) * 100;
      percentage = Math.max(20, Math.min(80, percentage));

      setLeftWidth(percentage);
    },
    [isDragging, isLargeScreen],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add/remove event listeners
  useEffect(() => {
    if (isDragging && isLargeScreen) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
      document.body.style.cursor = "col-resize";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isDragging, isLargeScreen, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className="flex h-screen bg-gray-100 relative overflow-hidden"
    >
      <LoginModel />

      {/* Resume Choice Modal */}
      {/* <AnimatePresence>
        {showResumeChoiceModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-100 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-4">
                <h2 className="text-lg font-semibold text-white">
                  Welcome back!
                </h2>
                <p className="text-indigo-100 text-xs mt-1">
                  You have a resume in progress. What would you like to do?
                </p>
              </div>
              <div className="p-5 space-y-3">
                <button
                  onClick={handleContinueLastResume}
                  className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all cursor-pointer"
                >
                  Continue Last Resume
                </button>
                <button
                  onClick={handleCreateNewResume}
                  className="w-full px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
                >
                  Create New Resume
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence> */}

      <AnimatePresence>
  {showResumeChoiceModal && (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden "
      >
        {/* Header */}
        <div className="relative px-6 sm:px-8 pt-8 pb-6 bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-600 overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

          <div className="relative flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4 ring-1 ring-white/20">
              <IoDiamondOutline className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Welcome back
            </h2>
            <p className="text-indigo-100 text-sm mt-1.5 max-w-xs">
              You have a resume already in progress. How would you like to proceed?
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="p-5 sm:p-6 space-y-3 bg-white">
          <button
            onClick={handleContinueLastResume}
            className="w-full group flex items-center gap-4 p-4 rounded-2xl border-2 border-indigo-100 bg-indigo-50/50 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200 cursor-pointer text-left"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
              <FiArrowRight className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">
                Continue Last Resume
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Pick up right where you left off
              </p>
            </div>
            <FiChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </button>

          <button
            onClick={handleCreateNewResume}
            className="w-full group flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer text-left"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center group-hover:bg-gray-300 transition-colors">
              <FiLayout className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">
                Create New Resume
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Start fresh with a blank resume
              </p>
            </div>
            <FiChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </button>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>

      {/* Left Section - Form */}
      <aside
        className={`overflow-y-auto no-scollbar ${isLargeScreen ? "" : "lg:w-1/2 w-full"}`}
        style={
          isLargeScreen
            ? {
                width: `${leftWidth}%`,
                minWidth: "20%",
              }
            : undefined
        }
      >
        <ResumeDataFetcher>{children}</ResumeDataFetcher>
      </aside>

      {/* Draggable Divider - Enhanced UI */}
      {isLargeScreen && (
        <div
          className={`relative flex-shrink-0 z-10 group transition-all duration-200 ${
            isDragging ? "cursor-col-resize" : "cursor-col-resize"
          }`}
          style={{ width: "8px" }}
          onMouseDown={handleMouseDown}
          onMouseEnter={() => setIsDragHovered(true)}
          onMouseLeave={() => setIsDragHovered(false)}
        >
          {/* Background glow - always visible but subtle */}
          <div
            className={`absolute inset-0 transition-all duration-300 ${
              isDragging
                ? "bg-indigo-500/30"
                : "bg-indigo-400/10 group-hover:bg-indigo-400/20"
            }`}
          />

          {/* Main divider line */}
          <div
            className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] transition-all duration-300 ${
              isDragging
                ? "bg-indigo-600 shadow-lg shadow-indigo-400/50"
                : "bg-gray-400 group-hover:bg-indigo-500 group-hover:shadow-lg group-hover:shadow-indigo-400/30"
            }`}
          />

          {/* Drag handle - centered with pulsing animation */}
          <motion.div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              flex flex-col items-center justify-center gap-0.5 
              bg-white shadow-lg rounded-lg p-1.5 
              transition-all duration-300 pointer-events-none
              ${isDragging ? "scale-110 ring-2 ring-indigo-500" : "group-hover:scale-110"}`}
            animate={{
              scale: isDragging ? 1.1 : 1,
              boxShadow: isDragging
                ? "0 0 20px rgba(99, 102, 241, 0.4)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <FiMove
              className={`w-3 h-3 transition-colors duration-300 ${
                isDragging
                  ? "text-indigo-600"
                  : "text-gray-500 group-hover:text-indigo-600"
              }`}
            />
            <div className="flex gap-0.5">
              {[1, 2, 3].map((dot) => (
                <motion.div
                  key={dot}
                  className={`w-0.5 h-0.5 rounded-full transition-colors duration-300 ${
                    isDragging
                      ? "bg-indigo-600"
                      : "bg-gray-400 group-hover:bg-indigo-500"
                  }`}
                  animate={
                    isDragging
                      ? {
                          scaleY: [1, 1.5, 1],
                        }
                      : {}
                  }
                  transition={{
                    repeat: isDragging ? Infinity : 0,
                    duration: 0.5,
                    delay: dot * 0.1,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Tooltip - "Drag to resize" */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isDragHovered || isDragging ? 1 : 0,
              y: isDragHovered || isDragging ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
            className={`absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-16 
              bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap
              shadow-lg pointer-events-none ${isDragHovered || isDragging ? "opacity-100" : "opacity-0"}`}
          >
            {isDragging ? "Release to resize" : "Drag to resize"}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900" />
          </motion.div>
        </div>
      )}

      {/* Right Section - Resume Preview */}
      <section
        className={`bg-[#e8e6f2] overflow-hidden ${isLargeScreen ? "" : "max-lg:hidden lg:w-1/2"}`}
        style={
          isLargeScreen
            ? {
                width: `${100 - leftWidth}%`,
                minWidth: "20%",
              }
            : undefined
        }
      >
        {/* change template */}
        {/* <div
          className="absolute top-4 right-4 z-10"
          onMouseEnter={() => setIsTemplateHovered(true)}
          onMouseLeave={() => setIsTemplateHovered(false)}
        >
          <motion.button
            onClick={() => router.push("/change-template")}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 px-4 py-2.5 bg-white backdrop-blur-md border border-gray-200/50 hover:border-indigo-400 text-gray-700 hover:text-indigo-600 font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer ${isTemplateHovered ? "shadow-lg bg-white" : ""}`}
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: isTemplateHovered ? 180 : 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                className="p-0.5"
              >
                <FiLayout className="w-4 h-4" />
              </motion.div>
              {isTemplateHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-indigo-400 rounded-full blur-md -z-10"
                />
              )}
            </div>
            <span className="text-sm font-medium">Change Template</span>
            <motion.div
              animate={{ x: isTemplateHovered ? 5 : 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              <FiChevronRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div> */}

        {SelectedComponent && (
          <SimpleCanvasPreview>
            <SelectedComponent />
          </SimpleCanvasPreview>
        )}
      </section>

      {/* Mobile Preview Button */}
      {SelectedComponent && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMobilePreview(true)}
          className="lg:hidden fixed top-16 right-4 z-20 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FiEye className="w-3 h-3" />
        </motion.button>
      )}

      {/* Mobile Preview Drawer */}
      <AnimatePresence>
        {showMobilePreview && SelectedComponent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobilePreview(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 h-full w-full sm:w-[90%] bg-white shadow-2xl z-50 overflow-hidden sm:rounded-l-3xl"
            >
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3 flex justify-between items-center z-10">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <FiEye className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm">
                    Resume Preview
                  </span>
                </div>
                <button
                  onClick={() => setShowMobilePreview(false)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="absolute top-12 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-2 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-500">Live Preview</span>
                  </div>
                </div>
              </div>

              <div className="h-full pt-24 pb-6 overflow-y-auto">
                <div className="">
                  <SimpleCanvasPreview>
                    <SelectedComponent />
                  </SimpleCanvasPreview>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
