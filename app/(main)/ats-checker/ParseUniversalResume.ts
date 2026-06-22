/**
 * Universal Resume Markdown Parser
 * Handles multiple resume formats from ATS API
 * 
 * Works with:
 * - Markdown with bold/italic
 * - Plain text with custom separators (|, ~, dash)
 * - Different heading levels (##, ###, bold, plain)
 * - Emojis and icons (ignored)
 * - Inconsistent bullet formats (-, *, •, +)
 * - Different date formats
 */

export interface ParsedResume {
  contact: Contact;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  finalize: Finalize;
}

export interface Contact {
  firstName: string;
  lastName: string;
  jobTitle?: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  linkedIn: string;
  github: string;
  portfolio: string;
  address: string;
  postCode?: string;
  croppedImage: null;
}

export interface Experience {
  id: string | number;
  jobTitle: string;
  employer: string;
  startDate: string;
  endDate: string;
  isCurrentlyWorking: boolean;
  text: string;
  location: string;
  isOpen: boolean;
  showPicker: boolean;
  year: number;
}

export interface Education {
  id: string | number;
  schoolname: string;
  degree: string;
  location: string;
  text: string;
  startDate: string | null;
  endDate: string | null;
  grade?: string;
  isCurrentlyStudying: boolean;
  isOpen: boolean;
  showPicker: boolean;
  year: number;
}

export interface Skill {
  text: string;
}

export interface Project {
  id: string | number;
  title: string;
  techStack: string[];
  description: string;
  liveUrl: string;
  githubUrl: string;
  isOpen: boolean;
}

export interface Finalize {
  languages?: Array<{ name: string; level?: string }>;
  certificationsAndLicenses?: Array<{ name: string }>;
  hobbiesAndInterests?: Array<{ name: string }>;
  awardsAndHonors?: Array<{ name: string }>;
  websitesAndSocialMedia?: Array<{ websiteUrl?: string; socialMedia?: string }>;
  references?: Array<{ name: string }>;
  customSection?: Array<{ name?: string; description?: string }>;
}

// ─── Utility Functions ────────────────────────────────────────────────────
/**
 * Strip all markdown + emojis + icons
 */
function stripMarkdown(text: string): string {
  return text
    .replace(/[*_`~]/g, "")            // markdown
    .replace(/\[right\]/gi, "")         // ATS artifact
    .replace(/^#+\s*/gm, "")            // heading hashes
    .replace(/[-*•+]\s+/g, "")          // bullets
    .replace(/[^\x00-\x7F]/g, "")       // emoji/icons
    .replace(/^\s*\|?\s*/gm, "")        // pipes
    .replace(/\s+/g, " ")               // normalize spaces
    .trim();
}

/**
 * Clean and normalize text for comparison
 */
function normalizeText(text: string): string {
  return stripMarkdown(text).toLowerCase();
}

/**
 * Check if line is a section heading
 */
function isSectionHeading(line: string): boolean {
  const normalized = normalizeText(line);
  return /^(work experience|experience|professional experience|employment|education|skills|projects|languages|certifications|contact|summary|technical|technical stack|profile|objective|interests|hobbies|awards)/.test(
    normalized
  );
}

/**
 * Identify section type from heading
 */
function identifySection(line: string): string | null {
  const norm = normalizeText(line);

  if (/experience|employment|work|jobs/.test(norm)) return "experience";
  if (/education|academic|qualification|study/.test(norm)) return "education";
  if (/skill|technical|tech stack|languages|programming|tools/.test(norm)) return "skills";
  if (/project|portfolio/.test(norm)) return "projects";
  if (/contact|phone|email|address|professional/.test(norm)) return "contact";
  if (/summary|objective|profile/.test(norm)) return "summary";
  if (/language|lingua/.test(norm)) return "languages";
  if (/certification|license|award|honor/.test(norm)) return "certifications";

  return null;
}

/**
 * Extract data from a line — handles multiple formats
 */
function extractFieldFromLine(
  line: string,
  fieldType: "email" | "phone" | "url" | "date" | "name"
): string | null {
  const stripped = stripMarkdown(line);

  switch (fieldType) {
    case "email":
      const emailMatch = stripped.match(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i);
      return emailMatch?.[0] ?? null;

    case "phone":
      const phoneMatch = stripped.match(/\+?\d[\d\s()+-]{6,18}\d/);
      return phoneMatch?.[0]?.trim() ?? null;

    case "url":
      const urlMatch = stripped.match(/https?:\/\/[^\s]+|(?:www\.)?[\w.-]+\.(?:com|io|dev|app|netlify|vercel)/i);
      return urlMatch?.[0] ?? null;

    case "date":
      // Matches: "Jan 2023", "2023 – 2024", "09/2021"
      const dateMatch = stripped.match(
        /(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|june|july|august|september|october|november|december)?\s*\d{1,2}?[/-]?\d{1,2}?[-–/]?\d{2,4}|\d{4}\s*[-–]\s*\d{4}|\d{1,2}\/\d{1,2}\/\d{4}|present|current/i
      );
      return dateMatch?.[0] ?? null;

    case "name":
      // Simple name extraction — first 2-4 words that aren't keywords
      const words = stripped
        .split(/\s+/)
        .filter((w) => w.length > 1 && !/^(the|and|or|by|at|in|on|for)$/i.test(w))
        .slice(0, 4);
      return words.length > 0 ? words.join(" ") : null;

    default:
      return null;
  }
}

/**
 * Parse date range from text
 * Handles: "Jan 2023", "Jan 2023 – Dec 2024", "09/2021 – Present", etc.
 */
function parseDateRange(text: string): { start: string; end: string } {
  const stripped = stripMarkdown(text);

  // Pattern: "Word 2024 – Word 2024" or "2024 – 2024"
  const rangeMatch = stripped.match(
    /([A-Za-z]*\s*\d{1,2}?[/-]?\d{1,2}?[-–/]?\d{2,4}|\d{4})\s*[-–—]\s*(present|current|[A-Za-z]*\s*\d{1,2}?[/-]?\d{1,2}?[-–/]?\d{2,4}|\d{4})/i
  );

  if (rangeMatch) {
    return {
      start: rangeMatch[1].trim(),
      end: rangeMatch[2].trim(),
    };
  }

  // Single date only
  const singleMatch = stripped.match(
    /[A-Za-z]*\s*\d{1,2}?[/-]?\d{1,2}?[-–/]?\d{2,4}|\d{4}/i
  );
  if (singleMatch) {
    return { start: singleMatch[0].trim(), end: "" };
  }

  return { start: "", end: "" };
}

/**
 * Check if line is a bullet point
 */
function isBullet(line: string): boolean {
  return /^[-*•+]\s/.test(line.trim());
}

/**
 * Check if line contains markdown bold/italic (job title, company, school indicators)
 */
function hasBoldOrItalic(line: string): boolean {
  return /\*\*[^*]+\*\*|\*[^*]+\*|__[^_]+__|_[^_]+_/.test(line);
}

/**
 * Split contact info line by multiple separators
 */
function splitContactLine(line: string): string[] {
  const stripped = stripMarkdown(line);
  return stripped
    .split(/[|~•,;]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1);
}

// ─── Main Parser ──────────────────────────────────────────────────────────

export function parseUniversalResume(rawText: string): ParsedResume {
  const lines = rawText.split("\n").map((l) => l.trimEnd());

  // ── Bucket lines by section ────────────────────────────────────────────
  type Bucket = { key: string; lines: string[] };
  const buckets: Bucket[] = [];
  let currentSection = "preamble";
  let currentLines: string[] = [];

  for (const line of lines) {
    if (isSectionHeading(line)) {
      const sectionKey = identifySection(line);
      if (sectionKey && sectionKey !== currentSection) {
        buckets.push({ key: currentSection, lines: currentLines });
        currentSection = sectionKey;
        currentLines = [];
        continue;
      }
    }
    currentLines.push(line);
  }
  buckets.push({ key: currentSection, lines: currentLines });

  const getSection = (key: string): string[] =>
    buckets.find((b) => b.key === key)?.lines ?? [];

  // ────────────────────────────────────────────────────────────────────────
  // CONTACT INFORMATION
  // ────────────────────────────────────────────────────────────────────────

  const preambleLines = getSection("preamble");
  const preambleText = preambleLines.join(" ");

  // Name: first non-keyword, 2-4 word phrase
  let firstName = "John";
  let lastName = "Doe";
  const possibleNames = preambleLines
    .map((l) => extractFieldFromLine(l, "name"))
    .filter(Boolean);
  if (possibleNames.length > 0) {
    const fullName = possibleNames[0]!.split(/\s+/);
    firstName = fullName[0] || "John";
    lastName = fullName.slice(1).join(" ") || "Doe";
  }

  // Job title: line with role keywords
  const jobTitleLine = preambleLines.find((l) =>
    /developer|engineer|designer|manager|analyst|architect|specialist|consultant|scientist|lead|associate|senior|junior|director|coordinator|officer|executive|administrator/.test(
      normalizeText(l)
    )
  );
  const jobTitle = jobTitleLine ? stripMarkdown(jobTitleLine) : "";

  // Contact fields
  const emailMatch = preambleText.match(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i);
  const phoneMatch = preambleText.match(/\+?\d[\d\s()+-]{6,18}\d/);
  const linkedInMatch = preambleText.match(/linkedin\.com\/in\/[\w-]+/i);
  const githubMatch = preambleText.match(/github\.com\/[\w-]+/i);
  const portfolioMatch = preambleText.match(
    /(?!linkedin|github)([\w-]+\.(?:netlify\.app|vercel\.app|com|io|dev|net))/i
  );

  // Location: "City, Country" pattern
  let city = "";
  let country = "";
  const locationMatch = preambleText.match(
    /([A-Za-z][A-Za-z\s]{1,15}),\s*([A-Za-z][A-Za-z\s]{1,15})(?:\s|,|$)/
  );
  if (locationMatch) {
    city = locationMatch[1].trim();
    country = locationMatch[2].trim();
  }

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

  // ────────────────────────────────────────────────────────────────────────
  // EXPERIENCE
  // ────────────────────────────────────────────────────────────────────────

  const expLines = getSection("experience");
  const experiences: Experience[] = [];
  let currentExp: Partial<Experience> | null = null;
  let expBullets: string[] = [];
  const expBulletsSeen = new Set<string>();

  const flushExp = () => {
    if (currentExp && currentExp.jobTitle) {
      currentExp.text = expBullets.join("\n");
      currentExp.isOpen = false;
      currentExp.showPicker = false;
      currentExp.year = new Date().getFullYear();
      experiences.push(currentExp as Experience);
      expBullets = [];
      expBulletsSeen.clear();
      currentExp = null;
    }
  };

  for (const line of expLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const stripped = stripMarkdown(trimmed);
    if (!stripped) continue;

    // Bold/italic line = job title + date
    if (hasBoldOrItalic(trimmed) && !isBullet(trimmed)) {
      flushExp();

      const dateRange = parseDateRange(stripped);
      const titlePart = stripped
        .replace(dateRange.start, "")
        .replace(dateRange.end, "")
        .replace(/[-–]\s*/, "")
        .trim();

      currentExp = {
        id: Date.now() + Math.random(),
        jobTitle: titlePart || stripped.split(/\s+/).slice(0, 5).join(" "),
        employer: "",
        startDate: dateRange.start,
        endDate: dateRange.end,
        isCurrentlyWorking: /present|current/i.test(dateRange.end),
        text: "",
        location: "",
        isOpen: false,
        showPicker: false,
        year: new Date().getFullYear(),
      };
      continue;
    }

    // Company/location line (usually on next line after job title)
    if (currentExp && !currentExp.employer && hasBoldOrItalic(trimmed)) {
      const parts = splitContactLine(trimmed);
      currentExp.employer = parts[0] ?? "";
      currentExp.location = parts[1] ?? "";
      continue;
    }

    // Bullet lines
    if (isBullet(trimmed) && currentExp) {
      const bullet = stripped;
      if (bullet.length > 5 && !expBulletsSeen.has(bullet)) {
        expBulletsSeen.add(bullet);
        expBullets.push(bullet);
      }
      continue;
    }

    // Fallback: any non-bullet line with date info
    if (!isBullet(trimmed) && currentExp && !currentExp.startDate) {
      const dateRange = parseDateRange(stripped);
      if (dateRange.start) {
        currentExp.startDate = dateRange.start;
        currentExp.endDate = dateRange.end;
      }
    }
  }
  flushExp();

  // ────────────────────────────────────────────────────────────────────────
  // EDUCATION
  // ────────────────────────────────────────────────────────────────────────

  const eduLines = getSection("education");
  const educations: Education[] = [];
  let currentEdu: Partial<Education> | null = null;

  const flushEdu = () => {
    if (currentEdu && currentEdu.schoolname) {
      currentEdu.isOpen = false;
      currentEdu.showPicker = false;
      currentEdu.year = new Date().getFullYear();
      currentEdu.text = currentEdu.text ?? "";
      educations.push(currentEdu as Education);
      currentEdu = null;
    }
  };

  for (const line of eduLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const stripped = stripMarkdown(trimmed);
    if (!stripped) continue;

    // School name (usually bold or first line)
    if (hasBoldOrItalic(trimmed) && !isBullet(trimmed)) {
      flushEdu();

      const parts = splitContactLine(trimmed);
      currentEdu = {
        id: Date.now() + Math.random(),
        schoolname: parts[0] ?? "",
        location: parts[1] ?? "",
        degree: "",
        text: "",
        startDate: null,
        endDate: null,
        isCurrentlyStudying: false,
        isOpen: false,
        showPicker: false,
        year: new Date().getFullYear(),
      };
      continue;
    }

    // Degree + dates + CGPA
    if (currentEdu && !currentEdu.degree) {
      // Extract degree (usually starts with B. or M.)
      const degreeMatch = stripped.match(
        /(?:b\.?(?:tech|e|sc|a|com)?|m\.?(?:tech|ca|sc|a|com)?|bachelor|master|diploma|associate|phd|bba)[^–\d]*/i
      );
      if (degreeMatch) {
        currentEdu.degree = degreeMatch[0].trim();
      }

      // Extract dates
      const dateRange = parseDateRange(stripped);
      if (dateRange.start) {
        currentEdu.startDate = dateRange.start;
        currentEdu.endDate = dateRange.end;
      }

      // Extract CGPA
      const cgpaMatch = stripped.match(/(?:cgpa|gpa)[:\s]*([0-9.]+)/i);
      if (cgpaMatch) currentEdu.grade = cgpaMatch[1];
    }
  }
  flushEdu();

  // ────────────────────────────────────────────────────────────────────────
  // SKILLS
  // ────────────────────────────────────────────────────────────────────────

  const skillLines = getSection("skills");
  const skills: Skill[] = [];
  const skillsSeen = new Set<string>();

  for (const line of skillLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const stripped = stripMarkdown(trimmed);
    if (!stripped || stripped.length < 2) continue;

    // Remove category label: "Category: item1, item2"
    const skillsPart = stripped
      .replace(/^[^:]+:\s*/, "")
      .replace(/icons?|icon/gi, "")
      .trim();

    if (!skillsPart) continue;

    // Split by comma or other separators
    const items = skillsPart
      .split(/[,;/|]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 1 && !/^\d+$/.test(s));

    for (const item of items) {
      const key = item.toLowerCase();
      if (!skillsSeen.has(key)) {
        skillsSeen.add(key);
        skills.push({ text: item });
      }
    }
  }

  // ────────────────────────────────────────────────────────────────────────
  // PROJECTS
  // ────────────────────────────────────────────────────────────────────────

  const projLines = getSection("projects");
  const projects: Project[] = [];
  let currentProj: Partial<Project> | null = null;
  let projBullets: string[] = [];
  const projBulletsSeen = new Set<string>();

  const flushProj = () => {
    if (currentProj && currentProj.title) {
      currentProj.description = projBullets.join("\n");
      currentProj.isOpen = false;
      projects.push(currentProj as Project);
      projBullets = [];
      projBulletsSeen.clear();
      currentProj = null;
    }
  };

  for (const line of projLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const stripped = stripMarkdown(trimmed);
    if (!stripped) continue;

    // Bold line = project title (with optional tech/url)
    if (hasBoldOrItalic(trimmed) && !isBullet(trimmed)) {
      flushProj();

      const parts = splitContactLine(trimmed);
      const title = parts[0] ?? "";

      // Tech stack: part that's not a URL and not the title
      const techPart = parts.find(
        (p) => p !== title && !/https?:\/\/|www\./.test(p)
      );
      const techStack = techPart
        ? techPart
            .split(/[,;]/)
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

      // URLs
      const urls = parts.filter(
        (p) => /https?:\/\/|www\.|\.com|\.io/.test(p)
      );

      currentProj = {
        id: Date.now() + Math.random(),
        title,
        techStack,
        liveUrl: urls[0] ?? "",
        githubUrl: "",
        description: "",
        isOpen: false,
      };
      continue;
    }

    // Bullets
    if (isBullet(trimmed) && currentProj) {
      const bullet = stripped;
      const urlMatch = bullet.match(/https?:\/\/[^\s]+/);

      if (urlMatch) {
        if (/github/i.test(bullet)) currentProj.githubUrl = urlMatch[0];
        else if (!currentProj.liveUrl) currentProj.liveUrl = urlMatch[0];
      } else if (!projBulletsSeen.has(bullet)) {
        projBulletsSeen.add(bullet);
        projBullets.push(bullet);
      }
    }
  }
  flushProj();

  // ────────────────────────────────────────────────────────────────────────
  // LANGUAGES & FINALIZE
  // ────────────────────────────────────────────────────────────────────────

  const langLines = getSection("languages");
  const languages: Finalize["languages"] = [];

  for (const line of langLines) {
    const stripped = stripMarkdown(line.trim());
    if (!stripped || /language|lingua/i.test(stripped)) continue;

    const parts = stripped.split(/[-–,;:|]/).map((p) => p.trim()).filter(Boolean);
    if (parts.length >= 1) {
      languages.push({
        name: parts[0],
        level: parts[1] ?? "",
      });
    }
  }

  const finalize: Finalize = {
    languages: languages.length > 0 ? languages : undefined,
    certificationsAndLicenses: [],
    hobbiesAndInterests: [],
    awardsAndHonors: [],
    websitesAndSocialMedia: [],
    references: [],
    customSection: [],
  };

  return { contact, experiences, educations, skills, projects, finalize };
}