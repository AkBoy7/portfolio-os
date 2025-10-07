import { useEffect, useRef } from "react";
import styles from "./KeyboardShortcutsHelp.module.css";

interface KeyboardShortcutsHelpProps {
  onClose: () => void;
}

export const KeyboardShortcutsHelp: React.FC<KeyboardShortcutsHelpProps> = ({
  onClose,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-focus the dialog when it opens
    dialogRef.current?.focus();
  }, []);

  const handleDialogClick = (e: React.MouseEvent) => {
    // Prevent clicks inside the dialog from closing it
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
        ref={dialogRef}
        className={styles.helpDialog}
        role="dialog"
        aria-label="Help and shortcuts"
        onClick={handleDialogClick}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div className={styles.header}>
          <h2>Help & Tips</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close help"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className={styles.content}>
          <section className={styles.section}>
            <h3>Getting Started</h3>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <div className={styles.tipContent}>
                <strong>Double-click icons</strong> on the left to open apps
              </div>
            </div>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 3v18" />
                </svg>
              </div>
              <div className={styles.tipContent}>
                <strong>Drag windows</strong> by their title bar to move them
                around
              </div>
            </div>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.tipContent}>
                <strong>Resize windows</strong> by dragging the corners or edges
              </div>
            </div>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </div>
              <div className={styles.tipContent}>
                <strong>Open multiple windows</strong> at once to multitask
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3>Keyboard Shortcuts</h3>
            <dl className={styles.shortcutList}>
              <dt>Escape</dt>
              <dd>Close window</dd>
              <dt>Alt + M</dt>
              <dd>Minimize window</dd>
              <dt>Alt + Enter</dt>
              <dd>Maximize/restore window</dd>
            </dl>
          </section>
        </div>
      </div>
    </>
  );
};
