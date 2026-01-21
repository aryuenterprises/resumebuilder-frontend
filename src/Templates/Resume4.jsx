import React, { useContext } from "react";
import { FaArrowsToDot } from "react-icons/fa6";
import { CreateContext } from "../App";
import { transform } from "framer-motion";
import MonthYearDisplay from "../Componets/MonthYearDisplay";

const Resume4 = (alldetails) => {
  const UseContext = useContext(CreateContext);

  const Allplans = UseContext?.allplandetails;

  const contact = alldetails?.alldata?.contact || UseContext || {};
  const educations =
    alldetails?.alldata?.educations || UseContext?.education || [];
  const experiences =
    alldetails?.alldata?.experiences || UseContext?.experiences || [];
  const skills = alldetails?.alldata?.skills || UseContext?.skills || [];
  const finalize =
    alldetails?.alldata?.finalize || UseContext?.globalSkillsData || {};
  const summary = alldetails?.alldata?.summary || UseContext?.text || [];
  const isFreePlan =
    Allplans === undefined ||
    Allplans === null ||
    Allplans === "FREE" ||
    (Array.isArray(Allplans) && Allplans.length === 0);

  const linkedinUrl = contact?.linkedin || contact?.linkedIn;
  return (
    <div
      className="relative bg-white border border-gray-100 mx-auto font-nunito overflow-x-auto"
      style={{
        // width: "210mm",
        padding: "5mm",
        boxSizing: "border-box",
      }}
    >
    
      {/* header */}
      <div className="mb-2">
        <div>
          <p className="text-center text-[19px] font-bold uppercase">
            {contact?.firstName || ""} {contact?.lastName || ""}
          </p>
          <p className="text-center text-[12px] font-bold mt-1 mb-1">
            {contact?.jobTitle?.name || ""}
          </p>
          <p className="text-center text-sm">
            {contact?.address || ""} , {contact?.city || ""} ,{" "}
            {contact?.country || ""} ,{contact?.postcode || ""}{" "}
          </p>
          <div className="text-center gap-6 w-full flex justify-center mt-1 mb-1">
            <span className="text-[12px] font-bold">
              {contact?.email || ""}
            </span>
            <span className="text-[12px] font-bold">
              {contact?.phone || ""}
            </span>
          </div>
          <div className="flex justify-center items-center gap-4 mb-1">
            {/* Show LinkedIn only if provided */}
            {/* {contact?.linkedin && (
              <a
                href={
                  contact.linkedin.startsWith("http")
                    ? contact.linkedin
                    : `https://${contact.linkedin}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-semibold underline  text-gray-600 text-md "
              >
                <p>LinkedIn</p>
              </a>
            )} */}

            {linkedinUrl && (
              <a
                href={
                  linkedinUrl.startsWith("http")
                    ? linkedinUrl
                    : `https://${linkedinUrl}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-semibold underline text-gray-600 text-md"
              >
                <p>LinkedIn</p>
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
                className="flex items-center gap-2 font-semibold underline  text-gray-600 text-md "
              >
                <p>Portfolio</p>
              </a>
            )}
          </div>
          {/* <hr className='mt-2 mb-4' /> */}
        </div>
        {/* summary */}
        <div>
          <div className="text-center flex items-center  justify-center bg-gray-100 font-bold uppercase text-[17px]">
            Summary
          </div>
          <div
            className="pt-2 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4"
            dangerouslySetInnerHTML={{ __html: summary || "" }}
          />
        </div>
        {/* experience */}
        <div>
          <div>
            {experiences?.length > 0 ? (
              experiences.map((exp, index) => (
                <div key={exp._id || exp.id || index} className=" text-[13px]">
                  <p className="text-center bg-gray-100 font-bold uppercase text-[17px]">
                    Experience
                  </p>

                  {(exp.jobTitle || exp.employer || exp.location) && (
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {exp.jobTitle || ""}{" "}
                      <span className="text-gray-500 font-normal">
                        — {exp.employer || ""}
                      </span>
                      <span className="text-gray-500 font-normal">
                        — {exp.location || ""}
                      </span>
                    </h3>
                  )}

                  <p className="text-gray-600 text-sm mt-1">
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
                        ""
                      )}
                    </div>
                  </p>

                  {/* <div className="list-disc ml-6 mt-2 break-words text-sm text-gray-700 space-y-1"> */}
                  {/* <li dangerouslySetInnerHTML={{ __html: exp.text || "Spearhead data analysis and reporting for key business functions, identifying trends and providing insights to improve company prerformance and profitability." }} /> */}

                  <ul
                    className="pt-2 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4"
                  >
                    <li dangerouslySetInnerHTML={{ __html: exp.text || "" }} />
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-[13px]">
                No experience added yet.
              </p>
            )}
          </div>
        </div>
        {/* education */}
        <div>
          <p className="text-center bg-gray-100 font-bold mt-1 uppercase text-[17px]">
            Education
          </p>
          <div classname="text-[13px]">
            {educations?.length > 0 ? (
              educations.map((edu, index) => (
                <div key={edu._id || edu.id || index} className="">
                  {(edu.schoolname || edu.degree || edu.location) && (
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {edu.schoolname || ""}{" "}
                      <span className="text-gray-500 font-normal">
                        — {edu.degree || ""}
                      </span>
                      <span className="text-gray-500 font-normal">
                        — {edu.location || ""}
                      </span>
                    </h3>
                  )}

                  {(edu.startDate || edu.endDate) && (
                    <p className="text-gray-600 text-sm break-words  mt-1">
                      {edu.startDate || ""} — {edu.endDate || ""}
                    </p>
                  )}

                  <ul
                    className="pt-2 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4"
                  >
                    <li dangerouslySetInnerHTML={{ __html: edu.text || "" }} />
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No education added yet.</p>
            )}
          </div>
        </div>
        {/* skills */}
        <div>
          <p className="text-center bg-gray-100 font-bold uppercase text-[17px]">
            Skills
          </p>
          {/* skills */}
          <div className="mt-2 ">
            {skills.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-[13px]">
                {skills.map((skill) => (
                  <div key={skill._id || skill.id}>
                    <p className="text-sm text-gray-500 break-words mb-1">
                      {skill.skill || ""}
                    </p>
                    {skill.level && (
                      <div className="h-[4px] w-full bg-gray-300 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0c0c1e]"
                          style={{
                            width: `${(Number(skill.level) / 4) * 100}%`, // 0–4 = 5 levels
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <ul className="list-disc pl-6 space-y-1 text-sm text-gray-800">
                {skills.map((skill) => (
                  <li key={skill._id || skill.id}>{skill.skill || ""}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Languages */}
          {Array.isArray(finalize?.languages) &&
            finalize.languages.some(
              (lang) => lang.name && lang.name.trim() !== ""
            ) && (
              <div className="mt-1">
                <p className="text-center bg-gray-100 font-bold uppercase text-[17px]">
                  Languages
                </p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {finalize.languages.map(
                    (lang, index) =>
                      lang.name &&
                      lang.name.trim() !== "" && (
                        <div key={lang._id || index}>
                          <p className="text-sm break-words text-gray-800 mb-1">
                            {lang.name}
                          </p>
                          {lang.level && (
                            <div className="h-[4px] w-full bg-gray-300 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#0c0c1e]"
                                style={{
                                  width: `${(Number(lang.level) / 4) * 100}%`,
                                }}
                              ></div>
                            </div>
                          )}
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

          {/* Certifications and Licenses */}
          {Array.isArray(finalize?.certificationsAndLicenses) &&
            finalize.certificationsAndLicenses.some(
              (item) =>
                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
            ) && (
              <div className="mt-1">
                <p className="text-center bg-gray-100 font-bold uppercase text-[17px]">
                  Certifications and licenses
                </p>
                <div
                  className="pt-2 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4"
                >
                  {finalize.certificationsAndLicenses.map(
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

          {/* Hobbies and Interests */}
          {Array.isArray(finalize?.hobbiesAndInterests) &&
            finalize.hobbiesAndInterests.some(
              (item) =>
                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
            ) && (
              <div className="mt-1">
                <p className="text-center bg-gray-100 font-bold uppercase text-[17px]">
                  Hobbies and interests
                </p>
                <div className="pt-2 pb-3 text-gray-700 text-[15px] break-words">
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

          {/* awards */}
          {Array.isArray(finalize?.awardsAndHonors) &&
            finalize.awardsAndHonors.some(
              (item) =>
                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
            ) && (
              <div className="mt-1">
                <h2 className="text-center bg-gray-100 font-bold uppercase text-[17px]">
                  Awards and Honors
                </h2>
                <div
                  className="pt-2 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4"
                >
                  {finalize.awardsAndHonors.map(
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

          {/* Websites and Social Media */}
          {Array.isArray(finalize?.websitesAndSocialMedia) &&
            finalize.websitesAndSocialMedia.some(
              (item) =>
                (item.websiteUrl && item.websiteUrl.trim() !== "") ||
                (item.socialMedia && item.socialMedia.trim() !== "")
            ) && (
              <div className="mt-1">
                <p className="text-center bg-gray-100 font-bold uppercase text-[17px]">
                  Websites and social media
                </p>
                <div className="pt-1 pb-2 text-[15px] text-gray-700 break-words">
                  {finalize.websitesAndSocialMedia.map(
                    (item, index) =>
                      ((item.websiteUrl && item.websiteUrl.trim() !== "") ||
                        (item.socialMedia &&
                          item.socialMedia.trim() !== "")) && (
                        <div key={item.id || index} className="mb-1">
                          {item.websiteUrl && (
                            <div>
                              <p className="font-semibold">Website URL:</p>
                              <a
                                href={
                                  item.websiteUrl.startsWith("http")
                                    ? item.websiteUrl
                                    : `https://${item.websiteUrl}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 underline break-words"
                              >
                                {item.websiteUrl}
                              </a>
                            </div>
                          )}
                          {item.socialMedia && (
                            <div className="mt-2">
                              <p className="font-semibold">Social Media URL:</p>
                              <a
                                href={
                                  item.socialMedia.startsWith("http")
                                    ? item.socialMedia
                                    : `https://${item.socialMedia}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 underline break-words"
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
          {Array.isArray(finalize?.references) &&
            finalize.references.some(
              (item) =>
                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
            ) && (
              <div className="mt-1">
                <p className="text-center bg-gray-100 font-bold uppercase text-[17px]">
                  References
                </p>
                <div className="pt-2 pb-3 text-gray-700 text-[15px] break-words">
                  {finalize.referencesmap(
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

          {Array.isArray(finalize?.customSection) &&
            finalize.customSection.some(
              (section) => section?.name?.trim() || section?.description?.trim()
            ) && (
              <div className="mt-1">
                {/* REMOVE HEADING – DO NOT SHOW CUSTOM SECTION TITLE */}

                {finalize.customSection
                  .filter(
                    (section) =>
                      section?.name?.trim() || section?.description?.trim()
                  )
                  .map((section, index) => (
                    <div key={section.id || index} className="pt-3 pb-4">
                      {/* Show only content, no heading */}
                      {section.name && (
                        <p className="text-center bg-gray-100 font-bold uppercase text-[17px]">
                          {section.name}
                        </p>
                      )}

                      {section.description && (
                        <div
                          className="pt-2 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4"
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

export default Resume4;
