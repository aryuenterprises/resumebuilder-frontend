import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Editor } from "primereact/editor";
import { CreateContext } from "../App";
import axios from "axios";
import { API_URL } from "../Config";
import { toast } from "react-toastify";
import MonthYearDisplay from "../Componets/MonthYearDisplay";
import { CloudCog } from "lucide-react";
import { html, select } from "framer-motion/m";
import { IoIosAddCircle } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdAdd, IoIosArrowDown } from "react-icons/io";
import {
  FiChevronDown,
  FiTrash2,
  FiX,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { FaRegLightbulb, FaArrowLeft } from "react-icons/fa";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const Experience_form = forwardRef((props, ref) => {
  const UseContext = useContext(CreateContext);
  const Contactid = UseContext?.contactid;
  const [isExperienced, setIsExperienced] = useState(true);

  // Toggle between Experienced / Fresher
  const toggleExperienceMode = () => {
    setIsExperienced((prev) => {
      const newValue = !prev;

      // If user selects Fresher → clear all experience
      if (!newValue) {
        setExperiences([]);
      }

      return newValue;
    });
  };

  const { experiences, setExperiences } = useContext(CreateContext);

  const pickerRefs = useRef({});
  const inputRefs = useRef({});

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
        touched: {},
        showPicker: false,
        year: new Date().getFullYear(),
      },
    ]);
  };

  const [error, setErrors] = useState({});

  useEffect(() => {
    if (Contactid) {
      fetchExp();
    }
  }, [Contactid]);

  const fetchExp = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/experience/get-experience/${Contactid}`
      );

      const experienceList = response.data?.[0]?.experiences || [];

      if (experienceList.length > 0) {
        const formattedData = experienceList.map((item) => ({
          id: item._id || Date.now(),
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
        }));

        setExperiences(formattedData);
      } else {
        console.log("No experience data found for user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (e) e.preventDefault();

    try {
      const formData = {
        experiences,
      };

      const response = await axios.post(
        `${API_URL}/api/experience/update`,

        formData,
        { params: { contactId: Contactid } }
      );

      toast.success(" Experience  created successfully.");

      // reset();

      return true;
    } catch (err) {
      setErrors(err);
      console.error("Error sending message:", err);
      toast.error("Failed to save experience!");

      return false;
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  const toggleForm = (id) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, isOpen: !exp.isOpen } : exp))
    );
  };

  const handleChange = (id, field, value) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const handleBlur = (id, field) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === id
          ? { ...exp, touched: { ...exp.touched, [field]: true } }
          : exp
      )
    );
  };

  const deleteExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const handleSelect = (id, value) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, endDate: value, showPicker: false } : exp
      )
    );
  };

  const togglePicker = (id) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, showPicker: !exp.showPicker } : exp
      )
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      setExperiences((prev) =>
        prev.map((exp) => {
          const picker = pickerRefs.current[exp.id];
          const input = inputRefs.current[exp.id];
          if (
            picker &&
            input &&
            !picker.contains(event.target) &&
            !input.contains(event.target)
          ) {
            return { ...exp, showPicker: false };
          }
          return exp;
        })
      );
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [skillTipsClicked, setSkillTipsClicked] = useState(false);

  const [Airesponse, setAireseponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [clickedIndexoFGenerateWithAIBtn, setClickedIndexoFGenerateWithAIBtn] =
    useState(null);

  const handleSubmitAi = async (index) => {
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
        // `https://telophasic-aliza-numerous.ngrok-free.dev/api/v1/resume/generate`,
        // `https://ai.aryuacademy.com`,
        `https://ai.aryuacademy.com/api/v1/resume/experience`,
        formData
      );

      // setAireseponse(response.data?.result);
      // console.log("response", response.data.result.experience_bullets);

      const bullets = response.data.experience_bullets
        .split("\n")
        .map((item) => item.replace("- ", "").trim())
        .filter(Boolean);

      setAireseponse(bullets);

      setShowPopup(true);

      return true;
    } catch (err) {
      setErrors(err);
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  const insertAIResponse = (item, index) => {
    const updated = [...experiences];

    updated[clickedIndexoFGenerateWithAIBtn].text =
      (updated[clickedIndexoFGenerateWithAIBtn].text || "") + "\n" + item;

    setExperiences(updated);

    let aiResponse = [...Airesponse];

    aiResponse = aiResponse.filter((item, index1) => index1 != index);

    setAireseponse(aiResponse);
  };

  return (
    // <section className="">
    //   <div className="p-6 bg-white rounded-xl shadow-soft h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#c40116]/30 scrollbar-track-transparent scrollbar-thumb-rounded-full">
    //     {/* Header Section */}
    //      <div className="mb-8">
    //       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
    //         <div className="flex items-center gap-3">
    //           <div className="p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
    //             <svg
    //               className="w-6 h-6 text-[#c40116]"
    //               fill="none"
    //               stroke="currentColor"
    //               viewBox="0 0 24 24"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth="2"
    //                 d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    //               />
    //             </svg>
    //           </div>
    //           <h1 className="text-2xl font-semibold bg-gradient-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
    //             Work Experience
    //           </h1>
    //         </div>

    //         <div className="inline-block text-left">
    //           <button
    //             onClick={() => setSkillTipsClicked((prev) => !prev)}
    //             className="flex items-center gap-2 bg-gradient-to-r from-white to-gray-50/80 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 text-sm font-medium hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200"
    //           >
    //             <motion.div
    //               animate={{ opacity: [1, 0.4, 1] }}
    //               transition={{
    //                 duration: 1,
    //                 repeat: Infinity,
    //                 ease: "easeInOut",
    //               }}
    //             >
    //               <FaRegLightbulb className="text-[#c40116] text-lg" />
    //             </motion.div>
    //             Experience Tips
    //             <motion.div
    //               animate={{ rotate: skillTipsClicked ? 180 : 0 }}
    //               transition={{ duration: 0.3 }}
    //               className="text-gray-500"
    //             >
    //               <IoIosArrowDown />
    //             </motion.div>
    //           </button>
    //         </div>
    //       </div>

    //       <p className="text-gray-600 text-sm font-medium">
    //         List your work experience starting with the most recent position
    //         first.
    //       </p>
    //     </div>

    //     {/* Experience Toggle */}
    //     <div className="flex items-center gap-4 mb-8">
    //       <div
    //         onClick={toggleExperienceMode}
    //         className={`relative w-12 h-6 rounded-full cursor-pointer transition-all duration-300 ${
    //           isExperienced
    //             ? "bg-gradient-to-r from-[#c40116] to-[#be0117]"
    //             : "bg-gradient-to-r from-gray-200 to-gray-300"
    //         }`}
    //       >
    //         <div
    //           className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${
    //             isExperienced ? "left-7" : "left-1"
    //           }`}
    //         ></div>
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <span
    //           className={`text-sm font-semibold transition-colors duration-300 ${
    //             isExperienced ? "text-gray-400" : "text-[#c40116] "
    //           }`}
    //         >
    //           Fresher
    //         </span>
    //         <span className="text-sm font-semibold text-gray-500">/</span>
    //         <span
    //           className={`text-sm font-semibold transition-colors duration-300 ${
    //             isExperienced ? "text-[#c40116]" : " text-gray-400"
    //           }`}
    //         >
    //           Experienced
    //         </span>
    //       </div>
    //     </div>

    //     {isExperienced && (
    //       <div className="space-y-4 pb-10">
    //         {experiences.map((exp, index) => (
    //           <div
    //             key={exp.id}
    //             className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden shadow-subtle transition-all duration-300 hover:shadow-md"
    //           >
    //             {/* Header */}
    //             <div
    //               onClick={() => toggleForm(exp.id)}
    //               className="flex justify-between items-center cursor-pointer p-5 group hover:bg-gray-50/50 transition-all duration-300"
    //             >
    //               <div>
    //                 <h3 className="text-sm font-semibold text-gray-800 mb-1 group-hover:text-[#c40116] transition-colors">
    //                   {exp.jobTitle || "Job Title"}
    //                 </h3>
    //                 <div className="flex items-center gap-3 text-xs text-gray-500">
    //                   <span>{exp.employer || "Employer"}</span>
    //                   <span className="text-gray-300">•</span>
    //                   <span>
    //                     <MonthYearDisplay
    //                       value={exp.startDate}
    //                       shortYear={true}
    //                     />
    //                     {" - "}
    //                     <MonthYearDisplay
    //                       value={exp.endDate}
    //                       shortYear={true}
    //                     />
    //                   </span>
    //                 </div>
    //               </div>

    //               <div className="flex items-center gap-3">
    //                 <motion.div
    //                   animate={{ rotate: exp.isOpen ? 180 : 0 }}
    //                   transition={{ duration: 0.3 }}
    //                   className="text-gray-400 group-hover:text-[#c40116] transition-colors"
    //                 >
    //                   <FiChevronDown size={20} />
    //                 </motion.div>
    //                 <button
    //                   onClick={(e) => {
    //                     e.stopPropagation();
    //                     deleteExperience(exp.id);
    //                   }}
    //                   className="p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
    //                   type="button"
    //                 >
    //                   <FiTrash2 size={16} />
    //                 </button>
    //               </div>
    //             </div>

    //             {/* Content */}
    //             <div
    //               className={`transition-all duration-500 overflow-hidden ${
    //                 exp.isOpen
    //                   ? "max-h-[2000px] opacity-100"
    //                   : "max-h-0 opacity-0"
    //               }`}
    //             >
    //               <div className="p-5 space-y-6 border-t border-gray-100">
    //                 {/* Job Title & Employer */}
    //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //                   <div className="group">
    //                     <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-[#c40116] transition-colors">
    //                       Job Title
    //                     </label>
    //                     <div className="relative">
    //                       <input
    //                         type="text"
    //                         value={exp.jobTitle}
    //                         onChange={(e) =>
    //                           handleChange(exp.id, "jobTitle", e.target.value)
    //                         }
    //                         onBlur={() => handleBlur(exp.id, "jobTitle")}
    //                         placeholder="Enter your job title"
    //                         className="w-full px-4 py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
    //                       />
    //                       {exp.touched.jobTitle &&
    //                         exp.jobTitle.trim() !== "" && (
    //                           <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
    //                             <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
    //                               <svg
    //                                 className="w-3 h-3 text-white"
    //                                 fill="none"
    //                                 stroke="currentColor"
    //                                 viewBox="0 0 24 24"
    //                               >
    //                                 <path
    //                                   strokeLinecap="round"
    //                                   strokeLinejoin="round"
    //                                   strokeWidth="3"
    //                                   d="M5 13l4 4L19 7"
    //                                 />
    //                               </svg>
    //                             </div>
    //                           </div>
    //                         )}
    //                     </div>
    //                   </div>

    //                   <div className="group">
    //                     <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-[#c40116] transition-colors">
    //                       Employer
    //                     </label>
    //                     <div className="relative">
    //                       <input
    //                         type="text"
    //                         value={exp.employer}
    //                         onChange={(e) =>
    //                           handleChange(exp.id, "employer", e.target.value)
    //                         }
    //                         onBlur={() => handleBlur(exp.id, "employer")}
    //                         placeholder="Company name"
    //                         className="w-full px-4 py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
    //                       />
    //                       {exp.touched.employer &&
    //                         exp.employer.trim() !== "" && (
    //                           <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
    //                             <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
    //                               <svg
    //                                 className="w-3 h-3 text-white"
    //                                 fill="none"
    //                                 stroke="currentColor"
    //                                 viewBox="0 0 24 24"
    //                               >
    //                                 <path
    //                                   strokeLinecap="round"
    //                                   strokeLinejoin="round"
    //                                   strokeWidth="3"
    //                                   d="M5 13l4 4L19 7"
    //                                 />
    //                               </svg>
    //                             </div>
    //                           </div>
    //                         )}
    //                     </div>
    //                   </div>
    //                 </div>

    //                 {/* Location & Dates */}
    //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //                   <div className="group">
    //                     <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-[#c40116] transition-colors">
    //                       Location
    //                     </label>
    //                     <div className="relative">
    //                       <input
    //                         type="text"
    //                         value={exp.location}
    //                         onChange={(e) =>
    //                           handleChange(exp.id, "location", e.target.value)
    //                         }
    //                         onBlur={() => handleBlur(exp.id, "location")}
    //                         placeholder="City, State or Remote"
    //                         className="w-full px-4 py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
    //                       />
    //                       {exp.touched.location &&
    //                         exp.location.trim() !== "" && (
    //                           <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
    //                             <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
    //                               <svg
    //                                 className="w-3 h-3 text-white"
    //                                 fill="none"
    //                                 stroke="currentColor"
    //                                 viewBox="0 0 24 24"
    //                               >
    //                                 <path
    //                                   strokeLinecap="round"
    //                                   strokeLinejoin="round"
    //                                   strokeWidth="3"
    //                                   d="M5 13l4 4L19 7"
    //                                 />
    //                               </svg>
    //                             </div>
    //                           </div>
    //                         )}
    //                     </div>
    //                   </div>

    //                   <div className="grid grid-cols-2 gap-4">
    //                     <div className="group">
    //                       <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-[#c40116] transition-colors">
    //                         Start Date
    //                       </label>
    //                       <input
    //                         type="month"
    //                         value={exp.startDate}
    //                         onChange={(e) =>
    //                           handleChange(exp.id, "startDate", e.target.value)
    //                         }
    //                         onBlur={() => handleBlur(exp.id, "startDate")}
    //                         className="w-full px-4 py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
    //                       />
    //                     </div>

    //                     <div className="relative group">
    //                       <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-[#c40116] transition-colors">
    //                         End Date
    //                       </label>
    //                       <div className="relative">
    //                         <input
    //                           type="text"
    //                           readOnly
    //                           ref={(el) => (inputRefs.current[exp.id] = el)}
    //                           value={exp.endDate}
    //                           onClick={() => togglePicker(exp.id)}
    //                           placeholder="MM/YYYY"
    //                           className="w-full px-4 py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
    //                         />

    //                         {exp.showPicker && (
    //                           <div
    //                             ref={(el) => (pickerRefs.current[exp.id] = el)}
    //                             className="absolute right-0 -mt-24 w-60 bg-white shadow-xl rounded-xl p-4 z-[9999] border border-gray-100"
    //                           >
    //                             {/* Year Header */}
    //                             <div className="flex justify-between items-center mb-3">
    //                               <button
    //                                 onClick={() =>
    //                                   handleChange(exp.id, "year", exp.year - 1)
    //                                 }
    //                                 className="px-2 py-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
    //                               >
    //                                 &lt;
    //                               </button>
    //                               <span className="font-semibold text-gray-800">
    //                                 {exp.year}
    //                               </span>
    //                               <button
    //                                 onClick={() =>
    //                                   handleChange(exp.id, "year", exp.year + 1)
    //                                 }
    //                                 className="px-2 py-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
    //                               >
    //                                 &gt;
    //                               </button>
    //                             </div>

    //                             {/* Month Grid */}
    //                             <div className="grid grid-cols-3 gap-2 text-center">
    //                               {months.map((month) => (
    //                                 <div
    //                                   key={month}
    //                                   onClick={() =>
    //                                     handleSelect(
    //                                       exp.id,
    //                                       `${month} ${exp.year}`
    //                                     )
    //                                   }
    //                                   className="p-2 rounded-lg cursor-pointer hover:bg-[#c40116]/10 hover:text-[#c40116] active:bg-[#c40116]/20 transition-colors text-gray-700 text-sm"
    //                                 >
    //                                   {month.slice(0, 3)}
    //                                 </div>
    //                               ))}
    //                             </div>

    //                             {/* Currently work here */}
    //                             <div className="mt-3 pt-3 border-t border-gray-100">
    //                               <button
    //                                 onClick={() =>
    //                                   handleSelect(
    //                                     exp.id,
    //                                     "Currently work here"
    //                                   )
    //                                 }
    //                                 className="w-full text-center text-[#c40116] hover:text-[#5e000b] font-medium text-sm transition-colors"
    //                               >
    //                                 Currently work here
    //                               </button>
    //                             </div>
    //                           </div>
    //                         )}
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>

    //                 {/* Description with AI */}
    //                 <div className="group">
    //                   <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-[#c40116] transition-colors">
    //                     Description
    //                   </label>
    //                   <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden">
    //                     <div className="flex justify-between items-center p-4 border-b border-gray-100">
    //                       <span className="text-xs font-medium text-gray-500">
    //                         Experience Details
    //                       </span>
    //                       <div className="relative inline-block group">
    //                         <button
    //                           onClick={() => handleSubmitAi(index)}
    //                           disabled={loading || !exp.jobTitle}
    //                           className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 ${
    //                             !exp.jobTitle
    //                               ? "bg-gradient-to-r from-gray-300 to-gray-400 cursor-not-allowed opacity-70"
    //                               : "bg-gradient-to-r from-[#c40116] to-[#be0117] hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02]"
    //                           }`}
    //                         >
    //                           <svg
    //                             className="w-4 h-4"
    //                             fill="none"
    //                             stroke="currentColor"
    //                             viewBox="0 0 24 24"
    //                           >
    //                             <path
    //                               strokeLinecap="round"
    //                               strokeLinejoin="round"
    //                               strokeWidth="2"
    //                               d="M13 10V3L4 14h7v7l9-11h-7z"
    //                             />
    //                           </svg>
    //                           {loading ? "Generating..." : "Generate with AI"}
    //                         </button>

    //                         {!exp.jobTitle && (
    //                           <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
    //                             Enter your job title to use this feature
    //                           </div>
    //                         )}
    //                       </div>
    //                     </div>

    //                     <div className="p-4">
    //                       <Editor
    //                         className="rounded-lg"
    //                         value={exp.text}
    //                         onTextChange={(e) =>
    //                           handleChange(exp.id, "text", e.htmlValue)
    //                         }
    //                         style={{ height: "150px" }}
    //                       />
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         ))}

    //         {/* Add Experience Button */}
    //         <button
    //           onClick={addExperience}
    //           className="w-full py-3.5 bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-gray-200 rounded-xl hover:border-[#c40116] hover:bg-[#c40116]/5 text-gray-600 hover:text-[#c40116] transition-all duration-300 group"
    //         >
    //           <div className="flex items-center justify-center gap-2">
    //             <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-[#c40116]/10 transition-colors">
    //               <IoMdAdd className="w-5 h-5" />
    //             </div>
    //             <span className="text-sm font-semibold">
    //               Add Work Experience
    //             </span>
    //           </div>
    //         </button>
    //       </div>
    //     )}

    //     {/* Experience Tips Modal */}
    //     {skillTipsClicked && (
    //       <AnimatePresence>
    //         <div className="fixed inset-0 z-50 flex items-start justify-end overflow-hidden">
    //           <div className="absolute inset-0 left-[30%]  flex items-center justify-center h-full top-10">
    //             <motion.div
    //               initial={{ y: 70, opacity: 0 }}
    //               animate={{ y: 0, opacity: 1 }}
    //               exit={{ y: 70, opacity: 0 }}
    //               transition={{
    //                 type: "spring",
    //                 stiffness: 120,
    //                 damping: 18,
    //                 duration: 0.4,
    //               }}
    //               className="w-screen py-3 lg:w-[30vw] rounded-xl bg-white border border-gray-200 shadow-2xl"
    //             >
    //               <div className="flex justify-between items-center px-6 py-4">
    //                 <div className="flex items-center gap-3">
    //                   <div className="p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
    //                     <FaRegLightbulb className="w-5 h-5 text-[#c40116]" />
    //                   </div>
    //                   <h3 className="text-lg font-semibold text-gray-800">
    //                     Experience Tips
    //                   </h3>
    //                 </div>
    //                 <button
    //                   onClick={() => setSkillTipsClicked(false)}
    //                   className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
    //                 >
    //                   <FiX size={20} />
    //                 </button>
    //               </div>
    //               <hr className="border-gray-100" />

    //               <div className="p-6 space-y-6">
    //                 {/* Positive tips */}
    //                 <div className="space-y-4">
    //                   <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
    //                     Best Practices
    //                   </h4>
    //                   {[

    //                     {
    //                       title: "Use bullet points",
    //                       desc: "Make your achievements stand out with concise bullet points.",
    //                     },
    //                     {
    //                       title: "Keep descriptions short and clear",
    //                       desc: "Aim for 4–5 of your strongest, most relevant skills.",
    //                     },
    //                     {
    //                       title: "Show your impact",
    //                       desc: "Highlight your accomplishments, not generic duties.",
    //                     },

    //                   ].map((tip, idx) => (
    //                     <div key={idx} className="flex items-start gap-3">
    //                       <div className="flex-shrink-0 mt-0.5">
    //                         <div className="p-1.5 bg-emerald-100 rounded-lg">
    //                           <FiCheckCircle className="text-emerald-500 w-4 h-4" />
    //                         </div>
    //                       </div>
    //                       <div>
    //                         <p className="text-sm font-semibold text-gray-800">
    //                           {tip.title}
    //                         </p>
    //                         <p className="text-sm text-gray-600 mt-1">
    //                           {tip.desc}
    //                         </p>
    //                       </div>
    //                     </div>
    //                   ))}
    //                 </div>

    //                 {/* Negative tips */}
    //                 <div className="space-y-4 pt-4 border-t border-gray-100">
    //                   <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
    //                     Avoid These
    //                   </h4>
    //                   {[
    //                     {
    //                       title: "Don't abbreviate job titles",
    //                       desc: "Write the full job title so it's easy to understand.",
    //                     },
    //                     {
    //                       title: "Don't use 'I' or full sentences",
    //                       desc: "Keep bullet points short, starting with action verbs.",
    //                     },
    //                     {
    //                       title: "Don't exaggerate or lie",
    //                       desc: "False claims can backfire during interviews.",
    //                     },
    //                   ].map((tip, idx) => (
    //                     <div key={idx} className="flex items-start gap-3">
    //                       <div className="flex-shrink-0 mt-0.5">
    //                         <div className="p-1.5 bg-[#c40116]/10 rounded-lg">
    //                           <FiXCircle className="text-[#c40116] w-4 h-4" />
    //                         </div>
    //                       </div>
    //                       <div>
    //                         <p className="text-sm font-semibold text-gray-800">
    //                           {tip.title}
    //                         </p>
    //                         <p className="text-sm text-gray-600 mt-1">
    //                           {tip.desc}
    //                         </p>
    //                       </div>
    //                     </div>
    //                   ))}
    //                 </div>
    //               </div>
    //             </motion.div>
    //           </div>
    //         </div>
    //       </AnimatePresence>
    //     )}

    //     {/* AI Response Popup */}
    //     {showPopup && Airesponse && (
    //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    //         <motion.div
    //           initial={{ opacity: 0, scale: 0.95 }}
    //           animate={{ opacity: 1, scale: 1 }}
    //           className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-2xl max-h-[70vh] overflow-hidden"
    //         >
    //           <div className="p-6">
    //             <div className="flex items-center justify-between mb-6">
    //               <div>
    //                 <h2 className="text-xl font-semibold text-gray-800">
    //                   AI Suggestions
    //                 </h2>
    //                 <p className="text-sm text-gray-500 mt-1">
    //                   Click on any suggestion below to add it to your
    //                   description
    //                 </p>
    //               </div>
    //               <button
    //                 onClick={() => setShowPopup(false)}
    //                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
    //               >
    //                 <FiX className="w-5 h-5 text-gray-500" />
    //               </button>
    //             </div>

    //             <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
    //               {Airesponse?.map((item, index) => (
    //                 <div
    //                   key={index}
    //                   onClick={() => insertAIResponse(item, index)}
    //                   className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#c40116] hover:bg-[#c40116]/5 cursor-pointer group transition-all duration-200"
    //                 >
    //                   <div className="p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg group-hover:from-[#c40116]/20 group-hover:to-[#be0117]/20 transition-all">
    //                     <BsArrowLeftCircleFill className="w-5 h-5 text-[#c40116]" />
    //                   </div>
    //                   <p className="text-gray-700 text-sm leading-relaxed flex-1">
    //                     {item}
    //                   </p>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         </motion.div>
    //       </div>
    //     )}
    //   </div>
    // </section>

    <section >
      <div className="p-3 md:p-4 lg:p-5 bg-white rounded-xl sm:rounded-2xl shadow-soft h-auto min-h-[500px] max-h-[700px] sm:max-h-[600px] lg:max-h-[500px] ">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
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
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-[#5e000b] to-[#c40116] bg-clip-text text-transparent">
                Work Experience
              </h1>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSkillTipsClicked((prev) => !prev)}
                className="flex items-center justify-center xs:justify-start gap-2 bg-gradient-to-r from-white to-gray-50/80 border border-gray-200 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-gray-700 text-xs sm:text-sm font-medium hover:border-[#c40116] hover:text-[#c40116] hover:shadow-md transition-all duration-200 w-fit"
              >
                <motion.div
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaRegLightbulb className="text-[#c40116] text-base sm:text-lg" />
                </motion.div>
                <span className="truncate">Experience Tips</span>
                <motion.div
                  animate={{ rotate: skillTipsClicked ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-500 flex-shrink-0"
                >
                  <IoIosArrowDown />
                </motion.div>
              </button>
            </div>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm font-medium">
            List your work experience starting with the most recent position
            first.
          </p>
        </div>

        {/* Experience Toggle */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div
            onClick={toggleExperienceMode}
            className={`relative w-10 h-5 sm:w-12 sm:h-6 rounded-full cursor-pointer transition-all duration-300 ${
              isExperienced
                ? "bg-gradient-to-r from-[#c40116] to-[#be0117]"
                : "bg-gradient-to-r from-gray-200 to-gray-300"
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
                isExperienced ? "text-gray-400" : "text-[#c40116]"
              }`}
            >
              Fresher
            </span>
            <span className="text-xs sm:text-sm font-semibold text-gray-500">
              /
            </span>
            <span
              className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                isExperienced ? "text-[#c40116]" : "text-gray-400"
              }`}
            >
              Experienced
            </span>
          </div>
        </div>

        {isExperienced && (
          <div className="space-y-3 sm:space-y-4 pb-8 sm:pb-10">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="bg-[#f3f4f6]/80 rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-subtle transition-all duration-300 hover:shadow-md"
              >
                {/* Header */}
                <div
                  onClick={() => toggleForm(exp.id)}
                  className="flex justify-between items-center cursor-pointer p-3 sm:p-4 lg:p-5 group hover:bg-gray-50/50 transition-all duration-300"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-0.5 sm:mb-1 truncate group-hover:text-[#c40116] transition-colors">
                      {exp.jobTitle || "Job Title"}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] xs:text-xs text-gray-500">
                      <span className="truncate max-w-[100px] sm:max-w-none">
                        {exp.employer || "Employer"}
                      </span>
                      <span className="text-gray-300 hidden xs:inline">•</span>
                      <span className="whitespace-nowrap">
                        <MonthYearDisplay
                          value={exp.startDate}
                          shortYear={true}
                        />
                        {" - "}
                        <MonthYearDisplay
                          value={exp.endDate}
                          shortYear={true}
                        />
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 ml-2">
                    <motion.div
                      animate={{ rotate: exp.isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-400 group-hover:text-[#c40116] transition-colors"
                    >
                      <FiChevronDown size={18} className="sm:w-5 sm:h-5" />
                    </motion.div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteExperience(exp.id);
                      }}
                      className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 text-gray-400 hover:text-[#c40116] hover:shadow-sm transition-all duration-200"
                      type="button"
                    >
                      <FiTrash2 size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    exp.isOpen
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-2 sm:p-3 md:p-4 space-y-4 sm:space-y-6 border-t border-gray-100">
                    {/* Job Title & Employer */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="group">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                          Job Title
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={exp.jobTitle}
                            onChange={(e) =>
                              handleChange(exp.id, "jobTitle", e.target.value)
                            }
                            onBlur={() => handleBlur(exp.id, "jobTitle")}
                            placeholder="Enter your job title"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                          />
                          {exp.touched.jobTitle &&
                            exp.jobTitle.trim() !== "" && (
                              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                                <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
                                  <svg
                                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="3"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </div>
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                          Employer
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={exp.employer}
                            onChange={(e) =>
                              handleChange(exp.id, "employer", e.target.value)
                            }
                            onBlur={() => handleBlur(exp.id, "employer")}
                            placeholder="Company name"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                          />
                          {exp.touched.employer &&
                            exp.employer.trim() !== "" && (
                              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                                <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
                                  <svg
                                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="3"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>

                    {/* Location & Dates */}
                    <div className="grid grid-cols-1  gap-4 sm:gap-6">
                      <div className="group">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                          Location
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) =>
                              handleChange(exp.id, "location", e.target.value)
                            }
                            onBlur={() => handleBlur(exp.id, "location")}
                            placeholder="City, State or Remote"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                          />
                          {exp.touched.location &&
                            exp.location.trim() !== "" && (
                              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                                <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm">
                                  <svg
                                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="3"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </div>
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="group">
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                            Start Date
                          </label>
                          <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) =>
                              handleChange(exp.id, "startDate", e.target.value)
                            }
                            onBlur={() => handleBlur(exp.id, "startDate")}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                          />
                        </div>

                        <div className="relative group">
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                            End Date
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              readOnly
                              ref={(el) => (inputRefs.current[exp.id] = el)}
                              value={exp.endDate}
                              onClick={() => togglePicker(exp.id)}
                              placeholder="MM/YYYY"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gradient-to-b from-white to-gray-50/50 border border-gray-200 rounded-xl text-gray-800 text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-subtle focus:outline-none focus:border-[#c40116] focus:ring-2 focus:ring-[#c40116]/20 focus:shadow-lg focus:shadow-[#c40116]/10 transition-all duration-300"
                            />

                            {exp.showPicker && (
                              <div
                                ref={(el) => (pickerRefs.current[exp.id] = el)}
                                className="absolute right-0 -mt-28 sm:-mt-24 w-56 sm:w-60 bg-white shadow-xl rounded-xl p-3 sm:p-4 z-[9999] border border-gray-100"
                              >
                                {/* Year Header */}
                                <div className="flex justify-between items-center mb-2 sm:mb-3">
                                  <button
                                    onClick={() =>
                                      handleChange(exp.id, "year", exp.year - 1)
                                    }
                                    className="px-1.5 sm:px-2 py-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
                                  >
                                    &lt;
                                  </button>
                                  <span className="font-semibold text-gray-800 text-sm sm:text-base">
                                    {exp.year}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleChange(exp.id, "year", exp.year + 1)
                                    }
                                    className="px-1.5 sm:px-2 py-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
                                  >
                                    &gt;
                                  </button>
                                </div>

                                {/* Month Grid */}
                                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
                                  {months.map((month) => (
                                    <div
                                      key={month}
                                      onClick={() =>
                                        handleSelect(
                                          exp.id,
                                          `${month} ${exp.year}`
                                        )
                                      }
                                      className="p-1.5 sm:p-2 rounded-lg cursor-pointer hover:bg-[#c40116]/10 hover:text-[#c40116] active:bg-[#c40116]/20 transition-colors text-gray-700 text-xs sm:text-sm"
                                    >
                                      {month.slice(0, 3)}
                                    </div>
                                  ))}
                                </div>

                                {/* Currently work here */}
                                <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                                  <button
                                    onClick={() =>
                                      handleSelect(
                                        exp.id,
                                        "Currently work here"
                                      )
                                    }
                                    className="w-full text-center text-[#c40116] hover:text-[#5e000b] font-medium text-xs sm:text-sm transition-colors"
                                  >
                                    Currently work here
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description with AI */}
                    <div className="group">
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 group-hover:text-[#c40116] transition-colors">
                        Description
                      </label>
                    
                        <div className="flex justify-end">
                         
                          <div className="relative inline-block group ">
                            <button
                              onClick={() => handleSubmitAi(index)}
                              disabled={loading || !exp.jobTitle}
                              className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg  text-xs sm:text-sm font-medium transition-all duration-500 w-fit ${
                                !exp.jobTitle
                                  ? "bg-gradient-to-r from-gray-300 text-black to-gray-400 cursor-not-allowed opacity-90"
                                  : "bg-gradient-to-r from-[#c40116] to-[#be0117] hover:shadow-lg hover:shadow-[#c40116]/25 hover:scale-[1.02] text-white"
                              }`}
                            >
                              <svg
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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
                              {loading ? "Generating..." : "Generate with AI"}
                            </button>

                            {!exp.jobTitle && (
                              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-40 sm:w-48 bg-gray-900 text-white text-[10px] xs:text-xs rounded-lg p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                Enter your job title to use this feature
                              </div>
                            )}
                          </div>
                        </div>

                          <Editor
                            className="rounded-lg mt-3 md:mt-4 lg:mt-5 bg-white"
                            value={exp.text}
                            onTextChange={(e) =>
                              handleChange(exp.id, "text", e.htmlValue)
                            }
                            style={{ height: "120px", minHeight: "120px",                background:"white",
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
              className="w-full py-3 sm:py-3.5 bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-gray-200 rounded-xl hover:border-[#c40116] hover:bg-[#c40116]/5 text-gray-600 hover:text-[#c40116] transition-all duration-300 group"
            >
              <div className="flex items-center justify-center gap-2">
                <div className="p-1 sm:p-1.5 bg-gray-100 rounded-lg group-hover:bg-[#c40116]/10 transition-colors">
                  <IoMdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold">
                  Add Work Experience
                </span>
              </div>
            </button>
          </div>
        )}

        {/* Experience Tips Modal */}
        {skillTipsClicked && (
          <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden p-4">
              <div
                className="absolute inset-0 backdrop-blur-sm"
                onClick={() => setSkillTipsClicked(false)}
              />
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:w-[30vw] h-auto max-h-[80vh] mt-8 sm:mt-20">
                <motion.div
                  initial={{ y: 50, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 50, opacity: 0, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                    duration: 0.4,
                  }}
                  className="w-full rounded-xl sm:rounded-2xl bg-white border border-gray-200 shadow-2xl max-h-[inherit] overflow-hidden"
                >
                  <div className="flex justify-between items-center p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
                        <FaRegLightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                        Experience Tips
                      </h3>
                    </div>
                    <button
                      onClick={() => setSkillTipsClicked(false)}
                      className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <FiX size={18} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <hr className="border-gray-100" />

                  <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(80vh-100px)]">
                    {/* Positive tips */}
                    <div className="space-y-3 sm:space-y-4">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        Best Practices
                      </h4>
                      {[
                        {
                          title: "Use bullet points",
                          desc: "Make your achievements stand out with concise bullet points.",
                        },
                        {
                          title: "Keep descriptions short and clear",
                          desc: "Aim for 4–5 of your strongest, most relevant skills.",
                        },
                        {
                          title: "Show your impact",
                          desc: "Highlight your accomplishments, not generic duties.",
                        },
                      ].map((tip, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 sm:gap-3"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="p-1 sm:p-1.5 bg-emerald-100 rounded-lg">
                              <FiCheckCircle className="text-emerald-500 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-gray-800">
                              {tip.title}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                              {tip.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Negative tips */}
                    <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-gray-100">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        Avoid These
                      </h4>
                      {[
                        {
                          title: "Don't abbreviate job titles",
                          desc: "Write the full job title so it's easy to understand.",
                        },
                        {
                          title: "Don't use 'I' or full sentences",
                          desc: "Keep bullet points short, starting with action verbs.",
                        },
                        {
                          title: "Don't exaggerate or lie",
                          desc: "False claims can backfire during interviews.",
                        },
                      ].map((tip, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 sm:gap-3"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="p-1 sm:p-1.5 bg-[#c40116]/10 rounded-lg">
                              <FiXCircle className="text-[#c40116] w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-gray-800">
                              {tip.title}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                              {tip.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatePresence>
        )}

        {/* AI Response Popup */}
        {showPopup && Airesponse && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] sm:max-h-[70vh] overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-3 mb-4 sm:mb-6">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                      AI Suggestions
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Click on any suggestion below to add it to your
                      description
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-2 sm:space-y-3 max-h-[50vh] overflow-y-auto pr-1 sm:pr-2">
                  {Airesponse?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => insertAIResponse(item, index)}
                      className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border border-gray-200 hover:border-[#c40116] hover:bg-[#c40116]/5 cursor-pointer group transition-all duration-200"
                    >
                      <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg group-hover:from-[#c40116]/20 group-hover:to-[#be0117]/20 transition-all flex-shrink-0">
                        <BsArrowLeftCircleFill className="w-4 h-4 sm:w-5 sm:h-5 text-[#c40116]" />
                      </div>
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed flex-1">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
});
export default Experience_form;
