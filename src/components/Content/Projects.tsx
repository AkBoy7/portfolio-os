import { memo } from "react";
import { Smartphone, Shield, Laptop, Newspaper } from "lucide-react";
import styles from "./Projects.module.css";

export const Projects = memo(() => {
  const projects = [
    {
      id: 1,
      title: "AkBot App",
      description:
        "A Full-Stack web application used by a student sport association to manage events, equipment, and play Pokemon-themed games together. Features real-time updates and user management.",
      technologies: ["React", "Node.js", "Python", "Flask", "MongoDB"],
      icon: <Smartphone size={32} />,
      link: "https://akbot.app",
      github: null,
      status: "Live",
      year: "2024-2025",
    },
    {
      id: 2,
      title: "Portfolio Website",
      description:
        "Custom portfolio site with OS-inspired interface and interactive elements. Built with modern React and TypeScript, featuring theme switching and responsive design.",
      technologies: ["React", "TypeScript", "CSS Modules", "Vite"],
      icon: <Laptop size={32} />,
      link: "https://akambilbas.me",
      github: "https://github.com/AkBoy7/portfolio-os",
      status: "Live",
      year: "2025",
    },
    {
      id: 3,
      title: "Code Stereotype Analyzer",
      description:
        "My thesis project at Philips to study and analyze their code within the positioning and controller system of their medical devices to research common rolestereotypes in code and detect design issues.",
      technologies: ["Python", "Machine-Learning", "C++"],
      icon: <Newspaper size={32} />,
      link: "https://research.tue.nl/nl/studentTheses/an-automated-approach-to-classify-class-role-stereotypes-for-dete",
      github: null,
      status: "Thesis",
      year: "2024",
    },
    {
      id: 4,
      title: "Dark Web Crawler",
      description:
        "A sophisticated web scraping tool designed to extract data from dark web sources. The bot acts stealthily by mimicking typical human user behavior patterns.",
      technologies: ["Python", "Machine-Learning", "HTML"],
      icon: <Shield size={32} />,
      link: null,
      github: null,
      status: "Research Project",
      year: "2021",
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
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>{project.icon}</div>
              <div className={styles.cardMeta}>
                <span className={styles.status}>{project.status}</span>
                <span className={styles.year}>{project.year}</span>
              </div>
            </div>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.cardDescription}>{project.description}</p>
            <div className={styles.technologies}>
              {project.technologies.map((tech) => (
                <span key={tech} className={styles.tag}>
                  {tech}
                </span>
              ))}
            </div>
            {(project.link || project.github) && (
              <div className={styles.cardLinks}>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkButton}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    View Live
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkButton}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

Projects.displayName = "Projects";
