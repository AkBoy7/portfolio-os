export interface ThemeColors {
  // Desktop
  background: string;
  backgroundGradient?: string;

  // Windows
  surface: string;
  surfaceHover: string;
  border: string;

  // Text
  text: string;
  textSecondary: string;

  // Buttons
  primary: string;
  secondary: string;
  accent: string;
  danger: string;

  // Effects
  shadow: string;
  overlay: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
}
