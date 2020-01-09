const users = [];

const validateRoom = room => {
  return (
    room === "nyc" ||
    room === "shop-corner" ||
    room === "fox-books" ||
    room === "over-30"
  );
};

const validateIcon = icon => {
  return icon === "meg" || icon === "tom" || icon === "dog" || icon === "email";
};

const checkExistingUsernames = username => {
  return users.find(
    existingUser =>
      existingUser.username.trim().toLowerCase() ===
      username.trim().toLowerCase()
  );
};

const addUser = ({ username, room, id, icon }) => {
  if (!username) {
    return { error: "Username required." };
  }

  if (!room) {
    return { error: "Room required." };
  }

  if (!validateRoom(room)) {
    return { error: "The room you requested is not available." };
  }

  if (checkExistingUsernames(username)) {
    return { error: "The username you selected is already in use." };
  }

  if (!validateIcon(icon)) {
    icon = "email";
  }

  icon = `./media/${icon}.jpg`;

  const newUser = { id, username, icon, room };
  users.push(newUser);
  return newUser;
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
