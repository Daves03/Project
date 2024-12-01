import React, { useState, useEffect } from "react";
import axios from "axios";
import "./faculty-css/enrollment-form-faculty.css";

const Enrollment = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/enrollments?status=officer_approved"
        );
        console.log(response.data);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching enrollments for faculty:", error);
      }
    };

    fetchStudents();
  }, []);

  const openModal = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  return (
    <div className="enrollment-container">
      <h2 className="title">Enrollment Forms</h2>

      <table className="notification-table">
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                {student.first_name} {student.last_name}
              </td>
              <td>{student.student_number}</td>
              <td className="buttons-cell">
                <button onClick={() => openModal(student)} className="view-btn">
                  View Checklists
                </button>
                <button className="accept-btn">Accept</button>
                <button className="decline-btn">Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Enrollment;
