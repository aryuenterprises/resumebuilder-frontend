export function getSessionStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading sessionStorage key "${key}":`, error);
    return null;
  }
}

export function setSessionStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting sessionStorage key "${key}":`, error);
  }
}

export function removeSessionStorage(key: string) {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(key);
}