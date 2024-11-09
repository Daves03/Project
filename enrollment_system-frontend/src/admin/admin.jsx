import React, { useState } from 'react';
import Enrollment from './EnrollmentFormContent';
import EnrollStudent from './EnrollStudentContent';
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
            case 'enrollment-form':
                return <Enrollment />;
            case 'enroll-student':
                return <EnrollStudent />;
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
                <li
                    onClick={() => setActivePage('curriculum')}
                    className={activePage === 'curriculum' ? 'active' : ''}
                >
                    <img src={curriculumIcon} alt="Curriculum" className="nav-icon" />
                    Curriculum
                </li>
                <li
                    onClick={() => setActivePage('classSchedule')}
                    className={activePage === 'classSchedule' ? 'active' : ''}
                >
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
