import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                email,
                password,
            });

            const { token, voterId } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("voterId", voterId);

            alert("Login successful!");
            navigate("/voting"); // Use react-router-dom's navigate instead of window.location.href
        } catch (err) {
            console.error("Login failed", err.response?.data || err);
            setError(err.response?.data?.message || "Login failed"); // Set error state instead of alert
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
