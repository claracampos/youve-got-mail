const socket = io();

const { username, room, icon } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const messageForm = document.querySelector("#message-form");
const messageFormInput = messageForm.querySelector("input");

messageForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = messageFormInput.value;
  console.log(`${username}: ${message}`);
  messageFormInput.value = "";
});
