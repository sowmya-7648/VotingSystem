import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // Check if user is logged in

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("voterId");
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="w-full flex flex-row justify-between items-center px-8 py-4 bg-white shadow-md">
            {/* Left Side - Logo */}
            <Link to="/" className="text-3xl font-bold text-rose-500 hover:text-rose-700">
                VoteWise
            </Link>

            {/* Right Side - Navigation Links */}
            <div className="flex items-center gap-5 text-lg font-medium">
                {!token ? (
                    <>
                        <Link to="/login" className="hover:text-rose-700">Login</Link>
                        <Link to="/signup" className="hover:text-rose-700">Signup</Link>
                    </>
                ) : (
                    <>
                        <Link to="/candidates" className="hover:text-rose-700">Candidates</Link>
                        <Link to="/results" className="hover:text-rose-700">Results</Link>
                        <Link to="/profile" className="hover:text-rose-700">Profile</Link>
                        <Link to="/voting" className="hover:text-rose-700">Vote</Link>
                        <button onClick={handleLogout} className="text-red-600 font-semibold hover:text-red-800">
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
