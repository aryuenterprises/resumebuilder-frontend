// 'use client';

// import { useRouter } from 'next/navigation';

// const TrustedBy = () => {
//   const router = useRouter();

//   return (
//     <section className="relative bg-white p-4 sm:p-6 md:p-12 lg:p-20 overflow-hidden">
//       {/* Decorative shapes - adjusted for mobile */}
//       <div className="absolute -top-12 -right-12 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-[#c40116]/5 rounded-full blur-xl sm:blur-2xl lg:blur-3xl pointer-events-none" />
//       <div className="absolute bottom-0 -left-16 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-[#c40116]/5 rounded-full blur-xl sm:blur-2xl lg:blur-3xl pointer-events-none" />

//       <div className="relative text-center">
//         {/* Tag */}
//         <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#c40116]/10 text-[#c40116] font-semibold text-xs sm:text-sm mb-4 sm:mb-6">
//           ATS optimized by AI  98% pass rate
//         </span>

//         {/* Headline */}
//         <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold md:font-extrabold text-slate-900 leading-tight sm:leading-tight md:leading-tight">
//          Your resume should open doors, <br className="hidden sm:block" />
// not get filtered out.

          

//         </h2>

//         {/* Subtitle */}
//         <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto px-2 sm:px-0">
//         Over 75% of resumes never reach a human recruiter. ARYU SmartCV's AI engine ensures yours passes every ATS filter and lands in front of the right people.

//         </p>

//         {/* CTA Buttons */}
//         <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4 sm:px-0">
//           <button
//             onClick={() => router.push('/choose-template')}
//             className="w-full sm:w-auto px-6 sm:px-10 md:px-12 py-3 sm:py-4 rounded-xl bg-[#c40116] text-white font-bold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-300 active:scale-95 cursor-pointer"
//           >
//             Build My Resume Free
//           </button>

//           <button
//             onClick={() => router.push('/choose-template')}
//             className="w-full sm:w-auto px-6 sm:px-10 md:px-12 py-3 sm:py-4 rounded-xl border-2 border-slate-200 text-slate-800 font-semibold text-sm sm:text-base md:text-lg hover:border-slate-300 cursor-pointer hover:scale-105 transition-all duration-500"
//           >
//             View Templates
//           </button>
//         </div>

//         {/* Social proof stats */}
//         <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0">
//           <div className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-0">
//             <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
//               10,000+
//             </span>
//             <span className="text-xs sm:text-sm md:text-base text-gray-500">
//               Resumes Created
//             </span>
//           </div>

//           <div className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-0">
//             <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
//               98%
//             </span>
//             <span className="text-xs sm:text-sm md:text-base text-gray-500">
//               ATS Pass Rate
//             </span>
//           </div>

//           <div className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-0">
//             <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
//               4.3★
//             </span>
//             <span className="text-xs sm:text-sm md:text-base text-gray-500">
//               User Rating
//             </span>
//           </div>

//           <div className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-0">
//             <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
//               3 min
//             </span>
//             <span className="text-xs sm:text-sm md:text-base text-gray-500">
// Avg. build time
//             </span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TrustedBy;








'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiTrendingUp, FiZap, FiShield, FiStar, FiClock, FiUsers } from 'react-icons/fi';

const TrustedBy = () => {
  const router = useRouter();

  const stats = [
    { value: "10,000+", label: "Resumes Created", icon: FiUsers },
    { value: "98%", label: "ATS Pass Rate", icon: FiShield },
    { value: "4.9★", label: "User Rating", icon: FiStar },
    { value: "3 min", label: "Avg Build Time", icon: FiClock },
  ];

  return (
    <section className="relative bg-white py-16 sm:py-20 md:py-24  px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6"
        >
          <FiZap className="w-3.5 h-3.5 text-indigo-600" />
          <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
            ATS optimized by AI • 98% pass rate
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
        >
          Your resume should open doors,{' '}
          <span className="block bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mt-2">
            not get filtered out.
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          Over 75% of resumes never reach a human recruiter. ARYU SmartCV's AI engine ensures 
          yours passes every ATS filter and lands in front of the right people.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
        >
          <button
            onClick={() => router.push('/choose-template')}
            className="group px-6 md:px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            Build My Resume Free
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => router.push('/choose-template')}
            className="px-6 md:px-8 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 cursor-pointer"
          >
            View Templates
          </button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
            >
              <div className="p-2 bg-indigo-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-sm text-gray-500">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-100"
        >
          <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em] mb-6">
            Trusted by professionals from
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
            <span className="text-base font-semibold text-gray-500">Google</span>
            <span className="text-base font-semibold text-gray-500">Microsoft</span>
            <span className="text-base font-semibold text-gray-500">Amazon</span>
            <span className="text-base font-semibold text-gray-500">Meta</span>
            <span className="text-base font-semibold text-gray-500">Apple</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;