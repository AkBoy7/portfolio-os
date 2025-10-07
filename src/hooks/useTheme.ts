import { useEffect } from "react";
import { useThemeStore } from "../store/themeStore";

export const useTheme = () => {
  const { currentTheme, availableThemes, setTheme, initializeTheme } =
    useThemeStore();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return {
    currentTheme,
    availableThemes,
    setTheme,
  };
};
