import React, { useState, useEffect } from "react";
import "../css/enroll-student.css";
import qrcodeImage from "../assets/qrcodeSample.jpg";
import axios from "axios";

const Enroll = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    status: "",
    email: "",
    studentNumber: "",
    lastName: "",
    firstName: "",
    middleName: "",
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
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLoggedInUser(response.data);
      } catch (error) {
        console.error("Error fetching logged-in user:", error);
      }
    };

    fetchLoggedInUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Handle visibility for Transferee and Freshmen
    if (name === "status" && (value === "transferee" || value === "freshmen")) {
      setShowOnlyFirstStep(true);
    } else if (name === "status") {
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
        "email",
        "studentNumber",
        "lastName",
        "firstName",
        "middleName",
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
      if (loggedInUser) {
        if (
          loggedInUser.email.trim().toLowerCase() !==
            formData.email.trim().toLowerCase() ||
          loggedInUser.student_number.trim() !== formData.studentNumber.trim()
        ) {
          isValid = false;
          newErrors["email"] =
            "Email or student number does not match your account.";
          newErrors["studentNumber"] =
            "Email or student number does not match your account.";
        }
      }
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
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/enroll",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Response:", response.data);
      alert("Enrollment successful!");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
        alert("Please correct the errors highlighted above.");
      } else {
        console.error("Error during enrollment:", error);
        alert("Enrollment failed. Please check your information.");
      }
    }
  };

  return (
    <div>
      {/* Step Indicator */}
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

      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <div className="enroll-step">
          <form className="enroll-form">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              className="inputEnroll"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="regular">Regular</option>
              <option value="iregular">Iregular</option>
              <option value="transferee">Transferee</option>
              <option value="freshmen">Freshmen</option>
            </select>
            {errors.status && <span className="error">{errors.status}</span>}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="inputEnroll"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}{" "}
            {/* Display error here */}
            {formData.status !== "transferee" && formData.status !== "freshmen" && (
              <>
                <label htmlFor="studentNumber">Student Number</label>
                <input
                  type="text"
                  id="studentNumber"
                  name="studentNumber"
                  className="inputEnroll"
                  value={formData.studentNumber}
                  onChange={handleChange}
                  required
                />
                {errors.studentNumber && (
                  <span className="error">{errors.studentNumber}</span>
                )}
              </>
            )}
            {/* Display error here */}
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="inputEnroll"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && (
              <span className="error">{errors.lastName[0]}</span>
            )}
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="inputEnroll"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && (
              <span className="error">{errors.firstName[0]}</span>
            )}
            <label htmlFor="middleName">Middle Name</label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              className="inputEnroll"
              value={formData.middleName}
              onChange={handleChange}
              required
            />
            {errors.middleName && (
              <span className="error">{errors.middleName[0]}</span>
            )}
            <label htmlFor="sex">Sex</label>
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
            {errors.sex && <span className="error">{errors.sex[0]}</span>}
            <label htmlFor="contactNumber">Contact Number</label>
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
              <span className="error">{errors.contactNumber[0]}</span>
            )}
            <label htmlFor="facebookLink">Facebook Link</label>
            <input
              type="text"
              id="facebookLink"
              name="facebookLink"
              className="inputEnroll"
              value={formData.facebookLink}
              onChange={handleChange}
            />
            {errors.facebookLink && (
              <span className="error">{errors.facebookLink[0]}</span>
            )}{" "}
            {/* Display error here */}
            <label htmlFor="birthdate">Birthdate</label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              className="inputEnroll"
              value={formData.birthdate}
              onChange={handleChange}
              required
            />
            {errors.birthdate && (
              <span className="error">{errors.birthdate[0]}</span>
            )}
            {formData.status === "transferee" && (
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

            {formData.status === "freshmen" && (
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
                  <br />
                  - Brown Envelope (A4)
                </p>
              </div>
            )}
            <br />
            {/* Download Link */}
            {(formData.status === "transferee" || formData.status === "freshmen") && (
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
            <label htmlFor="guardianName">Guardian's Name</label>
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
              <span className="error">{errors.guardianName[0]}</span>
            )}
            <label htmlFor="guardianPhone">Guardian's Phone Number</label>
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
              <span className="error">{errors.guardianPhone[0]}</span>
            )}

            <label htmlFor="religion">Religion</label>
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
              <span className="error">{errors.religion[0]}</span>
            )}
            <label htmlFor="previousSection">Previous Section</label>
            <select
              id="previousSection"
              name="previousSection"
              className="inputEnroll"
              value={formData.previousSection}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="1-1">1-1</option>
              <option value="1-2">1-2</option>
              <option value="1-3">1-3</option>
              <option value="1-4">1-4</option>
              <option value="1-5">1-5</option>
              <option value="1-6">1-6</option>
              <option value="1-7">1-7</option>
              <option value="2-1">2-1</option>
              <option value="2-2">2-2</option>
              <option value="2-3">2-3</option>
              <option value="2-4">2-4</option>
              <option value="2-5">2-5</option>
              <option value="2-6">2-6</option>
              <option value="2-7">2-7</option>
              <option value="3-1">3-1</option>
              <option value="3-2">3-2</option>
              <option value="3-3">3-3</option>
              <option value="3-4">3-4</option>
              <option value="3-5">3-5</option>
              <option value="3-6">3-6</option>
              <option value="3-7">3-7</option>
            </select>
            {errors.previousSection && (
              <span className="error">{errors.previousSection[0]}</span>
            )}

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
            <label htmlFor="houseNumber">House Number</label>
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
              <span className="error">{errors.houseNumber[0]}</span>
            )}
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              className="inputEnroll"
              value={formData.street}
              onChange={handleChange}
              required
            />
            {errors.street && <span className="error">{errors.street[0]}</span>}
            <label htmlFor="subdivision">Subdivision</label>
            <input
              type="text"
              id="subdivision"
              name="subdivision"
              className="inputEnroll"
              value={formData.subdivision}
              onChange={handleChange}
            />
            {errors.subdivision && (
              <span className="error">{errors.subdivision[0]}</span>
            )}
            <label htmlFor="barangay">Barangay</label>
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
              <span className="error">{errors.barangay[0]}</span>
            )}
            <label htmlFor="municipality">Municipality</label>
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
              <span className="error">{errors.municipality[0]}</span>
            )}
            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              className="inputEnroll"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
            {errors.zipCode && (
              <span className="error">{errors.zipCode[0]}</span>
            )}

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
          <form className="enroll-form">
            <label htmlFor="mobileNumber">Mobile Number</label>
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
              <span className="error">{errors.mobileNumber[0]}</span>
            )}
            <label htmlFor="senderName">Sender Name</label>
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
              <span className="error">{errors.senderName[0]}</span>
            )}
            <label htmlFor="referenceNumber">Reference Number</label>
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
              <span className="error">{errors.referenceNumber[0]}</span>
            )}
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              id="amount"
              name="amount"
              className="inputEnroll"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            {errors.amount && <span className="error">{errors.amount[0]}</span>}

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
    </div>
  );
};

export default Enroll;
