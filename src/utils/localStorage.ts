import { logStorageError } from "./errorLogger";

const THEME_STORAGE_KEY = "portfolio-theme";

export const saveTheme = (themeId: string): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
  } catch (error) {
    logStorageError("Failed to save theme to localStorage", error, {
      themeId,
    });
  }
};

export const loadTheme = (): string | null => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    logStorageError("Failed to load theme from localStorage", error);
    return null;
  }
};
