"use client";

import React, { useContext } from "react";
import { FaEnvelopeSquare } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { CgPhone } from "react-icons/cg";
import { CreateContext } from "@/app/context/CreateContext"; // Updated import
import { IoPersonOutline } from "react-icons/io5";
import { API_URL } from "@/app/config/api";
import MonthYearDisplay from "@/app/utils/MonthYearDisplay"

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


const TemplateSeven: React.FC<ResumeProps> = ({ alldata }) => {
  console.log("alldetailscxc", alldata);

  const context = useContext(CreateContext);
  console.log("UseContextdd", context);

  const contact = alldata?.contact || context.contact || {};
  const educations = alldata?.educations || context?.education || [];
  const experiences = alldata?.experiences || context?.experiences || [];
  const skills = alldata?.skills || context?.skills || [];
  const finalize = alldata?.finalize || context?.finalize || {};
  const summary = alldata?.summary || context?.summary || "";
  const linkedinUrl = contact?.linkedin 

  console.log("contact", experiences);

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

  // Safe arrays for FinalizeData
  const safeLanguages = isFinalizeData(finalize) && Array.isArray(finalize.languages) 
    ? finalize.languages 
    : [];
  
  const safeCertifications = isFinalizeData(finalize) && Array.isArray(finalize.certificationsAndLicenses)
    ? finalize.certificationsAndLicenses
    : [];
  
  const safeHobbies = isFinalizeData(finalize) && Array.isArray(finalize.hobbiesAndInterests)
    ? finalize.hobbiesAndInterests
    : [];
  
  const safeAwards = isFinalizeData(finalize) && Array.isArray(finalize.awardsAndHonors)
    ? finalize.awardsAndHonors
    : [];
  
  const safeWebsites = isFinalizeData(finalize) && Array.isArray(finalize.websitesAndSocialMedia)
    ? finalize.websitesAndSocialMedia
    : [];
  
  const safeReferences = isFinalizeData(finalize) && Array.isArray(finalize.references)
    ? finalize.references
    : [];
  
  const safeCustomSection = isFinalizeData(finalize) && Array.isArray(finalize.customSection)
    ? finalize.customSection
    : [];

  return (
    <div>
      <div className="flex">
        {/* Header - Left Side */}
        <div className="w-[40%] bg-[#9dbac9] pb-1 rounded-tl-3xl p-1">
          <p className="text-[21px] font-bold ml-3 wrap-break-word uppercase">
            {contact?.firstName || ""} {contact?.lastName || ""}
          </p>
          {contact?.jobTitle && (
            <p className="ml-3 text-[15px] font-medium wrap-break-word">
              {getJobTitle(contact.jobTitle)}
            </p>
          )}
          <div className="flex ml-3 mt-2 mb-1 gap-1 items-center">
            <FaEnvelopeSquare className="w-5 h-5 shrink-0" />
            <p className="text-[14px] wrap-break-word">{contact?.email || ""}</p>
          </div>
          <div className="flex ml-3 mb-2 gap-1 wrap-break-word items-start">
            <FaLocationDot className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-[14px] wrap-break-word">
              {contact?.address || ""}, {contact?.city || ""},{" "}
              {contact?.country || ""}, {contact?.postcode || ""}
            </p>
          </div>
          <div className="flex ml-3 gap-1 items-center">
            <CgPhone className="w-5 h-5 shrink-0" />
            <p className="text-[14px] wrap-break-word">{contact?.phone || ""}</p>
          </div>
          <div className="flex text-[14px] items-center gap-4 mt-2 ml-3 flex-wrap">
            {/* Show LinkedIn only if provided */}
            {linkedinUrl && (
              <a
                href={
                  linkedinUrl.startsWith("http")
                    ? linkedinUrl
                    : `https://${linkedinUrl}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm transition-all duration-300 shadow"
              >
                <span>LinkedIn</span>
              </a>
            )}

            {/* Show Portfolio only if provided */}
            {contact?.portfolio && (
              <a
                href={
                  contact.portfolio.startsWith("http")
                    ? contact.portfolio
                    : `https://${contact.portfolio}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm transition-all duration-300 shadow"
              >
                <span>Portfolio</span>
              </a>
            )}
          </div>
        </div>
        
        {/* Middle border */}
        <div className="border-r bg-[#9dbac9]"></div>
        
        {/* Summary - Right Side */}
        <div className="w-[60%] bg-[#9dbac9] rounded-tr-3xl pb-16 p-2">
          <p className="text-[17px] uppercase font-medium ml-3">Summary</p>
          <hr className="w-40 pb-2 ml-3 border-black" />
          <div
            className="pt-2 ml-3 pb-3 text-gray-700 text-[15px] wrap-break-word"
            dangerouslySetInnerHTML={{ __html: summary || "" }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex">
        {/* Left Column */}
        <div className="w-[40%]">
          {/* Education */}
          <div className="mt-1 ml-3">
            <p className="text-[17px] uppercase font-medium">Education</p>
            <div>
              {educations?.length > 0 ? (
                educations.map((edu, index) => (
                  <div key={ edu.id || index} className="mb-3">
                    <h3 className="font-semibold text-gray-900 wrap-break-word text-base">
                      {edu.schoolname || ""}
                    </h3>

                    <p className="text-gray-500 text-[15px] font-normal">
                      {edu.degree || ""}
                    </p>

                    <p className="text-gray-500 font-normal">
                      {edu.location || ""}
                    </p>

                    {(edu.startDate || edu.endDate) && (
                      <p className="text-gray-600 text-sm wrap-break-word mt-1">
                        <MonthYearDisplay value={edu.startDate} shortYear={true} />
                        {" — "}
                        <MonthYearDisplay value={edu.endDate} shortYear={true} />
                      </p>
                    )}

                    <div
                      className="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word"
                      dangerouslySetInnerHTML={{ __html: edu.text || "" }}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No education added yet.</p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="mt-2 ml-3">
            <p className="text-[17px] uppercase font-medium">Skills</p>
            <div>
              {skills.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-1">
                  {skills.map((skill, index) => (
                    <div key={ skill.id || index}>
                      <p className="text-sm text-gray-700 font-medium wrap-break-word mb-1">
                        {skill.skill || ""}
                      </p>

                      {/* Show progress bar if level exists */}
                      {skill.level && (
                        <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0c0c1e] transition-all duration-300"
                            style={{
                              width: `${(Number(skill.level) / 4) * 100}%`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mt-1">No skills added yet.</p>
              )}
            </div>
          </div>

          {/* Languages */}
          {safeLanguages.length > 0 &&
            safeLanguages.some(
              (lang) => lang.name && lang.name.trim() !== "",
            ) && (
              <div className="mt-2 ml-3">
                <p className="text-[17px] uppercase font-medium">Languages</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-1">
                  {safeLanguages.map(
                    (lang, index) =>
                      lang.name &&
                      lang.name.trim() !== "" && (
                        <div key={lang._id || index}>
                          <p className="text-sm wrap-break-word text-gray-800 mb-1">
                            {lang.name}
                          </p>
                          {lang.level && (
                            <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#0c0c1e]"
                                style={{
                                  width: `${(Number(lang.level) / 4) * 100}%`,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

          {/* Certifications and Licenses */}
          {safeCertifications.length > 0 &&
            safeCertifications.some(
              (item) =>
                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
            ) && (
              <div className="mt-2 ml-3">
                <p className="text-[17px] uppercase font-medium">
                  Certifications and Licenses
                </p>
                <div className="pt-1 pb-2 text-gray-700 text-[15px] wrap-break-word">
                  {safeCertifications.map(
                    (item, index) =>
                      item.name &&
                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                        <div
                          key={ item.id || index}
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      ),
                  )}
                </div>
              </div>
            )}

          {/* Hobbies and Interests */}
          {safeHobbies.length > 0 &&
            safeHobbies.some(
              (item) =>
                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
            ) && (
              <div className="mt-2 ml-3">
                <p className="text-[17px] uppercase font-medium">
                  Hobbies and Interests
                </p>
                <div className="pt-1 pb-2 text-gray-500 text-[15px] wrap-break-word">
                  {safeHobbies.map(
                    (item, index) =>
                      item.name &&
                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                        <div
                          key={item.id || index}
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      ),
                  )}
                </div>
              </div>
            )}
        </div>

        {/* Middle border */}
        <div className="border-r bg-[#9dbac9]"></div>

        {/* Right Column */}
        <div className="w-[60%]">
          {/* Experience */}
          <div className="mt-1 ml-4">
            <div>
              {experiences?.length > 0 ? (
                experiences.map((exp, index) => (
                  <div key={ exp.id || index} className="pb-4">
                    {index === 0 && (
                      <p className="text-[17px] uppercase font-medium">
                        Experience
                      </p>
                    )}

                    {(exp.jobTitle || exp.employer || exp.location) && (
                      <h3 className="font-semibold text-gray-900 text-base wrap-break-word mt-1">
                        {exp.jobTitle && `${exp.jobTitle} `}
                        {exp.employer && (
                          <span className="text-gray-500 font-normal">
                            — {exp.employer}
                          </span>
                        )}
                        {exp.location && (
                          <span className="text-gray-500 font-normal">
                            {" "}
                            — {exp.location}
                          </span>
                        )}
                      </h3>
                    )}

                    <div className="text-gray-600 text-sm mt-1">
                      <div className="flex items-center gap-2">
                        {/* START DATE */}
                        <MonthYearDisplay
                          value={exp.startDate}
                          shortYear={true}
                        />

                        {/* SHOW "-" ONLY IF BOTH DATES EXIST */}
                        {exp.startDate && exp.endDate && <span>-</span>}

                        {/* END DATE */}
                        {exp.endDate ? (
                          <MonthYearDisplay
                            value={exp.endDate}
                            shortYear={true}
                          />
                        ) : (
                          "Present"
                        )}
                      </div>
                    </div>

                    <div
                      className="pt-2 pb-2 text-gray-700 text-[15px] wrap-break-word"
                      dangerouslySetInnerHTML={{
                        __html: exp.text || "",
                      }}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No experience added yet.</p>
              )}
            </div>
          </div>

          {/* Awards and Honors */}
          {safeAwards.length > 0 &&
            safeAwards.some(
              (item) =>
                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
            ) && (
              <div className="mt-2 ml-4">
                <p className="text-[17px] uppercase font-medium">
                  Awards and Honors
                </p>
                <div className="pt-1 pb-2 text-gray-700 text-[15px] wrap-break-word">
                  {safeAwards.map(
                    (item, index) =>
                      item.name &&
                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                        <div
                          key={ item.id || index}
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      ),
                  )}
                </div>
              </div>
            )}

          {/* Websites and Social Media */}
          {safeWebsites.length > 0 &&
            safeWebsites.some(
              (item) =>
                (item.websiteUrl && item.websiteUrl.trim() !== "") ||
                (item.socialMedia && item.socialMedia.trim() !== ""),
            ) && (
              <div className="mt-2 ml-4">
                <p className="text-[17px] uppercase font-medium">
                  Websites and Social Media
                </p>
                <div className="pt-1 pb-2 text-[15px] wrap-break-word">
                  {safeWebsites.map(
                    (item, index) =>
                      ((item.websiteUrl && item.websiteUrl.trim() !== "") ||
                        (item.socialMedia &&
                          item.socialMedia.trim() !== "")) && (
                        <div key={ item.id || index} className="mb-2">
                          {item.websiteUrl && (
                            <div>
                              <p className="font-semibold text-sm">Website URL:</p>
                              <a
                                href={
                                  item.websiteUrl.startsWith("http")
                                    ? item.websiteUrl
                                    : `https://${item.websiteUrl}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 underline wrap-break-word text-sm"
                              >
                                {item.websiteUrl}
                              </a>
                            </div>
                          )}
                          {item.socialMedia && (
                            <div className="mt-1">
                              <p className="font-semibold text-sm">Social Media URL:</p>
                              <a
                                href={
                                  item.socialMedia.startsWith("http")
                                    ? item.socialMedia
                                    : `https://${item.socialMedia}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 underline wrap-break-word text-sm"
                              >
                                {item.socialMedia}
                              </a>
                            </div>
                          )}
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

          {/* References */}
          {safeReferences.length > 0 &&
            safeReferences.some(
              (item) =>
                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
            ) && (
              <div className="mt-2 ml-4">
                <p className="text-[17px] uppercase font-medium">References</p>
                <div className="pt-1 pb-2 text-gray-500 text-[15px] wrap-break-word">
                  {safeReferences.map(
                    (item, index) =>
                      item.name &&
                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                        <div
                          key={item.id || index}
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      ),
                  )}
                </div>
              </div>
            )}

          {/* Custom Section */}
          {safeCustomSection.length > 0 &&
            safeCustomSection.some(
              (section) =>
                section?.name?.trim() || section?.description?.trim(),
            ) && (
              <div className="mt-2 mb-3">
                {safeCustomSection
                  .filter(
                    (section) =>
                      section?.name?.trim() || section?.description?.trim(),
                  )
                  .map((section, index) => (
                    <div key={section.id || index} className="mt-2 ml-4">
                      {/* Show only content, no heading */}
                      {section.name && (
                        <p className="text-[17px] uppercase font-medium">
                          {section.name}
                        </p>
                      )}

                      {section.description && (
                        <div
                          className="pt-1 pb-2 text-gray-700 text-[15px] wrap-break-word"
                          dangerouslySetInnerHTML={{
                            __html: section.description,
                          }}
                        />
                      )}
                    </div>
                  ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TemplateSeven;