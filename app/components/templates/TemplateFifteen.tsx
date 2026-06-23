"use client";
import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { AxiosResponse } from "axios";
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
import api from "@/app/utils/api";
import { ResumeCustomization } from "@/app/(resume)/download-resume/page";
import { FaDownload, FaSpinner } from "react-icons/fa";

// ─────────────────────────────────────────────────────────────────────────────
// A4 CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const A4_W = 794;
const A4_H = 1123;
const MARGIN = 57;
const PAGE_CONTENT_H = A4_H - MARGIN * 2;

interface TemplateFifteenProps extends ResumeProps {
  customization?: ResumeCustomization;
  viewMode?:boolean
}

const TemplateFifteen: React.FC<TemplateFifteenProps> = ({
  alldata,
  customization,
  viewMode=false
}) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

  const activeFontFamily = customization?.fontFamily ?? "'DM Sans', sans-serif";

  // ── Data ──────────────────────────────────────────────────────────────────
  const contact = alldata?.contact || context?.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills?.text || context?.skills?.text || "";
  const projects = alldata?.projects || context?.projects || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";

  const addressParts = [
    contact?.address,
    contact?.city,
    contact?.postCode,
    contact?.country,
  ].filter(Boolean);
  const linkedinUrl = contact?.linkedIn;
  const portfolioUrl = contact?.portfolio;
  const githubUrl = contact?.github;
  const dateOfBirth = contact?.dob;

  // ── Font map ───────────────────────────────────────────────────────────────
  const getFontImport = (fontFamily: string): string => {
    const fontMap: Record<string, string> = {
      "'DM Sans', sans-serif":
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&family=DM+Sans:wght@400;500;600;700&display=swap",
      "'Inter', sans-serif":
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      "'Poppins', sans-serif":
        "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
      "'Lato', sans-serif":
        "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
      "'Nunito', sans-serif":
        "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap",
      "'Raleway', sans-serif":
        "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700&display=swap",
      "'Montserrat', sans-serif":
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
      "'Open Sans', sans-serif":
        "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap",
      "'Roboto', sans-serif":
        "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
      "'Merriweather', serif":
        "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
      "'Playfair Display', serif":
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
      "'Source Code Pro', monospace":
        "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap",
      "'JetBrains Mono', monospace":
        "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
    };
    return fontMap[fontFamily] || fontMap["'DM Sans', sans-serif"];
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes("serif"))
      return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes("monospace"))
      return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  // ── CSS builder ────────────────────────────────────────────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @import url('${getFontImport(fontFamily)}');

    @page { size: A4; margin: 15mm; }
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: white; }

    .t15-resume {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background: #ffffff;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 13px;
      line-height: 1.6;
      color: #2d3748;
    }

    .t15-resume p { margin: 0 !important; padding: 0 !important; line-height: 1.6 !important; }

    /* ── HEADER ── */
    .t15-header {
      padding: 24px 0 0;
      border-bottom: 3px solid #e53e3e;
      margin-bottom: 25px;
    }

    .t15-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 38px;
      font-weight: 800;
      color: #1a202c;
      letter-spacing: -0.02em;
      line-height: 1.1;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t15-jobtitle {
      font-size: 11px;
      font-weight: 600;
      color: #e53e3e;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      margin-top: 4px;
      margin-bottom: 10px;
    }

    .t15-contact-row {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 14px;
      padding-bottom: 12px;
      align-items: center;
    }

    .t15-contact-item {
      font-size: 11px;
      color: #718096;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .t15-contact-sep {
      color: #e53e3e;
      font-size: 10px;
    }

    .t15-header-link {
      font-size: 11px;
      color: #e53e3e;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    /* ── SECTION TITLES ── */
    .t15-section-content { margin-bottom: 4px; }

    .t15-stitle {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #e53e3e;
      margin-top: 18px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      page-break-after: avoid;
      break-after: avoid;
    }

    .t15-stitle:first-child { margin-top: 0; }

    .t15-stitle::after {
      content: '';
      flex: 1;
      height: 1.5px;
      background: #fed7d7;
    }

    /* ── SUMMARY ── */
    .t15-summary {
      font-size: 12.5px;
      color: #4a5568;
      line-height: 1.7;
      word-wrap: break-word;
      overflow-wrap: break-word;
      padding: 0 2px;
    }

    /* ── ENTRY ── */
    .t15-entry {
      margin-bottom: 14px;
      padding-bottom: 12px;
      border-bottom: 1px solid #fff0f0;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .t15-entry:last-child {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 0;
    }

    .t15-entry-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
      page-break-after: avoid;
      break-after: avoid;
    }

    .t15-entry-title-wrap {
      display: flex;
      align-items: baseline;
      gap: 7px;
      flex: 1;
    }

    .t15-dot {
      width: 7px;
      height: 7px;
      background: #e53e3e;
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: 4px;
      display: inline-block;
    }

    .t15-entry-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #1a202c;
      line-height: 1.3;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .t15-entry-date {
      font-size: 10.5px;
      color: #a0aec0;
      white-space: nowrap;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .t15-entry-sub {
      font-size: 11px;
      color: #718096;
      margin-top: 2px;
      margin-left: 14px;
      font-style: italic;
    }

    .t15-entry-content {
      font-size: 12px;
      color: #4a5568;
      line-height: 1.65;
      margin-top: 5px;
      margin-left: 14px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* ── LISTS ── */
    .t15-entry-content ul, .t15-entry-content ol,
    .t15-summary ul, .t15-summary ol,
    .t15-skills-content ul, .t15-skills-content ol,
    .t15-custom-section-content ul, .t15-custom-section-content ol {
      margin: 6px 0 6px 20px !important;
      padding-left: 0 !important;
    }
    .t15-entry-content ul, .t15-summary ul, .t15-skills-content ul,
    .t15-custom-section-content ul { list-style-type: disc !important; }
    .t15-entry-content ol, .t15-summary ol, .t15-skills-content ol,
    .t15-custom-section-content ol { list-style-type: decimal !important; }
    .t15-entry-content li, .t15-summary li, .t15-skills-content li,
    .t15-custom-section-content li {
      margin-bottom: 4px !important;
      line-height: 1.6 !important;
      font-size: 12px !important;
    }
    .t15-entry-content strong, .t15-summary strong,
    .t15-skills-content strong, .t15-custom-section-content strong { font-weight: 700 !important; }
    .t15-entry-content em, .t15-summary em,
    .t15-skills-content em, .t15-custom-section-content em { font-style: italic !important; }
    .t15-entry-content u, .t15-summary u,
    .t15-skills-content u, .t15-custom-section-content u { text-decoration: underline !important; }

    /* ── SKILLS ── */
    .t15-skills-content {
      font-size: 12px;
      line-height: 1.65;
      color: #4a5568;
      padding: 0 2px;
    }

    /* ── CUSTOM SECTIONS ── */
    .t15-custom-section-content {
      font-size: 12px;
      line-height: 1.65;
      color: #4a5568;
      padding: 0 2px;
    }

    /* ── PROJECTS ── */
    .t15-project-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      gap: 8px;
    }

    .t15-project-links {
      display: inline-flex;
      gap: 10px;
      flex-shrink: 0;
      align-items: center;
    }

    .t15-project-link {
      font-size: 10px;
      color: #e53e3e !important;
      text-decoration: underline !important;
      white-space: nowrap;
    }

    .t15-project-tech-stack {
      font-size: 11px;
      color: #718096;
      margin: 3px 0 4px 14px;
    }

    /* ── EDUCATION ── */
    .t15-education-grade {
      font-size: 10px;
      color: #718096;
      margin-top: 2px;
      margin-left: 14px;
      font-weight: 500;
    }

    /* ── PAGE BREAK ── */
    .t15-page-break {
      page-break-before: always !important;
      break-before: page !important;
      display: block; height: 0; margin: 0; padding: 0;
    }

    @media print {
      *, *::before, *::after {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      html, body { overflow: visible; }
      .t15-resume { width: 100% !important; padding: 0 !important; }
      .t15-project-link { color: #e53e3e !important; }
      .t15-header-link { color: #e53e3e !important; }
      a, a:visited { color: inherit !important; }
    }
  `,
    [],
  );

  // ── HTML builder ───────────────────────────────────────────────────────────
  const generateHTML = useCallback(
    (forPDF = false, pageBreakIds: string[] = []): string => {
      const CSS = buildCSS(activeFontFamily);

      const richText = (html: string, cls: string) => {
        if (!html) return "";
        const clean = cleanQuillHTML(html);
        if (!clean || clean === "<p><br></p>") return "";
        return `<div class="${cls}">${clean}</div>`;
      };

      const hasSkillsContent = (): boolean => {
        if (!skills?.trim()) return false;
        const cleaned = cleanQuillHTML(skills);
        if (!cleaned || cleaned === "<p><br></p>") return false;
        return cleaned.replace(/<[^>]*>/g, "").trim().length > 0;
      };

      const href = (url: string) =>
        url.startsWith("http") ? url : `https://${url}`;
      const formattedDob = formatDateOfBirth(dateOfBirth || "");

      const jobTitle = contact?.jobTitle
        ? typeof contact.jobTitle === "string"
          ? contact.jobTitle
          : (contact.jobTitle as any)?.name || ""
        : "";

      const contactItems = [
        contact?.email,
        contact?.phone,
        formattedDob,
        addressParts.length ? addressParts.join(", ") : null,
      ].filter(Boolean) as string[];

      // ── HEADER ──
      const header = `
      <div class="t15-header">
        <div class="t15-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
        ${jobTitle ? `<div class="t15-jobtitle">${jobTitle}</div>` : ""}
        <div class="t15-contact-row">
          ${contactItems
            .map(
              (item, i) =>
                `${i > 0 ? `<span class="t15-contact-sep">·</span>` : ""}
                 <span class="t15-contact-item">${item}</span>`,
            )
            .join("")}
          ${linkedinUrl?.trim() ? `<span class="t15-contact-sep">·</span><a href="${href(linkedinUrl)}" class="t15-header-link" target="_blank">LinkedIn</a>` : ""}
          ${githubUrl?.trim() ? `<span class="t15-contact-sep">·</span><a href="${href(githubUrl)}" class="t15-header-link" target="_blank">GitHub</a>` : ""}
          ${portfolioUrl?.trim() ? `<span class="t15-contact-sep">·</span><a href="${href(portfolioUrl)}" class="t15-header-link" target="_blank">Portfolio</a>` : ""}
        </div>
      </div>`;

      // ── SUMMARY ──
      const summaryBlock = summary?.trim()
        ? `<div class="t15-section-content" data-block-id="summary">
             <div class="t15-stitle">Summary</div>
             ${richText(summary.replace(/\n/g, "<br>"), "t15-summary")}
           </div>`
        : "";

      // ── EXPERIENCE ──
      const expBlock = experiences.length
        ? `<div class="t15-section-content" data-block-id="exp-section">
             <div class="t15-stitle">Experience</div>
             ${experiences
               .map((exp: any, i: number) => {
                 const s = formatMonthYear(exp.startDate, false);
                 const e = exp.endDate
                   ? formatMonthYear(exp.endDate, false)
                   : exp.startDate
                     ? "Present"
                     : "";
                 const companyLocation = [exp.employer, exp.location]
                   .filter(Boolean)
                   .join(" · ");
                 return `<div class="t15-entry" data-block-id="exp-${i}">
                   <div class="t15-entry-top">
                     <div class="t15-entry-title-wrap">
                       <span class="t15-dot"></span>
                       <span class="t15-entry-title">${exp.jobTitle || ""}</span>
                     </div>
                     ${s || e ? `<div class="t15-entry-date">${s}${s && e ? " – " : ""}${e}</div>` : ""}
                   </div>
                   ${companyLocation ? `<div class="t15-entry-sub">${companyLocation}</div>` : ""}
                   ${exp.text ? richText(exp.text, "t15-entry-content") : ""}
                 </div>`;
               })
               .join("")}
           </div>`
        : "";

      // ── PROJECTS ──
      const projBlock = projects.length
        ? `<div class="t15-section-content" data-block-id="proj-section">
             <div class="t15-stitle">Projects</div>
             ${projects
               .map(
                 (p: any, i: number) => `
               <div class="t15-entry" data-block-id="proj-${i}">
                 <div class="t15-entry-top">
                   <div class="t15-entry-title-wrap">
                     <span class="t15-dot"></span>
                     <span class="t15-entry-title">${p.title || ""}</span>
                   </div>
                   ${
                     p.liveUrl || p.githubUrl
                       ? `<div class="t15-project-links">
                         ${p.liveUrl ? `<a href="${href(p.liveUrl)}" class="t15-project-link" target="_blank">Live Demo</a>` : ""}
                         ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t15-project-link" target="_blank">GitHub</a>` : ""}
                       </div>`
                       : ""
                   }
                 </div>
                 ${p.techStack?.length ? `<div class="t15-project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" • ")}</div>` : ""}
                 ${p.description ? richText(p.description, "t15-entry-content") : ""}
               </div>`,
               )
               .join("")}
           </div>`
        : "";

      // ── EDUCATION ──
      const eduBlock = educations.length
        ? `<div class="t15-section-content" data-block-id="edu-section">
             <div class="t15-stitle">Education</div>
             ${educations
               .map((edu: any, i: number) => {
                 const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
                 const schoolLocation = [edu.schoolname, edu.location]
                   .filter(Boolean)
                   .join(" · ");
                 return `<div class="t15-entry" data-block-id="edu-${i}">
                   <div class="t15-entry-top">
                     <div class="t15-entry-title-wrap">
                       <span class="t15-dot"></span>
                       <span class="t15-entry-title">${edu.degree || ""}</span>
                     </div>
                     ${
                       edu.startDate || edu.endDate
                         ? `<div class="t15-entry-date">${[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}</div>`
                         : ""
                     }
                   </div>
                   ${schoolLocation ? `<div class="t15-entry-sub">${schoolLocation}</div>` : ""}
                   ${grade ? `<div class="t15-education-grade">${grade}</div>` : ""}
                   ${edu.text ? richText(edu.text, "t15-entry-content") : ""}
                 </div>`;
               })
               .join("")}
           </div>`
        : "";

      // ── SKILLS ──
      const skillsBlock = (() => {
        if (!hasSkillsContent()) return "";
        const cleanedSkills = cleanQuillHTML(skills);
        return `<div class="t15-section-content" data-block-id="skills-section">
          <div class="t15-stitle">Skills</div>
          <div class="t15-skills-content" data-block-id="skills-content">${cleanedSkills}</div>
        </div>`;
      })();

      // ── CUSTOM SECTIONS ──
      const customSection = Array.isArray(finalize?.customSection)
        ? finalize.customSection
        : !Array.isArray(finalize) && Array.isArray(finalize?.customSection)
          ? finalize.customSection
          : [];

      const customBlock =
        !Array.isArray(finalize) &&
        Array.isArray(finalize?.customSection) &&
        finalize.customSection.some(
          (s: any) => s?.name?.trim() || s?.description?.trim(),
        )
          ? finalize.customSection
              .filter((s: any) => s?.name?.trim() || s?.description?.trim())
              .map(
                (s: any, i: number) => `
                <div class="t15-section-content" data-block-id="custom-${i}">
                  ${s.name ? `<div class="t15-stitle">${s.name}</div>` : ""}
                  ${s.description ? richText(s.description, "t15-custom-section-content") : ""}
                </div>`,
              )
              .join("")
          : "";

      const pdfStyle = forPDF
        ? `<style>.t15-resume { width: 100% !important; padding: 0 !important; }</style>`
        : "";

      let bodyContent = `${header}${summaryBlock}${expBlock}${projBlock}${eduBlock}${skillsBlock}${customBlock}`;

      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t15-page-break";
            el.parentNode?.insertBefore(breakDiv, el);
          }
        });
        bodyContent = tempDiv.innerHTML;
      }

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Resume</title>
  <style>${CSS}</style>
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t15-resume">${bodyContent}</div>
</body>
</html>`;
    },
    [
      activeFontFamily,
      contact,
      educations,
      experiences,
      skills,
      projects,
      finalize,
      summary,
      addressParts,
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      dateOfBirth,
      buildCSS,
    ],
  );

  // ── Page splitter (identical to TemplateOne) ───────────────────────────────
  const CSS_FOR_MEASURE = buildCSS(activeFontFamily);

  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t15-resume");
        if (!resumeEl) {
          resolve([fullHtml]);
          return;
        }
        const resumeSnapshot = resumeEl.outerHTML;

        const iframe = document.createElement("iframe");
        iframe.style.cssText = [
          "position:fixed",
          "top:0",
          "left:-9999px",
          `width:${A4_W}px`,
          "height:10000px",
          "border:none",
          "opacity:0",
          "pointer-events:none",
          "z-index:-1",
        ].join(";");
        document.body.appendChild(iframe);

        const measureDoc = iframe.contentDocument!;
        measureDoc.open();
        measureDoc.write(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"/>
<style>
  ${CSS_FOR_MEASURE}
  html, body {
    margin: 0 !important; padding: 0 !important;
    width: ${A4_W}px !important; height: auto !important;
    overflow: visible !important; background: white !important;
  }
  .t15-resume {
    width: ${A4_W}px !important;
    padding-left: ${MARGIN}px !important;
    padding-right: ${MARGIN}px !important;
    padding-top: 0 !important; padding-bottom: 0 !important;
    margin: 0 !important; box-sizing: border-box !important;
  }
</style></head>
<body>${resumeSnapshot}</body></html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t15-resume");
          if (!resume) {
            document.body.removeChild(iframe);
            resolve([fullHtml]);
            return;
          }

          measureDoc.documentElement.style.cssText =
            "height:auto!important;overflow:visible!important;";
          measureDoc.body.style.cssText =
            "margin:0;padding:0;height:auto!important;overflow:visible!important;";
          void resume.offsetHeight;

          const totalH = resume.scrollHeight;
          const resumeRect = resume.getBoundingClientRect();
          const scrollY =
            measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;
          const getRelTop = (el: HTMLElement) =>
            el.getBoundingClientRect().top - resumeRect.top + scrollY;
          const getRelBottom = (el: HTMLElement) =>
            getRelTop(el) + el.getBoundingClientRect().height;

          interface Block {
            top: number;
            bottom: number;
            id?: string;
          }
          const blocks: Block[] = [];

          // Collect all breakable entry/item blocks
          const ITEM_SELECTORS = [".t15-entry", ".t15-section-content"].join(
            ", ",
          );

          resume.querySelectorAll<HTMLElement>(ITEM_SELECTORS).forEach((el) => {
            const top = getRelTop(el);
            const bottom = getRelBottom(el);
            if (bottom - top > 8)
              blocks.push({ top, bottom, id: el.dataset.blockId });
          });

          // Skills li breakpoints
          const skillsLis = Array.from(
            resume.querySelectorAll<HTMLElement>(".t15-skills-content li"),
          );
          skillsLis.forEach((li) => {
            const top = getRelTop(li);
            const bottom = getRelBottom(li);
            if (bottom - top > 2) blocks.push({ top, bottom });
          });

          // Section-title anchor: keep title glued to first entry
          resume
            .querySelectorAll<HTMLElement>(".t15-stitle")
            .forEach((title) => {
              const titleTop = getRelTop(title);
              let firstItem: HTMLElement | null = null;
              let sib = title.nextElementSibling as HTMLElement | null;
              while (sib) {
                if (sib.getBoundingClientRect().height > 8) {
                  firstItem = sib;
                  break;
                }
                sib = sib.nextElementSibling as HTMLElement | null;
              }
              if (firstItem) {
                if (firstItem.classList.contains("t15-skills-content")) return;

                const deepChild =
                  firstItem.querySelector<HTMLElement>(".t15-entry");
                const anchor = deepChild || firstItem;
                const anchorBottom = getRelBottom(anchor);
                if (anchorBottom - titleTop > 8) {
                  const sectionId = (title.parentElement as HTMLElement)
                    ?.dataset?.blockId;
                  blocks.push({
                    top: titleTop,
                    bottom: anchorBottom,
                    id: sectionId,
                  });
                }
              }
            });

          blocks.sort((a, b) => a.top - b.top);

          const pageStarts: number[] = [0];
          const pageBreakIds: string[] = [];
          const MAX_PAGES = 20;

          while (pageStarts.length < MAX_PAGES) {
            const currentStart = pageStarts[pageStarts.length - 1];
            const naiveCut = currentStart + PAGE_CONTENT_H;
            if (naiveCut >= totalH) break;
            let actualCut = naiveCut;
            let cutBlockId: string | undefined;

            for (const block of blocks) {
              if (block.top >= naiveCut) break;
              if (block.bottom <= currentStart) continue;
              if (
                block.top >= currentStart &&
                block.bottom > naiveCut &&
                block.top < actualCut
              ) {
                actualCut = block.top;
                cutBlockId = block.id;
              }
            }
            if (actualCut <= currentStart) actualCut = naiveCut;
            pageStarts.push(actualCut);
            if (cutBlockId) pageBreakIds.push(cutBlockId);
          }

          document.body.removeChild(iframe);
          (window as any).__resumePageBreakIds = pageBreakIds;

          const pageHtmls: string[] = [];
          for (let i = 0; i < pageStarts.length; i++) {
            const contentOffsetY = pageStarts[i];
            const nextStart = pageStarts[i + 1] ?? totalH;
            const clipH = nextStart - contentOffsetY;
            pageHtmls.push(`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/>
<style>
  ${CSS_FOR_MEASURE}
  html, body {
    margin: 0 !important; padding: 0 !important;
    width: ${A4_W}px !important; height: ${A4_H}px !important;
    overflow: hidden !important; background: white !important;
  }
  .page-margin-box { position: relative; width: ${A4_W}px; height: ${A4_H}px; background: white; overflow: hidden; }
  .page-content-clip { position: absolute; top: ${MARGIN}px; left: 0; width: ${A4_W}px; height: ${clipH}px; overflow: hidden; }
  .page-shift { position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px; }
  .t15-resume {
    width: ${A4_W}px !important;
    padding-top: 0 !important; padding-bottom: 0 !important;
    padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important;
    margin: 0 !important;
  }
</style></head>
<body>
  <div class="page-margin-box">
    <div class="page-content-clip">
      <div class="page-shift">${resumeSnapshot}</div>
    </div>
  </div>
</body></html>`);
          }
          resolve(pageHtmls);
        };

        const win = iframe.contentWindow as any;
        if (win?.document?.fonts?.ready) {
          win.document.fonts.ready.then(() => {
            setTimeout(() => requestAnimationFrame(doMeasure), 100);
          });
        } else {
          setTimeout(doMeasure, 500);
        }
      });
    },
    [CSS_FOR_MEASURE],
  );

  // ── Debounced updates ──────────────────────────────────────────────────────
  const scheduleUpdate = useCallback((html: string) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 300);
  }, []);

  useEffect(() => {
    scheduleUpdate(generateHTML());
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [generateHTML, scheduleUpdate]);

  useEffect(() => {
    if (!htmlContent) return;
    splitIntoPages(htmlContent).then(setPages);
  }, [htmlContent, splitIntoPages]);

  // ── Download handler ───────────────────────────────────────────────────────
  const handleDownload = async (): Promise<void> => {
    setIsDownloading(true);
    try {
      const pageBreakIds: string[] = (window as any).__resumePageBreakIds || [];
      const pdfHtml = generateHTML(true, pageBreakIds);
      const res: AxiosResponse<Blob> = await api.post(
        `${API_URL}/candidates/generate-pdf`,
        { html: pdfHtml },
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
    } catch (err) {
      console.error("PDF error:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────
//   return (
//     <>
//       {/* {lastSegment === "download-resume" && ( */}
//       <div className="text-center my-8">
//         <motion.button
//           onClick={handleDownload}
//           disabled={isDownloading}
//           whileHover={!isDownloading ? { scale: 1.02, y: -2 } : {}}
//           whileTap={!isDownloading ? { scale: 0.98 } : {}}
//           className={`
//               relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold
//               text-white transition-all duration-300 shadow-lg
//               ${
//                 isDownloading
//                   ? "bg-gray-400 cursor-not-allowed opacity-80"
//                   : "bg-gradient-to-r from-red-500 to-rose-600 hover:shadow-2xl hover:from-red-600 hover:to-rose-700"
//               }
//             `}
//         >
//           {!isDownloading && (
//             <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
//           )}
//           <div className="relative flex items-center justify-center gap-3 text-lg">
//             {isDownloading ? (
//               <>
//                 <FaSpinner className="animate-spin text-xl" />
//                 <span>Generating PDF ...</span>
//               </>
//             ) : (
//               <>
//                 <FaDownload className="text-xl group-hover:translate-y-0.5 transition-transform" />
//                 <span>Download Resume</span>
//                 <span className="text-sm opacity-75 font-light ml-1">PDF</span>
//               </>
//             )}
//           </div>
//         </motion.button>
//       </div>
//       {/* )} */}

//       {alldata ? (
//         // Thumbnail preview (template picker)
//         <div
//           style={{
//             width: `${A4_W}px`,
//             height: `${A4_H}px`,
//             transform: "scale(0.36)",
//             transformOrigin: "top left",
//             overflow: "hidden",
//             pointerEvents: "none",
//             flexShrink: 0,
//           }}
//         >
//           {pages[0] ? (
//             <iframe
//               title="resume-thumb"
//               srcDoc={pages[0]}
//               style={{
//                 width: `${A4_W}px`,
//                 height: `${A4_H}px`,
//                 border: "none",
//                 display: "block",
//                 pointerEvents: "none",
//               }}
//               sandbox="allow-same-origin"
//             />
//           ) : (
//             <div
//               style={{
//                 width: `${A4_W}px`,
//                 height: `${A4_H}px`,
//                 background: "white",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: "#ccc",
//                 fontSize: 14,
//                 fontFamily: "sans-serif",
//               }}
//             >
//               Loading…
//             </div>
//           )}
//         </div>
//       ) : (
//         // Full multi-page preview (editor / download page)
//         <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
//           {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
//             <div key={idx} style={{ marginBottom: "28px" }}>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: "10px",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <div
//                   style={{ flex: 1, height: "1px", background: "#d1d5db" }}
//                 />
//                 <span
//                   style={{
//                     fontSize: "11px",
//                     fontWeight: 600,
//                     color: "#6b7280",
//                     whiteSpace: "nowrap",
//                     padding: "3px 12px",
//                     background: "#f3f4f6",
//                     borderRadius: "999px",
//                     border: "1px solid #e5e7eb",
//                     letterSpacing: "0.05em",
//                     fontFamily: "system-ui, sans-serif",
//                   }}
//                 >
//                   Page {idx + 1}
//                   {pages.length > 1 ? ` of ${pages.length}` : ""}
//                 </span>
//                 <div
//                   style={{ flex: 1, height: "1px", background: "#d1d5db" }}
//                 />
//               </div>
//               <div
//                 style={{
//                   width: `${A4_W}px`,
//                   height: `${A4_H}px`,
//                   overflow: "hidden",
//                   background: "white",
//                   boxShadow:
//                     "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
//                   borderRadius: "2px",
//                   flexShrink: 0,
//                 }}
//               >
//                 <iframe
//                   title={`resume-page-${idx + 1}`}
//                   srcDoc={pageHtml}
//                   style={{
//                     width: `${A4_W}px`,
//                     height: `${A4_H}px`,
//                     border: "none",
//                     display: "block",
//                     pointerEvents: "none",
//                   }}
//                   scrolling="no"
//                   sandbox="allow-same-origin allow-scripts"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };



const isThumbnail = !!alldata && !viewMode ; 
  return (
    <>
      {/* Download button — hide in thumbnail mode */}
      {!isThumbnail && lastSegment === 'download-resume' &&(
        <div className="text-center my-8">
          <motion.button
            onClick={handleDownload}
            disabled={isDownloading}
            whileHover={!isDownloading ? { scale: 1.02, y: -2 } : {}}
            whileTap={!isDownloading ? { scale: 0.98 } : {}}
            className={`
              relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold
              text-white transition-all duration-300  shadow-lg
              ${
                isDownloading
                  ? "bg-gray-400 cursor-not-allowed opacity-80"
                  : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600 cursor-pointer"
              }
            `}
          >
            {!isDownloading && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            )}
            <div className="relative flex items-center justify-center gap-3 text-lg">
              {isDownloading ? (
                <>
                  <FaSpinner className="animate-spin text-xl" />
                  <span>Generating PDF …</span>
                </>
              ) : (
                <>
                  <FaDownload className="text-xl group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Resume</span>
                  <span className="text-sm opacity-75 font-light ml-1">PDF</span>
                </>
              )}
            </div>
          </motion.button>
        </div>
      )}
 
      {isThumbnail ? (
        // ── THUMBNAIL MODE (dashboard card) ─────────────────────────────────
        <div
          style={{
            width: `${A4_W}px`,
            height: `${A4_H}px`,
            transform: "scale(0.36)",
            transformOrigin: "top left",
            overflow: "hidden",
            pointerEvents: "none",
            flexShrink: 0,
          }}
        >
          {pages[0] ? (
            <iframe
              title="resume-thumb"
              srcDoc={pages[0]}
              style={{
                width: `${A4_W}px`,
                height: `${A4_H}px`,
                border: "none",
                display: "block",
                pointerEvents: "none",
              }}
              sandbox="allow-same-origin"
            />
          ) : (
            <div
              style={{
                width: `${A4_W}px`,
                height: `${A4_H}px`,
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ccc",
                fontSize: 14,
                fontFamily: "sans-serif",
              }}
            >
              Loading…
            </div>
          )}
        </div>
      ) : (
        // ── FULL PREVIEW MODE (editor + view modal) ──────────────────────────
        <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
          {(pages.length > 0 ? pages : [htmlContent]).map((pageHtml, idx) => (
            <div key={idx} style={{ marginBottom: "28px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  marginBottom: "10px",
                }}
              >
                <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6b7280",
                    whiteSpace: "nowrap",
                    padding: "3px 12px",
                    background: "#f3f4f6",
                    borderRadius: "999px",
                    border: "1px solid #e5e7eb",
                    letterSpacing: "0.05em",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  Page {idx + 1}
                  {pages.length > 1 ? ` of ${pages.length}` : ""}
                </span>
                <div style={{ flex: 1, height: "1px", background: "#d1d5db" }} />
              </div>
              <div
                style={{
                  width: `${A4_W}px`,
                  height: `${A4_H}px`,
                  overflow: "hidden",
                  background: "white",
                  boxShadow:
                    "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
                  borderRadius: "2px",
                  flexShrink: 0,
                }}
              >
                <iframe
                  title={`resume-page-${idx + 1}`}
                  srcDoc={pageHtml}
                  style={{
                    width: `${A4_W}px`,
                    height: `${A4_H}px`,
                    border: "none",
                    display: "block",
                    pointerEvents: "none",
                  }}
                  scrolling="no"
                  sandbox="allow-same-origin allow-scripts"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TemplateFifteen;
