const { registerUser, loginUser } = require("../services/authService");

/**
 * Register a new user
 */
const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json({ message: "User registered successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Log in a user
 */
const login = async (req, res) => {
  try {
    const { token, user } = await loginUser(req.body);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { register, login };
