import React, { useState } from "react";
import "./officers-css/student-socfee.css";

const EnrollStudent = () => {
  const [showModal, setShowModal] = useState(false);
  const [editableData, setEditableData] = useState({
    studentName: "Raven Ampere",
    studentNumber: "0000000000",
    yearLevel: "3rd Year",
    section: "3-1",
    course: "BSCS",
    socFees: {
      firstYear: "paid",
      secondYear: "paid",
      thirdYear: "paid",
      fourthYear: "not paid",
    },
  });

  const handleSocFeeChange = (e, year) => {
    setEditableData({
      ...editableData,
      socFees: {
        ...editableData.socFees,
        [year]: e.target.value,
      },
    });
  };

  const handleSave = () => {
    console.log("Saved Data:", editableData);
    setShowModal(false);
    // Add logic to update the main table with editableData
  };

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

        <button
          className="add-btn-officers"
          onClick={() => setShowModal(true)}
        >
          Add Paid Student
        </button>
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
              <td>{editableData.studentName}</td>
              <td>{editableData.studentNumber}</td>
              <td>Regular</td>
              <td>{editableData.yearLevel}</td>
              <td>{editableData.section}</td>
              <td>{editableData.course}</td>
              <td>{editableData.socFees.firstYear}</td>
              <td>{editableData.socFees.secondYear}</td>
              <td>{editableData.socFees.thirdYear}</td>
              <td>{editableData.socFees.fourthYear}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Student Society Fees</h2>
            <table className="modal-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student Number</th>
                  <th>Year Level</th>
                  <th>Section</th>
                  <th>Course</th>
                  <th>1st Year</th>
                  <th>2nd Year</th>
                  <th>3rd Year</th>
                  <th>4th Year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{editableData.studentName}</td>
                  <td>{editableData.studentNumber}</td>
                  <td>{editableData.yearLevel}</td>
                  <td>{editableData.section}</td>
                  <td>{editableData.course}</td>
                  <td>
                    <input
                      type="text"
                      value={editableData.socFees.firstYear}
                      onChange={(e) => handleSocFeeChange(e, "firstYear")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editableData.socFees.secondYear}
                      onChange={(e) => handleSocFeeChange(e, "secondYear")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editableData.socFees.thirdYear}
                      onChange={(e) => handleSocFeeChange(e, "thirdYear")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editableData.socFees.fourthYear}
                      onChange={(e) => handleSocFeeChange(e, "fourthYear")}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollStudent;
