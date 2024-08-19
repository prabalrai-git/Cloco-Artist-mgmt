const express = require("express");
const { authenticate, checkRole } = require("../middleware/authMiddleware");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Middleware to authenticate user
router.use(authenticate);

// CRUD routes
router.post("/", checkRole(["super_admin"]), createUser);
router.get("/", checkRole(["super_admin"]), getAllUsers);
router.get("/:id", checkRole(["super_admin"]), getUserById);
router.put("/:id", checkRole(["super_admin"]), updateUser);
router.delete("/:id", checkRole(["super_admin"]), deleteUser);

module.exports = router;
