"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheckCircle, FiStar, FiShield, FiMail, FiPhone, FiMapPin, FiXCircle } from "react-icons/fi";
import { IoSparkles } from "react-icons/io5";
import { FaRegLightbulb, FaLinkedin, FaGlobe, FaStar } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";

interface TipsItem {
  tip: string;
  example: string;
}

interface AITipsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  aiFeatureDescription?:string;
  proTip: string;
  bestPractices: TipsItem[];
  avoidList: string[];
  examples?: {
    before?: string;
    after?: string;
  };
  customContent?: React.ReactNode;
  hasAI?: boolean; 
}

export const TipsModal: React.FC<AITipsModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  aiFeatureDescription,
  proTip,
  bestPractices,
  avoidList,
  examples,
  customContent,
  hasAI = true,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-80 flex items-center justify-center p-3 sm:p-4">
          <div
            className="absolute inset-0 backdrop-blur-md bg-black/60"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[95%] sm:max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-indigo-600 to-indigo-500 px-4 sm:px-5 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-white/20 rounded-xl">
                    <FaRegLightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{title}</h3>
                    <p className="text-indigo-100 text-[10px] sm:text-xs">{subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer duration-500"
                  aria-label="Close"
                >
                  <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* AI Feature Highlight - Only show if hasAI is true */}
              {hasAI && aiFeatureDescription && (
                <div className="bg-linear-to-r from-purple-50 to-indigo-50 rounded-xl p-3 border border-purple-100">
                  <div className="flex items-center gap-2 mb-1">
                    <IoSparkles className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs sm:text-sm font-semibold text-indigo-700">AI-Powered Assistance</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Click the <span className="font-semibold text-indigo-600">"Generate With AI"</span> button above to{" "}
                    {aiFeatureDescription}
                  </p>
                </div>
              )}

              {/* Pro Tip Card */}
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                <div className="flex items-center gap-2 mb-1">
                  <FaStar className="w-3 h-3 text-amber-500" />
                  <span className="text-xs sm:text-sm font-semibold text-amber-700">Pro Tip</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700">{proTip}</p>
              </div>

              {/* Best Practices */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-3 sm:h-4 bg-indigo-500 rounded-full" />
                  <h4 className="text-xs sm:text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                    Best Practices
                  </h4>
                </div>
                <div className="space-y-2">
                  {bestPractices.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-2 shrink-0" />
                      <div>
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">{item.tip}</span>
                        <p className="text-[11px] sm:text-xs text-gray-600 mt-0.5">📌 {item.example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What to Avoid */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-3 sm:h-4 bg-red-500 rounded-full" />
                  <h4 className="text-xs sm:text-sm font-semibold text-red-600 uppercase tracking-wide">
                    Avoid These
                  </h4>
                </div>
                <div className="space-y-1.5">
                  {avoidList.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <FiXCircle className="w-3 h-3 text-red-400 shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Before/After Examples */}
              {examples && (
                <div className="bg-indigo-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FiShield className="w-3 h-3 text-indigo-600" />
                    <p className="text-xs font-semibold text-indigo-700">Before → After (AI Enhanced)</p>
                  </div>
                  <div className="space-y-2">
                    {examples.before && (
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 mb-0.5">❌ Before:</p>
                        <p className="text-[11px] sm:text-xs text-gray-600">{examples.before}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs sm:text-sm text-emerald-600 mb-0.5">✅ After (AI Generated):</p>
                      <p className="text-[11px] sm:text-xs text-gray-800 font-medium">{examples.after}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Custom Content */}
              {customContent}
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-5 py-3 bg-gray-50 border-t border-gray-100">
              <button
                onClick={onClose}
                className="w-full py-2 bg-indigo-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all cursor-pointer duration-500"
              >
                Got it, thanks
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

