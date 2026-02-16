"use client";

import { useContext, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import SubscriptionPopup from './SubscriptionPopup';
import ResumePreviewModal from "../../components/resume/ResumePreviewModal";
import { CreateContext } from "@/app/context/CreateContext";
import { templateData } from "@/app/data";
import { Template } from "@/app/types";
import Header from "@/app/components/layouts/Header";
import Footer from "@/app/components/layouts/Footer";
import { setLocalStorage } from "@/app/utils";
import { motion, AnimatePresence } from "framer-motion";


function Choose_template() {
  const router = useRouter();

  const { setChosenTemplate } = useContext(CreateContext);

  const clickresumedetails = (template: Template) => {
    setChosenTemplate(template)
    router.push(`/resume-details/contact`);
    // localStorage.setItem("chosenTemplate",JSON.stringify(template))
    
    setLocalStorage("chosenTemplate", template);

  };

  const steps = [
    { id: 1, name: "Choose template" },
    { id: 2, name: "Enter your details" },
    { id: 3, name: "Download resume" },
  ];

  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // this will hide main scrollbar
  useEffect(()=>{
    if(showPreview) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden')
    return()=>document.body.classList.remove('overflow-hidden')
  },[showPreview])

  return (
    <section className="bg-white ">
      <Header />
      <div>
        {/* Hero */}
        {/* <section className="relative max-w-7xl mx-auto px-4 md:px-6 pt-8 sm:pt-20 md:pt-24 pb-7 sm:pb-16 md:pb-20 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold md:font-extrabold tracking-tight text-gray-900 leading-tight">
            Build a Resume that
            <span className="block bg-clip-text text-transparent bg-linear-to-b from-black to-red-500 sm:mt-2">
              Gets You Hired
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto px-2">
            Choose from beautifully designed ATS-friendly templates crafted by
            hiring experts.
          </p>
        </section> */}

           {/* Hero Section - Responsive padding and text sizes */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#5E000B] to-[#C40116]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-2">
              Choose Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-200 mt-2 sm:mt-0">
                Resume Template
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto px-4">
              Just pick your favorite and start building!
            </p>

            {/* Stats - Responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-10 lg:mt-12 max-w-3xl mx-auto px-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {templateData.length}+
                </div>
                <div className="text-xs sm:text-sm text-white/80">
                  Professional Templates
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-white/80">
                  ATS Friendly
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  5min
                </div>
                <div className="text-xs sm:text-sm text-white/80">
                  Quick Setup
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Curved Bottom - Responsive */}
        <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 lg:h-10">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path d="M0 100L1440 0V100H0Z" fill="white" fillOpacity="1" />
          </svg>
        </div>
      </div>

        {/* Floating Progress Bar */}
        <div className="mt-4 sm:mt-5 max-lg:hidden z-50 max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="backdrop-blur-xl bg-white/70 border border-gray-200 rounded-xl sm:rounded-2xl shadow-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4">
            <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto pb-2">
              {steps.map((step, index) => {
                return (
                  <div
                    key={step.id}
                    className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-500 text-sm sm:text-base
                      bg-linear-to-r from-red-600 to-rose-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] sm:shadow-[0_0_20px_rgba(239,68,68,0.4)]`}
                    >
                      {step.id}
                    </div>

                    <span
                      className={`text-sm sm:text-base md:text-lg whitespace-nowrap text-gray-900 font-medium`}
                    >
                      {step.name}
                    </span>

                    {index < steps.length - 1 && (
                      <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-0.5 bg-linear-to-r from-red-400 to-rose-400 opacity-50 rounded-full shrink-0" />
                    )}
                  </div>
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
              {templateData?.map((template, index) => {
                const isFree = template.temp === "free";
                // const isLocked = !hasPlan && !isFree;

                return (
                  <div
                    key={template.id}
                    className="group relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl border border-gray-200 overflow-hidden hover:border-red-200 hover:shadow-[0_15px_40px_rgba(196,1,22,0.10)] sm:hover:shadow-[0_20px_50px_rgba(196,1,22,0.10)] md:hover:shadow-[0_25px_60px_rgba(196,1,22,0.10)] transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative bg-[#fff5f6] p-4 sm:p-6 md:p-8">
                      {/* {!isFree && (
                        <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-white text-red-600 border border-red-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold shadow-sm">
                          PREMIUM
                        </div>
                      )} */}

                      <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-white border border-gray-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                        ATS Friendly
                      </div>

                      <div className="relative w-full h-50 sm:h-62.5 md:h-75 lg:h-85">
                        <Image
                          src={template.image}
                          alt={template.style}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                      </div>

                      {/* Hover Actions */}
                      <div className="absolute inset-0 lg:bg-white/5 lg:backdrop-blur-sm flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 p-3 sm:p-4">
                        <button
                          onClick={() => {
                            setPreviewTemplate(template);
                            setShowPreview(true);
                          }}
                          className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl bg-white text-[#c40116] border border-[#c40116] font-semibold text-xs sm:text-sm md:text-base shadow hover:scale-105 transition cursor-pointer"
                        >
                          Live Preview
                        </button>

                        {/* {isLocked ? (
                          <button
                            onClick={() => {
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
                        )} */}
                        <button
                          onClick={() => {
                            clickresumedetails(template);
                          }}
                          className="px-3 sm:px-4 md:px-5 lg:px-7 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg sm:rounded-xl bg-linear-to-r from-[#c40116] to-[#be0117] text-white font-semibold text-xs sm:text-sm md:text-base shadow-lg sm:shadow-xl hover:scale-105 transition-transform cursor-pointer"
                        >
                          Use This Template
                        </button>
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
                if (previewTemplate) {
                  clickresumedetails(previewTemplate);
                }
              }}
            />

            {/* Subscription Popup */}
            {/* <SubscriptionPopup
              show={showPopup}
              onClose={() => {
                setShowPopup(false);
                setSelectedTemplate(null);
              }}
              template={selectedTemplate}
            /> */}
          </div>
        </section>
      </div>
      <Footer />
    </section>
  );
}

export default Choose_template;
