import styles from "./SkipLink.module.css";

export const SkipLink = () => {
  const handleSkipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href="#main-content"
      className={styles.skipLink}
      onClick={handleSkipToContent}
    >
      Skip to main content
    </a>
  );
};
