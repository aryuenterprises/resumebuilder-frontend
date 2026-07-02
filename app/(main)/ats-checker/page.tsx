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
  FiEye,
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
  FiUser,
  FiMessageSquare,
  FiMap,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiEdit3,
  FiBriefcase,
  FiZap,
  FiTarget,
} from "react-icons/fi";

import { FaBrain } from "react-icons/fa";
import { HiOutlineSparkles, HiOutlineChevronDown } from "react-icons/hi";
import { usePreventReload } from "@/app/hooks";
import { LuBrain } from "react-icons/lu";
import { IoBulb } from "react-icons/io5";
import api from "@/app/utils/api";
import { API_URL } from "@/app/config/api";
import LoginModel from "@/app/components/auth/LoginModel";

// ─── Tab IDs ─────────────────────────────────────────────────────────────────
type TabId = "overview" | "ai" | "sections" | "tips" | "edit";

// ─── Types ───────────────────────────────────────────────────────────────────
interface DimensionBreakdown {
  raw: number;
  weight: number;
  weighted: number;
  [key: string]: number;
}

// Fix: separate dimension_breakdown from the index signature
interface ScoreBreakdown {
  resume_quality_score?: number | null;
  keyword_match_score?: number | null;
  final_ats_score?: number | null;
  dimension_breakdown?: Record<string, DimensionBreakdown>;
}

interface ContactDetected {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  score?: number;
  status?: string;
}

interface Issue {
  message: string;
  severity?: "critical" | "high" | "medium" | "low";
  suggestion?: string;
  section: string;
  impact?: number;
}

// ─── Detailed suggestion types ────────────────────────────────────────────────
interface DetailedSuggestion {
  type?: "add" | "remove" | "improve" | string;
  element?: string;
  issue?: string;
  reason?: string;
  action?: string;
  example?: string;
  current_example?: string | null;
  improved_example?: string | null;
  impact?: number;
}

interface QuickWin {
  action?: string;
  how?: string;
  why?: string;
  estimated_gain?: number | string;
  effort?: string;
}

interface MissingElement {
  element?: string;
  name?: string;
  impact?: number;
  type?: string;
  why?: string;
}

interface ElementToRemove {
  element?: string;
  name?: string;
  why?: string;
  action?: string;
}

interface RewriteExample {
  before?: string;
  after?: string;
}

interface SectionAnalysisItem {
  score: number;
  target_score?: number;
  status?: string;
  grade?: string;
  is_present?: boolean;
  is_complete?: boolean;
  quality_level?: string;
  impact_potential?: number;
  quick_wins?: (string | QuickWin)[];
  missing_elements?: (string | MissingElement)[];
  elements_to_remove?: (string | ElementToRemove)[];
  top_priority_fixes?: {
    action?: string;
    why?: string;
    estimated_gain?: number;
    effort?: string;
    time?: string;
  }[];
  detailed_suggestions?: DetailedSuggestion[];
  strengths?: string[];
  rewrite_examples?: RewriteExample[];
  quality_issues?: { issue?: string; fix?: string; impact?: number }[];
  ats_passing_tips?: string[];
}

interface SectionAnalysisData {
  [key: string]: SectionAnalysisItem;
}

interface AIAnalysis {
  status?: string;
  industry_detected?: string;
  role_level?: string;
  ats_compatibility_verdict?: string;
  content_strengths?: string[];
  critical_improvements?: string[];
  bullet_rewrites?: Array<{
    original?: string;
    rewritten?: string;
    why_better?: string;
  }>;
  summary_rewrite?: {
    current?: string;
    suggested?: string;
    why_better?: string;
  };
  missing_sections?: string[];
  ats_passing_tactics?: string[];
  overall_assessment?: string;
  priority_action_plan?: string[];
}

interface Recommendations {
  top_3_priorities?: string[];
  quick_wins?: string[];
  improvement_roadmap?: Array<{
    step: number;
    section: string;
    action: string;
    effort: string;
    estimated_gain: number;
    time_estimate: string;
    why_now: string;
  }>;
  ats_passing_tactics?: string[];
  recruiter_tips?: string[];
  estimated_improvement?: number;
}

interface Summary {
  ready_to_apply: boolean;
  grade?: string;
  candidate_type?: string;
  percentile_estimate?: string;
  ats_compatibility_level?: string;
  ats_verdict?: string;
  main_strengths?: string[];
  main_weaknesses?: string[];
}

interface ATSResults {
  ats_score?: number;
  score_status?: string;
  grade?: string;
  candidate_type?: string;
  ready_to_apply?: boolean;
  ready_to_apply_verdict?: string;
  score_breakdown?: ScoreBreakdown;
  score_explanation?: unknown;
  contact_detected?: ContactDetected;
  issues?: Record<string, Issue[]>;
  critical_issues_count?: number;
  section_analysis?: SectionAnalysisData;
  ai_analysis?: AIAnalysis;
  recommendations?: Recommendations;
  summary?: Summary;
  meta?: {
    uploaded_file?: string;
    source?: string;
    pipeline?: string;
    [key: string]: unknown;
  };
}

// ─── Loading Screen ───────────────────────────────────────────────────────────
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
      className="fixed inset-0 bg-black/20 backdrop-blur-xl z-50 flex items-center justify-center p-3 sm:p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full p-5 sm:p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-indigo-600/5" />
        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-indigo-100 rounded-full blur-3xl -translate-y-32 translate-x-32 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple-100 rounded-full blur-3xl translate-y-32 -translate-x-32 animate-pulse delay-1000" />
        <div className="relative z-10">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 360, 360] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl"
          >
            <CurrentIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
          </motion.div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-gray-900 mb-1 sm:mb-2">
            Analyzing Your Resume
          </h3>
          <p className="text-center text-gray-600 text-xs sm:text-sm mb-6 sm:mb-8">
            {steps[currentStep].text}
          </p>
          <div className="relative h-2 sm:h-3 bg-gray-100 rounded-full overflow-hidden mb-3 sm:mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-full"
            />
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-gray-500">Processing...</span>
            <span className="font-semibold text-indigo-600">{progress}%</span>
          </div>
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-600"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Tabs ─────────────────────────────────────────────────────────────────────
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
}) => (
  <div className="relative">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-indigo-600/5 rounded-xl sm:rounded-2xl blur-xl" />
    <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1 border border-gray-100 shadow-sm overflow-x-auto">
      <div className="flex flex-nowrap gap-1 min-w-min">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center cursor-pointer justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-lg sm:rounded-xl shadow-lg"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <Icon
                  className={`w-3 h-3 sm:w-3.5 sm:h-4 ${isActive ? "text-white" : ""}`}
                />
                <span className="max-sm:hidden">{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && !isActive && (
                  <span className="ml-0.5 sm:ml-1 px-1 sm:px-1.5 py-0.5 text-[9px] sm:text-xs bg-gray-100 text-gray-600 rounded-full">
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

// ─── Score Card ───────────────────────────────────────────────────────────────
interface ModernScoreCardProps {
  score: number;
  grade?: string;
  verdict?: string;
  readyToApply?: boolean;
  readyToApplyVerdict?: string;
}

const ModernScoreCard: React.FC<ModernScoreCardProps> = ({
  score,
  grade,
  verdict,
  readyToApply,
  readyToApplyVerdict,
}) => (
  <div className="space-y-4 sm:space-y-6">
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 text-white shadow-2xl">
      <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-white/10 rounded-full blur-3xl -translate-y-48 translate-x-48" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-white/10 rounded-full blur-3xl translate-y-48 -translate-x-48" />
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        <div className="text-center md:text-left">
          <div className="text-[10px] sm:text-xs md:text-sm font-medium text-white/80 mb-1 sm:mb-2 tracking-wider">
            OVERALL ATS SCORE
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            {score}%
          </div>
          <div className="w-48 sm:w-64 md:w-80 h-2 sm:h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
        <div className="text-center md:text-right space-y-2 sm:space-y-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl md:text-2xl font-bold"
          >
            Grade: {grade || "N/A"}
          </motion.div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs sm:text-sm text-white/80"
          >
            {verdict || ""}
          </motion.div>
        </div>
      </div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-6 border ${readyToApply ? "bg-emerald-50 border-emerald-200" : "bg-orange-50 border-orange-200"}`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className={`p-2 sm:p-2.5 rounded-lg shrink-0 ${readyToApply ? "bg-emerald-100" : "bg-orange-100"}`}
        >
          {readyToApply ? (
            <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
          ) : (
            <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
          )}
        </div>
        <div>
          <h4
            className={`text-sm sm:text-base font-semibold mb-1 ${readyToApply ? "text-emerald-900" : "text-orange-900"}`}
          >
            {readyToApply ? "✓ Ready to Apply" : "⚠ Not Ready to Apply"}
          </h4>
          <p
            className={`text-xs sm:text-sm ${readyToApply ? "text-emerald-700" : "text-orange-700"}`}
          >
            {readyToApplyVerdict}
          </p>
        </div>
      </div>
    </motion.div>
  </div>
);

// ─── AI Analysis ──────────────────────────────────────────────────────────────
const AIAnalysisComponent: React.FC<{ aiAnalysis?: AIAnalysis }> = ({
  aiAnalysis,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  if (!aiAnalysis) return null;

  return (
    <div className="space-y-4 sm:space-y-6">
      {aiAnalysis.content_strengths &&
        aiAnalysis.content_strengths.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-50 border border-emerald-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <div className="p-2 sm:p-2.5 bg-emerald-100 rounded-lg">
                <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-emerald-900">
                Content Strengths
              </h3>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {aiAnalysis.content_strengths.map((strength, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border border-emerald-100"
                >
                  <FiThumbsUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-700">
                    {strength}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      {aiAnalysis.overall_assessment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-2.5 bg-blue-100 rounded-lg">
              <LuBrain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-blue-900">
              AI Assessment
            </h3>
          </div>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 leading-relaxed">
            {aiAnalysis.overall_assessment}
          </p>
        </motion.div>
      )}

      {aiAnalysis.summary_rewrite && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden"
        >
          <button
            onClick={() =>
              setExpandedSection(
                expandedSection === "summary" ? null : "summary",
              )
            }
            className="w-full text-left p-4 sm:p-5 hover:bg-gray-50 transition-colors border-b border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <FiEdit3 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                  Professional Summary Rewrite
                </h3>
              </div>
              <motion.div
                animate={{ rotate: expandedSection === "summary" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="p-1 rounded-full bg-gray-100"
              >
                <HiOutlineChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
              </motion.div>
            </div>
          </button>
          <AnimatePresence>
            {expandedSection === "summary" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 border-t border-gray-200">
                  <div className="space-y-2">
                    <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                      Current Summary
                    </span>
                    <p className="p-3 sm:p-4 bg-red-50 border border-red-100 rounded-lg text-[10px] sm:text-xs text-gray-700">
                      {aiAnalysis.summary_rewrite.current}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                      AI Suggested Version
                    </span>
                    <p className="p-3 sm:p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-[10px] sm:text-xs text-gray-700">
                      {aiAnalysis.summary_rewrite.suggested}
                    </p>
                  </div>
                  {aiAnalysis.summary_rewrite.why_better && (
                    <div className="p-3 sm:p-4 bg-blue-50 border border-blue-100 rounded-lg space-y-1.5">
                      <span className="text-[9px] sm:text-[10px] font-semibold text-blue-700 uppercase tracking-wider block">
                        Why It's Better
                      </span>
                      <p className="text-[10px] sm:text-xs text-blue-700">
                        {aiAnalysis.summary_rewrite.why_better}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {aiAnalysis.bullet_rewrites && aiAnalysis.bullet_rewrites.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden"
        >
          <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FiEdit3 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />{" "}
              Bullet Point Rewrites
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {aiAnalysis.bullet_rewrites.map((rewrite, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4"
              >
                <div className="space-y-1.5">
                  <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider block">
                    Original Bullet
                  </span>
                  <p className="p-2 sm:p-3 bg-red-50 border border-red-100 rounded-lg text-[10px] sm:text-xs text-gray-700">
                    "{rewrite.original}"
                  </p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-700 uppercase tracking-wider block">
                    ✓ Rewritten Version
                  </span>
                  <p className="p-2 sm:p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-[10px] sm:text-xs text-gray-700">
                    "{rewrite.rewritten}"
                  </p>
                </div>
                {rewrite.why_better && (
                  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <IoBulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 mt-0.5 shrink-0" />
                    <p className="text-[9px] sm:text-[10px] text-blue-700">
                      <span className="font-semibold">Why: </span>
                      {rewrite.why_better}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {aiAnalysis.priority_action_plan &&
        aiAnalysis.priority_action_plan.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-indigo-50 border border-indigo-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <div className="p-2 sm:p-2.5 bg-indigo-100 rounded-lg">
                <FiMap className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-indigo-900">
                Priority Action Plan
              </h3>
            </div>
            <ol className="space-y-2 sm:space-y-3">
              {aiAnalysis.priority_action_plan.map((action, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border border-indigo-100"
                >
                  <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-indigo-600 text-white text-[10px] sm:text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 pt-0.5">
                    {action}
                  </p>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        )}
    </div>
  );
};

// ─── Section Analysis ─────────────────────────────────────────────────────────
const SectionAnalysisDetail: React.FC<{
  data: SectionAnalysisData | null | undefined;
}> = ({ data }) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  if (!data) {
    return (
      <div className="text-center py-8 sm:py-10 md:py-12 text-gray-500">
        <FiInfo className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 opacity-50" />
        <p className="text-xs sm:text-sm">No section analysis available</p>
      </div>
    );
  }

  // Only show sections that have actual data (present or have a target score)
  const sections = Object.entries(data).filter(
    ([, sd]) =>
      sd &&
      (sd.is_present || (sd.target_score !== undefined && sd.target_score > 0)),
  );

  const toggleSection = (name: string) =>
    setExpandedSections((prev) => ({ ...prev, [name]: !prev[name] }));

  const getGradeColor = (grade?: string) => {
    if (!grade) return "text-gray-600 bg-gray-100";
    const map: Record<string, string> = {
      "A+": "text-emerald-600 bg-emerald-100",
      A: "text-emerald-600 bg-emerald-100",
      "A-": "text-emerald-600 bg-emerald-100",
      "B+": "text-blue-600 bg-blue-100",
      B: "text-blue-600 bg-blue-100",
      "B-": "text-blue-600 bg-blue-100",
      "C+": "text-yellow-600 bg-yellow-100",
      C: "text-yellow-600 bg-yellow-100",
      F: "text-red-600 bg-red-100",
    };
    return map[grade] || "text-gray-600 bg-gray-100";
  };

  const getSectionIcon = (name: string): React.ReactElement => {
    const map: Record<string, React.ElementType> = {
      contact: FiUser,
      summary: FiFileText,
      experience: FiBriefcase,
      education: FiBookOpen,
      skills: FiStar,
      projects: FiLayout,
      certifications: FiAward,
      languages: FiSearch,
    };
    const Icon = map[name?.toLowerCase()] || FiInfo;
    return <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />;
  };

  const getStatusColor = (status?: string, isPresent?: boolean) => {
    if (!isPresent) return "bg-red-100 text-red-700";
    if (status === "excellent") return "bg-emerald-100 text-emerald-700";
    if (status === "good") return "bg-blue-100 text-blue-700";
    if (status === "needs_improvement") return "bg-yellow-100 text-yellow-700";
    if (status === "missing") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  // Impact badge colour
  const getImpactColor = (impact?: number) => {
    if (!impact) return "text-gray-500 bg-gray-100";
    if (impact >= 10) return "text-red-600 bg-red-100";
    if (impact >= 5) return "text-orange-600 bg-orange-100";
    return "text-yellow-600 bg-yellow-100";
  };

  // Suggestion type pill
  const getSuggestionTypePill = (type?: string) => {
    if (type === "add") return "bg-emerald-100 text-emerald-700";
    if (type === "remove") return "bg-red-100 text-red-700";
    if (type === "improve") return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {sections.map(([sectionName, sd], index) => {
        if (!sd) return null;
        const isExpanded = expandedSections[sectionName] || false;
        const hasQuickWins = (sd.quick_wins?.length ?? 0) > 0;
        const hasMissing = (sd.missing_elements?.length ?? 0) > 0;
        const hasRemove = (sd.elements_to_remove?.length ?? 0) > 0;
        const hasStrengths = (sd.strengths?.length ?? 0) > 0;
        const hasSuggestions = (sd.detailed_suggestions?.length ?? 0) > 0;
        const hasRewrites = (sd.rewrite_examples?.length ?? 0) > 0;
        const hasPriority = (sd.top_priority_fixes?.length ?? 0) > 0;
        const hasQualityIssues = (sd.quality_issues?.length ?? 0) > 0;

        return (
          <motion.div
            key={sectionName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(index * 0.08, 0.5) }}
            className="bg-white rounded-lg sm:rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
          >
            {/* ── Header ── */}
            <button
              onClick={() => toggleSection(sectionName)}
              className="w-full text-left px-3 sm:px-4 md:px-5 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div
                    className={`p-1.5 sm:p-2 rounded-lg ${getGradeColor(sd.grade)}`}
                  >
                    {getSectionIcon(sectionName)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 capitalize">
                      {sectionName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                      <span
                        className={`text-[8px] sm:text-[9px] md:text-[10px] px-1.5 sm:px-2 py-0.5 rounded inline-block ${getStatusColor(sd.status, sd.is_present)}`}
                      >
                        {!sd.is_present || sd.status === "missing"
                          ? "Missing"
                          : sd.status?.replace(/_/g, " ") || "N/A"}
                      </span>
                      {sd.impact_potential !== undefined &&
                        sd.impact_potential > 0 && (
                          <span
                            className={`text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full font-medium ${getImpactColor(sd.impact_potential)}`}
                          >
                            +{sd.impact_potential} pts potential
                          </span>
                        )}
                      {sd.quality_level && (
                        <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 capitalize">
                          {sd.quality_level}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <div className="text-right">
                    <div
                      className={`text-base sm:text-lg md:text-xl font-bold ${getGradeColor(sd.grade)}`}
                    >
                      {sd.grade || "N/A"}
                    </div>
                    <div className="text-[9px] sm:text-[10px] md:text-xs font-medium mt-0.5 text-gray-500">
                      {sd.score}/{sd.target_score ?? sd.score}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-1 rounded-full bg-gray-100 shrink-0"
                  >
                    <HiOutlineChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
                  </motion.div>
                </div>
              </div>
            </button>

            {/* ── Expanded Content ── */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 sm:p-4 md:p-5 space-y-4 sm:space-y-5 border-t border-gray-100">
                    {/* Strengths */}
                    {hasStrengths && (
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                            Strengths
                          </span>
                        </div>
                        <div className="space-y-1 pl-4 sm:pl-5">
                          {sd.strengths?.map((s, i) => (
                            <p
                              key={i}
                              className="text-[10px] sm:text-xs text-gray-700"
                            >
                              • {s}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Top Priority Fixes */}
                    {hasPriority && (
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <FiTarget className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-600" />
                          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                            Top Priority Fixes
                          </span>
                        </div>
                        <div className="space-y-2">
                          {sd.top_priority_fixes?.map((fix, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 p-2 sm:p-3 bg-indigo-50 border border-indigo-100 rounded-lg"
                            >
                              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-white text-[9px] font-bold shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="text-[10px] sm:text-xs font-medium text-indigo-900">
                                  {fix.action}
                                </p>
                                {fix.why && (
                                  <p className="text-[9px] sm:text-[10px] text-indigo-700 mt-0.5">
                                    {fix.why}
                                  </p>
                                )}
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {fix.estimated_gain !== undefined && (
                                    <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                                      +{fix.estimated_gain} pts
                                    </span>
                                  )}
                                  {fix.effort && (
                                    <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                      {fix.effort}
                                    </span>
                                  )}
                                  {fix.time && (
                                    <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                      {fix.time}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Wins */}
                    {hasQuickWins && (
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <FiZap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                            Quick Wins ({sd.quick_wins?.length})
                          </span>
                        </div>
                        <div className="space-y-2 bg-emerald-50/60 rounded-lg p-2">
                          {sd.quick_wins?.map((win, i) => (
                            <div
                              key={i}
                              className="p-2 sm:p-2.5 bg-white border border-emerald-100 rounded-lg"
                            >
                              {typeof win === "string" ? (
                                <p className="text-[10px] sm:text-xs text-gray-700">
                                  {win}
                                </p>
                              ) : (
                                <>
                                  <div className="flex items-start justify-between gap-2">
                                    <p className="text-[10px] sm:text-xs font-medium text-gray-800">
                                      {win.action}
                                    </p>
                                    {win.estimated_gain !== undefined && (
                                      <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold shrink-0">
                                        +{win.estimated_gain} pts
                                      </span>
                                    )}
                                  </div>
                                  {/* "how" field from the API */}
                                  {win.how && (
                                    <p className="text-[9px] sm:text-[10px] text-indigo-700 mt-1 font-mono bg-indigo-50 rounded px-2 py-1 break-words">
                                      {win.how}
                                    </p>
                                  )}
                                  {win.why && (
                                    <p className="text-[9px] sm:text-[10px] text-gray-500 mt-1">
                                      {win.why}
                                    </p>
                                  )}
                                  {win.effort && (
                                    <span className="inline-block text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 mt-1">
                                      {win.effort}
                                    </span>
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quality Issues */}
                    {hasQualityIssues && (
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <FiAlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-500" />
                          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                            Quality Issues
                          </span>
                        </div>
                        <div className="space-y-2">
                          {sd.quality_issues?.map((qi, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 p-2 sm:p-2.5 bg-yellow-50 border border-yellow-100 rounded-lg"
                            >
                              <FiAlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                              <div>
                                <p className="text-[10px] sm:text-xs font-medium text-yellow-900">
                                  {qi.issue}
                                </p>
                                {qi.fix && (
                                  <p className="text-[9px] sm:text-[10px] text-yellow-700 mt-0.5">
                                    Fix: {qi.fix}
                                  </p>
                                )}
                                {qi.impact !== undefined && (
                                  <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium mt-1 inline-block">
                                    Impact: {qi.impact} pts
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Missing Elements */}
                    {hasMissing && (
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <FiAlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
                          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                            Missing Elements
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {sd.missing_elements?.map((el, i) => {
                            const label =
                              typeof el === "string"
                                ? el
                                : el.element || el.name || "Unknown";
                            const impact =
                              typeof el !== "string" ? el.impact : undefined;
                            return (
                              <div
                                key={i}
                                className="flex items-center gap-1 px-2 py-1 rounded-lg border border-red-100 bg-red-50"
                              >
                                <span className="text-[8px] sm:text-[9px] text-red-700">
                                  {label}
                                </span>
                                {impact !== undefined && (
                                  <span className="text-[7px] sm:text-[8px] font-semibold text-red-500 ml-0.5">
                                    ({impact} pts)
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Elements to Remove */}
                    {hasRemove && (
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <FiXCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
                          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                            Remove These
                          </span>
                        </div>
                        <div className="space-y-2 bg-orange-50/60 rounded-lg p-2">
                          {sd.elements_to_remove?.map((el, i) => (
                            <div
                              key={i}
                              className="p-2 sm:p-2.5 bg-white border border-orange-100 rounded-lg text-[9px] sm:text-[10px]"
                            >
                              {typeof el === "string" ? (
                                <p className="text-gray-700">{el}</p>
                              ) : (
                                <>
                                  <p className="font-semibold text-orange-700">
                                    {el.element || el.name}
                                  </p>
                                  {el.why && (
                                    <p className="text-gray-600 mt-0.5">
                                      {el.why}
                                    </p>
                                  )}
                                  {el.action && (
                                    <p className="text-emerald-700 font-medium mt-0.5">
                                      → {el.action}
                                    </p>
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Detailed Suggestions */}
                    {hasSuggestions && (
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <FiInfo className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-500" />
                          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                            Detailed Suggestions (
                            {sd.detailed_suggestions?.length})
                          </span>
                        </div>
                        <div className="space-y-2">
                          {sd.detailed_suggestions?.map((sug, i) => (
                            <div
                              key={i}
                              className="p-2 sm:p-3 bg-gray-50 border border-gray-100 rounded-lg"
                            >
                              <div className="flex items-start gap-2">
                                {sug.type && (
                                  <span
                                    className={`text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full font-semibold uppercase shrink-0 ${getSuggestionTypePill(sug.type)}`}
                                  >
                                    {sug.type}
                                  </span>
                                )}
                                <div className="flex-1 min-w-0">
                                  {/* Title: element or issue */}
                                  <p className="text-[10px] sm:text-xs font-medium text-gray-800">
                                    {sug.element || sug.issue || "Suggestion"}
                                  </p>
                                  {/* Reason */}
                                  {sug.reason && (
                                    <p className="text-[9px] sm:text-[10px] text-gray-600 mt-0.5">
                                      {sug.reason}
                                    </p>
                                  )}
                                  {/* Action */}
                                  {sug.action && (
                                    <p className="text-[9px] sm:text-[10px] text-emerald-700 font-medium mt-1">
                                      → {sug.action}
                                    </p>
                                  )}
                                  {/* Example */}
                                  {sug.example && (
                                    <p className="text-[9px] sm:text-[10px] text-indigo-700 mt-1 bg-indigo-50 rounded px-2 py-1 font-mono">
                                      {sug.example}
                                    </p>
                                  )}
                                  {/* Current → Improved */}
                                  {sug.current_example && (
                                    <div className="mt-1 space-y-0.5">
                                      <p className="text-[8px] sm:text-[9px] text-red-600 line-through">
                                        {sug.current_example}
                                      </p>
                                      {sug.improved_example && (
                                        <p className="text-[8px] sm:text-[9px] text-emerald-700 font-medium">
                                          {sug.improved_example}
                                        </p>
                                      )}
                                    </div>
                                  )}
                                  {/* Impact */}
                                  {sug.impact !== undefined && (
                                    <span
                                      className={`inline-block text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full font-medium mt-1 ${getImpactColor(sug.impact)}`}
                                    >
                                      Impact: {sug.impact} pts
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Rewrite Examples */}
                    {hasRewrites && (
                      <div className="bg-blue-50 rounded-lg p-2 sm:p-3 border border-blue-100">
                        <div className="flex items-center gap-1.5 mb-2">
                          <FiEdit3 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
                          <span className="text-[9px] sm:text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                            Rewrite Examples
                          </span>
                        </div>
                        <div className="space-y-2">
                          {sd.rewrite_examples?.map((ex, i) => (
                            <div key={i} className="space-y-1">
                              <p className="text-[8px] sm:text-[9px] text-red-700 line-through">
                                Before: {ex.before}
                              </p>
                              <p className="text-[8px] sm:text-[9px] text-emerald-700 font-medium">
                                After: {ex.after}
                              </p>
                            </div>
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

// ─── Recruiter Tips ───────────────────────────────────────────────────────────
const RecruiterTips: React.FC<{ tips?: string[]; atsTactics?: string[] }> = ({
  tips,
  atsTactics,
}) => {
  if (!tips && !atsTactics) return null;
  return (
    <div className="space-y-5 sm:space-y-6">
      {atsTactics && atsTactics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <div className="p-2 sm:p-2.5 bg-blue-100 rounded-lg">
              <FiShield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-blue-900">
              ATS Passing Tactics
            </h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {atsTactics.map((tactic, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border border-blue-100"
              >
                <div className="p-1 sm:p-1.5 bg-blue-100 rounded shrink-0 mt-0.5">
                  <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-700">
                  {tactic}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      {tips && tips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-50 border border-purple-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <div className="p-2 sm:p-2.5 bg-purple-100 rounded-lg">
              <FiMessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-purple-900">
              Recruiter Tips
            </h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {tips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border border-purple-100"
              >
                <div className="p-1 sm:p-1.5 bg-purple-100 rounded shrink-0 mt-0.5">
                  <FiInfo className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600" />
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-700">
                  {tip}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// ─── Contact Card ─────────────────────────────────────────────────────────────
const ContactCard: React.FC<{ contact?: ContactDetected }> = ({ contact }) => {
  if (!contact || contact.score === 0) return null;
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "excellent":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "good":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "fair":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 ${getStatusColor(contact.status)}`}
    >
      <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div>
            <h3 className="text-sm sm:text-base font-semibold">
              Contact Information
            </h3>
            <p className="text-[9px] sm:text-[10px] opacity-75">
              {contact.score}% Complete
            </p>
          </div>
        </div>
        <span className="text-xs sm:text-sm font-bold">
          {contact.status?.toUpperCase()}
        </span>
      </div>
      <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs">
        {contact.name && (
          <div className="flex items-center gap-2">
            <FiUser className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 shrink-0" />
            <span>{contact.name}</span>
          </div>
        )}
        {contact.email && (
          <div className="flex items-center gap-2">
            <FiMail className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 shrink-0" />
            <span className="truncate">{contact.email}</span>
          </div>
        )}
        {contact.phone && (
          <div className="flex items-center gap-2">
            <FiPhone className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 shrink-0" />
            <span>{contact.phone}</span>
          </div>
        )}
        {contact.linkedin && (
          <div className="flex items-center gap-2">
            <FiLinkedin className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 shrink-0" />
            <span className="truncate">{contact.linkedin}</span>
          </div>
        )}
        {contact.github && (
          <div className="flex items-center gap-2">
            <FiGithub className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 shrink-0" />
            <span className="truncate">{contact.github}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ATSCheckerPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [atsResults, setAtsResults] = useState<ATSResults | null>(null);
  const [dragActive, setDragActive] = useState(false);
  // Fix: use the TabId union type; cast in the handler
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  usePreventReload();

  useEffect(() => {
    if (file && !uploading && !loading) analyzeResume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const f = e.dataTransfer.files[0];
    if (f?.type === "application/pdf") {
      setFile(f);
      setError(null);
    } else setError("Please upload a PDF file");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const removeFile = () => {
    setFile(null);
    setAtsResults(null);
    setActiveTab("overview");
    setError(null);
  };

  const analyzeResume = async () => {
    if (!file) return;
    setUploading(true);
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

   

    // try {
    //   const response = await api.post<ATSResults>(
    //     `${API_URL}/ats/scan/`,
    //     formData,
    //     { headers: { "Content-Type": "multipart/form-data" } },
    //   );
    //   setAtsResults(response?.data);
    // } catch (err: unknown) {
    //   const e = err as {
    //     response?: { data?: { message?: string } };
    //     message?: string;
    //   };
    //   setError(
    //     e?.response?.data?.message || e?.message || "Failed to analyze resume",
    //   );

    //     if (error.response?.status === 403 && 
    //   error.response?.data?.message?.includes("ATS Scan limit exceeded")) {

      
    //   setFile(null);
    // } finally {
    //   setUploading(false);
    //   setTimeout(() => setLoading(false), 3000);
    // }



  
  try {
    const response = await api.post<ATSResults>(
      `${API_URL}/ats/scan/`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    setAtsResults(response?.data);
  } catch (err: unknown) {
    // Use axios.isAxiosError for better type safety
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      const message = err.response?.data?.message || err.message;
      
      if (status === 403 && message?.includes("ATS Scan limit exceeded")) {
        setError("⚠️ Daily scan limit reached. Please try again tomorrow.");
        setFile(null);
      } else if (status === 403) {
        setError("Access forbidden. Please check your permissions.");
      } else if (status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError(message || "Failed to analyze resume");
      }
    } else {
      setError("An unexpected error occurred");
    }
  } finally {
    setUploading(false);
    setTimeout(() => setLoading(false), 3000);
  }
}


  const atsScore = atsResults?.ats_score || 0;
  const totalSections = atsResults?.section_analysis
    ? Object.keys(atsResults.section_analysis).length
    : 0;

  const tabs: Tab[] = [
    { id: "overview", label: "Overview", icon: FiEye },
    { id: "ai", label: "AI Analysis", icon: FaBrain },
    {
      id: "sections",
      label: "Section Details",
      icon: FiLayers,
      badge: totalSections,
    },
    { id: "tips", label: "Tips", icon: FiMessageSquare },
    // { id: "edit",      label: "Edit Resume",     icon: FiEdit3 },
  ];

  // Fix: wrapper so (tabId: string) is accepted, then cast to TabId
  const handleTabChange = (tabId: string) => setActiveTab(tabId as TabId);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <>
    <LoginModel/>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <section className="relative pt-14 sm:pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
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
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 rounded-full mb-4 sm:mb-6 border border-indigo-200 backdrop-blur-sm"
            >
              <FaBrain className="w-2.5 h-2.5 sm:w-3 sm:h-3.5 text-indigo-600" />
              <span className="text-[10px] sm:text-xs font-medium text-indigo-700">
                AI-Powered ATS Checker
              </span>
              <HiOutlineSparkles className="w-2 h-2 sm:w-2.5 sm:h-3 text-indigo-600" />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-2"
            >
              <span className="text-gray-900">Optimize Your Resume</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                From Applied to Interviewed
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base md:text-lg text-gray-500 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-3"
            >
              Most resumes get rejected before HR even sees them. Upload yours
              and let AI fix what's stopping you from getting shortlisted.
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
              <div className="bg-white max-w-3xl mx-auto rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-4 sm:p-5 md:p-7">
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-300 ${
                      dragActive
                        ? "border-indigo-500 bg-indigo-50 scale-[1.02]"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50/50"
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
                        animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="inline-flex p-4 sm:p-5 md:p-6 bg-indigo-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6"
                      >
                        <FiUpload className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 text-indigo-600" />
                      </motion.div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        Upload Your Resume
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
                        Drag & drop or{" "}
                        <label
                          htmlFor="resume-upload"
                          className="text-indigo-600 font-semibold cursor-pointer hover:underline"
                        >
                          browse
                        </label>
                      </p>
                      {error && (
                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm">
                          {error}
                        </div>
                      )}
                      <div className="space-y-3 sm:space-y-4">
                        <label
                          htmlFor="resume-upload"
                          className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 text-xs sm:text-sm"
                        >
                          <FiUpload className="w-3.5 h-3.5 sm:w-4 sm:h-5" />{" "}
                          Choose File
                        </label>
                        <p className="text-[9px] sm:text-xs text-gray-500">
                          Upload PDF only (Max 10MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white max-w-6xl mx-auto rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-4 sm:px-5 md:px-6 py-3 sm:py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg sm:rounded-xl">
                        <FiFileText className="w-3.5 h-3.5 sm:w-4 sm:h-5 text-indigo-600" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-semibold text-gray-900">
                          ATS Analysis Results
                        </span>
                        <p className="text-[9px] sm:text-[10px] text-gray-500">
                          {atsResults?.summary?.grade} •{" "}
                          {atsResults?.summary?.ats_verdict}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeFile}
                      className="text-[10px] sm:text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 cursor-pointer transition-all duration-500 hover:scale-105"
                    >
                      <FiRefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{" "}
                      Analyze New Resume
                    </button>
                  </div>
                  {/* Fix: pass wrapper function — avoids TS error */}
                  <ModernTabs
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    tabs={tabs}
                  />
                </div>

                <div className="p-4 sm:p-5 md:p-6 lg:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeTab === "overview" && (
                        <div className="space-y-5 sm:space-y-6 md:space-y-8">
                          <ModernScoreCard
                            score={atsScore}
                            grade={atsResults?.grade}
                            verdict={atsResults?.score_status}
                            readyToApply={atsResults?.ready_to_apply}
                            readyToApplyVerdict={
                              atsResults?.ready_to_apply_verdict
                            }
                          />
                          <ContactCard contact={atsResults?.contact_detected} />
                        </div>
                      )}
                      {activeTab === "ai" && (
                        <AIAnalysisComponent
                          aiAnalysis={atsResults?.ai_analysis}
                        />
                      )}
                      {activeTab === "sections" && (
                        <SectionAnalysisDetail
                          data={atsResults?.section_analysis}
                        />
                      )}
                      {activeTab === "tips" && (
                        <div className="space-y-4 sm:space-y-6">
                          <RecruiterTips
                            tips={atsResults?.recommendations?.recruiter_tips}
                            atsTactics={
                              atsResults?.recommendations?.ats_passing_tactics
                            }
                          />
                        </div>
                      )}
                      {/* {activeTab === "edit" && <EditResumeTab uploadedFileText={atsResults?.meta?.uploaded_file ?? ""} />} */}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white px-4 sm:px-5 md:px-6 lg:px-8 py-3 sm:py-4">
                  <button
                    onClick={removeFile}
                    className="text-[10px] sm:text-xs text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1.5 sm:gap-2 group cursor-pointer"
                  >
                    <FiRefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:rotate-180 transition-transform duration-500" />{" "}
                    Analyze New Resume
                  </button>
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
