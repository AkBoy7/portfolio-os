import { useWindowStore } from "../store/windowStore";
import type { Position, Size } from "../types";

export const useWindowManager = () => {
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    setWindowClosing,
  } = useWindowStore();

  const handleOpenWindow = (windowData: {
    id: string;
    title: string;
    icon?: React.ReactNode;
    content: React.ComponentType;
    position: Position;
    size: Size;
    minSize: Size;
  }) => {
    openWindow(windowData);
  };

  const handleCloseWindow = (id: string) => {
    // Set closing state for animation
    setWindowClosing(id, true);

    // Remove window after animation completes (350ms)
    setTimeout(() => {
      closeWindow(id);
    }, 350);
  };

  const handleMinimizeWindow = (id: string) => {
    minimizeWindow(id);
  };

  const handleMaximizeWindow = (id: string) => {
    const window = windows.find((w) => w.id === id);
    if (window?.isMaximized) {
      restoreWindow(id);
    } else {
      maximizeWindow(id);
    }
  };

  const handleRestoreWindow = (id: string) => {
    restoreWindow(id);
  };

  const handleFocusWindow = (id: string) => {
    focusWindow(id);
  };

  const handleUpdatePosition = (id: string, position: Position) => {
    updateWindowPosition(id, position);
  };

  const handleUpdateSize = (id: string, size: Size) => {
    updateWindowSize(id, size);
  };

  return {
    windows,
    openWindow: handleOpenWindow,
    closeWindow: handleCloseWindow,
    minimizeWindow: handleMinimizeWindow,
    maximizeWindow: handleMaximizeWindow,
    restoreWindow: handleRestoreWindow,
    focusWindow: handleFocusWindow,
    updatePosition: handleUpdatePosition,
    updateSize: handleUpdateSize,
  };
};
