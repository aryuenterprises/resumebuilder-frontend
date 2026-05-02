"use client";

import { motion } from "framer-motion";
import { FiTrendingUp } from "react-icons/fi";
import {
  FaFileAlt,
  FaCheckCircle,
  FaMagic,
  FaRocket,
  FaMountain,
  FaHandHoldingUsd,
} from "react-icons/fa";

const features = [
  {
    icon: <FaFileAlt className="w-4 h-4 sm:w-5 sm:h-5" />,
    title: "Professional Templates",
    description:
      "6+ ATS-safe templates built for Global job roles - from fresher to senior professional",
  },
  {
    icon: <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
    title: "ATS Score 0 - 100",
    description:
      "Get a real score, see every issue, fix it in one click Not a vague 'looks good' ",
  },
  {
    icon: <FaMagic className="w-4 h-4 sm:w-5 sm:h-5" />,
    title: "JD Keyword Tailoring",
    description:
      "Paste a job description and PassATS matches your resume to it automatically",
  },
  {
    icon: <FaRocket className="w-4 h-4 sm:w-5 sm:h-5" />,
    title: "AI Bullet Writer",
    description:
      "Turns your raw experience into achievement-focused bullets with action verbs and metrics",
  },
  {
    icon: <FaMountain className="w-4 h-4 sm:w-5 sm:h-5" />,
    title: "AI Cover Letter",
    description:
      "Generate a matching cover letter in 30 seconds Three tone options",
  },
  {
    icon: <FaHandHoldingUsd className="w-4 h-4 sm:w-5 sm:h-5" />,
    title: "Download & Share",
    description: "PDF download + WhatsApp sharing Ready to send in seconds",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="relative bg-gray-50 py-10 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto px-2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-3 sm:mb-4"
          >
            <FiTrendingUp className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-indigo-600" />
            <span className="text-[9px] sm:text-[10px] md:text-xs font-medium text-indigo-700 uppercase tracking-wide">
              Built for Global's job market
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight"
          >
            Everything You Need to Pass
            <span className="block bg-linear-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mt-0.5 sm:mt-1">
              ATS and Get Shortlisted
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-2 sm:mt-3 md:mt-4 text-[11px] sm:text-xs md:text-sm lg:text-base text-gray-500 leading-relaxed"
          >
            From campus placement to senior roles - PassATS gives you the
            tools to compete with confidence in the Global job market
          </motion.p>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature, idx }: { feature: any; idx: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: idx * 0.05 }}
    viewport={{ once: true }}
    whileHover={{ y: -3 }}
    className="group bg-white rounded-lg sm:rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-4 sm:p-5 md:p-6"
  >
    <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-indigo-50 text-indigo-600 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
      {feature.icon}
    </div>
    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2">
      {feature.title}
    </h3>
    <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 leading-relaxed">
      {feature.description}
    </p>
    <div className="mt-3 sm:mt-4 w-8 sm:w-10 h-0.5 bg-indigo-200 rounded-full transition-all duration-300 group-hover:w-12 sm:group-hover:w-14 group-hover:bg-indigo-600" />
  </motion.div>
);