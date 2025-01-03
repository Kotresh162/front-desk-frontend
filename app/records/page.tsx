"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "../../styles/patient.module.css";
import PatientCard from "./PatientCard"; // Import the PatientCard component
import { color } from "framer-motion";

interface Patient {
  id: number;
  name: string;
  address: string;
  disease: string;
  specializedDoctor: string;
  arrivalTime: string;
}

export default function PatientManagement() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [newPatient, setNewPatient] = useState<Patient>({
    id: 0,
    name: "",
    address: "",
    disease: "",
    specializedDoctor: "",
    arrivalTime: "",
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const router = useRouter();

  const fetchPatients = async () => {
    try {
      const response = await axios.get("https://front-desk-system.onrender.com/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleAddPatient = async () => {
    if (!newPatient.name || !newPatient.address || !newPatient.disease || !newPatient.specializedDoctor || !newPatient.arrivalTime) {
      setError("All fields are required. Please fill in the missing data.");
      return;
    }

    try {
      const response = await axios.post("https://front-desk-system.onrender.com/patients", newPatient);
      setPatients([...patients, response.data]);
      setNewPatient({
        id: 0,
        name: "",
        address: "",
        disease: "",
        specializedDoctor: "",
        arrivalTime: "",
      });
      setShowForm(false);
      setError("");
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setError("");
  };

  const handleDeletePatient = async (id: number) => {
    try {
      await axios.delete(`https://front-desk-system.onrender.com/patients/${id}`);
      setPatients(patients.filter((patient) => patient.id !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleBookAppointment = (id: number) => {
    router.push(`/book-appointment/${id}`);
  };

  const sortedPatients = patients.sort((a, b) => a.arrivalTime.localeCompare(b.arrivalTime));

  return (
    <div className={`${styles.page} ${isDarkTheme ? styles.dark : styles.light}`}>
      <header className={styles.header}>
        <h1>Patient Management</h1>
        <button onClick={toggleTheme} className={styles.themeButton}>Toggle Theme</button>
      </header>
      <section className={styles.content}>
      <h2 style={{ fontWeight: 'bold' }}>Manage Patient Records</h2>
        <p style={{fontWeight:10}}>Organize patient details.</p>

        {showForm && (
          <div className={styles.form}>
            <h3>Add New Patient</h3>
            <input type="text" name="name" placeholder="Patient Name" value={newPatient.name} onChange={handleInputChange} />
            <input type="text" name="address" placeholder="Address" value={newPatient.address} onChange={handleInputChange} />
            <input type="text" name="disease" placeholder="Disease" value={newPatient.disease} onChange={handleInputChange} />
            <input type="text" name="specializedDoctor" placeholder="Specialized Doctor" value={newPatient.specializedDoctor} onChange={handleInputChange} />
            <input type="time" name="arrivalTime" value={newPatient.arrivalTime} onChange={handleInputChange} />
            {error && <p className={styles.error}>{error}</p>}
            <div>
              <button onClick={handleAddPatient} className={styles.addButton}>Add</button>
              <button onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        )}

        <div className={styles.patientList}>
          {sortedPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              {...patient}
              onDelete={handleDeletePatient}
              onBookAppointment={handleBookAppointment}
              className={styles.patientCard} // Pass the className here
            />
          ))}
        </div>

        {/* Move the Add Patient button here */}
        <div className={styles.addButtonContainer}>
          <button onClick={() => setShowForm(true)} className={styles.addButton}>Add Patient</button>
        </div>
      </section>
    </div>
  );
}
