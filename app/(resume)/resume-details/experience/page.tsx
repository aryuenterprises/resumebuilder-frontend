






"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import {
  formatMonthYear,
  MonthYearDisplay,
  removeSessionStorage,
  setSessionStorage,
} from "@/app/utils";

import { IoMdAdd } from "react-icons/io";
import {
  FiCheckCircle,
  FiChevronDown,
  FiShield,
  FiTrash2,
  FiX,
  FiXCircle,
  FiMenu,
} from "react-icons/fi";
import { FaRegLightbulb, FaGem, FaStar, FaChartLine } from "react-icons/fa";
import { BsArrowLeftCircleFill } from "react-icons/bs";

import { CreateContext } from "@/app/context/CreateContext";
import { useRouter } from "next/navigation";
import { Experience } from "@/app/types";
import { API_URL } from "@/app/config/api";
import {
  IoArrowForward,
  IoClose,
  IoDiamondOutline,
  IoSparkles,
} from "react-icons/io5";
import { Stepper, TipsModal } from "@/app/components/resume";

// Dynamically import Editor to avoid SSR issues
const Editor = dynamic(
  () => import("primereact/editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl mt-3 md:mt-4 bg-gray-50 h-32 flex items-center justify-center border border-gray-200">
        <div className="animate-pulse text-gray-400 text-sm">
          Loading editor...
        </div>
      </div>
    ),
  },
);

const ExperienceForm = () => {
  const router = useRouter();
  const UseContext = useContext(CreateContext);
  const contactId = UseContext?.contact.contactId || UseContext?.contact._id;

  const [isExperienced, setIsExperienced] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  removeSessionStorage("oldRouteNameDashboard");

  const { experiences, setExperiences, fullResumeData, setFullResumeData } =
    UseContext;

  // Drag and drop state
  const [draggedItemId, setDraggedItemId] = useState<string | number | null>(null);
  const [dragOverItemId, setDragOverItemId] = useState<string | number | null>(null);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now(),
        jobTitle: "",
        employer: "",
        location: "",
        startDate: "",
        endDate: "",
        text: "",
        isOpen: true,
        showPicker: false,
        year: new Date().getFullYear(),
        isCurrentlyWorking: false,
      },
    ]);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, id: string | number) => {
    setDraggedItemId(id);
    e.dataTransfer.effectAllowed = "move";
    // Add a class to the dragged element
    (e.target as HTMLElement).classList.add("opacity-50");
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedItemId(null);
    setDragOverItemId(null);
    // Remove the opacity class
    (e.target as HTMLElement).classList.remove("opacity-50");
  };

  const handleDragOver = (e: React.DragEvent, id: string | number) => {
    e.preventDefault();
    if (draggedItemId === null) return;
    if (draggedItemId !== id) {
      setDragOverItemId(id);
    }
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragLeave = (e: React.DragEvent) => {
    setDragOverItemId(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string | number) => {
    e.preventDefault();
    
    if (draggedItemId === null) return;
    if (draggedItemId === targetId) return;

    // Reorder the experiences array
    setExperiences((prev) => {
      const draggedIndex = prev.findIndex(exp => exp.id === draggedItemId);
      const targetIndex = prev.findIndex(exp => exp.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const newExperiences = [...prev];
      const [draggedItem] = newExperiences.splice(draggedIndex, 1);
      newExperiences.splice(targetIndex, 0, draggedItem);
      
      return newExperiences;
    });
    
    setDraggedItemId(null);
    setDragOverItemId(null);
  };

  const fetchExp = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/experience/get-experience/${contactId}`,
      );

      const experienceList = response.data?.[0]?.experiences || [];

      if (experienceList.length > 0) {
        const formattedData = experienceList.map((item: any) => ({
          id: item.id || Date.now(),
          jobTitle: item?.jobTitle || "",
          employer: item?.employer || "",
          location: item?.location || "",
          startDate: item?.startDate ? item?.startDate.slice(0, 7) : "",
          endDate: item?.endDate ? item?.endDate.split("T")[0] : "",
          text: item?.text || "",
          isOpen: true,
          touched: {},
          showPicker: false,
          year: item.startDate
            ? new Date(item.startDate).getFullYear()
            : new Date().getFullYear(),
          isCurrentlyWorking: item?.isCurrentlyWorking || false,
        }));

        setExperiences(formattedData);
      } else {
        console.error("No experience data found for user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveToAPI = async (experiencesData: typeof experiences) => {
    if (!contactId) {
      console.error("Contact ID is required");
      return false;
    }

    try {
      const formData = {
        experiences: experiencesData,
      };

      const response = await axios.post(
        `${API_URL}/api/experience/update`,
        formData,
        { params: { contactId: contactId } },
      );

      return true;
    } catch (err: any) {
      console.error("Error saving experience:", err);
      toast.error("Failed to save experience!");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const toggleExperienceMode = () => {
    const newValue = !isExperienced;
    setIsExperienced(newValue);
    if (!newValue) {
      setExperiences([]);
    }
  };

  const toggleForm = (id: string | number) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, isOpen: !exp.isOpen } : exp,
      ),
    );
  };

  const handleChange = (
    id: string | number,
    field: keyof Experience,
    value: string | number | boolean,
  ) => {
    setExperiences((prev) => {
      const updated = prev.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      );
      return updated;
    });
  };

  const deleteExperience = (id: string | number) => {
    setExperiences((prev) => {
      const updated = prev.filter((exp) => exp.id !== id);
      return updated;
    });
  };

  const [experienceTipsButtonClicked, setExperienceTipsButtonClicked] =
    useState(false);
  const [Airesponse, setAireseponse] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showJobTitleWarningModal, setShowJobTitleWarningModal] =
    useState(false);
  const [clickedIndexoFGenerateWithAIBtn, setClickedIndexoFGenerateWithAIBtn] =
    useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSubmitAi = async (index: number) => {
    const exp = experiences[index];

    // Check if job title is empty
    if (!exp.jobTitle || exp.jobTitle.trim() === "") {
      if (isMobile) {
        setShowJobTitleWarningModal(true);
        setClickedIndexoFGenerateWithAIBtn(index);
      }
      return;
    }

    setClickedIndexoFGenerateWithAIBtn(index);
    setLoading(true);
    setAireseponse(null);

    try {
      const filteredExperiences = experiences.map((exp) => ({
        jobTitle: exp.jobTitle,
        employer: exp.employer,
      }));

      const formData = {
        job_title: filteredExperiences[index]?.jobTitle || "",
        company: filteredExperiences[index]?.employer || "",
      };

      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/resume/experience`,
        formData,
      );

      const bullets = response.data.experience_bullets
        .split("\n")
        .map((item: string) => item.replace("- ", "").trim())
        .filter(Boolean);

      setAireseponse(bullets);
      setShowPopup(true);

      return true;
    } catch (err: any) {
      console.error("Error sending message:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const insertAIResponse = (item: string, index: number) => {
    if (clickedIndexoFGenerateWithAIBtn === null) return;

    setExperiences((prev) => {
      return prev.map((exp, i) => {
        // Only update the object at the specific index
        if (i === clickedIndexoFGenerateWithAIBtn) {
          return {
            ...exp,
            text: (exp.text || "") + "\n" + item,
          };
        }
        return exp; // Return others unchanged
      });
    });

    if (Airesponse) {
      const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
      setAireseponse(newAiResponse.length > 0 ? newAiResponse : null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50/40">
      <Stepper />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto px-2  py-6 sm:py-8 lg:py-10">
          {/* Header Section - Compact */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Work Experience
            </h1>

            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Showcase your professional journey and achievements
            </p>

            <button
              onClick={() => setExperienceTipsButtonClicked((prev) => !prev)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <FaRegLightbulb className="w-3 h-3" />
              <span>Experience Tips</span>
            </button>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="relative px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-linear-to-r from-indigo-50 to-white border-b border-gray-100">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-100 rounded-full filter blur-3xl opacity-50"></div>
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-xl">
                    <IoDiamondOutline className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                      Professional Experience
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Tell employers about your work history
                    </p>
                  </div>
                </div>
                {isSaving && (
                  <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full self-start sm:self-auto">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] sm:text-xs text-indigo-700 font-medium">
                      Saving...
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Experience Toggle */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div
                  onClick={toggleExperienceMode}
                  className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full cursor-pointer transition-all duration-300 ${
                    isExperienced
                      ? "bg-linear-to-r from-indigo-600 to-indigo-500"
                      : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 sm:top-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white shadow-md transition-all duration-300 ${
                      isExperienced ? "left-5 sm:left-7" : "left-0.5 sm:left-1"
                    }`}
                  ></div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span
                    className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                      !isExperienced ? "text-indigo-600" : "text-gray-400"
                    }`}
                  >
                    Fresher
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">/</span>
                  <span
                    className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                      isExperienced ? "text-indigo-600" : "text-gray-400"
                    }`}
                  >
                    Experienced
                  </span>
                </div>
              </div>

              {isExperienced && (
                <div className="space-y-4 sm:space-y-5">
                  {experiences.map((exp, index) => (
                    <div
                      key={exp.id}
                     
                      className={`bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 
                        ${draggedItemId === exp.id ? 'opacity-50' : ''}
                        ${dragOverItemId === exp.id ? 'border-2 border-indigo-400 shadow-lg transform scale-[1.02]' : ''}
                      `}
                    >
                      {/* Header */}
                      <div
                       draggable={true}
                      onDragStart={(e) => handleDragStart(e, exp.id)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => handleDragOver(e, exp.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, exp.id)}
                        onClick={() => toggleForm(exp.id)}
                        className="flex justify-between items-center cursor-pointer p-4 sm:p-5 group hover:bg-gray-50/50 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {/* Drag Handle Icon */}
                          <div onClick={(e)=>e.stopPropagation()} className="flex-shrink-0 text-gray-400 group-hover:text-indigo-400 transition-colors cursor-move">
                            <FiMenu className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-0.5 sm:mb-1 truncate group-hover:text-indigo-600 transition-colors">
                              {exp.jobTitle || "Job Title"}
                            </h3>
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] xs:text-xs text-gray-500">
                              <span className="truncate max-w-25 sm:max-w-none">
                                {exp.employer || "Employer"}
                              </span>
                              <span className="text-gray-300 hidden xs:inline">
                                •
                              </span>
                              <span className="whitespace-nowrap">
                                {/* <MonthYearDisplay */}
                                  {/* // value={exp.startDate} */}
                                  {/* shortYear={true} */}
                                {/* /> */}

                                {formatMonthYear(exp.startDate, false)}
                                {" - "}
                                {exp.isCurrentlyWorking ? (
                                  <span className="text-emerald-600 font-medium">
                                    Present
                                  </span>
                                ) : (
                                  // <MonthYearDisplay
                                  //   value={exp.endDate || ""}
                                  //   shortYear={true}
                                  // />

                                                                  formatMonthYear(exp.endDate, false)

                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 ml-2">
                          <motion.div
                            animate={{ rotate: exp.isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-1.5 sm:p-2 rounded-lg text-gray-400 group-hover:text-indigo-600 cursor-pointer"
                          >
                            <FiChevronDown
                              size={14}
                              className="sm:w-5 sm:h-5"
                            />
                          </motion.div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteExperience(exp.id);
                            }}
                            className="p-1.5 sm:p-2 rounded-lg bg-gray-100 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer"
                            type="button"
                          >
                            <FiTrash2 size={14} className="sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div
                        className={`transition-all duration-500 overflow-hidden ${
                          exp.isOpen
                            ? "max-h-225 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="p-4 sm:p-5 space-y-4 sm:space-y-5 border-t border-gray-100">
                          {/* Job Title & Employer */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                                Job Title
                              </label>
                              <input
                                type="text"
                                value={exp.jobTitle || ""}
                                onChange={(e) =>
                                  handleChange(
                                    exp.id,
                                    "jobTitle",
                                    e.target.value,
                                  )
                                }
                                placeholder="Senior Software Engineer"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                                Company Name
                              </label>
                              <input
                                type="text"
                                value={exp.employer || ""}
                                onChange={(e) =>
                                  handleChange(
                                    exp.id,
                                    "employer",
                                    e.target.value,
                                  )
                                }
                                placeholder="Google, Microsoft, etc."
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                              />
                            </div>
                          </div>

                          {/* Location */}
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                              Location
                            </label>
                            <input
                              type="text"
                              value={exp.location || ""}
                              onChange={(e) =>
                                handleChange(exp.id, "location", e.target.value)
                              }
                              placeholder="City, State or Remote"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                            />
                          </div>

                          {/* Dates with "I currently work here" checkbox */}
                          <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                              <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                                  Start Date
                                </label>
                                <input
                                  type="month"
                                  value={exp.startDate || ""}
                                  onChange={(e) =>
                                    handleChange(
                                      exp.id,
                                      "startDate",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                                  End Date
                                </label>
                                <input
                                  type="month"
                                  value={exp.endDate || ""}
                                  onChange={(e) =>
                                    handleChange(
                                      exp.id,
                                      "endDate",
                                      e.target.value,
                                    )
                                  }
                                  disabled={exp.isCurrentlyWorking}
                                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 rounded-lg sm:rounded-xl text-gray-900 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all ${
                                    exp.isCurrentlyWorking
                                      ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                                      : "border-gray-200"
                                  }`}
                                  placeholder={
                                    exp.isCurrentlyWorking ? "Present" : ""
                                  }
                                />
                              </div>
                            </div>

                            {/* Checkbox */}
                            <div className="mt-3 flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`currently-working-${exp.id}`}
                                checked={exp.isCurrentlyWorking || false}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  handleChange(
                                    exp.id,
                                    "isCurrentlyWorking",
                                    isChecked,
                                  );
                                  if (isChecked) {
                                    handleChange(exp.id, "endDate", "");
                                  }
                                }}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                              />
                              <label
                                htmlFor={`currently-working-${exp.id}`}
                                className="text-sm text-gray-700 cursor-pointer hover:text-indigo-600 transition-colors"
                              >
                                I currently work here
                              </label>
                            </div>
                          </div>

                          {/* Description with AI Button */}
                          <div>
                            <div className="flex justify-between items-center mb-2 sm:mb-3">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Description
                              </label>
                              <div className="relative inline-block group">
                                <button
                                  onClick={() => handleSubmitAi(index)}
                                  disabled={loading}
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                                    !exp.jobTitle || exp.jobTitle.trim() === ""
                                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                      : "bg-linear-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-md"
                                  }`}
                                  type="button"
                                >
                                  <svg
                                    className={`w-3 h-3 transition-all duration-300 ${
                                      loading ? "animate-spin" : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                  </svg>
                                  {loading
                                    ? "Generating..."
                                    : "Generate With AI"}
                                </button>

                                {/* Tooltip - Desktop only */}
                                {(!exp.jobTitle ||
                                  exp.jobTitle.trim() === "") &&
                                  !loading &&
                                  !isMobile && (
                                    <div className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full mt-1 w-full bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 shadow-lg wrap-break-word overflow-auto-">
                                      <div className="relative text-center wrap-break-word">
                                        <span className="inline-block mr-1">
                                          ⚠️
                                        </span>
                                        Enter job title to use AI Assist{" "}
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>

                            <Editor
                              className="rounded-lg bg-white border border-gray-200 overflow-hidden"
                              value={exp.text || ""}
                              headerTemplate={
                                <div className="flex gap-1 p-2 flex-wrap items-center bg-gray-50 border-b border-gray-200">
                                  <button
                                    type="button"
                                    className="ql-bold p-1.5 hover:bg-gray-200 rounded transition"
                                  >
                                    B
                                  </button>
                                  <button
                                    type="button"
                                    className="ql-italic p-1.5 hover:bg-gray-200 rounded transition"
                                  >
                                    I
                                  </button>
                                  <button
                                    type="button"
                                    className="ql-underline p-1.5 hover:bg-gray-200 rounded transition"
                                  >
                                    U
                                  </button>
                                  <button
                                    type="button"
                                    className="ql-list p-1.5 hover:bg-gray-200 rounded transition"
                                    value="ordered"
                                  >
                                    1.
                                  </button>
                                  <button
                                    type="button"
                                    className="ql-list p-1.5 hover:bg-gray-200 rounded transition"
                                    value="bullet"
                                  >
                                    •
                                  </button>
                                  <button
                                    type="button"
                                    className="ql-clean p-1.5 hover:bg-gray-200 rounded transition"
                                  >
                                    ⌫
                                  </button>
                                </div>
                              }
                              onTextChange={(e: any) => {
                                handleChange(exp.id, "text", e.htmlValue);
                              }}
                              style={{
                                height: "140px",
                                minHeight: "140px",
                                background: "white",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Experience Button */}
                  <button
                    onClick={addExperience}
                    className="w-full py-3 sm:py-3.5 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-all duration-300 group cursor-pointer"
                    type="button"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <IoMdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm font-semibold">
                        Add Work Experience
                      </span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Buttons */}

      <div className="sticky bottom-0 z-20 bg-white/75 backdrop-blur-md border-t border-gray-100 shadow-lg shadow-gray-200/50">
        <div className=" mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-3 sm:gap-4">
            {/* Back Button - Icon only on mobile, full text on desktop */}
            <button
              className="group px-4 sm:px-5 py-2.5 sm:py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl hover:bg-indigo-50/50 cursor-pointer"
              onClick={() => router.push("/resume-details/contact")}
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              {/* Hide text on mobile, show on sm and up */}
              <span className="hidden sm:inline">Back to Contact</span>
              {/* Optional: Show just "Back" on medium screens */}
              <span className="inline sm:hidden">Back</span>
            </button>

            {/* Continue Button - Premium Design */}
            <button
              className="group relative px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium md:font-semibold text-white rounded-lg md:rounded-xl shadow-lg transition-all duration-300 overflow-hidden whitespace-nowrap cursor-pointer"
              onClick={() => {
                saveToAPI(experiences).then(() => {
                  router.push("/resume-details/education");
                });
              }}
            >
              {/* Gradient Background with Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:from-indigo-500 group-hover:via-indigo-400 group-hover:to-indigo-500"></div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
              </div>

              {/* Button Content */}
              <div className="relative flex items-center justify-center gap-2">
                {/* Different text for mobile vs desktop */}
                <span>Continue to Education</span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>

              {/* Shadow Enhancement */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(79,70,229,0.5)]"></div>
            </button>
          </div>
        </div>
      </div>

      {/* AI Response Popup */}
      {showPopup && Airesponse && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
          >
            <div className="bg-linear-to-r from-indigo-600 to-indigo-500 px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    AI Suggestions
                  </h2>
                  <p className="text-indigo-100 text-xs">
                    Click on any suggestion to add it
                  </p>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <IoClose className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3">
              {Airesponse?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => insertAIResponse(item, index)}
                  className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer group transition-all duration-200"
                >
                  <div className="p-1.5 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-all shrink-0">
                    <BsArrowLeftCircleFill className="w-4 h-4 text-indigo-600" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed flex-1">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Job Title Warning Modal for Mobile */}
      {showJobTitleWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 backdrop-blur-md bg-black/50"
            onClick={() => setShowJobTitleWarningModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-linear-to-r from-amber-500 to-orange-500 px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Job Title Required
                </h3>
              </div>
            </div>

            <div className="p-5">
              <p className="text-sm text-gray-700 mb-4">
                Please enter a job title first to use the AI Assist feature.
                This helps generate relevant content for your experience.
              </p>
              <button
                onClick={() => setShowJobTitleWarningModal(false)}
                className="w-full px-4 py-2.5 bg-linear-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <TipsModal
        isOpen={experienceTipsButtonClicked}
        onClose={() => setExperienceTipsButtonClicked(false)}
        title="Experience Tips"
        subtitle="Make your work history stand out"
        hasAI={true}
        aiFeatureDescription="get intelligent bullet points based on your job title."
        proTip="Use bullet points and action verbs to highlight achievements"
        bestPractices={[
          {
            tip: "Use bullet points for achievements",
            example: "• Led team of 5 developers",
          },
          {
            tip: "Start with strong action verbs",
            example: "Developed, Managed, Created",
          },
          {
            tip: "Quantify your accomplishments",
            example: "Increased sales by 40%",
          },
          {
            tip: "Focus on results, not just duties",
            example: "Improved efficiency by 25%",
          },
        ]}
        avoidList={[
          "Using generic descriptions",
          "Writing long paragraphs",
          "Listing duties without results",
        ]}
        examples={{
          before: "Responsible for managing team",
          after:
            "Led a team of 8 developers, delivering projects 30% ahead of schedule",
        }}
      />
    </div>
  );
};

export default ExperienceForm;
