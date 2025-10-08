import React from "react";
import { Minus, Square, Copy, X } from "lucide-react";
import styles from "./WindowTitleBar.module.css";

interface WindowTitleBarProps {
  title: string;
  isMaximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onDragStart: (e: React.MouseEvent) => void;
}

export const WindowTitleBar: React.FC<WindowTitleBarProps> = ({
  title,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onDragStart,
}) => {
  return (
    <div className={styles.titleBar} onMouseDown={onDragStart}>
      <div className={styles.title}>{title}</div>
      <div className={styles.controls}>
        <button
          className={styles.minimizeButton}
          onClick={(e) => {
            e.stopPropagation();
            onMinimize();
          }}
          aria-label="Minimize window"
          title="Minimize"
        >
          <Minus size={16} />
        </button>
        <button
          className={styles.maximizeButton}
          onClick={(e) => {
            e.stopPropagation();
            onMaximize();
          }}
          aria-label={isMaximized ? "Restore window" : "Maximize window"}
          title={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? <Copy size={16} /> : <Square size={16} />}
        </button>
        <button
          className={styles.closeButton}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close window"
          title="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
