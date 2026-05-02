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
// // } from "lucide-react";
// // import axios from "axios";

// // // Types for parsed CV data
// // interface ParsedCVData {
// //   personalInfo: {
// //     fullName: string;
// //     title: string;
// //     email: string;
// //     phone: string;
// //     location: string;
// //     address?: string;
// //     summary: string;
// //     photo?: string;
// //   };
// //   coreCompetencies: {
// //     technical: string[];
// //     leadership: string[];
// //     domainExpertise: string[];
// //   };
// //   experience: Array<{
// //     id: string;
// //     title: string;
// //     company: string;
// //     period: string;
// //     description: string[];
// //     achievements: string[];
// //     link?: string;
// //     isPresent?: boolean;
// //   }>;
// //   education: Array<{
// //     id: string;
// //     degree: string;
// //     institution: string;
// //     period?: string;
// //     description?: string;
// //   }>;
// //   skills: Array<{
// //     id: string;
// //     name: string;
// //     category: string;
// //     level?: "beginner" | "intermediate" | "advanced" | "expert";
// //   }>;
// //   additionalCredentials: {
// //     certifications: string[];
// //     languages: string[];
// //     awards: string[];
// //   };
// //   raw?: string;
// // }

// // // Template types
// // type TemplateStyle = "modern" | "professional" | "creative" | "minimal";
// // type ColorScheme = "red" | "blue" | "green" | "purple" | "orange" | "black";
// // const colorSchemes = {
// //   red: { primary: "#c40116", secondary: "#be0117", accent: "#e63545", light: "#fee2e2" },
// //   blue: { primary: "#2563eb", secondary: "#1d4ed8", accent: "#3b82f6", light: "#dbeafe" },
// //   green: { primary: "#059669", secondary: "#047857", accent: "#10b981", light: "#d1fae5" },
// //   purple: { primary: "#7c3aed", secondary: "#6d28d9", accent: "#8b5cf6", light: "#ede9fe" },
// //   orange: { primary: "#ea580c", secondary: "#c2410c", accent: "#f97316", light: "#ffedd5" },
// //   black: { primary: "#000000", secondary: "#1a1a1a", accent: "#333333", light: "#f5f5f5" },
// // };
// // // Custom parser for the specific API response format
// // const parseCVText = (text: string): ParsedCVData => {

// //   console.log("text",text)

// //   const lines = text.split('\n').map(line => line.trim());
  
// //   console.log("lines",lines)

// //   const data: ParsedCVData = {
// //     personalInfo: {
// //       fullName: "",
// //       title: "",
// //       email: "",
// //       phone: "",
// //       location: "",
// //       address: "",
// //       summary: "",
// //     },
// //     coreCompetencies: {
// //       technical: [],
// //       leadership: [],
// //       domainExpertise: [],
// //     },
// //     experience: [],
// //     education: [],
// //     skills: [],
// //     additionalCredentials: {
// //       certifications: [],
// //       languages: [],
// //       awards: [],
// //     },
// //     raw: text,
// //   };

// //   let currentSection = "";
// //   let currentExperience: any = null;
// //   let currentCompetencyType = "";

// //   for (let i = 0; i < lines.length; i++) {
// //     const line = lines[i];

// //     // Parse personal info from the top section
// //     if (i === 0 && line && !line.includes('**') && !line.includes('•')) {
// //       data.personalInfo.fullName = line;
// //     }
// //     else if (i === 1 && line && !line.includes('**') && !line.includes('•') && !line.includes('@')) {
// //       data.personalInfo.title = line;
// //     }
// //     else if (line.includes('@') && line.includes('.')) {
// //       data.personalInfo.email = line;
// //     }
// //     else if (line.match(/\(\d{3}\) \d{3}-\d{4}|\d{3}-\d{3}-\d{4}/)) {
// //       data.personalInfo.phone = line;
// //     }
// //     else if (line.includes('Street') || line.includes('Avenue') || line.includes('Road') || line.includes('Lane')) {
// //       data.personalInfo.address = line;
// //       // Extract location from address
// //       const locationMatch = line.match(/,?\s*([^,]+(?:,\s*[A-Z]{2})?)/);
// //       if (locationMatch) {
// //         data.personalInfo.location = locationMatch[1].trim();
// //       }
// //     }

// //     // Section detection
// //     if (line === "**PROFESSIONAL SUMMARY**" || line === "PROFESSIONAL SUMMARY") {
// //       currentSection = "summary";
// //       continue;
// //     }
// //     else if (line === "**CORE COMPETENCIES**" || line === "CORE COMPETENCIES") {
// //       currentSection = "competencies";
// //       continue;
// //     }
// //     else if (line === "**PROFESSIONAL EXPERIENCE**" || line === "PROFESSIONAL EXPERIENCE") {
// //       currentSection = "experience";
// //       continue;
// //     }
// //     else if (line === "**EDUCATION**" || line === "EDUCATION") {
// //       currentSection = "education";
// //       continue;
// //     }
// //     else if (line === "**TECHNICAL SKILLS**" || line === "TECHNICAL SKILLS" || line === "KEY SKILLS") {
// //       currentSection = "skills";
// //       continue;
// //     }
// //     else if (line === "**ADDITIONAL INFORMATION**" || line === "ADDITIONAL CREDENTIALS") {
// //       currentSection = "credentials";
// //       continue;
// //     }

// //     // Competency type detection
// //     if (line === "**Technical**" || line === "Technical") {
// //       currentCompetencyType = "technical";
// //       continue;
// //     }
// //     else if (line === "**Leadership**" || line === "Leadership") {
// //       currentCompetencyType = "leadership";
// //       continue;
// //     }
// //     else if (line === "**Domain Expertise**" || line === "Domain Expertise") {
// //       currentCompetencyType = "domainExpertise";
// //       continue;
// //     }

// //     // Summary section
// //     if (currentSection === "summary" && line && !line.startsWith('**')) {
// //       data.personalInfo.summary += (data.personalInfo.summary ? " " : "") + line;
// //     }

// //     // Competencies section
// //     if (currentSection === "competencies" && line.startsWith('•')) {
// //       const competency = line.replace('•', '').trim();
// //       if (currentCompetencyType) {
// //         switch (currentCompetencyType) {
// //           case "technical":
// //             data.coreCompetencies.technical.push(competency);
// //             break;
// //           case "leadership":
// //             data.coreCompetencies.leadership.push(competency);
// //             break;
// //           case "domainExpertise":
// //             data.coreCompetencies.domainExpertise.push(competency);
// //             break;
// //         }
// //       }
// //     }

// //     // Experience section
// //     if (currentSection === "experience") {
// //       // Check for job title (bolded text)
// //       if (line.startsWith('**') && line.endsWith('**') && !line.includes('•')) {
// //         if (currentExperience) {
// //           data.experience.push(currentExperience);
// //         }
// //         currentExperience = {
// //           id: Date.now() + Math.random().toString(),
// //           title: line.replace(/\*\*/g, '').trim(),
// //           company: "",
// //           period: "",
// //           description: [],
// //           achievements: [],
// //         };
// //       }
// //       // Company and period
// //       else if (currentExperience && line.includes(',')) {
// //         const parts = line.split(',').map(s => s.trim());
// //         if (parts.length >= 2) {
// //           currentExperience.company = parts[0];
// //           currentExperience.period = parts.slice(1).join(', ');
// //           currentExperience.isPresent = currentExperience.period.includes('Present');
// //         }
// //       }
// //       // Achievements (bullet points)
// //       else if (currentExperience && line.startsWith('•')) {
// //         currentExperience.achievements.push(line.replace('•', '').trim());
// //       }
// //       // Description (non-bullet text)
// //       else if (currentExperience && line && !line.startsWith('•') && !line.startsWith('**')) {
// //         currentExperience.description.push(line);
// //       }
// //     }

// //     // Skills section
// //     if (currentSection === "skills" && line && !line.startsWith('**')) {
// //       // Handle comma-separated skills
// //       if (line.includes(',')) {
// //         const skills = line.split(',').map(s => s.trim()).filter(s => s);
// //         skills.forEach(skill => {
// //           if (skill && !skill.startsWith('•')) {
// //             data.skills.push({
// //               id: Date.now() + Math.random().toString(),
// //               name: skill,
// //               category: "technical",
// //             });
// //           }
// //         });
// //       }
// //       // Handle bullet-point skills
// //       else if (line.startsWith('•')) {
// //         const skill = line.replace('•', '').trim();
// //         if (skill) {
// //           data.skills.push({
// //             id: Date.now() + Math.random().toString(),
// //             name: skill,
// //             category: "technical",
// //           });
// //         }
// //       }
// //     }

// //     // Education section
// //     if (currentSection === "education" && line && !line.startsWith('**')) {
// //       if (line.includes(',')) {
// //         const parts = line.split(',').map(s => s.trim());
// //         if (parts.length >= 2) {
// //           data.education.push({
// //             id: Date.now() + Math.random().toString(),
// //             degree: parts[0],
// //             institution: parts.slice(1, -1).join(', '),
// //             period: parts[parts.length - 1],
// //           });
// //         }
// //       }
// //     }

// //     // Additional Credentials
// //     if (currentSection === "credentials") {
// //       if (line.toLowerCase().includes('language')) {
// //         const langs = line.replace(/language[s]?:/i, '').trim();
// //         if (langs && langs !== 'None' && langs !== 'none') {
// //           data.additionalCredentials.languages = langs.split(',').map(l => l.trim());
// //         }
// //       } else if (line.toLowerCase().includes('certification')) {
// //         const certs = line.replace(/certification[s]?:/i, '').trim();
// //         if (certs && certs !== 'None' && certs !== 'none') {
// //           data.additionalCredentials.certifications = certs.split(',').map(c => c.trim());
// //         }
// //       } else if (line.toLowerCase().includes('award')) {
// //         const awards = line.replace(/award[s]?:/i, '').trim();
// //         if (awards && awards !== 'None' && awards !== 'none') {
// //           data.additionalCredentials.awards = awards.split(',').map(a => a.trim());
// //         }
// //       }
// //     }
// //   }

// //   // Push last experience
// //   if (currentExperience) {
// //     data.experience.push(currentExperience);
// //   }

// //   // Remove duplicates from skills
// //   data.skills = data.skills.filter((skill, index, self) =>
// //     index === self.findIndex(s => s.name.toLowerCase() === skill.name.toLowerCase())
// //   );

// //   // Clean up summary (remove any remaining markdown)
// //   data.personalInfo.summary = data.personalInfo.summary.replace(/\*\*/g, '').trim();

// //   return data;
// // };

// // // Experience Card Component
// // const ExperienceCard = ({ exp, colorScheme }: { exp: any; colorScheme: ColorScheme }) => {
// //   const [isExpanded, setIsExpanded] = useState(false);

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
// //     >
// //       <div className="p-6">
// //         <div className="flex items-start justify-between mb-4">
// //           <div>
// //             <h3 className="text-lg font-semibold text-gray-900 mb-1">{exp.title}</h3>
// //             <p className="text-sm" style={{ color: colorSchemes[colorScheme].primary }}>
// //               {exp.company}
// //             </p>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <span className="text-xs text-gray-500 flex items-center gap-1">
// //               <Calendar className="w-3 h-3" />
// //               {exp.period}
// //             </span>
// //             {exp.link && (
// //               <a
// //                 href={exp.link}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
// //               >
// //                 <ExternalLink className="w-4 h-4 text-gray-400" />
// //               </a>
// //             )}
// //           </div>
// //         </div>

// //         {exp.description.length > 0 && (
// //           <p className="text-sm text-gray-600 mb-4">{exp.description[0]}</p>
// //         )}

       
// //       </div>
// //     </motion.div>
// //   );
// // };

// // // Main Component
// // const CVGeneratorPage = () => {
// //   const [file, setFile] = useState<File | null>(null);
// //   const [uploading, setUploading] = useState(false);
// //   const [processing, setProcessing] = useState(false);
// //   const [cvData, setCvData] = useState<ParsedCVData | null>(null);
// //   const [dragActive, setDragActive] = useState(false);
// //   const [activeStep, setActiveStep] = useState<"upload" | "preview" | "download">("upload");
// //   const [selectedTemplate, setSelectedTemplate] = useState<TemplateStyle>("modern");
// //   const [colorScheme, setColorScheme] = useState<ColorScheme>("red");
// //   const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
// //   const [darkMode, setDarkMode] = useState(false);
// //   const [exportFormat, setExportFormat] = useState<"pdf" | "docx" | "txt">("pdf");
// //   const [exporting, setExporting] = useState(false);
// //   const [rawText, setRawText] = useState("");

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
// //     setCvData(null);
// //     setRawText("");
// //     setActiveStep("upload");
// //   };

// //   // Process resume data
// //   const processResume = async () => {
// //     if (!file) return;

// //     setUploading(true);
// //     setProcessing(true);

// //     try {
// //       const formData = new FormData();
// //       formData.append("file", file);

// //       const response = await axios.post(
// //         `https://ai.aryuacademy.com/api/v1/resume/cv/generate-from-file`,
// //         formData,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //           },
// //         }
// //       );

// //       console.log("API Response:", response.data.data.cv_content);
      
// //       // Get the cv_content from the response
// //       const cvContent = response.data.data.cv_content;
// //       setRawText(cvContent);
      
// //       // Parse the text data
// //       const parsed = parseCVText(cvContent);
// //       console.log("Parsed CV Data:", parsed);
      
// //       setCvData(parsed);
// //       setActiveStep("preview");
      
// //     } catch (error) {
// //       console.error("Error processing resume:", error);
// //     } finally {
// //       setUploading(false);
// //       setProcessing(false);
// //     }
// //   };


// //   // Export CV
// //  // Export CV as PDF with exact same styling as preview
// // const exportCV = async () => {
// //   setExporting(true);
// //   try {
// //     await new Promise(resolve => setTimeout(resolve, 1500));
    
// //     // Create a new window for PDF generation
// //     const printWindow = window.open('', '_blank');
// //     if (!printWindow) {
// //       alert('Please allow pop-ups to download PDF');
// //       setExporting(false);
// //       return;
// //     }

// //     // Get the current color scheme
// //     const colors = colorSchemes[colorScheme];

// //     // Generate HTML content for PDF with exact same styling as preview
// //     const htmlContent = `
// //       <!DOCTYPE html>
// //       <html>
// //         <head>
// //           <title>${cvData?.personalInfo.fullName} - CV</title>
// //           <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
// //           <style>
// //             * {
// //               margin: 0;
// //               padding: 0;
// //               box-sizing: border-box;
// //             }
            
// //             body {
// //               font-family: 'Inter', sans-serif;
// //               background: #f3f4f6;
// //               padding: 40px;
// //               line-height: 1.5;
// //             }
            
// //             .cv-container {
// //               max-width: 900px;
// //               margin: 0 auto;
// //               background: white;
// //               border-radius: 24px;
// //               box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
// //               overflow: hidden;
// //             }
            
// //             .cv-content {
// //               padding: 32px;
// //             }
            
// //             /* Header Styles */
// //             .header {
// //               text-align: center;
// //               margin-bottom: 32px;
// //             }
            
// //             .name {
// //               font-size: 36px;
// //               font-weight: 700;
// //               margin-bottom: 8px;
// //               color: ${colors.primary};
// //             }
            
// //             .title {
// //               font-size: 18px;
// //               color: #4b5563;
// //               margin-bottom: 16px;
// //             }
            
// //             .contact-info {
// //               display: flex;
// //               flex-wrap: wrap;
// //               justify-content: center;
// //               gap: 16px;
// //               font-size: 14px;
// //             }
            
// //             .contact-item {
// //               display: flex;
// //               align-items: center;
// //               gap: 4px;
// //               color: #6b7280;
// //             }
            
// //             .contact-icon {
// //               color: ${colors.primary};
// //             }
            
// //             .address {
// //               font-size: 13px;
// //               color: #9ca3af;
// //               margin-top: 8px;
// //             }
            
// //             /* Section Styles */
// //             .section {
// //               margin-bottom: 32px;
// //             }
            
// //             .section-title {
// //               display: flex;
// //               align-items: center;
// //               gap: 8px;
// //               font-size: 20px;
// //               font-weight: 600;
// //               margin-bottom: 16px;
// //               color: #111827;
// //             }
            
// //             .section-title-bar {
// //               width: 4px;
// //               height: 24px;
// //               background: ${colors.primary};
// //               border-radius: 2px;
// //             }
            
// //             /* Summary Styles */
// //             .summary-text {
// //               color: #374151;
// //               line-height: 1.7;
// //               font-size: 14px;
// //             }
            
// //             /* Competencies Grid */
// //             .competencies-grid {
// //               display: grid;
// //               grid-template-columns: repeat(3, 1fr);
// //               gap: 24px;
// //             }
            
// //             .competency-category {
// //               background: #f9fafb;
// //               padding: 16px;
// //               border-radius: 12px;
// //             }
            
// //             .competency-title {
// //               font-size: 16px;
// //               font-weight: 600;
// //               margin-bottom: 12px;
// //               color: ${colors.primary};
// //             }
            
// //             .competency-list {
// //               list-style: none;
// //             }
            
// //             .competency-item {
// //               display: flex;
// //               align-items: center;
// //               gap: 8px;
// //               margin-bottom: 8px;
// //               font-size: 14px;
// //               color: #374151;
// //             }
            
// //             .competency-bullet {
// //               width: 6px;
// //               height: 6px;
// //               border-radius: 50%;
// //               background: ${colors.primary};
// //             }
            
// //             /* Experience Styles */
// //             .experience-item {
// //               background: white;
// //               border: 1px solid #e5e7eb;
// //               border-radius: 12px;
// //               overflow: hidden;
// //               margin-bottom: 16px;
// //               box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
// //             }
            
// //             .experience-content {
// //               padding: 20px;
// //             }
            
// //             .experience-header {
// //               display: flex;
// //               justify-content: space-between;
// //               align-items: flex-start;
// //               margin-bottom: 12px;
// //             }
            
// //             .experience-title {
// //               font-size: 18px;
// //               font-weight: 600;
// //               color: #111827;
// //               margin-bottom: 4px;
// //             }
            
// //             .experience-company {
// //               font-size: 14px;
// //               color: ${colors.primary};
// //             }
            
// //             .experience-period {
// //               display: flex;
// //               align-items: center;
// //               gap: 4px;
// //               font-size: 12px;
// //               color: #6b7280;
// //             }
            
// //             .experience-description {
// //               font-size: 14px;
// //               color: #4b5563;
// //               margin-bottom: 12px;
// //             }
            
// //             .achievements-button {
// //               display: flex;
// //               align-items: center;
// //               gap: 4px;
// //               font-size: 14px;
// //               font-weight: 500;
// //               color: ${colors.primary};
// //               background: none;
// //               border: none;
// //               cursor: pointer;
// //               padding: 0;
// //               margin-bottom: 12px;
// //             }
            
// //             .achievements-list {
// //               list-style: none;
// //               margin-top: 12px;
// //             }
            
// //             .achievement-item {
// //               display: flex;
// //               align-items: flex-start;
// //               gap: 8px;
// //               margin-bottom: 8px;
// //               font-size: 14px;
// //               color: #4b5563;
// //             }
            
// //             .achievement-bullet {
// //               width: 6px;
// //               height: 6px;
// //               border-radius: 50%;
// //               background: ${colors.primary};
// //               margin-top: 6px;
// //             }
            
// //             /* Skills Styles */
// //             .skills-container {
// //               display: flex;
// //               flex-wrap: wrap;
// //               gap: 8px;
// //             }
            
// //             .skill-tag {
// //               padding: 8px 16px;
// //               background: ${colors.primary}10;
// //               color: ${colors.primary};
// //               border: 1px solid ${colors.primary}20;
// //               border-radius: 8px;
// //               font-size: 14px;
// //               font-weight: 500;
// //             }
            
// //             /* Education Styles */
// //             .education-item {
// //               display: flex;
// //               justify-content: space-between;
// //               align-items: center;
// //               padding: 16px;
// //               background: #f9fafb;
// //               border-radius: 12px;
// //               margin-bottom: 8px;
// //             }
            
// //             .education-degree {
// //               font-size: 16px;
// //               font-weight: 600;
// //               color: #111827;
// //               margin-bottom: 4px;
// //             }
            
// //             .education-institution {
// //               font-size: 14px;
// //               color: #6b7280;
// //             }
            
// //             .education-period {
// //               font-size: 12px;
// //               color: #9ca3af;
// //             }
            
// //             /* Additional Info Styles */
// //             .additional-grid {
// //               display: grid;
// //               grid-template-columns: repeat(2, 1fr);
// //               gap: 16px;
// //             }
            
// //             .additional-item {
// //               background: #f9fafb;
// //               padding: 16px;
// //               border-radius: 12px;
// //             }
            
// //             .additional-title {
// //               font-size: 16px;
// //               font-weight: 600;
// //               margin-bottom: 12px;
// //               color: ${colors.primary};
// //             }
            
// //             .additional-list {
// //               list-style: none;
// //             }
            
// //             .additional-list-item {
// //               display: flex;
// //               align-items: center;
// //               gap: 8px;
// //               margin-bottom: 6px;
// //               font-size: 14px;
// //               color: #4b5563;
// //             }
            
// //             .additional-bullet {
// //               width: 4px;
// //               height: 4px;
// //               border-radius: 50%;
// //               background: ${colors.primary};
// //             }
            
// //             /* Print Styles */
// //             @media print {
// //               body {
// //                 background: white;
// //                 padding: 0;
// //               }
              
// //               .cv-container {
// //                 box-shadow: none;
// //                 border-radius: 0;
// //               }
              
// //               .experience-item {
// //                 break-inside: avoid;
// //               }
// //             }
// //           </style>
// //         </head>
// //         <body>
// //           <div class="cv-container">
// //             <div class="cv-content">
// //               <!-- Header -->
// //               <div class="header">
// //                 <h1 class="name">${cvData?.personalInfo.fullName || ''}</h1>
// //                 <p class="title">${cvData?.personalInfo.title || ''}</p>
                
// //                 <div class="contact-info">
// //                   ${cvData?.personalInfo.email ? `
// //                     <span class="contact-item">
// //                       <span class="contact-icon">✉️</span>
// //                       ${cvData.personalInfo.email}
// //                     </span>
// //                   ` : ''}
// //                   ${cvData?.personalInfo.phone ? `
// //                     <span class="contact-item">
// //                       <span class="contact-icon">📱</span>
// //                       ${cvData.personalInfo.phone}
// //                     </span>
// //                   ` : ''}
// //                   ${cvData?.personalInfo.location ? `
// //                     <span class="contact-item">
// //                       <span class="contact-icon">📍</span>
// //                       ${cvData.personalInfo.location}
// //                     </span>
// //                   ` : ''}
// //                 </div>
                
// //                 ${cvData?.personalInfo.address ? `
// //                   <p class="address">${cvData.personalInfo.address}</p>
// //                 ` : ''}
// //               </div>

// //               <!-- Professional Summary -->
// //               ${cvData?.personalInfo.summary ? `
// //                 <div class="section">
// //                   <h2 class="section-title">
// //                     <div class="section-title-bar"></div>
// //                     Professional Summary
// //                   </h2>
// //                   <p class="summary-text">${cvData.personalInfo.summary}</p>
// //                 </div>
// //               ` : ''}

// //               <!-- Core Competencies -->
// //               ${(cvData?.coreCompetencies.technical.length > 0 || 
// //                  cvData?.coreCompetencies.leadership.length > 0 || 
// //                  cvData?.coreCompetencies.domainExpertise.length > 0) ? `
// //                 <div class="section">
// //                   <h2 class="section-title">
// //                     <div class="section-title-bar"></div>
// //                     Core Competencies
// //                   </h2>
                  
// //                   <div class="competencies-grid">
// //                     ${cvData?.coreCompetencies.technical.length > 0 ? `
// //                       <div class="competency-category">
// //                         <h3 class="competency-title">Technical</h3>
// //                         <ul class="competency-list">
// //                           ${cvData.coreCompetencies.technical.map(skill => `
// //                             <li class="competency-item">
// //                               <span class="competency-bullet"></span>
// //                               ${skill}
// //                             </li>
// //                           `).join('')}
// //                         </ul>
// //                       </div>
// //                     ` : ''}

// //                     ${cvData?.coreCompetencies.leadership.length > 0 ? `
// //                       <div class="competency-category">
// //                         <h3 class="competency-title">Leadership</h3>
// //                         <ul class="competency-list">
// //                           ${cvData.coreCompetencies.leadership.map(skill => `
// //                             <li class="competency-item">
// //                               <span class="competency-bullet"></span>
// //                               ${skill}
// //                             </li>
// //                           `).join('')}
// //                         </ul>
// //                       </div>
// //                     ` : ''}

// //                     ${cvData?.coreCompetencies.domainExpertise.length > 0 ? `
// //                       <div class="competency-category">
// //                         <h3 class="competency-title">Domain Expertise</h3>
// //                         <ul class="competency-list">
// //                           ${cvData.coreCompetencies.domainExpertise.map(skill => `
// //                             <li class="competency-item">
// //                               <span class="competency-bullet"></span>
// //                               ${skill}
// //                             </li>
// //                           `).join('')}
// //                         </ul>
// //                       </div>
// //                     ` : ''}
// //                   </div>
// //                 </div>
// //               ` : ''}

// //               <!-- Professional Experience -->
// //               ${cvData?.experience.length > 0 ? `
// //                 <div class="section">
// //                   <h2 class="section-title">
// //                     <div class="section-title-bar"></div>
// //                     Professional Experience
// //                   </h2>
                  
// //                   <div>
// //                     ${cvData.experience.map(exp => `
// //                       <div class="experience-item">
// //                         <div class="experience-content">
// //                           <div class="experience-header">
// //                             <div>
// //                               <h3 class="experience-title">${exp.title}</h3>
// //                               <p class="experience-company">${exp.company}</p>
// //                             </div>
// //                             <div class="experience-period">
// //                               <span>📅</span>
// //                               <span>${exp.period}</span>
// //                             </div>
// //                           </div>

// //                           ${exp.description.length > 0 ? `
// //                             <p class="experience-description">${exp.description[0]}</p>
// //                           ` : ''}

// //                           ${exp.achievements.length > 0 ? `
// //                             <div class="achievements-button">
// //                               <span>✨</span>
// //                               <span>Achievements</span>
// //                             </div>

// //                             <ul class="achievements-list">
// //                               ${exp.achievements.map(achievement => `
// //                                 <li class="achievement-item">
// //                                   <span class="achievement-bullet"></span>
// //                                   <span>${achievement}</span>
// //                                 </li>
// //                               `).join('')}
// //                             </ul>
// //                           ` : ''}
// //                         </div>
// //                       </div>
// //                     `).join('')}
// //                   </div>
// //                 </div>
// //               ` : ''}

// //               <!-- Technical Skills -->
// //               ${cvData?.skills.length > 0 ? `
// //                 <div class="section">
// //                   <h2 class="section-title">
// //                     <div class="section-title-bar"></div>
// //                     Technical Skills
// //                   </h2>
                  
// //                   <div class="skills-container">
// //                     ${cvData.skills.map(skill => `
// //                       <span class="skill-tag">${skill.name}</span>
// //                     `).join('')}
// //                   </div>
// //                 </div>
// //               ` : ''}

// //               <!-- Education -->
// //               ${cvData?.education.length > 0 ? `
// //                 <div class="section">
// //                   <h2 class="section-title">
// //                     <div class="section-title-bar"></div>
// //                     Education
// //                   </h2>
                  
// //                   <div>
// //                     ${cvData.education.map(edu => `
// //                       <div class="education-item">
// //                         <div>
// //                           <p class="education-degree">${edu.degree}</p>
// //                           <p class="education-institution">${edu.institution}</p>
// //                         </div>
// //                         ${edu.period ? `
// //                           <span class="education-period">${edu.period}</span>
// //                         ` : ''}
// //                       </div>
// //                     `).join('')}
// //                   </div>
// //                 </div>
// //               ` : ''}

// //               <!-- Additional Information -->
// //               ${(cvData?.additionalCredentials.languages.length > 0 || 
// //                  cvData?.additionalCredentials.certifications.length > 0 ||
// //                  cvData?.additionalCredentials.awards.length > 0) ? `
// //                 <div class="section">
// //                   <h2 class="section-title">
// //                     <div class="section-title-bar"></div>
// //                     Additional Information
// //                   </h2>
                  
// //                   <div class="additional-grid">
// //                     ${cvData?.additionalCredentials.languages.length > 0 ? `
// //                       <div class="additional-item">
// //                         <h3 class="additional-title">Languages</h3>
// //                         <ul class="additional-list">
// //                           ${cvData.additionalCredentials.languages.map(lang => `
// //                             <li class="additional-list-item">
// //                               <span class="additional-bullet"></span>
// //                               ${lang}
// //                             </li>
// //                           `).join('')}
// //                         </ul>
// //                       </div>
// //                     ` : ''}

// //                     ${cvData?.additionalCredentials.certifications.length > 0 ? `
// //                       <div class="additional-item">
// //                         <h3 class="additional-title">Certifications</h3>
// //                         <ul class="additional-list">
// //                           ${cvData.additionalCredentials.certifications.map(cert => `
// //                             <li class="additional-list-item">
// //                               <span class="additional-bullet"></span>
// //                               ${cert}
// //                             </li>
// //                           `).join('')}
// //                         </ul>
// //                       </div>
// //                     ` : ''}

// //                     ${cvData?.additionalCredentials.awards.length > 0 ? `
// //                       <div class="additional-item">
// //                         <h3 class="additional-title">Awards</h3>
// //                         <ul class="additional-list">
// //                           ${cvData.additionalCredentials.awards.map(award => `
// //                             <li class="additional-list-item">
// //                               <span class="additional-bullet"></span>
// //                               ${award}
// //                             </li>
// //                           `).join('')}
// //                         </ul>
// //                       </div>
// //                     ` : ''}
// //                   </div>
// //                 </div>
// //               ` : ''}
// //             </div>
// //           </div>
          
// //           <script>
// //             window.onload = function() {
// //               setTimeout(() => {
// //                 window.print();
// //               }, 500);
// //             }
// //           </script>
// //         </body>
// //       </html>
// //     `;

// //     // Write the HTML to the new window
// //     printWindow.document.write(htmlContent);
// //     printWindow.document.close();
    
// //     setActiveStep("download");
// //   } catch (error) {
// //     console.error("Export failed:", error);
// //   } finally {
// //     setExporting(false);
// //   }
// // };


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
// //               <Brain className="w-4 h-4 text-[#c40116]" />
// //               <span className="text-sm font-medium bg-gradient-to-r from-[#c40116] to-[#be0117] bg-clip-text text-transparent">
// //                 AI-Powered Cover Letter Generator
// //               </span>
// //               <Sparkles className="w-3 h-3 text-[#c40116]" />
// //             </motion.div>

// //             <motion.h1 className="text-5xl md:text-6xl font-bold mb-6">
// //               <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
// //                 Upload Your Resume
// //               </span>
// //               <br />
              
// //               <span className="bg-gradient-to-r from-[#c40116]  to-[#be0117] bg-clip-text text-transparent">
// //                 Get a Professional Cover letter
// //               </span>
// //             </motion.h1>

// //             <motion.p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
// //               Our AI automatically extracts and formats your information into a stunning, ATS-friendly CV.
// //             </motion.p>

// //             {/* Progress Steps */}
// //             <div className="flex items-center justify-center gap-4 mb-8">
// //               {[
// //                 { step: "upload", label: "Upload", icon: UploadCloud },
// //                 { step: "preview", label: "Preview", icon: Eye },
// //                 { step: "download", label: "Download", icon: DownloadCloud },
// //               ].map((step, index) => {
// //                 const Icon = step.icon;
// //                 const isActive = activeStep === step.step;
// //                 const isComplete = 
// //                   (step.step === "upload" && file) ||
// //                   (step.step === "preview" && cvData) ||
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
// //                           <UploadCloud className="w-16 h-16 text-[#c40116]" />
// //                         </motion.div>
                        
// //                         <h3 className="text-2xl font-bold text-gray-900 mb-3">
// //                           Drag & Drop Your Resume
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
// //                             <span className="font-semibold text-[#c40116]">10,000+</span> CVs generated
// //                           </span>
// //                         </div>

// //                         <div className="space-y-6">
// //                           <label
// //                             htmlFor="resume-upload"
// //                             className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 text-lg"
// //                           >
// //                             <Upload className="w-5 h-5" />
// //                             Choose File
// //                           </label>
                          
// //                           <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
// //                             <span className="flex items-center gap-2">📄 PDF</span>
// //                             <span className="w-1 h-1 bg-gray-300 rounded-full" />
// //                             <span className="flex items-center gap-2">📝 DOC</span>
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
// //                                 Ready to process
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

// //                   {/* Process Button */}
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
// //                         Parse and Generate CV
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
// //                           Parsing your resume...
// //                         </span>
// //                       </div>
                      
// //                       <div className="mt-8 max-w-md mx-auto">
// //                         <div className="space-y-4">
// //                           {[
// //                             "Extracting personal information",
// //                             "Parsing work experience",
// //                             "Identifying skills",
// //                             "Analyzing competencies",
// //                             "Formatting CV",
// //                           ].map((step, index) => (
// //                             <motion.div
// //                               key={index}
// //                               initial={{ opacity: 0, x: -20 }}
// //                               animate={{ opacity: 1, x: 0 }}
// //                               transition={{ delay: index * 0.2 }}
// //                               className="flex items-center gap-3"
// //                             >
// //                               <div className="w-5 h-5 rounded-full border-2 border-[#c40116]/30 flex items-center justify-center">
// //                                 <motion.div
// //                                   animate={{ scale: [1, 1.2, 1] }}
// //                                   transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
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
// //               {activeStep === "preview" && cvData && (
// //                 <div className="flex flex-col">
// //                   {/* Preview Toolbar */}
// //                   <div className="border-b border-gray-200 p-4 bg-gray-50/50">
// //                     <div className="flex items-center justify-between flex-wrap gap-4">
// //                       <div className="flex items-center gap-4 flex-wrap">
                     

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
// //                       <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${
// //                         darkMode ? 'bg-gray-800 text-white' : ''
// //                       }`}>
// //                         {/* CV Content */}
// //                         <div className="p-8">
// //                           {/* Header */}
// //                           <div className="text-center mb-8">
// //                             <h1 className="text-4xl font-bold mb-2" style={{ color: colorSchemes[colorScheme].primary }}>
// //                               {cvData.personalInfo.fullName || "Name Not Available"}
// //                             </h1>
// //                             <p className="text-lg text-gray-600 mb-4">{cvData.personalInfo.title || "Professional"}</p>
                            
// //                             <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
// //                               {cvData.personalInfo.email && (
// //                                 <span className="flex items-center gap-1">
// //                                   <Mail className="w-4 h-4" style={{ color: colorSchemes[colorScheme].primary }} />
// //                                   {cvData.personalInfo.email}
// //                                 </span>
// //                               )}
// //                               {cvData.personalInfo.phone && (
// //                                 <span className="flex items-center gap-1">
// //                                   <Phone className="w-4 h-4" style={{ color: colorSchemes[colorScheme].primary }} />
// //                                   {cvData.personalInfo.phone}
// //                                 </span>
// //                               )}
// //                               {cvData.personalInfo.location && (
// //                                 <span className="flex items-center gap-1">
// //                                   <MapPin className="w-4 h-4" style={{ color: colorSchemes[colorScheme].primary }} />
// //                                   {cvData.personalInfo.location}
// //                                 </span>
// //                               )}
// //                             </div>
                            
// //                             {cvData.personalInfo.address && (
// //                               <p className="text-sm text-gray-500 mt-2">{cvData.personalInfo.address}</p>
// //                             )}
// //                           </div>

// //                           {/* Summary */}
// //                           {cvData.personalInfo.summary && (
// //                             <div className="mb-8">
// //                               <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
// //                                 <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
// //                                 Professional Summary
// //                               </h2>
// //                               <p className="text-gray-700 leading-relaxed">
// //                                 {cvData.personalInfo.summary}
// //                               </p>
// //                             </div>
// //                           )}

// //                           {/* Core Competencies */}
// //                           {(cvData.coreCompetencies.technical.length > 0 || 
// //                             cvData.coreCompetencies.leadership.length > 0 || 
// //                             cvData.coreCompetencies.domainExpertise.length > 0) && (
// //                             <div className="mb-8">
// //                               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
// //                                 <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
// //                                 Core Competencies
// //                               </h2>
                              
// //                               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                                 {cvData.coreCompetencies.technical.length > 0 && (
// //                                   <div>
// //                                     <h3 className="font-medium mb-3" style={{ color: colorSchemes[colorScheme].primary }}>
// //                                       Technical
// //                                     </h3>
// //                                     <div className="space-y-2">
// //                                       {cvData.coreCompetencies.technical.map((skill, idx) => (
// //                                         <div key={idx} className="flex items-center gap-2">
// //                                           <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
// //                                           <span className="text-sm text-gray-700">{skill}</span>
// //                                         </div>
// //                                       ))}
// //                                     </div>
// //                                   </div>
// //                                 )}

// //                                 {cvData.coreCompetencies.leadership.length > 0 && (
// //                                   <div>
// //                                     <h3 className="font-medium mb-3" style={{ color: colorSchemes[colorScheme].primary }}>
// //                                       Leadership
// //                                     </h3>
// //                                     <div className="space-y-2">
// //                                       {cvData.coreCompetencies.leadership.map((skill, idx) => (
// //                                         <div key={idx} className="flex items-center gap-2">
// //                                           <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
// //                                           <span className="text-sm text-gray-700">{skill}</span>
// //                                         </div>
// //                                       ))}
// //                                     </div>
// //                                   </div>
// //                                 )}

// //                                 {cvData.coreCompetencies.domainExpertise.length > 0 && (
// //                                   <div>
// //                                     <h3 className="font-medium mb-3" style={{ color: colorSchemes[colorScheme].primary }}>
// //                                       Domain Expertise
// //                                     </h3>
// //                                     <div className="space-y-2">
// //                                       {cvData.coreCompetencies.domainExpertise.map((skill, idx) => (
// //                                         <div key={idx} className="flex items-center gap-2">
// //                                           <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
// //                                           <span className="text-sm text-gray-700">{skill}</span>
// //                                         </div>
// //                                       ))}
// //                                     </div>
// //                                   </div>
// //                                 )}
// //                               </div>
// //                             </div>
// //                           )}

// //                           {/* Experience */}
// //                           {cvData.experience.length > 0 && (
// //                             <div className="mb-8">
// //                               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
// //                                 <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
// //                                 Professional Experience
// //                               </h2>
                              
// //                               <div className="space-y-4">
// //                                 {cvData.experience.map((exp) => (
// //                                   <ExperienceCard key={exp.id} exp={exp} colorScheme={colorScheme} />
// //                                 ))}
// //                               </div>
// //                             </div>
// //                           )}

// //                           {/* Skills */}
// //                           {cvData.skills.length > 0 && (
// //                             <div className="mb-8">
// //                               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
// //                                 <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
// //                                 Technical Skills
// //                               </h2>
                              
// //                               <div className="flex flex-wrap gap-2">
// //                                 {cvData.skills.map((skill) => (
// //                                   <span
// //                                     key={skill.id}
// //                                     className="px-3 py-1.5 rounded-lg text-sm"
// //                                     style={{
// //                                       backgroundColor: `${colorSchemes[colorScheme].primary}10`,
// //                                       color: colorSchemes[colorScheme].primary,
// //                                       border: `1px solid ${colorSchemes[colorScheme].primary}20`
// //                                     }}
// //                                   >
// //                                     {skill.name}
// //                                   </span>
// //                                 ))}
// //                               </div>
// //                             </div>
// //                           )}

// //                           {/* Education */}
// //                           {cvData.education.length > 0 && (
// //                             <div className="mb-8">
// //                               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
// //                                 <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
// //                                 Education
// //                               </h2>
                              
// //                               <div className="space-y-3">
// //                                 {cvData.education.map((edu) => (
// //                                   <div key={edu.id} className="flex items-start justify-between">
// //                                     <div>
// //                                       <h3 className="font-medium text-gray-900">{edu.degree}</h3>
// //                                       <p className="text-sm text-gray-600">{edu.institution}</p>
// //                                     </div>
// //                                     {edu.period && (
// //                                       <span className="text-xs text-gray-500">{edu.period}</span>
// //                                     )}
// //                                   </div>
// //                                 ))}
// //                               </div>
// //                             </div>
// //                           )}

// //                           {/* Additional Information */}
// //                           {(cvData.additionalCredentials.languages.length > 0 || 
// //                             cvData.additionalCredentials.certifications.length > 0 ||
// //                             cvData.additionalCredentials.awards.length > 0) && (
// //                             <div>
// //                               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
// //                                 <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colorSchemes[colorScheme].primary }} />
// //                                 Additional Information
// //                               </h2>
                              
// //                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                                 {cvData.additionalCredentials.languages.length > 0 && (
// //                                   <div>
// //                                     <h3 className="font-medium mb-2" style={{ color: colorSchemes[colorScheme].primary }}>
// //                                       Languages
// //                                     </h3>
// //                                     <div className="space-y-1">
// //                                       {cvData.additionalCredentials.languages.map((lang, idx) => (
// //                                         <div key={idx} className="text-sm text-gray-700">{lang}</div>
// //                                       ))}
// //                                     </div>
// //                                   </div>
// //                                 )}
                                
// //                                 {cvData.additionalCredentials.certifications.length > 0 && (
// //                                   <div>
// //                                     <h3 className="font-medium mb-2" style={{ color: colorSchemes[colorScheme].primary }}>
// //                                       Certifications
// //                                     </h3>
// //                                     <div className="space-y-1">
// //                                       {cvData.additionalCredentials.certifications.map((cert, idx) => (
// //                                         <div key={idx} className="text-sm text-gray-700">{cert}</div>
// //                                       ))}
// //                                     </div>
// //                                   </div>
// //                                 )}

// //                                 {cvData.additionalCredentials.awards.length > 0 && (
// //                                   <div>
// //                                     <h3 className="font-medium mb-2" style={{ color: colorSchemes[colorScheme].primary }}>
// //                                       Awards
// //                                     </h3>
// //                                     <div className="space-y-1">
// //                                       {cvData.additionalCredentials.awards.map((award, idx) => (
// //                                         <div key={idx} className="text-sm text-gray-700">{award}</div>
// //                                       ))}
// //                                     </div>
// //                                   </div>
// //                                 )}
// //                               </div>
// //                             </div>
// //                           )}
// //                         </div>
// //                       </div>
// //                     </motion.div>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Download Step */}
// //               {activeStep === "download" && cvData && (
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
// //                       Your CV is Ready!
// //                     </h3>
// //                     <p className="text-gray-600 mb-8">
// //                       Choose your preferred format and download your professional CV
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
// //                         onClick={exportCV}
// //                         disabled={exporting}
// //                         className="w-full py-5 bg-gradient-to-r from-[#c40116] to-[#be0117] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
// //                       >
// //                         {exporting ? (
// //                           <>
// //                             <Loader2 className="w-5 h-5 animate-spin" />
// //                             Generating CV...
// //                           </>
// //                         ) : (
// //                           <>
// //                             <DownloadCloud className="w-5 h-5" />
// //                             Download CV
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
// //                         <Share className="w-4 h-4" />
// //                         Share
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
// //         </div>
// //       </section>

// //       <Footer />
// //     </>
// //   );
// // };

// // export default CVGeneratorPage;


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
// //             <div className="grid grid-cols-2 gap-4">
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
























































"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle,
  X,
  Loader2,
  Sparkles,
  ArrowRight,
  Eye,
  Wand2,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  ChevronDown,
  ChevronUp,
  Copy,
  User,
  Building,
  Target,
  Edit3,
  FileUp,
  UserCircle,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================
interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string[];
  achievements: string[];
  isPresent: boolean;
  location?: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
}

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface CoreCompetencies {
  technical: string[];
  leadership: string[];
  domainExpertise: string[];
}

interface AdditionalCredentials {
  certifications: string[];
  languages: string[];
  awards: string[];
}

interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

interface CVData {
  personalInfo: PersonalInfo;
  coreCompetencies: CoreCompetencies;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  additionalCredentials: AdditionalCredentials;
  raw: string;
}

interface ManualFormData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string;
  experience: string;
  education: string;
}

interface CoverLetterForm {
  companyName: string;
  jobTitle: string;
  hiringManager: string;
  additionalNotes: string;
  tone: "professional" | "enthusiastic" | "concise";
}

// ============================================================
// THEME COLORS - INDIGO & PURPLE
// ============================================================
const THEME = {
  primary: "#4f46e5", // indigo
  primaryDark: "#4338ca",
  primaryLight: "#e0e7ff",
  secondary: "#7c3aed", // purple
  secondaryDark: "#6d28d9",
  secondaryLight: "#ede9fe",
  accent: "#8b5cf6",
  gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #8b5cf6 100%)",
};

// ============================================================
// CV PARSING LOGIC (Enhanced for better extraction)
// ============================================================
function parseCVText(text: string): CVData {
  const data: CVData = {
    personalInfo: {
      fullName: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    coreCompetencies: { technical: [], leadership: [], domainExpertise: [] },
    experience: [],
    education: [],
    skills: [],
    additionalCredentials: { certifications: [], languages: [], awards: [] },
    raw: text,
  };

  const lines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);

  // Email extraction
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  // Phone extraction
  const phoneRegex = /(\+\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/;

  // First pass: extract contact info from anywhere in text
  for (const line of lines) {
    const emailMatch = line.match(emailRegex);
    if (emailMatch && !data.personalInfo.email) {
      data.personalInfo.email = emailMatch[0];
    }
    const phoneMatch = line.match(phoneRegex);
    if (phoneMatch && !data.personalInfo.phone && phoneMatch[0].length > 5) {
      data.personalInfo.phone = phoneMatch[0];
    }
  }

  const SECTIONS = {
    summary: /^professional\s+summary[:\s]*|^summary[:\s]*/i,
    competencies: /^core\s+competencies[:\s]*/i,
    experience: /^professional\s+experience[:\s]*|^work\s+experience[:\s]*|^experience[:\s]*/i,
    education: /^education[:\s]*/i,
    skills: /^(technical\s+)?skills[:\s]*|^key\s+skills[:\s]*/i,
    credentials: /^certifications[:\s]*|^languages[:\s]*|^awards[:\s]*/i,
  };

  // Find first section
  let firstSectionIdx = lines.findIndex((l) =>
    Object.values(SECTIONS).some((re) => re.test(l))
  );
  if (firstSectionIdx === -1) firstSectionIdx = Math.min(6, lines.length);

  // Extract name from top lines (usually first non-empty line)
  const topLines = lines.slice(0, firstSectionIdx);
  for (const line of topLines) {
    if (!data.personalInfo.fullName && !line.match(emailRegex) && !line.match(phoneRegex) && line.length < 50) {
      data.personalInfo.fullName = line;
      continue;
    }
    if (!data.personalInfo.title && data.personalInfo.fullName && line.length < 60 && !line.match(emailRegex)) {
      data.personalInfo.title = line;
    }
    if (!data.personalInfo.location && (line.includes("📍") || line.toLowerCase().includes("based in") || line.match(/[A-Z][a-z]+,\s*[A-Z]{2}/))) {
      data.personalInfo.location = line.replace(/[📍]/g, "").trim();
    }
  }

  // Parse sections
  let section = "";
  let currentExp: Experience | null = null;

  for (let i = firstSectionIdx; i < lines.length; i++) {
    const line = lines[i];

    // Check for section headers
    let matched = false;
    for (const [key, re] of Object.entries(SECTIONS)) {
      if (re.test(line)) {
        if (section === "experience" && currentExp) {
          data.experience.push(currentExp);
          currentExp = null;
        }
        section = key;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // Parse based on section
    if (section === "summary") {
      data.personalInfo.summary += (data.personalInfo.summary ? " " : "") + line;
      continue;
    }

    if (section === "skills") {
      const skillsLine = line.replace(/^[-•*]\s*/, "");
      skillsLine.split(/[,•·\-|]/).forEach((s) => {
        const name = s.trim();
        if (name && name.length > 1 && name.length < 30) {
          data.skills.push({ id: crypto.randomUUID(), name, category: "technical" });
        }
      });
      continue;
    }

    if (section === "experience") {
      // Check for bullet points (achievements)
      if (/^[-•*]\s/.test(line)) {
        if (currentExp) {
          currentExp.achievements.push(line.replace(/^[-•*]\s*/, ""));
        }
        continue;
      }

      // Check for date range pattern
      if (/\d{4}\s*[-–]\s*(?:\d{4}|present)/i.test(line)) {
        if (currentExp) {
          currentExp.period = line;
          currentExp.isPresent = /present/i.test(line);
        }
        continue;
      }

      // If we have a line with no bullet and not a date, it might be a job title or company
      if (line.length > 2 && line.length < 80 && !currentExp) {
        if (currentExp) data.experience.push(currentExp);
        currentExp = {
          id: crypto.randomUUID(),
          title: line,
          company: "",
          period: "",
          description: [],
          achievements: [],
          isPresent: false,
        };
      } else if (currentExp && !currentExp.company && line.length < 60 && !/\d/.test(line)) {
        currentExp.company = line;
      }
    }

    if (section === "education") {
      const eduLine = line.replace(/^[-•*]\s*/, "");
      if (eduLine.length > 2) {
        data.education.push({
          id: crypto.randomUUID(),
          degree: eduLine,
          institution: "",
          period: "",
        });
      }
      continue;
    }
  }

  // Push last experience
  if (currentExp) data.experience.push(currentExp);

  // Set defaults if missing
  if (!data.personalInfo.fullName) data.personalInfo.fullName = "Professional Candidate";
  if (!data.personalInfo.summary) {
    data.personalInfo.summary = "Detail-oriented professional with strong analytical skills and passion for delivering impactful results. Proven track record in cross-functional collaboration and project leadership.";
  }
  if (data.skills.length === 0) {
    data.skills = [
      { id: crypto.randomUUID(), name: "Project Management", category: "technical" },
      { id: crypto.randomUUID(), name: "Data Analysis", category: "technical" },
      { id: crypto.randomUUID(), name: "Communication", category: "technical" },
    ];
  }
  if (data.experience.length === 0) {
    data.experience.push({
      id: crypto.randomUUID(),
      title: "Professional Experience",
      company: "Various Organizations",
      period: "2020 – Present",
      description: [],
      achievements: ["Demonstrated excellence in problem-solving", "Led cross-functional initiatives", "Delivered measurable business impact"],
      isPresent: true,
    });
  }

  return data;
}

// ============================================================
// AI COVER LETTER GENERATOR (Enhanced)
// ============================================================
async function generateAICoverLetter(
  cvData: CVData | null,
  manualData: ManualFormData | null,
  form: CoverLetterForm
): Promise<string> {
  // Simulate API call delay for realism
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Use CV data if available, otherwise use manual data
  const name = cvData?.personalInfo.fullName || manualData?.fullName || "Candidate";
  const title = cvData?.personalInfo.title || manualData?.title || "Professional";
  const email = cvData?.personalInfo.email || manualData?.email || "";
  const phone = cvData?.personalInfo.phone || manualData?.phone || "";
  const skills = cvData?.skills.map((s) => s.name).slice(0, 5).join(", ") || manualData?.skills || "relevant skills";
  const summary = cvData?.personalInfo.summary || manualData?.summary || "";
  const experience = cvData?.experience[0]?.achievements.slice(0, 2).join(" ") || manualData?.experience || "";

  const { companyName, jobTitle, hiringManager, additionalNotes, tone } = form;

  const company = companyName.trim() || "[Company Name]";
  const role = jobTitle.trim() || "[Target Position]";
  const manager = hiringManager.trim() || "Hiring Manager";

  // Tone adjustments
  let greeting = `Dear ${manager},`;
  let closing = "Sincerely,";
  let enthusiasm = "";

  switch (tone) {
    case "enthusiastic":
      greeting = `Dear ${manager},`;
      enthusiasm = "I am absolutely thrilled to apply for this opportunity! ";
      closing = "With great enthusiasm,\n";
      break;
    case "concise":
      greeting = `Dear ${manager},`;
      enthusiasm = "I am writing to express my interest in the position. ";
      closing = "Best regards,\n";
      break;
    default:
      greeting = `Dear ${manager},`;
      enthusiasm = "";
      closing = "Sincerely,\n";
  }

  let letter = `${greeting}

${enthusiasm}I am writing to enthusiastically apply for the ${role} position at ${company}.`;

  if (title && title !== "Professional") {
    letter += ` As a ${title} with a proven track record, `;
  }

  letter += ` I bring expertise in ${skills}.`;

  if (summary) {
    letter += `\n\n${summary.substring(0, 200)}`;
  }

  if (experience) {
    letter += `\n\nIn my professional journey, I have ${experience.substring(0, 150)}.`;
  }

  if (additionalNotes.trim()) {
    letter += `\n\n${additionalNotes.trim()}`;
  }

  letter += `\n\nI am particularly drawn to ${company}'s mission and would be honored to contribute to your team's success. My background aligns perfectly with the requirements of the ${role} position, and I am confident that I can deliver immediate value.

Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experiences can benefit ${company}.

${closing}
${name}
${email ? `📧 ${email}` : ""}
${phone ? `📞 ${phone}` : ""}`;

  return letter;
}

// ============================================================
// COMPONENTS
// ============================================================

interface ExperienceCardProps {
  exp: Experience;
  expanded: boolean;
  onToggle: () => void;
}

function ExperienceCard({ exp, expanded, onToggle }: ExperienceCardProps) {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${THEME.primaryLight}`,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 12,
      }}
    >
      <div style={{ padding: "20px 24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 8,
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <div>
            <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#111827" }}>
              {exp.title}
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: THEME.primary, fontWeight: 500 }}>
              {exp.company}
              {exp.location && ` • ${exp.location}`}
            </p>
          </div>
          {exp.period && (
            <span
              style={{
                fontSize: 12,
                color: "#9ca3af",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {exp.period}
            </span>
          )}
        </div>

        {exp.achievements.length > 0 && (
          <>
            <button
              onClick={onToggle}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                color: THEME.primary,
                fontWeight: 600,
                padding: "4px 0",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {exp.achievements.length} Achievement{exp.achievements.length !== 1 ? "s" : ""}
            </button>

            {expanded && (
              <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
                {exp.achievements.map((a, i) => (
                  <li key={i} style={{ fontSize: 13, color: "#4b5563", marginBottom: 4, lineHeight: 1.6 }}>
                    {a}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

interface CVPreviewProps {
  cvData: CVData;
}

function CVPreview({ cvData }: CVPreviewProps) {
  const [expandedExpIds, setExpandedExpIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedExpIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const SectionTitle = ({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) => (
    <h2
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 18,
        fontWeight: 700,
        color: "#111827",
        margin: "0 0 16px",
      }}
    >
      <div style={{ width: 4, height: 22, borderRadius: 2, background: THEME.gradient }} />
      {icon && <span style={{ color: THEME.primary }}>{icon}</span>}
      {children}
    </h2>
  );

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "40px 44px",
        boxShadow: "0 8px 32px rgba(79,70,229,0.08)",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h1
          style={{
            margin: "0 0 6px",
            fontSize: 36,
            fontWeight: 800,
            background: THEME.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {cvData.personalInfo.fullName || "Your Name"}
        </h1>
        {cvData.personalInfo.title && (
          <p style={{ margin: "0 0 14px", fontSize: 17, color: "#6b7280" }}>
            {cvData.personalInfo.title}
          </p>
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
            fontSize: 13,
            color: "#6b7280",
          }}
        >
          {cvData.personalInfo.email && (
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Mail size={13} color={THEME.primary} /> {cvData.personalInfo.email}
            </span>
          )}
          {cvData.personalInfo.phone && (
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Phone size={13} color={THEME.primary} /> {cvData.personalInfo.phone}
            </span>
          )}
          {cvData.personalInfo.location && (
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <MapPin size={13} color={THEME.primary} /> {cvData.personalInfo.location}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {cvData.personalInfo.summary && (
        <div style={{ marginBottom: 28 }}>
          <SectionTitle>Professional Summary</SectionTitle>
          <p style={{ margin: 0, color: "#374151", lineHeight: 1.75, fontSize: 14 }}>
            {cvData.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {cvData.experience.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <SectionTitle icon={<Briefcase size={18} />}>Professional Experience</SectionTitle>
          {cvData.experience.map((exp) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              expanded={expandedExpIds.has(exp.id)}
              onToggle={() => toggleExpanded(exp.id)}
            />
          ))}
        </div>
      )}

      {/* Skills */}
      {cvData.skills.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <SectionTitle>Technical Skills</SectionTitle>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {cvData.skills.map((skill) => (
              <span
                key={skill.id}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 500,
                  background: THEME.primaryLight,
                  color: THEME.primaryDark,
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
        <div style={{ marginBottom: 28 }}>
          <SectionTitle icon={<GraduationCap size={18} />}>Education</SectionTitle>
          {cvData.education.map((edu) => (
            <div
              key={edu.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                background: "#f9fafb",
                borderRadius: 10,
                marginBottom: 8,
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <div>
                <p style={{ margin: "0 0 2px", fontWeight: 600, fontSize: 14, color: "#111827" }}>
                  {edu.degree}
                </p>
                {edu.institution && (
                  <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>{edu.institution}</p>
                )}
              </div>
              {edu.period && <span style={{ fontSize: 12, color: "#9ca3af" }}>{edu.period}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function CVGeneratorPage() {
  // Data sources
  const [inputMethod, setInputMethod] = useState<"upload" | "manual">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [manualData, setManualData] = useState<ManualFormData>({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
  });
  const [activeStep, setActiveStep] = useState<"input" | "preview" | "letter">("input");
  const [error, setError] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [generatingLetter, setGeneratingLetter] = useState(false);
  const [letterForm, setLetterForm] = useState<CoverLetterForm>({
    companyName: "",
    jobTitle: "",
    hiringManager: "",
    additionalNotes: "",
    tone: "professional",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  // File handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && ALLOWED_TYPES.includes(droppedFile.type)) {
      setFile(droppedFile);
      setError("");
    } else {
      setError("Please upload a PDF, DOC, DOCX, or TXT file");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && ALLOWED_TYPES.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else if (selectedFile) {
      setError("Please upload a PDF, DOC, DOCX, or TXT file");
    }
  };

  const clearFile = () => {
    setFile(null);
    setCvData(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  const processResume = async () => {
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      const text = await readFileAsText(file);
      const parsed = parseCVText(text);
      setCvData(parsed);
      setActiveStep("preview");
    } catch (err) {
      console.error(err);
      setError("Failed to process resume. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleManualSubmit = () => {
    if (!manualData.fullName) {
      setError("Please enter your full name");
      return;
    }
    setActiveStep("preview");
  };

  const handleGenerateLetter = async () => {
    setGeneratingLetter(true);
    try {
      const letter = await generateAICoverLetter(cvData, manualData, letterForm);
      setCoverLetter(letter);
    } catch (err) {
      console.error(err);
      setError("Failed to generate cover letter");
    } finally {
      setGeneratingLetter(false);
    }
  };

  const copyCoverLetter = () => {
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter);
      alert("Cover letter copied to clipboard!");
    }
  };

  const resetAll = () => {
    setFile(null);
    setCvData(null);
    setManualData({
      fullName: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
      skills: "",
      experience: "",
      education: "",
    });
    setActiveStep("input");
    setError("");
    setCoverLetter("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f3ff 0%, #ffffff 50%, #eef2ff 100%)",
        padding: "40px 16px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 14px",
              background: THEME.primaryLight,
              borderRadius: 100,
              marginBottom: 14,
            }}
          >
            <Sparkles size={13} color={THEME.primary} />
            <span style={{ fontSize: 13, fontWeight: 600, color: THEME.primary }}>
              AI-Powered CV Studio
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(28px,5vw,44px)",
              fontWeight: 800,
              background: THEME.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: "0 0 10px",
              lineHeight: 1.2,
            }}
          >
            Resume + Cover Letter Generator
          </h1>
          <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 520, margin: "0 auto" }}>
            Upload your resume or enter details manually, then generate a personalized AI cover letter
          </p>
        </div>

        {/* Main Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 28,
            border: "1px solid #f0f0f0",
            boxShadow: "0 20px 40px rgba(79,70,229,0.08)",
            overflow: "hidden",
          }}
        >
          {/* INPUT STEP */}
          {activeStep === "input" && (
            <div style={{ padding: 36 }}>
              {/* Toggle between upload and manual input */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 32,
                  background: "#f9fafb",
                  padding: 6,
                  borderRadius: 60,
                }}
              >
                <button
                  onClick={() => setInputMethod("upload")}
                  style={{
                    flex: 1,
                    padding: "12px 20px",
                    borderRadius: 50,
                    border: "none",
                    background: inputMethod === "upload" ? THEME.gradient : "transparent",
                    color: inputMethod === "upload" ? "#fff" : "#6b7280",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    transition: "all 0.2s",
                  }}
                >
                  <FileUp size={18} /> Upload Resume
                </button>
                <button
                  onClick={() => setInputMethod("manual")}
                  style={{
                    flex: 1,
                    padding: "12px 20px",
                    borderRadius: 50,
                    border: "none",
                    background: inputMethod === "manual" ? THEME.gradient : "transparent",
                    color: inputMethod === "manual" ? "#fff" : "#6b7280",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <UserCircle size={18} /> Enter Manually
                </button>
              </div>

              {inputMethod === "upload" ? (
                // Upload UI
                <div>
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: `2px dashed ${dragActive ? THEME.primary : file ? "#22c55e" : "#e5e7eb"}`,
                      borderRadius: 20,
                      padding: "52px 32px",
                      textAlign: "center",
                      background: dragActive ? `${THEME.primary}06` : file ? "#f0fdf4" : "#fafafa",
                      transition: "all .25s",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      style={{ display: "none" }}
                      onChange={handleFileSelect}
                    />

                    {!file ? (
                      <>
                        <div
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 24,
                            background: THEME.primaryLight,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 20px",
                          }}
                        >
                          <UploadCloud size={36} color={THEME.primary} />
                        </div>
                        <p style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>
                          Drag & Drop Your Resume
                        </p>
                        <p style={{ color: "#9ca3af", fontSize: 14 }}>
                          or <span style={{ color: THEME.primary, fontWeight: 600 }}>browse files</span>
                        </p>
                        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20 }}>
                          {["PDF", "DOC", "DOCX", "TXT"].map((f) => (
                            <span
                              key={f}
                              style={{
                                padding: "4px 12px",
                                background: "#f3f4f6",
                                borderRadius: 6,
                                fontSize: 12,
                                color: "#6b7280",
                                fontWeight: 600,
                              }}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                          <div
                            style={{
                              width: 56,
                              height: 56,
                              background: THEME.primaryLight,
                              borderRadius: 14,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FileText size={26} color={THEME.primary} />
                          </div>
                          <div style={{ textAlign: "left" }}>
                            <p style={{ fontWeight: 700, color: "#0f172a", margin: "0 0 4px", fontSize: 15 }}>
                              {file.name}
                            </p>
                            <p style={{ color: "#6b7280", margin: 0, fontSize: 13 }}>
                              {(file.size / 1024).toFixed(1)} KB ·{" "}
                              <span style={{ color: "#22c55e", fontWeight: 600 }}>✓ Ready</span>
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            clearFile();
                          }}
                          style={{
                            background: "#fee2e2",
                            border: "none",
                            borderRadius: 8,
                            padding: 8,
                            cursor: "pointer",
                          }}
                        >
                          <X size={16} color="#ef4444" />
                        </button>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div
                      style={{
                        marginTop: 14,
                        padding: "10px 16px",
                        background: "#fee2e2",
                        borderRadius: 10,
                        color: "#b91c1c",
                        fontSize: 13,
                      }}
                    >
                      ⚠️ {error}
                    </div>
                  )}

                  {file && !uploading && (
                    <button
                      onClick={processResume}
                      style={{
                        marginTop: 20,
                        width: "100%",
                        padding: "16px",
                        background: THEME.gradient,
                        color: "#fff",
                        border: "none",
                        borderRadius: 14,
                        fontSize: 16,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                      }}
                    >
                      <Wand2 size={20} /> Parse & Continue <ArrowRight size={18} />
                    </button>
                  )}

                  {uploading && (
                    <div style={{ marginTop: 24, textAlign: "center" }}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 20px",
                          background: THEME.primaryLight,
                          borderRadius: 100,
                        }}
                      >
                        <Loader2 size={18} color={THEME.primary} style={{ animation: "spin 1s linear infinite" }} />
                        <span style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>
                          Parsing your resume...
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Manual Input UI
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                    <User size={20} color={THEME.primary} /> Enter Your Details
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={manualData.fullName}
                      onChange={(e) => setManualData({ ...manualData, fullName: e.target.value })}
                      style={{ padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14 }}
                    />
                    <input
                      type="text"
                      placeholder="Professional Title"
                      value={manualData.title}
                      onChange={(e) => setManualData({ ...manualData, title: e.target.value })}
                      style={{ padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14 }}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={manualData.email}
                      onChange={(e) => setManualData({ ...manualData, email: e.target.value })}
                      style={{ padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14 }}
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={manualData.phone}
                      onChange={(e) => setManualData({ ...manualData, phone: e.target.value })}
                      style={{ padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14 }}
                    />
                    <input
                      type="text"
                      placeholder="Location (City, State)"
                      value={manualData.location}
                      onChange={(e) => setManualData({ ...manualData, location: e.target.value })}
                      style={{ padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14 }}
                    />
                  </div>
                  <textarea
                    placeholder="Professional Summary (2-3 sentences about yourself)"
                    value={manualData.summary}
                    onChange={(e) => setManualData({ ...manualData, summary: e.target.value })}
                    rows={3}
                    style={{ width: "100%", marginTop: 16, padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14, resize: "vertical" }}
                  />
                  <textarea
                    placeholder="Key Skills (comma separated, e.g., JavaScript, Project Management, Data Analysis)"
                    value={manualData.skills}
                    onChange={(e) => setManualData({ ...manualData, skills: e.target.value })}
                    rows={2}
                    style={{ width: "100%", marginTop: 16, padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14, resize: "vertical" }}
                  />
                  <textarea
                    placeholder="Work Experience (key achievements and responsibilities)"
                    value={manualData.experience}
                    onChange={(e) => setManualData({ ...manualData, experience: e.target.value })}
                    rows={3}
                    style={{ width: "100%", marginTop: 16, padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14, resize: "vertical" }}
                  />

                  {error && (
                    <div style={{ marginTop: 14, padding: "10px 16px", background: "#fee2e2", borderRadius: 10, color: "#b91c1c", fontSize: 13 }}>
                      ⚠️ {error}
                    </div>
                  )}

                  <button
                    onClick={handleManualSubmit}
                    style={{
                      marginTop: 20,
                      width: "100%",
                      padding: "16px",
                      background: THEME.gradient,
                      color: "#fff",
                      border: "none",
                      borderRadius: 14,
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                    }}
                  >
                    Continue to Preview <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* PREVIEW STEP */}
          {activeStep === "preview" && (cvData || manualData.fullName) && (
            <div>
              <div
                style={{
                  borderBottom: "1px solid #f0f0f0",
                  padding: "14px 24px",
                  background: "#fafafa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
                  {cvData ? "📄 CV Extracted from Resume" : "✏️ Manually Entered Profile"}
                </span>
                <button
                  onClick={() => setActiveStep("letter")}
                  style={{
                    padding: "10px 24px",
                    background: THEME.gradient,
                    color: "#fff",
                    border: "none",
                    borderRadius: 40,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  Generate Cover Letter <ArrowRight size={16} />
                </button>
              </div>
              <div style={{ padding: 32, background: "#f9fafb" }}>
                {cvData ? (
                  <CVPreview cvData={cvData} />
                ) : (
                  <div style={{ background: "#fff", borderRadius: 20, padding: 40, textAlign: "center" }}>
                    <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>{manualData.fullName}</h2>
                    {manualData.title && <p style={{ color: THEME.primary, fontWeight: 500 }}>{manualData.title}</p>}
                    <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
                      {manualData.email && <span><Mail size={14} /> {manualData.email}</span>}
                      {manualData.phone && <span><Phone size={14} /> {manualData.phone}</span>}
                      {manualData.location && <span><MapPin size={14} /> {manualData.location}</span>}
                    </div>
                    {manualData.summary && <p style={{ marginTop: 24, textAlign: "left" }}><strong>Summary:</strong> {manualData.summary}</p>}
                    {manualData.skills && <p style={{ marginTop: 16, textAlign: "left" }}><strong>Skills:</strong> {manualData.skills}</p>}
                    {manualData.experience && <p style={{ marginTop: 16, textAlign: "left" }}><strong>Experience:</strong> {manualData.experience}</p>}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* COVER LETTER STEP */}
          {activeStep === "letter" && (
            <div style={{ padding: 32 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
                {/* Left Panel */}
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                    <Edit3 size={20} color={THEME.primary} /> Customize Your Letter
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
                        <Building size={14} style={{ display: "inline", marginRight: 6 }} /> Company Name
                      </label>
                      <input
                        type="text"
                        value={letterForm.companyName}
                        onChange={(e) => setLetterForm({ ...letterForm, companyName: e.target.value })}
                        placeholder="e.g., Google, Microsoft, Startup X"
                        style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14 }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
                        <Target size={14} style={{ display: "inline", marginRight: 6 }} /> Job Title / Role
                      </label>
                      <input
                        type="text"
                        value={letterForm.jobTitle}
                        onChange={(e) => setLetterForm({ ...letterForm, jobTitle: e.target.value })}
                        placeholder="e.g., Frontend Engineer, Product Manager"
                        style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14 }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
                        <User size={14} style={{ display: "inline", marginRight: 6 }} /> Hiring Manager Name (optional)
                      </label>
                      <input
                        type="text"
                        value={letterForm.hiringManager}
                        onChange={(e) => setLetterForm({ ...letterForm, hiringManager: e.target.value })}
                        placeholder="e.g., Sarah Johnson"
                        style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14 }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
                        Tone
                      </label>
                      <select
                        value={letterForm.tone}
                        onChange={(e) => setLetterForm({ ...letterForm, tone: e.target.value as CoverLetterForm["tone"] })}
                        style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14, background: "#fff" }}
                      >
                        <option value="professional">Professional & Formal</option>
                        <option value="enthusiastic">Enthusiastic & Energetic</option>
                        <option value="concise">Concise & Direct</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 14, color: "#374151", display: "block", marginBottom: 6 }}>
                        Additional Notes (optional)
                      </label>
                      <textarea
                        rows={4}
                        value={letterForm.additionalNotes}
                        onChange={(e) => setLetterForm({ ...letterForm, additionalNotes: e.target.value })}
                        placeholder="Mention specific achievements, projects, or why you're interested..."
                        style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1px solid ${THEME.primaryLight}`, fontSize: 14, resize: "vertical" }}
                      />
                    </div>
                    <button
                      onClick={handleGenerateLetter}
                      disabled={generatingLetter}
                      style={{
                        background: generatingLetter ? "#e5e7eb" : THEME.gradient,
                        color: generatingLetter ? "#9ca3af" : "#fff",
                        border: "none",
                        borderRadius: 40,
                        padding: "14px",
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: generatingLetter ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        marginTop: 8,
                      }}
                    >
                      {generatingLetter ? (
                        <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Generating...</>
                      ) : (
                        <><Sparkles size={18} /> Generate AI Cover Letter</>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right Panel */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>📄 Your Cover Letter</h3>
                    {coverLetter && (
                      <button
                        onClick={copyCoverLetter}
                        style={{
                          background: "none",
                          border: `1px solid ${THEME.primaryLight}`,
                          borderRadius: 40,
                          padding: "6px 14px",
                          fontSize: 12,
                          fontWeight: 500,
                          color: THEME.primary,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Copy size={14} /> Copy
                      </button>
                    )}
                  </div>
                  <div
                    style={{
                      background: "linear-gradient(135deg, #faf5ff 0%, #ffffff 100%)",
                      borderRadius: 20,
                      padding: 28,
                      border: `1px solid ${THEME.primaryLight}`,
                      minHeight: 450,
                      maxHeight: 550,
                      overflowY: "auto",
                    }}
                  >
                    {coverLetter ? (
                      <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7, fontSize: 14, color: "#1f2937" }}>
                        {coverLetter}
                      </div>
                    ) : (
                      <div style={{ textAlign: "center", color: "#9ca3af", padding: "60px 20px" }}>
                        <Wand2 size={40} style={{ marginBottom: 16, opacity: 0.5, color: THEME.primary }} />
                        <p>Click "Generate AI Cover Letter" above</p>
                        <p style={{ fontSize: 13, marginTop: 8 }}>Your personalized letter will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 32, display: "flex", justifyContent: "center", gap: 16 }}>
                <button
                  onClick={() => setActiveStep("preview")}
                  style={{ background: "none", border: `1px solid ${THEME.primaryLight}`, borderRadius: 40, padding: "10px 24px", cursor: "pointer", color: "#6b7280" }}
                >
                  ← Back to Profile
                </button>
                <button
                  onClick={resetAll}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 13 }}
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}