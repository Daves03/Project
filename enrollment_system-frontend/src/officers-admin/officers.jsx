import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    </div>
  );
};

export default OfficersPage;
