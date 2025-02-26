import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa"; // For profile icon

const Profile = () => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (err) {
                console.error("Failed to fetch profile");
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="bg-gray-100 h-screen flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Profile</h2>

                {user ? (
                    <div className="space-y-4">
                        {/* Profile Image or Default Icon */}
                        {user.image ? (
                            <img
                                src={user.image}
                                alt="Profile"
                                className="h-24 w-24 mx-auto rounded-full border"
                            />
                        ) : (
                            <FaUserCircle className="h-24 w-24 mx-auto text-gray-400" />
                        )}

                        {/* User Details */}
                        <p className="text-xl font-medium text-gray-700">
                            <strong>Username:</strong> {user.username}
                        </p>
                        <p className="text-lg text-gray-600">
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p className="text-lg text-gray-600">
                            <strong>Phone:</strong> {user.phoneNo}
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-600">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
