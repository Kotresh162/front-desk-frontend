"use client";

import styles from "../../styles/patient.module.css";

interface PatientCardProps {
  id: number;
  name: string;
  address: string;
  disease: string;
  specializedDoctor: string;
  arrivalTime: string;
  onDelete: (id: number) => void;
  onBookAppointment: (id: number) => void;
  className?: string; // Make className optional
}

const PatientCard: React.FC<PatientCardProps> = ({
  id,
  name,
  address,
  disease,
  specializedDoctor,
  arrivalTime,
  onDelete,
  onBookAppointment,
  className, // Destructure className
}) => {
  return (
    <div className={`${className} ${styles.patientCard}`}>
      <div className={styles.patientSummary}>
        <h4>{name}</h4>
        <p>{disease}</p>
        <p>{specializedDoctor}</p>
      </div>
      <div className={styles.patientDetails}>
        <p>Arrival Time: {arrivalTime}</p>
        <p>Address: {address}</p>
      </div>
      <button onClick={() => onDelete(id)} className={styles.deleteButton}>
        Delete
      </button>
      <button onClick={() => onBookAppointment(id)} className={styles.bookButton}>
        Book Appointment
      </button>
    </div>
  );
};

export default PatientCard;
