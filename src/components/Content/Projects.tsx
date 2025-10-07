import { memo } from "react";
import styles from "./Projects.module.css";

export const Projects = memo(() => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured online shopping platform with cart, checkout, and payment integration.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "🛒",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Collaborative task management tool with real-time updates and team features.",
      technologies: ["TypeScript", "React", "Firebase", "Tailwind"],
      image: "✅",
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "Beautiful weather application with forecasts, maps, and location-based alerts.",
      technologies: ["React", "OpenWeather API", "Chart.js"],
      image: "🌤️",
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "Custom portfolio site with OS-inspired interface and interactive elements.",
      technologies: ["React", "TypeScript", "CSS Modules", "Zustand"],
      image: "💼",
    },
    {
      id: 5,
      title: "Social Media Dashboard",
      description:
        "Analytics dashboard for tracking social media metrics across platforms.",
      technologies: ["React", "D3.js", "Express", "PostgreSQL"],
      image: "📊",
    },
    {
      id: 6,
      title: "Recipe Finder",
      description:
        "Discover and save recipes with ingredient search and meal planning features.",
      technologies: ["React", "Spoonacular API", "Redux"],
      image: "🍳",
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
            <div className={styles.cardImage}>
              <span className={styles.emoji}>{project.image}</span>
            </div>
            <div className={styles.cardContent}>
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
          </div>
        ))}
      </div>
    </div>
  );
});

Projects.displayName = "Projects";
