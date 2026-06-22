import axios, { AxiosInstance, AxiosResponse } from "axios";
import { API_URL } from "@/app/config/api";

// 🔐 Private variable inside this module scope (In-Memory Storage)
// This variable cannot be scraped or read by XSS attacks.
let _accessToken: string | null = null;

export const setInMemoryToken = (token: string | null) => {
  _accessToken = token;
};

export const getInMemoryToken = () => {
  return _accessToken;
};

// 1. Create the custom axios instance pointing directly to Python
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // 👈 Essential so the browser includes the refresh_token cookie
});

// Request Interceptor: Automatically inject the in-memory access token into headers
api.interceptors.request.use(
  (config) => {
    if (_accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${_accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: any[] = [];

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

// 2. Response Interceptor: Catch expired access tokens and perform a Silent Refresh
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if Python returned a 401 or 403 (Token Expired)
    const isUnauthorized = error.response?.status === 401 || error.response?.status === 403;
    const isRefreshRequest = originalRequest.url?.includes("/token/refresh/");

    if (isUnauthorized && originalRequest && !originalRequest._retry && !isRefreshRequest) {
      
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

      try {
        console.log("Access token expired. Requesting a new one using the refresh cookie...");

        // 3. Call your Python refresh endpoint
        // Because withCredentials is true, the browser automatically sends the secure refresh_token cookie!
        const response = await axios.post(`${API_URL}/token/refresh/`, {}, { withCredentials: true });

        // Grab the brand new access token from the response body
        const newAccessToken = response.data.access_token;
        
        // Update memory
        setInMemoryToken(newAccessToken);

        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); 
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        
        console.error("Refresh token cookie expired too. Logging out...");
        handleLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);






export async function handleLogout(): Promise<void> {
  // 1. Instantly wipe the short-lived access token from application memory
  setInMemoryToken(null); 
  
  if (typeof window !== "undefined") {
    try {
      console.log("Notifying backend to destroy the secure refresh token cookie...");
      
      // 2. Fire the logout request to your Python backend.
      // Note: Because this instance has 'withCredentials: true', the browser 
      // automatically passes the cookie along so the backend knows which session to kill.
      await api.post("/auth/logout/"); 
      
    } catch (err) {
      // Fail silently if the network is dead or the server errors out
      // so the user is never stuck trapped on the page.
      console.error("Backend cookie deletion failed or timed out:", err);
    } finally {
      // 3. Purge public layout cache data
      localStorage.removeItem("user_details");
      // 4. Forcibly redirect the window context back to the authentication gateway
      window.location.href = "/login";
    }
  }
}

export default api;









  