"use client";

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import MonthYearDisplay from "@/app/utils/MonthYearDisplay";
import { usePathname } from "next/navigation";

import {
  Contact,
  Education,
  Experience,
  Finalize,
  Skill,
} from "@/app/types/context.types";

interface AllData {
  contact?: Contact;
  educations?: Education[];
  experiences?: Experience[];
  skills?: Skill[];
  finalize?: Finalize;
  summary?: string;
}

interface ResumeProps {
  alldata?: AllData;
}

const TemplateSix: React.FC<ResumeProps> = ({ alldata }) => {
  const context = useContext(CreateContext);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const contact = alldata?.contact || context.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills || context?.skills || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";

  const linkedinUrl = contact?.linkedin;

  // Helper function to get job title
  const getJobTitle = (jobTitle: any): string => {
    if (!jobTitle) return "";
    
    if (typeof jobTitle === 'string') {
      return jobTitle;
    }
    
    if (typeof jobTitle === 'object' && jobTitle !== null) {
      return (jobTitle as any)?.name || (jobTitle as any)?.label || "";
    }
    
    return "";
  };

  // Type guard for FinalizeData
  const isFinalizeData = (data: any): data is Finalize => {
    return data && typeof data === 'object' && !Array.isArray(data);
  };

  const getSkillLevelWidth = (level: number | null | undefined) => {
    if (!level) return "0%";
    return `${(Number(level) / 5) * 100}%`;
  };

  const generateHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8"/>
        <title>Resume - ${contact?.firstName || ""} ${contact?.lastName || ""}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Nunito', sans-serif; }
          .wrap-break-word { word-wrap: break-word; overflow-wrap: break-word; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body class="bg-white">
        <div class="resume-container flex" style="width: 210mm; padding: 5mm; box-sizing: border-box; margin: 0 auto;">
          <!-- Left side -->
          <div class="p-5 w-[40%] bg-gray-100 rounded-tl-2xl">
            <p class="text-3xl uppercase text-gray-600 mb-1 wrap-break-word">
              ${contact?.firstName || ""} ${contact?.lastName || ""}
            </p>
            ${contact?.jobTitle ? `
              <p class="text-sm text-gray-600 mb-2">
                ${getJobTitle(contact.jobTitle)}
              </p>
            ` : ""}
            
            <div class="flex items-center gap-4 mb-2">
              ${linkedinUrl && linkedinUrl.trim() ? `
                <a href="${linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 font-semibold underline text-gray-600 text-md">
                  <p>LinkedIn</p>
                </a>
              ` : ""}
              ${contact?.portfolio && contact.portfolio.trim() ? `
                <a href="${contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 font-semibold underline text-gray-600 text-md">
                  <p>Portfolio</p>
                </a>
              ` : ""}
            </div>

            <!-- Details -->
            <p class="text-[17px] font-medium uppercase text-gray-600 pb-2 tracking-widest">
              Details
            </p>
            <div class="border-b border-gray-500"></div>
            
            <div class="py-1">
              <div class="flex justify-start gap-1 py-1">
                <div class="p-1 bg-black rounded-full shrink-0">
                  <div class="text-white w-3 h-3">📧</div>
                </div>
                <p class="text-sm items-start text-gray-600 wrap-break-word">
                  ${contact?.email || ""}
                </p>
              </div>
              
              <div class="flex justify-start gap-1 py-1">
                <div class="p-1 bg-black rounded-full shrink-0">
                  <div class="text-white w-3 h-3">📞</div>
                </div>
                <p class="text-sm text-gray-600 wrap-break-word">
                  ${contact?.phone || ""}
                </p>
              </div>
              
              <div class="flex justify-start items-center gap-1 py-1">
                <div class="p-1 bg-black rounded-full shrink-0">
                  <div class="text-white w-3 h-3">📍</div>
                </div>
                <p class="text-sm text-gray-600 wrap-break-word">
                  ${contact?.address || ""}, ${contact?.city || ""}, ${contact?.country || ""}, ${contact?.postcode || ""}
                </p>
              </div>
            </div>

            <!-- Skills -->
            <p class="text-[17px] font-medium uppercase pt-1 tracking-widest text-gray-600 pb-2">
              Skills
            </p>
            <div class="border-b border-gray-500"></div>
            
            ${skills.length > 0 ? `
              <div class="space-y-2 pt-2 pb-2">
                ${skills.map((skill, index) => `
                  <div key="${skill.id || index}">
                    <p class="text-sm text-gray-800 wrap-break-word mb-1">
                      ${skill.skill || ""}
                    </p>
                    ${skill.level && `
                      <div class="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                        <div class="h-full bg-[#0c0c1e]" style="width: ${getSkillLevelWidth(skill.level)}"></div>
                      </div>
                    ` }
                  </div>
                `).join("")}
              </div>
            ` : `<p class="text-gray-500 text-sm pt-2">No skills added yet.</p>`}

            <!-- Languages -->
            ${isFinalizeData(finalize) && Array.isArray(finalize.languages) && 
              finalize.languages.some(lang => lang.name?.trim()) ? `
              <div class="mt-2">
                <p class="text-[17px] font-medium uppercase pt-1 tracking-widest text-gray-600 pb-2">
                  Languages
                </p>
                <div class="border-b border-gray-500"></div>
                <div class="grid grid-cols-2 gap-x-8 gap-y-3 pt-2">
                  ${finalize.languages.filter(lang => lang.name?.trim()).map((lang, index) => `
                    <div key="${lang._id || index}">
                      <p class="text-sm wrap-break-word text-gray-600 mb-1">
                        ${lang.name}
                      </p>
                      ${lang.level ? `
                        <div class="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                          <div class="h-full bg-[#0c0c1e]" style="width: ${getSkillLevelWidth(Number(lang.level))}"></div>
                        </div>
                      ` : ""}
                    </div>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <!-- Certifications and Licenses -->
            ${isFinalizeData(finalize) && Array.isArray(finalize.certificationsAndLicenses) && 
              finalize.certificationsAndLicenses.some(item => item.name?.replace(/<[^>]*>/g, "").trim()) ? `
              <div class="mt-3">
                <p class="text-[17px] font-medium uppercase tracking-widest text-gray-600 pb-2">
                  Certifications and Licenses
                </p>
                <div class="border-b border-gray-500"></div>
                <div class="pt-2 pb-1 text-gray-700 text-[15px] wrap-break-word">
                  ${finalize.certificationsAndLicenses.filter(item => 
                    item.name?.replace(/<[^>]*>/g, "").trim()
                  ).map((item, index) => `
                    <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <!-- Hobbies and Interests -->
            ${isFinalizeData(finalize) && Array.isArray(finalize.hobbiesAndInterests) && 
              finalize.hobbiesAndInterests.some(item => item.name?.replace(/<[^>]*>/g, "").trim()) ? `
              <div class="mt-2">
                <p class="text-[17px] font-medium uppercase pt-1 tracking-widest text-gray-600 pb-2">
                  Hobbies and Interests
                </p>
                <div class="border-b border-gray-500"></div>
                <div class="pt-2 pb-1 text-gray-700 text-[15px] wrap-break-word">
                  ${finalize.hobbiesAndInterests.filter(item => 
                    item.name?.replace(/<[^>]*>/g, "").trim()
                  ).map((item, index) => `
                    <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <!-- Awards and Honors -->
            ${isFinalizeData(finalize) && Array.isArray(finalize.awardsAndHonors) && 
              finalize.awardsAndHonors.some(item => item.name?.replace(/<[^>]*>/g, "").trim()) ? `
              <div class="mt-2 pb-2">
                <p class="text-[17px] font-medium uppercase tracking-widest text-gray-600 pb-2">
                  Awards and Honors
                </p>
                <div class="border-b border-gray-500"></div>
                <div class="pt-2 pb-1 text-gray-700 text-[15px] wrap-break-word">
                  ${finalize.awardsAndHonors.filter(item => 
                    item.name?.replace(/<[^>]*>/g, "").trim()
                  ).map((item, index) => `
                    <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
                  `).join("")}
                </div>
              </div>
            ` : ""}
          </div>

          <!-- Right side -->
          <div class="w-[60%] pr-4">
            <!-- Summary -->
            <p class="text-[17px] font-medium uppercase pt-1 text-gray-600 pb-2 tracking-widest">
              Summary
            </p>
            <div class="border-b-2 border-gray-300"></div>
            ${summary ? `
              <div class="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word">
                ${summary.replace(/<[^>]*>/g, "")}
              </div>
            ` : ""}

            <!-- Experience -->
            <div>
              ${experiences?.length > 0 ? experiences.map((exp, index) => `
                <div key="${exp.id || index}" class="mb-4">
                  <p class="text-[17px] font-medium uppercase pt-1 text-gray-600 pb-2 tracking-widest">
                    ${index === 0 ? 'Experience' : ''}
                  </p>
                  ${index === 0 ? '<div class="border-b-2 border-gray-300"></div>' : ''}

                  ${(exp.jobTitle || exp.employer || exp.location) ? `
                    <h3 class="font-semibold text-gray-900 wrap-break-word text-base mt-2">
                      ${exp.jobTitle || ""}
                      ${exp.employer ? `<span class="text-gray-500 wrap-break-word font-normal"> — ${exp.employer}</span>` : ""}
                      ${exp.location ? `<span class="text-gray-500 wrap-break-word font-normal"> — ${exp.location}</span>` : ""}
                    </h3>
                  ` : ""}

                  <div class="text-gray-600 text-sm wrap-break-word mt-1">
                    <div class="flex items-center gap-2">
                      ${exp.startDate || ""}
                      ${exp.startDate && exp.endDate ? `<span>-</span>` : ""}
                      ${exp.endDate ? exp.endDate : exp.startDate ? "Present" : ""}
                    </div>
                  </div>

                  ${exp.text ? `
                    <div class="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word">
                      ${exp.text.replace(/<[^>]*>/g, "")}
                    </div>
                  ` : ""}
                </div>
              `).join("") : `<p class="text-gray-500 wrap-break-word py-2">No experience added yet.</p>`}
            </div>

            <!-- Education -->
            <p class="text-[17px] font-medium uppercase text-gray-600 pb-2 pt-1 tracking-widest">
              Education
            </p>
            <div class="border-b-2 border-gray-300"></div>
            
            <div class="mt-2">
              ${educations?.length > 0 ? educations.map((edu, index) => `
                <div key="${edu.id || index}" class="mb-4">
                  ${(edu.schoolname || edu.degree || edu.location) ? `
                    <h3 class="font-semibold wrap-break-word text-gray-900 text-base mt-1">
                      ${edu.schoolname || ""}
                      ${edu.degree ? `<span class="text-gray-500 wrap-break-word font-normal"> — ${edu.degree}</span>` : ""}
                      ${edu.location ? `<span class="text-gray-500 wrap-break-word font-normal"> — ${edu.location}</span>` : ""}
                    </h3>
                  ` : ""}

                  ${(edu.startDate || edu.endDate) ? `
                    <p class="text-gray-600 wrap-break-word text-sm mt-1">
                      ${edu.startDate || ""} — ${edu.endDate || ""}
                    </p>
                  ` : ""}

                  ${edu.text ? `
                    <div class="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word">
                      ${edu.text.replace(/<[^>]*>/g, "")}
                    </div>
                  ` : ""}
                </div>
              `).join("") : `<p class="text-gray-500 wrap-break-word py-2">No education added yet.</p>`}
            </div>

            <!-- Websites and Social Media -->
            ${isFinalizeData(finalize) && Array.isArray(finalize.websitesAndSocialMedia) && 
              finalize.websitesAndSocialMedia.some(item => item.websiteUrl?.trim() || item.socialMedia?.trim()) ? `
              <div class="mt-2">
                <p class="text-[17px] font-medium uppercase text-gray-600 pb-2 pt-1 tracking-widest">
                  Websites and Social Media
                </p>
                <div class="border-b-2 border-gray-300"></div>
                <div class="pt-2 pb-2 text-[15px] text-gray-700 wrap-break-word">
                  ${finalize.websitesAndSocialMedia.filter(item => 
                    item.websiteUrl?.trim() || item.socialMedia?.trim()
                  ).map((item, index) => `
                    <div key="${item.id || index}" class="mb-2">
                      ${item.websiteUrl ? `
                        <div>
                          <p class="font-semibold text-sm">Website URL:</p>
                          <a href="${item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`}" class="text-gray-900 underline wrap-break-word text-sm">
                            ${item.websiteUrl}
                          </a>
                        </div>
                      ` : ""}
                      ${item.socialMedia ? `
                        <div class="mt-1">
                          <p class="font-semibold text-sm">Social Media URL:</p>
                          <a href="${item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`}" class="text-gray-900 underline wrap-break-word text-sm">
                            ${item.socialMedia}
                          </a>
                        </div>
                      ` : ""}
                    </div>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <!-- References -->
            ${isFinalizeData(finalize) && Array.isArray(finalize.references) && 
              finalize.references.some(item => item.name?.replace(/<[^>]*>/g, "").trim()) ? `
              <div class="mt-2">
                <p class="text-[17px] font-medium uppercase text-gray-600 pb-2 pt-1 tracking-widest">
                  References
                </p>
                <div class="border-b-2 border-gray-300"></div>
                <div class="pt-2 pb-2 text-gray-900 text-[15px] wrap-break-word">
                  ${finalize.references.filter(item => 
                    item.name?.replace(/<[^>]*>/g, "").trim()
                  ).map((item, index) => `
                    <div key="${item.id || index}">${item.name?.replace(/<[^>]*>/g, "")}</div>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <!-- Custom Section -->
            ${isFinalizeData(finalize) && Array.isArray(finalize.customSection) && 
              finalize.customSection.some(section => section?.name?.trim() || section?.description?.trim()) ? `
              <div class="mt-2 mb-4">
                ${finalize.customSection.filter(section => 
                  section?.name?.trim() || section?.description?.trim()
                ).map((section, index) => `
                  <div key="${section.id || index}" class="pb-3">
                    ${section.name ? `
                      <p class="text-[17px] font-medium uppercase text-gray-600 pb-2 pt-1 tracking-widest">
                        ${section.name}
                      </p>
                    ` : ""}
                    <div class="border-b-2 border-gray-300"></div>
                    ${section.description ? `
                      <div class="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word">
                        ${section.description.replace(/<[^>]*>/g, "")}
                      </div>
                    ` : ""}
                  </div>
                `).join("")}
              </div>
            ` : ""}
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
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Resume_${contact?.firstName || ""}_${contact?.lastName || ""}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <>
      {lastSegment === "download-resume" && (
        <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
          <button
            onClick={handleDownload}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Download Resume
          </button>
        </div>
      )}
      
      {/* Preview */}
      <div className="flex">
        {/* Left side */}
        <div className='p-5 w-[40%] bg-gray-100 rounded-tl-2xl'>
          <p className='text-3xl uppercase text-gray-600 mb-1 wrap-break-word'>
            {contact?.firstName || ""} {contact?.lastName || ""}
          </p>
          {contact?.jobTitle && (
            <p className='text-sm text-gray-600 mb-2'>
              {getJobTitle(contact.jobTitle)}
            </p>
          )}
          
          <div className="flex items-center gap-4 mb-2">
            {/* Show LinkedIn only if provided */}
            {linkedinUrl && linkedinUrl.trim() && (
              <a
                href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-semibold underline text-gray-600 text-md"
              >
                <p>LinkedIn</p>
              </a>
            )}

            {/* Show Portfolio only if provided */}
            {contact?.portfolio && contact.portfolio.trim() && (
              <a
                href={
                  contact.portfolio.startsWith("http")
                    ? contact.portfolio
                    : `https://${contact.portfolio}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-semibold underline text-gray-600 text-md"
              >
                <p>Portfolio</p>
              </a>
            )}
          </div>

          {/* Details */}
          <p className='text-[17px] font-medium uppercase text-gray-600 pb-2 tracking-widest'>
            Details
          </p>
          <div className="border-b border-gray-500"></div>
          
          <div className='py-1'>
            <div className='flex justify-start gap-1 py-1'>
              <div className='p-1 bg-black rounded-full shrink-0'>
                <FaEnvelope className='text-white w-3 h-3' />
              </div>
              <p className='text-sm items-start text-gray-600 wrap-break-word'>
                {contact?.email || ""}
              </p>
            </div>
            
            <div className="flex justify-start gap-1 py-1">
              <div className='p-1 bg-black rounded-full shrink-0'>
                <FaPhoneAlt className='text-white w-3 h-3' />
              </div>
              <p className='text-sm text-gray-600 wrap-break-word'>
                {contact?.phone || ""}
              </p>
            </div>
            
            <div className="flex justify-start items-center gap-1 py-1">
              <div className='p-1 bg-black rounded-full shrink-0'>
                <FaMapMarkerAlt className='text-white w-3 h-3' />
              </div>
              <p className='text-sm text-gray-600 wrap-break-word'>
                {contact?.address || ""}, {contact?.city || ""}, {contact?.country || ""}, {contact?.postcode || ""}
              </p>
            </div>
          </div>

          {/* Skills */}
          <p className='text-[17px] font-medium uppercase pt-1 tracking-widest text-gray-600 pb-2'>
            Skills
          </p>
          <div className='border-b border-gray-500'></div>
          
          {skills.length > 0 ? (
            <div className='space-y-2 pt-2 pb-2'>
              {skills.map((skill, index) => (
                <div key={skill.id || index}>
                  <p className="text-sm text-gray-800 wrap-break-word mb-1">
                    {skill.skill || ""}
                  </p>
                  {skill.level && (
                    <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0c0c1e]"
                        style={{
                          width: `${(Number(skill.level) / 5) * 100}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm pt-2">No skills added yet.</p>
          )}

          {/* Languages */}
          {isFinalizeData(finalize) && 
            Array.isArray(finalize.languages) &&
            finalize.languages.some(
              (lang) => lang.name && lang.name.trim() !== ""
            ) && (
              <div className='mt-2'>
                <p className='text-[17px] font-medium uppercase pt-1 tracking-widest text-gray-600 pb-2'>
                  Languages
                </p>
                <div className='border-b border-gray-500'></div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 pt-2">
                  {finalize.languages.map(
                    (lang, index) =>
                      lang.name &&
                      lang.name.trim() !== "" && (
                        <div key={lang._id || index}>
                          <p className="text-sm wrap-break-word text-gray-600 mb-1">
                            {lang.name}
                          </p>
                          {lang.level && (
                            <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#0c0c1e]"
                                style={{ width: `${(Number(lang.level) / 5) * 100}%` }}
                              />
                            </div>
                          )}
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

          {/* Certifications and Licenses */}
          {isFinalizeData(finalize) && 
            Array.isArray(finalize.certificationsAndLicenses) &&
            finalize.certificationsAndLicenses.some(
              (item) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
            ) && (
              <div className='mt-3'>
                <p className='text-[17px] font-medium uppercase tracking-widest text-gray-600 pb-2'>
                  Certifications and Licenses
                </p>
                <div className='border-b border-gray-500'></div>
                <div className="pt-2 pb-1 text-gray-700 text-[15px] wrap-break-word">
                  {finalize.certificationsAndLicenses.map(
                    (item, index) =>
                      item.name &&
                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                        <div 
                          key={item.id  || index} 
                          dangerouslySetInnerHTML={{ __html: item.name }} 
                        />
                      )
                  )}
                </div>
              </div>
            )}

          {/* Hobbies and Interests */}
          {isFinalizeData(finalize) && 
            Array.isArray(finalize.hobbiesAndInterests) &&
            finalize.hobbiesAndInterests.some(
              (item) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
            ) && (
              <div className='mt-2'>
                <p className='text-[17px] font-medium uppercase pt-1 tracking-widest text-gray-600 pb-2'>
                  Hobbies and Interests
                </p>
                <div className='border-b border-gray-500'></div>
                <div className='pt-2 pb-1 text-gray-700 text-[15px] wrap-break-word'>
                  {finalize.hobbiesAndInterests.map(
                    (item, index) =>
                      item.name &&
                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                        <div 
                          key={item.id || index} 
                          dangerouslySetInnerHTML={{ __html: item.name }} 
                        />
                      )
                  )}
                </div>
              </div>
            )}

          {/* Awards and Honors */}
          {isFinalizeData(finalize) && 
            Array.isArray(finalize.awardsAndHonors) &&
            finalize.awardsAndHonors.some(
              (item) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
            ) && (
              <div className="mt-2 pb-2">
                <p className="text-[17px] font-medium uppercase tracking-widest text-gray-600 pb-2">
                  Awards and Honors
                </p>
                <div className='border-b border-gray-500'></div>
                <div className="pt-2 pb-1 text-gray-700 text-[15px] wrap-break-word">
                  {finalize.awardsAndHonors.map(
                    (item, index) =>
                      item.name &&
                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                        <div
                          key={item.id  || index}
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      )
                  )}
                </div>
              </div>
            )}
        </div>

        {/* Right side */}
        <div className='w-[60%] pr-4'>
          {/* Summary */}
          <p className='text-[17px] font-medium uppercase pt-1 text-gray-600 pb-2 tracking-widest'>
            Summary
          </p>
          <div className='border-b-2 border-gray-300'></div>
          <div 
            className="pt-2 pb-3 text-gray-700 text-[15px] wrap-break-word"
            dangerouslySetInnerHTML={{ __html: summary || "" }} 
          />

          {/* Experience */}
          <div>
            {experiences?.length > 0 ? (
              experiences.map((exp, index) => (
                <div key={exp.id || index} className="mb-4">
                  <p className='text-[17px] font-medium uppercase pt-1 text-gray-600 pb-2 tracking-widest'>
                    {index === 0 ? 'Experience' : ''}
                  </p>
                  {index === 0 && <div className='border-b-2 border-gray-300'></div>}

                  {(exp.jobTitle || exp.employer || exp.location) && (
                    <h3 className="font-semibold text-gray-900 wrap-break-word text-base mt-2">
                      {exp.jobTitle || ""}
                      {exp.employer && (
                        <span className="text-gray-500 wrap-break-word font-normal">
                          {" "}— {exp.employer}
                        </span>
                      )}
                      {exp.location && (
                        <span className="text-gray-500 wrap-break-word font-normal">
                          {" "}— {exp.location}
                        </span>
                      )}
                    </h3>
                  )}

                  <div className="text-gray-600 text-sm wrap-break-word mt-1">
                    <div className="flex items-center gap-2">
                      {/* START DATE */}
                      <MonthYearDisplay value={exp.startDate} shortYear={true} />

                      {/* SHOW "-" ONLY IF BOTH DATES EXIST */}
                      {exp.startDate && exp.endDate && <span>-</span>}

                      {/* END DATE */}
                      {exp.endDate ? (
                        <MonthYearDisplay value={exp.endDate} shortYear={true} />
                      ) : (
                        "Present"
                      )}
                    </div>
                  </div>

                  <div 
                    className="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word"
                    dangerouslySetInnerHTML={{ __html: exp.text || "" }} 
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 wrap-break-word py-2">No experience added yet.</p>
            )}
          </div>

          {/* Education */}
          <p className='text-[17px] font-medium uppercase text-gray-600 pb-2 pt-1 tracking-widest'>
            Education
          </p>
          <div className='border-b-2 border-gray-300'></div>
          
          <div className='mt-2'>
            {educations?.length > 0 ? (
              educations.map((edu, index) => (
                <div key={edu.id || index} className="mb-4">
                  {(edu.schoolname || edu.degree || edu.location) && (
                    <h3 className="font-semibold wrap-break-word text-gray-900 text-base mt-1">
                      {edu.schoolname || ""}
                      {edu.degree && (
                        <span className="text-gray-500 wrap-break-word font-normal">
                          {" "}— {edu.degree}
                        </span>
                      )}
                      {edu.location && (
                        <span className="text-gray-500 wrap-break-word font-normal">
                          {" "}— {edu.location}
                        </span>
                      )}
                    </h3>
                  )}

                  {(edu.startDate || edu.endDate) && (
                    <p className="text-gray-600 wrap-break-word text-sm mt-1">
                      {edu.startDate || ""} — {edu.endDate || ""}
                    </p>
                  )}

                  <div 
                    className="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word"
                    dangerouslySetInnerHTML={{ __html: edu.text || "" }} 
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 wrap-break-word py-2">No education added yet.</p>
            )}
          </div>

          {/* Websites and Social Media */}
          {isFinalizeData(finalize) && 
            Array.isArray(finalize.websitesAndSocialMedia) &&
            finalize.websitesAndSocialMedia.some(
              (item) =>
                (item.websiteUrl && item.websiteUrl.trim() !== "") ||
                (item.socialMedia && item.socialMedia.trim() !== "")
            ) && (
              <div className="mt-2">
                <p className="text-[17px] font-medium uppercase text-gray-600 pb-2 pt-1 tracking-widest">
                  Websites and Social Media
                </p>
                <div className='border-b-2 border-gray-300'></div>
                <div className="pt-2 pb-2 text-[15px] text-gray-700 wrap-break-word">
                  {finalize.websitesAndSocialMedia.map(
                    (item, index) =>
                      ((item.websiteUrl && item.websiteUrl.trim() !== "") ||
                        (item.socialMedia && item.socialMedia.trim() !== "")) && (
                        <div key={item.id || index} className="mb-2">
                          {item.websiteUrl && (
                            <div>
                              <p className="font-semibold text-sm">Website URL:</p>
                              <a
                                href={item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-900 underline wrap-break-word text-sm"
                              >
                                {item.websiteUrl}
                              </a>
                            </div>
                          )}
                          {item.socialMedia && (
                            <div className="mt-1">
                              <p className="font-semibold text-sm">Social Media URL:</p>
                              <a
                                href={item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-900 underline wrap-break-word text-sm"
                              >
                                {item.socialMedia}
                              </a>
                            </div>
                          )}
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

          {/* References */}
          {isFinalizeData(finalize) && 
            Array.isArray(finalize.references) &&
            finalize.references.some(
              (item) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
            ) && (
              <div className="mt-2">
                <p className="text-[17px] font-medium uppercase text-gray-600 pb-2 pt-1 tracking-widest">
                  References
                </p>
                <div className='border-b-2 border-gray-300'></div>
                <div className="pt-2 pb-2 text-gray-900 text-[15px] wrap-break-word">
                  {finalize.references.map(
                    (item, index) =>
                      item.name &&
                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                        <div 
                          key={item.id || index} 
                          dangerouslySetInnerHTML={{ __html: item.name }} 
                        />
                      )
                  )}
                </div>
              </div>
            )}

          {/* Custom Section */}
          {isFinalizeData(finalize) && 
            Array.isArray(finalize.customSection) &&
            finalize.customSection.some(
              (section) => section?.name?.trim() || section?.description?.trim()
            ) && (
              <div className="mt-2 mb-4">
                {finalize.customSection
                  .filter(
                    (section) => section?.name?.trim() || section?.description?.trim()
                  )
                  .map((section, index) => (
                    <div key={section.id || index} className="pb-3">
                      {/* Show only content, no heading */}
                      {section.name && (
                        <p className="text-[17px] font-medium uppercase text-gray-600 pb-2 pt-1 tracking-widest">
                          {section.name}
                        </p>
                      )}
                      <div className='border-b-2 border-gray-300'></div>
                      {section.description && (
                        <div
                          className="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word"
                          dangerouslySetInnerHTML={{ __html: section.description }}
                        />
                      )}
                    </div>
                  ))}
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default TemplateSix;