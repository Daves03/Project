import React, { useState, useEffect } from "react";
import axios from "axios";
import "./faculty-css/enrollment-form-faculty.css";

const Enrollment = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [enrollmentStatus, setEnrollmentStatus] = useState({});
  const [checklist, setChecklist] = useState(null);
  const [filteredChecklist, setFilteredChecklist] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "https://backend.cvsu.online/api/enrollments?status=officer_approved"
        );
        console.log("Fetched students:", response.data); // Add this line for debugging
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching enrollments for faculty:", error);
      }
    };

    fetchStudents();
  }, []);

  const openModal = async (student) => {
    console.log("Selected student:", student); // Log the selected student
    if (student.user_id) {
      try {
        const response = await axios.get(
          `https://backend.cvsu.online/api/students/${student.user_id}/checklist`
        );
        setChecklist(response.data.checklist);
        setFilteredChecklist(response.data.checklist); // Set initial filtered checklist
      } catch (error) {
        console.error("Error fetching student checklist:", error);
      }
      setSelectedStudent(student);
      setShowModal(true);
    } else {
      console.error("User ID is missing for the selected student.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
    setChecklist(null);
    setFilteredChecklist(null);
    setSelectedSemester("");
    setSelectedYear("");
  };

  const handleStatusChange = async (studentId, status) => {
    setEnrollmentStatus((prevStatus) => ({
      ...prevStatus,
      [studentId]: status,
    }));

    try {
      const response = await axios.post(
        `https://backend.cvsu.online/api/enrollments/${studentId}/update-status`,
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
        `https://backend.cvsu.online/api/enrollments/${studentId}/faculty-approve`,
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
        `https://backend.cvsu.online/api/enrollments/${studentId}/faculty-decline`,
        { message: "Your enrollment has been declined by faculty." } 
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

  const handleFilterChange = () => {
    let filtered = checklist;
    if (selectedSemester) {
      filtered = filtered.filter((item) => item.semester === selectedSemester);
    }
    if (selectedYear) {
      const selectedYearNumber = parseInt(selectedYear, 10); // Convert selectedYear to a number
      filtered = filtered.filter((item) => item.year === selectedYearNumber); // Match against year
    }
    setFilteredChecklist(filtered);
  };
  useEffect(() => {
    console.log("Checklist data:", checklist); // Log the checklist data
    handleFilterChange();
  }, [selectedSemester, selectedYear, checklist]);

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
              <p>
                <strong>Program: </strong>
                {selectedStudent.program}
              </p>
              <p>
                <strong>Semester: </strong>
                {selectedStudent.semester}
              </p>
              <p>
                <strong>Year: </strong>
                {selectedStudent.year_level}
              </p>
              <div className="modal-header">
                <h2>Checklists</h2>
              </div>
              <div className="filter-section">
                <select
                  className="filter-select"
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                >
                  <option value="">Select Semester</option>
                  <option value="1st Semester">1st Semester</option>
                  <option value="2nd Semester">2nd Semester</option>
                  <option value="Summer">Summer</option>
                </select>
                <select
                  className="filter-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">Select Year</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>

              {filteredChecklist && filteredChecklist.length > 0 ? (
                <table className="checklist-table">
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Instructor</th>
                      <th>Course Title</th>
                      <th>Credit Unit (Lec)</th>
                      <th>Credit Unit (Lab)</th>
                      <th>Contact Hours (Lec)</th>
                      <th>Contact Hours (Lab)</th>
                      <th>Pre-requisite</th>
                      <th>Semester Taken</th>
                      <th>Year Taken</th>
                      <th>Final Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredChecklist.map((item) => (
                      <tr key={item.checklist_id}>
                        <td>{item.course_code}</td>
                        <td>
                          {item.grades.length > 0 && item.grades[0].professor
                            ? item.grades[0].professor.prof_name
                            : "N/A"}
                        </td>
                        <td>
                          {item.curriculum
                            ? item.curriculum.course_title
                            : "N/A"}
                        </td>
                        <td>
                          {item.curriculum
                            ? item.curriculum.credit_unit_lec
                            : "N/A"}
                        </td>
                        <td>
                          {item.curriculum
                            ? item.curriculum.credit_unit_lab
                            : "N/A"}
                        </td>
                        <td>
                          {item.curriculum
                            ? item.curriculum.contact_hours_lec
                            : "N/A"}
                        </td>
                        <td>
                          {item.curriculum
                            ? item.curriculum.contact_hours_lab
                            : "N/A"}
                        </td>
                        <td>
                          {item.curriculum
                            ? item.curriculum.prerequisite
                            : "N/A"}
                        </td>
                        <td>{item.semester}</td>
                        <td>{item.year}</td>
                        <td>
                          {item.grades.length > 0
                            ? item.grades[0].final_grade
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No checklist available.</p>
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

export default Enrollment;
