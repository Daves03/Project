import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin-css/enrollment-form.css";

const EnrollmentFormContent = () => {
  const [students, setStudents] = useState([]);
  const [enrollmentStatus, setEnrollmentStatus] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [corData, setCorData] = useState(null);
  const [checklistData, setChecklistData] = useState(null);
  const [section, setSection] = useState(""); // State for section

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/admin/enrollments"
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching enrollments for admin:", error);
      }
    };

    fetchStudents();
  }, []);

  const openModal = async (student) => {
    setSelectedStudent(student);
    setSection(student.section || ""); // Initialize section state
    setShowModal(true);

    if (!student.user_id) {
      console.error("No user_id found for the selected student.");
      return;
    }

    // Fetch COR data for the selected student
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/students/${student.user_id}/cor`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCorData(response.data); // Set COR data
    } catch (error) {
      console.error("Error fetching COR data:", error);
      setCorData(null);
    }

    // Fetch Checklist data for the selected student
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/students/${student.user_id}/checklist`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setChecklistData(response.data.checklist); // Set Checklist data
    } catch (error) {
      console.error("Error fetching checklist data:", error);
      setChecklistData(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
    setCorData(null);
    setChecklistData(null);
  };
  const updateSection = async () => {
    if (!selectedStudent) {
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/students/${selectedStudent.user_id}/update-section`,
        { section },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Section updated successfully.");
        setSelectedStudent((prevStudent) => ({
          ...prevStudent,
          section,
        }));
      } else {
        alert("Failed to update section.");
      }
    } catch (error) {
      console.error("Error updating section:", error);
      alert("Failed to update section.");
    }
  };

  const acceptEnrollment = async (studentId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/enrollments/${studentId}/admin-approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== studentId)
        );
        alert("Enrollment approved by admin.");
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
        `http://127.0.0.1:8000/api/enrollments/${studentId}/admin-decline`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== studentId)
        );
        alert("Enrollment declined by admin.");
      } else {
        alert("Failed to decline enrollment.");
      }
    } catch (error) {
      console.error("Error declining enrollment:", error);
      alert("Failed to decline enrollment.");
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
                {student.first_name} {student.middle_name} {student.last_name} |{" "}
                {student.year_level} | {student.semester} | {student.program}
              </td>
              <td>{student.student_number}</td>

              {enrollmentStatus[student.id] === "Irregular" && (
                <td>
                  <button className="irregular-subjects-btn">
                    Select Irregular Subjects
                  </button>
                </td>
              )}
              <td className="buttons-cell">
                <button onClick={() => openModal(student)} className="view-btn">
                  View COR
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
                <strong>Name: </strong> {selectedStudent.first_name}{" "}
                {selectedStudent.last_name}
              </p>
              <p>
                <strong>Student Number: </strong>{" "}
                {selectedStudent.student_number}
              </p>
              <p>
                <strong>Year: </strong> {selectedStudent.year_level}
              </p>
              <p>
                <strong>Program: </strong> {selectedStudent.program}
              </p>
              <p>
                <strong>Semester: </strong> {selectedStudent.semester}
              </p>
              <p>
                {" "}
                <strong>Section: </strong>{" "}
                <select
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                >
                  {" "}
                  <option value="">Select a section</option>{" "}
                  <option value="1-1">1-1</option>{" "}
                  <option value="1-2">1-2</option>{" "}
                  <option value="1-3">1-3</option>{" "}
                  <option value="2-1">2-1</option>{" "}
                  <option value="2-2">2-2</option>{" "}
                  <option value="2-3">2-3</option>{" "}
                  <option value="3-1">3-1</option>{" "}
                  <option value="3-2">3-2</option>{" "}
                  <option value="3-3">3-3</option>{" "}
                  <option value="4-1">4-1</option>{" "}
                  <option value="4-2">4-2</option>{" "}
                  <option value="4-3">4-3</option>{" "}
                </select>{" "}
                <button onClick={updateSection} className="update-section-btn">
                  {" "}
                  Update Section{" "}
                </button>{" "}
              </p>

              <div className="modal-header">
                <h2>Certificate of Registration (COR)</h2>
              </div>
              {corData ? (
                <table className="cor-table">
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Title</th>
                      <th>Credit Unit (Lec)</th>
                      <th>Credit Unit (Lab)</th>
                      <th>Contact Hours (Lec)</th>
                      <th>Contact Hours (Lab)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {corData.subjects.map((subject) => (
                      <tr key={subject.course_code}>
                        <td>{subject.course_code}</td>
                        <td>{subject.course_title}</td>
                        <td>{subject.credit_unit_lec}</td>
                        <td>{subject.credit_unit_lab}</td>
                        <td>{subject.contact_hours_lec}</td>
                        <td>{subject.contact_hours_lab}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No COR data available for this student.</p>
              )}

              <div className="modal-header">
                <h2>Checklists</h2>
              </div>
              {checklistData ? (
                <table className="checklist-table">
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Title</th>
                      <th>Credit Unit (Lec)</th>
                      <th>Credit Unit (Lab)</th>
                      <th>Contact Hours (Lec)</th>
                      <th>Contact Hours (Lab)</th>
                      <th>Status</th>
                      <th>Final Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checklistData.map((item, index) => (
                      <tr key={item.checklist_id || index}>
                        <td>{item.course_code || "N/A"}</td>
                        <td>{item.curriculum?.course_title || "N/A"}</td>
                        <td>
                          {item.curriculum?.credit_unit_lec !== null
                            ? item.curriculum?.credit_unit_lec
                            : "N/A"}
                        </td>
                        <td>
                          {item.curriculum?.credit_unit_lab !== null
                            ? item.curriculum?.credit_unit_lab
                            : "N/A"}
                        </td>
                        <td>
                          {item.curriculum?.contact_hours_lec !== null
                            ? item.curriculum?.contact_hours_lec
                            : "N/A"}
                        </td>
                        <td>
                          {item.curriculum?.contact_hours_lab !== null
                            ? item.curriculum?.contact_hours_lab
                            : "N/A"}
                        </td>
                        <td>{item.status || "N/A"}</td>
                        <td>{item.grades?.[0]?.final_grade || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No checklist data available for this student.</p>
              )}
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

export default EnrollmentFormContent;
