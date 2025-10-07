import { memo } from "react";
import styles from "./AboutMe.module.css";

export const AboutMe = memo(() => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.avatar}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h1 className={styles.name}>Akam Bilbas</h1>
        <p className={styles.role}>Software Engineer & Back-End Developer</p>
        <div className={styles.badges}>
          <span className={styles.badge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            2+ Years Experience
          </span>
          <span className={styles.badge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.21 9l-4.38-6.56a1 1 0 00-1.66 0L6.79 9H2a1 1 0 00-.78 1.63l9.4 11.84a1 1 0 001.56 0l9.4-11.84A1 1 0 0022 9h-4.79z" />
            </svg>
            Project Starter
          </span>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
              <path d="M12 6v6l4 2" />
            </svg>
            <h2>About Me</h2>
          </div>
          <p className={styles.bio}>
            Hello! I'm a passionate developer who loves creating beautiful and
            functional software and (web) applications. With a background in
            software development, AI and managing software, I bring a unique
            perspective to every project.
          </p>
          <p className={styles.bio}>
            I specialize in building complex backend systems for sites and
            applications, and dabble in Frotend with agentic AI. When I'm not
            coding, you can find me exploring new projects, having fun in a game
            or climbing a tough boulder.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <h2>Experience</h2>
          </div>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <h3>Backend Engineer</h3>
                <p className={styles.company}>Codeflex, Eindhoven</p>
                <p className={styles.period}>2024 - Present</p>
                <p className={styles.description}>
                  Working as a backend engineer developing scalable systems
                  using Python and JavaScript/TypeScript. Building robust APIs
                  and backend infrastructure.
                </p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <h3>Master Thesis Internship</h3>
                <p className={styles.company}>Philips, Best, Netherlands</p>
                <p className={styles.period}>2023-2024</p>
                <p className={styles.description}>
                  Conducted research on software analysis for master thesis.
                  Worked extensively with Python and C++ to analyze and improve
                  software systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            <h2>Education</h2>
          </div>
          <div className={styles.education}>
            <h3>Master of Science in Computer Science and Engineering</h3>
            <p className={styles.school}>TU Eindhoven</p>
            <p className={styles.period}>2021 - 2024</p>
          </div>
          <div className={styles.education}>
            <h3>Bachelor of Science in Computer Science and Engineering</h3>
            <p className={styles.school}>TU Eindhoven</p>
            <p className={styles.period}>2018 - 2021</p>
          </div>
        </section>
      </div>
    </div>
  );
});

AboutMe.displayName = "AboutMe";
