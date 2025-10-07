import styles from "./KeyboardShortcutsHelp.module.css";

interface KeyboardShortcutsHelpProps {
  onClose: () => void;
}

export const KeyboardShortcutsHelp: React.FC<KeyboardShortcutsHelpProps> = ({
  onClose,
}) => {
  const handleDialogClick = (e: React.MouseEvent) => {
    // Prevent clicks inside the dialog from closing it
    e.stopPropagation();
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div
        className={styles.helpDialog}
        role="dialog"
        aria-label="Keyboard shortcuts"
        onClick={handleDialogClick}
      >
        <div className={styles.header}>
          <h2>Keyboard Shortcuts</h2>
        </div>
        <div className={styles.content}>
          <section className={styles.section}>
            <h3>Desktop Icons</h3>
            <dl className={styles.shortcutList}>
              <dt>Tab</dt>
              <dd>Navigate between icons</dd>
              <dt>Enter</dt>
              <dd>Open window from focused icon</dd>
              <dt>Shift + Tab</dt>
              <dd>Navigate backwards</dd>
            </dl>
          </section>

          <section className={styles.section}>
            <h3>Windows</h3>
            <dl className={styles.shortcutList}>
              <dt>Escape</dt>
              <dd>Close focused window</dd>
              <dt>Alt + M</dt>
              <dd>Minimize focused window</dd>
              <dt>Alt + Enter</dt>
              <dd>Maximize/restore focused window</dd>
              <dt>Click/Focus</dt>
              <dd>Bring window to front</dd>
            </dl>
          </section>

          <section className={styles.section}>
            <h3>Taskbar</h3>
            <dl className={styles.shortcutList}>
              <dt>Tab</dt>
              <dd>Navigate between windows</dd>
              <dt>Enter / Space</dt>
              <dd>Toggle window minimize/restore</dd>
            </dl>
          </section>

          <section className={styles.section}>
            <h3>Theme Switcher</h3>
            <dl className={styles.shortcutList}>
              <dt>Tab</dt>
              <dd>Navigate themes</dd>
              <dt>Enter / Space</dt>
              <dd>Select theme</dd>
            </dl>
          </section>
        </div>
      </div>
    </>
  );
};
