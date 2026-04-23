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
const formatExperienceDate = (
  year: string,
  isEndDate: boolean = false,
): string | undefined => {
  if (!year || year.toLowerCase() === "present") {
    return undefined;
  }

  const yearMatch = year.toString().match(/\d{4}/);
  if (!yearMatch) return undefined;

  const yearNum = parseInt(yearMatch[0]);
  if (isNaN(yearNum)) return undefined;

  if (isEndDate) {
    return `${yearNum}-12`;
  } else {
    const date = new Date(yearNum, 0, 1);
    return date.toISOString();
  }
};

// Convert bullets to HTML string
const formatBulletsToHTML = (bullets: string[]): string => {
  if (!bullets || bullets.length === 0) return "";
  return `<ul>${bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>`;
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
      _id: `temp_exp_${index}`,
      jobTitle: exp.position || "",
      employer: exp.company || "",
      location: exp.location || "",
      startDate: formatExperienceDate(exp.fromYear, false),
      endDate: exp.isOngoing
        ? undefined
        : formatExperienceDate(exp.toYear, true),
      text: formatBulletsToHTML(exp.bullets || exp.description),
      isOpen: false,
      showPicker: false,
      year: parseYearToNumber(exp.fromYear),
    })) || [];

  const educations =
    parsedData.education?.map((edu, index) => ({
      _id: `temp_edu_${index}`,
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


  const skills =
    parsedData.skills?.map((skill, index) => ({
      id: crypto.randomUUID(),
      name: skill.charAt(0).toUpperCase() + skill.slice(1),
    })) || [];

  const summary = parsedData.summary?.summary
    ? `<p>${parsedData.summary.summary}</p>`
    : "";

  const projects =
    parsedData.projects?.map((project, index) => ({
      _id: crypto.randomUUID(),
      title: `${project.title}`,
      description: formatBulletsToHTML(project.bullets || []),
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
    skills,
    summary,
    finalize,
    projects,
  };
};
