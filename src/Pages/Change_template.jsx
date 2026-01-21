import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { FaArrowLeft } from "react-icons/fa";

// 🖼 Template images
import Image1 from "../assets/images/resume1.svg.svg";
import Image2 from "../assets/images/resume2.svg.svg";
import Image3 from "../assets/images/resume3.svg.svg";
import Image4 from "../assets/images/resume4.svg.svg";
import Image5 from "../assets/images/resume5.svg.svg";
import Image6 from "../assets/images/resume6.svg.svg";
import Image8 from "../assets/images/resume8.svg.svg";
import { CreateContext } from "../App";
import CrownIcon from "../Componets/CrownIcon";
import SubscriptionPopup from "../Componets/SubscriptionPopup";
import { motion } from "framer-motion";

export default function Change_template() {
  const navigate = useNavigate();
  const UseContext = useContext(CreateContext);

  const Allplans = UseContext?.allplandetails;
  const allPlanStatusDetails = UseContext?.allPlanStatusDetails;

  // console.log("Allplans", Allplans)

  const templates = [
    { id: 4, img: Image1, name: "Free", temp: "free" },
    { id: 3, img: Image2, name: "The Innovator", temp: "paid" },
    { id: 5, img: Image3, name: "The Global Starter", temp: "paid" },
    { id: 6, img: Image4, name: "The Scholar", temp: "paid" },
    { id: 1, img: Image5, name: "The Creator", pic: "true", temp: "paid" },
    { id: 2, img: Image6, name: "Corporate", pic: "true", temp: "paid" },
    // { id: 7, img: Image7, name: "sixe" },
    { id: 8, img: Image8, name: "The Analyst", temp: "paid" },
  ];

  // const hasPlan = Allplans && Allplans.length > 0;

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

  const displayedTemplates = templates.map((t) => {
    if (!hasPlan && t.temp !== "free") {
      return { ...t, isLocked: true }; // mark as locked
    }
    return { ...t, isLocked: false }; // free or user has plan
  });

  const [loading, setLoading] = useState(true);

  const [showPopup, setShowPopup] = useState(false);

  const handleUnlockClick = (e, template) => {
    e.stopPropagation();
    setSelectedTemplate(template);
    setShowPopup(true);
  };

  const handleUnlockSuccess = () => {
    setShowPopup(false);

    if (selectedTemplate) {
      navigate("/resume-details", { state: { templateId: selectedTemplate } });
      window.scrollTo({ top: 0, behavior: "smooth" });
      setSelectedTemplate(null);
      window.location.reload(); // refresh after unlocking
    }
  };

  const defaultTemplate =
    displayedTemplates.find((t) => !t.isLocked) || displayedTemplates[0];

  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  console.log("selectedTemplate", selectedTemplate);

  const clickResumeDetails = (templateId) => {
    navigate("/resume-details", { state: { templateId } });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    // <div className="min-h-screen flex flex-col bg-[#f5f6f8] text-gray-800">
    //   <div className="flex flex-1 overflow-hidden">
    //     {/* Sidebar */}
    //     <aside className="w-[340px] h-screen overflow-y-auto bg-white border-r border-gray-200 flex flex-col">
    //       <div className="p-6 border-b border-gray-100">
    //         <h2 className="text-xl font-semibold text-gray-800 mb-2">
    //           Choose a Template
    //         </h2>
    //         <p className="text-sm text-gray-500">
    //           Browse and select a resume design to preview.
    //         </p>
    //       </div>

    //       <div className="flex-1 overflow-y-auto p-6">
    //         <div className="grid grid-cols-1 gap-6">
    //           {displayedTemplates.map((template) => (
    //             <div
    //               key={template.id}
    //               onClick={() =>
    //                 template.isLocked
    //                   ? handleUnlockClick(null, template)
    //                   : setSelectedTemplate(template)
    //               }
    //               className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 border-2 shadow-sm hover:shadow-md ${
    //                 selectedTemplate?.id === template.id
    //                   ? "border-[#05a2ff] shadow-md"
    //                   : "border-transparent hover:border-gray-200"
    //               } ${template.isLocked ? "opacity-80" : ""}`}
    //             >
    //               <div className="relative">
    //                 <img
    //                   src={template.img}
    //                   alt={template.name}
    //                   className="w-full h-[360px] object-cover bg-gray-100"
    //                 />
    //                 {template.isLocked && (
    //                   <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
    //                     <CrownIcon
    //                       width={46}
    //                       height={46}
    //                       className="text-yellow-400 mb-2"
    //                     />
    //                     <p className="text-white font-semibold mb-2">
    //                       Upgrade to Unlock
    //                     </p>
    //                     <button
    //                       onClick={(e) => handleUnlockClick(e, template)}
    //                       className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-[#0b1220] rounded-md font-medium shadow hover:scale-[1.02] transition-transform"
    //                     >
    //                       <CrownIcon width={18} height={18} />
    //                       <span>Unlock</span>
    //                     </button>
    //                   </div>
    //                 )}
    //                 {selectedTemplate?.id === template.id &&
    //                   !template.isLocked && (
    //                     <div className="absolute inset-0 bg-[#05a2ff33] flex items-center justify-center">
    //                       <p className="text-white font-medium">Selected</p>
    //                     </div>
    //                   )}
    //               </div>
    //               <div className="p-3 text-center bg-white">
    //                 <p className="font-medium text-gray-700">{template.name}</p>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </aside>

    //     {/* Preview */}
    //     <main className="h-screen overflow-y-auto flex-1 bg-[#f9fafb] flex flex-col items-center justify-start relative p-8">
    //       <div className="w-full max-w-4xl flex flex-col gap-4 items-start">
    //         {/* Back to Editor button */}
    //         {selectedTemplate && (!selectedTemplate.isLocked || showPopup) && (
    //           <button
    //             onClick={() => clickResumeDetails(selectedTemplate)}
    //             className="flex items-center gap-2 px-4 py-2 bg-[#05a2ff] hover:bg-[#028ae1] text-white rounded-lg shadow transition-all"
    //           >
    //             <FaArrowLeft size={14} />
    //             <span>Back to Editor</span>
    //           </button>
    //         )}

    //         <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col items-center">
    //           {selectedTemplate ? (
    //             <>
    //               <div className="w-full rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
    //                 <img
    //                   src={selectedTemplate.img}
    //                   alt="Preview"
    //                   className="w-full h-full object-contain"
    //                 />
    //               </div>

    //               {!selectedTemplate.isLocked && (
    //                 <button
    //                   onClick={() => clickResumeDetails(selectedTemplate)}
    //                   className="mt-8 px-6 py-3 bg-[#05a2ff] hover:bg-[#028ae1] text-white text-lg rounded-lg shadow transition-all"
    //                 >
    //                   Use This Template
    //                 </button>
    //               )}
    //             </>
    //           ) : (
    //             <div className="text-center text-gray-400">
    //               <p className="text-lg font-medium">
    //                 Select a template from the left to preview it here.
    //               </p>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </main>
    //   </div>

    //   {/* Subscription Popup */}
    //   {showPopup && (
    //     <SubscriptionPopup
    //       show={showPopup}
    //       onClose={() => {
    //         setShowPopup(false);
    //         setSelectedTemplate(null);
    //       }}
    //       onUnlock={handleUnlockSuccess}
    //       template={selectedTemplate}
    //     />
    //   )}
    // </div>

    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50/50 to-gray-100/30 text-gray-800">
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full lg:w-[340px] h-auto lg:h-screen overflow-y-auto bg-white border-r border-gray-200/50 flex flex-col shadow-subtle">
          <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50/80">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
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
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Choose a Template
              </h2>
            </div>
            <p className="text-sm text-gray-500 ml-12">
              Browse and select a resume design to preview.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {displayedTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ y: -4 }}
                  onClick={() =>
                    template.isLocked
                      ? handleUnlockClick(null, template)
                      : setSelectedTemplate(template)
                  }
                  className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 border-2 shadow-subtle hover:shadow-lg group ${
                    selectedTemplate?.id === template.id
                      ? "border-[#c40116] shadow-lg shadow-[#c40116]/20"
                      : "border-gray-100 hover:border-gray-200"
                  } ${template.isLocked ? "opacity-90" : ""}`}
                >
                  <div className="relative">
                    <div className="relative h-[180px] sm:h-[220px] md:h-[260px] lg:h-[200px] xl:h-[240px] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/50">
                      <img
                        src={template.img}
                        alt={template.name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {template.isLocked && (
                      <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 flex flex-col items-center justify-center p-4">
                        <div className="p-3 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-full backdrop-blur-sm mb-3">
                          <CrownIcon
                            width={32}
                            height={32}
                            className="text-yellow-300"
                          />
                        </div>
                        <p className="text-white font-semibold text-sm sm:text-base mb-2 text-center">
                          Premium Template
                        </p>
                        <button
                          onClick={(e) => handleUnlockClick(e, template)}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-yellow-400/30 hover:scale-[1.03] transition-all duration-300"
                        >
                          <CrownIcon width={16} height={16} />
                          <span className="text-sm">Unlock Template</span>
                        </button>
                      </div>
                    )}

                    {selectedTemplate?.id === template.id &&
                      !template.isLocked && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Selected
                        </div>
                      )}
                  </div>

                  <div className="p-3 sm:p-4 bg-gradient-to-br from-white to-gray-50/50">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                        {template.name}
                      </p>
                      {!template.isLocked && (
                        <span className="text-xs text-gray-500">Free</span>
                      )}
                    </div>
                    {template.category && (
                      <div className="mt-1.5">
                        <span className="inline-block px-2 py-1 bg-gradient-to-r from-[#c40116]/10 to-[#be0117]/10 text-[#c40116] text-xs rounded-full">
                          {template.category}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </aside>

        {/* Preview Section */}
        <main className="flex-1 h-auto lg:h-screen overflow-y-auto bg-gradient-to-br from-gray-50/50 to-white flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-4xl flex flex-col gap-4 sm:gap-6 items-start">
            {/* Back to Editor button */}
            {selectedTemplate && (!selectedTemplate.isLocked || showPopup) && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => clickResumeDetails(selectedTemplate)}
                className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r from-[#c40116] to-[#be0117] hover:from-[#a80013] hover:to-[#9e0012] text-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#c40116]/25 transition-all duration-300 group"
              >
                <FaArrowLeft
                  size={14}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span className="text-sm sm:text-base font-medium">
                  Back to Editor
                </span>
              </motion.button>
            )}

            <div className="w-full bg-white rounded-2xl shadow-soft border border-gray-100/50 overflow-hidden">
              <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-white/80 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-lg">
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                      Template Preview
                    </h2>
                    <p className="text-sm text-gray-500">
                      See how your resume will look with this template
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 md:p-8 flex flex-col items-center">
                {selectedTemplate ? (
                  <>
                    <div className="w-full max-w-2xl rounded-xl overflow-hidden shadow-soft border border-gray-100 hover:shadow-md transition-all duration-300 relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#c40116]/5 to-[#be0117]/5 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <img
                        src={selectedTemplate.img}
                        alt="Preview"
                        className="w-full h-auto object-contain rounded-xl relative"
                      />
                    </div>

                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
                      {!selectedTemplate.isLocked && (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => clickResumeDetails(selectedTemplate)}
                          className="px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-[#c40116] to-[#be0117] hover:from-[#a80013] hover:to-[#9e0012] text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#c40116]/30 transition-all duration-300 flex items-center gap-2"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                          Use This Template
                        </motion.button>
                      )}

                      {selectedTemplate.isLocked && (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) =>
                            handleUnlockClick(e, selectedTemplate)
                          }
                          className="px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-400/30 transition-all duration-300 flex items-center gap-2"
                        >
                          <CrownIcon width={18} height={18} />
                          Unlock Premium Template
                        </motion.button>
                      )}
                    </div>

                    <div className="mt-4 sm:mt-6 text-center text-gray-600 text-sm">
                      <p className="flex items-center justify-center gap-1.5">
                        <svg
                          className="w-4 h-4 text-emerald-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        This template is{" "}
                        {selectedTemplate.isLocked
                          ? "a premium design with advanced features"
                          : "completely free to use"}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="w-full max-w-md text-center py-12 sm:py-16">
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200/50 mb-6 inline-block">
                      <svg
                        className="w-16 h-16 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Select a Template
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Browse through our collection of professional resume
                      templates and select one to preview
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      <span>Choose from the sidebar to get started</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Template Stats */}
            {selectedTemplate && (
              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-100 p-3 sm:p-4">
                  <div className="text-xs text-gray-500 mb-1">Category</div>
                  <div className="font-semibold text-gray-800">
                    {selectedTemplate.category || "Professional"}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-100 p-3 sm:p-4">
                  <div className="text-xs text-gray-500 mb-1">Status</div>
                  <div className="font-semibold flex items-center gap-1.5">
                    {selectedTemplate.isLocked ? (
                      <>
                        <CrownIcon
                          width={14}
                          height={14}
                          className="text-yellow-500"
                        />
                        <span className="text-yellow-600">Premium</span>
                      </>
                    ) : (
                      <span className="text-emerald-600">Free</span>
                    )}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-100 p-3 sm:p-4">
                  <div className="text-xs text-gray-500 mb-1">Best For</div>
                  <div className="font-semibold text-gray-800">
                    {selectedTemplate.bestFor || "All Industries"}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-100 p-3 sm:p-4">
                  <div className="text-xs text-gray-500 mb-1">Style</div>
                  <div className="font-semibold text-gray-800">
                    {selectedTemplate.style || "Modern"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Subscription Popup */}
      {showPopup && (
        <SubscriptionPopup
          show={showPopup}
          onClose={() => {
            setShowPopup(false);
            setSelectedTemplate(null);
          }}
          onUnlock={handleUnlockSuccess}
          template={selectedTemplate}
        />
      )}
    </div>
  );
}
