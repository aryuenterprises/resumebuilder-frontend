// ─── Creative Colorful Resume Template - Graphic Designer Style ───────────
"use client";
import React, { useContext } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
import { usePathname } from "next/navigation";

const TemplateFifteen: React.FC = () => {
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

  // Creative color palette
  const colors = {
    primary: "#6366F1", // Indigo
    secondary: "#8B5CF6", // Purple
    accent: "#EC4899", // Pink
    dark: "#1F2937",
    light: "#F9FAFB",
    gray: "#6B7280",
    white: "#FFFFFF",
    border: "#E5E7EB",
  };

  /* ======================================================
     CSS — CREATIVE COLORFUL RESUME
  ====================================================== */
  const styles = `
    

    body {
      font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #e9eef5 100%);
      line-height: 1.5;
      color: #1F2937;
      // padding: 40px 20px;
    }

    .resume-container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 24px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    /* Header Section - Gradient Background */
    .resume-header {
      padding: 50px 50px 40px 50px;
      background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
      color: white;
      position: relative;
    }

    .resume-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, ${colors.accent}, ${colors.primary}, ${colors.secondary});
    }

    .name {
      font-size: 48px;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 12px;
      color: white;
      line-height: 1.2;
    }

    .job-title {
      font-size: 18px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.9);
      letter-spacing: 0.5px;
      margin-bottom: 25px;
      padding-bottom: 20px;
      border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    }

    .contact-info {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
      margin-top: 15px;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.9);
    }

    .contact-icon {
      font-size: 16px;
    }

    .address {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.9);
      margin-top: 12px;
    }

    .links {
      margin-top: 15px;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }

    .link-item {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      font-size: 13px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }

    .link-item:hover {
      color: white;
      transform: translateX(3px);
    }

    /* Main Content */
    .resume-main {
      padding: 45px 50px 50px 50px;
    }

    /* Section Styles */
    .section {
      margin-bottom: 35px;
    }

    .section:last-child {
      margin-bottom: 0;
    }

    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: ${colors.dark};
      margin-bottom: 20px;
      padding-bottom: 8px;
      border-bottom: 3px solid ${colors.primary};
      display: inline-block;
      letter-spacing: -0.3px;
    }

    /* Summary */
    .summary-text {
      font-size: 14px;
      line-height: 1.7;
      color: ${colors.gray};
      font-weight: 400;
    }

    /* Experience Items */
    .experience-item {
      margin-bottom: 30px;
      position: relative;
      padding-left: 20px;
      border-left: 3px solid ${colors.primary};
    }

    .experience-item:last-child {
      margin-bottom: 0;
    }

    .experience-header {
      margin-bottom: 10px;
    }

    .experience-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 6px;
    }

    .experience-title {
      font-size: 18px;
      font-weight: 700;
      color: ${colors.dark};
    }

    .experience-date {
      font-size: 12px;
      font-weight: 500;
      color: ${colors.primary};
      background: rgba(99, 102, 241, 0.1);
      padding: 3px 10px;
      border-radius: 20px;
    }

    .experience-company {
      font-size: 14px;
      font-weight: 500;
      color: ${colors.secondary};
      margin-top: 4px;
    }

    .experience-location {
      font-size: 12px;
      font-weight: 400;
      color: ${colors.gray};
      margin-top: 3px;
    }

    .experience-description {
      margin-top: 12px;
    }

    /* Bullet points */
    .experience-description ul,
    .education-description ul {
      list-style-type: none;
      padding-left: 0;
    }

    .experience-description li,
    .education-description li {
      position: relative;
      padding-left: 24px;
      margin-bottom: 8px;
      font-size: 14px;
      color: ${colors.gray};
      line-height: 1.6;
      font-weight: 400;
    }

    .experience-description li::before,
    .education-description li::before {
      content: "✦";
      position: absolute;
      left: 4px;
      color: ${colors.accent};
      font-size: 12px;
      font-weight: bold;
    }

    /* Education Items */
    .education-item {
      margin-bottom: 25px;
      position: relative;
      padding-left: 20px;
      border-left: 3px solid ${colors.secondary};
    }

    .education-item:last-child {
      margin-bottom: 0;
    }

    .education-header {
      margin-bottom: 8px;
    }

    .education-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 6px;
    }

    .education-school {
      font-size: 17px;
      font-weight: 700;
      color: ${colors.dark};
    }

    .education-date {
      font-size: 12px;
      font-weight: 500;
      color: ${colors.secondary};
      background: rgba(139, 92, 246, 0.1);
      padding: 3px 10px;
      border-radius: 20px;
    }

    .education-degree {
      font-size: 14px;
      font-weight: 500;
      color: ${colors.gray};
      margin-top: 4px;
    }

    .education-description {
      margin-top: 10px;
    }

    /* Skills - Colorful Tags */
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 10px;
    }

    .skill-item {
      font-size: 13px;
      font-weight: 600;
      color: ${colors.primary};
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
      padding: 8px 20px;
      border-radius: 30px;
      letter-spacing: 0.3px;
      transition: all 0.2s;
    }

    .skill-item:hover {
      transform: translateY(-2px);
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
    }

    /* Additional content - Colorful Tags */
    .additional-container {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .additional-item {
      font-size: 13px;
      font-weight: 500;
      color: ${colors.accent};
      background: rgba(236, 72, 153, 0.1);
      padding: 8px 18px;
      border-radius: 30px;
      transition: all 0.2s;
    }

    .additional-item:hover {
      transform: translateY(-2px);
      background: rgba(236, 72, 153, 0.2);
    }

    /* Custom Sections */
    .custom-section {
      margin-bottom: 22px;
      position: relative;
      padding-left: 20px;
      border-left: 3px solid ${colors.accent};
    }

    .custom-section:last-child {
      margin-bottom: 0;
    }

    .custom-section-title {
      font-size: 16px;
      font-weight: 700;
      color: ${colors.dark};
      margin-bottom: 8px;
    }

    .custom-section-content {
      font-size: 14px;
      color: ${colors.gray};
      line-height: 1.6;
      font-weight: 400;
    }

    /* Print Styles */
    @media print {
      @page {
        size: A4;
        margin: 0;
      }

      
    @page :first {
      margin-top: 0;
    }

      body {
        background: white;
        padding: 0;
        margin: 0;
      }

      .resume-container {
        max-width: 100%;
        margin: 0;
        border-radius: 0;
        box-shadow: none;
      }

      .resume-header {
        background: ${colors.primary};
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        padding: 40px 40px 30px 40px !important;
      }

      .resume-main {
        padding: 35px 40px 40px 40px !important;
      }

      .skill-item {
        background: rgba(99, 102, 241, 0.1);
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .additional-item {
        background: rgba(236, 72, 153, 0.1);
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

   

    
    }

    /* Responsive */
    @media (max-width: 768px) {
      body {
        padding: 20px;
      }

      .resume-header {
        padding: 35px 30px 25px 30px !important;
      }

      .resume-main {
        padding: 30px 30px 35px 30px !important;
      }

      .name {
        font-size: 36px;
      }

      .job-title {
        font-size: 16px;
      }

      .contact-info {
        flex-direction: column;
        gap: 10px;
      }

      .section-title {
        font-size: 18px;
      }

      .experience-title-row {
        flex-direction: column;
        gap: 6px;
      }

      .education-title-row {
        flex-direction: column;
        gap: 6px;
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
      return `<div class="experience-description" style="white-space: pre-wrap;">${stripHtml(text)}</div>`;
    }
  };

  const generateHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8"/>
        <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <style>${styles}</style>
      </head>
      <body>
        <div class="resume-container">
          <!-- HEADER - GRADIENT -->
          <div class="resume-header">
            <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
            <div class="job-title">${
              contact?.jobTitle
                ? typeof contact.jobTitle === "string"
                  ? contact.jobTitle
                  : (contact.jobTitle as any)?.name || ""
                : ""
            }</div>
            <div class="contact-info">
              ${contact?.email ? `
                <div class="contact-item">
                  <span class="contact-icon">📧</span>
                  <span>${contact.email}</span>
                </div>
              ` : ""}
              ${contact?.phone ? `
                <div class="contact-item">
                  <span class="contact-icon">📱</span>
                  <span>${contact.phone}</span>
                </div>
              ` : ""}
            </div>
            ${addressParts.length ? `<div class="address">📍 ${addressParts.join(" • ")}</div>` : ""}
            <div class="links">
              ${linkedinUrl ? `<a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" class="link-item">🔗 LinkedIn</a>` : ""}
              ${portfolioUrl ? `<a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" class="link-item">🎨 Portfolio</a>` : ""}
            </div>
          </div>

          <!-- MAIN CONTENT -->
          <div class="resume-main">
            <!-- SUMMARY -->
            ${summary ? `
              <div class="section">
                <h2 class="section-title">About Me</h2>
                <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
              </div>
            ` : ""}

            <!-- EXPERIENCE -->
            ${experiences.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Work Experience</h2>
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
                        <div class="experience-company">${exp.employer || ""}${exp.location ? ` • ${exp.location}` : ""}</div>
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

            <!-- SKILLS - COLORFUL TAGS -->
            ${skills.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Skills & Expertise</h2>
                <div class="skills-container">
                  ${skills.map((s) => `
                    <span class="skill-item">${s.skill || ""}</span>
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
                    <span class="skill-item">${l.name}${l.level ? ` • ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</span>
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
                    <span class="additional-item"> ${c.name.replace(/<[^>]*>/g, "")}</span>
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
                    <span class="additional-item">${a.name.replace(/<[^>]*>/g, "")}</span>
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
                    <span class="additional-item"> ${h.name.replace(/<[^>]*>/g, "")}</span>
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
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              color: "#ffffff",
              padding: "14px 36px",
              fontSize: "14px",
              fontWeight: "600",
              border: "none",
              borderRadius: "40px",
              cursor: "pointer",
              fontFamily: "inherit",
              letterSpacing: "0.5px",
              boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(99, 102, 241, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(99, 102, 241, 0.3)";
            }}
          >
            📄 Download Resume
          </button>
        </div>
      )}

      {/* Resume Preview */}
      <div className="resume-container" style={{ margin: "0 auto" }}>
        <style>{styles}</style>

        {/* HEADER - GRADIENT */}
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
          <div className="contact-info">
            {contact?.email && (
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>{contact.email}</span>
              </div>
            )}
            {contact?.phone && (
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <span>{contact.phone}</span>
              </div>
            )}
          </div>
          {addressParts.length > 0 && (
            <div className="address">📍 {addressParts.join(" • ")}</div>
          )}
          <div className="links">
            {linkedinUrl && (
              <a
                href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                🔗 LinkedIn
              </a>
            )}
            {portfolioUrl && (
              <a
                href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
                className="link-item"
                target="_blank"
                rel="noreferrer"
              >
                🎨 Portfolio
              </a>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="resume-main">
          {/* SUMMARY */}
          {summary && (
            <div className="section">
              <h2 className="section-title">About Me</h2>
              <div
                className="summary-text"
                dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
              />
            </div>
          )}

          {/* EXPERIENCE */}
          {experiences.length > 0 && (
            <div className="section">
              <h2 className="section-title">Work Experience</h2>
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
                    <div className="experience-company">
                      {exp.employer}
                      {exp.location && ` • ${exp.location}`}
                    </div>
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

          {/* SKILLS - COLORFUL TAGS */}
          {skills.length > 0 && (
            <div className="section">
              <h2 className="section-title">Skills & Expertise</h2>
              <div className="skills-container">
                {skills.map((skill, i) => (
                  <span key={i} className="skill-item">
                    {skill.skill}
                  </span>
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
                        <span key={i} className="skill-item">
                          {lang.name}
                          {lang.level &&
                            ` • ${Math.round((Number(lang.level) / 4) * 100)}%`}
                        </span>
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
                        <span
                          key={i}
                          className="additional-item"
                          dangerouslySetInnerHTML={{ __html: ` ${item.name}` }}
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
                        <span
                          key={i}
                          className="additional-item"
                          dangerouslySetInnerHTML={{ __html: ` ${item.name}` }}
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
                        <span
                          key={i}
                          className="additional-item"
                          dangerouslySetInnerHTML={{ __html: ` ${item.name}` }}
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
                          <h3 className="custom-section-title"> {section.name}</h3>
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

export default TemplateFifteen;









