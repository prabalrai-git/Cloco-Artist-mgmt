const express = require("express");
const { authenticate, checkRole } = require("../middleware/authMiddleware");
const musicController = require("../controllers/musicController");

const router = express.Router();

// Apply JWT authentication middleware to all routes
router.use(authenticate);

// CRUD routes
router.post("/", checkRole(["artist"]), musicController.createMusic);
router.get(
  "/",
  checkRole(["super_admin", "artist_manager", "artist"]),
  musicController.getAllMusic
);
router.get(
  "/artist/:artistId",
  checkRole(["super_admin", "artist_manager"]),
  musicController.getMusicByArtistId
); // New route
router.get(
  "/:id",
  checkRole(["super_admin", "artist_manager", "artist"]),
  musicController.getMusicById
);
router.put("/:id", checkRole(["artist"]), musicController.updateMusic);
router.delete("/:id", checkRole(["artist"]), musicController.deleteMusic);

module.exports = router;
