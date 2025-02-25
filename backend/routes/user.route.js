const express = require("express");
const { getUserProfile, updateUserProfile } = require("../controllers/user.controller");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;  // ✅ Ensure it's `module.exports = router`
