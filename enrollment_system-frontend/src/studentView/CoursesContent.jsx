import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/checklist-student.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [yearFilter, setYearFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found"); // Debugging log
          return;
        }

        console.log("Token:", token); // Debugging log
        const response = await axios.get(
          "http://127.0.0.1:8000/api/checklist",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data); // Debugging log
        setCourses(response.data);
        setFilteredCourses(response.data); // Initialize filtered courses
      } catch (error) {
        console.error("Error fetching checklist data", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    let filteredData = courses;

    if (yearFilter) {
      filteredData = filteredData.filter(
        (course) => course.year === parseInt(yearFilter)
      );
    }

    if (semesterFilter) {
      filteredData = filteredData.filter(
        (course) => course.semester === semesterFilter
      );
    }

    setFilteredCourses(filteredData);
  }, [yearFilter, semesterFilter, courses]);

  return (
    <div className="checklist-container">
      <div className="scrollable-table-container">
        <div className="filter-section">
          <input type="text" className="search-bar" placeholder="Search..." />
          <select
            className="filter-dropdown"
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="">All Years</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
          <select
            className="filter-dropdown"
            onChange={(e) => setSemesterFilter(e.target.value)}
          >
            <option value="">All Semesters</option>
            <option value="1st Semester">1st Semester</option>
            <option value="2nd Semester">2nd Semester</option>
          </select>
        </div>
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
            {filteredCourses.map((course) => (
              <tr key={course.checklist_id}>
                <td>{course.course_code}</td>
                <td>
                  {course.grades.length > 0 && course.grades[0].professor
                    ? course.grades[0].professor.prof_name
                    : "N/A"}
                </td>
                <td>
                  {course.curriculum ? course.curriculum.course_title : "N/A"}
                </td>
                <td>
                  {course.curriculum
                    ? course.curriculum.credit_unit_lec
                    : "N/A"}
                </td>
                <td>
                  {course.curriculum
                    ? course.curriculum.credit_unit_lab
                    : "N/A"}
                </td>
                <td>
                  {course.curriculum
                    ? course.curriculum.contact_hours_lec
                    : "N/A"}
                </td>
                <td>
                  {course.curriculum
                    ? course.curriculum.contact_hours_lab
                    : "N/A"}
                </td>
                <td>
                  {course.curriculum ? course.curriculum.prerequisite : "N/A"}
                </td>
                <td>{course.semester}</td>
                <td>{course.year}</td>
                <td>
                  {course.grades.length > 0
                    ? course.grades[0].final_grade
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
