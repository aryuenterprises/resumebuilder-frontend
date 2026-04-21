// 'use client';

// import Image from 'next/image';
// import { useRouter } from 'next/navigation';

// const BeforeAfter = () => {
//   const router = useRouter();

//   return (
//     <section className="bg-white p-4 sm:p-6 md:p-12 lg:p-20">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
//         {/* Left Content */}
//         <div className="">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
// Stop guessing what recruiters want. Let AI do it.
//           </h2>
//           <p className="mt-4 md:mt-6 text-base sm:text-lg text-slate-600 leading-relaxed">
//           ARYU SmartCV analyzes your experience, suggests powerful industry specific skills, and rewrites your achievements as measurable impact statements, the kind that pass ATS filters and get callbacks.

//           </p>

//           <div className="mt-6 md:mt-8 lg:mt-10">
//             <button
//               onClick={() => router.push('/choose-template')}
//               className="px-5 sm:px-6 py-3 md:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer"
//               style={{
//                 background: `linear-gradient(90deg, #c40116, #be0117)`,
//                 color: '#fff',
//               }}
//             >
//               Try Now
//             </button>
//           </div>
//         </div>

//         {/* Right Card */}
//         <div className="relative">
//           <div className="p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-100 shadow-xl bg-linear-to-tr from-white to-slate-50">
//             {/* Header */}
//             <div className="flex items-center gap-3 sm:gap-4">
//               <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-md shadow overflow-hidden">
//                 <Image
//                   src="/images/doubleresume.png" // Update this path
//                   alt="Double resume comparison"
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 640px) 64px, 80px"
//                 />
//               </div>
//               <div>
//                 <div className="text-xs sm:text-sm text-slate-500">
//                   Sample transformation
//                 </div>
//                 <div className="font-medium text-lg sm:text-xl">
//                   Before → After
//                 </div>
//               </div>
//             </div>

//             {/* Before/After Cards */}
//             <div className="mt-6 md:mt-8 grid grid-cols-1 gap-3 sm:gap-4">
//               {/* Before Card */}
//               <div className="p-3 sm:p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
//                 <div className="text-xs text-slate-400 mb-1">Before</div>
//                 <div className="text-sm sm:text-base leading-relaxed">
//                   &quot;Responsible for backend tasks&quot;
//                 </div>
//               </div>

//               {/* After Card */}
//               <div className="p-3 sm:p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
//                 <div className="text-xs text-slate-400 mb-1">After</div>
//                 <div className="text-sm sm:text-base font-medium leading-relaxed">
//                   &quot;Built REST APIs for payments, reducing latency by 32%
//                   and increasing reliability.&quot;
//                 </div>
//               </div>
//             </div>

//             {/* Decorative elements */}
//             <div
//               className="max-md:hidden absolute -right-10 -bottom-10 w-40 h-40 rounded-full shadow-lg pointer-events-none"
//               style={{
//                 background: `linear-gradient(180deg, #be011711, transparent 60%)`,
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BeforeAfter;


'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiTrendingUp, FiZap } from 'react-icons/fi';

const BeforeAfter = () => {
  const router = useRouter();

  return (
    <section className="bg-white py-16 sm:py-20 md:py-24  px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
              <FiZap className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
                AI Transformation
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Stop guessing what recruiters want.
              <span className="block bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mt-2">
                Let AI do it.
              </span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-gray-500 leading-relaxed">
              ARYU SmartCV analyzes your experience, suggests powerful industry specific skills, 
              and rewrites your achievements as measurable impact statements — the kind that 
              pass ATS filters and get callbacks.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => router.push('/choose-template')}
                className="group px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2 cursor-pointer"
              >
                Try Now
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => router.push('/choose-template')}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 cursor-pointer"
              >
                View Examples
              </button>
            </div>

            {/* Stats */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-2xl font-bold text-gray-900">40%</p>
                  <p className="text-xs text-gray-500">More Interview Calls</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">3x</p>
                  <p className="text-xs text-gray-500">Faster Shortlisting</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">98%</p>
                  <p className="text-xs text-gray-500">ATS Pass Rate</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-md">
                    <Image
                      src="/images/doubleresume.png"
                      alt="Double resume comparison"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 56px, 64px"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">
                      Sample transformation
                    </div>
                    <div className="font-bold text-lg text-gray-900">
                      Before → After
                    </div>
                  </div>
                </div>
              </div>

              {/* Before/After Cards */}
              <div className="p-5 sm:p-6 space-y-4">
                {/* Before Card */}
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Before</span>
                    <div className="w-8 h-px bg-gray-200" />
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 italic">
                    "Responsible for backend tasks"
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <FiTrendingUp className="w-4 h-4 text-indigo-600" />
                  </div>
                </div>

                {/* After Card */}
                <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">After</span>
                    <div className="w-8 h-px bg-indigo-200" />
                  </div>
                  <div className="text-sm sm:text-base font-medium text-gray-900">
                    "Built REST APIs for payments, reducing latency by 32% and increasing reliability."
                  </div>
                </div>
              </div>

              {/* Feature Tags */}
              <div className="px-5 sm:p-6 pt-0 pb-5 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">ATS Optimized</span>
                <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full">AI Powered</span>
                <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">Impact Metrics</span>
              </div>

              {/* Decorative Gradient */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full blur-2xl opacity-50 pointer-events-none" />
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-50 rounded-full blur-2xl opacity-50 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;