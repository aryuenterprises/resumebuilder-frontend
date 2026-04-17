"use client";
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { CreateContext } from "@/app/context/CreateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

import {
  FaCertificate,
  FaHiking,
  FaAward,
  FaGlobe,
  FaPlus,
  FaChevronDown,
  FaTrash,
} from "react-icons/fa";
import { BsFileEarmarkText } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Stepper from "../../../components/resume/Steppers";
import { Finalize as FinalizeType, SimpleSkill, SkillCategory, Template } from "@/app/types/context.types";
import { getLocalStorage, setLocalStorage } from "@/app/utils";
import { API_URL } from "@/app/config/api";

// Define interfaces
interface Section {
  title: keyof FinalizeType;
  heading: string;
  icon: React.ReactNode;
  description: string;
}

interface DeletePopupState {
  show: boolean;
  section: keyof FinalizeType | null;
  heading: string | null;
}

const sections: Section[] = [
  {
    title: "certificationsAndLicenses",
    heading: "Certifications & Licenses",
    icon: <FaCertificate className="w-5 h-5 text-[#c40116]" />,
    description: "Add credentials that back up your expertise.",
  },
  {
    title: "hobbiesAndInterests",
    heading: "Hobbies & Interests",
    icon: <FaHiking className="w-5 h-5 text-[#c40116]" />,
    description: "Include activities relevant to your job or industry.",
  },
  {
    title: "awardsAndHonors",
    heading: "Awards & Honors",
    icon: <FaAward className="w-5 h-5 text-[#c40116]" />,
    description: "Share achievements and milestones you're proud of.",
  },
  {
    title: "websitesAndSocialMedia",
    heading: "Websites & Social Media",
    icon: <FaGlobe className="w-5 h-5 text-[#c40116]" />,
    description:
      "Share your portfolio, blog, LinkedIn, or other related websites.",
  },
  {
    title: "customSection",
    heading: "Custom Section",
    icon: <BsFileEarmarkText className="w-5 h-5 text-[#c40116]" />,
    description:
      "Create a custom section for any extra info you'd like to add.",
  },
];

// Dynamically import Editor to avoid SSR issues
const Editor = dynamic(
  () => import("primereact/editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200 h-35 min-h-35 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading editor...</div>
      </div>
    ),
  },
);

const FinalizeForm = () => {
  const UseContext = useContext(CreateContext);
  const router = useRouter();

  // Safely destructure context with fallbacks
  const {
    contact ,
    summary = "",
    skills = [],
    experiences = [],
    education = [],
    finalize = {},
    setFinalize = () => {},
    fullResumeData,
    setFullResumeData,
  } = UseContext || {};

  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedData, setLastSavedData] = useState<string>("");
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialLoadDone = useRef(false);

    const contactId = UseContext?.contact._id || UseContext?.contact.contactId;


  console.log("contact",contact)

  const stripHtml = (html: string) => {
    return html?.replace(/<\/?[^>]+(>|$)/g, "") || "";
  };

  const textEditorTextsFormat = (text: string) => {
    return text
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/•/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .split(".")
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const htmlRemovedSummary = stripHtml(summary);

  // const filteredSkills = skills
  //   .map((item) => item?.skill || "")
  //   .filter(Boolean);

    const filteredSkills = skills?.length 
      ? ('title' in skills[0] 
          ? (skills as SkillCategory[]).flatMap(c => c.skills.map(s => s.name))
          : (skills as SimpleSkill[]).map(s => s.name))
      : [];

  const filteredExperiences = experiences.map((item) => ({
    title: item?.jobTitle || "",
    company: item?.employer || "",
    bullets: textEditorTextsFormat(item?.text || ""),
  }));
  const filteredEducation = education.map((item) => ({
    degree: item?.degree || "",
    educationDescription: textEditorTextsFormat(item?.text || ""),
  }));

  const chosenResumeDetails = getLocalStorage<Template>("chosenTemplate");

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  // Save to localStorage whenever skillsData changes
  useEffect(() => {
    if (!initialLoadDone.current) return;

    if (fullResumeData) {
      const updatedFullData = {
        ...fullResumeData,
        finalize: finalize,
      };
      setFullResumeData(updatedFullData);
      setLocalStorage("fullResumeData", updatedFullData);
    }
  }, [finalize]);

  const saveToAPI = async (finalizeData: typeof finalize) => {


    if (!contactId) {
      console.error("Contact ID is required");
      return false;
    }

    // Check if data has changed from last saved
    const currentDataString = JSON.stringify(finalizeData);
    if (currentDataString === lastSavedData) {
      return true; // No changes to save
    }

    setIsSaving(true);

    try {
      const cleanedSkillsData = Object.fromEntries(
        Object.entries(finalizeData).map(([section, skills]) => [
          section,
          (skills as any[])?.filter(
            (skill) => skill?.name && skill.name.trim() !== "",
          ) || [],
        ]),
      );

      const formData = {
        skillsData: cleanedSkillsData,
        templateId: chosenResumeDetails?.id,
      };

      const response = await axios.post(
        `${API_URL}/api/finalize-resume/update`,
        formData,
        { params: { contactId: contactId} },
      );

      setLastSavedData(currentDataString);
      return true;
    } catch (err: any) {
      console.error("Error saving finalize data:", err);
      toast.error("Failed to save additional information!");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Debounced save function
  const debouncedSave = useCallback(
    (finalizeData: typeof finalize) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        saveToAPI(finalizeData);
      }, 1000);
    },
    [contactId, lastSavedData],
  );

  const [deletePopup, setDeletePopup] = useState<DeletePopupState>({
    show: false,
    section: null,
    heading: null,
  });

  const [collapseStates, setCollapseStates] = useState<Record<string, boolean>>(
    () => {
      const initialState: Record<string, boolean> = {};
      sections.forEach((section) => {
        initialState[section.title] = true;
      });
      return initialState;
    },
  );

  const fetchSkill = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/finalize-resume/get-finalize-resume/${contactId}`,
      );
      const experienceList = response.data?.resume?.[0]?.skillsData || {};
     
      const formattedData: FinalizeType = {
        languages: experienceList.languages || [],
        certificationsAndLicenses:
          experienceList.certificationsAndLicenses || [],
        hobbiesAndInterests: experienceList.hobbiesAndInterests || [],
        awardsAndHonors: experienceList.awardsAndHonors || [],
        websitesAndSocialMedia: experienceList.websitesAndSocialMedia || [],
        references: experienceList.references || [],
        customSection: experienceList.customSection || [],
      };

      setFinalize(formattedData);
      setLastSavedData(JSON.stringify(formattedData));
      initialLoadDone.current = true;
    } catch (error) {
      console.log(error);
    }
  };


  //   useEffect(() => {
  //   if (contact?.contactId) {
  //     fetchSkill();
  //   }
  // }, [contact?.contactId]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = deletePopup.show ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [deletePopup.show]);

  // Toggle section open/close
  const handleToggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Confirm deletion popup
  const confirmDeleteSection = (title: keyof FinalizeType, heading: string) => {
    setDeletePopup({ show: true, section: title, heading: heading });
  };

  const deleteSection = () => {
    const title = deletePopup.section;
    if (!title) return;

    setFinalize((prev) => {
      const updated = {
        ...prev,
        [title]: (prev[title] as any[])?.map((item) => {
          const clearedItem: any = {};
          Object.keys(item).forEach((key) => {
            clearedItem[key] = typeof item[key] === "number" ? 0 : "";
          });
          return clearedItem;
        }),
      };
      debouncedSave(updated);
      return updated;
    });

    setOpenSections((prev) => ({ ...prev, [title]: false }));
    setDeletePopup({ show: false, section: null, heading: null });
  };

  const cancelDelete = () =>
    setDeletePopup({ show: false, section: null, heading: null });

  // Collapse toggle inside each section
  const toggleCollapse = (section: string) => {
    setCollapseStates((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const addSkill = (section: keyof FinalizeType) => {
    const singleEntrySections: (keyof FinalizeType)[] = [
      "certificationsAndLicenses",
      "awardsAndHonors",
      "references",
    ];

    if (
      singleEntrySections.includes(section) &&
      (finalize[section] as any[])?.length > 0
    )
      return;

    setFinalize((prev) => {
      const updated = {
        ...prev,
        [section]: [
          ...((prev[section] as any[]) || []),
          { id: Date.now(), name: "", level: 3 },
        ],
      };
      debouncedSave(updated);
      return updated;
    });

    setOpenSections((prev) => ({ ...prev, [section]: true }));
  };

  // Delete skill
  const deleteSkill = (section: keyof FinalizeType, skillId: number) => {
    setFinalize((prev) => {
      const updated = {
        ...prev,
        [section]:
          (prev[section] as any[])?.filter((s) => s.id !== skillId) || [],
      };
      debouncedSave(updated);
      return updated;
    });
  };

  const handleSkillChange = (
    section: keyof FinalizeType,
    skillId: number,
    value: string,
    type: string = "name",
  ) => {
    setFinalize((prev) => {
      const updated = {
        ...prev,
        [section]:
          (prev[section] as any[])?.map((s) =>
            s.id === skillId
              ? {
                  ...s,
                  [type]: value,
                }
              : s,
          ) || [],
      };
      debouncedSave(updated);
      return updated;
    });
  };

  const canAddNew = (sectionTitle: keyof FinalizeType) => {
    const list = finalize[sectionTitle] as any[] | undefined;
    const singleEntrySections: (keyof FinalizeType)[] = [
      "certificationsAndLicenses",
      "awardsAndHonors",
      "references",
    ];

    if (singleEntrySections.includes(sectionTitle)) {
      return !list || list.length === 0;
    }

    if (!list || list.length === 0) return true;
    const last = list[list.length - 1];
    return last.name?.trim() !== "";
  };

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [score, setScore] = useState(0);
  const [atsVerdict, setAtsVerdict] = useState("");
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const checkATSScore = async () => {
    setLoading(true);

    const formData = {
       resume_data: {
      name: `${contact?.firstName || ""} ${contact?.lastName || ""}`.trim(),
      email: contact?.email || "",
      phone: contact?.phone || "",
      summary: htmlRemovedSummary,
      skills: filteredSkills,
      experience: filteredExperiences,
      education: filteredEducation,
      
    }
    };

    try {
      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/ats/scan`,
        formData,
      );

      setScore(response.data.ats_score);
      setAtsVerdict(response?.data?.summary?.ats_verdict)
      setProgress(0);
      setLoading(false);
      setShowPopup(true);

      return true;
    } catch (err: any) {
      toast.error("Something went wrong");
      console.error("Error sending message:", err);
      setLoading(false);
      return false;
    }
  };

  // Animate progress after popup opens
  useEffect(() => {
    if (!showPopup) return;

    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      if (current >= score) {
        current = score;
        clearInterval(timer);

        if (score >= 80) {
          setShowConfetti(true);
        }
      }
      setProgress(current);
    }, 15);

    return () => clearInterval(timer);
  }, [score, showPopup]);




  return (
    <section className="relative h-screen overflow-hidden">
      <div className="py-2 lg:py-3 px-3 md:px-4 lg:px-5 bg-white rounded-xl sm:rounded-2xl shadow-soft h-full flex flex-col">
        {/* Header Section */}
        <Stepper />

        {/* Auto-save indicator */}
        {isSaving && (
          <div className="absolute top-20 right-5 z-10 flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-md">
            <div className="w-3 h-3 border-2 border-gray-300 border-t-[#c40116] rounded-full animate-spin"></div>
            <span className="text-xs text-gray-600">Saving...</span>
          </div>
        )}

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto pb-5 mt-5">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
              Additional Information
            </h1>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm font-medium">
            Add relevant skills, certifications, languages, and other
            information to enhance your resume.
          </p>

          {/* Open Sections */}
          <div className="space-y-3 sm:space-y-4 pb-4">
            {sections.map(
              (section) =>
                openSections[section.title] && (
                  <div key={section.title} className="space-y-3 sm:space-y-4">
                    <div className="bg-[#f3f4f6]/80 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-subtle transition-all duration-300 hover:shadow-md">
                      {/* Header */}
                      <div
                        className="flex justify-between items-center cursor-pointer p-3 sm:p-4 lg:p-5 group hover:bg-gray-50/50 transition-all duration-300"
                        onClick={() => toggleCollapse(section.title)}
                      >
                        <div className="flex gap-2 sm:gap-3 items-center">
                          <div className="bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg">
                            <span className="text-[#c40116] text-lg sm:text-xl">
                              {section.icon}
                            </span>
                          </div>

                          <div>
                            <div className="text-gray-800 font-medium sm:font-semibold text-sm sm:text-base group-hover:text-[#c40116] transition-colors">
                              {section.title === "customSection"
                                ? "Custom Section"
                                : section.heading}
                            </div>
                            <div className="block text-gray-500 text-xs sm:text-sm mt-0.5 sm:mt-1 group-hover:text-[#c40116]/70 transition-colors">
                              {section.description}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 sm:gap-4 items-center">
                          <motion.div
                            animate={{
                              rotate: collapseStates[section.title] ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-400 group-hover:text-[#c40116] transition-colors"
                          >
                            <FaChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              confirmDeleteSection(
                                section.title,
                                section.heading,
                              );
                            }}
                            className="p-1.5 sm:p-2 rounded-lg bg-linear-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
                            type="button"
                          >
                            <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Collapsible Content */}
                      <div
                        className={`transition-all duration-500 overflow-hidden ${
                          collapseStates[section.title]
                            ? "max-h-500 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="p-3 sm:p-4 lg:p-5 space-y-4 sm:space-y-6 border-t border-gray-100">
                          {(finalize[section.title] as any[])?.map(
                            (skill: any, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-start gap-3 sm:gap-4 flex-col sm:flex-row"
                              >
                                {section.title ===
                                  "certificationsAndLicenses" && (
                                  <div className="w-full group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                                      Certification Details
                                    </label>
                                    <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#c40116] focus-within:ring-2 focus-within:ring-[#c40116]/20 transition-all duration-300">
                                      <Editor
                                        className="rounded-lg"
                                        value={skill.name || ""}
                                        onTextChange={(e: any) =>
                                          handleSkillChange(
                                            section.title,
                                            skill.id,
                                            e.htmlValue,
                                          )
                                        }
                                        onBlur={() => {
                                          if (saveTimeoutRef.current) {
                                            clearTimeout(
                                              saveTimeoutRef.current,
                                            );
                                          }
                                          saveToAPI(finalize);
                                        }}
                                        style={{
                                          height: "140px",
                                          minHeight: "140px",
                                          padding: "12px sm:16px",
                                          backgroundColor: "#fafafa",
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}

                                {section.title === "websitesAndSocialMedia" && (
                                  <div className="w-full space-y-3 sm:space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                      <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                                          Website URL
                                        </label>
                                        <input
                                          type="text"
                                          value={skill.websiteUrl || ""}
                                          onChange={(e) =>
                                            handleSkillChange(
                                              section.title,
                                              skill.id,
                                              e.target.value,
                                              "websiteUrl",
                                            )
                                          }
                                          onBlur={() => {
                                            if (saveTimeoutRef.current) {
                                              clearTimeout(
                                                saveTimeoutRef.current,
                                              );
                                            }
                                            saveToAPI(finalize);
                                          }}
                                          placeholder="https://example.com"
                                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                                        />
                                      </div>

                                      <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                                          Social Media URL
                                        </label>
                                        <input
                                          type="text"
                                          value={skill.socialMedia || ""}
                                          onChange={(e) =>
                                            handleSkillChange(
                                              section.title,
                                              skill.id,
                                              e.target.value,
                                              "socialMedia",
                                            )
                                          }
                                          onBlur={() => {
                                            if (saveTimeoutRef.current) {
                                              clearTimeout(
                                                saveTimeoutRef.current,
                                              );
                                            }
                                            saveToAPI(finalize);
                                          }}
                                          placeholder="https://linkedin.com/in/username"
                                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex justify-end pt-1 sm:pt-2">
                                      <button
                                        onClick={() =>
                                          deleteSkill(section.title, skill.id)
                                        }
                                        className="p-1.5 sm:p-2 rounded-lg bg-linear-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
                                        type="button"
                                      >
                                        <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {section.title === "awardsAndHonors" && (
                                  <div className="w-full group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                                      Awards & Honors Details
                                    </label>
                                    <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#c40116] focus-within:ring-2 focus-within:ring-[#c40116]/20 transition-all duration-300">
                                      <Editor
                                        className="rounded-lg"
                                        value={skill.name || ""}
                                        onTextChange={(e: any) =>
                                          handleSkillChange(
                                            section.title,
                                            skill.id,
                                            e.htmlValue,
                                          )
                                        }
                                        onBlur={() => {
                                          if (saveTimeoutRef.current) {
                                            clearTimeout(
                                              saveTimeoutRef.current,
                                            );
                                          }
                                          saveToAPI(finalize);
                                        }}
                                        style={{
                                          height: "140px",
                                          minHeight: "140px",
                                          padding: "12px sm:16px",
                                          backgroundColor: "#fafafa",
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}

                                {section.title === "hobbiesAndInterests" && (
                                  <div className="w-full group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                                      {section.heading}
                                    </label>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                      <input
                                        type="text"
                                        value={skill.name || ""}
                                        onChange={(e) =>
                                          handleSkillChange(
                                            section.title,
                                            skill.id,
                                            e.target.value,
                                          )
                                        }
                                        onBlur={() => {
                                          if (saveTimeoutRef.current) {
                                            clearTimeout(
                                              saveTimeoutRef.current,
                                            );
                                          }
                                          saveToAPI(finalize);
                                        }}
                                        placeholder={`Enter ${section.heading.toLowerCase()}`}
                                        className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                                      />
                                      <button
                                        onClick={() =>
                                          deleteSkill(section.title, skill.id)
                                        }
                                        className="p-2 sm:p-3 rounded-lg bg-linear-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
                                        type="button"
                                      >
                                        <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {section.title === "customSection" && (
                                  <div className="w-full space-y-3 sm:space-y-4">
                                    <div className="group">
                                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                                        Section Name
                                      </label>
                                      <input
                                        type="text"
                                        value={skill.name || ""}
                                        onChange={(e) =>
                                          handleSkillChange(
                                            section.title,
                                            skill.id,
                                            e.target.value,
                                            "name",
                                          )
                                        }
                                        onBlur={() => {
                                          if (saveTimeoutRef.current) {
                                            clearTimeout(
                                              saveTimeoutRef.current,
                                            );
                                          }
                                          saveToAPI(finalize);
                                        }}
                                        placeholder="Enter section name"
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-linear-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                                      />
                                    </div>

                                    <div className="group">
                                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                                        Description
                                      </label>
                                      <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#c40116] focus-within:ring-2 focus-within:ring-[#c40116]/20 transition-all duration-300">
                                        <Editor
                                          className="rounded-lg"
                                          value={skill.description || ""}
                                          onTextChange={(e: any) =>
                                            handleSkillChange(
                                              section.title,
                                              skill.id,
                                              e.htmlValue,
                                              "description",
                                            )
                                          }
                                          onBlur={() => {
                                            if (saveTimeoutRef.current) {
                                              clearTimeout(
                                                saveTimeoutRef.current,
                                              );
                                            }
                                            saveToAPI(finalize);
                                          }}
                                          style={{
                                            height: "140px",
                                            minHeight: "140px",
                                            padding: "12px sm:16px",
                                            backgroundColor: "#fafafa",
                                          }}
                                        />
                                      </div>
                                    </div>

                                    <div className="flex justify-end pt-1 sm:pt-2">
                                      <button
                                        onClick={() =>
                                          deleteSkill(section.title, skill.id)
                                        }
                                        className="p-1.5 sm:p-2 rounded-lg bg-linear-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
                                        type="button"
                                      >
                                        <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ),
                          )}

                          {/* Add Button */}
                          {canAddNew(section.title) &&
                            ![
                              "certificationsAndLicenses",
                              "awardsAndHonors",
                              "references",
                            ].includes(section.title) && (
                              <button
                                onClick={() => addSkill(section.title)}
                                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-linear-to-r from-[#c40116]/10 to-[#be0117]/10 text-[#c40116] font-medium hover:from-[#c40116]/20 hover:to-[#be0117]/20 transition-all duration-200 text-sm"
                                type="button"
                              >
                                <FaPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                                Add {section.heading}
                              </button>
                            )}

                          {/* For single-entry sections */}
                          {canAddNew(section.title) &&
                            [
                              "certificationsAndLicenses",
                              "awardsAndHonors",
                              "references",
                            ].includes(section.title) && (
                              <button
                                onClick={() => addSkill(section.title)}
                                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-linear-to-r from-[#c40116]/10 to-[#be0117]/10 text-[#c40116] font-medium hover:from-[#c40116]/20 hover:to-[#be0117]/20 transition-all duration-200 text-xs sm:text-base"
                                type="button"
                              >
                                <FaPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                                Add {section.heading}
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                ),
            )}

            {/* Available Sections Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4">
              {sections.map(
                (section, idx) =>
                  !openSections[section.title] && (
                    <button
                      key={idx}
                      onClick={() => handleToggleSection(section.title)}
                      className="group p-4 sm:p-5 bg-[#f3f4f6]/80 border border-gray-200 rounded-xl hover:border-[#c40116] hover:shadow-md transition-all duration-300"
                      type="button"
                    >
                      <div className="flex items-center justify-between gap-2 sm:gap-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="p-1.5 sm:p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg group-hover:from-[#c40116]/20 group-hover:to-[#be0117]/20 transition-all">
                            <span className="text-[#c40116] text-lg sm:text-xl">
                              {section.icon}
                            </span>
                          </div>
                          <div className="text-left">
                            <div className="font-medium md:font-semibold text-gray-800 text-sm sm:text-base group-hover:text-[#c40116] transition-colors">
                              {section.heading}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                              {section.description}
                            </div>
                          </div>
                        </div>
                        <FaPlus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-[#c40116] transition-colors" />
                      </div>
                    </button>
                  ),
              )}
            </div>
          </div>

          {/* ATS Score Button */}
          <div className="bg-linear-to-t from-white via-white to-transparent pt-4 pb-2 mt-4">
            <button
              onClick={checkATSScore}
              className="w-full sm:w-fit mx-auto p-2.5 sm:p-3 bg-linear-to-r from-[#c40116] to-[#c40116]/60 text-white font-medium rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#c40116]/25 transition-all duration-300  text-sm sm:text-base"
              type="button"
            >
              Check Your ATS Score
            </button>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="shrink-0 pt-2  lg:pt-3">
          <div className="flex justify-between">
            <button
              className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
              onClick={() => router.push("/resume-details/summary")}
            >
              Back
            </button>

            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-nunito font-semibold transition-colors duration-300 cursor-pointer"
              onClick={() => {
                if (saveTimeoutRef.current) {
                  clearTimeout(saveTimeoutRef.current);
                }
                saveToAPI(finalize).then(() => {
                  router.push("/download-resume");
                  // window.open("/download-resume", "_blank");
                });
              }}
            >
              Download Resume
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {deletePopup.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="p-1 bg-linear-to-r from-[#c40116] to-[#be0117]"></div>

            <div className="p-4 sm:p-6 text-center">
              <div className="p-2 sm:p-3 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-full w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4">
                <FaTrash className="w-6 h-6 sm:w-8 sm:h-8 text-[#c40116]" />
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1.5 sm:mb-2">
                Delete Section
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                Are you sure you want to delete "{deletePopup.heading}"?
              </p>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteSection}
                  className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all text-sm"
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 text-center max-w-sm w-full">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border-3 sm:border-4 border-[#c40116] border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-1.5 sm:mb-2">
              Analyzing Resume...
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm">
              This may take a few seconds
            </p>
          </div>
        </div>
      )}

      {/* ATS Score Popup */}
      {/* {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          {showConfetti && <Confetti />}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
          >
            <div className="p-1 bg-linear-to-r from-[#c40116] to-[#be0117]"></div>

            <div className="p-4 sm:p-6 text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
                ATS Resume Score
              </h3>

              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 mx-auto mb-4 sm:mb-6 relative">
                <CircularProgressbar
                  value={progress}
                  text={`${progress}%`}
                  styles={buildStyles({
                    pathColor:
                      progress >= 80
                        ? "#10b981"
                        : progress >= 60
                          ? "#f59e0b"
                          : "#7d838e",
                    textColor:
                      progress >= 80
                        ? "#10b981"
                        : progress >= 60
                          ? "#f59e0b"
                          : "#7d838e",
                    trailColor: "#e5e7eb",
                    pathTransitionDuration: 1,
                  })}
                />
              </div>

              <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
                {atsVerdict}
              </p>
              
              <button onClick={()=>window.open('/ats-checker')}>Use our advanced Ats Checker to see full suggestion</button>

              <button
                onClick={() => {
                  setShowPopup(false);
                  setShowConfetti(false);
                }}
                className="w-full py-2.5 sm:py-3 bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
                type="button"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )} */}

      


  

{/* ATS Result Modal - Shown after resume upload and analysis */}
<AnimatePresence mode="wait">
  {showPopup && (
    <>
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
        onClick={() => {
          setShowPopup(false);
          setShowConfetti(false);
        }}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ 
          type: "spring", 
          damping: 20, 
          stiffness: 300,
          duration: 0.3
        }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
      >
        <motion.div
          className="bg-gradient-to-br from-white via-white to-gray-50 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 pointer-events-auto relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          
         
       

          <div className="p-6 sm:p-8">
            {/* Header with icon */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-center mb-6"
            >
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2, damping: 12 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-2xl mb-4"
              >
                <svg className="w-8 h-8 text-[#c40116]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
              >
                ATS Score Analysis
              </motion.h3>
           
            </motion.div>

            {/* Score Circle with animation */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.3, damping: 15 }}
              className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-6"
            >
              <CircularProgressbar
                value={progress}
                text={`${progress}%`}
                styles={buildStyles({
                  pathColor: progress >= 80 ? "#10b981" : progress >= 60 ? "#f59e0b" : "#ef4444",
                  textColor: progress >= 80 ? "#10b981" : progress >= 60 ? "#f59e0b" : "#ef4444",
                  trailColor: "#f3f4f6",
                  pathTransitionDuration: 1,
                  textSize: "24px",
                  strokeLinecap: "round",
                })}
              />
              <div className="absolute inset-0 rounded-full border-2 border-gray-100 -z-10"></div>
            </motion.div>

           

            {/* Verdict text */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.55 }}
              className="text-gray-600 text-sm sm:text-base mb-5 text-center leading-relaxed"
            >
              {atsVerdict}
            </motion.p>
            
            {/* Navigation to Full ATS Checker Page */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.6 }}
              className="mb-3"
            >
              <p className="text-xs text-gray-400 text-center mb-2">
                Want a more detailed analysis?
              </p>
              <button
                onClick={() => {
                  setShowPopup(false);
                window.open('/ats-checker')
              
                }}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#c40116]/5 to-[#be0117]/5 text-[#c40116] font-medium rounded-xl border border-[#c40116]/20 hover:border-[#c40116]/40 hover:shadow-md transition-all duration-300 group flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Go to Advanced ATS Checker
                <span className="text-xs text-gray-500 group-hover:text-[#c40116] transition-colors">
                  Full Analysis →
                </span>
              </button>
            </motion.div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, delay: 0.65 }}
              onClick={() => {
                setShowPopup(false);
                setShowConfetti(false);
              }}
              className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium rounded-xl hover:shadow-md transition-all duration-300 text-sm sm:text-base"
              type="button"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </>
  )}
</AnimatePresence>

    </section>
  );
};

export default FinalizeForm;
