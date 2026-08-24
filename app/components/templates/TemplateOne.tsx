// "use client";
// import React, {
//   useContext,
//   useRef,
//   useEffect,
//   useState,
//   useCallback,
// } from "react";
// import { AxiosResponse } from "axios";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import {
//   cleanQuillHTML,
//   formatDateOfBirth,
//   formatGradeToCgpdAndPercentage,
//   formatMonthYear,
// } from "@/app/utils";
// import { usePathname } from "next/navigation";
// import { ResumeProps } from "@/app/types";
// import { motion } from "framer-motion";
// import api from "@/app/utils/api";
// import { ResumeCustomization } from "@/app/(resume)/download-resume/page";
// import { FaDownload, FaSpinner } from "react-icons/fa";

// // ─────────────────────────────────────────────────────────────────────────────
// // A4 CONSTANTS
// // ─────────────────────────────────────────────────────────────────────────────
// const A4_W = 794;
// const A4_H = 1123;
// const MARGIN = 57;
// const PAGE_CONTENT_H = A4_H - MARGIN * 2;

// interface TemplateOneProps extends ResumeProps {
//   customization?: ResumeCustomization;
//   viewMode?: boolean;
// }

// const TemplateOne: React.FC<TemplateOneProps> = ({
//   alldata,
//   customization,
//   viewMode = false,
// }) => {
//   const context = useContext(CreateContext);
//   const pathname = usePathname();
//   const lastSegment = pathname.split("/").pop();
//   const [isDownloading, setIsDownloading] = useState<boolean>(false);

//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [pages, setPages] = useState<string[]>([]);

//   const activeFontFamily = customization?.fontFamily ?? "'Poppins', sans-serif";

//   // ── Data ──────────────────────────────────────────────────────────────────
//   const contact = alldata?.contact || context.contact || {};
//   const educations = alldata?.educations || context?.education || [];
//   const experiences = alldata?.experiences || context?.experiences || [];
//   const skills = alldata?.skills?.text || context?.skills?.text || "";
//   const projects = alldata?.projects || context?.projects || [];
//   const finalize = alldata?.finalize || context?.finalize || {};
//   const summary = alldata?.summary || context?.summary || "";

//   const addressParts = [
//     contact?.address,
//     contact?.city,
//     contact?.postCode,
//     contact?.country,
//   ].filter(Boolean);
//   const linkedinUrl = contact?.linkedIn;
//   const portfolioUrl = contact?.portfolio;
//   const githubUrl = contact?.github;
//   const dateOfBirth = contact?.dob;

//   // ── Font map ───────────────────────────────────────────────────────────────
//   const getFontImport = (fontFamily: string): string => {
//     const fontMap: Record<string, string> = {
//       "'Inter', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
//       "'Poppins', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
//       "'Lato', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
//       "'Nunito', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap",
//       "'Raleway', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700&display=swap",
//       "'Montserrat', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
//       "'Open Sans', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap",
//       "'Roboto', sans-serif":
//         "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
//       "'Merriweather', serif":
//         "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
//       "'Playfair Display', serif":
//         "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
//       "'DM Serif Display', serif":
//         "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
//       "'Libre Baskerville', serif":
//         "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
//       "'EB Garamond', serif":
//         "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&display=swap",
//       "'Crimson Text', serif":
//         "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap",
//       "'Source Code Pro', monospace":
//         "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap",
//       "'JetBrains Mono', monospace":
//         "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
//     };
//     return fontMap[fontFamily] || fontMap["'Poppins', sans-serif"];
//   };

//   const getSystemFallback = (fontFamily: string): string => {
//     if (fontFamily.includes("serif"))
//       return 'Georgia, "Times New Roman", serif';
//     if (fontFamily.includes("monospace"))
//       return '"Courier New", Courier, monospace';
//     return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
//   };

//   // ── CSS builder ────────────────────────────────────────────────────────────
//   const buildCSS = useCallback(
//     (fontFamily: string) => `
//     @import url('${getFontImport(fontFamily)}');

//     @page { size: A4; margin: 15mm; }
//     *, *::before, *::after { box-sizing: border-box; }
//     html, body { margin: 0; padding: 0; background: white; }

//     .t1-resume {
//       width: ${A4_W}px;
//       padding: 0 ${MARGIN}px;
//       background: white;
//       font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
//       font-size: 14px;
//       line-height: 1.5;
//     }
//     .t1-resume p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

//     .t1-contact-info {
//       text-align: center; margin-bottom: 20px;
//       padding-bottom: 15px; border-bottom: 1px solid #eee;
//     }
//     .t1-name      { font-size: 24px; font-weight: 700; margin-bottom: 4px; line-height: 1.2; }
//     .t1-job-title { font-size: 16px; color: #333; margin-bottom: 8px; }
//     .t1-address   { font-size: 14px; color: #666; margin-bottom: 10px; }
//     .t1-contact-details {
//       font-size: 14px; color: #444; margin-bottom: 10px;
//       display: flex; justify-content: center; flex-wrap: wrap; gap: 12px;
//     }
//     .t1-contact-details span { padding: 2px 8px; }
//     .t1-links { margin-top: 5px; text-align: center; display: flex; justify-content: center; flex-wrap: nowrap; gap: 0; }
//     .t1-link-item { color: #374151 !important; text-decoration: none !important; font-size: 14px; padding: 2px 8px; white-space: nowrap; display: inline-block; }

//     .t1-section-content { margin-bottom: 16px; }
//     .t1-section-title {
//       background: #f0f0f0; padding: 6px 10px; font-weight: 700;
//       margin: 12px 0 8px; font-size: 16px; border-left: 3px solid #333;
//       page-break-after: avoid; break-after: avoid;
//     }
//     .t1-item-header {
//       display: flex; justify-content: space-between; align-items: flex-start;
//       margin-bottom: 6px; flex-wrap: wrap; gap: 10px;
//       page-break-after: avoid; break-after: avoid;
//     }
//     .t1-item-title-container { min-width: 200px; flex: 1; }
//     .t1-item-title    { font-weight: 700; font-size: 15px; line-height: 1.4; margin-bottom: 2px; }
//     .t1-item-subtitle { font-size: 13px; color: #555; margin-top: 2px; line-height: 1.4; }
//     .t1-item-date     { white-space: nowrap; font-size: 12px; color: #777; text-align: right; }
//     .t1-experience-date, .t1-education-date {
//       font-size: 12px; color: #666; padding: 2px 6px;
//       background: #f8f8f8; border-radius: 3px; line-height: 1.4;
//     }
//     .t1-education-grade {
//       font-size: 12px; color: #666; font-weight: 500;
//       background: #f0f0f0; padding: 2px 8px; border-radius: 3px;
//     }
//     .t1-item-content, .t1-summary-text, .t1-experience-description,
//     .t1-education-description, .t1-project-description,
//     .t1-custom-section-content, .t1-skills-content {
//       font-size: 13px; line-height: 1.5; color: #444;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }
//     .t1-summary-text, .t1-skills-content { padding: 0 5px; }
//     .t1-experience-description, .t1-education-description { margin-top: 5px; }

//     .t1-experience-description ul, .t1-experience-description ol,
//     .t1-education-description ul, .t1-education-description ol,
//     .t1-project-description ul, .t1-project-description ol,
//     .t1-custom-section-content ul, .t1-custom-section-content ol,
//     .t1-summary-text ul, .t1-summary-text ol,
//     .t1-skills-content ul, .t1-skills-content ol {
//       margin: 8px 0 8px 20px !important; padding-left: 0 !important;
//     }
//     .t1-experience-description ul, .t1-summary-text ul, .t1-skills-content ul { list-style-type: disc !important; }
//     .t1-experience-description ol, .t1-summary-text ol, .t1-skills-content ol { list-style-type: decimal !important; }
//     .t1-experience-description li, .t1-education-description li,
//     .t1-project-description li, .t1-custom-section-content li,
//     .t1-summary-text li, .t1-skills-content li {
//       margin-bottom: 4px !important; line-height: 1.5 !important; font-size: 13px !important;
//     }

//     .t1-project-item { margin-bottom: 16px; }
//     .t1-project-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: nowrap; gap: 8px; margin-bottom: 4px; }
//     .t1-project-title  { font-weight: 700; font-size: 15px; color: #222; flex: 1; min-width: 0; }
//     .t1-project-links  { display: inline-flex; gap: 10px; flex-shrink: 0; align-items: center; }
//     .t1-project-link   { font-size: 11px; color: #374151 !important; text-decoration: none !important; white-space: nowrap; display: inline-block; }
//     .t1-project-tech-stack { font-size: 12px; color: #666; margin: 4px 0 6px; }

//     .t1-page-break { page-break-before: always !important; break-before: page !important; display: block; height: 0; margin: 0; padding: 0; }

//     @media print {
//       *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
//       html, body { overflow: visible; }
//       .t1-resume { width: 100% !important; padding: 0 !important; }
//       .t1-project-link, .t1-link-item { color: #374151 !important; text-decoration: none !important; }
//       a, a:visited { color: inherit !important; text-decoration: none !important; }
//       .t1-link-item, .t1-project-link { color: #374151 !important; }
//     }
//   `,
//     [],
//   );

//   // ── HTML builder ───────────────────────────────────────────────────────────
//   // AFTER

//   const generateHTML = useCallback(
//     (forPDF = false, pageBreakIds: string[] = []): string => {
//       const CSS = buildCSS(activeFontFamily);

//       const richText = (html: string, cls: string) => {
//         if (!html) return "";
//         const clean = cleanQuillHTML(html);
//         if (!clean || clean === "<p><br></p>") return "";
//         return `<div class="t1-item-content ${cls}">${clean}</div>`;
//       };

//       // ── Skills check — strips HTML tags to check if any real text exists ──
//       const hasSkillsContent = (): boolean => {
//         if (!skills?.trim()) return false;
//         const cleaned = cleanQuillHTML(skills);
//         if (!cleaned || cleaned === "<p><br></p>") return false;
//         // Strip all HTML tags and check if any text remains
//         const textOnly = cleaned.replace(/<[^>]*>/g, "").trim();
//         return textOnly.length > 0;
//       };

//       const href = (url: string) =>
//         url.startsWith("http") ? url : `https://${url}`;
//       const formattedDob = formatDateOfBirth(dateOfBirth || "");

//       const header = `
//       <div class="t1-contact-info">
//         <div class="t1-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
//         <div class="t1-job-title">${typeof contact?.jobTitle === "string" ? contact.jobTitle : (contact?.jobTitle as any)?.name || ""}</div>
//         ${addressParts.length ? `<div class="t1-address">${addressParts.join(", ")}</div>` : ""}
//         <div class="t1-contact-details">
//           ${contact?.email ? `<span>${contact.email}</span>` : ""}
//           ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
//           ${formattedDob ? `<span>${formattedDob}</span>` : ""}
//         </div>

//          <div class="t1-links">
//            ${linkedinUrl ? `<a href="${href(linkedinUrl)}"  class="t1-link-item" target="_blank">LinkedIn</a>` : ""}
//            ${githubUrl ? `<a href="${href(githubUrl)}"    class="t1-link-item" target="_blank">GitHub</a>` : ""}
//            ${portfolioUrl ? `<a href="${href(portfolioUrl)}" class="t1-link-item" target="_blank">Portfolio</a>` : ""}
//          </div>
//       </div>`;

//       const summaryBlock = summary?.trim()
//         ? `<div class="t1-section-content" data-block-id="summary">
//              <div class="t1-section-title">Summary</div>
//              ${richText(summary.replace(/\n/g, "<br>"), "t1-summary-text")}
//            </div>`
//         : "";

//       const expBlock = experiences.length
//         ? `<div class="t1-section-content" data-block-id="exp-section">
//              <div class="t1-section-title">Experience</div>
//              ${experiences
//                .map((exp: any, i: number) => {
//                  const s = formatMonthYear(exp.startDate, false);
//                  const e = exp.endDate
//                    ? formatMonthYear(exp.endDate, false)
//                    : "Present";
//                  return `<div class="t1-experience-item" data-block-id="exp-${i}" style="margin-bottom:16px">
//                  <div class="t1-item-header">
//                    <div class="t1-item-title-container">
//                      <div class="t1-item-title">${exp.jobTitle || ""}</div>
//                      <div class="t1-item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
//                    </div>
//                    <div class="t1-item-date t1-experience-date">${s} - ${e}</div>
//                  </div>
//                  ${exp.text ? richText(exp.text, "t1-experience-description") : ""}
//                </div>`;
//                })
//                .join("")}
//            </div>`
//         : "";

//       const projBlock = projects.length
//         ? `<div class="t1-section-content" data-block-id="proj-section">
//              <div class="t1-section-title">Projects</div>
//              ${projects
//                .map(
//                  (p: any, i: number) => `
//                <div class="t1-project-item" data-block-id="proj-${i}">
//                  <div class="t1-project-header">
//                    <div class="t1-project-title">${p.title || ""}</div>
//                    ${
//                      p.liveUrl || p.githubUrl
//                        ? `
//                      <div class="t1-project-links">
//                        ${p.liveUrl ? `<a href="${href(p.liveUrl)}"   class="t1-project-link" target="_blank">Live Demo</a>` : ""}
//                        ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t1-project-link" target="_blank">GitHub</a>` : ""}
//                      </div>`
//                        : ""
//                    }
//                  </div>
//                  ${p.techStack?.length ? `<div class="t1-project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
//                  ${p.description ? richText(p.description, "t1-project-description") : ""}
//                </div>`,
//                )
//                .join("")}
//            </div>`
//         : "";

//       const eduBlock = educations.length
//         ? `<div class="t1-section-content" data-block-id="edu-section">
//              <div class="t1-section-title">Education</div>
//              ${educations
//                .map((edu: any, i: number) => {
//                  const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
//                  const dateStr =
//                    edu.startDate || edu.endDate
//                      ? `${edu.startDate || ""} - ${edu.endDate || "Present"}`
//                      : "";
//                  return `<div class="t1-education-item" data-block-id="edu-${i}" style="margin-bottom:16px">
//                  <div class="t1-item-header">
//                    <div class="t1-item-title-container">
//                      <div class="t1-item-title">${edu.degree || ""}</div>
//                      <div class="t1-item-subtitle">
//                        ${edu.schoolname ? `<span>${edu.schoolname}</span>` : ""}
//                        ${edu.schoolname && edu.location ? " — " : ""}
//                        ${edu.location ? `<span>${edu.location}</span>` : ""}
//                        ${(edu.schoolname || edu.location) && grade ? " • " : ""}
//                        ${grade ? `<span class="t1-education-grade">${grade}</span>` : ""}
//                      </div>
//                    </div>
//                    ${dateStr ? `<div class="t1-item-date t1-education-date">${dateStr}</div>` : ""}
//                  </div>
//                  ${edu.text ? richText(edu.text, "t1-education-description") : ""}
//                </div>`;
//                })
//                .join("")}
//            </div>`
//         : "";

//       const skillsBlock = (() => {
//         if (!hasSkillsContent()) return "";
//         const cleanedSkills = cleanQuillHTML(skills);
//         return `<div class="t1-section-content" data-block-id="skills-section">
//     <div class="t1-section-title">Skills</div>
//     <div class="t1-skills-content" data-block-id="skills-content">${cleanedSkills}</div>
//   </div>`;
//       })();

//       const customBlock =
//         !Array.isArray(finalize) &&
//         Array.isArray(finalize?.customSection) &&
//         finalize.customSection.some(
//           (s: any) => s?.name?.trim() || s?.description?.trim(),
//         )
//           ? `<div class="t1-section-content">
//                ${finalize.customSection
//                  .filter((s: any) => s?.name?.trim() || s?.description?.trim())
//                  .map(
//                    (s: any, i: number) => `
//                    <div class="t1-custom-section" data-block-id="custom-${i}">
//                      ${s.name ? `<div class="t1-section-title">${s.name}</div>` : ""}
//                      ${s.description ? richText(s.description, "t1-custom-section-content") : ""}
//                    </div>`,
//                  )
//                  .join("")}
//              </div>`
//           : "";

//       const pdfStyle = forPDF
//         ? `<style>
//       @page { size: A4; margin: ${MARGIN}px 0; }
//       html, body { margin: 0 !important; padding: 0 !important; }
//       .t1-resume { width: ${A4_W}px !important; padding: 0 ${MARGIN}px !important; }
//     </style>`
//         : "";

//       let bodyContent = `${header}${summaryBlock}${expBlock}${projBlock}${eduBlock}${skillsBlock}${customBlock}`;

//       if (forPDF && pageBreakIds.length > 0) {
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = bodyContent;
//         pageBreakIds.forEach((id) => {
//           const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
//           if (el) {
//             const breakDiv = document.createElement("div");
//             breakDiv.className = "t1-page-break";
//             el.parentNode?.insertBefore(breakDiv, el);
//           }
//         });
//         bodyContent = tempDiv.innerHTML;
//       }

//       return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume</title>
//   <style>${CSS}</style>
//   ${pdfStyle}
// </head>
// <body style="margin:0;padding:0;background:white;">
//   <div class="t1-resume">${bodyContent}</div>
// </body>
// </html>`;
//     },
//     [
//       activeFontFamily,
//       contact,
//       educations,
//       experiences,
//       skills,
//       projects,
//       finalize,
//       summary,
//       addressParts,
//       linkedinUrl,
//       portfolioUrl,
//       githubUrl,
//       dateOfBirth,
//       buildCSS,
//     ],
//   );

//   // ── PDF builder (matches preview exactly) ────────────────────────────────────
//   const buildPDFPagesHTML = useCallback(
//     (pageStarts: number[], totalH: number, resumeSnapshot: string): string => {
//       const CSS = buildCSS(activeFontFamily);

//       let pagesBody = "";
//       for (let i = 0; i < pageStarts.length; i++) {
//         const contentOffsetY = pageStarts[i];
//         const nextStart = pageStarts[i + 1] ?? totalH;
//         const clipH = nextStart - contentOffsetY;
//         const isLastPage = i === pageStarts.length - 1;

//         pagesBody += `
//     <div class="pdf-page" style="position:relative;width:${A4_W}px;height:${A4_H}px;overflow:hidden;background:white;${!isLastPage ? "page-break-after:always;break-after:page;" : ""}">
//       <div style="position:absolute;top:${MARGIN}px;left:0;width:${A4_W}px;height:${clipH}px;overflow:hidden;">
//         <div style="position:absolute;top:${-contentOffsetY}px;left:0;width:${A4_W}px;">
//           ${resumeSnapshot}
//         </div>
//       </div>
//     </div>`;
//       }

//       return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8"/>
//   <meta name="viewport" content="width=device-width,initial-scale=1"/>
//   <title>Resume</title>
//   <style>
//     ${CSS}
//     @page { size: A4; margin: 0; }
//     html, body { margin: 0 !important; padding: 0 !important; background: white !important; }
//     .t1-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
//     .pdf-page { page-break-inside: avoid; }
//   </style>
// </head>
// <body style="margin:0;padding:0;background:white;">
//   ${pagesBody}
// </body>
// </html>`;
//     },
//     [buildCSS, activeFontFamily],
//   );

//   // ── Page splitter ──────────────────────────────────────────────────────────
//   const CSS_FOR_MEASURE = buildCSS(activeFontFamily);

//   const splitIntoPages = useCallback(
//     (fullHtml: string): Promise<string[]> => {
//       return new Promise((resolve) => {
//         const parser = new DOMParser();
//         const parsed = parser.parseFromString(fullHtml, "text/html");
//         const resumeEl = parsed.querySelector<HTMLElement>(".t1-resume");
//         if (!resumeEl) {
//           resolve([fullHtml]);
//           return;
//         }
//         const resumeSnapshot = resumeEl.outerHTML;

//         const iframe = document.createElement("iframe");
//         iframe.style.cssText = [
//           "position:fixed",
//           "top:0",
//           "left:-9999px",
//           `width:${A4_W}px`,
//           "height:10000px",
//           "border:none",
//           "opacity:0",
//           "pointer-events:none",
//           "z-index:-1",
//         ].join(";");
//         document.body.appendChild(iframe);

//         const measureDoc = iframe.contentDocument!;
//         measureDoc.open();
//         measureDoc.write(`<!DOCTYPE html>
// <html><head><meta charset="UTF-8"/>
// <style>
//   ${CSS_FOR_MEASURE}
//   html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: auto !important; overflow: visible !important; background: white !important; }
//   .t1-resume { width: ${A4_W}px !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; padding-top: 0 !important; padding-bottom: 0 !important; margin: 0 !important; box-sizing: border-box !important; }
// </style></head>
// <body>${resumeSnapshot}</body></html>`);
//         measureDoc.close();

//         const doMeasure = () => {
//           const resume = measureDoc.querySelector<HTMLElement>(".t1-resume");
//           if (!resume) {
//             document.body.removeChild(iframe);
//             resolve([fullHtml]);
//             return;
//           }

//           measureDoc.documentElement.style.cssText =
//             "height:auto!important;overflow:visible!important;";
//           measureDoc.body.style.cssText =
//             "margin:0;padding:0;height:auto!important;overflow:visible!important;";
//           void resume.offsetHeight;

//           const resumeRect = resume.getBoundingClientRect();
//           const scrollY =
//             measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;
//           const getRelTop = (el: Element) =>
//             el.getBoundingClientRect().top - resumeRect.top + scrollY;
//           const getRelBottom = (el: Element) =>
//             getRelTop(el) + el.getBoundingClientRect().height;

//           // ── Build atomic "units" in document order ─────────────────────────
//           // A unit is the smallest thing that must never be split across a
//           // page boundary: either a single wrapped LINE of real text, or a
//           // whole non-text leaf (a header row, tech-stack line, etc). Using
//           // Range.getClientRects() on the text gives us the browser's actual
//           // line boxes, so any break we pick lands on a real line edge —
//           // never mid-word, never mid-paragraph.
//           interface Unit {
//             top: number;
//             bottom: number;
//             blockId?: string;
//             keepWithNext?: boolean;
//           }
//           const units: Unit[] = [];
//           const consumed = new Set<Element>();

//           const nearestBlockId = (el: Element): string | undefined => {
//             let cur: Element | null = el;
//             while (cur && cur !== resume) {
//               const id = (cur as HTMLElement).dataset?.blockId;
//               if (id) return id;
//               cur = cur.parentElement;
//             }
//             return undefined;
//           };

//           // Elements that must stay in one piece AND must never be left
//           // stranded alone at the bottom of a page (keep-with-next).
//           const HEADER_LIKE_SELECTOR = [
//             ".t1-item-header",
//             ".t1-project-header",
//             ".t1-section-title",
//             ".t1-project-title",
//           ].join(", ");

//           // Elements that must stay in one piece but are fine sitting alone
//           // at the bottom of a page.
//           const ATOMIC_SELECTOR = [".t1-project-tech-stack", ".t1-links"].join(
//             ", ",
//           );

//           const DESC_WRAPPER_SELECTOR = [
//             ".t1-summary-text",
//             ".t1-skills-content",
//             ".t1-experience-description",
//             ".t1-education-description",
//             ".t1-project-description",
//             ".t1-custom-section-content",
//           ].join(", ");

//           const pushLines = (el: HTMLElement, keepWithNext = false) => {
//             const range = measureDoc.createRange();
//             range.selectNodeContents(el);
//             const rects = Array.from(range.getClientRects()).filter(
//               (r) => r.height > 2 && r.width > 0,
//             );
//             if (rects.length === 0) return false;
//             const blockId = nearestBlockId(el);
//             rects
//               .sort((a, b) => a.top - b.top)
//               .forEach((r, idx) => {
//                 units.push({
//                   top: r.top - resumeRect.top + scrollY,
//                   bottom: r.bottom - resumeRect.top + scrollY,
//                   blockId,
//                   keepWithNext: idx === 0 ? keepWithNext : false,
//                 });
//               });
//             return true;
//           };

//           const pushAtomic = (el: HTMLElement, keepWithNext = false) => {
//             const h = el.getBoundingClientRect().height;
//             if (h <= 2) return;
//             units.push({
//               top: getRelTop(el),
//               bottom: getRelBottom(el),
//               blockId: nearestBlockId(el),
//               keepWithNext,
//             });
//           };

//           Array.from(resume.querySelectorAll<HTMLElement>("*")).forEach(
//             (el) => {
//               if (consumed.has(el)) return;

//               if (el.matches(HEADER_LIKE_SELECTOR)) {
//                 pushAtomic(el, true);
//                 el.querySelectorAll("*").forEach((c) => consumed.add(c));
//                 consumed.add(el);
//                 return;
//               }
//               if (el.matches(ATOMIC_SELECTOR)) {
//                 pushAtomic(el, false);
//                 el.querySelectorAll("*").forEach((c) => consumed.add(c));
//                 consumed.add(el);
//                 return;
//               }
//               if (el.matches("p, li")) {
//                 if (pushLines(el)) {
//                   el.querySelectorAll("*").forEach((c) => consumed.add(c));
//                   consumed.add(el);
//                 }
//                 return;
//               }
//               // Flat description wrapper with no inner p/li (rare, e.g. plain
//               // text pasted without Quill formatting) — split it directly.
//               if (
//                 el.matches(DESC_WRAPPER_SELECTOR) &&
//                 !el.querySelector("p, li")
//               ) {
//                 if (pushLines(el)) consumed.add(el);
//               }
//             },
//           );

//           // Remaining single-line leaves not covered above (name, job title,
//           // item title/subtitle, contact line, grade tag, dates...).
//           resume
//             .querySelectorAll<HTMLElement>(
//               ".t1-name, .t1-job-title, .t1-address, .t1-contact-details, .t1-item-title, .t1-item-subtitle, .t1-education-grade",
//             )
//             .forEach((el) => {
//               if (consumed.has(el)) return;
//               pushAtomic(el, el.classList.contains("t1-item-title"));
//               consumed.add(el);
//             });

//           units.sort((a, b) => a.top - b.top || a.bottom - b.bottom);

//           const totalH = resume.scrollHeight;

//           // ── Greedily pack units into pages, honoring keep-with-next ───────
//           const pageStarts: number[] = [0];
//           const pageBreakIds: string[] = [];
//           let pageStart = 0;

//           for (let i = 0; i < units.length; i++) {
//             const u = units[i];
//             if (u.bottom - pageStart <= PAGE_CONTENT_H) continue;

//             // This unit overflows the page. Walk backward over any
//             // immediately-preceding "keep with next" units (a heading, an
//             // item title) so they move to the new page together instead of
//             // being stranded alone at the bottom of the old one.
//             let breakAt = i;
//             while (
//               breakAt > 0 &&
//               units[breakAt - 1].keepWithNext &&
//               units[breakAt - 1].top >= pageStart
//             ) {
//               breakAt--;
//             }

//             const newTop = units[breakAt].top;
//             pageStart = newTop > pageStart ? newTop : u.top; // guard vs. infinite loop
//             pageStarts.push(pageStart);
//             pageBreakIds.push(units[breakAt].blockId || "");
//             if (pageStarts.length >= 20) break; // safety cap
//           }

//           document.body.removeChild(iframe);
//           (window as any).__resumePageBreakIds = pageBreakIds.filter(Boolean);
//           (window as any).__resumePageStarts = pageStarts;
//           (window as any).__resumeTotalH = totalH;
//           (window as any).__resumeSnapshot = resumeSnapshot;
//           const pageHtmls: string[] = [];
//           for (let i = 0; i < pageStarts.length; i++) {
//             const contentOffsetY = pageStarts[i];
//             const nextStart = pageStarts[i + 1] ?? totalH;
//             const clipH = nextStart - contentOffsetY;
//             pageHtmls.push(`<!DOCTYPE html>
// <html lang="en"><head><meta charset="UTF-8"/>
// <style>
//   ${CSS_FOR_MEASURE}
//   html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: ${A4_H}px !important; overflow: hidden !important; background: white !important; }
//   .page-margin-box { position: relative; width: ${A4_W}px; height: ${A4_H}px; background: white; overflow: hidden; }
//   .page-content-clip { position: absolute; top: ${MARGIN}px; left: 0; width: ${A4_W}px; height: ${clipH}px; overflow: hidden; }
//   .page-shift { position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px; }
//   .t1-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
// </style></head>
// <body>
//   <div class="page-margin-box"><div class="page-content-clip"><div class="page-shift">${resumeSnapshot}</div></div></div>
// </body></html>`);
//           }
//           resolve(pageHtmls);
//         };

//         const win = iframe.contentWindow as any;
//         if (win?.document?.fonts?.ready) {
//           win.document.fonts.ready.then(() => requestAnimationFrame(doMeasure));
//         } else {
//           setTimeout(doMeasure, 150);
//         }
//       });
//     },
//     [CSS_FOR_MEASURE],
//   );

//   // ── Debounced updates ──────────────────────────────────────────────────────
//   const scheduleUpdate = useCallback((html: string) => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 300);
//   }, []);

//   useEffect(() => {
//     scheduleUpdate(generateHTML());
//     return () => {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     };
//   }, [generateHTML, scheduleUpdate]);

//   useEffect(() => {
//     if (!htmlContent) return;
//     splitIntoPages(htmlContent).then(setPages);
//   }, [htmlContent, splitIntoPages]);

//   // ── Download handler ───────────────────────────────────────────────────────
//   // AFTER
//   const handleDownload = async (): Promise<void> => {
//     setIsDownloading(true);
//     try {
//       const storedPageStarts: number[] | undefined = (window as any)
//         .__resumePageStarts;
//       const storedTotalH: number | undefined = (window as any).__resumeTotalH;
//       const storedSnapshot: string | undefined = (window as any)
//         .__resumeSnapshot;

//       let pdfHtml: string;

//       if (storedPageStarts?.length && storedTotalH && storedSnapshot) {
//         // ✅ Per-page clip/shift — matches preview exactly
//         pdfHtml = buildPDFPagesHTML(
//           storedPageStarts,
//           storedTotalH,
//           storedSnapshot,
//         );
//       } else {
//         // ⬇ Fallback: old page-break approach
//         const pageBreakIds: string[] =
//           (window as any).__resumePageBreakIds || [];
//         pdfHtml = generateHTML(true, pageBreakIds);
//       }

//       const res: AxiosResponse<Blob> = await api.post(
//         `${API_URL}/candidates/generate-pdf`,
//         { html: pdfHtml },
//         { responseType: "blob" },
//       );
//       const url = URL.createObjectURL(res.data);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error("PDF error:", err);
//       alert("Failed to generate PDF. Please try again.");
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const isThumbnail = !!alldata && !viewMode;
//   return (
//     <>
//       {/* Download button — hide in thumbnail mode */}
//       {/* {!isThumbnail && lastSegment === "download-resume" && ( */}
//       <div className="text-center my-8">
//         <motion.button
//           onClick={handleDownload}
//           disabled={isDownloading}
//           whileHover={!isDownloading ? { scale: 1.02, y: -2 } : {}}
//           whileTap={!isDownloading ? { scale: 0.98 } : {}}
//           className={`
//               relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold
//               text-white transition-all duration-300  shadow-lg
//               ${
//                 isDownloading
//                   ? "bg-gray-400 cursor-not-allowed opacity-80"
//                   : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600 cursor-pointer"
//               }
//             `}
//         >
//           {!isDownloading && (
//             <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
//           )}
//           <div className="relative flex items-center justify-center gap-3 text-lg">
//             {isDownloading ? (
//               <>
//                 <FaSpinner className="animate-spin text-xl" />
//                 <span>Generating PDF …</span>
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

//       {isThumbnail ? (
//         // ── THUMBNAIL MODE (dashboard card) ─────────────────────────────────
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
//         // ── FULL PREVIEW MODE (editor + view modal) ──────────────────────────
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

// export default TemplateOne;



"use client";
import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { AxiosResponse } from "axios";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import {
  cleanQuillHTML,
  formatDateOfBirth,
  formatGradeToCgpdAndPercentage,
  formatMonthYear,
  formatSocialLink,
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

interface TemplateOneProps extends ResumeProps {
  customization?: ResumeCustomization;
  viewMode?: boolean;
}

const TemplateOne: React.FC<TemplateOneProps> = ({
  alldata,
  customization,
  viewMode = false,
}) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const measureIframeRef = useRef<HTMLIFrameElement | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);

  const activeFontFamily = customization?.fontFamily ?? "'Poppins', sans-serif";

  // ── Data ──────────────────────────────────────────────────────────────────
  const contact = alldata?.contact || context.contact || {};
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
      "'DM Serif Display', serif":
        "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
      "'Libre Baskerville', serif":
        "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght=400;700&display=swap",
      "'EB Garamond', serif":
        "https://fonts.googleapis.com/css2?family=EB+Garamond:wght=400;600;700&display=swap",
      "'Crimson Text', serif":
        "https://fonts.googleapis.com/css2?family=Crimson+Text:wght=400;600;700&display=swap",
      "'Source Code Pro', monospace":
        "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap",
      "'JetBrains Mono', monospace":
        "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
    };
    return fontMap[fontFamily] || fontMap["'Poppins', sans-serif"];
  };

  const getFontLinkTag = (fontFamily: string): string => {
    const url = getFontImport(fontFamily);
    return `<link rel="stylesheet" href="${url}"/>`;
  };

  const getSystemFallback = (fontFamily: string): string => {
    if (fontFamily.includes("serif"))
      return 'Georgia, "Times New Roman", serif';
    if (fontFamily.includes("monospace"))
      return '"Courier New", Courier, monospace';
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  };

  // ── CSS builder (NO @import — font loaded via <link>) ──────────────────────
  const buildCSS = useCallback(
    (fontFamily: string) => `
    @page { size: A4; margin: 15mm; }
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: white; }

    .t1-resume {
      width: ${A4_W}px;
      padding: 0 ${MARGIN}px;
      background: white;
      font-family: ${fontFamily}, ${getSystemFallback(fontFamily)};
      font-size: 14px;
      line-height: 1.5;
    }
    .t1-resume p { margin: 0 !important; padding: 0 !important; line-height: 1.5 !important; }

    .t1-contact-info {
      text-align: center; margin-bottom: 20px;
      padding-bottom: 15px; border-bottom: 1px solid #eee;
    }
    .t1-name      { font-size: 24px; font-weight: 700; margin-bottom: 4px; line-height: 1.2; }
    .t1-job-title { font-size: 16px; color: #333; margin-bottom: 8px; }
    .t1-address   { font-size: 14px; color: #666; margin-bottom: 10px; }
    .t1-contact-details {
      font-size: 14px; color: #444; margin-bottom: 10px;
      display: flex; justify-content: center; flex-wrap: wrap; gap: 12px;
    }
    .t1-contact-details span { padding: 2px 8px; }
    .t1-links { margin-top: 5px; text-align: center; display: flex; justify-content: center; flex-wrap: wrap; gap: 0; }
    .t1-link-item { color: #374151 !important; text-decoration: none !important; font-size: 14px; padding: 2px 8px; white-space: nowrap; display: inline-block; }

    .t1-section-content { margin-bottom: 16px; }
    .t1-section-title {
      background: #f0f0f0; padding: 6px 10px; font-weight: 700;
      margin: 12px 0 8px; font-size: 16px; border-left: 3px solid #333;
      page-break-after: avoid; break-after: avoid;
    }
    .t1-item-header {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: 6px; flex-wrap: wrap; gap: 10px;
      page-break-after: avoid; break-after: avoid;
    }
    .t1-item-title-container { min-width: 200px; flex: 1; }
    .t1-item-title    { font-weight: 700; font-size: 15px; line-height: 1.4; margin-bottom: 2px; }
    .t1-item-subtitle { font-size: 13px; color: #555; margin-top: 2px; line-height: 1.4; }
    .t1-item-date     { white-space: nowrap; font-size: 12px; color: #777; text-align: right; }
    .t1-experience-date, .t1-education-date {
      font-size: 12px; color: #666; padding: 2px 6px;
      background: #f8f8f8; border-radius: 3px; line-height: 1.4;
    }
    .t1-education-grade {
      font-size: 12px; color: #666; font-weight: 500;
      background: #f0f0f0; padding: 2px 8px; border-radius: 3px;
    }
    .t1-item-content, .t1-summary-text, .t1-experience-description,
    .t1-education-description, .t1-project-description,
    .t1-custom-section-content, .t1-skills-content {
      font-size: 13px; line-height: 1.5; color: #444;
      word-wrap: break-word; overflow-wrap: break-word;
    }
    .t1-summary-text, .t1-skills-content { padding: 0 5px; }
    .t1-experience-description, .t1-education-description { margin-top: 5px; }

    .t1-experience-description ul, .t1-experience-description ol,
    .t1-education-description ul, .t1-education-description ol,
    .t1-project-description ul, .t1-project-description ol,
    .t1-custom-section-content ul, .t1-custom-section-content ol,
    .t1-summary-text ul, .t1-summary-text ol,
    .t1-skills-content ul, .t1-skills-content ol {
      margin: 8px 0 8px 20px !important; padding-left: 0 !important;
    }
    .t1-experience-description ul, .t1-summary-text ul, .t1-skills-content ul { list-style-type: disc !important; }
    .t1-experience-description ol, .t1-summary-text ol, .t1-skills-content ol { list-style-type: decimal !important; }
    .t1-experience-description li, .t1-education-description li,
    .t1-project-description li, .t1-custom-section-content li,
    .t1-summary-text li, .t1-skills-content li {
      margin-bottom: 4px !important; line-height: 1.5 !important; font-size: 13px !important;
    }

    .t1-project-item { margin-bottom: 16px; }
    .t1-project-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: nowrap; gap: 8px; margin-bottom: 4px; }
    .t1-project-title  { font-weight: 700; font-size: 15px; color: #222; flex: 1; min-width: 0; }
    .t1-project-links  { display: inline-flex; gap: 10px; flex-shrink: 0; align-items: center; }
    .t1-project-link   { font-size: 11px; color: #374151 !important; text-decoration: none !important; white-space: nowrap; display: inline-block; }
    .t1-project-tech-stack { font-size: 12px; color: #666; margin: 4px 0 6px; }

    .t1-page-break { page-break-before: always !important; break-before: page !important; display: block; height: 0; margin: 0; padding: 0; }

    @media print {
      *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      html, body { overflow: visible; }
      .t1-resume { width: 100% !important; padding: 0 !important; }
      .t1-project-link, .t1-link-item { color: #374151 !important; text-decoration: none !important; }
      a, a:visited { color: inherit !important; text-decoration: none !important; }
      .t1-link-item, .t1-project-link { color: #374151 !important; }
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
        return `<div class="t1-item-content ${cls}">${clean}</div>`;
      };

      const hasSkillsContent = (): boolean => {
        if (!skills?.trim()) return false;
        const cleaned = cleanQuillHTML(skills);
        if (!cleaned || cleaned === "<p><br></p>") return false;
        const textOnly = cleaned.replace(/<[^>]*>/g, "").trim();
        return textOnly.length > 0;
      };

      const href = (url: string) =>
        url.startsWith("http") ? url : `https://${url}`;
      const formattedDob = formatDateOfBirth(dateOfBirth || "");

      const header = `
      <div class="t1-contact-info">
        <div class="t1-name">${contact?.firstName || ""} ${contact?.lastName || ""}</div>
        <div class="t1-job-title">${typeof contact?.jobTitle === "string" ? contact.jobTitle : (contact?.jobTitle as any)?.name || ""}</div>
        ${addressParts.length ? `<div class="t1-address">${addressParts.join(", ")}</div>` : ""}
        <div class="t1-contact-details">
          ${contact?.email ? `<span>${contact.email}</span>` : ""}
          ${contact?.phone ? `<span>${contact.phone}</span>` : ""}
          ${formattedDob ? `<span>${formattedDob}</span>` : ""}
        </div>
        <div class="t1-links">
  ${linkedinUrl ? `<a href="${href(linkedinUrl)}" class="t1-link-item" target="_blank">LinkedIn: ${formatSocialLink(linkedinUrl, "linkedin")}</a>` : ""}
  ${githubUrl ? `<a href="${href(githubUrl)}" class="t1-link-item" target="_blank">GitHub: ${formatSocialLink(githubUrl, "github")}</a>` : ""}
  ${portfolioUrl ? `<a href="${href(portfolioUrl)}" class="t1-link-item" target="_blank">${formatSocialLink(portfolioUrl, "portfolio")}</a>` : ""}
</div>
      </div>`;

      const summaryBlock = summary?.trim()
        ? `<div class="t1-section-content" data-block-id="summary">
             <div class="t1-section-title">Summary</div>
             ${richText(summary.replace(/\n/g, "<br>"), "t1-summary-text")}
           </div>`
        : "";

      const expBlock = experiences.length
        ? `<div class="t1-section-content" data-block-id="exp-section">
             <div class="t1-section-title">Experience</div>
             ${experiences
               .map((exp: any, i: number) => {
                 const s = formatMonthYear(exp.startDate, false);
                 const e = exp.endDate
                   ? formatMonthYear(exp.endDate, false)
                   : "Present";
                 return `<div class="t1-experience-item" data-block-id="exp-${i}" style="margin-bottom:16px">
                 <div class="t1-item-header">
                   <div class="t1-item-title-container">
                     <div class="t1-item-title">${exp.jobTitle || ""}</div>
                     <div class="t1-item-subtitle">${exp.employer || ""}${exp.location ? ` — ${exp.location}` : ""}</div>
                   </div>
                   <div class="t1-item-date t1-experience-date">${s} - ${e}</div>
                 </div>
                 ${exp.text ? richText(exp.text, "t1-experience-description") : ""}
               </div>`;
               })
               .join("")}
           </div>`
        : "";

      const projBlock = projects.length
        ? `<div class="t1-section-content" data-block-id="proj-section">
             <div class="t1-section-title">Projects</div>
             ${projects
               .map(
                 (p: any, i: number) => `
               <div class="t1-project-item" data-block-id="proj-${i}">
                 <div class="t1-project-header">
                   <div class="t1-project-title">${p.title || ""}</div>
                   ${
                     p.liveUrl || p.githubUrl
                       ? `
                     <div class="t1-project-links">
                       ${p.liveUrl ? `<a href="${href(p.liveUrl)}"   class="t1-project-link" target="_blank">Live Demo</a>` : ""}
                       ${p.githubUrl ? `<a href="${href(p.githubUrl)}" class="t1-project-link" target="_blank">GitHub</a>` : ""}
                     </div>`
                       : ""
                   }
                 </div>
                 ${p.techStack?.length ? `<div class="t1-project-tech-stack"><strong>Tech:</strong> ${p.techStack.join(" , ")}</div>` : ""}
                 ${p.description ? richText(p.description, "t1-project-description") : ""}
               </div>`,
               )
               .join("")}
           </div>`
        : "";

      const eduBlock = educations.length
        ? `<div class="t1-section-content" data-block-id="edu-section">
             <div class="t1-section-title">Education</div>
             ${educations
               .map((edu: any, i: number) => {
                 const grade = formatGradeToCgpdAndPercentage(edu.grade || "");
                 const dateStr =
                   edu.startDate || edu.endDate
                     ? `${edu.startDate || ""} - ${edu.endDate || "Present"}`
                     : "";
                 return `<div class="t1-education-item" data-block-id="edu-${i}" style="margin-bottom:16px">
                 <div class="t1-item-header">
                   <div class="t1-item-title-container">
                     <div class="t1-item-title">${edu.degree || ""}</div>
                     <div class="t1-item-subtitle">
                       ${edu.schoolname ? `<span>${edu.schoolname}</span>` : ""}
                       ${edu.schoolname && edu.location ? " — " : ""}
                       ${edu.location ? `<span>${edu.location}</span>` : ""}
                       ${(edu.schoolname || edu.location) && grade ? " • " : ""}
                       ${grade ? `<span class="t1-education-grade">${grade}</span>` : ""}
                     </div>
                   </div>
                   ${dateStr ? `<div class="t1-item-date t1-education-date">${dateStr}</div>` : ""}
                 </div>
                 ${edu.text ? richText(edu.text, "t1-education-description") : ""}
               </div>`;
               })
               .join("")}
           </div>`
        : "";

      const skillsBlock = (() => {
        if (!hasSkillsContent()) return "";
        const cleanedSkills = cleanQuillHTML(skills);
        return `<div class="t1-section-content" data-block-id="skills-section">
    <div class="t1-section-title">Skills</div>
    <div class="t1-skills-content" data-block-id="skills-content">${cleanedSkills}</div>
  </div>`;
      })();

      const customBlock =
        !Array.isArray(finalize) &&
        Array.isArray(finalize?.customSection) &&
        finalize.customSection.some(
          (s: any) => s?.name?.trim() || s?.description?.trim(),
        )
          ? `<div class="t1-section-content">
               ${finalize.customSection
                 .filter((s: any) => s?.name?.trim() || s?.description?.trim())
                 .map(
                   (s: any, i: number) => `
                   <div class="t1-custom-section" data-block-id="custom-${i}">
                     ${s.name ? `<div class="t1-section-title">${s.name}</div>` : ""}
                     ${s.description ? richText(s.description, "t1-custom-section-content") : ""}
                   </div>`,
                 )
                 .join("")}
             </div>`
          : "";

      const pdfStyle = forPDF
        ? `<style>
            @page { size: A4; margin: ${MARGIN}px 0; }
            html, body { margin: 0 !important; padding: 0 !important; }
            .t1-resume { width: ${A4_W}px !important; padding: 0 ${MARGIN}px !important; }
          </style>`
        : "";

      let bodyContent = `${header}${summaryBlock}${expBlock}${projBlock}${eduBlock}${skillsBlock}${customBlock}`;

      if (forPDF && pageBreakIds.length > 0) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodyContent;
        pageBreakIds.forEach((id) => {
          const el = tempDiv.querySelector(`[data-block-id="${id}"]`);
          if (el) {
            const breakDiv = document.createElement("div");
            breakDiv.className = "t1-page-break";
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
  ${getFontLinkTag(activeFontFamily)}
  <style>${CSS}</style>
  ${pdfStyle}
</head>
<body style="margin:0;padding:0;background:white;">
  <div class="t1-resume">${bodyContent}</div>
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

  // ── PDF builder (clip/shift — matches preview exactly) ─────────────────────
  const buildPDFPagesHTML = useCallback(
    (pageStarts: number[], totalH: number, resumeSnapshot: string): string => {
      const CSS = buildCSS(activeFontFamily);

      let pagesBody = "";
      for (let i = 0; i < pageStarts.length; i++) {
        const contentOffsetY = pageStarts[i];
        const nextStart = pageStarts[i + 1] ?? totalH;
        const clipH = nextStart - contentOffsetY;
        const isLastPage = i === pageStarts.length - 1;

        pagesBody += `
    <div class="pdf-page" style="position:relative;width:${A4_W}px;height:${A4_H}px;overflow:hidden;background:white;${!isLastPage ? "page-break-after:always;break-after:page;" : ""}">
      <div style="position:absolute;top:${MARGIN}px;left:0;width:${A4_W}px;height:${clipH}px;overflow:hidden;">
        <div style="position:absolute;top:${-contentOffsetY}px;left:0;width:${A4_W}px;">
          ${resumeSnapshot}
        </div>
      </div>
    </div>`;
      }

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Resume</title>
  ${getFontLinkTag(activeFontFamily)}
  <style>
    ${CSS}
    @page { size: A4; margin: 0; }
    html, body { margin: 0 !important; padding: 0 !important; background: white !important; }
    .t1-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
    .pdf-page { page-break-inside: avoid; }
  </style>
</head>
<body style="margin:0;padding:0;background:white;">
  ${pagesBody}
</body>
</html>`;
    },
    [buildCSS, activeFontFamily],
  );

  // ── Memoized CSS & font link for measurement ───────────────────────────────
  const CSS_FOR_MEASURE = useMemo(
    () => buildCSS(activeFontFamily),
    [buildCSS, activeFontFamily],
  );
  const FONT_LINK_TAG = useMemo(
    () => getFontLinkTag(activeFontFamily),
    [activeFontFamily],
  );

  // ── Page splitter (reuses iframe, smart font wait) ─────────────────────────
  const splitIntoPages = useCallback(
    (fullHtml: string): Promise<string[]> => {
      return new Promise((resolve) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(fullHtml, "text/html");
        const resumeEl = parsed.querySelector<HTMLElement>(".t1-resume");
        if (!resumeEl) {
          resolve([fullHtml]);
          return;
        }
        const resumeSnapshot = resumeEl.outerHTML;

        // ── Reuse or create measurement iframe ────────────────────────────
        let iframe = measureIframeRef.current;
        if (!iframe || !document.body.contains(iframe)) {
          iframe = document.createElement("iframe");
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
          measureIframeRef.current = iframe;
        }

        const measureDoc = iframe.contentDocument!;
        measureDoc.open();
        measureDoc.write(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"/>
 ${FONT_LINK_TAG}
<style>
  ${CSS_FOR_MEASURE}
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: auto !important; overflow: visible !important; background: white !important; }
  .t1-resume { width: ${A4_W}px !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; padding-top: 0 !important; padding-bottom: 0 !important; margin: 0 !important; box-sizing: border-box !important; }
</style></head>
<body>${resumeSnapshot}</body></html>`);
        measureDoc.close();

        const doMeasure = () => {
          const resume = measureDoc.querySelector<HTMLElement>(".t1-resume");
          if (!resume) {
            resolve([fullHtml]);
            return;
          }

          measureDoc.documentElement.style.cssText =
            "height:auto!important;overflow:visible!important;";
          measureDoc.body.style.cssText =
            "margin:0;padding:0;height:auto!important;overflow:visible!important;";
          void resume.offsetHeight;

          const resumeRect = resume.getBoundingClientRect();
          const scrollY =
            measureDoc.documentElement.scrollTop || measureDoc.body.scrollTop;
          const getRelTop = (el: Element) =>
            el.getBoundingClientRect().top - resumeRect.top + scrollY;
          const getRelBottom = (el: Element) =>
            getRelTop(el) + el.getBoundingClientRect().height;

          // ── Build atomic "units" ──────────────────────────────────────
          interface Unit {
            top: number;
            bottom: number;
            blockId?: string;
            keepWithNext?: boolean;
          }
          const units: Unit[] = [];
          const consumed = new Set<Element>();

          const nearestBlockId = (el: Element): string | undefined => {
            let cur: Element | null = el;
            while (cur && cur !== resume) {
              const id = (cur as HTMLElement).dataset?.blockId;
              if (id) return id;
              cur = cur.parentElement;
            }
            return undefined;
          };

          const HEADER_LIKE_SELECTOR = [
            ".t1-item-header",
            ".t1-project-header",
            ".t1-section-title",
            ".t1-project-title",
          ].join(", ");

          const ATOMIC_SELECTOR = [".t1-project-tech-stack", ".t1-links"].join(
            ", ",
          );

          const DESC_WRAPPER_SELECTOR = [
            ".t1-summary-text",
            ".t1-skills-content",
            ".t1-experience-description",
            ".t1-education-description",
            ".t1-project-description",
            ".t1-custom-section-content",
          ].join(", ");

          const pushLines = (el: HTMLElement, keepWithNext = false) => {
            const range = measureDoc.createRange();
            range.selectNodeContents(el);
            const rects = Array.from(range.getClientRects()).filter(
              (r) => r.height > 2 && r.width > 0,
            );
            if (rects.length === 0) return false;
            const blockId = nearestBlockId(el);
            rects
              .sort((a, b) => a.top - b.top)
              .forEach((r, idx) => {
                units.push({
                  top: r.top - resumeRect.top + scrollY,
                  bottom: r.bottom - resumeRect.top + scrollY,
                  blockId,
                  keepWithNext: idx === 0 ? keepWithNext : false,
                });
              });
            return true;
          };

          const pushAtomic = (el: HTMLElement, keepWithNext = false) => {
            const h = el.getBoundingClientRect().height;
            if (h <= 2) return;
            units.push({
              top: getRelTop(el),
              bottom: getRelBottom(el),
              blockId: nearestBlockId(el),
              keepWithNext,
            });
          };

          Array.from(resume.querySelectorAll<HTMLElement>("*")).forEach(
            (el) => {
              if (consumed.has(el)) return;

              if (el.matches(HEADER_LIKE_SELECTOR)) {
                pushAtomic(el, true);
                el.querySelectorAll("*").forEach((c) => consumed.add(c));
                consumed.add(el);
                return;
              }
              if (el.matches(ATOMIC_SELECTOR)) {
                pushAtomic(el, false);
                el.querySelectorAll("*").forEach((c) => consumed.add(c));
                consumed.add(el);
                return;
              }
              if (el.matches("p, li")) {
                if (pushLines(el)) {
                  el.querySelectorAll("*").forEach((c) => consumed.add(c));
                  consumed.add(el);
                }
                return;
              }
              if (
                el.matches(DESC_WRAPPER_SELECTOR) &&
                !el.querySelector("p, li")
              ) {
                if (pushLines(el)) consumed.add(el);
              }
            },
          );

          resume
            .querySelectorAll<HTMLElement>(
              ".t1-name, .t1-job-title, .t1-address, .t1-contact-details, .t1-item-title, .t1-item-subtitle, .t1-education-grade",
            )
            .forEach((el) => {
              if (consumed.has(el)) return;
              pushAtomic(el, el.classList.contains("t1-item-title"));
              consumed.add(el);
            });

          units.sort((a, b) => a.top - b.top || a.bottom - b.bottom);

          const totalH = resume.scrollHeight;

          // ── Greedily pack units into pages ───────────────────────────
          const pageStarts: number[] = [0];
          const pageBreakIds: string[] = [];
          let pageStart = 0;

          for (let i = 0; i < units.length; i++) {
            const u = units[i];
            if (u.bottom - pageStart <= PAGE_CONTENT_H) continue;

            let breakAt = i;
            while (
              breakAt > 0 &&
              units[breakAt - 1].keepWithNext &&
              units[breakAt - 1].top >= pageStart
            ) {
              breakAt--;
            }

            const newTop = units[breakAt].top;
            pageStart = newTop > pageStart ? newTop : u.top;
            pageStarts.push(pageStart);
            pageBreakIds.push(units[breakAt].blockId || "");
            if (pageStarts.length >= 20) break;
          }

          // ── Store data for PDF generation ────────────────────────────
          (window as any).__resumePageBreakIds = pageBreakIds.filter(Boolean);
          (window as any).__resumePageStarts = pageStarts;
          (window as any).__resumeTotalH = totalH;
          (window as any).__resumeSnapshot = resumeSnapshot;

          // ── Build per-page HTML ──────────────────────────────────────
          const pageHtmls: string[] = [];
          for (let i = 0; i < pageStarts.length; i++) {
            const contentOffsetY = pageStarts[i];
            const nextStart = pageStarts[i + 1] ?? totalH;
            const clipH = nextStart - contentOffsetY;
            pageHtmls.push(`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/>
 ${FONT_LINK_TAG}
<style>
  ${CSS_FOR_MEASURE}
  html, body { margin: 0 !important; padding: 0 !important; width: ${A4_W}px !important; height: ${A4_H}px !important; overflow: hidden !important; background: white !important; }
  .page-margin-box { position: relative; width: ${A4_W}px; height: ${A4_H}px; background: white; overflow: hidden; }
  .page-content-clip { position: absolute; top: ${MARGIN}px; left: 0; width: ${A4_W}px; height: ${clipH}px; overflow: hidden; }
  .page-shift { position: absolute; top: ${-contentOffsetY}px; left: 0; width: ${A4_W}px; }
  .t1-resume { width: ${A4_W}px !important; padding-top: 0 !important; padding-bottom: 0 !important; padding-left: ${MARGIN}px !important; padding-right: ${MARGIN}px !important; margin: 0 !important; }
</style></head>
<body>
  <div class="page-margin-box"><div class="page-content-clip"><div class="page-shift">${resumeSnapshot}</div></div></div>
</body></html>`);
          }
          resolve(pageHtmls);
        };

        // ── Smart font wait ────────────────────────────────────────────
        const mainFontsReady =
          typeof document !== "undefined" &&
          document.fonts?.status === "loaded";
        const win = iframe!.contentWindow as any;

        if (mainFontsReady) {
          // Fonts already cached from main document — measure almost immediately
          requestAnimationFrame(() => requestAnimationFrame(doMeasure));
        } else if (win?.document?.fonts?.ready) {
          win.document.fonts.ready.then(() => requestAnimationFrame(doMeasure));
        } else {
          setTimeout(doMeasure, 150);
        }
      });
    },
    [CSS_FOR_MEASURE, FONT_LINK_TAG],
  );

  // ── Debounced updates (60ms instead of 300ms) ──────────────────────────────
  const scheduleUpdate = useCallback((html: string) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => setHtmlContent(html), 60);
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

  // ── Cleanup measurement iframe on unmount ─────────────────────────────────
  useEffect(() => {
    return () => {
      if (
        measureIframeRef.current &&
        document.body.contains(measureIframeRef.current)
      ) {
        document.body.removeChild(measureIframeRef.current);
        measureIframeRef.current = null;
      }
    };
  }, []);

  // ── Download handler ───────────────────────────────────────────────────────
  const handleDownload = async (): Promise<void> => {
    setIsDownloading(true);
    try {
      const storedPageStarts: number[] | undefined = (window as any)
        .__resumePageStarts;
      const storedTotalH: number | undefined = (window as any).__resumeTotalH;
      const storedSnapshot: string | undefined = (window as any)
        .__resumeSnapshot;

      let pdfHtml: string;

      if (storedPageStarts?.length && storedTotalH && storedSnapshot) {
        // ✅ Per-page clip/shift — matches preview exactly
        pdfHtml = buildPDFPagesHTML(
          storedPageStarts,
          storedTotalH,
          storedSnapshot,
        );
      } else {
        // ⬇ Fallback: old page-break approach
        const pageBreakIds: string[] =
          (window as any).__resumePageBreakIds || [];
        pdfHtml = generateHTML(true, pageBreakIds);
      }

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

  const isThumbnail = !!alldata && !viewMode;

  return (
    <>
      {/* ── Font preconnect — starts DNS+TCP immediately ─────────────────── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* ── Download button ──────────────────────────────────────────────── */}
      {!isThumbnail && lastSegment === "download-resume" && (
        <div className="text-center my-8">
          <motion.button
            onClick={handleDownload}
            disabled={isDownloading}
            whileHover={!isDownloading ? { scale: 1.02, y: -2 } : {}}
            whileTap={!isDownloading ? { scale: 0.98 } : {}}
            className={`
            relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold
            text-white transition-all duration-300 shadow-lg
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
                  <span className="text-sm opacity-75 font-light ml-1">
                    PDF
                  </span>
                </>
              )}
            </div>
          </motion.button>
        </div>
      )}

      {isThumbnail ? (
        // ── THUMBNAIL MODE ──────────────────────────────────────────────
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
        // ── FULL PREVIEW MODE ──────────────────────────────────────────
        <div style={{ width: `${A4_W}px`, margin: "0 auto" }}>
          {pages.length > 0 ? (
            // ── Paginated view ────────────────────────────────────────
            pages.map((pageHtml, idx) => (
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
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background: "#d1d5db",
                    }}
                  />
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
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background: "#d1d5db",
                    }}
                  />
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
            ))
          ) : htmlContent ? (
            // ── Instant preview while paginating ──────────────────────
            <div>
              <div
                style={{
                  width: `${A4_W}px`,
                  height: `${A4_H}px`,
                  overflow: "hidden",
                  background: "white",
                  boxShadow:
                    "0 1px 4px rgba(0,0,0,0.10), 0 4px 24px rgba(0,0,0,0.08)",
                  borderRadius: "2px",
                }}
              >
                <iframe
                  title="resume-loading-preview"
                  srcDoc={htmlContent}
                  style={{
                    width: `${A4_W}px`,
                    height: `${A4_H}px`,
                    border: "none",
                    display: "block",
                  }}
                  scrolling="no"
                  sandbox="allow-same-origin allow-scripts"
                />
              </div>
              <div
                style={{
                  textAlign: "center",
                  padding: "12px",
                  color: "#9ca3af",
                  fontSize: "13px",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Formatting pages…
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default TemplateOne;
