import { memo } from "react";
import { Download, Briefcase, GraduationCap, Award } from "lucide-react";
import styles from "./Resume.module.css";

export const Resume = memo(() => {
  const handleDownload = () => {
    // Replace with your actual resume PDF link
    const resumeUrl = "/resume.pdf"; // Or use a Google Drive/Dropbox link
    window.open(resumeUrl, "_blank");
  };

  const experience = [
    {
      title: "Backend Engineer",
      company: "Codeflex",
      location: "Eindhoven, Netherlands",
      period: "2 years",
      description:
        "Developing scalable backend systems using Python and JavaScript/TypeScript. Building robust APIs and backend infrastructure.",
      highlights: [
        "Built RESTful APIs serving 10k+ requests/day",
        "Optimized code and systems reducing response time",
        "Implement and start new complex projects with close customer contact",
      ],
    },
    {
      title: "Master Thesis Intern",
      company: "Philips",
      location: "Best, Netherlands",
      period: "6 months",
      description:
        "Conducted research on software analysis for master thesis. Worked with Python and C++ to analyze and improve software systems.",
      highlights: [
        "Developed analysis tools for large codebases",
        "Published research findings in thesis",
        "Collaborated with senior engineers",
      ],
    },
  ];

  const education = [
    {
      degree: "Master of Science",
      field: "Computer Science and Engineering",
      school: "TU Eindhoven",
      period: "2021 - 2024",
    },
    {
      degree: "Bachelor of Science",
      field: "Computer Science and Engineering",
      school: "TU Eindhoven",
      period: "2018 - 2021",
    },
  ];

  const skills = {
    "Programming Languages": ["Python", "JavaScript", "TypeScript", "C++"],
    Backend: ["Node.js", "Flask", "Express"],
    Frontend: ["React", "HTML/CSS", "Vite"],
    Databases: ["PostgreSQL", "Redis", "SQLite"],
    Tools: ["Git", "Docker", "CI/CD", "Cloudflare"],
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.name}>Akam Bilbas</h1>
          <p className={styles.title}>Backend Engineer & Software Developer</p>
        </div>
        <button className={styles.downloadButton} onClick={handleDownload}>
          <Download size={20} />
          Download PDF
        </button>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Briefcase size={24} />
          <h2>Work Experience</h2>
        </div>
        {experience.map((job, index) => (
          <div key={index} className={styles.experienceItem}>
            <div className={styles.experienceHeader}>
              <div>
                <h3 className={styles.jobTitle}>{job.title}</h3>
                <p className={styles.company}>
                  {job.company} • {job.location}
                </p>
              </div>
              <span className={styles.period}>{job.period}</span>
            </div>
            <p className={styles.description}>{job.description}</p>
            <ul className={styles.highlights}>
              {job.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <GraduationCap size={24} />
          <h2>Education</h2>
        </div>
        {education.map((edu, index) => (
          <div key={index} className={styles.educationItem}>
            <div className={styles.educationHeader}>
              <div>
                <h3 className={styles.degree}>{edu.degree}</h3>
                <p className={styles.field}>{edu.field}</p>
                <p className={styles.school}>{edu.school}</p>
              </div>
              <div className={styles.educationMeta}>
                <span className={styles.period}>{edu.period}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Award size={24} />
          <h2>Technical Skills</h2>
        </div>
        <div className={styles.skillsGrid}>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className={styles.skillCategory}>
              <h4 className={styles.categoryTitle}>{category}</h4>
              <div className={styles.skillTags}>
                {items.map((skill) => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
});

Resume.displayName = "Resume";
