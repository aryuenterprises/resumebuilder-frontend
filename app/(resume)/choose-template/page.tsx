"use client";

import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import SubscriptionPopup from './SubscriptionPopup';
import ResumePreviewModal from "../../components/resume/ResumePreviewModal";
import { CreateContext } from "@/app/context/CreateContext";
import { templateData } from "@/app/data";
import { Template } from "@/app/types";
import Header from "@/app/components/layouts/Header";
import Footer from "@/app/components/layouts/Footer";
import { setLocalStorage } from "@/app/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  FileText,
  Upload,
  X,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Download,
  Eye,
  Clock,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";
import { LuUsers } from "react-icons/lu";
import { PiReadCvLogo } from "react-icons/pi";
import { AiOutlineThunderbolt } from "react-icons/ai";


function Choose_template() {
  const router = useRouter();

  const { setChosenTemplate } = useContext(CreateContext);

  const clickresumedetails = (template: Template) => {
    setChosenTemplate(template);
    router.push(`/resume-details/contact`);
    setLocalStorage("chosenTemplate", template);
  };

  const steps = [
    { id: 1, name: "Pick a template", icon: FileText },
    { id: 2, name: "Add your details", icon: Sparkles },
    { id: 3, name: "Download & apply", icon: Download },
  ];




  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [showInitialPopup, setShowInitialPopup] = useState(true);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // ─── this will hide main scrollbar ───────────────────────────────────────────────
  useEffect(() => {
    if (showPreview || showInitialPopup || showUploadPopup)
      document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");

    return () => document.body.classList.remove("overflow-hidden");
  }, [showPreview, showInitialPopup, showUploadPopup]);

  // Handle file upload with progress simulation
  const handleFileUpload = async (file: File) => {
    // Check if it's a PDF or DOCX
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF or DOCX file");
      return;
    }

    if (file.size > maxSize) {
      alert("File size must be less than 10MB");
      return;
    }

    setIsUploading(true);
    setUploadedFile(file);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Here you would typically send to your backend
    console.log("File uploaded:", file);

    setTimeout(() => {
      setIsUploading(false);
      setShowUploadPopup(false);
      // Show success message or redirect to parsing
    }, 500);
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  // Handle create new resume
  const handleCreateNew = () => {
    setShowInitialPopup(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Header />

      {/* Initial Popup */}
      <AnimatePresence>
        {showInitialPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden"
            >
              {/* Header with your red linear */}
              <div className=" bg-linear-to-r from-[#5E000B] to-[#C40116] pt-4 px-6 pb-6 text-white overflow-hidden">
                {/* Close button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowInitialPopup(false)}
                    className=" p-2 text-white/80 hover:text-white  cursor-pointer transition-all"
                  >
                    <X className="w-6 h-6  cursor-pointer " />
                  </button>
                </div>

                <div className=" text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
Let’s Build Your Job Winning Resume
                  </h2>
                  <p className="text-white/80 text-lg max-w-lg mx-auto">
                    Choose how you want to create your resume and get interview ready in minutes

                  </p>
                </div>
              </div>

              {/* Options Grid */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Create New Option - Red themed */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-red-50 to-rose-50 p-1 hover:shadow-xl transition-all duration-500"
                  >
                    <div className="relative bg-white rounded-xl p-6 h-full hover:bg-transparent transition-colors duration-500">
                      <div className="relative z-10">
                        <div className="w-14 h-14 bg-linear-to-br from-[#5E000B] to-[#C40116] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Create New Resume
                        </h3>
                        <p className="text-gray-600 mb-4 text-start">
                          No experience? No problem. AI will build your resume with the right skills, projects, and format
Create Resume 

                        </p>
                        <button
                          onClick={handleCreateNew}
                          className="flex items-center text-[#C40116] font-medium cursor-pointer"
                        >
                          <span>Get started</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Upload Option - Red themed */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-rose-50 to-red-50 p-1 hover:shadow-xl transition-all duration-500"
                  >
                    <div className="relative bg-white rounded-xl p-6 h-full hover:bg-transparent transition-colors duration-500">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-rose-200 to-red-200 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                      <div className="relative z-10">
                        <div className="w-14 h-14 bg-linear-to-br from-[#C40116] to-[#5E000B] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                          <Upload className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
Improve My Existing Resume

                        </h3>
                        <p className="text-gray-600 mb-4 text-start">
                      Already have a resume? Upload it and let AI rewrite, fix, and optimize it for better results
Upload & Improve
                        </p>
                        <button
                          onClick={() => {
                            setShowInitialPopup(false);
                            setShowUploadPopup(true);
                          }}
                          className="flex items-center text-[#C40116] font-medium cursor-pointer"
                        >
                          <span>Upload now</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Trust indicators */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <LuUsers className="w-4 h-4 text-[#C40116]" />
                      <span>Built for freshers & experienced</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AiOutlineThunderbolt className="w-4 h-4 text-[#C40116]" />
                      <span>AI powered </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PiReadCvLogo className="w-4 h-4 text-[#C40116]" />
                      <span> Ready in 3 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Popup */}
      <AnimatePresence>
        {showUploadPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
            onClick={() => setShowUploadPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white backdrop-blur-xl rounded-3xl max-w-lg w-full shadow-2xl border border-white/20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 bg-linear-to-br from-[#5E000B] to-[#C40116] rounded-2xl flex items-center justify-center mx-auto mb-4"
                  >
                    <Upload className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Upload Your Resume
                  </h2>
                  <p className="text-gray-600">
                    Drag and drop or browse to upload your file
                  </p>
                </div>

                {/* Upload area */}
                <div
                  className="relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 border-[#C40116] bg-red-50/40 "
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />

                  {isUploading ? (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 relative">
                        <div className="absolute inset-0 border-4 border-red-200 rounded-full" />
                        <div
                          className="absolute inset-0 border-4 border-[#C40116] rounded-full border-t-transparent animate-spin"
                          style={{
                            transform: `rotate(${uploadProgress * 3.6}deg)`,
                          }}
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        Uploading... {uploadProgress}%
                      </p>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-linear-to-r from-[#5E000B] to-[#C40116]"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : uploadedFile ? (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {uploadedFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-red-100 to-rose-100 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-[#C40116]" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        Drop your file here
                      </p>
                      <p className="text-xs text-gray-500 mb-4">
                        Supports: PDF, DOCX (Max 10MB)
                      </p>
                      <button
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                        className="px-6 py-2 bg-linear-to-r from-[#5E000B] to-[#C40116] text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
                      >
                        Browse Files
                      </button>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowUploadPopup(false)}
                    className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-200 transition-all cursor-pointer bg-gray-100"
                  >
                    Cancel
                  </button>
                  {uploadedFile && !isUploading && (
                    <button className="flex-1 py-3 bg-linear-to-r from-[#5E000B] to-[#C40116] text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                      Process Resume
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-linear-to-r from-[#5E000B] to-[#C40116]">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-2">
                Pick a Resume That 

                <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-amber-200 mt-2 sm:mt-0">
Gets You Shortlisted                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto px-4">
Choose a template and let AI build your job-ready resume in minutes
              </p>

              {/* Stats - Responsive grid */}
              <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-10 lg:mt-12 max-w-3xl mx-auto px-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {templateData.length}
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">
 Job Ready Templates
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    100%
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">
ATS-Friendly Format
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    3min
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">
Ready in 3 Minutes
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Curved Bottom - Responsive */}
          <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 lg:h-10">
            <svg
              viewBox="0 0 1440 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path d="M0 100L1440 0V100H0Z" fill="white" fillOpacity="1" />
            </svg>
          </div>

          {/* Wave divider */}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm mb-3">Have a resume already? Improve it instantly</p>
          <button
            onClick={() => {
              setShowInitialPopup(false);
              setShowUploadPopup(true);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#5E000B] to-[#C40116] text-white rounded-xl cursor-pointer font-semibold text-sm hover:shadow-lg transition-all hover:scale-105 group"
          >
            <Upload className="w-4 h-4" />
            <span>Upload & Improve </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Floating Progress Bar */}
        <div className="mt-4 sm:mt-5 max-lg:hidden z-50 max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="backdrop-blur-xl bg-white/70 border border-gray-200 rounded-xl sm:rounded-2xl shadow-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4">
            <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto pb-2">
              {steps.map((step, index) => {
                return (
                  <div
                    key={step.id}
                    className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-500 text-sm sm:text-base
                      bg-linear-to-r from-red-600 to-rose-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] sm:shadow-[0_0_20px_rgba(239,68,68,0.4)]`}
                    >
                      {step.id}
                    </div>

                    <span
                      className={`text-sm sm:text-base md:text-lg whitespace-nowrap text-gray-900 font-medium`}
                    >
                      {step.name}
                    </span>

                    {index < steps.length - 1 && (
                      <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-0.5 bg-linear-to-r from-red-400 to-rose-400 opacity-50 rounded-full shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <section className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-20 pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 md:pb-24 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 sm:mb-10 md:mb-14 text-center">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
Select Your Resume Style
              </h2>
              <p className="mt-2 sm:mt-3 md:mt-4 text-gray-600 text-sm sm:text-base md:text-lg max-w-lg sm:max-w-xl md:max-w-2xl mx-auto px-2">
               Simple, clean, and ATS-friendly templates designed to get you interview calls

              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {templateData?.map((template, index) => {
                const isFree = template.temp === "free";
                // const isLocked = !hasPlan && !isFree;

                return (
                  <div
                    key={template.id}
                    className="group relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl border border-gray-200 overflow-hidden hover:border-red-200 hover:shadow-[0_15px_40px_rgba(196,1,22,0.10)] sm:hover:shadow-[0_20px_50px_rgba(196,1,22,0.10)] md:hover:shadow-[0_25px_60px_rgba(196,1,22,0.10)] transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative bg-[#fff5f6] p-4 sm:p-6 md:p-8">
                      {/* {!isFree && (
                        <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-white text-red-600 border border-red-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold shadow-sm">
                          PREMIUM
                        </div>
                      )} */}

                      <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-white border border-gray-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                        ATS Friendly
                      </div>

                      <div className="relative w-full h-50 sm:h-62.5 md:h-75 lg:h-85">
                        <Image
                          src={template.image}
                          alt={template.style}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                      </div>

                      {/* Hover Actions */}
                      <div className="absolute inset-0 lg:bg-white/5 lg:backdrop-blur-sm flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 p-3 sm:p-4">
                        <button
                          onClick={() => {
                            setPreviewTemplate(template);
                            setShowPreview(true);
                          }}
                          className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl bg-white text-[#c40116] border border-[#c40116] font-semibold text-xs sm:text-sm md:text-base shadow hover:scale-105 transition cursor-pointer"
                        >
                          Live Preview
                        </button>

                        {/* {isLocked ? (
                          <button
                            onClick={() => {
                              clickresumedetails(template);
                            }}
                            className="px-3 sm:px-4 md:px-5 lg:px-7 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg sm:rounded-xl bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-semibold text-xs sm:text-sm md:text-base shadow-lg sm:shadow-xl hover:scale-105 transition-transform flex items-center gap-1 sm:gap-2 cursor-default"
                          >
                            Coming Soon
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              clickresumedetails(template);
                            }}
                            className="px-3 sm:px-4 md:px-5 lg:px-7 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg sm:rounded-xl bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-semibold text-xs sm:text-sm md:text-base shadow-lg sm:shadow-xl hover:scale-105 transition-transform"
                          >
                            Use This Template
                          </button>
                        )} */}
                        <button
                          onClick={() => {
                            clickresumedetails(template);
                          }}
                          className="px-3 sm:px-4 md:px-5 lg:px-7 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg sm:rounded-xl bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-semibold text-xs sm:text-sm md:text-base shadow-lg sm:shadow-xl hover:scale-105 transition-transform cursor-pointer"
                        >
                          Use This Template
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 sm:p-5 md:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        {template.style}
                      </h3>

                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {template.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Preview Modal */}
            <ResumePreviewModal
              show={showPreview}
              template={previewTemplate}
              onClose={() => {
                setShowPreview(false);
                setPreviewTemplate(null);
              }}
              onUse={() => {
                if (previewTemplate) {
                  clickresumedetails(previewTemplate);
                }
              }}
            />

            {/* Subscription Popup */}
            {/* <SubscriptionPopup
             show={showPopup}
             onClose={() => {
               setShowPopup(false);
               setSelectedTemplate(null);
             }}
             template={selectedTemplate}
           /> */}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Choose_template;
