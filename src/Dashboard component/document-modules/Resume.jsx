import React, { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import Header_Dashboard from "../Header_Dashboard";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import { FaFolder, FaStar, FaPalette, FaFileAlt, FaUser, FaBriefcase } from "react-icons/fa";
import Image1 from '../../assets/images/resume1.svg.svg'
import Image2 from '../../assets/images/resume2.svg.svg'
import Image3 from '../../assets/images/resume3.svg.svg'
import Image4 from '../../assets/images/resume4.svg.svg'
import Image5 from '../../assets/images/resume5.svg.svg'
import Image6 from '../../assets/images/resume6.svg.svg'
import Image7 from '../../assets/images/resume7.svg.svg'
import Image8 from '../../assets/images/resume8.svg.svg'
import { CreateContext } from "../../App";
import SubscriptionPopup from "../../Componets/SubscriptionPopup";
import CrownIcon from "../../Componets/CrownIcon";
import Loader from "../../Componets/Loader";
import axios from "axios";
import { API_URL } from "../../Config";

const Resume = () => {
  const UseContext = useContext(CreateContext);
  const Allplans = UseContext?.allplandetails;
  const allPlanStatusDetails = UseContext?.allPlanStatusDetails;

  const [activeTab, setActiveTab] = useState("Resumes");
  const navigate = useNavigate();

  const [userLoggedIn, setUserLoggedIn] = useState(null)

  const [userId, setUserId] = useState("");


  // useEffect(() => {

  //   const userdata = JSON.parse(localStorage.getItem("Resumnit_user"))
  //   setUserLoggedIn(userdata)
  //   setUserId(userdata?.id || "")

  // }, [])

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clickresumedetails = (templateId) => {
    navigate("/resume-details", { state: { templateId } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // let UseContext = useContext(CreateContext);
  // console.log(UseContext);

  const steps = [
    { id: 1, name: "Choose template" },
    { id: 2, name: "Enter your details" },
    { id: 3, name: "Download resume" },
  ];

  const [loading, setLoading] = useState(true);

  const [hasPlan, setHasPlan] = useState(false);


  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

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

    return () => clearTimeout(timer);
  }, [Allplans]);




  const [showPopup, setShowPopup] = useState(false);
  // const [selectedTemplate, setSelectedTemplate] = useState(null);

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
      id: 'all',
      name: 'All Templates',
      icon: <FaFolder className="inline-block mr-2" />, // Folder icon

      templateTitle: 'Explore All Resume Styles',
      templateDescription: 'A comprehensive collection of all our professional, modern, and simple resume designs.',
      templates: [
        { id: 4, style: 'Kelly Blackwell', image: Image1, description: "A sleek, contemporary design with bold headings and clean lines.", temp: "free", },
        { id: 3, style: 'Howard Jones', image: Image2, description: "Professional layout with modern typography.", temp: "paid", },
        { id: 5, style: 'Samantha Williams', image: Image3, description: "Minimalist style emphasizing clarity and simplicity.", temp: "paid", },
        { id: 6, style: 'Olivia Taylor', image: Image4, description: "Creative design with eye-catching sections.", temp: "paid", },
        { id: 1, style: 'Daniel Carter', image: Image5, description: "Structured layout with clear hierarchy.", pic: "true", temp: "paid", },
        { id: 2, style: 'Emma Johnson', image: Image6, description: "Elegant design with professional fonts and spacing.", pic: "true", temp: "paid", },
        // { id: 7, style: 'Samantha Williams', image: Image7, description: "Minimalist style emphasizing clarity and simplicity." },
        { id: 8, style: 'Olivia Taylor', image: Image8, description: "Creative design with eye-catching sections.", temp: "paid", },

      ],
    },
    {
      id: 'simple',
      name: 'Simple',
      icon: <FaStar className="inline-block mr-2" />, // Star icon

      templateTitle: 'Clean and Minimal Templates',
      templateDescription: 'For a straightforward, distraction-free, and effective presentation of your career history.',
      templates: [
        { id: 1, style: 'Daniel Carter', image: Image5, description: "Structured layout with clear hierarchy.", pic: "true" },
        { id: 4, style: 'Kelly Blackwell', image: Image1, description: "A sleek, contemporary design with bold headings and clean lines." },
        // { id: 7, style: 'Samantha Williams', image: Image7, description: "Minimalist style emphasizing clarity and simplicity." },
        { id: 2, style: 'Emma Johnson', image: Image6, description: "Elegant design with professional fonts and spacing.", pic: "true" },
        { id: 5, style: 'Samantha Williams', image: Image3, description: "Minimalist style emphasizing clarity and simplicity." },
        { id: 8, style: 'Olivia Taylor', image: Image8, description: "Creative design with eye-catching sections." },
        { id: 6, style: 'Olivia Taylor', image: Image4, description: "Creative design with eye-catching sections." },
        { id: 3, style: 'Howard Jones', image: Image2, description: "Professional layout with modern typography." },
      ],
    },
    {
      id: 'modern',
      name: 'Modern',
      icon: <FaPalette className="inline-block mr-2" />, // Palette icon

      templateTitle: 'Contemporary Design Resumes',
      templateDescription: 'Templates featuring bold layouts, distinct typography, and unique visual elements.',
      templates: [
        { id: 3, style: 'Howard Jones', image: Image2, description: "Professional layout with modern typography." },
        { id: 6, style: 'Olivia Taylor', image: Image4, description: "Creative design with eye-catching sections." },
        { id: 1, style: 'Daniel Carter', image: Image5, description: "Structured layout with clear hierarchy.", pic: "true" },
        { id: 8, style: 'Olivia Taylor', image: Image8, description: "Creative design with eye-catching sections." },
        { id: 4, style: 'Kelly Blackwell', image: Image1, description: "A sleek, contemporary design with bold headings and clean lines." },
        { id: 2, style: 'Emma Johnson', image: Image6, description: "Elegant design with professional fonts and spacing.", pic: "true" },
        // { id: 7, style: 'Samantha Williams', image: Image7, description: "Minimalist style emphasizing clarity and simplicity." },
        { id: 5, style: 'Samantha Williams', image: Image3, description: "Minimalist style emphasizing clarity and simplicity." },
      ]
      ,
    },
    {
      id: 'one-column',
      name: 'One column',
      icon: <FaFileAlt className="inline-block mr-2" />, // File icon

      templateTitle: 'Focused Single Column Layouts',
      templateDescription: 'Ideal for linear reading and when space needs to be utilized vertically without complex sidebars.',
      templates: [
        { id: 5, style: 'Samantha Williams', image: Image3, description: "Minimalist style emphasizing clarity and simplicity." },
        { id: 2, style: 'Emma Johnson', image: Image6, description: "Elegant design with professional fonts and spacing.", pic: "true" },
        { id: 3, style: 'Howard Jones', image: Image2, description: "Professional layout with modern typography." },
        // { id: 7, style: 'Samantha Williams', image: Image7, description: "Minimalist style emphasizing clarity and simplicity." },
        { id: 4, style: 'Kelly Blackwell', image: Image1, description: "A sleek, contemporary design with bold headings and clean lines." },
        { id: 1, style: 'Daniel Carter', image: Image5, description: "Structured layout with clear hierarchy.", pic: "true" },
        { id: 8, style: 'Olivia Taylor', image: Image8, description: "Creative design with eye-catching sections." },
        { id: 6, style: 'Olivia Taylor', image: Image4, description: "Creative design with eye-catching sections." },
      ]
      ,
    },
    {
      id: 'photo',
      name: 'With photo',
      icon: <FaUser className="inline-block mr-2" />, // User icon

      templateTitle: 'Templates Designed for a Headshot',
      templateDescription: 'Incorporate your professional picture seamlessly into the design to add a personal touch.',
      templates: [
        { id: 8, style: 'Olivia Taylor', image: Image8, description: "Creative design with eye-catching sections." },
        { id: 1, style: 'Daniel Carter', image: Image5, description: "Structured layout with clear hierarchy.", pic: "true" },
        { id: 6, style: 'Olivia Taylor', image: Image4, description: "Creative design with eye-catching sections." },
        { id: 5, style: 'Samantha Williams', image: Image3, description: "Minimalist style emphasizing clarity and simplicity." },
        { id: 2, style: 'Emma Johnson', image: Image6, description: "Elegant design with professional fonts and spacing.", pic: "true" },
        { id: 3, style: 'Howard Jones', image: Image2, description: "Professional layout with modern typography." },
        { id: 4, style: 'Kelly Blackwell', image: Image1, description: "A sleek, contemporary design with bold headings and clean lines." },
        // { id: 7, style: 'Samantha Williams', image: Image7, description: "Minimalist style emphasizing clarity and simplicity." },
      ]
      ,
    },
    {
      id: 'professional',
      name: 'Professional',
      icon: <FaBriefcase className="inline-block mr-2" />, // Briefcase icon

      templateTitle: 'Classic Corporate Resumes',
      templateDescription: 'Time-tested, elegant, and industry-standard formats perfect for any senior or traditional role.',
      templates: [
        // { id: 7, style: 'Samantha Williams', image: Image7, description: "Minimalist style emphasizing clarity and simplicity." },
        { id: 5, style: 'Samantha Williams', image: Image3, description: "Minimalist style emphasizing clarity and simplicity." },
        { id: 8, style: 'Olivia Taylor', image: Image8, description: "Creative design with eye-catching sections." },
        { id: 2, style: 'Emma Johnson', image: Image6, description: "Elegant design with professional fonts and spacing.", pic: "true" },
        { id: 6, style: 'Olivia Taylor', image: Image4, description: "Creative design with eye-catching sections." },
        { id: 4, style: 'Kelly Blackwell', image: Image1, description: "A sleek, contemporary design with bold headings and clean lines." },
        { id: 3, style: 'Howard Jones', image: Image2, description: "Professional layout with modern typography." },
        { id: 1, style: 'Daniel Carter', image: Image5, description: "Structured layout with clear hierarchy.", pic: "true" },
      ]
      ,
    },
  ];


  const [allTaskDetails, setAllTaskDetails] = useState(tabsData[0]);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, transform: "translateX(0px)" });
  const tabRefs = useRef([]);
  const containerRef = useRef(null);

  const currentTab = tabsData.find((tab) => tab.id === "all");


  const showResumeTemplates = activeTab === "Resumes";
  const showCoverLetters = activeTab === "Cover Letters";

  const [allTemplateDetails, setAllTemplateDetails] = useState([]);


  const templates = [
    { id: 4, img: Image1, name: "Free", temp: "free" },
    { id: 3, img: Image2, name: "The Innovator", temp: "paid", },
    { id: 5, img: Image3, name: "The Global Starter", temp: "paid", },
    { id: 6, img: Image4, name: "The Scholar", temp: "paid", },
    { id: 1, img: Image5, name: "The Creator", pic: "true", temp: "paid", },
    { id: 2, img: Image6, name: "Corporate", pic: "true", temp: "paid", },
    // { id: 7, img: Image7, name: "sixe" },
    { id: 8, img: Image8, name: "The Analyst", temp: "paid", },
    
  ];


  useEffect(() => {

    fetchTemplate();
  }, []);
  const fetchTemplate = async () => {

    const userdata = JSON.parse(localStorage.getItem("Resumnit_user"))
    // const userId = userdata?.id
    const userId = userdata?.id || userdata?._id;
    // console.log("userIdkududa",userId)
    try {
      const response = await axios.get(
        `${API_URL}/api/contact-resume/all-contact/${userId}`
      );

      // console.log("responseaaa", response);

      // const data = response.data?.data || response.data;
      setAllTemplateDetails(response.data);


    } catch (error) {
      console.log(error);
    }
  };




  // Step 1: Get templateId from API data
  // const selectedTemplateId = allTemplateDetails?.find(
  //   (item) => item.templateId
  // )?.templateId;

  // // Step 2: Match with templates list
  // const selectedTemplate = templates.find(
  //   (t) => t.id === Number(selectedTemplateId)
  // );
  // console.log("selectedTemplate",selectedTemplate)


  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Header */}
          
            <Header_Dashboard />
       

          {/* Main Section */}
          <div className="flex flex-1 w-full">
            {/* Sidebar */}
            <div className="lg:w-[18%] bg-white border-r sticky border-gray-200">
              <Sidebar />
            </div>

            {/*  Main Content Section */}
            <div className="w-full bg-[#ffffff] px-4 md:px-10 lg:px-20 p-14">
              {/* Page Title */}
              <div className="flex justify-between items-center flex-wrap md:flex-nowrap">
                <h1 className="text-[25px] font-serif font-bold text-gray-800">Your documents</h1>
                <div
                  className="flex justify-center bg-[#1fadff] hover:bg-[#05a3ff] text-white font-semibold gap-3 px-6 py-2 rounded-lg shadow transition-all duration-300 items-center cursor-pointer"
                  onClick={() => handleNavigate("/choose-template")}
                >
                  <MdOutlineAddCircleOutline className="size-5" />
                  <p>New Resume</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-6 border-b border-gray-200  mt-6">
                <button
                  className={`pb-2 text-md font-medium ${activeTab === "Resumes"
                    ? "text-[#21aeff] border-b-2 border-blue-600"
                    : "text-[#58666e] hover:text-[#21aeff]"
                    }`}
                  onClick={() => setActiveTab("Resumes")}
                >
                  Resumes
                </button>
                {/* <button
                  className={`pb-2 text-md font-medium ${activeTab === "Cover Letters"
                    ? "text-[#21aeff] border-b-2 border-blue-600"
                    : "text-[#58666e] hover:text-[#21aeff]"
                    }`}
                  onClick={() => setActiveTab("Cover Letters")}
                >
                  Cover Letters
                </button> */}
              </div>

              {/*  RESUME SECTION */}
              {showResumeTemplates && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* {allTemplateDetails.map((item) => {
                      const match = templates.find(
                        (t) => t.id === Number(item.templateId)
                      );

                      return (
                        <div
                          key={item._id}
                          className="rounded-xxl shadow-lg p-4  bg-white "
                        >
                          {match ? (
                            <div>
                              <img
                                src={match.img}
                                alt={match.name}
                                className="w-full h-[500px] object-contain rounded-xl shadow-xl "
                              />

                             

                              <p className="text-sm text-gray-700">
                                {item.firstName} {item.lastName}
                              </p>

                              <button
                                onClick={() =>
                                  navigate("/pdf-download", {
                                    state: { templateId: match.id, contactId: item._id },
                                  })
                                }
                                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                              >
                                View Details
                              </button>
                            </div>
                          ) : (
                            
                            <div className="text-center py-10 bg-yellow-50 rounded-lg border border-yellow-300">
                              <p className="text-yellow-700 font-semibold text-lg">
                                No Template Selected
                              </p>
                              <p className="text-gray-600 text-sm mt-1">
                                {item.firstName} {item.lastName}
                              </p>

                              <button
                                onClick={() => navigate("/choose-template")}
                                className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                              >
                                Choose Template
                              </button>
                            </div>
                          )}
                        </div>

                      );
                    })} */}
                    {allTemplateDetails.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-lg border border-gray-200">
    
    {/* Icon */}
    <div className="bg-indigo-100 text-indigo-600 p-6 rounded-full mb-4 shadow-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v3m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3l-6.928-12c-.77-1.333-2.694-1.333-3.464 0l-6.928 12c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    </div>

    {/* Title */}
    <h2 className="text-2xl font-bold text-gray-800">
      Try Our Templates
    </h2>

    {/* Subtitle */}
    <p className="text-gray-500 mt-2 text-center max-w-sm">
      You haven’t created or selected any template yet.
      Choose a template to continue building your resume.
    </p>

    {/* Button */}
    <button
      onClick={() => navigate("/choose-template")}
      className="mt-6 px-8 py-3 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow-md hover:bg-indigo-700 transition-all duration-200"
    >
      Browse Templates
    </button>
  </div>
) : (
  allTemplateDetails.map((item) => {
    const match = templates.find(
      (t) => t.id === Number(item.templateId)
    );

    return (
      <div
        key={item._id}
        className="rounded-xxl shadow-lg p-4 bg-white"
      >
        {match ? (
          <div>
            <img
              src={match.img}
              alt={match.name}
              className="w-full h-[500px] object-contain rounded-xl shadow-xl"
            />

            <p className="text-sm text-gray-700">
              {item.firstName} {item.lastName}
            </p>

            <button
              onClick={() =>
                navigate("/pdf-download", {
                  state: { templateId: match.id, contactId: item._id },
                })
              }
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              View Details
            </button>
          </div>
        ) : (
          <div className="text-center py-10 bg-red-50 rounded-lg border border-red-300">
            <p className="text-red-700 font-semibold text-lg">
              ❌ No Template Selected
            </p>
            <p className="text-gray-700 text-sm mt-1">
              {item.firstName} {item.lastName}
            </p>

            <button
              onClick={() => navigate("/choose-template")}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Choose Template
            </button>
          </div>
        )}
      </div>
    );
  })
)}


                  </div>
                </>
              )}

              {/* COVER LETTERS SECTION  */}
              {showCoverLetters && (
                <div>
                  {/* Info Card */}
                  <div className="bg-[#f7f9fc]  border-blue-100 rounded-lg p-4 flex items-center justify-between mb-10">
                    <div>
                      <h2 className="text-gray-800 font-semibold">
                        Upgrade your resume with our expert’s help!
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Get personalized feedback on your resume and insights on how to get noticed by recruiters.
                      </p>
                    </div>
                    <button className="bg-white border border-gray-300 rounded-md px-5 py-2 text-md font-medium text-gray-800 hover:bg-gray-100 transition">
                      Start Now
                    </button>
                  </div>

                  {/* Empty State */}
                  <div className="flex flex-col items-center justify-center mt-5">
                    <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-full p-10 mb-6 shadow-sm">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="Empty Resume"
                        className="w-16 h-16 opacity-60"
                      />
                    </div>
                    <h3 className="text-[20px] font-serif font-bold  text-gray-700 mb-2">
                      No resumes yet
                    </h3>
                    <p className="text-gray-600 text-md mb-6 text-center ">
                      Create a resume that opens doors. Click “New Resume” to begin.
                    </p>
                    <div
                      className="flex justify-center bg-[#1fadff] hover:bg-[#05a3ff] text-white font-semibold gap-3 px-6 py-2 rounded-lg shadow transition-all duration-300 items-center cursor-pointer"
                      onClick={() => handleNavigate("/choose-template")}
                    >
                      <MdOutlineAddCircleOutline className="size-5" />
                      <p>New Resume</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Resume;
