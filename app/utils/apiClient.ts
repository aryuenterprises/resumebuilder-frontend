import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { API_URL } from "../config/api";

// Resume base URL: https://portal.aryuacademy.com/api/resume
export const RESUME_API_BASE_URL = API_URL;
// Normal application base URL: https://portal.aryuacademy.com/api
export const NORMAL_API_BASE_URL = API_URL.replace(/\/resume\/?$/, "");

// ==========================================
// RESUME TOKEN STORAGE
// Keys: resume_access_token & resume_refresh_token
// Strictly isolated: NO fallback to normal LMS keys
// ==========================================

export const RESUME_ACCESS_TOKEN_KEY = "resume_access_token";
export const RESUME_REFRESH_TOKEN_KEY = "resume_refresh_token";

export const resumeTokenStorage = {
  getAccessToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(RESUME_ACCESS_TOKEN_KEY);
  },

  setAccessToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(RESUME_ACCESS_TOKEN_KEY, token);
    }
  },

  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(RESUME_REFRESH_TOKEN_KEY);
  },

  setRefreshToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(RESUME_REFRESH_TOKEN_KEY, token);
    }
  },

  clearTokens: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(RESUME_ACCESS_TOKEN_KEY);
      localStorage.removeItem(RESUME_REFRESH_TOKEN_KEY);
    }
  },
};

// Aliased as tokenStorage for backward compatibility within Resume module
export const tokenStorage = resumeTokenStorage;
export const ACCESS_TOKEN_KEY = RESUME_ACCESS_TOKEN_KEY;
export const REFRESH_TOKEN_KEY = RESUME_REFRESH_TOKEN_KEY;

// ==========================================
// NORMAL APPLICATION TOKEN STORAGE
// Keys: access_token & refresh_token
// ==========================================

export const NORMAL_ACCESS_TOKEN_KEY = "access_token";
export const NORMAL_REFRESH_TOKEN_KEY = "refresh_token";

export const normalTokenStorage = {
  getAccessToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(NORMAL_ACCESS_TOKEN_KEY);
  },

  setAccessToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(NORMAL_ACCESS_TOKEN_KEY, token);
    }
  },

  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(NORMAL_REFRESH_TOKEN_KEY);
  },

  setRefreshToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(NORMAL_REFRESH_TOKEN_KEY, token);
    }
  },

  clearTokens: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(NORMAL_ACCESS_TOKEN_KEY);
      localStorage.removeItem(NORMAL_REFRESH_TOKEN_KEY);
    }
  },
};

// ==========================================
// SESSION EXPIRATION & REDIRECTION HELPER
// ==========================================

const handleSessionExpired = (): void => {
  resumeTokenStorage.clearTokens();
  if (typeof window !== "undefined") {
    localStorage.removeItem("user_details");
    localStorage.removeItem("user_preferences");
    if (!window.location.pathname.includes("/login")) {
      window.location.href = "/login?session_expired=true";
    }
  }
};

// ==========================================
// SAFE JWT UTILITIES (Zero External Dependencies)
// ==========================================

/**
 * Checks whether a JWT token is expired without relying on external libraries.
 * Includes a 10-second skew buffer so tokens nearing expiration trigger a proactive refresh.
 */
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload =
      typeof window !== "undefined"
        ? decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          )
        : Buffer.from(base64, "base64").toString("utf-8");

    const payload = JSON.parse(jsonPayload);
    if (!payload.exp) return false;

    // Check if token expires within 10 seconds
    const expirationTime = payload.exp * 1000;
    return Date.now() >= expirationTime - 10000;
  } catch {
    // If decoding fails, assume not expired and let the backend validate
    return false;
  }
};

// Safe header mutation for Axios v1 (AxiosHeaders object vs plain record)
const setAuthHeader = (
  headers: AxiosRequestConfig["headers"] | AxiosHeaders | Record<string, unknown> | undefined,
  token: string
): void => {
  if (!headers) return;
  if (headers instanceof AxiosHeaders || typeof (headers as AxiosHeaders).set === "function") {
    (headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
  } else {
    (headers as Record<string, unknown>)["Authorization"] = `Bearer ${token}`;
    (headers as Record<string, unknown>)["authorization"] = `Bearer ${token}`;
  }
};

const getAuthTokenFromHeaders = (
  headers: AxiosRequestConfig["headers"] | AxiosHeaders | Record<string, unknown> | undefined
): string | null => {
  if (!headers) return null;
  let authValue: unknown = null;
  if (headers instanceof AxiosHeaders || typeof (headers as AxiosHeaders).get === "function") {
    authValue =
      (headers as AxiosHeaders).get("Authorization") ||
      (headers as AxiosHeaders).get("authorization");
  } else {
    authValue =
      (headers as Record<string, unknown>)["Authorization"] ||
      (headers as Record<string, unknown>)["authorization"];
  }

  if (typeof authValue === "string" && authValue.startsWith("Bearer ")) {
    return authValue.slice(7).trim();
  }
  return null;
};

// ==========================================
// AUTHENTICATION CONTEXT DETERMINATION
// ==========================================

export type AuthContext = "resume" | "normal";

export interface AuthRequestConfig extends AxiosRequestConfig {
  authContext?: AuthContext;
  _retry?: boolean;
}

/**
 * Determines whether a request belongs to Resume authentication or Normal application authentication.
 * - Resume APIs (/api/resume/...) -> "resume"
 * - Normal APIs (/api/student_list, /api/...) -> "normal"
 */
export const getAuthContext = (
  config?: AuthRequestConfig | InternalAxiosRequestConfig
): AuthContext => {
  if (!config) return "resume";
  if ((config as AuthRequestConfig).authContext) {
    return (config as AuthRequestConfig).authContext as AuthContext;
  }

  const url = config.url || "";
  const baseURL = config.baseURL || "";

  // 1. Check url first (handles full URLs and root-relative paths like /api/student_list)
  if (url.includes("/api/resume")) {
    return "resume";
  }
  if (url.includes("/api/")) {
    return "normal";
  }

  // 2. Relative URLs inherit context from baseURL
  if (baseURL.includes("/api/resume")) {
    return "resume";
  }
  if (baseURL.includes("/api")) {
    return "normal";
  }

  // Default to resume for relative requests in Resume application
  return "resume";
};

// ==========================================
// RAW CLIENTS FOR DIRECT AUTH CALLS
// (Bypasses interceptors to eliminate recursion)
// ==========================================

export const rawResumeAuthClient: AxiosInstance = axios.create({
  baseURL: RESUME_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const rawNormalAuthClient: AxiosInstance = axios.create({
  baseURL: NORMAL_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Backward compatibility
export const rawAuthClient = rawResumeAuthClient;

// Primary client used by the application
export const apiClient: AxiosInstance = axios.create({
  baseURL: RESUME_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Endpoints that should NEVER trigger refresh or 401 interception
export const isAuthEndpoint = (url?: string): boolean => {
  if (!url) return false;
  return (
    url.includes("/token/refresh") ||
    url.includes("/auth/login") ||
    url.includes("/auth/google-login") ||
    url.includes("/auth/logout")
  );
};

// ==========================================
// DUAL CONCURRENCY LOCKS
// ==========================================

let resumeRefreshPromise: Promise<string> | null = null;
let normalRefreshPromise: Promise<string> | null = null;

// ==========================================
// RESUME TOKEN REFRESH IMPLEMENTATION
// POST /api/resume/token/refresh/
// ==========================================

/**
 * Refreshes the Resume JWT access token.
 * Backend contract:
 * - Dedicated endpoint: POST /api/resume/token/refresh/
 * - Uses AllowAny and custom auth class (NO access token header needed).
 * - Accepts JSON body: { "refresh": "<refresh_token>" }
 * - Accepts HttpOnly cookie: RESUME_REFRESH_COOKIE_NAME via withCredentials: true.
 * - NEVER sends the access token as the refresh token.
 * - Rotates refresh tokens: stores new access token and new rotated refresh token.
 * - Uses singleton promise lock so concurrent 401s share a single call.
 */
export const executeResumeTokenRefresh = async (): Promise<string> => {
  if (resumeRefreshPromise) {
    return resumeRefreshPromise;
  }

  resumeRefreshPromise = (async () => {
    try {
      console.log("[RESUME AUTH] Refresh started");

      const storedRefreshToken = resumeTokenStorage.getRefreshToken();
      const storedAccessToken = resumeTokenStorage.getAccessToken();

      // Ensure we NEVER send the access token as the refresh token
      const isCredentialAvailable = Boolean(
        storedRefreshToken && storedRefreshToken !== storedAccessToken
      );
      console.log(`[RESUME AUTH] Refresh credential available: ${isCredentialAvailable}`);

      const payload: Record<string, string> = {};

      // Send preferred body if token is client-accessible
      if (isCredentialAvailable && storedRefreshToken) {
        payload.refresh = storedRefreshToken;
      }

      // Dedicated Resume refresh endpoint: POST /api/resume/token/refresh/
      // withCredentials: true ensures HttpOnly cookie is attached by the browser
      // NO Authorization header is sent, allowing backend AllowAny custom auth to validate cleanly
      const response = await rawResumeAuthClient.post("/token/refresh/", payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const newAccessToken =
        response.data?.access_token ||
        response.data?.access ||
        response.data?.tokens?.access ||
        response.data?.data?.access_token;

      const newRefreshToken =
        response.data?.refresh_token ||
        response.data?.refresh ||
        response.data?.tokens?.refresh ||
        response.data?.data?.refresh_token;

      if (!newAccessToken) {
        throw new Error("MALFORMED_RESUME_REFRESH_RESPONSE");
      }

      // Update stored access token
      resumeTokenStorage.setAccessToken(newAccessToken);

      console.log("[RESUME AUTH] Refresh successful");
      console.log("[RESUME AUTH] New access token received");

      // CRITICAL: Handle token rotation (never reuse old blacklisted refresh token)
      if (newRefreshToken && newRefreshToken !== newAccessToken) {
        resumeTokenStorage.setRefreshToken(newRefreshToken);
        console.log("[RESUME AUTH] New refresh token received");
      }

      return newAccessToken;
    } catch (error: unknown) {
      const axiosErr = error as AxiosError<{
        error?: string;
        message?: string;
        detail?: string;
      }>;
      const status = axiosErr.response?.status;
      const errorData = axiosErr.response?.data;
      const errorMessage = (error as Error)?.message;

      const isExplicitRejection =
        status === 401 ||
        status === 403 ||
        errorMessage === "NO_RESUME_REFRESH_TOKEN" ||
        (status === 400 &&
          (errorData?.error?.includes?.("Refresh token") ||
            errorData?.message?.toLowerCase?.()?.includes?.("token") ||
            errorData?.detail?.toLowerCase?.()?.includes?.("token")));

      if (isExplicitRejection) {
        handleSessionExpired();
      }

      throw error;
    } finally {
      resumeRefreshPromise = null;
    }
  })();

  return resumeRefreshPromise;
};

// Backward compatibility alias
export const executeTokenRefresh = executeResumeTokenRefresh;

// ==========================================
// NORMAL TOKEN REFRESH IMPLEMENTATION
// POST /api/token/refresh/
// ==========================================

/**
 * Refreshes Normal Application JWT tokens.
 * Endpoint: POST /api/token/refresh/
 */
export const executeNormalTokenRefresh = async (): Promise<string> => {
  if (normalRefreshPromise) {
    return normalRefreshPromise;
  }

  normalRefreshPromise = (async () => {
    try {
      console.log("[AUTH] Refresh started");

      const storedRefreshToken = normalTokenStorage.getRefreshToken();
      const storedAccessToken = normalTokenStorage.getAccessToken();

      const payload: Record<string, string> = {};
      if (storedRefreshToken && storedRefreshToken !== storedAccessToken) {
        payload.refresh = storedRefreshToken;
      }

      // Dedicated Normal application refresh endpoint: POST /api/token/refresh/
      const response = await rawNormalAuthClient.post("/token/refresh/", payload, {
        withCredentials: true,
      });

      const newAccessToken =
        response.data?.access_token ||
        response.data?.access ||
        response.data?.tokens?.access;

      const newRefreshToken =
        response.data?.refresh_token ||
        response.data?.refresh ||
        response.data?.tokens?.refresh;

      if (!newAccessToken) {
        throw new Error("MALFORMED_NORMAL_REFRESH_RESPONSE");
      }

      normalTokenStorage.setAccessToken(newAccessToken);

      if (newRefreshToken && newRefreshToken !== newAccessToken) {
        normalTokenStorage.setRefreshToken(newRefreshToken);
      }

      console.log("[AUTH] Refresh successful");

      return newAccessToken;
    } catch (error: unknown) {
      const axiosErr = error as AxiosError;
      const status = axiosErr.response?.status;
      if (status === 401 || status === 403) {
        normalTokenStorage.clearTokens();
      }
      throw error;
    } finally {
      normalRefreshPromise = null;
    }
  })();

  return normalRefreshPromise;
};

// ==========================================
// REQUEST INTERCEPTOR: PROACTIVE TOKEN ATTACH
// ==========================================

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Skip attaching token for auth endpoints (refresh, login, logout)
    if (isAuthEndpoint(config.url)) {
      return config;
    }

    const context = getAuthContext(config);

    if (context === "resume") {
      let accessToken = resumeTokenStorage.getAccessToken();
      const refreshToken = resumeTokenStorage.getRefreshToken();

      // Proactive refresh: If access token is expired but refresh token exists
      if ((!accessToken || isTokenExpired(accessToken)) && refreshToken) {
        try {
          accessToken = await executeResumeTokenRefresh();
        } catch (err: unknown) {
          return Promise.reject(err);
        }
      }

      if (accessToken) {
        if (!config.headers) {
          config.headers = new AxiosHeaders();
        }
        setAuthHeader(config.headers, accessToken);
      }
    } else {
      let accessToken = normalTokenStorage.getAccessToken();
      const refreshToken = normalTokenStorage.getRefreshToken();

      if ((!accessToken || isTokenExpired(accessToken)) && refreshToken) {
        try {
          accessToken = await executeNormalTokenRefresh();
        } catch (err: unknown) {
          return Promise.reject(err);
        }
      }

      if (accessToken) {
        if (!config.headers) {
          config.headers = new AxiosHeaders();
        }
        setAuthHeader(config.headers, accessToken);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================================
// RESPONSE INTERCEPTOR: CONTEXT-AWARE 401 REFRESH & RETRY
// ==========================================

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AuthRequestConfig;

    // If no request config or status is not 401, reject immediately
    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Refresh endpoints themselves MUST NOT trigger refresh interceptor
    if (isAuthEndpoint(originalRequest.url)) {
      return Promise.reject(error);
    }

    // Prevent infinite retry loop: retry exactly once
    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    // Determine authentication context
    const context = getAuthContext(originalRequest);

    if (context === "resume") {
      console.log("[RESUME AUTH] 401 received");
    } else {
      console.log("[AUTH] Request received 401");
      console.log("[AUTH] Auth context: normal");
      console.log("[AUTH] Refresh endpoint: /api/token/refresh/");
    }

    try {
      let newAccessToken: string;

      if (context === "resume") {
        const sentToken = getAuthTokenFromHeaders(originalRequest.headers);
        const currentToken = resumeTokenStorage.getAccessToken();

        // Check if token was already refreshed by a parallel request
        if (
          currentToken &&
          sentToken &&
          currentToken !== sentToken &&
          !isTokenExpired(currentToken)
        ) {
          newAccessToken = currentToken;
        } else {
          newAccessToken = await executeResumeTokenRefresh();
        }
      } else {
        const sentToken = getAuthTokenFromHeaders(originalRequest.headers);
        const currentToken = normalTokenStorage.getAccessToken();

        if (
          currentToken &&
          sentToken &&
          currentToken !== sentToken &&
          !isTokenExpired(currentToken)
        ) {
          newAccessToken = currentToken;
        } else {
          newAccessToken = await executeNormalTokenRefresh();
        }
      }

      if (context === "resume") {
        console.log("[RESUME AUTH] Original request retrying");
      } else {
        console.log("[AUTH] Retrying original request");
      }

      if (!originalRequest.headers) {
        originalRequest.headers = {};
      }
      setAuthHeader(originalRequest.headers, newAccessToken);

      // Retry original request exactly once
      return apiClient(originalRequest);
    } catch (refreshError: unknown) {
      if (context === "resume") {
        const refreshAxiosErr = refreshError as AxiosError<{
          error?: string;
          message?: string;
          detail?: string;
        }>;
        const status = refreshAxiosErr.response?.status;
        const errorMessage = (refreshError as Error)?.message;
        const errorData = refreshAxiosErr.response?.data;

        const isExplicitRejection =
          status === 401 ||
          status === 403 ||
          errorMessage === "NO_RESUME_REFRESH_TOKEN" ||
          (status === 400 &&
            (errorData?.error?.includes?.("Refresh token") ||
              errorData?.message?.toLowerCase?.()?.includes?.("token")));

        if (isExplicitRejection) {
          handleSessionExpired();
        }
      }

      return Promise.reject(refreshError);
    }
  }
);

// ==========================================
// RESUME AUTH API HELPER METHODS
// ==========================================

export const resumeAuthService = {
  login: async (credentials: {
    email: string;
    password: string;
    turnstileToken?: string | null;
  }) => {
    const payload: Record<string, string> = {
      email: credentials.email,
      password: credentials.password,
    };
    if (credentials.turnstileToken) {
      payload.turnstileToken = credentials.turnstileToken;
      payload.turnstile_token = credentials.turnstileToken;
    }

    const response = await rawResumeAuthClient.post("/auth/login/", payload);
    const data = response.data;

    const accessToken =
      data?.access_token ||
      data?.access ||
      data?.tokens?.access ||
      data?.data?.access_token;

    const refreshToken =
      data?.refresh_token ||
      data?.refresh ||
      data?.tokens?.refresh ||
      data?.data?.refresh_token;

    const user = data?.user || data?.data?.user;

    if (accessToken) {
      resumeTokenStorage.setAccessToken(accessToken);
    }
    if (refreshToken && refreshToken !== accessToken) {
      resumeTokenStorage.setRefreshToken(refreshToken);
    }

    return { user, access_token: accessToken, refresh_token: refreshToken };
  },

  googleLogin: async (googleToken: string) => {
    const response = await rawResumeAuthClient.post("/auth/google-login/", {
      id_token: googleToken,
      credential: googleToken,
    });
    const data = response.data;

    const accessToken =
      data?.access_token ||
      data?.access ||
      data?.tokens?.access ||
      data?.data?.access_token;

    const refreshToken =
      data?.refresh_token ||
      data?.refresh ||
      data?.tokens?.refresh ||
      data?.data?.refresh_token;

    const user = data?.user || data?.data?.user;

    if (accessToken) {
      resumeTokenStorage.setAccessToken(accessToken);
    }
    if (refreshToken && refreshToken !== accessToken) {
      resumeTokenStorage.setRefreshToken(refreshToken);
    }

    return { user, access_token: accessToken, refresh_token: refreshToken };
  },

  logout: async () => {
    try {
      const refreshToken = resumeTokenStorage.getRefreshToken();
      const payload: Record<string, string> = {};
      if (refreshToken) {
        payload.refresh_token = refreshToken;
        payload.refresh = refreshToken;
      }
      await rawResumeAuthClient.post("/auth/logout/", payload);
    } catch (e) {
      console.warn("[RESUME AUTH] Logout notification error:", e);
    } finally {
      handleSessionExpired();
      if (typeof window !== "undefined") {
        localStorage.removeItem("latest_resume_id");
        localStorage.removeItem("chosenTemplate");
        localStorage.removeItem("editingResumeIdAndData");
        localStorage.removeItem("fullResumeData");
        localStorage.removeItem("coverLetterData");
        sessionStorage.clear();

        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }
    }
  },

  refreshTokenDirectly: async () => {
    return executeResumeTokenRefresh();
  },
};

export default apiClient;