import { memo, useCallback } from "react";
import type { Theme } from "../../themes/types";
import styles from "./ThemeOption.module.css";

interface ThemeOptionProps {
  theme: Theme;
  isSelected: boolean;
  onSelect: (themeId: string) => void;
}

export const ThemeOption = memo(
  ({ theme, isSelected, onSelect }: ThemeOptionProps) => {
    const handleClick = useCallback(() => {
      onSelect(theme.id);
    }, [theme.id, onSelect]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(theme.id);
        }
      },
      [theme.id, onSelect]
    );

    return (
      <button
        className={`${styles.themeOption} ${isSelected ? styles.selected : ""}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={`Select ${theme.name} theme`}
        aria-pressed={isSelected}
      >
        <div className={styles.colorSwatches}>
          <div
            className={styles.swatch}
            style={{ backgroundColor: theme.colors.primary }}
            aria-hidden="true"
          />
          <div
            className={styles.swatch}
            style={{ backgroundColor: theme.colors.secondary }}
            aria-hidden="true"
          />
          <div
            className={styles.swatch}
            style={{ backgroundColor: theme.colors.accent }}
            aria-hidden="true"
          />
        </div>
        <span className={styles.themeName}>{theme.name}</span>
        {isSelected && (
          <span className={styles.checkmark} aria-label="Currently selected">
            ✓
          </span>
        )}
      </button>
    );
  }
);

ThemeOption.displayName = "ThemeOption";
