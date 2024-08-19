const db = require("../config/db");

/**
 * Create a new artist
 */
const createArtist = async (artistData) => {
  const {
    name,
    dob,
    gender,
    address,
    first_release_year,
    no_of_albums_released,
  } = artistData;
  const query = `
    INSERT INTO artist (name, dob, gender, address, first_release_year, no_of_albums_released)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db
      .promise()
      .query(query, [
        name,
        dob,
        gender,
        address,
        first_release_year,
        no_of_albums_released,
      ]);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Get all artists
 */
const getAllArtists = async () => {
  const query = "SELECT * FROM artist";

  try {
    const [results] = await db.promise().query(query);
    return results;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Get an artist by ID
 */
const getArtistById = async (artistId) => {
  const query = "SELECT * FROM artist WHERE id = ?";

  try {
    const [results] = await db.promise().query(query, [artistId]);
    if (results.length === 0) {
      throw new Error("Artist not found");
    }
    return results[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Update an artist by ID
 */
const updateArtist = async (artistId, artistData) => {
  const {
    name,
    dob,
    gender,
    address,
    first_release_year,
    no_of_albums_released,
  } = artistData;
  const query = `
    UPDATE artist
    SET name = ?, dob = ?, gender = ?, address = ?, first_release_year = ?, no_of_albums_released = ?
    WHERE id = ?
  `;

  try {
    const [result] = await db
      .promise()
      .query(query, [
        name,
        dob,
        gender,
        address,
        first_release_year,
        no_of_albums_released,
        artistId,
      ]);
    if (result.affectedRows === 0) {
      throw new Error("Artist not found");
    }
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Delete an artist by ID
 */
const deleteArtist = async (artistId) => {
  const query = "DELETE FROM artist WHERE id = ?";

  try {
    const [result] = await db.promise().query(query, [artistId]);
    if (result.affectedRows === 0) {
      throw new Error("Artist not found");
    }
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
};
