"use client";
import React, { useContext, useState, useEffect } from "react";
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

const TemplateThirtySix: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
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

  useEffect(() => {
    let objectUrl: string | null = null;
    const processImage = async () => {
      if (!contact.photo) { setPreviewUrl(null); setBase64Image(null); return; }
      try {
        if (typeof contact.photo === "string") {
          if (contact.photo.startsWith("blob:")) {
            const response = await fetch(contact.photo);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => { const b64 = reader.result as string; setBase64Image(b64); setPreviewUrl(b64); };
            reader.readAsDataURL(blob);
          } else {
            const url = `${API_URL}/api/uploads/photos/${contact.photo}`;
            setPreviewUrl(url); setBase64Image(url);
          }
        } else if (contact.photo && typeof contact.photo === "object" && "size" in contact.photo) {
          objectUrl = URL.createObjectURL(contact.photo as Blob);
          setPreviewUrl(objectUrl);
          const reader = new FileReader();
          reader.onloadend = () => setBase64Image(reader.result as string);
          reader.readAsDataURL(contact.photo as Blob);
        }
      } catch (e) { console.error("Image error", e); }
    };
    processImage();
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [contact.photo]);

  /* ══════════════════════════════════════════
     CSS
  ══════════════════════════════════════════ */
  const styles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&display=swap');

.t36-resume {
  width: 210mm;
  min-height: 297mm;
  box-sizing: border-box;
  background: #fdf6f3;
  font-family: 'Lato', Arial, sans-serif;
  font-size: 13px;
  line-height: 1.55;
  color: #2a1f1a;
}

.t36-resume.is-preview {
  transform: scale(0.36);
  transform-origin: top left;
  width: 210mm;
  height: auto;
  max-height: none;
  min-height: auto;
  overflow: hidden;
}

/* ── TOP STRIPE ── */
.t36-resume .t36-stripe {
  height: 6px;
  background: #c96a4a;
}

/* ── HEADER ── */
.t36-resume .t36-header {
  background: #fff;
  padding: 18px 28px 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #e8ddd8;
  gap: 16px;
}

.t36-resume .t36-header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.t36-resume .t36-photo {
  width: 72px;
  height: 72px;
  border-radius: 6px;
  object-fit: cover;
  border: 2px solid #e8ddd8;
  flex-shrink: 0;
}

.t36-resume .t36-name {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 700;
  color: #1a1008;
  line-height: 1.15;
  letter-spacing: -0.3px;
  margin-bottom: 4px;
}

.t36-resume .t36-job-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: #c96a4a;
}

.t36-resume .t36-header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
  flex-shrink: 0;
}

.t36-resume .t36-contact-line {
  font-size: 11.5px;
  color: #6b5a52;
  line-height: 1.5;
  text-align: right;
}

.t36-resume .t36-contact-line a {
  color: #c96a4a;
  text-decoration: none;
}

/* ── BODY ── */
.t36-resume .t36-body {
  display: grid;
  grid-template-columns: 1fr 1.45fr;
  gap: 0;
  padding: 0;
}

/* ── LEFT COL ── */
.t36-resume .t36-col-left {
  padding: 20px 16px 20px 22px;
  border-right: 1px solid #e8ddd8;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #fdf6f3;
}

/* ── RIGHT COL ── */
.t36-resume .t36-col-right {
  padding: 20px 22px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #fff;
}

/* ── SECTION HEADING ── */
.t36-resume .t36-section-heading {
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  font-weight: 600;
  color: #1a1008;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.t36-resume .t36-section-heading::after {
  content: '';
  flex: 1;
  height: 1.5px;
  background: #c96a4a;
  opacity: 0.5;
}

/* ── SUMMARY ── */
.t36-resume .t36-summary {
  font-size: 12.5px;
  color: #4a3830;
  line-height: 1.65;
  margin-top: 6px;
}
.t36-resume .t36-summary p { margin: 0 0 5px 0 !important; }

/* ── SKILLS ── */
.t36-resume .t36-skills-content {
  font-size: 12.5px;
  color: #4a3830;
  line-height: 1.65;
  margin-top: 6px;
}
.t36-resume .t36-skills-content p { margin: 0 0 4px 0 !important; }
.t36-resume .t36-skills-content ul, .t36-resume .t36-skills-content ol {
  margin: 4px 0 4px 16px !important; padding: 0 !important;
}
.t36-resume .t36-skills-content li { margin-bottom: 3px !important; line-height: 1.55 !important; }
.t36-resume .t36-skills-content strong { font-weight: 700 !important; }

/* ── ENTRY ── */
.t36-resume .t36-entry {
  margin-bottom: 13px;
  break-inside: avoid;
  page-break-inside: avoid;
}
.t36-resume .t36-entry:last-child { margin-bottom: 0; }

.t36-resume .t36-entry-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 1px;
}

.t36-resume .t36-entry-title {
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  font-weight: 600;
  color: #1a1008;
  line-height: 1.3;
}

.t36-resume .t36-entry-date {
  font-size: 10.5px;
  color: #c96a4a;
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
  flex-shrink: 0;
}

.t36-resume .t36-entry-subtitle {
  font-size: 11.5px;
  color: #7a5a50;
  margin-bottom: 4px;
  font-style: italic;
}

.t36-resume .t36-entry-body {
  font-size: 12px;
  color: #4a3830;
  line-height: 1.6;
}
.t36-resume .t36-entry-body p { margin: 0 0 4px 0 !important; }
.t36-resume .t36-entry-body ul, .t36-resume .t36-entry-body ol {
  margin: 4px 0 4px 16px !important; padding: 0 !important;
}
.t36-resume .t36-entry-body li { margin-bottom: 3px !important; line-height: 1.55 !important; }
.t36-resume .t36-entry-body strong { font-weight: 700 !important; }
.t36-resume .t36-entry-body em { font-style: italic !important; }

/* ── PROJECT ── */
.t36-resume .t36-proj-links {
  display: flex;
  gap: 8px;
  margin-top: 3px;
  margin-bottom: 4px;
}
.t36-resume .t36-proj-link {
  font-size: 10.5px;
  color: #c96a4a;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.t36-resume .t36-tech-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 5px;
}
.t36-resume .t36-tech-chip {
  font-size: 10px;
  background: #f5e8e2;
  color: #8b3a20;
  border-radius: 3px;
  padding: 1px 6px;
  font-weight: 700;
}

/* ── GRADE ── */
.t36-resume .t36-grade {
  font-size: 11px;
  color: #c96a4a;
  font-weight: 700;
  margin-left: 3px;
}

/* ── PRINT ── */
@media print {
  @page { size: A4; margin: 0mm !important; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  body { margin: 0; padding: 0; }
  .t36-resume { width: 100%; box-shadow: none; }
  .t36-resume .t36-col-left, .t36-resume .t36-col-right { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  .t36-entry { break-inside: avoid; page-break-inside: avoid; }
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

    const skillsClean = cleanQuillHTML(skills);
    const hasSkills = skills && skillsClean && skillsClean !== "<p><br></p>";

    const leftColHTML = `
      <div class="t36-col-left">
        ${summary ? `<div>
          <div class="t36-section-heading">Summary</div>
          <div class="t36-summary">${cleanQuillHTML(summary.replace(/\n/g, "<br>"))}</div>
        </div>` : ""}
        ${hasSkills ? `<div>
          <div class="t36-section-heading">Skills</div>
          <div class="t36-skills-content">${skillsClean}</div>
        </div>` : ""}
        ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim())
          ? finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim()).map((s: any) => `
            <div>
              ${s.name ? `<div class="t36-section-heading">${s.name}</div>` : ""}
              ${s.description ? `<div class="t36-skills-content">${cleanQuillHTML(s.description)}</div>` : ""}
            </div>`).join("")
          : ""}
        ${educations.length > 0 ? `<div>
          <div class="t36-section-heading">Education</div>
          ${educations.map((edu) => {
            const g = formatGradeToCgpdAndPercentage(edu.grade || "");
            const dateStr = edu.startDate || edu.endDate ? `${edu.startDate || ""} – ${edu.endDate || "Present"}` : "";
            return `<div class="t36-entry">
              <div class="t36-entry-top">
                <div class="t36-entry-title">${edu.degree || ""}</div>
                ${dateStr ? `<div class="t36-entry-date">${dateStr}</div>` : ""}
              </div>
              <div class="t36-entry-subtitle">${[edu.schoolname, edu.location].filter(Boolean).join(" &mdash; ")}${g ? `<span class="t36-grade"> &bull; ${g}</span>` : ""}</div>
              ${edu.text ? renderRich(edu.text, "t36-entry-body") : ""}
            </div>`;
          }).join("")}
        </div>` : ""}
      </div>`;

    const rightColHTML = `
      <div class="t36-col-right">
        ${experiences.length > 0 ? `<div>
          <div class="t36-section-heading">Experience</div>
          ${experiences.map((exp) => {
            const s = formatMonthYear(exp.startDate, false);
            const e = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
            return `<div class="t36-entry">
              <div class="t36-entry-top">
                <div class="t36-entry-title">${exp.jobTitle || ""}</div>
                <div class="t36-entry-date">${s} &ndash; ${e}</div>
              </div>
              <div class="t36-entry-subtitle">${exp.employer || ""}${exp.location ? ` &mdash; ${exp.location}` : ""}</div>
              ${exp.text ? renderRich(exp.text, "t36-entry-body") : ""}
            </div>`;
          }).join("")}
        </div>` : ""}
        ${projects.length > 0 ? `<div>
          <div class="t36-section-heading">Projects</div>
          ${projects.map((p: any) => `
          <div class="t36-entry">
            <div class="t36-entry-top">
              <div class="t36-entry-title">${p.title || ""}</div>
            </div>
            ${p.liveUrl || p.githubUrl ? `<div class="t36-proj-links">
              ${p.liveUrl ? `<a href="${p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`}" class="t36-proj-link">Live Demo</a>` : ""}
              ${p.githubUrl ? `<a href="${p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`}" class="t36-proj-link">GitHub</a>` : ""}
            </div>` : ""}
            ${p.techStack && p.techStack.length ? `<div class="t36-tech-wrap">${p.techStack.map((t: string) => `<span class="t36-tech-chip">${t}</span>`).join("")}</div>` : ""}
            ${p.description ? renderRich(p.description, "t36-entry-body") : ""}
          </div>`).join("")}
        </div>` : ""}
      </div>`;

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet"/>
  <style>${styles}</style>
</head>
<body style="margin:0;padding:0;background:#fdf6f3;">
<div class="t36-resume">
  <div class="t36-stripe"></div>
  <div class="t36-header">
    <div class="t36-header-left">
      ${base64Image ? `<img src="${base64Image}" alt="Profile" class="t36-photo"/>` : ""}
      <div>
        <div class="t36-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
        <div class="t36-job-title">${jobTitleStr}</div>
      </div>
    </div>
    <div class="t36-header-right">
      ${contact?.email ? `<div class="t36-contact-line">${contact.email}</div>` : ""}
      ${contact?.phone ? `<div class="t36-contact-line">${contact.phone}</div>` : ""}
      ${formattedDob ? `<div class="t36-contact-line">${formattedDob}</div>` : ""}
      ${addressParts.length ? `<div class="t36-contact-line">${addressParts.join(", ")}</div>` : ""}
      ${linkedinUrl ? `<div class="t36-contact-line"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></div>` : ""}
      ${githubUrl ? `<div class="t36-contact-line"><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}">GitHub</a></div>` : ""}
      ${portfolioUrl ? `<div class="t36-contact-line"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></div>` : ""}
    </div>
  </div>
  <div class="t36-body">
    ${leftColHTML}
    ${rightColHTML}
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

      <div className={`t36-resume ${alldata ? "is-preview" : ""}`}
        style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 14px rgba(0,0,0,0.1)" : "", minHeight: "297mm" }}>
        <style>{styles}</style>

        {/* TOP STRIPE */}
        <div className="t36-stripe" />

        {/* HEADER */}
        <div className="t36-header">
          <div className="t36-header-left">
            {previewUrl && <img src={previewUrl} alt="Profile" className="t36-photo" />}
            <div>
              <div className="t36-name">{contact?.firstName} {contact?.lastName}</div>
              <div className="t36-job-title">{jobTitleStr}</div>
            </div>
          </div>
          <div className="t36-header-right">
            {contact?.email && <div className="t36-contact-line">{contact.email}</div>}
            {contact?.phone && <div className="t36-contact-line">{contact.phone}</div>}
            {formattedDob && <div className="t36-contact-line">{formattedDob}</div>}
            {addressParts.length > 0 && <div className="t36-contact-line">{addressParts.join(", ")}</div>}
            {linkedinUrl && <div className="t36-contact-line"><a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">LinkedIn</a></div>}
            {githubUrl && <div className="t36-contact-line"><a href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`} target="_blank" rel="noreferrer">GitHub</a></div>}
            {portfolioUrl && <div className="t36-contact-line"><a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer">Portfolio</a></div>}
          </div>
        </div>

        {/* BODY */}
        <div className="t36-body">
          {/* LEFT */}
          <div className="t36-col-left">
            {summary && (
              <div>
                <div className="t36-section-heading">Summary</div>
                <div className="t36-summary" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary.replace(/\n/g, "<br>")) }} />
              </div>
            )}
            {hasSkills && (
              <div>
                <div className="t36-section-heading">Skills</div>
                <div className="t36-skills-content" dangerouslySetInnerHTML={{ __html: skillsClean }} />
              </div>
            )}
            {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.customSection) &&
              finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim()) &&
              finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim()).map((section: any, i: number) => (
                <div key={section.id || i}>
                  {section.name && <div className="t36-section-heading">{section.name}</div>}
                  {section.description && <div className="t36-skills-content" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }} />}
                </div>
              ))
            }
            {educations.length > 0 && (
              <div>
                <div className="t36-section-heading">Education</div>
                {educations.map((edu, i) => {
                  const g = formatGradeToCgpdAndPercentage(edu.grade || "");
                  return (
                    <div key={edu.id || i} className="t36-entry">
                      <div className="t36-entry-top">
                        <div className="t36-entry-title">{edu.degree || ""}</div>
                        {(edu.startDate || edu.endDate) && <div className="t36-entry-date">{edu.startDate || ""} – {edu.endDate || "Present"}</div>}
                      </div>
                      <div className="t36-entry-subtitle">
                        {[edu.schoolname, edu.location].filter(Boolean).join(" — ")}
                        {g && <span className="t36-grade"> &bull; {g}</span>}
                      </div>
                      {edu.text && <div className="t36-entry-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(edu.text) }} />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="t36-col-right">
            {experiences.length > 0 && (
              <div>
                <div className="t36-section-heading">Experience</div>
                {experiences.map((exp, i) => {
                  const s = formatMonthYear(exp.startDate, false);
                  const e = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
                  return (
                    <div key={exp.id || i} className="t36-entry">
                      <div className="t36-entry-top">
                        <div className="t36-entry-title">{exp.jobTitle}</div>
                        <div className="t36-entry-date">{s} – {e}</div>
                      </div>
                      <div className="t36-entry-subtitle">{exp.employer}{exp.location && ` — ${exp.location}`}</div>
                      {exp.text && <div className="t36-entry-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }} />}
                    </div>
                  );
                })}
              </div>
            )}
            {projects.length > 0 && (
              <div>
                <div className="t36-section-heading">Projects</div>
                {projects.map((p: any, i: number) => (
                  <div key={p.id || i} className="t36-entry">
                    <div className="t36-entry-top">
                      <div className="t36-entry-title">{p.title}</div>
                    </div>
                    {(p.liveUrl || p.githubUrl) && (
                      <div className="t36-proj-links">
                        {p.liveUrl && <a href={p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`} className="t36-proj-link" target="_blank" rel="noreferrer">Live Demo</a>}
                        {p.githubUrl && <a href={p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`} className="t36-proj-link" target="_blank" rel="noreferrer">GitHub</a>}
                      </div>
                    )}
                    {p.techStack && p.techStack.length > 0 && (
                      <div className="t36-tech-wrap">{p.techStack.map((t: string, ti: number) => <span key={ti} className="t36-tech-chip">{t}</span>)}</div>
                    )}
                    {p.description && <div className="t36-entry-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(p.description) }} />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateThirtySix;