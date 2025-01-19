import React, { useState, useEffect } from "react";
import axios from "axios";
import CORModal from "./CORModal";
import ChecklistModal from "./ChecklistModal";
import "./faculty-css/student-checklist.css";

const EnrollStudent = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [yearLevelFilter, setYearLevelFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [showCORModal, setShowCORModal] = useState(false);
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/students/on_process_COR"
        );
        setStudents(response.data);
      } catch (error) {
        console.error(
          "Error fetching students with on process COR status:",
          error
        );
      }
    };

    fetchStudents();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSectionFilter(e.target.value);
  };

  const handleYearLevelChange = (e) => {
    setYearLevelFilter(e.target.value);
  };

  const handleCourseChange = (e) => {
    setCourseFilter(e.target.value);
  };

  const openCORModal = (student) => {
    setSelectedStudent(student);
    setShowCORModal(true);
  };

  const openChecklistModal = (student) => {
    setSelectedStudent(student);
    setShowChecklistModal(true);
  };

  const closeModal = () => {
    setShowCORModal(false);
    setShowChecklistModal(false);
    setSelectedStudent(null);
  };

  const handleCORSubmit = async (subjects) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/students/${selectedStudent.id}/assign-subjects`,
        { subjects: subjects.map((subject) => subject.course_code) },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Subjects assigned successfully.");
      closeModal();
    } catch (error) {
      console.error("Error assigning subjects:", error);
      alert("Failed to assign subjects.");
    }
  };

  const filteredStudents = students.filter((student) => {
    return (
      (searchTerm === "" ||
        student.details.first_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        student.details.student_number.includes(searchTerm)) &&
      (sectionFilter === "" || student.details.section === sectionFilter) &&
      (yearLevelFilter === "" ||
        student.details.year_level === yearLevelFilter) &&
      (courseFilter === "" || student.details.course === courseFilter)
    );
  });

  return (
    <div className="student-checklist-container">
      <h1 className="title-faculty">Enroll Student</h1>

      <div className="top-controls-faculty">
        <input
          type="text"
          placeholder="Search by name or student number"
          className="search-bar-faculty"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <select
          className="filter-faculty"
          value={sectionFilter}
          onChange={handleSectionChange}
        >
          <option value="">Filter by Section</option>
          <option value="A">BSCS 3-1</option>
        </select>

        <select
          className="filter-faculty"
          value={yearLevelFilter}
          onChange={handleYearLevelChange}
        >
          <option value="">Filter by Year Level</option>
          <option value="First Year">First Year</option>
          <option value="Second Year">Second Year</option>
          <option value="Third Year">Third Year</option>
          <option value="Fourth Year">Fourth Year</option>
        </select>

        <select
          className="filter-faculty"
          value={courseFilter}
          onChange={handleCourseChange}
        >
          <option value="">Filter by Course</option>
          <option value="Bachelor of Science in Computer Science">
            Bachelor of Science in Computer Science
          </option>
          <option value="Bachelor of Science in Electronics and Communications Engineering">
            Bachelor of Science in Electronics and Communications Engineering
          </option>
          <option value="Bachelor of Science in Information Technology">
            Bachelor of Science in Information Technology
          </option>
        </select>
      </div>

      <div className="table-container-faculty">
        <table className="student-table-faculty">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Number</th>
              <th>Status</th>
              <th>Year Level</th>
              <th>Section</th>
              <th>Course</th>
              <th>Address</th>
              <th>Email</th>
              <th>Guardian</th>
              <th>Guardian Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>
                  {student.details.first_name} {student.details.last_name}
                </td>
                <td>{student.details.student_number}</td>
                <td>{student.details.student_status}</td>
                <td>{student.details.year_level}</td>
                <td>{student.details.section}</td>
                <td>{student.details.course}</td>
                <td>{student.details.address}</td>
                <td>{student.details.email}</td>
                <td>{student.details.guardian_name}</td>
                <td>{student.details.guardian_phone}</td>
                <td className="actions-cell">
                  <button
                    onClick={() => openCORModal(student)}
                    className="action-btn-faculty"
                  >
                    Give COR
                  </button>
                  <button
                    onClick={() => openChecklistModal(student)}
                    className="view-btn-faculty"
                  >
                    View Checklist
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCORModal && (
        <CORModal
          student={selectedStudent}
          onClose={closeModal}
          onSubmit={handleCORSubmit}
        />
      )}

      {showChecklistModal && (
        <ChecklistModal student={selectedStudent} onClose={closeModal} />
      )}
    </div>
  );
};

export default EnrollStudent;
