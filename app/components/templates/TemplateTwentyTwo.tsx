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

/* ─── accent colour palette (6 rotating tag colours) ─── */
const TAG_COLOURS = [
  { bg: "#ede9fb", text: "#4c2a9e" },
  { bg: "#d1fae5", text: "#065f46" },
  { bg: "#fce7f3", text: "#9d174d" },
  { bg: "#fef3c7", text: "#92400e" },
  { bg: "#dbeafe", text: "#1e3a8a" },
  { bg: "#fde8e8", text: "#9b1c1c" },
];

/* ─── skill-bar fill colours (cycles through 5) ─── */
const BAR_COLOURS = ["#6c3fc5", "#06b6d4", "#10b981", "#ec4899", "#f59e0b"];

const TemplateTwentyTwo: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const contact  = alldata?.contact    || context.contact    || {};
  const educations  = alldata?.educations  || context?.education  || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills      = alldata?.skills      || context?.skills      || [];
  const finalize    = alldata?.finalize    || context?.finalize    || {};
  const summary     = alldata?.summary     || context?.summary     || "";

  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.postcode,
    contact?.country,
  ].filter(Boolean);

  const linkedinUrl  = contact?.linkedin;
  const portfolioUrl = contact?.portfolio;

  const jobTitle = contact?.jobTitle
    ? typeof contact.jobTitle === "string"
      ? contact.jobTitle
      : (contact.jobTitle as any)?.name || ""
    : "";

  /* ══════════════════════════════════════════════════════
     STYLES — all scoped under .t22-resume
  ══════════════════════════════════════════════════════ */
  const styles = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

.t22-resume {
  width: 210mm;
  min-height: 297mm;
  background: #ffffff;
  font-family: 'Plus Jakarta Sans', Arial, sans-serif;
  font-size: 13px;
  line-height: 1.5;
  box-sizing: border-box;
}

.t22-resume.is-preview {
  transform: scale(0.36);
  transform-origin: top left;
  width: 210mm;
  height: auto;
  max-height: none;
  min-height: auto;
  overflow: hidden;
}

.t22-resume p {
  margin: 0 !important;
  padding: 0 !important;
  line-height: 1.5 !important;
}

/* ── HERO HEADER ── */
.t22-hero {
  background: #6c3fc5;
  padding: 28px 28px 22px;
  position: relative;
  overflow: hidden;
}

.t22-hero-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
}

.t22-hero-name {
  font-size: 28px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 4px;
  position: relative;
}

.t22-hero-title {
  font-size: 12px;
  font-weight: 500;
  color: #c4a9f0;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  margin-bottom: 16px;
  position: relative;
}

.t22-hero-contacts {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  position: relative;
}

.t22-hero-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #e8d8ff;
  font-weight: 400;
}

.t22-hero-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #a87de8;
  flex-shrink: 0;
}

/* ── ACCENT STRIP ── */
.t22-accent-strip {
  height: 4px;
  background: linear-gradient(90deg, #f59e0b 0%, #ec4899 35%, #6c3fc5 70%, #06b6d4 100%);
}

/* ── BODY ── */
.t22-body {
  display: flex;
}

/* ── LEFT COLUMN ── */
.t22-left {
  width: 72mm;
  padding: 20px 16px;
  border-right: 1px solid #f0eefc;
  flex-shrink: 0;
  box-sizing: border-box;
}

/* ── RIGHT COLUMN ── */
.t22-right {
  flex: 1;
  padding: 20px 18px;
  box-sizing: border-box;
}

/* ── SECTION TITLES ── */
.t22-sec-title {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #6c3fc5;
  margin-bottom: 10px;
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.t22-sec-title:first-of-type {
  margin-top: 0;
}

.t22-sec-line {
  flex: 1;
  height: 1px;
  background: #ede9fb;
}

/* ── CONTACT ITEMS ── */
.t22-c-item {
  font-size: 10.5px;
  color: #374151;
  margin-bottom: 7px;
  line-height: 1.5;
  word-break: break-word;
}

.t22-c-label {
  font-size: 9px;
  font-weight: 700;
  color: #6c3fc5;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: block;
  margin-bottom: 1px;
}

.t22-c-link {
  color: #7c4dd6;
  text-decoration: none;
  font-size: 10.5px;
}

/* ── SKILL BARS ── */
.t22-sk-row {
  margin-bottom: 9px;
}

.t22-sk-name {
  font-size: 11px;
  color: #1f2937;
  font-weight: 500;
  margin-bottom: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.t22-sk-pct {
  font-size: 9px;
  color: #9ca3af;
  font-weight: 400;
}

.t22-sk-track {
  height: 5px;
  background: #ede9fb;
  border-radius: 3px;
  overflow: hidden;
}

.t22-sk-fill {
  height: 100%;
  border-radius: 3px;
}

/* ── TAG PILLS ── */
.t22-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 4px;
}

.t22-tag {
  font-size: 10px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 20px;
}

/* ── LANGUAGE DOTS ── */
.t22-lang-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
}

.t22-lang-name {
  font-size: 11px;
  color: #374151;
  font-weight: 500;
}

.t22-lang-dots {
  display: flex;
  gap: 3px;
}

.t22-ldot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.t22-ldot-on  { background: #6c3fc5; }
.t22-ldot-off { background: #e5e7eb; }

/* ── CERT / SIDEBAR ITEMS ── */
.t22-cert-item {
  font-size: 10px;
  color: #374151;
  padding: 5px 8px;
  border-left: 3px solid #a87de8;
  background: #faf9ff;
  margin-bottom: 6px;
  border-radius: 0 4px 4px 0;
  line-height: 1.4;
}

.t22-sidebar-item {
  font-size: 10.5px;
  color: #374151;
  margin-bottom: 6px;
  line-height: 1.5;
}

/* ── SUMMARY ── */
.t22-summary {
  font-size: 11.5px;
  color: #374151;
  line-height: 1.75;
  padding: 10px 12px;
  background: #faf9ff;
  border-left: 3px solid #6c3fc5;
  border-radius: 0 6px 6px 0;
  margin-bottom: 4px;
}

.t22-summary p {
  font-size: 11.5px !important;
  color: #374151 !important;
  line-height: 1.75 !important;
}

/* ── TIMELINE ── */
.t22-t-item {
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
}

.t22-t-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 14px;
  flex-shrink: 0;
  padding-top: 3px;
}

.t22-t-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #6c3fc5;
  flex-shrink: 0;
}

.t22-t-dot-edu { background: #06b6d4; }

.t22-t-line {
  flex: 1;
  width: 2px;
  background: #ede9fb;
  margin-top: 3px;
}

.t22-t-body {
  flex: 1;
  padding-bottom: 4px;
}

.t22-t-title {
  font-size: 12.5px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2px;
  line-height: 1.3;
}

.t22-t-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 3px;
  margin-bottom: 4px;
}

.t22-t-company {
  font-size: 10.5px;
  color: #6c3fc5;
  font-weight: 600;
}

.t22-t-company-edu { color: #06b6d4; }

.t22-t-date {
  font-size: 9px;
  color: #ffffff;
  background: #6c3fc5;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
  white-space: nowrap;
  line-height: 1.5;
}

.t22-t-date-edu { background: #06b6d4; }

.t22-t-content {
  font-size: 11px;
  color: #4b5563;
  line-height: 1.65;
}

.t22-t-content p {
  font-size: 11px !important;
  color: #4b5563 !important;
  line-height: 1.65 !important;
}

.t22-t-content ul,
.t22-exp-list,
.t22-edu-list {
  list-style-type: disc !important;
  padding-left: 14px !important;
  margin: 3px 0 !important;
}

.t22-t-content ol {
  list-style-type: decimal !important;
  padding-left: 14px !important;
  margin: 3px 0 !important;
}

.t22-t-content li,
.t22-exp-list li,
.t22-edu-list li {
  margin-bottom: 2px !important;
  line-height: 1.55 !important;
  font-size: 11px !important;
  color: #4b5563 !important;
}

/* ── PILL ROW (hobbies, awards) ── */
.t22-pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.t22-pill {
  font-size: 10px;
  padding: 3px 10px;
  border-radius: 20px;
  font-weight: 500;
  background: #f3f4f6;
  color: #374151;
}

.t22-additional-item {
  font-size: 11px;
  color: #374151;
  margin-bottom: 5px;
  line-height: 1.6;
}

.t22-wrap-break-word {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* ── CUSTOM SECTIONS ── */
.t22-custom-content {
  font-size: 11px;
  color: #4b5563;
  line-height: 1.65;
}

.t22-custom-content p {
  font-size: 11px !important;
  color: #4b5563 !important;
}

/* ── PRINT ── */
@media print {
  @page { size: A4; margin: 0; }

  .t22-resume {
    width: 210mm !important;
    min-height: 297mm !important;
    margin: 0 !important;
    box-shadow: none !important;
  }

  .t22-hero {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .t22-accent-strip {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .t22-sk-fill,
  .t22-tag,
  .t22-cert-item,
  .t22-summary,
  .t22-t-date,
  .t22-ldot-on {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .no-print { display: none !important; }
  .t22-t-item { page-break-inside: avoid; break-inside: avoid; }
  .t22-sec-title { page-break-after: avoid; break-after: avoid; }
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .t22-resume { width: 100%; }
  .t22-body { flex-direction: column; }
  .t22-left { width: 100%; border-right: none; border-bottom: 1px solid #f0eefc; }
}
`;

  /* ══════════════════════════════════════════════════════
     HTML GENERATION — for PDF
  ══════════════════════════════════════════════════════ */
  const generateHTML = () => {
    const stripHtmlHelper = (html: string) =>
      html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

    const renderExpText = (text: string) => {
      if (!text) return "";
      if (text.includes("<") && text.includes(">"))
        return `<div class="t22-t-content t22-wrap-break-word">${text}</div>`;
      const lines = text.split("\n").filter((l) => l.trim() !== "");
      if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•")))
        return `<div class="t22-t-content"><ul class="t22-exp-list">${lines.map((l) => {
          const t = l.trim();
          const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
          return c ? `<li>${c}</li>` : "";
        }).join("")}</ul></div>`;
      return `<div class="t22-t-content" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
    };

    const renderEduText = (text: string) => {
      if (!text) return "";
      if (text.includes("<") && text.includes(">"))
        return `<div class="t22-t-content">${text}</div>`;
      const lines = text.split("\n").filter((l) => l.trim() !== "");
      if (lines.some((l) => l.trim().startsWith("-") || l.trim().startsWith("•")))
        return `<div class="t22-t-content"><ul class="t22-edu-list">${lines.map((l) => {
          const t = l.trim();
          const c = t.startsWith("-") || t.startsWith("•") ? t.substring(1).trim() : t;
          return c ? `<li>${c}</li>` : "";
        }).join("")}</ul></div>`;
      return `<div class="t22-t-content" style="white-space:pre-wrap">${stripHtmlHelper(text)}</div>`;
    };

    const hasLangs = finalize && !Array.isArray(finalize) && Array.isArray(finalize.languages) &&
      finalize.languages.some((l: any) => l.name && l.name.trim() !== "");
    const hasCerts = finalize && !Array.isArray(finalize) && Array.isArray(finalize.certificationsAndLicenses) &&
      finalize.certificationsAndLicenses.some((i: any) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "");
    const hasHobbies = finalize && !Array.isArray(finalize) && Array.isArray(finalize.hobbiesAndInterests) &&
      finalize.hobbiesAndInterests.some((i: any) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "");
    const hasAwards = finalize && !Array.isArray(finalize) && Array.isArray(finalize.awardsAndHonors) &&
      finalize.awardsAndHonors.some((i: any) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "");
    const hasRefs = finalize && !Array.isArray(finalize) && Array.isArray(finalize.references) &&
      finalize.references.some((i: any) => i.name && i.name.replace(/<[^>]*>/g, "").trim() !== "");
    const hasWeb = finalize && !Array.isArray(finalize) && Array.isArray(finalize.websitesAndSocialMedia) &&
      finalize.websitesAndSocialMedia.some((i: any) => (i.websiteUrl && i.websiteUrl.trim() !== "") || (i.socialMedia && i.socialMedia.trim() !== ""));

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
  <style>${styles}</style>
</head>
<body>
<div class="t22-resume">

  <div class="t22-hero">
    <div class="t22-hero-circle" style="width:200px;height:200px;top:-70px;right:-50px"></div>
    <div class="t22-hero-circle" style="width:90px;height:90px;bottom:-35px;right:140px"></div>
    <div class="t22-hero-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
    <div class="t22-hero-title">${jobTitle}</div>
    <div class="t22-hero-contacts">
      ${contact?.email    ? `<div class="t22-hero-chip"><div class="t22-hero-dot"></div>${contact.email}</div>` : ""}
      ${contact?.phone    ? `<div class="t22-hero-chip"><div class="t22-hero-dot"></div>${contact.phone}</div>` : ""}
      ${addressParts.length > 0 ? `<div class="t22-hero-chip"><div class="t22-hero-dot"></div>${addressParts.join(", ")}</div>` : ""}
      ${linkedinUrl  ? `<div class="t22-hero-chip"><div class="t22-hero-dot"></div>${linkedinUrl}</div>`  : ""}
      ${portfolioUrl ? `<div class="t22-hero-chip"><div class="t22-hero-dot"></div>${portfolioUrl}</div>` : ""}
    </div>
  </div>
  <div class="t22-accent-strip"></div>

  <div class="t22-body">

    <!-- LEFT COLUMN -->
    <div class="t22-left">

      ${skills.length > 0 ? `
      <div class="t22-sec-title">Skills <div class="t22-sec-line"></div></div>
      ${skills.map((s, i) => `
        <div class="t22-sk-row">
          <div class="t22-sk-name">${s.skill || ""}<span class="t22-sk-pct">${s.level ? Math.round((Number(s.level)/4)*100)+"%" : ""}</span></div>
          ${s.skill && s.level ? `<div class="t22-sk-track"><div class="t22-sk-fill" style="width:${(Number(s.level)/4)*100}%;background:${BAR_COLOURS[i % BAR_COLOURS.length]}"></div></div>` : ""}
        </div>`).join("")}
      ` : ""}

      ${hasLangs ? `
      <div class="t22-sec-title">Languages <div class="t22-sec-line"></div></div>
      ${(finalize as any).languages.filter((l: any) => l.name && l.name.trim() !== "").map((l: any) => {
        const filled = l.level ? Math.round((Number(l.level)/4)*5) : 5;
        const dots = Array.from({length:5}, (_, idx) =>
          `<div class="t22-ldot ${idx < filled ? "t22-ldot-on" : "t22-ldot-off"}"></div>`
        ).join("");
        return `<div class="t22-lang-row"><div class="t22-lang-name">${l.name}</div><div class="t22-lang-dots">${dots}</div></div>`;
      }).join("")}
      ` : ""}

      ${hasCerts ? `
      <div class="t22-sec-title">Certifications <div class="t22-sec-line"></div></div>
      ${(finalize as any).certificationsAndLicenses.filter((i: any) => i.name && i.name.replace(/<[^>]*>/g,"").trim()!=="").map((i: any) =>
        `<div class="t22-cert-item">${i.name}</div>`
      ).join("")}
      ` : ""}

      ${hasHobbies ? `
      <div class="t22-sec-title">Interests <div class="t22-sec-line"></div></div>
      <div class="t22-pill-row">
        ${(finalize as any).hobbiesAndInterests.filter((i: any) => i.name && i.name.replace(/<[^>]*>/g,"").trim()!=="").map((i: any) =>
          `<span class="t22-pill">${i.name.replace(/<[^>]*>/g,"").trim()}</span>`
        ).join("")}
      </div>
      ` : ""}

      ${hasAwards ? `
      <div class="t22-sec-title">Awards <div class="t22-sec-line"></div></div>
      ${(finalize as any).awardsAndHonors.filter((i: any) => i.name && i.name.replace(/<[^>]*>/g,"").trim()!=="").map((i: any) =>
        `<div class="t22-cert-item">${i.name}</div>`
      ).join("")}
      ` : ""}

      ${hasRefs ? `
      <div class="t22-sec-title">References <div class="t22-sec-line"></div></div>
      ${(finalize as any).references.filter((i: any) => i.name && i.name.replace(/<[^>]*>/g,"").trim()!=="").map((i: any) =>
        `<div class="t22-sidebar-item">${i.name}</div>`
      ).join("")}
      ` : ""}

      ${hasWeb ? `
      <div class="t22-sec-title">Online <div class="t22-sec-line"></div></div>
      ${(finalize as any).websitesAndSocialMedia.filter((i: any) => i.websiteUrl||i.socialMedia).map((i: any) =>
        `<div class="t22-sidebar-item">${i.websiteUrl ? `<div>${i.websiteUrl}</div>` : ""}${i.socialMedia ? `<div>${i.socialMedia}</div>` : ""}</div>`
      ).join("")}
      ` : ""}

    </div>

    <!-- RIGHT COLUMN -->
    <div class="t22-right">

      ${summary ? `
      <div class="t22-sec-title">Profile <div class="t22-sec-line"></div></div>
      <div class="t22-summary">${summary.replace(/\n/g,"<br>")}</div>
      ` : ""}

      ${experiences.length > 0 ? `
      <div class="t22-sec-title">Experience <div class="t22-sec-line"></div></div>
      ${experiences.map((exp, idx) => {
        const s = formatMonthYear(exp.startDate, true);
        const e = exp.endDate ? formatMonthYear(exp.endDate, true) : "Present";
        const isLast = idx === experiences.length - 1;
        return `<div class="t22-t-item">
          <div class="t22-t-left"><div class="t22-t-dot"></div>${!isLast ? `<div class="t22-t-line"></div>` : ""}</div>
          <div class="t22-t-body">
            <div class="t22-t-title">${exp.jobTitle || ""}</div>
            <div class="t22-t-meta">
              <span class="t22-t-company">${exp.employer || ""}${exp.location ? ` · ${exp.location}` : ""}</span>
              <span class="t22-t-date">${s} – ${e}</span>
            </div>
            ${exp.text ? renderExpText(exp.text) : ""}
          </div>
        </div>`;
      }).join("")}
      ` : ""}

      ${educations.length > 0 ? `
      <div class="t22-sec-title">Education <div class="t22-sec-line"></div></div>
      ${educations.map((edu, idx) => {
        const dateStr = edu.startDate || edu.endDate
          ? `${edu.startDate || ""}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate || ""}`
          : "";
        const isLast = idx === educations.length - 1;
        return `<div class="t22-t-item">
          <div class="t22-t-left"><div class="t22-t-dot t22-t-dot-edu"></div>${!isLast ? `<div class="t22-t-line"></div>` : ""}</div>
          <div class="t22-t-body">
            <div class="t22-t-title">${edu.schoolname || ""}</div>
            <div class="t22-t-meta">
              <span class="t22-t-company t22-t-company-edu">${edu.degree || ""}${edu.degree && edu.location ? " · " : ""}${edu.location || ""}</span>
              ${dateStr ? `<span class="t22-t-date t22-t-date-edu">${dateStr}</span>` : ""}
            </div>
            ${renderEduText(edu.text || "")}
          </div>
        </div>`;
      }).join("")}
      ` : ""}

      ${finalize && !Array.isArray(finalize) && Array.isArray((finalize as any).customSection) &&
        (finalize as any).customSection.some((s: any) => s?.name?.trim() || s?.description?.trim())
        ? (finalize as any).customSection
            .filter((s: any) => s?.name?.trim() || s?.description?.trim())
            .map((s: any) => `
              <div>
                ${s.name ? `<div class="t22-sec-title">${s.name} <div class="t22-sec-line"></div></div>` : ""}
                ${s.description ? `<div class="t22-custom-content">${s.description}</div>` : ""}
              </div>`).join("")
        : ""}

    </div>
  </div>
</div>
</body>
</html>`;
  };

  /* ══════════════════════════════════════════════════════
     PDF DOWNLOAD + UPLOAD
  ══════════════════════════════════════════════════════ */
  const UseContext = useContext(CreateContext);
  const Contactid  = UseContext?.contact.contactId;
  const userDetails = getLocalStorage<User>("user_details");
  const userId = userDetails?.id;

  const handleDownload = async (): Promise<void> => {
    try {
      const html: string = generateHTML();
      const res: AxiosResponse<Blob> = await axios.post(
        `${API_URL}/api/candidates/generate-pdf`,
        { html },
        { responseType: "blob" },
      );
      const pdfBlob: Blob = res.data;
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      await fetchOldResumeData(pdfBlob);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const fetchOldResumeData = async (pdfBlob: Blob): Promise<void> => {
    if (!userId || !Contactid) return;
    try {
      const formData = new FormData();
      formData.append("userId",    userId);
      formData.append("message",   "success");
      formData.append("contactId", Contactid);
      formData.append("resume",    pdfBlob, "resume.pdf");
      await axios.post(`${API_URL}/api/users/download-resume`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const stripHtml = (html: string) => html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

  /* ══════════════════════════════════════════════════════
     JSX PREVIEW
  ══════════════════════════════════════════════════════ */
  const hasLangs   = finalize && !Array.isArray(finalize) && Array.isArray((finalize as any).languages) &&
    (finalize as any).languages.some((l: any) => l.name && l.name.trim() !== "");
  const hasCerts   = finalize && !Array.isArray(finalize) && Array.isArray((finalize as any).certificationsAndLicenses) &&
    (finalize as any).certificationsAndLicenses.some((i: any) => i.name && i.name.replace(/<[^>]*>/g,"").trim() !== "");
  const hasHobbies = finalize && !Array.isArray(finalize) && Array.isArray((finalize as any).hobbiesAndInterests) &&
    (finalize as any).hobbiesAndInterests.some((i: any) => i.name && i.name.replace(/<[^>]*>/g,"").trim() !== "");
  const hasAwards  = finalize && !Array.isArray(finalize) && Array.isArray((finalize as any).awardsAndHonors) &&
    (finalize as any).awardsAndHonors.some((i: any) => i.name && i.name.replace(/<[^>]*>/g,"").trim() !== "");
  const hasRefs    = finalize && !Array.isArray(finalize) && Array.isArray((finalize as any).references) &&
    (finalize as any).references.some((i: any) => i.name && i.name.replace(/<[^>]*>/g,"").trim() !== "");
  const hasWeb     = finalize && !Array.isArray(finalize) && Array.isArray((finalize as any).websitesAndSocialMedia) &&
    (finalize as any).websitesAndSocialMedia.some((i: any) => (i.websiteUrl && i.websiteUrl.trim()!=="") || (i.socialMedia && i.socialMedia.trim()!==""));

  return (
    <>
      {lastSegment === "download-resume" && (
        <div style={{ textAlign:"center", marginTop:"20px", marginBottom:"20px" }}>
          <button
            onClick={handleDownload}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Download Resume
          </button>
        </div>
      )}

      <div
        className={`t22-resume bg-white ${alldata ? "is-preview" : ""}`}
        style={{ margin:"0 auto", boxShadow: !alldata ? "0 0 10px rgba(0,0,0,0.1)" : "" }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');`}</style>
        <style>{styles}</style>

        {/* ── HERO HEADER ── */}
        <div className="t22-hero">
          <div className="t22-hero-circle" style={{width:"200px",height:"200px",top:"-70px",right:"-50px"}}/>
          <div className="t22-hero-circle" style={{width:"90px",height:"90px",bottom:"-35px",right:"140px"}}/>
          <div className="t22-hero-name">{contact?.firstName} {contact?.lastName}</div>
          <div className="t22-hero-title">{jobTitle}</div>
          <div className="t22-hero-contacts">
            {contact?.email    && <div className="t22-hero-chip"><div className="t22-hero-dot"/>{contact.email}</div>}
            {contact?.phone    && <div className="t22-hero-chip"><div className="t22-hero-dot"/>{contact.phone}</div>}
            {addressParts.length > 0 && <div className="t22-hero-chip"><div className="t22-hero-dot"/>{addressParts.join(", ")}</div>}
            {linkedinUrl  && <div className="t22-hero-chip"><div className="t22-hero-dot"/>{linkedinUrl}</div>}
            {portfolioUrl && <div className="t22-hero-chip"><div className="t22-hero-dot"/>{portfolioUrl}</div>}
          </div>
        </div>
        <div className="t22-accent-strip"/>

        <div className="t22-body">

          {/* ── LEFT COLUMN ── */}
          <div className="t22-left">

            {skills.length > 0 && (
              <>
                <div className="t22-sec-title">Skills <div className="t22-sec-line"/></div>
                {skills.map((skill, i) => (
                  <div key={i} className="t22-sk-row">
                    <div className="t22-sk-name">
                      {skill.skill}
                      {skill.level && <span className="t22-sk-pct">{Math.round((Number(skill.level)/4)*100)}%</span>}
                    </div>
                    {skill.skill && skill.level && (
                      <div className="t22-sk-track">
                        <div
                          className="t22-sk-fill"
                          style={{
                            width: `${(Number(skill.level)/4)*100}%`,
                            background: BAR_COLOURS[i % BAR_COLOURS.length],
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {hasLangs && (
              <>
                <div className="t22-sec-title">Languages <div className="t22-sec-line"/></div>
                {(finalize as any).languages.map((lang: any, index: number) =>
                  lang.name && lang.name.trim() !== "" ? (
                    <div key={lang._id || index} className="t22-lang-row">
                      <div className="t22-lang-name">{lang.name}</div>
                      <div className="t22-lang-dots">
                        {Array.from({length:5}, (_, idx) => {
                          const filled = lang.level ? Math.round((Number(lang.level)/4)*5) : 5;
                          return <div key={idx} className={`t22-ldot ${idx < filled ? "t22-ldot-on" : "t22-ldot-off"}`}/>;
                        })}
                      </div>
                    </div>
                  ) : null
                )}
              </>
            )}

            {hasCerts && (
              <>
                <div className="t22-sec-title">Certifications <div className="t22-sec-line"/></div>
                {(finalize as any).certificationsAndLicenses.map((item: any, index: number) =>
                  item.name && item.name.replace(/<[^>]*>/g,"").trim() !== "" ? (
                    <div key={item.id || index} className="t22-cert-item" dangerouslySetInnerHTML={{ __html: item.name }}/>
                  ) : null
                )}
              </>
            )}

            {hasHobbies && (
              <>
                <div className="t22-sec-title">Interests <div className="t22-sec-line"/></div>
                <div className="t22-pill-row">
                  {(finalize as any).hobbiesAndInterests.map((item: any, index: number) =>
                    item.name && item.name.replace(/<[^>]*>/g,"").trim() !== "" ? (
                      <span key={item.id || index} className="t22-pill">{item.name.replace(/<[^>]*>/g,"").trim()}</span>
                    ) : null
                  )}
                </div>
              </>
            )}

            {hasAwards && (
              <>
                <div className="t22-sec-title">Awards <div className="t22-sec-line"/></div>
                {(finalize as any).awardsAndHonors.map((item: any, index: number) =>
                  item.name && item.name.replace(/<[^>]*>/g,"").trim() !== "" ? (
                    <div key={item.id || index} className="t22-cert-item" dangerouslySetInnerHTML={{ __html: item.name }}/>
                  ) : null
                )}
              </>
            )}

            {hasRefs && (
              <>
                <div className="t22-sec-title">References <div className="t22-sec-line"/></div>
                {(finalize as any).references.map((item: any, index: number) =>
                  item.name && item.name.replace(/<[^>]*>/g,"").trim() !== "" ? (
                    <div key={item.id || index} className="t22-sidebar-item" dangerouslySetInnerHTML={{ __html: item.name }}/>
                  ) : null
                )}
              </>
            )}

            {hasWeb && (
              <>
                <div className="t22-sec-title">Online <div className="t22-sec-line"/></div>
                {(finalize as any).websitesAndSocialMedia.map((item: any, index: number) =>
                  (item.websiteUrl || item.socialMedia) ? (
                    <div key={item.id || index} className="t22-sidebar-item">
                      {item.websiteUrl  && <div>{item.websiteUrl}</div>}
                      {item.socialMedia && <div>{item.socialMedia}</div>}
                    </div>
                  ) : null
                )}
              </>
            )}

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="t22-right">

            {summary && (
              <>
                <div className="t22-sec-title">Profile <div className="t22-sec-line"/></div>
                <div className="t22-summary" dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g,"<br>") }}/>
              </>
            )}

            {experiences.length > 0 && (
              <>
                <div className="t22-sec-title">Experience <div className="t22-sec-line"/></div>
                {experiences.map((exp, i) => (
                  <div key={i} className="t22-t-item">
                    <div className="t22-t-left">
                      <div className="t22-t-dot"/>
                      {i < experiences.length - 1 && <div className="t22-t-line"/>}
                    </div>
                    <div className="t22-t-body">
                      <div className="t22-t-title">{exp.jobTitle}</div>
                      <div className="t22-t-meta">
                        <span className="t22-t-company">{exp.employer}{exp.location && ` · ${exp.location}`}</span>
                        <span className="t22-t-date">
                          <MonthYearDisplay value={exp.startDate} shortYear/>
                          {" – "}
                          {exp.endDate ? <MonthYearDisplay value={exp.endDate} shortYear/> : "Present"}
                        </span>
                      </div>
                      {exp.text && (
                        <div
                          className="t22-t-content t22-wrap-break-word"
                          dangerouslySetInnerHTML={{ __html: exp.text }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}

            {educations.length > 0 && (
              <>
                <div className="t22-sec-title">Education <div className="t22-sec-line"/></div>
                {educations.map((edu, index) => {
                  let textContent = null;
                  if (edu.text) {
                    if (edu.text.includes("<") && edu.text.includes(">")) {
                      textContent = <div className="t22-t-content" dangerouslySetInnerHTML={{ __html: edu.text }}/>;
                    } else {
                      const lines = edu.text.split("\n").filter((l) => l.trim() !== "");
                      if (lines.some((l) => l.trim().startsWith("-"))) {
                        textContent = (
                          <div className="t22-t-content">
                            <ul className="t22-edu-list">
                              {lines.map((l, li) => {
                                const t = l.trim();
                                const c = t.startsWith("-") ? t.substring(1).trim() : t;
                                return c ? <li key={li}>{c}</li> : null;
                              })}
                            </ul>
                          </div>
                        );
                      } else {
                        textContent = (
                          <div className="t22-t-content" style={{whiteSpace:"pre-wrap"}}>{stripHtml(edu.text)}</div>
                        );
                      }
                    }
                  }
                  return (
                    <div key={edu.id || index} className="t22-t-item">
                      <div className="t22-t-left">
                        <div className="t22-t-dot t22-t-dot-edu"/>
                        {index < educations.length - 1 && <div className="t22-t-line"/>}
                      </div>
                      <div className="t22-t-body">
                        <div className="t22-t-title">{edu.schoolname || ""}</div>
                        <div className="t22-t-meta">
                          <span className="t22-t-company t22-t-company-edu">
                            {edu.degree && <span>{edu.degree}</span>}
                            {edu.degree && edu.location && " · "}
                            {edu.location && <span>{edu.location}</span>}
                          </span>
                          {(edu.startDate || edu.endDate) && (
                            <span className="t22-t-date t22-t-date-edu">
                              {edu.startDate || ""}
                              {edu.startDate && edu.endDate && " – "}
                              {edu.endDate || ""}
                            </span>
                          )}
                        </div>
                        {textContent}
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {/* CUSTOM SECTIONS */}
            {finalize && !Array.isArray(finalize) &&
              Array.isArray((finalize as any).customSection) &&
              (finalize as any).customSection.some((s: any) => s?.name?.trim() || s?.description?.trim()) &&
              (finalize as any).customSection
                .filter((s: any) => s?.name?.trim() || s?.description?.trim())
                .map((section: any, index: number) => (
                  <div key={section.id || index}>
                    {section.name && (
                      <div className="t22-sec-title">{section.name} <div className="t22-sec-line"/></div>
                    )}
                    {section.description && (
                      <div className="t22-custom-content" dangerouslySetInnerHTML={{ __html: section.description }}/>
                    )}
                  </div>
                ))}

          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateTwentyTwo;