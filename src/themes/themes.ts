import type { Theme } from "./types";

export const themes: Theme[] = [
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
  {
    id: "lavender",
    name: "Lavender Fields",
    colors: {
      background: "#F0EDF7",
      backgroundGradient: "linear-gradient(135deg, #F0EDF7 0%, #E0D9F0 100%)",
      surface: "#FFFFFF",
      surfaceHover: "#F8F6FB",
      border: "#9B59B6",
      text: "#2C1A3D",
      textSecondary: "#5D4A6F",
      primary: "#9B59B6",
      secondary: "#3498DB",
      accent: "#F1C40F",
      danger: "#E74C3C",
      shadow: "rgba(0, 0, 0, 0.15)",
      overlay: "rgba(240, 237, 247, 0.9)",
    },
  },
  {
    id: "peach",
    name: "Peachy Keen",
    colors: {
      background: "#FFF4E6",
      backgroundGradient: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)",
      surface: "#FFFFFF",
      surfaceHover: "#FFFAF2",
      border: "#FF8C42",
      text: "#3D2817",
      textSecondary: "#6B4E3D",
      primary: "#FF8C42",
      secondary: "#16A085",
      accent: "#E056FD",
      danger: "#C0392B",
      shadow: "rgba(0, 0, 0, 0.15)",
      overlay: "rgba(255, 244, 230, 0.9)",
    },
  },
];

export const defaultTheme = themes[0];

export const getThemeById = (id: string): Theme | undefined => {
  return themes.find((theme) => theme.id === id);
};
