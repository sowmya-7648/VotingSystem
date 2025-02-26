import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phoneNo: "",
        age: "",
        location: "",
        firstName: "",
        lastName: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            await axios.post("http://localhost:8080/api/auth/register", formData, { timeout: 5000 });
            alert("Registration successful!");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex h-screen w-full">
            {/* Left Side (Form) */}
            <div className="flex items-center justify-center w-full lg:w-1/2 p-8 bg-white">
                <div className="max-w-md w-full">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Create an Account</h2>
                    <p className="text-center text-gray-600 mt-2">Sign up to start voting</p>

                    {error && (
                        <p className="text-red-600 bg-red-100 border border-red-400 px-3 py-2 rounded-lg text-sm text-center mt-3">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleRegister} className="mt-6 space-y-4">
                        <input
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 p-4 text-sm shadow-md 
                                    focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 p-4 text-sm shadow-md 
                                    focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 p-4 text-sm shadow-md 
                                    focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                        <input
                            name="phoneNo"
                            placeholder="Phone No"
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 p-4 text-sm shadow-md 
                                    focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                        <input
                            name="age"
                            type="number"
                            placeholder="Age"
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 p-4 text-sm shadow-md 
                                    focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                        <input
                            name="location"
                            placeholder="Location"
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 p-4 text-sm shadow-md 
                                    focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                        <input
                            name="firstName"
                            placeholder="First Name"
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 p-4 text-sm shadow-md 
                                    focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                        <input
                            name="lastName"
                            placeholder="Last Name"
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 p-4 text-sm shadow-md 
                                    focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-rose-500 px-5 py-3 text-sm font-medium text-white 
                                    hover:bg-rose-600 transition"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Side (Image) */}
            <div className="hidden lg:flex w-1/2 h-full">
                <img
                    src="/images/login.png"
                    className="w-full h-full object-cover "
                />
            </div>
        </div>
    );
};

export default Signup;
