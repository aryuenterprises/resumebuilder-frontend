"use client";

import { useEffect, useContext, useRef } from "react";
import { usePathname } from "next/navigation";
import { CreateContext } from "@/app/context/CreateContext";
import { API_URL } from "@/app/config/api";
import { getLocalStorage, getSessionStorage } from "@/app/utils";
import { User } from "@/app/types/user.types";
import { Contact, EditingResumeData, Education, Experience, Finalize, Project, Skill, Template } from "@/app/types/context.types";
import api from "../utils/api";

interface ResumeDataFetcherProps {
  children: React.ReactNode;
}



export function ResumeDataFetcher({ children }: ResumeDataFetcherProps) {
  const pathname = usePathname();
  const {
    isUploadMode,
    clearUploadMode,
    setContact,
    setEducation,
    setExperiences,
    setSkills,
    setSummary,
    setFinalize,
    setFullResumeData,
    setResumeId,
    setProjects,
  } = useContext(CreateContext);



  const chosenTemplate = getLocalStorage<Template>("chosenTemplate");
  const editingResumeIdAndData = getLocalStorage<EditingResumeData>("editingResumeIdAndData");
  const isOldRouteNameDashboard = getSessionStorage("oldRouteNameDashboard");
  const userDetails = getLocalStorage<User>("user_details");
  const userId = userDetails?.id;
  
  const hasFetchedData = useRef(false);
  const hasLoadedDashboardData = useRef(false); // Add this guard
  const previousPathname = useRef(pathname);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Check if we're on a resume detail page
  const isResumeDetailPage = pathname?.includes("/resume-details/");

  // Clear upload mode when navigating AWAY from resume detail pages
  useEffect(() => {
    const wasOnResumePage = previousPathname.current?.includes("/resume-details/");
    const isNowOnResumePage = isResumeDetailPage;
    
    if (wasOnResumePage && !isNowOnResumePage) {
      console.log("🧹 Navigating away from resume page, clearing upload mode");
      clearUploadMode();
      hasFetchedData.current = false;
      hasLoadedDashboardData.current = false; // Reset dashboard flag
      
      // Cancel any ongoing requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    }
    previousPathname.current = pathname;
  }, [pathname, isResumeDetailPage, clearUploadMode]);

  // Handle editing from dashboard route - WITH GUARD
  useEffect(() => {
    // CRITICAL: Guard against multiple executions
    if (hasLoadedDashboardData.current) {
      return;
    }
    
    if (!isOldRouteNameDashboard || !editingResumeIdAndData?.resume_data) {
      return;
    }

    console.log("🔄 Loading dashboard editing data");
    const { resume_data } = editingResumeIdAndData;
    
    // Mark as loaded immediately to prevent re-runs
    hasLoadedDashboardData.current = true;
    
    // Update all context values
    if (resume_data.contact) setContact(resume_data.contact);
    if (resume_data.educations) setEducation(resume_data.educations);
    if (resume_data.experiences) setExperiences(resume_data.experiences);
    if (resume_data.projects) setProjects(resume_data.projects);
    if (resume_data.skills) setSkills(resume_data.skills);
    if (resume_data.summary) setSummary(resume_data.summary);
    if (resume_data.finalize) setFinalize(resume_data.finalize);

    setFullResumeData({
      template: chosenTemplate?.templateId || chosenTemplate?.id,
      contact: resume_data.contact || ({} as Contact),
      experiences: resume_data.experiences || [],
      education: resume_data.educations || [],
      skills: resume_data.skills || ({} as Skill),
      summary: resume_data.summary || "",
      finalize: resume_data.finalize || {},
      projects: resume_data.projects || [],
    });

    hasFetchedData.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOldRouteNameDashboard, editingResumeIdAndData]); // Remove chosenTemplate from deps

  // Fetch existing resume data
  useEffect(() => {
    // Skip if not on resume detail page
    if (!isResumeDetailPage) {
      return;
    }

    // Skip if upload mode is active
    if (isUploadMode) {
      console.log("📝 Upload mode active - skipping existing data fetch");
      return;
    }

    // Skip if already fetched or no user ID
    if (hasFetchedData.current || !userId) {
      if (!userId) console.log("⚠️ No user ID found, skipping data fetch");
      return;
    }

    const fetchResumeData = async () => {
      // Create abort controller for this request
      abortControllerRef.current = new AbortController();
      
      try {
        hasFetchedData.current = true;
        setResumeId("");
        
        console.log("🔄 Fetching existing resume data...");
        
        console.log("aa");   

        const response = await api.get(`${API_URL}/user-resumes`);
        
                console.log("bb");   
                console.log("response",response)

        const resumeData = response.data?.[0]?.resume_data;


        
        if (!resumeData) {
          console.log("ℹ️ No existing resume data found");
          return;
        }
        
        console.log("✅ Resume data fetched successfully", resumeData);
        
        // Update all contexts with existing data
        setContact(resumeData?.contact || "" );
        setEducation(resumeData?.educations || []);
        setExperiences(resumeData?.experiences || []);
        setProjects(resumeData?.projects || []);
        setSkills(resumeData?.skills || "");
        setSummary(resumeData?.summary || "");
        setFinalize(resumeData?.finalize || {});
        
        setFullResumeData({
          template: chosenTemplate?.templateId || chosenTemplate?.id,
          contact: resumeData?.contact || ({} as Contact),
          experiences: resumeData?.experiences || [],
          education: resumeData?.educations || [],
          skills: resumeData?.skills || ({} as Skill),
          summary: resumeData?.summary || "",
          finalize: resumeData?.finalize || {},
          projects: resumeData?.projects || [],
        });
        
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.log("Fetch aborted");
        } else {
          console.error("❌ Error fetching resume data:", error);
          hasFetchedData.current = false;
        }
      } finally {
        abortControllerRef.current = null;
      }
    };
    
    fetchResumeData();
    
    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResumeDetailPage, isUploadMode, userId]);

  return <>{children}</>;
}