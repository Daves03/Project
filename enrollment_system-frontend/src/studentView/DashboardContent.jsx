import React, { useEffect, useState } from "react";
import "../css/dashboard-student.css"; // Import CSS styles
import axios from "axios";

const Schedule = () => {
  const [notifications, setNotifications] = useState([]);
  const classes = [
    {
      code: "0000",
      block: "BSCS 3-1",
      subject: "DCIT 26",
      time: "11:00am - 12:00pm",
      days: "Wed",
      room: "CL1",
    },
  ];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/notifications"
        );
        // console.log("Fetched Notifications:", response.data);

        const today = new Date().toISOString().split("T")[0];

        const filteredNotifications = response.data.filter((notification) => {
          if (notification.created_at) {
            try {
              const notificationDate = new Date(notification.created_at)
                .toISOString()
                .split("T")[0];
              return notificationDate === today;
            } catch (error) {
              console.error(
                "Invalid notification date:",
                notification.created_at,
                error
              );
              return false;
            }
          } else {
            console.error("Notification without created_at:", notification);
            return false;
          }
        });

        // console.log("Filtered Notifications:", filteredNotifications);

        setNotifications(filteredNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const removeNotification = async (notificationId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/notifications/${notificationId}`
      );
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== notificationId
        )
      );
    } catch (error) {
      console.error("Error removing notification:", error);
      alert("Failed to remove notification.");
    }
  };

  return (
    <div className="schedule-container">
      <div className="notification">
        <div className="header-notification">
          <h2>Notification</h2>
        </div>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <p>{notification.message}</p>
              <button
                className="close-notif-btn"
                onClick={() => removeNotification(notification.id)}
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <p>No notifications for today.</p>
        )}
      </div>

      {/* <div className="table-container">
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
      </div> */}
    </div>
  );
};

export default Schedule;
