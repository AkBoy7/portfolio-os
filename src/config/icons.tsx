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

// High-quality SVG icons for each section
const AboutIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="16" r="8" fill="currentColor" opacity="0.3" />
    <path
      d="M24 28c-7.74 0-14 3.58-14 8v4h28v-4c0-4.42-6.26-8-14-8z"
      fill="currentColor"
    />
    <circle cx="24" cy="16" r="7" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ProjectsIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="6"
      y="6"
      width="16"
      height="16"
      rx="3"
      fill="currentColor"
      opacity="0.3"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="26"
      y="6"
      width="16"
      height="16"
      rx="3"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="6"
      y="26"
      width="16"
      height="16"
      rx="3"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="26"
      y="26"
      width="16"
      height="16"
      rx="3"
      fill="currentColor"
      opacity="0.3"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const SkillsIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24 4L4 14v20c0 11.1 7.68 21.48 18 24 10.32-2.52 18-12.9 18-24V14L24 4z"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M24 6L6 15v19c0 9.94 6.88 19.24 16 21.5 9.12-2.26 16-11.56 16-21.5V15L24 6z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M20 34l-8-8 2.82-2.82L20 28.36l13.18-13.18L36 18l-16 16z"
      fill="currentColor"
    />
  </svg>
);

const ContactIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="4"
      y="8"
      width="40"
      height="32"
      rx="4"
      fill="currentColor"
      opacity="0.3"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M4 12l20 14 20-14"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 36l14-12M44 36L30 24"
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
    defaultSize: { width: 700, height: 550 },
    minSize: { width: 300, height: 250 },
  },
  {
    id: "projects",
    label: "Projects",
    icon: <ProjectsIcon />,
    position: { x: 40, y: 180 },
    windowContent: Projects,
    windowTitle: "Projects",
    defaultSize: { width: 800, height: 600 },
    minSize: { width: 400, height: 300 },
  },
  {
    id: "skills",
    label: "Skills",
    icon: <SkillsIcon />,
    position: { x: 40, y: 320 },
    windowContent: Skills,
    windowTitle: "Skills",
    defaultSize: { width: 700, height: 550 },
    minSize: { width: 300, height: 250 },
  },
  {
    id: "contact",
    label: "Contact",
    icon: <ContactIcon />,
    position: { x: 40, y: 460 },
    windowContent: Contact,
    windowTitle: "Contact",
    defaultSize: { width: 650, height: 500 },
    minSize: { width: 300, height: 250 },
  },
];
