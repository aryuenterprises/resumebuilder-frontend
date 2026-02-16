"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Stepper = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  const steps = [
    { id: 0, name: "Contact", path: "/resume-details/contact" },
    { id: 1, name: "Experience", path: "/resume-details/experience" },
    { id: 2, name: "Education", path: "/resume-details/education" },
    { id: 3, name: "Skills", path: "/resume-details/skills" },
    { id: 4, name: "Summary", path: "/resume-details/summary" },
    { id: 5, name: "Finalize", path: "/resume-details/finalize" },
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

  const handleStepClick = (stepId: number) => {
    const step = steps.find((s) => s.id === stepId);
    if (step) {
      router.push(step.path);
    }
  };

  const currentStep = steps.findIndex((step) => step.path === pathname);

  // Mobile view - Compact with icons
  if (isMobile) {
    return (
      <div className="w-full bg-white border-b border-gray-100 ">
        <div className="">
          {/* Mobile header - Show current step */}
          {/* <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-700">
              {currentStep >= 0 ? steps[currentStep].name : "Resume Builder"}
            </h2>
            <span className="text-xs text-gray-500">
              {currentStep + 1}/{steps.length}
            </span>
          </div> */}

          {/* Mobile progress dots */}
          <div className="flex justify-between items-center">
            {steps.map((step, index) => {
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;

              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-5 h-5 sm:w-8 sm:h-8 rounded-full  flex items-center justify-center mb-1 ${
                      isActive
                        ? "bg-[#c40116] text-white"
                        : isCompleted
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <span className="text-xs sm:font-semibold">{index + 1}</span>
                    )}
                  </div>

                  {/* Show name only for active and neighboring steps on mobile */}
                  <span
                    className={`text-[10px] font-medium text-center max-w-15 truncate ${
                      isActive
                        ? "text-[#c40116] font-semibold"
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
    );
  }

  // Desktop/Tablet view
  return (
    <div className="w-full bg-white border-b border-gray-100   overflow-hidden">
      <div className="w-full mx-auto px-2 py-1  overflow-x-auto no-scollbar">
        <div className="flex items-center justify-between">
          {/* Steps with names always visible */}
          <div className="flex items-center w-full">
            {steps.map((step, index) => {
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <button
                    onClick={() => handleStepClick(step.id)}
                    className={`flex items-center cursor-pointer gap-2 transition-all duration-200 w-full ${
                      isActive
                        ? "text-[#c40116]"
                        : isCompleted
                          ? "text-gray-800 hover:text-[#c40116]"
                          : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {/* Circle Indicator with number */}
                    <div
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                        isActive
                          ? "bg-[#c40116] text-white ring-2 ring-[#c40116] ring-offset-2"
                          : isCompleted
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <span className="text-sm font-semibold">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    {/* Step Name - Always visible on desktop */}
                    <div className="flex flex-col items-start">
                      <span
                        className={`text-sm font-medium ${
                          isActive ? "font-medium" : "font-normal"
                        }`}
                      >
                        {step.name}
                      </span>
                    </div>
                  </button>

                  {/* Separator line (not after last step) */}
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        isCompleted ? "bg-emerald-200" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress Text - Desktop only */}
          <div className="hidden lg:block ml-8 shrink-0">
            <div className="bg-gray-50 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                Step{" "}
                <span className="text-[#c40116] font-semibold">
                  {currentStep + 1}
                </span>{" "}
                of {steps.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
