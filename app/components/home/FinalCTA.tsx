// "use client";

// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { FaRocket } from "react-icons/fa";
// import { FiArrowRight } from "react-icons/fi";

// export const FinalCTA = () => {
//   const router = useRouter();

//   return (
//     <section className="relative bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 py-20 px-4 overflow-hidden">
//       <div className="absolute inset-0 bg-grid-white/10" />
//       <div className="relative max-w-4xl mx-auto text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6"
//         >
//           <FaRocket className="w-4 h-4 text-white" />
//           <span className="text-xs font-medium text-white uppercase">
//             Start Your Journey Today
//           </span>
//         </motion.div>

//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
//         >
//           Ready to Land Your Dream Job?
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mt-4 text-sm sm:text-base md:text-lg text-indigo-100"
//         >
//           Join 50,000+ job seekers who transformed their careers
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
//         >
//           <button
//             onClick={() => router.push("/choose-template")}
//             className="group px-8 py-3 md:py-4 bg-white text-indigo-600 font-semibold rounded-2xl hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer md:text-lg"
//           >
//             Create My Resume Free
//             <FiArrowRight className="transition-transform group-hover:translate-x-1" />
//           </button>
//           <button
//             onClick={() =>
//               document
//                 .getElementById("pricing-section")
//                 ?.scrollIntoView({ behavior: "smooth" })
//             }
//             className="px-8 py-3 md:py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all cursor-pointer md:text-lg"
//           >
//             View All Plans
//           </button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };















"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaRocket } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export const FinalCTA = () => {
  const router = useRouter();

  return (
    <section className="relative bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4 sm:mb-5 md:mb-6"
        >
          <FaRocket className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
          <span className="text-[9px] sm:text-[10px] md:text-xs font-medium text-white uppercase tracking-wide">
            Start Your Journey Today
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight px-3"
        >
          Ready to Land Your Dream Job?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-2 sm:mt-3 md:mt-4 text-[11px] sm:text-xs md:text-sm lg:text-base text-indigo-100 px-4"
        >
          Join 50,000+ job seekers who transformed their careers
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-5 sm:mt-6 md:mt-7 lg:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
        >
          <button
            onClick={() => router.push("/choose-template")}
            className="group w-full sm:w-auto px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 bg-white text-indigo-600 font-semibold rounded-xl sm:rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm md:text-base"
          >
            Create My Resume Free
            <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() =>
              document
                .getElementById("pricing-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full sm:w-auto px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl sm:rounded-2xl hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer text-xs sm:text-sm md:text-base"
          >
            View All Plans
          </button>
        </motion.div>

        {/* Trust Badges - Mobile Friendly */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 sm:mt-7 md:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6"
        >
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            <span className="text-[8px] sm:text-[9px] md:text-[10px] text-indigo-100">No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            <span className="text-[8px] sm:text-[9px] md:text-[10px] text-indigo-100">Free to start</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            <span className="text-[8px] sm:text-[9px] md:text-[10px] text-indigo-100">30-day guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};