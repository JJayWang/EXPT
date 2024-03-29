const usersDB = {
  users: require("../model/user.json"),
  setUsers(data) {
    this.users = data;
  },
};

const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required!" });

  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) return res.status(409); //or res.sendStatus(409);
  try {
    const hashPwd = await bcrypt.hash(pwd, 10);
    const newUser = { username: user, password: hashPwd };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fs.writeFileSync(
      path.join(__dirname, "..", "model", "user.json"),
      JSON.stringify(usersDB.users)
    );
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
