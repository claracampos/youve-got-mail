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
    username: username,
    timestamp: moment(message.createdAt).format("hh:mm A")
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
  const roomTitle = room => {
    switch (room) {
      case "nyc":
        return "New York City";
      case "over-30":
        return "Over 30";
      case "shop-corner":
        return "Shop Around The Corner";
      case "fox-books":
        return "Fox Books";
      default:
        return "You've Got Mail!";
    }
  };
  const newUserList = Mustache.render(html, {
    room: roomTitle(room),
    users: users,
    count: users.length
  });
  userList.innerHTML = newUserList;
});

messageForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  if (message) {
    socket.emit("sendMessage", { message, username, room });
    e.target.elements.message.value = "";
  }
});
