"use client";

import React, { useContext, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiTrash2,
  FiPlus,
  FiX,
  FiArrowRight,
  FiTag,
} from "react-icons/fi";
import { CreateContext } from "@/app/context/CreateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegLightbulb, FaMagic, FaStar } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoArrowForward, IoClose, IoDiamondOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/config/api";
import { Stepper, TipsModal } from "@/app/components/resume";
import dynamic from "next/dynamic";
import api from "@/app/utils/api";

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

const SkillsForm = () => {
  const [skillTipsClicked, setSkillTipsClicked] = useState(false);
  const router = useRouter();
  const UseContext = useContext(CreateContext);
  const contactId = UseContext?.contact.contactId || UseContext?.contact._id;
  const latestResumeId = localStorage.getItem("latest_resume_id");

  const { skills, setSkills } = UseContext;
  const [skillsText, setSkillsText] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [lastSavedData, setLastSavedData] = useState<string>("");

console.log("skills",skills)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize skills data from context
  useEffect(() => {
    if (skills?.text) {
      setSkillsText(skills.text);
      setLastSavedData(skills.text);
    } else if (typeof skills === "string") {
      setSkillsText(skills);
      setLastSavedData(skills);
    } else if (skills && typeof skills === "object" && !Array.isArray(skills)) {
      setSkillsText(skills.text || "");
      setLastSavedData(skills.text || "");
    }
  }, [skills]);

  const saveToAPI = async (skillsDataToSave: string) => {
    // if (!contactId) return false;

    setIsSaving(true);
    try {
      // await axios.post(
      //   `${API_URL}/api/skill/update`,
      //   { text: skillsDataToSave },
      //   {
      //     params: { contactId },
      //   },
      // );


          const singlePayload = {
        "section_name": "skills",
          "section_payload": skillsDataToSave
      }
    
    

    // 3. Send it as standard 'application/json'
    const response = await api.patch(`${API_URL}/user-resumes/${latestResumeId}`,singlePayload);



      setLastSavedData(skillsDataToSave);
      toast.success("Skills saved successfully!");
      return true;
    } catch (err) {
      toast.error("Failed to save Skills!");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Handle text change in editor
  const handleTextChange = (e: any) => {
    const newText = e.htmlValue || e.textValue || e;
    setSkillsText(newText);
    // Update context
    setSkills((prev: any) => ({ ...prev, text: newText }));
  };

  const experienceTitlesList =
    UseContext?.experiences?.map((item: any) => item.jobTitle) || [];

  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [Airesponse, setAiresponse] = useState<string[] | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  // AI Functions
  const handleSubmitAi = async () => {
    setLoading(true);
    setAiresponse(null);
    try {
      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/resume/skills`,
        {
          job_titles: experienceTitlesList,
        },
      );
      const skillsArray = response.data?.skills || [];
      setAiresponse(skillsArray);
      setShowPopup(true);
    } catch (err) {
      toast.error("Failed to generate AI skills");
    } finally {
      setLoading(false);
    }
  };

  const insertAIResponse = (skill: string, index: number) => {
    // Format as bullet point if not already present
    const formattedSkill = skill.startsWith("•") ? skill : `• ${skill}`;

    // Add the skill to existing text
    const newText = skillsText
      ? `${skillsText}\n${formattedSkill}`
      : formattedSkill;

    setSkillsText(newText);
    setSkills((prev: any) => ({ ...prev, text: newText }));

    // Remove the added skill from AI response list
    if (Airesponse) {
      const newAiResponse = Airesponse.filter((_, idx) => idx !== index);
      setAiresponse(newAiResponse.length > 0 ? newAiResponse : null);
    }

    toast.success(`"${skill}" added!`);
  };

  const addAllAISkills = () => {
    if (Airesponse && Airesponse.length > 0) {
      // Format all skills as bullet points
      const formattedSkills = Airesponse.map((skill) => skill).join("\n");

      const newText = skillsText
        ? `${skillsText}\n\n${formattedSkills}`
        : formattedSkills;

      setSkillsText(newText);
      setSkills((prev: any) => ({ ...prev, text: newText }));
      setAiresponse(null);
      setShowPopup(false);
      toast.success("All AI suggestions added!");
    }
  };

  console.log("UseContext", UseContext);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">
      {/* Sticky Stepper */}
      <Stepper />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto px-2 py-6 sm:py-8 lg:py-10">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Skills & Expertise
            </h1>

            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Showcase your professional skills and technical expertise
            </p>

            <button
              onClick={() => setSkillTipsClicked(true)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <FaRegLightbulb className="w-3 h-3" />
              <span>Skills Tips</span>
            </button>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="relative px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-indigo-50 to-white border-b border-gray-100">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-100 rounded-full filter blur-3xl opacity-50"></div>
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-xl">
                    <IoDiamondOutline className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                      Professional Skills
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Add your technical and soft skills
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isSaving && (
                    <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] sm:text-xs text-indigo-700 font-medium">
                        Saving...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Action Buttons */}
              <div className="flex flex-wrap justify-end items-center gap-3 mb-4">
                <div className="relative inline-block group">
                  <button
                    onClick={() => {
                      if (experienceTitlesList.length === 0) {
                        if (window.innerWidth < 768) {
                          setShowMobileWarning(true);
                        } else {
                          toast.warning(
                            "Add work experience first for personalized suggestions",
                          );
                        }
                      } else {
                        handleSubmitAi();
                      }
                    }}
                    disabled={loading}
                    className={`flex items-center cursor-pointer justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all ${
                      experienceTitlesList.length === 0
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FaMagic className="w-4 h-4" />
                    )}
                    <span>Generate With AI</span>
                  </button>

                  {/* Desktop Tooltip */}
                  {experienceTitlesList.length === 0 && !isMobile && (
                    // <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 w-full wrap-break-word  ">
                    //   <div className="flex items-center gap-2">

                    //       <span className="inline-block mr-1">
                    //                     ⚠️
                    //                   </span>
                    //     <span className="wrap-break-word">
                    //       Add work experience first for personalized suggestions
                    //     </span>
                    //   </div>
                    //   <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                    // </div>

                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-full bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-100 shadow-lg whitespace-normal">
                      <div className="relative text-center">
                        <span className="inline-block mr-1">⚠️</span>
                        Add work experience first for personalized suggestions
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* PrimeReact Text Editor */}
              {/* <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <Editor
                  value={skillsText}
                  onTextChange={handleTextChange}
                  style={{ height: "400px" }}
                 
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["clean"],
                    ],
                  }}
                /> */}

              <Editor
                className="rounded-lg bg-white border border-gray-200 overflow-hidden"
                value={skillsText || ""}
                onTextChange={handleTextChange}
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
                style={{
                  height: "200px",
                  minHeight: "200px",
                  background: "white",
                }}
              />
            </div>

            {/* </div> */}
          </div>
        </div>
      </div>

      {/* Sticky Footer Buttons */}
      <div className="sticky bottom-0 z-20 bg-white/75 backdrop-blur-md border-t border-gray-100 shadow-lg shadow-gray-200/50">
        <div className="mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-3 sm:gap-4">
            {/* Back Button */}
            <button
              className="group px-4 sm:px-5 py-2.5 sm:py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl hover:bg-indigo-50/50 cursor-pointer"
              onClick={() => router.push("/resume-details/education")}
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
              <span className="hidden sm:inline">Back to Education</span>
              <span className="inline sm:hidden">Back</span>
            </button>

            {/* Continue Button */}
            <button
              className="group relative px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium md:font-semibold text-white rounded-lg md:rounded-xl shadow-lg transition-all duration-300 overflow-hidden whitespace-nowrap cursor-pointer"
              onClick={() => {
                saveToAPI(skillsText).then(() =>
                  router.push("/resume-details/project"),
                );
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 transition-all duration-300 group-hover:scale-105 group-hover:from-indigo-500 group-hover:via-indigo-400 group-hover:to-indigo-500"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
              </div>
              <div className="relative flex items-center justify-center gap-2">
                <span>Continue to Projects</span>
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
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(79,70,229,0.5)]"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Tips Modal */}
      <TipsModal
        isOpen={skillTipsClicked}
        onClose={() => setSkillTipsClicked(false)}
        title="Skills Tips"
        subtitle="Showcase your expertise"
        hasAI={true}
        aiFeatureDescription="get intelligent skill recommendations based on your job title."
        proTip="Tailor your skills to each job — mirror keywords from the job description"
        bestPractices={[
          {
            tip: "List job-relevant skills only",
            example: "Match your skills to the role",
          },
          {
            tip: "Use keywords from job descriptions",
            example: "Helps pass ATS filters",
          },
          {
            tip: "Keep it concise — 4-6 strongest skills",
            example: "Quality over quantity",
          },
        ]}
        avoidList={[
          "Listing outdated technologies",
          "Adding generic traits (hard-working)",
        ]}
      />

      {/* AI Popup */}
      {showPopup && Airesponse && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    AI Recommendations
                  </h2>
                  <p className="text-indigo-100 text-xs">
                    Click on any skill to add it to your list
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

            <div className="p-5 max-h-[60vh] overflow-y-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {Airesponse.map((skill, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => insertAIResponse(skill, index)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-indigo-500 hover:text-white transition-all cursor-pointer"
                  >
                    {skill}
                  </motion.button>
                ))}
              </div>

       
            </div>
          </motion.div>
        </div>
      )}

      {/* Mobile Warning Modal */}
      {showMobileWarning && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 md:hidden">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Cannot Generate AI Suggestions
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Please add your work experience first to get personalized
              AI-powered skill recommendations.
            </p>
            <button
              onClick={() => setShowMobileWarning(false)}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
