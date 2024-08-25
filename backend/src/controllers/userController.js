const userService = require("../services/userService");

/**
 * Create a new user
 */
const createUser = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json({ message: "User created successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all users
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a user by ID
 */
const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userService.getUserById(userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Update a user by ID
 */
const updateUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await userService.updateUser(userId, req.body);
    res.status(200).json({ message: "User updated successfully", result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Delete a user by ID
 */
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await userService.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully", result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getRoles = async (req, res) => {
  console.log("didnt hit");
  try {
    const roles = await userService.getRoles();
    res.status(200).json({ roles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getRoles,
};
