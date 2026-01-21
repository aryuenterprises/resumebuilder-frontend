import React, { useContext } from "react";
import Header from "../Pages/Header";
import { useState, useRef, useEffect } from "react";
import {
  FaFolder,
  FaStar,
  FaPalette,
  FaFileAlt,
  FaUser,
  FaBriefcase,
} from "react-icons/fa";
import Contact_form from "../Forms/Contact_form";
import Experience_form from "../Forms/Experience_form";
import Education_form from "../Forms/Education_form";
import Skills_form from "../Forms/Skills_form";
import Summary_form from "../Forms/Summary_form";
import Finalize_form from "../Forms/Finalize_form";
import Image6 from "../assets/images/resume6.svg.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateContext } from "../App";
import Resume1 from "../Templates/Resume1";
import Resume2 from "../Templates/Resume2";
import Resume3 from "../Templates/Resume3";
import Resume4 from "../Templates/Resume4";
import { IoArrowBackOutline } from "react-icons/io5";
import Resume5 from "../Templates/Resume5";
import Resume6 from "../Templates/Resume6";
import Resume7 from "../Templates/Resume7";
import Resume8 from "../Templates/Resume8";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import Swal from "sweetalert2";
import SubscriptionPopup from "./SubscriptionPopup";
import Loader from "./Loader";

function Resume_details() {
  const UseContext = useContext(CreateContext);
  const Allplans = UseContext?.allplandetails;

  const Contactid = UseContext?.contactid;
  // console.log("UseContextdd cvv", Contactid)

  const contactsDetails = localStorage.getItem("Resumnit_user");

  // console.log("Allplans", Allplans);

  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState("");

  const Userid = userLoggedIn?.id || userLoggedIn?._id;
  //   console.log("Userid", Userid)

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("Resumnit_user"));
    setUserLoggedIn(userdata);
  }, []);

  const contactRef = useRef();

  const experienceRef = useRef();
  const educationRef = useRef();
  const skillsRef = useRef();
  const summaryRef = useRef();
  const finalizeRef = useRef();

  // let UseContext = useContext(CreateContext)
  // console.log("UseContextdd", UseContext)

  const location = useLocation();
  const templateId = location.state?.templateId.id;

  const tabsData = [
    { id: "contacts", name: "Contacts" },
    { id: "experience", name: "Experience" },
    { id: "education", name: "Education" },
    { id: "skills", name: "Skills" },
    { id: "summary", name: "Summary" },
    { id: "finalize", name: "Finalize" },
  ];

  const tabWidths = {
    contacts: 5,
    experience: 25,
    education: 43,
    skills: 60,
    summary: 77,
    finalize: 99,
  };

  const [activeTab, setActiveTab] = useState("contacts");

  const setAllTaskDetails = (tab) =>
    console.log("Setting task details for:", tab.id);

  const renderTabContent = () => {
    switch (activeTab) {
      case "contacts":
        return <Contact_form ref={contactRef} />;
      case "experience":
        return <Experience_form ref={experienceRef} />;
      case "education":
        return <Education_form ref={educationRef} />;
      case "skills":
        return <Skills_form ref={skillsRef} />;
      case "summary":
        return <Summary_form ref={summaryRef} />;
      case "finalize":
        return <Finalize_form ref={finalizeRef} />;
      default:
        return null;
    }
  };
  const currentIndex = tabsData.findIndex((tab) => tab.id === activeTab);

  const nextTab = tabsData[currentIndex + 1];
  const prevTab = tabsData[currentIndex - 1];

  const handleNext = async () => {
    if (!Userid) {
      Swal.fire({
        icon: "warning",
        title: "Please login first",
        text: "You need to log in to continue.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/loging");
      });
      return;
    }
    let success = true;

    if (activeTab === "contacts" && contactRef.current)
      success = await contactRef.current.handleSubmit();
    else if (activeTab === "experience" && experienceRef.current)
      success = await experienceRef.current.handleSubmit();
    else if (activeTab === "education" && educationRef.current)
      success = await educationRef.current.handleSubmit();
    else if (activeTab === "skills" && skillsRef.current)
      success = await skillsRef.current.handleSubmit();
    else if (activeTab === "summary" && summaryRef.current)
      success = await summaryRef.current.handleSubmit();
    else if (activeTab === "finalize" && finalizeRef.current)
      success = await finalizeRef.current.handleSubmit();

    if (activeTab === "finalize" && success) {
      return true;
    }

    if (success && nextTab) {
      setActiveTab(nextTab.id);
    }
    return false;
  };

  const handleBack = () => {
    if (prevTab) setActiveTab(prevTab.id);
  };

  // resume componet

  const resumeComponents = [
    { id: 1, name: "Modern Resume", component: <Resume1 /> },
    { id: 2, name: "Classic Resume", component: <Resume2 /> },
    { id: 3, name: "Minimal Resume", component: <Resume3 /> },
    { id: 4, name: "Professional Resume", component: <Resume4 /> },
    { id: 5, name: "Creative Resume", component: <Resume5 /> },
    { id: 6, name: "Creative Resume", component: <Resume6 /> },

    // { id: 7, name: "Creative Resume", component: <Resume7 /> },

    { id: 8, name: "Creative Resume", component: <Resume8 /> },
  ];

  // const selectedResume = resumeComponents.find(
  //     (resume) => resume.id === templateId
  // );

  const selectedResume = resumeComponents.find(
    (resume) => resume.id === Number(templateId)
  );

  const clickchoosetemplate = () => {
    navigate("/choose-template");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clickchangetemplate = () => {
    navigate("/change-template");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [showPopup, setShowPopup] = useState(false);

  // useEffect(() => {
  //     setShowPopup(true);
  // }, []);

  //     useEffect(() => {
  //     if (!Allplans || Allplans.length === 0) {
  //         setShowPopup(true);
  //     } else {
  //         setShowPopup(false);
  //     }
  // }, [Allplans]);

  const [loading, setLoading] = useState(true); // new state

  useEffect(() => {
    // Simulate data fetching or check
    setLoading(true); // start loader

    if (!Allplans || Allplans.length === 0) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }

    setLoading(false); // stop loader
  }, [Allplans]);

  return (
    <section className="scrollbar-red bg-[#eff2f9]/50 flex  h-[100vh] overflow-hidden p-0 md:p-3 ">
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <SubscriptionPopup
            show={showPopup}
            onClose={() => setShowPopup(false)}
          /> */}

          {/* left tab  */}
          <div className=" w-full md:w-[50%] flex flex-col   gap-2 ">
            <div className="bg-white flex-1  rounded-lg  overflow-auto ">
          
              {/* steppers */}
              <div className="relative w-full overflow-x-auto scrollbar-hide">
                {/* Tabs + Dots container */}
                <div className="flex justify-between items-center relative z-10">
                  {tabsData.map((tab, index) => {
                    const isActive = tab.id === activeTab;
                    return (
                      <div
                        key={tab.id}
                        className="flex flex-col items-center flex-shrink-0"
                        style={{ width: `${100 / tabsData.length}%` }}
                      >
                        {/* Tab Label - Ultra compact on mobile */}
                        <button
                          onClick={() => {
                            setActiveTab(tab.id);
                            setAllTaskDetails(tab);
                          }}
                          className={`
              w-full px-1 py-1.5
              text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-[16px]
              font-medium text-center
              transition-all duration-200 ease-in-out whitespace-nowrap
              truncate overflow-hidden
              ${
                isActive
                  ? "text-[#C40116] font-semibold"
                  : "text-gray-600 hover:text-[#C40116]"
              }
              active:scale-95
            `}
                        >
                          {tab.name}
                        </button>

                        {/* Dot Indicator - Scales with screen */}
                        <div
                          className={`
              w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3
              rounded-full mt-0.5 sm:mt-1 z-10 flex-shrink-0
              transition-all duration-300 ease-in-out
              ${
                isActive
                  ? "border border-[#C40116] bg-[#C40116]"
                  : "border border-gray-300 bg-gray-300"
              }
            `}
                        ></div>
                      </div>
                    );
                  })}
                </div>

                {/* Base line */}
                <div className="absolute left-0 right-0 bottom-[3px] xs:bottom-[4px] sm:bottom-[5px] md:bottom-[6px] h-[1px] bg-gray-200"></div>

                {/* Animated Progress Line */}
                <div
                  className="absolute bottom-[3px] xs:bottom-[4px] sm:bottom-[5px] md:bottom-[6px] h-[1px] bg-[#C40116] transition-all duration-500 ease-in-out"
                  style={{
                    width: `${tabWidths[activeTab] || 0}%`,
                    left: "0",
                  }}
                ></div>
              </div>
              <div className="mt-2">{renderTabContent()}</div>
            </div>

            {/* perivous */}
            <div className="bg-white p-4  text-right rounded-lg  relative  ">
              <div className="flex justify-between">
                {prevTab && (
                  <button
                    className="bg-gray-200 text-[#374151] border border-gray-300 text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg mr-3 font-nunito font-semibold hover:bg-gray-100 transition-colors duration-300"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                )}

                {activeTab === "finalize" ? (
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold  transition-colors duration-300"
                    onClick={async () => {
                      const success = await handleNext();
                      console.log("handleNext returned:", success);
                      if (success) {
                        navigate("/pdf-download", {
                          state: { contactid: Contactid },
                        });
                      }
                    }}
                  >
                    Download
                  </button>
                ) : (
                  nextTab && (
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white text-sm md:text-base px-4 py-1 md:px-6 md:py-2 rounded-lg font-nunito font-semibold s transition-colors duration-300"
                      onClick={handleNext}
                    >
                      Next {nextTab.name}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* right resume */}
          <div className="flex shrink w-[50%] max-md:hidden h-screen justify-center font-nunito items-start p-4 overflow-y-auto">
            {/* <button
              onClick={clickchangetemplate}
              className="absolute top-4 right-8 z-40 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#C40116] to-[#5E000B]  rounded-lg text-white font-medium transition-all"
            >
              <HiOutlineSquares2X2 size={18} />
              Change Template
            </button> */}

            <div
              className="flex justify-center items-start w-full"
              style={{
                paddingTop: "1rem", // optional spacing from top
                paddingBottom: "1rem", // optional spacing from top
              }}
            >
              <div
                className="w-full"
                style={{
                  // transform: "scale(0.8)",
                  transformOrigin: "top center",
                  width: "100%",
                  backgroundColor: "white",
                  height: "297mm",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                  background: "white",
                  borderRadius: "8px",
                }}
              >
                {selectedResume ? (
                  selectedResume.component
                ) : (
                  <p className="text-center text-gray-500 mt-20">
                    No matching resume template found
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Resume_details;
