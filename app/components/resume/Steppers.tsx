// "use client";

// import { useRouter, usePathname } from "next/navigation";
// import { IoHomeOutline, IoCheckmarkCircle } from "react-icons/io5";
// import { motion } from "framer-motion";

// export const Stepper = () => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const steps = [
//     { id: 0, name: "Contact", path: "/resume-details/contact" },
//     { id: 1, name: "Experience", path: "/resume-details/experience" },
//     { id: 2, name: "Education", path: "/resume-details/education" },
//     { id: 3, name: "Skills", path: "/resume-details/skills" },
//     { id: 4, name: "Projects", path: "/resume-details/project" },
//     { id: 5, name: "Summary", path: "/resume-details/summary" },
//     { id: 6, name: "Finalize", path: "/resume-details/finalize" },
//   ];

//   const handleHomeClick = () => {
//     router.push("/choose-template");
//   };

//   const currentStep = steps.findIndex((step) => step.path === pathname);

//   // Single component with CSS media queries
//   return (
//     <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
//       <div className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
//         {/* Mobile View (hidden on desktop) */}
//         <div className="block sm:hidden">
//           <div
//             className="flex items-center gap-2 overflow-x-auto overflow-y-hidden px-3 py-2"
//             style={{
//               msOverflowStyle: "none",
//               scrollbarWidth: "none",
//               WebkitOverflowScrolling: "touch",
//             }}
//           >
//             <button
//               onClick={handleHomeClick}
//               className="p-1.5 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-indigo-50 hover:to-indigo-100 transition-all duration-300 group shrink-0 shadow-sm"
//             >
//               <IoHomeOutline className="w-3.5 h-3.5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
//             </button>

//             <div className="flex items-center gap-2 shrink-0 grow">
//               {steps.map((step, index) => {
//                 const isActive = currentStep === index;
//                 const isCompleted = currentStep > index;

//                 return (
//                   <div
//                     key={step.id}
//                     className="flex flex-col items-center shrink-0 grow"
//                   >
//                     <div
//                       className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
//                         isActive
//                           ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white ring-1 ring-indigo-300 ring-offset-1"
//                           : isCompleted
//                             ? "bg-emerald-500 text-white"
//                             : "bg-gray-100 text-gray-400"
//                       }`}
//                     >
//                       {isCompleted ? (
//                         <IoCheckmarkCircle className="w-3 h-3" />
//                       ) : (
//                         <span className="text-[10px] font-semibold">
//                           {index + 1}
//                         </span>
//                       )}
//                     </div>
//                     <span
//                       className={`text-[8px] font-medium text-center whitespace-nowrap transition-colors duration-200 mt-0.5 ${
//                         isActive
//                           ? "text-indigo-600 font-semibold"
//                           : isCompleted
//                             ? "text-gray-600"
//                             : "text-gray-400"
//                       }`}
//                     >
//                       {step.name}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Desktop/Tablet View (hidden on mobile) */}
//         <div className="hidden sm:block">
//           <div
//             style={{
//               msOverflowStyle: "none",
//               scrollbarWidth: "none",
//               WebkitOverflowScrolling: "touch",
//             }}
//             className="px-4 py-3 overflow-x-auto overflow-y-hidden"
//           >
//             <div className="flex items-center gap-2 min-w-max">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleHomeClick}
//                 className="p-1.5 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-indigo-50 hover:to-indigo-100 transition-all duration-300 group shrink-0 cursor-pointer shadow-sm"
//               >
//                 <IoHomeOutline className="w-4 h-4 text-gray-600 group-hover:text-indigo-600 transition-colors" />
//               </motion.button>

//               <div className="flex items-center gap-1">
//                 {steps.map((step, index) => {
//                   const isActive = currentStep === index;
//                   const isCompleted = currentStep > index;
//                   const isLast = index === steps.length - 1;

//                   return (
//                     <div key={step.id} className="flex items-center">
//                       <div className="flex items-center gap-2">
//                         <div className="relative">
//                           <div
//                             className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
//                               isActive
//                                 ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white ring-2 ring-indigo-200 shadow-sm"
//                                 : isCompleted
//                                   ? "bg-emerald-500 text-white shadow-sm"
//                                   : "bg-gray-100 text-gray-400"
//                             }`}
//                           >
//                             {isCompleted ? (
//                               <IoCheckmarkCircle className="w-3.5 h-3.5" />
//                             ) : (
//                               <span className="text-xs font-bold">
//                                 {index + 1}
//                               </span>
//                             )}
//                           </div>
//                         </div>

//                         <div className="flex flex-col items-start">
//                           <span
//                             className={`text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
//                               isActive
//                                 ? "text-indigo-600 font-semibold"
//                                 : isCompleted
//                                   ? "text-gray-700"
//                                   : "text-gray-400"
//                             }`}
//                           >
//                             {step.name}
//                           </span>
//                         </div>
//                       </div>

//                       {!isLast && (
//                         <div className="w-8 mx-1">
//                           <div
//                             className={`h-0.5 rounded-full transition-all duration-300 ${
//                               currentStep > index
//                                 ? "bg-emerald-400"
//                                 : currentStep === index
//                                   ? "bg-gradient-to-r from-indigo-400 to-gray-200"
//                                   : "bg-gray-200"
//                             }`}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };




"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoHomeOutline, IoCheckmarkCircle } from "react-icons/io5";
import { motion } from "framer-motion";

interface StepperProps {
  // Optional: called before navigating away from the current step.
  // Pass the current page's own save function (e.g. () => saveToAPI(contact)).
  // If it throws or returns false, navigation is skipped.
  onBeforeNavigate?: () => Promise<boolean | void> | boolean | void;
}

export const Stepper = ({ onBeforeNavigate }: StepperProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [pendingStepId, setPendingStepId] = useState<number | null>(null);

  const steps = [
    { id: 0, name: "Contact", path: "/resume-details/contact" },
    { id: 1, name: "Experience", path: "/resume-details/experience" },
    { id: 2, name: "Education", path: "/resume-details/education" },
    { id: 3, name: "Skills", path: "/resume-details/skills" },
    { id: 4, name: "Projects", path: "/resume-details/project" },
    { id: 5, name: "Summary", path: "/resume-details/summary" },
    { id: 6, name: "Finalize", path: "/resume-details/finalize" },
  ];

  const handleHomeClick = () => {
    router.push("/choose-template");
  };

  const currentStep = steps.findIndex((step) => step.path === pathname);

  const handleStepClick = async (step: (typeof steps)[number]) => {
    // Already on this step, or another navigation is in flight — no-op
    if (step.path === pathname || isNavigating) return;

    setIsNavigating(true);
    setPendingStepId(step.id);

    try {
      if (onBeforeNavigate) {
        const result = await onBeforeNavigate();
        // If the save explicitly returns false, treat it as a failed save
        // and don't navigate away from unsaved data.
        if (result === false) {
          setIsNavigating(false);
          setPendingStepId(null);
          return;
        }
      }
      router.push(step.path);
    } catch (err) {
      console.error("Error saving before step navigation:", err);
      // Stay on the current page so the user doesn't lose data silently
    } finally {
      setIsNavigating(false);
      setPendingStepId(null);
    }
  };

  // Single component with CSS media queries
  return (
    <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        {/* Mobile View (hidden on desktop) */}
        <div className="block sm:hidden">
          <div
            className="flex items-center gap-2 overflow-x-auto overflow-y-hidden px-3 py-2"
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <button
              onClick={handleHomeClick}
              className="p-1.5 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-indigo-50 hover:to-indigo-100 transition-all duration-300 group shrink-0 shadow-sm"
            >
              <IoHomeOutline className="w-3.5 h-3.5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
            </button>

            <div className="flex items-center gap-2 shrink-0 grow">
              {steps.map((step, index) => {
                const isActive = currentStep === index;
                const isCompleted = currentStep > index;
                const isPending = pendingStepId === step.id;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleStepClick(step)}
                    disabled={isNavigating}
                    className={`flex flex-col items-center shrink-0 grow ${
                      isNavigating ? "cursor-wait" : "cursor-pointer"
                    }`}
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
                      {isPending ? (
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : isCompleted ? (
                        <IoCheckmarkCircle className="w-3 h-3" />
                      ) : (
                        <span className="text-[10px] font-semibold">
                          {index + 1}
                        </span>
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
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop/Tablet View (hidden on mobile) */}
        <div className="hidden sm:block">
          <div
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
            className="px-4 py-3 overflow-x-auto overflow-y-hidden"
          >
            <div className="flex items-center gap-2 min-w-max">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleHomeClick}
                className="p-1.5 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-indigo-50 hover:to-indigo-100 transition-all duration-300 group shrink-0 cursor-pointer shadow-sm"
              >
                <IoHomeOutline className="w-4 h-4 text-gray-600 group-hover:text-indigo-600 transition-colors" />
              </motion.button>

              <div className="flex items-center gap-1">
                {steps.map((step, index) => {
                  const isActive = currentStep === index;
                  const isCompleted = currentStep > index;
                  const isLast = index === steps.length - 1;
                  const isPending = pendingStepId === step.id;

                  return (
                    <div key={step.id} className="flex items-center">
                      <motion.button
                        type="button"
                        whileHover={{ scale: isNavigating ? 1 : 1.03 }}
                        whileTap={{ scale: isNavigating ? 1 : 0.97 }}
                        onClick={() => handleStepClick(step)}
                        disabled={isNavigating}
                        className={`flex items-center gap-2 rounded-lg px-1.5 py-1 -mx-1.5 -my-1 transition-colors duration-200 ${
                          isNavigating
                            ? "cursor-wait"
                            : "cursor-pointer hover:bg-gray-50"
                        }`}
                      >
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
                            {isPending ? (
                              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : isCompleted ? (
                              <IoCheckmarkCircle className="w-3.5 h-3.5" />
                            ) : (
                              <span className="text-xs font-bold">
                                {index + 1}
                              </span>
                            )}
                          </div>
                        </div>

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
                        </div>
                      </motion.button>

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
        </div>
      </div>
    </div>
  );
};