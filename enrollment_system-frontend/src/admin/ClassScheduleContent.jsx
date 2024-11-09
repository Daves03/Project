import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../admin-css/classschedule-admin.css';

const ClassSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    code: '',
    description: '',
    units: '',
    startTime: '',
    endTime: '',
    days: '',
    room: '',
    teacher: ''
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/schedules');
      setSchedule(response.data);
    } catch (error) {
      console.error('Error fetching schedule data:', error);
    }
  };

  const handleDelete = async (code) => {
    try {
      await axios.delete(`http://localhost:8000/api/schedules/${code}`);
      setSchedule(schedule.filter((item) => item.code !== code));
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNew = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/schedules', newSchedule);
      setSchedule([...schedule, response.data]);
      setNewSchedule({
        code: '',
        description: '',
        units: '',
        startTime: '',
        endTime: '',
        days: '',
        room: '',
        teacher: ''
      });
      setShowModal(false); 
    } catch (error) {
      console.error('Error adding new schedule:', error);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="class-schedule">
      <h2 className="header-schedule">
      Class Schedule
      </h2>

      <div className="filters">
        <select className="course-selection">
          <option value="">Course</option>
          <option value="BSCS">Bachelor of Science in Computer Science</option>
          <option value="BSIT">Bachelor of Science in Information Technology</option>
        </select>
        <select className="section-selection">
          <option value="">Section</option>
          <option value="A">A</option>
        </select>
        <select className="semester-selection">
          <option value="">Semester</option>
          <option value="First Semester">First Semester</option>
          <option value="Second Semester">Second Semester</option>
        </select>
        <select className="year-selection">
          <option value="">Year</option>
          <option value="First Year">First Year</option>
          <option value="Second Year">Second Year</option>
        </select>
        <button className="add-btn" onClick={openModal}>+ Add New</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Description</th>
            <th>Units</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Days</th>
            <th>Room</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item) => (
            <tr key={item.code}>
              <td>{item.code}</td>
              <td>{item.description}</td>
              <td>{item.units}</td>
              <td>{item.startTime}</td>
              <td>{item.endTime}</td>
              <td>{item.days}</td>
              <td>{item.room}</td>
              <td>{item.teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>✖</button>
            <h2>Add New Schedule</h2>
            <div className="modal-form">
              <div className="form-column">
                <label>Course Code:</label>
                <input type="text" name="code" value={newSchedule.code} onChange={handleInputChange} />

                <label>Units:</label>
                <input type="number" name="units" value={newSchedule.units} onChange={handleInputChange} />

                <label>Start Time:</label>
                <input type="time" name="startTime" value={newSchedule.startTime} onChange={handleInputChange} />

                <label>Room:</label>
                <input type="text" name="room" value={newSchedule.room} onChange={handleInputChange} />
              </div>
              <div className="form-column">
                <label>Course Description:</label>
                <input type="text" name="description" value={newSchedule.description} onChange={handleInputChange} />

                <label>End Time:</label>
                <input type="time" name="endTime" value={newSchedule.endTime} onChange={handleInputChange} />

                <label>Days:</label>
                <input type="text" name="days" value={newSchedule.days} onChange={handleInputChange} />

                <label>Teacher:</label>
                <input type="text" name="teacher" value={newSchedule.teacher} onChange={handleInputChange} />
              </div>
            </div>
            <button className="add-schedule-btn" onClick={handleAddNew}>Add Schedule</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassSchedule;
