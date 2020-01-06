const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  console.log("New connection");

  socket.on("join", ({ username, room }) => {
    socket.join(room);

    socket.emit("adminMessage", "Welcome!");
    socket
      .to(room)
      .broadcast.emit("adminMessage", `${username} has joined the chat.`);
  });

  socket.on("sendMessage", ({ message, username, room }) => {
    io.to(room).emit("message", { message, username });
  });

  socket.on("disconnect", () => {
    io.emit("adminMessage", "A user has left the chat.");
  });
});

server.listen(port, () => {
  console.log(`Port ${port}`);
});
