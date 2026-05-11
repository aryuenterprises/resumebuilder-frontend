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

const TemplateThirtyEight: React.FC<ResumeProps> = ({ alldata }) => {
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

  /* ══════════════════════════════════════════════════════
     DESIGN TOKENS
     • Background: #0d0d0d (near-black)
     • Accent:     #c8f135 (electric lime)
     • Surface:    #1a1a1a
     • Border:     #2e2e2e
     • Text hi:    #f5f5f0
     • Text lo:    #888880
     Font: Space Grotesk (display) + IBM Plex Mono (mono/meta)
  ══════════════════════════════════════════════════════ */

  const styles = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

.t38-resume {
  width: 210mm;
  min-height: 297mm;
  box-sizing: border-box;
  background: #0d0d0d;
  font-family: 'Space Grotesk', Arial, sans-serif;
  font-size: 13px;
  line-height: 1.55;
  color: #f5f5f0;
  position: relative;
  overflow: hidden;
}

.t38-resume.is-preview {
  transform: scale(0.36);
  transform-origin: top left;
  width: 210mm;
  height: auto;
  max-height: none;
  min-height: auto;
  overflow: hidden;
}

/* ── HEADER BLOCK ── */
.t38-resume .t38-header {
  background: #0d0d0d;
  padding: 30px 30px 0 30px;
  position: relative;
}

/* big decorative block behind name */
.t38-resume .t38-header-bg-block {
  position: absolute;
  top: 0;
  right: 0;
  width: 52%;
  height: 100%;
  background: #c8f135;
  clip-path: polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%);
  z-index: 0;
}

.t38-resume .t38-header-inner {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  gap: 0;
  min-height: 110px;
  padding-bottom: 0;
}

/* name + title on dark side */
.t38-resume .t38-name-block {
  flex: 1;
  padding-bottom: 24px;
}

.t38-resume .t38-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 38px;
  font-weight: 700;
  color: #f5f5f0;
  line-height: 1.0;
  letter-spacing: -1.5px;
  margin-bottom: 6px;
}

.t38-resume .t38-name em {
  color: #c8f135;
  font-style: normal;
}

.t38-resume .t38-job-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 400;
  color: #888880;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* photo on lime side */
.t38-resume .t38-photo-block {
  width: 96px;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  padding-right: 24px;
  padding-bottom: 18px;
  align-self: flex-end;
}

.t38-resume .t38-photo {
  width: 72px;
  height: 72px;
  border-radius: 4px;
  object-fit: cover;
  border: 3px solid #0d0d0d;
}

.t38-resume .t38-photo-placeholder {
  width: 72px;
  height: 72px;
  border-radius: 4px;
  background: #2e2e2e;
  border: 3px solid #0d0d0d;
}

/* ── CONTACT BAR ── */
.t38-resume .t38-contact-bar {
  background: #1a1a1a;
  border-top: 1.5px solid #c8f135;
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  padding: 0;
}

.t38-resume .t38-contact-item {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  color: #888880;
  padding: 7px 14px;
  border-right: 1px solid #2e2e2e;
  line-height: 1.4;
  white-space: nowrap;
}

.t38-resume .t38-contact-item a {
  color: #c8f135;
  text-decoration: none;
}

/* ── BODY ── */
.t38-resume .t38-body {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 0;
}

/* ── LEFT COLUMN ── */
.t38-resume .t38-left {
  border-right: 1px solid #2e2e2e;
  padding: 20px 18px 28px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── RIGHT COLUMN ── */
.t38-resume .t38-right {
  padding: 20px 22px 28px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── SECTION LABEL (rotated on left col) ── */
.t38-resume .t38-section-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.t38-resume .t38-section-label-text {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #c8f135;
}

.t38-resume .t38-section-label-line {
  flex: 1;
  height: 1px;
  background: #2e2e2e;
}

/* ── SUMMARY ── */
.t38-resume .t38-summary {
  font-size: 12.5px;
  color: #b0b0a8;
  line-height: 1.7;
}
.t38-resume .t38-summary p { margin: 0 0 5px 0 !important; }
.t38-resume .t38-summary strong { color: #f5f5f0 !important; font-weight: 600 !important; }

/* ── SKILLS CONTENT ── */
.t38-resume .t38-skills-content {
  font-size: 12.5px;
  color: #b0b0a8;
  line-height: 1.65;
}
.t38-resume .t38-skills-content p { margin: 0 0 5px 0 !important; }
.t38-resume .t38-skills-content ul, .t38-resume .t38-skills-content ol {
  margin: 5px 0 5px 16px !important;
  padding: 0 !important;
}
.t38-resume .t38-skills-content li {
  margin-bottom: 4px !important;
  line-height: 1.55 !important;
}
.t38-resume .t38-skills-content strong { color: #f5f5f0 !important; font-weight: 600 !important; }

/* ── ENTRY ── */
.t38-resume .t38-entry {
  margin-bottom: 16px;
  break-inside: avoid;
  page-break-inside: avoid;
  padding-left: 12px;
  border-left: 2px solid #2e2e2e;
  position: relative;
}

.t38-resume .t38-entry::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #c8f135;
}

.t38-resume .t38-entry:last-child { margin-bottom: 0; }

.t38-resume .t38-entry-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 2px;
}

.t38-resume .t38-entry-title {
  font-size: 14px;
  font-weight: 600;
  color: #f5f5f0;
  line-height: 1.3;
}

.t38-resume .t38-entry-date {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #c8f135;
  white-space: nowrap;
  flex-shrink: 0;
  background: rgba(200, 241, 53, 0.08);
  padding: 2px 7px;
  border-radius: 2px;
  border: 1px solid rgba(200, 241, 53, 0.2);
}

.t38-resume .t38-entry-subtitle {
  font-size: 11.5px;
  color: #666660;
  margin-bottom: 5px;
}

.t38-resume .t38-entry-body {
  font-size: 12px;
  color: #b0b0a8;
  line-height: 1.65;
}
.t38-resume .t38-entry-body p { margin: 0 0 4px 0 !important; }
.t38-resume .t38-entry-body ul, .t38-resume .t38-entry-body ol {
  margin: 5px 0 5px 16px !important;
  padding: 0 !important;
}
.t38-resume .t38-entry-body li { margin-bottom: 3px !important; line-height: 1.55 !important; }
.t38-resume .t38-entry-body strong { color: #f5f5f0 !important; font-weight: 600 !important; }
.t38-resume .t38-entry-body em { font-style: italic !important; color: #c8c8c0 !important; }

/* ── TECH CHIPS ── */
.t38-resume .t38-tech-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 6px;
}

.t38-resume .t38-tech-chip {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  background: rgba(200, 241, 53, 0.08);
  color: #c8f135;
  border: 1px solid rgba(200, 241, 53, 0.2);
  border-radius: 2px;
  padding: 2px 7px;
  font-weight: 400;
}

/* ── PROJECT LINKS ── */
.t38-resume .t38-proj-links {
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
}

.t38-resume .t38-proj-link {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #c8f135;
  text-decoration: underline;
  text-underline-offset: 2px;
  opacity: 0.8;
}

/* ── GRADE BADGE ── */
.t38-resume .t38-grade {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: #c8f135;
  background: rgba(200, 241, 53, 0.08);
  border: 1px solid rgba(200, 241, 53, 0.2);
  border-radius: 2px;
  padding: 1px 6px;
  margin-left: 6px;
}

/* ── EDU ENTRY (smaller dot) ── */
.t38-resume .t38-edu-entry {
  margin-bottom: 13px;
  break-inside: avoid;
  page-break-inside: avoid;
  padding-left: 12px;
  border-left: 2px solid #2e2e2e;
  position: relative;
}
.t38-resume .t38-edu-entry::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2e2e2e;
  border: 2px solid #c8f135;
}
.t38-resume .t38-edu-entry:last-child { margin-bottom: 0; }

/* ── CUSTOM SECTION ── */
.t38-resume .t38-custom-body {
  font-size: 12.5px;
  color: #b0b0a8;
  line-height: 1.65;
}
.t38-resume .t38-custom-body p { margin: 0 0 5px 0 !important; }
.t38-resume .t38-custom-body ul, .t38-resume .t38-custom-body ol {
  margin: 5px 0 5px 16px !important;
  padding: 0 !important;
}
.t38-resume .t38-custom-body li { margin-bottom: 3px !important; }
.t38-resume .t38-custom-body strong { color: #f5f5f0 !important; font-weight: 600 !important; }

/* ── PRINT ── */
@media print {
  @page { size: A4; margin: 0mm !important; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  body { margin: 0; padding: 0; background: #0d0d0d; }
  .t38-resume { width: 100%; box-shadow: none; }
  .t38-resume .t38-header-bg-block { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  .t38-entry, .t38-edu-entry { break-inside: avoid; page-break-inside: avoid; }
  .t38-resume .t38-proj-link { color: #c8f135 !important; }
}
`;

  /* ══════════════════════════════════════════════════════
     HTML GENERATION
  ══════════════════════════════════════════════════════ */
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

    const sectionLabel = (label: string) =>
      `<div class="t38-section-label"><span class="t38-section-label-text">${label}</span><span class="t38-section-label-line"></span></div>`;

    const skillsClean = cleanQuillHTML(skills);
    const hasSkills = skills && skillsClean && skillsClean !== "<p><br></p>";

    const contactItems = [
      contact?.email ? `<div class="t38-contact-item">${contact.email}</div>` : "",
      contact?.phone ? `<div class="t38-contact-item">${contact.phone}</div>` : "",
      formattedDob ? `<div class="t38-contact-item">${formattedDob}</div>` : "",
      addressParts.length ? `<div class="t38-contact-item">${addressParts.join(", ")}</div>` : "",
      linkedinUrl ? `<div class="t38-contact-item"><a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}">LinkedIn &nearr;</a></div>` : "",
      githubUrl ? `<div class="t38-contact-item"><a href="${githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`}">GitHub &nearr;</a></div>` : "",
      portfolioUrl ? `<div class="t38-contact-item"><a href="${portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`}">Portfolio &nearr;</a></div>` : "",
    ].filter(Boolean).join("");

    const expHTML = experiences.length > 0 ? `
      <div>
        ${sectionLabel("Experience")}
        ${experiences.map((exp) => {
          const s = formatMonthYear(exp.startDate, false);
          const e = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
          return `<div class="t38-entry">
            <div class="t38-entry-header">
              <div class="t38-entry-title">${exp.jobTitle || ""}</div>
              <div class="t38-entry-date">${s} &ndash; ${e}</div>
            </div>
            <div class="t38-entry-subtitle">${exp.employer || ""}${exp.location ? ` &mdash; ${exp.location}` : ""}</div>
            ${exp.text ? renderRich(exp.text, "t38-entry-body") : ""}
          </div>`;
        }).join("")}
      </div>` : "";

    const projHTML = projects.length > 0 ? `
      <div>
        ${sectionLabel("Projects")}
        ${projects.map((p: any) => {
          const links = p.liveUrl || p.githubUrl ? `<div class="t38-proj-links">
            ${p.liveUrl ? `<a href="${p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`}" class="t38-proj-link">Live Demo &nearr;</a>` : ""}
            ${p.githubUrl ? `<a href="${p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`}" class="t38-proj-link">GitHub &nearr;</a>` : ""}
          </div>` : "";
          const tech = p.techStack && p.techStack.length ? `<div class="t38-tech-wrap">${p.techStack.map((t: string) => `<span class="t38-tech-chip">${t}</span>`).join("")}</div>` : "";
          return `<div class="t38-entry">
            <div class="t38-entry-title" style="margin-bottom:4px">${p.title || ""}</div>
            ${links}${tech}
            ${p.description ? renderRich(p.description, "t38-entry-body") : ""}
          </div>`;
        }).join("")}
      </div>` : "";

    const eduHTML = educations.length > 0 ? `
      <div>
        ${sectionLabel("Education")}
        ${educations.map((edu) => {
          const g = formatGradeToCgpdAndPercentage(edu.grade || "");
          const dateStr = edu.startDate || edu.endDate ? `${edu.startDate || ""} &ndash; ${edu.endDate || "Present"}` : "";
          return `<div class="t38-edu-entry">
            <div class="t38-entry-header">
              <div class="t38-entry-title">${edu.degree || ""}</div>
              ${dateStr ? `<div class="t38-entry-date">${dateStr}</div>` : ""}
            </div>
            <div class="t38-entry-subtitle">
              ${[edu.schoolname, edu.location].filter(Boolean).join(" &mdash; ")}
              ${g ? `<span class="t38-grade">${g}</span>` : ""}
            </div>
            ${edu.text ? renderRich(edu.text, "t38-entry-body") : ""}
          </div>`;
        }).join("")}
      </div>` : "";

    const customHTML = finalize && !Array.isArray(finalize) && Array.isArray(finalize.customSection) && finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim())
      ? finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim()).map((s: any) => `
        <div>
          ${s.name ? sectionLabel(s.name) : ""}
          ${s.description ? `<div class="t38-custom-body">${cleanQuillHTML(s.description)}</div>` : ""}
        </div>`).join("")
      : "";

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { margin: 0; padding: 0; background: #0d0d0d; }
    ${styles}
  </style>
</head>
<body>
<div class="t38-resume">

  <div class="t38-header">
    <div class="t38-header-bg-block"></div>
    <div class="t38-header-inner">
      <div class="t38-name-block">
        <div class="t38-name">${contact?.firstName || ""}<br/><em>${contact?.lastName || ""}</em></div>
        <div class="t38-job-title">${jobTitleStr}</div>
      </div>
      ${base64Image ? `<div class="t38-photo-block"><img src="${base64Image}" alt="Profile" class="t38-photo"/></div>` : ""}
    </div>
  </div>

  <div class="t38-contact-bar">${contactItems}</div>

  <div class="t38-body">
    <div class="t38-left">
      ${summary ? `<div>
        ${sectionLabel("About")}
        <div class="t38-summary">${cleanQuillHTML(summary.replace(/\n/g, "<br>"))}</div>
      </div>` : ""}
      ${hasSkills ? `<div>
        ${sectionLabel("Skills")}
        <div class="t38-skills-content">${skillsClean}</div>
      </div>` : ""}
      ${eduHTML}
      ${customHTML}
    </div>
    <div class="t38-right">
      ${expHTML}
      ${projHTML}
    </div>
  </div>

</div>
</body>
</html>`;
  };

  /* ══════════════════════════════════════════════════════
     DOWNLOAD
  ══════════════════════════════════════════════════════ */
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

  /* ══════════════════════════════════════════════════════
     JSX PREVIEW
  ══════════════════════════════════════════════════════ */
  const formattedDob = formatDateOfBirth(dateOfBirth || "");
  const addressParts = [contact?.address, contact?.city, contact?.postCode, contact?.country].filter(Boolean);
  const jobTitleStr = contact?.jobTitle ? (typeof contact.jobTitle === "string" ? contact.jobTitle : (contact.jobTitle as any)?.name || "") : "";
  const skillsClean = cleanQuillHTML(skills);
  const hasSkills = skills && skillsClean && skillsClean !== "<p><br></p>";

  const SectionLabel = ({ label }: { label: string }) => (
    <div className="t38-section-label">
      <span className="t38-section-label-text">{label}</span>
      <span className="t38-section-label-line" />
    </div>
  );

  const Entry = ({ title, subtitle, date, body, children }: { title: string; subtitle?: string; date?: string; body?: string; children?: React.ReactNode }) => (
    <div className="t38-entry">
      <div className="t38-entry-header">
        <div className="t38-entry-title">{title}</div>
        {date && <div className="t38-entry-date">{date}</div>}
      </div>
      {subtitle && <div className="t38-entry-subtitle">{subtitle}</div>}
      {children}
      {body && <div className="t38-entry-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(body) }} />}
    </div>
  );

  const EduEntry = ({ title, subtitle, date, body, gradeEl }: { title: string; subtitle?: string; date?: string; body?: string; gradeEl?: React.ReactNode }) => (
    <div className="t38-edu-entry">
      <div className="t38-entry-header">
        <div className="t38-entry-title">{title}</div>
        {date && <div className="t38-entry-date">{date}</div>}
      </div>
      <div className="t38-entry-subtitle">{subtitle}{gradeEl}</div>
      {body && <div className="t38-entry-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(body) }} />}
    </div>
  );

  return (
    <>
      {lastSegment === "download-resume" && (
        <div className="text-center my-5">
          <motion.button onClick={handleDownload} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="bg-[#c8f135] text-2xl md:text-base hover:bg-[#b8e020] text-[#0d0d0d] px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg">
            Download Resume
          </motion.button>
        </div>
      )}

      <div className={`t38-resume ${alldata ? "is-preview" : ""}`}
        style={{ margin: "0 auto", boxShadow: !alldata ? "0 0 40px rgba(200,241,53,0.08)" : "", minHeight: "297mm" }}>
        <style>{styles}</style>

        {/* HEADER */}
        <div className="t38-header">
          <div className="t38-header-bg-block" />
          <div className="t38-header-inner">
            <div className="t38-name-block">
              <div className="t38-name">
                {contact?.firstName}<br />
                <em>{contact?.lastName}</em>
              </div>
              <div className="t38-job-title">{jobTitleStr}</div>
            </div>
            {previewUrl && (
              <div className="t38-photo-block">
                <img src={previewUrl} alt="Profile" className="t38-photo" />
              </div>
            )}
          </div>
        </div>

        {/* CONTACT BAR */}
        <div className="t38-contact-bar">
          {contact?.email && <div className="t38-contact-item">{contact.email}</div>}
          {contact?.phone && <div className="t38-contact-item">{contact.phone}</div>}
          {formattedDob && <div className="t38-contact-item">{formattedDob}</div>}
          {addressParts.length > 0 && <div className="t38-contact-item">{addressParts.join(", ")}</div>}
          {linkedinUrl && <div className="t38-contact-item"><a href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noreferrer">LinkedIn ↗</a></div>}
          {githubUrl && <div className="t38-contact-item"><a href={githubUrl.startsWith("http") ? githubUrl : `https://${githubUrl}`} target="_blank" rel="noreferrer">GitHub ↗</a></div>}
          {portfolioUrl && <div className="t38-contact-item"><a href={portfolioUrl.startsWith("http") ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noreferrer">Portfolio ↗</a></div>}
        </div>

        {/* BODY */}
        <div className="t38-body">

          {/* LEFT */}
          <div className="t38-left">
            {summary && (
              <div>
                <SectionLabel label="About" />
                <div className="t38-summary" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(summary.replace(/\n/g, "<br>")) }} />
              </div>
            )}

            {hasSkills && (
              <div>
                <SectionLabel label="Skills" />
                <div className="t38-skills-content" dangerouslySetInnerHTML={{ __html: skillsClean }} />
              </div>
            )}

            {educations.length > 0 && (
              <div>
                <SectionLabel label="Education" />
                {educations.map((edu, i) => {
                  const g = formatGradeToCgpdAndPercentage(edu.grade || "");
                  return (
                    <EduEntry
                      key={edu.id || i}
                      title={edu.degree || ""}
                      subtitle={[edu.schoolname, edu.location].filter(Boolean).join(" — ")}
                      date={edu.startDate || edu.endDate ? `${edu.startDate || ""} – ${edu.endDate || "Present"}` : undefined}
                      body={edu.text}
                      gradeEl={g ? <span className="t38-grade">{g}</span> : undefined}
                    />
                  );
                })}
              </div>
            )}

            {finalize && !Array.isArray(finalize) && Array.isArray(finalize?.customSection) &&
              finalize.customSection.some((s: any) => s?.name?.trim() || s?.description?.trim()) &&
              finalize.customSection.filter((s: any) => s?.name?.trim() || s?.description?.trim()).map((section: any, i: number) => (
                <div key={section.id || i}>
                  {section.name && <SectionLabel label={section.name} />}
                  {section.description && <div className="t38-custom-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(section.description) }} />}
                </div>
              ))
            }
          </div>

          {/* RIGHT */}
          <div className="t38-right">
            {experiences.length > 0 && (
              <div>
                <SectionLabel label="Experience" />
                {experiences.map((exp, i) => {
                  const s = formatMonthYear(exp.startDate, false);
                  const e = exp.endDate ? formatMonthYear(exp.endDate, false) : "Present";
                  return (
                    <Entry
                      key={exp.id || i}
                      title={exp.jobTitle || ""}
                      subtitle={`${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}`}
                      date={`${s} – ${e}`}
                      body={exp.text}
                    />
                  );
                })}
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <SectionLabel label="Projects" />
                {projects.map((p: any, i: number) => (
                  <Entry key={p.id || i} title={p.title || ""}>
                    {(p.liveUrl || p.githubUrl) && (
                      <div className="t38-proj-links">
                        {p.liveUrl && <a href={p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`} className="t38-proj-link" target="_blank" rel="noreferrer">Live Demo ↗</a>}
                        {p.githubUrl && <a href={p.githubUrl.startsWith("http") ? p.githubUrl : `https://${p.githubUrl}`} className="t38-proj-link" target="_blank" rel="noreferrer">GitHub ↗</a>}
                      </div>
                    )}
                    {p.techStack && p.techStack.length > 0 && (
                      <div className="t38-tech-wrap">{p.techStack.map((t: string, ti: number) => <span key={ti} className="t38-tech-chip">{t}</span>)}</div>
                    )}
                    {p.description && <div className="t38-entry-body" dangerouslySetInnerHTML={{ __html: cleanQuillHTML(p.description) }} />}
                  </Entry>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default TemplateThirtyEight;