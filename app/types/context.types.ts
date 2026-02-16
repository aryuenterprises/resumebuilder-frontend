import { ComponentType } from "react";

export interface Contact {
  contactId: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  phone: string;
  email: string;
  linkedin: string;
  portfolio: string;
  address: string;
  city: string;
  country: string;
  postcode: string;
  photo?: string;
  croppedImage: string | null;
}
export interface Experience {
  id: number | string;
  jobTitle: string;
  employer: string;
  startDate: string;
  endDate: string;
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
  startDate: string | null | undefined;
  endDate: string | null | undefined;
  isOpen: boolean;
  showPicker: boolean;
  year: number;
  error?: Record<string, string>;
}
export interface Skill {
  id: string | number;
  level: number | null;
  skill: string;
  error?: Record<string, string>;
}
export interface Finalize {
  languages?: Array<{
    _id?: string;
    name: string;
    level?: string | number;
  }>;
  certificationsAndLicenses?: Array<{
    id?: string;
    name: string;
  }>;
  hobbiesAndInterests?: Array<{
    id?: string;
    name: string;
  }>;
  awardsAndHonors?: Array<{
    id?: string;
    name: string;
  }>;
  websitesAndSocialMedia?: Array<{
    id?: string;
    websiteUrl?: string;
    socialMedia?: string;
  }>;
  references?: Array<{
    id?: string;
    name: string;
  }>;
  customSection?: Array<{
    id?: string;
    name?: string;
    description?: string;
  }>;
}
export interface PlanDetails {
  id: string;
  name: string;
  price: number;
}

export interface Language {
  _id?: string;
  id?: string;
  name: string;
  level?: string; // Could be "1", "2", "3", "4" or "Basic", "Intermediate", etc.
}

export interface CertificationAndLicense {
  _id?: string;
  id?: string;
  name: string; // HTML string
  issueDate?: string;
  expiryDate?: string;
  issuingOrganization?: string;
}
export interface HobbyAndInterest {
  id?: string;
  name: string; // HTML string
}
export interface AwardAndHonor {
  id?: string;
  name: string; // HTML string
  date?: string;
  issuer?: string;
}
export interface WebsiteOrSocialMedia {
  id?: string;
  websiteUrl?: string;
  socialMedia?: string;
  platform?: string; // e.g., "GitHub", "Twitter", "Behance"
}
export interface CustomSection {
  id?: string;
  name: string;
  description: string; // HTML string
}

export interface Template {
  id: number;
  style: string;
  image: any;
  description: string;
  temp?: "free" | "paid";
  pic?: string;
  component?: ComponentType<any>;
}


export interface FullResumeData {
  template: Template | null;
  contact: Contact;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  summary: string;
  finalize: Finalize;
}

export interface CreateContextType {
  chosenTemplate: Template | null;
  setChosenTemplate: React.Dispatch<React.SetStateAction<Template | null>>;

  // contact
  contact: Contact;
  setContact: React.Dispatch<React.SetStateAction<Contact>>;

  // Experiences
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;

  // Education
  education: Education[];
  setEducation: React.Dispatch<React.SetStateAction<Education[]>>;

  // Skills
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;

  // summary
  summary: string;
  setSummary: (value: string) => void;

  finalize: Finalize;
  setFinalize: React.Dispatch<React.SetStateAction<Finalize>>;

  // Plans & User
  allplandetails: PlanDetails[];
  setAllplandetails: (value: PlanDetails[]) => void;
  allPlanStatusDetails: any;
  // Userdata: UserData | null;
  // setUserdata: (value: UserData | null) => void;
  accessdate: string;
  setAccessdate: (value: string) => void;
  currencysymbol: string;
  setCurrencySymbol: (value: string) => void;
  userdelete: boolean;
  setuserdelete: (value: boolean) => void;

  // Logo
  logoPreview: string | null;
  setLogoPreview: (value: string | null) => void;

fullResumeData: FullResumeData | null;
setFullResumeData: React.Dispatch<React.SetStateAction<FullResumeData | null>>;
}
