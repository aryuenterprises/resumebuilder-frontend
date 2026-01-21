import React, { useContext, useState, useEffect } from "react";
import { CreateContext } from "../App";
import { IoPersonOutline } from "react-icons/io5";
import { API_URL } from "../Config";
import MonthYearDisplay from "../Componets/MonthYearDisplay";

const Resume1 = (alldetails) => {
  // console.log("alll check", alldetails)

  const UseContext = useContext(CreateContext)

  console.log("UseContextdd", UseContext)

  const { croppedImage } = UseContext;
  console.log("croppedImage", croppedImage)

  const [previewUrl, setPreviewUrl] = useState(null);

  // console.log("preview",previewUrl)

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
  //   else{
  //     const url = `${API_URL}/api/uploads/photos/${croppedImage}`
  //     setPreviewUrl(url);
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
  //     const backendURL = `${API_URL}/api/uploads/photos/${contact.photo}`;
  //     setPreviewUrl(backendURL);
  //   }
  // }, [croppedImage, contact.photo]);


  useEffect(() => {
    let url;

    if (croppedImage) {

      if (typeof croppedImage === "string" && croppedImage.startsWith("blob:")) {
        url = croppedImage;
      }

      else if (typeof croppedImage === "string") {
        url = `${API_URL}/api/uploads/photos/${croppedImage}`;
      }

      else if (croppedImage instanceof Blob || croppedImage instanceof File) {
        url = URL.createObjectURL(croppedImage);
        return () => URL.revokeObjectURL(url);
      }

      setPreviewUrl(url);
      return;
    }

    // If no croppedImage, fallback to contact.photo
    if (contact.photo) {
      setPreviewUrl(`${API_URL}/api/uploads/photos/${contact.photo}`);
    }
  }, [croppedImage, contact.photo]);


  return (


    <div className=" bg-white border border-gray-100 font-nunito" style={{
      width: "210mm",
      // height: "297mm",
      padding: "5mm",
      boxSizing: "border-box",
    }}>
      {/* HEADER */}
      <div className="bg-yellow-400 p-2 rounded-md  px-10">
        <div className="flex  items-center justify-between">
          <div className="flex gap-3 items-center">

            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Cropped preview"
                className="w-24 h-24 rounded-md object-cover border"
              />
            ) : (
              <p><IoPersonOutline className="w-24 h-24 rounded-md object-cover border" /></p>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 uppercase">
                {contact?.firstName || ""} {contact?.lastName || ""} </h1>

            </div>
          </div>

          <section className="mt-6 px-10">
            <h2 className="text-lg font-semibold text-white border-b pb-1 mb-2 bg-black w-fit p-2 rounded-md">
              DETAILS
            </h2>
            <p className="text-gray-700 text-sm">
              {contact?.address
                || ""}   , {contact?.city
                  || ""}   , {contact?.country || ""}  ,{contact?.postcode || ""}
            </p>
            <p className="text-gray-700 text-sm">{contact?.phone

              || ""}</p>
            <p className="text-gray-700 text-sm">{contact?.email
              || ""}</p>
          </section>
        </div>

        <div className="flex items-center gap-4 ">
          {/* Show LinkedIn only if provided */}
          {linkedinUrl && (
            <a
              href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm transition-all duration-300 shadow"
            >
              <i className="fab fa-linkedin text-lg"></i>
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



      {/* SUMMARY */}
      <section className="mt-3 px-10">
        <h2 className="text-lg font-semibold mb-1 text-white bg-black w-fit p-2 rounded-md">
          SUMMARY
        </h2>
        <p className="pt-2 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4">
          <div dangerouslySetInnerHTML={{ __html: summary || "" }} />

        </p>
      </section>

      {/* EXPERIENCE */}
      <section className="mt-2 px-10">

        <div>
          {experiences?.length > 0 ? (
            experiences.map((exp, index) => (
              <div key={exp._id || exp.id || index} className="">
                <h2 className="text-lg font-semibold text-white  mb-1 bg-black w-fit p-2 rounded-md">
                  EXPERIENCE
                </h2>
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

                <ul className="pt-2 pb-3 text-gray-700 text-[15px] break-words
    [&_ol]:list-decimal 
    [&_ul]:list-disc 
    [&_li[data-list='bullet']]:list-disc 
    [&_li[data-list='ordered']]:list-decimal 
    [&_li]:ml-4">
                  <li dangerouslySetInnerHTML={{ __html: exp.text || "" }} />
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-500 ">No experience added yet.</p>
          )}
        </div>
      </section>

      {/* EDUCATION */}
      <section className="mt-3 px-10">
        <h2 className="text-lg font-semibold text-white mb-2 bg-black w-fit p-2 rounded-md">
          EDUCATION
        </h2>
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

                {(edu.startDate || edu.endDate) && (

                      <p className="text-gray-600 text-sm break-words  mt-1">
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
            <p className="text-gray-500">No education added yet.</p>
          )}
        </div>
      </section>

      {/* SKILLS */}
      <section className="mt-3  px-10">
        <h2 className="text-lg font-semibold text-white mb-2 bg-black w-fit p-2 rounded-md">
          SKILLS
        </h2>
        <div>
        {skills.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {skills.map((skill) => (
              <div key={skill._id || skill.id}>
                <p className="text-sm text-gray-800 break-words mb-1">
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
      </section>

      {/* Languages */}
      {Array.isArray(finalize?.languages) &&
        finalize.languages.some(
          (lang) => lang?.name && lang.name.trim() !== ""
        ) && (
          <div className="mt-3 px-10">
            <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
              Languages
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {finalize.languages.map(
                (lang, index) =>
                  lang.name && lang.name.trim() !== "" && (
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
          (item) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
            ) && (
          <div className="mt-3 px-10">
            <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
              Certifications and Licenses
            </h2>
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
          (item) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
            ) && (
          <div className="mt-3 px-10">
            <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
              Hobbies and Interests
            </h2>
            <div className="pt-1 pb-2 text-[15px] break-words">
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
      {Array.isArray(finalize?.awardsAndHonors) &&
        finalize.awardsAndHonors.some(
          (item) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
            ) && (
          <div className="mt-3 px-10">
            <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
              Awards and Honors
            </h2>
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

      {/* Websites and Social Media */}
      {Array.isArray(finalize?.websitesAndSocialMedia) &&
        finalize.websitesAndSocialMedia.some(
          (item) =>
            (item?.websiteUrl && item.websiteUrl.trim() !== "") ||
            (item?.socialMedia && item.socialMedia.trim() !== "")
        ) && (
          <div className="mt-3 px-10">
            <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
              Websites and Social Media
            </h2>
            <div className="pt-1 pb-2 text-[15px] break-words">
              {finalize.websitesAndSocialMedia.map(
                (item, index) =>
                  ((item?.websiteUrl && item.websiteUrl.trim() !== "") ||
                    (item?.socialMedia && item.socialMedia.trim() !== "")) && (
                    <div key={item.id || index} className="mb-2">
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
                            className="text-blue-600 underline break-words"
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
                            className="text-blue-600 underline break-words"
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
          (item) => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
            ) && (
          <div className="mt-2 px-10">
            <h2 className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
              References
            </h2>
            <div className="pt-1 pb-2 text-[15px] break-words">
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
                <div key={section.id || index} className="mt-2 px-10">
                  {/* Show only content, no heading */}
                  {section.name && (
                    <p className="text-lg font-semibold uppercase text-white mb-2 bg-black w-fit p-2 rounded-md">
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


  );
}

export default Resume1;
