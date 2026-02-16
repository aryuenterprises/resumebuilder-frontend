'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const BeforeAfter = () => {
  const router = useRouter();

  return (
    <section className="bg-white p-4 sm:p-6 md:p-12 lg:p-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
        {/* Left Content */}
        <div className="">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Meet ARYU SmartCV — your AI resume assistant
          </h2>
          <p className="mt-4 md:mt-6 text-base sm:text-lg text-slate-600 leading-relaxed">
            ARYU SmartCV helps polish your language, suggests role-specific
            skills, and converts achievements into measurable bullets that
            recruiters love.
          </p>

          <div className="mt-6 md:mt-8 lg:mt-10">
            <button
              onClick={() => router.push('/choose-template')}
              className="px-5 sm:px-6 py-3 md:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer"
              style={{
                background: `linear-gradient(90deg, #c40116, #be0117)`,
                color: '#fff',
              }}
            >
              Try ARYU SmartCV
            </button>
          </div>
        </div>

        {/* Right Card */}
        <div className="relative">
          <div className="p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-100 shadow-xl bg-linear-to-tr from-white to-slate-50">
            {/* Header */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-md shadow overflow-hidden">
                <Image
                  src="/images/doubleresume.png" // Update this path
                  alt="Double resume comparison"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 64px, 80px"
                />
              </div>
              <div>
                <div className="text-xs sm:text-sm text-slate-500">
                  Sample transformation
                </div>
                <div className="font-medium text-lg sm:text-xl">
                  Before → After
                </div>
              </div>
            </div>

            {/* Before/After Cards */}
            <div className="mt-6 md:mt-8 grid grid-cols-1 gap-3 sm:gap-4">
              {/* Before Card */}
              <div className="p-3 sm:p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
                <div className="text-xs text-slate-400 mb-1">Before</div>
                <div className="text-sm sm:text-base leading-relaxed">
                  &quot;Responsible for backend tasks&quot;
                </div>
              </div>

              {/* After Card */}
              <div className="p-3 sm:p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
                <div className="text-xs text-slate-400 mb-1">After</div>
                <div className="text-sm sm:text-base font-medium leading-relaxed">
                  &quot;Built REST APIs for payments, reducing latency by 32%
                  and increasing reliability.&quot;
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div
              className="max-md:hidden absolute -right-10 -bottom-10 w-40 h-40 rounded-full shadow-lg pointer-events-none"
              style={{
                background: `linear-gradient(180deg, #be011711, transparent 60%)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;