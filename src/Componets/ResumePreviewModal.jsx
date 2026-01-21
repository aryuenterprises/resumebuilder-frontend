import React from "react";
import {
  Check,
  CheckCircle,
  Download,
  Minus,
  Plus,
  Unlock,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

const ResumePreviewModal = ({ show, onClose, template, onUse }) => {
  if (!show || !template) return null;

  return (
    // <div className="fixed inset-0 z-[999] bg-white/5 backdrop-blur-sm flex items-center justify-center px-4">
    //   {/* Modal Container */}
    //   <div className="relative bg-white w-full max-w-6xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden animate-fadeIn flex flex-col">
    //     {/* Header */}
    //     <div className="shrink-0 bg-white border-b px-6 py-4 flex items-center justify-between">
    //       <div>
    //         <h2 className="text-xl font-bold text-gray-900">
    //           {template.style}
    //         </h2>
    //         <p className="text-sm text-gray-500">Live Resume Preview</p>
    //       </div>

    //       <button
    //         onClick={onClose}
    //         className="p-2 rounded-lg hover:bg-gray-100 transition"
    //       >
    //         <X size={24} />
    //       </button>
    //     </div>

    //     {/* Scrollable Body */}
    //     <div className="flex-1 overflow-y-auto bg-[#f7f7f9] p-10">
    //       <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">
    //         {/* Resume Image */}
    //         <img
    //           src={template.image}
    //           alt={template.style}
    //           className="w-full object-contain rounded-xl"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="fixed inset-0 z-[999] bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8">
      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white w-full max-w-6xl h-[95vh] sm:h-[90vh] rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-200/50"
      >
        {/* Header with Gradient */}
        <div className="shrink-0 bg-gradient-to-r from-white to-gray-50/80 border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#c40116]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {template.style || "Template Preview"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Live Resume Preview •{" "}
                {template.category || "Professional Template"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105"
              aria-label="Close preview"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50/50 to-white/30 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Resume Container with Shadow */}
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#c40116]/5 to-[#be0117]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Resume Image Container */}
              <div className="relative bg-white shadow-xl rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200/50">
                {/* Image with Loading State */}
                <div className="relative w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100/50">
                  <img
                    src={template.image || template.img}
                    alt={template.style || "Resume Template"}
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.005]"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3E%3Crect width='800' height='1000' fill='%23f3f4f6'/%3E%3Ctext x='400' y='500' font-family='Arial' font-size='24' fill='%236b7280' text-anchor='middle'%3EResume Preview%3C/text%3E%3C/svg%3E";
                    }}
                  />

                  {/* Loading Overlay */}
                  {!template.image && !template.img && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-3 border-[#c40116] border-t-transparent"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Template Stats */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
                  <div className="text-xs text-gray-500 mb-1">
                    Template Style
                  </div>
                  <div className="font-semibold text-gray-800">
                    {template.style || "Modern"}
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
                  <div className="text-xs text-gray-500 mb-1">Best For</div>
                  <div className="font-semibold text-gray-800">
                    {template.bestFor || "All Industries"}
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
                  <div className="text-xs text-gray-500 mb-1">Category</div>
                  <div className="font-semibold text-gray-800">
                    {template.category || "Professional"}
                  </div>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="mt-8 bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Template Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {template.features?.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="p-1.5 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
                      <Check className="w-4 h-4 text-[#c40116]" />
                    </div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                )) || (
                  <>
                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="p-1.5 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
                        <Check className="w-4 h-4 text-[#c40116]" />
                      </div>
                      <span className="text-sm text-gray-700">
                        Modern & Professional Design
                      </span>
                    </div>
                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="p-1.5 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
                        <Check className="w-4 h-4 text-[#c40116]" />
                      </div>
                      <span className="text-sm text-gray-700">
                        ATS-Friendly Layout
                      </span>
                    </div>
                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="p-1.5 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
                        <Check className="w-4 h-4 text-[#c40116]" />
                      </div>
                      <span className="text-sm text-gray-700">
                        Fully Customizable Sections
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-gray-100 bg-gradient-to-r from-white to-gray-50/80 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span>© {new Date().getFullYear()} ARYU SmartCV</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">All rights reserved</span>
            </div>
            {/* <div className="flex items-center gap-4">
              <button className="hover:text-gray-700 transition-colors">
                Help
              </button>
              <button className="hover:text-gray-700 transition-colors">
                Terms
              </button>
              <button className="hover:text-gray-700 transition-colors">
                Privacy
              </button>
            </div> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumePreviewModal;
