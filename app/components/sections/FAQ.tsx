

// "use client";

// import { useState } from "react";
// import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";

// // Define TypeScript interfaces
// interface FAQItem {
//   question: string;
//   answer: string;
// }

// const faqs: FAQItem[] = [
//   {
//     question: "Can I create a resume without any experience?",
//     answer:
//       "Yes. This tool is built for freshers. The AI automatically creates projects, skills, and experience-style content so your resume doesn't look empty",
//   },
//   {
//     question: "Will my resume pass ATS (Applicant Tracking Systems)?",
//     answer:
//       "Yes. Every resume is optimized with the right format and keywords to pass ATS and get shortlisted by recruiters",
//   },
//   {
//     question: "How long does it take to build a resume?",
//     answer:
//       "Less than 2 minutes. You enter basic details and the AI generates a complete, job-ready resume instantly",
//   },
//   {
//     question: "Will this help me get interview calls?",
//     answer:
//       "Yes. The resume is designed to improve your chances of getting shortlisted, and many users start receiving interview calls within 7 to 14 days",
//   },
//   {
//     question: "Is my data secure?",
//     answer:
//       "Yes. We take data security seriously. Your information is encrypted and never shared with third parties without your consent",
//   },
//   {
//     question: "Can I edit my resume after downloading?",
//     answer:
//       "Yes. You can save your resume and come back anytime to make changes or download updated versions",
//   },


//    {
//     question: "What makes PassATS different from other resume builders?",
//     answer:
//       "PassATS is built specifically for the Indian job market. We offer INR pricing (₹49/month vs ₹2,400+ for global tools), templates designed for Indian roles and campus placements, and AI that understands local hiring. Backed by Aryu Academy",
//   },
//    {
//     question: "Is my data safe with PassATS?",
//     answer:
//       "Yes. Your resume data is stored securely and never shared with third parties, employers, or advertising platforms",
//   },
// ];

// export default function Faq() {
//   const router = useRouter();
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const toggle = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section className="relative bg-white py-16 sm:py-20 md:py-24  overflow-hidden">
//       <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="text-center max-w-3xl mx-auto mb-12"
//         >
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
//             <FiHelpCircle className="w-3.5 h-3.5 text-indigo-600" />
//             <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">
//               FAQ
//             </span>
//           </div>

//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//             Still Doubting?{" "}
//             <span className="block bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mt-2">
//               Let's Clear That
//             </span>
//           </h2>

//           <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
//             Quick answers before you build your resume and start getting
//             interview calls
//           </p>
//         </motion.div>

//         {/* FAQ Accordion */}
//         <div className="space-y-4">
//           {faqs.map((faq, index) => {
//             const isOpen = openIndex === index;

//             return (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.3, delay: index * 0.05 }}
//                 className={`group bg-white rounded-xl border transition-all duration-300 ${
//                   isOpen
//                     ? "border-indigo-200 shadow-lg shadow-indigo-100/50"
//                     : "border-gray-100 shadow-sm hover:shadow-md"
//                 }`}
//               >
//                 {/* Question Button */}
//                 <button
//                   onClick={() => toggle(index)}
//                   className="relative w-full flex justify-between items-center px-5 sm:px-6 py-4 sm:py-5 text-left focus:outline-none cursor-pointer"
//                   aria-expanded={isOpen}
//                 >
//                   <span className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed pr-4">
//                     {faq.question}
//                   </span>

//                   <div
//                     className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
//                       isOpen
//                         ? "bg-indigo-600 text-white shadow-md"
//                         : "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100"
//                     }`}
//                   >
//                     <FiChevronDown
//                       className={`w-4 h-4 transition-transform duration-300 ${
//                         isOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </div>
//                 </button>

//                 {/* Answer Panel */}
//                 <AnimatePresence>
//                   {isOpen && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="overflow-hidden"
//                     >
//                       <div className="px-5 sm:px-6 pb-5 sm:pb-6">
//                         <div className="pt-3 border-t border-gray-100">
//                           <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
//                             {faq.answer}
//                           </p>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
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
      "Yes. This tool is built for freshers. The AI automatically creates projects, skills, and experience-style content so your resume doesn't look empty",
  },
  {
    question: "Will my resume pass ATS (Applicant Tracking Systems)?",
    answer:
      "Yes. Every resume is optimized with the right format and keywords to pass ATS and get shortlisted by recruiters",
  },
  {
    question: "How long does it take to build a resume?",
    answer:
      "Less than 2 minutes. You enter basic details and the AI generates a complete, job-ready resume instantly",
  },
  {
    question: "Will this help me get interview calls?",
    answer:
      "Yes. The resume is designed to improve your chances of getting shortlisted, and many users start receiving interview calls within 7 to 14 days",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We take data security seriously. Your information is encrypted and never shared with third parties without your consent",
  },
  {
    question: "Can I edit my resume after downloading?",
    answer:
      "Yes. You can save your resume and come back anytime to make changes or download updated versions",
  },
  {
    question: "What makes PassATS different from other resume builders?",
    answer:
      "PassATS is built specifically for the Indian job market. We offer INR pricing (₹49/month vs ₹2,400+ for global tools), templates designed for Indian roles and campus placements, and AI that understands local hiring. Backed by Aryu Academy",
  },
  {
    question: "Is my data safe with PassATS?",
    answer:
      "Yes. Your resume data is stored securely and never shared with third parties, employers, or advertising platforms",
  },
];

export default function Faq() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -right-24 w-64 sm:w-80 h-64 sm:h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-64 sm:w-80 h-64 sm:h-80 bg-purple-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-3 sm:mb-4">
            <FiHelpCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3.5 text-indigo-600" />
            <span className="text-[10px] sm:text-xs font-medium text-indigo-700 uppercase tracking-wide">
              FAQ
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight px-2">
            Still Doubting?{" "}
            <span className="block bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mt-1 sm:mt-2">
              Let's Clear That
            </span>
          </h2>

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 max-w-2xl mx-auto px-3">
            Quick answers before you build your resume and start getting interview calls
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
                className={`group bg-white rounded-lg sm:rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-indigo-200 shadow-lg shadow-indigo-100/50"
                    : "border-gray-100 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggle(index)}
                  className="relative w-full flex justify-between items-center gap-2 px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed pr-2 sm:pr-4 flex-1">
                    {faq.question}
                  </span>

                  <div
                    className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100"
                    }`}
                  >
                    <FiChevronDown
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${
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
                      <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                        <div className="pt-2 sm:pt-3 border-t border-gray-100">
                          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mt-10 md:mt-12 text-center"
        >
          <p className="text-gray-600 text-xs sm:text-sm mb-3">
            Still have questions? We're here to help
          </p>
          <button
            onClick={() => router.push("/contact")}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg cursor-pointer"
          >
            Contact Support
            <FiChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-[-90deg]" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}