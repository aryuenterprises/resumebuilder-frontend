"use client";

import React from "react";

// Define TypeScript interfaces
interface TestimonialItem {
  name: string;
  role: string;
  rating: number;
  text: string;
}

interface StarProps {
  filled: boolean;
}

const Testimonial = () => {
  const testimonials: TestimonialItem[] = [
    {
      name: "Aisha Khan",
      role: "MBA Graduate",
      rating: 5,
      text: "I got interviews within 2 weeks after using ARYU Better CV's AI suggestions.",
    },
    {
      name: "Rohit Mehta",
      role: "Software Engineer",
      rating: 5,
      text: "Clean templates and ATS checks made my resume stand out instantly.",
    },
    {
      name: "Sonia Patel",
      role: "Marketing Executive",
      rating: 4,
      text: "ARYU transformed my vague bullets into impact-driven achievements.",
    },
    {
      name: "Karan Verma",
      role: "Final Year Student",
      rating: 5,
      text: "The UI feels premium and building my resume was super fast.",
    },
    {
      name: "Neha Sharma",
      role: "HR Professional",
      rating: 5,
      text: "Best resume builder I've used. Super clean and recruiter-friendly.",
    },
  ];

  const Star = ({ filled }: StarProps) => (
    <svg
      className={`w-4 h-4 sm:w-5 sm:h-5 ${
        filled ? "text-[#c40116]" : "text-gray-300"
      }`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.049 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z" />
    </svg>
  );

  return (
    <section className="relative bg-white py-4 sm:py-6 md:py-12 lg:py-20 overflow-hidden">
      <div className="relative px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl sm:max-w-3xl mx-auto px-2 sm:px-0">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold lg:font-extrabold text-slate-800">
            Loved by Career Changers & Students
          </h3>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-500">
            120,000+ professionals trust ARYU SmartCV to land interviews faster
          </p>
        </div>

        {/* Marquee Container */}
        <div className="mt-8 sm:mt-12 md:mt-16 relative overflow-hidden">
          {/* For Mobile & Tablet: Single column scroll with gradients */}
          <div className="lg:hidden relative">
            {/* Left Gradient for Mobile */}
            <div className="absolute left-0 top-0 bottom-0 w-5 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

            {/* Right Gradient for Mobile */}
            <div className="absolute right-0 top-0 bottom-0 w-5 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:px-6 scrollbar-hide">
              <div
                className="flex gap-4 sm:gap-6"
                style={{ minWidth: "max-content" }}
              >
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="min-w-[280px] sm:min-w-[320px] max-w-[280px] sm:max-w-[320px] bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100"
                  >
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-3 sm:mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} filled={star <= t.rating} />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 sm:mb-6">
                      &quot;{t.text}&quot;
                    </p>

                    {/* User */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#c40116]/10 flex items-center justify-center font-bold text-[#c40116] text-sm sm:text-base">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm sm:text-base">
                          {t.name}
                        </p>
                        <p className="text-xs text-gray-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* For Desktop: Infinite Marquee with gradients */}
          <div className="max-lg:hidden block relative overflow-hidden pb-8">
            {/* Left Gradient for Desktop */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" />

            {/* Right Gradient for Desktop */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none" />

            <div className="flex gap-8 animate-marquee hover:[animation-play-state:paused]">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={i}
                  className="min-w-[320px] max-w-[320px] bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} filled={star <= t.rating} />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    &quot;{t.text}&quot;
                  </p>

                  {/* User */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#c40116]/10 flex items-center justify-center font-bold text-[#c40116]">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator for mobile */}
        <div className="flex items-center lg:hidden justify-center gap-2">
          <span className="ml-2 text-xs text-gray-400">
            ← Scroll to view more →
          </span>
        </div>
      </div>

      {/* Add CSS for marquee animation and scrollbar hiding */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </section>
  );
};

export default Testimonial;
