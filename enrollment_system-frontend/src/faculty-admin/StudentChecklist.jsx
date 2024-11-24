import React from 'react';
import './faculty-css/student-checklist.css';

const EnrollStudent = () => {
    return (
        <div className="student-checklist-container">
            <h1 className="title-faculty">Enroll Student</h1>

            <div className="top-controls-faculty">
                <input type="text" placeholder="Search by name or student number" className="search-bar-faculty" />
                
                
                <select className="filter-faculty">
                    <option value="">Filter by Section</option>
                    <option value="A">BSCS 3-1</option>
                </select>

                <select className="filter-faculty">
                    <option value="">Filter by Year Level</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                </select>

                <button className="add-btn-faculty">Consult Student</button>
            </div>

            <div className="table-container-faculty">
                <table className="student-table-faculty">
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
                        <tr>
                            <td>Raven Ampere</td>
                            <td>0000000000</td>
                            <td>Regular</td>
                            <td>3rd Year</td>
                            <td>3-1</td>
                            <td>BSCS</td>
                            <td>123 moon st</td>
                            <td>123123@example.com</td>
                            <td>mama</td>
                            <td>123-456-7890</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnrollStudent;
