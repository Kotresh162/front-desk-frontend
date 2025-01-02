"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/styles.module.css";

// Define the type for a doctor
interface Doctor {
  id: number;
  name: string;
  course: string;
  specialization: string;
  ratings: number;
  description: string;
}

export default function DoctorManagement() {
  // Use the Doctor interface to type the doctors state
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [newDoctor, setNewDoctor] = useState<Doctor>({
    id: 0,
    name: "",
    course: "",
    specialization: "",
    ratings: 0,
    description: "",
  });

  // Fetch doctors from the backend
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    setNewDoctor({
      ...newDoctor,
      [name]: name === "ratings" ? parseFloat(value) || 0 : value, // Convert ratings to number
    });
  };
  
  const handleAddDoctor = async () => {
    // Validate that ratings is a number between 0 and 5 (or whatever range you expect)
    if (newDoctor.ratings < 0 || newDoctor.ratings > 5) {
      alert("Ratings must be a number between 0 and 5.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/doctors", newDoctor);
      setDoctors([...doctors, response.data]);
      setNewDoctor({
        id: 0,
        name: "",
        course: "",
        specialization: "",
        ratings: 0,
        description: "",
      });
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };
  

  const handleDeleteDoctor = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/doctors/${id}`);
      setDoctors(doctors.filter((doctor) => doctor.id !== id));
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Doctor Management</h1>
      </header>
      <section className={styles.content}>
        <h2>Organize Your Hospital Staff</h2>
        <p>Manage doctors' schedules, specialties, and availability.</p>

        <div className={styles.form}>
          <h3>Add New Doctor</h3>
          <input
            type="text"
            name="name"
            placeholder="Doctor Name"
            value={newDoctor.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={newDoctor.course}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={newDoctor.specialization}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="ratings"
            placeholder="Ratings"
            value={newDoctor.ratings}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newDoctor.description}
            onChange={handleInputChange}
          />
          <button onClick={handleAddDoctor}>Add Doctor</button>
        </div>

        <div className={styles.doctorList}>
          <h3>Doctor List</h3>
          {doctors.map((doctor) => (
            <div key={doctor.id} className={styles.doctorCard}>
              <h4>{doctor.name}</h4>
              <p><strong>Course:</strong> {doctor.course}</p>
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
              <p><strong>Ratings:</strong> {doctor.ratings}</p>
              <p>{doctor.description}</p>
              <button onClick={() => handleDeleteDoctor(doctor.id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
