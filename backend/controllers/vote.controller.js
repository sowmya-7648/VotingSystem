const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");

// @desc Cast a vote
// @route POST /api/votes
// @access Private (Only logged-in users)
const castVote = async (req, res) => {
    try {
        const { voterId, candidateId } = req.body;

        // Check if user has already voted
        const existingVote = await Vote.findOne({ voterId });
        if (existingVote) return res.status(400).json({ message: "You have already voted" });

        // Register the vote
        await Vote.create({ voterId, candidateId });

        // Update candidate's vote count
        await Candidate.findByIdAndUpdate(candidateId, { $inc: { votes: 1 } });

        res.status(201).json({ message: "Vote cast successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { castVote };
