import { memo } from "react";
import styles from "./Skills.module.css";

export const Skills = memo(() => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        "React",
        "TypeScript",
        "JavaScript",
        "HTML/CSS",
        "Tailwind",
        "Next.js",
      ],
    },
    {
      title: "Backend",
      skills: [
        "Node.js",
        "Express",
        "PostgreSQL",
        "MongoDB",
        "REST APIs",
        "GraphQL",
      ],
    },
    {
      title: "Tools",
      skills: ["Git", "Docker", "Figma", "VS Code", "Webpack", "Vite"],
    },
    {
      title: "Soft Skills",
      skills: [
        "Communication",
        "Teamwork",
        "Problem Solving",
        "Leadership",
        "Mentoring",
        "Time Management",
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.headerIcon}
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
        <h1 className={styles.title}>Skills & Expertise</h1>
        <p className={styles.subtitle}>Technologies and tools I work with</p>
      </div>

      <div className={styles.grid}>
        {skillCategories.map((category) => (
          <div key={category.title} className={styles.category}>
            <h2 className={styles.categoryTitle}>{category.title}</h2>
            <div className={styles.skillsList}>
              {category.skills.map((skill) => (
                <span key={skill} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

Skills.displayName = "Skills";
