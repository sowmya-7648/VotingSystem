const express = require("express");
const { addCandidate, getAllCandidates } = require("../controllers/candidate.controller");

const router = express.Router();

router.post("/", addCandidate);
router.get("/", getAllCandidates);

module.exports = router;
