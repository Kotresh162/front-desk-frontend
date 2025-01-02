"use client";

import styles from "../../styles/Home.module.css";

export default function Appointments() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Appointment Scheduling</h1>
      </header>
      <section className={styles.content}>
        <h2>Efficient Scheduling for Patients</h2>
        <p>Book and manage appointments seamlessly for both patients and doctors.</p>
      </section>
    </div>
  );
}
