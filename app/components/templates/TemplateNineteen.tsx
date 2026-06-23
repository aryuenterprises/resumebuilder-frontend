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

const TemplateNineteen: React.FC<ResumeProps> = ({ alldata }) => {
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

  /* ── photo processing (same as TemplateTwo) ── */
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
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600&display=swap');

.t35-resume {
  width: 210mm;
  min-height: 297mm;
  box-sizing: border-box;
  background: #fff;
  font-family: 'Jost', Arial, sans-serif;
  font-size: 13px;
  line-height: 1.55;
  color: #1a1a2e;
  display: flex;
  flex-direction: row;
}

.t35-resume.is-preview {
  transform: scale(0.36);
  transform-origin: top left;
  width: 210mm;
  height: auto;
  max-height: none;
  min-height: auto;
  overflow: hidden;
}

/* ── LEFT RAIL ── */
.t35-resume .t35-left {
  width: 36%;
  background: #1e2d40;
  padding: 28px 18px 28px 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex-shrink: 0;
}

/* ── PHOTO ── */
.t35-resume .t35-photo-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
}

.t35-resume .t35-photo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #d4a84b;
}

.t35-resume .t35-photo-placeholder {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #2e4a6a;
  border: 3px solid #d4a84b;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── LEFT NAME BLOCK ── */
.t35-resume .t35-left-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  line-height: 1.2;
  margin-bottom: 2px;
  letter-spacing: 0.5px;
}

.t35-resume .t35-left-title {
  font-size: 11px;
  font-weight: 400;
  color: #d4a84b;
  text-align: center;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 6px;
}

/* ── LEFT SECTION ── */
.t35-resume .t35-left-section {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.t35-resume .t35-left-heading {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: #d4a84b;
  border-bottom: 1px solid rgba(212,168,75,0.35);
  padding-bottom: 4px;
  margin-bottom: 6px;
}

.t35-resume .t35-left-text {
  font-size: 11.5px;
  color: rgba(255,255,255,0.78);
  line-height: 1.6;
}

.t35-resume .t35-left-text p { margin: 0 0 4px 0 !important; }
.t35-resume .t35-left-text ul, .t35-resume .t35-left-text ol {
  margin: 4px 0 4px 14px !important;
  padding: 0 !important;
}
.t35-resume .t35-left-text li { margin-bottom: 3px !important; line-height: 1.5 !important; }
.t35-resume .t35-left-text strong { font-weight: 600 !important; color: rgba(255,255,255,0.92) !important; }

.t35-resume .t35-contact-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.t35-resume .t35-contact-item {
  font-size: 11px;
  color: rgba(255,255,255,0.72);
  line-height: 1.5;
  word-break: break-all;
}

.t35-resume .t35-contact-item a {
  color: #d4a84b;
  text-decoration: none;
}

/* ── RIGHT COLUMN ── */
.t35-resume .t35-right {
  flex: 1;
  padding: 28px 24px 28px 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ── RIGHT HEADER ── */
.t35-resume .t35-right-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.1;
  letter-spacing: -0.5px;
  margin-bottom: 2px;
}

.t35-resume .t35-right-title {
  font-size: 12px;
  font-weight: 500;
  color: #d4a84b;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.t35-resume .t35-right-divider {
  height: 2px;
  background: linear-gradient(to right, #d4a84b, transparent);
  margin-top: 8px;
}

/* ── RIGHT SECTION ── */
.t35-resume .t35-section-heading {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: #d4a84b;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(212,168,75,0.3);
}

/* ── ENTRY ── */
.t35-resume .t35-entry {
  margin-bottom: 14px;
  break-inside: avoid;
  page-break-inside: avoid;
}

.t35-resume .t35-entry:last-child { margin-bottom: 0; }

.t35-resume .t35-entry-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 2px;
  flex-wrap: wrap;
}

.t35-resume .t35-entry-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  line-height: 1.3;
}

.t35-resume .t35-entry-subtitle {
  font-size: 12px;
  color: #5a6a7a;
  margin-top: 1px;
  margin-bottom: 2px;
}

.t35-resume .t35-entry-date {
  font-size: 11px;
  color: #8a9ab0;
  white-space: nowrap;
  font-weight: 500;
  flex-shrink: 0;
}

.t35-resume .t35-entry-body {
  font-size: 12.5px;
  color: #3a4a5a;
  line-height: 1.6;
  margin-top: 5px;
}

.t35-resume .t35-entry-body p { margin: 0 0 4px 0 !important; }
.t35-resume .t35-entry-body ul, .t35-resume .t35-entry-body ol {
  margin: 5px 0 5px 16px !important;
  padding: 0 !important;
}
.t35-resume .t35-entry-body li { margin-bottom: 3px !important; line-height: 1.55 !important; }
.t35-resume .t35-entry-body strong { font-weight: 600 !important; }
.t35-resume .t35-entry-body em { font-style: italic !important; }

/* ── PROJECT LINKS / TECH ── */
.t35-resume .t35-project-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 3px;
  margin-bottom: 4px;
}

.t35-resume .t35-proj-link {
  font-size: 10.5px;
  color: #d4a84b;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.t35-resume .t35-tech-chip {
  font-size: 10px;
  background: #f0ece0;
  color: #7a5c1e;
  border-radius: 3px;
  padding: 1px 6px;
  font-weight: 500;
}

/* ── GRADE BADGE ── */
.t35-resume .t35-grade {
  font-size: 11px;
  color: #d4a84b;
  font-weight: 500;
  margin-left: 4px;
}

/* ── PRINT ── */
@media print {
  @page { size: A4; margin: 0mm !important; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  body { margin: 0; padding: 0; }
  .t35-resume { width: 100%; box-shadow: none; }
  .t35-resume .t35-left { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  .t35-resume .t35-entry { break-inside: avoid; page-break-inside: avoid; }
  .t35-proj-link { color: #1a1a2e !important; }
}
`;

  /* ══════════════════════════════════════════
     HTML GENERATION
  ══════════════════════════════════════════ */
  const generateHTML = () => {
    const formattedDob = formatDateOfBirth(dateOfBirth || "");
    const addressParts = [contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean);

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

    const leftCol = `
      <div class="t35-left">
        ${base64Image ? `<div class="t35-photo-wrap"><img src="${base64Image}" alt="Profile" class="t35-photo"/></div>` : `<div class="t35-photo-wrap"><div class="t35-photo-placeholder"></div></div>`}
        <div style="text-align:center">
          <div class="t35-left-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
          <div class="t35-left-title">${typeof contact?.jobTitle === "string" ? contact.jobTitle : (contact?.jobTitle as any)?.name || ""}</div>
        </div>
        ${addressParts.length || contact?.email || contact?.phone || formattedDob ? `
        <div class="t35-left-section">
          <div class="t35-left-heading">Contact</div>
          <div class="t35-contact-row">
            ${contact?.email ? `<div class="t35-contact-item">${contact.email}</div>` : ""}
            ${contact?.phone ? `<div class="t35-contact-item">${contact.phone}</div>` : ""}
            ${formattedDob ? `<div class="t35-contact-item">${formattedDob}</div>` : ""}
            ${addressParts.length ? `<div class="t35-contact-item">${addressParts.join(", ")}</div>` : ""}
            ${linkedinUrl ? `<div class="t35-contact-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn</a></div>` : ""}
            ${githubUrl ? `<div class="t35-contact-item"><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}">GitHub</a></div>` : ""}
            ${portfolioUrl ? `<div class="t35-contact-item"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio</a></div>` : ""}
          </div>
        </div>` : ""}
        ${hasSkills ? `
        <div class="t35-left-section">
          <div class="t35-left-heading">Skills</div>
          <div class="t35-left-text">${skillsClean}</div>
        </div>` : ""}
        ${finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim()) ? finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim()).map((s: any) => `
        <div class="t35-left-section">
          ${s.name ? `<div class="t35-left-heading">${s.name}</div>` : ""}
          ${s.description ? `<div class="t35-left-text">${cleanQuillHTML(s.description)}</div>` : ""}
        </div>`).join("") : ""}
      </div>`;

    const rightCol = `
      <div class="t35-right">
        <div>
          <div class="t35-right-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
          <div class="t35-right-title">${typeof contact?.jobTitle === "string" ? contact.jobTitle : (contact?.jobTitle as any)?.name || ""}</div>
          <div class="t35-right-divider"></div>
        </div>
        ${summary ? `
        <div>
          <div class="t35-section-heading">Summary</div>
          ${renderRich(summary.replace(/\n/g, "<br>"), "t35-entry-body")}
        </div>` : ""}
        ${experiences.length > 0 ? `
        <div>
          <div class="t35-section-heading">Experience</div>
          ${experiences.map((exp) => {
            const s = formatMonthYear(exp.startDate, false);
            const e = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
            return `<div class="t35-entry">
              <div class="t35-entry-header">
                <div>
                  <div class="t35-entry-title">${exp.jobTitle || ""}</div>
                  <div class="t35-entry-subtitle">${exp.employer || ""}${exp.location ? ` &mdash; ${exp.location}` : ""}</div>
                </div>
                <div class="t35-entry-date">${s} &ndash; ${e}</div>
              </div>
              ${exp.text ? renderRich(exp.text, "t35-entry-body") : ""}
            </div>`;
          }).join("")}
        </div>` : ""}
        ${projects.length > 0 ? `
        <div>
          <div class="t35-section-heading">Projects</div>
          ${projects.map((p: any) => `
          <div class="t35-entry">
            <div class="t35-entry-header">
              <div class="t35-entry-title">${p.title || ""}</div>
              ${p.liveUrl || p.githubUrl ? `<div style="display:flex;gap:8px;">
                ${p.liveUrl ? `<a href="${p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`}" class="t35-proj-link">Live Demo</a>` : ""}
                ${p.githubUrl ? `<a href="${p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`}" class="t35-proj-link">GitHub</a>` : ""}
              </div>` : ""}
            </div>
            ${p.techStack && p.techStack.length ? `<div class="t35-project-meta">${p.techStack.map((t: string) => `<span class="t35-tech-chip">${t}</span>`).join("")}</div>` : ""}
            ${p.description ? renderRich(p.description, "t35-entry-body") : ""}
          </div>`).join("")}
        </div>` : ""}
        ${educations.length > 0 ? `
        <div>
          <div class="t35-section-heading">Education</div>
          ${educations.map((edu) => {
            const g = formatGradeToCgpdAndPercentage(edu.grade || "");
            const dateStr = edu.startDate || edu.endDate ? `${edu.startDate || ""} &ndash; ${edu.endDate || "Present"}` : "";
            return `<div class="t35-entry">
              <div class="t35-entry-header">
                <div>
                  <div class="t35-entry-title">${edu.degree || ""}</div>
                  <div class="t35-entry-subtitle">${[edu.schoolname, edu.location].filter(Boolean).join(" &mdash; ")}${g ? `<span class="t35-grade">&bull; ${g}</span>` : ""}</div>
                </div>
                ${dateStr ? `<div class="t35-entry-date">${dateStr}</div>` : ""}
              </div>
              ${edu.text ? renderRich(edu.text, "t35-entry-body") : ""}
            </div>`;
          }).join("")}
        </div>` : ""}
      </div>`;

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet"/>
  <style>${styles}</style>
</head>
<body style="margin:0;padding:0;background:#fff;">
<div class="t35-resume">
  ${leftCol}
  ${rightCol}
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

      <div className={`t35-resume ${alldata ? "is-preview" : ""}`}
        style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 14px rgba(0,0,0,0.12)" : "", minHeight: "297mm" }}>
        <style>{styles}</style>

        {/* LEFT RAIL */}
        <div className="t35-left">
          <div className="t35-photo-wrap">
            {previewUrl ? (
              <img src={previewUrl} alt="Profile" className="t35-photo" />
            ) : (
              <div className="t35-photo-placeholder" />
            )}
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="t35-left-name">{contact?.firstName} {contact?.lastName}</div>
            <div className="t35-left-title">{jobTitleStr}</div>
          </div>

          {(addressParts.length > 0 || contact?.email || contact?.phone || formattedDob) && (
            <div className="t35-left-section">
              <div className="t35-left-heading">Contact</div>
              <div className="t35-contact-row">
                {contact?.email && <div className="t35-contact-item">{contact.email}</div>}
                {contact?.phone && <div className="t35-contact-item">{contact.phone}</div>}
                {formattedDob && <div className="t35-contact-item">{formattedDob}</div>}
                {addressParts.length > 0 && <div className="t35-contact-item">{addressParts.join(", ")}</div>}
                {linkedinUrl && <div className="t35-contact-item"><a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">LinkedIn</a></div>}
                {githubUrl && <div className="t35-contact-item"><a href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`} target="_blank" rel="noreferrer">GitHub</a></div>}
                {portfolioUrl && <div className="t35-contact-item"><a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer">Portfolio</a></div>}
              </div>
            </div>
          )}

          {hasSkills && (
            <div className="t35-left-section">
              <div className="t35-left-heading">Skills</div>
              <div className="t35-left-text" dangerouslySetInnerHTML={{ __html: skillsClean }} />
            </div>
          )}

          {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.customSection) &&
            finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim()) &&
            finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim()).map((section: any, i: number) => (
              <div key={section.id || i} className="t35-left-section">
                {section.name && <div className="t35-left-heading">{section.name}</div>}
                {section.description && <div className="t35-left-text" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }} />}
              </div>
            ))
          }
        </div>

        {/* RIGHT COLUMN */}
        <div className="t35-right">
          <div>
            <div className="t35-right-name">{contact?.firstName} {contact?.lastName}</div>
            <div className="t35-right-title">{jobTitleStr}</div>
            <div className="t35-right-divider" />
          </div>

          {summary && (
            <div>
              <div className="t35-section-heading">Summary</div>
              <div className="t35-entry-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary.replace(/\n/g, "<br>")) }} />
            </div>
          )}

          {experiences.length > 0 && (
            <div>
              <div className="t35-section-heading">Experience</div>
              {experiences.map((exp, i) => {
                const s = formatMonthYear(exp.startDate, false);
                const e = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
                return (
                  <div key={exp.id || i} className="t35-entry">
                    <div className="t35-entry-header">
                      <div>
                        <div className="t35-entry-title">{exp.jobTitle}</div>
                        <div className="t35-entry-subtitle">{exp.employer}{exp.location && ` — ${exp.location}`}</div>
                      </div>
                      <div className="t35-entry-date">{s} – {e}</div>
                    </div>
                    {exp.text && <div className="t35-entry-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(exp.text) }} />}
                  </div>
                );
              })}
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <div className="t35-section-heading">Projects</div>
              {projects.map((p: any, i: number) => (
                <div key={p.id || i} className="t35-entry">
                  <div className="t35-entry-header">
                    <div className="t35-entry-title">{p.title}</div>
                    {(p.liveUrl || p.githubUrl) && (
                      <div style={{ display: "flex", gap: "8px" }}>
                        {p.liveUrl && <a href={p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`} className="t35-proj-link" target="_blank" rel="noreferrer">Live Demo</a>}
                        {p.githubUrl && <a href={p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`} className="t35-proj-link" target="_blank" rel="noreferrer">GitHub</a>}
                      </div>
                    )}
                  </div>
                  {p.techStack && p.techStack.length > 0 && (
                    <div className="t35-project-meta">{p.techStack.map((t: string, ti: number) => <span key={ti} className="t35-tech-chip">{t}</span>)}</div>
                  )}
                  {p.description && <div className="t35-entry-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(p.description) }} />}
                </div>
              ))}
            </div>
          )}

          {educations.length > 0 && (
            <div>
              <div className="t35-section-heading">Education</div>
              {educations.map((edu, i) => {
                const g = formatGradeToCgpdAndPercentage(edu.grade || "");
                return (
                  <div key={edu.id || i} className="t35-entry">
                    <div className="t35-entry-header">
                      <div>
                        <div className="t35-entry-title">{edu.degree || ""}</div>
                        <div className="t35-entry-subtitle">
                          {[edu.schoolname, edu.location].filter(Boolean).join(" — ")}
                          {g && <span className="t35-grade"> &bull; {g}</span>}
                        </div>
                      </div>
                      {(edu.startDate || edu.endDate) && (
                        <div className="t35-entry-date">{edu.startDate || ""} – {edu.endDate || "Present"}</div>
                      )}
                    </div>
                    {edu.text && <div className="t35-entry-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(edu.text) }} />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TemplateNineteen;