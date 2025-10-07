# Design Document

## Overview

This design document outlines the technical architecture for a portfolio website styled as a custom operating system interface with Animal Crossing-inspired aesthetics. The application will be built as a single-page application (SPA) using modern web technologies to provide smooth, interactive window management without page reloads.

The core experience centers around a desktop environment where users can click icons to open draggable, resizable windows containing portfolio content. The interface features pastel color themes that can be switched via a settings cogwheel, creating an engaging and memorable portfolio experience.

## Architecture

### Technology Stack

**Frontend Framework:** React with TypeScript

- Component-based architecture for windows, icons, and UI elements
- Type safety for window state management and theme configuration
- Hooks for managing window lifecycle and interactions

**State Management:** Zustand or React Context

- Centralized window state (position, size, z-index, minimized/maximized status)
- Theme state management
- Lightweight and performant for real-time window updates

**Styling:** CSS Modules or Styled Components with CSS Variables

- Scoped component styles
- CSS variables for theme switching
- CSS transforms for smooth animations

**Drag and Drop:** react-draggable or custom implementation

- Window dragging functionality
- Touch support for mobile devices

**Resize:** react-resizable or custom implementation

- Window edge and corner resizing
- Minimum dimension constraints

### Application Structure

```
src/
├── components/
│   ├── Desktop/
│   │   ├── Desktop.tsx           # Main desktop container
│   │   ├── Desktop.module.css
│   │   └── Wallpaper.tsx         # Background component
│   ├── Icon/
│   │   ├── Icon.tsx              # Desktop icon component
│   │   └── Icon.module.css
│   ├── Window/
│   │   ├── Window.tsx            # Window container
│   │   ├── WindowTitleBar.tsx    # Title bar with controls
│   │   ├── WindowContent.tsx     # Content area
│   │   ├── Window.module.css
│   │   └── useWindowDrag.ts      # Custom hook for dragging
│   ├── Taskbar/
│   │   ├── Taskbar.tsx           # Bottom taskbar
│   │   ├── TaskbarItem.tsx       # Minimized window items
│   │   └── Taskbar.module.css
│   ├── ThemeSwitcher/
│   │   ├── ThemeSwitcher.tsx     # Cogwheel and theme menu
│   │   ├── ThemeOption.tsx       # Individual theme preview
│   │   └── ThemeSwitcher.module.css
│   └── Content/
│       ├── AboutMe.tsx           # About content
│       ├── Projects.tsx          # Projects content
│       ├── Skills.tsx            # Skills content
│       └── Contact.tsx           # Contact content
├── store/
│   ├── windowStore.ts            # Window state management
│   └── themeStore.ts             # Theme state management
├── themes/
│   ├── themes.ts                 # Theme definitions
│   └── types.ts                  # Theme type definitions
├── hooks/
│   ├── useWindowManager.ts       # Window operations
│   ├── useTheme.ts               # Theme operations
│   └── useZIndex.ts              # Z-index management
├── utils/
│   ├── windowHelpers.ts          # Window calculation utilities
│   └── localStorage.ts           # Persistence utilities
├── types/
│   └── index.ts                  # Global type definitions
├── App.tsx
└── index.tsx
```

## Components and Interfaces

### Desktop Component

The main container that holds all desktop elements.

```typescript
interface DesktopProps {
  children?: React.ReactNode;
}

// Responsibilities:
// - Render wallpaper background
// - Render desktop icons
// - Render all open windows
// - Render taskbar
// - Render theme switcher
// - Handle desktop-level click events (deselect windows)
```

### Icon Component

Represents clickable desktop icons.

```typescript
interface IconProps {
  id: string;
  label: string;
  icon: React.ReactNode | string; // SVG component or image path
  position: { x: number; y: number };
  onDoubleClick: (id: string) => void;
}

// Responsibilities:
// - Render icon image/SVG
// - Render label text
// - Handle double-click to open window
// - Apply hover effects
// - Maintain position on desktop
```

### Window Component

The draggable, resizable window container.

```typescript
interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isClosing: boolean;
  minSize: { width: number; height: number };
}

interface WindowProps extends WindowState {
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onDrag: (id: string, position: { x: number; y: number }) => void;
  onResize: (id: string, size: { width: number; height: number }) => void;
}

// Responsibilities:
// - Render window frame with pastel styling
// - Render title bar with controls
// - Render content area with scrolling
// - Handle drag operations
// - Handle resize operations
// - Manage z-index on focus
// - Apply open/close animations
// - Enforce minimum size constraints
```

### WindowTitleBar Component

The draggable title bar with window controls.

```typescript
interface WindowTitleBarProps {
  title: string;
  isMaximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onDragStart: (e: React.MouseEvent) => void;
}

// Responsibilities:
// - Display window title
// - Render close, minimize, maximize buttons
// - Initiate drag operations
// - Apply Animal Crossing-style button designs
// - Show hover states on buttons
```

### Taskbar Component

Bottom bar showing minimized windows and system controls.

```typescript
interface TaskbarProps {
  minimizedWindows: WindowState[];
  onWindowRestore: (id: string) => void;
}

// Responsibilities:
// - Display minimized window items
// - Handle click to restore windows
// - Show theme switcher button
// - Apply pastel styling
// - Maintain fixed position at bottom
```

### ThemeSwitcher Component

Cogwheel button and theme selection menu.

```typescript
interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    accent: string;
    shadow: string;
  };
}

interface ThemeSwitcherProps {
  currentTheme: Theme;
  availableThemes: Theme[];
  onThemeChange: (themeId: string) => void;
}

// Responsibilities:
// - Render cogwheel icon button
// - Toggle theme selection menu
// - Display theme previews
// - Apply selected theme
// - Persist theme choice to localStorage
```

## Data Models

### Window State Model

```typescript
interface WindowState {
  id: string; // Unique identifier
  title: string; // Window title
  content: React.ReactNode; // Content component
  position: Position; // Current position
  size: Size; // Current size
  zIndex: number; // Stacking order
  isMinimized: boolean; // Minimized state
  isMaximized: boolean; // Maximized state
  isClosing: boolean; // Closing animation state
  minSize: Size; // Minimum dimensions
  previousPosition?: Position; // For restore from maximize
  previousSize?: Size; // For restore from maximize
}

interface Position {
  x: number; // Pixels from left
  y: number; // Pixels from top
}

interface Size {
  width: number; // Width in pixels
  height: number; // Height in pixels
}
```

### Icon Configuration Model

```typescript
interface IconConfig {
  id: string;
  label: string;
  icon: string | React.ReactNode;
  position: Position;
  windowContent: React.ComponentType;
  windowTitle: string;
  defaultSize: Size;
  minSize: Size;
}
```

### Theme Model

```typescript
interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
}

interface ThemeColors {
  // Desktop
  background: string; // Desktop background
  backgroundGradient?: string; // Optional gradient overlay

  // Windows
  surface: string; // Window background
  surfaceHover: string; // Window hover state
  border: string; // Window borders

  // Text
  text: string; // Primary text
  textSecondary: string; // Secondary text

  // Buttons
  primary: string; // Primary button color
  secondary: string; // Secondary button color
  accent: string; // Accent color
  danger: string; // Close button color

  // Effects
  shadow: string; // Box shadow color
  overlay: string; // Modal overlay
}
```

### Theme Definitions

```typescript
const themes: Theme[] = [
  {
    id: "sakura",
    name: "Sakura Dreams",
    colors: {
      background: "#FFE5EC",
      backgroundGradient: "linear-gradient(135deg, #FFE5EC 0%, #FFC9DE 100%)",
      surface: "#FFF0F5",
      surfaceHover: "#FFE5F0",
      border: "#FFB3D9",
      text: "#8B4789",
      textSecondary: "#B87FB8",
      primary: "#FFB3D9",
      secondary: "#E6A8D7",
      accent: "#FF9ECD",
      danger: "#FF6B9D",
      shadow: "rgba(255, 179, 217, 0.3)",
      overlay: "rgba(255, 229, 236, 0.8)",
    },
  },
  {
    id: "mint",
    name: "Mint Breeze",
    colors: {
      background: "#E0F9F4",
      backgroundGradient: "linear-gradient(135deg, #E0F9F4 0%, #B8F3E6 100%)",
      surface: "#F0FFFC",
      surfaceHover: "#E5FFF9",
      border: "#A8E6D7",
      text: "#2D6A5F",
      textSecondary: "#5A9B8A",
      primary: "#A8E6D7",
      secondary: "#8FD9C7",
      accent: "#7DD3BF",
      danger: "#FF8B94",
      shadow: "rgba(168, 230, 215, 0.3)",
      overlay: "rgba(224, 249, 244, 0.8)",
    },
  },
  {
    id: "lavender",
    name: "Lavender Fields",
    colors: {
      background: "#E8E4F3",
      backgroundGradient: "linear-gradient(135deg, #E8E4F3 0%, #D4C5F9 100%)",
      surface: "#F5F3FF",
      surfaceHover: "#EBE7FF",
      border: "#C5B8E9",
      text: "#5B4B8A",
      textSecondary: "#8B7AB8",
      primary: "#C5B8E9",
      secondary: "#B8A7DC",
      accent: "#A594D1",
      danger: "#FF8FA3",
      shadow: "rgba(197, 184, 233, 0.3)",
      overlay: "rgba(232, 228, 243, 0.8)",
    },
  },
  {
    id: "peach",
    name: "Peachy Keen",
    colors: {
      background: "#FFE8D6",
      backgroundGradient: "linear-gradient(135deg, #FFE8D6 0%, #FFD4B8 100%)",
      surface: "#FFF5ED",
      surfaceHover: "#FFEEDD",
      border: "#FFCBA4",
      text: "#8B5A3C",
      textSecondary: "#B8826A",
      primary: "#FFCBA4",
      secondary: "#FFB88C",
      accent: "#FFA574",
      danger: "#FF7B7B",
      shadow: "rgba(255, 203, 164, 0.3)",
      overlay: "rgba(255, 232, 214, 0.8)",
    },
  },
];
```

## Window Management Logic

### Opening Windows

1. User double-clicks desktop icon
2. Check if window with that ID already exists
3. If exists and minimized, restore it and bring to front
4. If exists and not minimized, just bring to front
5. If doesn't exist, create new window with:
   - Default position (centered or cascaded)
   - Default size from icon config
   - Highest z-index
   - Not minimized or maximized
6. Add window to state
7. Trigger open animation

### Closing Windows

1. User clicks close button
2. Set window `isClosing` to true
3. Trigger close animation (scale down, fade out)
4. After animation completes, remove window from state

### Minimizing Windows

1. User clicks minimize button
2. Set window `isMinimized` to true
3. Trigger minimize animation (slide to taskbar)
4. Add window to taskbar
5. Keep window in state but don't render in desktop area

### Maximizing Windows

1. User clicks maximize button
2. Save current position and size to `previousPosition` and `previousSize`
3. Set window position to (0, 0)
4. Set window size to desktop dimensions minus taskbar
5. Set `isMaximized` to true
6. Trigger maximize animation

### Restoring Windows

1. User clicks restore button (when maximized) or taskbar item (when minimized)
2. If maximized, restore `previousPosition` and `previousSize`
3. If minimized, set `isMinimized` to false
4. Bring window to front (highest z-index)
5. Trigger restore animation

### Dragging Windows

1. User mousedown on title bar
2. Record initial mouse position and window position
3. On mousemove, calculate delta and update window position
4. Constrain window to stay within desktop bounds (at least title bar visible)
5. On mouseup, finalize position
6. Bring window to front on drag start

### Resizing Windows

1. User mousedown on window edge or corner
2. Record initial mouse position and window size
3. On mousemove, calculate delta and update window size
4. Enforce minimum size constraints
5. Update content layout
6. On mouseup, finalize size

### Z-Index Management

- Maintain a counter for highest z-index
- When window is focused (clicked), increment counter and assign to that window
- This ensures most recently focused window is always on top
- Start with base z-index of 100 for windows

## Theme System Implementation

### CSS Variables Approach

Apply theme colors using CSS custom properties:

```css
:root {
  --color-background: #ffe5ec;
  --color-surface: #fff0f5;
  --color-border: #ffb3d9;
  --color-text: #8b4789;
  --color-text-secondary: #b87fb8;
  --color-primary: #ffb3d9;
  --color-secondary: #e6a8d7;
  --color-accent: #ff9ecd;
  --color-danger: #ff6b9d;
  --color-shadow: rgba(255, 179, 217, 0.3);
  --color-overlay: rgba(255, 229, 236, 0.8);
}
```

### Theme Switching Logic

1. User clicks cogwheel icon
2. Open theme selection menu (window or modal)
3. Display theme options with preview swatches
4. User clicks a theme
5. Update CSS variables with new theme colors
6. Save theme ID to localStorage
7. Close theme menu
8. All components automatically update via CSS variables

### Theme Persistence

```typescript
// On theme change
localStorage.setItem("portfolio-theme", themeId);

// On app load
const savedThemeId = localStorage.getItem("portfolio-theme");
if (savedThemeId) {
  applyTheme(savedThemeId);
} else {
  applyTheme("sakura"); // Default theme
}
```

## Animal Crossing Aesthetic Guidelines

### Visual Style

- **Rounded Corners:** All elements use border-radius (12-20px for windows, 8-12px for buttons)
- **Soft Shadows:** Use multiple layered shadows for depth: `box-shadow: 0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)`
- **Pastel Colors:** All colors are soft, desaturated, and light
- **Gentle Gradients:** Subtle gradients on backgrounds and buttons
- **Playful Icons:** Use rounded, friendly icon designs
- **Smooth Animations:** All transitions use ease-in-out timing (0.3s duration)

### Typography

- **Font Family:** Use rounded, friendly fonts like:
  - Primary: 'Quicksand', 'Nunito', or 'Comfortaa'
  - Fallback: system-ui, sans-serif
- **Font Weights:** Regular (400) for body, Semi-bold (600) for headings
- **Font Sizes:**
  - Body: 16px
  - Headings: 20-24px
  - Labels: 14px
  - Buttons: 14-16px

### Button Styles

```css
.button {
  padding: 8px 16px;
  border-radius: 12px;
  border: 2px solid var(--color-border);
  background: var(--color-primary);
  color: var(--color-text);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px var(--color-shadow);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--color-shadow);
}

.button:active {
  transform: translateY(0);
}
```

### Window Styles

```css
.window {
  border-radius: 16px;
  background: var(--color-surface);
  border: 3px solid var(--color-border);
  box-shadow: 0 10px 25px var(--color-shadow), 0 6px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.window-title-bar {
  background: linear-gradient(
    180deg,
    var(--color-primary),
    var(--color-secondary)
  );
  padding: 12px 16px;
  border-bottom: 2px solid var(--color-border);
}
```

## Animations

### Window Open Animation

```css
@keyframes windowOpen {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.window-enter {
  animation: windowOpen 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Window Close Animation

```css
@keyframes windowClose {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}

.window-exit {
  animation: windowClose 0.2s ease-out;
}
```

### Window Minimize Animation

```css
@keyframes windowMinimize {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.1) translateY(100vh);
  }
}
```

### Window Maximize Animation

```css
@keyframes windowMaximize {
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
}
```

### Hover Effects

```css
.icon:hover {
  transform: translateY(-4px);
  transition: transform 0.2s ease;
}

.button:hover {
  filter: brightness(1.1);
}
```

## Responsive Design Strategy

### Desktop (> 1024px)

- Full window management with drag and resize
- Multiple windows can be open simultaneously
- Icons arranged in grid on desktop
- Taskbar at bottom

### Tablet (768px - 1024px)

- Simplified window management
- Windows default to larger sizes
- Touch-friendly drag handles
- Fewer icons visible at once

### Mobile (< 768px)

- Windows open full-screen or near-full-screen
- Simplified title bar with essential controls only
- Single window at a time recommended
- Icons in scrollable grid
- Taskbar becomes compact
- Theme switcher in hamburger menu or floating button

### Touch Adaptations

- Larger hit areas for buttons (min 44x44px)
- Touch-friendly drag handles on windows
- Swipe gestures for closing windows
- Tap to focus, double-tap to maximize

## Error Handling

### Window Positioning Errors

- If window position is outside viewport, reset to center
- If window size exceeds viewport, constrain to viewport dimensions
- If saved position from localStorage is invalid, use default

### Theme Loading Errors

- If saved theme ID doesn't exist, fall back to default theme
- If theme colors are malformed, use fallback color values
- Log errors to console for debugging

### Content Loading Errors

- Display error message within window if content fails to load
- Provide retry button
- Maintain window functionality even if content errors

### Performance Issues

- Limit maximum number of open windows (e.g., 8)
- Throttle drag and resize events to maintain 60fps
- Use CSS transforms for animations (GPU-accelerated)
- Lazy load window content when possible

## Testing Strategy

### Unit Tests

- Window state management functions
- Theme switching logic
- Position and size calculation utilities
- Z-index management
- LocalStorage persistence

### Component Tests

- Icon click and double-click behavior
- Window control buttons (close, minimize, maximize)
- Theme switcher menu interactions
- Taskbar item clicks
- Window drag and resize handlers

### Integration Tests

- Opening multiple windows
- Window focus and z-index ordering
- Theme changes affecting all components
- Minimizing and restoring windows
- Maximizing and restoring windows
- Dragging windows to edge constraints

### Visual Regression Tests

- Theme color application
- Window animations
- Responsive layouts at different breakpoints
- Hover states and transitions

### Accessibility Tests

- Keyboard navigation through windows and controls
- Screen reader announcements
- Focus management when opening/closing windows
- Color contrast ratios for all themes
- ARIA labels and roles

### Performance Tests

- Frame rate during window drag operations
- Memory usage with multiple windows open
- Animation smoothness
- Initial load time
- Theme switching speed

### Cross-Browser Tests

- Chrome, Firefox, Safari, Edge
- Touch interactions on mobile browsers
- CSS variable support
- Animation performance

### User Acceptance Tests

- Portfolio content is easily accessible
- Window management feels intuitive
- Theme switching works as expected
- Mobile experience is usable
- Overall aesthetic matches Animal Crossing inspiration
