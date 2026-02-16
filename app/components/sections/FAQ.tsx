"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";

// Define TypeScript interfaces
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  faqs: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: "general",
    name: "General",
    icon: "📋",
    description: "Basic questions about ARYU SmartCV",
    faqs: [
      {
        question: "What does ATS-friendly mean?",
        answer:
          "ATS-friendly refers to a resume that is designed to be easily read and understood by an Applicant Tracking System (ATS) — the software many employers use to scan and filter resumes before a human even sees them.",
      },
      {
        question: "What makes ARYU SmartCV the best resume tool?",
        answer:
          "ARYU SmartCV is fast, easy to use, and packed with professional, customizable templates. It helps you create a polished, ATS-friendly resume that gets noticed — all in just a few minutes.",
      },
      {
        question: "Is my data safe with ARYU SmartCV?",
        answer:
          "Yes! Your data is completely safe with ARYU SmartCV. We use secure systems to protect your personal information and never share it with third parties without your consent.",
      },
    ],
  },
  {
    id: "templates",
    name: "Templates & Customization",
    icon: "🎨",
    description: "Questions about templates and customization options",
    faqs: [
      {
        question: "Can I customize the resume templates?",
        answer:
          "Yes! All our resume templates are fully customizable. You can easily change text, layout, colors, and sections to create a resume that perfectly fits your style and experience.",
      },
      {
        question: "How many templates are available?",
        answer:
          "We offer 8+ professionally designed templates that cater to different industries and career levels. All templates are ATS-optimized and mobile-responsive.",
      },
      {
        question: "Can I create a cover letter too?",
        answer:
          "Yes! You can create a professional cover letter along with your resume. Our platform makes it easy to customize it to match your resume and highlight your strengths.",
      },
    ],
  },
  {
    id: "features",
    name: "Features & Functionality",
    icon: "⚡",
    description: "Questions about features and how to use them",
    faqs: [
      {
        question: "Can I build my resume from my phone?",
        answer:
          "Absolutely! ARYU SmartCV works perfectly on mobile, tablet, and desktop. Our mobile-optimized interface makes it easy to create and edit your resume on the go.",
      },
      {
        question: "How can I download my resume in PDF?",
        answer:
          "Once you've finished creating your resume, just click the 'Download' button and choose PDF format. You can download high-quality PDFs ready for printing or emailing.",
      },
      {
        question: "Is there an AI writing assistant?",
        answer:
          "Yes! Our AI writing assistant helps you create compelling bullet points, suggests improvements, and ensures your resume uses industry-standard terminology.",
      },
    ],
  },
  {
    id: "pricing",
    name: "Pricing & Plans",
    icon: "💰",
    description: "Questions about pricing, plans, and subscriptions",
    faqs: [
      {
        question: "Is there a free plan?",
        answer:
          "Yes! We offer a free plan that includes one resume template and basic features. You can upgrade to premium plans for more templates and advanced features.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, debit cards, and PayPal. All payments are processed securely through Stripe.",
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer:
          "Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your billing period.",
      },
    ],
  },
];

export default function Faq() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("general");
  const [searchTerm, setSearchTerm] = useState("");

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Get current category
  const currentCategory = faqCategories.find(
    (cat) => cat.id === activeCategory,
  );

  // Filter FAQs based on search term
  const getFilteredFaqs = () => {
    if (!searchTerm.trim()) {
      return currentCategory?.faqs || [];
    }

    const searchLower = searchTerm.toLowerCase();
    return (
      currentCategory?.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchLower) ||
          faq.answer.toLowerCase().includes(searchLower),
      ) || []
    );
  };

  const filteredFaqs = getFilteredFaqs();

  return (
    <section className="relative bg-[#f9fafb] p-4 sm:p-6 md:p-12 lg:p-20 overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl sm:max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block mb-3 sm:mb-4 md:mb-5 px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-[#c40116]/10 text-[#c40116]">
            Help Center
          </span>

          <h2 className="font-bold md:font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            Everything you need to know about ARYU SmartCV and how it helps you
            get hired faster.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setOpenIndex(null); // Reset open FAQ when changing category
                  if (searchTerm) setSearchTerm(""); // Clear search when changing category
                }}
                className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-white border-[#c40116] shadow-lg shadow-[#c40116]/10"
                    : "bg-white/50 border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <span className="text-xl sm:text-2xl mb-1.5 sm:mb-2">
                  {category.icon}
                </span>
                <span
                  className={`font-semibold text-sm sm:text-base ${
                    activeCategory === category.id
                      ? "text-[#c40116]"
                      : "text-gray-700"
                  }`}
                >
                  {category.name}
                </span>
                <span className="text-xs text-gray-500 mt-1 hidden sm:block">
                  {category.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Category Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#c40116]/10 flex items-center justify-center">
              <span className="text-lg sm:text-xl">
                {currentCategory?.icon}
              </span>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
                {currentCategory?.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {currentCategory?.description}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
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
                    className="relative w-full flex justify-between items-center px-4 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 lg:py-7 text-left focus:outline-none focus:rounded-xl sm:focus:rounded-2xl"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${activeCategory}-${index}`}
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
                    id={`faq-answer-${activeCategory}-${index}`}
                    className={`px-4 sm:px-5 md:px-6 lg:px-8 overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "max-h-96 sm:max-h-80 md:max-h-72 pb-4 sm:pb-5 md:pb-6 lg:pb-7"
                        : "max-h-0"
                    }`}
                    role="region"
                    aria-labelledby={`faq-question-${activeCategory}-${index}`}
                  >
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>

                  {/* Bottom border effect */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c40116]/10 to-transparent transition-opacity duration-300 ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              );
            })
          ) : (
            // No results message
            <div className="text-center py-12 sm:py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No results found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find any FAQs matching "{searchTerm}". Try searching
                with different keywords or browse the categories above.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setOpenIndex(null);
                }}
                className="mt-6 px-6 py-2.5 rounded-xl font-semibold text-[#c40116] bg-[#c40116]/10 hover:bg-[#c40116]/20 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Additional Help CTA */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 bg-gradient-to-r from-[#c40116]/5 to-[#be0117]/5 rounded-2xl sm:rounded-3xl border border-[#c40116]/10">
            <div className="text-left">
              <h3 className="font-bold text-lg sm:text-xl text-slate-800">
                Still have questions?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mt-1 max-w-md">
                Can't find what you're looking for? Our support team is here to
                help you 24/7.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/contact-us")}
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-white bg-linear-to-r from-[#c40116] to-[#c40116]/60 shadow hover:scale-105 transition-all duration-200 active:scale-95 text-sm sm:text-base cursor-pointer"
              >
                Contact Support
              </button>
            
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-[#c40116]/5 rounded-full blur-3xl sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-[#be0117]/5 rounded-full blur-3xl sm:blur-[100px] pointer-events-none" />
    </section>
  );
}
