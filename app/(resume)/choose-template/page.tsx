














"use client";

import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CreateContext } from "@/app/context/CreateContext";
import { templateData } from "@/app/data";
import { Template } from "@/app/types";
import Header from "@/app/components/layouts/Header";
import Footer from "@/app/components/layouts/Footer";
import {
  convertParsedResumeToFrontendFormat,
  getLocalStorage,
  removeSessionStorage,
  setLocalStorage,
} from "@/app/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  FileText,
  Upload,
  X,
  CheckCircle,
  ArrowRight,
  Star,
  Download,
  Eye,
  Lock,
  Crown,
  AlertCircle,
} from "lucide-react";
import { LuUsers } from "react-icons/lu";
import { PiReadCvLogo } from "react-icons/pi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { IoRocket } from "react-icons/io5";
import axios from "axios";
import { API_URL } from "@/app/config/api";
import { User } from "@/app/types/user.types";
import toast, { Toaster } from "react-hot-toast";
import { ResumePreviewModal } from "@/app/components/resume";

interface usersCurrentPlan {
  amount: number;
  plan: string;
}

const PLAN_CONFIG = {
  free: {
    maxTemplates: 1,
    label: "Free",
    color: "from-slate-500 to-slate-600",
    badgeColor: "bg-slate-100 text-slate-700",
  },
  pro: {
    maxTemplates: 3,
    label: "Pro",
    color: "from-indigo-600 to-indigo-500",
    badgeColor: "bg-indigo-100 text-indigo-700",
  },
  proplus: {
    maxTemplates: 5,
    label: "Pro Plus",
    color: "from-amber-500 to-orange-500",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  premium: {
    maxTemplates: Infinity,
    label: "Premium",
    color: "from-purple-500 to-indigo-600",
    badgeColor: "bg-purple-100 text-purple-700",
  },
};

const getRequiredPlanForTemplate = (index: number): keyof typeof PLAN_CONFIG => {
  if (index < PLAN_CONFIG.free.maxTemplates) return "free";
  if (index < PLAN_CONFIG.pro.maxTemplates) return "pro";
  if (index < PLAN_CONFIG.proplus.maxTemplates) return "proplus";
  return "premium";
};

function Choose_template() {
  const router = useRouter();
  const {
    setContact,
    setEducation,
    setExperiences,
    setSkills,
    setSummary,
    setFinalize,
    setProjects,
    setFullResumeData,
    setChosenTemplate,
    setIsUploadMode,
    clearUploadMode,
  } = useContext(CreateContext);

  removeSessionStorage("oldRouteNameDashboard");

  const [usersCurrentPlan, setUsersCurrentPlan] = useState<usersCurrentPlan | null>(null);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [selectedLockedTemplate, setSelectedLockedTemplate] = useState<{
    template: Template;
    requiredPlan: string;
  } | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showInitialPopup, setShowInitialPopup] = useState(true);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [hoveredTemplate, setHoveredTemplate] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const clickresumedetails = (template: Template) => {
    setChosenTemplate(template);
    setLocalStorage("chosenTemplate", template);
    router.push(`/resume-details/contact`);
  };

  const getCurrentPlan = (): keyof typeof PLAN_CONFIG => {
    const plan = usersCurrentPlan?.plan?.toLowerCase() || "free";
    if (plan.includes("pro plus")) return "proplus";
    if (plan.includes("pro")) return "pro";
    if (plan.includes("premium")) return "premium";
    return "free";
  };

  const isTemplateAccessible = (templateIndex: number): boolean => {
    const currentPlan = getCurrentPlan();
    const maxTemplates = PLAN_CONFIG[currentPlan].maxTemplates;
    return templateIndex < maxTemplates;
  };

  const getAvailableTemplatesCount = (): number => {
    const currentPlan = getCurrentPlan();
    const maxTemplates = PLAN_CONFIG[currentPlan].maxTemplates;
    return Math.min(maxTemplates, templateData.length);
  };

  const handleTemplateSelect = (template: Template, index: number) => {
    if (isTemplateAccessible(index)) {
      clickresumedetails(template);
      clearUploadMode();
    } else {
      const requiredPlan = getRequiredPlanForTemplate(index);
      setSelectedLockedTemplate({
        template,
        requiredPlan: PLAN_CONFIG[requiredPlan].label,
      });
      setShowUpgradePopup(true);
    }
  };

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
    setShowPreview(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDetails = getLocalStorage<User>("user_details");
        if (!userDetails?.id) return;

        const response = await axios.get(`${API_URL}/api/users/dashboard`, {
          params: { userId: userDetails.id },
        });

        setUsersCurrentPlan(response?.data?.payments?.[0] || null);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, []);



  const currentPlan = getCurrentPlan();
  const availableTemplates = getAvailableTemplatesCount();
  const totalTemplates = templateData.length;
  const isUpgradeNeeded = availableTemplates < totalTemplates;

  useEffect(() => {
    if (showPreview || showInitialPopup || showUploadPopup || showUpgradePopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showPreview, showInitialPopup, showUploadPopup, showUpgradePopup]);

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
    if (file && isValidFileType(file)) {
      handleFileUpload(file);
    } else {
      setErrorMessage("Please upload a PDF or DOCX file");
    }
  };

  const handleCreateNew = () => {
    setShowInitialPopup(false);
  };

  const isValidFileType = (file: File): boolean => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    return validTypes.includes(file.type);
  };

  const handleFileUpload = async (file: File) => {
    const maxSize = 10 * 1024 * 1024;

    if (!isValidFileType(file)) {
      setErrorMessage("Please upload a PDF or DOCX file");
      return;
    }

    if (file.size > maxSize) {
      setErrorMessage("File size must be less than 10MB");
      return;
    }

    setIsUploading(true);
    setUploadStatus("uploading");
    setUploadedFile(file);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setUploadProgress(i);
      }

      setUploadStatus("processing");
      setUploadProgress(100);

      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/resume/parse-resume`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              setUploadProgress(percentCompleted);
            }
          },
        },
      );

      const parsedResumeData = response.data.parsed;
      const convertedData = convertParsedResumeToFrontendFormat(parsedResumeData);

      console.log("convertedData",convertedData)

      if (convertedData.contact) setContact(convertedData.contact);
      if (convertedData.experiences) setExperiences(convertedData.experiences);
      if (convertedData.educations) setEducation(convertedData.educations);
      if (convertedData.skills) setSkills(convertedData.skills);
      if (convertedData.projects) setProjects(convertedData.projects);
      if (convertedData.summary) setSummary(convertedData.summary);
      if (convertedData.finalize) setFinalize(convertedData.finalize);

      setFullResumeData({
        contact: convertedData.contact,
        experiences: convertedData.experiences,
        education: convertedData.educations,
        skills: convertedData.skills,
        summary: convertedData.summary?.[0] || "",
        finalize: convertedData.finalize || {},
        projects: convertedData.projects || [],
      });

      const defaultTemplate = templateData[0];
      setLocalStorage("chosenTemplate", defaultTemplate);
      setChosenTemplate(defaultTemplate);
      setIsUploadMode(true);
      setUploadStatus("success");

      toast.success("Resume uploaded and processed successfully!", {
        duration: 3000,
        style: { background: "#10b981", color: "#fff", borderRadius: "12px" },
      });

      setTimeout(() => {
        setShowUploadPopup(false);
        router.push(`/resume-details/contact`);
        setTimeout(() => {
          setIsUploading(false);
          setUploadedFile(null);
          setUploadStatus("idle");
          setUploadProgress(0);
        }, 500);
      }, 2000);
    } catch (err) {
      console.error("Upload error:", err);
      setUploadStatus("error");
      setErrorMessage("Failed to parse resume. Please try again.");
      setIsUploading(false);
    }
  };

  const resetUploadPopup = () => {
    if (uploadStatus !== "uploading" && uploadStatus !== "processing") {
      setShowUploadPopup(false);
      setTimeout(() => {
        setIsUploading(false);
        setUploadedFile(null);
        setUploadStatus("idle");
        setUploadProgress(0);
        setErrorMessage("");
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-indigo-50/20">
      <Toaster position="top-right" />
      <Header />

      {/* Initial Popup */}
      <AnimatePresence>
  {showInitialPopup && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] h-screen flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xl overflow-hidden"
      // style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-2xl sm:rounded-3xl  sm:max-w-4xl w-full shadow-2xl  sm:mt-20 md:mt-30 lg:my-6 mx-auto overflow-hidden"
      >
        {/* Header Section - Fixed padding for mobile */}
        <div className="relative bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 pt-8 sm:pt-6 md:pt-8 pb-6 sm:pb-8 px-4 sm:px-6 md:px-8 text-white">
          {/* Close Button - Better positioning */}
          <button 
            onClick={() => setShowInitialPopup(false)} 
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 hover:bg-white/20 rounded-lg sm:rounded-xl transition-all duration-200 z-10"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-1.5 max-sm:hidden sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full text-white text-[10px] sm:text-sm font-semibold mb-3 sm:mb-4"
            >
              <IoRocket className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>AI-POWERED RESUME BUILDER</span>
            </motion.div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 px-2">
              Let's Build Your Job Winning Resume
            </h2>
            <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-lg mx-auto px-2">
              Choose how you want to create your resume and get interview ready in minutes
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Create New Resume Option */}
            <motion.div
              onClick={handleCreateNew}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/30 p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-300 border border-indigo-100"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Create New Resume</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                No experience? No problem. AI will build your resume with the right skills, projects, and format
              </p>
              <button className="flex items-center text-indigo-600 font-semibold text-sm sm:text-base group-hover:gap-2 transition-all cursor-pointer">
                Get started 
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Upload Existing Resume Option */}
            <motion.div
              onClick={() => {
                setShowInitialPopup(false);
                setShowUploadPopup(true);
              }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50/30 p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-300 border border-purple-100"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Improve My Existing Resume</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                Already have a resume? Upload it and let AI rewrite, fix, and optimize it for better results
              </p>
              <button className="flex items-center text-purple-600 font-semibold text-sm sm:text-base group-hover:gap-2 transition-all cursor-pointer">
                Upload now 
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Footer Features */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t max-sm:hidden border-gray-100 text-center">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-gray-500">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <LuUsers className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500 shrink-0" /> 
                <span className="whitespace-nowrap">Built for freshers & experienced</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <AiOutlineThunderbolt className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500 shrink-0" /> 
                <span className="whitespace-nowrap">AI powered</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <PiReadCvLogo className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500 shrink-0" /> 
                <span className="whitespace-nowrap">Ready in 3 minutes</span>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
            onClick={resetUploadPopup}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-6 relative overflow-hidden">
                <div className="relative flex items-center justify-between">
                  <div><h2 className="text-2xl font-bold text-white">Upload Your Resume</h2><p className="text-white/80 text-sm mt-1">Upload file to get started</p></div>
                  <button onClick={resetUploadPopup} className="p-2 hover:bg-white/20 rounded-xl transition"><X className="w-5 h-5 text-white" /></button>
                </div>
              </div>

              <div className="p-6">
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                    uploadStatus === "error" ? "border-red-500 bg-red-50/40"
                    : uploadStatus === "success" ? "border-emerald-500 bg-emerald-50/40"
                    : isDragging ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/30"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input type="file" id="file-upload" className="hidden" accept=".pdf,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && isValidFileType(file)) handleFileUpload(file);
                      else if (file) setErrorMessage("Please upload a PDF or DOCX file");
                    }}
                    disabled={uploadStatus === "uploading" || uploadStatus === "processing"}
                  />

                  {isUploading || uploadStatus === "processing" ? (
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 relative">
                        <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
                        <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
                      </div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">{uploadStatus === "uploading" ? "Uploading" : "Processing"}... {uploadProgress}%</p>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-gradient-to-r from-indigo-600 to-indigo-500" initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} transition={{ duration: 0.3 }} />
                      </div>
                      <p className="text-xs text-gray-500 mt-3">{uploadStatus === "uploading" && "Uploading file to server..."}{uploadStatus === "processing" && "Analyzing and extracting information..."}</p>
                    </div>
                  ) : uploadedFile && uploadStatus === "success" ? (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-emerald-100 rounded-full flex items-center justify-center"><CheckCircle className="w-8 h-8 text-emerald-500" /></div>
                      <p className="text-sm font-medium text-gray-900 mb-1">{uploadedFile.name}</p>
                      <p className="text-xs text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      <p className="text-xs text-emerald-600 mt-2">✓ Successfully processed</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center"><Upload className="w-10 h-10 text-indigo-600" /></div>
                      <p className="text-base font-semibold text-gray-900 mb-1">Drop your file here</p>
                      <p className="text-sm text-gray-500 mb-4">Supports PDF and DOCX up to 10MB</p>
                      <button onClick={() => document.getElementById("file-upload")?.click()} disabled={uploadStatus === "uploading" || uploadStatus === "processing"} className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer">Browse Files</button>
                    </div>
                  )}
                </div>

                {uploadStatus === "error" && errorMessage && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                    <p className="text-sm text-red-600">{errorMessage}</p>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button onClick={resetUploadPopup} disabled={uploadStatus === "uploading" || uploadStatus === "processing"} className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all disabled:opacity-50 cursor-pointer">Cancel</button>
                  {uploadedFile && uploadStatus === "success" && (
                    <button onClick={() => { setShowUploadPopup(false); router.push(`/resume-details/contact`); }} className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-all cursor-pointer">Continue to Resume</button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upgrade Popup */}
      <AnimatePresence>
        {showUpgradePopup && selectedLockedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center relative overflow-hidden">
                <div className="relative">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4"><Lock className="w-10 h-10 text-white" /></div>
                  <h3 className="text-2xl font-bold text-white mb-2">Template Locked</h3>
                  <p className="text-white/80">This template requires <span className="font-semibold">{selectedLockedTemplate.requiredPlan}</span> plan</p>
                </div>
              </div>
              <div className="p-6 text-center">
                <p className="text-gray-600 mb-6">Upgrade your plan to unlock this template and get access to all premium features</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => setShowUpgradePopup(false)} className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all cursor-pointer">Cancel</button>
                  <button onClick={() => { setShowUpgradePopup(false); router.push("/choose-plan"); }} className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer">Upgrade Now</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold mb-6">
              <IoRocket className="w-4 h-4" /><span>PROFESSIONAL TEMPLATES</span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Pick a Resume That
              <span className="block bg-gradient-to-r from-yellow-300 to-amber-200 bg-clip-text text-transparent mt-2">Gets You Shortlisted</span>
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">Choose a template and let AI build your job-ready resume in minutes</p>
            {usersCurrentPlan && (
              <div className="mt-6 inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <Star className="w-4 h-4 text-yellow-300" />
                <span className="text-sm capitalize text-white/85">{currentPlan} Plan • {availableTemplates} Templates Available</span>
              </div>
            )}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4"><div className="text-2xl font-bold text-white">{templateData.length}</div><div className="text-xs text-white/80">Templates</div></div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4"><div className="text-2xl font-bold text-white">100%</div><div className="text-xs text-white/80">ATS-Friendly</div></div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4"><div className="text-2xl font-bold text-white">3min</div><div className="text-xs text-white/80">Quick Setup</div></div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-10"><path d="M0 100L1440 0V100H0Z" fill="white" /></svg></div>
      </div>

      {/* Upload Button */}
      <div className="text-center mt-8">
        <p className="text-gray-600 text-sm mb-3">Have a resume already? Improve it instantly</p>
        <button onClick={() => { setShowInitialPopup(false); setShowUploadPopup(true); }} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all hover:scale-105 group">
          <Upload className="w-4 h-4" /><span>Upload & Improve</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Templates Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Select Your Resume Style</h2>
            <p className="text-gray-500 mt-2">Simple, clean, and ATS-friendly templates designed to get you interview calls</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templateData?.map((template, index) => {
              const isAccessible = isTemplateAccessible(index);
              const requiredPlan = getRequiredPlanForTemplate(index);
              const requiredPlanLabel = PLAN_CONFIG[requiredPlan].label;
              const isPremium = requiredPlan !== "free";
              const isHovered = hoveredTemplate === template.id;

              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                  className="relative group"
                >
                  <motion.div
                    animate={{ y: isHovered ? -5 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative bg-gray-50 p-3">
                      {/* Plan Badge */}
                      {isPremium && (
                        <div className={`absolute top-3 right-3 ${PLAN_CONFIG[requiredPlan].badgeColor} px-2 py-0.5 rounded-full text-xs font-bold z-10 flex items-center gap-1 shadow-sm`}>
                          {requiredPlan === "premium" ? <Crown className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                          <span>{requiredPlanLabel}</span>
                        </div>
                      )}

                      {/* Template Image */}
                      <div className="relative w-full h-64 sm:h-80 md:h-96">
                        <Image
                          src={template.image}
                          alt={template?.style || "Template"}
                          fill
                          className="object-contain object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Buttons - Below the image on mobile, overlay on desktop hover */}
                      {isMobile ? (
                        // Mobile: Buttons below the image
                        <div className="mt-4 flex flex-col gap-2">
                          <button
                            onClick={() => handlePreview(template)}
                            className="w-full px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-semibold text-sm hover:bg-indigo-100 transition flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Eye className="w-4 h-4" /> Preview
                          </button>
                          {isAccessible ? (
                            <button
                              onClick={() => handleTemplateSelect(template, index)}
                              className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Sparkles className="w-4 h-4" /> Use Template
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedLockedTemplate({ template, requiredPlan: requiredPlanLabel });
                                setShowUpgradePopup(true);
                              }}
                              className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white font-semibold text-sm hover:bg-gray-700 transition flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Lock className="w-4 h-4" /> Unlock
                            </button>
                          )}
                        </div>
                      ) : (
                        // Desktop: Overlay on hover
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button
                            onClick={() => handlePreview(template)}
                            className="px-4 py-2 rounded-lg bg-white text-indigo-600 font-semibold text-sm shadow-lg hover:scale-105 transition flex items-center gap-2 cursor-pointer"
                          >
                            <Eye className="w-4 h-4" /> Preview
                          </button>
                          {isAccessible ? (
                            <button
                              onClick={() => handleTemplateSelect(template, index)}
                              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold text-sm shadow-lg hover:scale-105 transition flex items-center gap-2 cursor-pointer"
                            >
                              <Sparkles className="w-4 h-4" /> Use Template
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedLockedTemplate({ template, requiredPlan: requiredPlanLabel });
                                setShowUpgradePopup(true);
                              }}
                              className="px-4 py-2 rounded-lg bg-gray-600 text-white font-semibold text-sm shadow-lg hover:scale-105 transition flex items-center gap-2 cursor-pointer"
                            >
                              <Lock className="w-4 h-4" /> Unlock
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Upgrade CTA Banner */}
          {isUpgradeNeeded && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center"><Crown className="w-5 h-5 text-white" /></div>
                  <div><h3 className="font-bold text-gray-900">Unlock All {totalTemplates} Templates</h3><p className="text-sm text-gray-600">Upgrade to Premium for full access</p></div>
                </div>
                <button onClick={() => router.push("/choose-plan")} className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">View Plans →</button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <ResumePreviewModal
        show={showPreview}
        template={previewTemplate}
        onClose={() => { setShowPreview(false); setPreviewTemplate(null); }}
        onUse={() => {
          if (previewTemplate) {
            const templateIndex = templateData.findIndex((t) => t.id === previewTemplate.id);
            if (isTemplateAccessible(templateIndex)) clickresumedetails(previewTemplate);
            else {
              const requiredPlan = getRequiredPlanForTemplate(templateIndex);
              setSelectedLockedTemplate({ template: previewTemplate, requiredPlan: PLAN_CONFIG[requiredPlan].label });
              setShowPreview(false);
              setShowUpgradePopup(true);
            }
          }
        }}
      />

      <Footer />
    </div>
  );
}

export default Choose_template;