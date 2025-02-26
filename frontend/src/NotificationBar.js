import React, { useState, useEffect } from "react";
import "./NotificationBar.css";
import {
  FaBell,
  FaUserFriends,
  FaMobileAlt,
  FaRegEdit,
  FaThumbsUp,
  FaComment,
  FaAt,
  FaCalendarAlt,
} from 'react-icons/fa';

const getNotificationIcon = (type) => {
  switch (type) {
    case 'Friend Request':
      return <FaUserFriends className="notification-icon-item" />;
    case 'Login Alert':
      return <FaMobileAlt className="notification-icon-item" />;
    case 'Post Update':
      return <FaRegEdit className="notification-icon-item" />;
    case 'Like':
      return <FaThumbsUp className="notification-icon-item" />;
    case 'Comment':
      return <FaComment className="notification-icon-item" />;
    case 'Mention':
      return <FaAt className="notification-icon-item" />;
    case 'Event Invite':
      return <FaCalendarAlt className="notification-icon-item" />;
    default:
      return <FaBell className="notification-icon-item" />;
  }
};

function NotificationBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    if (dropdownOpen) {
      fetchNotifications(page);
    }
  }, [dropdownOpen, page]);

  const fetchNotifications = async (page) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/notifications?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      setNotifications(data.notifications);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}`, {
        method: "PUT",
      });
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(`http://localhost:5000/api/notifications/markAllRead`, {
        method: "PUT",
      });
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  return (
    <div className="notification-bar">
      <header className="header">
        <div className="logo">App</div>
        <div className="notification-icon" onClick={toggleDropdown}>
          <FaBell />
        </div>
      </header>
      {dropdownOpen && (
        <div className="dropdown">
          <div className="dropdown-header">
            <span> Notifications</span>
            <button onClick={markAllAsRead}>Mark all as read</button>
          </div>
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={notification.read ? "read" : "unread"}
                onClick={() => markAsRead(notification.id)}
              >
                {getNotificationIcon(notification.type)}
                <div className="notification-content">
                  <strong>{notification.type}:</strong> {notification.message}
                  <span className="time">Just now</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="pagination">
            <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
              Prev
            </button>
            <span>
              {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBar;
