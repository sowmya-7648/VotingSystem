const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    party: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 18 // Ensures candidates are adults
    },
    bio: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String, // URL or filename for profile picture
        required: true
    },
    votes: {
        type: Number,
        default: 0 // Starts with 0 votes
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Candidate = mongoose.model("Candidate", CandidateSchema);
module.exports = Candidate;
