"use client";

import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ResumePreviewModal from "../../components/resume/ResumePreviewModal";
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
import axios from "axios";
import { API_URL } from "@/app/config/api";
import { User } from "@/app/types/user.types";

interface usersCurrentPlan {
  amount: number;
  plan: string;
}

const PLAN_CONFIG = {
  free: {
    maxTemplates: 1,
    label: "Free",
    color: "from-gray-500 to-gray-600",
    badgeColor: "bg-gray-100 text-gray-700",
  },
  pro: {
    maxTemplates: 3,
    label: "Pro",
    color: "from-blue-500 to-blue-600",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  proplus: {
    maxTemplates: 5,
    label: "Pro Plus",
    color: "from-purple-500 to-purple-600",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  premium: {
    maxTemplates: Infinity,
    label: "Premium",
    color: "from-amber-500 to-amber-600",
    badgeColor: "bg-amber-100 text-amber-700",
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

function Choose_template() {
  const router = useRouter();
  const {
    setContact,
    setEducation,
    setExperiences,
    setSkills,
    setSummary,
    setFinalize,
    setFullResumeData,
    setChosenTemplate,
    setIsUploadMode,
    clearUploadMode,
  } = useContext(CreateContext);

  removeSessionStorage("oldRouteNameDashboard");

  const [usersCurrentPlan, setUsersCurrentPlan] =
    useState<usersCurrentPlan | null>(null);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [selectedLockedTemplate, setSelectedLockedTemplate] = useState<{
    template: Template;
    requiredPlan: string;
  } | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showInitialPopup, setShowInitialPopup] = useState(true); // Changed to true to show on load
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const clickresumedetails = (template: Template) => {
    setChosenTemplate(template);
    setLocalStorage("chosenTemplate", template);
    router.push(`/resume-details/contact`);
  };

  // Get current plan name (normalized)
  const getCurrentPlan = (): keyof typeof PLAN_CONFIG => {
    const plan = usersCurrentPlan?.plan?.toLowerCase() || "free";
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

  // Handle template selection with lock check
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

  // Handle preview - always allow preview for all templates
  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
    setShowPreview(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDetails = getLocalStorage<User>("user_details");
        if (!userDetails?.id) {
          console.error("No user found");
          return;
        }

        const response = await axios.get(`${API_URL}/api/users/dashboard`, {
          params: {
            userId: userDetails.id,
          },
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

  // Hide scrollbar when modals are open
  useEffect(() => {
    if (
      showPreview ||
      showInitialPopup ||
      showUploadPopup ||
      showUpgradePopup
    ) {
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
      // Simulate upload progress
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
      const convertedData =
        convertParsedResumeToFrontendFormat(parsedResumeData);

      // Update context with parsed data
      if (convertedData.contact) {
        setContact(convertedData.contact);
      }

      if (convertedData.experiences) {
        setExperiences(convertedData.experiences);
      }

      if (convertedData.educations) {
        setEducation(convertedData.educations);
      }

      if (convertedData.skills) {
        setSkills(convertedData.skills);
      }

      if (convertedData.summary && convertedData.summary[0]) {
        setSummary(convertedData.summary[0]);
      }

      if (convertedData.finalize) {
        setFinalize(convertedData.finalize);
      }

      setFullResumeData({
        contact: convertedData.contact,
        experiences: convertedData.experiences,
        education: convertedData.educations,
        skills: convertedData.skills,
        summary: convertedData.summary?.[0] || "",
        finalize: convertedData.finalize || {},
      });

      // Set default template
      const defaultTemplate = templateData[0];
      setLocalStorage("chosenTemplate", defaultTemplate);
      setChosenTemplate(defaultTemplate);
      setIsUploadMode(true);
      setUploadStatus("success");

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

  // Upgrade Popup Component
  const UpgradePopup = () => (
    <AnimatePresence>
      {showUpgradePopup && selectedLockedTemplate && (
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
            className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
          >
            <div className="bg-linear-to-r from-[#5E000B] to-[#C40116] p-6 text-white text-center">
              <Lock className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-2xl font-bold mb-2">Template Locked</h3>
              <p className="text-white/80">
                This template requires {selectedLockedTemplate.requiredPlan}{" "}
                plan
              </p>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-center mb-6">
                Upgrade your plan to unlock this template and get access to all
                premium features
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpgradePopup(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowUpgradePopup(false);
                    router.push("/choose-plan");
                  }}
                  className="flex-1 py-3 bg-linear-to-r from-[#5E000B] to-[#C40116] text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

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
              <div className="bg-linear-to-r from-[#5E000B] to-[#C40116] pt-4 px-6 pb-6 text-white">
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowInitialPopup(false)}
                    className="p-2 text-white/80 hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    Let's Build Your Job Winning Resume
                  </h2>
                  <p className="text-white/80 text-lg max-w-lg mx-auto">
                    Choose how you want to create your resume and get interview
                    ready in minutes
                  </p>
                </div>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
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
                          No experience? No problem. AI will build your resume
                          with the right skills, projects, and format
                        </p>
                        <button
                          onClick={handleCreateNew}
                          className="flex items-center text-[#C40116] font-medium cursor-pointer group"
                        >
                          <span>Get started</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-rose-50 to-red-50 p-1 hover:shadow-xl transition-all duration-500"
                  >
                    <div className="relative bg-white rounded-xl p-6 h-full hover:bg-transparent transition-colors duration-500">
                      <div className="relative z-10">
                        <div className="w-14 h-14 bg-linear-to-br from-[#C40116] to-[#5E000B] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                          <Upload className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Improve My Existing Resume
                        </h3>
                        <p className="text-gray-600 mb-4 text-start">
                          Already have a resume? Upload it and let AI rewrite,
                          fix, and optimize it for better results
                        </p>
                        <button
                          onClick={() => {
                            setShowInitialPopup(false);
                            setShowUploadPopup(true);
                          }}
                          className="flex items-center text-[#C40116] font-medium cursor-pointer group"
                        >
                          <span>Upload now</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <LuUsers className="w-4 h-4 text-[#C40116]" />
                      <span>Built for freshers & experienced</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AiOutlineThunderbolt className="w-4 h-4 text-[#C40116]" />
                      <span>AI powered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PiReadCvLogo className="w-4 h-4 text-[#C40116]" />
                      <span>Ready in 3 minutes</span>
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
            onClick={resetUploadPopup}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-white/20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                      uploadStatus === "success"
                        ? "bg-green-500"
                        : uploadStatus === "error"
                          ? "bg-red-500"
                          : "bg-linear-to-br from-[#5E000B] to-[#C40116]"
                    }`}
                  >
                    {uploadStatus === "success" ? (
                      <CheckCircle className="w-10 h-10 text-white" />
                    ) : uploadStatus === "error" ? (
                      <AlertCircle className="w-10 h-10 text-white" />
                    ) : (
                      <Upload className="w-10 h-10 text-white" />
                    )}
                  </motion.div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {uploadStatus === "uploading" && "Uploading Your Resume"}
                    {uploadStatus === "processing" && "Processing Your Resume"}
                    {uploadStatus === "success" && "Upload Complete!"}
                    {uploadStatus === "error" && "Upload Failed"}
                    {uploadStatus === "idle" && "Upload Your Resume"}
                  </h2>

                  <p className="text-gray-600">
                    {uploadStatus === "uploading" &&
                      "Please wait while we upload your file..."}
                    {uploadStatus === "processing" &&
                      "Parsing your resume data..."}
                    {uploadStatus === "success" &&
                      "Your resume has been successfully processed! Redirecting..."}
                    {uploadStatus === "error" && errorMessage}
                    {uploadStatus === "idle" &&
                      "Drag and drop or browse to upload your file"}
                  </p>
                </div>

                {/* Error Message Display */}
                {uploadStatus === "error" && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </motion.div>
                )}

                <div
                  className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                    uploadStatus === "error"
                      ? "border-red-500 bg-red-50/40"
                      : uploadStatus === "success"
                        ? "border-green-500 bg-green-50/40"
                        : "border-[#C40116] bg-red-50/40"
                  } ${isDragging ? "border-solid bg-red-100/60" : ""}`}
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
                      if (file && isValidFileType(file)) handleFileUpload(file);
                      else if (file)
                        setErrorMessage("Please upload a PDF file");
                    }}
                    disabled={
                      uploadStatus === "uploading" ||
                      uploadStatus === "processing"
                    }
                  />

                  {isUploading || uploadStatus === "processing" ? (
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 relative">
                        <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
                        <div className="absolute inset-0 border-4 border-[#C40116] rounded-full border-t-transparent animate-spin" />
                      </div>

                      {/* Progress Bar with Percentage */}
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        {uploadStatus === "uploading"
                          ? "Uploading"
                          : "Processing"}
                        ... {uploadProgress}%
                      </p>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-linear-to-r from-[#5E000B] to-[#C40116]"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      {/* Status messages */}
                      <p className="text-xs text-gray-500 mt-3">
                        {uploadStatus === "uploading" &&
                          "Uploading file to server..."}
                        {uploadStatus === "processing" &&
                          "Analyzing and extracting information..."}
                      </p>
                    </div>
                  ) : uploadedFile && uploadStatus === "success" ? (
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
                      <p className="text-xs text-green-600 mt-2">
                        ✓ Successfully processed
                      </p>
                    </div>
                  ) : uploadedFile && uploadStatus === "error" ? (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                        <FileText className="w-8 h-8 text-red-500" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {uploadedFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <button
                        onClick={() => {
                          setUploadedFile(null);
                          setUploadStatus("idle");
                          setErrorMessage("");
                        }}
                        className="mt-3 text-sm text-[#C40116] hover:underline"
                      >
                        Try again
                      </button>
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
                        Supports PDF only
                      </p>
                      <button
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                        disabled={
                          uploadStatus === "uploading" ||
                          uploadStatus === "processing"
                        }
                        className="px-6 py-2 bg-linear-to-r from-[#5E000B] to-[#C40116] text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Browse Files
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={resetUploadPopup}
                    disabled={
                      uploadStatus === "uploading" ||
                      uploadStatus === "processing"
                    }
                    className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>

                  {uploadedFile && uploadStatus === "success" && (
                    <button
                      onClick={() => {
                        setShowUploadPopup(false);
                        router.push(`/resume-details/contact`);
                      }}
                      className="flex-1 py-3 bg-green-500 text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
                    >
                      Continue
                    </button>
                  )}

                  {uploadedFile && uploadStatus === "error" && (
                    <button
                      onClick={() => {
                        setUploadedFile(null);
                        setUploadStatus("idle");
                        setErrorMessage("");
                      }}
                      className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upgrade Popup */}
      <UpgradePopup />

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
                  Gets You Shortlisted
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto px-4">
                Choose a template and let AI build your job-ready resume in
                minutes
              </p>

              {/* Plan Badge */}
              {usersCurrentPlan && (
                <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm text-white capitalize">
                    {currentPlan} Plan • {availableTemplates} Templates
                    Available
                  </span>
                </div>
              )}

              {/* Stats */}
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
        </div>

        {/* Floating Progress Bar */}
        <div className="mt-4 sm:mt-5 max-lg:hidden z-50 max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="backdrop-blur-xl bg-white/70 border border-gray-200 rounded-xl sm:rounded-2xl shadow-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4">
            <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto pb-2">
              {[
                { id: 1, name: "Pick a template", icon: FileText },
                { id: 2, name: "Add your details", icon: Sparkles },
                { id: 3, name: "Download & apply", icon: Download },
              ].map((step, index, array) => {
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

                    {index < array.length - 1 && (
                      <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-0.5 bg-linear-to-r from-red-400 to-rose-400 opacity-50 rounded-full shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm mb-3">
            Have a resume already? Improve it instantly
          </p>
          <button
            onClick={() => {
              setShowInitialPopup(false);
              setShowUploadPopup(true);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#5E000B] to-[#C40116] text-white rounded-xl cursor-pointer font-semibold text-sm hover:shadow-lg transition-all hover:scale-105 group"
          >
            <Upload className="w-4 h-4" />
            <span>Upload & Improve</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <section className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-20 pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 md:pb-24 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 sm:mb-10 md:mb-14 text-center">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
                Select Your Resume Style
              </h2>
              <p className="mt-2 sm:mt-3 md:mt-4 text-gray-600 text-sm sm:text-base md:text-lg max-w-lg sm:max-w-xl md:max-w-2xl mx-auto px-2">
                Simple, clean, and ATS-friendly templates designed to get you
                interview calls
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {templateData?.map((template, index) => {
                const isAccessible = isTemplateAccessible(index);
                const requiredPlan = getRequiredPlanForTemplate(index);
                const requiredPlanLabel = PLAN_CONFIG[requiredPlan].label;
                const isPremium = requiredPlan !== "free";

                return (
                  <div
                    key={template.id}
                    className={`group relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl border overflow-hidden transition-all duration-500 ${
                      isAccessible
                        ? "border-gray-200 hover:border-red-200 hover:shadow-[0_15px_40px_rgba(196,1,22,0.10)]"
                        : "border-gray-200"
                    }`}
                  >
                    {/* Image Section */}
                    <div className="relative bg-[#fff5f6] p-4 sm:p-6 md:p-8">
                      {/* Required Plan Badge */}
                      {isPremium && (
                        <div
                          className={`absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 ${PLAN_CONFIG[requiredPlan].badgeColor} px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold shadow-sm z-10 flex items-center gap-1`}
                        >
                          {requiredPlan === "premium" ? (
                            <Crown className="w-3 h-3" />
                          ) : (
                            <Star className="w-3 h-3" />
                          )}
                          <span>{requiredPlanLabel}</span>
                        </div>
                      )}

                      <div className="relative w-full h-50 sm:h-62.5 md:h-75 lg:h-85">
                        <Image
                          src={template.image}
                          alt={template?.style || "Template Image"}
                          fill
                          className={`object-contain w-full transition-transform duration-500 ${
                            isAccessible ? "group-hover:scale-105" : ""
                          }`}
                        />
                      </div>

                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 p-4">
                        <button
                          onClick={() => handlePreview(template)}
                          className="px-4 py-2 rounded-lg bg-white text-[#c40116] border border-[#c40116] font-semibold text-sm shadow hover:scale-105 transition cursor-pointer flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Preview
                        </button>

                        {isAccessible ? (
                          <button
                            onClick={() =>
                              handleTemplateSelect(template, index)
                            }
                            className="px-4 py-2 rounded-lg bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-semibold text-sm shadow-lg hover:scale-105 transition-transform cursor-pointer flex items-center gap-2"
                          >
                            <Sparkles className="w-4 h-4" />
                            Use Template
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedLockedTemplate({
                                template,
                                requiredPlan: requiredPlanLabel,
                              });
                              setShowUpgradePopup(true);
                            }}
                            className="px-4 py-2 rounded-lg bg-gray-600 text-white font-semibold text-sm shadow hover:scale-105 transition-transform cursor-pointer flex items-center gap-2"
                          >
                            <Lock className="w-4 h-4" />
                            Unlock with {requiredPlanLabel}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Upgrade CTA Banner */}
            {isUpgradeNeeded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 bg-linear-to-r from-gray-50 to-red-50 rounded-2xl p-6 border border-red-100"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-linear-to-r from-[#5E000B] to-[#C40116] rounded-xl flex items-center justify-center">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Unlock All {totalTemplates} Templates
                      </h3>
                      <p className="text-sm text-gray-600">
                        Upgrade to Premium to access all templates and premium
                        features
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push("/choose-plan")}
                    className="px-6 py-2.5 bg-linear-to-r from-[#5E000B] to-[#C40116] text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 whitespace-nowrap"
                  >
                    View Plans →
                  </button>
                </div>
              </motion.div>
            )}

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
                  const templateIndex = templateData.findIndex(
                    (t) => t.id === previewTemplate.id,
                  );
                  if (isTemplateAccessible(templateIndex)) {
                    clickresumedetails(previewTemplate);
                  } else {
                    const requiredPlan =
                      getRequiredPlanForTemplate(templateIndex);
                    setSelectedLockedTemplate({
                      template: previewTemplate,
                      requiredPlan: PLAN_CONFIG[requiredPlan].label,
                    });
                    setShowPreview(false);
                    setShowUpgradePopup(true);
                  }
                }
              }}
            />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Choose_template;
