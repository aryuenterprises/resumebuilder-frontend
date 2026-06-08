// // components/resume/ResumeDataFetcher.tsx
// "use client";

// import { useEffect, useContext, useRef } from "react";
// import { usePathname } from "next/navigation";
// import { CreateContext } from "@/app/context/CreateContext";
// import axios from "axios";
// import { API_URL } from "@/app/config/api";
// import {
//   getLocalStorage,
//   getSessionStorage,
// } from "@/app/utils";
// import { User } from "@/app/types/user.types";
// import { Template } from "@/app/types/context.types";

// interface ResumeDataFetcherProps {
//   children: React.ReactNode;
// }

// export function ResumeDataFetcher({ children }: ResumeDataFetcherProps) {
//   const pathname = usePathname();
//   const {
//     isUploadMode,
//     clearUploadMode,
//     setContact,
//     setEducation,
//     setExperiences,
//     setSkills,
//     setSummary,
//     setFinalize,
//     setFullResumeData,
//     setResumeId,
//     setProjects
//   } = useContext(CreateContext);

//   const chosenTemplate = getLocalStorage<Template>("chosenTemplate");

//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;
//   const hasFetchedData = useRef(false);
//   const previousPathname = useRef(pathname);

//   // Check if we're on a resume detail page
//   const isResumeDetailPage = pathname?.includes("/resume-details/");

//   // Clear upload mode when navigating AWAY from resume detail pages
//   useEffect(() => {
//     // If we were on a resume detail page and now we're not
//     if (
//       previousPathname.current?.includes("/resume-details/") &&
//       !isResumeDetailPage
//     ) {
//       console.log("🧹 Navigating away from resume page, clearing upload mode");
//       clearUploadMode();
//       hasFetchedData.current = false; // Reset fetch flag
//     }
//     previousPathname.current = pathname;
//   }, [pathname, isResumeDetailPage, clearUploadMode]);

//   // console.log(con)

//   useEffect(() => {
//     // Skip data fetching if:
//     // 1. Not on a resume detail page
//     // 2. In upload mode (user just uploaded a resume)
//     // 3. Already fetched data
//     // 4. No user ID

//     if (!isResumeDetailPage) {
//       return;
//     }

//     if (isUploadMode) {
//       console.log("📝 Upload mode active - skipping existing data fetch");
//       return;
//     }

//     if (hasFetchedData.current) {
//       return;
//     }

//     if (!userId) {
//       console.log("⚠️ No user ID found, skipping data fetch");
//       return;
//     }

//     // Fetch existing resume data
//     const fetchResumeData = async () => {
//       setResumeId(""); // Reset resume ID before fetching new data

//       try {
//         hasFetchedData.current = true;
//         console.log("🔄 Fetching existing resume data...");

//         // Fetch contact first
//         const contactResponse = await axios.get(
//           `${API_URL}/api/contact-resume/get-contact/${userId}`,
//           {
//             params: {
//               templateId: chosenTemplate?.templateId || chosenTemplate?.id || "",
//               resumeId: chosenTemplate?.contact?._id || "",
//             },
//           },
//         );

//         let isOldRouteNameDashboard = getSessionStorage("oldRouteNameDashboard");
//         if (isOldRouteNameDashboard) {
//           setResumeId(contactResponse?.data.resumeId);
//         }

//         const contactData = contactResponse?.data?._id ?? "";

//         if (contactData) {
//           // Fetch full resume data
//           const fullResponse = await axios.get(
//             `${API_URL}/api/experience/get-all-contacts/${contactData}`,
//           );

//           if (fullResponse.data?.data?.length > 0) {
//             const data = fullResponse.data.data[0];

//             // Update all contexts with existing data
//             if (data?.contact) {
//               setContact(data.contact);
//             }

//             if (data?.educations) {
//               setEducation(data.educations);
//             }

//             if (data?.experiences) {
//               setExperiences(data.experiences);
//             }

//                if (data?.projects) {
//               setProjects(data.projects);
//             }

//             if (data?.skills) {
//               setSkills(data.skills);
//             }

//             if (data?.summary?.[0]) {
//               setSummary(data.summary[0]);
//             }

//             if (data?.finalize?.[0]) {
//               setFinalize(data.finalize[0]);
//             }

//             setFullResumeData({
//               template: chosenTemplate?.templateId,
//               contact: data?.contact,
//               experiences: data?.experiences,
//               education: data?.educations,
//               skills: data?.skills,
//               summary: data?.summary?.[0] || "",
//               finalize: data?.finalize?.[0] || {},
//               projects:data.projects || []
//             });

//             console.log("✅ Existing resume data loaded successfully");
//           } else {
//             console.log("ℹ️ No existing resume data found");
//           }
//         } else {
//           console.log("ℹ️ No contact found for user");
//         }
//       } catch (error) {
//         console.error("❌ Error fetching resume data:", error);
//         hasFetchedData.current = false; // Reset on error to allow retry
//       }
//     };

//     fetchResumeData();
//   }, [isResumeDetailPage, isUploadMode, userId, chosenTemplate]);

//   return <>{children}</>;
// }







// "use client";

// import { useEffect, useContext, useRef } from "react";
// import { usePathname } from "next/navigation";
// import { CreateContext } from "@/app/context/CreateContext";
// import axios from "axios";
// import { API_URL } from "@/app/config/api";
// import { getLocalStorage, getSessionStorage } from "@/app/utils";
// import { User } from "@/app/types/user.types";
// import { Template } from "@/app/types/context.types";
// import api from "../utils/api";

// interface ResumeDataFetcherProps {
//   children: React.ReactNode;
// }

// export function ResumeDataFetcher({ children }: ResumeDataFetcherProps) {
//   const pathname = usePathname();
//   const {
//     isUploadMode,
//     clearUploadMode,
//     setContact,
//     setEducation,
//     setExperiences,
//     setSkills,
//     setSummary,
//     setFinalize,
//     setFullResumeData,
//     setResumeId,
//     setProjects,
//   } = useContext(CreateContext);

//   const chosenTemplate = getLocalStorage<Template>("chosenTemplate");
//     const editingResumeIdAndData = getLocalStorage("editingResumeIdAndData");

//   let isOldRouteNameDashboard = getSessionStorage("oldRouteNameDashboard");

//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;
//   const hasFetchedData = useRef(false);
//   const previousPathname = useRef(pathname);

//   // Check if we're on a resume detail page
//   const isResumeDetailPage = pathname?.includes("/resume-details/");

//   // Clear upload mode when navigating AWAY from resume detail pages
//   useEffect(() => {
//     // If we were on a resume detail page and now we're not
//     if (
//       previousPathname.current?.includes("/resume-details/") &&
//       !isResumeDetailPage
//     ) {
//       console.log("🧹 Navigating away from resume page, clearing upload mode");
//       clearUploadMode();
//       hasFetchedData.current = false; // Reset fetch flag
//     }
//     previousPathname.current = pathname;
//   }, [pathname, isResumeDetailPage, clearUploadMode]);

//   // console.log(con)

//   useEffect(() => {
//     // Skip data fetching if:
//     // 1. Not on a resume detail page
//     // 2. In upload mode (user just uploaded a resume)
//     // 3. Already fetched data
//     // 4. No user ID

//     if (isOldRouteNameDashboard) {
//       if (editingResumeIdAndData.resume_data.contact) {
//           setContact(editingResumeIdAndData.resume_data.contact);
//         }

//         if (editingResumeIdAndData.resume_data.educations) {
//           setEducation(editingResumeIdAndData.resume_data.educations);
//         }

//         if (editingResumeIdAndData.resume_data.experiences) {
//           setExperiences(editingResumeIdAndData.resume_data.experiences);
//         }

//         if (editingResumeIdAndData.resume_data.projects) {
//           setProjects(editingResumeIdAndData.resume_data.projects);
//         }

//         if (editingResumeIdAndData.resume_data.skills) {
//           setSkills(editingResumeIdAndData.resume_data.skills);
//         }

//         if (editingResumeIdAndData.resume_data.summary?.[0]) {
//           setSummary(editingResumeIdAndData.resume_data.summary[0]);
//         }

//         if (editingResumeIdAndData.resume_data.finalize?.[0]) {
//           setFinalize(editingResumeIdAndData.resume_data.finalize[0]);
//         }

//         setFullResumeData({
//           template: chosenTemplate?.templateId,
//           contact: editingResumeIdAndData.resume_data.contact,
//           experiences: editingResumeIdAndData.resume_data.experiences,
//           education: editingResumeIdAndData.resume_data.educations,
//           skills: editingResumeIdAndData.resume_data.skills,
//           summary: editingResumeIdAndData.resume_data.summary?.[0] || "",
//           finalize: editingResumeIdAndData.resume_data.finalize?.[0] || {},
//           projects: editingResumeIdAndData.resume_data.projects || [],
//         });

//         return;
//     }

//     if (!isResumeDetailPage) {
//       return;
//     }

//     if (isUploadMode) {
//       console.log("📝 Upload mode active - skipping existing data fetch");
//       return;
//     }

//     if (hasFetchedData.current) {
//       return;
//     }

//     if (!userId) {
//       console.log("⚠️ No user ID found, skipping data fetch");
//       return;
//     }

//     // Fetch existing resume data
//     const fetchResumeData = async () => {
//       setResumeId(""); // Reset resume ID before fetching new data

//       try {
//         hasFetchedData.current = true;
//         console.log("🔄 Fetching existing resume data...");

//         // Endpoint: POST /api/user-resumes

//         const contactResponse = await api.get(`${API_URL}/user-resumes`);
//         console.log("contactResponse", contactResponse.data[0].resume_data);

//         const data = contactResponse.data[0]?.resume_data;

//         // Update all contexts with existing data
//         if (data?.contact) {
//           setContact(data.contact);
//         }

//         if (data?.educations) {
//           setEducation(data.educations);
//         }

//         if (data?.experiences) {
//           setExperiences(data.experiences);
//         }

//         if (data?.projects) {
//           setProjects(data.projects);
//         }

//         if (data?.skills) {
//           setSkills(data.skills);
//         }

//         if (data?.summary?.[0]) {
//           setSummary(data.summary[0]);
//         }

//         if (data?.finalize?.[0]) {
//           setFinalize(data.finalize[0]);
//         }

//         setFullResumeData({
//           template: chosenTemplate?.templateId,
//           contact: data?.contact,
//           experiences: data?.experiences,
//           education: data?.educations,
//           skills: data?.skills,
//           summary: data?.summary?.[0] || "",
//           finalize: data?.finalize?.[0] || {},
//           projects: data.projects || [],
//         });

//         // Fetch contact first
//         // const contactResponse = await axios.get(
//         //   `${API_URL}/api/contact-resume/get-contact/${userId}`,
//         //   {
//         //     params: {
//         //       templateId: chosenTemplate?.templateId || chosenTemplate?.id || "",
//         //       resumeId: chosenTemplate?.contact?._id || "",
//         //     },
//         //   },
//         // );

//         // let isOldRouteNameDashboard = getSessionStorage("oldRouteNameDashboard");
//         // if (isOldRouteNameDashboard) {
//         //   setResumeId(contactResponse?.data.resumeId);
//         // }

//         // const contactData = contactResponse?.data?._id ?? "";

//         // if (contactData) {
//         //   // Fetch full resume data
//         //   const fullResponse = await axios.get(
//         //     `${API_URL}/api/experience/get-all-contacts/${contactData}`,
//         //   );

//         //   if (fullResponse.data?.data?.length > 0) {
//         //     const data = fullResponse.data.data[0];

//         //     // Update all contexts with existing data
//         //     if (data?.contact) {
//         //       setContact(data.contact);
//         //     }

//         //     if (data?.educations) {
//         //       setEducation(data.educations);
//         //     }

//         //     if (data?.experiences) {
//         //       setExperiences(data.experiences);
//         //     }

//         //        if (data?.projects) {
//         //       setProjects(data.projects);
//         //     }

//         //     if (data?.skills) {
//         //       setSkills(data.skills);
//         //     }

//         //     if (data?.summary?.[0]) {
//         //       setSummary(data.summary[0]);
//         //     }

//         //     if (data?.finalize?.[0]) {
//         //       setFinalize(data.finalize[0]);
//         //     }

//         //     setFullResumeData({
//         //       template: chosenTemplate?.templateId,
//         //       contact: data?.contact,
//         //       experiences: data?.experiences,
//         //       education: data?.educations,
//         //       skills: data?.skills,
//         //       summary: data?.summary?.[0] || "",
//         //       finalize: data?.finalize?.[0] || {},
//         //       projects:data.projects || []
//         //     });

//         //     console.log("✅ Existing resume data loaded successfully");
//         //   } else {
//         //     console.log("ℹ️ No existing resume data found");
//         //   }
//         // } else {
//         //   console.log("ℹ️ No contact found for user");
//         // }
//       } catch (error) {
//         console.error("❌ Error fetching resume data:", error);
//         hasFetchedData.current = false; // Reset on error to allow retry
//       }
//     };

//     fetchResumeData();
//   }, [isResumeDetailPage, isUploadMode, userId, chosenTemplate]);

//   return <>{children}</>;
// }
















// "use client";

// import { useEffect, useContext, useRef } from "react";
// import { usePathname } from "next/navigation";
// import { CreateContext } from "@/app/context/CreateContext";
// import { API_URL } from "@/app/config/api";
// import { getLocalStorage, getSessionStorage } from "@/app/utils";
// import { User } from "@/app/types/user.types";
// import { Contact, Education, Experience, Finalize, Project, Skill, Template } from "@/app/types/context.types";
// import api from "../utils/api";

// interface ResumeDataFetcherProps {
//   children: React.ReactNode;
// }

// interface EditingResumeData {
//   resume_data: {
//     contact?: Contact;
//     educations?: Education[];
//     experiences?: Experience[];
//     projects?: Project[];
//     skills?: Skill;
//     summary?: string;
//     finalize?: Finalize[];
//   };
// }

// export function ResumeDataFetcher({ children }: ResumeDataFetcherProps) {
//   const pathname = usePathname();
//   const {
//     isUploadMode,
//     clearUploadMode,
//     setContact,
//     setEducation,
//     setExperiences,
//     setSkills,
//     setSummary,
//     setFinalize,
//     setFullResumeData,
//     setResumeId,
//     setProjects,
//   } = useContext(CreateContext);

//   const chosenTemplate = getLocalStorage<Template>("chosenTemplate");
//   const editingResumeIdAndData = getLocalStorage<EditingResumeData>("editingResumeIdAndData");
//   const isOldRouteNameDashboard = getSessionStorage("oldRouteNameDashboard");
//   const userDetails = getLocalStorage<User>("user_details");
//   const userId = userDetails?.id;
  
//   const hasFetchedData = useRef(false);
//   const previousPathname = useRef(pathname);
//   const abortControllerRef = useRef<AbortController | null>(null);

//   // Check if we're on a resume detail page
//   const isResumeDetailPage = pathname?.includes("/resume-details/");

//   // Clear upload mode when navigating AWAY from resume detail pages
//   useEffect(() => {
//     const wasOnResumePage = previousPathname.current?.includes("/resume-details/");
//     const isNowOnResumePage = isResumeDetailPage;
    
//     if (wasOnResumePage && !isNowOnResumePage) {
//       console.log("🧹 Navigating away from resume page, clearing upload mode");
//       clearUploadMode();
//       hasFetchedData.current = false;
      
//       // Cancel any ongoing requests
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//         abortControllerRef.current = null;
//       }
//     }
//     previousPathname.current = pathname;
//   }, [pathname, isResumeDetailPage, clearUploadMode]);

//   // Handle editing from dashboard route
//   useEffect(() => {
//   if (!isOldRouteNameDashboard || !editingResumeIdAndData?.resume_data) {
//     return;
//   }

//   const { resume_data } = editingResumeIdAndData;
  
//   if (resume_data.contact) setContact(resume_data.contact);
//   if (resume_data.educations) setEducation(resume_data.educations);
//   if (resume_data.experiences) setExperiences(resume_data.experiences);
//   if (resume_data.projects) setProjects(resume_data.projects);
//   if (resume_data.skills) setSkills(resume_data.skills);
//   if (resume_data.summary?.[0]) setSummary(resume_data.summary[0]);
//   if (resume_data.finalize?.[0]) setFinalize(resume_data.finalize[0]);

//   setFullResumeData({
//     template: chosenTemplate?.templateId || chosenTemplate?.id,
//     contact: resume_data.contact || ({} as Contact),
//     experiences: resume_data.experiences || [],
//     education: resume_data.educations || [],
//     skills: resume_data.skills || ({} as Skill),
//     summary: resume_data.summary?.[0] || "",
//     finalize: resume_data.finalize?.[0] || {},
//     projects: resume_data.projects || [],
//   });

//   hasFetchedData.current = true;
//   // Remove setters from dependencies - they are stable
// }, [isOldRouteNameDashboard, editingResumeIdAndData, chosenTemplate]);

//   // Fetch existing resume data
//   useEffect(() => {
//     // Skip if not on resume detail page
//     if (!isResumeDetailPage) {
//       return;
//     }

//     // Skip if upload mode is active
//     if (isUploadMode) {
//       console.log("📝 Upload mode active - skipping existing data fetch");
//       return;
//     }

//     // Skip if already fetched or no user ID
//     if (hasFetchedData.current || !userId) {
//       if (!userId) console.log("⚠️ No user ID found, skipping data fetch");
//       return;
//     }

//     const fetchResumeData = async () => {
//       // Create abort controller for this request
//       abortControllerRef.current = new AbortController();
      
//       try {
//         hasFetchedData.current = true;
//         setResumeId("");
        
//         console.log("🔄 Fetching existing resume data...");
        
//         const response = await api.get(`${API_URL}/user-resumes`, {
//           signal: abortControllerRef.current.signal
//         });
        
//         const resumeData = response.data?.[0]?.resume_data;
        
//         if (!resumeData) {
//           console.log("ℹ️ No existing resume data found");
//           return;
//         }
        
//         console.log("✅ Resume data fetched successfully", resumeData);
        
//         // Update all contexts with existing data
//         if (resumeData.contact) setContact(resumeData.contact);
//         if (resumeData.educations) setEducation(resumeData.educations);
//         if (resumeData.experiences) setExperiences(resumeData.experiences);
//         if (resumeData.projects) setProjects(resumeData.projects);
//         if (resumeData.skills) setSkills(resumeData.skills);
//         if (resumeData.summary?.[0]) setSummary(resumeData.summary[0]);
//         if (resumeData.finalize?.[0]) setFinalize(resumeData.finalize[0]);
        
//         setFullResumeData({
//           template: chosenTemplate?.templateId,
//           contact: resumeData.contact,
//           experiences: resumeData.experiences,
//           education: resumeData.educations,
//           skills: resumeData.skills,
//           summary: resumeData.summary?.[0] || "",
//           finalize: resumeData.finalize?.[0] || {},
//           projects: resumeData.projects || [],
//         });
        
//       } catch (error: any) {
//         if (error.name === 'AbortError') {
//           console.log("Fetch aborted");
//         } else {
//           console.error("❌ Error fetching resume data:", error);
//           hasFetchedData.current = false;
//         }
//       } finally {
//         abortControllerRef.current = null;
//       }
//     };
    
//     fetchResumeData();
    
//     // Cleanup function
//     return () => {
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//         abortControllerRef.current = null;
//       }
//     };
//   }, [isResumeDetailPage, isUploadMode, userId]); // Remove chosenTemplate from deps

//   return <>{children}</>;
// }
















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

                console.log("cc");   

        
        if (!resumeData) {
          console.log("ℹ️ No existing resume data found");
          return;
        }

                        console.log("dd");   

        
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