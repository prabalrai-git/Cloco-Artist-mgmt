const db = require("../config/db");

/**
 * Create a new music record
 */
const createMusic = async (musicData) => {
  const { title, album_name, genre, artist_id } = musicData;
  const query = `
    INSERT INTO music (title, album_name, genre, artist_id)
    VALUES (?, ?, ?, ?)
  `;

  try {
    const [result] = await db
      .promise()
      .query(query, [title, album_name, genre, artist_id]);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Get all music records
 */
const getAllMusic = async () => {
  const query = "SELECT * FROM music";

  try {
    const [results] = await db.promise().query(query);
    return results;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Get music records by artist ID
 */
const getMusicByArtistId = async (artistId) => {
  const query = "SELECT * FROM music WHERE artist_id = ?";

  try {
    const [results] = await db.promise().query(query, [artistId]);
    return results;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Get a music record by ID
 */
const getMusicById = async (musicId) => {
  const query = "SELECT * FROM music WHERE id = ?";

  try {
    const [results] = await db.promise().query(query, [musicId]);
    if (results.length === 0) {
      throw new Error("Music record not found");
    }
    return results[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Update a music record by ID
 */
const updateMusic = async (musicId, musicData) => {
  const { title, album_name, genre, artist_id } = musicData;
  const query = `
    UPDATE music
    SET title = ?, album_name = ?, genre = ?, artist_id = ?
    WHERE id = ?
  `;

  try {
    const [result] = await db
      .promise()
      .query(query, [title, album_name, genre, artist_id, musicId]);
    if (result.affectedRows === 0) {
      throw new Error("Music record not found");
    }
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Delete a music record by ID
 */
const deleteMusic = async (musicId) => {
  const query = "DELETE FROM music WHERE id = ?";

  try {
    const [result] = await db.promise().query(query, [musicId]);
    if (result.affectedRows === 0) {
      throw new Error("Music record not found");
    }
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createMusic,
  getAllMusic,
  getMusicById,
  getMusicByArtistId,
  updateMusic,
  deleteMusic,
};
