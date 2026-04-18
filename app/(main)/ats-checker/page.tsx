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
  FiSearch,
  FiTrendingUp,
  FiLayers,
  FiRefreshCw,
  FiStar,
  FiLayout,
  FiThumbsUp,
  FiBookOpen,
  FiXCircle,
  FiShield,
  FiTarget,
  FiBarChart2,
} from "react-icons/fi";

import { FaBrain, FaRocket, FaGraduationCap } from "react-icons/fa";
import { HiOutlineSparkles, HiOutlineChevronDown } from "react-icons/hi";
import { usePreventReload } from "@/app/hooks";

// ─── Types ───────────────────────────────────────────────────────────────
interface Issue {
  message: string;
  severity: "critical" | "high" | "medium" | "low";
  suggestion?: string;
  section: string;
  impact?: number;
}

interface SectionAnalysisData {
  [key: string]: {
    status?: string;
    is_present?: boolean;
    grade?: string;
    score?: number;
    quality_level?: string;
    target_score?: number;
    impact_potential?: number;
    quick_wins?: (string | { action?: string; estimated_gain?: string })[];
    missing_elements?: (
      | string
      | { element?: string; name?: string; text?: string }
    )[];
    elements_to_remove?: (
      | string
      | { element?: string; name?: string; text?: string }
    )[];
    top_priority_fixes?: { action?: string }[];
    detailed_suggestions?: Array<
      | {
          action?: string;
          why?: string;
          how?: string;
          estimated_gain?: string;
          effort?: string;
          time?: string;
        }
      | string
    >;
  };
}

interface ATSResults {
  ats_score?: number;
  score_breakdown?: {
    [key: string]: number | null | undefined;
  };
  summary?: {
    ats_verdict?: string;
  };
  ai_analysis?: {
    summary_rewrite?: {
      current?: string;
      rewritten?: string;
      suggested?: string;
    };
  };
  issues?: {
    [key: string]: Issue[];
  };
  section_analysis?: SectionAnalysisData;
}

// ─── Loading Screen Component ───────────────────────────────────────────
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
        <div className="absolute inset-0 bg-linear-to-br from-[#c40116]/5 via-transparent to-[#be0117]/5" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c40116]/10 rounded-full blur-3xl -translate-y-32 translate-x-32 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#be0117]/10 rounded-full blur-3xl translate-y-32 -translate-x-32 animate-pulse delay-1000" />

        <div className="relative z-10">
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

          <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Analyzing Your Resume
          </h3>
          <p className="text-center text-gray-600 mb-8">
            {steps[currentStep].text}
          </p>

          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute inset-0 bg-linear-to-r from-[#c40116] to-[#be0117] rounded-full"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Processing...</span>
            <span className="font-semibold text-[#c40116]">{progress}%</span>
          </div>

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

// ─── Modern Tab Component ───────────────────────────────────────────────
interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

interface ModernTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs: Tab[];
}

const ModernTabs: React.FC<ModernTabsProps> = ({
  activeTab,
  onTabChange,
  tabs,
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-linear-to-r from-[#c40116]/5 via-transparent to-[#be0117]/5 rounded-2xl blur-xl" />
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-1.5 border border-gray-100 shadow-sm">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex-1 flex items-center cursor-pointer justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-linear-to-r from-[#c40116] to-[#be0117] rounded-xl shadow-lg"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && !isActive && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Modern Score Card Component ────────────────────────────────────────
interface ModernScoreCardProps {
  score: number;
  verdict?: string;
}

const ModernScoreCard: React.FC<ModernScoreCardProps> = ({
  score,
  verdict,
}) => {
  return (
    <div className="relative overflow-hidden bg-linear-to-r from-[#c40116] to-[#be0117] rounded-3xl p-8 text-white shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-48 translate-x-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-48 -translate-x-48" />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <div className="text-sm font-medium text-white/80 mb-2 tracking-wider">
            OVERALL ATS SCORE
          </div>
          <div className="text-5xl font-bold mb-4 bg-linear-to-r from-white to-white/80 bg-clip-text text-transparent">
            {score}%
          </div>
          <div className="w-80 h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>

        <div className="text-center md:text-right">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold mb-3"
          >
            {verdict || "Good"}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ─── Modern Metric Grid Component ───────────────────────────────────────
interface Metric {
  key: string;
  label: string;
  icon: React.ElementType;
  value: number;
}

interface ModernMetricGridProps {
  metrics: Metric[];
}

const ModernMetricGrid: React.FC<ModernMetricGridProps> = ({ metrics }) => {
  const getlinear = (score: number) => {
    if (score >= 80) return "from-emerald-500 to-green-500";
    if (score >= 60) return "from-blue-500 to-cyan-500";
    if (score >= 40) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-rose-500";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {metrics.map((metric, index) => {
        const linear = getlinear(metric.value);
        const Icon = metric.icon;

        return (
          <motion.div
            key={metric.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-linear-to-r from-[#c40116]/10 to-[#be0117]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#c40116]/20 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-linear-to-br ${linear} shadow-lg`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-semibold text-gray-900">
                  {metric.value}%
                </div>
              </div>
              <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
                {metric.label}
              </h3>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  className={`h-full rounded-full bg-linear-to-r ${linear}`}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// ─── Modern Summary Card ────────────────────────────────────────────────
interface ModernSummaryCardProps {
  current: string;
  rewritten: string;
}

const ModernSummaryCard: React.FC<ModernSummaryCardProps> = ({
  current,
  rewritten,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="p-6 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-linear-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl">
            <HiOutlineSparkles className="w-5 h-5 text-[#c40116]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Professional Summary Enhancement
            </h3>
            <p className="text-sm text-gray-500">
              AI-powered rewrite for better impact
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="relative pl-6">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 rounded-full" />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{current}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative pl-6"
        >
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-[#c40116] to-[#be0117] rounded-full" />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#c40116] animate-pulse" />
              <span className="text-xs font-bold text-[#c40116] uppercase tracking-wider">
                AI Enhanced
              </span>
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                +42% Impact
              </span>
            </div>
            <p className="text-gray-900 font-medium leading-relaxed">
              {rewritten}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Issues Display Component ───────────────────────────────────────────
interface IssuesDisplayProps {
  issues: Record<string, Issue[]>;
}

const IssuesDisplay: React.FC<IssuesDisplayProps> = ({ issues }) => {
  const [expandedSeverity, setExpandedSeverity] = useState<string | null>(null);

  const severityConfig: Record<
    string,
    {
      icon: React.ElementType;
      color: string;
      bg: string;
      border: string;
      label: string;
      description: string;
    }
  > = {
    critical: {
      icon: FiAlertCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      label: "Critical Issues",
      description: "Must fix to pass ATS filters",
    },
    high: {
      icon: FiAlertCircle,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
      label: "High Priority",
      description: "Significant impact on your score",
    },
    medium: {
      icon: FiAlertCircle,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      label: "Medium Priority",
      description: "Moderate impact on ATS compatibility",
    },
    low: {
      icon: FiInfo,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      label: "Low Priority",
      description: "Minor improvements suggested",
    },
  };

  const getSectionIcon = (section: string): React.ReactElement => {
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

        <div className="divide-y divide-gray-100">
          {nonEmptySeverities.map(([severity, issueList]) => {
            const config = severityConfig[severity];
            const Icon = config.icon;
            const isExpanded = expandedSeverity === severity;

            return (
              <div key={severity} className="overflow-hidden">
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
                            className={`p-5 rounded-xl border ${config.border} ${config.bg}/50 backdrop-blur-sm`}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={`p-2.5 rounded-lg ${config.bg} shrink-0`}
                              >
                                {getSectionIcon(issue.section)}
                              </div>

                              <div className="flex-1">
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
                                      Impact: {issue.impact}
                                    </span>
                                  )}
                                </div>

                                <p className="text-sm text-gray-800 mb-3">
                                  {issue.message}
                                </p>

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

// ─── Section Analysis Component (Accordion Version) ─────────────────────────────────────────
interface SectionAnalysisProps {
  data: SectionAnalysisData | null | undefined;
}

const SectionAnalysis: React.FC<SectionAnalysisProps> = ({ data }) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  if (!data) {
    return (
      <div className="text-center py-8 text-gray-500">
        No section analysis available
      </div>
    );
  }

  const sections = Object.entries(data);

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const getGradeColor = (grade?: string): string => {
    const colors: Record<string, string> = {
      A: "text-green-600 bg-green-100",
      "A+": "text-green-600 bg-green-100",
      B: "text-blue-600 bg-blue-100",
      "B+": "text-blue-600 bg-blue-100",
      C: "text-yellow-600 bg-yellow-100",
      "C+": "text-yellow-600 bg-yellow-100",
      D: "text-orange-600 bg-orange-100",
      F: "text-red-600 bg-red-100",
    };
    return colors[grade || ""] || "text-gray-600 bg-gray-100";
  };

  const getScoreColor = (score?: number): string => {
    if (!score) return "text-gray-600";
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (score?: number): string => {
    if (!score) return "bg-gray-500";
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getSectionIcon = (sectionName: string): React.ReactElement => {
    const icons: Record<string, React.ElementType> = {
      awards: FiAward,
      education: FiBookOpen,
      experience: FiBriefcase,
      skills: FiStar,
    };
    const Icon = icons[sectionName?.toLowerCase()] || FiInfo;
    return <Icon className="w-5 h-5" />;
  };

  const getStatusBadge = (
    status?: string,
    isPresent?: boolean,
  ): { text: string; color: string; icon: React.ElementType } => {
    if (!isPresent) {
      return {
        text: "Missing",
        color: "bg-red-100 text-red-700",
        icon: FiXCircle,
      };
    }
    if (status === "needs_improvement") {
      return {
        text: "Needs Improvement",
        color: "bg-yellow-100 text-yellow-700",
        icon: FiAlertCircle,
      };
    }
    return {
      text: "Good",
      color: "bg-green-100 text-green-700",
      icon: FiCheckCircle,
    };
  };

  const renderQuickWin = (
    win: string | { action?: string; estimated_gain?: string },
    idx: number,
  ): React.ReactElement => {
    if (typeof win === "object" && win !== null) {
      return (
        <div
          key={idx}
          className="flex items-start gap-2 p-2 hover:bg-green-50 rounded-lg transition-colors"
        >
          <FiCheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              {win.action || JSON.stringify(win)}
            </p>
            {win.estimated_gain && (
              <span className="text-xs text-green-600 mt-1 inline-block">
                +{win.estimated_gain}
              </span>
            )}
          </div>
        </div>
      );
    }
    return (
      <div
        key={idx}
        className="flex items-start gap-2 p-2 hover:bg-green-50 rounded-lg transition-colors"
      >
        <FiCheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
        <span className="text-sm text-gray-700">{win}</span>
      </div>
    );
  };

  const renderElement = (
    element: string | { element?: string; name?: string; text?: string },
    idx: number,
    type: string = "missing",
  ): React.ReactElement => {
    const colors = {
      missing: "bg-red-50 text-red-600 border-red-100",
      remove: "bg-orange-50 text-orange-600 border-orange-100",
    };
    const colorClass = colors[type as keyof typeof colors] || colors.missing;

    if (typeof element === "object" && element !== null) {
      return (
        <span
          key={idx}
          className={`text-xs px-2.5 py-1 rounded-lg border ${colorClass}`}
        >
          {element.element ||
            element.name ||
            element.text ||
            JSON.stringify(element)}
        </span>
      );
    }
    return (
      <span
        key={idx}
        className={`text-xs px-2.5 py-1 rounded-lg border ${colorClass}`}
      >
        {element}
      </span>
    );
  };

  if (!sections.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No section analysis available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sections.map(([sectionName, sectionData], index) => {
        const statusBadge = getStatusBadge(
          sectionData?.status,
          sectionData?.is_present,
        );
        const StatusIcon = statusBadge.icon;
        const isExpanded = expandedSections[sectionName] || false;
        const hasContent =
          (sectionData?.quick_wins && sectionData.quick_wins.length > 0) ||
          (sectionData?.missing_elements &&
            sectionData.missing_elements.length > 0) ||
          (sectionData?.detailed_suggestions &&
            sectionData.detailed_suggestions.length > 0) ||
          (sectionData?.top_priority_fixes &&
            sectionData.top_priority_fixes.length > 0);

        return (
          <motion.div
            key={sectionName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleSection(sectionName)}
              className="w-full text-left px-5 py-4 bg-linear-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${getGradeColor(sectionData?.grade)}`}
                  >
                    {getSectionIcon(sectionName)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {sectionName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded inline-flex items-center gap-1 ${statusBadge.color}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {statusBadge.text}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 capitalize">
                        Quality: {sectionData?.quality_level || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div
                      className={`text-2xl font-bold ${getGradeColor(sectionData?.grade)}`}
                    >
                      {sectionData?.grade || "N/A"}
                    </div>
                    <div
                      className={`text-xs font-medium mt-0.5 ${getScoreColor(sectionData?.score)}`}
                    >
                      Score: {sectionData?.score || 0}%
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-1.5 rounded-full bg-gray-100"
                  >
                    <HiOutlineChevronDown className="w-4 h-4 text-gray-500" />
                  </motion.div>
                </div>
              </div>
            </button>

            {/* Accordion Content */}
            <AnimatePresence>
              {isExpanded && hasContent && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 space-y-4 border-t border-gray-100">
                    {/* Score Progress */}
                    {sectionData?.target_score &&
                      sectionData.target_score > 0 && (
                        <div>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-gray-600">
                              Completion Score
                            </span>
                            <span className="text-gray-900 font-medium">
                              {sectionData?.score || 0} /{" "}
                              {sectionData?.target_score}
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${((sectionData?.score || 0) / sectionData.target_score) * 100}%`,
                              }}
                              transition={{ duration: 0.5 }}
                              className={`h-2 rounded-full ${getProgressColor(sectionData?.score)}`}
                            />
                          </div>
                          {sectionData?.impact_potential &&
                            sectionData.impact_potential > 0 && (
                              <div className="flex items-center gap-2 mt-2">
                                <FiTrendingUp className="w-3 h-3 text-blue-500" />
                                <span className="text-xs text-gray-500">
                                  Impact potential:{" "}
                                  {sectionData?.impact_potential}%
                                </span>
                              </div>
                            )}
                        </div>
                      )}

                    {/* Quick Wins */}
                    {sectionData?.quick_wins &&
                      sectionData.quick_wins.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <FiThumbsUp className="w-4 h-4 text-green-600" />
                            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Quick Wins ({sectionData.quick_wins.length})
                            </span>
                          </div>
                          <div className="space-y-1 bg-green-50/30 rounded-lg p-2 max-h-48 overflow-y-auto">
                            {sectionData.quick_wins.map((win, idx) =>
                              renderQuickWin(win, idx),
                            )}
                          </div>
                        </div>
                      )}

                    {/* Missing Elements */}
                    {sectionData?.missing_elements &&
                      sectionData.missing_elements.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <FiAlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Missing Elements
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                            {sectionData.missing_elements.map((element, idx) =>
                              renderElement(element, idx, "missing"),
                            )}
                          </div>
                        </div>
                      )}

                    {/* Elements to Remove */}
                    {sectionData?.elements_to_remove &&
                      sectionData.elements_to_remove.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <FiXCircle className="w-4 h-4 text-orange-500" />
                            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Remove These
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                            {sectionData.elements_to_remove.map(
                              (element, idx) =>
                                renderElement(element, idx, "remove"),
                            )}
                          </div>
                        </div>
                      )}

                    {/* Top Priority Fixes */}
                    {sectionData?.top_priority_fixes &&
                      sectionData.top_priority_fixes.length > 0 && (
                        <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                          <div className="flex items-center gap-2 mb-2">
                            <FiAlertCircle className="w-4 h-4 text-red-600" />
                            <span className="text-xs font-bold text-red-700 uppercase tracking-wider">
                              Top Priority Fixes
                            </span>
                          </div>
                          <div className="space-y-1 max-h-32 overflow-y-auto">
                            {sectionData.top_priority_fixes.map((fix, idx) => (
                              <p
                                key={idx}
                                className="text-sm text-red-700 flex items-start gap-2"
                              >
                                <span className="text-red-500">!</span>
                                {fix.action}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────
const ATSCheckerPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [atsResults, setAtsResults] = useState<ATSResults | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "issues" | "section">(
    "overview",
  );

    usePreventReload()


  useEffect(() => {
    if (file && !uploading && !loading) {
      analyzeResume();
    }
  }, [file]);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
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
    setAtsResults(null);
    setActiveTab("overview");
  };

  const analyzeResume = async () => {
    if (!file) return;
    setUploading(true);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<ATSResults>(
        `https://ai.aryuacademy.com/api/v1/ats/scan-file`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      setAtsResults(response?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
      // setLoading(false);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  const scoreBreakdown = atsResults?.score_breakdown || {};
  const atsScore = atsResults?.ats_score || 0;

  const metrics: Metric[] = Object.entries(scoreBreakdown)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => {
      const configs: Record<
        string,
        { label: string; icon: React.ElementType }
      > = {
        ats_compliance: { label: "ATS Compliance", icon: FiShield },
        content_quality: { label: "Content Quality", icon: FiFileText },
        format_compliance: { label: "Format Compliance", icon: FiLayout },
        keyword_match_score: { label: "Keyword Match", icon: FiTarget },
        resume_quality_score: { label: "Resume Quality", icon: FiStar },
        structure_quality: { label: "Structure", icon: FiBarChart2 },
      };
      const config = configs[key] || {
        label: key.replace(/_/g, " "),
        icon: FiAward,
      };
      return {
        key,
        label: config.label,
        icon: config.icon,
        value: typeof value === "number" ? value : 0,
      };
    });

  const totalIssues = atsResults?.issues
    ? Object.values(atsResults.issues).flat().length
    : 0;

  const tabs: Tab[] = [
    { id: "overview", label: "Overview", icon: FiEye },
    { id: "issues", label: "Issues", icon: FiAlertCircle, badge: totalIssues },
    { id: "section", label: "Section Analysis", icon: FiLayers },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#c40116]/5 via-transparent to-[#be0117]/5" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#c40116]/10 rounded-full blur-3xl animate-pulse" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center max-w-5xl mx-auto"
          >
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

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Optimize Your Resume
              </span>
              <br />
              <span className="bg-linear-to-b from-black to-red-500 bg-clip-text text-transparent">
                From Applied to Interviewed
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
            >
              Most resumes get rejected before HR even sees them. Upload yours
              and let AI fix what’s stopping you from getting shortlisted.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.6 }}
            className="mx-auto"
          >
            {!file || !atsResults ? (
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
                      // accept=".pdf,.doc,.docx"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />

                    <div className="text-center">
                      <motion.div
                        animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
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
                        <span className="text-sm text-gray-500">
                          AI analyzing resumes instantly
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
                        <p className="text-xs text-gray-500">Upload PDF only</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white max-w-5xl mx-auto rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
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

                  <div className="mt-4">
                    <ModernTabs
                      activeTab={activeTab}
                      onTabChange={setActiveTab as (tabId: string) => void}
                      tabs={tabs}
                    />
                  </div>
                </div>

                <div className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeTab === "overview" && (
                        <div className="space-y-8">
                          <ModernScoreCard
                            score={atsScore}
                            verdict={atsResults?.summary?.ats_verdict}
                          />
                          {metrics.length > 0 && (
                            <ModernMetricGrid metrics={metrics} />
                          )}
                          {atsResults?.ai_analysis?.summary_rewrite && (
                            <ModernSummaryCard
                              current={
                                atsResults.ai_analysis.summary_rewrite
                                  .current || ""
                              }
                              rewritten={
                                atsResults.ai_analysis.summary_rewrite
                                  .rewritten ||
                                atsResults.ai_analysis.summary_rewrite
                                  .suggested ||
                                ""
                              }
                            />
                          )}
                        </div>
                      )}

                      {activeTab === "issues" && (
                        <div className="space-y-6">
                          {atsResults?.issues ? (
                            <IssuesDisplay issues={atsResults.issues} />
                          ) : (
                            <div className="text-center py-12 text-gray-500">
                              <FiCheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                              <p>No issues found! Your resume looks great!</p>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === "section" && (
                        <div className="space-y-6">
                          {atsResults?.section_analysis ? (
                            <SectionAnalysis
                              data={atsResults.section_analysis}
                            />
                          ) : (
                            <div className="text-center py-12 text-gray-500">
                              <FiInfo className="w-12 h-12 mx-auto mb-3" />
                              <p>No section analysis available</p>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

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
        </div>
      </section>
    </>
  );
};

export default ATSCheckerPage;
