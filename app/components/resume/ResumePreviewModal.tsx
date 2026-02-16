"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, X, Sparkles, Eye, Shield, Zap, Award } from "lucide-react";

interface Template {
  id?: number;
  style?: string;
  image?: any;
  img?: any;
  category?: string;
  features?: string[];
  description?: string;
}

interface ResumePreviewModalProps {
  show: boolean;
  onClose: () => void;
  template: Template | null;
  onUse?: () => void;
}

const ResumePreviewModal = ({
  show,
  onClose,
  template,
  onUse,
}: ResumePreviewModalProps) => {
  if (!show || !template) return null;

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-999 flex items-center justify-center p-0 sm:p-2 md:p-4 lg:p-6">
          {/* Backdrop with glass effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/10 backdrop-blur"
          />

          {/* Modal Container - Full width on mobile, larger on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="relative bg-white w-full max-w-6xl h-screen sm:h-[95vh] md:h-[90vh] lg:h-[90vh] rounded-none sm:rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/20"
          >
            {/* Header with Premium Gradient */}
            <div className="relative shrink-0 bg-linear-to-r from-white via-white to-red-50/10 border-b border-gray-100/80 px-4 xs:px-5 sm:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 flex items-center justify-between backdrop-blur-sm z-10">
              <div className="flex items-center gap-2 xs:gap-3">
                <motion.div
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="p-2 xs:p-2.5 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl shadow-sm"
                >
                  <Sparkles className="w-4 h-4 xs:w-5 xs:h-5 text-[#c40116]" />
                </motion.div>
                <div>
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                  >
                    {template.style || "Template Preview"}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs text-gray-500 flex items-center gap-1"
                  >
                    <span className="px-1.5 py-0.5 bg-linear-to-r from-[#c40116]/10 to-[#be0117]/10 rounded-full text-[#c40116] font-medium">
                      {template.category || "Professional"}
                    </span>
                  </motion.p>
                </div>
              </div>

              <div className="flex items-center gap-1 xs:gap-2">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(0,0,0,0.05)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 xs:p-2.5 rounded-xl hover:bg-gray-100/80 transition-all duration-200 backdrop-blur-sm group cursor-pointer"
                  aria-label="Close preview"
                >
                  <X className="w-4 h-4 xs:w-5 xs:h-5 text-gray-400 group-hover:text-gray-600  group-hover:rotate-90  transition-all duration-700" />
                </motion.button>
              </div>
            </div>

            {/* Scrollable Body - Optimized for full-size resume display */}
            <div className="relative flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-gray-50/50">
              <div className="relative p-3 xs:p-4 sm:p-6 lg:p-8 h-full">
                <div className="max-w-6xl mx-auto h-full flex flex-col">
                  {/* Resume Container - Full Size Display */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="relative flex-1 min-h-100 md:min-h-screen w-full group"
                  >
                    {/* Animated glow rings when hover*/}
                    <div className="absolute -inset-1 sm:-inset-2 lg:-inset-3 bg-linear-to-r from-red-500/10 via-purple-500/10 to-red-50/10 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Resume Image Container */}

                    <div className="relative w-full h-full">
                      <Image
                        src={template.image || template.img}
                        alt={template.style || "Resume Template"}
                        fill
                        className="object-contain  transition-all duration-700 group-hover:scale-105"
                        priority={true}
                        quality={100}
                        unoptimized={true}
                        sizes="100vw"
                        style={{
                          objectPosition: "center top",
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Features Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="relative mt-6 lg:mt-8 shrink-0"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-[#c40116]/5 to-[#be0117]/5 rounded-2xl blur-xl" />
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 shadow-lg p-4 sm:p-5 lg:p-6">
                      {/* Section Header with Icon */}
                      <div className="flex items-center gap-2 mb-3 lg:mb-4">
                        <div className="p-1.5 lg:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
                          <Zap className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#c40116]" />
                        </div>
                        <h3 className="text-sm lg:text-base font-semibold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                          Template Features
                        </h3>
                        <div className="flex-1 h-px bg-linear-to-r from-[#c40116]/30 to-transparent ml-2" />
                      </div>

                      {/* Compact Features Grid */}
                      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2">
                        {(
                          template.features || [
                            "Modern & Professional Design",
                            "ATS-Friendly Layout",
                            "Fully Customizable Sections",
                            "Mobile Responsive Design",
                            "Clean & Organized Layout",
                            "Easy to Edit & Update",
                          ]
                        ).map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.03 }}
                            whileHover={{
                              scale: 1.02,
                              backgroundColor: "rgba(196,1,22,0.03)",
                              transition: { duration: 0.2 },
                            }}
                            className="flex items-start gap-1.5 lg:gap-2 p-1.5 lg:p-2 rounded-lg hover:shadow-sm transition-all duration-200 group/item"
                          >
                            <div className="p-1 lg:p-1.5 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg group-hover/item:scale-110 transition-transform duration-200 shrink-0">
                              <Check className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#c40116]" />
                            </div>
                            <span className="text-xs lg:text-sm text-gray-700 wrap-break-word flex-1">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Action Buttons - Sticky on mobile */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 lg:mt-8 shrink-0 pb-2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl font-semibold text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 hover:bg-white hover:shadow-lg transition-all duration-200 text-xs lg:text-sm flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5 lg:w-4 lg:h-4 group-hover:rotate-90 transition-transform duration-300" />
                      Close Preview
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        if (onUse) {
                          onUse();
                        } else if (template.id) {
                          console.log("Use template:", template.id);
                        }
                      }}
                      className="relative px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl font-semibold text-white overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    >
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-linear-to-r from-[#c40116] via-[#be0117] to-[#c40116]  group-hover:opacity-90 transition-opacity" />

                      {/* Shine effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      </div>

                      <span className="relative flex items-center justify-center gap-2 text-xs lg:text-sm">
                        <Sparkles className="w-3.5 h-3.5 lg:w-4 lg:h-4 group-hover:rotate-12 transition-transform duration-300" />
                        Use This Template
                        <Zap className="w-3.5 h-3.5 lg:w-4 lg:h-4 group-hover:scale-110 transition-transform duration-300" />
                      </span>
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Modern Footer */}
            <div className="relative shrink-0 border-t border-gray-100/80 bg-white/80 backdrop-blur-sm px-4 xs:px-5 sm:px-6 lg:px-8 py-2.5 lg:py-3 z-10">
              <div className="flex flex-col xs:flex-row items-center justify-between gap-2 xs:gap-3 text-xs">
                <div className="flex items-center gap-3 text-gray-600">
                  <span className="font-medium bg-linear-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
                    ARYU SmartCV
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full max-xs:hidden" />
                  <span className="text-gray-500 max-xs:hidden">
                    © {new Date().getFullYear()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-500">
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                  >
                    <span>Get Hired Faster</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumePreviewModal;
