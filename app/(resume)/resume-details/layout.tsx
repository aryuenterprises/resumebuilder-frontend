// "use client";
// import { templateData } from "@/app/data";
// import { useState, useEffect, useContext, useRef } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FiChevronRight,
//   FiLayout,
//   FiLogIn,
//   FiEye,
//   FiX,
//   FiArrowRight,
// } from "react-icons/fi";
// import { getLocalStorage, setLocalStorage } from "@/app/utils";
// import { Template } from "@/app/types";
// import { User } from "@/app/types/user.types";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { API_URL } from "@/app/config/api";
// import { CreateContext } from "@/app/context/CreateContext";
// import LoginModel from "@/app/components/auth/LoginModel";
// import { ResumeDataFetcher, usePreventReload } from "@/app/hooks";
// import { SimpleCanvasPreview, Stepper } from "@/app/components/resume";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const router = useRouter();
//   const chosenTemplate = getLocalStorage<Template>("chosenTemplate");
//   const [isHovered, setIsHovered] = useState(false);
//   const [showMobilePreview, setShowMobilePreview] = useState(false);

//   const selectedResume = templateData.find(
//     (resume) => resume.id == (chosenTemplate?.id || chosenTemplate?.templateId),
//   );


//   const SelectedComponent = selectedResume?.component;

//   // usePreventReload()

//   return (
//     <div className="flex h-screen bg-gray-100  relative">
//       <LoginModel />

//       <aside className="w-full lg:w-1/2 overflow-y-auto ">
//         <ResumeDataFetcher>{children}</ResumeDataFetcher>
//       </aside>

//       <section className="max-lg:hidden w-1/2 bg-[#e8e6f2]">
//         <div
//           className="absolute top-4 right-4 z-10"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <motion.button
//             onClick={() => router.push("/change-template")}
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             whileHover={{ scale: 1.02, y: -2 }}
//             whileTap={{ scale: 0.98 }}
//             className={`flex items-center gap-2 px-4 py-2.5  bg-white backdrop-blur-md border border-gray-200/50 hover:border-indigo-400  text-gray-700 hover:text-indigo-600  font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer ${isHovered ? "shadow-lg bg-white" : ""}
//     `}
//           >
//             {/* Animated Icon Container */}
//             <div className="relative">
//               <motion.div
//                 animate={{ rotate: isHovered ? 180 : 0 }}
//                 transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
//                 className="p-0.5"
//               >
//                 <FiLayout className="w-4 h-4" />
//               </motion.div>
//               {/* Glow effect on hover */}
//               {isHovered && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="absolute inset-0 bg-indigo-400 rounded-full blur-md -z-10"
//                 />
//               )}
//             </div>

//             <span className="text-sm font-medium">Change Template</span>

//             <motion.div
//               animate={{ x: isHovered ? 5 : 0 }}
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

//       {/* Mobile Preview Button - Only visible on small screens */}
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
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setShowMobilePreview(false)}
//               className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-50"
//             />

//             {/* Drawer */}
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="lg:hidden fixed top-0 right-0 h-full w-full sm:w-[90%] bg-white shadow-2xl z-50 overflow-hiddenl sm:rounded-l-3xl"
//             >
//               {/* Drawer Header with Gradient */}
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

//               {/* Template Info Bar */}
//               <div className="absolute top-12 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-2 z-10">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
//                     <span className="text-xs text-gray-500">Live Preview</span>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setShowMobilePreview(false);
//                       router.push("/change-template");
//                     }}
//                     className="flex items-center gap-1 px-2 py-1 bg-indigo-50 rounded-lg text-indigo-600 text-xs font-medium"
//                   >
//                     <FiLayout className="w-3 h-3" />
//                     Change Template
//                   </button>
//                 </div>
//               </div>

//               {/* Drawer Content - Resume Preview */}
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
import { useRouter } from "next/navigation";
import {
  FiChevronRight,
  FiLayout,
  FiLogIn,
  FiEye,
  FiX,
  FiArrowRight,
  FiMove,
} from "react-icons/fi";
import { getLocalStorage, setLocalStorage } from "@/app/utils";
import { Template } from "@/app/types";
import { User } from "@/app/types/user.types";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_URL } from "@/app/config/api";
import { CreateContext } from "@/app/context/CreateContext";
import LoginModel from "@/app/components/auth/LoginModel";
import { ResumeDataFetcher, usePreventReload } from "@/app/hooks";
import { SimpleCanvasPreview, Stepper } from "@/app/components/resume";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const chosenTemplate = getLocalStorage<Template>("chosenTemplate");
  const [isHovered, setIsHovered] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  
  // State for drag divider
  const [leftWidth, setLeftWidth] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

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
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isLargeScreen) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current || !isLargeScreen) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = e.clientX - containerRect.left;
    
    let percentage = (mouseX / containerWidth) * 100;
    percentage = Math.max(20, Math.min(80, percentage));
    
    setLeftWidth(percentage);
  }, [isDragging, isLargeScreen]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add/remove event listeners
  useEffect(() => {
    if (isDragging && isLargeScreen) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, isLargeScreen, handleMouseMove, handleMouseUp]);

  return (
    <div 
      ref={containerRef}
      className="flex h-screen bg-gray-100 relative overflow-hidden"
    >
      <LoginModel />

      {/* Left Section - Form */}
      <aside 
        className={`overflow-y-auto ${isLargeScreen ? '' : 'lg:w-1/2 w-full'}`}
        style={isLargeScreen ? { 
          width: `${leftWidth}%`,
          minWidth: '20%',
        } : undefined}
      >
        <ResumeDataFetcher>{children}</ResumeDataFetcher>
      </aside>

      {/* Draggable Divider - Enhanced UI */}
      {isLargeScreen && (
        <div
          className={`relative flex-shrink-0 z-10 group transition-all duration-200 ${
            isDragging ? 'cursor-col-resize' : 'cursor-col-resize'
          }`}
          style={{ width: '8px' }}
          onMouseDown={handleMouseDown}
        >
          {/* Background glow - always visible but subtle */}
          <div className={`absolute inset-0 transition-all duration-300 ${
            isDragging 
              ? 'bg-indigo-500/30' 
              : 'bg-indigo-400/10 group-hover:bg-indigo-400/20'
          }`} />
          
          {/* Main divider line */}
          <div className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] transition-all duration-300 ${
            isDragging 
              ? 'bg-indigo-600 shadow-lg shadow-indigo-400/50' 
              : 'bg-gray-400 group-hover:bg-indigo-500 group-hover:shadow-lg group-hover:shadow-indigo-400/30'
          }`} />
          
          {/* Drag handle - centered with pulsing animation */}
          <motion.div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              flex flex-col items-center justify-center gap-0.5 
              bg-white shadow-lg rounded-lg p-1.5 
              transition-all duration-300 pointer-events-none
              ${isDragging ? 'scale-110 ring-2 ring-indigo-500' : 'group-hover:scale-110'}`}
            animate={{
              scale: isDragging ? 1.1 : 1,
              boxShadow: isDragging ? '0 0 20px rgba(99, 102, 241, 0.4)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          >
            <FiMove className={`w-3 h-3 transition-colors duration-300 ${
              isDragging ? 'text-indigo-600' : 'text-gray-500 group-hover:text-indigo-600'
            }`} />
            <div className="flex gap-0.5">
              {[1, 2, 3].map((dot) => (
                <motion.div
                  key={dot}
                  className={`w-0.5 h-0.5 rounded-full transition-colors duration-300 ${
                    isDragging ? 'bg-indigo-600' : 'bg-gray-400 group-hover:bg-indigo-500'
                  }`}
                  animate={isDragging ? {
                    scaleY: [1, 1.5, 1],
                  } : {}}
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
              opacity: isHovered || isDragging ? 1 : 0,
              y: isHovered || isDragging ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
            className={`absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-16 
              bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap
              shadow-lg pointer-events-none ${(isHovered || isDragging) ? 'opacity-100' : 'opacity-0'}`}
          >
            {isDragging ? 'Release to resize' : 'Drag to resize'}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900" />
          </motion.div>

          {/* Drag indicators - animated dots on the divider */}
          <div className="absolute inset-y-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
            {[1, 2, 3, 4, 5].map((dot) => (
              <motion.div
                key={dot}
                className={`w-0.5 rounded-full transition-all duration-300 ${
                  isDragging ? 'bg-indigo-400/60' : 'bg-gray-400/40 group-hover:bg-indigo-400/40'
                }`}
                style={{ height: '6px' }}
                animate={isDragging ? {
                  scaleY: [1, 0.5, 1],
                  opacity: [0.5, 1, 0.5],
                } : {}}
                transition={{
                  repeat: isDragging ? Infinity : 0,
                  duration: 0.8,
                  delay: dot * 0.08,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Right Section - Resume Preview */}
      <section 
        className={`bg-[#e8e6f2] overflow-hidden ${isLargeScreen ? '' : 'max-lg:hidden lg:w-1/2'}`}
        style={isLargeScreen ? { 
          width: `${100 - leftWidth}%`,
          minWidth: '20%',
        } : undefined}
      >
        {/* <div
          className="absolute top-4 right-4 z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.button
            onClick={() => router.push("/change-template")}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 px-4 py-2.5 bg-white backdrop-blur-md border border-gray-200/50 hover:border-indigo-400 text-gray-700 hover:text-indigo-600 font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer ${isHovered ? "shadow-lg bg-white" : ""}`}
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: isHovered ? 180 : 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                className="p-0.5"
              >
                <FiLayout className="w-4 h-4" />
              </motion.div>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-indigo-400 rounded-full blur-md -z-10"
                />
              )}
            </div>
            <span className="text-sm font-medium">Change Template</span>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
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
                  {/* <button
                    onClick={() => {
                      setShowMobilePreview(false);
                      router.push("/change-template");
                    }}
                    className="flex items-center gap-1 px-2 py-1 bg-indigo-50 rounded-lg text-indigo-600 text-xs font-medium"
                  >
                    <FiLayout className="w-3 h-3" />
                    Change Template
                  </button> */}
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