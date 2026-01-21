import {
  FaMagic,
  FaFileAlt,
  FaCheckCircle,
  FaMountain,
  FaHandHoldingUsd,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <FaFileAlt size={22} />,
    title: "Professional Templates",
    description:
      "Choose from beautifully designed, modern templates for every career level.",
  },
  {
    icon: <FaCheckCircle size={22} />,
    title: "ATS-Optimized",
    description:
      "Built to pass applicant tracking systems used by top recruiters.",
  },
  {
    icon: <FaFileAlt size={22} />,
    title: "Ready-Made Content",
    description:
      "Create your resume fast using professionally written bullet points.",
  },
  {
    icon: <FaMagic size={22} />,
    title: "AI-Powered Writing",
    description:
      "Get intelligent suggestions tailored to your job role and experience.",
  },
  {
    icon: <FaMountain size={22} />,
    title: "Stand Out Instantly",
    description:
      "Highlight your strengths with a resume that beats the competition.",
  },
  {
    icon: <FaHandHoldingUsd size={22} />,
    title: "Land Better Offers",
    description:
      "Build a resume that leads to more interviews and better salary offers.",
  },
];

export default function BetterCV() {
  const navigate = useNavigate();

  const clickchoosetemplate = () => {
    navigate("/choose-template");
  };

  return (
    <section className="relative py-24 bg-[#f9fafb] overflow-hidden">

      {/* Soft Red Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#c40116]/10 rounded-full blur-[120px]" />
      <div className="absolute top-40 -right-40 w-[500px] h-[500px] bg-[#be0117]/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold bg-[#c40116]/10 text-[#c40116]">
            Why ResumeMint?
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-slate-800">
            Everything you need to build a{" "}
            <span className="text-[#c40116]">job-winning resume</span>
          </h2>

          <p className="mt-5 text-gray-600 text-lg">
            Trusted by thousands of job seekers to create professional,
            ATS-friendly resumes with AI-powered guidance.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl border border-gray-100 shadow-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4 bg-[#c40116]/10 text-[#c40116]">
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-4 w-10 h-[3px] bg-[#c40116] rounded-full" />
            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-slate-800">
            Start building your resume in minutes
          </h3>

          <p className="mt-2 text-gray-600">
            Join 120,000+ professionals who landed interviews faster
          </p>

          <button
            onClick={clickchoosetemplate}
            className="mt-6 px-10 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#c40116] to-[#be0117] shadow-xl hover:scale-105 transition"
          >
            Build My Resume Free
          </button>
        </div>

      </div>
    </section>
  );
}
