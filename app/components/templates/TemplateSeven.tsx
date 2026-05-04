    

"use client";
import React, { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import {
  cleanQuillHTML,
  formatDateOfBirth,
  formatGradeToCgpdAndPercentage,
  formatMonthYear,
} from "@/app/utils";
import { usePathname } from "next/navigation";
import { ResumeProps } from "@/app/types";
import { motion } from "framer-motion";

const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const contact = alldata?.contact || context.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills?.text || context?.skills.text || "";
  const projects = alldata?.projects || context?.projects || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";

  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.postCode,
    contact?.country,
  ].filter(Boolean);

  const linkedinUrl = contact?.linkedIn;
  const portfolioUrl = contact?.portfolio;
  const githubUrl = contact?.github;
  const dateOfBirth = contact?.dob;

  // Helper function to render skills
  const renderSkills = () => {
    if (!skills || (typeof skills === "string" && !skills.trim())) return null;

    const cleanedSkills = cleanQuillHTML(skills);

    if (
      !cleanedSkills ||
      cleanedSkills === "<p><br></p>" ||
      cleanedSkills === ""
    )
      return null;

    return (
      <div className="section">
        <h2 className="section-title">Skills</h2>
        <div
          className="skills-content"
          dangerouslySetInnerHTML={{ __html: cleanedSkills }}
        />
      </div>
    );
  };

  // Helper function to render projects
  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;

    return (
      <div className="section">
        <h2 className="section-title">Projects</h2>
        {projects.map((project: any, index: number) => (
          <div key={project.id || index} className="project-item">
            <div className="project-header">
              <div className="project-title">{project.title}</div>
              {(project.liveUrl || project.githubUrl) && (
                <div className="project-links">
                  {project.liveUrl && (
                    <a
                      href={
                        project.liveUrl.startsWith("http")
                          ? project.liveUrl
                          : `https://${project.liveUrl}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="project-link"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={
                        project.githubUrl.startsWith("http")
                          ? project.githubUrl
                          : `https://${project.githubUrl}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="project-link"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
            {project.techStack && project.techStack.length > 0 && (
              <div className="project-tech-stack">
                <strong>Tech:</strong> {project.techStack.join(", ")}
              </div>
            )}
            {project.description && (
              <div
                className="project-description"
                dangerouslySetInnerHTML={{
                  __html: cleanQuillHTML(project.description),
                }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  /* ======================================================
     CSS — PROFESSIONAL BLACK & WHITE WITH NUNITO FONT
  ====================================================== */
  const styles = `
  .t7-resume body {
    margin: 0;
    padding: 0;
    background: white;
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .t7-resume {
    width: 210mm;
    padding: 15mm;
    box-sizing: border-box;
    background: white;
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #111827;
    text-align: left;
  }

  .t7-resume.is-preview {
    transform: scale(0.36);
    transform-origin: top left;
    width: 210mm;
    height: auto;
    max-height: none;
    min-height: auto;
    max-width: none;
    min-width: auto;
    overflow: visible;
  }

  /* Global <p> reset */
  .t7-resume p {
    margin: 0 0 6px 0 !important;
    padding: 0 !important;
    line-height: 1.5 !important;
  }

  /* Header Section */
  .t7-resume .resume-header {
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #000000;
    page-break-after: avoid;
    break-after: avoid;
  }

  .t7-resume .name {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 8px;
    color: #000000;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .job-title {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    margin-bottom: 12px;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .contact-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    font-size: 12px;
    color: #444444;
    margin-bottom: 8px;
  }

  .t7-resume .address {
    font-size: 12px;
    color: #444444;
    margin-top: 4px;
  }

  .t7-resume .links {
    margin-top: 8px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .t7-resume .link-item {
    color: #000000;
    text-decoration: underline;
    font-size: 12px;
  }

  /* Section Styles */
  .t7-resume .section {
    margin-bottom: 20px;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .t7-resume .section-title {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #000000;
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid #000000;
    text-align: center !important;
    font-family: 'Nunito', sans-serif;
    page-break-after: avoid;
    break-after: avoid;
  }

  /* Custom Section Title - Same as other section titles */
  .t7-resume .custom-section-title {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #000000;
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid #000000;
    text-align: center !important;
    font-family: 'Nunito', sans-serif;
    page-break-after: avoid;
    break-after: avoid;
  }

  /* Experience Items */
  .t7-resume .experience-item {
    margin-bottom: 20px;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .t7-resume .experience-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 8px;
  }

  .t7-resume .experience-title {
    font-size: 15px;
    font-weight: 700;
    color: #000000;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .experience-subtitle {
    font-size: 13px;
    font-weight: 500;
    color: #555555;
    margin-top: 2px;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .experience-date {
    font-size: 12px;
    color: #555555;
    white-space: nowrap;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .experience-description {
    margin-top: 8px;
    font-size: 13px;
    line-height: 1.5;
    color: #222222;
  }

  /* Education Items */
  .t7-resume .education-item {
    margin-bottom: 20px;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .t7-resume .education-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 8px;
  }

  .t7-resume .education-school {
    font-size: 15px;
    font-weight: 700;
    color: #000000;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .education-subtitle {
    font-size: 13px;
    color: #555555;
    margin-top: 2px;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .education-date {
    font-size: 12px;
    color: #555555;
    white-space: nowrap;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .education-grade {
    font-size: 12px;
    color: #555555;
    margin-top: 4px;
    font-weight: 500;
    display: inline-block;
  }

  .t7-resume .education-description {
    margin-top: 8px;
    font-size: 13px;
    line-height: 1.5;
    color: #222222;
  }

  /* Project Items */
  .t7-resume .project-item {
    margin-bottom: 16px;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .t7-resume .project-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 6px;
  }

  .t7-resume .project-title {
    font-size: 15px;
    font-weight: 700;
    color: #000000;
    font-family: 'Nunito', sans-serif;
  }

  .t7-resume .project-links {
    display: flex;
    gap: 12px;
  }

  .t7-resume .project-link {
    color: #000000;
    text-decoration: underline;
    font-size: 12px;
  }

  .t7-resume .project-tech-stack {
    font-size: 12px;
    color: #555555;
    margin: 4px 0 6px;
  }

  .t7-resume .project-description {
    margin-top: 6px;
    font-size: 13px;
    line-height: 1.5;
    color: #222222;
  }

  /* Skills Content - FIXED LIST STYLES */
  .t7-resume .skills-content {
    padding: 0 5px;
  }

  .t7-resume .skills-content ul {
    list-style-type: disc !important;
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .skills-content ol {
    list-style-type: decimal !important;
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .skills-content li {
    margin-bottom: 4px !important;
    line-height: 1.5 !important;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .t7-resume .skills-content p {
    margin: 0 0 6px 0 !important;
    padding: 0 !important;
    line-height: 1.5 !important;
  }

  /* Custom Section Content - FIXED LIST STYLES */
  .t7-resume .custom-section-content ul {
    list-style-type: disc !important;
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .custom-section-content ol {
    list-style-type: decimal !important;
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .custom-section-content li {
    margin-bottom: 4px !important;
    line-height: 1.5 !important;
  }

  /* Summary Text - FIXED LIST STYLES */
  .t7-resume .summary-text ul {
    list-style-type: disc !important;
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .summary-text ol {
    list-style-type: decimal !important;
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .summary-text li {
    margin-bottom: 4px !important;
    line-height: 1.5 !important;
  }

  /* Experience Description - FIXED LIST STYLES */
  .t7-resume .experience-description ul,
  .t7-resume .experience-description ol {
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .experience-description ul {
    list-style-type: disc !important;
  }

  .t7-resume .experience-description ol {
    list-style-type: decimal !important;
  }

  .t7-resume .experience-description li {
    margin-bottom: 4px !important;
    line-height: 1.5 !important;
  }

  /* Education Description - FIXED LIST STYLES */
  .t7-resume .education-description ul,
  .t7-resume .education-description ol {
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .education-description ul {
    list-style-type: disc !important;
  }

  .t7-resume .education-description ol {
    list-style-type: decimal !important;
  }

  .t7-resume .education-description li {
    margin-bottom: 4px !important;
    line-height: 1.5 !important;
  }

  /* Project Description - FIXED LIST STYLES */
  .t7-resume .project-description ul,
  .t7-resume .project-description ol {
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume .project-description ul {
    list-style-type: disc !important;
  }

  .t7-resume .project-description ol {
    list-style-type: decimal !important;
  }

  .t7-resume .project-description li {
    margin-bottom: 4px !important;
    line-height: 1.5 !important;
  }

  /* Resume Lists - General */
  .t7-resume .resume-list {
    margin: 8px 0 8px 25px !important;
    padding-left: 0 !important;
  }

  .t7-resume ol.resume-list {
    list-style-type: decimal !important;
  }

  .t7-resume ul.resume-list {
    list-style-type: disc !important;
  }

  .t7-resume .resume-list li {
    margin-bottom: 4px !important;
    line-height: 1.5 !important;
  }

  /* Preserve spaces in content */
  .t7-resume .experience-description p,
  .t7-resume .education-description p,
  .t7-resume .project-description p,
  .t7-resume .summary-text p,
  .t7-resume .custom-section-content p,
  .t7-resume .skills-content p {
    white-space: pre-wrap !important;
  }

  /* Print Styles */
  @media print {
    @page {
      size: A4;
    
    }

    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      margin: 0;
      padding: 0;
      background: white;
    }

    .t7-resume {
      margin: 0;
      width: 100%;
          padding: 15mm;  /* Keep the padding here instead of @page */

      border: none;
      box-shadow: none;
      background: white;
    }

    .t7-resume .resume-header {
      margin-top: 0;
      padding-top: 0;
    }

    .t7-resume .section {
      page-break-inside: avoid;
    }

    .t7-resume .experience-item {
      page-break-inside: avoid;
    }

    .t7-resume .project-link,
    .t7-resume .link-item {
      color: #000000 !important;
      text-decoration: underline !important;
    }
  }
`;

  /* ======================================================
     HTML GENERATION — for PDF download
  ====================================================== */
  const generateHTML = () => {
    const formattedDob = formatDateOfBirth(dateOfBirth ? dateOfBirth : "");

    // Generate skills HTML for PDF
    const generateSkillsHTML = () => {
      if (!skills || (typeof skills === "string" && !skills.trim())) return "";

      const cleanedSkills = cleanQuillHTML(skills);
      if (
        !cleanedSkills ||
        cleanedSkills === "<p><br></p>" ||
        cleanedSkills === ""
      )
        return "";

      return `
        <div class="section">
          <h2 class="section-title">Skills</h2>
          <div class="skills-content">${cleanedSkills}</div>
        </div>
      `;
    };

    // Generate projects HTML for PDF
    const generateProjectsHTML = () => {
      if (!projects || projects.length === 0) return "";

      return `
        <div class="section">
          <h2 class="section-title">Projects</h2>
          ${projects
            .map(
              (project: any) => `
            <div class="project-item">
              <div class="project-header">
                <div class="project-title">${project.title || ""}</div>
                ${
                  project.liveUrl || project.githubUrl
                    ? `
                  <div class="project-links">
                    ${project.liveUrl ? `<a href="${project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`}" class="project-link">Live Demo</a>` : ""}
                    ${project.githubUrl ? `<a href="${project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`}" class="project-link">GitHub</a>` : ""}
                  </div>
                `
                    : ""
                }
              </div>
              ${
                project.techStack && project.techStack.length > 0
                  ? `
                <div class="project-tech-stack"><strong>Tech:</strong> ${project.techStack.join(", ")}</div>
              `
                  : ""
              }
              ${
                project.description
                  ? `
                <div class="project-description">${cleanQuillHTML(project.description)}</div>
              `
                  : ""
              }
            </div>
          `,
            )
            .join("")}
        </div>
      `;
    };

    // Generate custom sections HTML for PDF
    const generateCustomSectionsHTML = () => {
      if (
        !finalize ||
        Array.isArray(finalize) ||
        !Array.isArray(finalize.customSection) ||
        !finalize.customSection.some(
          (s: any) => s?.name?.trim() || s?.description?.trim(),
        )
      ) {
        return "";
      }

      return `
        <div class="section">
          ${finalize.customSection
            .filter((s: any) => s?.name?.trim() || s?.description?.trim())
            .map(
              (s: any) => `
            <div class="custom-section">
              ${s.name ? `<h2 class="custom-section-title">${s.name}</h2>` : ""}
              ${s.description ? `<div class="custom-section-content">${cleanQuillHTML(s.description)}</div>` : ""}
            </div>
          `,
            )
            .join("")}
        </div>
      `;
    };

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
  <style>${styles}</style>
</head>
<body>
<div class="t7-resume">

  <!-- HEADER -->
  <div class="resume-header">
    <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
    <div class="job-title">${contact?.jobTitle || ""}</div>
    <div class="contact-row">
      ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
      ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
      ${formattedDob ? `<div class="contact-item">${formattedDob}</div>` : ""}
    </div>
    ${addressParts.length ? `<div class="address">${addressParts.join(" , ")}</div>` : ""}
    <div class="links">
      ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
      ${githubUrl ? `<a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}" class="link-item">GitHub</a>` : ""}
      ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
    </div>
  </div>

  <!-- SUMMARY -->
  ${
    summary
      ? `
  <div class="section">
    <h2 class="section-title">Professional Summary</h2>
    <div class="summary-text">${cleanQuillHTML(summary)}</div>
  </div>
  `
      : ""
  }

  <!-- EXPERIENCE -->
  ${
    experiences.length > 0
      ? `
  <div class="section">
    <h2 class="section-title">Experience</h2>
    ${experiences
      .map((exp) => {
        const startFormatted = formatMonthYear(exp.startDate, false);
        const endFormatted = exp.endDate
          ? formatMonthYear(exp.endDate, false)
          : "Present";
        return `
        <div class="experience-item">
          <div class="experience-header">
            <div>
              <div class="experience-title">${exp.jobTitle || ""}</div>
              <div class="experience-subtitle">${[exp.employer, exp.location].filter(Boolean).join(" — ")}</div>
            </div>
            <div class="experience-date">${startFormatted} — ${endFormatted}</div>
          </div>
          ${
            exp.text
              ? `<div class="experience-description">${cleanQuillHTML(exp.text)}</div>`
              : ""
          }
        </div>
      `;
      })
      .join("")}
  </div>
  `
      : ""
  }

  <!-- PROJECTS -->
  ${generateProjectsHTML()}

  <!-- EDUCATION -->
  ${
    educations.length > 0
      ? `
  <div class="section">
    <h2 class="section-title">Education</h2>
    ${educations
      .map((edu) => {
        const formattedGrade = formatGradeToCgpdAndPercentage(edu.grade || "");
        return `
        <div class="education-item">
          <div class="education-header">
            <div>
              <div class="education-school">${edu.schoolname || ""}</div>
              <div class="education-subtitle">${[edu.degree, edu.location].filter(Boolean).join(" — ")}</div>
              ${formattedGrade ? `<div class="education-grade">${formattedGrade}</div>` : ""}
            </div>
            <div class="education-date">${[edu.startDate, edu.endDate || "Present"].filter(Boolean).join(" — ")}</div>
          </div>
          ${edu.text ? `<div class="education-description">${cleanQuillHTML(edu.text)}</div>` : ""}
        </div>
      `;
      })
      .join("")}
  </div>
  `
      : ""
  }

  <!-- SKILLS -->
  ${generateSkillsHTML()}

  <!-- CUSTOM SECTIONS -->
  ${generateCustomSectionsHTML()}

</div>
</body>
</html>`;
  };

  /* ======================================================
     PDF DOWNLOAD
  ====================================================== */
  const handleDownload = async (): Promise<void> => {
    try {
      const html: string = generateHTML();

      const res: AxiosResponse<Blob> = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        { html },
        { responseType: "blob" },
      );

      const pdfBlob: Blob = res.data;

      const url: string = URL.createObjectURL(pdfBlob);
      const a: HTMLAnchorElement = document.createElement("a");

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


  return (
    <>
      <div className="text-center my-5">

            {lastSegment === "download-resume" && (

        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-emerald-500 text-2xl md:text-base hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg"
        >
          Download Resume
        </motion.button>
            )}
      </div>

      <div
        className={`t7-resume bg-white ${alldata ? "is-preview" : ""}`}
        style={{
          margin: "0 auto",
          boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
          minHeight: "297mm",
        }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');`}</style>
        <style>{styles}</style>

        {/* HEADER */}
        <div className="resume-header">
          <h1 className="name">
            {contact?.firstName} {contact?.lastName}
          </h1>
          <div className="job-title">{contact?.jobTitle}</div>
          <div className="contact-row">
            {contact?.email && (
              <div className="contact-item">{contact.email}</div>
            )}
            {contact?.phone && (
              <div className="contact-item">{contact.phone}</div>
            )}
            {dateOfBirth && (
              <div className="contact-item">
                {formatDateOfBirth(dateOfBirth)}
              </div>
            )}
          </div>
          {addressParts.length > 0 && (
            <div className="address">{addressParts.join(" , ")}</div>
          )}
          <div className="links">
            {linkedinUrl && (
              <a
                href={
                  linkedinUrl.startsWith("http")
                    ? linkedinUrl
                    : `https://${linkedinUrl}`
                }
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            )}
            {githubUrl && (
              <a
                href={
                  githubUrl.startsWith("http")
                    ? githubUrl
                    : `https://${githubUrl}`
                }
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            )}
            {portfolioUrl && (
              <a
                href={
                  portfolioUrl.startsWith("http")
                    ? portfolioUrl
                    : `https://${portfolioUrl}`
                }
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                Portfolio
              </a>
            )}
          </div>
        </div>

        {/* SUMMARY */}
        {summary && (
          <div className="section">
            <h2 className="section-title">Professional Summary</h2>
            <div
              className="summary-text"
              dangerouslySetInnerHTML={{
                __html: cleanQuillHTML(summary),
              }}
            />
          </div>
        )}

        {/* EXPERIENCE */}
        {experiences.length > 0 && (
          <div className="section">
            <h2 className="section-title">Experience</h2>
            {experiences.map((exp, i) => {
              const start = formatMonthYear(exp.startDate, false);
              const end = exp.endDate
                ? formatMonthYear(exp.endDate, false)
                : "Present";
              return (
                <div key={i} className="experience-item">
                  <div className="experience-header">
                    <div>
                      <div className="experience-title">
                        {exp.jobTitle || ""}
                      </div>
                      <div className="experience-subtitle">
                        {[exp.employer, exp.location]
                          .filter(Boolean)
                          .join(" — ")}
                      </div>
                    </div>
                    <div className="experience-date">
                      {start} — {end}
                    </div>
                  </div>
                  {exp.text && (
                    <div
                      className="experience-description"
                      dangerouslySetInnerHTML={{
                        __html: cleanQuillHTML(exp.text),
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* PROJECTS */}
        {renderProjects()}

        {/* EDUCATION */}
        {educations.length > 0 && (
          <div className="section">
            <h2 className="section-title">Education</h2>
            {educations.map((edu, i) => {
              const formattedGrade = formatGradeToCgpdAndPercentage(
                edu.grade || "",
              );
              return (
                <div key={i} className="education-item">
                  <div className="education-header">
                    <div>
                      <div className="education-school">
                        {edu.schoolname || ""}
                      </div>
                      <div className="education-subtitle">
                        {[edu.degree, edu.location].filter(Boolean).join(" — ")}
                      </div>
                      {formattedGrade && (
                        <div className="education-grade">{formattedGrade}</div>
                      )}
                    </div>
                    <div className="education-date">
                      {[edu.startDate, edu.endDate || "Present"]
                        .filter(Boolean)
                        .join(" — ")}
                    </div>
                  </div>
                  {edu.text && (
                    <div
                      className="education-description"
                      dangerouslySetInnerHTML={{
                        __html: cleanQuillHTML(edu.text),
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* SKILLS */}
        {renderSkills()}

        {/* CUSTOM SECTIONS */}
        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize.customSection) &&
          finalize.customSection.some(
            (s) => s?.name?.trim() || s?.description?.trim(),
          ) && (
            <div className="section">
              {finalize.customSection.map(
                (section, i) =>
                  (section?.name?.trim() || section?.description?.trim()) && (
                    <div key={i} className="custom-section">
                      {section.name && (
                        <h2 className="custom-section-title">{section.name}</h2>
                      )}
                      {section.description && (
                        <div
                          className="custom-section-content"
                          dangerouslySetInnerHTML={{
                            __html: cleanQuillHTML(section.description),
                          }}
                        />
                      )}
                    </div>
                  ),
              )}
            </div>
          )}
      </div>
    </>
  );
};

export default TemplateSeven;