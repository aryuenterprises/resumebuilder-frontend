// "use client";

// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import {
//   FiAlertCircle,
//   FiShield,
//   FiSearch,
//   FiTarget,
//   FiEye,
//   FiBarChart2,
// } from "react-icons/fi";

// const features = [
//   {
//     title: "ATS Compatibility Check",
//     desc: "Scans 15+ criteria including formatting and keywords",
//     icon: <FiSearch />,
//   },
//   {
//     title: "JD Keyword Tailoring",
//     desc: "Auto-injects missing keywords from any job description",
//     icon: <FiTarget />,
//   },
//   {
//     title: "Recruiter Preview",
//     desc: "See how recruiters see your resume in 6 seconds",
//     icon: <FiEye />,
//   },
// ];

// const scoreMetrics = [
//   { label: "Keyword Match", value: 95, color: "emerald" },
//   { label: "Formatting", value: 100, color: "emerald" },
//   { label: "Readability", value: 85, color: "amber" },
// ];

// export const ATSScoreSection = () => {
//   const router = useRouter();

//   return (
//     <section className="py-20 px-4 overflow-hidden">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 mb-6">
//               <FiAlertCircle className="w-3.5 h-3.5 text-red-600" />
//               <span className="text-xs font-medium text-red-700 uppercase">
//                 Don't Get Filtered Out
//               </span>
//             </div>

//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//               75% of Resumes
//               <span className="block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
//                 Never Reach a Recruiter
//               </span>
//             </h2>

//             <p className="mt-4 text-lg text-gray-500 leading-relaxed">
//               PassATS gives you a real score from 0 to 100 and shows you
//               exactly what to fix before you apply.
//             </p>

//             <div className="mt-8 space-y-4">
//               {features.map((item, idx) => (
//                 <FeatureCard key={idx} item={item} idx={idx} />
//               ))}
//             </div>
//           </motion.div>

//           {/* Right Content - Score Card */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <ScoreCard router={router} />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const FeatureCard = ({ item, idx }: { item: any; idx: number }) => (
//   <motion.div
//     initial={{ opacity: 0, x: -20 }}
//     whileInView={{ opacity: 1, x: 0 }}
//     viewport={{ once: true }}
//     transition={{ delay: idx * 0.1 }}
//     whileHover={{ x: 5 }}
//     className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
//   >
//     <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
//       {item.icon}
//     </div>
//     <div>
//       <h4 className="font-semibold text-gray-900">{item.title}</h4>
//       <p className="text-sm text-gray-500">{item.desc}</p>
//     </div>
//   </motion.div>
// );

// const ScoreCard = ({ router }: { router: any }) => (
//   <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
//     <div className="text-center mb-8">
//       <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100">
//         <FiShield className="w-3 h-3 text-indigo-600" />
//         <span className="text-xs font-medium text-indigo-700">Your ATS Score</span>
//       </div>
//       <motion.div
//         initial={{ scale: 0.5, opacity: 0 }}
//         whileInView={{ scale: 1, opacity: 1 }}
//         transition={{ type: "spring", delay: 0.3 }}
//         className="text-7xl font-bold text-indigo-600 mt-4"
//       >
//         98%
//       </motion.div>
//     </div>

//     <div className="space-y-5">
//       {scoreMetrics.map((item, idx) => (
//         <ScoreBar key={idx} item={item} idx={idx} />
//       ))}
//     </div>

//     <div className="mt-6 p-4 bg-amber-50 rounded-xl">
//       <p className="text-sm text-amber-700 flex items-center gap-2">
//         <FiAlertCircle className="w-4 h-4" />
//         Use more action verbs to improve readability
//       </p>
//     </div>

//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       onClick={() => router.push("/ats-checker")}
//       className="mt-6 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
//     >
//       <FiBarChart2 className="w-4 h-4" />
//       Run Full ATS Check
//     </motion.button>
//   </div>
// );

// const ScoreBar = ({ item, idx }: { item: any; idx: number }) => (
//   <div>
//     <div className="flex justify-between text-sm mb-2">
//       <span className="text-gray-600">{item.label}</span>
//       <motion.span
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ delay: 0.5 + idx * 0.1 }}
//         className={`font-semibold text-${item.color}-600`}
//       >
//         {item.value}%
//       </motion.span>
//     </div>
//     <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//       <motion.div
//         initial={{ width: 0 }}
//         whileInView={{ width: `${item.value}%` }}
//         transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
//         className={`h-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-400 rounded-full`}
//       />
//     </div>
//   </div>
// );






















"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FiAlertCircle,
  FiShield,
  FiSearch,
  FiTarget,
  FiEye,
  FiBarChart2,
} from "react-icons/fi";

const features = [
  {
    title: "ATS Compatibility Check",
    desc: "Scans 15+ criteria including formatting and keywords",
    icon: <FiSearch />,
  },
  {
    title: "JD Keyword Tailoring",
    desc: "Auto-injects missing keywords from any job description",
    icon: <FiTarget />,
  },
  {
    title: "Recruiter Preview",
    desc: "See how recruiters see your resume in 6 seconds",
    icon: <FiEye />,
  },
];

const scoreMetrics = [
  { label: "Keyword Match", value: 95, color: "emerald" },
  { label: "Formatting", value: 100, color: "emerald" },
  { label: "Readability", value: 85, color: "amber" },
];

export const ATSScoreSection = () => {
  const router = useRouter();

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full bg-red-50 border border-red-100 mb-4 sm:mb-5 md:mb-6">
              <FiAlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-red-600" />
              <span className="text-[9px] sm:text-[10px] md:text-xs font-medium text-red-700 uppercase">
                Don't Get Filtered Out
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              75% of Resumes
              <span className="block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mt-0.5 sm:mt-1">
                Never Reach a Recruiter
              </span>
            </h2>

            <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 leading-relaxed">
              PassATS gives you a real score from 0 to 100 and shows you
              exactly what to fix before you apply.
            </p>

            <div className="mt-5 sm:mt-6 md:mt-7 lg:mt-8 space-y-2.5 sm:space-y-3 md:space-y-4">
              {features.map((item, idx) => (
                <FeatureCard key={idx} item={item} idx={idx} />
              ))}
            </div>
          </motion.div>

          {/* Right Content - Score Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 lg:mt-0"
          >
            <ScoreCard router={router} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ item, idx }: { item: any; idx: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: idx * 0.1 }}
    whileHover={{ x: 3 }}
    className="flex gap-2.5 sm:gap-3 md:gap-4 p-2.5 sm:p-3 md:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
  >
    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
      <div className="text-xs sm:text-sm md:text-base">{item.icon}</div>
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
        {item.title}
      </h4>
      <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-gray-500 mt-0.5 sm:mt-1">
        {item.desc}
      </p>
    </div>
  </motion.div>
);

const ScoreCard = ({ router }: { router: any }) => (
  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-gray-100">
    <div className="text-center mb-5 sm:mb-6 md:mb-7 lg:mb-8">
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-indigo-50 border border-indigo-100">
        <FiShield className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-indigo-600" />
        <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-medium text-indigo-700">
          Your ATS Score
        </span>
      </div>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", delay: 0.3 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-indigo-600 mt-2 sm:mt-3 md:mt-4"
      >
        98%
      </motion.div>
    </div>

    <div className="space-y-3 sm:space-y-4 md:space-y-5">
      {scoreMetrics.map((item, idx) => (
        <ScoreBar key={idx} item={item} idx={idx} />
      ))}
    </div>

    <div className="mt-4 sm:mt-5 md:mt-6 p-2.5 sm:p-3 md:p-4 bg-amber-50 rounded-lg sm:rounded-xl">
      <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-amber-700 flex items-center gap-1.5 sm:gap-2">
        <FiAlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
        Use more action verbs to improve readability
      </p>
    </div>

    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push("/ats-checker")}
      className="mt-4 sm:mt-5 md:mt-6 w-full py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg sm:rounded-xl font-semibold flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base"
    >
      <FiBarChart2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      Run Full ATS Check
    </motion.button>
  </div>
);

const ScoreBar = ({ item, idx }: { item: any; idx: number }) => {
  const getColorClass = (color: string) => {
    switch(color) {
      case 'emerald': return 'from-emerald-500 to-emerald-400';
      case 'amber': return 'from-amber-500 to-amber-400';
      default: return 'from-indigo-500 to-indigo-400';
    }
  };

  const getTextColorClass = (color: string) => {
    switch(color) {
      case 'emerald': return 'text-emerald-600';
      case 'amber': return 'text-amber-600';
      default: return 'text-indigo-600';
    }
  };

  return (
    <div>
      <div className="flex justify-between text-[9px] sm:text-[10px] md:text-xs lg:text-sm mb-1 sm:mb-1.5 md:mb-2">
        <span className="text-gray-600">{item.label}</span>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 + idx * 0.1 }}
          className={`font-semibold ${getTextColorClass(item.color)} text-[10px] sm:text-xs md:text-sm`}
        >
          {item.value}%
        </motion.span>
      </div>
      <div className="h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${item.value}%` }}
          transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
          className={`h-full bg-gradient-to-r ${getColorClass(item.color)} rounded-full`}
        />
      </div>
    </div>
  );
};