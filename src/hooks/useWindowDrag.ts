import { useCallback, useRef, useMemo } from "react";
import type { Position } from "../types";
import { logDragError } from "../utils/errorLogger";
import { rafThrottle } from "../utils/throttle";

interface UseWindowDragProps {
  windowId: string;
  currentPosition: Position;
  windowSize: { width: number; height: number };
  isMaximized: boolean;
  onDrag: (id: string, position: Position) => void;
  onFocus: (id: string) => void;
}

interface DragState {
  isDragging: boolean;
  startMousePos: Position;
  startWindowPos: Position;
}

export const useWindowDrag = ({
  windowId,
  currentPosition,
  windowSize,
  isMaximized,
  onDrag,
  onFocus,
}: UseWindowDragProps) => {
  const dragStateRef = useRef<DragState>({
    isDragging: false,
    startMousePos: { x: 0, y: 0 },
    startWindowPos: { x: 0, y: 0 },
  });

  // Calculate boundary constraints to keep window on screen
  const constrainPosition = useCallback(
    (position: Position): Position => {
      const titleBarHeight = 40; // Approximate title bar height
      const minVisibleWidth = 100; // Minimum visible width
      const minVisibleHeight = titleBarHeight; // At least title bar must be visible

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Constrain X position
      // Allow window to go off-screen but keep at least minVisibleWidth visible
      const maxX = viewportWidth - minVisibleWidth;
      const minX = -(windowSize.width - minVisibleWidth);
      const constrainedX = Math.max(minX, Math.min(maxX, position.x));

      // Constrain Y position
      // Keep title bar visible at top, allow window to go below viewport
      const minY = 0;
      const maxY = viewportHeight - minVisibleHeight;
      const constrainedY = Math.max(minY, Math.min(maxY, position.y));

      return {
        x: constrainedX,
        y: constrainedY,
      };
    },
    [windowSize.width, windowSize.height]
  );

  // Throttled mouse move handler for smooth 60fps performance
  const handleMouseMoveUnthrottled = useCallback(
    (e: MouseEvent) => {
      if (!dragStateRef.current.isDragging) return;

      try {
        // Calculate position delta
        const deltaX = e.clientX - dragStateRef.current.startMousePos.x;
        const deltaY = e.clientY - dragStateRef.current.startMousePos.y;

        // Calculate new position
        const newPosition: Position = {
          x: dragStateRef.current.startWindowPos.x + deltaX,
          y: dragStateRef.current.startWindowPos.y + deltaY,
        };

        // Apply boundary constraints
        const constrainedPosition = constrainPosition(newPosition);

        // Update window position in store
        onDrag(windowId, constrainedPosition);
      } catch (error) {
        logDragError("Error during window drag", error, { windowId });
        // Stop dragging on error
        dragStateRef.current.isDragging = false;
      }
    },
    [windowId, onDrag, constrainPosition]
  );

  // Use RAF throttle for smooth animation frame-based updates
  const handleMouseMove = useMemo(
    () => rafThrottle(handleMouseMoveUnthrottled),
    [handleMouseMoveUnthrottled]
  );

  const handleMouseUp = useCallback(() => {
    if (dragStateRef.current.isDragging) {
      dragStateRef.current.isDragging = false;

      // Remove event listeners
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      // Re-enable text selection
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }
  }, [handleMouseMove]);

  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      // Don't drag if window is maximized
      if (isMaximized) return;

      // Prevent dragging when clicking on buttons
      if ((e.target as HTMLElement).tagName === "BUTTON") {
        return;
      }

      e.preventDefault();

      // Bring window to front on drag start
      onFocus(windowId);

      // Initialize drag state
      dragStateRef.current = {
        isDragging: true,
        startMousePos: { x: e.clientX, y: e.clientY },
        startWindowPos: { ...currentPosition },
      };

      // Disable text selection during drag for smooth visual feedback
      document.body.style.userSelect = "none";
      document.body.style.cursor = "move";

      // Add event listeners
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [
      windowId,
      currentPosition,
      isMaximized,
      onFocus,
      handleMouseMove,
      handleMouseUp,
    ]
  );

  return {
    handleDragStart,
  };
};
