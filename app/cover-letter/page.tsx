"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import {
  Upload,
  FileText,
  Award,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
  Star,
  Target,
  Zap,
  Shield,
  Sparkles,
  ChevronRight,
  Clock,
  FileCheck,
  Brain,
  Rocket,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  Download,
  Share2,
  BookmarkPlus,
  Info,
  ChevronDown,
  Eye,
  ArrowRight,
  Globe,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Calendar,
  Edit3,
  Plus,
  Save,
  Printer,
  DownloadCloud,
  UploadCloud,
  Share,
  Star as StarIcon,
  Settings2,
  UserPlus,
  Zap as ZapIcon,
  Code,
  Palette,
  Layout,
  Monitor,
  Smartphone,
  Tablet,
  Moon,
  Sun,
  Check,
  ExternalLink,
  Layers,
  Grid3x3,
  AlignLeft,
  Medal,
  Trophy,
  BookOpen,
  Users as UsersIcon,
  Heart,
  Menu,
  X as XIcon,
  Wand2,
  UserCircle,
  AtSign,
  PhoneCall,
  MapPinned,
} from "lucide-react";
import axios from "axios";

// Types for parsed CV data
interface ParsedCVData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    address?: string;
    summary: string;
    photo?: string;
  };
  coreCompetencies: {
    technical: string[];
    leadership: string[];
    domainExpertise: string[];
  };
  experience: Array<{
    id: string;
    title: string;
    company: string;
    period: string;
    description: string[];
    achievements: string[];
    link?: string;
    isPresent?: boolean;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    period?: string;
    description?: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    category: string;
    level?: "beginner" | "intermediate" | "advanced" | "expert";
  }>;
  additionalCredentials: {
    certifications: string[];
    languages: string[];
    awards: string[];
  };
  raw?: string;
}

// Template types
type TemplateStyle = "modern" | "professional" | "creative" | "minimal";
type ColorScheme = "red" | "blue" | "green" | "purple" | "orange" | "black";
const colorSchemes = {
  red: { primary: "#c40116", secondary: "#be0117", accent: "#e63545", light: "#fee2e2" },
  blue: { primary: "#2563eb", secondary: "#1d4ed8", accent: "#3b82f6", light: "#dbeafe" },
  green: { primary: "#059669", secondary: "#047857", accent: "#10b981", light: "#d1fae5" },
  purple: { primary: "#7c3aed", secondary: "#6d28d9", accent: "#8b5cf6", light: "#ede9fe" },
  orange: { primary: "#ea580c", secondary: "#c2410c", accent: "#f97316", light: "#ffedd5" },
  black: { primary: "#000000", secondary: "#1a1a1a", accent: "#333333", light: "#f5f5f5" },
};
// Custom parser for the specific API response format
const parseCVText = (text: string): ParsedCVData => {

  console.log("text",text)

  const lines = text.split('\n').map(line => line.trim());
  
  console.log("lines",lines)

  const data: ParsedCVData = {
    personalInfo: {
      fullName: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      address: "",
      summary: "",
    },
    coreCompetencies: {
      technical: [],
      leadership: [],
      domainExpertise: [],
    },
    experience: [],
    education: [],
    skills: [],
    additionalCredentials: {
      certifications: [],
      languages: [],
      awards: [],
    },
    raw: text,
  };

  let currentSection = "";
  let currentExperience: any = null;
  let currentCompetencyType = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Parse personal info from the top section
    if (i === 0 && line && !line.includes('**') && !line.includes('•')) {
      data.personalInfo.fullName = line;
    }
    else if (i === 1 && line && !line.includes('**') && !line.includes('•') && !line.includes('@')) {
      data.personalInfo.title = line;
    }
    else if (line.includes('@') && line.includes('.')) {
      data.personalInfo.email = line;
    }
    else if (line.match(/\(\d{3}\) \d{3}-\d{4}|\d{3}-\d{3}-\d{4}/)) {
      data.personalInfo.phone = line;
    }
    else if (line.includes('Street') || line.includes('Avenue') || line.includes('Road') || line.includes('Lane')) {
      data.personalInfo.address = line;
      // Extract location from address
      const locationMatch = line.match(/,?\s*([^,]+(?:,\s*[A-Z]{2})?)/);
      if (locationMatch) {
        data.personalInfo.location = locationMatch[1].trim();
      }
    }

    // Section detection
    if (line === "**PROFESSIONAL SUMMARY**" || line === "PROFESSIONAL SUMMARY") {
      currentSection = "summary";
      continue;
    }
    else if (line === "**CORE COMPETENCIES**" || line === "CORE COMPETENCIES") {
      currentSection = "competencies";
      continue;
    }
    else if (line === "**PROFESSIONAL EXPERIENCE**" || line === "PROFESSIONAL EXPERIENCE") {
      currentSection = "experience";
      continue;
    }
    else if (line === "**EDUCATION**" || line === "EDUCATION") {
      currentSection = "education";
      continue;
    }
    else if (line === "**TECHNICAL SKILLS**" || line === "TECHNICAL SKILLS" || line === "KEY SKILLS") {
      currentSection = "skills";
      continue;
    }
    else if (line === "**ADDITIONAL INFORMATION**" || line === "ADDITIONAL CREDENTIALS") {
      currentSection = "credentials";
      continue;
    }

    // Competency type detection
    if (line === "**Technical**" || line === "Technical") {
      currentCompetencyType = "technical";
      continue;
    }
    else if (line === "**Leadership**" || line === "Leadership") {
      currentCompetencyType = "leadership";
      continue;
    }
    else if (line === "**Domain Expertise**" || line === "Domain Expertise") {
      currentCompetencyType = "domainExpertise";
      continue;
    }

    // Summary section
    if (currentSection === "summary" && line && !line.startsWith('**')) {
      data.personalInfo.summary += (data.personalInfo.summary ? " " : "") + line;
    }

    // Competencies section
    if (currentSection === "competencies" && line.startsWith('•')) {
      const competency = line.replace('•', '').trim();
      if (currentCompetencyType) {
        switch (currentCompetencyType) {
          case "technical":
            data.coreCompetencies.technical.push(competency);
            break;
          case "leadership":
            data.coreCompetencies.leadership.push(competency);
            break;
          case "domainExpertise":
            data.coreCompetencies.domainExpertise.push(competency);
            break;
        }
      }
    }

    // Experience section
    if (currentSection === "experience") {
      // Check for job title (bolded text)
      if (line.startsWith('**') && line.endsWith('**') && !line.includes('•')) {
        if (currentExperience) {
          data.experience.push(currentExperience);
        }
        currentExperience = {
          id: Date.now() + Math.random().toString(),
          title: line.replace(/\*\*/g, '').trim(),
          company: "",
          period: "",
          description: [],
          achievements: [],
        };
      }
      // Company and period
      else if (currentExperience && line.includes(',')) {
        const parts = line.split(',').map(s => s.trim());
        if (parts.length >= 2) {
          currentExperience.company = parts[0];
          currentExperience.period = parts.slice(1).join(', ');
          currentExperience.isPresent = currentExperience.period.includes('Present');
        }
      }
      // Achievements (bullet points)
      else if (currentExperience && line.startsWith('•')) {
        currentExperience.achievements.push(line.replace('•', '').trim());
      }
      // Description (non-bullet text)
      else if (currentExperience && line && !line.startsWith('•') && !line.startsWith('**')) {
        currentExperience.description.push(line);
      }
    }

    // Skills section
    if (currentSection === "skills" && line && !line.startsWith('**')) {
      // Handle comma-separated skills
      if (line.includes(',')) {
        const skills = line.split(',').map(s => s.trim()).filter(s => s);
        skills.forEach(skill => {
          if (skill && !skill.startsWith('•')) {
            data.skills.push({
              id: Date.now() + Math.random().toString(),
              name: skill,
              category: "technical",
            });
          }
        });
      }
      // Handle bullet-point skills
      else if (line.startsWith('•')) {
        const skill = line.replace('•', '').trim();
        if (skill) {
          data.skills.push({
            id: Date.now() + Math.random().toString(),
            name: skill,
            category: "technical",
          });
        }
      }
    }

    // Education section
    if (currentSection === "education" && line && !line.startsWith('**')) {
      if (line.includes(',')) {
        const parts = line.split(',').map(s => s.trim());
        if (parts.length >= 2) {
          data.education.push({
            id: Date.now() + Math.random().toString(),
            degree: parts[0],
            institution: parts.slice(1, -1).join(', '),
            period: parts[parts.length - 1],
          });
        }
      }
    }

    // Additional Credentials
    if (currentSection === "credentials") {
      if (line.toLowerCase().includes('language')) {
        const langs = line.replace(/language[s]?:/i, '').trim();
        if (langs && langs !== 'None' && langs !== 'none') {
          data.additionalCredentials.languages = langs.split(',').map(l => l.trim());
        }
      } else if (line.toLowerCase().includes('certification')) {
        const certs = line.replace(/certification[s]?:/i, '').trim();
        if (certs && certs !== 'None' && certs !== 'none') {
          data.additionalCredentials.certifications = certs.split(',').map(c => c.trim());
        }
      } else if (line.toLowerCase().includes('award')) {
        const awards = line.replace(/award[s]?:/i, '').trim();
        if (awards && awards !== 'None' && awards !== 'none') {
          data.additionalCredentials.awards = awards.split(',').map(a => a.trim());
        }
      }
    }
  }

  // Push last experience
  if (currentExperience) {
    data.experience.push(currentExperience);
  }

  // Remove duplicates from skills
  data.skills = data.skills.filter((skill, index, self) =>
    index === self.findIndex(s => s.name.toLowerCase() === skill.name.toLowerCase())
  );

  // Clean up summary (remove any remaining markdown)
  data.personalInfo.summary = data.personalInfo.summary.replace(/\*\*/g, '').trim();

  return data;
};

// Experience Card Component
const ExperienceCard = ({ exp, colorScheme }: { exp: any; colorScheme: ColorScheme }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{exp.title}</h3>
            <p className="text-sm" style={{ color: colorSchemes[colorScheme].primary }}>
              {exp.company}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {exp.period}
            </span>
            {exp.link && (
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>
            )}
          </div>
        </div>

        {exp.description.length > 0 && (
          <p className="text-sm text-gray-600 mb-4">{exp.description[0]}</p>
        )}

        {exp.achievements.length > 0 && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-sm font-medium"
              style={{ color: colorSchemes[colorScheme].primary }}
            >
              {isExpanded ? "Show less" : "Show achievements"}
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 space-y-2"
                >
                  {exp.achievements.map((achievement: string, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
                      <span>{achievement}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.div>
  );
};

// Main Component
const CVGeneratorPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [cvData, setCvData] = useState<ParsedCVData | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [activeStep, setActiveStep] = useState<"upload" | "preview" | "download">("upload");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateStyle>("modern");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("red");
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [darkMode, setDarkMode] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "docx" | "txt">("pdf");
  const [exporting, setExporting] = useState(false);
  const [rawText, setRawText] = useState("");

  // Handle file upload
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
    if (
      droppedFile &&
      (droppedFile.type === "application/pdf" ||
        droppedFile.type === "application/msword" ||
        droppedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        droppedFile.type === "text/plain")
    ) {
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
    setCvData(null);
    setRawText("");
    setActiveStep("upload");
  };

  // Process resume data
  const processResume = async () => {
    if (!file) return;

    setUploading(true);
    setProcessing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `https://ai.aryuacademy.com/api/v1/resume/cv/generate-from-file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Response:", response.data.data.cv_content);
      
      // Get the cv_content from the response
      const cvContent = response.data.data.cv_content;
      setRawText(cvContent);
      
      // Parse the text data
      const parsed = parseCVText(cvContent);
      console.log("Parsed CV Data:", parsed);
      
      setCvData(parsed);
      setActiveStep("preview");
      
    } catch (error) {
      console.error("Error processing resume:", error);
    } finally {
      setUploading(false);
      setProcessing(false);
    }
  };

  // Use mock data for demo/testing
  const loadMockData = () => {
    const mockText = `Abdul Rahman
React Developer

123 Main Street, Anytown, USA 12345
(638) 238-1862
abdulrahman.mm124@gmail.com

**PROFESSIONAL SUMMARY**
As a seasoned senior React Developer with 8+ years of experience in crafting high-performance, visually stunning web applications, I excel in delivering cutting-edge user experiences that drive business results. With a strong foundation in React, Next.js, Tailwind CSS, and GSAP, I have a proven track record of implementing responsive layouts, reusable components, and optimized animations that enhance user engagement. My expertise lies in developing scalable and maintainable codebases that meet the evolving needs of modern web applications. With a passion for innovation and a commitment to excellence, I am poised to drive technological advancements in the industry as a Senior React Developer.

**CORE COMPETENCIES**

**Technical**
• React
• Next.js
• Tailwind CSS
• GSAP
• JavaScript
• HTML/CSS
• Git

**Leadership**
• Team Collaboration
• Project Management
• Code Review and Optimization
• Technical Leadership

**Domain Expertise**
• Web Development
• Front-end Development
• User Experience (UX)
• User Interface (UI)

**PROFESSIONAL EXPERIENCE**

**Senior React Developer**
Modular UI Components with Tailwind CSS, May 2025 - Present
• Implemented high-performance GSAP animations, resulting in a 30% increase in user engagement.
• Optimized rendering of complex components, reducing page load time by 25%.
• Developed reusable UI components, reducing code duplication by 40%.
• Collaborated with cross-functional teams to design and implement a modern, responsive UI framework.
• Mentored junior developers in React best practices and coding standards.

**React Developer**
WP WEBSITE FIX, October 2024 - April 2025
• Designed and developed a modern service-based platform built with Next.js, showcasing a 50% increase in website traffic.
• Implemented responsive layouts and reusable components, resulting in a 25% reduction in development time.
• Optimized animations and transitions, enhancing the overall user experience by 30%.
• Collaborated with the design team to create a visually stunning UI, resulting in a 20% increase in user engagement.
• Participated in code reviews and ensured adherence to coding standards and best practices.

**Full Stack Developer**
The New College, 2021 - 2023
• Developed a modern digital marketing agency website built with React.js, showcasing a 40% increase in website traffic.
• Implemented responsive layouts, reusable components, and optimized animations, resulting in a 25% increase in user engagement.
• Collaborated with the design team to create a visually stunning UI, resulting in a 20% increase in user engagement.
• Participated in code reviews and ensured adherence to coding standards and best practices.
• Mentored junior developers in React best practices and coding standards.

**Front-end Developer**
Aryu Agency, 2018 - 2021
• Developed a sleek digital marketing agency website built with React.js, showcasing a 30% increase in website traffic.
• Implemented high-quality video sections strategically, resulting in a 25% increase in user engagement.
• Collaborated with the design team to create a visually stunning UI, resulting in a 20% increase in user engagement.
• Participated in code reviews and ensured adherence to coding standards and best practices.
• Mentored junior developers in React best practices and coding standards.

**EDUCATION**
Bachelor of Science in Computer Science, University of Technology, 2014 - 2018

**TECHNICAL SKILLS**
React, Next.js, TypeScript, JavaScript, Tailwind CSS, GSAP, HTML5, CSS3, Git, Redux, Node.js, Express, MongoDB, PostgreSQL, REST APIs, GraphQL, Jest, Cypress, Webpack, Babel, Docker, AWS

**ADDITIONAL INFORMATION**
Languages: English (Native), Tamil (Native)
Certifications: AWS Certified Developer, Professional Scrum Master I
Awards: Employee of the Year 2023, Innovation Award 2022`;

    setRawText(mockText);
    const parsed = parseCVText(mockText);
    setCvData(parsed);
    setActiveStep("preview");
  };

  // Export CV
 // Export CV as PDF with exact same styling as preview
const exportCV = async () => {
  setExporting(true);
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create a new window for PDF generation
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to download PDF');
      setExporting(false);
      return;
    }

    // Get the current color scheme
    const colors = colorSchemes[colorScheme];

    // Generate HTML content for PDF with exact same styling as preview
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${cvData?.personalInfo.fullName} - CV</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', sans-serif;
              background: #f3f4f6;
              padding: 40px;
              line-height: 1.5;
            }
            
            .cv-container {
              max-width: 900px;
              margin: 0 auto;
              background: white;
              border-radius: 24px;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
              overflow: hidden;
            }
            
            .cv-content {
              padding: 32px;
            }
            
            /* Header Styles */
            .header {
              text-align: center;
              margin-bottom: 32px;
            }
            
            .name {
              font-size: 36px;
              font-weight: 700;
              margin-bottom: 8px;
              color: ${colors.primary};
            }
            
            .title {
              font-size: 18px;
              color: #4b5563;
              margin-bottom: 16px;
            }
            
            .contact-info {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 16px;
              font-size: 14px;
            }
            
            .contact-item {
              display: flex;
              align-items: center;
              gap: 4px;
              color: #6b7280;
            }
            
            .contact-icon {
              color: ${colors.primary};
            }
            
            .address {
              font-size: 13px;
              color: #9ca3af;
              margin-top: 8px;
            }
            
            /* Section Styles */
            .section {
              margin-bottom: 32px;
            }
            
            .section-title {
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 20px;
              font-weight: 600;
              margin-bottom: 16px;
              color: #111827;
            }
            
            .section-title-bar {
              width: 4px;
              height: 24px;
              background: ${colors.primary};
              border-radius: 2px;
            }
            
            /* Summary Styles */
            .summary-text {
              color: #374151;
              line-height: 1.7;
              font-size: 14px;
            }
            
            /* Competencies Grid */
            .competencies-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 24px;
            }
            
            .competency-category {
              background: #f9fafb;
              padding: 16px;
              border-radius: 12px;
            }
            
            .competency-title {
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 12px;
              color: ${colors.primary};
            }
            
            .competency-list {
              list-style: none;
            }
            
            .competency-item {
              display: flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 8px;
              font-size: 14px;
              color: #374151;
            }
            
            .competency-bullet {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: ${colors.primary};
            }
            
            /* Experience Styles */
            .experience-item {
              background: white;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
              overflow: hidden;
              margin-bottom: 16px;
              box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            }
            
            .experience-content {
              padding: 20px;
            }
            
            .experience-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 12px;
            }
            
            .experience-title {
              font-size: 18px;
              font-weight: 600;
              color: #111827;
              margin-bottom: 4px;
            }
            
            .experience-company {
              font-size: 14px;
              color: ${colors.primary};
            }
            
            .experience-period {
              display: flex;
              align-items: center;
              gap: 4px;
              font-size: 12px;
              color: #6b7280;
            }
            
            .experience-description {
              font-size: 14px;
              color: #4b5563;
              margin-bottom: 12px;
            }
            
            .achievements-button {
              display: flex;
              align-items: center;
              gap: 4px;
              font-size: 14px;
              font-weight: 500;
              color: ${colors.primary};
              background: none;
              border: none;
              cursor: pointer;
              padding: 0;
              margin-bottom: 12px;
            }
            
            .achievements-list {
              list-style: none;
              margin-top: 12px;
            }
            
            .achievement-item {
              display: flex;
              align-items: flex-start;
              gap: 8px;
              margin-bottom: 8px;
              font-size: 14px;
              color: #4b5563;
            }
            
            .achievement-bullet {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: ${colors.primary};
              margin-top: 6px;
            }
            
            /* Skills Styles */
            .skills-container {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
            }
            
            .skill-tag {
              padding: 8px 16px;
              background: ${colors.primary}10;
              color: ${colors.primary};
              border: 1px solid ${colors.primary}20;
              border-radius: 8px;
              font-size: 14px;
              font-weight: 500;
            }
            
            /* Education Styles */
            .education-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 16px;
              background: #f9fafb;
              border-radius: 12px;
              margin-bottom: 8px;
            }
            
            .education-degree {
              font-size: 16px;
              font-weight: 600;
              color: #111827;
              margin-bottom: 4px;
            }
            
            .education-institution {
              font-size: 14px;
              color: #6b7280;
            }
            
            .education-period {
              font-size: 12px;
              color: #9ca3af;
            }
            
            /* Additional Info Styles */
            .additional-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 16px;
            }
            
            .additional-item {
              background: #f9fafb;
              padding: 16px;
              border-radius: 12px;
            }
            
            .additional-title {
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 12px;
              color: ${colors.primary};
            }
            
            .additional-list {
              list-style: none;
            }
            
            .additional-list-item {
              display: flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 6px;
              font-size: 14px;
              color: #4b5563;
            }
            
            .additional-bullet {
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background: ${colors.primary};
            }
            
            /* Print Styles */
            @media print {
              body {
                background: white;
                padding: 0;
              }
              
              .cv-container {
                box-shadow: none;
                border-radius: 0;
              }
              
              .experience-item {
                break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="cv-container">
            <div class="cv-content">
              <!-- Header -->
              <div class="header">
                <h1 class="name">${cvData?.personalInfo.fullName || ''}</h1>
                <p class="title">${cvData?.personalInfo.title || ''}</p>
                
                <div class="contact-info">
                  ${cvData?.personalInfo.email ? `
                    <span class="contact-item">
                      <span class="contact-icon">✉️</span>
                      ${cvData.personalInfo.email}
                    </span>
                  ` : ''}
                  ${cvData?.personalInfo.phone ? `
                    <span class="contact-item">
                      <span class="contact-icon">📱</span>
                      ${cvData.personalInfo.phone}
                    </span>
                  ` : ''}
                  ${cvData?.personalInfo.location ? `
                    <span class="contact-item">
                      <span class="contact-icon">📍</span>
                      ${cvData.personalInfo.location}
                    </span>
                  ` : ''}
                </div>
                
                ${cvData?.personalInfo.address ? `
                  <p class="address">${cvData.personalInfo.address}</p>
                ` : ''}
              </div>

              <!-- Professional Summary -->
              ${cvData?.personalInfo.summary ? `
                <div class="section">
                  <h2 class="section-title">
                    <div class="section-title-bar"></div>
                    Professional Summary
                  </h2>
                  <p class="summary-text">${cvData.personalInfo.summary}</p>
                </div>
              ` : ''}

              <!-- Core Competencies -->
              ${(cvData?.coreCompetencies.technical.length > 0 || 
                 cvData?.coreCompetencies.leadership.length > 0 || 
                 cvData?.coreCompetencies.domainExpertise.length > 0) ? `
                <div class="section">
                  <h2 class="section-title">
                    <div class="section-title-bar"></div>
                    Core Competencies
                  </h2>
                  
                  <div class="competencies-grid">
                    ${cvData?.coreCompetencies.technical.length > 0 ? `
                      <div class="competency-category">
                        <h3 class="competency-title">Technical</h3>
                        <ul class="competency-list">
                          ${cvData.coreCompetencies.technical.map(skill => `
                            <li class="competency-item">
                              <span class="competency-bullet"></span>
                              ${skill}
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                    ` : ''}

                    ${cvData?.coreCompetencies.leadership.length > 0 ? `
                      <div class="competency-category">
                        <h3 class="competency-title">Leadership</h3>
                        <ul class="competency-list">
                          ${cvData.coreCompetencies.leadership.map(skill => `
                            <li class="competency-item">
                              <span class="competency-bullet"></span>
                              ${skill}
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                    ` : ''}

                    ${cvData?.coreCompetencies.domainExpertise.length > 0 ? `
                      <div class="competency-category">
                        <h3 class="competency-title">Domain Expertise</h3>
                        <ul class="competency-list">
                          ${cvData.coreCompetencies.domainExpertise.map(skill => `
                            <li class="competency-item">
                              <span class="competency-bullet"></span>
                              ${skill}
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                    ` : ''}
                  </div>
                </div>
              ` : ''}

              <!-- Professional Experience -->
              ${cvData?.experience.length > 0 ? `
                <div class="section">
                  <h2 class="section-title">
                    <div class="section-title-bar"></div>
                    Professional Experience
                  </h2>
                  
                  <div>
                    ${cvData.experience.map(exp => `
                      <div class="experience-item">
                        <div class="experience-content">
                          <div class="experience-header">
                            <div>
                              <h3 class="experience-title">${exp.title}</h3>
                              <p class="experience-company">${exp.company}</p>
                            </div>
                            <div class="experience-period">
                              <span>📅</span>
                              <span>${exp.period}</span>
                            </div>
                          </div>

                          ${exp.description.length > 0 ? `
                            <p class="experience-description">${exp.description[0]}</p>
                          ` : ''}

                          ${exp.achievements.length > 0 ? `
                            <div class="achievements-button">
                              <span>✨</span>
                              <span>Achievements</span>
                            </div>

                            <ul class="achievements-list">
                              ${exp.achievements.map(achievement => `
                                <li class="achievement-item">
                                  <span class="achievement-bullet"></span>
                                  <span>${achievement}</span>
                                </li>
                              `).join('')}
                            </ul>
                          ` : ''}
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Technical Skills -->
              ${cvData?.skills.length > 0 ? `
                <div class="section">
                  <h2 class="section-title">
                    <div class="section-title-bar"></div>
                    Technical Skills
                  </h2>
                  
                  <div class="skills-container">
                    ${cvData.skills.map(skill => `
                      <span class="skill-tag">${skill.name}</span>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Education -->
              ${cvData?.education.length > 0 ? `
                <div class="section">
                  <h2 class="section-title">
                    <div class="section-title-bar"></div>
                    Education
                  </h2>
                  
                  <div>
                    ${cvData.education.map(edu => `
                      <div class="education-item">
                        <div>
                          <p class="education-degree">${edu.degree}</p>
                          <p class="education-institution">${edu.institution}</p>
                        </div>
                        ${edu.period ? `
                          <span class="education-period">${edu.period}</span>
                        ` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Additional Information -->
              ${(cvData?.additionalCredentials.languages.length > 0 || 
                 cvData?.additionalCredentials.certifications.length > 0 ||
                 cvData?.additionalCredentials.awards.length > 0) ? `
                <div class="section">
                  <h2 class="section-title">
                    <div class="section-title-bar"></div>
                    Additional Information
                  </h2>
                  
                  <div class="additional-grid">
                    ${cvData?.additionalCredentials.languages.length > 0 ? `
                      <div class="additional-item">
                        <h3 class="additional-title">Languages</h3>
                        <ul class="additional-list">
                          ${cvData.additionalCredentials.languages.map(lang => `
                            <li class="additional-list-item">
                              <span class="additional-bullet"></span>
                              ${lang}
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                    ` : ''}

                    ${cvData?.additionalCredentials.certifications.length > 0 ? `
                      <div class="additional-item">
                        <h3 class="additional-title">Certifications</h3>
                        <ul class="additional-list">
                          ${cvData.additionalCredentials.certifications.map(cert => `
                            <li class="additional-list-item">
                              <span class="additional-bullet"></span>
                              ${cert}
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                    ` : ''}

                    ${cvData?.additionalCredentials.awards.length > 0 ? `
                      <div class="additional-item">
                        <h3 class="additional-title">Awards</h3>
                        <ul class="additional-list">
                          ${cvData.additionalCredentials.awards.map(award => `
                            <li class="additional-list-item">
                              <span class="additional-bullet"></span>
                              ${award}
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                    ` : ''}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
          
          <script>
            window.onload = function() {
              setTimeout(() => {
                window.print();
              }, 500);
            }
          </script>
        </body>
      </html>
    `;

    // Write the HTML to the new window
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    setActiveStep("download");
  } catch (error) {
    console.error("Export failed:", error);
  } finally {
    setExporting(false);
  }
};


  return (
    <>
      <Header />
      
      <section className="relative pt-28 pb-20 overflow-hidden min-h-screen">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#c40116]/5 via-transparent to-[#be0117]/5" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#c40116]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#be0117]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c40116]/10 to-[#be0117]/10 rounded-full mb-6 border border-[#c40116]/20 backdrop-blur-sm"
            >
              <Brain className="w-4 h-4 text-[#c40116]" />
              <span className="text-sm font-medium bg-gradient-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
                AI-Powered CV Generator
              </span>
              <Sparkles className="w-3 h-3 text-[#c40116]" />
            </motion.div>

            <motion.h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Upload Your Resume
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
                Get a Professional CV
              </span>
            </motion.h1>

            <motion.p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our AI automatically extracts and formats your information into a stunning, ATS-friendly CV.
            </motion.p>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {[
                { step: "upload", label: "Upload", icon: UploadCloud },
                { step: "preview", label: "Preview", icon: Eye },
                { step: "download", label: "Download", icon: DownloadCloud },
              ].map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === step.step;
                const isComplete = 
                  (step.step === "upload" && file) ||
                  (step.step === "preview" && cvData) ||
                  (step.step === "download" && activeStep === "download");

                return (
                  <React.Fragment key={step.step}>
                    {index > 0 && (
                      <div className={`w-12 h-0.5 ${
                        isComplete ? "bg-[#c40116]" : "bg-gray-200"
                      }`} />
                    )}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-[#c40116] to-[#be0117] text-white shadow-lg shadow-[#c40116]/20 scale-110"
                          : isComplete
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs mt-2 text-gray-600">{step.label}</span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Demo Button */}
            {!cvData && (
              <button
                onClick={loadMockData}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all"
              >
                Load Demo Data
              </button>
            )}
          </motion.div>

          {/* Main Content */}
          <motion.div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-xl">
              
              {/* Upload Step */}
              {activeStep === "upload" && (
                <div className="p-8">
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-3 border-dashed rounded-2xl p-16 transition-all duration-300 ${
                      dragActive
                        ? "border-[#c40116] bg-[#c40116]/5 scale-[1.02]"
                        : file
                        ? "border-green-500 bg-green-50/30"
                        : "border-gray-200 hover:border-[#c40116]/30 hover:bg-gray-50/50"
                    }`}
                  >
                    <input
                      type="file"
                      id="resume-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                    />

                    {!file ? (
                      <div className="text-center">
                        <motion.div
                          animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="inline-flex p-8 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-3xl mb-8"
                        >
                          <UploadCloud className="w-16 h-16 text-[#c40116]" />
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          Drag & Drop Your Resume
                        </h3>
                        <p className="text-gray-500 mb-8">
                          or{" "}
                          <label
                            htmlFor="resume-upload"
                            className="text-[#c40116] font-semibold cursor-pointer hover:underline"
                          >
                            browse files
                          </label>
                        </p>
                        
                        <div className="flex items-center justify-center gap-4 mb-8">
                          <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                              <div
                                key={i}
                                className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-3 border-white"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            <span className="font-semibold text-[#c40116]">10,000+</span> CVs generated
                          </span>
                        </div>

                        <div className="space-y-6">
                          <label
                            htmlFor="resume-upload"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 text-lg"
                          >
                            <Upload className="w-5 h-5" />
                            Choose File
                          </label>
                          
                          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                            <span className="flex items-center gap-2">📄 PDF</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="flex items-center gap-2">📝 DOC</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="flex items-center gap-2">📃 TXT</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-6">
                          <div className="p-5 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-2xl">
                            <FileText className="w-12 h-12 text-[#c40116]" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-xl mb-2">{file.name}</p>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-500">
                                {(file.size / 1024).toFixed(2)} KB
                              </span>
                              <span className="w-1 h-1 bg-gray-300 rounded-full" />
                              <span className="text-sm text-green-600 flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" />
                                Ready to process
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={removeFile}
                          className="p-3 hover:bg-gray-100 rounded-full transition-colors group"
                        >
                          <X className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
                        </button>
                      </motion.div>
                    )}
                  </div>

                  {/* Process Button */}
                  {file && !uploading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8"
                    >
                      <button
                        onClick={processResume}
                        className="w-full py-5 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
                      >
                        <Wand2 className="w-5 h-5" />
                        Parse and Generate CV
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}

                  {/* Processing State */}
                  {processing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-12 text-center"
                    >
                      <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#c40116]/10 to-[#be0117]/10 rounded-full">
                        <Loader2 className="w-5 h-5 animate-spin text-[#c40116]" />
                        <span className="text-sm font-medium text-gray-700">
                          Parsing your resume...
                        </span>
                      </div>
                      
                      <div className="mt-8 max-w-md mx-auto">
                        <div className="space-y-4">
                          {[
                            "Extracting personal information",
                            "Parsing work experience",
                            "Identifying skills",
                            "Analyzing competencies",
                            "Formatting CV",
                          ].map((step, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.2 }}
                              className="flex items-center gap-3"
                            >
                              <div className="w-5 h-5 rounded-full border-2 border-[#c40116]/30 flex items-center justify-center">
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
                                  className="w-2 h-2 rounded-full bg-[#c40116]"
                                />
                              </div>
                              <span className="text-sm text-gray-600">{step}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Preview Step */}
              {activeStep === "preview" && cvData && (
                <div className="flex flex-col">
                  {/* Preview Toolbar */}
                  <div className="border-b border-gray-200 p-4 bg-gray-50/50">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4 flex-wrap">
                     

                        {/* Color Scheme */}
                        <div className="flex items-center gap-2">
                          {(Object.keys(colorSchemes) as ColorScheme[]).map((color) => (
                            <button
                              key={color}
                              onClick={() => setColorScheme(color)}
                              className={`w-8 h-8 rounded-full transition-all ${
                                colorScheme === color ? 'ring-2 ring-offset-2 ring-[#c40116] scale-110' : ''
                              }`}
                              style={{ backgroundColor: colorSchemes[color].primary }}
                            />
                          ))}
                        </div>

                       

                        
                      </div>

                      <button
                        onClick={() => setActiveStep("download")}
                        className="px-6 py-2 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-lg font-medium flex items-center gap-2 hover:scale-105 transition-transform"
                      >
                        Continue to Download
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Preview Area */}
                  <div className={`p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`mx-auto transition-all duration-300 ${
                        previewMode === "mobile" ? "max-w-sm" :
                        previewMode === "tablet" ? "max-w-2xl" :
                        "max-w-4xl"
                      }`}
                    >
                      <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${
                        darkMode ? 'bg-gray-800 text-white' : ''
                      }`}>
                        {/* CV Content */}
                        <div className="p-8">
                          {/* Header */}
                          <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold mb-2" style={{ color: colorSchemes[colorScheme].primary }}>
                              {cvData.personalInfo.fullName || "Name Not Available"}
                            </h1>
                            <p className="text-lg text-gray-600 mb-4">{cvData.personalInfo.title || "Professional"}</p>
                            
                            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                              {cvData.personalInfo.email && (
                                <span className="flex items-center gap-1">
                                  <Mail className="w-4 h-4" style={{ color: colorSchemes[colorScheme].primary }} />
                                  {cvData.personalInfo.email}
                                </span>
                              )}
                              {cvData.personalInfo.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone className="w-4 h-4" style={{ color: colorSchemes[colorScheme].primary }} />
                                  {cvData.personalInfo.phone}
                                </span>
                              )}
                              {cvData.personalInfo.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" style={{ color: colorSchemes[colorScheme].primary }} />
                                  {cvData.personalInfo.location}
                                </span>
                              )}
                            </div>
                            
                            {cvData.personalInfo.address && (
                              <p className="text-sm text-gray-500 mt-2">{cvData.personalInfo.address}</p>
                            )}
                          </div>

                          {/* Summary */}
                          {cvData.personalInfo.summary && (
                            <div className="mb-8">
                              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
                                Professional Summary
                              </h2>
                              <p className="text-gray-700 leading-relaxed">
                                {cvData.personalInfo.summary}
                              </p>
                            </div>
                          )}

                          {/* Core Competencies */}
                          {(cvData.coreCompetencies.technical.length > 0 || 
                            cvData.coreCompetencies.leadership.length > 0 || 
                            cvData.coreCompetencies.domainExpertise.length > 0) && (
                            <div className="mb-8">
                              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
                                Core Competencies
                              </h2>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {cvData.coreCompetencies.technical.length > 0 && (
                                  <div>
                                    <h3 className="font-medium mb-3" style={{ color: colorSchemes[colorScheme].primary }}>
                                      Technical
                                    </h3>
                                    <div className="space-y-2">
                                      {cvData.coreCompetencies.technical.map((skill, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
                                          <span className="text-sm text-gray-700">{skill}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {cvData.coreCompetencies.leadership.length > 0 && (
                                  <div>
                                    <h3 className="font-medium mb-3" style={{ color: colorSchemes[colorScheme].primary }}>
                                      Leadership
                                    </h3>
                                    <div className="space-y-2">
                                      {cvData.coreCompetencies.leadership.map((skill, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
                                          <span className="text-sm text-gray-700">{skill}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {cvData.coreCompetencies.domainExpertise.length > 0 && (
                                  <div>
                                    <h3 className="font-medium mb-3" style={{ color: colorSchemes[colorScheme].primary }}>
                                      Domain Expertise
                                    </h3>
                                    <div className="space-y-2">
                                      {cvData.coreCompetencies.domainExpertise.map((skill, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
                                          <span className="text-sm text-gray-700">{skill}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Experience */}
                          {cvData.experience.length > 0 && (
                            <div className="mb-8">
                              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
                                Professional Experience
                              </h2>
                              
                              <div className="space-y-4">
                                {cvData.experience.map((exp) => (
                                  <ExperienceCard key={exp.id} exp={exp} colorScheme={colorScheme} />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Skills */}
                          {cvData.skills.length > 0 && (
                            <div className="mb-8">
                              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
                                Technical Skills
                              </h2>
                              
                              <div className="flex flex-wrap gap-2">
                                {cvData.skills.map((skill) => (
                                  <span
                                    key={skill.id}
                                    className="px-3 py-1.5 rounded-lg text-sm"
                                    style={{
                                      backgroundColor: `${colorSchemes[colorScheme].primary}10`,
                                      color: colorSchemes[colorScheme].primary,
                                      border: `1px solid ${colorSchemes[colorScheme].primary}20`
                                    }}
                                  >
                                    {skill.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Education */}
                          {cvData.education.length > 0 && (
                            <div className="mb-8">
                              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
                                Education
                              </h2>
                              
                              <div className="space-y-3">
                                {cvData.education.map((edu) => (
                                  <div key={edu.id} className="flex items-start justify-between">
                                    <div>
                                      <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                                      <p className="text-sm text-gray-600">{edu.institution}</p>
                                    </div>
                                    {edu.period && (
                                      <span className="text-xs text-gray-500">{edu.period}</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Additional Information */}
                          {(cvData.additionalCredentials.languages.length > 0 || 
                            cvData.additionalCredentials.certifications.length > 0 ||
                            cvData.additionalCredentials.awards.length > 0) && (
                            <div>
                              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
                                Additional Information
                              </h2>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {cvData.additionalCredentials.languages.length > 0 && (
                                  <div>
                                    <h3 className="font-medium mb-2" style={{ color: colorSchemes[colorScheme].primary }}>
                                      Languages
                                    </h3>
                                    <div className="space-y-1">
                                      {cvData.additionalCredentials.languages.map((lang, idx) => (
                                        <div key={idx} className="text-sm text-gray-700">{lang}</div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {cvData.additionalCredentials.certifications.length > 0 && (
                                  <div>
                                    <h3 className="font-medium mb-2" style={{ color: colorSchemes[colorScheme].primary }}>
                                      Certifications
                                    </h3>
                                    <div className="space-y-1">
                                      {cvData.additionalCredentials.certifications.map((cert, idx) => (
                                        <div key={idx} className="text-sm text-gray-700">{cert}</div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {cvData.additionalCredentials.awards.length > 0 && (
                                  <div>
                                    <h3 className="font-medium mb-2" style={{ color: colorSchemes[colorScheme].primary }}>
                                      Awards
                                    </h3>
                                    <div className="space-y-1">
                                      {cvData.additionalCredentials.awards.map((award, idx) => (
                                        <div key={idx} className="text-sm text-gray-700">{award}</div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Download Step */}
              {activeStep === "download" && cvData && (
                <div className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md mx-auto"
                  >
                    <div className="inline-flex p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full mb-6">
                      <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Your CV is Ready!
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Choose your preferred format and download your professional CV
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { format: "pdf", label: "PDF", icon: FileText, color: "red" },
                          { format: "docx", label: "Word", icon: FileText, color: "blue" },
                          { format: "txt", label: "Text", icon: FileText, color: "gray" },
                        ].map(({ format, label, color }) => (
                          <button
                            key={format}
                            onClick={() => setExportFormat(format as any)}
                            className={`p-4 border-2 rounded-xl transition-all ${
                              exportFormat === format
                                ? `border-${color}-500 bg-${color}-50`
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <FileText className={`w-8 h-8 mx-auto mb-2 ${
                              exportFormat === format ? `text-${color}-500` : 'text-gray-400'
                            }`} />
                            <span className={`text-sm font-medium ${
                              exportFormat === format ? `text-${color}-500` : 'text-gray-600'
                            }`}>
                              {label}
                            </span>
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={exportCV}
                        disabled={exporting}
                        className="w-full py-5 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
                      >
                        {exporting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Generating CV...
                          </>
                        ) : (
                          <>
                            <DownloadCloud className="w-5 h-5" />
                            Download CV
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                        <Printer className="w-4 h-4" />
                        Print
                      </button>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                        <Share className="w-4 h-4" />
                        Share
                      </button>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <button
                        onClick={() => setActiveStep("preview")}
                        className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        Preview Again
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CVGeneratorPage;