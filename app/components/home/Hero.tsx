// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { FiArrowRight, FiZap, FiShield } from "react-icons/fi";

// const Hero = () => {
//   const router = useRouter();

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-5 md:px-6">
//       {/* Grid Background */}
//       <div
//         className="absolute inset-0 z-0 opacity-[0.06]"
//         style={{
//           backgroundImage: `linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)`,
//           backgroundSize: "80px 80px",
//         }}
//       />

//       {/* Central Glow */}
//       <div
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 sm:w-150 h-62.5 sm:h-100 blur-[120px] rounded-full opacity-20 pointer-events-none"
//         style={{ backgroundColor: "#c40116" }}
//       />

//       <div className="relative z-10 max-w-7xl mx-auto py-10 sm:py-16 md:py-24 text-center">
//         {/* Top Badge */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-black/5 backdrop-blur-md mb-8"
//         >
//           <span className="flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_#3b82f6]" />
//           <span className="text-xs font-medium text-black tracking-wide uppercase">
//             Now with AI Analysis
//           </span>
//         </motion.div>

//         {/* Headline */}
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black tracking-tight mb-6 leading-tight"
//         >
//           {/* Build job-winning resumes */}
//           Your next Job opportunity
//           <br />
//           <span className="bg-clip-text text-transparent bg-linear-to-b from-black to-red-500">
//  starts with the right resume          </span>

          

//         </motion.h1>

//         {/* Sub Text */}
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-500 mb-10 leading-relaxed"
//         >
//           ARYU SmartCV is the pro-grade AI resume builder for All.
//           ATS-perfected, AI-augmented, and ready in minutes.
//         </motion.p>

//         {/* Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 md:mb-20"
//         >
//           <button
//             onClick={() => router.push("/choose-template")}
//             className="group relative px-5 md:px-8 py-3 md:py-4 bg-white text-black font-semibold md:font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
//           >
//             {/* Start Building Free */}
//             Create My Resume Free

//             <FiArrowRight className="transition-transform group-hover:translate-x-1" />
//           </button>

//           <button
//             onClick={() => router.push("/choose-template")}
//             className="max-md:hidden px-5 md:px-8 py-3 md:py-4 bg-red-500/10 border border-black/10 text-black font-bold rounded-full backdrop-blur-sm hover:bg-black/5 transition-all cursor-pointer"
//           >
// View Templates
//           </button>
//         </motion.div>

//         {/* Preview Image */}
//         {/* <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 1 }}
//           className="relative mx-auto max-w-5xl group"
//         >
//           <div className="relative p-px rounded-3xl sm:rounded-4xl bg-linear-to-b from-white/20 to-transparent shadow-[0_0_40px_-12px_rgba(0,0,0,0.4)]">
//             <div className="bg-[#0b0f1a] rounded-3xl sm:rounded-4xl overflow-hidden">
//               <div className="absolute top-4 left-6 flex gap-2 z-20">
//                 <div className="w-3 h-3 rounded-full bg-white/10" />
//                 <div className="w-3 h-3 rounded-full bg-white/10" />
//                 <div className="w-3 h-3 rounded-full bg-white/10" />
//               </div>

//               <div className="relative w-full h-75 sm:h-112.5 md:h-[80vh]">
//                 <Image
//                   src="/images/home-resume.svg" // Update this path to your actual image
//                   alt="Product Preview - ARYU SmartCV Dashboard"
//                   fill
//                   className="object-cover object-top"
//                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
//                   priority
//                 />
//               </div>
//             </div>
//           </div>

//           <motion.div
//             animate={{ y: [0, -10, 0] }}
//             transition={{ duration: 4, repeat: Infinity }}
//             className="max-md:hidden absolute -top-12 right-0 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl"
//           >
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
//                 <FiZap />
//               </div>
//               <div className="text-left">
//                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
//                   AI Power
//                 </p>
//                 <p className="text-sm font-bold text-black">
//                   Bullet Point Auto-Gen
//                 </p>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             animate={{ y: [0, 10, 0] }}
//             transition={{ duration: 5, repeat: Infinity, delay: 1 }}
//             className="max-md:hidden absolute -bottom-10 left-0 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl"
//           >
//             <div className="flex items-center gap-3">
//               <FiShield className="text-green-400" />
//               <p className="text-sm font-semibold text-black tracking-tight">
//                 100% ATS Safe Guaranteed
//               </p>
//             </div>
//           </motion.div>
//         </motion.div> */}

//         {/* Logos */}
//         <div className="mt-10 sm:mt-16 md:mt-24 md:pt-10">
//           <p className="text-sm font-medium text-slate-500 mb-8 uppercase tracking-[0.2em]">
//             Our Users are from
//           </p>
//           <div className="flex flex-wrap justify-center gap-8 sm:gap-12 opacity-40 grayscale contrast-125">
//             <span className="text-xl font-bold italic">Google</span>
//             <span className="text-xl font-bold">Meta</span>
//             <span className="text-xl font-bold italic">Stripe</span>
//             <span className="text-xl font-bold">Amazon</span>
//             <span className="text-xl font-bold">Airbnb</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;











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
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

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

        {/* Preview Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative mx-auto max-w-5xl group"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="bg-gray-50 rounded-2xl overflow-hidden">
              <div className="relative w-full h-80 sm:h-96 md:h-[500px]">
                <Image
                  src="/images/home-resume.svg"
                  alt="Product Preview - ARYU SmartCV Dashboard"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Floating Card 1 */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -right-4 sm:-top-8 sm:-right-8 bg-white shadow-xl rounded-xl p-3 sm:p-4 border border-gray-100 hidden sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <IoFlash className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                  AI Power
                </p>
                <p className="text-xs sm:text-sm font-bold text-gray-900">
                  Bullet Point Auto-Gen
                </p>
              </div>
            </div>
          </motion.div>

          {/* Floating Card 2 */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 bg-white shadow-xl rounded-xl p-3 sm:p-4 border border-gray-100 hidden sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <FiShield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                  Guaranteed
                </p>
                <p className="text-xs sm:text-sm font-bold text-gray-900">
                  100% ATS Safe
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Trusted By Section */}
        {/* <div className="mt-16 sm:mt-20 md:mt-24">
          <p className="text-xs sm:text-sm font-medium text-gray-400 mb-6 uppercase tracking-[0.2em]">
            Trusted by professionals from
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-40">
            <span className="text-base sm:text-lg font-semibold text-gray-500">Google</span>
            <span className="text-base sm:text-lg font-semibold text-gray-500">Microsoft</span>
            <span className="text-base sm:text-lg font-semibold text-gray-500">Amazon</span>
            <span className="text-base sm:text-lg font-semibold text-gray-500">Meta</span>
            <span className="text-base sm:text-lg font-semibold text-gray-500">Apple</span>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;