const Candidate = require("../models/Candidate");

// @desc Get election results (sorted by votes)
// @route GET /api/results
// @access Public
const getResults = async (req, res) => {
    try {
        const results = await Candidate.find().sort({ votes: -1 }); // Sort by highest votes
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { getResults };
