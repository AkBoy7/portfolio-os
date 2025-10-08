import { memo } from "react";
import { Smartphone, Shield, Laptop } from "lucide-react";
import styles from "./Projects.module.css";

export const Projects = memo(() => {
  const projects = [
    {
      id: 1,
      title: "AkBot App",
      description:
        "A Full-Stack web application used by a student sport association to manage events, equipments and play Pokemon themed games together.",
      technologies: ["React", "Node.js", "Python", "Flask"],
      icon: <Smartphone size={32} />,
    },
    {
      id: 2,
      title: "Dark Web Crawler",
      description:
        "A web scraping tool designed to extract data from dark web sources. The bot acts stealthily by acting as a human, mimicking typical user behavior.",
      technologies: ["Python"],
      icon: <Shield size={32} />,
    },
    {
      id: 3,
      title: "Portfolio Website",
      description:
        "Custom portfolio site with OS-inspired interface and interactive elements.",
      technologies: ["React", "TypeScript", "CSS Modules", "AI"],
      icon: <Laptop size={32} />,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Projects</h1>
        <p className={styles.subtitle}>
          A collection of my recent work and side projects
        </p>
      </div>

      <div className={styles.grid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.card}>
            <div className={styles.cardIcon}>{project.icon}</div>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.cardDescription}>{project.description}</p>
            <div className={styles.technologies}>
              {project.technologies.map((tech) => (
                <span key={tech} className={styles.tag}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

Projects.displayName = "Projects";
