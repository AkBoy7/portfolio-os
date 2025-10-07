import { Suspense, useState } from "react";
import Desktop from "./components/Desktop";
import { Window } from "./components/Window";
import { Taskbar } from "./components/Taskbar";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { SkipLink } from "./components/SkipLink";
import { KeyboardShortcutsHelp } from "./components/KeyboardShortcutsHelp";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LoadingScreen } from "./components/LoadingScreen";
import { useWindowStore } from "./store/windowStore";
import { useTheme } from "./hooks/useTheme";
import "./App.css";

function App() {
  // Initialize theme on app load
  useTheme();

  // Loading state for initial app load
  const [isLoading, setIsLoading] = useState(true);
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const handleThemeClick = () => {
    setShowThemeSwitcher((prev) => !prev);
    setShowKeyboardHelp(false);
  };

  const handleHelpClick = () => {
    setShowKeyboardHelp((prev) => !prev);
    setShowThemeSwitcher(false);
  };

  const handleOverlayClick = () => {
    setShowThemeSwitcher(false);
    setShowKeyboardHelp(false);
  };

  // Get window state and actions from store
  const windows = useWindowStore((state) => state.windows);
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const maximizeWindow = useWindowStore((state) => state.maximizeWindow);
  const restoreWindow = useWindowStore((state) => state.restoreWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const updateWindowPosition = useWindowStore(
    (state) => state.updateWindowPosition
  );
  const updateWindowSize = useWindowStore((state) => state.updateWindowSize);

  return (
    <ErrorBoundary>
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      <SkipLink />
      <Desktop>
        {/* Render all open windows */}
        {windows.map((window) => (
          <Suspense
            key={window.id}
            fallback={
              <div
                style={{
                  position: "absolute",
                  left: window.position.x,
                  top: window.position.y,
                  width: window.size.width,
                  height: window.size.height,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--color-surface)",
                  borderRadius: "16px",
                  border: "3px solid var(--color-border)",
                }}
              >
                <p style={{ color: "var(--color-text)" }}>Loading...</p>
              </div>
            }
          >
            <Window
              {...window}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onMaximize={maximizeWindow}
              onRestore={restoreWindow}
              onFocus={focusWindow}
              onDrag={updateWindowPosition}
              onResize={updateWindowSize}
            />
          </Suspense>
        ))}
      </Desktop>
      <Taskbar onThemeClick={handleThemeClick} onHelpClick={handleHelpClick} />
      {showThemeSwitcher && <ThemeSwitcher onClose={handleOverlayClick} />}
      {showKeyboardHelp && (
        <KeyboardShortcutsHelp onClose={handleOverlayClick} />
      )}
    </ErrorBoundary>
  );
}

export default App;
