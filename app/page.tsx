"use client"; // Enables client-side rendering

import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa"; // Import icons from react-icons
import styles from "../styles/Home.module.css"; // Import the CSS module

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setScrollingUp(true);
      } else {
        setScrollingUp(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={isDarkMode ? styles.darkTheme : styles.lightTheme}>
      <header className={styles.header}>
        <h1>
          <span>WELCOME TO ALLO HEALTH</span>
          <br />
          <span>YOUR HOME GUARDIAN</span>
        </h1>
        {/* Theme toggle with icon */}
        <button onClick={toggleTheme} className={styles.themeToggleBtn}>
          {isDarkMode ? (
            <FaSun color="gold" size={24} />
          ) : (
            <FaMoon color="gold" size={24} />
          )}
        </button>
      </header>

      {/* Hero Section */}
      {/* Hero Section */}
      <section className={styles.hero}>
        <h2>Welcome to Our Hospital Management System</h2>
        <p>Streamline your healthcare services efficiently.</p>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
      <div className={`${styles.featureCard} ${scrollingUp ? styles.show : ""} ${styles.staffCard}`}>
        <h3>Staff Management</h3>
        <p>Organize your hospital staff easily.</p>
      </div>
      <div className={`${styles.featureCard} ${scrollingUp ? styles.show : ""} ${styles.appointmentCard}`}>
        <h3>Appointment Scheduling</h3>
        <p>Efficient scheduling for patients.</p>
      </div>
      <div className={`${styles.featureCard} ${scrollingUp ? styles.show : ""} ${styles.recordsCard}`}>
        <h3>Patient Records</h3>
        <p>Access records securely anytime.</p>
      </div>
      </section>

      {/* About Us Section */}
      <section className={styles.aboutUs}>
        <h2>About Us</h2>
        <p>
          Welcome to Allo Health, where we provide innovative solutions to
          manage healthcare services with ease. Our Hospital Management System
          is designed to simplify appointment scheduling, manage patient
          records, and improve the overall hospital experience for both staff and
          patients.
        </p>
        <p>
          Our mission is to ensure efficient and accessible healthcare services,
          powered by technology and a user-friendly interface.
        </p>
      </section>
    </div>
  );
}
