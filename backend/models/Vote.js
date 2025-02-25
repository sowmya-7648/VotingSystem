const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    voterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // References the User model
        required: true,
        unique: true  // Ensures one vote per user
    },
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",  // References the Candidate model
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Vote = mongoose.model("Vote", VoteSchema);
module.exports = Vote;
