import { memo } from "react";
import styles from "./Skills.module.css";

export const Skills = memo(() => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "💻",
      skills: [
        { name: "React", icon: "⚛️", level: "Expert" },
        { name: "TypeScript", icon: "📘", level: "Expert" },
        { name: "JavaScript", icon: "🟨", level: "Expert" },
        { name: "HTML/CSS", icon: "🎨", level: "Expert" },
        { name: "Tailwind CSS", icon: "🌊", level: "Advanced" },
        { name: "Next.js", icon: "▲", level: "Advanced" },
      ],
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      skills: [
        { name: "Node.js", icon: "🟢", level: "Advanced" },
        { name: "Express", icon: "🚂", level: "Advanced" },
        { name: "PostgreSQL", icon: "🐘", level: "Intermediate" },
        { name: "MongoDB", icon: "🍃", level: "Intermediate" },
        { name: "REST APIs", icon: "🔌", level: "Expert" },
        { name: "GraphQL", icon: "◈", level: "Intermediate" },
      ],
    },
    {
      title: "Tools & Technologies",
      icon: "🛠️",
      skills: [
        { name: "Git", icon: "📦", level: "Expert" },
        { name: "Docker", icon: "🐳", level: "Intermediate" },
        { name: "Figma", icon: "🎯", level: "Advanced" },
        { name: "VS Code", icon: "💙", level: "Expert" },
        { name: "Webpack", icon: "📦", level: "Intermediate" },
        { name: "Vite", icon: "⚡", level: "Advanced" },
      ],
    },
    {
      title: "Soft Skills",
      icon: "🌟",
      skills: [
        { name: "Communication", icon: "💬", level: "Expert" },
        { name: "Teamwork", icon: "🤝", level: "Expert" },
        { name: "Problem Solving", icon: "🧩", level: "Expert" },
        { name: "Time Management", icon: "⏰", level: "Advanced" },
        { name: "Leadership", icon: "👑", level: "Advanced" },
        { name: "Mentoring", icon: "🎓", level: "Advanced" },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Skills & Expertise</h1>
        <p className={styles.subtitle}>Technologies and tools I work with</p>
      </div>

      <div className={styles.content}>
        {skillCategories.map((category) => (
          <div key={category.title} className={styles.category}>
            <h2 className={styles.categoryTitle}>
              <span className={styles.categoryIcon}>{category.icon}</span>
              {category.title}
            </h2>
            <div className={styles.skillsGrid}>
              {category.skills.map((skill) => (
                <div key={skill.name} className={styles.skillItem}>
                  <div className={styles.skillIcon}>{skill.icon}</div>
                  <p className={styles.skillName}>{skill.name}</p>
                  <p className={styles.skillLevel}>{skill.level}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

Skills.displayName = "Skills";
