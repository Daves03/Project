import React, { useState } from 'react';
import './faculty-css/enrollment-form-faculty.css'

const Enrollment = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const students = [
        { id: 1, name: 'Raven Ampere' }
    ];

    const openModal = (student) => {
        setSelectedStudent(student);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedStudent(null);
    };

    return (
        <div className="enrollment-container">
            <h2 className="title">Enrollment Forms</h2>
            
            <table className="notification-table">
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td className="buttons-cell">
                                <button onClick={() => openModal(student)} className="view-btn">
                                    View Checklist
                                </button>
                                <button className="accept-btn">Accept</button>
                                <button className="decline-btn">Decline</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Enrollment;
