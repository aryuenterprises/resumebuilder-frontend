"use client";
import React, { useContext, useState } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import MonthYearDisplay from "@/app/utils/MonthYearDisplay";
import {
  Contact,
  Education,
  Experience,
  Finalize,
  Skill,
} from "@/app/types/context.types";
import { usePathname } from "next/navigation";

interface AllData {
  contact?: Contact;
  educations?: Education[];
  experiences?: Experience[];
  skills?: Skill[];
  finalize?: Finalize;
  summary?: string;
}

interface Resume4Props {
  alldata?: AllData;
}

const TemplateOne: React.FC<Resume4Props> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const [isGenerating, setIsGenerating] = useState(false);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const contact = alldata?.contact || context.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills || context?.skills || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";

  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.country,
    contact?.postcode,
  ].filter(Boolean);

  const linkedinUrl = contact?.linkedin || contact?.linkedin;
  const portfolioUrl = contact?.portfolio || contact?.portfolio;

  /* ======================================================
     CSS — AUTO PAGE BREAK (NO MANUAL SPLIT)
  ====================================================== */
  const styles = `
  body {
    margin: 0;
    font-family: Helvetica, Arial, sans-serif;
    background-color: white;
  }

  .resume-container {
    width: 210mm;
    min-height: 297mm;
    padding: 15mm;
    box-sizing: border-box;
    background-color: white;
  }

  /* Header - Improved Alignment */
  .contact-info {
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }

  .contact-info .name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 4px;
    line-height: 1.2;
  }

  .contact-info .job-title {
    font-size: 16px;
    color: #333;
    margin-bottom: 8px;
    line-height: 1.3;
  }

  .contact-info .address {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
    line-height: 1.4;
  }

  .contact-details {
    font-size: 14px;
    color: #444;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .contact-details span {
    padding: 2px 8px;
  }

  .links {
    margin-top: 5px;
  }

  .link-item {
    color: #0077b5;
    text-decoration: none;
    font-size: 14px;
    padding: 2px 8px;
  }

  /* Sections - Improved Alignment */
  .section-content {
    margin-bottom: 20px;
    page-break-inside: avoid;
  }

  .section-title {
    background: #f0f0f0;
    padding: 6px 10px;
    text-align: left;
    font-weight: 700;
    margin: 15px 0 10px;
    font-size: 16px;
    border-left: 3px solid #333;
  }

  /* Item Headers - Improved Alignment */
  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 6px;
    flex-wrap: wrap;
    gap: 10px;
  }

  .experience-header,
  .education-header {
    align-items: baseline;
  }

  .item-title-container {
    min-width: 200px;
  }

  .item-title {
    font-weight: 700;
    font-size: 16px;
    line-height: 1.3;
    margin-bottom: 2px;
    text-align:left
  }

  .item-subtitle {
    font-size: 14px;
    color: #555;
    margin-top: 2px;
    line-height: 1.4;
  }

  .item-date {
    white-space: nowrap;
    font-size: 12px;
    color: #777;
    min-width: fit-content;
    text-align: right;
  }

  .experience-date,
  .education-date {
    font-size: 13px;
    color: #666;
    padding: 2px 6px;
    background: #f8f8f8;
    border-radius: 3px;
  }

  /* Content Areas - Improved Alignment */
  .item-content {
    font-size: 14px;
    line-height: 1.6;
    color: #444;
    text-align: left;
  }

  .summary-text {
    padding: 0 5px;
    line-height: 1.7;
  }

  .experience-description,
  .education-description {
    border-left: 2px solid #f0f0f0;
    margin-top: 5px;
  }

  /* Education List - Improved Alignment */
  .education-content {
    margin-top: 5px;
  }

  .education-list {
    margin: 5px 0;
    padding-left: 20px;
  }

  .education-list li {
    margin-bottom: 4px;
    line-height: 1.5;
  }

  /* Skills - Improved Alignment */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 10px;
  }

  .skill-item {
    margin-bottom: 12px;
  }

  .skill-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .skill-name {
    font-size: 14px;
    margin-bottom: 4px;
    font-weight: 500;
    text-align:left
  }

  .skill-bar {
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
    overflow: hidden;
    width: 100%;
  }

  .skill-level {
    height: 100%;
    background: #333;
    border-radius: 2px;
  }

  /* Languages Grid */
  .languages-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Additional Content - Improved Alignment */
  .additional-content {
    padding-left: 10px;
  }

  .additional-item {
    margin-bottom: 8px;
    line-height: 1.6;
  }

  .additional-item:last-child {
    margin-bottom: 0;
  }

  /* Custom Sections - Improved Alignment */
  .custom-section {
    margin-bottom: 20px;
  }

  .custom-section-title {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .custom-section-content {
    padding-left: 10px;
  }

  /* Print Styles - Improved */
  @media print {
    @page {
      size: A4;
      margin: 15mm;
    }

    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .resume-container {
      width: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
      box-shadow: none !important;
    }

    .no-print {
      display: none !important;
    }

    /* Prevent page breaks inside important sections */
    .resume-section {
      page-break-inside: avoid;
    }

    .experience-item,
    .education-item {
      page-break-inside: avoid;
    }

    /* Ensure dates don't wrap in print */
    .item-date {
      white-space: nowrap;
    }
  }

  /* Responsive improvements */
  @media (max-width: 768px) {
    .resume-container {
      width: 100%;
      padding: 10mm;
    }

    .skills-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .item-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .item-date {
      text-align: left;
      margin-top: 2px;
    }

    .contact-details {
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
  }
`;

  /* ======================================================
   GENERATE SINGLE HTML (browser handles pages)
====================================================== */
  const generateHTML = () => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
      <style>${styles}</style>
    </head>

    <body>
      <div class="resume-container">

        <!-- HEADER -->
        <div class="contact-info">
          <h2 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h2>
          <div class="job-title">${contact?.jobTitle || ""}</div>
          <div class="address">${addressParts.join(", ")}</div>
          <div class="contact-details">
            ${contact?.email ? `<span>${contact.email}</span>` : ""}
            ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
          </div>
          <div class="links">
            ${linkedinUrl ? `<a href="${linkedinUrl}" class="link-item">LinkedIn</a>` : ""}
            ${portfolioUrl ? `<a href="${portfolioUrl}" class="link-item">Portfolio</a>` : ""}
          </div>
        </div>

        <!-- SUMMARY -->
        ${
          summary
            ? `<div class="section-content">
                 <div class="section-title">Summary</div>
                 <div class="item-content">${summary.replace(/\n/g, "<br>")}</div>
               </div>`
            : ""
        }

        <!-- EXPERIENCE -->
        ${
          experiences.length > 0
            ? `<div class="section-content">
                 <div class="section-title">Experience</div>
                 ${experiences
                   .map(
                     (e) => `
                       <div class="experience-item" style="margin-bottom:16px">
                         <div class="item-header">
                           <div class="item-title-container">
                             <div class="item-title">${e.jobTitle || ""}</div>
                             <div class="item-subtitle">
                               ${e.employer || ""} ${e.location ? `— ${e.location}` : ""}
                             </div>
                           </div>
                           <div class="item-date">
                             ${e.startDate || ""} ${e.endDate ? `- ${e.endDate}` : "- Present"}
                           </div>
                         </div>
                         <div class="item-content">${e.text?.replace(/\n/g, "<br>") || ""}</div>
                       </div>
                     `,
                   )
                   .join("")}
               </div>`
            : ""
        }

        <!-- EDUCATION -->
        ${
          educations.length > 0
            ? `<div class="section-content">
                 <div class="section-title">Education</div>
                 ${educations
                   .map(
                     (e) => `
                       <div class="education-item" style="margin-bottom:16px">
                         <div class="item-header">
                           <div class="item-title-container">
                             <div class="item-title">${e.schoolname || ""}</div>
                             <div class="item-subtitle">
                               ${e.degree || ""} ${e.location ? `— ${e.location}` : ""}
                             </div>
                           </div>
                           <div class="item-date">
                             ${e.startDate || ""} ${e.endDate ? `- ${e.endDate}` : ""}
                           </div>
                         </div>
                         <div class="item-content">${e.text?.replace(/\n/g, "<br>") || ""}</div>
                       </div>
                     `,
                   )
                   .join("")}
               </div>`
            : ""
        }

        <!-- SKILLS -->
        ${
          skills.length > 0
            ? `<div class="section-content">
                 <div class="section-title">Skills</div>
                 <div class="skills-grid">
                   ${skills
                     .map(
                       (s) => `
                         <div class="skill-item">
                           <div class="skill-name">${s.skill || ""}</div>
                           <div class="skill-bar">
                             <div class="skill-level" style="width:${(Number(s.level || 0) / 5) * 100}%"></div>
                           </div>
                         </div>
                       `,
                     )
                     .join("")}
                 </div>
               </div>`
            : ""
        }

        <!-- LANGUAGES -->
        ${
          finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize.languages) &&
          finalize.languages.some(
            (lang) => lang.name && lang.name.trim() !== "",
          )
            ? `<div class="section-content">
                 <div class="section-title">Languages</div>
                 <div class="skills-grid languages-grid">
                   ${finalize.languages
                     .filter((lang) => lang.name && lang.name.trim() !== "")
                     .map(
                       (lang) => `
                         <div class="skill-item">
                           <div class="skill-name">${lang.name}</div>
                           ${
                             lang.level
                               ? `
                             <div class="skill-bar">
                               <div class="skill-level" style="width:${(Number(lang.level) / 5) * 100}%"></div>
                             </div>
                           `
                               : ""
                           }
                         </div>
                       `,
                     )
                     .join("")}
                 </div>
               </div>`
            : ""
        }

        <!-- CERTIFICATIONS AND LICENSES -->
        ${
          finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize.certificationsAndLicenses) &&
          finalize.certificationsAndLicenses.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          )
            ? `<div class="section-content">
                 <div class="section-title">Certifications and Licenses</div>
                 <div class="item-content additional-content">
                   ${finalize.certificationsAndLicenses
                     .filter(
                       (item) =>
                         item.name &&
                         item.name.replace(/<[^>]*>/g, "").trim() !== "",
                     )
                     .map(
                       (item) => `
                         <div class="additional-item">
                           ${item.name.replace(/<[^>]*>/g, "")}
                         </div>
                       `,
                     )
                     .join("")}
                 </div>
               </div>`
            : ""
        }

        <!-- HOBBIES AND INTERESTS -->
        ${
          finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize.hobbiesAndInterests) &&
          finalize.hobbiesAndInterests.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          )
            ? `<div class="section-content">
                 <div class="section-title">Hobbies and Interests</div>
                 <div class="item-content additional-content">
                   ${finalize.hobbiesAndInterests
                     .filter(
                       (item) =>
                         item.name &&
                         item.name.replace(/<[^>]*>/g, "").trim() !== "",
                     )
                     .map(
                       (item) => `
                         <div class="additional-item">
                           ${item.name.replace(/<[^>]*>/g, "")}
                         </div>
                       `,
                     )
                     .join("")}
                 </div>
               </div>`
            : ""
        }

        <!-- AWARDS AND HONORS -->
        ${
          finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize.awardsAndHonors) &&
          finalize.awardsAndHonors.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          )
            ? `<div class="section-content">
                 <div class="section-title">Awards and Honors</div>
                 <div class="item-content additional-content">
                   ${finalize.awardsAndHonors
                     .filter(
                       (item) =>
                         item.name &&
                         item.name.replace(/<[^>]*>/g, "").trim() !== "",
                     )
                     .map(
                       (item) => `
                         <div class="additional-item">
                           ${item.name.replace(/<[^>]*>/g, "")}
                         </div>
                       `,
                     )
                     .join("")}
                 </div>
               </div>`
            : ""
        }

        <!-- WEBSITES AND SOCIAL MEDIA -->
        ${
          finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize.websitesAndSocialMedia) &&
          finalize.websitesAndSocialMedia.some(
            (item) =>
              (item.websiteUrl && item.websiteUrl.trim() !== "") ||
              (item.socialMedia && item.socialMedia.trim() !== ""),
          )
            ? `<div class="section-content">
                 <div class="section-title">Websites and Social Media</div>
                 <div class="item-content additional-content">
                   ${finalize.websitesAndSocialMedia
                     .filter(
                       (item) =>
                         (item.websiteUrl && item.websiteUrl.trim() !== "") ||
                         (item.socialMedia && item.socialMedia.trim() !== ""),
                     )
                     .map(
                       (item) => `
                         <div class="additional-item">
                           ${item.websiteUrl ? `<div>Website: ${item.websiteUrl}</div>` : ""}
                           ${item.socialMedia ? `<div>Social Media: ${item.socialMedia}</div>` : ""}
                         </div>
                       `,
                     )
                     .join("")}
                 </div>
               </div>`
            : ""
        }

        <!-- REFERENCES -->
        ${
          finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize.references) &&
          finalize.references.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          )
            ? `<div class="section-content">
                 <div class="section-title">References</div>
                 <div class="item-content additional-content">
                   ${finalize.references
                     .filter(
                       (item) =>
                         item.name &&
                         item.name.replace(/<[^>]*>/g, "").trim() !== "",
                     )
                     .map(
                       (item) => `
                         <div class="additional-item">
                           ${item.name.replace(/<[^>]*>/g, "")}
                         </div>
                       `,
                     )
                     .join("")}
                 </div>
               </div>`
            : ""
        }

        <!-- CUSTOM SECTIONS -->
        ${
          finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize.customSection) &&
          finalize.customSection.some(
            (section) => section?.name?.trim() || section?.description?.trim(),
          )
            ? `<div class="section-content">
                 ${finalize.customSection
                   .filter(
                     (section) =>
                       section?.name?.trim() || section?.description?.trim(),
                   )
                   .map(
                     (section) => `
                       <div class="custom-section">
                         ${section.name ? `<div class="section-title custom-section-title">${section.name}</div>` : ""}
                         ${
                           section.description
                             ? `
                           <div class="item-content custom-section-content">
                             ${section.description.replace(/<[^>]*>/g, "")}
                           </div>
                         `
                             : ""
                         }
                       </div>
                     `,
                   )
                   .join("")}
               </div>`
            : ""
        }

      </div>
    </body>
    </html>
  `;
  };
  /* ======================================================
     DOWNLOAD PDF
  ====================================================== */
  const handleDownload = async () => {
    setIsGenerating(true);

    try {
      const html = generateHTML();

      const res = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        { html },
        { responseType: "blob" },
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
    } finally {
      setIsGenerating(false);
    }
  };


  return (
    <div style={{ textAlign: "center", marginTop: 0 }}>
      {lastSegment === "download-resume" && (
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          style={{
            padding: "10px 20px",
            backgroundColor: isGenerating ? "#ccc" : "#0077b5",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isGenerating ? "not-allowed" : "pointer",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        >
          {isGenerating ? "Generating..." : "Download Resume"}
        </button>
      )}

      {/* Resume Preview - Single page view for UI */}
      <div
        className="resume-container bg-white"
        style={{ margin: "0 auto", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
      >
        <style>{styles}</style>

        {/* HEADER - Alignment improvements */}
        <div className="contact-info">
          <div className="name">
            {contact?.firstName} {contact?.lastName}
          </div>
          <div className="job-title">
            {contact?.jobTitle
              ? typeof contact.jobTitle === "string"
                ? contact.jobTitle
                : (contact.jobTitle as any)?.name || ""
              : ""}
          </div>
          <div className="address">{addressParts.join(", ")}</div>

          <div className="contact-details">
            {contact?.email && <span>{contact.email}</span>}
            {contact?.phone && <span>{contact.phone}</span>}
          </div>

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
          <div className="section-content resume-section">
            <div className="section-title">Summary</div>
            <div
              className="item-content summary-text"
              dangerouslySetInnerHTML={{
                __html: summary.replace(/\n/g, "<br>"),
              }}
            />
          </div>
        )}

        {/* EXPERIENCE - IMPROVED ALIGNMENT */}
        {experiences.length > 0 && (
          <div className="section-content resume-section">
            <div className="section-title">Experience</div>
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="experience-item"
                style={{ marginBottom: "16px" }}
              >
                <div className="item-header experience-header">
                  <div className="item-title-container">
                    <div className="item-title">{exp.jobTitle}</div>
                    <div className="item-subtitle">
                      {exp.employer} {exp.location && `— ${exp.location}`}
                    </div>
                  </div>
                  <div className="item-date experience-date">
                    <MonthYearDisplay value={exp.startDate} shortYear />
                    {" - "}
                    {exp.endDate ? (
                      <MonthYearDisplay value={exp.endDate} shortYear />
                    ) : (
                      "Present"
                    )}
                  </div>
                </div>
                {exp?.text && (
                  <div
                    className="item-content experience-description"
                    dangerouslySetInnerHTML={{
                      __html: exp?.text.replace(/\n/g, "<br>"),
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* EDUCATION - IMPROVED ALIGNMENT */}
        {educations?.length > 0 && (
          <div className="section-content resume-section">
            <div className="section-title">Education</div>
            {educations.map((edu, index) => {
              let textContent = null;
              if (edu.text) {
                const lines = edu.text
                  .split("\n")
                  .filter((line) => line.trim() !== "");
                if (lines.some((line) => line.trim().startsWith("-"))) {
                  textContent = (
                    <div className="education-content">
                      <ul className="education-list">
                        {lines.map((line, i) => {
                          const trimmed = line.trim();
                          if (trimmed.startsWith("-")) {
                            return (
                              <li key={i}>{trimmed.substring(1).trim()}</li>
                            );
                          } else if (trimmed) {
                            return <li key={i}>{trimmed}</li>;
                          }
                          return null;
                        })}
                      </ul>
                    </div>
                  );
                } else {
                  textContent = (
                    <div
                      className="item-content education-description"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {edu.text}
                    </div>
                  );
                }
              }

              return (
                <div
                  key={edu.id || edu.id || index}
                  className="education-item"
                  style={{ marginBottom: "16px" }}
                >
                  <div className="item-header education-header">
                    <div className="item-title-container">
                      <div className="item-title">{edu.schoolname || ""}</div>
                      {(edu.degree || edu.location) && (
                        <div className="item-subtitle">
                          {edu.degree && <span>{edu.degree}</span>}
                          {edu.location && (
                            <>
                              {edu.degree && " — "}
                              <span>{edu.location}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    {(edu.startDate || edu.endDate) && (
                      <div className="item-date education-date">
                        {edu.startDate || ""}
                        {edu.startDate && edu.endDate && " - "}
                        {edu.endDate || ""}
                      </div>
                    )}
                  </div>
                  {textContent}
                </div>
              );
            })}
          </div>
        )}

        {/* SKILLS - IMPROVED ALIGNMENT */}
        {skills.length > 0 && (
          <div className="section-content resume-section">
            <div className="section-title">Skills</div>
            <div className="skills-grid">
              {skills.map((skill, i) => (
                <div key={i} className="skill-item">
                  <div className="skill-info">
                    <div className="skill-name">{skill.skill}</div>
                    <div className="skill-bar">
                      <div
                        className="skill-level"
                        style={{
                          width: `${(Number(skill.level) / 4) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize.languages) &&
          finalize.languages.some(
            (lang) => lang.name && lang.name.trim() !== "",
          ) && (
            <div className="section-content resume-section">
              <div className="section-title">Languages</div>
              <div className="skills-grid languages-grid">
                {finalize.languages.map(
                  (lang, index) =>
                    lang.name &&
                    lang.name.trim() !== "" && (
                      <div key={lang._id || index} className="skill-item">
                        <div className="skill-name">{lang.name}</div>
                        {lang.level && (
                          <div className="skill-bar">
                            <div
                              className="skill-level"
                              style={{
                                width: `${(Number(lang.level) / 4) * 100}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

        {/* Additional Sections */}
        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize?.certificationsAndLicenses) &&
          finalize.certificationsAndLicenses.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <div className="section-content resume-section">
              <div className="section-title">Certifications and Licenses</div>
              <div className="item-content additional-content">
                {finalize.certificationsAndLicenses.map(
                  (item, index) =>
                    item.name &&
                    item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                      <div
                        key={item.id || index}
                        className="additional-item"
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
                    ),
                )}
              </div>
            </div>
          )}

        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize?.hobbiesAndInterests) &&
          finalize.hobbiesAndInterests.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <div className="section-content resume-section">
              <div className="section-title">Hobbies and Interests</div>
              <div className="item-content additional-content">
                {finalize.hobbiesAndInterests.map(
                  (item, index) =>
                    item.name &&
                    item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                      <div
                        key={item.id || index}
                        className="additional-item"
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
                    ),
                )}
              </div>
            </div>
          )}

        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize?.awardsAndHonors) &&
          finalize.awardsAndHonors.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <div className="section-content resume-section">
              <div className="section-title">Awards and Honors</div>
              <div className="item-content additional-content">
                {finalize.awardsAndHonors.map(
                  (item, index) =>
                    item.name &&
                    item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                      <div
                        key={item.id || index}
                        className="additional-item"
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
                    ),
                )}
              </div>
            </div>
          )}

        {/* Websites and Social Media */}
        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize?.websitesAndSocialMedia) &&
          finalize.websitesAndSocialMedia.some(
            (item) =>
              (item.websiteUrl && item.websiteUrl.trim() !== "") ||
              (item.socialMedia && item.socialMedia.trim() !== ""),
          ) && (
            <div className="section-content resume-section">
              <div className="section-title">Websites and Social Media</div>
              <div className="item-content additional-content">
                {finalize.websitesAndSocialMedia.map(
                  (item, index) =>
                    (item.websiteUrl || item.socialMedia) && (
                      <div key={item.id || index} className="additional-item">
                        {item.websiteUrl && (
                          <div>Website: {item.websiteUrl}</div>
                        )}
                        {item.socialMedia && (
                          <div>Social Media: {item.socialMedia}</div>
                        )}
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

        {/* References */}
        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize?.references) &&
          finalize.references.some(
            (item) =>
              item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <div className="section-content resume-section">
              <div className="section-title">References</div>
              <div className="item-content additional-content">
                {finalize.references.map(
                  (item, index) =>
                    item.name &&
                    item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                      <div
                        key={item.id || index}
                        className="additional-item"
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
                    ),
                )}
              </div>
            </div>
          )}

        {/* Custom Sections */}
        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize?.customSection) &&
          finalize.customSection.some(
            (section) => section?.name?.trim() || section?.description?.trim(),
          ) && (
            <div className="section-content resume-section">
              {finalize.customSection
                .filter(
                  (section) =>
                    section?.name?.trim() || section?.description?.trim(),
                )
                .map((section, index) => (
                  <div key={section.id || index} className="custom-section">
                    {section.name && (
                      <div className="section-title custom-section-title">
                        {section.name}
                      </div>
                    )}
                    {section.description && (
                      <div
                        className="item-content custom-section-content"
                        dangerouslySetInnerHTML={{
                          __html: section.description,
                        }}
                      />
                    )}
                  </div>
                ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default TemplateOne;
