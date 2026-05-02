// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import { ReactNode, useEffect, useState } from "react";
// import {
//   FiBriefcase,
//   FiUser,
//   FiCheck,
// } from "react-icons/fi";
// import {
//   FaGraduationCap,
//   FaTags,
//   FaMagic,
//   FaSpinner,
// } from "react-icons/fa";
// import { HiSparkles } from "react-icons/hi";

// interface Section {
//   id: string;
//   name: string;
//   icon: ReactNode;
//   color: string;
//   gradient: string;
// }

// const sections: Section[] = [
//   {
//     id: "education",
//     name: "Education",
//     icon: <FaGraduationCap />,
//     color: "blue",
//     gradient: "from-blue-500 to-cyan-500",
//   },
//   {
//     id: "experience",
//     name: "Experience",
//     icon: <FiBriefcase />,
//     color: "orange",
//     gradient: "from-orange-500 to-red-500",
//   },
//   {
//     id: "skills",
//     name: "Skills",
//     icon: <FaTags />,
//     color: "purple",
//     gradient: "from-purple-500 to-pink-500",
//   },
//   {
//     id: "summary",
//     name: "Summary",
//     icon: <FiUser />,
//     color: "cyan",
//     gradient: "from-cyan-500 to-blue-500",
//   },
// ];

// interface UserData {
//   degree: string;
//   university: string;
//   year: string;
//   cgpa: string;
//   jobTitle: string;
//   company: string;
//   experience: string;
// }

// const defaultUserData: UserData = {
//   degree: "Computer Science Engineering",
//   university: "Stanford University",
//   year: "2020-2024",
//   cgpa: "8.7/10",
//   jobTitle: "Full Stack Developer",
//   company: "Google",
//   experience: "2 years",
// };

// export const AIContentSuggestionsDemo = () => {
//   const [activeSection, setActiveSection] = useState(0);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [displayText, setDisplayText] = useState("");
//   const [userData] = useState(defaultUserData);

//   const generateAISuggestion = () => {
//     setIsGenerating(true);
//     setTimeout(() => {
//       let text = "";
//       if (activeSection === 0) {
//         text = generateEducationText(userData);
//       } else if (activeSection === 1) {
//         text = generateExperienceText(userData);
//       } else if (activeSection === 2) {
//         text = generateSkillsText();
//       } else {
//         text = generateSummaryText(userData);
//       }
//       setDisplayText(text);
//       setIsGenerating(false);
//     }, 800);
//   };

//   useEffect(() => {
//     generateAISuggestion();
//   }, [activeSection]);

//   const currentSection = sections[activeSection];

//   return (

//      <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-6 sm:mb-10">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 mb-3 sm:mb-4">
//               <FaMagic className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
//               <span className="text-[10px] sm:text-sm font-semibold text-purple-700">Feature 02</span>
//             </div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//               AI Content Suggestions
//               <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Personalized for Your Profile
//               </span>
//             </h2>
//             <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto px-4">
//               AI analyzes your education and experience to generate optimized content for every section
//             </p>
//           </div>

//             <motion.div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10">
//       <div className="bg-gray-800/50 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-white/10">
//         <div className="flex gap-1.5 sm:gap-2">
//           <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
//           <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
//           <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
//         </div>
//         <div className="flex items-center gap-2 sm:gap-3">
//           <span className="text-[10px] sm:text-xs text-gray-400 font-mono hidden sm:block">
//             AI Content Suggestions
//           </span>
//         </div>
//       </div>

//       <div className="p-3 sm:p-4 md:p-6">
//         {/* Section Tabs */}
//         <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
//           {sections.map((section, idx) => (
//             <SectionTab
//               key={idx}
//               section={section}
//               isActive={activeSection === idx}
//               onClick={() => setActiveSection(idx)}
//             />
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//           {/* Left Panel */}
//           <LeftPanel section={currentSection} userData={userData} />

//           {/* Right Panel */}
//           <RightPanel
//             section={currentSection}
//             isGenerating={isGenerating}
//             displayText={displayText}
//           />
//         </div>
//       </div>
//     </motion.div>
//      </div>

  
//   );
// };

// // Sub-components
// const SectionTab = ({ section, isActive, onClick }: any) => (
//   <motion.button
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//     onClick={onClick}
//     className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all duration-300 text-xs sm:text-sm ${
//       isActive
//         ? `bg-gradient-to-r ${section.gradient} text-white shadow-lg`
//         : "bg-gray-800 text-gray-400 hover:bg-gray-700"
//     }`}
//   >
//     {section.icon}
//     <span className="hidden sm:inline">{section.name}</span>
//   </motion.button>
// );

// const LeftPanel = ({ section, userData }: { section: Section; userData: UserData }) => (
//   <div className="bg-black/30 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5">
//     <div className="flex items-center gap-2 mb-3 sm:mb-4">
//       <div
//         className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br ${section.gradient} flex items-center justify-center text-white text-xs sm:text-sm`}
//       >
//         {section.icon}
//       </div>
//       <h3 className="text-white font-medium text-sm sm:text-base">
//         Your {section.name} Data
//       </h3>
//     </div>

//     {section.id === "education" && <EducationForm userData={userData} />}
//     {section.id === "experience" && <ExperienceForm userData={userData} />}
//     {(section.id === "skills" || section.id === "summary") && (
//       <AIBasisInfo userData={userData} />
//     )}
//   </div>
// );

// const EducationForm = ({ userData }: { userData: UserData }) => (
//   <div className="space-y-2 sm:space-y-3">
//     <div>
//       <label className="text-gray-400 text-[10px] sm:text-xs block mb-1">Degree</label>
//       <input
//         type="text"
//         value={userData.degree}
//         readOnly
//         className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-xs sm:text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
//       />
//     </div>
//     <div>
//       <label className="text-gray-400 text-[10px] sm:text-xs block mb-1">University</label>
//       <input
//         type="text"
//         value={userData.university}
//         readOnly
//         className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-xs sm:text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
//       />
//     </div>
//     <div className="grid grid-cols-2 gap-2">
//       <div>
//         <label className="text-gray-400 text-[10px] sm:text-xs block mb-1">Year</label>
//         <input
//           readOnly
//           type="text"
//           value={userData.year}
//           className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-xs sm:text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
//         />
//       </div>
//       <div>
//         <label className="text-gray-400 text-[10px] sm:text-xs block mb-1">CGPA</label>
//         <input
//           readOnly
//           type="text"
//           value={userData.cgpa}
//           className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-xs sm:text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
//         />
//       </div>
//     </div>
//   </div>
// );

// const ExperienceForm = ({ userData }: { userData: UserData }) => (
//   <div className="space-y-2 sm:space-y-3">
//     <div>
//       <label className="text-gray-400 text-[10px] sm:text-xs block mb-1">Job Title</label>
//       <input
//         type="text"
//         readOnly
//         value={userData.jobTitle}
//         className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-xs sm:text-sm border border-gray-700 focus:border-orange-500 focus:outline-none"
//       />
//     </div>
//     <div>
//       <label className="text-gray-400 text-[10px] sm:text-xs block mb-1">Company</label>
//       <input
//         type="text"
//         readOnly
//         value={userData.company}
//         className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-xs sm:text-sm border border-gray-700 focus:border-orange-500 focus:outline-none"
//       />
//     </div>
//     <div>
//       <label className="text-gray-400 text-[10px] sm:text-xs block mb-1">Experience (years)</label>
//       <input
//         readOnly
//         type="text"
//         value={userData.experience}
//         className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-xs sm:text-sm border border-gray-700 focus:border-orange-500 focus:outline-none"
//       />
//     </div>
//   </div>
// );

// const AIBasisInfo = ({ userData }: { userData: UserData }) => (
//   <div className="p-3 sm:p-4 bg-gray-800/50 rounded-lg">
//     <p className="text-gray-400 text-xs sm:text-sm">AI generates based on:</p>
//     <ul className="mt-2 space-y-1 text-gray-300 text-xs sm:text-sm">
//       <li>• Education: {userData.degree}</li>
//       <li>• Experience: {userData.jobTitle} at {userData.company}</li>
//     </ul>
//   </div>
// );

// const RightPanel = ({ section, isGenerating, displayText }: any) => (
//   <div
//     className={`bg-gradient-to-br ${section.gradient}/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-${section.color}-500/20`}
//   >
//     <div className="flex items-center gap-2 mb-2 sm:mb-3">
//       <FaMagic className={`w-3 h-3 sm:w-4 sm:h-4 text-${section.color}-400`} />
//       <h3 className="text-white font-medium text-sm sm:text-base">
//         AI Generated {section.name}
//       </h3>
//       <motion.div
//         animate={{ rotate: 360 }}
//         transition={{ duration: 2, repeat: Infinity }}
//         className="ml-auto"
//       >
//         <HiSparkles className={`w-3 h-3 sm:w-4 sm:h-4 text-${section.color}-400`} />
//       </motion.div>
//     </div>

//     <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 min-h-[280px] sm:min-h-[320px] max-h-[280px] sm:max-h-[320px] overflow-y-auto">
//       {isGenerating ? (
//         <div className="flex flex-col items-center justify-center h-32 sm:h-40">
//           <FaSpinner className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 animate-spin mb-2" />
//           <p className="text-gray-400 text-xs sm:text-sm">AI is generating content...</p>
//         </div>
//       ) : (
//         <ContentDisplay text={displayText} />
//       )}
//     </div>
//   </div>
// );

// const ContentDisplay = ({ text }: { text: string }) => (
//   <div className="text-white text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
//     {text.split("\n").map((line, i) => {
//       if (line.startsWith("•")) {
//         return (
//           <div key={i} className="flex items-start gap-1 sm:gap-2 ml-2 sm:ml-4 mb-1">
//             <span className="text-emerald-400">▹</span>
//             <span className="text-gray-300">{line.substring(1)}</span>
//           </div>
//         );
//       }
//       if (
//         line.startsWith("📚") ||
//         line.startsWith("📖") ||
//         line.startsWith("🏆") ||
//         line.startsWith("🚀") ||
//         line.startsWith("🛠️") ||
//         line.startsWith("🤝") ||
//         line.startsWith("👋") ||
//         line.startsWith("💡") ||
//         line.startsWith("🎯")
//       ) {
//         return (
//           <div key={i} className="font-semibold text-emerald-400 mt-2 mb-1 text-xs sm:text-sm">
//             {line}
//           </div>
//         );
//       }
//       if (line.trim() === "") return <div key={i} className="h-1 sm:h-2" />;
//       return <div key={i} className="mb-0.5 sm:mb-1">{line}</div>;
//     })}
//   </div>
// );

// // Helper functions for generating content
// const generateEducationText = (userData: UserData) => `
// ${userData.degree} from ${userData.university} (${userData.year})

// 📚 CGPA: ${userData.cgpa} (First Class with Distinction)

// 📖 Relevant Coursework:
// • Data Structures & Algorithms
// • Operating Systems
// • Database Management Systems
// • Machine Learning
// • Cloud Computing

// 🏆 Achievements:
// • Dean's List 2022
// • Published Research Paper on AI in Healthcare
// • Winner of Hackathon 2023`;

// const generateExperienceText = (userData: UserData) => `
// ${userData.jobTitle} at ${userData.company}
// 📍 ${userData.experience} years of experience

// 🚀 Key Achievements:

// • Architected and deployed scalable microservices handling 2M+ daily requests, reducing API latency by 38%

// • Led a team of 6 engineers to deliver critical features ahead of schedule, receiving 'Star Performer' award

// • Implemented CI/CD pipelines reducing deployment time by 60% and improving team productivity

// • Optimized database queries improving response time by 45% and reducing server costs by 30%

// • Mentored 3 junior developers, helping them achieve promotion within 12 months`;

// const generateSkillsText = () => `
// 🛠️ Technical Skills

// • Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Redux
// • Backend: Node.js, Python, Java, Spring Boot, GraphQL, REST APIs
// • Cloud & DevOps: AWS (EC2, S3, Lambda), Docker, Kubernetes, Jenkins
// • Databases: PostgreSQL, MongoDB, Redis, MySQL
// • Tools: Git, Jira, Figma, Postman, Agile/Scrum

// 🤝 Soft Skills

// • Leadership & Team Management
// • Problem Solving & Critical Thinking
// • Communication & Collaboration
// • Project Management
// • Mentoring & Knowledge Sharing`;

// const generateSummaryText = (userData: UserData) => `
// 👋 Professional Summary

// Results-driven ${userData.jobTitle} with ${userData.experience} years of experience at ${userData.company}, specializing in building scalable web applications and leading technical teams.

// ${userData.degree} graduate from ${userData.university} with a strong foundation in full-stack development, system design, and cloud architecture.

// 💡 Proven track record of delivering high-impact features that drive user engagement and business growth. Passionate about solving complex problems, mentoring developers, and staying current with emerging technologies.

// 🎯 Looking to leverage technical expertise and leadership skills to drive innovation at a forward-thinking company.`;
















// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import { ReactNode, useEffect, useState } from "react";
// import {
//   FiBriefcase,
//   FiUser,
//   FiCheck,
// } from "react-icons/fi";
// import {
//   FaGraduationCap,
//   FaTags,
//   FaMagic,
//   FaSpinner,
// } from "react-icons/fa";
// import { HiSparkles } from "react-icons/hi";

// interface Section {
//   id: string;
//   name: string;
//   icon: ReactNode;
//   color: string;
//   gradient: string;
// }

// const sections: Section[] = [
//   {
//     id: "education",
//     name: "Education",
//     icon: <FaGraduationCap />,
//     color: "blue",
//     gradient: "from-blue-500 to-cyan-500",
//   },
//   {
//     id: "experience",
//     name: "Experience",
//     icon: <FiBriefcase />,
//     color: "orange",
//     gradient: "from-orange-500 to-red-500",
//   },
//   {
//     id: "skills",
//     name: "Skills",
//     icon: <FaTags />,
//     color: "purple",
//     gradient: "from-purple-500 to-pink-500",
//   },
//   {
//     id: "summary",
//     name: "Summary",
//     icon: <FiUser />,
//     color: "cyan",
//     gradient: "from-cyan-500 to-blue-500",
//   },
// ];

// interface UserData {
//   degree: string;
//   university: string;
//   year: string;
//   cgpa: string;
//   jobTitle: string;
//   company: string;
//   experience: string;
// }

// const defaultUserData: UserData = {
//   degree: "Computer Science Engineering",
//   university: "Stanford University",
//   year: "2020-2024",
//   cgpa: "8.7/10",
//   jobTitle: "Full Stack Developer",
//   company: "Google",
//   experience: "2 years",
// };

// export const AIContentSuggestionsDemo = () => {
//   const [activeSection, setActiveSection] = useState(0);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [displayText, setDisplayText] = useState("");
//   const [userData] = useState(defaultUserData);

//   const generateAISuggestion = () => {
//     setIsGenerating(true);
//     setTimeout(() => {
//       let text = "";
//       if (activeSection === 0) {
//         text = generateEducationText(userData);
//       } else if (activeSection === 1) {
//         text = generateExperienceText(userData);
//       } else if (activeSection === 2) {
//         text = generateSkillsText();
//       } else {
//         text = generateSummaryText(userData);
//       }
//       setDisplayText(text);
//       setIsGenerating(false);
//     }, 800);
//   };

//   useEffect(() => {
//     generateAISuggestion();
//   }, [activeSection]);

//   const currentSection = sections[activeSection];

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
//       <div className="text-center mb-6 sm:mb-8 md:mb-10">
//         <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-purple-50 border border-purple-100 mb-3 sm:mb-4">
//           <FaMagic className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-purple-500" />
//           <span className="text-[9px] sm:text-xs md:text-sm font-semibold text-purple-700">
//             Feature 02
//           </span>
//         </div>
//         <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 px-4">
//           AI Content Suggestions
//           <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-0.5 sm:mt-1">
//             Personalized for Your Profile
//           </span>
//         </h2>
//         <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-500 max-w-2xl mx-auto px-4">
//           AI analyzes your education and experience to generate optimized content for every section
//         </p>
//       </div>

//       <motion.div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/10">
//         <div className="bg-gray-800/50 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-white/10">
//           <div className="flex gap-1.5 sm:gap-2">
//             <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500" />
//             <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500" />
//             <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500" />
//           </div>
//           <div className="flex items-center gap-2 sm:gap-3">
//             <span className="text-[8px] sm:text-xs text-gray-400 font-mono hidden sm:block">
//               AI Content Suggestions
//             </span>
//           </div>
//         </div>

//         <div className="p-3 sm:p-4 md:p-5 lg:p-6">
//           {/* Section Tabs */}
//           <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5 md:mb-6">
//             {sections.map((section, idx) => (
//               <SectionTab
//                 key={idx}
//                 section={section}
//                 isActive={activeSection === idx}
//                 onClick={() => setActiveSection(idx)}
//               />
//             ))}
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
//             {/* Left Panel */}
//             <LeftPanel section={currentSection} userData={userData} />

//             {/* Right Panel */}
//             <RightPanel
//               section={currentSection}
//               isGenerating={isGenerating}
//               displayText={displayText}
//             />
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // Sub-components
// const SectionTab = ({ section, isActive, onClick }: any) => (
//   <motion.button
//     whileHover={{ scale: 1.02 }}
//     whileTap={{ scale: 0.98 }}
//     onClick={onClick}
//     className={`flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl transition-all duration-300 text-[10px] sm:text-xs md:text-sm ${
//       isActive
//         ? `bg-gradient-to-r ${section.gradient} text-white shadow-lg`
//         : "bg-gray-800 text-gray-400 hover:bg-gray-700"
//     }`}
//   >
//     {section.icon}
//     <span className="hidden sm:inline">{section.name}</span>
//   </motion.button>
// );

// const LeftPanel = ({ section, userData }: { section: Section; userData: UserData }) => (
//   <div className="bg-black/30 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5">
//     <div className="flex items-center gap-2 mb-3 sm:mb-4">
//       <div
//         className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br ${section.gradient} flex items-center justify-center text-white text-[10px] sm:text-xs md:text-sm`}
//       >
//         {section.icon}
//       </div>
//       <h3 className="text-white font-medium text-xs sm:text-sm md:text-base">
//         Your {section.name} Data
//       </h3>
//     </div>

//     {section.id === "education" && <EducationForm userData={userData} />}
//     {section.id === "experience" && <ExperienceForm userData={userData} />}
//     {(section.id === "skills" || section.id === "summary") && (
//       <AIBasisInfo userData={userData} />
//     )}
//   </div>
// );

// const EducationForm = ({ userData }: { userData: UserData }) => (
//   <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
//     <div>
//       <label className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs block mb-0.5 sm:mb-1">
//         Degree
//       </label>
//       <input
//         type="text"
//         value={userData.degree}
//         readOnly
//         className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-[10px] sm:text-xs md:text-sm border border-gray-700 focus:border-blue-500 focus:outline-none cursor-default"
//       />
//     </div>
//     <div>
//       <label className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs block mb-0.5 sm:mb-1">
//         University
//       </label>
//       <input
//         type="text"
//         value={userData.university}
//         readOnly
//         className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-[10px] sm:text-xs md:text-sm border border-gray-700 focus:border-blue-500 focus:outline-none cursor-default"
//       />
//     </div>
//     <div className="grid grid-cols-2 gap-2">
//       <div>
//         <label className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs block mb-0.5 sm:mb-1">
//           Year
//         </label>
//         <input
//           readOnly
//           type="text"
//           value={userData.year}
//           className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-[10px] sm:text-xs md:text-sm border border-gray-700 focus:border-blue-500 focus:outline-none cursor-default"
//         />
//       </div>
//       <div>
//         <label className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs block mb-0.5 sm:mb-1">
//           CGPA
//         </label>
//         <input
//           readOnly
//           type="text"
//           value={userData.cgpa}
//           className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-[10px] sm:text-xs md:text-sm border border-gray-700 focus:border-blue-500 focus:outline-none cursor-default"
//         />
//       </div>
//     </div>
//   </div>
// );

// const ExperienceForm = ({ userData }: { userData: UserData }) => (
//   <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
//     <div>
//       <label className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs block mb-0.5 sm:mb-1">
//         Job Title
//       </label>
//       <input
//         type="text"
//         readOnly
//         value={userData.jobTitle}
//         className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-[10px] sm:text-xs md:text-sm border border-gray-700 focus:border-orange-500 focus:outline-none cursor-default"
//       />
//     </div>
//     <div>
//       <label className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs block mb-0.5 sm:mb-1">
//         Company
//       </label>
//       <input
//         type="text"
//         readOnly
//         value={userData.company}
//         className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-[10px] sm:text-xs md:text-sm border border-gray-700 focus:border-orange-500 focus:outline-none cursor-default"
//       />
//     </div>
//     <div>
//       <label className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs block mb-0.5 sm:mb-1">
//         Experience (years)
//       </label>
//       <input
//         readOnly
//         type="text"
//         value={userData.experience}
//         className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-[10px] sm:text-xs md:text-sm border border-gray-700 focus:border-orange-500 focus:outline-none cursor-default"
//       />
//     </div>
//   </div>
// );

// const AIBasisInfo = ({ userData }: { userData: UserData }) => (
//   <div className="p-2.5 sm:p-3 md:p-4 bg-gray-800/50 rounded-lg">
//     <p className="text-gray-400 text-[9px] sm:text-xs md:text-sm">AI generates based on:</p>
//     <ul className="mt-1.5 sm:mt-2 space-y-0.5 sm:space-y-1 text-gray-300 text-[9px] sm:text-xs md:text-sm">
//       <li>• Education: {userData.degree}</li>
//       <li>• Experience: {userData.jobTitle} at {userData.company}</li>
//     </ul>
//   </div>
// );

// const RightPanel = ({ section, isGenerating, displayText }: any) => {
//   const colorMap: Record<string, string> = {
//     blue: "text-blue-400",
//     orange: "text-orange-400",
//     purple: "text-purple-400",
//     cyan: "text-cyan-400",
//   };

//   return (
//     <div
//       className={`bg-gradient-to-br ${section.gradient}/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-${section.color}-500/20`}
//     >
//       <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
//         <FaMagic className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 ${colorMap[section.color]}`} />
//         <h3 className="text-white font-medium text-xs sm:text-sm md:text-base">
//           AI Generated {section.name}
//         </h3>
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 2, repeat: Infinity }}
//           className="ml-auto"
//         >
//           <HiSparkles className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 ${colorMap[section.color]}`} />
//         </motion.div>
//       </div>

//       <div className="bg-gray-800/50 rounded-lg p-2.5 sm:p-3 md:p-4 min-h-[240px] sm:min-h-[280px] md:min-h-[320px] max-h-[240px] sm:max-h-[280px] md:max-h-[320px] overflow-y-auto">
//         {isGenerating ? (
//           <div className="flex flex-col items-center justify-center h-28 sm:h-32 md:h-40">
//             <FaSpinner className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-400 animate-spin mb-1.5 sm:mb-2" />
//             <p className="text-gray-400 text-[9px] sm:text-xs md:text-sm">AI is generating content...</p>
//           </div>
//         ) : (
//           <ContentDisplay text={displayText} />
//         )}
//       </div>
//     </div>
//   );
// };

// const ContentDisplay = ({ text }: { text: string }) => (
//   <div className="text-white text-[9px] sm:text-xs md:text-sm leading-relaxed whitespace-pre-wrap break-words">
//     {text.split("\n").map((line, i) => {
//       if (line.startsWith("•")) {
//         return (
//           <div key={i} className="flex items-start gap-1 sm:gap-1.5 ml-1.5 sm:ml-2 md:ml-4 mb-0.5 sm:mb-1">
//             <span className="text-emerald-400 text-[8px] sm:text-[10px] md:text-xs">▹</span>
//             <span className="text-gray-300 text-[9px] sm:text-xs md:text-sm">{line.substring(1)}</span>
//           </div>
//         );
//       }
//       if (
//         line.startsWith("📚") ||
//         line.startsWith("📖") ||
//         line.startsWith("🏆") ||
//         line.startsWith("🚀") ||
//         line.startsWith("🛠️") ||
//         line.startsWith("🤝") ||
//         line.startsWith("👋") ||
//         line.startsWith("💡") ||
//         line.startsWith("🎯")
//       ) {
//         return (
//           <div key={i} className="font-semibold text-emerald-400 mt-1.5 sm:mt-2 mb-0.5 sm:mb-1 text-[9px] sm:text-xs md:text-sm">
//             {line}
//           </div>
//         );
//       }
//       if (line.trim() === "") return <div key={i} className="h-0.5 sm:h-1 md:h-1.5" />;
//       return <div key={i} className="mb-0.5 sm:mb-1 text-[9px] sm:text-xs md:text-sm">{line}</div>;
//     })}
//   </div>
// );

// // Helper functions for generating content
// const generateEducationText = (userData: UserData) => `
// ${userData.degree} from ${userData.university} (${userData.year})

// 📚 CGPA: ${userData.cgpa} (First Class with Distinction)

// 📖 Relevant Coursework:
// • Data Structures & Algorithms
// • Operating Systems
// • Database Management Systems
// • Machine Learning
// • Cloud Computing

// 🏆 Achievements:
// • Dean's List 2022
// • Published Research Paper on AI in Healthcare
// • Winner of Hackathon 2023`;

// const generateExperienceText = (userData: UserData) => `
// ${userData.jobTitle} at ${userData.company}
// 📍 ${userData.experience} years of experience

// 🚀 Key Achievements:

// • Architected and deployed scalable microservices handling 2M+ daily requests, reducing API latency by 38%

// • Led a team of 6 engineers to deliver critical features ahead of schedule, receiving 'Star Performer' award

// • Implemented CI/CD pipelines reducing deployment time by 60% and improving team productivity

// • Optimized database queries improving response time by 45% and reducing server costs by 30%

// • Mentored 3 junior developers, helping them achieve promotion within 12 months`;

// const generateSkillsText = () => `
// 🛠️ Technical Skills

// • Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Redux
// • Backend: Node.js, Python, Java, Spring Boot, GraphQL, REST APIs
// • Cloud & DevOps: AWS (EC2, S3, Lambda), Docker, Kubernetes, Jenkins
// • Databases: PostgreSQL, MongoDB, Redis, MySQL
// • Tools: Git, Jira, Figma, Postman, Agile/Scrum

// 🤝 Soft Skills

// • Leadership & Team Management
// • Problem Solving & Critical Thinking
// • Communication & Collaboration
// • Project Management
// • Mentoring & Knowledge Sharing`;

// const generateSummaryText = (userData: UserData) => `
// 👋 Professional Summary

// Results-driven ${userData.jobTitle} with ${userData.experience} years of experience at ${userData.company}, specializing in building scalable web applications and leading technical teams.

// ${userData.degree} graduate from ${userData.university} with a strong foundation in full-stack development, system design, and cloud architecture.

// 💡 Proven track record of delivering high-impact features that drive user engagement and business growth. Passionate about solving complex problems, mentoring developers, and staying current with emerging technologies.

// 🎯 Looking to leverage technical expertise and leadership skills to drive innovation at a forward-thinking company.`;





















"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useState, useRef } from "react";
import {
  FiBriefcase,
  FiUser,
  FiCheck,
  FiPause,
  FiPlay,
} from "react-icons/fi";
import {
  FaGraduationCap,
  FaTags,
  FaMagic,
  FaSpinner,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

interface Section {
  id: string;
  name: string;
  icon: ReactNode;
  color: string;
  gradient: string;
}

const sections: Section[] = [
  {
    id: "education",
    name: "Education",
    icon: <FaGraduationCap />,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "experience",
    name: "Experience",
    icon: <FiBriefcase />,
    color: "orange",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "skills",
    name: "Skills",
    icon: <FaTags />,
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "summary",
    name: "Summary",
    icon: <FiUser />,
    color: "cyan",
    gradient: "from-cyan-500 to-blue-500",
  },
];

interface UserData {
  degree: string;
  university: string;
  year: string;
  cgpa: string;
  jobTitle: string;
  company: string;
  experience: string;
}

const defaultUserData: UserData = {
  degree: "Computer Science Engineering",
  university: "Stanford University",
  year: "2020-2024",
  cgpa: "8.7/10",
  jobTitle: "Full Stack Developer",
  company: "Google",
  experience: "2 years",
};

export const AIContentSuggestionsDemo = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [userData] = useState(defaultUserData);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const generateAISuggestion = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let text = "";
      if (activeSection === 0) {
        text = generateEducationText(userData);
      } else if (activeSection === 1) {
        text = generateExperienceText(userData);
      } else if (activeSection === 2) {
        text = generateSkillsText();
      } else {
        text = generateSummaryText(userData);
      }
      setDisplayText(text);
      setIsGenerating(false);
    }, 800);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveSection((prev) => (prev + 1) % sections.length);
      }, 4000); // 4 seconds per section
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  useEffect(() => {
    generateAISuggestion();
  }, [activeSection]);

  const handleSectionClick = (index: number) => {
    setActiveSection(index);
    // Pause auto-play when user manually clicks
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      // Optional: Resume auto-play after 5 seconds of inactivity
      setTimeout(() => {
        setIsAutoPlaying(true);
      }, 5000);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const currentSection = sections[activeSection];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
      <div className="text-center mb-6 sm:mb-8 md:mb-10">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-purple-50 border border-purple-100 mb-3 sm:mb-4">
          <FaMagic className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-purple-500" />
          <span className="text-[9px] sm:text-xs md:text-sm font-semibold text-purple-700">
            Feature 02
          </span>
        </div>
        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 px-4">
          AI Content Suggestions
          <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-0.5 sm:mt-1">
            Personalized for Your Profile
          </span>
        </h2>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-500 max-w-2xl mx-auto px-4">
          AI analyzes your education and experience to generate optimized content for every section
        </p>
      </div>

      <motion.div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <div className="bg-gray-800/50 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-white/10">
          <div className="flex gap-1.5 sm:gap-2">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500" />
          </div>
          
          {/* Auto-play Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            <span className="text-[8px] sm:text-xs text-gray-400 font-mono hidden sm:block">
              AI Content Suggestions
            </span>
          </div>
        </div>

        <div className="p-3 sm:p-4 md:p-5 lg:p-6">
          {/* Section Tabs */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5 md:mb-6">
            {sections.map((section, idx) => (
              <SectionTab
                key={idx}
                section={section}
                isActive={activeSection === idx}
                onClick={() => handleSectionClick(idx)}
                isAutoPlaying={isAutoPlaying}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {/* Left Panel */}
            <LeftPanel section={currentSection} userData={userData} />

            {/* Right Panel */}
            <RightPanel
              section={currentSection}
              isGenerating={isGenerating}
              displayText={displayText}
              isAutoPlaying={isAutoPlaying}
            />
          </div>
        </div>
      </motion.div>

      
    </div>
  );
};

// Section Tab Component
const SectionTab = ({ section, isActive, onClick, isAutoPlaying }: any) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`relative flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl transition-all duration-300 text-[10px] sm:text-xs md:text-sm ${
      isActive
        ? `bg-gradient-to-r ${section.gradient} text-white shadow-lg`
        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
    }`}
  >
    {section.icon}
    <span className="hidden sm:inline">{section.name}</span>
    {isActive && isAutoPlaying && (
      <motion.span
        className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-green-400"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    )}
  </motion.button>
);

const LeftPanel = ({ section, userData }: { section: Section; userData: UserData }) => (
  <div className="bg-black/30 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5">
    <div className="flex items-center gap-2 mb-3 sm:mb-4">
      <div
        className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br ${section.gradient} flex items-center justify-center text-white text-[10px] sm:text-xs md:text-sm`}
      >
        {section.icon}
      </div>
      <h3 className="text-white font-medium text-xs sm:text-sm md:text-base">
        Your {section.name} Data
      </h3>
    </div>

    {section.id === "education" && <EducationForm userData={userData} />}
    {section.id === "experience" && <ExperienceForm userData={userData} />}
    {(section.id === "skills" || section.id === "summary") && (
      <AIBasisInfo userData={userData} />
    )}
  </div>
);

const EducationForm = ({ userData }: { userData: UserData }) => (
  <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
    <div>
      <label className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs block mb-0.5 sm:mb-1">
        Degree
      </label>
      <input
        type="text"
        value={userData.degree}
        readOnly
        className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-[10px] sm:text-xs md:text-sm border border-gray-700  focus:outline-none cursor-default"
      />
    </div>
    <div>
      <label className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs block mb-0.5 sm:mb-1">
        University
      </label>
      <input
        type="text"
        value={userData.university}
        readOnly
        className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-[10px] sm:text-xs md:text-sm border border-gray-700  focus:outline-none cursor-default"
      />
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs block mb-0.5 sm:mb-1">
          Year
        </label>
        <input
          readOnly
          type="text"
          value={userData.year}
          className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-[10px] sm:text-xs md:text-sm border border-gray-700  focus:outline-none cursor-default"
        />
      </div>
      <div>
        <label className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs block mb-0.5 sm:mb-1">
          CGPA
        </label>
        <input
          readOnly
          type="text"
          value={userData.cgpa}
          className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-[10px] sm:text-xs md:text-sm border border-gray-700  focus:outline-none cursor-default"
        />
      </div>
    </div>
  </div>
);

const ExperienceForm = ({ userData }: { userData: UserData }) => (
  <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
    <div>
      <label className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs block mb-0.5 sm:mb-1">
        Job Title
      </label>
      <input
        type="text"
        readOnly
        value={userData.jobTitle}
        className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-[10px] sm:text-xs md:text-sm border border-gray-700  focus:outline-none cursor-default"
      />
    </div>
    <div>
      <label className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs block mb-0.5 sm:mb-1">
        Company
      </label>
      <input
        type="text"
        readOnly
        value={userData.company}
        className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-[10px] sm:text-xs md:text-sm border border-gray-700  focus:outline-none cursor-default"
      />
    </div>
    <div>
      <label className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs block mb-0.5 sm:mb-1">
        Experience (years)
      </label>
      <input
        readOnly
        type="text"
        value={userData.experience}
        className="w-full bg-gray-800 rounded-lg p-1.5 sm:p-2 text-white text-[10px] sm:text-xs md:text-sm border border-gray-700  focus:outline-none cursor-default"
      />
    </div>
  </div>
);

const AIBasisInfo = ({ userData }: { userData: UserData }) => (
  <div className="p-2.5 sm:p-3 md:p-4 bg-gray-800/50 rounded-lg">
    <p className="text-gray-400 text-[9px] sm:text-xs md:text-sm">AI generates based on:</p>
    <ul className="mt-1.5 sm:mt-2 space-y-0.5 sm:space-y-1 text-gray-300 text-[9px] sm:text-xs md:text-sm">
      <li>• Education: {userData.degree}</li>
      <li>• Experience: {userData.jobTitle} at {userData.company}</li>
    </ul>
  </div>
);

const RightPanel = ({ section, isGenerating, displayText, isAutoPlaying }: any) => {
  const colorMap: Record<string, string> = {
    blue: "text-blue-400",
    orange: "text-orange-400",
    purple: "text-purple-400",
    cyan: "text-cyan-400",
  };

  return (
    <div
      className={`bg-gradient-to-br ${section.gradient}/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-${section.color}-500/20 relative overflow-hidden`}
    >
      
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        <FaMagic className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 ${colorMap[section.color]}`} />
        <h3 className="text-white font-medium text-xs sm:text-sm md:text-base">
          AI Generated {section.name}
        </h3>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="ml-auto"
        >
          <HiSparkles className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 ${colorMap[section.color]}`} />
        </motion.div>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-2.5 sm:p-3 md:p-4 min-h-[240px] sm:min-h-[280px] md:min-h-[320px] max-h-[240px] sm:max-h-[280px] md:max-h-[320px] overflow-y-auto">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-28 sm:h-32 md:h-40">
            <FaSpinner className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-400 animate-spin mb-1.5 sm:mb-2" />
            <p className="text-gray-400 text-[9px] sm:text-xs md:text-sm">AI is generating content...</p>
          </div>
        ) : (
          <ContentDisplay text={displayText} />
        )}
      </div>
    </div>
  );
};

const ContentDisplay = ({ text }: { text: string }) => (
  <div className="text-white text-[9px] sm:text-xs md:text-sm leading-relaxed whitespace-pre-wrap break-words">
    {text.split("\n").map((line, i) => {
      if (line.startsWith("•")) {
        return (
          <div key={i} className="flex items-start gap-1 sm:gap-1.5 ml-1.5 sm:ml-2 md:ml-4 mb-0.5 sm:mb-1">
            <span className="text-emerald-400 text-[8px] sm:text-[10px] md:text-xs">▹</span>
            <span className="text-gray-300 text-[9px] sm:text-xs md:text-sm">{line.substring(1)}</span>
          </div>
        );
      }
      if (
        line.startsWith("📚") ||
        line.startsWith("📖") ||
        line.startsWith("🏆") ||
        line.startsWith("🚀") ||
        line.startsWith("🛠️") ||
        line.startsWith("🤝") ||
        line.startsWith("👋") ||
        line.startsWith("💡") ||
        line.startsWith("🎯")
      ) {
        return (
          <div key={i} className="font-semibold text-emerald-400 mt-1.5 sm:mt-2 mb-0.5 sm:mb-1 text-[9px] sm:text-xs md:text-sm">
            {line}
          </div>
        );
      }
      if (line.trim() === "") return <div key={i} className="h-0.5 sm:h-1 md:h-1.5" />;
      return <div key={i} className="mb-0.5 sm:mb-1 text-[9px] sm:text-xs md:text-sm">{line}</div>;
    })}
  </div>
);

// Helper functions for generating content
const generateEducationText = (userData: UserData) => `
${userData.degree} from ${userData.university} (${userData.year})

📚 CGPA: ${userData.cgpa} (First Class with Distinction)

📖 Relevant Coursework:
• Data Structures & Algorithms
• Operating Systems
• Database Management Systems
• Machine Learning
• Cloud Computing

🏆 Achievements:
• Dean's List 2022
• Published Research Paper on AI in Healthcare
• Winner of Hackathon 2023`;

const generateExperienceText = (userData: UserData) => `
${userData.jobTitle} at ${userData.company}
📍 ${userData.experience} years of experience

🚀 Key Achievements:

• Architected and deployed scalable microservices handling 2M+ daily requests, reducing API latency by 38%

• Led a team of 6 engineers to deliver critical features ahead of schedule, receiving 'Star Performer' award

• Implemented CI/CD pipelines reducing deployment time by 60% and improving team productivity

• Optimized database queries improving response time by 45% and reducing server costs by 30%

• Mentored 3 junior developers, helping them achieve promotion within 12 months`;

const generateSkillsText = () => `
🛠️ Technical Skills

• Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Redux
• Backend: Node.js, Python, Java, Spring Boot, GraphQL, REST APIs
• Cloud & DevOps: AWS (EC2, S3, Lambda), Docker, Kubernetes, Jenkins
• Databases: PostgreSQL, MongoDB, Redis, MySQL
• Tools: Git, Jira, Figma, Postman, Agile/Scrum

🤝 Soft Skills

• Leadership & Team Management
• Problem Solving & Critical Thinking
• Communication & Collaboration
• Project Management
• Mentoring & Knowledge Sharing`;

const generateSummaryText = (userData: UserData) => `
👋 Professional Summary

Results-driven ${userData.jobTitle} with ${userData.experience} years of experience at ${userData.company}, specializing in building scalable web applications and leading technical teams.

${userData.degree} graduate from ${userData.university} with a strong foundation in full-stack development, system design, and cloud architecture.

💡 Proven track record of delivering high-impact features that drive user engagement and business growth. Passionate about solving complex problems, mentoring developers, and staying current with emerging technologies.

🎯 Looking to leverage technical expertise and leadership skills to drive innovation at a forward-thinking company.`;