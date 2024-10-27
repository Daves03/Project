import React from 'react';
import '../css/checklist.css';

const Courses = () => {
  return (
    <div className="checklist-container">
      <div className="scrollable-table-container">
        <div className="filter-section">
          <input type="text" className="search-bar" placeholder="Search..." />
          <select className="filter-dropdown">
            <option value="course">Course</option>
            <option value="instructor">Instructor</option>
            <option value="course-title">Course Title</option>
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
            <tr>
              <td>CS101</td>
              <td>Prof. John Doe</td>
              <td>Introduction to Computer Science</td>
              <td>3</td>
              <td>1</td>
              <td>3</td>
              <td>2</td>
              <td>None</td>
              <td>1st Semester</td>
              <td>2023</td>
              <td>A</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
