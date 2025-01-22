import React, { useState, useEffect } from "react";
import "../css/enroll-student.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import qrCodeImage from "../assets/qrcodesample.jpg";

const Enroll = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleClose = () => setShowModal(false);
  const handleShow = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const [formData, setFormData] = useState({
    studentstatus: "",
    section: "",
    email: "",
    studentNumber: "",
    lastName: "",
    firstName: "",
    middleName: "",
    program: "",
    yearLevel: "",
    semester: "",
    sex: "",
    contactNumber: "",
    facebookLink: "",
    birthdate: "",
    guardianName: "",
    guardianPhone: "",
    religion: "",
    previousSection: "",
    houseNumber: "",
    street: "",
    subdivision: "",
    barangay: "",
    municipality: "",
    zipCode: "",
    mobileNumber: "",
    senderName: "",
    referenceNumber: "",
    amount: "",
  });
  const [errors, setErrors] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showOnlyFirstStep, setShowOnlyFirstStep] = useState(false);

  useEffect(() => {
    const fetchEnrollmentStudentDetails = async () => {
      try {
        const response = await axios.get(
          "https://backend.cvsu.online/api/enrollment-student-details",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const studentDetails = response.data;
        // console.log(studentDetails); // Log the response data

        // Populate form data with student details
        setFormData((prevFormData) => ({
          ...prevFormData,
          studentstatus: studentDetails.student_status || "",
          email: studentDetails.email || "",
          studentNumber: studentDetails?.student_number || "",
          firstName: studentDetails?.first_name || "",
          lastName: studentDetails?.last_name || "",
          middleName: studentDetails?.middle_name || "",
          section: studentDetails?.section || "",
          program: studentDetails?.course || "",
          yearLevel: studentDetails?.year_level || "",
          semester: studentDetails?.semester || "",
          sex: studentDetails?.sex || "",
          contactNumber: studentDetails?.phone || "",
          birthdate: studentDetails?.birthdate || "",
          guardianName: studentDetails?.guardian_name || "",
          guardianPhone: studentDetails?.guardian_phone || "",
        }));
      } catch (error) {
        console.error("Error fetching student details for enrollment:", error);
      }
    };

    fetchEnrollmentStudentDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Handle visibility for Transferee and Freshmen
    if (
      name === "studentstatus" &&
      (value === "transferee" || value === "freshmen")
    ) {
      setShowOnlyFirstStep(true);
    } else if (name === "studentstatus") {
      setShowOnlyFirstStep(false);
    }
  };

  const handleNextStep = () => {
    if (showOnlyFirstStep) {
      alert("Please complete the requirements at the bottom of the form.");
      return;
    }

    let isValid = true;
    const newErrors = {};

    // Validate fields based on the current step
    if (currentStep === 1) {
      const requiredFields = [
        "studentstatus",
        "email",
        "studentNumber",
        "lastName",
        "firstName",
        "middleName",
        "program",
        "yearLevel",
        "semester",
        "sex",
        "contactNumber",
        "birthdate",
      ];
      requiredFields.forEach((field) => {
        if (!formData[field]) {
          isValid = false;
          newErrors[field] = "This field is required.";
        }
      });

      // Validate email and student number
      // if (loggedInUser) {
      //   if (
      //     loggedInUser.email.trim().toLowerCase() !==
      //       formData.email.trim().toLowerCase() ||
      //     loggedInUser.student_details?.student_number.trim() !==
      //       formData.studentNumber.trim()
      //   ) {
      //     isValid = false;
      //     newErrors["email"] =
      //       "Email or student number does not match your account.";
      //     newErrors["studentNumber"] =
      //       "Email or student number does not match your account.";
      //   }
      // }
    }

    setErrors(newErrors);

    if (isValid) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("Please fill out all required fields.");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    console.log("Form data being submitted:", formData);
    try {
      const response = await axios.post(
        "https://backend.cvsu.online/api/enroll",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Response:", response.data);
      handleShow("Enrollment successful!");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
        handleShow("Please correct the errors highlighted above.");
      } else if (error.response && error.response.status === 429) {
        handleShow(error.response.data.error); // Cooldown message
      } else {
        console.error("Error during enrollment:", error);
        handleShow("Enrollment failed. Please check your information.");
      }
    }
  };

  return (
    <div>
      <div className="step-indicator">
        <span className={currentStep === 1 ? "active-step" : ""}></span>
        {!showOnlyFirstStep && (
          <>
            <span className={currentStep === 2 ? "active-step" : ""}></span>
            <span className={currentStep === 3 ? "active-step" : ""}></span>
            <span className={currentStep === 4 ? "active-step" : ""}></span>
          </>
        )}
      </div>

      {currentStep === 1 && (
        <div className="enroll-step">
          <form className="enroll-form">
            <label htmlFor="studentstatus">
              Status<span className="required">*</span>
            </label>
            <select
              id="studentstatus"
              name="studentstatus"
              className="inputEnroll"
              value={formData.studentstatus}
              onChange={handleChange}
              data-readonly={isReadOnly ? "true" : "false"}
              required
            >
              <option value="">Select</option>
              <option value="Regular">Regular</option>
              <option value="Irregular">Irregular</option>
              <option value="transferee">Transferee</option>
              <option value="freshmen">Freshmen</option>
            </select>
            {errors.status && <span className="error">{errors.status}</span>}
            <label htmlFor="email">
              Email<span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="inputEnroll"
              value={formData.email}
              onChange={handleChange}
              readOnly
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
            {formData.studentstatus !== "transferee" &&
              formData.studentstatus !== "freshmen" && (
                <>
                  <label htmlFor="studentNumber">
                    Student Number<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="studentNumber"
                    name="studentNumber"
                    className="inputEnroll"
                    value={formData.studentNumber}
                    onChange={handleChange}
                    readOnly
                    required
                  />
                  {errors.studentNumber && (
                    <span className="error">{errors.studentNumber}</span>
                  )}
                </>
              )}
            <label htmlFor="lastName">
              Last Name<span className="required">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="inputEnroll"
              value={formData.lastName}
              onChange={handleChange}
              readOnly
              required
            />
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
            <label htmlFor="firstName">
              First Name<span className="required">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="inputEnroll"
              value={formData.firstName}
              onChange={handleChange}
              readOnly
              required
            />
            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
            <label htmlFor="middleName">
              Middle Name<span className="required">*</span>
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              className="inputEnroll"
              value={formData.middleName}
              onChange={handleChange}
              readOnly
              required
            />
            {errors.middleName && (
              <span className="error">{errors.middleName}</span>
            )}
            <label htmlFor="program">
              Program<span className="required">*</span>
            </label>
            <select
              id="program"
              name="program"
              className="inputEnroll"
              value={formData.program}
              onChange={handleChange}
              data-readonly={isReadOnly ? "true" : "false"}
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
            {errors.program && <span className="error">{errors.program}</span>}
            <label htmlFor="yearLevel">Year Level</label>
            <select
              id="yearLevel"
              name="yearLevel"
              className="inputEnroll"
              value={formData.yearLevel}
              onChange={handleChange}
              data-readonly={isReadOnly ? "true" : "false"}
              required
            >
              <option value="">Select Year Level</option>
              <option value="First Year">First Year</option>
              <option value="Second Year">Second Year</option>
              <option value="Third Year">Third Year</option>
              <option value="Fourth Year">Fourth Year</option>
            </select>
            {errors.yearLevel && (
              <span className="error">{errors.yearLevel}</span>
            )}
            <label htmlFor="semester">
              Semester<span className="required">*</span>
            </label>
            <select
              id="semester"
              name="semester"
              className="inputEnroll"
              value={formData.semester}
              onChange={handleChange}
              data-readonly={isReadOnly ? "true" : "false"}
              required
            >
              <option value="">Select Semester</option>
              <option value="First Semester">First Semester</option>
              <option value="Second Semester">Second Semester</option>
              <option value="Summer">Summer</option>
            </select>
            {errors.semester && (
              <span className="error">{errors.semester}</span>
            )}
            <label htmlFor="sex">
              Sex<span className="required">*</span>
            </label>
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
            {errors.sex && <span className="error">{errors.sex}</span>}
            <label htmlFor="contactNumber">
              Contact Number<span className="required">*</span>
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              className="inputEnroll"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
            {errors.contactNumber && (
              <span className="error">{errors.contactNumber}</span>
            )}
            <label htmlFor="facebookLink">
              Facebook Link <span className="required">*</span>
            </label>
            <input
              type="text"
              id="facebookLink"
              name="facebookLink"
              className="inputEnroll"
              value={formData.facebookLink}
              onChange={handleChange}
            />
            {errors.facebookLink && (
              <span className="error">{errors.facebookLink}</span>
            )}
            <label htmlFor="birthdate">
              Birthdate<span className="required">*</span>
            </label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              className="inputEnroll"
              value={formData.birthdate}
              onChange={handleChange}
              readOnly
              required
            />
            {errors.birthdate && (
              <span className="error">{errors.birthdate}</span>
            )}
            {formData.studentstatus === "transferee" && (
              <div className="transferee-requirements">
                <p>
                  <strong>Requirements:</strong>
                  <br />
                  - Application Form
                  <br />
                  - Transcript of Records (TOR)
                  <br />
                  - Honorable Dismissal
                  <br />
                  - Certificate of Good Moral
                  <br />
                  - NBI/Police Clearance
                  <br />
                  - Medical Results
                  <br />
                  - Medical Clearance From Campus Nurse
                  <br />
                  - Equivalency Form
                  <br />
                </p>
              </div>
            )}
            {formData.studentstatus === "freshmen" && (
              <div className="freshmen-requirements">
                <p>
                  <strong>Requirements:</strong>
                  <br />
                  - Application Form
                  <br />
                  - Medical Certificate
                  <br />
                  - Report Card
                  <br />
                  - Certificate of Good Moral
                  <br />
                  - Notice of Admission
                  <br />- Brown Envelope (A4)
                </p>
              </div>
            )}
            <br />
            {/* Download Link */}
            {(formData.studentstatus === "transferee" ||
              formData.studentstatus === "freshmen") && (
              <div className="admission-download">
                <a
                  href="/path/to/admission-form.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-link"
                >
                  Admission Form Download
                </a>
              </div>
            )}
            <br />
            {/* Button */}
            <div className="buttons-next">
              <button
                className="nextButton"
                type="button"
                onClick={handleNextStep}
              >
                {showOnlyFirstStep ? "Submit" : "Next Step"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 2: Guardian Information */}
      {currentStep === 2 && (
        <div className="enroll-step">
          <form className="enroll-form">
            <label htmlFor="guardianName">
              Guardian's Name<span className="required">*</span>
            </label>
            <input
              type="text"
              id="guardianName"
              name="guardianName"
              className="inputEnroll"
              value={formData.guardianName}
              onChange={handleChange}
              required
            />
            {errors.guardianName && (
              <span className="error">{errors.guardianName}</span>
            )}
            <label htmlFor="guardianPhone">
              Guardian's Phone Number<span className="required">*</span>
            </label>
            <input
              type="text"
              id="guardianPhone"
              name="guardianPhone"
              className="inputEnroll"
              value={formData.guardianPhone}
              onChange={handleChange}
              required
            />
            {errors.guardianPhone && (
              <span className="error">{errors.guardianPhone}</span>
            )}

            <label htmlFor="religion">
              Religion<span className="required">*</span>
            </label>
            <input
              type="text"
              id="religion"
              name="religion"
              className="inputEnroll"
              value={formData.religion}
              onChange={handleChange}
              required
            />
            {errors.religion && (
              <span className="error">{errors.religion}</span>
            )}
            <label htmlFor="section">
              Previous Section<span className="required"></span>
            </label>
            <input
              type="text"
              id="section"
              name="section"
              className="inputEnroll"
              value={formData.section}
              onChange={handleChange}
              readOnly
              required
            >
              </input>
              {errors.section && <span className="error">{errors.section}</span>}

            <div className="buttons-next">
              <button
                className="previousButton"
                type="button"
                onClick={handlePreviousStep}
              >
                Previous Step
              </button>
              <button
                className="nextButton"
                type="button"
                onClick={handleNextStep}
              >
                Next Step
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 3: Address Information */}
      {currentStep === 3 && (
        <div className="enroll-step">
          <form className="enroll-form">
            <label htmlFor="houseNumber">
              House Number<span className="required">*</span>
            </label>
            <input
              type="text"
              id="houseNumber"
              name="houseNumber"
              className="inputEnroll"
              value={formData.houseNumber}
              onChange={handleChange}
              required
            />
            {errors.houseNumber && (
              <span className="error">{errors.houseNumber}</span>
            )}
            <label htmlFor="street">
              Street<span className="required">*</span>
            </label>
            <input
              type="text"
              id="street"
              name="street"
              className="inputEnroll"
              value={formData.street}
              onChange={handleChange}
              required
            />
            {errors.street && <span className="error">{errors.street}</span>}
            <label htmlFor="subdivision">
              Subdivision<span className="required">*</span>
            </label>
            <input
              type="text"
              id="subdivision"
              name="subdivision"
              className="inputEnroll"
              value={formData.subdivision}
              onChange={handleChange}
            />
            {errors.subdivision && (
              <span className="error">{errors.subdivision}</span>
            )}
            <label htmlFor="barangay">
              Barangay<span className="required">*</span>
            </label>
            <input
              type="text"
              id="barangay"
              name="barangay"
              className="inputEnroll"
              value={formData.barangay}
              onChange={handleChange}
              required
            />
            {errors.barangay && (
              <span className="error">{errors.barangay}</span>
            )}
            <label htmlFor="municipality">
              Municipality<span className="required">*</span>
            </label>
            <input
              type="text"
              id="municipality"
              name="municipality"
              className="inputEnroll"
              value={formData.municipality}
              onChange={handleChange}
              required
            />
            {errors.municipality && (
              <span className="error">{errors.municipality}</span>
            )}
            <label htmlFor="zipCode">
              Zip Code<span className="required">*</span>
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              className="inputEnroll"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
            {errors.zipCode && <span className="error">{errors.zipCode}</span>}

            <div className="buttons-next">
              <button
                className="previousButton"
                type="button"
                onClick={handlePreviousStep}
              >
                Previous Step
              </button>
              <button
                className="nextButton"
                type="button"
                onClick={handleNextStep}
              >
                Next Step
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 4: Payment Information */}
      {currentStep === 4 && (
        <div className="enroll-step">
          <div className="qr-image-container">
            <img
              src={qrCodeImage} // Use the imported image here
              alt="QR Code"
              className="qr-image"
              draggable="false"
            />
          </div>
          <form className="enroll-form">
            <label htmlFor="mobileNumber">
              Mobile Number<span className="required">*</span>
            </label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              className="inputEnroll"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
            {errors.mobileNumber && (
              <span className="error">{errors.mobileNumber}</span>
            )}
            <label htmlFor="senderName">
              Sender Name<span className="required">*</span>
            </label>
            <input
              type="text"
              id="senderName"
              name="senderName"
              className="inputEnroll"
              value={formData.senderName}
              onChange={handleChange}
              required
            />
            {errors.senderName && (
              <span className="error">{errors.senderName}</span>
            )}
            <label htmlFor="referenceNumber">
              Reference Number<span className="required">*</span>
            </label>
            <input
              type="text"
              id="referenceNumber"
              name="referenceNumber"
              className="inputEnroll"
              value={formData.referenceNumber}
              onChange={handleChange}
              required
            />
            {errors.referenceNumber && (
              <span className="error">{errors.referenceNumber}</span>
            )}
            <label htmlFor="amount">
              Amount<span className="required">*</span>
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              className="inputEnroll"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            {errors.amount && <span className="error">{errors.amount}</span>}

            <div className="buttons-next">
              <button
                className="previousButton"
                type="button"
                onClick={handlePreviousStep}
              >
                Previous Step
              </button>
              <button
                className="nextButton"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

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

export default Enroll;
