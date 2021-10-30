import styles from "../styles/components/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="/">thINK</a>
      <p>
        Il giornalino <i>degli</i> studenti, <i>per gli</i> studenti
      </p>
    </header>
  );
}
