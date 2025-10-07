/**
 * Throttle function to limit the rate at which a function can fire
 * Useful for performance optimization of frequent events like mousemove
 *
 * @param func - The function to throttle
 * @param limit - The time limit in milliseconds (default: 16ms for ~60fps)
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number = 16
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastResult: void;

  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      lastResult = func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
    return lastResult;
  };
}

/**
 * Request Animation Frame based throttle for smoother animations
 * Ensures updates happen at most once per frame
 *
 * @param func - The function to throttle
 * @returns Throttled function
 */
export function rafThrottle<T extends (...args: any[]) => void>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func.apply(this, args);
        rafId = null;
      });
    }
  };
}
