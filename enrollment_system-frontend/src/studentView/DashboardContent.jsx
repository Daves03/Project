import React from 'react';
import '../css/dashboard-student.css'; // Import CSS styles

const Schedule = () => {
  const classes = [
    { code: '0000', block: 'BSCS 3-1', subject: 'DCIT 26', time: '11:00am - 12:00pm', days: 'Wed', room: 'CL1' }
  ];

  return (
    <div className="schedule-container">
        <div className="notification">
            <div className="header">
                <h2>Notification</h2>
            </div>
                <p>No notification for today.</p>
        </div>

        <div className="table-container">
            <div className="header">
                <h2>Class Schedule: SY 2023-2024, 1st Trimester</h2>
            </div>
            <table>
            <thead>
                <tr>
                <th>CLASS CODE</th>
                <th>SECTION</th>
                <th>SUBJECT</th>
                <th>TIME</th>
                <th>DAYS</th>
                <th>ROOM</th>
                </tr>
            </thead>
            <tbody>
                {classes.map((classItem, index) => (
                <tr key={index}>
                    <td>{classItem.code}</td>
                    <td>{classItem.block}</td>
                    <td>{classItem.subject}</td>
                    <td>{classItem.time}</td>
                    <td>{classItem.days}</td>
                    <td>{classItem.room}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        
    </div>
  );
};

export default Schedule;
