import React, { Suspense } from "react";
import { ErrorBoundary } from "../ErrorBoundary";
import styles from "./WindowContent.module.css";

interface WindowContentProps {
  children: React.ReactNode;
}

// Loading fallback component for lazy-loaded content
const LoadingFallback = () => (
  <div className={styles.loading}>
    <div className={styles.spinner} aria-label="Loading content">
      ⏳
    </div>
    <p>Loading...</p>
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
