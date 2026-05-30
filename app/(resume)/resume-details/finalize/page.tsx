"use client";
import React, { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { CreateContext } from "@/app/context/CreateContext";
import axios from "axios";
import { toast } from "react-toastify";

import {
  FaPlus,
  FaChevronDown,
  FaTrash,
  FaRegLightbulb,
  FaLink,
  FaChartLine,
  FaShieldAlt,
  FaRocket,
  FaPencilAlt,
} from "react-icons/fa";
import { BsFileEarmarkText, BsStars } from "react-icons/bs";
import { FiShield, FiTrendingUp, FiCheckCircle, FiMenu } from "react-icons/fi";
import { useRouter } from "next/navigation";
import {
  Finalize as FinalizeType,
  Template,
} from "@/app/types/context.types";
import { getLocalStorage } from "@/app/utils";
import { API_URL } from "@/app/config/api";
import { IoArrowForward, IoSparkles } from "react-icons/io5";
import { Stepper, TipsModal } from "@/app/components/resume";
import api from "@/app/utils/api";

// Dynamically import Editor to avoid SSR issues
const Editor = dynamic(
  () => import("primereact/editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="bg-gray-50 rounded-xl border border-gray-200 h-28 sm:h-32 flex items-center justify-center">
        <div className="animate-pulse text-gray-400 text-xs sm:text-sm">
          Loading editor...
        </div>
      </div>
    ),
  },
);

const FinalizeForm = () => {
  const context = useContext(CreateContext);
  const router = useRouter();

  const {
    contact,
    summary = "",
    skills = {},
    experiences = [],
    education = [],
    finalize = {},
    setFinalize = () => {},
  } = context || {};

  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedData, setLastSavedData] = useState<string>("");
  const [showGrade, setShowGrade] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [showAtsModal, setShowAtsModal] = useState(false);
  const [atsScore, setAtsScore] = useState(0);
  const [atsVerdict, setAtsVerdict] = useState("");
  const [progress, setProgress] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const latestResumeId = localStorage.getItem("latest_resume_id");


  // Drag and drop state
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverItemId, setDragOverItemId] = useState<string | null>(null);

  // const contactId = context?.contact?.contactId;

  const contactId = contact.contactId || contact._id;

  const chosenTemplate = getLocalStorage<Template>("chosenTemplate");

  // Helper functions
  const stripHtml = (html: string) => {
    return html?.replace(/<\/?[^>]+(>|$)/g, "") || "";
  };

  const getPlainTextFromHtml = (html: string) => {
    return html
      ?.replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/•/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .split(".")
      .map((s) => s.trim())
      .filter(Boolean) || [];
  };

  const getFilteredSkills = () => {
    // Get the text content from skills object
    const skillsText = skills?.text || '';
    
    if (!skillsText || !skillsText.trim()) return [];
    
    // Remove all HTML tags
    const plainText = skillsText.replace(/<[^>]*>/g, '');
    
    // Split by new lines or bullet points and clean up
    const skillsArray = plainText
      .split(/[\n•]/) // Split by new lines or bullet points
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
    
    return skillsArray;
  };

  const getFilteredExperiences = () => {
    return experiences.map((item) => ({
      title: item?.jobTitle || "",
      company: item?.employer || "",
      bullets: getPlainTextFromHtml(item?.text || ""),
    }));
  };

  const getFilteredEducation = () => {
    return education.map((item) => ({
      degree: item?.degree || "",
      description: getPlainTextFromHtml(item?.text || ""),
    }));
  };

  // Save to API - Only save customSection since other sections are removed
  const saveToAPI = async (finalizeData: FinalizeType) => {
    // if (!contactId) {
    //   console.error("Contact ID is required");
    //   return false;
    // }

    const currentDataString = JSON.stringify({ customSection: finalizeData.customSection });
    // if (currentDataString === lastSavedData) return true;

    setIsSaving(true);

    try {
      const cleanedData = {
        customSection: finalizeData.customSection?.filter(
          (item) => item?.name?.trim() !== ""
        ) || [],
      };

      // await axios.post(
      //   `${API_URL}/api/finalize-resume/update`,
      //   { skillsData: cleanedData, templateId: chosenTemplate?.id },
      //   { params: { contactId } }
      // );


         const singlePayload = {
        "section_name": "finalize",
          "section_payload": cleanedData
      }
    
    

    // 3. Send it as standard 'application/json'
    const response = await api.patch(`${API_URL}/user-resumes/${latestResumeId}`,singlePayload);


      setLastSavedData(currentDataString);
      toast.success("Changes saved successfully!");
      return true;
    } catch (err) {
      console.error("Error saving data:", err);
      toast.error("Failed to save information!");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
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

  const handleDragOver = (e: React.DragEvent, id: string) => {
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

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (draggedItemId === null) return;
    if (draggedItemId === targetId) return;

    // Reorder the custom sections array
    setFinalize((prev: FinalizeType) => {
      const customSections = prev.customSection || [];
      const draggedIndex = customSections.findIndex(section => section.id === draggedItemId);
      const targetIndex = customSections.findIndex(section => section.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const newSections = [...customSections];
      const [draggedItem] = newSections.splice(draggedIndex, 1);
      newSections.splice(targetIndex, 0, draggedItem);
      
      return {
        ...prev,
        customSection: newSections,
      };
    });
    
    setDraggedItemId(null);
    setDragOverItemId(null);
  };

  // Custom section handlers
  const addCustomSection = () => {
    const newId = Date.now().toString();
    const newSection = { id: newId, name: "", description: "" };
    setFinalize((prev: FinalizeType) => ({
      ...prev,
      customSection: [...(prev.customSection || []), newSection],
    }));
    // Auto-expand the new section
    setExpandedSections((prev) => ({ ...prev, [newId]: true }));
  };

  const deleteCustomSection = (sectionId: string) => {
    setFinalize((prev: FinalizeType) => ({
      ...prev,
      customSection: (prev.customSection || []).filter((s) => s.id !== sectionId),
    }));
    // Remove from expanded state
    setExpandedSections((prev) => {
      const newState = { ...prev };
      delete newState[sectionId];
      return newState;
    });
  };

  const updateCustomSection = (sectionId: string, value: string, field: "name" | "description") => {
    setFinalize((prev: FinalizeType) => ({
      ...prev,
      customSection: (prev.customSection || []).map((s) =>
        s.id === sectionId ? { ...s, [field]: value } : s
      ),
    }));
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const canAddMore = () => {
    const sections = finalize.customSection || [];
    if (sections.length === 0) return true;
    const lastSection = sections[sections.length - 1];
    return lastSection.name?.trim() !== "";
  };

  // ATS Score Check
  const checkAtsScore = async () => {
    setLoading(true);

    const formData = {
      resume_data: {
        name: `${contact?.firstName || ""} ${contact?.lastName || ""}`.trim(),
        email: contact?.email || "",
        phone: contact?.phone || "",
        summary: stripHtml(summary),
        skills: getFilteredSkills(),
        experience: getFilteredExperiences(),
        education: getFilteredEducation(),
      },
    };

    try {
      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/ats/scan`,
        formData
      );

      setAtsScore(response.data.ats_score);
      setAtsVerdict(response?.data?.summary?.ats_verdict);
      setProgress(0);
      setShowGrade(false);
      setLoading(false);
      setShowAtsModal(true);
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showAtsModal) {
      setShowGrade(false);
      return;
    }

    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      if (current >= atsScore) {
        clearInterval(timer);
        setTimeout(() => setShowGrade(true), 100);
        setProgress(atsScore);
      } else {
        setProgress(current);
      }
    }, 15);

    return () => clearInterval(timer);
  }, [atsScore, showAtsModal]);

  const getAtsGrade = (score: number) => {
    if (score < 50) return "Needs Improvement";
    if (score < 70) return "Average";
    if (score < 85) return "Good";
    return "Excellent";
  };

  const getAtsGradeColor = (score: number) => {
    if (score >= 85) return "#10b981";
    if (score >= 70) return "#3b82f6";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const getAtsVerdictText = (score: number) => {
    if (score >= 85) return "Excellent! Your resume is highly optimized for ATS systems.";
    if (score >= 70) return "Good! Your resume passes ATS screening with minor refinements.";
    if (score >= 50) return "Average. Consider adding more relevant keywords.";
    return "Needs improvement. Consider significant revisions for ATS success.";
  };

  // Editor toolbar
  const editorToolbar = (
    <div className="flex gap-0.5 sm:gap-1 p-1.5 sm:p-2 flex-wrap items-center bg-gray-50 border-b border-gray-200">
      <button type="button" className="ql-bold p-1 sm:p-1.5 hover:bg-gray-200 rounded transition" title="Bold">
        <strong>B</strong>
      </button>
      <button type="button" className="ql-italic p-1 sm:p-1.5 hover:bg-gray-200 rounded transition" title="Italic">
        <em>I</em>
      </button>
      <button type="button" className="ql-underline p-1 sm:p-1.5 hover:bg-gray-200 rounded transition" title="Underline">
        <u>U</u>
      </button>
      <button type="button" className="ql-list p-1 sm:p-1.5 hover:bg-gray-200 rounded transition" value="ordered" title="Numbered List">
        1.
      </button>
      <button type="button" className="ql-list p-1 sm:p-1.5 hover:bg-gray-200 rounded transition" value="bullet" title="Bullet List">
        •
      </button>
      <button type="button" className="ql-link p-1 sm:p-1.5 hover:bg-gray-200 rounded transition" title="Insert Link">
        <FaLink className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
      <button type="button" className="ql-clean p-1 sm:p-1.5 hover:bg-gray-200 rounded transition" title="Clear Formatting">
        ⌫
      </button>
    </div>
  );

  const customSections = finalize.customSection || [];

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50/40">
      <Stepper />

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-2 py-6 sm:py-8 lg:py-10">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full text-indigo-700 text-[10px] sm:text-xs font-semibold mb-3">
              <IoSparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>FINAL STEP</span>
              <IoSparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 px-4">
              Additional Information
            </h1>

            <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto px-4">
              Add custom sections to make your resume stand out
            </p>

            <button
              onClick={() => setShowTips(true)}
              className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 bg-linear-to-r from-amber-400 to-orange-400 text-white rounded-full text-[10px] sm:text-xs font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <FaRegLightbulb className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Section Tips</span>
            </button>
          </div>

          {/* ATS Score Checker */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-linear-to-br from-indigo-50 via-purple-50 to-indigo-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-indigo-200 shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-indigo-600 rounded-lg sm:rounded-xl shadow-lg">
                    <FaChartLine className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 flex flex-wrap items-center gap-2">
                      ATS Score Checker
                      <span className="text-[10px] sm:text-xs bg-indigo-100 text-indigo-700 px-1.5 sm:px-2 py-0.5 rounded-full">AI-Powered</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      Analyze your resume with ATS systems and get instant feedback
                    </p>
                   
                  </div>
                </div>

                <button
                  onClick={checkAtsScore}
                  disabled={loading}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all flex items-center cursor-pointer justify-center gap-2 disabled:opacity-70 text-sm sm:text-base shrink-0"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <BsStars className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Check ATS Score</span>
                      <IoArrowForward className="w-3 h-3 sm:w-4 sm:h-4 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Custom Sections */}
          <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 bg-linear-to-r from-indigo-50 to-white border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg">
                    <BsFileEarmarkText className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-semibold text-gray-900">Custom Sections</h2>
                    <p className="text-xs text-gray-500">Add sections like Volunteer Work, Publications, etc.</p>
                  </div>
                </div>
                {isSaving && (
                  <div className="flex items-center gap-2 px-2 sm:px-3 py-1 bg-indigo-100 rounded-full self-start sm:self-auto">
                    <div className="w-1.5 h-1.5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] text-indigo-700 font-medium">Saving...</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              {customSections.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <BsFileEarmarkText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm mb-4">No custom sections added yet</p>
                  <button
                    onClick={addCustomSection}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition-all text-sm"
                  >
                    <FaPlus className="w-4 h-4" />
                    Add Your First Section
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {customSections.map((section) => (
                    <div
                      key={section.id}
                   
                      className={`bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all 
                        ${draggedItemId === section.id ? 'opacity-50' : ''}
                        ${dragOverItemId === section.id ? 'border-2 border-indigo-400 shadow-lg transform scale-[1.02]' : ''}
                      `}
                    >
                      {/* Accordion Header - Shows Section Name */}
                      <div

                        className="flex justify-between items-center cursor-pointer p-4 hover:bg-gray-50 transition-colors cursor-move"
                        onClick={() => toggleSection(section.id!)}
                           draggable={true}
                      onDragStart={(e) => handleDragStart(e, section.id!)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => handleDragOver(e, section.id!)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, section.id!)}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {/* Drag Handle Icon */}
                          <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0 text-gray-400 group-hover:text-indigo-400 transition-colors cursor-move">
                            <FiMenu className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                       
                          
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-800 truncate">
                              {section.name?.trim() ? (
                                <span>{section.name}</span>
                              ) : (
                                <span className="text-gray-400 italic">Untitled Section</span>
                              )}
                            </div>
                          
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteCustomSection(section.id!);
                            }}
                            className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                            title="Delete section"
                          >
                            <FaTrash className="w-3.5 h-3.5" />
                          </button>
                          <motion.div
                            animate={{ rotate: expandedSections[section.id!] ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-400"
                          >
                            <FaChevronDown className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Accordion Content */}
                      <div className={`transition-all duration-300 overflow-hidden ${expandedSections[section.id!] ? "max-h-[600px]" : "max-h-0"}`}>
                        <div className="p-4 space-y-4 border-t border-gray-100 bg-gray-50/30">
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                              Section Name
                            </label>
                            <input
                              type="text"
                              value={section.name || ""}
                              onChange={(e) => updateCustomSection(section.id!, e.target.value, "name")}
                              placeholder="e.g., Volunteer Work, Publications, Certifications"
                              className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                              Description
                            </label>
                            <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
                              <Editor
                                value={section.description || ""}
                                headerTemplate={editorToolbar}
                                onTextChange={(e: any) => updateCustomSection(section.id!, e.htmlValue, "description")}
                                style={{ height: "250px", background: "white" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {canAddMore() && (
                    <button
                      onClick={addCustomSection}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition-all text-sm mt-4"
                    >
                      <FaPlus className="w-4 h-4" />
                      Add Another Section
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="sticky bottom-0 z-20 bg-white/75 backdrop-blur-md border-t border-gray-100 shadow-lg shadow-gray-200/50">
        <div className="mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-3 sm:gap-4">
            {/* Back Button - Icon only on mobile, full text on desktop */}
            <button
              className="group px-4 sm:px-5 py-2.5 sm:py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl hover:bg-indigo-50/50 cursor-pointer"
              onClick={() => router.push("/resume-details/summary")}
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
              <span className="hidden sm:inline">Back to Summary</span>
              {/* Optional: Show just "Back" on medium screens */}
              <span className="inline sm:hidden">Back</span>
            </button>

            {/* Continue Button - Premium Design */}
            <button
              className="group relative px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium md:font-semibold text-white rounded-lg md:rounded-xl shadow-lg transition-all duration-300 overflow-hidden whitespace-nowrap cursor-pointer"
              onClick={() => saveToAPI(finalize).then(() => router.push("/download-resume"))}
            >
              {/* Gradient Background with Animation */}
              <div className="absolute inset-0 bg-linear-to-r from-indigo-600 via-indigo-500 to-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:from-indigo-500 group-hover:via-indigo-400 group-hover:to-indigo-500"></div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
              </div>

              {/* Button Content */}
              <div className="relative flex items-center justify-center gap-2">
                {/* Different text for mobile vs desktop */}
                <span>Download Resume</span>
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

      {/* Tips Modal */}
      <TipsModal
        isOpen={showTips}
        onClose={() => setShowTips(false)}
        title="Custom Section Tips"
        subtitle="Make your resume stand out"
        hasAI={false}
        proTip="Add sections that highlight unique skills or experiences relevant to your target role"
        bestPractices={[
          { tip: "Be specific and relevant", example: "Mention awards, languages or achievements" },
          { tip: "Keep it concise", example: "Use bullet points for better readability" },
          { tip: "Highlight transferable skills", example: "Leadership, problem-solving, teamwork" },
          { tip: "Tailor to the job", example: "Focus on what matters for the specific role" },
        ]}
        avoidList={[
          "Adding irrelevant personal information",
          "Making sections too long",
          "Using vague descriptions",
        ]}
        customContent={
          <div className="bg-indigo-50 rounded-lg p-2 sm:p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <FiShield className="w-3 h-3 text-indigo-600" />
              <p className="text-xs font-semibold text-indigo-700">Popular Section Ideas</p>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <div>
                <p className="font-medium text-gray-800">Volunteer Work</p>
                <p className="text-gray-600">NGOs, community service</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">Publications</p>
                <p className="text-gray-600">Articles, research papers</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">Conferences</p>
                <p className="text-gray-600">Speaking engagements</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">Additional Training</p>
                <p className="text-gray-600">Workshops, courses</p>
              </div>
            </div>
          </div>
        }
      />

      {/* Loading Modal */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-5 sm:p-6 text-center max-w-sm w-full">
            <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <h3 className="font-semibold text-gray-800 mb-1">Analyzing Resume...</h3>
            <p className="text-gray-500 text-xs">This may take a few seconds</p>
          </div>
        </div>
      )}

      {/* ATS Result Modal */}
      <AnimatePresence>
        {showAtsModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-80"
              onClick={() => setShowAtsModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center z-80 p-4 pointer-events-none"
            >
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto">
                <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-4 sm:px-6 py-4 rounded-t-xl sm:rounded-t-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-white/20 rounded-lg">
                      <FaChartLine className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">ATS Score Analysis</h3>
                      <p className="text-indigo-100 text-xs">Your resume has been analyzed</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 text-center">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                      <circle
                        cx="50%" cy="50%" r="45%" fill="none"
                        stroke={getAtsGradeColor(progress)}
                        strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 45}%`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}%`}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl sm:text-2xl font-bold" style={{ color: getAtsGradeColor(progress) }}>
                        {progress}%
                      </span>
                    </div>
                  </div>

                  {showGrade && (
                    <>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-4
                        ${progress >= 85 ? "bg-green-100 text-green-700" : 
                          progress >= 70 ? "bg-blue-100 text-blue-700" :
                          progress >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                        {getAtsGrade(progress)}
                      </span>

                      <div className="p-3 bg-gray-50 rounded-lg mb-5">
                        <p className="text-gray-700 text-sm">{atsVerdict || getAtsVerdictText(progress)}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => setShowAtsModal(false)}
                          className="flex-1 py-2 border-2 border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all text-sm"
                        >
                          Close
                        </button>
                        {/* <button
                          onClick={() => setShowAtsModal(false)}
                          className="flex-1 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2"
                        >
                          <FaRocket className="w-4 h-4" />
                          Improve Resume
                        </button> */}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinalizeForm;