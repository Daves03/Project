import React, { useState } from 'react';
import '../css/enroll.css';
import qrcodeImage from '../assets/qrcodeSample.jpg';

const Enroll = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    studentNumber: '',
    lastName: '',
    firstName: '',
    middleName: '',
    sex: '',
    contactNumber: '',
    facebookLink: '',
    birthdate: '',
    guardianName: '',
    guardianPhone: '',
    religion: '',
    previousSection: '',
    houseNumber: '',
    street: '',
    subdivision: '',
    barangay: '',
    municipality: '',
    zipCode: '',
    mobileNumber: '',
    senderName: '',
    referenceNumber: '',
    amount: '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNextStep = () => {
    // Validate fields for the current step before proceeding
    let isValid = true;

    // Basic Info Validation (Step 1)
    if (currentStep === 1) {
      const requiredFields = ['email', 'studentNumber', 'lastName', 'firstName', 'middleName', 'sex', 'contactNumber', 'birthdate'];
      requiredFields.forEach(field => {
        if (!formData[field]) {
          isValid = false;
        }
      });
    }

    // Guardian Info Validation (Step 2)
    if (currentStep === 2) {
      const requiredFields = ['guardianName', 'guardianPhone', 'religion', 'previousSection'];
      requiredFields.forEach(field => {
        if (!formData[field]) {
          isValid = false;
        }
      });
    }

    // Course Details Validation (Step 3)
    if (currentStep === 3) {
      const requiredFields = ['houseNumber', 'street', 'subdivision', 'barangay', 'municipality', 'zipCode'];
      requiredFields.forEach(field => {
        if (!formData[field]) {
          isValid = false;
        }
      });
    }

    // Payment Info Validation (Step 4)
    if (currentStep === 4) {
      const requiredFields = ['mobileNumber', 'senderName', 'referenceNumber', 'amount'];
      requiredFields.forEach(field => {
        if (!formData[field]) {
          isValid = false;
        }
      });
    }

    // Proceed to the next step if all required fields are valid
    if (isValid) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Submission logic here
    console.log('Form submitted:', formData);
    // Optionally reset form or redirect
  };

  return (
    <div>
      {/* Step Indicator */}
      <div className="step-indicator">
        <span className={currentStep === 1 ? 'active-step' : ''}></span>
        <span className={currentStep === 2 ? 'active-step' : ''}></span>
        <span className={currentStep === 3 ? 'active-step' : ''}></span>
        <span className={currentStep === 4 ? 'active-step' : ''}></span>
      </div>

      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <div className="enroll-step">
          <form className="enroll-form">
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

            <label htmlFor="facebookLink">Facebook Link</label>
            <input
              type="text"
              id="facebookLink"
              name="facebookLink"
              className="inputEnroll"
              value={formData.facebookLink}
              onChange={handleChange}
            />

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
            <div className='buttons-next'>
              <button className='nextButton' type="button" onClick={handleNextStep}>
                Next Step
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

              <div className='buttons-next'>
                <button className='previousButton' type="button" onClick={handlePreviousStep}>
                  Previous Step
                </button>
                <button className='nextButton' type="button" onClick={handleNextStep}>
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

            <label htmlFor="subdivision">Subdivision</label>
            <input
              type="text"
              id="subdivision"
              name="subdivision"
              className="inputEnroll"
              value={formData.subdivision}
              onChange={handleChange}
            />

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

              <div className='buttons-next'>
                <button className='previousButton' type="button" onClick={handlePreviousStep}>
                  Previous Step
                </button>
                <button className='nextButton' type="button" onClick={handleNextStep}>
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
          <div className="qr-container">
              <img src={qrcodeImage} alt="QR Code" className="qr-image" />
              <p>Mobile Number: 09XX-XXX-XXXX</p>
            </div>
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

            <label htmlFor="senderName">Sender's Name</label>
            <input
              type="text"
              id="senderName"
              name="senderName"
              className="inputEnroll"
              value={formData.senderName}
              onChange={handleChange}
              required
            />

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

            <div className='buttons-next'>
              <button className='previousButton' type="button" onClick={handlePreviousStep}>
                Previous Step
              </button>
              <button className='nextButton' type="button" onClick={handleSubmit}>
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
