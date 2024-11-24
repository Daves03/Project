import React, { useState } from 'react';
import Enrollment from './EnrollmentFormContent';
import EnrollStudent from './EnrollStudentContent';
import './admin-css/admin.css';
import enrollmentIcon from './assets-admin/enrollment-icon.png';
import billingIcon from './assets-admin/billing-icon.png';

const AdminPage = () => {
    const [activePage, setActivePage] = useState('enrollment');

    const renderContent = () => {
        switch (activePage) {
            case 'enrollment-form':
                return <Enrollment />;
            case 'enroll-student':
                return <EnrollStudent />;
            default:
                return <Enrollment />;
        }
    };

    // Sidebar Component
    const Sidebar = () => (
        <div className='sidebar'>
            <h2>Admin</h2>
            <ul className='nav-links'>
                <li
                    onClick={() => setActivePage('enrollment-form')}
                    className={activePage === 'enrollment-form' ? 'active' : ''}
                >
                    <img src={enrollmentIcon} alt="Enrollment" className="nav-icon" />
                    Enrollment Form
                </li>
                <li
                    onClick={() => setActivePage('enroll-student')}
                    className={activePage === 'enroll-student' ? 'active' : ''}
                >
                    <img src={billingIcon} alt="Billing" className="nav-icon" />
                    Enroll Student
                </li>
            </ul>
        </div>
    );

    return (
        <div className='admin-container'>
            <Sidebar />
            <div className='admin-content'>
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminPage;
