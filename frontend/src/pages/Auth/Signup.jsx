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
        try {
            await axios.post("http://localhost:8080/api/auth/register", formData);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold">Register</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleRegister} className="flex flex-col space-y-4">
                <input name="username" placeholder="Username" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <input name="phoneNo" placeholder="Phone No" onChange={handleChange} required />
                <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
                <input name="location" placeholder="Location" onChange={handleChange} required />
                <input name="firstName" placeholder="First Name" onChange={handleChange} required />
                <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
            </form>
        </div>
    );
};

export default Signup;
