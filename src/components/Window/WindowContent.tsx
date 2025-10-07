import React, { Suspense } from "react";
import { ErrorBoundary } from "../ErrorBoundary";
import styles from "./WindowContent.module.css";

interface WindowContentProps {
  children: React.ReactNode;
}

// Loading fallback component for lazy-loaded content
const LoadingFallback = () => (
  <div className={styles.loading}>
    <div className={styles.spinnerContainer} aria-label="Loading content">
      <svg
        className={styles.spinner}
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <div className={styles.spinnerDot} />
    </div>
    <p className={styles.loadingText}>Loading...</p>
  </div>
);

export const WindowContent: React.FC<WindowContentProps> = ({ children }) => {
  return (
    <div className={styles.content}>
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
      </ErrorBoundary>
    </div>
  );
};
