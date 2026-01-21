import React, { useContext, useState, useEffect } from 'react'
import { CreateContext } from '../App';
// import pic from "../assets/Resumepic2.webp"
import { IoPersonOutline } from "react-icons/io5";
import { API_URL } from '../Config';
import MonthYearDisplay from '../Componets/MonthYearDisplay';


const Resume2 = (alldetails) => {
  console.log("alldata", alldetails)



  const UseContext = useContext(CreateContext)

  console.log("UseContextdd", UseContext)

  const { croppedImage } = UseContext;
  console.log("croppedImaged", croppedImage)
  const [previewUrl, setPreviewUrl] = useState(null);

  // useEffect(() => {
  //   if (!croppedImage) return;
  //   if (typeof croppedImage === "string" && croppedImage.startsWith("blob:")) {
  //     setPreviewUrl(croppedImage);
  //   }
  //   else if (croppedImage instanceof Blob || croppedImage instanceof File) {
  //     const url = URL.createObjectURL(croppedImage);
  //     setPreviewUrl(url);
  //     return () => URL.revokeObjectURL(url);
  //   }
  // }, [croppedImage]);

  const contact = alldetails?.alldata?.contact || UseContext || {};
  const educations = alldetails?.alldata?.educations || UseContext?.education || [];
  const experiences = alldetails?.alldata?.experiences || UseContext?.experiences || [];
  const skills = alldetails?.alldata?.skills || UseContext?.skills || [];
  const finalize = alldetails?.alldata?.finalize || UseContext?.globalSkillsData || {};
  const summary = alldetails?.alldata?.summary || UseContext?.text || [];

  const linkedinUrl = contact?.linkedin || contact?.linkedIn;


  //   useEffect(() => {
  //   // 1️ If user selected new cropped image → show that
  //   if (croppedImage) {
  //     if (typeof croppedImage === "string" && croppedImage.startsWith("blob:")) {
  //       setPreviewUrl(croppedImage);
  //       return;
  //     }

  //     if (croppedImage instanceof Blob || croppedImage instanceof File) {
  //       const url = URL.createObjectURL(croppedImage);
  //       setPreviewUrl(url);

  //       return () => URL.revokeObjectURL(url);
  //     }
  //   }


  //   if (contact.photo) {
  //     const backendURL = `${API_URL}/api/uploads/photos/${contact.photo || croppedImage}`;
  //     setPreviewUrl(backendURL);
  //   }
  // }, [croppedImage, contact.photo]);

  useEffect(() => {
    let url;

    if (croppedImage) {
      // Case 1: croppedImage is a blob URL (local preview)
      if (typeof croppedImage === "string" && croppedImage.startsWith("blob:")) {
        url = croppedImage;
      }
      // Case 2: croppedImage is a backend filename (string but not blob)
      else if (typeof croppedImage === "string") {
        url = `${API_URL}/api/uploads/photos/${croppedImage}`;
      }
      // Case 3: croppedImage is a File/Blob object
      else if (croppedImage instanceof Blob || croppedImage instanceof File) {
        url = URL.createObjectURL(croppedImage);
        return () => URL.revokeObjectURL(url); // cleanup
      }

      setPreviewUrl(url);
      return; // stop here if croppedImage exists
    }

    // If no croppedImage, fallback to contact.photo
    if (contact.photo) {
      setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
    }
  }, [croppedImage, contact.photo]);




  return (
    <div className=" bg-white border border-gray-100 font-nunito mx-auto" style={{
      width: "210mm",
      // height: "297mm",
      padding: "5mm",
      boxSizing: "border-box",
    }}>
      {/* header */}
      <div className='flex bg-[#EADCCE] py-2 rounded-tl-3xl rounded-tr-3xl border-b border-gray-300 mx-auto'>
        <div className="flex justify-center items-center w-[22%] p-2 ">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Cropped preview"
              className=" rounded-md object-cover border"
            />
          ) : (
            <p><IoPersonOutline className=" w-32 h-32 rounded-md object-cover border" /></p>
          )}
        </div>
        <div className="w-[68%] pl-10">
          <p className='text-3xl tracking-wide text-gray-800 leading-tight capitalize'> {contact?.firstName || ""}
            <span className='mx-2 capitalize'>{contact?.
              lastName
              || ""}</span>  </p>
          {/* <p className='text-xs font-serif py-1 text-[11px] font-semibold  mb-1'>{contact?.jobTitle?.name || "Senior Analyst"} */}
          {/* </p> */}
          <p className='text-xs py-1 text-[12px] leading-snug '>{contact?.address
            || ""}   , {contact?.city
              || ""}   , {contact?.country || ""}  ,{contact?.postcode || ""}</p>
          <p className='text-xs font-serif '>{contact?.email || ""}</p>
          <p className='text-xs py-2'>{contact?.phone || ""}</p>
          <div className="flex items-center p-0 gap-4 mt-1">
            {/* Show LinkedIn only if provided */}
            {linkedinUrl && (
              <a
                href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-black text-sm "
              >
                <p className="text-[13px] font-bold underline">LinkedIn</p>

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
                className="flex items-center gap-2 text-black text-sm"
              >

                <p className="text-[13px] font-bold underline">Portfolio</p>
              </a>
            )}
          </div>
        </div>
      </div>
      {/* body*/}
      <div className='flex gap-3 mx-auto '>
        {/* left side */}
        <div className="pt-2 pl-5 w-[40%]">
          {/* summary */}
          <div className='mb-2'>
            <p className="text-[15px] font-semibold underline underline-offset-4 decoration-2 decoration-gray-800 mb-2 tracking-wide">SUMMARY </p>
            <p className="pt-2 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4">
              <div className='break-words' dangerouslySetInnerHTML={{ __html: summary || "" }} />
            </p>
          </div>

          {/* skills */}

          <div className='w-full max-w-md mx-auto rounded-2xl '>
            <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">skills</p>
            <p className="list-disc list-inside marker:mr-0 marker:text-gray-800 text-[12.5px] text-gray-700 leading-5 space-y-1 ">

              {skills.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {skills.map((skill) => (
                    <div key={skill._id || skill.id}>
                      <p className="text-sm text-gray-800 mb-1">
                        {skill.skill || ""}
                      </p>
                      {skill.level && (
                        <div className="h-[4px] w-full bg-gray-300 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0c0c1e]"
                            style={{
                              width: `${(Number(skill.level) / 4) * 100}%`,
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
            </p>
          </div>




          {/*  Languages */}
          {Array.isArray(finalize?.languages) &&
            finalize.languages.some(
              (lang) => lang.name && lang.name.trim() !== ""
            ) && (
              <div className="mt-2">
                <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Languages</p>
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
                                style={{ width: `${(Number(lang.level) / 4) * 100}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

          {/*  Certifications and Licenses */}
          {Array.isArray(finalize?.certificationsAndLicenses) &&
            finalize.certificationsAndLicenses.some(
              (item) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
            ) && (
              <div className="mt-2">
                <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
                  Certifications and Licenses
                </p>
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
                        <div
                          key={item._id || index}
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      )
                  )}
                </div>
              </div>
            )}

          {/*  Hobbies and Interests */}
          {Array.isArray(finalize?.hobbiesAndInterests) &&
            finalize.hobbiesAndInterests.some(
              (item) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
            ) && (
              <div className="mt-2">
                <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Hobbies and Interests</p>
                <div className="pt-1 pb-2 text-gray-500 text-[15px] break-words">
                  {finalize.hobbiesAndInterests.map(
                    (item, index) =>
                      item.name &&
                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                        <div
                          key={item._id || index}
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      )
                  )}
                </div>
              </div>
            )}

          {/*  Awards and Honors */}
          {Array.isArray(finalize?.awardsAndHonors) &&
            finalize.awardsAndHonors.some(
              (item) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
            ) && (
              <div className="mt-2">
                <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">Awards and Honors</p>
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
                          key={item._id || index}
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      )
                  )}
                </div>
              </div>
            )}

          {/*  References */}
          {Array.isArray(finalize?.references) &&
            finalize.references.some(
              (item) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
            ) && (
              <div className="mt-2 ">
                <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">References</p>
                <div className="pt-1 pb-2 text-gray-500 text-[15px] break-words">
                  {finalize.references.map(
                    (item, index) =>
                      item.name &&
                      item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                        <div
                          key={item._id || index}
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      )
                  )}
                </div>
              </div>
            )}








        </div>

        <div className='w-1 border-l border-gray-300 mx-1'></div>
        {/* right */}
        <div className='w-[60%]' >
          <div className="w-full pt-2 pr-5">
            {/* experience */}
            <div>
              {experiences?.length > 0 ? (
                experiences.map((exp, index) => (
                  <div key={exp._id || exp.id || index} className="">
                    <div className="text-[15px] font-semibold underline underline-offset-4 decoration-gray-800 decoration-2 mb-2">
                      EXPERIENCE
                    </div>
                    <div className="flex justify-between items-center mt-1 mb-2">
                      {(exp.jobTitle) && (<i className="text-[11.5px] font-semibold">{exp.jobTitle || ""}</i>)}
                      <div className="flex justify-center items-center text-[11.5px] font-semibold gap-1">
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
                    </div>

                    <div>
                      {(exp.location || exp.employer) && (<p className="text-[12px] text-gray-700 mb-2">
                        {exp.location || ""} - {exp.employer || ""}
                      </p>)}

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
                <p className="text-gray-500">No experience added yet.</p>
              )}
            </div>




            {/* education */}

            <p className="text-[15px] font-semibold underline underline-offset-4 mb-3 mt-4 decoration-2 decoration-gray-800">EDUCATION</p>
            {educations?.length > 0 ? (
              educations.map((edu, index) => (
                <div key={edu._id || edu.id || index} className="">
                  <div className="flex justify-between items-center mt-1 mb-2">
                    <i className="text-[11.5px] font-semibold">{edu.schoolname || ""}</i>
                    <div className="flex justify-center items-center text-[11.5px] font-semibold gap-1">
                      {(edu.startDate || edu.endDate) && (
                        <>
                          <i>{edu.startDate || ""}</i>
                          <hr className="w-3 border-l border-black" />
                          <i>{edu.endDate || ""}</i>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    {(edu.location || edu.degree) && (<p className="text-[12px] text-gray-700 mb-2">
                      {edu.location || ""} - {edu.degree || ""}

                    </p>)}

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
                </div>
              ))
            ) : (
              <p className="text-gray-500">No education added yet.</p>
            )}
          </div>
          {/*  Websites and Social Media */}
          {Array.isArray(finalize?.websitesAndSocialMedia) &&
            finalize.websitesAndSocialMedia.some(
              (item) =>
                (item.websiteUrl && item.websiteUrl.trim() !== "") ||
                (item.socialMedia && item.socialMedia.trim() !== "")
            ) && (
              <div className="mt-2 ">
                <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 mb-2">
                  Websites and Social Media
                </p>
                <div className="pt-1 pb-2 text-[15px] break-words">
                  {finalize.websitesAndSocialMedia.map(
                    (item, index) =>
                      ((item.websiteUrl && item.websiteUrl.trim() !== "") ||
                        (item.socialMedia && item.socialMedia.trim() !== "")) && (
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
                    (section) => section?.name?.trim() || section?.description?.trim()
                  )
                  .map((section, index) => (
                    <div key={section.id || index} className="mt-2 ">
                      {/* Show only content, no heading */}
                      {section.name && (
                        <p className="text-[15px] font-semibold uppercase underline underline-offset-4 decoration-2 decoration-gray-800 ">
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
                          dangerouslySetInnerHTML={{ __html: section.description }}
                        />
                      )}
                    </div>
                  ))}
              </div>
            )}

        </div>
      </div>
    </div>
  )
}

export default Resume2