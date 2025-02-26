const mongoose = require("mongoose");
const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");

// @desc Cast a vote
// @route POST /api/votes
// @access Private (Only logged-in users)
const castVote = async (req, res) => {
    const session = await mongoose.startSession(); // Start transaction session
    session.startTransaction();

    try {
        const { voterId, candidateId } = req.body;

        if (!voterId || !candidateId) {
            return res.status(400).json({ message: "Both voterId and candidateId are required" });
        }

        // ✅ Check if candidate exists
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // ✅ Check if user has already voted
        const existingVote = await Vote.findOne({ voterId });
        if (existingVote) {
            return res.status(400).json({ message: "You have already voted" });
        }

        // ✅ Register the vote
        await Vote.create([{ voterId, candidateId }], { session });

        // ✅ Update candidate's vote count
        await Candidate.findByIdAndUpdate(candidateId, { $inc: { votes: 1 } }, { session });

        await session.commitTransaction(); // Commit transaction
        session.endSession(); // End session

        res.status(201).json({ message: "Vote cast successfully" });
    } catch (error) {
        await session.abortTransaction(); // Rollback transaction if error
        session.endSession(); // End session
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { castVote };
