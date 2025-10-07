import { lazy } from "react";
import { User, FolderKanban, Award, Mail } from "lucide-react";
import type { IconConfig } from "../types";

// Lazy load content components for better performance
// Components are only loaded when their window is opened
const AboutMe = lazy(() =>
  import("../components/Content/AboutMe").then((module) => ({
    default: module.AboutMe,
  }))
);
const Projects = lazy(() =>
  import("../components/Content/Projects").then((module) => ({
    default: module.Projects,
  }))
);
const Skills = lazy(() =>
  import("../components/Content/Skills").then((module) => ({
    default: module.Skills,
  }))
);
const Contact = lazy(() =>
  import("../components/Content/Contact").then((module) => ({
    default: module.Contact,
  }))
);

export const iconConfigs: IconConfig[] = [
  {
    id: "about-me",
    label: "About Me",
    icon: <User size={48} />,
    position: { x: 40, y: 40 },
    windowContent: AboutMe,
    windowTitle: "About Me",
    defaultSize: { width: 700, height: 550 },
    minSize: { width: 300, height: 250 },
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderKanban size={48} />,
    position: { x: 40, y: 180 },
    windowContent: Projects,
    windowTitle: "Projects",
    defaultSize: { width: 800, height: 600 },
    minSize: { width: 400, height: 300 },
  },
  {
    id: "skills",
    label: "Skills",
    icon: <Award size={48} />,
    position: { x: 40, y: 320 },
    windowContent: Skills,
    windowTitle: "Skills",
    defaultSize: { width: 700, height: 550 },
    minSize: { width: 300, height: 250 },
  },
  {
    id: "contact",
    label: "Contact",
    icon: <Mail size={48} />,
    position: { x: 40, y: 460 },
    windowContent: Contact,
    windowTitle: "Contact",
    defaultSize: { width: 650, height: 500 },
    minSize: { width: 300, height: 250 },
  },
];
