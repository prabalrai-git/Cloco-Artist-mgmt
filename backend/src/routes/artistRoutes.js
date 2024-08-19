const express = require("express");
const { authenticate, checkRole } = require("../middleware/authMiddleware");
const artistController = require("../controllers/artistController");

const router = express.Router();

// Apply JWT authentication middleware to all routes
router.use(authenticate);

// CRUD routes
router.post("/", checkRole(["artist_manager"]), artistController.createArtist);
router.get(
  "/",
  checkRole(["super_admin", "artist_manager"]),
  artistController.getAllArtists
);
router.get(
  "/:id",
  checkRole(["artist_manager"]),
  artistController.getArtistById
);
router.put(
  "/:id",
  checkRole(["artist_manager"]),
  artistController.updateArtist
);
router.delete(
  "/:id",
  checkRole(["artist_manager"]),
  artistController.deleteArtist
);

module.exports = router;
