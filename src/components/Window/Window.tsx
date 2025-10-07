import React, { useEffect, useState, useRef, useCallback } from "react";
import { WindowTitleBar } from "./WindowTitleBar";
import { WindowContent } from "./WindowContent";
import { ResizeHandles } from "./ResizeHandles";
import { useWindowDrag } from "../../hooks/useWindowDrag";
import { useWindowResize } from "../../hooks/useWindowResize";
import { useWindowStore } from "../../store/windowStore";
import styles from "./Window.module.css";
import type { WindowState } from "../../types";

interface WindowProps extends WindowState {
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onRestore: (id: string) => void;
  onFocus: (id: string) => void;
  onDrag: (id: string, position: { x: number; y: number }) => void;
  onResize: (id: string, size: { width: number; height: number }) => void;
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  content: ContentComponent,
  position,
  size,
  zIndex,
  isMinimized,
  isMaximized,
  isClosing,
  minSize,
  onClose,
  onMinimize,
  onMaximize,
  onRestore,
  onFocus,
  onDrag,
  onResize,
}) => {
  const [isOpening, setIsOpening] = useState(true);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isMaximizing, setIsMaximizing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [prevMaximizedState, setPrevMaximizedState] = useState(isMaximized);
  const [isFocused, setIsFocused] = useState(false);

  // Refs for focus management
  const windowRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Get all windows to determine if this window is focused (has highest z-index)
  const windows = useWindowStore((state) => state.windows);

  // Check if mobile device
  const isMobile = window.innerWidth < 768;

  // Initialize window drag hook (disabled on mobile)
  const { handleDragStart } = useWindowDrag({
    windowId: id,
    currentPosition: position,
    windowSize: size,
    isMaximized,
    onDrag,
    onFocus,
  });

  // Initialize window resize hook
  const { handleResizeStart } = useWindowResize({
    windowId: id,
    currentSize: size,
    currentPosition: position,
    minSize,
    isMaximized,
    onResize,
    onPositionChange: onDrag,
    onFocus,
  });

  // Handle opening animation and focus management
  useEffect(() => {
    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    const timer = setTimeout(() => {
      setIsOpening(false);
      // Focus the window after opening animation
      if (windowRef.current) {
        windowRef.current.focus();
      }
    }, 400); // Match animation duration

    return () => {
      clearTimeout(timer);
      // Return focus to previous element when window closes
      if (
        previousFocusRef.current &&
        previousFocusRef.current !== document.body
      ) {
        previousFocusRef.current.focus();
      }
    };
  }, []);

  // Track focus state based on z-index
  // A window is focused if it has the highest z-index among all visible windows
  useEffect(() => {
    const visibleWindows = windows.filter((w) => !w.isMinimized);
    const maxZIndex = Math.max(...visibleWindows.map((w) => w.zIndex));
    const isCurrentlyFocused =
      zIndex === maxZIndex && visibleWindows.length > 0;
    setIsFocused(isCurrentlyFocused);
  }, [zIndex, windows]);

  // Handle maximize/restore animation
  useEffect(() => {
    if (isMaximized !== prevMaximizedState) {
      if (isMaximized) {
        // Maximizing
        setIsMaximizing(true);
        const timer = setTimeout(() => {
          setIsMaximizing(false);
        }, 300);
        return () => clearTimeout(timer);
      } else {
        // Restoring
        setIsRestoring(true);
        const timer = setTimeout(() => {
          setIsRestoring(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
    setPrevMaximizedState(isMaximized);
  }, [isMaximized, prevMaximizedState]);

  const handleWindowClick = useCallback(() => {
    onFocus(id);
    setIsFocused(true);
  }, [id, onFocus]);

  const handleClose = useCallback(() => {
    onClose(id);
  }, [id, onClose]);

  const handleMinimize = useCallback(() => {
    // Trigger minimize animation
    setIsMinimizing(true);

    // Wait for animation to complete before actually minimizing
    setTimeout(() => {
      onMinimize(id);
      setIsMinimizing(false);
    }, 300); // Match animation duration
  }, [id, onMinimize]);

  const handleMaximize = useCallback(() => {
    if (isMaximized) {
      onRestore(id);
    } else {
      onMaximize(id);
    }
  }, [id, isMaximized, onRestore, onMaximize]);

  // Keyboard shortcuts handler
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Escape to close window
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
      // Alt+M to minimize
      else if (e.altKey && e.key === "m") {
        e.preventDefault();
        handleMinimize();
      }
      // Alt+Enter to maximize/restore
      else if (e.altKey && e.key === "Enter") {
        e.preventDefault();
        handleMaximize();
      }
    },
    [handleClose, handleMinimize, handleMaximize]
  );

  // Don't render if minimized (unless animating)
  if (isMinimized && !isMinimizing) {
    return null;
  }

  const windowClasses = [
    styles.window,
    isFocused && styles.focused,
    isOpening && styles.opening,
    isClosing && styles.closing,
    isMinimizing && styles.minimizing,
    isMaximizing && styles.maximizing,
    isRestoring && styles.restoring,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={windowRef}
      className={windowClasses}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex,
      }}
      onClick={handleWindowClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-label={title}
      aria-modal="false"
      tabIndex={-1}
    >
      <WindowTitleBar
        title={title}
        isMaximized={isMaximized}
        onClose={handleClose}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        onDragStart={isMobile ? () => {} : handleDragStart}
      />
      <WindowContent>
        <ContentComponent />
      </WindowContent>
      <ResizeHandles
        onResizeStart={handleResizeStart}
        isMaximized={isMaximized}
      />
    </div>
  );
};
