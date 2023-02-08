const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { name, email, password, roles } = req.body;

  if (!email) return res.status(400).json({ message: "Email required." });
  if (!name) return res.status(400).json({ message: "Name required." });
  if (!password)
    return res.status(400).json({ message: "Password  required." });

  // check for duplicate email in the db
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create and store the new user
    const result = await User.create({
      name,
      email,
      password: hashedPassword,
      roles,
    });

    console.log(result);

    res.status(201).json({ success: `New user ${name} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
