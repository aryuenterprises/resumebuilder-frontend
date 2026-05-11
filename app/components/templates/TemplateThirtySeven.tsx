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

const TemplateThirtySeven: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const contact = alldata?.contact || context?.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills?.text || context?.skills.text || "";
  const projects = alldata?.projects || context?.projects || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";

  const linkedinUrl = contact?.linkedIn;
  const portfolioUrl = contact?.portfolio;
  const githubUrl = contact?.github;
  const dateOfBirth = contact?.dob;

  /* ══════════════════════════════════════════
     CSS
  ══════════════════════════════════════════ */
  const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Sora:wght@400;600;700&display=swap');

.t37-resume {
  width: 210mm;
  min-height: 297mm;
  box-sizing: border-box;
  background: #ffffff;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 13px;
  line-height: 1.55;
  color: #0f172a;
  padding: 32px 36px 36px;
}

.t37-resume.is-preview {
  transform: scale(0.36);
  transform-origin: top left;
  width: 210mm;
  height: auto;
  max-height: none;
  min-height: auto;
  overflow: hidden;
}

/* ── HEADER ── */
.t37-resume .t37-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 18px;
  border-bottom: 1.5px solid #e2e8f0;
}

.t37-resume .t37-name {
  font-family: 'Sora', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.8px;
  line-height: 1.1;
  margin-bottom: 4px;
}

.t37-resume .t37-job-title {
  font-size: 13px;
  font-weight: 500;
  color: #3b82f6;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.t37-resume .t37-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
}

.t37-resume .t37-chip {
  font-size: 11px;
  font-weight: 400;
  color: #475569;
  background: #f1f5f9;
  border: 0.5px solid #cbd5e1;
  border-radius: 20px;
  padding: 3px 10px;
  white-space: nowrap;
}

.t37-resume .t37-chip a {
  color: inherit;
  text-decoration: none;
}

/* ── BODY ── */
.t37-resume .t37-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── SECTION ── */
.t37-resume .t37-section {
  break-inside: avoid;
  page-break-inside: avoid;
}

.t37-resume .t37-section-heading {
  font-family: 'Sora', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: #0f172a;
  margin-bottom: 12px;
}

/* ── SUMMARY (no timeline) ── */
.t37-resume .t37-summary {
  font-size: 13px;
  color: #475569;
  line-height: 1.7;
}
.t37-resume .t37-summary p { margin: 0 0 5px 0 !important; }

/* ── SKILLS (no timeline) ── */
.t37-resume .t37-skills-content {
  font-size: 13px;
  color: #475569;
  line-height: 1.65;
}
.t37-resume .t37-skills-content p { margin: 0 0 5px 0 !important; }
.t37-resume .t37-skills-content ul, .t37-resume .t37-skills-content ol {
  margin: 5px 0 5px 18px !important;
  padding: 0 !important;
}
.t37-resume .t37-skills-content li { margin-bottom: 3px !important; line-height: 1.55 !important; }
.t37-resume .t37-skills-content strong { font-weight: 600 !important; }

/* ── TIMELINE ── */
.t37-resume .t37-timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.t37-resume .t37-tl-item {
  display: flex;
  gap: 14px;
  break-inside: avoid;
  page-break-inside: avoid;
}

/* dot + line column */
.t37-resume .t37-tl-track {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 14px;
}

.t37-resume .t37-tl-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3b82f6;
  flex-shrink: 0;
  margin-top: 4px;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1.5px #3b82f6;
}

.t37-resume .t37-tl-line {
  width: 1.5px;
  flex: 1;
  background: #e2e8f0;
  margin-top: 3px;
  margin-bottom: 3px;
  min-height: 10px;
}

/* content column */
.t37-resume .t37-tl-content {
  flex: 1;
  padding-bottom: 16px;
}

.t37-resume .t37-tl-item:last-child .t37-tl-content {
  padding-bottom: 0;
}

.t37-resume .t37-tl-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 1px;
}

.t37-resume .t37-tl-title {
  font-family: 'Sora', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.3;
}

.t37-resume .t37-tl-date {
  font-size: 11px;
  font-weight: 500;
  color: #3b82f6;
  white-space: nowrap;
  flex-shrink: 0;
  background: #eff6ff;
  padding: 1px 8px;
  border-radius: 10px;
}

.t37-resume .t37-tl-subtitle {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 5px;
  font-weight: 400;
}

.t37-resume .t37-tl-body {
  font-size: 12.5px;
  color: #475569;
  line-height: 1.65;
}
.t37-resume .t37-tl-body p { margin: 0 0 4px 0 !important; }
.t37-resume .t37-tl-body ul, .t37-resume .t37-tl-body ol {
  margin: 5px 0 5px 16px !important;
  padding: 0 !important;
}
.t37-resume .t37-tl-body li { margin-bottom: 3px !important; line-height: 1.55 !important; }
.t37-resume .t37-tl-body strong { font-weight: 600 !important; }
.t37-resume .t37-tl-body em { font-style: italic !important; }

/* ── PROJECT / TECH ── */
.t37-resume .t37-proj-links {
  display: flex;
  gap: 8px;
  margin-bottom: 5px;
}
.t37-resume .t37-proj-link {
  font-size: 10.5px;
  color: #3b82f6;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.t37-resume .t37-tech-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 6px;
}
.t37-resume .t37-tech-chip {
  font-size: 10px;
  background: #eff6ff;
  color: #1d4ed8;
  border-radius: 3px;
  padding: 1px 6px;
  font-weight: 500;
}

/* ── GRADE ── */
.t37-resume .t37-grade {
  display: inline-block;
  font-size: 10.5px;
  color: #3b82f6;
  background: #eff6ff;
  padding: 1px 7px;
  border-radius: 8px;
  margin-left: 6px;
  font-weight: 500;
}

/* ── TWO-COL GRID for Skills+Education ── */
.t37-resume .t37-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* ── PRINT ── */
@media print {
  @page { size: A4; margin: 0mm !important; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  body { margin: 0; padding: 0; }
  .t37-resume { width: 100%; box-shadow: none; }
  .t37-tl-item { break-inside: avoid; page-break-inside: avoid; }
  .t37-section { break-inside: avoid; page-break-inside: avoid; }
}
`;

  /* ══════════════════════════════════════════
     HTML GENERATION
  ══════════════════════════════════════════ */
  const generateHTML = () => {
    const formattedDob = formatDateOfBirth(dateOfBirth || "");
    const addressParts = [contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean);
    const jobTitleStr = typeof contact?.jobTitle === "string" ? contact.jobTitle : (contact?.jobTitle as any)?.name || "";

    const renderRich = (text: string, cls: string) => {
      if (!text) return "";
      const c = cleanQuillHTML(text);
      if (c.includes("<") && c.includes(">")) return `<div class="${cls}">${c}</div>`;
      const lines = c.split("\n").filter((l) => l.trim());
      if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•"))) {
        return `<div class="${cls}"><ul>${lines.map((l) => { const t = l.trim(); const v = t.startsWith("-") || t.startsWith("•") ? t.slice(1).trim() : t; return v ? `<li>${v}</li>` : ""; }).join("")}</ul></div>`;
      }
      return `<div class="${cls}" style="white-space:pre-wrap">${c.replace(/<[^>]+>/g, "")}</div>`;
    };

    const chip = (label: string, href?: string) => {
      const inner = href ? `<a href="${href.startsWith("http") ? href : `https://${href}`}" style="color:inherit;text-decoration:none;">${label}</a>` : label;
      return `<span class="t37-chip">${inner}</span>`;
    };

    const chips = [
      contact?.email ? chip(contact.email) : "",
      contact?.phone ? chip(contact.phone) : "",
      formattedDob ? chip(formattedDob) : "",
      addressParts.length ? chip(addressParts.join(", ")) : "",
      linkedinUrl ? chip("LinkedIn", linkedinUrl) : "",
      githubUrl ? chip("GitHub", githubUrl) : "",
      portfolioUrl ? chip("Portfolio", portfolioUrl) : "",
    ].filter(Boolean).join("");

    const skillsClean = cleanQuillHTML(skills);
    const hasSkills = skills && skillsClean && skillsClean !== "<p><br></p>";

    const tlItem = (title: string, subtitle: string, date: string, bodyHtml: string, extraMeta = "", isLast = false) => `
      <div class="t37-tl-item">
        <div class="t37-tl-track">
          <div class="t37-tl-dot"></div>
          ${!isLast ? `<div class="t37-tl-line"></div>` : ""}
        </div>
        <div class="t37-tl-content">
          <div class="t37-tl-header">
            <div class="t37-tl-title">${title}</div>
            ${date ? `<div class="t37-tl-date">${date}</div>` : ""}
          </div>
          ${subtitle ? `<div class="t37-tl-subtitle">${subtitle}</div>` : ""}
          ${extraMeta}
          ${bodyHtml}
        </div>
      </div>`;

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Sora:wght@400;600;700&display=swap" rel="stylesheet"/>
  <style>${styles}</style>
</head>
<body style="margin:0;padding:0;background:#fff;">
<div class="t37-resume">

  <div class="t37-header">
    <div class="t37-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
    <div class="t37-job-title">${jobTitleStr}</div>
    <div class="t37-chips">${chips}</div>
  </div>

  <div class="t37-body">

    ${summary ? `<div class="t37-section">
      <div class="t37-section-heading">Summary</div>
      <div class="t37-summary">${cleanQuillHTML(summary.replace(/\n/g, "<br>"))}</div>
    </div>` : ""}

    ${experiences.length > 0 ? `<div class="t37-section">
      <div class="t37-section-heading">Experience</div>
      <div class="t37-timeline">
        ${experiences.map((exp, i) => {
          const s = formatMonthYear(exp.startDate, false);
          const e = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
          return tlItem(
            exp.jobTitle || "",
            `${exp.employer || ""}${exp.location ? ` &mdash; ${exp.location}` : ""}`,
            `${s} &ndash; ${e}`,
            exp.text ? renderRich(exp.text, "t37-tl-body") : "",
            "",
            i === experiences.length - 1
          );
        }).join("")}
      </div>
    </div>` : ""}

    ${projects.length > 0 ? `<div class="t37-section">
      <div class="t37-section-heading">Projects</div>
      <div class="t37-timeline">
        ${projects.map((p: any, i: number) => {
          const links = (p.liveUrl || p.githubUrl) ? `<div class="t37-proj-links">
            ${p.liveUrl ? `<a href="${p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`}" class="t37-proj-link">Live Demo</a>` : ""}
            ${p.githubUrl ? `<a href="${p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`}" class="t37-proj-link">GitHub</a>` : ""}
          </div>` : "";
          const tech = p.techStack && p.techStack.length ? `<div class="t37-tech-wrap">${p.techStack.map((t: string) => `<span class="t37-tech-chip">${t}</span>`).join("")}</div>` : "";
          return tlItem(
            p.title || "", "", "",
            p.description ? renderRich(p.description, "t37-tl-body") : "",
            links + tech,
            i === projects.length - 1
          );
        }).join("")}
      </div>
    </div>` : ""}

    <div class="t37-two-col">
      ${educations.length > 0 ? `<div class="t37-section">
        <div class="t37-section-heading">Education</div>
        <div class="t37-timeline">
          ${educations.map((edu, i) => {
            const g = formatGradeToCgpdAndPercentage(edu.grade || "");
            const dateStr = edu.startDate || edu.endDate ? `${edu.startDate || ""} &ndash; ${edu.endDate || "Present"}` : "";
            return tlItem(
              edu.degree || "",
              [edu.schoolname, edu.location].filter(Boolean).join(" &mdash; "),
              dateStr,
              edu.text ? renderRich(edu.text, "t37-tl-body") : "",
              g ? `<span class="t37-grade">${g}</span>` : "",
              i === educations.length - 1
            );
          }).join("")}
        </div>
      </div>` : ""}

      ${hasSkills ? `<div class="t37-section">
        <div class="t37-section-heading">Skills</div>
        <div class="t37-skills-content">${skillsClean}</div>
      </div>` : ""}
    </div>

    ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim())
      ? finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim()).map((s: any) => `
        <div class="t37-section">
          ${s.name ? `<div class="t37-section-heading">${s.name}</div>` : ""}
          ${s.description ? `<div class="t37-skills-content">${cleanQuillHTML(s.description)}</div>` : ""}
        </div>`).join("")
      : ""}

  </div>
</div>
</body>
</html>`;
  };

  /* ══════════════════════════════════════════
     DOWNLOAD
  ══════════════════════════════════════════ */
  const handleDownload = async (): Promise<void> => {
    try {
      const html = generateHTML();
      const res: AxiosResponse<Blob> = await axios.post(`${API_URL}/api/candidates/generate-pdf`, { html }, { responseType: "blob" });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF error", e);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  /* ══════════════════════════════════════════
     JSX PREVIEW
  ══════════════════════════════════════════ */
  const formattedDob = formatDateOfBirth(dateOfBirth || "");
  const addressParts = [contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean);
  const jobTitleStr = contact?.jobTitle ? (typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || "") : "";
  const skillsClean = cleanQuillHTML(skills);
  const hasSkills = skills && skillsClean && skillsClean !== "<p><br></p>";

  const TlItem: React.FC<{ title: string; subtitle?: string; date?: string; isLast?: boolean; children?: React.ReactNode; extraMeta?: React.ReactNode }> = ({ title, subtitle, date, isLast = false, children, extraMeta }) => (
    <div className="t37-tl-item">
      <div className="t37-tl-track">
        <div className="t37-tl-dot" />
        {!isLast && <div className="t37-tl-line" />}
      </div>
      <div className="t37-tl-content">
        <div className="t37-tl-header">
          <div className="t37-tl-title">{title}</div>
          {date && <div className="t37-tl-date">{date}</div>}
        </div>
        {subtitle && <div className="t37-tl-subtitle">{subtitle}</div>}
        {extraMeta}
        {children}
      </div>
    </div>
  );

  return (
    <>
      {lastSegment === "download-resume" && (
        <div className="text-center my-5">
          <motion.button onClick={handleDownload} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="bg-emerald-500 text-2xl md:text-base hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg">
            Download Resume
          </motion.button>
        </div>
      )}

      <div className={`t37-resume ${alldata ? "is-preview" : ""}`}
        style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 14px rgba(0,0,0,0.08)" : "", minHeight: "297mm" }}>
        <style>{styles}</style>

        {/* HEADER */}
        <div className="t37-header">
          <div className="t37-name">{contact?.firstName} {contact?.lastName}</div>
          <div className="t37-job-title">{jobTitleStr}</div>
          <div className="t37-chips">
            {contact?.email && <span className="t37-chip">{contact.email}</span>}
            {contact?.phone && <span className="t37-chip">{contact.phone}</span>}
            {formattedDob && <span className="t37-chip">{formattedDob}</span>}
            {addressParts.length > 0 && <span className="t37-chip">{addressParts.join(", ")}</span>}
            {linkedinUrl && <span className="t37-chip"><a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">LinkedIn</a></span>}
            {githubUrl && <span className="t37-chip"><a href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`} target="_blank" rel="noreferrer">GitHub</a></span>}
            {portfolioUrl && <span className="t37-chip"><a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer">Portfolio</a></span>}
          </div>
        </div>

        {/* BODY */}
        <div className="t37-body">

          {summary && (
            <div className="t37-section">
              <div className="t37-section-heading">Summary</div>
              <div className="t37-summary" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary.replace(/\n/g, "<br>")) }} />
            </div>
          )}

          {experiences.length > 0 && (
            <div className="t37-section">
              <div className="t37-section-heading">Experience</div>
              <div className="t37-timeline">
                {experiences.map((exp, i) => {
                  const s = formatMonthYear(exp.startDate, false);
                  const e = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
                  return (
                    <TlItem key={exp.id || i} title={exp.jobTitle || ""} subtitle={`${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}`} date={`${s} – ${e}`} isLast={i === experiences.length - 1}>
                      {exp.text && <div className="t37-tl-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }} />}
                    </TlItem>
                  );
                })}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div className="t37-section">
              <div className="t37-section-heading">Projects</div>
              <div className="t37-timeline">
                {projects.map((p: any, i: number) => (
                  <TlItem key={p.id || i} title={p.title || ""} isLast={i === projects.length - 1}
                    extraMeta={<>
                      {(p.liveUrl || p.githubUrl) && (
                        <div className="t37-proj-links">
                          {p.liveUrl && <a href={p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`} className="t37-proj-link" target="_blank" rel="noreferrer">Live Demo</a>}
                          {p.githubUrl && <a href={p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`} className="t37-proj-link" target="_blank" rel="noreferrer">GitHub</a>}
                        </div>
                      )}
                      {p.techStack && p.techStack.length > 0 && (
                        <div className="t37-tech-wrap">{p.techStack.map((t: string, ti: number) => <span key={ti} className="t37-tech-chip">{t}</span>)}</div>
                      )}
                    </>}>
                    {p.description && <div className="t37-tl-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(p.description) }} />}
                  </TlItem>
                ))}
              </div>
            </div>
          )}

          <div className="t37-two-col">
            {educations.length > 0 && (
              <div className="t37-section">
                <div className="t37-section-heading">Education</div>
                <div className="t37-timeline">
                  {educations.map((edu, i) => {
                    const g = formatGradeToCgpdAndPercentage(edu.grade || "");
                    return (
                      <TlItem key={edu.id || i} title={edu.degree || ""} subtitle={[edu.schoolname, edu.location].filter(Boolean).join(" — ")}
                        date={edu.startDate || edu.endDate ? `${edu.startDate || ""} – ${edu.endDate || "Present"}` : ""}
                        isLast={i === educations.length - 1}
                        extraMeta={g ? <span className="t37-grade">{g}</span> : undefined}>
                        {edu.text && <div className="t37-tl-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(edu.text) }} />}
                      </TlItem>
                    );
                  })}
                </div>
              </div>
            )}

            {hasSkills && (
              <div className="t37-section">
                <div className="t37-section-heading">Skills</div>
                <div className="t37-skills-content" dangerouslySetInnerHTML={{ __html: skillsClean }} />
              </div>
            )}
          </div>

          {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.customSection) &&
            finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim()) &&
            finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim()).map((section: any, i: number) => (
              <div key={section.id || i} className="t37-section">
                {section.name && <div className="t37-section-heading">{section.name}</div>}
                {section.description && <div className="t37-skills-content" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }} />}
              </div>
            ))
          }

        </div>
      </div>
    </>
  );
};

export default TemplateThirtySeven;