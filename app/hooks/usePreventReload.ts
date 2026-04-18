"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function usePreventReload() {
  const pathname = usePathname();
  const hasUnsavedChanges = useRef(true); // Set to true to always show warning

  useEffect(() => {
    const isResumeDetailPage =
      pathname?.includes("/resume-details/") ||
      pathname?.includes("/ats-checker");
    if (!isResumeDetailPage) return;

    // This event triggers for:
    // 1. Browser reload button
    // 2. Ctrl+R / Cmd+R
    // 3. F5 key
    // 4. Closing tab
    // 5. Navigating away
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges.current) {
        // Modern browsers will show their own generic message
        // You cannot customize the message anymore for security reasons
        e.preventDefault();
        e.returnValue = ""; // Empty string is required for Chrome
        return ""; // Required for some browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  // Function to manually set unsaved changes status
  const setHasUnsavedChanges = (value: boolean) => {
    hasUnsavedChanges.current = value;
  };

  return { setHasUnsavedChanges };
}
