import React, { useEffect, useState } from "react";
import "../css/dashboard-student.css";
import axios from "axios";

const Schedule = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) {
      console.error("No user ID found in localStorage.");
      return;
    }

    const fetchNotifications = async () => {
      try {
        console.log(`Fetching notifications for user ID: ${userId}`);
        const response = await axios.get(
          `https://backend.cvsu.online/api/users/${userId}/notifications`
        );

        console.log("Fetched Notifications:", response.data);

        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  const removeNotification = async (notificationId) => {
    try {
      // console.log(
      //   `Attempting to delete notification with ID: ${notificationId}`
      // ); // Debug log
      const response = await axios.delete(
        `https://backend.cvsu.online/api/notifications/${notificationId}`
      );

      if (response.status === 200) {
        // console.log(
        //   `Notification with ID: ${notificationId} deleted successfully`
        // ); // Debug log
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification.id !== notificationId
          )
        );
      } else {
        console.error(
          `Failed to delete notification with ID: ${notificationId}`
        ); // Debug log
        alert("Failed to remove notification.");
      }
    } catch (error) {
      // console.error("Error removing notification:", error);
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
          <p>No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default Schedule;