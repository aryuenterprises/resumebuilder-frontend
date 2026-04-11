// components/resume/ResumeDataFetcher.tsx
"use client";

import { useEffect, useContext, useRef } from "react";
import { usePathname } from "next/navigation";
import { CreateContext } from "@/app/context/CreateContext";
import axios from "axios";
import { API_URL } from "@/app/config/api";
import {
  getLocalStorage,
  getSessionStorage,
  removeSessionStorage,
  setLocalStorage,
  setSessionStorage,
} from "@/app/utils";
import { User } from "@/app/types/user.types";
import { Template } from "@/app/types/context.types";
import { resume } from "react-dom/server";

interface ResumeDataFetcherProps {
  children: React.ReactNode;
}

export function ResumeDataFetcher({ children }: ResumeDataFetcherProps) {
  const pathname = usePathname();
  const {
    isUploadMode,
    clearUploadMode,
    contact,
    setContact,
    setEducation,
    setExperiences,
    setSkills,
    setSummary,
    setFinalize,
    setFullResumeData,
    setResumeId,
    // chosenTemplate,
  } = useContext(CreateContext);

  const chosenTemplate = getLocalStorage<Template>("chosenTemplate");


  const userDetails = getLocalStorage<User>("user_details");
  const userId = userDetails?.id;
  const hasFetchedData = useRef(false);
  const previousPathname = useRef(pathname);

  // Check if we're on a resume detail page
  const isResumeDetailPage = pathname?.includes("/resume-details/");

  // Clear upload mode when navigating AWAY from resume detail pages
  useEffect(() => {
    // If we were on a resume detail page and now we're not
    if (
      previousPathname.current?.includes("/resume-details/") &&
      !isResumeDetailPage
    ) {
      console.log("🧹 Navigating away from resume page, clearing upload mode");
      clearUploadMode();
      hasFetchedData.current = false; // Reset fetch flag
    }
    previousPathname.current = pathname;
  }, [pathname, isResumeDetailPage, clearUploadMode]);

  // console.log(con)
  console.log("contact id", contact._id);

  useEffect(() => {
    // Skip data fetching if:
    // 1. Not on a resume detail page
    // 2. In upload mode (user just uploaded a resume)
    // 3. Already fetched data
    // 4. No user ID

    if (!isResumeDetailPage) {
      return;
    }

    if (isUploadMode) {
      console.log("📝 Upload mode active - skipping existing data fetch");
      return;
    }

    if (hasFetchedData.current) {
      return;
    }

    if (!userId) {
      console.log("⚠️ No user ID found, skipping data fetch");
      return;
    }

    // Fetch existing resume data
    const fetchResumeData = async () => {
      setResumeId(""); // Reset resume ID before fetching new data

      try {
        hasFetchedData.current = true;
        console.log("🔄 Fetching existing resume data...");

        // Fetch contact first
        const contactResponse = await axios.get(
          `${API_URL}/api/contact-resume/get-contact/${userId}`,
          {
            params: {
              templateId: chosenTemplate?.templateId || chosenTemplate?.id || "",
              // resumeId: chosenTemplate?.contact?._id || "", // Use contact ID if available
            },
          },
        );


        let a = getSessionStorage("oldRouteNameDashboard");
        if (a) {
          setResumeId(contactResponse?.data.resumeId);
        }

        const contactData = contactResponse?.data?._id ?? "";

        if (contactData) {
          // Fetch full resume data
          const fullResponse = await axios.get(
            `${API_URL}/api/experience/get-all-contacts/${contactData}`,
          );

          if (fullResponse.data?.data?.length > 0) {
            const data = fullResponse.data.data[0];

            // Update all contexts with existing data
            if (data?.contact) {
              setContact(data.contact);
            }

            if (data?.educations) {
              setEducation(data.educations);
            }

            if (data?.experiences) {
              setExperiences(data.experiences);
            }

            if (data?.skills) {
              setSkills(data.skills);
            }

            if (data?.summary?.[0]) {
              setSummary(data.summary[0]);
            }

            if (data?.finalize?.[0]) {
              setFinalize(data.finalize[0]);
            }

            setFullResumeData({
              template: chosenTemplate?.templateId,
              contact: data?.contact,
              experiences: data?.experiences,
              education: data?.educations,
              skills: data?.skills,
              summary: data?.summary?.[0] || "",
              finalize: data?.finalize?.[0] || {},
            });

            console.log("✅ Existing resume data loaded successfully");
          } else {
            console.log("ℹ️ No existing resume data found");
          }
        } else {
          console.log("ℹ️ No contact found for user");
        }
      } catch (error) {
        console.error("❌ Error fetching resume data:", error);
        hasFetchedData.current = false; // Reset on error to allow retry
      }
    };

    fetchResumeData();
  }, [isResumeDetailPage, isUploadMode, userId, chosenTemplate]);

  return <>{children}</>;
}
