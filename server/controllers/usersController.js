const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

const deleteUser = async (req, res) => {
  const { id } = req?.params;
  console.log("user id: ", id);
  if (!id) return res.status(400).json({ message: "User id required" });
  const user = await User.findOne({ _id: id }).exec();
  console.log("user is: ", user);
  if (!user) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  const result = await user.deleteOne({ _id: id });
  res.json(result);
};

const getUser = async (req, res) => {
  const id = req?.params?.id;
  if (!id) return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(user, `User ${id} is deleted`);
  console.log(`User ${id} is deleted`);
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
};
