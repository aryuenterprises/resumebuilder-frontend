"use client";

import { useContext, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Define TypeScript interfaces
interface Template {
  id: number;
  img: any;
  name: string;
  pic?: string;
  temp: "free" | "paid";
  isLocked?: boolean;
}

function ResumeCarousel() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

 

  // Carousel responsive configuration
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1536 },
      items: 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1536, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1,
      centerMode: false,
      arrows: false,
    },
  };

  // Templates data
  const templates: Template[] = [
    { id: 4, img: "/images/resume1.svg", name: "Free", temp: "free" },
    { id: 3, img: "/images/resume1.svg", name: "The Innovator", temp: "free" },
    {
      id: 5,
      img: "/images/resume2.svg",
      name: "The Global Starter",
      temp: "free",
    },
    { id: 6, img: "/images/resume3.svg", name: "The Scholar", temp: "free" },
    {
      id: 1,
      img: "/images/resume4.svg",
      name: "The Creator",
      pic: "true",
      temp: "free",
    },
    {
      id: 2,
      img: "/images/resume5.svg",
      name: "The Analyst",
      pic: "true",
      temp: "free",
    },
    {
      id: 8,
      img: "/images/resume6.svg",
      name: "The Communicator",
      temp: "free",
    },
  ];

  return (
    <div className="relative bg-linear-to-b from-[#ffffff] to-[#f9fafb] py-4 sm:py-6 md:py-12 lg:py-20 overflow-hidden">
      {/* Luxury Glow - Responsive */}
      <div className="absolute top-30 -right-20 w-70 h-70 sm:w-90 sm:h-90 md:w-110 md:h-110 lg:w-130 lg:h-130 bg-[#be0117]/10 sm:bg-[#be0117]/12 md:bg-[#be0117]/15 rounded-full blur-3xl sm:blur-[100px] md:blur-[120px] lg:blur-[140px]" />
      <div className="absolute -bottom-25 sm:-bottom-37.5 md:-bottom-45 lg:-bottom-50 left-1/2 -translate-x-1/2 w-[320px] h-80 sm:w-105 sm:h-105 md:w-130 md:h-130 lg:w-150 lg:h-150 xl:w-175 xl:h-175 bg-red-500/5 sm:bg-red-500/7 md:bg-red-500/10 rounded-full blur-3xl sm:blur-[100px] md:blur-[150px] lg:blur-[180px]" />

      <div className="relative">
        {/* Header */}
        <div className="text-center px-4 sm:px-6 md:px-12 lg:px-20 mx-auto">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#c40116]/10 text-[#c40116] shadow-sm">
            Premium Resume Templates
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold md:font-bold sm:font-extrabold leading-tight text-slate-900">
            Choose a{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-b from-black to-red-500">
              Modern Resume Template
            </span>
            <br /> and build your career faster
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-xl sm:max-w-2xl mx-auto px-2 sm:px-0">
            Professionally designed, ATS-optimized templates trusted by
            thousands of job seekers worldwide.
          </p>
        </div>

        {/* Carousel */}
        <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 relative px-4 sm:px-6">
          <Carousel
            responsive={responsive}
            swipeable
            draggable
            infinite
            autoPlay
            autoPlaySpeed={2600}
            keyBoardControl
            arrows={!isMobile}
            centerMode={!isMobile}
            containerClass="carousel-container"
            itemClass="px-1 sm:px-2 md:px-3 lg:px-4"
            sliderClass="py-2"
            additionalTransfrom={0}
          >
            {templates.map((t) => (
              <div key={t.id} className="group relative px-1 sm:px-0 h-full">
                {/* Card */}
                <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden  border border-gray-100 transition-all duration-300 sm:duration-500    h-full flex flex-col">
                  {/* Image */}
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden grow">
                    <div className="relative w-full h-70 sm:h-80 md:h-100 lg:h-110 ">
                      <Image
                        src={t.img}
                        alt={t.name}
                        fill
                        unoptimized
                        quality={100}
                        className="object-cover object-top transition-transform duration-500 sm:duration-700  rounded-2xl sm:rounded-3xl"
                      />
                    </div>

                    {/* Premium Shine */}
                    {/* <div className="absolute inset-0 bg-linear-to-t from-red-200 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" /> */}
                  </div>

                  {/* <div className="absolute inset-0 flex items-center justify-center bg-white/50  opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <button
                      onClick={() => router.push('/choose-template')}
                      className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-xl font-bold text-white bg-linear-to-r from-[#c40116] to-[#c40116]/60 shadow-lg sm:shadow-xl hover:scale-105 transition text-sm sm:text-base cursor-pointer"
                    >
                      Use This Template
                    </button>
                  </div> */}
                </div>
              </div>
            ))}
          </Carousel>

          {/* Popup */}
          {/* <SubscriptionPopup
              show={showPopup}
              onClose={() => {
                setShowPopup(false);
                setSelectedTemplate(null);
              }}
              onUnlock={handleUnlockSuccess}
              template={selectedTemplate}
            /> */}
        </div>

        {/* Bottom CTA (Optional - commented out in original) */}
        <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-28 text-center px-4">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            Start building your resume in minutes
          </h3>
          <p className="mt-3 text-gray-600 text-base sm:text-lg md:text-xl">
            Join 120,000+ professionals who landed interviews faster
          </p>

          <button
            onClick={() => router.push("/choose-template")}
            className="mt-6 sm:mt-8 px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 rounded-xl font-bold text-base sm:text-lg md:text-xl text-white bg-linear-to-r from-[#c40116] to-[#c40116]/60 shadow-xl hover:scale-105 transition cursor-pointer"
          >
            Build My Resume Free
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResumeCarousel;
