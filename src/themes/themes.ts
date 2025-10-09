import type { Theme } from "./types";

export const themes: Theme[] = [
  // 🌌 Pastel Twilight
  {
    id: "twilight",
    name: "Pastel Twilight",
    colors: {
      background: "#F1F3FF",
      surface: "#FFFFFF",
      surfaceHover: "#FAFAFF",
      border: "#B0A8FF",
      text: "#1A1530",
      textSecondary: "#3D3A5C",
      primary: "#B0A8FF",
      secondary: "#FFB3C6",
      accent: "#A7F0E1",
      danger: "#F76C6C",
      shadow: "rgba(0, 0, 0, 0.12)",
      overlay: "rgba(241, 243, 255, 0.9)",
    },
  },
  // 🌸 Sakura Dreams (Enhanced)
  {
    id: "sakura",
    name: "Sakura Dreams",
    colors: {
      background: "#FFF5F8",
      surface: "#FFFFFF",
      surfaceHover: "#FFE9F1",
      border: "#FF7BA5",
      text: "#2E1B2E",
      textSecondary: "#6A4C63",
      primary: "#FF69B4",
      secondary: "#FFC778",
      accent: "#A390EE",
      danger: "#E74C3C",
      shadow: "rgba(0, 0, 0, 0.1)",
      overlay: "rgba(255, 245, 248, 0.85)",
    },
  },

  // 💜 Dreamscape
  {
    id: "dreamscape",
    name: "Dreamscape",
    colors: {
      background: "#F3EEFB",
      surface: "#FFFFFF",
      surfaceHover: "#F9F7FD",
      border: "#A98DD8",
      text: "#1A0F2E",
      textSecondary: "#3D2E52",
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
      surface: "#FFFFFF",
      surfaceHover: "#FFF9F1",
      border: "#FFB46C",
      text: "#2D1A0A",
      textSecondary: "#523518",
      primary: "#FFB46C",
      secondary: "#FF9AA2",
      accent: "#FFD1B3",
      danger: "#D65C5C",
      shadow: "rgba(0, 0, 0, 0.1)",
      overlay: "rgba(255, 247, 232, 0.9)",
    },
  },
  {
    id: "otide",
    name: "Afternoon Tide",
    colors: {
      background: "#FFFDFB", // off-white sky backdrop
      surface: "#FFFFFF", // clean white for cards
      surfaceHover: "#F5FBFF", // faint water shimmer
      border: "#2C9ED8", // ocean blue edge
      text: "#142F3E", // dark navy for contrast
      textSecondary: "#3E6E82", // soft teal-blue
      primary: "#FF7A1F", // Buizel orange (main)
      secondary: "#FFD34E", // yellow flotation ring
      accent: "#2CA7E0", // bright water-blue
      danger: "#E64A3C", // coral red (pairs well with orange)
      shadow: "rgba(0, 0, 0, 0.1)",
      overlay: "rgba(240, 250, 255, 0.85)", // translucent ocean mist
    },
  },
];

export const defaultTheme = themes[0];

export const getThemeById = (id: string): Theme | undefined => {
  return themes.find((theme) => theme.id === id);
};
