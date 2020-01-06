const socket = io();

const { username, room, icon } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

socket.emit("join", { username, room, icon }, error => {
  if (error) {
    alert(error);
    location.replace("/");
  }
});

const messageForm = document.querySelector("#message-form");
const messages = document.querySelector("#messages");
const userList = document.querySelector("#user-list");
const messageTemplate = document.querySelector("#message-template");
const adminMessageTemplate = document.querySelector("#admin-message-template");
const userListTemplate = document.querySelector("#user-list-template");

socket.on("message", ({ message, username }) => {
  const html = messageTemplate.innerHTML;
  const newMessage = Mustache.render(html, {
    message: message,
    username: username
  });
  messages.insertAdjacentHTML("beforeend", newMessage);
});

socket.on("adminMessage", message => {
  const html = adminMessageTemplate.innerHTML;
  const newMessage = Mustache.render(html, { message: message });
  messages.insertAdjacentHTML("beforeend", newMessage);
});

socket.on("roomData", ({ room, users }) => {
  const html = userListTemplate.innerHTML;
  const newUserList = Mustache.render(html, { room: room, users: users });
  userList.innerHTML = newUserList;
});

messageForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  socket.emit("sendMessage", { message, username, room });
  e.target.elements.message.value = "";
});
