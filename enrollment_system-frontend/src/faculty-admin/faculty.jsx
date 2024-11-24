import React, { useState } from 'react';
import Enrollment from './EnrollmentFormFaculty';
import StudentChecklist from './StudentChecklist';
import './faculty-css/faculty.css';
import enrollmentIcon from './assets-faculty/enrollment-icon.png';
import billingIcon from './assets-faculty/billing-icon.png';

const AdminPage = () => {
    const [activePage, setActivePage] = useState('enrollment');

    const renderContent = () => {
        switch (activePage) {
            case 'enrollment-form':
                return <Enrollment />;
            case 'student-checklist':
                return <StudentChecklist />;
            default:
                return <Enrollment />;
        }
    };

    // Sidebar Component
    const Sidebar = () => (
        <div className='sidebar-faculty'>
            <h2>Faculty Admin</h2>
            <ul className='nav-links-faculty'>
                <li
                    onClick={() => setActivePage('enrollment-form')}
                    className={activePage === 'enrollment-form' ? 'active' : ''}
                >
                    <img src={enrollmentIcon} alt="Enrollment" className="nav-icon-faculty" />
                    Enrollment Form
                </li>
                <li
                    onClick={() => setActivePage('student-checklist')}
                    className={activePage === 'student-checklist' ? 'active' : ''}
                >
                    <img src={billingIcon} alt="Billing" className="nav-icon-faculty" />
                    Student Checklist
                </li>
            </ul>
        </div>
    );

    return (
        <div className='faculty-container'>
            <Sidebar />
            <div className='faculty-content'>
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminPage;
