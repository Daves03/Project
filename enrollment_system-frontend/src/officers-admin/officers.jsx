import React, { useState } from 'react';
import Enrollment from './EnrollmentFormContent';
import SocFee from './StudentSocFee';
import './officers-css/officers.css';
import enrollmentIcon from './assets-officers/enrollment-icon.png';
import billingIcon from './assets-officers/billing-icon.png';

const OfficersPage = () => {
    const [activePage, setActivePage] = useState('enrollment');

    const renderContent = () => {
        switch (activePage) {
            case 'enrollment-form':
                return <Enrollment />;
            case 'student-socfee':
                return <SocFee />;
            default:
                return <Enrollment />;
        }
    };

    // Sidebar Component
    const Sidebar = () => (
        <div className='sidebar-officers'>
            <h2>Officers</h2>
            <ul className='nav-links-officers'>
                <li
                    onClick={() => setActivePage('enrollment-form')}
                    className={activePage === 'enrollment-form' ? 'active' : ''}
                >
                    <img src={enrollmentIcon} alt="Enrollment" className="nav-icon-officers" />
                    Enrollment Form
                </li>
                <li
                    onClick={() => setActivePage('student-socfee')}
                    className={activePage === 'enroll-student' ? 'active' : ''}
                >
                    <img src={billingIcon} alt="Billing" className="nav-icon-officers" />
                    Society Fee
                </li>
            </ul>
        </div>
    );

    return (
        <div className='officers-container'>
            <Sidebar />
            <div className='officers-content'>
                {renderContent()}
            </div>
        </div>
    );
};

export default OfficersPage;
