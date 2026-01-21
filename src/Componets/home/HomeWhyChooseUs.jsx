import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMagic,
  FaFileAlt,
  FaCheckCircle,
  FaMountain,
  FaHandHoldingUsd,
} from "react-icons/fa";

const features = [
  {
    icon: <FaFileAlt className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Professional Templates",
    description:
      "Choose from beautifully designed, modern templates for every career level.",
  },
  {
    icon: <FaCheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "ATS-Optimized",
    description:
      "Built to pass applicant tracking systems used by top recruiters.",
  },
  {
    icon: <FaFileAlt className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Ready-Made Content",
    description:
      "Create your resume fast using professionally written bullet points.",
  },
  {
    icon: <FaMagic className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "AI-Powered Writing",
    description:
      "Get intelligent suggestions tailored to your job role and experience.",
  },
  {
    icon: <FaMountain className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Stand Out Instantly",
    description:
      "Highlight your strengths with a resume that beats the competition.",
  },
  {
    icon: <FaHandHoldingUsd className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Land Better Offers",
    description:
      "Build a resume that leads to more interviews and better salary offers.",
  },
];

const HomeWhyChooseUs = () => {
  const navigate = useNavigate();

  return (
    <section className="relative p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20 bg-[#f9fafb] overflow-hidden">
      {/* Soft Red Glow - Responsive */}
      <div className="absolute bottom-10 sm:bottom-16 -left-20 sm:-left-40 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#c40116]/5 sm:bg-[#c40116]/10 rounded-full blur-2xl sm:blur-3xl lg:blur-[120px]" />
      <div className="absolute top-20 sm:top-40 -right-20 sm:-right-40 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#be0117]/5 sm:bg-[#be0117]/10 rounded-full blur-2xl sm:blur-3xl lg:blur-[120px]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl sm:max-w-3xl mx-auto px-2 sm:px-0">
          <span className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-[#c40116]/10 text-[#c40116]">
            Why ARYU SmartCV?
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold md:font-extrabold leading-tight text-slate-800">
            Everything you need to build a{" "}
            <span className="text-[#c40116]">job-winning resume</span>
          </h2>

          <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            Trusted by thousands of job seekers to create professional,
            ATS-friendly resumes with AI-powered guidance.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm sm:shadow-lg p-4 sm:p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-md sm:hover:shadow-2xl"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl mb-3 sm:mb-4 bg-[#c40116]/10 text-[#c40116]">
                {feature.icon}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2">
                {feature.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-3 sm:mt-4 w-8 sm:w-10 h-[2px] sm:h-[3px] bg-[#c40116] rounded-full transition-all duration-300 group-hover:w-12 sm:group-hover:w-14" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center px-2 sm:px-0">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
            Start building your resume in minutes
          </h3>

          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Join 120,000+ professionals who landed interviews faster
          </p>

          <button
            onClick={() => navigate("/choose-template")}
            className="mt-4 sm:mt-6 px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#c40116] to-[#be0117] shadow-lg sm:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95 text-sm sm:text-base md:text-lg w-full sm:w-auto"
          >
            Build My Resume Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeWhyChooseUs;