import React, { useState, useEffect } from "react";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  onLoadComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoadComplete,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Animate loading dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    // Minimum loading time for smooth experience
    const minLoadTime = setTimeout(() => {
      setIsHidden(true);
      if (onLoadComplete) {
        // Wait for fade out animation to complete
        setTimeout(onLoadComplete, 500);
      }
    }, 1500);

    return () => {
      clearInterval(dotsInterval);
      clearTimeout(minLoadTime);
    };
  }, [onLoadComplete]);

  return (
    <div className={`${styles.loadingScreen} ${isHidden ? styles.hidden : ""}`}>
      <div className={styles.loadingContent}>
        <div className={styles.logo}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </div>
        <div className={styles.spinner} role="status" aria-label="Loading" />
        <div className={styles.loadingText}>
          Loading Portfolio OS
          <span className={styles.dots}>{dots}</span>
        </div>
      </div>
    </div>
  );
};
