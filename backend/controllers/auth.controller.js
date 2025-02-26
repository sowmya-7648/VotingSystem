const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
    const { username, email, password, phoneNo, age, location, firstName, lastName } = req.body;

    try {
        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            username, email, password: hashedPassword, phoneNo, age, location, firstName, lastName
        });

        res.status(201).json({ message: "User registered successfully", userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Login request received for:", email);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found for email:", email);
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password does not match for:", email);
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Return both token and voterId
        res.status(200).json({
            message: "Login successful",
            token,
            voterId: user._id  // Ensure voterId is included
        });

    } catch (error) {
        console.error("Login error:", error);  // Log full error
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



module.exports = { registerUser, loginUser };
