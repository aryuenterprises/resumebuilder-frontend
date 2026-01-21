import React, { useContext, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image1 from "../assets/images/resume1.svg.svg";
import Image2 from "../assets/images/resume2.svg.svg";
import Image3 from "../assets/images/resume3.svg.svg";
import Image4 from "../assets/images/resume4.svg.svg";
import Image5 from "../assets/images/resume5.svg.svg";
import Image6 from "../assets/images/resume6.svg.svg";
import Image7 from "../assets/images/resume7.svg.svg";
import Image8 from "../assets/images/resume8.svg.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CreateContext } from "../App";
import CrownIcon from "../Componets/CrownIcon";
import SubscriptionPopup from "../Componets/SubscriptionPopup";
import Loader from "../Componets/Loader";

function Resume_sider() {
  const navigate = useNavigate();

  const UseContext = useContext(CreateContext);
  const Allplans = UseContext?.allplandetails;
  const allPlanStatusDetails = UseContext?.allPlanStatusDetails;

  const clickresumedetails = (templateId) => {
    navigate("/resume-details", { state: { templateId } });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1536 },
      items: 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1536, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1,
      centerMode: false,
      arrows: false,
    },
  };
  
  const templates = [
    { id: 4, img: Image1, name: "Free", temp: "free" },
    { id: 3, img: Image2, name: "The Innovator", temp: "paid" },
    { id: 5, img: Image3, name: "The Global Starter", temp: "paid" },
    { id: 6, img: Image4, name: "The Scholar", temp: "paid" },
    { id: 1, img: Image5, name: "The Creator", pic: "true", temp: "paid" },
    { id: 2, img: Image6, name: "The Analyst", pic: "true", temp: "paid" },
    // { id: 7, img: Image7, name: "sixe" },
    { id: 8, img: Image8, name: "The Communicator", temp: "paid" },
  ];

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

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // simulate loading
    return () => clearTimeout(timer);
  }, [Allplans]);

  // Unlock popup
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

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

  return (
    // <div className="relative bg-gradient-to-b from-[#ffffff] to-[#f9fafb] py-32 overflow-hidden">
    //   {/* Luxury Glow */}
    //   <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-[#c40116]/15 rounded-full blur-[140px]" />
    //   <div className="absolute top-40 -right-40 w-[520px] h-[520px] bg-[#be0117]/15 rounded-full blur-[140px]" />
    //   <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[180px]" />

    //   {loading ? (
    //     <Loader />
    //   ) : (
    //     <div className="relative px-6">
    //       {/* Header */}
    //       <div className="text-center max-w-3xl mx-auto">
    //         <span className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-full text-sm font-semibold bg-[#c40116]/10 text-[#c40116] shadow-sm">
    //           ✨ Premium Resume Templates
    //         </span>

    //         <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900">
    //           Choose a{" "}
    //           <span className="text-[#c40116]">Modern Resume Template</span>
    //           <br /> and build your career faster
    //         </h2>

    //         <p className="mt-6 text-gray-600 text-lg leading-relaxed">
    //           Professionally designed, ATS-optimized templates trusted by
    //           thousands of job seekers worldwide.
    //         </p>
    //       </div>

    //       {/* Carousel */}
    //       <div className="mt-24 relative">
    //         <Carousel
    //           responsive={responsive}
    //           swipeable
    //           draggable
    //           infinite
    //           autoPlay
    //           autoPlaySpeed={2600}
    //           keyBoardControl
    //           arrows
    //           centerMode
    //           containerClass="carousel-container"
    //           itemClass="px-6"
    //         >
    //           {displayedTemplates.map((t) => (
    //             <div key={t.id} className="group relative">
    //               {/* Card */}
    //               <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl">
    //                 {/* Image */}
    //                 <div className="relative rounded-3xl overflow-hidden">
    //                   <img
    //                     src={t.img}
    //                     alt={t.name}
    //                     className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105 rounded-3xl"
    //                   />

    //                   {/* Premium Shine */}
    //                   <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
    //                 </div>

    //                 {/* Locked Overlay */}
    //                 {t.isLocked && (
    //                   <div className="absolute inset-0  backdrop-blur-[1px] flex flex-col items-center justify-center z-20 p-6">
    //                     <CrownIcon width={52} height={52} />
    //                     <p className="mt-3 font-semibold text-lg text-slate-900">
    //                       Premium Template
    //                     </p>
    //                     <button
    //                       onClick={(e) => handleUnlockClick(e, t)}
    //                       className="mt-5 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#c40116] to-[#be0117] shadow-lg hover:scale-105 transition"
    //                     >
    //                       Unlock Premium
    //                     </button>
    //                   </div>
    //                 )}

    //                 {/* Hover CTA */}
    //                 {!t.isLocked && (
    //                   <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
    //                     <button
    //                       onClick={() => clickresumedetails(t)}
    //                       className="px-10 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#c40116] to-[#be0117] shadow-xl hover:scale-110 transition"
    //                     >
    //                       Use This Template
    //                     </button>
    //                   </div>
    //                 )}
    //               </div>

    //               {/* Name */}
    //               <div className="mt-6 text-center">
    //                 <p className="text-xl font-semibold text-slate-900">
    //                   {t.name}
    //                 </p>
    //                 <div className="w-14 h-[3px] bg-[#c40116] mx-auto mt-3 rounded-full" />
    //               </div>
    //             </div>
    //           ))}
    //         </Carousel>

    //         {/* Popup */}
    //         <SubscriptionPopup
    //           show={showPopup}
    //           onClose={() => {
    //             setShowPopup(false);
    //             setSelectedTemplate(null);
    //           }}
    //           onUnlock={handleUnlockSuccess}
    //           template={selectedTemplate}
    //         />
    //       </div>

    //       {/* Bottom CTA */}
    //       <div className="mt-28 text-center">
    //         <h3 className="text-3xl font-bold text-slate-900">
    //           Start building your resume in minutes
    //         </h3>
    //         <p className="mt-3 text-gray-600 text-lg">
    //           Join 120,000+ professionals who landed interviews faster
    //         </p>

    //         <button
    //           onClick={() => navigate("/choose-template")}
    //           className="mt-8 px-12 py-5 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#c40116] to-[#be0117] shadow-xl hover:scale-105 transition"
    //         >
    //           Build My Resume Free
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </div>

    <div className="relative bg-gradient-to-b from-[#ffffff] to-[#f9fafb]  py-4 sm:py-6 md:py-12 lgy:p-20 overflow-hidden">
      {/* Luxury Glow - Responsive */}
      <div className="absolute -top-20 -left-20 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[440px] md:h-[440px] lg:w-[520px] lg:h-[520px] bg-[#c40116]/10 sm:bg-[#c40116]/12 md:bg-[#c40116]/15 rounded-full blur-3xl sm:blur-[100px] md:blur-[120px] lg:blur-[140px]" />
      <div className="absolute top-20 -right-20 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[440px] md:h-[440px] lg:w-[520px] lg:h-[520px] bg-[#be0117]/10 sm:bg-[#be0117]/12 md:bg-[#be0117]/15 rounded-full blur-3xl sm:blur-[100px] md:blur-[120px] lg:blur-[140px]" />
      <div className="absolute bottom-[-100px] sm:bottom-[-150px] md:bottom-[-180px] lg:bottom-[-200px] left-1/2 -translate-x-1/2 w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] bg-blue-500/5 sm:bg-blue-500/7 md:bg-blue-500/10 rounded-full blur-3xl sm:blur-[100px] md:blur-[150px] lg:blur-[180px]" />

      {loading ? (
        <Loader />
      ) : (
        <div className="relative">
          {/* Header */}
          <div className="text-center  px-4 sm:px-6 md:px-12 lg:px-20 mx-auto">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#c40116]/10 text-[#c40116] shadow-sm">
              ✨ Premium Resume Templates
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold md:font-bold sm:font-extrabold leading-tight text-slate-900">
              Choose a{" "}
              <span className="text-[#c40116]">Modern Resume Template</span>
              <br /> and build your career faster
            </h2>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-xl sm:max-w-2xl mx-auto px-2 sm:px-0">
              Professionally designed, ATS-optimized templates trusted by
              thousands of job seekers worldwide.
            </p>
          </div>

          {/* Carousel */}
          <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 relative">
            <Carousel
              responsive={responsive}
              swipeable
              draggable
              infinite
              autoPlay
              autoPlaySpeed={2600}
              keyBoardControl
              arrows={window.innerWidth >= 768} // Hide arrows on mobile
              centerMode={window.innerWidth >= 768} // Center mode only on tablet+
              containerClass="carousel-container"
              itemClass="px-2 sm:px-3 md:px-4 lg:px-6"
              sliderClass="py-2" // Add some vertical padding for touch
            >
              {displayedTemplates.map((t) => (
                <div key={t.id} className="group relative px-1 sm:px-0">
                  {/* Card */}
                  <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl border border-gray-100 transition-all duration-300 sm:duration-500 hover:-translate-y-2 sm:hover:-translate-y-4 hover:shadow-xl sm:hover:shadow-2xl">
                    {/* Image */}
                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
                      <img
                        src={t.img}
                        alt={t.name}
                        className="w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] object-contain transition-transform duration-500 sm:duration-700 group-hover:scale-105 rounded-2xl sm:rounded-3xl"
                      />

                      {/* Premium Shine */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                    </div>

                    {/* Locked Overlay */}
                    {t.isLocked && (
                      <div className="absolute inset-0 backdrop-blur-[1px] flex flex-col items-center justify-center z-20 p-4 sm:p-6">
                        <CrownIcon
                          width={40}
                          height={40}
                          className="sm:w-12 sm:h-12"
                        />
                        <p className="mt-2 sm:mt-3 font-semibold text-base sm:text-lg text-slate-900 text-center">
                          Premium Template
                        </p>
                        <button
                          // onClick={(e) => handleUnlockClick(e, t)}
                          className="mt-3 sm:mt-5 px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#c40116] to-[#be0117] shadow-lg  transition text-sm sm:text-base cursor-default"
                        >
                          Coming Soon
                        </button>
                      </div>
                    )}

                    {/* Hover CTA */}
                    {!t.isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={() => clickresumedetails(t)}
                          className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#c40116] to-[#be0117] shadow-lg sm:shadow-xl hover:scale-105 transition text-sm sm:text-base"
                        >
                          Use This Template
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div className="mt-4 sm:mt-6 text-center">
                    <p className="text-lg sm:text-xl font-semibold text-slate-900">
                      {t.name}
                    </p>
                    <div className="w-10 sm:w-12 md:w-14 h-[2px] sm:h-[3px] bg-[#c40116] mx-auto mt-2 sm:mt-3 rounded-full" />
                  </div>
                </div>
              ))}
            </Carousel>

            {/* Popup */}
            <SubscriptionPopup
              show={showPopup}
              onClose={() => {
                setShowPopup(false);
                setSelectedTemplate(null);
              }}
              onUnlock={handleUnlockSuccess}
              template={selectedTemplate}
            />
          </div>

         
        </div>
      )}
    </div>
  );
}

export default Resume_sider;
