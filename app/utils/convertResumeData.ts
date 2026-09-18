interface ParsedExperience {
  position: string;
  company: string;
  location: string;
  fromYear: string;
  toYear: string;
  isOngoing: boolean;
  description: string[];
  bullets: string[];
}

interface ParsedProject {
  title: string;
  description: string;
  technologies: string[];
  bullets: string[];
}

interface ParsedEducation {
  degree: string;
  institution: string;
  location: string;
  fromYear: string;
  toYear: string;
}

interface ParsedHeader {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  link: string;
}

interface ParsedSummary {
  summary: string;
}

interface ParsedData {
  experience: ParsedExperience[];
  projects: ParsedProject[];
  education: ParsedEducation[];
  skills: string[];
  summary: ParsedSummary;
  header: ParsedHeader;
  certifications: any[];
  languages: any[];
}

// Split name into first and last name
const splitName = (fullName: string) => {
  const nameParts = fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";
  return { firstName, lastName };
};

// Format date for Experience (string | undefined)
// const formatExperienceDate = (
//   year: string,
//   isEndDate: boolean = false,
// ): string | undefined => {
//   if (!year || year.toLowerCase() === "present") {
//     return undefined;
//   }

//   const yearMatch = year.toString().match(/\d{4}/);
//   if (!yearMatch) return undefined;

//   const yearNum = parseInt(yearMatch[0]);
//   if (isNaN(yearNum)) return undefined;

//   if (isEndDate) {
//     return `${yearNum}-12`;
//   } else {
//     const date = new Date(yearNum, 0, 1);
//     return date.toISOString();
//   }
// };


const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

const formatExperienceDate = (
  year: string,
  isEndDate: boolean = false,
): string | undefined => {
  if (!year || year.toLowerCase().trim() === "present") {
    return undefined;
  }

  const str = year.toString().trim();

  // Extract 4-digit year
  const yearMatch = str.match(/\d{4}/);
  if (!yearMatch) return undefined;
  const yearNum = parseInt(yearMatch[0], 10);
  if (isNaN(yearNum)) return undefined;

  // Extract month from name like "Apr 2026"
  const monthNameMatch = str.match(/[A-Za-z]{3,}/);
  let monthNum: number | undefined;

  if (monthNameMatch) {
    const name = monthNameMatch[0].slice(0, 3).toLowerCase();
    if (name in MONTHS) monthNum = MONTHS[name];
  }

  // Fallback if no month name: numeric month, else Jan/Dec
  if (monthNum === undefined) {
    const numericMonthMatch = str.match(/\b(0?[1-9]|1[0-2])\b/);
    if (numericMonthMatch) {
      monthNum = parseInt(numericMonthMatch[1], 10) - 1;
    } else {
      monthNum = isEndDate ? 11 : 0;
    }
  }

  // Use UTC to avoid timezone shifting the date backward
  return new Date(Date.UTC(yearNum, monthNum, 1)).toISOString();
};


// Convert bullets to HTML string
const formatBulletsToHTML = (bullets: string[]): string => {
  if (!bullets || bullets.length === 0) return "";
  return `<ul>${bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>`;
};

// Format skills array to HTML string with bullet points
const formatSkillsToHTML = (skills: string[]): string => {
  if (!skills || skills.length === 0) return "";

  // Capitalize each skill and format as bullet list
  const formattedSkills = skills.map(
    (skill) => skill.charAt(0).toUpperCase() + skill.slice(1).toLowerCase(),
  );

  return `<ul>${formattedSkills.map((skill) => `<li>${skill}</li>`).join("")}</ul>`;
};

// Parse year to number for Experience
const parseYearToNumber = (yearString: string): number => {
  if (!yearString) return new Date().getFullYear();
  const yearMatch = yearString.toString().match(/\d{4}/);
  if (!yearMatch) return new Date().getFullYear();
  const year = parseInt(yearMatch[0]);
  return isNaN(year) ? new Date().getFullYear() : year;
};

// Main conversion function
export const convertParsedResumeToFrontendFormat = (
  parsedData: ParsedData,
  userId?: string,
  templateId: string = "1",
) => {

  console.log("parsedData",parsedData)


  
  const { firstName, lastName } = splitName(parsedData.header.name || "");

  const contact = {
    contactId: "", // Empty for new resume
    firstName: firstName,
    lastName: lastName,
    jobTitle:
      parsedData.header.title || parsedData.experience?.[0]?.position || "",
    phone: parsedData.header.phone || "",
    email: parsedData.header.email || "",
    linkedin: "",
    portfolio: "",
    address: parsedData.header.location?.split(",")[0]?.trim() || "",
    city: parsedData.header.location?.split(",")[1]?.trim() || "",
    country: parsedData.header.location?.split(",")[2]?.trim() || "",
    postcode: parsedData.header.location?.split(",")[2]?.trim() || "",
    photo: undefined,
    croppedImage: null,
  };

  const experiences =
    parsedData.experience?.map((exp, index) => ({
      id: `temp_exp_${index}`,
      jobTitle: exp.position || "",
      employer: exp.company || "",
      location: exp.location || "",
      startDate: formatExperienceDate(exp.fromYear, false),
      endDate: exp.isOngoing
        ? "Present"
        : formatExperienceDate(exp.toYear, true),
      text: formatBulletsToHTML(exp.bullets || exp.description),
      isOpen: false,
      showPicker: false,
      year: parseYearToNumber(exp.fromYear),
    })) || [];

  const educations =
    parsedData.education?.map((edu, index) => ({
      id: `temp_edu_${index}`,
      schoolname: edu.institution || "",
      degree: edu.degree || "",
      location: edu.location || "",
      text: "",
      startDate: edu.fromYear,
      endDate: edu.toYear,
      isOpen: false,
      showPicker: false,
      year: parseYearToNumber(edu.fromYear),
    })) || [];

  // Convert skills array to object with text property (HTML format)
  const skills = {
    text: formatSkillsToHTML(parsedData.skills || []),
  };

  const summary = parsedData.summary?.summary
    ? `<p>${parsedData.summary.summary}</p>`
    : "";

  const projects =
    parsedData.projects?.map((project, index) => ({
      id: crypto.randomUUID(),
      title: `${project.title}`,
      // description: formatBulletsToHTML(project.bullets || []),
      description: project.description || "",

      techStack: project.technologies || [],
    })) || [];

  const finalize = {
    languages:
      parsedData.languages?.map((lang: any, index: number) => ({
        _id: `temp_lang_${index}`,
        name: lang || "",
      })) || [],
    certificationsAndLicenses:
      parsedData.certifications?.map((cert: any, index: number) => ({
        id: `temp_cert_${index}`,
        name: cert.name || cert.title || "",
      })) || [],
    hobbiesAndInterests: [],
    awardsAndHonors: [],
    websitesAndSocialMedia: [],
    references: [],
  };

  return {
    contact,
    experiences,
    educations,
    skills, // Now returns { text: "HTML string" }
    summary,
    finalize,
    projects,
  };
};
