import { create } from "zustand";
import type { Theme } from "../themes/types";
import { themes, defaultTheme, getThemeById } from "../themes/themes";
import { saveTheme, loadTheme } from "../utils/localStorage";
import { logThemeError } from "../utils/errorLogger";

interface ThemeState {
  currentTheme: Theme;
  availableThemes: Theme[];
  setTheme: (themeId: string) => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: defaultTheme,
  availableThemes: themes,

  setTheme: (themeId: string) => {
    const theme = getThemeById(themeId);
    if (theme) {
      set({ currentTheme: theme });
      saveTheme(themeId);
      applyThemeToDOM(theme);
    } else {
      // Invalid theme ID, log error and fall back to default
      logThemeError("Invalid theme ID, falling back to default", undefined, {
        requestedThemeId: themeId,
        defaultThemeId: defaultTheme.id,
      });
      set({ currentTheme: defaultTheme });
      saveTheme(defaultTheme.id);
      applyThemeToDOM(defaultTheme);
    }
  },

  initializeTheme: () => {
    try {
      const savedThemeId = loadTheme();
      let themeToApply = defaultTheme;

      if (savedThemeId) {
        const theme = getThemeById(savedThemeId);
        if (theme) {
          themeToApply = theme;
        } else {
          // Invalid saved theme, log and use default
          logThemeError(
            "Saved theme ID not found, using default theme",
            undefined,
            { savedThemeId, defaultThemeId: defaultTheme.id }
          );
          // Clear invalid theme from storage
          saveTheme(defaultTheme.id);
        }
      }

      set({ currentTheme: themeToApply });
      applyThemeToDOM(themeToApply);
    } catch (error) {
      // Handle any errors during theme initialization
      logThemeError("Error initializing theme", error);
      set({ currentTheme: defaultTheme });
      applyThemeToDOM(defaultTheme);
    }
  },
}));

const applyThemeToDOM = (theme: Theme): void => {
  const root = document.documentElement;
  const { colors } = theme;

  root.style.setProperty("--color-background", colors.background);
  root.style.setProperty(
    "--color-background-gradient",
    colors.backgroundGradient || colors.background
  );
  root.style.setProperty("--color-surface", colors.surface);
  root.style.setProperty("--color-surface-hover", colors.surfaceHover);
  root.style.setProperty("--color-border", colors.border);
  root.style.setProperty("--color-text", colors.text);
  root.style.setProperty("--color-text-secondary", colors.textSecondary);
  root.style.setProperty("--color-primary", colors.primary);
  root.style.setProperty("--color-secondary", colors.secondary);
  root.style.setProperty("--color-accent", colors.accent);
  root.style.setProperty("--color-danger", colors.danger);
  root.style.setProperty("--color-shadow", colors.shadow);
  root.style.setProperty("--color-overlay", colors.overlay);
};
