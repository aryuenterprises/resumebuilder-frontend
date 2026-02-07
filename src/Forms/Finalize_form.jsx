import React, {
  useState,
  useEffect,
  useContext,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Editor } from "primereact/editor";
import { motion } from "framer-motion";
import { CreateContext } from "../App";
import axios from "axios";
import { API_URL } from "../Config";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Confetti from "react-confetti";

import {
  FaCertificate,
  FaHiking,
  FaAward,
  FaGlobe,
  FaPlus,
  FaChevronDown,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import { BsFileEarmarkText } from "react-icons/bs";

// Update your sections array with React Icons
const sections = [
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

const FinalizeForm = forwardRef((props, ref) => {

  const UseContext = useContext(CreateContext);

  const {
    firstName,
    lastName,
    email,
    phone,
    text: summary,
    skills,
    experiences,
    education,
  } = UseContext;

  console.log("UseContext", UseContext);

  function stripHtml(html) {
    return html?.replace(/<\/?[^>]+(>|$)/g, "");
  }

  function textEditorTextsFormat(text) {
    return text
      .replace(/<\/?[^>]+(>|$)/g, "") // remove HTML tags
      .replace(/•/g, "") // remove bullet symbol
      .replace(/\s+/g, " ") // normalize spaces
      .trim() // trim spaces
      .split(".") // split into sentences
      .map((s) => s.trim()) // trim each sentence
      .filter(Boolean); // remove empty strings
  }

  const htmlRemovedSummary = stripHtml(summary);
  const filteredSkills = skills.map((item, index) => item.skill);
  const filteredExperiences = experiences.map((item, index) => ({
    title: item.jobTitle,
    company: item.employer,
    bullets: textEditorTextsFormat(item.text),
  }));
  const filteredEduction = education.map((item, index) => ({
    degree: item.degree,
    educationDescription: textEditorTextsFormat(item.text),
  }));

  const Contactid = UseContext?.contactid;

  const location = useLocation();
  const templateId = location.state?.templateId.id;

  const initialSkillData = {};
  sections.forEach((section) => {
    initialSkillData[section.title] = [];
  });

  const [openSections, setOpenSections] = useState({});
  const [skillsData, setSkillsData] = useState(initialSkillData);

  const { globalSkillsData, setGlobalSkillsData } = useContext(CreateContext);

  useEffect(() => {
    setGlobalSkillsData(initialSkillData);
  }, []);

  useEffect(() => {
    setGlobalSkillsData(skillsData);
  }, [skillsData]);

  const [deletePopup, setDeletePopup] = useState({
    show: false,
    section: null,
    heading: null,
  });

  const [collapseStates, setCollapseStates] = useState(() => {
    const initialState = {};
    sections.forEach((section) => {
      initialState[section.title] = true;
    });

    return initialState;
  });


  const fetchSkill = async () => {
    try {
      const response = await axios.get(
        `${API_URL}api/finalize-resume/get-finalize-resume/${Contactid}`,
      );

      console.log("responsefinalyy", response);

      const experienceList = response.data?.resume?.[0]?.skillsData || {};

      console.log("experienceList", experienceList);

      const formattedData = {
        languages: experienceList.languages || [],
        certificationsAndLicenses:
          experienceList.certificationsAndLicenses || [],
        hobbiesAndInterests: experienceList.hobbiesAndInterests || [],
        awardsAndHonors: experienceList.awardsAndHonors || [],
        websitesAndSocialMedia: experienceList.websitesAndSocialMedia || [],
        references: experienceList.references || [],
        customSection: experienceList.customSection || [],
      };

      setSkillsData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSkill();
  }, [Contactid]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (e) e.preventDefault();

    try {
      // const formData = {
      //   skillsData,
      //   templateId: templateId,

      // };

      const cleanedSkillsData = Object.fromEntries(
        Object.entries(skillsData).map(([section, skills]) => [
          section,
          skills.filter((skill) => skill.name && skill.name.trim() !== ""),
        ]),
      );

      const formData = {
        skillsData: cleanedSkillsData,
        templateId: templateId,
      };

      console.log("formData", formData);

      const response = await axios.post(
        `${API_URL}/api/finalize-resume/update`,

        formData,
        { params: { contactId: Contactid } },
      );
      console.log("response", response);

      // toast.success(" Finalize  created successfully.");

      // reset();

      return true;
    } catch (err) {
      setErrors(err);
      console.error("Error sending message:", err);
      toast.error("Failed to save Finalize!");

      return false;
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  useEffect(() => {
    document.body.style.overflow = deletePopup.show ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [deletePopup.show]);

  // Toggle section open/close
  const handleToggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Confirm deletion popup
  const confirmDeleteSection = (title, heading) => {
    setDeletePopup({ show: true, section: title, heading: heading });
  };

  const deleteSection = () => {
    const title = deletePopup.section;

    setSkillsData((prev) => ({
      ...prev,
      [title]: prev[title].map((item) => {
        // reset all keys inside each item
        const clearedItem = {};
        Object.keys(item).forEach((key) => {
          // reset strings to "" and numbers to 0
          clearedItem[key] = typeof item[key] === "number" ? 0 : "";
        });
        return clearedItem;
      }),
    }));

    setOpenSections((prev) => ({ ...prev, [title]: false }));
    setDeletePopup({ show: false, section: null, heading: null });
  };

  const cancelDelete = () => setDeletePopup({ show: false, section: null });

  // Collapse toggle inside each section
  const toggleCollapse = (section) => {
    setCollapseStates((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const addSkill = (section) => {
    const singleEntrySections = [
      "certificationsAndLicenses",
      "awardsAndHonors",
      "references",
    ];

    // If section is single-entry and already has an item, do nothing
    if (singleEntrySections.includes(section) && skillsData[section].length > 0)
      return;

    setSkillsData((prev) => ({
      ...prev,
      [section]: [
        ...prev[section],
        { id: Date.now(), name: "", level: 3 }, // default empty item
      ],
    }));

    // Open section automatically
    setOpenSections((prev) => ({ ...prev, [section]: true }));
  };

  // Delete skill
  const deleteSkill = (section, skillId) => {
    setSkillsData((prev) => ({
      ...prev,
      [section]: prev[section].filter((s) => s.id !== skillId),
    }));
  };

  const handleSkillChange = (section, skillId, value, type = "name") => {
    setSkillsData((prev) => ({
      ...prev,
      [section]: prev[section].map((s) =>
        s.id === skillId
          ? {
              ...s,
              [type]: value, // dynamically update name, level, or description
            }
          : s,
      ),
    }));
  };

  const canAddNew = (sectionTitle) => {
    const list = skillsData[sectionTitle];
    const singleEntrySections = [
      "certificationsAndLicenses",
      "awardsAndHonors",
      "references",
    ];

    if (singleEntrySections.includes(sectionTitle)) {
      return !list || list.length === 0; // show button only if no item exists
    }

    if (!list || list.length === 0) return true;
    const last = list[list.length - 1];
    return last.name?.trim() !== "";
  };

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);

  const checkATSScore = async () => {
    setLoading(true);

    const formData = {
      name: `${firstName} ${lastName}`,
      email: email,
      phone: phone,
      summary: htmlRemovedSummary,
      skills: filteredSkills,
      experience: filteredExperiences,
      education: filteredEduction,
      font: "Calibri",
      uses_table: false,
      uses_columns: false,
      file_type: "pdf",
      job_description:
        "Looking for a backend developer with strong Python, FastAPI, Docker, and PostgreSQL experience.",
    };

    try {
      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/ats/scan`,
        formData,
      );

      console.log(response.data);

      setScore(response.data.ats_score);
      setProgress(0);
      setLoading(false);
      setShowPopup(true);

      return true;
    } catch (err) {
      alert("something went wrong");
      console.error("Error sending message:", err);
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

        // 🎉 Confetti for high score
        if (score >= 85) {
          setShowConfetti(true);
        }
      }
      setProgress(current);
    }, 15);

    return () => clearInterval(timer);
  }, [score, showPopup]);



  return (
    <section className="">
      <div className="p-3 md:p-4 lg:p-5 bg-white rounded-xl sm:rounded-2xl shadow-soft h-auto min-h-[500px] max-h-[700px] sm:max-h-[600px] lg:max-h-[500px] ">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
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
            <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
              Additional Information
            </h1>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm font-medium">
            Add relevant skills, certifications, languages, and other
            information to enhance your resume.
          </p>
        </div>

        {/* Open Sections */}
        <div className="space-y-3 sm:space-y-4 pb-8 sm:pb-10">
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
                        {/* Icon box */}
                        <div className="bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg">
                          <span className="text-[#c40116] text-lg sm:text-xl">
                            {section.icon}
                          </span>
                        </div>

                        {/* Text content */}
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
                          className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
                        >
                          <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Content */}
                    <div
                      className={`transition-all duration-500 overflow-hidden ${
                        collapseStates[section.title]
                          ? "max-h-[2000px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="p-3 sm:p-4 lg:p-5 space-y-4 sm:space-y-6 border-t border-gray-100">
                        {skillsData[section.title]?.map((skill, index) => (
                          <div
                            key={skill.id}
                            className="flex justify-between items-start gap-3 sm:gap-4 flex-col sm:flex-row"
                          >
                            {section.title === "certificationsAndLicenses" && (
                              <div className="w-full group">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                                  Certification Details
                                </label>
                                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#c40116] focus-within:ring-2 focus-within:ring-[#c40116]/20 transition-all duration-300">
                                  <Editor
                                    className="rounded-lg"
                                    value={skill.name || ""}
                                    onTextChange={(e) =>
                                      handleSkillChange(
                                        section.title,
                                        skill.id,
                                        e.htmlValue,
                                      )
                                    }
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
                                        setSkillsData((prev) => ({
                                          ...prev,
                                          [section.title]: prev[
                                            section.title
                                          ].map((s) =>
                                            s.id === skill.id
                                              ? {
                                                  ...s,
                                                  websiteUrl: e.target.value,
                                                }
                                              : s,
                                          ),
                                        }))
                                      }
                                      placeholder="https://example.com"
                                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
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
                                        setSkillsData((prev) => ({
                                          ...prev,
                                          [section.title]: prev[
                                            section.title
                                          ].map((s) =>
                                            s.id === skill.id
                                              ? {
                                                  ...s,
                                                  socialMedia: e.target.value,
                                                }
                                              : s,
                                          ),
                                        }))
                                      }
                                      placeholder="https://linkedin.com/in/username"
                                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end pt-1 sm:pt-2">
                                  <button
                                    onClick={() =>
                                      deleteSkill(section.title, skill.id)
                                    }
                                    className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
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
                                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#c40116] focus-within:ring-2 focus-within:ring-[#c40116]/20 transition-all duration-300">
                                  <Editor
                                    className="rounded-lg"
                                    value={skill.name || ""}
                                    onTextChange={(e) =>
                                      handleSkillChange(
                                        section.title,
                                        skill.id,
                                        e.htmlValue,
                                      )
                                    }
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
                                    value={skill.name}
                                    onChange={(e) =>
                                      handleSkillChange(
                                        section.title,
                                        skill.id,
                                        e.target.value,
                                      )
                                    }
                                    placeholder={`Enter ${section.heading.toLowerCase()}`}
                                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                                  />
                                  <button
                                    onClick={() =>
                                      deleteSkill(section.title, skill.id)
                                    }
                                    className="p-2 sm:p-3 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
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
                                    placeholder="Enter section name"
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                                  />
                                </div>

                                <div className="group">
                                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                                    Description
                                  </label>
                                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#c40116] focus-within:ring-2 focus-within:ring-[#c40116]/20 transition-all duration-300">
                                    <Editor
                                      className="rounded-lg"
                                      value={skill.description || ""}
                                      onTextChange={(e) =>
                                        handleSkillChange(
                                          section.title,
                                          skill.id,
                                          e.htmlValue,
                                          "description",
                                        )
                                      }
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
                                    className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
                                  >
                                    <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Add Button */}
                        {canAddNew(section.title) &&
                          ![
                            "certificationsAndLicenses",
                            "awardsAndHonors",
                            "references",
                          ].includes(section.title) && (
                            <button
                              onClick={() => addSkill(section.title)}
                              className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-[#c40116]/10 to-[#be0117]/10 text-[#c40116] font-medium hover:from-[#c40116]/20 hover:to-[#be0117]/20 transition-all duration-200 text-sm"
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
                              className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-[#c40116]/10 to-[#be0117]/10 text-[#c40116] font-medium hover:from-[#c40116]/20 hover:to-[#be0117]/20 transition-all duration-200 text-xs sm:text-base"
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
                  >
                    <div className="flex items-center justify-between gap-2 sm:gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg group-hover:from-[#c40116]/20 group-hover:to-[#be0117]/20 transition-all">
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
        <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-4 pb-2">
          <button
            onClick={checkATSScore}
            className="w-full sm:w-fit mx-auto p-2.5 sm:p-3 bg-gradient-to-r from-[#c40116] to-[#c40116]/60 text-white font-medium rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#c40116]/25 transition-all duration-300 hover:scale-[1.02] text-sm sm:text-base"
          >
            Check Your ATS Score
          </button>
        </div>

        {/* Delete Confirmation Popup */}
        {deletePopup.show && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[#c40116] to-[#be0117]"></div>

              <div className="p-4 sm:p-6 text-center">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-full w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4">
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
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteSection}
                    className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all text-sm"
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
        {showPopup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
            >
              <div className="p-1 bg-gradient-to-r from-[#c40116] to-[#be0117]"></div>

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
                  {score < 60 && "Needs improvement to pass ATS filters"}
                  {score >= 60 && score < 80 && "Good, but can be optimized"}
                  {score >= 80 && "Excellent ATS optimization!"}
                </p>

                <button
                  onClick={() => setShowPopup(false)}
                  className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
});

export default FinalizeForm;
