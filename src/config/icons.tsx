import { lazy } from "react";
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

// Simple SVG icons for each section
const AboutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" fill="currentColor" opacity="0.3" />
    <path
      d="M12 14C8.13 14 5 15.79 5 18v2h14v-2c0-2.21-3.13-4-7-4z"
      fill="currentColor"
    />
  </svg>
);

const ProjectsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="3"
      y="3"
      width="8"
      height="8"
      rx="2"
      fill="currentColor"
      opacity="0.3"
    />
    <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" />
    <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" />
    <rect
      x="13"
      y="13"
      width="8"
      height="8"
      rx="2"
      fill="currentColor"
      opacity="0.3"
    />
  </svg>
);

const SkillsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"
      fill="currentColor"
    />
  </svg>
);

const ContactIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="2"
      y="4"
      width="20"
      height="16"
      rx="2"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M22 6l-10 7L2 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const iconConfigs: IconConfig[] = [
  {
    id: "about-me",
    label: "About Me",
    icon: <AboutIcon />,
    position: { x: 40, y: 40 },
    windowContent: AboutMe,
    windowTitle: "About Me",
    defaultSize: { width: 500, height: 400 },
    minSize: { width: 300, height: 250 },
  },
  {
    id: "projects",
    label: "Projects",
    icon: <ProjectsIcon />,
    position: { x: 40, y: 180 },
    windowContent: Projects,
    windowTitle: "Projects",
    defaultSize: { width: 600, height: 500 },
    minSize: { width: 400, height: 300 },
  },
  {
    id: "skills",
    label: "Skills",
    icon: <SkillsIcon />,
    position: { x: 40, y: 320 },
    windowContent: Skills,
    windowTitle: "Skills",
    defaultSize: { width: 500, height: 400 },
    minSize: { width: 300, height: 250 },
  },
  {
    id: "contact",
    label: "Contact",
    icon: <ContactIcon />,
    position: { x: 40, y: 460 },
    windowContent: Contact,
    windowTitle: "Contact",
    defaultSize: { width: 450, height: 350 },
    minSize: { width: 300, height: 250 },
  },
];
