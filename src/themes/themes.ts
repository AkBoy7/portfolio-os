import type { Theme } from "./types";

export const themes: Theme[] = [
  // 🌌 Pastel Twilight
  {
    id: "twilight",
    name: "Pastel Twilight",
    colors: {
      background: "#F1F3FF",
      backgroundGradient: "linear-gradient(135deg, #F1F3FF 0%, #EAE9FF 100%)",
      surface: "#FFFFFF",
      surfaceHover: "#FAFAFF",
      border: "#B0A8FF",
      text: "#2A2540",
      textSecondary: "#5C5785",
      primary: "#B0A8FF",
      secondary: "#FFB3C6",
      accent: "#A7F0E1",
      danger: "#F76C6C",
      shadow: "rgba(0, 0, 0, 0.12)",
      overlay: "rgba(241, 243, 255, 0.9)",
    },
  },
  // 🌸 Sakura Dreams (kept original)
  {
    id: "sakura",
    name: "Sakura Dreams",
    colors: {
      background: "#FFE8F0",
      backgroundGradient: "linear-gradient(135deg, #FFE8F0 0%, #FFD4E5 100%)",
      surface: "#FFFFFF",
      surfaceHover: "#FFF5F9",
      border: "#FF6B9D",
      text: "#2D1B2E",
      textSecondary: "#6B4C6D",
      primary: "#FF6B9D",
      secondary: "#FFB347",
      accent: "#7B68EE",
      danger: "#E63946",
      shadow: "rgba(0, 0, 0, 0.15)",
      overlay: "rgba(255, 232, 240, 0.9)",
    },
  },

  // 🌿 Mint Breeze (kept original)
  {
    id: "mint",
    name: "Mint Breeze",
    colors: {
      background: "#E8F8F5",
      backgroundGradient: "linear-gradient(135deg, #E8F8F5 0%, #D0F0E8 100%)",
      surface: "#FFFFFF",
      surfaceHover: "#F5FCFA",
      border: "#48C9B0",
      text: "#1A3A35",
      textSecondary: "#2E5F57",
      primary: "#48C9B0",
      secondary: "#F39C12",
      accent: "#E74C3C",
      danger: "#C0392B",
      shadow: "rgba(0, 0, 0, 0.15)",
      overlay: "rgba(232, 248, 245, 0.9)",
    },
  },

  // 💜 Dreamscape
  {
    id: "dreamscape",
    name: "Dreamscape",
    colors: {
      background: "#F3EEFB",
      backgroundGradient: "linear-gradient(135deg, #F3EEFB 0%, #E7E2FA 100%)",
      surface: "#FFFFFF",
      surfaceHover: "#F9F7FD",
      border: "#A98DD8",
      text: "#2E1D45",
      textSecondary: "#5C4B73",
      primary: "#A98DD8",
      secondary: "#7FDAD0",
      accent: "#FFC9A9",
      danger: "#EB6E6E",
      shadow: "rgba(0, 0, 0, 0.1)",
      overlay: "rgba(243, 238, 251, 0.9)",
    },
  },

  // 🍑 Apricot Glow
  {
    id: "apricot",
    name: "Apricot Glow",
    colors: {
      background: "#FFF7E8",
      backgroundGradient: "linear-gradient(135deg, #FFF7E8 0%, #FFEFD0 100%)",
      surface: "#FFFFFF",
      surfaceHover: "#FFF9F1",
      border: "#FFB46C",
      text: "#3D2714",
      textSecondary: "#6A4B2D",
      primary: "#FFB46C",
      secondary: "#FF9AA2",
      accent: "#FFD1B3",
      danger: "#D65C5C",
      shadow: "rgba(0, 0, 0, 0.1)",
      overlay: "rgba(255, 247, 232, 0.9)",
    },
  },
];

export const defaultTheme = themes[0];

export const getThemeById = (id: string): Theme | undefined => {
  return themes.find((theme) => theme.id === id);
};
