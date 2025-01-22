import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin-css/CreateStudentForm.css"; // Import the new CSS file

const CreateStudentForm = () => {
  const [formData, setFormData] = useState({
    studentNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    password: "",
    password_confirmation: "", // Use password_confirmation here
    address: "",
    gender: "",
    birthdate: "",
    contactNumber: "",
    email: "",
    course: "",
    yearLevel: "",
    semester: "",
    guardianName: "",
    guardianPhone: "",
    studentStatus: "",
    enrollmentStatus: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      setErrors({ password_confirmation: "Passwords do not match!" });
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const response = await axios.post(
        "https://backend.cvsu.online/api/create-student",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      handleShow("Student account created successfully!");
      setFormData({
        studentNumber: "",
        firstName: "",
        middleName: "",
        lastName: "",
        password: "",
        password_confirmation: "",
        address: "",
        gender: "",
        birthdate: "",
        contactNumber: "",
        email: "",
        course: "",
        yearLevel: "",
        semester: "",
        guardianName: "",
        guardianPhone: "",
        studentStatus: "",
        enrollmentStatus: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error creating student account:", error.response.data);
      setErrors(error.response.data.errors || {});
      handleShow(
        "Error creating student account. Please check the input fields and try again."
      );
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  return (
    <div className="create-student-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="studentNumber">
          Student Number<span className="required">*</span>
        </label>
        <input
          type="text"
          id="studentNumber"
          name="studentNumber"
          value={formData.studentNumber}
          onChange={handleChange}
          required
        />

        <label htmlFor="firstName">
          First Name<span className="required">*</span>
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="middleName">Middle Name (Optional)</label>
        <input
          type="text"
          id="middleName"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
        />

        <label htmlFor="lastName">
          Last Name<span className="required">*</span>
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">
          Password<span className="required">*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="password_confirmation">
          Confirm Password<span className="required">*</span>
        </label>
        <input
          type="password"
          id="password_confirmation"
          name="password_confirmation" // Use password_confirmation here
          value={formData.password_confirmation}
          onChange={handleChange}
          required
        />
        {errors.password_confirmation && (
          <span className="error">{errors.password_confirmation}</span>
        )}

        <label htmlFor="address" className="full-width">
          Address<span className="required">*</span>
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="full-width"
        />

        <label htmlFor="gender">
          Gender<span className="required">*</span>
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="birthdate">
          Date of Birth<span className="required">*</span>
        </label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          required
        />

        <label htmlFor="contactNumber">
          Contact Number<span className="required">*</span>
        </label>
        <input
          type="text"
          id="contactNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />

        <label htmlFor="email" className="full-width">
          Email<span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="full-width"
        />

        <label htmlFor="course">
          Program<span className="required">*</span>
        </label>
        <select
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        >
          <option value="">Select Program</option>
          <option value="Bachelor of Science in Computer Science">
            Bachelor of Science in Computer Science
          </option>
          <option value="Bachelor of Science in Information Technology">
            Bachelor of Science in Information Technology
          </option>
        </select>

        <label htmlFor="yearLevel">
          Year Level<span className="required">*</span>
        </label>
        <select
          id="yearLevel"
          name="yearLevel"
          value={formData.yearLevel}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="First Year">First Year</option>
          <option value="Second Year">Second Year</option>
          <option value="Third Year">Third Year</option>
          <option value="Fourth Year">Fourth Year</option>
        </select>

        <label htmlFor="semester">
          Semester<span className="required">*</span>
        </label>
        <select
          id="semester"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="First Semester">First Semester</option>
          <option value="Second Semester">Second Semester</option>
          <option value="Summer">Summer</option>
        </select>

        <label htmlFor="guardianName" className="full-width">
          Guardian's Name<span className="required">*</span>
        </label>
        <input
          type="text"
          id="guardianName"
          name="guardianName"
          value={formData.guardianName}
          onChange={handleChange}
          required
          className="full-width"
        />

        <label htmlFor="guardianPhone" className="full-width">
          Guardian's Phone<span className="required">*</span>
        </label>
        <input
          type="text"
          id="guardianPhone"
          name="guardianPhone"
          value={formData.guardianPhone}
          onChange={handleChange}
          required
          className="full-width"
        />

        <label htmlFor="studentStatus">
          Student Status<span className="required">*</span>
        </label>
        <select
          id="studentStatus"
          name="studentStatus"
          value={formData.studentStatus}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Regular">Regular</option>
          <option value="Irregular">Irregular</option>
          <option value="transferee">Transferee</option>
          <option value="freshmen">Freshmen</option>
        </select>

        <label htmlFor="enrollmentStatus">
          Enrollment Status<span className="required">*</span>
        </label>
        <select
          id="enrollmentStatus"
          name="enrollmentStatus"
          value={formData.enrollmentStatus}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Declined">Declined</option>
        </select>

        <div className="actions full-width">
          <button type="submit">Create</button>
          <button type="button">Create & Create Another</button>
          <button type="button" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </form>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateStudentForm;
