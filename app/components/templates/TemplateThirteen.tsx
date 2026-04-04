// ─── Creative Bold Resume Template - FIXED FONT WEIGHTS ───────────
"use client";
import React, { useContext } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
import { usePathname } from "next/navigation";
import { ResumeProps } from "@/app/types";

// const TemplateThirteen: React.FC = () => {
  const TemplateThirteen: React.FC<ResumeProps> = ({ alldata }) => {

  // const context = useContext(CreateContext);

  // const pathname = usePathname();
  // const lastSegment = pathname.split("/").pop();

  // const contact = context.contact || {};
  // const educations = context?.education || [];
  // const experiences = context?.experiences || [];
  // const skills = context?.skills || [];
  // const finalize = context?.finalize || {};
  // const summary = context?.summary || "";

   const context = useContext(CreateContext);
    console.log("context,", context);
  
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
    contact?.postcode,
    contact?.country,
  ].filter(Boolean);

  const linkedinUrl = contact?.linkedin;
  const portfolioUrl = contact?.portfolio;

  /* ======================================================
     CSS — CREATIVE BOLD - FIXED FONT WEIGHTS
  ====================================================== */
  const styles = `
   

    body {
      background-color: #ffffff;
      line-height: 1.5;
      color: #111111;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .t13-resume  {
      max-width: 850px;
      margin: 40px auto;
      background: white;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

      .t13-resume.is-preview {
    scale: 0.3;
    max-height: 297mm;
    overflow: hidden;
    transform-origin: top left; /* Ensures it scales from the corner */
}

    /* Header Section - BOLD */
    .t13-resume .resume-header {
      padding: 50px 50px 35px 50px;
      background: #111111;
      color: white;
    }

   .t13-resume .name {
      font-size: 52px;
      font-weight: 800;
      font-style: normal;
      letter-spacing: -1px;
      margin-bottom: 15px;
      color: white;
      text-transform: uppercase;
      line-height: 1.2;
    }

   .t13-resume .job-title {
      font-size: 18px;
      font-weight: 600;
      font-style: normal;
      color: #cccccc;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 25px;
      padding-bottom: 20px;
      border-bottom: 3px solid rgba(255,255,255,0.2);
    }

   .t13-resume .contact-section {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 20px;
      margin-top: 15px;
    }

    .t13-resume .contact-block {
      flex: 1;
      min-width: 200px;
    }

    .t13-resume .contact-label {
      font-size: 11px;
      font-weight: 700;
      font-style: normal;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #888888;
      margin-bottom: 8px;
    }

    .t13-resume .contact-value {
      font-size: 14px;
      font-weight: 500;
      font-style: normal;
      color: white;
      line-height: 1.4;
      word-break: break-word;
    }

    .t13-resume .contact-value a {
      color: white;
      text-decoration: none;
      font-weight: 500;
    }

    .t13-resume .address-value {
      font-size: 14px;
      font-weight: 500;
      font-style: normal;
      color: white;
      line-height: 1.4;
    }

    /* Main Content */
    .t13-resume .resume-main {
      padding: 40px 50px 50px 50px;
      background: white;
    }

    /* Section Styles - BOLD */
    .t13-resume .section {
      margin-bottom: 35px;
    }

    .t13-resume .section:last-child {
      margin-bottom: 0;
    }

    .t13-resume .section-title {
      font-size: 20px;
      font-weight: 800;
      font-style: normal;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #111111;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 4px solid #111111;
      display: inline-block;
    }

    /* Summary */
    .t13-resume .summary-text {
      font-size: 14px;
      line-height: 1.7;
      color: #333333;
      font-weight: 500;
      font-style: normal;
    }

    /* Experience Items */
    .t13-resume .experience-item {
      margin-bottom: 32px;
    }

    .t13-resume .experience-item:last-child {
      margin-bottom: 0;
    }

    .t13-resume .experience-header {
      margin-bottom: 12px;
    }

    .t13-resume .experience-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 6px;
    }

    .t13-resume .experience-title {
      font-size: 18px;
      font-weight: 800;
      font-style: normal;
      color: #111111;
    }

    .t13-resume .experience-date {
      font-size: 12px;
      font-weight: 600;
      font-style: normal;
      color: #666666;
      letter-spacing: 0.5px;
    }

    .t13-resume .experience-company {
      font-size: 15px;
      font-weight: 600;
      font-style: normal;
      color: #444444;
      margin-top: 4px;
    }

    .t13-resume .experience-location {
      font-size: 12px;
      font-weight: 500;
      font-style: normal;
      color: #777777;
      margin-top: 3px;
    }

    .t13-resume .experience-description {
      margin-top: 12px;
    }

    /* Bullet points */
    .t13-resume .experience-description ul,
    .t13-resume .education-description ul {
      list-style-type: none;
      padding-left: 0;
    }

    .t13-resume .experience-description li,
    .t13-resume .education-description li {
      position: relative;
      padding-left: 24px;
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: 500;
      font-style: normal;
      color: #444444;
      line-height: 1.6;
    }

    .t13-resume .experience-description li::before,
    .t13-resume .education-description li::before {
      content: "◆";
      position: absolute;
      left: 4px;
      color: #111111;
      font-size: 12px;
      font-weight: 800;
    }

    /* Education Items */
    .t13-resume .education-item {
      margin-bottom: 28px;
    }

    .t13-resume .education-item:last-child {
      margin-bottom: 0;
    }

    .t13-resume .education-header {
      margin-bottom: 10px;
    }

    .t13-resume .education-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 6px;
    }

    .t13-resume .education-school {
      font-size: 18px;
      font-weight: 800;
      font-style: normal;
      color: #111111;
    }

    .t13-resume .education-date {
      font-size: 12px;
      font-weight: 600;
      font-style: normal;
      color: #666666;
    }

    .t13-resume .education-degree {
      font-size: 14px;
      font-weight: 600;
      font-style: normal;
      color: #444444;
      margin-top: 4px;
    }

    .t13-resume .education-description {
      margin-top: 10px;
    }

    /* Skills - BOLD TAGS */
    .t13-resume .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 10px;
    }

    .t13-resume .skill-item {
      font-size: 13px;
      font-weight: 700;
      font-style: normal;
      color: #111111;
      background: #f5f5f5;
      padding: 8px 18px;
      border-radius: 30px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    /* Additional content - BOLD STYLE */
    .t13-resume .additional-container {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .t13-resume .additional-item {
      font-size: 13px;
      font-weight: 600;
      font-style: normal;
      color: #111111;
      background: #f5f5f5;
      padding: 8px 18px;
      border-radius: 30px;
      letter-spacing: 0.5px;
    }

    /* Custom Sections */
    .t13-resume .custom-section {
      margin-bottom: 24px;
    }

    .t13-resume .custom-section:last-child {
      margin-bottom: 0;
    }

    .t13-resume .custom-section-title {
      font-size: 16px;
      font-weight: 800;
      font-style: normal;
      color: #111111;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .t13-resume .custom-section-content {
      font-size: 14px;
      font-weight: 500;
      font-style: normal;
      color: #444444;
      line-height: 1.6;
      padding-left: 0;
    }

    /* Print Styles - EXACT SAME AS SCREEN */
    @media print {
      @page {
        size: A4;
        margin: 0;
      }

      // body {
      //   background: white;
      //   margin: 0;
      //   padding: 0;
      //   -webkit-print-color-adjust: exact;
      //   print-color-adjust: exact;
      // }

      .t13-resume  {
        margin: 0;
        max-width: 100%;
        box-shadow: none;
        background: white;
        margin: 0;
        padding: 0;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      /* EXACT SAME PADDING AND STYLES */
     .t13-resume  .resume-header {
        background: #111111 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        padding: 50px 50px 35px 50px !important;
      }

      .t13-resume .resume-main {
        padding: 40px 50px 50px 50px !important;
      }

      .t13-resume .section-title {
        border-bottom: 4px solid #111111 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      .t13-resume .skill-item {
        background: #f5f5f5 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      .t13-resume .additional-item {
        background: #f5f5f5 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      /* FIX FONT WEIGHTS FOR PRINT */
      .t13-resume .name {
        font-weight: 800 !important;
      }
      
      .t13-resume .job-title {
        font-weight: 600 !important;
      }
      
      .t13-resume .section-title {
        font-weight: 800 !important;
      }
      
      .t13-resume .experience-title {
        font-weight: 800 !important;
      }
      
      .t13-resume .experience-company {
        font-weight: 600 !important;
      }
      
      .t13-resume .education-school {
        font-weight: 800 !important;
      }
      
      .t13-resume .skill-item {
        font-weight: 700 !important;
      }
      
      .t13-resume .additional-item {
        font-weight: 600 !important;
      }
      
     .t13-resume .section {
        page-break-inside: avoid;
      }

     .t13-resume .experience-item {
        page-break-inside: avoid;
      }
    }

    /* Responsive - CONSISTENT PADDING */
    @media (max-width: 600px) {
      .t13-resume  {
        margin: 15px;
      }

     .t13-resume .resume-header {
        padding: 30px 25px 25px 25px !important;
      }

      .t13-resume .resume-main {
        padding: 25px 25px 35px 25px !important;
      }

      .t13-resume .name {
        font-size: 32px;
      }

      .t13-resume .job-title {
        font-size: 14px;
      }

      .t13-resume .contact-section {
        flex-direction: column;
        gap: 12px;
      }

      .t13-resume .section-title {
        font-size: 18px;
      }

      .t13-resume .experience-title-row {
        flex-direction: column;
        gap: 5px;
      }

      .t13-resume .education-title-row {
        flex-direction: column;
        gap: 5px;
      }

      .t13-resume .skill-item {
        font-size: 11px;
        padding: 6px 14px;
      }

      .t13-resume .additional-item {
        font-size: 11px;
        padding: 6px 14px;
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
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
        <style>${styles}</style>
      </head>
      <body>
        <div class="t13-resume ">
          <!-- HEADER - BOLD DARK -->
          <div class="resume-header">
            <h1 class="name">${contact?.firstName || ""} ${contact?.lastName || ""}</h1>
            <div class="job-title">${
              contact?.jobTitle
                ? typeof contact.jobTitle === "string"
                  ? contact.jobTitle
                  : (contact.jobTitle as any)?.name || ""
                : ""
            }</div>
            <div class="contact-section">
              ${contact?.email ? `
                <div class="contact-block">
                  <div class="contact-label">EMAIL</div>
                  <div class="contact-value">${contact.email}</div>
                </div>
              ` : ""}
              ${contact?.phone ? `
                <div class="contact-block">
                  <div class="contact-label">PHONE</div>
                  <div class="contact-value">${contact.phone}</div>
                </div>
              ` : ""}
              ${addressParts.length ? `
                <div class="contact-block">
                  <div class="contact-label">LOCATION</div>
                  <div class="address-value">${addressParts.join(", ")}</div>
                </div>
              ` : ""}
            </div>
            ${(linkedinUrl || portfolioUrl) ? `
              <div class="contact-section" style="margin-top: 15px;">
                ${linkedinUrl ? `
                  <div class="contact-block">
                    <div class="contact-label">LINKEDIN</div>
                    <div class="contact-value"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" target="_blank">${linkedinUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}</a></div>
                  </div>
                ` : ""}
                ${portfolioUrl ? `
                  <div class="contact-block">
                    <div class="contact-label">PORTFOLIO</div>
                    <div class="contact-value"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}" target="_blank">${portfolioUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}</a></div>
                  </div>
                ` : ""}
              </div>
            ` : ""}
          </div>

          <!-- MAIN CONTENT -->
          <div class="resume-main">
            <!-- SUMMARY -->
            ${summary ? `
              <div class="section">
                <h2 class="section-title">Profile</h2>
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

            <!-- SKILLS - BOLD TAGS -->
            ${skills.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Skills</h2>
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
                    <span class="additional-item">${c.name.replace(/<[^>]*>/g, "")}</span>
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
                    <span class="additional-item">${h.name.replace(/<[^>]*>/g, "")}</span>
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
              backgroundColor: "#111111",
              color: "#ffffff",
              padding: "14px 32px",
              fontSize: "14px",
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: "inherit",
              letterSpacing: "1px",
              textTransform: "uppercase"
            }}
          >
            Download Resume
          </button>
        </div>
      )}

      {/* Resume Preview - EXACT SAME AS DOWNLOAD */}
      <div className={`t13-resume ${alldata ? 'is-preview' : ''}`}
       style={{ margin: "0 auto" }}>
        <style>{styles}</style>

        {/* HEADER - BOLD DARK */}
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
          <div className="contact-section">
            {contact?.email && (
              <div className="contact-block">
                <div className="contact-label">EMAIL</div>
                <div className="contact-value">{contact.email}</div>
              </div>
            )}
            {contact?.phone && (
              <div className="contact-block">
                <div className="contact-label">PHONE</div>
                <div className="contact-value">{contact.phone}</div>
              </div>
            )}
            {addressParts.length > 0 && (
              <div className="contact-block">
                <div className="contact-label">LOCATION</div>
                <div className="address-value">{addressParts.join(", ")}</div>
              </div>
            )}
          </div>
          {(linkedinUrl || portfolioUrl) && (
            <div className="contact-section" style={{ marginTop: "15px" }}>
              {linkedinUrl && (
                <div className="contact-block">
                  <div className="contact-label">LINKEDIN</div>
                  <div className="contact-value">
                    <a
                      href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {linkedinUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}
                    </a>
                  </div>
                </div>
              )}
              {portfolioUrl && (
                <div className="contact-block">
                  <div className="contact-label">PORTFOLIO</div>
                  <div className="contact-value">
                    <a
                      href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {portfolioUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')}
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MAIN CONTENT */}
        <div className="resume-main">
          {/* SUMMARY */}
          {summary && (
            <div className="section">
              <h2 className="section-title">Profile</h2>
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

          {/* SKILLS - BOLD TAGS */}
          {skills.length > 0 && (
            <div className="section">
              <h2 className="section-title">Skills</h2>
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
                        <span
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
                        <span
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

export default TemplateThirteen;