import React from "react";
import styles from "./ResizeHandles.module.css";

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

interface ResizeHandlesProps {
  onResizeStart: (e: React.MouseEvent, direction: ResizeDirection) => void;
  isMaximized: boolean;
}

export const ResizeHandles: React.FC<ResizeHandlesProps> = ({
  onResizeStart,
  isMaximized,
}) => {
  // Don't render handles if window is maximized
  if (isMaximized) {
    return null;
  }

  return (
    <>
      {/* Edge handles */}
      <div
        className={`${styles.resizeHandle} ${styles.resizeN}`}
        onMouseDown={(e) => onResizeStart(e, "n")}
        aria-label="Resize north"
      />
      <div
        className={`${styles.resizeHandle} ${styles.resizeS}`}
        onMouseDown={(e) => onResizeStart(e, "s")}
        aria-label="Resize south"
      />
      <div
        className={`${styles.resizeHandle} ${styles.resizeE}`}
        onMouseDown={(e) => onResizeStart(e, "e")}
        aria-label="Resize east"
      />
      <div
        className={`${styles.resizeHandle} ${styles.resizeW}`}
        onMouseDown={(e) => onResizeStart(e, "w")}
        aria-label="Resize west"
      />

      {/* Corner handles */}
      <div
        className={`${styles.resizeHandle} ${styles.resizeNE}`}
        onMouseDown={(e) => onResizeStart(e, "ne")}
        aria-label="Resize northeast"
      />
      <div
        className={`${styles.resizeHandle} ${styles.resizeNW}`}
        onMouseDown={(e) => onResizeStart(e, "nw")}
        aria-label="Resize northwest"
      />
      <div
        className={`${styles.resizeHandle} ${styles.resizeSE}`}
        onMouseDown={(e) => onResizeStart(e, "se")}
        aria-label="Resize southeast"
      />
      <div
        className={`${styles.resizeHandle} ${styles.resizeSW}`}
        onMouseDown={(e) => onResizeStart(e, "sw")}
        aria-label="Resize southwest"
      />
    </>
  );
};
