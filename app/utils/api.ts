// import axios, { AxiosInstance, AxiosResponse } from "axios";
// import { API_URL } from "@/app/config/api";

// // 🔐 Private variable inside this module scope (In-Memory Storage)
// // This variable cannot be scraped or read by XSS attacks.
// let _accessToken: string | null = null;

// export const setInMemoryToken = (token: string | null) => {
//   _accessToken = token;
// };

// export const getInMemoryToken = () => {
//   return _accessToken;
// };

// // 1. Create the custom axios instance pointing directly to Python
// const api: AxiosInstance = axios.create({
//   baseURL: API_URL,
//   withCredentials: true, // 👈 Essential so the browser includes the refresh_token cookie
// });

// // Request Interceptor: Automatically inject the in-memory access token into headers
// api.interceptors.request.use(
//   (config) => {
//     if (_accessToken && config.headers) {
//       config.headers.Authorization = `Bearer ${_accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((promise) => {
//     if (error) {
//       promise.reject(error);
//     } else {
//       promise.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// // 2. Response Interceptor: Catch expired access tokens and perform a Silent Refresh
// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if Python returned a 401 or 403 (Token Expired)
//     const isUnauthorized =
//       error.response?.status === 401 || error.response?.status === 403;
//     const isRefreshRequest = originalRequest.url?.includes("/token/refresh/");

//     // Check if this is a quota limit error
//     const isQuotaLimitError =
//       error.response?.data?.message?.includes("ATS Scan limit exceeded") ||
//       error.response?.data?.message?.includes("Scan limit exceeded");

//     // ✅ NEW: Check if user account is not found
//     const isUserNotFound =
//       error.response?.status === 404 &&
//       (error.response?.data?.message?.toLowerCase().includes("user account not found.") ||
//        error.response?.data?.detail?.toLowerCase().includes("user not found") ||
//        error.response?.data?.error?.toLowerCase().includes("user not found"));

//     // If it's a quota limit error, don't refresh, just reject
//     if (isQuotaLimitError) {
//       return Promise.reject(error);
//     }

//     // ✅ NEW: If user account is not found, logout immediately
//     if (isUserNotFound) {
//       console.error("User account not found. Logging out...");
//       await handleLogout();
//       return Promise.reject(error);
//     }

//     if (
//       isUnauthorized &&
//       originalRequest &&
//       !originalRequest._retry &&
//       !isRefreshRequest
//     ) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return api(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         console.log(
//           "Access token expired. Requesting a new one using the refresh cookie...",
//         );

//         const response = await axios.post(
//           `${API_URL}/token/refresh/`,
//           {},
//           { withCredentials: true },
//         );

//         const newAccessToken = response.data.access_token;

//         setInMemoryToken(newAccessToken);

//         processQueue(null, newAccessToken);
//         isRefreshing = false;

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         isRefreshing = false;
//         handleLogout();

//         console.error("Refresh token cookie expired too. Logging out...");
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// export async function handleLogout(): Promise<void> {
//   // 1. Instantly wipe the short-lived access token from application memory
//   setInMemoryToken(null);

//   if (typeof window !== "undefined") {
//     try {
//       console.log(
//         "Notifying backend to destroy the secure refresh token cookie...",
//       );

//       // 2. Fire the logout request to your Python backend.
//       // Note: Because this instance has 'withCredentials: true', the browser
//       // automatically passes the cookie along so the backend knows which session to kill.
//       await api.post("/auth/logout/");
//     } catch (err) {
//       // Fail silently if the network is dead or the server errors out
//       // so the user is never stuck trapped on the page.
//       console.error("Backend cookie deletion failed or timed out:", err);
//     } finally {
//       // 3. Purge public layout cache data
//       localStorage.removeItem("user_details");
//       // 4. Forcibly redirect the window context back to the authentication gateway
//       window.location.href = "/login";
//     }
//   }
// }

// export default api;


import axios, { AxiosInstance, AxiosResponse } from "axios";
import { API_URL } from "@/app/config/api";

// 🔐 Private variable inside this module scope (In-Memory Storage)
let _accessToken: string | null = null;

export const setInMemoryToken = (token: string | null) => {
  _accessToken = token;
};

export const getInMemoryToken = () => {
  return _accessToken;
};

// 1. Create the custom axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    if (_accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${_accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: any[] = [];
let refreshPromise: Promise<any> | null = null;

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// ✅ Helper to check if error indicates user not found/deleted
const isUserNotFoundError = (error: any): boolean => {
  const status = error.response?.status;
  const data = error.response?.data;
  
  if (status === 404) {
    const messages = [
      data?.message,
      data?.detail,
      data?.error,
      data?.error_message,
      data?.msg
    ].filter(Boolean);
    
    return messages.some(msg => 
      typeof msg === 'string' && 
      (msg.toLowerCase().includes("user account not found") ||
       msg.toLowerCase().includes("user not found") ||
       msg.toLowerCase().includes("account not found") ||
       msg.toLowerCase().includes("user doesn't exist") ||
       msg.toLowerCase().includes("user deleted") ||
       msg.toLowerCase().includes("account deleted"))
    );
  }
  
  if (status === 401 || status === 403) {
    const message = data?.message || data?.detail || data?.error || '';
    return typeof message === 'string' && 
      (message.toLowerCase().includes("user account not found") ||
       message.toLowerCase().includes("user not found") ||
       message.toLowerCase().includes("account not found"));
  }
  
  return false;
};

// ✅ Check if it's a refresh token request
const isRefreshRequest = (url?: string): boolean => {
  return url?.includes("/token/refresh/") || false;
};

// ✅ Function to clear duplicate refresh tokens
const clearDuplicateRefreshTokens = (): void => {
  if (typeof document === "undefined") return;
  
  try {
    // Get all cookies
    const cookies = document.cookie.split(";");
    const refreshTokens: string[] = [];
    const otherCookies: string[] = [];
    
    // Separate refresh_token cookies from others
    cookies.forEach(cookie => {
      const trimmedCookie = cookie.trim();
      if (trimmedCookie.startsWith("refresh_token=")) {
        refreshTokens.push(trimmedCookie);
      } else if (trimmedCookie) {
        otherCookies.push(trimmedCookie);
      }
    });
    
    // If we have more than 1 refresh_token, clear all and keep only the latest
    if (refreshTokens.length > 1) {
      console.log(`Found ${refreshTokens.length} refresh_token cookies. Cleaning up...`);
      
      // Clear all refresh_token cookies
      refreshTokens.forEach(() => {
        document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Also try with different paths and domains
        document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname + ";";
      });
      
      // Keep only the most recent one - we'll let the backend set a new one on next login
      console.log("Cleared duplicate refresh tokens. Will obtain a fresh one on next authentication.");
    }
  } catch (error) {
    console.error("Error clearing duplicate cookies:", error);
  }
};

// ✅ Clear duplicates on initialization
if (typeof window !== "undefined") {
  clearDuplicateRefreshTokens();
}

// 2. Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // ✅ Check response for new refresh_token and clean up if needed
    const setCookieHeader = response.headers?.["set-cookie"];
    if (setCookieHeader && Array.isArray(setCookieHeader)) {
      // If backend is setting multiple refresh_token cookies, we'll handle it
      const refreshCookies = setCookieHeader.filter(c => 
        c.includes("refresh_token=")
      );
      if (refreshCookies.length > 1) {
        console.warn("Backend sent multiple refresh_token cookies. Cleaning up...");
        // Clear all existing refresh tokens
        clearDuplicateRefreshTokens();
      }
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // ✅ Handle user not found/deleted errors
    if (isUserNotFoundError(error)) {
      console.error("User account not found or deleted. Logging out...");
      if (originalRequest?._isLogoutRequest) {
        return Promise.reject(error);
      }
      await handleLogout();
      return Promise.reject(error);
    }

    // Check if this is a quota limit error
    const isQuotaLimitError =
      error.response?.data?.message?.includes("ATS Scan limit exceeded") ||
      error.response?.data?.message?.includes("Scan limit exceeded");

    if (isQuotaLimitError) {
      return Promise.reject(error);
    }

    // ✅ Prevent refresh loops and handle refresh request failures
    if (isRefreshRequest(originalRequest?.url)) {
      console.error("Refresh token request failed. Logging out...");
      // Clear duplicate tokens before logout
      clearDuplicateRefreshTokens();
      await handleLogout();
      return Promise.reject(error);
    }

    // Check if unauthorized
    const isUnauthorized =
      error.response?.status === 401 || error.response?.status === 403;

    if (
      isUnauthorized &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      // ✅ Use a single refresh promise to prevent multiple concurrent refreshes
      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            console.log("Access token expired. Requesting a new one using the refresh cookie...");

            // ✅ Clear duplicate cookies before refresh
            clearDuplicateRefreshTokens();

            const response = await axios.post(
              `${API_URL}/token/refresh/`,
              {},
              { 
                withCredentials: true,
                headers: {
                  // ✅ Prevent caching of refresh request
                  'Cache-Control': 'no-cache',
                  'Pragma': 'no-cache'
                }
              }
            );

            const newAccessToken = response.data.access_token;

            // ✅ Check if refresh returned user not found error in response body
            if (response.data?.message?.toLowerCase().includes("user not found") ||
                response.data?.detail?.toLowerCase().includes("user not found")) {
              throw new Error("User account not found during refresh");
            }

            setInMemoryToken(newAccessToken);
            
            // ✅ Clean up any duplicate refresh tokens after successful refresh
            clearDuplicateRefreshTokens();

            return newAccessToken;
          } catch (refreshError) {
            // ✅ Check if refresh failed due to user not found
            if (isUserNotFoundError(refreshError)) {
              console.error("User account not found during refresh. Logging out...");
              clearDuplicateRefreshTokens();
              await handleLogout();
            }
            throw refreshError;
          } finally {
            refreshPromise = null;
          }
        })();
      }

      try {
        const newToken = await refreshPromise;
        processQueue(null, newToken);
        isRefreshing = false;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        refreshPromise = null;
        
        // ✅ Clear duplicate cookies before logout
        clearDuplicateRefreshTokens();
        
        console.error("Refresh token cookie expired or invalid. Logging out...");
        await handleLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export async function handleLogout(): Promise<void> {
  // Prevent multiple logout calls
  if (typeof window !== "undefined" && (window as any).__isLoggingOut) {
    return;
  }
  (window as any).__isLoggingOut = true;

  try {
    // 1. Instantly wipe the short-lived access token from application memory
    setInMemoryToken(null);

    // 2. Clear any pending queue
    failedQueue = [];
    isRefreshing = false;
    refreshPromise = null;

    if (typeof window !== "undefined") {
      try {
        console.log("Notifying backend to destroy the secure refresh token cookie...");
        
        // ✅ Clear duplicate refresh tokens before logout request
        clearDuplicateRefreshTokens();
        
        await api.post("/auth/logout/", {}, {
          _isLogoutRequest: true
        } as any);
      } catch (err) {
        console.error("Backend cookie deletion failed or timed out:", err);
      } finally {
        // ✅ Force clear all refresh_token cookies from browser
        clearDuplicateRefreshTokens();
        
        // ✅ Also clear any refresh_token cookies with different paths
        const paths = ['/', '/auth', '/api'];
        const domains = ['', window.location.hostname, '.' + window.location.hostname];
        
        paths.forEach(path => {
          domains.forEach(domain => {
            document.cookie = `refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain};`;
          });
        });

        // 3. Purge all user-related data from localStorage
        localStorage.removeItem("user_details");
        localStorage.removeItem("user_preferences");
        
        // 4. Clear session storage
        sessionStorage.clear();
        
        // 5. Redirect to login
        window.location.href = "/login";
      }
    }
  } finally {
    (window as any).__isLoggingOut = false;
  }
}

// ✅ Export cleanup function for manual use
export const cleanupCookies = clearDuplicateRefreshTokens;

export default api;