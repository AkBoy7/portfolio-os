import React, { memo, useCallback } from "react";
import styles from "./Icon.module.css";
import type { IconConfig } from "../../types";

interface IconProps {
  config: IconConfig;
  onDoubleClick: (config: IconConfig) => void;
}

export const Icon: React.FC<IconProps> = memo(({ config, onDoubleClick }) => {
  const isMobile = window.innerWidth < 768;

  const handleClick = useCallback(() => {
    // Use single click for all devices
    onDoubleClick(config);
  }, [config, onDoubleClick]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        onDoubleClick(config);
      }
    },
    [config, onDoubleClick]
  );

  return (
    <div
      className={styles.icon}
      style={
        isMobile
          ? {}
          : {
              left: `${config.position.x}px`,
              top: `${config.position.y}px`,
            }
      }
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Open ${config.label}`}
    >
      <div className={styles.iconImage}>
        {typeof config.icon === "string" ? (
          <img src={config.icon} alt="" />
        ) : (
          config.icon
        )}
      </div>
      <div className={styles.iconLabel}>{config.label}</div>
    </div>
  );
});

Icon.displayName = "Icon";
