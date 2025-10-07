import { create } from "zustand";
import type { WindowState, Position, Size } from "../types";
import {
  validatePosition,
  validateSize,
  constrainPosition,
} from "../utils/windowHelpers";
import { logWindowError } from "../utils/errorLogger";

const MAX_WINDOWS = 8; // Maximum number of open windows for performance

interface WindowStore {
  windows: WindowState[];
  zIndexCounter: number;

  // Actions
  openWindow: (
    window: Omit<
      WindowState,
      "zIndex" | "isMinimized" | "isMaximized" | "isClosing"
    >
  ) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: Position) => void;
  updateWindowSize: (id: string, size: Size) => void;
  setWindowClosing: (id: string, isClosing: boolean) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  zIndexCounter: 100,

  openWindow: (windowData) => {
    const { windows, zIndexCounter } = get();

    // Check if window already exists
    const existingWindow = windows.find((w) => w.id === windowData.id);

    if (existingWindow) {
      // If window exists and is minimized, restore it
      if (existingWindow.isMinimized) {
        get().restoreWindow(windowData.id);
      } else {
        // Just bring to front
        get().focusWindow(windowData.id);
      }
      return;
    }

    // Check window limit (excluding minimized windows)
    const openWindowCount = windows.filter((w) => !w.isMinimized).length;
    if (openWindowCount >= MAX_WINDOWS) {
      logWindowError(
        `Maximum window limit (${MAX_WINDOWS}) reached`,
        undefined,
        { windowId: windowData.id, openWindowCount }
      );
      return;
    }

    // Validate and constrain position and size
    const validatedPosition = validatePosition(
      windowData.position,
      windowData.size
    );
    const validatedSize = validateSize(windowData.size, windowData.minSize);

    // Create new window with highest z-index
    const newWindow: WindowState = {
      ...windowData,
      position: validatedPosition,
      size: validatedSize,
      zIndex: zIndexCounter,
      isMinimized: false,
      isMaximized: false,
      isClosing: false,
    };

    set({
      windows: [...windows, newWindow],
      zIndexCounter: zIndexCounter + 1,
    });
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id === id) {
          // Just set minimized flag, keep all other state including size/position
          // This ensures the window remembers its size when restored
          return { ...w, isMinimized: true };
        }
        return w;
      }),
    }));
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id === id && !w.isMaximized) {
          // Calculate maximized size (full viewport minus taskbar)
          const taskbarHeight = 60; // Height of taskbar
          const maxWidth = window.innerWidth;
          const maxHeight = window.innerHeight - taskbarHeight;

          return {
            ...w,
            isMaximized: true,
            previousPosition: w.position,
            previousSize: w.size,
            position: { x: 0, y: 0 },
            size: { width: maxWidth, height: maxHeight },
          };
        } else if (w.id !== id) {
          // Minimize all other windows when maximizing one
          return { ...w, isMinimized: true };
        }
        return w;
      }),
    }));
  },

  restoreWindow: (id) => {
    set((state) => {
      const { zIndexCounter } = state;
      return {
        windows: state.windows.map((w) => {
          if (w.id === id) {
            // Restore from maximized state
            if (w.isMaximized && w.previousPosition && w.previousSize) {
              const validatedPosition = validatePosition(
                w.previousPosition,
                w.previousSize
              );
              const validatedSize = validateSize(w.previousSize, w.minSize);

              return {
                ...w,
                isMaximized: false,
                position: validatedPosition,
                size: validatedSize,
                previousPosition: undefined,
                previousSize: undefined,
                zIndex: zIndexCounter,
              };
            }
            // Restore from minimized state
            else if (w.isMinimized) {
              const validatedPosition = validatePosition(w.position, w.size);
              const validatedSize = validateSize(w.size, w.minSize);

              return {
                ...w,
                isMinimized: false,
                position: validatedPosition,
                size: validatedSize,
                zIndex: zIndexCounter,
              };
            }
          }
          return w;
        }),
        zIndexCounter: zIndexCounter + 1,
      };
    });
  },

  focusWindow: (id) => {
    const { zIndexCounter } = get();
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, zIndex: zIndexCounter } : w
      ),
      zIndexCounter: zIndexCounter + 1,
    });
  },

  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id === id) {
          // Validate and constrain position
          const validatedPosition = validatePosition(position, w.size);
          return { ...w, position: validatedPosition };
        }
        return w;
      }),
    }));
  },

  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id === id) {
          // Validate and constrain size
          const validatedSize = validateSize(size, w.minSize);
          // Also constrain position in case window is now too large
          const validatedPosition = constrainPosition(
            w.position,
            validatedSize
          );
          return { ...w, size: validatedSize, position: validatedPosition };
        }
        return w;
      }),
    }));
  },

  setWindowClosing: (id, isClosing) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isClosing } : w
      ),
    }));
  },
}));
