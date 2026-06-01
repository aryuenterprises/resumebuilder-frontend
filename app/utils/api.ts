// import axios, {
//   AxiosInstance,
//   InternalAxiosRequestConfig,
//   AxiosResponse,
// } from "axios";
// import { API_URL } from "@/app/config/api";
// // 👇 Import your custom local storage functions here
// import {
//   getLocalStorage,
//   setLocalStorage,
//   removeLocalStorage,
// } from "@/app/utils/localStorage";

// // 1. Create the custom axios instance
// const api: AxiosInstance = axios.create({
//   baseURL: API_URL,
// });

// // 2. Request Interceptor: Automatically attach access token using your getLocalStorage function
// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     // Your getLocalStorage function already handles the server-side check safely!
//     const accessToken = getLocalStorage<string>("access_token");

//     if (accessToken && config.headers) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // 3. Response Interceptor: Catch 401 errors, use refresh token, and save new access token
// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If the error is 401 Unauthorized, your access token likely expired
//     if (
//       error.response?.status === 403 &&
//       originalRequest &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true; // Prevent infinite loop chains

//       try {
//         // Use your custom function to get the refresh token
//         const refreshToken = getLocalStorage<string>("refresh_token");

//         if (!refreshToken) {
//           handleLogout();
//           return Promise.reject(error);
//         }

//         // Call your backend refresh route
//         const res = await axios.post<{
//           access_token: string;
//           refresh_token: string;
//         }>(`${API_URL}/token/refresh/`, { refresh: refreshToken });

//         console.log("res", res);

//         const newAccessToken = res.data.access_token;
//         const newRefreshToken = res.data.refresh_token;

//         // Use your custom function to save the new access token
//         setLocalStorage<string>("access_token", newAccessToken);
//         setLocalStorage<string>("refresh_token", newRefreshToken);

//         // Update the authorization header for the original failed request
//         if (originalRequest.headers) {
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         }

//         // Retry the original request automatically
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh token expired too. Logging out...");
//         handleLogout();
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// // Clean up local storage using your removeLocalStorage function on logout
// function handleLogout(): void {
//   removeLocalStorage("access_token");
//   removeLocalStorage("refresh_token");
//   if (typeof window !== "undefined") {
//     window.location.href = "/login";
//   }
// }

// export default api;















import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { API_URL } from "@/app/config/api";
import { getLocalStorage, setLocalStorage, removeLocalStorage } from "@/app/utils/localStorage";

// 1. Create the custom axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

// Variables to handle multiple simultaneous requests safely
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

// 2. Request Interceptor: Automatically attach access token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getLocalStorage<string>("access_token");

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 3. Response Interceptor: Catch expired tokens and refresh them
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // Standardizing to check for both 401 and 403 to prevent missed expiration errors
    const isUnauthorized = error.response?.status === 401 || error.response?.status === 403;

    if (isUnauthorized && originalRequest && !originalRequest._retry) {
      
      // 🔒 If a refresh is ALREADY happening right now, make this request wait in line
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true; // Lock the door so only ONE request talks to /token/refresh/

      try {
        const refreshToken = getLocalStorage<string>("refresh_token");

        if (!refreshToken) {
          handleLogout();
          return Promise.reject(error);
        }

        // Call your backend refresh route using your exact types!
        const res = await axios.post<{
          access_token: string;
          refresh_token: string;
        }>(`${API_URL}/token/refresh/`, { refresh: refreshToken });

        console.log("Token Refresh Response:", res);

        const newAccessToken = res.data.access_token;
        const newRefreshToken = res.data.refresh_token;

        // Save both fresh tokens using your custom local storage functions
        setLocalStorage<string>("access_token", newAccessToken);
        setLocalStorage<string>("refresh_token", newRefreshToken);

        // Update the authorization header for the original failed request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // 🔓 Success! Release the lock and fire all other paused requests with the new token
        processQueue(null, newAccessToken);
        isRefreshing = false;

        return api(originalRequest);
      } catch (refreshError) {
        
        // If the refresh token endpoint completely rejects, the user's 30-day session is dead
        processQueue(refreshError, null);
        isRefreshing = false;
        console.error("Refresh token expired too. Logging out...");
        // handleLogout();
        alert("Session expired. Please log in again.");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

function handleLogout(): void {
  removeLocalStorage("access_token");
  removeLocalStorage("refresh_token");
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

export default api;
