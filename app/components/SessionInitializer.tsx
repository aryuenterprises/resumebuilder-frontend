"use client";

import { useEffect } from "react";
import {
  tokenStorage,
  isTokenExpired,
  executeTokenRefresh,
} from "@/app/utils/apiClient";

/**
 * SessionInitializer:
 * Restores the authenticated session on application startup / browser reload.
 * Non-blocking: avoids flashing full-screen loaders for guests, while ensuring
 * that expired access tokens are seamlessly refreshed before or during API calls.
 */
export default function SessionInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const restoreSessionOnStartup = async () => {
      const refreshToken = tokenStorage.getRefreshToken();
      const accessToken = tokenStorage.getAccessToken();
      const userDetails =
        typeof window !== "undefined"
          ? localStorage.getItem("user_details")
          : null;

      // Only attempt refresh if user was logged in (stored refresh token or user_details exists)
      // and the access token is missing or expired
      if (
        (refreshToken || userDetails) &&
        (!accessToken || isTokenExpired(accessToken))
      ) {
        try {
          await executeTokenRefresh();
        } catch {
          // If refresh fails on startup (e.g. offline), let apiClient interceptors handle it
          // when protected API calls are made, avoiding premature logout
        }
      }
    };

    restoreSessionOnStartup();
  }, []);

  return <>{children}</>;
}