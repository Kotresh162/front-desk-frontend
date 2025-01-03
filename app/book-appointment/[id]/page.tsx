"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation"; // Use useSearchParams instead of useRouter
import styles from "../../../styles/styles.module.css";

interface Patient {
  id: number;
  name: string;
  disease: string;
  specializedDoctor: string;
  arrivalTime: string;
}

export default function BookAppointment() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string>("");

  // Use useSearchParams to get query parameters
  const searchParams = useSearchParams();
  const patientId = searchParams.get("id"); // Access the id from query params

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (patientId) {
          const patientResponse = await axios.get(`http://localhost:5000/patients/${patientId}`);
          setPatient(patientResponse.data);
        } else {
          setError("Patient ID is missing in the URL.");
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
        setError("There was an issue fetching patient details.");
      }
    };

    fetchPatient();
  }, [patientId]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Book Appointment for {patient?.name || "Loading..."}</h1>
      </header>

      {error && <p className={styles.error}>{error}</p>}

      {patient ? (
        <section className={styles.content}>
          <h3>Patient Details</h3>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Disease:</strong> {patient.disease}</p>
          <p><strong>Specialized Doctor:</strong> {patient.specializedDoctor}</p>
          <p><strong>Arrival Time:</strong> {patient.arrivalTime}</p>
        </section>
      ) : (
        <p>Loading patient details...</p>
      )}
    </div>
  );
}
