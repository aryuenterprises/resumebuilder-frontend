
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Check,
  X,
  Sparkles,
  Zap,
  Maximize2,
  Minimize2,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

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

export const ResumePreviewModal = ({
  show,
  onClose,
  template,
  onUse,
}: ResumePreviewModalProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(0.5);

  if (!show || !template) return null;

  return (
    <AnimatePresence>
      {show && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center ${isFullscreen ? "p-0" : "p-2 sm:p-4 md:p-6"}`}
        >
          {/* Premium Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{
              duration: 0.5,
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className={`relative bg-white w-full shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
              isFullscreen
                ? "h-screen w-screen rounded-none"
                : "h-[95vh] sm:h-[90vh] max-w-7xl rounded-3xl sm:rounded-4xl"
            }`}
          >
            {/* Premium Header - Minimal */}
            <div className="relative shrink-0 bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 z-10">
              <div className="flex items-center justify-end">
                <div className="flex items-center gap-1 sm:gap-2">
                  {/* Fullscreen Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-600" />
                    ) : (
                      <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-600" />
                    )}
                  </motion.button>

                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-600" />
                  </motion.button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600"
                />
              </div>
            </div>

            {/* Main Content */}
            <div
              className={`relative flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-gradient-to-br from-gray-50 via-white to-gray-50 ${isFullscreen ? "" : "p-4 sm:p-6 lg:p-8"}`}
            >
              <div
                className={`mx-auto ${isFullscreen ? "w-full" : "max-w-6xl"}`}
              >
                {/* Resume Preview Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="relative group w-full"
                >
                  {/* Glow Effect */}
                  <div
                    className={`absolute -inset-4 bg-gradient-to-r from-indigo-100/50 via-purple-100/50 to-indigo-100/50 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${isFullscreen ? "hidden" : ""}`}
                  />

                  {/* Zoom Controls */}
                  <div className="absolute top-4 right-4 z-20 flex gap-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-600 text-sm"
                    >
                      -
                    </button>
                    <span className="text-gray-700 text-xs px-2 py-1">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-600 text-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Resume Image */}
                  <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 w-full">
                    <div
                      className="relative w-full transition-transform duration-300"
                      style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: "center top",
                      }}
                    >
                      <Image
                        src={template.image || template.img}
                        alt="Resume Template"
                        width={isFullscreen ? 1920 : 800}
                        height={isFullscreen ? 1080 : 1000}
                        className="w-full h-auto object-contain"
                        priority={true}
                        quality={100}
                        unoptimized={true}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Features Section - Only show when not in fullscreen */}
                {!isFullscreen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="mt-8"
                    >
                      <div className="relative bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                        <div className="relative">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl">
                              <Zap className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">
                              Template Features
                            </h3>
                            <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {(
                              template.features || [
                                "✨ Modern & Professional Design",
                                "🎯 ATS-Friendly Layout",
                                "📝 Fully Customizable Sections",
                                "📱 Mobile Responsive Design",
                                "🎨 Clean & Organized Layout",
                                "⚡ Easy to Edit & Update",
                              ]
                            ).map((feature, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.05 }}
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-all duration-200 group cursor-pointer"
                              >
                                <div className="p-1.5 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-lg shrink-0 group-hover:scale-110 transition-transform">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-sm text-gray-700 group-hover:text-indigo-600 transition-colors">
                                  {feature}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                      className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClose}
                        className="group px-8 py-3 rounded-xl font-semibold text-gray-700 bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                        Browse More
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          if (onUse) {
                            onUse();
                          }
                        }}
                        className="group relative px-8 py-3 rounded-xl font-semibold text-white overflow-hidden shadow-lg"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 group-hover:opacity-90 transition-opacity" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        </div>
                        <span className="relative flex items-center justify-center gap-2 z-10">
                          <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                          Use This Template
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </motion.button>
                    </motion.div>
                  </>
                )}
              </div>
            </div>

            {/* Footer - Only show when not in fullscreen */}
            {!isFullscreen && (
              <div className="relative shrink-0 border-t border-gray-100 bg-gray-50/50 px-4 sm:px-6 lg:px-8 py-3 z-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 font-medium">
                    PassATS
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="text-gray-400">© 2024</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                      className="flex items-center gap-1 text-gray-400"
                    >
                      <span>✨ Get Hired Faster</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
