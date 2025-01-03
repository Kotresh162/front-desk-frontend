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
  location: string;
  availability: "free" | "busy" | "offduty";
}

export default function DoctorManagement() {
  // State for doctors list
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  // State for new doctor form
  const [newDoctor, setNewDoctor] = useState<Doctor>({
    id: 0,
    name: "",
    course: "",
    specialization: "",
    ratings: 0,
    description: "",
    location: "",
    availability: "free",
  });

  // State for form visibility
  const [showForm, setShowForm] = useState<boolean>(false);

  // State for error handling
  const [error, setError] = useState<string>("");

  // State for filtering
  const [specializationFilter, setSpecializationFilter] = useState<string>("");
  const [ratingFilter, setRatingFilter] = useState<number | "">("");
  const [availabilityFilter, setAvailabilityFilter] = useState<"free" | "busy" | "offduty" | "">("");

  // State for theme
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  // Fetch doctors from the backend
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("https://front-desk-system.onrender.com/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Filter doctors by specialization, ratings, and availability
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialization =
      !specializationFilter || doctor.specialization.includes(specializationFilter);
    const matchesRating = !ratingFilter || doctor.ratings >= ratingFilter;
    const matchesAvailability = !availabilityFilter || doctor.availability === availabilityFilter;
    return matchesSpecialization && matchesRating && matchesAvailability;
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDoctor({
      ...newDoctor,
      [name]: name === "ratings" ? parseFloat(value) || 0 : value, // Convert ratings to number
    });
  };

  // Handle form submission
  const handleAddDoctor = async () => {
    if (
      !newDoctor.name ||
      !newDoctor.course ||
      !newDoctor.specialization ||
      !newDoctor.description ||
      newDoctor.ratings === 0 ||
      !newDoctor.location ||
      !newDoctor.availability
    ) {
      setError("All fields are required. Please fill in the missing data.");
      return;
    }

    if (newDoctor.ratings < 0 || newDoctor.ratings > 5) {
      setError("Ratings must be a number between 0 and 5.");
      return;
    }

    try {
      const response = await axios.post("https://front-desk-system.onrender.com/doctors", newDoctor);
      setDoctors([...doctors, response.data]);
      setNewDoctor({
        id: 0,
        name: "",
        course: "",
        specialization: "",
        ratings: 0,
        description: "",
        location: "",
        availability: "free",
      });
      setShowForm(false);
      setError(""); // Reset error message
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setShowForm(false);
    setError(""); // Reset error message
  };

  // Handle delete doctor
  const handleDeleteDoctor = async (id: number) => {
    try {
      await axios.delete(`https://front-desk-system.onrender.com/doctors/${id}`);
      setDoctors(doctors.filter((doctor) => doctor.id !== id));
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  // Toggle theme (light/dark)
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={`${styles.page} ${isDarkTheme ? styles.dark : styles.light}`}>
      <header className={styles.header}>
        <h1>Doctor Management</h1>
        <button onClick={() => setShowForm(true)} className={styles.addButton}>Add Doctor</button>
        <button onClick={toggleTheme} className={styles.themeButton}>Toggle Theme</button>
      </header>
      <section className={styles.content}>
        <h2>Organize Your Hospital Staff</h2>
        <p>Manage doctors' schedules, specialties, and availability.</p>

        {/* Filter Section */}
        <div className={styles.filterSection}>
          <input
            type="text"
            placeholder="Filter by Specialization"
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
          />
          <input
            type="number"
            placeholder="Filter by Ratings"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(parseInt(e.target.value) || "")}
          />
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value as "free" | "busy" | "offduty" | "")}
          >
            <option value="">All Availability</option>
            <option value="free">Free</option>
            <option value="busy">Busy</option>
            <option value="offduty">Off Duty</option>
          </select>
        </div>

        {/* Form to add a new doctor */}
        {showForm && (
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
              type="number"
              name="ratings"
              placeholder="Ratings (0-5)"
              value={newDoctor.ratings}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newDoctor.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newDoctor.location}
              onChange={handleInputChange}
            />
            <select
              name="availability"
              value={newDoctor.availability}
              onChange={handleInputChange}
            >
              <option value="free">Free</option>
              <option value="busy">Busy</option>
              <option value="offduty">Off Duty</option>
            </select>
            {error && <p className={styles.error}>{error}</p>}
            <div>
              <button onClick={handleAddDoctor} className={styles.addDoctorButton}>Add</button>
              <button onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        )}

        {/* Doctor List */}
        <div className={styles.doctorList}>
          <h3>Doctor List</h3>
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className={styles.doctorCard}>
              <div className={styles.doctorSummary}>
                <h4>{doctor.name}</h4>
                <p><strong>Ratings:</strong> {doctor.ratings}</p>
                <p><strong>Specialization:</strong> {doctor.specialization}</p>
                <p><strong>Availability:</strong> {doctor.availability}</p>
              </div>
              <div className={styles.doctorDetails}>
                <p><strong>Course:</strong> {doctor.course}</p>
                <p><strong>Location:</strong> {doctor.location}</p>
                <p>{doctor.description}</p>
              </div>
              <button onClick={() => handleDeleteDoctor(doctor.id)} className={styles.deleteButton}>Delete</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
