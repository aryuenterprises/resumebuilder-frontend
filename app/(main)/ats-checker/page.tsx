"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FiUpload,
  FiFileText,
  FiAward,
  FiCheckCircle,
  FiAlertCircle,
  FiZap,
  FiEye,
  FiArrowRight,
  FiClock,
  FiPercent,
  FiBriefcase,
  FiInfo,
  FiUsers,
  FiSearch,
  FiTrendingUp,
  FiLayers,
  FiRefreshCw,
} from "react-icons/fi";

import { FaBrain, FaRocket, FaBuilding, FaGraduationCap } from "react-icons/fa";

import { HiOutlineSparkles, HiOutlineChevronDown } from "react-icons/hi";

// ============================
//      Interfaces
// ============================
interface Issue {
  message: string;
  severity: "critical" | "high" | "medium" | "low";
  suggestion?: string;
  section: string;
  impact?: number;
}

interface SectionAnalysis {
  section: string;
  score: number;
  status: string;
  issues?: Issue[];
  suggestions?: string[];
}

interface ATSResults {
  ats_score: number;
  summary?: {
    estimated_ats_compatibility: string;
  };
  score_breakdown?: {
    content_quality: number;
    format_compliance: number;
    keyword_alignment: number;
    structure_quality: number;
  };
  section_analysis?: SectionAnalysis[];
  issues?: Record<string, Issue[]>;
}

// ============================
//      Loading Screen Component
// ============================
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { text: "Scanning resume structure...", icon: FiFileText },
    { text: "Analyzing keywords...", icon: FiSearch },
    { text: "Checking ATS compatibility...", icon: FiTrendingUp },
    { text: "Evaluating formatting...", icon: FiLayers },
    { text: "Generating insights...", icon: FaBrain },
    { text: "Preparing results...", icon: HiOutlineSparkles },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 1000);

    return () => clearInterval(stepInterval);
  }, []);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 backdrop-blur-xl z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-linear-to-br from-[#c40116]/5 via-transparent to-[#be0117]/5" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c40116]/10 rounded-full blur-3xl -translate-y-32 translate-x-32 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#be0117]/10 rounded-full blur-3xl translate-y-32 -translate-x-32 animate-pulse delay-1000" />

        <div className="relative z-10">
          {/* Icon Animation */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360, 360],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-[#c40116] to-[#be0117] rounded-2xl flex items-center justify-center shadow-xl"
          >
            <CurrentIcon className="w-12 h-12 text-white" />
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Analyzing Your Resume
          </h3>

          {/* Current Step */}
          <p className="text-center text-gray-600 mb-8">
            {steps[currentStep].text}
          </p>

          {/* Progress Bar */}
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute inset-0 bg-linear-to-r from-[#c40116] to-[#be0117] rounded-full"
            />
          </div>

          {/* Progress Percentage */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Processing...</span>
            <span className="font-semibold text-[#c40116]">{progress}%</span>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[#c40116]"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================
//      Section Analysis Component
// ============================
const SectionAnalysisDisplay = ({
  sectionAnalysis,
}: {
  sectionAnalysis: SectionAnalysis[];
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "excellent":
        return "text-green-600 bg-green-50 border-green-200";
      case "good":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "average":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "poor":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case "experience":
        return <FiBriefcase className="w-5 h-5" />;
      case "education":
        return <FaGraduationCap className="w-5 h-5" />;
      case "skills":
        return <FiZap className="w-5 h-5" />;
      case "summary":
        return <FiFileText className="w-5 h-5" />;
      case "projects":
        return <FaRocket className="w-5 h-5" />;
      default:
        return <FiFileText className="w-5 h-5" />;
    }
  };

  if (!sectionAnalysis || sectionAnalysis.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FiFileText className="w-5 h-5 text-[#c40116]" />
          Section-wise Analysis
        </h4>
        <span className="text-sm text-gray-500">
          {sectionAnalysis.length} sections analyzed
        </span>
      </div>

      <div className="space-y-4">
        {sectionAnalysis.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <div
              className={`bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#c40116]/20 ${
                expandedSection === section.section
                  ? "shadow-lg border-[#c40116]/30"
                  : ""
              }`}
            >
              {/* Section Header */}
              <div
                className="p-5 flex items-center justify-between cursor-pointer"
                onClick={() =>
                  setExpandedSection(
                    expandedSection === section.section
                      ? null
                      : section.section,
                  )
                }
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Icon with linear background */}
                  <div
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      expandedSection === section.section
                        ? "bg-linear-to-br from-[#c40116] to-[#be0117] text-white"
                        : "bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 text-[#c40116] group-hover:scale-110"
                    }`}
                  >
                    {getSectionIcon(section.section)}
                  </div>

                  {/* Section Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className="font-semibold text-gray-900 capitalize">
                        {section.section.replace("_", " ")}
                      </h5>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(section.status)}`}
                      >
                        {section.status}
                      </span>
                    </div>

                    {/* Progress Bar with percentage */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${section.score}%` }}
                          transition={{
                            delay: idx * 0.1,
                            duration: 0.8,
                            ease: "easeOut",
                          }}
                          className={`h-full rounded-full ${
                            section.score >= 80
                              ? "bg-linear-to-r from-green-500 to-emerald-500"
                              : section.score >= 60
                                ? "bg-linear-to-r from-yellow-500 to-orange-500"
                                : "bg-linear-to-r from-red-500 to-rose-500"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-sm font-semibold min-w-[45px] ${
                          section.score >= 80
                            ? "text-green-600"
                            : section.score >= 60
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {section.score}%
                      </span>
                    </div>
                  </div>

                  {/* Expand/Collapse Icon */}
                  <motion.div
                    animate={{
                      rotate: expandedSection === section.section ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`p-2 rounded-full transition-colors ${
                      expandedSection === section.section
                        ? "bg-[#c40116]/10 text-[#c40116]"
                        : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                    }`}
                  >
                    <HiOutlineChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedSection === section.section && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border-t border-gray-100 bg-gray-50/50 p-5 space-y-5">
                      {/* Issues */}
                      {section.issues && section.issues.length > 0 && (
                        <div>
                          <h6 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            Issues to Address ({section.issues.length})
                          </h6>
                          <div className="space-y-3">
                            {section.issues.map((issue, issueIdx) => (
                              <motion.div
                                key={issueIdx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: issueIdx * 0.1 }}
                                className={`p-4 rounded-xl border ${getSeverityColor(issue.severity)} bg-white`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="mt-0.5">
                                    {issue.severity === "high" && (
                                      <FiAlertCircle className="w-4 h-4 text-red-500" />
                                    )}
                                    {issue.severity === "medium" && (
                                      <FiAlertCircle className="w-4 h-4 text-yellow-500" />
                                    )}
                                    {issue.severity === "low" && (
                                      <FiInfo className="w-4 h-4 text-blue-500" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm text-gray-800 mb-2">
                                      {issue.message}
                                    </p>
                                    {issue.suggestion && (
                                      <div className="flex items-start gap-2 mt-2 p-3 bg-white rounded-lg border border-gray-100">
                                        <HiOutlineSparkles className="w-3 h-3 text-[#c40116] mt-0.5 shrink-0" />
                                        <p className="text-xs text-gray-600">
                                          <span className="font-medium">
                                            Pro tip:
                                          </span>{" "}
                                          {issue.suggestion}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Suggestions */}
                      {section.suggestions &&
                        section.suggestions.length > 0 && (
                          <div>
                            <h6 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#c40116]" />
                              Improvement Suggestions
                            </h6>
                            <div className="space-y-2">
                              {section.suggestions.map(
                                (suggestion, suggestionIdx) => (
                                  <motion.div
                                    key={suggestionIdx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: suggestionIdx * 0.1 }}
                                    className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-[#c40116]/20 transition-colors"
                                  >
                                    <FiCheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <span className="text-sm text-gray-700">
                                      {suggestion}
                                    </span>
                                  </motion.div>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                      {/* No Issues Found */}
                      {(!section.issues || section.issues.length === 0) &&
                        (!section.suggestions ||
                          section.suggestions.length === 0) && (
                          <div className="text-center py-6">
                            <div className="inline-flex items-center gap-2 px-5 py-3 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                              <FiCheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium text-green-700">
                                This section looks great! No issues found.
                              </span>
                            </div>
                          </div>
                        )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ============================
//      Issues Display Component
// ============================
const IssuesDisplay = ({ issues }: { issues: Record<string, Issue[]> }) => {
  const [expandedSeverity, setExpandedSeverity] = useState<string | null>(null);

  const severityConfig = {
    critical: {
      icon: FiAlertCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      linear: "from-red-500 to-rose-500",
      lightBg: "bg-red-50/50",
      label: "Critical Issues",
      description: "Must fix to pass ATS filters",
    },
    high: {
      icon: FiAlertCircle,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
      linear: "from-orange-500 to-red-500",
      lightBg: "bg-orange-50/50",
      label: "High Priority",
      description: "Significant impact on your score",
    },
    medium: {
      icon: FiAlertCircle,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      linear: "from-yellow-500 to-orange-500",
      lightBg: "bg-yellow-50/50",
      label: "Medium Priority",
      description: "Moderate impact on ATS compatibility",
    },
    low: {
      icon: FiInfo,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      linear: "from-blue-500 to-cyan-500",
      lightBg: "bg-blue-50/50",
      label: "Low Priority",
      description: "Minor improvements suggested",
    },
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case "experience":
        return <FiBriefcase className="w-4 h-4" />;
      case "education":
        return <FaGraduationCap className="w-4 h-4" />;
      case "skills":
        return <FiZap className="w-4 h-4" />;
      case "summary":
        return <FiFileText className="w-4 h-4" />;
      default:
        return <FiAlertCircle className="w-4 h-4" />;
    }
  };

  const nonEmptySeverities = Object.entries(issues).filter(
    ([_, issueList]) => issueList && issueList.length > 0,
  ) as [string, Issue[]][];

  if (nonEmptySeverities.length === 0) return null;

  const totalIssues = nonEmptySeverities.reduce(
    (acc, [_, issueList]) => acc + issueList.length,
    0,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="p-6 bg-linear-to-r from-gray-50 to-white border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl">
                <FiAlertCircle className="w-5 h-5 text-[#c40116]" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  Issues Found ({totalIssues})
                </h4>
                <p className="text-sm text-gray-500">
                  Address these to improve your ATS score
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {nonEmptySeverities.map(([severity, issueList]) => (
                <span
                  key={severity}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                    severity === "critical"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : severity === "high"
                        ? "bg-orange-50 text-orange-700 border-orange-200"
                        : severity === "medium"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                  }`}
                >
                  {severity}: {issueList.length}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Issues by Severity */}
        <div className="divide-y divide-gray-100">
          {nonEmptySeverities.map(([severity, issueList]) => {
            const config =
              severityConfig[severity as keyof typeof severityConfig];
            const Icon = config.icon;
            const isExpanded = expandedSeverity === severity;

            return (
              <div key={severity} className="overflow-hidden">
                {/* Severity Header */}
                <div
                  onClick={() =>
                    setExpandedSeverity(isExpanded ? null : severity)
                  }
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${config.bg}`}>
                      <Icon className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">
                        {config.label}
                      </h5>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {config.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-600">
                      {issueList.length} issue{issueList.length > 1 ? "s" : ""}
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`p-1.5 rounded-full ${isExpanded ? config.bg : "bg-gray-100"}`}
                    >
                      <HiOutlineChevronDown
                        className={`w-4 h-4 ${isExpanded ? config.color : "text-gray-500"}`}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Issues List */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 space-y-4">
                        {issueList.map((issue, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`p-5 rounded-xl border ${config.border} ${config.lightBg} bg-white/50 backdrop-blur-sm`}
                          >
                            <div className="flex items-start gap-4">
                              {/* Section Icon */}
                              <div
                                className={`p-2.5 rounded-lg ${config.bg} shrink-0`}
                              >
                                {getSectionIcon(issue.section)}
                              </div>

                              <div className="flex-1">
                                {/* Section and Impact */}
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">
                                    {issue.section}
                                  </span>
                                  {issue.impact && (
                                    <span
                                      className={`text-xs px-2.5 py-1 rounded-full ${
                                        issue.impact >= 9
                                          ? "bg-red-100 text-red-700"
                                          : issue.impact >= 7
                                            ? "bg-orange-100 text-orange-700"
                                            : issue.impact >= 5
                                              ? "bg-yellow-100 text-yellow-700"
                                              : "bg-blue-100 text-blue-700"
                                      }`}
                                    >
                                      Impact: {issue.impact}/10
                                    </span>
                                  )}
                                </div>

                                {/* Message */}
                                <p className="text-sm text-gray-800 mb-3">
                                  {issue.message}
                                </p>

                                {/* Suggestion */}
                                {issue.suggestion && (
                                  <div className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                    <HiOutlineSparkles className="w-4 h-4 text-[#c40116] mt-0.5 shrink-0" />
                                    <p className="text-sm text-gray-600">
                                      <span className="font-semibold">
                                        Suggestion:
                                      </span>{" "}
                                      {issue.suggestion}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// ============================
//      Main Component
// ============================
const ATSCheckerPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    keywords: Array<{
      word: string;
      count: number;
      importance: "high" | "medium" | "low";
    }>;
    missingKeywords: string[];
  } | null>(null);

  const [atsResults, setAtsResults] = useState<ATSResults | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "keywords">(
    "overview",
  );

  console.log("results",results)

  // ============================
  //        Handle file upload - automatically trigger api when file uploaded
  // ============================
  useEffect(() => {
    if (file && !uploading && !loading) {
      analyzeResume();
    }
  }, [file]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setResults(null);
    setAtsResults(null);
    setActiveTab("overview");
  };

  // ============================
  //        after file uploaded, call api to analyze resume and get results
  // ============================
  const analyzeResume = async () => {
    if (!file) return;

    setUploading(true);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/ats/scan`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("response", response);
      setAtsResults(response?.data?.data);

      // Mock keywords data
      setTimeout(() => {
        setResults({
          keywords: [
            { word: "JavaScript", count: 8, importance: "high" },
            { word: "React", count: 6, importance: "high" },
            { word: "Node.js", count: 4, importance: "medium" },
            { word: "TypeScript", count: 3, importance: "high" },
            { word: "Next.js", count: 2, importance: "medium" },
            { word: "Team Leadership", count: 3, importance: "high" },
            { word: "Agile", count: 5, importance: "medium" },
            { word: "CI/CD", count: 2, importance: "low" },
            { word: "REST APIs", count: 4, importance: "medium" },
            { word: "MongoDB", count: 2, importance: "low" },
          ],
          missingKeywords: ["Python", "AWS", "Docker", "Kubernetes", "GraphQL"],
        });
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);

      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  // ============================
  //      Animation variants
  // ============================
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

 

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-linear-to-br from-[#c40116]/5 via-transparent to-[#be0117]/5" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#c40116]/10 rounded-full blur-3xl animate-pulse" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#c40116]/10 to-[#be0117]/10 rounded-full mb-6 border border-[#c40116]/20 backdrop-blur-sm"
            >
              <FaBrain className="w-4 h-4 text-[#c40116]" />
              <span className="text-sm font-medium bg-linear-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
                AI-Powered ATS Checker
              </span>
              <HiOutlineSparkles className="w-3 h-3 text-[#c40116]" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl  font-bold mb-6"
            >
              <span className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Optimize Your Resume
              </span>
              <br />
              <span className="bg-linear-to-b from-black to-red-500 bg-clip-text text-transparent">
                From Applied to Interviewed
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
            >
              95% of applicants are filtered out before a recruiter even looks.
              Use our{" "}
              <span className="font-semibold text-[#c40116]">
                advanced ATS checker
              </span>{" "}
              to optimize your resume for the algorithms that matter.
            </motion.p>

          
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.6 }}
            className=" mx-auto"
          >
            
            {/* Main Upload Card */}
            {!results && !loading ? (
              <div className="bg-white max-w-3xl mx-auto rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-7">
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-2xl p-10 transition-all duration-300 ${
                      dragActive
                        ? "border-[#c40116] bg-[#c40116]/5 scale-[1.02]"
                        : "border-gray-200 hover:border-[#c40116]/30 hover:bg-gray-50/50"
                    }`}
                  >
                    <input
                      type="file"
                      id="resume-upload"
                      className="hidden"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />

                    <div className="text-center">
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="inline-flex p-6 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-2xl mb-6"
                      >
                        <FiUpload className="w-9 h-9 text-[#c40116]" />
                      </motion.div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Upload Your Resume
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Drag & drop or{" "}
                        <label
                          htmlFor="resume-upload"
                          className="text-[#c40116] font-semibold cursor-pointer hover:underline"
                        >
                          browse
                        </label>
                      </p>

                      <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="flex -space-x-3">
                          <img
                            src="/icons/ats-circleimage1.svg"
                            alt=""
                            className="w-10 h-10 rounded-full border-2 border-white"
                          />
                          <img
                            src="/icons/ats-circleimage2.svg"
                            alt=""
                            className="w-10 h-10 rounded-full border-2 border-white"
                          />
                          <img
                            src="/icons/ats-circleimage3.svg"
                            alt=""
                            className="w-10 h-10 rounded-full border-2 border-white"
                          />
                        </div>
                        <span className="text-sm text-gray-500">
                          <span className="font-semibold text-[#c40116]">
                            10,000+
                          </span>{" "}
                          resumes analyzed
                        </span>
                      </div>

                      <div className="space-y-4">
                        <label
                          htmlFor="resume-upload"
                          className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
                        >
                          <FiUpload className="w-5 h-5" />
                          Choose File
                        </label>

                        <p className="text-xs text-gray-500">
                          Supports PDF only
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Results Section */
              <div className="bg-white max-w-4xl mx-auto rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Results Header */}
                <div className="border-b border-gray-100 bg-linear-to-r from-gray-50 to-white px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl">
                        <FiFileText className="w-5 h-5 text-[#c40116]" />
                      </div>
                      <span className="font-semibold text-gray-900">
                        ATS Analysis Results
                      </span>
                    </div>

                    <button
                      onClick={removeFile}
                      className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 cursor-pointer transition-all duration-500 hover:scale-105"
                    >
                      <FiRefreshCw className="w-4 h-4" />
                      Analyze New Resume
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-2 mt-4">
                    {[
                      { id: "overview", label: "Overview", icon: FiEye },
                      { id: "keywords", label: "Keywords", icon: FiZap },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all capitalize flex items-center gap-2 ${
                            activeTab === tab.id
                              ? "bg-linear-to-r from-[#c40116] to-[#be0117] text-white shadow-md shadow-[#c40116]/20"
                              : "text-gray-600 hover:bg-gray-100 cursor-pointer"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Results Content */}
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeTab === "overview" && (
                        <div className="space-y-8">
                          {/* Score Overview */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Score Card */}
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="lg:col-span-1 bg-linear-to-br from-[#c40116] to-[#be0117] rounded-2xl p-6 text-white relative overflow-hidden"
                            >
                              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />

                              <div className="relative z-10">
                                <div className="text-5xl font-bold mb-2">
                                  {atsResults?.ats_score || 78}
                                </div>
                                <div className="text-white/80 text-sm mb-4">
                                  Overall ATS Score
                                </div>

                                <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${atsResults?.ats_score || 78}%`,
                                    }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                    className="bg-white h-2 rounded-full"
                                  />
                                </div>

                                <p className="text-white/90 text-sm">
                                  {atsResults?.summary
                                    ?.estimated_ats_compatibility ||
                                    "Good chance of passing ATS with minor improvements"}
                                </p>
                              </div>
                            </motion.div>

                            {/* Metric Cards */}
                            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                              {[
                                {
                                  icon: FiFileText,
                                  label: "Content Quality",
                                  value:
                                    atsResults?.score_breakdown
                                      ?.content_quality || 85,
                                },
                                {
                                  icon: FiClock,
                                  label: "Format Compliance",
                                  value:
                                    atsResults?.score_breakdown
                                      ?.format_compliance || 92,
                                },
                                {
                                  icon: FiPercent,
                                  label: "Keyword Alignment",
                                  value:
                                    atsResults?.score_breakdown
                                      ?.keyword_alignment || 68,
                                },
                                {
                                  icon: FiAward,
                                  label: "Structure Quality",
                                  value:
                                    atsResults?.score_breakdown
                                      ?.structure_quality || 88,
                                },
                              ].map((metric, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.2 + index * 0.1 }}
                                  className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-lg transition-all hover:border-[#c40116]/20 group"
                                >
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2.5 rounded-xl bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 group-hover:scale-110 transition-transform">
                                      <metric.icon className="w-4 h-4 text-[#c40116]" />
                                    </div>
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                                      {metric.label}
                                    </span>
                                  </div>
                                  <div className="text-2xl font-bold text-gray-900 mb-2">
                                    {metric.value}%
                                  </div>
                                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${metric.value}%` }}
                                      transition={{
                                        delay: 0.5 + index * 0.1,
                                        duration: 1,
                                      }}
                                      className="h-1.5 rounded-full bg-linear-to-r from-[#c40116] to-[#be0117]"
                                    />
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Section Analysis */}
                          {atsResults?.section_analysis &&
                            atsResults.section_analysis.length > 0 && (
                              <SectionAnalysisDisplay
                                sectionAnalysis={atsResults.section_analysis}
                              />
                            )}

                          {/* Issues Display */}
                          {atsResults?.issues && (
                            <IssuesDisplay issues={atsResults.issues} />
                          )}
                        </div>
                      )}

                      {activeTab === "keywords" && (
                        <div className="space-y-8">
                          {/* Keyword Analysis Header */}
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">
                              Keyword Analysis
                            </h3>
                            <div className="flex gap-2">
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                {results?.keywords?.length} found
                              </span>
                              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                                {results?.missingKeywords.length} missing
                              </span>
                            </div>
                          </div>

                          {/* Found Keywords */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <FiCheckCircle className="w-4 h-4 text-green-500" />
                              Found Keywords
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {results?.keywords?.map((keyword, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="flex items-center gap-3 p-4 bg-linear-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-[#c40116]/20 hover:shadow-md transition-all group"
                                >
                                  <div
                                    className={`w-2 h-2 rounded-full ${
                                      keyword.importance === "high"
                                        ? "bg-green-500"
                                        : keyword.importance === "medium"
                                          ? "bg-yellow-500"
                                          : "bg-blue-500"
                                    }`}
                                  />
                                  <span className="flex-1 font-medium text-gray-900 group-hover:text-[#c40116] transition-colors">
                                    {keyword.word}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {keyword.count}x
                                  </span>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      keyword.importance === "high"
                                        ? "bg-green-100 text-green-700"
                                        : keyword.importance === "medium"
                                          ? "bg-yellow-100 text-yellow-700"
                                          : "bg-blue-100 text-blue-700"
                                    }`}
                                  >
                                    {keyword.importance}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Missing Keywords */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <FiAlertCircle className="w-4 h-4 text-yellow-500" />
                              Missing Keywords to Add
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {results?.missingKeywords?.map((keyword, index) => (
                                <motion.span
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="px-4 py-2 bg-linear-to-r from-yellow-50 to-orange-50 text-yellow-700 rounded-xl text-sm font-medium border border-yellow-200 hover:shadow-md hover:scale-105 transition-all cursor-default"
                                >
                                  {keyword}
                                </motion.span>
                              ))}
                            </div>
                          </div>

                          {/* Keyword Density Chart */}
                          <div className="bg-linear-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-4">
                              Keyword Density
                            </h4>
                            <div className="space-y-3">
                              {results?.keywords
                                .slice(0, 5)
                                .map((keyword, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-3"
                                  >
                                    <span className="text-sm text-gray-600 w-24">
                                      {keyword.word}
                                    </span>
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{
                                          width: `${(keyword.count / 10) * 100}%`,
                                        }}
                                        transition={{
                                          delay: index * 0.1,
                                          duration: 0.8,
                                        }}
                                        className={`h-full rounded-full ${
                                          keyword.importance === "high"
                                            ? "bg-linear-to-r from-green-500 to-emerald-500"
                                            : keyword.importance === "medium"
                                              ? "bg-linear-to-r from-yellow-500 to-orange-500"
                                              : "bg-linear-to-r from-blue-500 to-cyan-500"
                                        }`}
                                      />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                      {keyword.count}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-gray-100 bg-linear-to-r from-gray-50 to-white px-8 py-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={removeFile}
                      className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 group"
                    >
                      <FiRefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                      Analyze New Resume
                    </button>

                    <button className="px-6 py-2.5 bg-linear-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2 group hover:scale-105">
                      <FaRocket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      Optimize Resume
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Trusted By */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-16"
          >
            <p className="text-sm text-gray-500 mb-6">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {[
                "Google",
                "Microsoft",
                "Amazon",
                "Meta",
                "Apple",
                "Netflix",
              ].map((company) => (
                <motion.div
                  key={company}
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-[#c40116] transition-colors cursor-default font-semibold"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ATSCheckerPage;
