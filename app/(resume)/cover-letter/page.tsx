// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Upload,
//   FileText,
//   Award,
//   CheckCircle,
//   AlertCircle,
//   X,
//   Loader2,
//   Star,
//   Target,
//   Zap,
//   Shield,
//   Sparkles,
//   ChevronRight,
//   Clock,
//   FileCheck,
//   Brain,
//   Rocket,
//   Users,
//   Building2,
//   GraduationCap,
//   Briefcase,
//   Download,
//   Share2,
//   BookmarkPlus,
//   Info,
//   ChevronDown,
//   Eye,
//   ArrowRight,
//   Globe,
//   Mail,
//   Phone,
//   MapPin,
//   Linkedin,
//   Github,
//   Calendar,
//   Edit3,
//   Plus,
//   Save,
//   Printer,
//   DownloadCloud,
//   UploadCloud,
//   Share,
//   Star as StarIcon,
//   Settings2,
//   UserPlus,
//   Zap as ZapIcon,
//   Code,
//   Palette,
//   Layout,
//   Monitor,
//   Smartphone,
//   Tablet,
//   Moon,
//   Sun,
//   Check,
//   ExternalLink,
//   Layers,
//   Grid3x3,
//   AlignLeft,
//   Medal,
//   Trophy,
//   BookOpen,
//   Users as UsersIcon,
//   Heart,
//   Menu,
//   X as XIcon,
//   Wand2,
//   UserCircle,
//   AtSign,
//   PhoneCall,
//   MapPinned,
// } from "lucide-react";
// import axios from "axios";

// // Types for parsed CV data
// interface ParsedCVData {
//   personalInfo: {
//     fullName: string;
//     title: string;
//     email: string;
//     phone: string;
//     location: string;
//     address?: string;
//     summary: string;
//     photo?: string;
//   };
//   coreCompetencies: {
//     technical: string[];
//     leadership: string[];
//     domainExpertise: string[];
//   };
//   experience: Array<{
//     id: string;
//     title: string;
//     company: string;
//     period: string;
//     description: string[];
//     achievements: string[];
//     link?: string;
//     isPresent?: boolean;
//   }>;
//   education: Array<{
//     id: string;
//     degree: string;
//     institution: string;
//     period?: string;
//     description?: string;
//   }>;
//   skills: Array<{
//     id: string;
//     name: string;
//     category: string;
//     level?: "beginner" | "intermediate" | "advanced" | "expert";
//   }>;
//   additionalCredentials: {
//     certifications: string[];
//     languages: string[];
//     awards: string[];
//   };
//   raw?: string;
// }

// // Template types
// type TemplateStyle = "modern" | "professional" | "creative" | "minimal";
// type ColorScheme = "red" | "blue" | "green" | "purple" | "orange" | "black";
// const colorSchemes = {
//   red: { primary: "#c40116", secondary: "#be0117", accent: "#e63545", light: "#fee2e2" },
//   blue: { primary: "#2563eb", secondary: "#1d4ed8", accent: "#3b82f6", light: "#dbeafe" },
//   green: { primary: "#059669", secondary: "#047857", accent: "#10b981", light: "#d1fae5" },
//   purple: { primary: "#7c3aed", secondary: "#6d28d9", accent: "#8b5cf6", light: "#ede9fe" },
//   orange: { primary: "#ea580c", secondary: "#c2410c", accent: "#f97316", light: "#ffedd5" },
//   black: { primary: "#000000", secondary: "#1a1a1a", accent: "#333333", light: "#f5f5f5" },
// };
// // Custom parser for the specific API response format
// const parseCVText = (text: string): ParsedCVData => {

//   console.log("text",text)

//   const lines = text.split('\n').map(line => line.trim());

//   console.log("lines",lines)

//   const data: ParsedCVData = {
//     personalInfo: {
//       fullName: "",
//       title: "",
//       email: "",
//       phone: "",
//       location: "",
//       address: "",
//       summary: "",
//     },
//     coreCompetencies: {
//       technical: [],
//       leadership: [],
//       domainExpertise: [],
//     },
//     experience: [],
//     education: [],
//     skills: [],
//     additionalCredentials: {
//       certifications: [],
//       languages: [],
//       awards: [],
//     },
//     raw: text,
//   };

//   let currentSection = "";
//   let currentExperience: any = null;
//   let currentCompetencyType = "";

//   for (let i = 0; i < lines.length; i++) {
//     const line = lines[i];

//     // Parse personal info from the top section
//     if (i === 0 && line && !line.includes('**') && !line.includes('•')) {
//       data.personalInfo.fullName = line;
//     }
//     else if (i === 1 && line && !line.includes('**') && !line.includes('•') && !line.includes('@')) {
//       data.personalInfo.title = line;
//     }
//     else if (line.includes('@') && line.includes('.')) {
//       data.personalInfo.email = line;
//     }
//     else if (line.match(/\(\d{3}\) \d{3}-\d{4}|\d{3}-\d{3}-\d{4}/)) {
//       data.personalInfo.phone = line;
//     }
//     else if (line.includes('Street') || line.includes('Avenue') || line.includes('Road') || line.includes('Lane')) {
//       data.personalInfo.address = line;
//       // Extract location from address
//       const locationMatch = line.match(/,?\s*([^,]+(?:,\s*[A-Z]{2})?)/);
//       if (locationMatch) {
//         data.personalInfo.location = locationMatch[1].trim();
//       }
//     }

//     // Section detection
//     if (line === "**PROFESSIONAL SUMMARY**" || line === "PROFESSIONAL SUMMARY") {
//       currentSection = "summary";
//       continue;
//     }
//     else if (line === "**CORE COMPETENCIES**" || line === "CORE COMPETENCIES") {
//       currentSection = "competencies";
//       continue;
//     }
//     else if (line === "**PROFESSIONAL EXPERIENCE**" || line === "PROFESSIONAL EXPERIENCE") {
//       currentSection = "experience";
//       continue;
//     }
//     else if (line === "**EDUCATION**" || line === "EDUCATION") {
//       currentSection = "education";
//       continue;
//     }
//     else if (line === "**TECHNICAL SKILLS**" || line === "TECHNICAL SKILLS" || line === "KEY SKILLS") {
//       currentSection = "skills";
//       continue;
//     }
//     else if (line === "**ADDITIONAL INFORMATION**" || line === "ADDITIONAL CREDENTIALS") {
//       currentSection = "credentials";
//       continue;
//     }

//     // Competency type detection
//     if (line === "**Technical**" || line === "Technical") {
//       currentCompetencyType = "technical";
//       continue;
//     }
//     else if (line === "**Leadership**" || line === "Leadership") {
//       currentCompetencyType = "leadership";
//       continue;
//     }
//     else if (line === "**Domain Expertise**" || line === "Domain Expertise") {
//       currentCompetencyType = "domainExpertise";
//       continue;
//     }

//     // Summary section
//     if (currentSection === "summary" && line && !line.startsWith('**')) {
//       data.personalInfo.summary += (data.personalInfo.summary ? " " : "") + line;
//     }

//     // Competencies section
//     if (currentSection === "competencies" && line.startsWith('•')) {
//       const competency = line.replace('•', '').trim();
//       if (currentCompetencyType) {
//         switch (currentCompetencyType) {
//           case "technical":
//             data.coreCompetencies.technical.push(competency);
//             break;
//           case "leadership":
//             data.coreCompetencies.leadership.push(competency);
//             break;
//           case "domainExpertise":
//             data.coreCompetencies.domainExpertise.push(competency);
//             break;
//         }
//       }
//     }

//     // Experience section
//     if (currentSection === "experience") {
//       // Check for job title (bolded text)
//       if (line.startsWith('**') && line.endsWith('**') && !line.includes('•')) {
//         if (currentExperience) {
//           data.experience.push(currentExperience);
//         }
//         currentExperience = {
//           id: Date.now() + Math.random().toString(),
//           title: line.replace(/\*\*/g, '').trim(),
//           company: "",
//           period: "",
//           description: [],
//           achievements: [],
//         };
//       }
//       // Company and period
//       else if (currentExperience && line.includes(',')) {
//         const parts = line.split(',').map(s => s.trim());
//         if (parts.length >= 2) {
//           currentExperience.company = parts[0];
//           currentExperience.period = parts.slice(1).join(', ');
//           currentExperience.isPresent = currentExperience.period.includes('Present');
//         }
//       }
//       // Achievements (bullet points)
//       else if (currentExperience && line.startsWith('•')) {
//         currentExperience.achievements.push(line.replace('•', '').trim());
//       }
//       // Description (non-bullet text)
//       else if (currentExperience && line && !line.startsWith('•') && !line.startsWith('**')) {
//         currentExperience.description.push(line);
//       }
//     }

//     // Skills section
//     if (currentSection === "skills" && line && !line.startsWith('**')) {
//       // Handle comma-separated skills
//       if (line.includes(',')) {
//         const skills = line.split(',').map(s => s.trim()).filter(s => s);
//         skills.forEach(skill => {
//           if (skill && !skill.startsWith('•')) {
//             data.skills.push({
//               id: Date.now() + Math.random().toString(),
//               name: skill,
//               category: "technical",
//             });
//           }
//         });
//       }
//       // Handle bullet-point skills
//       else if (line.startsWith('•')) {
//         const skill = line.replace('•', '').trim();
//         if (skill) {
//           data.skills.push({
//             id: Date.now() + Math.random().toString(),
//             name: skill,
//             category: "technical",
//           });
//         }
//       }
//     }

//     // Education section
//     if (currentSection === "education" && line && !line.startsWith('**')) {
//       if (line.includes(',')) {
//         const parts = line.split(',').map(s => s.trim());
//         if (parts.length >= 2) {
//           data.education.push({
//             id: Date.now() + Math.random().toString(),
//             degree: parts[0],
//             institution: parts.slice(1, -1).join(', '),
//             period: parts[parts.length - 1],
//           });
//         }
//       }
//     }

//     // Additional Credentials
//     if (currentSection === "credentials") {
//       if (line.toLowerCase().includes('language')) {
//         const langs = line.replace(/language[s]?:/i, '').trim();
//         if (langs && langs !== 'None' && langs !== 'none') {
//           data.additionalCredentials.languages = langs.split(',').map(l => l.trim());
//         }
//       } else if (line.toLowerCase().includes('certification')) {
//         const certs = line.replace(/certification[s]?:/i, '').trim();
//         if (certs && certs !== 'None' && certs !== 'none') {
//           data.additionalCredentials.certifications = certs.split(',').map(c => c.trim());
//         }
//       } else if (line.toLowerCase().includes('award')) {
//         const awards = line.replace(/award[s]?:/i, '').trim();
//         if (awards && awards !== 'None' && awards !== 'none') {
//           data.additionalCredentials.awards = awards.split(',').map(a => a.trim());
//         }
//       }
//     }
//   }

//   // Push last experience
//   if (currentExperience) {
//     data.experience.push(currentExperience);
//   }

//   // Remove duplicates from skills
//   data.skills = data.skills.filter((skill, index, self) =>
//     index === self.findIndex(s => s.name.toLowerCase() === skill.name.toLowerCase())
//   );

//   // Clean up summary (remove any remaining markdown)
//   data.personalInfo.summary = data.personalInfo.summary.replace(/\*\*/g, '').trim();

//   return data;
// };

// // Experience Card Component
// const ExperienceCard = ({ exp, colorScheme }: { exp: any; colorScheme: ColorScheme }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
//     >
//       <div className="p-6">
//         <div className="flex items-start justify-between mb-4">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-1">{exp.title}</h3>
//             <p className="text-sm" style={{ color: colorSchemes[colorScheme].primary }}>
//               {exp.company}
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-xs text-gray-500 flex items-center gap-1">
//               <Calendar className="w-3 h-3" />
//               {exp.period}
//             </span>
//             {exp.link && (
//               <a
//                 href={exp.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <ExternalLink className="w-4 h-4 text-gray-400" />
//               </a>
//             )}
//           </div>
//         </div>

//         {exp.description.length > 0 && (
//           <p className="text-sm text-gray-600 mb-4">{exp.description[0]}</p>
//         )}

//       </div>
//     </motion.div>
//   );
// };

// // Main Component
// const CVGeneratorPage = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [processing, setProcessing] = useState(false);
//   const [cvData, setCvData] = useState<ParsedCVData | null>(null);
//   const [dragActive, setDragActive] = useState(false);
//   const [activeStep, setActiveStep] = useState<"upload" | "preview" | "download">("upload");
//   const [selectedTemplate, setSelectedTemplate] = useState<TemplateStyle>("modern");
//   const [colorScheme, setColorScheme] = useState<ColorScheme>("red");
//   const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
//   const [darkMode, setDarkMode] = useState(false);
//   const [exportFormat, setExportFormat] = useState<"pdf" | "docx" | "txt">("pdf");
//   const [exporting, setExporting] = useState(false);
//   const [rawText, setRawText] = useState("");

//   // Handle file upload
//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     const droppedFile = e.dataTransfer.files[0];
//     if (
//       droppedFile &&
//       (droppedFile.type === "application/pdf" ||
//         droppedFile.type === "application/msword" ||
//         droppedFile.type ===
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
//         droppedFile.type === "text/plain")
//     ) {
//       setFile(droppedFile);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const removeFile = () => {
//     setFile(null);
//     setCvData(null);
//     setRawText("");
//     setActiveStep("upload");
//   };

//   // Process resume data
//   const processResume = async () => {
//     if (!file) return;

//     setUploading(true);
//     setProcessing(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await axios.post(
//         `https://ai.aryuacademy.com/api/v1/resume/cv/generate-from-file`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("API Response:", response.data.data.cv_content);

//       // Get the cv_content from the response
//       const cvContent = response.data.data.cv_content;
//       setRawText(cvContent);

//       // Parse the text data
//       const parsed = parseCVText(cvContent);
//       console.log("Parsed CV Data:", parsed);

//       setCvData(parsed);
//       setActiveStep("preview");

//     } catch (error) {
//       console.error("Error processing resume:", error);
//     } finally {
//       setUploading(false);
//       setProcessing(false);
//     }
//   };

//   // Export CV
//  // Export CV as PDF with exact same styling as preview
// const exportCV = async () => {
//   setExporting(true);
//   try {
//     await new Promise(resolve => setTimeout(resolve, 1500));

//     // Create a new window for PDF generation
//     const printWindow = window.open('', '_blank');
//     if (!printWindow) {
//       alert('Please allow pop-ups to download PDF');
//       setExporting(false);
//       return;
//     }

//     // Get the current color scheme
//     const colors = colorSchemes[colorScheme];

//     // Generate HTML content for PDF with exact same styling as preview
//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>${cvData?.personalInfo.fullName} - CV</title>
//           <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
//           <style>
//             * {
//               margin: 0;
//               padding: 0;
//               box-sizing: border-box;
//             }

//             body {
//               font-family: 'Inter', sans-serif;
//               background: #f3f4f6;
//               padding: 40px;
//               line-height: 1.5;
//             }

//             .cv-container {
//               max-width: 900px;
//               margin: 0 auto;
//               background: white;
//               border-radius: 24px;
//               box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
//               overflow: hidden;
//             }

//             .cv-content {
//               padding: 32px;
//             }

//             /* Header Styles */
//             .header {
//               text-align: center;
//               margin-bottom: 32px;
//             }

//             .name {
//               font-size: 36px;
//               font-weight: 700;
//               margin-bottom: 8px;
//               color: ${colors.primary};
//             }

//             .title {
//               font-size: 18px;
//               color: #4b5563;
//               margin-bottom: 16px;
//             }

//             .contact-info {
//               display: flex;
//               flex-wrap: wrap;
//               justify-content: center;
//               gap: 16px;
//               font-size: 14px;
//             }

//             .contact-item {
//               display: flex;
//               align-items: center;
//               gap: 4px;
//               color: #6b7280;
//             }

//             .contact-icon {
//               color: ${colors.primary};
//             }

//             .address {
//               font-size: 13px;
//               color: #9ca3af;
//               margin-top: 8px;
//             }

//             /* Section Styles */
//             .section {
//               margin-bottom: 32px;
//             }

//             .section-title {
//               display: flex;
//               align-items: center;
//               gap: 8px;
//               font-size: 20px;
//               font-weight: 600;
//               margin-bottom: 16px;
//               color: #111827;
//             }

//             .section-title-bar {
//               width: 4px;
//               height: 24px;
//               background: ${colors.primary};
//               border-radius: 2px;
//             }

//             /* Summary Styles */
//             .summary-text {
//               color: #374151;
//               line-height: 1.7;
//               font-size: 14px;
//             }

//             /* Competencies Grid */
//             .competencies-grid {
//               display: grid;
//               grid-template-columns: repeat(3, 1fr);
//               gap: 24px;
//             }

//             .competency-category {
//               background: #f9fafb;
//               padding: 16px;
//               border-radius: 12px;
//             }

//             .competency-title {
//               font-size: 16px;
//               font-weight: 600;
//               margin-bottom: 12px;
//               color: ${colors.primary};
//             }

//             .competency-list {
//               list-style: none;
//             }

//             .competency-item {
//               display: flex;
//               align-items: center;
//               gap: 8px;
//               margin-bottom: 8px;
//               font-size: 14px;
//               color: #374151;
//             }

//             .competency-bullet {
//               width: 6px;
//               height: 6px;
//               border-radius: 50%;
//               background: ${colors.primary};
//             }

//             /* Experience Styles */
//             .experience-item {
//               background: white;
//               border: 1px solid #e5e7eb;
//               border-radius: 12px;
//               overflow: hidden;
//               margin-bottom: 16px;
//               box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//             }

//             .experience-content {
//               padding: 20px;
//             }

//             .experience-header {
//               display: flex;
//               justify-content: space-between;
//               align-items: flex-start;
//               margin-bottom: 12px;
//             }

//             .experience-title {
//               font-size: 18px;
//               font-weight: 600;
//               color: #111827;
//               margin-bottom: 4px;
//             }

//             .experience-company {
//               font-size: 14px;
//               color: ${colors.primary};
//             }

//             .experience-period {
//               display: flex;
//               align-items: center;
//               gap: 4px;
//               font-size: 12px;
//               color: #6b7280;
//             }

//             .experience-description {
//               font-size: 14px;
//               color: #4b5563;
//               margin-bottom: 12px;
//             }

//             .achievements-button {
//               display: flex;
//               align-items: center;
//               gap: 4px;
//               font-size: 14px;
//               font-weight: 500;
//               color: ${colors.primary};
//               background: none;
//               border: none;
//               cursor: pointer;
//               padding: 0;
//               margin-bottom: 12px;
//             }

//             .achievements-list {
//               list-style: none;
//               margin-top: 12px;
//             }

//             .achievement-item {
//               display: flex;
//               align-items: flex-start;
//               gap: 8px;
//               margin-bottom: 8px;
//               font-size: 14px;
//               color: #4b5563;
//             }

//             .achievement-bullet {
//               width: 6px;
//               height: 6px;
//               border-radius: 50%;
//               background: ${colors.primary};
//               margin-top: 6px;
//             }

//             /* Skills Styles */
//             .skills-container {
//               display: flex;
//               flex-wrap: wrap;
//               gap: 8px;
//             }

//             .skill-tag {
//               padding: 8px 16px;
//               background: ${colors.primary}10;
//               color: ${colors.primary};
//               border: 1px solid ${colors.primary}20;
//               border-radius: 8px;
//               font-size: 14px;
//               font-weight: 500;
//             }

//             /* Education Styles */
//             .education-item {
//               display: flex;
//               justify-content: space-between;
//               align-items: center;
//               padding: 16px;
//               background: #f9fafb;
//               border-radius: 12px;
//               margin-bottom: 8px;
//             }

//             .education-degree {
//               font-size: 16px;
//               font-weight: 600;
//               color: #111827;
//               margin-bottom: 4px;
//             }

//             .education-institution {
//               font-size: 14px;
//               color: #6b7280;
//             }

//             .education-period {
//               font-size: 12px;
//               color: #9ca3af;
//             }

//             /* Additional Info Styles */
//             .additional-grid {
//               display: grid;
//               grid-template-columns: repeat(2, 1fr);
//               gap: 16px;
//             }

//             .additional-item {
//               background: #f9fafb;
//               padding: 16px;
//               border-radius: 12px;
//             }

//             .additional-title {
//               font-size: 16px;
//               font-weight: 600;
//               margin-bottom: 12px;
//               color: ${colors.primary};
//             }

//             .additional-list {
//               list-style: none;
//             }

//             .additional-list-item {
//               display: flex;
//               align-items: center;
//               gap: 8px;
//               margin-bottom: 6px;
//               font-size: 14px;
//               color: #4b5563;
//             }

//             .additional-bullet {
//               width: 4px;
//               height: 4px;
//               border-radius: 50%;
//               background: ${colors.primary};
//             }

//             /* Print Styles */
//             @media print {
//               body {
//                 background: white;
//                 padding: 0;
//               }

//               .cv-container {
//                 box-shadow: none;
//                 border-radius: 0;
//               }

//               .experience-item {
//                 break-inside: avoid;
//               }
//             }
//           </style>
//         </head>
//         <body>
//           <div class="cv-container">
//             <div class="cv-content">
//               <!-- Header -->
//               <div class="header">
//                 <h1 class="name">${cvData?.personalInfo.fullName || ''}</h1>
//                 <p class="title">${cvData?.personalInfo.title || ''}</p>

//                 <div class="contact-info">
//                   ${cvData?.personalInfo.email ? `
//                     <span class="contact-item">
//                       <span class="contact-icon">✉️</span>
//                       ${cvData.personalInfo.email}
//                     </span>
//                   ` : ''}
//                   ${cvData?.personalInfo.phone ? `
//                     <span class="contact-item">
//                       <span class="contact-icon">📱</span>
//                       ${cvData.personalInfo.phone}
//                     </span>
//                   ` : ''}
//                   ${cvData?.personalInfo.location ? `
//                     <span class="contact-item">
//                       <span class="contact-icon">📍</span>
//                       ${cvData.personalInfo.location}
//                     </span>
//                   ` : ''}
//                 </div>

//                 ${cvData?.personalInfo.address ? `
//                   <p class="address">${cvData.personalInfo.address}</p>
//                 ` : ''}
//               </div>

//               <!-- Professional Summary -->
//               ${cvData?.personalInfo.summary ? `
//                 <div class="section">
//                   <h2 class="section-title">
//                     <div class="section-title-bar"></div>
//                     Professional Summary
//                   </h2>
//                   <p class="summary-text">${cvData.personalInfo.summary}</p>
//                 </div>
//               ` : ''}

//               <!-- Core Competencies -->
//               ${(cvData?.coreCompetencies.technical.length > 0 ||
//                  cvData?.coreCompetencies.leadership.length > 0 ||
//                  cvData?.coreCompetencies.domainExpertise.length > 0) ? `
//                 <div class="section">
//                   <h2 class="section-title">
//                     <div class="section-title-bar"></div>
//                     Core Competencies
//                   </h2>

//                   <div class="competencies-grid">
//                     ${cvData?.coreCompetencies.technical.length > 0 ? `
//                       <div class="competency-category">
//                         <h3 class="competency-title">Technical</h3>
//                         <ul class="competency-list">
//                           ${cvData.coreCompetencies.technical.map(skill => `
//                             <li class="competency-item">
//                               <span class="competency-bullet"></span>
//                               ${skill}
//                             </li>
//                           `).join('')}
//                         </ul>
//                       </div>
//                     ` : ''}

//                     ${cvData?.coreCompetencies.leadership.length > 0 ? `
//                       <div class="competency-category">
//                         <h3 class="competency-title">Leadership</h3>
//                         <ul class="competency-list">
//                           ${cvData.coreCompetencies.leadership.map(skill => `
//                             <li class="competency-item">
//                               <span class="competency-bullet"></span>
//                               ${skill}
//                             </li>
//                           `).join('')}
//                         </ul>
//                       </div>
//                     ` : ''}

//                     ${cvData?.coreCompetencies.domainExpertise.length > 0 ? `
//                       <div class="competency-category">
//                         <h3 class="competency-title">Domain Expertise</h3>
//                         <ul class="competency-list">
//                           ${cvData.coreCompetencies.domainExpertise.map(skill => `
//                             <li class="competency-item">
//                               <span class="competency-bullet"></span>
//                               ${skill}
//                             </li>
//                           `).join('')}
//                         </ul>
//                       </div>
//                     ` : ''}
//                   </div>
//                 </div>
//               ` : ''}

//               <!-- Professional Experience -->
//               ${cvData?.experience.length > 0 ? `
//                 <div class="section">
//                   <h2 class="section-title">
//                     <div class="section-title-bar"></div>
//                     Professional Experience
//                   </h2>

//                   <div>
//                     ${cvData.experience.map(exp => `
//                       <div class="experience-item">
//                         <div class="experience-content">
//                           <div class="experience-header">
//                             <div>
//                               <h3 class="experience-title">${exp.title}</h3>
//                               <p class="experience-company">${exp.company}</p>
//                             </div>
//                             <div class="experience-period">
//                               <span>📅</span>
//                               <span>${exp.period}</span>
//                             </div>
//                           </div>

//                           ${exp.description.length > 0 ? `
//                             <p class="experience-description">${exp.description[0]}</p>
//                           ` : ''}

//                           ${exp.achievements.length > 0 ? `
//                             <div class="achievements-button">
//                               <span>✨</span>
//                               <span>Achievements</span>
//                             </div>

//                             <ul class="achievements-list">
//                               ${exp.achievements.map(achievement => `
//                                 <li class="achievement-item">
//                                   <span class="achievement-bullet"></span>
//                                   <span>${achievement}</span>
//                                 </li>
//                               `).join('')}
//                             </ul>
//                           ` : ''}
//                         </div>
//                       </div>
//                     `).join('')}
//                   </div>
//                 </div>
//               ` : ''}

//               <!-- Technical Skills -->
//               ${cvData?.skills.length > 0 ? `
//                 <div class="section">
//                   <h2 class="section-title">
//                     <div class="section-title-bar"></div>
//                     Technical Skills
//                   </h2>

//                   <div class="skills-container">
//                     ${cvData.skills.map(skill => `
//                       <span class="skill-tag">${skill.name}</span>
//                     `).join('')}
//                   </div>
//                 </div>
//               ` : ''}

//               <!-- Education -->
//               ${cvData?.education.length > 0 ? `
//                 <div class="section">
//                   <h2 class="section-title">
//                     <div class="section-title-bar"></div>
//                     Education
//                   </h2>

//                   <div>
//                     ${cvData.education.map(edu => `
//                       <div class="education-item">
//                         <div>
//                           <p class="education-degree">${edu.degree}</p>
//                           <p class="education-institution">${edu.institution}</p>
//                         </div>
//                         ${edu.period ? `
//                           <span class="education-period">${edu.period}</span>
//                         ` : ''}
//                       </div>
//                     `).join('')}
//                   </div>
//                 </div>
//               ` : ''}

//               <!-- Additional Information -->
//               ${(cvData?.additionalCredentials.languages.length > 0 ||
//                  cvData?.additionalCredentials.certifications.length > 0 ||
//                  cvData?.additionalCredentials.awards.length > 0) ? `
//                 <div class="section">
//                   <h2 class="section-title">
//                     <div class="section-title-bar"></div>
//                     Additional Information
//                   </h2>

//                   <div class="additional-grid">
//                     ${cvData?.additionalCredentials.languages.length > 0 ? `
//                       <div class="additional-item">
//                         <h3 class="additional-title">Languages</h3>
//                         <ul class="additional-list">
//                           ${cvData.additionalCredentials.languages.map(lang => `
//                             <li class="additional-list-item">
//                               <span class="additional-bullet"></span>
//                               ${lang}
//                             </li>
//                           `).join('')}
//                         </ul>
//                       </div>
//                     ` : ''}

//                     ${cvData?.additionalCredentials.certifications.length > 0 ? `
//                       <div class="additional-item">
//                         <h3 class="additional-title">Certifications</h3>
//                         <ul class="additional-list">
//                           ${cvData.additionalCredentials.certifications.map(cert => `
//                             <li class="additional-list-item">
//                               <span class="additional-bullet"></span>
//                               ${cert}
//                             </li>
//                           `).join('')}
//                         </ul>
//                       </div>
//                     ` : ''}

//                     ${cvData?.additionalCredentials.awards.length > 0 ? `
//                       <div class="additional-item">
//                         <h3 class="additional-title">Awards</h3>
//                         <ul class="additional-list">
//                           ${cvData.additionalCredentials.awards.map(award => `
//                             <li class="additional-list-item">
//                               <span class="additional-bullet"></span>
//                               ${award}
//                             </li>
//                           `).join('')}
//                         </ul>
//                       </div>
//                     ` : ''}
//                   </div>
//                 </div>
//               ` : ''}
//             </div>
//           </div>

//           <script>
//             window.onload = function() {
//               setTimeout(() => {
//                 window.print();
//               }, 500);
//             }
//           </script>
//         </body>
//       </html>
//     `;

//     // Write the HTML to the new window
//     printWindow.document.write(htmlContent);
//     printWindow.document.close();

//     setActiveStep("download");
//   } catch (error) {
//     console.error("Export failed:", error);
//   } finally {
//     setExporting(false);
//   }
// };

//   return (
//     <>

//       <section className="relative pt-28 pb-20 overflow-hidden min-h-screen">
//         {/* Background Effects */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#c40116]/5 via-transparent to-[#be0117]/5" />
//         <div className="absolute top-20 left-10 w-96 h-96 bg-[#c40116]/10 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#be0117]/10 rounded-full blur-3xl animate-pulse delay-1000" />
//         <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

//         <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center max-w-5xl mx-auto mb-12"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c40116]/10 to-[#be0117]/10 rounded-full mb-6 border border-[#c40116]/20 backdrop-blur-sm"
//             >
//               <Brain className="w-4 h-4 text-[#c40116]" />
//               <span className="text-sm font-medium bg-gradient-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
//                 AI-Powered Cover Letter Generator
//               </span>
//               <Sparkles className="w-3 h-3 text-[#c40116]" />
//             </motion.div>

//             <motion.h1 className="text-5xl md:text-6xl font-bold mb-6">
//               <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                 Upload Your Resume
//               </span>
//               <br />

//               <span className="bg-gradient-to-r from-[#c40116]  to-[#be0117] bg-clip-text text-transparent">
//                 Get a Professional Cover letter
//               </span>
//             </motion.h1>

//             <motion.p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
//               Our AI automatically extracts and formats your information into a stunning, ATS-friendly CV.
//             </motion.p>

//             {/* Progress Steps */}
//             <div className="flex items-center justify-center gap-4 mb-8">
//               {[
//                 { step: "upload", label: "Upload", icon: UploadCloud },
//                 { step: "preview", label: "Preview", icon: Eye },
//                 { step: "download", label: "Download", icon: DownloadCloud },
//               ].map((step, index) => {
//                 const Icon = step.icon;
//                 const isActive = activeStep === step.step;
//                 const isComplete =
//                   (step.step === "upload" && file) ||
//                   (step.step === "preview" && cvData) ||
//                   (step.step === "download" && activeStep === "download");

//                 return (
//                   <React.Fragment key={step.step}>
//                     {index > 0 && (
//                       <div className={`w-12 h-0.5 ${
//                         isComplete ? "bg-[#c40116]" : "bg-gray-200"
//                       }`} />
//                     )}
//                     <div className="flex flex-col items-center">
//                       <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
//                         isActive
//                           ? "bg-gradient-to-r from-[#c40116] to-[#be0117] text-white shadow-lg shadow-[#c40116]/20 scale-110"
//                           : isComplete
//                           ? "bg-green-500 text-white"
//                           : "bg-gray-100 text-gray-400"
//                       }`}>
//                         <Icon className="w-5 h-5" />
//                       </div>
//                       <span className="text-xs mt-2 text-gray-600">{step.label}</span>
//                     </div>
//                   </React.Fragment>
//                 );
//               })}
//             </div>

//           </motion.div>

//           {/* Main Content */}
//           <motion.div className="max-w-7xl mx-auto">
//             <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-xl">

//               {/* Upload Step */}
//               {activeStep === "upload" && (
//                 <div className="p-8">
//                   <div
//                     onDragEnter={handleDrag}
//                     onDragLeave={handleDrag}
//                     onDragOver={handleDrag}
//                     onDrop={handleDrop}
//                     className={`relative border-3 border-dashed rounded-2xl p-16 transition-all duration-300 ${
//                       dragActive
//                         ? "border-[#c40116] bg-[#c40116]/5 scale-[1.02]"
//                         : file
//                         ? "border-green-500 bg-green-50/30"
//                         : "border-gray-200 hover:border-[#c40116]/30 hover:bg-gray-50/50"
//                     }`}
//                   >
//                     <input
//                       type="file"
//                       id="resume-upload"
//                       className="hidden"
//                       accept=".pdf,.doc,.docx,.txt"
//                       onChange={handleFileChange}
//                     />

//                     {!file ? (
//                       <div className="text-center">
//                         <motion.div
//                           animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
//                           transition={{ repeat: Infinity, duration: 3 }}
//                           className="inline-flex p-8 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-3xl mb-8"
//                         >
//                           <UploadCloud className="w-16 h-16 text-[#c40116]" />
//                         </motion.div>

//                         <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                           Drag & Drop Your Resume
//                         </h3>
//                         <p className="text-gray-500 mb-8">
//                           or{" "}
//                           <label
//                             htmlFor="resume-upload"
//                             className="text-[#c40116] font-semibold cursor-pointer hover:underline"
//                           >
//                             browse files
//                           </label>
//                         </p>

//                         <div className="flex items-center justify-center gap-4 mb-8">
//                           <div className="flex -space-x-3">
//                             {[1, 2, 3].map((i) => (
//                               <div
//                                 key={i}
//                                 className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-3 border-white"
//                               />
//                             ))}
//                           </div>
//                           <span className="text-sm text-gray-500">
//                             <span className="font-semibold text-[#c40116]">10,000+</span> CVs generated
//                           </span>
//                         </div>

//                         <div className="space-y-6">
//                           <label
//                             htmlFor="resume-upload"
//                             className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 text-lg"
//                           >
//                             <Upload className="w-5 h-5" />
//                             Choose File
//                           </label>

//                           <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
//                             <span className="flex items-center gap-2">📄 PDF</span>
//                             <span className="w-1 h-1 bg-gray-300 rounded-full" />
//                             <span className="flex items-center gap-2">📝 DOC</span>
//                             <span className="w-1 h-1 bg-gray-300 rounded-full" />
//                             <span className="flex items-center gap-2">📃 TXT</span>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="flex items-center justify-between"
//                       >
//                         <div className="flex items-center gap-6">
//                           <div className="p-5 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-2xl">
//                             <FileText className="w-12 h-12 text-[#c40116]" />
//                           </div>
//                           <div>
//                             <p className="font-semibold text-gray-900 text-xl mb-2">{file.name}</p>
//                             <div className="flex items-center gap-4">
//                               <span className="text-sm text-gray-500">
//                                 {(file.size / 1024).toFixed(2)} KB
//                               </span>
//                               <span className="w-1 h-1 bg-gray-300 rounded-full" />
//                               <span className="text-sm text-green-600 flex items-center gap-1">
//                                 <CheckCircle className="w-4 h-4" />
//                                 Ready to process
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                         <button
//                           onClick={removeFile}
//                           className="p-3 hover:bg-gray-100 rounded-full transition-colors group"
//                         >
//                           <X className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
//                         </button>
//                       </motion.div>
//                     )}
//                   </div>

//                   {/* Process Button */}
//                   {file && !uploading && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="mt-8"
//                     >
//                       <button
//                         onClick={processResume}
//                         className="w-full py-5 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
//                       >
//                         <Wand2 className="w-5 h-5" />
//                         Parse and Generate CV
//                         <ArrowRight className="w-5 h-5" />
//                       </button>
//                     </motion.div>
//                   )}

//                   {/* Processing State */}
//                   {processing && (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="mt-12 text-center"
//                     >
//                       <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#c40116]/10 to-[#be0117]/10 rounded-full">
//                         <Loader2 className="w-5 h-5 animate-spin text-[#c40116]" />
//                         <span className="text-sm font-medium text-gray-700">
//                           Parsing your resume...
//                         </span>
//                       </div>

//                       <div className="mt-8 max-w-md mx-auto">
//                         <div className="space-y-4">
//                           {[
//                             "Extracting personal information",
//                             "Parsing work experience",
//                             "Identifying skills",
//                             "Analyzing competencies",
//                             "Formatting CV",
//                           ].map((step, index) => (
//                             <motion.div
//                               key={index}
//                               initial={{ opacity: 0, x: -20 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               transition={{ delay: index * 0.2 }}
//                               className="flex items-center gap-3"
//                             >
//                               <div className="w-5 h-5 rounded-full border-2 border-[#c40116]/30 flex items-center justify-center">
//                                 <motion.div
//                                   animate={{ scale: [1, 1.2, 1] }}
//                                   transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
//                                   className="w-2 h-2 rounded-full bg-[#c40116]"
//                                 />
//                               </div>
//                               <span className="text-sm text-gray-600">{step}</span>
//                             </motion.div>
//                           ))}
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </div>
//               )}

//               {/* Preview Step */}
//               {activeStep === "preview" && cvData && (
//                 <div className="flex flex-col">
//                   {/* Preview Toolbar */}
//                   <div className="border-b border-gray-200 p-4 bg-gray-50/50">
//                     <div className="flex items-center justify-between flex-wrap gap-4">
//                       <div className="flex items-center gap-4 flex-wrap">

//                         {/* Color Scheme */}
//                         <div className="flex items-center gap-2">
//                           {(Object.keys(colorSchemes) as ColorScheme[]).map((color) => (
//                             <button
//                               key={color}
//                               onClick={() => setColorScheme(color)}
//                               className={`w-8 h-8 rounded-full transition-all ${
//                                 colorScheme === color ? 'ring-2 ring-offset-2 ring-[#c40116] scale-110' : ''
//                               }`}
//                               style={{ backgroundColor: colorSchemes[color].primary }}
//                             />
//                           ))}
//                         </div>

//                       </div>

//                       <button
//                         onClick={() => setActiveStep("download")}
//                         className="px-6 py-2 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-lg font-medium flex items-center gap-2 hover:scale-105 transition-transform"
//                       >
//                         Continue to Download
//                         <ArrowRight className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Preview Area */}
//                   <div className={`p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
//                     <motion.div
//                       initial={{ scale: 0.95, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       className={`mx-auto transition-all duration-300 ${
//                         previewMode === "mobile" ? "max-w-sm" :
//                         previewMode === "tablet" ? "max-w-2xl" :
//                         "max-w-4xl"
//                       }`}
//                     >
//                       <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${
//                         darkMode ? 'bg-gray-800 text-white' : ''
//                       }`}>
//                         {/* CV Content */}
//                         <div className="p-8">
//                           {/* Header */}
//                           <div className="text-center mb-8">
//                             <h1 className="text-4xl font-bold mb-2" style={{ color: colorSchemes[colorScheme].primary }}>
//                               {cvData.personalInfo.fullName || "Name Not Available"}
//                             </h1>
//                             <p className="text-lg text-gray-600 mb-4">{cvData.personalInfo.title || "Professional"}</p>

//                             <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
//                               {cvData.personalInfo.email && (
//                                 <span className="flex items-center gap-1">
//                                   <Mail className="w-4 h-4" style={{ color: colorSchemes[colorScheme].primary }} />
//                                   {cvData.personalInfo.email}
//                                 </span>
//                               )}
//                               {cvData.personalInfo.phone && (
//                                 <span className="flex items-center gap-1">
//                                   <Phone className="w-4 h-4" style={{ color: colorSchemes[colorScheme].primary }} />
//                                   {cvData.personalInfo.phone}
//                                 </span>
//                               )}
//                               {cvData.personalInfo.location && (
//                                 <span className="flex items-center gap-1">
//                                   <MapPin className="w-4 h-4" style={{ color: colorSchemes[colorScheme].primary }} />
//                                   {cvData.personalInfo.location}
//                                 </span>
//                               )}
//                             </div>

//                             {cvData.personalInfo.address && (
//                               <p className="text-sm text-gray-500 mt-2">{cvData.personalInfo.address}</p>
//                             )}
//                           </div>

//                           {/* Summary */}
//                           {cvData.personalInfo.summary && (
//                             <div className="mb-8">
//                               <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
//                                 <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
//                                 Professional Summary
//                               </h2>
//                               <p className="text-gray-700 leading-relaxed">
//                                 {cvData.personalInfo.summary}
//                               </p>
//                             </div>
//                           )}

//                           {/* Core Competencies */}
//                           {(cvData.coreCompetencies.technical.length > 0 ||
//                             cvData.coreCompetencies.leadership.length > 0 ||
//                             cvData.coreCompetencies.domainExpertise.length > 0) && (
//                             <div className="mb-8">
//                               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                                 <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
//                                 Core Competencies
//                               </h2>

//                               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                                 {cvData.coreCompetencies.technical.length > 0 && (
//                                   <div>
//                                     <h3 className="font-medium mb-3" style={{ color: colorSchemes[colorScheme].primary }}>
//                                       Technical
//                                     </h3>
//                                     <div className="space-y-2">
//                                       {cvData.coreCompetencies.technical.map((skill, idx) => (
//                                         <div key={idx} className="flex items-center gap-2">
//                                           <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
//                                           <span className="text-sm text-gray-700">{skill}</span>
//                                         </div>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 )}

//                                 {cvData.coreCompetencies.leadership.length > 0 && (
//                                   <div>
//                                     <h3 className="font-medium mb-3" style={{ color: colorSchemes[colorScheme].primary }}>
//                                       Leadership
//                                     </h3>
//                                     <div className="space-y-2">
//                                       {cvData.coreCompetencies.leadership.map((skill, idx) => (
//                                         <div key={idx} className="flex items-center gap-2">
//                                           <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
//                                           <span className="text-sm text-gray-700">{skill}</span>
//                                         </div>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 )}

//                                 {cvData.coreCompetencies.domainExpertise.length > 0 && (
//                                   <div>
//                                     <h3 className="font-medium mb-3" style={{ color: colorSchemes[colorScheme].primary }}>
//                                       Domain Expertise
//                                     </h3>
//                                     <div className="space-y-2">
//                                       {cvData.coreCompetencies.domainExpertise.map((skill, idx) => (
//                                         <div key={idx} className="flex items-center gap-2">
//                                           <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
//                                           <span className="text-sm text-gray-700">{skill}</span>
//                                         </div>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           )}

//                           {/* Experience */}
//                           {cvData.experience.length > 0 && (
//                             <div className="mb-8">
//                               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                                 <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
//                                 Professional Experience
//                               </h2>

//                               <div className="space-y-4">
//                                 {cvData.experience.map((exp) => (
//                                   <ExperienceCard key={exp.id} exp={exp} colorScheme={colorScheme} />
//                                 ))}
//                               </div>
//                             </div>
//                           )}

//                           {/* Skills */}
//                           {cvData.skills.length > 0 && (
//                             <div className="mb-8">
//                               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                                 <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
//                                 Technical Skills
//                               </h2>

//                               <div className="flex flex-wrap gap-2">
//                                 {cvData.skills.map((skill) => (
//                                   <span
//                                     key={skill.id}
//                                     className="px-3 py-1.5 rounded-lg text-sm"
//                                     style={{
//                                       backgroundColor: `${colorSchemes[colorScheme].primary}10`,
//                                       color: colorSchemes[colorScheme].primary,
//                                       border: `1px solid ${colorSchemes[colorScheme].primary}20`
//                                     }}
//                                   >
//                                     {skill.name}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                           )}

//                           {/* Education */}
//                           {cvData.education.length > 0 && (
//                             <div className="mb-8">
//                               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                                 <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
//                                 Education
//                               </h2>

//                               <div className="space-y-3">
//                                 {cvData.education.map((edu) => (
//                                   <div key={edu.id} className="flex items-start justify-between">
//                                     <div>
//                                       <h3 className="font-medium text-gray-900">{edu.degree}</h3>
//                                       <p className="text-sm text-gray-600">{edu.institution}</p>
//                                     </div>
//                                     {edu.period && (
//                                       <span className="text-xs text-gray-500">{edu.period}</span>
//                                     )}
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}

//                           {/* Additional Information */}
//                           {(cvData.additionalCredentials.languages.length > 0 ||
//                             cvData.additionalCredentials.certifications.length > 0 ||
//                             cvData.additionalCredentials.awards.length > 0) && (
//                             <div>
//                               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                                 <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
//                                 Additional Information
//                               </h2>

//                               <div className="grid grid-cols-1 md:sm:grid-cols-2 gap-6">
//                                 {cvData.additionalCredentials.languages.length > 0 && (
//                                   <div>
//                                     <h3 className="font-medium mb-2" style={{ color: colorSchemes[colorScheme].primary }}>
//                                       Languages
//                                     </h3>
//                                     <div className="space-y-1">
//                                       {cvData.additionalCredentials.languages.map((lang, idx) => (
//                                         <div key={idx} className="text-sm text-gray-700">{lang}</div>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 )}

//                                 {cvData.additionalCredentials.certifications.length > 0 && (
//                                   <div>
//                                     <h3 className="font-medium mb-2" style={{ color: colorSchemes[colorScheme].primary }}>
//                                       Certifications
//                                     </h3>
//                                     <div className="space-y-1">
//                                       {cvData.additionalCredentials.certifications.map((cert, idx) => (
//                                         <div key={idx} className="text-sm text-gray-700">{cert}</div>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 )}

//                                 {cvData.additionalCredentials.awards.length > 0 && (
//                                   <div>
//                                     <h3 className="font-medium mb-2" style={{ color: colorSchemes[colorScheme].primary }}>
//                                       Awards
//                                     </h3>
//                                     <div className="space-y-1">
//                                       {cvData.additionalCredentials.awards.map((award, idx) => (
//                                         <div key={idx} className="text-sm text-gray-700">{award}</div>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </div>
//               )}

//               {/* Download Step */}
//               {activeStep === "download" && cvData && (
//                 <div className="p-12 text-center">
//                   <motion.div
//                     initial={{ scale: 0.9, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     className="max-w-md mx-auto"
//                   >
//                     <div className="inline-flex p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full mb-6">
//                       <CheckCircle className="w-16 h-16 text-green-500" />
//                     </div>

//                     <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                       Your CV is Ready!
//                     </h3>
//                     <p className="text-gray-600 mb-8">
//                       Choose your preferred format and download your professional CV
//                     </p>

//                     <div className="space-y-4 mb-8">
//                       <div className="grid grid-cols-3 gap-3">
//                         {[
//                           { format: "pdf", label: "PDF", icon: FileText, color: "red" },
//                           { format: "docx", label: "Word", icon: FileText, color: "blue" },
//                           { format: "txt", label: "Text", icon: FileText, color: "gray" },
//                         ].map(({ format, label, color }) => (
//                           <button
//                             key={format}
//                             onClick={() => setExportFormat(format as any)}
//                             className={`p-4 border-2 rounded-xl transition-all ${
//                               exportFormat === format
//                                 ? `border-${color}-500 bg-${color}-50`
//                                 : 'border-gray-200 hover:border-gray-300'
//                             }`}
//                           >
//                             <FileText className={`w-8 h-8 mx-auto mb-2 ${
//                               exportFormat === format ? `text-${color}-500` : 'text-gray-400'
//                             }`} />
//                             <span className={`text-sm font-medium ${
//                               exportFormat === format ? `text-${color}-500` : 'text-gray-600'
//                             }`}>
//                               {label}
//                             </span>
//                           </button>
//                         ))}
//                       </div>

//                       <button
//                         onClick={exportCV}
//                         disabled={exporting}
//                         className="w-full py-5 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
//                       >
//                         {exporting ? (
//                           <>
//                             <Loader2 className="w-5 h-5 animate-spin" />
//                             Generating CV...
//                           </>
//                         ) : (
//                           <>
//                             <DownloadCloud className="w-5 h-5" />
//                             Download CV
//                           </>
//                         )}
//                       </button>
//                     </div>

//                     <div className="flex items-center justify-center gap-4">
//                       <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
//                         <Printer className="w-4 h-4" />
//                         Print
//                       </button>
//                       <span className="w-1 h-1 bg-gray-300 rounded-full" />
//                       <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
//                         <Share className="w-4 h-4" />
//                         Share
//                       </button>
//                       <span className="w-1 h-1 bg-gray-300 rounded-full" />
//                       <button
//                         onClick={() => setActiveStep("preview")}
//                         className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
//                       >
//                         <Eye className="w-4 h-4" />
//                         Preview Again
//                       </button>
//                     </div>
//                   </motion.div>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </section>

//     </>
//   );
// };

// export default CVGeneratorPage;

// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import Header from "../components/layouts/Header";
// // import Footer from "../components/layouts/Footer";
// // import {
// //   Upload,
// //   FileText,
// //   Award,
// //   CheckCircle,
// //   AlertCircle,
// //   X,
// //   Loader2,
// //   Star,
// //   Target,
// //   Zap,
// //   Shield,
// //   Sparkles,
// //   ChevronRight,
// //   Clock,
// //   FileCheck,
// //   Brain,
// //   Rocket,
// //   Users,
// //   Building2,
// //   GraduationCap,
// //   Briefcase,
// //   Download,
// //   Share2,
// //   BookmarkPlus,
// //   Info,
// //   ChevronDown,
// //   Eye,
// //   ArrowRight,
// //   Globe,
// //   Mail,
// //   Phone,
// //   MapPin,
// //   Linkedin,
// //   Github,
// //   Calendar,
// //   Edit3,
// //   Plus,
// //   Save,
// //   Printer,
// //   DownloadCloud,
// //   UploadCloud,
// //   Share,
// //   Star as StarIcon,
// //   Settings2,
// //   UserPlus,
// //   Zap as ZapIcon,
// //   Code,
// //   Palette,
// //   Layout,
// //   Monitor,
// //   Smartphone,
// //   Tablet,
// //   Moon,
// //   Sun,
// //   Check,
// //   ExternalLink,
// //   Layers,
// //   Grid3x3,
// //   AlignLeft,
// //   Medal,
// //   Trophy,
// //   BookOpen,
// //   Users as UsersIcon,
// //   Heart,
// //   Menu,
// //   X as XIcon,
// //   Wand2,
// //   UserCircle,
// //   AtSign,
// //   PhoneCall,
// //   MapPinned,
// //   Briefcase as BriefcaseIcon,
// //   Building,
// //   User,
// //   Mail as MailIcon,
// //   Phone as PhoneIcon,
// //   MapPin as MapPinIcon,
// //   Calendar as CalendarIcon,
// //   PenTool,
// //   Send,
// //   RefreshCw,
// //   Copy,
// //   ThumbsUp,
// //   MessageSquare,
// //   Edit,
// //   FileSignature,
// //   LetterText,
// //   Newspaper,
// //   FileEdit,
// //   FileOutput,
// //   FileDigit,
// //   FileSpreadsheet,
// //   FileCode,
// //   FileJson,
// //   FileType,
// //   FileImage,
// //   FileArchive,
// //   FileVideo,
// //   FileAudio,
// //   File,
// //   Folder,
// //   FolderOpen,
// //   FolderTree,
// //   FolderArchive,
// //   FolderOutput,
// //   FolderInput,
// //   FolderSync,
// //   FolderLock,
// //   FolderKey,
// //   FolderSearch,
// //   FolderHeart,
// //   FolderStar,
// //   FolderPlus,
// //   FolderMinus,
// //   FolderCheck,
// //   FolderX,
// //   FolderAlert,
// //   FolderWarning,
// //   FolderInfo,
// //   FolderQuestion,
// //   FolderHelp,
// //   FolderCog,
// //   FolderWrench,
// //   FolderTool,
// //   FolderPen,
// //   FolderEdit,
// //   FolderSignature,
// //   FolderSignature as FolderSignatureIcon,
// //   FolderCode,
// //   FolderTerminal,
// //   FolderCommand,
// //   FolderCloud,
// //   FolderDownload,
// //   FolderUpload,
// //   FolderSync as FolderSyncIcon,
// //   FolderRefresh,
// //   FolderRepeat,
// //   FolderLoop,
// //   FolderShuffle,
// //   FolderCopy,
// //   FolderDuplicate,
// //   FolderPaste,
// //   FolderClipboard,
// //   FolderList,
// //   FolderTree as FolderTreeIcon,
// //   FolderKanban,
// //   FolderBoard,
// //   FolderTable,
// //   FolderGrid,
// //   FolderList as FolderListIcon,
// //   FolderHeart as FolderHeartIcon,
// //   FolderStar as FolderStarIcon,
// //   FolderUser,
// //   FolderUsers,
// //   FolderGroup,
// //   FolderTeam,
// //   FolderOrganization,
// //   FolderCompany,
// //   FolderDepartment,
// //   FolderDivision,
// //   FolderSection,
// //   FolderUnit,
// //   FolderSubunit,
// //   FolderItem,
// //   FolderSubitem,
// //   FolderComponent,
// //   FolderModule,
// //   FolderPackage,
// //   FolderBundle,
// //   FolderCollection,
// //   FolderSet,
// //   FolderGroup as FolderGroupIcon,
// //   FolderCluster,
// //   FolderArray,
// //   FolderMatrix,
// //   FolderNetwork,
// //   FolderGraph,
// //   FolderTree as FolderTreeIcon2,
// //   FolderHierarchy,
// //   FolderStructure,
// //   FolderSchema,
// //   FolderBlueprint,
// //   FolderTemplate,
// //   FolderPattern,
// //   FolderModel,
// //   FolderPrototype,
// //   FolderInstance,
// //   FolderType,
// //   FolderClass,
// //   FolderObject,
// //   FolderEntity,
// //   FolderResource,
// //   FolderAsset,
// //   FolderMaterial,
// //   FolderComponent as FolderComponentIcon,
// //   FolderPart,
// //   FolderPiece,
// //   FolderFragment,
// //   FolderSegment,
// //   FolderChunk,
// //   FolderBlock,
// //   FolderElement,
// //   FolderUnit as FolderUnitIcon,
// //   FolderModule as FolderModuleIcon,
// //   FolderPackage as FolderPackageIcon,
// //   FolderLibrary,
// //   FolderFramework,
// //   FolderPlatform,
// //   FolderSystem,
// //   FolderApplication,
// //   FolderApp,
// //   FolderProgram,
// //   FolderSoftware,
// //   FolderTool as FolderToolIcon,
// //   FolderUtility,
// //   FolderHelper,
// //   FolderService,
// //   FolderAPI,
// //   FolderEndpoint,
// //   FolderRoute,
// //   FolderPath,
// //   FolderDirectory,
// //   FolderFolder,
// //   FolderFile,
// //   FolderDocument,
// //   FolderPaper,
// //   FolderNote,
// //   FolderMemo,
// //   FolderMessage,
// //   FolderLetter,
// //   FolderEmail,
// //   FolderInbox,
// //   FolderOutbox,
// //   FolderDraft,
// //   FolderSend,
// //   FolderReceive,
// //   FolderForward,
// //   FolderReply,
// //   FolderCompose,
// //   FolderWrite,
// //   FolderType as FolderTypeIcon,
// //   FolderPrint,
// //   FolderScan,
// //   FolderCopy as FolderCopyIcon,
// //   FolderMove,
// //   FolderRename,
// //   FolderDelete,
// //   FolderTrash,
// //   FolderBin,
// //   FolderRecycle,
// //   FolderRestore,
// //   FolderRecover,
// //   FolderUndo,
// //   FolderRedo,
// //   FolderHistory,
// //   FolderTimeline,
// //   FolderChronology,
// //   FolderSequence,
// //   FolderOrder,
// //   FolderSort,
// //   FolderFilter,
// //   FolderSearch as FolderSearchIcon,
// //   FolderFind,
// //   FolderLocate,
// //   FolderDiscover,
// //   FolderExplore,
// //   FolderBrowse,
// //   FolderNavigate,
// //   FolderGuide,
// //   FolderTour,
// //   FolderWalkthrough,
// //   FolderTutorial,
// //   FolderLesson,
// //   FolderCourse,
// //   FolderClass as FolderClassIcon,
// //   FolderSeminar,
// //   FolderWorkshop,
// //   FolderTraining,
// //   FolderEducation,
// //   FolderLearning,
// //   FolderKnowledge,
// //   FolderWisdom,
// //   FolderInsight,
// //   FolderUnderstanding,
// //   FolderComprehension,
// //   FolderAwareness,
// //   FolderConsciousness,
// //   FolderMind,
// //   FolderBrain,
// //   FolderIntelligence,
// //   FolderIQ,
// //   FolderEQ,
// //   FolderSQ,
// //   FolderCQ,
// //   FolderAQ,
// //   FolderBQ,
// //   FolderDQ,
// //   FolderEQ as FolderEQIcon,
// //   FolderFQ,
// //   FolderGQ,
// //   FolderHQ,
// //   FolderIQ as FolderIQIcon,
// //   FolderJQ,
// //   FolderKQ,
// //   FolderLQ,
// //   FolderMQ,
// //   FolderNQ,
// //   FolderOQ,
// //   FolderPQ,
// //   FolderQQ,
// //   FolderRQ,
// //   FolderSQ as FolderSQIcon,
// //   FolderTQ,
// //   FolderUQ,
// //   FolderVQ,
// //   FolderWQ,
// //   FolderXQ,
// //   FolderYQ,
// //   FolderZQ,
// // } from "lucide-react";
// // import axios from "axios";

// // // Types for parsed cover letter data
// // interface ParsedCoverLetterData {
// //   recipientInfo: {
// //     name: string;
// //     title: string;
// //     company: string;
// //     address?: string;
// //   };
// //   senderInfo: {
// //     fullName: string;
// //     title: string;
// //     email: string;
// //     phone: string;
// //     location: string;
// //     linkedin?: string;
// //     github?: string;
// //     portfolio?: string;
// //   };
// //   content: {
// //     introduction: string;
// //     body: string[];
// //     conclusion: string;
// //     callToAction: string;
// //   };
// //   jobInfo: {
// //     position: string;
// //     jobId?: string;
// //     source?: string;
// //     referral?: string;
// //   };
// //   highlights: {
// //     skills: string[];
// //     achievements: string[];
// //     motivations: string[];
// //   };
// //   raw?: string;
// //   metadata?: {
// //     date: string;
// //     version: string;
// //     confidence: number;
// //   };
// // }

// // // Template styles for cover letters
// // type TemplateStyle = "professional" | "modern" | "creative" | "executive";
// // type ColorScheme = "red" | "blue" | "green" | "purple" | "orange" | "gray";

// // const colorSchemes = {
// //   red: { primary: "#c40116", secondary: "#be0117", accent: "#e63545", light: "#fee2e2" },
// //   blue: { primary: "#2563eb", secondary: "#1d4ed8", accent: "#3b82f6", light: "#dbeafe" },
// //   green: { primary: "#059669", secondary: "#047857", accent: "#10b981", light: "#d1fae5" },
// //   purple: { primary: "#7c3aed", secondary: "#6d28d9", accent: "#8b5cf6", light: "#ede9fe" },
// //   orange: { primary: "#ea580c", secondary: "#c2410c", accent: "#f97316", light: "#ffedd5" },
// //   gray: { primary: "#4b5563", secondary: "#374151", accent: "#6b7280", light: "#f3f4f6" },
// // };

// // // Custom parser for cover letter content
// // const parseCoverLetterText = (text: string): ParsedCoverLetterData => {
// //   console.log("Parsing cover letter text:", text);

// //   const lines = text.split('\n').map(line => line.trim()).filter(line => line);

// //   const data: ParsedCoverLetterData = {
// //     recipientInfo: {
// //       name: "",
// //       title: "",
// //       company: "",
// //       address: "",
// //     },
// //     senderInfo: {
// //       fullName: "",
// //       title: "",
// //       email: "",
// //       phone: "",
// //       location: "",
// //       linkedin: "",
// //       github: "",
// //       portfolio: "",
// //     },
// //     content: {
// //       introduction: "",
// //       body: [],
// //       conclusion: "",
// //       callToAction: "",
// //     },
// //     jobInfo: {
// //       position: "",
// //       jobId: "",
// //       source: "",
// //       referral: "",
// //     },
// //     highlights: {
// //       skills: [],
// //       achievements: [],
// //       motivations: [],
// //     },
// //     metadata: {
// //       date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
// //       version: "1.0",
// //       confidence: 0.95,
// //     },
// //     raw: text,
// //   };

// //   let currentSection = "header";
// //   let currentBodyParagraph = "";
// //   let inBodySection = false;

// //   // Regular expressions for pattern matching
// //   const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
// //   const phoneRegex = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
// //   const dateRegex = /(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}/;
// //   const linkedinRegex = /linkedin\.com\/in\/[\w-]+/i;
// //   const githubRegex = /github\.com\/[\w-]+/i;

// //   for (let i = 0; i < lines.length; i++) {
// //     const line = lines[i];
// //     const lowerLine = line.toLowerCase();

// //     // Parse sender information from header
// //     if (i === 0 && !emailRegex.test(line) && !phoneRegex.test(line) && !dateRegex.test(line)) {
// //       data.senderInfo.fullName = line;
// //     }
// //     else if (i === 1 && !emailRegex.test(line) && !phoneRegex.test(line)) {
// //       data.senderInfo.title = line;
// //     }
// //     else if (emailRegex.test(line)) {
// //       const email = line.match(emailRegex)?.[0] || "";
// //       data.senderInfo.email = email;

// //       // Check for LinkedIn or GitHub in the same line
// //       if (linkedinRegex.test(line)) {
// //         data.senderInfo.linkedin = "https://" + (line.match(linkedinRegex)?.[0] || "");
// //       }
// //       if (githubRegex.test(line)) {
// //         data.senderInfo.github = "https://" + (line.match(githubRegex)?.[0] || "");
// //       }
// //     }
// //     else if (phoneRegex.test(line)) {
// //       data.senderInfo.phone = line.match(phoneRegex)?.[0] || "";
// //     }
// //     else if (line.includes(",") && !line.includes("@") && !data.senderInfo.location) {
// //       data.senderInfo.location = line;
// //     }

// //     // Parse date line
// //     if (dateRegex.test(line)) {
// //       data.metadata!.date = line;
// //     }

// //     // Parse recipient information (typically after date)
// //     if (line.match(/^[A-Z][a-z]+ [A-Z][a-z]+$/) && !data.recipientInfo.name) {
// //       // Looks like a person's name
// //       data.recipientInfo.name = line;
// //     }
// //     else if (line.match(/^[A-Z][a-z]+ (Director|Manager|Lead|Head|Chief|Officer|President|VP|SVP|EVP)/i) && !data.recipientInfo.title) {
// //       data.recipientInfo.title = line;
// //     }
// //     else if (line.includes("Inc.") || line.includes("LLC") || line.includes("Corp") || line.includes("Company") || line.match(/^[A-Z][a-z]+ (Corporation|Incorporated|Limited)/i)) {
// //       data.recipientInfo.company = line;
// //     }
// //     else if ((line.includes("Street") || line.includes("Avenue") || line.includes("Road") || line.includes("Lane") || line.includes("Drive")) && !data.recipientInfo.address) {
// //       data.recipientInfo.address = (data.recipientInfo.address ? data.recipientInfo.address + " " : "") + line;
// //     }

// //     // Parse subject line / job reference
// //     if (lowerLine.includes("subject:") || lowerLine.includes("re:") || lowerLine.includes("position:")) {
// //       const jobMatch = line.match(/(?:subject|re|position):\s*(.+)/i);
// //       if (jobMatch) {
// //         data.jobInfo.position = jobMatch[1].trim();
// //       }
// //     }
// //     if (lowerLine.includes("job id:") || lowerLine.includes("req id:")) {
// //       const idMatch = line.match(/(?:job id|req id):\s*(.+)/i);
// //       if (idMatch) {
// //         data.jobInfo.jobId = idMatch[1].trim();
// //       }
// //     }
// //     if (lowerLine.includes("referred by:") || lowerLine.includes("referral:")) {
// //       const refMatch = line.match(/(?:referred by|referral):\s*(.+)/i);
// //       if (refMatch) {
// //         data.jobInfo.referral = refMatch[1].trim();
// //       }
// //     }

// //     // Parse letter content
// //     if (line.match(/^Dear\s+/i)) {
// //       currentSection = "body";
// //       // Extract recipient name if not already found
// //       if (!data.recipientInfo.name) {
// //         const nameMatch = line.match(/Dear\s+([^,]+)/i);
// //         if (nameMatch) {
// //           data.recipientInfo.name = nameMatch[1].trim();
// //         }
// //       }
// //     }
// //     else if (line.match(/^Sincerely|^Best regards|^Yours truly|^Thank you/i)) {
// //       currentSection = "conclusion";
// //     }
// //     else if (currentSection === "body") {
// //       // Check if this is the introduction (first paragraph after salutation)
// //       if (data.content.introduction === "" && !inBodySection) {
// //         data.content.introduction = line;
// //         inBodySection = true;
// //       }
// //       // Check for conclusion indicators
// //       else if (line.match(/I am (confident|excited|eager|looking forward|would welcome)/i) ||
// //                line.match(/Thank you for (your time|considering|reviewing)/i)) {
// //         data.content.conclusion = line;
// //         currentSection = "conclusion";
// //       }
// //       // Check for call to action
// //       else if (line.match(/I look forward to (hearing|discussing|meeting)/i) ||
// //                line.match(/Please (contact|reach out|let me know)/i)) {
// //         data.content.callToAction = line;
// //       }
// //       // Regular body paragraph
// //       else {
// //         currentBodyParagraph += (currentBodyParagraph ? " " : "") + line;

// //         // If paragraph ends with period or we have a good length, add to body
// //         if (line.endsWith('.') && currentBodyParagraph.length > 50) {
// //           data.content.body.push(currentBodyParagraph);
// //           currentBodyParagraph = "";
// //         }
// //       }

// //       // Extract skills and achievements from body
// //       const skillIndicators = ["proficient in", "experienced with", "skilled in", "expertise in", "knowledge of"];
// //       skillIndicators.forEach(indicator => {
// //         if (lowerLine.includes(indicator)) {
// //           const skills = line.split(indicator)[1]?.split(/[,;.]/).map(s => s.trim()).filter(s => s.length > 0);
// //           if (skills) {
// //             data.highlights.skills.push(...skills);
// //           }
// //         }
// //       });

// //       const achievementIndicators = ["achieved", "accomplished", "delivered", "improved", "increased", "decreased", "reduced", "saved", "generated", "led", "managed"];
// //       achievementIndicators.forEach(indicator => {
// //         if (lowerLine.includes(indicator)) {
// //           data.highlights.achievements.push(line);
// //         }
// //       });

// //       const motivationIndicators = ["passionate about", "excited about", "interested in", "motivated by", "driven by", "inspired by"];
// //       motivationIndicators.forEach(indicator => {
// //         if (lowerLine.includes(indicator)) {
// //           data.highlights.motivations.push(line);
// //         }
// //       });
// //     }
// //     else if (currentSection === "conclusion") {
// //       if (data.content.conclusion === "") {
// //         data.content.conclusion = line;
// //       } else if (line.match(/I look forward to (hearing|discussing|meeting)/i) ||
// //                  line.match(/Please (contact|reach out|let me know)/i)) {
// //         data.content.callToAction = line;
// //       }
// //     }
// //   }

// //   // Clean up and deduplicate highlights
// //   data.highlights.skills = [...new Set(data.highlights.skills.map(s => s.replace(/[.,]$/, '')))];
// //   data.highlights.achievements = [...new Set(data.highlights.achievements)];
// //   data.highlights.motivations = [...new Set(data.highlights.motivations)];

// //   // Set default values for missing required fields
// //   if (!data.senderInfo.fullName) {
// //     data.senderInfo.fullName = "Your Name";
// //   }
// //   if (!data.recipientInfo.name) {
// //     data.recipientInfo.name = "Hiring Manager";
// //   }
// //   if (!data.jobInfo.position) {
// //     data.jobInfo.position = "the position";
// //   }
// //   if (!data.content.introduction) {
// //     data.content.introduction = "I am writing to express my strong interest in this opportunity.";
// //   }
// //   if (!data.content.conclusion) {
// //     data.content.conclusion = "Thank you for considering my application.";
// //   }
// //   if (!data.content.callToAction) {
// //     data.content.callToAction = "I look forward to the opportunity to discuss my qualifications further.";
// //   }

// //   return data;
// // };

// // // Cover Letter Preview Component
// // const CoverLetterPreview = ({ data, colorScheme, template }: {
// //   data: ParsedCoverLetterData;
// //   colorScheme: ColorScheme;
// //   template: TemplateStyle;
// // }) => {
// //   const colors = colorSchemes[colorScheme];

// //   // Template-specific styles
// //   const getTemplateStyles = () => {
// //     switch(template) {
// //       case "professional":
// //         return {
// //           container: "font-serif",
// //           header: "border-b-2 pb-6",
// //           name: "text-3xl",
// //           date: "text-right",
// //         };
// //       case "modern":
// //         return {
// //           container: "font-sans",
// //           header: "bg-gray-50 -mx-8 px-8 py-6 mb-6",
// //           name: "text-4xl font-light",
// //           date: "text-left",
// //         };
// //       case "creative":
// //         return {
// //           container: "font-['Inter']",
// //           header: "relative overflow-hidden",
// //           name: "text-5xl font-bold",
// //           date: "absolute top-0 right-0",
// //         };
// //       case "executive":
// //         return {
// //           container: "font-['Times_New_Roman']",
// //           header: "border-t-4 pt-6",
// //           name: "text-3xl uppercase tracking-wide",
// //           date: "text-center",
// //         };
// //       default:
// //         return {
// //           container: "",
// //           header: "",
// //           name: "",
// //           date: "",
// //         };
// //     }
// //   };

// //   const styles = getTemplateStyles();

// //   return (
// //     <div className={`max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden ${styles.container}`}>
// //       <div className="p-8 md:p-12">
// //         {/* Header with sender info */}
// //         <div className={`mb-8 ${styles.header}`}>
// //           <h1 className={`font-bold mb-2 ${styles.name}`} style={{ color: colors.primary }}>
// //             {data.senderInfo.fullName}
// //           </h1>
// //           <p className="text-lg text-gray-600 mb-4">{data.senderInfo.title}</p>

// //           <div className="flex flex-wrap gap-4 text-sm text-gray-600">
// //             {data.senderInfo.email && (
// //               <span className="flex items-center gap-1">
// //                 <Mail className="w-4 h-4" style={{ color: colors.primary }} />
// //                 {data.senderInfo.email}
// //               </span>
// //             )}
// //             {data.senderInfo.phone && (
// //               <span className="flex items-center gap-1">
// //                 <Phone className="w-4 h-4" style={{ color: colors.primary }} />
// //                 {data.senderInfo.phone}
// //               </span>
// //             )}
// //             {data.senderInfo.location && (
// //               <span className="flex items-center gap-1">
// //                 <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
// //                 {data.senderInfo.location}
// //               </span>
// //             )}
// //           </div>

// //           <div className="flex gap-3 mt-3">
// //             {data.senderInfo.linkedin && (
// //               <a href={data.senderInfo.linkedin} target="_blank" rel="noopener noreferrer"
// //                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
// //                 <Linkedin className="w-4 h-4" />
// //                 LinkedIn
// //               </a>
// //             )}
// //             {data.senderInfo.github && (
// //               <a href={data.senderInfo.github} target="_blank" rel="noopener noreferrer"
// //                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
// //                 <Github className="w-4 h-4" />
// //                 GitHub
// //               </a>
// //             )}
// //           </div>
// //         </div>

// //         {/* Date */}
// //         <div className={`mb-6 text-gray-500 ${styles.date}`}>
// //           {data.metadata?.date}
// //         </div>

// //         {/* Recipient Info */}
// //         <div className="mb-8">
// //           <p className="font-semibold">{data.recipientInfo.name}</p>
// //           <p>{data.recipientInfo.title}</p>
// //           <p>{data.recipientInfo.company}</p>
// //           {data.recipientInfo.address && (
// //             <p className="text-sm text-gray-600 mt-1">{data.recipientInfo.address}</p>
// //           )}
// //         </div>

// //         {/* Subject Line */}
// //         <div className="mb-6 text-sm text-gray-600">
// //           <span className="font-semibold">Re:</span> {data.jobInfo.position}
// //           {data.jobInfo.jobId && <span> (Job ID: {data.jobInfo.jobId})</span>}
// //         </div>

// //         {/* Salutation */}
// //         <div className="mb-6">
// //           <p>Dear {data.recipientInfo.name},</p>
// //         </div>

// //         {/* Introduction */}
// //         <div className="mb-4 leading-relaxed">
// //           <p>{data.content.introduction}</p>
// //         </div>

// //         {/* Body Paragraphs */}
// //         {data.content.body.map((paragraph, idx) => (
// //           <div key={idx} className="mb-4 leading-relaxed">
// //             <p>{paragraph}</p>
// //           </div>
// //         ))}

// //         {/* Conclusion */}
// //         <div className="mb-4 leading-relaxed">
// //           <p>{data.content.conclusion}</p>
// //         </div>

// //         {/* Call to Action */}
// //         <div className="mb-8 leading-relaxed font-medium">
// //           <p>{data.content.callToAction}</p>
// //         </div>

// //         {/* Closing */}
// //         <div className="mt-8">
// //           <p>Sincerely,</p>
// //           <p className="font-semibold mt-4">{data.senderInfo.fullName}</p>
// //         </div>

// //         {/* Highlights Section (optional) */}
// //         {(data.highlights.skills.length > 0 || data.highlights.achievements.length > 0) && (
// //           <div className="mt-8 pt-6 border-t border-gray-200">
// //             <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
// //               Key Highlights
// //             </h3>
// //             <div className="grid sm:grid-cols-2 gap-4">
// //               {data.highlights.skills.length > 0 && (
// //                 <div>
// //                   <h4 className="text-xs font-medium text-gray-400 mb-2">Skills</h4>
// //                   <div className="flex flex-wrap gap-2">
// //                     {data.highlights.skills.slice(0, 5).map((skill, idx) => (
// //                       <span key={idx} className="text-xs px-2 py-1 rounded-full"
// //                             style={{ backgroundColor: colors.light, color: colors.primary }}>
// //                         {skill}
// //                       </span>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //               {data.highlights.achievements.length > 0 && (
// //                 <div>
// //                   <h4 className="text-xs font-medium text-gray-400 mb-2">Achievements</h4>
// //                   <ul className="text-xs space-y-1">
// //                     {data.highlights.achievements.slice(0, 3).map((achievement, idx) => (
// //                       <li key={idx} className="flex items-start gap-1">
// //                         <span className="text-green-500">✓</span>
// //                         <span>{achievement.substring(0, 60)}...</span>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // // Main Component
// // const CoverLetterGeneratorPage = () => {
// //   const [file, setFile] = useState<File | null>(null);
// //   const [uploading, setUploading] = useState(false);
// //   const [processing, setProcessing] = useState(false);
// //   const [coverLetterData, setCoverLetterData] = useState<ParsedCoverLetterData | null>(null);
// //   const [dragActive, setDragActive] = useState(false);
// //   const [activeStep, setActiveStep] = useState<"upload" | "preview" | "download">("upload");
// //   const [selectedTemplate, setSelectedTemplate] = useState<TemplateStyle>("modern");
// //   const [colorScheme, setColorScheme] = useState<ColorScheme>("red");
// //   const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
// //   const [darkMode, setDarkMode] = useState(false);
// //   const [exportFormat, setExportFormat] = useState<"pdf" | "docx" | "txt">("pdf");
// //   const [exporting, setExporting] = useState(false);
// //   const [rawText, setRawText] = useState("");
// //   const [jobDescription, setJobDescription] = useState("");
// //   const [companyName, setCompanyName] = useState("");
// //   const [showJobForm, setShowJobForm] = useState(false);

// //   // Handle file upload
// //   const handleDrag = (e: React.DragEvent) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (e.type === "dragenter" || e.type === "dragover") {
// //       setDragActive(true);
// //     } else if (e.type === "dragleave") {
// //       setDragActive(false);
// //     }
// //   };

// //   const handleDrop = (e: React.DragEvent) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setDragActive(false);

// //     const droppedFile = e.dataTransfer.files[0];
// //     if (
// //       droppedFile &&
// //       (droppedFile.type === "application/pdf" ||
// //         droppedFile.type === "application/msword" ||
// //         droppedFile.type ===
// //           "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
// //         droppedFile.type === "text/plain")
// //     ) {
// //       setFile(droppedFile);
// //     }
// //   };

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files && e.target.files[0]) {
// //       setFile(e.target.files[0]);
// //     }
// //   };

// //   const removeFile = () => {
// //     setFile(null);
// //     setCoverLetterData(null);
// //     setRawText("");
// //     setActiveStep("upload");
// //   };

// //   // Process resume and generate cover letter
// //   const processResume = async () => {
// //     if (!file) return;

// //     setUploading(true);
// //     setProcessing(true);

// //     try {
// //       const formData = new FormData();
// //       formData.append("file", file);

// //       // Add optional parameters
// //       if (jobDescription) {
// //         formData.append("job_description", jobDescription);
// //       }
// //       if (companyName) {
// //         formData.append("company_name", companyName);
// //       }

// //       const response = await axios.post(
// //            `https://ai.aryuacademy.com/api/v1/resume/cv/generate-from-file`,
// //         formData,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //           },
// //         }
// //       );

// //       console.log("API Response:", response.data);

// //       // Get the cover letter content from the response
// //       // Adjust this based on your actual API response structure
// //       const coverLetterContent =response.data.data.cv_content

// //                                  //       const cvContent = response.data.data.cv_content;

// //       setRawText(coverLetterContent);

// //       // Parse the text data
// //       const parsed = parseCoverLetterText(coverLetterContent);
// //       console.log("Parsed Cover Letter Data:", parsed);

// //       setCoverLetterData(parsed);
// //       setActiveStep("preview");

// //     } catch (error) {
// //       console.error("Error generating cover letter:", error);
// //     } finally {
// //       setUploading(false);
// //       setProcessing(false);
// //     }
// //   };

// //   // Export Cover Letter
// //   const exportCoverLetter = async () => {
// //     setExporting(true);
// //     try {
// //       await new Promise(resolve => setTimeout(resolve, 1500));

// //       // Create a new window for PDF generation
// //       const printWindow = window.open('', '_blank');
// //       if (!printWindow) {
// //         alert('Please allow pop-ups to download PDF');
// //         setExporting(false);
// //         return;
// //       }

// //       const colors = colorSchemes[colorScheme];

// //       // Generate HTML content for PDF
// //       const htmlContent = `
// //         <!DOCTYPE html>
// //         <html>
// //           <head>
// //             <title>${coverLetterData?.senderInfo.fullName} - Cover Letter</title>
// //             <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Times+New+Roman&display=swap" rel="stylesheet">
// //             <style>
// //               * {
// //                 margin: 0;
// //                 padding: 0;
// //                 box-sizing: border-box;
// //               }

// //               body {
// //                 font-family: 'Inter', sans-serif;
// //                 background: #f3f4f6;
// //                 padding: 40px;
// //                 line-height: 1.6;
// //               }

// //               .letter-container {
// //                 max-width: 800px;
// //                 margin: 0 auto;
// //                 background: white;
// //                 border-radius: 24px;
// //                 box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
// //                 overflow: hidden;
// //               }

// //               .letter-content {
// //                 padding: 48px;
// //               }

// //               .sender-name {
// //                 font-size: 32px;
// //                 font-weight: 700;
// //                 color: ${colors.primary};
// //                 margin-bottom: 8px;
// //               }

// //               .sender-title {
// //                 font-size: 18px;
// //                 color: #4b5563;
// //                 margin-bottom: 16px;
// //               }

// //               .contact-info {
// //                 display: flex;
// //                 flex-wrap: wrap;
// //                 gap: 16px;
// //                 font-size: 14px;
// //                 color: #6b7280;
// //                 margin-bottom: 24px;
// //               }

// //               .date {
// //                 color: #9ca3af;
// //                 margin-bottom: 24px;
// //               }

// //               .recipient-info {
// //                 margin-bottom: 24px;
// //               }

// //               .recipient-name {
// //                 font-weight: 600;
// //               }

// //               .subject-line {
// //                 margin-bottom: 24px;
// //                 font-size: 14px;
// //                 color: #4b5563;
// //               }

// //               .salutation {
// //                 margin-bottom: 24px;
// //               }

// //               .paragraph {
// //                 margin-bottom: 20px;
// //                 text-align: justify;
// //               }

// //               .closing {
// //                 margin-top: 32px;
// //               }

// //               .signature {
// //                 margin-top: 16px;
// //                 font-weight: 600;
// //               }

// //               .highlights {
// //                 margin-top: 40px;
// //                 padding-top: 24px;
// //                 border-top: 1px solid #e5e7eb;
// //               }

// //               @media print {
// //                 body {
// //                   background: white;
// //                   padding: 0;
// //                 }
// //                 .letter-container {
// //                   box-shadow: none;
// //                   border-radius: 0;
// //                 }
// //               }
// //             </style>
// //           </head>
// //           <body>
// //             <div class="letter-container">
// //               <div class="letter-content">
// //                 <!-- Sender Info -->
// //                 <h1 class="sender-name">${coverLetterData?.senderInfo.fullName || ''}</h1>
// //                 <p class="sender-title">${coverLetterData?.senderInfo.title || ''}</p>

// //                 <div class="contact-info">
// //                   ${coverLetterData?.senderInfo.email ? `
// //                     <span>✉️ ${coverLetterData.senderInfo.email}</span>
// //                   ` : ''}
// //                   ${coverLetterData?.senderInfo.phone ? `
// //                     <span>📱 ${coverLetterData.senderInfo.phone}</span>
// //                   ` : ''}
// //                   ${coverLetterData?.senderInfo.location ? `
// //                     <span>📍 ${coverLetterData.senderInfo.location}</span>
// //                   ` : ''}
// //                 </div>

// //                 <!-- Date -->
// //                 <div class="date">${coverLetterData?.metadata?.date || ''}</div>

// //                 <!-- Recipient Info -->
// //                 <div class="recipient-info">
// //                   <p class="recipient-name">${coverLetterData?.recipientInfo.name || ''}</p>
// //                   <p>${coverLetterData?.recipientInfo.title || ''}</p>
// //                   <p>${coverLetterData?.recipientInfo.company || ''}</p>
// //                   ${coverLetterData?.recipientInfo.address ? `
// //                     <p>${coverLetterData.recipientInfo.address}</p>
// //                   ` : ''}
// //                 </div>

// //                 <!-- Subject Line -->
// //                 <div class="subject-line">
// //                   <strong>Re:</strong> ${coverLetterData?.jobInfo.position || ''}
// //                   ${coverLetterData?.jobInfo.jobId ? ` (Job ID: ${coverLetterData.jobInfo.jobId})` : ''}
// //                 </div>

// //                 <!-- Salutation -->
// //                 <div class="salutation">Dear ${coverLetterData?.recipientInfo.name || 'Hiring Manager'},</div>

// //                 <!-- Introduction -->
// //                 <div class="paragraph">${coverLetterData?.content.introduction || ''}</div>

// //                 <!-- Body -->
// //                 ${coverLetterData?.content.body.map(p => `
// //                   <div class="paragraph">${p}</div>
// //                 `).join('')}

// //                 <!-- Conclusion -->
// //                 <div class="paragraph">${coverLetterData?.content.conclusion || ''}</div>

// //                 <!-- Call to Action -->
// //                 <div class="paragraph"><strong>${coverLetterData?.content.callToAction || ''}</strong></div>

// //                 <!-- Closing -->
// //                 <div class="closing">
// //                   <p>Sincerely,</p>
// //                   <p class="signature">${coverLetterData?.senderInfo.fullName || ''}</p>
// //                 </div>

// //                 <!-- Optional Highlights -->
// //                 ${(coverLetterData?.highlights.skills.length || 0) > 0 ? `
// //                   <div class="highlights">
// //                     <h3 style="font-size: 14px; color: ${colors.primary}; margin-bottom: 12px;">Key Skills</h3>
// //                     <div style="display: flex; flex-wrap: wrap; gap: 8px;">
// //                       ${coverLetterData?.highlights.skills.slice(0, 8).map(skill => `
// //                         <span style="font-size: 12px; padding: 4px 12px; background: ${colors.light}; color: ${colors.primary}; border-radius: 16px;">
// //                           ${skill}
// //                         </span>
// //                       `).join('')}
// //                     </div>
// //                   </div>
// //                 ` : ''}
// //               </div>
// //             </div>

// //             <script>
// //               window.onload = function() {
// //                 setTimeout(() => window.print(), 500);
// //               }
// //             </script>
// //           </body>
// //         </html>
// //       `;

// //       printWindow.document.write(htmlContent);
// //       printWindow.document.close();

// //       setActiveStep("download");
// //     } catch (error) {
// //       console.error("Export failed:", error);
// //     } finally {
// //       setExporting(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <Header />

// //       <section className="relative pt-28 pb-20 overflow-hidden min-h-screen">
// //         {/* Background Effects */}
// //         <div className="absolute inset-0 bg-gradient-to-br from-[#c40116]/5 via-transparent to-[#be0117]/5" />
// //         <div className="absolute top-20 left-10 w-96 h-96 bg-[#c40116]/10 rounded-full blur-3xl animate-pulse" />
// //         <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#be0117]/10 rounded-full blur-3xl animate-pulse delay-1000" />
// //         <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

// //         <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
// //           {/* Header */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="text-center max-w-5xl mx-auto mb-12"
// //           >
// //             <motion.div
// //               initial={{ scale: 0.9, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               transition={{ delay: 0.2 }}
// //               className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c40116]/10 to-[#be0117]/10 rounded-full mb-6 border border-[#c40116]/20 backdrop-blur-sm"
// //             >
// //               <PenTool className="w-4 h-4 text-[#c40116]" />
// //               <span className="text-sm font-medium bg-gradient-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
// //                 AI-Powered Cover Letter Generator
// //               </span>
// //               <Sparkles className="w-3 h-3 text-[#c40116]" />
// //             </motion.div>

// //             <motion.h1 className="text-5xl md:text-6xl font-bold mb-6">
// //               <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
// //                 Upload Your Resume,
// //               </span>
// //               <br />
// //               <span className="bg-gradient-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
// //                 Get a Professional Cover Letter
// //               </span>
// //             </motion.h1>

// //             <motion.p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
// //               Our AI analyzes your resume and generates a tailored, compelling cover letter that highlights your strengths and matches the job requirements.
// //             </motion.p>

// //             {/* Progress Steps */}
// //             <div className="flex items-center justify-center gap-4 mb-8">
// //               {[
// //                 { step: "upload", label: "Upload Resume", icon: UploadCloud },
// //                 { step: "preview", label: "Review Letter", icon: Eye },
// //                 { step: "download", label: "Download", icon: DownloadCloud },
// //               ].map((step, index) => {
// //                 const Icon = step.icon;
// //                 const isActive = activeStep === step.step;
// //                 const isComplete =
// //                   (step.step === "upload" && file) ||
// //                   (step.step === "preview" && coverLetterData) ||
// //                   (step.step === "download" && activeStep === "download");

// //                 return (
// //                   <React.Fragment key={step.step}>
// //                     {index > 0 && (
// //                       <div className={`w-12 h-0.5 ${
// //                         isComplete ? "bg-[#c40116]" : "bg-gray-200"
// //                       }`} />
// //                     )}
// //                     <div className="flex flex-col items-center">
// //                       <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
// //                         isActive
// //                           ? "bg-gradient-to-r from-[#c40116] to-[#be0117] text-white shadow-lg shadow-[#c40116]/20 scale-110"
// //                           : isComplete
// //                           ? "bg-green-500 text-white"
// //                           : "bg-gray-100 text-gray-400"
// //                       }`}>
// //                         <Icon className="w-5 h-5" />
// //                       </div>
// //                       <span className="text-xs mt-2 text-gray-600">{step.label}</span>
// //                     </div>
// //                   </React.Fragment>
// //                 );
// //               })}
// //             </div>
// //           </motion.div>

// //           {/* Main Content */}
// //           <motion.div className="max-w-7xl mx-auto">
// //             <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-xl">

// //               {/* Upload Step */}
// //               {activeStep === "upload" && (
// //                 <div className="p-8">
// //                   {/* Job Details Form Toggle */}
// //                   <div className="mb-6 flex justify-center">
// //                     <button
// //                       onClick={() => setShowJobForm(!showJobForm)}
// //                       className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors"
// //                     >
// //                       <Briefcase className="w-4 h-4" />
// //                       {showJobForm ? "Hide Job Details" : "Add Job Details (Optional)"}
// //                       <ChevronDown className={`w-4 h-4 transition-transform ${showJobForm ? 'rotate-180' : ''}`} />
// //                     </button>
// //                   </div>

// //                   {/* Job Details Form */}
// //                   <AnimatePresence>
// //                     {showJobForm && (
// //                       <motion.div
// //                         initial={{ opacity: 0, height: 0 }}
// //                         animate={{ opacity: 1, height: "auto" }}
// //                         exit={{ opacity: 0, height: 0 }}
// //                         className="overflow-hidden mb-8"
// //                       >
// //                         <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
// //                           <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
// //                             <Target className="w-5 h-5 text-[#c40116]" />
// //                             Job Details (Optional - Helps Tailor Your Letter)
// //                           </h3>
// //                           <div className="space-y-4">
// //                             <div>
// //                               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                                 Company Name
// //                               </label>
// //                               <input
// //                                 type="text"
// //                                 value={companyName}
// //                                 onChange={(e) => setCompanyName(e.target.value)}
// //                                 placeholder="e.g., Acme Corporation"
// //                                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c40116] focus:border-transparent outline-none transition-all"
// //                               />
// //                             </div>
// //                             <div>
// //                               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                                 Job Description (Paste the job posting)
// //                               </label>
// //                               <textarea
// //                                 value={jobDescription}
// //                                 onChange={(e) => setJobDescription(e.target.value)}
// //                                 placeholder="Paste the job description here to get a more targeted cover letter..."
// //                                 rows={6}
// //                                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c40116] focus:border-transparent outline-none transition-all resize-none"
// //                               />
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </motion.div>
// //                     )}
// //                   </AnimatePresence>

// //                   {/* File Upload Area */}
// //                   <div
// //                     onDragEnter={handleDrag}
// //                     onDragLeave={handleDrag}
// //                     onDragOver={handleDrag}
// //                     onDrop={handleDrop}
// //                     className={`relative border-3 border-dashed rounded-2xl p-16 transition-all duration-300 ${
// //                       dragActive
// //                         ? "border-[#c40116] bg-[#c40116]/5 scale-[1.02]"
// //                         : file
// //                         ? "border-green-500 bg-green-50/30"
// //                         : "border-gray-200 hover:border-[#c40116]/30 hover:bg-gray-50/50"
// //                     }`}
// //                   >
// //                     <input
// //                       type="file"
// //                       id="resume-upload"
// //                       className="hidden"
// //                       accept=".pdf,.doc,.docx,.txt"
// //                       onChange={handleFileChange}
// //                     />

// //                     {!file ? (
// //                       <div className="text-center">
// //                         <motion.div
// //                           animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
// //                           transition={{ repeat: Infinity, duration: 3 }}
// //                           className="inline-flex p-8 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-3xl mb-8"
// //                         >
// //                           <FileSignature className="w-16 h-16 text-[#c40116]" />
// //                         </motion.div>

// //                         <h3 className="text-2xl font-bold text-gray-900 mb-3">
// //                           Upload Your Resume
// //                         </h3>
// //                         <p className="text-gray-500 mb-8">
// //                           or{" "}
// //                           <label
// //                             htmlFor="resume-upload"
// //                             className="text-[#c40116] font-semibold cursor-pointer hover:underline"
// //                           >
// //                             browse files
// //                           </label>
// //                         </p>

// //                         <div className="flex items-center justify-center gap-4 mb-8">
// //                           <div className="flex -space-x-3">
// //                             {[1, 2, 3].map((i) => (
// //                               <div
// //                                 key={i}
// //                                 className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-3 border-white"
// //                               />
// //                             ))}
// //                           </div>
// //                           <span className="text-sm text-gray-500">
// //                             <span className="font-semibold text-[#c40116]">5,000+</span> cover letters generated
// //                           </span>
// //                         </div>

// //                         <div className="space-y-6">
// //                           <label
// //                             htmlFor="resume-upload"
// //                             className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 text-lg"
// //                           >
// //                             <Upload className="w-5 h-5" />
// //                             Choose Resume File
// //                           </label>

// //                           <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
// //                             <span className="flex items-center gap-2">📄 PDF</span>
// //                             <span className="w-1 h-1 bg-gray-300 rounded-full" />
// //                             <span className="flex items-center gap-2">📝 DOCX</span>
// //                             <span className="w-1 h-1 bg-gray-300 rounded-full" />
// //                             <span className="flex items-center gap-2">📃 TXT</span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ) : (
// //                       <motion.div
// //                         initial={{ opacity: 0, y: 10 }}
// //                         animate={{ opacity: 1, y: 0 }}
// //                         className="flex items-center justify-between"
// //                       >
// //                         <div className="flex items-center gap-6">
// //                           <div className="p-5 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-2xl">
// //                             <FileText className="w-12 h-12 text-[#c40116]" />
// //                           </div>
// //                           <div>
// //                             <p className="font-semibold text-gray-900 text-xl mb-2">{file.name}</p>
// //                             <div className="flex items-center gap-4">
// //                               <span className="text-sm text-gray-500">
// //                                 {(file.size / 1024).toFixed(2)} KB
// //                               </span>
// //                               <span className="w-1 h-1 bg-gray-300 rounded-full" />
// //                               <span className="text-sm text-green-600 flex items-center gap-1">
// //                                 <CheckCircle className="w-4 h-4" />
// //                                 Ready to generate
// //                               </span>
// //                             </div>
// //                           </div>
// //                         </div>
// //                         <button
// //                           onClick={removeFile}
// //                           className="p-3 hover:bg-gray-100 rounded-full transition-colors group"
// //                         >
// //                           <X className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
// //                         </button>
// //                       </motion.div>
// //                     )}
// //                   </div>

// //                   {/* Generate Button */}
// //                   {file && !uploading && (
// //                     <motion.div
// //                       initial={{ opacity: 0, y: 10 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       className="mt-8"
// //                     >
// //                       <button
// //                         onClick={processResume}
// //                         className="w-full py-5 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
// //                       >
// //                         <Wand2 className="w-5 h-5" />
// //                         Generate Cover Letter
// //                         <ArrowRight className="w-5 h-5" />
// //                       </button>
// //                     </motion.div>
// //                   )}

// //                   {/* Processing State */}
// //                   {processing && (
// //                     <motion.div
// //                       initial={{ opacity: 0 }}
// //                       animate={{ opacity: 1 }}
// //                       className="mt-12 text-center"
// //                     >
// //                       <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#c40116]/10 to-[#be0117]/10 rounded-full">
// //                         <Loader2 className="w-5 h-5 animate-spin text-[#c40116]" />
// //                         <span className="text-sm font-medium text-gray-700">
// //                           Crafting your personalized cover letter...
// //                         </span>
// //                       </div>

// //                       <div className="mt-8 max-w-md mx-auto">
// //                         <div className="space-y-4">
// //                           {[
// //                             "Analyzing your resume",
// //                             "Identifying key achievements",
// //                             "Matching skills to job requirements",
// //                             "Crafting compelling introduction",
// //                             "Writing persuasive body paragraphs",
// //                             "Polishing final draft",
// //                           ].map((step, index) => (
// //                             <motion.div
// //                               key={index}
// //                               initial={{ opacity: 0, x: -20 }}
// //                               animate={{ opacity: 1, x: 0 }}
// //                               transition={{ delay: index * 0.15 }}
// //                               className="flex items-center gap-3"
// //                             >
// //                               <div className="w-5 h-5 rounded-full border-2 border-[#c40116]/30 flex items-center justify-center">
// //                                 <motion.div
// //                                   animate={{ scale: [1, 1.2, 1] }}
// //                                   transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
// //                                   className="w-2 h-2 rounded-full bg-[#c40116]"
// //                                 />
// //                               </div>
// //                               <span className="text-sm text-gray-600">{step}</span>
// //                             </motion.div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     </motion.div>
// //                   )}
// //                 </div>
// //               )}

// //               {/* Preview Step */}
// //               {activeStep === "preview" && coverLetterData && (
// //                 <div className="flex flex-col">
// //                   {/* Preview Toolbar */}
// //                   <div className="border-b border-gray-200 p-4 bg-gray-50/50">
// //                     <div className="flex items-center justify-between flex-wrap gap-4">
// //                       <div className="flex items-center gap-4 flex-wrap">
// //                         {/* Template Selection */}
// //                         <select
// //                           value={selectedTemplate}
// //                           onChange={(e) => setSelectedTemplate(e.target.value as TemplateStyle)}
// //                           className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c40116] focus:border-transparent outline-none"
// //                         >
// //                           <option value="professional">Professional</option>
// //                           <option value="modern">Modern</option>
// //                           <option value="creative">Creative</option>
// //                           <option value="executive">Executive</option>
// //                         </select>

// //                         {/* Color Scheme */}
// //                         <div className="flex items-center gap-2">
// //                           {(Object.keys(colorSchemes) as ColorScheme[]).map((color) => (
// //                             <button
// //                               key={color}
// //                               onClick={() => setColorScheme(color)}
// //                               className={`w-8 h-8 rounded-full transition-all ${
// //                                 colorScheme === color ? 'ring-2 ring-offset-2 ring-[#c40116] scale-110' : ''
// //                               }`}
// //                               style={{ backgroundColor: colorSchemes[color].primary }}
// //                             />
// //                           ))}
// //                         </div>

// //                         {/* Preview Device Size */}
// //                         <div className="flex items-center gap-1 border-l pl-4 ml-2">
// //                           <button
// //                             onClick={() => setPreviewMode("desktop")}
// //                             className={`p-2 rounded-lg transition-colors ${
// //                               previewMode === "desktop" ? 'bg-gray-200' : 'hover:bg-gray-100'
// //                             }`}
// //                           >
// //                             <Monitor className="w-4 h-4" />
// //                           </button>
// //                           <button
// //                             onClick={() => setPreviewMode("tablet")}
// //                             className={`p-2 rounded-lg transition-colors ${
// //                               previewMode === "tablet" ? 'bg-gray-200' : 'hover:bg-gray-100'
// //                             }`}
// //                           >
// //                             <Tablet className="w-4 h-4" />
// //                           </button>
// //                           <button
// //                             onClick={() => setPreviewMode("mobile")}
// //                             className={`p-2 rounded-lg transition-colors ${
// //                               previewMode === "mobile" ? 'bg-gray-200' : 'hover:bg-gray-100'
// //                             }`}
// //                           >
// //                             <Smartphone className="w-4 h-4" />
// //                           </button>
// //                         </div>

// //                         {/* Dark Mode Toggle */}
// //                         <button
// //                           onClick={() => setDarkMode(!darkMode)}
// //                           className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
// //                         >
// //                           {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
// //                         </button>
// //                       </div>

// //                       <button
// //                         onClick={() => setActiveStep("download")}
// //                         className="px-6 py-2 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-lg font-medium flex items-center gap-2 hover:scale-105 transition-transform"
// //                       >
// //                         Continue to Download
// //                         <ArrowRight className="w-4 h-4" />
// //                       </button>
// //                     </div>
// //                   </div>

// //                   {/* Preview Area */}
// //                   <div className={`p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
// //                     <motion.div
// //                       initial={{ scale: 0.95, opacity: 0 }}
// //                       animate={{ scale: 1, opacity: 1 }}
// //                       className={`mx-auto transition-all duration-300 ${
// //                         previewMode === "mobile" ? "max-w-sm" :
// //                         previewMode === "tablet" ? "max-w-2xl" :
// //                         "max-w-4xl"
// //                       }`}
// //                     >
// //                       <CoverLetterPreview
// //                         data={coverLetterData}
// //                         colorScheme={colorScheme}
// //                         template={selectedTemplate}
// //                       />
// //                     </motion.div>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Download Step */}
// //               {activeStep === "download" && coverLetterData && (
// //                 <div className="p-12 text-center">
// //                   <motion.div
// //                     initial={{ scale: 0.9, opacity: 0 }}
// //                     animate={{ scale: 1, opacity: 1 }}
// //                     className="max-w-md mx-auto"
// //                   >
// //                     <div className="inline-flex p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full mb-6">
// //                       <CheckCircle className="w-16 h-16 text-green-500" />
// //                     </div>

// //                     <h3 className="text-2xl font-bold text-gray-900 mb-3">
// //                       Your Cover Letter is Ready!
// //                     </h3>
// //                     <p className="text-gray-600 mb-8">
// //                       Choose your preferred format and download your professional cover letter
// //                     </p>

// //                     <div className="space-y-4 mb-8">
// //                       <div className="grid grid-cols-3 gap-3">
// //                         {[
// //                           { format: "pdf", label: "PDF", icon: FileText, color: "red" },
// //                           { format: "docx", label: "Word", icon: FileText, color: "blue" },
// //                           { format: "txt", label: "Text", icon: FileText, color: "gray" },
// //                         ].map(({ format, label, color }) => (
// //                           <button
// //                             key={format}
// //                             onClick={() => setExportFormat(format as any)}
// //                             className={`p-4 border-2 rounded-xl transition-all ${
// //                               exportFormat === format
// //                                 ? `border-${color}-500 bg-${color}-50`
// //                                 : 'border-gray-200 hover:border-gray-300'
// //                             }`}
// //                           >
// //                             <FileText className={`w-8 h-8 mx-auto mb-2 ${
// //                               exportFormat === format ? `text-${color}-500` : 'text-gray-400'
// //                             }`} />
// //                             <span className={`text-sm font-medium ${
// //                               exportFormat === format ? `text-${color}-500` : 'text-gray-600'
// //                             }`}>
// //                               {label}
// //                             </span>
// //                           </button>
// //                         ))}
// //                       </div>

// //                       <button
// //                         onClick={exportCoverLetter}
// //                         disabled={exporting}
// //                         className="w-full py-5 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
// //                       >
// //                         {exporting ? (
// //                           <>
// //                             <Loader2 className="w-5 h-5 animate-spin" />
// //                             Generating Cover Letter...
// //                           </>
// //                         ) : (
// //                           <>
// //                             <DownloadCloud className="w-5 h-5" />
// //                             Download Cover Letter
// //                           </>
// //                         )}
// //                       </button>
// //                     </div>

// //                     <div className="flex items-center justify-center gap-4">
// //                       <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
// //                         <Printer className="w-4 h-4" />
// //                         Print
// //                       </button>
// //                       <span className="w-1 h-1 bg-gray-300 rounded-full" />
// //                       <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
// //                         <Copy className="w-4 h-4" />
// //                         Copy to Clipboard
// //                       </button>
// //                       <span className="w-1 h-1 bg-gray-300 rounded-full" />
// //                       <button
// //                         onClick={() => setActiveStep("preview")}
// //                         className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
// //                       >
// //                         <Eye className="w-4 h-4" />
// //                         Preview Again
// //                       </button>
// //                     </div>
// //                   </motion.div>
// //                 </div>
// //               )}
// //             </div>
// //           </motion.div>

// //           {/* Tips Section */}
// //           {activeStep === "upload" && (
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: 0.5 }}
// //               className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
// //             >
// //               {[
// //                 {
// //                   icon: Target,
// //                   title: "Tailored Content",
// //                   description: "AI analyzes your resume and job requirements to create a personalized cover letter"
// //                 },
// //                 {
// //                   icon: Zap,
// //                   title: "ATS-Friendly",
// //                   description: "Optimized formatting that passes through applicant tracking systems"
// //                 },
// //                 {
// //                   icon: Shield,
// //                   title: "Professional Tone",
// //                   description: "Maintains the perfect balance of confidence and professionalism"
// //                 }
// //               ].map((tip, idx) => {
// //                 const Icon = tip.icon;
// //                 return (
// //                   <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
// //                     <div className="w-12 h-12 bg-gradient-to-br from-[#c40116]/10 to-[#be0117]/10 rounded-xl flex items-center justify-center mb-4">
// //                       <Icon className="w-6 h-6 text-[#c40116]" />
// //                     </div>
// //                     <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
// //                     <p className="text-sm text-gray-600">{tip.description}</p>
// //                   </div>
// //                 );
// //               })}
// //             </motion.div>
// //           )}
// //         </div>
// //       </section>

// //       <Footer />
// //     </>
// //   );
// // };

// // export default CoverLetterGeneratorPage;

// "use client";

// import React, { useState } from "react";
// import {
//   Upload, FileText, CheckCircle, X, Loader2, Sparkles,
//   ArrowRight, Eye, DownloadCloud, UploadCloud, Wand2,
//   Mail, Phone, MapPin, Calendar, ExternalLink,
// } from "lucide-react";
// import axios from "axios";

// const colorSchemes = {
//   red:    { primary: "#c40116", light: "#fee2e2" },
//   blue:   { primary: "#2563eb", light: "#dbeafe" },
//   green:  { primary: "#059669", light: "#d1fae5" },
//   purple: { primary: "#7c3aed", light: "#ede9fe" },
//   orange: { primary: "#ea580c", light: "#ffedd5" },
//   black:  { primary: "#111827", light: "#f5f5f5" },
// };

// function parseCVText(text) {
//   const data = {
//     personalInfo: { fullName: "", title: "", email: "", phone: "", location: "", summary: "" },
//     coreCompetencies: { technical: [], leadership: [], domainExpertise: [] },
//     experience: [],
//     education: [],
//     skills: [],
//     additionalCredentials: { certifications: [], languages: [], awards: [] },
//     raw: text,
//   };

//   // ── normalise lines ──────────────────────────────────────────────────────
//   const lines = text
//     .split("\n")
//     .map(l => l.trim())
//     .filter(l => l.length > 0);

//   // Section heading patterns
//   const SECTIONS = {
//     summary:     /^professional\s+summary[:\s]*/i,
//     competencies:/^core\s+competencies[:\s]*/i,
//     experience:  /^professional\s+experience[:\s]*/i,
//     education:   /^education(\s*&\s*credentials)?[:\s]*/i,
//     skills:      /^(technical\s+)?skills[:\s]*/i,
//     credentials: /^(languages\s*&\s*awards|additional\s+(information|credentials))[:\s]*/i,
//   };

//   // Competency-type sub-heading patterns
//   const COMP_TYPES = {
//     technical:      /^\*{0,2}technical\*{0,2}$/i,
//     leadership:     /^\*{0,2}leadership\*{0,2}$/i,
//     domainExpertise:/^\*{0,2}domain\s+expertise\*{0,2}$/i,
//   };

//   // ── first pass: grab personal info from top lines ────────────────────────
//   // We scan until we hit the first section heading
//   let firstSectionIdx = lines.findIndex(l =>
//     Object.values(SECTIONS).some(re => re.test(l))
//   );
//   if (firstSectionIdx === -1) firstSectionIdx = Math.min(8, lines.length);

//   const topLines = lines.slice(0, firstSectionIdx);
//   for (const line of topLines) {
//     if (!line) continue;

//     // Email
//     if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(line)) {
//       data.personalInfo.email = line;
//       continue;
//     }

//     // Phone  e.g. (123) 456-7890  or  123-456-7890
//     if (/^[\d\s\-().+]{7,20}$/.test(line) && /\d/.test(line)) {
//       // Skip date-range lines like "1998-03 - 2005-02"
//       if (/^\d{4}-\d{2}\s*-\s*\d{4}-\d{2}$/.test(line)) continue;
//       if (/(19|20)\d{2}/.test(line) && line.includes(" - ")) continue;
//       data.personalInfo.phone = line;
//       continue;
//     }

//     // Skip stray date ranges
//     if (/^\d{4}(-\d{2})?\s*[-–]\s*\d{4}(-\d{2})?$/.test(line)) continue;
//     if (/^\(\d{4}\)/.test(line)) continue;   // e.g. (1998) 03 - ...

//     // First real line → full name
//     if (!data.personalInfo.fullName) {
//       data.personalInfo.fullName = line;
//       continue;
//     }

//     // Second real line that isn't contact info → title
//     if (!data.personalInfo.title) {
//       data.personalInfo.title = line;
//     }
//   }

//   // ── second pass: section-by-section ─────────────────────────────────────
//   let section = "";
//   let compType = "";
//   let currentExp = null;
//   let expPhase = ""; // "title" | "company" | "location" | "period" | "bullets"

//   const pushExp = () => {
//     if (currentExp && currentExp.title) data.experience.push(currentExp);
//     currentExp = null;
//     expPhase = "";
//   };

//   // numbered experience heading: "1. Title" or "1) Title"
//   const EXP_NUM = /^(\d+)[.)]\s+(.+)$/;

//   for (let i = firstSectionIdx; i < lines.length; i++) {
//     const line = lines[i];

//     // ── section detection ──────────────────────────────────────────────────
//     let matched = false;
//     for (const [key, re] of Object.entries(SECTIONS)) {
//       if (re.test(line)) {
//         if (section === "experience") pushExp();
//         section = key;
//         compType = "";
//         matched = true;
//         break;
//       }
//     }
//     if (matched) continue;

//     // ── competency sub-type ────────────────────────────────────────────────
//     if (section === "competencies") {
//       let compMatched = false;
//       for (const [key, re] of Object.entries(COMP_TYPES)) {
//         if (re.test(line)) { compType = key; compMatched = true; break; }
//       }
//       if (compMatched) continue;

//       // bullet item
//       const bullet = line.replace(/^[-•*]\s*/, "");
//       if (compType === "technical")       data.coreCompetencies.technical.push(bullet);
//       else if (compType === "leadership") data.coreCompetencies.leadership.push(bullet);
//       else if (compType === "domainExpertise") data.coreCompetencies.domainExpertise.push(bullet);
//       continue;
//     }

//     // ── summary ───────────────────────────────────────────────────────────
//     if (section === "summary") {
//       data.personalInfo.summary += (data.personalInfo.summary ? " " : "") + line;
//       continue;
//     }

//     // ── experience ────────────────────────────────────────────────────────
//     if (section === "experience") {
//       // "1. Job Title" numbering
//       const numMatch = EXP_NUM.exec(line);
//       if (numMatch) {
//         pushExp();
//         currentExp = { id: crypto.randomUUID(), title: numMatch[2], company: "", period: "", description: [], achievements: [], isPresent: false };
//         expPhase = "company";
//         continue;
//       }

//       if (!currentExp) continue;

//       // bullet achievements
//       if (/^[-•*]\s/.test(line)) {
//         currentExp.achievements.push(line.replace(/^[-•*]\s*/, ""));
//         expPhase = "bullets";
//         continue;
//       }

//       // after title: expect company, then location, then period
//       if (expPhase === "company") {
//         currentExp.company = line;
//         expPhase = "location";
//         continue;
//       }
//       if (expPhase === "location") {
//         // if it looks like a date range, treat as period
//         if (/\d{4}/.test(line)) {
//           currentExp.period = line;
//           currentExp.isPresent = /present/i.test(line);
//           expPhase = "bullets";
//         }
//         // else it's a location string — store in company for display
//         else {
//           currentExp.location = line;
//           expPhase = "period";
//         }
//         continue;
//       }
//       if (expPhase === "period") {
//         if (/\d{4}/.test(line)) {
//           currentExp.period = line;
//           currentExp.isPresent = /present/i.test(line);
//         }
//         expPhase = "bullets";
//         continue;
//       }

//       // fallback: non-bullet text after bullets is a description line
//       if (expPhase === "bullets" && !/^[-•*]/.test(line)) {
//         currentExp.description.push(line);
//       }
//       continue;
//     }

//     // ── education ─────────────────────────────────────────────────────────
//     if (section === "education") {
//       const stripped = line.replace(/^[-•*]\s*/, "");
//       // "Degree | Institution | Year"
//       if (stripped.includes("|")) {
//         const parts = stripped.split("|").map(s => s.trim());
//         const degree      = parts[0] || "";
//         const institution = parts[1] || "";
//         const period      = parts[2] || "";
//         // skip placeholder lines
//         if (!/degree/i.test(degree) && degree) {
//           data.education.push({ id: crypto.randomUUID(), degree, institution, period });
//         }
//       } else if (stripped && !/placeholder|graduation year|institution/i.test(stripped)) {
//         data.education.push({ id: crypto.randomUUID(), degree: stripped, institution: "", period: "" });
//       }
//       continue;
//     }

//     // ── skills ────────────────────────────────────────────────────────────
//     if (section === "skills") {
//       const stripped = line.replace(/^[-•*]\s*/, "");
//       stripped.split(",").forEach(s => {
//         const name = s.trim();
//         if (name) data.skills.push({ id: crypto.randomUUID(), name, category: "technical" });
//       });
//       continue;
//     }

//     // ── credentials / languages & awards ─────────────────────────────────
//     if (section === "credentials") {
//       const stripped = line.replace(/^[-•*]\s*/, "");
//       const lower = stripped.toLowerCase();

//       if (/^languages?[:\s]/i.test(stripped)) {
//         const val = stripped.replace(/^languages?[:\s]*/i, "").trim();
//         if (val && !/proficiency/i.test(val)) data.additionalCredentials.languages.push(val);
//       } else if (/^certifications?[:\s]/i.test(stripped)) {
//         const val = stripped.replace(/^certifications?[:\s]*/i, "").trim();
//         if (val && !/issuing/i.test(val)) data.additionalCredentials.certifications.push(val);
//       } else if (/^awards?[:\s]/i.test(stripped)) {
//         const val = stripped.replace(/^awards?[:\s]*/i, "").trim();
//         if (val && !/recognitions/i.test(val)) data.additionalCredentials.awards.push(val);
//       } else if (lower.includes("language")) {
//         // generic line mentioning language
//       } else if (stripped && !/placeholder|proficiency|recognition|distinctions/i.test(stripped)) {
//         // classify by position or default to certifications
//         data.additionalCredentials.certifications.push(stripped);
//       }
//       continue;
//     }
//   }

//   // push last experience
//   pushExp();

//   // ── derive title from first experience if not set ───────────────────────
//   if (!data.personalInfo.title && data.experience.length > 0) {
//     data.personalInfo.title = data.experience[0].title;
//   }

//   // de-dup skills
//   const seen = new Set();
//   data.skills = data.skills.filter(s => {
//     const k = s.name.toLowerCase();
//     if (seen.has(k)) return false;
//     seen.add(k);
//     return true;
//   });

//   // clean summary markdown
//   data.personalInfo.summary = data.personalInfo.summary.replace(/\*\*/g, "").trim();

//   return data;
// }

// // ─── ExperienceCard ───────────────────────────────────────────────────────────
// function ExperienceCard({ exp, color }) {
//   const [expanded, setExpanded] = useState(false);
//   const scheme = colorSchemes[color] || colorSchemes.red;

//   return (
//     <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
//       <div style={{ padding: "20px 24px" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
//           <div>
//             <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#111827" }}>{exp.title}</h3>
//             <p style={{ margin: 0, fontSize: 13, color: scheme.primary, fontWeight: 500 }}>{exp.company}</p>
//           </div>
//           <span style={{ fontSize: 12, color: "#9ca3af", display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
//             <Calendar size={12} /> {exp.period}
//           </span>
//         </div>

//         {exp.achievements.length > 0 && (
//           <>
//             <button
//               onClick={() => setExpanded(v => !v)}
//               style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: scheme.primary, fontWeight: 600, padding: "4px 0", display: "flex", alignItems: "center", gap: 4 }}
//             >
//               {expanded ? "▲" : "▼"} {exp.achievements.length} Achievements
//             </button>

//             {expanded && (
//               <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
//                 {exp.achievements.map((a, i) => (
//                   <li key={i} style={{ fontSize: 13, color: "#4b5563", marginBottom: 4, lineHeight: 1.6 }}>{a}</li>
//                 ))}
//               </ul>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── CV Preview ───────────────────────────────────────────────────────────────
// function CVPreview({ cvData, colorScheme }) {
//   const scheme = colorSchemes[colorScheme] || colorSchemes.red;

//   const SectionTitle = ({ children }) => (
//     <h2 style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 18, fontWeight: 700, color: "#111827", margin: "0 0 16px" }}>
//       <div style={{ width: 4, height: 22, borderRadius: 2, background: scheme.primary }} />
//       {children}
//     </h2>
//   );

//   return (
//     <div style={{ background: "#fff", borderRadius: 16, padding: "40px 44px", boxShadow: "0 8px 32px rgba(0,0,0,.10)", maxWidth: 820, margin: "0 auto" }}>

//       {/* Header */}
//       <div style={{ textAlign: "center", marginBottom: 32 }}>
//         <h1 style={{ margin: "0 0 6px", fontSize: 36, fontWeight: 800, color: scheme.primary }}>
//           {cvData.personalInfo.fullName || "Your Name"}
//         </h1>
//         {cvData.personalInfo.title && (
//           <p style={{ margin: "0 0 14px", fontSize: 17, color: "#6b7280" }}>{cvData.personalInfo.title}</p>
//         )}
//         <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, fontSize: 13, color: "#6b7280" }}>
//           {cvData.personalInfo.email && (
//             <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
//               <Mail size={13} color={scheme.primary} /> {cvData.personalInfo.email}
//             </span>
//           )}
//           {cvData.personalInfo.phone && (
//             <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
//               <Phone size={13} color={scheme.primary} /> {cvData.personalInfo.phone}
//             </span>
//           )}
//           {cvData.personalInfo.location && (
//             <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
//               <MapPin size={13} color={scheme.primary} /> {cvData.personalInfo.location}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Summary */}
//       {cvData.personalInfo.summary && (
//         <div style={{ marginBottom: 28 }}>
//           <SectionTitle>Professional Summary</SectionTitle>
//           <p style={{ margin: 0, color: "#374151", lineHeight: 1.75, fontSize: 14 }}>{cvData.personalInfo.summary}</p>
//         </div>
//       )}

//       {/* Core Competencies */}
//       {(cvData.coreCompetencies.technical.length > 0 ||
//         cvData.coreCompetencies.leadership.length > 0 ||
//         cvData.coreCompetencies.domainExpertise.length > 0) && (
//         <div style={{ marginBottom: 28 }}>
//           <SectionTitle>Core Competencies</SectionTitle>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
//             {[
//               { label: "Technical", items: cvData.coreCompetencies.technical },
//               { label: "Leadership", items: cvData.coreCompetencies.leadership },
//               { label: "Domain Expertise", items: cvData.coreCompetencies.domainExpertise },
//             ].filter(g => g.items.length > 0).map(group => (
//               <div key={group.label} style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 16px" }}>
//                 <p style={{ margin: "0 0 10px", fontWeight: 700, fontSize: 13, color: scheme.primary }}>{group.label}</p>
//                 {group.items.map((item, idx) => (
//                   <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
//                     <div style={{ width: 6, height: 6, borderRadius: "50%", background: scheme.primary, flexShrink: 0 }} />
//                     <span style={{ fontSize: 13, color: "#374151" }}>{item}</span>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Experience */}
//       {cvData.experience.length > 0 && (
//         <div style={{ marginBottom: 28 }}>
//           <SectionTitle>Professional Experience</SectionTitle>
//           {cvData.experience.map(exp => (
//             <ExperienceCard key={exp.id} exp={exp} color={colorScheme} />
//           ))}
//         </div>
//       )}

//       {/* Skills */}
//       {cvData.skills.length > 0 && (
//         <div style={{ marginBottom: 28 }}>
//           <SectionTitle>Technical Skills</SectionTitle>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
//             {cvData.skills.map(skill => (
//               <span key={skill.id} style={{
//                 padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500,
//                 background: `${scheme.primary}12`, color: scheme.primary,
//                 border: `1px solid ${scheme.primary}22`,
//               }}>
//                 {skill.name}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Education */}
//       {cvData.education.length > 0 && (
//         <div style={{ marginBottom: 28 }}>
//           <SectionTitle>Education</SectionTitle>
//           {cvData.education.map(edu => (
//             <div key={edu.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "12px 16px", background: "#f9fafb", borderRadius: 10, marginBottom: 8 }}>
//               <div>
//                 <p style={{ margin: "0 0 2px", fontWeight: 600, fontSize: 14, color: "#111827" }}>{edu.degree}</p>
//                 {edu.institution && <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>{edu.institution}</p>}
//               </div>
//               {edu.period && <span style={{ fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>{edu.period}</span>}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Additional Credentials */}
//       {(cvData.additionalCredentials.languages.length > 0 ||
//         cvData.additionalCredentials.certifications.length > 0 ||
//         cvData.additionalCredentials.awards.length > 0) && (
//         <div>
//           <SectionTitle>Additional Information</SectionTitle>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
//             {[
//               { label: "Languages",       items: cvData.additionalCredentials.languages },
//               { label: "Certifications",  items: cvData.additionalCredentials.certifications },
//               { label: "Awards",          items: cvData.additionalCredentials.awards },
//             ].filter(g => g.items.length > 0).map(group => (
//               <div key={group.label} style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 16px" }}>
//                 <p style={{ margin: "0 0 10px", fontWeight: 700, fontSize: 13, color: scheme.primary }}>{group.label}</p>
//                 {group.items.map((item, idx) => (
//                   <div key={idx} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
//                     <div style={{ width: 4, height: 4, borderRadius: "50%", background: scheme.primary }} />
//                     <span style={{ fontSize: 13, color: "#4b5563" }}>{item}</span>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function CVGeneratorPage() {
//   const [file, setFile]             = useState(null);
//   const [drag, setDrag]             = useState(false);
//   const [uploading, setUploading]   = useState(false);
//   const [cvData, setCvData]         = useState(null);
//   const [activeStep, setActiveStep] = useState("upload");   // "upload" | "preview" | "download"
//   const [colorScheme, setColorScheme] = useState("red");
//   const [exporting, setExporting]   = useState(false);
//   const [error, setError]           = useState("");

//   // ── file handling ──────────────────────────────────────────────────────────
//   const ALLOWED = ["application/pdf", "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];

//   const acceptFile = f => {
//     if (!ALLOWED.includes(f.type) && !f.name.match(/\.(pdf|doc|docx|txt)$/i)) return;
//     setFile(f);
//     setError("");
//     setCvData(null);
//     setActiveStep("upload");
//   };

//   const handleDrop = e => {
//     e.preventDefault(); setDrag(false);
//     if (e.dataTransfer.files[0]) acceptFile(e.dataTransfer.files[0]);
//   };

//   // ── process resume ─────────────────────────────────────────────────────────
//   const processResume = async () => {
//     if (!file) return;
//     setUploading(true);
//     setError("");
//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await axios.post(
//         "https://ai.aryuacademy.com/api/v1/resume/cv/generate-from-file",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       const cvContent = response.data.data.cv_content;
//       const parsed = parseCVText(cvContent);
//       setCvData(parsed);
//       setActiveStep("preview");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to process resume. Please check your connection and try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ── export as PDF (print) ─────────────────────────────────────────────────
//   const exportCV = () => {
//     setExporting(true);
//     const scheme = colorSchemes[colorScheme];
//     const win = window.open("", "_blank");
//     if (!win) { alert("Allow pop-ups to download PDF."); setExporting(false); return; }

//     const html = `<!DOCTYPE html><html><head>
//       <meta charset="utf-8"/>
//       <title>${cvData.personalInfo.fullName} – CV</title>
//       <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
//       <style>
//         *{box-sizing:border-box;margin:0;padding:0}
//         body{font-family:Inter,sans-serif;background:#f3f4f6;padding:32px;color:#111827;line-height:1.6}
//         .wrap{max-width:820px;margin:0 auto;background:#fff;border-radius:16px;padding:40px 44px;box-shadow:0 8px 32px rgba(0,0,0,.08)}
//         h1{font-size:34px;font-weight:800;color:${scheme.primary};margin-bottom:4px}
//         .sub{font-size:16px;color:#6b7280;margin-bottom:12px}
//         .contacts{display:flex;flex-wrap:wrap;gap:14px;font-size:13px;color:#6b7280;justify-content:center;margin-bottom:28px}
//         .sec-title{display:flex;align-items:center;gap:8px;font-size:17px;font-weight:700;margin:24px 0 12px}
//         .bar{width:4px;height:22px;border-radius:2px;background:${scheme.primary}}
//         .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
//         .grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
//         .box{background:#f9fafb;border-radius:10px;padding:14px 16px}
//         .box-title{font-size:13px;font-weight:700;color:${scheme.primary};margin-bottom:8px}
//         .dot-row{display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:13px;color:#374151}
//         .dot{width:6px;height:6px;border-radius:50%;background:${scheme.primary};flex-shrink:0}
//         .exp-card{border:1px solid #e5e7eb;border-radius:10px;padding:16px 20px;margin-bottom:10px}
//         .exp-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px}
//         .exp-title{font-size:15px;font-weight:700}
//         .exp-co{font-size:13px;color:${scheme.primary};font-weight:500}
//         .exp-date{font-size:12px;color:#9ca3af}
//         ul.bullets{padding-left:18px;margin-top:6px}
//         ul.bullets li{font-size:13px;color:#4b5563;margin-bottom:4px;line-height:1.6}
//         .skill-tag{display:inline-block;padding:5px 12px;border-radius:7px;font-size:13px;font-weight:500;
//           background:${scheme.primary}15;color:${scheme.primary};border:1px solid ${scheme.primary}22;margin:3px}
//         .edu-row{display:flex;justify-content:space-between;padding:10px 14px;background:#f9fafb;border-radius:8px;margin-bottom:6px}
//         .text-center{text-align:center}
//         @media print{body{background:#fff;padding:0}.wrap{box-shadow:none;border-radius:0}.exp-card{break-inside:avoid}}
//       </style>
//     </head><body><div class="wrap">
//       <div class="text-center">
//         <h1>${cvData.personalInfo.fullName}</h1>
//         <p class="sub">${cvData.personalInfo.title || ""}</p>
//         <div class="contacts">
//           ${cvData.personalInfo.email ? `<span>✉ ${cvData.personalInfo.email}</span>` : ""}
//           ${cvData.personalInfo.phone ? `<span>📱 ${cvData.personalInfo.phone}</span>` : ""}
//           ${cvData.personalInfo.location ? `<span>📍 ${cvData.personalInfo.location}</span>` : ""}
//         </div>
//       </div>

//       ${cvData.personalInfo.summary ? `
//         <div class="sec-title"><div class="bar"></div>Professional Summary</div>
//         <p style="font-size:14px;color:#374151;line-height:1.75">${cvData.personalInfo.summary}</p>
//       ` : ""}

//       ${(cvData.coreCompetencies.technical.length || cvData.coreCompetencies.leadership.length || cvData.coreCompetencies.domainExpertise.length) ? `
//         <div class="sec-title"><div class="bar"></div>Core Competencies</div>
//         <div class="grid3">
//           ${cvData.coreCompetencies.technical.length ? `<div class="box"><div class="box-title">Technical</div>${cvData.coreCompetencies.technical.map(s => `<div class="dot-row"><div class="dot"></div>${s}</div>`).join("")}</div>` : ""}
//           ${cvData.coreCompetencies.leadership.length ? `<div class="box"><div class="box-title">Leadership</div>${cvData.coreCompetencies.leadership.map(s => `<div class="dot-row"><div class="dot"></div>${s}</div>`).join("")}</div>` : ""}
//           ${cvData.coreCompetencies.domainExpertise.length ? `<div class="box"><div class="box-title">Domain Expertise</div>${cvData.coreCompetencies.domainExpertise.map(s => `<div class="dot-row"><div class="dot"></div>${s}</div>`).join("")}</div>` : ""}
//         </div>
//       ` : ""}

//       ${cvData.experience.length ? `
//         <div class="sec-title"><div class="bar"></div>Professional Experience</div>
//         ${cvData.experience.map(exp => `
//           <div class="exp-card">
//             <div class="exp-head">
//               <div><div class="exp-title">${exp.title}</div><div class="exp-co">${exp.company}</div></div>
//               <div class="exp-date">${exp.period}</div>
//             </div>
//             ${exp.achievements.length ? `<ul class="bullets">${exp.achievements.map(a => `<li>${a}</li>`).join("")}</ul>` : ""}
//           </div>
//         `).join("")}
//       ` : ""}

//       ${cvData.skills.length ? `
//         <div class="sec-title"><div class="bar"></div>Technical Skills</div>
//         <div>${cvData.skills.map(s => `<span class="skill-tag">${s.name}</span>`).join("")}</div>
//       ` : ""}

//       ${cvData.education.length ? `
//         <div class="sec-title"><div class="bar"></div>Education</div>
//         ${cvData.education.map(e => `
//           <div class="edu-row">
//             <div><b style="font-size:14px">${e.degree}</b>${e.institution ? `<div style="font-size:13px;color:#6b7280">${e.institution}</div>` : ""}</div>
//             ${e.period ? `<span style="font-size:12px;color:#9ca3af">${e.period}</span>` : ""}
//           </div>
//         `).join("")}
//       ` : ""}

//       ${(cvData.additionalCredentials.languages.length || cvData.additionalCredentials.certifications.length || cvData.additionalCredentials.awards.length) ? `
//         <div class="sec-title"><div class="bar"></div>Additional Information</div>
//         <div class="grid2">
//           ${cvData.additionalCredentials.languages.length ? `<div class="box"><div class="box-title">Languages</div>${cvData.additionalCredentials.languages.map(l => `<div class="dot-row"><div class="dot"></div>${l}</div>`).join("")}</div>` : ""}
//           ${cvData.additionalCredentials.certifications.length ? `<div class="box"><div class="box-title">Certifications</div>${cvData.additionalCredentials.certifications.map(c => `<div class="dot-row"><div class="dot"></div>${c}</div>`).join("")}</div>` : ""}
//           ${cvData.additionalCredentials.awards.length ? `<div class="box"><div class="box-title">Awards</div>${cvData.additionalCredentials.awards.map(a => `<div class="dot-row"><div class="dot"></div>${a}</div>`).join("")}</div>` : ""}
//         </div>
//       ` : ""}

//     </div><script>window.onload=()=>setTimeout(()=>window.print(),400)</script></body></html>`;

//     win.document.write(html);
//     win.document.close();
//     setExporting(false);
//     setActiveStep("download");
//   };

//   // ── render helpers ─────────────────────────────────────────────────────────
//   const ACCENT = "#c40116";
//   const steps = ["upload", "preview", "download"];

//   return (
//     <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#fff5f5 0%,#fff 50%,#f0f4ff 100%)", padding: "40px 16px" }}>
//       <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}`}</style>

//       <div style={{ maxWidth: 900, margin: "0 auto" }}>

//         {/* Hero */}
//         <div style={{ textAlign: "center", marginBottom: 36 }}>
//           <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", background: `${ACCENT}12`, borderRadius: 100, marginBottom: 14, border: `1px solid ${ACCENT}22` }}>
//             <Sparkles size={13} color={ACCENT} />
//             <span style={{ fontSize: 13, fontWeight: 600, color: ACCENT }}>AI-Powered CV Generator</span>
//           </div>
//           <h1 style={{ fontSize: "clamp(26px,5vw,42px)", fontWeight: 800, color: "#0f172a", margin: "0 0 10px", lineHeight: 1.2 }}>
//             Upload Your Resume,<br />
//             <span style={{ color: ACCENT }}>Get a Professional CV</span>
//           </h1>
//           <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 480, margin: "0 auto" }}>
//             Our AI extracts your information and formats it into a stunning, ATS-friendly CV.
//           </p>
//         </div>

//         {/* Step indicators */}
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 28 }}>
//           {[{ s: "upload", label: "Upload", icon: UploadCloud }, { s: "preview", label: "Preview", icon: Eye }, { s: "download", label: "Download", icon: DownloadCloud }].map(({ s, label, icon: Icon }, i) => {
//             const done = steps.indexOf(activeStep) > i;
//             const active = activeStep === s;
//             return (
//               <React.Fragment key={s}>
//                 {i > 0 && <div style={{ width: 40, height: 2, background: done ? "#22c55e" : "#e5e7eb", transition: "background .3s" }} />}
//                 <div style={{ textAlign: "center" }}>
//                   <div style={{ width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px", background: done ? "#22c55e" : active ? ACCENT : "#f3f4f6", color: done || active ? "#fff" : "#9ca3af", boxShadow: active ? `0 0 0 4px ${ACCENT}25` : "none", transition: "all .3s" }}>
//                     {done ? <CheckCircle size={16} /> : <Icon size={16} />}
//                   </div>
//                   <span style={{ fontSize: 11, color: active ? ACCENT : "#9ca3af", fontWeight: active ? 700 : 400 }}>{label}</span>
//                 </div>
//               </React.Fragment>
//             );
//           })}
//         </div>

//         {/* Card container */}
//         <div style={{ background: "#fff", borderRadius: 24, border: "1px solid #f0f0f0", boxShadow: "0 8px 40px rgba(0,0,0,.08)", overflow: "hidden", animation: "fadeUp .4s ease" }}>

//           {/* ── UPLOAD STEP ── */}
//           {activeStep === "upload" && (
//             <div style={{ padding: 36 }}>
//               <div
//                 onDragEnter={e => { e.preventDefault(); setDrag(true); }}
//                 onDragLeave={e => { e.preventDefault(); setDrag(false); }}
//                 onDragOver={e => e.preventDefault()}
//                 onDrop={handleDrop}
//                 style={{ border: `2px dashed ${drag ? ACCENT : file ? "#22c55e" : "#e5e7eb"}`, borderRadius: 16, padding: "52px 32px", textAlign: "center", background: drag ? `${ACCENT}06` : file ? "#f0fdf4" : "#fafafa", transition: "all .25s" }}
//               >
//                 <input type="file" id="cv-file" accept=".pdf,.doc,.docx,.txt" style={{ display: "none" }} onChange={e => e.target.files[0] && acceptFile(e.target.files[0])} />

//                 {!file ? (
//                   <>
//                     <div style={{ width: 80, height: 80, borderRadius: 24, background: `${ACCENT}12`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
//                       <UploadCloud size={36} color={ACCENT} />
//                     </div>
//                     <p style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>Drag & Drop Your Resume</p>
//                     <p style={{ color: "#9ca3af", fontSize: 14, margin: "0 0 24px" }}>
//                       or <label htmlFor="cv-file" style={{ color: ACCENT, fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>browse files</label>
//                     </p>
//                     <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
//                       {["PDF", "DOC", "DOCX", "TXT"].map(f => (
//                         <span key={f} style={{ padding: "4px 12px", background: "#f3f4f6", borderRadius: 6, fontSize: 12, color: "#6b7280", fontWeight: 600 }}>{f}</span>
//                       ))}
//                     </div>
//                   </>
//                 ) : (
//                   <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//                       <div style={{ width: 56, height: 56, background: `${ACCENT}12`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                         <FileText size={26} color={ACCENT} />
//                       </div>
//                       <div style={{ textAlign: "left" }}>
//                         <p style={{ fontWeight: 700, color: "#0f172a", margin: "0 0 4px", fontSize: 15 }}>{file.name}</p>
//                         <p style={{ color: "#6b7280", margin: 0, fontSize: 13 }}>
//                           {(file.size / 1024).toFixed(1)} KB · <span style={{ color: "#22c55e", fontWeight: 600 }}>✓ Ready</span>
//                         </p>
//                       </div>
//                     </div>
//                     <button onClick={() => { setFile(null); setCvData(null); }} style={{ background: "#fee2e2", border: "none", borderRadius: 8, padding: 8, cursor: "pointer" }}>
//                       <X size={16} color="#ef4444" />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {error && (
//                 <div style={{ marginTop: 14, padding: "10px 16px", background: "#fee2e2", borderRadius: 10, color: "#b91c1c", fontSize: 13, fontWeight: 500 }}>
//                   ⚠️ {error}
//                 </div>
//               )}

//               {file && !uploading && (
//                 <button
//                   onClick={processResume}
//                   style={{ marginTop: 20, width: "100%", padding: "16px", background: `linear-gradient(135deg,${ACCENT},#a80012)`, color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: `0 4px 20px ${ACCENT}44` }}
//                 >
//                   <Wand2 size={20} /> Parse & Generate CV <ArrowRight size={18} />
//                 </button>
//               )}

//               {uploading && (
//                 <div style={{ marginTop: 24, textAlign: "center" }}>
//                   <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 20px", background: `${ACCENT}10`, borderRadius: 100 }}>
//                     <Loader2 size={18} color={ACCENT} style={{ animation: "spin 1s linear infinite" }} />
//                     <span style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>Parsing your resume…</span>
//                   </div>
//                   <div style={{ marginTop: 20, maxWidth: 340, margin: "16px auto 0", display: "flex", flexDirection: "column", gap: 10 }}>
//                     {["Extracting personal information", "Parsing work experience", "Identifying skills", "Analysing competencies", "Formatting CV"].map((s, i) => (
//                       <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, animation: `fadeUp .3s ${i * 0.15}s both` }}>
//                         <div style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT, opacity: 0.5 }} />
//                         <span style={{ fontSize: 13, color: "#6b7280" }}>{s}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ── PREVIEW STEP ── */}
//           {activeStep === "preview" && cvData && (
//             <div>
//               {/* Toolbar */}
//               <div style={{ borderBottom: "1px solid #f0f0f0", padding: "14px 24px", background: "#fafafa", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                   <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Accent colour:</span>
//                   {Object.entries(colorSchemes).map(([key, val]) => (
//                     <button key={key} onClick={() => setColorScheme(key)} style={{ width: 24, height: 24, borderRadius: "50%", background: val.primary, border: "none", cursor: "pointer", outline: colorScheme === key ? `3px solid ${val.primary}` : "none", outlineOffset: 2, transition: "outline .2s" }} />
//                   ))}
//                 </div>
//                 <button
//                   onClick={() => setActiveStep("download")}
//                   style={{ padding: "10px 22px", background: `linear-gradient(135deg,${ACCENT},#a80012)`, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
//                 >
//                   Continue to Download <ArrowRight size={16} />
//                 </button>
//               </div>

//               {/* Preview */}
//               <div style={{ padding: 32, background: "#f3f4f6" }}>
//                 <CVPreview cvData={cvData} colorScheme={colorScheme} />
//               </div>
//             </div>
//           )}

//           {/* ── DOWNLOAD STEP ── */}
//           {activeStep === "download" && cvData && (
//             <div style={{ padding: 48, textAlign: "center" }}>
//               <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
//                 <CheckCircle size={40} color="#22c55e" />
//               </div>
//               <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>Your CV is Ready!</h3>
//               <p style={{ color: "#6b7280", marginBottom: 32 }}>Download your professionally formatted CV</p>

//               <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 340, margin: "0 auto 28px" }}>
//                 <button
//                   onClick={exportCV}
//                   disabled={exporting}
//                   style={{ padding: "16px", background: exporting ? "#e5e7eb" : `linear-gradient(135deg,${ACCENT},#a80012)`, color: exporting ? "#9ca3af" : "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: exporting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
//                 >
//                   {exporting
//                     ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Generating…</>
//                     : <><DownloadCloud size={18} /> Download as PDF</>}
//                 </button>
//               </div>

//               <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
//                 <button onClick={() => setActiveStep("preview")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#6b7280", display: "flex", alignItems: "center", gap: 5 }}>
//                   <Eye size={14} /> Preview again
//                 </button>
//                 <span style={{ color: "#e5e7eb" }}>|</span>
//                 <button onClick={() => { setFile(null); setCvData(null); setActiveStep("upload"); setError(""); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#6b7280" }}>
//                   Start over
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useCallback, useRef } from "react";
// import {
//   UploadCloud,
//   FileText,
//   CheckCircle,
//   X,
//   Loader2,
//   Sparkles,
//   ArrowRight,
//   Eye,
//   Wand2,
//   Mail,
//   Phone,
//   MapPin,
//   Briefcase,
//   GraduationCap,
//   Award,
//   ChevronDown,
//   ChevronUp,
//   Copy,
//   User,
//   Building,
//   Target,
//   Edit3,
//   FileUp,
//   UserCircle,
// } from "lucide-react";

// // ============================================================
// // TYPES
// // ============================================================
// interface Experience {
//   id: string;
//   title: string;
//   company: string;
//   period: string;
//   description: string[];
//   achievements: string[];
//   isPresent: boolean;
//   location?: string;
// }

// interface Education {
//   id: string;
//   degree: string;
//   institution: string;
//   period: string;
// }

// interface Skill {
//   id: string;
//   name: string;
//   category: string;
// }

// interface CoreCompetencies {
//   technical: string[];
//   leadership: string[];
//   domainExpertise: string[];
// }

// interface AdditionalCredentials {
//   certifications: string[];
//   languages: string[];
//   awards: string[];
// }

// interface PersonalInfo {
//   fullName: string;
//   title: string;
//   email: string;
//   phone: string;
//   location: string;
//   summary: string;
// }

// interface CVData {
//   personalInfo: PersonalInfo;
//   coreCompetencies: CoreCompetencies;
//   experience: Experience[];
//   education: Education[];
//   skills: Skill[];
//   additionalCredentials: AdditionalCredentials;
//   raw: string;
// }

// interface ManualFormData {
//   fullName: string;
//   title: string;
//   email: string;
//   phone: string;
//   location: string;
//   summary: string;
//   skills: string;
//   experience: string;
//   education: string;
// }

// interface CoverLetterForm {
//   companyName: string;
//   jobTitle: string;
//   hiringManager: string;
//   additionalNotes: string;
//   tone: "professional" | "enthusiastic" | "concise";
// }

// // ============================================================
// // THEME COLORS - INDIGO & PURPLE
// // ============================================================
// const THEME = {
//   primary: "#4f46e5", // indigo
//   primaryDark: "#4338ca",
//   primaryLight: "#e0e7ff",
//   secondary: "#7c3aed", // purple
//   secondaryDark: "#6d28d9",
//   secondaryLight: "#ede9fe",
//   accent: "#8b5cf6",
//   gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #8b5cf6 100%)",
// };

// // ============================================================
// // CV PARSING LOGIC (Enhanced for better extraction)
// // ============================================================
// function parseCVText(text: string): CVData {
//   const data: CVData = {
//     personalInfo: {
//       fullName: "",
//       title: "",
//       email: "",
//       phone: "",
//       location: "",
//       summary: "",
//     },
//     coreCompetencies: { technical: [], leadership: [], domainExpertise: [] },
//     experience: [],
//     education: [],
//     skills: [],
//     additionalCredentials: { certifications: [], languages: [], awards: [] },
//     raw: text,
//   };

//   const lines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);

//   // Email extraction
//   const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
//   // Phone extraction
//   const phoneRegex = /(\+\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/;

//   // First pass: extract contact info from anywhere in text
//   for (const line of lines) {
//     const emailMatch = line.match(emailRegex);
//     if (emailMatch && !data.personalInfo.email) {
//       data.personalInfo.email = emailMatch[0];
//     }
//     const phoneMatch = line.match(phoneRegex);
//     if (phoneMatch && !data.personalInfo.phone && phoneMatch[0].length > 5) {
//       data.personalInfo.phone = phoneMatch[0];
//     }
//   }

//   const SECTIONS = {
//     summary: /^professional\s+summary[:\s]*|^summary[:\s]*/i,
//     competencies: /^core\s+competencies[:\s]*/i,
//     experience: /^professional\s+experience[:\s]*|^work\s+experience[:\s]*|^experience[:\s]*/i,
//     education: /^education[:\s]*/i,
//     skills: /^(technical\s+)?skills[:\s]*|^key\s+skills[:\s]*/i,
//     credentials: /^certifications[:\s]*|^languages[:\s]*|^awards[:\s]*/i,
//   };

//   // Find first section
//   let firstSectionIdx = lines.findIndex((l) =>
//     Object.values(SECTIONS).some((re) => re.test(l))
//   );
//   if (firstSectionIdx === -1) firstSectionIdx = Math.min(6, lines.length);

//   // Extract name from top lines (usually first non-empty line)
//   const topLines = lines.slice(0, firstSectionIdx);
//   for (const line of topLines) {
//     if (!data.personalInfo.fullName && !line.match(emailRegex) && !line.match(phoneRegex) && line.length < 50) {
//       data.personalInfo.fullName = line;
//       continue;
//     }
//     if (!data.personalInfo.title && data.personalInfo.fullName && line.length < 60 && !line.match(emailRegex)) {
//       data.personalInfo.title = line;
//     }
//     if (!data.personalInfo.location && (line.includes("📍") || line.toLowerCase().includes("based in") || line.match(/[A-Z][a-z]+,\s*[A-Z]{2}/))) {
//       data.personalInfo.location = line.replace(/[📍]/g, "").trim();
//     }
//   }

//   // Parse sections
//   let section = "";
//   let currentExp: Experience | null = null;

//   for (let i = firstSectionIdx; i < lines.length; i++) {
//     const line = lines[i];

//     // Check for section headers
//     let matched = false;
//     for (const [key, re] of Object.entries(SECTIONS)) {
//       if (re.test(line)) {
//         if (section === "experience" && currentExp) {
//           data.experience.push(currentExp);
//           currentExp = null;
//         }
//         section = key;
//         matched = true;
//         break;
//       }
//     }
//     if (matched) continue;

//     // Parse based on section
//     if (section === "summary") {
//       data.personalInfo.summary += (data.personalInfo.summary ? " " : "") + line;
//       continue;
//     }

//     if (section === "skills") {
//       const skillsLine = line.replace(/^[-•*]\s*/, "");
//       skillsLine.split(/[,•·\-|]/).forEach((s) => {
//         const name = s.trim();
//         if (name && name.length > 1 && name.length < 30) {
//           data.skills.push({ id: crypto.randomUUID(), name, category: "technical" });
//         }
//       });
//       continue;
//     }

//     if (section === "experience") {
//       // Check for bullet points (achievements)
//       if (/^[-•*]\s/.test(line)) {
//         if (currentExp) {
//           currentExp.achievements.push(line.replace(/^[-•*]\s*/, ""));
//         }
//         continue;
//       }

//       // Check for date range pattern
//       if (/\d{4}\s*[-–]\s*(?:\d{4}|present)/i.test(line)) {
//         if (currentExp) {
//           currentExp.period = line;
//           currentExp.isPresent = /present/i.test(line);
//         }
//         continue;
//       }

//       // If we have a line with no bullet and not a date, it might be a job title or company
//       if (line.length > 2 && line.length < 80 && !currentExp) {
//         if (currentExp) data.experience.push(currentExp);
//         currentExp = {
//           id: crypto.randomUUID(),
//           title: line,
//           company: "",
//           period: "",
//           description: [],
//           achievements: [],
//           isPresent: false,
//         };
//       } else if (currentExp && !currentExp.company && line.length < 60 && !/\d/.test(line)) {
//         currentExp.company = line;
//       }
//     }

//     if (section === "education") {
//       const eduLine = line.replace(/^[-•*]\s*/, "");
//       if (eduLine.length > 2) {
//         data.education.push({
//           id: crypto.randomUUID(),
//           degree: eduLine,
//           institution: "",
//           period: "",
//         });
//       }
//       continue;
//     }
//   }

//   // Push last experience
//   if (currentExp) data.experience.push(currentExp);

//   // Set defaults if missing
//   if (!data.personalInfo.fullName) data.personalInfo.fullName = "Professional Candidate";
//   if (!data.personalInfo.summary) {
//     data.personalInfo.summary = "Detail-oriented professional with strong analytical skills and passion for delivering impactful results. Proven track record in cross-functional collaboration and project leadership.";
//   }
//   if (data.skills.length === 0) {
//     data.skills = [
//       { id: crypto.randomUUID(), name: "Project Management", category: "technical" },
//       { id: crypto.randomUUID(), name: "Data Analysis", category: "technical" },
//       { id: crypto.randomUUID(), name: "Communication", category: "technical" },
//     ];
//   }
//   if (data.experience.length === 0) {
//     data.experience.push({
//       id: crypto.randomUUID(),
//       title: "Professional Experience",
//       company: "Various Organizations",
//       period: "2020 – Present",
//       description: [],
//       achievements: ["Demonstrated excellence in problem-solving", "Led cross-functional initiatives", "Delivered measurable business impact"],
//       isPresent: true,
//     });
//   }

//   return data;
// }

// // ============================================================
// // AI COVER LETTER GENERATOR (Enhanced)
// // ============================================================
// async function generateAICoverLetter(
//   cvData: CVData | null,
//   manualData: ManualFormData | null,
//   form: CoverLetterForm
// ): Promise<string> {
//   // Simulate API call delay for realism
//   await new Promise((resolve) => setTimeout(resolve, 1200));

//   // Use CV data if available, otherwise use manual data
//   const name = cvData?.personalInfo.fullName || manualData?.fullName || "Candidate";
//   const title = cvData?.personalInfo.title || manualData?.title || "Professional";
//   const email = cvData?.personalInfo.email || manualData?.email || "";
//   const phone = cvData?.personalInfo.phone || manualData?.phone || "";
//   const skills = cvData?.skills.map((s) => s.name).slice(0, 5).join(", ") || manualData?.skills || "relevant skills";
//   const summary = cvData?.personalInfo.summary || manualData?.summary || "";
//   const experience = cvData?.experience[0]?.achievements.slice(0, 2).join(" ") || manualData?.experience || "";

//   const { companyName, jobTitle, hiringManager, additionalNotes, tone } = form;

//   const company = companyName.trim() || "[Company Name]";
//   const role = jobTitle.trim() || "[Target Position]";
//   const manager = hiringManager.trim() || "Hiring Manager";

//   // Tone adjustments
//   let greeting = `Dear ${manager},`;
//   let closing = "Sincerely,";
//   let enthusiasm = "";

//   switch (tone) {
//     case "enthusiastic":
//       greeting = `Dear ${manager},`;
//       enthusiasm = "I am absolutely thrilled to apply for this opportunity! ";
//       closing = "With great enthusiasm,\n";
//       break;
//     case "concise":
//       greeting = `Dear ${manager},`;
//       enthusiasm = "I am writing to express my interest in the position. ";
//       closing = "Best regards,\n";
//       break;
//     default:
//       greeting = `Dear ${manager},`;
//       enthusiasm = "";
//       closing = "Sincerely,\n";
//   }

//   let letter = `${greeting}

// ${enthusiasm}I am writing to enthusiastically apply for the ${role} position at ${company}.`;

//   if (title && title !== "Professional") {
//     letter += ` As a ${title} with a proven track record, `;
//   }

//   letter += ` I bring expertise in ${skills}.`;

//   if (summary) {
//     letter += `\n\n${summary.substring(0, 200)}`;
//   }

//   if (experience) {
//     letter += `\n\nIn my professional journey, I have ${experience.substring(0, 150)}.`;
//   }

//   if (additionalNotes.trim()) {
//     letter += `\n\n${additionalNotes.trim()}`;
//   }

//   letter += `\n\nI am particularly drawn to ${company}'s mission and would be honored to contribute to your team's success. My background aligns perfectly with the requirements of the ${role} position, and I am confident that I can deliver immediate value.

// Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experiences can benefit ${company}.

// ${closing}
// ${name}
// ${email ? `📧 ${email}` : ""}
// ${phone ? `📞 ${phone}` : ""}`;

//   return letter;
// }

// // ============================================================
// // COMPONENTS
// // ============================================================

// interface ExperienceCardProps {
//   exp: Experience;
//   expanded: boolean;
//   onToggle: () => void;
// }

// function ExperienceCard({ exp, expanded, onToggle }: ExperienceCardProps) {
//   return (
//     <div
//       style={{
//         background: "#fff",
//         border: `1px solid ${THEME.primaryLight}`,
//         borderRadius: 12,
//         overflow: "hidden",
//         marginBottom: 12,
//       }}
//     >
//       <div style={{ padding: "20px 24px" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-start",
//             marginBottom: 8,
//             flexWrap: "wrap",
//             gap: 8,
//           }}
//         >
//           <div>
//             <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#111827" }}>
//               {exp.title}
//             </h3>
//             <p style={{ margin: 0, fontSize: 13, color: THEME.primary, fontWeight: 500 }}>
//               {exp.company}
//               {exp.location && ` • ${exp.location}`}
//             </p>
//           </div>
//           {exp.period && (
//             <span
//               style={{
//                 fontSize: 12,
//                 color: "#9ca3af",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 4,
//               }}
//             >
//               {exp.period}
//             </span>
//           )}
//         </div>

//         {exp.achievements.length > 0 && (
//           <>
//             <button
//               onClick={onToggle}
//               style={{
//                 background: "none",
//                 border: "none",
//                 cursor: "pointer",
//                 fontSize: 13,
//                 color: THEME.primary,
//                 fontWeight: 600,
//                 padding: "4px 0",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 4,
//               }}
//             >
//               {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
//               {exp.achievements.length} Achievement{exp.achievements.length !== 1 ? "s" : ""}
//             </button>

//             {expanded && (
//               <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
//                 {exp.achievements.map((a, i) => (
//                   <li key={i} style={{ fontSize: 13, color: "#4b5563", marginBottom: 4, lineHeight: 1.6 }}>
//                     {a}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// interface CVPreviewProps {
//   cvData: CVData;
// }

// function CVPreview({ cvData }: CVPreviewProps) {
//   const [expandedExpIds, setExpandedExpIds] = useState<Set<string>>(new Set());

//   const toggleExpanded = (id: string) => {
//     setExpandedExpIds((prev) => {
//       const next = new Set(prev);
//       if (next.has(id)) next.delete(id);
//       else next.add(id);
//       return next;
//     });
//   };

//   const SectionTitle = ({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) => (
//     <h2
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 10,
//         fontSize: 18,
//         fontWeight: 700,
//         color: "#111827",
//         margin: "0 0 16px",
//       }}
//     >
//       <div style={{ width: 4, height: 22, borderRadius: 2, background: THEME.gradient }} />
//       {icon && <span style={{ color: THEME.primary }}>{icon}</span>}
//       {children}
//     </h2>
//   );

//   return (
//     <div
//       style={{
//         background: "#fff",
//         borderRadius: 20,
//         padding: "40px 44px",
//         boxShadow: "0 8px 32px rgba(79,70,229,0.08)",
//         maxWidth: 900,
//         margin: "0 auto",
//       }}
//     >
//       {/* Header */}
//       <div style={{ textAlign: "center", marginBottom: 32 }}>
//         <h1
//           style={{
//             margin: "0 0 6px",
//             fontSize: 36,
//             fontWeight: 800,
//             background: THEME.gradient,
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             backgroundClip: "text",
//           }}
//         >
//           {cvData.personalInfo.fullName || "Your Name"}
//         </h1>
//         {cvData.personalInfo.title && (
//           <p style={{ margin: "0 0 14px", fontSize: 17, color: "#6b7280" }}>
//             {cvData.personalInfo.title}
//           </p>
//         )}
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             justifyContent: "center",
//             gap: 16,
//             fontSize: 13,
//             color: "#6b7280",
//           }}
//         >
//           {cvData.personalInfo.email && (
//             <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
//               <Mail size={13} color={THEME.primary} /> {cvData.personalInfo.email}
//             </span>
//           )}
//           {cvData.personalInfo.phone && (
//             <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
//               <Phone size={13} color={THEME.primary} /> {cvData.personalInfo.phone}
//             </span>
//           )}
//           {cvData.personalInfo.location && (
//             <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
//               <MapPin size={13} color={THEME.primary} /> {cvData.personalInfo.location}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Summary */}
//       {cvData.personalInfo.summary && (
//         <div style={{ marginBottom: 28 }}>
//           <SectionTitle>Professional Summary</SectionTitle>
//           <p style={{ margin: 0, color: "#374151", lineHeight: 1.75, fontSize: 14 }}>
//             {cvData.personalInfo.summary}
//           </p>
//         </div>
//       )}

//       {/* Experience */}
//       {cvData.experience.length > 0 && (
//         <div style={{ marginBottom: 28 }}>
//           <SectionTitle icon={<Briefcase size={18} />}>Professional Experience</SectionTitle>
//           {cvData.experience.map((exp) => (
//             <ExperienceCard
//               key={exp.id}
//               exp={exp}
//               expanded={expandedExpIds.has(exp.id)}
//               onToggle={() => toggleExpanded(exp.id)}
//             />
//           ))}
//         </div>
//       )}

//       {/* Skills */}
//       {cvData.skills.length > 0 && (
//         <div style={{ marginBottom: 28 }}>
//           <SectionTitle>Technical Skills</SectionTitle>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
//             {cvData.skills.map((skill) => (
//               <span
//                 key={skill.id}
//                 style={{
//                   padding: "6px 14px",
//                   borderRadius: 20,
//                   fontSize: 13,
//                   fontWeight: 500,
//                   background: THEME.primaryLight,
//                   color: THEME.primaryDark,
//                 }}
//               >
//                 {skill.name}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Education */}
//       {cvData.education.length > 0 && (
//         <div style={{ marginBottom: 28 }}>
//           <SectionTitle icon={<GraduationCap size={18} />}>Education</SectionTitle>
//           {cvData.education.map((edu) => (
//             <div
//               key={edu.id}
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: "12px 16px",
//                 background: "#f9fafb",
//                 borderRadius: 10,
//                 marginBottom: 8,
//                 flexWrap: "wrap",
//                 gap: 8,
//               }}
//             >
//               <div>
//                 <p style={{ margin: "0 0 2px", fontWeight: 600, fontSize: 14, color: "#111827" }}>
//                   {edu.degree}
//                 </p>
//                 {edu.institution && (
//                   <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>{edu.institution}</p>
//                 )}
//               </div>
//               {edu.period && <span style={{ fontSize: 12, color: "#9ca3af" }}>{edu.period}</span>}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ============================================================
// // MAIN COMPONENT
// // ============================================================
// export default function CVGeneratorPage() {
//   // Data sources
//   const [inputMethod, setInputMethod] = useState<"upload" | "manual">("upload");
//   const [file, setFile] = useState<File | null>(null);
//   const [dragActive, setDragActive] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [cvData, setCvData] = useState<CVData | null>(null);
//   const [manualData, setManualData] = useState<ManualFormData>({
//     fullName: "",
//     title: "",
//     email: "",
//     phone: "",
//     location: "",
//     summary: "",
//     skills: "",
//     experience: "",
//     education: "",
//   });
//   const [activeStep, setActiveStep] = useState<"input" | "preview" | "letter">("input");
//   const [error, setError] = useState("");
//   const [coverLetter, setCoverLetter] = useState("");
//   const [generatingLetter, setGeneratingLetter] = useState(false);
//   const [letterForm, setLetterForm] = useState<CoverLetterForm>({
//     companyName: "",
//     jobTitle: "",
//     hiringManager: "",
//     additionalNotes: "",
//     tone: "professional",
//   });

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const ALLOWED_TYPES = [
//     "application/pdf",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     "text/plain",
//   ];

//   // File handlers
//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
//     else if (e.type === "dragleave") setDragActive(false);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile && ALLOWED_TYPES.includes(droppedFile.type)) {
//       setFile(droppedFile);
//       setError("");
//     } else {
//       setError("Please upload a PDF, DOC, DOCX, or TXT file");
//     }
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile && ALLOWED_TYPES.includes(selectedFile.type)) {
//       setFile(selectedFile);
//       setError("");
//     } else if (selectedFile) {
//       setError("Please upload a PDF, DOC, DOCX, or TXT file");
//     }
//   };

//   const clearFile = () => {
//     setFile(null);
//     setCvData(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const readFileAsText = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (e) => resolve(e.target?.result as string);
//       reader.onerror = (e) => reject(e);
//       reader.readAsText(file);
//     });
//   };

//   const processResume = async () => {
//     if (!file) return;
//     setUploading(true);
//     setError("");

//     try {
//       const text = await readFileAsText(file);
//       const parsed = parseCVText(text);
//       setCvData(parsed);
//       setActiveStep("preview");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to process resume. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleManualSubmit = () => {
//     if (!manualData.fullName) {
//       setError("Please enter your full name");
//       return;
//     }
//     setActiveStep("preview");
//   };

//   const handleGenerateLetter = async () => {
//     setGeneratingLetter(true);
//     try {
//       const letter = await generateAICoverLetter(cvData, manualData, letterForm);
//       setCoverLetter(letter);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to generate cover letter");
//     } finally {
//       setGeneratingLetter(false);
//     }
//   };

//   const copyCoverLetter = () => {
//     if (coverLetter) {
//       navigator.clipboard.writeText(coverLetter);
//       alert("Cover letter copied to clipboard!");
//     }
//   };

//   const resetAll = () => {
//     setFile(null);
//     setCvData(null);
//     setManualData({
//       fullName: "",
//       title: "",
//       email: "",
//       phone: "",
//       location: "",
//       summary: "",
//       skills: "",
//       experience: "",
//       education: "",
//     });
//     setActiveStep("input");
//     setError("");
//     setCoverLetter("");
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #f5f3ff 0%, #ffffff 50%, #eef2ff 100%)",
//         padding: "40px 16px",
//       }}
//     >
//       <div style={{ maxWidth: 1100, margin: "0 auto" }}>
//         {/* Hero Section */}
//         <div style={{ textAlign: "center", marginBottom: 36 }}>
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 6,
//               padding: "5px 14px",
//               background: THEME.primaryLight,
//               borderRadius: 100,
//               marginBottom: 14,
//             }}
//           >
//             <Sparkles size={13} color={THEME.primary} />
//             <span style={{ fontSize: 13, fontWeight: 600, color: THEME.primary }}>
//               AI-Powered CV Studio
//             </span>
//           </div>
//           <h1
//             style={{
//               fontSize: "clamp(28px,5vw,44px)",
//               fontWeight: 800,
//               background: THEME.gradient,
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               backgroundClip: "text",
//               margin: "0 0 10px",
//               lineHeight: 1.2,
//             }}
//           >
//             Resume + Cover Letter Generator
//           </h1>
//           <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 520, margin: "0 auto" }}>
//             Upload your resume or enter details manually, then generate a personalized AI cover letter
//           </p>
//         </div>

//         {/* Main Card */}
//         <div
//           style={{
//             background: "#fff",
//             borderRadius: 28,
//             border: "1px solid #f0f0f0",
//             boxShadow: "0 20px 40px rgba(79,70,229,0.08)",
//             overflow: "hidden",
//           }}
//         >
//           {/* INPUT STEP */}
//           {activeStep === "input" && (
//             <div style={{ padding: 36 }}>
//               {/* Toggle between upload and manual input */}
//               <div
//                 style={{
//                   display: "flex",
//                   gap: 12,
//                   marginBottom: 32,
//                   background: "#f9fafb",
//                   padding: 6,
//                   borderRadius: 60,
//                 }}
//               >
//                 <button
//                   onClick={() => setInputMethod("upload")}
//                   style={{
//                     flex: 1,
//                     padding: "12px 20px",
//                     borderRadius: 50,
//                     border: "none",
//                     background: inputMethod === "upload" ? THEME.gradient : "transparent",
//                     color: inputMethod === "upload" ? "#fff" : "#6b7280",
//                     fontWeight: 600,
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: 8,
//                     transition: "all 0.2s",
//                   }}
//                 >
//                   <FileUp size={18} /> Upload Resume
//                 </button>
//                 <button
//                   onClick={() => setInputMethod("manual")}
//                   style={{
//                     flex: 1,
//                     padding: "12px 20px",
//                     borderRadius: 50,
//                     border: "none",
//                     background: inputMethod === "manual" ? THEME.gradient : "transparent",
//                     color: inputMethod === "manual" ? "#fff" : "#6b7280",
//                     fontWeight: 600,
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: 8,
//                   }}
//                 >
//                   <UserCircle size={18} /> Enter Manually
//                 </button>
//               </div>

//               {inputMethod === "upload" ? (
//                 // Upload UI
//                 <div>
//                   <div
//                     onDragEnter={handleDrag}
//                     onDragLeave={handleDrag}
//                     onDragOver={handleDrag}
//                     onDrop={handleDrop}
//                     onClick={() => fileInputRef.current?.click()}
//                     style={{
//                       border: `2px dashed ${dragActive ? THEME.primary : file ? "#22c55e" : "#e5e7eb"}`,
//                       borderRadius: 20,
//                       padding: "52px 32px",
//                       textAlign: "center",
//                       background: dragActive ? `${THEME.primary}06` : file ? "#f0fdf4" : "#fafafa",
//                       transition: "all .25s",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       accept=".pdf,.doc,.docx,.txt"
//                       style={{ display: "none" }}
//                       onChange={handleFileSelect}
//                     />

//                     {!file ? (
//                       <>
//                         <div
//                           style={{
//                             width: 80,
//                             height: 80,
//                             borderRadius: 24,
//                             background: THEME.primaryLight,
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             margin: "0 auto 20px",
//                           }}
//                         >
//                           <UploadCloud size={36} color={THEME.primary} />
//                         </div>
//                         <p style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>
//                           Drag & Drop Your Resume
//                         </p>
//                         <p style={{ color: "#9ca3af", fontSize: 14 }}>
//                           or <span style={{ color: THEME.primary, fontWeight: 600 }}>browse files</span>
//                         </p>
//                         <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20 }}>
//                           {["PDF", "DOC", "DOCX", "TXT"].map((f) => (
//                             <span
//                               key={f}
//                               style={{
//                                 padding: "4px 12px",
//                                 background: "#f3f4f6",
//                                 borderRadius: 6,
//                                 fontSize: 12,
//                                 color: "#6b7280",
//                                 fontWeight: 600,
//                               }}
//                             >
//                               {f}
//                             </span>
//                           ))}
//                         </div>
//                       </>
//                     ) : (
//                       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//                           <div
//                             style={{
//                               width: 56,
//                               height: 56,
//                               background: THEME.primaryLight,
//                               borderRadius: 14,
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                             }}
//                           >
//                             <FileText size={26} color={THEME.primary} />
//                           </div>
//                           <div style={{ textAlign: "left" }}>
//                             <p style={{ fontWeight: 700, color: "#0f172a", margin: "0 0 4px", fontSize: 15 }}>
//                               {file.name}
//                             </p>
//                             <p style={{ color: "#6b7280", margin: 0, fontSize: 13 }}>
//                               {(file.size / 1024).toFixed(1)} KB ·{" "}
//                               <span style={{ color: "#22c55e", fontWeight: 600 }}>✓ Ready</span>
//                             </p>
//                           </div>
//                         </div>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             clearFile();
//                           }}
//                           style={{
//                             background: "#fee2e2",
//                             border: "none",
//                             borderRadius: 8,
//                             padding: 8,
//                             cursor: "pointer",
//                           }}
//                         >
//                           <X size={16} color="#ef4444" />
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   {error && (
//                     <div
//                       style={{
//                         marginTop: 14,
//                         padding: "10px 16px",
//                         background: "#fee2e2",
//                         borderRadius: 10,
//                         color: "#b91c1c",
//                         fontSize: 13,
//                       }}
//                     >
//                       ⚠️ {error}
//                     </div>
//                   )}

//                   {file && !uploading && (
//                     <button
//                       onClick={processResume}
//                       style={{
//                         marginTop: 20,
//                         width: "100%",
//                         padding: "16px",
//                         background: THEME.gradient,
//                         color: "#fff",
//                         border: "none",
//                         borderRadius: 14,
//                         fontSize: 16,
//                         fontWeight: 700,
//                         cursor: "pointer",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         gap: 10,
//                       }}
//                     >
//                       <Wand2 size={20} /> Parse & Continue <ArrowRight size={18} />
//                     </button>
//                   )}

//                   {uploading && (
//                     <div style={{ marginTop: 24, textAlign: "center" }}>
//                       <div
//                         style={{
//                           display: "inline-flex",
//                           alignItems: "center",
//                           gap: 10,
//                           padding: "10px 20px",
//                           background: THEME.primaryLight,
//                           borderRadius: 100,
//                         }}
//                       >
//                         <Loader2 size={18} color={THEME.primary} style={{ animation: "spin 1s linear infinite" }} />
//                         <span style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>
//                           Parsing your resume...
//                         </span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 // Manual Input UI
//                 <div>
//                   <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
//                     <User size={20} color={THEME.primary} /> Enter Your Details
//                   </h3>
//                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
//                     <input
//                       type="text"
//                       placeholder="Full Name *"
//                       value={manualData.fullName}
//                       onChange={(e) => setManualData({ ...manualData, fullName: e.target.value })}
//                       style={{ padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14 }}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Professional Title"
//                       value={manualData.title}
//                       onChange={(e) => setManualData({ ...manualData, title: e.target.value })}
//                       style={{ padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14 }}
//                     />
//                     <input
//                       type="email"
//                       placeholder="Email"
//                       value={manualData.email}
//                       onChange={(e) => setManualData({ ...manualData, email: e.target.value })}
//                       style={{ padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14 }}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Phone"
//                       value={manualData.phone}
//                       onChange={(e) => setManualData({ ...manualData, phone: e.target.value })}
//                       style={{ padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14 }}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Location (City, State)"
//                       value={manualData.location}
//                       onChange={(e) => setManualData({ ...manualData, location: e.target.value })}
//                       style={{ padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14 }}
//                     />
//                   </div>
//                   <textarea
//                     placeholder="Professional Summary (2-3 sentences about yourself)"
//                     value={manualData.summary}
//                     onChange={(e) => setManualData({ ...manualData, summary: e.target.value })}
//                     rows={3}
//                     style={{ width: "100%", marginTop: 16, padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14, resize: "vertical" }}
//                   />
//                   <textarea
//                     placeholder="Key Skills (comma separated, e.g., JavaScript, Project Management, Data Analysis)"
//                     value={manualData.skills}
//                     onChange={(e) => setManualData({ ...manualData, skills: e.target.value })}
//                     rows={2}
//                     style={{ width: "100%", marginTop: 16, padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14, resize: "vertical" }}
//                   />
//                   <textarea
//                     placeholder="Work Experience (key achievements and responsibilities)"
//                     value={manualData.experience}
//                     onChange={(e) => setManualData({ ...manualData, experience: e.target.value })}
//                     rows={3}
//                     style={{ width: "100%", marginTop: 16, padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14, resize: "vertical" }}
//                   />

//                   {error && (
//                     <div style={{ marginTop: 14, padding: "10px 16px", background: "#fee2e2", borderRadius: 10, color: "#b91c1c", fontSize: 13 }}>
//                       ⚠️ {error}
//                     </div>
//                   )}

//                   <button
//                     onClick={handleManualSubmit}
//                     style={{
//                       marginTop: 20,
//                       width: "100%",
//                       padding: "16px",
//                       background: THEME.gradient,
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: 14,
//                       fontSize: 16,
//                       fontWeight: 700,
//                       cursor: "pointer",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       gap: 10,
//                     }}
//                   >
//                     Continue to Preview <ArrowRight size={18} />
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* PREVIEW STEP */}
//           {activeStep === "preview" && (cvData || manualData.fullName) && (
//             <div>
//               <div
//                 style={{
//                   borderBottom: "1px solid #f0f0f0",
//                   padding: "14px 24px",
//                   background: "#fafafa",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   flexWrap: "wrap",
//                   gap: 12,
//                 }}
//               >
//                 <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
//                   {cvData ? "📄 CV Extracted from Resume" : "✏️ Manually Entered Profile"}
//                 </span>
//                 <button
//                   onClick={() => setActiveStep("letter")}
//                   style={{
//                     padding: "10px 24px",
//                     background: THEME.gradient,
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: 40,
//                     fontSize: 14,
//                     fontWeight: 600,
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 8,
//                   }}
//                 >
//                   Generate Cover Letter <ArrowRight size={16} />
//                 </button>
//               </div>
//               <div style={{ padding: 32, background: "#f9fafb" }}>
//                 {cvData ? (
//                   <CVPreview cvData={cvData} />
//                 ) : (
//                   <div style={{ background: "#fff", borderRadius: 20, padding: 40, textAlign: "center" }}>
//                     <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>{manualData.fullName}</h2>
//                     {manualData.title && <p style={{ color: THEME.primary, fontWeight: 500 }}>{manualData.title}</p>}
//                     <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
//                       {manualData.email && <span><Mail size={14} /> {manualData.email}</span>}
//                       {manualData.phone && <span><Phone size={14} /> {manualData.phone}</span>}
//                       {manualData.location && <span><MapPin size={14} /> {manualData.location}</span>}
//                     </div>
//                     {manualData.summary && <p style={{ marginTop: 24, textAlign: "left" }}><strong>Summary:</strong> {manualData.summary}</p>}
//                     {manualData.skills && <p style={{ marginTop: 16, textAlign: "left" }}><strong>Skills:</strong> {manualData.skills}</p>}
//                     {manualData.experience && <p style={{ marginTop: 16, textAlign: "left" }}><strong>Experience:</strong> {manualData.experience}</p>}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* COVER LETTER STEP */}
//           {activeStep === "letter" && (
//             <div style={{ padding: 32 }}>
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
//                 {/* Left Panel */}
//                 <div>
//                   <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
//                     <Edit3 size={20} color={THEME.primary} /> Customize Your Letter
//                   </h3>
//                   <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
//                     <div>
//                       <label style={{ fontWeight: 600, fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
//                         <Building size={14} style={{ display: "inline", marginRight: 6 }} /> Company Name
//                       </label>
//                       <input
//                         type="text"
//                         value={letterForm.companyName}
//                         onChange={(e) => setLetterForm({ ...letterForm, companyName: e.target.value })}
//                         placeholder="e.g., Google, Microsoft, Startup X"
//                         style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14 }}
//                       />
//                     </div>
//                     <div>
//                       <label style={{ fontWeight: 600, fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
//                         <Target size={14} style={{ display: "inline", marginRight: 6 }} /> Job Title / Role
//                       </label>
//                       <input
//                         type="text"
//                         value={letterForm.jobTitle}
//                         onChange={(e) => setLetterForm({ ...letterForm, jobTitle: e.target.value })}
//                         placeholder="e.g., Frontend Engineer, Product Manager"
//                         style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14 }}
//                       />
//                     </div>
//                     <div>
//                       <label style={{ fontWeight: 600, fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
//                         <User size={14} style={{ display: "inline", marginRight: 6 }} /> Hiring Manager Name (optional)
//                       </label>
//                       <input
//                         type="text"
//                         value={letterForm.hiringManager}
//                         onChange={(e) => setLetterForm({ ...letterForm, hiringManager: e.target.value })}
//                         placeholder="e.g., Sarah Johnson"
//                         style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14 }}
//                       />
//                     </div>
//                     <div>
//                       <label style={{ fontWeight: 600, fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
//                         Tone
//                       </label>
//                       <select
//                         value={letterForm.tone}
//                         onChange={(e) => setLetterForm({ ...letterForm, tone: e.target.value as CoverLetterForm["tone"] })}
//                         style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14, background: "#fff" }}
//                       >
//                         <option value="professional">Professional & Formal</option>
//                         <option value="enthusiastic">Enthusiastic & Energetic</option>
//                         <option value="concise">Concise & Direct</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label style={{ fontWeight: 600, fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
//                         Additional Notes (optional)
//                       </label>
//                       <textarea
//                         rows={4}
//                         value={letterForm.additionalNotes}
//                         onChange={(e) => setLetterForm({ ...letterForm, additionalNotes: e.target.value })}
//                         placeholder="Mention specific achievements, projects, or why you're interested..."
//                         style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14, resize: "vertical" }}
//                       />
//                     </div>
//                     <button
//                       onClick={handleGenerateLetter}
//                       disabled={generatingLetter}
//                       style={{
//                         background: generatingLetter ? "#e5e7eb" : THEME.gradient,
//                         color: generatingLetter ? "#9ca3af" : "#fff",
//                         border: "none",
//                         borderRadius: 40,
//                         padding: "14px",
//                         fontSize: 15,
//                         fontWeight: 700,
//                         cursor: generatingLetter ? "not-allowed" : "pointer",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         gap: 8,
//                         marginTop: 8,
//                       }}
//                     >
//                       {generatingLetter ? (
//                         <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Generating...</>
//                       ) : (
//                         <><Sparkles size={18} /> Generate AI Cover Letter</>
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Right Panel */}
//                 <div>
//                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
//                     <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>📄 Your Cover Letter</h3>
//                     {coverLetter && (
//                       <button
//                         onClick={copyCoverLetter}
//                         style={{
//                           background: "none",
//                           border: `1px solid ${THEME.primaryLight}`,
//                           borderRadius: 40,
//                           padding: "6px 14px",
//                           fontSize: 12,
//                           fontWeight: 500,
//                           color: THEME.primary,
//                           cursor: "pointer",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 6,
//                         }}
//                       >
//                         <Copy size={14} /> Copy
//                       </button>
//                     )}
//                   </div>
//                   <div
//                     style={{
//                       background: "linear-gradient(135deg, #faf5ff 0%, #ffffff 100%)",
//                       borderRadius: 20,
//                       padding: 28,
//                       border: `1px solid ${THEME.primaryLight}`,
//                       minHeight: 450,
//                       maxHeight: 550,
//                       overflowY: "auto",
//                     }}
//                   >
//                     {coverLetter ? (
//                       <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7, fontSize: 14, color: "#1f2937" }}>
//                         {coverLetter}
//                       </div>
//                     ) : (
//                       <div style={{ textAlign: "center", color: "#9ca3af", padding: "60px 20px" }}>
//                         <Wand2 size={40} style={{ marginBottom: 16, opacity: 0.5, color: THEME.primary }} />
//                         <p>Click "Generate AI Cover Letter" above</p>
//                         <p style={{ fontSize: 13, marginTop: 8 }}>Your personalized letter will appear here</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div style={{ marginTop: 32, display: "flex", justifyContent: "center", gap: 16 }}>
//                 <button
//                   onClick={() => setActiveStep("preview")}
//                   style={{ background: "none", border: `1px solid ${THEME.primaryLight}`, borderRadius: 40, padding: "10px 24px", cursor: "pointer", color: "#6b7280" }}
//                 >
//                   ← Back to Profile
//                 </button>
//                 <button
//                   onClick={resetAll}
//                   style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 13 }}
//                 >
//                   Start Over
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <style>{`
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import axios, { AxiosResponse } from "axios";
// import {
//   Sparkles,
//   Mail,
//   Phone,
//   MapPin,
//   Building,
//   Target,
//   User,
//   Copy,
//   Download,
//   Loader2,
//   Check,
//   Palette,
//   FileText,
//   Heart,
//   Shield,
//   Zap,
//   Feather,
//   Layout,
//   Eye,
//   RefreshCw,
//   Briefcase,
//   Award,
//   Star,
//   Crown,
//   Diamond,
//   Sparkle,
//   Leaf,
//   Waves,
//   Sun,
//   Compass,
//   Plus,
//   Trash2,
//   Linkedin,
//   Globe2,
//   Quote,
//   PenLine,
//   X,
//   ArrowRight,
//   Instagram,
//   Twitter,
//   Youtube,
//   Figma,
//   Github,
//   Dribbble,
//   Minimize2,
//   Maximize2,

// } from "lucide-react";

// // ============================================================
// // TYPES
// // ============================================================

// interface PersonalInfo {
//   fullName: string;
//   title: string;
//   email: string;
//   phone: string;
//   location: string;
//   website: string;
//   linkedin: string;
//   github: string;
//   twitter?: string;
//   instagram?: string;
// }

// interface CompanyInfo {
//   name: string;
//   jobTitle: string;
//   hiringManager: string;
//   hiringManagerTitle: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   department: string;
// }

// interface LetterSection {
//   id: string;
//   title: string;
//   content: string;
//   placeholder: string;
// }

// interface CoverLetterData {
//   personal: PersonalInfo;
//   company: CompanyInfo;
//   sections: LetterSection[];
//   tone: string;
//   achievements: string[];
//   additionalNotes: string;
// }

// interface Template {
//   id: string;
//   name: string;
//   description: string;
//   icon: React.ReactNode;
//   primaryColor: string;
//   secondaryColor: string;
//   accentColor: string;
//   fontFamily: string;
//   category: string;
//   layout: string;
//   structure: "two-column" | "sidebar" | "header-centered" | "minimal" | "bold" | "elegant" | "modern" | "creative";
// }

// // ============================================================
// // 8 UNIQUE TEMPLATES
// // ============================================================

// const templates: Template[] = [
//   {
//     id: "split-screen",
//     name: "Split Screen",
//     description: "Modern two-column design with colored sidebar",
//     icon: <Layout size={20} />,
//     primaryColor: "#4f46e5",
//     secondaryColor: "#818cf8",
//     accentColor: "#c7d2fe",
//     fontFamily: "'Inter', sans-serif",
//     category: "modern",
//     layout: "split",
//     structure: "two-column",
//   },
//   {
//     id: "sidebar-pro",
//     name: "Sidebar Pro",
//     description: "Professional with left sidebar contact panel",
//     icon: <User size={20} />,
//     primaryColor: "#1e293b",
//     secondaryColor: "#475569",
//     accentColor: "#94a3b8",
//     fontFamily: "'Plus Jakarta Sans', sans-serif",
//     category: "professional",
//     layout: "sidebar",
//     structure: "sidebar",
//   },
//   {
//     id: "minimal-elegant",
//     name: "Minimal Elegant",
//     description: "Clean whitespace-focused design",
//     icon: <Leaf size={20} />,
//     primaryColor: "#059669",
//     secondaryColor: "#10b981",
//     accentColor: "#34d399",
//     fontFamily: "'SF Pro Display', sans-serif",
//     category: "minimal",
//     layout: "minimal",
//     structure: "minimal",
//   },
//   {
//     id: "bold-header",
//     name: "Bold Header",
//     description: "Dramatic colored header section",
//     icon: <Zap size={20} />,
//     primaryColor: "#ec4899",
//     secondaryColor: "#f43f5e",
//     accentColor: "#fbcfe8",
//     fontFamily: "'Poppins', sans-serif",
//     category: "creative",
//     layout: "bold",
//     structure: "bold",
//   },
//   {
//     id: "classic-serif",
//     name: "Classic Serif",
//     description: "Traditional serif font formal design",
//     icon: <Feather size={20} />,
//     primaryColor: "#78350f",
//     secondaryColor: "#b45309",
//     accentColor: "#fef3c7",
//     fontFamily: "'Georgia', 'Times New Roman', serif",
//     category: "classic",
//     layout: "classic",
//     structure: "elegant",
//   },
//   {
//     id: "tech-modern",
//     name: "Tech Modern",
//     description: "Geometric tech-inspired layout",
//     icon: <Diamond size={20} />,
//     primaryColor: "#1e1b4b",
//     secondaryColor: "#4f46e5",
//     accentColor: "#a5b4fc",
//     fontFamily: "'Space Grotesk', sans-serif",
//     category: "tech",
//     layout: "tech",
//     structure: "modern",
//   },
//   {
//     id: "warm-organic",
//     name: "Warm Organic",
//     description: "Soft rounded friendly design",
//     icon: <Sun size={20} />,
//     primaryColor: "#ea580c",
//     secondaryColor: "#f59e0b",
//     accentColor: "#fed7aa",
//     fontFamily: "'Nunito', sans-serif",
//     category: "warm",
//     layout: "warm",
//     structure: "minimal",
//   },
//   {
//     id: "creative-wave",
//     name: "Creative Wave",
//     description: "Artistic wavy accent design",
//     icon: <Waves size={20} />,
//     primaryColor: "#0d9488",
//     secondaryColor: "#14b8a6",
//     accentColor: "#99f6e4",
//     fontFamily: "'Quicksand', sans-serif",
//     category: "creative",
//     layout: "wave",
//     structure: "creative",
//   },
// ];

// // ============================================================
// // UNIQUE TEMPLATE RENDERERS
// // ============================================================

// // Template 1: Split Screen (Two Column)
// const renderSplitScreenTemplate = (data: CoverLetterData, contentSections: LetterSection[], isPreview: boolean = false) => {
//   const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
//   const fullCompanyAddress = [data.company.address, data.company.city, data.company.state, data.company.zipCode].filter(Boolean).join(', ');

//   const sectionsHtml = contentSections
//     .filter(section => section.content.trim())
//     .map(section => `
//       <div style="margin-bottom: 20px;">
//         <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px; color: #4f46e5;">${section.title}</h3>
//         <div style="line-height: 1.6; font-size: 14px;">${section.content.replace(/\n/g, '<br/>')}</div>
//       </div>
//     `).join('');

//   const achievementsHtml = data.achievements.length > 0 ? `
//     <div style="margin: 20px 0;">
//       <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 12px; color: #4f46e5;">✨ Key Achievements</h3>
//       ${data.achievements.map(ach => `<div style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;"><span style="color: #4f46e5;">▹</span> ${ach}</div>`).join('')}
//     </div>
//   ` : '';

//   return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Cover Letter - ${data.personal.fullName}</title>
//   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
//   <style>
//     * { margin: 0; padding: 0; box-sizing: border-box; }
//     body { font-family: 'Inter', sans-serif; background: ${isPreview ? '#f8fafc' : 'white'}; padding: ${isPreview ? '20px' : '0'}; }
//     .container { max-width: 1000px; margin: 0 auto; background: white; box-shadow: ${isPreview ? '0 20px 40px -12px rgba(0,0,0,0.1)' : 'none'}; display: flex; flex-wrap: wrap; }
//     .sidebar { width: 33%; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; padding: 40px 25px; }
//     .main { width: 67%; padding: 40px 35px; }
//     .name { font-size: 28px; font-weight: 800; margin-bottom: 8px; }
//     .title { font-size: 14px; opacity: 0.9; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid rgba(255,255,255,0.2); }
//     .contact-item { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; font-size: 12px; opacity: 0.9; }
//     .section-title { font-size: 18px; font-weight: 700; margin-bottom: 20px; color: #1f2937; border-left: 4px solid #4f46e5; padding-left: 12px; }
//     .greeting { font-size: 16px; font-weight: 600; margin: 20px 0 15px; color: #1f2937; }
//     .date { margin-bottom: 20px; color: #6b7280; font-size: 13px; }
//     @media (max-width: 768px) { .sidebar, .main { width: 100%; } }
//     @media print { body { padding: 0; } .container { box-shadow: none; } .sidebar { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
//   </style>
// </head>
// <body>
// <div class="container">
//   <div class="sidebar">
//     <div class="name">${data.personal.fullName || "Your Name"}</div>
//     <div class="title">${data.personal.title || "Professional"}</div>
//     ${data.personal.email ? `<div class="contact-item">📧 ${data.personal.email}</div>` : ''}
//     ${data.personal.phone ? `<div class="contact-item">📞 ${data.personal.phone}</div>` : ''}
//     ${data.personal.location ? `<div class="contact-item">📍 ${data.personal.location}</div>` : ''}
//     ${data.personal.linkedin ? `<div class="contact-item">🔗 ${data.personal.linkedin}</div>` : ''}
//   </div>
//   <div class="main">
//     <div class="date">${currentDate}</div>
//     <div><strong>${data.company.hiringManager || "Hiring Manager"}</strong>${data.company.hiringManagerTitle ? `, ${data.company.hiringManagerTitle}` : ''}<br/>
//     ${data.company.name}<br/>
//     ${fullCompanyAddress}</div>
//     <div class="greeting">Dear ${data.company.hiringManager || "Hiring Manager"},</div>
//     ${sectionsHtml}
//     ${achievementsHtml}
//     ${data.additionalNotes ? `<div style="margin-top: 20px; padding: 15px; background: #fefce8; border-radius: 12px;">${data.additionalNotes}</div>` : ''}
//     <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
//       <div style="font-weight: 700;">${data.personal.fullName || "Your Name"}</div>
//     </div>
//   </div>
// </div>
// </body>
// </html>`;
// };

// // Template 2: Sidebar Pro
// const renderSidebarTemplate = (data: CoverLetterData, contentSections: LetterSection[], isPreview: boolean = false) => {
//   const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
//   const fullCompanyAddress = [data.company.address, data.company.city, data.company.state, data.company.zipCode].filter(Boolean).join(', ');

//   const sectionsHtml = contentSections
//     .filter(section => section.content.trim())
//     .map(section => `<div style="margin-bottom: 24px;"><h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px; color: #1e293b;">${section.title}</h3><div style="line-height: 1.6;">${section.content.replace(/\n/g, '<br/>')}</div></div>`).join('');

//   return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8">
//   <title>Cover Letter - ${data.personal.fullName}</title>
//   <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
//   <style>
//     * { margin: 0; padding: 0; box-sizing: border-box; }
//     body { font-family: 'Plus Jakarta Sans', sans-serif; background: ${isPreview ? '#f1f5f9' : 'white'}; padding: ${isPreview ? '20px' : '0'}; }
//     .container { max-width: 900px; margin: 0 auto; background: white; display: flex; box-shadow: ${isPreview ? '0 20px 40px -12px rgba(0,0,0,0.1)' : 'none'}; }
//     .sidebar { width: 30%; background: #1e293b; color: white; padding: 30px 20px; }
//     .main { width: 70%; padding: 35px; }
//     .name { font-size: 22px; font-weight: 700; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #475569; }
//     .contact-line { font-size: 11px; margin-bottom: 8px; opacity: 0.8; }
//     .section-title { font-size: 16px; font-weight: 700; margin: 20px 0 12px; color: #1e293b; letter-spacing: 1px; }
//     .greeting { font-weight: 600; margin: 20px 0 15px; }
//     @media (max-width: 768px) { .sidebar, .main { width: 100%; } .container { flex-direction: column; } }
//   </style>
// </head>
// <body>
// <div class="container">
//   <div class="sidebar">
//     <div class="name">${data.personal.fullName || "Your Name"}</div>
//     <div style="font-size: 12px; margin-bottom: 20px;">${data.personal.title || "Professional"}</div>
//     ${data.personal.email ? `<div class="contact-line">✉ ${data.personal.email}</div>` : ''}
//     ${data.personal.phone ? `<div class="contact-line">📞 ${data.personal.phone}</div>` : ''}
//     ${data.personal.location ? `<div class="contact-line">📍 ${data.personal.location}</div>` : ''}
//   </div>
//   <div class="main">
//     <div style="color: #64748b; margin-bottom: 20px;">${currentDate}</div>
//     <div style="margin-bottom: 20px;"><strong>${data.company.hiringManager || "Hiring Manager"}</strong><br/>${data.company.name}<br/>${fullCompanyAddress}</div>
//     <div class="greeting">Dear ${data.company.hiringManager || "Hiring Manager"},</div>
//     ${sectionsHtml}
//     <div style="margin-top: 30px;">Sincerely,<br/><strong>${data.personal.fullName || "Your Name"}</strong></div>
//   </div>
// </div>
// </body>
// </html>`;
// };

// // Template 3: Minimal Elegant
// const renderMinimalTemplate = (data: CoverLetterData, contentSections: LetterSection[], isPreview: boolean = false) => {
//   const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

//   const sectionsHtml = contentSections
//     .filter(section => section.content.trim())
//     .map(section => `<div style="margin-bottom: 28px;"><h3 style="font-size: 15px; font-weight: 600; margin-bottom: 8px; letter-spacing: 1px; color: #059669; text-transform: uppercase;">${section.title}</h3><div style="line-height: 1.7; color: #334155;">${section.content.replace(/\n/g, '<br/>')}</div></div>`).join('');

//   return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8">
//   <title>Cover Letter - ${data.personal.fullName}</title>
//   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
//   <style>
//     * { margin: 0; padding: 0; box-sizing: border-box; }
//     body { font-family: 'Inter', sans-serif; background: ${isPreview ? '#fafafa' : 'white'}; padding: ${isPreview ? '20px' : '0'}; }
//     .letter { max-width: 700px; margin: 0 auto; background: white; padding: 50px; box-shadow: ${isPreview ? '0 10px 30px rgba(0,0,0,0.05)' : 'none'}; }
//     .name { font-size: 32px; font-weight: 300; letter-spacing: -0.5px; margin-bottom: 5px; }
//     .title { font-size: 14px; color: #6b7280; margin-bottom: 30px; }
//     .divider { height: 1px; background: #e5e7eb; margin: 20px 0; }
//     @media (max-width: 768px) { .letter { padding: 30px; } }
//   </style>
// </head>
// <body>
// <div class="letter">
//   <div class="name">${data.personal.fullName || "Your Name"}</div>
//   <div class="title">${data.personal.title || "Professional"}</div>
//   <div style="font-size: 13px; color: #9ca3af; margin-bottom: 5px;">${data.personal.email || ''} ${data.personal.phone ? `| ${data.personal.phone}` : ''}</div>
//   <div class="divider"></div>
//   <div style="margin: 20px 0;">${currentDate}</div>
//   <div><strong>${data.company.hiringManager || "Hiring Manager"}</strong><br/>${data.company.name}</div>
//   <div style="margin: 20px 0;"><strong>Dear ${data.company.hiringManager || "Hiring Manager"},</strong></div>
//   ${sectionsHtml}
//   <div style="margin-top: 40px;">Best regards,<br/><strong>${data.personal.fullName || "Your Name"}</strong></div>
// </div>
// </body>
// </html>`;
// };

// // Template 4: Bold Header
// const renderBoldHeaderTemplate = (data: CoverLetterData, contentSections: LetterSection[], isPreview: boolean = false) => {
//   const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

//   const sectionsHtml = contentSections
//     .filter(section => section.content.trim())
//     .map(section => `<div style="margin-bottom: 20px;"><h3 style="font-size: 17px; font-weight: 700; margin-bottom: 8px; color: #ec4899;">${section.title}</h3><div style="line-height: 1.6;">${section.content.replace(/\n/g, '<br/>')}</div></div>`).join('');

//   return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8">
//   <title>Cover Letter - ${data.personal.fullName}</title>
//   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
//   <style>
//     * { margin: 0; padding: 0; box-sizing: border-box; }
//     body { font-family: 'Poppins', sans-serif; background: ${isPreview ? '#fdf2f8' : 'white'}; padding: ${isPreview ? '20px' : '0'}; }
//     .letter { max-width: 800px; margin: 0 auto; background: white; box-shadow: ${isPreview ? '0 20px 40px -12px rgba(236,72,153,0.2)' : 'none'}; }
//     .header { background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%); color: white; padding: 50px; text-align: center; }
//     .name { font-size: 36px; font-weight: 800; margin-bottom: 10px; }
//     .title { font-size: 16px; opacity: 0.9; }
//     .content { padding: 40px 50px; }
//     .contact-bar { background: #fdf2f8; padding: 15px 50px; display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; font-size: 13px; }
//     @media (max-width: 768px) { .header { padding: 30px; } .content { padding: 25px; } }
//   </style>
// </head>
// <body>
// <div class="letter">
//   <div class="header">
//     <div class="name">${data.personal.fullName || "Your Name"}</div>
//     <div class="title">${data.personal.title || "Professional"}</div>
//   </div>
//   <div class="contact-bar">
//     ${data.personal.email ? `<span>✉️ ${data.personal.email}</span>` : ''}
//     ${data.personal.phone ? `<span>📞 ${data.personal.phone}</span>` : ''}
//     ${data.personal.location ? `<span>📍 ${data.personal.location}</span>` : ''}
//   </div>
//   <div class="content">
//     <div style="margin-bottom: 20px;">${currentDate}</div>
//     <div><strong>${data.company.hiringManager || "Hiring Manager"}</strong><br/>${data.company.name}</div>
//     <div style="margin: 20px 0; font-size: 18px; font-weight: 600;">Dear ${data.company.hiringManager || "Hiring Manager"},</div>
//     ${sectionsHtml}
//     <div style="margin-top: 30px;">Sincerely,<br/><strong>${data.personal.fullName || "Your Name"}</strong></div>
//   </div>
// </div>
// </body>
// </html>`;
// };

// // Template 5: Classic Serif
// const renderClassicSerifTemplate = (data: CoverLetterData, contentSections: LetterSection[], isPreview: boolean = false) => {
//   const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

//   const sectionsHtml = contentSections
//     .filter(section => section.content.trim())
//     .map(section => `<div style="margin-bottom: 20px;"><h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px; font-style: italic; color: #78350f;">${section.title}</h3><div style="line-height: 1.6;">${section.content.replace(/\n/g, '<br/>')}</div></div>`).join('');

//   return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8">
//   <title>Cover Letter - ${data.personal.fullName}</title>
//   <link href="https://fonts.googleapis.com/css2?family=Georgia&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
//   <style>
//     * { margin: 0; padding: 0; box-sizing: border-box; }
//     body { font-family: 'Georgia', 'Times New Roman', serif; background: ${isPreview ? '#fef3c7' : 'white'}; padding: ${isPreview ? '20px' : '0'}; }
//     .letter { max-width: 750px; margin: 40px auto; background: #fffbeb; padding: 50px; box-shadow: ${isPreview ? '0 10px 30px rgba(0,0,0,0.05)' : 'none'}; border: 1px solid #fde68a; }
//     .name { font-family: 'Playfair Display', serif; font-size: 38px; font-weight: 700; letter-spacing: 2px; text-align: center; margin-bottom: 10px; }
//     .title { text-align: center; font-size: 14px; color: #78350f; margin-bottom: 20px; font-style: italic; }
//     .divider { height: 1px; background: #fde68a; margin: 20px 0; }
//     @media (max-width: 768px) { .letter { padding: 30px; margin: 20px; } }
//   </style>
// </head>
// <body>
// <div class="letter">
//   <div class="name">${data.personal.fullName || "Your Name"}</div>
//   <div class="title">${data.personal.title || "Professional"}</div>
//   <div style="text-align: center; font-size: 12px;">${data.personal.email || ''} ${data.personal.phone ? `| ${data.personal.phone}` : ''}</div>
//   <div class="divider"></div>
//   <div style="margin: 30px 0;">${currentDate}</div>
//   <div>${data.company.hiringManager || "Hiring Manager"}<br/>${data.company.name}</div>
//   <div style="margin: 20px 0;">Dear ${data.company.hiringManager || "Hiring Manager"},</div>
//   ${sectionsHtml}
//   <div style="margin-top: 40px;">Yours faithfully,<br/><strong>${data.personal.fullName || "Your Name"}</strong></div>
// </div>
// </body>
// </html>`;
// };

// // Template 6: Tech Modern
// const renderTechModernTemplate = (data: CoverLetterData, contentSections: LetterSection[], isPreview: boolean = false) => {
//   const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

//   const sectionsHtml = contentSections
//     .filter(section => section.content.trim())
//     .map(section => `<div style="margin-bottom: 20px; border-left: 3px solid #4f46e5; padding-left: 15px;"><h3 style="font-size: 15px; font-weight: 700; margin-bottom: 8px; color: #1e1b4b; text-transform: uppercase;">${section.title}</h3><div style="line-height: 1.6;">${section.content.replace(/\n/g, '<br/>')}</div></div>`).join('');

//   return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8">
//   <title>Cover Letter - ${data.personal.fullName}</title>
//   <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
//   <style>
//     * { margin: 0; padding: 0; box-sizing: border-box; }
//     body { font-family: 'Space Grotesk', sans-serif; background: ${isPreview ? '#0f172a' : 'white'}; padding: ${isPreview ? '20px' : '0'}; }
//     .letter { max-width: 800px; margin: 0 auto; background: white; box-shadow: ${isPreview ? '0 20px 40px -12px rgba(0,0,0,0.2)' : 'none'}; }
//     .header { background: #1e1b4b; padding: 40px; color: white; clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%); }
//     .name { font-size: 32px; font-weight: 700; letter-spacing: -1px; }
//     .content { padding: 40px; }
//     .stats { display: flex; gap: 20px; margin: 20px 0; padding: 15px; background: #f8fafc; border-radius: 12px; }
//     @media (max-width: 768px) { .header { padding: 25px; } .content { padding: 25px; } }
//   </style>
// </head>
// <body>
// <div class="letter">
//   <div class="header">
//     <div class="name">${data.personal.fullName || "Your Name"}</div>
//     <div style="font-size: 14px; opacity: 0.8; margin-top: 8px;">${data.personal.title || "Professional"}</div>
//     <div style="display: flex; gap: 15px; margin-top: 20px; font-size: 12px;">
//       ${data.personal.email ? `<span>📧 ${data.personal.email}</span>` : ''}
//       ${data.personal.phone ? `<span>📱 ${data.personal.phone}</span>` : ''}
//     </div>
//   </div>
//   <div class="content">
//     <div>${currentDate}</div>
//     <div style="margin: 20px 0;"><strong>${data.company.hiringManager || "Hiring Manager"}</strong><br/>${data.company.name}</div>
//     <div style="font-weight: 600; margin: 15px 0;">Re: ${data.company.jobTitle} Position</div>
//     ${sectionsHtml}
//     <div style="margin-top: 30px;">Best regards,<br/><strong>${data.personal.fullName || "Your Name"}</strong></div>
//   </div>
// </div>
// </body>
// </html>`;
// };

// // Template 7: Warm Organic
// const renderWarmOrganicTemplate = (data: CoverLetterData, contentSections: LetterSection[], isPreview: boolean = false) => {
//   const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

//   const sectionsHtml = contentSections
//     .filter(section => section.content.trim())
//     .map(section => `<div style="margin-bottom: 24px; background: #fff7ed; padding: 15px; border-radius: 16px;"><h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px; color: #ea580c;">${section.title}</h3><div style="line-height: 1.6;">${section.content.replace(/\n/g, '<br/>')}</div></div>`).join('');

//   return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8">
//   <title>Cover Letter - ${data.personal.fullName}</title>
//   <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
//   <style>
//     * { margin: 0; padding: 0; box-sizing: border-box; }
//     body { font-family: 'Nunito', sans-serif; background: ${isPreview ? '#fffbeb' : 'white'}; padding: ${isPreview ? '20px' : '0'}; }
//     .letter { max-width: 750px; margin: 0 auto; background: white; border-radius: 32px; overflow: hidden; box-shadow: ${isPreview ? '0 20px 40px -12px rgba(234,88,12,0.15)' : 'none'}; }
//     .header { background: linear-gradient(135deg, #ea580c 0%, #f59e0b 100%); padding: 40px; color: white; text-align: center; }
//     .name { font-size: 34px; font-weight: 800; }
//     .content { padding: 35px; }
//     @media (max-width: 768px) { .header { padding: 25px; } .content { padding: 25px; } }
//   </style>
// </head>
// <body>
// <div class="letter">
//   <div class="header">
//     <div class="name">${data.personal.fullName || "Your Name"}</div>
//     <div style="font-size: 15px; margin-top: 8px;">${data.personal.title || "Professional"}</div>
//   </div>
//   <div class="content">
//     <div>${currentDate}</div>
//     <div style="margin: 20px 0;"><strong>${data.company.hiringManager || "Hiring Manager"}</strong><br/>${data.company.name}</div>
//     <div style="font-size: 18px; font-weight: 600; margin: 15px 0;">Hello ${data.company.hiringManager || "Hiring Manager"},</div>
//     ${sectionsHtml}
//     <div style="margin-top: 30px; text-align: center; padding-top: 20px; border-top: 2px solid #fed7aa;">
//       With warmth,<br/><strong>${data.personal.fullName || "Your Name"}</strong>
//     </div>
//   </div>
// </div>
// </body>
// </html>`;
// };

// // Template 8: Creative Wave
// const renderCreativeWaveTemplate = (data: CoverLetterData, contentSections: LetterSection[], isPreview: boolean = false) => {
//   const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

//   const sectionsHtml = contentSections
//     .filter(section => section.content.trim())
//     .map(section => `<div style="margin-bottom: 20px;"><h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px; color: #0d9488;">✨ ${section.title}</h3><div style="line-height: 1.6;">${section.content.replace(/\n/g, '<br/>')}</div></div>`).join('');

//   return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8">
//   <title>Cover Letter - ${data.personal.fullName}</title>
//   <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
//   <style>
//     * { margin: 0; padding: 0; box-sizing: border-box; }
//     body { font-family: 'Quicksand', sans-serif; background: ${isPreview ? '#f0fdfa' : 'white'}; padding: ${isPreview ? '20px' : '0'}; }
//     .letter { max-width: 800px; margin: 0 auto; background: white; position: relative; box-shadow: ${isPreview ? '0 20px 40px -12px rgba(13,148,136,0.15)' : 'none'}; }
//     .wave { position: absolute; top: 0; left: 0; right: 0; height: 8px; background: linear-gradient(90deg, #0d9488, #14b8a6, #5eead4, #14b8a6, #0d9488); background-size: 200% 100%; animation: wave 3s ease infinite; }
//     @keyframes wave { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
//     .header { padding: 50px 40px 20px; text-align: center; }
//     .name { font-size: 36px; font-weight: 700; color: #0d9488; }
//     .content { padding: 20px 40px 40px; }
//     @media (max-width: 768px) { .header { padding: 40px 25px 15px; } .content { padding: 20px 25px 30px; } }
//   </style>
// </head>
// <body>
// <div class="letter">
//   <div class="wave"></div>
//   <div class="header">
//     <div class="name">${data.personal.fullName || "Your Name"}</div>
//     <div style="font-size: 14px; color: #64748b; margin-top: 8px;">${data.personal.title || "Professional"}</div>
//     <div style="display: flex; justify-content: center; gap: 15px; margin-top: 15px; font-size: 12px; color: #0d9488;">
//       ${data.personal.email ? `<span>✉️ ${data.personal.email}</span>` : ''}
//       ${data.personal.phone ? `<span>📞 ${data.personal.phone}</span>` : ''}
//     </div>
//   </div>
//   <div class="content">
//     <div>${currentDate}</div>
//     <div style="margin: 20px 0;"><strong>${data.company.hiringManager || "Hiring Manager"}</strong><br/>${data.company.name}</div>
//     <div style="font-size: 18px; font-weight: 600; margin: 15px 0;">Dear ${data.company.hiringManager || "Hiring Manager"},</div>
//     ${sectionsHtml}
//     <div style="margin-top: 30px;">Creatively yours,<br/><strong>${data.personal.fullName || "Your Name"}</strong></div>
//   </div>
// </div>
// </body>
// </html>`;
// };

// // ============================================================
// // PREVIEW FRAME
// // ============================================================

// function PreviewFrame({ html, isGenerating }: { html: string; isGenerating: boolean }) {
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   useEffect(() => {
//     if (iframeRef.current && html && !isGenerating) {
//       const iframe = iframeRef.current;
//       const doc = iframe.contentDocument || iframe.contentWindow?.document;
//       if (doc) {
//         doc.open();
//         doc.write(html);
//         doc.close();
//       }
//     }
//   }, [html, isGenerating]);

//   if (isGenerating) {
//     return (
//       <div className="preview-loading">
//         <div className="loading-spinner"></div>
//         <p>Generating preview...</p>
//       </div>
//     );
//   }

//   if (!html) {
//     return (
//       <div className="preview-empty">
//         <div className="empty-icon">✨</div>
//         <p>Your cover letter preview will appear here</p>
//         <span>Fill in your details and generate</span>
//       </div>
//     );
//   }

//   return (
//     <div className="preview-container">
//       <button className="fullscreen-btn" onClick={() => setIsFullscreen(!isFullscreen)}>
//         {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
//         {isFullscreen ? "Exit" : "Fullscreen"}
//       </button>
//       <iframe
//         ref={iframeRef}
//         title="Cover Letter Preview"
//         className={`preview-iframe ${isFullscreen ? 'fullscreen' : ''}`}
//         sandbox="allow-same-origin allow-scripts"
//       />
//       <style>{`
//         .preview-container { position: relative; height: 100%; min-height: 500px; }
//         .fullscreen-btn { position: absolute; top: 12px; right: 12px; z-index: 10; background: rgba(255,255,255,0.95); backdrop-filter: blur(8px); border: 1px solid #e2e8f0; border-radius: 30px; padding: 6px 14px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 500; color: #475569; transition: all 0.2s; }
//         .preview-iframe { width: 100%; height: 550px; border: none; border-radius: 20px; background: #f8fafc; transition: all 0.3s ease; }
//         .preview-iframe.fullscreen { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 1000; border-radius: 0; }
//         .preview-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 550px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 20px; }
//         .loading-spinner { width: 48px; height: 48px; border: 3px solid #e2e8f0; border-top-color: #4f46e5; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 16px; }
//         .preview-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 550px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 20px; text-align: center; padding: 20px; }
//         .empty-icon { font-size: 64px; margin-bottom: 16px; opacity: 0.5; }
//         .preview-empty p { font-size: 16px; font-weight: 500; color: #334155; margin-bottom: 8px; }
//         .preview-empty span { font-size: 13px; color: #64748b; }
//         @keyframes spin { to { transform: rotate(360deg); } }
//         @media (max-width: 768px) { .preview-iframe, .preview-loading, .preview-empty { height: 450px; } }
//       `}</style>
//     </div>
//   );
// }

// // ============================================================
// // MAIN COMPONENT
// // ============================================================

// export default function UniqueCoverLetterGenerator() {
//   const [selectedTemplate, setSelectedTemplate] = useState<string>("split-screen");
//   const [showTemplates, setShowTemplates] = useState(true);
//   const [formData, setFormData] = useState<CoverLetterData>({
//     personal: {
//       fullName: "",
//       title: "",
//       email: "",
//       phone: "",
//       location: "",
//       website: "",
//       linkedin: "",
//       github: "",
//     },
//     company: {
//       name: "",
//       jobTitle: "",
//       hiringManager: "",
//       hiringManagerTitle: "",
//       address: "",
//       city: "",
//       state: "",
//       zipCode: "",
//       department: "",
//     },
//     sections: [
//       { id: "1", title: "Introduction", content: "", placeholder: "Introduce yourself and express your interest in the role..." },
//       { id: "2", title: "Experience & Skills", content: "", placeholder: "Highlight your relevant experience, skills, and qualifications..." },
//       { id: "3", title: "Why This Company", content: "", placeholder: "Explain why you're interested in this specific company..." },
//       { id: "4", title: "Closing", content: "", placeholder: "Wrap up with a call to action and professional closing..." },
//     ],
//     tone: "professional",
//     achievements: [],
//     additionalNotes: "",
//   });

//   const [achievementInput, setAchievementInput] = useState("");
//   const [previewHtml, setPreviewHtml] = useState<string>("");
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isDownloading, setIsDownloading] = useState(false);
//   const [activeStep, setActiveStep] = useState<"personal" | "company" | "content">("personal");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const currentTemplate = templates.find(t => t.id === selectedTemplate);

//   const getTemplateRenderer = (templateId: string) => {
//     const renderers: Record<string, any> = {
//       "split-screen": renderSplitScreenTemplate,
//       "sidebar-pro": renderSidebarTemplate,
//       "minimal-elegant": renderMinimalTemplate,
//       "bold-header": renderBoldHeaderTemplate,
//       "classic-serif": renderClassicSerifTemplate,
//       "tech-modern": renderTechModernTemplate,
//       "warm-organic": renderWarmOrganicTemplate,
//       "creative-wave": renderCreativeWaveTemplate,
//     };
//     return renderers[templateId] || renderSplitScreenTemplate;
//   };

//   const addSection = () => {
//     setFormData(prev => ({
//       ...prev,
//       sections: [...prev.sections, {
//         id: Date.now().toString(),
//         title: "New Section",
//         content: "",
//         placeholder: "Write your content here..."
//       }]
//     }));
//   };

//   const removeSection = (id: string) => {
//     if (formData.sections.length > 1) {
//       setFormData(prev => ({
//         ...prev,
//         sections: prev.sections.filter(s => s.id !== id)
//       }));
//     }
//   };

//   const updateSection = (id: string, field: "title" | "content", value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       sections: prev.sections.map(s => s.id === id ? { ...s, [field]: value } : s)
//     }));
//   };

//   const addAchievement = () => {
//     if (achievementInput.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         achievements: [...prev.achievements, achievementInput.trim()]
//       }));
//       setAchievementInput("");
//     }
//   };

//   const removeAchievement = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       achievements: prev.achievements.filter((_, i) => i !== index)
//     }));
//   };

//   const generatePreview = useCallback(() => {
//     if (currentTemplate) {
//       const renderer = getTemplateRenderer(selectedTemplate);
//       const html = renderer(formData, formData.sections, true);
//       setPreviewHtml(html);
//     }
//   }, [currentTemplate, formData, selectedTemplate]);

//   useEffect(() => {
//     const timer = setTimeout(generatePreview, 300);
//     return () => clearTimeout(timer);
//   }, [formData, selectedTemplate, generatePreview]);

//   const handleGenerate = () => {
//     if (!formData.personal.fullName) {
//       setError("Please enter your full name");
//       return;
//     }
//     if (!formData.company.name) {
//       setError("Please enter the company name");
//       return;
//     }
//     if (!formData.company.jobTitle) {
//       setError("Please enter the job title");
//       return;
//     }

//     setIsGenerating(true);
//     setError("");

//     setTimeout(() => {
//       const renderer = getTemplateRenderer(selectedTemplate);
//       const html = renderer(formData, formData.sections, true);
//       setPreviewHtml(html);
//       setIsGenerating(false);
//       setSuccess("✨ Cover letter generated!");
//       setTimeout(() => setSuccess(""), 3000);
//     }, 800);
//   };

//   const handleDownloadPDF = async () => {
//     if (!previewHtml) {
//       setError("Please generate a cover letter first");
//       return;
//     }

//     setIsDownloading(true);
//     try {
//       const renderer = getTemplateRenderer(selectedTemplate);
//       const html = renderer(formData, formData.sections, false);

//       const response: AxiosResponse<Blob> = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/candidates/generate-pdf`,
//         { html },
//         { responseType: "blob" }
//       );

//       const pdfBlob: Blob = response.data;
//       const url: string = URL.createObjectURL(pdfBlob);
//       const a: HTMLAnchorElement = document.createElement("a");

//       const fileName = `Cover_Letter_${formData.personal.fullName.replace(/\s/g, "_")}.pdf`;
//       a.href = url;
//       a.download = fileName;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);

//       setSuccess("📄 PDF downloaded!");
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       setError("Failed to generate PDF. Please try again.");
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const copyToClipboard = () => {
//     const plainText = formData.sections.map(s => `${s.title}\n${s.content}`).join("\n\n");
//     navigator.clipboard.writeText(plainText);
//     setSuccess("📋 Copied to clipboard!");
//     setTimeout(() => setSuccess(""), 3000);
//   };

//   const resetAll = () => {
//     setFormData({
//       personal: {
//         fullName: "",
//         title: "",
//         email: "",
//         phone: "",
//         location: "",
//         website: "",
//         linkedin: "",
//         github: "",
//       },
//       company: {
//         name: "",
//         jobTitle: "",
//         hiringManager: "",
//         hiringManagerTitle: "",
//         address: "",
//         city: "",
//         state: "",
//         zipCode: "",
//         department: "",
//       },
//       sections: [
//         { id: "1", title: "Introduction", content: "", placeholder: "Introduce yourself and express your interest in the role..." },
//         { id: "2", title: "Experience & Skills", content: "", placeholder: "Highlight your relevant experience, skills, and qualifications..." },
//         { id: "3", title: "Why This Company", content: "", placeholder: "Explain why you're interested in this specific company..." },
//         { id: "4", title: "Closing", content: "", placeholder: "Wrap up with a call to action and professional closing..." },
//       ],
//       tone: "professional",
//       achievements: [],
//       additionalNotes: "",
//     });
//     setAchievementInput("");
//     setPreviewHtml("");
//     setError("");
//   };

//   return (
//     <>
//       <style>{`

//         /* Header */
//         .saas-header { background: rgba(255,255,255,0.98); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(226,232,240,0.6); position: sticky; top: 0; z-index: 100; }
//         .header-content { max-width: 1400px; margin: 0 auto; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
//         .logo-area h1 { font-size: clamp(20px, 5vw, 26px); font-weight: 800; background: linear-gradient(135deg, #4f46e5 0%, #8b5cf6 50%, #ec4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0; }
//         .logo-area p { font-size: 12px; color: #64748b; margin-top: 4px; }
//         .header-actions { display: flex; gap: 12px; flex-wrap: wrap; }
//         .btn-outline { padding: 8px 20px; background: white; border: 1px solid #e2e8f0; border-radius: 40px; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; color: #475569; }
//         .btn-outline:hover { background: #f8fafc; border-color: #cbd5e1; }
//         .btn-primary { padding: 8px 24px; background: linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%); border: none; border-radius: 40px; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; color: white; transition: all 0.2s; }
//         .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(79,70,229,0.3); }
//         .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

//         /* Layout */
//         .main-layout { max-width: 1400px; margin: 0 auto; padding: 24px; }

//         /* Template Gallery */
//         .template-gallery { margin-bottom: 32px; }
//         .section-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 20px; }
//         .section-header h2 { font-size: clamp(18px, 4vw, 22px); font-weight: 700; color: #0f172a; }
//         .template-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
//         .template-card { padding: 16px; border-radius: 20px; background: white; border: 1px solid #e2e8f0; cursor: pointer; transition: all 0.3s ease; }
//         .template-card:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1); }
//         .template-card.selected { border: 2px solid #4f46e5; background: #f5f3ff; }
//         .template-preview { height: 70px; border-radius: 12px; margin-bottom: 12px; }
//         .template-info { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
//         .template-name { font-weight: 700; font-size: 14px; color: #1f2937; }
//         .template-desc { font-size: 11px; color: #6b7280; line-height: 1.4; }

//         /* Form Container */
//         .form-container { background: white; border-radius: 28px; box-shadow: 0 20px 35px -12px rgba(0,0,0,0.08); border: 1px solid rgba(226,232,240,0.4); overflow: hidden; }

//         /* Steps */
//         .steps { display: flex; border-bottom: 1px solid #f1f5f9; background: #fafcff; padding: 0 20px; overflow-x: auto; scrollbar-width: none; }
//         .steps::-webkit-scrollbar { display: none; }
//         .step-btn { padding: 16px 20px; background: transparent; border: none; border-bottom: 2px solid transparent; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #64748b; transition: all 0.2s; white-space: nowrap; }
//         .step-btn.active { color: #4f46e5; border-bottom-color: #4f46e5; }
//         .step-number { width: 24px; height: 24px; border-radius: 12px; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; }
//         .step-btn.active .step-number { background: #4f46e5; color: white; }

//         /* Form Content */
//         .form-content { padding: 28px; max-height: calc(100vh - 200px); overflow-y: auto; }
//         @media (max-width: 768px) { .form-content { padding: 20px; } }

//         /* Form Elements */
//         .form-group { margin-bottom: 20px; }
//         .form-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px; }
//         .input-wrapper { position: relative; }
//         .input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; }
//         input, textarea, select { width: 100%; padding: 12px 16px; padding-left: 42px; border-radius: 14px; border: 1px solid #e2e8f0; font-size: 14px; font-family: inherit; transition: all 0.2s; background: white; }
//         textarea { padding-left: 16px; resize: vertical; }
//         input:focus, textarea:focus, select:focus { outline: none; border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79,70,229,0.1); }

//         /* Grids */
//         .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
//         .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
//         @media (max-width: 640px) { .grid-2, .grid-3 { grid-template-columns: 1fr; } }

//         /* Section Cards */
//         .section-card { margin-bottom: 20px; padding: 16px; background: #fafcff; border-radius: 20px; border: 1px solid #f1f5f9; }
//         .section-header-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
//         .section-number { width: 28px; height: 28px; border-radius: 8px; background: #e0e7ff; display: flex; align-items: center; justify-content: center; color: #4f46e5; font-weight: 600; font-size: 12px; }
//         .section-title-input { flex: 1; padding: 8px 12px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; background: white; }
//         .remove-section { padding: 8px; background: #fef2f2; border: none; border-radius: 10px; cursor: pointer; color: #ef4444; }

//         /* Achievements */
//         .achievements-list { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
//         .achievement-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; background: linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%); border-radius: 40px; font-size: 12px; font-weight: 500; color: #4f46e5; }

//         /* Buttons */
//         .action-buttons { display: flex; gap: 12px; margin-top: 24px; }
//         .btn-generate { flex: 2; padding: 14px; background: linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%); color: white; border: none; border-radius: 18px; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
//         .btn-reset { flex: 1; padding: 14px; background: white; color: #64748b; border: 1px solid #e2e8f0; border-radius: 18px; font-size: 14px; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }

//         /* Preview Panel */
//         .preview-panel { background: white; border-radius: 28px; box-shadow: 0 20px 35px -12px rgba(0,0,0,0.08); border: 1px solid rgba(226,232,240,0.4); overflow: hidden; position: sticky; top: 90px; }
//         .preview-header { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; background: #fafcff; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
//         .preview-title { display: flex; align-items: center; gap: 10px; }
//         .preview-icon { width: 36px; height: 36px; border-radius: 12px; background: linear-gradient(135deg, #4f46e5 10%, #8b5cf6 100%); display: flex; align-items: center; justify-content: center; }
//         .preview-badge { padding: 4px 12px; background: #f1f5f9; border-radius: 30px; font-size: 11px; font-weight: 600; color: #475569; }
//         .preview-content { padding: 20px; background: #f8fafc; }

//         /* Messages */
//         .error-message { margin-top: 20px; padding: 12px 16px; background: #fef2f2; border-radius: 14px; color: #dc2626; font-size: 13px; border: 1px solid #fee2e2; }
//         .success-message { margin-top: 20px; padding: 12px 16px; background: #f0fdf4; border-radius: 14px; color: #16a34a; font-size: 13px; border: 1px solid #dcfce7; display: flex; align-items: center; gap: 8px; }

//         /* Main Grid */
//         .main-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 28px; }
//         @media (max-width: 1024px) { .main-grid { grid-template-columns: 1fr; gap: 24px; } .preview-panel { position: relative; top: 0; } }

//         /* Animations */
//         @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
//         .fade-in { animation: fadeIn 0.3s ease-out; }
//       `}</style>

//       <div className="app-container">
//         {/* Header */}
//         <header className="saas-header">
//           <div className="header-content">
//             <div className="logo-area">
//               <h1>✨ Cover Letter Studio</h1>
//               <p>8 unique templates • Professional results</p>
//             </div>
//             <div className="header-actions">
//               <button className="btn-outline" onClick={() => setShowTemplates(!showTemplates)}>
//                 <Palette size={16} /> {showTemplates ? "Hide" : "Show"} Templates
//               </button>
//               <button className="btn-outline" onClick={copyToClipboard}>
//                 <Copy size={16} /> Copy
//               </button>
//               <button className="btn-primary" onClick={handleDownloadPDF} disabled={isDownloading}>
//                 {isDownloading ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Download size={16} />}
//                 Download PDF
//               </button>
//             </div>
//           </div>
//         </header>

//         <div className="main-layout">
//           {/* Template Gallery */}
//           {showTemplates && (
//             <div className="template-gallery fade-in">
//               <div className="section-header">
//                 <div>
//                   <h2>Choose Your Unique Template</h2>
//                   <p>Each template has its own distinct layout and personality</p>
//                 </div>
//               </div>
//               <div className="template-grid">
//                 {templates.map((template) => (
//                   <div
//                     key={template.id}
//                     className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
//                     onClick={() => setSelectedTemplate(template.id)}
//                   >
//                     <div className="template-preview" style={{ background: template.previewBg || `linear-gradient(135deg, ${template.primaryColor}20, ${template.secondaryColor}20)` }} />
//                     <div className="template-info">
//                       <span style={{ color: template.primaryColor }}>{template.icon}</span>
//                       <span className="template-name">{template.name}</span>
//                     </div>
//                     <p className="template-desc">{template.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Main Grid */}
//           <div className="main-grid">
//             {/* Left Column - Form */}
//             <div className="form-container">
//               <div className="steps">
//                 <button className={`step-btn ${activeStep === 'personal' ? 'active' : ''}`} onClick={() => setActiveStep('personal')}>
//                   <span className="step-number">1</span><span>Personal</span>
//                 </button>
//                 <button className={`step-btn ${activeStep === 'company' ? 'active' : ''}`} onClick={() => setActiveStep('company')}>
//                   <span className="step-number">2</span><span>Company</span>
//                 </button>
//                 <button className={`step-btn ${activeStep === 'content' ? 'active' : ''}`} onClick={() => setActiveStep('content')}>
//                   <span className="step-number">3</span><span>Content</span>
//                 </button>
//               </div>

//               <div className="form-content">
//                 {activeStep === 'personal' && (
//                   <div className="fade-in">
//                     <div className="form-group">
//                       <label className="form-label">Full Name <span>*</span></label>
//                       <div className="input-wrapper">
//                         <span className="input-icon"><User size={16} /></span>
//                         <input type="text" placeholder="Johnathan M. Doe" value={formData.personal.fullName} onChange={(e) => setFormData(prev => ({ ...prev, personal: { ...prev.personal, fullName: e.target.value } }))} />
//                       </div>
//                     </div>
//                     <div className="form-group">
//                       <label className="form-label">Professional Title</label>
//                       <div className="input-wrapper">
//                         <span className="input-icon"><Briefcase size={16} /></span>
//                         <input type="text" placeholder="Senior Software Engineer" value={formData.personal.title} onChange={(e) => setFormData(prev => ({ ...prev, personal: { ...prev.personal, title: e.target.value } }))} />
//                       </div>
//                     </div>
//                     <div className="grid-2">
//                       <div className="form-group">
//                         <label className="form-label">Email</label>
//                         <div className="input-wrapper"><span className="input-icon"><Mail size={16} /></span><input type="email" placeholder="john@example.com" value={formData.personal.email} onChange={(e) => setFormData(prev => ({ ...prev, personal: { ...prev.personal, email: e.target.value } }))} /></div>
//                       </div>
//                       <div className="form-group">
//                         <label className="form-label">Phone</label>
//                         <div className="input-wrapper"><span className="input-icon"><Phone size={16} /></span><input type="tel" placeholder="+1 (555) 000-9999" value={formData.personal.phone} onChange={(e) => setFormData(prev => ({ ...prev, personal: { ...prev.personal, phone: e.target.value } }))} /></div>
//                       </div>
//                     </div>
//                     <div className="form-group">
//                       <label className="form-label">Location</label>
//                       <div className="input-wrapper"><span className="input-icon"><MapPin size={16} /></span><input type="text" placeholder="San Francisco, CA" value={formData.personal.location} onChange={(e) => setFormData(prev => ({ ...prev, personal: { ...prev.personal, location: e.target.value } }))} /></div>
//                     </div>
//                     <div className="grid-2">
//                       <div className="form-group">
//                         <label className="form-label">LinkedIn</label>
//                         <div className="input-wrapper"><span className="input-icon"><Linkedin size={16} /></span><input type="text" placeholder="linkedin.com/in/johndoe" value={formData.personal.linkedin} onChange={(e) => setFormData(prev => ({ ...prev, personal: { ...prev.personal, linkedin: e.target.value } }))} /></div>
//                       </div>
//                       <div className="form-group">
//                         <label className="form-label">Portfolio</label>
//                         <div className="input-wrapper"><span className="input-icon"><Globe2 size={16} /></span><input type="text" placeholder="johndoe.com" value={formData.personal.website} onChange={(e) => setFormData(prev => ({ ...prev, personal: { ...prev.personal, website: e.target.value } }))} /></div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {activeStep === 'company' && (
//                   <div className="fade-in">
//                     <div className="form-group">
//                       <label className="form-label">Company Name <span>*</span></label>
//                       <div className="input-wrapper"><span className="input-icon"><Building size={16} /></span><input type="text" placeholder="Google, Microsoft, Tesla" value={formData.company.name} onChange={(e) => setFormData(prev => ({ ...prev, company: { ...prev.company, name: e.target.value } }))} /></div>
//                     </div>
//                     <div className="form-group">
//                       <label className="form-label">Job Title <span>*</span></label>
//                       <div className="input-wrapper"><span className="input-icon"><Target size={16} /></span><input type="text" placeholder="Senior Frontend Engineer" value={formData.company.jobTitle} onChange={(e) => setFormData(prev => ({ ...prev, company: { ...prev.company, jobTitle: e.target.value } }))} /></div>
//                     </div>
//                     <div className="grid-2">
//                       <div className="form-group">
//                         <label className="form-label">Hiring Manager</label>
//                         <div className="input-wrapper"><span className="input-icon"><User size={16} /></span><input type="text" placeholder="Sarah Johnson" value={formData.company.hiringManager} onChange={(e) => setFormData(prev => ({ ...prev, company: { ...prev.company, hiringManager: e.target.value } }))} /></div>
//                       </div>
//                       <div className="form-group">
//                         <label className="form-label">Their Title</label>
//                         <div className="input-wrapper"><span className="input-icon"><Briefcase size={16} /></span><input type="text" placeholder="Director of Engineering" value={formData.company.hiringManagerTitle} onChange={(e) => setFormData(prev => ({ ...prev, company: { ...prev.company, hiringManagerTitle: e.target.value } }))} /></div>
//                       </div>
//                     </div>
//                     <div className="form-group">
//                       <label className="form-label">Street Address</label>
//                       <input type="text" placeholder="1600 Amphitheatre Parkway" value={formData.company.address} onChange={(e) => setFormData(prev => ({ ...prev, company: { ...prev.company, address: e.target.value } }))} style={{ paddingLeft: "16px" }} />
//                     </div>
//                     <div className="grid-3">
//                       <input type="text" placeholder="City" value={formData.company.city} onChange={(e) => setFormData(prev => ({ ...prev, company: { ...prev.company, city: e.target.value } }))} style={{ paddingLeft: "16px" }} />
//                       <input type="text" placeholder="State" value={formData.company.state} onChange={(e) => setFormData(prev => ({ ...prev, company: { ...prev.company, state: e.target.value } }))} style={{ paddingLeft: "16px" }} />
//                       <input type="text" placeholder="ZIP" value={formData.company.zipCode} onChange={(e) => setFormData(prev => ({ ...prev, company: { ...prev.company, zipCode: e.target.value } }))} style={{ paddingLeft: "16px" }} />
//                     </div>
//                   </div>
//                 )}

//                 {activeStep === 'content' && (
//                   <div className="fade-in">
//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
//                       <h3 style={{ fontSize: 16, fontWeight: 700 }}>📝 Letter Sections</h3>
//                       <button onClick={addSection} style={{ padding: "6px 14px", background: "#4f46e5", color: "white", border: "none", borderRadius: 30, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Plus size={14} /> Add</button>
//                     </div>
//                     {formData.sections.map((section, index) => (
//                       <div key={section.id} className="section-card">
//                         <div className="section-header-row">
//                           <div className="section-number">{index + 1}</div>
//                           <input className="section-title-input" value={section.title} onChange={(e) => updateSection(section.id, "title", e.target.value)} placeholder="Section Title" />
//                           {formData.sections.length > 1 && <button className="remove-section" onClick={() => removeSection(section.id)}><Trash2 size={14} /></button>}
//                         </div>
//                         <textarea rows={4} value={section.content} onChange={(e) => updateSection(section.id, "content", e.target.value)} placeholder={section.placeholder} style={{ width: "100%", padding: "12px", borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13, resize: "vertical" }} />
//                       </div>
//                     ))}
//                     <div style={{ marginTop: 24, padding: "16px", background: "#fafcff", borderRadius: 20, border: "1px solid #f1f5f9" }}>
//                       <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}><Award size={16} /> Key Achievements</h3>
//                       <div style={{ display: "flex", gap: 8 }}><input type="text" placeholder="e.g., Increased revenue by 40%" value={achievementInput} onChange={(e) => setAchievementInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addAchievement()} style={{ flex: 1, padding: "10px 14px", borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} /><button onClick={addAchievement} style={{ padding: "10px 20px", background: "#4f46e5", color: "white", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 600, fontSize: 12 }}>Add</button></div>
//                       <div className="achievements-list">{formData.achievements.map((achievement, idx) => (<div key={idx} className="achievement-badge"><Star size={12} /><span>{achievement}</span><button onClick={() => removeAchievement(idx)} style={{ background: "none", border: "none", cursor: "pointer", color: "#4f46e5", padding: 0, display: "flex" }}><X size={12} /></button></div>))}</div>
//                     </div>
//                     <div className="form-group" style={{ marginTop: 20 }}>
//                       <label className="form-label">Additional Notes</label>
//                       <textarea rows={3} placeholder="Add any special notes or context..." value={formData.additionalNotes} onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))} />
//                     </div>
//                   </div>
//                 )}

//                 {error && <div className="error-message">⚠️ {error}</div>}
//                 {success && <div className="success-message"><Check size={16} /> {success}</div>}

//                 <div className="action-buttons">
//                   <button className="btn-generate" onClick={handleGenerate} disabled={isGenerating}>{isGenerating ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <Sparkles size={18} />}{isGenerating ? "Generating..." : "Generate Cover Letter"}</button>
//                   <button className="btn-reset" onClick={resetAll}><RefreshCw size={16} /> Reset</button>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Preview */}
//             <div className="preview-panel">
//               <div className="preview-header">
//                 <div className="preview-title"><div className="preview-icon"><Eye size={16} color="white" /></div><div><h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Live Preview</h3><p style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>Exactly as PDF will appear</p></div></div>
//                 {currentTemplate && <div className="preview-badge">{currentTemplate.name}</div>}
//               </div>
//               <div className="preview-content"><PreviewFrame html={previewHtml} isGenerating={isGenerating} /></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// "use client";

// import React, { useState, useRef, useEffect, useCallback } from "react";

// // ============================================================
// // TYPES
// // ============================================================
// interface PersonalInfo {
//   fullName: string; title: string; email: string; phone: string;
//   location: string; website: string; linkedin: string; github: string;
// }
// interface CompanyInfo {
//   name: string; jobTitle: string; hiringManager: string; hiringManagerTitle: string;
//   address: string; city: string; state: string; zipCode: string; department: string;
// }
// interface LetterSection { id: string; title: string; content: string; placeholder: string; }
// interface CoverLetterData {
//   personal: PersonalInfo; company: CompanyInfo; sections: LetterSection[];
//   tone: string; achievements: string[]; additionalNotes: string;
// }
// interface Template {
//   id: string; name: string; description: string; category: string;
//   primaryColor: string; accentColor: string; previewGradient: string;
// }

// // ============================================================
// // 12 UNIQUE TEMPLATES
// // ============================================================
// const TEMPLATES: Template[] = [
//   { id: "aurora", name: "Aurora", description: "Soft gradient header with floating contact chips", category: "Modern", primaryColor: "#6366f1", accentColor: "#a78bfa", previewGradient: "linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a78bfa 100%)" },
//   { id: "obsidian", name: "Obsidian", description: "Dark luxury sidebar with gold accents", category: "Executive", primaryColor: "#1e1b4b", accentColor: "#c4b5fd", previewGradient: "linear-gradient(135deg,#1e1b4b 0%,#312e81 60%,#4c1d95 100%)" },
//   { id: "prism", name: "Prism", description: "Geometric shapes with bold color blocking", category: "Creative", primaryColor: "#7c3aed", accentColor: "#f0abfc", previewGradient: "linear-gradient(135deg,#7c3aed 0%,#c026d3 100%)" },
//   { id: "nordic", name: "Nordic", description: "Clean lines with a calm minimalist soul", category: "Minimal", primaryColor: "#4338ca", accentColor: "#818cf8", previewGradient: "linear-gradient(135deg,#e0e7ff 0%,#c7d2fe 50%,#a5b4fc 100%)" },
//   { id: "crimson", name: "Crimson", description: "Bold serif typography, editorial magazine feel", category: "Editorial", primaryColor: "#9f1239", accentColor: "#fda4af", previewGradient: "linear-gradient(135deg,#9f1239 0%,#e11d48 100%)" },
//   { id: "slate", name: "Slate", description: "Corporate precision with structured timeline", category: "Professional", primaryColor: "#1e293b", accentColor: "#94a3b8", previewGradient: "linear-gradient(135deg,#1e293b 0%,#334155 60%,#475569 100%)" },
//   { id: "moss", name: "Moss", description: "Organic earthy tones with botanical vibe", category: "Natural", primaryColor: "#166534", accentColor: "#86efac", previewGradient: "linear-gradient(135deg,#166534 0%,#15803d 60%,#16a34a 100%)" },
//   { id: "blaze", name: "Blaze", description: "Fiery gradient with bold typography", category: "Bold", primaryColor: "#ea580c", accentColor: "#fcd34d", previewGradient: "linear-gradient(135deg,#ea580c 0%,#f59e0b 100%)" },
//   { id: "frost", name: "Frost", description: "Icy glass-morphism with subtle blur panels", category: "Modern", primaryColor: "#0369a1", accentColor: "#7dd3fc", previewGradient: "linear-gradient(135deg,#0c4a6e 0%,#0369a1 60%,#0ea5e9 100%)" },
//   { id: "velvet", name: "Velvet", description: "Luxe deep purple with metallic shimmer", category: "Luxury", primaryColor: "#581c87", accentColor: "#e879f9", previewGradient: "linear-gradient(135deg,#581c87 0%,#7e22ce 60%,#a855f7 100%)" },
//   { id: "chalk", name: "Chalk", description: "Hand-crafted feel with sketch borders", category: "Artistic", primaryColor: "#292524", accentColor: "#57534e", previewGradient: "linear-gradient(135deg,#292524 0%,#44403c 60%,#57534e 100%)" },
//   { id: "neon", name: "Neon Grid", description: "Cyberpunk dark with electric accent lines", category: "Futuristic", primaryColor: "#0f172a", accentColor: "#22d3ee", previewGradient: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 60%,#312e81 100%)" },
// ];

// // ============================================================
// // TEMPLATE RENDERERS (full HTML)
// // ============================================================
// function renderTemplate(id: string, data: CoverLetterData): string {
//   const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
//   const addr = [data.company.address, data.company.city, data.company.state, data.company.zipCode].filter(Boolean).join(', ');
//   const sectionsHtml = (sections: LetterSection[], color: string, style: string = '') =>
//     sections.filter(s => s.content.trim()).map(s =>
//       `<div style="margin-bottom:22px;${style}"><h3 style="font-size:14px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin-bottom:8px;color:${color}">${s.title}</h3><p style="line-height:1.75;margin:0">${s.content.replace(/\n/g, '<br>')}</p></div>`
//     ).join('');
//   const achHtml = (color: string) => data.achievements.length ? `<div style="margin:18px 0"><div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;color:${color}">Key Achievements</div>${data.achievements.map(a => `<div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;font-size:13px"><span style="color:${color};margin-top:2px">▸</span><span>${a}</span></div>`).join('')}</div>` : '';
//   const name = data.personal.fullName || 'Your Name';
//   const title = data.personal.title || 'Professional';
//   const mgr = data.company.hiringManager || 'Hiring Manager';
//   const body = (color: string) => `<div style="color:#64748b;margin-bottom:20px;font-size:13px">${date}</div><div style="margin-bottom:20px;font-size:14px;line-height:1.7"><strong>${mgr}</strong>${data.company.hiringManagerTitle ? `, ${data.company.hiringManagerTitle}` : ''}<br>${data.company.name}${addr ? `<br>${addr}` : ''}</div><div style="font-size:16px;font-weight:600;margin-bottom:20px">Dear ${mgr},</div>${sectionsHtml(data.sections, color)}${achHtml(color)}${data.additionalNotes ? `<div style="margin:16px 0;padding:14px;background:#f8fafc;border-left:3px solid ${color};font-size:13px;line-height:1.7">${data.additionalNotes}</div>` : ''}<div style="margin-top:32px;font-size:14px">Sincerely,<br><br><strong style="font-size:15px">${name}</strong>${data.personal.email ? `<br><span style="color:#64748b;font-size:12px">${data.personal.email}</span>` : ''}</div>`;
//   const base = (css: string, layout: string) => `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',system-ui,sans-serif;background:white;color:#1e293b;font-size:14px}${css}</style></head><body>${layout}</body></html>`;

//   if (id === 'aurora') return base(`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');body{font-family:'DM Sans',sans-serif;}.wrap{max-width:860px;margin:0 auto}.hdr{background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 60%,#a78bfa 100%);padding:48px 48px 40px;color:white;position:relative;overflow:hidden}.hdr::after{content:'';position:absolute;right:-60px;top:-60px;width:220px;height:220px;border-radius:50%;background:rgba(255,255,255,.08)}.name{font-size:36px;font-weight:700;letter-spacing:-1px;margin-bottom:6px}.ttl{font-size:15px;opacity:.85;margin-bottom:24px}.chips{display:flex;flex-wrap:wrap;gap:8px}.chip{padding:5px 14px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:40px;font-size:12px;backdrop-filter:blur(4px)}.main{padding:44px 48px}`,
//     `<div class="wrap"><div class="hdr"><div class="name">${name}</div><div class="ttl">${title}</div><div class="chips">${[data.personal.email && `<span class="chip">✉ ${data.personal.email}</span>`, data.personal.phone && `<span class="chip">☏ ${data.personal.phone}</span>`, data.personal.location && `<span class="chip">◎ ${data.personal.location}</span>`, data.personal.linkedin && `<span class="chip">in ${data.personal.linkedin}</span>`].filter(Boolean).join('')}</div></div><div class="main">${body('#6366f1')}</div></div>`);

//   if (id === 'obsidian') return base(`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap');body{font-family:'Inter',sans-serif}.wrap{max-width:900px;margin:0 auto;display:flex;min-height:100vh}.side{width:280px;background:#1e1b4b;color:white;padding:40px 28px;flex-shrink:0}.side-name{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;line-height:1.2;margin-bottom:8px;color:#c4b5fd}.side-ttl{font-size:12px;color:#a5b4fc;letter-spacing:1px;text-transform:uppercase;margin-bottom:32px;padding-bottom:32px;border-bottom:1px solid rgba(196,181,253,.2)}.side-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6d5bba;margin-bottom:10px;margin-top:24px}.side-val{font-size:12px;color:#c4b5fd;line-height:1.8}.main{flex:1;padding:44px 44px;background:white}`,
//     `<div class="wrap"><div class="side"><div class="side-name">${name}</div><div class="side-ttl">${title}</div><div class="side-label">Contact</div>${[['Email', data.personal.email], ['Phone', data.personal.phone], ['Location', data.personal.location], ['LinkedIn', data.personal.linkedin]].filter(([, v]) => v).map(([l, v]) => `<div class="side-val"><span style="opacity:.5">${l}</span><br>${v}</div>`).join('')}</div><div class="main">${body('#7c3aed')}</div></div>`);

//   if (id === 'prism') return base(`@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500&display=swap');body{font-family:system-ui,sans-serif}.wrap{max-width:860px;margin:0 auto;background:white}.hdr{position:relative;padding:0;overflow:hidden;height:180px;background:linear-gradient(135deg,#7c3aed 0%,#c026d3 100%)}.geo1{position:absolute;right:0;top:0;width:250px;height:250px;background:rgba(255,255,255,.1);clip-path:polygon(100% 0,0 0,100% 100%)}.geo2{position:absolute;right:60px;top:0;width:180px;height:180px;background:rgba(255,255,255,.08);clip-path:polygon(100% 0,0 0,100% 100%)}.hdr-inner{position:absolute;bottom:24px;left:44px}.name{font-size:38px;font-weight:800;color:white;letter-spacing:-1.5px}.ttl{font-size:14px;color:rgba(255,255,255,.8);margin-top:6px}.contacts{display:flex;gap:24px;padding:16px 44px;background:#faf5ff;border-bottom:1px solid #e9d5ff;font-size:12px;color:#7c3aed;flex-wrap:wrap}.main{padding:36px 44px}`,
//     `<div class="wrap"><div class="hdr"><div class="geo1"></div><div class="geo2"></div><div class="hdr-inner"><div class="name">${name}</div><div class="ttl">${title}</div></div></div><div class="contacts">${[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).map(v => `<span>${v}</span>`).join('<span style="opacity:.3">|</span>')}</div><div class="main">${body('#7c3aed')}</div></div>`);

//   if (id === 'nordic') return base(`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');body{font-family:'DM Sans',sans-serif;background:#f8f9ff}.wrap{max-width:780px;margin:0 auto;background:white;border:1px solid #e0e7ff;padding:56px 64px}.name{font-family:'Instrument Serif',serif;font-size:44px;font-weight:400;letter-spacing:-2px;color:#1e1b4b;line-height:1}.sep{width:48px;height:3px;background:#6366f1;margin:16px 0}.ttl{font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#6366f1;margin-bottom:8px}.contact-row{display:flex;gap:24px;margin-bottom:36px;flex-wrap:wrap}.contact-val{font-size:12px;color:#64748b}.divider{height:1px;background:#e0e7ff;margin:28px 0}`,
//     `<div class="wrap"><div class="ttl">${title}</div><div class="name">${name}</div><div class="sep"></div><div class="contact-row">${[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).map(v => `<span class="contact-val">${v}</span>`).join('')}</div><div class="divider"></div>${body('#4338ca')}</div>`);

//   if (id === 'crimson') return base(`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=EB+Garamond:wght@400;500&display=swap');body{font-family:'EB Garamond',serif;background:#fffbf5}.wrap{max-width:800px;margin:0 auto;background:white;border:1px solid #fce7ef}.top-bar{background:#9f1239;padding:10px 48px}.name{font-family:'Playfair Display',serif;font-size:42px;font-weight:900;text-align:center;padding:36px 48px 0;color:#1e293b;letter-spacing:-1px}.ttl{font-family:'Playfair Display',serif;font-style:italic;text-align:center;font-size:16px;color:#9f1239;padding:8px 0 20px}.rule{display:flex;align-items:center;gap:12px;padding:0 48px;margin-bottom:20px}.rule-line{flex:1;height:1px;background:#fce7ef}.rule-diamond{width:8px;height:8px;background:#9f1239;transform:rotate(45deg);flex-shrink:0}.contacts{display:flex;justify-content:center;gap:24px;padding-bottom:24px;font-size:12px;color:#64748b;flex-wrap:wrap}.main{padding:16px 48px 48px}`,
//     `<div class="wrap"><div class="top-bar"></div><div class="name">${name}</div><div class="ttl">${title}</div><div class="rule"><div class="rule-line"></div><div class="rule-diamond"></div><div class="rule-line"></div></div><div class="contacts">${[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).map(v => `<span>${v}</span>`).join('<span>·</span>')}</div><div class="main">${body('#9f1239')}</div></div>`);

//   if (id === 'slate') return base(`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');body{font-family:'IBM Plex Sans',sans-serif;background:#f8fafc}.wrap{max-width:880px;margin:0 auto;background:white}.hdr{padding:40px 48px;border-bottom:3px solid #1e293b;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}.name{font-size:32px;font-weight:700;color:#1e293b;letter-spacing:-1px}.ttl{font-size:12px;color:#64748b;letter-spacing:2px;text-transform:uppercase;margin-top:6px}.contact-block{text-align:right;font-size:12px;color:#475569;line-height:2;font-family:'IBM Plex Mono',monospace}.main{padding:40px 48px}.tag{display:inline-block;padding:2px 10px;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:4px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:#64748b;margin-bottom:16px}`,
//     `<div class="wrap"><div class="hdr"><div><div class="name">${name}</div><div class="ttl">${title}</div></div><div class="contact-block">${[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join('<br>')}</div></div><div class="main"><div class="tag">APPLICATION · ${data.company.name || 'Company'} · ${data.company.jobTitle || 'Role'}</div>${body('#1e293b')}</div></div>`);

//   if (id === 'moss') return base(`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;600&display=swap');body{font-family:'Source Sans 3',sans-serif;background:#f0fdf4}.wrap{max-width:840px;margin:0 auto;background:white;border:1px solid #bbf7d0}.banner{background:linear-gradient(135deg,#166534 0%,#15803d 100%);padding:44px;color:white;display:flex;gap:24px;align-items:center}.leaf{font-size:48px;opacity:.4}.name{font-family:'Lora',serif;font-size:34px;font-weight:700;letter-spacing:-.5px}.ttl{font-size:13px;opacity:.8;margin-top:4px}.contact-strip{background:#f0fdf4;padding:12px 44px;display:flex;gap:20px;flex-wrap:wrap;border-bottom:1px solid #bbf7d0;font-size:12px;color:#166534}.main{padding:40px 44px}`,
//     `<div class="wrap"><div class="banner"><div class="leaf">🌿</div><div><div class="name">${name}</div><div class="ttl">${title}</div></div></div><div class="contact-strip">${[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).map(v => `<span>${v}</span>`).join('')}</div><div class="main">${body('#166534')}</div></div>`);

//   if (id === 'blaze') return base(`@import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,600;0,700;0,900;1,700&family=Barlow+Condensed:wght@500;700;900&display=swap');body{font-family:'Barlow',sans-serif;background:#fff7ed}.wrap{max-width:860px;margin:0 auto;background:white}.hdr{background:linear-gradient(120deg,#ea580c 0%,#f59e0b 100%);padding:40px 48px;color:white;position:relative}.name{font-family:'Barlow Condensed',sans-serif;font-size:52px;font-weight:900;letter-spacing:-2px;text-transform:uppercase;line-height:1}.ttl{font-size:14px;letter-spacing:3px;text-transform:uppercase;opacity:.85;margin-top:8px}.slash{position:absolute;right:0;top:0;bottom:0;width:80px;background:rgba(255,255,255,.1);clip-path:polygon(30% 0,100% 0,100% 100%,0 100%)}.info-bar{display:flex;gap:0;background:#1e293b}.info-chip{flex:1;padding:10px 20px;font-size:11px;color:#94a3b8;border-right:1px solid rgba(255,255,255,.05);text-align:center}.main{padding:40px 48px}`,
//     `<div class="wrap"><div class="hdr"><div class="name">${name}</div><div class="ttl">${title}</div><div class="slash"></div></div><div class="info-bar">${[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).slice(0,3).map(v => `<div class="info-chip">${v}</div>`).join('')}</div><div class="main">${body('#ea580c')}</div></div>`);

//   if (id === 'frost') return base(`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');body{font-family:'Outfit',sans-serif;background:linear-gradient(135deg,#e0f2fe 0%,#bae6fd 100%);min-height:100vh;padding:20px}.wrap{max-width:840px;margin:0 auto;background:rgba(255,255,255,.75);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.8);border-radius:24px;overflow:hidden;box-shadow:0 20px 60px rgba(3,105,161,.12)}.hdr{background:linear-gradient(135deg,rgba(12,74,110,.9) 0%,rgba(3,105,161,.9) 100%);padding:44px;color:white;backdrop-filter:blur(20px)}.name{font-size:36px;font-weight:800;letter-spacing:-1px}.ttl{font-size:13px;opacity:.8;margin-top:6px;letter-spacing:1px}.chips{display:flex;gap:8px;margin-top:20px;flex-wrap:wrap}.chip{padding:5px 14px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);border-radius:40px;font-size:11px;backdrop-filter:blur(8px)}.main{padding:40px 44px}`,
//     `<div class="wrap"><div class="hdr"><div class="name">${name}</div><div class="ttl">${title}</div><div class="chips">${[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).map(v => `<span class="chip">${v}</span>`).join('')}</div></div><div class="main">${body('#0369a1')}</div></div>`);

//   if (id === 'velvet') return base(`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&display=swap');body{font-family:'Raleway',sans-serif;background:#0f0a2e}.wrap{max-width:860px;margin:0 auto;background:linear-gradient(160deg,#1e1044 0%,#2d1b69 100%);color:#e2d9f3;min-height:100vh}.hdr{padding:52px 52px 40px;border-bottom:1px solid rgba(196,181,253,.15)}.name{font-family:'Cinzel',serif;font-size:36px;font-weight:600;color:#e9d5ff;letter-spacing:2px}.ttl{font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#a78bfa;margin-top:10px}.ornament{color:#a78bfa;font-size:18px;margin:16px 0}.contacts{display:flex;gap:20px;flex-wrap:wrap}.contact-val{font-size:12px;color:#c4b5fd;padding:4px 12px;border:1px solid rgba(196,181,253,.2);border-radius:4px}.main{padding:40px 52px;color:#d4c9ef}`,
//     `<div class="wrap"><div class="hdr"><div class="name">${name}</div><div class="ttl">${title}</div><div class="ornament">✦ ✦ ✦</div><div class="contacts">${[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).map(v => `<span class="contact-val">${v}</span>`).join('')}</div></div><div class="main">${body('#c084fc')}</div></div>`);

//   if (id === 'chalk') return base(`@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Nunito:wght@300;400;600;700&display=swap');body{font-family:'Nunito',sans-serif;background:#faf9f7}.wrap{max-width:820px;margin:0 auto;background:white;border:2px dashed #d6d3d1;padding:48px}.name{font-family:'Kalam',cursive;font-size:44px;color:#292524;border-bottom:3px dashed #d6d3d1;padding-bottom:16px;margin-bottom:16px}.ttl{font-family:'Kalam',cursive;font-size:16px;color:#78716c;margin-bottom:24px}.contact-row{display:flex;gap:20px;flex-wrap:wrap;margin-bottom:28px;padding-bottom:28px;border-bottom:2px dashed #e7e5e4}.contact-item{font-size:13px;color:#57534e;border:1.5px dashed #d6d3d1;padding:5px 14px;border-radius:8px}`,
//     `<div class="wrap"><div class="name">${name}</div><div class="ttl">${title}</div><div class="contact-row">${[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).map(v => `<span class="contact-item">${v}</span>`).join('')}</div>${body('#292524')}</div>`);

//   if (id === 'neon') return base(`@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Exo+2:wght@300;400;500;600;700;900&display=swap');body{font-family:'Exo 2',sans-serif;background:#0f172a;color:#e2e8f0;min-height:100vh}.wrap{max-width:880px;margin:0 auto;background:#0f172a}.hdr{padding:48px;border-bottom:1px solid rgba(34,211,238,.2);position:relative}.hdr::before{content:'';position:absolute;bottom:-1px;left:0;width:200px;height:2px;background:linear-gradient(90deg,#22d3ee,transparent)}.name{font-size:40px;font-weight:900;letter-spacing:-2px;color:white}.ttl{font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#22d3ee;margin-top:8px}.grid-bar{display:flex;gap:0;border-bottom:1px solid rgba(34,211,238,.1)}.grid-cell{flex:1;padding:12px 24px;font-family:'Share Tech Mono',monospace;font-size:11px;color:#94a3b8;border-right:1px solid rgba(34,211,238,.08)}.main{padding:44px}.sec h3{font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:2px;color:#22d3ee;margin-bottom:10px}.sec-line{width:32px;height:2px;background:#22d3ee;margin-bottom:12px}`,
//     `<div class="wrap"><div class="hdr"><div class="name">${name}</div><div class="ttl">${title}</div></div><div class="grid-bar">${[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).map(v => `<div class="grid-cell">${v}</div>`).join('')}</div><div class="main"><div style="color:#94a3b8;margin-bottom:20px;font-family:'Share Tech Mono',monospace;font-size:11px">${date}</div><div style="margin-bottom:20px;line-height:1.7;color:#cbd5e1"><strong style="color:white">${mgr}</strong>${data.company.hiringManagerTitle ? `, <span style="color:#94a3b8">${data.company.hiringManagerTitle}</span>` : ''}<br>${data.company.name}${addr ? `<br>${addr}` : ''}</div><div style="font-size:16px;font-weight:600;margin-bottom:20px;color:white">Dear ${mgr},</div>${data.sections.filter(s => s.content.trim()).map(s => `<div class="sec" style="margin-bottom:24px"><div class="sec-line"></div><h3>${s.title}</h3><p style="line-height:1.75;color:#cbd5e1">${s.content.replace(/\n/g, '<br>')}</p></div>`).join('')}${data.achievements.length ? `<div style="margin:18px 0">${data.achievements.map(a => `<div style="display:flex;gap:8px;margin-bottom:6px;font-size:13px;color:#94a3b8"><span style="color:#22d3ee;font-family:'Share Tech Mono',monospace">›</span>${a}</div>`).join('')}</div>` : ''}<div style="margin-top:32px;color:#94a3b8">Sincerely,<br><br><strong style="color:white;font-size:15px">${name}</strong></div></div></div>`);

//   return renderTemplate('aurora', data);
// }

// // ============================================================
// // MAIN COMPONENT
// // ============================================================
// const defaultData: CoverLetterData = {
//   personal: { fullName: '', title: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '' },
//   company: { name: '', jobTitle: '', hiringManager: '', hiringManagerTitle: '', address: '', city: '', state: '', zipCode: '', department: '' },
//   sections: [
//     { id: '1', title: 'Opening', content: '', placeholder: 'Express your enthusiasm for the role and company...' },
//     { id: '2', title: 'Experience & Skills', content: '', placeholder: 'Highlight your relevant experience and key strengths...' },
//     { id: '3', title: 'Why This Company', content: '', placeholder: 'Share what excites you about this organization...' },
//     { id: '4', title: 'Closing', content: '', placeholder: 'Call to action and professional closing statement...' },
//   ],
//   tone: 'professional', achievements: [], additionalNotes: '',
// };

// export default function CoverLetterGenerator() {
//   const [step, setStep] = useState<'template' | 'edit'>('template');
//   const [selectedId, setSelectedId] = useState('aurora');
//   const [data, setData] = useState<CoverLetterData>(JSON.parse(JSON.stringify(defaultData)));
//   const [tab, setTab] = useState<'personal' | 'company' | 'content'>('personal');
//   const [html, setHtml] = useState('');
//   const [showPreview, setShowPreview] = useState(false);
//   const [ach, setAch] = useState('');
//   const [toast, setToast] = useState('');
//   const [downloading, setDownloading] = useState(false);
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const previewIframeRef = useRef<HTMLIFrameElement>(null);

//   const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

//   const generate = useCallback(() => {
//     const h = renderTemplate(selectedId, data);
//     setHtml(h);
//     return h;
//   }, [selectedId, data]);

//   useEffect(() => { const t = setTimeout(generate, 250); return () => clearTimeout(t); }, [generate]);

//   useEffect(() => {
//     if (iframeRef.current && html) {
//       const doc = iframeRef.current.contentDocument;
//       if (doc) { doc.open(); doc.write(html); doc.close(); }
//     }
//   }, [html]);

//   useEffect(() => {
//     if (showPreview && previewIframeRef.current && html) {
//       const doc = previewIframeRef.current.contentDocument;
//       if (doc) { doc.open(); doc.write(html); doc.close(); }
//     }
//   }, [showPreview, html]);

//   const upd = (path: string[], val: string) => {
//     setData(prev => {
//       const next = JSON.parse(JSON.stringify(prev));
//       let cur: any = next;
//       for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
//       cur[path[path.length - 1]] = val;
//       return next;
//     });
//   };

//   const updSection = (id: string, field: 'title' | 'content', val: string) =>
//     setData(prev => ({ ...prev, sections: prev.sections.map(s => s.id === id ? { ...s, [field]: val } : s) }));

//   const addSection = () => setData(prev => ({
//     ...prev, sections: [...prev.sections, { id: Date.now().toString(), title: 'New Section', content: '', placeholder: 'Write your content here...' }]
//   }));

//   const removeSection = (id: string) => setData(prev => ({ ...prev, sections: prev.sections.filter(s => s.id !== id) }));

//   const addAch = () => { if (ach.trim()) { setData(prev => ({ ...prev, achievements: [...prev.achievements, ach.trim()] })); setAch(''); } };

//   const removeAch = (i: number) => setData(prev => ({ ...prev, achievements: prev.achievements.filter((_, idx) => idx !== i) }));

//   const downloadPDF = async () => {
//     if (!html) { showToast('Generate first!'); return; }
//     setDownloading(true);
//     try {
//       const { default: axios } = await import('axios');
//       const cleanHtml = renderTemplate(selectedId, data);
//       const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/candidates/generate-pdf`, { html: cleanHtml }, { responseType: 'blob' });
//       const url = URL.createObjectURL(resp.data);
//       const a = document.createElement('a');
//       a.href = url; a.download = `Cover_Letter_${data.personal.fullName || 'Draft'}.pdf`;
//       document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
//       showToast('PDF downloaded!');
//     } catch { showToast('PDF download failed.'); } finally { setDownloading(false); }
//   };

//   const copyText = () => {
//     const txt = data.sections.map(s => `${s.title}\n${s.content}`).join('\n\n');
//     navigator.clipboard.writeText(txt); showToast('Copied!');
//   };

//   const cat = (id: string) => TEMPLATES.find(t => t.id === id)?.category || '';

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap');
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         :root {
//           --bg: #f5f3ff; --surface: #ffffff; --border: #ede9fe; --border2: #ddd6fe;
//           --indigo: #4f46e5; --indigo-d: #3730a3; --purple: #7c3aed; --violet: #8b5cf6;
//           --soft: #ede9fe; --soft2: #f5f3ff; --muted: #6b7280; --text: #1e1b4b;
//           --radius: 16px; --radius-sm: 10px; --shadow: 0 4px 24px rgba(79,70,229,.08);
//           --shadow-lg: 0 20px 48px rgba(79,70,229,.14);
//         }
//         body { font-family: 'Bricolage Grotesque', system-ui, sans-serif; background: var(--bg); color: var(--text); }
//         .app { min-height: 100vh; display: flex; flex-direction: column; }

//         /* NAV */
//         .nav { background: rgba(255,255,255,.92); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 200; }
//         .nav-inner { max-width: 1400px; margin: 0 auto; padding: 0 24px; height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
//         .logo { display: flex; align-items: center; gap: 10px; }
//         .logo-icon { width: 36px; height: 36px; background: linear-gradient(135deg,#4f46e5,#8b5cf6); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
//         .logo-text { font-size: 18px; font-weight: 800; background: linear-gradient(135deg,#4f46e5,#7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
//         .logo-badge { font-size: 10px; background: var(--soft); color: var(--indigo); padding: 2px 8px; border-radius: 20px; font-weight: 600; letter-spacing: .5px; }
//         .nav-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
//         .btn { display: inline-flex; align-items: center; gap: 7px; padding: 9px 18px; border-radius: 40px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all .2s; border: none; font-family: inherit; }
//         .btn-ghost { background: transparent; color: var(--muted); border: 1px solid var(--border2); }
//         .btn-ghost:hover { background: var(--soft2); color: var(--indigo); }
//         .btn-indigo { background: linear-gradient(135deg,#4f46e5,#7c3aed); color: white; box-shadow: 0 4px 14px rgba(79,70,229,.3); }
//         .btn-indigo:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(79,70,229,.35); }
//         .btn-indigo:disabled { opacity: .6; cursor: not-allowed; transform: none; }
//         .btn-outline-indigo { background: white; color: var(--indigo); border: 1.5px solid var(--indigo); }
//         .btn-outline-indigo:hover { background: var(--soft2); }

//         /* STEP INDICATOR */
//         .steps { max-width: 1400px; margin: 0 auto; padding: 20px 24px 0; display: flex; align-items: center; gap: 8px; }
//         .step-item { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 6px 12px; border-radius: 40px; transition: all .2s; }
//         .step-item.active { background: white; box-shadow: var(--shadow); }
//         .step-dot { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; background: var(--border); color: var(--muted); transition: all .2s; flex-shrink: 0; }
//         .step-item.active .step-dot { background: linear-gradient(135deg,#4f46e5,#7c3aed); color: white; }
//         .step-item.done .step-dot { background: #10b981; color: white; }
//         .step-label { font-size: 13px; font-weight: 600; color: var(--muted); }
//         .step-item.active .step-label { color: var(--indigo); }
//         .step-arrow { color: var(--border2); font-size: 16px; }

//         /* TEMPLATE CHOOSER */
//         .chooser { max-width: 1400px; margin: 0 auto; padding: 24px; }
//         .chooser-header { margin-bottom: 28px; }
//         .chooser-title { font-size: clamp(24px,4vw,32px); font-weight: 800; color: var(--text); }
//         .chooser-sub { font-size: 15px; color: var(--muted); margin-top: 6px; }
//         .filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 20px; }
//         .filter-btn { padding: 6px 16px; border-radius: 30px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1.5px solid var(--border2); background: white; color: var(--muted); transition: all .2s; font-family: inherit; }
//         .filter-btn.active, .filter-btn:hover { border-color: var(--indigo); color: var(--indigo); background: var(--soft2); }
//         .tpl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
//         .tpl-card { background: white; border: 2px solid var(--border); border-radius: 20px; overflow: hidden; cursor: pointer; transition: all .25s; }
//         .tpl-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--violet); }
//         .tpl-card.selected { border-color: var(--indigo); box-shadow: 0 0 0 4px rgba(79,70,229,.12); }
//         .tpl-preview { height: 100px; position: relative; overflow: hidden; }
//         .tpl-preview-inner { position: absolute; inset: 0; display: flex; flex-direction: column; padding: 12px; }
//         .tpl-mock-name { height: 10px; background: rgba(255,255,255,.7); border-radius: 4px; width: 60%; margin-bottom: 6px; }
//         .tpl-mock-line { height: 6px; background: rgba(255,255,255,.4); border-radius: 3px; margin-bottom: 4px; }
//         .tpl-mock-line.w80 { width: 80%; }
//         .tpl-mock-line.w50 { width: 50%; }
//         .tpl-footer { padding: 14px 16px; }
//         .tpl-cat { font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--violet); margin-bottom: 4px; }
//         .tpl-name { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 2px; }
//         .tpl-desc { font-size: 11px; color: var(--muted); line-height: 1.4; }
//         .tpl-check { position: absolute; top: 8px; right: 8px; width: 22px; height: 22px; background: var(--indigo); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; }
//         .chooser-cta { margin-top: 32px; display: flex; gap: 12px; align-items: center; }

//         /* EDITOR LAYOUT */
//         .editor { max-width: 1400px; margin: 0 auto; padding: 20px 24px 40px; display: grid; grid-template-columns: 420px 1fr; gap: 24px; }
//         @media (max-width: 1100px) { .editor { grid-template-columns: 1fr; } }

//         /* FORM PANEL */
//         .form-panel { background: white; border-radius: 24px; box-shadow: var(--shadow); border: 1px solid var(--border); overflow: hidden; }
//         .tab-bar { display: flex; background: var(--soft2); border-bottom: 1px solid var(--border); }
//         .tab-btn { flex: 1; padding: 14px 8px; background: none; border: none; font-size: 12px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; color: var(--muted); cursor: pointer; border-bottom: 2px solid transparent; transition: all .2s; font-family: inherit; }
//         .tab-btn.active { color: var(--indigo); border-bottom-color: var(--indigo); background: white; }
//         .form-body { padding: 24px; max-height: calc(100vh - 280px); overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--border) transparent; }
//         .form-body::-webkit-scrollbar { width: 4px; }
//         .form-body::-webkit-scrollbar-track { background: transparent; }
//         .form-body::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }

//         /* FORM ELEMENTS */
//         .field { margin-bottom: 18px; }
//         .field label { display: block; font-size: 12px; font-weight: 700; color: var(--text); margin-bottom: 6px; letter-spacing: .3px; }
//         .field label span { color: #ef4444; }
//         .inp-wrap { position: relative; }
//         .inp-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; pointer-events: none; }
//         input, textarea, select {
//           width: 100%; padding: 10px 14px 10px 36px; border: 1.5px solid var(--border2); border-radius: 12px;
//           font-size: 13px; font-family: inherit; color: var(--text); background: white;
//           transition: all .2s; outline: none;
//         }
//         textarea { padding-left: 14px; resize: vertical; min-height: 80px; }
//         input:focus, textarea:focus, select:focus { border-color: var(--indigo); box-shadow: 0 0 0 3px rgba(79,70,229,.1); }
//         input::placeholder, textarea::placeholder { color: #9ca3af; }
//         .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
//         .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
//         @media (max-width: 600px) { .grid2, .grid3 { grid-template-columns: 1fr; } }
//         input.no-icon { padding-left: 14px; }

//         /* SECTION CARDS */
//         .sec-card { background: var(--soft2); border: 1px solid var(--border); border-radius: 16px; padding: 16px; margin-bottom: 14px; }
//         .sec-card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
//         .sec-num { width: 26px; height: 26px; background: var(--indigo); color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
//         .sec-title-inp { flex: 1; padding: 7px 12px; border-radius: 8px; border: 1.5px solid var(--border2); font-size: 13px; font-weight: 600; background: white; font-family: inherit; color: var(--text); outline: none; }
//         .sec-title-inp:focus { border-color: var(--indigo); }
//         .sec-del { width: 30px; height: 30px; background: #fef2f2; border: none; border-radius: 8px; cursor: pointer; color: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 14px; }
//         .add-sec-btn { width: 100%; padding: 10px; background: var(--soft2); border: 1.5px dashed var(--border2); border-radius: 12px; color: var(--indigo); font-weight: 600; font-size: 13px; cursor: pointer; font-family: inherit; transition: all .2s; margin-bottom: 16px; }
//         .add-sec-btn:hover { background: var(--soft); border-color: var(--indigo); }

//         /* ACHIEVEMENTS */
//         .ach-row { display: flex; gap: 8px; margin-bottom: 10px; }
//         .ach-inp { flex: 1; padding: 9px 13px; border: 1.5px solid var(--border2); border-radius: 10px; font-size: 13px; font-family: inherit; outline: none; }
//         .ach-inp:focus { border-color: var(--indigo); }
//         .ach-add { padding: 9px 18px; background: var(--indigo); color: white; border: none; border-radius: 10px; cursor: pointer; font-size: 12px; font-weight: 700; font-family: inherit; }
//         .ach-list { display: flex; flex-wrap: wrap; gap: 8px; }
//         .ach-tag { display: flex; align-items: center; gap: 6px; padding: 5px 12px; background: var(--soft); color: var(--indigo); border-radius: 30px; font-size: 12px; font-weight: 500; border: 1px solid var(--border2); }
//         .ach-rm { background: none; border: none; cursor: pointer; color: var(--indigo); opacity: .6; font-size: 14px; line-height: 1; padding: 0; }

//         /* GENERATE ACTIONS */
//         .form-actions { padding: 16px 24px; border-top: 1px solid var(--border); background: white; display: flex; gap: 10px; }
//         .btn-gen { flex: 1; padding: 13px; background: linear-gradient(135deg,#4f46e5,#7c3aed); color: white; border: none; border-radius: 14px; font-size: 14px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-family: inherit; transition: all .2s; }
//         .btn-gen:hover { box-shadow: 0 6px 20px rgba(79,70,229,.3); transform: translateY(-1px); }
//         .btn-gen:disabled { opacity: .6; cursor: not-allowed; transform: none; }

//         /* PREVIEW PANEL */
//         .preview-panel { background: white; border-radius: 24px; box-shadow: var(--shadow); border: 1px solid var(--border); overflow: hidden; position: sticky; top: 84px; max-height: calc(100vh - 104px); display: flex; flex-direction: column; }
//         .preview-head { padding: 16px 20px; border-bottom: 1px solid var(--border); background: var(--soft2); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; flex-shrink: 0; }
//         .preview-head-left { display: flex; align-items: center; gap: 10px; }
//         .preview-dot { width: 32px; height: 32px; background: linear-gradient(135deg,#4f46e5,#7c3aed); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
//         .preview-head-actions { display: flex; gap: 8px; flex-wrap: wrap; }
//         .preview-body { flex: 1; overflow: hidden; background: #f0eff9; }
//         .preview-iframe { width: 100%; height: 100%; border: none; }
//         .preview-empty { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--muted); gap: 12px; text-align: center; padding: 32px; }
//         .preview-empty-icon { font-size: 56px; opacity: .3; }

//         /* PREVIEW MODAL */
//         .modal-overlay { position: fixed; inset: 0; background: rgba(15,12,46,.8); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; }
//         .modal { background: white; border-radius: 24px; width: 100%; max-width: 900px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 40px 80px rgba(0,0,0,.3); }
//         .modal-head { padding: 18px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; background: var(--soft2); flex-shrink: 0; }
//         .modal-title { font-size: 16px; font-weight: 700; display: flex; align-items: center; gap: 10px; }
//         .modal-close { width: 34px; height: 34px; border-radius: 50%; background: white; border: 1.5px solid var(--border2); cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; color: var(--muted); transition: all .2s; }
//         .modal-close:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }
//         .modal-body { flex: 1; overflow: hidden; background: #f0eff9; }
//         .modal-foot { padding: 14px 24px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 10px; background: white; flex-shrink: 0; }

//         /* TOAST */
//         .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: var(--text); color: white; padding: 10px 24px; border-radius: 40px; font-size: 13px; font-weight: 600; z-index: 9999; animation: toastIn .3s ease; box-shadow: 0 8px 24px rgba(0,0,0,.2); }
//         @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(16px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

//         /* MISC */
//         .section-divider { height: 1px; background: var(--border); margin: 20px 0; }
//         .subsection-label { font-size: 12px; font-weight: 700; color: var(--indigo); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 6px; }
//         .tpl-tag { display: inline-flex; align-items: center; gap: 6px; background: var(--soft); color: var(--indigo); border: 1px solid var(--border2); padding: 4px 12px; border-radius: 30px; font-size: 12px; font-weight: 600; margin-bottom: 16px; cursor: pointer; transition: all .2s; }
//         .tpl-tag:hover { background: var(--soft2); }

//         @media (max-width: 768px) {
//           .nav-actions .btn-ghost { display: none; }
//           .editor { padding: 16px; gap: 16px; }
//           .form-body { max-height: none; }
//           .preview-panel { position: relative; top: 0; max-height: 500px; }
//           .chooser { padding: 16px; }
//         }
//       `}</style>

//       <div className="app">
//         {/* NAV */}
//         <nav className="nav">
//           <div className="nav-inner">
//             <div className="logo">
//               <div className="logo-icon">✦</div>
//               <span className="logo-text">Cover Letter Studio</span>
//               <span className="logo-badge">PRO</span>
//             </div>
//             <div className="nav-actions">
//               {step === 'edit' && (
//                 <>
//                   <button className="btn btn-ghost" onClick={() => setStep('template')}>← Templates</button>
//                   <button className="btn btn-ghost" onClick={copyText}>⎘ Copy</button>
//                   <button className="btn btn-ghost" onClick={() => { generate(); setShowPreview(true); }}>⊡ Full Preview</button>
//                   <button className="btn btn-indigo" onClick={downloadPDF} disabled={downloading}>
//                     {downloading ? '⏳' : '⬇'} Download PDF
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </nav>

//         {/* STEP INDICATOR */}
//         <div className="steps">
//           <div className={`step-item ${step === 'template' ? 'active' : 'done'}`} onClick={() => setStep('template')}>
//             <div className="step-dot">{step === 'template' ? '1' : '✓'}</div>
//             <span className="step-label">Choose Template</span>
//           </div>
//           <span className="step-arrow">›</span>
//           <div className={`step-item ${step === 'edit' ? 'active' : ''}`}>
//             <div className="step-dot">2</div>
//             <span className="step-label">Fill Details</span>
//           </div>
//           <span className="step-arrow">›</span>
//           <div className="step-item">
//             <div className="step-dot">3</div>
//             <span className="step-label">Download</span>
//           </div>
//         </div>

//         {/* TEMPLATE CHOOSER */}
//         {step === 'template' && (
//           <TemplateChooser selectedId={selectedId} onSelect={setSelectedId} onProceed={() => setStep('edit')} />
//         )}

//         {/* EDITOR */}
//         {step === 'edit' && (
//           <div className="editor">
//             {/* FORM PANEL */}
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
//               <div className="form-panel">
//                 {/* Template Tag */}
//                 <div style={{ padding: '14px 20px 0' }}>
//                   <span className="tpl-tag" onClick={() => setStep('template')}>
//                     <span>🎨</span>
//                     <span>{TEMPLATES.find(t => t.id === selectedId)?.name}</span>
//                     <span style={{ opacity: .5 }}>·</span>
//                     <span style={{ opacity: .6, fontSize: 11 }}>Change</span>
//                   </span>
//                 </div>

//                 <div className="tab-bar">
//                   {(['personal', 'company', 'content'] as const).map(t => (
//                     <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
//                       {t === 'personal' ? '👤 You' : t === 'company' ? '🏢 Company' : '✍️ Content'}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="form-body">
//                   {tab === 'personal' && <PersonalForm data={data} upd={upd} />}
//                   {tab === 'company' && <CompanyForm data={data} upd={upd} />}
//                   {tab === 'content' && <ContentForm data={data} ach={ach} setAch={setAch} updSection={updSection} addSection={addSection} removeSection={removeSection} addAch={addAch} removeAch={removeAch} upd={upd} />}
//                 </div>

//                 <div className="form-actions">
//                   <button className="btn-gen" onClick={() => { generate(); showToast('✨ Preview updated!'); }}>
//                     ✨ Generate & Preview
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* PREVIEW PANEL */}
//             <div className="preview-panel">
//               <div className="preview-head">
//                 <div className="preview-head-left">
//                   <div className="preview-dot">👁</div>
//                   <div>
//                     <div style={{ fontWeight: 700, fontSize: 15 }}>Live Preview</div>
//                     <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Updates as you type</div>
//                   </div>
//                 </div>
//                 <div className="preview-head-actions">
//                   <button className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 12 }} onClick={() => { generate(); setShowPreview(true); }}>⛶ Fullscreen</button>
//                   <button className="btn btn-indigo" style={{ padding: '7px 14px', fontSize: 12 }} onClick={downloadPDF} disabled={downloading}>
//                     {downloading ? '⏳' : '⬇'} PDF
//                   </button>
//                 </div>
//               </div>
//               <div className="preview-body">
//                 {html ? (
//                   <iframe ref={iframeRef} className="preview-iframe" title="Preview" sandbox="allow-same-origin allow-scripts" />
//                 ) : (
//                   <div className="preview-empty">
//                     <div className="preview-empty-icon">📄</div>
//                     <div style={{ fontWeight: 600, fontSize: 16 }}>Preview will appear here</div>
//                     <div style={{ fontSize: 13 }}>Start filling in your details</div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* FULLSCREEN PREVIEW MODAL */}
//       {showPreview && (
//         <div className="modal-overlay" onClick={() => setShowPreview(false)}>
//           <div className="modal" onClick={e => e.stopPropagation()}>
//             <div className="modal-head">
//               <div className="modal-title">
//                 <span>📄</span>
//                 <span>{data.personal.fullName || 'Cover Letter'} — {TEMPLATES.find(t => t.id === selectedId)?.name}</span>
//               </div>
//               <button className="modal-close" onClick={() => setShowPreview(false)}>✕</button>
//             </div>
//             <div className="modal-body">
//               <iframe ref={previewIframeRef} style={{ width: '100%', height: '100%', border: 'none' }} title="Full Preview" sandbox="allow-same-origin allow-scripts" />
//             </div>
//             <div className="modal-foot">
//               <button className="btn btn-ghost" onClick={() => setShowPreview(false)}>Close</button>
//               <button className="btn btn-indigo" onClick={downloadPDF} disabled={downloading}>
//                 {downloading ? '⏳ Generating...' : '⬇ Download PDF'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* TOAST */}
//       {toast && <div className="toast">{toast}</div>}
//     </>
//   );
// }

// // ============================================================
// // TEMPLATE CHOOSER
// // ============================================================
// function TemplateChooser({ selectedId, onSelect, onProceed }: { selectedId: string; onSelect: (id: string) => void; onProceed: () => void; }) {
//   const [filter, setFilter] = useState('All');
//   const categories = ['All', ...Array.from(new Set(TEMPLATES.map(t => t.category)))];
//   const filtered = filter === 'All' ? TEMPLATES : TEMPLATES.filter(t => t.category === filter);

//   return (
//     <div className="chooser">
//       <div className="chooser-header">
//         <div className="chooser-title">Choose Your Template</div>
//         <div className="chooser-sub">12 professionally designed templates — pick the one that represents you best</div>
//         <div className="filter-row">
//           {categories.map(c => (
//             <button key={c} className={`filter-btn ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
//           ))}
//         </div>
//       </div>
//       <div className="tpl-grid">
//         {filtered.map(t => (
//           <div key={t.id} className={`tpl-card ${selectedId === t.id ? 'selected' : ''}`} onClick={() => onSelect(t.id)}>
//             <div className="tpl-preview" style={{ background: t.previewGradient, position: 'relative' }}>
//               <div className="tpl-preview-inner">
//                 <div className="tpl-mock-name" />
//                 <div className="tpl-mock-line w80" />
//                 <div className="tpl-mock-line w50" />
//               </div>
//               {selectedId === t.id && <div className="tpl-check">✓</div>}
//             </div>
//             <div className="tpl-footer">
//               <div className="tpl-cat">{t.category}</div>
//               <div className="tpl-name">{t.name}</div>
//               <div className="tpl-desc">{t.description}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="chooser-cta">
//         <button className="btn btn-indigo" style={{ padding: '12px 32px', fontSize: 15 }} onClick={onProceed}>
//           Use {TEMPLATES.find(t => t.id === selectedId)?.name} → Fill Details
//         </button>
//         <span style={{ fontSize: 13, color: 'var(--muted)' }}>You can change template anytime</span>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // FORM SECTIONS
// // ============================================================
// function Field({ label, icon, required, children }: { label: string; icon?: string; required?: boolean; children: React.ReactNode }) {
//   return (
//     <div className="field">
//       <label>{label}{required && <span> *</span>}</label>
//       <div className="inp-wrap">
//         {icon && <span className="inp-icon">{icon}</span>}
//         {children}
//       </div>
//     </div>
//   );
// }

// function PersonalForm({ data, upd }: { data: CoverLetterData; upd: (p: string[], v: string) => void }) {
//   return (
//     <>
//       <Field label="Full Name" icon="👤" required>
//         <input type="text" placeholder="Alexandra Chen" value={data.personal.fullName} onChange={e => upd(['personal', 'fullName'], e.target.value)} />
//       </Field>
//       <Field label="Professional Title" icon="💼">
//         <input type="text" placeholder="Senior Product Designer" value={data.personal.title} onChange={e => upd(['personal', 'title'], e.target.value)} />
//       </Field>
//       <div className="grid2">
//         <Field label="Email" icon="✉">
//           <input type="email" placeholder="alex@example.com" value={data.personal.email} onChange={e => upd(['personal', 'email'], e.target.value)} />
//         </Field>
//         <Field label="Phone" icon="📞">
//           <input type="tel" placeholder="+1 555 000 9999" value={data.personal.phone} onChange={e => upd(['personal', 'phone'], e.target.value)} />
//         </Field>
//       </div>
//       <Field label="Location" icon="📍">
//         <input type="text" placeholder="San Francisco, CA" value={data.personal.location} onChange={e => upd(['personal', 'location'], e.target.value)} />
//       </Field>
//       <div className="grid2">
//         <Field label="LinkedIn" icon="🔗">
//           <input type="text" placeholder="linkedin.com/in/alex" value={data.personal.linkedin} onChange={e => upd(['personal', 'linkedin'], e.target.value)} />
//         </Field>
//         <Field label="Portfolio" icon="🌐">
//           <input type="text" placeholder="alexchen.io" value={data.personal.website} onChange={e => upd(['personal', 'website'], e.target.value)} />
//         </Field>
//       </div>
//       <Field label="GitHub" icon="💻">
//         <input type="text" placeholder="github.com/alexchen" value={data.personal.github} onChange={e => upd(['personal', 'github'], e.target.value)} />
//       </Field>
//     </>
//   );
// }

// function CompanyForm({ data, upd }: { data: CoverLetterData; upd: (p: string[], v: string) => void }) {
//   return (
//     <>
//       <Field label="Company Name" icon="🏢" required>
//         <input type="text" placeholder="Google, Stripe, Airbnb..." value={data.company.name} onChange={e => upd(['company', 'name'], e.target.value)} />
//       </Field>
//       <Field label="Job Title Applying For" icon="🎯" required>
//         <input type="text" placeholder="Senior UX Designer" value={data.company.jobTitle} onChange={e => upd(['company', 'jobTitle'], e.target.value)} />
//       </Field>
//       <Field label="Department" icon="🏗">
//         <input type="text" placeholder="Product Design" value={data.company.department} onChange={e => upd(['company', 'department'], e.target.value)} />
//       </Field>
//       <div className="grid2">
//         <Field label="Hiring Manager Name" icon="👤">
//           <input type="text" placeholder="Sarah Johnson" value={data.company.hiringManager} onChange={e => upd(['company', 'hiringManager'], e.target.value)} />
//         </Field>
//         <Field label="Their Title" icon="💼">
//           <input type="text" placeholder="Head of Design" value={data.company.hiringManagerTitle} onChange={e => upd(['company', 'hiringManagerTitle'], e.target.value)} />
//         </Field>
//       </div>
//       <div className="section-divider" />
//       <div className="subsection-label">📍 Company Address (Optional)</div>
//       <Field label="Street Address" icon="">
//         <input className="no-icon" type="text" placeholder="1600 Amphitheatre Pkwy" value={data.company.address} onChange={e => upd(['company', 'address'], e.target.value)} />
//       </Field>
//       <div className="grid3">
//         <div className="field">
//           <label>City</label>
//           <div className="inp-wrap"><input className="no-icon" type="text" placeholder="Mountain View" value={data.company.city} onChange={e => upd(['company', 'city'], e.target.value)} /></div>
//         </div>
//         <div className="field">
//           <label>State</label>
//           <div className="inp-wrap"><input className="no-icon" type="text" placeholder="CA" value={data.company.state} onChange={e => upd(['company', 'state'], e.target.value)} /></div>
//         </div>
//         <div className="field">
//           <label>ZIP</label>
//           <div className="inp-wrap"><input className="no-icon" type="text" placeholder="94043" value={data.company.zipCode} onChange={e => upd(['company', 'zipCode'], e.target.value)} /></div>
//         </div>
//       </div>
//     </>
//   );
// }

// function ContentForm({ data, ach, setAch, updSection, addSection, removeSection, addAch, removeAch, upd }: any) {
//   return (
//     <>
//       <div className="subsection-label">✍️ Letter Sections</div>
//       {data.sections.map((s: LetterSection, i: number) => (
//         <div key={s.id} className="sec-card">
//           <div className="sec-card-head">
//             <div className="sec-num">{i + 1}</div>
//             <input className="sec-title-inp" value={s.title} onChange={e => updSection(s.id, 'title', e.target.value)} placeholder="Section title" />
//             {data.sections.length > 1 && <button className="sec-del" onClick={() => removeSection(s.id)}>✕</button>}
//           </div>
//           <textarea rows={4} value={s.content} onChange={e => updSection(s.id, 'content', e.target.value)} placeholder={s.placeholder} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid var(--border2)', fontSize: 13, fontFamily: 'inherit', outline: 'none', resize: 'vertical' }} onFocus={e => e.target.style.borderColor = '#4f46e5'} onBlur={e => e.target.style.borderColor = 'var(--border2)'} />
//         </div>
//       ))}
//       <button className="add-sec-btn" onClick={addSection}>+ Add Section</button>

//       <div className="section-divider" />
//       <div className="subsection-label">🏆 Key Achievements</div>
//       <div className="ach-row">
//         <input className="ach-inp" type="text" placeholder="Increased revenue by 40%..." value={ach} onChange={e => setAch(e.target.value)} onKeyDown={e => e.key === 'Enter' && addAch()} />
//         <button className="ach-add" onClick={addAch}>Add</button>
//       </div>
//       {data.achievements.length > 0 && (
//         <div className="ach-list">
//           {data.achievements.map((a: string, i: number) => (
//             <div key={i} className="ach-tag">⭐ {a}<button className="ach-rm" onClick={() => removeAch(i)}>✕</button></div>
//           ))}
//         </div>
//       )}

//       <div className="section-divider" />
//       <div className="subsection-label">📝 Additional Notes</div>
//       <textarea rows={3} placeholder="Any extra context or notes..." value={data.additionalNotes} onChange={e => upd(['additionalNotes'], e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1.5px solid var(--border2)', fontSize: 13, fontFamily: 'inherit', outline: 'none', resize: 'vertical' }} />

//       <div className="section-divider" />
//       <div className="subsection-label">🎭 Tone</div>
//       <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//         {['professional', 'friendly', 'confident', 'creative', 'formal'].map(t => (
//           <button key={t} onClick={() => upd(['tone'], t)} style={{ padding: '6px 16px', borderRadius: 30, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', border: `1.5px solid ${data.tone === t ? '#4f46e5' : 'var(--border2)'}`, background: data.tone === t ? 'var(--soft)' : 'white', color: data.tone === t ? '#4f46e5' : 'var(--muted)', transition: 'all .2s' }}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
//         ))}
//       </div>
//     </>
//   );
// }

// "use client";

// import { API_URL } from "@/app/config/api";
// import React, { useState, useRef, useEffect, useCallback } from "react";

// // ============================================================
// // TYPES
// // ============================================================
// interface PersonalInfo {
//   fullName: string;
//   title: string;
//   email: string;
//   phone: string;
//   location: string;
//   website: string;
//   linkedin: string;
//   github: string;
// }
// interface CompanyInfo {
//   name: string;
//   jobTitle: string;
//   hiringManager: string;
//   hiringManagerTitle: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   department: string;
// }
// interface LetterSection {
//   id: string;
//   title: string;
//   content: string;
//   placeholder: string;
// }
// interface CoverLetterData {
//   personal: PersonalInfo;
//   company: CompanyInfo;
//   sections: LetterSection[];
//   tone: string;
//   achievements: string[];
//   additionalNotes: string;
// }
// interface Template {
//   id: string;
//   name: string;
//   description: string;
//   category: string;
//   primaryColor: string;
//   accentColor: string;
//   previewGradient: string;
// }

// // ============================================================
// // 12 UNIQUE TEMPLATES
// // ============================================================
// const TEMPLATES: Template[] = [
//   {
//     id: "aurora",
//     name: "Aurora",
//     description: "Soft gradient header with floating contact chips",
//     category: "Modern",
//     primaryColor: "#6366f1",
//     accentColor: "#a78bfa",
//     previewGradient:
//       "linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a78bfa 100%)",
//   },
//   {
//     id: "obsidian",
//     name: "Obsidian",
//     description: "Dark luxury sidebar with gold accents",
//     category: "Executive",
//     primaryColor: "#1e1b4b",
//     accentColor: "#c4b5fd",
//     previewGradient:
//       "linear-gradient(135deg,#1e1b4b 0%,#312e81 60%,#4c1d95 100%)",
//   },
//   {
//     id: "prism",
//     name: "Prism",
//     description: "Geometric shapes with bold color blocking",
//     category: "Creative",
//     primaryColor: "#7c3aed",
//     accentColor: "#f0abfc",
//     previewGradient: "linear-gradient(135deg,#7c3aed 0%,#c026d3 100%)",
//   },
//   {
//     id: "nordic",
//     name: "Nordic",
//     description: "Clean lines with a calm minimalist soul",
//     category: "Minimal",
//     primaryColor: "#4338ca",
//     accentColor: "#818cf8",
//     previewGradient:
//       "linear-gradient(135deg,#e0e7ff 0%,#c7d2fe 50%,#a5b4fc 100%)",
//   },
//   {
//     id: "crimson",
//     name: "Crimson",
//     description: "Bold serif typography, editorial magazine feel",
//     category: "Editorial",
//     primaryColor: "#9f1239",
//     accentColor: "#fda4af",
//     previewGradient: "linear-gradient(135deg,#9f1239 0%,#e11d48 100%)",
//   },
//   {
//     id: "slate",
//     name: "Slate",
//     description: "Corporate precision with structured timeline",
//     category: "Professional",
//     primaryColor: "#1e293b",
//     accentColor: "#94a3b8",
//     previewGradient:
//       "linear-gradient(135deg,#1e293b 0%,#334155 60%,#475569 100%)",
//   },
//   {
//     id: "moss",
//     name: "Moss",
//     description: "Organic earthy tones with botanical vibe",
//     category: "Natural",
//     primaryColor: "#166534",
//     accentColor: "#86efac",
//     previewGradient:
//       "linear-gradient(135deg,#166534 0%,#15803d 60%,#16a34a 100%)",
//   },
//   {
//     id: "blaze",
//     name: "Blaze",
//     description: "Fiery gradient with bold typography",
//     category: "Bold",
//     primaryColor: "#ea580c",
//     accentColor: "#fcd34d",
//     previewGradient: "linear-gradient(135deg,#ea580c 0%,#f59e0b 100%)",
//   },
//   {
//     id: "frost",
//     name: "Frost",
//     description: "Icy glass-morphism with subtle blur panels",
//     category: "Modern",
//     primaryColor: "#0369a1",
//     accentColor: "#7dd3fc",
//     previewGradient:
//       "linear-gradient(135deg,#0c4a6e 0%,#0369a1 60%,#0ea5e9 100%)",
//   },
//   {
//     id: "velvet",
//     name: "Velvet",
//     description: "Luxe deep purple with metallic shimmer",
//     category: "Luxury",
//     primaryColor: "#581c87",
//     accentColor: "#e879f9",
//     previewGradient:
//       "linear-gradient(135deg,#581c87 0%,#7e22ce 60%,#a855f7 100%)",
//   },
//   {
//     id: "chalk",
//     name: "Chalk",
//     description: "Hand-crafted feel with sketch borders",
//     category: "Artistic",
//     primaryColor: "#292524",
//     accentColor: "#57534e",
//     previewGradient:
//       "linear-gradient(135deg,#292524 0%,#44403c 60%,#57534e 100%)",
//   },
//   {
//     id: "neon",
//     name: "Neon Grid",
//     description: "Cyberpunk dark with electric accent lines",
//     category: "Futuristic",
//     primaryColor: "#0f172a",
//     accentColor: "#22d3ee",
//     previewGradient:
//       "linear-gradient(135deg,#0f172a 0%,#1e1b4b 60%,#312e81 100%)",
//   },
// ];

// // ============================================================
// // TEMPLATE RENDERERS (full HTML)
// // ============================================================
// function renderTemplate(id: string, data: CoverLetterData): string {
//   const date = new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
//   const addr = [
//     data.company.address,
//     data.company.city,
//     data.company.state,
//     data.company.zipCode,
//   ]
//     .filter(Boolean)
//     .join(", ");
//   const sectionsHtml = (
//     sections: LetterSection[],
//     color: string,
//     style: string = "",
//   ) =>
//     sections
//       .filter((s) => s.content.trim())
//       .map(
//         (s) =>
//           `<div style="margin-bottom:22px;${style}"><h3 style="font-size:14px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin-bottom:8px;color:${color}">${s.title}</h3><p style="line-height:1.75;margin:0">${s.content.replace(/\n/g, "<br>")}</p></div>`,
//       )
//       .join("");
//   const achHtml = (color: string) =>
//     data.achievements.length
//       ? `<div style="margin:18px 0"><div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;color:${color}">Key Achievements</div>${data.achievements.map((a) => `<div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;font-size:13px"><span style="color:${color};margin-top:2px">▸</span><span>${a}</span></div>`).join("")}</div>`
//       : "";
//   const name = data.personal.fullName || "Your Name";
//   const title = data.personal.title || "Professional";
//   const mgr = data.company.hiringManager || "Hiring Manager";
//   const body = (color: string) =>
//     `<div style="color:#64748b;margin-bottom:20px;font-size:13px">${date}</div><div style="margin-bottom:20px;font-size:14px;line-height:1.7"><strong>${mgr}</strong>${data.company.hiringManagerTitle ? `, ${data.company.hiringManagerTitle}` : ""}<br>${data.company.name}${addr ? `<br>${addr}` : ""}</div><div style="font-size:16px;font-weight:600;margin-bottom:20px">Dear ${mgr},</div>${sectionsHtml(data.sections, color)}${achHtml(color)}${data.additionalNotes ? `<div style="margin:16px 0;padding:14px;background:#f8fafc;border-left:3px solid ${color};font-size:13px;line-height:1.7">${data.additionalNotes}</div>` : ""}<div style="margin-top:32px;font-size:14px">Sincerely,<br><br><strong style="font-size:15px">${name}</strong>${data.personal.email ? `<br><span style="color:#64748b;font-size:12px">${data.personal.email}</span>` : ""}</div>`;
//   const base = (css: string, layout: string) =>
//     `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',system-ui,sans-serif;background:white;color:#1e293b;font-size:14px}${css}</style></head><body>${layout}</body></html>`;

//   if (id === "aurora")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');body{font-family:'DM Sans',sans-serif;}.wrap{max-width:860px;margin:0 auto}.hdr{background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 60%,#a78bfa 100%);padding:48px 48px 40px;color:white;position:relative;overflow:hidden}.hdr::after{content:'';position:absolute;right:-60px;top:-60px;width:220px;height:220px;border-radius:50%;background:rgba(255,255,255,.08)}.name{font-size:36px;font-weight:700;letter-spacing:-1px;margin-bottom:6px}.ttl{font-size:15px;opacity:.85;margin-bottom:24px}.chips{display:flex;flex-wrap:wrap;gap:8px}.chip{padding:5px 14px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:40px;font-size:12px;backdrop-filter:blur(4px)}.main{padding:44px 48px}`,
//       `<div class="wrap"><div class="hdr"><div class="name">${name}</div><div class="ttl">${title}</div><div class="chips">${[data.personal.email && `<span class="chip">✉ ${data.personal.email}</span>`, data.personal.phone && `<span class="chip">☏ ${data.personal.phone}</span>`, data.personal.location && `<span class="chip">◎ ${data.personal.location}</span>`, data.personal.linkedin && `<span class="chip">in ${data.personal.linkedin}</span>`].filter(Boolean).join("")}</div></div><div class="main">${body("#6366f1")}</div></div>`,
//     );

//   if (id === "obsidian")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap');body{font-family:'Inter',sans-serif}.wrap{max-width:900px;margin:0 auto;display:flex;min-height:100vh}.side{width:280px;background:#1e1b4b;color:white;padding:40px 28px;flex-shrink:0}.side-name{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;line-height:1.2;margin-bottom:8px;color:#c4b5fd}.side-ttl{font-size:12px;color:#a5b4fc;letter-spacing:1px;text-transform:uppercase;margin-bottom:32px;padding-bottom:32px;border-bottom:1px solid rgba(196,181,253,.2)}.side-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6d5bba;margin-bottom:10px;margin-top:24px}.side-val{font-size:12px;color:#c4b5fd;line-height:1.8}.main{flex:1;padding:44px 44px;background:white}`,
//       `<div class="wrap"><div class="side"><div class="side-name">${name}</div><div class="side-ttl">${title}</div><div class="side-label">Contact</div>${[
//         ["Email", data.personal.email],
//         ["Phone", data.personal.phone],
//         ["Location", data.personal.location],
//         ["LinkedIn", data.personal.linkedin],
//       ]
//         .filter(([, v]) => v)
//         .map(
//           ([l, v]) =>
//             `<div class="side-val"><span style="opacity:.5">${l}</span><br>${v}</div>`,
//         )
//         .join("")}</div><div class="main">${body("#7c3aed")}</div></div>`,
//     );

//   if (id === "prism")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500&display=swap');body{font-family:system-ui,sans-serif}.wrap{max-width:860px;margin:0 auto;background:white}.hdr{position:relative;padding:0;overflow:hidden;height:180px;background:linear-gradient(135deg,#7c3aed 0%,#c026d3 100%)}.geo1{position:absolute;right:0;top:0;width:250px;height:250px;background:rgba(255,255,255,.1);clip-path:polygon(100% 0,0 0,100% 100%)}.geo2{position:absolute;right:60px;top:0;width:180px;height:180px;background:rgba(255,255,255,.08);clip-path:polygon(100% 0,0 0,100% 100%)}.hdr-inner{position:absolute;bottom:24px;left:44px}.name{font-size:38px;font-weight:800;color:white;letter-spacing:-1.5px}.ttl{font-size:14px;color:rgba(255,255,255,.8);margin-top:6px}.contacts{display:flex;gap:24px;padding:16px 44px;background:#faf5ff;border-bottom:1px solid #e9d5ff;font-size:12px;color:#7c3aed;flex-wrap:wrap}.main{padding:36px 44px}`,
//       `<div class="wrap"><div class="hdr"><div class="geo1"></div><div class="geo2"></div><div class="hdr-inner"><div class="name">${name}</div><div class="ttl">${title}</div></div></div><div class="contacts">${[
//         data.personal.email,
//         data.personal.phone,
//         data.personal.location,
//       ]
//         .filter(Boolean)
//         .map((v) => `<span>${v}</span>`)
//         .join(
//           '<span style="opacity:.3">|</span>',
//         )}</div><div class="main">${body("#7c3aed")}</div></div>`,
//     );

//   if (id === "nordic")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');body{font-family:'DM Sans',sans-serif;background:#f8f9ff}.wrap{max-width:780px;margin:0 auto;background:white;border:1px solid #e0e7ff;padding:56px 64px}.name{font-family:'Instrument Serif',serif;font-size:44px;font-weight:400;letter-spacing:-2px;color:#1e1b4b;line-height:1}.sep{width:48px;height:3px;background:#6366f1;margin:16px 0}.ttl{font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#6366f1;margin-bottom:8px}.contact-row{display:flex;gap:24px;margin-bottom:36px;flex-wrap:wrap}.contact-val{font-size:12px;color:#64748b}.divider{height:1px;background:#e0e7ff;margin:28px 0}`,
//       `<div class="wrap"><div class="ttl">${title}</div><div class="name">${name}</div><div class="sep"></div><div class="contact-row">${[
//         data.personal.email,
//         data.personal.phone,
//         data.personal.location,
//       ]
//         .filter(Boolean)
//         .map((v) => `<span class="contact-val">${v}</span>`)
//         .join("")}</div><div class="divider"></div>${body("#4338ca")}</div>`,
//     );

//   if (id === "crimson")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=EB+Garamond:wght@400;500&display=swap');body{font-family:'EB Garamond',serif;background:#fffbf5}.wrap{max-width:800px;margin:0 auto;background:white;border:1px solid #fce7ef}.top-bar{background:#9f1239;padding:10px 48px}.name{font-family:'Playfair Display',serif;font-size:42px;font-weight:900;text-align:center;padding:36px 48px 0;color:#1e293b;letter-spacing:-1px}.ttl{font-family:'Playfair Display',serif;font-style:italic;text-align:center;font-size:16px;color:#9f1239;padding:8px 0 20px}.rule{display:flex;align-items:center;gap:12px;padding:0 48px;margin-bottom:20px}.rule-line{flex:1;height:1px;background:#fce7ef}.rule-diamond{width:8px;height:8px;background:#9f1239;transform:rotate(45deg);flex-shrink:0}.contacts{display:flex;justify-content:center;gap:24px;padding-bottom:24px;font-size:12px;color:#64748b;flex-wrap:wrap}.main{padding:16px 48px 48px}`,
//       `<div class="wrap"><div class="top-bar"></div><div class="name">${name}</div><div class="ttl">${title}</div><div class="rule"><div class="rule-line"></div><div class="rule-diamond"></div><div class="rule-line"></div></div><div class="contacts">${[
//         data.personal.email,
//         data.personal.phone,
//         data.personal.location,
//       ]
//         .filter(Boolean)
//         .map((v) => `<span>${v}</span>`)
//         .join(
//           "<span>·</span>",
//         )}</div><div class="main">${body("#9f1239")}</div></div>`,
//     );

//   if (id === "slate")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');body{font-family:'IBM Plex Sans',sans-serif;background:#f8fafc}.wrap{max-width:880px;margin:0 auto;background:white}.hdr{padding:40px 48px;border-bottom:3px solid #1e293b;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}.name{font-size:32px;font-weight:700;color:#1e293b;letter-spacing:-1px}.ttl{font-size:12px;color:#64748b;letter-spacing:2px;text-transform:uppercase;margin-top:6px}.contact-block{text-align:right;font-size:12px;color:#475569;line-height:2;font-family:'IBM Plex Mono',monospace}.main{padding:40px 48px}.tag{display:inline-block;padding:2px 10px;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:4px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:#64748b;margin-bottom:16px}`,
//       `<div class="wrap"><div class="hdr"><div><div class="name">${name}</div><div class="ttl">${title}</div></div><div class="contact-block">${[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join("<br>")}</div></div><div class="main"><div class="tag">APPLICATION · ${data.company.name || "Company"} · ${data.company.jobTitle || "Role"}</div>${body("#1e293b")}</div></div>`,
//     );

//   if (id === "moss")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;600&display=swap');body{font-family:'Source Sans 3',sans-serif;background:#f0fdf4}.wrap{max-width:840px;margin:0 auto;background:white;border:1px solid #bbf7d0}.banner{background:linear-gradient(135deg,#166534 0%,#15803d 100%);padding:44px;color:white;display:flex;gap:24px;align-items:center}.leaf{font-size:48px;opacity:.4}.name{font-family:'Lora',serif;font-size:34px;font-weight:700;letter-spacing:-.5px}.ttl{font-size:13px;opacity:.8;margin-top:4px}.contact-strip{background:#f0fdf4;padding:12px 44px;display:flex;gap:20px;flex-wrap:wrap;border-bottom:1px solid #bbf7d0;font-size:12px;color:#166534}.main{padding:40px 44px}`,
//       `<div class="wrap"><div class="banner"><div class="leaf">🌿</div><div><div class="name">${name}</div><div class="ttl">${title}</div></div></div><div class="contact-strip">${[
//         data.personal.email,
//         data.personal.phone,
//         data.personal.location,
//       ]
//         .filter(Boolean)
//         .map((v) => `<span>${v}</span>`)
//         .join("")}</div><div class="main">${body("#166534")}</div></div>`,
//     );

//   if (id === "blaze")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,600;0,700;0,900;1,700&family=Barlow+Condensed:wght@500;700;900&display=swap');body{font-family:'Barlow',sans-serif;background:#fff7ed}.wrap{max-width:860px;margin:0 auto;background:white}.hdr{background:linear-gradient(120deg,#ea580c 0%,#f59e0b 100%);padding:40px 48px;color:white;position:relative}.name{font-family:'Barlow Condensed',sans-serif;font-size:52px;font-weight:900;letter-spacing:-2px;text-transform:uppercase;line-height:1}.ttl{font-size:14px;letter-spacing:3px;text-transform:uppercase;opacity:.85;margin-top:8px}.slash{position:absolute;right:0;top:0;bottom:0;width:80px;background:rgba(255,255,255,.1);clip-path:polygon(30% 0,100% 0,100% 100%,0 100%)}.info-bar{display:flex;gap:0;background:#1e293b}.info-chip{flex:1;padding:10px 20px;font-size:11px;color:#94a3b8;border-right:1px solid rgba(255,255,255,.05);text-align:center}.main{padding:40px 48px}`,
//       `<div class="wrap"><div class="hdr"><div class="name">${name}</div><div class="ttl">${title}</div><div class="slash"></div></div><div class="info-bar">${[
//         data.personal.email,
//         data.personal.phone,
//         data.personal.location,
//       ]
//         .filter(Boolean)
//         .slice(0, 3)
//         .map((v) => `<div class="info-chip">${v}</div>`)
//         .join("")}</div><div class="main">${body("#ea580c")}</div></div>`,
//     );

//   if (id === "frost")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');body{font-family:'Outfit',sans-serif;background:linear-gradient(135deg,#e0f2fe 0%,#bae6fd 100%);min-height:100vh;padding:20px}.wrap{max-width:840px;margin:0 auto;background:rgba(255,255,255,.75);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.8);border-radius:24px;overflow:hidden;box-shadow:0 20px 60px rgba(3,105,161,.12)}.hdr{background:linear-gradient(135deg,rgba(12,74,110,.9) 0%,rgba(3,105,161,.9) 100%);padding:44px;color:white;backdrop-filter:blur(20px)}.name{font-size:36px;font-weight:800;letter-spacing:-1px}.ttl{font-size:13px;opacity:.8;margin-top:6px;letter-spacing:1px}.chips{display:flex;gap:8px;margin-top:20px;flex-wrap:wrap}.chip{padding:5px 14px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);border-radius:40px;font-size:11px;backdrop-filter:blur(8px)}.main{padding:40px 44px}`,
//       `<div class="wrap"><div class="hdr"><div class="name">${name}</div><div class="ttl">${title}</div><div class="chips">${[
//         data.personal.email,
//         data.personal.phone,
//         data.personal.location,
//       ]
//         .filter(Boolean)
//         .map((v) => `<span class="chip">${v}</span>`)
//         .join("")}</div></div><div class="main">${body("#0369a1")}</div></div>`,
//     );

//   if (id === "velvet")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&display=swap');body{font-family:'Raleway',sans-serif;background:#0f0a2e}.wrap{max-width:860px;margin:0 auto;background:linear-gradient(160deg,#1e1044 0%,#2d1b69 100%);color:#e2d9f3;min-height:100vh}.hdr{padding:52px 52px 40px;border-bottom:1px solid rgba(196,181,253,.15)}.name{font-family:'Cinzel',serif;font-size:36px;font-weight:600;color:#e9d5ff;letter-spacing:2px}.ttl{font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#a78bfa;margin-top:10px}.ornament{color:#a78bfa;font-size:18px;margin:16px 0}.contacts{display:flex;gap:20px;flex-wrap:wrap}.contact-val{font-size:12px;color:#c4b5fd;padding:4px 12px;border:1px solid rgba(196,181,253,.2);border-radius:4px}.main{padding:40px 52px;color:#d4c9ef}`,
//       `<div class="wrap"><div class="hdr"><div class="name">${name}</div><div class="ttl">${title}</div><div class="ornament">✦ ✦ ✦</div><div class="contacts">${[
//         data.personal.email,
//         data.personal.phone,
//         data.personal.location,
//       ]
//         .filter(Boolean)
//         .map((v) => `<span class="contact-val">${v}</span>`)
//         .join("")}</div></div><div class="main">${body("#c084fc")}</div></div>`,
//     );

//   if (id === "chalk")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Nunito:wght@300;400;600;700&display=swap');body{font-family:'Nunito',sans-serif;background:#faf9f7}.wrap{max-width:820px;margin:0 auto;background:white;border:2px dashed #d6d3d1;padding:48px}.name{font-family:'Kalam',cursive;font-size:44px;color:#292524;border-bottom:3px dashed #d6d3d1;padding-bottom:16px;margin-bottom:16px}.ttl{font-family:'Kalam',cursive;font-size:16px;color:#78716c;margin-bottom:24px}.contact-row{display:flex;gap:20px;flex-wrap:wrap;margin-bottom:28px;padding-bottom:28px;border-bottom:2px dashed #e7e5e4}.contact-item{font-size:13px;color:#57534e;border:1.5px dashed #d6d3d1;padding:5px 14px;border-radius:8px}`,
//       `<div class="wrap"><div class="name">${name}</div><div class="ttl">${title}</div><div class="contact-row">${[
//         data.personal.email,
//         data.personal.phone,
//         data.personal.location,
//       ]
//         .filter(Boolean)
//         .map((v) => `<span class="contact-item">${v}</span>`)
//         .join("")}</div>${body("#292524")}</div>`,
//     );

//   if (id === "neon")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Exo+2:wght@300;400;500;600;700;900&display=swap');body{font-family:'Exo 2',sans-serif;background:#0f172a;color:#e2e8f0;min-height:100vh}.wrap{max-width:880px;margin:0 auto;background:#0f172a}.hdr{padding:48px;border-bottom:1px solid rgba(34,211,238,.2);position:relative}.hdr::before{content:'';position:absolute;bottom:-1px;left:0;width:200px;height:2px;background:linear-gradient(90deg,#22d3ee,transparent)}.name{font-size:40px;font-weight:900;letter-spacing:-2px;color:white}.ttl{font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#22d3ee;margin-top:8px}.grid-bar{display:flex;gap:0;border-bottom:1px solid rgba(34,211,238,.1)}.grid-cell{flex:1;padding:12px 24px;font-family:'Share Tech Mono',monospace;font-size:11px;color:#94a3b8;border-right:1px solid rgba(34,211,238,.08)}.main{padding:44px}.sec h3{font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:2px;color:#22d3ee;margin-bottom:10px}.sec-line{width:32px;height:2px;background:#22d3ee;margin-bottom:12px}`,
//       `<div class="wrap"><div class="hdr"><div class="name">${name}</div><div class="ttl">${title}</div></div><div class="grid-bar">${[
//         data.personal.email,
//         data.personal.phone,
//         data.personal.location,
//       ]
//         .filter(Boolean)
//         .map((v) => `<div class="grid-cell">${v}</div>`)
//         .join(
//           "",
//         )}</div><div class="main"><div style="color:#94a3b8;margin-bottom:20px;font-family:'Share Tech Mono',monospace;font-size:11px">${date}</div><div style="margin-bottom:20px;line-height:1.7;color:#cbd5e1"><strong style="color:white">${mgr}</strong>${data.company.hiringManagerTitle ? `, <span style="color:#94a3b8">${data.company.hiringManagerTitle}</span>` : ""}<br>${data.company.name}${addr ? `<br>${addr}` : ""}</div><div style="font-size:16px;font-weight:600;margin-bottom:20px;color:white">Dear ${mgr},</div>${data.sections
//         .filter((s) => s.content.trim())
//         .map(
//           (s) =>
//             `<div class="sec" style="margin-bottom:24px"><div class="sec-line"></div><h3>${s.title}</h3><p style="line-height:1.75;color:#cbd5e1">${s.content.replace(/\n/g, "<br>")}</p></div>`,
//         )
//         .join(
//           "",
//         )}${data.achievements.length ? `<div style="margin:18px 0">${data.achievements.map((a) => `<div style="display:flex;gap:8px;margin-bottom:6px;font-size:13px;color:#94a3b8"><span style="color:#22d3ee;font-family:'Share Tech Mono',monospace">›</span>${a}</div>`).join("")}</div>` : ""}<div style="margin-top:32px;color:#94a3b8">Sincerely,<br><br><strong style="color:white;font-size:15px">${name}</strong></div></div></div>`,
//     );

//   return renderTemplate("aurora", data);
// }

// // ============================================================
// // MAIN COMPONENT
// // ============================================================
// const defaultData: CoverLetterData = {
//   personal: {
//     fullName: "",
//     title: "",
//     email: "",
//     phone: "",
//     location: "",
//     website: "",
//     linkedin: "",
//     github: "",
//   },
//   company: {
//     name: "",
//     jobTitle: "",
//     hiringManager: "",
//     hiringManagerTitle: "",
//     address: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     department: "",
//   },
//   sections: [
//     {
//       id: "1",
//       title: "Opening",
//       content: "",
//       placeholder: "Express your enthusiasm for the role and company...",
//     },
//     {
//       id: "2",
//       title: "Experience & Skills",
//       content: "",
//       placeholder: "Highlight your relevant experience and key strengths...",
//     },
//     {
//       id: "3",
//       title: "Why This Company",
//       content: "",
//       placeholder: "Share what excites you about this organization...",
//     },
//     {
//       id: "4",
//       title: "Closing",
//       content: "",
//       placeholder: "Call to action and professional closing statement...",
//     },
//   ],
//   tone: "professional",
//   achievements: [],
//   additionalNotes: "",
// };

// export default function CoverLetterGenerator() {
//   const [step, setStep] = useState<"template" | "edit">("template");
//   const [selectedId, setSelectedId] = useState("aurora");
//   const [data, setData] = useState<CoverLetterData>(
//     JSON.parse(JSON.stringify(defaultData)),
//   );
//   const [tab, setTab] = useState<"personal" | "company" | "content">(
//     "personal",
//   );
//   const [html, setHtml] = useState("");
//   const [showPreview, setShowPreview] = useState(false);
//   const [ach, setAch] = useState("");
//   const [toast, setToast] = useState("");
//   const [downloading, setDownloading] = useState(false);
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const previewIframeRef = useRef<HTMLIFrameElement>(null);

//   const showToast = (msg: string) => {
//     setToast(msg);
//     setTimeout(() => setToast(""), 3000);
//   };

//   const generate = useCallback(() => {
//     const h = renderTemplate(selectedId, data);
//     setHtml(h);
//     return h;
//   }, [selectedId, data]);

//   useEffect(() => {
//     const t = setTimeout(generate, 250);
//     return () => clearTimeout(t);
//   }, [generate]);

//   useEffect(() => {
//     if (iframeRef.current && html) {
//       const doc = iframeRef.current.contentDocument;
//       if (doc) {
//         doc.open();
//         doc.write(html);
//         doc.close();
//       }
//     }
//   }, [html]);

//   useEffect(() => {
//     if (showPreview && previewIframeRef.current && html) {
//       const doc = previewIframeRef.current.contentDocument;
//       if (doc) {
//         doc.open();
//         doc.write(html);
//         doc.close();
//       }
//     }
//   }, [showPreview, html]);

//   const upd = (path: string[], val: string) => {
//     setData((prev) => {
//       const next = JSON.parse(JSON.stringify(prev));
//       let cur: any = next;
//       for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
//       cur[path[path.length - 1]] = val;
//       return next;
//     });
//   };

//   const updSection = (id: string, field: "title" | "content", val: string) =>
//     setData((prev) => ({
//       ...prev,
//       sections: prev.sections.map((s) =>
//         s.id === id ? { ...s, [field]: val } : s,
//       ),
//     }));

//   const addSection = () =>
//     setData((prev) => ({
//       ...prev,
//       sections: [
//         ...prev.sections,
//         {
//           id: Date.now().toString(),
//           title: "New Section",
//           content: "",
//           placeholder: "Write your content here...",
//         },
//       ],
//     }));

//   const removeSection = (id: string) =>
//     setData((prev) => ({
//       ...prev,
//       sections: prev.sections.filter((s) => s.id !== id),
//     }));

//   const addAch = () => {
//     if (ach.trim()) {
//       setData((prev) => ({
//         ...prev,
//         achievements: [...prev.achievements, ach.trim()],
//       }));
//       setAch("");
//     }
//   };

//   const removeAch = (i: number) =>
//     setData((prev) => ({
//       ...prev,
//       achievements: prev.achievements.filter((_, idx) => idx !== i),
//     }));

//   const downloadPDF = async () => {
//     if (!html) {
//       showToast("Generate first!");
//       return;
//     }
//     setDownloading(true);
//     try {
//       const { default: axios } = await import("axios");
//       const cleanHtml = renderTemplate(selectedId, data);
//       const resp = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html: cleanHtml },
//         { responseType: "blob" },
//       );
//       const url = URL.createObjectURL(resp.data);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `Cover_Letter_${data.personal.fullName || "Draft"}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//       showToast("PDF downloaded!");
//     } catch {
//       showToast("PDF download failed.");
//     } finally {
//       setDownloading(false);
//     }
//   };

//   const copyText = () => {
//     const txt = data.sections
//       .map((s) => `${s.title}\n${s.content}`)
//       .join("\n\n");
//     navigator.clipboard.writeText(txt);
//     showToast("Copied!");
//   };

//   const cat = (id: string) =>
//     TEMPLATES.find((t) => t.id === id)?.category || "";

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap');
//         // *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         :root {
//           --bg: #f5f3ff; --surface: #ffffff; --border: #ede9fe; --border2: #ddd6fe;
//           --indigo: #4f46e5; --indigo-d: #3730a3; --purple: #7c3aed; --violet: #8b5cf6;
//           --soft: #ede9fe; --soft2: #f5f3ff; --muted: #6b7280; --text: #1e1b4b;
//           --radius: 16px; --radius-sm: 10px; --shadow: 0 4px 24px rgba(79,70,229,.08);
//           --shadow-lg: 0 20px 48px rgba(79,70,229,.14);
//         }
//         // body { font-family: 'Bricolage Grotesque', system-ui, sans-serif; background: var(--bg); color: var(--text); }
//         .app { min-height: 100vh; display: flex; flex-direction: column; }

//         /* NAV */
//         .nav { background: rgba(255,255,255,.92); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 200; }
//         .nav-inner { max-width: 1400px; margin: 0 auto; padding: 0 24px; height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
//         .logo { display: flex; align-items: center; gap: 10px; }
//         .logo-icon { width: 36px; height: 36px; background: linear-gradient(135deg,#4f46e5,#8b5cf6); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
//         .logo-text { font-size: 18px; font-weight: 800; background: linear-gradient(135deg,#4f46e5,#7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
//         .logo-badge { font-size: 10px; background: var(--soft); color: var(--indigo); padding: 2px 8px; border-radius: 20px; font-weight: 600; letter-spacing: .5px; }
//         .nav-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
//         .btn { display: inline-flex; align-items: center; gap: 7px; padding: 9px 18px; border-radius: 40px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all .2s; border: none; font-family: inherit; }
//         .btn-ghost { background: transparent; color: var(--muted); border: 1px solid var(--border2); }
//         .btn-ghost:hover { background: var(--soft2); color: var(--indigo); }
//         .btn-indigo { background: linear-gradient(135deg,#4f46e5,#7c3aed); color: white; box-shadow: 0 4px 14px rgba(79,70,229,.3); }
//         .btn-indigo:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(79,70,229,.35); }
//         .btn-indigo:disabled { opacity: .6; cursor: not-allowed; transform: none; }
//         .btn-outline-indigo { background: white; color: var(--indigo); border: 1.5px solid var(--indigo); }
//         .btn-outline-indigo:hover { background: var(--soft2); }

//         /* STEP INDICATOR */
//         .steps { max-width: 1400px; margin: 0 auto; padding: 20px 24px 0; display: flex; align-items: center; gap: 8px; }
//         .step-item { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 6px 12px; border-radius: 40px; transition: all .2s; }
//         .step-item.active { background: white; box-shadow: var(--shadow); }
//         .step-dot { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; background: var(--border); color: var(--muted); transition: all .2s; flex-shrink: 0; }
//         .step-item.active .step-dot { background: linear-gradient(135deg,#4f46e5,#7c3aed); color: white; }
//         .step-item.done .step-dot { background: #10b981; color: white; }
//         .step-label { font-size: 13px; font-weight: 600; color: var(--muted); }
//         .step-item.active .step-label { color: var(--indigo); }
//         .step-arrow { color: var(--border2); font-size: 16px; }

//         /* TEMPLATE CHOOSER */
//         .chooser { max-width: 1400px; margin: 0 auto; padding: 24px; }
//         .chooser-header { margin-bottom: 28px; }
//         .chooser-title { font-size: clamp(24px,4vw,32px); font-weight: 800; color: var(--text); }
//         .chooser-sub { font-size: 15px; color: var(--muted); margin-top: 6px; }
//         .filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 20px; }
//         .filter-btn { padding: 6px 16px; border-radius: 30px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1.5px solid var(--border2); background: white; color: var(--muted); transition: all .2s; font-family: inherit; }
//         .filter-btn.active, .filter-btn:hover { border-color: var(--indigo); color: var(--indigo); background: var(--soft2); }
//         .tpl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
//         .tpl-card { background: white; border: 2px solid var(--border); border-radius: 20px; overflow: hidden; cursor: pointer; transition: all .25s; }
//         .tpl-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--violet); }
//         .tpl-card.selected { border-color: var(--indigo); box-shadow: 0 0 0 4px rgba(79,70,229,.12); }
//         .tpl-preview { height: 100px; position: relative; overflow: hidden; }
//         .tpl-preview-inner { position: absolute; inset: 0; display: flex; flex-direction: column; padding: 12px; }
//         .tpl-mock-name { height: 10px; background: rgba(255,255,255,.7); border-radius: 4px; width: 60%; margin-bottom: 6px; }
//         .tpl-mock-line { height: 6px; background: rgba(255,255,255,.4); border-radius: 3px; margin-bottom: 4px; }
//         .tpl-mock-line.w80 { width: 80%; }
//         .tpl-mock-line.w50 { width: 50%; }
//         .tpl-footer { padding: 14px 16px; }
//         .tpl-cat { font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--violet); margin-bottom: 4px; }
//         .tpl-name { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 2px; }
//         .tpl-desc { font-size: 11px; color: var(--muted); line-height: 1.4; }
//         .tpl-check { position: absolute; top: 8px; right: 8px; width: 22px; height: 22px; background: var(--indigo); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; }
//         .chooser-cta { margin-top: 32px; display: flex; gap: 12px; align-items: center; }

//         /* EDITOR LAYOUT */
//         .editor { max-width: 1400px; margin: 0 auto; padding: 20px 24px 40px; display: grid; grid-template-columns: 420px 1fr; gap: 24px; }
//         @media (max-width: 1100px) { .editor { grid-template-columns: 1fr; } }

//         /* FORM PANEL */
//         .form-panel { background: white; border-radius: 24px; box-shadow: var(--shadow); border: 1px solid var(--border); overflow: hidden; }
//         .tab-bar { display: flex; background: var(--soft2); border-bottom: 1px solid var(--border); }
//         .tab-btn { flex: 1; padding: 14px 8px; background: none; border: none; font-size: 12px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; color: var(--muted); cursor: pointer; border-bottom: 2px solid transparent; transition: all .2s; font-family: inherit; }
//         .tab-btn.active { color: var(--indigo); border-bottom-color: var(--indigo); background: white; }
//         .form-body { padding: 24px; max-height: calc(100vh - 280px); overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--border) transparent; }
//         .form-body::-webkit-scrollbar { width: 4px; }
//         .form-body::-webkit-scrollbar-track { background: transparent; }
//         .form-body::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }

//         /* FORM ELEMENTS */
//         .field { margin-bottom: 18px; }
//         .field label { display: block; font-size: 12px; font-weight: 700; color: var(--text); margin-bottom: 6px; letter-spacing: .3px; }
//         .field label span { color: #ef4444; }
//         .inp-wrap { position: relative; }
//         .inp-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; pointer-events: none; }
//         input, textarea, select {
//           width: 100%; padding: 10px 14px 10px 36px; border: 1.5px solid var(--border2); border-radius: 12px;
//           font-size: 13px; font-family: inherit; color: var(--text); background: white;
//           transition: all .2s; outline: none;
//         }
//         textarea { padding-left: 14px; resize: vertical; min-height: 80px; }
//         input:focus, textarea:focus, select:focus { border-color: var(--indigo); box-shadow: 0 0 0 3px rgba(79,70,229,.1); }
//         input::placeholder, textarea::placeholder { color: #9ca3af; }
//         .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
//         .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
//         @media (max-width: 600px) { .grid2, .grid3 { grid-template-columns: 1fr; } }
//         input.no-icon { padding-left: 14px; }

//         /* SECTION CARDS */
//         .sec-card { background: var(--soft2); border: 1px solid var(--border); border-radius: 16px; padding: 16px; margin-bottom: 14px; }
//         .sec-card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
//         .sec-num { width: 26px; height: 26px; background: var(--indigo); color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
//         .sec-title-inp { flex: 1; padding: 7px 12px; border-radius: 8px; border: 1.5px solid var(--border2); font-size: 13px; font-weight: 600; background: white; font-family: inherit; color: var(--text); outline: none; }
//         .sec-title-inp:focus { border-color: var(--indigo); }
//         .sec-del { width: 30px; height: 30px; background: #fef2f2; border: none; border-radius: 8px; cursor: pointer; color: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 14px; }
//         .add-sec-btn { width: 100%; padding: 10px; background: var(--soft2); border: 1.5px dashed var(--border2); border-radius: 12px; color: var(--indigo); font-weight: 600; font-size: 13px; cursor: pointer; font-family: inherit; transition: all .2s; margin-bottom: 16px; }
//         .add-sec-btn:hover { background: var(--soft); border-color: var(--indigo); }

//         /* ACHIEVEMENTS */
//         .ach-row { display: flex; gap: 8px; margin-bottom: 10px; }
//         .ach-inp { flex: 1; padding: 9px 13px; border: 1.5px solid var(--border2); border-radius: 10px; font-size: 13px; font-family: inherit; outline: none; }
//         .ach-inp:focus { border-color: var(--indigo); }
//         .ach-add { padding: 9px 18px; background: var(--indigo); color: white; border: none; border-radius: 10px; cursor: pointer; font-size: 12px; font-weight: 700; font-family: inherit; }
//         .ach-list { display: flex; flex-wrap: wrap; gap: 8px; }
//         .ach-tag { display: flex; align-items: center; gap: 6px; padding: 5px 12px; background: var(--soft); color: var(--indigo); border-radius: 30px; font-size: 12px; font-weight: 500; border: 1px solid var(--border2); }
//         .ach-rm { background: none; border: none; cursor: pointer; color: var(--indigo); opacity: .6; font-size: 14px; line-height: 1; padding: 0; }

//         /* GENERATE ACTIONS */
//         .form-actions { padding: 16px 24px; border-top: 1px solid var(--border); background: white; display: flex; gap: 10px; }
//         .btn-gen { flex: 1; padding: 13px; background: linear-gradient(135deg,#4f46e5,#7c3aed); color: white; border: none; border-radius: 14px; font-size: 14px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-family: inherit; transition: all .2s; }
//         .btn-gen:hover { box-shadow: 0 6px 20px rgba(79,70,229,.3); transform: translateY(-1px); }
//         .btn-gen:disabled { opacity: .6; cursor: not-allowed; transform: none; }

//         /* PREVIEW PANEL */
//         .preview-panel { background: white; border-radius: 24px; box-shadow: var(--shadow); border: 1px solid var(--border); overflow: hidden; position: sticky; top: 84px; max-height: calc(100vh - 104px); display: flex; flex-direction: column; }
//         .preview-head { padding: 16px 20px; border-bottom: 1px solid var(--border); background: var(--soft2); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; flex-shrink: 0; }
//         .preview-head-left { display: flex; align-items: center; gap: 10px; }
//         .preview-dot { width: 32px; height: 32px; background: linear-gradient(135deg,#4f46e5,#7c3aed); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
//         .preview-head-actions { display: flex; gap: 8px; flex-wrap: wrap; }
//         .preview-body { flex: 1; overflow: hidden; background: #f0eff9; }
//         .preview-iframe { width: 100%; height: 100%; border: none; }
//         .preview-empty { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--muted); gap: 12px; text-align: center; padding: 32px; }
//         .preview-empty-icon { font-size: 56px; opacity: .3; }

//         /* PREVIEW MODAL */
//         .modal-overlay { position: fixed; inset: 0; background: rgba(15,12,46,.8); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; }
//         .modal { background: white; border-radius: 24px; width: 100%; max-width: 900px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 40px 80px rgba(0,0,0,.3); }
//         .modal-head { padding: 18px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; background: var(--soft2); flex-shrink: 0; }
//         .modal-title { font-size: 16px; font-weight: 700; display: flex; align-items: center; gap: 10px; }
//         .modal-close { width: 34px; height: 34px; border-radius: 50%; background: white; border: 1.5px solid var(--border2); cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; color: var(--muted); transition: all .2s; }
//         .modal-close:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }
//         .modal-body { flex: 1; overflow: hidden; background: #f0eff9; }
//         .modal-foot { padding: 14px 24px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 10px; background: white; flex-shrink: 0; }

//         /* TOAST */
//         .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: var(--text); color: white; padding: 10px 24px; border-radius: 40px; font-size: 13px; font-weight: 600; z-index: 9999; animation: toastIn .3s ease; box-shadow: 0 8px 24px rgba(0,0,0,.2); }
//         @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(16px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

//         /* MISC */
//         .section-divider { height: 1px; background: var(--border); margin: 20px 0; }
//         .subsection-label { font-size: 12px; font-weight: 700; color: var(--indigo); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 6px; }
//         .tpl-tag { display: inline-flex; align-items: center; gap: 6px; background: var(--soft); color: var(--indigo); border: 1px solid var(--border2); padding: 4px 12px; border-radius: 30px; font-size: 12px; font-weight: 600; margin-bottom: 16px; cursor: pointer; transition: all .2s; }
//         .tpl-tag:hover { background: var(--soft2); }

//         @media (max-width: 768px) {
//           .nav-actions .btn-ghost { display: none; }
//           .editor { padding: 16px; gap: 16px; }
//           .form-body { max-height: none; }
//           .preview-panel { position: relative; top: 0; max-height: 500px; }
//           .chooser { padding: 16px; }
//         }
//       `}</style>

//       <div className="app">
//         {/* NAV */}
//         <nav className="nav">
//           <div className="nav-inner">
//             <div className="logo">
//               <div className="logo-icon">✦</div>
//               <span className="logo-text">Cover Letter Studio</span>
//               <span className="logo-badge">PRO</span>
//             </div>
//             <div className="nav-actions">
//               {step === "edit" && (
//                 <>
//                   <button
//                     className="btn btn-ghost"
//                     onClick={() => setStep("template")}
//                   >
//                     ← Templates
//                   </button>
//                   <button className="btn btn-ghost" onClick={copyText}>
//                     ⎘ Copy
//                   </button>
//                   <button
//                     className="btn btn-ghost"
//                     onClick={() => {
//                       generate();
//                       setShowPreview(true);
//                     }}
//                   >
//                     ⊡ Full Preview
//                   </button>
//                   <button
//                     className="btn btn-indigo"
//                     onClick={downloadPDF}
//                     disabled={downloading}
//                   >
//                     {downloading ? "⏳" : "⬇"} Download PDF
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </nav>

//         {/* STEP INDICATOR */}
//         <div className="steps">
//           <div
//             className={`step-item ${step === "template" ? "active" : "done"}`}
//             onClick={() => setStep("template")}
//           >
//             <div className="step-dot">{step === "template" ? "1" : "✓"}</div>
//             <span className="step-label">Choose Template</span>
//           </div>
//           <span className="step-arrow">›</span>
//           <div className={`step-item ${step === "edit" ? "active" : ""}`}>
//             <div className="step-dot">2</div>
//             <span className="step-label">Fill Details</span>
//           </div>
//           <span className="step-arrow">›</span>
//           <div className="step-item">
//             <div className="step-dot">3</div>
//             <span className="step-label">Download</span>
//           </div>
//         </div>

//         {/* TEMPLATE CHOOSER */}
//         {step === "template" && (
//           <TemplateChooser
//             selectedId={selectedId}
//             onSelect={setSelectedId}
//             onProceed={() => setStep("edit")}
//           />
//         )}

//         {/* EDITOR */}
//         {step === "edit" && (
//           <div className="editor">
//             {/* FORM PANEL */}
//             <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
//               <div className="form-panel">
//                 {/* Template Tag */}
//                 <div style={{ padding: "14px 20px 0" }}>
//                   <span className="tpl-tag" onClick={() => setStep("template")}>
//                     <span>🎨</span>
//                     <span>
//                       {TEMPLATES.find((t) => t.id === selectedId)?.name}
//                     </span>
//                     <span style={{ opacity: 0.5 }}>·</span>
//                     <span style={{ opacity: 0.6, fontSize: 11 }}>Change</span>
//                   </span>
//                 </div>

//                 <div className="tab-bar">
//                   {(["personal", "company", "content"] as const).map((t) => (
//                     <button
//                       key={t}
//                       className={`tab-btn ${tab === t ? "active" : ""}`}
//                       onClick={() => setTab(t)}
//                     >
//                       {t === "personal"
//                         ? "👤 You"
//                         : t === "company"
//                           ? "🏢 Company"
//                           : "✍️ Content"}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="form-body">
//                   {tab === "personal" && <PersonalForm data={data} upd={upd} />}
//                   {tab === "company" && <CompanyForm data={data} upd={upd} />}
//                   {tab === "content" && (
//                     <ContentForm
//                       data={data}
//                       ach={ach}
//                       setAch={setAch}
//                       updSection={updSection}
//                       addSection={addSection}
//                       removeSection={removeSection}
//                       addAch={addAch}
//                       removeAch={removeAch}
//                       upd={upd}
//                     />
//                   )}
//                 </div>

//                 <div className="form-actions">
//                   <button
//                     className="btn-gen"
//                     onClick={() => {
//                       generate();
//                       showToast("✨ Preview updated!");
//                     }}
//                   >
//                     ✨ Generate & Preview
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* PREVIEW PANEL */}
//             <div className="preview-panel">
//               <div className="preview-head">
//                 <div className="preview-head-left">
//                   <div className="preview-dot">👁</div>
//                   <div>
//                     <div style={{ fontWeight: 700, fontSize: 15 }}>
//                       Live Preview
//                     </div>
//                     <div
//                       style={{
//                         fontSize: 11,
//                         color: "var(--muted)",
//                         marginTop: 2,
//                       }}
//                     >
//                       Updates as you type
//                     </div>
//                   </div>
//                 </div>
//                 <div className="preview-head-actions">
//                   <button
//                     className="btn btn-ghost"
//                     style={{ padding: "7px 14px", fontSize: 12 }}
//                     onClick={() => {
//                       generate();
//                       setShowPreview(true);
//                     }}
//                   >
//                     ⛶ Fullscreen
//                   </button>
//                   <button
//                     className="btn btn-indigo"
//                     style={{ padding: "7px 14px", fontSize: 12 }}
//                     onClick={downloadPDF}
//                     disabled={downloading}
//                   >
//                     {downloading ? "⏳" : "⬇"} PDF
//                   </button>
//                 </div>
//               </div>
//               <div className="preview-body">
//                 {html ? (
//                   <iframe
//                     ref={iframeRef}
//                     className="preview-iframe"
//                     title="Preview"
//                     sandbox="allow-same-origin allow-scripts"
//                   />
//                 ) : (
//                   <div className="preview-empty">
//                     <div className="preview-empty-icon">📄</div>
//                     <div style={{ fontWeight: 600, fontSize: 16 }}>
//                       Preview will appear here
//                     </div>
//                     <div style={{ fontSize: 13 }}>
//                       Start filling in your details
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* FULLSCREEN PREVIEW MODAL */}
//       {showPreview && (
//         <div className="modal-overlay" onClick={() => setShowPreview(false)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-head">
//               <div className="modal-title">
//                 <span>📄</span>
//                 <span>
//                   {data.personal.fullName || "Cover Letter"} —{" "}
//                   {TEMPLATES.find((t) => t.id === selectedId)?.name}
//                 </span>
//               </div>
//               <button
//                 className="modal-close"
//                 onClick={() => setShowPreview(false)}
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="modal-body">
//               <iframe
//                 ref={previewIframeRef}
//                 style={{ width: "100%", height: "100%", border: "none" }}
//                 title="Full Preview"
//                 sandbox="allow-same-origin allow-scripts"
//               />
//             </div>
//             <div className="modal-foot">
//               <button
//                 className="btn btn-ghost"
//                 onClick={() => setShowPreview(false)}
//               >
//                 Close
//               </button>
//               <button
//                 className="btn btn-indigo"
//                 onClick={downloadPDF}
//                 disabled={downloading}
//               >
//                 {downloading ? "⏳ Generating..." : "⬇ Download PDF"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* TOAST */}
//       {toast && <div className="toast">{toast}</div>}
//     </>
//   );
// }

// // ============================================================
// // TEMPLATE CHOOSER
// // ============================================================
// function TemplateChooser({
//   selectedId,
//   onSelect,
//   onProceed,
// }: {
//   selectedId: string;
//   onSelect: (id: string) => void;
//   onProceed: () => void;
// }) {
//   const [filter, setFilter] = useState("All");
//   const categories = [
//     "All",
//     ...Array.from(new Set(TEMPLATES.map((t) => t.category))),
//   ];
//   const filtered =
//     filter === "All"
//       ? TEMPLATES
//       : TEMPLATES.filter((t) => t.category === filter);

//   return (
//     <div className="chooser">
//       <div className="chooser-header">
//         <div className="chooser-title">Choose Your Template</div>
//         <div className="chooser-sub">
//           12 professionally designed templates — pick the one that represents
//           you best
//         </div>
//         <div className="filter-row">
//           {categories.map((c) => (
//             <button
//               key={c}
//               className={`filter-btn ${filter === c ? "active" : ""}`}
//               onClick={() => setFilter(c)}
//             >
//               {c}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="tpl-grid">
//         {filtered.map((t) => (
//           <div
//             key={t.id}
//             className={`tpl-card ${selectedId === t.id ? "selected" : ""}`}
//             onClick={() => onSelect(t.id)}
//           >
//             <div
//               className="tpl-preview"
//               style={{ background: t.previewGradient, position: "relative" }}
//             >
//               <div className="tpl-preview-inner">
//                 <div className="tpl-mock-name" />
//                 <div className="tpl-mock-line w80" />
//                 <div className="tpl-mock-line w50" />
//               </div>
//               {selectedId === t.id && <div className="tpl-check">✓</div>}
//             </div>
//             <div className="tpl-footer">
//               <div className="tpl-cat">{t.category}</div>
//               <div className="tpl-name">{t.name}</div>
//               <div className="tpl-desc">{t.description}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="chooser-cta">
//         <button
//           className="btn btn-indigo"
//           style={{ padding: "12px 32px", fontSize: 15 }}
//           onClick={onProceed}
//         >
//           Use {TEMPLATES.find((t) => t.id === selectedId)?.name} → Fill Details
//         </button>
//         <span style={{ fontSize: 13, color: "var(--muted)" }}>
//           You can change template anytime
//         </span>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // FORM SECTIONS
// // ============================================================
// function Field({
//   label,
//   icon,
//   required,
//   children,
// }: {
//   label: string;
//   icon?: string;
//   required?: boolean;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="field">
//       <label>
//         {label}
//         {required && <span> *</span>}
//       </label>
//       <div className="inp-wrap">
//         {icon && <span className="inp-icon">{icon}</span>}
//         {children}
//       </div>
//     </div>
//   );
// }

// function PersonalForm({
//   data,
//   upd,
// }: {
//   data: CoverLetterData;
//   upd: (p: string[], v: string) => void;
// }) {
//   return (
//     <>
//       <Field label="Full Name" icon="👤" required>
//         <input
//           type="text"
//           placeholder="Alexandra Chen"
//           value={data.personal.fullName}
//           onChange={(e) => upd(["personal", "fullName"], e.target.value)}
//         />
//       </Field>
//       <Field label="Professional Title" icon="💼">
//         <input
//           type="text"
//           placeholder="Senior Product Designer"
//           value={data.personal.title}
//           onChange={(e) => upd(["personal", "title"], e.target.value)}
//         />
//       </Field>
//       <div className="grid2">
//         <Field label="Email" icon="✉">
//           <input
//             type="email"
//             placeholder="alex@example.com"
//             value={data.personal.email}
//             onChange={(e) => upd(["personal", "email"], e.target.value)}
//           />
//         </Field>
//         <Field label="Phone" icon="📞">
//           <input
//             type="tel"
//             placeholder="+1 555 000 9999"
//             value={data.personal.phone}
//             onChange={(e) => upd(["personal", "phone"], e.target.value)}
//           />
//         </Field>
//       </div>
//       <Field label="Location" icon="📍">
//         <input
//           type="text"
//           placeholder="San Francisco, CA"
//           value={data.personal.location}
//           onChange={(e) => upd(["personal", "location"], e.target.value)}
//         />
//       </Field>
//       <div className="grid2">
//         <Field label="LinkedIn" icon="🔗">
//           <input
//             type="text"
//             placeholder="linkedin.com/in/alex"
//             value={data.personal.linkedin}
//             onChange={(e) => upd(["personal", "linkedin"], e.target.value)}
//           />
//         </Field>
//         <Field label="Portfolio" icon="🌐">
//           <input
//             type="text"
//             placeholder="alexchen.io"
//             value={data.personal.website}
//             onChange={(e) => upd(["personal", "website"], e.target.value)}
//           />
//         </Field>
//       </div>
//       <Field label="GitHub" icon="💻">
//         <input
//           type="text"
//           placeholder="github.com/alexchen"
//           value={data.personal.github}
//           onChange={(e) => upd(["personal", "github"], e.target.value)}
//         />
//       </Field>
//     </>
//   );
// }

// function CompanyForm({
//   data,
//   upd,
// }: {
//   data: CoverLetterData;
//   upd: (p: string[], v: string) => void;
// }) {
//   return (
//     <>
//       <Field label="Company Name" icon="🏢" required>
//         <input
//           type="text"
//           placeholder="Google, Stripe, Airbnb..."
//           value={data.company.name}
//           onChange={(e) => upd(["company", "name"], e.target.value)}
//         />
//       </Field>
//       <Field label="Job Title Applying For" icon="🎯" required>
//         <input
//           type="text"
//           placeholder="Senior UX Designer"
//           value={data.company.jobTitle}
//           onChange={(e) => upd(["company", "jobTitle"], e.target.value)}
//         />
//       </Field>
//       <Field label="Department" icon="🏗">
//         <input
//           type="text"
//           placeholder="Product Design"
//           value={data.company.department}
//           onChange={(e) => upd(["company", "department"], e.target.value)}
//         />
//       </Field>
//       <div className="grid2">
//         <Field label="Hiring Manager Name" icon="👤">
//           <input
//             type="text"
//             placeholder="Sarah Johnson"
//             value={data.company.hiringManager}
//             onChange={(e) => upd(["company", "hiringManager"], e.target.value)}
//           />
//         </Field>
//         <Field label="Their Title" icon="💼">
//           <input
//             type="text"
//             placeholder="Head of Design"
//             value={data.company.hiringManagerTitle}
//             onChange={(e) =>
//               upd(["company", "hiringManagerTitle"], e.target.value)
//             }
//           />
//         </Field>
//       </div>
//       <div className="section-divider" />
//       <div className="subsection-label">📍 Company Address (Optional)</div>
//       <Field label="Street Address" icon="">
//         <input
//           className="no-icon"
//           type="text"
//           placeholder="1600 Amphitheatre Pkwy"
//           value={data.company.address}
//           onChange={(e) => upd(["company", "address"], e.target.value)}
//         />
//       </Field>
//       <div className="grid3">
//         <div className="field">
//           <label>City</label>
//           <div className="inp-wrap">
//             <input
//               className="no-icon"
//               type="text"
//               placeholder="Mountain View"
//               value={data.company.city}
//               onChange={(e) => upd(["company", "city"], e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="field">
//           <label>State</label>
//           <div className="inp-wrap">
//             <input
//               className="no-icon"
//               type="text"
//               placeholder="CA"
//               value={data.company.state}
//               onChange={(e) => upd(["company", "state"], e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="field">
//           <label>ZIP</label>
//           <div className="inp-wrap">
//             <input
//               className="no-icon"
//               type="text"
//               placeholder="94043"
//               value={data.company.zipCode}
//               onChange={(e) => upd(["company", "zipCode"], e.target.value)}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function ContentForm({
//   data,
//   ach,
//   setAch,
//   updSection,
//   addSection,
//   removeSection,
//   addAch,
//   removeAch,
//   upd,
// }: any) {
//   return (
//     <>
//       <div className="subsection-label">✍️ Letter Sections</div>
//       {data.sections.map((s: LetterSection, i: number) => (
//         <div key={s.id} className="sec-card">
//           <div className="sec-card-head">
//             <div className="sec-num">{i + 1}</div>
//             <input
//               className="sec-title-inp"
//               value={s.title}
//               onChange={(e) => updSection(s.id, "title", e.target.value)}
//               placeholder="Section title"
//             />
//             {data.sections.length > 1 && (
//               <button className="sec-del" onClick={() => removeSection(s.id)}>
//                 ✕
//               </button>
//             )}
//           </div>
//           <textarea
//             rows={4}
//             value={s.content}
//             onChange={(e) => updSection(s.id, "content", e.target.value)}
//             placeholder={s.placeholder}
//             style={{
//               width: "100%",
//               padding: "10px 12px",
//               borderRadius: 10,
//               border: "1.5px solid var(--border2)",
//               fontSize: 13,
//               fontFamily: "inherit",
//               outline: "none",
//               resize: "vertical",
//             }}
//             onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
//             onBlur={(e) => (e.target.style.borderColor = "var(--border2)")}
//           />
//         </div>
//       ))}
//       <button className="add-sec-btn" onClick={addSection}>
//         + Add Section
//       </button>

//       <div className="section-divider" />
//       <div className="subsection-label">🏆 Key Achievements</div>
//       <div className="ach-row">
//         <input
//           className="ach-inp"
//           type="text"
//           placeholder="Increased revenue by 40%..."
//           value={ach}
//           onChange={(e) => setAch(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && addAch()}
//         />
//         <button className="ach-add" onClick={addAch}>
//           Add
//         </button>
//       </div>
//       {data.achievements.length > 0 && (
//         <div className="ach-list">
//           {data.achievements.map((a: string, i: number) => (
//             <div key={i} className="ach-tag">
//               ⭐ {a}
//               <button className="ach-rm" onClick={() => removeAch(i)}>
//                 ✕
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="section-divider" />
//       <div className="subsection-label">📝 Additional Notes</div>
//       <textarea
//         rows={3}
//         placeholder="Any extra context or notes..."
//         value={data.additionalNotes}
//         onChange={(e) => upd(["additionalNotes"], e.target.value)}
//         style={{
//           width: "100%",
//           padding: "10px 12px",
//           borderRadius: 12,
//           border: "1.5px solid var(--border2)",
//           fontSize: 13,
//           fontFamily: "inherit",
//           outline: "none",
//           resize: "vertical",
//         }}
//       />

//       <div className="section-divider" />
//       <div className="subsection-label">🎭 Tone</div>
//       <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//         {["professional", "friendly", "confident", "creative", "formal"].map(
//           (t) => (
//             <button
//               key={t}
//               onClick={() => upd(["tone"], t)}
//               style={{
//                 padding: "6px 16px",
//                 borderRadius: 30,
//                 fontSize: 12,
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 fontFamily: "inherit",
//                 border: `1.5px solid ${data.tone === t ? "#4f46e5" : "var(--border2)"}`,
//                 background: data.tone === t ? "var(--soft)" : "white",
//                 color: data.tone === t ? "#4f46e5" : "var(--muted)",
//                 transition: "all .2s",
//               }}
//             >
//               {t.charAt(0).toUpperCase() + t.slice(1)}
//             </button>
//           ),
//         )}
//       </div>
//     </>
//   );
// }

// "use client";
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import axios from "axios";
// import { API_URL } from "@/app/config/api";

// // ─────────────────────────────────────────────
// // TYPES
// // ─────────────────────────────────────────────
// interface PersonalInfo {
//   fullName: string;
//   title: string;
//   email: string;
//   phone: string;
//   location: string;
//   website: string;
//   linkedin: string;
//   github: string;
// }
// interface CompanyInfo {
//   name: string;
//   jobTitle: string;
//   hiringManager: string;
//   hiringManagerTitle: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
// }
// interface Section {
//   id: string;
//   title: string;
//   content: string;
//   placeholder: string;
// }
// interface CLData {
//   personal: PersonalInfo;
//   company: CompanyInfo;
//   sections: Section[];
//   achievements: string[];
//   notes: string;
// }

// const BLANK: CLData = {
//   personal: {
//     fullName: "",
//     title: "",
//     email: "",
//     phone: "",
//     location: "",
//     website: "",
//     linkedin: "",
//     github: "",
//   },
//   company: {
//     name: "",
//     jobTitle: "",
//     hiringManager: "",
//     hiringManagerTitle: "",
//     address: "",
//     city: "",
//     state: "",
//     zipCode: "",
//   },
//   sections: [
//     {
//       id: "1",
//       title: "Opening Statement",
//       content: "",
//       placeholder:
//         "Express your enthusiasm for the role and why you're the perfect fit…",
//     },
//     {
//       id: "2",
//       title: "Experience & Skills",
//       content: "",
//       placeholder:
//         "Highlight 2–3 relevant accomplishments that prove your value…",
//     },
//     {
//       id: "3",
//       title: "Why This Company",
//       content: "",
//       placeholder:
//         "Show you've researched them — what specifically excites you…",
//     },
//     {
//       id: "4",
//       title: "Closing",
//       content: "",
//       placeholder: "Thank them, reiterate interest, and invite next steps…",
//     },
//   ],
//   achievements: [],
//   notes: "",
// };

// // ─────────────────────────────────────────────
// // TEMPLATES
// // ─────────────────────────────────────────────
// const TEMPLATES = [
//   {
//     id: "aurora",
//     name: "Aurora",
//     tag: "Modern",
//     color: "#6366f1",
//     grad: "linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)",
//   },
//   {
//     id: "obsidian",
//     name: "Obsidian",
//     tag: "Executive",
//     color: "#312e81",
//     grad: "linear-gradient(135deg,#1e1b4b 0%,#4c1d95 100%)",
//   },
//   {
//     id: "prism",
//     name: "Prism",
//     tag: "Creative",
//     color: "#7c3aed",
//     grad: "linear-gradient(135deg,#7c3aed 0%,#ec4899 100%)",
//   },
//   {
//     id: "nordic",
//     name: "Nordic",
//     tag: "Minimal",
//     color: "#3730a3",
//     grad: "linear-gradient(135deg,#e0e7ff 0%,#818cf8 100%)",
//   },
//   {
//     id: "crimson",
//     name: "Crimson",
//     tag: "Editorial",
//     color: "#9f1239",
//     grad: "linear-gradient(135deg,#9f1239 0%,#e11d48 100%)",
//   },
//   {
//     id: "slate",
//     name: "Slate",
//     tag: "Corporate",
//     color: "#1e293b",
//     grad: "linear-gradient(135deg,#1e293b 0%,#475569 100%)",
//   },
//   {
//     id: "velvet",
//     name: "Velvet",
//     tag: "Luxury",
//     color: "#6d28d9",
//     grad: "linear-gradient(135deg,#4c1d95 0%,#7e22ce 100%)",
//   },
//   {
//     id: "frost",
//     name: "Frost",
//     tag: "Clean",
//     color: "#0369a1",
//     grad: "linear-gradient(135deg,#0c4a6e 0%,#0ea5e9 100%)",
//   },
//   {
//     id: "blaze",
//     name: "Blaze",
//     tag: "Bold",
//     color: "#c2410c",
//     grad: "linear-gradient(135deg,#ea580c 0%,#f59e0b 100%)",
//   },
//   {
//     id: "moss",
//     name: "Moss",
//     tag: "Natural",
//     color: "#166534",
//     grad: "linear-gradient(135deg,#14532d 0%,#16a34a 100%)",
//   },
//   {
//     id: "neon",
//     name: "Neon Grid",
//     tag: "Futuristic",
//     color: "#0f172a",
//     grad: "linear-gradient(135deg,#0f172a 0%,#312e81 100%)",
//   },
//   {
//     id: "chalk",
//     name: "Chalk",
//     tag: "Artistic",
//     color: "#44403c",
//     grad: "linear-gradient(135deg,#292524 0%,#78716c 100%)",
//   },
// ];

// // ─────────────────────────────────────────────
// // HTML BUILDER (12 unique templates)
// // ─────────────────────────────────────────────
// function buildHTML(id: string, d: CLData): string {
//   const dt = new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
//   const addr = [
//     d.company.address,
//     d.company.city,
//     d.company.state,
//     d.company.zipCode,
//   ]
//     .filter(Boolean)
//     .join(", ");
//   const nm = d.personal.fullName || "Your Name";
//   const ttl = d.personal.title || "Professional";
//   const mgr = d.company.hiringManager || "Hiring Manager";
//   const contacts = [
//     d.personal.email,
//     d.personal.phone,
//     d.personal.location,
//   ].filter(Boolean);

//   const rows = (color: string, border = false) =>
//     d.sections
//       .filter((s) => s.content.trim())
//       .map(
//         (s) =>
//           `<div style="margin-bottom:22px${border ? `;border-left:3px solid ${color};padding-left:14px` : ""}">
//         <h4 style="font-size:10.5px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${color};margin-bottom:7px">${s.title}</h4>
//         <p style="line-height:1.8;margin:0;font-size:13.5px">${s.content.replace(/\n/g, "<br>")}</p>
//       </div>`,
//       )
//       .join("");

//   const achs = (color: string) =>
//     d.achievements.length
//       ? `<div style="margin:18px 0">${d.achievements
//           .map(
//             (a) =>
//               `<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:6px;font-size:13px">
//           <span style="color:${color};font-size:15px;line-height:1.3">›</span>${a}
//         </div>`,
//           )
//           .join("")}</div>`
//       : "";

//   const addrBlock = `
//     <div style="margin-bottom:22px;font-size:13px;line-height:2;color:#4a5568">
//       <strong style="color:#1a202c">${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>
//       ${d.company.name}${addr ? `<br>${addr}` : ""}
//     </div>`;

//   const closer = (color: string) =>
//     `<div style="margin-top:36px;font-size:13.5px;color:#4a5568">
//       Sincerely,<br><br>
//       <strong style="font-size:15px;color:#1a202c">${nm}</strong>
//       ${d.personal.email ? `<br><span style="font-size:11.5px;color:${color}">${d.personal.email}</span>` : ""}
//     </div>`;

//   const notesBlock = d.notes
//     ? `<div style="margin:16px 0;padding:12px 16px;background:#f8fafc;border-left:3px solid #e2e8f0;font-size:13px;line-height:1.7;color:#64748b">${d.notes}</div>`
//     : "";

//   const wrap = (css: string, body: string) =>
//     `<!DOCTYPE html><html><head><meta charset="UTF-8">
//     <style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',system-ui,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}${css}</style>
//     </head><body>${body}</body></html>`;

//   switch (id) {
//     case "aurora":
//       return wrap(
//         `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
//        body{font-family:'DM Sans',sans-serif}
//        .page{max-width:860px;margin:0 auto}
//        .hdr{background:linear-gradient(135deg,#4f46e5,#7c3aed 60%,#a78bfa);padding:52px 56px 44px;color:white;position:relative;overflow:hidden}
//        .hdr::before{content:'';position:absolute;right:-80px;top:-80px;width:280px;height:280px;background:rgba(255,255,255,.07);border-radius:50%}
//        .hdr::after{content:'';position:absolute;right:60px;bottom:-50px;width:160px;height:160px;background:rgba(255,255,255,.05);border-radius:50%}
//        .nm{font-size:38px;font-weight:700;letter-spacing:-1.5px;margin-bottom:5px;position:relative}
//        .rl{font-size:14px;opacity:.85;margin-bottom:28px;position:relative}
//        .chips{display:flex;flex-wrap:wrap;gap:8px;position:relative}
//        .chip{padding:5px 15px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:40px;font-size:12px}
//        .body{padding:48px 56px;color:#374151}
//        .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//        .gr{font-size:16px;font-weight:600;margin-bottom:20px;color:#111827}`,
//         `<div class="page">
//         <div class="hdr">
//           <div class="nm">${nm}</div><div class="rl">${ttl}</div>
//           <div class="chips">${contacts.map((c) => `<span class="chip">${c}</span>`).join("")}${d.personal.linkedin ? `<span class="chip">in ${d.personal.linkedin}</span>` : ""}</div>
//         </div>
//         <div class="body"><div class="dt">${dt}</div>${addrBlock}<div class="gr">Dear ${mgr},</div>${rows("#6366f1")}${achs("#6366f1")}${notesBlock}${closer("#6366f1")}</div>
//       </div>`,
//       );

//     case "obsidian":
//       return wrap(
//         `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@300;400;500&display=swap');
//        body{font-family:'Inter',sans-serif}
//        .page{max-width:900px;margin:0 auto;display:flex;min-height:100vh}
//        .side{width:255px;background:#1e1b4b;color:white;padding:44px 26px;flex-shrink:0}
//        .snm{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;color:#e9d5ff;line-height:1.2;margin-bottom:6px}
//        .srl{font-size:10px;color:#a5b4fc;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:32px;padding-bottom:28px;border-bottom:1px solid rgba(165,180,252,.2)}
//        .slbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#6d5bba;margin-bottom:8px;margin-top:24px}
//        .sval{font-size:11.5px;color:#c4b5fd;line-height:2}
//        .orn{color:#7c3aed;opacity:.5;font-size:18px;margin-top:20px}
//        .main{flex:1;padding:48px 44px;color:#374151}
//        .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//        .gr{font-size:16px;font-weight:600;margin-bottom:20px;color:#1e1b4b}`,
//         `<div class="page">
//         <div class="side">
//           <div class="snm">${nm}</div><div class="srl">${ttl}</div>
//           ${[
//             ["Email", d.personal.email],
//             ["Phone", d.personal.phone],
//             ["Location", d.personal.location],
//             ["LinkedIn", d.personal.linkedin],
//           ]
//             .filter(([, v]) => v)
//             .map(
//               ([l, v]) =>
//                 `<div class="slbl">${l}</div><div class="sval">${v}</div>`,
//             )
//             .join("")}
//           <div class="orn">✦ ✦ ✦</div>
//         </div>
//         <div class="main"><div class="dt">${dt}</div>${addrBlock}<div class="gr">Dear ${mgr},</div>${rows("#7c3aed")}${achs("#7c3aed")}${notesBlock}${closer("#7c3aed")}</div>
//       </div>`,
//       );

//     case "prism":
//       return wrap(
//         `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
//        body{font-family:'Outfit',sans-serif}
//        .page{max-width:860px;margin:0 auto}
//        .hdr{background:linear-gradient(120deg,#7c3aed,#c026d3);height:165px;position:relative;overflow:hidden}
//        .g1{position:absolute;right:0;top:0;bottom:0;width:55%;background:rgba(255,255,255,.1);clip-path:polygon(25% 0,100% 0,100% 100%,0 100%)}
//        .g2{position:absolute;right:0;top:0;bottom:0;width:33%;background:rgba(255,255,255,.07);clip-path:polygon(40% 0,100% 0,100% 100%,0 100%)}
//        .hi{position:absolute;left:44px;bottom:24px;color:white}
//        .nm{font-size:38px;font-weight:800;letter-spacing:-2px;line-height:1}
//        .rl{font-size:13px;opacity:.8;margin-top:6px}
//        .cbar{display:flex;background:#1e1b4b;padding:10px 44px;gap:28px;flex-wrap:wrap}
//        .cv{font-size:11px;color:#a5b4fc;padding:3px 0}
//        .body{padding:44px;color:#374151}
//        .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//        .gr{font-size:16px;font-weight:700;margin-bottom:22px;color:#1e1b4b}`,
//         `<div class="page">
//         <div class="hdr"><div class="g1"></div><div class="g2"></div><div class="hi"><div class="nm">${nm}</div><div class="rl">${ttl}</div></div></div>
//         <div class="cbar">${contacts.map((c) => `<span class="cv">${c}</span>`).join("")}</div>
//         <div class="body"><div class="dt">${dt}</div>${addrBlock}<div class="gr">Dear ${mgr},</div>${rows("#7c3aed", true)}${achs("#7c3aed")}${notesBlock}${closer("#7c3aed")}</div>
//       </div>`,
//       );

//     case "nordic":
//       return wrap(
//         `@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
//        body{font-family:'DM Sans',sans-serif}
//        .page{max-width:750px;margin:0 auto;padding:64px 72px}
//        .rl{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#6366f1;margin-bottom:10px}
//        .nm{font-family:'Libre Baskerville',serif;font-size:44px;font-weight:700;letter-spacing:-2px;color:#1e1b4b;line-height:1.05}
//        .bar{width:52px;height:3px;background:#6366f1;margin:16px 0 20px}
//        .ctrow{display:flex;gap:20px;flex-wrap:wrap;margin-bottom:44px}
//        .cv{font-size:12px;color:#6b7280}
//        .div{height:1px;background:#e0e7ff;margin:26px 0}
//        .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//        .gr{font-size:16px;font-weight:600;margin-bottom:22px;color:#1e1b4b}
//        body{color:#374151}`,
//         `<div class="page">
//         <div class="rl">${ttl}</div><div class="nm">${nm}</div><div class="bar"></div>
//         <div class="ctrow">${contacts.map((c) => `<span class="cv">${c}</span>`).join("")}</div>
//         <div class="div"></div>
//         <div class="dt">${dt}</div>${addrBlock}<div class="gr">Dear ${mgr},</div>
//         ${rows("#4338ca")}${achs("#4338ca")}${notesBlock}${closer("#4338ca")}
//       </div>`,
//       );

//     case "crimson":
//       return wrap(
//         `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Lora:wght@400;500&display=swap');
//        body{font-family:'Lora',serif}
//        .page{max-width:800px;margin:0 auto}
//        .top{height:6px;background:#9f1239}
//        .hdr{padding:52px 56px 16px;text-align:center}
//        .nm{font-family:'Playfair Display',serif;font-size:44px;font-weight:900;color:#1a0a0d;letter-spacing:-2px;line-height:1}
//        .rl{font-family:'Playfair Display',serif;font-style:italic;font-size:16px;color:#9f1239;margin:10px 0 20px}
//        .orn{color:#9f1239;font-size:13px;letter-spacing:4px}
//        .ctrow{display:flex;justify-content:center;gap:22px;padding:14px 0;font-size:12px;color:#6b7280;flex-wrap:wrap}
//        .sep{display:flex;align-items:center;gap:10px;padding:0 56px;margin-bottom:6px}
//        .sl{flex:1;height:1px;background:#fecdd3}
//        .sd{width:5px;height:5px;background:#9f1239;border-radius:50%;flex-shrink:0}
//        .body{padding:28px 56px 52px;color:#374151}
//        .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//        .gr{font-size:16px;font-style:italic;font-weight:600;margin-bottom:22px;color:#1a0a0d}`,
//         `<div class="page">
//         <div class="top"></div>
//         <div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="orn">✦ ✦ ✦</div><div class="ctrow">${contacts.map((c) => `<span>${c}</span>`).join('<span style="opacity:.3">·</span>')}</div></div>
//         <div class="sep"><div class="sl"></div><div class="sd"></div><div class="sl"></div></div>
//         <div class="body"><div class="dt">${dt}</div>${addrBlock}<div class="gr">Dear ${mgr},</div>${rows("#9f1239")}${achs("#9f1239")}${notesBlock}${closer("#9f1239")}</div>
//       </div>`,
//       );

//     case "slate":
//       return wrap(
//         `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
//        body{font-family:'IBM Plex Sans',sans-serif}
//        .page{max-width:880px;margin:0 auto}
//        .hdr{padding:44px 52px;border-bottom:3px solid #1e293b;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px}
//        .nm{font-size:34px;font-weight:700;color:#0f172a;letter-spacing:-1.5px}
//        .rl{font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-top:8px}
//        .ctcol{text-align:right;font-size:12px;color:#475569;line-height:2.2;font-family:'IBM Plex Mono',monospace}
//        .tag{font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:#64748b;background:#f1f5f9;border:1px solid #e2e8f0;padding:3px 10px;border-radius:4px;display:inline-block;margin-bottom:20px}
//        .body{padding:40px 52px;color:#374151}
//        .dt{font-size:12.5px;color:#9ca3af;margin-bottom:20px}
//        .gr{font-size:15.5px;font-weight:600;margin-bottom:20px;color:#0f172a}`,
//         `<div class="page">
//         <div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div><div class="ctcol">${contacts.join("<br>")}</div></div>
//         <div class="body">
//           <div class="tag">RE: ${d.company.jobTitle || "Open Position"} · ${d.company.name || "Company"}</div>
//           <div class="dt">${dt}</div>${addrBlock}<div class="gr">Dear ${mgr},</div>
//           ${rows("#334155", true)}${achs("#334155")}${notesBlock}${closer("#334155")}
//         </div>
//       </div>`,
//       );

//     case "velvet":
//       return wrap(
//         `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500;600&display=swap');
//        body{font-family:'Raleway',sans-serif;background:#13072e;color:#e2d9f3;min-height:100vh}
//        .page{max-width:860px;margin:0 auto;background:linear-gradient(160deg,#1e0f40,#2d1b69);min-height:100vh}
//        .hdr{padding:56px 56px 40px;border-bottom:1px solid rgba(196,181,253,.15);position:relative}
//        .hdr::after{content:'';position:absolute;right:-40px;top:-40px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(168,85,247,.15),transparent 70%)}
//        .nm{font-family:'Cinzel',serif;font-size:36px;font-weight:600;color:#f3e8ff;letter-spacing:2px}
//        .rl{font-size:10.5px;letter-spacing:3px;text-transform:uppercase;color:#a78bfa;margin:12px 0 22px}
//        .chips{display:flex;flex-wrap:wrap;gap:8px}
//        .chip{padding:5px 13px;border:1px solid rgba(196,181,253,.25);color:#c4b5fd;font-size:11px;border-radius:4px}
//        .body{padding:44px 56px;color:#d4c9ef}
//        .dt{font-size:12px;color:#7c6fa0;margin-bottom:22px}
//        .gr{font-size:16px;font-weight:600;margin-bottom:22px;color:#e9d5ff}`,
//         `<div class="page">
//         <div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="chips">${contacts.map((c) => `<span class="chip">${c}</span>`).join("")}</div></div>
//         <div class="body">
//           <div class="dt">${dt}</div>
//           <div style="margin-bottom:22px;font-size:13px;line-height:2"><strong style="color:#e9d5ff">${mgr}${d.company.hiringManagerTitle ? `, <span style='color:#a78bfa'>${d.company.hiringManagerTitle}</span>` : ""}</strong><br>${d.company.name}${addr ? `<br><span style='color:#7c6fa0'>${addr}</span>` : ""}</div>
//           <div class="gr">Dear ${mgr},</div>
//           ${rows("#c084fc")}${achs("#c084fc")}${notesBlock}
//           <div style="margin-top:36px;font-size:13.5px;color:#7c6fa0">Sincerely,<br><br><strong style="font-size:15px;color:#f3e8ff">${nm}</strong></div>
//         </div>
//       </div>`,
//       );

//     case "frost":
//       return wrap(
//         `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
//        body{font-family:'Outfit',sans-serif;background:linear-gradient(135deg,#dbeafe,#e0f2fe);min-height:100vh;padding:20px}
//        .page{max-width:840px;margin:0 auto;background:rgba(255,255,255,.88);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.85);border-radius:18px;overflow:hidden;box-shadow:0 20px 60px rgba(3,105,161,.1)}
//        .hdr{background:linear-gradient(135deg,rgba(12,74,110,.92),rgba(2,132,199,.88));padding:48px;color:white}
//        .nm{font-size:38px;font-weight:800;letter-spacing:-2px;margin-bottom:6px}
//        .rl{font-size:12.5px;opacity:.8;letter-spacing:1px;margin-bottom:22px}
//        .chips{display:flex;flex-wrap:wrap;gap:8px}
//        .chip{padding:5px 15px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);border-radius:40px;font-size:11.5px}
//        .body{padding:44px;color:#374151}
//        .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//        .gr{font-size:16px;font-weight:700;margin-bottom:22px;color:#0c4a6e}`,
//         `<div class="page">
//         <div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="chips">${contacts.map((c) => `<span class="chip">${c}</span>`).join("")}</div></div>
//         <div class="body"><div class="dt">${dt}</div>${addrBlock}<div class="gr">Dear ${mgr},</div>${rows("#0369a1")}${achs("#0369a1")}${notesBlock}${closer("#0369a1")}</div>
//       </div>`,
//       );

//     case "blaze":
//       return wrap(
//         `@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;900&family=Barlow:wght@400;500;600&display=swap');
//        body{font-family:'Barlow',sans-serif}
//        .page{max-width:880px;margin:0 auto}
//        .hdr{background:linear-gradient(110deg,#ea580c,#f59e0b);padding:44px 52px;color:white;position:relative;overflow:hidden}
//        .hdr::after{content:'';position:absolute;right:0;top:0;bottom:0;width:120px;background:rgba(255,255,255,.08);clip-path:polygon(40% 0,100% 0,100% 100%)}
//        .nm{font-family:'Barlow Condensed',sans-serif;font-size:50px;font-weight:900;letter-spacing:-3px;text-transform:uppercase;line-height:.95;position:relative}
//        .rl{font-size:12px;letter-spacing:3px;text-transform:uppercase;opacity:.85;margin-top:10px;position:relative}
//        .ibar{background:#1e293b;padding:10px 52px;display:flex;gap:28px;flex-wrap:wrap}
//        .iv{font-size:11px;color:#94a3b8}
//        .body{padding:44px 52px;color:#374151}
//        .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//        .gr{font-size:16px;font-weight:700;margin-bottom:22px;color:#1e293b}`,
//         `<div class="page">
//         <div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>
//         <div class="ibar">${contacts.map((c) => `<span class="iv">${c}</span>`).join("")}</div>
//         <div class="body"><div class="dt">${dt}</div>${addrBlock}<div class="gr">Dear ${mgr},</div>${rows("#ea580c", true)}${achs("#ea580c")}${notesBlock}${closer("#ea580c")}</div>
//       </div>`,
//       );

//     case "moss":
//       return wrap(
//         `@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;600&display=swap');
//        body{font-family:'Source Sans 3',sans-serif}
//        .page{max-width:840px;margin:0 auto;border:1px solid #bbf7d0}
//        .hdr{background:linear-gradient(135deg,#14532d,#15803d);padding:48px;color:white;display:flex;align-items:center;gap:26px}
//        .lf{font-size:50px;opacity:.3;flex-shrink:0}
//        .nm{font-family:'Lora',serif;font-size:34px;font-weight:700;letter-spacing:-.5px;margin-bottom:5px}
//        .rl{font-size:11.5px;opacity:.8;letter-spacing:1.5px;text-transform:uppercase}
//        .strip{background:#f0fdf4;padding:10px 48px;display:flex;gap:22px;flex-wrap:wrap;border-bottom:1px solid #bbf7d0}
//        .sv{font-size:11.5px;color:#166534}
//        .body{padding:44px 48px;color:#374151}
//        .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//        .gr{font-family:'Lora',serif;font-size:16px;font-weight:700;margin-bottom:22px;color:#14532d}`,
//         `<div class="page">
//         <div class="hdr"><div class="lf">🌿</div><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div></div>
//         <div class="strip">${contacts.map((c) => `<span class="sv">${c}</span>`).join("")}</div>
//         <div class="body"><div class="dt">${dt}</div>${addrBlock}<div class="gr">Dear ${mgr},</div>${rows("#166534")}${achs("#166534")}${notesBlock}${closer("#166534")}</div>
//       </div>`,
//       );

//     case "neon":
//       return wrap(
//         `@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Exo+2:wght@300;400;500;700;900&display=swap');
//        body{font-family:'Exo 2',sans-serif;background:#0a0f1e;color:#e2e8f0}
//        .page{max-width:880px;margin:0 auto;background:#0d1224;min-height:100vh}
//        .hdr{padding:52px;border-bottom:1px solid rgba(34,211,238,.15);position:relative}
//        .hdr::after{content:'';position:absolute;bottom:-1px;left:0;width:220px;height:2px;background:linear-gradient(90deg,#22d3ee,transparent)}
//        .nm{font-size:44px;font-weight:900;letter-spacing:-3px;color:white;line-height:1}
//        .rl{font-size:10.5px;letter-spacing:3px;text-transform:uppercase;color:#22d3ee;margin-top:10px;margin-bottom:22px}
//        .grid{display:flex;border-bottom:1px solid rgba(34,211,238,.08)}
//        .gc{flex:1;padding:11px 24px;font-family:'Share Tech Mono',monospace;font-size:10.5px;color:#64748b;border-right:1px solid rgba(34,211,238,.06)}
//        .body{padding:46px 52px;color:#94a3b8}
//        .dt{font-size:11.5px;font-family:'Share Tech Mono',monospace;color:#4a5578;margin-bottom:22px}
//        .gr{font-size:16px;font-weight:700;color:white;margin-bottom:22px}
//        .sh4{font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#22d3ee;margin-bottom:7px;border-left:2px solid #22d3ee;padding-left:10px}`,
//         `<div class="page">
//         <div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>
//         <div class="grid">${contacts.map((c) => `<div class="gc">${c}</div>`).join("")}</div>
//         <div class="body">
//           <div class="dt">${dt}</div>
//           <div style="margin-bottom:22px;font-size:13px;line-height:2"><strong style="color:#e2e8f0">${mgr}${d.company.hiringManagerTitle ? `, <span style='color:#64748b'>${d.company.hiringManagerTitle}</span>` : ""}</strong><br>${d.company.name}${addr ? `<br><span style='color:#4a5578'>${addr}</span>` : ""}</div>
//           <div class="gr">Dear ${mgr},</div>
//           ${d.sections
//             .filter((s) => s.content.trim())
//             .map(
//               (s) =>
//                 `<div style="margin-bottom:24px"><div class="sh4">${s.title}</div><p style="line-height:1.8;font-size:13.5px;color:#94a3b8">${s.content.replace(/\n/g, "<br>")}</p></div>`,
//             )
//             .join("")}
//           ${achs("#22d3ee")}${notesBlock}
//           <div style="margin-top:36px;font-size:13.5px;color:#64748b">Sincerely,<br><br><strong style="font-size:15px;color:white">${nm}</strong></div>
//         </div>
//       </div>`,
//       );

//     case "chalk":
//       return wrap(
//         `@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Nunito:wght@300;400;600;700&display=swap');
//        body{font-family:'Nunito',sans-serif;background:#fdfcfa}
//        .page{max-width:820px;margin:0 auto;background:white;border:2px dashed #d6d3d1;padding:60px 64px}
//        .nm{font-family:'Kalam',cursive;font-size:44px;color:#1c1917;line-height:1.1;margin-bottom:6px}
//        .rl{font-family:'Kalam',cursive;font-size:16px;color:#78716c;margin-bottom:18px}
//        .ctrow{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:30px;padding-bottom:30px;border-bottom:2px dashed #e7e5e4}
//        .ct{font-size:12px;color:#57534e;border:1.5px dashed #d6d3d1;padding:4px 13px;border-radius:8px}
//        .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//        .gr{font-family:'Kalam',cursive;font-size:18px;margin-bottom:22px;color:#1c1917}
//        body{color:#374151}`,
//         `<div class="page">
//         <div class="nm">${nm}</div><div class="rl">${ttl}</div>
//         <div class="ctrow">${contacts.map((c) => `<span class="ct">${c}</span>`).join("")}</div>
//         <div class="dt">${dt}</div>${addrBlock}<div class="gr">Dear ${mgr},</div>
//         ${rows("#57534e")}${achs("#57534e")}${notesBlock}${closer("#57534e")}
//       </div>`,
//       );

//     default:
//       return buildHTML("aurora", d);
//   }
// }

// // ─────────────────────────────────────────────
// // STEP PAGES  (matching screenshot flow)
// // ─────────────────────────────────────────────
// type Step = "template" | "personal" | "company" | "content";
// const STEPS: { id: Step; label: string }[] = [
//   { id: "template", label: "Template" },
//   { id: "personal", label: "Personal" },
//   { id: "company", label: "Company" },
//   { id: "content", label: "Content" },
// ];

// export default function CoverLetterGenerator() {
//   const [step, setStep] = useState<Step>("template");
//   const [tplId, setTplId] = useState("aurora");
//   const [data, setData] = useState<CLData>(JSON.parse(JSON.stringify(BLANK)));
//   const [html, setHtml] = useState("");
//   const [modal, setModal] = useState(false);
//   const [achIn, setAchIn] = useState("");
//   const [toast, setToast] = useState("");
//   const [busy, setBusy] = useState(false);
//   const [filter, setFilter] = useState("All");

//   const liveRef = useRef<HTMLIFrameElement>(null);
//   const modalRef = useRef<HTMLIFrameElement>(null);

//   const showToast = (m: string) => {
//     setToast(m);
//     setTimeout(() => setToast(""), 2600);
//   };

//   const rebuild = useCallback(() => {
//     const h = buildHTML(tplId, data);
//     setHtml(h);
//     return h;
//   }, [tplId, data]);

//   useEffect(() => {
//     const t = setTimeout(rebuild, 180);
//     return () => clearTimeout(t);
//   }, [rebuild]);

//   const writeIframe = (ref: React.RefObject<HTMLIFrameElement>, h: string) => {
//     if (!ref.current) return;
//     const doc = ref.current.contentDocument;
//     if (!doc) return;
//     doc.open();
//     doc.write(h);
//     doc.close();
//   };

//   useEffect(() => {
//     if (html) writeIframe(liveRef, html);
//   }, [html]);
//   useEffect(() => {
//     if (modal && html) writeIframe(modalRef, html);
//   }, [modal, html]);

//   // generic setter via dot-path e.g. ["personal","fullName"]
//   const set = (path: string[], val: string) =>
//     setData((prev) => {
//       const n = JSON.parse(JSON.stringify(prev)) as CLData;
//       let cur: any = n;
//       for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
//       cur[path[path.length - 1]] = val;
//       return n;
//     });

//   const setSection = (id: string, f: "title" | "content", v: string) =>
//     setData((p) => ({
//       ...p,
//       sections: p.sections.map((s) => (s.id === id ? { ...s, [f]: v } : s)),
//     }));

//   const addSection = () =>
//     setData((p) => ({
//       ...p,
//       sections: [
//         ...p.sections,
//         {
//           id: Date.now() + "",
//           title: "New Section",
//           content: "",
//           placeholder: "Write here…",
//         },
//       ],
//     }));

//   const delSection = (id: string) =>
//     setData((p) => ({ ...p, sections: p.sections.filter((s) => s.id !== id) }));

//   const addAch = () => {
//     if (!achIn.trim()) return;
//     setData((p) => ({ ...p, achievements: [...p.achievements, achIn.trim()] }));
//     setAchIn("");
//   };

//   const delAch = (i: number) =>
//     setData((p) => ({
//       ...p,
//       achievements: p.achievements.filter((_, j) => j !== i),
//     }));

//   const downloadPDF = async () => {
//     const h = rebuild();
//     setBusy(true);
//     try {
//       const resp = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html: h },
//         { responseType: "blob" },
//       );
//       const url = URL.createObjectURL(resp.data);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `Cover_Letter_${data.personal.fullName || "Draft"}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//       showToast("✓ PDF Downloaded");
//     } catch {
//       showToast("Download failed — try again");
//     } finally {
//       setBusy(false);
//     }
//   };

//   const tpl = TEMPLATES.find((t) => t.id === tplId)!;
//   const cats = ["All", ...Array.from(new Set(TEMPLATES.map((t) => t.tag)))];
//   const stepIdx = STEPS.findIndex((s) => s.id === step);
//   const isFirst = stepIdx === 0;
//   const isLast = stepIdx === STEPS.length - 1;

//   const prev = () => {
//     if (!isFirst) setStep(STEPS[stepIdx - 1].id);
//   };
//   const next = () => {
//     if (!isLast) setStep(STEPS[stepIdx + 1].id);
//   };

//   return (
//     <>
//       <style>{`
//       @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
//       // *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
//       :root{
//         --p:#6c47ff;--p2:#8b5cf6;--p-light:#f0ebff;--p-mid:#ddd6fe;
//         --text:#0f0a1e;--sub:#64688a;--muted:#9ca3af;
//         --border:#e4e1f0;--border2:#ede9fe;
//         --bg:#f7f5ff;--white:#ffffff;
//         --radius:12px;--radius2:18px;
//         --shadow:0 2px 12px rgba(108,71,255,.08);
//         --shadow2:0 8px 32px rgba(108,71,255,.14);
//       }
//       // html,body{height:100%;overflow:hidden;font-family:'Plus Jakarta Sans',system-ui,sans-serif;background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased}

//       /* ── TOP NAV ── */
//       .nav{height:56px;background:var(--white);border-bottom:1.5px solid var(--border);display:flex;align-items:center;padding:0 24px;gap:16px;position:relative;z-index:100}
//       .nav-logo{display:flex;align-items:center;gap:9px}
//       .nav-logo-icon{width:30px;height:30px;background:linear-gradient(135deg,var(--p),var(--p2));border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px}
//       .nav-brand{font-size:15px;font-weight:800;color:var(--text);letter-spacing:-.3px}

//       /* ── STEP WIZARD BAR ── */
//       .wizard{display:flex;align-items:center;gap:0;flex:1;justify-content:center;padding:0 12px}
//       .wz-item{display:flex;align-items:center;gap:8px;cursor:pointer;padding:4px 2px}
//       .wz-dot{width:26px;height:26px;border-radius:50%;border:2px solid var(--border);background:var(--white);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:var(--muted);transition:all .2s;flex-shrink:0}
//       .wz-item.done .wz-dot{background:#10b981;border-color:#10b981;color:white}
//       .wz-item.active .wz-dot{background:var(--p);border-color:var(--p);color:white;box-shadow:0 0 0 3px rgba(108,71,255,.18)}
//       .wz-label{font-size:12px;font-weight:700;color:var(--muted);transition:.2s;white-space:nowrap}
//       .wz-item.done .wz-label,.wz-item.active .wz-label{color:var(--text)}
//       .wz-line{width:28px;height:2px;background:var(--border);margin:0 4px;flex-shrink:0;transition:.2s}
//       .wz-line.done{background:#10b981}
//       @media(max-width:640px){.wz-label{display:none}.wz-line{width:16px}}

//       .nav-right{display:flex;align-items:center;gap:8px;margin-left:auto}
//       .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:40px;font-size:12.5px;font-weight:700;cursor:pointer;border:none;font-family:inherit;transition:all .18s;white-space:nowrap}
//       .btn-ghost{background:transparent;color:var(--sub);border:1.5px solid var(--border)}
//       .btn-ghost:hover{background:var(--p-light);border-color:var(--p-mid);color:var(--p)}
//       .btn-primary{background:linear-gradient(135deg,var(--p),var(--p2));color:white;box-shadow:0 4px 14px rgba(108,71,255,.28)}
//       .btn-primary:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 22px rgba(108,71,255,.36)}
//       .btn-primary:disabled{opacity:.55;cursor:not-allowed;transform:none}
//       .btn-sm{padding:7px 14px;font-size:11.5px}

//       /* ── MAIN SHELL (same as screenshot: form left, preview right) ── */
//       .shell{display:grid;grid-template-columns:1fr 520px;height:calc(100vh - 56px)}
//       @media(max-width:1100px){.shell{grid-template-columns:1fr 420px}}
//       @media(max-width:820px){.shell{grid-template-columns:1fr;height:auto;overflow:auto}}

//       /* ── LEFT: FORM AREA ── */
//       .left{display:flex;flex-direction:column;overflow:hidden;background:var(--bg)}
//       .left-header{padding:28px 32px 0;flex-shrink:0}
//       .page-title{font-size:clamp(22px,3.5vw,28px);font-weight:800;color:var(--p);letter-spacing:-.5px;margin-bottom:4px}
//       .page-sub{font-size:13.5px;color:var(--sub);margin-bottom:16px}
//       .pro-tip{display:inline-flex;align-items:center;gap:7px;padding:7px 16px;background:linear-gradient(135deg,var(--p),var(--p2));color:white;border-radius:40px;font-size:12px;font-weight:700;cursor:pointer;border:none;font-family:inherit;margin-bottom:22px}

//       .left-scroll{flex:1;overflow-y:auto;padding:0 32px 24px;scrollbar-width:thin;scrollbar-color:var(--border) transparent}
//       .left-scroll::-webkit-scrollbar{width:4px}
//       .left-scroll::-webkit-scrollbar-thumb{background:var(--p-mid);border-radius:4px}

//       /* card */
//       .card{background:var(--white);border-radius:var(--radius2);padding:20px 22px;margin-bottom:16px;box-shadow:var(--shadow);border:1.5px solid var(--border2)}
//       .card-hd{display:flex;align-items:center;gap:10px;margin-bottom:16px}
//       .card-icon{width:36px;height:36px;background:linear-gradient(135deg,var(--p),var(--p2));border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
//       .card-title{font-size:14.5px;font-weight:800;color:var(--text)}
//       .card-sub{font-size:12px;color:var(--sub);margin-top:1px}

//       /* form fields */
//       .field{margin-bottom:14px}
//       .field-label{font-size:11px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;color:var(--sub);margin-bottom:6px;display:block}
//       .field-label span{color:#ef4444}
//       .iw{position:relative}
//       .iw-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:13px;pointer-events:none;opacity:.5}
//       input,textarea,select{
//         width:100%;padding:10px 12px 10px 36px;border:1.5px solid var(--border);border-radius:var(--radius);
//         font-size:13px;font-family:inherit;color:var(--text);background:white;outline:none;transition:.15s;
//       }
//       textarea{padding-left:12px;resize:vertical;min-height:78px;line-height:1.65}
//       input.bare,select.bare{padding-left:12px}
//       input:focus,textarea:focus,select:focus{border-color:var(--p);box-shadow:0 0 0 3px rgba(108,71,255,.1)}
//       input::placeholder,textarea::placeholder{color:#b8bbd4;font-weight:400}
//       .g2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
//       .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
//       @media(max-width:520px){.g2,.g3{grid-template-columns:1fr}}

//       /* ── TEMPLATE PICKER inside left scroll ── */
//       .tpl-section{margin-bottom:20px}
//       .filter-row{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:16px}
//       .f-btn{padding:5px 14px;border-radius:30px;font-size:11.5px;font-weight:700;cursor:pointer;border:1.5px solid var(--border);background:white;color:var(--sub);font-family:inherit;transition:.15s}
//       .f-btn:hover,.f-btn.on{border-color:var(--p);color:var(--p);background:var(--p-light)}
//       .tpl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}
//       .tpl-card{background:white;border:2px solid var(--border2);border-radius:var(--radius2);overflow:hidden;cursor:pointer;transition:all .2s}
//       .tpl-card:hover{transform:translateY(-3px);box-shadow:var(--shadow2);border-color:var(--p-mid)}
//       .tpl-card.on{border-color:var(--p);box-shadow:0 0 0 3px rgba(108,71,255,.14)}
//       .tpl-thumb{height:80px;position:relative;overflow:hidden}
//       .tpl-mock{position:absolute;inset:10px;display:flex;flex-direction:column;gap:5px}
//       .tpl-mock-nm{height:9px;background:rgba(255,255,255,.75);border-radius:3px;width:55%}
//       .tpl-mock-r{height:5px;background:rgba(255,255,255,.45);border-radius:3px}
//       .tpl-mock-r.w80{width:80%}.tpl-mock-r.w60{width:60%}.tpl-mock-r.w35{width:35%}
//       .tpl-chk{position:absolute;top:7px;right:7px;width:20px;height:20px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.15)}
//       .tpl-chk-icon{width:11px;height:11px;stroke:var(--p);stroke-width:2.5;fill:none}
//       .tpl-info{padding:10px 12px}
//       .tpl-tag{font-size:9px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:var(--p);margin-bottom:3px}
//       .tpl-name{font-size:13px;font-weight:800;color:var(--text)}

//       /* sections */
//       .sec-block{background:#faf9ff;border:1.5px solid var(--border2);border-radius:var(--radius);padding:13px;margin-bottom:11px;transition:.15s}
//       .sec-block:focus-within{border-color:var(--p);background:white;box-shadow:0 0 0 3px rgba(108,71,255,.07)}
//       .sec-head{display:flex;align-items:center;gap:8px;margin-bottom:10px}
//       .sec-num{width:22px;height:22px;border-radius:7px;background:linear-gradient(135deg,var(--p),var(--p2));color:white;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
//       .sec-ti{flex:1;padding:6px 10px;border-radius:8px;border:1.5px solid var(--border);font-size:12.5px;font-weight:700;background:white;font-family:inherit;color:var(--text);outline:none;transition:.15s}
//       .sec-ti:focus{border-color:var(--p)}
//       .sec-del{width:26px;height:26px;background:white;border:1.5px solid var(--border);border-radius:7px;cursor:pointer;color:#f87171;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:.15s}
//       .sec-del:hover{background:#fef2f2;border-color:#fca5a5}

//       .add-btn{width:100%;padding:9px;background:white;border:1.5px dashed var(--p-mid);border-radius:var(--radius);color:var(--p);font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit;transition:.15s;margin-bottom:14px}
//       .add-btn:hover{background:var(--p-light);border-color:var(--p)}

//       .hdiv{height:1px;background:var(--border2);margin:16px 0}
//       .sub-lbl{font-size:10px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:var(--p);margin-bottom:10px}

//       /* achievements */
//       .ach-row{display:flex;gap:7px;margin-bottom:9px}
//       .ach-in{flex:1;padding:8px 12px;border:1.5px solid var(--border);border-radius:var(--radius);font-size:12.5px;font-family:inherit;outline:none;transition:.15s}
//       .ach-in:focus{border-color:var(--p);box-shadow:0 0 0 3px rgba(108,71,255,.1)}
//       .ach-add{padding:8px 16px;background:linear-gradient(135deg,var(--p),var(--p2));color:white;border:none;border-radius:var(--radius);cursor:pointer;font-size:12px;font-weight:700;font-family:inherit}
//       .ach-list{display:flex;flex-wrap:wrap;gap:7px}
//       .ach-tag{display:flex;align-items:center;gap:5px;padding:4px 10px 4px 9px;background:var(--p-light);border:1.5px solid var(--p-mid);border-radius:30px;font-size:12px;font-weight:600;color:var(--p)}
//       .ach-rm{background:none;border:none;cursor:pointer;color:var(--p);opacity:.6;font-size:14px;line-height:1;padding:0;display:flex;transition:.15s}
//       .ach-rm:hover{opacity:1;color:#ef4444}

//       /* ── BOTTOM NAV BUTTONS (matching screenshot) ── */
//       .left-footer{flex-shrink:0;padding:14px 32px;border-top:1.5px solid var(--border);background:var(--white);display:flex;justify-content:space-between;align-items:center;gap:12px}
//       .btn-nav-back{display:flex;align-items:center;gap:6px;padding:9px 20px;border-radius:40px;font-size:13px;font-weight:700;cursor:pointer;border:1.5px solid var(--border);background:white;color:var(--sub);font-family:inherit;transition:.15s}
//       .btn-nav-back:hover{background:var(--bg);border-color:var(--p-mid);color:var(--p)}
//       .btn-nav-back:disabled{opacity:.4;cursor:default}
//       .btn-nav-next{display:flex;align-items:center;gap:8px;padding:11px 28px;border-radius:40px;font-size:13.5px;font-weight:800;cursor:pointer;border:none;background:linear-gradient(135deg,var(--p),var(--p2));color:white;font-family:inherit;box-shadow:0 4px 16px rgba(108,71,255,.3);transition:.18s}
//       .btn-nav-next:hover{transform:translateY(-1px);box-shadow:0 6px 22px rgba(108,71,255,.38)}

//       /* ── RIGHT: PREVIEW ── */
//       .right{background:#eeeaf8;border-left:1.5px solid var(--border);display:flex;flex-direction:column;overflow:hidden}
//       .right-hd{flex-shrink:0;background:var(--white);border-bottom:1.5px solid var(--border);padding:0 20px;height:52px;display:flex;align-items:center;justify-content:space-between;gap:10px}
//       .right-hd-l{display:flex;align-items:center;gap:8px}
//       .live-dot{width:7px;height:7px;border-radius:50%;background:#10b981;animation:pulse 2s infinite}
//       @keyframes pulse{0%,100%{box-shadow:0 0 0 2px rgba(16,185,129,.2)}50%{box-shadow:0 0 0 5px rgba(16,185,129,.07)}}
//       .right-hd-title{font-size:13px;font-weight:700}
//       .right-hd-sub{font-size:11px;color:var(--muted)}

//       /* preview scroll + iframe */
//       .prev-scroll{flex:1;overflow-y:auto;padding:16px;scrollbar-width:thin;scrollbar-color:var(--p-mid) transparent}
//       .prev-scroll::-webkit-scrollbar{width:4px}
//       .prev-scroll::-webkit-scrollbar-thumb{background:var(--p-mid);border-radius:4px}
//       .prev-wrap{background:white;border-radius:10px;overflow:hidden;box-shadow:0 4px 32px rgba(108,71,255,.1);width:100%}
//       .prev-iframe{width:100%;height:1080px;border:none;display:block;pointer-events:none}
//       .prev-empty{height:400px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--muted);gap:10px;text-align:center;padding:24px}
//       .prev-empty-icon{font-size:48px;opacity:.2}

//       /* change template button (top right of preview like screenshot) */
//       .change-tpl-btn{display:flex;align-items:center;gap:6px;padding:6px 14px;border-radius:40px;background:white;border:1.5px solid var(--border2);font-size:12px;font-weight:700;color:var(--text);cursor:pointer;font-family:inherit;transition:.15s;box-shadow:var(--shadow)}
//       .change-tpl-btn:hover{border-color:var(--p);color:var(--p);background:var(--p-light)}

//       /* ── FULLSCREEN MODAL ── */
//       .overlay{position:fixed;inset:0;background:rgba(10,6,30,.82);backdrop-filter:blur(14px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;animation:fIn .2s ease}
//       @keyframes fIn{from{opacity:0}to{opacity:1}}
//       .modal{width:100%;max-width:940px;height:92vh;background:white;border-radius:22px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 48px 100px rgba(0,0,0,.4);animation:sUp .25s ease}
//       @keyframes sUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
//       .modal-hd{flex-shrink:0;height:56px;padding:0 24px;background:white;border-bottom:1.5px solid var(--border2);display:flex;align-items:center;justify-content:space-between}
//       .modal-hd-l{display:flex;align-items:center;gap:10px}
//       .modal-icon{width:30px;height:30px;background:linear-gradient(135deg,var(--p),var(--p2));border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-size:14px}
//       .modal-title{font-size:14.5px;font-weight:800}
//       .modal-sub{font-size:11px;color:var(--sub)}
//       .modal-close{width:30px;height:30px;border-radius:50%;background:var(--p-light);border:none;cursor:pointer;font-size:16px;color:var(--sub);display:flex;align-items:center;justify-content:center;transition:.15s}
//       .modal-close:hover{background:#fef2f2;color:#ef4444}
//       .modal-body{flex:1;overflow-y:auto;background:#eeeaf8;padding:20px;display:flex;justify-content:center}
//       .modal-inner{width:100%;max-width:900px;background:white;border-radius:10px;overflow:hidden;box-shadow:0 8px 40px rgba(108,71,255,.1)}
//       .modal-iframe{width:100%;height:1080px;border:none;display:block}
//       .modal-ft{flex-shrink:0;padding:12px 24px;border-top:1.5px solid var(--border2);background:white;display:flex;justify-content:flex-end;gap:10px}

//       /* ── TOAST ── */
//       .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--text);color:white;padding:10px 26px;border-radius:40px;font-size:13px;font-weight:700;z-index:9999;animation:toastIn .25s ease;box-shadow:0 8px 28px rgba(0,0,0,.2);white-space:nowrap}
//       @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

//       @media(max-width:820px){
//         .shell{height:auto}
//         .right{height:600px;border-left:none;border-top:1.5px solid var(--border)}
//         .prev-iframe,.modal-iframe{height:900px}
//         .left-scroll{max-height:calc(100vh - 260px)}
//       }
//       @media(max-width:480px){
//         .left-header{padding:20px 18px 0}
//         .left-scroll{padding:0 18px 18px}
//         .left-footer{padding:12px 18px}
//         .nav{padding:0 14px}
//         .modal{border-radius:14px 14px 0 0;position:fixed;bottom:0;height:88vh}
//         .overlay{padding:0;align-items:flex-end}
//       }
//     `}</style>

//       {/* ── TOP NAV ── */}
//       <nav className="nav">
//         <div className="nav-logo">
//           <div className="nav-logo-icon">✦</div>
//           <span className="nav-brand">CoverCraft</span>
//         </div>

//         {/* STEP WIZARD */}
//         <div className="wizard">
//           {STEPS.map((s, i) => (
//             <React.Fragment key={s.id}>
//               {i > 0 && (
//                 <div className={`wz-line ${i <= stepIdx ? "done" : ""}`} />
//               )}
//               <div
//                 className={`wz-item ${i < stepIdx ? "done" : i === stepIdx ? "active" : ""}`}
//                 onClick={() => setStep(s.id)}
//               >
//                 <div className="wz-dot">
//                   {i < stepIdx ? (
//                     <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
//                       <polyline
//                         points="2,9 6,13 14,4"
//                         stroke="white"
//                         strokeWidth="2.2"
//                       />
//                     </svg>
//                   ) : (
//                     i + 1
//                   )}
//                 </div>
//                 <span className="wz-label">{s.label}</span>
//               </div>
//             </React.Fragment>
//           ))}
//         </div>

//         <div className="nav-right">
//           <button
//             className="btn btn-ghost btn-sm"
//             onClick={() => {
//               rebuild();
//               setModal(true);
//             }}
//           >
//             ⛶ Full View
//           </button>
//           <button
//             className="btn btn-primary btn-sm"
//             onClick={downloadPDF}
//             disabled={busy}
//           >
//             {busy ? "Saving…" : "⬇ Download PDF"}
//           </button>
//         </div>
//       </nav>

//       {/* ── MAIN SHELL ── */}
//       <div className="shell">
//         {/* LEFT */}
//         <div className="left">
//           <div className="left-header">
//             {step === "template" && (
//               <>
//                 <div className="page-title">Choose a Template</div>
//                 <div className="page-sub">
//                   Pick a design that best represents your professional style
//                 </div>
//               </>
//             )}
//             {step === "personal" && (
//               <>
//                 <div className="page-title">Personal Information</div>
//                 <div className="page-sub">
//                   Let employers find you with accurate contact details
//                 </div>
//                 <button className="pro-tip">💡 View Pro Tips</button>
//               </>
//             )}
//             {step === "company" && (
//               <>
//                 <div className="page-title">Company Details</div>
//                 <div className="page-sub">
//                   Tell us about the company and role you're applying for
//                 </div>
//                 <button className="pro-tip">💡 Application Tips</button>
//               </>
//             )}
//             {step === "content" && (
//               <>
//                 <div className="page-title">Letter Content</div>
//                 <div className="page-sub">
//                   Craft compelling sections that showcase your value
//                 </div>
//                 <button className="pro-tip">✨ Generate With AI</button>
//               </>
//             )}
//           </div>

//           <div className="left-scroll">
//             {/* ── TEMPLATE STEP ── */}
//             {step === "template" && (
//               <div className="tpl-section">
//                 <div className="filter-row">
//                   {cats.map((c) => (
//                     <button
//                       key={c}
//                       className={`f-btn ${filter === c ? "on" : ""}`}
//                       onClick={() => setFilter(c)}
//                     >
//                       {c}
//                     </button>
//                   ))}
//                 </div>
//                 <div className="tpl-grid">
//                   {(filter === "All"
//                     ? TEMPLATES
//                     : TEMPLATES.filter((t) => t.tag === filter)
//                   ).map((t) => (
//                     <div
//                       key={t.id}
//                       className={`tpl-card ${tplId === t.id ? "on" : ""}`}
//                       onClick={() => setTplId(t.id)}
//                     >
//                       <div className="tpl-thumb" style={{ background: t.grad }}>
//                         <div className="tpl-mock">
//                           <div className="tpl-mock-nm" />
//                           <div className="tpl-mock-r w80" />
//                           <div className="tpl-mock-r w60" />
//                           <div className="tpl-mock-r w35" />
//                         </div>
//                         {tplId === t.id && (
//                           <div className="tpl-chk">
//                             <svg viewBox="0 0 16 16" className="tpl-chk-icon">
//                               <polyline points="2,9 6,13 14,4" />
//                             </svg>
//                           </div>
//                         )}
//                       </div>
//                       <div className="tpl-info">
//                         <div className="tpl-tag">{t.tag}</div>
//                         <div className="tpl-name">{t.name}</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* ── PERSONAL STEP ── */}
//             {step === "personal" && (
//               <div className="card">
//                 <div className="card-hd">
//                   <div className="card-icon">👤</div>
//                   <div>
//                     <div className="card-title">Your Professional Profile</div>
//                     <div className="card-sub">
//                       Fill in your details to craft a standout letter
//                     </div>
//                   </div>
//                 </div>
//                 <div className="g2">
//                   <Fld label="Full Name" req icon="✏️">
//                     <input
//                       type="text"
//                       placeholder="Alexandra Chen"
//                       value={data.personal.fullName}
//                       onChange={(e) =>
//                         set(["personal", "fullName"], e.target.value)
//                       }
//                     />
//                   </Fld>
//                   <Fld label="Professional Title" icon="💼">
//                     <input
//                       type="text"
//                       placeholder="Senior Designer"
//                       value={data.personal.title}
//                       onChange={(e) =>
//                         set(["personal", "title"], e.target.value)
//                       }
//                     />
//                   </Fld>
//                 </div>
//                 <div className="g2">
//                   <Fld label="Email Address" req icon="✉️">
//                     <input
//                       type="email"
//                       placeholder="alex@email.com"
//                       value={data.personal.email}
//                       onChange={(e) =>
//                         set(["personal", "email"], e.target.value)
//                       }
//                     />
//                   </Fld>
//                   <Fld label="Phone Number" icon="📞">
//                     <input
//                       type="tel"
//                       placeholder="+1 555 000 1234"
//                       value={data.personal.phone}
//                       onChange={(e) =>
//                         set(["personal", "phone"], e.target.value)
//                       }
//                     />
//                   </Fld>
//                 </div>
//                 <Fld label="Location" icon="📍">
//                   <input
//                     type="text"
//                     placeholder="San Francisco, CA"
//                     value={data.personal.location}
//                     onChange={(e) =>
//                       set(["personal", "location"], e.target.value)
//                     }
//                   />
//                 </Fld>
//                 <div className="g2">
//                   <Fld label="LinkedIn" icon="🔗">
//                     <input
//                       type="text"
//                       placeholder="linkedin.com/in/alex"
//                       value={data.personal.linkedin}
//                       onChange={(e) =>
//                         set(["personal", "linkedin"], e.target.value)
//                       }
//                     />
//                   </Fld>
//                   <Fld label="Portfolio" icon="🌐">
//                     <input
//                       type="text"
//                       placeholder="alexchen.io"
//                       value={data.personal.website}
//                       onChange={(e) =>
//                         set(["personal", "website"], e.target.value)
//                       }
//                     />
//                   </Fld>
//                 </div>
//                 <Fld label="GitHub" icon="💻">
//                   <input
//                     type="text"
//                     placeholder="github.com/alexchen"
//                     value={data.personal.github}
//                     onChange={(e) =>
//                       set(["personal", "github"], e.target.value)
//                     }
//                   />
//                 </Fld>
//               </div>
//             )}

//             {/* ── COMPANY STEP ── */}
//             {step === "company" && (
//               <div className="card">
//                 <div className="card-hd">
//                   <div className="card-icon">🏢</div>
//                   <div>
//                     <div className="card-title">Company & Role</div>
//                     <div className="card-sub">
//                       Details about where you're applying
//                     </div>
//                   </div>
//                 </div>
//                 <Fld label="Company Name" req icon="🏢">
//                   <input
//                     type="text"
//                     placeholder="Google, Stripe, Airbnb…"
//                     value={data.company.name}
//                     onChange={(e) => set(["company", "name"], e.target.value)}
//                   />
//                 </Fld>
//                 <Fld label="Job Title Applying For" req icon="🎯">
//                   <input
//                     type="text"
//                     placeholder="Senior UX Designer"
//                     value={data.company.jobTitle}
//                     onChange={(e) =>
//                       set(["company", "jobTitle"], e.target.value)
//                     }
//                   />
//                 </Fld>
//                 <div className="g2">
//                   <Fld label="Hiring Manager Name" icon="👤">
//                     <input
//                       type="text"
//                       placeholder="Sarah Johnson"
//                       value={data.company.hiringManager}
//                       onChange={(e) =>
//                         set(["company", "hiringManager"], e.target.value)
//                       }
//                     />
//                   </Fld>
//                   <Fld label="Their Title" icon="🏷️">
//                     <input
//                       type="text"
//                       placeholder="Head of Design"
//                       value={data.company.hiringManagerTitle}
//                       onChange={(e) =>
//                         set(["company", "hiringManagerTitle"], e.target.value)
//                       }
//                     />
//                   </Fld>
//                 </div>
//                 <div
//                   style={{
//                     height: 1,
//                     background: "var(--border2)",
//                     margin: "14px 0",
//                   }}
//                 />
//                 <div className="sub-lbl">📍 Company Address (Optional)</div>
//                 <Fld label="Street Address">
//                   <input
//                     className="bare"
//                     type="text"
//                     placeholder="1600 Amphitheatre Pkwy"
//                     value={data.company.address}
//                     onChange={(e) =>
//                       set(["company", "address"], e.target.value)
//                     }
//                   />
//                 </Fld>
//                 <div className="g3">
//                   {(
//                     [
//                       ["City", "Mountain View", "city"],
//                       ["State", "CA", "state"],
//                       ["ZIP", "94043", "zipCode"],
//                     ] as const
//                   ).map(([l, p, k]) => (
//                     <Fld key={k} label={l}>
//                       <input
//                         className="bare"
//                         type="text"
//                         placeholder={p}
//                         value={(data.company as any)[k]}
//                         onChange={(e) =>
//                           set(["company", k as string], e.target.value)
//                         }
//                       />
//                     </Fld>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* ── CONTENT STEP ── */}
//             {step === "content" && (
//               <>
//                 <div className="card">
//                   <div className="card-hd">
//                     <div className="card-icon">✍️</div>
//                     <div>
//                       <div className="card-title">Letter Sections</div>
//                       <div className="card-sub">
//                         Build your cover letter paragraph by paragraph
//                       </div>
//                     </div>
//                   </div>
//                   {data.sections.map((s, i) => (
//                     <div key={s.id} className="sec-block">
//                       <div className="sec-head">
//                         <div className="sec-num">{i + 1}</div>
//                         <input
//                           className="sec-ti"
//                           value={s.title}
//                           onChange={(e) =>
//                             setSection(s.id, "title", e.target.value)
//                           }
//                           placeholder="Section title"
//                         />
//                         {data.sections.length > 1 && (
//                           <button
//                             className="sec-del"
//                             onClick={() => delSection(s.id)}
//                           >
//                             ✕
//                           </button>
//                         )}
//                       </div>
//                       <textarea
//                         rows={4}
//                         value={s.content}
//                         placeholder={s.placeholder}
//                         onChange={(e) =>
//                           setSection(s.id, "content", e.target.value)
//                         }
//                         style={{
//                           width: "100%",
//                           padding: "9px 11px",
//                           borderRadius: 8,
//                           border: "1.5px solid var(--border)",
//                           fontSize: 13,
//                           fontFamily: "inherit",
//                           outline: "none",
//                           resize: "vertical",
//                           transition: ".15s",
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = "var(--p)";
//                           e.target.style.boxShadow =
//                             "0 0 0 3px rgba(108,71,255,.1)";
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = "var(--border)";
//                           e.target.style.boxShadow = "none";
//                         }}
//                       />
//                     </div>
//                   ))}
//                   <button className="add-btn" onClick={addSection}>
//                     + Add Section
//                   </button>

//                   <div className="hdiv" />
//                   <div className="sub-lbl">🏆 Key Achievements</div>
//                   <div className="ach-row">
//                     <input
//                       className="ach-in"
//                       placeholder="e.g. Grew user retention by 40%"
//                       value={achIn}
//                       onChange={(e) => setAchIn(e.target.value)}
//                       onKeyDown={(e) => e.key === "Enter" && addAch()}
//                     />
//                     <button className="ach-add" onClick={addAch}>
//                       Add
//                     </button>
//                   </div>
//                   {data.achievements.length > 0 && (
//                     <div className="ach-list" style={{ marginBottom: 14 }}>
//                       {data.achievements.map((a, i) => (
//                         <div key={i} className="ach-tag">
//                           ⭐ {a}
//                           <button className="ach-rm" onClick={() => delAch(i)}>
//                             ✕
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   <div className="hdiv" />
//                   <div className="sub-lbl">📝 Additional Notes</div>
//                   <textarea
//                     rows={3}
//                     placeholder="Any extra context or postscript…"
//                     value={data.notes}
//                     onChange={(e) =>
//                       setData((p) => ({ ...p, notes: e.target.value }))
//                     }
//                     style={{
//                       width: "100%",
//                       padding: "9px 11px",
//                       borderRadius: 8,
//                       border: "1.5px solid var(--border)",
//                       fontSize: 13,
//                       fontFamily: "inherit",
//                       outline: "none",
//                       resize: "vertical",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = "var(--p)")}
//                     onBlur={(e) =>
//                       (e.target.style.borderColor = "var(--border)")
//                     }
//                   />
//                 </div>
//               </>
//             )}
//           </div>

//           {/* ── BOTTOM NAVIGATION (like screenshot) ── */}
//           <div className="left-footer">
//             <button className="btn-nav-back" onClick={prev} disabled={isFirst}>
//               ← {stepIdx > 0 ? `Back to ${STEPS[stepIdx - 1].label}` : "Back"}
//             </button>
//             {isLast ? (
//               <button
//                 className="btn-nav-next"
//                 onClick={downloadPDF}
//                 disabled={busy}
//               >
//                 {busy ? "⏳ Generating…" : "⬇ Download PDF"}
//               </button>
//             ) : (
//               <button className="btn-nav-next" onClick={next}>
//                 Continue to {STEPS[stepIdx + 1].label} →
//               </button>
//             )}
//           </div>
//         </div>

//         {/* RIGHT: LIVE PREVIEW */}
//         <div className="right">
//           <div className="right-hd">
//             <div className="right-hd-l">
//               <div className="live-dot" />
//               <div>
//                 <div className="right-hd-title">Live Preview</div>
//                 <div className="right-hd-sub">Updates as you type</div>
//               </div>
//             </div>
//             <button
//               className="change-tpl-btn"
//               onClick={() => setStep("template")}
//             >
//               🎨 Change Template
//             </button>
//           </div>
//           <div className="prev-scroll">
//             <div className="prev-wrap">
//               {html ? (
//                 <iframe
//                   ref={liveRef}
//                   className="prev-iframe"
//                   title="live-preview"
//                   sandbox="allow-same-origin"
//                 />
//               ) : (
//                 <div className="prev-empty">
//                   <div className="prev-empty-icon">📄</div>
//                   <div style={{ fontWeight: 700, fontSize: 15 }}>
//                     Preview will appear here
//                   </div>
//                   <div style={{ fontSize: 12 }}>Start filling your details</div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── FULLSCREEN MODAL ── */}
//       {modal && (
//         <div className="overlay" onClick={() => setModal(false)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-hd">
//               <div className="modal-hd-l">
//                 <div className="modal-icon">📄</div>
//                 <div>
//                   <div className="modal-title">
//                     {data.personal.fullName || "Cover Letter"}
//                   </div>
//                   <div className="modal-sub">
//                     {tpl.name} template · {tpl.tag}
//                   </div>
//                 </div>
//               </div>
//               <button className="modal-close" onClick={() => setModal(false)}>
//                 ✕
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="modal-inner">
//                 <iframe
//                   ref={modalRef}
//                   className="modal-iframe"
//                   title="full-view"
//                   sandbox="allow-same-origin"
//                 />
//               </div>
//             </div>
//             <div className="modal-ft">
//               <button className="btn btn-ghost" onClick={() => setModal(false)}>
//                 Close
//               </button>
//               <button
//                 className="btn btn-primary"
//                 onClick={downloadPDF}
//                 disabled={busy}
//               >
//                 {busy ? "⏳ Generating…" : "⬇ Download PDF"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {toast && <div className="toast">{toast}</div>}
//     </>
//   );
// }

// // ─── SMALL HELPERS ────────────────────────────
// function Fld({
//   label,
//   icon,
//   req,
//   children,
// }: {
//   label: string;
//   icon?: string;
//   req?: boolean;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="field">
//       <label className="field-label">
//         {label}
//         {req && <span> *</span>}
//       </label>
//       <div className="iw">
//         {icon && <span className="iw-icon">{icon}</span>}
//         {children}
//       </div>
//     </div>
//   );
// }

// "use client";
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import axios from "axios";
// import { API_URL } from "@/app/config/api";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// // ═══════════════════════════════════════════
// // TYPES
// // ═══════════════════════════════════════════
// interface PersonalInfo {
//   fullName: string;
//   title: string;
//   email: string;
//   phone: string;
//   location: string;
//   website: string;
//   linkedin: string;
//   github: string;
// }
// interface CompanyInfo {
//   name: string;
//   jobTitle: string;
//   hiringManager: string;
//   hiringManagerTitle: string;
//   city: string;
//   state: string;
// }
// interface Section {
//   id: string;
//   title: string;
//   content: string;
//   placeholder: string;
// }
// interface CLData {
//   personal: PersonalInfo;
//   company: CompanyInfo;
//   sections: Section[];
//   achievements: string[];
//   notes: string;
// }

// const BLANK: CLData = {
//   personal: {
//     fullName: "",
//     title: "",
//     email: "",
//     phone: "",
//     location: "",
//     website: "",
//     linkedin: "",
//     github: "",
//   },
//   company: {
//     name: "",
//     jobTitle: "",
//     hiringManager: "",
//     hiringManagerTitle: "",
//     city: "",
//     state: "",
//   },
//   sections: [
//     {
//       id: "1",
//       title: "Opening Statement",
//       content: "",
//       placeholder:
//         "Express your enthusiasm for the role and why you are the perfect fit…",
//     },
//     {
//       id: "2",
//       title: "Experience & Skills",
//       content: "",
//       placeholder:
//         "Highlight 2-3 relevant accomplishments that prove your value…",
//     },
//     {
//       id: "3",
//       title: "Why This Company",
//       content: "",
//       placeholder:
//         "Show genuine research — what specifically excites you about this org…",
//     },
//     {
//       id: "4",
//       title: "Closing",
//       content: "",
//       placeholder: "Thank them, reiterate enthusiasm, and invite next steps…",
//     },
//   ],
//   achievements: [],
//   notes: "",
// };

// // ═══════════════════════════════════════════
// // REAL TEMPLATE SVG THUMBNAILS
// // ═══════════════════════════════════════════
// const TemplateThumbnail = ({ id }: { id: string }) => {
//   switch (id) {
//     case "aurora":
//       return (
//         <svg
//           viewBox="0 0 220 155"
//           xmlns="http://www.w3.org/2000/svg"
//           width="100%"
//           height="100%"
//         >
//           <rect width="220" height="155" fill="#fff" />
//           <rect width="220" height="52" fill="#4f46e5" />
//           <circle cx="195" cy="-10" r="45" fill="#6366f1" opacity=".5" />
//           <rect
//             x="14"
//             y="13"
//             width="90"
//             height="8"
//             rx="2"
//             fill="rgba(255,255,255,.9)"
//           />
//           <rect
//             x="14"
//             y="25"
//             width="55"
//             height="5"
//             rx="1.5"
//             fill="rgba(255,255,255,.6)"
//           />
//           <rect
//             x="14"
//             y="38"
//             width="28"
//             height="5"
//             rx="10"
//             fill="rgba(255,255,255,.25)"
//             stroke="rgba(255,255,255,.4)"
//             strokeWidth=".5"
//           />
//           <rect
//             x="46"
//             y="38"
//             width="32"
//             height="5"
//             rx="10"
//             fill="rgba(255,255,255,.25)"
//             stroke="rgba(255,255,255,.4)"
//             strokeWidth=".5"
//           />
//           <rect
//             x="82"
//             y="38"
//             width="28"
//             height="5"
//             rx="10"
//             fill="rgba(255,255,255,.25)"
//             stroke="rgba(255,255,255,.4)"
//             strokeWidth=".5"
//           />
//           <rect x="14" y="62" width="40" height="3" rx="1" fill="#9ca3af" />
//           <rect x="14" y="70" width="130" height="3" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="76" width="110" height="3" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="88" width="50" height="3" rx="1" fill="#6366f1" />
//           <rect x="14" y="95" width="180" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="100" width="165" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="105" width="175" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="116" width="50" height="3" rx="1" fill="#6366f1" />
//           <rect x="14" y="123" width="180" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="128" width="120" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="140" width="35" height="3" rx="1" fill="#9ca3af" />
//           <rect x="14" y="147" width="55" height="3" rx="1" fill="#374151" />
//         </svg>
//       );
//     case "obsidian":
//       return (
//         <svg
//           viewBox="0 0 220 155"
//           xmlns="http://www.w3.org/2000/svg"
//           width="100%"
//           height="100%"
//         >
//           <rect width="220" height="155" fill="#fff" />
//           <rect width="65" height="155" fill="#1e1b4b" />
//           <rect
//             x="8"
//             y="14"
//             width="48"
//             height="7"
//             rx="1.5"
//             fill="rgba(233,213,255,.85)"
//           />
//           <rect
//             x="8"
//             y="25"
//             width="35"
//             height="3.5"
//             rx="1"
//             fill="rgba(165,180,252,.5)"
//           />
//           <rect
//             x="8"
//             y="38"
//             width="48"
//             height="1"
//             rx=".5"
//             fill="rgba(165,180,252,.2)"
//           />
//           <rect
//             x="8"
//             y="46"
//             width="20"
//             height="2.5"
//             rx="1"
//             fill="rgba(109,91,186,.7)"
//           />
//           <rect
//             x="8"
//             y="52"
//             width="45"
//             height="2.5"
//             rx="1"
//             fill="rgba(196,181,253,.6)"
//           />
//           <rect
//             x="8"
//             y="57"
//             width="38"
//             height="2.5"
//             rx="1"
//             fill="rgba(196,181,253,.6)"
//           />
//           <rect
//             x="8"
//             y="66"
//             width="20"
//             height="2.5"
//             rx="1"
//             fill="rgba(109,91,186,.7)"
//           />
//           <rect
//             x="8"
//             y="72"
//             width="40"
//             height="2.5"
//             rx="1"
//             fill="rgba(196,181,253,.6)"
//           />
//           <rect
//             x="8"
//             y="80"
//             width="20"
//             height="2.5"
//             rx="1"
//             fill="rgba(109,91,186,.7)"
//           />
//           <rect
//             x="8"
//             y="86"
//             width="43"
//             height="2.5"
//             rx="1"
//             fill="rgba(196,181,253,.6)"
//           />
//           <rect x="78" y="14" width="35" height="3" rx="1" fill="#9ca3af" />
//           <rect x="78" y="22" width="125" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="78" y="27" width="100" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="78" y="38" width="40" height="3" rx="1" fill="#7c3aed" />
//           <rect x="78" y="45" width="135" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="78" y="50" width="125" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="78" y="55" width="130" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="78" y="65" width="40" height="3" rx="1" fill="#7c3aed" />
//           <rect x="78" y="72" width="135" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="78" y="77" width="110" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="78" y="90" width="40" height="3" rx="1" fill="#7c3aed" />
//           <rect x="78" y="97" width="135" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="78" y="102" width="90" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="78" y="118" width="30" height="2.5" rx="1" fill="#9ca3af" />
//           <rect x="78" y="125" width="50" height="3" rx="1" fill="#374151" />
//         </svg>
//       );
//     case "nordic":
//       return (
//         <svg
//           viewBox="0 0 220 155"
//           xmlns="http://www.w3.org/2000/svg"
//           width="100%"
//           height="100%"
//         >
//           <rect width="220" height="155" fill="#fff" />
//           <rect x="18" y="14" width="65" height="3" rx="1" fill="#c7d2fe" />
//           <rect x="18" y="22" width="120" height="10" rx="1.5" fill="#1e1b4b" />
//           <rect x="18" y="36" width="36" height="3" rx="1" fill="#4f46e5" />
//           <rect x="18" y="44" width="185" height="1" rx=".5" fill="#e0e7ff" />
//           <rect x="18" y="50" width="55" height="2.5" rx="1" fill="#9ca3af" />
//           <rect x="80" y="50" width="55" height="2.5" rx="1" fill="#9ca3af" />
//           <rect x="148" y="50" width="55" height="2.5" rx="1" fill="#9ca3af" />
//           <rect x="18" y="62" width="35" height="2.5" rx="1" fill="#9ca3af" />
//           <rect x="18" y="70" width="185" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="18" y="75" width="170" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="18" y="86" width="42" height="3" rx="1" fill="#4338ca" />
//           <rect x="18" y="93" width="185" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="18" y="98" width="160" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="18" y="103" width="175" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="18" y="114" width="42" height="3" rx="1" fill="#4338ca" />
//           <rect x="18" y="121" width="185" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="18" y="126" width="110" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="18" y="140" width="28" height="2.5" rx="1" fill="#9ca3af" />
//           <rect x="18" y="147" width="50" height="3" rx="1" fill="#374151" />
//         </svg>
//       );
//     case "slate":
//       return (
//         <svg
//           viewBox="0 0 220 155"
//           xmlns="http://www.w3.org/2000/svg"
//           width="100%"
//           height="100%"
//         >
//           <rect width="220" height="155" fill="#fff" />
//           <rect x="14" y="14" width="95" height="9" rx="1.5" fill="#0f172a" />
//           <rect x="14" y="27" width="55" height="3" rx="1" fill="#64748b" />
//           <rect x="130" y="14" width="76" height="2.5" rx="1" fill="#475569" />
//           <rect x="130" y="20" width="60" height="2.5" rx="1" fill="#475569" />
//           <rect x="130" y="26" width="70" height="2.5" rx="1" fill="#475569" />
//           <rect x="14" y="38" width="192" height="2" rx=".5" fill="#1e293b" />
//           <rect
//             x="14"
//             y="46"
//             width="70"
//             height="4"
//             rx="2"
//             fill="#f1f5f9"
//             stroke="#e2e8f0"
//             strokeWidth=".5"
//           />
//           <rect
//             x="16"
//             y="47.5"
//             width="40"
//             height="1.5"
//             rx=".5"
//             fill="#64748b"
//           />
//           <rect x="14" y="56" width="35" height="2.5" rx="1" fill="#9ca3af" />
//           <rect x="14" y="64" width="185" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="69" width="160" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="79" width="3" height="30" rx="1" fill="#334155" />
//           <rect x="21" y="79" width="38" height="2.5" rx="1" fill="#334155" />
//           <rect x="21" y="85" width="175" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="21" y="90" width="150" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="21" y="95" width="165" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="107" width="3" height="25" rx="1" fill="#334155" />
//           <rect x="21" y="107" width="38" height="2.5" rx="1" fill="#334155" />
//           <rect x="21" y="113" width="175" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="21" y="118" width="130" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="135" width="30" height="2.5" rx="1" fill="#9ca3af" />
//           <rect x="14" y="142" width="50" height="3" rx="1" fill="#374151" />
//         </svg>
//       );
//     case "crimson":
//       return (
//         <svg
//           viewBox="0 0 220 155"
//           xmlns="http://www.w3.org/2000/svg"
//           width="100%"
//           height="100%"
//         >
//           <rect width="220" height="155" fill="#fffbf5" />
//           <rect width="220" height="5" fill="#9f1239" />
//           <rect x="14" y="14" width="192" height="11" rx="1.5" fill="#1a0a0d" />
//           <text
//             x="110"
//             y="23"
//             textAnchor="middle"
//             fontSize="10"
//             fontWeight="800"
//             fill="#1a0a0d"
//             fontFamily="Georgia,serif"
//           >
//             Alex Johnson
//           </text>
//           <rect
//             x="60"
//             y="29"
//             width="100"
//             height="3"
//             rx="1"
//             fill="#9f1239"
//             opacity=".7"
//           />
//           <text
//             x="110"
//             y="37"
//             textAnchor="middle"
//             fontSize="5.5"
//             fill="#9f1239"
//             fontFamily="Georgia,serif"
//             fontStyle="italic"
//           >
//             Senior Product Manager
//           </text>
//           <rect x="80" y="40" width="60" height=".8" fill="#fecdd3" />
//           <rect x="14" y="46" width="55" height="2" rx="1" fill="#9ca3af" />
//           <rect x="75" y="46" width="2" height="2" rx="1" fill="#9ca3af" />
//           <rect x="82" y="46" width="50" height="2" rx="1" fill="#9ca3af" />
//           <rect x="138" y="46" width="2" height="2" rx="1" fill="#9ca3af" />
//           <rect x="145" y="46" width="55" height="2" rx="1" fill="#9ca3af" />
//           <rect x="14" y="54" width="192" height=".8" fill="#fce7ef" />
//           <rect x="14" y="60" width="35" height="2.5" rx="1" fill="#9ca3af" />
//           <rect x="14" y="67" width="185" height="2.5" rx="1" fill="#6b7280" />
//           <rect x="14" y="72" width="160" height="2.5" rx="1" fill="#6b7280" />
//           <rect x="14" y="80" width="40" height="3" rx="1" fill="#9f1239" />
//           <rect x="14" y="87" width="185" height="2.5" rx="1" fill="#6b7280" />
//           <rect x="14" y="92" width="170" height="2.5" rx="1" fill="#6b7280" />
//           <rect x="14" y="97" width="175" height="2.5" rx="1" fill="#6b7280" />
//           <rect x="14" y="107" width="40" height="3" rx="1" fill="#9f1239" />
//           <rect x="14" y="114" width="185" height="2.5" rx="1" fill="#6b7280" />
//           <rect x="14" y="119" width="140" height="2.5" rx="1" fill="#6b7280" />
//           <rect x="14" y="135" width="30" height="2.5" rx="1" fill="#9ca3af" />
//           <rect x="14" y="142" width="52" height="3" rx="1" fill="#374151" />
//         </svg>
//       );
//     case "velvet":
//       return (
//         <svg
//           viewBox="0 0 220 155"
//           xmlns="http://www.w3.org/2000/svg"
//           width="100%"
//           height="100%"
//         >
//           <rect width="220" height="155" fill="#13072e" />
//           <rect width="220" height="155" fill="url(#vlv)" opacity=".9" />
//           <defs>
//             <linearGradient id="vlv" x1="0" y1="0" x2="1" y2="1">
//               <stop offset="0%" stopColor="#1e0f40" />
//               <stop offset="100%" stopColor="#2d1b69" />
//             </linearGradient>
//           </defs>
//           <circle cx="190" cy="20" r="55" fill="rgba(168,85,247,.1)" />
//           <rect x="14" y="16" width="80" height="9" rx="1.5" fill="#f3e8ff" />
//           <rect x="14" y="29" width="50" height="2.5" rx="1" fill="#a78bfa" />
//           <rect
//             x="14"
//             y="40"
//             width="185"
//             height=".8"
//             fill="rgba(196,181,253,.15)"
//           />
//           <rect
//             x="14"
//             y="47"
//             width="22"
//             height="2"
//             rx="1"
//             fill="rgba(196,181,253,.5)"
//           />
//           <rect
//             x="38"
//             y="47"
//             width="2"
//             height="2"
//             rx="1"
//             fill="rgba(196,181,253,.3)"
//           />
//           <rect
//             x="43"
//             y="47"
//             width="30"
//             height="2"
//             rx="1"
//             fill="rgba(196,181,253,.5)"
//           />
//           <rect
//             x="75"
//             y="47"
//             width="2"
//             height="2"
//             rx="1"
//             fill="rgba(196,181,253,.3)"
//           />
//           <rect
//             x="80"
//             y="47"
//             width="35"
//             height="2"
//             rx="1"
//             fill="rgba(196,181,253,.5)"
//           />
//           <rect x="14" y="56" width="35" height="2" rx="1" fill="#7c6fa0" />
//           <rect
//             x="14"
//             y="63"
//             width="185"
//             height="2.5"
//             rx="1"
//             fill="rgba(212,201,239,.5)"
//           />
//           <rect
//             x="14"
//             y="68"
//             width="160"
//             height="2.5"
//             rx="1"
//             fill="rgba(212,201,239,.5)"
//           />
//           <rect x="14" y="77" width="38" height="2.5" rx="1" fill="#c084fc" />
//           <rect
//             x="14"
//             y="84"
//             width="185"
//             height="2.5"
//             rx="1"
//             fill="rgba(212,201,239,.4)"
//           />
//           <rect
//             x="14"
//             y="89"
//             width="170"
//             height="2.5"
//             rx="1"
//             fill="rgba(212,201,239,.4)"
//           />
//           <rect
//             x="14"
//             y="94"
//             width="150"
//             height="2.5"
//             rx="1"
//             fill="rgba(212,201,239,.4)"
//           />
//           <rect x="14" y="103" width="38" height="2.5" rx="1" fill="#c084fc" />
//           <rect
//             x="14"
//             y="110"
//             width="185"
//             height="2.5"
//             rx="1"
//             fill="rgba(212,201,239,.4)"
//           />
//           <rect
//             x="14"
//             y="115"
//             width="120"
//             height="2.5"
//             rx="1"
//             fill="rgba(212,201,239,.4)"
//           />
//           <rect x="14" y="132" width="28" height="2" rx="1" fill="#7c6fa0" />
//           <rect x="14" y="139" width="52" height="3" rx="1" fill="#f3e8ff" />
//         </svg>
//       );
//     case "frost":
//       return (
//         <svg
//           viewBox="0 0 220 155"
//           xmlns="http://www.w3.org/2000/svg"
//           width="100%"
//           height="100%"
//         >
//           <defs>
//             <linearGradient id="frostbg" x1="0" y1="0" x2="1" y2="1">
//               <stop offset="0%" stopColor="#dbeafe" />
//               <stop offset="100%" stopColor="#e0f2fe" />
//             </linearGradient>
//           </defs>
//           <rect width="220" height="155" fill="url(#frostbg)" />
//           <rect
//             x="6"
//             y="6"
//             width="208"
//             height="143"
//             rx="10"
//             fill="rgba(255,255,255,.82)"
//           />
//           <rect
//             x="6"
//             y="6"
//             width="208"
//             height="48"
//             rx="10"
//             fill="rgba(12,74,110,.88)"
//           />
//           <rect
//             x="6"
//             y="30"
//             width="208"
//             height="24"
//             fill="rgba(12,74,110,.88)"
//           />
//           <rect x="18" y="16" width="80" height="8" rx="1.5" fill="white" />
//           <rect
//             x="18"
//             y="28"
//             width="50"
//             height="3"
//             rx="1"
//             fill="rgba(255,255,255,.7)"
//           />
//           <rect
//             x="18"
//             y="37"
//             width="25"
//             height="4"
//             rx="10"
//             fill="rgba(255,255,255,.18)"
//             stroke="rgba(255,255,255,.3)"
//             strokeWidth=".5"
//           />
//           <rect
//             x="47"
//             y="37"
//             width="30"
//             height="4"
//             rx="10"
//             fill="rgba(255,255,255,.18)"
//             stroke="rgba(255,255,255,.3)"
//             strokeWidth=".5"
//           />
//           <rect
//             x="81"
//             y="37"
//             width="28"
//             height="4"
//             rx="10"
//             fill="rgba(255,255,255,.18)"
//             stroke="rgba(255,255,255,.3)"
//             strokeWidth=".5"
//           />
//           <rect x="18" y="60" width="38" height="2.5" rx="1" fill="#9ca3af" />
//           <rect x="18" y="67" width="185" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="18" y="72" width="155" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="18" y="82" width="42" height="3" rx="1" fill="#0369a1" />
//           <rect x="18" y="89" width="185" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="18" y="94" width="170" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="18" y="99" width="175" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="18" y="109" width="42" height="3" rx="1" fill="#0369a1" />
//           <rect x="18" y="116" width="185" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="18" y="121" width="130" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="18" y="135" width="30" height="2" rx="1" fill="#9ca3af" />
//           <rect x="18" y="141" width="52" height="3" rx="1" fill="#374151" />
//         </svg>
//       );
//     case "prism":
//       return (
//         <svg
//           viewBox="0 0 220 155"
//           xmlns="http://www.w3.org/2000/svg"
//           width="100%"
//           height="100%"
//         >
//           <rect width="220" height="155" fill="#fff" />
//           <rect width="220" height="52" fill="#7c3aed" />
//           <polygon points="100,0 220,0 220,52" fill="rgba(255,255,255,.12)" />
//           <polygon points="140,0 220,0 220,52" fill="rgba(255,255,255,.08)" />
//           <rect x="14" y="14" width="85" height="9" rx="1.5" fill="white" />
//           <rect
//             x="14"
//             y="27"
//             width="50"
//             height="3.5"
//             rx="1"
//             fill="rgba(255,255,255,.7)"
//           />
//           <rect x="0" y="52" width="220" height="12" fill="#1e1b4b" />
//           <rect x="14" y="56" width="40" height="2" rx="1" fill="#a5b4fc" />
//           <rect x="62" y="56" width="35" height="2" rx="1" fill="#a5b4fc" />
//           <rect x="105" y="56" width="45" height="2" rx="1" fill="#a5b4fc" />
//           <rect x="14" y="75" width="35" height="2.5" rx="1" fill="#9ca3af" />
//           <rect x="14" y="83" width="185" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="88" width="165" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="97" width="3" height="22" rx="1" fill="#7c3aed" />
//           <rect x="21" y="97" width="38" height="2.5" rx="1" fill="#7c3aed" />
//           <rect x="21" y="103" width="180" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="21" y="108" width="155" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="117" width="3" height="20" rx="1" fill="#7c3aed" />
//           <rect x="21" y="117" width="38" height="2.5" rx="1" fill="#7c3aed" />
//           <rect x="21" y="123" width="180" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="21" y="128" width="100" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="140" width="30" height="2.5" rx="1" fill="#9ca3af" />
//           <rect x="14" y="147" width="52" height="3" rx="1" fill="#374151" />
//         </svg>
//       );
//     case "blaze":
//       return (
//         <svg
//           viewBox="0 0 220 155"
//           xmlns="http://www.w3.org/2000/svg"
//           width="100%"
//           height="100%"
//         >
//           <rect width="220" height="155" fill="#fff" />
//           <rect width="220" height="50" fill="#ea580c" />
//           <polygon points="140,0 220,0 220,50" fill="rgba(255,255,255,.1)" />
//           <rect
//             x="14"
//             y="10"
//             width="100"
//             height="12"
//             rx="1.5"
//             fill="rgba(255,255,255,.95)"
//           />
//           <rect
//             x="14"
//             y="27"
//             width="60"
//             height="4"
//             rx="1"
//             fill="rgba(255,255,255,.7)"
//           />
//           <rect x="0" y="50" width="220" height="11" fill="#1e293b" />
//           <rect x="14" y="54" width="38" height="2" rx="1" fill="#94a3b8" />
//           <rect x="60" y="54" width="40" height="2" rx="1" fill="#94a3b8" />
//           <rect x="108" y="54" width="40" height="2" rx="1" fill="#94a3b8" />
//           <rect x="14" y="70" width="35" height="2.5" rx="1" fill="#9ca3af" />
//           <rect x="14" y="78" width="185" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="83" width="160" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="93" width="3" height="25" rx="1" fill="#ea580c" />
//           <rect x="21" y="93" width="38" height="2.5" rx="1" fill="#ea580c" />
//           <rect x="21" y="99" width="185" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="21" y="104" width="170" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="116" width="3" height="20" rx="1" fill="#ea580c" />
//           <rect x="21" y="116" width="38" height="2.5" rx="1" fill="#ea580c" />
//           <rect x="21" y="122" width="185" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="21" y="127" width="130" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="142" width="30" height="2" rx="1" fill="#9ca3af" />
//           <rect x="14" y="149" width="52" height="3" rx="1" fill="#374151" />
//         </svg>
//       );
//     case "moss":
//       return (
//         <svg
//           viewBox="0 0 220 155"
//           xmlns="http://www.w3.org/2000/svg"
//           width="100%"
//           height="100%"
//         >
//           <rect
//             width="220"
//             height="155"
//             fill="white"
//             stroke="#bbf7d0"
//             strokeWidth="1"
//           />
//           <rect width="220" height="46" fill="#166534" />
//           <text x="48" y="28" fontSize="22" fill="rgba(255,255,255,.25)">
//             🌿
//           </text>
//           <rect
//             x="58"
//             y="13"
//             width="75"
//             height="8"
//             rx="1.5"
//             fill="rgba(255,255,255,.92)"
//           />
//           <rect
//             x="58"
//             y="25"
//             width="50"
//             height="3"
//             rx="1"
//             fill="rgba(255,255,255,.65)"
//           />
//           <rect x="0" y="46" width="220" height="11" fill="#f0fdf4" />
//           <rect x="14" y="50" width="40" height="2" rx="1" fill="#166534" />
//           <rect x="60" y="50" width="40" height="2" rx="1" fill="#166534" />
//           <rect x="106" y="50" width="35" height="2" rx="1" fill="#166534" />
//           <rect x="14" y="65" width="35" height="2.5" rx="1" fill="#9ca3af" />
//           <rect x="14" y="73" width="185" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="78" width="155" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="88" width="42" height="3" rx="1" fill="#166534" />
//           <rect x="14" y="95" width="185" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="100" width="170" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="105" width="175" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="115" width="42" height="3" rx="1" fill="#166534" />
//           <rect x="14" y="122" width="185" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="127" width="115" height="2.5" rx="1" fill="#e5e7eb" />
//           <rect x="14" y="140" width="30" height="2" rx="1" fill="#9ca3af" />
//           <rect x="14" y="147" width="52" height="3" rx="1" fill="#374151" />
//         </svg>
//       );
//     case "neon":
//       return (
//         <svg
//           viewBox="0 0 220 155"
//           xmlns="http://www.w3.org/2000/svg"
//           width="100%"
//           height="100%"
//         >
//           <rect width="220" height="155" fill="#0a0f1e" />
//           <rect x="14" y="14" width="95" height="10" rx="1.5" fill="white" />
//           <rect x="14" y="28" width="55" height="3" rx="1" fill="#22d3ee" />
//           <rect
//             x="14"
//             y="38"
//             width="192"
//             height=".8"
//             fill="rgba(34,211,238,.2)"
//           />
//           <rect x="14" y="38" width="60" height=".8" fill="#22d3ee" />
//           <rect x="14" y="44" width="55" height="2" rx="1" fill="#64748b" />
//           <rect x="75" y="44" width="60" height="2" rx="1" fill="#64748b" />
//           <rect x="140" y="44" width="55" height="2" rx="1" fill="#64748b" />
//           <rect x="14" y="56" width="35" height="2" rx="1" fill="#4a5578" />
//           <rect
//             x="14"
//             y="64"
//             width="185"
//             height="2.5"
//             rx="1"
//             fill="rgba(148,163,184,.4)"
//           />
//           <rect
//             x="14"
//             y="69"
//             width="150"
//             height="2.5"
//             rx="1"
//             fill="rgba(148,163,184,.4)"
//           />
//           <rect x="14" y="78" width="2" height="2.5" rx=".5" fill="#22d3ee" />
//           <rect x="20" y="78" width="35" height="2.5" rx="1" fill="#22d3ee" />
//           <rect
//             x="14"
//             y="84"
//             width="185"
//             height="2.5"
//             rx="1"
//             fill="rgba(148,163,184,.35)"
//           />
//           <rect
//             x="14"
//             y="89"
//             width="155"
//             height="2.5"
//             rx="1"
//             fill="rgba(148,163,184,.35)"
//           />
//           <rect
//             x="14"
//             y="94"
//             width="170"
//             height="2.5"
//             rx="1"
//             fill="rgba(148,163,184,.35)"
//           />
//           <rect x="14" y="103" width="2" height="2.5" rx=".5" fill="#22d3ee" />
//           <rect x="20" y="103" width="35" height="2.5" rx="1" fill="#22d3ee" />
//           <rect
//             x="14"
//             y="109"
//             width="185"
//             height="2.5"
//             rx="1"
//             fill="rgba(148,163,184,.35)"
//           />
//           <rect
//             x="14"
//             y="114"
//             width="130"
//             height="2.5"
//             rx="1"
//             fill="rgba(148,163,184,.35)"
//           />
//           <rect x="14" y="130" width="28" height="2" rx="1" fill="#4a5578" />
//           <rect x="14" y="137" width="52" height="3" rx="1" fill="white" />
//         </svg>
//       );
//     case "chalk":
//       return (
//         <svg
//           viewBox="0 0 220 155"
//           xmlns="http://www.w3.org/2000/svg"
//           width="100%"
//           height="100%"
//         >
//           <rect width="220" height="155" fill="#fdfcfa" />
//           <rect
//             x="4"
//             y="4"
//             width="212"
//             height="147"
//             rx="3"
//             fill="white"
//             stroke="#d6d3d1"
//             strokeWidth="1.5"
//             strokeDasharray="5,3"
//           />
//           <rect x="14" y="14" width="95" height="11" rx="1.5" fill="#1c1917" />
//           <rect x="14" y="29" width="55" height="4" rx="1" fill="#78716c" />
//           <rect
//             x="14"
//             y="40"
//             width="192"
//             height="1"
//             rx=".5"
//             fill="#e7e5e4"
//             strokeDasharray="4,2"
//           />
//           <rect
//             x="14"
//             y="48"
//             width="30"
//             height="5"
//             rx="2"
//             fill="white"
//             stroke="#d6d3d1"
//             strokeWidth="1"
//             strokeDasharray="3,2"
//           />
//           <rect
//             x="50"
//             y="48"
//             width="35"
//             height="5"
//             rx="2"
//             fill="white"
//             stroke="#d6d3d1"
//             strokeWidth="1"
//             strokeDasharray="3,2"
//           />
//           <rect
//             x="91"
//             y="48"
//             width="40"
//             height="5"
//             rx="2"
//             fill="white"
//             stroke="#d6d3d1"
//             strokeWidth="1"
//             strokeDasharray="3,2"
//           />
//           <rect x="14" y="60" width="35" height="2.5" rx="1" fill="#9ca3af" />
//           <rect x="14" y="68" width="185" height="2.5" rx="1" fill="#d6d3d1" />
//           <rect x="14" y="73" width="155" height="2.5" rx="1" fill="#d6d3d1" />
//           <rect x="14" y="82" width="38" height="2.5" rx="1.5" fill="#57534e" />
//           <rect x="14" y="89" width="185" height="2.5" rx="1" fill="#d6d3d1" />
//           <rect x="14" y="94" width="165" height="2.5" rx="1" fill="#d6d3d1" />
//           <rect x="14" y="99" width="175" height="2.5" rx="1" fill="#d6d3d1" />
//           <rect
//             x="14"
//             y="109"
//             width="38"
//             height="2.5"
//             rx="1.5"
//             fill="#57534e"
//           />
//           <rect x="14" y="116" width="185" height="2.5" rx="1" fill="#d6d3d1" />
//           <rect x="14" y="121" width="120" height="2.5" rx="1" fill="#d6d3d1" />
//           <rect x="14" y="135" width="30" height="2" rx="1" fill="#9ca3af" />
//           <rect x="14" y="141" width="52" height="3" rx="1" fill="#1c1917" />
//         </svg>
//       );
//     default:
//       return (
//         <svg viewBox="0 0 220 155" width="100%" height="100%">
//           <rect width="220" height="155" fill="#f3f4f6" />
//         </svg>
//       );
//   }
// };

// // ═══════════════════════════════════════════
// // TEMPLATE DEFINITIONS
// // ═══════════════════════════════════════════
// const TEMPLATES = [
//   { id: "aurora", name: "Aurora", tag: "Modern", accent: "#6366f1" },
//   { id: "obsidian", name: "Obsidian", tag: "Executive", accent: "#7c3aed" },
//   { id: "nordic", name: "Nordic", tag: "Minimal", accent: "#4338ca" },
//   { id: "slate", name: "Slate", tag: "Corporate", accent: "#1e293b" },
//   { id: "crimson", name: "Crimson", tag: "Editorial", accent: "#9f1239" },
//   { id: "velvet", name: "Velvet", tag: "Luxury", accent: "#6d28d9" },
//   { id: "frost", name: "Frost", tag: "Clean", accent: "#0369a1" },
//   { id: "prism", name: "Prism", tag: "Creative", accent: "#7c3aed" },
//   { id: "blaze", name: "Blaze", tag: "Bold", accent: "#c2410c" },
//   { id: "moss", name: "Moss", tag: "Natural", accent: "#166534" },
//   { id: "neon", name: "Neon Grid", tag: "Futuristic", accent: "#0f172a" },
//   { id: "chalk", name: "Chalk", tag: "Artistic", accent: "#44403c" },
// ];

// // ═══════════════════════════════════════════
// // HTML BUILDER — ALL LINKS INCLUDED
// // ═══════════════════════════════════════════
// function buildHTML(id: string, d: CLData): string {
//   const dt = new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
//   const nm = d.personal.fullName || "Your Name";
//   const ttl = d.personal.title || "Professional";
//   const mgr = d.company.hiringManager || "Hiring Manager";
//   const loc = [d.company.city, d.company.state].filter(Boolean).join(", ");

//   // Contact info rows — include ALL fields
//   const contactItems = [
//     d.personal.email && `<span>✉ ${d.personal.email}</span>`,
//     d.personal.phone && `<span>✆ ${d.personal.phone}</span>`,
//     d.personal.location && `<span>◎ ${d.personal.location}</span>`,
//   ].filter(Boolean);

//   const linkItems = [
//     d.personal.linkedin &&
//       `<a href="https://${d.personal.linkedin}" style="color:inherit;text-decoration:none">in ${d.personal.linkedin}</a>`,
//     d.personal.github &&
//       `<a href="https://${d.personal.github}"   style="color:inherit;text-decoration:none">⌥ ${d.personal.github}</a>`,
//     d.personal.website &&
//       `<a href="https://${d.personal.website}"  style="color:inherit;text-decoration:none">⊕ ${d.personal.website}</a>`,
//   ].filter(Boolean);

//   const allContacts = [...contactItems, ...linkItems];

//   const addrBlock = `
//     <div style="margin-bottom:20px;font-size:13px;line-height:1.9;color:#4a5568">
//       <strong style="color:#1a202c;font-size:13.5px">${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>
//       ${d.company.name}${loc ? `<br>${loc}` : ""}
//     </div>`;

//   const secRows = (color: string, border = false) =>
//     d.sections
//       .filter((s) => s.content.trim())
//       .map(
//         (s) => `
//       <div style="margin-bottom:22px${border ? `;padding-left:14px;border-left:3px solid ${color}` : ""}">
//         <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${color};margin-bottom:8px;margin-top:0">${s.title}</h4>
//         <p style="line-height:1.8;margin:0;font-size:13.5px;color:inherit">${s.content.replace(/\n/g, "<br>")}</p>
//       </div>`,
//       )
//       .join("");

//   const achBlock = (color: string) =>
//     d.achievements.length
//       ? `
//     <div style="margin:18px 0 22px">
//       <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${color};margin-bottom:10px;margin-top:0">Key Achievements</h4>
//       ${d.achievements
//         .map(
//           (
//             a,
//           ) => `<div style="display:flex;gap:9px;align-items:flex-start;margin-bottom:7px;font-size:13px">
//         <span style="color:${color};font-size:14px;line-height:1.4;flex-shrink:0">›</span><span>${a}</span>
//       </div>`,
//         )
//         .join("")}
//     </div>`
//       : "";

//   const notesBlock = d.notes
//     ? `<div style="margin:16px 0;padding:12px 16px;background:rgba(0,0,0,.03);border-left:3px solid #e2e8f0;font-size:13px;line-height:1.7;color:#64748b">${d.notes}</div>`
//     : "";

//   const closing = (col: string) => `
//     <div style="margin-top:36px;font-size:13.5px">
//       Sincerely,<br><br>
//       <strong style="font-size:15px">${nm}</strong>
//       ${d.personal.email ? `<br><span style="font-size:12px;color:${col}">${d.personal.email}</span>` : ""}
//       ${d.personal.linkedin ? `<br><span style="font-size:11.5px;color:#64748b">in ${d.personal.linkedin}</span>` : ""}
//     </div>`;

//   const base = (css: string, body: string) =>
//     `<!DOCTYPE html><html><head><meta charset="UTF-8">
//     <style>*{margin:0;padding:0;box-sizing:border-box}body{-webkit-print-color-adjust:exact;print-color-adjust:exact}${css}</style>
//     </head><body>${body}</body></html>`;

//   /* ── AURORA ─────────────────────────── */
//   if (id === "aurora")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
//      body{font-family:'DM Sans',sans-serif;color:#374151}
//      .pg{max-width:860px;margin:0 auto}
//      .hdr{background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 60%,#a78bfa 100%);padding:52px 56px 44px;color:white;position:relative;overflow:hidden}
//      .hdr::before{content:'';position:absolute;right:-80px;top:-80px;width:280px;height:280px;background:rgba(255,255,255,.07);border-radius:50%}
//      .nm{font-size:38px;font-weight:700;letter-spacing:-1.5px;margin-bottom:5px;position:relative}
//      .rl{font-size:14px;opacity:.85;margin-bottom:26px;position:relative}
//      .chips{display:flex;flex-wrap:wrap;gap:7px;position:relative}
//      .chip{padding:5px 14px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:40px;font-size:11.5px}
//      .body{padding:48px 56px}
//      .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//      .gr{font-size:16px;font-weight:600;margin-bottom:22px;color:#111827}`,
//       `<div class="pg">
//       <div class="hdr">
//         <div class="nm">${nm}</div>
//         <div class="rl">${ttl}</div>
//         <div class="chips">${allContacts.map((c) => `<span class="chip">${c}</span>`).join("")}</div>
//       </div>
//       <div class="body">
//         <div class="dt">${dt}</div>${addrBlock}
//         <div class="gr">Dear ${mgr},</div>
//         ${secRows("#6366f1")}${achBlock("#6366f1")}${notesBlock}${closing("#6366f1")}
//       </div>
//     </div>`,
//     );

//   /* ── OBSIDIAN ─────────────────────── */
//   if (id === "obsidian")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@300;400;500&display=swap');
//      body{font-family:'Inter',sans-serif;color:#374151}
//      .pg{max-width:900px;margin:0 auto;display:flex;min-height:100vh}
//      .side{width:258px;background:#1e1b4b;color:white;padding:44px 26px;flex-shrink:0}
//      .snm{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;color:#e9d5ff;line-height:1.2;margin-bottom:6px}
//      .srl{font-size:10px;color:#a5b4fc;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:30px;padding-bottom:26px;border-bottom:1px solid rgba(165,180,252,.2)}
//      .slbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#6d5bba;margin-bottom:7px;margin-top:22px}
//      .sval{font-size:11.5px;color:#c4b5fd;line-height:2;word-break:break-all}
//      .orn{color:#7c3aed;opacity:.45;font-size:18px;margin-top:22px;letter-spacing:4px}
//      .main{flex:1;padding:48px 44px}
//      .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//      .gr{font-size:16px;font-weight:600;margin-bottom:22px;color:#1e1b4b}`,
//       `<div class="pg">
//       <div class="side">
//         <div class="snm">${nm}</div>
//         <div class="srl">${ttl}</div>
//         ${d.personal.email ? `<div class="slbl">Email</div><div class="sval">${d.personal.email}</div>` : ""}
//         ${d.personal.phone ? `<div class="slbl">Phone</div><div class="sval">${d.personal.phone}</div>` : ""}
//         ${d.personal.location ? `<div class="slbl">Location</div><div class="sval">${d.personal.location}</div>` : ""}
//         ${d.personal.linkedin ? `<div class="slbl">LinkedIn</div><div class="sval">${d.personal.linkedin}</div>` : ""}
//         ${d.personal.github ? `<div class="slbl">GitHub</div><div class="sval">${d.personal.github}</div>` : ""}
//         ${d.personal.website ? `<div class="slbl">Portfolio</div><div class="sval">${d.personal.website}</div>` : ""}
//         <div class="orn">✦ ✦ ✦</div>
//       </div>
//       <div class="main">
//         <div class="dt">${dt}</div>${addrBlock}
//         <div class="gr">Dear ${mgr},</div>
//         ${secRows("#7c3aed")}${achBlock("#7c3aed")}${notesBlock}${closing("#7c3aed")}
//       </div>
//     </div>`,
//     );

//   /* ── NORDIC ───────────────────────── */
//   if (id === "nordic")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
//      body{font-family:'DM Sans',sans-serif;color:#374151}
//      .pg{max-width:750px;margin:0 auto;padding:64px 72px}
//      .eyebrow{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#4f46e5;margin-bottom:10px}
//      .nm{font-family:'Libre Baskerville',serif;font-size:44px;font-weight:700;letter-spacing:-2px;color:#1e1b4b;line-height:1.05}
//      .bar{width:52px;height:3px;background:#4f46e5;margin:16px 0 18px}
//      .ctrow{display:flex;flex-wrap:wrap;gap:6px 20px;margin-bottom:40px}
//      .cv{font-size:12px;color:#6b7280}
//      .cv a{color:#4f46e5;text-decoration:none}
//      .div{height:1px;background:#e0e7ff;margin:24px 0}
//      .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//      .gr{font-size:17px;font-weight:600;margin-bottom:22px;color:#1e1b4b}`,
//       `<div class="pg">
//       <div class="eyebrow">${ttl}</div>
//       <div class="nm">${nm}</div>
//       <div class="bar"></div>
//       <div class="ctrow">
//         ${d.personal.email ? `<span class="cv">${d.personal.email}</span>` : ""}
//         ${d.personal.phone ? `<span class="cv">${d.personal.phone}</span>` : ""}
//         ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
//         ${d.personal.linkedin ? `<span class="cv"><a href="#">${d.personal.linkedin}</a></span>` : ""}
//         ${d.personal.github ? `<span class="cv"><a href="#">${d.personal.github}</a></span>` : ""}
//         ${d.personal.website ? `<span class="cv"><a href="#">${d.personal.website}</a></span>` : ""}
//       </div>
//       <div class="div"></div>
//       <div class="dt">${dt}</div>${addrBlock}
//       <div class="gr">Dear ${mgr},</div>
//       ${secRows("#4338ca")}${achBlock("#4338ca")}${notesBlock}${closing("#4338ca")}
//     </div>`,
//     );

//   /* ── SLATE ────────────────────────── */
//   if (id === "slate")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
//      body{font-family:'IBM Plex Sans',sans-serif;color:#374151}
//      .pg{max-width:880px;margin:0 auto}
//      .hdr{padding:44px 52px;border-bottom:3px solid #0f172a;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}
//      .nm{font-size:34px;font-weight:700;color:#0f172a;letter-spacing:-1.5px}
//      .rl{font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-top:7px}
//      .ctcol{text-align:right}
//      .cv{font-size:11.5px;color:#475569;font-family:'IBM Plex Mono',monospace;line-height:2.1;display:block;word-break:break-all}
//      .cv a{color:#4f46e5;text-decoration:none}
//      .tag-pill{display:inline-block;font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:#64748b;background:#f1f5f9;border:1px solid #e2e8f0;padding:3px 10px;border-radius:4px;margin-bottom:22px}
//      .body{padding:40px 52px}
//      .dt{font-size:12.5px;color:#9ca3af;margin-bottom:20px}
//      .gr{font-size:16px;font-weight:600;margin-bottom:20px;color:#0f172a}`,
//       `<div class="pg">
//       <div class="hdr">
//         <div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>
//         <div class="ctcol">
//           ${d.personal.email ? `<span class="cv">${d.personal.email}</span>` : ""}
//           ${d.personal.phone ? `<span class="cv">${d.personal.phone}</span>` : ""}
//           ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
//           ${d.personal.linkedin ? `<span class="cv"><a href="#">${d.personal.linkedin}</a></span>` : ""}
//           ${d.personal.github ? `<span class="cv"><a href="#">${d.personal.github}</a></span>` : ""}
//           ${d.personal.website ? `<span class="cv"><a href="#">${d.personal.website}</a></span>` : ""}
//         </div>
//       </div>
//       <div class="body">
//         <div class="tag-pill">RE: ${d.company.jobTitle || "Open Position"} · ${d.company.name || "Company"}</div>
//         <div class="dt">${dt}</div>${addrBlock}
//         <div class="gr">Dear ${mgr},</div>
//         ${secRows("#334155", true)}${achBlock("#334155")}${notesBlock}${closing("#334155")}
//       </div>
//     </div>`,
//     );

//   /* ── CRIMSON ──────────────────────── */
//   if (id === "crimson")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Lora:wght@400;500&display=swap');
//      body{font-family:'Lora',serif;color:#374151;background:#fffbf5}
//      .pg{max-width:800px;margin:0 auto;background:#fffbf5}
//      .top{height:5px;background:#9f1239}
//      .hdr{padding:48px 56px 16px;text-align:center}
//      .nm{font-family:'Playfair Display',serif;font-size:44px;font-weight:900;color:#1a0a0d;letter-spacing:-2px;line-height:1}
//      .rl{font-family:'Playfair Display',serif;font-style:italic;font-size:15px;color:#9f1239;margin:9px 0 16px}
//      .orn{color:#9f1239;font-size:12px;letter-spacing:5px}
//      .ctrow{display:flex;justify-content:center;flex-wrap:wrap;gap:5px 16px;padding:12px 0;font-size:12px;color:#6b7280}
//      .ctrow a{color:#9f1239;text-decoration:none}
//      .sep-wrap{display:flex;align-items:center;gap:10px;padding:0 56px;margin-bottom:4px}
//      .sl{flex:1;height:1px;background:#fecdd3}
//      .sd{width:5px;height:5px;background:#9f1239;border-radius:50%;flex-shrink:0}
//      .body{padding:24px 56px 52px}
//      .dt{font-size:12.5px;color:#9ca3af;margin-bottom:20px}
//      .gr{font-size:16px;font-style:italic;font-weight:600;margin-bottom:20px;color:#1a0a0d}`,
//       `<div class="pg">
//       <div class="top"></div>
//       <div class="hdr">
//         <div class="nm">${nm}</div>
//         <div class="rl">${ttl}</div>
//         <div class="orn">✦ ✦ ✦</div>
//         <div class="ctrow">
//           ${d.personal.email ? `<span>${d.personal.email}</span>` : ""}
//           ${d.personal.phone ? `<span>· ${d.personal.phone}</span>` : ""}
//           ${d.personal.location ? `<span>· ${d.personal.location}</span>` : ""}
//           ${d.personal.linkedin ? `<span>· <a href="#">${d.personal.linkedin}</a></span>` : ""}
//           ${d.personal.github ? `<span>· <a href="#">${d.personal.github}</a></span>` : ""}
//           ${d.personal.website ? `<span>· <a href="#">${d.personal.website}</a></span>` : ""}
//         </div>
//       </div>
//       <div class="sep-wrap"><div class="sl"></div><div class="sd"></div><div class="sl"></div></div>
//       <div class="body">
//         <div class="dt">${dt}</div>${addrBlock}
//         <div class="gr">Dear ${mgr},</div>
//         ${secRows("#9f1239")}${achBlock("#9f1239")}${notesBlock}${closing("#9f1239")}
//       </div>
//     </div>`,
//     );

//   /* ── VELVET ───────────────────────── */
//   if (id === "velvet")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500;600&display=swap');
//      body{font-family:'Raleway',sans-serif;background:#0f082a;color:#d4c9ef;min-height:100vh}
//      .pg{max-width:860px;margin:0 auto;background:linear-gradient(160deg,#1e0f40 0%,#2d1b69 100%);min-height:100vh}
//      .hdr{padding:56px 56px 40px;border-bottom:1px solid rgba(196,181,253,.15);position:relative;overflow:hidden}
//      .hdr::after{content:'';position:absolute;right:-40px;top:-40px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(168,85,247,.15),transparent 70%)}
//      .nm{font-family:'Cinzel',serif;font-size:36px;font-weight:600;color:#f3e8ff;letter-spacing:2px}
//      .rl{font-size:10.5px;letter-spacing:3px;text-transform:uppercase;color:#a78bfa;margin:12px 0 20px}
//      .chips{display:flex;flex-wrap:wrap;gap:7px}
//      .chip{padding:4px 12px;border:1px solid rgba(196,181,253,.25);color:#c4b5fd;font-size:11px;border-radius:4px}
//      .chip a{color:#c4b5fd;text-decoration:none}
//      .body{padding:44px 56px}
//      .dt{font-size:12px;color:#7c6fa0;margin-bottom:22px}
//      .gr{font-size:16px;font-weight:600;margin-bottom:22px;color:#e9d5ff}
//      .addr{color:#a78bfa!important;margin-bottom:22px;font-size:13px;line-height:1.9}`,
//       `<div class="pg">
//       <div class="hdr">
//         <div class="nm">${nm}</div>
//         <div class="rl">${ttl}</div>
//         <div class="chips">
//           ${d.personal.email ? `<span class="chip">${d.personal.email}</span>` : ""}
//           ${d.personal.phone ? `<span class="chip">${d.personal.phone}</span>` : ""}
//           ${d.personal.location ? `<span class="chip">${d.personal.location}</span>` : ""}
//           ${d.personal.linkedin ? `<span class="chip"><a href="#">${d.personal.linkedin}</a></span>` : ""}
//           ${d.personal.github ? `<span class="chip"><a href="#">${d.personal.github}</a></span>` : ""}
//           ${d.personal.website ? `<span class="chip"><a href="#">${d.personal.website}</a></span>` : ""}
//         </div>
//       </div>
//       <div class="body">
//         <div class="dt">${dt}</div>
//         <div class="addr"><strong style="color:#e9d5ff">${mgr}${d.company.hiringManagerTitle ? `, <span style='color:#a78bfa'>${d.company.hiringManagerTitle}</span>` : ""}</strong><br>${d.company.name}${loc ? `<br>${loc}` : ""}</div>
//         <div class="gr">Dear ${mgr},</div>
//         ${secRows("#c084fc")}${achBlock("#c084fc")}${notesBlock}
//         <div style="margin-top:36px;font-size:13.5px;color:#7c6fa0">Sincerely,<br><br><strong style="font-size:15px;color:#f3e8ff">${nm}</strong></div>
//       </div>
//     </div>`,
//     );

//   /* ── FROST ────────────────────────── */
//   if (id === "frost")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
//      body{font-family:'Outfit',sans-serif;background:linear-gradient(135deg,#dbeafe,#e0f2fe);min-height:100vh;padding:20px;color:#374151}
//      .pg{max-width:840px;margin:0 auto;background:rgba(255,255,255,.88);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.85);border-radius:16px;overflow:hidden}
//      .hdr{background:linear-gradient(135deg,rgba(12,74,110,.92),rgba(2,132,199,.9));padding:48px;color:white}
//      .nm{font-size:38px;font-weight:800;letter-spacing:-2px;margin-bottom:6px}
//      .rl{font-size:12.5px;opacity:.8;letter-spacing:1px;margin-bottom:22px}
//      .chips{display:flex;flex-wrap:wrap;gap:7px}
//      .chip{padding:5px 14px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.22);border-radius:40px;font-size:11.5px}
//      .chip a{color:white;text-decoration:none}
//      .body{padding:44px}
//      .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//      .gr{font-size:16px;font-weight:700;margin-bottom:22px;color:#0c4a6e}`,
//       `<div class="pg">
//       <div class="hdr">
//         <div class="nm">${nm}</div>
//         <div class="rl">${ttl}</div>
//         <div class="chips">
//           ${d.personal.email ? `<span class="chip">${d.personal.email}</span>` : ""}
//           ${d.personal.phone ? `<span class="chip">${d.personal.phone}</span>` : ""}
//           ${d.personal.location ? `<span class="chip">${d.personal.location}</span>` : ""}
//           ${d.personal.linkedin ? `<span class="chip"><a href="#">${d.personal.linkedin}</a></span>` : ""}
//           ${d.personal.github ? `<span class="chip"><a href="#">${d.personal.github}</a></span>` : ""}
//           ${d.personal.website ? `<span class="chip"><a href="#">${d.personal.website}</a></span>` : ""}
//         </div>
//       </div>
//       <div class="body">
//         <div class="dt">${dt}</div>${addrBlock}
//         <div class="gr">Dear ${mgr},</div>
//         ${secRows("#0369a1")}${achBlock("#0369a1")}${notesBlock}${closing("#0369a1")}
//       </div>
//     </div>`,
//     );

//   /* ── PRISM ────────────────────────── */
//   if (id === "prism")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
//      body{font-family:'Outfit',sans-serif;color:#374151}
//      .pg{max-width:860px;margin:0 auto}
//      .hdr{background:linear-gradient(120deg,#7c3aed,#c026d3);height:160px;position:relative;overflow:hidden}
//      .g1{position:absolute;right:0;top:0;bottom:0;width:55%;background:rgba(255,255,255,.1);clip-path:polygon(25% 0,100% 0,100% 100%,0 100%)}
//      .g2{position:absolute;right:0;top:0;bottom:0;width:33%;background:rgba(255,255,255,.07);clip-path:polygon(40% 0,100% 0,100% 100%,0 100%)}
//      .hi{position:absolute;left:44px;bottom:24px;color:white}
//      .nm{font-size:38px;font-weight:800;letter-spacing:-2px;line-height:1}
//      .rl{font-size:13px;opacity:.8;margin-top:6px}
//      .cbar{display:flex;background:#1e1b4b;padding:9px 44px;gap:20px;flex-wrap:wrap}
//      .cv{font-size:11px;color:#a5b4fc;padding:3px 0;word-break:break-all}
//      .cv a{color:#c4b5fd;text-decoration:none}
//      .body{padding:44px}
//      .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//      .gr{font-size:16px;font-weight:700;margin-bottom:22px;color:#1e1b4b}`,
//       `<div class="pg">
//       <div class="hdr">
//         <div class="g1"></div><div class="g2"></div>
//         <div class="hi"><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>
//       </div>
//       <div class="cbar">
//         ${d.personal.email ? `<span class="cv">${d.personal.email}</span>` : ""}
//         ${d.personal.phone ? `<span class="cv">${d.personal.phone}</span>` : ""}
//         ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
//         ${d.personal.linkedin ? `<span class="cv"><a href="#">${d.personal.linkedin}</a></span>` : ""}
//         ${d.personal.github ? `<span class="cv"><a href="#">${d.personal.github}</a></span>` : ""}
//         ${d.personal.website ? `<span class="cv"><a href="#">${d.personal.website}</a></span>` : ""}
//       </div>
//       <div class="body">
//         <div class="dt">${dt}</div>${addrBlock}
//         <div class="gr">Dear ${mgr},</div>
//         ${secRows("#7c3aed", true)}${achBlock("#7c3aed")}${notesBlock}${closing("#7c3aed")}
//       </div>
//     </div>`,
//     );

//   /* ── BLAZE ────────────────────────── */
//   if (id === "blaze")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;900&family=Barlow:wght@400;500;600&display=swap');
//      body{font-family:'Barlow',sans-serif;color:#374151}
//      .pg{max-width:880px;margin:0 auto}
//      .hdr{background:linear-gradient(110deg,#ea580c,#f59e0b);padding:44px 52px;color:white;position:relative;overflow:hidden}
//      .hdr::after{content:'';position:absolute;right:0;top:0;bottom:0;width:100px;background:rgba(255,255,255,.08);clip-path:polygon(40% 0,100% 0,100% 100%)}
//      .nm{font-family:'Barlow Condensed',sans-serif;font-size:50px;font-weight:900;letter-spacing:-3px;text-transform:uppercase;line-height:.95;position:relative}
//      .rl{font-size:12px;letter-spacing:3px;text-transform:uppercase;opacity:.85;margin-top:9px;position:relative}
//      .ibar{background:#1e293b;padding:9px 52px;display:flex;gap:20px;flex-wrap:wrap}
//      .iv{font-size:11px;color:#94a3b8}
//      .iv a{color:#c4b5fd;text-decoration:none}
//      .body{padding:44px 52px}
//      .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//      .gr{font-size:16px;font-weight:700;margin-bottom:22px;color:#1e293b}`,
//       `<div class="pg">
//       <div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>
//       <div class="ibar">
//         ${d.personal.email ? `<span class="iv">${d.personal.email}</span>` : ""}
//         ${d.personal.phone ? `<span class="iv">${d.personal.phone}</span>` : ""}
//         ${d.personal.location ? `<span class="iv">${d.personal.location}</span>` : ""}
//         ${d.personal.linkedin ? `<span class="iv"><a href="#">${d.personal.linkedin}</a></span>` : ""}
//         ${d.personal.github ? `<span class="iv"><a href="#">${d.personal.github}</a></span>` : ""}
//         ${d.personal.website ? `<span class="iv"><a href="#">${d.personal.website}</a></span>` : ""}
//       </div>
//       <div class="body">
//         <div class="dt">${dt}</div>${addrBlock}
//         <div class="gr">Dear ${mgr},</div>
//         ${secRows("#ea580c", true)}${achBlock("#ea580c")}${notesBlock}${closing("#ea580c")}
//       </div>
//     </div>`,
//     );

//   /* ── MOSS ─────────────────────────── */
//   if (id === "moss")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;600&display=swap');
//      body{font-family:'Source Sans 3',sans-serif;color:#374151}
//      .pg{max-width:840px;margin:0 auto;border:1px solid #bbf7d0}
//      .hdr{background:linear-gradient(135deg,#14532d,#15803d);padding:44px;color:white;display:flex;align-items:center;gap:22px}
//      .lf{font-size:48px;opacity:.3;flex-shrink:0}
//      .nm{font-family:'Lora',serif;font-size:34px;font-weight:700;letter-spacing:-.5px;margin-bottom:4px}
//      .rl{font-size:11px;opacity:.8;letter-spacing:1.5px;text-transform:uppercase}
//      .strip{background:#f0fdf4;padding:9px 44px;display:flex;flex-wrap:wrap;gap:6px 18px;border-bottom:1px solid #bbf7d0}
//      .sv{font-size:11.5px;color:#166534}
//      .sv a{color:#15803d;text-decoration:none}
//      .body{padding:44px 48px}
//      .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//      .gr{font-family:'Lora',serif;font-size:16px;font-weight:700;margin-bottom:22px;color:#14532d}`,
//       `<div class="pg">
//       <div class="hdr">
//         <div class="lf">🌿</div>
//         <div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>
//       </div>
//       <div class="strip">
//         ${d.personal.email ? `<span class="sv">${d.personal.email}</span>` : ""}
//         ${d.personal.phone ? `<span class="sv">${d.personal.phone}</span>` : ""}
//         ${d.personal.location ? `<span class="sv">${d.personal.location}</span>` : ""}
//         ${d.personal.linkedin ? `<span class="sv"><a href="#">${d.personal.linkedin}</a></span>` : ""}
//         ${d.personal.github ? `<span class="sv"><a href="#">${d.personal.github}</a></span>` : ""}
//         ${d.personal.website ? `<span class="sv"><a href="#">${d.personal.website}</a></span>` : ""}
//       </div>
//       <div class="body">
//         <div class="dt">${dt}</div>${addrBlock}
//         <div class="gr">Dear ${mgr},</div>
//         ${secRows("#166534")}${achBlock("#166534")}${notesBlock}${closing("#166534")}
//       </div>
//     </div>`,
//     );

//   /* ── NEON ─────────────────────────── */
//   if (id === "neon")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Exo+2:wght@300;400;500;700;900&display=swap');
//      body{font-family:'Exo 2',sans-serif;background:#0a0f1e;color:#94a3b8;min-height:100vh}
//      .pg{max-width:880px;margin:0 auto;background:#0d1224;min-height:100vh}
//      .hdr{padding:52px;border-bottom:1px solid rgba(34,211,238,.15);position:relative}
//      .hdr::after{content:'';position:absolute;bottom:-1px;left:0;width:220px;height:2px;background:linear-gradient(90deg,#22d3ee,transparent)}
//      .nm{font-size:44px;font-weight:900;letter-spacing:-3px;color:white;line-height:1}
//      .rl{font-size:10.5px;letter-spacing:3px;text-transform:uppercase;color:#22d3ee;margin-top:10px;margin-bottom:20px}
//      .chips{display:flex;flex-wrap:wrap;gap:8px}
//      .chip{padding:3px 11px;border:1px solid rgba(34,211,238,.25);color:#64748b;font-size:10.5px;font-family:'Share Tech Mono',monospace;border-radius:4px}
//      .chip a{color:#22d3ee;text-decoration:none}
//      .body{padding:46px 52px}
//      .dt{font-size:11.5px;font-family:'Share Tech Mono',monospace;color:#4a5578;margin-bottom:22px}
//      .gr{font-size:16px;font-weight:700;color:white;margin-bottom:22px}
//      .sh4{font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#22d3ee;margin-bottom:7px;border-left:2px solid #22d3ee;padding-left:10px}`,
//       `<div class="pg">
//       <div class="hdr">
//         <div class="nm">${nm}</div>
//         <div class="rl">${ttl}</div>
//         <div class="chips">
//           ${d.personal.email ? `<span class="chip">${d.personal.email}</span>` : ""}
//           ${d.personal.phone ? `<span class="chip">${d.personal.phone}</span>` : ""}
//           ${d.personal.location ? `<span class="chip">${d.personal.location}</span>` : ""}
//           ${d.personal.linkedin ? `<span class="chip"><a href="#">${d.personal.linkedin}</a></span>` : ""}
//           ${d.personal.github ? `<span class="chip"><a href="#">${d.personal.github}</a></span>` : ""}
//           ${d.personal.website ? `<span class="chip"><a href="#">${d.personal.website}</a></span>` : ""}
//         </div>
//       </div>
//       <div class="body">
//         <div class="dt">${dt}</div>
//         <div style="margin-bottom:22px;font-size:13px;line-height:2"><strong style="color:#e2e8f0">${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>${d.company.name}${loc ? `<br><span style='color:#4a5578'>${loc}</span>` : ""}</div>
//         <div class="gr">Dear ${mgr},</div>
//         ${d.sections
//           .filter((s) => s.content.trim())
//           .map(
//             (s) =>
//               `<div style="margin-bottom:24px"><div class="sh4">${s.title}</div><p style="line-height:1.8;font-size:13.5px">${s.content.replace(/\n/g, "<br>")}</p></div>`,
//           )
//           .join("")}
//         ${achBlock("#22d3ee")}${notesBlock}
//         <div style="margin-top:36px;color:#64748b">Sincerely,<br><br><strong style="color:white;font-size:15px">${nm}</strong></div>
//       </div>
//     </div>`,
//     );

//   /* ── CHALK ────────────────────────── */
//   if (id === "chalk")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Nunito:wght@300;400;600;700&display=swap');
//      body{font-family:'Nunito',sans-serif;background:#fdfcfa;color:#374151}
//      .pg{max-width:820px;margin:0 auto;background:white;border:2px dashed #d6d3d1;padding:56px 60px}
//      .nm{font-family:'Kalam',cursive;font-size:44px;color:#1c1917;line-height:1.1;margin-bottom:6px}
//      .rl{font-family:'Kalam',cursive;font-size:16px;color:#78716c;margin-bottom:16px}
//      .ctrow{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px;padding-bottom:28px;border-bottom:2px dashed #e7e5e4}
//      .ct{font-size:11.5px;color:#57534e;border:1.5px dashed #d6d3d1;padding:4px 12px;border-radius:8px}
//      .ct a{color:#57534e;text-decoration:none}
//      .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//      .gr{font-family:'Kalam',cursive;font-size:18px;margin-bottom:22px;color:#1c1917}`,
//       `<div class="pg">
//       <div class="nm">${nm}</div>
//       <div class="rl">${ttl}</div>
//       <div class="ctrow">
//         ${d.personal.email ? `<span class="ct">${d.personal.email}</span>` : ""}
//         ${d.personal.phone ? `<span class="ct">${d.personal.phone}</span>` : ""}
//         ${d.personal.location ? `<span class="ct">${d.personal.location}</span>` : ""}
//         ${d.personal.linkedin ? `<span class="ct"><a href="#">${d.personal.linkedin}</a></span>` : ""}
//         ${d.personal.github ? `<span class="ct"><a href="#">${d.personal.github}</a></span>` : ""}
//         ${d.personal.website ? `<span class="ct"><a href="#">${d.personal.website}</a></span>` : ""}
//       </div>
//       <div class="dt">${dt}</div>${addrBlock}
//       <div class="gr">Dear ${mgr},</div>
//       ${secRows("#57534e")}${achBlock("#57534e")}${notesBlock}${closing("#57534e")}
//     </div>`,
//     );

//   return buildHTML("aurora", d);
// }

// // ═══════════════════════════════════════════
// // STEP TYPES
// // ═══════════════════════════════════════════
// type Step = "template" | "personal" | "company" | "content";
// const STEPS: { id: Step; label: string; icon: string }[] = [
//   { id: "template", label: "Template", icon: "🎨" },
//   { id: "personal", label: "Personal", icon: "👤" },
//   { id: "company", label: "Company", icon: "🏢" },
//   { id: "content", label: "Content", icon: "✍️" },
// ];

// // ═══════════════════════════════════════════
// // MAIN COMPONENT
// // ═══════════════════════════════════════════
// export default function CoverLetterGenerator() {
//        const router = useRouter();

//   const [step, setStep] = useState<Step>("template");
//   const [tplId, setTplId] = useState("aurora");
//   const [data, setData] = useState<CLData>(JSON.parse(JSON.stringify(BLANK)));
//   const [html, setHtml] = useState("");
//   const [modal, setModal] = useState(false);
//   const [achIn, setAchIn] = useState("");
//   const [toast, setToast] = useState("");
//   const [busy, setBusy] = useState(false);
//   const [filter, setFilter] = useState("All");
//   const [mobilePreview, setMobilePreview] = useState(false);

//   const liveRef = useRef<HTMLIFrameElement>(null);
//   const modalRef = useRef<HTMLIFrameElement>(null);

//   const showToast = (m: string) => {
//     setToast(m);
//     setTimeout(() => setToast(""), 2600);
//   };

//   const rebuild = useCallback(() => {
//     const h = buildHTML(tplId, data);
//     setHtml(h);
//     return h;
//   }, [tplId, data]);

//   useEffect(() => {
//     const t = setTimeout(rebuild, 220);
//     return () => clearTimeout(t);
//   }, [rebuild]);

//   const writeIframe = (ref: React.RefObject<HTMLIFrameElement | null>, h: string) => {
//     if (!ref.current) return;
//     const doc = ref.current.contentDocument;
//     if (!doc) return;
//     doc.open();
//     doc.write(h);
//     doc.close();
//   };

//   useEffect(() => {
//     if (html) writeIframe(liveRef, html);
//   }, [html]);
//   useEffect(() => {
//     if ((modal || mobilePreview) && html) writeIframe(modalRef, html);
//   }, [modal, mobilePreview, html]);

//   const set = (path: string[], val: string) =>
//     setData((prev) => {
//       const n = JSON.parse(JSON.stringify(prev)) as CLData;
//       let cur: any = n;
//       for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
//       cur[path[path.length - 1]] = val;
//       return n;
//     });

//   const setSection = (id: string, f: "title" | "content", v: string) =>
//     setData((p) => ({
//       ...p,
//       sections: p.sections.map((s) => (s.id === id ? { ...s, [f]: v } : s)),
//     }));

//   const addSection = () =>
//     setData((p) => ({
//       ...p,
//       sections: [
//         ...p.sections,
//         {
//           id: Date.now() + "",
//           title: "New Section",
//           content: "",
//           placeholder: "Write here…",
//         },
//       ],
//     }));

//   const downloadPDF = async () => {
//     const h = rebuild();
//     setBusy(true);
//     try {
//       const r = await axios.post(
//         `${API_URL}/api/candidates/generate-pdf`,
//         { html: h },
//         { responseType: "blob" },
//       );
//       const url = URL.createObjectURL(r.data);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `Cover_Letter_${data.personal.fullName || "Draft"}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//       showToast("✓ PDF Downloaded successfully");
//     } catch {
//       showToast("Download failed — please try again");
//     } finally {
//       setBusy(false);
//     }
//   };

//   const tpl = TEMPLATES.find((t) => t.id === tplId)!;
//   const stepIdx = STEPS.findIndex((s) => s.id === step);
//   const shownTpls =
//     filter === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.tag === filter);

//   return (
//     <>
//       <style>{`
//       @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
//       :root {
//         --p: #5b38f0; --p2: #7c3aed; --p3: #9f67ff;
//         --p10: #f3f0ff; --p20: #ede9fe; --p30: #ddd6fe; --p50: #c4b5fd;
//         --ink: #0d0b1e; --ink2: #1e1b4b; --ink3: #3730a3;
//         --sub: #64688a; --muted: #9ca3af; --ghost: #b8bbd4;
//         --border: #e4e1f0; --border2: #ede9fe;
//         --bg: #f5f3ff; --bg2: #eeeafb; --white: #ffffff;
//         --r8: 8px; --r12: 12px; --r16: 16px; --r20: 20px; --r24: 24px;
//         --sh1: 0 1px 4px rgba(91,56,240,.08);
//         --sh2: 0 4px 20px rgba(91,56,240,.12);
//         --sh3: 0 12px 40px rgba(91,56,240,.18);
//         --shw: 0 20px 60px rgba(91,56,240,.22);
//       }
//      //  html, body { height: 100%; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; background: var(--bg); color: var(--ink); -webkit-font-smoothing: antialiased; overflow: hidden; }
//      //  @media (max-width: 820px) { html, body { overflow: auto; } }

//       /* ── NAV ─────────────────────── */
//       .nav {
//         height: 60px; background: var(--white); border-bottom: 1.5px solid var(--border);
//         display: flex; align-items: center; padding: 0 24px; gap: 12px; position: relative; z-index: 200;
//         box-shadow: var(--sh1);
//       }
//       .nav-logo { display: flex; align-items: center; gap: 9px; flex-shrink: 0; }
//       .nav-logo-gem {
//         width: 32px; height: 32px; border-radius: 9px;
//         background: linear-gradient(135deg, var(--p), var(--p2));
//         display: flex; align-items: center; justify-content: center; font-size: 15px;
//         box-shadow: 0 4px 12px rgba(91,56,240,.35);
//       }
//       .nav-brand { font-size: 16px; font-weight: 800; color: var(--ink); letter-spacing: -.3px; }
//       .nav-brand span { color: var(--p); }
//       .nav-divider { width: 1px; height: 22px; background: var(--border); margin: 0 4px; }

//       /* wizard */
//       .wizard { display: flex; align-items: center; gap: 0; flex: 1; justify-content: center; overflow-x: auto; padding: 0 8px; scrollbar-width: none; }
//       .wizard::-webkit-scrollbar { display: none; }
//       .wz { display: flex; align-items: center; gap: 7px; padding: 5px 8px; border-radius: 30px; cursor: pointer; transition: all .2s; flex-shrink: 0; }
//       .wz:hover:not(.wz-active) { background: var(--p10); }
//       .wz-dot {
//         width: 26px; height: 26px; border-radius: 50%; border: 2px solid var(--border);
//         background: var(--white); display: flex; align-items: center; justify-content: center;
//         font-size: 11px; font-weight: 800; color: var(--muted); transition: all .2s; flex-shrink: 0;
//       }
//       .wz-done .wz-dot { background: #10b981; border-color: #10b981; color: white; }
//       .wz-active .wz-dot { background: linear-gradient(135deg,var(--p),var(--p2)); border-color: transparent; color: white; box-shadow: 0 0 0 3px rgba(91,56,240,.18); }
//       .wz-label { font-size: 12.5px; font-weight: 700; color: var(--muted); transition: .2s; white-space: nowrap; }
//       .wz-done .wz-label, .wz-active .wz-label { color: var(--ink); }
//       .wz-line { width: 24px; height: 2px; background: var(--border); transition: .3s; flex-shrink: 0; }
//       .wz-line-done { background: #10b981; }
//       @media (max-width: 600px) { .wz-label { display: none; } .wz-line { width: 14px; } .nav { padding: 0 14px; gap: 8px; } }

//       .nav-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
//       .btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 40px; font-size: 12.5px; font-weight: 700; cursor: pointer; border: none; font-family: inherit; transition: all .18s; white-space: nowrap; letter-spacing: .1px; }
//       .btn-ghost { background: transparent; color: var(--sub); border: 1.5px solid var(--border); }
//       .btn-ghost:hover { background: var(--p10); border-color: var(--p30); color: var(--p); }
//       .btn-primary { background: linear-gradient(135deg,var(--p),var(--p2)); color: white; box-shadow: 0 4px 14px rgba(91,56,240,.3); }
//       .btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(91,56,240,.38); }
//       .btn-primary:disabled { opacity: .55; cursor: not-allowed; transform: none; }
//       .btn-sm { padding: 7px 14px; font-size: 11.5px; }
//       .btn-icon { padding: 8px; border-radius: 10px; }

//       /* ── SHELL ───────────────────── */
//       .shell { display: grid; grid-template-columns: 1fr 1fr; height: calc(100vh - 60px); }
//       @media (max-width: 1100px) { .shell { grid-template-columns: 1fr 420px; } }
//       @media (max-width: 820px) { .shell { grid-template-columns: 1fr; height: auto; } }

//       /* ── LEFT ───────────────────── */
//       .left { display: flex; flex-direction: column; background: var(--bg); overflow: hidden; }
//       .left-hd { flex-shrink: 0; padding: 28px 32px 0; }
//       .page-eyebrow { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
//       .eyebrow-icon { width: 30px; height: 30px; background: linear-gradient(135deg,var(--p),var(--p2)); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; }
//       .eyebrow-label { font-size: 12px; font-weight: 700; letter-spacing: .5px; color: var(--p); text-transform: uppercase; }
//       .page-title { font-size: clamp(20px, 3vw, 26px); font-weight: 800; color: var(--ink); letter-spacing: -.5px; margin-bottom: 4px; }
//       .page-sub { font-size: 13.5px; color: var(--sub); margin-bottom: 18px; }
//       .tip-pill { display: inline-flex; align-items: center; gap: 7px; padding: 7px 16px; background: linear-gradient(135deg,var(--p),var(--p2)); color: white; border-radius: 40px; font-size: 12px; font-weight: 700; cursor: pointer; border: none; font-family: inherit; margin-bottom: 4px; box-shadow: 0 4px 12px rgba(91,56,240,.25); transition: .18s; }
//       .tip-pill:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(91,56,240,.32); }

//       .left-body { flex: 1; overflow-y: auto; padding: 16px 32px 24px; scrollbar-width: thin; scrollbar-color: var(--p30) transparent; }
//       .left-body::-webkit-scrollbar { width: 4px; }
//       .left-body::-webkit-scrollbar-thumb { background: var(--p30); border-radius: 4px; }
//       @media (max-width: 820px) { .left-body { overflow-y: visible; } .left { overflow: visible; } }

//       /* ── TEMPLATE GRID ─────────── */
//       .filter-row { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 16px; }
//       .f-btn { padding: 5px 15px; border-radius: 30px; font-size: 11.5px; font-weight: 700; cursor: pointer; border: 1.5px solid var(--border); background: white; color: var(--sub); font-family: inherit; transition: .15s; }
//       .f-btn:hover, .f-btn.on { border-color: var(--p); color: var(--p); background: var(--p10); }

//       .tpl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 14px; margin-bottom: 8px; }
//       @media (max-width: 480px) { .tpl-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } }

//       .tpl-card { background: white; border: 2px solid var(--border2); border-radius: var(--r16); overflow: hidden; cursor: pointer; transition: all .22s; position: relative; }
//       .tpl-card:hover { transform: translateY(-4px); box-shadow: var(--sh3); border-color: var(--p50); }
//       .tpl-card.on { border-color: var(--p); box-shadow: 0 0 0 4px rgba(91,56,240,.14), var(--sh2); }
//       .tpl-thumb { height: 110px; overflow: hidden; background: #f8f7ff; }
//       .tpl-thumb svg { display: block; }
//       .tpl-chk { position: absolute; top: 8px; right: 8px; width: 22px; height: 22px; background: var(--p); border-radius: 50%; display: flex; align-items: center; justify-content: center; opacity: 0; transition: .2s; box-shadow: 0 2px 8px rgba(91,56,240,.4); }
//       .tpl-card.on .tpl-chk { opacity: 1; }
//       .tpl-chk svg { width: 12px; height: 12px; stroke: white; stroke-width: 2.5; fill: none; }
//       .tpl-info { padding: 11px 13px 13px; }
//       .tpl-tag { font-size: 9.5px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: var(--p); margin-bottom: 3px; }
//       .tpl-name { font-size: 13.5px; font-weight: 800; color: var(--ink); }
//       .tpl-name-sub { font-size: 11px; color: var(--sub); margin-top: 1px; }

//       /* ── FORM CARD ─────────────── */
//       .card { background: white; border-radius: var(--r20); padding: 22px; margin-bottom: 14px; box-shadow: var(--sh1); border: 1.5px solid var(--border2); }
//       .card-hd { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
//       .card-ico { width: 38px; height: 38px; background: linear-gradient(135deg,var(--p),var(--p2)); border-radius: 11px; display: flex; align-items: center; justify-content: center; font-size: 17px; flex-shrink: 0; box-shadow: 0 4px 12px rgba(91,56,240,.25); }
//       .card-title { font-size: 14.5px; font-weight: 800; color: var(--ink); }
//       .card-sub { font-size: 12px; color: var(--sub); margin-top: 1px; }

//       /* fields */
//       .fld { margin-bottom: 14px; }
//       .fld-lbl { font-size: 11px; font-weight: 800; letter-spacing: .8px; text-transform: uppercase; color: var(--sub); margin-bottom: 6px; display: block; }
//       .fld-lbl span { color: #ef4444; }
//       .iw { position: relative; }
//       .iw-ic { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 13px; pointer-events: none; opacity: .5; }
//       input, textarea, select {
//         width: 100%; padding: 10px 12px 10px 36px; border: 1.5px solid var(--border); border-radius: var(--r12);
//         font-size: 13px; font-family: inherit; color: var(--ink); background: white; outline: none; transition: .15s;
//       }
//       textarea { padding-left: 12px; resize: vertical; min-height: 80px; line-height: 1.65; }
//       .bare { padding-left: 12px; }
//       input:focus, textarea:focus, select:focus { border-color: var(--p); box-shadow: 0 0 0 3px rgba(91,56,240,.1); }
//       input::placeholder, textarea::placeholder { color: var(--ghost); }
//       .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
//       .g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
//       @media (max-width: 520px) { .g2, .g3 { grid-template-columns: 1fr; } }

//       /* section blocks */
//       .sec-block { background: var(--p10); border: 1.5px solid var(--p20); border-radius: var(--r12); padding: 13px; margin-bottom: 11px; transition: .2s; }
//       .sec-block:focus-within { background: white; border-color: var(--p); box-shadow: 0 0 0 3px rgba(91,56,240,.07); }
//       .sec-hd { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
//       .sec-num { width: 22px; height: 22px; border-radius: 7px; background: linear-gradient(135deg,var(--p),var(--p2)); color: white; font-size: 10px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
//       .sec-ti { flex: 1; padding: 6px 10px; border-radius: 8px; border: 1.5px solid var(--border); font-size: 12.5px; font-weight: 700; background: white; font-family: inherit; color: var(--ink); outline: none; transition: .15s; }
//       .sec-ti:focus { border-color: var(--p); }
//       .sec-del { width: 26px; height: 26px; background: white; border: 1.5px solid var(--border); border-radius: 7px; cursor: pointer; color: #f87171; font-size: 13px; display: flex; align-items: center; justify-content: center; transition: .15s; }
//       .sec-del:hover { background: #fef2f2; border-color: #fca5a5; }
//       .sec-ta { width: 100%; padding: 9px 11px; border-radius: 9px; border: 1.5px solid var(--border); font-size: 12.5px; font-family: inherit; outline: none; resize: vertical; transition: .15s; background: white; }
//       .sec-ta:focus { border-color: var(--p); box-shadow: 0 0 0 3px rgba(91,56,240,.08); }

//       .add-btn { width: 100%; padding: 9px; background: white; border: 1.5px dashed var(--p30); border-radius: var(--r12); color: var(--p); font-size: 12.5px; font-weight: 700; cursor: pointer; font-family: inherit; transition: .15s; margin-bottom: 14px; }
//       .add-btn:hover { background: var(--p10); border-color: var(--p); }

//       .hdiv { height: 1px; background: var(--border2); margin: 16px 0; }
//       .sub-lbl { font-size: 10.5px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: var(--p); margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }

//       /* achievements */
//       .ach-row { display: flex; gap: 7px; margin-bottom: 9px; }
//       .ach-in { flex: 1; padding: 9px 12px; border: 1.5px solid var(--border); border-radius: var(--r12); font-size: 12.5px; font-family: inherit; outline: none; transition: .15s; }
//       .ach-in:focus { border-color: var(--p); box-shadow: 0 0 0 3px rgba(91,56,240,.08); }
//       .ach-add { padding: 9px 16px; background: linear-gradient(135deg,var(--p),var(--p2)); color: white; border: none; border-radius: var(--r12); cursor: pointer; font-size: 12px; font-weight: 700; font-family: inherit; transition: .15s; }
//       .ach-add:hover { box-shadow: 0 4px 12px rgba(91,56,240,.3); }
//       .ach-list { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 4px; }
//       .ach-tag { display: flex; align-items: center; gap: 5px; padding: 4px 10px 4px 9px; background: var(--p10); border: 1.5px solid var(--p20); border-radius: 30px; font-size: 12px; font-weight: 600; color: var(--p); }
//       .ach-rm { background: none; border: none; cursor: pointer; color: var(--p50); font-size: 14px; line-height: 1; padding: 0; display: flex; transition: .15s; }
//       .ach-rm:hover { color: #ef4444; }

//       /* ── FOOTER ──────────────────── */
//       .left-ft { flex-shrink: 0; padding: 14px 32px; border-top: 1.5px solid var(--border); background: var(--white); display: flex; justify-content: space-between; align-items: center; gap: 12px; }
//       .btn-back { display: flex; align-items: center; gap: 6px; padding: 10px 20px; border-radius: 40px; font-size: 13px; font-weight: 700; cursor: pointer; border: 1.5px solid var(--border); background: white; color: var(--sub); font-family: inherit; transition: .15s; }
//       .btn-back:hover:not(:disabled) { background: var(--p10); border-color: var(--p30); color: var(--p); }
//       .btn-back:disabled { opacity: .38; cursor: default; }
//       .btn-next { display: flex; align-items: center; gap: 8px; padding: 12px 28px; border-radius: 40px; font-size: 13.5px; font-weight: 800; cursor: pointer; border: none; background: linear-gradient(135deg,var(--p),var(--p2)); color: white; font-family: inherit; box-shadow: 0 4px 16px rgba(91,56,240,.32); transition: .18s; }
//       .btn-next:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(91,56,240,.4); }
//       .btn-next:disabled { opacity: .55; cursor: not-allowed; transform: none; }
//       @media (max-width: 480px) { .left-hd { padding: 20px 18px 0; } .left-body { padding: 14px 18px 20px; } .left-ft { padding: 12px 18px; } .btn-next { padding: 11px 22px; font-size: 13px; } }

//       /* ── RIGHT PREVIEW ───────────── */
//       .right { background: var(--bg2); border-left: 1.5px solid var(--border); display: flex; flex-direction: column; overflow: hidden; }
//       @media (max-width: 820px) { .right { display: none; } }
//       .right-hd { flex-shrink: 0; height: 54px; padding: 0 18px; background: var(--white); border-bottom: 1.5px solid var(--border); display: flex; align-items: center; justify-content: space-between; gap: 10px; }
//       .right-hd-l { display: flex; align-items: center; gap: 9px; }
//       .live-dot { width: 7px; height: 7px; border-radius: 50%; background: #10b981; flex-shrink: 0; animation: livePulse 2s infinite; }
//       @keyframes livePulse { 0%,100% { box-shadow: 0 0 0 2px rgba(16,185,129,.2); } 50% { box-shadow: 0 0 0 5px rgba(16,185,129,.07); } }
//       .right-hd-info-title { font-size: 13px; font-weight: 700; }
//       .right-hd-info-sub { font-size: 11px; color: var(--muted); }
//       .right-hd-r { display: flex; align-items: center; gap: 7px; }
//       .change-tpl { display: flex; align-items: center; gap: 6px; padding: 6px 13px; border-radius: 30px; background: var(--p10); border: 1.5px solid var(--p20); font-size: 11.5px; font-weight: 700; color: var(--p); cursor: pointer; font-family: inherit; transition: .15s; }
//       .change-tpl:hover { background: var(--p20); border-color: var(--p30); }

//       .prev-scroll { flex: 1; overflow-y: auto; padding: 16px; scrollbar-width: thin; scrollbar-color: var(--p30) transparent; }
//       .prev-scroll::-webkit-scrollbar { width: 4px; }
//       .prev-scroll::-webkit-scrollbar-thumb { background: var(--p30); border-radius: 4px; }
//       .prev-wrap { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 32px rgba(91,56,240,.1); width: 100%; }
//       .prev-iframe { width: 100%; height: 1080px; border: none; display: block; pointer-events: none; }
//       .prev-empty { height: 380px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; color: var(--muted); text-align: center; padding: 24px; }
//       .prev-empty-icon { font-size: 52px; opacity: .18; }

//       /* ── MOBILE PREVIEW BTN ──────── */
//       .mob-prev-btn { display: none; }
//       @media (max-width: 820px) {
//         .mob-prev-btn {
//           display: flex; align-items: center; justify-content: center; gap: 8px;
//           position: fixed; bottom: 80px; right: 18px; z-index: 150;
//           padding: 12px 20px; border-radius: 40px; font-size: 13px; font-weight: 800;
//           background: linear-gradient(135deg,var(--p),var(--p2)); color: white;
//           border: none; cursor: pointer; font-family: inherit;
//           box-shadow: 0 8px 28px rgba(91,56,240,.4);
//         }
//       }

//       /* ── MODAL ───────────────────── */
//       .overlay { position: fixed; inset: 0; background: rgba(10,6,30,.84); backdrop-filter: blur(14px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn .2s ease; }
//       @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//       .modal { width: 100%; max-width: 960px; height: 92vh; background: white; border-radius: 24px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 48px 100px rgba(0,0,0,.45); animation: slideUp .25s ease; }
//       @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
//       .modal-hd { flex-shrink: 0; height: 58px; padding: 0 24px; background: white; border-bottom: 1.5px solid var(--border2); display: flex; align-items: center; justify-content: space-between; }
//       .modal-hd-l { display: flex; align-items: center; gap: 10px; }
//       .modal-ico { width: 32px; height: 32px; background: linear-gradient(135deg,var(--p),var(--p2)); border-radius: 9px; display: flex; align-items: center; justify-content: center; color: white; font-size: 15px; }
//       .modal-title { font-size: 15px; font-weight: 800; }
//       .modal-sub { font-size: 11.5px; color: var(--sub); }
//       .modal-close { width: 32px; height: 32px; border-radius: 50%; background: var(--p10); border: 1.5px solid var(--p20); cursor: pointer; font-size: 17px; color: var(--sub); display: flex; align-items: center; justify-content: center; transition: .15s; font-family: sans-serif; }
//       .modal-close:hover { background: #fef2f2; border-color: #fca5a5; color: #ef4444; }
//       .modal-body { flex: 1; overflow-y: auto; background: var(--bg2); padding: 20px; display: flex; justify-content: center; }
//       .modal-inner { width: 100%; max-width: 900px; background: white; border-radius: 12px; overflow: hidden; box-shadow: var(--sh3); }
//       .modal-iframe { width: 100%; height: 1080px; border: none; display: block; }
//       .modal-ft { flex-shrink: 0; padding: 13px 24px; border-top: 1.5px solid var(--border2); background: white; display: flex; justify-content: flex-end; gap: 10px; }

//       @media (max-width: 640px) {
//         .overlay { padding: 0; align-items: flex-end; }
//         .modal { border-radius: 20px 20px 0 0; height: 90vh; }
//         .modal-iframe { height: 900px; }
//       }

//       /* ── TOAST ───────────────────── */
//       .toast { position: fixed; bottom: 26px; left: 50%; transform: translateX(-50%); background: var(--ink); color: white; padding: 11px 26px; border-radius: 40px; font-size: 13px; font-weight: 700; z-index: 9999; animation: toastIn .25s ease; box-shadow: 0 8px 28px rgba(0,0,0,.22); white-space: nowrap; }
//       @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
//     `}</style>

//       {/* ── NAV ── */}
//       <nav className="nav">

//          {/* Logo - responsive sizing */}
//                 <button onClick={() => router.push("/")} className="cursor-pointer flex-shrink-0">
//                   <div className="relative w-25 xs:w-[120px] sm:w-35 md:w-[150px] h-[33px] xs:h-[40px] sm:h-[46px] md:h-[48px]">
//                     <Image
//                       src="/logo.png"
//                       alt="ATS Pass"
//                       fill
//                       className="object-contain"
//                       priority
//                       sizes="(max-width: 480px) 100px, (max-width: 640px) 120px, (max-width: 768px) 140px, 150px"
//                     />
//                   </div>
//                 </button>

//         {/* WIZARD */}
//         <div className="wizard">
//           {STEPS.map((s, i) => (
//             <React.Fragment key={s.id}>
//               {i > 0 && (
//                 <div
//                   className={`wz-line${i <= stepIdx ? " wz-line-done" : ""}`}
//                 />
//               )}
//               <div
//                 className={`wz ${i < stepIdx ? "wz-done" : i === stepIdx ? "wz-active" : ""}`}
//                 onClick={() => setStep(s.id)}
//               >
//                 <div className="wz-dot">
//                   {i < stepIdx ? (
//                     <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
//                       <polyline
//                         points="2,9 6,13 14,4"
//                         stroke="white"
//                         strokeWidth="2.5"
//                       />
//                     </svg>
//                   ) : (
//                     i + 1
//                   )}
//                 </div>
//                 <span className="wz-label">{s.label}</span>
//               </div>
//             </React.Fragment>
//           ))}
//         </div>

//       </nav>

//       {/* ── SHELL ── */}
//       <div className="shell">
//         {/* LEFT FORM */}
//         <div className="left">
//           <div className="left-hd">

//             {step === "template" && (
//               <>
//                 <div className="page-title">Choose Your Template</div>
//                 <div className="page-sub">
//                   Pick a design that best represents your professional style
//                 </div>
//               </>
//             )}
//             {step === "personal" && (
//               <>
//                 <div className="page-title">Personal Information</div>
//                 <div className="page-sub">
//                   Let recruiters find you with accurate contact details
//                 </div>
//               </>
//             )}
//             {step === "company" && (
//               <>
//                 <div className="page-title">Company Details</div>
//                 <div className="page-sub">
//                   Tell us about where you're applying
//                 </div>
//                 <button className="tip-pill">🎯 Application Tips</button>
//               </>
//             )}
//             {step === "content" && (
//               <>
//                 <div className="page-title">Letter Content</div>
//                 <div className="page-sub">
//                   Craft compelling sections that showcase your value
//                 </div>
//                 <button className="tip-pill">✨ Generate With AI</button>
//               </>
//             )}
//           </div>

//           <div className="left-body">
//             {/* TEMPLATE PICKER */}
//             {step === "template" && (

//                 <div className="tpl-grid">
//                   {TEMPLATES.map((t) => (
//                     <div
//                       key={t.id}
//                       className={`tpl-card${tplId === t.id ? " on" : ""}`}
//                       onClick={() => setTplId(t.id)}
//                     >
//                       <div className="tpl-thumb">
//                         <TemplateThumbnail id={t.id} />
//                       </div>
//                       <div className="tpl-chk">
//                         <svg viewBox="0 0 16 16">
//                           <polyline points="2,9 6,13 14,4" />
//                         </svg>
//                       </div>
//                       <div className="tpl-info">
//                         <div className="tpl-tag">{t.tag}</div>
//                         <div className="tpl-name">{t.name}</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//             )}

//             {/* PERSONAL */}
//             {step === "personal" && (
//               <div className="card">
//                 <div className="card-hd">
//                   <div>
//                     <div className="card-title">Your Profile</div>
//                     <div className="card-sub">
//                       Details displayed on your cover letter
//                     </div>
//                   </div>
//                 </div>
//                 <div className="g2">
//                   <Fld label="Full Name" icon="✏️" req>
//                     <input
//                       type="text"
//                       placeholder="Alexandra Chen"
//                       value={data.personal.fullName}
//                       onChange={(e) =>
//                         set(["personal", "fullName"], e.target.value)
//                       }
//                     />
//                   </Fld>
//                   <Fld label="Professional Title" icon="💼">
//                     <input
//                       type="text"
//                       placeholder="Senior Designer"
//                       value={data.personal.title}
//                       onChange={(e) =>
//                         set(["personal", "title"], e.target.value)
//                       }
//                     />
//                   </Fld>
//                 </div>
//                 <div className="g2">
//                   <Fld label="Email Address" icon="✉️" req>
//                     <input
//                       type="email"
//                       placeholder="alex@email.com"
//                       value={data.personal.email}
//                       onChange={(e) =>
//                         set(["personal", "email"], e.target.value)
//                       }
//                     />
//                   </Fld>
//                   <Fld label="Phone Number" icon="📞">
//                     <input
//                       type="tel"
//                       placeholder="+1 555 000 1234"
//                       value={data.personal.phone}
//                       onChange={(e) =>
//                         set(["personal", "phone"], e.target.value)
//                       }
//                     />
//                   </Fld>
//                 </div>
//                 <Fld label="Location" icon="📍">
//                   <input
//                     type="text"
//                     placeholder="San Francisco, CA"
//                     value={data.personal.location}
//                     onChange={(e) =>
//                       set(["personal", "location"], e.target.value)
//                     }
//                   />
//                 </Fld>
//                 <div className="hdiv" />
//                 <div className="sub-lbl">🔗 Online Presence</div>
//                 <Fld label="LinkedIn URL" icon="💼">
//                   <input
//                     type="text"
//                     placeholder="linkedin.com/in/alexchen"
//                     value={data.personal.linkedin}
//                     onChange={(e) =>
//                       set(["personal", "linkedin"], e.target.value)
//                     }
//                   />
//                 </Fld>
//                 <div className="g2">
//                   <Fld label="GitHub URL" icon="💻">
//                     <input
//                       type="text"
//                       placeholder="github.com/alexchen"
//                       value={data.personal.github}
//                       onChange={(e) =>
//                         set(["personal", "github"], e.target.value)
//                       }
//                     />
//                   </Fld>
//                   <Fld label="Portfolio / Website" icon="🌐">
//                     <input
//                       type="text"
//                       placeholder="alexchen.io"
//                       value={data.personal.website}
//                       onChange={(e) =>
//                         set(["personal", "website"], e.target.value)
//                       }
//                     />
//                   </Fld>
//                 </div>
//               </div>
//             )}

//             {/* COMPANY */}
//             {step === "company" && (
//               <div className="card">
//                 <div className="card-hd">
//                   <div className="card-ico">🏢</div>
//                   <div>
//                     <div className="card-title">Company & Role</div>
//                     <div className="card-sub">Application target details</div>
//                   </div>
//                 </div>
//                 <Fld label="Company Name" icon="🏢" req>
//                   <input
//                     type="text"
//                     placeholder="Google, Stripe, Airbnb…"
//                     value={data.company.name}
//                     onChange={(e) => set(["company", "name"], e.target.value)}
//                   />
//                 </Fld>
//                 <Fld label="Role Applying For" icon="🎯" req>
//                   <input
//                     type="text"
//                     placeholder="Senior UX Designer"
//                     value={data.company.jobTitle}
//                     onChange={(e) =>
//                       set(["company", "jobTitle"], e.target.value)
//                     }
//                   />
//                 </Fld>
//                 <div className="g2">
//                   <Fld label="Hiring Manager" icon="👤">
//                     <input
//                       type="text"
//                       placeholder="Sarah Johnson"
//                       value={data.company.hiringManager}
//                       onChange={(e) =>
//                         set(["company", "hiringManager"], e.target.value)
//                       }
//                     />
//                   </Fld>
//                   <Fld label="Their Title" icon="🏷️">
//                     <input
//                       type="text"
//                       placeholder="Head of Design"
//                       value={data.company.hiringManagerTitle}
//                       onChange={(e) =>
//                         set(["company", "hiringManagerTitle"], e.target.value)
//                       }
//                     />
//                   </Fld>
//                 </div>
//                 <div className="g2">
//                   <Fld label="City">
//                     <input
//                       className="bare"
//                       type="text"
//                       placeholder="Mountain View"
//                       value={data.company.city}
//                       onChange={(e) => set(["company", "city"], e.target.value)}
//                     />
//                   </Fld>
//                   <Fld label="State">
//                     <input
//                       className="bare"
//                       type="text"
//                       placeholder="CA"
//                       value={data.company.state}
//                       onChange={(e) =>
//                         set(["company", "state"], e.target.value)
//                       }
//                     />
//                   </Fld>
//                 </div>
//               </div>
//             )}

//             {/* CONTENT */}
//             {step === "content" && (
//               <div className="card">
//                 <div className="card-hd">
//                   <div className="card-ico">✍️</div>
//                   <div>
//                     <div className="card-title">Letter Sections</div>
//                     <div className="card-sub">
//                       Build your letter paragraph by paragraph
//                     </div>
//                   </div>
//                 </div>
//                 {data.sections.map((s, i) => (
//                   <div key={s.id} className="sec-block">
//                     <div className="sec-hd">
//                       <div className="sec-num">{i + 1}</div>
//                       <input
//                         className="sec-ti"
//                         value={s.title}
//                         onChange={(e) =>
//                           setSection(s.id, "title", e.target.value)
//                         }
//                         placeholder="Section title"
//                       />
//                       {data.sections.length > 1 && (
//                         <button
//                           className="sec-del"
//                           onClick={() =>
//                             setData((p) => ({
//                               ...p,
//                               sections: p.sections.filter((x) => x.id !== s.id),
//                             }))
//                           }
//                         >
//                           ✕
//                         </button>
//                       )}
//                     </div>
//                     <textarea
//                       className="sec-ta"
//                       rows={4}
//                       value={s.content}
//                       placeholder={s.placeholder}
//                       onChange={(e) =>
//                         setSection(s.id, "content", e.target.value)
//                       }
//                     />
//                   </div>
//                 ))}
//                 <button className="add-btn" onClick={addSection}>
//                   + Add Section
//                 </button>

//                 <div className="hdiv" />
//                 <div className="sub-lbl">🏆 Key Achievements</div>
//                 <div className="ach-row">
//                   <input
//                     className="ach-in"
//                     placeholder="e.g. Grew revenue by 40%"
//                     value={achIn}
//                     onChange={(e) => setAchIn(e.target.value)}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter" && achIn.trim()) {
//                         setData((p) => ({
//                           ...p,
//                           achievements: [...p.achievements, achIn.trim()],
//                         }));
//                         setAchIn("");
//                       }
//                     }}
//                   />
//                   <button
//                     className="ach-add"
//                     onClick={() => {
//                       if (achIn.trim()) {
//                         setData((p) => ({
//                           ...p,
//                           achievements: [...p.achievements, achIn.trim()],
//                         }));
//                         setAchIn("");
//                       }
//                     }}
//                   >
//                     Add
//                   </button>
//                 </div>
//                 {data.achievements.length > 0 && (
//                   <div className="ach-list">
//                     {data.achievements.map((a, i) => (
//                       <div key={i} className="ach-tag">
//                         ⭐ {a}
//                         <button
//                           className="ach-rm"
//                           onClick={() =>
//                             setData((p) => ({
//                               ...p,
//                               achievements: p.achievements.filter(
//                                 (_, j) => j !== i,
//                               ),
//                             }))
//                           }
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <div className="hdiv" />
//                 <div className="sub-lbl">📝 Additional Notes</div>
//                 <textarea
//                   className="sec-ta"
//                   rows={3}
//                   placeholder="Any extra context or postscript…"
//                   value={data.notes}
//                   onChange={(e) =>
//                     setData((p) => ({ ...p, notes: e.target.value }))
//                   }
//                 />
//               </div>
//             )}
//           </div>

//           {/* BOTTOM NAV */}
//           <div className="left-ft">
//             <button
//               className="btn-back"
//           //     disabled={stepIdx === 0}
//               onClick={() => stepIdx===0 ? router.push('/') :setStep(STEPS[stepIdx - 1].id)}
//             >
//               ← {stepIdx > 0 ? `Back to ${STEPS[stepIdx - 1].label}` : "Back to Home"}
//             </button>
//             {stepIdx < STEPS.length - 1 ? (
//               <button
//                 className="btn-next"
//                 onClick={() => setStep(STEPS[stepIdx + 1].id)}
//               >
//                 Continue to {STEPS[stepIdx + 1].label} →
//               </button>
//             ) : (
//               <button
//                 className="btn-next"
//                 onClick={downloadPDF}
//                 disabled={busy}
//               >
//                 {busy ? "⏳ Generating…" : "⬇ Download PDF"}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* RIGHT PREVIEW */}
//         <div className="right">
//           <div className="right-hd">
//             <div className="right-hd-l">
//               <div className="live-dot" />
//               <div>
//                 <div className="right-hd-info-title">Live Preview</div>
//                 <div className="right-hd-info-sub">Updates as you type</div>
//               </div>
//             </div>
//             <div className="right-hd-r">
//               <button
//                 className="change-tpl"
//                 onClick={() => setStep("template")}
//               >
//                 🎨 Change Template
//               </button>
//               <button
//                 className="btn btn-ghost btn-sm"
//                 onClick={() => {
//                   rebuild();
//                   setModal(true);
//                 }}
//               >
//                 ⛶ Expand
//               </button>
//             </div>
//           </div>
//           <div className="prev-scroll">
//             <div className="prev-wrap">
//               {html ? (
//                 <iframe
//                   ref={liveRef}
//                   className="prev-iframe"
//                   title="live"
//                   sandbox="allow-same-origin"
//                 />
//               ) : (
//                 <div className="prev-empty">
//                   <div className="prev-empty-icon">📄</div>
//                   <div style={{ fontWeight: 700, fontSize: 15 }}>
//                     Preview appears here
//                   </div>
//                   <div style={{ fontSize: 12 }}>Start filling your details</div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MOBILE PREVIEW BUTTON */}
//       <button
//         className="mob-prev-btn"
//         onClick={() => {
//           rebuild();
//           setMobilePreview(true);
//         }}
//       >
//         👁 Preview Letter
//       </button>

//       {/* FULLSCREEN / MOBILE MODAL */}
//       {(modal || mobilePreview) && (
//         <div
//           className="overlay"
//           onClick={() => {
//             setModal(false);
//             setMobilePreview(false);
//           }}
//         >
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-hd">
//               <div className="modal-hd-l">
//                 <div className="modal-ico">📄</div>
//                 <div>
//                   <div className="modal-title">
//                     {data.personal.fullName || "Cover Letter"}
//                   </div>
//                   <div className="modal-sub">
//                     {tpl.name} · {tpl.tag}
//                   </div>
//                 </div>
//               </div>
//               <button
//                 className="modal-close"
//                 onClick={() => {
//                   setModal(false);
//                   setMobilePreview(false);
//                 }}
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="modal-inner">
//                 <iframe
//                   ref={modalRef}
//                   className="modal-iframe"
//                   title="full-view"
//                   sandbox="allow-same-origin"
//                 />
//               </div>
//             </div>
//             <div className="modal-ft">
//               <button
//                 className="btn btn-ghost"
//                 onClick={() => {
//                   setModal(false);
//                   setMobilePreview(false);
//                 }}
//               >
//                 Close
//               </button>
//               <button
//                 className="btn btn-primary"
//                 onClick={downloadPDF}
//                 disabled={busy}
//               >
//                 {busy ? "⏳ Generating…" : "⬇ Download PDF"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {toast && <div className="toast">{toast}</div>}
//     </>
//   );
// }

// function Fld({
//   label,
//   icon,
//   req,
//   children,
// }: {
//   label: string;
//   icon?: string;
//   req?: boolean;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="fld">
//       <label className="fld-lbl">
//         {label}
//         {req && <span> *</span>}
//       </label>
//       <div className="iw">
//         {icon && <span className="iw-ic">{icon}</span>}
//         {children}
//       </div>
//     </div>
//   );
// }

// "use client";
// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   ReactNode,
// } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiZoomIn, FiZoomOut, FiRefreshCw } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// // ═══════════════════════════════════════════════════════════════
// // TYPES
// // ═══════════════════════════════════════════════════════════════
// interface PersonalInfo {
//   fullName: string;
//   title: string;
//   email: string;
//   phone: string;
//   location: string;
//   website: string;
//   linkedin: string;
//   github: string;
//   summary: string;
//   signature: string;
// }
// interface CompanyInfo {
//   name: string;
//   jobTitle: string;
//   hiringManager: string;
//   hiringManagerTitle: string;
//   city: string;
//   state: string;
//   jobSource: string;
//   referral: string;
// }
// interface Section {
//   id: string;
//   title: string;
//   content: string;
//   placeholder: string;
// }
// interface CLData {
//   personal: PersonalInfo;
//   company: CompanyInfo;
//   sections: Section[];
//   achievements: string[];
//   skills: string[];
//   tone: string;
//   notes: string;
//   signature: string;
// }

// const BLANK: CLData = {
//   personal: {
//     fullName: "",
//     title: "",
//     email: "",
//     phone: "",
//     location: "",
//     website: "",
//     linkedin: "",
//     github: "",
//     summary: "",
//     signature: "",
//   },
//   company: {
//     name: "",
//     jobTitle: "",
//     hiringManager: "",
//     hiringManagerTitle: "",
//     city: "",
//     state: "",
//     jobSource: "",
//     referral: "",
//   },
//   sections: [
//     {
//       id: "1",
//       title: "Opening Statement",
//       content: "",
//       placeholder:
//         "Express your enthusiasm for the role. Mention where you found it and a compelling hook about why you're perfect for it…",
//     },
//     {
//       id: "2",
//       title: "Experience & Skills",
//       content: "",
//       placeholder:
//         "Highlight 2–3 specific accomplishments with metrics. Show you can solve their exact problems…",
//     },
//     {
//       id: "3",
//       title: "Why This Company",
//       content: "",
//       placeholder:
//         "Demonstrate genuine research — reference their mission, recent news, products, or culture…",
//     },
//     {
//       id: "4",
//       title: "Closing",
//       content: "",
//       placeholder:
//         "Restate enthusiasm, include a clear call to action, mention your portfolio/work samples if applicable…",
//     },
//   ],
//   achievements: [],
//   skills: [],
//   tone: "professional",
//   notes: "",
//   signature: "",
// };

// // ═══════════════════════════════════════════════════════════════
// // CANVAS PREVIEW (from provided component, adapted)
// // ═══════════════════════════════════════════════════════════════
// function CanvasPreview({ children }: { children: ReactNode }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [scale, setScale] = useState(0.55);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const scaleRef = useRef(0.55);
//   const pointerDownPos = useRef<{ x: number; y: number } | null>(null);
//   const dragStarted = useRef(false);
//   const startPositionRef = useRef({ x: 0, y: 0 });
//   const zoomAnimRef = useRef<number | null>(null);

//   useEffect(() => {
//     const r = () => {
//       const w = window.innerWidth;
//       const s =
//         w < 480
//           ? 0.38
//           : w < 640
//             ? 0.48
//             : w < 768
//               ? 0.55
//               : w < 1024
//                 ? 0.62
//                 : w < 1280
//                   ? 0.68
//                   : 0.72;
//       setScale(s);
//       scaleRef.current = s;
//     };
//     r();
//     window.addEventListener("resize", r);
//     return () => window.removeEventListener("resize", r);
//   }, []);

//   useEffect(() => {
//     scaleRef.current = scale;
//   }, [scale]);

//   const smoothZoom = (target: number) => {
//     if (zoomAnimRef.current) cancelAnimationFrame(zoomAnimRef.current);
//     const from = scaleRef.current;
//     const start = performance.now();
//     const go = (now: number) => {
//       const p = Math.min((now - start) / 160, 1);
//       const e = 1 - Math.pow(1 - p, 3);
//       const v = from + (target - from) * e;
//       setScale(v);
//       scaleRef.current = v;
//       if (p < 1) zoomAnimRef.current = requestAnimationFrame(go);
//     };
//     zoomAnimRef.current = requestAnimationFrame(go);
//   };

//   const zoomIn = () => smoothZoom(Math.min(scaleRef.current + 0.1, 2.5));
//   const zoomOut = () => smoothZoom(Math.max(scaleRef.current - 0.1, 0.2));
//   const reset = () => {
//     const w = window.innerWidth;
//     smoothZoom(w < 640 ? 0.38 : 0.68);
//     setPosition({ x: 0, y: 0 });
//   };

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;
//     const skip = (t: EventTarget | null) => {
//       const tag = (t as HTMLElement)?.tagName;
//       return (
//         ["BUTTON", "INPUT", "A", "SELECT", "TEXTAREA"].includes(tag || "") ||
//         !!(t as HTMLElement)?.closest?.("[data-nodrag]")
//       );
//     };
//     const onDown = (e: MouseEvent) => {
//       if (skip(e.target)) return;
//       pointerDownPos.current = { x: e.clientX, y: e.clientY };
//       dragStarted.current = false;
//     };
//     const onMove = (e: MouseEvent) => {
//       if (!pointerDownPos.current) return;
//       const dx = e.clientX - pointerDownPos.current.x,
//         dy = e.clientY - pointerDownPos.current.y;
//       if (!dragStarted.current && Math.sqrt(dx * dx + dy * dy) > 5) {
//         dragStarted.current = true;
//         setIsDragging(true);
//         startPositionRef.current = {
//           x: pointerDownPos.current.x - position.x,
//           y: pointerDownPos.current.y - position.y,
//         };
//       }
//       if (dragStarted.current) {
//         e.preventDefault();
//         setPosition({
//           x: e.clientX - startPositionRef.current.x,
//           y: e.clientY - startPositionRef.current.y,
//         });
//       }
//     };
//     const onUp = () => {
//       pointerDownPos.current = null;
//       dragStarted.current = false;
//       setIsDragging(false);
//     };
//     const onWheel = (e: WheelEvent) => {
//       e.preventDefault();
//       if (e.ctrlKey || e.metaKey) {
//         const v = Math.max(
//           0.2,
//           Math.min(2.5, scaleRef.current * Math.exp(-e.deltaY * 0.002)),
//         );
//         setScale(v);
//         scaleRef.current = v;
//       } else {
//         setPosition((p) => ({
//           x: p.x - e.deltaX * 0.4,
//           y: p.y - e.deltaY * 0.4,
//         }));
//       }
//     };
//     el.addEventListener("mousedown", onDown);
//     el.addEventListener("mousemove", onMove);
//     el.addEventListener("mouseup", onUp);
//     el.addEventListener("mouseleave", onUp);
//     el.addEventListener("wheel", onWheel, { passive: false });
//     return () => {
//       el.removeEventListener("mousedown", onDown);
//       el.removeEventListener("mousemove", onMove);
//       el.removeEventListener("mouseup", onUp);
//       el.removeEventListener("mouseleave", onUp);
//       el.removeEventListener("wheel", onWheel);
//     };
//   }, [position]);

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "100%",
//         minHeight: 420,
//       }}
//     >
//       <div
//         ref={containerRef}
//         style={{
//           position: "absolute",
//           inset: 0,
//           overflow: "hidden",
//           background: "#f0effe",
//           borderRadius: 16,
//           cursor: isDragging ? "grabbing" : "grab",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             transformOrigin: "top left",
//             transform: `translate(${position.x}px,${position.y}px) scale(${scale})`,
//             userSelect: "none",
//             WebkitUserSelect: "none",
//           }}
//         >
//           {children}
//         </div>
//       </div>
//       {/* Zoom badge */}
//       <div
//         data-nodrag
//         style={{
//           position: "absolute",
//           top: 10,
//           left: 10,
//           background: "rgba(255,255,255,.92)",
//           backdropFilter: "blur(8px)",
//           borderRadius: 30,
//           padding: "4px 12px",
//           fontSize: 11,
//           fontWeight: 700,
//           color: "#5b38f0",
//           border: "1px solid #ddd6fe",
//           pointerEvents: "none",
//           zIndex: 20,
//         }}
//       >
//         {Math.round(scale * 100)}%
//       </div>
//       {/* Controls */}
//       <div
//         data-nodrag
//         style={{
//           position: "absolute",
//           bottom: 12,
//           right: 12,
//           display: "flex",
//           flexDirection: "column",
//           gap: 6,
//           zIndex: 20,
//         }}
//       >
//         {[
//           { fn: zoomIn, icon: <FiZoomIn />, tip: "Zoom In" },
//           { fn: zoomOut, icon: <FiZoomOut />, tip: "Zoom Out" },
//           { fn: reset, icon: <FiRefreshCw />, tip: "Reset" },
//         ].map((b, i) => (
//           <motion.button
//             key={i}
//             whileHover={{ scale: 1.08 }}
//             whileTap={{ scale: 0.94 }}
//             onClick={b.fn}
//             title={b.tip}
//             type="button"
//             style={{
//               width: 34,
//               height: 34,
//               borderRadius: 10,
//               border: "none",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: 15,
//               color: "white",
//               background:
//                 i < 2 ? "linear-gradient(135deg,#5b38f0,#7c3aed)" : "#374151",
//               boxShadow: "0 4px 12px rgba(91,56,240,.3)",
//             }}
//           >
//             {b.icon}
//           </motion.button>
//         ))}
//       </div>
//       {/* Hint */}
//       <div
//         data-nodrag
//         style={{
//           position: "absolute",
//           bottom: 12,
//           left: 10,
//           fontSize: 10,
//           color: "#a78bfa",
//           fontWeight: 600,
//           pointerEvents: "none",
//         }}
//       >
//         Drag · Scroll · Ctrl+Wheel
//       </div>
//     </div>
//   );
// }

// // ═══════════════════════════════════════════════════════════════
// // 16 TEMPLATE SVG THUMBNAILS
// // ═══════════════════════════════════════════════════════════════
// function TplThumb({ id }: { id: string }) {
//   const W = 220,
//     H = 155;
//   switch (id) {
//     /* 1 – AURORA */
//     case "aurora":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <rect width={W} height={H} fill="#fff" />
//           <rect width={W} height={50} fill="#4f46e5" />
//           <circle cx={200} cy={-5} r={50} fill="#6366f1" opacity=".5" />
//           <rect
//             x={13}
//             y={12}
//             width={85}
//             height={8}
//             rx={2}
//             fill="rgba(255,255,255,.92)"
//           />
//           <rect
//             x={13}
//             y={24}
//             width={52}
//             height={4}
//             rx={1.5}
//             fill="rgba(255,255,255,.62)"
//           />
//           {[0, 12, 24].map((o, i) => (
//             <rect
//               key={i}
//               x={13 + o * 3.5}
//               y={36}
//               width={28}
//               height={5}
//               rx={10}
//               fill="rgba(255,255,255,.2)"
//               stroke="rgba(255,255,255,.35)"
//               strokeWidth=".6"
//             />
//           ))}
//           <rect x={13} y={60} width={38} height={3} rx={1} fill="#9ca3af" />
//           {[68, 74, 80].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[130, 110, 120][i]}
//               height={2.5}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           {["#6366f1", "#6366f1"].map((c, i) => (
//             <g key={i}>
//               <rect
//                 x={13}
//                 y={88 + i * 28}
//                 width={44}
//                 height={3}
//                 rx={1}
//                 fill={c}
//               />
//               {[95, 100, 105, 116 + i * 0, 121 + i * 0].map((y2, j) =>
//                 i === 0 && j < 3 ? (
//                   <rect
//                     key={j}
//                     x={13}
//                     y={y2}
//                     width={[180, 165, 175][j]}
//                     height={2.5}
//                     rx={1}
//                     fill="#e5e7eb"
//                   />
//                 ) : null,
//               )}
//             </g>
//           ))}
//           {[95, 100, 105].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[180, 165, 175][i]}
//               height={2.5}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={13} y={116} width={44} height={3} rx={1} fill="#6366f1" />
//           {[123, 128].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[175, 120][i]}
//               height={2.5}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={13} y={140} width={32} height={3} rx={1} fill="#9ca3af" />
//           <rect x={13} y={147} width={55} height={3} rx={1} fill="#374151" />
//         </svg>
//       );

//     /* 2 – OBSIDIAN sidebar */
//     case "obsidian":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <rect width={W} height={H} fill="#fff" />
//           <rect width={62} height={H} fill="#1e1b4b" />
//           <rect
//             x={7}
//             y={13}
//             width={46}
//             height={7}
//             rx={1.5}
//             fill="rgba(233,213,255,.85)"
//           />
//           <rect
//             x={7}
//             y={24}
//             width={34}
//             height={3}
//             rx={1}
//             fill="rgba(165,180,252,.5)"
//           />
//           <rect
//             x={7}
//             y={35}
//             width={46}
//             height={0.8}
//             fill="rgba(165,180,252,.15)"
//           />
//           {[
//             [46, 20, "Email"],
//             [54, 20, "Phone"],
//             [62, 20, "Loc"],
//             [72, 20, ""],
//             [80, 20, ""],
//           ].map(([y, w, l], i) => (
//             <g key={i}>
//               <rect
//                 x={7}
//                 y={y as number}
//                 width={22}
//                 height={2}
//                 rx={1}
//                 fill="rgba(109,91,186,.7)"
//               />
//               <rect
//                 x={7}
//                 y={(y as number) + 6}
//                 width={46}
//                 height={2}
//                 rx={1}
//                 fill="rgba(196,181,253,.55)"
//               />
//             </g>
//           ))}
//           {[13, 20, 28, 36, 44, 55, 63, 71].map((y, i) => {
//             if (i > 4)
//               return (
//                 <rect
//                   key={i}
//                   x={72}
//                   y={y}
//                   width={[38, 22, 44, 32][i - 5] ?? 38}
//                   height={2.5}
//                   rx={1}
//                   fill={
//                     ["#7c3aed", "#e5e7eb", "#e5e7eb", "#e5e7eb"][i - 5] ?? ""
//                   }
//                 />
//               );
//             return null;
//           })}
//           <rect x={72} y={13} width={32} height={2.5} rx={1} fill="#9ca3af" />
//           {[20, 25].map((y, i) => (
//             <rect
//               key={i}
//               x={72}
//               y={y}
//               width={[130, 100][i]}
//               height={2.2}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={72} y={36} width={40} height={3} rx={1} fill="#7c3aed" />
//           {[43, 48, 53].map((y, i) => (
//             <rect
//               key={i}
//               x={72}
//               y={y}
//               width={[138, 125, 130][i]}
//               height={2.2}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={72} y={64} width={40} height={3} rx={1} fill="#7c3aed" />
//           {[71, 76, 81].map((y, i) => (
//             <rect
//               key={i}
//               x={72}
//               y={y}
//               width={[138, 112, 120][i]}
//               height={2.2}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={72} y={92} width={40} height={3} rx={1} fill="#7c3aed" />
//           {[99, 104].map((y, i) => (
//             <rect
//               key={i}
//               x={72}
//               y={y}
//               width={[138, 90][i]}
//               height={2.2}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={72} y={120} width={28} height={2} rx={1} fill="#9ca3af" />
//           <rect x={72} y={127} width={52} height={3} rx={1} fill="#374151" />
//         </svg>
//       );

//     /* 3 – NORDIC */
//     case "nordic":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <rect width={W} height={H} fill="#fff" />
//           <rect x={16} y={13} width={60} height={3} rx={1} fill="#c7d2fe" />
//           <rect x={16} y={20} width={115} height={10} rx={1.5} fill="#1e1b4b" />
//           <rect x={16} y={34} width={36} height={3} rx={1} fill="#4f46e5" />
//           <rect x={16} y={43} width={188} height={0.8} fill="#e0e7ff" />
//           {[50, 56, 62].map((x, i) => (
//             <rect
//               key={i}
//               x={16 + i * 60}
//               y={49}
//               width={55}
//               height={2}
//               rx={1}
//               fill="#9ca3af"
//             />
//           ))}
//           <rect x={16} y={61} width={32} height={2.5} rx={1} fill="#9ca3af" />
//           {[68, 73].map((y, i) => (
//             <rect
//               key={i}
//               x={16}
//               y={y}
//               width={[188, 160][i]}
//               height={2.2}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={16} y={83} width={42} height={3} rx={1} fill="#4338ca" />
//           {[90, 95, 100].map((y, i) => (
//             <rect
//               key={i}
//               x={16}
//               y={y}
//               width={[188, 160, 175][i]}
//               height={2.2}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={16} y={110} width={42} height={3} rx={1} fill="#4338ca" />
//           {[117, 122].map((y, i) => (
//             <rect
//               key={i}
//               x={16}
//               y={y}
//               width={[188, 110][i]}
//               height={2.2}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={16} y={137} width={28} height={2} rx={1} fill="#9ca3af" />
//           <rect x={16} y={144} width={52} height={3} rx={1} fill="#374151" />
//         </svg>
//       );

//     /* 4 – SLATE corporate */
//     case "slate":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <rect width={W} height={H} fill="#fff" />
//           <rect x={13} y={13} width={90} height={9} rx={1.5} fill="#0f172a" />
//           <rect x={13} y={26} width={55} height={3} rx={1} fill="#64748b" />
//           <rect x={135} y={13} width={72} height={2.5} rx={1} fill="#475569" />
//           {[19, 25, 31].map((y, i) => (
//             <rect
//               key={i}
//               x={135}
//               y={y}
//               width={[60, 70, 55][i]}
//               height={2}
//               rx={1}
//               fill="#94a3b8"
//             />
//           ))}
//           <rect x={13} y={38} width={192} height={1.8} fill="#0f172a" />
//           <rect
//             x={13}
//             y={44}
//             width={72}
//             height={5}
//             rx={2}
//             fill="#f1f5f9"
//             stroke="#e2e8f0"
//             strokeWidth=".5"
//           />
//           <rect x={15} y={46} width={48} height={1.5} rx={0.5} fill="#64748b" />
//           <rect x={13} y={56} width={32} height={2.5} rx={1} fill="#9ca3af" />
//           {[63, 68].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 155][i]}
//               height={2.2}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={13} y={77} width={2.5} height={28} rx={1} fill="#334155" />
//           {[77, 83, 88, 93].map((y, i) => (
//             <rect
//               key={i}
//               x={19}
//               y={y}
//               width={i === 0 ? 38 : [180, 155, 165][i - 1]}
//               height={2.2}
//               rx={1}
//               fill={i === 0 ? "#334155" : "#e5e7eb"}
//             />
//           ))}
//           <rect x={13} y={105} width={2.5} height={22} rx={1} fill="#334155" />
//           {[105, 111, 116].map((y, i) => (
//             <rect
//               key={i}
//               x={19}
//               y={y}
//               width={i === 0 ? 38 : [180, 130][i - 1]}
//               height={2.2}
//               rx={1}
//               fill={i === 0 ? "#334155" : "#e5e7eb"}
//             />
//           ))}
//           <rect x={13} y={132} width={28} height={2} rx={1} fill="#9ca3af" />
//           <rect x={13} y={139} width={52} height={3} rx={1} fill="#374151" />
//         </svg>
//       );

//     /* 5 – CRIMSON editorial */
//     case "crimson":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <rect width={W} height={H} fill="#fffbf5" />
//           <rect width={W} height={4.5} fill="#9f1239" />
//           <text
//             x={110}
//             y={25}
//             textAnchor="middle"
//             fontSize={11}
//             fontWeight="800"
//             fill="#1a0a0d"
//             fontFamily="Georgia,serif"
//           >
//             Alex Johnson
//           </text>
//           <text
//             x={110}
//             y={34}
//             textAnchor="middle"
//             fontSize={5.5}
//             fill="#9f1239"
//             fontFamily="Georgia,serif"
//             fontStyle="italic"
//           >
//             Senior Product Manager
//           </text>
//           <text
//             x={110}
//             y={41}
//             textAnchor="middle"
//             fontSize={10}
//             fill="#9f1239"
//             letterSpacing={4}
//           >
//             ✦ ✦ ✦
//           </text>
//           {[46, 51, 56].map((y, i) => (
//             <rect
//               key={i}
//               x={[14, 80, 145][i]}
//               y={y}
//               width={[60, 60, 55][i]}
//               height={2}
//               rx={1}
//               fill="#9ca3af"
//             />
//           ))}
//           <rect x={13} y={64} width={188} height={0.7} fill="#fce7ef" />
//           <rect x={13} y={70} width={32} height={2} rx={1} fill="#9ca3af" />
//           {[77, 82].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 155][i]}
//               height={2.2}
//               rx={1}
//               fill="#6b7280"
//             />
//           ))}
//           <rect x={13} y={91} width={40} height={3} rx={1} fill="#9f1239" />
//           {[98, 103, 108].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 170, 175][i]}
//               height={2.2}
//               rx={1}
//               fill="#6b7280"
//             />
//           ))}
//           <rect x={13} y={117} width={40} height={3} rx={1} fill="#9f1239" />
//           {[124, 129].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 140][i]}
//               height={2.2}
//               rx={1}
//               fill="#6b7280"
//             />
//           ))}
//           <rect x={13} y={142} width={30} height={2} rx={1} fill="#9ca3af" />
//           <rect x={13} y={149} width={52} height={3} rx={1} fill="#374151" />
//         </svg>
//       );

//     /* 6 – VELVET dark */
//     case "velvet":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <defs>
//             <linearGradient id="vg" x1="0" y1="0" x2="1" y2="1">
//               <stop offset="0%" stopColor="#1e0f40" />
//               <stop offset="100%" stopColor="#2d1b69" />
//             </linearGradient>
//           </defs>
//           <rect width={W} height={H} fill="url(#vg)" />
//           <circle cx={195} cy={15} r={60} fill="rgba(168,85,247,.1)" />
//           <rect x={13} y={14} width={80} height={9} rx={1.5} fill="#f3e8ff" />
//           <rect x={13} y={27} width={50} height={2.5} rx={1} fill="#a78bfa" />
//           <rect
//             x={13}
//             y={38}
//             width={188}
//             height={0.6}
//             fill="rgba(196,181,253,.12)"
//           />
//           {[44, 51, 58].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[50, 45, 55][i]}
//               height={4}
//               rx={2}
//               fill="rgba(196,181,253,.1)"
//               stroke="rgba(196,181,253,.22)"
//               strokeWidth=".6"
//             />
//           ))}
//           <rect x={13} y={68} width={32} height={2} rx={1} fill="#7c6fa0" />
//           {[75, 80].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 155][i]}
//               height={2.2}
//               rx={1}
//               fill="rgba(212,201,239,.45)"
//             />
//           ))}
//           <rect x={13} y={89} width={38} height={2.5} rx={1} fill="#c084fc" />
//           {[96, 101, 106].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 170, 155][i]}
//               height={2.2}
//               rx={1}
//               fill="rgba(212,201,239,.38)"
//             />
//           ))}
//           <rect x={13} y={115} width={38} height={2.5} rx={1} fill="#c084fc" />
//           {[122, 127].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 120][i]}
//               height={2.2}
//               rx={1}
//               fill="rgba(212,201,239,.38)"
//             />
//           ))}
//           <rect x={13} y={140} width={28} height={2} rx={1} fill="#7c6fa0" />
//           <rect x={13} y={147} width={52} height={3} rx={1} fill="#f3e8ff" />
//         </svg>
//       );

//     /* 7 – FROST glass */
//     case "frost":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <defs>
//             <linearGradient id="fg" x1="0" y1="0" x2="1" y2="1">
//               <stop offset="0%" stopColor="#dbeafe" />
//               <stop offset="100%" stopColor="#e0f2fe" />
//             </linearGradient>
//           </defs>
//           <rect width={W} height={H} fill="url(#fg)" />
//           <rect
//             x={5}
//             y={5}
//             width={210}
//             height={145}
//             rx={10}
//             fill="rgba(255,255,255,.82)"
//           />
//           <rect
//             x={5}
//             y={5}
//             width={210}
//             height={48}
//             rx={10}
//             fill="rgba(12,74,110,.9)"
//           />
//           <rect
//             x={5}
//             y={29}
//             width={210}
//             height={24}
//             fill="rgba(12,74,110,.9)"
//           />
//           <rect x={17} y={14} width={80} height={8} rx={1.5} fill="white" />
//           <rect
//             x={17}
//             y={26}
//             width={48}
//             height={3}
//             rx={1}
//             fill="rgba(255,255,255,.65)"
//           />
//           {[0, 32, 64].map((ox, i) => (
//             <rect
//               key={i}
//               x={17 + ox}
//               y={37}
//               width={28}
//               height={4}
//               rx={10}
//               fill="rgba(255,255,255,.16)"
//               stroke="rgba(255,255,255,.28)"
//               strokeWidth=".5"
//             />
//           ))}
//           <rect x={17} y={60} width={35} height={2.5} rx={1} fill="#9ca3af" />
//           {[67, 72].map((y, i) => (
//             <rect
//               key={i}
//               x={17}
//               y={y}
//               width={[185, 155][i]}
//               height={2.2}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={17} y={82} width={42} height={3} rx={1} fill="#0369a1" />
//           {[89, 94, 99].map((y, i) => (
//             <rect
//               key={i}
//               x={17}
//               y={y}
//               width={[185, 170, 175][i]}
//               height={2.2}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={17} y={109} width={42} height={3} rx={1} fill="#0369a1" />
//           {[116, 121].map((y, i) => (
//             <rect
//               key={i}
//               x={17}
//               y={y}
//               width={[185, 130][i]}
//               height={2.2}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={17} y={134} width={28} height={2} rx={1} fill="#9ca3af" />
//           <rect x={17} y={141} width={52} height={3} rx={1} fill="#374151" />
//         </svg>
//       );

//     /* 8 – CANVAS (white clean) */
//     case "canvas":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <rect width={W} height={H} fill="#fff" />
//           <rect x={13} y={13} width={4} height={55} rx={2} fill="#6366f1" />
//           <rect x={22} y={13} width={90} height={10} rx={2} fill="#111827" />
//           <rect x={22} y={27} width={55} height={4} rx={1.5} fill="#6b7280" />
//           {[35, 41, 47].map((y, i) => (
//             <rect
//               key={i}
//               x={22}
//               y={y}
//               width={[68, 55, 72][i]}
//               height={3}
//               rx={1}
//               fill="#9ca3af"
//             />
//           ))}
//           <rect x={13} y={74} width={188} height={1} fill="#f3f4f6" />
//           <rect x={13} y={80} width={32} height={2.5} rx={1} fill="#9ca3af" />
//           {[87, 92].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 155][i]}
//               height={2.2}
//               rx={1}
//               fill="#f3f4f6"
//             />
//           ))}
//           <rect x={13} y={101} width={44} height={3} rx={1} fill="#6366f1" />
//           {[108, 113, 118].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 170, 175][i]}
//               height={2.2}
//               rx={1}
//               fill="#f3f4f6"
//             />
//           ))}
//           <rect x={13} y={127} width={44} height={3} rx={1} fill="#6366f1" />
//           {[134, 139].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 120][i]}
//               height={2.2}
//               rx={1}
//               fill="#f3f4f6"
//             />
//           ))}
//         </svg>
//       );

//     /* 9 – DESIGNER (creative sidebar) */
//     case "designer":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <rect width={W} height={H} fill="#faf5ff" />
//           <rect width={70} height={H} fill="#0d0d0d" />
//           <rect x={0} y={0} width={70} height={H} fill="url(#dg)" />
//           <defs>
//             <linearGradient id="dg" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stopColor="#0d0d0d" />
//               <stop offset="100%" stopColor="#1a0a2e" />
//             </linearGradient>
//           </defs>
//           <rect x={8} y={14} width={52} height={8} rx={1.5} fill="white" />
//           <rect
//             x={8}
//             y={26}
//             width={36}
//             height={2.5}
//             rx={1}
//             fill="rgba(167,139,250,.7)"
//           />
//           <circle
//             cx={21}
//             cy={45}
//             r={12}
//             fill="rgba(139,92,246,.2)"
//             stroke="rgba(139,92,246,.4)"
//             strokeWidth="1"
//           />
//           <text x={21} y={49} textAnchor="middle" fontSize={10} fill="#a78bfa">
//             ✦
//           </text>
//           <rect
//             x={8}
//             y={62}
//             width={52}
//             height={0.8}
//             fill="rgba(167,139,250,.2)"
//           />
//           {[68, 76, 84, 92, 100].map((y, i) => (
//             <rect
//               key={i}
//               x={8}
//               y={y}
//               width={52}
//               height={2.5}
//               rx={1}
//               fill="rgba(196,181,253,.5)"
//             />
//           ))}
//           {[85, 93, 101, 109, 117, 125].map((y, i) => (
//             <rect
//               key={i}
//               x={80}
//               y={y}
//               width={[130, 120, 115, 125, 110, 90][i]}
//               height={2.2}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={80} y={74} width={50} height={3} rx={1} fill="#7c3aed" />
//           <rect x={80} y={13} width={75} height={9} rx={1.5} fill="#111827" />
//           <rect x={80} y={26} width={48} height={2.5} rx={1} fill="#6b7280" />
//         </svg>
//       );

//     /* 10 – EDITOR (video editor dark) */
//     case "editor":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <rect width={W} height={H} fill="#0a0a0f" />
//           <rect width={W} height={H} fill="#0f0a1e" />
//           <rect x={13} y={13} width={92} height={10} rx={1.5} fill="white" />
//           <rect x={13} y={27} width={55} height={3} rx={1} fill="#f43f5e" />
//           <rect
//             x={13}
//             y={35}
//             width={188}
//             height={1}
//             fill="rgba(244,63,94,.2)"
//           />
//           {[41, 47, 53].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[60, 55, 70][i]}
//               height={4}
//               rx={2}
//               fill="rgba(244,63,94,.1)"
//               stroke="rgba(244,63,94,.3)"
//               strokeWidth=".6"
//             />
//           ))}
//           <rect x={13} y={63} width={32} height={2} rx={1} fill="#64748b" />
//           {[70, 75].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 150][i]}
//               height={2.2}
//               rx={1}
//               fill="rgba(148,163,184,.35)"
//             />
//           ))}
//           <rect x={13} y={84} width={2} height={2.5} rx={0.5} fill="#f43f5e" />
//           <rect x={19} y={84} width={38} height={2.5} rx={1} fill="#f43f5e" />
//           {[91, 96, 101].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 170, 155][i]}
//               height={2.2}
//               rx={1}
//               fill="rgba(148,163,184,.3)"
//             />
//           ))}
//           <rect x={13} y={110} width={2} height={2.5} rx={0.5} fill="#f43f5e" />
//           <rect x={19} y={110} width={38} height={2.5} rx={1} fill="#f43f5e" />
//           {[117, 122].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 120][i]}
//               height={2.2}
//               rx={1}
//               fill="rgba(148,163,184,.3)"
//             />
//           ))}
//           <rect x={13} y={135} width={28} height={2} rx={1} fill="#64748b" />
//           <rect x={13} y={142} width={52} height={3} rx={1} fill="white" />
//         </svg>
//       );

//     /* 11 – PEARL (pure white) */
//     case "pearl":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <rect width={W} height={H} fill="#fff" />
//           <rect x={13} y={13} width={95} height={10} rx={1.5} fill="#111827" />
//           <rect x={13} y={27} width={58} height={3.5} rx={1} fill="#6366f1" />
//           <rect x={13} y={36} width={188} height={0.6} fill="#e5e7eb" />
//           {[42, 48].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[60, 52][i]}
//               height={2}
//               rx={1}
//               fill="#9ca3af"
//             />
//           ))}
//           <rect x={90} y={42} width={55} height={2} rx={1} fill="#9ca3af" />
//           <rect x={152} y={42} width={50} height={2} rx={1} fill="#9ca3af" />
//           <rect x={13} y={58} width={188} height={0.6} fill="#e5e7eb" />
//           <rect x={13} y={64} width={32} height={2} rx={1} fill="#9ca3af" />
//           {[71, 76].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 155][i]}
//               height={2.2}
//               rx={1}
//               fill="#f3f4f6"
//             />
//           ))}
//           <rect x={13} y={86} width={42} height={3} rx={1} fill="#6366f1" />
//           {[93, 98, 103].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 170, 175][i]}
//               height={2.2}
//               rx={1}
//               fill="#f3f4f6"
//             />
//           ))}
//           <rect x={13} y={113} width={42} height={3} rx={1} fill="#6366f1" />
//           {[120, 125].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 120][i]}
//               height={2.2}
//               rx={1}
//               fill="#f3f4f6"
//             />
//           ))}
//           <rect x={13} y={138} width={28} height={2} rx={1} fill="#9ca3af" />
//           <rect x={13} y={145} width={52} height={3} rx={1} fill="#374151" />
//         </svg>
//       );

//     /* 12 – PRISM creative */
//     case "prism":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <rect width={W} height={H} fill="#fff" />
//           <rect width={W} height={52} fill="#7c3aed" />
//           <polygon points="120,0 220,0 220,52" fill="rgba(255,255,255,.12)" />
//           <polygon points="155,0 220,0 220,52" fill="rgba(255,255,255,.08)" />
//           <rect x={13} y={12} width={82} height={9} rx={1.5} fill="white" />
//           <rect
//             x={13}
//             y={25}
//             width={50}
//             height={3.5}
//             rx={1}
//             fill="rgba(255,255,255,.68)"
//           />
//           <rect x={0} y={52} width={W} height={11} fill="#1e1b4b" />
//           {[0, 42, 88].map((ox, i) => (
//             <rect
//               key={i}
//               x={13 + ox}
//               y={56}
//               width={38}
//               height={2}
//               rx={1}
//               fill="#a5b4fc"
//             />
//           ))}
//           <rect x={13} y={74} width={32} height={2.5} rx={1} fill="#9ca3af" />
//           {[81, 86].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 162][i]}
//               height={2.2}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={13} y={95} width={2.5} height={24} rx={1} fill="#7c3aed" />
//           {[95, 101, 106, 111].map((y, i) => (
//             <rect
//               key={i}
//               x={19}
//               y={y}
//               width={i === 0 ? 38 : [182, 155, 165][i - 1]}
//               height={2.2}
//               rx={1}
//               fill={i === 0 ? "#7c3aed" : "#e5e7eb"}
//             />
//           ))}
//           <rect x={13} y={120} width={2.5} height={20} rx={1} fill="#7c3aed" />
//           {[120, 126, 131].map((y, i) => (
//             <rect
//               key={i}
//               x={19}
//               y={y}
//               width={i === 0 ? 38 : [182, 100][i - 1]}
//               height={2.2}
//               rx={1}
//               fill={i === 0 ? "#7c3aed" : "#e5e7eb"}
//             />
//           ))}
//           <rect x={13} y={146} width={52} height={3} rx={1} fill="#374151" />
//         </svg>
//       );

//     /* 13 – IVORY warm white */
//     case "ivory":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <rect width={W} height={H} fill="#fefce8" />
//           <rect x={13} y={13} width={5} height={130} rx={2.5} fill="#ca8a04" />
//           <rect x={24} y={13} width={88} height={10} rx={2} fill="#1c1917" />
//           <rect x={24} y={27} width={54} height={3.5} rx={1.5} fill="#78350f" />
//           <rect x={24} y={36} width={188} height={0.8} fill="#fde68a" />
//           {[42, 48, 54].map((y, i) => (
//             <rect
//               key={i}
//               x={24}
//               y={y}
//               width={[60, 52, 72][i]}
//               height={2}
//               rx={1}
//               fill="#92400e"
//             />
//           ))}
//           <rect x={24} y={63} width={32} height={2.5} rx={1} fill="#9ca3af" />
//           {[70, 75].map((y, i) => (
//             <rect
//               key={i}
//               x={24}
//               y={y}
//               width={[178, 148][i]}
//               height={2.2}
//               rx={1}
//               fill="#e7e5e4"
//             />
//           ))}
//           <rect x={24} y={84} width={42} height={3} rx={1} fill="#b45309" />
//           {[91, 96, 101].map((y, i) => (
//             <rect
//               key={i}
//               x={24}
//               y={y}
//               width={[178, 165, 170][i]}
//               height={2.2}
//               rx={1}
//               fill="#e7e5e4"
//             />
//           ))}
//           <rect x={24} y={111} width={42} height={3} rx={1} fill="#b45309" />
//           {[118, 123].map((y, i) => (
//             <rect
//               key={i}
//               x={24}
//               y={y}
//               width={[178, 112][i]}
//               height={2.2}
//               rx={1}
//               fill="#e7e5e4"
//             />
//           ))}
//           <rect x={24} y={138} width={28} height={2} rx={1} fill="#9ca3af" />
//           <rect x={24} y={145} width={52} height={3} rx={1} fill="#1c1917" />
//         </svg>
//       );

//     /* 14 – MOTION (video/creative bold) */
//     case "motion":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <defs>
//             <linearGradient id="mg" x1="0" y1="0" x2="1" y2="0">
//               <stop offset="0%" stopColor="#ec4899" />
//               <stop offset="100%" stopColor="#f59e0b" />
//             </linearGradient>
//           </defs>
//           <rect width={W} height={H} fill="#fff" />
//           <rect width={W} height={6} fill="url(#mg)" />
//           <rect x={13} y={14} width={92} height={11} rx={1.5} fill="#111827" />
//           <rect x={13} y={29} width={60} height={3.5} rx={1} fill="#ec4899" />
//           <rect x={13} y={38} width={188} height={0.6} fill="#fce7f3" />
//           {[44, 50, 56].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[55, 48, 64][i]}
//               height={4}
//               rx={10}
//               fill="rgba(236,72,153,.12)"
//               stroke="rgba(236,72,153,.3)"
//               strokeWidth=".7"
//             />
//           ))}
//           <rect x={13} y={66} width={32} height={2.5} rx={1} fill="#9ca3af" />
//           {[73, 78].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 155][i]}
//               height={2.2}
//               rx={1}
//               fill="#f3f4f6"
//             />
//           ))}
//           <rect x={13} y={87} width={44} height={3} rx={1} fill="#ec4899" />
//           {[94, 99, 104].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 170, 175][i]}
//               height={2.2}
//               rx={1}
//               fill="#f3f4f6"
//             />
//           ))}
//           <rect x={13} y={114} width={44} height={3} rx={1} fill="#ec4899" />
//           {[121, 126].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 120][i]}
//               height={2.2}
//               rx={1}
//               fill="#f3f4f6"
//             />
//           ))}
//           <rect width={W} height={3} y={152} fill="url(#mg)" />
//         </svg>
//       );

//     /* 15 – ARCHITECT (structured) */
//     case "architect":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <rect width={W} height={H} fill="#f8fafc" />
//           <rect x={13} y={13} width={80} height={10} rx={1.5} fill="#0f172a" />
//           <rect x={13} y={27} width={50} height={3} rx={1} fill="#334155" />
//           <rect x={110} y={13} width={98} height={40} rx={4} fill="#0f172a" />
//           {[18, 24, 30, 36, 40].map((y, i) => (
//             <rect
//               key={i}
//               x={116}
//               y={y}
//               width={[60, 50, 70, 45, 55][i]}
//               height={2}
//               rx={1}
//               fill="rgba(255,255,255,.6)"
//             />
//           ))}
//           <rect x={13} y={53} width={192} height={1.2} fill="#e2e8f0" />
//           <rect x={13} y={59} width={32} height={2.5} rx={1} fill="#9ca3af" />
//           {[66, 71].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 155][i]}
//               height={2.2}
//               rx={1}
//               fill="#e2e8f0"
//             />
//           ))}
//           <rect x={13} y={81} width={44} height={3} rx={1} fill="#0f172a" />
//           {[88, 93, 98].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 170, 175][i]}
//               height={2.2}
//               rx={1}
//               fill="#e2e8f0"
//             />
//           ))}
//           <rect x={13} y={108} width={44} height={3} rx={1} fill="#0f172a" />
//           {[115, 120].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 120][i]}
//               height={2.2}
//               rx={1}
//               fill="#e2e8f0"
//             />
//           ))}
//           <rect x={13} y={135} width={28} height={2} rx={1} fill="#9ca3af" />
//           <rect x={13} y={142} width={52} height={3} rx={1} fill="#374151" />
//         </svg>
//       );

//     /* 16 – SERIF (classic) */
//     case "serif":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <rect width={W} height={H} fill="#fff" />
//           <rect x={13} y={13} width={192} height={0.8} fill="#1e293b" />
//           <text
//             x={110}
//             y={30}
//             textAnchor="middle"
//             fontSize={13}
//             fontWeight="800"
//             fill="#1e293b"
//             fontFamily="Georgia,serif"
//           >
//             Alexander Johnson
//           </text>
//           <text
//             x={110}
//             y={40}
//             textAnchor="middle"
//             fontSize={6}
//             fill="#64748b"
//             fontFamily="Georgia,serif"
//           >
//             Senior Product Designer · UX Strategist
//           </text>
//           <rect x={13} y={45} width={192} height={0.8} fill="#1e293b" />
//           {[50, 55, 60].map((y, i) => (
//             <rect
//               key={i}
//               x={[13, 80, 148][i]}
//               y={y}
//               width={[60, 62, 52][i]}
//               height={2}
//               rx={1}
//               fill="#6366f1"
//             />
//           ))}
//           <rect x={13} y={67} width={192} height={0.5} fill="#e5e7eb" />
//           <rect x={13} y={73} width={32} height={2.5} rx={1} fill="#9ca3af" />
//           {[80, 85].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 155][i]}
//               height={2.2}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={13} y={95} width={42} height={3} rx={1} fill="#4338ca" />
//           {[102, 107, 112].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 170, 175][i]}
//               height={2.2}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={13} y={122} width={42} height={3} rx={1} fill="#4338ca" />
//           {[129, 134].map((y, i) => (
//             <rect
//               key={i}
//               x={13}
//               y={y}
//               width={[188, 120][i]}
//               height={2.2}
//               rx={1}
//               fill="#e5e7eb"
//             />
//           ))}
//           <rect x={13} y={149} width={192} height={0.8} fill="#e5e7eb" />
//         </svg>
//       );

//     default:
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <rect width={W} height={H} fill="#f3f4f6" />
//         </svg>
//       );
//   }
// }

// // ═══════════════════════════════════════════════════════════════
// // TEMPLATES LIST
// // ═══════════════════════════════════════════════════════════════
// const TEMPLATES = [
//   { id: "aurora", name: "Aurora", tag: "Modern", accent: "#6366f1" },
//   { id: "obsidian", name: "Obsidian", tag: "Executive", accent: "#7c3aed" },
//   { id: "nordic", name: "Nordic", tag: "Minimal", accent: "#4338ca" },
//   { id: "slate", name: "Slate", tag: "Corporate", accent: "#1e293b" },
//   { id: "crimson", name: "Crimson", tag: "Editorial", accent: "#9f1239" },
//   { id: "velvet", name: "Velvet", tag: "Luxury", accent: "#6d28d9" },
//   { id: "frost", name: "Frost", tag: "Clean", accent: "#0369a1" },
//   { id: "canvas", name: "Canvas", tag: "Minimal", accent: "#6366f1" },
//   { id: "designer", name: "Designer", tag: "Creative", accent: "#7c3aed" },
//   { id: "editor", name: "Director", tag: "Video", accent: "#f43f5e" },
//   { id: "pearl", name: "Pearl", tag: "White", accent: "#6366f1" },
//   { id: "prism", name: "Prism", tag: "Creative", accent: "#7c3aed" },
//   { id: "ivory", name: "Ivory", tag: "Classic", accent: "#b45309" },
//   { id: "motion", name: "Motion", tag: "Video", accent: "#ec4899" },
//   { id: "architect", name: "Architect", tag: "Corporate", accent: "#0f172a" },
//   { id: "serif", name: "Serif", tag: "Classic", accent: "#4338ca" },
// ];

// // ═══════════════════════════════════════════════════════════════
// // FULL HTML BUILDER
// // ═══════════════════════════════════════════════════════════════
// function buildHTML(id: string, d: CLData): string {
//   const dt = new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
//   const nm = d.personal.fullName || "Your Name";
//   const ttl = d.personal.title || "Professional";
//   const mgr = d.company.hiringManager || "Hiring Manager";
//   const loc = [d.company.city, d.company.state].filter(Boolean).join(", ");

//   const links = [
//     d.personal.email &&
//       `<a href="mailto:${d.personal.email}"   style="color:inherit;text-decoration:none">${d.personal.email}</a>`,
//     d.personal.phone &&
//       `<a href="tel:${d.personal.phone}"       style="color:inherit;text-decoration:none">${d.personal.phone}</a>`,
//     d.personal.location && `<span>${d.personal.location}</span>`,
//     d.personal.linkedin &&
//       `<a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank" style="color:inherit;text-decoration:none">${d.personal.linkedin}</a>`,
//     d.personal.github &&
//       `<a href="https://${d.personal.github.replace(/^https?:\/\//, "")}"   target="_blank" style="color:inherit;text-decoration:none">${d.personal.github}</a>`,
//     d.personal.website &&
//       `<a href="https://${d.personal.website.replace(/^https?:\/\//, "")}"  target="_blank" style="color:inherit;text-decoration:none">${d.personal.website}</a>`,
//   ].filter(Boolean) as string[];

//   const addrBlock = `<div style="margin-bottom:20px;font-size:13px;line-height:2;color:#4a5568"><strong style="color:#1a202c">${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>${d.company.name}${loc ? `<br>${loc}` : ""}</div>`;

//   const secRows = (color: string, border = false) =>
//     d.sections
//       .filter((s) => s.content.trim())
//       .map(
//         (s) => `
//       <div style="margin-bottom:24px${border ? `;padding-left:14px;border-left:3px solid ${color}` : ""}">
//         <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${color};margin:0 0 8px">${s.title}</h4>
//         <p style="line-height:1.85;margin:0;font-size:13.5px">${s.content.replace(/\n/g, "<br>")}</p>
//       </div>`,
//       )
//       .join("");

//   const achBlock = (color: string) =>
//     d.achievements.length
//       ? `
//     <div style="margin:18px 0 22px">
//       <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${color};margin:0 0 10px">Key Achievements</h4>
//       ${d.achievements.map((a) => `<div style="display:flex;gap:9px;margin-bottom:7px;font-size:13px"><span style="color:${color};flex-shrink:0;font-size:14px;line-height:1.4">›</span>${a}</div>`).join("")}
//     </div>`
//       : "";

//   const skillBlock = (color: string) =>
//     d.skills.length
//       ? `
//     <div style="margin:16px 0 22px">
//       <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${color};margin:0 0 10px">Core Skills</h4>
//       <div style="display:flex;flex-wrap:wrap;gap:7px">${d.skills.map((s) => `<span style="padding:4px 12px;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.08);border-radius:30px;font-size:12px">${s}</span>`).join("")}</div>
//     </div>`
//       : "";

//   const notesBlock = d.notes
//     ? `<div style="margin:14px 0;padding:12px 16px;background:rgba(0,0,0,.03);border-left:3px solid #e2e8f0;font-size:12.5px;line-height:1.7;color:#64748b">${d.notes}</div>`
//     : "";

//   const closing = (col: string, style = "") => `
//     <div style="margin-top:36px;font-size:13.5px${style}">
//       ${d.personal.signature || "Sincerely"},<br><br>
//       <strong style="font-size:15px">${nm}</strong>
//       ${d.personal.email ? `<br><a href="mailto:${d.personal.email}" style="font-size:12px;color:${col};text-decoration:none">${d.personal.email}</a>` : ""}
//       ${d.personal.linkedin ? `<br><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" style="font-size:11.5px;color:#64748b;text-decoration:none" target="_blank">${d.personal.linkedin}</a>` : ""}
//       ${d.personal.website ? `<br><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}"  style="font-size:11.5px;color:#64748b;text-decoration:none" target="_blank">${d.personal.website}</a>` : ""}
//     </div>`;

//   const greet = `<div style="font-size:16px;font-weight:600;margin-bottom:22px;color:#111827">Dear ${mgr},</div>`;

//   const base = (css: string, body: string) =>
//     `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box}body{-webkit-print-color-adjust:exact;print-color-adjust:exact}${css}</style></head><body>${body}</body></html>`;

//   // ── AURORA ──
//   if (id === "aurora")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
//     body{font-family:'DM Sans',sans-serif;color:#374151}.pg{max-width:860px;margin:0 auto}
//     .hdr{background:linear-gradient(135deg,#4f46e5,#7c3aed 60%,#a78bfa);padding:52px 56px 44px;color:white;position:relative;overflow:hidden}
//     .hdr::before{content:'';position:absolute;right:-80px;top:-80px;width:280px;height:280px;background:rgba(255,255,255,.07);border-radius:50%}
//     .nm{font-size:38px;font-weight:700;letter-spacing:-1.5px;margin-bottom:5px;position:relative}
//     .rl{font-size:14px;opacity:.85;margin-bottom:26px;position:relative}
//     .chips{display:flex;flex-wrap:wrap;gap:7px;position:relative}
//     .chip{padding:5px 14px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:40px;font-size:11.5px}
//     .chip a{color:white;text-decoration:none}.body{padding:48px 56px}
//     .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
//       `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
//     <div class="chips">${links.map((l) => `<span class="chip">${l}</span>`).join("")}</div></div>
//     <div class="body"><div class="dt">${dt}</div>${addrBlock}${greet}${secRows("#6366f1")}${achBlock("#6366f1")}${skillBlock("#6366f1")}${notesBlock}${closing("#6366f1")}</div></div>`,
//     );

//   // ── OBSIDIAN ──
//   if (id === "obsidian")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@300;400;500&display=swap');
//     body{font-family:'Inter',sans-serif;color:#374151}.pg{max-width:900px;margin:0 auto;display:flex;min-height:100vh}
//     .side{width:260px;background:#1e1b4b;color:white;padding:44px 26px;flex-shrink:0}
//     .snm{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;color:#e9d5ff;line-height:1.2;margin-bottom:6px}
//     .srl{font-size:10px;color:#a5b4fc;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:30px;padding-bottom:26px;border-bottom:1px solid rgba(165,180,252,.2)}
//     .slbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#6d5bba;margin-bottom:6px;margin-top:20px}
//     .sval{font-size:11.5px;color:#c4b5fd;line-height:1.9;word-break:break-all}
//     .sval a{color:#c4b5fd;text-decoration:none}.main{flex:1;padding:48px 44px}
//     .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
//       `<div class="pg"><div class="side"><div class="snm">${nm}</div><div class="srl">${ttl}</div>
//     ${d.personal.email ? `<div class="slbl">Email</div><div class="sval"><a href="mailto:${d.personal.email}">${d.personal.email}</a></div>` : ""}
//     ${d.personal.phone ? `<div class="slbl">Phone</div><div class="sval"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></div>` : ""}
//     ${d.personal.location ? `<div class="slbl">Location</div><div class="sval">${d.personal.location}</div>` : ""}
//     ${d.personal.linkedin ? `<div class="slbl">LinkedIn</div><div class="sval"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></div>` : ""}
//     ${d.personal.github ? `<div class="slbl">GitHub</div><div class="sval"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></div>` : ""}
//     ${d.personal.website ? `<div class="slbl">Portfolio</div><div class="sval"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></div>` : ""}
//     ${d.skills.length ? `<div class="slbl" style="margin-top:28px">Skills</div>${d.skills.map((s) => `<div style="margin-bottom:4px;font-size:11.5px;color:#c4b5fd">• ${s}</div>`).join("")}` : ""}
//     </div>
//     <div class="main"><div class="dt">${dt}</div>${addrBlock}${greet}${secRows("#7c3aed")}${achBlock("#7c3aed")}${notesBlock}${closing("#7c3aed")}</div></div>`,
//     );

//   // ── NORDIC ──
//   if (id === "nordic")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
//     body{font-family:'DM Sans',sans-serif;color:#374151}.pg{max-width:750px;margin:0 auto;padding:64px 72px}
//     .eye{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#4f46e5;margin-bottom:10px}
//     .nm{font-family:'Libre Baskerville',serif;font-size:44px;font-weight:700;letter-spacing:-2px;color:#1e1b4b;line-height:1.05}
//     .bar{width:52px;height:3px;background:#4f46e5;margin:16px 0 18px}
//     .ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:40px}
//     .cv{font-size:12px;color:#6b7280}.cv a{color:#4f46e5;text-decoration:none}
//     .div{height:1px;background:#e0e7ff;margin:24px 0}
//     .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
//       `<div class="pg"><div class="eye">${ttl}</div><div class="nm">${nm}</div><div class="bar"></div>
//     <div class="ctrow">
//     ${d.personal.email ? `<span class="cv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
//     ${d.personal.phone ? `<span class="cv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></span>` : ""}
//     ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
//     ${d.personal.linkedin ? `<span class="cv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
//     ${d.personal.github ? `<span class="cv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></span>` : ""}
//     ${d.personal.website ? `<span class="cv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></span>` : ""}
//     </div><div class="div"></div>
//     <div class="dt">${dt}</div>${addrBlock}${greet}${secRows("#4338ca")}${achBlock("#4338ca")}${skillBlock("#4338ca")}${notesBlock}${closing("#4338ca")}</div>`,
//     );

//   // ── SLATE ──
//   if (id === "slate")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
//     body{font-family:'IBM Plex Sans',sans-serif;color:#374151}.pg{max-width:880px;margin:0 auto}
//     .hdr{padding:44px 52px;border-bottom:3px solid #0f172a;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}
//     .nm{font-size:34px;font-weight:700;color:#0f172a;letter-spacing:-1.5px}.rl{font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-top:7px}
//     .ctcol{text-align:right}.cv{font-size:11.5px;color:#475569;font-family:'IBM Plex Mono',monospace;line-height:2.1;display:block;word-break:break-all}
//     .cv a{color:#4f46e5;text-decoration:none}
//     .tag{display:inline-block;font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:#64748b;background:#f1f5f9;border:1px solid #e2e8f0;padding:3px 10px;border-radius:4px;margin-bottom:22px}
//     .body{padding:40px 52px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:20px}`,
//       `<div class="pg"><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>
//     <div class="ctcol">
//     ${d.personal.email ? `<a class="cv" href="mailto:${d.personal.email}">${d.personal.email}</a>` : ""}
//     ${d.personal.phone ? `<a class="cv" href="tel:${d.personal.phone}">${d.personal.phone}</a>` : ""}
//     ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
//     ${d.personal.linkedin ? `<a class="cv" href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a>` : ""}
//     ${d.personal.github ? `<a class="cv" href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a>` : ""}
//     ${d.personal.website ? `<a class="cv" href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a>` : ""}
//     </div></div>
//     <div class="body"><div class="tag">RE: ${d.company.jobTitle || "Open Position"} · ${d.company.name || "Company"}</div>
//     <div class="dt">${dt}</div>${addrBlock}${greet}${secRows("#334155", true)}${achBlock("#334155")}${skillBlock("#334155")}${notesBlock}${closing("#334155")}</div></div>`,
//     );

//   // ── CRIMSON ──
//   if (id === "crimson")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Lora:wght@400;500&display=swap');
//     body{font-family:'Lora',serif;color:#374151;background:#fffbf5}.pg{max-width:800px;margin:0 auto;background:#fffbf5}
//     .top{height:5px;background:#9f1239}.hdr{padding:48px 56px 16px;text-align:center}
//     .nm{font-family:'Playfair Display',serif;font-size:44px;font-weight:900;color:#1a0a0d;letter-spacing:-2px;line-height:1}
//     .rl{font-family:'Playfair Display',serif;font-style:italic;font-size:15px;color:#9f1239;margin:9px 0 16px}
//     .orn{color:#9f1239;font-size:12px;letter-spacing:5px}.ctrow{display:flex;justify-content:center;flex-wrap:wrap;gap:5px 16px;padding:12px 0;font-size:12px;color:#6b7280}
//     .ctrow a{color:#9f1239;text-decoration:none}.sep-wrap{display:flex;align-items:center;gap:10px;padding:0 56px;margin-bottom:4px}
//     .sl{flex:1;height:1px;background:#fecdd3}.sd{width:5px;height:5px;background:#9f1239;border-radius:50%;flex-shrink:0}
//     .body{padding:24px 56px 52px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:20px}`,
//       `<div class="pg"><div class="top"></div><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="orn">✦ ✦ ✦</div>
//     <div class="ctrow">
//     ${d.personal.email ? `<a href="mailto:${d.personal.email}">${d.personal.email}</a>` : ""}
//     ${d.personal.phone ? `<a href="tel:${d.personal.phone}">${d.personal.phone}</a>` : ""}
//     ${d.personal.location ? `<span>${d.personal.location}</span>` : ""}
//     ${d.personal.linkedin ? `<a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a>` : ""}
//     ${d.personal.github ? `<a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a>` : ""}
//     ${d.personal.website ? `<a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a>` : ""}
//     </div></div>
//     <div class="sep-wrap"><div class="sl"></div><div class="sd"></div><div class="sl"></div></div>
//     <div class="body"><div class="dt">${dt}</div>${addrBlock}${greet}${secRows("#9f1239")}${achBlock("#9f1239")}${notesBlock}${closing("#9f1239")}</div></div>`,
//     );

//   // ── VELVET ──
//   if (id === "velvet")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500;600&display=swap');
//     body{font-family:'Raleway',sans-serif;background:#0f082a;color:#d4c9ef;min-height:100vh}
//     .pg{max-width:860px;margin:0 auto;background:linear-gradient(160deg,#1e0f40,#2d1b69);min-height:100vh}
//     .hdr{padding:52px 52px 38px;border-bottom:1px solid rgba(196,181,253,.12);position:relative;overflow:hidden}
//     .hdr::after{content:'';position:absolute;right:-40px;top:-40px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(168,85,247,.14),transparent 70%)}
//     .nm{font-family:'Cinzel',serif;font-size:36px;font-weight:600;color:#f3e8ff;letter-spacing:2px}
//     .rl{font-size:10.5px;letter-spacing:3px;text-transform:uppercase;color:#a78bfa;margin:12px 0 20px}
//     .chips{display:flex;flex-wrap:wrap;gap:7px}.chip{padding:4px 12px;border:1px solid rgba(196,181,253,.22);color:#c4b5fd;font-size:11px;border-radius:4px}
//     .chip a{color:#c4b5fd;text-decoration:none}.body{padding:44px 52px}
//     .dt{font-size:12px;color:#7c6fa0;margin-bottom:22px}`,
//       `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
//     <div class="chips">
//     ${d.personal.email ? `<span class="chip"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
//     ${d.personal.phone ? `<span class="chip"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></span>` : ""}
//     ${d.personal.location ? `<span class="chip">${d.personal.location}</span>` : ""}
//     ${d.personal.linkedin ? `<span class="chip"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
//     ${d.personal.github ? `<span class="chip"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></span>` : ""}
//     ${d.personal.website ? `<span class="chip"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></span>` : ""}
//     </div></div>
//     <div class="body"><div class="dt">${dt}</div>
//     <div style="margin-bottom:20px;font-size:13px;line-height:2"><strong style="color:#e9d5ff">${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>${d.company.name}${loc ? `<br><span style='color:#7c6fa0'>${loc}</span>` : ""}</div>
//     <div style="font-size:16px;font-weight:600;margin-bottom:22px;color:#e9d5ff">Dear ${mgr},</div>
//     ${secRows("#c084fc")}${achBlock("#c084fc")}${skillBlock("#c084fc")}${notesBlock}
//     <div style="margin-top:36px;font-size:13.5px;color:#7c6fa0">Sincerely,<br><br><strong style="font-size:15px;color:#f3e8ff">${nm}</strong></div></div></div>`,
//     );

//   // ── FROST ──
//   if (id === "frost")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
//     body{font-family:'Outfit',sans-serif;background:linear-gradient(135deg,#dbeafe,#e0f2fe);min-height:100vh;padding:20px;color:#374151}
//     .pg{max-width:840px;margin:0 auto;background:rgba(255,255,255,.88);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.85);border-radius:16px;overflow:hidden}
//     .hdr{background:linear-gradient(135deg,rgba(12,74,110,.92),rgba(2,132,199,.9));padding:48px;color:white}
//     .nm{font-size:38px;font-weight:800;letter-spacing:-2px;margin-bottom:6px}.rl{font-size:12.5px;opacity:.8;letter-spacing:1px;margin-bottom:22px}
//     .chips{display:flex;flex-wrap:wrap;gap:7px}.chip{padding:5px 14px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.22);border-radius:40px;font-size:11.5px}
//     .chip a{color:white;text-decoration:none}.body{padding:44px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
//       `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
//     <div class="chips">${links.map((l) => `<span class="chip">${l}</span>`).join("")}</div></div>
//     <div class="body"><div class="dt">${dt}</div>${addrBlock}${greet}${secRows("#0369a1")}${achBlock("#0369a1")}${skillBlock("#0369a1")}${notesBlock}${closing("#0369a1")}</div></div>`,
//     );

//   // ── CANVAS (minimal white) ──
//   if (id === "canvas")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600&display=swap');
//     body{font-family:'Manrope',sans-serif;color:#374151;background:#fff}.pg{max-width:820px;margin:0 auto;padding:60px 64px}
//     .accent-bar{width:4px;background:#6366f1;border-radius:2px;height:70px;float:left;margin-right:20px;margin-top:2px}
//     .nm{font-family:'Syne',sans-serif;font-size:38px;font-weight:800;letter-spacing:-1.5px;color:#111827}
//     .rl{font-size:13px;color:#6366f1;font-weight:600;margin-top:5px;letter-spacing:.5px}
//     .ctrow{display:flex;flex-wrap:wrap;gap:5px 16px;margin-top:10px}
//     .cv{font-size:12px;color:#9ca3af}.cv a{color:#6366f1;text-decoration:none}
//     .div{height:1px;background:#f3f4f6;margin:28px 0;clear:both}
//     .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//     h4{font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:#6366f1;margin:0 0 8px}`,
//       `<div class="pg"><div class="accent-bar"></div>
//     <div class="nm">${nm}</div><div class="rl">${ttl}</div>
//     <div class="ctrow">
//     ${d.personal.email ? `<span class="cv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
//     ${d.personal.phone ? `<span class="cv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></span>` : ""}
//     ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
//     ${d.personal.linkedin ? `<span class="cv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
//     ${d.personal.github ? `<span class="cv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></span>` : ""}
//     ${d.personal.website ? `<span class="cv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></span>` : ""}
//     </div><div class="div"></div>
//     <div class="dt">${dt}</div>${addrBlock}${greet}${secRows("#6366f1")}${achBlock("#6366f1")}${skillBlock("#6366f1")}${notesBlock}${closing("#6366f1")}</div>`,
//     );

//   // ── DESIGNER (creative dark sidebar for UX/UI) ──
//   if (id === "designer")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&display=swap');
//     @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Manrope:wght@300;400;500;600&display=swap');
//     body{font-family:'Manrope',sans-serif;color:#374151}.pg{max-width:900px;margin:0 auto;display:flex;min-height:100vh}
//     .side{width:270px;background:#0d0d0d;background:linear-gradient(180deg,#0d0d0d 0%,#1a0a2e 100%);color:white;padding:44px 26px;flex-shrink:0;position:relative;overflow:hidden}
//     .side::before{content:'';position:absolute;top:-60px;left:-60px;width:220px;height:220px;background:radial-gradient(circle,rgba(139,92,246,.3),transparent 70%);border-radius:50%}
//     .side::after{content:'';position:absolute;bottom:-40px;right:-40px;width:160px;height:160px;background:radial-gradient(circle,rgba(59,130,246,.2),transparent 70%);border-radius:50%}
//     .snm{font-family:'Syne',sans-serif;font-size:24px;font-weight:800;color:white;line-height:1.15;margin-bottom:6px;position:relative}
//     .srl{font-size:10px;color:#a78bfa;letter-spacing:2px;text-transform:uppercase;margin-bottom:28px;padding-bottom:22px;border-bottom:1px solid rgba(167,139,250,.2);position:relative}
//     .savatar{width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:22px;box-shadow:0 8px 24px rgba(99,102,241,.4)}
//     .slbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:rgba(167,139,250,.5);margin-bottom:6px;margin-top:20px;position:relative}
//     .sval{font-size:11px;color:#c4b5fd;line-height:1.9;word-break:break-all;position:relative}
//     .sval a{color:#c4b5fd;text-decoration:none}
//     .sskill{display:inline-block;padding:3px 10px;background:rgba(139,92,246,.2);border:1px solid rgba(139,92,246,.3);border-radius:4px;font-size:10.5px;color:#c4b5fd;margin:2px 2px 0 0}
//     .main{flex:1;padding:48px 44px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//     .gr{font-size:16px;font-weight:600;margin-bottom:22px;color:#111827}`,
//       `<div class="pg"><div class="side">
//     <div class="savatar">✦</div>
//     <div class="snm">${nm}</div><div class="srl">${ttl}</div>
//     ${d.personal.email ? `<div class="slbl">Email</div><div class="sval"><a href="mailto:${d.personal.email}">${d.personal.email}</a></div>` : ""}
//     ${d.personal.phone ? `<div class="slbl">Phone</div><div class="sval"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></div>` : ""}
//     ${d.personal.location ? `<div class="slbl">Location</div><div class="sval">${d.personal.location}</div>` : ""}
//     ${d.personal.linkedin ? `<div class="slbl">LinkedIn</div><div class="sval"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></div>` : ""}
//     ${d.personal.github ? `<div class="slbl">GitHub</div><div class="sval"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></div>` : ""}
//     ${d.personal.website ? `<div class="slbl">Portfolio</div><div class="sval"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></div>` : ""}
//     ${d.skills.length ? `<div class="slbl" style="margin-top:26px">Tools & Skills</div><div style="margin-top:6px">${d.skills.map((s) => `<span class="sskill">${s}</span>`).join("")}</div>` : ""}
//     </div>
//     <div class="main"><div class="dt">${dt}</div>${addrBlock}<div class="gr">Dear ${mgr},</div>${secRows("#7c3aed")}${achBlock("#7c3aed")}${notesBlock}${closing("#7c3aed")}</div></div>`,
//     );

//   // ── EDITOR/DIRECTOR (video editor dark) ──
//   if (id === "editor")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;700;900&family=Share+Tech+Mono&display=swap');
//     body{font-family:'Exo 2',sans-serif;background:#0f0a1e;color:#94a3b8;min-height:100vh}
//     .pg{max-width:880px;margin:0 auto;background:#0f0a1e;min-height:100vh}
//     .hdr{padding:52px;position:relative}
//     .hdr::before{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#f43f5e,transparent)}
//     .nm{font-size:46px;font-weight:900;letter-spacing:-3px;color:white;line-height:.95;margin-bottom:6px}
//     .rl{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#f43f5e;margin-bottom:22px}
//     .chips{display:flex;flex-wrap:wrap;gap:8px}
//     .chip{padding:4px 12px;border:1px solid rgba(244,63,94,.25);color:#94a3b8;font-size:10.5px;font-family:'Share Tech Mono',monospace;border-radius:4px}
//     .chip a{color:#f43f5e;text-decoration:none}
//     .body{padding:32px 52px 52px}.dt{font-size:11.5px;font-family:'Share Tech Mono',monospace;color:#4a5578;margin-bottom:22px}
//     .gr{font-size:17px;font-weight:700;color:white;margin-bottom:22px}
//     .sh4{font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#f43f5e;margin-bottom:8px;display:flex;align-items:center;gap:8px}
//     .sh4::before{content:'';width:24px;height:2px;background:#f43f5e}`,
//       `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
//     <div class="chips">${links.map((l) => `<span class="chip">${l}</span>`).join("")}</div></div>
//     <div class="body"><div class="dt">${dt}</div>
//     <div style="margin-bottom:22px;font-size:13px;line-height:2"><strong style="color:#e2e8f0">${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>${d.company.name}${loc ? `<br><span style='color:#4a5578'>${loc}</span>` : ""}</div>
//     <div class="gr">Dear ${mgr},</div>
//     ${d.sections
//       .filter((s) => s.content.trim())
//       .map(
//         (s) =>
//           `<div style="margin-bottom:26px"><div class="sh4">${s.title}</div><p style="line-height:1.85;font-size:13.5px;color:#94a3b8">${s.content.replace(/\n/g, "<br>")}</p></div>`,
//       )
//       .join("")}
//     ${d.achievements.length ? `<div style="margin:18px 0 22px"><div class="sh4">Key Achievements</div>${d.achievements.map((a) => `<div style="display:flex;gap:9px;margin-bottom:7px;font-size:13px"><span style="color:#f43f5e;flex-shrink:0">›</span>${a}</div>`).join("")}</div>` : ""}
//     ${d.skills.length ? `<div style="margin:16px 0 22px"><div class="sh4">Core Skills</div><div style="display:flex;flex-wrap:wrap;gap:7px">${d.skills.map((s) => `<span style="padding:4px 12px;background:rgba(244,63,94,.08);border:1px solid rgba(244,63,94,.2);border-radius:4px;font-size:12px;color:#94a3b8">${s}</span>`).join("")}</div></div>` : ""}
//     ${notesBlock}
//     <div style="margin-top:36px;font-size:13.5px;color:#64748b">Sincerely,<br><br><strong style="font-size:15px;color:white">${nm}</strong></div></div></div>`,
//     );

//   // ── PEARL (pure white clean) ──
//   if (id === "pearl")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
//     body{font-family:'Plus Jakarta Sans',sans-serif;color:#374151;background:#fff}.pg{max-width:820px;margin:0 auto;padding:60px 64px}
//     .nm{font-size:40px;font-weight:800;letter-spacing:-2px;color:#111827;margin-bottom:6px}
//     .rl{font-size:13px;color:#6366f1;font-weight:700;letter-spacing:.5px;margin-bottom:16px}
//     .div-top{height:1.5px;background:#f1f0ff;margin-bottom:16px}
//     .ctrow{display:flex;flex-wrap:wrap;gap:5px 20px;margin-bottom:16px}
//     .cv{font-size:12px;color:#9ca3af}.cv a{color:#6366f1;text-decoration:none}
//     .div{height:1.5px;background:#f1f0ff;margin:20px 0}
//     .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
//       `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div-top"></div>
//     <div class="ctrow">
//     ${d.personal.email ? `<span class="cv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
//     ${d.personal.phone ? `<span class="cv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></span>` : ""}
//     ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
//     ${d.personal.linkedin ? `<span class="cv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
//     ${d.personal.github ? `<span class="cv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></span>` : ""}
//     ${d.personal.website ? `<span class="cv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></span>` : ""}
//     </div><div class="div"></div>
//     <div class="dt">${dt}</div>${addrBlock}${greet}${secRows("#6366f1")}${achBlock("#6366f1")}${skillBlock("#6366f1")}${notesBlock}${closing("#6366f1")}</div>`,
//     );

//   // ── PRISM ──
//   if (id === "prism")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
//     body{font-family:'Outfit',sans-serif;color:#374151}.pg{max-width:860px;margin:0 auto}
//     .hdr{background:linear-gradient(120deg,#7c3aed,#c026d3);height:158px;position:relative;overflow:hidden}
//     .g1{position:absolute;right:0;top:0;bottom:0;width:55%;background:rgba(255,255,255,.1);clip-path:polygon(25% 0,100% 0,100% 100%,0 100%)}
//     .g2{position:absolute;right:0;top:0;bottom:0;width:33%;background:rgba(255,255,255,.07);clip-path:polygon(40% 0,100% 0,100% 100%,0 100%)}
//     .hi{position:absolute;left:44px;bottom:22px;color:white}
//     .nm{font-size:38px;font-weight:800;letter-spacing:-2px;line-height:1}.rl{font-size:13px;opacity:.8;margin-top:6px}
//     .cbar{display:flex;background:#1e1b4b;padding:9px 44px;gap:16px;flex-wrap:wrap}
//     .cv{font-size:11px;color:#a5b4fc;padding:2px 0;word-break:break-all}
//     .cv a{color:#c4b5fd;text-decoration:none}.body{padding:44px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
//       `<div class="pg"><div class="hdr"><div class="g1"></div><div class="g2"></div>
//     <div class="hi"><div class="nm">${nm}</div><div class="rl">${ttl}</div></div></div>
//     <div class="cbar">
//     ${d.personal.email ? `<span class="cv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
//     ${d.personal.phone ? `<span class="cv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></span>` : ""}
//     ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
//     ${d.personal.linkedin ? `<span class="cv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
//     ${d.personal.github ? `<span class="cv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></span>` : ""}
//     ${d.personal.website ? `<span class="cv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></span>` : ""}
//     </div>
//     <div class="body"><div class="dt">${dt}</div>${addrBlock}${greet}${secRows("#7c3aed", true)}${achBlock("#7c3aed")}${skillBlock("#7c3aed")}${notesBlock}${closing("#7c3aed")}</div></div>`,
//     );

//   // ── IVORY (warm white classic) ──
//   if (id === "ivory")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;600&display=swap');
//     body{font-family:'Source Sans 3',sans-serif;color:#374151;background:#fefce8}.pg{max-width:820px;margin:0 auto;background:#fefce8;padding:60px 64px;border-left:5px solid #ca8a04}
//     .nm{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:700;color:#1c1917;letter-spacing:-.5px;line-height:1.1}
//     .rl{font-size:13px;color:#92400e;font-style:italic;margin:8px 0 16px}
//     .div{height:1px;background:#fde68a;margin:16px 0}
//     .ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:14px}
//     .cv{font-size:12px;color:#78716c}.cv a{color:#b45309;text-decoration:none}
//     .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
//       `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div"></div>
//     <div class="ctrow">
//     ${d.personal.email ? `<span class="cv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
//     ${d.personal.phone ? `<span class="cv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></span>` : ""}
//     ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
//     ${d.personal.linkedin ? `<span class="cv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
//     ${d.personal.github ? `<span class="cv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></span>` : ""}
//     ${d.personal.website ? `<span class="cv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></span>` : ""}
//     </div><div class="div"></div>
//     <div class="dt">${dt}</div>${addrBlock}${greet}${secRows("#b45309")}${achBlock("#b45309")}${skillBlock("#b45309")}${notesBlock}${closing("#b45309")}</div>`,
//     );

//   // ── MOTION (video/creative) ──
//   if (id === "motion")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;900&family=Barlow:wght@400;500;600&display=swap');
//     body{font-family:'Barlow',sans-serif;color:#374151;background:#fff}.pg{max-width:860px;margin:0 auto}
//     .topbar{height:6px;background:linear-gradient(90deg,#ec4899,#f59e0b)}
//     .hdr{padding:44px 52px;border-bottom:1px solid #fce7f3;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}
//     .nm{font-family:'Barlow Condensed',sans-serif;font-size:48px;font-weight:900;letter-spacing:-3px;text-transform:uppercase;line-height:.95;color:#111827}
//     .rl{font-size:13px;color:#ec4899;letter-spacing:2px;text-transform:uppercase;margin-top:8px;font-weight:600}
//     .ctcol{text-align:right;font-size:12px;color:#9ca3af}
//     .cv{display:block;margin-bottom:4px;line-height:1.5}.cv a{color:#ec4899;text-decoration:none}
//     .body{padding:44px 52px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//     .botbar{height:6px;background:linear-gradient(90deg,#f59e0b,#ec4899)}`,
//       `<div class="pg"><div class="topbar"></div>
//     <div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>
//     <div class="ctcol">
//     ${d.personal.email ? `<span class="cv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
//     ${d.personal.phone ? `<span class="cv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></span>` : ""}
//     ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
//     ${d.personal.linkedin ? `<span class="cv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
//     ${d.personal.github ? `<span class="cv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></span>` : ""}
//     ${d.personal.website ? `<span class="cv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></span>` : ""}
//     </div></div>
//     <div class="body"><div class="dt">${dt}</div>${addrBlock}${greet}${secRows("#ec4899")}${achBlock("#ec4899")}${skillBlock("#ec4899")}${notesBlock}${closing("#ec4899")}</div>
//     <div class="botbar"></div></div>`,
//     );

//   // ── ARCHITECT (structured professional) ──
//   if (id === "architect")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
//     body{font-family:'Plus Jakarta Sans',sans-serif;color:#374151;background:#f8fafc}.pg{max-width:880px;margin:0 auto;background:#f8fafc}
//     .hdr{padding:44px 52px;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;gap:24px;align-items:flex-start}
//     .hdr-left{flex:1}.nm{font-size:34px;font-weight:800;color:#0f172a;letter-spacing:-1.5px}
//     .rl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-top:7px;margin-bottom:14px}
//     .ctrow{display:flex;flex-wrap:wrap;gap:4px 14px}
//     .cv{font-size:12px;color:#64748b}.cv a{color:#4f46e5;text-decoration:none}
//     .hdr-right{width:130px;flex-shrink:0;background:#0f172a;border-radius:12px;padding:16px;text-align:center}
//     .hdr-right-label{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#64748b;margin-bottom:6px}
//     .hdr-right-role{font-size:11px;font-weight:700;color:white;line-height:1.4}
//     .hdr-right-co{font-size:10px;color:#94a3b8;margin-top:4px}
//     .body{padding:36px 52px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
//       `<div class="pg"><div class="hdr">
//     <div class="hdr-left"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
//     <div class="ctrow">
//     ${d.personal.email ? `<span class="cv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
//     ${d.personal.phone ? `<span class="cv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></span>` : ""}
//     ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
//     ${d.personal.linkedin ? `<span class="cv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
//     ${d.personal.github ? `<span class="cv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></span>` : ""}
//     ${d.personal.website ? `<span class="cv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></span>` : ""}
//     </div></div>
//     ${d.company.name ? `<div class="hdr-right"><div class="hdr-right-label">Applying to</div><div class="hdr-right-role">${d.company.jobTitle || "Open Role"}</div><div class="hdr-right-co">${d.company.name}</div></div>` : ""}
//     </div>
//     <div class="body"><div class="dt">${dt}</div>${addrBlock}${greet}${secRows("#0f172a", true)}${achBlock("#0f172a")}${skillBlock("#0f172a")}${notesBlock}${closing("#0f172a")}</div></div>`,
//     );

//   // ── SERIF (classic newspaper style) ──
//   if (id === "serif")
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,400&display=swap');
//     body{font-family:'Source Serif 4',serif;color:#374151;background:#fff}.pg{max-width:820px;margin:0 auto;padding:52px 64px}
//     .rule{height:2px;background:#1e293b;margin-bottom:20px}
//     .nm{font-family:'Playfair Display',serif;font-size:42px;font-weight:900;color:#1e293b;letter-spacing:-1.5px;text-align:center;margin-bottom:6px}
//     .rl{font-size:12px;color:#64748b;text-align:center;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px}
//     .ctrow{display:flex;justify-content:center;flex-wrap:wrap;gap:5px 20px;margin-bottom:16px}
//     .cv{font-size:12px;color:#64748b}.cv a{color:#4338ca;text-decoration:none}
//     .rule2{height:1px;background:#e5e7eb;margin-bottom:20px}
//     .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
//       `<div class="pg"><div class="rule"></div>
//     <div class="nm">${nm}</div><div class="rl">${ttl}</div>
//     <div class="ctrow">
//     ${d.personal.email ? `<span class="cv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
//     ${d.personal.phone ? `<span class="cv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></span>` : ""}
//     ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
//     ${d.personal.linkedin ? `<span class="cv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
//     ${d.personal.github ? `<span class="cv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></span>` : ""}
//     ${d.personal.website ? `<span class="cv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></span>` : ""}
//     </div><div class="rule2"></div>
//     <div class="dt">${dt}</div>${addrBlock}${greet}${secRows("#4338ca")}${achBlock("#4338ca")}${skillBlock("#4338ca")}${notesBlock}${closing("#4338ca")}</div>`,
//     );

//   return buildHTML("aurora", d);
// }

// // ═══════════════════════════════════════════════════════════════
// // STEP CONFIG
// // ═══════════════════════════════════════════════════════════════
// type Step = "template" | "personal" | "company" | "content" | "review";
// const STEPS: { id: Step; label: string; icon: string }[] = [
//   { id: "template", label: "Template", icon: "🎨" },
//   { id: "personal", label: "Personal", icon: "👤" },
//   { id: "company", label: "Company", icon: "🏢" },
//   { id: "content", label: "Content", icon: "✍️" },
//   { id: "review", label: "Review", icon: "✅" },
// ];

// // ═══════════════════════════════════════════════════════════════
// // MAIN COMPONENT
// // ═══════════════════════════════════════════════════════════════
// export default function CoverLetterGenerator() {
//   const router = useRouter();
//   const [step, setStep] = useState<Step>("template");
//   const [tplId, setTplId] = useState("aurora");
//   const [data, setData] = useState<CLData>(JSON.parse(JSON.stringify(BLANK)));
//   const [html, setHtml] = useState("");
//   const [modal, setModal] = useState(false);
//   const [achIn, setAchIn] = useState("");
//   const [sklIn, setSklIn] = useState("");
//   const [toast, setToast] = useState("");
//   const [busy, setBusy] = useState(false);
//   const [filter, setFilter] = useState("All");

//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const modalIframeRef = useRef<HTMLIFrameElement>(null);

//   const showToast = (m: string) => {
//     setToast(m);
//     setTimeout(() => setToast(""), 2800);
//   };

//   const rebuild = useCallback(() => {
//     const h = buildHTML(tplId, data);
//     setHtml(h);
//     return h;
//   }, [tplId, data]);

//   useEffect(() => {
//     const t = setTimeout(rebuild, 200);
//     return () => clearTimeout(t);
//   }, [rebuild]);

//   const writeIframe = (
//     ref: React.RefObject<HTMLIFrameElement | null>,
//     h: string,
//   ) => {
//     if (!ref.current) return;
//     const doc = ref.current.contentDocument;
//     if (!doc) return;
//     doc.open();
//     doc.write(h);
//     doc.close();
//   };

//   useEffect(() => {
//     if (html && iframeRef.current) writeIframe(iframeRef, html);
//   }, [html]);
//   useEffect(() => {
//     if (modal && html && modalIframeRef.current)
//       writeIframe(modalIframeRef, html);
//   }, [modal, html]);

//   const set = (path: string[], val: string) =>
//     setData((prev) => {
//       const n = JSON.parse(JSON.stringify(prev)) as CLData;
//       let c: any = n;
//       for (let i = 0; i < path.length - 1; i++) c = c[path[i]];
//       c[path[path.length - 1]] = val;
//       return n;
//     });
//   const setSection = (id: string, f: "title" | "content", v: string) =>
//     setData((p) => ({
//       ...p,
//       sections: p.sections.map((s) => (s.id === id ? { ...s, [f]: v } : s)),
//     }));

//   const downloadPDF = async () => {
//     const h = rebuild();
//     setBusy(true);
//     try {
//       const r = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/candidates/generate-pdf`,
//         { html: h },
//         { responseType: "blob" },
//       );
//       const url = URL.createObjectURL(r.data);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `Cover_Letter_${data.personal.fullName || "Draft"}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//       showToast("✓ PDF downloaded successfully");
//     } catch {
//       showToast("Download failed — please try again");
//     } finally {
//       setBusy(false);
//     }
//   };

//   const tpl = TEMPLATES.find((t) => t.id === tplId)!;
//   const stepIdx = STEPS.findIndex((s) => s.id === step);
//   const cats = ["All", ...Array.from(new Set(TEMPLATES.map((t) => t.tag)))];
//   const shownTpls =
//     filter === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.tag === filter);

//   const tones = [
//     "Professional",
//     "Confident",
//     "Enthusiastic",
//     "Formal",
//     "Creative",
//     "Friendly",
//   ];

//   return (
//     <>
//       <style>{`
//       @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
//       *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
//       :root{
//         --p:#5b38f0;--p2:#7c3aed;--p3:#9f67ff;
//         --p10:#f3f0ff;--p20:#ede9fe;--p30:#ddd6fe;--p50:#c4b5fd;
//         --ink:#0d0b1e;--sub:#64688a;--muted:#9ca3af;--ghost:#c0c4d8;
//         --border:#e4e1f0;--border2:#ede9fe;
//         --bg:#f5f3ff;--bg2:#eeebfc;--white:#fff;
//         --r8:8px;--r12:12px;--r16:16px;--r20:20px;--r24:24px;
//         --sh1:0 1px 4px rgba(91,56,240,.07);
//         --sh2:0 4px 20px rgba(91,56,240,.11);
//         --sh3:0 12px 40px rgba(91,56,240,.17);
//       }
//       html,body{height:100%;font-family:'Plus Jakarta Sans',system-ui,sans-serif;background:var(--bg);color:var(--ink);-webkit-font-smoothing:antialiased;overflow:hidden}
//       @media(max-width:820px){html,body{overflow:auto}}

//       /* NAV */
//       .nav{height:58px;background:var(--white);border-bottom:1.5px solid var(--border);display:flex;align-items:center;padding:0 20px;gap:10px;z-index:200;position:relative;box-shadow:var(--sh1);flex-shrink:0}
//       .nav-logo{display:flex;align-items:center;gap:8px;flex-shrink:0;text-decoration:none}
//       .nav-gem{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,var(--p),var(--p2));display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 4px 10px rgba(91,56,240,.32)}
//       .nav-brand{font-size:15px;font-weight:800;color:var(--ink);letter-spacing:-.3px}
//       .nav-brand em{color:var(--p);font-style:normal}
//       .nav-div{width:1px;height:20px;background:var(--border);margin:0 2px}

//       /* wizard */
//       .wizard{display:flex;align-items:center;flex:1;justify-content:center;overflow-x:auto;padding:0 6px;scrollbar-width:none;gap:0}
//       .wizard::-webkit-scrollbar{display:none}
//       .wz{display:flex;align-items:center;gap:6px;padding:4px 7px;border-radius:30px;cursor:pointer;transition:.18s;flex-shrink:0}
//       .wz:hover:not(.wz-on){background:var(--p10)}
//       .wz-num{width:24px;height:24px;border-radius:50%;border:2px solid var(--border);background:var(--white);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:var(--muted);transition:.2s;flex-shrink:0}
//       .wz-done .wz-num{background:#10b981;border-color:#10b981;color:white}
//       .wz-on .wz-num{background:linear-gradient(135deg,var(--p),var(--p2));border-color:transparent;color:white;box-shadow:0 0 0 3px rgba(91,56,240,.16)}
//       .wz-lbl{font-size:12px;font-weight:700;color:var(--muted);white-space:nowrap;transition:.18s}
//       .wz-done .wz-lbl,.wz-on .wz-lbl{color:var(--ink)}
//       .wz-line{width:22px;height:2px;background:var(--border);transition:.25s;flex-shrink:0}
//       .wz-line-done{background:#10b981}
//       @media(max-width:600px){.wz-lbl{display:none}.wz-line{width:12px}.nav{padding:0 12px;gap:8px}}

//       .nav-r{display:flex;align-items:center;gap:7px;flex-shrink:0}
//       .btn{display:inline-flex;align-items:center;gap:6px;padding:7px 15px;border-radius:40px;font-size:12px;font-weight:700;cursor:pointer;border:none;font-family:inherit;transition:all .16s;white-space:nowrap}
//       .btn-g{background:transparent;color:var(--sub);border:1.5px solid var(--border)}
//       .btn-g:hover{background:var(--p10);border-color:var(--p30);color:var(--p)}
//       .btn-p{background:linear-gradient(135deg,var(--p),var(--p2));color:white;box-shadow:0 4px 12px rgba(91,56,240,.28)}
//       .btn-p:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 20px rgba(91,56,240,.36)}
//       .btn-p:disabled{opacity:.5;cursor:not-allowed;transform:none}
//       .btn-sm{padding:6px 13px;font-size:11.5px}

//       /* SHELL */
//       .shell{display:grid;grid-template-columns:1fr 1fr;height:calc(100vh - 58px)}
//       @media(max-width:1200px){.shell{grid-template-columns:380px 1fr}}
//       @media(max-width:960px){.shell{grid-template-columns:340px 1fr}}
//       @media(max-width:820px){.shell{grid-template-columns:1fr;height:auto;overflow:visible}}

//       /* LEFT */
//       .left{display:flex;flex-direction:column;overflow:hidden;background:var(--bg)}
//       @media(max-width:820px){.left{overflow:visible}}
//       .left-hd{flex-shrink:0;padding:22px 24px 0}
//       .eye-row{display:flex;align-items:center;gap:8px;margin-bottom:5px}
//       .eye-ico{width:28px;height:28px;background:linear-gradient(135deg,var(--p),var(--p2));border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px}
//       .eye-txt{font-size:11px;font-weight:800;letter-spacing:.8px;color:var(--p);text-transform:uppercase}
//       .pg-title{font-size:clamp(18px,3vw,24px);font-weight:800;color:var(--ink);letter-spacing:-.4px;margin-bottom:3px}
//       .pg-sub{font-size:13px;color:var(--sub);margin-bottom:14px}
//       .pill-tip{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:linear-gradient(135deg,var(--p),var(--p2));color:white;border-radius:40px;font-size:11.5px;font-weight:700;cursor:pointer;border:none;font-family:inherit;box-shadow:0 4px 10px rgba(91,56,240,.22);transition:.16s;margin-bottom:2px}
//       .pill-tip:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(91,56,240,.3)}

//       .left-body{flex:1;overflow-y:auto;padding:14px 24px 20px;scrollbar-width:thin;scrollbar-color:var(--p30) transparent}
//       .left-body::-webkit-scrollbar{width:4px}
//       .left-body::-webkit-scrollbar-thumb{background:var(--p30);border-radius:4px}
//       @media(max-width:820px){.left-body{overflow-y:visible}}

//       /* filter row */
//       .flt-row{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}
//       .flt{padding:5px 14px;border-radius:30px;font-size:11.5px;font-weight:700;cursor:pointer;border:1.5px solid var(--border);background:white;color:var(--sub);font-family:inherit;transition:.14s}
//       .flt:hover,.flt.on{border-color:var(--p);color:var(--p);background:var(--p10)}

//       /* template grid */
//       .tpl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:12px}
//       @media(max-width:480px){.tpl-grid{grid-template-columns:repeat(2,1fr);gap:10px}}
//       .tpl-card{background:white;border:2px solid var(--border2);border-radius:var(--r16);overflow:hidden;cursor:pointer;transition:all .2s;position:relative}
//       .tpl-card:hover{transform:translateY(-3px);box-shadow:var(--sh3);border-color:var(--p50)}
//       .tpl-card.on{border-color:var(--p);box-shadow:0 0 0 3px rgba(91,56,240,.13),var(--sh2)}
//       .tpl-thumb{height:105px;overflow:hidden;background:#f8f7ff}
//       .tpl-chk{position:absolute;top:8px;right:8px;width:20px;height:20px;background:var(--p);border-radius:50%;display:flex;align-items:center;justify-content:center;opacity:0;transition:.18s;box-shadow:0 2px 7px rgba(91,56,240,.38)}
//       .tpl-card.on .tpl-chk{opacity:1}
//       .tpl-chk svg{width:11px;height:11px;stroke:white;stroke-width:2.5;fill:none}
//       .tpl-info{padding:10px 12px 12px}
//       .tpl-tag{font-size:9px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:var(--p);margin-bottom:2px}
//       .tpl-name{font-size:13px;font-weight:800;color:var(--ink)}

//       /* card */
//       .card{background:white;border-radius:var(--r20);padding:20px 22px;margin-bottom:13px;box-shadow:var(--sh1);border:1.5px solid var(--border2)}
//       .card-hd{display:flex;align-items:center;gap:11px;margin-bottom:16px}
//       .card-ico{width:36px;height:36px;background:linear-gradient(135deg,var(--p),var(--p2));border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;box-shadow:0 4px 10px rgba(91,56,240,.22)}
//       .card-t{font-size:14px;font-weight:800;color:var(--ink)}
//       .card-s{font-size:11.5px;color:var(--sub);margin-top:1px}

//       /* fields */
//       .fld{margin-bottom:13px}
//       .fld-l{font-size:10.5px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;color:var(--sub);margin-bottom:5px;display:block}
//       .fld-l span{color:#ef4444}
//       .iw{position:relative}
//       .iw-ic{position:absolute;left:11px;top:50%;transform:translateY(-50%);font-size:13px;pointer-events:none;opacity:.48}
//       input,textarea,select{width:100%;padding:9px 11px 9px 34px;border:1.5px solid var(--border);border-radius:var(--r12);font-size:13px;font-family:inherit;color:var(--ink);background:white;outline:none;transition:.14s}
//       textarea{padding-left:11px;resize:vertical;min-height:76px;line-height:1.65}
//       .bare{padding-left:11px}
//       input:focus,textarea:focus,select:focus{border-color:var(--p);box-shadow:0 0 0 3px rgba(91,56,240,.1)}
//       input::placeholder,textarea::placeholder{color:var(--ghost)}
//       .g2{display:grid;grid-template-columns:1fr 1fr;gap:11px}
//       .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px}
//       @media(max-width:520px){.g2,.g3{grid-template-columns:1fr}}

//       /* hdiv + sublabel */
//       .hdiv{height:1px;background:var(--border2);margin:14px 0}
//       .slbl{font-size:10px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:var(--p);margin-bottom:9px;display:flex;align-items:center;gap:5px}

//       /* section block */
//       .sblock{background:var(--p10);border:1.5px solid var(--p20);border-radius:var(--r12);padding:12px;margin-bottom:10px;transition:.18s}
//       .sblock:focus-within{background:white;border-color:var(--p);box-shadow:0 0 0 3px rgba(91,56,240,.08)}
//       .shd{display:flex;align-items:center;gap:7px;margin-bottom:9px}
//       .snum{width:21px;height:21px;border-radius:6px;background:linear-gradient(135deg,var(--p),var(--p2));color:white;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
//       .sti{flex:1;padding:5px 9px;border-radius:8px;border:1.5px solid var(--border);font-size:12.5px;font-weight:700;background:white;font-family:inherit;color:var(--ink);outline:none;transition:.14s}
//       .sti:focus{border-color:var(--p)}
//       .sdel{width:24px;height:24px;background:white;border:1.5px solid var(--border);border-radius:6px;cursor:pointer;color:#f87171;font-size:12px;display:flex;align-items:center;justify-content:center;transition:.14s}
//       .sdel:hover{background:#fef2f2;border-color:#fca5a5}
//       .sta{width:100%;padding:8px 10px;border-radius:9px;border:1.5px solid var(--border);font-size:12.5px;font-family:inherit;outline:none;resize:vertical;transition:.14s;background:white}
//       .sta:focus{border-color:var(--p);box-shadow:0 0 0 3px rgba(91,56,240,.08)}
//       .add-btn{width:100%;padding:8px;background:white;border:1.5px dashed var(--p30);border-radius:var(--r12);color:var(--p);font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit;transition:.14s;margin-bottom:12px}
//       .add-btn:hover{background:var(--p10);border-color:var(--p)}

//       /* tag input */
//       .tag-row{display:flex;gap:6px;margin-bottom:8px}
//       .tag-in{flex:1;padding:8px 11px;border:1.5px solid var(--border);border-radius:var(--r12);font-size:12.5px;font-family:inherit;outline:none;transition:.14s}
//       .tag-in:focus{border-color:var(--p);box-shadow:0 0 0 3px rgba(91,56,240,.09)}
//       .tag-add{padding:8px 14px;background:linear-gradient(135deg,var(--p),var(--p2));color:white;border:none;border-radius:var(--r12);cursor:pointer;font-size:12px;font-weight:700;font-family:inherit;transition:.14s}
//       .tag-add:hover{box-shadow:0 4px 10px rgba(91,56,240,.28)}
//       .tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:3px}
//       .tag-item{display:flex;align-items:center;gap:4px;padding:4px 10px 4px 9px;background:var(--p10);border:1.5px solid var(--p20);border-radius:30px;font-size:12px;font-weight:600;color:var(--p)}
//       .tag-rm{background:none;border:none;cursor:pointer;color:var(--p50);font-size:13px;line-height:1;padding:0;display:flex;transition:.14s}
//       .tag-rm:hover{color:#ef4444}

//       /* tone buttons */
//       .tone-row{display:flex;flex-wrap:wrap;gap:6px}
//       .tone-btn{padding:5px 13px;border-radius:30px;font-size:12px;font-weight:600;cursor:pointer;border:1.5px solid var(--border);background:white;color:var(--sub);font-family:inherit;transition:.14s}
//       .tone-btn.on{border-color:var(--p);color:var(--p);background:var(--p10)}

//       /* left footer */
//       .left-ft{flex-shrink:0;padding:12px 24px;border-top:1.5px solid var(--border);background:var(--white);display:flex;justify-content:space-between;align-items:center;gap:10px}
//       .btn-bk{display:flex;align-items:center;gap:5px;padding:9px 18px;border-radius:40px;font-size:13px;font-weight:700;cursor:pointer;border:1.5px solid var(--border);background:white;color:var(--sub);font-family:inherit;transition:.14s}
//       .btn-bk:hover:not(:disabled){background:var(--p10);border-color:var(--p30);color:var(--p)}
//       .btn-bk:disabled{opacity:.36;cursor:default}
//       .btn-nx{display:flex;align-items:center;gap:7px;padding:11px 26px;border-radius:40px;font-size:13px;font-weight:800;cursor:pointer;border:none;background:linear-gradient(135deg,var(--p),var(--p2));color:white;font-family:inherit;box-shadow:0 4px 14px rgba(91,56,240,.3);transition:.16s}
//       .btn-nx:hover{transform:translateY(-1px);box-shadow:0 6px 22px rgba(91,56,240,.38)}
//       .btn-nx:disabled{opacity:.52;cursor:not-allowed;transform:none}
//       @media(max-width:480px){.left-hd{padding:18px 16px 0}.left-body{padding:12px 16px 18px}.left-ft{padding:11px 16px}.btn-nx{padding:10px 20px;font-size:12.5px}}

//       /* RIGHT (canvas) */
//       .right{background:var(--bg2);border-left:1.5px solid var(--border);display:flex;flex-direction:column;overflow:hidden}
//       @media(max-width:820px){.right{display:none}}
//       .right-hd{flex-shrink:0;height:52px;padding:0 18px;background:var(--white);border-bottom:1.5px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:10px}
//       .live-dot{width:7px;height:7px;border-radius:50%;background:#10b981;animation:livePulse 2s infinite;flex-shrink:0}
//       @keyframes livePulse{0%,100%{box-shadow:0 0 0 2px rgba(16,185,129,.18)}50%{box-shadow:0 0 0 5px rgba(16,185,129,.07)}}
//       .right-t{font-size:13px;font-weight:700}
//       .right-s{font-size:11px;color:var(--muted)}
//       .right-body{flex:1;overflow:hidden;position:relative}
//       .canvas-iframe{width:860px;border:none;display:block;background:white;height:1100px;box-shadow:0 0 60px rgba(91,56,240,.12);pointer-events:none;border-radius:8px}

//       /* MOBILE PREVIEW BUTTON */
//       .mob-fab{display:none}
//       @media(max-width:820px){
//         .mob-fab{display:flex;align-items:center;gap:7px;position:fixed;bottom:20px;right:16px;z-index:150;padding:11px 20px;border-radius:40px;font-size:13px;font-weight:800;background:linear-gradient(135deg,var(--p),var(--p2));color:white;border:none;cursor:pointer;font-family:inherit;box-shadow:0 8px 24px rgba(91,56,240,.38)}
//       }

//       /* MODAL */
//       .ov{position:fixed;inset:0;background:rgba(10,6,30,.86);backdrop-filter:blur(16px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px;animation:ovIn .18s ease}
//       @keyframes ovIn{from{opacity:0}to{opacity:1}}
//       .modal{width:100%;max-width:960px;height:94vh;background:white;border-radius:22px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 48px 100px rgba(0,0,0,.48);animation:mdUp .22s ease}
//       @keyframes mdUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
//       .modal-hd{flex-shrink:0;height:56px;padding:0 22px;background:white;border-bottom:1.5px solid var(--border2);display:flex;align-items:center;justify-content:space-between}
//       .modal-ico{width:30px;height:30px;background:linear-gradient(135deg,var(--p),var(--p2));border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-size:14px;flex-shrink:0}
//       .modal-close{width:30px;height:30px;border-radius:50%;background:var(--p10);border:1.5px solid var(--p20);cursor:pointer;font-size:16px;color:var(--sub);display:flex;align-items:center;justify-content:center;transition:.14s}
//       .modal-close:hover{background:#fef2f2;border-color:#fca5a5;color:#ef4444}
//       .modal-body{flex:1;overflow:hidden;background:var(--bg2);position:relative}
//       .modal-ft{flex-shrink:0;padding:12px 22px;border-top:1.5px solid var(--border2);background:white;display:flex;justify-content:flex-end;gap:9px}
//       @media(max-width:640px){.ov{padding:0;align-items:flex-end}.modal{border-radius:20px 20px 0 0;height:88vh}}

//       /* REVIEW step */
//       .review-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border2)}
//       .review-row:last-child{border-bottom:none}
//       .review-lbl{font-size:11.5px;font-weight:700;color:var(--sub);text-transform:uppercase;letter-spacing:.5px}
//       .review-val{font-size:13px;color:var(--ink);font-weight:500;text-align:right;max-width:200px;word-break:break-all}
//       .review-edit{font-size:11px;font-weight:700;color:var(--p);cursor:pointer;background:none;border:none;font-family:inherit}

//       /* TOAST */
//       .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--ink);color:white;padding:10px 24px;border-radius:40px;font-size:13px;font-weight:700;z-index:9999;animation:toIn .22s ease;box-shadow:0 8px 26px rgba(0,0,0,.2);white-space:nowrap}
//       @keyframes toIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
//     `}</style>

//       {/* NAV */}
//       <nav className="nav">
//         {/* Logo - responsive sizing */}
//         <button
//           onClick={() => router.push("/")}
//           className="cursor-pointer flex-shrink-0"
//         >
//           <div className="relative w-[100px] xs:w-[120px] sm:w-[140px] md:w-[150px] h-[33px] xs:h-[40px] sm:h-[46px] md:h-[50px]">
//             <Image
//               src="/logo.png"
//               alt="ATS Pass"
//               fill
//               className="object-contain"
//               priority
//               sizes="(max-width: 480px) 100px, (max-width: 640px) 120px, (max-width: 768px) 140px, 150px"
//             />
//           </div>
//         </button>

//         <div className="nav-div" />
//         <div className="wizard">
//           {STEPS.map((s, i) => (
//             <React.Fragment key={s.id}>
//               {i > 0 && (
//                 <div
//                   className={`wz-line${i <= stepIdx ? " wz-line-done" : ""}`}
//                 />
//               )}
//               <div
//                 className={`wz${i < stepIdx ? " wz-done" : i === stepIdx ? " wz-on" : ""}`}
//                 onClick={() => setStep(s.id)}
//               >
//                 <div className="wz-num">
//                   {i < stepIdx ? (
//                     <svg viewBox="0 0 14 14" width="11" height="11">
//                       <polyline
//                         points="2,8 5,12 12,3"
//                         stroke="white"
//                         strokeWidth="2.2"
//                         fill="none"
//                       />
//                     </svg>
//                   ) : (
//                     i + 1
//                   )}
//                 </div>
//                 <span className="wz-lbl">{s.label}</span>
//               </div>
//             </React.Fragment>
//           ))}
//         </div>
//         <div className="nav-r">
//           <button
//             className="btn btn-g btn-sm"
//             onClick={() => {
//               rebuild();
//               setModal(true);
//             }}
//           >
//             ⛶ Preview
//           </button>
//           <button
//             className="btn btn-p btn-sm"
//             onClick={downloadPDF}
//             disabled={busy}
//           >
//             {busy ? "⏳" : "⬇"} PDF
//           </button>
//         </div>
//       </nav>

//       <div className="shell">
//         {/* ── LEFT ── */}
//         <div className="left">
//           <div className="left-hd">
//             <div className="eye-row">
//               <div className="eye-ico">{STEPS[stepIdx].icon}</div>
//               <span className="eye-txt">{STEPS[stepIdx].label}</span>
//             </div>
//             {step === "template" && (
//               <>
//                 <div className="pg-title">Choose Your Template</div>
//                 <div className="pg-sub">
//                   16 unique designs for every profession
//                 </div>
//               </>
//             )}
//             {step === "personal" && (
//               <>
//                 <div className="pg-title">Personal Information</div>
//                 <div className="pg-sub">Your details shown on the letter</div>
//                 <button className="pill-tip">💡 Pro Tips</button>
//               </>
//             )}
//             {step === "company" && (
//               <>
//                 <div className="pg-title">Company Details</div>
//                 <div className="pg-sub">Where you're applying</div>
//                 <button className="pill-tip">🎯 Tips</button>
//               </>
//             )}
//             {step === "content" && (
//               <>
//                 <div className="pg-title">Letter Content</div>
//                 <div className="pg-sub">Craft your compelling story</div>
//                 <button className="pill-tip">✨ AI Assist</button>
//               </>
//             )}
//             {step === "review" && (
//               <>
//                 <div className="pg-title">Review & Download</div>
//                 <div className="pg-sub">Everything looks good?</div>
//               </>
//             )}
//           </div>

//           <div className="left-body">
//             {/* TEMPLATE */}
//             {step === "template" && (
//               <>
//                 <div className="flt-row">
//                   {cats.map((c) => (
//                     <button
//                       key={c}
//                       className={`flt${filter === c ? " on" : ""}`}
//                       onClick={() => setFilter(c)}
//                     >
//                       {c}
//                     </button>
//                   ))}
//                 </div>
//                 <div className="tpl-grid">
//                   {shownTpls.map((t) => (
//                     <div
//                       key={t.id}
//                       className={`tpl-card${tplId === t.id ? " on" : ""}`}
//                       onClick={() => setTplId(t.id)}
//                     >
//                       <div className="tpl-thumb">
//                         <TplThumb id={t.id} />
//                       </div>
//                       <div className="tpl-chk">
//                         <svg viewBox="0 0 14 14">
//                           <polyline points="2,8 5,12 12,3" />
//                         </svg>
//                       </div>
//                       <div className="tpl-info">
//                         <div className="tpl-tag">{t.tag}</div>
//                         <div className="tpl-name">{t.name}</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}

//             {/* PERSONAL */}
//             {step === "personal" && (
//               <div className="card">
//                 <div className="card-hd">
//                   <div className="card-ico">👤</div>
//                   <div>
//                     <div className="card-t">Your Profile</div>
//                     <div className="card-s">
//                       All fields appear in your letter
//                     </div>
//                   </div>
//                 </div>
//                 <div className="g2">
//                   <F l="Full Name" ic="✏️" r>
//                     <input
//                       type="text"
//                       placeholder="Alexandra Chen"
//                       value={data.personal.fullName}
//                       onChange={(e) =>
//                         set(["personal", "fullName"], e.target.value)
//                       }
//                     />
//                   </F>
//                   <F l="Professional Title" ic="💼">
//                     <input
//                       type="text"
//                       placeholder="Senior UX Designer"
//                       value={data.personal.title}
//                       onChange={(e) =>
//                         set(["personal", "title"], e.target.value)
//                       }
//                     />
//                   </F>
//                 </div>
//                 <div className="g2">
//                   <F l="Email" ic="✉️" r>
//                     <input
//                       type="email"
//                       placeholder="alex@email.com"
//                       value={data.personal.email}
//                       onChange={(e) =>
//                         set(["personal", "email"], e.target.value)
//                       }
//                     />
//                   </F>
//                   <F l="Phone" ic="📞">
//                     <input
//                       type="tel"
//                       placeholder="+1 555 000 0000"
//                       value={data.personal.phone}
//                       onChange={(e) =>
//                         set(["personal", "phone"], e.target.value)
//                       }
//                     />
//                   </F>
//                 </div>
//                 <F l="Location" ic="📍">
//                   <input
//                     type="text"
//                     placeholder="San Francisco, CA"
//                     value={data.personal.location}
//                     onChange={(e) =>
//                       set(["personal", "location"], e.target.value)
//                     }
//                   />
//                 </F>
//                 <div className="hdiv" />
//                 <div className="slbl">
//                   🔗 Online Presence (shown as clickable links)
//                 </div>
//                 <F l="LinkedIn URL" ic="💼">
//                   <input
//                     type="text"
//                     placeholder="linkedin.com/in/alexchen"
//                     value={data.personal.linkedin}
//                     onChange={(e) =>
//                       set(["personal", "linkedin"], e.target.value)
//                     }
//                   />
//                 </F>
//                 <div className="g2">
//                   <F l="GitHub URL" ic="💻">
//                     <input
//                       type="text"
//                       placeholder="github.com/alexchen"
//                       value={data.personal.github}
//                       onChange={(e) =>
//                         set(["personal", "github"], e.target.value)
//                       }
//                     />
//                   </F>
//                   <F l="Portfolio / Website" ic="🌐">
//                     <input
//                       type="text"
//                       placeholder="alexchen.io"
//                       value={data.personal.website}
//                       onChange={(e) =>
//                         set(["personal", "website"], e.target.value)
//                       }
//                     />
//                   </F>
//                 </div>
//                 <div className="hdiv" />
//                 <F l="Professional Summary (optional)" ic="📝">
//                   <textarea
//                     placeholder="2–3 sentence summary of your experience and what makes you unique…"
//                     value={data.personal.summary}
//                     onChange={(e) =>
//                       set(["personal", "summary"], e.target.value)
//                     }
//                   />
//                 </F>
//                 <F l="Closing Salutation" ic="✍️">
//                   <input
//                     type="text"
//                     placeholder="Sincerely (default)"
//                     value={data.personal.signature}
//                     onChange={(e) =>
//                       set(["personal", "signature"], e.target.value)
//                     }
//                   />
//                 </F>
//               </div>
//             )}

//             {/* COMPANY */}
//             {step === "company" && (
//               <div className="card">
//                 <div className="card-hd">
//                   <div className="card-ico">🏢</div>
//                   <div>
//                     <div className="card-t">Company & Role</div>
//                     <div className="card-s">Application target details</div>
//                   </div>
//                 </div>
//                 <F l="Company Name" ic="🏢" r>
//                   <input
//                     type="text"
//                     placeholder="Google, Stripe, Airbnb…"
//                     value={data.company.name}
//                     onChange={(e) => set(["company", "name"], e.target.value)}
//                   />
//                 </F>
//                 <F l="Role Applying For" ic="🎯" r>
//                   <input
//                     type="text"
//                     placeholder="Senior UX Designer"
//                     value={data.company.jobTitle}
//                     onChange={(e) =>
//                       set(["company", "jobTitle"], e.target.value)
//                     }
//                   />
//                 </F>
//                 <div className="g2">
//                   <F l="Hiring Manager" ic="👤">
//                     <input
//                       type="text"
//                       placeholder="Sarah Johnson"
//                       value={data.company.hiringManager}
//                       onChange={(e) =>
//                         set(["company", "hiringManager"], e.target.value)
//                       }
//                     />
//                   </F>
//                   <F l="Their Title" ic="🏷️">
//                     <input
//                       type="text"
//                       placeholder="Head of Design"
//                       value={data.company.hiringManagerTitle}
//                       onChange={(e) =>
//                         set(["company", "hiringManagerTitle"], e.target.value)
//                       }
//                     />
//                   </F>
//                 </div>
//                 <div className="g2">
//                   <F l="City">
//                     <input
//                       className="bare"
//                       type="text"
//                       placeholder="Mountain View"
//                       value={data.company.city}
//                       onChange={(e) => set(["company", "city"], e.target.value)}
//                     />
//                   </F>
//                   <F l="State">
//                     <input
//                       className="bare"
//                       type="text"
//                       placeholder="CA"
//                       value={data.company.state}
//                       onChange={(e) =>
//                         set(["company", "state"], e.target.value)
//                       }
//                     />
//                   </F>
//                 </div>
//                 <div className="hdiv" />
//                 <F l="Where you found this job" ic="🔍">
//                   <input
//                     type="text"
//                     placeholder="LinkedIn, Referral, Company website…"
//                     value={data.company.jobSource}
//                     onChange={(e) =>
//                       set(["company", "jobSource"], e.target.value)
//                     }
//                   />
//                 </F>
//                 <F l="Referral Name (if any)" ic="🤝">
//                   <input
//                     type="text"
//                     placeholder="John Smith referred me"
//                     value={data.company.referral}
//                     onChange={(e) =>
//                       set(["company", "referral"], e.target.value)
//                     }
//                   />
//                 </F>
//               </div>
//             )}

//             {/* CONTENT */}
//             {step === "content" && (
//               <div className="card">
//                 <div className="card-hd">
//                   <div className="card-ico">✍️</div>
//                   <div>
//                     <div className="card-t">Letter Sections</div>
//                     <div className="card-s">Build paragraph by paragraph</div>
//                   </div>
//                 </div>

//                 {data.sections.map((s, i) => (
//                   <div key={s.id} className="sblock">
//                     <div className="shd">
//                       <div className="snum">{i + 1}</div>
//                       <input
//                         className="sti"
//                         value={s.title}
//                         onChange={(e) =>
//                           setSection(s.id, "title", e.target.value)
//                         }
//                         placeholder="Section title"
//                       />
//                       {data.sections.length > 1 && (
//                         <button
//                           className="sdel"
//                           onClick={() =>
//                             setData((p) => ({
//                               ...p,
//                               sections: p.sections.filter((x) => x.id !== s.id),
//                             }))
//                           }
//                         >
//                           ✕
//                         </button>
//                       )}
//                     </div>
//                     <textarea
//                       className="sta"
//                       rows={4}
//                       value={s.content}
//                       placeholder={s.placeholder}
//                       onChange={(e) =>
//                         setSection(s.id, "content", e.target.value)
//                       }
//                     />
//                   </div>
//                 ))}
//                 <button
//                   className="add-btn"
//                   onClick={() =>
//                     setData((p) => ({
//                       ...p,
//                       sections: [
//                         ...p.sections,
//                         {
//                           id: Date.now() + "",
//                           title: "New Section",
//                           content: "",
//                           placeholder: "Write here…",
//                         },
//                       ],
//                     }))
//                   }
//                 >
//                   + Add Section
//                 </button>

//                 <div className="hdiv" />
//                 <div className="slbl">🏆 Key Achievements</div>
//                 <div className="tag-row">
//                   <input
//                     className="tag-in"
//                     placeholder="e.g. Grew revenue 40% YoY"
//                     value={achIn}
//                     onChange={(e) => setAchIn(e.target.value)}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter" && achIn.trim()) {
//                         setData((p) => ({
//                           ...p,
//                           achievements: [...p.achievements, achIn.trim()],
//                         }));
//                         setAchIn("");
//                       }
//                     }}
//                   />
//                   <button
//                     className="tag-add"
//                     onClick={() => {
//                       if (achIn.trim()) {
//                         setData((p) => ({
//                           ...p,
//                           achievements: [...p.achievements, achIn.trim()],
//                         }));
//                         setAchIn("");
//                       }
//                     }}
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="tags">
//                   {data.achievements.map((a, i) => (
//                     <div key={i} className="tag-item">
//                       ⭐ {a}
//                       <button
//                         className="tag-rm"
//                         onClick={() =>
//                           setData((p) => ({
//                             ...p,
//                             achievements: p.achievements.filter(
//                               (_, j) => j !== i,
//                             ),
//                           }))
//                         }
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="hdiv" />
//                 <div className="slbl">🛠️ Core Skills / Tools</div>
//                 <div className="tag-row">
//                   <input
//                     className="tag-in"
//                     placeholder="e.g. Figma, React, After Effects…"
//                     value={sklIn}
//                     onChange={(e) => setSklIn(e.target.value)}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter" && sklIn.trim()) {
//                         setData((p) => ({
//                           ...p,
//                           skills: [...p.skills, sklIn.trim()],
//                         }));
//                         setSklIn("");
//                       }
//                     }}
//                   />
//                   <button
//                     className="tag-add"
//                     onClick={() => {
//                       if (sklIn.trim()) {
//                         setData((p) => ({
//                           ...p,
//                           skills: [...p.skills, sklIn.trim()],
//                         }));
//                         setSklIn("");
//                       }
//                     }}
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="tags">
//                   {data.skills.map((s, i) => (
//                     <div key={i} className="tag-item">
//                       🔧 {s}
//                       <button
//                         className="tag-rm"
//                         onClick={() =>
//                           setData((p) => ({
//                             ...p,
//                             skills: p.skills.filter((_, j) => j !== i),
//                           }))
//                         }
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="hdiv" />
//                 <div className="slbl">🎭 Tone of Voice</div>
//                 <div className="tone-row">
//                   {tones.map((t) => (
//                     <button
//                       key={t}
//                       className={`tone-btn${data.tone === t ? " on" : ""}`}
//                       onClick={() => setData((p) => ({ ...p, tone: t }))}
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="hdiv" />
//                 <div className="slbl">📝 Additional Notes</div>
//                 <textarea
//                   className="sta"
//                   rows={3}
//                   placeholder="Post-script, special circumstances, or extra context…"
//                   value={data.notes}
//                   onChange={(e) =>
//                     setData((p) => ({ ...p, notes: e.target.value }))
//                   }
//                 />
//               </div>
//             )}

//             {/* REVIEW */}
//             {step === "review" && (
//               <div className="card">
//                 <div className="card-hd">
//                   <div className="card-ico">✅</div>
//                   <div>
//                     <div className="card-t">Review Your Letter</div>
//                     <div className="card-s">
//                       Check everything before downloading
//                     </div>
//                   </div>
//                 </div>
//                 {[
//                   ["Template", tpl.name, "template"],
//                   ["Name", data.personal.fullName, "personal"],
//                   ["Title", data.personal.title, "personal"],
//                   ["Email", data.personal.email, "personal"],
//                   ["Phone", data.personal.phone, "personal"],
//                   ["LinkedIn", data.personal.linkedin, "personal"],
//                   ["GitHub", data.personal.github, "personal"],
//                   ["Portfolio", data.personal.website, "personal"],
//                   ["Company", data.company.name, "company"],
//                   ["Role", data.company.jobTitle, "company"],
//                   ["Hiring Manager", data.company.hiringManager, "company"],
//                   ["Tone", data.tone, "content"],
//                   [
//                     "Sections",
//                     data.sections.filter((s) => s.content).length + " written",
//                     "content",
//                   ],
//                   [
//                     "Achievements",
//                     data.achievements.length + " added",
//                     "content",
//                   ],
//                   ["Skills", data.skills.length + " added", "content"],
//                 ].map(([l, v, s]) => (
//                   <div key={l as string} className="review-row">
//                     <span className="review-lbl">{l}</span>
//                     <div
//                       style={{ display: "flex", alignItems: "center", gap: 8 }}
//                     >
//                       <span
//                         className="review-val"
//                         style={{ color: (v as string) ? undefined : "#d1d5db" }}
//                       >
//                         {(v as string) || "—"}
//                       </span>
//                       <button
//                         className="review-edit"
//                         onClick={() => setStep(s as Step)}
//                       >
//                         Edit
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//                 <div
//                   style={{
//                     marginTop: 20,
//                     padding: "16px",
//                     background: "var(--p10)",
//                     borderRadius: 14,
//                     border: "1.5px solid var(--p20)",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: 13,
//                       fontWeight: 700,
//                       color: "var(--ink)",
//                       marginBottom: 8,
//                     }}
//                   >
//                     ✅ Ready to Download
//                   </div>
//                   <div style={{ fontSize: 12.5, color: "var(--sub)" }}>
//                     Your cover letter is ready. Click "Download PDF" to save it,
//                     or use the preview to do a final check.
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* FOOTER NAV */}
//           <div className="left-ft">
//             <button
//               className="btn-bk"
//               disabled={stepIdx === 0}
//               onClick={() => setStep(STEPS[stepIdx - 1].id)}
//             >
//               ← {stepIdx > 0 ? `Back to ${STEPS[stepIdx - 1].label}` : "Back"}
//             </button>
//             {stepIdx < STEPS.length - 1 ? (
//               <button
//                 className="btn-nx"
//                 onClick={() => setStep(STEPS[stepIdx + 1].id)}
//               >
//                 Continue to {STEPS[stepIdx + 1].label} →
//               </button>
//             ) : (
//               <button className="btn-nx" onClick={downloadPDF} disabled={busy}>
//                 {busy ? "⏳ Generating…" : "⬇ Download PDF"}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* ── RIGHT (canvas) ── */}
//         <div className="right">
//           <div className="right-hd">
//             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//               <div className="live-dot" />
//               <div>
//                 <div className="right-t">Live Preview</div>
//                 <div className="right-s">Drag · Pinch · Scroll to navigate</div>
//               </div>
//             </div>
//             <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
//               <button
//                 className="btn btn-g btn-sm"
//                 style={{ fontSize: 11 }}
//                 onClick={() => setStep("template")}
//               >
//                 🎨 Change
//               </button>
//               <button
//                 className="btn btn-g btn-sm"
//                 onClick={() => {
//                   rebuild();
//                   setModal(true);
//                 }}
//               >
//                 ⛶ Fullscreen
//               </button>
//             </div>
//           </div>
//           <div className="right-body">
//             <CanvasPreview>
//               {html ? (
//                 <iframe
//                   ref={iframeRef}
//                   className="canvas-iframe"
//                   title="preview"
//                   sandbox="allow-same-origin"
//                 />
//               ) : (
//                 <div
//                   style={{
//                     width: 860,
//                     height: 1100,
//                     background: "white",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: 14,
//                     color: "#9ca3af",
//                     borderRadius: 8,
//                   }}
//                 >
//                   <div style={{ fontSize: 56, opacity: 0.18 }}>📄</div>
//                   <div style={{ fontWeight: 700, fontSize: 16 }}>
//                     Preview appears here
//                   </div>
//                   <div style={{ fontSize: 13 }}>
//                     Fill in your details to see the letter
//                   </div>
//                 </div>
//               )}
//             </CanvasPreview>
//           </div>
//         </div>
//       </div>

//       {/* MOBILE FAB */}
//       <button
//         className="mob-fab"
//         onClick={() => {
//           rebuild();
//           setModal(true);
//         }}
//       >
//         👁 Preview Letter
//       </button>

//       {/* FULLSCREEN MODAL */}
//       {modal && (
//         <div className="ov" onClick={() => setModal(false)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-hd">
//               <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                 <div className="modal-ico">📄</div>
//                 <div>
//                   <div style={{ fontSize: 14.5, fontWeight: 800 }}>
//                     {data.personal.fullName || "Cover Letter"}
//                   </div>
//                   <div style={{ fontSize: 11, color: "var(--sub)" }}>
//                     {tpl.name} · {tpl.tag}
//                   </div>
//                 </div>
//               </div>
//               <button className="modal-close" onClick={() => setModal(false)}>
//                 ✕
//               </button>
//             </div>
//             <div className="modal-body">
//               <CanvasPreview>
//                 <iframe
//                   ref={modalIframeRef}
//                   className="canvas-iframe"
//                   title="full-preview"
//                   sandbox="allow-same-origin"
//                 />
//               </CanvasPreview>
//             </div>
//             <div className="modal-ft">
//               <button className="btn btn-g" onClick={() => setModal(false)}>
//                 Close
//               </button>
//               <button
//                 className="btn btn-p"
//                 onClick={downloadPDF}
//                 disabled={busy}
//               >
//                 {busy ? "⏳ Generating…" : "⬇ Download PDF"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {toast && <div className="toast">{toast}</div>}
//     </>
//   );
// }

// // tiny field wrapper
// function F({
//   l,
//   ic,
//   r,
//   children,
// }: {
//   l: string;
//   ic?: string;
//   r?: boolean;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="fld">
//       <label className="fld-l">
//         {l}
//         {r && <span> *</span>}
//       </label>
//       <div className="iw">
//         {ic && <span className="iw-ic">{ic}</span>}
//         {children}
//       </div>
//     </div>
//   );
// }

"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiZoomIn, FiZoomOut, FiRefreshCw, FiEye } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/config/api";

/* ─────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────── */
interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  signature: string;
}
interface CompanyInfo {
  name: string;
  jobTitle: string;
  hiringManager: string;
  hiringManagerTitle: string;
  city: string;
  state: string;
  jobSource: string;
  referral: string;
}
interface Section {
  id: string;
  title: string;
  content: string;
  placeholder: string;
}
interface CLData {
  personal: PersonalInfo;
  company: CompanyInfo;
  sections: Section[];
  achievements: string[];
  skills: string[];
  tone: string;
  notes: string;
}

const BLANK: CLData = {
  personal: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
    signature: "",
  },
  company: {
    name: "",
    jobTitle: "",
    hiringManager: "",
    hiringManagerTitle: "",
    city: "",
    state: "",
    jobSource: "",
    referral: "",
  },
  sections: [
    {
      id: "1",
      title: "Opening Statement",
      content: "",
      placeholder:
        "Express your enthusiasm for the role. Mention where you found it and a compelling hook about why you're perfect for it…",
    },
    {
      id: "2",
      title: "Experience & Skills",
      content: "",
      placeholder:
        "Highlight 2–3 specific accomplishments with metrics. Show you can solve their exact problems…",
    },
    {
      id: "3",
      title: "Why This Company",
      content: "",
      placeholder:
        "Demonstrate genuine research — reference their mission, recent news, products, or culture…",
    },
    {
      id: "4",
      title: "Closing",
      content: "",
      placeholder:
        "Restate enthusiasm, include a clear call to action, mention your portfolio/work samples if applicable…",
    },
  ],
  achievements: [],
  skills: [],
  tone: "professional",
  notes: "",
};

/* ─────────────────────────────────────────────────────────────────
   CANVAS PREVIEW COMPONENT
───────────────────────────────────────────────────────────────── */
function CanvasPreview({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.58);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const scaleRef = useRef(0.58);
  const downPos = useRef<{ x: number; y: number } | null>(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const dragStarted = useRef(false);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const fn = () => {
      const w = window.innerWidth;
      const s =
        w < 480
          ? 0.36
          : w < 640
            ? 0.46
            : w < 768
              ? 0.54
              : w < 1024
                ? 0.6
                : w < 1280
                  ? 0.66
                  : 0.72;
      setScale(s);
      scaleRef.current = s;
    };
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  const smoothZoom = (target: number) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const from = scaleRef.current;
    const t0 = performance.now();
    const go = (now: number) => {
      const p = Math.min((now - t0) / 160, 1);
      const v = from + (target - from) * (1 - Math.pow(1 - p, 3));
      setScale(v);
      scaleRef.current = v;
      if (p < 1) animRef.current = requestAnimationFrame(go);
    };
    animRef.current = requestAnimationFrame(go);
  };
  const zoomIn = () => smoothZoom(Math.min(scaleRef.current + 0.1, 2.5));
  const zoomOut = () => smoothZoom(Math.max(scaleRef.current - 0.1, 0.2));
  const reset = () => {
    const w = window.innerWidth;
    smoothZoom(w < 640 ? 0.36 : 0.68);
    setPos({ x: 0, y: 0 });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const skip = (t: EventTarget | null) => {
      const tag = (t as HTMLElement)?.tagName ?? "";
      return (
        ["BUTTON", "INPUT", "A", "SELECT", "TEXTAREA"].includes(tag) ||
        !!(t as HTMLElement)?.closest?.("[data-nodrag]")
      );
    };
    const onDown = (e: MouseEvent) => {
      if (skip(e.target)) return;
      downPos.current = { x: e.clientX, y: e.clientY };
      dragStarted.current = false;
    };
    const onMove = (e: MouseEvent) => {
      if (!downPos.current) return;
      const dx = e.clientX - downPos.current.x,
        dy = e.clientY - downPos.current.y;
      if (!dragStarted.current && Math.hypot(dx, dy) > 5) {
        dragStarted.current = true;
        setDragging(true);
        startPosRef.current = {
          x: downPos.current.x - pos.x,
          y: downPos.current.y - pos.y,
        };
      }
      if (dragStarted.current) {
        e.preventDefault();
        setPos({
          x: e.clientX - startPosRef.current.x,
          y: e.clientY - startPosRef.current.y,
        });
      }
    };
    const onUp = () => {
      downPos.current = null;
      dragStarted.current = false;
      setDragging(false);
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const v = Math.max(
          0.2,
          Math.min(2.5, scaleRef.current * Math.exp(-e.deltaY * 0.002)),
        );
        setScale(v);
        scaleRef.current = v;
      } else {
        setPos((p) => ({ x: p.x - e.deltaX * 0.4, y: p.y - e.deltaY * 0.4 }));
      }
    };
    el.addEventListener("mousedown", onDown);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseup", onUp);
    el.addEventListener("mouseleave", onUp);
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseup", onUp);
      el.removeEventListener("mouseleave", onUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, [pos]);

  return (
    <div className="relative w-full h-full min-h-[420px]">
      {/* Canvas area */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden rounded-xl bg-indigo-50/60"
        style={{ cursor: dragging ? "grabbing" : "grab" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transformOrigin: "top left",
            transform: `translate(${pos.x}px,${pos.y}px) scale(${scale})`,
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        >
          {children}
        </div>
      </div>

      {/* Zoom badge */}
      <div
        data-nodrag
        className="absolute top-2.5 left-2.5 z-20 pointer-events-none bg-white/90 backdrop-blur-sm border border-indigo-100 text-indigo-600 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm"
      >
        {Math.round(scale * 100)}%
      </div>

      {/* Controls */}
      <div
        data-nodrag
        className="absolute bottom-3 right-3 z-20 flex flex-col gap-1.5"
      >
        {[
          {
            fn: zoomIn,
            icon: <FiZoomIn className="w-4 h-4" />,
            title: "Zoom In",
            primary: true,
          },
          {
            fn: zoomOut,
            icon: <FiZoomOut className="w-4 h-4" />,
            title: "Zoom Out",
            primary: true,
          },
          {
            fn: reset,
            icon: <FiRefreshCw className="w-3.5 h-3.5" />,
            title: "Reset",
            primary: false,
          },
        ].map((b, i) => (
          <motion.button
            key={i}
            type="button"
            title={b.title}
            onClick={b.fn}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md transition-shadow ${
              b.primary
                ? "bg-gradient-to-br from-indigo-600 to-violet-600 hover:shadow-indigo-300/50"
                : "bg-gray-700 hover:bg-gray-800"
            }`}
          >
            {b.icon}
          </motion.button>
        ))}
      </div>

      {/* Hint */}
      <p
        data-nodrag
        className="absolute bottom-3 left-2.5 z-20 pointer-events-none text-[10px] font-semibold text-indigo-400"
      >
        Drag · Scroll · Ctrl+Wheel
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SVG TEMPLATE THUMBNAILS  (real miniature previews)
───────────────────────────────────────────────────────────────── */
function TplThumb({ id }: { id: string }) {
  const W = 220,
    H = 155;
  switch (id) {
    case "aurora":
      return (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width={W} height={H} fill="#fff" />
          <rect width={W} height={52} fill="#4f46e5" />
          <circle cx={205} cy={0} r={52} fill="#6366f1" opacity=".45" />
          <rect
            x={13}
            y={13}
            width={88}
            height={8}
            rx={2}
            fill="rgba(255,255,255,.92)"
          />
          <rect
            x={13}
            y={25}
            width={54}
            height={4}
            rx={1.5}
            fill="rgba(255,255,255,.6)"
          />
          {[0, 36, 72].map((ox, i) => (
            <rect
              key={i}
              x={13 + ox}
              y={37}
              width={30}
              height={5}
              rx={10}
              fill="rgba(255,255,255,.2)"
              stroke="rgba(255,255,255,.35)"
              strokeWidth=".6"
            />
          ))}
          <rect x={13} y={62} width={40} height={3} rx={1} fill="#9ca3af" />
          {[69, 75, 81].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[130, 110, 120][i]}
              height={2.5}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
          <rect x={13} y={90} width={44} height={3} rx={1} fill="#6366f1" />
          {[97, 102, 107].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[180, 165, 175][i]}
              height={2.5}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
          <rect x={13} y={117} width={44} height={3} rx={1} fill="#6366f1" />
          {[124, 129].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[175, 120][i]}
              height={2.5}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
          <rect x={13} y={143} width={32} height={3} rx={1} fill="#9ca3af" />
          <rect x={13} y={149} width={55} height={3} rx={1} fill="#374151" />
        </svg>
      );
    case "obsidian":
      return (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width={W} height={H} fill="#fff" />
          <rect width={63} height={H} fill="#1e1b4b" />
          <rect
            x={7}
            y={13}
            width={47}
            height={7}
            rx={1.5}
            fill="rgba(233,213,255,.85)"
          />
          <rect
            x={7}
            y={24}
            width={34}
            height={3}
            rx={1}
            fill="rgba(165,180,252,.5)"
          />
          <rect
            x={7}
            y={36}
            width={47}
            height={0.8}
            fill="rgba(165,180,252,.15)"
          />
          {[
            ["Email", 44],
            ["Phone", 54],
            ["Location", 64],
            ["LinkedIn", 74],
            ["GitHub", 84],
            ["Portfolio", 94],
          ].map(([l, y], i) => (
            <g key={i}>
              <rect
                x={7}
                y={y as number}
                width={20}
                height={2}
                rx={1}
                fill="rgba(109,91,186,.7)"
              />
              <rect
                x={7}
                y={(y as number) + 6}
                width={46}
                height={2}
                rx={1}
                fill="rgba(196,181,253,.55)"
              />
            </g>
          ))}
          <rect x={72} y={13} width={32} height={2.5} rx={1} fill="#9ca3af" />
          {[20, 25].map((y, i) => (
            <rect
              key={i}
              x={72}
              y={y}
              width={[130, 100][i]}
              height={2.2}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
          <rect x={72} y={36} width={40} height={3} rx={1} fill="#7c3aed" />
          {[43, 48, 53].map((y, i) => (
            <rect
              key={i}
              x={72}
              y={y}
              width={[138, 125, 130][i]}
              height={2.2}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
          <rect x={72} y={64} width={40} height={3} rx={1} fill="#7c3aed" />
          {[71, 76, 81].map((y, i) => (
            <rect
              key={i}
              x={72}
              y={y}
              width={[138, 112, 120][i]}
              height={2.2}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
          <rect x={72} y={122} width={28} height={2} rx={1} fill="#9ca3af" />
          <rect x={72} y={129} width={52} height={3} rx={1} fill="#374151" />
        </svg>
      );
    case "nordic":
      return (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width={W} height={H} fill="#fff" />
          <rect x={16} y={13} width={62} height={3} rx={1} fill="#c7d2fe" />
          <rect x={16} y={20} width={118} height={10} rx={1.5} fill="#1e1b4b" />
          <rect x={16} y={34} width={38} height={3} rx={1} fill="#4f46e5" />
          <rect x={16} y={43} width={188} height={0.8} fill="#e0e7ff" />
          {[0, 62, 124].map((ox, i) => (
            <rect
              key={i}
              x={16 + ox}
              y={50}
              width={56}
              height={2}
              rx={1}
              fill="#9ca3af"
            />
          ))}
          <rect x={16} y={62} width={32} height={2.5} rx={1} fill="#9ca3af" />
          {[69, 74].map((y, i) => (
            <rect
              key={i}
              x={16}
              y={y}
              width={[188, 162][i]}
              height={2.2}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
          <rect x={16} y={84} width={44} height={3} rx={1} fill="#4338ca" />
          {[91, 96, 101].map((y, i) => (
            <rect
              key={i}
              x={16}
              y={y}
              width={[188, 162, 177][i]}
              height={2.2}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
          <rect x={16} y={111} width={44} height={3} rx={1} fill="#4338ca" />
          {[118, 123].map((y, i) => (
            <rect
              key={i}
              x={16}
              y={y}
              width={[188, 112][i]}
              height={2.2}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
          <rect x={16} y={138} width={30} height={2} rx={1} fill="#9ca3af" />
          <rect x={16} y={145} width={52} height={3} rx={1} fill="#374151" />
        </svg>
      );
    case "slate":
      return (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width={W} height={H} fill="#fff" />
          <rect x={13} y={13} width={92} height={9} rx={1.5} fill="#0f172a" />
          <rect x={13} y={26} width={55} height={3} rx={1} fill="#64748b" />
          <rect x={137} y={13} width={70} height={2.5} rx={1} fill="#475569" />
          {[19, 25, 31, 37].map((y, i) => (
            <rect
              key={i}
              x={137}
              y={y}
              width={[60, 70, 55, 65][i]}
              height={2}
              rx={1}
              fill="#94a3b8"
            />
          ))}
          <rect x={13} y={38} width={192} height={1.8} fill="#0f172a" />
          <rect
            x={13}
            y={46}
            width={72}
            height={5}
            rx={2}
            fill="#f1f5f9"
            stroke="#e2e8f0"
            strokeWidth=".5"
          />
          <rect
            x={15}
            y={47.5}
            width={48}
            height={1.5}
            rx={0.5}
            fill="#64748b"
          />
          <rect x={13} y={57} width={32} height={2.5} rx={1} fill="#9ca3af" />
          {[64, 69].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 158][i]}
              height={2.2}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
          <rect x={13} y={78} width={2.5} height={28} rx={1} fill="#334155" />
          {[78, 84, 89, 94].map((y, i) => (
            <rect
              key={i}
              x={19}
              y={y}
              width={i === 0 ? 38 : [180, 158, 168][i - 1]}
              height={2.2}
              rx={1}
              fill={i === 0 ? "#334155" : "#e5e7eb"}
            />
          ))}
          <rect x={13} y={106} width={2.5} height={22} rx={1} fill="#334155" />
          {[106, 112, 117].map((y, i) => (
            <rect
              key={i}
              x={19}
              y={y}
              width={i === 0 ? 38 : [180, 130][i - 1]}
              height={2.2}
              rx={1}
              fill={i === 0 ? "#334155" : "#e5e7eb"}
            />
          ))}
          <rect x={13} y={133} width={30} height={2} rx={1} fill="#9ca3af" />
          <rect x={13} y={140} width={52} height={3} rx={1} fill="#374151" />
        </svg>
      );
    case "crimson":
      return (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width={W} height={H} fill="#fffbf5" />
          <rect width={W} height={4.5} fill="#9f1239" />
          <text
            x={110}
            y={25}
            textAnchor="middle"
            fontSize={11}
            fontWeight="800"
            fill="#1a0a0d"
            fontFamily="Georgia,serif"
          >
            Alex Johnson
          </text>
          <text
            x={110}
            y={34}
            textAnchor="middle"
            fontSize={5.5}
            fill="#9f1239"
            fontFamily="Georgia,serif"
            fontStyle="italic"
          >
            Senior Product Manager
          </text>
          <text
            x={110}
            y={43}
            textAnchor="middle"
            fontSize={9}
            fill="#9f1239"
            letterSpacing={4}
          >
            ✦ ✦ ✦
          </text>
          {[14, 80, 148].map((x, i) => (
            <rect
              key={i}
              x={x}
              y={48}
              width={58}
              height={2}
              rx={1}
              fill="#9ca3af"
            />
          ))}
          <rect x={13} y={56} width={188} height={0.7} fill="#fce7ef" />
          <rect x={13} y={62} width={32} height={2} rx={1} fill="#9ca3af" />
          {[69, 74].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 158][i]}
              height={2.2}
              rx={1}
              fill="#6b7280"
            />
          ))}
          <rect x={13} y={83} width={42} height={3} rx={1} fill="#9f1239" />
          {[90, 95, 100].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 172, 178][i]}
              height={2.2}
              rx={1}
              fill="#6b7280"
            />
          ))}
          <rect x={13} y={110} width={42} height={3} rx={1} fill="#9f1239" />
          {[117, 122].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 142][i]}
              height={2.2}
              rx={1}
              fill="#6b7280"
            />
          ))}
          <rect x={13} y={140} width={30} height={2} rx={1} fill="#9ca3af" />
          <rect x={13} y={147} width={52} height={3} rx={1} fill="#374151" />
        </svg>
      );
    case "velvet":
      return (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="vlv" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e0f40" />
              <stop offset="100%" stopColor="#2d1b69" />
            </linearGradient>
          </defs>
          <rect width={W} height={H} fill="url(#vlv)" />
          <circle cx={192} cy={16} r={62} fill="rgba(168,85,247,.1)" />
          <rect x={13} y={14} width={82} height={9} rx={1.5} fill="#f3e8ff" />
          <rect x={13} y={27} width={52} height={2.5} rx={1} fill="#a78bfa" />
          <rect
            x={13}
            y={38}
            width={188}
            height={0.6}
            fill="rgba(196,181,253,.12)"
          />
          {[44, 51, 58, 65, 72].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[50, 45, 55, 60, 48][i]}
              height={4}
              rx={2}
              fill="rgba(196,181,253,.1)"
              stroke="rgba(196,181,253,.2)"
              strokeWidth=".6"
            />
          ))}
          <rect x={13} y={80} width={38} height={2.5} rx={1} fill="#c084fc" />
          {[87, 92, 97].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 172, 158][i]}
              height={2.2}
              rx={1}
              fill="rgba(212,201,239,.4)"
            />
          ))}
          <rect x={13} y={107} width={38} height={2.5} rx={1} fill="#c084fc" />
          {[114, 119].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 122][i]}
              height={2.2}
              rx={1}
              fill="rgba(212,201,239,.4)"
            />
          ))}
          <rect x={13} y={135} width={28} height={2} rx={1} fill="#7c6fa0" />
          <rect x={13} y={142} width={52} height={3} rx={1} fill="#f3e8ff" />
        </svg>
      );
    case "frost":
      return (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="frbg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
          </defs>
          <rect width={W} height={H} fill="url(#frbg)" />
          <rect
            x={5}
            y={5}
            width={210}
            height={145}
            rx={10}
            fill="rgba(255,255,255,.82)"
          />
          <rect
            x={5}
            y={5}
            width={210}
            height={50}
            rx={10}
            fill="rgba(12,74,110,.9)"
          />
          <rect
            x={5}
            y={31}
            width={210}
            height={24}
            fill="rgba(12,74,110,.9)"
          />
          <rect x={17} y={14} width={82} height={8} rx={1.5} fill="white" />
          <rect
            x={17}
            y={26}
            width={50}
            height={3}
            rx={1}
            fill="rgba(255,255,255,.65)"
          />
          {[0, 32, 66].map((ox, i) => (
            <rect
              key={i}
              x={17 + ox}
              y={38}
              width={28}
              height={4}
              rx={10}
              fill="rgba(255,255,255,.16)"
              stroke="rgba(255,255,255,.28)"
              strokeWidth=".5"
            />
          ))}
          <rect x={17} y={62} width={36} height={2.5} rx={1} fill="#9ca3af" />
          {[69, 74].map((y, i) => (
            <rect
              key={i}
              x={17}
              y={y}
              width={[185, 158][i]}
              height={2.2}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
          <rect x={17} y={84} width={42} height={3} rx={1} fill="#0369a1" />
          {[91, 96, 101].map((y, i) => (
            <rect
              key={i}
              x={17}
              y={y}
              width={[185, 172, 178][i]}
              height={2.2}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
          <rect x={17} y={111} width={42} height={3} rx={1} fill="#0369a1" />
          {[118, 123].map((y, i) => (
            <rect
              key={i}
              x={17}
              y={y}
              width={[185, 132][i]}
              height={2.2}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
          <rect x={17} y={136} width={28} height={2} rx={1} fill="#9ca3af" />
          <rect x={17} y={143} width={52} height={3} rx={1} fill="#374151" />
        </svg>
      );
    case "canvas":
      return (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width={W} height={H} fill="#fff" />
          <rect x={13} y={13} width={4} height={58} rx={2} fill="#6366f1" />
          <rect x={22} y={13} width={92} height={10} rx={2} fill="#111827" />
          <rect x={22} y={27} width={57} height={4} rx={1.5} fill="#6b7280" />
          {[35, 41, 47].map((y, i) => (
            <rect
              key={i}
              x={22}
              y={y}
              width={[70, 58, 74][i]}
              height={2.5}
              rx={1}
              fill="#9ca3af"
            />
          ))}
          <rect x={13} y={76} width={188} height={1} fill="#f3f4f6" />
          <rect x={13} y={82} width={32} height={2.5} rx={1} fill="#9ca3af" />
          {[89, 94].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 158][i]}
              height={2.2}
              rx={1}
              fill="#f3f4f6"
            />
          ))}
          <rect x={13} y={104} width={44} height={3} rx={1} fill="#6366f1" />
          {[111, 116, 121].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 172, 178][i]}
              height={2.2}
              rx={1}
              fill="#f3f4f6"
            />
          ))}
          <rect x={13} y={131} width={44} height={3} rx={1} fill="#6366f1" />
          {[138, 143].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 122][i]}
              height={2.2}
              rx={1}
              fill="#f3f4f6"
            />
          ))}
        </svg>
      );
    case "designer":
      return (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="dsg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d0d0d" />
              <stop offset="100%" stopColor="#1a0a2e" />
            </linearGradient>
          </defs>
          <rect width={W} height={H} fill="#faf5ff" />
          <rect width={70} height={H} fill="url(#dsg)" />
          <circle
            cx={35}
            cy={70}
            r={25}
            fill="rgba(139,92,246,.15)"
            stroke="rgba(139,92,246,.3)"
            strokeWidth="1"
          />
          <text
            x={35}
            y={74}
            textAnchor="middle"
            fontSize={14}
            fill="rgba(167,139,250,.8)"
          >
            ✦
          </text>
          <rect x={8} y={13} width={52} height={8} rx={1.5} fill="white" />
          <rect
            x={8}
            y={25}
            width={36}
            height={2.5}
            rx={1}
            fill="rgba(167,139,250,.7)"
          />
          <rect
            x={8}
            y={110}
            width={52}
            height={0.8}
            fill="rgba(167,139,250,.2)"
          />
          {[116, 123, 130, 137, 144].map((y, i) => (
            <rect
              key={i}
              x={8}
              y={y}
              width={52}
              height={2.5}
              rx={1}
              fill="rgba(196,181,253,.45)"
            />
          ))}
          <rect x={80} y={13} width={77} height={9} rx={1.5} fill="#111827" />
          <rect x={80} y={26} width={50} height={2.5} rx={1} fill="#6b7280" />
          <rect x={80} y={75} width={50} height={3} rx={1} fill="#7c3aed" />
          {[82, 87, 92, 97].map((y, i) => (
            <rect
              key={i}
              x={80}
              y={y}
              width={[130, 120, 118, 128][i]}
              height={2.2}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
          <rect x={80} y={107} width={50} height={3} rx={1} fill="#7c3aed" />
          {[114, 119].map((y, i) => (
            <rect
              key={i}
              x={80}
              y={y}
              width={[130, 90][i]}
              height={2.2}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
        </svg>
      );
    case "editor":
      return (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width={W} height={H} fill="#0f0a1e" />
          <rect x={13} y={13} width={94} height={10} rx={1.5} fill="white" />
          <rect x={13} y={27} width={57} height={3} rx={1} fill="#f43f5e" />
          <rect
            x={13}
            y={35}
            width={188}
            height={0.8}
            fill="rgba(244,63,94,.2)"
          />
          {[41, 47, 53].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[62, 56, 72][i]}
              height={4}
              rx={2}
              fill="rgba(244,63,94,.1)"
              stroke="rgba(244,63,94,.3)"
              strokeWidth=".6"
            />
          ))}
          <rect x={13} y={65} width={32} height={2} rx={1} fill="#64748b" />
          {[72, 77].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 152][i]}
              height={2.2}
              rx={1}
              fill="rgba(148,163,184,.3)"
            />
          ))}
          <rect x={13} y={87} width={2} height={2.5} rx={0.5} fill="#f43f5e" />
          <rect x={19} y={87} width={38} height={2.5} rx={1} fill="#f43f5e" />
          {[94, 99, 104].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 172, 158][i]}
              height={2.2}
              rx={1}
              fill="rgba(148,163,184,.28)"
            />
          ))}
          <rect x={13} y={114} width={2} height={2.5} rx={0.5} fill="#f43f5e" />
          <rect x={19} y={114} width={38} height={2.5} rx={1} fill="#f43f5e" />
          {[121, 126].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 122][i]}
              height={2.2}
              rx={1}
              fill="rgba(148,163,184,.28)"
            />
          ))}
          <rect x={13} y={140} width={30} height={2} rx={1} fill="#64748b" />
          <rect x={13} y={147} width={52} height={3} rx={1} fill="white" />
        </svg>
      );
    case "pearl":
      return (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width={W} height={H} fill="#fff" />
          <rect x={13} y={13} width={97} height={10} rx={1.5} fill="#111827" />
          <rect x={13} y={27} width={60} height={3.5} rx={1} fill="#6366f1" />
          <rect x={13} y={36} width={188} height={0.6} fill="#e5e7eb" />
          {[42, 48].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[62, 54][i]}
              height={2}
              rx={1}
              fill="#9ca3af"
            />
          ))}
          <rect x={92} y={42} width={57} height={2} rx={1} fill="#9ca3af" />
          <rect x={155} y={42} width={46} height={2} rx={1} fill="#9ca3af" />
          <rect x={13} y={58} width={188} height={0.6} fill="#e5e7eb" />
          <rect x={13} y={64} width={32} height={2} rx={1} fill="#9ca3af" />
          {[71, 76].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 158][i]}
              height={2.2}
              rx={1}
              fill="#f3f4f6"
            />
          ))}
          <rect x={13} y={87} width={44} height={3} rx={1} fill="#6366f1" />
          {[94, 99, 104].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 172, 178][i]}
              height={2.2}
              rx={1}
              fill="#f3f4f6"
            />
          ))}
          <rect x={13} y={115} width={44} height={3} rx={1} fill="#6366f1" />
          {[122, 127].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 122][i]}
              height={2.2}
              rx={1}
              fill="#f3f4f6"
            />
          ))}
          <rect x={13} y={140} width={28} height={2} rx={1} fill="#9ca3af" />
          <rect x={13} y={147} width={52} height={3} rx={1} fill="#374151" />
        </svg>
      );
    case "ivory":
      return (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width={W} height={H} fill="#fefce8" />
          <rect x={13} y={13} width={5} height={130} rx={2.5} fill="#ca8a04" />
          <rect x={23} y={13} width={90} height={10} rx={2} fill="#1c1917" />
          <rect x={23} y={27} width={56} height={3.5} rx={1.5} fill="#78350f" />
          <rect x={23} y={36} width={188} height={0.8} fill="#fde68a" />
          {[42, 48, 54].map((y, i) => (
            <rect
              key={i}
              x={23}
              y={y}
              width={[62, 54, 74][i]}
              height={2}
              rx={1}
              fill="#92400e"
            />
          ))}
          <rect x={23} y={64} width={32} height={2.5} rx={1} fill="#9ca3af" />
          {[71, 76].map((y, i) => (
            <rect
              key={i}
              x={23}
              y={y}
              width={[178, 150][i]}
              height={2.2}
              rx={1}
              fill="#e7e5e4"
            />
          ))}
          <rect x={23} y={86} width={44} height={3} rx={1} fill="#b45309" />
          {[93, 98, 103].map((y, i) => (
            <rect
              key={i}
              x={23}
              y={y}
              width={[178, 164, 172][i]}
              height={2.2}
              rx={1}
              fill="#e7e5e4"
            />
          ))}
          <rect x={23} y={113} width={44} height={3} rx={1} fill="#b45309" />
          {[120, 125].map((y, i) => (
            <rect
              key={i}
              x={23}
              y={y}
              width={[178, 114][i]}
              height={2.2}
              rx={1}
              fill="#e7e5e4"
            />
          ))}
          <rect x={23} y={139} width={28} height={2} rx={1} fill="#9ca3af" />
          <rect x={23} y={146} width={52} height={3} rx={1} fill="#1c1917" />
        </svg>
      );
    case "motion":
      return (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mtg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <rect width={W} height={H} fill="#fff" />
          <rect width={W} height={5.5} fill="url(#mtg)" />
          <rect x={13} y={14} width={94} height={11} rx={1.5} fill="#111827" />
          <rect x={13} y={29} width={62} height={3.5} rx={1} fill="#ec4899" />
          <rect x={13} y={38} width={188} height={0.6} fill="#fce7f3" />
          {[44, 50, 56].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[57, 50, 66][i]}
              height={4}
              rx={10}
              fill="rgba(236,72,153,.1)"
              stroke="rgba(236,72,153,.3)"
              strokeWidth=".7"
            />
          ))}
          <rect x={13} y={67} width={32} height={2.5} rx={1} fill="#9ca3af" />
          {[74, 79].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 158][i]}
              height={2.2}
              rx={1}
              fill="#f3f4f6"
            />
          ))}
          <rect x={13} y={89} width={44} height={3} rx={1} fill="#ec4899" />
          {[96, 101, 106].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 172, 178][i]}
              height={2.2}
              rx={1}
              fill="#f3f4f6"
            />
          ))}
          <rect x={13} y={116} width={44} height={3} rx={1} fill="#ec4899" />
          {[123, 128].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 122][i]}
              height={2.2}
              rx={1}
              fill="#f3f4f6"
            />
          ))}
          <rect width={W} height={3} y={152} fill="url(#mtg)" />
        </svg>
      );
    case "architect":
      return (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width={W} height={H} fill="#f8fafc" />
          <rect x={13} y={13} width={82} height={10} rx={1.5} fill="#0f172a" />
          <rect x={13} y={27} width={52} height={3} rx={1} fill="#334155" />
          <rect x={113} y={13} width={94} height={40} rx={5} fill="#0f172a" />
          {[18, 24, 30, 36].map((y, i) => (
            <rect
              key={i}
              x={119}
              y={y}
              width={[62, 52, 72, 46][i]}
              height={2}
              rx={1}
              fill="rgba(255,255,255,.58)"
            />
          ))}
          <rect x={13} y={53} width={192} height={1.2} fill="#e2e8f0" />
          <rect x={13} y={60} width={32} height={2.5} rx={1} fill="#9ca3af" />
          {[67, 72].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 158][i]}
              height={2.2}
              rx={1}
              fill="#e2e8f0"
            />
          ))}
          <rect x={13} y={82} width={44} height={3} rx={1} fill="#0f172a" />
          {[89, 94, 99].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 172, 178][i]}
              height={2.2}
              rx={1}
              fill="#e2e8f0"
            />
          ))}
          <rect x={13} y={109} width={44} height={3} rx={1} fill="#0f172a" />
          {[116, 121].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 122][i]}
              height={2.2}
              rx={1}
              fill="#e2e8f0"
            />
          ))}
          <rect x={13} y={136} width={30} height={2} rx={1} fill="#9ca3af" />
          <rect x={13} y={143} width={52} height={3} rx={1} fill="#374151" />
        </svg>
      );
    case "serif":
      return (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width={W} height={H} fill="#fff" />
          <rect x={13} y={13} width={192} height={0.8} fill="#1e293b" />
          <text
            x={110}
            y={30}
            textAnchor="middle"
            fontSize={13}
            fontWeight="800"
            fill="#1e293b"
            fontFamily="Georgia,serif"
          >
            Alexander Johnson
          </text>
          <text
            x={110}
            y={40}
            textAnchor="middle"
            fontSize={5.5}
            fill="#64748b"
            fontFamily="Georgia,serif"
          >
            Senior Product Designer · UX Strategist
          </text>
          <rect x={13} y={45} width={192} height={0.8} fill="#1e293b" />
          {[14, 80, 150].map((x, i) => (
            <rect
              key={i}
              x={x}
              y={51}
              width={[60, 64, 52][i]}
              height={2}
              rx={1}
              fill="#6366f1"
            />
          ))}
          <rect x={13} y={59} width={192} height={0.5} fill="#e5e7eb" />
          <rect x={13} y={65} width={32} height={2.5} rx={1} fill="#9ca3af" />
          {[72, 77].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 158][i]}
              height={2.2}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
          <rect x={13} y={87} width={42} height={3} rx={1} fill="#4338ca" />
          {[94, 99, 104].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 172, 178][i]}
              height={2.2}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
          <rect x={13} y={114} width={42} height={3} rx={1} fill="#4338ca" />
          {[121, 126].map((y, i) => (
            <rect
              key={i}
              x={13}
              y={y}
              width={[188, 122][i]}
              height={2.2}
              rx={1}
              fill="#e5e7eb"
            />
          ))}
          <rect x={13} y={149} width={192} height={0.8} fill="#e5e7eb" />
        </svg>
      );
    default:
      return (
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
          <rect width={W} height={H} fill="#f3f4f6" />
        </svg>
      );
  }
}

/* ─────────────────────────────────────────────────────────────────
   TEMPLATES CONFIG
───────────────────────────────────────────────────────────────── */
const TEMPLATES = [
  { id: "aurora", name: "Aurora", tag: "Modern", accent: "#6366f1" },
  { id: "obsidian", name: "Obsidian", tag: "Executive", accent: "#7c3aed" },
  { id: "nordic", name: "Nordic", tag: "Minimal", accent: "#4338ca" },
  { id: "slate", name: "Slate", tag: "Corporate", accent: "#1e293b" },
  { id: "crimson", name: "Crimson", tag: "Editorial", accent: "#9f1239" },
  { id: "velvet", name: "Velvet", tag: "Luxury", accent: "#6d28d9" },
  { id: "frost", name: "Frost", tag: "Clean", accent: "#0369a1" },
  { id: "canvas", name: "Canvas", tag: "Minimal", accent: "#6366f1" },
  { id: "designer", name: "Designer", tag: "Creative", accent: "#7c3aed" },
  { id: "editor", name: "Director", tag: "Video", accent: "#f43f5e" },
  { id: "pearl", name: "Pearl", tag: "White", accent: "#6366f1" },
  { id: "ivory", name: "Ivory", tag: "Classic", accent: "#b45309" },
  { id: "motion", name: "Motion", tag: "Video", accent: "#ec4899" },
  { id: "architect", name: "Architect", tag: "Corporate", accent: "#0f172a" },
  { id: "serif", name: "Serif", tag: "Classic", accent: "#4338ca" },
];

/* ─────────────────────────────────────────────────────────────────
   HTML BUILDER  — all 15 templates with clickable links
───────────────────────────────────────────────────────────────── */
function buildHTML(id: string, d: CLData): string {
  const dt = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const nm = d.personal.fullName || "Your Name";
  const ttl = d.personal.title || "Professional";
  const mgr = d.company.hiringManager || "Hiring Manager";
  const loc = [d.company.city, d.company.state].filter(Boolean).join(", ");

  const chip = (v: string, href: string) =>
    href
      ? `<a href="${href}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none">${v}</a>`
      : v;

  const allContacts: string[] = [
    d.personal.email
      ? chip(d.personal.email, `mailto:${d.personal.email}`)
      : "",
    d.personal.phone ? chip(d.personal.phone, `tel:${d.personal.phone}`) : "",
    d.personal.location ? d.personal.location : "",
    d.personal.linkedin
      ? chip(
          d.personal.linkedin,
          `https://${d.personal.linkedin.replace(/^https?:\/\//, "")}`,
        )
      : "",
    d.personal.github
      ? chip(
          d.personal.github,
          `https://${d.personal.github.replace(/^https?:\/\//, "")}`,
        )
      : "",
    d.personal.website
      ? chip(
          d.personal.website,
          `https://${d.personal.website.replace(/^https?:\/\//, "")}`,
        )
      : "",
  ].filter(Boolean);

  const addrBlock = `<div style="margin-bottom:20px;font-size:13px;line-height:1.9;color:#4a5568"><strong style="color:#1a202c">${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>${d.company.name}${loc ? `<br>${loc}` : ""}</div>`;

  const secRows = (color: string, border = false) =>
    d.sections
      .filter((s) => s.content.trim())
      .map(
        (s) => `
      <div style="margin-bottom:24px${border ? `;padding-left:14px;border-left:3px solid ${color}` : ""}">
        <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${color};margin:0 0 8px">${s.title}</h4>
        <p style="line-height:1.85;margin:0;font-size:13.5px">${s.content.replace(/\n/g, "<br>")}</p>
      </div>`,
      )
      .join("");

  const achBlock = (color: string) =>
    !d.achievements.length
      ? ""
      : `
    <div style="margin:18px 0 22px">
      <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${color};margin:0 0 10px">Key Achievements</h4>
      ${d.achievements.map((a) => `<div style="display:flex;gap:9px;margin-bottom:7px;font-size:13px"><span style="color:${color};flex-shrink:0;line-height:1.5">›</span>${a}</div>`).join("")}
    </div>`;

  const skillBlock = (color: string) =>
    !d.skills.length
      ? ""
      : `
    <div style="margin:16px 0 22px">
      <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${color};margin:0 0 10px">Core Skills</h4>
      <div style="display:flex;flex-wrap:wrap;gap:7px">${d.skills.map((s) => `<span style="padding:4px 12px;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.08);border-radius:30px;font-size:12px">${s}</span>`).join("")}</div>
    </div>`;

  const notesBlock = d.notes
    ? `<div style="margin:14px 0;padding:12px 16px;background:rgba(0,0,0,.03);border-left:3px solid #e2e8f0;font-size:12.5px;line-height:1.7;color:#64748b">${d.notes}</div>`
    : "";

  const closing = (col: string) => `
    <div style="margin-top:36px;font-size:13.5px">
      ${d.personal.signature || "Sincerely"},<br><br>
      <strong style="font-size:15px">${nm}</strong>
      ${d.personal.email ? `<br><a href="mailto:${d.personal.email}" style="font-size:12px;color:${col};text-decoration:none">${d.personal.email}</a>` : ""}
      ${d.personal.linkedin ? `<br><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" style="font-size:11.5px;color:#64748b;text-decoration:none" target="_blank">${d.personal.linkedin}</a>` : ""}
      ${d.personal.website ? `<br><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" style="font-size:11.5px;color:#64748b;text-decoration:none" target="_blank">${d.personal.website}</a>` : ""}
    </div>`;

  const greet = (col = "") =>
    `<div style="font-size:16px;font-weight:600;margin-bottom:22px;color:${col || "#111827"}">Dear ${mgr},</div>`;

  const base = (css: string, body: string) =>
    `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box}body{-webkit-print-color-adjust:exact;print-color-adjust:exact}${css}</style></head><body>${body}</body></html>`;

  if (id === "aurora")
    return base(
      `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
    body{font-family:'DM Sans',sans-serif;color:#374151}.pg{max-width:860px;margin:0 auto}
    .hdr{background:linear-gradient(135deg,#4f46e5,#7c3aed 60%,#a78bfa);padding:52px 56px 44px;color:white;position:relative;overflow:hidden}
    .hdr::before{content:'';position:absolute;right:-80px;top:-80px;width:280px;height:280px;background:rgba(255,255,255,.07);border-radius:50%}
    .nm{font-size:38px;font-weight:700;letter-spacing:-1.5px;margin-bottom:5px;position:relative}
    .rl{font-size:14px;opacity:.85;margin-bottom:26px;position:relative}
    .chips{display:flex;flex-wrap:wrap;gap:7px;position:relative}
    .chip{padding:5px 14px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:40px;font-size:11.5px}
    .chip a,.chip{color:white}
    .body{padding:48px 56px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
      `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
    <div class="chips">${allContacts.map((c) => `<span class="chip">${c}</span>`).join("")}</div></div>
    <div class="body"><div class="dt">${dt}</div>${addrBlock}${greet()}${secRows("#6366f1")}${achBlock("#6366f1")}${skillBlock("#6366f1")}${notesBlock}${closing("#6366f1")}</div></div>`,
    );

  if (id === "obsidian")
    return base(
      `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@300;400;500&display=swap');
    body{font-family:'Inter',sans-serif;color:#374151}.pg{max-width:900px;margin:0 auto;display:flex;min-height:100vh}
    .side{width:260px;background:#1e1b4b;color:white;padding:44px 26px;flex-shrink:0}
    .snm{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;color:#e9d5ff;line-height:1.2;margin-bottom:6px}
    .srl{font-size:10px;color:#a5b4fc;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:30px;padding-bottom:26px;border-bottom:1px solid rgba(165,180,252,.2)}
    .slbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#6d5bba;margin-bottom:6px;margin-top:20px}
    .sv{font-size:11.5px;color:#c4b5fd;line-height:1.9;word-break:break-all}.sv a{color:#c4b5fd;text-decoration:none}
    .main{flex:1;padding:48px 44px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
      `<div class="pg"><div class="side"><div class="snm">${nm}</div><div class="srl">${ttl}</div>
    ${d.personal.email ? `<div class="slbl">Email</div><div class="sv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></div>` : ""}
    ${d.personal.phone ? `<div class="slbl">Phone</div><div class="sv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></div>` : ""}
    ${d.personal.location ? `<div class="slbl">Location</div><div class="sv">${d.personal.location}</div>` : ""}
    ${d.personal.linkedin ? `<div class="slbl">LinkedIn</div><div class="sv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></div>` : ""}
    ${d.personal.github ? `<div class="slbl">GitHub</div><div class="sv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></div>` : ""}
    ${d.personal.website ? `<div class="slbl">Portfolio</div><div class="sv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></div>` : ""}
    ${d.skills.length ? `<div class="slbl" style="margin-top:28px">Skills</div>${d.skills.map((s) => `<div style="font-size:11.5px;color:#c4b5fd;margin-bottom:4px">• ${s}</div>`).join("")}` : ""}
    <div style="color:#7c3aed;opacity:.45;font-size:18px;margin-top:22px;letter-spacing:4px">✦ ✦ ✦</div>
    </div>
    <div class="main"><div class="dt">${dt}</div>${addrBlock}${greet()}${secRows("#7c3aed")}${achBlock("#7c3aed")}${notesBlock}${closing("#7c3aed")}</div></div>`,
    );

  if (id === "nordic")
    return base(
      `@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
    body{font-family:'DM Sans',sans-serif;color:#374151}.pg{max-width:750px;margin:0 auto;padding:64px 72px}
    .eye{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#4f46e5;margin-bottom:10px}
    .nm{font-family:'Libre Baskerville',serif;font-size:44px;font-weight:700;letter-spacing:-2px;color:#1e1b4b;line-height:1.05}
    .bar{width:52px;height:3px;background:#4f46e5;margin:16px 0 18px}
    .ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:40px}
    .cv{font-size:12px;color:#6b7280}.cv a{color:#4f46e5;text-decoration:none}
    .div{height:1px;background:#e0e7ff;margin:24px 0}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
      `<div class="pg"><div class="eye">${ttl}</div><div class="nm">${nm}</div><div class="bar"></div>
    <div class="ctrow">
    ${d.personal.email ? `<span class="cv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
    ${d.personal.phone ? `<span class="cv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></span>` : ""}
    ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
    ${d.personal.linkedin ? `<span class="cv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
    ${d.personal.github ? `<span class="cv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></span>` : ""}
    ${d.personal.website ? `<span class="cv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></span>` : ""}
    </div><div class="div"></div>
    <div class="dt">${dt}</div>${addrBlock}${greet()}${secRows("#4338ca")}${achBlock("#4338ca")}${skillBlock("#4338ca")}${notesBlock}${closing("#4338ca")}</div>`,
    );

  if (id === "slate")
    return base(
      `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
    body{font-family:'IBM Plex Sans',sans-serif;color:#374151}.pg{max-width:880px;margin:0 auto}
    .hdr{padding:44px 52px;border-bottom:3px solid #0f172a;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}
    .nm{font-size:34px;font-weight:700;color:#0f172a;letter-spacing:-1.5px}.rl{font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-top:7px}
    .cc{text-align:right}.cv{font-size:11.5px;color:#475569;font-family:'IBM Plex Mono',monospace;line-height:2.1;display:block;word-break:break-all}.cv a{color:#4f46e5;text-decoration:none}
    .tag{display:inline-block;font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:#64748b;background:#f1f5f9;border:1px solid #e2e8f0;padding:3px 10px;border-radius:4px;margin-bottom:22px}
    .body{padding:40px 52px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:20px}`,
      `<div class="pg"><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>
    <div class="cc">
    ${d.personal.email ? `<a class="cv" href="mailto:${d.personal.email}">${d.personal.email}</a>` : ""}
    ${d.personal.phone ? `<a class="cv" href="tel:${d.personal.phone}">${d.personal.phone}</a>` : ""}
    ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
    ${d.personal.linkedin ? `<a class="cv" href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a>` : ""}
    ${d.personal.github ? `<a class="cv" href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a>` : ""}
    ${d.personal.website ? `<a class="cv" href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a>` : ""}
    </div></div>
    <div class="body"><div class="tag">RE: ${d.company.jobTitle || "Open Position"} · ${d.company.name || "Company"}</div>
    <div class="dt">${dt}</div>${addrBlock}${greet()}${secRows("#334155", true)}${achBlock("#334155")}${skillBlock("#334155")}${notesBlock}${closing("#334155")}</div></div>`,
    );

  if (id === "crimson")
    return base(
      `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Lora:wght@400;500&display=swap');
    body{font-family:'Lora',serif;color:#374151;background:#fffbf5}.pg{max-width:800px;margin:0 auto;background:#fffbf5}
    .top{height:5px;background:#9f1239}.hdr{padding:48px 56px 16px;text-align:center}
    .nm{font-family:'Playfair Display',serif;font-size:44px;font-weight:900;color:#1a0a0d;letter-spacing:-2px;line-height:1}
    .rl{font-family:'Playfair Display',serif;font-style:italic;font-size:15px;color:#9f1239;margin:9px 0 16px}
    .orn{color:#9f1239;font-size:12px;letter-spacing:5px}
    .ctrow{display:flex;justify-content:center;flex-wrap:wrap;gap:5px 16px;padding:12px 0;font-size:12px;color:#6b7280}
    .ctrow a{color:#9f1239;text-decoration:none}
    .sep{display:flex;align-items:center;gap:10px;padding:0 56px;margin-bottom:4px}
    .sl{flex:1;height:1px;background:#fecdd3}.sd{width:5px;height:5px;background:#9f1239;border-radius:50%;flex-shrink:0}
    .body{padding:24px 56px 52px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:20px}`,
      `<div class="pg"><div class="top"></div><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="orn">✦ ✦ ✦</div>
    <div class="ctrow">
    ${d.personal.email ? `<a href="mailto:${d.personal.email}">${d.personal.email}</a>` : ""}
    ${d.personal.phone ? `<a href="tel:${d.personal.phone}">${d.personal.phone}</a>` : ""}
    ${d.personal.location ? `<span>${d.personal.location}</span>` : ""}
    ${d.personal.linkedin ? `<a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a>` : ""}
    ${d.personal.github ? `<a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a>` : ""}
    ${d.personal.website ? `<a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a>` : ""}
    </div></div>
    <div class="sep"><div class="sl"></div><div class="sd"></div><div class="sl"></div></div>
    <div class="body"><div class="dt">${dt}</div>${addrBlock}${greet()}${secRows("#9f1239")}${achBlock("#9f1239")}${notesBlock}${closing("#9f1239")}</div></div>`,
    );

  if (id === "velvet")
    return base(
      `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500;600&display=swap');
    body{font-family:'Raleway',sans-serif;background:#0f082a;color:#d4c9ef;min-height:100vh}
    .pg{max-width:860px;margin:0 auto;background:linear-gradient(160deg,#1e0f40,#2d1b69);min-height:100vh}
    .hdr{padding:52px 52px 38px;border-bottom:1px solid rgba(196,181,253,.12);position:relative;overflow:hidden}
    .hdr::after{content:'';position:absolute;right:-40px;top:-40px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(168,85,247,.14),transparent 70%)}
    .nm{font-family:'Cinzel',serif;font-size:36px;font-weight:600;color:#f3e8ff;letter-spacing:2px}
    .rl{font-size:10.5px;letter-spacing:3px;text-transform:uppercase;color:#a78bfa;margin:12px 0 20px}
    .chips{display:flex;flex-wrap:wrap;gap:7px}.chip{padding:4px 12px;border:1px solid rgba(196,181,253,.22);color:#c4b5fd;font-size:11px;border-radius:4px}
    .chip a{color:#c4b5fd;text-decoration:none}.body{padding:44px 52px}.dt{font-size:12px;color:#7c6fa0;margin-bottom:22px}`,
      `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
    <div class="chips">
    ${d.personal.email ? `<span class="chip"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
    ${d.personal.phone ? `<span class="chip"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></span>` : ""}
    ${d.personal.location ? `<span class="chip">${d.personal.location}</span>` : ""}
    ${d.personal.linkedin ? `<span class="chip"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
    ${d.personal.github ? `<span class="chip"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></span>` : ""}
    ${d.personal.website ? `<span class="chip"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></span>` : ""}
    </div></div>
    <div class="body"><div class="dt">${dt}</div>
    <div style="margin-bottom:20px;font-size:13px;line-height:2"><strong style="color:#e9d5ff">${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>${d.company.name}${loc ? `<br><span style='color:#7c6fa0'>${loc}</span>` : ""}</div>
    <div style="font-size:16px;font-weight:600;margin-bottom:22px;color:#e9d5ff">Dear ${mgr},</div>
    ${secRows("#c084fc")}${achBlock("#c084fc")}${skillBlock("#c084fc")}${notesBlock}
    <div style="margin-top:36px;font-size:13.5px;color:#7c6fa0">Sincerely,<br><br><strong style="font-size:15px;color:#f3e8ff">${nm}</strong></div></div></div>`,
    );

  if (id === "frost")
    return base(
      `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
    body{font-family:'Outfit',sans-serif;background:linear-gradient(135deg,#dbeafe,#e0f2fe);min-height:100vh;padding:20px;color:#374151}
    .pg{max-width:840px;margin:0 auto;background:rgba(255,255,255,.88);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.85);border-radius:16px;overflow:hidden}
    .hdr{background:linear-gradient(135deg,rgba(12,74,110,.92),rgba(2,132,199,.9));padding:48px;color:white}
    .nm{font-size:38px;font-weight:800;letter-spacing:-2px;margin-bottom:6px}
    .rl{font-size:12.5px;opacity:.8;letter-spacing:1px;margin-bottom:22px}
    .chips{display:flex;flex-wrap:wrap;gap:7px}.chip{padding:5px 14px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.22);border-radius:40px;font-size:11.5px}
    .chip a,.chip{color:white;text-decoration:none}.body{padding:44px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
      `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
    <div class="chips">${allContacts.map((c) => `<span class="chip">${c}</span>`).join("")}</div></div>
    <div class="body"><div class="dt">${dt}</div>${addrBlock}${greet()}${secRows("#0369a1")}${achBlock("#0369a1")}${skillBlock("#0369a1")}${notesBlock}${closing("#0369a1")}</div></div>`,
    );

  if (id === "canvas")
    return base(
      `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600&display=swap');
    body{font-family:'Manrope',sans-serif;color:#374151;background:#fff}.pg{max-width:820px;margin:0 auto;padding:60px 64px}
    .accent{width:4px;background:#6366f1;border-radius:2px;height:72px;float:left;margin-right:20px;margin-top:2px}
    .nm{font-family:'Syne',sans-serif;font-size:38px;font-weight:800;letter-spacing:-1.5px;color:#111827}
    .rl{font-size:13px;color:#6366f1;font-weight:600;margin-top:5px;letter-spacing:.5px}
    .ctrow{display:flex;flex-wrap:wrap;gap:5px 16px;margin-top:10px}
    .cv{font-size:12px;color:#9ca3af}.cv a{color:#6366f1;text-decoration:none}
    .div{height:1px;background:#f3f4f6;margin:28px 0;clear:both}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
      `<div class="pg"><div class="accent"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div>
    <div class="ctrow">
    ${d.personal.email ? `<span class="cv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
    ${d.personal.phone ? `<span class="cv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></span>` : ""}
    ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
    ${d.personal.linkedin ? `<span class="cv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
    ${d.personal.github ? `<span class="cv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></span>` : ""}
    ${d.personal.website ? `<span class="cv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></span>` : ""}
    </div><div class="div"></div>
    <div class="dt">${dt}</div>${addrBlock}${greet()}${secRows("#6366f1")}${achBlock("#6366f1")}${skillBlock("#6366f1")}${notesBlock}${closing("#6366f1")}</div>`,
    );

  if (id === "designer")
    return base(
      `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Manrope:wght@300;400;500;600&display=swap');
    body{font-family:'Manrope',sans-serif;color:#374151}.pg{max-width:900px;margin:0 auto;display:flex;min-height:100vh}
    .side{width:270px;background:linear-gradient(180deg,#0d0d0d,#1a0a2e);color:white;padding:44px 26px;flex-shrink:0;position:relative;overflow:hidden}
    .side::before{content:'';position:absolute;top:-60px;left:-60px;width:220px;height:220px;background:radial-gradient(circle,rgba(139,92,246,.3),transparent 70%);border-radius:50%}
    .savatar{width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:22px;box-shadow:0 8px 24px rgba(99,102,241,.4)}
    .snm{font-family:'Syne',sans-serif;font-size:24px;font-weight:800;color:white;line-height:1.15;margin-bottom:6px;position:relative}
    .srl{font-size:10px;color:#a78bfa;letter-spacing:2px;text-transform:uppercase;margin-bottom:28px;padding-bottom:22px;border-bottom:1px solid rgba(167,139,250,.2)}
    .slbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:rgba(167,139,250,.5);margin-bottom:6px;margin-top:20px}
    .sv{font-size:11px;color:#c4b5fd;line-height:1.9;word-break:break-all}.sv a{color:#c4b5fd;text-decoration:none}
    .sskill{display:inline-block;padding:3px 10px;background:rgba(139,92,246,.2);border:1px solid rgba(139,92,246,.3);border-radius:4px;font-size:10.5px;color:#c4b5fd;margin:2px 2px 0 0}
    .main{flex:1;padding:48px 44px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
      `<div class="pg"><div class="side"><div class="savatar">✦</div><div class="snm">${nm}</div><div class="srl">${ttl}</div>
    ${d.personal.email ? `<div class="slbl">Email</div><div class="sv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></div>` : ""}
    ${d.personal.phone ? `<div class="slbl">Phone</div><div class="sv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></div>` : ""}
    ${d.personal.location ? `<div class="slbl">Location</div><div class="sv">${d.personal.location}</div>` : ""}
    ${d.personal.linkedin ? `<div class="slbl">LinkedIn</div><div class="sv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></div>` : ""}
    ${d.personal.github ? `<div class="slbl">GitHub</div><div class="sv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></div>` : ""}
    ${d.personal.website ? `<div class="slbl">Portfolio</div><div class="sv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></div>` : ""}
    ${d.skills.length ? `<div class="slbl" style="margin-top:26px">Tools & Skills</div><div style="margin-top:6px">${d.skills.map((s) => `<span class="sskill">${s}</span>`).join("")}</div>` : ""}
    </div>
    <div class="main"><div class="dt">${dt}</div>${addrBlock}${greet()}${secRows("#7c3aed")}${achBlock("#7c3aed")}${notesBlock}${closing("#7c3aed")}</div></div>`,
    );

  if (id === "editor")
    return base(
      `@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;700;900&family=Share+Tech+Mono&display=swap');
    body{font-family:'Exo 2',sans-serif;background:#0f0a1e;color:#94a3b8;min-height:100vh}
    .pg{max-width:880px;margin:0 auto;background:#0f0a1e;min-height:100vh}
    .hdr{padding:52px;position:relative}
    .hdr::before{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#f43f5e,transparent)}
    .nm{font-size:46px;font-weight:900;letter-spacing:-3px;color:white;line-height:.95;margin-bottom:6px}
    .rl{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#f43f5e;margin-bottom:22px}
    .chips{display:flex;flex-wrap:wrap;gap:8px}.chip{padding:4px 12px;border:1px solid rgba(244,63,94,.25);color:#94a3b8;font-size:10.5px;font-family:'Share Tech Mono',monospace;border-radius:4px}
    .chip a{color:#f43f5e;text-decoration:none}
    .body{padding:32px 52px 52px}.dt{font-size:11.5px;font-family:'Share Tech Mono',monospace;color:#4a5578;margin-bottom:22px}
    .sh4{font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#f43f5e;margin-bottom:8px;display:flex;align-items:center;gap:8px}
    .sh4::before{content:'';width:24px;height:2px;background:#f43f5e;flex-shrink:0}`,
      `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
    <div class="chips">${allContacts.map((c) => `<span class="chip">${c}</span>`).join("")}</div></div>
    <div class="body"><div class="dt">${dt}</div>
    <div style="margin-bottom:22px;font-size:13px;line-height:2"><strong style="color:#e2e8f0">${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>${d.company.name}${loc ? `<br><span style='color:#4a5578'>${loc}</span>` : ""}</div>
    <div style="font-size:17px;font-weight:700;color:white;margin-bottom:22px">Dear ${mgr},</div>
    ${d.sections
      .filter((s) => s.content.trim())
      .map(
        (s) =>
          `<div style="margin-bottom:26px"><div class="sh4">${s.title}</div><p style="line-height:1.85;font-size:13.5px">${s.content.replace(/\n/g, "<br>")}</p></div>`,
      )
      .join("")}
    ${achBlock("#f43f5e")}${skillBlock("#f43f5e")}${notesBlock}
    <div style="margin-top:36px;font-size:13.5px;color:#64748b">Sincerely,<br><br><strong style="font-size:15px;color:white">${nm}</strong></div></div></div>`,
    );

  if (id === "pearl")
    return base(
      `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
    body{font-family:'Plus Jakarta Sans',sans-serif;color:#374151;background:#fff}.pg{max-width:820px;margin:0 auto;padding:60px 64px}
    .nm{font-size:40px;font-weight:800;letter-spacing:-2px;color:#111827;margin-bottom:6px}
    .rl{font-size:13px;color:#6366f1;font-weight:700;letter-spacing:.5px;margin-bottom:16px}
    .d1{height:1.5px;background:#f1f0ff;margin-bottom:16px}
    .ctrow{display:flex;flex-wrap:wrap;gap:5px 20px;margin-bottom:16px}
    .cv{font-size:12px;color:#9ca3af}.cv a{color:#6366f1;text-decoration:none}
    .d2{height:1.5px;background:#f1f0ff;margin:20px 0}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
      `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="d1"></div>
    <div class="ctrow">
    ${d.personal.email ? `<span class="cv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
    ${d.personal.phone ? `<span class="cv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></span>` : ""}
    ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
    ${d.personal.linkedin ? `<span class="cv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
    ${d.personal.github ? `<span class="cv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></span>` : ""}
    ${d.personal.website ? `<span class="cv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></span>` : ""}
    </div><div class="d2"></div>
    <div class="dt">${dt}</div>${addrBlock}${greet()}${secRows("#6366f1")}${achBlock("#6366f1")}${skillBlock("#6366f1")}${notesBlock}${closing("#6366f1")}</div>`,
    );

  if (id === "ivory")
    return base(
      `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;600&display=swap');
    body{font-family:'Source Sans 3',sans-serif;color:#374151;background:#fefce8}
    .pg{max-width:820px;margin:0 auto;background:#fefce8;padding:60px 64px;border-left:5px solid #ca8a04}
    .nm{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:700;color:#1c1917;letter-spacing:-.5px;line-height:1.1}
    .rl{font-size:13px;color:#92400e;font-style:italic;margin:8px 0 16px}
    .div{height:1px;background:#fde68a;margin:16px 0}
    .ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:14px}
    .cv{font-size:12px;color:#78716c}.cv a{color:#b45309;text-decoration:none}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
      `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div"></div>
    <div class="ctrow">
    ${d.personal.email ? `<span class="cv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
    ${d.personal.phone ? `<span class="cv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></span>` : ""}
    ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
    ${d.personal.linkedin ? `<span class="cv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
    ${d.personal.github ? `<span class="cv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></span>` : ""}
    ${d.personal.website ? `<span class="cv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></span>` : ""}
    </div><div class="div"></div>
    <div class="dt">${dt}</div>${addrBlock}${greet()}${secRows("#b45309")}${achBlock("#b45309")}${skillBlock("#b45309")}${notesBlock}${closing("#b45309")}</div>`,
    );

  if (id === "motion")
    return base(
      `@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;900&family=Barlow:wght@400;500;600&display=swap');
    body{font-family:'Barlow',sans-serif;color:#374151;background:#fff}.pg{max-width:860px;margin:0 auto}
    .tb{height:5.5px;background:linear-gradient(90deg,#ec4899,#f59e0b)}
    .hdr{padding:44px 52px;border-bottom:1px solid #fce7f3;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}
    .nm{font-family:'Barlow Condensed',sans-serif;font-size:48px;font-weight:900;letter-spacing:-3px;text-transform:uppercase;line-height:.95;color:#111827}
    .rl{font-size:13px;color:#ec4899;letter-spacing:2px;text-transform:uppercase;margin-top:8px;font-weight:600}
    .cc{text-align:right;font-size:12px;color:#9ca3af}.cv{display:block;margin-bottom:4px;line-height:1.5}.cv a{color:#ec4899;text-decoration:none}
    .body{padding:44px 52px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
    .bb{height:5.5px;background:linear-gradient(90deg,#f59e0b,#ec4899)}`,
      `<div class="pg"><div class="tb"></div>
    <div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>
    <div class="cc">
    ${d.personal.email ? `<span class="cv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
    ${d.personal.phone ? `<span class="cv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></span>` : ""}
    ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
    ${d.personal.linkedin ? `<span class="cv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
    ${d.personal.github ? `<span class="cv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></span>` : ""}
    ${d.personal.website ? `<span class="cv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></span>` : ""}
    </div></div>
    <div class="body"><div class="dt">${dt}</div>${addrBlock}${greet()}${secRows("#ec4899")}${achBlock("#ec4899")}${skillBlock("#ec4899")}${notesBlock}${closing("#ec4899")}</div>
    <div class="bb"></div></div>`,
    );

  if (id === "architect")
    return base(
      `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
    body{font-family:'Plus Jakarta Sans',sans-serif;color:#374151;background:#f8fafc}.pg{max-width:880px;margin:0 auto;background:#f8fafc}
    .hdr{padding:44px 52px;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap}
    .hl{flex:1}.nm{font-size:34px;font-weight:800;color:#0f172a;letter-spacing:-1.5px}
    .rl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-top:7px;margin-bottom:14px}
    .ctrow{display:flex;flex-wrap:wrap;gap:4px 14px}.cv{font-size:12px;color:#64748b}.cv a{color:#4f46e5;text-decoration:none}
    .hr{width:130px;flex-shrink:0;background:#0f172a;border-radius:12px;padding:16px;text-align:center}
    .hrl{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#64748b;margin-bottom:6px}
    .hrr{font-size:11px;font-weight:700;color:white;line-height:1.4}.hrc{font-size:10px;color:#94a3b8;margin-top:4px}
    .body{padding:36px 52px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
      `<div class="pg"><div class="hdr">
    <div class="hl"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
    <div class="ctrow">
    ${d.personal.email ? `<span class="cv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
    ${d.personal.phone ? `<span class="cv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></span>` : ""}
    ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
    ${d.personal.linkedin ? `<span class="cv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
    ${d.personal.github ? `<span class="cv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></span>` : ""}
    ${d.personal.website ? `<span class="cv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></span>` : ""}
    </div></div>
    ${d.company.name ? `<div class="hr"><div class="hrl">Applying to</div><div class="hrr">${d.company.jobTitle || "Open Role"}</div><div class="hrc">${d.company.name}</div></div>` : ""}
    </div>
    <div class="body"><div class="dt">${dt}</div>${addrBlock}${greet()}${secRows("#0f172a", true)}${achBlock("#0f172a")}${skillBlock("#0f172a")}${notesBlock}${closing("#0f172a")}</div></div>`,
    );

  if (id === "serif")
    return base(
      `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,400&display=swap');
    body{font-family:'Source Serif 4',serif;color:#374151;background:#fff}.pg{max-width:820px;margin:0 auto;padding:52px 64px}
    .r1{height:2px;background:#1e293b;margin-bottom:20px}
    .nm{font-family:'Playfair Display',serif;font-size:42px;font-weight:900;color:#1e293b;letter-spacing:-1.5px;text-align:center;margin-bottom:6px}
    .rl{font-size:12px;color:#64748b;text-align:center;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px}
    .ctrow{display:flex;justify-content:center;flex-wrap:wrap;gap:5px 20px;margin-bottom:16px}
    .cv{font-size:12px;color:#64748b}.cv a{color:#4338ca;text-decoration:none}
    .r2{height:1px;background:#e5e7eb;margin-bottom:20px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
      `<div class="pg"><div class="r1"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div>
    <div class="ctrow">
    ${d.personal.email ? `<span class="cv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
    ${d.personal.phone ? `<span class="cv"><a href="tel:${d.personal.phone}">${d.personal.phone}</a></span>` : ""}
    ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
    ${d.personal.linkedin ? `<span class="cv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
    ${d.personal.github ? `<span class="cv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.github}</a></span>` : ""}
    ${d.personal.website ? `<span class="cv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.website}</a></span>` : ""}
    </div><div class="r2"></div>
    <div class="dt">${dt}</div>${addrBlock}${greet()}${secRows("#4338ca")}${achBlock("#4338ca")}${skillBlock("#4338ca")}${notesBlock}${closing("#4338ca")}</div>`,
    );

  return buildHTML("aurora", d);
}

/* ─────────────────────────────────────────────────────────────────
   STEPS
───────────────────────────────────────────────────────────────── */
type Step = "template" | "personal" | "company" | "content" | "review";
const STEPS: { id: Step; label: string; icon: string }[] = [
  { id: "template", label: "Template", icon: "🎨" },
  { id: "personal", label: "Personal", icon: "👤" },
  { id: "company", label: "Company", icon: "🏢" },
  { id: "content", label: "Content", icon: "✍️" },
  { id: "review", label: "Review", icon: "✅" },
];

/* ─────────────────────────────────────────────────────────────────
   FIELD WRAPPER
───────────────────────────────────────────────────────────────── */
function F({
  label,
  icon,
  required,
  children,
}: {
  label: string;
  icon?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3.5">
      <label className="block text-[10.5px] font-bold tracking-wide uppercase text-slate-500 mb-1.5">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[13px] opacity-50 pointer-events-none">
            {icon}
          </span>
        )}
        <div
          className={
            icon ? "[&>input]:pl-8 [&>textarea]:pl-3 [&>select]:pl-8" : ""
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* shared input classes */
const inp =
  "w-full px-3 py-2.5 text-[13px] font-[500] border-[1.5px] border-slate-200 rounded-xl outline-none transition-all duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 bg-white text-slate-800";
const ta = `${inp} resize-y min-h-[80px] leading-relaxed px-3`;

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function CoverLetterGenerator() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("template");
  const [tplId, setTplId] = useState("aurora");
  const [data, setData] = useState<CLData>(JSON.parse(JSON.stringify(BLANK)));
  const [html, setHtml] = useState("");
  const [modal, setModal] = useState(false);
  const [achIn, setAchIn] = useState("");
  const [sklIn, setSklIn] = useState("");
  const [toast, setToast] = useState("");
  const [busy, setBusy] = useState(false);

  const liveRef = useRef<HTMLIFrameElement>(null);
  const modalRef = useRef<HTMLIFrameElement>(null);

  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 2800);
  };

  const rebuild = useCallback(() => {
    const h = buildHTML(tplId, data);
    setHtml(h);
    return h;
  }, [tplId, data]);

  useEffect(() => {
    const t = setTimeout(rebuild, 200);
    return () => clearTimeout(t);
  }, [rebuild]);

  const writeIframe = (
    ref: React.RefObject<HTMLIFrameElement | null>,
    h: string,
  ) => {
    if (!ref.current) return;
    const doc = ref.current.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(h);
    doc.close();
  };

  useEffect(() => {
    if (html && liveRef.current) writeIframe(liveRef, html);
  }, [html]);
  useEffect(() => {
    if (modal && html && modalRef.current) writeIframe(modalRef, html);
  }, [modal, html]);

  const set = (path: string[], val: string) =>
    setData((prev) => {
      const n = JSON.parse(JSON.stringify(prev)) as CLData;
      let c: any = n;
      for (let i = 0; i < path.length - 1; i++) c = c[path[i]];
      c[path[path.length - 1]] = val;
      return n;
    });
  const setSec = (id: string, f: "title" | "content", v: string) =>
    setData((p) => ({
      ...p,
      sections: p.sections.map((s) => (s.id === id ? { ...s, [f]: v } : s)),
    }));

  const downloadPDF = async () => {
    const h = rebuild();
    setBusy(true);
    try {
      const r = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        { html: h },
        { responseType: "blob" },
      );
      const url = URL.createObjectURL(r.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Cover_Letter_${data.personal.fullName || "Draft"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("✓ PDF downloaded");
    } catch {
      showToast("Download failed — try again");
    } finally {
      setBusy(false);
    }
  };

  const tpl = TEMPLATES.find((t) => t.id === tplId)!;
  const stepIdx = STEPS.findIndex((s) => s.id === step);

  const tones = [
    "Professional",
    "Confident",
    "Enthusiastic",
    "Formal",
    "Creative",
    "Friendly",
  ];

  return (
    <>
      {/* Only CSS we truly need: iframe dimensions + canvas transforms + body overflow lock */}
      <style>{`
        html,body{overflow:hidden}
        @media(max-width:820px){html,body{overflow:auto}}
        .canvas-iframe{width:860px;height:1120px;border:none;display:block;border-radius:10px;pointer-events:none}
        .modal-iframe{width:860px;height:1120px;border:none;display:block}
        @keyframes livePulse{0%,100%{box-shadow:0 0 0 2px rgba(16,185,129,.2)}50%{box-shadow:0 0 0 5px rgba(16,185,129,.07)}}
        .live-dot{animation:livePulse 2s infinite}
        @keyframes toastSlide{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        .toast-anim{animation:toastSlide .22s ease}
        @keyframes modalUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        .modal-anim{animation:modalUp .22s ease}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .ov-anim{animation:fadeIn .18s ease}
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="h-[58px] bg-white border-b border-slate-200 flex items-center px-4 md:px-5 gap-3 z-50 relative shadow-[0_1px_4px_rgba(91,56,240,.06)] flex-shrink-0">
        {/* Logo - responsive sizing */}
        <button
          onClick={() => router.push("/")}
          className="cursor-pointer flex-shrink-0"
        >
          <div className="relative w-[100px] xs:w-[120px] sm:w-[140px] md:w-[150px] h-[33px] xs:h-[40px] sm:h-[46px] md:h-[50px]">
            <Image
              src="/logo.png"
              alt="ATS Pass"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 480px) 100px, (max-width: 640px) 120px, (max-width: 768px) 140px, 150px"
            />
          </div>
        </button>

        {/* Wizard */}
        <div className="flex items-center flex-1 justify-center overflow-x-auto scrollbar-none gap-0 py-1">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              {i > 0 && (
                <div
                  className={`w-5 h-0.5 flex-shrink-0 transition-colors duration-300 ${i <= stepIdx ? "bg-emerald-500" : "bg-slate-200"}`}
                />
              )}
              <button
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[12px] font-semibold transition-all duration-150 flex-shrink-0 cursor-pointer
                  ${i < stepIdx ? "text-slate-800" : i === stepIdx ? "text-indigo-600 bg-indigo-50" : "text-slate-400 hover:bg-slate-50"}`}
              >
                <span
                  className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] transition-all
                  ${i < stepIdx ? "bg-emerald-500 text-white" : i === stepIdx ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-[0_0_0_3px_rgba(91,56,240,.16)]" : "bg-slate-100 text-slate-400"}`}
                >
                  {i < stepIdx ? (
                    <svg viewBox="0 0 14 14" width="11" height="11" fill="none">
                      <polyline
                        points="2,8 5,12 12,3"
                        stroke="white"
                        strokeWidth="2.2"
                      />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            </React.Fragment>
          ))}
        </div>
      </nav>

      {/* ── SHELL ─────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[1fr_1fr] h-[calc(100vh-58px)]">
        {/* ── LEFT ─────────────────────────────────── */}
        <div className="flex flex-col overflow-hidden bg-slate-50 border-r border-slate-200">
          {/* Left header */}
          <div className="flex-shrink-0 px-5 pt-5 pb-0">
            <h2 className=" font-semibold text-slate-900 tracking-tight mb-0.5">
              {step === "template"
                ? "Choose Template"
                : step === "personal"
                  ? "Personal Information"
                  : step === "company"
                    ? "Company Details"
                    : step === "content"
                      ? "Letter Content"
                      : "Review & Download"}
            </h2>
            <p className="text-[13px] text-slate-500 mb-3">
              {step === "template"
                ? "15 unique designs for every profession"
                : step === "personal"
                  ? "Your details shown on the letter"
                  : step === "company"
                    ? "Where you're applying"
                    : step === "content"
                      ? "Craft your compelling story"
                      : "Check everything before downloading"}
            </p>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-5 pt-5 pb-12 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent">
            {/* ── TEMPLATE STEP ── */}
            {step === "template" && (
              <div className="grid sm:grid-cols-2 sm:grid-cols-3 gap-3">
                {TEMPLATES.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setTplId(t.id)}
                    className={`relative bg-white rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-200
                        ${tplId === t.id ? "border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,.13),0_8px_24px_rgba(99,102,241,.14)]" : "border-slate-100 shadow-md shadow-gray-300 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200"}`}
                  >
                    <div className="h-[100px] overflow-hidden bg-slate-50">
                      <TplThumb id={t.id} />
                    </div>
                    {tplId === t.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center shadow-md">
                        <svg
                          viewBox="0 0 14 14"
                          width="10"
                          height="10"
                          fill="none"
                        >
                          <polyline
                            points="2,8 5,12 12,3"
                            stroke="white"
                            strokeWidth="2.4"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="px-3 py-2.5">
                      <div className="text-[9px] font-extrabold tracking-[1.5px] uppercase text-slate-900 mb-0.5">
                        {t.tag}
                      </div>
                      {/* <div className="text-[13px] font-extrabold text-slate-900">
                          {t.name}
                        </div> */}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── PERSONAL STEP ── */}
            {step === "personal" && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
                <div className="flex items-center gap-3 mb-4">
                  <div>
                    <p className="text-[14px] font-extrabold text-slate-900">
                      Your Profile
                    </p>
                    <p className="text-[11.5px] text-slate-500">
                      All fields appear in your letter
                    </p>
                  </div>
                </div>
                <div className="grid sm:sm:grid-cols-2 ">
                  <F label="Full Name" required>
                    <input
                      className={inp}
                      placeholder="Alexandra Chen"
                      value={data.personal.fullName}
                      onChange={(e) =>
                        set(["personal", "fullName"], e.target.value)
                      }
                    />
                  </F>
                  <F label="Professional Title">
                    <input
                      className={inp}
                      placeholder="Senior UX Designer"
                      value={data.personal.title}
                      onChange={(e) =>
                        set(["personal", "title"], e.target.value)
                      }
                    />
                  </F>
                </div>
                <div className="grid sm:grid-cols-2 ">
                  <F label="Email Address" required>
                    <input
                      className={inp}
                      type="email"
                      placeholder="alex@email.com"
                      value={data.personal.email}
                      onChange={(e) =>
                        set(["personal", "email"], e.target.value)
                      }
                    />
                  </F>
                  <F label="Phone Number">
                    <input
                      className={inp}
                      type="tel"
                      placeholder="+1 555 000 0000"
                      value={data.personal.phone}
                      onChange={(e) =>
                        set(["personal", "phone"], e.target.value)
                      }
                    />
                  </F>
                </div>
                <F label="Location">
                  <input
                    className={inp}
                    placeholder="San Francisco, CA"
                    value={data.personal.location}
                    onChange={(e) =>
                      set(["personal", "location"], e.target.value)
                    }
                  />
                </F>
                <div className="h-px bg-indigo-50 my-3" />
                <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
                  🔗 Online Presence — shown as clickable links
                </p>
                <F label="LinkedIn URL">
                  <input
                    className={inp}
                    placeholder="linkedin.com/in/alexchen"
                    value={data.personal.linkedin}
                    onChange={(e) =>
                      set(["personal", "linkedin"], e.target.value)
                    }
                  />
                </F>
                <div className="grid sm:grid-cols-2 ">
                  <F label="GitHub URL">
                    <input
                      className={inp}
                      placeholder="github.com/alexchen"
                      value={data.personal.github}
                      onChange={(e) =>
                        set(["personal", "github"], e.target.value)
                      }
                    />
                  </F>
                  <F label="Portfolio / Website">
                    <input
                      className={inp}
                      placeholder="alexchen.io"
                      value={data.personal.website}
                      onChange={(e) =>
                        set(["personal", "website"], e.target.value)
                      }
                    />
                  </F>
                </div>
                <div className="h-px bg-indigo-50 my-3" />
                <F label="Professional Summary (optional)">
                  <textarea
                    className={ta}
                    placeholder="2–3 sentence summary of your experience…"
                    value={data.personal.summary}
                    onChange={(e) =>
                      set(["personal", "summary"], e.target.value)
                    }
                  />
                </F>
                <F label="Closing Salutation">
                  <input
                    className={inp}
                    placeholder="Sincerely (default)"
                    value={data.personal.signature}
                    onChange={(e) =>
                      set(["personal", "signature"], e.target.value)
                    }
                  />
                </F>
              </div>
            )}

            {/* ── COMPANY STEP ── */}
            {step === "company" && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-lg shadow-[0_4px_10px_rgba(91,56,240,.22)]">
                    🏢
                  </div>
                  <div>
                    <p className="text-[14px] font-extrabold text-slate-900">
                      Company & Role
                    </p>
                    <p className="text-[11.5px] text-slate-500">
                      Application target details
                    </p>
                  </div>
                </div>
                <F label="Company Name" icon="🏢" required>
                  <input
                    className={inp}
                    placeholder="Google, Stripe, Airbnb…"
                    value={data.company.name}
                    onChange={(e) => set(["company", "name"], e.target.value)}
                  />
                </F>
                <F label="Role Applying For" icon="🎯" required>
                  <input
                    className={inp}
                    placeholder="Senior UX Designer"
                    value={data.company.jobTitle}
                    onChange={(e) =>
                      set(["company", "jobTitle"], e.target.value)
                    }
                  />
                </F>
                <div className="grid sm:grid-cols-2 gap-3">
                  <F label="Hiring Manager" icon="👤">
                    <input
                      className={inp}
                      placeholder="Sarah Johnson"
                      value={data.company.hiringManager}
                      onChange={(e) =>
                        set(["company", "hiringManager"], e.target.value)
                      }
                    />
                  </F>
                  <F label="Their Title" icon="🏷️">
                    <input
                      className={inp}
                      placeholder="Head of Design"
                      value={data.company.hiringManagerTitle}
                      onChange={(e) =>
                        set(["company", "hiringManagerTitle"], e.target.value)
                      }
                    />
                  </F>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <F label="City">
                    <input
                      className={`${inp} pl-3`}
                      placeholder="Mountain View"
                      value={data.company.city}
                      onChange={(e) => set(["company", "city"], e.target.value)}
                    />
                  </F>
                  <F label="State">
                    <input
                      className={`${inp} pl-3`}
                      placeholder="CA"
                      value={data.company.state}
                      onChange={(e) =>
                        set(["company", "state"], e.target.value)
                      }
                    />
                  </F>
                </div>
                <div className="h-px bg-indigo-50 my-3" />
                <F label="Where you found this job" icon="🔍">
                  <input
                    className={inp}
                    placeholder="LinkedIn, Referral, Company website…"
                    value={data.company.jobSource}
                    onChange={(e) =>
                      set(["company", "jobSource"], e.target.value)
                    }
                  />
                </F>
                <F label="Referral Name (if any)" icon="🤝">
                  <input
                    className={inp}
                    placeholder="John Smith referred me"
                    value={data.company.referral}
                    onChange={(e) =>
                      set(["company", "referral"], e.target.value)
                    }
                  />
                </F>
              </div>
            )}

            {/* ── CONTENT STEP ── */}
            {step === "content" && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-lg shadow-[0_4px_10px_rgba(91,56,240,.22)]">
                    ✍️
                  </div>
                  <div>
                    <p className="text-[14px] font-extrabold text-slate-900">
                      Letter Sections
                    </p>
                    <p className="text-[11.5px] text-slate-500">
                      Build paragraph by paragraph
                    </p>
                  </div>
                </div>

                {data.sections.map((s, i) => (
                  <div
                    key={s.id}
                    className="bg-indigo-50/60 border-[1.5px] border-indigo-100 rounded-xl p-3 mb-2.5 transition-all focus-within:bg-white focus-within:border-indigo-400 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,.08)]"
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-[22px] h-[22px] rounded-[7px] bg-gradient-to-br from-indigo-600 to-violet-600 text-white text-[10px] font-extrabold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <input
                        value={s.title}
                        onChange={(e) => setSec(s.id, "title", e.target.value)}
                        placeholder="Section title"
                        className="flex-1 px-2.5 py-1.5 rounded-lg border-[1.5px] border-slate-200 text-[12.5px] font-bold bg-white text-slate-900 outline-none focus:border-indigo-500 transition-all"
                      />
                      {data.sections.length > 1 && (
                        <button
                          onClick={() =>
                            setData((p) => ({
                              ...p,
                              sections: p.sections.filter((x) => x.id !== s.id),
                            }))
                          }
                          className="w-6 h-6 bg-white border-[1.5px] border-slate-200 rounded-[6px] text-red-400 text-[12px] flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-all"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <textarea
                      value={s.content}
                      onChange={(e) => setSec(s.id, "content", e.target.value)}
                      placeholder={s.placeholder}
                      rows={4}
                      className="w-full px-2.5 py-2 rounded-lg border-[1.5px] border-slate-200 bg-white text-[12.5px] text-slate-800 leading-relaxed outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,.08)] transition-all resize-y"
                    />
                  </div>
                ))}

                <button
                  onClick={() =>
                    setData((p) => ({
                      ...p,
                      sections: [
                        ...p.sections,
                        {
                          id: Date.now() + "",
                          title: "New Section",
                          content: "",
                          placeholder: "Write here…",
                        },
                      ],
                    }))
                  }
                  className="w-full py-2 mb-3.5 bg-white border-[1.5px] border-dashed border-indigo-200 rounded-xl text-[12.5px] font-bold text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400 transition-all"
                >
                  + Add Section
                </button>

                <div className="h-px bg-indigo-50 my-3" />
                <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
                  🏆 Key Achievements
                </p>
                <div className="flex gap-2 mb-2">
                  <input
                    className={`flex-1 px-3 py-2 text-[12.5px] border-[1.5px] border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all`}
                    placeholder="e.g. Grew revenue 40% YoY"
                    value={achIn}
                    onChange={(e) => setAchIn(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && achIn.trim()) {
                        setData((p) => ({
                          ...p,
                          achievements: [...p.achievements, achIn.trim()],
                        }));
                        setAchIn("");
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (achIn.trim()) {
                        setData((p) => ({
                          ...p,
                          achievements: [...p.achievements, achIn.trim()],
                        }));
                        setAchIn("");
                      }
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[12px] font-bold rounded-xl hover:shadow-[0_4px_10px_rgba(91,56,240,.28)] transition-all"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-1">
                  {data.achievements.map((a, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-[12px] font-semibold text-indigo-700"
                    >
                      ⭐ {a}
                      <button
                        onClick={() =>
                          setData((p) => ({
                            ...p,
                            achievements: p.achievements.filter(
                              (_, j) => j !== i,
                            ),
                          }))
                        }
                        className="text-indigo-300 hover:text-red-400 text-[13px] leading-none transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-indigo-50 my-3" />
                <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
                  🛠️ Core Skills / Tools
                </p>
                <div className="flex gap-2 mb-2">
                  <input
                    className="flex-1 px-3 py-2 text-[12.5px] border-[1.5px] border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                    placeholder="e.g. Figma, React, Premiere Pro…"
                    value={sklIn}
                    onChange={(e) => setSklIn(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && sklIn.trim()) {
                        setData((p) => ({
                          ...p,
                          skills: [...p.skills, sklIn.trim()],
                        }));
                        setSklIn("");
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (sklIn.trim()) {
                        setData((p) => ({
                          ...p,
                          skills: [...p.skills, sklIn.trim()],
                        }));
                        setSklIn("");
                      }
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[12px] font-bold rounded-xl hover:shadow-[0_4px_10px_rgba(91,56,240,.28)] transition-all"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-1">
                  {data.skills.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-violet-50 border border-violet-100 rounded-full text-[12px] font-semibold text-violet-700"
                    >
                      🔧 {s}
                      <button
                        onClick={() =>
                          setData((p) => ({
                            ...p,
                            skills: p.skills.filter((_, j) => j !== i),
                          }))
                        }
                        className="text-violet-300 hover:text-red-400 text-[13px] leading-none transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-indigo-50 my-3" />
                <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
                  🎭 Tone of Voice
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {tones.map((t) => (
                    <button
                      key={t}
                      onClick={() => setData((p) => ({ ...p, tone: t }))}
                      className={`px-3 py-1 rounded-full text-[12px] font-semibold border-[1.5px] transition-all ${data.tone === t ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-slate-200 text-slate-500 bg-white hover:border-indigo-200"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="h-px bg-indigo-50 my-3" />
                <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
                  📝 Additional Notes
                </p>
                <textarea
                  className={ta}
                  rows={3}
                  placeholder="Post-script, special circumstances, or extra context…"
                  value={data.notes}
                  onChange={(e) =>
                    setData((p) => ({ ...p, notes: e.target.value }))
                  }
                />
              </div>
            )}

            {/* ── REVIEW STEP ── */}
            {step === "review" && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-lg shadow-[0_4px_10px_rgba(16,185,129,.22)]">
                    ✅
                  </div>
                  <div>
                    <p className="text-[14px] font-extrabold text-slate-900">
                      Review Summary
                    </p>
                    <p className="text-[11.5px] text-slate-500">
                      Check before downloading
                    </p>
                  </div>
                </div>
                {[
                  ["Template", tpl.name, "template"],
                  ["Full Name", data.personal.fullName, "personal"],
                  ["Title", data.personal.title, "personal"],
                  ["Email", data.personal.email, "personal"],
                  ["Phone", data.personal.phone, "personal"],
                  ["LinkedIn", data.personal.linkedin, "personal"],
                  ["GitHub", data.personal.github, "personal"],
                  ["Portfolio", data.personal.website, "personal"],
                  ["Company", data.company.name, "company"],
                  ["Role", data.company.jobTitle, "company"],
                  ["Manager", data.company.hiringManager, "company"],
                  ["Tone", data.tone, "content"],
                  [
                    "Sections",
                    `${data.sections.filter((s) => s.content).length} written`,
                    "content",
                  ],
                  [
                    "Achievements",
                    `${data.achievements.length} added`,
                    "content",
                  ],
                  ["Skills", `${data.skills.length} added`, "content"],
                ].map(([l, v, s]) => (
                  <div
                    key={l}
                    className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0"
                  >
                    <span className="text-[11px] font-extrabold uppercase tracking-[.5px] text-slate-400">
                      {l}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[13px] font-medium text-right max-w-[180px] truncate ${v ? "text-slate-800" : "text-slate-300"}`}
                      >
                        {v || "—"}
                      </span>
                      <button
                        onClick={() => setStep(s as Step)}
                        className="text-[11px] font-bold text-indigo-500 hover:text-indigo-700 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                  <p className="text-[13px] font-bold text-slate-900 mb-1">
                    ✅ Ready to Download
                  </p>
                  <p className="text-[12px] text-slate-500">
                    Your cover letter is ready. Click "Download PDF" or use the
                    bottom button.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── FOOTER NAV ── */}
          <div className="flex-shrink-0 px-5 py-3 border-t border-slate-200 bg-white flex justify-between items-center gap-3">
            <button
              onClick={() =>
                stepIdx === 0
                  ? router.push("/")
                  : setStep(STEPS[stepIdx - 1].id)
              }
              className="max-sm:hidden flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[13px] font-bold border-[1.5px] border-slate-200 bg-white text-slate-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 disabled:opacity-35 disabled:cursor-default disabled:hover:bg-white disabled:hover:border-slate-200 disabled:hover:text-slate-500 transition-all cursor-pointer"
            >
              ←{" "}
              {stepIdx > 0
                ? `Back to ${STEPS[stepIdx - 1].label}`
                : "Back to Home"}
            </button>
              <button
              onClick={() =>
                stepIdx === 0
                  ? router.push("/")
                  : setStep(STEPS[stepIdx - 1].id)
              }
              className=" flex sm:hidden items-center gap-1.5 px-4 py-2.5 rounded-full text-[13px] font-bold border-[1.5px] border-slate-200 bg-white text-slate-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 disabled:opacity-35 disabled:cursor-default disabled:hover:bg-white disabled:hover:border-slate-200 disabled:hover:text-slate-500 transition-all cursor-pointer"
            >
              ←{" "}
              {stepIdx > 0
                ? `Back `
                : "Back "}
            </button>
            {stepIdx < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(STEPS[stepIdx + 1].id)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[13.5px] font-semibold md:font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_4px_14px_rgba(91,56,240,.3)] hover:shadow-[0_6px_22px_rgba(91,56,240,.38)] hover:-translate-y-px transition-all cursor-pointer"
              >
                Continue to {STEPS[stepIdx + 1].label}
              </button>
            ) : (
              <button
                onClick={downloadPDF}
                disabled={busy}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[13.5px] font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_4px_14px_rgba(91,56,240,.3)] hover:shadow-[0_6px_22px_rgba(91,56,240,.38)] hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all"
              >
                {busy ? "⏳ Generating…" : "⬇ Download PDF"}
              </button>
            )}
          </div>
        </div>

        {/* ── RIGHT — CANVAS PREVIEW ─────────────────────── */}
        <div className="hidden lg:flex flex-col bg-indigo-50/40 overflow-hidden">
          {/* Preview header */}
          <div className="flex-shrink-0 h-[52px] bg-white border-b border-slate-200 px-4 flex items-center justify-between gap-3 shadow-[0_1px_3px_rgba(0,0,0,.04)]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 live-dot" />
              <div>
                <p className="text-[13px] font-bold text-slate-900 leading-tight">
                  Live Preview
                </p>
                <p className="text-[10.5px] text-slate-400">
                  Drag · Scroll · Ctrl+Wheel to zoom
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep("template")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 hover:bg-indigo-100 hover:border-indigo-200 transition-all"
              >
                🎨 Change
              </button>
              <button
                onClick={() => {
                  rebuild();
                  setModal(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-bold border-[1.5px] border-slate-200 text-slate-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all"
              >
                ⛶ Fullscreen
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-hidden">
            <CanvasPreview>
              {html ? (
                <iframe
                  ref={liveRef}
                  className="canvas-iframe"
                  title="preview"
                  sandbox="allow-same-origin"
                />
              ) : (
                <div className="w-[860px] h-[1120px] bg-white rounded-xl flex flex-col items-center justify-center gap-3 text-slate-400">
                  <span className="text-[52px] opacity-20">📄</span>
                  <p className="text-[16px] font-bold">Preview appears here</p>
                  <p className="text-[13px]">
                    Fill in your details to see the letter
                  </p>
                </div>
              )}
            </CanvasPreview>
          </div>
        </div>
      </div>

      {/* ── MOBILE PREVIEW FAB ── */}
      <button
        onClick={() => {
          rebuild();
          setModal(true);
        }}
        className="lg:hidden fixed top-16 right-4 z-50 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
                <FiEye className="w-3 h-3" />
      </button>

      

      {/* ── FULLSCREEN MODAL ── */}
      <AnimatePresence>
        {modal && (
          <div
            className="ov-anim fixed inset-0 bg-[rgba(10,6,30,.86)] backdrop-blur-[14px] z-[1000] flex items-center justify-center p-4 sm:p-5"
            onClick={() => setModal(false)}
          >
            <div
              className="modal-anim w-full max-w-[960px] h-[92vh] bg-white rounded-2xl overflow-hidden flex flex-col shadow-[0_48px_100px_rgba(0,0,0,.48)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex-shrink-0 h-[56px] px-5 bg-white border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-sm text-white shadow-[0_3px_8px_rgba(91,56,240,.28)]">
                    📄
                  </div>
                  <div>
                    <p className="text-[14.5px] font-extrabold text-slate-900 leading-tight">
                      {data.personal.fullName || "Cover Letter"}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {tpl.name} · {tpl.tag}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setModal(false)}
                  className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 text-slate-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 flex items-center justify-center text-[16px] transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Modal canvas */}
              <div className="flex-1 overflow-hidden bg-indigo-50/40">
                <CanvasPreview>
                  {html ? (
                    <iframe
                      ref={modalRef}
                      className="modal-iframe"
                      title="full-preview"
                      sandbox="allow-same-origin"
                    />
                  ) : (
                    <div className="w-[860px] h-[1120px] bg-white flex items-center justify-center text-slate-400">
                      <span className="text-5xl opacity-20">📄</span>
                    </div>
                  )}
                </CanvasPreview>
              </div>

              {/* Modal footer */}
              <div className="flex-shrink-0 px-5 py-3 border-t border-slate-100 bg-white flex justify-end gap-2.5">
                <button
                  onClick={() => setModal(false)}
                  className="px-4 py-2 rounded-full text-[12.5px] font-bold border-[1.5px] border-slate-200 text-slate-500 hover:bg-slate-50 transition-all"
                >
                  Close
                </button>
                <button
                  onClick={downloadPDF}
                  disabled={busy}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full text-[12.5px] font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_4px_12px_rgba(91,56,240,.28)] hover:shadow-[0_6px_20px_rgba(91,56,240,.36)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {busy ? "⏳ Generating…" : "⬇ Download PDF"}
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ── TOAST ── */}
      {toast && (
        <div className="toast-anim fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-slate-900 text-white px-6 py-2.5 rounded-full text-[13px] font-bold shadow-[0_8px_26px_rgba(0,0,0,.2)] whitespace-nowrap">
          {toast}
        </div>
      )}
    </>
  );
}
