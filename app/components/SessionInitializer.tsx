"use client"; // This isolates the hooks so Next.js doesn't complain

import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/app/config/api";
import { setInMemoryToken, getInMemoryToken } from "@/app/utils/api"; 

export default function SessionInitializer({ children }: { children: React.ReactNode }) {
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    const checkCookieOnStartup = async () => {
      // Guard: If an access token already exists in memory, do nothing
      if (getInMemoryToken()) {
        setIsHydrating(false);
        return;
      }

      try {
        console.log("Application loaded. Attempting silent session restoration...");
        const response = await axios.post(
          `${API_URL}/token/refresh/`, 
          {}, 
          { withCredentials: true }
        );
        
        setInMemoryToken(response.data.access_token);
      } catch (err) {
        console.log("No active secure session found. Initializing app for guest.");
      } finally {
        setIsHydrating(false);
      }
    };

    checkCookieOnStartup();
  }, []); 

  if (isHydrating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/50">
        <div className="w-9 h-9 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        
      </div>
    );
  }

  return <>{children}</>;
}