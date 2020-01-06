const users = [];

//user = {username, room, id, icon}

const addUser = user => {
  if (!user.username) {
    return { error: "Username required." };
  }

  if (!user.room) {
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

  if (!listedRoom(user.room)) {
    return { error: "The room you requested is not available." };
  }

  const existingUser = users.find(
    existingUser =>
      existingUser.username.trim().toLowerCase() ===
      user.username.trim().toLowerCase()
  );

  if (existingUser) {
    return { error: "The username you selected is already in use." };
  }

  const listedIcon = icon => {
    return (
      icon === "meg" || icon === "tom" || icon === "dog" || icon === "email"
    );
  };

  if (!listedIcon(user.icon)) {
    user.icon = "email";
  }

  users.push(user);
  return user;
};
