

// ─── Minimalist Modern Single Column Resume Template ───────────
"use client";
import React, { useContext } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
import { usePathname } from "next/navigation";

const TemplateEleven: React.FC = () => {
  const context = useContext(CreateContext);

  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const contact = context.contact || {};
  const educations = context?.education || [];
  const experiences = context?.experiences || [];
  const skills = context?.skills || [];
  const finalize = context?.finalize || {};
  const summary = context?.summary || "";

  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.postcode,
    contact?.country,
  ].filter(Boolean);

  const linkedinUrl = contact?.linkedin;
  const portfolioUrl = contact?.portfolio;

  /* ======================================================
     CSS — MINIMALIST MODERN BLACK & WHITE - CONSISTENT PADDING
  ====================================================== */
  const styles = `
   

    body {
      font-family: 'Lato', 'Helvetica Neue', 'Segoe UI', sans-serif;
      background-color: #ffffff;
      line-height: 1.5;
      color: #2c3e50;
    }

    .resume-container {
      max-width: 780px;
      margin: 35px auto;
      background: white;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }

    /* Header Section - Consistent Padding */
    .resume-header {
      padding: 45px 45px 30px 45px;
      text-align: left;
    }

    .name {
      font-size: 42px;
      font-weight: 300;
      letter-spacing: 1px;
      margin-bottom: 12px;
      color: #1a2a3a;
      text-transform: uppercase;
    }

    .job-title {
      font-size: 15px;
      font-weight: 400;
      color: #6c7a89;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    .divider {
      width: 50px;
      height: 2px;
      background: #2c3e50;
      margin: 18px 0;
    }

    .contact-row {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      font-size: 12px;
      color: #6c7a89;
      margin-top: 15px;
    }

    .contact-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .address {
      font-size: 12px;
      color: #6c7a89;
      margin-top: 10px;
    }

    .links {
      margin-top: 12px;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }

    .link-item {
      color: #2c3e50;
      text-decoration: none;
      font-size: 12px;
      border-bottom: 1px solid transparent;
      transition: border-color 0.2s;
    }

    .link-item:hover {
      border-bottom-color: #2c3e50;
    }

    /* Main Content - Consistent Padding */
    .resume-main {
      padding: 20px 45px 50px 45px;
      text-align: left;
    }

    /* Section Styles */
    .section {
      margin-bottom: 32px;
      text-align: left;
    }

    .section:last-child {
      margin-bottom: 0;
    }

    .section-title {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #2c3e50;
      margin-bottom: 18px;
      padding-bottom: 6px;
      border-bottom: 1px solid #e8ecef;
      text-align: left;
    }

    /* Summary */
    .summary-text {
      font-size: 13px;
      line-height: 1.6;
      color: #4a5b6e;
      text-align: left;
    }

    /* Experience Items */
    .experience-item {
      margin-bottom: 28px;
      text-align: left;
    }

    .experience-item:last-child {
      margin-bottom: 0;
    }

    .experience-header {
      margin-bottom: 10px;
      text-align: left;
    }

    .experience-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 4px;
      text-align: left;
    }

    .experience-title {
      font-size: 16px;
      font-weight: 600;
      color: #1a2a3a;
      text-align: left;
    }

    .experience-date {
      font-size: 11px;
      color: #8e9aab;
      font-weight: 400;
      letter-spacing: 0.3px;
      text-align: right;
    }

    .experience-company {
      font-size: 13px;
      font-weight: 400;
      color: #6c7a89;
      margin-top: 2px;
      text-align: left;
    }

    .experience-location {
      font-size: 11px;
      color: #9aa9b9;
      margin-top: 3px;
      text-align: left;
    }

    .experience-description {
      margin-top: 12px;
      text-align: left;
    }

    /* Bullet points */
    .experience-description ul,
    .education-description ul {
      list-style-type: none;
      padding-left: 0;
      text-align: left;
    }

    .experience-description li,
    .education-description li {
      position: relative;
      padding-left: 20px;
      margin-bottom: 8px;
      font-size: 13px;
      color: #4a5b6e;
      line-height: 1.55;
      text-align: left;
    }

    .experience-description li::before,
    .education-description li::before {
      content: "—";
      position: absolute;
      left: 2px;
      color: #2c3e50;
    }

    /* Education Items */
    .education-item {
      margin-bottom: 24px;
      text-align: left;
    }

    .education-item:last-child {
      margin-bottom: 0;
    }

    .education-header {
      margin-bottom: 8px;
      text-align: left;
    }

    .education-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 4px;
      text-align: left;
    }

    .education-school {
      font-size: 16px;
      font-weight: 600;
      color: #1a2a3a;
      text-align: left;
    }

    .education-date {
      font-size: 11px;
      color: #8e9aab;
      text-align: right;
    }

    .education-degree {
      font-size: 13px;
      color: #6c7a89;
      margin-top: 4px;
      text-align: left;
    }

    .education-description {
      margin-top: 10px;
      text-align: left;
    }

    /* Skills */
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 20px;
      margin-top: 5px;
      text-align: left;
    }

    .skill-item {
      font-size: 13px;
      color: #4a5b6e;
      position: relative;
      padding-left: 18px;
      text-align: left;
    }

    .skill-item::before {
      content: "▹";
      position: absolute;
      left: 2px;
      color: #2c3e50;
      font-size: 11px;
    }

    /* Additional content */
    .additional-container {
      margin-top: 5px;
      text-align: left;
    }

    .additional-item {
      font-size: 13px;
      color: #4a5b6e;
      margin-bottom: 8px;
      position: relative;
      padding-left: 18px;
      text-align: left;
    }

    .additional-item::before {
      content: "▹";
      position: absolute;
      left: 2px;
      color: #2c3e50;
      font-size: 11px;
    }

    /* Custom Sections */
    .custom-section {
      margin-bottom: 20px;
      text-align: left;
    }

    .custom-section:last-child {
      margin-bottom: 0;
    }

    .custom-section-title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #2c3e50;
      margin-bottom: 8px;
      text-align: left;
    }

    .custom-section-content {
      font-size: 13px;
      color: #4a5b6e;
      line-height: 1.55;
      padding-left: 18px;
      text-align: left;
    }

    /* Print Styles - EXACT SAME PADDING AS SCREEN */
    @media print {
      @page {
        size: A4;
        margin: 0;
      }

      body {
        background: white;
        margin: 0;
        padding: 0;
      }

      .resume-container {
        margin: 0;
        max-width: 100%;
        box-shadow: none;
        padding: 0;
      }

      /* KEEP EXACT SAME PADDING AS SCREEN */
      .resume-header {
        padding: 45px 45px 30px 45px !important;
      }

      .resume-main {
        padding: 20px 45px 50px 45px !important;
      }

      .section {
        page-break-inside: avoid;
      }

      .experience-item {
        page-break-inside: avoid;
      }

      .divider {
        background: #2c3e50;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }

    /* Responsive - ADJUST PADDING FOR MOBILE BUT KEEP CONSISTENT */
    @media (max-width: 600px) {
      .resume-container {
        margin: 15px;
      }

      .resume-header {
        padding: 30px 25px 20px 25px !important;
      }

      .resume-main {
        padding: 15px 25px 35px 25px !important;
      }

      .name {
        font-size: 32px;
      }

      .job-title {
        font-size: 13px;
      }

      .contact-row {
        flex-direction: column;
        gap: 6px;
      }

      .experience-title-row {
        flex-direction: column;
        gap: 4px;
      }

      .experience-date {
        text-align: left;
      }

      .education-title-row {
        flex-direction: column;
        gap: 4px;
      }

      .education-date {
        text-align: left;
      }
    }
  `;

  const stripHtml = (html: string) => {
    return html?.replace(/<\/?[^>]+(>|$)/g, "") || "";
  };

  const renderDescription = (text: string) => {
    if (!text) return "";

    if (text.includes("<") && text.includes(">")) {
      return `<div class="experience-description">${text}</div>`;
    }

    const lines = text.split("\n").filter((line) => line.trim() !== "");
    if (lines.some((line) => line.trim().startsWith("-") || line.trim().startsWith("•"))) {
      return `
        <div class="experience-description">
          <ul>
            ${lines
              .map((line) => {
                const trimmed = line.trim();
                if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
                  return `<li>${trimmed.substring(1).trim()}</li>`;
                } else if (trimmed) {
                  return `<li>${trimmed}</li>`;
                }
                return "";
              })
              .join("")}
          </ul>
        </div>`;
    } else {
      return `<div class="experience-description" style="white-space: pre-wrap; text-align: left;">${stripHtml(text)}</div>`;
    }
  };

  const generateHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8"/>
        <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&display=swap" rel="stylesheet">
        <style>${styles}</style>
      </head>
      <body>
        <div class="resume-container">
          <!-- HEADER -->
          <div class="resume-header">
            <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
            <div class="job-title">${
              contact?.jobTitle
                ? typeof contact.jobTitle === "string"
                  ? contact.jobTitle
                  : (contact.jobTitle as any)?.name || ""
                : ""
            }</div>
            <div class="divider"></div>
            <div class="contact-row">
              ${contact?.email ? `<div class="contact-item">${contact.email}</div>` : ""}
              ${contact?.phone ? `<div class="contact-item">${contact.phone}</div>` : ""}
            </div>
            ${addressParts.length ? `<div class="address">${addressParts.join(" | ")}</div>` : ""}
            <div class="links">
              ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">LinkedIn</a>` : ""}
              ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">Portfolio</a>` : ""}
            </div>
          </div>

          <!-- MAIN CONTENT -->
          <div class="resume-main">
            <!-- SUMMARY -->
            ${summary ? `
              <div class="section">
                <h2 class="section-title">About</h2>
                <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
              </div>
            ` : ""}

            <!-- EXPERIENCE -->
            ${experiences.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Experience</h2>
                ${experiences.map((exp) => {
                  const startFormatted = formatMonthYear(exp.startDate, true);
                  const endFormatted = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
                  return `
                    <div class="experience-item">
                      <div class="experience-header">
                        <div class="experience-title-row">
                          <span class="experience-title">${exp.jobTitle || ""}</span>
                          <span class="experience-date">${startFormatted} — ${endFormatted}</span>
                        </div>
                        <div class="experience-company">${exp.employer || ""}</div>
                        ${exp.location ? `<div class="experience-location">${exp.location}</div>` : ""}
                      </div>
                      ${exp.text ? renderDescription(exp.text) : ""}
                    </div>
                  `;
                }).join("")}
              </div>
            ` : ""}

            <!-- EDUCATION -->
            ${educations.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Education</h2>
                ${educations.map((edu) => {
                  const dateStr = edu.startDate || edu.endDate
                    ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " — " : ""}${edu.endDate || ""}`
                    : "";
                  return `
                    <div class="education-item">
                      <div class="education-header">
                        <div class="education-title-row">
                          <span class="education-school">${edu.schoolname || ""}</span>
                          ${dateStr ? `<span class="education-date">${dateStr}</span>` : ""}
                        </div>
                        ${edu.degree ? `<div class="education-degree">${edu.degree}</div>` : ""}
                      </div>
                      ${edu.text ? `<div class="education-description">${renderDescription(edu.text)}</div>` : ""}
                    </div>
                  `;
                }).join("")}
              </div>
            ` : ""}

            <!-- SKILLS -->
            ${skills.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Skills</h2>
                <div class="skills-container">
                  ${skills.map((s) => `
                    <div class="skill-item">${s.skill || ""}</div>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <!-- LANGUAGES -->
            ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) && finalize.languages.some(l => l.name?.trim()) ? `
              <div class="section">
                <h2 class="section-title">Languages</h2>
                <div class="skills-container">
                  ${finalize.languages.filter(l => l.name?.trim()).map(l => `
                    <div class="skill-item">${l.name}${l.level ? ` — ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</div>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <!-- CERTIFICATIONS -->
            ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) && finalize.certificationsAndLicenses.some(c => c.name?.replace(/<[^>]*>/g, "").trim()) ? `
              <div class="section">
                <h2 class="section-title">Certifications</h2>
                <div class="additional-container">
                  ${finalize.certificationsAndLicenses.filter(c => c.name?.replace(/<[^>]*>/g, "").trim()).map(c => `
                    <div class="additional-item">${c.name.replace(/<[^>]*>/g, "")}</div>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <!-- AWARDS -->
            ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) && finalize.awardsAndHonors.some(a => a.name?.replace(/<[^>]*>/g, "").trim()) ? `
              <div class="section">
                <h2 class="section-title">Awards</h2>
                <div class="additional-container">
                  ${finalize.awardsAndHonors.filter(a => a.name?.replace(/<[^>]*>/g, "").trim()).map(a => `
                    <div class="additional-item">${a.name.replace(/<[^>]*>/g, "")}</div>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <!-- INTERESTS -->
            ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) && finalize.hobbiesAndInterests.some(h => h.name?.replace(/<[^>]*>/g, "").trim()) ? `
              <div class="section">
                <h2 class="section-title">Interests</h2>
                <div class="additional-container">
                  ${finalize.hobbiesAndInterests.filter(h => h.name?.replace(/<[^>]*>/g, "").trim()).map(h => `
                    <div class="additional-item">${h.name.replace(/<[^>]*>/g, "")}</div>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <!-- CUSTOM SECTIONS -->
            ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some(s => s?.name?.trim() || s?.description?.trim()) ? `
              <div class="section">
                ${finalize.customSection.filter(s => s?.name?.trim() || s?.description?.trim()).map(s => `
                  <div class="custom-section">
                    ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
                    ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
                  </div>
                `).join("")}
              </div>
            ` : ""}
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const handleDownload = async () => {
    try {
      const html = generateHTML();
      const res = await axios.post(
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

  return (
    <div style={{ textAlign: "left", marginTop: 0 }}>
      {lastSegment === "download-resume" && (
        <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
          <button
            onClick={handleDownload}
            style={{
              backgroundColor: "#2c3e50",
              color: "#ffffff",
              padding: "12px 28px",
              fontSize: "13px",
              fontWeight: "500",
              border: "none",
              borderRadius: "2px",
              cursor: "pointer",
              fontFamily: "inherit",
              letterSpacing: "0.8px",
              textTransform: "uppercase"
            }}
          >
            Download Resume
          </button>
        </div>
      )}

      {/* Resume Preview - EXACT SAME PADDING AS DOWNLOAD */}
      <div className="resume-container" style={{ margin: "0 auto" }}>
        <style>{styles}</style>

        {/* HEADER */}
        <div className="resume-header">
          <h1 className="name">
            {contact?.firstName} {contact?.lastName}
          </h1>
          <div className="job-title">
            {contact?.jobTitle
              ? typeof contact.jobTitle === "string"
                ? contact.jobTitle
                : (contact.jobTitle as any)?.name || ""
              : ""}
          </div>
          <div className="divider"></div>
          <div className="contact-row">
            {contact?.email && <div className="contact-item">{contact.email}</div>}
            {contact?.phone && <div className="contact-item">{contact.phone}</div>}
          </div>
          {addressParts.length > 0 && (
            <div className="address">{addressParts.join(" | ")}</div>
          )}
          <div className="links">
            {linkedinUrl && (
              <a
                href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            )}
            {portfolioUrl && (
              <a
                href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                Portfolio
              </a>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="resume-main">
          {/* SUMMARY */}
          {summary && (
            <div className="section">
              <h2 className="section-title">About</h2>
              <div
                className="summary-text"
                dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
              />
            </div>
          )}

          {/* EXPERIENCE */}
          {experiences.length > 0 && (
            <div className="section">
              <h2 className="section-title">Experience</h2>
              {experiences.map((exp, i) => (
                <div key={i} className="experience-item">
                  <div className="experience-header">
                    <div className="experience-title-row">
                      <span className="experience-title">{exp.jobTitle}</span>
                      <span className="experience-date">
                        <MonthYearDisplay value={exp.startDate} shortYear /> —{" "}
                        {exp.endDate ? (
                          <MonthYearDisplay value={exp.endDate} shortYear />
                        ) : (
                          "Present"
                        )}
                      </span>
                    </div>
                    <div className="experience-company">{exp.employer}</div>
                    {exp.location && <div className="experience-location">{exp.location}</div>}
                  </div>
                  {exp.text && (
                    <div
                      className="experience-description"
                      dangerouslySetInnerHTML={{ __html: exp.text }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* EDUCATION */}
          {educations.length > 0 && (
            <div className="section">
              <h2 className="section-title">Education</h2>
              {educations.map((edu, i) => (
                <div key={i} className="education-item">
                  <div className="education-header">
                    <div className="education-title-row">
                      <span className="education-school">{edu.schoolname}</span>
                      {(edu.startDate || edu.endDate) && (
                        <span className="education-date">
                          {edu.startDate || ""}
                          {edu.startDate && edu.endDate && " — "}
                          {edu.endDate || ""}
                        </span>
                      )}
                    </div>
                    {edu.degree && <div className="education-degree">{edu.degree}</div>}
                  </div>
                  {edu.text && (
                    <div
                      className="education-description"
                      dangerouslySetInnerHTML={{ __html: edu.text }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* SKILLS */}
          {skills.length > 0 && (
            <div className="section">
              <h2 className="section-title">Skills</h2>
              <div className="skills-container">
                {skills.map((skill, i) => (
                  <div key={i} className="skill-item">
                    {skill.skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LANGUAGES */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize.languages) &&
            finalize.languages.some((l) => l.name?.trim()) && (
              <div className="section">
                <h2 className="section-title">Languages</h2>
                <div className="skills-container">
                  {finalize.languages.map(
                    (lang, i) =>
                      lang.name?.trim() && (
                        <div key={i} className="skill-item">
                          {lang.name}
                          {lang.level &&
                            ` — ${Math.round((Number(lang.level) / 4) * 100)}%`}
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

          {/* CERTIFICATIONS */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize.certificationsAndLicenses) &&
            finalize.certificationsAndLicenses.some(
              (c) => c.name?.replace(/<[^>]*>/g, "").trim()
            ) && (
              <div className="section">
                <h2 className="section-title">Certifications</h2>
                <div className="additional-container">
                  {finalize.certificationsAndLicenses.map(
                    (item, i) =>
                      item.name?.replace(/<[^>]*>/g, "").trim() && (
                        <div
                          key={i}
                          className="additional-item"
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      )
                  )}
                </div>
              </div>
            )}

          {/* AWARDS */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize.awardsAndHonors) &&
            finalize.awardsAndHonors.some(
              (a) => a.name?.replace(/<[^>]*>/g, "").trim()
            ) && (
              <div className="section">
                <h2 className="section-title">Awards</h2>
                <div className="additional-container">
                  {finalize.awardsAndHonors.map(
                    (item, i) =>
                      item.name?.replace(/<[^>]*>/g, "").trim() && (
                        <div
                          key={i}
                          className="additional-item"
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      )
                  )}
                </div>
              </div>
            )}

          {/* INTERESTS */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize.hobbiesAndInterests) &&
            finalize.hobbiesAndInterests.some(
              (h) => h.name?.replace(/<[^>]*>/g, "").trim()
            ) && (
              <div className="section">
                <h2 className="section-title">Interests</h2>
                <div className="additional-container">
                  {finalize.hobbiesAndInterests.map(
                    (item, i) =>
                      item.name?.replace(/<[^>]*>/g, "").trim() && (
                        <div
                          key={i}
                          className="additional-item"
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      )
                  )}
                </div>
              </div>
            )}

          {/* CUSTOM SECTIONS */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize.customSection) &&
            finalize.customSection.some(
              (s) => s?.name?.trim() || s?.description?.trim()
            ) && (
              <div className="section">
                {finalize.customSection.map(
                  (section, i) =>
                    (section?.name?.trim() || section?.description?.trim()) && (
                      <div key={i} className="custom-section">
                        {section.name && (
                          <h3 className="custom-section-title">{section.name}</h3>
                        )}
                        {section.description && (
                          <div
                            className="custom-section-content"
                            dangerouslySetInnerHTML={{ __html: section.description }}
                          />
                        )}
                      </div>
                    )
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TemplateEleven;