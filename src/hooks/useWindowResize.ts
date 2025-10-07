import { useCallback, useRef } from "react";
import type { Size } from "../types";
import { logResizeError } from "../utils/errorLogger";
import { rafThrottle } from "../utils/throttle";

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

interface UseWindowResizeProps {
  windowId: string;
  currentSize: Size;
  currentPosition: { x: number; y: number };
  minSize: Size;
  isMaximized: boolean;
  onResize: (id: string, size: Size) => void;
  onPositionChange?: (id: string, position: { x: number; y: number }) => void;
  onFocus: (id: string) => void;
}

export const useWindowResize = ({
  windowId,
  currentSize,
  currentPosition,
  minSize,
  isMaximized,
  onResize,
  onPositionChange,
  onFocus,
}: UseWindowResizeProps) => {
  const resizeStateRef = useRef<{
    isResizing: boolean;
    direction: ResizeDirection | null;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startPosX: number;
    startPosY: number;
  }>({
    isResizing: false,
    direction: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startPosX: 0,
    startPosY: 0,
  });

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: ResizeDirection) => {
      // Don't resize if maximized
      if (isMaximized) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      // Focus the window
      onFocus(windowId);

      resizeStateRef.current = {
        isResizing: true,
        direction,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: currentSize.width,
        startHeight: currentSize.height,
        startPosX: currentPosition.x,
        startPosY: currentPosition.y,
      };

      // Unthrottled resize handler
      const handleMouseMoveUnthrottled = (moveEvent: MouseEvent) => {
        if (!resizeStateRef.current.isResizing) return;

        try {
          const deltaX = moveEvent.clientX - resizeStateRef.current.startX;
          const deltaY = moveEvent.clientY - resizeStateRef.current.startY;

          let newWidth = resizeStateRef.current.startWidth;
          let newHeight = resizeStateRef.current.startHeight;
          let newX = resizeStateRef.current.startPosX;
          let newY = resizeStateRef.current.startPosY;

          const direction = resizeStateRef.current.direction;

          // Guard against null direction
          if (!direction) return;

          // Calculate new dimensions based on direction
          if (direction.includes("e")) {
            newWidth = Math.max(
              minSize.width,
              resizeStateRef.current.startWidth + deltaX
            );
          }
          if (direction.includes("w")) {
            const potentialWidth = resizeStateRef.current.startWidth - deltaX;
            if (potentialWidth >= minSize.width) {
              newWidth = potentialWidth;
              newX = resizeStateRef.current.startPosX + deltaX;
            }
          }
          if (direction.includes("s")) {
            newHeight = Math.max(
              minSize.height,
              resizeStateRef.current.startHeight + deltaY
            );
          }
          if (direction.includes("n")) {
            const potentialHeight = resizeStateRef.current.startHeight - deltaY;
            if (potentialHeight >= minSize.height) {
              newHeight = potentialHeight;
              newY = resizeStateRef.current.startPosY + deltaY;
            }
          }

          // Update size
          onResize(windowId, { width: newWidth, height: newHeight });

          // Update position if resizing from top or left
          if (
            (direction.includes("n") || direction.includes("w")) &&
            onPositionChange
          ) {
            onPositionChange(windowId, { x: newX, y: newY });
          }
        } catch (error) {
          logResizeError("Error during window resize", error, { windowId });
          // Stop resizing on error
          resizeStateRef.current.isResizing = false;
        }
      };

      // Throttle with RAF for smooth 60fps performance
      const handleMouseMove = rafThrottle(handleMouseMoveUnthrottled);

      const handleMouseUp = () => {
        resizeStateRef.current.isResizing = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
    },
    [
      windowId,
      currentSize,
      currentPosition,
      minSize,
      isMaximized,
      onResize,
      onPositionChange,
      onFocus,
    ]
  );

  return { handleResizeStart };
};
