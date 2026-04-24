"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiZap, FiShield, FiTrendingUp, FiUsers } from "react-icons/fi";
import { IoDocumentText, IoRocket, IoFlash } from "react-icons/io5";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
   

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-100 rounded-full filter blur-3xl opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-500" />
          <span className="text-xs font-medium text-indigo-700 tracking-wide uppercase">
            Now with AI Analysis
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6 leading-tight"
        >
          Your next Job opportunity
          <br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            starts with the right resume
          </span>
        </motion.h1>

        {/* Sub Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500 mb-10 leading-relaxed"
        >
          ARYU SmartCV is the pro-grade AI resume builder for All.
          ATS-perfected, AI-augmented, and ready in minutes.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={() => router.push("/choose-template")}
            className="group px-6 md:px-8 py-3 md:py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2 cursor-pointer"
          >
            Create My Resume Free
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => router.push("/choose-template")}
            className="px-6 md:px-8 py-3 md:py-3.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 cursor-pointer"
          >
            View Templates
          </button>
        </motion.div>

      
      </div>
    </section>
  );
};

export default Hero;