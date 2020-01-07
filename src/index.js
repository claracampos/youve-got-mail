const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  console.log("New connection");

  socket.on("join", ({ username, room, icon }, callback) => {
    const { error } = addUser({ username, room, icon, id: socket.id });

    if (error) {
      return callback(error);
    }

    socket.join(room);

    io.to(room).emit("roomData", { room: room, users: getUsersInRoom(room) });

    socket.emit("adminMessage", `Welcome, ${username}!`);
    socket
      .to(room)
      .broadcast.emit("adminMessage", `${username} has joined the chat.`);
  });

  socket.on("sendMessage", ({ message, username, room }) => {
    io.to(room).emit("message", { message, username });
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "adminMessage",
        `${user.username} has left the chat.`
      );

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Port ${port}`);
});
