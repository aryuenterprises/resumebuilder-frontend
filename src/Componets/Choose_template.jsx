import React, { useContext } from "react";
// import { useState } from 'react'
import { FaThLarge, FaList } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import Image1 from "../assets/images/resume1.svg.svg";
import Image2 from "../assets/images/resume2.svg.svg";
import Image3 from "../assets/images/resume3.svg.svg";
import Image4 from "../assets/images/resume4.svg.svg";
import Image5 from "../assets/images/resume5.svg.svg";
import Image6 from "../assets/images/resume6.svg.svg";
import Image7 from "../assets/images/resume7.svg.svg";
import Image8 from "../assets/images/resume8.svg.svg";
import { Description } from "@headlessui/react";

import {
  FaFolder,
  FaStar,
  FaPalette,
  FaFileAlt,
  FaUser,
  FaBriefcase,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../Pages/Footer";
import Header from "../Pages/Header";
import { CreateContext } from "../App";
import SubscriptionPopup from "./SubscriptionPopup";
import CrownIcon from "./CrownIcon";
import Loader from "./Loader";
import ResumePreviewModal from "./ResumePreviewModal";

function Choose_template() {
  const UseContext = useContext(CreateContext);
  const Allplans = UseContext?.allplandetails;
  const allPlanStatusDetails = UseContext?.allPlanStatusDetails;

  const navigate = useNavigate();
  const clickresumedetails = (templateId) => {
    navigate("/resume-details", { state: { templateId } });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // let UseContext = useContext(CreateContext)

  const steps = [
    { id: 1, name: "Choose template" },
    { id: 2, name: "Enter your details" },
    { id: 3, name: "Download resume" },
  ];

  const [hasPlan, setHasPlan] = useState(false);

  useEffect(() => {
    if (
      Allplans === undefined ||
      Allplans === null ||
      Allplans === "FREE" ||
      (Array.isArray(Allplans) && Allplans.length === 0) ||
      allPlanStatusDetails !== "succeeded"
    ) {
      setHasPlan(false);
    } else {
      setHasPlan(true);
    }
  }, [Allplans]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // const hasPlan = Allplans && Allplans.length > 0 && allPlanStatusDetails === "succeeded";

  const handleUnlockClick = (e, template) => {
    e.stopPropagation();
    setSelectedTemplate(template);
    setShowPopup(true);
  };

  //  When unlock is successful
  const on = () => {
    setShowPopup(false);

    // Optional: update your Allplans context here if needed

    if (selectedTemplate) {
      clickresumedetails(selectedTemplate.id);
      setSelectedTemplate(null);
    }
  };

  const tabsData = [
    {
      id: "all",
      name: "All Templates",
      icon: <FaFolder className="inline-block mr-2" />, // Folder icon

      templateTitle: "Explore All Resume Styles",
      templateDescription:
        "A comprehensive collection of all our professional, modern, and simple resume designs.",
      templates: [
        {
          id: 4,
          style: "Free",
          image: Image1,
          description:
            "A sleek, contemporary design with bold headings and clean lines.",
          temp: "free",
        },
        {
          id: 3,
          style: "The Innovator",
          image: Image2,
          description: "Professional layout with modern typography.",
          temp: "paid",
        },
        {
          id: 5,
          style: "The Global Starter",
          image: Image3,
          description: "Minimalist style emphasizing clarity and simplicity.",
          temp: "paid",
        },
        {
          id: 6,
          style: "The Scholar",
          image: Image4,
          description: "Creative design with eye-catching sections.",
          temp: "paid",
        },
        {
          id: 1,
          style: "The Creator",
          image: Image5,
          description: "Structured layout with clear hierarchy.",
          pic: "true",
          temp: "paid",
        },
        {
          id: 2,
          style: "Corporate",
          image: Image6,
          description: "Elegant design with professional fonts and spacing.",
          pic: "true",
          temp: "paid",
        },

        {
          id: 8,
          style: "The Analyst",
          image: Image8,
          description: "Creative design with eye-catching sections.",
          temp: "paid",
        },
      ],
    },
    {
      id: "simple",
      name: "Simple",
      icon: <FaStar className="inline-block mr-2" />, // Star icon

      templateTitle: "Clean and Minimal Templates",
      templateDescription:
        "For a straightforward, distraction-free, and effective presentation of your career history.",
      templates: [
        {
          id: 1,
          style: "Daniel Carter",
          image: Image5,
          description: "Structured layout with clear hierarchy.",
          pic: "true",
        },
        {
          id: 4,
          style: "Kelly Blackwell",
          image: Image1,
          description:
            "A sleek, contemporary design with bold headings and clean lines.",
        },
        // { id: 7, style: 'Samantha Williams', image: Image7, description: "Minimalist style emphasizing clarity and simplicity." },
        {
          id: 2,
          style: "Emma Johnson",
          image: Image6,
          description: "Elegant design with professional fonts and spacing.",
          pic: "true",
        },
        {
          id: 5,
          style: "Samantha Williams",
          image: Image3,
          description: "Minimalist style emphasizing clarity and simplicity.",
        },
        {
          id: 8,
          style: "Olivia Taylor",
          image: Image8,
          description: "Creative design with eye-catching sections.",
        },
        {
          id: 6,
          style: "Olivia Taylor",
          image: Image4,
          description: "Creative design with eye-catching sections.",
        },
        {
          id: 3,
          style: "Howard Jones",
          image: Image2,
          description: "Professional layout with modern typography.",
        },
      ],
    },
    {
      id: "modern",
      name: "Modern",
      icon: <FaPalette className="inline-block mr-2" />, // Palette icon

      templateTitle: "Contemporary Design Resumes",
      templateDescription:
        "Templates featuring bold layouts, distinct typography, and unique visual elements.",
      templates: [
        {
          id: 3,
          style: "Howard Jones",
          image: Image2,
          description: "Professional layout with modern typography.",
        },
        {
          id: 6,
          style: "Olivia Taylor",
          image: Image4,
          description: "Creative design with eye-catching sections.",
        },
        {
          id: 1,
          style: "Daniel Carter",
          image: Image5,
          description: "Structured layout with clear hierarchy.",
          pic: "true",
        },
        {
          id: 8,
          style: "Olivia Taylor",
          image: Image8,
          description: "Creative design with eye-catching sections.",
        },
        {
          id: 4,
          style: "Kelly Blackwell",
          image: Image1,
          description:
            "A sleek, contemporary design with bold headings and clean lines.",
        },
        {
          id: 2,
          style: "Emma Johnson",
          image: Image6,
          description: "Elegant design with professional fonts and spacing.",
          pic: "true",
        },
        // { id: 7, style: 'Samantha Williams', image: Image7, description: "Minimalist style emphasizing clarity and simplicity." },
        {
          id: 5,
          style: "Samantha Williams",
          image: Image3,
          description: "Minimalist style emphasizing clarity and simplicity.",
        },
      ],
    },
    {
      id: "one-column",
      name: "One column",
      icon: <FaFileAlt className="inline-block mr-2" />, // File icon

      templateTitle: "Focused Single Column Layouts",
      templateDescription:
        "Ideal for linear reading and when space needs to be utilized vertically without complex sidebars.",
      templates: [
        {
          id: 5,
          style: "Samantha Williams",
          image: Image3,
          description: "Minimalist style emphasizing clarity and simplicity.",
        },
        {
          id: 2,
          style: "Emma Johnson",
          image: Image6,
          description: "Elegant design with professional fonts and spacing.",
          pic: "true",
        },
        {
          id: 3,
          style: "Howard Jones",
          image: Image2,
          description: "Professional layout with modern typography.",
        },
        // { id: 7, style: 'Samantha Williams', image: Image7, description: "Minimalist style emphasizing clarity and simplicity." },
        {
          id: 4,
          style: "Kelly Blackwell",
          image: Image1,
          description:
            "A sleek, contemporary design with bold headings and clean lines.",
        },
        {
          id: 1,
          style: "Daniel Carter",
          image: Image5,
          description: "Structured layout with clear hierarchy.",
          pic: "true",
        },
        {
          id: 8,
          style: "Olivia Taylor",
          image: Image8,
          description: "Creative design with eye-catching sections.",
        },
        {
          id: 6,
          style: "Olivia Taylor",
          image: Image4,
          description: "Creative design with eye-catching sections.",
        },
      ],
    },
    {
      id: "photo",
      name: "With photo",
      icon: <FaUser className="inline-block mr-2" />, // User icon

      templateTitle: "Templates Designed for a Headshot",
      templateDescription:
        "Incorporate your professional picture seamlessly into the design to add a personal touch.",
      templates: [
        {
          id: 8,
          style: "Olivia Taylor",
          image: Image8,
          description: "Creative design with eye-catching sections.",
        },
        {
          id: 1,
          style: "Daniel Carter",
          image: Image5,
          description: "Structured layout with clear hierarchy.",
          pic: "true",
        },
        {
          id: 6,
          style: "Olivia Taylor",
          image: Image4,
          description: "Creative design with eye-catching sections.",
        },
        {
          id: 5,
          style: "Samantha Williams",
          image: Image3,
          description: "Minimalist style emphasizing clarity and simplicity.",
        },
        {
          id: 2,
          style: "Emma Johnson",
          image: Image6,
          description: "Elegant design with professional fonts and spacing.",
          pic: "true",
        },
        {
          id: 3,
          style: "Howard Jones",
          image: Image2,
          description: "Professional layout with modern typography.",
        },
        {
          id: 4,
          style: "Kelly Blackwell",
          image: Image1,
          description:
            "A sleek, contemporary design with bold headings and clean lines.",
        },
        // { id: 7, style: 'Samantha Williams', image: Image7, description: "Minimalist style emphasizing clarity and simplicity." },
      ],
    },
    {
      id: "professional",
      name: "Professional",
      icon: <FaBriefcase className="inline-block mr-2" />, // Briefcase icon

      templateTitle: "Classic Corporate Resumes",
      templateDescription:
        "Time-tested, elegant, and industry-standard formats perfect for any senior or traditional role.",
      templates: [
        // { id: 7, style: 'Samantha Williams', image: Image7, description: "Minimalist style emphasizing clarity and simplicity." },
        {
          id: 5,
          style: "Samantha Williams",
          image: Image3,
          description: "Minimalist style emphasizing clarity and simplicity.",
        },
        {
          id: 8,
          style: "Olivia Taylor",
          image: Image8,
          description: "Creative design with eye-catching sections.",
        },
        {
          id: 2,
          style: "Emma Johnson",
          image: Image6,
          description: "Elegant design with professional fonts and spacing.",
          pic: "true",
        },
        {
          id: 6,
          style: "Olivia Taylor",
          image: Image4,
          description: "Creative design with eye-catching sections.",
        },
        {
          id: 4,
          style: "Kelly Blackwell",
          image: Image1,
          description:
            "A sleek, contemporary design with bold headings and clean lines.",
        },
        {
          id: 3,
          style: "Howard Jones",
          image: Image2,
          description: "Professional layout with modern typography.",
        },
        {
          id: 1,
          style: "Daniel Carter",
          image: Image5,
          description: "Structured layout with clear hierarchy.",
          pic: "true",
        },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState("all");
  const [allTaskDetails, setAllTaskDetails] = useState(tabsData[0]);
  // console.log("act,iveallTaskDetailsTab", allTaskDetails)
  const [underlineStyle, setUnderlineStyle] = useState({
    width: 0,
    transform: "translateX(0px)",
  });

  // Ref to hold all tab buttons
  const tabRefs = useRef([]);
  // Ref to hold the container for calculating relative position
  const containerRef = useRef(null);

  // Effect to calculate and update the underline position/width
  useEffect(() => {
    if (containerRef.current && tabRefs.current.length > 0) {
      const activeTabElement = tabRefs.current.find(
        (ref) => ref && ref.dataset.tabId === activeTab,
      );

      if (activeTabElement) {
        const containerLeft = containerRef.current.getBoundingClientRect().left;
        const activeTabLeft = activeTabElement.getBoundingClientRect().left;

        setUnderlineStyle({
          width: activeTabElement.offsetWidth,
          transform: `translateX(${activeTabLeft - containerLeft}px)`,
        });
      }
    }
  }, [activeTab]);

  const currentTab = tabsData.find((tab) => tab.id === activeTab);

  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const shouldLockScroll = showPreview || showPopup;

    if (shouldLockScroll) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showPopup, showPreview]);

  console.log(showPopup);
  console.log(showPreview);

  return (
    <section className="bg-white">
      <div>
        <Header />

        {/* Hero */}
        <section className="relative max-w-7xl mx-auto px-4 md:px-6 pt-8 sm:pt-20 md:pt-24 pb-7 sm:pb-16 md:pb-20 text-center">
          <h1 className="text-2xl sm:text-3xl  md:text-5xl lg:text-6xl xl:text-7xl font-bold md:font-extrabold tracking-tight text-gray-900 leading-tight">
            Build a Resume that
            <span className="block bg-clip-text text-transparent bg-gradient-to-b from-black to-red-500 sm:mt-2">
              Gets You Hired
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto px-2">
            Choose from beautifully designed ATS-friendly templates crafted by
            hiring experts.
          </p>
        </section>

        {/* Floating Progress Bar */}
        <div className="mt-4 sm:mt-5 max-lg:hidden z-50 max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="backdrop-blur-xl bg-white/70 border border-gray-200 rounded-xl sm:rounded-2xl shadow-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4">
            <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto pb-2">
              {steps.map((step, index) => {
                return (
                  <React.Fragment key={step.id}>
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
                      <div
                        className={`w-8 h-8  rounded-full flex items-center justify-center font-bold transition-all duration-500 text-sm sm:text-base
                   bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] sm:shadow-[0_0_20px_rgba(239,68,68,0.4)] "
                     
                   }`}
                      >
                        {step.id}
                      </div>

                      <span
                        className={`text-sm sm:text-base md:text-lg whitespace-nowrap text-gray-900 font-medium                    }`}
                      >
                        {step.name}
                      </span>
                    </div>

                    {index < steps.length - 1 && (
                      <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-[2px] bg-gradient-to-r from-red-400 to-rose-400 opacity-50 rounded-full flex-shrink-0" />
                    )}
                  </React.Fragment>
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
                Choose Your Resume Template
              </h2>
              <p className="mt-2 sm:mt-3 md:mt-4 text-gray-600 text-sm sm:text-base md:text-lg max-w-lg sm:max-w-xl md:max-w-2xl mx-auto px-2">
                Beautifully crafted, recruiter-approved resume templates built
                for success.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {currentTab?.templates.map((template) => {
                const isFree = template.temp === "free";
                const isLocked = !hasPlan && !isFree;

                return (
                  <div
                    key={template.id}
                    className="group relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl border border-gray-200 overflow-hidden hover:border-red-200 hover:shadow-[0_15px_40px_rgba(196,1,22,0.10)] sm:hover:shadow-[0_20px_50px_rgba(196,1,22,0.10)] md:hover:shadow-[0_25px_60px_rgba(196,1,22,0.10)] transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative bg-[#fff5f6] p-4 sm:p-6 md:p-8">
                      {!isFree && (
                        <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-white text-red-600 border border-red-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold shadow-sm">
                          PREMIUM
                        </div>
                      )}

                      <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-white border border-gray-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                        ATS Friendly
                      </div>

                      <img
                        src={template.image}
                        alt={template.style}
                        className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[340px] object-contain group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Hover Actions */}
                      <div className="absolute inset-0 lg:bg-white/5 lg:backdrop-blur-sm flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 p-3 sm:p-4">
                        <button
                          onClick={() => {
                            setPreviewTemplate(template);
                            setShowPreview(true);
                          }}
                          className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl bg-white text-[#c40116] border border-[#c40116] font-semibold text-xs sm:text-sm md:text-base shadow hover:scale-105 transition"
                        >
                          Live Preview
                        </button>

                        {isLocked ? (
                          <button
                            onClick={(e) => {
                              // e.stopPropagation();
                              // handleUnlockClick(e, template);

                              clickresumedetails(template);
                            }}
                            className="px-3 sm:px-4 md:px-5 lg:px-7 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#c40116] to-[#be0117] text-white font-semibold text-xs sm:text-sm md:text-base shadow-lg sm:shadow-xl hover:scale-105 transition-transform flex items-center gap-1 sm:gap-2 cursor-default"
                          >
                            Coming Soon
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              clickresumedetails(template);
                            }}
                            className="px-3 sm:px-4 md:px-5 lg:px-7 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#c40116] to-[#be0117] text-white font-semibold text-xs sm:text-sm md:text-base shadow-lg sm:shadow-xl hover:scale-105 transition-transform"
                          >
                            Use This Template
                          </button>
                        )}
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

                      <div className="mt-4 sm:mt-5 md:mt-6 flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-semibold text-gray-500">
                          {isFree ? "Free Template" : "Premium Template"}
                        </span>

                        {!isFree && (
                          <span className="bg-red-100 text-red-600 text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                            Coming Soon
                          </span>
                        )}
                      </div>
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
                if (!isLoggedIn) {
                  openLoginModal();
                  return;
                }
                clickresumedetails(previewTemplate);
              }}
            />

            {/* Subscription Popup */}
            <SubscriptionPopup
              show={showPopup}
              onClose={() => {
                setShowPopup(false);
                setSelectedTemplate(null);
              }}
              template={selectedTemplate}
            />
          </div>
        </section>

        <Footer />
      </div>
    </section>
  );
}

export default Choose_template;
