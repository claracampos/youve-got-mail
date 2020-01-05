const socket = io();

const { username, room, icon } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

socket.emit("join", { username, room, icon });

const messageForm = document.querySelector("#message-form");
const messageFormInput = messageForm.querySelector("input");
const messages = document.querySelector("#messages");
const messageTemplate = document.querySelector("#message-template");
const adminMessageTemplate = document.querySelector("#admin-message-template");

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

messageForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = messageFormInput.value;
  socket.emit("sendMessage", { message, username, room });
  messageFormInput.value = "";
});
