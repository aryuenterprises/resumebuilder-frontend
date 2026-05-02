"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiUsers, FiTrendingUp, FiStar } from "react-icons/fi";

const stats = [
  { value: 120, suffix: "K+", label: "Trusted Users", icon: FiUsers },
  { value: 98, suffix: "%", label: "ATS Success", icon: FiTrendingUp },
  { value: 4.9, suffix: "★", label: "User Rating", icon: FiStar },
];

export const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      <div className="relative z-10 text-center w-full max-w-7xl mx-auto">
        {/* Top Badge - Hidden on mobile, smaller on tablet */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden sm:inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4 sm:mb-6"
        >
          <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-indigo-500" />
          <span className="text-[10px] sm:text-xs font-medium text-indigo-700 tracking-wide uppercase">
            Intelligent Resume Builder
          </span>
        </motion.div>

        {/* Main Headline - Reduced font sizes for mobile */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 tracking-tight mb-4 sm:mb-6 leading-tight sm:leading-[1.2] mt-0"
        >
          Your Dream{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-linear">
              Job opportunity
            </span>
          </span>
          <br className="hidden xs:block" />
          <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            starts with the right resume
          </span>
        </motion.h1>

        {/* Description - Smaller text on mobile */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-5xl mx-auto text-sm xs:text-base sm:text-lg md:text-xl text-gray-500 mb-6 sm:mb-8 md:mb-10 leading-relaxed px-2 sm:px-4"
        >
          Build a professional, ATS-optimised resume in minutes - with AI that
          understands the Global job market. Backed by Aryu Academy - trusted
          by students and professionals across Global
        </motion.p>

     


{/* CTA Buttons */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.6 }}
  className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-10 md:mb-12"
>
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => router.push("/choose-plan")}
    className="w-full sm:w-fit px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl sm:rounded-2xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 cursor-pointer text-sm sm:text-base md:text-lg"
  >
    View Plans
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => router.push("/choose-template")}
    className="group relative w-full sm:w-fit px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all duration-300 flex items-center gap-2 cursor-pointer text-sm sm:text-base md:text-lg overflow-hidden justify-center border-2 border-indigo-100"
  >
    <span className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    <span className="relative flex items-center gap-2">
      Build My Resume{" "}
      <FiArrowRight className="text-sm sm:text-base transition-transform group-hover:translate-x-1" />
    </span>
  </motion.button>
</motion.div>


        {/* Stats - Better spacing and sizing on mobile */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }} 
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6"
        >
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-1.5 sm:gap-2 bg-white/50 sm:bg-transparent px-2 sm:px-0 py-1 sm:py-0 rounded-lg sm:rounded-none"
            >
              <div className="p-1 sm:p-1.5 rounded-full bg-indigo-50 flex-shrink-0">
                <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
              </div>
              <div className="flex items-baseline gap-0.5 sm:gap-1">
                <span className="font-bold text-gray-900 text-xs sm:text-sm md:text-lg">
                  {stat.value}
                  {stat.suffix}
                </span>
                <span className="text-[9px] xs:text-[10px] sm:text-xs text-gray-500">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};