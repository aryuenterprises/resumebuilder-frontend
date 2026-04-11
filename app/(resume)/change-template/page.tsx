"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid,
  FiArrowLeft,
  FiChevronRight,
  FiDownload,
  FiEye,
  FiMenu,
  FiX,
  FiLock,
} from "react-icons/fi";
import { IoSparkles, IoCheckmarkCircle, IoStar } from "react-icons/io5";
import { Crown } from "lucide-react";
import { templateData } from "@/app/data";
import { Template } from "@/app/types";
import { CreateContext } from "@/app/context/CreateContext";
import Header from "@/app/components/layouts/Header";
import { getLocalStorage, setLocalStorage } from "@/app/utils";
import axios from "axios";
import { User } from "@/app/types/user.types";
import { API_URL } from "@/app/config/api";
import ProtectedRoute from "@/app/utils/ProtectedRoute";

interface usersCurrentPlan {
  amount: number;
  plan: string;
}

// Define plan limits with required plan for each template index
const PLAN_CONFIG = {
  free: {
    maxTemplates: 1,
    label: "Free",
    color: "from-gray-500 to-gray-600",
    badgeColor: "bg-gray-100 text-gray-700",
    borderColor: "border-gray-200",
  },
  pro: {
    maxTemplates: 3,
    label: "Pro",
    color: "from-blue-500 to-blue-600",
    badgeColor: "bg-blue-100 text-blue-700",
    borderColor: "border-blue-200",
  },
  proplus: {
    maxTemplates: 5,
    label: "Pro Plus",
    color: "from-purple-500 to-purple-600",
    badgeColor: "bg-purple-100 text-purple-700",
    borderColor: "border-purple-200",
  },
  premium: {
    maxTemplates: Infinity,
    label: "Premium",
    color: "from-amber-500 to-amber-600",
    badgeColor: "bg-amber-100 text-amber-700",
    borderColor: "border-amber-200",
  },
};

// Helper function to get required plan for a template index
const getRequiredPlanForTemplate = (
  index: number,
): keyof typeof PLAN_CONFIG => {
  if (index < PLAN_CONFIG.free.maxTemplates) return "free";
  if (index < PLAN_CONFIG.pro.maxTemplates) return "pro";
  if (index < PLAN_CONFIG.proplus.maxTemplates) return "proplus";
  return "premium";
};

export default function ChangeTemplate() {
  const router = useRouter();
  const context = useContext(CreateContext);

  const { chosenTemplate, setChosenTemplate } = context || {
    chosenTemplate: null,
    setChosenTemplate: () => {},
  };

  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(
    chosenTemplate || templateData[0] || null,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [usersCurrentPlan, setUsersCurrentPlan] =
    useState<usersCurrentPlan | null>(null);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [selectedLockedTemplate, setSelectedLockedTemplate] = useState<{
    template: Template;
    requiredPlan: string;
  } | null>(null);

  // Get current plan name (normalized)
  const getCurrentPlan = (): keyof typeof PLAN_CONFIG => {
    const plan = usersCurrentPlan?.plan?.toLowerCase() || "";
    if (plan.includes("pro plus")) return "proplus";
    if (plan.includes("pro")) return "pro";
    if (plan.includes("premium")) return "premium";
    return "free";
  };

  // Check if template is accessible based on plan
  const isTemplateAccessible = (templateIndex: number): boolean => {
    const currentPlan = getCurrentPlan();
    const maxTemplates = PLAN_CONFIG[currentPlan].maxTemplates;
    return templateIndex < maxTemplates;
  };

  // Get available templates count based on plan
  const getAvailableTemplatesCount = (): number => {
    const currentPlan = getCurrentPlan();
    const maxTemplates = PLAN_CONFIG[currentPlan].maxTemplates;
    return Math.min(maxTemplates, templateData.length);
  };

  // Get template index by ID
  const getTemplateIndex = (templateId: number): number => {
    return templateData.findIndex((t) => t.id === templateId);
  };

  // Handle template selection with lock check
  const handleSelectTemplate = (template: Template, index: number) => {
    if (isTemplateAccessible(index)) {
      setPreviewTemplate(template);
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    } else {
      const requiredPlan = getRequiredPlanForTemplate(index);
      setSelectedLockedTemplate({
        template,
        requiredPlan: PLAN_CONFIG[requiredPlan].label,
      });
      setShowUpgradePopup(true);
    }
  };

  const handleUseTemplate = () => {
    if (!previewTemplate) return;

    const templateIndex = getTemplateIndex(previewTemplate?.id!);

    if (isTemplateAccessible(templateIndex)) {
      setChosenTemplate(previewTemplate);
      setLocalStorage("chosenTemplate", previewTemplate);
      router.push("/resume-details/contact");
    } else {
      const requiredPlan = getRequiredPlanForTemplate(templateIndex);
      setSelectedLockedTemplate({
        template: previewTemplate,
        requiredPlan: PLAN_CONFIG[requiredPlan].label,
      });
      setShowUpgradePopup(true);
    }
  };

  useEffect(() => {
    const userDetails = getLocalStorage<User>("user_details");

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/dashboard`, {
          params: {
            userId: userDetails?.id,
          },
        });

        setUsersCurrentPlan(response?.data?.payments?.[0]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, []);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set default template on mount
  useEffect(() => {
    if (!previewTemplate && templateData.length > 0) {
      setPreviewTemplate(templateData[0]);
    }
  }, [previewTemplate]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile && isSidebarOpen) {
        const sidebar = document.getElementById("template-sidebar");
        const toggle = document.getElementById("sidebar-toggle");
        if (
          sidebar &&
          !sidebar.contains(e.target as Node) &&
          toggle &&
          !toggle.contains(e.target as Node)
        ) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  const currentPlan = getCurrentPlan();
  const availableTemplates = getAvailableTemplatesCount();
  const totalTemplates = templateData.length;
  const isUpgradeNeeded = availableTemplates < totalTemplates;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
      <ProtectedRoute>

      <Header />

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed bottom-0 z-30 px-4 py-3 bg-white/80 backdrop-blur-md border-b border-gray-200 w-full">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            id="sidebar-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-[#C40116] to-[#5E000B] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isSidebarOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiMenu className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">
              {isSidebarOpen ? "Close Templates" : "See Templates"}
            </span>
          </button>

          {/* Plan Badge for Mobile */}
          {usersCurrentPlan && (
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5">
              {currentPlan === "premium" ? (
                <Crown className="w-4 h-4 text-amber-500" />
              ) : (
                <IoStar className="w-4 h-4 text-blue-500" />
              )}
              <span className="text-xs font-medium capitalize">
                {currentPlan}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Upgrade Popup */}
      <AnimatePresence>
        {showUpgradePopup && selectedLockedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
            onClick={() => setShowUpgradePopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-linear-to-r from-[#5E000B] to-[#C40116] p-6 text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Upgrade Required</h2>
                <p className="text-white/80">
                  Unlock this premium template with our plans
                </p>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-600 mb-2">Template:</p>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedLockedTemplate.template.style}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-amber-100 rounded-full">
                      <Crown className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-semibold text-amber-700">
                        Requires {selectedLockedTemplate.requiredPlan} Plan
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Your Current Plan:
                    </p>
                    <p className="text-xl font-bold text-gray-900 capitalize">
                      {currentPlan} Plan
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {availableTemplates} of {totalTemplates} templates
                      available
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">
                      Upgrade to access:
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiLock className="w-4 h-4 text-[#C40116]" />
                        <span>
                          Unlock {totalTemplates - availableTemplates} more
                          templates
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <IoStar className="w-4 h-4 text-[#C40116]" />
                        <span>Premium designs & layouts</span>
                      </div>
                     
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowUpgradePopup(false)}
                    className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    Maybe Later
                  </button>
                  <button
                    onClick={() => {
                      setShowUpgradePopup(false);
                      router.push("/choose-plan");
                    }}
                    className="flex-1 py-3 bg-linear-to-r from-[#5E000B] to-[#C40116] text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
                  >
                    View Plans
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {/* Templates Grid */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 relative">
          {/* Template List - Sidebar */}
          <AnimatePresence>
            {(isSidebarOpen || !isMobile) && (
              <motion.div
                id="template-sidebar"
                variants={containerVariants}
                initial={isMobile ? { x: -320, opacity: 0 } : "hidden"}
                animate={isMobile ? { x: 0, opacity: 1 } : "visible"}
                exit={isMobile ? { x: -320, opacity: 0 } : undefined}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`
                  ${
                    isMobile
                      ? "fixed inset-y-0 left-0 z-40 w-[95%] bg-white shadow-2xl overflow-hidden"
                      : "lg:w-95 space-y-4 relative"
                  }
                `}
              >
                {isMobile && (
                  <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-linear-to-r from-[#C40116]/5 to-[#5E000B]/5">
                    <h2 className="font-semibold text-gray-900">Templates</h2>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <FiX className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                )}

                <div
                  className={
                    isMobile ? "p-4 overflow-y-auto h-[calc(100vh-70px)]" : ""
                  }
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-4 sm:p-5 lg:p-6 shadow-soft">
                    <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <FiGrid className="w-4 h-4 sm:w-5 sm:h-5 text-[#C40116]" />
                        <span className="truncate">Available Templates</span>
                      </h2>
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium whitespace-nowrap">
                        {availableTemplates}/{totalTemplates} unlocked
                      </span>
                    </div>

                    {/* Plan Info Bar */}
                    {isUpgradeNeeded && (
                      <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <p className="text-xs text-amber-800">
                          <strong>
                            {currentPlan.charAt(0).toUpperCase() +
                              currentPlan.slice(1)}
                          </strong>{" "}
                          plan • Upgrade to unlock{" "}
                          {totalTemplates - availableTemplates} more templates
                        </p>
                      </div>
                    )}

                    <div className="space-y-3 max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
                      {templateData.map((template, index) => {
                        const isSelected = previewTemplate?.id === template.id;
                        const isAccessible = isTemplateAccessible(index);
                        const requiredPlan = getRequiredPlanForTemplate(index);
                        const requiredPlanLabel =
                          PLAN_CONFIG[requiredPlan].label;
                        const isPremium = requiredPlan !== "free";

                        return (
                          <motion.div
                            key={template.id}
                            variants={itemVariants}
                            whileHover={isAccessible ? { x: 4 } : {}}
                            onClick={() =>
                              handleSelectTemplate(template, index)
                            }
                            className={`
                              relative group cursor-pointer rounded-xl transition-all duration-300
                              ${!isAccessible ? "opacity-75" : ""}
                              ${
                                isSelected && isAccessible
                                  ? "bg-linear-to-r from-[#C40116]/10 to-[#5E000B]/10 border-2 border-[#C40116] shadow-lg"
                                  : isAccessible
                                    ? "bg-white border border-gray-200 hover:border-[#C40116]/50 hover:shadow-md"
                                    : "bg-gray-50 border border-gray-200 cursor-not-allowed"
                              }
                            `}
                          >
                            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4">
                              {/* Template Preview Thumbnail */}
                              <div className="relative w-14 h-16 sm:w-16 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 shadow-sm">
                                <Image
                                  src={template.image}
                                  alt={template.style!}
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                                />
                                {!isAccessible && (
                                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <FiLock className="w-5 h-5 text-white" />
                                  </div>
                                )}
                              </div>

                              {/* Template Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">
                                    {template.style}
                                  </h3>
                                  {isPremium ? (
                                    <span
                                      className={`px-1.5 py-0.5 sm:px-2 sm:py-1 ${PLAN_CONFIG[requiredPlan].badgeColor} rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap flex items-center gap-1`}
                                    >
                                      {requiredPlan === "premium" ? (
                                        <Crown className="w-3 h-3" />
                                      ) : (
                                        <IoStar className="w-3 h-3" />
                                      )}
                                      {requiredPlanLabel}
                                    </span>
                                  ) : (
                                    <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap">
                                      Free
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2 mb-2">
                                  {template.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-2">
                                  {isSelected && isAccessible && (
                                    <span className="inline-flex items-center gap-1 text-[#C40116] text-[10px] sm:text-xs font-medium">
                                      <FiChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                      Selected
                                    </span>
                                  )}

                                  {!isAccessible && (
                                    <span className="inline-flex items-center gap-1 text-amber-600 text-[10px] sm:text-xs font-medium">
                                      <FiLock className="w-3 h-3" />
                                      Unlock with {requiredPlanLabel}
                                    </span>
                                  )}

                                  {template.pic === "true" && (
                                    <span className="inline-flex items-center gap-1 text-amber-600 text-[10px] sm:text-xs font-medium">
                                      <span className="w-1 h-1 bg-amber-600 rounded-full"></span>
                                      Photo Ready
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Tips Card */}
                  <div className="max-md:hidden mt-4 bg-linear-to-br from-[#C40116]/5 to-[#5E000B]/5 rounded-2xl border border-[#C40116]/20 p-4 sm:p-5 lg:p-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="p-1.5 sm:p-2 bg-linear-to-r from-[#C40116] to-[#5E000B] rounded-lg">
                        <IoSparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                        Quick Tips
                      </h3>
                    </div>
                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-[#C40116] font-bold">•</span>
                        <span className="flex-1">
                          All templates are ATS-friendly
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#C40116] font-bold">•</span>
                        <span className="flex-1">
                          Templates with photo support are marked "Photo Ready"
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#C40116] font-bold">•</span>
                        <span className="flex-1">
                          You can switch templates anytime
                        </span>
                      </li>
                      {isUpgradeNeeded && (
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span className="flex-1 text-amber-700">
                            Upgrade to unlock premium templates
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`
              flex-1 transition-all duration-300
              ${isMobile && isSidebarOpen ? "opacity-50 pointer-events-none" : "opacity-100"}
            `}
          >
            <div className="sticky top-20 lg:top-6">
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/50 shadow-soft overflow-hidden">
                {/* Preview Header */}
                <div className="p-4 sm:p-5 lg:p-6 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#C40116]/10 to-[#5E000B]/10 rounded-lg">
                        <FiEye className="w-4 h-4 sm:w-5 sm:h-5 text-[#C40116]" />
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                          Live Preview
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {previewTemplate?.style || "Select a template"}
                        </p>
                      </div>
                    </div>

                    {previewTemplate &&
                      (() => {
                        const templateIndex = getTemplateIndex(
                          previewTemplate.id,
                        );
                        const requiredPlan =
                          getRequiredPlanForTemplate(templateIndex);
                        const isAccessible =
                          isTemplateAccessible(templateIndex);

                        return (
                          <div
                            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium w-fit flex items-center gap-1 ${
                              isAccessible
                                ? requiredPlan === "free"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-blue-100 text-blue-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {!isAccessible && <FiLock className="w-3 h-3" />}
                            {isAccessible && requiredPlan !== "free" && (
                              <IoStar className="w-3 h-3" />
                            )}
                            <span>
                              {!isAccessible
                                ? `Requires ${PLAN_CONFIG[requiredPlan].label}`
                                : requiredPlan === "free"
                                  ? "Free Template"
                                  : `${PLAN_CONFIG[requiredPlan].label} Template`}
                            </span>
                          </div>
                        );
                      })()}
                  </div>
                </div>

                {/* Action Buttons */}
                {previewTemplate &&
                  (() => {
                    const templateIndex = getTemplateIndex(previewTemplate.id);
                    const isAccessible = isTemplateAccessible(templateIndex);

                    return (
                      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 p-4 sm:p-5 lg:p-6 bg-gray-50/50 border-b border-gray-100">
                        <motion.button
                          whileHover={isAccessible ? { scale: 1.02 } : {}}
                          whileTap={isAccessible ? { scale: 0.98 } : {}}
                          onClick={handleUseTemplate}
                          className={`w-full sm:w-fit px-4 py-3 sm:px-5 sm:py-3.5 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-800 flex items-center justify-center gap-2 text-sm sm:text-base ${
                            isAccessible
                              ? "bg-linear-to-r from-[#C40116] to-[#5E000B] text-white cursor-pointer transition-all duration-700"
                              : "bg-gray-600 text-white cursor-not-allowed opacity-75"
                          }`}
                          disabled={!isAccessible}
                        >
                          {isAccessible ? (
                            <>
                              <span>Use This Template</span>
                              <FiChevronRight className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              <FiLock className="w-4 h-4" />
                              <span>Upgrade to Use</span>
                            </>
                          )}
                        </motion.button>

                        <button
                          onClick={() => router.back()}
                          className="w-full sm:w-fit px-4 py-3 sm:px-5 sm:py-3.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                        >
                          <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>Go Back</span>
                        </button>
                      </div>
                    );
                  })()}

                {/* Preview Content */}
                <div className="p-4 sm:p-5 lg:p-6">
                  {previewTemplate ? (
                    <motion.div
                      key={previewTemplate.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 sm:space-y-5 lg:space-y-6"
                    >
                      {/* Template Preview Image */}
                      <div className="relative aspect-[3/4] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto rounded-lg sm:rounded-xl overflow-hidden shadow-lg border border-gray-200/50 group">
                        <Image
                          src={previewTemplate.image}
                          alt={previewTemplate.style!}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
                          className="object-contain object-top transition-transform duration-700 group-hover:scale-101"
                          priority
                          quality={100}
                          unoptimized
                        />

                        {/* Badges */}
                        {(() => {
                          const templateIndex = getTemplateIndex(
                            previewTemplate.id,
                          );
                          const isAccessible =
                            isTemplateAccessible(templateIndex);

                          return (
                            <>
                              {!isAccessible && (
                                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 px-2 py-1 sm:px-2.5 sm:py-1.5 lg:px-3 lg:py-1.5 bg-amber-500 text-white rounded-full text-[10px] sm:text-xs font-medium shadow-lg flex items-center gap-0.5 sm:gap-1">
                                  <FiLock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                  <span>Locked</span>
                                </div>
                              )}

                              {previewTemplate.pic === "true" && (
                                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 lg:top-4 lg:left-4 px-2 py-1 sm:px-2.5 sm:py-1.5 lg:px-3 lg:py-1.5 bg-amber-500 text-white rounded-full text-[10px] sm:text-xs font-medium shadow-lg flex items-center gap-0.5 sm:gap-1">
                                  <span className="text-xs sm:text-sm">📸</span>
                                  <span className="hidden xs:inline">
                                    Photo Ready
                                  </span>
                                  <span className="xs:hidden">Photo</span>
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-12 sm:py-16">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                        <FiGrid className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">
                        No Template Selected
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 px-4">
                        Select a template from the left to preview it here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c40116;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #5e000b;
        }

        @media (min-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
        }
      `}</style>
      </ProtectedRoute>

    </div>
  );
}
