


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
import { FiStar, FiLinkedin, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsFillChatQuoteFill } from "react-icons/bs";

interface TestimonialItem {
  name: string;
  role: string;
  rating: number;
  text: string;
  profileImage: string;
  linkedin: string;
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
        text: "I had zero experience. This tool built my entire resume - got 3 interview calls in 10 days",
        profileImage: "/images/linkedin-arun.jpg",
        linkedin: "https://www.linkedin.com/in/arun-kumar-76a825200/",
      },
      {
        name: "Jagadeesh Balakrishnan",
        role: "Java Developer",
        rating: 5,
        text: "Super fast. I created and downloaded my resume in under 5 minutes",
        linkedin: "https://www.linkedin.com/in/jagadeesh-balakrishnan/",
        profileImage: "/images/linkedin-jagadesh.jpeg",
      },
      {
        name: "Rahul Rajeev",
        role: "UI UX Designer",
        rating: 5,
        text: "ATS score feature showed what I was missing. Fixed it and finally started getting responses",
        linkedin: "https://www.linkedin.com/in/rahulrajeev01/",
        profileImage: "/images/linkedin-rahul.jpg",
      },
      {
        name: "Balaji Srinivasan",
        role: "Business Analyst",
        rating: 4,
        text: "Before: blank resume, After: professional CV with projects & skills added automatically",
        linkedin: "https://www.linkedin.com/in/balaji-srinivasan-606465247/",
        profileImage: "/images/linkedin-balaji.jpg",
      },
      {
        name: "Amala Christober Babiyans",
        role: "HR Executive",
        rating: 5,
        text: "Better than Canva. This actually helps you get shortlisted",
        linkedin: "https://www.linkedin.com/in/christoberbabiyans/",
        profileImage: "/images/linkedin-amala.jpg",
      },
      {
        name: "Bharathwaj S",
        role: "Next.js Developer",
        rating: 5,
        text: "This resume builder is a game-changer",
        linkedin: "https://www.linkedin.com/in/bharathwaj-s-0aba95281/",
        profileImage: "/images/linkedin-bharathwaj.jpg",
      },
      {
        name: "Gopi Raman",
        role: "HR Executive",
        rating: 5,
        text: "The ATS optimization helped me land interviews at top tech companies",
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
        name: "PONARASU",
        role: "React Developer",
        rating: 4,
        text: "The AI-powered resume builder helped me create a standout resume that got me multiple interview calls",
        linkedin: "https://www.linkedin.com/in/ponarasu-ak/",
        profileImage: "/images/linkedin-ponarasu.jpg",
      },
      {
        name: "Kishore Kumar",
        role: "Brand Strategist",
        rating: 4,
        text: "The AI suggestions highlighted my skills and achievements in a way that really resonated with recruiters",
        linkedin: "https://www.linkedin.com/in/kishore-kumar-a9296a16b/",
        profileImage: "/images/linkedin-kishore.jpg",
      },
      {
        name: "Barath K",
        role: "Laravel Developer",
        rating: 4,
        text: "User-friendly interface. Created a professional resume in no time with ATS optimization",
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

  // Get visible testimonials
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

  const Star = ({ filled }: { filled: boolean }) => (
    <FiStar
      className={`w-4 h-4 ${filled ? "fill-indigo-500 text-indigo-500" : "text-gray-300"}`}
    />
  );

  return (
    <section className="relative bg-white py-16  overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="relative px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
            <BsFillChatQuoteFill className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
              Success Stories
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Trusted by Students & Professionals
            {/* <span className="block bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mt-2"> */}
              
            {/* </span> */}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            From first-time job seekers to experienced professionals — see how
            PassATS helped them build resumes that got results
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
            className="absolute left-0 lg:-left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-600 hover:text-indigo-600 transition-all duration-300 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-600 hover:text-indigo-600 transition-all duration-300 focus:outline-none"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Container */}
          <div className="relative w-full overflow-hidden px-4 sm:px-8 pb-5">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleTestimonials.map((testimonial, idx) => (
                <motion.div
                  key={`${currentIndex}-${idx}-${testimonial.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Quote Icon */}
                  <div className="px-5 pt-5">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                      <BsFillChatQuoteFill className="w-4 h-4 text-indigo-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} filled={star <= testimonial.rating} />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 min-h-[80px]">
                      "{testimonial.text}"
                    </p>

                    {/* User Info */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        {testimonial.profileImage && (
                          <div className="relative w-10 h-10">
                            <Image
                              src={testimonial.profileImage}
                              alt={testimonial.name}
                              fill
                              className="rounded-full object-cover ring-2 ring-indigo-100 group-hover:ring-indigo-200 transition-all"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                              }}
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors text-sm">
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
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 hover:bg-indigo-50 transition-all duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Connect with ${testimonial.name} on LinkedIn`}
                        >
                          <FiLinkedin className="w-4 h-4 text-[#0077b5]" />
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
        {/* <div className="flex justify-center gap-2 mt-8">
          {testimonials.slice(0, Math.ceil(testimonials.length / getItemsToShow())).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx * getItemsToShow());
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 5000);
              }}
              className={`transition-all duration-300 rounded-full h-2 ${
                Math.floor(currentIndex / getItemsToShow()) === idx
                  ? "w-6 bg-indigo-600"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Testimonial;