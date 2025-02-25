const User = require("../models/User");

// @desc Get user profile
// @route GET /api/users/profile
// @access Private (only logged-in users)
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private (only logged-in users)
// const updateUserProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Update fields if provided
//         user.username = req.body.username || user.username;
//         user.email = req.body.email || user.email;
//         user.age = req.body.age || user.age;
//         user.location = req.body.location || user.location;
//         user.firstName = req.body.firstName || user.firstName;
//         user.lastName = req.body.lastName || user.lastName;
//         user.phoneNo = req.body.phoneNo || user.phoneNo;

//         const updatedUser = await user.save();
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// };

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Update only provided fields
        user.username = req.body.username || user.username;
        user.phoneNo = req.body.phoneNo || user.phoneNo;
        user.age = req.body.age || user.age;
        user.location = req.body.location || user.location;
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;

        // Save updated user
        const updatedUser = await user.save();

        // Remove password before sending response
        const { password, ...userWithoutPassword } = updatedUser.toObject();

        res.status(200).json({ message: "Profile updated successfully", user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


module.exports = { getUserProfile, updateUserProfile };
