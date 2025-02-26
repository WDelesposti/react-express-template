const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let notifications = [
  {
    id: 1,
    message: "Alice Johnson sent you a friend request.",
    type: "Friend Request",
    read: false,
  },
  { id: 2, message: "Bob Smith is logged.", type: "Login Alert", read: false },
  {
    id: 3,
    message: "Charlie Brown posted a new status update.",
    type: "Post Update",
    read: false,
  },
  {
    id: 4,
    message: "Alice Johnson liked your post.",
    type: "Like",
    read: false,
  },
  {
    id: 5,
    message: "Bob Smith commented your post.",
    type: "Comment",
    read: false,
  },
  {
    id: 6,
    message: "Jonathan Edward sent you a friend request.",
    type: "Friend Request",
    read: false,
  },
  {
    id: 7,
    message: "Alice Johnson mentioned you in a post.",
    type: "Mention",
    read: false,
  },
  {
    id: 8,
    message: "Bob Smith invited you to an event.",
    type: "Event Invite",
    read: false,
  },
  {
    id: 9,
    message: "Charlie Brown is logged.",
    type: "Login Alert",
    read: false,
  },
  {
    id: 10,
    message: "Alice Johnson posted a new status update.",
    type: "Post Update",
    read: false,
  },
  { id: 11, message: "Bob Smith liked your post.", type: "Like", read: false },
  {
    id: 12,
    message: "Charlie Brown commented your post.",
    type: "Comment",
    read: false,
  },
  {
    id: 13,
    message: "Jonathan Edward mentioned you in a post.",
    type: "Mention",
    read: false,
  },
  {
    id: 14,
    message: "Charlie Brown invited you to an event.",
    type: "Event Invite",
    read: false,
  },
  {
    id: 15,
    message: "Charlie Brown sent you a friend request.",
    type: "Friend Request",
    read: false,
  },
];
app.get("/api/notifications", (req, res) => {
  let { page = 1, limit = 5 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedResponse = notifications.slice(start, end);
  const totalPages = Math.ceil(notifications.length / limit);
  res.json({ notifications: paginatedResponse, totalPages });
});

app.put("/api/notifications/markAllRead", (req, res) => {
  notifications = notifications.map((notification) => ({
    ...notification,
    read: true,
  }));
  res.json({ message: "All notifications marked as read" });
});

app.put("/api/notifications/:id", (req, res) => {
  const id = parseInt(req.params.id);
  notifications = notifications.map((notification) =>
    notification.id === id ? { ...notification, read: true } : notification
  );
  res.json({ message: "Notification marked as read" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
