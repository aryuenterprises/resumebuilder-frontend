'use client'
import { useRouter } from "next/navigation";
import React from "react";

const CTA = () => {
  const router=useRouter()
  return (
    <section className="bg-[#f9fafb]  p-4 sm:p-6 md:p-12 lg:p-20">
      <div className="">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="">
            <span className="inline-block mb-3 sm:mb-4 text-xs sm:text-sm font-semibold tracking-wide text-[#c40116] uppercase">
              Resume Builder Platform
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold lg:font-extrabold text-slate-900 leading-tight">
              Your resume deserves <br className="hidden sm:block" />
              better than boring templates.
            </h2>

            <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
              Build a professional, ATS-optimized resume that recruiters
              actually read. Designed for speed, clarity, and real hiring
              impact.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button onClick={()=>router.push('/choose-template')} className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-xl bg-linear-to-r from-[#c40116] to-[#c40116]/60 text-white font-semibold text-sm sm:text-base md:text-lg hover:bg-[#a80013] transition-all shadow-sm hover:shadow-md active:scale-95 ">
                Start Building Free
              </button>

              <button className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm sm:text-base md:text-lg hover:border-gray-400 transition-all hover:bg-gray-50 active:scale-95">
                Browse Templates
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#c40116]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                ATS Friendly
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#c40116]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                No Design Skills Needed
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#c40116]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Instant Download
              </span>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="relative ">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-200 p-6 sm:p-8 md:p-10">
              {/* Skeleton Loading Animation */}
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {/* Title skeleton */}
                <div className="h-4 sm:h-5 w-32 sm:w-40 bg-linear-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />

                {/* Text skeletons */}
                <div className="h-3 sm:h-4 w-full bg-linear-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
                <div className="h-3 sm:h-4 w-5/6 bg-linear-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
                <div className="h-3 sm:h-4 w-4/6 bg-linear-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />

                {/* Feature boxes skeletons */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-5 md:mt-6">
                  <div className="h-16 sm:h-20 bg-linear-to-r from-gray-200 to-gray-300 rounded-lg sm:rounded-xl animate-pulse" />
                  <div className="h-16 sm:h-20 bg-linear-to-r from-gray-200 to-gray-300 rounded-lg sm:rounded-xl animate-pulse" />
                </div>
              </div>

              {/* Footer skeleton */}
              <div className="mt-6 sm:mt-7 md:mt-8 flex items-center justify-between">
                <div className="h-3 sm:h-4 w-20 sm:w-24 bg-linear-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
                <div className="h-8 sm:h-9 md:h-10 w-28 sm:w-32 bg-linear-to-r from-[#c40116] to-[#be0117] rounded-lg sm:rounded-xl animate-pulse" />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-[#c40116]/5 rounded-full blur-xl -z-10" />
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 bg-[#be0117]/5 rounded-full blur-xl -z-10" />
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#c40116]">
              120K+
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">
              Users Trust Us
            </div>
          </div>
          <div className="text-center p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#c40116]">
              98%
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">
              ATS Success Rate
            </div>
          </div>
          <div className="text-center p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#c40116]">
              4.9★
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">
              User Rating
            </div>
          </div>
          <div className="text-center p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#c40116]">
              10K+
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">
              Resumes Created
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
