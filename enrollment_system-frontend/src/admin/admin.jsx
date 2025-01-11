import React, { useState } from "react";
import Enrollment from "./EnrollmentFormContent";
import EnrollStudent from "./EnrollStudentContent";
import "./admin-css/admin.css";
import enrollmentIcon from "./assets-admin/enrollment-icon.png";
import billingIcon from "./assets-admin/billing-icon.png";
import logoutIcon from "../assets/logout.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [activePage, setActivePage] = useState("enrollment");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activePage) {
      case "enrollment-form":
        return <Enrollment />;
      case "enroll-student":
        return <EnrollStudent />;
      default:
        return <Enrollment />;
    }
  };

  const handleLogout = async () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (!isConfirmed) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      // alert("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Error logging out. Please try again.");
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
    </div>
  );
};

export default AdminPage;
