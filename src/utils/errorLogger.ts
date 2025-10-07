/**
 * Error logging utility for debugging and monitoring
 */

export const ErrorCategory = {
  WINDOW_MANAGEMENT: "WindowManagement",
  THEME: "Theme",
  DRAG: "Drag",
  RESIZE: "Resize",
  STORAGE: "Storage",
  RENDER: "Render",
  UNKNOWN: "Unknown",
} as const;

export type ErrorCategory = (typeof ErrorCategory)[keyof typeof ErrorCategory];

interface ErrorLog {
  category: ErrorCategory;
  message: string;
  error?: Error | unknown;
  timestamp: Date;
  context?: Record<string, unknown>;
}

class ErrorLogger {
  private logs: ErrorLog[] = [];
  private maxLogs = 100; // Keep last 100 errors

  /**
   * Log an error with category and context
   */
  log(
    category: ErrorCategory,
    message: string,
    error?: Error | unknown,
    context?: Record<string, unknown>
  ): void {
    const errorLog: ErrorLog = {
      category,
      message,
      error,
      timestamp: new Date(),
      context,
    };

    // Add to logs array
    this.logs.push(errorLog);

    // Trim logs if exceeding max
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console log for debugging
    const errorMessage = `[${category}] ${message}`;
    if (error instanceof Error) {
      console.error(errorMessage, error, context);
    } else if (error) {
      console.error(errorMessage, error, context);
    } else {
      console.warn(errorMessage, context);
    }
  }

  /**
   * Get all logged errors
   */
  getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  /**
   * Get logs by category
   */
  getLogsByCategory(category: ErrorCategory): ErrorLog[] {
    return this.logs.filter((log) => log.category === category);
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Export logs as JSON string
   */
  exportLogs(): string {
    return JSON.stringify(
      this.logs.map((log) => ({
        ...log,
        error: log.error instanceof Error ? log.error.message : log.error,
        timestamp: log.timestamp.toISOString(),
      })),
      null,
      2
    );
  }
}

// Singleton instance
export const errorLogger = new ErrorLogger();

// Convenience functions
export const logWindowError = (
  message: string,
  error?: Error | unknown,
  context?: Record<string, unknown>
): void => {
  errorLogger.log(ErrorCategory.WINDOW_MANAGEMENT, message, error, context);
};

export const logThemeError = (
  message: string,
  error?: Error | unknown,
  context?: Record<string, unknown>
): void => {
  errorLogger.log(ErrorCategory.THEME, message, error, context);
};

export const logDragError = (
  message: string,
  error?: Error | unknown,
  context?: Record<string, unknown>
): void => {
  errorLogger.log(ErrorCategory.DRAG, message, error, context);
};

export const logResizeError = (
  message: string,
  error?: Error | unknown,
  context?: Record<string, unknown>
): void => {
  errorLogger.log(ErrorCategory.RESIZE, message, error, context);
};

export const logStorageError = (
  message: string,
  error?: Error | unknown,
  context?: Record<string, unknown>
): void => {
  errorLogger.log(ErrorCategory.STORAGE, message, error, context);
};

export const logRenderError = (
  message: string,
  error?: Error | unknown,
  context?: Record<string, unknown>
): void => {
  errorLogger.log(ErrorCategory.RENDER, message, error, context);
};
