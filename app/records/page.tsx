"use client";

import styles from "../../styles/Home.module.css";

export default function PatientRecords() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Patient Records</h1>
      </header>
      <section className={styles.content}>
        <h2>Secure Access to Patient Records</h2>
        <p>View and manage patient records with complete confidentiality.</p>
      </section>
    </div>
  );
}
