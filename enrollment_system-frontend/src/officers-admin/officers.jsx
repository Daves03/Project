import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Enrollment from "./EnrollmentFormContent";
import SocFee from "./StudentSocFee";
import "./officers-css/officers.css";
import enrollmentIcon from "./assets-officers/enrollment-icon.png";
import billingIcon from "./assets-officers/billing-icon.png";
import logoutIcon from "../assets/logout.png";
import axios from "axios";

const OfficersPage = () => {
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
      case "student-socfee":
        return <SocFee />;
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
    <div className="sidebar-officers">
      <h2>Officers</h2>
      <ul className="nav-links-officers">
        <li
          onClick={() => setActivePage("enrollment-form")}
          className={activePage === "enrollment-form" ? "active" : ""}
        >
          <img
            src={enrollmentIcon}
            alt="Enrollment"
            className="nav-icon-officers"
          />
          Enrollment Form
        </li>
        <li
          onClick={() => setActivePage("student-socfee")}
          className={activePage === "enroll-student" ? "active" : ""}
        >
          <img src={billingIcon} alt="Billing" className="nav-icon-officers" />
          Society Fee
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
    <div className="officers-container">
      <Sidebar />
      <div className="officers-content">{renderContent()}</div>
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

export default OfficersPage;
