import { useState, useEffect } from "react";
import { useWindowStore } from "../../store/windowStore";
import { TaskbarItem } from "./TaskbarItem";
import { StartMenu } from "./StartMenu";
import styles from "./Taskbar.module.css";

interface TaskbarProps {
  onThemeClick: () => void;
  onHelpClick: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  onThemeClick,
  onHelpClick,
}) => {
  const windows = useWindowStore((state) => state.windows);
  const restoreWindow = useWindowStore((state) => state.restoreWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const handleWindowClick = (id: string) => {
    const window = windows.find((w) => w.id === id);
    if (window?.isMinimized) {
      restoreWindow(id);
    } else {
      // If window is already open, minimize it
      minimizeWindow(id);
    }
  };

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM AM/PM
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  // Format date as Day, Month Date
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <nav className={styles.taskbar} role="navigation" aria-label="Taskbar">
      <div className={styles.taskbarContent}>
        <button
          className={styles.startButton}
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          aria-label="Start menu"
          aria-expanded={isStartMenuOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </button>
        <div className={styles.windowsSection}>
          {windows.map((window) => (
            <TaskbarItem
              key={window.id}
              id={window.id}
              title={window.title}
              icon={window.icon}
              isMinimized={window.isMinimized}
              onClick={handleWindowClick}
            />
          ))}
        </div>
        <div className={styles.systemTray}>
          <button
            className={styles.trayButton}
            onClick={onThemeClick}
            aria-label="Change theme"
            title="Change theme"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
            </svg>
          </button>
          <button
            className={styles.trayButton}
            onClick={onHelpClick}
            aria-label="Keyboard shortcuts help"
            title="Keyboard shortcuts help"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </button>
          <div className={styles.clock} aria-live="polite" aria-atomic="true">
            <div className={styles.time}>{formatTime(currentTime)}</div>
            <div className={styles.date}>{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
      />
    </nav>
  );
};
