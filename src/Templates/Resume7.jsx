import React from "react";
import { FaEnvelopeSquare } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { CgPhone } from "react-icons/cg";
import SimpleCanvasPreview from "../Componets/SimpleCanvasPreview";

const Resume7 = () => {
  const summary = [
    "Human resources generalist with 8 years of experience in HR, including hiring and terminating , disciplining employees, and helping department managers improve employee performance. Worked with labor unions to negotiate comprensation packages for workers. Organized new hire training initiatives as well as ongoing training to adhere to workplace safety standards. Worked with OSHA  to ensure that all safety regulations are followed.",
  ];
  const experience1 = [
    "Implemented effective company policies to ensure that all practices comply with labor and employment regulations.",
    "Increased employee retention rates by manging workplace satisfaction to an over 90% success rate by creating and maintaining a positive work environment.",
  ];
  const experience2 = [
    "Ensured HR policies alignes with state and federal regulations, maintaining 100% compliance in audits.",
    "Implen=mented a conflict resolution system, decreaing workplace disputes by 40%.",
    "Orgganized leadership training sessions to enhance mangerial effectiveness and team collaboration.",
  ];
  const education = ["The University of Texas, Dallas"];

  return (
    // <div
    //   className=" bg-white border-8 border-green-700  mt-4 mx-auto rounded-3xl"
    //   style={{
    //     width: "210mm",
    //     // height: "297mm",
    //     padding: "5mm",
    //     boxSizing: "border-box",
    //   }}
    // >
        <SimpleCanvasPreview>

      {/* header */}
      <div className="relative ">
        {/* Yellow */}
        <div className="absolute inset-0  rounded-l-2xl rounded-t-full rounded-r-2xl w-28 h-24 transform -rotate-180  left-4 right-28 bottom-7"></div>

        {/*Content */}
        <div className="relative px-6 py-4 ml-3 text-[23px]">
          <h2 className="font-bold text-gray-900">Jessie</h2>
          <h2 className="font-bold text-gray-900 -mt-1">Smith</h2>
        </div>
        <p className="font-bold -top-5 relative ml-9 mr-6">
          Human Resources Manager
        </p>
      </div>
      {/* body section */}
      <div className="flex gap-3 ">
        {/* left */}
        <div className="w-[70%]">
          {/* summary */}
          <div>
            <p className="text-emerald-600 font-bold text-[17px] mb-2">
              Summary
            </p>
            <p className="text-[15px] mb-2">
              {summary.map((summary, index) => (
                <p>{summary}</p>
              ))}
            </p>
          </div>
          {/* experience */}
          <div>
            <p className="text-emerald-600 font-bold text-[17px] mb-2">
              Experience
            </p>
            <div className="flex items-center gap-3 text-[15px] font-bold">
              <div className="flex gap-1 items-center">
                <p>Apr 2019</p>
                <hr className="w-3" />
                <p>Current</p>
              </div>
              <p>Human Resource Manager</p>
            </div>
            <p className="font-bold text-[15px] text-center mt-2 mb-2">
              Jim's Widget Factory, plano, TX
            </p>
            <p className="list-disc list-inside ml-36 space-y-1">
              {experience1.map((experience1, index) => (
                <li>{experience1}</li>
              ))}
            </p>

            <div className="flex items-center gap-3 text-[15px] font-bold mt-2">
              <div className="flex gap-1 items-center">
                <p>Sep 2019</p>
                <hr className="w-3" />
                <p>Mar 2016</p>
              </div>
              <p>Workplace Culture & Compliance Specialist </p>
            </div>
            <p className="font-bold text-[15px] text-center -ml-5 mt-2 mb-2">
              Acme Corp, Dallas, TX
            </p>
            <p className="list-disc list-inside ml-36 space-y-1">
              {experience2.map((experience2, index) => (
                <li>{experience2}</li>
              ))}
            </p>
          </div>
          {/* education */}
          <div>
            <p className="text-emerald-600 font-bold text-[17px] mb-2">
              Education
            </p>
            <div className="flex items-center text-[15px] font-bold mt-2">
              <div className="flex gap-1 items-center">
                <p>2007</p>
                <hr className="w-3" />
                <p>2011</p>
              </div>
              <p>Master, Human Resources</p>
            </div>
            <p>
              {education.map((education, index) => (
                <p className="font-bold text-[15px] text-center mt-2 mb-2">
                  {education}
                </p>
              ))}
            </p>
          </div>
        </div>
        {/* middle */}
        <div className="border-black border  border-dashed "></div>
        {/* right */}
        <div className="w-[30%]">
          {/* details */}
          <div>
            <p className="text-emerald-600 font-bold text-[17px] mb-2">
              Details
            </p>

            <div className="flex mt-1 mb-1 gap-1 items-center">
              <FaEnvelopeSquare className="w-5 h-5" />
              <p className="text-[15px]">email@youremail.com</p>
            </div>
            <div className="flex mb-1 gap-1 items-center">
              <FaLocationDot className="w-8 h-8" />
              <p className="text-[15px]">
                New York, USA, 4759 Sunnydale Lane, Plano, TX 75071, United
                States
              </p>
            </div>
            <div className="flex mb-22 gap-1 items-center">
              <CgPhone className="w-5 h-5" />
              <p className="text-[15px]">(469) 385-2948</p>
            </div>
          </div>
          {/* skills */}
          <div>
            <p className="text-emerald-600 font-bold text-[17px] mb-2">
              Skills
            </p>
            <p className="bg-emerald-800 mb-1 rounded-full p-3 text-white">
              Detail-oriented
            </p>
            <p className="bg-emerald-800 mb-1 rounded-full p-3 text-white">
              Platform expertise
            </p>
            <p className="bg-emerald-800 mb-1 rounded-full p-3 text-white">
              Analytics
            </p>
            <p className="bg-emerald-800 mb-1 rounded-full p-3 text-white">
              Communication
            </p>
          </div>
        </div>
      </div>
        </SimpleCanvasPreview>

    // </div>
  );
};

export default Resume7;
