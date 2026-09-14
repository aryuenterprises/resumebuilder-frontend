// import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
// import { API_URL } from "../config/api";

// const API_BASE_URL = API_URL;

// // Storage keys
// const ACCESS_TOKEN_KEY = "resume_access_token";
// const REFRESH_TOKEN_KEY = "resume_refresh_token";

// // Helper utilities for token management
// export const tokenStorage = {
//   getAccessToken: (): string | null => {
//     if (typeof window === "undefined") return null;
//     return localStorage.getItem(ACCESS_TOKEN_KEY);
//   },
//   setAccessToken: (token: string) => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem(ACCESS_TOKEN_KEY, token);
//     }
//   },
//   getRefreshToken: (): string | null => {
//     if (typeof window === "undefined") return null;
//     return localStorage.getItem(REFRESH_TOKEN_KEY);
//   },
//   setRefreshToken: (token: string) => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem(REFRESH_TOKEN_KEY, token);
//     }
//   },
//   clearTokens: () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem(ACCESS_TOKEN_KEY);
//       localStorage.removeItem(REFRESH_TOKEN_KEY);
//     }
//   },
// };

// // Create Axios Instance
// export const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true, // Crucial: allows sending/receiving HttpOnly cookies with Django
// });

// // Request Interceptor: Attach Access Token to all Resume requests
// apiClient.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const accessToken = tokenStorage.getAccessToken();
//     if (accessToken && !config.headers.Authorization) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response Interceptor: Refresh Token Logic with Request Queuing
// let isRefreshing = false;
// let failedQueue: Array<{
//   resolve: (token: string) => void;
//   reject: (error: any) => void;
// }> = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((promise) => {
//     if (error) {
//       promise.reject(error);
//     } else if (token) {
//       promise.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

//     // Check if error is 401 and request hasn't been retried yet
//     if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
//       // Don't intercept 401s from login or refresh endpoints
//       if (
//         originalRequest.url?.includes("/api/resume/auth/login/") ||
//         originalRequest.url?.includes("/api/resume/token/refresh/")
//       ) {
//         return Promise.reject(error);
//       }

//       if (isRefreshing) {
//         // If refresh is already in progress, enqueue this request
//         return new Promise<string>((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             if (originalRequest.headers) {
//               originalRequest.headers["Authorization"] = `Bearer ${token}`;
//             }
//             return apiClient(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const storedRefreshToken = tokenStorage.getRefreshToken();
        
//         // Call the Resume App refresh endpoint
//         // It accepts refresh token from HttpOnly cookie or explicit body
//         const payload = storedRefreshToken ? { refresh: storedRefreshToken } : {};
        
//         const refreshResponse = await axios.post(
//           `${API_BASE_URL}/token/refresh/`,
//           payload,
//           { withCredentials: true }
//         );

//         const newAccessToken = refreshResponse.data.access_token;
//         const newRefreshToken = refreshResponse.data.refresh_token;

//         tokenStorage.setAccessToken(newAccessToken);
//         if (newRefreshToken) {
//           tokenStorage.setRefreshToken(newRefreshToken);
//         }

//         // Retry queued requests with new token
//         processQueue(null, newAccessToken);

//         // Retry original request
//         if (originalRequest.headers) {
//           originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         }
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         // Refresh token expired or invalid -> logout user
//         processQueue(refreshError, null);
//         tokenStorage.clearTokens();

//         if (typeof window !== "undefined") {
//           window.location.href = "/login?session_expired=true";
//         }
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // ==========================================
// // RESUME AUTH API HELPER METHODS
// // ==========================================

// export const resumeAuthService = {
//   login: async (credentials: { email: string; password: string }) => {
//     const response = await apiClient.post("/auth/login/", credentials);
//     const { access_token, refresh_token, user } = response.data;

//     if (access_token) {
//       tokenStorage.setAccessToken(access_token);
//     }
//     if (refresh_token) {
//       tokenStorage.setRefreshToken(refresh_token);
//     }

//     return { user, access_token, refresh_token };
//   },
// // Inside resumeAuthService in apiClient.ts:

// googleLogin: async (googleToken: string) => {
//   // Check whether your backend docs expect "id_token", "token", or "credential"
//   const response = await apiClient.post("/auth/google-login/", {
//     id_token: googleToken,
//     credential: googleToken, // sending both covers standard Django and Google-default field names
//   });

//   const { access_token, refresh_token, user } = response.data;

//   if (access_token) {
//     tokenStorage.setAccessToken(access_token);
//   }
//   if (refresh_token) {
//     tokenStorage.setRefreshToken(refresh_token);
//   }

//   return { user, access_token, refresh_token };
// },
//   logout: async () => {
//     try {
//       const refreshToken = tokenStorage.getRefreshToken();
//       await apiClient.post("/api/resume/auth/logout/", {
//         refresh_token: refreshToken,
//       });
//     } catch (e) {
//       console.error("Logout error", e);
//     } finally {
//       tokenStorage.clearTokens();
//       if (typeof window !== "undefined") {
//         window.location.href = "/login";
//       }
//     }
//   },

//   refreshTokenDirectly: async () => {
//     const storedRefreshToken = tokenStorage.getRefreshToken();
//     const payload = storedRefreshToken ? { refresh: storedRefreshToken } : {};
    
//     const response = await apiClient.post("/api/resume/token/refresh/", payload);
//     const { access_token, refresh_token } = response.data;
    
//     if (access_token) tokenStorage.setAccessToken(access_token);
//     if (refresh_token) tokenStorage.setRefreshToken(refresh_token);
    
//     return response.data;
//   }
// };

// export default apiClient;















import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { API_URL } from "../config/api";

const API_BASE_URL = API_URL;

// Storage keys
const ACCESS_TOKEN_KEY = "resume_access_token";
const REFRESH_TOKEN_KEY = "resume_refresh_token";

// Helper utilities for token management
export const tokenStorage = {
  getAccessToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  setAccessToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
  },
  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  setRefreshToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    }
  },
  clearTokens: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  },
};

// Raw client strictly for auth operations to prevent interceptor loops
// Always sends credentials so HttpOnly cookies are attached
export const rawAuthClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Standard API Client for general requests
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor: Attach Access Token to outgoing requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = tokenStorage.getAccessToken();
    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Shared singleton promise to prevent duplicate refresh calls
let refreshPromise: Promise<string> | null = null;

export const executeTokenRefresh = async (): Promise<string> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      // Priority: Rely on the HttpOnly cookie automatically passed via withCredentials: true.
      // Fallback: If localStorage contains a token (for non-cookie fallbacks), pass it in the body.
      const fallbackToken = tokenStorage.getRefreshToken();
      const payload = fallbackToken ? { refresh: fallbackToken } : {};

      const response = await rawAuthClient.post("/token/refresh/", payload);

      const newAccessToken =
        response.data.access_token || response.data.access;
      const newRefreshToken =
        response.data.refresh_token || response.data.refresh;

      if (!newAccessToken) {
        throw new Error("No access token returned from refresh endpoint.");
      }

      tokenStorage.setAccessToken(newAccessToken);

      // If backend rotates token and returns it in JSON, sync storage
      if (newRefreshToken) {
        tokenStorage.setRefreshToken(newRefreshToken);
      }

      return newAccessToken;
    } catch (error) {
      tokenStorage.clearTokens();
      throw error;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

// Response Interceptor: Handles 401s and token refresh queue
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // Never intercept refresh or login 401s
      if (
        originalRequest.url?.includes("/auth/login/") ||
        originalRequest.url?.includes("/token/refresh/")
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const newAccessToken = await executeTokenRefresh();

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          window.location.href = "/login?session_expired=true";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
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
    const response = await rawAuthClient.post("/auth/login/", credentials);
    const { access_token, refresh_token, user } = response.data;

    if (access_token) {
      tokenStorage.setAccessToken(access_token);
    }
    if (refresh_token) {
      tokenStorage.setRefreshToken(refresh_token);
    }

    return { user, access_token, refresh_token };
  },

  googleLogin: async (googleToken: string) => {
    const response = await rawAuthClient.post("/auth/google-login/", {
      id_token: googleToken,
      credential: googleToken,
    });

    const { access_token, refresh_token, user } = response.data;

    if (access_token) {
      tokenStorage.setAccessToken(access_token);
    }
    if (refresh_token) {
      tokenStorage.setRefreshToken(refresh_token);
    }

    return { user, access_token, refresh_token };
  },

  logout: async () => {
    try {
      const refreshToken = tokenStorage.getRefreshToken();
      // Transmits both the HttpOnly cookie and body fallback
      await rawAuthClient.post("/api/resume/auth/logout/", {
        refresh_token: refreshToken,
      });
    } catch (e) {
      console.error("Logout error", e);
    } finally {
      tokenStorage.clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  },

  refreshTokenDirectly: async () => {
    return executeTokenRefresh();
  },
};

export default apiClient;