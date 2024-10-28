import React, { useState } from 'react';
import Enrollment from './EnrollmentContent';
import Billing from './BillsContent';
import Curriculum from './CurriculumContent';
import ClassSchedule from './ClassScheduleContent';
import '../admin-css/admin.css';
import enrollmentIcon from './assets-admin/enrollment-icon.png';
import billingIcon from './assets-admin/billing-icon.png';
import curriculumIcon from './assets-admin/curriculum-icon.png';
import classScheduleIcon from './assets-admin/schedule-icon.png';

const AdminPage = () => {
    const [activePage, setActivePage] = useState('enrollment');

    const renderContent = () => {
        switch (activePage) {
            case 'enrollment':
                return <Enrollment />;
            case 'billing':
                return <Billing />;
            case 'curriculum':
                return <Curriculum />;
            case 'classSchedule':
                return <ClassSchedule />;
            default:
                return <Enrollment />;
        }
    };

    // Sidebar Component
    const Sidebar = () => (
        <div className='sidebar'>
            <h2>Admin</h2>
            <ul className='nav-links'>
            <li onClick={() => setActivePage('enrollment')}>
                <img src={enrollmentIcon} alt="Enrollment" className="nav-icon" />
                Enrollment
            </li>
            <li onClick={() => setActivePage('billing')}>
                <img src={billingIcon} alt="Billing" className="nav-icon" />
                Billing
            </li>
            <li onClick={() => setActivePage('curriculum')}>
                <img src={curriculumIcon} alt="Curriculum" className="nav-icon" />
                Curriculum
            </li>
            <li onClick={() => setActivePage('classSchedule')}>
                <img src={classScheduleIcon} alt="Class Schedule" className="nav-icon" />
                Class Schedule
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
