import React from "react";
import Dashboard from "./DashboardContent";
import Profile from "./ProfileContent";
import Enroll from "./EnrollContent";
import Courses from "./CoursesContent";

const MainContent = ({ activeLink }) => {
  return (
    <div>
      {activeLink === "dashboard" && <Dashboard />}
      {activeLink === "profile" && <Profile />}
      {activeLink === "enroll" && <Enroll />}
      {activeLink === "courses" && <Courses />}
    </div>
  );
};

export default MainContent;
