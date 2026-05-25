import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from '@/app/config/api'; 
// 👇 Import your custom local storage functions here
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '@/app/utils/localStorage'; 

// 1. Create the custom axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL, 
});

// 2. Request Interceptor: Automatically attach access token using your getLocalStorage function
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Your getLocalStorage function already handles the server-side check safely!
    const accessToken = getLocalStorage<string>('access_token');
    
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor: Catch 401 errors, use refresh token, and save new access token
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 Unauthorized, your access token likely expired
    if (error.response?.status === 403 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loop chains

      try {
        // Use your custom function to get the refresh token
        const refreshToken = getLocalStorage<string>('refresh_token');

        if (!refreshToken) {
          handleLogout();
          return Promise.reject(error);
        }

        // Call your backend refresh route
        const res = await axios.post<{ access: string }>(
          `${API_URL}/token/refresh/`,
          { refresh: refreshToken }
        );

        console.log("res",res)

     //    const newAccessToken = res.data.access;
        
        // Use your custom function to save the new access token
     //    setLocalStorage<string>('access_token', newAccessToken);

        // Update the authorization header for the original failed request
     //    if (originalRequest.headers) {
     //      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
     //    }

        // Retry the original request automatically
     //    return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token expired too. Logging out...');
     //    handleLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Clean up local storage using your removeLocalStorage function on logout
function handleLogout(): void {
  removeLocalStorage('access_token');
  removeLocalStorage('refresh_token');
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

export default api;