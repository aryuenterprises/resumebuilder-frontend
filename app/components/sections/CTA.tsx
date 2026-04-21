// 'use client'
// import { useRouter } from "next/navigation";
// import React from "react";

// const CTA = () => {
//   const router=useRouter()
//   return (
//     <section className="bg-[#f9fafb]  p-4 sm:p-6 md:p-12 lg:p-20">
//       <div className="">
//         <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
//           {/* Left Content */}
//           <div className="">
//             <span className="inline-block mb-3 sm:mb-4 text-xs sm:text-sm font-semibold tracking-wide text-[#c40116] uppercase">
//               {/* Resume Builder Platform */}
//               AI RESUME BUILDER FOR FRESHERS & JOB SEEKERS

//             </span>

//             <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold lg:font-extrabold text-slate-900 leading-tight">
//               Get a Job-Winning Resume in 3 Minutes <br className="hidden sm:block" />
//                 Even With No Experience



//             </h2>

//             <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
//              AI builds, writes, and optimizes your resume for real job roles so you get shortlisted faster. No experience? No problem.

//             </p>

//             {/* CTA Buttons */}
//             <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
//               <button onClick={()=>router.push('/choose-template')} className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-xl bg-linear-to-r from-[#c40116] to-[#c40116]/60 text-white font-semibold text-sm sm:text-base md:text-lg hover:bg-[#a80013] transition-all shadow-sm hover:shadow-md active:scale-95 ">
// Create My Resume Now Free
//               </button>

//               <button className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm sm:text-base md:text-lg hover:border-gray-400 transition-all hover:bg-gray-50 active:scale-95">
// See Sample Resumes
//               </button>
//             </div>

//             {/* Trust Badges */}
//             <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-500">
//               <span className="inline-flex items-center gap-1.5">
//                 <svg
//                   className="w-4 h-4 text-[#c40116]"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
// No experience needed
//               </span>
//               <span className="inline-flex items-center gap-1.5">
//                 <svg
//                   className="w-4 h-4 text-[#c40116]"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
// ATS-friendly & recruiter-ready
//               </span>
//               <span className="inline-flex items-center gap-1.5">
//                 <svg
//                   className="w-4 h-4 text-[#c40116]"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
// Download in seconds
//               </span>
//             </div>
//           </div>

//           {/* Right Visual Card */}
//           <div className="relative ">
//             <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-200 p-6 sm:p-8 md:p-10">
//               {/* Skeleton Loading Animation */}
//               <div className="space-y-4 sm:space-y-5 md:space-y-6">
//                 {/* Title skeleton */}
//                 <div className="h-4 sm:h-5 w-32 sm:w-40 bg-linear-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />

//                 {/* Text skeletons */}
//                 <div className="h-3 sm:h-4 w-full bg-linear-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
//                 <div className="h-3 sm:h-4 w-5/6 bg-linear-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
//                 <div className="h-3 sm:h-4 w-4/6 bg-linear-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />

//                 {/* Feature boxes skeletons */}
//                 <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-5 md:mt-6">
//                   <div className="h-16 sm:h-20 bg-linear-to-r from-gray-200 to-gray-300 rounded-lg sm:rounded-xl animate-pulse" />
//                   <div className="h-16 sm:h-20 bg-linear-to-r from-gray-200 to-gray-300 rounded-lg sm:rounded-xl animate-pulse" />
//                 </div>
//               </div>

//               {/* Footer skeleton */}
//               <div className="mt-6 sm:mt-7 md:mt-8 flex items-center justify-between">
//                 <div className="h-3 sm:h-4 w-20 sm:w-24 bg-linear-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
//                 <div className="h-8 sm:h-9 md:h-10 w-28 sm:w-32 bg-linear-to-r from-[#c40116] to-[#be0117] rounded-lg sm:rounded-xl animate-pulse" />
//               </div>
//             </div>

//             {/* Decorative elements */}
//             <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-[#c40116]/5 rounded-full blur-xl -z-10" />
//             <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 bg-[#be0117]/5 rounded-full blur-xl -z-10" />
//           </div>
//         </div>

//         {/* Bottom Stats */}
//         <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
//           <div className="text-center p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
//             <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#c40116]">
//               120K+
//             </div>
//             <div className="text-xs sm:text-sm text-gray-600 mt-1">
//               Users Trust Us
//             </div>
//           </div>
//           <div className="text-center p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
//             <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#c40116]">
//               98%
//             </div>
//             <div className="text-xs sm:text-sm text-gray-600 mt-1">
//               ATS Success Rate
//             </div>
//           </div>
//           <div className="text-center p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
//             <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#c40116]">
//               4.9★
//             </div>
//             <div className="text-xs sm:text-sm text-gray-600 mt-1">
//               User Rating
//             </div>
//           </div>
//           <div className="text-center p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
//             <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#c40116]">
//               10K+
//             </div>
//             <div className="text-xs sm:text-sm text-gray-600 mt-1">
//               Resumes Created
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CTA;














'use client'
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiTrendingUp, FiStar, FiUsers, FiZap } from "react-icons/fi";

const CTA = () => {
  const router = useRouter();

  const stats = [
    { value: "120K+", label: "Users Trust Us", icon: FiUsers },
    { value: "98%", label: "ATS Success Rate", icon: FiTrendingUp },
    { value: "4.9★", label: "User Rating", icon: FiStar },
    { value: "10K+", label: "Resumes Created", icon: FiCheckCircle },
  ];

  return (
    <section className="relative bg-white py-16 sm:py-20 md:py-24  overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
              <FiZap className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
                AI Resume Builder for Freshers & Job Seekers
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Get a Job-Winning Resume in 3 Minutes
              <span className="block bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mt-2">
                Even With No Experience
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed">
              AI builds, writes, and optimizes your resume for real job roles so you get shortlisted faster. 
              No experience? No problem.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => router.push('/choose-template')}
                className="group px-6 md:px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                Create My Resume Now Free
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => router.push('/choose-template')}
                className="px-6 md:px-8 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 cursor-pointer"
              >
                See Sample Resumes
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <FiCheckCircle className="w-4 h-4 text-emerald-500" />
                <span>No experience needed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiCheckCircle className="w-4 h-4 text-emerald-500" />
                <span>ATS-friendly & recruiter-ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiCheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Download in seconds</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6 sm:p-8 shadow-lg">
              {/* Card Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                  <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
                    Instant Resume Preview
                  </span>
                </div>

                {/* Resume Preview Lines */}
                <div className="space-y-3">
                  <div className="h-4 w-full bg-indigo-100 rounded-full" />
                  <div className="h-4 w-5/6 bg-indigo-100 rounded-full" />
                  <div className="h-4 w-4/6 bg-indigo-100 rounded-full" />
                </div>

                {/* Skills Section */}
                <div className="pt-4">
                  <div className="h-3 w-24 bg-indigo-200 rounded-full mb-3" />
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 shadow-sm">React.js</span>
                    <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 shadow-sm">Node.js</span>
                    <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 shadow-sm">TypeScript</span>
                    <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 shadow-sm">Next.js</span>
                  </div>
                </div>

                {/* Experience Section */}
                <div className="pt-2">
                  <div className="h-3 w-32 bg-indigo-200 rounded-full mb-3" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-indigo-50 rounded-full" />
                    <div className="h-3 w-5/6 bg-indigo-50 rounded-full" />
                  </div>
                </div>

                {/* CTA Bar */}
               
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-indigo-100 rounded-full blur-xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-100 rounded-full blur-xl -z-10" />
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center justify-center mb-2">
                <div className="p-2 bg-indigo-50 rounded-lg group-hover:scale-110 transition-transform">
                  <stat.icon className="w-4 h-4 text-indigo-600" />
                </div>
              </div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;