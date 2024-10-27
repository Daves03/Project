import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/classschedule.css'; 

const ClassSchedule = () => {
  // State to hold schedule data
  const [schedule, setSchedule] = useState([]);

  // State to hold form inputs (for adding new data)
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

  // Fetch schedule data from backend API on component mount
  useEffect(() => {
    fetchSchedule();
  }, []);

  // Function to fetch schedule data from API
  const fetchSchedule = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/schedules');
      setSchedule(response.data);
    } catch (error) {
      console.error('Error fetching schedule data:', error);
    }
  };

  // Handle delete action with API
  const handleDelete = async (code) => {
    try {
      await axios.delete(`http://localhost:8000/api/schedules/${code}`);
      setSchedule(schedule.filter((item) => item.code !== code));
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  // add new sched
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({ ...prev, [name]: value }));
  };

  // new sched via api
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
      }); // Reset form inputs
    } catch (error) {
      console.error('Error adding new schedule:', error);
    }
  };

  return (
    <div className="class-schedule">
      <h1>Class Schedule</h1>
      <p>Manage class schedule</p>

      {/* Filtering Options */}
      <div className="filters">
        <select className="course-selection">
          <option value="">Course</option>
          <option value="HRS">Bachelor of Science in Computer Science</option>
          <option value="HRS">Bachelor of Science in Information Technology</option>
        </select>
        <select className="section-selection">
          <option value="">Section</option>
          <option value="A">A</option>
        </select>
        <select className="semester-selection">
          <option value="">Semester</option>
          <option value="First Semester">First Semester</option>
          <option value="First Semester">Second Semester</option>
          <option value="First Semester">Third Semester</option>
          <option value="First Semester">Fourth Semester</option>

        </select>
        <select className="year-selection">
          <option value="">Year</option>
          <option value="First Year">First Year</option>
          <option value="First Year">Second Year</option>
          <option value="First Year">Third Year</option>
          <option value="First Year">Fourth Year</option>
        </select>
        <button className="add-btn" onClick={handleAddNew}>+ Add New</button>
      </div>

      {/* Schedule Table */}
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
            <th>Actions</th>
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
              <td>
                <button className="edit-btn">✏️</button>
                <button className="delete-btn" onClick={() => handleDelete(item.code)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassSchedule;
