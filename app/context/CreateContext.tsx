"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";
import {
  CreateContextType,
  Experience,
  Education,
  Skill,
  PlanDetails,
  Contact,
  Finalize,
  Template,
  FullResumeData,
} from "@/app/types";
import { getLocalStorage, setLocalStorage } from "../utils";

export const CreateContext = createContext<CreateContextType>(
  {} as CreateContextType,
);

interface CreateProviderProps {
  children: ReactNode;
}

export const CreateProvider: React.FC<CreateProviderProps> = ({ children }) => {
 
  // load from localStorage
  const [fullResumeData, setFullResumeData] = useState<FullResumeData | null>(
    () => {
      if (typeof window === "undefined") return null;
      return getLocalStorage("fullResumeData");
    },
  );

  // save to localStorage
  useEffect(() => {
    if (!fullResumeData) return;
    // localStorage.setItem("fullResumeData", JSON.stringify(fullResumeData));

    setLocalStorage("fullResumeData", fullResumeData);
  }, [fullResumeData]);

  const [chosenTemplate, setChosenTemplate] = useState<Template | null>(null);

  const [contact, setContact] = useState<Contact>({
    contactId: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    phone: "",
    email: "",
    linkedin: "",
    portfolio: "",
    address: "",
    city: "",
    country: "",
    postcode: "",
    croppedImage: null,
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: Date.now(),
      jobTitle: "",
      employer: "",
      location: "",
      text: "",
      startDate: "",
      endDate: "",
      isOpen: true,
      showPicker: false,
      year: new Date().getFullYear(),
    },
  ]);

  // Education
  const [education, setEducation] = useState<Education[]>([
    {
      id: Date.now(),
      schoolname: "",
      degree: "",
      location: "",
      text: "",
      startDate: "",
      endDate: "",
      isOpen: true,
      showPicker: false,
      year: new Date().getFullYear(),
    },
  ]);

  // Skills
  const [skills, setSkills] = useState<Skill[]>([
    { skill: "", level: 2, id: Date.now() + Math.random() },
  ]);

  const [summary, setSummary] = useState<string>("");

  const [finalize, setFinalize] = useState<Finalize>({});

  // Plans & User
  const [allplandetails, setAllplandetails] = useState<PlanDetails[]>([]);
  const [allPlanStatusDetails, setAllPlanStatusDetails] = useState<string>("");
  const [accessdate, setAccessdate] = useState<string>("");

  // Currency
  const [currencysymbol, setCurrencySymbol] = useState<string>("$");

  // User deletion
  const [userdelete, setuserdelete] = useState<boolean>(false);

  // Logo
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  return (
    <CreateContext.Provider
      value={{
        fullResumeData,
        setFullResumeData,

        // templateId,
        // setTemplateId,
        chosenTemplate,
        setChosenTemplate,

        contact,
        setContact,

        // Experiences
        experiences,
        setExperiences,

        // Education
        education,
        setEducation,

        // Skills
        skills,
        setSkills,
        summary,
        setSummary,
        finalize,
        setFinalize,
        // globalSkillsData,
        // setGlobalSkillsData,

        // Plans & User
        allplandetails,
        setAllplandetails,
        allPlanStatusDetails,
        // setAllPlanStatusDetails,

        accessdate,
        setAccessdate,

        // Currency
        currencysymbol,
        setCurrencySymbol,

        // User deletion
        userdelete,
        setuserdelete,

        // Logo
        logoPreview,
        setLogoPreview,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};
