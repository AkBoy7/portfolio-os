// Window state types and interfaces

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content: React.ComponentType;
  position: Position;
  size: Size;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isClosing: boolean;
  minSize: Size;
  previousPosition?: Position;
  previousSize?: Size;
}

export interface IconConfig {
  id: string;
  label: string;
  icon: string | React.ReactNode;
  position: Position;
  windowContent: React.ComponentType;
  windowTitle: string;
  defaultSize: Size;
  minSize: Size;
}
