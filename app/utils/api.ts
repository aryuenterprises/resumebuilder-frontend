/**
 * Backward compatibility bridge:
 * All API operations and token management have been unified in `apiClient.ts`.
 * This file forwards all legacy calls to `apiClient` to ensure zero regressions
 * across legacy imports.
 */

import apiClient, {
  tokenStorage,
  resumeAuthService,
  executeTokenRefresh,
  rawAuthClient,
} from "./apiClient";

// In-memory token bridge: forwards to tokenStorage
export const setInMemoryToken = (token: string | null): void => {
  if (token) {
    tokenStorage.setAccessToken(token);
  } else {
    tokenStorage.clearTokens();
  }
};

export const getInMemoryToken = (): string | null => {
  return tokenStorage.getAccessToken();
};

export const handleLogout = async (): Promise<void> => {
  await resumeAuthService.logout();
};

export const cleanupCookies = (): void => {
  // Retained for backward compatibility
};

export {
  apiClient,
  rawAuthClient,
  tokenStorage,
  resumeAuthService,
  executeTokenRefresh,
};

export default apiClient;
