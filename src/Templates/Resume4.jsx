import React, { useContext } from "react";
import { CreateContext } from "../App";
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
  const summary = alldetails?.alldata?.summary || UseContext?.text || "";
  const isFreePlan =
    Allplans === undefined ||
    Allplans === null ||
    Allplans === "FREE" ||
    (Array.isArray(Allplans) && Allplans.length === 0);

  const linkedinUrl = contact?.linkedin || contact?.linkedIn;

  return (
    <div 
      className="resume-container"
      // style={{
      //   width: "210mm",
      //   minHeight: "297mm",
      //   // maxHeight: "297mm", // Prevent overflow to second page
      //   padding: "15mm",
      //   backgroundColor: "#ffffff",
      //   position: "relative",
      //   margin: "0 auto",
      //   boxSizing: "border-box",
      //   overflow: "hidden", // Prevent content from overflowing
      //   fontFamily: "'Nunito', 'Segoe UI', Arial, sans-serif",
      //   fontSize: "12px",
      //   lineHeight: "1.4",
      // }}

       style={{
            width: "210mm",
            minHeight: "297mm",
            background: "#fff",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            overflow: "visible",
            position: "relative",
            margin: "20px auto",
            padding: "20px",
            boxSizing: "border-box",
            WebkitPrintColorAdjust: "exact",
            printColorAdjust: "exact"
          }}

      //     style={{
      //   width: "210mm",
      //   minHeight: "auto", // Changed from fixed height
      //   height: "auto", // Let content determine height
      //   padding: "15mm",
      //   backgroundColor: "#ffffff",
      //   position: "relative",
      //   margin: "0 auto",
      //   boxSizing: "border-box",
      //   overflow: "visible", // Changed to visible
      //   fontFamily: "'Nunito', 'Segoe UI', Arial, sans-serif",
      //   fontSize: "12px",
      //   lineHeight: "1.4",
      // }}
    
        
    >
      {/* Inline styles for PDF generation */}
      <style>
        {`
          .resume-container {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .resume-container * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          .section-title {
            background-color: #f0f0f0;
            padding: 4px 0;
            margin: 12px 0 8px 0;
            text-align: center;
            font-weight: 700;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            width: 100%;
          }
          
          .section-content {
            margin-bottom: 12px;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .contact-info {
            text-align: center;
            margin-bottom: 15px;
          }
          
          .name {
            font-size: 22px;
            font-weight: 800;
            text-transform: uppercase;
            margin-bottom: 2px;
            letter-spacing: 0.5px;
          }
          
          .job-title {
            font-size: 14px;
            font-weight: 700;
            color: #333;
            margin-bottom: 4px;
          }
          
          .address {
            font-size: 11px;
            color: #555;
            margin-bottom: 4px;
          }
          
          .contact-details {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 6px 0;
            font-size: 11px;
            font-weight: 600;
            color: #333;
          }
          
          .links {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 10px;
          }
          
          .link-item {
            font-size: 11px;
            font-weight: 600;
            color: #333;
            text-decoration: none;
          }
          
          .experience-item, .education-item {
            margin-bottom: 10px;
          }
          
          .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 3px;
          }
          
          .item-title {
            font-size: 13px;
            font-weight: 700;
            color: #222;
            flex: 1;
          }
          
          .item-subtitle {
            font-size: 12px;
            color: #555;
            font-weight: 500;
          }
          
          .item-date {
            font-size: 11px;
            color: #666;
            font-weight: 500;
            white-space: nowrap;
          }
          
          .item-content {
            font-size: 11px;
            color: #444;
            line-height: 1.5;
          }
          
          .skills-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-top: 8px;
          }
          
          .skill-item {
            margin-bottom: 6px;
          }
          
          .skill-name {
            font-size: 11px;
            color: #333;
            margin-bottom: 2px;
          }
          
          .skill-bar {
            height: 3px;
            background-color: #e0e0e0;
            border-radius: 1.5px;
            overflow: hidden;
          }
          
          .skill-level {
            height: 100%;
            background-color: #222;
          }
          
          /* Ensure proper spacing for all sections */
          .custom-section {
            margin-bottom: 12px;
          }
        `}
      </style>

      {/* Header Section */}
      <div className="contact-info">
        <div className="name">
          {contact?.firstName || ""} {contact?.lastName || ""}
        </div>
        <div className="job-title">
          {contact?.jobTitle?.name || ""}
        </div>
        <div className="address">
          {[
            contact?.address,
            contact?.city,
            contact?.country,
            contact?.postcode
          ].filter(Boolean).join(", ")}
        </div>
        <div className="contact-details">
          {contact?.email && (
            <span>{contact.email}</span>
          )}
          {contact?.phone && (
            <span>{contact.phone}</span>
          )}
        </div>
        <div className="links">
          {linkedinUrl && (
            <a 
              href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
              className="link-item"
            >
              LinkedIn
            </a>
          )}
          {contact?.portfolio && (
            <a 
              href={contact.portfolio.startsWith("http") ? contact.portfolio : `https://${contact.portfolio}`}
              className="link-item"
            >
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Summary Section */}
      {summary && (
        <div className="section-content">
          <div className="section-title">Summary</div>
          <div 
            className="item-content"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        </div>
      )}

      {/* Experience Section */}
      {experiences?.length > 0 && (
        <div className="section-content">
          <div className="section-title">Experience</div>
          {experiences.map((exp, index) => (
            <div key={exp._id || exp.id || index} className="experience-item">
              <div className="item-header">
                <div>
                  <div className="item-title">
                    {exp.jobTitle || ""}
                  </div>
                  {(exp.employer || exp.location) && (
                    <div className="item-subtitle">
                      {exp.employer && <span>{exp.employer}</span>}
                      {exp.location && (
                        <>
                          {exp.employer && " — "}
                          <span>{exp.location}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                {(exp.startDate || exp.endDate) && (
                  <div className="item-date">
                    {exp.startDate && (
                      <MonthYearDisplay value={exp.startDate} shortYear={true} />
                    )}
                    {exp.startDate && exp.endDate && " - "}
                    {exp.endDate ? (
                      <MonthYearDisplay value={exp.endDate} shortYear={true} />
                    ) : (
                      exp.startDate && "Present"
                    )}
                  </div>
                )}
              </div>
              {exp.text && (
                <div 
                  className="item-content"
                  dangerouslySetInnerHTML={{ __html: exp.text }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education Section */}
      {educations?.length > 0 && (
        <div className="section-content">
          <div className="section-title">Education</div>
          {educations.map((edu, index) => (
            <div key={edu._id || edu.id || index} className="education-item">
              <div className="item-header">
                <div>
                  <div className="item-title">
                    {edu.schoolname || ""}
                  </div>
                  {(edu.degree || edu.location) && (
                    <div className="item-subtitle">
                      {edu.degree && <span>{edu.degree}</span>}
                      {edu.location && (
                        <>
                          {edu.degree && " — "}
                          <span>{edu.location}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                {(edu.startDate || edu.endDate) && (
                  <div className="item-date">
                    {edu.startDate || ""}
                    {edu.startDate && edu.endDate && " - "}
                    {edu.endDate || ""}
                  </div>
                )}
              </div>
              {edu.text && (
                <div 
                  className="item-content"
                  dangerouslySetInnerHTML={{ __html: edu.text }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <div className="section-content">
          <div className="section-title">Skills</div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill._id || skill.id} className="skill-item">
                <div className="skill-name">{skill.skill || ""}</div>
                {skill.level && (
                  <div className="skill-bar">
                    <div 
                      className="skill-level"
                      style={{
                        width: `${(Number(skill.level) / 4) * 100}%`
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages Section */}
      {Array.isArray(finalize?.languages) &&
        finalize.languages.some(lang => lang.name && lang.name.trim() !== "") && (
          <div className="section-content">
            <div className="section-title">Languages</div>
            <div className="skills-grid">
              {finalize.languages.map((lang, index) => (
                lang.name && lang.name.trim() !== "" && (
                  <div key={lang._id || index} className="skill-item">
                    <div className="skill-name">{lang.name}</div>
                    {lang.level && (
                      <div className="skill-bar">
                        <div 
                          className="skill-level"
                          style={{
                            width: `${(Number(lang.level) / 4) * 100}%`
                          }}
                        />
                      </div>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        )}

      {/* Additional Sections with Consistent Styling */}
      {Array.isArray(finalize?.certificationsAndLicenses) &&
        finalize.certificationsAndLicenses.some(
          item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
        ) && (
          <div className="section-content">
            <div className="section-title">Certifications and Licenses</div>
            <div className="item-content">
              {finalize.certificationsAndLicenses.map((item, index) => (
                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                  <div key={item.id || index} dangerouslySetInnerHTML={{ __html: item.name }} />
                )
              ))}
            </div>
          </div>
        )}

      {Array.isArray(finalize?.hobbiesAndInterests) &&
        finalize.hobbiesAndInterests.some(
          item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
        ) && (
          <div className="section-content">
            <div className="section-title">Hobbies and Interests</div>
            <div className="item-content">
              {finalize.hobbiesAndInterests.map((item, index) => (
                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                  <div key={item.id || index} dangerouslySetInnerHTML={{ __html: item.name }} />
                )
              ))}
            </div>
          </div>
        )}

      {Array.isArray(finalize?.awardsAndHonors) &&
        finalize.awardsAndHonors.some(
          item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
        ) && (
          <div className="section-content">
            <div className="section-title">Awards and Honors</div>
            <div className="item-content">
              {finalize.awardsAndHonors.map((item, index) => (
                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                  <div key={item.id || index} dangerouslySetInnerHTML={{ __html: item.name }} />
                )
              ))}
            </div>
          </div>
        )}

      {Array.isArray(finalize?.websitesAndSocialMedia) &&
        finalize.websitesAndSocialMedia.some(
          item => (item.websiteUrl && item.websiteUrl.trim() !== "") ||
                  (item.socialMedia && item.socialMedia.trim() !== "")
        ) && (
          <div className="section-content">
            <div className="section-title">Websites and Social Media</div>
            <div className="item-content">
              {finalize.websitesAndSocialMedia.map((item, index) => (
                (item.websiteUrl || item.socialMedia) && (
                  <div key={item.id || index}>
                    {item.websiteUrl && (
                      <div>
                        <div>Website: {item.websiteUrl}</div>
                      </div>
                    )}
                    {item.socialMedia && (
                      <div>
                        <div>Social Media: {item.socialMedia}</div>
                      </div>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        )}

      {Array.isArray(finalize?.references) &&
        finalize.references.some(
          item => item.name && item.name.replace(/<[^>]*>/g, "").trim() !== ""
        ) && (
          <div className="section-content">
            <div className="section-title">References</div>
            <div className="item-content">
              {finalize.references.map((item, index) => (
                item.name && item.name.replace(/<[^>]*>/g, "").trim() !== "" && (
                  <div key={item.id || index} dangerouslySetInnerHTML={{ __html: item.name }} />
                )
              ))}
            </div>
          </div>
        )}

      {Array.isArray(finalize?.customSection) &&
        finalize.customSection.some(
          section => section?.name?.trim() || section?.description?.trim()
        ) && (
          <div className="section-content">
            {finalize.customSection
              .filter(section => section?.name?.trim() || section?.description?.trim())
              .map((section, index) => (
                <div key={section.id || index} className="custom-section">
                  {section.name && (
                    <div className="section-title">{section.name}</div>
                  )}
                  {section.description && (
                    <div 
                      className="item-content"
                      dangerouslySetInnerHTML={{ __html: section.description }}
                    />
                  )}
                </div>
              ))}
          </div>
        )}
    </div>
  );
};

export default Resume4;
