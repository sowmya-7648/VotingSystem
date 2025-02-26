import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                email,
                password,
            }, { timeout: 5000 });

            const { token, voterId } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("voterId", voterId);

            alert("Login successful!");
            navigate("/voting");
        } catch (err) {
            console.error("Login failed", err.response?.data || err);
            setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="flex h-screen w-full">
            {/* Left Side (Form) */}
            <div className="flex items-center justify-center w-full lg:w-1/2 p-8 bg-white">
                <div className="max-w-md w-full">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Welcome Back!</h2>
                    <p className="text-center text-gray-600 mt-2">Sign in to continue</p>

                    <form onSubmit={handleLogin} className="mt-6 space-y-4">
                        {/* Email Input */}
                        <div>
                            <input
                                type="email"
                                className="w-full rounded-lg border border-gray-300 p-4 text-sm shadow-md 
                                        focus:outline-none focus:ring-2 focus:ring-rose-400"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <input
                                type="password"
                                className="w-full rounded-lg border border-gray-300 p-4 text-sm shadow-md 
                                        focus:outline-none focus:ring-2 focus:ring-rose-400"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="text-red-600 bg-red-100 border border-red-400 px-3 py-2 rounded-lg text-sm text-center">
                                {error}
                            </p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-rose-500 px-5 py-3 text-sm font-medium text-white 
                                    hover:bg-rose-600 transition"
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Side (Image) */}
            <div className="hidden lg:flex w-1/2 h-full">
                <img
                    src="/images/login.png"
                    alt="Login Background"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default Login;
