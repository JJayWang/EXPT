const userDB = {
  user: require("../model/user.json"),
  setUsers(data) {
    this.user = data;
  },
};

const fs = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(204);
  const refreshToken = cookie.jwt;

  const foundUser = userDB.user.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 });
    return res.sendStatus(204);
  }

  const otherUsers = userDB.user.filter(
    (person) => person.password !== foundUser.refreshToken
  );

  const currentUser = { ...foundUser, refreshToken: "" };
  userDB.setUsers([...otherUsers, currentUser]);
  await fs.writeFile(
    path.join(__dirname, "..", "model", "user.json"),
    JSON.stringify(userDB.user)
  );

  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 });
  res.sendStatus(204);
};

module.exports = { handleLogout };
