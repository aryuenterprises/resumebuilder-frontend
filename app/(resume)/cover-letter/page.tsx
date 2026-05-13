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
// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   ReactNode,
//   JSX,
// } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiZoomIn,
//   FiZoomOut,
//   FiRefreshCw,
//   FiEye,
//   FiLock,
// } from "react-icons/fi";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { API_URL } from "@/app/config/api";
// import { getLocalStorage } from "@/app/utils/localStorage";

// /* ─────────────────────────────────────────────────────────────
//    TYPES
// ───────────────────────────────────────────────────────────────*/
// interface User {
//   id: string;
//   [key: string]: any;
// }
// interface Payment {
//   plan?: string;
//   status?: string;
//   [key: string]: any;
// }

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
//   letterDate: string;
//   accentColor: string;
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
//         "Express your enthusiasm for the role and a compelling hook about why you're perfect for it…",
//     },
//     {
//       id: "2",
//       title: "Experience & Skills",
//       content: "",
//       placeholder: "Highlight 2–3 specific accomplishments with metrics…",
//     },
//     {
//       id: "3",
//       title: "Why This Company",
//       content: "",
//       placeholder:
//         "Demonstrate genuine research — reference their mission, products, or culture…",
//     },
//     {
//       id: "4",
//       title: "Closing",
//       content: "",
//       placeholder:
//         "Restate enthusiasm, clear call to action, mention portfolio if applicable…",
//     },
//   ],
//   achievements: [],
//   skills: [],
//   tone: "professional",
//   notes: "",
//   letterDate: new Date().toISOString().split("T")[0],
//   accentColor: "#6366f1",
// };

// /* ─────────────────────────────────────────────────────────────
//    ACCENT COLOR PRESETS
// ───────────────────────────────────────────────────────────────*/
// const ACCENT_COLORS = [
//   "#6366f1",
//   "#7c3aed",
//   "#8b5cf6",
//   "#a855f7",
//   "#ec4899",
//   "#f43f5e",
//   "#ef4444",
//   "#f97316",
//   "#f59e0b",
//   "#eab308",
//   "#84cc16",
//   "#22c55e",
//   "#10b981",
//   "#14b8a6",
//   "#06b6d4",
//   "#0ea5e9",
//   "#3b82f6",
//   "#1d4ed8",
//   "#1e293b",
//   "#374151",
//   "#78716c",
//   "#000000",
// ];

// /* ─────────────────────────────────────────────────────────────
//    CANVAS PREVIEW — fixed drag origin, touch pinch
// ───────────────────────────────────────────────────────────────*/
// function CanvasPreview({ children }: { children: ReactNode }) {
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [scale, setScale] = useState(0.55);
//   const [pos, setPos] = useState({ x: 24, y: 24 });
//   const [dragging, setDragging] = useState(false);
//   const scaleRef = useRef(0.55);
//   const posRef = useRef({ x: 24, y: 24 });
//   const downRef = useRef<{
//     cx: number;
//     cy: number;
//     px: number;
//     py: number;
//   } | null>(null);
//   const dragOnRef = useRef(false);
//   const animRef = useRef<number | null>(null);
//   const pinchRef = useRef(0);

//   const initS = useCallback(() => {
//     if (!wrapRef.current) return 0.55;
//     const w = wrapRef.current.clientWidth;
//     return w < 480
//       ? 0.32
//       : w < 640
//         ? 0.4
//         : w < 768
//           ? 0.5
//           : w < 1024
//             ? 0.56
//             : 0.62;
//   }, []);

//   useEffect(() => {
//     const s = initS();
//     setScale(s);
//     scaleRef.current = s;
//     const fn = () => {
//       const s2 = initS();
//       setScale(s2);
//       scaleRef.current = s2;
//     };
//     window.addEventListener("resize", fn);
//     return () => window.removeEventListener("resize", fn);
//   }, [initS]);

//   const smoothTo = (t: number) => {
//     if (animRef.current) cancelAnimationFrame(animRef.current);
//     const from = scaleRef.current,
//       t0 = performance.now();
//     const go = (now: number) => {
//       const p = Math.min((now - t0) / 150, 1);
//       const v = from + (t - from) * (1 - Math.pow(1 - p, 3));
//       setScale(v);
//       scaleRef.current = v;
//       if (p < 1) animRef.current = requestAnimationFrame(go);
//     };
//     animRef.current = requestAnimationFrame(go);
//   };
//   const zIn = () => smoothTo(Math.min(scaleRef.current + 0.12, 3));
//   const zOut = () => smoothTo(Math.max(scaleRef.current - 0.12, 0.2));
//   const zReset = () => {
//     smoothTo(initS());
//     const p = { x: 24, y: 24 };
//     setPos(p);
//     posRef.current = p;
//   };

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;
//     const isInteractive = (t: EventTarget | null) => {
//       const tag = (t as HTMLElement)?.tagName ?? "";
//       return (
//         ["BUTTON", "INPUT", "A", "SELECT", "TEXTAREA"].includes(tag) ||
//         !!(t as HTMLElement)?.closest?.("[data-nodrag]")
//       );
//     };
//     /* ── MOUSE ── */
//     const onDown = (e: MouseEvent) => {
//       if (isInteractive(e.target)) return;
//       e.preventDefault();
//       downRef.current = {
//         cx: e.clientX,
//         cy: e.clientY,
//         px: posRef.current.x,
//         py: posRef.current.y,
//       };
//       dragOnRef.current = false;
//     };
//     const onMove = (e: MouseEvent) => {
//       if (!downRef.current) return;
//       const dx = e.clientX - downRef.current.cx,
//         dy = e.clientY - downRef.current.cy;
//       if (!dragOnRef.current && Math.hypot(dx, dy) > 4) {
//         dragOnRef.current = true;
//         setDragging(true);
//       }
//       if (dragOnRef.current) {
//         e.preventDefault();
//         const np = { x: downRef.current.px + dx, y: downRef.current.py + dy };
//         setPos(np);
//         posRef.current = np;
//       }
//     };
//     const onUp = () => {
//       downRef.current = null;
//       dragOnRef.current = false;
//       setDragging(false);
//     };
//     /* ── TOUCH ── */
//     const onTouchStart = (e: TouchEvent) => {
//       if (isInteractive(e.target)) return;
//       if (e.touches.length === 2) {
//         pinchRef.current = Math.hypot(
//           e.touches[1].clientX - e.touches[0].clientX,
//           e.touches[1].clientY - e.touches[0].clientY,
//         );
//         return;
//       }
//       const t = e.touches[0];
//       downRef.current = {
//         cx: t.clientX,
//         cy: t.clientY,
//         px: posRef.current.x,
//         py: posRef.current.y,
//       };
//       dragOnRef.current = false;
//     };
//     const onTouchMove = (e: TouchEvent) => {
//       e.preventDefault();
//       if (e.touches.length === 2) {
//         const d = Math.hypot(
//           e.touches[1].clientX - e.touches[0].clientX,
//           e.touches[1].clientY - e.touches[0].clientY,
//         );
//         if (pinchRef.current > 0) {
//           const ns = Math.max(
//             0.2,
//             Math.min(3, scaleRef.current * (d / pinchRef.current)),
//           );
//           setScale(ns);
//           scaleRef.current = ns;
//         }
//         pinchRef.current = d;
//         return;
//       }
//       if (!downRef.current) return;
//       const t = e.touches[0];
//       const dx = t.clientX - downRef.current.cx,
//         dy = t.clientY - downRef.current.cy;
//       if (!dragOnRef.current && Math.hypot(dx, dy) > 4) {
//         dragOnRef.current = true;
//         setDragging(true);
//       }
//       if (dragOnRef.current) {
//         const np = { x: downRef.current.px + dx, y: downRef.current.py + dy };
//         setPos(np);
//         posRef.current = np;
//       }
//     };
//     const onTouchEnd = () => {
//       downRef.current = null;
//       dragOnRef.current = false;
//       setDragging(false);
//       pinchRef.current = 0;
//     };
//     /* ── WHEEL ── */
//     const onWheel = (e: WheelEvent) => {
//       e.preventDefault();
//       if (e.ctrlKey || e.metaKey) {
//         const ns = Math.max(
//           0.2,
//           Math.min(3, scaleRef.current * Math.exp(-e.deltaY * 0.002)),
//         );
//         setScale(ns);
//         scaleRef.current = ns;
//       } else {
//         const np = {
//           x: posRef.current.x - e.deltaX * 0.5,
//           y: posRef.current.y - e.deltaY * 0.5,
//         };
//         setPos(np);
//         posRef.current = np;
//       }
//     };
//     el.addEventListener("mousedown", onDown, { passive: false });
//     el.addEventListener("mousemove", onMove, { passive: false });
//     el.addEventListener("mouseup", onUp);
//     el.addEventListener("mouseleave", onUp);
//     el.addEventListener("touchstart", onTouchStart, { passive: false });
//     el.addEventListener("touchmove", onTouchMove, { passive: false });
//     el.addEventListener("touchend", onTouchEnd);
//     el.addEventListener("wheel", onWheel, { passive: false });
//     return () => {
//       el.removeEventListener("mousedown", onDown);
//       el.removeEventListener("mousemove", onMove);
//       el.removeEventListener("mouseup", onUp);
//       el.removeEventListener("mouseleave", onUp);
//       el.removeEventListener("touchstart", onTouchStart);
//       el.removeEventListener("touchmove", onTouchMove);
//       el.removeEventListener("touchend", onTouchEnd);
//       el.removeEventListener("wheel", onWheel);
//     };
//   }, []);

//   return (
//     <div
//       ref={wrapRef}
//       className="relative w-full h-full"
//       style={{ minHeight: 380 }}
//     >
//       <div
//         ref={containerRef}
//         className="absolute inset-0 overflow-hidden bg-slate-200/60"
//         style={{
//           cursor: dragging ? "grabbing" : "grab",
//           borderRadius: 12,
//           touchAction: "none",
//           userSelect: "none",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             transformOrigin: "top left",
//             transform: `translate(${pos.x}px,${pos.y}px) scale(${scale})`,
//             willChange: "transform",
//           }}
//         >
//           {children}
//         </div>
//       </div>
//       {/* Scale badge */}
//       <div
//         data-nodrag
//         className="absolute top-2.5 left-2.5 z-20 pointer-events-none bg-white/90 backdrop-blur-sm border border-indigo-100 text-indigo-600 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm"
//       >
//         {Math.round(scale * 100)}%
//       </div>
//       {/* Controls */}
//       <div
//         data-nodrag
//         className="absolute bottom-3 right-3 z-20 flex flex-col gap-1.5"
//       >
//         {[
//           { fn: zIn, icon: <FiZoomIn />, p: true },
//           { fn: zOut, icon: <FiZoomOut />, p: true },
//           {
//             fn: zReset,
//             icon: <FiRefreshCw className="w-3.5 h-3.5" />,
//             p: false,
//           },
//         ].map((b, i) => (
//           <motion.button
//             key={i}
//             type="button"
//             onClick={b.fn}
//             whileHover={{ scale: 1.08 }}
//             whileTap={{ scale: 0.92 }}
//             className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md transition-all ${b.p ? "bg-gradient-to-br from-indigo-600 to-violet-600" : "bg-gray-600 hover:bg-gray-700"}`}
//           >
//             {b.icon}
//           </motion.button>
//         ))}
//       </div>
//       <p
//         data-nodrag
//         className="absolute bottom-3 left-2.5 z-20 pointer-events-none text-[10px] font-semibold text-slate-400"
//       >
//         Drag · Pinch · Ctrl+Scroll
//       </p>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    40 TEMPLATE DEFINITIONS
// ───────────────────────────────────────────────────────────────*/
// const TEMPLATES = [
//   // Modern
//   { id: "aurora", name: "Aurora", tag: "Modern", dark: false },
//   { id: "prism", name: "Prism", tag: "Modern", dark: false },
//   { id: "frost", name: "Frost", tag: "Modern", dark: false },
//   { id: "canvas", name: "Canvas", tag: "Minimal", dark: false },
//   { id: "pearl", name: "Pearl", tag: "Minimal", dark: false },
//   { id: "nordic", name: "Nordic", tag: "Minimal", dark: false },
//   { id: "minimal", name: "Minimal", tag: "Minimal", dark: false },
//   { id: "clean", name: "Clean", tag: "Minimal", dark: false },
//   // Corporate / Professional
//   { id: "slate", name: "Slate", tag: "Corporate", dark: false },
//   { id: "architect", name: "Architect", tag: "Corporate", dark: false },
//   { id: "executive", name: "Executive", tag: "Corporate", dark: false },
//   { id: "boardroom", name: "Boardroom", tag: "Corporate", dark: false },
//   { id: "metro", name: "Metro", tag: "Corporate", dark: false },
//   { id: "summit", name: "Summit", tag: "Corporate", dark: false },
//   // Creative / Design
//   { id: "designer", name: "Designer", tag: "Creative", dark: true },
//   { id: "studio", name: "Studio", tag: "Creative", dark: false },
//   { id: "palette", name: "Palette", tag: "Creative", dark: false },
//   { id: "bauhaus", name: "Bauhaus", tag: "Creative", dark: false },
//   { id: "gradient", name: "Gradient", tag: "Creative", dark: false },
//   { id: "split", name: "Split", tag: "Creative", dark: false },
//   // Editorial / Classic
//   { id: "crimson", name: "Crimson", tag: "Editorial", dark: false },
//   { id: "serif", name: "Serif", tag: "Classic", dark: false },
//   { id: "ivory", name: "Ivory", tag: "Classic", dark: false },
//   { id: "herald", name: "Herald", tag: "Classic", dark: false },
//   { id: "chronicle", name: "Chronicle", tag: "Classic", dark: false },
//   // Luxury / Premium
//   { id: "velvet", name: "Velvet", tag: "Luxury", dark: true },
//   { id: "obsidian", name: "Obsidian", tag: "Luxury", dark: true },
//   { id: "onyx", name: "Onyx", tag: "Luxury", dark: true },
//   { id: "sapphire", name: "Sapphire", tag: "Luxury", dark: false },
//   { id: "golden", name: "Golden", tag: "Luxury", dark: false },
//   // Video / Motion
//   { id: "director", name: "Director", tag: "Video", dark: true },
//   { id: "motion", name: "Motion", tag: "Video", dark: false },
//   { id: "reel", name: "Reel", tag: "Video", dark: true },
//   { id: "frame", name: "Frame", tag: "Video", dark: false },
//   // Tech / Dark
//   { id: "carbon", name: "Carbon", tag: "Tech", dark: true },
//   { id: "plasma", name: "Plasma", tag: "Tech", dark: true },
//   { id: "neon", name: "Neon", tag: "Tech", dark: true },
//   { id: "matrix", name: "Matrix", tag: "Tech", dark: true },
//   // Warm / Natural
//   { id: "emerald", name: "Emerald", tag: "Natural", dark: false },
//   { id: "terracotta", name: "Terracotta", tag: "Natural", dark: false },
// ];

// /* ─────────────────────────────────────────────────────────────
//    SVG THUMBNAILS — 40 unique designs
// ───────────────────────────────────────────────────────────────*/
// function TplThumb({ id, accent }: { id: string; accent: string }) {
//   const W = 220,
//     H = 155;
//   const ac = accent;
//   const thumbMap: Record<string, JSX.Element> = {
//     // ── Modern ──
//     aurora: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff" />
//         <rect width={W} height={52} fill={ac} />
//         <circle cx={205} cy={0} r={52} fill="rgba(255,255,255,.15)" />
//         <rect
//           x={13}
//           y={13}
//           width={88}
//           height={8}
//           rx={2}
//           fill="rgba(255,255,255,.92)"
//         />
//         <rect
//           x={13}
//           y={25}
//           width={54}
//           height={4}
//           rx={1.5}
//           fill="rgba(255,255,255,.6)"
//         />
//         {[0, 38, 76].map((ox, i) => (
//           <rect
//             key={i}
//             x={13 + ox}
//             y={37}
//             width={30}
//             height={5}
//             rx={10}
//             fill="rgba(255,255,255,.2)"
//             stroke="rgba(255,255,255,.35)"
//             strokeWidth=".6"
//           />
//         ))}
//         <rect x={13} y={62} width={40} height={3} rx={1} fill="#9ca3af" />
//         {[69, 75, 81].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[130, 110, 120][i]}
//             height={2.5}
//             rx={1}
//             fill="#e5e7eb"
//           />
//         ))}
//         <rect x={13} y={90} width={44} height={3} rx={1} fill={ac} />
//         {[97, 102, 107].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[180, 165, 175][i]}
//             height={2.5}
//             rx={1}
//             fill="#e5e7eb"
//           />
//         ))}
//         <rect x={13} y={117} width={44} height={3} rx={1} fill={ac} />
//         {[124, 129].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[175, 120][i]}
//             height={2.5}
//             rx={1}
//             fill="#e5e7eb"
//           />
//         ))}
//       </svg>
//     ),

//     prism: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff" />
//         <rect width={W} height={55} fill={ac} />
//         <polygon points="120,0 220,0 220,55" fill="rgba(255,255,255,.12)" />
//         <polygon points="160,0 220,0 220,55" fill="rgba(255,255,255,.08)" />
//         <rect x={13} y={12} width={85} height={9} rx={1.5} fill="white" />
//         <rect
//           x={13}
//           y={25}
//           width={52}
//           height={3.5}
//           rx={1}
//           fill="rgba(255,255,255,.65)"
//         />
//         <rect width={W} height={11} y={55} fill="rgba(0,0,0,.55)" />
//         {[0, 50, 104].map((ox, i) => (
//           <rect
//             key={i}
//             x={13 + ox}
//             y={59}
//             width={40}
//             height={2}
//             rx={1}
//             fill="rgba(255,255,255,.45)"
//           />
//         ))}
//         <rect x={13} y={78} width={32} height={2.5} rx={1} fill="#9ca3af" />
//         {[85, 90].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[188, 160][i]}
//             height={2.2}
//             rx={1}
//             fill="#e5e7eb"
//           />
//         ))}
//         <rect x={13} y={100} width={3} height={22} rx={1} fill={ac} />
//         {[100, 106, 111].map((y, i) => (
//           <rect
//             key={i}
//             x={19}
//             y={y}
//             width={i === 0 ? 38 : [180, 155][i - 1]}
//             height={2.2}
//             rx={1}
//             fill={i === 0 ? ac : "#e5e7eb"}
//           />
//         ))}
//       </svg>
//     ),

//     frost: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <defs>
//           <linearGradient id={`fg_${id}`} x1="0" y1="0" x2="1" y2="1">
//             <stop offset="0%" stopColor="#dbeafe" />
//             <stop offset="100%" stopColor="#e0f2fe" />
//           </linearGradient>
//         </defs>
//         <rect width={W} height={H} fill={`url(#fg_${id})`} />
//         <rect
//           x={5}
//           y={5}
//           width={210}
//           height={145}
//           rx={10}
//           fill="rgba(255,255,255,.82)"
//         />
//         <rect x={5} y={5} width={210} height={50} rx={10} fill={ac} />
//         <rect x={5} y={31} width={210} height={24} fill={ac} />
//         <rect x={17} y={14} width={80} height={8} rx={1.5} fill="white" />
//         <rect
//           x={17}
//           y={26}
//           width={48}
//           height={3}
//           rx={1}
//           fill="rgba(255,255,255,.65)"
//         />
//         {[0, 32, 66].map((ox, i) => (
//           <rect
//             key={i}
//             x={17 + ox}
//             y={38}
//             width={28}
//             height={4}
//             rx={10}
//             fill="rgba(255,255,255,.18)"
//             stroke="rgba(255,255,255,.3)"
//             strokeWidth=".5"
//           />
//         ))}
//         <rect x={17} y={84} width={42} height={3} rx={1} fill={ac} />
//         {[91, 96, 101].map((y, i) => (
//           <rect
//             key={i}
//             x={17}
//             y={y}
//             width={[185, 172, 178][i]}
//             height={2.2}
//             rx={1}
//             fill="#e5e7eb"
//           />
//         ))}
//       </svg>
//     ),

//     canvas: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff" />
//         <rect x={13} y={13} width={4} height={58} rx={2} fill={ac} />
//         <rect x={22} y={13} width={92} height={10} rx={2} fill="#111827" />
//         <rect x={22} y={27} width={57} height={4} rx={1.5} fill="#6b7280" />
//         {[35, 41, 47].map((y, i) => (
//           <rect
//             key={i}
//             x={22}
//             y={y}
//             width={[70, 58, 74][i]}
//             height={2.5}
//             rx={1}
//             fill="#9ca3af"
//           />
//         ))}
//         <rect x={13} y={76} width={188} height={1} fill="#f3f4f6" />
//         <rect x={13} y={104} width={44} height={3} rx={1} fill={ac} />
//         {[111, 116, 121].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[188, 172, 178][i]}
//             height={2.2}
//             rx={1}
//             fill="#f3f4f6"
//           />
//         ))}
//         <rect x={13} y={131} width={44} height={3} rx={1} fill={ac} />
//         {[138, 143].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[188, 122][i]}
//             height={2.2}
//             rx={1}
//             fill="#f3f4f6"
//           />
//         ))}
//       </svg>
//     ),

//     pearl: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff" />
//         <rect x={13} y={13} width={97} height={10} rx={1.5} fill="#111827" />
//         <rect x={13} y={27} width={60} height={3.5} rx={1} fill={ac} />
//         <rect x={13} y={36} width={188} height={0.6} fill="#e5e7eb" />
//         {[42, 48].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[62, 54][i]}
//             height={2}
//             rx={1}
//             fill="#9ca3af"
//           />
//         ))}
//         <rect x={92} y={42} width={57} height={2} rx={1} fill="#9ca3af" />
//         <rect x={13} y={58} width={188} height={0.6} fill="#e5e7eb" />
//         <rect x={13} y={87} width={44} height={3} rx={1} fill={ac} />
//         {[94, 99, 104].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[188, 172, 178][i]}
//             height={2.2}
//             rx={1}
//             fill="#f3f4f6"
//           />
//         ))}
//         <rect x={13} y={115} width={44} height={3} rx={1} fill={ac} />
//       </svg>
//     ),

//     nordic: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff" />
//         <rect
//           x={16}
//           y={13}
//           width={62}
//           height={3}
//           rx={1}
//           fill={ac}
//           opacity=".5"
//         />
//         <rect x={16} y={20} width={118} height={10} rx={1.5} fill="#1e1b4b" />
//         <rect x={16} y={34} width={38} height={3} rx={1} fill={ac} />
//         <rect x={16} y={43} width={188} height={0.8} fill={ac} opacity=".3" />
//         {[0, 62, 124].map((ox, i) => (
//           <rect
//             key={i}
//             x={16 + ox}
//             y={50}
//             width={56}
//             height={2}
//             rx={1}
//             fill="#9ca3af"
//           />
//         ))}
//         <rect x={16} y={84} width={44} height={3} rx={1} fill={ac} />
//         {[91, 96, 101].map((y, i) => (
//           <rect
//             key={i}
//             x={16}
//             y={y}
//             width={[188, 162, 177][i]}
//             height={2.2}
//             rx={1}
//             fill="#e5e7eb"
//           />
//         ))}
//         <rect x={16} y={111} width={44} height={3} rx={1} fill={ac} />
//       </svg>
//     ),

//     minimal: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fafafa" />
//         <rect x={16} y={16} width={110} height={11} rx={1} fill="#111" />
//         <rect x={16} y={31} width={70} height={3} rx={1} fill="#666" />
//         <rect x={16} y={40} width={188} height={0.5} fill="#ddd" />
//         {[46, 51, 56, 61].map((y, i) => (
//           <rect
//             key={i}
//             x={16}
//             y={y}
//             width={[80, 65, 90, 55][i]}
//             height={2}
//             rx={1}
//             fill="#aaa"
//           />
//         ))}
//         <rect x={16} y={73} width={188} height={0.5} fill="#ddd" />
//         <rect x={16} y={104} width={40} height={2.5} rx={1} fill={ac} />
//         {[111, 116, 121].map((y, i) => (
//           <rect
//             key={i}
//             x={16}
//             y={y}
//             width={[188, 170, 178][i]}
//             height={2}
//             rx={1}
//             fill="#ddd"
//           />
//         ))}
//       </svg>
//     ),

//     clean: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff" />
//         <rect x={14} y={14} width={192} height={1} fill={ac} />
//         <rect x={14} y={18} width={95} height={10} rx={0} fill="#111" />
//         <rect x={14} y={32} width={60} height={3} rx={0} fill="#555" />
//         <rect x={14} y={44} width={192} height={0.5} fill="#ddd" />
//         {[50, 55, 60, 65].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[70, 55, 80, 50][i]}
//             height={2}
//             rx={0}
//             fill="#888"
//           />
//         ))}
//         <rect x={14} y={80} width={192} height={0.5} fill="#ddd" />
//         <rect x={14} y={88} width={38} height={2.5} rx={0} fill={ac} />
//         {[95, 100, 105].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[192, 178, 185][i]}
//             height={2}
//             rx={0}
//             fill="#e5e7eb"
//           />
//         ))}
//         <rect x={14} y={115} width={38} height={2.5} rx={0} fill={ac} />
//         {[122, 127].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[192, 140][i]}
//             height={2}
//             rx={0}
//             fill="#e5e7eb"
//           />
//         ))}
//         <rect x={14} y={152} width={192} height={1} fill={ac} />
//       </svg>
//     ),

//     // ── Corporate ──
//     slate: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff" />
//         <rect x={13} y={13} width={92} height={9} rx={1.5} fill="#0f172a" />
//         <rect x={13} y={26} width={55} height={3} rx={1} fill="#64748b" />
//         <rect x={137} y={13} width={70} height={2.5} rx={1} fill="#475569" />
//         {[19, 25, 31, 37].map((y, i) => (
//           <rect
//             key={i}
//             x={137}
//             y={y}
//             width={[60, 70, 55, 65][i]}
//             height={2}
//             rx={1}
//             fill="#94a3b8"
//           />
//         ))}
//         <rect x={13} y={38} width={192} height={1.8} fill="#0f172a" />
//         <rect x={13} y={78} width={2.5} height={28} rx={1} fill={ac} />
//         {[78, 84, 89, 94].map((y, i) => (
//           <rect
//             key={i}
//             x={19}
//             y={y}
//             width={i === 0 ? 38 : [180, 158, 168][i - 1]}
//             height={2.2}
//             rx={1}
//             fill={i === 0 ? ac : "#e5e7eb"}
//           />
//         ))}
//       </svg>
//     ),

//     architect: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#f8fafc" />
//         <rect x={13} y={13} width={82} height={10} rx={1.5} fill="#0f172a" />
//         <rect x={113} y={13} width={94} height={40} rx={5} fill={ac} />
//         {[18, 24, 30, 36].map((y, i) => (
//           <rect
//             key={i}
//             x={119}
//             y={y}
//             width={[62, 52, 72, 46][i]}
//             height={2}
//             rx={1}
//             fill="rgba(255,255,255,.7)"
//           />
//         ))}
//         <rect x={13} y={53} width={192} height={1.2} fill="#e2e8f0" />
//         <rect x={13} y={82} width={44} height={3} rx={1} fill={ac} />
//         {[89, 94, 99].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[188, 172, 178][i]}
//             height={2.2}
//             rx={1}
//             fill="#e2e8f0"
//           />
//         ))}
//       </svg>
//     ),

//     executive: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff" />
//         <rect x={14} y={14} width={3} height={127} rx={1.5} fill={ac} />
//         <rect x={22} y={14} width={88} height={9} rx={0} fill="#0f172a" />
//         <rect x={22} y={27} width={55} height={3} rx={0} fill="#475569" />
//         <rect x={22} y={36} width={188} height={0.5} fill="#e2e8f0" />
//         {[42, 47, 52, 57].map((y, i) => (
//           <rect
//             key={i}
//             x={22}
//             y={y}
//             width={[70, 58, 80, 50][i]}
//             height={2}
//             rx={0}
//             fill="#94a3b8"
//           />
//         ))}
//         <rect x={22} y={70} width={32} height={2} rx={0} fill="#6b7280" />
//         {[77, 82].map((y, i) => (
//           <rect
//             key={i}
//             x={22}
//             y={y}
//             width={[184, 162][i]}
//             height={2}
//             rx={0}
//             fill="#e2e8f0"
//           />
//         ))}
//         <rect x={22} y={92} width={40} height={2.5} rx={0} fill={ac} />
//         {[99, 104, 109].map((y, i) => (
//           <rect
//             key={i}
//             x={22}
//             y={y}
//             width={[184, 170, 176][i]}
//             height={2}
//             rx={0}
//             fill="#e2e8f0"
//           />
//         ))}
//       </svg>
//     ),

//     boardroom: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff" />
//         <rect width={W} height={8} fill={ac} />
//         <rect x={14} y={18} width={90} height={10} rx={0} fill="#0f172a" />
//         <rect x={14} y={32} width={55} height={3} rx={0} fill="#475569" />
//         <rect x={14} y={42} width={192} height={1} fill="#e2e8f0" />
//         {[48, 53, 58, 63].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[72, 60, 82, 52][i]}
//             height={2}
//             rx={0}
//             fill="#94a3b8"
//           />
//         ))}
//         <rect x={14} y={78} width={42} height={2.5} rx={0} fill={ac} />
//         {[85, 90, 95].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[192, 178, 185][i]}
//             height={2}
//             rx={0}
//             fill="#e5e7eb"
//           />
//         ))}
//         <rect x={14} y={108} width={42} height={2.5} rx={0} fill={ac} />
//         {[115, 120].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[192, 140][i]}
//             height={2}
//             rx={0}
//             fill="#e5e7eb"
//           />
//         ))}
//         <rect width={W} height={8} y={147} fill={ac} />
//       </svg>
//     ),

//     metro: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff" />
//         <rect width={65} height={H} fill={ac} />
//         <rect
//           x={8}
//           y={14}
//           width={48}
//           height={8}
//           rx={1}
//           fill="rgba(255,255,255,.9)"
//         />
//         <rect
//           x={8}
//           y={26}
//           width={34}
//           height={3}
//           rx={1}
//           fill="rgba(255,255,255,.6)"
//         />
//         {[36, 44, 52, 60, 68].map((y, i) => (
//           <rect
//             key={i}
//             x={8}
//             y={y}
//             width={46}
//             height={2.5}
//             rx={1}
//             fill="rgba(255,255,255,.4)"
//           />
//         ))}
//         <rect x={75} y={14} width={130} height={9} rx={0} fill="#0f172a" />
//         {[28, 34].map((y, i) => (
//           <rect
//             key={i}
//             x={75}
//             y={y}
//             width={[100, 80][i]}
//             height={2}
//             rx={0}
//             fill="#6b7280"
//           />
//         ))}
//         <rect x={75} y={85} width={40} height={2.5} rx={0} fill={ac} />
//         {[92, 97, 102].map((y, i) => (
//           <rect
//             key={i}
//             x={75}
//             y={y}
//             width={[130, 118, 125][i]}
//             height={2}
//             rx={0}
//             fill="#e5e7eb"
//           />
//         ))}
//       </svg>
//     ),

//     summit: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff" />
//         <rect x={14} y={14} width={88} height={9} rx={0} fill="#0f172a" />
//         <rect x={14} y={27} width={50} height={3} rx={0} fill="#475569" />
//         <rect x={14} y={36} width={192} height={2} fill="#0f172a" />
//         <rect x={14} y={44} width={192} height={0.5} fill={ac} />
//         <rect x={14} y={70} width={34} height={2} rx={0} fill="#888" />
//         {[77, 82].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[192, 166][i]}
//             height={2}
//             rx={0}
//             fill="#e5e7eb"
//           />
//         ))}
//         <rect x={14} y={95} width={40} height={2.5} rx={0} fill={ac} />
//         {[102, 107, 112].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[192, 178, 185][i]}
//             height={2}
//             rx={0}
//             fill="#e5e7eb"
//           />
//         ))}
//         <rect x={14} y={152} width={192} height={2} fill="#0f172a" />
//       </svg>
//     ),

//     // ── Creative ──
//     designer: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <defs>
//           <linearGradient id={`dg_${id}`} x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor="#0d0d0d" />
//             <stop offset="100%" stopColor="#1a0a2e" />
//           </linearGradient>
//         </defs>
//         <rect width={W} height={H} fill="#faf5ff" />
//         <rect width={70} height={H} fill={`url(#dg_${id})`} />
//         <circle
//           cx={35}
//           cy={70}
//           r={25}
//           fill="rgba(139,92,246,.18)"
//           stroke={ac}
//           strokeWidth="1"
//         />
//         <text x={35} y={74} textAnchor="middle" fontSize={14} fill={ac}>
//           ✦
//         </text>
//         <rect x={8} y={13} width={52} height={8} rx={1.5} fill="white" />
//         <rect x={80} y={75} width={50} height={3} rx={1} fill={ac} />
//         {[82, 87, 92, 97].map((y, i) => (
//           <rect
//             key={i}
//             x={80}
//             y={y}
//             width={[130, 120, 118, 128][i]}
//             height={2.2}
//             rx={1}
//             fill="#e5e7eb"
//           />
//         ))}
//       </svg>
//     ),

//     studio: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff" />
//         <rect
//           x={0}
//           y={0}
//           width={W}
//           height={60}
//           fill="#fafafa"
//           stroke="#f0f0f0"
//           strokeWidth="0"
//         />
//         <rect
//           x={14}
//           y={14}
//           width={70}
//           height={70}
//           rx={4}
//           fill={ac}
//           opacity=".12"
//           stroke={ac}
//           strokeWidth="1"
//         />
//         <text
//           x={49}
//           y={55}
//           textAnchor="middle"
//           fontSize={22}
//           fill={ac}
//           opacity=".7"
//         >
//           ✦
//         </text>
//         <rect x={92} y={14} width={90} height={9} rx={1} fill="#111" />
//         <rect x={92} y={27} width={60} height={3} rx={1} fill="#555" />
//         {[34, 39, 44].map((y, i) => (
//           <rect
//             key={i}
//             x={92}
//             y={y}
//             width={[80, 65, 72][i]}
//             height={2}
//             rx={1}
//             fill="#9ca3af"
//           />
//         ))}
//         <rect x={14} y={90} width={192} height={0.8} fill="#f0f0f0" />
//         <rect x={14} y={100} width={38} height={2.5} rx={1} fill={ac} />
//         {[107, 112, 117].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[192, 176, 183][i]}
//             height={2}
//             rx={1}
//             fill="#f0f0f0"
//           />
//         ))}
//       </svg>
//     ),

//     palette: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff" />
//         {[0, 6, 12, 18, 24].map((x, i) => (
//           <rect
//             key={i}
//             x={x * 9}
//             y={0}
//             width={W}
//             height={6}
//             fill={[ac, "#ec4899", "#f59e0b", "#10b981", "#3b82f6"][i]}
//             opacity={[1, 0.75, 0.5, 0.35, 0.2][i]}
//           />
//         ))}
//         <rect x={14} y={18} width={88} height={9} rx={1} fill="#111" />
//         <rect x={14} y={31} width={55} height={3} rx={1} fill="#555" />
//         {[40, 46, 52].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[70, 55, 80][i]}
//             height={2}
//             rx={1}
//             fill="#9ca3af"
//           />
//         ))}
//         <rect x={14} y={70} width={38} height={2.5} rx={1} fill={ac} />
//         {[77, 82, 87].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[192, 178, 183][i]}
//             height={2}
//             rx={1}
//             fill="#e5e7eb"
//           />
//         ))}
//       </svg>
//     ),

//     bauhaus: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fafafa" />
//         <rect width={W} height={H} fill="white" />
//         <rect
//           x={14}
//           y={14}
//           width={80}
//           height={80}
//           rx={40}
//           fill={ac}
//           opacity=".1"
//         />
//         <circle
//           cx={54}
//           cy={54}
//           r={30}
//           fill="none"
//           stroke={ac}
//           strokeWidth="2"
//         />
//         <circle cx={54} cy={54} r={18} fill={ac} opacity=".25" />
//         <rect x={100} y={14} width={108} height={9} rx={0} fill="#111" />
//         <rect x={100} y={27} width={70} height={3} rx={0} fill="#555" />
//         {[36, 41].map((y, i) => (
//           <rect
//             key={i}
//             x={100}
//             y={y}
//             width={[80, 60][i]}
//             height={2}
//             rx={0}
//             fill="#9ca3af"
//           />
//         ))}
//         <rect x={14} y={105} width={192} height={1} fill="#e5e7eb" />
//         <rect x={14} y={115} width={38} height={2.5} rx={0} fill={ac} />
//         {[122, 127].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[192, 150][i]}
//             height={2}
//             rx={0}
//             fill="#e5e7eb"
//           />
//         ))}
//       </svg>
//     ),

//     gradient: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <defs>
//           <linearGradient id={`gg_${id}`} x1="0" y1="0" x2="1" y2="1">
//             <stop offset="0%" stopColor={ac} />
//             <stop offset="100%" stopColor="#ec4899" />
//           </linearGradient>
//         </defs>
//         <rect width={W} height={H} fill="#fff" />
//         <rect width={W} height={55} fill={`url(#gg_${id})`} />
//         <rect
//           x={14}
//           y={13}
//           width={88}
//           height={9}
//           rx={2}
//           fill="rgba(255,255,255,.92)"
//         />
//         <rect
//           x={14}
//           y={26}
//           width={54}
//           height={4}
//           rx={1.5}
//           fill="rgba(255,255,255,.65)"
//         />
//         {[0, 38, 76].map((ox, i) => (
//           <rect
//             key={i}
//             x={14 + ox}
//             y={38}
//             width={30}
//             height={5}
//             rx={10}
//             fill="rgba(255,255,255,.2)"
//             stroke="rgba(255,255,255,.35)"
//             strokeWidth=".6"
//           />
//         ))}
//         <rect x={14} y={90} width={44} height={3} rx={1} fill={ac} />
//         {[97, 102, 107].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[185, 170, 178][i]}
//             height={2.2}
//             rx={1}
//             fill="#e5e7eb"
//           />
//         ))}
//       </svg>
//     ),

//     split: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff" />
//         <rect width={100} height={H} fill={ac} opacity=".06" />
//         <rect x={0} y={0} width={4} height={H} fill={ac} />
//         <rect x={14} y={14} width={80} height={9} rx={0} fill="#111" />
//         <rect x={14} y={27} width={50} height={3} rx={0} fill="#555" />
//         {[36, 41, 46, 51].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[72, 58, 78, 50][i]}
//             height={2}
//             rx={0}
//             fill="#9ca3af"
//           />
//         ))}
//         <rect x={14} y={68} width={192} height={0.5} fill="#e5e7eb" />
//         <rect x={114} y={80} width={90} height={9} rx={0} fill="#111" />
//         <rect x={114} y={93} width={55} height={3} rx={0} fill="#555" />
//         {[102, 107, 112].map((y, i) => (
//           <rect
//             key={i}
//             x={114}
//             y={y}
//             width={[90, 75, 80][i]}
//             height={2}
//             rx={0}
//             fill="#9ca3af"
//           />
//         ))}
//       </svg>
//     ),

//     // ── Editorial ──
//     crimson: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fffbf5" />
//         <rect width={W} height={4.5} fill={ac} />
//         <text
//           x={110}
//           y={25}
//           textAnchor="middle"
//           fontSize={11}
//           fontWeight="800"
//           fill="#1a0a0d"
//           fontFamily="Georgia,serif"
//         >
//           Alex Johnson
//         </text>
//         <text
//           x={110}
//           y={34}
//           textAnchor="middle"
//           fontSize={5.5}
//           fill={ac}
//           fontFamily="Georgia,serif"
//           fontStyle="italic"
//         >
//           Senior Product Manager
//         </text>
//         <text
//           x={110}
//           y={43}
//           textAnchor="middle"
//           fontSize={9}
//           fill={ac}
//           letterSpacing={4}
//         >
//           ✦ ✦ ✦
//         </text>
//         {[14, 80, 148].map((x, i) => (
//           <rect
//             key={i}
//             x={x}
//             y={48}
//             width={58}
//             height={2}
//             rx={1}
//             fill="#9ca3af"
//           />
//         ))}
//         <rect x={13} y={83} width={42} height={3} rx={1} fill={ac} />
//         {[90, 95, 100].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[188, 172, 178][i]}
//             height={2.2}
//             rx={1}
//             fill="#6b7280"
//           />
//         ))}
//       </svg>
//     ),

//     serif: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff" />
//         <rect x={13} y={13} width={192} height={0.8} fill="#1e293b" />
//         <text
//           x={110}
//           y={30}
//           textAnchor="middle"
//           fontSize={13}
//           fontWeight="800"
//           fill="#1e293b"
//           fontFamily="Georgia,serif"
//         >
//           Alexander Johnson
//         </text>
//         <text
//           x={110}
//           y={40}
//           textAnchor="middle"
//           fontSize={5.5}
//           fill="#64748b"
//           fontFamily="Georgia,serif"
//         >
//           Senior Product Designer
//         </text>
//         <rect x={13} y={45} width={192} height={0.8} fill="#1e293b" />
//         {[14, 80, 150].map((x, i) => (
//           <rect
//             key={i}
//             x={x}
//             y={51}
//             width={[60, 64, 52][i]}
//             height={2}
//             rx={1}
//             fill={ac}
//           />
//         ))}
//         <rect x={13} y={87} width={42} height={3} rx={1} fill={ac} />
//         {[94, 99, 104].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[188, 172, 178][i]}
//             height={2.2}
//             rx={1}
//             fill="#e5e7eb"
//           />
//         ))}
//       </svg>
//     ),

//     ivory: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fefce8" />
//         <rect x={13} y={13} width={5} height={130} rx={2.5} fill={ac} />
//         <rect x={23} y={13} width={90} height={10} rx={2} fill="#1c1917" />
//         <rect x={23} y={27} width={56} height={3.5} rx={1.5} fill="#78350f" />
//         <rect x={23} y={86} width={44} height={3} rx={1} fill={ac} />
//         {[93, 98, 103].map((y, i) => (
//           <rect
//             key={i}
//             x={23}
//             y={y}
//             width={[178, 164, 172][i]}
//             height={2.2}
//             rx={1}
//             fill="#e7e5e4"
//           />
//         ))}
//       </svg>
//     ),

//     herald: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fffdf7" />
//         <rect x={14} y={14} width={192} height={1.5} fill="#2c1810" />
//         <rect x={14} y={18} width={192} height={0.5} fill={ac} />
//         <text
//           x={110}
//           y={36}
//           textAnchor="middle"
//           fontSize={14}
//           fontWeight="800"
//           fill="#2c1810"
//           fontFamily="Georgia,serif"
//         >
//           Alexander J. Smith
//         </text>
//         <text
//           x={110}
//           y={46}
//           textAnchor="middle"
//           fontSize={6}
//           fill={ac}
//           fontFamily="Georgia,serif"
//         >
//           PRODUCT DESIGN LEAD · UX STRATEGY · BRAND IDENTITY
//         </text>
//         <rect x={14} y={52} width={192} height={0.5} fill={ac} />
//         <rect x={14} y={54} width={192} height={1.5} fill="#2c1810" />
//         {[62, 67].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[120, 90][i]}
//             height={2}
//             rx={0}
//             fill="#888"
//           />
//         ))}
//         <rect x={14} y={85} width={42} height={2.5} rx={0} fill={ac} />
//         {[92, 97, 102].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[192, 178, 183][i]}
//             height={2}
//             rx={0}
//             fill="#e5e7eb"
//           />
//         ))}
//       </svg>
//     ),

//     chronicle: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff" />
//         <rect x={14} y={14} width={80} height={0.8} fill="#111" />
//         <text
//           x={54}
//           y={30}
//           textAnchor="middle"
//           fontSize={14}
//           fontWeight="800"
//           fill="#111"
//           fontFamily="Georgia,serif"
//         >
//           A. Johnson
//         </text>
//         <rect x={14} y={35} width={80} height={0.8} fill="#111" />
//         <rect
//           x={14}
//           y={40}
//           width={80}
//           height={112}
//           fill="none"
//           stroke="#e5e7eb"
//           strokeWidth=".5"
//         />
//         {[46, 52, 58, 64, 70, 76].map((y, i) => (
//           <rect
//             key={i}
//             x={18}
//             y={y}
//             width={70}
//             height={2}
//             rx={0}
//             fill="#9ca3af"
//           />
//         ))}
//         <rect x={106} y={14} width={100} height={8} rx={0} fill="#111" />
//         <rect x={106} y={26} width={65} height={2.5} rx={0} fill="#555" />
//         <rect x={106} y={36} width={100} height={0.5} fill="#ddd" />
//         <rect x={106} y={78} width={38} height={2.5} rx={0} fill={ac} />
//         {[85, 90, 95].map((y, i) => (
//           <rect
//             key={i}
//             x={106}
//             y={y}
//             width={[100, 88, 94][i]}
//             height={2}
//             rx={0}
//             fill="#e5e7eb"
//           />
//         ))}
//       </svg>
//     ),

//     // ── Luxury ──
//     velvet: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <defs>
//           <linearGradient id={`vlv_${id}`} x1="0" y1="0" x2="1" y2="1">
//             <stop offset="0%" stopColor="#1e0f40" />
//             <stop offset="100%" stopColor="#2d1b69" />
//           </linearGradient>
//         </defs>
//         <rect width={W} height={H} fill={`url(#vlv_${id})`} />
//         <circle cx={192} cy={16} r={62} fill="rgba(168,85,247,.1)" />
//         <rect x={13} y={14} width={82} height={9} rx={1.5} fill="#f3e8ff" />
//         <rect
//           x={13}
//           y={27}
//           width={52}
//           height={2.5}
//           rx={1}
//           fill={ac}
//           opacity=".8"
//         />
//         {[44, 51, 58, 65, 72].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[50, 45, 55, 60, 48][i]}
//             height={4}
//             rx={2}
//             fill="rgba(196,181,253,.1)"
//             stroke={ac}
//             strokeWidth=".4"
//             opacity=".6"
//           />
//         ))}
//         <rect x={13} y={80} width={38} height={2.5} rx={1} fill={ac} />
//         {[87, 92, 97].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[188, 172, 158][i]}
//             height={2.2}
//             rx={1}
//             fill="rgba(212,201,239,.4)"
//           />
//         ))}
//       </svg>
//     ),

//     obsidian: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#f8f7ff" />
//         <rect width={63} height={H} fill="#1e1b4b" />
//         <rect
//           x={7}
//           y={13}
//           width={47}
//           height={7}
//           rx={1.5}
//           fill="rgba(233,213,255,.85)"
//         />
//         <rect
//           x={7}
//           y={24}
//           width={34}
//           height={3}
//           rx={1}
//           fill={ac}
//           opacity=".7"
//         />
//         {[
//           ["Email", 44],
//           ["Phone", 54],
//           ["Loc", 64],
//           ["LinkedIn", 74],
//           ["GitHub", 84],
//         ].map(([l, y], i) => (
//           <g key={i}>
//             <rect
//               x={7}
//               y={y as number}
//               width={18}
//               height={2}
//               rx={1}
//               fill="rgba(109,91,186,.7)"
//             />
//             <rect
//               x={7}
//               y={(y as number) + 6}
//               width={46}
//               height={2}
//               rx={1}
//               fill="rgba(196,181,253,.55)"
//             />
//           </g>
//         ))}
//         <rect x={72} y={36} width={40} height={3} rx={1} fill={ac} />
//         {[43, 48, 53].map((y, i) => (
//           <rect
//             key={i}
//             x={72}
//             y={y}
//             width={[138, 125, 130][i]}
//             height={2.2}
//             rx={1}
//             fill="#e5e7eb"
//           />
//         ))}
//       </svg>
//     ),

//     onyx: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#111" />
//         <rect x={0} y={0} width={W} height={4} fill={ac} />
//         <rect x={14} y={14} width={90} height={10} rx={0} fill="white" />
//         <rect x={14} y={28} width={55} height={3} rx={0} fill={ac} />
//         <rect x={14} y={38} width={192} height={0.5} fill={ac} opacity=".3" />
//         {[44, 50, 56, 62].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[65, 52, 75, 48][i]}
//             height={3}
//             rx={2}
//             fill="rgba(255,255,255,.08)"
//             stroke={ac}
//             strokeWidth=".5"
//             opacity=".8"
//           />
//         ))}
//         <rect x={14} y={80} width={38} height={2.5} rx={0} fill={ac} />
//         {[87, 92, 97].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[192, 176, 183][i]}
//             height={2}
//             rx={0}
//             fill="rgba(255,255,255,.25)"
//           />
//         ))}
//         <rect x={0} y={151} width={W} height={4} fill={ac} />
//       </svg>
//     ),

//     sapphire: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <defs>
//           <linearGradient id={`sph_${id}`} x1="0" y1="0" x2="1" y2="1">
//             <stop offset="0%" stopColor={ac} />
//             <stop offset="100%" stopColor="#1d4ed8" />
//           </linearGradient>
//         </defs>
//         <rect width={W} height={H} fill="#fff" />
//         <rect width={W} height={60} fill={`url(#sph_${id})`} />
//         <rect
//           x={13}
//           y={14}
//           width={90}
//           height={9}
//           rx={2}
//           fill="rgba(255,255,255,.92)"
//         />
//         <rect
//           x={13}
//           y={27}
//           width={55}
//           height={4}
//           rx={1.5}
//           fill="rgba(255,255,255,.65)"
//         />
//         {[0, 38, 78].map((ox, i) => (
//           <rect
//             key={i}
//             x={13 + ox}
//             y={40}
//             width={30}
//             height={5}
//             rx={10}
//             fill="rgba(255,255,255,.2)"
//             stroke="rgba(255,255,255,.3)"
//             strokeWidth=".6"
//           />
//         ))}
//         <rect x={13} y={85} width={40} height={2.5} rx={1} fill={ac} />
//         {[92, 97, 102].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[192, 175, 183][i]}
//             height={2.2}
//             rx={1}
//             fill="#e5e7eb"
//           />
//         ))}
//       </svg>
//     ),

//     golden: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fefce8" />
//         <rect x={14} y={14} width={4} height={130} rx={2} fill={ac} />
//         <rect x={22} y={14} width={188} height={2} fill={ac} />
//         <rect x={22} y={20} width={88} height={10} rx={0} fill="#1c1917" />
//         <rect x={22} y={34} width={55} height={3} rx={0} fill={ac} />
//         {[44, 50, 56].map((y, i) => (
//           <rect
//             key={i}
//             x={22}
//             y={y}
//             width={[70, 56, 78][i]}
//             height={2}
//             rx={0}
//             fill="#92400e"
//           />
//         ))}
//         <rect x={22} y={80} width={40} height={2.5} rx={0} fill={ac} />
//         {[87, 92, 97].map((y, i) => (
//           <rect
//             key={i}
//             x={22}
//             y={y}
//             width={[184, 170, 176][i]}
//             height={2}
//             rx={0}
//             fill="#e7e5e4"
//           />
//         ))}
//         <rect x={22} y={148} width={188} height={2} fill={ac} />
//       </svg>
//     ),

//     // ── Video ──
//     director: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#0f0a1e" />
//         <rect x={13} y={13} width={94} height={10} rx={1.5} fill="white" />
//         <rect x={13} y={27} width={57} height={3} rx={1} fill={ac} />
//         {[41, 47, 53].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[62, 56, 72][i]}
//             height={4}
//             rx={2}
//             fill="rgba(244,63,94,.1)"
//             stroke={ac}
//             strokeWidth=".6"
//             opacity=".7"
//           />
//         ))}
//         <rect x={13} y={87} width={2} height={2.5} rx={0.5} fill={ac} />
//         <rect x={19} y={87} width={38} height={2.5} rx={1} fill={ac} />
//         {[94, 99, 104].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[188, 172, 158][i]}
//             height={2.2}
//             rx={1}
//             fill="rgba(148,163,184,.28)"
//           />
//         ))}
//       </svg>
//     ),

//     motion: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <defs>
//           <linearGradient id={`mtg_${id}`} x1="0" y1="0" x2="1" y2="0">
//             <stop offset="0%" stopColor={ac} />
//             <stop offset="100%" stopColor="#f59e0b" />
//           </linearGradient>
//         </defs>
//         <rect width={W} height={H} fill="#fff" />
//         <rect width={W} height={5.5} fill={`url(#mtg_${id})`} />
//         <rect x={13} y={14} width={94} height={11} rx={1.5} fill="#111827" />
//         <rect x={13} y={29} width={62} height={3.5} rx={1} fill={ac} />
//         <rect x={13} y={89} width={44} height={3} rx={1} fill={ac} />
//         {[96, 101, 106].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[188, 172, 178][i]}
//             height={2.2}
//             rx={1}
//             fill="#f3f4f6"
//           />
//         ))}
//         <rect width={W} height={3} y={152} fill={`url(#mtg_${id})`} />
//       </svg>
//     ),

//     reel: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#18181b" />
//         <rect x={0} y={0} width={W} height={12} fill="#111" rx={0} />
//         {[
//           10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
//           170, 180, 190, 200, 210,
//         ].map((x, i) => (
//           <rect
//             key={i}
//             x={x}
//             y={2}
//             width={8}
//             height={8}
//             rx={1}
//             fill="rgba(255,255,255,.12)"
//           />
//         ))}
//         <rect x={14} y={22} width={90} height={9} rx={0} fill="white" />
//         <rect x={14} y={35} width={55} height={3} rx={0} fill={ac} />
//         {[44, 50, 56].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[65, 50, 72][i]}
//             height={4}
//             rx={2}
//             fill="rgba(255,255,255,.08)"
//             stroke={ac}
//             strokeWidth=".6"
//           />
//         ))}
//         <rect x={14} y={80} width={38} height={2.5} rx={0} fill={ac} />
//         {[87, 92, 97].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[192, 176, 183][i]}
//             height={2}
//             rx={0}
//             fill="rgba(148,163,184,.25)"
//           />
//         ))}
//         <rect x={0} y={143} width={W} height={12} fill="#111" />
//         {[
//           10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
//           170, 180, 190, 200, 210,
//         ].map((x, i) => (
//           <rect
//             key={i}
//             x={x}
//             y={145}
//             width={8}
//             height={8}
//             rx={1}
//             fill="rgba(255,255,255,.12)"
//           />
//         ))}
//       </svg>
//     ),

//     frame: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff" />
//         <rect x={14} y={14} width={192} height={1.5} fill={ac} />
//         <rect x={14} y={14} width={1.5} height={127} fill={ac} />
//         <rect x={204.5} y={14} width={1.5} height={127} fill={ac} />
//         <rect x={14} y={140} width={192} height={1.5} fill={ac} />
//         <rect x={22} y={22} width={82} height={9} rx={0} fill="#111" />
//         <rect x={22} y={35} width={50} height={3} rx={0} fill="#555" />
//         {[44, 49, 54].map((y, i) => (
//           <rect
//             key={i}
//             x={22}
//             y={y}
//             width={[70, 55, 80][i]}
//             height={2}
//             rx={0}
//             fill="#9ca3af"
//           />
//         ))}
//         <rect x={22} y={78} width={38} height={2.5} rx={0} fill={ac} />
//         {[85, 90, 95].map((y, i) => (
//           <rect
//             key={i}
//             x={22}
//             y={y}
//             width={[183, 169, 176][i]}
//             height={2}
//             rx={0}
//             fill="#e5e7eb"
//           />
//         ))}
//       </svg>
//     ),

//     // ── Tech / Dark ──
//     carbon: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#18181b" />
//         <rect x={0} y={0} width={5} height={H} fill={ac} />
//         <rect x={17} y={15} width={90} height={9} rx={1.5} fill="white" />
//         <rect
//           x={17}
//           y={28}
//           width={55}
//           height={3.5}
//           rx={1}
//           fill={ac}
//           opacity=".8"
//         />
//         {[44, 50, 56].map((y, i) => (
//           <rect
//             key={i}
//             x={17}
//             y={y}
//             width={[60, 50, 70][i]}
//             height={3}
//             rx={10}
//             fill="rgba(255,255,255,.08)"
//             stroke={ac}
//             strokeWidth=".7"
//             opacity=".8"
//           />
//         ))}
//         <rect x={17} y={70} width={38} height={2.5} rx={1} fill={ac} />
//         {[77, 82, 87].map((y, i) => (
//           <rect
//             key={i}
//             x={17}
//             y={y}
//             width={[185, 170, 178][i]}
//             height={2.2}
//             rx={1}
//             fill="rgba(148,163,184,.3)"
//           />
//         ))}
//       </svg>
//     ),

//     plasma: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <defs>
//           <linearGradient id={`plg_${id}`} x1="0" y1="0" x2="1" y2="1">
//             <stop offset="0%" stopColor="#0f172a" />
//             <stop offset="100%" stopColor="#1e1b4b" />
//           </linearGradient>
//         </defs>
//         <rect width={W} height={H} fill={`url(#plg_${id})`} />
//         <rect x={0} y={0} width={W} height={5} fill={ac} />
//         <rect x={13} y={18} width={90} height={10} rx={1.5} fill="white" />
//         <rect x={13} y={32} width={55} height={3.5} rx={1} fill={ac} />
//         {[48, 54, 60, 66].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[60, 50, 72, 45][i]}
//             height={4}
//             rx={10}
//             fill="rgba(255,255,255,.06)"
//             stroke={ac}
//             strokeWidth=".7"
//             opacity=".8"
//           />
//         ))}
//         <rect x={13} y={80} width={38} height={2.5} rx={1} fill={ac} />
//         {[87, 92, 97].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[188, 168, 178][i]}
//             height={2.2}
//             rx={1}
//             fill="rgba(148,163,184,.3)"
//           />
//         ))}
//         <rect x={0} y={150} width={W} height={5} fill={ac} />
//       </svg>
//     ),

//     neon: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#0d1117" />
//         <rect x={13} y={13} width={90} height={10} rx={0} fill="white" />
//         <rect x={13} y={27} width={55} height={2.5} rx={0} fill={ac} />
//         <rect x={13} y={36} width={188} height={0.5} fill={ac} opacity=".4" />
//         {[42, 48, 54, 60].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[65, 50, 75, 48][i]}
//             height={4}
//             rx={2}
//             fill="transparent"
//             stroke={ac}
//             strokeWidth=".8"
//             opacity=".7"
//           />
//         ))}
//         <rect x={13} y={78} width={38} height={2.5} rx={0} fill={ac} />
//         {[85, 90, 95].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[192, 176, 183][i]}
//             height={2}
//             rx={0}
//             fill={ac}
//             opacity={[0.3, 0.2, 0.25][i]}
//           />
//         ))}
//         <rect x={0} y={150} width={W} height={5} fill={ac} opacity=".6" />
//       </svg>
//     ),

//     matrix: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#0a0f0a" />
//         {[10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210].map((x, i) =>
//           [20, 40, 60, 80, 100, 120, 140].map((y, j) => (
//             <text
//               key={`${i}${j}`}
//               x={x}
//               y={y}
//               fontSize={7}
//               fill={ac}
//               opacity={Math.random() > 0.7 ? 0.5 : 0.15}
//               fontFamily="monospace"
//             >
//               {Math.random() > 0.5 ? "1" : "0"}
//             </text>
//           )),
//         )}
//         <rect
//           x={14}
//           y={16}
//           width={88}
//           height={9}
//           rx={0}
//           fill="rgba(255,255,255,.9)"
//         />
//         <rect x={14} y={29} width={55} height={2.5} rx={0} fill={ac} />
//         <rect x={14} y={38} width={188} height={0.5} fill={ac} opacity=".5" />
//         {[85, 90, 95].map((y, i) => (
//           <rect
//             key={i}
//             x={14}
//             y={y}
//             width={[192, 176, 183][i]}
//             height={2}
//             rx={0}
//             fill={ac}
//             opacity={[0.4, 0.3, 0.35][i]}
//           />
//         ))}
//       </svg>
//     ),

//     // ── Natural ──
//     emerald: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <defs>
//           <linearGradient id={`emg_${id}`} x1="0" y1="0" x2="1" y2="1">
//             <stop offset="0%" stopColor="#065f46" />
//             <stop offset="100%" stopColor={ac} />
//           </linearGradient>
//         </defs>
//         <rect width={W} height={H} fill="#fff" />
//         <rect width={W} height={52} fill={`url(#emg_${id})`} />
//         <rect
//           x={13}
//           y={13}
//           width={88}
//           height={8}
//           rx={2}
//           fill="rgba(255,255,255,.9)"
//         />
//         <rect
//           x={13}
//           y={25}
//           width={54}
//           height={4}
//           rx={1.5}
//           fill="rgba(255,255,255,.6)"
//         />
//         {[0, 38, 76].map((ox, i) => (
//           <rect
//             key={i}
//             x={13 + ox}
//             y={37}
//             width={30}
//             height={5}
//             rx={10}
//             fill="rgba(255,255,255,.2)"
//             stroke="rgba(255,255,255,.3)"
//             strokeWidth=".6"
//           />
//         ))}
//         <rect x={13} y={84} width={44} height={3} rx={1} fill={ac} />
//         {[91, 96, 101].map((y, i) => (
//           <rect
//             key={i}
//             x={13}
//             y={y}
//             width={[188, 172, 178][i]}
//             height={2.2}
//             rx={1}
//             fill="#e5e7eb"
//           />
//         ))}
//       </svg>
//     ),

//     terracotta: (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#fff7f0" />
//         <rect x={14} y={14} width={5} height={130} rx={2.5} fill={ac} />
//         <rect x={24} y={14} width={88} height={9} rx={1} fill="#1c1410" />
//         <rect
//           x={24}
//           y={27}
//           width={55}
//           height={3}
//           rx={1}
//           fill={ac}
//           opacity=".7"
//         />
//         <rect x={24} y={36} width={183} height={0.8} fill={ac} opacity=".3" />
//         {[42, 48, 54].map((y, i) => (
//           <rect
//             key={i}
//             x={24}
//             y={y}
//             width={[70, 55, 78][i]}
//             height={2}
//             rx={1}
//             fill="#a8856c"
//           />
//         ))}
//         <rect x={24} y={80} width={42} height={2.5} rx={1} fill={ac} />
//         {[87, 92, 97].map((y, i) => (
//           <rect
//             key={i}
//             x={24}
//             y={y}
//             width={[183, 169, 176][i]}
//             height={2}
//             rx={1}
//             fill="#e7d5c9"
//           />
//         ))}
//       </svg>
//     ),
//   };
//   return (
//     thumbMap[id] || (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <rect width={W} height={H} fill="#f3f4f6" />
//         <rect x={14} y={60} width={40} height={3} rx={1} fill={ac} />
//       </svg>
//     )
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    HTML BUILDER — all 40 templates, all fields, dynamic date, accent color
// ───────────────────────────────────────────────────────────────*/
// function buildHTML(id: string, d: CLData): string {
//   const ac = d.accentColor || "#6366f1";
//   const dt = d.letterDate
//     ? new Date(d.letterDate + "T12:00:00").toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       })
//     : new Date().toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//   const nm = d.personal.fullName || "Your Name";
//   const ttl = d.personal.title || "Professional";
//   const mgr = d.company.hiringManager || "Hiring Manager";
//   const sig = d.personal.signature || "Sincerely";
//   const loc = [d.company.city, d.company.state].filter(Boolean).join(", ");

//   const mkLink = (v: string, href: string, col = ac) =>
//     v
//       ? `<a href="${href}" target="_blank" rel="noopener" style="color:${col};text-decoration:none">${v}</a>`
//       : "";

//   const contacts = [
//     d.personal.email
//       ? mkLink(d.personal.email, `mailto:${d.personal.email}`, "inherit")
//       : "",
//     d.personal.phone
//       ? mkLink(d.personal.phone, `tel:${d.personal.phone}`, "inherit")
//       : "",
//     d.personal.location ? `<span>${d.personal.location}</span>` : "",
//     d.personal.linkedin
//       ? mkLink(
//           d.personal.linkedin,
//           `https://${d.personal.linkedin.replace(/^https?:\/\//, "")}`,
//         )
//       : "",
//     d.personal.github
//       ? mkLink(
//           d.personal.github,
//           `https://${d.personal.github.replace(/^https?:\/\//, "")}`,
//         )
//       : "",
//     d.personal.website
//       ? mkLink(
//           d.personal.website,
//           `https://${d.personal.website.replace(/^https?:\/\//, "")}`,
//         )
//       : "",
//   ].filter(Boolean);

//   const addrBlock = `<div style="margin-bottom:20px;font-size:13px;line-height:1.9;color:#4a5568"><strong style="color:#1a202c">${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>${d.company.name}${loc ? `<br>${loc}` : ""}</div>`;
//   const greet = (col = ac) =>
//     `<div style="font-size:16px;font-weight:600;margin-bottom:22px;color:${col}">Dear ${mgr},</div>`;

//   const secRows = (col: string, border = false, textCol = "#374151") =>
//     d.sections
//       .filter((s) => s.content.trim())
//       .map(
//         (s) => `
//       <div style="margin-bottom:24px${border ? `;padding-left:14px;border-left:3px solid ${col}` : ""}">
//         <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${col};margin:0 0 8px">${s.title}</h4>
//         <p style="line-height:1.85;margin:0;font-size:13.5px;color:${textCol}">${s.content.replace(/\n/g, "<br>")}</p>
//       </div>`,
//       )
//       .join("");

//   const achRows = (col: string, textCol = "#374151") =>
//     !d.achievements.length
//       ? ""
//       : `
//     <div style="margin:18px 0 22px">
//       <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${col};margin:0 0 10px">Key Achievements</h4>
//       ${d.achievements.map((a) => `<div style="display:flex;gap:9px;margin-bottom:7px;font-size:13px;color:${textCol}"><span style="color:${col};flex-shrink:0;line-height:1.5">›</span>${a}</div>`).join("")}
//     </div>`;

//   const skillRows = (col: string) =>
//     !d.skills.length
//       ? ""
//       : `
//     <div style="margin:16px 0 22px">
//       <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${col};margin:0 0 10px">Core Skills</h4>
//       <div style="display:flex;flex-wrap:wrap;gap:7px">${d.skills.map((s) => `<span style="padding:4px 12px;background:${col}18;border:1px solid ${col}40;border-radius:30px;font-size:12px">${s}</span>`).join("")}</div>
//     </div>`;

//   const notesRow = d.notes
//     ? `<div style="margin:14px 0;padding:12px 16px;background:rgba(0,0,0,.03);border-left:3px solid #e2e8f0;font-size:12.5px;line-height:1.7;color:#64748b">${d.notes}</div>`
//     : "";
//   const summaryRow = d.personal.summary
//     ? `<div style="margin-bottom:20px;padding:13px 16px;background:${ac}0d;border-left:3px solid ${ac};font-size:13px;line-height:1.75;color:#4a5568;font-style:italic">${d.personal.summary}</div>`
//     : "";
//   const referralRow = d.company.referral
//     ? `<div style="font-size:12.5px;color:#6b7280;margin-bottom:14px">Referred by: <strong>${d.company.referral}</strong></div>`
//     : "";

//   const closingBlock = (col: string, textCol = "#374151") => `
//     <div style="margin-top:36px;font-size:13.5px;color:${textCol}">
//       ${sig},<br><br>
//       <strong style="font-size:15px">${nm}</strong>
//       ${d.personal.email ? `<br><a href="mailto:${d.personal.email}"    style="font-size:12px;color:${col};text-decoration:none">${d.personal.email}</a>` : ""}
//       ${d.personal.phone ? `<br><span style="font-size:12px">${d.personal.phone}</span>` : ""}
//       ${d.personal.linkedin ? `<br><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" style="font-size:11.5px;color:${col};text-decoration:none" target="_blank">${d.personal.linkedin}</a>` : ""}
//       ${d.personal.github ? `<br><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}"   style="font-size:11.5px;color:#64748b;text-decoration:none" target="_blank">${d.personal.github}</a>` : ""}
//       ${d.personal.website ? `<br><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}"  style="font-size:11.5px;color:${col};text-decoration:none" target="_blank">${d.personal.website}</a>` : ""}
//     </div>`;

//   const sideContacts = (col: string) => `
//     ${d.personal.email ? `<div style="font-size:9px;letter-spacing:1.5px;text-transform:uppercase;opacity:.5;margin-top:18px;margin-bottom:5px">Email</div><div style="font-size:11px;word-break:break-all;line-height:1.8"><a href="mailto:${d.personal.email}" style="color:${col};text-decoration:none">${d.personal.email}</a></div>` : ""}
//     ${d.personal.phone ? `<div style="font-size:9px;letter-spacing:1.5px;text-transform:uppercase;opacity:.5;margin-top:14px;margin-bottom:5px">Phone</div><div style="font-size:11px"><a href="tel:${d.personal.phone}" style="color:${col};text-decoration:none">${d.personal.phone}</a></div>` : ""}
//     ${d.personal.location ? `<div style="font-size:9px;letter-spacing:1.5px;text-transform:uppercase;opacity:.5;margin-top:14px;margin-bottom:5px">Location</div><div style="font-size:11px">${d.personal.location}</div>` : ""}
//     ${d.personal.linkedin ? `<div style="font-size:9px;letter-spacing:1.5px;text-transform:uppercase;opacity:.5;margin-top:14px;margin-bottom:5px">LinkedIn</div><div style="font-size:11px;word-break:break-all"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank" style="color:${col};text-decoration:none">${d.personal.linkedin}</a></div>` : ""}
//     ${d.personal.github ? `<div style="font-size:9px;letter-spacing:1.5px;text-transform:uppercase;opacity:.5;margin-top:14px;margin-bottom:5px">GitHub</div><div style="font-size:11px;word-break:break-all"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}"   target="_blank" style="color:${col};text-decoration:none">${d.personal.github}</a></div>` : ""}
//     ${d.personal.website ? `<div style="font-size:9px;letter-spacing:1.5px;text-transform:uppercase;opacity:.5;margin-top:14px;margin-bottom:5px">Portfolio</div><div style="font-size:11px;word-break:break-all"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}"  target="_blank" style="color:${col};text-decoration:none">${d.personal.website}</a></div>` : ""}
//     ${d.skills.length ? `<div style="font-size:9px;letter-spacing:1.5px;text-transform:uppercase;opacity:.5;margin-top:22px;margin-bottom:8px">Skills</div>${d.skills.map((s) => `<div style="font-size:11px;margin-bottom:4px;opacity:.85">• ${s}</div>`).join("")}` : ""}`;

//   const chipRow = (
//     chips: string[],
//     bg: string,
//     border: string,
//     textCol: string,
//   ) =>
//     `<div style="display:flex;flex-wrap:wrap;gap:7px">${chips.map((c) => `<span style="padding:5px 14px;background:${bg};border:1px solid ${border};border-radius:40px;font-size:11.5px;color:${textCol}">${c}</span>`).join("")}</div>`;

//   const base = (css: string, body: string) =>
//     `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box}html,body{background:#ffffff}-webkit-print-color-adjust:exact;print-color-adjust:exact}${css}</style></head><body style="background:#ffffff">${body}</body></html>`;

//   // ── Group templates by similar structure ──

//   // AURORA-style (gradient header + chips)
//   if (["aurora", "emerald", "sapphire"].includes(id)) {
//     const grad =
//       id === "aurora"
//         ? `linear-gradient(135deg,${ac} 0%,${ac}cc 60%,${ac}88 100%)`
//         : id === "emerald"
//           ? `linear-gradient(135deg,#065f46 0%,${ac} 100%)`
//           : `linear-gradient(135deg,${ac} 0%,#1d4ed8 100%)`;
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
//       body{font-family:'DM Sans',sans-serif;color:#374151}
//       .pg{max-width:860px;margin:0 auto;background:#fff}
//       .hdr{background:${grad};padding:52px 56px 44px;color:white;position:relative;overflow:hidden}
//       .hdr::before{content:'';position:absolute;right:-80px;top:-80px;width:280px;height:280px;background:rgba(255,255,255,.07);border-radius:50%}
//       .nm{font-size:38px;font-weight:700;letter-spacing:-1.5px;margin-bottom:5px;position:relative}
//       .rl{font-size:14px;opacity:.85;margin-bottom:26px;position:relative}
//       .body{padding:48px 56px;background:#ffffff}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
//       `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
//       ${chipRow(contacts, "rgba(255,255,255,.15)", "rgba(255,255,255,.3)", "white")}</div>
//       <div class="body"><div class="dt">${dt}</div>${addrBlock}${referralRow}${greet()}${summaryRow}${secRows(ac)}${achRows(ac)}${skillRows(ac)}${notesRow}${closingBlock(ac)}</div></div>`,
//     );
//   }

//   // SIDEBAR templates (left sidebar + right content)
//   if (["obsidian", "designer", "metro", "carbon"].includes(id)) {
//     const sideBg =
//       id === "carbon" ? "#18181b" : id === "metro" ? ac : "#1e1b4b";
//     const sideAccent =
//       id === "carbon"
//         ? ac
//         : id === "metro"
//           ? "rgba(255,255,255,.8)"
//           : "#c4b5fd";
//     const mainBg = "#ffffff";
//     const sideW = id === "metro" ? 70 : 260;
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:wght@400;600;700&display=swap');
//       body{font-family:'Inter',sans-serif;color:#374151}
//       .pg{max-width:900px;margin:0 auto;display:flex;min-height:100vh}
//       .side{width:${sideW}px;background:${sideBg};color:white;padding:44px 26px;flex-shrink:0}
//       .snm{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;color:#f3f4f6;line-height:1.2;margin-bottom:6px}
//       .srl{font-size:10px;color:${sideAccent};letter-spacing:1.5px;text-transform:uppercase;margin-bottom:28px;padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,.15)}
//       .main{flex:1;padding:48px 44px;background:${mainBg}}
//       .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//       .accent-bar{position:absolute;left:0;top:0;bottom:0;width:5px;background:${ac}}`,
//       `<div class="pg">
//         <div class="side" style="position:relative">
//           ${id === "carbon" ? `<div class="accent-bar"></div>` : ""}
//           <div class="snm">${nm}</div><div class="srl">${ttl}</div>
//           ${sideContacts(sideAccent)}
//         </div>
//         <div class="main"><div class="dt">${dt}</div>${addrBlock}${referralRow}${greet()}${summaryRow}${secRows(ac, true)}${achRows(ac)}${skillRows(ac)}${notesRow}${closingBlock(ac)}</div>
//       </div>`,
//     );
//   }

//   // DARK templates
//   if (
//     ["velvet", "onyx", "plasma", "director", "reel", "neon", "matrix"].includes(
//       id,
//     )
//   ) {
//     const bg =
//       id === "velvet"
//         ? "linear-gradient(160deg,#1e0f40,#2d1b69)"
//         : id === "onyx"
//           ? "#111111"
//           : id === "reel"
//             ? "#18181b"
//             : id === "neon"
//               ? "#0d1117"
//               : id === "matrix"
//                 ? "#0a0f0a"
//                 : "linear-gradient(135deg,#0f172a,#1e1b4b)";
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;700;900&display=swap');
//       body{font-family:'Exo 2',sans-serif;background:#0f172a;color:#94a3b8}
//       .pg{max-width:880px;margin:0 auto;background:${bg};min-height:100vh}
//       .hdr{padding:52px;border-bottom:1px solid ${ac}33}
//       .hdr::after{content:'';display:block;height:2px;background:linear-gradient(90deg,${ac},transparent);margin-top:0}
//       .nm{font-size:42px;font-weight:900;letter-spacing:-2px;color:white;line-height:.95;margin-bottom:8px}
//       .rl{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${ac};margin-bottom:22px}
//       .body{padding:40px 52px 52px}.dt{font-size:11.5px;color:#52525b;margin-bottom:22px}`,
//       `<div class="pg">
//         <div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
//         <div style="display:flex;flex-wrap:wrap;gap:8px">${contacts.map((c) => `<span style="padding:4px 12px;border:1px solid ${ac}44;color:${ac};font-size:11px;border-radius:4px">${c}</span>`).join("")}</div></div>
//         <div class="body"><div class="dt">${dt}</div>
//         <div style="margin-bottom:20px;font-size:13px;line-height:2;color:#94a3b8"><strong style="color:#e2e8f0">${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>${d.company.name}${loc ? `<br><span style="color:#52525b">${loc}</span>` : ""}</div>
//         ${referralRow}<div style="font-size:16px;font-weight:600;margin-bottom:22px;color:white">Dear ${mgr},</div>
//         ${d.personal.summary ? `<div style="margin-bottom:20px;padding:12px 16px;background:${ac}12;border-left:3px solid ${ac};font-size:13px;line-height:1.75;color:#94a3b8;font-style:italic">${d.personal.summary}</div>` : ""}
//         ${secRows(ac, false, "#94a3b8")}${achRows(ac, "#94a3b8")}${skillRows(ac)}${notesRow}
//         <div style="margin-top:36px;font-size:13.5px;color:#64748b">${sig},<br><br>
//         <strong style="font-size:15px;color:white">${nm}</strong>
//         ${d.personal.email ? `<br><a href="mailto:${d.personal.email}" style="color:${ac};text-decoration:none;font-size:12px">${d.personal.email}</a>` : ""}
//         ${d.personal.linkedin ? `<br><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" style="color:${ac};text-decoration:none;font-size:11.5px" target="_blank">${d.personal.linkedin}</a>` : ""}
//         </div></div></div>`,
//     );
//   }

//   // TOP-BAR templates (thin colored bar top/bottom)
//   if (["motion", "boardroom", "clean", "plasma_v2"].includes(id)) {
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;900&family=Barlow:wght@400;500;600&display=swap');
//       body{font-family:'Barlow',sans-serif;color:#374151;background:#fff}
//       .pg{max-width:860px;margin:0 auto;background:#fff}
//       .tb{height:5.5px;background:${ac}}
//       .hdr{padding:44px 52px;border-bottom:1px solid #f0f0f0;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}
//       .nm{font-family:'Barlow Condensed',sans-serif;font-size:48px;font-weight:900;letter-spacing:-3px;text-transform:uppercase;line-height:.95;color:#111827}
//       .rl{font-size:13px;color:${ac};letter-spacing:2px;text-transform:uppercase;margin-top:8px;font-weight:600}
//       .cc{text-align:right;font-size:12px;color:#9ca3af}
//       .cv{display:block;margin-bottom:4px;line-height:1.5}
//       .cv a{color:${ac};text-decoration:none}
//       .body{padding:44px 52px;background:#fff}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//       .bb{height:5.5px;background:${ac}}`,
//       `<div class="pg"><div class="tb"></div>
//       <div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>
//       <div class="cc">
//       ${d.personal.email ? `<span class="cv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></span>` : ""}
//       ${d.personal.phone ? `<span class="cv">${d.personal.phone}</span>` : ""}
//       ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
//       ${d.personal.linkedin ? `<span class="cv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></span>` : ""}
//       ${d.personal.github ? `<span class="cv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}"   target="_blank">${d.personal.github}</a></span>` : ""}
//       ${d.personal.website ? `<span class="cv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}"  target="_blank">${d.personal.website}</a></span>` : ""}
//       </div></div>
//       <div class="body"><div class="dt">${dt}</div>${addrBlock}${referralRow}${greet()}${summaryRow}${secRows(ac)}${achRows(ac)}${skillRows(ac)}${notesRow}${closingBlock(ac)}</div>
//       <div class="bb"></div></div>`,
//     );
//   }

//   // CORPORATE templates (border-bottom divider header)
//   if (["slate", "executive", "summit", "boardroom"].includes(id)) {
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
//       body{font-family:'IBM Plex Sans',sans-serif;color:#374151;background:#fff}
//       .pg{max-width:880px;margin:0 auto;background:#fff}
//       .hdr{padding:44px 52px;border-bottom:3px solid #0f172a;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}
//       .nm{font-size:34px;font-weight:700;color:#0f172a;letter-spacing:-1.5px}.rl{font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-top:7px}
//       .cc{text-align:right}
//       .cv{font-size:11.5px;color:#475569;font-family:'IBM Plex Mono',monospace;line-height:2.1;display:block;word-break:break-all}
//       .cv a{color:${ac};text-decoration:none}
//       .tag{display:inline-block;font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:#64748b;background:#f1f5f9;border:1px solid #e2e8f0;padding:3px 10px;border-radius:4px;margin-bottom:22px}
//       .body{padding:40px 52px;background:#fff}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:20px}`,
//       `<div class="pg"><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>
//       <div class="cc">
//       ${d.personal.email ? `<a class="cv" href="mailto:${d.personal.email}">${d.personal.email}</a>` : ""}
//       ${d.personal.phone ? `<a class="cv" href="tel:${d.personal.phone}">${d.personal.phone}</a>` : ""}
//       ${d.personal.location ? `<span class="cv">${d.personal.location}</span>` : ""}
//       ${d.personal.linkedin ? `<a class="cv" href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a>` : ""}
//       ${d.personal.github ? `<a class="cv" href="https://${d.personal.github.replace(/^https?:\/\//, "")}"   target="_blank">${d.personal.github}</a>` : ""}
//       ${d.personal.website ? `<a class="cv" href="https://${d.personal.website.replace(/^https?:\/\//, "")}"  target="_blank">${d.personal.website}</a>` : ""}
//       </div></div>
//       <div class="body"><div class="tag">RE: ${d.company.jobTitle || "Open Position"} · ${d.company.name || "Company"}</div>
//       <div class="dt">${dt}</div>${addrBlock}${referralRow}${greet()}${summaryRow}${secRows(ac, true)}${achRows(ac)}${skillRows(ac)}${notesRow}${closingBlock(ac)}</div></div>`,
//     );
//   }

//   // ACCENT-LEFT-BAR templates
//   if (["canvas", "ivory", "executive", "terracotta"].includes(id)) {
//     const bg =
//       id === "ivory" ? "#fefce8" : id === "terracotta" ? "#fff7f0" : "#ffffff";
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Manrope:wght@300;400;500;600&display=swap');
//       body{font-family:'Manrope',sans-serif;color:#374151;background:${bg}}
//       .pg{max-width:820px;margin:0 auto;padding:60px 64px;background:${bg};position:relative}
//       .accent{position:absolute;left:0;top:0;bottom:0;width:5px;background:${ac}}
//       .nm{font-family:'Syne',sans-serif;font-size:38px;font-weight:800;letter-spacing:-1.5px;color:#111827}
//       .rl{font-size:13px;color:${ac};font-weight:600;margin-top:5px;letter-spacing:.5px}
//       .ctrow{display:flex;flex-wrap:wrap;gap:5px 16px;margin-top:10px}
//       .cv{font-size:12px;color:#9ca3af}.cv a{color:${ac};text-decoration:none}
//       .div{height:1px;background:#f3f4f6;margin:28px 0}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
//       `<div class="pg"><div class="accent"></div>
//       <div class="nm">${nm}</div><div class="rl">${ttl}</div>
//       <div class="ctrow">${contacts.map((c) => `<span class="cv">${c}</span>`).join("")}</div>
//       <div class="div"></div><div class="dt">${dt}</div>${addrBlock}${referralRow}${greet()}${summaryRow}${secRows(ac)}${achRows(ac)}${skillRows(ac)}${notesRow}${closingBlock(ac)}</div>`,
//     );
//   }

//   // SERIF / EDITORIAL
//   if (["crimson", "serif", "herald", "chronicle"].includes(id)) {
//     const isScroll = id === "herald" || id === "chronicle";
//     const ffamily = `'Playfair Display',serif`;
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Lora:wght@400;500&display=swap');
//       body{font-family:'Lora',serif;color:#374151;background:#fffbf5}
//       .pg{max-width:800px;margin:0 auto;background:#fffbf5}
//       .top{height:5px;background:${ac}}.hdr{padding:48px 56px 16px;text-align:center}
//       .nm{font-family:${ffamily};font-size:44px;font-weight:900;color:#1a0a0d;letter-spacing:-2px;line-height:1}
//       .rl{font-family:${ffamily};font-style:italic;font-size:15px;color:${ac};margin:9px 0 16px}
//       .orn{color:${ac};font-size:12px;letter-spacing:5px}
//       .ctrow{display:flex;justify-content:center;flex-wrap:wrap;gap:5px 16px;padding:12px 0;font-size:12px;color:#6b7280}
//       .ctrow a{color:${ac};text-decoration:none}
//       .sep{display:flex;align-items:center;gap:10px;padding:0 56px;margin-bottom:4px}
//       .sl{flex:1;height:1px;background:${ac}55}.sd{width:5px;height:5px;background:${ac};border-radius:50%;flex-shrink:0}
//       .body{padding:24px 56px 52px;background:#fffbf5}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:20px}`,
//       `<div class="pg"><div class="top"></div><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="orn">✦ ✦ ✦</div>
//       <div class="ctrow">${contacts.join('<span style="margin:0 4px;opacity:.4">·</span>')}</div></div>
//       <div class="sep"><div class="sl"></div><div class="sd"></div><div class="sl"></div></div>
//       <div class="body"><div class="dt">${dt}</div>${addrBlock}${referralRow}${greet()}${summaryRow}${secRows(ac)}${achRows(ac)}${skillRows(ac)}${notesRow}${closingBlock(ac)}</div></div>`,
//     );
//   }

//   // ARCHITECT (card in header)
//   if (id === "architect") {
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
//       body{font-family:'Plus Jakarta Sans',sans-serif;color:#374151;background:#f8fafc}
//       .pg{max-width:880px;margin:0 auto;background:#f8fafc}
//       .hdr{padding:44px 52px;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap}
//       .hl{flex:1}.nm{font-size:34px;font-weight:800;color:#0f172a;letter-spacing:-1.5px}
//       .rl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-top:7px;margin-bottom:14px}
//       .ctrow{display:flex;flex-wrap:wrap;gap:4px 14px}.cv{font-size:12px;color:#64748b}.cv a{color:${ac};text-decoration:none}
//       .crd{width:130px;flex-shrink:0;background:${ac};border-radius:12px;padding:16px;text-align:center}
//       .crd-l{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.65);margin-bottom:6px}
//       .crd-r{font-size:11px;font-weight:700;color:white;line-height:1.4}.crd-c{font-size:10px;color:rgba(255,255,255,.7);margin-top:4px}
//       .body{padding:36px 52px;background:#f8fafc}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
//       `<div class="pg"><div class="hdr">
//       <div class="hl"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
//       <div class="ctrow">${contacts.map((c) => `<span class="cv">${c}</span>`).join("")}</div></div>
//       ${d.company.name ? `<div class="crd"><div class="crd-l">Applying to</div><div class="crd-r">${d.company.jobTitle || "Open Role"}</div><div class="crd-c">${d.company.name}</div></div>` : ""}
//       </div>
//       <div class="body"><div class="dt">${dt}</div>${addrBlock}${referralRow}${greet()}${summaryRow}${secRows(ac, true)}${achRows(ac)}${skillRows(ac)}${notesRow}${closingBlock(ac)}</div></div>`,
//     );
//   }

//   // MINIMAL / CLEAN (simple no-frills)
//   if (["minimal", "clean", "pearl", "nordic", "frame"].includes(id)) {
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
//       body{font-family:'Inter',sans-serif;color:#374151;background:#fafafa}
//       .pg{max-width:760px;margin:0 auto;padding:70px 80px;background:#ffffff;border:1px solid ${id === "frame" ? "" + ac + "44" : "#f1f5f9"}}
//       .nm{font-size:36px;font-weight:700;color:#111;letter-spacing:-1px;margin-bottom:6px}
//       .rl{font-size:12.5px;color:${ac};font-weight:600;margin-bottom:20px;letter-spacing:.3px}
//       .div{height:1px;background:#ececec;margin:18px 0}
//       .ctrow{display:flex;flex-wrap:wrap;gap:4px 20px;margin-bottom:12px}
//       .cv{font-size:12px;color:#888}.cv a{color:${ac};text-decoration:none}
//       .dt{font-size:12px;color:#aaa;margin-bottom:22px}
//       ${id === "frame" ? `.pg{border-width:2px;border-color:${ac}}` : ""}`,
//       `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div"></div>
//       <div class="ctrow">${contacts.map((c) => `<span class="cv">${c}</span>`).join("")}</div>
//       <div class="div"></div><div class="dt">${dt}</div>${addrBlock}${referralRow}${greet()}${summaryRow}${secRows(ac)}${achRows(ac)}${skillRows(ac)}${notesRow}${closingBlock(ac)}</div>`,
//     );
//   }

//   // CREATIVE (designer studio, palette, bauhaus, gradient, split)
//   if (["studio", "palette", "bauhaus", "gradient", "split"].includes(id)) {
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Manrope:wght@300;400;500;600&display=swap');
//       body{font-family:'Manrope',sans-serif;color:#374151;background:#fff}
//       .pg{max-width:860px;margin:0 auto;background:#fff}
//       .hdr{background:linear-gradient(135deg,${ac} 0%,${ac}aa 100%);padding:52px 56px 44px;color:white;position:relative;overflow:hidden}
//       .nm{font-family:'Syne',sans-serif;font-size:38px;font-weight:800;letter-spacing:-1.5px;margin-bottom:5px}
//       .rl{font-size:13px;opacity:.85;margin-bottom:24px;letter-spacing:.5px}
//       .body{padding:44px 56px;background:#fff}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
//       `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
//       ${chipRow(contacts, "rgba(255,255,255,.15)", "rgba(255,255,255,.3)", "white")}</div>
//       <div class="body"><div class="dt">${dt}</div>${addrBlock}${referralRow}${greet()}${summaryRow}${secRows(ac)}${achRows(ac)}${skillRows(ac)}${notesRow}${closingBlock(ac)}</div></div>`,
//     );
//   }

//   // VELVET / LUXURY dark specific
//   if (id === "velvet") {
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Raleway:wght@300;400;500;600&display=swap');
//       body{font-family:'Raleway',sans-serif;background:#1a0a2e;color:#d4c9ef}
//       .pg{max-width:860px;margin:0 auto;background:linear-gradient(160deg,#1e0f40,#2d1b69);min-height:100vh}
//       .hdr{padding:52px;border-bottom:1px solid ${ac}22}
//       .nm{font-family:'Cinzel',serif;font-size:36px;font-weight:600;color:#f3e8ff;letter-spacing:2px}
//       .rl{font-size:10.5px;letter-spacing:3px;text-transform:uppercase;color:${ac};margin:12px 0 20px}
//       .body{padding:44px 52px}.dt{font-size:12px;color:#7c6fa0;margin-bottom:22px}`,
//       `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
//       <div style="display:flex;flex-wrap:wrap;gap:7px">${contacts.map((c) => `<span style="padding:4px 12px;border:1px solid ${ac}44;color:${ac}cc;font-size:11px;border-radius:4px">${c}</span>`).join("")}</div></div>
//       <div class="body"><div class="dt">${dt}</div>
//       <div style="margin-bottom:20px;font-size:13px;line-height:2"><strong style="color:#e9d5ff">${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>${d.company.name}${loc ? `<br><span style="color:#7c6fa0">${loc}</span>` : ""}</div>
//       ${referralRow}<div style="font-size:16px;font-weight:600;margin-bottom:22px;color:#e9d5ff">Dear ${mgr},</div>
//       ${summaryRow}${secRows(ac, false, "#d4c9ef")}${achRows(ac, "#d4c9ef")}${skillRows(ac)}${notesRow}
//       <div style="margin-top:36px;font-size:13.5px;color:#7c6fa0">${sig},<br><br><strong style="font-size:15px;color:#f3e8ff">${nm}</strong>
//       ${d.personal.email ? `<br><a href="mailto:${d.personal.email}" style="color:${ac};text-decoration:none;font-size:12px">${d.personal.email}</a>` : ""}
//       ${d.personal.linkedin ? `<br><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" style="color:${ac};text-decoration:none;font-size:11.5px" target="_blank">${d.personal.linkedin}</a>` : ""}
//       </div></div></div>`,
//     );
//   }

//   // FROST special
//   if (id === "frost") {
//     return base(
//       `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
//       body{font-family:'Outfit',sans-serif;background:#e0f2fe;padding:20px;color:#374151}
//       .pg{max-width:840px;margin:0 auto;background:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.85);border-radius:16px;overflow:hidden}
//       .hdr{background:linear-gradient(135deg,${ac}ee,${ac}bb);padding:48px;color:white}
//       .nm{font-size:38px;font-weight:800;letter-spacing:-2px;margin-bottom:6px}
//       .rl{font-size:12.5px;opacity:.8;letter-spacing:1px;margin-bottom:22px}
//       .body{padding:44px;background:#ffffff}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
//       `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
//       ${chipRow(contacts, "rgba(255,255,255,.18)", "rgba(255,255,255,.28)", "white")}</div>
//       <div class="body"><div class="dt">${dt}</div>${addrBlock}${referralRow}${greet()}${summaryRow}${secRows(ac)}${achRows(ac)}${skillRows(ac)}${notesRow}${closingBlock(ac)}</div></div>`,
//     );
//   }

//   // Fallback — universal clean layout
//   return base(
//     `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
//     body{font-family:'Plus Jakarta Sans',sans-serif;color:#374151;background:#fff}
//     .pg{max-width:820px;margin:0 auto;padding:60px 64px;background:#fff}
//     .nm{font-size:40px;font-weight:800;letter-spacing:-2px;color:#111827;margin-bottom:6px}
//     .rl{font-size:13px;color:${ac};font-weight:700;letter-spacing:.5px;margin-bottom:16px}
//     .d1{height:1.5px;background:${ac}33;margin-bottom:16px}
//     .ctrow{display:flex;flex-wrap:wrap;gap:5px 20px;margin-bottom:16px}
//     .cv{font-size:12px;color:#9ca3af}.cv a{color:${ac};text-decoration:none}
//     .d2{height:1.5px;background:${ac}22;margin:20px 0}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`,
//     `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="d1"></div>
//     <div class="ctrow">${contacts.map((c) => `<span class="cv">${c}</span>`).join("")}</div>
//     <div class="d2"></div><div class="dt">${dt}</div>${addrBlock}${referralRow}${greet()}${summaryRow}${secRows(ac)}${achRows(ac)}${skillRows(ac)}${notesRow}${closingBlock(ac)}</div>`,
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    PREMIUM GATE OVERLAY
// ───────────────────────────────────────────────────────────────*/
// function PremiumGate({ onUpgrade }: { onUpgrade: () => void }) {
//   return (
//     <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-gradient-to-br from-indigo-950/95 via-violet-950/95 to-slate-950/95 backdrop-blur-xl">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9, y: 20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         className="w-full max-w-md mx-4 bg-white rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,.5)]"
//       >
//         <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-center text-white">
//           <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
//             <FiLock className="w-7 h-7" />
//           </div>
//           <h2 className="text-2xl font-extrabold mb-2">Premium Feature</h2>
//           <p className="text-white/80 text-sm leading-relaxed">
//             Cover Letter Generator is available exclusively for Premium members
//           </p>
//         </div>
//         <div className="p-8">
//           {[
//             "40 unique professional templates",
//             "Real-time canvas preview with zoom",
//             "Clickable LinkedIn, GitHub & Portfolio links",
//             "PDF download in one click",
//             "Color customization for every template",
//             "AI-powered content suggestions",
//           ].map((f, i) => (
//             <div key={i} className="flex items-center gap-3 mb-3">
//               <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
//                 <svg viewBox="0 0 14 14" width="10" height="10" fill="none">
//                   <polyline
//                     points="2,8 5,12 12,3"
//                     stroke="#10b981"
//                     strokeWidth="2"
//                   />
//                 </svg>
//               </div>
//               <span className="text-[13px] text-slate-700">{f}</span>
//             </div>
//           ))}
//           <button
//             onClick={onUpgrade}
//             className="w-full mt-6 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-extrabold rounded-2xl text-[14px] shadow-[0_4px_16px_rgba(99,102,241,.4)] hover:shadow-[0_8px_28px_rgba(99,102,241,.5)] hover:-translate-y-0.5 transition-all"
//           >
//             Upgrade to Premium →
//           </button>
//           <p className="text-center text-[11px] text-slate-400 mt-3">
//             Cancel anytime · Instant access
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    STEPS
// ───────────────────────────────────────────────────────────────*/
// type Step = "template" | "personal" | "company" | "content" | "review";
// const STEPS: { id: Step; label: string; icon: string }[] = [
//   { id: "template", label: "Template", icon: "🎨" },
//   { id: "personal", label: "Personal", icon: "👤" },
//   { id: "company", label: "Company", icon: "🏢" },
//   { id: "content", label: "Content", icon: "✍️" },
//   { id: "review", label: "Review", icon: "✅" },
// ];

// /* ─────────────────────────────────────────────────────────────
//    FIELD
// ───────────────────────────────────────────────────────────────*/
// function F({
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
//     <div className="mb-3.5">
//       <label className="block text-[10.5px] font-bold tracking-wide uppercase text-slate-500 mb-1.5">
//         {label}
//         {required && <span className="text-red-500"> *</span>}
//       </label>
//       <div className="relative">
//         {icon && (
//           <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[13px] opacity-50 pointer-events-none">
//             {icon}
//           </span>
//         )}
//         <div
//           className={
//             icon ? "[&>input]:pl-8 [&>textarea]:pl-3 [&>select]:pl-8" : ""
//           }
//         >
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// const inp =
//   "w-full px-3 py-2.5 text-[13px] font-[500] border-[1.5px] border-slate-200 rounded-xl outline-none transition-all duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 bg-white text-slate-800";
// const ta = `${inp} resize-y min-h-[80px] leading-relaxed px-3`;

// /* ─────────────────────────────────────────────────────────────
//    MAIN COMPONENT
// ───────────────────────────────────────────────────────────────*/
// export default function CoverLetterGenerator() {
//   const router = useRouter();

//   /* Premium gate */
//   const [isPremium, setIsPremium] = useState<boolean | null>(null);
//   const [loadingPlan, setLoadingPlan] = useState(true);

//   useEffect(() => {
//     const userDetails = getLocalStorage<User>("user_details");
//     const userId = userDetails?.id;
//     if (!userId) {
//       setIsPremium(false);
//       setLoadingPlan(false);
//       return;
//     }
//     axios
//       .get(`${API_URL}/api/users/dashboard`, { params: { userId } })
//       .then((r) => {
//         const plan: Payment = r?.data?.payments?.[0];
//         const premium = plan?.plan?.toLowerCase() === "premium";
//         if (premium) setIsPremium(premium);
//       })
//       .catch(() => setIsPremium(false))
//       .finally(() => setLoadingPlan(false));
//   }, []);

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
//   const [showColorPicker, setShowColorPicker] = useState(false);

//   const liveRef = useRef<HTMLIFrameElement>(null);
//   const modalRef = useRef<HTMLIFrameElement>(null);

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
//     if (html && liveRef.current) writeIframe(liveRef, html);
//   }, [html]);
//   useEffect(() => {
//     if (modal && html && modalRef.current) writeIframe(modalRef, html);
//   }, [modal, html]);

//   const set = (path: string[], val: string) =>
//     setData((prev) => {
//       const n = JSON.parse(JSON.stringify(prev)) as CLData;
//       let c: any = n;
//       for (let i = 0; i < path.length - 1; i++) c = c[path[i]];
//       c[path[path.length - 1]] = val;
//       return n;
//     });

//   const setSec = (id: string, f: "title" | "content", v: string) =>
//     setData((p) => ({
//       ...p,
//       sections: p.sections.map((s) => (s.id === id ? { ...s, [f]: v } : s)),
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
//   const shown =
//     filter === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.tag === filter);
//   const tones = [
//     "Professional",
//     "Confident",
//     "Enthusiastic",
//     "Formal",
//     "Creative",
//     "Friendly",
//   ];

//   /* Loading */
//   if (loadingPlan)
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-slate-50">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-10 h-10 border-[3px] border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
//           <p className="text-sm text-slate-500 font-medium">
//             Checking your plan…
//           </p>
//         </div>
//       </div>
//     );

//   return (
//     <>
//       {/* Premium gate overlay */}
//       {isPremium === false && (
//         <PremiumGate onUpgrade={() => router.push("/choose-plan")} />
//       )}

//       <style>{`
//         html,body{overflow:hidden}
//         @media(max-width:820px){html,body{overflow:auto}}
//         .canvas-iframe{width:860px;height:1120px;border:none;display:block;background:#fff;pointer-events:none}
//         .modal-iframe{width:860px;height:1120px;border:none;display:block;background:#fff}
//         @keyframes livePulse{0%,100%{box-shadow:0 0 0 2px rgba(16,185,129,.2)}50%{box-shadow:0 0 0 5px rgba(16,185,129,.07)}}
//         .live-dot{animation:livePulse 2s infinite}
//         @keyframes toastSlide{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
//         .toast-anim{animation:toastSlide .22s ease}
//         @keyframes modalUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
//         .modal-anim{animation:modalUp .22s ease}
//         @keyframes fadeIn{from{opacity:0}to{opacity:1}}
//         .ov-anim{animation:fadeIn .18s ease}
//       `}</style>

//       {/* NAV */}
//       <nav className="h-[58px] bg-white border-b border-slate-200 flex items-center px-4 md:px-5 gap-3 z-50 relative shadow-[0_1px_4px_rgba(91,56,240,.06)] flex-shrink-0">
//         <button
//           onClick={() => router.push("/")}
//           className="cursor-pointer flex-shrink-0"
//         >
//           <div className="relative w-[100px] sm:w-[140px] h-[33px] sm:h-[46px]">
//             <Image
//               src="/logo.png"
//               alt="ATS Pass"
//               fill
//               className="object-contain"
//               priority
//               sizes="(max-width:640px) 100px,140px"
//             />
//           </div>
//         </button>

//         {/* Wizard */}
//         <div className="flex items-center flex-1 justify-center overflow-x-auto scrollbar-none gap-0 py-1">
//           {STEPS.map((s, i) => (
//             <React.Fragment key={s.id}>
//               {i > 0 && (
//                 <div
//                   className={`w-5 h-0.5 flex-shrink-0 transition-colors duration-300 ${i <= stepIdx ? "bg-emerald-500" : "bg-slate-200"}`}
//                 />
//               )}
//               <button
//                 onClick={() => setStep(s.id)}
//                 className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[12px] font-semibold transition-all flex-shrink-0 cursor-pointer
//                   ${i < stepIdx ? "text-slate-800" : i === stepIdx ? "text-indigo-600 bg-indigo-50" : "text-slate-400 hover:bg-slate-50"}`}
//               >
//                 <span
//                   className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] transition-all
//                   ${i < stepIdx ? "bg-emerald-500 text-white" : i === stepIdx ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-[0_0_0_3px_rgba(91,56,240,.16)]" : "bg-slate-100 text-slate-400"}`}
//                 >
//                   {i < stepIdx ? (
//                     <svg viewBox="0 0 14 14" width="11" height="11" fill="none">
//                       <polyline
//                         points="2,8 5,12 12,3"
//                         stroke="white"
//                         strokeWidth="2.2"
//                       />
//                     </svg>
//                   ) : (
//                     i + 1
//                   )}
//                 </span>
//                 <span className="hidden sm:inline">{s.label}</span>
//               </button>
//             </React.Fragment>
//           ))}
//         </div>

//         {/* Nav right: color picker + premium badge */}
//         <div className="flex items-center gap-2 flex-shrink-0">
//           {isPremium && (
//             <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[11px] font-bold">
//               ✦ Premium
//             </span>
//           )}
//         </div>
//       </nav>

//       {/* SHELL */}
//       <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[1fr_1fr] h-[calc(100vh-58px)]">
//         {/* LEFT */}
//         <div className="flex flex-col overflow-hidden bg-slate-50 border-r border-slate-200">
//           <div className="flex-shrink-0 px-5 pt-4 pb-0">
//             <h2 className="font-semibold text-slate-900 tracking-tight mb-0.5 text-lg">
//               {step === "template"
//                 ? "Choose Template"
//                 : step === "personal"
//                   ? "Personal Information"
//                   : step === "company"
//                     ? "Company Details"
//                     : step === "content"
//                       ? "Letter Content"
//                       : "Review & Download"}
//             </h2>
//             <p className="text-[13px] text-slate-500 mb-3">
//               {step === "template"
//                 ? `${TEMPLATES.length} unique designs for every profession`
//                 : step === "personal"
//                   ? "Your details appear on the letter"
//                   : step === "company"
//                     ? "Where you're applying"
//                     : step === "content"
//                       ? "Craft your compelling story"
//                       : "Check everything before downloading"}
//             </p>
//           </div>

//           <div className="flex-1 overflow-y-auto px-4 pt-3 pb-20 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent">
//             {/* TEMPLATE STEP */}
//             {step === "template" && (
//               <>
//                 {/* Filter + Color Picker row */}
//                 <div className="flex items-center gap-2 mb-3 flex-wrap">
//                   <div className="flex gap-1.5 flex-wrap flex-1">
//                     {cats.map((c) => (
//                       <button
//                         key={c}
//                         onClick={() => setFilter(c)}
//                         className={`px-2.5 py-1 rounded-full text-[11px] font-bold border-[1.5px] transition-all ${filter === c ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-slate-200 text-slate-500 bg-white hover:border-indigo-300"}`}
//                       >
//                         {c}
//                       </button>
//                     ))}
//                   </div>
//                   {/* Color picker toggle */}
//                   <div className="relative flex-shrink-0">
//                     <button
//                       onClick={() => setShowColorPicker((p) => !p)}
//                       className="flex items-center gap-2 px-3 py-1.5 rounded-full border-[1.5px] border-slate-200 bg-white text-[11.5px] font-bold text-slate-600 hover:border-indigo-300 transition-all"
//                     >
//                       <span
//                         className="w-4 h-4 rounded-full border border-white shadow-sm"
//                         style={{ background: data.accentColor }}
//                       />
//                       Color
//                     </button>
//                     <AnimatePresence>
//                       {showColorPicker && (
//                         <motion.div
//                           initial={{ opacity: 0, scale: 0.95, y: 6 }}
//                           animate={{ opacity: 1, scale: 1, y: 0 }}
//                           exit={{ opacity: 0, scale: 0.95, y: 6 }}
//                           className="absolute top-9 right-0 z-50 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 w-52"
//                         >
//                           <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
//                             Accent Color
//                           </p>
//                           <div className="grid grid-cols-6 gap-1.5 mb-2.5">
//                             {ACCENT_COLORS.map((col) => (
//                               <button
//                                 key={col}
//                                 onClick={() => {
//                                   setData((p) => ({ ...p, accentColor: col }));
//                                 }}
//                                 className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 ${data.accentColor === col ? "border-slate-800 scale-110" : "border-transparent"}`}
//                                 style={{ background: col }}
//                                 title={col}
//                               />
//                             ))}
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
//                               Custom
//                             </label>
//                             <input
//                               type="color"
//                               value={data.accentColor}
//                               onChange={(e) =>
//                                 setData((p) => ({
//                                   ...p,
//                                   accentColor: e.target.value,
//                                 }))
//                               }
//                               className="flex-1 h-7 rounded-lg border border-slate-200 cursor-pointer"
//                             />
//                           </div>
//                           <button
//                             onClick={() => setShowColorPicker(false)}
//                             className="w-full mt-2.5 py-1.5 text-[11px] font-bold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all"
//                           >
//                             Apply
//                           </button>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
//                   {shown.map((t) => (
//                     <div
//                       key={t.id}
//                       onClick={() => setTplId(t.id)}
//                       className={`relative bg-white rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-200
//                       ${tplId === t.id ? "border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,.13)]" : "border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-indigo-200"}`}
//                     >
//                       <div className="h-[95px] overflow-hidden bg-slate-50">
//                         <TplThumb id={t.id} accent={data.accentColor} />
//                       </div>
//                       {tplId === t.id && (
//                         <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center shadow-md">
//                           <svg
//                             viewBox="0 0 14 14"
//                             width="10"
//                             height="10"
//                             fill="none"
//                           >
//                             <polyline
//                               points="2,8 5,12 12,3"
//                               stroke="white"
//                               strokeWidth="2.4"
//                             />
//                           </svg>
//                         </div>
//                       )}
//                       <div className="px-2.5 py-2">
//                         <div className="text-[8.5px] font-extrabold tracking-[1.5px] uppercase text-slate-400 mb-0.5">
//                           {t.tag}
//                         </div>
//                         <div className="text-[12px] font-bold text-slate-900">
//                           {t.name}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Color indicator below grid */}
//                 <div className="mt-3 flex items-center gap-2 p-3 bg-white rounded-xl border border-indigo-100">
//                   <span
//                     className="w-5 h-5 rounded-full border border-slate-200 shadow-sm flex-shrink-0"
//                     style={{ background: data.accentColor }}
//                   />
//                   <div>
//                     <p className="text-[11.5px] font-bold text-slate-700">
//                       Current accent:{" "}
//                       <span style={{ color: data.accentColor }}>
//                         {data.accentColor}
//                       </span>
//                     </p>
//                     <p className="text-[10.5px] text-slate-400">
//                       This color applies to all template elements
//                     </p>
//                   </div>
//                 </div>
//               </>
//             )}

//             {/* PERSONAL STEP */}
//             {step === "personal" && (
//               <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div>
//                     <p className="text-[14px] font-extrabold text-slate-900">
//                       Your Profile
//                     </p>
//                     <p className="text-[11.5px] text-slate-500">
//                       All fields appear in your letter
//                     </p>
//                   </div>
//                 </div>
//                 <div className="grid sm:grid-cols-2 gap-0">
//                   <F label="Full Name" required>
//                     <input
//                       className={inp}
//                       placeholder="Alexandra Chen"
//                       value={data.personal.fullName}
//                       onChange={(e) =>
//                         set(["personal", "fullName"], e.target.value)
//                       }
//                     />
//                   </F>
//                   <F label="Professional Title">
//                     <input
//                       className={inp}
//                       placeholder="Senior UX Designer"
//                       value={data.personal.title}
//                       onChange={(e) =>
//                         set(["personal", "title"], e.target.value)
//                       }
//                     />
//                   </F>
//                 </div>
//                 <div className="grid sm:grid-cols-2 gap-0">
//                   <F label="Email Address" required>
//                     <input
//                       className={inp}
//                       type="email"
//                       placeholder="alex@email.com"
//                       value={data.personal.email}
//                       onChange={(e) =>
//                         set(["personal", "email"], e.target.value)
//                       }
//                     />
//                   </F>
//                   <F label="Phone Number">
//                     <input
//                       className={inp}
//                       type="tel"
//                       placeholder="+1 555 000 0000"
//                       value={data.personal.phone}
//                       onChange={(e) =>
//                         set(["personal", "phone"], e.target.value)
//                       }
//                     />
//                   </F>
//                 </div>
//                 <F label="Location">
//                   <input
//                     className={inp}
//                     placeholder="San Francisco, CA"
//                     value={data.personal.location}
//                     onChange={(e) =>
//                       set(["personal", "location"], e.target.value)
//                     }
//                   />
//                 </F>
//                 <div className="h-px bg-indigo-50 my-3" />
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
//                   🔗 Online Presence — shown as clickable links
//                 </p>
//                 <F label="LinkedIn URL">
//                   <input
//                     className={inp}
//                     placeholder="linkedin.com/in/alexchen"
//                     value={data.personal.linkedin}
//                     onChange={(e) =>
//                       set(["personal", "linkedin"], e.target.value)
//                     }
//                   />
//                 </F>
//                 <div className="grid sm:grid-cols-2 gap-0">
//                   <F label="GitHub URL">
//                     <input
//                       className={inp}
//                       placeholder="github.com/alexchen"
//                       value={data.personal.github}
//                       onChange={(e) =>
//                         set(["personal", "github"], e.target.value)
//                       }
//                     />
//                   </F>
//                   <F label="Portfolio / Website">
//                     <input
//                       className={inp}
//                       placeholder="alexchen.io"
//                       value={data.personal.website}
//                       onChange={(e) =>
//                         set(["personal", "website"], e.target.value)
//                       }
//                     />
//                   </F>
//                 </div>
//                 <div className="h-px bg-indigo-50 my-3" />
//                 <F label="Professional Summary (optional)">
//                   <textarea
//                     className={ta}
//                     placeholder="2–3 sentence summary of your experience…"
//                     value={data.personal.summary}
//                     onChange={(e) =>
//                       set(["personal", "summary"], e.target.value)
//                     }
//                   />
//                 </F>
//                 <F label="Closing Salutation">
//                   <input
//                     className={inp}
//                     placeholder="Sincerely (default)"
//                     value={data.personal.signature}
//                     onChange={(e) =>
//                       set(["personal", "signature"], e.target.value)
//                     }
//                   />
//                 </F>
//               </div>
//             )}

//             {/* COMPANY STEP */}
//             {step === "company" && (
//               <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-lg">
//                     🏢
//                   </div>
//                   <div>
//                     <p className="text-[14px] font-extrabold text-slate-900">
//                       Company & Role
//                     </p>
//                     <p className="text-[11.5px] text-slate-500">
//                       Application target details
//                     </p>
//                   </div>
//                 </div>
//                 <F label="Company Name" icon="🏢" required>
//                   <input
//                     className={inp}
//                     placeholder="Google, Stripe, Airbnb…"
//                     value={data.company.name}
//                     onChange={(e) => set(["company", "name"], e.target.value)}
//                   />
//                 </F>
//                 <F label="Role Applying For" icon="🎯" required>
//                   <input
//                     className={inp}
//                     placeholder="Senior UX Designer"
//                     value={data.company.jobTitle}
//                     onChange={(e) =>
//                       set(["company", "jobTitle"], e.target.value)
//                     }
//                   />
//                 </F>
//                 <div className="grid sm:grid-cols-2 gap-3">
//                   <F label="Hiring Manager" icon="👤">
//                     <input
//                       className={inp}
//                       placeholder="Sarah Johnson"
//                       value={data.company.hiringManager}
//                       onChange={(e) =>
//                         set(["company", "hiringManager"], e.target.value)
//                       }
//                     />
//                   </F>
//                   <F label="Their Title" icon="🏷️">
//                     <input
//                       className={inp}
//                       placeholder="Head of Design"
//                       value={data.company.hiringManagerTitle}
//                       onChange={(e) =>
//                         set(["company", "hiringManagerTitle"], e.target.value)
//                       }
//                     />
//                   </F>
//                 </div>
//                 <div className="grid sm:grid-cols-2 gap-3">
//                   <F label="City">
//                     <input
//                       className={`${inp} pl-3`}
//                       placeholder="Mountain View"
//                       value={data.company.city}
//                       onChange={(e) => set(["company", "city"], e.target.value)}
//                     />
//                   </F>
//                   <F label="State">
//                     <input
//                       className={`${inp} pl-3`}
//                       placeholder="CA"
//                       value={data.company.state}
//                       onChange={(e) =>
//                         set(["company", "state"], e.target.value)
//                       }
//                     />
//                   </F>
//                 </div>
//                 <div className="h-px bg-indigo-50 my-3" />
//                 <F label="Where you found this job" icon="🔍">
//                   <input
//                     className={inp}
//                     placeholder="LinkedIn, Referral, Company website…"
//                     value={data.company.jobSource}
//                     onChange={(e) =>
//                       set(["company", "jobSource"], e.target.value)
//                     }
//                   />
//                 </F>
//                 <F label="Referral Name (if any)" icon="🤝">
//                   <input
//                     className={inp}
//                     placeholder="John Smith referred me"
//                     value={data.company.referral}
//                     onChange={(e) =>
//                       set(["company", "referral"], e.target.value)
//                     }
//                   />
//                 </F>
//               </div>
//             )}

//             {/* CONTENT STEP */}
//             {step === "content" && (
//               <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-lg">
//                     ✍️
//                   </div>
//                   <div>
//                     <p className="text-[14px] font-extrabold text-slate-900">
//                       Letter Content
//                     </p>
//                     <p className="text-[11.5px] text-slate-500">
//                       Build your letter step by step
//                     </p>
//                   </div>
//                 </div>

//                 {/* DATE — user-selectable */}
//                 <F label="Letter Date" icon="📅">
//                   <input
//                     className={inp}
//                     type="date"
//                     value={data.letterDate}
//                     onChange={(e) => set(["letterDate"], e.target.value)}
//                   />
//                 </F>

//                 <div className="h-px bg-indigo-50 my-3" />
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
//                   ✍️ Letter Sections
//                 </p>

//                 {data.sections.map((s, i) => (
//                   <div
//                     key={s.id}
//                     className="bg-indigo-50/60 border-[1.5px] border-indigo-100 rounded-xl p-3 mb-2.5 transition-all focus-within:bg-white focus-within:border-indigo-400 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,.08)]"
//                   >
//                     <div className="flex items-center gap-2 mb-2.5">
//                       <span className="w-[22px] h-[22px] rounded-[7px] bg-gradient-to-br from-indigo-600 to-violet-600 text-white text-[10px] font-extrabold flex items-center justify-center flex-shrink-0">
//                         {i + 1}
//                       </span>
//                       <input
//                         value={s.title}
//                         onChange={(e) => setSec(s.id, "title", e.target.value)}
//                         placeholder="Section title"
//                         className="flex-1 px-2.5 py-1.5 rounded-lg border-[1.5px] border-slate-200 text-[12.5px] font-bold bg-white text-slate-900 outline-none focus:border-indigo-500 transition-all"
//                       />
//                       {data.sections.length > 1 && (
//                         <button
//                           onClick={() =>
//                             setData((p) => ({
//                               ...p,
//                               sections: p.sections.filter((x) => x.id !== s.id),
//                             }))
//                           }
//                           className="w-6 h-6 bg-white border-[1.5px] border-slate-200 rounded-[6px] text-red-400 text-[12px] flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-all"
//                         >
//                           ✕
//                         </button>
//                       )}
//                     </div>
//                     <textarea
//                       value={s.content}
//                       onChange={(e) => setSec(s.id, "content", e.target.value)}
//                       placeholder={s.placeholder}
//                       rows={4}
//                       className="w-full px-2.5 py-2 rounded-lg border-[1.5px] border-slate-200 bg-white text-[12.5px] text-slate-800 leading-relaxed outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,.08)] transition-all resize-y"
//                     />
//                   </div>
//                 ))}
//                 <button
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
//                   className="w-full py-2 mb-3.5 bg-white border-[1.5px] border-dashed border-indigo-200 rounded-xl text-[12.5px] font-bold text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400 transition-all"
//                 >
//                   + Add Section
//                 </button>

//                 <div className="h-px bg-indigo-50 my-3" />
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
//                   🏆 Key Achievements
//                 </p>
//                 <div className="flex gap-2 mb-2">
//                   <input
//                     className="flex-1 px-3 py-2 text-[12.5px] border-[1.5px] border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
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
//                     onClick={() => {
//                       if (achIn.trim()) {
//                         setData((p) => ({
//                           ...p,
//                           achievements: [...p.achievements, achIn.trim()],
//                         }));
//                         setAchIn("");
//                       }
//                     }}
//                     className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[12px] font-bold rounded-xl"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-1.5 mb-1">
//                   {data.achievements.map((a, i) => (
//                     <div
//                       key={i}
//                       className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-[12px] font-semibold text-indigo-700"
//                     >
//                       ⭐ {a}
//                       <button
//                         onClick={() =>
//                           setData((p) => ({
//                             ...p,
//                             achievements: p.achievements.filter(
//                               (_, j) => j !== i,
//                             ),
//                           }))
//                         }
//                         className="text-indigo-300 hover:text-red-400 text-[13px] leading-none transition-colors"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="h-px bg-indigo-50 my-3" />
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
//                   🛠️ Core Skills / Tools
//                 </p>
//                 <div className="flex gap-2 mb-2">
//                   <input
//                     className="flex-1 px-3 py-2 text-[12.5px] border-[1.5px] border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                     placeholder="e.g. Figma, React, Premiere Pro…"
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
//                     onClick={() => {
//                       if (sklIn.trim()) {
//                         setData((p) => ({
//                           ...p,
//                           skills: [...p.skills, sklIn.trim()],
//                         }));
//                         setSklIn("");
//                       }
//                     }}
//                     className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[12px] font-bold rounded-xl"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-1.5 mb-1">
//                   {data.skills.map((s, i) => (
//                     <div
//                       key={i}
//                       className="flex items-center gap-1.5 px-2.5 py-1 bg-violet-50 border border-violet-100 rounded-full text-[12px] font-semibold text-violet-700"
//                     >
//                       🔧 {s}
//                       <button
//                         onClick={() =>
//                           setData((p) => ({
//                             ...p,
//                             skills: p.skills.filter((_, j) => j !== i),
//                           }))
//                         }
//                         className="text-violet-300 hover:text-red-400 text-[13px] leading-none transition-colors"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="h-px bg-indigo-50 my-3" />
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
//                   🎭 Tone of Voice
//                 </p>
//                 <div className="flex flex-wrap gap-1.5 mb-3">
//                   {tones.map((t) => (
//                     <button
//                       key={t}
//                       onClick={() => setData((p) => ({ ...p, tone: t }))}
//                       className={`px-3 py-1 rounded-full text-[12px] font-semibold border-[1.5px] transition-all ${data.tone === t ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-slate-200 text-slate-500 bg-white hover:border-indigo-200"}`}
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="h-px bg-indigo-50 my-3" />
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
//                   📝 Additional Notes
//                 </p>
//                 <textarea
//                   className={ta}
//                   rows={3}
//                   placeholder="Post-script, special circumstances, or extra context…"
//                   value={data.notes}
//                   onChange={(e) =>
//                     setData((p) => ({ ...p, notes: e.target.value }))
//                   }
//                 />
//               </div>
//             )}

//             {/* REVIEW STEP */}
//             {step === "review" && (
//               <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-lg">
//                     ✅
//                   </div>
//                   <div>
//                     <p className="text-[14px] font-extrabold text-slate-900">
//                       Review Summary
//                     </p>
//                     <p className="text-[11.5px] text-slate-500">
//                       Check before downloading
//                     </p>
//                   </div>
//                 </div>
//                 {(
//                   [
//                     ["Template", tpl.name, "template"],
//                     ["Accent Color", data.accentColor, "template"],
//                     ["Full Name", data.personal.fullName, "personal"],
//                     ["Title", data.personal.title, "personal"],
//                     ["Email", data.personal.email, "personal"],
//                     ["Phone", data.personal.phone, "personal"],
//                     ["Location", data.personal.location, "personal"],
//                     ["LinkedIn", data.personal.linkedin, "personal"],
//                     ["GitHub", data.personal.github, "personal"],
//                     ["Portfolio", data.personal.website, "personal"],
//                     ["Company", data.company.name, "company"],
//                     ["Role", data.company.jobTitle, "company"],
//                     ["Manager", data.company.hiringManager, "company"],
//                     ["Referral", data.company.referral, "company"],
//                     ["Letter Date", data.letterDate, "content"],
//                     ["Tone", data.tone, "content"],
//                     [
//                       "Sections",
//                       `${data.sections.filter((s) => s.content).length} written`,
//                       "content",
//                     ],
//                     [
//                       "Achievements",
//                       `${data.achievements.length} added`,
//                       "content",
//                     ],
//                     ["Skills", `${data.skills.length} added`, "content"],
//                   ] as [string, string, Step][]
//                 ).map(([l, v, s]) => (
//                   <div
//                     key={l}
//                     className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
//                   >
//                     <span className="text-[11px] font-extrabold uppercase tracking-[.5px] text-slate-400">
//                       {l}
//                     </span>
//                     <div className="flex items-center gap-2">
//                       {l === "Accent Color" ? (
//                         <span
//                           className="w-4 h-4 rounded-full border border-slate-200"
//                           style={{ background: v }}
//                         />
//                       ) : (
//                         <span
//                           className={`text-[12.5px] font-medium text-right max-w-[160px] truncate ${v ? "text-slate-800" : "text-slate-300"}`}
//                         >
//                           {v || "—"}
//                         </span>
//                       )}
//                       <button
//                         onClick={() => setStep(s)}
//                         className="text-[11px] font-bold text-indigo-500 hover:text-indigo-700"
//                       >
//                         Edit
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//                 <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
//                   <p className="text-[13px] font-bold text-slate-900 mb-1">
//                     ✅ Ready to Download
//                   </p>
//                   <p className="text-[12px] text-slate-500">
//                     Click "Download PDF" to save your cover letter.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* FOOTER NAV */}
//           <div className="flex-shrink-0 px-5 py-3 border-t border-slate-200 bg-white flex justify-between items-center gap-3">
//             <button
//               onClick={() =>
//                 stepIdx === 0
//                   ? router.push("/")
//                   : setStep(STEPS[stepIdx - 1].id)
//               }
//               className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[13px] font-bold border-[1.5px] border-slate-200 bg-white text-slate-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all cursor-pointer"
//             >
//               ← {stepIdx > 0 ? `Back` : "Home"}
//             </button>
//             {stepIdx < STEPS.length - 1 ? (
//               <button
//                 onClick={() => setStep(STEPS[stepIdx + 1].id)}
//                 className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[13.5px] font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_4px_14px_rgba(91,56,240,.3)] hover:-translate-y-px transition-all cursor-pointer"
//               >
//                 Continue to {STEPS[stepIdx + 1].label} →
//               </button>
//             ) : (
//               <button
//                 onClick={downloadPDF}
//                 disabled={busy}
//                 className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[13.5px] font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_4px_14px_rgba(91,56,240,.3)] hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all"
//               >
//                 {busy ? "⏳ Generating…" : "⬇ Download PDF"}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* RIGHT — CANVAS */}
//         <div className="hidden lg:flex flex-col bg-slate-100 overflow-hidden">
//           <div className="flex-shrink-0 h-[52px] bg-white border-b border-slate-200 px-4 flex items-center justify-between gap-3">
//             <div className="flex items-center gap-2.5">
//               <span className="w-2 h-2 rounded-full bg-emerald-500 live-dot" />
//               <div>
//                 <p className="text-[13px] font-bold text-slate-900 leading-tight">
//                   Live Preview
//                 </p>
//                 <p className="text-[10.5px] text-slate-400">
//                   Drag · Pinch · Ctrl+Scroll to zoom
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setStep("template")}
//                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 hover:bg-indigo-100 transition-all"
//               >
//                 🎨 Change
//               </button>
//               <button
//                 onClick={() => {
//                   rebuild();
//                   setModal(true);
//                 }}
//                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-bold border-[1.5px] border-slate-200 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
//               >
//                 ⛶ Fullscreen
//               </button>
//             </div>
//           </div>
//           <div className="flex-1 overflow-hidden">
//             <CanvasPreview>
//               {html ? (
//                 <iframe
//                   ref={liveRef}
//                   className="canvas-iframe"
//                   title="preview"
//                   sandbox="allow-same-origin"
//                 />
//               ) : (
//                 <div className="w-[860px] h-[1120px] bg-white flex flex-col items-center justify-center gap-3 text-slate-400">
//                   <span className="text-[52px] opacity-20">📄</span>
//                   <p className="text-[16px] font-bold">Preview appears here</p>
//                   <p className="text-[13px]">
//                     Fill in your details to see the letter
//                   </p>
//                 </div>
//               )}
//             </CanvasPreview>
//           </div>
//         </div>
//       </div>

//       {/* MOBILE PREVIEW FAB */}
//       <button
//         onClick={() => {
//           rebuild();
//           setModal(true);
//         }}
//         className="lg:hidden fixed top-[70px] right-3 z-50 bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-2.5 rounded-full shadow-lg"
//       >
//         <FiEye className="w-4 h-4" />
//       </button>

//       {/* FULLSCREEN MODAL — canvas with correct drag fix */}
//       <AnimatePresence>
//         {modal && (
//           <div
//             className="ov-anim fixed inset-0 bg-[rgba(10,6,30,.86)] backdrop-blur-[14px] z-[1000] flex items-center justify-center p-3 sm:p-5"
//             onClick={() => setModal(false)}
//           >
//             <div
//               className="modal-anim w-full max-w-[980px] h-[93vh] bg-white rounded-2xl overflow-hidden flex flex-col shadow-[0_48px_100px_rgba(0,0,0,.48)]"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex-shrink-0 h-[54px] px-5 bg-white border-b border-slate-100 flex items-center justify-between">
//                 <div className="flex items-center gap-2.5">
//                   <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-sm text-white">
//                     📄
//                   </div>
//                   <div>
//                     <p className="text-[14px] font-extrabold text-slate-900 leading-tight">
//                       {data.personal.fullName || "Cover Letter"}
//                     </p>
//                     <p className="text-[11px] text-slate-400">
//                       {tpl.name} · {tpl.tag} ·{" "}
//                       <span style={{ color: data.accentColor }}>
//                         {data.accentColor}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setModal(false)}
//                   className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 text-slate-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 flex items-center justify-center text-[16px] transition-all"
//                 >
//                   ✕
//                 </button>
//               </div>

//               {/* CANVAS IN MODAL — fixed: touch drag works, no scroll bleed */}
//               <div className="flex-1 overflow-hidden bg-slate-200/60">
//                 <CanvasPreview>
//                   {html ? (
//                     <iframe
//                       ref={modalRef}
//                       className="modal-iframe"
//                       title="full-preview"
//                       sandbox="allow-same-origin"
//                     />
//                   ) : (
//                     <div className="w-[860px] h-[1120px] bg-white flex items-center justify-center text-slate-400">
//                       <span className="text-5xl opacity-20">📄</span>
//                     </div>
//                   )}
//                 </CanvasPreview>
//               </div>

//               <div className="flex-shrink-0 px-5 py-3 border-t border-slate-100 bg-white flex justify-end gap-2.5">
//                 <button
//                   onClick={() => setModal(false)}
//                   className="px-4 py-2 rounded-full text-[12.5px] font-bold border-[1.5px] border-slate-200 text-slate-500 hover:bg-slate-50 transition-all"
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={downloadPDF}
//                   disabled={busy}
//                   className="flex items-center gap-1.5 px-5 py-2 rounded-full text-[12.5px] font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_4px_12px_rgba(91,56,240,.28)] hover:shadow-[0_6px_20px_rgba(91,56,240,.36)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                 >
//                   {busy ? "⏳ Generating…" : "⬇ Download PDF"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </AnimatePresence>

//       {toast && (
//         <div className="toast-anim fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-slate-900 text-white px-6 py-2.5 rounded-full text-[13px] font-bold shadow-[0_8px_26px_rgba(0,0,0,.2)] whitespace-nowrap">
//           {toast}
//         </div>
//       )}
//     </>
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
// import {
//   FiZoomIn,
//   FiZoomOut,
//   FiRefreshCw,
//   FiEye,
//   FiLock,
// } from "react-icons/fi";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { API_URL } from "@/app/config/api";
// import { getLocalStorage } from "@/app/utils/localStorage";

// /* ─────────────────────────────────────────────────────────────
//    TYPES
// ───────────────────────────────────────────────────────────────*/
// interface User {
//   id: string;
// }
// interface CLData {
//   personal: {
//     fullName: string;
//     title: string;
//     email: string;
//     phone: string;
//     location: string;
//     website: string;
//     linkedin: string;
//     github: string;
//     summary: string;
//     signature: string;
//   };
//   company: {
//     name: string;
//     jobTitle: string;
//     hiringManager: string;
//     hiringManagerTitle: string;
//     city: string;
//     state: string;
//     jobSource: string;
//     referral: string;
//   };
//   sections: {
//     id: string;
//     title: string;
//     content: string;
//     placeholder: string;
//   }[];
//   achievements: string[];
//   skills: string[];
//   tone: string;
//   notes: string;
//   letterDate: string;
//   accentColor: string;
//   fontFamily: string;
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
//         "Express your enthusiasm for the role. Mention where you found it and a compelling hook about why you're perfect…",
//     },
//     {
//       id: "2",
//       title: "Experience & Skills",
//       content: "",
//       placeholder:
//         "Highlight 2–3 specific accomplishments with metrics. Show you solve their exact problems…",
//     },
//     {
//       id: "3",
//       title: "Why This Company",
//       content: "",
//       placeholder:
//         "Reference their mission, recent news, products, or culture. Show genuine research…",
//     },
//     {
//       id: "4",
//       title: "Closing",
//       content: "",
//       placeholder:
//         "Restate enthusiasm, include a clear CTA, mention portfolio/work samples if applicable…",
//     },
//   ],
//   achievements: [],
//   skills: [],
//   tone: "professional",
//   notes: "",
//   letterDate: new Date().toISOString().split("T")[0],
//   accentColor: "#6366f1",
//   fontFamily: "DM Sans",
// };

// /* ─────────────────────────────────────────────────────────────
//    FONT FAMILIES
// ───────────────────────────────────────────────────────────────*/
// const FONT_FAMILIES = [
//   {
//     id: "DM Sans",
//     label: "DM Sans",
//     url: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap",
//     style: "sans-serif",
//   },
//   {
//     id: "Inter",
//     label: "Inter",
//     url: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
//     style: "sans-serif",
//   },
//   {
//     id: "Plus Jakarta",
//     label: "Plus Jakarta",
//     url: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap",
//     style: "sans-serif",
//   },
//   {
//     id: "Outfit",
//     label: "Outfit",
//     url: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap",
//     style: "sans-serif",
//   },
//   {
//     id: "Nunito",
//     label: "Nunito",
//     url: "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap",
//     style: "sans-serif",
//   },
//   {
//     id: "Manrope",
//     label: "Manrope",
//     url: "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap",
//     style: "sans-serif",
//   },
//   {
//     id: "Syne",
//     label: "Syne",
//     url: "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap",
//     style: "sans-serif",
//   },
//   {
//     id: "Playfair",
//     label: "Playfair",
//     url: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&display=swap",
//     style: "serif",
//   },
//   {
//     id: "Lora",
//     label: "Lora",
//     url: "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap",
//     style: "serif",
//   },
//   {
//     id: "Cormorant",
//     label: "Cormorant",
//     url: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap",
//     style: "serif",
//   },
//   {
//     id: "IBM Plex",
//     label: "IBM Plex Mono",
//     url: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap",
//     style: "monospace",
//   },
//   {
//     id: "Space Grotesk",
//     label: "Space Grotesk",
//     url: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
//     style: "sans-serif",
//   },
// ];

// /* ─────────────────────────────────────────────────────────────
//    40 TEMPLATE DEFINITIONS
// ───────────────────────────────────────────────────────────────*/
// const TEMPLATES = [
//   // Modern
//   { id: "aurora", name: "Aurora", tag: "Modern" },
//   { id: "prism", name: "Prism", tag: "Modern" },
//   { id: "frost", name: "Frost", tag: "Modern" },
//   { id: "canvas", name: "Canvas", tag: "Modern" },
//   { id: "gradient", name: "Gradient", tag: "Modern" },
//   { id: "vivid", name: "Vivid", tag: "Modern" },
//   { id: "aurora2", name: "Nova", tag: "Modern" },
//   { id: "tidal", name: "Tidal", tag: "Modern" },
//   // Executive / Corporate
//   { id: "obsidian", name: "Obsidian", tag: "Executive" },
//   { id: "slate", name: "Slate", tag: "Corporate" },
//   { id: "architect", name: "Architect", tag: "Corporate" },
//   { id: "corporate", name: "Corporate", tag: "Corporate" },
//   { id: "executive", name: "Executive", tag: "Executive" },
//   { id: "titan", name: "Titan", tag: "Corporate" },
//   { id: "oxford", name: "Oxford", tag: "Executive" },
//   { id: "summit", name: "Summit", tag: "Corporate" },
//   // Minimal / Clean
//   { id: "nordic", name: "Nordic", tag: "Minimal" },
//   { id: "pearl", name: "Pearl", tag: "Minimal" },
//   { id: "minimal", name: "Minimal", tag: "Minimal" },
//   { id: "zen", name: "Zen", tag: "Minimal" },
//   { id: "ivory", name: "Ivory", tag: "Classic" },
//   { id: "paper", name: "Paper", tag: "Classic" },
//   { id: "serif", name: "Serif", tag: "Classic" },
//   { id: "editorial", name: "Editorial", tag: "Editorial" },
//   // Creative / Designer
//   { id: "designer", name: "Designer", tag: "Creative" },
//   { id: "motion", name: "Motion", tag: "Creative" },
//   { id: "pixel", name: "Pixel", tag: "Creative" },
//   { id: "brushstroke", name: "Brushstroke", tag: "Creative" },
//   { id: "studio", name: "Studio", tag: "Creative" },
//   { id: "folio", name: "Folio", tag: "Designer" },
//   { id: "artboard", name: "Artboard", tag: "Designer" },
//   { id: "vortex", name: "Vortex", tag: "Designer" },
//   // Dark / Premium
//   { id: "velvet", name: "Velvet", tag: "Luxury" },
//   { id: "carbon", name: "Carbon", tag: "Dark" },
//   { id: "plasma", name: "Plasma", tag: "Dark" },
//   { id: "neon", name: "Neon", tag: "Dark" },
//   // Tech / Video
//   { id: "editor", name: "Director", tag: "Video" },
//   { id: "hackr", name: "Hackr", tag: "Tech" },
//   { id: "techwave", name: "TechWave", tag: "Tech" },
//   { id: "blaze", name: "Blaze", tag: "Bold" },
// ];

// /* ─────────────────────────────────────────────────────────────
//    CANVAS PREVIEW — all pointer events on wrapper, pos via refs
// ───────────────────────────────────────────────────────────────*/
// function CanvasPreview({ children }: { children: ReactNode }) {
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const posRef = useRef({ x: 20, y: 20 });
//   const scaleRef = useRef(0.58);
//   const downRef = useRef<{ x: number; y: number } | null>(null);
//   const startRef = useRef({ x: 0, y: 0 });
//   const isDrag = useRef(false);
//   const animRef = useRef<number | null>(null);
//   const lastDist = useRef(0);

//   const [pos, setPos] = useState({ x: 20, y: 20 });
//   const [scale, setScale] = useState(0.58);
//   const [drag, setDrag] = useState(false);

//   const initS = useCallback(() => {
//     const w = window.innerWidth;
//     return w < 480
//       ? 0.33
//       : w < 640
//         ? 0.4
//         : w < 820
//           ? 0.5
//           : w < 1024
//             ? 0.57
//             : w < 1280
//               ? 0.63
//               : 0.68;
//   }, []);

//   useEffect(() => {
//     const s = initS();
//     scaleRef.current = s;
//     setScale(s);
//     const fn = () => {
//       const s2 = initS();
//       scaleRef.current = s2;
//       setScale(s2);
//     };
//     window.addEventListener("resize", fn);
//     return () => window.removeEventListener("resize", fn);
//   }, [initS]);

//   const smoothZoom = (target: number) => {
//     if (animRef.current) cancelAnimationFrame(animRef.current);
//     const from = scaleRef.current,
//       t0 = performance.now();
//     const tick = (now: number) => {
//       const p = Math.min((now - t0) / 160, 1);
//       const v = from + (target - from) * (1 - Math.pow(1 - p, 3));
//       scaleRef.current = v;
//       setScale(v);
//       if (p < 1) animRef.current = requestAnimationFrame(tick);
//     };
//     animRef.current = requestAnimationFrame(tick);
//   };
//   const zoomIn = () => smoothZoom(Math.min(scaleRef.current + 0.12, 3));
//   const zoomOut = () => smoothZoom(Math.max(scaleRef.current - 0.12, 0.2));
//   const reset = () => {
//     const p = { x: 20, y: 20 };
//     posRef.current = p;
//     setPos(p);
//     smoothZoom(initS());
//   };

//   useEffect(() => {
//     const el = wrapRef.current;
//     if (!el) return;

//     // Mouse
//     const onDown = (e: MouseEvent) => {
//       // ALWAYS capture drag from anywhere on the wrapper including over the iframe
//       e.preventDefault();
//       downRef.current = { x: e.clientX, y: e.clientY };
//       isDrag.current = false;
//     };
//     const onMove = (e: MouseEvent) => {
//       if (!downRef.current) return;
//       const dx = e.clientX - downRef.current.x,
//         dy = e.clientY - downRef.current.y;
//       if (!isDrag.current && Math.hypot(dx, dy) > 3) {
//         isDrag.current = true;
//         setDrag(true);
//         startRef.current = {
//           x: downRef.current.x - posRef.current.x,
//           y: downRef.current.y - posRef.current.y,
//         };
//       }
//       if (isDrag.current) {
//         const np = {
//           x: e.clientX - startRef.current.x,
//           y: e.clientY - startRef.current.y,
//         };
//         posRef.current = np;
//         setPos({ ...np });
//       }
//     };
//     const onUp = () => {
//       downRef.current = null;
//       isDrag.current = false;
//       setDrag(false);
//     };

//     // Touch
//     const onTouchStart = (e: TouchEvent) => {
//       if (e.touches.length === 1) {
//         const t = e.touches[0];
//         downRef.current = { x: t.clientX, y: t.clientY };
//         isDrag.current = false;
//       } else if (e.touches.length === 2) {
//         const dx = e.touches[1].clientX - e.touches[0].clientX;
//         const dy = e.touches[1].clientY - e.touches[0].clientY;
//         lastDist.current = Math.hypot(dx, dy);
//       }
//     };
//     const onTouchMove = (e: TouchEvent) => {
//       e.preventDefault();
//       if (e.touches.length === 2) {
//         const dx = e.touches[1].clientX - e.touches[0].clientX;
//         const dy = e.touches[1].clientY - e.touches[0].clientY;
//         const d = Math.hypot(dx, dy);
//         if (lastDist.current > 0) {
//           const v = Math.max(
//             0.2,
//             Math.min(3, scaleRef.current * (d / lastDist.current)),
//           );
//           scaleRef.current = v;
//           setScale(v);
//         }
//         lastDist.current = d;
//         return;
//       }
//       if (!downRef.current || e.touches.length !== 1) return;
//       const t = e.touches[0];
//       const dx = t.clientX - downRef.current.x,
//         dy = t.clientY - downRef.current.y;
//       if (!isDrag.current && Math.hypot(dx, dy) > 3) {
//         isDrag.current = true;
//         setDrag(true);
//         startRef.current = {
//           x: downRef.current.x - posRef.current.x,
//           y: downRef.current.y - posRef.current.y,
//         };
//       }
//       if (isDrag.current) {
//         const np = {
//           x: t.clientX - startRef.current.x,
//           y: t.clientY - startRef.current.y,
//         };
//         posRef.current = np;
//         setPos({ ...np });
//       }
//     };
//     const onTouchEnd = () => {
//       downRef.current = null;
//       isDrag.current = false;
//       setDrag(false);
//     };

//     // Wheel
//     const onWheel = (e: WheelEvent) => {
//       e.preventDefault();
//       if (e.ctrlKey || e.metaKey) {
//         const v = Math.max(
//           0.2,
//           Math.min(3, scaleRef.current * Math.exp(-e.deltaY * 0.002)),
//         );
//         scaleRef.current = v;
//         setScale(v);
//       } else {
//         const np = {
//           x: posRef.current.x - e.deltaX * 0.5,
//           y: posRef.current.y - e.deltaY * 0.5,
//         };
//         posRef.current = np;
//         setPos({ ...np });
//       }
//     };

//     el.addEventListener("mousedown", onDown, { passive: false });
//     el.addEventListener("mousemove", onMove, { passive: false });
//     el.addEventListener("mouseup", onUp);
//     el.addEventListener("mouseleave", onUp);
//     el.addEventListener("touchstart", onTouchStart, { passive: true });
//     el.addEventListener("touchmove", onTouchMove, { passive: false });
//     el.addEventListener("touchend", onTouchEnd);
//     el.addEventListener("wheel", onWheel, { passive: false });
//     return () => {
//       el.removeEventListener("mousedown", onDown);
//       el.removeEventListener("mousemove", onMove);
//       el.removeEventListener("mouseup", onUp);
//       el.removeEventListener("mouseleave", onUp);
//       el.removeEventListener("touchstart", onTouchStart);
//       el.removeEventListener("touchmove", onTouchMove);
//       el.removeEventListener("touchend", onTouchEnd);
//       el.removeEventListener("wheel", onWheel);
//     };
//   }, []);

//   return (
//     <div className="relative w-full h-full" style={{ minHeight: 360 }}>
//       {/* The wrapper covers 100% including over the iframe — pointer events always captured here */}
//       <div
//         ref={wrapRef}
//         className="absolute inset-0 overflow-hidden select-none"
//         style={{
//           cursor: drag ? "grabbing" : "grab",
//           borderRadius: 12,
//           background: "#e8e6f2",
//           // CRITICAL: let pointer events through to this wrapper even when hovering over iframe
//           pointerEvents: "auto",
//         }}
//       >
//         {/* Transparent overlay so the wrapper always gets mouse events over the iframe */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             zIndex: 10,
//             // transparent but intercepts all pointer events so drag works over iframe
//             background: "transparent",
//             pointerEvents: drag ? "auto" : "none",
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             transformOrigin: "top left",
//             transform: `translate(${pos.x}px,${pos.y}px) scale(${scale})`,
//             willChange: "transform",
//             zIndex: 1,
//           }}
//         >
//           {children}
//         </div>
//       </div>

//       {/* Zoom badge */}
//       <div
//         data-nodrag
//         className="absolute top-2.5 left-2.5 z-30 pointer-events-none bg-white/90 backdrop-blur-sm border border-indigo-100 text-indigo-600 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm"
//       >
//         {Math.round(scale * 100)}%
//       </div>

//       {/* Controls */}
//       <div
//         data-nodrag
//         className="absolute bottom-3 right-3 z-30 flex flex-col gap-1.5"
//       >
//         {[
//           { fn: zoomIn, icon: <FiZoomIn className="w-3.5 h-3.5" />, p: true },
//           { fn: zoomOut, icon: <FiZoomOut className="w-3.5 h-3.5" />, p: true },
//           { fn: reset, icon: <FiRefreshCw className="w-3 h-3" />, p: false },
//         ].map((b, i) => (
//           <motion.button
//             key={i}
//             type="button"
//             onClick={b.fn}
//             whileHover={{ scale: 1.08 }}
//             whileTap={{ scale: 0.92 }}
//             className={`w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-md
//               ${b.p ? "bg-gradient-to-br from-indigo-600 to-violet-600" : "bg-gray-700 hover:bg-gray-800"}`}
//           >
//             {b.icon}
//           </motion.button>
//         ))}
//       </div>
//       <p
//         data-nodrag
//         className="absolute bottom-3 left-2 z-30 pointer-events-none text-[9px] font-semibold text-slate-400"
//       >
//         Drag · Pinch · Scroll
//       </p>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    40 UNIQUE SVG THUMBNAILS — each visually distinct
// ───────────────────────────────────────────────────────────────*/
// function TplThumb({ id, color = "#6366f1" }: { id: string; color?: string }) {
//   const W = 220,
//     H = 155;
//   const bg = "#ffffff";
//   const li = "#e5e7eb";
//   const ml = "#9ca3af";
//   const sl = "#6b7280";
//   const c = color;
//   const ca = `${c}33`; // color with 20% alpha
//   const cb = `${c}66`; // color with 40% alpha

//   const R = (
//     x: number,
//     y: number,
//     w: number,
//     h: number,
//     fill: string,
//     rx = 1.5,
//   ) => (
//     <rect
//       // key={`${x}${y}`}
//       x={x}
//       y={y}
//       width={w}
//       height={h}
//       rx={rx}
//       fill={fill}
//     />
//   );
//   const lines = (x: number, y: number, widths: number[], fill = li) =>
//     widths.map((w, i) => R(x, y + i * 7, w, 2.5, fill));

//   switch (id) {
//     /* ── 1. AURORA — gradient header, chips row ── */
//     case "aurora":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, bg, 0)}
//           <defs>
//             <linearGradient id="aur" x1="0" y1="0" x2="1" y2="1">
//               <stop offset="0%" stopColor={c} />
//               <stop offset="100%" stopColor={`${c}bb`} />
//             </linearGradient>
//           </defs>
//           {R(0, 0, W, 52, "url(#aur)", 0)}
//           <circle cx={200} cy={0} r={55} fill="rgba(255,255,255,.12)" />
//           {R(13, 12, 88, 9, "rgba(255,255,255,.92)", 2)}
//           {R(13, 25, 55, 4, "rgba(255,255,255,.55)", 1.5)}
//           {[0, 38, 78].map((ox) => (
//             <rect
//               key={ox}
//               x={13 + ox}
//               y={36}
//               width={32}
//               height={5}
//               rx={10}
//               fill="rgba(255,255,255,.18)"
//               stroke="rgba(255,255,255,.3)"
//               strokeWidth=".6"
//             />
//           ))}
//           {R(13, 62, 38, 2.5, ml)}
//           {...lines(13, 69, [130, 110, 122])}
//           {R(13, 92, 44, 3, c)}
//           {...lines(13, 99, [180, 162, 175])}
//           {R(13, 120, 44, 3, c)}
//           {...lines(13, 127, [155, 118])}
//           {R(13, 144, 32, 2, ml)}
//           {R(13, 150, 55, 3, sl)}
//         </svg>
//       );

//     /* ── 2. PRISM — angled geo header ── */
//     case "prism":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, bg, 0)}
//           {R(0, 0, W, 52, c, 0)}
//           <polygon points="110,0 220,0 220,52" fill="rgba(255,255,255,.14)" />
//           <polygon points="155,0 220,0 220,52" fill="rgba(255,255,255,.08)" />
//           {R(13, 12, 82, 9, "rgba(255,255,255,.92)", 1.5)}
//           {R(13, 25, 50, 3.5, "rgba(255,255,255,.65)")}
//           {R(0, 52, W, 11, "#1e1b4b", 0)}
//           {[13, 57, 104].map((x, i) => (
//             <rect
//               key={x}
//               x={x}
//               y={56}
//               width={38}
//               height={2}
//               rx={1}
//               fill="#a5b4fc"
//             />
//           ))}
//           {R(13, 74, 32, 2.5, ml)}
//           {...lines(13, 81, [188, 162])}
//           {R(13, 95, 2.5, 25, c, 1)}
//           {[95, 101, 106, 111].map((y, i) => (
//             <rect
//               key={y}
//               x={19}
//               y={y}
//               width={i === 0 ? 38 : [182, 155, 165][i - 1]}
//               height={2.2}
//               rx={1}
//               fill={i === 0 ? c : li}
//             />
//           ))}
//           {R(13, 148, 52, 3, sl)}
//         </svg>
//       );

//     /* ── 3. FROST — glassmorphism card ── */
//     case "frost":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <defs>
//             <linearGradient id="frg" x1="0" y1="0" x2="1" y2="1">
//               <stop offset="0%" stopColor="#dbeafe" />
//               <stop offset="100%" stopColor="#e0f2fe" />
//             </linearGradient>
//           </defs>
//           {R(0, 0, W, H, "url(#frg)", 0)}
//           {R(5, 5, 210, 145, "rgba(255,255,255,.82)", 10)}
//           {R(5, 5, 210, 50, `${c}e6`, 10)}
//           {R(5, 31, 210, 24, `${c}e6`, 0)}
//           {R(17, 14, 82, 8, "white", 1.5)}
//           {R(17, 26, 50, 3, "rgba(255,255,255,.65)")}
//           {[0, 33, 68].map((ox) => (
//             <rect
//               key={ox}
//               x={17 + ox}
//               y={37}
//               width={27}
//               height={4}
//               rx={10}
//               fill="rgba(255,255,255,.16)"
//               stroke="rgba(255,255,255,.28)"
//               strokeWidth=".5"
//             />
//           ))}
//           {R(17, 63, 36, 2.5, ml)}
//           {...lines(17, 70, [182, 157])}
//           {R(17, 83, 42, 3, c)}
//           {...lines(17, 90, [182, 170, 176])}
//           {R(17, 110, 42, 3, c)}
//           {...lines(17, 117, [182, 130])}
//           {R(17, 137, 28, 2, ml)}
//           {R(17, 143, 52, 3, sl)}
//         </svg>
//       );

//     /* ── 4. CANVAS — accent bar + clean white ── */
//     case "canvas":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, bg, 0)}
//           {R(13, 13, 4, 58, c, 2)}
//           {R(22, 13, 92, 10, "#111827", 2)}
//           {R(22, 27, 57, 4, "#6b7280", 1.5)}
//           {[35, 41, 47].map((y, i) => (
//             <rect
//               key={y}
//               x={22}
//               y={y}
//               width={[70, 58, 74][i]}
//               height={2.5}
//               rx={1}
//               fill={ml}
//             />
//           ))}
//           {R(13, 75, 188, 1, li, 0)}
//           {R(13, 82, 32, 2.5, ml)}
//           {...lines(13, 89, [188, 158])}
//           {R(13, 104, 44, 3, c)}
//           {...lines(13, 111, [188, 170, 178])}
//           {R(13, 131, 44, 3, c)}
//           {...lines(13, 138, [188, 122])}
//         </svg>
//       );

//     /* ── 5. GRADIENT — left accent stripe with gradient ── */
//     case "gradient":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <defs>
//             <linearGradient id="grd" x1="0" y1="0" x2="1" y2="0">
//               <stop offset="0%" stopColor={c} stopOpacity=".18" />
//               <stop offset="100%" stopColor={c} stopOpacity="0" />
//             </linearGradient>
//           </defs>
//           {R(0, 0, W, H, bg, 0)}
//           {R(0, 0, 7, H, c, 0)}
//           {R(7, 0, W - 7, H, "url(#grd)", 0)}
//           {R(18, 14, 88, 9, "#111827", 2)}
//           {R(18, 27, 54, 4, "#374151", 1.5)}
//           {R(18, 37, 192, 0.6, li, 0)}
//           {[43, 49, 55, 61].map((y, i) => (
//             <rect
//               key={y}
//               x={18}
//               y={y}
//               width={[58, 48, 68, 42][i]}
//               height={2.5}
//               rx={1}
//               fill={ml}
//             />
//           ))}
//           {R(18, 73, 192, 0.6, li, 0)}
//           {R(18, 82, 44, 3, c)}
//           {...lines(18, 89, [185, 168, 176])}
//           {R(18, 110, 44, 3, c)}
//           {...lines(18, 117, [185, 120])}
//         </svg>
//       );

//     /* ── 6. VIVID — bold dual-color header ── */
//     case "vivid":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <defs>
//             <linearGradient id="vvd" x1="0" y1="0" x2="1" y2="1">
//               <stop offset="0%" stopColor={c} />
//               <stop offset="100%" stopColor="#ec4899" />
//             </linearGradient>
//           </defs>
//           {R(0, 0, W, H, bg, 0)}
//           {R(0, 0, W, 50, "url(#vvd)", 0)}
//           <circle cx={30} cy={50} r={55} fill={`${c}18`} />
//           {R(14, 10, 82, 10, "rgba(255,255,255,.92)", 2)}
//           {R(14, 24, 50, 4, "rgba(255,255,255,.62)", 1.5)}
//           {[0, 36, 74].map((ox) => (
//             <rect
//               key={ox}
//               x={14 + ox}
//               y={36}
//               width={30}
//               height={4}
//               rx={8}
//               fill="rgba(255,255,255,.22)"
//             />
//           ))}
//           {R(14, 62, 38, 2.5, ml)}
//           {...lines(14, 69, [175, 148])}
//           {R(14, 83, 44, 3, c)}
//           {...lines(14, 90, [183, 165, 172])}
//           {R(14, 112, 44, 3, c)}
//           {...lines(14, 119, [183, 118])}
//         </svg>
//       );

//     /* ── 7. NOVA (aurora2) — wave header ── */
//     case "aurora2":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, bg, 0)}
//           {R(0, 0, W, 48, c, 0)}
//           <path
//             d={`M0,48 Q55,38 110,48 Q165,58 220,48 L220,0 L0,0Z`}
//             fill="rgba(255,255,255,.12)"
//           />
//           <polygon points="160,0 220,0 220,48" fill="rgba(255,255,255,.1)" />
//           {R(14, 11, 80, 8, "rgba(255,255,255,.9)", 2)}
//           {R(14, 23, 50, 4, "rgba(255,255,255,.58)", 1.5)}
//           {[14, 58, 104].map((x, i) => (
//             <rect
//               key={x}
//               x={x}
//               y={35}
//               width={38}
//               height={3.5}
//               rx={8}
//               fill="rgba(255,255,255,.2)"
//             />
//           ))}
//           {R(14, 58, 38, 2.5, ml)}
//           {...lines(14, 65, [175, 145])}
//           {R(14, 80, 44, 3, c)}
//           {...lines(14, 87, [183, 165, 173])}
//           {R(14, 108, 44, 3, c)}
//           {...lines(14, 115, [183, 118])}
//           {R(14, 142, 55, 3, sl)}
//         </svg>
//       );

//     /* ── 8. TIDAL — horizontal bands ── */
//     case "tidal":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, bg, 0)}
//           {R(0, 0, W, 4, c, 0)}
//           {R(0, 4, W, 38, `${c}12`, 0)}
//           {R(14, 10, 85, 8, "#111827", 2)}
//           {R(14, 23, 52, 4, c, 1.5)}
//           {R(14, 35, 192, 0.5, li, 0)}
//           {[40, 46, 52].map((y, i) => (
//             <rect
//               key={y}
//               x={14}
//               y={y}
//               width={[62, 52, 72][i]}
//               height={2.5}
//               rx={1}
//               fill={ml}
//             />
//           ))}
//           {R(155, 37, 60, 22, "#f8fafc", 4)}
//           {[40, 46, 52].map((y, i) => (
//             <rect
//               key={y}
//               x={158}
//               y={y}
//               width={[45, 35, 50][i]}
//               height={1.8}
//               rx={1}
//               fill="#94a3b8"
//             />
//           ))}
//           {R(14, 63, 192, 1.5, "#e2e8f0", 0)}
//           {R(14, 73, 44, 3, c)}
//           {...lines(14, 80, [185, 165, 175])}
//           {R(14, 101, 44, 3, c)}
//           {...lines(14, 108, [185, 118])}
//           {R(0, 151, W, 4, c, 0)}
//         </svg>
//       );

//     /* ── 9. OBSIDIAN — dark sidebar ── */
//     case "obsidian":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#f8f7ff", 0)}
//           {R(0, 0, 63, H, "#1e1b4b", 0)}
//           {R(7, 13, 47, 7, "rgba(233,213,255,.85)", 1.5)}
//           {R(7, 24, 34, 3, "rgba(165,180,252,.5)")}
//           {[44, 56, 68, 80, 92].map((y, i) => (
//             <g key={y}>
//               {R(7, y, 20, 2, "rgba(109,91,186,.7)")}
//               {R(7, y + 6, 46, 2, "rgba(196,181,253,.5)")}
//             </g>
//           ))}
//           {R(72, 13, 32, 2.5, ml)}
//           {...lines(72, 20, [130, 100], li)}
//           {R(72, 36, 40, 3, c)}
//           {...lines(72, 43, [138, 125, 130], li)}
//           {R(72, 64, 40, 3, c)}
//           {...lines(72, 71, [138, 112, 120], li)}
//           {R(72, 122, 28, 2, ml)}
//           {R(72, 129, 52, 3, sl)}
//         </svg>
//       );

//     /* ── 10. SLATE — corporate with mono contact ── */
//     case "slate":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, bg, 0)}
//           {R(13, 13, 92, 9, "#0f172a", 1.5)}
//           {R(13, 26, 55, 3, "#64748b")}
//           {R(137, 13, 70, 2.5, "#475569")}
//           {[19, 25, 31, 37].map((y, i) => (
//             <rect
//               key={y}
//               x={137}
//               y={y}
//               width={[60, 70, 55, 65][i]}
//               height={2}
//               rx={1}
//               fill="#94a3b8"
//             />
//           ))}
//           {R(13, 38, 192, 1.8, "#0f172a", 0)}
//           {R(13, 46, 72, 5, "#f1f5f9", 2)}
//           {R(15, 47.5, 48, 1.5, "#64748b", 0.5)}
//           {R(13, 57, 32, 2.5, ml)}
//           {...lines(13, 64, [188, 158])}
//           {R(13, 78, 2.5, 28, c, 1)}
//           {[78, 84, 89, 94].map((y, i) => (
//             <rect
//               key={y}
//               x={19}
//               y={y}
//               width={i === 0 ? 38 : [180, 158, 168][i - 1]}
//               height={2.2}
//               rx={1}
//               fill={i === 0 ? c : li}
//             />
//           ))}
//           {R(13, 133, 30, 2, ml)}
//           {R(13, 140, 52, 3, sl)}
//         </svg>
//       );

//     /* ── 11. ARCHITECT — header with company card ── */
//     case "architect":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#f8fafc", 0)}
//           {R(13, 13, 82, 10, "#0f172a", 1.5)}
//           {R(13, 27, 52, 3, "#334155")}
//           {R(113, 13, 94, 40, "#0f172a", 5)}
//           {[18, 24, 30, 36].map((y, i) => (
//             <rect
//               key={y}
//               x={119}
//               y={y}
//               width={[62, 52, 72, 46][i]}
//               height={2}
//               rx={1}
//               fill="rgba(255,255,255,.58)"
//             />
//           ))}
//           {R(13, 53, 192, 1.2, "#e2e8f0", 0)}
//           {R(13, 60, 32, 2.5, ml)}
//           {...lines(13, 67, [188, 158], "#e2e8f0")}
//           {R(13, 82, 44, 3, "#0f172a")}
//           {...lines(13, 89, [188, 170, 175], "#e2e8f0")}
//           {R(13, 109, 44, 3, "#0f172a")}
//           {...lines(13, 116, [188, 122], "#e2e8f0")}
//           {R(13, 136, 30, 2, ml)}
//           {R(13, 143, 52, 3, sl)}
//         </svg>
//       );

//     /* ── 12. CORPORATE — navy with top/bottom bars ── */
//     case "corporate":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, bg, 0)}
//           {R(0, 0, W, 8, c, 0)}
//           {R(0, 8, W, 44, "#1e3a5f", 0)}
//           {R(14, 14, 85, 8, "rgba(255,255,255,.92)", 2)}
//           {R(14, 26, 52, 4, "rgba(255,255,255,.6)", 1.5)}
//           {R(155, 12, 60, 8, "rgba(255,255,255,.7)", 2)}
//           {[18, 24, 30].map((y, i) => (
//             <rect
//               key={y}
//               x={155}
//               y={y}
//               width={[55, 40, 50][i]}
//               height={2}
//               rx={1}
//               fill="rgba(255,255,255,.5)"
//             />
//           ))}
//           {R(14, 58, 35, 2.5, ml)}
//           {...lines(14, 65, [185, 155])}
//           {R(14, 80, 44, 3, c)}
//           {...lines(14, 87, [185, 168, 175])}
//           {R(14, 108, 44, 3, c)}
//           {...lines(14, 115, [185, 118])}
//           {R(0, 147, W, 8, c, 0)}
//         </svg>
//       );

//     /* ── 13. EXECUTIVE — large hero header ── */
//     case "executive":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#f0f4f8", 0)}
//           {R(0, 0, W, 55, c, 0)}
//           <circle cx={195} cy={0} r={70} fill="rgba(255,255,255,.07)" />
//           {R(14, 12, 85, 9, "rgba(255,255,255,.92)", 2)}
//           {R(14, 25, 52, 4, "rgba(255,255,255,.6)", 1.5)}
//           {[0, 38, 80].map((ox) => (
//             <rect
//               key={ox}
//               x={14 + ox}
//               y={36}
//               width={32}
//               height={5}
//               rx={10}
//               fill="rgba(255,255,255,.2)"
//               stroke="rgba(255,255,255,.3)"
//               strokeWidth=".5"
//             />
//           ))}
//           {R(14, 65, 38, 2.5, ml)}
//           {...lines(14, 72, [175, 148])}
//           {R(14, 85, 44, 3, c)}
//           {...lines(14, 92, [185, 165, 175])}
//           {R(14, 113, 44, 3, c)}
//           {...lines(14, 120, [185, 118])}
//           {R(14, 143, 32, 2, ml)}
//           {R(14, 149, 55, 3, sl)}
//         </svg>
//       );

//     /* ── 14. TITAN — thick left pillar ── */
//     case "titan":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, bg, 0)}
//           {R(0, 0, 8, H, c, 0)}
//           {R(18, 14, 88, 10, "#1f2937", 2)}
//           {R(18, 28, 55, 4, "#374151", 1.5)}
//           {R(18, 38, 188, 1.5, "#e5e7eb", 0)}
//           {[44, 50, 56].map((y, i) => (
//             <rect
//               key={y}
//               x={18}
//               y={y}
//               width={[58, 48, 68][i]}
//               height={2.5}
//               rx={1}
//               fill={ml}
//             />
//           ))}
//           {R(18, 66, 188, 1.5, "#e5e7eb", 0)}
//           {R(18, 76, 44, 3, c)}
//           {...lines(18, 83, [183, 165, 174])}
//           {R(18, 104, 44, 3, c)}
//           {...lines(18, 111, [183, 120])}
//           {R(18, 132, 32, 2, ml)}
//           {R(18, 138, 55, 3, sl)}
//         </svg>
//       );

//     /* ── 15. OXFORD — serif-style centered with double rule ── */
//     case "oxford":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#faf9f7", 0)}
//           {R(14, 10, 192, 1.5, c, 0)}
//           {R(14, 14, 192, 0.5, c, 0)}
//           <text
//             x={110}
//             y={30}
//             textAnchor="middle"
//             fontSize={12}
//             fontWeight="700"
//             fill="#1a1209"
//             fontFamily="Georgia,serif"
//           >
//             Jonathan M. Williams
//           </text>
//           <text
//             x={110}
//             y={40}
//             textAnchor="middle"
//             fontSize={5.5}
//             fill={sl}
//             fontFamily="Georgia,serif"
//           >
//             Senior Architect & Project Director
//           </text>
//           {R(14, 44, 192, 0.5, c, 0)}
//           {R(14, 47, 192, 1.5, c, 0)}
//           {[53, 58, 63].map((y, i) => (
//             <rect
//               key={y}
//               x={[14, 80, 148][i]}
//               y={y}
//               width={60}
//               height={2}
//               rx={1}
//               fill={ml}
//             />
//           ))}
//           {R(14, 73, 192, 0.6, "#c9bc9a", 0)}
//           {R(14, 82, 38, 2.5, c)}
//           {...lines(14, 89, [185, 162, 172], "#d5cbb0")}
//           {R(14, 108, 38, 2.5, c)}
//           {...lines(14, 115, [185, 118], "#d5cbb0")}
//           {R(14, 138, 192, 1.5, c, 0)}
//         </svg>
//       );

//     /* ── 16. SUMMIT — logo badge top right ── */
//     case "summit":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, bg, 0)}
//           {R(0, 0, W, 3, c, 0)}
//           {R(14, 12, 88, 10, "#111827", 2)}
//           {R(14, 26, 54, 4, c, 1.5)}
//           {R(155, 10, 52, 28, c, 4)}
//           <text
//             x={181}
//             y={28}
//             textAnchor="middle"
//             fontSize={7}
//             fontWeight="700"
//             fill="white"
//           >
//             APPLYING
//           </text>
//           <text
//             x={181}
//             y={37}
//             textAnchor="middle"
//             fontSize={7}
//             fill="rgba(255,255,255,.75)"
//           >
//             TO
//           </text>
//           {R(14, 40, 188, 0.7, li, 0)}
//           {[46, 52, 58].map((y, i) => (
//             <rect
//               key={y}
//               x={14}
//               y={y}
//               width={[62, 52, 72][i]}
//               height={2.5}
//               rx={1}
//               fill={ml}
//             />
//           ))}
//           {R(14, 68, 188, 0.7, li, 0)}
//           {R(14, 78, 44, 3, c)}
//           {...lines(14, 85, [185, 165, 175])}
//           {R(14, 106, 44, 3, c)}
//           {...lines(14, 113, [185, 118])}
//           {R(0, 152, W, 3, c, 0)}
//         </svg>
//       );

//     /* ── 17. NORDIC — serif name minimal ── */
//     case "nordic":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, bg, 0)}
//           {R(16, 13, 62, 3, `${c}88`)}
//           {R(16, 20, 118, 10, "#1e1b4b", 1.5)}
//           {R(16, 34, 38, 3, c)}
//           {R(16, 43, 188, 0.8, `${c}44`, 0)}
//           {[0, 62, 124].map((ox) => (
//             <rect
//               key={ox}
//               x={16 + ox}
//               y={50}
//               width={56}
//               height={2}
//               rx={1}
//               fill={ml}
//             />
//           ))}
//           {R(16, 62, 32, 2.5, ml)}
//           {...lines(16, 69, [188, 162])}
//           {R(16, 84, 44, 3, c)}
//           {...lines(16, 91, [188, 162, 177])}
//           {R(16, 111, 44, 3, c)}
//           {...lines(16, 118, [188, 112])}
//           {R(16, 138, 30, 2, ml)}
//           {R(16, 145, 52, 3, sl)}
//         </svg>
//       );

//     /* ── 18. PEARL — ultra clean two-rule ── */
//     case "pearl":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, bg, 0)}
//           {R(13, 13, 97, 10, "#111827", 1.5)}
//           {R(13, 27, 60, 3.5, c)}
//           {R(13, 36, 188, 0.6, li, 0)}
//           {[42, 48].map((y, i) => (
//             <rect
//               key={y}
//               x={13}
//               y={y}
//               width={[62, 54][i]}
//               height={2}
//               rx={1}
//               fill={ml}
//             />
//           ))}
//           {R(92, 42, 57, 2, ml)}
//           {R(155, 42, 46, 2, ml)}
//           {R(13, 58, 188, 0.6, li, 0)}
//           {R(13, 64, 32, 2, ml)}
//           {...lines(13, 71, [188, 158])}
//           {R(13, 87, 44, 3, c)}
//           {...lines(13, 94, [188, 170, 176])}
//           {R(13, 115, 44, 3, c)}
//           {...lines(13, 122, [188, 122])}
//           {R(13, 140, 28, 2, ml)}
//           {R(13, 147, 52, 3, sl)}
//         </svg>
//       );

//     /* ── 19. MINIMAL — hairline rule, flat grey ── */
//     case "minimal":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#fafafa", 0)}
//           {R(16, 16, 110, 11, "#111", 1)}
//           {R(16, 31, 70, 3, "#666", 1)}
//           {R(16, 40, 188, 0.5, "#ddd", 0)}
//           {[46, 51, 56, 61].map((y, i) => (
//             <rect
//               key={y}
//               x={16}
//               y={y}
//               width={[80, 65, 90, 55][i]}
//               height={2}
//               rx={1}
//               fill="#aaa"
//             />
//           ))}
//           {R(16, 73, 188, 0.5, "#ddd", 0)}
//           {R(16, 82, 35, 2, "#999", 1)}
//           {...lines(16, 89, ["#ddd" as any, "#ddd" as any], li)}
//           {...lines(16, 89, [188, 160], "#ddd")}
//           {R(16, 104, 40, 2.5, c, 1)}
//           {...lines(16, 111, [188, 165, 175], "#ddd")}
//           {R(16, 131, 40, 2.5, c, 1)}
//           {...lines(16, 138, [188, 120], "#ddd")}
//           {R(16, 152, 188, 0.5, "#ddd", 0)}
//         </svg>
//       );

//     /* ── 20. ZEN — warm beige sparse ── */
//     case "zen":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#fafaf9", 0)}
//           {R(14, 18, 95, 10, "#1c1917", 2)}
//           {R(14, 32, 58, 3.5, "#57534e", 1.5)}
//           {R(14, 42, 192, 0.5, "#d6d3d1", 0)}
//           {[48, 54, 60, 66].map((y, i) => (
//             <rect
//               key={y}
//               x={14}
//               y={y}
//               width={[62, 52, 72, 46][i]}
//               height={2}
//               rx={1}
//               fill="#a8a29e"
//             />
//           ))}
//           {R(14, 74, 192, 0.5, "#d6d3d1", 0)}
//           {R(14, 82, 38, 2.5, c)}
//           {...lines(14, 89, [183, 162, 172], "#d6d3d1")}
//           {R(14, 110, 38, 2.5, c)}
//           {...lines(14, 117, [183, 118], "#d6d3d1")}
//           {R(14, 142, 192, 0.5, "#d6d3d1", 0)}
//         </svg>
//       );

//     /* ── 21. IVORY — amber border, warm bg ── */
//     case "ivory":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#fefce8", 0)}
//           {R(13, 13, 5, 130, c, 2.5)}
//           {R(23, 13, 90, 10, "#1c1917", 2)}
//           {R(23, 27, 56, 3.5, "#78350f", 1.5)}
//           {R(23, 36, 188, 0.8, "#fde68a", 0)}
//           {[42, 48, 54].map((y, i) => (
//             <rect
//               key={y}
//               x={23}
//               y={y}
//               width={[62, 54, 74][i]}
//               height={2}
//               rx={1}
//               fill="#92400e"
//             />
//           ))}
//           {R(23, 64, 32, 2.5, ml)}
//           {...lines(23, 71, [178, 148], "#e7e5e4")}
//           {R(23, 86, 44, 3, c)}
//           {...lines(23, 93, [178, 162, 170], "#e7e5e4")}
//           {R(23, 113, 44, 3, c)}
//           {...lines(23, 120, [178, 114], "#e7e5e4")}
//           {R(23, 139, 28, 2, ml)}
//           {R(23, 146, 52, 3, "#1c1917")}
//         </svg>
//       );

//     /* ── 22. PAPER — old paper with ruled margin ── */
//     case "paper":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#fffef0", 0)}
//           {R(14, 14, 4, 127, "#e5e0c8", 2)}
//           {R(38, 0, 1, H, "#e5dcc8", 0)}
//           {R(46, 14, 88, 9, "#1a1209", 2)}
//           {R(46, 27, 54, 3.5, "#4a4a4a", 1.5)}
//           {R(14, 42, 192, 0.5, "#d0ccb0", 0)}
//           {[48, 54, 60].map((y, i) => (
//             <rect
//               key={y}
//               x={46}
//               y={y}
//               width={[62, 52, 72][i]}
//               height={2}
//               rx={1}
//               fill="#8a8070"
//             />
//           ))}
//           {R(46, 76, 42, 3, c)}
//           {...lines(46, 83, [168, 148, 156], "#d0ccb0")}
//           {R(46, 104, 42, 3, c)}
//           {...lines(46, 111, [168, 108], "#d0ccb0")}
//           {R(46, 140, 32, 2, "#9a9080", 1)}
//         </svg>
//       );

//     /* ── 23. SERIF — newspaper double rule centered ── */
//     case "serif":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, bg, 0)}
//           {R(13, 13, 192, 0.8, "#1e293b", 0)}
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
//             fontSize={5.5}
//             fill={sl}
//             fontFamily="Georgia,serif"
//           >
//             Senior Product Designer
//           </text>
//           {R(13, 45, 192, 0.8, "#1e293b", 0)}
//           {[14, 80, 150].map((x, i) => (
//             <rect
//               key={x}
//               x={x}
//               y={51}
//               width={[60, 64, 52][i]}
//               height={2}
//               rx={1}
//               fill={c}
//             />
//           ))}
//           {R(13, 59, 192, 0.5, li, 0)}
//           {R(13, 65, 32, 2.5, ml)}
//           {...lines(13, 72, [188, 158])}
//           {R(13, 87, 42, 3, c)}
//           {...lines(13, 94, [188, 170, 176])}
//           {R(13, 114, 42, 3, c)}
//           {...lines(13, 121, [188, 122])}
//           {R(13, 149, 192, 0.8, li, 0)}
//         </svg>
//       );

//     /* ── 24. EDITORIAL — news masthead style ── */
//     case "editorial":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, bg, 0)}
//           {R(0, 0, W, 4, c, 0)}
//           {R(14, 11, 110, 11, "#1e293b", 2)}
//           {R(14, 26, 62, 3.5, c, 1.5)}
//           {R(14, 35, 188, 1.5, "#334155", 0)}
//           {[40, 46, 52].map((y, i) => (
//             <rect
//               key={y}
//               x={14}
//               y={y}
//               width={[62, 52, 72][i]}
//               height={2.5}
//               rx={1}
//               fill={ml}
//             />
//           ))}
//           {R(155, 38, 52, 22, `${c}1a`, 2)}
//           {[42, 48, 54, 60].map((y, i) => (
//             <rect
//               key={y}
//               x={158}
//               y={y}
//               width={[38, 28, 44, 22][i]}
//               height={1.5}
//               rx={0.5}
//               fill="#94a3b8"
//             />
//           ))}
//           {R(14, 62, 188, 1.5, "#e2e8f0", 0)}
//           {R(14, 72, 44, 3, c)}
//           {...lines(14, 79, [185, 165, 175])}
//           {R(14, 100, 44, 3, c)}
//           {...lines(14, 107, [185, 118])}
//           {R(0, 150, W, 4, c, 0)}
//         </svg>
//       );

//     /* ── 25. DESIGNER — dark sidebar with glow ── */
//     case "designer":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <defs>
//             <linearGradient id="dsg" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stopColor="#0d0d0d" />
//               <stop offset="100%" stopColor="#1a0a2e" />
//             </linearGradient>
//           </defs>
//           {R(0, 0, W, H, "#faf5ff", 0)}
//           {R(0, 0, 70, H, "url(#dsg)", 0)}
//           <circle
//             cx={35}
//             cy={70}
//             r={25}
//             fill={ca}
//             stroke={cb}
//             strokeWidth="1"
//           />
//           <text x={35} y={74} textAnchor="middle" fontSize={14} fill={`${c}cc`}>
//             ✦
//           </text>
//           {R(8, 13, 52, 8, "white", 1.5)}
//           {R(8, 25, 36, 2.5, `${c}b0`)}
//           {R(80, 13, 77, 9, "#111827", 1.5)}
//           {R(80, 26, 50, 2.5, "#6b7280")}
//           {R(80, 75, 50, 3, c)}
//           {...lines(80, 82, [130, 118, 124])}
//           {R(80, 107, 50, 3, c)}
//           {...lines(80, 114, [130, 90])}
//         </svg>
//       );

//     /* ── 26. MOTION — gradient bar top/bottom ── */
//     case "motion":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <defs>
//             <linearGradient id="mt" x1="0" y1="0" x2="1" y2="0">
//               <stop offset="0%" stopColor={c} />
//               <stop offset="100%" stopColor="#f59e0b" />
//             </linearGradient>
//           </defs>
//           {R(0, 0, W, H, bg, 0)}
//           {R(0, 0, W, 5.5, "url(#mt)", 0)}
//           {R(13, 14, 94, 11, "#111827", 1.5)}
//           {R(13, 29, 62, 3.5, c)}
//           {R(13, 38, 188, 0.6, "#fce7f3", 0)}
//           {[44, 50, 56].map((y, i) => (
//             <rect
//               key={y}
//               x={13}
//               y={y}
//               width={[57, 50, 66][i]}
//               height={4}
//               rx={10}
//               fill={ca}
//               stroke={cb}
//               strokeWidth=".7"
//             />
//           ))}
//           {R(13, 67, 32, 2.5, ml)}
//           {...lines(13, 74, [185, 155])}
//           {R(13, 89, 44, 3, c)}
//           {...lines(13, 96, [185, 168, 175])}
//           {R(13, 116, 44, 3, c)}
//           {...lines(13, 123, [185, 118])}
//           {R(0, 151, W, 4, "url(#mt)", 0)}
//         </svg>
//       );

//     /* ── 27. PIXEL — dark grid aesthetic ── */
//     case "pixel":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#1a0533", 0)}
//           {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
//             <rect
//               key={i}
//               x={0}
//               y={i * 22}
//               width={W}
//               height={1}
//               fill="rgba(255,255,255,.04)"
//             />
//           ))}
//           {R(14, 14, 88, 9, "white", 1.5)}
//           {R(14, 27, 55, 4, c, 1.5)}
//           {[34, 40, 46].map((y, i) => (
//             <rect
//               key={y}
//               x={14}
//               y={y}
//               width={[55, 45, 65][i]}
//               height={5}
//               rx={0}
//               fill={ca}
//               stroke={cb}
//               strokeWidth=".8"
//             />
//           ))}
//           {R(14, 58, 188, 0.8, `${c}25`, 0)}
//           {R(14, 68, 42, 2.5, c)}
//           {...lines(14, 75, [185, 168, 177], "rgba(148,163,184,.28)")}
//           {R(14, 98, 42, 2.5, c)}
//           {...lines(14, 105, [185, 118], "rgba(148,163,184,.28)")}
//           {R(14, 148, 55, 3, "white")}
//         </svg>
//       );

//     /* ── 28. BRUSHSTROKE — organic paint stroke header ── */
//     case "brushstroke":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#fefefe", 0)}
//           <path d="M0,44 Q55,34 110,44 Q165,54 220,44 L220,0 L0,0Z" fill={c} />
//           <path
//             d="M0,50 Q55,40 110,50 Q165,60 220,50 L220,44 Q165,54 110,44 Q55,34 0,44Z"
//             fill={c}
//             opacity=".3"
//           />
//           {R(14, 11, 85, 9, "rgba(255,255,255,.92)", 2)}
//           {R(14, 24, 52, 4, "rgba(255,255,255,.65)", 1.5)}
//           {R(14, 62, 38, 2.5, ml)}
//           {...lines(14, 69, [185, 160])}
//           {R(14, 84, 44, 3, c)}
//           {...lines(14, 91, [185, 168, 175])}
//           {R(14, 112, 44, 3, c)}
//           {...lines(14, 119, [185, 118])}
//           {R(14, 143, 32, 2, ml)}
//         </svg>
//       );

//     /* ── 29. STUDIO — dark cinema style ── */
//     case "studio":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#111827", 0)}
//           <circle cx={200} cy={0} r={80} fill={`${c}18`} />
//           {R(14, 12, 88, 10, "white", 2)}
//           {R(14, 26, 54, 4, c, 1.5)}
//           {[34, 40, 46].map((y, i) => (
//             <rect
//               key={y}
//               x={14}
//               y={y}
//               width={[50, 44, 60][i]}
//               height={4}
//               rx={8}
//               fill={ca}
//               stroke={cb}
//               strokeWidth=".7"
//             />
//           ))}
//           {R(14, 60, 188, 0.6, `${c}25`, 0)}
//           {R(14, 70, 42, 2.5, c)}
//           {...lines(14, 77, [185, 165, 175], "rgba(148,163,184,.28)")}
//           {R(14, 100, 42, 2.5, c)}
//           {...lines(14, 107, [185, 118], "rgba(148,163,184,.28)")}
//           {R(14, 148, 55, 3, "white")}
//         </svg>
//       );

//     /* ── 30. FOLIO — portfolio style with image box ── */
//     case "folio":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, bg, 0)}
//           {R(0, 0, W, H, `${c}08`, 0)}
//           {R(14, 14, 55, 55, `${c}22`, 8)}
//           <text x={41} y={47} textAnchor="middle" fontSize={20} fill={c}>
//             ✦
//           </text>
//           {R(76, 14, 130, 10, "#111827", 2)}
//           {R(76, 28, 80, 4, "#374151", 1.5)}
//           {R(76, 36, 110, 2.5, ml)}
//           {[41, 47].map((y, i) => (
//             <rect
//               key={y}
//               x={76}
//               y={y}
//               width={[90, 70][i]}
//               height={2}
//               rx={1}
//               fill={ml}
//             />
//           ))}
//           {R(14, 76, 192, 1.2, li, 0)}
//           {R(14, 84, 38, 2.5, c)}
//           {...lines(14, 91, [185, 165, 175])}
//           {R(14, 112, 38, 2.5, c)}
//           {...lines(14, 119, [185, 118])}
//           {R(14, 143, 32, 2, ml)}
//           {R(14, 149, 55, 3, sl)}
//         </svg>
//       );

//     /* ── 31. ARTBOARD — design tool frame look ── */
//     case "artboard":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#f4f3f8", 0)}
//           {R(12, 12, 196, 131, bg, 6)}
//           <rect
//             x={12}
//             y={12}
//             width={196}
//             height={131}
//             rx={6}
//             fill="none"
//             stroke={`${c}40`}
//             strokeWidth={1.5}
//             strokeDasharray="4,3"
//           />
//           {R(12, 12, 196, 3, c, 0)}
//           {R(14, 20, 88, 8, "#111827", 1.5)}
//           {R(14, 32, 54, 3.5, c, 1.5)}
//           {[39, 45, 51].map((y, i) => (
//             <rect
//               key={y}
//               x={14}
//               y={y}
//               width={[55, 44, 62][i]}
//               height={2.5}
//               rx={1}
//               fill={ml}
//             />
//           ))}
//           {R(14, 62, 192, 0.7, li, 0)}
//           {R(14, 72, 38, 2.5, c)}
//           {...lines(14, 79, [182, 162, 170])}
//           {R(14, 100, 38, 2.5, c)}
//           {...lines(14, 107, [182, 115])}
//           {R(14, 132, 30, 2, ml)}
//           {R(14, 138, 52, 3, sl)}
//         </svg>
//       );

//     /* ── 32. VORTEX — diagonal split ── */
//     case "vortex":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, bg, 0)}
//           <polygon points="0,0 220,0 220,55 0,75" fill={c} />
//           <polygon points="0,0 110,0 0,55" fill="rgba(255,255,255,.12)" />
//           {R(14, 11, 82, 8, "rgba(255,255,255,.9)", 2)}
//           {R(14, 23, 50, 4, "rgba(255,255,255,.62)", 1.5)}
//           {[14, 56, 104].map((x, i) => (
//             <rect
//               key={x}
//               x={x}
//               y={35}
//               width={36}
//               height={3.5}
//               rx={8}
//               fill="rgba(255,255,255,.2)"
//             />
//           ))}
//           {R(14, 84, 38, 2.5, ml)}
//           {...lines(14, 91, [182, 162])}
//           {R(14, 106, 44, 3, c)}
//           {...lines(14, 113, [183, 165, 173])}
//           {R(14, 134, 44, 3, c)}
//           {...lines(14, 141, [183, 118])}
//         </svg>
//       );

//     /* ── 33. VELVET — dark luxury ── */
//     case "velvet":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <defs>
//             <linearGradient id="vlv" x1="0" y1="0" x2="1" y2="1">
//               <stop offset="0%" stopColor="#1e0f40" />
//               <stop offset="100%" stopColor="#2d1b69" />
//             </linearGradient>
//           </defs>
//           {R(0, 0, W, H, "url(#vlv)", 0)}
//           <circle cx={192} cy={16} r={62} fill={`${c}18`} />
//           {R(13, 14, 82, 9, "#f3e8ff", 1.5)}
//           {R(13, 27, 52, 2.5, "#a78bfa")}
//           {[44, 51, 58, 65, 72].map((y, i) => (
//             <rect
//               key={y}
//               x={13}
//               y={y}
//               width={[50, 45, 55, 60, 48][i]}
//               height={4}
//               rx={2}
//               fill={ca}
//               stroke={cb}
//               strokeWidth=".6"
//             />
//           ))}
//           {R(13, 80, 38, 2.5, c)}
//           {...lines(13, 87, [185, 168, 158], "rgba(212,201,239,.4)")}
//           {R(13, 107, 38, 2.5, c)}
//           {...lines(13, 114, [185, 122], "rgba(212,201,239,.4)")}
//           {R(13, 142, 52, 3, "#f3e8ff")}
//         </svg>
//       );

//     /* ── 34. CARBON — dark with left neon stripe ── */
//     case "carbon":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#18181b", 0)}
//           {R(0, 0, 5, H, c, 0)}
//           {R(17, 15, 90, 9, "white", 1.5)}
//           {R(17, 28, 55, 3.5, c)}
//           {R(17, 38, 188, 0.6, ca, 0)}
//           {[44, 50, 56].map((y, i) => (
//             <rect
//               key={y}
//               x={17}
//               y={y}
//               width={[60, 50, 70][i]}
//               height={3}
//               rx={10}
//               fill={ca}
//               stroke={cb}
//               strokeWidth=".7"
//             />
//           ))}
//           {R(17, 70, 38, 2.5, c)}
//           {...lines(17, 77, [182, 165, 174], "rgba(148,163,184,.3)")}
//           {R(17, 100, 38, 2.5, c)}
//           {...lines(17, 107, [182, 118], "rgba(148,163,184,.3)")}
//           {R(17, 142, 52, 3, "white")}
//         </svg>
//       );

//     /* ── 35. PLASMA — deep space gradient ── */
//     case "plasma":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <defs>
//             <linearGradient id="plg" x1="0" y1="0" x2="1" y2="1">
//               <stop offset="0%" stopColor="#0f172a" />
//               <stop offset="100%" stopColor="#1e1b4b" />
//             </linearGradient>
//           </defs>
//           {R(0, 0, W, H, "url(#plg)", 0)}
//           {R(0, 0, W, 5, c, 0)}
//           {R(13, 18, 90, 10, "white", 1.5)}
//           {R(13, 32, 55, 3.5, c)}
//           {R(13, 42, 188, 0.6, ca, 0)}
//           {[48, 54, 60, 66].map((y, i) => (
//             <rect
//               key={y}
//               x={13}
//               y={y}
//               width={[60, 50, 72, 45][i]}
//               height={4}
//               rx={10}
//               fill={ca}
//               stroke={cb}
//               strokeWidth=".7"
//             />
//           ))}
//           {R(13, 80, 38, 2.5, c)}
//           {...lines(13, 87, [185, 165, 175], "rgba(148,163,184,.28)")}
//           {R(13, 110, 38, 2.5, c)}
//           {...lines(13, 117, [185, 122], "rgba(148,163,184,.28)")}
//           {R(0, 150, W, 5, c, 0)}
//         </svg>
//       );

//     /* ── 36. NEON — glitch / cyberpunk ── */
//     case "neon":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#070c1a", 0)}
//           {R(0, 0, W, 2, c, 0)}
//           {R(13, 16, 92, 10, "white", 1.5)}
//           {R(13, 30, 55, 3.5, c)}
//           {R(13, 40, 188, 0.6, ca, 0)}
//           {[46, 52, 58].map((y, i) => (
//             <rect
//               key={y}
//               x={13}
//               y={y}
//               width={[60, 50, 72][i]}
//               height={3.5}
//               rx={6}
//               fill={ca}
//               stroke={cb}
//               strokeWidth=".8"
//             />
//           ))}
//           {R(13, 70, 188, 0.6, ca, 0)}
//           {R(13, 80, 42, 2.5, c)}
//           {...lines(13, 87, [182, 165, 172], "rgba(148,163,184,.25)")}
//           {R(13, 110, 42, 2.5, c)}
//           {...lines(13, 117, [182, 118], "rgba(148,163,184,.25)")}
//           {R(13, 148, 55, 3, "white")}
//           {R(0, 153, W, 2, c, 0)}
//         </svg>
//       );

//     /* ── 37. EDITOR/DIRECTOR — cinema neon red ── */
//     case "editor":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#0f0a1e", 0)}
//           {R(13, 13, 94, 10, "white", 1.5)}
//           {R(13, 27, 57, 3, c)}
//           {R(13, 35, 188, 0.8, ca, 0)}
//           {[41, 47, 53].map((y, i) => (
//             <rect
//               key={y}
//               x={13}
//               y={y}
//               width={[62, 56, 72][i]}
//               height={4}
//               rx={2}
//               fill={ca}
//               stroke={cb}
//               strokeWidth=".6"
//             />
//           ))}
//           {R(13, 87, 2, 2.5, c, 0.5)}
//           {R(19, 87, 38, 2.5, c)}
//           {...lines(13, 94, [185, 168, 156], `rgba(148,163,184,.28)`)}
//           {R(13, 114, 2, 2.5, c, 0.5)}
//           {R(19, 114, 38, 2.5, c)}
//           {...lines(13, 121, [185, 122], "rgba(148,163,184,.28)")}
//           {R(13, 147, 52, 3, "white")}
//         </svg>
//       );

//     /* ── 38. HACKR — terminal style ── */
//     case "hackr":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#0a0f0d", 0)}
//           {R(0, 0, 3, H, c, 0)}
//           {R(12, 14, 91, 9, "white", 1.5)}
//           {R(12, 27, 55, 3.5, c, 1)}
//           {[35, 41, 47].map((y, i) => (
//             <rect
//               key={y}
//               x={12}
//               y={y}
//               width={[60, 50, 72][i]}
//               height={3}
//               rx={6}
//               fill={ca}
//               stroke={cb}
//               strokeWidth=".7"
//             />
//           ))}
//           {R(12, 58, 188, 0.5, ca, 0)}
//           {R(12, 68, 42, 2.5, c)}
//           {...lines(12, 75, [182, 162, 172], "rgba(148,163,184,.28)")}
//           {R(12, 98, 42, 2.5, c)}
//           {...lines(12, 105, [182, 118], "rgba(148,163,184,.28)")}
//           <text
//             x={12}
//             y={148}
//             fontSize={7}
//             fill={`${c}80`}
//             fontFamily="monospace"
//           >
//             $ cover_letter --generate
//           </text>
//         </svg>
//       );

//     /* ── 39. TECHWAVE — circuit board horizontal lines ── */
//     case "techwave":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#030712", 0)}
//           {R(0, 0, W, 5, c, 0)}
//           {R(0, 5, W, 48, "#0c1120", 0)}
//           {R(14, 12, 85, 9, "white", 2)}
//           {R(14, 25, 52, 4, c, 1.5)}
//           {R(14, 36, 188, 0.5, ca, 0)}
//           {[0, 64, 130].map((ox) => (
//             <rect
//               key={ox}
//               x={14 + ox}
//               y={41}
//               width={58}
//               height={2}
//               rx={1}
//               fill={`${c}66`}
//             />
//           ))}
//           {R(14, 52, 188, 1, ca, 0)}
//           {R(14, 62, 42, 2.5, c)}
//           {...lines(14, 69, [182, 162, 172], "rgba(148,163,184,.25)")}
//           {R(14, 92, 42, 2.5, c)}
//           {...lines(14, 99, [182, 118], "rgba(148,163,184,.25)")}
//           {R(14, 142, 52, 3, "white")}
//         </svg>
//       );

//     /* ── 40. BLAZE — fire gradient header ── */
//     case "blaze":
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           <defs>
//             <linearGradient id="blz" x1="0" y1="0" x2="1" y2="0">
//               <stop offset="0%" stopColor={c} />
//               <stop offset="100%" stopColor="#ea580c" />
//             </linearGradient>
//           </defs>
//           {R(0, 0, W, H, bg, 0)}
//           {R(0, 0, W, 52, "url(#blz)", 0)}
//           <polygon points="140,0 220,0 220,52" fill="rgba(255,255,255,.14)" />
//           {R(13, 11, 90, 9, "rgba(255,255,255,.92)", 2)}
//           {R(13, 24, 55, 4, "rgba(255,255,255,.6)", 1.5)}
//           {[0, 42, 84].map((ox) => (
//             <rect
//               key={ox}
//               x={13 + ox}
//               y={35}
//               width={36}
//               height={4}
//               rx={8}
//               fill="rgba(255,255,255,.18)"
//               stroke="rgba(255,255,255,.28)"
//               strokeWidth=".6"
//             />
//           ))}
//           {R(13, 62, 38, 2.5, ml)}
//           {...lines(13, 69, [175, 148])}
//           {R(13, 82, 44, 3, c)}
//           {...lines(13, 89, [182, 162, 173])}
//           {R(13, 110, 44, 3, c)}
//           {...lines(13, 117, [182, 118])}
//           {R(13, 141, 32, 2, ml)}
//           {R(13, 147, 55, 3, sl)}
//         </svg>
//       );

//     default:
//       return (
//         <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//           {R(0, 0, W, H, "#f3f4f6", 0)}
//           {R(14, 14, 88, 9, "#374151", 1.5)}
//           {R(14, 27, 55, 3, c)}
//           {R(14, 80, 44, 3, c)}
//           {...lines(14, 87, [185, 165, 175])}
//           {R(14, 108, 44, 3, c)}
//           {...lines(14, 115, [185, 118])}
//         </svg>
//       );
//   }
// }

// /* ─────────────────────────────────────────────────────────────
//    HTML BUILDER — injects font-family and accent color
// ───────────────────────────────────────────────────────────────*/
// function buildHTML(id: string, d: CLData): string {
//   const fontDef =
//     FONT_FAMILIES.find((f) => f.id === d.fontFamily) || FONT_FAMILIES[0];
//   const fontStack = `'${d.fontFamily}',${fontDef.style}`;
//   const c = d.accentColor || "#6366f1";
//   const sig = d.personal.signature || "Sincerely";
//   const nm = d.personal.fullName || "Your Name";
//   const ttl = d.personal.title || "Professional";
//   const mgr = d.company.hiringManager || "Hiring Manager";
//   const loc = [d.company.city, d.company.state].filter(Boolean).join(", ");
//   const dt = d.letterDate
//     ? new Date(d.letterDate + "T12:00:00").toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       })
//     : new Date().toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });

//   const links: string[] = [
//     d.personal.email
//       ? `<a href="mailto:${d.personal.email}"    style="color:inherit;text-decoration:none">${d.personal.email}</a>`
//       : "",
//     d.personal.phone
//       ? `<a href="tel:${d.personal.phone}"        style="color:inherit;text-decoration:none">${d.personal.phone}</a>`
//       : "",
//     d.personal.location ? `<span>${d.personal.location}</span>` : "",
//     d.personal.linkedin
//       ? `<a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank" style="color:inherit;text-decoration:none">${d.personal.linkedin}</a>`
//       : "",
//     d.personal.github
//       ? `<a href="https://${d.personal.github.replace(/^https?:\/\//, "")}"   target="_blank" style="color:inherit;text-decoration:none">${d.personal.github}</a>`
//       : "",
//     d.personal.website
//       ? `<a href="https://${d.personal.website.replace(/^https?:\/\//, "")}"  target="_blank" style="color:inherit;text-decoration:none">${d.personal.website}</a>`
//       : "",
//   ].filter(Boolean);

//   const secRows = (border = false) =>
//     d.sections
//       .filter((s) => s.content.trim())
//       .map(
//         (s) => `
//       <div style="margin-bottom:24px${border ? `;padding-left:14px;border-left:3px solid ${c}` : ""}">
//         <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${c};margin:0 0 8px">${s.title}</h4>
//         <p style="line-height:1.85;margin:0;font-size:13.5px">${s.content.replace(/\n/g, "<br>")}</p>
//       </div>`,
//       )
//       .join("");

//   const achBlock = () =>
//     !d.achievements.length
//       ? ""
//       : `
//     <div style="margin:18px 0 22px">
//       <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${c};margin:0 0 10px">Key Achievements</h4>
//       ${d.achievements.map((a) => `<div style="display:flex;gap:9px;margin-bottom:7px;font-size:13px"><span style="color:${c};flex-shrink:0;line-height:1.5">›</span>${a}</div>`).join("")}
//     </div>`;

//   const skillBlock = () =>
//     !d.skills.length
//       ? ""
//       : `
//     <div style="margin:16px 0 22px">
//       <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${c};margin:0 0 10px">Core Skills</h4>
//       <div style="display:flex;flex-wrap:wrap;gap:7px">${d.skills.map((s) => `<span style="padding:4px 12px;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.08);border-radius:30px;font-size:12px">${s}</span>`).join("")}</div>
//     </div>`;

//   const notesBlock = d.notes
//     ? `<div style="margin:14px 0;padding:12px 16px;background:rgba(0,0,0,.03);border-left:3px solid #e2e8f0;font-size:12.5px;line-height:1.7;color:#64748b">${d.notes}</div>`
//     : "";
//   const summaryBlock = d.personal.summary
//     ? `<div style="margin-bottom:20px;padding:14px 16px;background:rgba(0,0,0,.03);border-radius:8px;font-size:13px;line-height:1.75;color:#4a5568;font-style:italic">"${d.personal.summary}"</div>`
//     : "";
//   const referralNote = d.company.referral
//     ? `<div style="margin-bottom:14px;font-size:13px;color:#6b7280">Referred by: <strong style="color:#374151">${d.company.referral}</strong></div>`
//     : "";

//   const addrBlock = `<div style="margin-bottom:20px;font-size:13px;line-height:1.9;color:#4a5568"><strong style="color:#1a202c">${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>${d.company.name}${loc ? `<br>${loc}` : ""}</div>`;
//   const greet = (col = "#111827") =>
//     `<div style="font-size:16px;font-weight:600;margin-bottom:22px;color:${col}">Dear ${mgr},</div>`;

//   const closingDiv = (col = c, txtCol = "inherit") => `
//     <div style="margin-top:36px;font-size:13.5px;color:${txtCol}">
//       ${sig},<br><br>
//       <strong style="font-size:15px">${nm}</strong>
//       ${d.personal.email ? `<br><a href="mailto:${d.personal.email}" style="font-size:12px;color:${col};text-decoration:none">${d.personal.email}</a>` : ""}
//       ${d.personal.phone ? `<br><span style="font-size:12px;color:#64748b">${d.personal.phone}</span>` : ""}
//       ${d.personal.linkedin ? `<br><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" style="font-size:11.5px;color:${col};text-decoration:none" target="_blank">${d.personal.linkedin}</a>` : ""}
//       ${d.personal.github ? `<br><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}"   style="font-size:11.5px;color:#64748b;text-decoration:none" target="_blank">${d.personal.github}</a>` : ""}
//       ${d.personal.website ? `<br><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}"  style="font-size:11.5px;color:${col};text-decoration:none" target="_blank">${d.personal.website}</a>` : ""}
//     </div>`;

//   const baseCSS = (extra = "") =>
//     `@import url('${fontDef.url}');
//     *{margin:0;padding:0;box-sizing:border-box}
//     html,body{background:#ffffff}
//     body{font-family:${fontStack};color:#374151;background:#ffffff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
//     ${extra}`;

//   const baseHTML = (css: string, body: string) =>
//     `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${css}</style></head><body>${body}</body></html>`;

//   const sidebarContacts = (col = "#c4b5fd") => `
//     ${d.personal.email ? `<div class="slbl">Email</div><div class="sv"><a href="mailto:${d.personal.email}" style="color:${col};text-decoration:none">${d.personal.email}</a></div>` : ""}
//     ${d.personal.phone ? `<div class="slbl">Phone</div><div class="sv"><a href="tel:${d.personal.phone}" style="color:${col};text-decoration:none">${d.personal.phone}</a></div>` : ""}
//     ${d.personal.location ? `<div class="slbl">Location</div><div class="sv">${d.personal.location}</div>` : ""}
//     ${d.personal.linkedin ? `<div class="slbl">LinkedIn</div><div class="sv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank" style="color:${col};text-decoration:none">${d.personal.linkedin}</a></div>` : ""}
//     ${d.personal.github ? `<div class="slbl">GitHub</div><div class="sv"><a href="https://${d.personal.github.replace(/^https?:\/\//, "")}"   target="_blank" style="color:${col};text-decoration:none">${d.personal.github}</a></div>` : ""}
//     ${d.personal.website ? `<div class="slbl">Portfolio</div><div class="sv"><a href="https://${d.personal.website.replace(/^https?:\/\//, "")}"  target="_blank" style="color:${col};text-decoration:none">${d.personal.website}</a></div>` : ""}`;

//   // Full body sections reused
//   const standardBody = (accent: string, border = false) =>
//     `<div class="dt">${dt}</div>${addrBlock}${referralNote}${greet()}${summaryBlock}${secRows(border)}${achBlock()}${skillBlock()}${notesBlock}${closingDiv(accent)}`;

//   /* ── Shared styles for common patterns ── */
//   const headerChipStyle = `
//     .pg{max-width:860px;margin:0 auto;background:#fff}
//     .hdr{padding:52px 56px 44px;color:white;position:relative;overflow:hidden}
//     .nm{font-size:38px;font-weight:700;letter-spacing:-1.5px;margin-bottom:5px;position:relative}
//     .rl{font-size:14px;opacity:.85;margin-bottom:26px;position:relative}
//     .chips{display:flex;flex-wrap:wrap;gap:7px;position:relative}
//     .chip{padding:5px 14px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.32);border-radius:40px;font-size:11.5px;color:white}
//     .chip a{color:white;text-decoration:none}
//     .body{padding:48px 56px;background:#fff}
//     .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`;

//   const chipsHTML = `<div class="chips">${links.map((l) => `<span class="chip">${l}</span>`).join("")}</div>`;

//   /* ─────── TEMPLATE SWITCH ─────── */

//   if (
//     [
//       "aurora",
//       "emerald",
//       "executive",
//       "nova",
//       "tidal",
//       "vivid",
//       "frost",
//       "coral",
//       "midnight",
//       "prism",
//       "blaze",
//       "brushstroke",
//       "vortex",
//     ].includes(id) ||
//     id === "aurora"
//   ) {
//     // Most header-style templates share the chip pattern — each just has a different header bg

//     const headerBg: Record<string, string> = {
//       aurora: `background:linear-gradient(135deg,${c} 0%,${c}bb 60%,${c}88 100%)`,
//       emerald: `background:linear-gradient(135deg,#065f46 0%,#059669 100%)`,
//       vivid: `background:linear-gradient(135deg,${c},#ec4899)`,
//       frost: `background:linear-gradient(135deg,rgba(12,74,110,.92),rgba(2,132,199,.9))`,
//       prism: `background:${c}`,
//       blaze: `background:linear-gradient(110deg,${c},#ea580c)`,
//       brushstroke: `background:${c}`,
//       aurora2: `background:${c}`,
//       tidal: `background:${c}`,
//     };

//     if (id === "frost") {
//       return baseHTML(
//         baseCSS(`
//         body{background:#e0f2fe;padding:20px}
//         .pg{max-width:840px;margin:0 auto;background:rgba(255,255,255,.9);border-radius:16px;overflow:hidden}
//         .hdr{${headerBg.frost || `background:${c}`};padding:48px;color:white}
//         .nm{font-size:38px;font-weight:800;letter-spacing:-2px;margin-bottom:6px}
//         .rl{font-size:12.5px;opacity:.8;letter-spacing:1px;margin-bottom:22px}
//         .chips{display:flex;flex-wrap:wrap;gap:7px}
//         .chip{padding:5px 14px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.22);border-radius:40px;font-size:11.5px;color:white}
//         .chip a{color:white;text-decoration:none}
//         .body{padding:44px;background:#fff}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`),
//         `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div>${chipsHTML}</div>
//         <div class="body">${standardBody(c)}</div></div>`,
//       );
//     }

//     const hBg =
//       headerBg[id] || `background:linear-gradient(135deg,${c},${c}bb)`;
//     return baseHTML(
//       baseCSS(headerChipStyle),
//       `<div class="pg"><div class="hdr" style="${hBg}">
//         ${id === "prism" ? `<div style="position:absolute;right:0;top:0;bottom:0;width:55%;background:rgba(255,255,255,.1);clip-path:polygon(25% 0,100% 0,100% 100%,0 100%)"></div>` : ""}
//         <div class="nm">${nm}</div><div class="rl">${ttl}</div>${chipsHTML}</div>
//         <div class="body">${standardBody(c)}</div></div>`,
//     );
//   }

//   if (id === "canvas")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:820px;margin:0 auto;padding:60px 64px;background:#fff}
//     .accent{width:4px;background:${c};border-radius:2px;height:72px;float:left;margin-right:20px;margin-top:2px}
//     .nm{font-size:38px;font-weight:800;letter-spacing:-1.5px;color:#111827}
//     .rl{font-size:13px;color:${c};font-weight:600;margin-top:5px;letter-spacing:.5px}
//     .ctrow{display:flex;flex-wrap:wrap;gap:5px 16px;margin-top:10px}
//     .cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}
//     .div{height:1px;background:#f3f4f6;margin:28px 0;clear:both}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`),
//       `<div class="pg"><div class="accent"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div>
//     <div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div>
//     <div class="div"></div>${standardBody(c)}</div>`,
//     );

//   if (id === "gradient")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:820px;margin:0 auto;padding:60px 64px;background:#fff;border-left:6px solid ${c}}
//     .nm{font-size:38px;font-weight:800;letter-spacing:-1.5px;color:#111827}
//     .rl{font-size:13px;color:${c};font-weight:600;margin-top:5px;letter-spacing:.5px}
//     .ctrow{display:flex;flex-wrap:wrap;gap:5px 16px;margin-top:10px;margin-bottom:28px}
//     .cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}
//     .div{height:1px;background:#f3f4f6;margin:20px 0}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`),
//       `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
//     <div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div>
//     <div class="div"></div>${standardBody(c)}</div>`,
//     );

//   if (id === "obsidian")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:900px;margin:0 auto;display:flex;min-height:100vh;background:#f8f7ff}
//     .side{width:260px;background:#1e1b4b;color:white;padding:44px 26px;flex-shrink:0}
//     .snm{font-size:26px;font-weight:700;color:#e9d5ff;line-height:1.2;margin-bottom:6px}
//     .srl{font-size:10px;color:#a5b4fc;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:28px;padding-bottom:24px;border-bottom:1px solid rgba(165,180,252,.2)}
//     .slbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#6d5bba;margin-bottom:5px;margin-top:18px}
//     .sv{font-size:11.5px;color:#c4b5fd;line-height:1.9;word-break:break-all}
//     .sv a{color:#c4b5fd;text-decoration:none}
//     .main{flex:1;padding:48px 44px;background:#fff}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//     ${d.skills.length ? ".skills-list div{font-size:11px;color:#c4b5fd;margin-bottom:3px}" : ""}`),
//       `<div class="pg"><div class="side"><div class="snm">${nm}</div><div class="srl">${ttl}</div>
//     ${sidebarContacts()}
//     ${d.skills.length ? `<div class="slbl" style="margin-top:24px">Skills</div><div class="skills-list">${d.skills.map((s) => `<div>• ${s}</div>`).join("")}</div>` : ""}
//     <div style="color:${c};opacity:.45;font-size:18px;margin-top:22px;letter-spacing:4px">✦ ✦ ✦</div>
//     </div>
//     <div class="main">${standardBody(c)}</div></div>`,
//     );

//   if (id === "slate")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:880px;margin:0 auto;background:#fff}
//     .hdr{padding:44px 52px;border-bottom:3px solid #0f172a;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}
//     .nm{font-size:34px;font-weight:700;color:#0f172a;letter-spacing:-1.5px}.rl{font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-top:7px}
//     .cc{text-align:right}.cv{font-size:11.5px;color:#475569;line-height:2.1;display:block;word-break:break-all}.cv a{color:${c};text-decoration:none}
//     .tag{display:inline-block;font-size:10.5px;color:#64748b;background:#f1f5f9;border:1px solid #e2e8f0;padding:3px 10px;border-radius:4px;margin-bottom:22px}
//     .body{padding:40px 52px;background:#fff}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:20px}`),
//       `<div class="pg"><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>
//     <div class="cc">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div>
//     <div class="body"><div class="tag">RE: ${d.company.jobTitle || "Open Position"} · ${d.company.name || "Company"}</div>
//     ${standardBody(c, true)}</div></div>`,
//     );

//   if (id === "architect")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:880px;margin:0 auto;background:#f8fafc}
//     .hdr{padding:44px 52px;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap}
//     .hl{flex:1}.nm{font-size:34px;font-weight:800;color:#0f172a;letter-spacing:-1.5px}
//     .rl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-top:7px;margin-bottom:14px}
//     .ctrow{display:flex;flex-wrap:wrap;gap:4px 14px}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}
//     .hr{width:130px;flex-shrink:0;background:#0f172a;border-radius:12px;padding:16px;text-align:center}
//     .hrl{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#94a3b8;margin-bottom:6px}
//     .hrr{font-size:11px;font-weight:700;color:white;line-height:1.4}.hrc{font-size:10px;color:#94a3b8;margin-top:4px}
//     .body{padding:36px 52px;background:#f8fafc}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`),
//       `<div class="pg"><div class="hdr"><div class="hl"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
//     <div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div>
//     ${d.company.name ? `<div class="hr"><div class="hrl">Applying to</div><div class="hrr">${d.company.jobTitle || "Open Role"}</div><div class="hrc">${d.company.name}</div></div>` : ""}
//     </div><div class="body">${standardBody(c, true)}</div></div>`,
//     );

//   if (id === "nordic")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:750px;margin:0 auto;padding:64px 72px;background:#fff}
//     .eye{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-bottom:10px}
//     .nm{font-size:44px;font-weight:700;letter-spacing:-2px;color:#1e1b4b;line-height:1.05}
//     .bar{width:52px;height:3px;background:${c};margin:16px 0 18px}
//     .ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:40px}
//     .cv{font-size:12px;color:#6b7280}.cv a{color:${c};text-decoration:none}
//     .div{height:1px;background:${c}44;margin:24px 0}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`),
//       `<div class="pg"><div class="eye">${ttl}</div><div class="nm">${nm}</div><div class="bar"></div>
//     <div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div>
//     <div class="div"></div>${standardBody(c)}</div>`,
//     );

//   if (id === "pearl")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:820px;margin:0 auto;padding:60px 64px;background:#fff}
//     .nm{font-size:40px;font-weight:800;letter-spacing:-2px;color:#111827;margin-bottom:6px}
//     .rl{font-size:13px;color:${c};font-weight:700;letter-spacing:.5px;margin-bottom:16px}
//     .d1{height:1.5px;background:${c}33;margin-bottom:16px}
//     .ctrow{display:flex;flex-wrap:wrap;gap:5px 20px;margin-bottom:16px}
//     .cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}
//     .d2{height:1.5px;background:${c}33;margin:20px 0}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`),
//       `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="d1"></div>
//     <div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div>
//     <div class="d2"></div>${standardBody(c)}</div>`,
//     );

//   if (id === "minimal")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:760px;margin:0 auto;padding:70px 80px;background:#fff;border:1px solid #f1f5f9}
//     .nm{font-size:36px;font-weight:700;color:#111;letter-spacing:-1px;margin-bottom:6px}
//     .rl{font-size:12.5px;color:#555;font-weight:400;margin-bottom:20px}
//     .div{height:1px;background:#ececec;margin:18px 0}
//     .ctrow{display:flex;flex-wrap:wrap;gap:4px 20px;margin-bottom:12px}
//     .cv{font-size:12px;color:#888}.cv a{color:${c};text-decoration:none;border-bottom:1px solid ${c}33}
//     .dt{font-size:12px;color:#aaa;margin-bottom:22px}`),
//       `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div"></div>
//     <div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div>
//     <div class="div"></div>${standardBody(c)}</div>`,
//     );

//   if (id === "zen")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:760px;margin:0 auto;padding:68px 76px;background:#fafaf9}
//     .nm{font-size:36px;font-weight:700;color:#1c1917;letter-spacing:-.5px;margin-bottom:6px}
//     .rl{font-size:13px;color:#78716c;margin-bottom:20px}
//     .div{height:.5px;background:#d6d3d1;margin:18px 0}
//     .ctrow{display:flex;flex-wrap:wrap;gap:4px 18px;margin-bottom:12px}
//     .cv{font-size:12px;color:#78716c}.cv a{color:${c};text-decoration:none}
//     .dt{font-size:12px;color:#a8a29e;margin-bottom:22px}`),
//       `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div"></div>
//     <div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div>
//     <div class="div"></div>${standardBody(c)}</div>`,
//     );

//   if (id === "ivory")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:820px;margin:0 auto;background:#fefce8;padding:60px 64px;border-left:5px solid ${c}}
//     .nm{font-size:44px;font-weight:700;color:#1c1917;letter-spacing:-.5px;line-height:1.1}
//     .rl{font-size:13px;color:#92400e;font-style:italic;margin:8px 0 16px}
//     .div{height:1px;background:${c}66;margin:16px 0}
//     .ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:14px}
//     .cv{font-size:12px;color:#78716c}.cv a{color:${c};text-decoration:none}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`),
//       `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div"></div>
//     <div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div>
//     <div class="div"></div>${standardBody(c)}</div>`,
//     );

//   if (id === "paper")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:820px;margin:0 auto;background:#fffef0;padding:60px 64px 60px 80px;border-left:3px solid #ca8a04}
//     .nm{font-size:42px;font-weight:700;color:#1a1209;letter-spacing:-.5px;line-height:1.1}
//     .rl{font-size:13px;color:${c};font-style:italic;margin:8px 0 16px}
//     .div{height:.8px;background:#d0ccb0;margin:16px 0}
//     .ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:14px}
//     .cv{font-size:12px;color:#6b6050}.cv a{color:${c};text-decoration:none}.dt{font-size:12.5px;color:#9a9080;margin-bottom:22px}`),
//       `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div"></div>
//     <div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div>
//     <div class="div"></div>${standardBody(c)}</div>`,
//     );

//   if (id === "serif")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:820px;margin:0 auto;padding:52px 64px;background:#fff}
//     .r1{height:2px;background:#1e293b;margin-bottom:20px}
//     .nm{font-size:42px;font-weight:900;color:#1e293b;letter-spacing:-1.5px;text-align:center;margin-bottom:6px}
//     .rl{font-size:12px;color:#64748b;text-align:center;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px}
//     .ctrow{display:flex;justify-content:center;flex-wrap:wrap;gap:5px 20px;margin-bottom:16px}
//     .cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}
//     .r2{height:1px;background:#e5e7eb;margin-bottom:20px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`),
//       `<div class="pg"><div class="r1"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div>
//     <div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div>
//     <div class="r2"></div>${standardBody(c)}</div>`,
//     );

//   if (id === "editorial")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:880px;margin:0 auto;background:#fff}
//     .top{height:4px;background:${c}}.hdr{padding:44px 52px 0}
//     .nm{font-size:36px;font-weight:800;color:#1e293b;letter-spacing:-1.5px}
//     .rl{font-size:13px;color:${c};font-weight:600;margin:6px 0 14px;letter-spacing:.5px}
//     .rule{height:1.5px;background:#334155;margin-bottom:14px}
//     .ctrow{display:flex;flex-wrap:wrap;gap:4px 16px;padding-bottom:16px;border-bottom:1px solid #e2e8f0}
//     .cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}
//     .body{padding:36px 52px;background:#fff}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`),
//       `<div class="pg"><div class="top"></div><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="rule"></div>
//     <div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div>
//     <div class="body">${standardBody(c)}</div></div>`,
//     );

//   if (id === "designer")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:900px;margin:0 auto;display:flex;min-height:100vh;background:#faf5ff}
//     .side{width:270px;background:linear-gradient(180deg,#0d0d0d,#1a0a2e);color:white;padding:44px 26px;flex-shrink:0;position:relative;overflow:hidden}
//     .side::before{content:'';position:absolute;top:-60px;left:-60px;width:220px;height:220px;background:radial-gradient(circle,${c}4d,transparent 70%);border-radius:50%}
//     .savatar{width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,${c},${c}99);display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:22px}
//     .snm{font-size:24px;font-weight:800;color:white;line-height:1.15;margin-bottom:6px;position:relative}
//     .srl{font-size:10px;color:${c};letter-spacing:2px;text-transform:uppercase;margin-bottom:28px;padding-bottom:22px;border-bottom:1px solid ${c}33;position:relative}
//     .slbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:rgba(167,139,250,.5);margin-bottom:6px;margin-top:20px}
//     .sv{font-size:11px;color:#c4b5fd;line-height:1.9;word-break:break-all}.sv a{color:#c4b5fd;text-decoration:none}
//     .sskill{display:inline-block;padding:3px 10px;background:${c}33;border:1px solid ${c}4d;border-radius:4px;font-size:10.5px;color:#c4b5fd;margin:2px 2px 0 0}
//     .main{flex:1;padding:48px 44px;background:#fff}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`),
//       `<div class="pg"><div class="side"><div class="savatar">✦</div><div class="snm">${nm}</div><div class="srl">${ttl}</div>
//     ${sidebarContacts("#c4b5fd")}
//     ${d.skills.length ? `<div class="slbl" style="margin-top:26px">Tools & Skills</div><div style="margin-top:6px">${d.skills.map((s) => `<span class="sskill">${s}</span>`).join("")}</div>` : ""}
//     </div><div class="main">${standardBody(c)}</div></div>`,
//     );

//   if (id === "motion")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:860px;margin:0 auto;background:#fff}
//     .tb{height:5.5px;background:linear-gradient(90deg,${c},#f59e0b)}
//     .hdr{padding:44px 52px;border-bottom:1px solid #fce7f3;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}
//     .nm{font-size:48px;font-weight:900;letter-spacing:-3px;text-transform:uppercase;line-height:.95;color:#111827}
//     .rl{font-size:13px;color:${c};letter-spacing:2px;text-transform:uppercase;margin-top:8px;font-weight:600}
//     .cc{text-align:right;font-size:12px;color:#9ca3af}.cv{display:block;margin-bottom:4px;line-height:1.5}.cv a{color:${c};text-decoration:none}
//     .body{padding:44px 52px;background:#fff}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//     .bb{height:5.5px;background:linear-gradient(90deg,#f59e0b,${c})}`),
//       `<div class="pg"><div class="tb"></div>
//     <div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>
//     <div class="cc">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div>
//     <div class="body">${standardBody(c)}</div><div class="bb"></div></div>`,
//     );

//   if (id === "velvet")
//     return baseHTML(
//       baseCSS(`
//     body{background:#1a0a2e}
//     .pg{max-width:860px;margin:0 auto;background:linear-gradient(160deg,#1e0f40,#2d1b69);min-height:100vh}
//     .hdr{padding:52px 52px 38px;border-bottom:1px solid rgba(196,181,253,.12);position:relative;overflow:hidden}
//     .hdr::after{content:'';position:absolute;right:-40px;top:-40px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,${c}22,transparent 70%)}
//     .nm{font-size:36px;font-weight:600;color:#f3e8ff;letter-spacing:2px}
//     .rl{font-size:10.5px;letter-spacing:3px;text-transform:uppercase;color:${c};margin:12px 0 20px}
//     .chips{display:flex;flex-wrap:wrap;gap:7px}.chip{padding:4px 12px;border:1px solid rgba(196,181,253,.22);color:#c4b5fd;font-size:11px;border-radius:4px}
//     .chip a{color:#c4b5fd;text-decoration:none}.body{padding:44px 52px}.dt{font-size:12px;color:#7c6fa0;margin-bottom:22px}`),
//       `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div>${chipsHTML}</div>
//     <div class="body"><div class="dt">${dt}</div>
//     <div style="margin-bottom:20px;font-size:13px;line-height:2;color:#d4c9ef"><strong style="color:#f3e8ff">${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>${d.company.name}${loc ? `<br><span style="color:#7c6fa0">${loc}</span>` : ""}</div>
//     ${referralNote}<div style="font-size:16px;font-weight:600;margin-bottom:22px;color:#e9d5ff">Dear ${mgr},</div>
//     ${summaryBlock}${secRows()}${achBlock()}${skillBlock()}${notesBlock}
//     <div style="margin-top:36px;font-size:13.5px;color:#7c6fa0">${sig},<br><br><strong style="font-size:15px;color:#f3e8ff">${nm}</strong>
//     ${d.personal.email ? `<br><a href="mailto:${d.personal.email}" style="font-size:12px;color:${c};text-decoration:none">${d.personal.email}</a>` : ""}
//     </div></div></div>`,
//     );

//   // Dark templates — carbon, plasma, neon, editor, hackr, studio, pixel, techwave
//   const darkTemplates = [
//     "carbon",
//     "plasma",
//     "neon",
//     "editor",
//     "hackr",
//     "studio",
//     "pixel",
//     "techwave",
//   ];
//   if (darkTemplates.includes(id)) {
//     const bgColors: Record<string, string> = {
//       carbon: "#18181b",
//       plasma: "#0f172a",
//       neon: "#070c1a",
//       editor: "#0f0a1e",
//       hackr: "#0a0f0d",
//       studio: "#111827",
//       pixel: "#1a0533",
//       techwave: "#030712",
//     };
//     const bg2 = bgColors[id] || "#0f172a";
//     return baseHTML(
//       baseCSS(`
//       body{background:${bg2}}
//       .pg{max-width:880px;margin:0 auto;background:${bg2};min-height:100vh;position:relative}
//       .acc{position:absolute;left:0;top:0;bottom:0;width:5px;background:${c}}
//       .hdr{padding:50px 50px 38px ${id === "carbon" || id === "hackr" ? "55px" : "50px"};border-bottom:1px solid ${c}33;position:relative}
//       .nm{font-size:42px;font-weight:800;letter-spacing:-2.5px;color:white;line-height:1;margin-bottom:6px}
//       .rl{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${c};margin-bottom:22px}
//       .chips{display:flex;flex-wrap:wrap;gap:8px}
//       .chip{padding:4px 12px;border:1px solid ${c}44;color:#94a3b8;font-size:10.5px;border-radius:6px}
//       .chip a{color:${c};text-decoration:none}
//       .body{padding:38px 50px 52px ${id === "carbon" || id === "hackr" ? "55px" : "50px"}}.dt{font-size:12px;color:#475569;margin-bottom:22px}`),
//       `<div class="pg">${id === "carbon" || id === "hackr" ? '<div class="acc"></div>' : ""}
//       <div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div>${chipsHTML}</div>
//       <div class="body"><div class="dt">${dt}</div>
//       <div style="margin-bottom:20px;font-size:13px;line-height:2;color:#94a3b8"><strong style="color:#e2e8f0">${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>${d.company.name}${loc ? `<br><span style="color:#475569">${loc}</span>` : ""}</div>
//       ${referralNote}<div style="font-size:16px;font-weight:700;color:white;margin-bottom:22px">Dear ${mgr},</div>
//       ${summaryBlock ? `<div style="margin-bottom:20px;padding:12px 16px;background:${c}12;border-left:3px solid ${c};font-size:13px;line-height:1.75;color:#94a3b8;font-style:italic">${d.personal.summary}</div>` : ""}
//       ${secRows()}${achBlock()}${skillBlock()}${notesBlock}
//       <div style="margin-top:36px;font-size:13.5px;color:#64748b">${sig},<br><br><strong style="font-size:15px;color:white">${nm}</strong>
//       ${d.personal.email ? `<br><a href="mailto:${d.personal.email}" style="font-size:12px;color:${c};text-decoration:none">${d.personal.email}</a>` : ""}
//       </div></div></div>`,
//     );
//   }

//   // Corporate, executive, titan, oxford, summit — professional header variants
//   const corpTemplates = [
//     "corporate",
//     "executive",
//     "titan",
//     "oxford",
//     "summit",
//     "blaze",
//     "tidal",
//     "folio",
//     "artboard",
//     "vortex",
//   ];
//   if (corpTemplates.includes(id)) {
//     const hBgMap: Record<string, string> = {
//       corporate: `background:#1e3a5f`,
//       executive: `background:${c}`,
//       titan: `background:#1f2937`,
//       oxford: `background:${c}`,
//       summit: `background:#1e293b`,
//       blaze: `background:linear-gradient(110deg,${c},#ea580c)`,
//       tidal: `background:${c}`,
//       folio: `background:${c}22`,
//       artboard: `background:${c}`,
//       vortex: `background:${c}`,
//     };
//     return baseHTML(
//       baseCSS(headerChipStyle),
//       `<div class="pg">
//       <div style="${hBgMap[id] || `background:${c}`};padding:44px 52px;color:${["folio"].includes(id) ? "#111827" : "white"};position:relative;overflow:hidden">
//         ${id === "titan" ? `<div style="position:absolute;left:0;top:0;bottom:0;width:8px;background:${c}"></div>` : ""}
//         <div style="font-size:38px;font-weight:800;letter-spacing:-1.8px;margin-bottom:5px;position:relative">${nm}</div>
//         <div style="font-size:13px;opacity:.85;margin-bottom:22px;position:relative;letter-spacing:.3px">${ttl}</div>
//         <div style="display:flex;flex-wrap:wrap;gap:7px;position:relative">
//           ${links.map((l) => `<span style="padding:5px 14px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:40px;font-size:11.5px;color:${["folio"].includes(id) ? c : "white"}">${l}</span>`).join("")}
//         </div>
//       </div>
//       <div class="body">${standardBody(c)}</div></div>`,
//     );
//   }

//   // Brushstroke and other creative
//   if (id === "brushstroke")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:860px;margin:0 auto;background:#fff}
//     .body{padding:48px 56px;background:#fff}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`),
//       `<div class="pg">
//     <svg viewBox="0 0 860 90" xmlns="http://www.w3.org/2000/svg" width="860" style="display:block">
//       <path d="M0,85 Q215,60 430,85 Q645,110 860,85 L860,0 L0,0Z" fill="${c}"/>
//       <path d="M0,95 Q215,70 430,95 Q645,120 860,95 L860,85 Q645,110 430,85 Q215,60 0,85Z" fill="${c}" opacity=".3"/>
//       <text x="50" y="40" fontSize="38" fontWeight="800" fill="rgba(255,255,255,.92)" fontFamily="${fontStack}" letterSpacing="-1.5">${nm}</text>
//       <text x="50" y="60" fontSize="14" fill="rgba(255,255,255,.75)" fontFamily="${fontStack}">${ttl}</text>
//     </svg>
//     <div style="padding:8px 56px 6px;display:flex;flex-wrap:wrap;gap:6px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0">
//       ${links.map((l) => `<span style="font-size:12px;color:#64748b">${l}</span>`).join("")}
//     </div>
//     <div class="body">${standardBody(c)}</div></div>`,
//     );

//   if (id === "folio")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:820px;margin:0 auto;padding:52px 64px;background:#fff}
//     .hrow{display:flex;align-items:flex-start;gap:28px;margin-bottom:30px;padding-bottom:24px;border-bottom:2px solid ${c}22}
//     .avatar{width:64px;height:64px;border-radius:12px;background:${c}22;border:2px solid ${c}44;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;color:${c}}
//     .hinfo .nm{font-size:34px;font-weight:800;color:#111827;letter-spacing:-1.5px}
//     .hinfo .rl{font-size:13px;color:${c};font-weight:600;margin-top:4px}
//     .ctrow{display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:8px}
//     .cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}
//     .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`),
//       `<div class="pg"><div class="hrow"><div class="avatar">✦</div>
//     <div class="hinfo"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
//     <div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div></div>
//     ${standardBody(c)}</div>`,
//     );

//   if (id === "artboard")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:820px;margin:0 auto;background:#f4f3f8;padding:8px}
//     .card{background:#fff;border-radius:8px;overflow:hidden;border:1.5px dashed ${c}44}
//     .top{height:3px;background:${c}}
//     .hdr{padding:40px 52px 28px}
//     .nm{font-size:36px;font-weight:800;color:#111827;letter-spacing:-1.5px}
//     .rl{font-size:13px;color:${c};font-weight:600;margin-top:5px}
//     .ctrow{display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:10px;margin-bottom:4px}
//     .cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}
//     .body{padding:28px 52px 52px}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`),
//       `<div class="pg"><div class="card"><div class="top"></div><div class="hdr">
//     <div class="nm">${nm}</div><div class="rl">${ttl}</div>
//     <div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div>
//     </div><div class="body">${standardBody(c)}</div></div></div>`,
//     );

//   if (id === "vortex")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:860px;margin:0 auto;background:#fff}
//     .body{padding:44px 56px;background:#fff}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`),
//       `<div class="pg">
//     <svg viewBox="0 0 860 70" width="860" xmlns="http://www.w3.org/2000/svg" style="display:block">
//       <polygon points="0,0 860,0 860,60 0,80" fill="${c}"/>
//       <polygon points="0,0 430,0 0,60" fill="rgba(255,255,255,.1)"/>
//       <text x="36" y="36" fontSize="36" fontWeight="800" fill="rgba(255,255,255,.92)" fontFamily="${fontStack}" letterSpacing="-1.5">${nm}</text>
//       <text x="36" y="55" fontSize="13" fill="rgba(255,255,255,.72)" fontFamily="${fontStack}">${ttl}</text>
//     </svg>
//     <div style="padding:8px 56px 10px;display:flex;flex-wrap:wrap;gap:6px 16px;border-bottom:1px solid #e2e8f0">
//       ${links.map((l) => `<span style="font-size:12px;color:#64748b">${l}</span>`).join("")}
//     </div>
//     <div class="body">${standardBody(c)}</div></div>`,
//     );

//   if (id === "oxford")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:800px;margin:0 auto;padding:56px 68px;background:#faf9f7}
//     .rule{height:2px;background:${c};margin-bottom:3px}
//     .rule2{height:.5px;background:${c}66;margin-bottom:18px}
//     .nm{font-size:40px;font-weight:800;color:#1a1209;text-align:center;letter-spacing:-1.5px;margin-bottom:4px}
//     .rl{font-size:11px;color:${c};text-align:center;letter-spacing:3px;text-transform:uppercase;margin-bottom:10px}
//     .ctrow{display:flex;justify-content:center;flex-wrap:wrap;gap:4px 18px;margin-bottom:6px}
//     .cv{font-size:12px;color:#78716c}.cv a{color:${c};text-decoration:none}
//     .rule3{height:.5px;background:${c}66;margin-top:12px;margin-bottom:20px}
//     .dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`),
//       `<div class="pg"><div class="rule"></div><div class="rule2"></div>
//     <div class="nm">${nm}</div><div class="rl">${ttl}</div>
//     <div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div>
//     <div class="rule3"></div>${standardBody(c)}</div>`,
//     );

//   if (id === "summit")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:880px;margin:0 auto;background:#fff}
//     .top{height:3px;background:${c}}
//     .hdr{padding:40px 52px;background:#1e293b;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}
//     .nm{font-size:34px;font-weight:800;color:white;letter-spacing:-1.5px}
//     .rl{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-top:6px}
//     .badge{background:${c};border-radius:8px;padding:12px 18px;text-align:center;flex-shrink:0}
//     .badge-t{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.75);margin-bottom:4px}
//     .badge-r{font-size:12px;font-weight:700;color:white;line-height:1.4}
//     .ctbar{display:flex;flex-wrap:wrap;gap:0;background:#0f172a}
//     .cv{font-size:11px;color:#94a3b8;padding:8px 20px;border-right:1px solid rgba(255,255,255,.06)}
//     .cv a{color:${c};text-decoration:none}
//     .body{padding:36px 52px;background:#fff}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}
//     .bot{height:3px;background:${c}}`),
//       `<div class="pg"><div class="top"></div><div class="hdr">
//     <div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>
//     ${d.company.name ? `<div class="badge"><div class="badge-t">Applying To</div><div class="badge-r">${d.company.jobTitle || "Role"}<br><span style="font-size:10px;font-weight:400;opacity:.8">${d.company.name}</span></div></div>` : ""}
//     </div>
//     <div class="ctbar">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div>
//     <div class="body">${standardBody(c)}</div><div class="bot"></div></div>`,
//     );

//   if (id === "corporate")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:880px;margin:0 auto;background:#fff}
//     .hdr{padding:0 52px;background:#1e3a5f;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;min-height:70px}
//     .hdr-l{padding:18px 0}
//     .nm{font-size:28px;font-weight:800;color:white;letter-spacing:-1px}
//     .rl{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-top:4px}
//     .hdr-r{text-align:right}
//     .cv{font-size:11px;color:rgba(255,255,255,.7);line-height:2;display:block}
//     .cv a{color:${c};text-decoration:none}
//     .stripe{height:5px;background:${c}}
//     .body{padding:36px 52px;background:#fff}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`),
//       `<div class="pg"><div class="hdr">
//     <div class="hdr-l"><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>
//     <div class="hdr-r">${links
//       .slice(0, 4)
//       .map((l) => `<span class="cv">${l}</span>`)
//       .join("")}</div>
//     </div><div class="stripe"></div>
//     <div class="body">${standardBody(c)}</div></div>`,
//     );

//   if (id === "titan")
//     return baseHTML(
//       baseCSS(`
//     .pg{max-width:880px;margin:0 auto;background:#fff;border-left:8px solid ${c}}
//     .hdr{padding:44px 48px;border-bottom:2px solid #e5e7eb}
//     .nm{font-size:36px;font-weight:800;color:#1f2937;letter-spacing:-1.5px}
//     .rl{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-top:7px;margin-bottom:14px}
//     .ctrow{display:flex;flex-wrap:wrap;gap:4px 18px}
//     .cv{font-size:12px;color:#6b7280}.cv a{color:${c};text-decoration:none}
//     .body{padding:36px 48px;background:#fff}.dt{font-size:12.5px;color:#9ca3af;margin-bottom:22px}`),
//       `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div>
//     <div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div>
//     <div class="body">${standardBody(c)}</div></div>`,
//     );

//   if (id === "executive")
//     return baseHTML(
//       baseCSS(
//         headerChipStyle +
//           `
//     .hdr{background:linear-gradient(135deg,${c},${c}cc)!important}
//     .hdr::after{content:'';position:absolute;right:-40px;top:-40px;width:180px;height:180px;border-radius:50%;background:rgba(255,255,255,.07)}`,
//       ),
//       `<div class="pg"><div class="hdr" style="background:linear-gradient(135deg,${c},${c}cc)">
//     <div class="nm">${nm}</div><div class="rl">${ttl}</div>${chipsHTML}</div>
//     <div class="body">${standardBody(c)}</div></div>`,
//     );

//   // Fallback
//   return baseHTML(
//     baseCSS(headerChipStyle),
//     `<div class="pg"><div class="hdr" style="background:linear-gradient(135deg,${c},${c}bb)">
//     <div class="nm">${nm}</div><div class="rl">${ttl}</div>${chipsHTML}</div>
//     <div class="body">${standardBody(c)}</div></div>`,
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    COLOR PALETTE OPTIONS
// ───────────────────────────────────────────────────────────────*/
// const COLOR_PALETTES = [
//   { label: "Indigo", value: "#6366f1" },
//   { label: "Violet", value: "#7c3aed" },
//   { label: "Purple", value: "#9333ea" },
//   { label: "Sky", value: "#0369a1" },
//   { label: "Teal", value: "#0d9488" },
//   { label: "Emerald", value: "#059669" },
//   { label: "Amber", value: "#d97706" },
//   { label: "Rose", value: "#e11d48" },
//   { label: "Orange", value: "#ea580c" },
//   { label: "Slate", value: "#334155" },
//   { label: "Navy", value: "#1e3a5f" },
//   { label: "Maroon", value: "#9f1239" },
// ];

// /* ─────────────────────────────────────────────────────────────
//    STEPS
// ───────────────────────────────────────────────────────────────*/
// type Step = "template" | "personal" | "company" | "content" | "review";
// const STEPS: { id: Step; label: string; icon: string }[] = [
//   { id: "template", label: "Template", icon: "🎨" },
//   { id: "personal", label: "Personal", icon: "👤" },
//   { id: "company", label: "Company", icon: "🏢" },
//   { id: "content", label: "Content", icon: "✍️" },
//   { id: "review", label: "Review", icon: "✅" },
// ];

// /* ─────────────────────────────────────────────────────────────
//    FIELD HELPER
// ───────────────────────────────────────────────────────────────*/
// function F({
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
//     <div className="mb-3.5">
//       <label className="block text-[10.5px] font-bold tracking-wide uppercase text-slate-500 mb-1.5">
//         {label}
//         {required && <span className="text-red-500"> *</span>}
//       </label>
//       <div className="relative">
//         {icon && (
//           <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[13px] opacity-50 pointer-events-none">
//             {icon}
//           </span>
//         )}
//         <div
//           className={
//             icon ? "[&>input]:pl-8 [&>textarea]:pl-3 [&>select]:pl-8" : ""
//           }
//         >
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// const inp =
//   "w-full px-3 py-2.5 text-[13px] font-[500] border-[1.5px] border-slate-200 rounded-xl outline-none transition-all duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 bg-white text-slate-800";
// const ta = `${inp} resize-y min-h-[80px] leading-relaxed px-3`;

// /* ─────────────────────────────────────────────────────────────
//    MAIN COMPONENT
// ───────────────────────────────────────────────────────────────*/
// export default function CoverLetterGenerator() {
//   const router = useRouter();
//   const [isPremium, setIsPremium] = useState<boolean | null>(null);
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
//   const [showColors, setShowColors] = useState(false);
//   const [showFonts, setShowFonts] = useState(false);

//   const liveRef = useRef<HTMLIFrameElement>(null);
//   const modalRef = useRef<HTMLIFrameElement>(null);

//   /* ── Premium gating ── */
//   useEffect(() => {
//     const userDetails = getLocalStorage<User>("user_details");
//     const userId = userDetails?.id;
//     if (!userId) {
//       setIsPremium(false);
//       return;
//     }
//     axios
//       .get(`${API_URL}/api/users/dashboard`, { params: { userId } })
//       .then((res) => {
//         const payment = res?.data?.payments?.[0];
//         // const active =
//         //   payment?.status === "active" || payment?.status === "paid";
//         const premium = payment?.plan === "Premium";
//         setIsPremium(premium);
//       })
//       .catch(() => setIsPremium(false));
//   }, []);

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
//     if (html && liveRef.current) writeIframe(liveRef, html);
//   }, [html]);
//   useEffect(() => {
//     if (modal && html && modalRef.current) writeIframe(modalRef, html);
//   }, [modal, html]);

//   const set = (path: string[], val: string) =>
//     setData((prev) => {
//       const n = JSON.parse(JSON.stringify(prev)) as CLData;
//       let c: any = n;
//       for (let i = 0; i < path.length - 1; i++) c = c[path[i]];
//       c[path[path.length - 1]] = val;
//       return n;
//     });
//   const setSec = (id: string, f: "title" | "content", v: string) =>
//     setData((p) => ({
//       ...p,
//       sections: p.sections.map((s) => (s.id === id ? { ...s, [f]: v } : s)),
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
//       showToast("✓ PDF downloaded");
//     } catch {
//       showToast("Download failed — try again");
//     } finally {
//       setBusy(false);
//     }
//   };

//   const tpl = TEMPLATES.find((t) => t.id === tplId)!;
//   const stepIdx = STEPS.findIndex((s) => s.id === step);
//   const cats = ["All", ...Array.from(new Set(TEMPLATES.map((t) => t.tag)))];
//   const shown =
//     filter === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.tag === filter);
//   const tones = [
//     "Professional",
//     "Confident",
//     "Enthusiastic",
//     "Formal",
//     "Creative",
//     "Friendly",
//   ];

//   /* ── Premium gate screen ── */
//   if (isPremium === false) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex items-center justify-center p-6">
//         <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
//           <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
//             ✦
//           </div>
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-[12px] font-bold mb-4">
//             <FiLock className="w-3.5 h-3.5" /> Premium Feature
//           </div>
//           <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
//             Cover Letter Generator
//           </h2>
//           <p className="text-[14px] text-slate-500 mb-8 leading-relaxed">
//             Create professional cover letters with 40 unique templates,
//             AI-powered content, custom fonts and colors. Available on Premium
//             plan.
//           </p>
//           <div className="grid grid-cols-2 gap-3 mb-8">
//             {[
//               "40 Unique Templates",
//               "AI Content Assist",
//               "Custom Colors & Fonts",
//               "PDF Download",
//             ].map((f) => (
//               <div
//                 key={f}
//                 className="flex items-center gap-2 text-[12.5px] font-semibold text-slate-600 bg-indigo-50 rounded-xl p-3"
//               >
//                 <span className="text-indigo-500">✓</span>
//                 {f}
//               </div>
//             ))}
//           </div>
//           <button
//             onClick={() => router.push("/pricing")}
//             className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-[14px] rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
//           >
//             Upgrade to Premium →
//           </button>
//           <button
//             onClick={() => router.push("/")}
//             className="mt-3 w-full py-2.5 text-[13px] text-slate-500 font-semibold"
//           >
//             ← Back to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ── Loading state ── */
//   if (isPremium === null) {
//     return (
//       <div className="min-h-screen bg-indigo-50 flex items-center justify-center">
//         <div className="text-indigo-600 font-bold text-[14px] animate-pulse">
//           Loading Cover Letter Studio…
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         html,body{overflow:hidden}
//         @media(max-width:820px){html,body{overflow:auto}}
//         .canvas-iframe{width:860px;height:1120px;border:none;display:block;background:#fff;pointer-events:none}
//         .modal-iframe{width:860px;height:1120px;border:none;display:block;background:#fff}
//         @keyframes livePulse{0%,100%{box-shadow:0 0 0 2px rgba(16,185,129,.2)}50%{box-shadow:0 0 0 5px rgba(16,185,129,.07)}}
//         .live-dot{animation:livePulse 2s infinite}
//         @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
//         .toast-anim{animation:toastIn .22s ease}
//         @keyframes modalIn{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
//         .modal-anim{animation:modalIn .22s ease}
//         @keyframes ovIn{from{opacity:0}to{opacity:1}}
//         .ov-anim{animation:ovIn .18s ease}
//         .scrollbar-none{scrollbar-width:none}
//         .scrollbar-none::-webkit-scrollbar{display:none}
//       `}</style>

//       {/* NAV */}
//       <nav className="h-[58px] bg-white border-b border-slate-200 flex items-center px-4 md:px-5 gap-3 z-50 relative shadow-sm flex-shrink-0">
//         <button
//           onClick={() => router.push("/")}
//           className="cursor-pointer flex-shrink-0"
//         >
//           <div className="relative w-[100px] sm:w-[140px] h-[34px] sm:h-[46px]">
//             <Image
//               src="/logo.png"
//               alt="Logo"
//               fill
//               className="object-contain"
//               priority
//               sizes="(max-width:640px) 100px,140px"
//             />
//           </div>
//         </button>

//         {/* Wizard */}
//         <div className="flex items-center flex-1 justify-center overflow-x-auto scrollbar-none gap-0 py-1">
//           {STEPS.map((s, i) => (
//             <React.Fragment key={s.id}>
//               {i > 0 && (
//                 <div
//                   className={`w-5 h-0.5 flex-shrink-0 transition-colors ${i <= stepIdx ? "bg-emerald-500" : "bg-slate-200"}`}
//                 />
//               )}
//               <button
//                 onClick={() => setStep(s.id)}
//                 className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[12px] font-semibold transition-all flex-shrink-0 cursor-pointer
//                   ${i < stepIdx ? "text-slate-800" : i === stepIdx ? "text-indigo-600 bg-indigo-50" : "text-slate-400 hover:bg-slate-50"}`}
//               >
//                 <span
//                   className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] transition-all flex-shrink-0
//                   ${i < stepIdx ? "bg-emerald-500 text-white" : i === stepIdx ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-[0_0_0_3px_rgba(91,56,240,.16)]" : "bg-slate-100 text-slate-400"}`}
//                 >
//                   {i < stepIdx ? (
//                     <svg viewBox="0 0 14 14" width="11" height="11" fill="none">
//                       <polyline
//                         points="2,8 5,12 12,3"
//                         stroke="white"
//                         strokeWidth="2.2"
//                       />
//                     </svg>
//                   ) : (
//                     i + 1
//                   )}
//                 </span>
//                 <span className="hidden sm:inline">{s.label}</span>
//               </button>
//             </React.Fragment>
//           ))}
//         </div>

//         {/* Download */}
//         <button
//           onClick={downloadPDF}
//           disabled={busy}
//           className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all flex-shrink-0"
//         >
//           {busy ? "⏳" : "⬇"} PDF
//         </button>
//       </nav>

//       {/* SHELL */}
//       <div className="grid lg:grid-cols-[400px_1fr] xl:grid-cols-[420px_1fr] h-[calc(100vh-58px)]">
//         {/* ── LEFT ── */}
//         <div className="flex flex-col overflow-hidden bg-slate-50 border-r border-slate-200">
//           <div className="flex-shrink-0 px-5 pt-4 pb-0">
//             <h2 className="font-semibold text-slate-900 tracking-tight mb-0.5 text-[15px]">
//               {step === "template"
//                 ? "Choose Template"
//                 : step === "personal"
//                   ? "Personal Information"
//                   : step === "company"
//                     ? "Company Details"
//                     : step === "content"
//                       ? "Letter Content"
//                       : "Review & Download"}
//             </h2>
//             <p className="text-[12.5px] text-slate-500 mb-2">
//               {step === "template"
//                 ? "40 unique designs for every profession"
//                 : step === "personal"
//                   ? "Your details appear as clickable links"
//                   : step === "company"
//                     ? "Where you're applying"
//                     : step === "content"
//                       ? "Build your letter paragraph by paragraph"
//                       : "Check everything before downloading"}
//             </p>
//           </div>

//           <div className="flex-1 overflow-y-auto px-4 pt-3 pb-20 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent">
//             {/* ── TEMPLATE STEP ── */}
//             {step === "template" && (
//               <>
//                 {/* Filter pills */}
//                 <div className="flex flex-wrap gap-1.5 mb-3">
//                   {cats.map((c) => (
//                     <button
//                       key={c}
//                       onClick={() => setFilter(c)}
//                       className={`px-3 py-1 rounded-full text-[11px] font-bold border-[1.5px] transition-all
//                         ${filter === c ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-slate-200 text-slate-500 bg-white hover:border-indigo-200"}`}
//                     >
//                       {c}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Color picker */}
//                 <div className="mb-3 bg-white rounded-2xl border border-indigo-100 p-3">
//                   <button
//                     onClick={() => setShowColors((v) => !v)}
//                     className="w-full flex items-center justify-between text-[12px] font-bold text-slate-700"
//                   >
//                     <span className="flex items-center gap-2">
//                       <span
//                         className="w-4 h-4 rounded-full border border-white shadow-sm"
//                         style={{ background: data.accentColor || "#6366f1" }}
//                       />
//                       Accent Color
//                     </span>
//                     <span className="text-slate-400 text-[10px]">
//                       {showColors ? "▲" : "▼"}
//                     </span>
//                   </button>
//                   {showColors && (
//                     <div className="flex flex-wrap gap-2 mt-2.5">
//                       {COLOR_PALETTES.map((p) => (
//                         <button
//                           key={p.value}
//                           title={p.label}
//                           onClick={() =>
//                             setData((d) => ({ ...d, accentColor: p.value }))
//                           }
//                           className={`w-7 h-7 rounded-full border-2 transition-all ${data.accentColor === p.value ? "border-white scale-110 shadow-lg" : "border-transparent hover:scale-105"}`}
//                           style={{
//                             background: p.value,
//                             boxShadow:
//                               data.accentColor === p.value
//                                 ? `0 0 0 2px ${p.value}`
//                                 : "",
//                           }}
//                         />
//                       ))}
//                       <label
//                         className="w-7 h-7 rounded-full border-2 border-slate-200 overflow-hidden cursor-pointer hover:scale-105 transition-all"
//                         title="Custom color"
//                       >
//                         <input
//                           type="color"
//                           value={data.accentColor || "#6366f1"}
//                           onChange={(e) =>
//                             setData((d) => ({
//                               ...d,
//                               accentColor: e.target.value,
//                             }))
//                           }
//                           className="w-8 h-8 -ml-0.5 -mt-0.5 cursor-pointer"
//                         />
//                       </label>
//                     </div>
//                   )}
//                 </div>

//                 {/* Font picker */}
//                 <div className="mb-3 bg-white rounded-2xl border border-indigo-100 p-3">
//                   <button
//                     onClick={() => setShowFonts((v) => !v)}
//                     className="w-full flex items-center justify-between text-[12px] font-bold text-slate-700"
//                   >
//                     <span className="flex items-center gap-2">
//                       <span className="text-indigo-500">Aa</span>
//                       Font: {data.fontFamily}
//                     </span>
//                     <span className="text-slate-400 text-[10px]">
//                       {showFonts ? "▲" : "▼"}
//                     </span>
//                   </button>
//                   {showFonts && (
//                     <div className="mt-2.5 space-y-1.5 max-h-40 overflow-y-auto">
//                       {FONT_FAMILIES.map((f) => (
//                         <button
//                           key={f.id}
//                           onClick={() =>
//                             setData((d) => ({ ...d, fontFamily: f.id }))
//                           }
//                           className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[12.5px] transition-all
//                             ${data.fontFamily === f.id ? "bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold" : "hover:bg-slate-50 text-slate-700 border border-transparent"}`}
//                         >
//                           <span style={{ fontFamily: `'${f.id}',${f.style}` }}>
//                             {f.label}
//                           </span>
//                           <span className="text-[10px] text-slate-400 font-normal">
//                             {f.style}
//                           </span>
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Template grid */}
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
//                   {shown.map((t) => (
//                     <div
//                       key={t.id}
//                       onClick={() => setTplId(t.id)}
//                       className={`relative bg-white rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-200
//                         ${tplId === t.id ? "border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,.12),0_8px_24px_rgba(99,102,241,.1)]" : "border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-indigo-200"}`}
//                     >
//                       <div className="h-[95px] overflow-hidden">
//                         <TplThumb
//                           id={t.id}
//                           color={data.accentColor || "#6366f1"}
//                         />
//                       </div>
//                       {tplId === t.id && (
//                         <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center shadow">
//                           <svg
//                             viewBox="0 0 14 14"
//                             width="10"
//                             height="10"
//                             fill="none"
//                           >
//                             <polyline
//                               points="2,8 5,12 12,3"
//                               stroke="white"
//                               strokeWidth="2.4"
//                             />
//                           </svg>
//                         </div>
//                       )}
//                       <div className="px-2.5 py-2">
//                         <div className="text-[9px] font-extrabold tracking-[1.2px] uppercase text-slate-400 mb-0.5">
//                           {t.tag}
//                         </div>
//                         <div className="text-[12px] font-bold text-slate-900">
//                           {t.name}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}

//             {/* ── PERSONAL ── */}
//             {step === "personal" && (
//               <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div>
//                     <p className="text-[14px] font-extrabold text-slate-900">
//                       Your Profile
//                     </p>
//                     <p className="text-[11.5px] text-slate-500">
//                       All fields appear as clickable links in your letter
//                     </p>
//                   </div>
//                 </div>
//                 <div className="grid sm:grid-cols-2 gap-0">
//                   <F label="Full Name" required>
//                     <input
//                       className={inp}
//                       placeholder="Alexandra Chen"
//                       value={data.personal.fullName}
//                       onChange={(e) =>
//                         set(["personal", "fullName"], e.target.value)
//                       }
//                     />
//                   </F>
//                   <F label="Professional Title">
//                     <input
//                       className={inp}
//                       placeholder="Senior UX Designer"
//                       value={data.personal.title}
//                       onChange={(e) =>
//                         set(["personal", "title"], e.target.value)
//                       }
//                     />
//                   </F>
//                 </div>
//                 <div className="grid sm:grid-cols-2 gap-0">
//                   <F label="Email Address" required>
//                     <input
//                       className={inp}
//                       type="email"
//                       placeholder="alex@email.com"
//                       value={data.personal.email}
//                       onChange={(e) =>
//                         set(["personal", "email"], e.target.value)
//                       }
//                     />
//                   </F>
//                   <F label="Phone Number">
//                     <input
//                       className={inp}
//                       type="tel"
//                       placeholder="+1 555 000 0000"
//                       value={data.personal.phone}
//                       onChange={(e) =>
//                         set(["personal", "phone"], e.target.value)
//                       }
//                     />
//                   </F>
//                 </div>
//                 <F label="Location">
//                   <input
//                     className={inp}
//                     placeholder="San Francisco, CA"
//                     value={data.personal.location}
//                     onChange={(e) =>
//                       set(["personal", "location"], e.target.value)
//                     }
//                   />
//                 </F>
//                 <div className="h-px bg-indigo-50 my-3" />
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
//                   🔗 Online Presence — clickable links in PDF
//                 </p>
//                 <F label="LinkedIn URL">
//                   <input
//                     className={inp}
//                     placeholder="linkedin.com/in/alexchen"
//                     value={data.personal.linkedin}
//                     onChange={(e) =>
//                       set(["personal", "linkedin"], e.target.value)
//                     }
//                   />
//                 </F>
//                 <div className="grid sm:grid-cols-2 gap-0">
//                   <F label="GitHub URL">
//                     <input
//                       className={inp}
//                       placeholder="github.com/alexchen"
//                       value={data.personal.github}
//                       onChange={(e) =>
//                         set(["personal", "github"], e.target.value)
//                       }
//                     />
//                   </F>
//                   <F label="Portfolio / Website">
//                     <input
//                       className={inp}
//                       placeholder="alexchen.io"
//                       value={data.personal.website}
//                       onChange={(e) =>
//                         set(["personal", "website"], e.target.value)
//                       }
//                     />
//                   </F>
//                 </div>
//                 <div className="h-px bg-indigo-50 my-3" />
//                 <F label="Professional Summary (optional)">
//                   <textarea
//                     className={ta}
//                     placeholder="2–3 sentence summary of your experience…"
//                     value={data.personal.summary}
//                     onChange={(e) =>
//                       set(["personal", "summary"], e.target.value)
//                     }
//                   />
//                 </F>
//                 <F label="Closing Salutation">
//                   <input
//                     className={inp}
//                     placeholder="Sincerely (default)"
//                     value={data.personal.signature}
//                     onChange={(e) =>
//                       set(["personal", "signature"], e.target.value)
//                     }
//                   />
//                 </F>
//               </div>
//             )}

//             {/* ── COMPANY ── */}
//             {step === "company" && (
//               <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-lg">
//                     🏢
//                   </div>
//                   <div>
//                     <p className="text-[14px] font-extrabold text-slate-900">
//                       Company & Role
//                     </p>
//                     <p className="text-[11.5px] text-slate-500">
//                       Application target details
//                     </p>
//                   </div>
//                 </div>
//                 <F label="Company Name" icon="🏢" required>
//                   <input
//                     className={inp}
//                     placeholder="Google, Stripe, Airbnb…"
//                     value={data.company.name}
//                     onChange={(e) => set(["company", "name"], e.target.value)}
//                   />
//                 </F>
//                 <F label="Role Applying For" icon="🎯" required>
//                   <input
//                     className={inp}
//                     placeholder="Senior UX Designer"
//                     value={data.company.jobTitle}
//                     onChange={(e) =>
//                       set(["company", "jobTitle"], e.target.value)
//                     }
//                   />
//                 </F>
//                 <div className="grid sm:grid-cols-2 gap-3">
//                   <F label="Hiring Manager" icon="👤">
//                     <input
//                       className={inp}
//                       placeholder="Sarah Johnson"
//                       value={data.company.hiringManager}
//                       onChange={(e) =>
//                         set(["company", "hiringManager"], e.target.value)
//                       }
//                     />
//                   </F>
//                   <F label="Their Title" icon="🏷️">
//                     <input
//                       className={inp}
//                       placeholder="Head of Design"
//                       value={data.company.hiringManagerTitle}
//                       onChange={(e) =>
//                         set(["company", "hiringManagerTitle"], e.target.value)
//                       }
//                     />
//                   </F>
//                 </div>
//                 <div className="grid sm:grid-cols-2 gap-3">
//                   <F label="City">
//                     <input
//                       className={`${inp} pl-3`}
//                       placeholder="Mountain View"
//                       value={data.company.city}
//                       onChange={(e) => set(["company", "city"], e.target.value)}
//                     />
//                   </F>
//                   <F label="State">
//                     <input
//                       className={`${inp} pl-3`}
//                       placeholder="CA"
//                       value={data.company.state}
//                       onChange={(e) =>
//                         set(["company", "state"], e.target.value)
//                       }
//                     />
//                   </F>
//                 </div>
//                 <div className="h-px bg-indigo-50 my-3" />
//                 <F label="Where you found this job" icon="🔍">
//                   <input
//                     className={inp}
//                     placeholder="LinkedIn, Referral, Company website…"
//                     value={data.company.jobSource}
//                     onChange={(e) =>
//                       set(["company", "jobSource"], e.target.value)
//                     }
//                   />
//                 </F>
//                 <F label="Referral Name (if any)" icon="🤝">
//                   <input
//                     className={inp}
//                     placeholder="John Smith referred me"
//                     value={data.company.referral}
//                     onChange={(e) =>
//                       set(["company", "referral"], e.target.value)
//                     }
//                   />
//                 </F>
//               </div>
//             )}

//             {/* ── CONTENT ── */}
//             {step === "content" && (
//               <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-lg">
//                     ✍️
//                   </div>
//                   <div>
//                     <p className="text-[14px] font-extrabold text-slate-900">
//                       Letter Content
//                     </p>
//                     <p className="text-[11.5px] text-slate-500">
//                       Build your letter paragraph by paragraph
//                     </p>
//                   </div>
//                 </div>

//                 {/* Date */}
//                 <F label="Letter Date" icon="📅">
//                   <input
//                     className={inp}
//                     type="date"
//                     value={data.letterDate}
//                     onChange={(e) => set(["letterDate"], e.target.value)}
//                   />
//                 </F>

//                 <div className="h-px bg-indigo-50 my-3" />
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
//                   ✍️ Letter Sections
//                 </p>

//                 {data.sections.map((s, i) => (
//                   <div
//                     key={s.id}
//                     className="bg-indigo-50/60 border-[1.5px] border-indigo-100 rounded-xl p-3 mb-2.5 transition-all focus-within:bg-white focus-within:border-indigo-400 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,.08)]"
//                   >
//                     <div className="flex items-center gap-2 mb-2.5">
//                       <span className="w-[22px] h-[22px] rounded-[7px] bg-gradient-to-br from-indigo-600 to-violet-600 text-white text-[10px] font-extrabold flex items-center justify-center flex-shrink-0">
//                         {i + 1}
//                       </span>
//                       <input
//                         value={s.title}
//                         onChange={(e) => setSec(s.id, "title", e.target.value)}
//                         placeholder="Section title"
//                         className="flex-1 px-2.5 py-1.5 rounded-lg border-[1.5px] border-slate-200 text-[12.5px] font-bold bg-white text-slate-900 outline-none focus:border-indigo-500 transition-all"
//                       />
//                       {data.sections.length > 1 && (
//                         <button
//                           onClick={() =>
//                             setData((p) => ({
//                               ...p,
//                               sections: p.sections.filter((x) => x.id !== s.id),
//                             }))
//                           }
//                           className="w-6 h-6 bg-white border-[1.5px] border-slate-200 rounded-[6px] text-red-400 text-[12px] flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-all"
//                         >
//                           ✕
//                         </button>
//                       )}
//                     </div>
//                     <textarea
//                       value={s.content}
//                       onChange={(e) => setSec(s.id, "content", e.target.value)}
//                       placeholder={s.placeholder}
//                       rows={4}
//                       className="w-full px-2.5 py-2 rounded-lg border-[1.5px] border-slate-200 bg-white text-[12.5px] text-slate-800 leading-relaxed outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,.08)] transition-all resize-y"
//                     />
//                   </div>
//                 ))}
//                 <button
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
//                   className="w-full py-2 mb-3 bg-white border-[1.5px] border-dashed border-indigo-200 rounded-xl text-[12.5px] font-bold text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400 transition-all"
//                 >
//                   + Add Section
//                 </button>

//                 {/* Achievements */}
//                 <div className="h-px bg-indigo-50 my-3" />
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
//                   🏆 Key Achievements
//                 </p>
//                 <div className="flex gap-2 mb-2">
//                   <input
//                     className="flex-1 px-3 py-2 text-[12.5px] border-[1.5px] border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
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
//                     onClick={() => {
//                       if (achIn.trim()) {
//                         setData((p) => ({
//                           ...p,
//                           achievements: [...p.achievements, achIn.trim()],
//                         }));
//                         setAchIn("");
//                       }
//                     }}
//                     className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[12px] font-bold rounded-xl"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-1.5 mb-2">
//                   {data.achievements.map((a, i) => (
//                     <div
//                       key={i}
//                       className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-[12px] font-semibold text-indigo-700"
//                     >
//                       ⭐ {a}
//                       <button
//                         onClick={() =>
//                           setData((p) => ({
//                             ...p,
//                             achievements: p.achievements.filter(
//                               (_, j) => j !== i,
//                             ),
//                           }))
//                         }
//                         className="text-indigo-300 hover:text-red-400 text-[13px] leading-none ml-0.5"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Skills */}
//                 <div className="h-px bg-indigo-50 my-3" />
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
//                   🛠️ Core Skills / Tools
//                 </p>
//                 <div className="flex gap-2 mb-2">
//                   <input
//                     className="flex-1 px-3 py-2 text-[12.5px] border-[1.5px] border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
//                     placeholder="e.g. Figma, React, Premiere Pro…"
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
//                     onClick={() => {
//                       if (sklIn.trim()) {
//                         setData((p) => ({
//                           ...p,
//                           skills: [...p.skills, sklIn.trim()],
//                         }));
//                         setSklIn("");
//                       }
//                     }}
//                     className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[12px] font-bold rounded-xl"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-1.5 mb-2">
//                   {data.skills.map((s, i) => (
//                     <div
//                       key={i}
//                       className="flex items-center gap-1.5 px-2.5 py-1 bg-violet-50 border border-violet-100 rounded-full text-[12px] font-semibold text-violet-700"
//                     >
//                       🔧 {s}
//                       <button
//                         onClick={() =>
//                           setData((p) => ({
//                             ...p,
//                             skills: p.skills.filter((_, j) => j !== i),
//                           }))
//                         }
//                         className="text-violet-300 hover:text-red-400 text-[13px] leading-none ml-0.5"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Tone */}
//                 <div className="h-px bg-indigo-50 my-3" />
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
//                   🎭 Tone of Voice
//                 </p>
//                 <div className="flex flex-wrap gap-1.5 mb-3">
//                   {tones.map((t) => (
//                     <button
//                       key={t}
//                       onClick={() => setData((p) => ({ ...p, tone: t }))}
//                       className={`px-3 py-1 rounded-full text-[12px] font-semibold border-[1.5px] transition-all ${data.tone === t ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-slate-200 text-slate-500 bg-white hover:border-indigo-200"}`}
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Notes */}
//                 <div className="h-px bg-indigo-50 my-3" />
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
//                   📝 Additional Notes
//                 </p>
//                 <textarea
//                   className={ta}
//                   rows={3}
//                   placeholder="Post-script, special circumstances, or extra context…"
//                   value={data.notes}
//                   onChange={(e) =>
//                     setData((p) => ({ ...p, notes: e.target.value }))
//                   }
//                 />
//               </div>
//             )}

//             {/* ── REVIEW ── */}
//             {step === "review" && (
//               <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-lg">
//                     ✅
//                   </div>
//                   <div>
//                     <p className="text-[14px] font-extrabold text-slate-900">
//                       Review Summary
//                     </p>
//                     <p className="text-[11.5px] text-slate-500">
//                       Check before downloading
//                     </p>
//                   </div>
//                 </div>
//                 {(
//                   [
//                     ["Template", tpl?.name, "template"],
//                     ["Accent Color", data.accentColor, "template"],
//                     ["Font", data.fontFamily, "template"],
//                     ["Full Name", data.personal.fullName, "personal"],
//                     ["Title", data.personal.title, "personal"],
//                     ["Email", data.personal.email, "personal"],
//                     ["Phone", data.personal.phone, "personal"],
//                     ["LinkedIn", data.personal.linkedin, "personal"],
//                     ["GitHub", data.personal.github, "personal"],
//                     ["Portfolio", data.personal.website, "personal"],
//                     ["Company", data.company.name, "company"],
//                     ["Role", data.company.jobTitle, "company"],
//                     ["Manager", data.company.hiringManager, "company"],
//                     ["Referral", data.company.referral, "company"],
//                     ["Letter Date", data.letterDate, "content"],
//                     ["Tone", data.tone, "content"],
//                     [
//                       "Sections",
//                       `${data.sections.filter((s) => s.content).length} written`,
//                       "content",
//                     ],
//                     [
//                       "Achievements",
//                       `${data.achievements.length} added`,
//                       "content",
//                     ],
//                     ["Skills", `${data.skills.length} added`, "content"],
//                   ] as [string, string, Step][]
//                 ).map(([l, v, s]) => (
//                   <div
//                     key={l}
//                     className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0"
//                   >
//                     <span className="text-[11px] font-extrabold uppercase tracking-[.5px] text-slate-400">
//                       {l}
//                     </span>
//                     <div className="flex items-center gap-2">
//                       {l === "Accent Color" && v ? (
//                         <span
//                           className="w-4 h-4 rounded-full border border-white shadow-sm"
//                           style={{ background: v }}
//                         />
//                       ) : null}
//                       <span
//                         className={`text-[12.5px] font-medium text-right max-w-[180px] truncate ${v ? "text-slate-800" : "text-slate-300"}`}
//                       >
//                         {v || "—"}
//                       </span>
//                       <button
//                         onClick={() => setStep(s)}
//                         className="text-[11px] font-bold text-indigo-500 hover:text-indigo-700 transition-colors"
//                       >
//                         Edit
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//                 <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
//                   <p className="text-[13px] font-bold text-slate-900 mb-1">
//                     ✅ Ready to Download
//                   </p>
//                   <p className="text-[12px] text-slate-500">
//                     Your cover letter is ready. Download as PDF below.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* FOOTER */}
//           <div className="flex-shrink-0 px-5 py-3 border-t border-slate-200 bg-white flex justify-between items-center gap-3">
//             <button
//               onClick={() =>
//                 stepIdx === 0
//                   ? router.push("/")
//                   : setStep(STEPS[stepIdx - 1].id)
//               }
//               className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[13px] font-bold border-[1.5px] border-slate-200 bg-white text-slate-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all cursor-pointer"
//             >
//               ← {stepIdx > 0 ? "Back" : "Home"}
//             </button>
//             {stepIdx < STEPS.length - 1 ? (
//               <button
//                 onClick={() => setStep(STEPS[stepIdx + 1].id)}
//                 className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[13.5px] font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:-translate-y-px transition-all cursor-pointer"
//               >
//                 Continue to {STEPS[stepIdx + 1].label}
//               </button>
//             ) : (
//               <button
//                 onClick={downloadPDF}
//                 disabled={busy}
//                 className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[13.5px] font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all"
//               >
//                 {busy ? "⏳ Generating…" : "⬇ Download PDF"}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* ── RIGHT — CANVAS PREVIEW ── */}
//         <div className="hidden lg:flex flex-col bg-slate-100 overflow-hidden">
//           <div className="flex-shrink-0 h-[52px] bg-white border-b border-slate-200 px-4 flex items-center justify-between gap-3 shadow-[0_1px_3px_rgba(0,0,0,.04)]">
//             <div className="flex items-center gap-2.5">
//               <span className="w-2 h-2 rounded-full bg-emerald-500 live-dot" />
//               <div>
//                 <p className="text-[13px] font-bold text-slate-900 leading-tight">
//                   Live Preview
//                 </p>
//                 <p className="text-[10.5px] text-slate-400">
//                   Drag anywhere · Pinch · Scroll
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setStep("template")}
//                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 hover:bg-indigo-100 transition-all"
//               >
//                 🎨 Change
//               </button>
//               <button
//                 onClick={() => {
//                   rebuild();
//                   setModal(true);
//                 }}
//                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border-[1.5px] border-slate-200 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
//               >
//                 ⛶ Fullscreen
//               </button>
//             </div>
//           </div>
//           <div className="flex-1 overflow-hidden">
//             <CanvasPreview>
//               {html ? (
//                 <iframe
//                   ref={liveRef}
//                   className="canvas-iframe"
//                   title="preview"
//                   sandbox="allow-same-origin"
//                 />
//               ) : (
//                 <div className="w-[860px] h-[1120px] bg-white flex flex-col items-center justify-center gap-3 text-slate-400 rounded-xl">
//                   <span className="text-[52px] opacity-20">📄</span>
//                   <p className="text-[16px] font-bold">Preview appears here</p>
//                   <p className="text-[13px]">
//                     Fill in your details to see the letter
//                   </p>
//                 </div>
//               )}
//             </CanvasPreview>
//           </div>
//         </div>
//       </div>

//       {/* MOBILE PREVIEW FAB */}
//       <button
//         onClick={() => {
//           rebuild();
//           setModal(true);
//         }}
//         className="lg:hidden fixed top-[70px] right-3 z-50 bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-2.5 rounded-full shadow-xl"
//       >
//         <FiEye className="w-4 h-4" />
//       </button>

//       {/* FULLSCREEN MODAL — canvas drag works here too */}
//       <AnimatePresence>
//         {modal && (
//           <div
//             className="ov-anim fixed inset-0 bg-[rgba(10,6,30,.86)] backdrop-blur-[14px] z-[1000] flex items-center justify-center p-3 sm:p-5"
//             onClick={() => setModal(false)}
//           >
//             <div
//               className="modal-anim w-full max-w-[980px] h-[92vh] bg-white rounded-2xl overflow-hidden flex flex-col shadow-[0_48px_100px_rgba(0,0,0,.48)]"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex-shrink-0 h-[56px] px-5 bg-white border-b border-slate-100 flex items-center justify-between">
//                 <div className="flex items-center gap-2.5">
//                   <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-sm text-white">
//                     📄
//                   </div>
//                   <div>
//                     <p className="text-[14px] font-extrabold text-slate-900 leading-tight">
//                       {data.personal.fullName || "Cover Letter"}
//                     </p>
//                     <p className="text-[11px] text-slate-400">
//                       {tpl?.name} · {tpl?.tag}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setModal(false)}
//                   className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 text-slate-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 flex items-center justify-center text-[16px] transition-all"
//                 >
//                   ✕
//                 </button>
//               </div>

//               {/* Canvas in modal — full drag works here */}
//               <div className="flex-1 overflow-hidden bg-slate-100">
//                 <CanvasPreview>
//                   {html ? (
//                     <iframe
//                       ref={modalRef}
//                       className="modal-iframe"
//                       title="full-preview"
//                       sandbox="allow-same-origin"
//                     />
//                   ) : (
//                     <div className="w-[860px] h-[1120px] bg-white flex items-center justify-center text-slate-400">
//                       <span className="text-5xl opacity-20">📄</span>
//                     </div>
//                   )}
//                 </CanvasPreview>
//               </div>

//               <div className="flex-shrink-0 px-5 py-3 border-t border-slate-100 bg-white flex justify-end gap-2.5">
//                 <button
//                   onClick={() => setModal(false)}
//                   className="px-4 py-2 rounded-full text-[12.5px] font-bold border-[1.5px] border-slate-200 text-slate-500 hover:bg-slate-50 transition-all"
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={downloadPDF}
//                   disabled={busy}
//                   className="flex items-center gap-1.5 px-5 py-2 rounded-full text-[12.5px] font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                 >
//                   {busy ? "⏳ Generating…" : "⬇ Download PDF"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* TOAST */}
//       {toast && (
//         <div className="toast-anim fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-slate-900 text-white px-6 py-2.5 rounded-full text-[13px] font-bold shadow-xl whitespace-nowrap">
//           {toast}
//         </div>
//       )}
//     </>
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
// import {
//   FiZoomIn,
//   FiZoomOut,
//   FiRefreshCw,
//   FiEye,
//   FiLock,
//   FiX,
// } from "react-icons/fi";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { API_URL } from "@/app/config/api";
// import { getLocalStorage } from "@/app/utils/localStorage";

// /* ─────────────────────────────────────────────────────────────
//    TYPES
// ───────────────────────────────────────────────────────────────*/
// interface User {
//   id: string;
// }
// interface CLData {
//   personal: {
//     fullName: string;
//     title: string;
//     email: string;
//     phone: string;
//     location: string;
//     website: string;
//     linkedin: string;
//     github: string;
//     summary: string;
//     signature: string;
//   };
//   company: {
//     name: string;
//     jobTitle: string;
//     hiringManager: string;
//     hiringManagerTitle: string;
//     city: string;
//     state: string;
//     jobSource: string;
//     referral: string;
//   };
//   sections: {
//     id: string;
//     title: string;
//     content: string;
//     placeholder: string;
//   }[];
//   achievements: string[];
//   skills: string[];
//   tone: string;
//   notes: string;
//   letterDate: string;
//   accentColor: string;
//   fontFamily: string;
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
//         "Express your enthusiasm for the role. Mention where you found it and a compelling hook about why you're perfect…",
//     },
//     {
//       id: "2",
//       title: "Experience & Skills",
//       content: "",
//       placeholder:
//         "Highlight 2–3 specific accomplishments with metrics. Show you solve their exact problems…",
//     },
//     {
//       id: "3",
//       title: "Why This Company",
//       content: "",
//       placeholder:
//         "Reference their mission, recent news, products, or culture. Show genuine research…",
//     },
//     {
//       id: "4",
//       title: "Closing",
//       content: "",
//       placeholder:
//         "Restate enthusiasm, include a clear CTA, mention portfolio/work samples if applicable…",
//     },
//   ],
//   achievements: [],
//   skills: [],
//   tone: "professional",
//   notes: "",
//   letterDate: new Date().toISOString().split("T")[0],
//   accentColor: "#6366f1",
//   fontFamily: "DM Sans",
// };

// /* ─────────────────────────────────────────────────────────────
//    FONT FAMILIES
// ───────────────────────────────────────────────────────────────*/
// const FONT_FAMILIES = [
//   {
//     id: "DM Sans",
//     label: "DM Sans",
//     url: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap",
//     style: "sans-serif",
//   },
//   {
//     id: "Inter",
//     label: "Inter",
//     url: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
//     style: "sans-serif",
//   },
//   {
//     id: "Plus Jakarta",
//     label: "Plus Jakarta",
//     url: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap",
//     style: "sans-serif",
//   },
//   {
//     id: "Outfit",
//     label: "Outfit",
//     url: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap",
//     style: "sans-serif",
//   },
//   {
//     id: "Nunito",
//     label: "Nunito",
//     url: "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap",
//     style: "sans-serif",
//   },
//   {
//     id: "Manrope",
//     label: "Manrope",
//     url: "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap",
//     style: "sans-serif",
//   },
//   {
//     id: "Syne",
//     label: "Syne",
//     url: "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap",
//     style: "sans-serif",
//   },
//   {
//     id: "Playfair",
//     label: "Playfair",
//     url: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&display=swap",
//     style: "serif",
//   },
//   {
//     id: "Lora",
//     label: "Lora",
//     url: "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap",
//     style: "serif",
//   },
//   {
//     id: "Cormorant",
//     label: "Cormorant",
//     url: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap",
//     style: "serif",
//   },
//   {
//     id: "IBM Plex",
//     label: "IBM Plex Mono",
//     url: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap",
//     style: "monospace",
//   },
//   {
//     id: "Space Grotesk",
//     label: "Space Grotesk",
//     url: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
//     style: "sans-serif",
//   },
// ];

// /* ─────────────────────────────────────────────────────────────
//    50 TEMPLATE DEFINITIONS — all white/light modern professional
// ───────────────────────────────────────────────────────────────*/
// const TEMPLATES = [
//   // Modern
//   { id: "aurora", name: "Aurora", tag: "Modern" },
//   { id: "prism", name: "Prism", tag: "Modern" },
//   { id: "frost", name: "Frost", tag: "Modern" },
//   { id: "canvas", name: "Canvas", tag: "Modern" },
//   { id: "gradient", name: "Gradient", tag: "Modern" },
//   { id: "vivid", name: "Vivid", tag: "Modern" },
//   { id: "nova", name: "Nova", tag: "Modern" },
//   { id: "tidal", name: "Tidal", tag: "Modern" },
//   { id: "horizon", name: "Horizon", tag: "Modern" },
//   { id: "lumina", name: "Lumina", tag: "Modern" },
//   // Executive / Corporate
//   { id: "obsidian_lite", name: "Obsidian", tag: "Executive" },
//   { id: "slate", name: "Slate", tag: "Corporate" },
//   { id: "architect", name: "Architect", tag: "Corporate" },
//   { id: "corporate", name: "Corporate", tag: "Corporate" },
//   { id: "executive", name: "Executive", tag: "Executive" },
//   { id: "titan", name: "Titan", tag: "Corporate" },
//   { id: "oxford", name: "Oxford", tag: "Executive" },
//   { id: "summit", name: "Summit", tag: "Corporate" },
//   { id: "presidio", name: "Presidio", tag: "Executive" },
//   { id: "accord", name: "Accord", tag: "Corporate" },
//   // Minimal / Clean
//   { id: "nordic", name: "Nordic", tag: "Minimal" },
//   { id: "pearl", name: "Pearl", tag: "Minimal" },
//   { id: "minimal", name: "Minimal", tag: "Minimal" },
//   { id: "zen", name: "Zen", tag: "Minimal" },
//   { id: "ivory", name: "Ivory", tag: "Classic" },
//   { id: "paper", name: "Paper", tag: "Classic" },
//   { id: "serif", name: "Serif", tag: "Classic" },
//   { id: "editorial", name: "Editorial", tag: "Editorial" },
//   { id: "linen", name: "Linen", tag: "Minimal" },
//   { id: "parchment", name: "Parchment", tag: "Classic" },
//   // Creative / Designer
//   { id: "designer", name: "Designer", tag: "Creative" },
//   { id: "motion", name: "Motion", tag: "Creative" },
//   { id: "brushstroke", name: "Brushstroke", tag: "Creative" },
//   { id: "studio", name: "Studio", tag: "Creative" },
//   { id: "folio", name: "Folio", tag: "Designer" },
//   { id: "artboard", name: "Artboard", tag: "Designer" },
//   { id: "vortex", name: "Vortex", tag: "Designer" },
//   { id: "palette", name: "Palette", tag: "Creative" },
//   { id: "frame", name: "Frame", tag: "Designer" },
//   { id: "mosaic", name: "Mosaic", tag: "Creative" },
//   // Professional Premium
//   { id: "blaze", name: "Blaze", tag: "Premium" },
//   { id: "radiant", name: "Radiant", tag: "Premium" },
//   { id: "solstice", name: "Solstice", tag: "Premium" },
//   { id: "meridian", name: "Meridian", tag: "Premium" },
//   { id: "pinnacle", name: "Pinnacle", tag: "Premium" },
//   // Tech / Modern Pro
//   { id: "circuit", name: "Circuit", tag: "Tech" },
//   { id: "blueprint", name: "Blueprint", tag: "Tech" },
//   { id: "axiom", name: "Axiom", tag: "Tech" },
//   { id: "signal", name: "Signal", tag: "Tech" },
//   { id: "quantum", name: "Quantum", tag: "Tech" },
// ];

// /* ─────────────────────────────────────────────────────────────
//    CANVAS PREVIEW
// ───────────────────────────────────────────────────────────────*/
// function CanvasPreview({ children }: { children: ReactNode }) {
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const posRef = useRef({ x: 20, y: 20 });
//   const scaleRef = useRef(0.58);
//   const downRef = useRef<{ x: number; y: number } | null>(null);
//   const startRef = useRef({ x: 0, y: 0 });
//   const isDrag = useRef(false);
//   const animRef = useRef<number | null>(null);
//   const lastDist = useRef(0);

//   const [pos, setPos] = useState({ x: 20, y: 20 });
//   const [scale, setScale] = useState(0.58);
//   const [drag, setDrag] = useState(false);

//   const initS = useCallback(() => {
//     const w = window.innerWidth;
//     return w < 480 ? 0.33 : w < 640 ? 0.4 : w < 820 ? 0.5 : w < 1024 ? 0.57 : w < 1280 ? 0.63 : 0.68;
//   }, []);

//   useEffect(() => {
//     const s = initS();
//     scaleRef.current = s;
//     setScale(s);
//     const fn = () => { const s2 = initS(); scaleRef.current = s2; setScale(s2); };
//     window.addEventListener("resize", fn);
//     return () => window.removeEventListener("resize", fn);
//   }, [initS]);

//   const smoothZoom = (target: number) => {
//     if (animRef.current) cancelAnimationFrame(animRef.current);
//     const from = scaleRef.current, t0 = performance.now();
//     const tick = (now: number) => {
//       const p = Math.min((now - t0) / 160, 1);
//       const v = from + (target - from) * (1 - Math.pow(1 - p, 3));
//       scaleRef.current = v; setScale(v);
//       if (p < 1) animRef.current = requestAnimationFrame(tick);
//     };
//     animRef.current = requestAnimationFrame(tick);
//   };
//   const zoomIn = () => smoothZoom(Math.min(scaleRef.current + 0.12, 3));
//   const zoomOut = () => smoothZoom(Math.max(scaleRef.current - 0.12, 0.2));
//   const reset = () => { const p = { x: 20, y: 20 }; posRef.current = p; setPos(p); smoothZoom(initS()); };

//   useEffect(() => {
//     const el = wrapRef.current;
//     if (!el) return;
//     const onDown = (e: MouseEvent) => { e.preventDefault(); downRef.current = { x: e.clientX, y: e.clientY }; isDrag.current = false; };
//     const onMove = (e: MouseEvent) => {
//       if (!downRef.current) return;
//       const dx = e.clientX - downRef.current.x, dy = e.clientY - downRef.current.y;
//       if (!isDrag.current && Math.hypot(dx, dy) > 3) { isDrag.current = true; setDrag(true); startRef.current = { x: downRef.current.x - posRef.current.x, y: downRef.current.y - posRef.current.y }; }
//       if (isDrag.current) { const np = { x: e.clientX - startRef.current.x, y: e.clientY - startRef.current.y }; posRef.current = np; setPos({ ...np }); }
//     };
//     const onUp = () => { downRef.current = null; isDrag.current = false; setDrag(false); };
//     const onTouchStart = (e: TouchEvent) => {
//       if (e.touches.length === 1) { const t = e.touches[0]; downRef.current = { x: t.clientX, y: t.clientY }; isDrag.current = false; }
//       else if (e.touches.length === 2) { const dx = e.touches[1].clientX - e.touches[0].clientX; const dy = e.touches[1].clientY - e.touches[0].clientY; lastDist.current = Math.hypot(dx, dy); }
//     };
//     const onTouchMove = (e: TouchEvent) => {
//       e.preventDefault();
//       if (e.touches.length === 2) { const dx = e.touches[1].clientX - e.touches[0].clientX; const dy = e.touches[1].clientY - e.touches[0].clientY; const d = Math.hypot(dx, dy); if (lastDist.current > 0) { const v = Math.max(0.2, Math.min(3, scaleRef.current * (d / lastDist.current))); scaleRef.current = v; setScale(v); } lastDist.current = d; return; }
//       if (!downRef.current || e.touches.length !== 1) return;
//       const t = e.touches[0]; const dx = t.clientX - downRef.current.x, dy = t.clientY - downRef.current.y;
//       if (!isDrag.current && Math.hypot(dx, dy) > 3) { isDrag.current = true; setDrag(true); startRef.current = { x: downRef.current.x - posRef.current.x, y: downRef.current.y - posRef.current.y }; }
//       if (isDrag.current) { const np = { x: t.clientX - startRef.current.x, y: t.clientY - startRef.current.y }; posRef.current = np; setPos({ ...np }); }
//     };
//     const onTouchEnd = () => { downRef.current = null; isDrag.current = false; setDrag(false); };
//     const onWheel = (e: WheelEvent) => {
//       e.preventDefault();
//       if (e.ctrlKey || e.metaKey) { const v = Math.max(0.2, Math.min(3, scaleRef.current * Math.exp(-e.deltaY * 0.002))); scaleRef.current = v; setScale(v); }
//       else { const np = { x: posRef.current.x - e.deltaX * 0.5, y: posRef.current.y - e.deltaY * 0.5 }; posRef.current = np; setPos({ ...np }); }
//     };
//     el.addEventListener("mousedown", onDown, { passive: false });
//     el.addEventListener("mousemove", onMove, { passive: false });
//     el.addEventListener("mouseup", onUp);
//     el.addEventListener("mouseleave", onUp);
//     el.addEventListener("touchstart", onTouchStart, { passive: true });
//     el.addEventListener("touchmove", onTouchMove, { passive: false });
//     el.addEventListener("touchend", onTouchEnd);
//     el.addEventListener("wheel", onWheel, { passive: false });
//     return () => {
//       el.removeEventListener("mousedown", onDown); el.removeEventListener("mousemove", onMove);
//       el.removeEventListener("mouseup", onUp); el.removeEventListener("mouseleave", onUp);
//       el.removeEventListener("touchstart", onTouchStart); el.removeEventListener("touchmove", onTouchMove);
//       el.removeEventListener("touchend", onTouchEnd); el.removeEventListener("wheel", onWheel);
//     };
//   }, []);

//   return (
//     <div className="relative w-full h-full" style={{ minHeight: 360 }}>
//       <div ref={wrapRef} className="absolute inset-0 overflow-hidden select-none" style={{ cursor: drag ? "grabbing" : "grab", borderRadius: 12, background: "#e8e6f2", pointerEvents: "auto" }}>
//         <div style={{ position: "absolute", inset: 0, zIndex: 10, background: "transparent", pointerEvents: drag ? "auto" : "none" }} />
//         <div style={{ position: "absolute", top: 0, left: 0, transformOrigin: "top left", transform: `translate(${pos.x}px,${pos.y}px) scale(${scale})`, willChange: "transform", zIndex: 1 }}>
//           {children}
//         </div>
//       </div>
//       <div data-nodrag className="absolute top-2.5 left-2.5 z-30 pointer-events-none bg-white/90 backdrop-blur-sm border border-indigo-100 text-indigo-600 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
//         {Math.round(scale * 100)}%
//       </div>
//       <div data-nodrag className="absolute bottom-3 right-3 z-30 flex flex-col gap-1.5">
//         {[
//           { fn: zoomIn, icon: <FiZoomIn className="w-3.5 h-3.5" />, p: true },
//           { fn: zoomOut, icon: <FiZoomOut className="w-3.5 h-3.5" />, p: true },
//           { fn: reset, icon: <FiRefreshCw className="w-3 h-3" />, p: false },
//         ].map((b, i) => (
//           <motion.button key={i} type="button" onClick={b.fn} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
//             className={`w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-md ${b.p ? "bg-gradient-to-br from-indigo-600 to-violet-600" : "bg-gray-700 hover:bg-gray-800"}`}>
//             {b.icon}
//           </motion.button>
//         ))}
//       </div>
//       <p data-nodrag className="absolute bottom-3 left-2 z-30 pointer-events-none text-[9px] font-semibold text-slate-400">Drag · Pinch · Scroll</p>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    50 SVG THUMBNAILS — all white/light, modern professional
// ───────────────────────────────────────────────────────────────*/
// function TplThumb({ id, color = "#6366f1" }: { id: string; color?: string }) {
//   const W = 220, H = 155;
//   const bg = "#ffffff";
//   const li = "#e5e7eb";
//   const ml = "#9ca3af";
//   const sl = "#6b7280";
//   const c = color;
//   const ca = `${c}22`;
//   const cb = `${c}55`;

//   const R = (x: number, y: number, w: number, h: number, fill: string, rx = 1.5) => (
//     <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} />
//   );
//   const lines = (x: number, y: number, widths: number[], fill = li) =>
//     widths.map((w, i) => R(x, y + i * 7, w, 2.5, fill));

//   switch (id) {
//     case "aurora": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}
//         <defs><linearGradient id="aur" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={c}/><stop offset="100%" stopColor={`${c}bb`}/></linearGradient></defs>
//         {R(0,0,W,52,"url(#aur)",0)}
//         <circle cx={200} cy={0} r={55} fill="rgba(255,255,255,.12)"/>
//         {R(13,12,88,9,"rgba(255,255,255,.92)",2)}{R(13,25,55,4,"rgba(255,255,255,.55)",1.5)}
//         {[0,38,78].map(ox=><rect key={ox} x={13+ox} y={36} width={32} height={5} rx={10} fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.3)" strokeWidth=".6"/>)}
//         {R(13,62,38,2.5,ml)}{...lines(13,69,[130,110,122])}{R(13,92,44,3,c)}{...lines(13,99,[180,162,175])}{R(13,120,44,3,c)}{...lines(13,127,[155,118])}{R(13,144,32,2,ml)}{R(13,150,55,3,sl)}
//       </svg>
//     );
//     case "prism": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}{R(0,0,W,52,c,0)}
//         <polygon points="110,0 220,0 220,52" fill="rgba(255,255,255,.14)"/>
//         {R(13,12,82,9,"rgba(255,255,255,.92)",1.5)}{R(13,25,50,3.5,"rgba(255,255,255,.65)")}
//         {R(0,52,W,11,"#1e1b4b",0)}{[13,57,104].map(x=><rect key={x} x={x} y={56} width={38} height={2} rx={1} fill="#a5b4fc"/>)}
//         {R(13,74,32,2.5,ml)}{...lines(13,81,[188,162])}{R(13,95,2.5,25,c,1)}
//         {[95,101,106,111].map((y,i)=><rect key={y} x={19} y={y} width={i===0?38:[182,155,165][i-1]} height={2.2} rx={1} fill={i===0?c:li}/>)}
//         {R(13,148,52,3,sl)}
//       </svg>
//     );
//     case "frost": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <defs><linearGradient id="frg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#dbeafe"/><stop offset="100%" stopColor="#e0f2fe"/></linearGradient></defs>
//         {R(0,0,W,H,"url(#frg)",0)}{R(5,5,210,145,"rgba(255,255,255,.82)",10)}{R(5,5,210,50,`${c}e6`,10)}{R(5,31,210,24,`${c}e6`,0)}
//         {R(17,14,82,8,"white",1.5)}{R(17,26,50,3,"rgba(255,255,255,.65)")}
//         {[0,33,68].map(ox=><rect key={ox} x={17+ox} y={37} width={27} height={4} rx={10} fill="rgba(255,255,255,.16)" stroke="rgba(255,255,255,.28)" strokeWidth=".5"/>)}
//         {R(17,63,36,2.5,ml)}{...lines(17,70,[182,157])}{R(17,83,42,3,c)}{...lines(17,90,[182,170,176])}{R(17,110,42,3,c)}{...lines(17,117,[182,130])}{R(17,137,28,2,ml)}{R(17,143,52,3,sl)}
//       </svg>
//     );
//     case "canvas": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}{R(13,13,4,58,c,2)}{R(22,13,92,10,"#111827",2)}{R(22,27,57,4,"#6b7280",1.5)}
//         {[35,41,47].map((y,i)=><rect key={y} x={22} y={y} width={[70,58,74][i]} height={2.5} rx={1} fill={ml}/>)}
//         {R(13,75,188,1,li,0)}{R(13,82,32,2.5,ml)}{...lines(13,89,[188,158])}{R(13,104,44,3,c)}{...lines(13,111,[188,170,178])}{R(13,131,44,3,c)}{...lines(13,138,[188,122])}
//       </svg>
//     );
//     case "gradient": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <defs><linearGradient id="grd" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={c} stopOpacity=".18"/><stop offset="100%" stopColor={c} stopOpacity="0"/></linearGradient></defs>
//         {R(0,0,W,H,bg,0)}{R(0,0,7,H,c,0)}{R(7,0,W-7,H,"url(#grd)",0)}
//         {R(18,14,88,9,"#111827",2)}{R(18,27,54,4,"#374151",1.5)}{R(18,37,192,0.6,li,0)}
//         {[43,49,55,61].map((y,i)=><rect key={y} x={18} y={y} width={[58,48,68,42][i]} height={2.5} rx={1} fill={ml}/>)}
//         {R(18,73,192,0.6,li,0)}{R(18,82,44,3,c)}{...lines(18,89,[185,168,176])}{R(18,110,44,3,c)}{...lines(18,117,[185,120])}
//       </svg>
//     );
//     case "vivid": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <defs><linearGradient id="vvd" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={c}/><stop offset="100%" stopColor="#ec4899"/></linearGradient></defs>
//         {R(0,0,W,H,bg,0)}{R(0,0,W,50,"url(#vvd)",0)}<circle cx={30} cy={50} r={55} fill={`${c}18`}/>
//         {R(14,10,82,10,"rgba(255,255,255,.92)",2)}{R(14,24,50,4,"rgba(255,255,255,.62)",1.5)}
//         {[0,36,74].map(ox=><rect key={ox} x={14+ox} y={36} width={30} height={4} rx={8} fill="rgba(255,255,255,.22)"/>)}
//         {R(14,62,38,2.5,ml)}{...lines(14,69,[175,148])}{R(14,83,44,3,c)}{...lines(14,90,[183,165,172])}{R(14,112,44,3,c)}{...lines(14,119,[183,118])}
//       </svg>
//     );
//     case "nova": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}{R(0,0,W,48,c,0)}
//         <path d={`M0,48 Q55,38 110,48 Q165,58 220,48 L220,0 L0,0Z`} fill="rgba(255,255,255,.12)"/>
//         {R(14,11,80,8,"rgba(255,255,255,.9)",2)}{R(14,23,50,4,"rgba(255,255,255,.58)",1.5)}
//         {[14,58,104].map(x=><rect key={x} x={x} y={35} width={38} height={3.5} rx={8} fill="rgba(255,255,255,.2)"/>)}
//         {R(14,58,38,2.5,ml)}{...lines(14,65,[175,145])}{R(14,80,44,3,c)}{...lines(14,87,[183,165,173])}{R(14,108,44,3,c)}{...lines(14,115,[183,118])}{R(14,142,55,3,sl)}
//       </svg>
//     );
//     case "tidal": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}{R(0,0,W,4,c,0)}{R(0,4,W,38,`${c}12`,0)}
//         {R(14,10,85,8,"#111827",2)}{R(14,23,52,4,c,1.5)}{R(14,35,192,0.5,li,0)}
//         {[40,46,52].map((y,i)=><rect key={y} x={14} y={y} width={[62,52,72][i]} height={2.5} rx={1} fill={ml}/>)}
//         {R(155,37,60,22,"#f8fafc",4)}{[40,46,52].map((y,i)=><rect key={y} x={158} y={y} width={[45,35,50][i]} height={1.8} rx={1} fill="#94a3b8"/>)}
//         {R(14,63,192,1.5,"#e2e8f0",0)}{R(14,73,44,3,c)}{...lines(14,80,[185,165,175])}{R(14,101,44,3,c)}{...lines(14,108,[185,118])}{R(0,151,W,4,c,0)}
//       </svg>
//     );
//     case "horizon": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#f8fafc",0)}
//         <defs><linearGradient id="hor" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={c}/><stop offset="100%" stopColor={`${c}44`}/></linearGradient></defs>
//         {R(0,0,W,3,"url(#hor)",0)}{R(14,16,90,10,"#0f172a",2)}{R(14,30,56,3.5,c,1.5)}
//         {R(155,14,52,36,`${c}10`,6)}<rect x={155} y={14} width={52} height={36} rx={6} fill="none" stroke={`${c}30`} strokeWidth="1"/>
//         {[20,26,32,38].map((y,i)=><rect key={y} x={159} y={y} width={[38,28,42,22][i]} height={1.8} rx={1} fill={`${c}60`}/>)}
//         {[40,46,52].map((y,i)=><rect key={y} x={14} y={y} width={[62,50,70][i]} height={2.5} rx={1} fill={ml}/>)}
//         {R(14,64,192,1,li,0)}{R(14,74,44,3,c)}{...lines(14,81,[185,165,175])}{R(14,102,44,3,c)}{...lines(14,109,[185,118])}{R(0,150,W,2,`${c}55`,0)}
//       </svg>
//     );
//     case "lumina": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}
//         <defs><radialGradient id="lum" cx="50%" cy="0%" r="60%"><stop offset="0%" stopColor={`${c}18`}/><stop offset="100%" stopColor="transparent"/></radialGradient></defs>
//         {R(0,0,W,H,"url(#lum)",0)}{R(0,0,W,55,`${c}08`,0)}
//         {R(13,14,92,10,"#111827",2)}{R(13,28,58,3.5,c,1.5)}
//         <circle cx={195} cy={28} r={22} fill={`${c}10`} stroke={`${c}20`} strokeWidth="1"/>
//         {[40,46,52].map((y,i)=><rect key={y} x={13} y={y} width={[62,50,72][i]} height={2.5} rx={1} fill={ml}/>)}
//         {R(13,64,195,1,li,0)}{R(13,74,44,3,c)}{...lines(13,81,[185,165,175])}{R(13,102,44,3,c)}{...lines(13,109,[185,118])}{R(13,144,55,3,sl)}
//       </svg>
//     );
//     // Executive / Corporate
//     case "obsidian_lite": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#f8f7ff",0)}{R(0,0,60,H,`${c}10`,0)}{R(0,0,3,H,c,0)}
//         {R(8,13,47,7,c,1.5)}{R(8,24,34,3,`${c}88`)}
//         {[44,56,68,80,92].map(y=><g key={y}>{R(8,y,20,2,`${c}66`)}{R(8,y+6,46,2,`${c}33`)}</g>)}
//         {R(72,13,32,2.5,ml)}{...lines(72,20,[130,100],li)}{R(72,36,40,3,c)}{...lines(72,43,[138,125,130],li)}{R(72,64,40,3,c)}{...lines(72,71,[138,112,120],li)}{R(72,122,28,2,ml)}{R(72,129,52,3,sl)}
//       </svg>
//     );
//     case "slate": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}{R(13,13,92,9,"#0f172a",1.5)}{R(13,26,55,3,"#64748b")}
//         {R(137,13,70,2.5,"#475569")}{[19,25,31,37].map((y,i)=><rect key={y} x={137} y={y} width={[60,70,55,65][i]} height={2} rx={1} fill="#94a3b8"/>)}
//         {R(13,38,192,1.8,"#0f172a",0)}{R(13,46,72,5,"#f1f5f9",2)}{R(15,47.5,48,1.5,"#64748b",0.5)}
//         {R(13,57,32,2.5,ml)}{...lines(13,64,[188,158])}{R(13,78,2.5,28,c,1)}
//         {[78,84,89,94].map((y,i)=><rect key={y} x={19} y={y} width={i===0?38:[180,158,168][i-1]} height={2.2} rx={1} fill={i===0?c:li}/>)}
//         {R(13,133,30,2,ml)}{R(13,140,52,3,sl)}
//       </svg>
//     );
//     case "architect": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#f8fafc",0)}{R(13,13,82,10,"#0f172a",1.5)}{R(13,27,52,3,"#334155")}
//         {R(113,13,94,40,"#0f172a",5)}{[18,24,30,36].map((y,i)=><rect key={y} x={119} y={y} width={[62,52,72,46][i]} height={2} rx={1} fill="rgba(255,255,255,.58)"/>)}
//         {R(13,53,192,1.2,"#e2e8f0",0)}{R(13,60,32,2.5,ml)}{...lines(13,67,[188,158],"#e2e8f0")}
//         {R(13,82,44,3,"#0f172a")}{...lines(13,89,[188,170,175],"#e2e8f0")}{R(13,109,44,3,"#0f172a")}{...lines(13,116,[188,122],"#e2e8f0")}{R(13,136,30,2,ml)}{R(13,143,52,3,sl)}
//       </svg>
//     );
//     case "corporate": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}{R(0,0,W,8,c,0)}{R(0,8,W,44,"#1e3a5f",0)}
//         {R(14,14,85,8,"rgba(255,255,255,.92)",2)}{R(14,26,52,4,"rgba(255,255,255,.6)",1.5)}
//         {R(155,12,60,8,"rgba(255,255,255,.7)",2)}{[18,24,30].map((y,i)=><rect key={y} x={155} y={y} width={[55,40,50][i]} height={2} rx={1} fill="rgba(255,255,255,.5)"/>)}
//         {R(14,58,35,2.5,ml)}{...lines(14,65,[185,155])}{R(14,80,44,3,c)}{...lines(14,87,[185,168,175])}{R(14,108,44,3,c)}{...lines(14,115,[185,118])}{R(0,147,W,8,c,0)}
//       </svg>
//     );
//     case "executive": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#f0f4f8",0)}{R(0,0,W,55,c,0)}<circle cx={195} cy={0} r={70} fill="rgba(255,255,255,.07)"/>
//         {R(14,12,85,9,"rgba(255,255,255,.92)",2)}{R(14,25,52,4,"rgba(255,255,255,.6)",1.5)}
//         {[0,38,80].map(ox=><rect key={ox} x={14+ox} y={36} width={32} height={5} rx={10} fill="rgba(255,255,255,.2)" stroke="rgba(255,255,255,.3)" strokeWidth=".5"/>)}
//         {R(14,65,38,2.5,ml)}{...lines(14,72,[175,148])}{R(14,85,44,3,c)}{...lines(14,92,[185,165,175])}{R(14,113,44,3,c)}{...lines(14,120,[185,118])}{R(14,143,32,2,ml)}{R(14,149,55,3,sl)}
//       </svg>
//     );
//     case "titan": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}{R(0,0,8,H,c,0)}{R(18,14,88,10,"#1f2937",2)}{R(18,28,55,4,"#374151",1.5)}
//         {R(18,38,188,1.5,"#e5e7eb",0)}{[44,50,56].map((y,i)=><rect key={y} x={18} y={y} width={[58,48,68][i]} height={2.5} rx={1} fill={ml}/>)}
//         {R(18,66,188,1.5,"#e5e7eb",0)}{R(18,76,44,3,c)}{...lines(18,83,[183,165,174])}{R(18,104,44,3,c)}{...lines(18,111,[183,120])}{R(18,132,32,2,ml)}{R(18,138,55,3,sl)}
//       </svg>
//     );
//     case "oxford": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#faf9f7",0)}{R(14,10,192,1.5,c,0)}{R(14,14,192,0.5,c,0)}
//         <text x={110} y={30} textAnchor="middle" fontSize={12} fontWeight="700" fill="#1a1209" fontFamily="Georgia,serif">Jonathan M. Williams</text>
//         <text x={110} y={40} textAnchor="middle" fontSize={5.5} fill={sl} fontFamily="Georgia,serif">Senior Architect & Project Director</text>
//         {R(14,44,192,0.5,c,0)}{R(14,47,192,1.5,c,0)}
//         {[53,58,63].map((y,i)=><rect key={y} x={[14,80,148][i]} y={y} width={60} height={2} rx={1} fill={ml}/>)}
//         {R(14,73,192,0.6,"#c9bc9a",0)}{R(14,82,38,2.5,c)}{...lines(14,89,[185,162,172],"#d5cbb0")}{R(14,108,38,2.5,c)}{...lines(14,115,[185,118],"#d5cbb0")}{R(14,138,192,1.5,c,0)}
//       </svg>
//     );
//     case "summit": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}{R(0,0,W,3,c,0)}{R(14,12,88,10,"#111827",2)}{R(14,26,54,4,c,1.5)}
//         {R(155,10,52,28,c,4)}<text x={181} y={28} textAnchor="middle" fontSize={7} fontWeight="700" fill="white">APPLYING</text>
//         <text x={181} y={37} textAnchor="middle" fontSize={7} fill="rgba(255,255,255,.75)">TO</text>
//         {R(14,40,188,0.7,li,0)}{[46,52,58].map((y,i)=><rect key={y} x={14} y={y} width={[62,52,72][i]} height={2.5} rx={1} fill={ml}/>)}
//         {R(14,68,188,0.7,li,0)}{R(14,78,44,3,c)}{...lines(14,85,[185,165,175])}{R(14,106,44,3,c)}{...lines(14,113,[185,118])}{R(0,152,W,3,c,0)}
//       </svg>
//     );
//     case "presidio": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#fafafa",0)}{R(0,0,W,2,c,0)}
//         {R(14,12,95,11,"#111827",2)}{R(14,27,60,3.5,c,1.5)}
//         <rect x={13} y={40} width={192} height={18} rx={4} fill={`${c}08`} stroke={`${c}18`} strokeWidth="1"/>
//         {[44,50].map((y,i)=><rect key={y} x={17} y={y} width={[65,55][i]} height={2} rx={1} fill={ml}/>)}
//         {R(110,44,90,2,ml)}{R(110,50,75,2,ml)}
//         {R(14,66,192,1,li,0)}{R(14,76,44,3,c)}{...lines(14,83,[185,165,174])}{R(14,104,44,3,c)}{...lines(14,111,[185,118])}{R(14,140,192,1,li,0)}{R(14,148,55,3,sl)}
//       </svg>
//     );
//     case "accord": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}
//         <defs><linearGradient id="acc" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={`${c}15`}/><stop offset="100%" stopColor="white"/></linearGradient></defs>
//         {R(0,0,W,65,"url(#acc)",0)}{R(0,0,4,65,c,0)}
//         {R(14,14,90,10,"#111827",2)}{R(14,28,56,3.5,c,1.5)}
//         {[40,46].map((y,i)=><rect key={y} x={14} y={y} width={[60,48][i]} height={2.5} rx={1} fill={ml}/>)}
//         {R(140,14,66,44,`${c}08`,6)}<rect x={140} y={14} width={66} height={44} rx={6} fill="none" stroke={`${c}25`} strokeWidth="1"/>
//         {[20,26,32,38,44].map((y,i)=><rect key={y} x={144} y={y} width={[50,38,55,28,42][i]} height={1.8} rx={1} fill={`${c}50`}/>)}
//         {R(14,68,192,1,li,0)}{R(14,78,44,3,c)}{...lines(14,85,[185,165,175])}{R(14,106,44,3,c)}{...lines(14,113,[185,118])}{R(14,144,55,3,sl)}
//       </svg>
//     );
//     // Minimal
//     case "nordic": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}{R(16,13,62,3,`${c}88`)}{R(16,20,118,10,"#1e1b4b",1.5)}{R(16,34,38,3,c)}
//         {R(16,43,188,0.8,`${c}44`,0)}{[0,62,124].map(ox=><rect key={ox} x={16+ox} y={50} width={56} height={2} rx={1} fill={ml}/>)}
//         {R(16,62,32,2.5,ml)}{...lines(16,69,[188,162])}{R(16,84,44,3,c)}{...lines(16,91,[188,162,177])}{R(16,111,44,3,c)}{...lines(16,118,[188,112])}{R(16,138,30,2,ml)}{R(16,145,52,3,sl)}
//       </svg>
//     );
//     case "pearl": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}{R(13,13,97,10,"#111827",1.5)}{R(13,27,60,3.5,c)}{R(13,36,188,0.6,li,0)}
//         {[42,48].map((y,i)=><rect key={y} x={13} y={y} width={[62,54][i]} height={2} rx={1} fill={ml}/>)}
//         {R(92,42,57,2,ml)}{R(155,42,46,2,ml)}{R(13,58,188,0.6,li,0)}{R(13,64,32,2,ml)}
//         {...lines(13,71,[188,158])}{R(13,87,44,3,c)}{...lines(13,94,[188,170,176])}{R(13,115,44,3,c)}{...lines(13,122,[188,122])}{R(13,140,28,2,ml)}{R(13,147,52,3,sl)}
//       </svg>
//     );
//     case "minimal": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#fafafa",0)}{R(16,16,110,11,"#111",1)}{R(16,31,70,3,"#666",1)}
//         {R(16,40,188,0.5,"#ddd",0)}{[46,51,56,61].map((y,i)=><rect key={y} x={16} y={y} width={[80,65,90,55][i]} height={2} rx={1} fill="#aaa"/>)}
//         {R(16,73,188,0.5,"#ddd",0)}{R(16,82,35,2,"#999",1)}{...lines(16,89,[188,160],"#ddd")}{R(16,104,40,2.5,c,1)}{...lines(16,111,[188,165,175],"#ddd")}{R(16,131,40,2.5,c,1)}{...lines(16,138,[188,120],"#ddd")}{R(16,152,188,0.5,"#ddd",0)}
//       </svg>
//     );
//     case "zen": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#fafaf9",0)}{R(14,18,95,10,"#1c1917",2)}{R(14,32,58,3.5,"#57534e",1.5)}
//         {R(14,42,192,0.5,"#d6d3d1",0)}{[48,54,60,66].map((y,i)=><rect key={y} x={14} y={y} width={[62,52,72,46][i]} height={2} rx={1} fill="#a8a29e"/>)}
//         {R(14,74,192,0.5,"#d6d3d1",0)}{R(14,82,38,2.5,c)}{...lines(14,89,[183,162,172],"#d6d3d1")}{R(14,110,38,2.5,c)}{...lines(14,117,[183,118],"#d6d3d1")}{R(14,142,192,0.5,"#d6d3d1",0)}
//       </svg>
//     );
//     case "ivory": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#fefce8",0)}{R(13,13,5,130,c,2.5)}{R(23,13,90,10,"#1c1917",2)}{R(23,27,56,3.5,"#78350f",1.5)}
//         {R(23,36,188,0.8,"#fde68a",0)}{[42,48,54].map((y,i)=><rect key={y} x={23} y={y} width={[62,54,74][i]} height={2} rx={1} fill="#92400e"/>)}
//         {R(23,64,32,2.5,ml)}{...lines(23,71,[178,148],"#e7e5e4")}{R(23,86,44,3,c)}{...lines(23,93,[178,162,170],"#e7e5e4")}{R(23,113,44,3,c)}{...lines(23,120,[178,114],"#e7e5e4")}{R(23,139,28,2,ml)}{R(23,146,52,3,"#1c1917")}
//       </svg>
//     );
//     case "paper": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#fffef0",0)}{R(14,14,4,127,"#e5e0c8",2)}{R(38,0,1,H,"#e5dcc8",0)}
//         {R(46,14,88,9,"#1a1209",2)}{R(46,27,54,3.5,"#4a4a4a",1.5)}{R(14,42,192,0.5,"#d0ccb0",0)}
//         {[48,54,60].map((y,i)=><rect key={y} x={46} y={y} width={[62,52,72][i]} height={2} rx={1} fill="#8a8070"/>)}
//         {R(46,76,42,3,c)}{...lines(46,83,[168,148,156],"#d0ccb0")}{R(46,104,42,3,c)}{...lines(46,111,[168,108],"#d0ccb0")}{R(46,140,32,2,"#9a9080",1)}
//       </svg>
//     );
//     case "serif": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}{R(13,13,192,0.8,"#1e293b",0)}
//         <text x={110} y={30} textAnchor="middle" fontSize={13} fontWeight="800" fill="#1e293b" fontFamily="Georgia,serif">Alexander Johnson</text>
//         <text x={110} y={40} textAnchor="middle" fontSize={5.5} fill={sl} fontFamily="Georgia,serif">Senior Product Designer</text>
//         {R(13,45,192,0.8,"#1e293b",0)}{[14,80,150].map((x,i)=><rect key={x} x={x} y={51} width={[60,64,52][i]} height={2} rx={1} fill={c}/>)}
//         {R(13,59,192,0.5,li,0)}{R(13,65,32,2.5,ml)}{...lines(13,72,[188,158])}{R(13,87,42,3,c)}{...lines(13,94,[188,170,176])}{R(13,114,42,3,c)}{...lines(13,121,[188,122])}{R(13,149,192,0.8,li,0)}
//       </svg>
//     );
//     case "editorial": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}{R(0,0,W,4,c,0)}{R(14,11,110,11,"#1e293b",2)}{R(14,26,62,3.5,c,1.5)}
//         {R(14,35,188,1.5,"#334155",0)}{[40,46,52].map((y,i)=><rect key={y} x={14} y={y} width={[62,52,72][i]} height={2.5} rx={1} fill={ml}/>)}
//         {R(155,38,52,22,`${c}1a`,2)}{[42,48,54,60].map((y,i)=><rect key={y} x={158} y={y} width={[38,28,44,22][i]} height={1.5} rx={0.5} fill="#94a3b8"/>)}
//         {R(14,62,188,1.5,"#e2e8f0",0)}{R(14,72,44,3,c)}{...lines(14,79,[185,165,175])}{R(14,100,44,3,c)}{...lines(14,107,[185,118])}{R(0,150,W,4,c,0)}
//       </svg>
//     );
//     case "linen": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#faf8f5",0)}
//         {R(0,0,W,H,"none",0)}
//         {R(14,16,3,120,`${c}40`,2)}
//         {R(21,16,92,11,"#1c1917",2)}{R(21,31,58,3.5,c,1.5)}
//         {[40,46,52].map((y,i)=><rect key={y} x={21} y={y} width={[62,52,72][i]} height={2.2} rx={1} fill="#a8a29e"/>)}
//         {R(21,62,185,0.6,"#d6d3d1",0)}{R(21,72,40,2.5,c)}{...lines(21,79,[183,162,172],"#e7e5e4")}{R(21,100,40,2.5,c)}{...lines(21,107,[183,118],"#e7e5e4")}{R(21,140,50,3,"#57534e")}
//       </svg>
//     );
//     case "parchment": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#fdf8ed",0)}
//         {R(14,10,192,2,`${c}66`,0)}{R(14,14,192,0.5,`${c}33`,0)}
//         <text x={110} y={34} textAnchor="middle" fontSize={14} fontWeight="700" fill="#2c1a0e" fontFamily="Georgia,serif">Eleanor R. Ashworth</text>
//         <text x={110} y={45} textAnchor="middle" fontSize={5.5} fill="#8a7060" fontFamily="Georgia,serif">Senior Creative Director</text>
//         {R(14,50,192,0.5,`${c}33`,0)}{R(14,54,192,2,`${c}66`,0)}
//         {[60,65,70].map((y,i)=><rect key={y} x={[14,80,150][i%3]} y={y} width={60} height={1.8} rx={1} fill="#8a7060"/>)}
//         {R(14,78,192,0.5,"#d4c9a8",0)}{R(14,88,40,2.5,c)}{...lines(14,95,[185,162,172],"#d4c9a8")}{R(14,116,40,2.5,c)}{...lines(14,123,[185,118],"#d4c9a8")}{R(14,148,192,2,`${c}44`,0)}
//       </svg>
//     );
//     // Creative
//     case "designer": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#faf5ff",0)}{R(0,0,70,H,`${c}12`,0)}{R(0,0,2,H,c,0)}
//         <circle cx={35} cy={70} r={25} fill={ca} stroke={cb} strokeWidth="1"/>
//         <text x={35} y={74} textAnchor="middle" fontSize={14} fill={`${c}cc`}>✦</text>
//         {R(8,13,52,8,c,1.5)}{R(8,25,36,2.5,`${c}b0`)}{R(80,13,77,9,"#111827",1.5)}{R(80,26,50,2.5,"#6b7280")}
//         {R(80,75,50,3,c)}{...lines(80,82,[130,118,124])}{R(80,107,50,3,c)}{...lines(80,114,[130,90])}
//       </svg>
//     );
//     case "motion": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <defs><linearGradient id="mt" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={c}/><stop offset="100%" stopColor="#f59e0b"/></linearGradient></defs>
//         {R(0,0,W,H,bg,0)}{R(0,0,W,5.5,"url(#mt)",0)}{R(13,14,94,11,"#111827",1.5)}{R(13,29,62,3.5,c)}
//         {R(13,38,188,0.6,"#fce7f3",0)}{[44,50,56].map((y,i)=><rect key={y} x={13} y={y} width={[57,50,66][i]} height={4} rx={10} fill={ca} stroke={cb} strokeWidth=".7"/>)}
//         {R(13,67,32,2.5,ml)}{...lines(13,74,[185,155])}{R(13,89,44,3,c)}{...lines(13,96,[185,168,175])}{R(13,116,44,3,c)}{...lines(13,123,[185,118])}{R(0,151,W,4,"url(#mt)",0)}
//       </svg>
//     );
//     case "brushstroke": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#fefefe",0)}
//         <path d="M0,44 Q55,34 110,44 Q165,54 220,44 L220,0 L0,0Z" fill={c}/>
//         <path d="M0,50 Q55,40 110,50 Q165,60 220,50 L220,44 Q165,54 110,44 Q55,34 0,44Z" fill={c} opacity=".3"/>
//         {R(14,11,85,9,"rgba(255,255,255,.92)",2)}{R(14,24,52,4,"rgba(255,255,255,.65)",1.5)}
//         {R(14,62,38,2.5,ml)}{...lines(14,69,[185,160])}{R(14,84,44,3,c)}{...lines(14,91,[185,168,175])}{R(14,112,44,3,c)}{...lines(14,119,[185,118])}{R(14,143,32,2,ml)}
//       </svg>
//     );
//     case "studio": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#f8f5ff",0)}{R(0,0,W,58,`${c}10`,0)}
//         <defs><linearGradient id="std" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={c}/><stop offset="100%" stopColor={`${c}44`}/></linearGradient></defs>
//         {R(0,0,W,3,"url(#std)",0)}{R(14,12,88,10,"#1e1b4b",2)}{R(14,26,54,4,c,1.5)}
//         {[34,40,46].map((y,i)=><rect key={y} x={14} y={y} width={[50,44,60][i]} height={4} rx={8} fill={ca} stroke={cb} strokeWidth=".7"/>)}
//         {R(14,60,188,0.6,li,0)}{R(14,70,42,2.5,c)}{...lines(14,77,[185,165,175])}{R(14,100,42,2.5,c)}{...lines(14,107,[185,118])}{R(14,148,55,3,"#1e1b4b")}
//       </svg>
//     );
//     case "folio": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}{R(0,0,W,H,`${c}08`,0)}{R(14,14,55,55,`${c}22`,8)}
//         <text x={41} y={47} textAnchor="middle" fontSize={20} fill={c}>✦</text>
//         {R(76,14,130,10,"#111827",2)}{R(76,28,80,4,"#374151",1.5)}{R(76,36,110,2.5,ml)}
//         {[41,47].map((y,i)=><rect key={y} x={76} y={y} width={[90,70][i]} height={2} rx={1} fill={ml}/>)}
//         {R(14,76,192,1.2,li,0)}{R(14,84,38,2.5,c)}{...lines(14,91,[185,165,175])}{R(14,112,38,2.5,c)}{...lines(14,119,[185,118])}{R(14,143,32,2,ml)}{R(14,149,55,3,sl)}
//       </svg>
//     );
//     case "artboard": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#f4f3f8",0)}{R(12,12,196,131,bg,6)}
//         <rect x={12} y={12} width={196} height={131} rx={6} fill="none" stroke={`${c}40`} strokeWidth={1.5} strokeDasharray="4,3"/>
//         {R(12,12,196,3,c,0)}{R(14,20,88,8,"#111827",1.5)}{R(14,32,54,3.5,c,1.5)}
//         {[39,45,51].map((y,i)=><rect key={y} x={14} y={y} width={[55,44,62][i]} height={2.5} rx={1} fill={ml}/>)}
//         {R(14,62,192,0.7,li,0)}{R(14,72,38,2.5,c)}{...lines(14,79,[182,162,170])}{R(14,100,38,2.5,c)}{...lines(14,107,[182,115])}{R(14,132,30,2,ml)}{R(14,138,52,3,sl)}
//       </svg>
//     );
//     case "vortex": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}<polygon points="0,0 220,0 220,55 0,75" fill={c}/>
//         <polygon points="0,0 110,0 0,55" fill="rgba(255,255,255,.12)"/>
//         {R(14,11,82,8,"rgba(255,255,255,.9)",2)}{R(14,23,50,4,"rgba(255,255,255,.62)",1.5)}
//         {[14,56,104].map(x=><rect key={x} x={x} y={35} width={36} height={3.5} rx={8} fill="rgba(255,255,255,.2)"/>)}
//         {R(14,84,38,2.5,ml)}{...lines(14,91,[182,162])}{R(14,106,44,3,c)}{...lines(14,113,[183,165,173])}{R(14,134,44,3,c)}{...lines(14,141,[183,118])}
//       </svg>
//     );
//     case "palette": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#fff7f5",0)}
//         {[0,1,2,3].map(i=><rect key={i} x={0} y={i*40} width={5} height={38} rx={2} fill={[c,`${c}cc`,`${c}88`,`${c}44`][i]}/>)}
//         {R(14,14,90,10,"#1c0a06",2)}{R(14,28,56,3.5,c,1.5)}
//         {[38,44,50].map((y,i)=><rect key={y} x={14} y={y} width={[62,52,72][i]} height={2.5} rx={1} fill="#a8a29e"/>)}
//         {R(14,62,192,1,li,0)}{R(14,72,44,3,c)}{...lines(14,79,[185,165,175])}{R(14,100,44,3,c)}{...lines(14,107,[185,118])}{R(14,140,55,3,"#1c0a06")}
//       </svg>
//     );
//     case "frame": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#fafafa",0)}
//         <rect x={6} y={6} width={208} height={143} rx={8} fill="none" stroke={c} strokeWidth="2"/>
//         <rect x={10} y={10} width={200} height={135} rx={6} fill="none" stroke={`${c}30`} strokeWidth="1"/>
//         {R(14,18,90,10,"#111827",2)}{R(14,32,56,3.5,c,1.5)}
//         {[42,48,54].map((y,i)=><rect key={y} x={14} y={y} width={[62,52,72][i]} height={2.5} rx={1} fill={ml}/>)}
//         {R(14,66,192,0.8,li,0)}{R(14,76,44,3,c)}{...lines(14,83,[185,165,175])}{R(14,104,44,3,c)}{...lines(14,111,[185,118])}{R(14,140,55,3,sl)}
//       </svg>
//     );
//     case "mosaic": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}
//         {[[0,0],[36,0],[72,0],[0,36],[36,36],[72,36],[0,72],[36,72],[72,72]].map(([x,y],i)=>(
//           <rect key={i} x={x} y={y} width={34} height={34} rx={2} fill={i%3===0?`${c}15`:i%3===1?`${c}08`:"white"} stroke={`${c}12`} strokeWidth=".5"/>
//         ))}
//         {R(14,18,58,8,"white",2)}{R(14,18,58,8,`${c}18`,2)}<text x={43} y={26} textAnchor="middle" fontSize={8} fontWeight="700" fill={c}>Mosaic</text>
//         {R(110,14,100,10,"#111827",1.5)}{R(110,28,65,3,c,1.5)}
//         {[38,44,50].map((y,i)=><rect key={y} x={110} y={y} width={[62,50,72][i]} height={2.5} rx={1} fill={ml}/>)}
//         {R(110,62,100,0.8,li,0)}{R(110,72,40,2.5,c)}{...lines(110,79,[100,85,92])}{R(110,102,40,2.5,c)}{...lines(110,109,[100,68])}
//       </svg>
//     );
//     // Premium
//     case "blaze": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <defs><linearGradient id="blz" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={c}/><stop offset="100%" stopColor="#ea580c"/></linearGradient></defs>
//         {R(0,0,W,H,bg,0)}{R(0,0,W,52,"url(#blz)",0)}<polygon points="140,0 220,0 220,52" fill="rgba(255,255,255,.14)"/>
//         {R(13,11,90,9,"rgba(255,255,255,.92)",2)}{R(13,24,55,4,"rgba(255,255,255,.6)",1.5)}
//         {[0,42,84].map(ox=><rect key={ox} x={13+ox} y={35} width={36} height={4} rx={8} fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.28)" strokeWidth=".6"/>)}
//         {R(13,62,38,2.5,ml)}{...lines(13,69,[175,148])}{R(13,82,44,3,c)}{...lines(13,89,[182,162,173])}{R(13,110,44,3,c)}{...lines(13,117,[182,118])}{R(13,141,32,2,ml)}{R(13,147,55,3,sl)}
//       </svg>
//     );
//     case "radiant": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}
//         <defs><radialGradient id="rad" cx="100%" cy="0%" r="80%"><stop offset="0%" stopColor={`${c}20`}/><stop offset="100%" stopColor="transparent"/></radialGradient></defs>
//         {R(0,0,W,H,"url(#rad)",0)}{R(0,0,5,H,c,0)}{R(5,0,W-5,H,`${c}06`,0)}
//         {R(18,14,88,10,"#1e1b4b",2)}{R(18,28,54,4,c,1.5)}
//         {[38,44,50].map((y,i)=><rect key={y} x={18} y={y} width={[60,50,70][i]} height={2.5} rx={1} fill={ml}/>)}
//         <circle cx={200} cy={20} r={35} fill={`${c}10`} stroke={`${c}18`} strokeWidth="1"/>
//         {R(18,64,192,1,li,0)}{R(18,74,44,3,c)}{...lines(18,81,[183,165,174])}{R(18,104,44,3,c)}{...lines(18,111,[183,120])}{R(18,142,55,3,sl)}
//       </svg>
//     );
//     case "solstice": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         <defs><linearGradient id="sol" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={`${c}18`}/><stop offset="100%" stopColor="white"/></linearGradient></defs>
//         {R(0,0,W,H,bg,0)}{R(0,0,W,68,"url(#sol)",0)}{R(0,0,W,3,c,0)}
//         {R(14,12,92,10,"#0f172a",2)}{R(14,26,58,3.5,c,1.5)}
//         {[36,42,48].map((y,i)=><rect key={y} x={14} y={y} width={[62,52,72][i]} height={2.5} rx={1} fill={ml}/>)}
//         {R(155,10,52,50,bg,6)}<rect x={155} y={10} width={52} height={50} rx={6} fill="none" stroke={`${c}30`} strokeWidth="1.5"/>
//         {[16,22,28,34,40,46].map((y,i)=><rect key={y} x={159} y={y} width={[40,30,44,24,38,20][i]} height={1.8} rx={1} fill={`${c}50`}/>)}
//         {R(14,68,192,1.5,li,0)}{R(14,78,44,3,c)}{...lines(14,85,[185,165,174])}{R(14,106,44,3,c)}{...lines(14,113,[185,118])}{R(14,144,55,3,sl)}{R(0,152,W,3,c,0)}
//       </svg>
//     );
//     case "meridian": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#f8fafc",0)}
//         {R(0,0,W,60,bg,0)}{R(0,0,W,2,c,0)}{R(0,60,W,2,c,0)}
//         {R(14,10,90,10,"#0f172a",2)}{R(14,24,56,3.5,c,1.5)}
//         {[34,40,46].map((y,i)=><rect key={y} x={14} y={y} width={[62,52,72][i]} height={2.5} rx={1} fill={ml}/>)}
//         {R(155,8,60,50,`${c}10`,6)}<rect x={155} y={8} width={60} height={50} rx={6} fill="none" stroke={`${c}20`} strokeWidth="1"/>
//         {[14,20,26,32,38,44].map((y,i)=><rect key={y} x={159} y={y} width={[44,32,48,26,40,20][i]} height={1.8} rx={1} fill={`${c}55`}/>)}
//         {R(14,72,44,3,c)}{...lines(14,79,[185,165,174])}{R(14,104,44,3,c)}{...lines(14,111,[185,118])}{R(14,140,55,3,sl)}
//       </svg>
//     );
//     case "pinnacle": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}
//         <defs><linearGradient id="pin" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={c}/><stop offset="50%" stopColor={`${c}dd`}/><stop offset="100%" stopColor={`${c}88`}/></linearGradient></defs>
//         {R(0,0,W,58,"url(#pin)",0)}<polygon points="0,58 220,40 220,58" fill="rgba(255,255,255,.12)"/>
//         <circle cx={190} cy={10} r={45} fill="rgba(255,255,255,.08)"/>
//         {R(14,11,88,9,"rgba(255,255,255,.92)",2)}{R(14,24,54,4,"rgba(255,255,255,.65)",1.5)}
//         {[0,40,82].map(ox=><rect key={ox} x={14+ox} y={36} width={34} height={4} rx={8} fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.28)" strokeWidth=".6"/>)}
//         {R(14,68,38,2.5,ml)}{...lines(14,75,[175,148])}{R(14,88,44,3,c)}{...lines(14,95,[183,165,173])}{R(14,116,44,3,c)}{...lines(14,123,[183,118])}{R(14,148,55,3,sl)}
//       </svg>
//     );
//     // Tech
//     case "circuit": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#f8faff",0)}
//         {[0,1,2,3,4,5,6].map(i=><line key={i} x1={0} y1={i*26} x2={W} y2={i*26} stroke={`${c}08`} strokeWidth="1"/>)}
//         {[0,1,2,3,4,5,6,7].map(i=><line key={i} x1={i*30} y1={0} x2={i*30} y2={H} stroke={`${c}08`} strokeWidth="1"/>)}
//         {R(0,0,4,H,c,0)}{R(14,14,90,10,"#0f172a",2)}{R(14,28,56,3.5,c,1.5)}
//         {[38,44,50].map((y,i)=><rect key={y} x={14} y={y} width={[60,50,70][i]} height={3} rx={1} fill={ca} stroke={cb} strokeWidth=".6"/>)}
//         {R(14,62,192,0.8,`${c}30`,0)}{R(14,72,44,2.5,c)}{...lines(14,79,[183,162,172])}{R(14,102,44,2.5,c)}{...lines(14,109,[183,118])}{R(14,148,55,3,"#0f172a")}
//       </svg>
//     );
//     case "blueprint": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#eff6ff",0)}
//         {[0,1,2,3,4,5].map(i=><line key={i} x1={0} y1={i*30} x2={W} y2={i*30} stroke="#bfdbfe" strokeWidth=".8"/>)}
//         {[0,1,2,3,4,5,6,7].map(i=><line key={i} x1={i*30} y1={0} x2={i*30} y2={H} stroke="#bfdbfe" strokeWidth=".8"/>)}
//         {R(14,14,92,10,"#1e3a8a",2)}{R(14,28,58,3.5,c,1.5)}
//         {[38,44,50].map((y,i)=><rect key={y} x={14} y={y} width={[62,50,72][i]} height={2.5} rx={1} fill="#3b82f6"/>)}
//         {R(14,62,192,1,"#93c5fd",0)}{R(14,72,44,2.5,c)}{...lines(14,79,[183,162,172],"#93c5fd")}{R(14,102,44,2.5,c)}{...lines(14,109,[183,118],"#93c5fd")}{R(14,148,55,3,"#1e3a8a")}
//       </svg>
//     );
//     case "axiom": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}{R(0,0,W,4,c,0)}
//         <defs><linearGradient id="axm" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={`${c}15`}/><stop offset="100%" stopColor="white"/></linearGradient></defs>
//         {R(0,4,W,52,"url(#axm)",0)}{R(14,12,90,10,"#0f172a",2)}{R(14,26,56,3.5,c,1.5)}
//         {[36,42,48].map((y,i)=><rect key={y} x={14} y={y} width={[62,50,72][i]} height={2.5} rx={1} fill={ml}/>)}
//         {R(14,60,192,2,`${c}20`,0)}{R(14,68,44,3,c)}{...lines(14,75,[185,165,175])}{R(14,96,44,3,c)}{...lines(14,103,[185,118])}{R(14,138,192,2,`${c}20`,0)}{R(14,148,55,3,sl)}
//       </svg>
//     );
//     case "signal": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,bg,0)}
//         {[20,30,40,50].map((r,i)=><circle key={i} cx={210} cy={0} r={r} fill="none" stroke={`${c}${["18","12","0c","06"][i]}`} strokeWidth="1.5"/>)}
//         {R(14,14,88,10,"#0f172a",2)}{R(14,28,54,4,c,1.5)}
//         {[38,44,50].map((y,i)=><rect key={y} x={14} y={y} width={[60,50,70][i]} height={2.5} rx={1} fill={ml}/>)}
//         {R(14,62,192,1,li,0)}{R(14,72,44,3,c)}{...lines(14,79,[185,165,175])}{R(14,100,44,3,c)}{...lines(14,107,[185,118])}{R(14,148,55,3,sl)}
//       </svg>
//     );
//     case "quantum": return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#f8fafc",0)}
//         <defs><linearGradient id="qnt" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={`${c}20`}/><stop offset="100%" stopColor={`${c}05`}/></linearGradient></defs>
//         {R(0,0,W,62,"url(#qnt)",0)}{R(0,0,3,62,c,0)}{R(3,0,W-3,3,c,0)}
//         {R(14,12,90,10,"#0f172a",2)}{R(14,26,56,3.5,c,1.5)}
//         {[36,42,48].map((y,i)=><rect key={y} x={14} y={y} width={[62,50,72][i]} height={2.5} rx={1} fill={ml}/>)}
//         {R(14,64,192,1.5,li,0)}{R(14,74,44,3,c)}{...lines(14,81,[185,165,175])}{R(14,102,44,3,c)}{...lines(14,109,[185,118])}{R(14,144,55,3,sl)}{R(0,152,W,3,`${c}40`,0)}
//       </svg>
//     );
//     default: return (
//       <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
//         {R(0,0,W,H,"#f3f4f6",0)}{R(14,14,88,9,"#374151",1.5)}{R(14,27,55,3,c)}
//         {R(14,80,44,3,c)}{...lines(14,87,[185,165,175])}{R(14,108,44,3,c)}{...lines(14,115,[185,118])}
//       </svg>
//     );
//   }
// }

// /* ─────────────────────────────────────────────────────────────
//    HTML BUILDER (unchanged core, added new templates)
// ───────────────────────────────────────────────────────────────*/
// function buildHTML(id: string, d: CLData): string {
//   const fontDef = FONT_FAMILIES.find((f) => f.id === d.fontFamily) || FONT_FAMILIES[0];
//   const fontStack = `'${d.fontFamily}',${fontDef.style}`;
//   const c = d.accentColor || "#6366f1";
//   const sig = d.personal.signature || "Sincerely";
//   const nm = d.personal.fullName || "Your Name";
//   const ttl = d.personal.title || "Professional";
//   const mgr = d.company.hiringManager || "Hiring Manager";
//   const loc = [d.company.city, d.company.state].filter(Boolean).join(", ");
//   const dt = d.letterDate
//     ? new Date(d.letterDate + "T12:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
//     : new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

//   const links: string[] = [
//     d.personal.email ? `<a href="mailto:${d.personal.email}" style="color:inherit;text-decoration:none">${d.personal.email}</a>` : "",
//     d.personal.phone ? `<a href="tel:${d.personal.phone}" style="color:inherit;text-decoration:none">${d.personal.phone}</a>` : "",
//     d.personal.location ? `<span>${d.personal.location}</span>` : "",
//     d.personal.linkedin ? `<a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank" style="color:inherit;text-decoration:none">${d.personal.linkedin}</a>` : "",
//     d.personal.github ? `<a href="https://${d.personal.github.replace(/^https?:\/\//, "")}" target="_blank" style="color:inherit;text-decoration:none">${d.personal.github}</a>` : "",
//     d.personal.website ? `<a href="https://${d.personal.website.replace(/^https?:\/\//, "")}" target="_blank" style="color:inherit;text-decoration:none">${d.personal.website}</a>` : "",
//   ].filter(Boolean);

//   const secRows = (border = false) =>
//     d.sections.filter((s) => s.content.trim()).map((s) => `
//       <div style="margin-bottom:24px${border ? `;padding-left:14px;border-left:3px solid ${c}` : ""}">
//         <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${c};margin:0 0 8px">${s.title}</h4>
//         <p style="line-height:1.85;margin:0;font-size:13.5px">${s.content.replace(/\n/g, "<br>")}</p>
//       </div>`).join("");

//   const achBlock = () => !d.achievements.length ? "" : `
//     <div style="margin:18px 0 22px">
//       <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${c};margin:0 0 10px">Key Achievements</h4>
//       ${d.achievements.map((a) => `<div style="display:flex;gap:9px;margin-bottom:7px;font-size:13px"><span style="color:${c};flex-shrink:0;line-height:1.5">›</span>${a}</div>`).join("")}
//     </div>`;

//   const skillBlock = () => !d.skills.length ? "" : `
//     <div style="margin:16px 0 22px">
//       <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${c};margin:0 0 10px">Core Skills</h4>
//       <div style="display:flex;flex-wrap:wrap;gap:7px">${d.skills.map((s) => `<span style="padding:4px 12px;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.08);border-radius:30px;font-size:12px">${s}</span>`).join("")}</div>
//     </div>`;

//   const notesBlock = d.notes ? `<div style="margin:14px 0;padding:12px 16px;background:rgba(0,0,0,.03);border-left:3px solid #e2e8f0;font-size:12.5px;line-height:1.7;color:#64748b">${d.notes}</div>` : "";
//   const summaryBlock = d.personal.summary ? `<div style="margin-bottom:20px;padding:14px 16px;background:rgba(0,0,0,.03);border-radius:8px;font-size:13px;line-height:1.75;color:#4a5568;font-style:italic">"${d.personal.summary}"</div>` : "";
//   const referralNote = d.company.referral ? `<div style="margin-bottom:14px;font-size:13px;color:#6b7280">Referred by: <strong style="color:#374151">${d.company.referral}</strong></div>` : "";

//   const addrBlock = `<div style="margin-bottom:20px;font-size:13px;line-height:1.9;color:#4a5568"><strong style="color:#1a202c">${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>${d.company.name}${loc ? `<br>${loc}` : ""}</div>`;
//   const greet = () => `<div style="font-size:16px;font-weight:600;margin-bottom:22px;color:#111827">Dear ${mgr},</div>`;

//   const closingDiv = (col = c) => `
//     <div style="margin-top:36px;font-size:13.5px">
//       ${sig},<br><br>
//       <strong style="font-size:15px">${nm}</strong>
//       ${d.personal.email ? `<br><a href="mailto:${d.personal.email}" style="font-size:12px;color:${col};text-decoration:none">${d.personal.email}</a>` : ""}
//       ${d.personal.phone ? `<br><span style="font-size:12px;color:#64748b">${d.personal.phone}</span>` : ""}
//       ${d.personal.linkedin ? `<br><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" style="font-size:11.5px;color:${col};text-decoration:none" target="_blank">${d.personal.linkedin}</a>` : ""}
//     </div>`;

//   const baseCSS = (extra = "") =>
//     `@import url('${fontDef.url}');*{margin:0;padding:0;box-sizing:border-box}html,body{background:#ffffff}body{font-family:${fontStack};color:#374151;background:#ffffff;-webkit-print-color-adjust:exact;print-color-adjust:exact}${extra}`;
//   const baseHTML = (css: string, body: string) =>
//     `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${css}</style></head><body>${body}</body></html>`;

//   const chipsHTML = `<div style="display:flex;flex-wrap:wrap;gap:7px">${links.map((l) => `<span style="padding:5px 14px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.32);border-radius:40px;font-size:11.5px;color:white">${l}</span>`).join("")}</div>`;

//   const standardBody = (accent: string, border = false) =>
//     `<div style="font-size:12.5px;color:#9ca3af;margin-bottom:22px">${dt}</div>${addrBlock}${referralNote}${greet()}${summaryBlock}${secRows(border)}${achBlock()}${skillBlock()}${notesBlock}${closingDiv(accent)}`;

//   const headerChipStyle = `.pg{max-width:860px;margin:0 auto;background:#fff}.hdr{padding:52px 56px 44px;color:white;position:relative;overflow:hidden}.nm{font-size:38px;font-weight:700;letter-spacing:-1.5px;margin-bottom:5px;position:relative}.rl{font-size:14px;opacity:.85;margin-bottom:26px;position:relative}.chips{display:flex;flex-wrap:wrap;gap:7px;position:relative}.chip{padding:5px 14px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.32);border-radius:40px;font-size:11.5px;color:white}.chip a{color:white;text-decoration:none}.body{padding:48px 56px;background:#fff}`;

//   // Shared header templates
//   if (["aurora","vivid","nova","frost","brushstroke","vortex","blaze","pinnacle"].includes(id)) {
//     const bgMap: Record<string, string> = {
//       aurora: `background:linear-gradient(135deg,${c},${c}bb)`,
//       vivid: `background:linear-gradient(135deg,${c},#ec4899)`,
//       nova: `background:${c}`,
//       frost: `background:linear-gradient(135deg,rgba(12,74,110,.92),rgba(2,132,199,.9))`,
//       brushstroke: `background:${c}`,
//       vortex: `background:${c}`,
//       blaze: `background:linear-gradient(110deg,${c},#ea580c)`,
//       pinnacle: `background:linear-gradient(135deg,${c},${c}dd,${c}88)`,
//     };
//     return baseHTML(baseCSS(headerChipStyle),
//       `<div class="pg"><div class="hdr" style="${bgMap[id]||`background:${c}`}">
//       <div class="nm">${nm}</div><div class="rl">${ttl}</div>${chipsHTML}</div>
//       <div class="body">${standardBody(c)}</div></div>`);
//   }

//   if (id === "canvas") return baseHTML(baseCSS(`.pg{max-width:820px;margin:0 auto;padding:60px 64px;background:#fff}.accent{width:4px;background:${c};border-radius:2px;height:72px;float:left;margin-right:20px;margin-top:2px}.nm{font-size:38px;font-weight:800;letter-spacing:-1.5px;color:#111827}.rl{font-size:13px;color:${c};font-weight:600;margin-top:5px;letter-spacing:.5px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 16px;margin-top:10px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}.div{height:1px;background:#f3f4f6;margin:28px 0;clear:both}`),
//     `<div class="pg"><div class="accent"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`);

//   if (id === "gradient") return baseHTML(baseCSS(`.pg{max-width:820px;margin:0 auto;padding:60px 64px;background:#fff;border-left:6px solid ${c}}.nm{font-size:38px;font-weight:800;letter-spacing:-1.5px;color:#111827}.rl{font-size:13px;color:${c};font-weight:600;margin-top:5px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 16px;margin-top:10px;margin-bottom:28px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}.div{height:1px;background:#f3f4f6;margin:20px 0}`),
//     `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`);

//   if (id === "tidal") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;background:#fff}.top{height:4px;background:${c}}.tb{background:${c}12;padding:2px 0}.hdr{padding:32px 52px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}.nm{font-size:36px;font-weight:800;color:#0f172a;letter-spacing:-1.5px}.rl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${c};margin-top:6px}.cc{text-align:right;font-size:12px;color:#9ca3af}.cv{display:block;margin-bottom:3px}.cv a{color:${c};text-decoration:none}.body{padding:40px 52px}`),
//     `<div class="pg"><div class="top"></div><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div><div class="cc">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div></div>`);

//   if (id === "horizon") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;background:#f8fafc}.top{height:3px;background:linear-gradient(90deg,${c},${c}44)}.hdr{padding:40px 52px;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:20px}.nm{font-size:36px;font-weight:800;color:#0f172a;letter-spacing:-1.5px}.rl{font-size:13px;color:${c};font-weight:600;margin-top:6px;margin-bottom:14px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 14px}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.card{background:${c}08;border:1px solid ${c}20;border-radius:10px;padding:14px 18px;min-width:140px}.card-l{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:${c};margin-bottom:5px}.card-v{font-size:12px;font-weight:700;color:#0f172a;line-height:1.4}.body{padding:36px 52px}`),
//     `<div class="pg"><div class="top"></div><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div></div>${d.company.name?`<div class="card"><div class="card-l">Applying To</div><div class="card-v">${d.company.jobTitle||"Open Role"}<br><span style="font-size:11px;font-weight:400;color:#64748b">${d.company.name}</span></div></div>`:""}</div><div class="body">${standardBody(c)}</div></div>`);

//   if (id === "lumina") return baseHTML(baseCSS(`.pg{max-width:860px;margin:0 auto;padding:64px 68px;background:#fff}.eyebrow{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-bottom:10px}.nm{font-size:44px;font-weight:800;letter-spacing:-2px;color:#111827;line-height:1}.glow{width:48px;height:3px;background:${c};margin:16px 0 18px;border-radius:2px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:36px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}.div{height:1px;background:${c}22;margin:24px 0}`),
//     `<div class="pg"><div class="eyebrow">${ttl}</div><div class="nm">${nm}</div><div class="glow"></div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`);

//   if (id === "obsidian_lite") return baseHTML(baseCSS(`.pg{max-width:900px;margin:0 auto;display:flex;min-height:100vh;background:#f8f7ff}.side{width:240px;background:${c}12;border-right:2px solid ${c}20;padding:44px 24px;flex-shrink:0}.snm{font-size:22px;font-weight:800;color:#1e1b4b;line-height:1.2;margin-bottom:6px}.srl{font-size:10px;color:${c};letter-spacing:1.5px;text-transform:uppercase;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid ${c}20}.slbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:${c}aa;margin-bottom:5px;margin-top:16px}.sv{font-size:11.5px;color:#374151;line-height:1.9;word-break:break-all}.sv a{color:${c};text-decoration:none}.main{flex:1;padding:48px 44px;background:#fff}`),
//     `<div class="pg"><div class="side"><div class="snm">${nm}</div><div class="srl">${ttl}</div>
//     ${d.personal.email?`<div class="slbl">Email</div><div class="sv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></div>`:""}
//     ${d.personal.phone?`<div class="slbl">Phone</div><div class="sv">${d.personal.phone}</div>`:""}
//     ${d.personal.location?`<div class="slbl">Location</div><div class="sv">${d.personal.location}</div>`:""}
//     ${d.personal.linkedin?`<div class="slbl">LinkedIn</div><div class="sv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//,"")}" target="_blank">${d.personal.linkedin}</a></div>`:""}
//     ${d.skills.length?`<div class="slbl" style="margin-top:20px">Skills</div><div style="margin-top:6px">${d.skills.map(s=>`<div style="font-size:11px;color:${c};margin-bottom:3px">• ${s}</div>`).join("")}</div>`:""}
//     </div><div class="main">${standardBody(c)}</div></div>`);

//   if (id === "slate") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;background:#fff}.hdr{padding:44px 52px;border-bottom:3px solid #0f172a;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}.nm{font-size:34px;font-weight:700;color:#0f172a;letter-spacing:-1.5px}.rl{font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-top:7px}.cc{text-align:right}.cv{font-size:11.5px;color:#475569;line-height:2.1;display:block}.cv a{color:${c};text-decoration:none}.tag{display:inline-block;font-size:10.5px;color:#64748b;background:#f1f5f9;border:1px solid #e2e8f0;padding:3px 10px;border-radius:4px;margin-bottom:22px}.body{padding:40px 52px}`),
//     `<div class="pg"><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div><div class="cc">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div></div><div class="body"><div class="tag">RE: ${d.company.jobTitle||"Open Position"} · ${d.company.name||"Company"}</div>${standardBody(c,true)}</div></div>`);

//   if (id === "architect") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;background:#f8fafc}.hdr{padding:44px 52px;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap}.hl{flex:1}.nm{font-size:34px;font-weight:800;color:#0f172a;letter-spacing:-1.5px}.rl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-top:7px;margin-bottom:14px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 14px}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.hr{width:130px;flex-shrink:0;background:#0f172a;border-radius:12px;padding:16px;text-align:center}.hrl{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#94a3b8;margin-bottom:6px}.hrr{font-size:11px;font-weight:700;color:white;line-height:1.4}.body{padding:36px 52px;background:#f8fafc}`),
//     `<div class="pg"><div class="hdr"><div class="hl"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div></div>${d.company.name?`<div class="hr"><div class="hrl">Applying to</div><div class="hrr">${d.company.jobTitle||"Open Role"}<br><span style="font-size:10px;font-weight:400;opacity:.7">${d.company.name}</span></div></div>`:""}</div><div class="body">${standardBody(c,true)}</div></div>`);

//   if (id === "nordic") return baseHTML(baseCSS(`.pg{max-width:750px;margin:0 auto;padding:64px 72px;background:#fff}.eye{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-bottom:10px}.nm{font-size:44px;font-weight:700;letter-spacing:-2px;color:#1e1b4b;line-height:1.05}.bar{width:52px;height:3px;background:${c};margin:16px 0 18px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:40px}.cv{font-size:12px;color:#6b7280}.cv a{color:${c};text-decoration:none}.div{height:1px;background:${c}44;margin:24px 0}`),
//     `<div class="pg"><div class="eye">${ttl}</div><div class="nm">${nm}</div><div class="bar"></div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`);

//   if (id === "pearl") return baseHTML(baseCSS(`.pg{max-width:820px;margin:0 auto;padding:60px 64px;background:#fff}.nm{font-size:40px;font-weight:800;letter-spacing:-2px;color:#111827;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:700;letter-spacing:.5px;margin-bottom:16px}.d1{height:1.5px;background:${c}33;margin-bottom:16px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 20px;margin-bottom:16px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}.d2{height:1.5px;background:${c}33;margin:20px 0}`),
//     `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="d1"></div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="d2"></div>${standardBody(c)}</div>`);

//   if (id === "minimal") return baseHTML(baseCSS(`.pg{max-width:760px;margin:0 auto;padding:70px 80px;background:#fff;border:1px solid #f1f5f9}.nm{font-size:36px;font-weight:700;color:#111;letter-spacing:-1px;margin-bottom:6px}.rl{font-size:12.5px;color:#555;margin-bottom:20px}.div{height:1px;background:#ececec;margin:18px 0}.ctrow{display:flex;flex-wrap:wrap;gap:4px 20px;margin-bottom:12px}.cv{font-size:12px;color:#888}.cv a{color:${c};text-decoration:none;border-bottom:1px solid ${c}33}`),
//     `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div"></div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`);

//   if (id === "zen") return baseHTML(baseCSS(`.pg{max-width:760px;margin:0 auto;padding:68px 76px;background:#fafaf9}.nm{font-size:36px;font-weight:700;color:#1c1917;letter-spacing:-.5px;margin-bottom:6px}.rl{font-size:13px;color:#78716c;margin-bottom:20px}.div{height:.5px;background:#d6d3d1;margin:18px 0}.ctrow{display:flex;flex-wrap:wrap;gap:4px 18px;margin-bottom:12px}.cv{font-size:12px;color:#78716c}.cv a{color:${c};text-decoration:none}`),
//     `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div"></div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`);

//   if (id === "ivory") return baseHTML(baseCSS(`.pg{max-width:820px;margin:0 auto;background:#fefce8;padding:60px 64px;border-left:5px solid ${c}}.nm{font-size:44px;font-weight:700;color:#1c1917;letter-spacing:-.5px;line-height:1.1}.rl{font-size:13px;color:#92400e;font-style:italic;margin:8px 0 16px}.div{height:1px;background:${c}66;margin:16px 0}.ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:14px}.cv{font-size:12px;color:#78716c}.cv a{color:${c};text-decoration:none}`),
//     `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div"></div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`);

//   if (id === "paper") return baseHTML(baseCSS(`.pg{max-width:820px;margin:0 auto;background:#fffef0;padding:60px 64px 60px 80px;border-left:3px solid #ca8a04}.nm{font-size:42px;font-weight:700;color:#1a1209;letter-spacing:-.5px;line-height:1.1}.rl{font-size:13px;color:${c};font-style:italic;margin:8px 0 16px}.div{height:.8px;background:#d0ccb0;margin:16px 0}.ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:14px}.cv{font-size:12px;color:#6b6050}.cv a{color:${c};text-decoration:none}`),
//     `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div"></div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`);

//   if (id === "serif") return baseHTML(baseCSS(`.pg{max-width:820px;margin:0 auto;padding:52px 64px;background:#fff}.r1{height:2px;background:#1e293b;margin-bottom:20px}.nm{font-size:42px;font-weight:900;color:#1e293b;letter-spacing:-1.5px;text-align:center;margin-bottom:6px}.rl{font-size:12px;color:#64748b;text-align:center;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px}.ctrow{display:flex;justify-content:center;flex-wrap:wrap;gap:5px 20px;margin-bottom:16px}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.r2{height:1px;background:#e5e7eb;margin-bottom:20px}`),
//     `<div class="pg"><div class="r1"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="r2"></div>${standardBody(c)}</div>`);

//   if (id === "editorial") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;background:#fff}.top{height:4px;background:${c}}.hdr{padding:44px 52px 0}.nm{font-size:36px;font-weight:800;color:#1e293b;letter-spacing:-1.5px}.rl{font-size:13px;color:${c};font-weight:600;margin:6px 0 14px}.rule{height:1.5px;background:#334155;margin-bottom:14px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 16px;padding-bottom:16px;border-bottom:1px solid #e2e8f0}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.body{padding:36px 52px}`),
//     `<div class="pg"><div class="top"></div><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="rule"></div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div></div>`);

//   if (id === "linen") return baseHTML(baseCSS(`.pg{max-width:800px;margin:0 auto;padding:62px 68px;background:#faf8f5}.accent{width:3px;height:80px;background:${c}66;float:left;margin-right:18px;border-radius:2px;margin-top:2px}.nm{font-size:40px;font-weight:700;color:#1c1917;letter-spacing:-1px;line-height:1.1}.rl{font-size:13px;color:${c};font-weight:600;margin-top:6px;margin-bottom:18px;clear:both}.div{height:1px;background:#e7e5e0;margin:18px 0}.ctrow{display:flex;flex-wrap:wrap;gap:4px 18px;margin-bottom:14px}.cv{font-size:12px;color:#78716c}.cv a{color:${c};text-decoration:none}`),
//     `<div class="pg"><div class="accent"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div"></div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`);

//   if (id === "parchment") return baseHTML(baseCSS(`.pg{max-width:800px;margin:0 auto;padding:56px 68px;background:#fdf8ed}.r1{height:2px;background:${c}66;margin-bottom:3px}.r2{height:.5px;background:${c}33;margin-bottom:18px}.nm{font-size:40px;font-weight:800;color:#2c1a0e;text-align:center;letter-spacing:-1.5px;margin-bottom:4px}.rl{font-size:11px;color:#8a7060;text-align:center;letter-spacing:3px;text-transform:uppercase;margin-bottom:10px}.ctrow{display:flex;justify-content:center;flex-wrap:wrap;gap:4px 18px;margin-bottom:6px}.cv{font-size:12px;color:#78716c}.cv a{color:${c};text-decoration:none}.r3{height:.5px;background:${c}33;margin-top:12px;margin-bottom:20px}.r4{height:2px;background:${c}66}`),
//     `<div class="pg"><div class="r1"></div><div class="r2"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="r3"></div>${standardBody(c)}<div class="r4"></div></div>`);

//   if (id === "designer") return baseHTML(baseCSS(`.pg{max-width:900px;margin:0 auto;display:flex;min-height:100vh;background:#faf5ff}.side{width:260px;background:${c}10;border-right:2px solid ${c}20;padding:44px 26px;flex-shrink:0}.savatar{width:52px;height:52px;border-radius:50%;background:${c}22;border:2px solid ${c}44;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:20px;color:${c}}.snm{font-size:22px;font-weight:800;color:#1a1a2e;line-height:1.15;margin-bottom:6px}.srl{font-size:10px;color:${c};letter-spacing:2px;text-transform:uppercase;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid ${c}22}.slbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:${c}88;margin-bottom:5px;margin-top:18px}.sv{font-size:11px;color:#374151;line-height:1.9}.sv a{color:${c};text-decoration:none}.main{flex:1;padding:48px 44px;background:#fff}`),
//     `<div class="pg"><div class="side"><div class="savatar">✦</div><div class="snm">${nm}</div><div class="srl">${ttl}</div>${d.personal.email?`<div class="slbl">Email</div><div class="sv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></div>`:""} ${d.personal.phone?`<div class="slbl">Phone</div><div class="sv">${d.personal.phone}</div>`:""} ${d.personal.location?`<div class="slbl">Location</div><div class="sv">${d.personal.location}</div>`:""} ${d.personal.linkedin?`<div class="slbl">LinkedIn</div><div class="sv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//,"")}" target="_blank">${d.personal.linkedin}</a></div>`:""} ${d.skills.length?`<div class="slbl" style="margin-top:22px">Skills</div><div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px">${d.skills.map(s=>`<span style="padding:2px 8px;background:${c}15;border:1px solid ${c}30;border-radius:4px;font-size:10px;color:${c}">${s}</span>`).join("")}</div>`:""}</div><div class="main">${standardBody(c)}</div></div>`);

//   if (id === "motion") return baseHTML(baseCSS(`.pg{max-width:860px;margin:0 auto;background:#fff}.tb{height:5.5px;background:linear-gradient(90deg,${c},#f59e0b)}.hdr{padding:44px 52px;border-bottom:1px solid #f3e4e4;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}.nm{font-size:48px;font-weight:900;letter-spacing:-3px;text-transform:uppercase;line-height:.95;color:#111827}.rl{font-size:13px;color:${c};letter-spacing:2px;text-transform:uppercase;margin-top:8px;font-weight:600}.cc{text-align:right;font-size:12px;color:#9ca3af}.cv{display:block;margin-bottom:4px}.cv a{color:${c};text-decoration:none}.body{padding:44px 52px}.bb{height:5.5px;background:linear-gradient(90deg,#f59e0b,${c})}`),
//     `<div class="pg"><div class="tb"></div><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div><div class="cc">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div><div class="bb"></div></div>`);

//   if (id === "studio") return baseHTML(baseCSS(`.pg{max-width:860px;margin:0 auto;background:#f8f5ff}.top{height:3px;background:linear-gradient(90deg,${c},${c}44)}.hdr{padding:48px 52px 36px;border-bottom:1px solid ${c}18}.nm{font-size:40px;font-weight:800;color:#1e1b4b;letter-spacing:-1.5px;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:600;margin-bottom:18px}.chips{display:flex;flex-wrap:wrap;gap:7px}.chip{padding:4px 12px;background:${c}10;border:1px solid ${c}25;border-radius:20px;font-size:11.5px;color:${c}}.body{padding:44px 52px;background:#fff}`),
//     `<div class="pg"><div class="top"></div><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="chips">${links.map(l=>`<span class="chip">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div></div>`);

//   if (id === "folio") return baseHTML(baseCSS(`.pg{max-width:820px;margin:0 auto;padding:52px 64px;background:#fff}.hrow{display:flex;align-items:flex-start;gap:28px;margin-bottom:30px;padding-bottom:24px;border-bottom:2px solid ${c}22}.avatar{width:64px;height:64px;border-radius:12px;background:${c}22;border:2px solid ${c}44;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;color:${c}}.hinfo .nm{font-size:34px;font-weight:800;color:#111827;letter-spacing:-1.5px}.hinfo .rl{font-size:13px;color:${c};font-weight:600;margin-top:4px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:8px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}`),
//     `<div class="pg"><div class="hrow"><div class="avatar">✦</div><div class="hinfo"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div></div></div>${standardBody(c)}</div>`);

//   if (id === "artboard") return baseHTML(baseCSS(`.pg{max-width:820px;margin:0 auto;background:#f4f3f8;padding:8px}.card{background:#fff;border-radius:8px;overflow:hidden;border:1.5px dashed ${c}44}.top{height:3px;background:${c}}.hdr{padding:40px 52px 28px}.nm{font-size:36px;font-weight:800;color:#111827;letter-spacing:-1.5px}.rl{font-size:13px;color:${c};font-weight:600;margin-top:5px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:10px;margin-bottom:4px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}.body{padding:28px 52px 52px}`),
//     `<div class="pg"><div class="card"><div class="top"></div><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div></div></div>`);

//   if (id === "palette") return baseHTML(baseCSS(`.pg{max-width:820px;margin:0 auto;padding:60px 64px;background:#fff7f5;border-left:4px solid ${c}}.nm{font-size:40px;font-weight:800;color:#1c0a06;letter-spacing:-1.5px;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:600;margin-bottom:18px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:14px}.cv{font-size:12px;color:#78716c}.cv a{color:${c};text-decoration:none}.div{height:1px;background:#fce7e0;margin:18px 0}`),
//     `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`);

//   if (id === "frame") return baseHTML(baseCSS(`.pg{max-width:820px;margin:0 auto;padding:16px;background:#fafafa}.inner{background:#fff;border:2px solid ${c};border-radius:10px;padding:44px 52px;overflow:hidden}.nm{font-size:38px;font-weight:800;color:#111827;letter-spacing:-1.5px;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:600;margin-bottom:14px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 16px;margin-bottom:14px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}.div{height:1px;background:${c}20;margin:18px 0}`),
//     `<div class="pg"><div class="inner"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div></div>`);

//   if (id === "mosaic") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;background:#fff}.hdr{padding:44px 52px;display:flex;gap:24px;align-items:center;border-bottom:1px solid #f0f0f0}.mosaic{display:grid;grid-template-columns:repeat(3,34px);grid-template-rows:repeat(3,34px);gap:2px;flex-shrink:0}.cell{border-radius:4px}.nm{font-size:34px;font-weight:800;color:#111827;letter-spacing:-1.5px}.rl{font-size:13px;color:${c};font-weight:600;margin:6px 0 12px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 14px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}.body{padding:36px 52px}`),
//     `<div class="pg"><div class="hdr"><div class="mosaic">${[...Array(9)].map((_,i)=>`<div class="cell" style="background:${i%3===0?c:i%3===1?`${c}66`:`${c}22`}"></div>`).join("")}</div><div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div></div></div><div class="body">${standardBody(c)}</div></div>`);

//   if (id === "presidio") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;background:#fafafa}.top{height:2px;background:${c}}.hdr{padding:44px 52px;background:#fff;border-bottom:1px solid #e5e7eb}.nm{font-size:36px;font-weight:800;color:#111827;letter-spacing:-1.5px;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:600;margin-bottom:16px}.inforow{display:flex;gap:0;background:${c}08;border:1px solid ${c}15;border-radius:8px;padding:10px 14px;margin-bottom:4px;flex-wrap:wrap;gap:16px}.cv{font-size:12px;color:#374151}.cv a{color:${c};text-decoration:none}.body{padding:36px 52px}`),
//     `<div class="pg"><div class="top"></div><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="inforow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div></div>`);

//   if (id === "accord") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;background:#fff}.top{height:4px;background:linear-gradient(90deg,${c},${c}44)}.hdr{padding:40px 52px;border-bottom:2px solid #f1f5f9}.nm{font-size:36px;font-weight:800;color:#0f172a;letter-spacing:-1.5px;margin-bottom:6px}.rl{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-bottom:14px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 18px}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.body{padding:36px 52px}`),
//     `<div class="pg"><div class="top"></div><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div></div>`);

//   if (id === "radiant") return baseHTML(baseCSS(`.pg{max-width:860px;margin:0 auto;padding:62px 68px;background:#fff;border-left:5px solid ${c};position:relative}.nm{font-size:44px;font-weight:800;letter-spacing:-2px;color:#1e1b4b;line-height:1;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:600;margin-bottom:20px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:36px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}.div{height:1px;background:${c}20;margin:22px 0}`),
//     `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`);

//   if (id === "solstice") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;background:#fff}.topbar{height:3px;background:${c}}.hdr{padding:44px 52px;background:${c}08;border-bottom:2px solid ${c}18;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px}.nm{font-size:36px;font-weight:800;color:#0f172a;letter-spacing:-1.5px}.rl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${c};margin-top:6px;margin-bottom:14px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 14px}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.card{background:#fff;border:1px solid ${c}20;border-radius:10px;padding:14px 18px}.card-l{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:${c};margin-bottom:4px}.card-v{font-size:12px;font-weight:700;color:#0f172a;line-height:1.4}.body{padding:36px 52px}.bot{height:3px;background:${c}}`),
//     `<div class="pg"><div class="topbar"></div><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div></div>${d.company.name?`<div class="card"><div class="card-l">Position</div><div class="card-v">${d.company.jobTitle||"Open Role"}<br><span style="font-size:11px;font-weight:400;color:#64748b">${d.company.name}</span></div></div>`:""}</div><div class="body">${standardBody(c)}</div><div class="bot"></div></div>`);

//   if (id === "meridian") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;background:#f8fafc}.top{height:2px;background:${c}}.tb2{height:2px;background:${c};margin-top:62px}.hdr{padding:28px 52px 28px;background:#fff;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}.nm{font-size:34px;font-weight:800;color:#0f172a;letter-spacing:-1.5px}.rl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${c};margin-top:5px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 14px;margin-top:8px}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.badge{background:${c};border-radius:8px;padding:12px 18px;text-align:center}.badge-t{font-size:9px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.75);margin-bottom:3px}.badge-v{font-size:11px;font-weight:700;color:#fff;line-height:1.4}.body{padding:32px 52px}`),
//     `<div class="pg"><div class="top"></div><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div></div>${d.company.name?`<div class="badge"><div class="badge-t">Applying To</div><div class="badge-v">${d.company.jobTitle||"Role"}<br><span style="font-size:10px;opacity:.8">${d.company.name}</span></div></div>`:""}</div><div class="tb2"></div><div class="body">${standardBody(c)}</div></div>`);

//   // Tech templates
//   if (id === "circuit") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;background:#f8faff;padding:60px 64px}.nm{font-size:38px;font-weight:800;color:#0f172a;letter-spacing:-1.5px;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:600;margin-bottom:18px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 16px;margin-bottom:14px}.cv{font-size:12px;color:#64748b;padding:3px 10px;background:${c}08;border:1px solid ${c}18;border-radius:6px}.cv a{color:${c};text-decoration:none}.div{height:1px;background:${c}18;margin:20px 0}`),
//     `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`);

//   if (id === "blueprint") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;background:#eff6ff;padding:60px 64px}.nm{font-size:38px;font-weight:800;color:#1e3a8a;letter-spacing:-1.5px;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:600;margin-bottom:18px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 16px;margin-bottom:14px}.cv{font-size:12px;color:#3b82f6}.cv a{color:${c};text-decoration:none}.div{height:1px;background:#93c5fd;margin:20px 0}`),
//     `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`);

//   if (id === "axiom") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;background:#fff}.top{height:4px;background:${c}}.stripe{background:${c}08;padding:2px 0}.hdr{padding:38px 52px;border-bottom:2px solid ${c}15}.nm{font-size:36px;font-weight:800;color:#0f172a;letter-spacing:-1.5px;margin-bottom:6px}.rl{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-bottom:14px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 16px}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.body{padding:36px 52px}.bot{height:2px;background:${c}15}`),
//     `<div class="pg"><div class="top"></div><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div><div class="bot"></div></div>`);

//   if (id === "signal") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;padding:60px 64px;background:#fff}.top{position:relative}.nm{font-size:42px;font-weight:800;color:#0f172a;letter-spacing:-2px;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:600;margin-bottom:20px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:14px}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.div{height:1px;background:#e2e8f0;margin:20px 0}`),
//     `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`);

//   if (id === "quantum") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;background:#f8fafc}.accent-corner{position:absolute;top:0;left:0;width:0;height:0;border-style:solid;border-width:60px 60px 0 0;border-color:${c} transparent transparent transparent}.hdr{padding:48px 52px;background:#fff;border-bottom:1px solid #e2e8f0;position:relative;overflow:hidden}.nm{font-size:38px;font-weight:800;color:#0f172a;letter-spacing:-1.5px;margin-bottom:6px;position:relative}.rl{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-bottom:16px;position:relative}.ctrow{display:flex;flex-wrap:wrap;gap:5px 16px;position:relative}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.body{padding:36px 52px}.bot{height:3px;background:${c}44}`),
//     `<div class="pg"><div class="hdr"><div class="accent-corner"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div><div class="bot"></div></div>`);

//   // Remaining originals
//   if (id === "corporate") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;background:#fff}.hdr{padding:0 52px;background:#1e3a5f;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;min-height:70px}.hdr-l{padding:18px 0}.nm{font-size:28px;font-weight:800;color:white;letter-spacing:-1px}.rl{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-top:4px}.cv{font-size:11px;color:rgba(255,255,255,.7);line-height:2;display:block}.cv a{color:${c};text-decoration:none}.stripe{height:5px;background:${c}}.body{padding:36px 52px}`),
//     `<div class="pg"><div class="hdr"><div class="hdr-l"><div class="nm">${nm}</div><div class="rl">${ttl}</div></div><div>${links.slice(0,4).map(l=>`<span class="cv">${l}</span>`).join("")}</div></div><div class="stripe"></div><div class="body">${standardBody(c)}</div></div>`);

//   if (id === "executive") return baseHTML(baseCSS(headerChipStyle+`.hdr{background:linear-gradient(135deg,${c},${c}cc)!important}`),
//     `<div class="pg"><div class="hdr" style="background:linear-gradient(135deg,${c},${c}cc)"><div class="nm">${nm}</div><div class="rl">${ttl}</div>${chipsHTML}</div><div class="body">${standardBody(c)}</div></div>`);

//   if (id === "titan") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;background:#fff;border-left:8px solid ${c}}.hdr{padding:44px 48px;border-bottom:2px solid #e5e7eb}.nm{font-size:36px;font-weight:800;color:#1f2937;letter-spacing:-1.5px}.rl{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-top:7px;margin-bottom:14px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 18px}.cv{font-size:12px;color:#6b7280}.cv a{color:${c};text-decoration:none}.body{padding:36px 48px}`),
//     `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div></div>`);

//   if (id === "oxford") return baseHTML(baseCSS(`.pg{max-width:800px;margin:0 auto;padding:56px 68px;background:#faf9f7}.rule{height:2px;background:${c};margin-bottom:3px}.rule2{height:.5px;background:${c}66;margin-bottom:18px}.nm{font-size:40px;font-weight:800;color:#1a1209;text-align:center;letter-spacing:-1.5px;margin-bottom:4px}.rl{font-size:11px;color:${c};text-align:center;letter-spacing:3px;text-transform:uppercase;margin-bottom:10px}.ctrow{display:flex;justify-content:center;flex-wrap:wrap;gap:4px 18px;margin-bottom:6px}.cv{font-size:12px;color:#78716c}.cv a{color:${c};text-decoration:none}.rule3{height:.5px;background:${c}66;margin-top:12px;margin-bottom:20px}`),
//     `<div class="pg"><div class="rule"></div><div class="rule2"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="rule3"></div>${standardBody(c)}</div>`);

//   if (id === "summit") return baseHTML(baseCSS(`.pg{max-width:880px;margin:0 auto;background:#fff}.top{height:3px;background:${c}}.hdr{padding:40px 52px;background:#1e293b;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}.nm{font-size:34px;font-weight:800;color:white;letter-spacing:-1.5px}.rl{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-top:6px}.badge{background:${c};border-radius:8px;padding:12px 18px;text-align:center}.badge-t{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.75);margin-bottom:4px}.badge-r{font-size:12px;font-weight:700;color:white;line-height:1.4}.ctbar{display:flex;flex-wrap:wrap;background:#0f172a}.cv{font-size:11px;color:#94a3b8;padding:8px 20px;border-right:1px solid rgba(255,255,255,.06)}.cv a{color:${c};text-decoration:none}.body{padding:36px 52px}.bot{height:3px;background:${c}}`),
//     `<div class="pg"><div class="top"></div><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>${d.company.name?`<div class="badge"><div class="badge-t">Applying To</div><div class="badge-r">${d.company.jobTitle||"Role"}<br><span style="font-size:10px;font-weight:400;opacity:.8">${d.company.name}</span></div></div>`:""}</div><div class="ctbar">${links.map(l=>`<span class="cv">${l}</span>`).join("")}</div><div class="body">${standardBody(c)}</div><div class="bot"></div></div>`);

//   if (id === "prism") return baseHTML(baseCSS(headerChipStyle),
//     `<div class="pg"><div class="hdr" style="background:${c}"><div style="position:absolute;right:0;top:0;bottom:0;width:55%;background:rgba(255,255,255,.1);clip-path:polygon(25% 0,100% 0,100% 100%,0 100%)"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div>${chipsHTML}</div><div class="body">${standardBody(c)}</div></div>`);

//   // Fallback
//   return baseHTML(baseCSS(headerChipStyle),
//     `<div class="pg"><div class="hdr" style="background:linear-gradient(135deg,${c},${c}bb)"><div class="nm">${nm}</div><div class="rl">${ttl}</div>${chipsHTML}</div><div class="body">${standardBody(c)}</div></div>`);
// }

// /* ─────────────────────────────────────────────────────────────
//    COLOR PALETTE OPTIONS
// ───────────────────────────────────────────────────────────────*/
// const COLOR_PALETTES = [
//   { label: "Indigo", value: "#6366f1" },
//   { label: "Violet", value: "#7c3aed" },
//   { label: "Purple", value: "#9333ea" },
//   { label: "Sky", value: "#0369a1" },
//   { label: "Teal", value: "#0d9488" },
//   { label: "Emerald", value: "#059669" },
//   { label: "Amber", value: "#d97706" },
//   { label: "Rose", value: "#e11d48" },
//   { label: "Orange", value: "#ea580c" },
//   { label: "Slate", value: "#334155" },
//   { label: "Navy", value: "#1e3a5f" },
//   { label: "Maroon", value: "#9f1239" },
// ];

// /* ─────────────────────────────────────────────────────────────
//    STEPS
// ───────────────────────────────────────────────────────────────*/
// type Step = "template" | "personal" | "company" | "content" | "review";
// const STEPS: { id: Step; label: string; icon: string }[] = [
//   { id: "template", label: "Template", icon: "🎨" },
//   { id: "personal", label: "Personal", icon: "👤" },
//   { id: "company", label: "Company", icon: "🏢" },
//   { id: "content", label: "Content", icon: "✍️" },
//   { id: "review", label: "Review", icon: "✅" },
// ];

// /* ─────────────────────────────────────────────────────────────
//    FIELD HELPER
// ───────────────────────────────────────────────────────────────*/
// function F({ label, icon, required, children }: { label: string; icon?: string; required?: boolean; children: React.ReactNode }) {
//   return (
//     <div className="mb-3.5">
//       <label className="block text-[10.5px] font-bold tracking-wide uppercase text-slate-500 mb-1.5">
//         {label}{required && <span className="text-red-500"> *</span>}
//       </label>
//       <div className="relative">
//         {icon && <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[13px] opacity-50 pointer-events-none">{icon}</span>}
//         <div className={icon ? "[&>input]:pl-8 [&>textarea]:pl-3 [&>select]:pl-8" : ""}>{children}</div>
//       </div>
//     </div>
//   );
// }

// const inp = "w-full px-3 py-2.5 text-[13px] font-[500] border-[1.5px] border-slate-200 rounded-xl outline-none transition-all duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 bg-white text-slate-800";
// const ta = `${inp} resize-y min-h-[80px] leading-relaxed px-3`;

// /* ─────────────────────────────────────────────────────────────
//    LOGIN POPUP
// ───────────────────────────────────────────────────────────────*/
// function LoginPopup({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) {
//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[2000] flex items-center justify-center p-4">
//       <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
//         className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-white to-violet-50/40 pointer-events-none"/>
//         <div className="relative">
//           <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg shadow-indigo-200">✦</div>
//           <h2 className="text-[22px] font-extrabold text-slate-900 text-center mb-2">Sign in to Continue</h2>
//           <p className="text-[13.5px] text-slate-500 text-center mb-6 leading-relaxed">
//             You need to be logged in to build and download your professional cover letter.
//           </p>
//           <div className="space-y-3">
//             <button onClick={onLogin} className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-[14px] rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all">
//               Sign In to Your Account
//             </button>
//             <button onClick={onClose} className="w-full py-2.5 text-[13px] text-slate-400 font-semibold hover:text-slate-600 transition-colors">
//               Browse templates first →
//             </button>
//           </div>
//           <p className="text-center text-[12px] text-slate-400 mt-4">Don't have an account? <span className="text-indigo-600 font-semibold cursor-pointer" onClick={onLogin}>Sign up free</span></p>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    PREMIUM UPGRADE POPUP
// ───────────────────────────────────────────────────────────────*/
// function PremiumPopup({ onClose, onUpgrade }: { onClose: () => void; onUpgrade: () => void }) {
//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[2000] flex items-center justify-center p-4">
//       <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
//         className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-white to-indigo-50/40 pointer-events-none"/>
//         <div className="relative">
//           <button onClick={onClose} className="absolute -top-1 -right-1 w-8 h-8 bg-slate-100 hover:bg-red-50 rounded-full flex items-center justify-center text-slate-400 hover:text-red-400 transition-all">
//             <FiX className="w-4 h-4"/>
//           </button>
//           <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg shadow-amber-200">⭐</div>
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-[11.5px] font-bold mb-4 mx-auto flex">
//             <FiLock className="w-3 h-3"/> Premium Feature
//           </div>
//           <h2 className="text-[22px] font-extrabold text-slate-900 text-center mb-2">Upgrade to Premium</h2>
//           <p className="text-[13.5px] text-slate-500 text-center mb-6 leading-relaxed">
//             Building and downloading your cover letter requires a Premium plan. Unlock all 50 templates and powerful AI features.
//           </p>
//           <div className="grid grid-cols-2 gap-2.5 mb-6">
//             {["50 Unique Templates","AI Content Assist","Custom Fonts & Colors","PDF Download","Unlimited Letters","Priority Support"].map((f) => (
//               <div key={f} className="flex items-center gap-2 text-[12px] font-semibold text-slate-700 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-2.5">
//                 <span className="w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
//                   <svg viewBox="0 0 10 10" width="8" height="8" fill="none"><polyline points="1,5 4,8 9,2" stroke="white" strokeWidth="1.8"/></svg>
//                 </span>
//                 {f}
//               </div>
//             ))}
//           </div>
//           <button onClick={onUpgrade} className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-[14px] rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all">
//             Upgrade to Premium →
//           </button>
//           <button onClick={onClose} className="mt-2.5 w-full py-2 text-[12.5px] text-slate-400 font-semibold hover:text-slate-600 transition-colors">
//             Maybe later
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    MAIN COMPONENT
// ───────────────────────────────────────────────────────────────*/
// export default function CoverLetterGenerator() {
//   const router = useRouter();
//   const [isPremium, setIsPremium] = useState<boolean | null>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
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
//   const [showColors, setShowColors] = useState(false);
//   const [showFonts, setShowFonts] = useState(false);
//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const [showPremiumPopup, setShowPremiumPopup] = useState(false);

//   const liveRef = useRef<HTMLIFrameElement>(null);
//   const modalRef = useRef<HTMLIFrameElement>(null);

//   /* ── Auth + Premium check ── */
//   useEffect(() => {
//     const userDetails = getLocalStorage<User>("user_details");
//     const userId = userDetails?.id;
//     if (!userId) {
//       setIsLoggedIn(false);
//       setIsPremium(false);
//       // Show login popup after short delay
//       setTimeout(() => setShowLoginPopup(true), 600);
//       return;
//     }
//     setIsLoggedIn(true);
//     axios.get(`${API_URL}/api/users/dashboard`, { params: { userId } })
//       .then((res) => {
//         const payment = res?.data?.payments?.[0];
//         const premium = payment?.plan === "Premium";
//         setIsPremium(premium);
//         if (!premium) setTimeout(() => setShowPremiumPopup(true), 600);
//       })
//       .catch(() => setIsPremium(false));
//   }, []);

//   const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2800); };

//   const rebuild = useCallback(() => {
//     const h = buildHTML(tplId, data);
//     setHtml(h);
//     return h;
//   }, [tplId, data]);

//   useEffect(() => {
//     const t = setTimeout(rebuild, 200);
//     return () => clearTimeout(t);
//   }, [rebuild]);

//   const writeIframe = (ref: React.RefObject<HTMLIFrameElement | null>, h: string) => {
//     if (!ref.current) return;
//     const doc = ref.current.contentDocument;
//     if (!doc) return;
//     doc.open(); doc.write(h); doc.close();
//   };

//   useEffect(() => { if (html && liveRef.current) writeIframe(liveRef, html); }, [html]);
//   useEffect(() => { if (modal && html && modalRef.current) writeIframe(modalRef, html); }, [modal, html]);

//   const set = (path: string[], val: string) =>
//     setData((prev) => {
//       const n = JSON.parse(JSON.stringify(prev)) as CLData;
//       let c: any = n;
//       for (let i = 0; i < path.length - 1; i++) c = c[path[i]];
//       c[path[path.length - 1]] = val;
//       return n;
//     });

//   const setSec = (id: string, f: "title" | "content", v: string) =>
//     setData((p) => ({ ...p, sections: p.sections.map((s) => (s.id === id ? { ...s, [f]: v } : s)) }));

//   // Guard: when trying to go past template step, check auth/premium
//   const handleStepChange = (targetStep: Step) => {
//     if (targetStep === "template") { setStep(targetStep); return; }
//     if (!isLoggedIn) { setShowLoginPopup(true); return; }
//     if (!isPremium) { setShowPremiumPopup(true); return; }
//     setStep(targetStep);
//   };

//   const handleContinue = () => {
//     const stepIdx = STEPS.findIndex((s) => s.id === step);
//     if (step === "template") {
//       if (!isLoggedIn) { setShowLoginPopup(true); return; }
//       if (!isPremium) { setShowPremiumPopup(true); return; }
//     }
//     if (stepIdx < STEPS.length - 1) setStep(STEPS[stepIdx + 1].id);
//   };

//   const downloadPDF = async () => {
//     if (!isLoggedIn) { setShowLoginPopup(true); return; }
//     if (!isPremium) { setShowPremiumPopup(true); return; }
//     const h = rebuild();
//     setBusy(true);
//     try {
//       const r = await axios.post(`${API_URL}/api/candidates/generate-pdf`, { html: h }, { responseType: "blob" });
//       const url = URL.createObjectURL(r.data);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `Cover_Letter_${data.personal.fullName || "Draft"}.pdf`;
//       document.body.appendChild(a); a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//       showToast("✓ PDF downloaded");
//     } catch { showToast("Download failed — try again"); }
//     finally { setBusy(false); }
//   };

//   const tpl = TEMPLATES.find((t) => t.id === tplId)!;
//   const stepIdx = STEPS.findIndex((s) => s.id === step);
//   const cats = ["All", ...Array.from(new Set(TEMPLATES.map((t) => t.tag)))];
//   const shown = filter === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.tag === filter);
//   const tones = ["Professional", "Confident", "Enthusiastic", "Formal", "Creative", "Friendly"];

//   /* Loading state */
//   if (isLoggedIn === null) {
//     return (
//       <div className="min-h-screen bg-indigo-50 flex items-center justify-center">
//         <div className="text-indigo-600 font-bold text-[14px] animate-pulse">Loading Cover Letter Studio…</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         html,body{overflow:hidden}
//         @media(max-width:820px){html,body{overflow:auto}}
//         .canvas-iframe{width:860px;height:1120px;border:none;display:block;background:#fff;pointer-events:none}
//         .modal-iframe{width:860px;height:1120px;border:none;display:block;background:#fff}
//         @keyframes livePulse{0%,100%{box-shadow:0 0 0 2px rgba(16,185,129,.2)}50%{box-shadow:0 0 0 5px rgba(16,185,129,.07)}}
//         .live-dot{animation:livePulse 2s infinite}
//         @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
//         .toast-anim{animation:toastIn .22s ease}
//         @keyframes modalIn{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
//         .modal-anim{animation:modalIn .22s ease}
//         @keyframes ovIn{from{opacity:0}to{opacity:1}}
//         .ov-anim{animation:ovIn .18s ease}
//         .scrollbar-none{scrollbar-width:none}
//         .scrollbar-none::-webkit-scrollbar{display:none}
//       `}</style>

//       {/* LOGIN POPUP */}
//       <AnimatePresence>
//         {showLoginPopup && (
//           <LoginPopup
//             onClose={() => setShowLoginPopup(false)}
//             onLogin={() => router.push("/login")}
//           />
//         )}
//       </AnimatePresence>

//       {/* PREMIUM POPUP */}
//       <AnimatePresence>
//         {showPremiumPopup && !showLoginPopup && (
//           <PremiumPopup
//             onClose={() => setShowPremiumPopup(false)}
//             onUpgrade={() => router.push("/choose-plan")}
//           />
//         )}
//       </AnimatePresence>

//       {/* NAV */}
//       <nav className="h-[58px] bg-white border-b border-slate-200 flex items-center px-4 md:px-5 gap-3 z-50 relative shadow-sm flex-shrink-0">
//         <button onClick={() => router.push("/")} className="cursor-pointer flex-shrink-0">
//           <div className="relative w-[100px] sm:w-[140px] h-[34px] sm:h-[46px]">
//             <Image src="/logo.png" alt="Logo" fill className="object-contain" priority sizes="(max-width:640px) 100px,140px"/>
//           </div>
//         </button>

//         {/* Wizard steps */}
//         <div className="flex items-center flex-1 justify-center overflow-x-auto scrollbar-none gap-0 py-1">
//           {STEPS.map((s, i) => (
//             <React.Fragment key={s.id}>
//               {i > 0 && <div className={`w-5 h-0.5 flex-shrink-0 transition-colors ${i <= stepIdx ? "bg-emerald-500" : "bg-slate-200"}`}/>}
//               <button onClick={() => handleStepChange(s.id)}
//                 className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[12px] font-semibold transition-all flex-shrink-0 cursor-pointer
//                   ${i < stepIdx ? "text-slate-800" : i === stepIdx ? "text-indigo-600 bg-indigo-50" : "text-slate-400 hover:bg-slate-50"}`}>
//                 <span className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] transition-all flex-shrink-0
//                   ${i < stepIdx ? "bg-emerald-500 text-white" : i === stepIdx ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-[0_0_0_3px_rgba(91,56,240,.16)]" : "bg-slate-100 text-slate-400"}`}>
//                   {i < stepIdx ? <svg viewBox="0 0 14 14" width="11" height="11" fill="none"><polyline points="2,8 5,12 12,3" stroke="white" strokeWidth="2.2"/></svg> : i + 1}
//                 </span>
//                 <span className="hidden sm:inline">{s.label}</span>
//               </button>
//             </React.Fragment>
//           ))}
//         </div>

//         {/* Download */}
//         <button onClick={downloadPDF} disabled={busy}
//           className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all flex-shrink-0">
//           {busy ? "⏳" : "⬇"} PDF
//         </button>
//       </nav>

//       {/* SHELL */}
//       <div className="grid lg:grid-cols-[400px_1fr] xl:grid-cols-[420px_1fr] h-[calc(100vh-58px)]">
//         {/* LEFT PANEL */}
//         <div className="flex flex-col overflow-hidden bg-slate-50 border-r border-slate-200">
//           <div className="flex-shrink-0 px-5 pt-4 pb-0">
//             <h2 className="font-semibold text-slate-900 tracking-tight mb-0.5 text-[15px]">
//               {step === "template" ? "Choose Template" : step === "personal" ? "Personal Information" : step === "company" ? "Company Details" : step === "content" ? "Letter Content" : "Review & Download"}
//             </h2>
//             <p className="text-[12.5px] text-slate-500 mb-2">
//               {step === "template" ? "50 unique white & modern designs" : step === "personal" ? "Your details appear as clickable links" : step === "company" ? "Where you're applying" : step === "content" ? "Build your letter paragraph by paragraph" : "Check everything before downloading"}
//             </p>
//           </div>

//           <div className="flex-1 overflow-y-auto px-4 pt-3 pb-20 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent">

//             {/* ── TEMPLATE STEP ── */}
//             {step === "template" && (
//               <>
//                 {/* Non-premium banner */}
//                 {isLoggedIn && !isPremium && (
//                   <div className="mb-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3 flex items-center gap-3">
//                     <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0">⭐</div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-[12px] font-bold text-amber-800">Browse freely, upgrade to use</p>
//                       <p className="text-[11px] text-amber-600">Select any template then upgrade to Premium to build your letter</p>
//                     </div>
//                     <button onClick={() => setShowPremiumPopup(true)} className="text-[11px] font-bold text-amber-700 bg-amber-100 border border-amber-200 px-2.5 py-1.5 rounded-lg hover:bg-amber-200 transition-all flex-shrink-0">Upgrade</button>
//                   </div>
//                 )}
//                 {!isLoggedIn && (
//                   <div className="mb-3 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 rounded-2xl p-3 flex items-center gap-3">
//                     <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0">✦</div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-[12px] font-bold text-indigo-800">Browse templates freely</p>
//                       <p className="text-[11px] text-indigo-600">Sign in to build and download your cover letter</p>
//                     </div>
//                     <button onClick={() => setShowLoginPopup(true)} className="text-[11px] font-bold text-indigo-700 bg-indigo-100 border border-indigo-200 px-2.5 py-1.5 rounded-lg hover:bg-indigo-200 transition-all flex-shrink-0">Sign In</button>
//                   </div>
//                 )}

//                 {/* Filter pills */}
//                 <div className="flex flex-wrap gap-1.5 mb-3">
//                   {cats.map((c) => (
//                     <button key={c} onClick={() => setFilter(c)}
//                       className={`px-3 py-1 rounded-full text-[11px] font-bold border-[1.5px] transition-all ${filter === c ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-slate-200 text-slate-500 bg-white hover:border-indigo-200"}`}>
//                       {c}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Color picker */}
//                 <div className="mb-3 bg-white rounded-2xl border border-indigo-100 p-3">
//                   <button onClick={() => setShowColors((v) => !v)} className="w-full flex items-center justify-between text-[12px] font-bold text-slate-700">
//                     <span className="flex items-center gap-2">
//                       <span className="w-4 h-4 rounded-full border border-white shadow-sm" style={{ background: data.accentColor || "#6366f1" }}/>
//                       Accent Color
//                     </span>
//                     <span className="text-slate-400 text-[10px]">{showColors ? "▲" : "▼"}</span>
//                   </button>
//                   {showColors && (
//                     <div className="flex flex-wrap gap-2 mt-2.5">
//                       {COLOR_PALETTES.map((p) => (
//                         <button key={p.value} title={p.label} onClick={() => setData((d) => ({ ...d, accentColor: p.value }))}
//                           className={`w-7 h-7 rounded-full border-2 transition-all ${data.accentColor === p.value ? "border-white scale-110 shadow-lg" : "border-transparent hover:scale-105"}`}
//                           style={{ background: p.value, boxShadow: data.accentColor === p.value ? `0 0 0 2px ${p.value}` : "" }}/>
//                       ))}
//                       <label className="w-7 h-7 rounded-full border-2 border-slate-200 overflow-hidden cursor-pointer hover:scale-105 transition-all" title="Custom color">
//                         <input type="color" value={data.accentColor || "#6366f1"} onChange={(e) => setData((d) => ({ ...d, accentColor: e.target.value }))} className="w-8 h-8 -ml-0.5 -mt-0.5 cursor-pointer"/>
//                       </label>
//                     </div>
//                   )}
//                 </div>

//                 {/* Font picker */}
//                 <div className="mb-3 bg-white rounded-2xl border border-indigo-100 p-3">
//                   <button onClick={() => setShowFonts((v) => !v)} className="w-full flex items-center justify-between text-[12px] font-bold text-slate-700">
//                     <span className="flex items-center gap-2"><span className="text-indigo-500">Aa</span>Font: {data.fontFamily}</span>
//                     <span className="text-slate-400 text-[10px]">{showFonts ? "▲" : "▼"}</span>
//                   </button>
//                   {showFonts && (
//                     <div className="mt-2.5 space-y-1.5 max-h-40 overflow-y-auto">
//                       {FONT_FAMILIES.map((f) => (
//                         <button key={f.id} onClick={() => setData((d) => ({ ...d, fontFamily: f.id }))}
//                           className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[12.5px] transition-all ${data.fontFamily === f.id ? "bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold" : "hover:bg-slate-50 text-slate-700 border border-transparent"}`}>
//                           <span style={{ fontFamily: `'${f.id}',${f.style}` }}>{f.label}</span>
//                           <span className="text-[10px] text-slate-400 font-normal">{f.style}</span>
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Template grid — always browsable */}
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
//                   {shown.map((t) => (
//                     <div key={t.id} onClick={() => setTplId(t.id)}
//                       className={`relative bg-white rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-200
//                         ${tplId === t.id ? "border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,.12),0_8px_24px_rgba(99,102,241,.1)]" : "border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-indigo-200"}`}>
//                       <div className="h-[95px] overflow-hidden">
//                         <TplThumb id={t.id} color={data.accentColor || "#6366f1"}/>
//                       </div>
//                       {tplId === t.id && (
//                         <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center shadow">
//                           <svg viewBox="0 0 14 14" width="10" height="10" fill="none"><polyline points="2,8 5,12 12,3" stroke="white" strokeWidth="2.4"/></svg>
//                         </div>
//                       )}
//                       {(!isLoggedIn || !isPremium) && (
//                         <div className="absolute top-2 left-2 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shadow" title="Premium">
//                           <FiLock className="w-2.5 h-2.5 text-white"/>
//                         </div>
//                       )}
//                       <div className="px-2.5 py-2">
//                         <div className="text-[9px] font-extrabold tracking-[1.2px] uppercase text-slate-400 mb-0.5">{t.tag}</div>
//                         <div className="text-[12px] font-bold text-slate-900">{t.name}</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}

//             {/* ── PERSONAL ── */}
//             {step === "personal" && (
//               <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div><p className="text-[14px] font-extrabold text-slate-900">Your Profile</p><p className="text-[11.5px] text-slate-500">All fields appear as clickable links in your letter</p></div>
//                 </div>
//                 <div className="grid sm:grid-cols-2 gap-0">
//                   <F label="Full Name" required><input className={inp} placeholder="Alexandra Chen" value={data.personal.fullName} onChange={(e) => set(["personal", "fullName"], e.target.value)}/></F>
//                   <F label="Professional Title"><input className={inp} placeholder="Senior UX Designer" value={data.personal.title} onChange={(e) => set(["personal", "title"], e.target.value)}/></F>
//                 </div>
//                 <div className="grid sm:grid-cols-2 gap-0">
//                   <F label="Email Address" required><input className={inp} type="email" placeholder="alex@email.com" value={data.personal.email} onChange={(e) => set(["personal", "email"], e.target.value)}/></F>
//                   <F label="Phone Number"><input className={inp} type="tel" placeholder="+1 555 000 0000" value={data.personal.phone} onChange={(e) => set(["personal", "phone"], e.target.value)}/></F>
//                 </div>
//                 <F label="Location"><input className={inp} placeholder="San Francisco, CA" value={data.personal.location} onChange={(e) => set(["personal", "location"], e.target.value)}/></F>
//                 <div className="h-px bg-indigo-50 my-3"/>
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">🔗 Online Presence</p>
//                 <F label="LinkedIn URL"><input className={inp} placeholder="linkedin.com/in/alexchen" value={data.personal.linkedin} onChange={(e) => set(["personal", "linkedin"], e.target.value)}/></F>
//                 <div className="grid sm:grid-cols-2 gap-0">
//                   <F label="GitHub URL"><input className={inp} placeholder="github.com/alexchen" value={data.personal.github} onChange={(e) => set(["personal", "github"], e.target.value)}/></F>
//                   <F label="Portfolio / Website"><input className={inp} placeholder="alexchen.io" value={data.personal.website} onChange={(e) => set(["personal", "website"], e.target.value)}/></F>
//                 </div>
//                 <div className="h-px bg-indigo-50 my-3"/>
//                 <F label="Professional Summary (optional)"><textarea className={ta} placeholder="2–3 sentence summary…" value={data.personal.summary} onChange={(e) => set(["personal", "summary"], e.target.value)}/></F>
//                 <F label="Closing Salutation"><input className={inp} placeholder="Sincerely (default)" value={data.personal.signature} onChange={(e) => set(["personal", "signature"], e.target.value)}/></F>
//               </div>
//             )}

//             {/* ── COMPANY ── */}
//             {step === "company" && (
//               <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
//                 <F label="Company Name" icon="🏢" required><input className={inp} placeholder="Google, Stripe, Airbnb…" value={data.company.name} onChange={(e) => set(["company", "name"], e.target.value)}/></F>
//                 <F label="Role Applying For" icon="🎯" required><input className={inp} placeholder="Senior UX Designer" value={data.company.jobTitle} onChange={(e) => set(["company", "jobTitle"], e.target.value)}/></F>
//                 <div className="grid sm:grid-cols-2 gap-3">
//                   <F label="Hiring Manager" icon="👤"><input className={inp} placeholder="Sarah Johnson" value={data.company.hiringManager} onChange={(e) => set(["company", "hiringManager"], e.target.value)}/></F>
//                   <F label="Their Title" icon="🏷️"><input className={inp} placeholder="Head of Design" value={data.company.hiringManagerTitle} onChange={(e) => set(["company", "hiringManagerTitle"], e.target.value)}/></F>
//                 </div>
//                 <div className="grid sm:grid-cols-2 gap-3">
//                   <F label="City"><input className={`${inp} pl-3`} placeholder="Mountain View" value={data.company.city} onChange={(e) => set(["company", "city"], e.target.value)}/></F>
//                   <F label="State"><input className={`${inp} pl-3`} placeholder="CA" value={data.company.state} onChange={(e) => set(["company", "state"], e.target.value)}/></F>
//                 </div>
//                 <div className="h-px bg-indigo-50 my-3"/>
//                 <F label="Where you found this job" icon="🔍"><input className={inp} placeholder="LinkedIn, Referral, Company website…" value={data.company.jobSource} onChange={(e) => set(["company", "jobSource"], e.target.value)}/></F>
//                 <F label="Referral Name (if any)" icon="🤝"><input className={inp} placeholder="John Smith referred me" value={data.company.referral} onChange={(e) => set(["company", "referral"], e.target.value)}/></F>
//               </div>
//             )}

//             {/* ── CONTENT ── */}
//             {step === "content" && (
//               <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
//                 <F label="Letter Date" icon="📅"><input className={inp} type="date" value={data.letterDate} onChange={(e) => set(["letterDate"], e.target.value)}/></F>
//                 <div className="h-px bg-indigo-50 my-3"/>
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">✍️ Letter Sections</p>
//                 {data.sections.map((s, i) => (
//                   <div key={s.id} className="bg-indigo-50/60 border-[1.5px] border-indigo-100 rounded-xl p-3 mb-2.5 transition-all focus-within:bg-white focus-within:border-indigo-400">
//                     <div className="flex items-center gap-2 mb-2.5">
//                       <span className="w-[22px] h-[22px] rounded-[7px] bg-gradient-to-br from-indigo-600 to-violet-600 text-white text-[10px] font-extrabold flex items-center justify-center flex-shrink-0">{i + 1}</span>
//                       <input value={s.title} onChange={(e) => setSec(s.id, "title", e.target.value)} placeholder="Section title" className="flex-1 px-2.5 py-1.5 rounded-lg border-[1.5px] border-slate-200 text-[12.5px] font-bold bg-white text-slate-900 outline-none focus:border-indigo-500 transition-all"/>
//                       {data.sections.length > 1 && <button onClick={() => setData((p) => ({ ...p, sections: p.sections.filter((x) => x.id !== s.id) }))} className="w-6 h-6 bg-white border-[1.5px] border-slate-200 rounded-[6px] text-red-400 text-[12px] flex items-center justify-center hover:bg-red-50 transition-all">✕</button>}
//                     </div>
//                     <textarea value={s.content} onChange={(e) => setSec(s.id, "content", e.target.value)} placeholder={s.placeholder} rows={4} className="w-full px-2.5 py-2 rounded-lg border-[1.5px] border-slate-200 bg-white text-[12.5px] text-slate-800 leading-relaxed outline-none focus:border-indigo-500 transition-all resize-y"/>
//                   </div>
//                 ))}
//                 <button onClick={() => setData((p) => ({ ...p, sections: [...p.sections, { id: Date.now()+"", title: "New Section", content: "", placeholder: "Write here…" }] }))} className="w-full py-2 mb-3 bg-white border-[1.5px] border-dashed border-indigo-200 rounded-xl text-[12.5px] font-bold text-indigo-600 hover:bg-indigo-50 transition-all">+ Add Section</button>
//                 <div className="h-px bg-indigo-50 my-3"/>
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">🏆 Key Achievements</p>
//                 <div className="flex gap-2 mb-2">
//                   <input className="flex-1 px-3 py-2 text-[12.5px] border-[1.5px] border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all" placeholder="e.g. Grew revenue 40% YoY" value={achIn} onChange={(e) => setAchIn(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && achIn.trim()) { setData((p) => ({ ...p, achievements: [...p.achievements, achIn.trim()] })); setAchIn(""); }}}/>
//                   <button onClick={() => { if (achIn.trim()) { setData((p) => ({ ...p, achievements: [...p.achievements, achIn.trim()] })); setAchIn(""); }}} className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[12px] font-bold rounded-xl">Add</button>
//                 </div>
//                 <div className="flex flex-wrap gap-1.5 mb-2">
//                   {data.achievements.map((a, i) => (
//                     <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-[12px] font-semibold text-indigo-700">
//                       ⭐ {a}
//                       <button onClick={() => setData((p) => ({ ...p, achievements: p.achievements.filter((_, j) => j !== i) }))} className="text-indigo-300 hover:text-red-400 text-[13px] leading-none ml-0.5">✕</button>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="h-px bg-indigo-50 my-3"/>
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">🛠️ Core Skills / Tools</p>
//                 <div className="flex gap-2 mb-2">
//                   <input className="flex-1 px-3 py-2 text-[12.5px] border-[1.5px] border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all" placeholder="e.g. Figma, React…" value={sklIn} onChange={(e) => setSklIn(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && sklIn.trim()) { setData((p) => ({ ...p, skills: [...p.skills, sklIn.trim()] })); setSklIn(""); }}}/>
//                   <button onClick={() => { if (sklIn.trim()) { setData((p) => ({ ...p, skills: [...p.skills, sklIn.trim()] })); setSklIn(""); }}} className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[12px] font-bold rounded-xl">Add</button>
//                 </div>
//                 <div className="flex flex-wrap gap-1.5 mb-2">
//                   {data.skills.map((s, i) => (
//                     <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-violet-50 border border-violet-100 rounded-full text-[12px] font-semibold text-violet-700">
//                       🔧 {s}
//                       <button onClick={() => setData((p) => ({ ...p, skills: p.skills.filter((_, j) => j !== i) }))} className="text-violet-300 hover:text-red-400 text-[13px] leading-none ml-0.5">✕</button>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="h-px bg-indigo-50 my-3"/>
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">🎭 Tone of Voice</p>
//                 <div className="flex flex-wrap gap-1.5 mb-3">
//                   {tones.map((t) => (
//                     <button key={t} onClick={() => setData((p) => ({ ...p, tone: t }))} className={`px-3 py-1 rounded-full text-[12px] font-semibold border-[1.5px] transition-all ${data.tone === t ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-slate-200 text-slate-500 bg-white"}`}>{t}</button>
//                   ))}
//                 </div>
//                 <div className="h-px bg-indigo-50 my-3"/>
//                 <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">📝 Additional Notes</p>
//                 <textarea className={ta} rows={3} placeholder="Post-script or extra context…" value={data.notes} onChange={(e) => setData((p) => ({ ...p, notes: e.target.value }))}/>
//               </div>
//             )}

//             {/* ── REVIEW ── */}
//             {step === "review" && (
//               <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
//                 {([ ["Template", tpl?.name, "template"], ["Accent Color", data.accentColor, "template"], ["Font", data.fontFamily, "template"], ["Full Name", data.personal.fullName, "personal"], ["Title", data.personal.title, "personal"], ["Email", data.personal.email, "personal"], ["Company", data.company.name, "company"], ["Role", data.company.jobTitle, "company"], ["Sections", `${data.sections.filter((s) => s.content).length} written`, "content"], ["Achievements", `${data.achievements.length} added`, "content"], ["Skills", `${data.skills.length} added`, "content"] ] as [string, string, Step][])
//                   .map(([l, v, s]) => (
//                     <div key={l} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
//                       <span className="text-[11px] font-extrabold uppercase tracking-[.5px] text-slate-400">{l}</span>
//                       <div className="flex items-center gap-2">
//                         {l === "Accent Color" && v ? <span className="w-4 h-4 rounded-full border border-white shadow-sm" style={{ background: v }}/> : null}
//                         <span className={`text-[12.5px] font-medium text-right max-w-[180px] truncate ${v ? "text-slate-800" : "text-slate-300"}`}>{v || "—"}</span>
//                         <button onClick={() => setStep(s)} className="text-[11px] font-bold text-indigo-500 hover:text-indigo-700 transition-colors">Edit</button>
//                       </div>
//                     </div>
//                   ))}
//                 <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
//                   <p className="text-[13px] font-bold text-slate-900 mb-1">✅ Ready to Download</p>
//                   <p className="text-[12px] text-slate-500">Your cover letter is ready. Download as PDF below.</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* FOOTER */}
//           <div className="flex-shrink-0 px-5 py-3 border-t border-slate-200 bg-white flex justify-between items-center gap-3">
//             <button onClick={() => stepIdx === 0 ? router.push("/") : setStep(STEPS[stepIdx - 1].id)}
//               className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[13px] font-bold border-[1.5px] border-slate-200 bg-white text-slate-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all cursor-pointer">
//               ← {stepIdx > 0 ? "Back" : "Home"}
//             </button>
//             {stepIdx < STEPS.length - 1 ? (
//               <button onClick={handleContinue}
//                 className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[13.5px] font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:-translate-y-px transition-all cursor-pointer">
//                 Continue to {STEPS[stepIdx + 1].label} {(!isLoggedIn || !isPremium) && step === "template" ? "🔒" : ""}
//               </button>
//             ) : (
//               <button onClick={downloadPDF} disabled={busy}
//                 className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[13.5px] font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed transition-all">
//                 {busy ? "⏳ Generating…" : "⬇ Download PDF"}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* RIGHT — CANVAS PREVIEW */}
//         <div className="hidden lg:flex flex-col bg-slate-100 overflow-hidden">
//           <div className="flex-shrink-0 h-[52px] bg-white border-b border-slate-200 px-4 flex items-center justify-between gap-3 shadow-[0_1px_3px_rgba(0,0,0,.04)]">
//             <div className="flex items-center gap-2.5">
//               <span className="w-2 h-2 rounded-full bg-emerald-500 live-dot"/>
//               <div>
//                 <p className="text-[13px] font-bold text-slate-900 leading-tight">Live Preview</p>
//                 <p className="text-[10.5px] text-slate-400">Drag anywhere · Pinch · Scroll</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <button onClick={() => setStep("template")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 hover:bg-indigo-100 transition-all">🎨 Change</button>
//               <button onClick={() => { rebuild(); setModal(true); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border-[1.5px] border-slate-200 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all">⛶ Fullscreen</button>
//             </div>
//           </div>
//           <div className="flex-1 overflow-hidden">
//             <CanvasPreview>
//               {html ? (
//                 <iframe ref={liveRef} className="canvas-iframe" title="preview" sandbox="allow-same-origin"/>
//               ) : (
//                 <div className="w-[860px] h-[1120px] bg-white flex flex-col items-center justify-center gap-3 text-slate-400 rounded-xl">
//                   <span className="text-[52px] opacity-20">📄</span>
//                   <p className="text-[16px] font-bold">Preview appears here</p>
//                   <p className="text-[13px]">Fill in your details to see the letter</p>
//                 </div>
//               )}
//             </CanvasPreview>
//           </div>
//         </div>
//       </div>

//       {/* MOBILE PREVIEW FAB */}
//       <button onClick={() => { rebuild(); setModal(true); }} className="lg:hidden fixed top-[70px] right-3 z-50 bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-2.5 rounded-full shadow-xl">
//         <FiEye className="w-4 h-4"/>
//       </button>

//       {/* FULLSCREEN MODAL */}
//       <AnimatePresence>
//         {modal && (
//           <div className="ov-anim fixed inset-0 bg-[rgba(10,6,30,.86)] backdrop-blur-[14px] z-[1000] flex items-center justify-center p-3 sm:p-5" onClick={() => setModal(false)}>
//             <div className="modal-anim w-full max-w-[980px] h-[92vh] bg-white rounded-2xl overflow-hidden flex flex-col shadow-[0_48px_100px_rgba(0,0,0,.48)]" onClick={(e) => e.stopPropagation()}>
//               <div className="flex-shrink-0 h-[56px] px-5 bg-white border-b border-slate-100 flex items-center justify-between">
//                 <div className="flex items-center gap-2.5">
//                   <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-sm text-white">📄</div>
//                   <div>
//                     <p className="text-[14px] font-extrabold text-slate-900 leading-tight">{data.personal.fullName || "Cover Letter"}</p>
//                     <p className="text-[11px] text-slate-400">{tpl?.name} · {tpl?.tag}</p>
//                   </div>
//                 </div>
//                 <button onClick={() => setModal(false)} className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 text-slate-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 flex items-center justify-center text-[16px] transition-all">✕</button>
//               </div>
//               <div className="flex-1 overflow-hidden bg-slate-100">
//                 <CanvasPreview>
//                   {html ? <iframe ref={modalRef} className="modal-iframe" title="full-preview" sandbox="allow-same-origin"/> : <div className="w-[860px] h-[1120px] bg-white flex items-center justify-center text-slate-400"><span className="text-5xl opacity-20">📄</span></div>}
//                 </CanvasPreview>
//               </div>
//               <div className="flex-shrink-0 px-5 py-3 border-t border-slate-100 bg-white flex justify-end gap-2.5">
//                 <button onClick={() => setModal(false)} className="px-4 py-2 rounded-full text-[12.5px] font-bold border-[1.5px] border-slate-200 text-slate-500 hover:bg-slate-50 transition-all">Close</button>
//                 <button onClick={downloadPDF} disabled={busy} className="flex items-center gap-1.5 px-5 py-2 rounded-full text-[12.5px] font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg disabled:opacity-50 transition-all">
//                   {busy ? "⏳ Generating…" : "⬇ Download PDF"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* TOAST */}
//       {toast && (
//         <div className="toast-anim fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-slate-900 text-white px-6 py-2.5 rounded-full text-[13px] font-bold shadow-xl whitespace-nowrap">{toast}</div>
//       )}
//     </>
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
import {
  FiZoomIn,
  FiZoomOut,
  FiRefreshCw,
  FiEye,
  FiLock,
  FiX,
} from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/config/api";
import { getLocalStorage } from "@/app/utils/localStorage";

// ─── Template data (screenshot images) ───────────────────────────────────────
// Adjust the import path to wherever you put coverLetterTemplates.ts
import {
  coverLetterTemplateData as TEMPLATES,
  getCLTemplateTags,
  filterCLTemplates,
} from "@/app/data/coverLetterTemplates";

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────*/
interface User {
  id: string;
}
interface CLData {
  personal: {
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
  };
  company: {
    name: string;
    jobTitle: string;
    hiringManager: string;
    hiringManagerTitle: string;
    city: string;
    state: string;
    jobSource: string;
    referral: string;
  };
  sections: {
    id: string;
    title: string;
    content: string;
    placeholder: string;
  }[];
  achievements: string[];
  skills: string[];
  tone: string;
  notes: string;
  letterDate: string;
  accentColor: string;
  fontFamily: string;
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
        "Express your enthusiasm for the role. Mention where you found it and a compelling hook about why you're perfect…",
    },
    {
      id: "2",
      title: "Experience & Skills",
      content: "",
      placeholder:
        "Highlight 2–3 specific accomplishments with metrics. Show you solve their exact problems…",
    },
    {
      id: "3",
      title: "Why This Company",
      content: "",
      placeholder:
        "Reference their mission, recent news, products, or culture. Show genuine research…",
    },
    {
      id: "4",
      title: "Closing",
      content: "",
      placeholder:
        "Restate enthusiasm, include a clear CTA, mention portfolio/work samples if applicable…",
    },
  ],
  achievements: [],
  skills: [],
  tone: "professional",
  notes: "",
  letterDate: new Date().toISOString().split("T")[0],
  accentColor: "#6366f1",
  fontFamily: "DM Sans",
};

/* ─────────────────────────────────────────────────────────────
   FONT FAMILIES
───────────────────────────────────────────────────────────────*/
const FONT_FAMILIES = [
  {
    id: "DM Sans",
    label: "DM Sans",
    url: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap",
    style: "sans-serif",
  },
  {
    id: "Inter",
    label: "Inter",
    url: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
    style: "sans-serif",
  },
  {
    id: "Plus Jakarta",
    label: "Plus Jakarta",
    url: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap",
    style: "sans-serif",
  },
  {
    id: "Outfit",
    label: "Outfit",
    url: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap",
    style: "sans-serif",
  },
  {
    id: "Nunito",
    label: "Nunito",
    url: "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap",
    style: "sans-serif",
  },
  {
    id: "Manrope",
    label: "Manrope",
    url: "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap",
    style: "sans-serif",
  },
  {
    id: "Syne",
    label: "Syne",
    url: "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap",
    style: "sans-serif",
  },
  {
    id: "Playfair",
    label: "Playfair",
    url: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&display=swap",
    style: "serif",
  },
  {
    id: "Lora",
    label: "Lora",
    url: "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap",
    style: "serif",
  },
  {
    id: "Cormorant",
    label: "Cormorant",
    url: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap",
    style: "serif",
  },
  {
    id: "IBM Plex",
    label: "IBM Plex Mono",
    url: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap",
    style: "monospace",
  },
  {
    id: "Space Grotesk",
    label: "Space Grotesk",
    url: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
    style: "sans-serif",
  },
];

const COLOR_PALETTES = [
  { label: "Indigo", value: "#6366f1" },
  { label: "Violet", value: "#7c3aed" },
  { label: "Purple", value: "#9333ea" },
  { label: "Sky", value: "#0369a1" },
  { label: "Teal", value: "#0d9488" },
  { label: "Emerald", value: "#059669" },
  { label: "Amber", value: "#d97706" },
  { label: "Rose", value: "#e11d48" },
  { label: "Orange", value: "#ea580c" },
  { label: "Slate", value: "#334155" },
  { label: "Navy", value: "#1e3a5f" },
  { label: "Maroon", value: "#9f1239" },
];

/* ─────────────────────────────────────────────────────────────
   CANVAS PREVIEW — fixed drag (all listeners on window)
───────────────────────────────────────────────────────────────*/
function CanvasPreview({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 20, y: 20 });
  const scaleRef = useRef(0.58);
  const downRef = useRef<{ x: number; y: number } | null>(null);
  const startRef = useRef({ x: 0, y: 0 });
  const isDrag = useRef(false);
  const animRef = useRef<number | null>(null);
  const lastDist = useRef(0);

  const [pos, setPos] = useState({ x: 20, y: 20 });
  const [scale, setScale] = useState(0.58);
  const [drag, setDrag] = useState(false);

  const initS = useCallback(() => {
    const w = window.innerWidth;
    return w < 480
      ? 0.33
      : w < 640
        ? 0.4
        : w < 820
          ? 0.5
          : w < 1024
            ? 0.57
            : w < 1280
              ? 0.63
              : 0.68;
  }, []);

  useEffect(() => {
    const s = initS();
    scaleRef.current = s;
    setScale(s);
    const fn = () => {
      const s2 = initS();
      scaleRef.current = s2;
      setScale(s2);
    };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [initS]);

  const smoothZoom = (target: number) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const from = scaleRef.current,
      t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 160, 1);
      const v = from + (target - from) * (1 - Math.pow(1 - p, 3));
      scaleRef.current = v;
      setScale(v);
      if (p < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  };
  const zoomIn = () => smoothZoom(Math.min(scaleRef.current + 0.12, 3));
  const zoomOut = () => smoothZoom(Math.max(scaleRef.current - 0.12, 0.2));
  const reset = () => {
    const p = { x: 20, y: 20 };
    posRef.current = p;
    setPos(p);
    smoothZoom(initS());
  };

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const inEl = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      return (
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom
      );
    };

    const onDown = (e: MouseEvent) => {
      if (!inEl(e)) return;
      if ((e.target as HTMLElement)?.closest?.("[data-nodrag]")) return;
      e.preventDefault();
      downRef.current = { x: e.clientX, y: e.clientY };
      isDrag.current = false;
    };
    const onMove = (e: MouseEvent) => {
      if (!downRef.current) return;
      const dx = e.clientX - downRef.current.x,
        dy = e.clientY - downRef.current.y;
      if (!isDrag.current && Math.hypot(dx, dy) > 3) {
        isDrag.current = true;
        setDrag(true);
        startRef.current = {
          x: downRef.current.x - posRef.current.x,
          y: downRef.current.y - posRef.current.y,
        };
      }
      if (isDrag.current) {
        const np = {
          x: e.clientX - startRef.current.x,
          y: e.clientY - startRef.current.y,
        };
        posRef.current = np;
        setPos({ ...np });
      }
    };
    const onUp = () => {
      downRef.current = null;
      isDrag.current = false;
      setDrag(false);
    };

    const onTouchStart = (e: TouchEvent) => {
      const r = el.getBoundingClientRect();
      const t = e.touches[0];
      if (
        t.clientX < r.left ||
        t.clientX > r.right ||
        t.clientY < r.top ||
        t.clientY > r.bottom
      )
        return;
      if (e.touches.length === 1) {
        downRef.current = { x: t.clientX, y: t.clientY };
        isDrag.current = false;
      } else if (e.touches.length === 2) {
        const dx = e.touches[1].clientX - e.touches[0].clientX;
        const dy = e.touches[1].clientY - e.touches[0].clientY;
        lastDist.current = Math.hypot(dx, dy);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        const dx = e.touches[1].clientX - e.touches[0].clientX;
        const dy = e.touches[1].clientY - e.touches[0].clientY;
        const d = Math.hypot(dx, dy);
        if (lastDist.current > 0) {
          const v = Math.max(
            0.2,
            Math.min(3, scaleRef.current * (d / lastDist.current)),
          );
          scaleRef.current = v;
          setScale(v);
        }
        lastDist.current = d;
        return;
      }
      if (!downRef.current || e.touches.length !== 1) return;
      const t = e.touches[0];
      const dx = t.clientX - downRef.current.x,
        dy = t.clientY - downRef.current.y;
      if (!isDrag.current && Math.hypot(dx, dy) > 3) {
        isDrag.current = true;
        setDrag(true);
        startRef.current = {
          x: downRef.current.x - posRef.current.x,
          y: downRef.current.y - posRef.current.y,
        };
      }
      if (isDrag.current) {
        const np = {
          x: t.clientX - startRef.current.x,
          y: t.clientY - startRef.current.y,
        };
        posRef.current = np;
        setPos({ ...np });
      }
    };
    const onTouchEnd = () => {
      downRef.current = null;
      isDrag.current = false;
      setDrag(false);
    };
    const onWheel = (e: WheelEvent) => {
      if (!inEl(e)) return;
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const v = Math.max(
          0.2,
          Math.min(3, scaleRef.current * Math.exp(-e.deltaY * 0.002)),
        );
        scaleRef.current = v;
        setScale(v);
      } else {
        const np = {
          x: posRef.current.x - e.deltaX * 0.5,
          y: posRef.current.y - e.deltaY * 0.5,
        };
        posRef.current = np;
        setPos({ ...np });
      }
    };

    // All on window — iframes can NEVER steal these
    window.addEventListener("mousedown", onDown, {
      capture: true,
      passive: false,
    });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("wheel", onWheel, {
      capture: true,
      passive: false,
    });
    return () => {
      window.removeEventListener("mousedown", onDown, { capture: true });
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("wheel", onWheel, { capture: true });
    };
  }, []);

  return (
    <div className="relative w-full h-full" style={{ minHeight: 360 }}>
      {/* pointer-events:none on iframes so they never steal events */}
      <style>{`.cvs-root iframe{pointer-events:none!important}`}</style>
      <div
        ref={wrapRef}
        className="cvs-root absolute inset-0 overflow-hidden select-none"
        style={{
          cursor: drag ? "grabbing" : "grab",
          borderRadius: 12,
          background: "#e8e6f2",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transformOrigin: "top left",
            transform: `translate(${pos.x}px,${pos.y}px) scale(${scale})`,
            willChange: "transform",
            zIndex: 1,
          }}
        >
          {children}
        </div>
      </div>
      <div
        data-nodrag
        className="absolute top-2.5 left-2.5 z-30 pointer-events-none bg-white/90 backdrop-blur-sm border border-indigo-100 text-indigo-600 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm"
      >
        {Math.round(scale * 100)}%
      </div>
      <div
        data-nodrag
        className="absolute bottom-3 right-3 z-30 flex flex-col gap-1.5"
      >
        {[
          { fn: zoomIn, icon: <FiZoomIn className="w-3.5 h-3.5" />, p: true },
          { fn: zoomOut, icon: <FiZoomOut className="w-3.5 h-3.5" />, p: true },
          { fn: reset, icon: <FiRefreshCw className="w-3 h-3" />, p: false },
        ].map((b, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={b.fn}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-md ${b.p ? "bg-gradient-to-br from-indigo-600 to-violet-600" : "bg-gray-700 hover:bg-gray-800"}`}
          >
            {b.icon}
          </motion.button>
        ))}
      </div>
      <p
        data-nodrag
        className="absolute bottom-3 left-2 z-30 pointer-events-none text-[9px] font-semibold text-slate-400"
      >
        Drag · Pinch · Scroll
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TEMPLATE IMAGE CARD — replaces TplThumb SVG
   Shows the screenshot, name, tag, tier badge, and selected state
───────────────────────────────────────────────────────────────*/
function TemplateCard({
  template,
  selected,
  onClick,
  showLock,
}: {
  template: {
    id: string;
    name: string;
    tag: string;
    tier: string;
    image: string;
    description: string;
  };
  selected: boolean;
  onClick: () => void;
  showLock: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-200 group
        ${
          selected
            ? "border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,.14),0_8px_24px_rgba(99,102,241,.12)]"
            : "border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200"
        }`}
    >
      {/* Screenshot image */}
      <div
        className="relative w-full"
        style={{ paddingBottom: "130%", background: "#f8fafc" }}
      >
        <Image
          src={template.image}
          alt={template.name}
          fill
          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 20vw"
          // Fallback: while screenshot not available, show a placeholder bg
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Gradient overlay at bottom of image */}
        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
      </div>

      {/* Selected checkmark */}
      {selected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center shadow-md z-10">
          <svg viewBox="0 0 14 14" width="11" height="11" fill="none">
            <polyline points="2,8 5,12 12,3" stroke="white" strokeWidth="2.4" />
          </svg>
        </div>
      )}

      {/* Lock badge — shown when user can't use it */}
      {showLock && (
        <div
          className="absolute top-2 left-2 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shadow z-10"
          title="Premium"
        >
          <FiLock className="w-2.5 h-2.5 text-white" />
        </div>
      )}

      {/* Info strip */}
      <div className="px-2.5 py-2.5">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-[8.5px] font-extrabold tracking-[1.2px] uppercase text-slate-400">
            {template.tag}
          </span>
          {template.tier === "premium" && (
            <span className="text-[8px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded-full">
              PRO
            </span>
          )}
        </div>
        <div className="text-[12.5px] font-bold text-slate-900 leading-tight">
          {template.name}
        </div>
        {/* Description on hover */}
        <div className="text-[10.5px] text-slate-400 leading-tight mt-0.5 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {template.description}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HTML BUILDER (same as before — not changed)
───────────────────────────────────────────────────────────────*/
function buildHTML(id: string, d: CLData): string {
  const fontDef =
    FONT_FAMILIES.find((f) => f.id === d.fontFamily) || FONT_FAMILIES[0];
  const fontStack = `'${d.fontFamily}',${fontDef.style}`;
  const c = d.accentColor || "#6366f1";
  const sig = d.personal.signature || "Sincerely";
  const nm = d.personal.fullName || "Your Name";
  const ttl = d.personal.title || "Professional";
  const mgr = d.company.hiringManager || "Hiring Manager";
  const loc = [d.company.city, d.company.state].filter(Boolean).join(", ");
  const dt = d.letterDate
    ? new Date(d.letterDate + "T12:00:00").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  const links: string[] = [
    d.personal.email
      ? `<a href="mailto:${d.personal.email}"    style="color:inherit;text-decoration:none">${d.personal.email}</a>`
      : "",
    d.personal.phone
      ? `<a href="tel:${d.personal.phone}"        style="color:inherit;text-decoration:none">${d.personal.phone}</a>`
      : "",
    d.personal.location ? `<span>${d.personal.location}</span>` : "",
    d.personal.linkedin
      ? `<a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank" style="color:inherit;text-decoration:none">${d.personal.linkedin}</a>`
      : "",
    d.personal.github
      ? `<a href="https://${d.personal.github.replace(/^https?:\/\//, "")}"   target="_blank" style="color:inherit;text-decoration:none">${d.personal.github}</a>`
      : "",
    d.personal.website
      ? `<a href="https://${d.personal.website.replace(/^https?:\/\//, "")}"  target="_blank" style="color:inherit;text-decoration:none">${d.personal.website}</a>`
      : "",
  ].filter(Boolean);

  const secRows = (border = false) =>
    d.sections
      .filter((s) => s.content.trim())
      .map(
        (s) => `
    <div style="margin-bottom:24px${border ? `;padding-left:14px;border-left:3px solid ${c}` : ""}">
      <h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${c};margin:0 0 8px">${s.title}</h4>
      <p style="line-height:1.85;margin:0;font-size:13.5px">${s.content.replace(/\n/g, "<br>")}</p>
    </div>`,
      )
      .join("");

  const achBlock = () =>
    !d.achievements.length
      ? ""
      : `<div style="margin:18px 0 22px"><h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${c};margin:0 0 10px">Key Achievements</h4>${d.achievements.map((a) => `<div style="display:flex;gap:9px;margin-bottom:7px;font-size:13px"><span style="color:${c};flex-shrink:0;line-height:1.5">›</span>${a}</div>`).join("")}</div>`;
  const skillBlock = () =>
    !d.skills.length
      ? ""
      : `<div style="margin:16px 0 22px"><h4 style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${c};margin:0 0 10px">Core Skills</h4><div style="display:flex;flex-wrap:wrap;gap:7px">${d.skills.map((s) => `<span style="padding:4px 12px;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.08);border-radius:30px;font-size:12px">${s}</span>`).join("")}</div></div>`;
  const notesBlock = d.notes
    ? `<div style="margin:14px 0;padding:12px 16px;background:rgba(0,0,0,.03);border-left:3px solid #e2e8f0;font-size:12.5px;line-height:1.7;color:#64748b">${d.notes}</div>`
    : "";
  const summaryBlock = d.personal.summary
    ? `<div style="margin-bottom:20px;padding:14px 16px;background:rgba(0,0,0,.03);border-radius:8px;font-size:13px;line-height:1.75;color:#4a5568;font-style:italic">"${d.personal.summary}"</div>`
    : "";
  const referralNote = d.company.referral
    ? `<div style="margin-bottom:14px;font-size:13px;color:#6b7280">Referred by: <strong style="color:#374151">${d.company.referral}</strong></div>`
    : "";
  const addrBlock = `<div style="margin-bottom:20px;font-size:13px;line-height:1.9;color:#4a5568"><strong style="color:#1a202c">${mgr}${d.company.hiringManagerTitle ? `, ${d.company.hiringManagerTitle}` : ""}</strong><br>${d.company.name}${loc ? `<br>${loc}` : ""}</div>`;
  const greet = () =>
    `<div style="font-size:16px;font-weight:600;margin-bottom:22px;color:#111827">Dear ${mgr},</div>`;
  const closingDiv = (col = c) =>
    `<div style="margin-top:36px;font-size:13.5px">${sig},<br><br><strong style="font-size:15px">${nm}</strong>${d.personal.email ? `<br><a href="mailto:${d.personal.email}" style="font-size:12px;color:${col};text-decoration:none">${d.personal.email}</a>` : ""}${d.personal.phone ? `<br><span style="font-size:12px;color:#64748b">${d.personal.phone}</span>` : ""}${d.personal.linkedin ? `<br><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" style="font-size:11.5px;color:${col};text-decoration:none" target="_blank">${d.personal.linkedin}</a>` : ""}</div>`;
  const baseCSS = (extra = "") =>
    `@import url('${fontDef.url}');*{margin:0;padding:0;box-sizing:border-box}html,body{background:#ffffff}body{font-family:${fontStack};color:#374151;background:#ffffff;-webkit-print-color-adjust:exact;print-color-adjust:exact}${extra}`;
  const baseHTML = (css: string, body: string) =>
    `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${css}</style></head><body>${body}</body></html>`;
  const chipsHTML = `<div style="display:flex;flex-wrap:wrap;gap:7px">${links.map((l) => `<span style="padding:5px 14px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.32);border-radius:40px;font-size:11.5px;color:white">${l}</span>`).join("")}</div>`;
  const standardBody = (accent: string, border = false) =>
    `<div style="font-size:12.5px;color:#9ca3af;margin-bottom:22px">${dt}</div>${addrBlock}${referralNote}${greet()}${summaryBlock}${secRows(border)}${achBlock()}${skillBlock()}${notesBlock}${closingDiv(accent)}`;
  const headerChipStyle = `.pg{max-width:860px;margin:0 auto;background:#fff}.hdr{padding:52px 56px 44px;color:white;position:relative;overflow:hidden}.nm{font-size:38px;font-weight:700;letter-spacing:-1.5px;margin-bottom:5px;position:relative}.rl{font-size:14px;opacity:.85;margin-bottom:26px;position:relative}.chips{display:flex;flex-wrap:wrap;gap:7px;position:relative}.chip{padding:5px 14px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.32);border-radius:40px;font-size:11.5px;color:white}.chip a{color:white;text-decoration:none}.body{padding:48px 56px;background:#fff}`;

  // ── gradient header templates ──
  if (
    [
      "aurora",
      "vivid",
      "nova",
      "frost",
      "brushstroke",
      "vortex",
      "blaze",
      "pinnacle",
    ].includes(id)
  ) {
    const bgMap: Record<string, string> = {
      aurora: `background:linear-gradient(135deg,${c},${c}bb)`,
      vivid: `background:linear-gradient(135deg,${c},#ec4899)`,
      nova: `background:${c}`,
      frost: `background:linear-gradient(135deg,rgba(12,74,110,.92),rgba(2,132,199,.9))`,
      brushstroke: `background:${c}`,
      vortex: `background:${c}`,
      blaze: `background:linear-gradient(110deg,${c},#ea580c)`,
      pinnacle: `background:linear-gradient(135deg,${c},${c}dd,${c}88)`,
    };
    return baseHTML(
      baseCSS(headerChipStyle),
      `<div class="pg"><div class="hdr" style="${bgMap[id] || `background:${c}`}"><div class="nm">${nm}</div><div class="rl">${ttl}</div>${chipsHTML}</div><div class="body">${standardBody(c)}</div></div>`,
    );
  }
  if (id === "canvas")
    return baseHTML(
      baseCSS(
        `.pg{max-width:820px;margin:0 auto;padding:60px 64px;background:#fff}.accent{width:4px;background:${c};border-radius:2px;height:72px;float:left;margin-right:20px;margin-top:2px}.nm{font-size:38px;font-weight:800;letter-spacing:-1.5px;color:#111827}.rl{font-size:13px;color:${c};font-weight:600;margin-top:5px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 16px;margin-top:10px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}.div{height:1px;background:#f3f4f6;margin:28px 0;clear:both}`,
      ),
      `<div class="pg"><div class="accent"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`,
    );
  if (id === "gradient")
    return baseHTML(
      baseCSS(
        `.pg{max-width:820px;margin:0 auto;padding:60px 64px;background:#fff;border-left:6px solid ${c}}.nm{font-size:38px;font-weight:800;letter-spacing:-1.5px;color:#111827}.rl{font-size:13px;color:${c};font-weight:600;margin-top:5px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 16px;margin-top:10px;margin-bottom:28px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}.div{height:1px;background:#f3f4f6;margin:20px 0}`,
      ),
      `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`,
    );
  if (id === "tidal")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#fff}.top{height:4px;background:${c}}.hdr{padding:32px 52px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}.nm{font-size:36px;font-weight:800;color:#0f172a;letter-spacing:-1.5px}.rl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${c};margin-top:6px}.cc{text-align:right;font-size:12px;color:#9ca3af}.cv{display:block;margin-bottom:3px}.cv a{color:${c};text-decoration:none}.body{padding:40px 52px}`,
      ),
      `<div class="pg"><div class="top"></div><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div><div class="cc">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div></div>`,
    );
  if (id === "horizon")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#f8fafc}.top{height:3px;background:linear-gradient(90deg,${c},${c}44)}.hdr{padding:40px 52px;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:20px}.nm{font-size:36px;font-weight:800;color:#0f172a;letter-spacing:-1.5px}.rl{font-size:13px;color:${c};font-weight:600;margin-top:6px;margin-bottom:14px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 14px}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.card{background:${c}08;border:1px solid ${c}20;border-radius:10px;padding:14px 18px;min-width:140px}.card-l{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:${c};margin-bottom:5px}.card-v{font-size:12px;font-weight:700;color:#0f172a;line-height:1.4}.body{padding:36px 52px}`,
      ),
      `<div class="pg"><div class="top"></div><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div>${d.company.name ? `<div class="card"><div class="card-l">Applying To</div><div class="card-v">${d.company.jobTitle || "Open Role"}<br><span style="font-size:11px;font-weight:400;color:#64748b">${d.company.name}</span></div></div>` : ""}</div><div class="body">${standardBody(c)}</div></div>`,
    );
  if (id === "lumina")
    return baseHTML(
      baseCSS(
        `.pg{max-width:860px;margin:0 auto;padding:64px 68px;background:#fff}.eyebrow{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-bottom:10px}.nm{font-size:44px;font-weight:800;letter-spacing:-2px;color:#111827;line-height:1}.glow{width:48px;height:3px;background:${c};margin:16px 0 18px;border-radius:2px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:36px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}.div{height:1px;background:${c}22;margin:24px 0}`,
      ),
      `<div class="pg"><div class="eyebrow">${ttl}</div><div class="nm">${nm}</div><div class="glow"></div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`,
    );
  if (id === "obsidian_lite")
    return baseHTML(
      baseCSS(
        `.pg{max-width:900px;margin:0 auto;display:flex;min-height:100vh;background:#f8f7ff}.side{width:240px;background:${c}12;border-right:2px solid ${c}20;padding:44px 24px;flex-shrink:0}.snm{font-size:22px;font-weight:800;color:#1e1b4b;line-height:1.2;margin-bottom:6px}.srl{font-size:10px;color:${c};letter-spacing:1.5px;text-transform:uppercase;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid ${c}20}.slbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:${c}aa;margin-bottom:5px;margin-top:16px}.sv{font-size:11.5px;color:#374151;line-height:1.9;word-break:break-all}.sv a{color:${c};text-decoration:none}.main{flex:1;padding:48px 44px;background:#fff}`,
      ),
      `<div class="pg"><div class="side"><div class="snm">${nm}</div><div class="srl">${ttl}</div>${d.personal.email ? `<div class="slbl">Email</div><div class="sv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></div>` : ""}${d.personal.phone ? `<div class="slbl">Phone</div><div class="sv">${d.personal.phone}</div>` : ""}${d.personal.location ? `<div class="slbl">Location</div><div class="sv">${d.personal.location}</div>` : ""}${d.personal.linkedin ? `<div class="slbl">LinkedIn</div><div class="sv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></div>` : ""}${d.skills.length ? `<div class="slbl" style="margin-top:20px">Skills</div><div style="margin-top:6px">${d.skills.map((s) => `<div style="font-size:11px;color:${c};margin-bottom:3px">• ${s}</div>`).join("")}</div>` : ""}</div><div class="main">${standardBody(c)}</div></div>`,
    );
  if (id === "slate")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#fff}.hdr{padding:44px 52px;border-bottom:3px solid #0f172a;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}.nm{font-size:34px;font-weight:700;color:#0f172a;letter-spacing:-1.5px}.rl{font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-top:7px}.cc{text-align:right}.cv{font-size:11.5px;color:#475569;line-height:2.1;display:block}.cv a{color:${c};text-decoration:none}.tag{display:inline-block;font-size:10.5px;color:#64748b;background:#f1f5f9;border:1px solid #e2e8f0;padding:3px 10px;border-radius:4px;margin-bottom:22px}.body{padding:40px 52px}`,
      ),
      `<div class="pg"><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div><div class="cc">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div><div class="body"><div class="tag">RE: ${d.company.jobTitle || "Open Position"} · ${d.company.name || "Company"}</div>${standardBody(c, true)}</div></div>`,
    );
  if (id === "architect")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#f8fafc}.hdr{padding:44px 52px;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap}.hl{flex:1}.nm{font-size:34px;font-weight:800;color:#0f172a;letter-spacing:-1.5px}.rl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-top:7px;margin-bottom:14px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 14px}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.hr{width:130px;flex-shrink:0;background:#0f172a;border-radius:12px;padding:16px;text-align:center}.hrl{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#94a3b8;margin-bottom:6px}.hrr{font-size:11px;font-weight:700;color:white;line-height:1.4}.body{padding:36px 52px;background:#f8fafc}`,
      ),
      `<div class="pg"><div class="hdr"><div class="hl"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div>${d.company.name ? `<div class="hr"><div class="hrl">Applying to</div><div class="hrr">${d.company.jobTitle || "Open Role"}<br><span style="font-size:10px;font-weight:400;opacity:.7">${d.company.name}</span></div></div>` : ""}</div><div class="body">${standardBody(c, true)}</div></div>`,
    );
  if (id === "nordic")
    return baseHTML(
      baseCSS(
        `.pg{max-width:750px;margin:0 auto;padding:64px 72px;background:#fff}.eye{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-bottom:10px}.nm{font-size:44px;font-weight:700;letter-spacing:-2px;color:#1e1b4b;line-height:1.05}.bar{width:52px;height:3px;background:${c};margin:16px 0 18px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:40px}.cv{font-size:12px;color:#6b7280}.cv a{color:${c};text-decoration:none}.div{height:1px;background:${c}44;margin:24px 0}`,
      ),
      `<div class="pg"><div class="eye">${ttl}</div><div class="nm">${nm}</div><div class="bar"></div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`,
    );
  if (id === "pearl")
    return baseHTML(
      baseCSS(
        `.pg{max-width:820px;margin:0 auto;padding:60px 64px;background:#fff}.nm{font-size:40px;font-weight:800;letter-spacing:-2px;color:#111827;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:700;letter-spacing:.5px;margin-bottom:16px}.d1{height:1.5px;background:${c}33;margin-bottom:16px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 20px;margin-bottom:16px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}.d2{height:1.5px;background:${c}33;margin:20px 0}`,
      ),
      `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="d1"></div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="d2"></div>${standardBody(c)}</div>`,
    );
  if (id === "minimal")
    return baseHTML(
      baseCSS(
        `.pg{max-width:760px;margin:0 auto;padding:70px 80px;background:#fff;border:1px solid #f1f5f9}.nm{font-size:36px;font-weight:700;color:#111;letter-spacing:-1px;margin-bottom:6px}.rl{font-size:12.5px;color:#555;margin-bottom:20px}.div{height:1px;background:#ececec;margin:18px 0}.ctrow{display:flex;flex-wrap:wrap;gap:4px 20px;margin-bottom:12px}.cv{font-size:12px;color:#888}.cv a{color:${c};text-decoration:none;border-bottom:1px solid ${c}33}`,
      ),
      `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div"></div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`,
    );
  if (id === "zen")
    return baseHTML(
      baseCSS(
        `.pg{max-width:760px;margin:0 auto;padding:68px 76px;background:#fafaf9}.nm{font-size:36px;font-weight:700;color:#1c1917;letter-spacing:-.5px;margin-bottom:6px}.rl{font-size:13px;color:#78716c;margin-bottom:20px}.div{height:.5px;background:#d6d3d1;margin:18px 0}.ctrow{display:flex;flex-wrap:wrap;gap:4px 18px;margin-bottom:12px}.cv{font-size:12px;color:#78716c}.cv a{color:${c};text-decoration:none}`,
      ),
      `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div"></div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`,
    );
  if (id === "ivory")
    return baseHTML(
      baseCSS(
        `.pg{max-width:820px;margin:0 auto;background:#fefce8;padding:60px 64px;border-left:5px solid ${c}}.nm{font-size:44px;font-weight:700;color:#1c1917;letter-spacing:-.5px;line-height:1.1}.rl{font-size:13px;color:#92400e;font-style:italic;margin:8px 0 16px}.div{height:1px;background:${c}66;margin:16px 0}.ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:14px}.cv{font-size:12px;color:#78716c}.cv a{color:${c};text-decoration:none}`,
      ),
      `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div"></div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`,
    );
  if (id === "paper")
    return baseHTML(
      baseCSS(
        `.pg{max-width:820px;margin:0 auto;background:#fffef0;padding:60px 64px 60px 80px;border-left:3px solid #ca8a04}.nm{font-size:42px;font-weight:700;color:#1a1209;letter-spacing:-.5px;line-height:1.1}.rl{font-size:13px;color:${c};font-style:italic;margin:8px 0 16px}.div{height:.8px;background:#d0ccb0;margin:16px 0}.ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:14px}.cv{font-size:12px;color:#6b6050}.cv a{color:${c};text-decoration:none}`,
      ),
      `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div"></div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`,
    );
  if (id === "serif")
    return baseHTML(
      baseCSS(
        `.pg{max-width:820px;margin:0 auto;padding:52px 64px;background:#fff}.r1{height:2px;background:#1e293b;margin-bottom:20px}.nm{font-size:42px;font-weight:900;color:#1e293b;letter-spacing:-1.5px;text-align:center;margin-bottom:6px}.rl{font-size:12px;color:#64748b;text-align:center;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px}.ctrow{display:flex;justify-content:center;flex-wrap:wrap;gap:5px 20px;margin-bottom:16px}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.r2{height:1px;background:#e5e7eb;margin-bottom:20px}`,
      ),
      `<div class="pg"><div class="r1"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="r2"></div>${standardBody(c)}</div>`,
    );
  if (id === "editorial")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#fff}.top{height:4px;background:${c}}.hdr{padding:44px 52px 0}.nm{font-size:36px;font-weight:800;color:#1e293b;letter-spacing:-1.5px}.rl{font-size:13px;color:${c};font-weight:600;margin:6px 0 14px}.rule{height:1.5px;background:#334155;margin-bottom:14px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 16px;padding-bottom:16px;border-bottom:1px solid #e2e8f0}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.body{padding:36px 52px}`,
      ),
      `<div class="pg"><div class="top"></div><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="rule"></div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div></div>`,
    );
  if (id === "linen")
    return baseHTML(
      baseCSS(
        `.pg{max-width:800px;margin:0 auto;padding:62px 68px;background:#faf8f5}.accent{width:3px;height:80px;background:${c}66;float:left;margin-right:18px;border-radius:2px;margin-top:2px}.nm{font-size:40px;font-weight:700;color:#1c1917;letter-spacing:-1px;line-height:1.1}.rl{font-size:13px;color:${c};font-weight:600;margin-top:6px;margin-bottom:18px;clear:both}.div{height:1px;background:#e7e5e0;margin:18px 0}.ctrow{display:flex;flex-wrap:wrap;gap:4px 18px;margin-bottom:14px}.cv{font-size:12px;color:#78716c}.cv a{color:${c};text-decoration:none}`,
      ),
      `<div class="pg"><div class="accent"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="div"></div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`,
    );
  if (id === "parchment")
    return baseHTML(
      baseCSS(
        `.pg{max-width:800px;margin:0 auto;padding:56px 68px;background:#fdf8ed}.r1{height:2px;background:${c}66;margin-bottom:3px}.r2{height:.5px;background:${c}33;margin-bottom:18px}.nm{font-size:40px;font-weight:800;color:#2c1a0e;text-align:center;letter-spacing:-1.5px;margin-bottom:4px}.rl{font-size:11px;color:#8a7060;text-align:center;letter-spacing:3px;text-transform:uppercase;margin-bottom:10px}.ctrow{display:flex;justify-content:center;flex-wrap:wrap;gap:4px 18px;margin-bottom:6px}.cv{font-size:12px;color:#78716c}.cv a{color:${c};text-decoration:none}.r3{height:.5px;background:${c}33;margin-top:12px;margin-bottom:20px}`,
      ),
      `<div class="pg"><div class="r1"></div><div class="r2"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="r3"></div>${standardBody(c)}</div>`,
    );
  if (id === "designer")
    return baseHTML(
      baseCSS(
        `.pg{max-width:900px;margin:0 auto;display:flex;min-height:100vh;background:#faf5ff}.side{width:260px;background:${c}10;border-right:2px solid ${c}20;padding:44px 26px;flex-shrink:0}.savatar{width:52px;height:52px;border-radius:50%;background:${c}22;border:2px solid ${c}44;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:20px;color:${c}}.snm{font-size:22px;font-weight:800;color:#1a1a2e;line-height:1.15;margin-bottom:6px}.srl{font-size:10px;color:${c};letter-spacing:2px;text-transform:uppercase;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid ${c}22}.slbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:${c}88;margin-bottom:5px;margin-top:18px}.sv{font-size:11px;color:#374151;line-height:1.9}.sv a{color:${c};text-decoration:none}.main{flex:1;padding:48px 44px;background:#fff}`,
      ),
      `<div class="pg"><div class="side"><div class="savatar">✦</div><div class="snm">${nm}</div><div class="srl">${ttl}</div>${d.personal.email ? `<div class="slbl">Email</div><div class="sv"><a href="mailto:${d.personal.email}">${d.personal.email}</a></div>` : ""}${d.personal.phone ? `<div class="slbl">Phone</div><div class="sv">${d.personal.phone}</div>` : ""}${d.personal.location ? `<div class="slbl">Location</div><div class="sv">${d.personal.location}</div>` : ""}${d.personal.linkedin ? `<div class="slbl">LinkedIn</div><div class="sv"><a href="https://${d.personal.linkedin.replace(/^https?:\/\//, "")}" target="_blank">${d.personal.linkedin}</a></div>` : ""}${d.skills.length ? `<div class="slbl" style="margin-top:22px">Skills</div><div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px">${d.skills.map((s) => `<span style="padding:2px 8px;background:${c}15;border:1px solid ${c}30;border-radius:4px;font-size:10px;color:${c}">${s}</span>`).join("")}</div>` : ""}</div><div class="main">${standardBody(c)}</div></div>`,
    );
  if (id === "motion")
    return baseHTML(
      baseCSS(
        `.pg{max-width:860px;margin:0 auto;background:#fff}.tb{height:5.5px;background:linear-gradient(90deg,${c},#f59e0b)}.hdr{padding:44px 52px;border-bottom:1px solid #f3e4e4;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}.nm{font-size:48px;font-weight:900;letter-spacing:-3px;text-transform:uppercase;line-height:.95;color:#111827}.rl{font-size:13px;color:${c};letter-spacing:2px;text-transform:uppercase;margin-top:8px;font-weight:600}.cc{text-align:right;font-size:12px;color:#9ca3af}.cv{display:block;margin-bottom:4px}.cv a{color:${c};text-decoration:none}.body{padding:44px 52px}.bb{height:5.5px;background:linear-gradient(90deg,#f59e0b,${c})}`,
      ),
      `<div class="pg"><div class="tb"></div><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div><div class="cc">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div><div class="bb"></div></div>`,
    );
  if (id === "studio")
    return baseHTML(
      baseCSS(
        `.pg{max-width:860px;margin:0 auto;background:#f8f5ff}.top{height:3px;background:linear-gradient(90deg,${c},${c}44)}.hdr{padding:48px 52px 36px;border-bottom:1px solid ${c}18}.nm{font-size:40px;font-weight:800;color:#1e1b4b;letter-spacing:-1.5px;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:600;margin-bottom:18px}.chips{display:flex;flex-wrap:wrap;gap:7px}.chip{padding:4px 12px;background:${c}10;border:1px solid ${c}25;border-radius:20px;font-size:11.5px;color:${c}}.body{padding:44px 52px;background:#fff}`,
      ),
      `<div class="pg"><div class="top"></div><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="chips">${links.map((l) => `<span class="chip">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div></div>`,
    );
  if (id === "folio")
    return baseHTML(
      baseCSS(
        `.pg{max-width:820px;margin:0 auto;padding:52px 64px;background:#fff}.hrow{display:flex;align-items:flex-start;gap:28px;margin-bottom:30px;padding-bottom:24px;border-bottom:2px solid ${c}22}.avatar{width:64px;height:64px;border-radius:12px;background:${c}22;border:2px solid ${c}44;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;color:${c}}.hinfo .nm{font-size:34px;font-weight:800;color:#111827;letter-spacing:-1.5px}.hinfo .rl{font-size:13px;color:${c};font-weight:600;margin-top:4px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:8px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}`,
      ),
      `<div class="pg"><div class="hrow"><div class="avatar">✦</div><div class="hinfo"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div></div>${standardBody(c)}</div>`,
    );
  if (id === "artboard")
    return baseHTML(
      baseCSS(
        `.pg{max-width:820px;margin:0 auto;background:#f4f3f8;padding:8px}.card{background:#fff;border-radius:8px;overflow:hidden;border:1.5px dashed ${c}44}.top{height:3px;background:${c}}.hdr{padding:40px 52px 28px}.nm{font-size:36px;font-weight:800;color:#111827;letter-spacing:-1.5px}.rl{font-size:13px;color:${c};font-weight:600;margin-top:5px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:10px;margin-bottom:4px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}.body{padding:28px 52px 52px}`,
      ),
      `<div class="pg"><div class="card"><div class="top"></div><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div></div></div>`,
    );
  if (id === "palette")
    return baseHTML(
      baseCSS(
        `.pg{max-width:820px;margin:0 auto;padding:60px 64px;background:#fff7f5;border-left:4px solid ${c}}.nm{font-size:40px;font-weight:800;color:#1c0a06;letter-spacing:-1.5px;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:600;margin-bottom:18px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:14px}.cv{font-size:12px;color:#78716c}.cv a{color:${c};text-decoration:none}.div{height:1px;background:#fce7e0;margin:18px 0}`,
      ),
      `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`,
    );
  if (id === "frame")
    return baseHTML(
      baseCSS(
        `.pg{max-width:820px;margin:0 auto;padding:16px;background:#fafafa}.inner{background:#fff;border:2px solid ${c};border-radius:10px;padding:44px 52px;overflow:hidden}.nm{font-size:38px;font-weight:800;color:#111827;letter-spacing:-1.5px;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:600;margin-bottom:14px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 16px;margin-bottom:14px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}.div{height:1px;background:${c}20;margin:18px 0}`,
      ),
      `<div class="pg"><div class="inner"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div></div>`,
    );
  if (id === "mosaic")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#fff}.hdr{padding:44px 52px;display:flex;gap:24px;align-items:center;border-bottom:1px solid #f0f0f0}.mosaic{display:grid;grid-template-columns:repeat(3,34px);grid-template-rows:repeat(3,34px);gap:2px;flex-shrink:0}.cell{border-radius:4px}.nm{font-size:34px;font-weight:800;color:#111827;letter-spacing:-1.5px}.rl{font-size:13px;color:${c};font-weight:600;margin:6px 0 12px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 14px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}.body{padding:36px 52px}`,
      ),
      `<div class="pg"><div class="hdr"><div class="mosaic">${[...Array(9)].map((_, i) => `<div class="cell" style="background:${i % 3 === 0 ? c : i % 3 === 1 ? `${c}66` : `${c}22`}"></div>`).join("")}</div><div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div></div><div class="body">${standardBody(c)}</div></div>`,
    );
  if (id === "radiant")
    return baseHTML(
      baseCSS(
        `.pg{max-width:860px;margin:0 auto;padding:62px 68px;background:#fff;border-left:5px solid ${c}}.nm{font-size:44px;font-weight:800;letter-spacing:-2px;color:#1e1b4b;line-height:1;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:600;margin-bottom:20px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:36px}.cv{font-size:12px;color:#9ca3af}.cv a{color:${c};text-decoration:none}.div{height:1px;background:${c}20;margin:22px 0}`,
      ),
      `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`,
    );
  if (id === "solstice")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#fff}.topbar{height:3px;background:${c}}.hdr{padding:44px 52px;background:${c}08;border-bottom:2px solid ${c}18;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px}.nm{font-size:36px;font-weight:800;color:#0f172a;letter-spacing:-1.5px}.rl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${c};margin-top:6px;margin-bottom:14px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 14px}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.card{background:#fff;border:1px solid ${c}20;border-radius:10px;padding:14px 18px}.card-l{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:${c};margin-bottom:4px}.card-v{font-size:12px;font-weight:700;color:#0f172a;line-height:1.4}.body{padding:36px 52px}.bot{height:3px;background:${c}}`,
      ),
      `<div class="pg"><div class="topbar"></div><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div>${d.company.name ? `<div class="card"><div class="card-l">Position</div><div class="card-v">${d.company.jobTitle || "Open Role"}<br><span style="font-size:11px;font-weight:400;color:#64748b">${d.company.name}</span></div></div>` : ""}</div><div class="body">${standardBody(c)}</div><div class="bot"></div></div>`,
    );
  if (id === "meridian")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#f8fafc}.top{height:2px;background:${c}}.hdr{padding:28px 52px;background:#fff;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}.nm{font-size:34px;font-weight:800;color:#0f172a;letter-spacing:-1.5px}.rl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${c};margin-top:5px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 14px;margin-top:8px}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.badge{background:${c};border-radius:8px;padding:12px 18px;text-align:center}.badge-t{font-size:9px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.75);margin-bottom:3px}.badge-v{font-size:11px;font-weight:700;color:#fff;line-height:1.4}.tb2{height:2px;background:${c}}.body{padding:32px 52px}`,
      ),
      `<div class="pg"><div class="top"></div><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div>${d.company.name ? `<div class="badge"><div class="badge-t">Applying To</div><div class="badge-v">${d.company.jobTitle || "Role"}<br><span style="font-size:10px;opacity:.8">${d.company.name}</span></div></div>` : ""}</div><div class="tb2"></div><div class="body">${standardBody(c)}</div></div>`,
    );
  if (id === "presidio")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#fafafa}.top{height:2px;background:${c}}.hdr{padding:44px 52px;background:#fff;border-bottom:1px solid #e5e7eb}.nm{font-size:36px;font-weight:800;color:#111827;letter-spacing:-1.5px;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:600;margin-bottom:16px}.inforow{display:flex;background:${c}08;border:1px solid ${c}15;border-radius:8px;padding:10px 14px;flex-wrap:wrap;gap:16px}.cv{font-size:12px;color:#374151}.cv a{color:${c};text-decoration:none}.body{padding:36px 52px}`,
      ),
      `<div class="pg"><div class="top"></div><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="inforow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div></div>`,
    );
  if (id === "accord")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#fff}.top{height:4px;background:linear-gradient(90deg,${c},${c}44)}.hdr{padding:40px 52px;border-bottom:2px solid #f1f5f9}.nm{font-size:36px;font-weight:800;color:#0f172a;letter-spacing:-1.5px;margin-bottom:6px}.rl{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-bottom:14px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 18px}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.body{padding:36px 52px}`,
      ),
      `<div class="pg"><div class="top"></div><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div></div>`,
    );
  if (id === "circuit")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#f8faff;padding:60px 64px}.nm{font-size:38px;font-weight:800;color:#0f172a;letter-spacing:-1.5px;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:600;margin-bottom:18px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 16px;margin-bottom:14px}.cv{font-size:12px;color:#64748b;padding:3px 10px;background:${c}08;border:1px solid ${c}18;border-radius:6px}.cv a{color:${c};text-decoration:none}.div{height:1px;background:${c}18;margin:20px 0}`,
      ),
      `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`,
    );
  if (id === "blueprint")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#eff6ff;padding:60px 64px}.nm{font-size:38px;font-weight:800;color:#1e3a8a;letter-spacing:-1.5px;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:600;margin-bottom:18px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 16px;margin-bottom:14px}.cv{font-size:12px;color:#3b82f6}.cv a{color:${c};text-decoration:none}.div{height:1px;background:#93c5fd;margin:20px 0}`,
      ),
      `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`,
    );
  if (id === "axiom")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#fff}.top{height:4px;background:${c}}.hdr{padding:38px 52px;border-bottom:2px solid ${c}15}.nm{font-size:36px;font-weight:800;color:#0f172a;letter-spacing:-1.5px;margin-bottom:6px}.rl{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-bottom:14px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 16px}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.body{padding:36px 52px}.bot{height:2px;background:${c}15}`,
      ),
      `<div class="pg"><div class="top"></div><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div><div class="bot"></div></div>`,
    );
  if (id === "signal")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;padding:60px 64px;background:#fff}.nm{font-size:42px;font-weight:800;color:#0f172a;letter-spacing:-2px;margin-bottom:6px}.rl{font-size:13px;color:${c};font-weight:600;margin-bottom:20px}.ctrow{display:flex;flex-wrap:wrap;gap:5px 18px;margin-bottom:14px}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.div{height:1px;background:#e2e8f0;margin:20px 0}`,
      ),
      `<div class="pg"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="div"></div>${standardBody(c)}</div>`,
    );
  if (id === "quantum")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#f8fafc}.hdr{padding:48px 52px;background:#fff;border-bottom:1px solid #e2e8f0;position:relative;overflow:hidden}.accent-corner{position:absolute;top:0;left:0;width:0;height:0;border-style:solid;border-width:60px 60px 0 0;border-color:${c} transparent transparent transparent}.nm{font-size:38px;font-weight:800;color:#0f172a;letter-spacing:-1.5px;margin-bottom:6px;position:relative}.rl{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-bottom:16px;position:relative}.ctrow{display:flex;flex-wrap:wrap;gap:5px 16px;position:relative}.cv{font-size:12px;color:#64748b}.cv a{color:${c};text-decoration:none}.body{padding:36px 52px}.bot{height:3px;background:${c}44}`,
      ),
      `<div class="pg"><div class="hdr"><div class="accent-corner"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div><div class="bot"></div></div>`,
    );
  if (id === "corporate")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#fff}.hdr{padding:0 52px;background:#1e3a5f;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;min-height:70px}.hdr-l{padding:18px 0}.nm{font-size:28px;font-weight:800;color:white;letter-spacing:-1px}.rl{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-top:4px}.cv{font-size:11px;color:rgba(255,255,255,.7);line-height:2;display:block}.cv a{color:${c};text-decoration:none}.stripe{height:5px;background:${c}}.body{padding:36px 52px}`,
      ),
      `<div class="pg"><div class="hdr"><div class="hdr-l"><div class="nm">${nm}</div><div class="rl">${ttl}</div></div><div>${links
        .slice(0, 4)
        .map((l) => `<span class="cv">${l}</span>`)
        .join(
          "",
        )}</div></div><div class="stripe"></div><div class="body">${standardBody(c)}</div></div>`,
    );
  if (id === "executive")
    return baseHTML(
      baseCSS(
        headerChipStyle +
          `.hdr{background:linear-gradient(135deg,${c},${c}cc)!important}`,
      ),
      `<div class="pg"><div class="hdr" style="background:linear-gradient(135deg,${c},${c}cc)"><div class="nm">${nm}</div><div class="rl">${ttl}</div>${chipsHTML}</div><div class="body">${standardBody(c)}</div></div>`,
    );
  if (id === "titan")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#fff;border-left:8px solid ${c}}.hdr{padding:44px 48px;border-bottom:2px solid #e5e7eb}.nm{font-size:36px;font-weight:800;color:#1f2937;letter-spacing:-1.5px}.rl{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-top:7px;margin-bottom:14px}.ctrow{display:flex;flex-wrap:wrap;gap:4px 18px}.cv{font-size:12px;color:#6b7280}.cv a{color:${c};text-decoration:none}.body{padding:36px 48px}`,
      ),
      `<div class="pg"><div class="hdr"><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div></div><div class="body">${standardBody(c)}</div></div>`,
    );
  if (id === "oxford")
    return baseHTML(
      baseCSS(
        `.pg{max-width:800px;margin:0 auto;padding:56px 68px;background:#faf9f7}.rule{height:2px;background:${c};margin-bottom:3px}.rule2{height:.5px;background:${c}66;margin-bottom:18px}.nm{font-size:40px;font-weight:800;color:#1a1209;text-align:center;letter-spacing:-1.5px;margin-bottom:4px}.rl{font-size:11px;color:${c};text-align:center;letter-spacing:3px;text-transform:uppercase;margin-bottom:10px}.ctrow{display:flex;justify-content:center;flex-wrap:wrap;gap:4px 18px;margin-bottom:6px}.cv{font-size:12px;color:#78716c}.cv a{color:${c};text-decoration:none}.rule3{height:.5px;background:${c}66;margin-top:12px;margin-bottom:20px}`,
      ),
      `<div class="pg"><div class="rule"></div><div class="rule2"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div><div class="ctrow">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="rule3"></div>${standardBody(c)}</div>`,
    );
  if (id === "summit")
    return baseHTML(
      baseCSS(
        `.pg{max-width:880px;margin:0 auto;background:#fff}.top{height:3px;background:${c}}.hdr{padding:40px 52px;background:#1e293b;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}.nm{font-size:34px;font-weight:800;color:white;letter-spacing:-1.5px}.rl{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${c};margin-top:6px}.badge{background:${c};border-radius:8px;padding:12px 18px;text-align:center}.badge-t{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.75);margin-bottom:4px}.badge-r{font-size:12px;font-weight:700;color:white;line-height:1.4}.ctbar{display:flex;flex-wrap:wrap;background:#0f172a}.cv{font-size:11px;color:#94a3b8;padding:8px 20px;border-right:1px solid rgba(255,255,255,.06)}.cv a{color:${c};text-decoration:none}.body{padding:36px 52px}.bot{height:3px;background:${c}}`,
      ),
      `<div class="pg"><div class="top"></div><div class="hdr"><div><div class="nm">${nm}</div><div class="rl">${ttl}</div></div>${d.company.name ? `<div class="badge"><div class="badge-t">Applying To</div><div class="badge-r">${d.company.jobTitle || "Role"}<br><span style="font-size:10px;font-weight:400;opacity:.8">${d.company.name}</span></div></div>` : ""}</div><div class="ctbar">${links.map((l) => `<span class="cv">${l}</span>`).join("")}</div><div class="body">${standardBody(c)}</div><div class="bot"></div></div>`,
    );
  if (id === "prism")
    return baseHTML(
      baseCSS(headerChipStyle),
      `<div class="pg"><div class="hdr" style="background:${c}"><div style="position:absolute;right:0;top:0;bottom:0;width:55%;background:rgba(255,255,255,.1);clip-path:polygon(25% 0,100% 0,100% 100%,0 100%)"></div><div class="nm">${nm}</div><div class="rl">${ttl}</div>${chipsHTML}</div><div class="body">${standardBody(c)}</div></div>`,
    );
  // fallback
  return baseHTML(
    baseCSS(headerChipStyle),
    `<div class="pg"><div class="hdr" style="background:linear-gradient(135deg,${c},${c}bb)"><div class="nm">${nm}</div><div class="rl">${ttl}</div>${chipsHTML}</div><div class="body">${standardBody(c)}</div></div>`,
  );
}

/* ─────────────────────────────────────────────────────────────
   STEPS
───────────────────────────────────────────────────────────────*/
type Step = "template" | "personal" | "company" | "content" | "review";
const STEPS: { id: Step; label: string; icon: string }[] = [
  { id: "template", label: "Template", icon: "🎨" },
  { id: "personal", label: "Personal", icon: "👤" },
  { id: "company", label: "Company", icon: "🏢" },
  { id: "content", label: "Content", icon: "✍️" },
  { id: "review", label: "Review", icon: "✅" },
];

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
const inp =
  "w-full px-3 py-2.5 text-[13px] font-[500] border-[1.5px] border-slate-200 rounded-xl outline-none transition-all duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 bg-white text-slate-800";
const ta = `${inp} resize-y min-h-[80px] leading-relaxed px-3`;

/* ─────────────────────────────────────────────────────────────
   POPUPS
───────────────────────────────────────────────────────────────*/
function LoginPopup({
  onClose,
  onLogin,
}: {
  onClose: () => void;
  onLogin: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[2000] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-white to-violet-50/40 pointer-events-none" />
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg shadow-indigo-200">
            ✦
          </div>
          <h2 className="text-[22px] font-extrabold text-slate-900 text-center mb-2">
            Sign in to Continue
          </h2>
          <p className="text-[13.5px] text-slate-500 text-center mb-6 leading-relaxed">
            You need to be logged in to build and download your professional
            cover letter.
          </p>
          <button
            onClick={onLogin}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-[14px] rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all mb-3"
          >
            Sign In to Your Account
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 text-[13px] text-slate-400 font-semibold hover:text-slate-600 transition-colors"
          >
            Browse templates first →
          </button>
          <p className="text-center text-[12px] text-slate-400 mt-3">
            Don't have an account?{" "}
            <span
              className="text-indigo-600 font-semibold cursor-pointer"
              onClick={onLogin}
            >
              Sign up free
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function PremiumPopup({
  onClose,
  onUpgrade,
}: {
  onClose: () => void;
  onUpgrade: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[2000] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-white to-indigo-50/40 pointer-events-none" />
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -top-1 -right-1 w-8 h-8 bg-slate-100 hover:bg-red-50 rounded-full flex items-center justify-center text-slate-400 hover:text-red-400 transition-all"
          >
            <FiX className="w-4 h-4" />
          </button>
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg shadow-amber-200">
            ⭐
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-[11.5px] font-bold mb-4 mx-auto flex justify-center">
            <FiLock className="w-3 h-3" /> Premium Feature
          </div>
          <h2 className="text-[22px] font-extrabold text-slate-900 text-center mb-2">
            Upgrade to Premium
          </h2>
          <p className="text-[13.5px] text-slate-500 text-center mb-6 leading-relaxed">
            Building and downloading your cover letter requires a Premium plan.
            Unlock all 50 templates and powerful AI features.
          </p>
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            {[
              "50 Unique Templates",
              "AI Content Assist",
              "Custom Fonts & Colors",
              "PDF Download",
              "Unlimited Letters",
              "Priority Support",
            ].map((f) => (
              <div
                key={f}
                className="flex items-center gap-2 text-[12px] font-semibold text-slate-700 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-2.5"
              >
                <span className="w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 10 10" width="8" height="8" fill="none">
                    <polyline
                      points="1,5 4,8 9,2"
                      stroke="white"
                      strokeWidth="1.8"
                    />
                  </svg>
                </span>
                {f}
              </div>
            ))}
          </div>
          <button
            onClick={onUpgrade}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-[14px] rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Upgrade to Premium →
          </button>
          <button
            onClick={onClose}
            className="mt-2.5 w-full py-2 text-[12.5px] text-slate-400 font-semibold hover:text-slate-600 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────*/
export default function CoverLetterGenerator() {
  const router = useRouter();
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [step, setStep] = useState<Step>("template");
  const [tplId, setTplId] = useState("aurora");
  const [data, setData] = useState<CLData>(JSON.parse(JSON.stringify(BLANK)));
  const [html, setHtml] = useState("");
  const [modal, setModal] = useState(false);
  const [achIn, setAchIn] = useState("");
  const [sklIn, setSklIn] = useState("");
  const [toast, setToast] = useState("");
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState("All");
  const [showColors, setShowColors] = useState(false);
  const [showFonts, setShowFonts] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  const liveRef = useRef<HTMLIFrameElement>(null);
  const modalRef = useRef<HTMLIFrameElement>(null);

  // ── Auth + premium check ──
  useEffect(() => {
    const userDetails = getLocalStorage<User>("user_details");
    const userId = userDetails?.id;
    if (!userId) {
      setIsLoggedIn(false);
      setIsPremium(false);
      setTimeout(() => setShowLoginPopup(true), 600);
      return;
    }
    setIsLoggedIn(true);
    axios
      .get(`${API_URL}/api/users/dashboard`, { params: { userId } })
      .then((res) => {
        const payment = res?.data?.payments?.[0];
        const premium = payment?.plan === "Premium";
        setIsPremium(premium);
        if (!premium) setTimeout(() => setShowPremiumPopup(true), 600);
      })
      .catch(() => setIsPremium(false));
  }, []);

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

  const handleStepChange = (targetStep: Step) => {
    if (targetStep === "template") {
      setStep(targetStep);
      return;
    }
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }
    if (!isPremium) {
      setShowPremiumPopup(true);
      return;
    }
    setStep(targetStep);
  };
  const handleContinue = () => {
    const idx = STEPS.findIndex((s) => s.id === step);
    if (step === "template") {
      if (!isLoggedIn) {
        setShowLoginPopup(true);
        return;
      }
      if (!isPremium) {
        setShowPremiumPopup(true);
        return;
      }
    }
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].id);
  };
  const downloadPDF = async () => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }
    if (!isPremium) {
      setShowPremiumPopup(true);
      return;
    }
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
  const cats = getCLTemplateTags();
  const shown = filterCLTemplates(filter);
  const tones = [
    "Professional",
    "Confident",
    "Enthusiastic",
    "Formal",
    "Creative",
    "Friendly",
  ];

  if (isLoggedIn === null)
    return (
      <div className="min-h-screen bg-indigo-50 flex items-center justify-center">
        <div className="text-indigo-600 font-bold text-[14px] animate-pulse">
          Loading Cover Letter Studio…
        </div>
      </div>
    );

  return (
    <>
      <style>{`
        html,body{overflow:hidden}
        @media(max-width:820px){html,body{overflow:auto}}
        .canvas-iframe{width:860px;height:1120px;border:none;display:block;background:#fff;pointer-events:none}
        .modal-iframe{width:860px;height:1120px;border:none;display:block;background:#fff}
        @keyframes livePulse{0%,100%{box-shadow:0 0 0 2px rgba(16,185,129,.2)}50%{box-shadow:0 0 0 5px rgba(16,185,129,.07)}}
        .live-dot{animation:livePulse 2s infinite}
        @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        .toast-anim{animation:toastIn .22s ease}
        @keyframes modalIn{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        .modal-anim{animation:modalIn .22s ease}
        @keyframes ovIn{from{opacity:0}to{opacity:1}}
        .ov-anim{animation:ovIn .18s ease}
        .scrollbar-none{scrollbar-width:none}
        .scrollbar-none::-webkit-scrollbar{display:none}
      `}</style>

      <AnimatePresence>
        {showLoginPopup && (
          <LoginPopup
            onClose={() => setShowLoginPopup(false)}
            onLogin={() => router.push("/login")}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showPremiumPopup && !showLoginPopup && (
          <PremiumPopup
            onClose={() => setShowPremiumPopup(false)}
            onUpgrade={() => router.push("/choose-plan")}
          />
        )}
      </AnimatePresence>

      {/* NAV */}
      <nav className="h-[58px] bg-white border-b border-slate-200 flex items-center px-4 md:px-5 gap-3 z-50 relative shadow-sm flex-shrink-0">
        <button
          onClick={() => router.push("/")}
          className="cursor-pointer flex-shrink-0"
        >
          <div className="relative w-[100px] sm:w-[140px] h-[34px] sm:h-[46px]">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
              sizes="(max-width:640px) 100px,140px"
            />
          </div>
        </button>
        <div className="flex items-center flex-1 justify-center overflow-x-auto scrollbar-none gap-0 py-1">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              {i > 0 && (
                <div
                  className={`w-5 h-0.5 flex-shrink-0 transition-colors ${i <= stepIdx ? "bg-emerald-500" : "bg-slate-200"}`}
                />
              )}
              <button
                onClick={() => handleStepChange(s.id)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[12px] font-semibold transition-all flex-shrink-0 cursor-pointer ${i < stepIdx ? "text-slate-800" : i === stepIdx ? "text-indigo-600 bg-indigo-50" : "text-slate-400 hover:bg-slate-50"}`}
              >
                <span
                  className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${i < stepIdx ? "bg-emerald-500 text-white" : i === stepIdx ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-[0_0_0_3px_rgba(91,56,240,.16)]" : "bg-slate-100 text-slate-400"}`}
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
        <button
          onClick={downloadPDF}
          disabled={busy}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all flex-shrink-0"
        >
          {busy ? "⏳" : "⬇"} PDF
        </button>
      </nav>

      {/* SHELL */}
      <div className="grid lg:grid-cols-[400px_1fr] xl:grid-cols-[420px_1fr] h-[calc(100vh-58px)]">
        {/* LEFT */}
        <div className="flex flex-col overflow-hidden bg-slate-50 border-r border-slate-200">
          <div className="flex-shrink-0 px-5 pt-4 pb-0">
            <h2 className="font-semibold text-slate-900 tracking-tight mb-0.5 text-[15px]">
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
            <p className="text-[12.5px] text-slate-500 mb-2">
              {step === "template"
                ? "50 unique modern professional designs"
                : step === "personal"
                  ? "Your details appear as clickable links"
                  : step === "company"
                    ? "Where you're applying"
                    : step === "content"
                      ? "Build your letter paragraph by paragraph"
                      : "Check everything before downloading"}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pt-3 pb-20 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent">
            {/* TEMPLATE STEP */}
            {step === "template" && (
              <>
                {/* Info banners */}
                {isLoggedIn && !isPremium && (
                  <div className="mb-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      ⭐
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-bold text-amber-800">
                        Browse freely, upgrade to use
                      </p>
                      <p className="text-[11px] text-amber-600">
                        Select any template then upgrade to Premium
                      </p>
                    </div>
                    <button
                      onClick={() => setShowPremiumPopup(true)}
                      className="text-[11px] font-bold text-amber-700 bg-amber-100 border border-amber-200 px-2.5 py-1.5 rounded-lg flex-shrink-0"
                    >
                      Upgrade
                    </button>
                  </div>
                )}
                {!isLoggedIn && (
                  <div className="mb-3 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 rounded-2xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      ✦
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-bold text-indigo-800">
                        Browse templates freely
                      </p>
                      <p className="text-[11px] text-indigo-600">
                        Sign in to build and download
                      </p>
                    </div>
                    <button
                      onClick={() => setShowLoginPopup(true)}
                      className="text-[11px] font-bold text-indigo-700 bg-indigo-100 border border-indigo-200 px-2.5 py-1.5 rounded-lg flex-shrink-0"
                    >
                      Sign In
                    </button>
                  </div>
                )}

                {/* Filter pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {cats.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border-[1.5px] transition-all ${filter === cat ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-slate-200 text-slate-500 bg-white hover:border-indigo-200"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Color picker */}
                <div className="mb-3 bg-white rounded-2xl border border-indigo-100 p-3">
                  <button
                    onClick={() => setShowColors((v) => !v)}
                    className="w-full flex items-center justify-between text-[12px] font-bold text-slate-700"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full border border-white shadow-sm"
                        style={{ background: data.accentColor || "#6366f1" }}
                      />
                      Accent Color
                    </span>
                    <span className="text-slate-400 text-[10px]">
                      {showColors ? "▲" : "▼"}
                    </span>
                  </button>
                  {showColors && (
                    <div className="flex flex-wrap gap-2 mt-2.5">
                      {COLOR_PALETTES.map((p) => (
                        <button
                          key={p.value}
                          title={p.label}
                          onClick={() =>
                            setData((d) => ({ ...d, accentColor: p.value }))
                          }
                          className={`w-7 h-7 rounded-full border-2 transition-all ${data.accentColor === p.value ? "border-white scale-110 shadow-lg" : "border-transparent hover:scale-105"}`}
                          style={{
                            background: p.value,
                            boxShadow:
                              data.accentColor === p.value
                                ? `0 0 0 2px ${p.value}`
                                : "",
                          }}
                        />
                      ))}
                      <label
                        className="w-7 h-7 rounded-full border-2 border-slate-200 overflow-hidden cursor-pointer hover:scale-105 transition-all"
                        title="Custom color"
                      >
                        <input
                          type="color"
                          value={data.accentColor || "#6366f1"}
                          onChange={(e) =>
                            setData((d) => ({
                              ...d,
                              accentColor: e.target.value,
                            }))
                          }
                          className="w-8 h-8 -ml-0.5 -mt-0.5 cursor-pointer"
                        />
                      </label>
                    </div>
                  )}
                </div>

                {/* Font picker */}
                <div className="mb-3 bg-white rounded-2xl border border-indigo-100 p-3">
                  <button
                    onClick={() => setShowFonts((v) => !v)}
                    className="w-full flex items-center justify-between text-[12px] font-bold text-slate-700"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-indigo-500">Aa</span>Font:{" "}
                      {data.fontFamily}
                    </span>
                    <span className="text-slate-400 text-[10px]">
                      {showFonts ? "▲" : "▼"}
                    </span>
                  </button>
                  {showFonts && (
                    <div className="mt-2.5 space-y-1.5 max-h-40 overflow-y-auto">
                      {FONT_FAMILIES.map((f) => (
                        <button
                          key={f.id}
                          onClick={() =>
                            setData((d) => ({ ...d, fontFamily: f.id }))
                          }
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[12.5px] transition-all ${data.fontFamily === f.id ? "bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold" : "hover:bg-slate-50 text-slate-700 border border-transparent"}`}
                        >
                          <span style={{ fontFamily: `'${f.id}',${f.style}` }}>
                            {f.label}
                          </span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {f.style}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/*
                  ── TEMPLATE GRID — screenshot images ──────────────────
                  Uses TemplateCard with Next.js Image component.
                  Screenshots stored in /public/images/cover-letters/
                  Named: cl-{template.id}.jpg  (e.g. cl-aurora.jpg)
                */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {shown.map((t) => (
                    <TemplateCard
                      key={t.id}
                      template={t}
                      selected={tplId === t.id}
                      onClick={() => setTplId(t.id)}
                      showLock={!isLoggedIn || !isPremium}
                    />
                  ))}
                </div>
              </>
            )}

            {/* PERSONAL */}
            {step === "personal" && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
                <div className="flex items-center gap-3 mb-4">
                  <div>
                    <p className="text-[14px] font-extrabold text-slate-900">
                      Your Profile
                    </p>
                    <p className="text-[11.5px] text-slate-500">
                      All fields appear as clickable links in your letter
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-0">
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
                <div className="grid sm:grid-cols-2 gap-0">
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
                  🔗 Online Presence
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
                <div className="grid sm:grid-cols-2 gap-0">
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
                    placeholder="2–3 sentence summary…"
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

            {/* COMPANY */}
            {step === "company" && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
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

            {/* CONTENT */}
            {step === "content" && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
                <F label="Letter Date" icon="📅">
                  <input
                    className={inp}
                    type="date"
                    value={data.letterDate}
                    onChange={(e) => set(["letterDate"], e.target.value)}
                  />
                </F>
                <div className="h-px bg-indigo-50 my-3" />
                <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
                  ✍️ Letter Sections
                </p>
                {data.sections.map((s, i) => (
                  <div
                    key={s.id}
                    className="bg-indigo-50/60 border-[1.5px] border-indigo-100 rounded-xl p-3 mb-2.5 focus-within:bg-white focus-within:border-indigo-400 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-[22px] h-[22px] rounded-[7px] bg-gradient-to-br from-indigo-600 to-violet-600 text-white text-[10px] font-extrabold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <input
                        value={s.title}
                        onChange={(e) => setSec(s.id, "title", e.target.value)}
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
                          className="w-6 h-6 bg-white border-[1.5px] border-slate-200 rounded-[6px] text-red-400 text-[12px] flex items-center justify-center hover:bg-red-50 transition-all"
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
                      className="w-full px-2.5 py-2 rounded-lg border-[1.5px] border-slate-200 bg-white text-[12.5px] text-slate-800 leading-relaxed outline-none focus:border-indigo-500 transition-all resize-y"
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
                  className="w-full py-2 mb-3 bg-white border-[1.5px] border-dashed border-indigo-200 rounded-xl text-[12.5px] font-bold text-indigo-600 hover:bg-indigo-50 transition-all"
                >
                  + Add Section
                </button>
                <div className="h-px bg-indigo-50 my-3" />
                <p className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-500 mb-2">
                  🏆 Key Achievements
                </p>
                <div className="flex gap-2 mb-2">
                  <input
                    className="flex-1 px-3 py-2 text-[12.5px] border-[1.5px] border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all"
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
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[12px] font-bold rounded-xl"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
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
                        className="text-indigo-300 hover:text-red-400 text-[13px] leading-none ml-0.5"
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
                    className="flex-1 px-3 py-2 text-[12.5px] border-[1.5px] border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all"
                    placeholder="e.g. Figma, React…"
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
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[12px] font-bold rounded-xl"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
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
                        className="text-violet-300 hover:text-red-400 text-[13px] leading-none ml-0.5"
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
                      className={`px-3 py-1 rounded-full text-[12px] font-semibold border-[1.5px] transition-all ${data.tone === t ? "border-indigo-500 text-indigo-600 bg-indigo-50" : "border-slate-200 text-slate-500 bg-white"}`}
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
                  placeholder="Post-script or extra context…"
                  value={data.notes}
                  onChange={(e) =>
                    setData((p) => ({ ...p, notes: e.target.value }))
                  }
                />
              </div>
            )}

            {/* REVIEW */}
            {step === "review" && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100/60">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-lg">
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
                {(
                  [
                    ["Template", tpl?.name, "template"],
                    ["Accent", data.accentColor, "template"],
                    ["Font", data.fontFamily, "template"],
                    ["Full Name", data.personal.fullName, "personal"],
                    ["Title", data.personal.title, "personal"],
                    ["Email", data.personal.email, "personal"],
                    ["Company", data.company.name, "company"],
                    ["Role", data.company.jobTitle, "company"],
                    ["Letter Date", data.letterDate, "content"],
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
                  ] as [string, string, Step][]
                ).map(([l, v, s]) => (
                  <div
                    key={l}
                    className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0"
                  >
                    <span className="text-[11px] font-extrabold uppercase tracking-[.5px] text-slate-400">
                      {l}
                    </span>
                    <div className="flex items-center gap-2">
                      {l === "Accent" && v ? (
                        <span
                          className="w-4 h-4 rounded-full border border-white shadow-sm"
                          style={{ background: v }}
                        />
                      ) : null}
                      <span
                        className={`text-[12.5px] font-medium text-right max-w-[180px] truncate ${v ? "text-slate-800" : "text-slate-300"}`}
                      >
                        {v || "—"}
                      </span>
                      <button
                        onClick={() => setStep(s)}
                        className="text-[11px] font-bold text-indigo-500 hover:text-indigo-700"
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
                    Download your cover letter as PDF below.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="flex-shrink-0 px-5 py-3 border-t border-slate-200 bg-white flex justify-between items-center gap-3">
            <button
              onClick={() =>
                stepIdx === 0
                  ? router.push("/")
                  : setStep(STEPS[stepIdx - 1].id)
              }
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[13px] font-bold border-[1.5px] border-slate-200 bg-white text-slate-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all cursor-pointer"
            >
              ← {stepIdx > 0 ? "Back" : "Home"}
            </button>
            {stepIdx < STEPS.length - 1 ? (
              <button
                onClick={handleContinue}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[13.5px] font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:-translate-y-px transition-all cursor-pointer"
              >
                Continue to {STEPS[stepIdx + 1].label}{" "}
                {(!isLoggedIn || !isPremium) && step === "template" ? "🔒" : ""}
              </button>
            ) : (
              <button
                onClick={downloadPDF}
                disabled={busy}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[13.5px] font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all"
              >
                {busy ? "⏳ Generating…" : "⬇ Download PDF"}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT — CANVAS */}
        <div className="hidden lg:flex flex-col bg-slate-100 overflow-hidden">
          <div className="flex-shrink-0 h-[52px] bg-white border-b border-slate-200 px-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 live-dot" />
              <div>
                <p className="text-[13px] font-bold text-slate-900 leading-tight">
                  Live Preview
                </p>
                <p className="text-[10.5px] text-slate-400">
                  Drag anywhere · Pinch · Scroll
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep("template")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 hover:bg-indigo-100 transition-all"
              >
                🎨 Change
              </button>
              <button
                onClick={() => {
                  rebuild();
                  setModal(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border-[1.5px] border-slate-200 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
              >
                ⛶ Fullscreen
              </button>
            </div>
          </div>
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
                <div className="w-[860px] h-[1120px] bg-white flex flex-col items-center justify-center gap-3 text-slate-400 rounded-xl">
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

      {/* MOBILE FAB */}
      <button
        onClick={() => {
          rebuild();
          setModal(true);
        }}
        className="lg:hidden fixed top-[70px] right-3 z-50 bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-2.5 rounded-full shadow-xl"
      >
        <FiEye className="w-4 h-4" />
      </button>

      {/* FULLSCREEN MODAL */}
      <AnimatePresence>
        {modal && (
          <div
            className="ov-anim fixed inset-0 bg-[rgba(10,6,30,.86)] backdrop-blur-[14px] z-[1000] flex items-center justify-center p-3 sm:p-5"
            onClick={() => setModal(false)}
          >
            <div
              className="modal-anim w-full max-w-[980px] h-[92vh] bg-white rounded-2xl overflow-hidden flex flex-col shadow-[0_48px_100px_rgba(0,0,0,.48)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-shrink-0 h-[56px] px-5 bg-white border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-sm text-white">
                    📄
                  </div>
                  <div>
                    <p className="text-[14px] font-extrabold text-slate-900 leading-tight">
                      {data.personal.fullName || "Cover Letter"}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {tpl?.name} · {tpl?.tag}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setModal(false)}
                  className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 text-slate-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-[16px] transition-all"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-hidden bg-slate-100">
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
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full text-[12.5px] font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg disabled:opacity-50 transition-all"
                >
                  {busy ? "⏳ Generating…" : "⬇ Download PDF"}
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {toast && (
        <div className="toast-anim fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-slate-900 text-white px-6 py-2.5 rounded-full text-[13px] font-bold shadow-xl whitespace-nowrap">
          {toast}
        </div>
      )}
    </>
  );
}
