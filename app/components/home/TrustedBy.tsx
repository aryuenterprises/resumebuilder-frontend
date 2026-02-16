'use client';

import { useRouter } from 'next/navigation';

const TrustedBy = () => {
  const router = useRouter();

  return (
    <section className="relative bg-white p-4 sm:p-6 md:p-12 lg:p-20 overflow-hidden">
      {/* Decorative shapes - adjusted for mobile */}
      <div className="absolute -top-12 -right-12 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-[#c40116]/5 rounded-full blur-xl sm:blur-2xl lg:blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-16 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-[#c40116]/5 rounded-full blur-xl sm:blur-2xl lg:blur-3xl pointer-events-none" />

      <div className="relative text-center">
        {/* Tag */}
        <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#c40116]/10 text-[#c40116] font-semibold text-xs sm:text-sm mb-4 sm:mb-6">
          Trusted by 10,000+ job seekers
        </span>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold md:font-extrabold text-slate-900 leading-tight sm:leading-tight md:leading-tight">
          Build a resume that gets <br className="hidden sm:block" />
          you hired faster
        </h2>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto px-2 sm:px-0">
          ARYU SmartCV helps you create stunning, ATS-friendly resumes in minutes.
          No design skills. No stress. Just results.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4 sm:px-0">
          <button
            onClick={() => router.push('/choose-template')}
            className="w-full sm:w-auto px-6 sm:px-10 md:px-12 py-3 sm:py-4 rounded-xl bg-[#c40116] text-white font-bold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            Build My Resume Free
          </button>

          <button
            onClick={() => router.push('/choose-template')}
            className="w-full sm:w-auto px-6 sm:px-10 md:px-12 py-3 sm:py-4 rounded-xl border-2 border-slate-200 text-slate-800 font-semibold text-sm sm:text-base md:text-lg hover:border-slate-300 cursor-pointer hover:scale-105 transition-all duration-500"
          >
            View Templates
          </button>
        </div>

        {/* Social proof stats */}
        <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0">
          <div className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-0">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
              10K+
            </span>
            <span className="text-xs sm:text-sm md:text-base text-gray-500">
              Resumes Created
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-0">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
              98%
            </span>
            <span className="text-xs sm:text-sm md:text-base text-gray-500">
              ATS Pass Rate
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-0">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
              4.9★
            </span>
            <span className="text-xs sm:text-sm md:text-base text-gray-500">
              User Rating
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-0">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
              24/7
            </span>
            <span className="text-xs sm:text-sm md:text-base text-gray-500">
              AI Assistance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;