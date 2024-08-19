const jwt = require("jsonwebtoken");
const db = require("../config/db");

const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";

/**
 * Middleware to authenticate user using JWT
 */
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    // Optionally, you can fetch user details from the database if needed
    const [results] = await db
      .promise()
      .query("SELECT * FROM user WHERE id = ?", [decoded.id]);
    req.user = results[0]; // Attach user info to request object

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
const checkRole = (roles) => {
  return async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [results] = await db
      .promise()
      .query("SELECT * from roles WHERE id = ?", [decoded.id]);
    const userRole = results[0]?.role;
    if (!roles.includes(userRole)) {
      return res
        .status(403)
        .json({
          message: "You do not have permissions to perform this action",
        });
    }

    next();
  };
};

module.exports = { authenticate, checkRole };
