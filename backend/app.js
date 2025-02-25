require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route'); // Added auth routes
const candidateRoutes = require('./routes/candidate.route');
const voteRoutes = require('./routes/vote.route');
const resultsRoutes = require('./routes/result.route'); // Added results route

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Check if .env file is loading correctly
console.log("MongoDB URI:", process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); // Corrected auth route
app.use('/api/candidates', candidateRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/results', resultsRoutes); // Added results route

// Default route
app.get('/', (req, res) => {
    res.send("Welcome to the Voting System API");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
