import React from "react";
import { motion } from "framer-motion";
import HomeImage from "../../assets/images/home-resume.svg";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiZap, FiShield } from "react-icons/fi";

const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden  px-5  md:px-6 ">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Central Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[250px] sm:h-[400px] blur-[120px] rounded-full opacity-20 pointer-events-none"
        style={{ backgroundColor: "#c40116" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto py-10 sm:py-16 md:py-24 text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-black/5 backdrop-blur-md mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_#3b82f6]" />
          <span className="text-xs font-medium text-black tracking-wide uppercase">
            Now with AI Analysis
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black tracking-tight mb-6 leading-tight"
        >
          Build job-winning resumes
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-black to-red-500">
            with AI in minutes.
          </span>
        </motion.h1>

        {/* Sub Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-500 mb-10 leading-relaxed"
        >
          ARYU SmartCV is the pro-grade AI resume builder for All.
          ATS-perfected, AI-augmented, and ready in minutes.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 md:mb-20"
        >
          <button
            onClick={() => navigate("/choose-template")}
            className="group relative px-5 md:px-8 py-3 md:py-4 bg-white text-black font-semibold  md:font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Start Building Free
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => navigate("/choose-template")}
            className=" max-md:hidden px-5 md:px-8 py-3 md:py-4 bg-red-500/10 border border-black/10 text-black font-bold rounded-full backdrop-blur-sm hover:bg-black/5 transition-all"
          >
            Browse Templates
          </button>
        </motion.div>

        {/* Preview Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative mx-auto max-w-5xl group"
        >
          <div className="relative p-[1px] rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-b from-white/20 to-transparent shadow-[0_0_40px_-12px_rgba(0,0,0,0.4)]">
            <div className="bg-[#0b0f1a] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden">
              {/* Decorative Window Buttons */}{" "}
              <div className="absolute top-4 left-6 flex gap-2 z-20">
                {" "}
                <div className="w-3 h-3 rounded-full bg-white/10" />{" "}
                <div className="w-3 h-3 rounded-full bg-white/10" />{" "}
                <div className="w-3 h-3 rounded-full bg-white/10" />{" "}
              </div>
              <img
                src={HomeImage}
                alt="Product Preview"
                className="w-full h-[300px] sm:h-[450px]  md:h-[80vh] object-cover object-top"
              />
            </div>
          </div>

          {/* Floating Cards — Hidden on Mobile */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="max-md:hidden  absolute -top-12 right-0 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                <FiZap />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  AI Power
                </p>
                <p className="text-sm font-bold text-black">
                  Bullet Point Auto-Gen
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="max-md:hidden absolute -bottom-10 left-0 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <FiShield className="text-green-400" />
              <p className="text-sm font-semibold text-black tracking-tight">
                100% ATS Safe Guaranteed
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Logos */}
        <div className="mt-10 sm:mt-16 md:mt-24  md:pt-10">
          <p className="text-sm font-medium text-slate-500 mb-8 uppercase tracking-[0.2em]">
            Our Users are from
          </p>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 opacity-40 grayscale contrast-125">
            <span className="text-xl font-bold italic">Google</span>
            <span className="text-xl font-bold">Meta</span>
            <span className="text-xl font-bold italic">Stripe</span>
            <span className="text-xl font-bold">Amazon</span>
            <span className="text-xl font-bold">Airbnb</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
