import React from 'react';
import '../css/profile.css';

const Profile = () => {
  return (
        <div className='profile-container'>
            <form className="profile-form">
                <div className="row">
                <div className="column">
                    <label htmlFor="name">Name</label>
                    <input type="text" className='inputTypes' id="name" value="Raven Ampere" readOnly />
                </div>
                <div className="column">
                    <label htmlFor="age">Age</label>
                    <input type="number" className='inputTypes' id="age" readOnly />
                </div>
                </div>
                
                <div className="row">
                <div className="column">
                    <label htmlFor="studentNumber">Student Number</label>
                    <input type="text" className='inputTypes' id="studentNumber" readOnly />
                </div>
                <div className="column">
                    <label htmlFor="studentPhoneNo">Phone Number</label>
                    <input type="number" className='inputTypes' id="studentPhoneNo" readOnly />
                </div>
                </div>

                <div className="row">
                <label htmlFor="studentAddress">Address</label>
                <input type="text" className='inputTypes' id="studentAddress" readOnly/>
                </div>

                <div className="row">
                <label htmlFor="email">Email</label>
                <input type="email" className='inputTypes' id="email" readOnly/>
                </div>

                <div className="row">
                <div className="column">
                    <label htmlFor="course">Course</label>
                    <input type="text" className='inputTypes' id="course" readOnly/>
                </div>
                <div className="column">
                    <label htmlFor="year-level">Year Level</label>
                    <input type="text" className='inputTypes' id="year-level"  readOnly/>
                </div>
                </div>

                <div className="row">
                <div className="column">
                    <label htmlFor="guardian-name">Guardian's Name</label>
                    <input type="text" className='inputTypes' id="guardian-name"  readOnly/>
                </div>
                <div className="column">
                    <label htmlFor="phone-number">Phone Number(Guardian)</label>
                    <input type="text" className='inputTypes' id="phone-number" readOnly/>
                </div>
                </div>
            </form>
        </div>
        );
    };

export default Profile;
