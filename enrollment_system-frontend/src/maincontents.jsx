// src/MainContent.jsx
import React, { useState } from 'react';
import './css/profile.css';
import './css/checklist.css';
import './css/enroll.css';

const MainContent = ({ activeLink }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    studentNumber: '',
    lastName: '',
    firstName: '',
    middleName: '',
    sex: '',
    contactNumber: '',
    facebookLink: '',
    birthdate: '',
    address: '',
    guardianName: '',
    guardianPhone: '',
    course: '',
    yearLevel: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      const requiredFieldsStep1 = [
        'email', 'studentNumber', 'lastName', 'firstName', 'middleName', 'sex', 'contactNumber', 'birthdate'
      ];
      const isStep1Valid = requiredFieldsStep1.every((field) => formData[field].trim() !== '');
      if (isStep1Valid) {
        setCurrentStep(2);
      } else {
        alert('Please complete all required fields in Step 1.');
      }
    } else if (currentStep === 2) {
      const requiredFieldsStep2 = [ 'guardianName', 'guardianPhone' , 'religion' , 'previousSection'];
      const isStep2Valid = requiredFieldsStep2.every((field) => formData[field].trim() !== '');
      if (isStep2Valid) {
        setCurrentStep(3);
      } else {
        alert('Please complete all required fields in Step 2.');
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    const requiredFieldsStep3 = ['course', 'yearLevel'];
    const isStep3Valid = requiredFieldsStep3.every((field) => formData[field].trim() !== '');
    if (isStep3Valid) {
      alert('Form Submitted Successfully!');
      console.log(formData);
      // Here you can handle the final submission logic like sending data to the backend
    } else {
      alert('Please complete all required fields in Step 3.');
    }
  };

  return (
    <div>
      {activeLink === 'profile' && (
        <div>
          <form className="profile-form">
            <div className="row">
              <div className="column">
                <label htmlFor="name">Name</label>
                <input type="text" className='inputTypes' id="name" value="Raven Ampere" readOnly />
              </div>
              <div className="column">
                <label htmlFor="age">Age</label>
                <input type="number" className='inputTypes' id="age" readOnly />
              </div>
            </div>
            
            <div className="row">
              <div className="column">
                <label htmlFor="studentNumber">Student Number</label>
                <input type="text" className='inputTypes' id="studentNumber" readOnly />
              </div>
              <div className="column">
                <label htmlFor="studentPhoneNo">Phone Number</label>
                <input type="number" className='inputTypes' id="studentPhoneNo" readOnly />
              </div>
            </div>

            <div className="row">
              <label htmlFor="studentAddress">Address</label>
              <input type="text" className='inputTypes' id="studentAddress" readOnly/>
            </div>

            <div className="row">
              <label htmlFor="email">Email</label>
              <input type="email" className='inputTypes' id="email" readOnly/>
            </div>

            <div className="row">
              <div className="column">
                <label htmlFor="course">Course</label>
                <input type="text" className='inputTypes' id="course" readOnly/>
              </div>
              <div className="column">
                <label htmlFor="year-level">Year Level</label>
                <input type="text" className='inputTypes' id="year-level"  readOnly/>
              </div>
            </div>

            <div className="row">
              <div className="column">
                <label htmlFor="guardian-name">Guardian's Name</label>
                <input type="text" className='inputTypes' id="guardian-name"  readOnly/>
              </div>
              <div className="column">
                <label htmlFor="phone-number">Phone Number(Guardian)</label>
                <input type="text" className='inputTypes' id="phone-number" readOnly/>
              </div>
            </div>
          </form>
        </div>
      )}

        {activeLink === 'courses' && (
        <div className="checklist-container">
            <div className="scrollable-table-container">
            <div className="filter-section">
                <input
                type="text"
                className="search-bar"
                placeholder="Search..."
                />
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
        )}

      {activeLink === 'enroll' && (
        <div>
          {/* Step Indicator */}
          <div className="step-indicator">
            <span className={currentStep === 1 ? 'active-step' : ''}>Step 1</span>
            <span className={currentStep === 2 ? 'active-step' : ''}>Step 2</span>
            <span className={currentStep === 3 ? 'active-step' : ''}>Step 3</span>
          </div>

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="enroll-step">
              <form className="enroll-form">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="inputEnroll"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="studentNumber">Student Number</label>
                <input
                  type="text"
                  id="studentNumber"
                  name="studentNumber"
                  className="inputEnroll"
                  value={formData.studentNumber}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="inputEnroll"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="inputEnroll"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="middleName">Middle Name</label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  className="inputEnroll"
                  value={formData.middleName}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="sex">Sex</label>
                <select
                  id="sex"
                  name="sex"
                  className="inputEnroll"
                  value={formData.sex}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  className="inputEnroll"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="facebookLink">Facebook Link</label>
                <input
                  type="text"
                  id="facebookLink"
                  name="facebookLink"
                  className="inputEnroll"
                  value={formData.facebookLink}
                  onChange={handleChange}
                />

                <label htmlFor="birthdate">Birthdate</label>
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  className="inputEnroll"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                />

                <button type="button" onClick={handleNextStep}>
                  Next Step
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Guardian Information */}
          {currentStep === 2 && (
            <div className="enroll-step">
              <form className="enroll-form">
                <label htmlFor="guardianName">Guardian's Name</label>
                <input
                  type="text"
                  id="guardianName"
                  name="guardianName"
                  className="inputEnroll"
                  value={formData.guardianName}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="guardianPhone">Guardian's Phone Number</label>
                <input
                  type="text"
                  id="guardianPhone"
                  name="guardianPhone"
                  className="inputEnroll"
                  value={formData.guardianPhone}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="religion">Religion</label>
                <input
                  type="text"
                  id="religion"
                  name="religion"
                  className="inputEnroll"
                  value={formData.religion}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="previousSection">Previous Section</label>
                <select
                  id="previousSection"
                  name="previousSection"
                  className="inputEnroll"
                  value={formData.previousSection}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="1-1">1-1</option>
                  <option value="1-2">1-2</option>
                  <option value="1-3">1-3</option>
                  <option value="1-4">1-4</option>
                  <option value="1-2">1-5</option>
                  <option value="1-6">1-6</option>
                  <option value="1-1">1-7</option>
                  <option value="2-1">2-1</option>
                  <option value="2-2">2-2</option>
                  <option value="2-3">2-3</option>
                  <option value="2-4">2-4</option>
                  <option value="2-5">2-5</option>
                  <option value="2-6">2-6</option>
                  <option value="2-7">2-7</option>
                  <option value="3-1">3-1</option>
                  <option value="3-2">3-2</option>
                  <option value="3-3">3-3</option>
                  <option value="3-4">3-4</option>
                  <option value="3-5">3-5</option>
                  <option value="3-6">3-6</option>
                  <option value="3-7">3-7</option>
                  <option value="4-1">4-1</option>
                  <option value="4-2">4-2</option>
                  <option value="4-4">4-4</option>
                  <option value="4-5">4-5</option>
                  <option value="4-6">4-6</option>
                  <option value="irregular">Irregular</option>
                  <option value="newStudent">New Students from Admission</option>
                  <option value="shiftCourse">Shiftee THIS YEAR</option>
                  <option value="transferee">Transferee THIS YEAR</option>

                </select>

                <button type="button" onClick={handlePreviousStep}>
                  Previous Step
                </button>
                <button type="button" onClick={handleNextStep}>
                  Next Step
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Course Details */}
          {currentStep === 3 && (
            <div className="enroll-step">
              <form className="enroll-form">
                <label htmlFor="housenumber">House No./Lot/Blk.</label>
                  <input
                    type="text"
                    id="housenumber"
                    name="housenumber"
                    className="inputEnroll"
                    value={formData.housenumber}
                    onChange={handleChange}
                    required
                  />

                <label htmlFor="street">Street</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    className="inputEnroll"
                    value={formData.street}
                    onChange={handleChange}
                    required
                  />

                <label htmlFor="subdivision">Subdivision</label>
                  <input
                    type="text"
                    id="subdivision"
                    name="subdivision"
                    className="inputEnroll"
                    value={formData.subdivision}
                    onChange={handleChange}
                    required
                  />

                <label htmlFor="barangay">Barangay</label>
                  <input
                    type="text"
                    id="barangay"
                    name="barangay"
                    className="inputEnroll"
                    value={formData.barangay}
                    onChange={handleChange}
                    required
                  />

                <label htmlFor="city">Municipality / City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="inputEnroll"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />

                <label htmlFor="zipCode">Zip code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    className="inputEnroll"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />


                <button type="button" onClick={handlePreviousStep}>
                  Previous Step
                </button>
                <button type="button" onClick={handleSubmit}>
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainContent;
