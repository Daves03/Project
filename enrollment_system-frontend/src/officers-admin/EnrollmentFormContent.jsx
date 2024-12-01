import React, { useState, useEffect } from "react";
import axios from "axios";
import "./officers-css/enrollment-form-officers.css";

const Enrollment = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/students");
        console.log("API Response:", response.data);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
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

  const approveEnrollment = async (studentId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/enrollments/${studentId}/approve`
      );

      if (response.status === 200) {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== studentId)
        );
        alert(response.data.message);
      } else {
        alert("Failed to approve enrollment.");
      }
    } catch (error) {
      console.error("Error approving enrollment:", error);
      alert("Failed to approve enrollment.");
    }
  };

  const declinePayment = async (studentId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/students/${studentId}/decline-payment`,
        {
          message: "Your payment was declined due to invalid details.",
        }
      );

      alert("Payment decline notification sent to the student.");

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== studentId)
      );
    } catch (error) {
      console.error("Error declining payment:", error);
      alert("Failed to send decline notification.");
    }
  };

  return (
    <div className="enrollment-container">
      <h2 className="title">Enrollment Forms</h2>

      {students.length === 0 ? (
        <p>No New Enrollment.</p>
      ) : (
        <table className="notification-table">
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  {student.first_name} {student.last_name}
                </td>
                <td>{student.student_number}</td>
                <td className="buttons-cell">
                  <button
                    onClick={() => openModal(student)}
                    className="view-btn"
                  >
                    View Form
                  </button>
                  <button
                    className="accept-btn"
                    onClick={() => approveEnrollment(student.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="decline-btn"
                    onClick={() => declinePayment(student.id)}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
              <br />
              <div className="modal-header">
                <h2>Payment Details</h2>
              </div>
              <br />
              <p>
                <strong>Mobile Number: </strong>
                {selectedStudent.payment?.mobile_number}
              </p>
              <p>
                <strong>Amount: </strong>
                {selectedStudent.payment?.amount}
              </p>
              <p>
                <strong>Sender Name: </strong>
                {selectedStudent.payment?.sender_name}
              </p>
              <p>
                <strong>Reference Number: </strong>
                {selectedStudent.payment?.reference_number}
              </p>
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
