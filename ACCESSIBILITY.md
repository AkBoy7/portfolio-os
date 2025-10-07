# Accessibility Features

This document outlines the accessibility features implemented in the Portfolio OS Interface.

## Keyboard Navigation

### Desktop Icons

- **Tab**: Navigate between icons
- **Enter**: Open window from focused icon
- **Shift+Tab**: Navigate backwards

### Windows

- **Escape**: Close focused window
- **Alt+M**: Minimize focused window
- **Alt+Enter**: Maximize/restore focused window
- **Tab**: Navigate within window content
- **Click/Focus**: Bring window to front

### Taskbar

- **Tab**: Navigate between minimized window items
- **Enter/Space**: Restore minimized window

### Theme Switcher

- **Tab**: Focus on cogwheel button
- **Enter/Space**: Open theme menu
- **Escape**: Close theme menu
- **Tab**: Navigate between theme options
- **Enter/Space**: Select theme

## ARIA Labels and Roles

### Desktop

- `role="application"` on main desktop container
- `aria-label="Portfolio Desktop"` for screen reader context
- `role="navigation"` on icon container with `aria-label="Portfolio sections"`

### Icons

- `role="button"` on each icon
- `aria-label="Open [Section Name]"` for clear action description

### Windows

- `role="dialog"` on window container
- `aria-label` with window title
- `aria-modal="false"` (windows don't trap focus)
- Window control buttons have descriptive `aria-label`:
  - "Close window"
  - "Minimize window"
  - "Maximize window" / "Restore window"

### Taskbar

- `role="navigation"` with `aria-label="Minimized windows"`
- Each taskbar item has `aria-label="Restore [Window Title]"`

### Theme Switcher

- Cogwheel button has `aria-label="Theme settings"`
- `aria-expanded` attribute indicates menu state
- Theme menu has `role="dialog"` with `aria-label="Theme selection"`
- Theme options have `aria-pressed` to indicate selected state
- Color swatches have `aria-hidden="true"` (decorative)

## Focus Management

### Window Opening

- When a window opens, focus is automatically moved to the window after the opening animation
- Previous focus is stored and restored when the window closes

### Window Closing

- Focus returns to the previously focused element (typically the icon that opened the window)
- If previous element is unavailable, focus moves to document body

### Focus Indicators

All interactive elements have visible focus indicators:

- **Icons**: 2px solid accent color outline with 2px offset
- **Windows**: 3px solid accent color outline with 2px offset
- **Buttons**: 2px solid outline with 2px offset
- **Taskbar Items**: 2px solid accent color outline with 2px offset
- **Theme Options**: 2px solid accent color outline with 2px offset

Focus indicators use `:focus-visible` to only show when keyboard navigating, not on mouse clicks.

## Semantic HTML

### Proper Element Usage

- `<main>` for desktop container
- `<nav>` for icon container and taskbar
- `<button>` for all clickable controls (not divs)
- `<h3>` for theme menu header
- Proper heading hierarchy maintained

### Button Elements

All interactive controls use native `<button>` elements:

- Window control buttons (close, minimize, maximize)
- Desktop icons (with `role="button"`)
- Taskbar items
- Theme switcher cogwheel
- Theme options

## Color Contrast

All four pastel themes maintain WCAG AA contrast ratios:

### Sakura Dreams

- Text on surface: High contrast maintained
- Button text: Readable on all button backgrounds

### Mint Breeze

- Text on surface: High contrast maintained
- Button text: Readable on all button backgrounds

### Lavender Fields

- Text on surface: High contrast maintained
- Button text: Readable on all button backgrounds

### Peachy Keen

- Text on surface: High contrast maintained
- Button text: Readable on all button backgrounds

## Screen Reader Support

### Announcements

- Window state changes are announced via ARIA attributes
- Theme changes are announced when selected
- Window focus changes are communicated through role and label updates

### Content Structure

- Proper heading hierarchy in window content
- Descriptive labels for all interactive elements
- Alternative text for decorative elements marked with `aria-hidden="true"`

## Touch Accessibility

### Touch Target Sizes

- All interactive elements meet minimum 44x44px touch target size on mobile
- Buttons are enlarged on tablet (44x44px) and mobile (44x44px)
- Adequate spacing between touch targets

### Touch Interactions

- Single tap on mobile (instead of double-click for icons)
- Touch drag support for windows
- Touch-friendly resize handles

## Reduced Motion Support

The interface respects the `prefers-reduced-motion` media query:

- Animations are minimized or disabled when user prefers reduced motion
- Essential animations (like window state changes) use simpler transitions
- Decorative animations are completely removed

## Testing Recommendations

### Manual Testing

1. **Keyboard Navigation**: Navigate entire interface using only keyboard
2. **Screen Reader**: Test with NVDA, JAWS, or VoiceOver
3. **Color Contrast**: Use browser DevTools or contrast checker tools
4. **Focus Indicators**: Verify all interactive elements show focus
5. **Touch Targets**: Test on mobile devices for adequate touch target sizes

### Automated Testing

- Use axe DevTools or Lighthouse for accessibility audits
- Run automated tests for ARIA attributes and roles
- Validate HTML semantics with W3C validator

### Browser Testing

- Test keyboard navigation in Chrome, Firefox, Safari, Edge
- Verify screen reader compatibility across browsers
- Test touch interactions on mobile browsers

## Known Limitations

1. **Window Dragging**: Screen readers may not announce drag operations in real-time
2. **Z-Index Changes**: Focus changes when clicking windows may not be announced
3. **Animation States**: Some animation states may not be fully communicated to screen readers

## Future Improvements

1. Add live regions for dynamic content updates
2. Implement skip links for keyboard users
3. Add high contrast mode support
4. Provide audio feedback for window operations
5. Add customizable keyboard shortcuts
6. Implement focus trap for modal-like windows when needed
