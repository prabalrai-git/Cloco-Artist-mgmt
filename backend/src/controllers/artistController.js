const artistService = require("../services/artistService");

/**
 * Create a new artist
 */
const createArtist = async (req, res) => {
  try {
    const result = await artistService.createArtist(req.body);
    res.status(201).json({ message: "Artist created successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all artists
 */
// Call the service with pagination parameters

const getAllArtists = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize, 10) || 10; // Default to 10 if not provided

  try {
    const { artists, totalCount } = await artistService.getAllArtists(
      page,
      pageSize
    );
    const totalPages = Math.ceil(totalCount / pageSize);
    res.status(200).json({
      artists,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        pageSize,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get an artist by ID
 */
const getArtistById = async (req, res) => {
  const artistId = req.params.id;

  try {
    const artist = await artistService.getArtistById(artistId);
    res.status(200).json({ artist });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Update an artist by ID
 */
const updateArtist = async (req, res) => {
  const artistId = req.params.id;

  try {
    const result = await artistService.updateArtist(artistId, req.body);
    res.status(200).json({ message: "Artist updated successfully", result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Delete an artist by ID
 */
const deleteArtist = async (req, res) => {
  const artistId = req.params.id;

  try {
    const result = await artistService.deleteArtist(artistId);
    res.status(200).json({ message: "Artist deleted successfully", result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
};
