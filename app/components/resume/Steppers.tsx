// "use client";

// import { useRouter, usePathname } from "next/navigation";
// import { useState, useEffect } from "react";
// import { IoHomeOutline } from "react-icons/io5";

// const Stepper = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isMobile, setIsMobile] = useState(false);

//   const steps = [
//     { id: 0, name: "Contact", path: "/resume-details/contact" },
//     { id: 1, name: "Experience", path: "/resume-details/experience" },
//     { id: 2, name: "Education", path: "/resume-details/education" },
//     { id: 3, name: "Skills", path: "/resume-details/skills" },
//     { id: 5, name: "Projects", path: "/resume-details/project" },
//     { id: 6, name: "Summary", path: "/resume-details/summary" },
//     { id: 7, name: "Finalize", path: "/resume-details/finalize" },
//   ];

//   // Check if mobile on mount and on resize
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);

//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const handleStepClick = (stepId: number) => {
//     const step = steps.find((s) => s.id === stepId);
//     if (step) {
//       router.push(step.path);
//     }
//   };

//   const currentStep = steps.findIndex((step) => step.path === pathname);

//   const handleHomeClick = () => {
//     router.push("/choose-template"); // Change to your home/dashboard path
//   };

//   // Mobile view - Compact with icons
//   if (isMobile) {
//     return (
//       <div className="w-full bg-white border-b border-gray-100 ">
//         <div className="flex items-center gap-2 overflow-x-auto no-scollbar w-full">
//           {/* Home Icon Button */}
//           <button
//             onClick={handleHomeClick}
//             className="px-2 py-1 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-primary-50 hover:to-primary-100 transition-all duration-300 group shrink-0"
//           >
//             <IoHomeOutline className="w-4 h-4 text-gray-600  transition-colors" />
//           </button>

//           {/* Mobile progress dots */}
//           <div className="flex justify-between items-center gap-2 w-full">
//             {steps.map((step, index) => {
//               const isActive = currentStep === index;
//               const isCompleted = currentStep > index;

//               return (
//                 <button
//                   key={step.id}
//                   // onClick={() => handleStepClick(step.id)}
//                   className="flex flex-col items-center"
//                 >
//                   <div
//                     className={`w-5 h-5 sm:w-8 sm:h-8 rounded-full  flex items-center justify-center mb-1 ${
//                       isActive
//                         ? "bg-[#c40116] text-white"
//                         : isCompleted
//                           ? "bg-emerald-500 text-white"
//                           : "bg-gray-200 text-gray-400"
//                     }`}
//                   >
//                     {isCompleted ? (
//                       <svg
//                         className="w-4 h-4"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     ) : (
//                       <span className="text-xs sm:font-semibold">
//                         {index + 1}
//                       </span>
//                     )}
//                   </div>

//                   {/* Show name only for active and neighboring steps on mobile */}
//                   <span
//                     className={`text-[10px] font-medium text-center max-w-15 truncate ${
//                       isActive
//                         ? "text-[#c40116] font-semibold"
//                         : isCompleted
//                           ? "text-gray-600"
//                           : "text-gray-400"
//                     }`}
//                   >
//                     {step.name}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Desktop/Tablet view
//   return (
//     <div className="w-full bg-white border-b border-gray-100   overflow-x-auto">
//       <div className="w-full mx-auto px-2 py-1  overflow-x-auto no-scollbar">
//         <div className="flex items-center gap-3 justify-between">
//           {/* Home Icon Button */}
//           <button
//             onClick={handleHomeClick}
//             className="px-3 py-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-primary-50 hover:to-primary-100 transition-all duration-300 group shrink-0"
//           >
//             <IoHomeOutline className="w-5 h-5 text-gray-600  transition-colors" />
//           </button>
//           {/* Steps with names always visible */}
//           <div className="flex items-center w-full gap-3">
//             {steps.map((step, index) => {
//               const isActive = currentStep === index;
//               const isCompleted = currentStep > index;

//               return (
//                 <div key={step.id} className="flex items-center flex-1">
//                   <button
//                     // onClick={() => handleStepClick(step.id)}
//                     // className={`flex items-center cursor-pointer gap-2 transition-all duration-200 w-full ${
//                     //   isActive
//                     //     ? "text-[#c40116]"
//                     //     : isCompleted
//                     //       ? "text-gray-800 hover:text-[#c40116]"
//                     //       : "text-gray-400 hover:text-gray-600"
//                     // }`}

//                     className={`flex items-center  gap-2 transition-all duration-200 w-full ${
//                       isActive
//                         ? "text-[#c40116]"
//                         : isCompleted
//                           ? "text-gray-800 "
//                           : "text-gray-400 "
//                     }`}
//                   >
//                     {/* Circle Indicator with number */}
//                     <div
//                       className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
//                         isActive
//                           ? "bg-[#c40116] text-white ring-2 ring-[#c40116] ring-offset-2"
//                           : isCompleted
//                             ? "bg-emerald-100 text-emerald-600"
//                             : "bg-gray-100 text-gray-400"
//                       }`}
//                     >
//                       {isCompleted ? (
//                         <svg
//                           className="w-4 h-4"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       ) : (
//                         <span className="text-sm font-semibold">
//                           {index + 1}
//                         </span>
//                       )}
//                     </div>

//                     {/* Step Name - Always visible on desktop */}
//                     <div className="flex flex-col items-start">
//                       <span
//                         className={`text-sm font-medium ${
//                           isActive ? "font-medium" : "font-normal"
//                         }`}
//                       >
//                         {step.name}
//                       </span>
//                     </div>
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Stepper;



"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { IoHomeOutline, IoCheckmarkCircle } from "react-icons/io5";
import { motion } from "framer-motion";

const Stepper = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  const steps = [
    { id: 0, name: "Contact", path: "/resume-details/contact" },
    { id: 1, name: "Experience", path: "/resume-details/experience" },
    { id: 2, name: "Education", path: "/resume-details/education" },
    { id: 3, name: "Skills", path: "/resume-details/skills" },
    { id: 4, name: "Projects", path: "/resume-details/project" },
    { id: 5, name: "Summary", path: "/resume-details/summary" },
    { id: 6, name: "Finalize", path: "/resume-details/finalize" },
  ];

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleHomeClick = () => {
    router.push("/choose-template");
  };

  const currentStep = steps.findIndex((step) => step.path === pathname);

  // Mobile view - Smaller, no scrollbar visible
  if (isMobile) {
    return (
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center gap-2 overflow-x-auto overflow-y-hidden px-3 py-2 hide-scrollbar">
          {/* Home Icon Button - Smaller */}
          <button
            onClick={handleHomeClick}
            className="p-1.5 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-indigo-50 hover:to-indigo-100 transition-all duration-300 group shrink-0 shadow-sm"
          >
            <IoHomeOutline className="w-3.5 h-3.5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
          </button>

          {/* Mobile progress steps - Horizontal scroll, no scrollbar */}
          <div className="flex items-center gap-2 shrink-0">
            {steps.map((step, index) => {
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center shrink-0"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white ring-1 ring-indigo-300 ring-offset-1"
                        : isCompleted
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <IoCheckmarkCircle className="w-3 h-3" />
                    ) : (
                      <span className="text-[10px] font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`text-[8px] font-medium text-center whitespace-nowrap transition-colors duration-200 mt-0.5 ${
                      isActive
                        ? "text-indigo-600 font-semibold"
                        : isCompleted
                          ? "text-gray-600"
                          : "text-gray-400"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Desktop/Tablet view - Smaller, no visible scrollbar
  return (
    <div className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 py-2">
      <div className="px-4 py-2 overflow-x-auto overflow-y-hidden hide-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {/* Home Icon Button - Smaller */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHomeClick}
            className="p-1.5 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-indigo-50 hover:to-indigo-100 transition-all duration-300 group shrink-0 shadow-sm"
          >
            <IoHomeOutline className="w-4 h-4 text-gray-600 group-hover:text-indigo-600 transition-colors" />
          </motion.button>

          {/* Steps with connecting lines - Smaller */}
          <div className="flex items-center gap-1">
            {steps.map((step, index) => {
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white ring-2 ring-indigo-200 shadow-sm"
                            : isCompleted
                              ? "bg-emerald-500 text-white shadow-sm"
                              : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isCompleted ? (
                          <IoCheckmarkCircle className="w-3.5 h-3.5" />
                        ) : (
                          <span className="text-xs font-bold">{index + 1}</span>
                        )}
                      </div>
                      
                      {/* Active pulse animation - Smaller */}
                      {/* {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-indigo-400"
                          initial={{ scale: 1, opacity: 0.5 }}
                          animate={{ scale: 1.3, opacity: 0 }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                      )} */}
                    </div>

                    {/* Step Name - Smaller */}
                    <div className="flex flex-col items-start">
                      <span
                        className={`text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
                          isActive
                            ? "text-indigo-600 font-semibold"
                            : isCompleted
                              ? "text-gray-700"
                              : "text-gray-400"
                        }`}
                      >
                        {step.name}
                      </span>
                      {/* {isActive && (
                        <motion.div
                          layoutId="active-step"
                          className="h-0.5 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full mt-0.5"
                          style={{ width: "20px" }}
                        />
                      )} */}
                    </div>
                  </div>

                  {/* Connecting Line - Smaller */}
                  {!isLast && (
                    <div className="w-8 mx-1">
                      <div
                        className={`h-0.5 rounded-full transition-all duration-300 ${
                          currentStep > index
                            ? "bg-emerald-400"
                            : currentStep === index
                              ? "bg-gradient-to-r from-indigo-400 to-gray-200"
                              : "bg-gray-200"
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Stepper;