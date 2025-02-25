const Candidate = require("../models/Candidate");

// @desc Add a new candidate
// @route POST /api/candidates
// @access Private (Only admins or authorized users)
const addCandidate = async (req, res) => {
    try {
        const { name, party, age, bio, image } = req.body;

        const candidate = await Candidate.create({ name, party, age, bio, image });

        res.status(201).json({ message: "Candidate added successfully", candidate });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @desc Get all candidates
// @route GET /api/candidates
// @access Public
const getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { addCandidate, getAllCandidates };
