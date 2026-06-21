"use client";

/**
 * EditResumeTab.tsx
 *
 * Parses `meta.uploaded_file` from the ATS API into your context types,
 * lets the user review/edit, then on "Save to Builder":
 *   1. Sets all context values directly
 *   2. Sets sessionStorage "oldRouteNameDashboard" so ResumeDataFetcher
 *      knows to load from context (not re-fetch from API)
 *   3. Navigates to /resume-details/contact
 *
 * ─── Minimal wiring in ATSCheckerPage ───────────────────────────────────────
 *
 * 1. Add to your ATSResults type:
 *      meta?: { uploaded_file?: string; [key: string]: any };
 *
 * 2. Extend activeTab union:
 *      "overview" | "ai" | "sections" | "tips" | "edit"
 *
 * 3. Add to tabs array:
 *      { id: "edit", label: "Edit Resume", icon: FiEdit3 }
 *
 * 4. Render in the tab switch:
 *      {activeTab === "edit" && (
 *        <EditResumeTab
 *          uploadedFileText={atsResults?.meta?.uploaded_file ?? ""}
 *        />
 *      )}
 *
 * That's it — no onSaveToBuilder prop needed. The component reads context
 * and router internally.
 */

import React, { useContext, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiBriefcase,
  FiBook,
  FiStar,
  FiLayout,
  FiMoreHorizontal,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiTrash2,
  FiAlertCircle,
  FiArrowRight,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

// ─── Import your real context + types ────────────────────────────────────────
// Adjust these import paths to match your project structure
import { CreateContext } from "@/app/context/CreateContext";
import { getLocalStorage, setSessionStorage } from "@/app/utils";
import { Template } from "@/app/types";

// ─── Interface types (mirrors your context.types) ────────────────────────────
export interface Contact {
  _id?: string;
  contactId?: string;
  firstName: string;
  lastName: string;
  jobTitle?: string;
  dob?: string;
  phone?: string;
  email?: string;
  linkedIn?: string;
  github?: string;
  portfolio: string;
  address: string;
  city: string;
  country: string;
  postCode?: string;
  photo?: string | null;
  croppedImage: string | null;
}

export interface Experience {
  id: number | string;
  jobTitle?: string;
  employer?: string;
  startDate?: string;
  endDate?: string;
  isCurrentlyWorking?: boolean;
  text?: string;
  location?: string;
  isOpen?: boolean;
  showPicker?: boolean;
  year?: number;
}

export interface Education {
  id: string | number;
  schoolname: string;
  degree: string;
  location: string;
  text: string;
  startDate: string | null | undefined;
  endDate: string | null | undefined;
  grade?: string;
  isCurrentlyStudying?: boolean;
  isOpen: boolean;
  showPicker: boolean;
  year: number;
  error?: Record<string, string>;
}

export interface Skill {
  text?: string;
}

export interface Project {
  id: string | number;
  title?: string;
  techStack: string[];
  description?: string;
  liveUrl?: string;
  githubUrl?: string;
  isOpen?: boolean;
}

export interface Finalize {
  languages?: Array<{ _id?: string; name: string; level?: string | number }>;
  certificationsAndLicenses?: Array<{ id?: string; name: string }>;
  hobbiesAndInterests?: Array<{ id?: string; name: string }>;
  awardsAndHonors?: Array<{ id?: string; name: string }>;
  websitesAndSocialMedia?: Array<{
    id?: string;
    websiteUrl?: string;
    socialMedia?: string;
  }>;
  references?: Array<{ id?: string; name: string }>;
  customSection?: Array<{ id?: string; name?: string; description?: string }>;
}

export interface ParsedResumeData {
  contact: Contact;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  finalize: Finalize;
}

// ─── Markdown Parser ──────────────────────────────────────────────────────────
function parseUploadedFileMarkdown(raw: string): ParsedResumeData {
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const clean = (s: string) =>
    s
      .replace(/\*\*/g, "")
      .replace(/^\*\s*/, "")
      .replace(/^-\s*/, "")
      .replace(/^#+\s*/, "")
      .trim();

  const isBullet = (l: string) => /^[-*•]/.test(l);
  const isHeading = (l: string) =>
    /^#{1,4}\s/.test(l) || /^[A-Z][A-Z\s&/]{4,}$/.test(l);

  const SECTION_PATTERNS: Record<string, RegExp> = {
    summary: /^(summary|professional summary|profile|objective)/i,
    experience:
      /^(experience|work experience|professional experience|employment)/i,
    education: /^(education|academic|qualification)/i,
    skills: /^(skill|technical skill|tech stack|technologies)/i,
    projects: /^(project|portfolio)/i,
    languages: /^(language)/i,
    certifications: /^(certification|license|award|honor)/i,
    contact: /^(contact|personal)/i,
  };

  const getSectionKey = (line: string): string | null => {
    const text = clean(line);
    for (const [key, re] of Object.entries(SECTION_PATTERNS)) {
      if (re.test(text)) return key;
    }
    return null;
  };

  type SectionBucket = { key: string; lines: string[] };
  const buckets: SectionBucket[] = [];
  let currentKey = "preamble";
  let currentLines: string[] = [];

  for (const line of lines) {
    if (isHeading(line)) {
      const key = getSectionKey(line);
      if (key && key !== currentKey) {
        buckets.push({ key: currentKey, lines: currentLines });
        currentKey = key;
        currentLines = [];
        continue;
      }
    }
    currentLines.push(line);
  }
  buckets.push({ key: currentKey, lines: currentLines });

  const getSection = (key: string) =>
    buckets.find((b) => b.key === key)?.lines ?? [];

  // ── Contact ───────────────────────────────────────────────────────────────
  const preambleLines = [...getSection("preamble"), ...getSection("contact")];
  const fullText = preambleLines.join(" ");

  const emailMatch = fullText.match(/[\w.+-]+@[\w-]+\.[a-z]{2,}/i);
  const phoneMatch = fullText.match(/[\d\s()+-]{7,20}/);
  const linkedInMatch = fullText.match(
    /(?:linkedin\.com\/in\/|linkedin:?\s*)([^\s|,]+)/i
  );
  const githubMatch = fullText.match(
    /(?:github\.com\/|github:?\s*)([^\s|,]+)/i
  );
  const portfolioMatch = fullText.match(
    /(?:portfolio|website):?\s*(https?:\/\/[^\s|,]+)/i
  );

  let rawName = "";
  for (const l of preambleLines) {
    const c = clean(l);
    if (
      c &&
      !c.includes("@") &&
      !c.match(/^\d/) &&
      !getSectionKey(l) &&
      c.split(" ").length <= 5 &&
      !c.toLowerCase().includes("stack") &&
      !c.toLowerCase().includes("engineer") &&
      !c.toLowerCase().includes("developer")
    ) {
      rawName = c;
      break;
    }
  }

  let jobTitle = "";
  for (const l of preambleLines) {
    const c = clean(l);
    if (
      /engineer|developer|designer|manager|analyst|scientist|architect/i.test(
        c
      ) &&
      c.split(" ").length <= 8
    ) {
      jobTitle = c;
      break;
    }
  }

  let city = "",
    country = "";
  const locationPatterns = [
    /([A-Za-z\s]+),\s*([A-Za-z\s]+),\s*(India|USA|UK|Canada|Australia)/i,
    /([A-Za-z\s]+),\s*(India|USA|UK|Canada|Australia)/i,
  ];
  for (const pat of locationPatterns) {
    const m = fullText.match(pat);
    if (m) {
      city = (m[1] || "").trim();
      country = (m[m.length - 1] || "").trim();
      break;
    }
  }

  const [firstName = "", ...restName] = rawName
    .replace("logo", "")
    .trim()
    .split(" ");
  const lastName = restName.join(" ");

  const contact: Contact = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    jobTitle,
    email: emailMatch?.[0] ?? "",
    phone: phoneMatch?.[0]?.trim() ?? "",
    linkedIn: linkedInMatch ? linkedInMatch[0] : "",
    github: githubMatch ? githubMatch[0] : "",
    portfolio: portfolioMatch?.[1] ?? "",
    address: "",
    city,
    country,
    postCode: "",
    croppedImage: null,
  };

  // ── Experience ────────────────────────────────────────────────────────────
  const expLines = getSection("experience");
  const experiences: Experience[] = [];
  let currentExp: Partial<Experience> | null = null;
  let bulletBuffer: string[] = [];

  const flushExp = () => {
    if (currentExp) {
      currentExp.text = bulletBuffer.join("\n");
      currentExp.isOpen = false;
      currentExp.showPicker = false;
      experiences.push(currentExp as Experience);
      bulletBuffer = [];
      currentExp = null;
    }
  };

  for (const line of expLines) {
    const c = clean(line);
    if (!c) continue;

    const dateMatch = c.match(
      /([A-Za-z]+\.?\s+\d{4}|\d{2}\/\d{4})\s*[–\-—to]+\s*([A-Za-z]+\.?\s+\d{4}|\d{2}\/\d{4}|present|current)/i
    );
    const isCompanyLine =
      !isBullet(line) &&
      c.split(" ").length <= 10 &&
      (/Ltd|Inc|Pvt|LLC|Corp|Technologies|Solutions|Enterprises|Academy/i.test(
        c
      ) ||
        /\|\s/.test(c));
    const isJobTitleLine =
      !isBullet(line) &&
      /engineer|developer|designer|manager|analyst|scientist|architect|intern|lead|senior|junior/i.test(
        c
      ) &&
      c.split(" ").length <= 8;

    if (isJobTitleLine && (!currentExp || currentExp.jobTitle)) {
      flushExp();
      currentExp = {
        id: Date.now() + experiences.length,
        jobTitle: c,
        year: new Date().getFullYear(),
      };
    } else if (isCompanyLine && currentExp && !currentExp.employer) {
      const parts = c.split("|").map((p) => p.trim());
      currentExp.employer = parts[0];
      if (parts[1]) {
        const dParts = parts[1].match(
          /([A-Za-z]+\.?\s+\d{4}|\d{2}\/\d{4})/gi
        );
        currentExp.startDate = dParts?.[0] ?? "";
        currentExp.endDate = dParts?.[1] ?? "";
        currentExp.isCurrentlyWorking = /present|current/i.test(parts[1]);
      }
      currentExp.location = parts[2] ?? "";
    } else if (dateMatch && currentExp) {
      currentExp.startDate = dateMatch[1];
      currentExp.endDate = dateMatch[2];
      currentExp.isCurrentlyWorking = /present|current/i.test(dateMatch[2]);
    } else if (isBullet(line) && currentExp) {
      bulletBuffer.push(c);
    }
  }
  flushExp();

  // ── Education ─────────────────────────────────────────────────────────────
  const eduLines = getSection("education");
  const educations: Education[] = [];
  let currentEdu: Partial<Education> | null = null;
  let eduBullets: string[] = [];

  const flushEdu = () => {
    if (currentEdu) {
      currentEdu.text = eduBullets.join("\n");
      currentEdu.isOpen = false;
      currentEdu.showPicker = false;
      currentEdu.year = new Date().getFullYear();
      educations.push(currentEdu as Education);
      eduBullets = [];
      currentEdu = null;
    }
  };

  for (const line of eduLines) {
    const c = clean(line);
    if (!c) continue;

    const degreeMatch = c.match(
      /bachelor|master|b\.?e|b\.?tech|m\.?tech|b\.?sc|m\.?sc|phd|diploma|associate|mba/i
    );
    const dateMatch = c.match(
      /(\d{2}\/\d{4}|\d{4})\s*[–\-—]?\s*(\d{2}\/\d{4}|\d{4})?/
    );
    const gradeMatch = c.match(
      /(?:cgpa|gpa|grade|percentage)[:\s]*([0-9.]+)/i
    );
    const isSchool =
      !isBullet(line) &&
      /college|university|school|institute|academy/i.test(c);

    if (degreeMatch && (!currentEdu || currentEdu.degree)) {
      flushEdu();
      currentEdu = {
        id: Date.now() + educations.length + 100,
        degree: c,
        schoolname: "",
        location: "",
        text: "",
        startDate: null,
        endDate: null,
        isCurrentlyStudying: false,
      };
    } else if (isSchool && currentEdu) {
      currentEdu.schoolname = c;
    } else if (dateMatch && currentEdu) {
      currentEdu.startDate = dateMatch[1] ?? null;
      currentEdu.endDate = dateMatch[2] ?? null;
    } else if (gradeMatch && currentEdu) {
      currentEdu.grade = gradeMatch[1];
    } else if (isBullet(line) && currentEdu) {
      eduBullets.push(c);
    } else if (
      !isBullet(line) &&
      currentEdu &&
      !currentEdu.location &&
      /[A-Z][a-z]+/.test(c) &&
      c.split(" ").length <= 5
    ) {
      currentEdu.location = c;
    }
  }
  flushEdu();

  // ── Skills ────────────────────────────────────────────────────────────────
  const skillLines = getSection("skills");
  const skills: Skill[] = [];
  for (const line of skillLines) {
    const c = clean(line);
    if (!c || isHeading(line)) continue;
    const parts = c
      .split(/[,;]/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length > 1) {
      parts.forEach((p) => { if (p.length > 1) skills.push({ text: p }); });
    } else if (c.length > 1) {
      skills.push({ text: c });
    }
  }
  const seenSkills = new Set<string>();
  const uniqueSkills = skills.filter((s) => {
    const key = (s.text ?? "").toLowerCase();
    if (seenSkills.has(key)) return false;
    seenSkills.add(key);
    return true;
  });

  // ── Projects ──────────────────────────────────────────────────────────────
  const projLines = getSection("projects");
  const projects: Project[] = [];
  let currentProj: Partial<Project> | null = null;
  let projBullets: string[] = [];

  const flushProj = () => {
    if (currentProj) {
      currentProj.description = projBullets.join("\n");
      currentProj.isOpen = false;
      projects.push(currentProj as Project);
      projBullets = [];
      currentProj = null;
    }
  };

  for (const line of projLines) {
    const c = clean(line);
    if (!c) continue;
    const techMatch = c.match(
      /^(?:tech(?:nology|nologies|stack)?|stack|built with)[:\s]+(.+)/i
    );
    const isTitle =
      !isBullet(line) &&
      c.split(" ").length <= 8 &&
      !techMatch &&
      c.length > 3;

    if (isTitle && (!currentProj || currentProj.title)) {
      flushProj();
      currentProj = {
        id: Date.now() + projects.length + 200,
        title: c,
        techStack: [],
      };
    } else if (techMatch && currentProj) {
      currentProj.techStack = techMatch[1]
        .split(/[,;]/)
        .map((t) => t.trim())
        .filter(Boolean);
    } else if (isBullet(line) && currentProj) {
      const urlMatch = c.match(/https?:\/\/[^\s]+/);
      if (urlMatch) {
        if (/github/i.test(c)) currentProj.githubUrl = urlMatch[0];
        else currentProj.liveUrl = urlMatch[0];
      } else {
        projBullets.push(c);
      }
    }
  }
  flushProj();

  // ── Finalize ──────────────────────────────────────────────────────────────
  const langLines = getSection("languages");
  const languages: Finalize["languages"] = [];
  let langName = "";
  for (const line of langLines) {
    const c = clean(line);
    if (!c || /language/i.test(c)) continue;
    if (!langName) { langName = c; }
    else { languages.push({ name: langName, level: c }); langName = ""; }
  }
  if (langName) languages.push({ name: langName, level: "" });

  const certLines = getSection("certifications");
  const certs: Finalize["certificationsAndLicenses"] = certLines
    .filter((l) => !isHeading(l) && clean(l).length > 2)
    .map((l) => ({ name: clean(l) }));

  const finalize: Finalize = {
    languages,
    certificationsAndLicenses: certs,
    hobbiesAndInterests: [],
    awardsAndHonors: [],
    websitesAndSocialMedia: [],
    references: [],
    customSection: [],
  };

  return { contact, experiences, educations, skills: uniqueSkills, projects, finalize };
}

// ─── Section Accordion ────────────────────────────────────────────────────────
interface SectionProps {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  badge?: number;
}

const Section: React.FC<SectionProps> = ({
  title, icon, defaultOpen = true, children, badge,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white hover:from-indigo-50/40 hover:to-white transition-colors text-left"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg text-indigo-600">
            {icon}
          </div>
          <span className="text-sm sm:text-base font-semibold text-gray-900">
            {title}
          </span>
          {badge !== undefined && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-medium">
              {badge}
            </span>
          )}
        </div>
        {open ? (
          <FiChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <FiChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-5 border-t border-gray-100">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Field ────────────────────────────────────────────────────────────────────
const Field: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  rows?: number;
}> = ({ label, value, onChange, placeholder, type = "text", textarea, rows = 3 }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {label}
    </label>
    {textarea ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full text-xs sm:text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 resize-y transition"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-xs sm:text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
      />
    )}
  </div>
);

// ─── Saving Overlay ───────────────────────────────────────────────────────────
const SavingOverlay: React.FC<{ show: boolean }> = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl px-8 py-8 flex flex-col items-center gap-4 min-w-[220px]"
        >
          <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full"
              style={{ borderWidth: 3 }}
            />
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-900 text-sm">Saving to Builder</p>
            <p className="text-xs text-gray-500 mt-1">Redirecting you now...</p>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Main Component ───────────────────────────────────────────────────────────
interface EditResumeTabProps {
  /** Raw `meta.uploaded_file` string from ATS API response */
  uploadedFileText: string;
}

export const EditResumeTab: React.FC<EditResumeTabProps> = ({
  uploadedFileText,
}) => {
  const router = useRouter();

  // Pull setters from your existing context
  const {
    setContact,
    setEducation,
    setExperiences,
    setSkills,
    setFinalize,
    setProjects,
    setFullResumeData,
  } = useContext(CreateContext);

  const parsed = useMemo(
    () => parseUploadedFileMarkdown(uploadedFileText),
    [uploadedFileText]
  );

  // Local editable copies
  const [contact, setLocalContact] = useState<Contact>(parsed.contact);
  const [experiences, setLocalExperiences] = useState<Experience[]>(parsed.experiences);
  const [educations, setLocalEducations] = useState<Education[]>(parsed.educations);
  const [skills, setLocalSkills] = useState<Skill[]>(parsed.skills);
  const [projects, setLocalProjects] = useState<Project[]>(parsed.projects);
  const [finalize, setLocalFinalize] = useState<Finalize>(parsed.finalize);
  const [saving, setSaving] = useState(false);

  // Re-sync when raw text changes
  useEffect(() => {
    const p = parseUploadedFileMarkdown(uploadedFileText);
    setLocalContact(p.contact);
    setLocalExperiences(p.experiences);
    setLocalEducations(p.educations);
    setLocalSkills(p.skills);
    setLocalProjects(p.projects);
    setLocalFinalize(p.finalize);
  }, [uploadedFileText]);

  // ── Save handler ─────────────────────────────────────────────────────────
  const handleSaveToBuilder = () => {
    setSaving(true);

    // 1. Push data into context (same pattern as ResumeDataFetcher)
    setContact(contact as any);
    setEducation(educations as any);
    setExperiences(experiences as any);
    setSkills(skills as any);
    setProjects(projects as any);
    setFinalize(finalize as any);

    // 2. Tell ResumeDataFetcher to use context data, not re-fetch from API
    //    It checks sessionStorage "oldRouteNameDashboard" to skip the API call
    setSessionStorage("oldRouteNameDashboard", true);

    // 3. Populate fullResumeData so templates render immediately
    const chosenTemplate = getLocalStorage<Template>("chosenTemplate");
    setFullResumeData({
      template: chosenTemplate?.templateId || chosenTemplate?.id,
      contact: contact as any,
      experiences: experiences as any,
      education: educations as any,
      skills: skills as any,
      summary: "",
      finalize: finalize as any,
      projects: projects as any,
    });

    // 4. Navigate to first step of builder after brief delay (overlay shows)
    setTimeout(() => {
      router.push("/resume-details/contact");
    }, 800);
  };

  // ─── Field updaters ───────────────────────────────────────────────────────
  const setC = <K extends keyof Contact>(k: K, v: Contact[K]) =>
    setLocalContact((prev) => ({ ...prev, [k]: v }));

  const updateExp = <K extends keyof Experience>(id: Experience["id"], k: K, v: Experience[K]) =>
    setLocalExperiences((prev) => prev.map((e) => (e.id === id ? { ...e, [k]: v } : e)));

  const addExp = () =>
    setLocalExperiences((prev) => [
      ...prev,
      { id: Date.now(), jobTitle: "", employer: "", startDate: "", endDate: "",
        isCurrentlyWorking: false, text: "", location: "", isOpen: false, showPicker: false,
        year: new Date().getFullYear() },
    ]);

  const removeExp = (id: Experience["id"]) =>
    setLocalExperiences((prev) => prev.filter((e) => e.id !== id));

  const updateEdu = <K extends keyof Education>(id: Education["id"], k: K, v: Education[K]) =>
    setLocalEducations((prev) => prev.map((e) => (e.id === id ? { ...e, [k]: v } : e)));

  const addEdu = () =>
    setLocalEducations((prev) => [
      ...prev,
      { id: Date.now(), schoolname: "", degree: "", location: "", text: "",
        startDate: null, endDate: null, grade: "", isCurrentlyStudying: false,
        isOpen: false, showPicker: false, year: new Date().getFullYear() },
    ]);

  const removeEdu = (id: Education["id"]) =>
    setLocalEducations((prev) => prev.filter((e) => e.id !== id));

  const updateSkill = (idx: number, v: string) =>
    setLocalSkills((prev) => prev.map((s, i) => (i === idx ? { text: v } : s)));
  const removeSkill = (idx: number) =>
    setLocalSkills((prev) => prev.filter((_, i) => i !== idx));
  const addSkill = () => setLocalSkills((prev) => [...prev, { text: "" }]);

  const updateProj = <K extends keyof Project>(id: Project["id"], k: K, v: Project[K]) =>
    setLocalProjects((prev) => prev.map((p) => (p.id === id ? { ...p, [k]: v } : p)));

  const addProj = () =>
    setLocalProjects((prev) => [
      ...prev,
      { id: Date.now(), title: "", techStack: [], description: "",
        liveUrl: "", githubUrl: "", isOpen: false },
    ]);

  const removeProj = (id: Project["id"]) =>
    setLocalProjects((prev) => prev.filter((p) => p.id !== id));

  const updateLang = (idx: number, k: "name" | "level", v: string) =>
    setLocalFinalize((prev) => ({
      ...prev,
      languages: (prev.languages ?? []).map((l, i) =>
        i === idx ? { ...l, [k]: v } : l
      ),
    }));
  const addLang = () =>
    setLocalFinalize((prev) => ({
      ...prev,
      languages: [...(prev.languages ?? []), { name: "", level: "" }],
    }));
  const removeLang = (idx: number) =>
    setLocalFinalize((prev) => ({
      ...prev,
      languages: (prev.languages ?? []).filter((_, i) => i !== idx),
    }));

  // ─────────────────────────────────────────────────────────────────────────
  if (!uploadedFileText) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3">
        <FiAlertCircle className="w-10 h-10" />
        <p className="text-sm">No resume text available to parse.</p>
      </div>
    );
  }

  const SaveButton: React.FC<{ bottom?: boolean }> = ({ bottom }) => (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.03 }}
      onClick={handleSaveToBuilder}
      disabled={saving}
      className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-md bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-lg transition-all disabled:opacity-60"
    >
      {saving ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
          />
          Saving...
        </>
      ) : (
        <>
          {bottom ? (
            <>
              Save & Go to Builder
              <FiArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <FiCheck className="w-4 h-4" />
              Save to Builder
            </>
          )}
        </>
      )}
    </motion.button>
  );

  return (
    <>
      <SavingOverlay show={saving} />

      <div className="space-y-4 sm:space-y-5">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <HiOutlineSparkles className="text-indigo-600 w-5 h-5" />
              AI-Extracted Resume Data
            </h2>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
              Review and edit the auto-parsed data, then save directly to your
              resume builder.
            </p>
          </div>
          <SaveButton />
        </div>

        {/* ── Info banner ── */}
        <div className="flex items-start gap-2.5 p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-800 text-[10px] sm:text-xs">
          <FiArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-indigo-500" />
          <p>
            After saving, you'll land on the{" "}
            <span className="font-semibold">Contact</span> step of the builder
            where you can continue editing each section with the full editor.
          </p>
        </div>

        {/* ── Contact ── */}
        <Section title="Contact Information" icon={<FiUser className="w-4 h-4" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Field label="First Name" value={contact.firstName} onChange={(v) => setC("firstName", v)} placeholder="John" />
            <Field label="Last Name" value={contact.lastName} onChange={(v) => setC("lastName", v)} placeholder="Doe" />
            <Field label="Job Title" value={contact.jobTitle ?? ""} onChange={(v) => setC("jobTitle", v)} placeholder="Full Stack Developer" />
            <Field label="Email" value={contact.email ?? ""} onChange={(v) => setC("email", v)} placeholder="john@example.com" type="email" />
            <Field label="Phone" value={contact.phone ?? ""} onChange={(v) => setC("phone", v)} placeholder="+91 98765 43210" />
            <Field label="City" value={contact.city} onChange={(v) => setC("city", v)} placeholder="Chennai" />
            <Field label="Country" value={contact.country} onChange={(v) => setC("country", v)} placeholder="India" />
            <Field label="LinkedIn URL" value={contact.linkedIn ?? ""} onChange={(v) => setC("linkedIn", v)} placeholder="https://linkedin.com/in/yourname" />
            <Field label="GitHub URL" value={contact.github ?? ""} onChange={(v) => setC("github", v)} placeholder="https://github.com/yourname" />
            <Field label="Portfolio URL" value={contact.portfolio} onChange={(v) => setC("portfolio", v)} placeholder="https://yourportfolio.com" />
          </div>
        </Section>

        {/* ── Experience ── */}
        <Section title="Work Experience" icon={<FiBriefcase className="w-4 h-4" />} badge={experiences.length}>
          <div className="space-y-4">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="border border-gray-100 rounded-lg p-3 sm:p-4 bg-gray-50/50 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">
                    Experience #{idx + 1}
                  </span>
                  <button onClick={() => removeExp(exp.id)} className="p-1 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Job Title" value={exp.jobTitle ?? ""} onChange={(v) => updateExp(exp.id, "jobTitle", v)} placeholder="Software Engineer" />
                  <Field label="Employer / Company" value={exp.employer ?? ""} onChange={(v) => updateExp(exp.id, "employer", v)} placeholder="Acme Corp" />
                  <Field label="Start Date" value={exp.startDate ?? ""} onChange={(v) => updateExp(exp.id, "startDate", v)} placeholder="Jan 2023" />
                  <Field label="End Date" value={exp.endDate ?? ""} onChange={(v) => updateExp(exp.id, "endDate", v)} placeholder="Present" />
                  <div className="sm:col-span-2">
                    <Field label="Location" value={exp.location ?? ""} onChange={(v) => updateExp(exp.id, "location", v)} placeholder="Chennai, India" />
                  </div>
                </div>
                <Field label="Description / Bullets" value={exp.text ?? ""} onChange={(v) => updateExp(exp.id, "text", v)} placeholder="• Built scalable APIs&#10;• Improved performance by 30%" textarea rows={4} />
              </div>
            ))}
            <button onClick={addExp} className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
              <FiPlus className="w-3.5 h-3.5" /> Add Experience
            </button>
          </div>
        </Section>

        {/* ── Education ── */}
        <Section title="Education" icon={<FiBook className="w-4 h-4" />} badge={educations.length}>
          <div className="space-y-4">
            {educations.map((edu, idx) => (
              <div key={edu.id} className="border border-gray-100 rounded-lg p-3 sm:p-4 bg-gray-50/50 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">
                    Education #{idx + 1}
                  </span>
                  <button onClick={() => removeEdu(edu.id)} className="p-1 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Degree" value={edu.degree} onChange={(v) => updateEdu(edu.id, "degree", v)} placeholder="B.E. Computer Science" />
                  <Field label="School / University" value={edu.schoolname} onChange={(v) => updateEdu(edu.id, "schoolname", v)} placeholder="MIT" />
                  <Field label="Start Date" value={edu.startDate ?? ""} onChange={(v) => updateEdu(edu.id, "startDate", v)} placeholder="09/2020" />
                  <Field label="End Date" value={edu.endDate ?? ""} onChange={(v) => updateEdu(edu.id, "endDate", v)} placeholder="05/2024" />
                  <Field label="Location" value={edu.location} onChange={(v) => updateEdu(edu.id, "location", v)} placeholder="Tamil Nadu, India" />
                  <Field label="Grade / CGPA" value={edu.grade ?? ""} onChange={(v) => updateEdu(edu.id, "grade", v)} placeholder="8.9 / 10" />
                </div>
                <Field label="Additional Notes" value={edu.text} onChange={(v) => updateEdu(edu.id, "text", v)} placeholder="Relevant coursework, achievements..." textarea rows={2} />
              </div>
            ))}
            <button onClick={addEdu} className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
              <FiPlus className="w-3.5 h-3.5" /> Add Education
            </button>
          </div>
        </Section>

        {/* ── Skills ── */}
        <Section title="Skills" icon={<FiStar className="w-4 h-4" />} badge={skills.length}>
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-1 bg-indigo-50 border border-indigo-100 rounded-full pl-3 pr-1 py-1">
                <input
                  value={skill.text ?? ""}
                  onChange={(e) => updateSkill(idx, e.target.value)}
                  className="bg-transparent text-xs text-indigo-800 font-medium outline-none w-24 sm:w-28"
                  placeholder="Skill name"
                />
                <button onClick={() => removeSkill(idx)} className="p-0.5 rounded-full hover:bg-indigo-200 text-indigo-400 hover:text-indigo-700 transition-colors">
                  <FiTrash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <button onClick={addSkill} className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
            <FiPlus className="w-3.5 h-3.5" /> Add Skill
          </button>
        </Section>

        {/* ── Projects ── */}
        <Section title="Projects" icon={<FiLayout className="w-4 h-4" />} badge={projects.length}>
          <div className="space-y-4">
            {projects.map((proj, idx) => (
              <div key={proj.id} className="border border-gray-100 rounded-lg p-3 sm:p-4 bg-gray-50/50 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">
                    Project #{idx + 1}
                  </span>
                  <button onClick={() => removeProj(proj.id)} className="p-1 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Project Title" value={proj.title ?? ""} onChange={(v) => updateProj(proj.id, "title", v)} placeholder="HRMS System" />
                  <Field
                    label="Tech Stack (comma-separated)"
                    value={(proj.techStack ?? []).join(", ")}
                    onChange={(v) => updateProj(proj.id, "techStack", v.split(",").map((t) => t.trim()).filter(Boolean))}
                    placeholder="React, Node.js, MongoDB"
                  />
                  <Field label="Live URL" value={proj.liveUrl ?? ""} onChange={(v) => updateProj(proj.id, "liveUrl", v)} placeholder="https://myproject.com" />
                  <Field label="GitHub URL" value={proj.githubUrl ?? ""} onChange={(v) => updateProj(proj.id, "githubUrl", v)} placeholder="https://github.com/..." />
                </div>
                <Field label="Description" value={proj.description ?? ""} onChange={(v) => updateProj(proj.id, "description", v)} placeholder="• Built a complete HRMS system..." textarea rows={3} />
              </div>
            ))}
            <button onClick={addProj} className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
              <FiPlus className="w-3.5 h-3.5" /> Add Project
            </button>
          </div>
        </Section>

        {/* ── Languages ── */}
        <Section title="Languages & More" icon={<FiMoreHorizontal className="w-4 h-4" />} defaultOpen={false} badge={(finalize.languages ?? []).length}>
          <div className="space-y-3">
            <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">
              Languages
            </p>
            {(finalize.languages ?? []).map((lang, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  value={lang.name}
                  onChange={(e) => updateLang(idx, "name", e.target.value)}
                  placeholder="English"
                  className="flex-1 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                />
                <input
                  value={String(lang.level ?? "")}
                  onChange={(e) => updateLang(idx, "level", e.target.value)}
                  placeholder="Advanced"
                  className="flex-1 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                />
                <button onClick={() => removeLang(idx)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button onClick={addLang} className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
              <FiPlus className="w-3.5 h-3.5" /> Add Language
            </button>
          </div>
        </Section>

        {/* ── Bottom Save ── */}
        <div className="flex justify-end pt-2 pb-1">
          <SaveButton bottom />
        </div>
      </div>
    </>
  );
};

export default EditResumeTab;