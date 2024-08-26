const express = require("express");
const { authenticate, checkRole } = require("../middleware/authMiddleware");
const musicController = require("../controllers/musicController");

const router = express.Router();

// Apply JWT authentication middleware to all routes
router.use(authenticate);

// CRUD routes
router.post("/", checkRole(["artist", "admin"]), musicController.createMusic);
router.get(
  "/",
  checkRole(["super_admin", "artist_manager", "artist", "admin"]),
  musicController.getAllMusic
);
router.get(
  "/artist/:artistId",
  checkRole(["super_admin", "artist_manager", "admin", "artist"]),
  musicController.getMusicByArtistId
); // New route
router.get(
  "/:id",
  checkRole(["super_admin", "artist_manager", "artist", "admin"]),
  musicController.getMusicById
);
router.put("/:id", checkRole(["artist", "admin"]), musicController.updateMusic);
router.delete(
  "/:id",
  checkRole(["artist", "admin"]),
  musicController.deleteMusic
);
router.delete(
  "/artist-songs/:artist_id",
  checkRole(["artist", "admin"]),
  musicController.deleteMusicByArtistId
);

module.exports = router;
