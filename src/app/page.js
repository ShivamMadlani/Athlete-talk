'use client'
import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../assets/logo.jpg'
import Typewriter from 'typewriter-effect'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <Image src={logo} width={60} className={styles.logo} alt='logo' />
          <h1 className={styles.heading}>Athlete-Talk</h1>
        </div>
        <div className={styles.content}>
          <h1 className={styles.txt}>
            <span className={styles.txt2}>
              <Typewriter
                options={{
                  strings: ['Strive, sweat, and succeed.', 'Train tirelessly, triumph triumphantly.', 'Success starts with sacrifice, not shortcuts.', 'Champions chase challenges, conquer courses.'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span></h1>
        </div>
      </div>
      <div className={styles.loginContainer}>
        <h3 className={styles.loginTitle}>Get Started</h3>
        <div className={styles.loginBtns}>
          <Link href="/login" className={styles.loginBtn}>Login</Link>
          <Link href="/signup" className={styles.signupBtn}>sign up</Link>
        </div>
        <footer className={styles.footer}>
            &#169; 2023 copyright-<a href="www.google.com">athletetalk.com</a>
        </footer>
      </div>
    </main>
  );
}
