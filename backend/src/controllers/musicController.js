const musicService = require("../services/musicService");

/**
 * Create a new music record
 */
const createMusic = async (req, res) => {
  try {
    const result = await musicService.createMusic(req.body);
    res
      .status(201)
      .json({ message: "Music record created successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all music records
 */
const getAllMusic = async (req, res) => {
  console.log(req, "hey yo??");
  try {
    const music = await musicService.getAllMusic();
    res.status(200).json({ music });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get music records by artist ID
 */
const getMusicByArtistId = async (req, res) => {
  const artistId = req.params.artistId;

  try {
    const music = await musicService.getMusicByArtistId(artistId);
    res.status(200).json({ music });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Get a music record by ID
 */
const getMusicById = async (req, res) => {
  const musicId = req.params.id;

  try {
    const music = await musicService.getMusicById(musicId);
    res.status(200).json({ music });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Update a music record by ID
 */
const updateMusic = async (req, res) => {
  const musicId = req.params.id;

  try {
    const result = await musicService.updateMusic(musicId, req.body);
    res
      .status(200)
      .json({ message: "Music record updated successfully", result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Delete a music record by ID
 */
const deleteMusic = async (req, res) => {
  const musicId = req.params.id;

  try {
    const result = await musicService.deleteMusic(musicId);
    res
      .status(200)
      .json({ message: "Music record deleted successfully", result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const deleteMusicByArtistId = async (req, res) => {
  const artist_id = req.params.artist_id;

  try {
    const result = await musicService.deleteMusicByArtistId(artist_id);
    res
      .status(200)
      .json({ message: "Music record deleted successfully", result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createMusic,
  getAllMusic,
  getMusicByArtistId,
  getMusicById,
  updateMusic,
  deleteMusic,
  deleteMusicByArtistId,
};
