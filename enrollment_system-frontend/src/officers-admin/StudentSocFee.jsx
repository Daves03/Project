import React from "react";
import "./officers-css/student-socfee.css";

const EnrollStudent = () => {
  return (
    <div className="socite-fee-container">
      <h1 className="title-officers">Students Society Fee</h1>

      <div className="top-controls-officers">
        <input
          type="text"
          placeholder="Search by name or student number"
          className="search-bar-officers"
        />

        <select className="filter-officers">
          <option value="">Filter by Section</option>
          <option value="A">BSCS 3-1</option>
        </select>

        <select className="filter-officers">
          <option value="">Filter by Year Level</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <button className="add-btn-officers">Add Paid Student</button>
      </div>

      <div className="table-container-officers">
        <table className="student-table-officers">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Number</th>
              <th>Status</th>
              <th>Year Level</th>
              <th>Section</th>
              <th>Course</th>
              <th>1st year (SocFee)</th>
              <th>2nd year (SocFee)</th>
              <th>3rd year (SocFee)</th>
              <th>4th year (SocFee)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Raven Ampere</td>
              <td>0000000000</td>
              <td>Regular</td>
              <td>3rd Year</td>
              <td>3-1</td>
              <td>BSCS</td>
              <td>paid</td>
              <td>paid</td>
              <td>paid</td>
              <td>not paid</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrollStudent;
