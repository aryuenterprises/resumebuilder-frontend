// "use client";

// import { useState } from "react";
// import { IoIosArrowDown } from "react-icons/io";
// import { useRouter } from "next/navigation";

// // Define TypeScript interfaces
// interface FAQItem {
//   question: string;
//   answer: string;
// }

// interface FAQCategory {
//   id: string;
//   name: string;
//   icon?: string;
//   description?: string;
//   faqs: FAQItem[];
// }

// const faqCategories: FAQCategory[] = [
//   {
//     id: "general",
//     name: "General",
//     icon: "📋",
//     description: "Basic questions about ARYU SmartCV",
//     faqs: [
//       {
//         question: "Can I create a resume without any experience?",
//         answer:
//           "Yes. This tool is built for freshers. The AI automatically creates projects, skills, and experience-style content so your resume doesn’t look empty.",
//       },
//       {
//         question: "Will my resume pass ATS (Applicant Tracking Systems)?",
//         answer:
// "Yes. Every resume is optimized with the right format and keywords to pass ATS and get shortlisted by recruiters."
//       },
//       {
//         question: "How long does it take to build a resume",
//         answer:
//           "Less than 2 minutes. You enter basic details and the AI generates a complete, job-ready resume instantly.",
//       },
//       {
//         question: "Will this help me get interview calls?",
//         answer:
//           "Yes. The resume is designed to improve your chances of getting shortlisted, and many users start receiving interview calls within 7 to 14 days.",
//       },
//     ],
//   },
 
// ];

// export default function Faq() {
//   const router = useRouter();
//   const [openIndex, setOpenIndex] = useState<number | null>(null);
//   const [activeCategory, setActiveCategory] = useState<string>("general");
//   const [searchTerm, setSearchTerm] = useState("");

//   const toggle = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   // Get current category
//   const currentCategory = faqCategories.find(
//     (cat) => cat.id === activeCategory,
//   );

//   // Filter FAQs based on search term
//   const getFilteredFaqs = () => {
//     if (!searchTerm.trim()) {
//       return currentCategory?.faqs || [];
//     }

//     const searchLower = searchTerm.toLowerCase();
//     return (
//       currentCategory?.faqs.filter(
//         (faq) =>
//           faq.question.toLowerCase().includes(searchLower) ||
//           faq.answer.toLowerCase().includes(searchLower),
//       ) || []
//     );
//   };

//   const filteredFaqs = getFilteredFaqs();

//   return (
//     <section className="relative bg-[#f9fafb] p-4 sm:p-6 md:p-12 lg:p-20 overflow-hidden">
//       <div className="relative max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center max-w-2xl sm:max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
//           <span className="inline-block mb-3 sm:mb-4 md:mb-5 px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-[#c40116]/10 text-[#c40116]">
//             Help Center
//           </span>

//           <h2 className="font-bold md:font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
// Still Doubting? Let’s Clear That 
//           </h2>

//           <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
//            Quick answers before you build your resume and start getting interview calls

//           </p>
//         </div>

//         {/* Category Tabs */}
//         {/* <div className="mb-8 sm:mb-12 md:mb-16">
//           <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
//             {faqCategories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => {
//                   setActiveCategory(category.id);
//                   setOpenIndex(null); // Reset open FAQ when changing category
//                   if (searchTerm) setSearchTerm(""); // Clear search when changing category
//                 }}
//                 className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 ${
//                   activeCategory === category.id
//                     ? "bg-white border-[#c40116] shadow-lg shadow-[#c40116]/10"
//                     : "bg-white/50 border-gray-200 hover:border-gray-300 hover:shadow-md"
//                 }`}
//               >
//                 <span className="text-xl sm:text-2xl mb-1.5 sm:mb-2">
//                   {category.icon}
//                 </span>
//                 <span
//                   className={`font-semibold text-sm sm:text-base ${
//                     activeCategory === category.id
//                       ? "text-[#c40116]"
//                       : "text-gray-700"
//                   }`}
//                 >
//                   {category.name}
//                 </span>
//                 <span className="text-xs text-gray-500 mt-1 hidden sm:block">
//                   {category.description}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div> */}

//         {/* Current Category Header */}
//         {/* <div className="mb-6 sm:mb-8">
//           <div className="flex items-center gap-3 sm:gap-4">
//             <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#c40116]/10 flex items-center justify-center">
//               <span className="text-lg sm:text-xl">
//                 {currentCategory?.icon}
//               </span>
//             </div>
//             <div>
//               <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
//                 {currentCategory?.name}
//               </h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 {currentCategory?.description}
//               </p>
//             </div>
//           </div>
//         </div> */}

//         {/* FAQ Cards */}
//         <div className="space-y-3 sm:space-y-4 md:space-y-6">
//           {filteredFaqs.length > 0 ? (
//             filteredFaqs.map((faq, index) => {
//               const isOpen = openIndex === index;

//               return (
//                 <div
//                   key={index}
//                   className={`group relative bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm sm:shadow-md transition-all duration-300 ${
//                     isOpen ? "shadow-lg sm:shadow-xl" : "hover:shadow-md"
//                   }`}
//                 >
//                   {/* Button */}
//                   <button
//                     onClick={() => toggle(index)}
//                     className="relative w-full flex justify-between items-center px-4 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 lg:py-7 text-left focus:outline-none focus:rounded-xl sm:focus:rounded-2xl"
//                     aria-expanded={isOpen}
//                     aria-controls={`faq-answer-${activeCategory}-${index}`}
//                   >
//                     <span className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-slate-800 leading-relaxed pr-4 sm:pr-6">
//                       {faq.question}
//                     </span>

//                     <div
//                       className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 ${
//                         isOpen
//                           ? "bg-[#c40116] text-white"
//                           : "bg-[#c40116]/10 text-[#c40116] group-hover:bg-[#c40116]/20"
//                       }`}
//                     >
//                       <IoIosArrowDown
//                         className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300 ${
//                           isOpen ? "rotate-180" : ""
//                         }`}
//                       />
//                     </div>
//                   </button>

//                   {/* Panel */}
//                   <div
//                     id={`faq-answer-${activeCategory}-${index}`}
//                     className={`px-4 sm:px-5 md:px-6 lg:px-8 overflow-hidden transition-all duration-300 ease-in-out ${
//                       isOpen
//                         ? "max-h-96 sm:max-h-80 md:max-h-72 pb-4 sm:pb-5 md:pb-6 lg:pb-7"
//                         : "max-h-0"
//                     }`}
//                     role="region"
//                     aria-labelledby={`faq-question-${activeCategory}-${index}`}
//                   >
//                     <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
//                       {faq.answer}
//                     </p>
//                   </div>

//                   {/* Bottom border effect */}
//                   <div
//                     className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c40116]/10 to-transparent transition-opacity duration-300 ${
//                       isOpen ? "opacity-100" : "opacity-0"
//                     }`}
//                   />
//                 </div>
//               );
//             })
//           ) : (
//             // No results message
//             <div className="text-center py-12 sm:py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
//               <div className="text-5xl mb-4">🔍</div>
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                 No results found
//               </h3>
//               <p className="text-gray-500 max-w-md mx-auto">
//                 We couldn't find any FAQs matching "{searchTerm}". Try searching
//                 with different keywords or browse the categories above.
//               </p>
//               <button
//                 onClick={() => {
//                   setSearchTerm("");
//                   setOpenIndex(null);
//                 }}
//                 className="mt-6 px-6 py-2.5 rounded-xl font-semibold text-[#c40116] bg-[#c40116]/10 hover:bg-[#c40116]/20 transition-colors"
//               >
//                 Clear Search
//               </button>
//             </div>
//           )}
//         </div>

      
//       </div>

//       {/* Decorative elements */}
//       <div className="absolute -top-20 -left-20 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-[#c40116]/5 rounded-full blur-3xl sm:blur-[100px] pointer-events-none" />
//       <div className="absolute bottom-0 -right-20 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-[#be0117]/5 rounded-full blur-3xl sm:blur-[100px] pointer-events-none" />
//     </section>
//   );
// }



"use client";

import { useState } from "react";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Define TypeScript interfaces
interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Can I create a resume without any experience?",
    answer:
      "Yes. This tool is built for freshers. The AI automatically creates projects, skills, and experience-style content so your resume doesn't look empty.",
  },
  {
    question: "Will my resume pass ATS (Applicant Tracking Systems)?",
    answer:
      "Yes. Every resume is optimized with the right format and keywords to pass ATS and get shortlisted by recruiters.",
  },
  {
    question: "How long does it take to build a resume?",
    answer:
      "Less than 2 minutes. You enter basic details and the AI generates a complete, job-ready resume instantly.",
  },
  {
    question: "Will this help me get interview calls?",
    answer:
      "Yes. The resume is designed to improve your chances of getting shortlisted, and many users start receiving interview calls within 7 to 14 days.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We take data security seriously. Your information is encrypted and never shared with third parties without your consent.",
  },
  {
    question: "Can I edit my resume after downloading?",
    answer:
      "Yes. You can save your resume and come back anytime to make changes or download updated versions.",
  },
];

export default function Faq() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-white py-16 sm:py-20 md:py-24  overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
            <FiHelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
              FAQ
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Still Doubting?{' '}
            <span className="block bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mt-2">
              Let's Clear That
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Quick answers before you build your resume and start getting interview calls
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`group bg-white rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-indigo-200 shadow-lg shadow-indigo-100/50"
                    : "border-gray-100 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggle(index)}
                  className="relative w-full flex justify-between items-center px-5 sm:px-6 py-4 sm:py-5 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed pr-4">
                    {faq.question}
                  </span>

                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100"
                    }`}
                  >
                    <FiChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Answer Panel */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                        <div className="pt-3 border-t border-gray-100">
                          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

       
      </div>
    </section>
  );
}