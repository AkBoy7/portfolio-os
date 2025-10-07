import { useState, memo } from "react";
import styles from "./Contact.module.css";

export const Contact = memo(() => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission
    alert("Thanks for your message! (This is a demo form)");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Get In Touch</h1>
        <p className={styles.subtitle}>
          Let's connect and create something amazing together
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.icon}>📬</span>
            Contact Information
          </h2>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📧</span>
              <div className={styles.contactInfo}>
                <p className={styles.contactLabel}>Email</p>
                <p className={styles.contactValue}>jane.doe@example.com</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>💼</span>
              <div className={styles.contactInfo}>
                <p className={styles.contactLabel}>LinkedIn</p>
                <p className={styles.contactValue}>linkedin.com/in/janedoe</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>🐙</span>
              <div className={styles.contactInfo}>
                <p className={styles.contactLabel}>GitHub</p>
                <p className={styles.contactValue}>github.com/janedoe</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>🐦</span>
              <div className={styles.contactInfo}>
                <p className={styles.contactLabel}>Twitter</p>
                <p className={styles.contactValue}>@janedoe</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.icon}>✉️</span>
            Send a Message
          </h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                placeholder="Your name"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Your message..."
                required
              />
            </div>
            <button type="submit" className={styles.button}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
});

Contact.displayName = "Contact";
