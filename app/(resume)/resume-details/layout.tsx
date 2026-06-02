"use client";
import { templateData } from "@/app/data";
import { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FiChevronRight,
  FiLayout,
  FiLogIn,
  FiEye,
  FiX,
  FiArrowRight,
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

  const selectedResume = templateData.find(
    (resume) => resume.id == (chosenTemplate?.id || chosenTemplate?.templateId),
  );

  console.log("Selected Resume Template:", selectedResume);

  const SelectedComponent = selectedResume?.component;

  // usePreventReload()

  return (
    <div className="flex h-screen bg-gray-100  relative">
      <LoginModel />

      <aside className="w-full lg:w-1/2 overflow-y-auto ">
        <ResumeDataFetcher>{children}</ResumeDataFetcher>
      </aside>

      <section className="max-lg:hidden w-1/2 bg-[#e8e6f2]">
        <div
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
            className={`flex items-center gap-2 px-4 py-2.5  bg-white backdrop-blur-md border border-gray-200/50 hover:border-indigo-400  text-gray-700 hover:text-indigo-600  font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer ${isHovered ? "shadow-lg bg-white" : ""}
    `}
          >
            {/* Animated Icon Container */}
            <div className="relative">
              <motion.div
                animate={{ rotate: isHovered ? 180 : 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                className="p-0.5"
              >
                <FiLayout className="w-4 h-4" />
              </motion.div>
              {/* Glow effect on hover */}
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
        </div>
        {SelectedComponent && (
          <SimpleCanvasPreview>
            <SelectedComponent />
          </SimpleCanvasPreview>
        )}
      </section>

      {/* Mobile Preview Button - Only visible on small screens */}
      {SelectedComponent && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMobilePreview(true)}
          className="lg:hidden fixed top-16 right-4 z-50 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FiEye className="w-3 h-3" />
        </motion.button>
      )}

      {/* Mobile Preview Drawer */}
      <AnimatePresence>
        {showMobilePreview && SelectedComponent && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobilePreview(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 h-full w-full sm:w-[90%] bg-white shadow-2xl z-50 overflow-hiddenl sm:rounded-l-3xl"
            >
              {/* Drawer Header with Gradient */}
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

              {/* Template Info Bar */}
              <div className="absolute top-12 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-2 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-500">Live Preview</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowMobilePreview(false);
                      router.push("/change-template");
                    }}
                    className="flex items-center gap-1 px-2 py-1 bg-indigo-50 rounded-lg text-indigo-600 text-xs font-medium"
                  >
                    <FiLayout className="w-3 h-3" />
                    Change Template
                  </button>
                </div>
              </div>

              {/* Drawer Content - Resume Preview */}
              <div className="h-full pt-24 pb-6 overflow-y-auto">
                <div className="px-3">
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
