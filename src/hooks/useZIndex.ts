import { useWindowStore } from "../store/windowStore";

export const useZIndex = (windowId: string) => {
  const { windows, focusWindow } = useWindowStore();

  const window = windows.find((w) => w.id === windowId);
  const zIndex = window?.zIndex ?? 100;

  const bringToFront = () => {
    focusWindow(windowId);
  };

  const isTopWindow = () => {
    const maxZIndex = Math.max(...windows.map((w) => w.zIndex));
    return zIndex === maxZIndex;
  };

  return {
    zIndex,
    bringToFront,
    isTopWindow: isTopWindow(),
  };
};
