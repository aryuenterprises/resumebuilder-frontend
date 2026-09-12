import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
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

// Create Axios Instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Crucial: allows sending/receiving HttpOnly cookies with Django
});

// Request Interceptor: Attach Access Token to all Resume requests
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

// Response Interceptor: Refresh Token Logic with Request Queuing
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Check if error is 401 and request hasn't been retried yet
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      // Don't intercept 401s from login or refresh endpoints
      if (
        originalRequest.url?.includes("/api/resume/auth/login/") ||
        originalRequest.url?.includes("/api/resume/token/refresh/")
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If refresh is already in progress, enqueue this request
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const storedRefreshToken = tokenStorage.getRefreshToken();
        
        // Call the Resume App refresh endpoint
        // It accepts refresh token from HttpOnly cookie or explicit body
        const payload = storedRefreshToken ? { refresh: storedRefreshToken } : {};
        
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/api/resume/token/refresh/`,
          payload,
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.access_token;
        const newRefreshToken = refreshResponse.data.refresh_token;

        tokenStorage.setAccessToken(newAccessToken);
        if (newRefreshToken) {
          tokenStorage.setRefreshToken(newRefreshToken);
        }

        // Retry queued requests with new token
        processQueue(null, newAccessToken);

        // Retry original request
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh token expired or invalid -> logout user
        processQueue(refreshError, null);
        tokenStorage.clearTokens();

        if (typeof window !== "undefined") {
          window.location.href = "/login?session_expired=true";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ==========================================
// RESUME AUTH API HELPER METHODS
// ==========================================

export const resumeAuthService = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post("/auth/login/", credentials);
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
      await apiClient.post("/api/resume/auth/logout/", {
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
    const storedRefreshToken = tokenStorage.getRefreshToken();
    const payload = storedRefreshToken ? { refresh: storedRefreshToken } : {};
    
    const response = await apiClient.post("/api/resume/token/refresh/", payload);
    const { access_token, refresh_token } = response.data;
    
    if (access_token) tokenStorage.setAccessToken(access_token);
    if (refresh_token) tokenStorage.setRefreshToken(refresh_token);
    
    return response.data;
  }
};

export default apiClient;