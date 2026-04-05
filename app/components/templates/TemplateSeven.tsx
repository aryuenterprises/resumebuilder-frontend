// ─── Professional Black & White Single Column Resume Template ───────────
"use client";
import React, { useContext } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
import { usePathname } from "next/navigation";
import { AllData, ResumeProps } from "@/app/types";

const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
  // const context = useContext(CreateContext);

  // const pathname = usePathname();
  // const lastSegment = pathname.split("/").pop();

  // const contact = context.contact || {};
  // const educations = context?.education || [];
  // const experiences = context?.experiences || [];
  // const skills = context?.skills || [];
  // const finalize = context?.finalize || {};
  // const summary = context?.summary || "";

  //   console.log("alldata", alldata);

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
     CSS — PROFESSIONAL BLACK & WHITE
  ====================================================== */
  const styles = `

 .t7-resume  body{
  margin:0;
  padding:0;
  
  }
   

    .t7-resume  {
    width: 210mm;
      margin: 30px auto;
      background: white;
      border: 1px solid #e0e0e0;
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


    /* Header Section */
    .t7-resume .resume-header {
      padding: 40px 50px 25px 50px;
      border-bottom: 2px solid #000000;
      text-align: center;
    }

   .t7-resume .name {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 8px;
      color: #000000;
    }

   .t7-resume .job-title {
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 1px;
      color: #333333;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #cccccc;
    }

   .t7-resume .contact-row {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;
      font-size: 12px;
      color: #444444;
      margin-bottom: 8px;
    }

   .t7-resume .contact-item {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

   .t7-resume .address {
      font-size: 12px;
      color: #444444;
      margin-top: 6px;
    }

   .t7-resume .links {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 16px;
    }

  .t7-resume  .link-item {
      color: #000000;
      text-decoration: none;
      font-size: 12px;
      border-bottom: 1px dotted #999;
    }

    /* Main Content */
    .t7-resume .resume-main {
      padding: 30px 50px 45px 50px;
    }

    /* Section Styles */
    .t7-resume .section {
      margin-bottom: 25px;
    }

    .t7-resume  .section:last-child {
      margin-bottom: 0;
    }

    .t7-resume  .section-title {
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #000000;
      margin-bottom: 12px;
      padding-bottom: 4px;
      border-bottom: 1px solid #000000;
    }

    /* Summary */
    .t7-resume .summary-text {
      font-size: 13px;
      line-height: 1.5;
      color: #222222;
      text-align: justify;
    }

    /* Experience Items */
    .t7-resume .experience-item {
      margin-bottom: 20px;
    }

    .t7-resume .experience-item:last-child {
      margin-bottom: 0;
    }

    .t7-resume .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 6px;
    }

  

    .t7-resume .experience-title {
      font-size: 15px;
      font-weight: 700;
      color: #000000;
          text-align: start;
    }

    .t7-resume .experience-company {
      font-size: 13px;
      font-weight: 500;
      font-style: italic;
      color: #333333;
      margin-top: 2px;
                text-align: start;

    }

    .t7-resume .experience-date {
      font-size: 12px;
      color: #555555;
      font-weight: normal;
      white-space: nowrap;
    }

    .t7-resume .experience-description {
      margin-top: 8px;
      padding-left: 0;
                      text-align: start;

    }

    /* Bullet points */
    .t7-resume .experience-description ul,
    .t7-resume .education-description ul {
      list-style-type: none;
      padding-left: 0;
                text-align: start;

    }

    .t7-resume .experience-description li,
    .t7-resume .education-description li {
      position: relative;
      padding-left: 18px;
      margin-bottom: 5px;
      font-size: 13px;
      color: #222222;
      line-height: 1.45;
                      text-align: start;

    }

    .t7-resume .experience-description li::before,
    .t7-resume .education-description li::before {
      content: "•";
      position: absolute;
      left: 4px;
      color: #000000;
      font-size: 12px;
    }

    /* Education Items */
    .t7-resume .education-item {
      margin-bottom: 18px;
    }

    .t7-resume .education-item:last-child {
      margin-bottom: 0;
    }

    .t7-resume .education-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 5px;
    }



    .t7-resume .education-school {
      font-size: 15px;
      font-weight: 700;
      color: #000000;
                text-align: start;

    }

    .t7-resume .education-degree {
      font-size: 13px;
      color: #333333;
      margin-top: 2px;
                text-align: start;

    }

    .t7-resume .education-date {
      font-size: 12px;
      color: #555555;
      white-space: nowrap;
    }

    .t7-resume .education-description {
      margin-top: 6px;
                      text-align: start;

    }

    /* Skills */
    .t7-resume .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 20px;
      margin-top: 8px;
    }

    .t7-resume .skill-item {
      font-size: 13px;
      color: #222222;
      position: relative;
      padding-left: 14px;
    }

    .t7-resume .skill-item::before {
      content: "•";
      position: absolute;
      left: 2px;
      color: #000000;
    }

    /* Additional content */
    .t7-resume .additional-content {
      margin-top: 8px;
    }

    .t7-resume .additional-item {
      font-size: 13px;
      color: #222222;
      margin-bottom: 6px;
      position: relative;
      padding-left: 18px;
                      text-align: start;

    }

    .t7-resume .additional-item::before {
      content: "•";
      position: absolute;
      left: 4px;
      color: #000000;
    }

    /* Custom Sections */
    .t7-resume .custom-section {
      margin-bottom: 16px;
    }

    .t7-resume .custom-section:last-child {
      margin-bottom: 0;
    }

    .t7-resume .custom-section-title {
     

       font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #000000;
      margin-bottom: 12px;
      padding-bottom: 4px;
      border-bottom: 1px solid #000000;
    }

    .t7-resume .custom-section-content {
      font-size: 13px;
      color: #222222;
      line-height: 1.45;
      margin-left: 18px;
                      text-align: start;

    }

    /* Print Styles - EXACT SAME AS SCREEN */
    @media print {
      @page {
        size: A4;
        margin: 0.5in;
      }

   .t7-resume   body {
        background: white;
        margin: 0;
        padding: 0;
      }

      .t7-resume  {
        margin: 0 auto;
        max-width: 100%;
        border: none;
        box-shadow: none;
      }

     ..t7-resume .resume-header {
        border-bottom: 2px solid #000;
      }

     .t7-resume .section {
        page-break-inside: avoid;
      }

      .t7-resume .experience-item {
        page-break-inside: avoid;
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .t7-resume  {
        margin: 15px;
      }

      .t7-resume .resume-header {
        padding: 25px 25px 18px 25px;
      }

      .t7-resume .resume-main {
        padding: 20px 25px 30px 25px;
      }

      .t7-resume .name {
        font-size: 26px;
      }

      .t7-resume .contact-row {
        gap: 12px;
        flex-direction: column;
        align-items: center;
        gap: 5px;
      }

      .t7-resume .experience-header {
        flex-direction: column;
        gap: 4px;
      }

      .t7-resume .experience-date {
        white-space: normal;
      }

      .t7-resume .education-date {
        white-space: normal;
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
    if (
      lines.some(
        (line) => line.trim().startsWith("-") || line.trim().startsWith("•"),
      )
    ) {
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
        <style>${styles}</style>
      </head>
      <body>
        <div class="t7-resume ">
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
            ${
              summary
                ? `
              <div class="section">
                <h2 class="section-title">Professional Summary</h2>
                <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
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
                    const startFormatted = formatMonthYear(exp.startDate, true);
                    const endFormatted = exp.endDate
                      ? formatMonthYear(exp.endDate, true)
                      : "Present";
                    return `
                    <div class="experience-item">
                      <div class="experience-header">
                        <div >
                          <div class="experience-title">${exp.jobTitle || ""}</div>
                          <div class="experience-company">${exp.employer || ""}${exp.location ? `, ${exp.location}` : ""}</div>
                        </div>
                        <div class="experience-date">${startFormatted} — ${endFormatted}</div>
                      </div>
                      ${exp.text ? renderDescription(exp.text) : ""}
                    </div>
                  `;
                  })
                  .join("")}
              </div>
            `
                : ""
            }

            <!-- EDUCATION -->
            ${
              educations.length > 0
                ? `
              <div class="section">
                <h2 class="section-title">Education</h2>
                ${educations
                  .map((edu) => {
                    const dateStr =
                      edu.startDate || edu.endDate
                        ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " — " : ""}${edu.endDate || ""}`
                        : "";
                    return `
                    <div class="education-item">
                      <div class="education-header">
                        <div>
                          <div class="education-school">${edu.schoolname || ""}</div>
                          ${edu.degree ? `<div class="education-degree">${edu.degree}</div>` : ""}
                        </div>
                        ${dateStr ? `<div class="education-date">${dateStr}</div>` : ""}
                      </div>
                      ${edu.text ? `<div class="education-description">${renderDescription(edu.text)}</div>` : ""}
                    </div>
                  `;
                  })
                  .join("")}
              </div>
            `
                : ""
            }

            <!-- SKILLS -->
            ${
              skills.length > 0
                ? `
              <div class="section">
                <h2 class="section-title">Skills</h2>
                <div class="skills-container">
                  ${skills
                    .map(
                      (s) => `
                    <div class="skill-item">${s.skill || ""}</div>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `
                : ""
            }

            <!-- LANGUAGES -->
            ${
              finalize &&
              !Array.isArray(finalize) &&
              Array.isArray(finalize.languages) &&
              finalize.languages.some((l) => l.name?.trim())
                ? `
              <div class="section">
                <h2 class="section-title">Languages</h2>
                <div class="skills-container">
                  ${finalize.languages
                    .filter((l) => l.name?.trim())
                    .map(
                      (l) => `
                    <div class="skill-item">${l.name}${l.level ? ` — ${Math.round((Number(l.level) / 4) * 100)}%` : ""}</div>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `
                : ""
            }

            <!-- CERTIFICATIONS -->
            ${
              finalize &&
              !Array.isArray(finalize) &&
              Array.isArray(finalize.certificationsAndLicenses) &&
              finalize.certificationsAndLicenses.some((c) =>
                c.name?.replace(/<[^>]*>/g, "").trim(),
              )
                ? `
              <div class="section">
                <h2 class="section-title">Certifications</h2>
                <div class="additional-content">
                  ${finalize.certificationsAndLicenses
                    .filter((c) => c.name?.replace(/<[^>]*>/g, "").trim())
                    .map(
                      (c) => `
                    <div class="additional-item">${c.name.replace(/<[^>]*>/g, "")}</div>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `
                : ""
            }

            <!-- AWARDS -->
            ${
              finalize &&
              !Array.isArray(finalize) &&
              Array.isArray(finalize.awardsAndHonors) &&
              finalize.awardsAndHonors.some((a) =>
                a.name?.replace(/<[^>]*>/g, "").trim(),
              )
                ? `
              <div class="section">
                <h2 class="section-title">Awards & Honors</h2>
                <div class="additional-content">
                  ${finalize.awardsAndHonors
                    .filter((a) => a.name?.replace(/<[^>]*>/g, "").trim())
                    .map(
                      (a) => `
                    <div class="additional-item">${a.name.replace(/<[^>]*>/g, "")}</div>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `
                : ""
            }

            <!-- INTERESTS -->
            ${
              finalize &&
              !Array.isArray(finalize) &&
              Array.isArray(finalize.hobbiesAndInterests) &&
              finalize.hobbiesAndInterests.some((h) =>
                h.name?.replace(/<[^>]*>/g, "").trim(),
              )
                ? `
              <div class="section">
                <h2 class="section-title">Interests</h2>
                <div class="additional-content">
                  ${finalize.hobbiesAndInterests
                    .filter((h) => h.name?.replace(/<[^>]*>/g, "").trim())
                    .map(
                      (h) => `
                    <div class="additional-item">${h.name.replace(/<[^>]*>/g, "")}</div>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `
                : ""
            }

            <!-- REFERENCES -->
            ${
              finalize &&
              !Array.isArray(finalize) &&
              Array.isArray(finalize.references) &&
              finalize.references.some((r) =>
                r.name?.replace(/<[^>]*>/g, "").trim(),
              )
                ? `
              <div class="section">
                <h2 class="section-title">References</h2>
                <div class="additional-content">
                  ${finalize.references
                    .filter((r) => r.name?.replace(/<[^>]*>/g, "").trim())
                    .map(
                      (r) => `
                    <div class="additional-item">${r.name.replace(/<[^>]*>/g, "")}</div>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `
                : ""
            }

            <!-- CUSTOM SECTIONS -->
            ${
              finalize &&
              !Array.isArray(finalize) &&
              Array.isArray(finalize.customSection) &&
              finalize.customSection.some(
                (s) => s?.name?.trim() || s?.description?.trim(),
              )
                ? `
              <div class="section">
                ${finalize.customSection
                  .filter((s) => s?.name?.trim() || s?.description?.trim())
                  .map(
                    (s) => `
                  <div class="custom-section">
                    ${s.name ? `<h3 class="custom-section-title">${s.name}</h3>` : ""}
                    ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
                  </div>
                `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }
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
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 0 }}>
      {lastSegment === "download-resume" && (
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={handleDownload}
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: "600",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Download Resume
          </button>
        </div>
      )}

      {/* Resume Preview - EXACT SAME AS DOWNLOAD */}
      <div
        className={`t7-resume ${alldata ? "is-preview" : ""}`}
        style={{
          margin: "0 auto",
          boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "",
        }}
      >
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
          <div className="contact-row">
            {contact?.email && (
              <div className="contact-item">{contact.email}</div>
            )}
            {contact?.phone && (
              <div className="contact-item">{contact.phone}</div>
            )}
          </div>
          {addressParts.length > 0 && (
            <div className="address">{addressParts.join(" | ")}</div>
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

        {/* MAIN CONTENT */}
        <div className="resume-main">
          {/* SUMMARY */}
          {summary && (
            <div className="section">
              <h2 className="section-title">Professional Summary</h2>
              <div
                className="summary-text"
                dangerouslySetInnerHTML={{
                  __html: summary.replace(/\n/g, "<br>"),
                }}
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
                    <div>
                      <div className="experience-title">{exp.jobTitle}</div>
                      <div className="experience-company">
                        {exp.employer}
                        {exp.location && `, ${exp.location}`}
                      </div>
                    </div>
                    <div className="experience-date">
                      <MonthYearDisplay value={exp.startDate} shortYear /> —{" "}
                      {exp.endDate ? (
                        <MonthYearDisplay value={exp.endDate} shortYear />
                      ) : (
                        "Present"
                      )}
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
                    <div>
                      <div className="education-school">{edu.schoolname}</div>
                      {edu.degree && (
                        <div className="education-degree">{edu.degree}</div>
                      )}
                    </div>
                    {(edu.startDate || edu.endDate) && (
                      <div className="education-date">
                        {edu.startDate || ""}
                        {edu.startDate && edu.endDate && " — "}
                        {edu.endDate || ""}
                      </div>
                    )}
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
                      ),
                  )}
                </div>
              </div>
            )}

          {/* CERTIFICATIONS */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize.certificationsAndLicenses) &&
            finalize.certificationsAndLicenses.some((c) =>
              c.name?.replace(/<[^>]*>/g, "").trim(),
            ) && (
              <div className="section">
                <h2 className="section-title">Certifications</h2>
                <div className="additional-content">
                  {finalize.certificationsAndLicenses.map(
                    (item, i) =>
                      item.name?.replace(/<[^>]*>/g, "").trim() && (
                        <div
                          key={i}
                          className="additional-item"
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      ),
                  )}
                </div>
              </div>
            )}

          {/* AWARDS */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize.awardsAndHonors) &&
            finalize.awardsAndHonors.some((a) =>
              a.name?.replace(/<[^>]*>/g, "").trim(),
            ) && (
              <div className="section">
                <h2 className="section-title">Awards & Honors</h2>
                <div className="additional-content">
                  {finalize.awardsAndHonors.map(
                    (item, i) =>
                      item.name?.replace(/<[^>]*>/g, "").trim() && (
                        <div
                          key={i}
                          className="additional-item"
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      ),
                  )}
                </div>
              </div>
            )}

          {/* INTERESTS */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize.hobbiesAndInterests) &&
            finalize.hobbiesAndInterests.some((h) =>
              h.name?.replace(/<[^>]*>/g, "").trim(),
            ) && (
              <div className="section">
                <h2 className="section-title">Interests</h2>
                <div className="additional-content">
                  {finalize.hobbiesAndInterests.map(
                    (item, i) =>
                      item.name?.replace(/<[^>]*>/g, "").trim() && (
                        <div
                          key={i}
                          className="additional-item"
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      ),
                  )}
                </div>
              </div>
            )}

          {/* REFERENCES */}
          {finalize &&
            !Array.isArray(finalize) &&
            Array.isArray(finalize.references) &&
            finalize.references.some((r) =>
              r.name?.replace(/<[^>]*>/g, "").trim(),
            ) && (
              <div className="section">
                <h2 className="section-title">References</h2>
                <div className="additional-content">
                  {finalize.references.map(
                    (item, i) =>
                      item.name?.replace(/<[^>]*>/g, "").trim() && (
                        <div
                          key={i}
                          className="additional-item"
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      ),
                  )}
                </div>
              </div>
            )}

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
                          <h3 className="custom-section-title">
                            {section.name}
                          </h3>
                        )}
                        {section.description && (
                          <div
                            className="custom-section-content"
                            dangerouslySetInnerHTML={{
                              __html: section.description,
                            }}
                          />
                        )}
                      </div>
                    ),
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TemplateSeven;
