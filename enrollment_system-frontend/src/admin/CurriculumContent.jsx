import React, { useState } from 'react';
import '../admin-css/curriculum-admin.css';

const initialCourses = [
  { code: 'DCIT 69', title: 'Advance', CreditUnitsLec: 1, CreditUnitsLab: 2, ContactHoursLec: 3, ContactHoursLab: 4, Prerequisite: 'DCIT 59' },
];

const Curriculum = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [showModal, setShowModal] = useState(false);
  const [editedCourses, setEditedCourses] = useState([...initialCourses]);

  // Open the edit modal and set the editable courses data
  const openEditModal = () => {
    setEditedCourses([...courses]);
    setShowModal(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setShowModal(false);
  };

  // Handle cell change in the editable modal
  const handleCellChange = (e, index, key) => {
    const value = e.target.value;
    const updatedCourses = [...editedCourses];
    updatedCourses[index][key] = value;
    setEditedCourses(updatedCourses);
  };

  // Save changes from the editable modal to the main table
  const saveChanges = () => {
    setCourses(editedCourses);
    closeEditModal();
  };

  return (
    <div className="container">
      <h2 className="header-curriculum">Manage Curriculum</h2>

      {/* Filters Section */}
      <div className="filters">
        <select>
          <option>BS Information Technology</option>
          <option>BS Computer Science</option>
        </select>

        <select>
          <option>First Semester</option>
          <option>Second Semester</option>
          <option>Third Semester</option>
          <option>Fourth Semester</option>
        </select>

        <select>
          <option>First Year</option>
          <option>Second Year</option>
          <option>Third Year</option>
          <option>Fourth Year</option>
        </select>

        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button className="search-btn">Search..</button>
        </div>
      </div>

      {/* Main Curriculum Table */}
      <table className="curriculum-table">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Title</th>
            <th>Credit Unit(Lec)</th>
            <th>Credit Unit(Lab)</th>
            <th>Contact Hours(Lec)</th>
            <th>Contact Hours(Lab)</th>
            <th>Pre-requisite</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.code}</td>
              <td>{course.title}</td>
              <td>{course.CreditUnitsLec}</td>
              <td>{course.CreditUnitsLab}</td>
              <td>{course.ContactHoursLec}</td>
              <td>{course.ContactHoursLab}</td>
              <td>{course.Prerequisite}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Curriculum Button */}
      <button className="edit-curri-btn" onClick={openEditModal}>Edit Curriculum</button>

      {/* Editable Curriculum Modal */}
      {showModal && (
        <div className="modal-curriculum">
          <div className="modal-content-curriculum">
            <button className="close-btn" onClick={closeEditModal}>✖</button>
            <h2>Edit Curriculum</h2>
            <table className="curriculum-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th>Credit Unit(Lec)</th>
                  <th>Credit Unit(Lab)</th>
                  <th>Contact Hours(Lec)</th>
                  <th>Contact Hours(Lab)</th>
                  <th>Pre-requisite</th>
                </tr>
              </thead>
              <tbody>
                {editedCourses.map((course, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={course.code}
                        onChange={(e) => handleCellChange(e, index, 'code')}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={course.title}
                        onChange={(e) => handleCellChange(e, index, 'title')}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={course.CreditUnitsLec}
                        onChange={(e) => handleCellChange(e, index, 'CreditUnitsLec')}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={course.CreditUnitsLab}
                        onChange={(e) => handleCellChange(e, index, 'CreditUnitsLab')}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={course.ContactHoursLec}
                        onChange={(e) => handleCellChange(e, index, 'ContactHoursLec')}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={course.ContactHoursLab}
                        onChange={(e) => handleCellChange(e, index, 'ContactHoursLab')}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={course.Prerequisite}
                        onChange={(e) => handleCellChange(e, index, 'Prerequisite')}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="save-btn" onClick={saveChanges}>Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Curriculum;
