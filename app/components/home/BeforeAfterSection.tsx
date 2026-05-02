// "use client";

// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { FiArrowRight, FiZap, FiTrendingUp } from "react-icons/fi";

// export const BeforeAfterSection = () => {
//   const router = useRouter();

//   return (
//     <section className="bg-white py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
//           {/* Left Content */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//           >
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
//               <FiZap className="w-3.5 h-3.5 text-indigo-600" />
//               <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
//                 AI Transformation
//               </span>
//             </div>

//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//               From vague to interview-ready{" "}
//               <span className="block bg-linear-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
//                 in one click
//               </span>
//             </h2>

//             <p className="mt-6 text-base sm:text-lg text-gray-500 leading-relaxed">
//               PassATS analyzes your experience, suggests powerful industry
//               specific skills, and rewrites your achievements as measurable
//               impact statements - the kind that Pass ATS filters and get
//               callbacks
//             </p>

//             <div className="mt-8 flex flex-wrap gap-4">
//               <button
//                 onClick={() => router.push("/choose-template")}
//                 className="group px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2 cursor-pointer"
//               >
//                 Try Now
//                 <FiArrowRight className="transition-transform group-hover:translate-x-1" />
//               </button>

//               <button
//                 onClick={() => router.push("/choose-template")}
//                 className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 cursor-pointer"
//               >
//                 View Examples
//               </button>
//             </div>

//             {/* Stats */}
//             <div className="mt-8 pt-6 border-t border-gray-100">
//               <div className="flex flex-wrap gap-6">
//                 <StatCard value="40%" label="More Interview Calls" />
//                 <StatCard value="3x" label="Faster Shortlisting" />
//                 <StatCard value="98%" label="ATS Pass Rate" />
//               </div>
//             </div>
//           </motion.div>

//           {/* Right Card */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="relative"
//           >
//             <ComparisonCard />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const StatCard = ({ value, label }: { value: string; label: string }) => (
//   <div>
//     <p className="text-2xl font-bold text-gray-900">{value}</p>
//     <p className="text-xs text-gray-500">{label}</p>
//   </div>
// );

// const ComparisonCard = () => (
//   <div className="relative bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
//     <div className="p-5 sm:p-6 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
//       <div className="flex items-center gap-4">
//         <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-md">
//           <Image
//             src="/images/doubleresume.png"
//             alt="Double resume comparison"
//             fill
//             className="object-cover"
//             sizes="(max-width: 640px) 56px, 64px"
//           />
//         </div>
//         <div>
//           <div className="text-xs text-gray-500 font-medium">Sample transformation</div>
//           <div className="font-bold text-lg text-gray-900">Before → After</div>
//         </div>
//       </div>
//     </div>

//     <div className="p-5 sm:p-6 space-y-4">
//       <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
//         <div className="flex items-center gap-2 mb-2">
//           <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
//             Before
//           </span>
//           <div className="w-8 h-px bg-gray-200" />
//         </div>
//         <div className="text-sm sm:text-base text-gray-600 italic">
//           "Responsible for backend tasks"
//         </div>
//       </div>

//       <div className="flex justify-center">
//         <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
//           <FiTrendingUp className="w-4 h-4 text-indigo-600" />
//         </div>
//       </div>

//       <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
//         <div className="flex items-center gap-2 mb-2">
//           <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
//             After
//           </span>
//           <div className="w-8 h-px bg-indigo-200" />
//         </div>
//         <div className="text-sm sm:text-base font-medium text-gray-900">
//           "Built REST APIs for the payments module, reducing average
//           response latency by 32% and cutting error rate from 4.2% to 0.6%"
//         </div>
//       </div>
//     </div>

//     <div className="px-5 sm:p-6 pt-0 pb-5 flex flex-wrap gap-2">
//       <Tag text="ATS Optimized" color="green" />
//       <Tag text="AI Powered" color="indigo" />
//       <Tag text="Impact Metrics" color="purple" />
//     </div>

//     {/* Decorative Gradients */}
//     <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-linear-to-r from-indigo-100 to-purple-100 rounded-full blur-2xl opacity-50 pointer-events-none" />
//     <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-50 rounded-full blur-2xl opacity-50 pointer-events-none" />
//   </div>
// );

// const Tag = ({ text, color }: { text: string; color: string }) => {
//   const colorClasses = {
//     green: "bg-green-50 text-green-700",
//     indigo: "bg-indigo-50 text-indigo-700",
//     purple: "bg-purple-50 text-purple-700",
//   };
//   return (
//     <span className={`px-2 py-1 ${colorClasses[color as keyof typeof colorClasses]} text-xs rounded-full`}>
//       {text}
//     </span>
//   );
// };









"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiArrowRight, FiZap, FiTrendingUp } from "react-icons/fi";

export const BeforeAfterSection = () => {
  const router = useRouter();

  return (
    <section className="bg-white py-10 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-3 sm:mb-6 mx-auto lg:mx-0 w-fit">
              <FiZap className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-indigo-600" />
              <span className="text-[9px] sm:text-xs font-medium text-indigo-700 uppercase tracking-wide">
                AI Transformation
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              From vague to interview-ready{" "}
              <span className="block bg-linear-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mt-0.5 sm:mt-2">
                in one click
              </span>
            </h2>

            <p className="mt-3 sm:mt-5 md:mt-6 text-xs sm:text-base md:text-lg text-gray-500 leading-relaxed px-2 sm:px-0">
              PassATS analyzes your experience, suggests powerful industry
              specific skills, and rewrites your achievements as measurable
              impact statements - the kind that Pass ATS filters and get
              callbacks
            </p>

            <div className="mt-5 sm:mt-7 md:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4">
              <button
                onClick={() => router.push("/choose-template")}
                className="group w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-base"
              >
                Try Now
                <FiArrowRight className="transition-transform group-hover:translate-x-1 text-[10px] sm:text-base" />
              </button>

              <button
                onClick={() => router.push("/choose-template")}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 cursor-pointer text-xs sm:text-base"
              >
                View Examples
              </button>
            </div>

            {/* Stats */}
            <div className="mt-5 sm:mt-7 md:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6">
                <StatCard value="40%" label="More Interview Calls" />
                <StatCard value="3x" label="Faster Shortlisting" />
                <StatCard value="98%" label="ATS Pass Rate" />
              </div>
            </div>
          </motion.div>

          {/* Right Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative mt-4 sm:mt-8 lg:mt-0"
          >
            <ComparisonCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center sm:text-left">
    <p className="text-base sm:text-2xl font-bold text-gray-900">{value}</p>
    <p className="text-[8px] sm:text-xs text-gray-500 mt-0.5 sm:mt-0">{label}</p>
  </div>
);

const ComparisonCard = () => (
  <div className="relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
    <div className="p-3 sm:p-5 md:p-6 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden shadow-md flex-shrink-0">
          <Image
            src="/images/doubleresume.png"
            alt="Double resume comparison"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 40px, 56px"
          />
        </div>
        <div>
          <div className="text-[8px] sm:text-xs text-gray-500 font-medium">
            Sample transformation
          </div>
          <div className="font-bold text-sm sm:text-lg text-gray-900">
            Before → After
          </div>
        </div>
      </div>
    </div>

    <div className="p-3 sm:p-5 md:p-6 space-y-2.5 sm:space-y-4">
      <div className="p-2.5 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-100">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
          <span className="text-[8px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Before
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="text-[10px] sm:text-sm md:text-base text-gray-600 italic">
          "Responsible for backend tasks"
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-indigo-100 flex items-center justify-center">
          <FiTrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
        </div>
      </div>

      <div className="p-2.5 sm:p-4 rounded-lg sm:rounded-xl bg-indigo-50 border border-indigo-100">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
          <span className="text-[8px] sm:text-xs font-semibold text-indigo-600 uppercase tracking-wide">
            After
          </span>
          <div className="flex-1 h-px bg-indigo-200" />
        </div>
        <div className="text-[10px] sm:text-sm md:text-base font-medium text-gray-900 leading-relaxed">
          "Built REST APIs for the payments module, reducing average
          response latency by 32% and cutting error rate from 4.2% to 0.6%"
        </div>
      </div>
    </div>

    <div className="px-3 sm:px-5 md:px-6 pb-3 sm:pb-5 md:pb-6 flex flex-wrap gap-1 sm:gap-2">
      <Tag text="ATS Optimized" color="green" />
      <Tag text="AI Powered" color="indigo" />
      <Tag text="Impact Metrics" color="purple" />
    </div>

    {/* Decorative Gradients */}
    <div className="absolute -bottom-10 -right-10 w-28 h-28 sm:w-40 sm:h-40 bg-linear-to-r from-indigo-100 to-purple-100 rounded-full blur-2xl opacity-50 pointer-events-none" />
    <div className="absolute -top-10 -left-10 w-24 h-24 sm:w-32 sm:h-32 bg-indigo-50 rounded-full blur-2xl opacity-50 pointer-events-none" />
  </div>
);

const Tag = ({ text, color }: { text: string; color: string }) => {
  const colorClasses: Record<string, string> = {
    green: "bg-green-50 text-green-700",
    indigo: "bg-indigo-50 text-indigo-700",
    purple: "bg-purple-50 text-purple-700",
  };
  
  return (
    <span className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 ${colorClasses[color]} text-[8px] sm:text-xs rounded-full font-medium`}>
      {text}
    </span>
  );
};