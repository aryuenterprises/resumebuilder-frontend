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

/* ======================================================
   DESIGN: Option C — Bold Editorial
   - Header: white background, large name, red accent underline
   - Two columns: LEFT 62% (summary + experience + education)
                  RIGHT 38% (skills + languages + extras)
   - Red accent color: #e53e3e
   - Section titles: bold uppercase red text
   - Entry bullet: red dot prefix
   - Skills: tag pills + progress bars
   All selectors scoped to .t19-resume — zero CSS leaks.
   No min-height inside .t19-resume — PDF stays 1 page.
====================================================== */
const styles = `
  .t19-resume {
    width: 210mm;
    padding: 0;
    box-sizing: border-box;
    background-color: #ffffff;
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 13px;
    line-height: 1.6;
    color: #2d3748;
  }

  .t19-resume * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── HEADER ── */
  .t19-header {
    background: #ffffff;
    padding: 22px 24px 0;
    border-bottom: 3px solid #e53e3e;
  }

  .t19-name {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 36px;
    font-weight: 800;
    color: #1a202c;
    letter-spacing: -0.02em;
    line-height: 1.1;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t19-jobtitle {
    font-size: 11px;
    font-weight: 600;
    color: #e53e3e;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-top: 3px;
    margin-bottom: 10px;
  }

  .t19-contact-row {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 16px;
    padding-bottom: 10px;
    align-items: center;
  }

  .t19-contact-item {
    font-size: 11px;
    color: #718096;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .t19-contact-sep {
    color: #e53e3e;
    font-size: 10px;
  }

  .t19-header-link {
    font-size: 11px;
    color: #e53e3e;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  /* ── BODY ── */
  .t19-body {
    display: flex;
    align-items: stretch;
  }

  /* ── LEFT COLUMN (62%) ── */
  .t19-left {
    width: 62%;
    padding: 18px 20px 20px 24px;
    border-right: 1px solid #fed7d7;
    background: #ffffff;
  }

  /* ── RIGHT COLUMN (38%) ── */
  .t19-right {
    width: 38%;
    padding: 18px 20px 20px 16px;
    background: #fff5f5;
  }

  /* ── SECTION TITLES ── */
  .t19-stitle-l {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: #e53e3e;
    margin-top: 16px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .t19-stitle-l:first-child {
    margin-top: 0;
  }

  .t19-stitle-l::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #fed7d7;
  }

  .t19-stitle-r {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: #e53e3e;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .t19-stitle-r:first-child {
    margin-top: 0;
  }

  .t19-stitle-r::after {
    content: '';
    display: block;
    height: 1.5px;
    background: #fed7d7;
    margin-top: 4px;
  }

  /* ── SUMMARY ── */
  .t19-summary {
    font-size: 12.5px;
    color: #4a5568;
    line-height: 1.7;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t19-summary p { margin: 0 !important; padding: 0 !important; line-height: 1.7 !important; }

  /* ── ENTRY ── */
  .t19-entry {
    margin-bottom: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid #fff0f0;
  }

  .t19-entry:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  .t19-entry-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
  }

  .t19-entry-title-wrap {
    display: flex;
    align-items: baseline;
    gap: 6px;
    flex: 1;
  }

  .t19-dot {
    width: 7px;
    height: 7px;
    background: #e53e3e;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 4px;
  }

  .t19-entry-title {
    font-size: 13px;
    font-weight: 700;
    color: #1a202c;
    line-height: 1.3;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t19-entry-date {
    font-size: 10px;
    color: #a0aec0;
    white-space: nowrap;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .t19-entry-sub {
    font-size: 11px;
    color: #718096;
    margin-top: 2px;
    margin-left: 13px;
    font-style: italic;
  }

  .t19-entry-content {
    font-size: 12px;
    color: #4a5568;
    line-height: 1.6;
    margin-top: 5px;
    margin-left: 13px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t19-entry-content p  { margin: 0 !important; padding: 0 !important; line-height: 1.6 !important; }
  .t19-entry-content ul { list-style-type: disc !important; padding-left: 16px !important; margin: 3px 0 0 !important; }
  .t19-entry-content ol { list-style-type: decimal !important; padding-left: 16px !important; margin: 3px 0 0 !important; }
  .t19-entry-content li { margin: 0 !important; padding: 0 !important; line-height: 1.6 !important; margin-bottom: 2px !important; }

  /* ── SKILLS (right sidebar) ── */
  .t19-skill-item {
    margin-bottom: 8px;
  }

  .t19-skill-name {
    font-size: 12px;
    color: #2d3748;
    font-weight: 500;
    margin-bottom: 3px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t19-bar-track {
    height: 3px;
    background: #fed7d7;
    border-radius: 9999px;
    overflow: hidden;
  }

  .t19-bar-fill {
    height: 100%;
    background: #e53e3e;
    border-radius: 9999px;
  }

  /* ── TAGS (certs, hobbies) ── */
  .t19-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .t19-tag {
    display: inline-block;
    background: #fed7d7;
    color: #c53030;
    font-size: 10px;
    font-weight: 500;
    padding: 2px 7px;
    border-radius: 3px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* ── EXTRA (plain text list) ── */
  .t19-extra-item {
    font-size: 12px;
    color: #4a5568;
    padding: 3px 0;
    border-bottom: 1px dotted #fed7d7;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .t19-extra-item:last-child {
    border-bottom: none;
  }

  /* ── WEBSITES ── */
  .t19-website-item {
    margin-bottom: 6px;
  }

  .t19-website-label {
    font-size: 10px;
    font-weight: 700;
    color: #c53030;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .t19-website-link {
    font-size: 11px;
    color: #c53030;
    text-decoration: underline;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* ── PRINT ── */
  @media print {
    @page { size: A4; margin: 0; }
    .t19-resume {
      width: 100% !important;
      box-shadow: none !important;
    }
    .t19-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .t19-right  { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .t19-entry  { page-break-inside: avoid; break-inside: avoid; }
    .t19-stitle-l, .t19-stitle-r { page-break-after: avoid; break-after: avoid; }
  }
`;

const TemplateNineteen: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const contact = alldata?.contact || context?.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills || context?.skills || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";

  const languages = Array.isArray(finalize?.languages)
    ? finalize.languages
    : [];
  const certificationsAndLicenses = Array.isArray(
    finalize?.certificationsAndLicenses,
  )
    ? finalize.certificationsAndLicenses
    : [];
  const hobbiesAndInterests = Array.isArray(finalize?.hobbiesAndInterests)
    ? finalize.hobbiesAndInterests
    : [];
  const awardsAndHonors = Array.isArray(finalize?.awardsAndHonors)
    ? finalize.awardsAndHonors
    : [];
  const websitesAndSocialMedia = Array.isArray(finalize?.websitesAndSocialMedia)
    ? finalize.websitesAndSocialMedia
    : [];
  const references = Array.isArray(finalize?.references)
    ? finalize.references
    : [];
  const customSection = Array.isArray(finalize?.customSection)
    ? finalize.customSection
    : [];

  const skillPct = (level: number | null | undefined) =>
    `${((Number(level) || 0) / 5) * 100}%`;

  const hasText = (v?: string | null) => !!v?.replace(/<[^>]*>/g, "").trim();

  const fmtDate = (val?: string | null, short = true): string => {
    if (!val) return "";
    try {
      return formatMonthYear(val, short);
    } catch {
      return val;
    }
  };

  const jobTitle = contact?.jobTitle
    ? typeof contact.jobTitle === "string"
      ? contact.jobTitle
      : (contact.jobTitle as any)?.name || ""
    : "";

  const contactItems = [
    contact?.email,
    contact?.phone,
    [contact?.address, contact?.city, contact?.postcode, contact?.country]
      .filter(Boolean)
      .join(", ") || null,
  ].filter(Boolean) as string[];

  /* ======================================================
     HTML GENERATION — uses same `styles` string as preview
  ====================================================== */
  const generateHTML = () => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
  <style>
    body { margin: 0; padding: 0; background: white; }
    ${styles}
  </style>
</head>
<body>
<div class="t19-resume">

  <!-- HEADER -->
  <div class="t19-header">
    <div class="t19-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
    ${jobTitle ? `<div class="t19-jobtitle">${jobTitle}</div>` : ""}
    <div class="t19-contact-row">
      ${contactItems
        .map(
          (item, i) => `
        ${i > 0 ? `<span class="t19-contact-sep">·</span>` : ""}
        <span class="t19-contact-item">${item}</span>
      `,
        )
        .join("")}
      ${
        contact?.linkedin?.trim()
          ? `
        <span class="t19-contact-sep">·</span>
        <a href="${contact.linkedin.startsWith("http") ? contact.linkedin : `https://${contact.linkedin}`}" class="t19-header-link">LinkedIn</a>
      `
          : ""
      }
      ${
        contact?.portfolio?.trim()
          ? `
        <span class="t19-contact-sep">·</span>
        <a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" class="t19-header-link">Portfolio</a>
      `
          : ""
      }
    </div>
  </div>

  <!-- BODY -->
  <div class="t19-body">

    <!-- LEFT COLUMN -->
    <div class="t19-left">

      ${
        summary
          ? `
      <div class="t19-stitle-l">Summary</div>
      <div class="t19-summary">${summary.replace(/<[^>]*>/g, "")}</div>`
          : ""
      }

      ${
        experiences.length > 0
          ? `
      <div class="t19-stitle-l">Experience</div>
      ${experiences
        .map((exp) => {
          const start = fmtDate(exp.startDate);
          const end = exp.endDate
            ? fmtDate(exp.endDate)
            : exp.startDate
              ? "Present"
              : "";
          return `
      <div class="t19-entry">
        <div class="t19-entry-top">
          <div class="t19-entry-title-wrap">
            <div class="t19-dot"></div>
            <div class="t19-entry-title">${exp.jobTitle || ""}</div>
          </div>
          ${start || end ? `<div class="t19-entry-date">${start}${start && end ? " – " : ""}${end}</div>` : ""}
        </div>
        ${exp.employer || exp.location ? `<div class="t19-entry-sub">${[exp.employer, exp.location].filter(Boolean).join(" · ")}</div>` : ""}
        ${exp.text ? `<div class="t19-entry-content">${exp.text.replace(/<[^>]*>/g, "")}</div>` : ""}
      </div>`;
        })
        .join("")}`
          : ""
      }

      ${
        educations.length > 0
          ? `
      <div class="t19-stitle-l">Education</div>
      ${educations
        .map(
          (edu) => `
      <div class="t19-entry">
        <div class="t19-entry-top">
          <div class="t19-entry-title-wrap">
            <div class="t19-dot"></div>
            <div class="t19-entry-title">${edu.schoolname || ""}</div>
          </div>
          ${edu.startDate || edu.endDate ? `<div class="t19-entry-date">${[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}</div>` : ""}
        </div>
        ${edu.degree || edu.location ? `<div class="t19-entry-sub">${[edu.degree, edu.location].filter(Boolean).join(" · ")}</div>` : ""}
        ${edu.text ? `<div class="t19-entry-content">${edu.text.replace(/<[^>]*>/g, "")}</div>` : ""}
      </div>`,
        )
        .join("")}`
          : ""
      }

      ${
        websitesAndSocialMedia.filter(
          (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
        ).length > 0
          ? `
      <div class="t19-stitle-l">Websites and Social Media</div>
      ${websitesAndSocialMedia
        .filter((i) => i.websiteUrl?.trim() || i.socialMedia?.trim())
        .map(
          (i) => `
      <div class="t19-website-item">
        ${i.websiteUrl ? `<div class="t19-website-label">Website</div><a href="${i.websiteUrl.startsWith("http") ? i.websiteUrl : `https://${i.websiteUrl}`}" class="t19-website-link">${i.websiteUrl}</a>` : ""}
        ${i.socialMedia ? `<div class="t19-website-label" style="margin-top:4px">Social Media</div><a href="${i.socialMedia.startsWith("http") ? i.socialMedia : `https://${i.socialMedia}`}" class="t19-website-link">${i.socialMedia}</a>` : ""}
      </div>`,
        )
        .join("")}`
          : ""
      }

      ${customSection
        .filter((s) => s?.name?.trim() || s?.description?.trim())
        .map(
          (s) => `
      ${s.name ? `<div class="t19-stitle-l">${s.name}</div>` : ""}
      ${s.description ? `<div class="t19-summary">${s.description.replace(/<[^>]*>/g, "")}</div>` : ""}`,
        )
        .join("")}

    </div>

    <!-- RIGHT COLUMN -->
    <div class="t19-right">

      ${
        skills.filter((s) => s.skill?.trim()).length > 0
          ? `
      <div class="t19-stitle-r">Skills</div>
      ${skills
        .filter((s) => s.skill?.trim())
        .map(
          (skill) => `
      <div class="t19-skill-item">
        <div class="t19-skill-name">${skill.skill}</div>
        ${skill.level ? `<div class="t19-bar-track"><div class="t19-bar-fill" style="width:${skillPct(Number(skill.level))}"></div></div>` : ""}
      </div>`,
        )
        .join("")}`
          : ""
      }

      ${
        languages.filter((l) => l.name?.trim()).length > 0
          ? `
      <div class="t19-stitle-r">Languages</div>
      ${languages
        .filter((l) => l.name?.trim())
        .map(
          (lang) => `
      <div class="t19-skill-item">
        <div class="t19-skill-name">${lang.name}</div>
        ${lang.level ? `<div class="t19-bar-track"><div class="t19-bar-fill" style="width:${skillPct(Number(lang.level))}"></div></div>` : ""}
      </div>`,
        )
        .join("")}`
          : ""
      }

      ${
        certificationsAndLicenses.filter((i) => hasText(i.name)).length > 0
          ? `
      <div class="t19-stitle-r">Certifications</div>
      ${certificationsAndLicenses
        .filter((i) => hasText(i.name))
        .map(
          (i) => `
      <div class="t19-extra-item">${i.name?.replace(/<[^>]*>/g, "")}</div>`,
        )
        .join("")}`
          : ""
      }

      ${
        hobbiesAndInterests.filter((i) => hasText(i.name)).length > 0
          ? `
      <div class="t19-stitle-r">Hobbies</div>
      <div class="t19-tags">
        ${hobbiesAndInterests
          .filter((i) => hasText(i.name))
          .map(
            (i) =>
              `<span class="t19-tag">${i.name?.replace(/<[^>]*>/g, "")}</span>`,
          )
          .join("")}
      </div>`
          : ""
      }

      ${
        awardsAndHonors.filter((i) => hasText(i.name)).length > 0
          ? `
      <div class="t19-stitle-r">Awards</div>
      ${awardsAndHonors
        .filter((i) => hasText(i.name))
        .map(
          (i) => `
      <div class="t19-extra-item">${i.name?.replace(/<[^>]*>/g, "")}</div>`,
        )
        .join("")}`
          : ""
      }

      ${
        references.filter((i) => hasText(i.name)).length > 0
          ? `
      <div class="t19-stitle-r">References</div>
      ${references
        .filter((i) => hasText(i.name))
        .map(
          (i) => `
      <div class="t19-extra-item">${i.name?.replace(/<[^>]*>/g, "")}</div>`,
        )
        .join("")}`
          : ""
      }

    </div>
  </div>
</div>
</body>
</html>`;

  /* ======================================================
     PDF DOWNLOAD + upload after download
  ====================================================== */
  const UseContext = useContext(CreateContext);
  const Contactid = UseContext?.contact?.contactId;
  const userDetails = getLocalStorage<User>("user_details");
  const userId = userDetails?.id;

  const fetchOldResumeData = async (pdfBlob: Blob): Promise<void> => {
    if (!userId || !Contactid) return;
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("message", "success");
      formData.append("contactId", Contactid);
      formData.append("resume", pdfBlob, "resume.pdf");
      await axios.post(`${API_URL}/api/users/download-resume`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleDownload = async (): Promise<void> => {
    try {
      const html = generateHTML();
      const res: AxiosResponse<Blob> = await axios.post(
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
      await fetchOldResumeData(res.data);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  /* ======================================================
     JSX PREVIEW — identical classes to generateHTML
  ====================================================== */
  return (
    <>
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
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Download Resume
          </button>
        </div>
      )}

      {/* minHeight on outer wrapper only — A4 preview in browser, not forced in PDF */}
      <div
        style={{
          margin: "0 auto",
          width: "210mm",
          minHeight: "297mm",
          boxShadow: "0 0 12px rgba(0,0,0,0.1)",
        }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&family=DM+Sans:wght@400;500;600&display=swap');`}</style>
        <style>{styles}</style>

        <div className="t19-resume">
          {/* HEADER */}
          <div className="t19-header">
            <div className="t19-name">
              {contact?.firstName || ""} {contact?.lastName || ""}
            </div>
            {jobTitle && <div className="t19-jobtitle">{jobTitle}</div>}
            <div className="t19-contact-row">
              {contactItems.map((item, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="t19-contact-sep">·</span>}
                  <span className="t19-contact-item">{item}</span>
                </React.Fragment>
              ))}
              {contact?.linkedin?.trim() && (
                <>
                  <span className="t19-contact-sep">·</span>
                  <a
                    href={
                      contact.linkedin.startsWith("http")
                        ? contact.linkedin
                        : `https://${contact.linkedin}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="t19-header-link"
                  >
                    LinkedIn
                  </a>
                </>
              )}
              {contact?.portfolio?.trim() && (
                <>
                  <span className="t19-contact-sep">·</span>
                  <a
                    href={
                      contact.portfolio.startsWith("http")
                        ? contact.portfolio
                        : `https://${contact.portfolio}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="t19-header-link"
                  >
                    Portfolio
                  </a>
                </>
              )}
            </div>
          </div>

          {/* BODY */}
          <div className="t19-body">
            {/* LEFT COLUMN */}
            <div className="t19-left">
              {summary && (
                <>
                  <div className="t19-stitle-l">Summary</div>
                  <div
                    className="t19-summary"
                    dangerouslySetInnerHTML={{ __html: summary }}
                  />
                </>
              )}

              {experiences.length > 0 && (
                <>
                  <div className="t19-stitle-l">Experience</div>
                  {experiences.map((exp, i) => {
                    const start = fmtDate(exp.startDate);
                    const end = exp.endDate
                      ? fmtDate(exp.endDate)
                      : exp.startDate
                        ? "Present"
                        : "";
                    return (
                      <div key={exp.id || i} className="t19-entry">
                        <div className="t19-entry-top">
                          <div className="t19-entry-title-wrap">
                            <div className="t19-dot" />
                            <div className="t19-entry-title">
                              {exp.jobTitle || ""}
                            </div>
                          </div>
                          {(start || end) && (
                            <div className="t19-entry-date">
                              {start}
                              {start && end ? " – " : ""}
                              {end}
                            </div>
                          )}
                        </div>
                        {(exp.employer || exp.location) && (
                          <div className="t19-entry-sub">
                            {[exp.employer, exp.location]
                              .filter(Boolean)
                              .join(" · ")}
                          </div>
                        )}
                        {exp.text && (
                          <div
                            className="t19-entry-content"
                            dangerouslySetInnerHTML={{ __html: exp.text }}
                          />
                        )}
                      </div>
                    );
                  })}
                </>
              )}

              {educations.length > 0 && (
                <>
                  <div className="t19-stitle-l">Education</div>
                  {educations.map((edu, i) => (
                    <div key={edu.id || i} className="t19-entry">
                      <div className="t19-entry-top">
                        <div className="t19-entry-title-wrap">
                          <div className="t19-dot" />
                          <div className="t19-entry-title">
                            {edu.schoolname || ""}
                          </div>
                        </div>
                        {(edu.startDate || edu.endDate) && (
                          <div className="t19-entry-date">
                            {[edu.startDate, edu.endDate]
                              .filter(Boolean)
                              .join(" – ")}
                          </div>
                        )}
                      </div>
                      {(edu.degree || edu.location) && (
                        <div className="t19-entry-sub">
                          {[edu.degree, edu.location]
                            .filter(Boolean)
                            .join(" · ")}
                        </div>
                      )}
                      {edu.text && (
                        <div
                          className="t19-entry-content"
                          dangerouslySetInnerHTML={{ __html: edu.text }}
                        />
                      )}
                    </div>
                  ))}
                </>
              )}

              {websitesAndSocialMedia.filter(
                (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
              ).length > 0 && (
                <>
                  <div className="t19-stitle-l">Websites and Social Media</div>
                  {websitesAndSocialMedia
                    .filter(
                      (i) => i.websiteUrl?.trim() || i.socialMedia?.trim(),
                    )
                    .map((item, i) => (
                      <div
                        key={(item as any).id || i}
                        className="t19-website-item"
                      >
                        {item.websiteUrl && (
                          <div>
                            <div className="t19-website-label">Website</div>
                            <a
                              href={
                                item.websiteUrl.startsWith("http")
                                  ? item.websiteUrl
                                  : `https://${item.websiteUrl}`
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="t19-website-link"
                            >
                              {item.websiteUrl}
                            </a>
                          </div>
                        )}
                        {item.socialMedia && (
                          <div style={{ marginTop: "4px" }}>
                            <div className="t19-website-label">
                              Social Media
                            </div>
                            <a
                              href={
                                item.socialMedia.startsWith("http")
                                  ? item.socialMedia
                                  : `https://${item.socialMedia}`
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="t19-website-link"
                            >
                              {item.socialMedia}
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                </>
              )}

              {customSection
                .filter((s) => s?.name?.trim() || s?.description?.trim())
                .map((section, i) => (
                  <div key={(section as any).id || i}>
                    {section.name && (
                      <div className="t19-stitle-l">{section.name}</div>
                    )}
                    {section.description && (
                      <div
                        className="t19-summary"
                        dangerouslySetInnerHTML={{
                          __html: section.description,
                        }}
                      />
                    )}
                  </div>
                ))}
            </div>

            {/* RIGHT COLUMN */}
            <div className="t19-right">
              {skills.filter((s) => s.skill?.trim()).length > 0 && (
                <>
                  <div className="t19-stitle-r">Skills</div>
                  {skills
                    .filter((s) => s.skill?.trim())
                    .map((skill, i) => (
                      <div key={skill.id || i} className="t19-skill-item">
                        <div className="t19-skill-name">{skill.skill}</div>
                        {skill.level && (
                          <div className="t19-bar-track">
                            <div
                              className="t19-bar-fill"
                              style={{ width: skillPct(Number(skill.level)) }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </>
              )}

              {languages.filter((l) => l.name?.trim()).length > 0 && (
                <>
                  <div className="t19-stitle-r">Languages</div>
                  {languages
                    .filter((l) => l.name?.trim())
                    .map((lang, i) => (
                      <div
                        key={(lang as any)._id || i}
                        className="t19-skill-item"
                      >
                        <div className="t19-skill-name">{lang.name}</div>
                        {lang.level && (
                          <div className="t19-bar-track">
                            <div
                              className="t19-bar-fill"
                              style={{ width: skillPct(Number(lang.level)) }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </>
              )}

              {certificationsAndLicenses.filter((i) => hasText(i.name)).length >
                0 && (
                <>
                  <div className="t19-stitle-r">Certifications</div>
                  {certificationsAndLicenses
                    .filter((i) => hasText(i.name))
                    .map((item, i) => (
                      <div
                        key={(item as any).id || i}
                        className="t19-extra-item"
                        dangerouslySetInnerHTML={{ __html: item.name || "" }}
                      />
                    ))}
                </>
              )}

              {hobbiesAndInterests.filter((i) => hasText(i.name)).length >
                0 && (
                <>
                  <div className="t19-stitle-r">Hobbies</div>
                  <div className="t19-tags">
                    {hobbiesAndInterests
                      .filter((i) => hasText(i.name))
                      .map((item, i) => (
                        <span
                          key={(item as any).id || i}
                          className="t19-tag"
                          dangerouslySetInnerHTML={{
                            __html: item.name?.replace(/<[^>]*>/g, "") || "",
                          }}
                        />
                      ))}
                  </div>
                </>
              )}

              {awardsAndHonors.filter((i) => hasText(i.name)).length > 0 && (
                <>
                  <div className="t19-stitle-r">Awards</div>
                  {awardsAndHonors
                    .filter((i) => hasText(i.name))
                    .map((item, i) => (
                      <div
                        key={(item as any).id || i}
                        className="t19-extra-item"
                        dangerouslySetInnerHTML={{ __html: item.name || "" }}
                      />
                    ))}
                </>
              )}

              {references.filter((i) => hasText(i.name)).length > 0 && (
                <>
                  <div className="t19-stitle-r">References</div>
                  {references
                    .filter((i) => hasText(i.name))
                    .map((item, i) => (
                      <div
                        key={(item as any).id || i}
                        className="t19-extra-item"
                        dangerouslySetInnerHTML={{ __html: item.name || "" }}
                      />
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateNineteen;
