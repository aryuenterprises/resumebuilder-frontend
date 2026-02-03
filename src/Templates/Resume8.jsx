import React, { useContext, useState, useEffect } from "react";
import { CreateContext } from "../App";
import { FaEnvelopeSquare } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { CgPhone } from "react-icons/cg";
import MonthYearDisplay from "../Componets/MonthYearDisplay";
import SimpleCanvasPreview from "../Componets/SimpleCanvasPreview";

const Resume8 = (alldetails) => {
  console.log("alldetailscxc", alldetails);

  const UseContext = useContext(CreateContext);

  // const = alldetails?.alldata;

  console.log("UseContextdd", UseContext);

  const contact = alldetails?.alldata?.contact || UseContext || {};
  const educations =
    alldetails?.alldata?.educations || UseContext?.education || [];
  const experiences =
    alldetails?.alldata?.experiences || UseContext?.experiences || [];
  const skills = alldetails?.alldata?.skills || UseContext?.skills || [];
  const finalize =
    alldetails?.alldata?.finalize || UseContext?.globalSkillsData || {};
  const summary = alldetails?.alldata?.summary || UseContext?.text || [];
  const linkedinUrl = contact?.linkedin || contact?.linkedIn;

  console.log("contact", experiences);

  return (
    // <div
    //   className=" bg-white border border-gray-100 mx-auto font-nunito"
    //   style={{
    //     width: "210mm",
    //     // height: "297mm",
    //     padding: "5mm",
    //     boxSizing: "border-box",
    //   }}
    // >
    <SimpleCanvasPreview>

      <div className="flex">
        {/* header */}
        <div className="w-[40%]  bg-[#9dbac9] pb-1 rounded-tl-3xl p-1">
          <p className="text-[21px] font-bold ml-3 break-words uppercase ">
            {contact?.firstName || ""} {contact?.lastName || ""}
          </p>
          {/* <p className='ml-3 text-[15px] font-bold break-words'>{contact?.jobTitle?.name || "Senior Sales Associate"}</p> */}
          <div className="flex ml-3 mt-2 mb-1 gap-1 items-center">
            <FaEnvelopeSquare className="w-5 h-5" />
            <p className="text-[14px] break-words">{contact?.email || ""}</p>
          </div>
          <div className="flex ml-3 mb-2 gap-1 break-words items-center">
            <FaLocationDot className="w-5 h-5" />
            <p className="text-[14px] break-words">
              {contact?.address || ""} , {contact?.city || ""} ,{" "}
              {contact?.country || ""} ,{contact?.postcode || ""}{" "}
            </p>
          </div>
          <div className="flex ml-3 gap-1 items-center">
            <CgPhone className="w-5 h-5" />
            <p className="text-[14px] break-words">{contact?.phone || ""}</p>
          </div>
          <div className="flex text-[14px] items-center gap-4 mt-2 ml-3">
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
                <i className="text-lg "></i>
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
                <i className="fas fa-globe text-lg"></i>
                <span>Portfolio</span>
              </a>
            )}
          </div>
        </div>
        {/* middle */}
        <div className="border-r bg-[#9dbac9] "></div>
        {/* summary */}
        <div className="w-[60%] bg-[#9dbac9] rounded-tr-3xl pb-16.5 p-2">
          <p className="text-[17px] uppercase font-medium ml-3">Summary </p>
          <hr className="w-40 pb-2 ml-3" />
          <p
            className="pt-2 ml-3 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4"
          >
            <div dangerouslySetInnerHTML={{ __html: summary || "" }} />
          </p>
        </div>
      </div>
      {/* body */}
      <div className="flex">
        <div className="w-[40%] ">
          {/* education */}
          <div className="mt-1 ml-3 ">
            <p className="text-[17px] uppercase font-medium ">Education</p>

            <div>
              {educations?.length > 0 ? (
                educations.map((edu, index) => (
                  <div key={edu._id || edu.id || index} className="">
                    <h3 className="font-semibold text-gray-900 gap-1 break-words text-lg">
                      {edu.schoolname || ""}
                    </h3>

                    <p className="text-gray-500 text-[15px] font-normal">
                      {edu.degree || ""}
                    </p>

                    <p className="text-gray-500 font-normal">
                      {edu.location || ""}
                    </p>

                    {/* <p className="text-gray-600 text-sm  mt-1">
                      {(edu.startDate && edu.startDate.substring(0, 4)) || "2013"}
                      {(edu.endDate && edu.endDate.substring(0, 4)) || "2017"}
                    </p> */}
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-gray-600 text-sm break-words  mt-1">
                        {edu.startDate || ""} — {edu.endDate || ""}
                      </p>
                    )}

                    <ul
                      className="pt-2 ml-6 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4"
                    >
                      <li
                        dangerouslySetInnerHTML={{
                          __html: edu.text || "",
                        }}
                      />
                    </ul>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 ">No education added yet.</p>
              )}
            </div>
          </div>
          {/* skills */}
          <div className="mt-1 ml-3 ">
            <p className="text-[17px] uppercase font-medium ">Skills</p>
            <div>
              {skills.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {skills.map((skill) => (
                    <div key={skill._id || skill.id}>
                      <p className="text-sm text-gray-700 font-medium break-words mb-1">
                        {skill.skill || ""}
                      </p>

                      {/* Show progress bar if level exists */}
                      {skill.level && (
                        <div className="h-[4px] w-full bg-gray-300 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0c0c1e] transition-all duration-300"
                            style={{
                              width: `${(Number(skill.level) / 4) * 100}%`, // handles string or number
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
          </div>

          {/*  Languages */}
          {Array.isArray(finalize?.languages) &&
            finalize.languages.some(
              (lang) => lang.name && lang.name.trim() !== "",
            ) && (
              <div className="mt-1 ml-3">
                <p className="text-[17px] uppercase font-medium">Languages</p>
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
                      ),
                  )}
                </div>
              </div>
            )}

          {/*  Certifications and Licenses */}
          {Array.isArray(finalize?.certificationsAndLicenses) &&
            finalize.certificationsAndLicenses.some(
              (item) =>
                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
            ) && (
              <div className="mt-1 ml-3">
                <p className="text-[17px] uppercase font-medium">
                  Certifications and Licenses
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
                          key={item._id || index}
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      ),
                  )}
                </div>
              </div>
            )}

          {/*  Hobbies and Interests */}
          {Array.isArray(finalize?.hobbiesAndInterests) &&
            finalize.hobbiesAndInterests.some(
              (item) =>
                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
            ) && (
              <div className="mt-1 ml-3">
                <p className="text-[17px] uppercase font-medium">
                  Hobbies and Interests
                </p>
                <div className="pt-1 pb-2 text-gray-500 text-[15px] break-words">
                  {finalize.hobbiesAndInterests.map(
                    (item, index) =>
                      item.name &&
                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                        <div
                          key={item._id || index}
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      ),
                  )}
                </div>
              </div>
            )}
        </div>
        {/* middle */}
        <div className="border-r bg-[#9dbac9] "></div>

        {/* right */}
        <div className="w-[60%]">
          {/* experience */}
          <div className="mt-1 ml-4 ">
            {/* <hr className='w-40 pb-3 ' /> */}
            <div>
              {experiences?.length > 0 ? (
                experiences.map((exp, index) => (
                  <div key={exp._id || exp.id || index} className=" pb-4">
                    <p className="text-[17px] uppercase font-medium">
                      Experience
                    </p>

                    {/* <h3 className="font-semibold text-gray-900 text-lg break-words">
                      {exp.jobTitle || ""}{" "}
                      <span className="text-gray-500 font-normal">
                        — {exp.employer || ""}
                      </span>
                      <span className="text-gray-500 font-normal">
                        — {exp.location || ""}
                      </span>
                    </h3> */}

                    {(exp.jobTitle || exp.employer || exp.location) && (
                      <h3 className="font-semibold text-gray-900 text-lg break-words">
                        {exp.jobTitle && `${exp.jobTitle} `}
                        {exp.employer && (
                          <span className="text-gray-500 font-normal">
                            — {exp.employer}
                          </span>
                        )}
                        {exp.location && (
                          <span className="text-gray-500 font-normal">
                            — {exp.location}
                          </span>
                        )}
                      </h3>
                    )}

                    <p className="text-gray-600 text-sm  mt-1">
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

                    <ul
                      className="pt-2 ml-3 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4"
                    >
                      <li
                        dangerouslySetInnerHTML={{
                          __html: exp.text || "",
                        }}
                      />
                    </ul>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 ">No experience added yet.</p>
              )}
            </div>
          </div>
          {/*  Awards and Honors */}
          {Array.isArray(finalize?.awardsAndHonors) &&
            finalize.awardsAndHonors.some(
              (item) =>
                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
            ) && (
              <div className="mt-1 ml-3">
                <p className="text-[17px] uppercase font-medium">
                  Awards and Honors
                </p>
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
                          key={item._id || index}
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      ),
                  )}
                </div>
              </div>
            )}

          {/*  Websites and Social Media */}
          {Array.isArray(finalize?.websitesAndSocialMedia) &&
            finalize.websitesAndSocialMedia.some(
              (item) =>
                (item.websiteUrl && item.websiteUrl.trim() !== "") ||
                (item.socialMedia && item.socialMedia.trim() !== ""),
            ) && (
              <div className="mt-1 ml-3">
                <p className="text-[17px] uppercase font-medium">
                  Websites and Social Media
                </p>
                <div className="pt-1 pb-2 text-[15px] break-words">
                  {finalize.websitesAndSocialMedia.map(
                    (item, index) =>
                      ((item.websiteUrl && item.websiteUrl.trim() !== "") ||
                        (item.socialMedia &&
                          item.socialMedia.trim() !== "")) && (
                        <div key={item._id || index} className="mb-2">
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
                                className="text-gray-500 underline break-words"
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
                                className="text-gray-500 underline break-words"
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

          {/*  References */}
          {Array.isArray(finalize?.references) &&
            finalize.references.some(
              (item) =>
                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "",
            ) && (
              <div className="mt-1 ml-3">
                <p className="text-[17px] uppercase font-medium">References</p>
                <div className="pt-1 pb-2 text-gray-500 text-[15px] break-words">
                  {finalize.references.map(
                    (item, index) =>
                      item.name &&
                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                        <div
                          key={item._id || index}
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      ),
                  )}
                </div>
              </div>
            )}

          {/* Custom Section */}

          {Array.isArray(finalize?.customSection) &&
            finalize.customSection.some(
              (section) =>
                section?.name?.trim() || section?.description?.trim(),
            ) && (
              <div className="mt-1">
                {/* REMOVE HEADING – DO NOT SHOW CUSTOM SECTION TITLE */}

                {finalize.customSection
                  .filter(
                    (section) =>
                      section?.name?.trim() || section?.description?.trim(),
                  )
                  .map((section, index) => (
                    <div key={section.id || index} className="mt-1 ml-3">
                      {/* Show only content, no heading */}
                      {section.name && (
                        <p className="text-[17px] uppercase font-medium">
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
    </SimpleCanvasPreview>

    // </div>
  );
};

export default Resume8;
