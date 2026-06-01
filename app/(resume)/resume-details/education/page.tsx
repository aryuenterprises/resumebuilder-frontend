"use client";
// @ts-ignore
import "primereact/resources/themes/saga-blue/theme.css";
// @ts-ignore
import "primereact/resources/primereact.min.css";
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  FiChevronDown,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiX,
  FiShield,
  FiMenu,
} from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import dynamic from "next/dynamic";
import { Calendar } from "primereact/calendar";

import { CreateContext } from "@/app/context/CreateContext";
import { FaRegLightbulb, FaStar, FaGem } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Education } from "@/app/types/context.types";
import {
  formatGradeToCgpdAndPercentage,
  getLocalStorage,
  setLocalStorage,
} from "@/app/utils";
import { API_URL } from "@/app/config/api";
import {
  IoArrowForward,
  IoClose,
  IoDiamondOutline,
  IoSparkles,
} from "react-icons/io5";
import { Stepper, TipsModal } from "@/app/components/resume";
import api from "@/app/utils/api";

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

const Education_form = () => {
  const UseContext = useContext(CreateContext);
  const contactId = UseContext?.contact.contactId || UseContext?.contact._id;

  const { fullResumeData, setFullResumeData } = UseContext || {};
  // const latestResumeId = localStorage.getItem("latest_resume_id");  

        const latestResumeId = getLocalStorage("latest_resume_id");
  


  const router = useRouter();
  const { education, setEducation } = UseContext || {
    education: [],
    setEducation: () => {},
  };

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Airesponse, setAireseponse] = useState<string[] | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedData, setLastSavedData] = useState<string>("");
  const [showDegreeWarningModal, setShowDegreeWarningModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Drag and drop state
  const [draggedItemId, setDraggedItemId] = useState<string | number | null>(null);
  const [dragOverItemId, setDragOverItemId] = useState<string | number | null>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const addEducation = () => {
    setEducation((prev) => {
      const updated = [
        ...prev,
        {
          id: Date.now(),
          schoolname: "",
          degree: "",
          location: "",
          text: "",
          startDate: "",
          endDate: "",
          isOpen: true,
          showPicker: false,
          year: new Date().getFullYear(),
          error: {},
          isCurrentlyStudying: false,
          grade: "",
        },
      ];
      return updated;
    });
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

    // Reorder the education array
    setEducation((prev) => {
      const draggedIndex = prev.findIndex(edu => edu.id === draggedItemId);
      const targetIndex = prev.findIndex(edu => edu.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const newEducation = [...prev];
      const [draggedItem] = newEducation.splice(draggedIndex, 1);
      newEducation.splice(targetIndex, 0, draggedItem);
      
      return newEducation;
    });
    
    setDraggedItemId(null);
    setDragOverItemId(null);
  };

  const saveToAPI = async (educationData: typeof education) => {
    // if (!contactId) {
    //   console.error("Contact ID is required");
    //   return false;
    // }

    // const currentDataString = JSON.stringify(educationData);
    // if (currentDataString === lastSavedData) {
    //   return true;
    // }

    setIsSaving(true);

    try {
      // const formData = {
      //   education: educationData,
      // };

      // const response = await axios.post(
      //   `${API_URL}/api/education/update`,
      //   formData,
      //   { params: { contactId: contactId } },
      // );


        // 2. Build your exact single JSON payload schema
    const singlePayload = {
        "section_name": "educations",
          "section_payload": educationData
      }
    
    

    // 3. Send it as standard 'application/json'
    const response = await api.patch(`${API_URL}/user-resumes/${latestResumeId}`,singlePayload);

      return true;
    } catch (err: any) {
      console.error("Error saving education:", err);
      toast.error("Failed to save education!");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const fetched = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/education/get-education/${contactId}`,
      );

      const educationList = response.data?.[0]?.education || [];

      if (educationList.length > 0) {
        const formattedData = educationList.map((item: any) => ({
          id: item.id || Date.now(),
          schoolname: item?.schoolname || "",
          degree: item?.degree || "",
          location: item?.location || "",
          startDate: item?.startDate || null,
          endDate: item?.endDate || null,
          text: item?.text || "",
          isOpen: true,
          touched: {},
          showPicker: false,
          year: item.startDate
            ? new Date(item.startDate).getFullYear()
            : new Date().getFullYear(),
          error: {},
          isCurrentlyStudying: item?.isCurrentlyStudying || false,
          grade: item?.grade || "",
        }));

        setEducation(formattedData);
        setLastSavedData(JSON.stringify(formattedData));
      } else {
        console.log("No education data found for user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleForm = (id: string | number) => {
    setEducation((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, isOpen: !exp.isOpen } : exp,
      ),
    );
  };

  const handleChange = (
    id: string | number,
    field: keyof Education,
    value: string | number | null | boolean,
  ) => {
    setEducation((prev) => {
      const updated = prev.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      );
      return updated;
    });
  };

  const deleteEducation = (id: string | number) => {
    setEducation((prev) => {
      const updated = prev.filter((exp) => exp.id !== id);
      return updated;
    });
  };

  const [clickedIndexoFGenerateWithAIBtn, setClickedIndexoFGenerateWithAIBtn] =
    useState<number | null>(null);

  const handleSubmitAi = async (index: number) => {
    const edu = education[index];

    if (!edu.degree || edu.degree.trim() === "") {
      if (isMobile) {
        setShowDegreeWarningModal(true);
        setClickedIndexoFGenerateWithAIBtn(index);
      }
      return;
    }

    setClickedIndexoFGenerateWithAIBtn(index);
    setLoading(true);
    setAireseponse(null);

    try {
      const formData = {
        degree: edu.degree,
        college: edu.schoolname,
        location: edu.location,
        year: edu.endDate,
      };

      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/resume/education`,
        formData,
      );

      const bullets = response.data.education_bullets
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

    // 1. Calculate the new state outside of the setter
    const updatedEducation = education.map((edu, i) => {
      if (i === clickedIndexoFGenerateWithAIBtn) {
        return {
          ...edu,
          text: (edu.text || "") + "\n" + item,
        };
      }
      return edu;
    });
    setEducation(updatedEducation);
    if (Airesponse) {
      const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
      setAireseponse(newAiResponse.length > 0 ? newAiResponse : null);
    }
  };

  const [educationTipsClicked, setEducationTipsClicked] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50/40">
      <Stepper />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto px-2 py-6 sm:py-8 lg:py-10">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Education
            </h1>

            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Showcase your academic background and qualifications
            </p>

            <button
              onClick={() => setEducationTipsClicked((prev) => !prev)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <FaRegLightbulb className="w-3 h-3" />
              <span>Education Tips</span>
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
                      Academic Background
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Tell employers about your education
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
              <div className="space-y-4 sm:space-y-5">
                {education?.map((exp: Education, index: number) => (
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
                        <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0 text-gray-400 group-hover:text-indigo-400 transition-colors cursor-move">
                          <FiMenu className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-0.5 sm:mb-1 truncate group-hover:text-indigo-600 transition-colors">
                            {exp.schoolname || "School Name"}
                          </h3>
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] xs:text-xs text-gray-500">
                            <span className="truncate max-w-30 sm:max-w-none">
                              {exp.degree || "Degree"}
                            </span>
                            <span className="text-gray-300 hidden xs:inline">
                              •
                            </span>
                            <span className="whitespace-nowrap">
                              {exp.startDate ? exp.startDate : "YYYY"} -{" "}
                              {exp.isCurrentlyStudying ? (
                                <span className="text-emerald-600 font-medium">
                                  Present
                                </span>
                              ) : exp.endDate ? (
                                exp.endDate
                              ) : (
                                "YYYY"
                              )}
                            </span>
                            {exp.grade && (
                              <>
                                <span className="text-gray-300 hidden xs:inline">
                                  •
                                </span>
                                <span className="text-indigo-600 font-medium">
                                  {formatGradeToCgpdAndPercentage(exp.grade)}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 ml-2">
                        <motion.div
                          animate={{ rotate: exp.isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-1.5 sm:p-2 rounded-lg text-gray-400 group-hover:text-indigo-600 cursor-pointer"
                        >
                          <FiChevronDown size={14} className="sm:w-5 sm:h-5" />
                        </motion.div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteEducation(exp.id);
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
                          ? "max-h-250 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="p-4 sm:p-5 space-y-4 sm:space-y-5 border-t border-gray-100">
                        {/* School Name & Location */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                              School Name
                            </label>
                            <input
                              type="text"
                              value={exp.schoolname || ""}
                              onChange={(e) =>
                                handleChange(
                                  exp.id,
                                  "schoolname",
                                  e.target.value,
                                )
                              }
                              placeholder="University Name"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                            />
                          </div>

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
                              placeholder="City, State"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                            />
                          </div>
                        </div>

                        {/* Degree & Dates */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                              Degree
                            </label>
                            <input
                              type="text"
                              value={exp.degree || ""}
                              onChange={(e) =>
                                handleChange(exp.id, "degree", e.target.value)
                              }
                              placeholder="B.Sc in Computer Science"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                              CGPA / Percentage{" "}
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              max="100"
                              value={exp.grade || ""}
                              onChange={(e) => {
                                let value = e.target.value;
                                if (parseFloat(value) > 100) value = "100";
                                if (parseFloat(value) < 0) value = "0";
                                handleChange(exp.id, "grade", value);
                              }}
                              placeholder="Enter CGPA or Percentage"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                            />
                          </div>
                        </div>

                        {/* CGPA/Percentage Field */}

                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                              Start Year
                            </label>
                            <Calendar
                              value={
                                exp.startDate
                                  ? new Date(parseInt(exp.startDate), 0, 1)
                                  : null
                              }
                              onChange={(e) => {
                                const selectedValue =
                                  e.value instanceof Date
                                    ? e.value.getFullYear().toString()
                                    : "";
                                handleChange(
                                  exp.id,
                                  "startDate",
                                  selectedValue,
                                );
                              }}
                              view="year"
                              dateFormat="yy"
                              className="w-full [&_.p-inputtext]:w-full [&_.p-inputtext]:px-3 [&_.p-inputtext]:py-2.5 [&_.p-inputtext]:bg-white [&_.p-inputtext]:border-2 [&_.p-inputtext]:border-gray-200 [&_.p-inputtext]:rounded-lg [&_.p-inputtext]:text-gray-900 [&_.p-inputtext]:text-sm [&_.p-inputtext]:focus:border-indigo-500 [&_.p-inputtext]:focus:ring-2 [&_.p-inputtext]:focus:ring-indigo-100 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                              placeholder="YYYY"
                              showIcon
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">
                              End Year
                            </label>
                            <Calendar
                              value={
                                exp.endDate && !exp.isCurrentlyStudying
                                  ? new Date(parseInt(exp.endDate), 0, 1)
                                  : null
                              }
                              onChange={(e) => {
                                const value =
                                  e.value instanceof Date
                                    ? e.value.getFullYear().toString()
                                    : "";
                                handleChange(exp.id, "endDate", value);
                              }}
                              view="year"
                              dateFormat="yy"
                              disabled={exp.isCurrentlyStudying}
                              className={` w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all [&_.p-inputtext]:w-full [&_.p-inputtext]:px-3 [&_.p-inputtext]:py-2.5 [&_.p-inputtext]:border-2 [&_.p-inputtext]:rounded-lg [&_.p-inputtext]:text-sm ${
                                exp.isCurrentlyStudying
                                  ? "[&_.p-inputtext]:bg-gray-50 [&_.p-inputtext]:text-gray-400 [&_.p-inputtext]:border-gray-200 cursor-not-allowed"
                                  : "[&_.p-inputtext]:bg-white [&_.p-inputtext]:border-gray-200 [&_.p-inputtext]:text-gray-900 [&_.p-inputtext]:focus:border-indigo-500 [&_.p-inputtext]:focus:ring-2 [&_.p-inputtext]:focus:ring-indigo-100"
                              }`}
                              placeholder={
                                exp.isCurrentlyStudying ? "Present" : "YYYY"
                              }
                              showIcon
                            />
                          </div>
                        </div>

                        {/* Currently Studying Checkbox */}
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`currently-studying-${exp.id}`}
                            checked={exp.isCurrentlyStudying || false}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              handleChange(
                                exp.id,
                                "isCurrentlyStudying",
                                isChecked,
                              );
                              if (isChecked) {
                                handleChange(exp.id, "endDate", "");
                              }
                            }}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                          />
                          <label
                            htmlFor={`currently-studying-${exp.id}`}
                            className="text-sm text-gray-700 cursor-pointer hover:text-indigo-600 transition-colors"
                          >
                            I am currently studying here
                          </label>
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
                                className={`inline-flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                                  !exp.degree || exp.degree.trim() === ""
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-linear-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-md"
                                }`}
                                type="button"
                              >
                                <svg
                                  className={`w-3 h-3 transition-all duration-300 ${loading ? "animate-spin" : ""}`}
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
                                {loading ? "Generating..." : "Generate With AI"}
                              </button>

                              {/* Tooltip - Desktop only */}
                              {(!exp.degree || exp.degree.trim() === "") &&
                                !loading &&
                                !isMobile && (
                                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-full bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-100 shadow-lg whitespace-normal">
                                    <div className="relative text-center">
                                      <span className="inline-block mr-1">
                                        ⚠️
                                      </span>
                                      Enter degree to use AI Assist
                                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-2 h-2 bg-gray-900 rotate-45"></div>
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

                {/* Add Education Button */}
                <button
                  onClick={addEducation}
                  className="w-full py-3 sm:py-3.5 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-all duration-300 group cursor-pointer"
                  type="button"
                >
                  <div className="flex items-center justify-center gap-2">
                    <IoMdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm font-semibold">
                      Add Education
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Buttons */}

      <div className="sticky bottom-0 z-20 bg-white/75 backdrop-blur-md border-t border-gray-100 shadow-lg shadow-gray-200/50">
        <div className="mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-3 sm:gap-4">
            {/* Back Button - Icon only on mobile, full text on desktop */}
            <button
              className="group px-4 sm:px-5 py-2.5 sm:py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl hover:bg-indigo-50/50 cursor-pointer"
              onClick={() => router.push("/resume-details/experience")}
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
              <span className="hidden sm:inline">Back to Experience</span>
              {/* Optional: Show just "Back" on medium screens */}
              <span className="inline sm:hidden">Back</span>
            </button>

            {/* Continue Button - Premium Design */}
            <button
              className="group relative px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium md:font-semibold text-white rounded-lg md:rounded-xl shadow-lg transition-all duration-300 overflow-hidden whitespace-nowrap cursor-pointer"
              onClick={() => {
                saveToAPI(education).then(() => {
                  router.push("/resume-details/skills");
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
                <span>Continue to Skills</span>
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

      <TipsModal
        isOpen={educationTipsClicked}
        onClose={() => setEducationTipsClicked(false)}
        title="Education Tips"
        subtitle="Showcase your academic background"
        hasAI={true}
        aiFeatureDescription="get intelligent bullet points for your coursework and achievements."
        proTip="Put your highest degree first — recruiters scan top to bottom"
        bestPractices={[
          {
            tip: "Put your highest degree first",
            example: "MBA at top, then Bachelor's",
          },
          {
            tip: "Include relevant coursework",
            example: "Data Structures, Algorithms",
          },
          { tip: "Add CGPA (8.0+) or Percentage", example: "CGPA: 8.5/10" },
        ]}
        avoidList={[
          "Listing incomplete degrees",
          "Adding unnecessary high school details",
        ]}
      />

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

      {/* Degree Warning Modal for Mobile */}
      {showDegreeWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 backdrop-blur-md bg-black/50"
            onClick={() => setShowDegreeWarningModal(false)}
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
                  Degree Required
                </h3>
              </div>
            </div>

            <div className="p-5">
              <p className="text-sm text-gray-700 mb-4">
                Please enter your degree first to use the AI Assist feature.
                This helps generate relevant content for your education.
              </p>
              <button
                onClick={() => setShowDegreeWarningModal(false)}
                className="w-full px-4 py-2.5 bg-linear-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Education_form;