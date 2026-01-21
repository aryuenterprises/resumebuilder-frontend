import React, { useContext } from 'react'
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CreateContext } from '../App';
import MonthYearDisplay from '../Componets/MonthYearDisplay';
// import { CgEditUnmask } from 'react-icons/cg';

const Resume3 = (alldetails) => {
  console.log("all textt", alldetails)

  const UseContext = useContext(CreateContext)

  console.log("UseContextdd", UseContext)

  const contact = alldetails?.alldata?.contact || UseContext || {};
  const educations = alldetails?.alldata?.educations || UseContext?.education || [];
  const experiences = alldetails?.alldata?.experiences || UseContext?.experiences || [];
  const skills = alldetails?.alldata?.skills || UseContext?.skills || [];
  const finalize = alldetails?.alldata?.finalize || UseContext?.globalSkillsData || {};
  const summary = alldetails?.alldata?.summary || UseContext?.text || [];

  const linkedinUrl = contact?.linkedin || contact?.linkedIn;


  return (
    <div className=" bg-white border border-gray-100 font-nunito flex gap-1 mx-auto " style={{
      width: "210mm",
      // height: "297mm",
      padding: "5mm",
      boxSizing: "border-box",
    }}>
      {/* left side */}
      {/* header */}
      <div className='p-5 w-[40%] mx-auto bg-gray-100 rounded-tl-2xl'>
        <p className='text-3xl uppercase text-gray-600 mb-1 break-words'>{contact?.firstName || ""} {contact?.lastName || ""}</p>
        {/* <p className='text-3xl mb-3 uppercase text-gray-600'>BlackWell</p> */}
        {/* <p className='font-semibold mb-1 text-gray-600'>{contact?.jobTitle?.name || "Administrative Assistant"}</p> */}
        <div className="flex items-center gap-4 mb-2">
          {/* Show LinkedIn only if provided */}
          {linkedinUrl && (
            <a
              href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold underline  text-gray-600 text-md "
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
        {/* details */}
        <p className='text-[17px] font-medium uppercase text-gray-600 pb-2 tracking-widest'>Details</p>
        <div className="border-b border-gray-500 "></div>
        <div className='py-1'>
          <div className='flex justify-start gap-1 py-1'>
            <div className='p-1 bg-black rounded-full'>
              <FaEnvelope className='text-white' />
            </div>
            <p className='text-sm items-start text-gray-600 break-words'>{contact?.email || ""}</p>
          </div>
          <div className="flex justify-start gap-1 py-1">
            <div className='p-1 bg-black rounded-full'>
              <FaPhoneAlt className='text-white' />
            </div>
            <p className='text-sm text-gray-600 break-words'>{contact?.phone || ""}</p>
          </div>
          <div className="flex justify-start items-center gap-1 py-1">
            <div className='p-1 bg-black rounded-full'>
              <FaMapMarkerAlt className='text-white ' />
            </div>
            <p className='text-sm text-gray-600 break-words'>{contact?.address || ""}, {UseContext?.city || ""} ,{UseContext?.country || ""} ,{UseContext?.postcode || ""}</p>
          </div>
        </div>
        {/* skills */}
        <p className='text-[17px] font-medium uppercase pt-1 tracking-widest text-gray-600 pb-2 '>skills</p>
        <p className='border-b border-gray-500'></p>
        {skills.length > 0 ? (
          <p className='list-disc list-inside space-y-1 pt-1 pb-2'>
            {skills.map((skill) => (
              <div key={skill._id || skill.id}>
                <p className="text-sm text-gray-800 break-words mb-1">
                  {skill.skill || "HTML"}
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
          </p>
        ) : (
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-800">
            {skills.map((skill) => (
              <li key={skill._id || skill.id}>{skill.skill || ""}</li>
            ))}
          </ul>
        )}


        {/* Languages */}
        {Array.isArray(finalize?.languages) &&
          finalize.languages.some(
            (lang) => lang.name && lang.name.trim() !== ""
          ) && (
            <div className='mt-1'>
              <p className='text-[17px] font-medium uppercase pt-1 tracking-widest text-gray-600 pb-2 '>Languages</p>
              <p className='border-b border-gray-500'></p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {finalize.languages.map(
                  (lang, index) =>
                    lang.name &&
                    lang.name.trim() !== "" && (
                      <div key={lang._id || index}>
                        <p className="text-sm break-words text-gray-600 mb-1">{lang.name}</p>
                        {lang.level && (
                          <div className="h-[4px] w-full bg-gray-300 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#0c0c1e]"
                              style={{ width: `${(Number(lang.level) / 4) * 100}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    ))}
              </div>
            </div>
          )}

        {/* Certifications and Licenses */}
        {Array.isArray(finalize?.certificationsAndLicenses) &&
          finalize.certificationsAndLicenses.some(
            (item) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
          ) && (
            <div className='mt-3'>
              <p className='text-[17px] font-medium uppercase tracking-widest text-gray-600 pb-2 '>Certifications and licenses</p>
              <p className='border-b border-gray-500'></p>
              <div className="pt-2 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4">
                {finalize.certificationsAndLicenses.map(
                  (item, index) =>
                    item.name &&
                    item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                      <div key={item.id || index} dangerouslySetInnerHTML={{ __html: item.name }} />
                    ))}
              </div>
            </div>
          )}

        {/* Hobbies and Interests */}
        {Array.isArray(finalize?.hobbiesAndInterests) &&
          finalize.hobbiesAndInterests.some(
            (item) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
          ) && (
            <div className='mt-1'>
              <p className='text-[17px] font-medium uppercase pt-1 tracking-widest text-gray-600 pb-2 '>Hobbies and interests</p>
              <p className='border-b border-gray-500'></p>
              <div className='pt-1 pb-2 text-gray-700 text-[15px] break-words'>
                {finalize.hobbiesAndInterests.map(
                  (item, index) =>
                    item.name &&
                    item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                      <div key={item.id || index} dangerouslySetInnerHTML={{ __html: item.name }} />
                    ))}
              </div>
            </div>
          )}

        {Array.isArray(finalize?.awardsAndHonors) &&
          finalize.awardsAndHonors.some(
            (item) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
          ) && (
            <div className="mt-1 pb-5">
              <h2 className="text-[17px] pt-1 font-medium uppercase tracking-widest text-gray-600 pb-2 ">
                Awards and Honors
              </h2>
              <p className='border-b border-gray-500'></p>
              <div className="pt-2 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4">
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





      </div>
      <div className='gap-1'></div>
      {/* right side */}
      <div className='mx-auto w-[60%]'>
        {/* summary */}
        <p className='text-[17px] font-medium uppercase pt-1 text-gray-600 pb-2 tracking-widest'>Summary </p>
        <p className='list-disc list-inside space-y-1 border-b-2 border-gray-300'></p>
        <p className="pt-2 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4">
          <div dangerouslySetInnerHTML={{ __html: summary || "" }} />
        </p>
        {/* experience */}

        <div>
          {experiences?.length > 0 ? (
            experiences.map((exp, index) => (
              <div key={exp._id || exp.id || index} className="">

                <p className='text-[17px] font-medium uppercase pt-1 text-gray-600 pb-2 tracking-widest'>Experience</p>
                <div className='border-b-2 border-gray-300 '></div>

                {(exp.jobTitle || exp.employer || exp.location) && (
                  <h3 className="font-semibold text-gray-900 break-words text-lg">
                    {exp.jobTitle || ""}{" "}
                    <span className="text-gray-500 break-words font-normal">
                      — {exp.employer || ""}
                    </span>
                    <span className="text-gray-500 break-words font-normal">
                      — {exp.location || ""}
                    </span>
                  </h3>
                )}

                <p className="text-gray-600 text-sm break-words mt-1">
                  <div className="flex items-center gap-2">
                        {/* START DATE */}
                        <MonthYearDisplay value={exp.startDate} shortYear={true} />

                        {/* SHOW "-" ONLY IF BOTH DATES EXIST */}
                        {exp.startDate && exp.endDate && <span>-</span>}

                        {/* END DATE */}
                        {exp.endDate ? (
                          <MonthYearDisplay value={exp.endDate} shortYear={true} />
                        ) : (
                          ""
                        )}
                      </div>
                </p>

                <ul className="pt-2 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4">
                  <li dangerouslySetInnerHTML={{
                    __html: exp.text || ""
                  }} />
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-500 break-words">No experience added yet.</p>
          )}
        </div>
        {/* education */}
        <p className='text-[17px] font-medium uppercase text-gray-600 pb-2 pt-1 tracking-widest'>Education</p>
        <div className='border-b-2 border-gray-300 '></div>
        <div className=''>
          {educations?.length > 0 ? (
            educations.map((edu, index) => (
              <div key={edu._id || edu.id || index} className="">
                {(edu.schoolname || edu.degree || edu.location) && (
                  <h3 className="font-semibold break-words text-gray-900 text-lg">
                    {edu.schoolname || ""}
                    <span className="text-gray-500 break-words font-normal">
                      — {edu.degree || ""}
                    </span>
                    <span className="text-gray-500 break-words font-normal">
                      — {edu.location || ""}
                    </span>
                  </h3>
                )}

                {(edu.startDate || edu.endDate) && (
                  <p className="text-gray-600 break-words text-sm mt-1">
                    {edu.startDate || ""} — {edu.endDate || ""}
                  </p>
                )}


                <ul className="pt-2 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4">
                  <li dangerouslySetInnerHTML={{
                    __html: edu.text || ""
                  }} />
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-500 break-words">No education added yet.</p>
          )}
        </div>

        {/* Websites and Social Media */}
        {Array.isArray(finalize?.websitesAndSocialMedia) &&
          finalize.websitesAndSocialMedia.some(
            (item) =>
              (item.websiteUrl && item.websiteUrl.trim() !== "") ||
              (item.socialMedia && item.socialMedia.trim() !== "")
          ) && (
            <div className="mt-1">
              <p className="text-[17px] font-medium uppercase text-gray-600 pb-2 pt-1 tracking-widest">Websites and social media</p>
              <p className='border-b-2 border-gray-300 '></p>
              <div className="pt-1 pb-2 text-[15px] text-gray-700 break-words">
                {finalize.websitesAndSocialMedia.map(
                  (item, index) =>
                    ((item.websiteUrl && item.websiteUrl.trim() !== "") ||
                      (item.socialMedia && item.socialMedia.trim() !== "")) && (
                      <div key={item.id || index} className="mb-1">
                        {item.websiteUrl && (
                          <div>
                            <p className="font-semibold">Website URL:</p>
                            <a
                              href={item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-900 underline break-words"
                            >
                              {item.websiteUrl}
                            </a>
                          </div>
                        )}
                        {item.socialMedia && (
                          <div className="mt-1">
                            <p className="font-semibold">Social Media URL:</p>
                            <a
                              href={item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-900 underline break-words"
                            >
                              {item.socialMedia}
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
              </div>
            </div>
          )}

        {/* References */}
        {Array.isArray(finalize?.references) &&
          finalize.references.some(
            (item) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
          ) && (
            <div className="">
              <p className="text-[17px] font-medium uppercase text-gray-600 pb-2 pt-1 tracking-widest">References</p>
              <p className='border-b-2 border-gray-300 '></p>
              <div className="pt-1 pb-2 text-gray-900 text-[15px] break-words">
                {finalize.references.map(
                  (item, index) =>
                    item.name &&
                    item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                      <div key={item.id || index} dangerouslySetInnerHTML={{ __html: item.name }} />
                    ))}
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
                  (section) => section?.name?.trim() || section?.description?.trim()
                )
                .map((section, index) => (
                  <div key={section.id || index} className=" pb-3">
                    {/* Show only content, no heading */}
                    {section.name && (
                      <p className="text-[17px] font-medium uppercase text-gray-600 pb-2 pt-1 tracking-widest">
                        {section.name}
                      </p>

                    )}
                    <div className='border-b-2 border-gray-300 '></div>
                    {section.description && (
                      <div
                        className="pt-2 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4"
                        dangerouslySetInnerHTML={{ __html: section.description }}
                      />
                    )}
                  </div>
                ))}
            </div>
          )}

      </div>
    </div>
  )
}

export default Resume3
