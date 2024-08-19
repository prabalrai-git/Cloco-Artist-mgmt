const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";

/**
 * Register a new user
 */
const registerUser = async (userData) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    dob,
    gender,
    address,
    role_id,
  } = userData;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const query = `
    INSERT INTO user (first_name, last_name, email, password, phone, dob, gender, address, role_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db
      .promise()
      .query(query, [
        first_name,
        last_name,
        email,
        hashedPassword,
        phone,
        dob,
        gender,
        address,
        role_id,
      ]);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Log in a user
 */
const loginUser = async (credentials) => {
  const { email, password } = credentials;

  const query = "SELECT * FROM user WHERE email = ?";

  try {
    const [results] = await db.promise().query(query, [email]);

    if (results.length === 0) {
      throw new Error("User not found");
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ id: user.id }, jwtSecret);
    return { token, user };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { registerUser, loginUser };
