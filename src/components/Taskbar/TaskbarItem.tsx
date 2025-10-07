import { memo, useCallback } from "react";
import styles from "./TaskbarItem.module.css";

interface TaskbarItemProps {
  id: string;
  title: string;
  isMinimized?: boolean;
  onClick: (id: string) => void;
}

export const TaskbarItem = memo(
  ({ id, title, isMinimized, onClick }: TaskbarItemProps) => {
    const handleClick = useCallback(() => {
      onClick(id);
    }, [id, onClick]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(id);
        }
      },
      [id, onClick]
    );

    const itemClasses = [styles.taskbarItem, isMinimized && styles.minimized]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        className={itemClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={isMinimized ? `Restore ${title}` : `Minimize ${title}`}
        title={title}
      >
        <span className={styles.title}>{title}</span>
      </button>
    );
  }
);

TaskbarItem.displayName = "TaskbarItem";
