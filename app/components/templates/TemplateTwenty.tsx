"use client";
import React, { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import {
  formatMonthYear,
  getLocalStorage,
  MonthYearDisplay,
} from "@/app/utils";
import { usePathname } from "next/navigation";
import { User } from "@/app/types/user.types";
import { ResumeProps } from "@/app/types";

const TemplateTwoColumn: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);

  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const contact = alldata?.contact || context.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills || context?.skills || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";
  const projects = alldata?.projects || context?.projects || [];

  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.postcode,
    contact?.country,
  ].filter(Boolean);

  const linkedinUrl = contact?.linkedin;
  const portfolioUrl = contact?.portfolio;

  // Calculate skill level percentage (assuming level is 1-5)
  const getSkillPercentage = (level: number | string) => {
    const numLevel = typeof level === 'string' ? parseInt(level) : level;
    return (numLevel / 5) * 100;
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    
   
    
    .t20-resume {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }
    
    .t20-resume .resume-card {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      display: flex;
      flex-wrap: wrap;
    }
    
    /* Left Column - Dark/Creative Side */
    .t20-resume .left-column {
      flex: 1.2;
      background: linear-gradient(135deg, #2d1b4e 0%, #1a0f2e 100%);
      color: white;
      padding: 40px 30px;
      position: relative;
    }
    
    .t20-resume .left-column::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
    }
    
    /* Right Column */
    .t20-resume .right-column {
      flex: 2;
      background: white;
      padding: 40px 35px;
    }
    
    /* Profile Section */
    .t20-resume .profile-image {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .t20-resume .avatar {
      width: 150px;
      height: 150px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      border-radius: 50%;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 60px;
      font-weight: bold;
      color: white;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    
    .t20-resume .name-left {
      font-size: 28px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }
    
    .t20-resume .title-left {
      font-size: 14px;
      text-align: center;
      color: rgba(255,255,255,0.8);
      margin-bottom: 25px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    /* Contact Info */
    .t20-resume .section-left {
      margin-bottom: 30px;
    }
    
    .t20-resume .section-title-left {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
      letter-spacing: 1px;
      position: relative;
      display: inline-block;
    }
    
    .t20-resume .section-title-left::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, #f093fb, #f5576c);
      border-radius: 2px;
    }
    
    .t20-resume .contact-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 15px;
      font-size: 13px;
      color: rgba(255,255,255,0.85);
      line-height: 1.5;
    }
    
    .t20-resume .contact-icon {
      width: 32px;
      height: 32px;
      background: rgba(255,255,255,0.1);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }
    
    /* Skills */
    .t20-resume .skill-item {
      margin-bottom: 18px;
    }
    
    .t20-resume .skill-name {
      font-size: 13px;
      margin-bottom: 8px;
      color: rgba(255,255,255,0.9);
    }
    
    .t20-resume .skill-bar {
      height: 6px;
      background: rgba(255,255,255,0.2);
      border-radius: 3px;
      overflow: hidden;
    }
    
    .t20-resume .skill-progress {
      height: 100%;
      background: linear-gradient(90deg, #f093fb, #f5576c);
      border-radius: 3px;
      transition: width 0.3s ease;
    }
    
    /* Languages */
    .t20-resume .language-item {
      margin-bottom: 15px;
    }
    
    .t20-resume .language-name {
      font-size: 13px;
      margin-bottom: 6px;
      color: rgba(255,255,255,0.9);
    }
    
    .t20-resume .language-level {
      font-size: 11px;
      color: rgba(255,255,255,0.6);
    }
    
    /* Right Column Sections */
    .t20-resume .section-right {
      margin-bottom: 35px;
    }
    
    .t20-resume .section-title-right {
      font-size: 22px;
      font-weight: 700;
      color: #2d1b4e;
      margin-bottom: 20px;
      letter-spacing: -0.5px;
      position: relative;
      padding-bottom: 10px;
    }
    
    .t20-resume .section-title-right::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 3px;
      background: linear-gradient(90deg, #f093fb, #f5576c);
      border-radius: 2px;
    }
    
    /* Summary */
    .t20-resume .summary-text {
      color: #4a5568;
      line-height: 1.7;
      font-size: 14px;
    }
    
    /* Experience & Education Items */
    .t20-resume .exp-item,
    .t20-resume .edu-item,
    .t20-resume .project-item {
      margin-bottom: 28px;
    }
    
    .t20-resume .exp-header,
    .t20-resume .edu-header,
    .t20-resume .project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }
    
    .t20-resume .exp-title,
    .t20-resume .edu-title,
    .t20-resume .project-title {
      font-size: 18px;
      font-weight: 700;
      color: #2d1b4e;
    }
    
    .t20-resume .exp-company,
    .t20-resume .edu-institution {
      font-size: 14px;
      color: #f5576c;
      font-weight: 500;
      margin-top: 2px;
    }
    
    .t20-resume .exp-date,
    .t20-resume .edu-date {
      font-size: 12px;
      color: #a0aec0;
      font-weight: 500;
    }
    
    .t20-resume .exp-description,
    .t20-resume .edu-description,
    .t20-resume .project-description {
      margin-top: 10px;
      color: #4a5568;
      line-height: 1.6;
      font-size: 13px;
    }
    
    .t20-resume .exp-description ul,
    .t20-resume .edu-description ul,
    .t20-resume .project-description ul {
      padding-left: 20px;
      margin-top: 8px;
    }
    
    .t20-resume .exp-description li,
    .t20-resume .edu-description li,
    .t20-resume .project-description li {
      margin-bottom: 6px;
    }
    
    /* Tech Stack Tags */
    .t20-resume .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }
    
    .t20-resume .tech-tag {
      background: linear-gradient(135deg, #f093fb20 0%, #f5576c20 100%);
      color: #f5576c;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 500;
    }
    
    /* Project Links */
    .t20-resume .project-links {
      display: flex;
      gap: 15px;
      margin-top: 10px;
    }
    
    .t20-resume .project-link {
      color: #f5576c;
      text-decoration: none;
      font-size: 12px;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    
    .t20-resume .project-link:hover {
      text-decoration: underline;
    }
    
    /* Additional Items */
    .t20-resume .additional-item {
      color: #4a5568;
      line-height: 1.6;
      font-size: 13px;
      margin-bottom: 8px;
      padding-left: 20px;
      position: relative;
    }
    
    .t20-resume .additional-item::before {
      content: '▹';
      position: absolute;
      left: 0;
      color: #f5576c;
    }
    
    /* Download Button */
    .t20-resume .download-btn-container {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .t20-resume .download-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 32px;
      border-radius: 50px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .t20-resume .download-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
    }
    
    /* Print Styles */
    @media print {
      .t20-resume {
        padding: 0;
        background: white;
      }
      
      .t20-resume .download-btn-container {
        display: none;
      }
      
      .t20-resume .resume-card {
        box-shadow: none;
        border-radius: 0;
      }
      
      .t20-resume .left-column {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      .t20-resume .skill-progress {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .t20-resume .resume-card {
        flex-direction: column;
      }
      
      .t20-resume .exp-header,
      .t20-resume .edu-header,
      .t20-resume .project-header {
        flex-direction: column;
        gap: 5px;
      }
    }
  `;

  const generateHTML = () => {
    const renderDescription = (text: string) => {
      if (!text) return "";
      if (text.includes("<") && text.includes(">")) {
        return text;
      }
      const lines = text.split("\n").filter(l => l.trim() !== "");
      if (lines.some(l => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
        return `<ul>${lines.map(l => {
          const trimmed = l.trim();
          const content = trimmed.startsWith("-") || trimmed.startsWith("•") 
            ? trimmed.substring(1).trim() 
            : trimmed;
          return content ? `<li>${content}</li>` : "";
        }).join("")}</ul>`;
      }
      return `<p>${text}</p>`;
    };

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
  <style>${styles}</style>
</head>
<body class="t20-resume">
  <div class="resume-card">
    
    <!-- LEFT COLUMN -->
    <div class="left-column">
      <div class="profile-image">
        <div class="avatar">
          ${contact?.firstName?.charAt(0) || ""}${contact?.lastName?.charAt(0) || ""}
        </div>
        <div class="name-left">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
        <div class="title-left">${typeof contact?.jobTitle === "string" ? contact.jobTitle : contact?.jobTitle?.name || "Creative Professional"}</div>
      </div>
      
      <div class="section-left">
        <div class="section-title-left">Contact</div>
        ${contact?.email ? `<div class="contact-item"><div class="contact-icon">📧</div><div>${contact.email}</div></div>` : ""}
        ${contact?.phone ? `<div class="contact-item"><div class="contact-icon">📱</div><div>${contact.phone}</div></div>` : ""}
        ${addressParts.length ? `<div class="contact-item"><div class="contact-icon">📍</div><div>${addressParts.join(", ")}</div></div>` : ""}
        ${linkedinUrl ? `<div class="contact-item"><div class="contact-icon">🔗</div><div>LinkedIn</div></div>` : ""}
        ${portfolioUrl ? `<div class="contact-item"><div class="contact-icon">🎨</div><div>Portfolio</div></div>` : ""}
      </div>
      
      <div class="section-left">
        <div class="section-title-left">Skills</div>
        ${skills.map(skill => `
          <div class="skill-item">
            <div class="skill-name">${skill.skill || ""}</div>
            ${skill.level ? `<div class="skill-bar"><div class="skill-progress" style="width: ${getSkillPercentage(skill.level)}%"></div></div>` : ""}
          </div>
        `).join("")}
      </div>
      
      ${finalize?.languages?.filter(l => l.name?.trim()).length ? `
      <div class="section-left">
        <div class="section-title-left">Languages</div>
        ${finalize.languages.filter(l => l.name?.trim()).map(lang => `
          <div class="language-item">
            <div class="language-name">${lang.name}</div>
            <div class="language-level">${lang.level || ""}</div>
          </div>
        `).join("")}
      </div>
      ` : ""}
    </div>
    
    <!-- RIGHT COLUMN -->
    <div class="right-column">
      ${summary ? `
      <div class="section-right">
        <div class="section-title-right">About Me</div>
        <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
      </div>
      ` : ""}
      
      ${experiences.length ? `
      <div class="section-right">
        <div class="section-title-right">Experience</div>
        ${experiences.map(exp => `
          <div class="exp-item">
            <div class="exp-header">
              <div>
                <div class="exp-title">${exp.jobTitle || ""}</div>
                <div class="exp-company">${exp.employer || ""}${exp.location ? ` • ${exp.location}` : ""}</div>
              </div>
              <div class="exp-date">
                ${exp.startDate ? formatMonthYear(exp.startDate, true) : ""} - ${exp.endDate ? formatMonthYear(exp.endDate, true) : "Present"}
              </div>
            </div>
            <div class="exp-description">${renderDescription(exp.text || "")}</div>
          </div>
        `).join("")}
      </div>
      ` : ""}
      
      ${projects?.length ? `
      <div class="section-right">
        <div class="section-title-right">Projects</div>
        ${projects.map((project: any) => `
          <div class="project-item">
            <div class="project-header">
              <div class="project-title">${project.title || ""}</div>
            </div>
            ${project.techStack?.length ? `
            <div class="tech-stack">
              ${project.techStack.map((tech: string) => `<span class="tech-tag">${tech}</span>`).join("")}
            </div>
            ` : ""}
            <div class="project-description">${renderDescription(project.description || "")}</div>
            ${project.liveUrl || project.githubUrl ? `
            <div class="project-links">
              ${project.liveUrl ? `<a href="${project.liveUrl}" class="project-link" target="_blank">🔗 Live Demo</a>` : ""}
              ${project.githubUrl ? `<a href="${project.githubUrl}" class="project-link" target="_blank">💻 GitHub</a>` : ""}
            </div>
            ` : ""}
          </div>
        `).join("")}
      </div>
      ` : ""}
      
      ${educations.length ? `
      <div class="section-right">
        <div class="section-title-right">Education</div>
        ${educations.map(edu => `
          <div class="edu-item">
            <div class="edu-header">
              <div>
                <div class="edu-title">${edu.schoolname || ""}</div>
                <div class="edu-institution">${edu.degree || ""}${edu.location ? ` • ${edu.location}` : ""}</div>
              </div>
              <div class="edu-date">${edu.startDate || ""}${edu.startDate && edu.endDate ? " - " : ""}${edu.endDate || ""}</div>
            </div>
            <div class="edu-description">${renderDescription(edu.text || "")}</div>
          </div>
        `).join("")}
      </div>
      ` : ""}
      
      ${finalize?.certificationsAndLicenses?.filter(c => c.name?.trim()).length ? `
      <div class="section-right">
        <div class="section-title-right">Certifications</div>
        ${finalize.certificationsAndLicenses.filter(c => c.name?.trim()).map(cert => `
          <div class="additional-item">${cert.name}</div>
        `).join("")}
      </div>
      ` : ""}
      
      ${finalize?.awardsAndHonors?.filter(a => a.name?.trim()).length ? `
      <div class="section-right">
        <div class="section-title-right">Awards</div>
        ${finalize.awardsAndHonors.filter(a => a.name?.trim()).map(award => `
          <div class="additional-item">${award.name}</div>
        `).join("")}
      </div>
      ` : ""}
    </div>
  </div>
</body>
</html>`;
  };

  const handleDownload = async (): Promise<void> => {
    try {
      const html = generateHTML();
      const res: AxiosResponse<Blob> = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        { html },
        { responseType: "blob" }
      );
      
      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const stripHtml = (html: string) => html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

  const renderDescriptionJSX = (text: string) => {
    if (!text) return null;
    if (text.includes("<") && text.includes(">")) {
      return <div dangerouslySetInnerHTML={{ __html: text }} />;
    }
    const lines = text.split("\n").filter(l => l.trim() !== "");
    if (lines.some(l => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
      return (
        <ul>
          {lines.map((l, i) => {
            const trimmed = l.trim();
            const content = trimmed.startsWith("-") || trimmed.startsWith("•") 
              ? trimmed.substring(1).trim() 
              : trimmed;
            return content ? <li key={i}>{content}</li> : null;
          })}
        </ul>
      );
    }
    return <p>{text}</p>;
  };

  return (
    <>
      {lastSegment === "download-resume" && (
        <div className="download-btn-container">
          <button onClick={handleDownload} className="download-btn">
            ⬇ Download Resume PDF
          </button>
        </div>
      )}

      <div className="t20-resume">
        <div className="resume-card">
          {/* LEFT COLUMN */}
          <div className="left-column">
            <div className="profile-image">
              <div className="avatar">
                {contact?.firstName?.charAt(0) || ""}{contact?.lastName?.charAt(0) || ""}
              </div>
              <div className="name-left">{contact?.firstName} {contact?.lastName}</div>
              <div className="title-left">
                {typeof contact?.jobTitle === "string" 
                  ? contact.jobTitle 
                  : (contact?.jobTitle as any)?.name || "Creative Professional"}
              </div>
            </div>

            <div className="section-left">
              <div className="section-title-left">Contact</div>
              {contact?.email && (
                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <div>{contact.email}</div>
                </div>
              )}
              {contact?.phone && (
                <div className="contact-item">
                  <div className="contact-icon">📱</div>
                  <div>{contact.phone}</div>
                </div>
              )}
              {addressParts.length > 0 && (
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>{addressParts.join(", ")}</div>
                </div>
              )}
              {linkedinUrl && (
                <div className="contact-item">
                  <div className="contact-icon">🔗</div>
                  <div>LinkedIn</div>
                </div>
              )}
              {portfolioUrl && (
                <div className="contact-item">
                  <div className="contact-icon">🎨</div>
                  <div>Portfolio</div>
                </div>
              )}
            </div>

            <div className="section-left">
              <div className="section-title-left">Skills</div>
              {skills.map((skill, i) => (
                <div key={i} className="skill-item">
                  <div className="skill-name">{skill.skill}</div>
                  {skill.level && (
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: `${getSkillPercentage(skill.level)}%` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {finalize?.languages?.filter((l: any) => l.name?.trim()).length > 0 && (
              <div className="section-left">
                <div className="section-title-left">Languages</div>
                {finalize.languages.filter((l: any) => l.name?.trim()).map((lang: any, i: number) => (
                  <div key={i} className="language-item">
                    <div className="language-name">{lang.name}</div>
                    <div className="language-level">{lang.level || ""}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            {summary && (
              <div className="section-right">
                <div className="section-title-right">About Me</div>
                <div className="summary-text" dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }} />
              </div>
            )}

            {experiences.length > 0 && (
              <div className="section-right">
                <div className="section-title-right">Experience</div>
                {experiences.map((exp, i) => (
                  <div key={i} className="exp-item">
                    <div className="exp-header">
                      <div>
                        <div className="exp-title">{exp.jobTitle}</div>
                        <div className="exp-company">
                          {exp.employer}{exp.location && ` • ${exp.location}`}
                        </div>
                      </div>
                      <div className="exp-date">
                        {exp.startDate ? formatMonthYear(exp.startDate, true) : ""} - {exp.endDate ? formatMonthYear(exp.endDate, true) : "Present"}
                      </div>
                    </div>
                    <div className="exp-description">
                      {renderDescriptionJSX(exp.text || "")}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {projects?.length > 0 && (
              <div className="section-right">
                <div className="section-title-right">Projects</div>
                {projects.map((project: any, i: number) => (
                  <div key={i} className="project-item">
                    <div className="project-header">
                      <div className="project-title">{project.title}</div>
                    </div>
                    {project.techStack?.length > 0 && (
                      <div className="tech-stack">
                        {project.techStack.map((tech: string, j: number) => (
                          <span key={j} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    )}
                    <div className="project-description">
                      {renderDescriptionJSX(project.description || "")}
                    </div>
                    {(project.liveUrl || project.githubUrl) && (
                      <div className="project-links">
                        {project.liveUrl && (
                          <a href={project.liveUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                            🔗 Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                            💻 GitHub
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {educations.length > 0 && (
              <div className="section-right">
                <div className="section-title-right">Education</div>
                {educations.map((edu, i) => (
                  <div key={i} className="edu-item">
                    <div className="edu-header">
                      <div>
                        <div className="edu-title">{edu.schoolname}</div>
                        <div className="edu-institution">
                          {edu.degree}{edu.location && ` • ${edu.location}`}
                        </div>
                      </div>
                      <div className="edu-date">
                        {edu.startDate || ""}{edu.startDate && edu.endDate && " - "}{edu.endDate || ""}
                      </div>
                    </div>
                    <div className="edu-description">
                      {renderDescriptionJSX(edu.text || "")}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {finalize?.certificationsAndLicenses?.filter((c: any) => c.name?.trim()).length > 0 && (
              <div className="section-right">
                <div className="section-title-right">Certifications</div>
                {finalize.certificationsAndLicenses.filter((c: any) => c.name?.trim()).map((cert: any, i: number) => (
                  <div key={i} className="additional-item" dangerouslySetInnerHTML={{ __html: cert.name }} />
                ))}
              </div>
            )}

            {finalize?.awardsAndHonors?.filter((a: any) => a.name?.trim()).length > 0 && (
              <div className="section-right">
                <div className="section-title-right">Awards</div>
                {finalize.awardsAndHonors.filter((a: any) => a.name?.trim()).map((award: any, i: number) => (
                  <div key={i} className="additional-item" dangerouslySetInnerHTML={{ __html: award.name }} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateTwoColumn;