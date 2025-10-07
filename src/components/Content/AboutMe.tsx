import { memo } from "react";
import styles from "./AboutMe.module.css";

export const AboutMe = memo(() => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.photoPlaceholder}>
          <span className={styles.photoIcon}>👤</span>
        </div>
        <div className={styles.intro}>
          <h1 className={styles.name}>Jane Doe</h1>
          <p className={styles.title}>Full Stack Developer & Designer</p>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <p className={styles.text}>
            Hello! I'm a passionate developer who loves creating beautiful and
            functional web experiences. With a background in both design and
            development, I bring a unique perspective to every project.
          </p>
          <p className={styles.text}>
            I specialize in building modern web applications using React,
            TypeScript, and Node.js. When I'm not coding, you can find me
            exploring new design trends, playing video games, or enjoying a cup
            of coffee while sketching UI concepts.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.experience}>
            <div className={styles.experienceItem}>
              <h3 className={styles.jobTitle}>Senior Frontend Developer</h3>
              <p className={styles.company}>
                Tech Company Inc. • 2021 - Present
              </p>
              <p className={styles.text}>
                Leading frontend development for enterprise applications,
                mentoring junior developers, and implementing modern design
                systems.
              </p>
            </div>
            <div className={styles.experienceItem}>
              <h3 className={styles.jobTitle}>Full Stack Developer</h3>
              <p className={styles.company}>Startup Co. • 2019 - 2021</p>
              <p className={styles.text}>
                Built and maintained full-stack applications, collaborated with
                designers, and contributed to product strategy.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.education}>
            <h3 className={styles.degree}>
              Bachelor of Science in Computer Science
            </h3>
            <p className={styles.school}>University Name • 2015 - 2019</p>
          </div>
        </section>
      </div>
    </div>
  );
});

AboutMe.displayName = "AboutMe";
