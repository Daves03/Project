import React, { useEffect, useState } from "react";
import axios from "axios";
import "./faculty-css/checklist-modal.css";

const ChecklistModal = ({ student, onClose }) => {
  const [checklist, setChecklist] = useState([]);
  const [filteredChecklist, setFilteredChecklist] = useState([]);
  const [yearFilter, setYearFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const response = await axios.get(
          `https://backend.cvsu.online/api/students/${student.user_id}/checklist`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("API Response:", response.data);

        // Extract the checklist array from the response object
        const data = response.data.checklist || [];
        console.log("Extracted Checklist:", data);
        setChecklist(data);
        setFilteredChecklist(data); // Initialize filtered checklist
      } catch (error) {
        console.error("Error fetching checklist:", error);
      }
    };

    fetchChecklist();
  }, [student.user_id]);

  // Update filtered checklist based on filters
  useEffect(() => {
    let filteredData = checklist;

    if (yearFilter) {
      filteredData = filteredData.filter((item) => item.year == yearFilter);
    }

    if (semesterFilter) {
      filteredData = filteredData.filter(
        (item) => item.semester === semesterFilter
      );
    }

    setFilteredChecklist(filteredData);
  }, [yearFilter, semesterFilter, checklist]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Student Checklist</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {/* Filters */}
          <div className="filters">
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="">All Year Levels</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
            <select
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
            >
              <option value="">All Semesters</option>
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
            </select>
          </div>
          {filteredChecklist.length === 0 ? (
            <p>No checklist data available.</p>
          ) : (
            <table className="checklist-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th>Credit Unit (Lec)</th>
                  <th>Credit Unit (Lab)</th>
                  <th>Contact Hours (Lec)</th>
                  <th>Contact Hours (Lab)</th>
                  <th>Final Grade</th>
                  <th>Year Level</th> {/* Added Year Level column */}
                  <th>Semester</th> {/* Added Semester column */}
                </tr>
              </thead>
              <tbody>
                {filteredChecklist.map((item, index) => (
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
                    <td>{item.grades?.[0]?.final_grade || "N/A"}</td>
                    <td>{item.year || "N/A"}</td> {/* Added Year Level value */}
                    <td>{item.semester || "N/A"}</td>{" "}
                    {/* Added Semester value */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChecklistModal;
