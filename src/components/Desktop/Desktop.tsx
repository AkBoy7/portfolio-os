import React from "react";
import { useWindowManager } from "../../hooks/useWindowManager";
import Wallpaper from "./Wallpaper";
import { Icon } from "../Icon";
import { iconConfigs } from "../../config/icons";
import {
  calculateCenteredPosition,
  calculateCascadedPosition,
} from "../../utils/windowHelpers";
import type { IconConfig } from "../../types";
import styles from "./Desktop.module.css";

interface DesktopProps {
  children?: React.ReactNode;
}

const Desktop: React.FC<DesktopProps> = ({ children }) => {
  const { windows, openWindow } = useWindowManager();

  const handleDesktopClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only deselect if clicking directly on desktop (not on children)
    if (e.target === e.currentTarget) {
      // Future: implement window deselection logic if needed
      // For now, clicking desktop doesn't affect window focus
    }
  };

  const handleIconDoubleClick = (config: IconConfig) => {
    // Calculate position for new window
    // Use cascaded positioning if multiple windows are open, otherwise center
    const position =
      windows.length > 0
        ? calculateCascadedPosition(windows.length, config.defaultSize)
        : calculateCenteredPosition(config.defaultSize);

    openWindow({
      id: config.id,
      title: config.windowTitle,
      icon: config.icon,
      content: config.windowContent,
      position,
      size: config.defaultSize,
      minSize: config.minSize,
    });
  };

  return (
    <main
      id="main-content"
      className={styles.desktop}
      onClick={handleDesktopClick}
      role="application"
      aria-label="Portfolio Desktop"
      tabIndex={-1}
    >
      <Wallpaper />
      <div className={styles.decorativeShapes}>
        <div className={styles.shape1} />
        <div className={styles.shape2} />
        <div className={styles.shape3} />
        <div className={styles.shape4} />
        <div className={styles.shape5} />
        <div className={styles.shape6} />
        <div className={styles.shape7} />
        <div className={styles.shape8} />
        <div className={styles.shape9} />
        <div className={styles.shape10} />
      </div>
      <div className={styles.content}>
        <nav aria-label="Portfolio sections">
          {iconConfigs.map((config) => (
            <Icon
              key={config.id}
              config={config}
              onDoubleClick={handleIconDoubleClick}
            />
          ))}
        </nav>
        {children}
      </div>
    </main>
  );
};

export default Desktop;
