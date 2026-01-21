import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "What does ATS-friendly mean?",
    answer:
      "ATS-friendly refers to a resume that is designed to be easily read and understood by an Applicant Tracking System (ATS) — the software many employers use to scan and filter resumes before a human even sees them.",
  },
  {
    question: "Can I customize the resume templates?",
    answer:
      "Yes! All our resume templates are fully customizable. You can easily change text, layout, colors, and sections to create a resume that perfectly fits your style and experience.",
  },
  {
    question: "Can I create a cover letter too?",
    answer:
      "Yes! You can create a professional cover letter along with your resume. Our platform makes it easy to customize it to match your resume and highlight your strengths.",
  },
  {
    question: "What makes ARYU Better CV the best resume tool?",
    answer:
      "ARYU Better CV is fast, easy to use, and packed with professional, customizable templates. It helps you create a polished, ATS-friendly resume that gets noticed — all in just a few minutes.",
  },
  {
    question: "Is my data safe with ARYU Better CV?",
    answer:
      "Yes! Your data is completely safe with ARYU Better CV. We use secure systems to protect your personal information and never share it with third parties without your consent.",
  },
  {
    question: "Can I build my resume from my phone?",
    answer:
      "Absolutely! ARYU Better CV works perfectly on mobile, tablet, and desktop.",
  },
  {
    question: "How can I download my resume in PDF?",
    answer:
      "Once you've finished creating your resume, just click the 'Download' button and choose PDF format.",
  },
];

export default function Faq() {
  const navigate=useNavigate()
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-[#f9fafb]  p-4 sm:p-6 md:p-12 lg:p-20 overflow-hidden">
      <div className="relative  max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl sm:max-w-3xl mx-auto ">
          <span className="inline-block mb-3 sm:mb-4 md:mb-5 px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-[#c40116]/10 text-[#c40116]">
            Help Center
          </span>

          <h2 className="font-bold md:font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            Everything you need to know about ARYU Better CV and how it helps
            you get hired faster.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 space-y-3 sm:space-y-4 md:space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`group relative bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm sm:shadow-md transition-all duration-300 ${
                  isOpen ? "shadow-lg sm:shadow-xl" : "hover:shadow-md"
                }`}
              >
                {/* Button */}
                <button
                  onClick={() => toggle(index)}
                  className="relative w-full flex justify-between items-center px-4 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 lg:py-7 text-left focus:outline-none  focus:rounded-xl sm:focus:rounded-2xl"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-slate-800 leading-relaxed pr-4 sm:pr-6">
                    {faq.question}
                  </span>

                  <div
                    className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isOpen 
                        ? "bg-[#c40116] text-white" 
                        : "bg-[#c40116]/10 text-[#c40116] group-hover:bg-[#c40116]/20"
                    }`}
                  >
                    <IoIosArrowDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Panel */}
                <div
                  id={`faq-answer-${index}`}
                  className={`px-4 sm:px-5 md:px-6 lg:px-8 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen 
                      ? "max-h-96 sm:max-h-80 md:max-h-72 pb-4 sm:pb-5 md:pb-6 lg:pb-7" 
                      : "max-h-0"
                  }`}
                >
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>

                {/* Bottom border effect */}
                <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c40116]/10 to-transparent transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`} />
              </div>
            );
          })}
        </div>

        {/* Additional Help CTA */}
        <div className="mt-12 sm:mt-16 md:mt-20 w-full md:w-fit mx-auto text-center">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-left sm:text-center">
              <h3 className="font-bold text-lg sm:text-xl text-slate-800">
                Still have questions?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Contact our support team for personalized help.
              </p>
            </div>
            <button onClick={()=>navigate('/contact-us')} className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#c40116] to-[#be0117] shadow hover:scale-105 transition-all duration-200 active:scale-95 text-sm sm:text-base w-full sm:w-auto">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-[#c40116]/5 rounded-full blur-3xl sm:blur-[100px]" />
      <div className="absolute bottom-0 -right-20 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-[#be0117]/5 rounded-full blur-3xl sm:blur-[100px]" />
    </section>
  );
}