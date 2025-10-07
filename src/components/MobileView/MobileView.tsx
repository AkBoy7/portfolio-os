import { useState } from "react";
import { iconConfigs } from "../../config/icons";
import type { IconConfig } from "../../types";
import { InfoWidget } from "./InfoWidget";
import styles from "./MobileView.module.css";

interface MobileViewProps {
  onThemeClick: () => void;
}

export const MobileView: React.FC<MobileViewProps> = ({ onThemeClick }) => {
  const [openApp, setOpenApp] = useState<IconConfig | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [showHome, setShowHome] = useState(true);

  const handleAppOpen = (config: IconConfig) => {
    setShowHome(false);
    setOpenApp(config);
  };

  const handleAppClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenApp(null);
      setIsClosing(false);
      // Small delay before showing home to prevent flash
      setTimeout(() => {
        setShowHome(true);
      }, 50);
    }, 300);
  };

  const formatTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours}:${displayMinutes}`;
  };

  const ContentComponent = openApp?.windowContent;

  return (
    <>
      {/* Home Screen - always rendered */}
      <div
        className={`${styles.homeScreen} ${showHome ? styles.fadeIn : ""}`}
        style={{ visibility: openApp || isClosing ? "hidden" : "visible" }}
      >
        <div className={styles.decorativeShapes}>
          <div className={styles.mobileShape1} />
          <div className={styles.mobileShape2} />
          <div className={styles.mobileShape3} />
        </div>
        <div className={styles.statusBar}>
          <span className={styles.time}>{formatTime()}</span>
          <div className={styles.statusIcons}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={styles.statusIcon}
            >
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={styles.statusIcon}
            >
              <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
            </svg>
          </div>
        </div>

        <div className={styles.appGrid}>
          {iconConfigs.map((config) => (
            <button
              key={config.id}
              className={styles.appIcon}
              onClick={() => handleAppOpen(config)}
              aria-label={`Open ${config.label}`}
            >
              <div className={styles.iconWrapper}>{config.icon}</div>
              <span className={styles.appLabel}>{config.label}</span>
            </button>
          ))}
        </div>

        <InfoWidget onThemeClick={onThemeClick} />

        <div className={styles.pageIndicator}>
          <span className={styles.dot} />
        </div>
      </div>

      {/* App View - rendered on top when open */}
      {(openApp || isClosing) && ContentComponent && (
        <div className={`${styles.appView} ${isClosing ? styles.closing : ""}`}>
          <div className={styles.statusBar}>
            <span className={styles.time}>{formatTime()}</span>
            <div className={styles.statusIcons}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={styles.statusIcon}
              >
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
              </svg>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={styles.statusIcon}
              >
                <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
              </svg>
            </div>
          </div>
          <div className={styles.appHeader}>
            <button
              className={styles.closeButton}
              onClick={handleAppClose}
              aria-label="Close app"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h1 className={styles.appTitle}>{openApp?.windowTitle}</h1>
            <button
              className={styles.themeButton}
              onClick={onThemeClick}
              aria-label="Change theme"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            </button>
          </div>
          <div className={styles.appContent}>
            <ContentComponent />
          </div>
        </div>
      )}
    </>
  );
};
