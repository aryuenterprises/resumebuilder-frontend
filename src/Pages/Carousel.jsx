// import React, { useEffect, useRef, useState } from "react";

// function Carousel() {
//   const testimonials = [
//     { name: "Anna Peterson", time: "about 14 hours ago", title: "Finally I’m getting feedback", text: "I applied to 20+ job postings with no luck. But! Once I made an ATS-friendly resume, I’ve started getting a lot more responses from recruiters.", rating: 4 },
//     { name: "Mark Heighter", time: "about 14 hours ago", title: "Fastest resume builder, like ever", text: "BetterCV’s AI saved me tons of time, I’m sure of that. Now I have a professional resume, and it was so easy to make. Thanks!", rating: 4 },
//     { name: "Byron Moreno", time: "about 16 hours ago", title: "A great resume builder", text: "I struggled to create a resume before and had no idea it needed to be optimized for hiring software. This tool fixed it, and now I finally have a job!", rating: 4 },
//     { name: "Samantha Lee", time: "about 12 hours ago", title: "Saved me a lot of time", text: "The templates are excellent. I could create a professional resume in under 20 minutes. Highly recommend!", rating: 4 },
//     { name: "Daniel Kim", time: "about 10 hours ago", title: "Highly customizable resumes", text: "I love how I can tweak every section. It looks professional and matches my career goals perfectly.", rating: 4 },
//     { name: "Olivia Martinez", time: "about 8 hours ago", title: "Easy and intuitive", text: "Even as a first-time user, I was able to create a professional resume without any issues.", rating: 4 },
//   ];

//   const scrollRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const container = scrollRef.current;
//     const cardWidth = container.children[0].offsetWidth + 24; 
//     let scrollAmount = 0;

//     const interval = setInterval(() => {
//       scrollAmount = (activeIndex + 1) % testimonials.length * cardWidth;
//       container.scrollTo({ left: scrollAmount, behavior: "smooth" });
//       setActiveIndex((prev) => (prev + 1) % testimonials.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [activeIndex, testimonials.length]);

//   const handleDotClick = (index) => {
//     const container = scrollRef.current;
//     const cardWidth = container.children[0].offsetWidth + 24;
//     container.scrollTo({ left: index * cardWidth, behavior: "smooth" });
//     setActiveIndex(index);
//   };

//   return (
//     <div className="relative  mx-auto py-12">
//       {/* Carousel container */}
//       <div
//         ref={scrollRef}
//         className="overflow-hidden flex space-x-6 pb-12 relative z-10 snap-x snap-mandatory scrollbar-hide"
//       >
//         {testimonials.map((t, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0 w-[35%]  p-6 rounded-xl  snap-start"
//           >
//             <div className="flex space-x-1 text-[#05a2ff] mb-2 text-[25px]">
//               {"★".repeat(t.rating)}
//               {"☆".repeat(5 - t.rating)}
//             </div>
//             <h3 className="font-bold font-nunito text-[18px] mb-2">{t.title}</h3>
//             <p className="text-[16px] font-normal font-nunito mb-4 text-[#474747]">{t.text}</p>
//             <p className="text-gray-400 text-sm">
//               {t.name} • {t.time}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Bottom fade */}
//       <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-0"></div>

//       {/* Pagination dots */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {testimonials.map((_, index) => (
//           <span
//             key={index}
//             onClick={() => handleDotClick(index)}
//             className={`w-3 h-3 rounded-full cursor-pointer ${
//               index === activeIndex ? "bg-blue-400" : "bg-gray-300"
//             }`}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Carousel;


// import React, { useEffect, useRef, useState } from "react";

// function Carousel() {
//   const testimonials = [
//     { name: "Anna Peterson", time: "about 14 hours ago", title: "Finally I’m getting feedback", text: "I applied to 20+ job postings with no luck. But! Once I made an ATS-friendly resume, I’ve started getting a lot more responses from recruiters.", rating: 4 },
//     { name: "Mark Heighter", time: "about 14 hours ago", title: "Fastest resume builder, like ever", text: "BetterCV’s AI saved me tons of time, I’m sure of that. Now I have a professional resume, and it was so easy to make. Thanks!", rating: 4 },
//     { name: "Byron Moreno", time: "about 16 hours ago", title: "A great resume builder", text: "I struggled to create a resume before and had no idea it needed to be optimized for hiring software. This tool fixed it, and now I finally have a job!", rating: 4 },
//     { name: "Samantha Lee", time: "about 12 hours ago", title: "Saved me a lot of time", text: "The templates are excellent. I could create a professional resume in under 20 minutes. Highly recommend!", rating: 4 },
//     { name: "Daniel Kim", time: "about 10 hours ago", title: "Highly customizable resumes", text: "I love how I can tweak every section. It looks professional and matches my career goals perfectly.", rating: 4 },
//     { name: "Olivia Martinez", time: "about 8 hours ago", title: "Easy and intuitive", text: "Even as a first-time user, I was able to create a professional resume without any issues.", rating: 4 },
//   ];

//   const scrollRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const visibleCards = 3; // show 3 cards per view

//   const totalPages = Math.ceil(testimonials.length / visibleCards);

//   useEffect(() => {
//     const container = scrollRef.current;
//     const cardWidth = container.children[0].offsetWidth + 24; // card width + gap

//     const interval = setInterval(() => {
//       const nextIndex = (activeIndex + 1) % totalPages;
//       const scrollAmount = nextIndex * cardWidth * visibleCards;
//       container.scrollTo({ left: scrollAmount, behavior: "smooth" });
//       setActiveIndex(nextIndex);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [activeIndex, totalPages]);

//   const handleDotClick = (index) => {
//     const container = scrollRef.current;
//     const cardWidth = container.children[0].offsetWidth + 24;
//     container.scrollTo({ left: index * cardWidth * visibleCards, behavior: "smooth" });
//     setActiveIndex(index);
//   };

//   return (
//     <div className="relative  py-12 ">
//       {/* Carousel container */}
//       <div
//         ref={scrollRef}
//         className="overflow-hidden flex space-x-6 pb-5 relative z-10 snap-x snap-mandatory scrollbar-hide"
//       >
//         {testimonials.map((t, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0 basis-1/3 p-6 rounded-xl snap-start "
//           >
//             <div className="flex space-x-1 text-[#05a2ff] mb-2 text-[25px]">
//               {"★".repeat(t.rating)}
//               {"☆".repeat(5 - t.rating)}
//             </div>
//             <h3 className="font-bold font-nunito text-[18px] mb-2">{t.title}</h3>
//             <p className="text-[16px] font-normal font-nunito mb-4 text-[#474747]">{t.text}</p>
//             <p className="text-gray-400 text-[12px] font-nunito font-normal">{t.name} • {t.time}</p>
//           </div>
//         ))}
//       </div>

//       {/* Bottom fade */}
//       <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-0"></div>

//       {/* Pagination dots */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {Array.from({ length: totalPages }).map((_, index) => (
//           <span
//             key={index}
//             onClick={() => handleDotClick(index)}
//             className={`w-3 h-3 rounded-full cursor-pointer ${index === activeIndex ? "bg-blue-400" : "bg-gray-300"}`}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Carousel;


import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Carousel() {
  const testimonials = [
    { name: "Anna Peterson", time: "about 14 hours ago", title: "Finally I’m getting feedback", text: "I applied to 20+ job postings with no luck. But! Once I made an ATS-friendly resume, I’ve started getting a lot more responses from recruiters.", rating: 4 },
    { name: "Mark Heighter", time: "about 14 hours ago", title: "Fastest resumint, like ever", text: "BetterCV’s AI saved me tons of time, I’m sure of that. Now I have a professional resume, and it was so easy to make. Thanks!", rating: 4 },
    { name: "Byron Moreno", time: "about 16 hours ago", title: "A great resumint", text: "I struggled to create a resume before and had no idea it needed to be optimized for hiring software. This tool fixed it, and now I finally have a job!", rating: 4 },
    { name: "Samantha Lee", time: "about 12 hours ago", title: "Saved me a lot of time", text: "The templates are excellent. I could create a professional resume in under 20 minutes. Highly recommend!", rating: 4 },
    { name: "Daniel Kim", time: "about 10 hours ago", title: "Highly customizable resumes", text: "I love how I can tweak every section. It looks professional and matches my career goals perfectly.", rating: 4 },
    { name: "Olivia Martinez", time: "about 8 hours ago", title: "Easy and intuitive", text: "Even as a first-time user, I was able to create a professional resume without any issues.", rating: 4 },
  ];

  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // detect mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCards = isMobile ? 1 : 3;
  const totalPages = Math.ceil(testimonials.length / visibleCards);

  // desktop auto-slide
  useEffect(() => {
    if (isMobile) return;
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.children[0].offsetWidth + 24;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % totalPages;
      container.scrollTo({ left: nextIndex * cardWidth * visibleCards, behavior: "smooth" });
      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, totalPages, isMobile]);

  // mobile arrows
  const handleNext = () => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.children[0].offsetWidth + 24;
    const nextIndex = Math.min(activeIndex + 1, testimonials.length - 1);
    container.scrollTo({ left: nextIndex * cardWidth, behavior: "smooth" });
    setActiveIndex(nextIndex);
  };

  const handlePrev = () => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.children[0].offsetWidth + 24;
    const prevIndex = Math.max(activeIndex - 1, 0);
    container.scrollTo({ left: prevIndex * cardWidth, behavior: "smooth" });
    setActiveIndex(prevIndex);
  };

  // dot click
  const handleDotClick = (index) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.children[0].offsetWidth + 24;
    container.scrollTo({ left: index * cardWidth * visibleCards, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <div className="relative py-12">
      {/* Carousel */}
      <div
        ref={scrollRef}
        className="overflow-x-hidden flex space-x-6 pb-5 snap-x snap-mandatory scrollbar-hide"
      >
        {testimonials.map((t, index) => (
          <div
            key={index}
            className={`flex-shrink-0 ${isMobile ? "w-full" : "basis-1/3"} p-6 rounded-xl snap-start`}
          >
            <div className="flex space-x-1 text-[#05a2ff] mb-2 text-[25px]">
              {"★".repeat(t.rating)}
              {"☆".repeat(5 - t.rating)}
            </div>
            <h3 className="font-bold font-nunito text-[18px] mb-2">{t.title}</h3>
            <p className="text-[16px] font-normal font-nunito mb-4 text-[#474747]">{t.text}</p>
            <p className="text-gray-400 text-[12px] font-nunito font-normal">{t.name} • {t.time}</p>
          </div>
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-0"></div>

      {/* Pagination dots (desktop only) */}
      {!isMobile && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${index === activeIndex ? "bg-blue-400" : "bg-gray-300"}`}
            ></span>
          ))}
        </div>
      )}

      {/* Mobile arrows */}
      {isMobile && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-0 bottom-0 transform -translate-y-1/2 bg-[#05a2ff] text-white p-2 rounded-full shadow"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 bottom-0 transform -translate-y-1/2 bg-[#05a2ff] text-white p-2 rounded-full shadow"
          >
            <FiChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
}

export default Carousel;
