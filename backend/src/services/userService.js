const db = require("../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/**
 * Create a new user
 */
const createUser = async (userData) => {
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
 * Get all users
 */
const getAllUsers = async (page = 1, pageSize = 10) => {
  const offset = (page - 1) * pageSize;

  const query = `
    SELECT u.id, u.first_name, u.last_name, u.email, u.phone, u.dob, u.gender, u.address, u.created_at, u.updated_at, r.role
    FROM user u
    LEFT JOIN roles r ON u.role_id = r.id
    LIMIT ? OFFSET ?
  `;

  const countQuery = `SELECT COUNT(*) as count FROM user`;

  try {
    const [results] = await db.promise().query(query, [pageSize, offset]);

    const [[{ count }]] = await db.promise().query(countQuery);

    return { users: results, totalCount: count };
  } catch (err) {
    throw new Error(err.message);
  }
};

const getRoles = async () => {
  const query = "SELECT * FROM roles";

  try {
    const [results] = await db.promise().query(query);
    console.log(results, "hey ohh");
    return results;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

/**
 * Get a user by ID
 */
const getUserById = async (userId) => {
  const query = "SELECT * FROM user WHERE id = ?";

  try {
    const [results] = await db.promise().query(query, [userId]);
    if (results.length === 0) {
      throw new Error("User not found");
    }
    return results[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Update a user by ID
 */
const updateUser = async (userId, userData) => {
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
  const query = `
    UPDATE user
    SET first_name = ?, last_name = ?, email = ?, password = ?, phone = ?, dob = ?, gender = ?, address = ?, role_id = ?
    WHERE id = ?
  `;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

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
        userId,
      ]);
    if (result.affectedRows === 0) {
      throw new Error("User not found");
    }
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Delete a user by ID
 */
const deleteUser = async (userId) => {
  const query = "DELETE FROM user WHERE id = ?";

  try {
    const [result] = await db.promise().query(query, [userId]);
    if (result.affectedRows === 0) {
      throw new Error("User not found");
    }
    return result;
  } catch (err) {
    throw new Error(err.message);
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
