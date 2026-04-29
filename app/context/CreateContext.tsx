"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";
import {
  CreateContextType,
  Experience,
  Education,
  // Skill,
  PlanDetails,
  Contact,
  Finalize,
  Template,
  FullResumeData,
  Project,
  Skill,
  // SkillsType,
} from "@/app/types";
import {
  getLocalStorage,
  setLocalStorage,
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
  removeLocalStorage,
} from "../utils";

export const CreateContext = createContext<CreateContextType>(
  {} as CreateContextType,
);

interface CreateProviderProps {
  children: ReactNode;
}

export const CreateProvider: React.FC<CreateProviderProps> = ({ children }) => {
  
  // Upload mode state - using sessionStorage to persist across page refreshes within the same tab
  const [isUploadMode, setIsUploadMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return getSessionStorage<boolean>("resume_upload_mode") || false;
  });

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
    setLocalStorage("fullResumeData", fullResumeData);
  }, [fullResumeData]);

  // Save upload mode to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isUploadMode) {
      setSessionStorage("resume_upload_mode", true);
    } else {
      removeSessionStorage("resume_upload_mode");
    }
  }, [isUploadMode]);

  // In your CreateProvider
  const clearUploadMode = () => {
    console.log("🔓 Clearing upload mode and resetting all resume data");

    // Reset all context data to initial values
    setContact({
      contactId: "",
      firstName: "",
      lastName: "",
      jobTitle: "",
      phone: "",
      email: "",
      linkedIn: "",
      portfolio: "",
      address: "",
      city: "",
      country: "",
      postCode: "",
      croppedImage: null,
    });

    setExperiences([
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

    setEducation([
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

    // setSkills([{ skill: "", id: Date.now() + Math.random() }]);
    
    setSkills({})

    setSummary(""); // Clear summary here

    setFinalize({});

    setFullResumeData(null);

    setIsUploadMode(false);
    removeSessionStorage("resume_upload_mode");

    // Also clear from localStorage
    removeLocalStorage("fullResumeData");
  };

  const [chosenTemplate, setChosenTemplate] = useState<Template | null>(null);

  const [contact, setContact] = useState<Contact>({
    contactId: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    dob: "",
    phone: "",
    email: "",
    linkedIn: "",
    portfolio: "",
    github: "",
    address: "",
    city: "",
    country: "",
    postCode: "",
    croppedImage: null,
    photo: null,
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

  const [projects, setProjects] = useState<Project[]>([
    {
      id: Date.now(),
      title: "",
      techStack: [],
      description: "",
      liveUrl: "",
      githubUrl: "",
      isOpen: true,
    },
  ]);

  // Skills
  const [skills, setSkills] = useState<Skill>({
    text: "",
  });


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

  const [resumeId, setResumeId] = useState<string>("");

  return (
    <CreateContext.Provider
      value={{
        fullResumeData,
        setFullResumeData,

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

        projects,
        setProjects,

        // Skills
        skills,
        setSkills,

        summary,
        setSummary,

        finalize,
        setFinalize,

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

        // Upload mode
        isUploadMode,
        setIsUploadMode,
        clearUploadMode,

        resumeId,
        setResumeId,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};
