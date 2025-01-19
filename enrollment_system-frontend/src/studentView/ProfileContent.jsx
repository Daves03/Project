import React, { useEffect, useState } from "react";
import "../css/profile-student.css";
import axios from "axios";

const Profile = () => {
  const [studentDetails, setStudentDetails] = useState({});

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/student-details",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
        setStudentDetails(response.data);
      } catch (error) {
        console.error("Error fetching student details", error);
      }
    };

    fetchStudentDetails();
  }, []);

  return (
    <div className="profile-container">
      <form className="profile-form">
        <div className="row">
          <label htmlFor="student-status">Student Status</label>
          <input
            type="text"
            className="inputTypes"
            id="student-status"
            value={studentDetails.student_details?.student_status || ""}
            readOnly
          />
        </div>
        <div className="row">
          <label htmlFor="enrollment-status">Enrollment Status</label>
          <input
            type="text"
            className="inputTypes"
            id="enrollment-status"
            value={studentDetails.student_details?.enrollment_status || ""}
            readOnly
          />
        </div>
        <div className="row">
          <div className="column">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="inputTypes"
              id="name"
              value={studentDetails.name || ""}
              readOnly
            />
          </div>
          {/* <div className="column">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              className="inputTypes"
              id="age"
              value={studentDetails.student_details?.age || ""}
              readOnly
            />
          </div> */}
        </div>
        <div className="row">
          <div className="column">
            <label htmlFor="studentNumber">Student Number</label>
            <input
              type="text"
              className="inputTypes"
              id="studentNumber"
              value={studentDetails.student_details?.student_number || ""}
              readOnly
            />
          </div>
          <div className="column">
            <label htmlFor="studentPhoneNo">Phone Number</label>
            <input
              type="number"
              className="inputTypes"
              id="studentPhoneNo"
              value={studentDetails.student_details?.phone || ""}
              readOnly
            />
          </div>
        </div>
        <div className="row">
          <label htmlFor="studentAddress">Address</label>
          <input
            type="text"
            className="inputTypes"
            id="studentAddress"
            value={studentDetails.student_details?.address || ""}
            readOnly
          />
        </div>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="inputTypes"
            id="email"
            value={studentDetails.student_details?.email || ""}
            readOnly
          />
        </div>
        <div className="row">
          <div className="column">
            <label htmlFor="course">Course</label>
            <input
              type="text"
              className="inputTypes"
              id="course"
              value={studentDetails.student_details?.course || ""}
              readOnly
            />
          </div>
          <div className="column">
            <label htmlFor="year-level">Year Level</label>
            <input
              type="text"
              className="inputTypes"
              id="year-level"
              value={studentDetails.student_details?.year_level || ""}
              readOnly
            />
          </div>
        </div>

        <div className="row">
          <div className="column">
            <label htmlFor="guardian-name">Guardian's Name</label>
            <input
              type="text"
              className="inputTypes"
              id="guardian-name"
              value={studentDetails.student_details?.guardian_name || ""}
              readOnly
            />
          </div>
          <div className="column">
            <label htmlFor="phone-number">Phone Number (Guardian)</label>
            <input
              type="text"
              className="inputTypes"
              id="phone-number"
              value={studentDetails.student_details?.guardian_phone || ""}
              readOnly
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
