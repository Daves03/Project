import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/home-student.css";
import { useState, useEffect } from "react";
import logoutIcon from "../assets/logout.png";
import dashboardIcon from "../assets/dashboard.png";
import profileIcon from "../assets/user.png";
import checklistIcon from "../assets/grade.png";
import enrollIcon from "../assets/exam.png";
import MainContent from "./MainContent";

const Home = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Hardcoding studentId for simplicity
  const studentId = 25; // Replace with how you retrieve your studentId

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

  useEffect(() => {
    setActiveLink("dashboard");
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="home-container">
      {/* Hamburger Navbar */}
      <div
        className={`hamburger ${isSidebarOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "✖" : "☰"}
      </div>

      {/* Sidebar */}
      <nav className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="logo-container">
          <img
            src="assets/cvsu_logo.png"
            alt="Logo"
            className="logo"
            draggable="false"
          />
        </div>
        <ul className={`nav-links ${isSidebarOpen ? "open" : ""}`}>
          <li>
            <a
              href="#dashboard"
              className={activeLink === "dashboard" ? "active" : ""}
              onClick={() => {
                setActiveLink("dashboard");
                setSidebarOpen(false);
              }}
            >
              <img
                src={dashboardIcon}
                alt="dashboard Icon"
                className="nav-icon"
                draggable="false"
              />
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#profile"
              className={activeLink === "profile" ? "active" : ""}
              onClick={() => {
                setActiveLink("profile");
                setSidebarOpen(false);
              }}
            >
              <img
                src={profileIcon}
                alt="Profile Icon"
                className="nav-icon"
                draggable="false"
              />
              Profile
            </a>
          </li>
          <li>
            <a
              href="#courses"
              className={activeLink === "courses" ? "active" : ""}
              onClick={() => {
                setActiveLink("courses");
                setSidebarOpen(false);
              }}
            >
              <img
                src={checklistIcon}
                alt="Checklist Icon"
                className="nav-icon"
                draggable="false"
              />
              Checklist
            </a>
          </li>
          <li>
            <a
              href="#enroll"
              className={activeLink === "enroll" ? "active" : ""}
              onClick={() => {
                setActiveLink("enroll");
                setSidebarOpen(false);
              }}
            >
              <img
                src={enrollIcon}
                alt="Enroll Icon"
                className="nav-icon"
                draggable="false"
              />
              Online Enrollment
            </a>
          </li>
        </ul>
        {/* Logout Button */}
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
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <MainContent activeLink={activeLink} studentId={studentId} />
      </main>
    </div>
  );
};

export default Home;
