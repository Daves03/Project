import React, { useState, useEffect } from "react";
import axios from "axios";
import "./faculty-css/enrollment-form-faculty.css";

const Enrollment = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [enrollmentStatus, setEnrollmentStatus] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/enrollments?status=officer_approved"
        );
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

  const handleStatusChange = async (studentId, status) => {
    setEnrollmentStatus((prevStatus) => ({
      ...prevStatus,
      [studentId]: status,
    }));

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/enrollments/${studentId}/update-status`,
        { student_status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(
        `Student status updated to ${status} for student ID ${studentId}`
      );
    } catch (error) {
      console.error(
        `Failed to update student status for student ID ${studentId}`,
        error
      );
    }
  };

  const acceptEnrollment = async (studentId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/enrollments/${studentId}/faculty-approve`,
        {
          status: enrollmentStatus[studentId] || "Regular",
        }
      );

      if (response.status === 200) {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== studentId)
        );
        alert("Enrollment approved by faculty and forwarded to admin.");
      } else {
        alert("Failed to approve enrollment.");
      }
    } catch (error) {
      console.error("Error approving enrollment:", error);
      alert("Failed to approve enrollment.");
    }
  };

  const declineEnrollment = async (studentId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/enrollments/${studentId}/faculty-decline`
      );

      if (response.status === 200) {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== studentId)
        );
        alert("Enrollment archived.");
      } else {
        alert("Failed to archive enrollment.");
      }
    } catch (error) {
      console.error("Error archiving enrollment:", error);
      alert("Failed to archive enrollment.");
    }
  };

  return (
    <div className="enrollment-container">
      <h2 className="title">Enrollment Forms</h2>

      <table className="notification-table">
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                {student.first_name} {student.last_name} {"|"}{" "}
                {student.year_level} {"|"} {student.semester} {"|"}{" "}
                {student.program}
              </td>
              <td>{student.student_number}</td>
              <td>
                <select
                  value={
                    enrollmentStatus[student.id] ||
                    student.student_status ||
                    "Regular"
                  }
                  onChange={(e) =>
                    handleStatusChange(student.id, e.target.value)
                  }
                >
                  <option value="Regular">Regular</option>
                  <option value="Irregular">Irregular</option>
                </select>
              </td>
              <td className="buttons-cell">
                <button onClick={() => openModal(student)} className="view-btn">
                  View Checklists
                </button>
                <button
                  className="accept-btn"
                  onClick={() => acceptEnrollment(student.id)}
                >
                  Accept
                </button>
                <button
                  className="decline-btn"
                  onClick={() => declineEnrollment(student.id)}
                >
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedStudent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Student Details</h2>
              <button
                className="close-btn"
                onClick={closeModal}
                aria-label="Close Modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <p>
                <strong>Name: </strong>
                {selectedStudent.first_name} {selectedStudent.last_name}
              </p>
              <p>
                <strong>Student Number: </strong>
                {selectedStudent.student_number}
              </p>
              <div className="modal-header">
                <h2>Checklists</h2>
              </div>
              {/* Add checklist details here */}
            </div>

            <div className="modal-footer">
              <button onClick={closeModal} className="close-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enrollment;
