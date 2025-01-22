import React, { useState } from "react";
import Enrollment from "./EnrollmentFormFaculty";
import StudentChecklist from "./StudentChecklist";
import "./faculty-css/faculty.css";
import enrollmentIcon from "./assets-faculty/enrollment-icon.png";
import billingIcon from "./assets-faculty/billing-icon.png";
import logoutIcon from "../assets/logout.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminPage = () => {
  const [activePage, setActivePage] = useState("enrollment");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleClose = () => setShowModal(false);
  const handleShow = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const renderContent = () => {
    switch (activePage) {
      case "enrollment-form":
        return <Enrollment />;
      case "student-checklist":
        return <StudentChecklist />;
      default:
        return <Enrollment />;
    }
  };

  const handleLogout = () => {
    handleShow("Are you sure you want to log out?");
  };
  const confirmLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      await axios.post(
        "https://backend.cvsu.online/api/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      handleShow("Error logging out. Please try again.");
    }
  };

  // Sidebar Component
  const Sidebar = () => (
    <div className="sidebar-faculty">
      <h2>Faculty Admin</h2>
      <ul className="nav-links-faculty">
        <li
          onClick={() => setActivePage("enrollment-form")}
          className={activePage === "enrollment-form" ? "active" : ""}
        >
          <img
            src={enrollmentIcon}
            alt="Enrollment"
            className="nav-icon-faculty"
          />
          Enrollment Form
        </li>
        <li
          onClick={() => setActivePage("student-checklist")}
          className={activePage === "student-checklist" ? "active" : ""}
        >
          <img src={billingIcon} alt="Billing" className="nav-icon-faculty" />
          Student Checklist
        </li>
      </ul>

      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          <img
            src={logoutIcon}
            alt="Logout"
            style={{ width: "40px", height: "40px" }}
            draggable="false"
          />
        </button>
      </div>
    </div>
  );

  return (
    <div className="faculty-container">
      <Sidebar />
      <div className="faculty-content">{renderContent()}</div>
      {/* Modal */}{" "}
      <Modal show={showModal} onHide={handleClose} centered>
        {" "}
        <Modal.Header closeButton>
          {" "}
          <Modal.Title>Logout Confirmation</Modal.Title>{" "}
        </Modal.Header>{" "}
        <Modal.Body>{modalMessage}</Modal.Body>{" "}
        <Modal.Footer>
          {" "}
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            Cancel{" "}
          </Button>{" "}
          <Button variant="primary" onClick={confirmLogout}>
            {" "}
            Logout{" "}
          </Button>{" "}
        </Modal.Footer>{" "}
      </Modal>
    </div>
  );
};

export default AdminPage;
