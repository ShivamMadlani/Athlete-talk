import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>Athlete-Talk</h1>
      </div>
      <Link href="/login">Login</Link>
      <Link href="/signup">sign up</Link>
    </main>
  );
}
