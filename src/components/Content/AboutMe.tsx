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
        <h1 className={styles.name}>Jane Doe</h1>
        <p className={styles.role}>Full Stack Developer & Designer</p>
        <div className={styles.badges}>
          <span className={styles.badge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            5+ Years Experience
          </span>
          <span className={styles.badge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.21 9l-4.38-6.56a1 1 0 00-1.66 0L6.79 9H2a1 1 0 00-.78 1.63l9.4 11.84a1 1 0 001.56 0l9.4-11.84A1 1 0 0022 9h-4.79z" />
            </svg>
            Award Winner
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
            functional web experiences. With a background in both design and
            development, I bring a unique perspective to every project.
          </p>
          <p className={styles.bio}>
            I specialize in building modern web applications using React,
            TypeScript, and Node.js. When I'm not coding, you can find me
            exploring new design trends or enjoying a cup of coffee.
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
                <h3>Senior Frontend Developer</h3>
                <p className={styles.company}>Tech Company Inc.</p>
                <p className={styles.period}>2021 - Present</p>
                <p className={styles.description}>
                  Leading frontend development for enterprise applications,
                  mentoring junior developers, and implementing modern design
                  systems.
                </p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <h3>Full Stack Developer</h3>
                <p className={styles.company}>Startup Co.</p>
                <p className={styles.period}>2019 - 2021</p>
                <p className={styles.description}>
                  Built and maintained full-stack applications, collaborated
                  with designers, and contributed to product strategy.
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
            <h3>Bachelor of Science in Computer Science</h3>
            <p className={styles.school}>University Name</p>
            <p className={styles.period}>2015 - 2019</p>
          </div>
        </section>
      </div>
    </div>
  );
});

AboutMe.displayName = "AboutMe";
