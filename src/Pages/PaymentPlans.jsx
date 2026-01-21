import React, { useState } from "react";
import { FaRegFileAlt, FaUserTie, FaCheckCircle, FaHeadset, FaUndo } from "react-icons/fa";
import { MdOutlineAutoGraph, MdAccessTime, MdSearch } from "react-icons/md";
import { AiOutlineThunderbolt } from "react-icons/ai";
import Header from "./Header";
import { FaCheck } from "react-icons/fa";


const PaymentPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState("7-day");


  const steps = [
        { id: 1, name: 'Create resume' },
        { id: 2, name: 'Choose Plan' },
        { id: 3, name: 'Payment details' },
        { id: 4, name: 'Download resume' },

    ];
const currentStep = 2;
  return (
    <div className="min-h-screen bg-[#f9fbff] text-gray-800">
        <Header/>
      {/* Header Progress */}
       <div className="flex justify-center p-4 px-10 items-center">
      <div className="hidden md:flex justify-between mt-3">
        <div className="flex justify-center items-center">
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  {/* Step Circle */}
                  <div
                    className={`
                      w-7 h-7 rounded-full flex items-center justify-center text-[14px] font-bold transition-colors duration-300
                      ${
                        isCompleted || isCurrent
                          ? "bg-[#05a2ff] text-white shadow-lg"
                          : "bg-[#dde8ee] text-[#a8bdca]"
                      }
                    `}
                  >
                    {isCompleted ? <FaCheck size={12} /> : step.id}
                  </div>

                  {/* Step Label */}
                  <div
                    className={`ml-3 text-[16px] font-nunito font-normal transition-colors duration-300
                      ${
                        isCompleted || isCurrent
                          ? "text-[#0a337d]"
                          : "text-[#babec1]"
                      }
                    `}
                  >
                    {step.name}
                  </div>
                </div>

                {/* Separator Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-1 ${
                      isCompleted ? "bg-gray-300" : "bg-gray-300"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>

      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Download your job-winning resume!
        </h1>
      </div>

      <div className="max-w-6xl mx-auto   flex flex-col md:flex-row gap-6 p-8">
        {/* Left side - Plans */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 7-Day Plan */}
            <div
              className={`border rounded-lg p-5 cursor-pointer transition-all ${
                selectedPlan === "7-day"
                  ? "border-[#0072ff] bg-[#f0f7ff]"
                  : "border-gray-300 bg-white"
              }`}
              onClick={() => setSelectedPlan("7-day")}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">7-Day Access</h3>
                {selectedPlan === "7-day" && (
                  <span className="text-xs bg-[#e2ebff] text-[#0072ff] px-2 py-1 rounded-md">
                    Most popular
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold mt-2">₹195</p>
              <p className="text-gray-500 text-sm mt-1">Access for 7 days</p>
            </div>

            {/* Annual Plan */}
            <div
              className={`border rounded-lg p-5 cursor-pointer transition-all ${
                selectedPlan === "annual"
                  ? "border-[#0072ff] bg-[#f0f7ff]"
                  : "border-gray-300 bg-white"
              }`}
              onClick={() => setSelectedPlan("annual")}
            >
              <h3 className="text-lg font-semibold">Annual Access</h3>
              <p className="text-3xl font-bold mt-2">₹1,195</p>
              <p className="text-gray-500 text-sm mt-1">per month</p>
            </div>
          </div>

          {/* Features on left */}
          <div className="mt-6 space-y-3 text-[15px]  bg-white shadow-md rounded-2xl p-3">
            <div className="flex items-center gap-2">
              <FaRegFileAlt className="text-[#0072ff]" /> Unlimited Resumes and Cover Letters
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-[#0072ff]" /> ATS Resume Checker
            </div>
            <div className="flex items-center gap-2">
              <FaUserTie className="text-[#0072ff]" /> AI-Powered Job Interview Preparation
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineAutoGraph className="text-[#0072ff]" /> Salary Analyzer
            </div>
            <div className="flex items-center gap-2">
              <MdSearch className="text-[#0072ff]" /> Job Search Plan & Tracker
            </div>
            <div className="flex items-center gap-2">
              <FaUndo className="text-[#0072ff]" /> Money-Back Guarantee
            </div>
          </div>

          {/* Trustpilot */}
          <div className="mt-6 border-t pt-4 text-sm text-gray-600 flex items-center gap-2">
            <span className="font-medium text-green-600">Excellent</span>
            <span>★★★★☆</span>
            <span>3,112 reviews on Trustpilot</span>
          </div>
        </div>

        {/* Right side - All features */}
        <div className="flex-1 bg-white shadow-md rounded-2xl p-3">
          <h2 className="text-[22px] font-roboto text-[#2e404a] font-bold mb-4 text-center">All Features:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[15px]">
            <div className="p-4 bg-[#f7faff] rounded-lg">
              <FaRegFileAlt className="text-[#0072ff] mb-1" />
              Unlimited edits & downloads in multiple formats
            </div>
            <div className="p-4 bg-[#f7faff] rounded-lg">
              <AiOutlineThunderbolt className="text-[#0072ff] mb-1" />
              30+ Templates & 1200+ Designs optimized for ATS
            </div>
            <div className="p-4 bg-[#f7faff] rounded-lg">
              <FaCheckCircle className="text-[#0072ff] mb-1" />
              Create & customize resumes and cover letters
            </div>
            <div className="p-4 bg-[#f7faff] rounded-lg">
              <FaUserTie className="text-[#0072ff] mb-1" />
              Turn your resume into a professional profile
            </div>
            <div className="p-4 bg-[#f7faff] rounded-lg">
              <MdOutlineAutoGraph className="text-[#0072ff] mb-1" />
              Check your resume for 30+ issues & feedback
            </div>
            <div className="p-4 bg-[#f7faff] rounded-lg">
              <FaRegFileAlt className="text-[#0072ff] mb-1" />
              Sort through expertly written keyword samples
            </div>
            <div className="p-4 bg-[#f7faff] rounded-lg">
              <FaUndo className="text-[#0072ff] mb-1" />
              Money-Back Guarantee during first 7 days
            </div>
            <div className="p-4 bg-[#f7faff] rounded-lg">
              <FaHeadset className="text-[#0072ff] mb-1" />
              24/7 Customer Support
            </div>
          </div>

          <button className="mt-6 w-full bg-[#0072ff] hover:bg-[#005de6] text-white font-medium py-3 rounded-lg transition-all">
            Continue
          </button>

          <p className="text-xs text-gray-500 mt-3">
            Cancel anytime online, by email, or call us. After 7 days, price is ₹445 billed every 4 weeks.  
            Within 7 days of first payment, you can claim money-back guarantee.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlans;
