import React, { useState, useEffect } from "react";
import axios from "axios";
import "./officers-css/student-socfee.css";
const EnrollStudent = () => {
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedYearLevel, setSelectedYearLevel] = useState("");
  const [editableData, setEditableData] = useState({
    id: null,
    studentName: "",
    studentNumber: "",
    yearLevel: "",
    section: "",
    course: "",
    socFees: {
      firstYear: "not paid",
      secondYear: "not paid",
      thirdYear: "not paid",
      fourthYear: "not paid",
    },
  });
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "https://backend.cvsu.online/api/student-soc-fees"
        );

        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };
  const handleSocFeeChange = (e, year) => {
    setEditableData({
      ...editableData,
      socFees: { ...editableData.socFees, [year]: e.target.value },
    });
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    // console.log("Selected Section:", e.target.value);
  };
  const handleYearLevelChange = (e) => {
    setSelectedYearLevel(e.target.value);
    // console.log("Selected Year Level:", e.target.value);
  };

  const handleSave = async () => {
    try {
      const studentData = {
        student_name: editableData.studentName,
        student_number: editableData.studentNumber,
        year_level: editableData.yearLevel,
        section: editableData.section,
        course: editableData.course,
        soc_fee_first_year: editableData.socFees.firstYear,
        soc_fee_second_year: editableData.socFees.secondYear,
        soc_fee_third_year: editableData.socFees.thirdYear,
        soc_fee_fourth_year: editableData.socFees.fourthYear,
      };
      console.log("Saving data:", studentData);
      if (editableData.id) {
        await axios.put(
          `https://backend.cvsu.online/api/student-soc-fees/${editableData.id}`,
          studentData
        );
      } else {
        await axios.post(
          "https://backend.cvsu.online/api/student-soc-fees",
          studentData
        );
      }
      console.log("Data saved successfully");
      setShowModal(false);
      setEditableData({
        id: null,
        studentName: "",
        studentNumber: "",
        yearLevel: "",
        section: "",
        course: "",
        socFees: {
          firstYear: "",
          secondYear: "",
          thirdYear: "",
          fourthYear: "",
        },
      });
      const response = await axios.get(
        "https://backend.cvsu.online/student-soc-fees"
      );
      setStudents(response.data);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error("Validation errors:", error.response.data.errors);
        alert(
          "Validation errors: " + JSON.stringify(error.response.data.errors)
        );
      } else {
        console.error("Error saving student data:", error);
      }
    }
  };
  const searchedStudents = students.filter(
    (student) =>
      student.student_number.includes(searchTerm) ||
      student.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudents = students.filter((student) => {
    const matchesSection = selectedSection
      ? student.section === selectedSection
      : true;
    const matchesYearLevel = selectedYearLevel
      ? student.year_level === selectedYearLevel
      : true;
    console.log(
      `Student: ${student.student_name}, Section: ${student.section}, Year Level: ${student.year_level}`
    );
    console.log(
      `Matches Section: ${matchesSection}, Matches Year Level: ${matchesYearLevel}`
    );
    return matchesSection && matchesYearLevel;
  });

  return (
    <div className="socite-fee-container">
      <h1 className="title-officers">Students Society Fee</h1>

      <div className="top-controls-officers">
        <input
          type="text"
          placeholder="Search by name or student number"
          className="search-bar-officers"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <select
          className="filter-officers"
          value={selectedSection}
          onChange={handleSectionChange}
        >
          <option value="">Filter by Section</option>
          <option value="3-1">3-1</option>
          {/* Add other sections here */}
        </select>

        <select
          className="filter-officers"
          value={selectedYearLevel}
          onChange={handleYearLevelChange}
        >
          <option value="">Filter by Year Level</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>

        <button className="add-btn-officers" onClick={() => setShowModal(true)}>
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
              <th>Program</th>
              <th>1st year (SocFee)</th>
              <th>2nd year (SocFee)</th>
              <th>3rd year (SocFee)</th>
              <th>4th year (SocFee)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Display students based on search term */}
            {searchTerm
              ? searchedStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.student_name}</td>
                    <td>{student.student_number}</td>
                    <td>Regular</td>
                    <td>{student.year_level}</td>
                    <td>{student.section}</td>
                    <td>{student.course}</td>
                    <td>{student.soc_fee_first_year}</td>
                    <td>{student.soc_fee_second_year}</td>
                    <td>{student.soc_fee_third_year}</td>
                    <td>{student.soc_fee_fourth_year}</td>
                    <td>
                      <button
                        onClick={() => {
                          setEditableData({
                            id: student.id,
                            studentName: student.student_name,
                            studentNumber: student.student_number,
                            yearLevel: student.year_level,
                            section: student.section,
                            course: student.course,
                            socFees: {
                              firstYear: student.soc_fee_first_year,
                              secondYear: student.soc_fee_second_year,
                              thirdYear: student.soc_fee_third_year,
                              fourthYear: student.soc_fee_fourth_year,
                            },
                          });
                          setShowModal(true);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              : filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.student_name}</td>
                    <td>{student.student_number}</td>
                    <td>Regular</td>
                    <td>{student.year_level}</td>
                    <td>{student.section}</td>
                    <td>{student.course}</td>
                    <td>{student.soc_fee_first_year}</td>
                    <td>{student.soc_fee_second_year}</td>
                    <td>{student.soc_fee_third_year}</td>
                    <td>{student.soc_fee_fourth_year}</td>
                    <td>
                      <button
                        onClick={() => {
                          setEditableData({
                            id: student.id,
                            studentName: student.student_name,
                            studentNumber: student.student_number,
                            yearLevel: student.year_level,
                            section: student.section,
                            course: student.course,
                            socFees: {
                              firstYear: student.soc_fee_first_year,
                              secondYear: student.soc_fee_second_year,
                              thirdYear: student.soc_fee_third_year,
                              fourthYear: student.soc_fee_fourth_year,
                            },
                          });
                          setShowModal(true);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

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
                  <th>Program</th>
                  <th>1st Year</th>
                  <th>2nd Year</th>
                  <th>3rd Year</th>
                  <th>4th Year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="studentName"
                      value={editableData.studentName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="studentNumber"
                      value={editableData.studentNumber}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="yearLevel"
                      value={editableData.yearLevel}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="section"
                      value={editableData.section}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <select
                      name="course"
                      value={editableData.course}
                      onChange={handleInputChange}
                    >
                      <option value="Bachelor of Science in Computer Science">
                        Bachelor of Science in Computer Science
                      </option>
                      <option value="Bachelor of Science in Information Technology">
                        Bachelor of Science in Information Technology
                      </option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={editableData.socFees.firstYear}
                      onChange={(e) => handleSocFeeChange(e, "firstYear")}
                    >
                      <option value="paid">Paid</option>
                      <option value="not paid">Not Paid</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={editableData.socFees.secondYear}
                      onChange={(e) => handleSocFeeChange(e, "secondYear")}
                    >
                      <option value="paid">Paid</option>
                      <option value="not paid">Not Paid</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={editableData.socFees.thirdYear}
                      onChange={(e) => handleSocFeeChange(e, "thirdYear")}
                    >
                      <option value="paid">Paid</option>
                      <option value="not paid">Not Paid</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={editableData.socFees.fourthYear}
                      onChange={(e) => handleSocFeeChange(e, "fourthYear")}
                    >
                      <option value="paid">Paid</option>
                      <option value="not paid">Not Paid</option>
                    </select>
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
