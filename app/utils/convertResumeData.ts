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
  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  return { firstName, lastName };
};

// Format date for Education (string | null | undefined)
const formatEducationDate = (year: string): string | null | undefined => {
  if (!year || year.toLowerCase() === 'present') {
    return null;
  }
  return `${year}-01-01T00:00:00.000Z`;
};

// Format date for Experience (string | undefined)
const formatExperienceDate = (year: string, isEndDate: boolean = false): string | undefined => {
  if (!year || year.toLowerCase() === 'present') {
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
  if (!bullets || bullets.length === 0) return '';
  return `<ul>${bullets.map(bullet => `<li>${bullet}</li>`).join('')}</ul>`;
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
  templateId: string = "1"
) => {
  const { firstName, lastName } = splitName(parsedData.header.name || '');
  
  // Extract LinkedIn username from URL
  const linkedInUsername = parsedData.header.link?.replace('linkedin.com/in/', '') || '';
  
  // Build contact object matching your Contact interface
  const contact = {
    contactId: '', // Empty for new resume
    firstName: firstName,
    lastName: lastName,
    jobTitle: parsedData.header.title || parsedData.experience?.[0]?.position || '',
    phone: parsedData.header.phone || '',
    email: parsedData.header.email || '',
    linkedin: linkedInUsername ? `https://linkedin.com/in/${linkedInUsername}` : '',
    portfolio: '',
    address: parsedData.header.location?.split(',')[0]?.trim() || '',
    city: parsedData.header.location?.split(',')[1]?.trim() || '',
    country: parsedData.header.location?.split(',')[2]?.trim() || '',
    postcode: parsedData.header.location?.split(',')[2]?.trim() || '',
    photo: undefined,
    croppedImage: null,
  };

  // Convert experiences matching your Experience interface
  const experiences = parsedData.experience?.map((exp, index) => ({
    id: `temp_exp_${index}`,
    jobTitle: exp.position || '',
    employer: exp.company || '',
    location: exp.location || '',
    startDate: formatExperienceDate(exp.fromYear, false),
    endDate: exp.isOngoing ? undefined : formatExperienceDate(exp.toYear, true),
    text: formatBulletsToHTML(exp.bullets || exp.description),
    isOpen: false,
    showPicker: false,
    year: parseYearToNumber(exp.fromYear),
  })) || [];

  // Convert education matching your Education interface
  const educations = parsedData.education?.map((edu, index) => ({
    id: `temp_edu_${index}`,
    schoolname: edu.institution || '',
    degree: edu.degree || '',
    location: edu.location || '',
    text: '',
    startDate: formatEducationDate(edu.fromYear),
    endDate: formatEducationDate(edu.toYear),
    isOpen: false,
    showPicker: false,
    year: parseYearToNumber(edu.fromYear),
  })) || [];

  // Convert skills matching your Skill interface
  const skills = parsedData.skills?.map((skill, index) => ({
    id: `temp_skill_${index}`,
    name: skill.charAt(0).toUpperCase() + skill.slice(1),
    level: 3, // Default level (1-4 scale, 3 is intermediate)
  })) || [];

  // Convert summary
  const summary = parsedData.summary?.summary 
    ? `<p>${parsedData.summary.summary}</p>`
    : '';

  // Convert projects to custom sections
  const projects = parsedData.projects?.map((project, index) => ({
    id: `temp_project_${index}`,
    name: `${project.title}`,
    description: formatBulletsToHTML(project.bullets || []),
    techStack:project.technologies || []
  })) || [];

  // Build finalize object matching your Finalize interface
  const finalize = {
    languages: parsedData.languages?.map((lang: any, index: number) => ({
      _id: `temp_lang_${index}`,
      name: lang.name || '',
      level: lang.level || 3,
    })) || [],
    certificationsAndLicenses: parsedData.certifications?.map((cert: any, index: number) => ({
      id: `temp_cert_${index}`,
      name: cert.name || cert.title || '',
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
    projects
  };
};