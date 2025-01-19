import React, { useState, useEffect } from "react";
import axios from "axios";
import "./faculty-css/cor-modal.css";

const CORModal = ({ student, onClose, onSubmit }) => {
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [programFilter, setProgramFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [studentStatus, setStudentStatus] = useState(
    student.details.student_status || ""
  );
  const [studentYear, setStudentYear] = useState(
    student.details.year_level || ""
  );
  const [studentSemester, setStudentSemester] = useState(
    student.details.semester || ""
  );

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/curriculum"
        );
        setAvailableSubjects(response.data);
        setFilteredSubjects(response.data);
      } catch (error) {
        console.error("Error fetching curriculum subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    filterSubjects();
  }, [programFilter, yearFilter, semesterFilter, selectedSubjects]);

  const filterSubjects = () => {
    let subjects = availableSubjects;

    if (programFilter) {
      subjects = subjects.filter(
        (subject) => subject.program === programFilter
      );
    }
    if (yearFilter) {
      subjects = subjects.filter(
        (subject) => subject.year.toString() === yearFilter
      );
    }
    if (semesterFilter) {
      subjects = subjects.filter(
        (subject) => subject.semester.toString() === semesterFilter
      );
    }

    const selectedCodes = selectedSubjects.map(
      (subject) => subject.course_code
    );
    const sortedSubjects = [
      ...selectedSubjects,
      ...subjects.filter(
        (subject) => !selectedCodes.includes(subject.course_code)
      ),
    ];

    setFilteredSubjects(sortedSubjects);
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubjects([...selectedSubjects, subject]);
  };

  const handleDeselectSubject = (subject) => {
    setSelectedSubjects(
      selectedSubjects.filter(
        (item) => item.course_code !== subject.course_code
      )
    );
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/students/${student.id}/assign-subjects`,
        { subjects: selectedSubjects.map((subject) => subject.course_code) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await axios.post(
        `http://127.0.0.1:8000/api/students/${student.id}/update-status`,
        {
          student_status: studentStatus,
          year_level: studentYear,
          semester: studentSemester,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      onSubmit(selectedSubjects);
    } catch (error) {
      console.error("Error assigning subjects or updating status:", error);
    }
  };

  const isSelected = (subject) => {
    return selectedSubjects.some(
      (item) => item.course_code === subject.course_code
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Change Student Status</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="status-section">
            <label>Student Status</label>
            <select
              className="status-dropdown"
              value={studentStatus}
              onChange={(e) => setStudentStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Regular">Regular</option>
              <option value="Irregular">Irregular</option>
            </select>
            <label>Year Level</label>
            <select
              className="status-dropdown"
              value={studentYear}
              onChange={(e) => setStudentYear(e.target.value)}
            >
              <option value="">Select Year</option>
              <option value="First Year">First Year</option>
              <option value="Second Year">Second Year</option>
              <option value="Third Year">Third Year</option>
              <option value="Fourth Year">Fourth Year</option>
            </select>
            <label>Semester</label>
            <select
              className="status-dropdown"
              value={studentSemester}
              onChange={(e) => setStudentSemester(e.target.value)}
            >
              <option value="">Select Semester</option>
              <option value="First Semester">First Semester</option>
              <option value="Second Semester">Second Semester</option>
            </select>
          </div>

          <div className="assign-subjects-section">
            <h2>Give Student Subjects</h2>
            <div className="filter-section">
              <select
                className="filter-dropdown"
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
              >
                <option value="">Filter by Program</option>
                {[
                  ...new Set(
                    availableSubjects.map((subject) => subject.program)
                  ),
                ].map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
              <select
                className="filter-dropdown"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option value="">Filter by Year</option>
                {[
                  ...new Set(
                    availableSubjects.map((subject) => subject.year.toString())
                  ),
                ].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                className="filter-dropdown"
                value={semesterFilter}
                onChange={(e) => setSemesterFilter(e.target.value)}
              >
                <option value="">Filter by Semester</option>
                {[
                  ...new Set(
                    availableSubjects.map((subject) =>
                      subject.semester.toString()
                    )
                  ),
                ].map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </div>
            <table className="subjects-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th>Credit Unit (Lec)</th>
                  <th>Credit Unit (Lab)</th>
                  <th>Contact Hours (Lec)</th>
                  <th>Contact Hours (Lab)</th>
                  <th>Pre-requisite</th>
                  <th>Program</th>
                  <th>Year</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubjects.map((subject) => (
                  <tr key={subject.course_code}>
                    <td>
                      <input
                        type="checkbox"
                        checked={isSelected(subject)}
                        onChange={() => {
                          if (isSelected(subject)) {
                            handleDeselectSubject(subject);
                          } else {
                            handleSelectSubject(subject);
                          }
                        }}
                      />
                    </td>
                    <td>{subject.course_code}</td>
                    <td>{subject.course_title}</td>
                    <td>{subject.credit_unit_lec}</td>
                    <td>{subject.credit_unit_lab}</td>
                    <td>{subject.contact_hours_lec}</td>
                    <td>{subject.contact_hours_lab}</td>
                    <td>{subject.prerequisite}</td>
                    <td>{subject.program}</td>
                    <td>{subject.year}</td>
                    <td>{subject.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={handleSubmit} className="submit-btn">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CORModal;
