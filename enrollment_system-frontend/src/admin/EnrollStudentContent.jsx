import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin-css/enroll-student.css";

const EnrollStudent = () => {
  const [approvedEnrollments, setApprovedEnrollments] = useState([]);

  useEffect(() => {
    const fetchApprovedEnrollments = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/approved-enrollments",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setApprovedEnrollments(response.data);
      } catch (error) {
        console.error("Error fetching approved enrollments:", error);
      }
    };

    fetchApprovedEnrollments();
  }, []);

  return (
    <div className="enroll-student-container">
      <h1 className="title">Enroll Student</h1>

      <div className="top-controls">
        <input
          type="text"
          placeholder="Search by name or student number"
          className="search-bar"
        />

        <select className="filter">
          <option value="">Filter by Section</option>
          <option value="A">BSCS 3-1</option>
        </select>

        <select className="filter">
          <option value="">Filter by Year Level</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <button className="add-btn">Add Student</button>
        <button className="add-btn">Add Section</button>
      </div>

      <div className="table-container">
        <table className="student-table">
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
            </tr>
          </thead>
          <tbody>
            {approvedEnrollments.map((student) => (
              <tr key={student.id}>
                <td>
                  {student.first_name} {student.last_name}
                </td>
                <td>{student.student_number}</td>
                <td>{student.student_status}</td>
                <td>{student.year_level}</td>
                <td>{student.section}</td>
                <td>{student.course}</td>
                <td>{student.address}</td>
                <td>{student.email}</td>
                <td>{student.guardian_name}</td>
                <td>{student.guardian_phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrollStudent;
