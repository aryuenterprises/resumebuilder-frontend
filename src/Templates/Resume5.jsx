import React, { useContext } from 'react'
import { CreateContext } from "../App";
import MonthYearDisplay from '../Componets/MonthYearDisplay';

const Resume5 = (alldetails) => {
  console.log("alldetailscxc", alldetails)

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
    <div className=" bg-white border border-gray-100 mx-auto font-nunito" style={{
      width: "210mm",
      // height: "297mm",
      padding: "5mm",
      boxSizing: "border-box",
    }}>
      {/* header */}
      <div className='flex justify-between bg-[#878787] h-auto p-1 text-white rounded-2xl'>
        <div className='w-[40%] text-[27px] font-medium p-3 uppercase break-words'>{contact?.firstName || ""} {contact?.
          lastName
          || ""}
          <div className="flex items-center gap-4 pb-2 ">
            {/* Show LinkedIn only if provided */}
            {linkedinUrl && (
              <a
                href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-semibold underline  text-white text-sm "
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
                className="flex items-center gap-2 font-semibold underline  text-white text-sm "
              >
                <p>Portfolio</p>
              </a>
            )}
          </div> </div>
        <div className='w-[60%] p-3 text-[14px]'>
          <p className='text-end break-words'>{contact?.email || ""} • {contact?.phone || ""} </p>
          <p className='text-end break-words'>{contact?.address || ""}, {contact?.city || ""} ,{contact?.country || ""} ,{contact?.postcode || ""}</p>
        </div>
      </div>
      {/* Head line */}
      {/* <div className='font-bold text-[18px] p-1 ml-4'>{contact?.jobTitle?.name || "Physical Therapist"}</div> */}
      {/* summary */}
      <div>
        <p className=' text-[22px] ml-5'>Summary </p>
        <p className="ml-5 pt-2 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4">
          <div dangerouslySetInnerHTML={{ __html: summary || "" }} />
        </p>
      </div>
      {/* experience1 */}

      <div>
        {experiences?.length > 0 ? (
          experiences.map((exp, index) => (
            <div key={exp._id || exp.id || index} className="">
              <p className='text-[22px] ml-5 mt-1'>Experience</p>
              <div className='ml-6'>
                {(exp.jobTitle || exp.employer || exp.location) && (
                  <h3 className="font-semibold text-gray-900 text-lg break-words">
                    {exp.jobTitle && `${exp.jobTitle} `}
                    {exp.employer && (
                      <span className="text-gray-500 font-normal">— {exp.employer}</span>
                    )}
                    {exp.location && (
                      <span className="text-gray-500 font-normal">— {exp.location}</span>
                    )}
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
            </div>
          ))
        ) : (
          <p className="text-gray-500 break-words">No experience added yet.</p>
        )}
      </div>


      {/* education */}
      <div>
        <p className='text-[22px] ml-5 mt-1'>Education</p>
        <div className='ml-6'>
          {educations?.length > 0 ? (
            educations.map((edu, index) => (
              <div key={edu._id || edu.id || index} className="pb-2">
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

                  <p className="text-gray-500 text-sm break-words  mt-1">
                    {edu.startDate || ""} — {edu.endDate || ""}
                  </p>
                )}

                <ul className="pt-2 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4">
                  <li dangerouslySetInnerHTML={{ __html: edu.text || "" }} />
                </ul>

              </div>
            ))
          ) : (
            <p className="text-gray-500 break-words">No education added yet.</p>
          )}
        </div>
      </div>
      {/* skills */}
      <div className='list-disc list-inside space-y-1 ml-5 text-[15px] '>
        <p className='text-[22px] mt-1'>Skills</p>
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

      {/* Languages */}
      {Array.isArray(finalize?.languages) &&
        finalize.languages.some(
          (lang) => lang.name && lang.name.trim() !== ""
        ) && (
          <div className='mt-2'>
            <p className='text-[22px] ml-5 mt-1'>Languages</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 ml-5">
              {finalize.languagesmap(
                (lang, index) =>
                  lang.name &&
                  lang.name.trim() !== "" && (
                    <div key={lang._id || index}>
                      <p className="text-sm break-words text-gray-800  mb-1">{lang.name}</p>
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
          <div className='mt-1'>
            <p className='text-[22px] ml-5 mt-1'>Certifications and licenses</p>
            <div className="pt-2 ml-5 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4 ">
              {finalize.certificationsAndLicensesmap(
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
            <p className='text-[22px] ml-5 mt-1'>Hobbies and interests</p>
            <div className='pt-1 pb-1 ml-5 text-gray-700 text-[15px] break-words'>
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
          <div className="mt-1">
            <h2 className="text-[22px] ml-5 mt-1">
              Awards and Honors
            </h2>
            <div className="pt-2 ml-5 pb-3 text-gray-700 text-[15px] break-words
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


      {/* Websites and Social Media */}
      {Array.isArray(finalize?.websitesAndSocialMedia) &&
        finalize.websitesAndSocialMedia.some(
          (item) =>
            (item.websiteUrl && item.websiteUrl.trim() !== "") ||
            (item.socialMedia && item.socialMedia.trim() !== "")
        ) && (
          <div className="mt-1">
            <p className="text-[22px] ml-5 ">Websites and social media</p>
            <div className="pt-1 pb-1 ml-5 text-[15px] text-gray-700 break-words">
              {finalize.websitesAndSocialMediamap(
                (item, index) =>
                  ((item.websiteUrl && item.websiteUrl.trim() !== "") ||
                    (item.socialMedia && item.socialMedia.trim() !== "")) && (
                    <div key={item.id || index} className="mb-2">
                      {item.websiteUrl && (
                        <div>
                          <p className="font-semibold">Website URL:</p>
                          <a
                            href={item.websiteUrl.startsWith("http") ? item.websiteUrl : `https://${item.websiteUrl}`}
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
                            href={item.socialMedia.startsWith("http") ? item.socialMedia : `https://${item.socialMedia}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 underline break-words"
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
          <div className="mt-1">
            <p className="text-[22px] ml-5 mt-1">References</p>
            <div className="pt-1 pb-3 ml-5 text-gray-700 text-[15px] break-words">
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
                <div key={section.id || index} className=" pb-2">
                  {/* Show only content, no heading */}
                  {section.name && (
                    <p className="text-[17px] uppercase font-medium ml-5 mt-1">
                      {section.name}
                    </p>
                  )}

                  {section.description && (
                    <div
                      className="pt-2 ml-5 pb-3 text-gray-700 text-[15px] break-words
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
  )
}

export default Resume5
