import { useEffect, useRef } from "react";
import { useTheme } from "../../hooks/useTheme";
import { ThemeOption } from "./ThemeOption";
import styles from "./ThemeSwitcher.module.css";

interface ThemeSwitcherProps {
  onClose: () => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onClose }) => {
  const { currentTheme, availableThemes, setTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-focus the menu when it opens
    menuRef.current?.focus();
  }, []);

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    // Prevent clicks inside the menu from closing it
    e.stopPropagation();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div
        ref={menuRef}
        className={styles.themeMenu}
        role="dialog"
        aria-label="Theme selection"
        onClick={handleMenuClick}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div className={styles.menuHeader}>
          <h3>Choose Theme</h3>
        </div>
        <div
          className={styles.themeGrid}
          role="group"
          aria-label="Available themes"
        >
          {availableThemes.map((theme) => (
            <ThemeOption
              key={theme.id}
              theme={theme}
              isSelected={theme.id === currentTheme.id}
              onSelect={handleThemeSelect}
            />
          ))}
        </div>
      </div>
    </>
  );
};
