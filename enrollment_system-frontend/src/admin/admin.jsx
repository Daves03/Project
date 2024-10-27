import React, { useState } from 'react';
import Enrollment from './EnrollmentContent';
import Billing from './BillsContent';
import Curriculum from './CurriculumContent';
import ClassSchedule from './ClassScheduleContent';
import '../css/admin.css';

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
            <h2>Admin Panel</h2>
            <ul className='nav-links'>
                <li onClick={() => setActivePage('enrollment')}>Enrollment</li>
                <li onClick={() => setActivePage('billing')}>Billing</li>
                <li onClick={() => setActivePage('curriculum')}>Curriculum</li>
                <li onClick={() => setActivePage('classSchedule')}>Class Schedule</li>
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
