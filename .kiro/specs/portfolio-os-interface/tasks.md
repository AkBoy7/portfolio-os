# Implementation Plan

- [x] 1. Set up project structure and dependencies

  - Initialize React + TypeScript project with Vite
  - Install dependencies: zustand, react-draggable, react-resizable, clsx
  - Create folder structure for components, store, hooks, themes, and utils
  - Set up CSS Modules configuration
  - Configure TypeScript with strict mode
  - _Requirements: All requirements depend on proper setup_

- [x] 2. Implement theme system foundation

  - Create theme type definitions in `src/themes/types.ts`
  - Define all four pastel themes (Sakura Dreams, Mint Breeze, Lavender Fields, Peachy Keen) in `src/themes/themes.ts`
  - Create theme store using Zustand in `src/store/themeStore.ts` with theme state and switching logic
  - Implement `useTheme` hook in `src/hooks/useTheme.ts` for accessing and applying themes
  - Create utility function in `src/utils/localStorage.ts` for persisting theme selection
  - Implement CSS variable injection logic to apply theme colors to :root
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 6.6, 6.7, 6.8_

- [x] 3. Create window state management

  - Define window state types and interfaces in `src/types/index.ts`
  - Create window store using Zustand in `src/store/windowStore.ts`
  - Implement actions for opening, closing, minimizing, maximizing, and focusing windows
  - Implement z-index management logic with counter
  - Create `useWindowManager` hook in `src/hooks/useWindowManager.ts` for window operations
  - Create `useZIndex` hook in `src/hooks/useZIndex.ts` for managing window stacking
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 3.4, 3.5_

- [x] 4. Build Desktop component

  - Create `Desktop.tsx` component with main container structure
  - Create `Wallpaper.tsx` component with gradient background using theme colors
  - Implement desktop layout with CSS Grid or Flexbox
  - Add click handler to deselect windows when clicking desktop
  - Style desktop with pastel theme colors and Animal Crossing aesthetic
  - _Requirements: 1.1, 1.5, 5.1, 5.2, 5.3_

- [x] 5. Build Icon component

  - Create `Icon.tsx` component with icon image and label
  - Implement double-click handler to open windows
  - Add hover animation (translateY lift effect)
  - Style with rounded corners, soft shadows, and pastel colors
  - Create icon configuration array with portfolio sections (About Me, Projects, Skills, Contact)
  - Position icons on desktop using absolute positioning
  - _Requirements: 1.2, 1.3, 1.4, 5.2, 5.3, 5.5_

- [x] 6. Build Window component structure

  - Create `Window.tsx` component with frame and layout
  - Create `WindowTitleBar.tsx` with title and control buttons
  - Create `WindowContent.tsx` with scrollable content area
  - Style windows with rounded corners, borders, and soft shadows
  - Apply Animal Crossing aesthetic with pastel colors and gradients
  - Implement conditional rendering based on minimized state
  - _Requirements: 2.1, 2.2, 5.2, 5.3, 5.6, 8.5_

- [x] 7. Implement window control buttons

  - Create close button with click handler in `WindowTitleBar.tsx`
  - Create minimize button with click handler
  - Create maximize/restore button with toggle logic
  - Style buttons with pastel colors and hover effects
  - Add icons or symbols for each button (×, −, □)
  - Connect buttons to window store actions
  - _Requirements: 2.3, 2.4, 2.5, 2.6, 5.5_

- [x] 8. Implement window dragging functionality

  - Create `useWindowDrag` custom hook in `src/hooks/useWindowDrag.ts`
  - Implement mousedown, mousemove, mouseup handlers for title bar
  - Calculate position delta and update window position in store
  - Implement boundary constraints to keep window on screen
  - Add smooth visual feedback during drag
  - Bring window to front (update z-index) on drag start
  - _Requirements: 3.1, 3.2, 3.6, 3.7_

- [x] 9. Implement window resizing functionality

  - Create resize handles for window edges and corners
  - Implement mousedown, mousemove, mouseup handlers for resize
  - Calculate size delta and update window dimensions in store
  - Enforce minimum width and height constraints
  - Update resize cursor on hover over edges/corners
  - Ensure content layout updates with new dimensions
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [x] 10. Implement window animations

  - Create CSS keyframes for window open animation (scale + fade)
  - Create CSS keyframes for window close animation
  - Create CSS keyframes for minimize animation (slide to taskbar)
  - Create CSS keyframes for maximize animation
  - Add animation classes to Window component based on state
  - Use cubic-bezier easing for playful, bouncy feel
  - Implement prefers-reduced-motion media query support
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

- [x] 11. Build Taskbar component

  - Create `Taskbar.tsx` component with fixed bottom positioning
  - Create `TaskbarItem.tsx` for minimized window representations
  - Implement click handler to restore minimized windows
  - Style taskbar with pastel theme colors and rounded top corners
  - Display window titles in taskbar items
  - Add hover effects to taskbar items
  - _Requirements: 2.7, 5.2, 5.3, 5.5_

- [x] 12. Build ThemeSwitcher component

  - Create `ThemeSwitcher.tsx` with cogwheel button
  - Create `ThemeOption.tsx` for individual theme previews
  - Implement toggle logic to show/hide theme menu
  - Display all available themes with color swatches
  - Implement click handler to apply selected theme
  - Style theme menu as a window or modal with pastel colors
  - Position cogwheel button in corner or taskbar
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.8_

- [x] 13. Create portfolio content components

  - Create `AboutMe.tsx` component with biographical content and photo placeholder
  - Create `Projects.tsx` component with project grid/list layout
  - Create `Skills.tsx` component with skills display (tags, icons, or list)
  - Create `Contact.tsx` component with contact information and form
  - Style all content components with pastel theme colors
  - Ensure content is scrollable within windows
  - Add placeholder content for demonstration
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [x] 14. Implement window opening logic

  - Connect icon double-click to window store open action
  - Check if window already exists before creating new one
  - If window exists and is minimized, restore it
  - If window exists and is open, bring it to front
  - Calculate default position (centered or cascaded)
  - Set default size from icon configuration
  - Assign highest z-index to new window
  - _Requirements: 2.1, 2.7, 3.4_

- [x] 15. Implement window focus management

  - Add click handler to Window component to focus on click
  - Update z-index when window is focused
  - Increment z-index counter in store
  - Ensure focused window is visually on top
  - Update window border or shadow to indicate focus
  - _Requirements: 3.4, 3.5_

- [x] 16. Implement responsive design for tablet

  - Add media queries for tablet breakpoint (768px - 1024px)
  - Adjust window default sizes for tablet screens
  - Increase touch target sizes for buttons (min 44x44px)
  - Test touch drag functionality on windows
  - Adjust icon grid layout for tablet
  - _Requirements: 7.2, 7.3, 7.6_

- [x] 17. Implement responsive design for mobile

  - Add media queries for mobile breakpoint (< 768px)
  - Make windows open near-full-screen on mobile
  - Simplify title bar for smaller screens
  - Create scrollable icon grid for mobile
  - Make taskbar compact or hidden on mobile
  - Move theme switcher to floating button or menu
  - Test touch interactions on mobile devices
  - _Requirements: 7.1, 7.4, 7.5, 7.6_

- [x] 18. Implement accessibility features

  - Add ARIA labels to all interactive elements (icons, buttons, windows)
  - Implement keyboard navigation for opening windows (Enter on focused icon)
  - Add keyboard shortcuts for window controls (Escape to close, etc.)
  - Implement visible focus indicators for keyboard navigation
  - Manage focus when opening/closing windows (trap focus in window, return focus on close)
  - Add semantic HTML elements (button, nav, main, etc.)
  - Test with screen reader to ensure proper announcements
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.6, 10.7_

- [x] 19. Verify color contrast for accessibility

  - Test all theme color combinations for WCAG AA contrast ratios
  - Adjust text colors if contrast is insufficient
  - Ensure button text is readable on button backgrounds
  - Test with color blindness simulators
  - Document contrast ratios for each theme
  - _Requirements: 10.5_

- [x] 20. Implement error handling and edge cases

  - Add error boundaries for window content components
  - Handle invalid window positions (reset to center)
  - Handle window sizes exceeding viewport (constrain to viewport)
  - Handle invalid theme IDs from localStorage (fallback to default)
  - Display error message in window if content fails to load
  - Add retry button for failed content
  - Log errors to console for debugging
  - _Requirements: All requirements benefit from robust error handling_

- [x] 21. Optimize performance

  - Throttle drag and resize event handlers to maintain 60fps
  - Use CSS transforms for animations (GPU-accelerated)
  - Implement window limit (max 8 open windows)
  - Lazy load window content when possible
  - Optimize re-renders with React.memo where appropriate
  - Use useCallback for event handlers
  - Profile performance with React DevTools
  - _Requirements: 9.4, 9.5_

- [x] 22. Add window position utilities

  - Create `windowHelpers.ts` with utility functions
  - Implement function to calculate centered position
  - Implement function to calculate cascaded position (offset from previous)
  - Implement function to constrain position within bounds
  - Implement function to constrain size within bounds
  - Implement function to check if position is valid
  - _Requirements: 3.6, 4.4_

- [x] 23. Integrate all components in App.tsx

  - Import and render Desktop component
  - Pass icon configurations to Desktop
  - Render all open windows from window store
  - Render Taskbar with minimized windows
  - Render ThemeSwitcher
  - Apply theme on initial load from localStorage
  - Set up global styles and CSS variables
  - _Requirements: All requirements come together in main App_

- [x] 24. Add final polish and animations

  - Add hover effects to all interactive elements
  - Implement smooth transitions for theme changes
  - Add subtle animations to icons (float, pulse)
  - Add particle effects or decorative elements (optional)
  - Fine-tune animation timing and easing
  - Add loading state for initial app load
  - Test all animations across browsers
  - _Requirements: 5.5, 9.6_

- [ ]\* 25. Write unit tests for core functionality

  - Test window store actions (open, close, minimize, maximize, focus)
  - Test theme store actions (switch theme, persist theme)
  - Test window position and size utilities
  - Test z-index management logic
  - Test localStorage persistence functions
  - _Requirements: All requirements benefit from testing_

- [ ]\* 26. Write component tests

  - Test Icon component double-click behavior
  - Test Window control buttons (close, minimize, maximize)
  - Test ThemeSwitcher menu interactions
  - Test Taskbar item clicks
  - Test window drag and resize handlers
  - _Requirements: All requirements benefit from testing_

- [ ]\* 27. Write integration tests
  - Test opening multiple windows and z-index ordering
  - Test theme changes affecting all components
  - Test minimizing and restoring windows
  - Test maximizing and restoring windows
  - Test dragging windows to edge constraints
  - _Requirements: All requirements benefit from testing_
