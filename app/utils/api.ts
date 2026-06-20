// import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
// import { API_URL } from "@/app/config/api";
// import { getLocalStorage, setLocalStorage, removeLocalStorage } from "@/app/utils/localStorage";

// // 1. Create the custom axios instance
// const api: AxiosInstance = axios.create({
//   baseURL: API_URL,
// });

// // Variables to handle multiple simultaneous requests safely
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

// // 2. Request Interceptor: Automatically attach access token
// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const accessToken = getLocalStorage<string>("access_token");

//     if (accessToken && config.headers) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // 3. Response Interceptor: Catch expired tokens and refresh them
// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Standardizing to check for both 401 and 403 to prevent missed expiration errors
//     const isUnauthorized = error.response?.status === 401 || error.response?.status === 403;

//     if (isUnauthorized && originalRequest && !originalRequest._retry) {
      
//       // 🔒 If a refresh is ALREADY happening right now, make this request wait in line
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             if (originalRequest.headers) {
//               originalRequest.headers.Authorization = `Bearer ${token}`;
//             }
//             return api(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true; // Lock the door so only ONE request talks to /token/refresh/

//       try {
//         const refreshToken = getLocalStorage<string>("refresh_token");

//         if (!refreshToken) {
//           handleLogout();
//           return Promise.reject(error);
//         }

//         // Call your backend refresh route using your exact types!
//         const res = await axios.post<{
//           access_token: string;
//           refresh_token: string;
//         }>(`${API_URL}/token/refresh/`, { refresh: refreshToken });

//         console.log("Token Refresh Response:", res);

//         const newAccessToken = res.data.access_token;
//         const newRefreshToken = res.data.refresh_token;

//         // Save both fresh tokens using your custom local storage functions
//         setLocalStorage<string>("access_token", newAccessToken);
//         setLocalStorage<string>("refresh_token", newRefreshToken);

//         // Update the authorization header for the original failed request
//         if (originalRequest.headers) {
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         }

//         // 🔓 Success! Release the lock and fire all other paused requests with the new token
//         processQueue(null, newAccessToken);
//         isRefreshing = false;

//         return api(originalRequest);
//       } catch (refreshError) {
        
//         // If the refresh token endpoint completely rejects, the user's 30-day session is dead
//         processQueue(refreshError, null);
//         isRefreshing = false;
//         console.error("Refresh token expired too. Logging out...");
//         handleLogout();
//         alert("Session expired. Please log in again.");
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// function handleLogout(): void {
//   removeLocalStorage("access_token");
//   removeLocalStorage("refresh_token");
//     removeLocalStorage("refresh_token");

//   if (typeof window !== "undefined") {
//     window.location.href = "/login";
//   }
// }

// export default api;


















// import axios, { AxiosInstance, AxiosResponse } from "axios";
// import { API_URL } from "@/app/config/api";

// // 1. Create the custom axios instance pointing directly to Python
// const api: AxiosInstance = axios.create({
//   baseURL: API_URL,
//   withCredentials: true, // 👈 Tells the browser to automatically attach HttpOnly cookies
// });

// // A simple lock flag to prevent multiple refresh calls hitting Python at the exact same millisecond
// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any) => {
//   failedQueue.forEach((promise) => {
//     if (error) {
//       promise.reject(error);
//     } else {
//       promise.resolve();
//     }
//   });
//   failedQueue = [];
// };

// // 2. Response Interceptor: Catch expired tokens (401/403) and refresh them
// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if Python returned a 401 or 403 (Token Expired)
//     const isUnauthorized = error.response?.status === 401 || error.response?.status === 403;

//     if (isUnauthorized && originalRequest && !originalRequest._retry) {
      
//       // If a refresh is ALREADY happening in the background, make this request wait in line
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then(() => {
//             return api(originalRequest); // Retry with the new cookie once unlocked
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true; // Lock the door while talking to the refresh endpoint

//       try {
//         console.log("Access token cookie expired. Calling Python refresh API...");

//         // 3. Call your Python refresh endpoint
//         // Because withCredentials is true, the browser automatically sends the secure refresh_token cookie!
//         await axios.post(`${API_URL}/token/refresh/`, {}, { withCredentials: true });

//         console.log("Token cookie refreshed successfully!");

//         // 🔓 Success! Release the lock queue and retry all waiting requests
//         processQueue(null);
//         isRefreshing = false;

//         return api(originalRequest); // Retry the original request that failed
//       } catch (refreshError) {
//         // If the refresh token endpoint fails too, the user's total session is dead
//         processQueue(refreshError);
//         isRefreshing = false;
        
//         console.error("Refresh token expired too. Logging out...");
//         handleLogout();
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export function handleLogout(): void {
//   // Clear non-sensitive user profile details from localStorage
//   if (typeof window !== "undefined") {
//     localStorage.removeItem("user_details");
//     window.location.href = "/login";
//   }
// }

// export default api;






















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
        // handleLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export function handleLogout(): void {
  setInMemoryToken(null); // Clear memory
  if (typeof window !== "undefined") {
    localStorage.removeItem("user_details");
    window.location.href = "/login";
  }
}

export default api;








  