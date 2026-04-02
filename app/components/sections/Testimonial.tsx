// "use client";

// import React from "react";

// // Define TypeScript interfaces
// interface TestimonialItem {
//   name: string;
//   role: string;
//   rating: number;
//   text: string;
//   profileImage?: string;
//   LinkedIn?: string;
// }

// interface StarProps {
//   filled: boolean;
// }

// const Testimonial = () => {
//   const testimonials: TestimonialItem[] = [
//     {
//       name: "Aisha Khan",
//       role: "MBA Fresher",
//       rating: 5,
//       text: "I had zero experience. This tool built my entire resume  got 3 interview calls in 10 days.",
//       profileImage: "https://randomuser.me/api/por ",
//       LinkedIn:'https://www.linkedin.com/in/aishakhan'

//     },
//     {
//       name: "Rohit Mehta",
//       role: "Software Engineer",
//       rating: 5,
//       text: "ATS score feature showed what I was missing. Fixed it and finally started getting responses.",
//     },
//     {
//       name: "Sonia Patel",
//       role: "Marketing Fresher",
//       rating: 4,
//       text: "Before: blank resume. After: professional CV with projects & skills added automatically.",
//     },
//     {
//       name: "Karan Verma",
//       role: "Final Year Student",
//       rating: 5,
//       text: "Super fast. I created and downloaded my resume in under 5 minutes.",
//     },
//     {
//       name: "Neha Sharma",
//       role: "HR Executive",
//       rating: 5,
//       text: "Better than Canva. This actually helps you get shortlisted.",
//     },
//   ];

//   const Star = ({ filled }: StarProps) => (
//     <svg
//       className={`w-4 h-4 sm:w-5 sm:h-5 ${
//         filled ? "text-[#c40116]" : "text-gray-300"
//       }`}
//       fill="currentColor"
//       viewBox="0 0 20 20"
//     >
//       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.049 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z" />
//     </svg>
//   );

//   return (
//     <section className="relative bg-white py-4 sm:py-6 md:py-12 lg:py-20 overflow-hidden">
//       <div className="relative px-4 sm:px-6 lg:px-8 mx-auto">
//         {/* Header */}
//         <div className="text-center max-w-2xl sm:max-w-3xl mx-auto px-2 sm:px-0">
//           <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold lg:font-extrabold text-slate-800">
//             Trusted by students & professionals across India
//           </h3>
//           <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-500">
//             From first time job seekers to experienced professionals see how
//             ARYU SmartCV helped them build resumes that got results.
//           </p>
//         </div>

//         {/* Marquee Container */}
//         <div className="mt-8 sm:mt-12 md:mt-16 relative overflow-hidden">
//           {/* For Mobile & Tablet: Single column scroll with gradients */}
//           <div className="lg:hidden relative">
//             {/* Left Gradient for Mobile */}
//             <div className="absolute left-0 top-0 bottom-0 w-5 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

//             {/* Right Gradient for Mobile */}
//             <div className="absolute right-0 top-0 bottom-0 w-5 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

//             <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:px-6 scrollbar-hide">
//               <div
//                 className="flex gap-4 sm:gap-6"
//                 style={{ minWidth: "max-content" }}
//               >
//                 {testimonials.map((t, i) => (
//                   <div
//                     key={i}
//                     className="min-w-[280px] sm:min-w-[320px] max-w-[280px] sm:max-w-[320px] bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100"
//                   >
//                     {/* Stars */}
//                     <div className="flex items-center gap-1 mb-3 sm:mb-4">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star key={star} filled={star <= t.rating} />
//                       ))}
//                     </div>

//                     {/* Text */}
//                     <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 sm:mb-6">
//                       &quot;{t.text}&quot;
//                     </p>

//                     {/* User */}
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#c40116]/10 flex items-center justify-center font-bold text-[#c40116] text-sm sm:text-base">
//                         {t.name.charAt(0)}
//                       </div>
//                       <div>
//                         <p className="font-semibold text-slate-800 text-sm sm:text-base">
//                           {t.name}
//                         </p>
//                         <p className="text-xs text-gray-500">{t.role}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* For Desktop: Infinite Marquee with gradients */}
//           <div className="max-lg:hidden block relative overflow-hidden pb-8">
//             {/* Left Gradient for Desktop */}
//             <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" />

//             {/* Right Gradient for Desktop */}
//             <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none" />

//             <div className="flex gap-8 animate-marquee hover:[animation-play-state:paused]">
//               {[...testimonials, ...testimonials].map((t, i) => (
//                 <div
//                   key={i}
//                   className="min-w-[320px] max-w-[320px] bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
//                 >
//                   {/* Stars */}
//                   <div className="flex items-center gap-1 mb-4">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Star key={star} filled={star <= t.rating} />
//                     ))}
//                   </div>

//                   {/* Text */}
//                   <p className="text-slate-600 text-sm leading-relaxed mb-6">
//                     &quot;{t.text}&quot;
//                   </p>

//                   {/* User */}
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-[#c40116]/10 flex items-center justify-center font-bold text-[#c40116]">
//                       {t.name.charAt(0)}
//                     </div>
//                     <div>
//                       <p className="font-semibold text-slate-800">{t.name}</p>
//                       <p className="text-xs text-gray-500">{t.role}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Scroll indicator for mobile */}
//         <div className="flex items-center lg:hidden justify-center gap-2">
//           <span className="ml-2 text-xs text-gray-400">
//             ← Scroll to view more →
//           </span>
//         </div>
//       </div>

//       {/* Add CSS for marquee animation and scrollbar hiding */}
//       <style jsx>{`
//         @keyframes marquee {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//         .animate-marquee {
//           animation: marquee 30s linear infinite;
//         }

//         /* Hide scrollbar for Chrome, Safari and Opera */
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }

//         /* Hide scrollbar for IE, Edge and Firefox */
//         .scrollbar-hide {
//           -ms-overflow-style: none; /* IE and Edge */
//           scrollbar-width: none; /* Firefox */
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Testimonial;

"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TestimonialItem {
  name: string;
  role: string;
  rating: number;
  text: string;
  profileImage: string;
  linkedin: string;
}

interface StarProps {
  filled: boolean;
}

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials: TestimonialItem[] = useMemo(
    () => [
      {
        name: "Arun Kumar",
        role: "Python Developer Fresher",
        rating: 5,
        text: "I had zero experience. This tool built my entire resume — got 3 interview calls in 10 days.",
        profileImage: "/images/linkedin-arun.jpg",
        linkedin: "https://www.linkedin.com/in/arun-kumar-76a825200/",
      },
      {
        name: "Jagadeesh Balakrishnan",
        role: "java Developer",
        rating: 5,
        text: "Super fast. I created and downloaded my resume in under 5 minutes.",
        linkedin: "https://www.linkedin.com/in/jagadeesh-balakrishnan/",
        profileImage: "/images/linkedin-jagadesh.jpeg",
      },
      {
        name: "Rahul Rajeev",
        role: "UI UX Designer",
        rating: 5,
        text: "ATS score feature showed what I was missing. Fixed it and finally started getting responses.",
        linkedin: "https://www.linkedin.com/in/rahulrajeev01/",
        profileImage: "/images/linkedin-rahul.jpg",
      },
      {
        name: "Balaji Srinivasan",
        role: "Business Analyst",
        rating: 4,
        text: "Before: blank resume. After: professional CV with projects & skills added automatically.",
        linkedin: "https://www.linkedin.com/in/balaji-srinivasan-606465247/",
        profileImage: "/images/linkedin-balaji.jpg",
      },

      {
        name: "Amala Christober Babiyans",
        role: "HR Executive",
        rating: 5,
        text: "Better than Canva. This actually helps you get shortlisted.",
        linkedin: "https://www.linkedin.com/in/christoberbabiyans/",
        profileImage: "/images/linkedin-amala.jpg",
      },
      {
        name: "Bharathwaj S",
        role: "Next.js Developer",
        rating: 5,
        text: "This resume builder is a game-changer.",
        linkedin: "https://www.linkedin.com/in/bharathwaj-s-0aba95281/",
        profileImage: "/images/linkedin-bharathwaj.jpg",
      },
      {
        name: "Gopi Raman",
        role: "HR Executive",
        rating: 5,
        text: "The ATS optimization helped me land interviews at top tech companies. Highly recommended!",
        linkedin: "https://www.linkedin.com/in/gopi-raman-472228206/",
        profileImage: "/images/linkedin-gopi.jpg",
      },
      {
        name: "VENU",
        role: "MERN Developer",
        rating: 5,
        text: "Clean templates and smart suggestions. Got my resume ready in 10 minutes!",
        linkedin: "https://www.linkedin.com/in/venu-d-622892232/",
        profileImage: "/images/linkedin-venu.jpg",
      },
      {
        name: "PONARASU ",
        role: "React Developer",
        rating: 4,
        text: "The AI-powered resume builder is a game-changer. It helped me create a standout resume that got me multiple interview calls.",
        linkedin: "https://www.linkedin.com/in/ponarasu-ak/",
        profileImage: "/images/linkedin-ponarasu.jpg",
      },
      {
        name: "Kishore Kumar",
        role: "Brand & Social Media Strategist",
        rating: 4,
        text: "The AI suggestions were spot on. It highlighted my skills and achievements in a way that really resonated with recruiters.",
        linkedin: "https://www.linkedin.com/in/kishore-kumar-a9296a16b/",
        profileImage: "/images/linkedin-kishore.jpg",
      },
      {
        name: "Barath K",
        role: "Laravel Developer",
        rating: 4,  
        text: "The resume builder is incredibly user-friendly. I was able to create a professional resume in no time, and the ATS optimization feature gave me confidence that my resume would get noticed.",
        linkedin: "https://www.linkedin.com/in/barath-k-678a29250/",
        profileImage: "/images/linkedin-barath.jpg",
      },
    ],
    [],
  );

  // Handle window resize
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get number of items to show based on screen width
  const getItemsToShow = useCallback(() => {
    if (windowWidth >= 1024) return 3;
    if (windowWidth >= 768) return 2;
    return 1;
  }, [windowWidth]);

  // Get visible testimonials - computed directly without state
  const visibleTestimonials = useMemo(() => {
    const itemsToShow = getItemsToShow();
    const visibleItems = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visibleItems.push(testimonials[index]);
    }
    return visibleItems;
  }, [currentIndex, testimonials, getItemsToShow]);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  }, [testimonials.length]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, testimonials.length]);

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

  const LinkedInIcon = () => (
    <svg
      className="w-4 h-4 text-[#0077b5] hover:text-[#005e8c] transition-colors"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z" />
    </svg>
  );

 

  const ChevronLeft = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );

  const ChevronRight = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-8 sm:py-12 md:py-16 lg:py-24 overflow-hidden">
      <div className="relative px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl sm:max-w-3xl mx-auto px-2 sm:px-0 mb-8 sm:mb-12 md:mb-16"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold lg:font-extrabold text-slate-800">
            Trusted by students & professionals across India
          </h3>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-500">
            From first time job seekers to experienced professionals — see how
            ARYU SmartCV helped them build resumes that got results.
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 lg:-left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-600 hover:text-[#c40116] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#c40116]/50"
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-600 hover:text-[#c40116] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#c40116]/50"
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </button>

          {/* Carousel Container */}
          <div className="relative w-full overflow-hidden px-4 sm:px-8 pb-5">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8"
            >
              {visibleTestimonials.map((testimonial, idx) => (
                <motion.div
                  key={`${currentIndex}-${idx}-${testimonial.name}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#c40116]/20 hover:-translate-y-1 overflow-hidden"
                >
                
                

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} filled={star <= testimonial.rating} />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-5 min-h-[80px] line-clamp-4">
                      &quot;{testimonial.text}&quot;
                    </p>

                    {/* User Info */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {testimonial.profileImage ? (
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                              <Image
                                src={testimonial.profileImage}
                                alt={testimonial.name}
                                fill
                                sizes="(max-width: 768px) 40px, 48px"
                                className="rounded-full object-cover ring-2 ring-[#c40116]/10 group-hover:ring-[#c40116]/30 transition-all"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                  const placeholder = target.nextElementSibling;
                                  if (placeholder) {
                                    (placeholder as HTMLElement).style.display =
                                      "flex";
                                  }
                                }}
                              />
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 group-hover:text-[#c40116] transition-colors duration-200 text-sm sm:text-base">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>

                      {/* LinkedIn Button */}
                      {testimonial.linkedin && (
                        <motion.a
                          href={testimonial.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 hover:bg-[#0077b5]/10 transition-all duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Connect with ${testimonial.name} on LinkedIn`}
                        >
                          <LinkedInIcon />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8 sm:mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 5000);
              }}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? "w-8 h-2 bg-[#c40116]"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default Testimonial;
