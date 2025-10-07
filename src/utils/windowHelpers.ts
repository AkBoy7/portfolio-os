import type { Position, Size } from "../types";
import { logWindowError } from "./errorLogger";

/**
 * Calculate a centered position for a window
 */
export const calculateCenteredPosition = (
  windowSize: Size,
  viewportWidth: number = window.innerWidth,
  viewportHeight: number = window.innerHeight
): Position => {
  const taskbarHeight = 60; // Height of taskbar
  const availableHeight = viewportHeight - taskbarHeight;

  const x = (viewportWidth - windowSize.width) / 2;
  const y = (availableHeight - windowSize.height) / 2;

  return {
    x: Math.max(0, x),
    y: Math.max(0, y),
  };
};

/**
 * Calculate a cascaded position for a window (offset from previous windows)
 */
export const calculateCascadedPosition = (
  windowCount: number,
  windowSize: Size,
  viewportWidth: number = window.innerWidth,
  viewportHeight: number = window.innerHeight
): Position => {
  const offset = 40; // Pixels to offset each window
  const maxOffset = 200; // Maximum offset before resetting

  // Calculate offset with wrapping
  const totalOffset = (windowCount * offset) % maxOffset;

  // Start from a base position (slightly off-center)
  const baseX = (viewportWidth - windowSize.width) / 2 - 100;
  const baseY = (viewportHeight - windowSize.height) / 2 - 100;

  return {
    x: Math.max(
      0,
      Math.min(baseX + totalOffset, viewportWidth - windowSize.width)
    ),
    y: Math.max(
      0,
      Math.min(baseY + totalOffset, viewportHeight - windowSize.height)
    ),
  };
};

/**
 * Constrain a position to stay within viewport bounds
 */
export const constrainPosition = (
  position: Position,
  windowSize: Size,
  viewportWidth: number = window.innerWidth,
  viewportHeight: number = window.innerHeight,
  minVisibleHeight: number = 40 // Minimum title bar height that must be visible
): Position => {
  return {
    x: Math.max(
      -(windowSize.width - minVisibleHeight),
      Math.min(position.x, viewportWidth - minVisibleHeight)
    ),
    y: Math.max(0, Math.min(position.y, viewportHeight - minVisibleHeight)),
  };
};

/**
 * Constrain a size to stay within bounds
 */
export const constrainSize = (
  size: Size,
  minSize: Size,
  maxWidth: number = window.innerWidth,
  maxHeight: number = window.innerHeight
): Size => {
  return {
    width: Math.max(minSize.width, Math.min(size.width, maxWidth)),
    height: Math.max(minSize.height, Math.min(size.height, maxHeight)),
  };
};

/**
 * Check if a position is valid (within reasonable bounds)
 */
export const isValidPosition = (
  position: Position,
  viewportWidth: number = window.innerWidth,
  viewportHeight: number = window.innerHeight
): boolean => {
  return (
    position.x > -viewportWidth &&
    position.x < viewportWidth * 2 &&
    position.y > -viewportHeight &&
    position.y < viewportHeight * 2
  );
};

/**
 * Validate and fix invalid window position
 * Returns a valid position, resetting to center if invalid
 */
export const validatePosition = (
  position: Position | undefined,
  windowSize: Size,
  viewportWidth: number = window.innerWidth,
  viewportHeight: number = window.innerHeight
): Position => {
  // If position is undefined or invalid, return centered position
  if (
    !position ||
    typeof position.x !== "number" ||
    typeof position.y !== "number" ||
    isNaN(position.x) ||
    isNaN(position.y) ||
    !isValidPosition(position, viewportWidth, viewportHeight)
  ) {
    logWindowError(
      "Invalid window position detected, resetting to center",
      undefined,
      { position, windowSize }
    );
    return calculateCenteredPosition(windowSize, viewportWidth, viewportHeight);
  }

  // Constrain valid position to viewport
  return constrainPosition(position, windowSize, viewportWidth, viewportHeight);
};

/**
 * Validate and fix invalid window size
 * Returns a valid size, constraining to min/max bounds
 */
export const validateSize = (
  size: Size | undefined,
  minSize: Size,
  maxWidth: number = window.innerWidth,
  maxHeight: number = window.innerHeight
): Size => {
  // If size is undefined or invalid, return minimum size
  if (
    !size ||
    typeof size.width !== "number" ||
    typeof size.height !== "number" ||
    isNaN(size.width) ||
    isNaN(size.height) ||
    size.width <= 0 ||
    size.height <= 0
  ) {
    logWindowError(
      "Invalid window size detected, using minimum size",
      undefined,
      {
        size,
        minSize,
      }
    );
    return { ...minSize };
  }

  // Constrain valid size to bounds
  return constrainSize(size, minSize, maxWidth, maxHeight);
};
