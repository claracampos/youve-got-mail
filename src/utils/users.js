const users = [];

//user = {username, room, id, icon}
const addUser = ({ username, room, id, icon }) => {
  if (!username) {
    return { error: "Username required." };
  }

  if (!room) {
    return { error: "Room required." };
  }

  const listedRoom = room => {
    return (
      room === "nyc" ||
      room === "shop-corner" ||
      room === "fox-books" ||
      room === "over-30"
    );
  };

  if (!listedRoom(room)) {
    return { error: "The room you requested is not available." };
  }

  const existingUser = users.find(
    existingUser =>
      existingUser.username.trim().toLowerCase() ===
      username.trim().toLowerCase()
  );

  if (existingUser) {
    return { error: "The username you selected is already in use." };
  }

  const listedIcon = icon => {
    return (
      icon === "meg" || icon === "tom" || icon === "dog" || icon === "email"
    );
  };

  if (!listedIcon(icon)) {
    icon = "email";
  }

  users.push({ id, username, icon, room });
  return "User added";
};

const getUsersInRoom = room => {
  return users.filter(existingUser => existingUser.room === room);
};

const removeUser = id => {
  const userIndex = users.findIndex(existingUser => existingUser.id === id);

  if (userIndex !== -1) {
    return users.splice(userIndex, 1)[0];
  }
};

module.exports = {
  addUser,
  getUsersInRoom,
  removeUser
};
