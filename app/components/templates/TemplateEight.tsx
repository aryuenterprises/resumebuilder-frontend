"use client";
import React, { useContext } from "react";
import axios from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import { formatMonthYear, MonthYearDisplay } from "@/app/utils";
import { usePathname } from "next/navigation";

const TemplateEight: React.FC = () => {
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

  const linkedinUrl = contact?.linkedin || contact?.linkedin;
  const portfolioUrl = contact?.portfolio || contact?.portfolio;

  /* ======================================================
     CSS — SINGLE COLUMN BLACK & WHITE PROFESSIONAL
  ====================================================== */
  const styles = `
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Barlow:wght@300;400;500;600&display=swap');

  body {
    margin: 0;
    background-color: white;
    text-align: left;
  }

  .resume-container {
    width: 210mm;
    min-height: 297mm;
    padding: 18mm 20mm;
    box-sizing: border-box;
    background-color: #ffffff;
    font-family: 'Barlow', sans-serif;
    color: #111111;
    text-align: left;
  }

  /* ── HEADER ── */
  .header-block {
    margin-bottom: 22px;
    padding-bottom: 16px;
    border-bottom: 2px solid #111;
  }

  .header-name {
    font-family: 'EB Garamond', serif;
    font-size: 36px;
    font-weight: 600;
    letter-spacing: 0.5px;
    line-height: 1.1;
    margin-bottom: 4px;
    color: #000;
  }

  .header-jobtitle {
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #444;
    margin-bottom: 12px;
  }

  .header-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    font-size: 12.5px;
    color: #333;
    line-height: 1.6;
  }

  .header-meta-item {
    display: flex;
    align-items: center;
    color: #333;
  }

  .header-meta-item:not(:last-child)::after {
    content: '·';
    margin: 0 8px;
    color: #999;
    font-weight: 300;
  }

  .header-meta a {
    color: #111;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  /* ── SECTION TITLES ── */
  .section-block {
    margin-bottom: 20px;
  }

  .section-title {
    font-family: 'Barlow', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #000;
    margin-bottom: 10px;
    padding-bottom: 4px;
    border-bottom: 1px solid #000;
  }

  /* ── SUMMARY ── */
  .summary-text {
    font-size: 13.5px;
    line-height: 1.75;
    color: #222;
  
  }

  /* ── EXPERIENCE ── */
  .entry-block {
    margin-bottom: 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid #e8e8e8;
  }

  .entry-block:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .entry-top-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2px;
    flex-wrap: wrap;
    gap: 6px;
  }

  .entry-title {
    font-family: 'EB Garamond', serif;
    font-size: 17px;
    font-weight: 600;
    color: #000;
    line-height: 1.3;
  }

  .entry-date {
    font-size: 11.5px;
    color: #555;
    font-weight: 400;
    white-space: nowrap;
    font-family: 'Barlow', sans-serif;
    letter-spacing: 0.3px;
  }

  .entry-subtitle {
    font-size: 12.5px;
    color: #444;
    margin-bottom: 7px;
    font-family: 'Barlow', sans-serif;
    font-weight: 400;
    letter-spacing: 0.2px;
  }

  .entry-subtitle em {
    font-style: normal;
    color: #777;
  }

  .entry-content {
    font-size: 13px;
    line-height: 1.65;
    color: #333;
    font-family: 'Barlow', sans-serif;
  }

  .entry-content ul,
  .entry-content-description ul {
    list-style-type: disc !important;
    padding-left: 18px !important;
    margin: 4px 0 !important;
  }

  .entry-content ol,
  .entry-content-description ol {
    list-style-type: decimal !important;
    padding-left: 18px !important;
    margin: 4px 0 !important;
  }

  .entry-content li,
  .entry-content-description li {
    margin-bottom: 3px !important;
    line-height: 1.6 !important;
    list-style-position: outside !important;
  }

  ul {
    list-style-type: disc !important;
  }

  /* ── SKILLS ── */
  .skills-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .skill-row {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .skill-name-label {
    font-size: 13px;
    color: #111;
    min-width: 160px;
    font-family: 'Barlow', sans-serif;
    font-weight: 400;
  }

  .skill-dots {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .skill-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1.5px solid #111;
    background: transparent;
  }

  .skill-dot.filled {
    background: #111;
  }

  /* ── LANGUAGES ── */
  .lang-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 10px;
  }

  .lang-name {
    font-size: 13px;
    color: #111;
    min-width: 160px;
    font-family: 'Barlow', sans-serif;
  }

  /* ── ADDITIONAL CONTENT ── */
  .additional-content {
    font-size: 13px;
    color: #333;
    line-height: 1.7;
    font-family: 'Barlow', sans-serif;
  }

  .additional-item {
    margin-bottom: 5px;
    padding-left: 12px;
    position: relative;
  }

  .additional-item::before {
    content: '—';
    position: absolute;
    left: 0;
    color: #999;
    font-size: 11px;
    top: 2px;
  }

  /* ── EDUCATION ── */
  .edu-content {
    font-size: 13px;
    line-height: 1.65;
    color: #333;
    font-family: 'Barlow', sans-serif;
  }

  .edu-list {
    list-style-type: disc !important;
    padding-left: 18px !important;
    margin: 4px 0 !important;
  }

  .edu-list li {
    margin-bottom: 3px;
    line-height: 1.6;
  }

  /* ── CUSTOM SECTIONS ── */
  .custom-section-content {
    font-size: 13px;
    line-height: 1.65;
    color: #333;
    font-family: 'Barlow', sans-serif;
  }

  /* ── PRINT ── */
  @media print {
    @page {
      size: A4;
      margin: 18mm 20mm;
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

    .entry-block,{
      page-break-inside: avoid;
    }

    .entry-date {
      white-space: nowrap;
    }
  }

  @media (max-width: 768px) {
    .resume-container {
      width: 100%;
      padding: 10mm;
    }

    .entry-top-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .skill-name-label,
    .lang-name {
      min-width: 120px;
    }
  }
`;

  /* ======================================================
     HTML GENERATION (for PDF download)
  ====================================================== */
  const generateHTML = () => {
    const stripHtmlHelper = (html: string) =>
      html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

    const renderSkillDots = (level: number | string, total = 4) => {
      const filled = Number(level) || 0;
      return Array.from({ length: total })
        .map(
          (_, i) =>
            `<span class="skill-dot${i < filled ? " filled" : ""}"></span>`,
        )
        .join("");
    };

    const renderEntryText = (text: string, className: string) => {
      if (!text) return "";
      if (text.includes("<") && text.includes(">")) {
        return `<div class="entry-content ${className}">${text}</div>`;
      }
      const lines = text.split("\n").filter((l) => l.trim() !== "");
      if (
        lines.some(
          (l) => l.trim().startsWith("-") || l.trim().startsWith("•"),
        )
      ) {
        return `<div class="entry-content ${className}"><ul style="list-style-type:disc!important;padding-left:18px;margin:4px 0;">${lines
          .map((l) => {
            const t = l.trim();
            const content =
              t.startsWith("-") || t.startsWith("•")
                ? t.substring(1).trim()
                : t;
            return content
              ? `<li style="margin-bottom:3px;line-height:1.6;list-style-type:disc!important;">${content}</li>`
              : "";
          })
          .join("")}</ul></div>`;
      }
      return `<div class="entry-content ${className}" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
    };

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
      <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>${styles}</style>
    </head>
    <body>
      <div class="resume-container">

        <!-- HEADER -->
        <div class="header-block">
          <div class="header-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
          <div class="header-jobtitle">
            ${
              contact?.jobTitle
                ? typeof contact.jobTitle === "string"
                  ? contact.jobTitle
                  : (contact.jobTitle as any)?.name || ""
                : ""
            }
          </div>
          <div class="header-meta">
            ${addressParts.length > 0 ? `<span class="header-meta-item">${addressParts.join(", ")}</span>` : ""}
            ${contact?.email ? `<span class="header-meta-item">${contact.email}</span>` : ""}
            ${contact?.phone ? `<span class="header-meta-item">${contact.phone}</span>` : ""}
            ${
              linkedinUrl
                ? `<span class="header-meta-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></span>`
                : ""
            }
            ${
              portfolioUrl
                ? `<span class="header-meta-item"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></span>`
                : ""
            }
          </div>
        </div>

        <!-- SUMMARY -->
        ${
          summary
            ? `<div class="section-block">
                <div class="section-title">Profile</div>
                <div class="summary-text">${summary.replace(/\n/g, "<br>")}</div>
               </div>`
            : ""
        }

        <!-- EXPERIENCE -->
        ${
          experiences.length > 0
            ? `<div class="section-block">
                <div class="section-title">Experience</div>
                ${experiences
                  .map((exp) => {
                    const startFormatted = formatMonthYear(exp.startDate, true);
                    const endFormatted = exp.endDate
                      ? formatMonthYear(exp.endDate, true)
                      : "Present";
                    return `
                      <div class="entry-block">
                        <div class="entry-top-row">
                          <div class="entry-title">${exp.jobTitle || ""}</div>
                          <div class="entry-date">${startFormatted} – ${endFormatted}</div>
                        </div>
                        <div class="entry-subtitle">
                          ${exp.employer || ""}${exp.location ? `<em> · ${exp.location}</em>` : ""}
                        </div>
                        ${exp.text ? renderEntryText(exp.text, "entry-content-description") : ""}
                      </div>`;
                  })
                  .join("")}
               </div>`
            : ""
        }

        <!-- EDUCATION -->
        ${
          educations.length > 0
            ? `<div class="section-block">
                <div class="section-title">Education</div>
                ${educations
                  .map((edu) => {
                    const dateStr =
                      edu.startDate || edu.endDate
                        ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
                        : "";
                    let textHtml = "";
                    if (edu.text) {
                      const lines = edu.text
                        .split("\n")
                        .filter((l: string) => l.trim() !== "");
                      if (
                        edu.text.includes("<") && edu.text.includes(">")
                      ) {
                        textHtml = `<div class="edu-content">${edu.text}</div>`;
                      } else if (
                        lines.some((l: string) => l.trim().startsWith("-"))
                      ) {
                        textHtml = `<ul class="edu-list">${lines
                          .map((l: string) => {
                            const t = l.trim();
                            const c = t.startsWith("-")
                              ? t.substring(1).trim()
                              : t;
                            return c ? `<li>${c}</li>` : "";
                          })
                          .join("")}</ul>`;
                      } else {
                        textHtml = `<div class="edu-content" style="white-space:pre-wrap">${stripHtmlHelper(edu.text)}</div>`;
                      }
                    }
                    return `
                      <div class="entry-block">
                        <div class="entry-top-row">
                          <div class="entry-title">${edu.schoolname || ""}</div>
                          ${dateStr ? `<div class="entry-date">${dateStr}</div>` : ""}
                        </div>
                        ${
                          edu.degree || edu.location
                            ? `<div class="entry-subtitle">
                                ${edu.degree ? edu.degree : ""}
                                ${edu.degree && edu.location ? "<em> · </em>" : ""}
                                ${edu.location ? `<em>${edu.location}</em>` : ""}
                               </div>`
                            : ""
                        }
                        ${textHtml}
                      </div>`;
                  })
                  .join("")}
               </div>`
            : ""
        }

        <!-- SKILLS -->
        ${
          skills.length > 0
            ? `<div class="section-block">
                <div class="section-title">Skills</div>
                <div class="skills-list">
                  ${skills
                    .map(
                      (s) => `
                      <div class="skill-row">
                        <span class="skill-name-label">${s.skill || ""}</span>
                        ${
                          s.level
                            ? `<div class="skill-dots">${renderSkillDots(s.level)}</div>`
                            : ""
                        }
                      </div>`,
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
          finalize.languages.some((l) => l.name && l.name.trim() !== "")
            ? `<div class="section-block">
                <div class="section-title">Languages</div>
                <div class="skills-list">
                  ${finalize.languages
                    .filter((l) => l.name && l.name.trim() !== "")
                    .map(
                      (l) => `
                      <div class="lang-row">
                        <span class="lang-name">${l.name}</span>
                        ${
                          l.level
                            ? `<div class="skill-dots">${renderSkillDots(l.level)}</div>`
                            : ""
                        }
                      </div>`,
                    )
                    .join("")}
                </div>
               </div>`
            : ""
        }

        <!-- CERTIFICATIONS -->
        ${
          finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize.certificationsAndLicenses) &&
          finalize.certificationsAndLicenses.some(
            (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
          )
            ? `<div class="section-block">
                <div class="section-title">Certifications &amp; Licenses</div>
                <div class="additional-content">
                  ${finalize.certificationsAndLicenses
                    .filter(
                      (i) =>
                        i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
                    )
                    .map((i) => `<div class="additional-item">${i.name}</div>`)
                    .join("")}
                </div>
               </div>`
            : ""
        }

        <!-- HOBBIES -->
        ${
          finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize.hobbiesAndInterests) &&
          finalize.hobbiesAndInterests.some(
            (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
          )
            ? `<div class="section-block">
                <div class="section-title">Hobbies &amp; Interests</div>
                <div class="additional-content">
                  ${finalize.hobbiesAndInterests
                    .filter(
                      (i) =>
                        i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
                    )
                    .map((i) => `<div class="additional-item">${i.name}</div>`)
                    .join("")}
                </div>
               </div>`
            : ""
        }

        <!-- AWARDS -->
        ${
          finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize.awardsAndHonors) &&
          finalize.awardsAndHonors.some(
            (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
          )
            ? `<div class="section-block">
                <div class="section-title">Awards &amp; Honors</div>
                <div class="additional-content">
                  ${finalize.awardsAndHonors
                    .filter(
                      (i) =>
                        i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
                    )
                    .map((i) => `<div class="additional-item">${i.name}</div>`)
                    .join("")}
                </div>
               </div>`
            : ""
        }

        <!-- WEBSITES -->
        ${
          finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize.websitesAndSocialMedia) &&
          finalize.websitesAndSocialMedia.some(
            (i) =>
              (i.websiteUrl && i.websiteUrl.trim() !== "") ||
              (i.socialMedia && i.socialMedia.trim() !== ""),
          )
            ? `<div class="section-block">
                <div class="section-title">Websites &amp; Social Media</div>
                <div class="additional-content">
                  ${finalize.websitesAndSocialMedia
                    .filter((i) => i.websiteUrl || i.socialMedia)
                    .map(
                      (i) => `
                      <div class="additional-item">
                        ${i.websiteUrl ? `<div>Website: ${i.websiteUrl}</div>` : ""}
                        ${i.socialMedia ? `<div>Social Media: ${i.socialMedia}</div>` : ""}
                      </div>`,
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
            (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
          )
            ? `<div class="section-block">
                <div class="section-title">References</div>
                <div class="additional-content">
                  ${finalize.references
                    .filter(
                      (i) =>
                        i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
                    )
                    .map((i) => `<div class="additional-item">${i.name}</div>`)
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
            (s) => s?.name?.trim() || s?.description?.trim(),
          )
            ? finalize.customSection
                .filter((s) => s?.name?.trim() || s?.description?.trim())
                .map(
                  (s) => `
                  <div class="section-block">
                    ${s.name ? `<div class="section-title">${s.name}</div>` : ""}
                    ${s.description ? `<div class="custom-section-content">${s.description}</div>` : ""}
                  </div>`,
                )
                .join("")
            : ""
        }

      </div>
    </body>
    </html>
  `;
  };

  /* ======================================================
     PDF DOWNLOAD
  ====================================================== */
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

  const stripHtml = (html: string) =>
    html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

  /* ======================================================
     RENDER DOTS (React)
  ====================================================== */
  const SkillDots = ({
    level,
    total = 4,
  }: {
    level: number | string;
    total?: number;
  }) => (
    <div className="skill-dots">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`skill-dot${i < Number(level) ? " filled" : ""}`}
        />
      ))}
    </div>
  );

  /* ======================================================
     JSX PREVIEW
  ====================================================== */
  return (
    <div style={{ textAlign: "center", marginTop: 0 }}>
      {lastSegment === "download-resume" && (
        <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
          <button
            onClick={handleDownload}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Download Resume
          </button>
        </div>
      )}

      <div
        className="resume-container bg-white"
        style={{ margin: "0 auto", boxShadow: "0 0 10px rgba(0,0,0,0.08)" }}
      >
        <style>{styles}</style>

        {/* HEADER */}
        <div className="header-block">
          <div className="header-name">
            {contact?.firstName} {contact?.lastName}
          </div>
          <div className="header-jobtitle">
            {contact?.jobTitle
              ? typeof contact.jobTitle === "string"
                ? contact.jobTitle
                : (contact.jobTitle as any)?.name || ""
              : ""}
          </div>
          <div className="header-meta">
            {addressParts.length > 0 && (
              <span className="header-meta-item">{addressParts.join(", ")}</span>
            )}
            {contact?.email && (
              <span className="header-meta-item">{contact.email}</span>
            )}
            {contact?.phone && (
              <span className="header-meta-item">{contact.phone}</span>
            )}
            {linkedinUrl && (
              <span className="header-meta-item">
                <a
                  href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </span>
            )}
            {portfolioUrl && (
              <span className="header-meta-item">
                <a
                  href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio
                </a>
              </span>
            )}
          </div>
        </div>

        {/* SUMMARY */}
        {summary && (
          <div className="section-block">
            <div className="section-title">Profile</div>
            <div
              className="summary-text"
              dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
            />
          </div>
        )}

        {/* EXPERIENCE */}
        {experiences.length > 0 && (
          <div className="section-block">
            <div className="section-title">Experience</div>
            {experiences.map((exp, i) => (
              <div key={i} className="entry-block">
                <div className="entry-top-row">
                  <div className="entry-title">{exp.jobTitle}</div>
                  <div className="entry-date">
                    <MonthYearDisplay value={exp.startDate} shortYear />
                    {" – "}
                    {exp.endDate ? (
                      <MonthYearDisplay value={exp.endDate} shortYear />
                    ) : (
                      "Present"
                    )}
                  </div>
                </div>
                <div className="entry-subtitle">
                  {exp.employer}
                  {exp.location && <em> · {exp.location}</em>}
                </div>
                {exp.text && (
                  <div
                    className="entry-content entry-content-description"
                    dangerouslySetInnerHTML={{ __html: exp.text }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* EDUCATION */}
        {educations?.length > 0 && (
          <div className="section-block">
            <div className="section-title">Education</div>
            {educations.map((edu, index) => {
              let textContent = null;
              if (edu.text) {
                if (edu.text.includes("<") && edu.text.includes(">")) {
                  textContent = (
                    <div
                      className="edu-content"
                      dangerouslySetInnerHTML={{ __html: edu.text }}
                    />
                  );
                } else {
                  const lines = edu.text
                    .split("\n")
                    .filter((l: string) => l.trim() !== "");
                  if (lines.some((l: string) => l.trim().startsWith("-"))) {
                    textContent = (
                      <ul className="edu-list">
                        {lines.map((l: string, li: number) => {
                          const t = l.trim();
                          const c = t.startsWith("-") ? t.substring(1).trim() : t;
                          return c ? <li key={li}>{c}</li> : null;
                        })}
                      </ul>
                    );
                  } else {
                    textContent = (
                      <div className="edu-content" style={{ whiteSpace: "pre-wrap" }}>
                        {stripHtml(edu.text)}
                      </div>
                    );
                  }
                }
              }

              return (
                <div key={edu.id || index} className="entry-block">
                  <div className="entry-top-row">
                    <div className="entry-title">{edu.schoolname || ""}</div>
                    {(edu.startDate || edu.endDate) && (
                      <div className="entry-date">
                        {edu.startDate || ""}
                        {edu.startDate && edu.endDate && " – "}
                        {edu.endDate || ""}
                      </div>
                    )}
                  </div>
                  {(edu.degree || edu.location) && (
                    <div className="entry-subtitle">
                      {edu.degree && <span>{edu.degree}</span>}
                      {edu.location && (
                        <>
                          {edu.degree && <em> · </em>}
                          <em>{edu.location}</em>
                        </>
                      )}
                    </div>
                  )}
                  {textContent}
                </div>
              );
            })}
          </div>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="section-block">
            <div className="section-title">Skills</div>
            <div className="skills-list">
              {skills.map((skill, i) => (
                <div key={i} className="skill-row">
                  <span className="skill-name-label">{skill.skill}</span>
                  {skill.level && <SkillDots level={skill.level} />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LANGUAGES */}
        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize.languages) &&
          finalize.languages.some((l) => l.name && l.name.trim() !== "") && (
            <div className="section-block">
              <div className="section-title">Languages</div>
              <div className="skills-list">
                {finalize.languages.map(
                  (lang, index) =>
                    lang.name &&
                    lang.name.trim() !== "" && (
                      <div key={lang._id || index} className="lang-row">
                        <span className="lang-name">{lang.name}</span>
                        {lang.level && <SkillDots level={lang.level} />}
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

        {/* CERTIFICATIONS */}
        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize?.certificationsAndLicenses) &&
          finalize.certificationsAndLicenses.some(
            (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <div className="section-block">
              <div className="section-title">Certifications &amp; Licenses</div>
              <div className="additional-content">
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

        {/* HOBBIES */}
        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize?.hobbiesAndInterests) &&
          finalize.hobbiesAndInterests.some(
            (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <div className="section-block">
              <div className="section-title">Hobbies &amp; Interests</div>
              <div className="additional-content">
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

        {/* AWARDS */}
        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize?.awardsAndHonors) &&
          finalize.awardsAndHonors.some(
            (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <div className="section-block">
              <div className="section-title">Awards &amp; Honors</div>
              <div className="additional-content">
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

        {/* WEBSITES */}
        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize?.websitesAndSocialMedia) &&
          finalize.websitesAndSocialMedia.some(
            (i) =>
              (i.websiteUrl && i.websiteUrl.trim() !== "") ||
              (i.socialMedia && i.socialMedia.trim() !== ""),
          ) && (
            <div className="section-block">
              <div className="section-title">Websites &amp; Social Media</div>
              <div className="additional-content">
                {finalize.websitesAndSocialMedia.map(
                  (item, index) =>
                    (item.websiteUrl || item.socialMedia) && (
                      <div key={item.id || index} className="additional-item">
                        {item.websiteUrl && <div>Website: {item.websiteUrl}</div>}
                        {item.socialMedia && <div>Social Media: {item.socialMedia}</div>}
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

        {/* REFERENCES */}
        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize?.references) &&
          finalize.references.some(
            (i) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "",
          ) && (
            <div className="section-block">
              <div className="section-title">References</div>
              <div className="additional-content">
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

        {/* CUSTOM SECTIONS */}
        {finalize &&
          !Array.isArray(finalize) &&
          Array.isArray(finalize?.customSection) &&
          finalize.customSection.some(
            (s) => s?.name?.trim() || s?.description?.trim(),
          ) &&
          finalize.customSection
            .filter((s) => s?.name?.trim() || s?.description?.trim())
            .map((section, index) => (
              <div key={section.id || index} className="section-block">
                {section.name && (
                  <div className="section-title">{section.name}</div>
                )}
                {section.description && (
                  <div
                    className="custom-section-content"
                    dangerouslySetInnerHTML={{ __html: section.description }}
                  />
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default TemplateEight;