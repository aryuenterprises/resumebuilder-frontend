"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "50K+", label: "Resumes Built", sublabel: "By Professionals" },
  { value: "✓", label: "Backed by Academy", sublabel: "Aryu Certified" },
  { value: "100%", label: "ATS-Compatible", sublabel: "Guaranteed Format" },
  { value: "$0", label: "Free to Start", sublabel: "Payment Not Required", special: true },
];

export const TrustBar = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-xl sm:rounded-2xl border border-indigo-100 shadow-sm p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-indigo-600 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wide">
              Trusted by Job Seekers
            </p>
            <p className="text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl mt-1 px-2">
              Join thousands who've built their careers with us
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, idx) => (
              <StatItem key={idx} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ stat }: { stat: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="text-center"
  >
    <div className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${stat.special ? 'text-emerald-600' : 'text-indigo-600'} mb-1 sm:mb-2`}>
      {stat.value}
    </div>
    <div className="h-0.5 w-8 sm:w-10 md:w-12 bg-indigo-200 mx-auto mb-2 sm:mb-3" />
    <p className="text-gray-700 font-medium text-xs sm:text-sm md:text-base">
      {stat.label}
    </p>
    <p className="text-[9px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
      {stat.sublabel}
    </p>
  </motion.div>
);