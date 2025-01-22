import React, { useState } from "react";
import Enrollment from "./EnrollmentFormContent";
import EnrollStudent from "./EnrollStudentContent";
import CreateStudentForm from "./CreateStudentForm";
import "./admin-css/admin.css";
import enrollmentIcon from "./assets-admin/enrollment-icon.png";
import billingIcon from "./assets-admin/billing-icon.png";
import createStudentIcon from "./assets-admin/create-student-icon.png";
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
      case "enroll-student":
        return <EnrollStudent />;
      case "create-student":
        return <CreateStudentForm />;
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
    <div className="sidebar">
      <h2>Admin</h2>
      <ul className="nav-links">
        <li
          onClick={() => setActivePage("enrollment-form")}
          className={activePage === "enrollment-form" ? "active" : ""}
        >
          <img src={enrollmentIcon} alt="Enrollment" className="nav-icon" />
          Enrollment Form
        </li>
        <li
          onClick={() => setActivePage("enroll-student")}
          className={activePage === "enroll-student" ? "active" : ""}
        >
          <img src={billingIcon} alt="Billing" className="nav-icon" />
          Enroll Student
        </li>
        <li
          onClick={() => setActivePage("create-student")}
          className={activePage === "create-student" ? "active" : ""}
        >
          <img
            src={createStudentIcon}
            alt="Create Student"
            className="nav-icon"
          />
          Create Student
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
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">{renderContent()}</div>
      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPage;
