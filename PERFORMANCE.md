# Performance Optimization Guide

This document outlines the performance optimizations implemented in the portfolio OS interface and provides guidance for profiling and monitoring performance.

## Implemented Optimizations

### 1. Throttled Event Handlers (60fps)

**Location:** `src/hooks/useWindowDrag.ts`, `src/hooks/useWindowResize.ts`

- **Implementation:** Using `requestAnimationFrame` (RAF) based throttling for drag and resize operations
- **Benefit:** Ensures smooth 60fps performance by limiting updates to once per animation frame
- **Utility:** `src/utils/throttle.ts` provides both time-based and RAF-based throttling

```typescript
// RAF throttle ensures updates happen at most once per frame
const handleMouseMove = useMemo(
  () => rafThrottle(handleMouseMoveUnthrottled),
  [handleMouseMoveUnthrottled]
);
```

### 2. GPU-Accelerated Animations

**Location:** `src/components/Window/Window.module.css`

- **Implementation:** All animations use CSS `transform` and `opacity` properties
- **Benefit:** Leverages GPU acceleration for smooth animations without triggering layout recalculations
- **Animations:**
  - Window open: `scale()` + `translateY()` + `opacity`
  - Window close: `scale()` + `translateY()` + `opacity`
  - Window minimize: `scale()` + `translateY()` + `opacity`
  - Window maximize/restore: `scale()`

```css
@keyframes windowOpen {
  0% {
    opacity: 0;
    transform: scale(0.7) translateY(30px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
```

### 3. Window Limit

**Location:** `src/store/windowStore.ts`

- **Implementation:** Maximum of 8 open windows enforced at store level
- **Benefit:** Prevents performance degradation from too many simultaneous windows
- **Constant:** `MAX_WINDOWS = 8`

```typescript
const openWindowCount = windows.filter((w) => !w.isMinimized).length;
if (openWindowCount >= MAX_WINDOWS) {
  logWindowError(`Maximum window limit (${MAX_WINDOWS}) reached`);
  return;
}
```

### 4. Lazy Loading

**Location:** `src/config/icons.tsx`, `src/components/Window/WindowContent.tsx`

- **Implementation:** Content components are lazy-loaded using React.lazy()
- **Benefit:** Reduces initial bundle size and only loads content when windows are opened
- **Suspense:** Loading fallback provides user feedback during component load

```typescript
const AboutMe = lazy(() =>
  import("../components/Content/AboutMe").then((module) => ({
    default: module.AboutMe,
  }))
);
```

### 5. React.memo Optimization

**Location:** All content and UI components

- **Optimized Components:**
  - `AboutMe`, `Projects`, `Skills`, `Contact` (content)
  - `Icon`, `TaskbarItem`, `ThemeOption` (UI)
- **Benefit:** Prevents unnecessary re-renders when props haven't changed
- **Pattern:**

```typescript
export const Component = memo(({ props }) => {
  // Component implementation
});

Component.displayName = "Component";
```

### 6. useCallback for Event Handlers

**Location:** All interactive components

- **Implementation:** Event handlers wrapped in `useCallback` with proper dependencies
- **Benefit:** Prevents function recreation on every render, reducing child re-renders
- **Components:** `Window`, `Icon`, `TaskbarItem`, `ThemeOption`

```typescript
const handleClick = useCallback(() => {
  onClick(id);
}, [id, onClick]);
```

## Performance Profiling Guide

### Using React DevTools Profiler

1. **Install React DevTools**

   - Chrome: [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
   - Firefox: [React Developer Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

2. **Start Profiling**

   ```bash
   npm run dev
   ```

   - Open React DevTools
   - Navigate to "Profiler" tab
   - Click "Record" button (⏺)

3. **Test Scenarios**

   - **Window Dragging:** Drag a window around the screen
   - **Window Resizing:** Resize a window from corners/edges
   - **Multiple Windows:** Open 4-5 windows and interact with them
   - **Theme Switching:** Switch between different themes
   - **Window Operations:** Open, close, minimize, maximize windows

4. **Analyze Results**
   - Look for components with long render times (> 16ms)
   - Check for unnecessary re-renders (components rendering without prop changes)
   - Identify components that render frequently during interactions
   - Review flame graph for performance bottlenecks

### Performance Metrics to Monitor

#### Target Metrics

- **Frame Rate:** Maintain 60fps (16.67ms per frame) during interactions
- **Initial Load:** < 2 seconds for first contentful paint
- **Window Open:** < 400ms animation duration
- **Drag/Resize:** < 16ms per update (60fps)
- **Theme Switch:** < 200ms to apply new theme

#### Browser Performance Tools

1. **Chrome DevTools Performance Tab**

   ```
   1. Open DevTools (F12)
   2. Go to "Performance" tab
   3. Click "Record" (⏺)
   4. Perform interactions
   5. Stop recording
   6. Analyze timeline
   ```

2. **Key Metrics to Check:**

   - **FPS:** Should stay at 60fps during animations
   - **CPU Usage:** Should not spike above 80% during interactions
   - **Memory:** Should not continuously increase (check for leaks)
   - **Layout Shifts:** Should be minimal (< 0.1 CLS)

3. **Lighthouse Audit**
   ```bash
   # Run Lighthouse in Chrome DevTools
   1. Open DevTools
   2. Go to "Lighthouse" tab
   3. Select "Performance" category
   4. Click "Generate report"
   ```

### Common Performance Issues

#### Issue: Choppy Window Dragging

- **Cause:** Too many updates per second
- **Solution:** Verify RAF throttling is working
- **Check:** `src/hooks/useWindowDrag.ts` uses `rafThrottle`

#### Issue: Slow Window Opening

- **Cause:** Large content components loading synchronously
- **Solution:** Verify lazy loading is implemented
- **Check:** `src/config/icons.tsx` uses `React.lazy()`

#### Issue: Memory Leaks

- **Cause:** Event listeners not cleaned up
- **Solution:** Verify useEffect cleanup functions
- **Check:** All `addEventListener` have corresponding `removeEventListener`

#### Issue: Excessive Re-renders

- **Cause:** Missing React.memo or useCallback
- **Solution:** Add memoization to components and callbacks
- **Check:** Components use `memo()` and handlers use `useCallback()`

## Build Optimization

### Production Build

```bash
npm run build
```

### Analyze Bundle Size

```bash
# Install bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ]
});

# Build and view report
npm run build
```

### Code Splitting Verification

- Check that content components are in separate chunks
- Verify lazy-loaded components create separate bundles
- Look for `AboutMe.[hash].js`, `Projects.[hash].js`, etc. in dist folder

## Monitoring in Production

### Performance Monitoring Setup

```typescript
// Add to src/utils/performanceMonitor.ts
export const measureWindowOperation = (
  operation: string,
  callback: () => void
) => {
  const start = performance.now();
  callback();
  const duration = performance.now() - start;

  if (duration > 16.67) {
    console.warn(`Slow operation: ${operation} took ${duration.toFixed(2)}ms`);
  }
};
```

### Usage Example

```typescript
measureWindowOperation("window-drag", () => {
  onDrag(windowId, newPosition);
});
```

## Accessibility Performance

- **Reduced Motion:** All animations respect `prefers-reduced-motion`
- **Keyboard Navigation:** No performance impact from keyboard shortcuts
- **Screen Readers:** ARIA labels don't affect render performance

## Future Optimization Opportunities

1. **Virtual Scrolling:** For windows with long content lists
2. **Web Workers:** For heavy computations (if needed)
3. **Service Worker:** For offline caching and faster loads
4. **Image Optimization:** Lazy load images in content components
5. **State Persistence:** Debounce localStorage writes

## Performance Checklist

- [x] Throttle drag/resize handlers (RAF-based)
- [x] Use CSS transforms for animations
- [x] Implement window limit (8 windows max)
- [x] Lazy load content components
- [x] Add React.memo to components
- [x] Use useCallback for event handlers
- [x] GPU-accelerated animations
- [x] Suspense fallback for lazy loading
- [x] Error boundaries for graceful failures
- [x] Reduced motion support
- [x] Mobile performance optimizations

## Resources

- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Web Vitals](https://web.dev/vitals/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)
