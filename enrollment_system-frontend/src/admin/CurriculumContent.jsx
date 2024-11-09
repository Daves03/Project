import React, { useState, useEffect } from 'react';
import '../admin-css/curriculum-admin.css';


const initialCourses = [
  { code: 'DCIT 69', title: 'Advance', CreditUnitsLec: 1, CreditUnitsLab: 2, ContactHoursLec: 3, ContactHoursLab: 4, Prerequisite: 'DCIT 59' },
];

const Curriculum = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [showModal, setShowModal] = useState(false);
  const [editedCourses, setEditedCourses] = useState([...initialCourses]);

  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const fetchCourses = async () => {
    let query = `http://127.0.0.1:8000/api/curriculum?`;
    if (selectedProgram) query += `program=${selectedProgram}&`;
    if (selectedSemester) query += `semester=${selectedSemester}&`;
    if (selectedYear) query += `year=${selectedYear}&`;
  
    console.log("Fetching courses with query:", query); // Log the query
    try {
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log("Fetched data:", data); // Log the fetched data
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error); // Log any errors
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [selectedProgram, selectedSemester, selectedYear]);

  useEffect(() => {
    const initialFetch = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/curriculum');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching initial courses:", error);
      }
    };

    initialFetch();
  }, []);

  //   fetchCourses();
  // }, []);

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

  const addNewRow = () => {
    setEditedCourses([
      ...editedCourses,
      { code: '', title: '', CreditUnitsLec: 0, CreditUnitsLab: 0, ContactHoursLec: 0, ContactHoursLab: 0, Prerequisite: '',program: selectedProgram,semester: selectedSemester,year: selectedYear }
    ]);
  };

  // Save changes from the editable modal to the main table
  const saveChanges = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/curriculum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courses: editedCourses }), // Ensure this includes `id`
      });

      if (!response.ok) throw new Error('Error saving data');

      const updatedResponse = await fetch('http://127.0.0.1:8000/api/curriculum');
      const freshCourses = await updatedResponse.json();
      setCourses(freshCourses); // Update the state with the latest data

      closeEditModal();
    } catch (error) {
      console.error("Error saving changes:", error); // Log error
    }
  };



  

  return (
    <div className="curriculum-container">
      <h2 className="header-curriculum">Manage Curriculum</h2>

      {/* Filters Section */}
      <div className="filters">
        <select onChange={(e) => { setSelectedProgram(e.target.value); }}>
          <option value="">Select Program</option>
          <option value="BS Information Technology">BS Information Technology</option>
          <option value="BS Computer Science">BS Computer Science</option>
        </select>

        <select onChange={(e) => { setSelectedSemester(e.target.value); }}>
          <option value="">Select Semester</option>
          <option value="First Semester">First Semester</option>
          <option value="Second Semester">Second Semester</option>
          <option value="Third Semester">Third Semester</option>
          <option value="Fourth Semester">Fourth Semester</option>
        </select>

        <select onChange={(e) => { setSelectedYear(e.target.value); }}>
          <option value="">Select Year</option>
          <option value="1">First Year</option>
          <option value="2">Second Year</option>
          <option value="3">Third Year</option>
          <option value="4">Fourth Year</option>
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
                  <th>Program</th> 
                  <th>Semester</th> 
                  <th>Year</th> 
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
                    <td>
                    <select
                  value={course.program}
                  onChange={(e) => handleCellChange(e, index, 'program')}
                >
                  <option value="">Select Program</option>
                  <option value="BS Information Technology">BS Information Technology</option>
                  <option value="BS Computer Science">BS Computer Science</option>
                </select>
              </td>
              <td>
                <select
                  value={course.semester}
                  onChange={(e) => handleCellChange(e, index, 'semester')}
                >
                  <option value="">Select Semester</option>
                  <option value="First Semester">First Semester</option>
                  <option value="Second Semester">Second Semester</option>
                  <option value="Third Semester">Third Semester</option>
                  <option value="Fourth Semester">Fourth Semester</option>
                </select>
              </td>
              <td>
                <select
                  value={course.year}
                  onChange={(e) => handleCellChange(e, index, 'year')}
                >
                  <option value="">Select Year</option>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                </select>
              </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="add-row-btn" onClick={addNewRow}>Add Row</button>
            <button className="save-btn" onClick={saveChanges}>Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Curriculum;
