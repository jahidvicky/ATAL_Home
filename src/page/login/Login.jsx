import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../../API/Api";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { isAuthenticated } = useAuth();
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await API.post("/customer-login", formData, {
                headers: { "Content-Type": "application/json" },
            });
            // Save token + user info (localStorage or Redux)
            // localStorage.setItem("user", JSON.stringify(res.data.customer.id));
            localStorage.setItem("user", res.data.customer.id);
            localStorage.setItem("token", res.data.token);
            isAuthenticated;

            navigate("/"); // redirect to homepage
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
                    Sign In
                </h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="Enter your email"
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="Enter your password"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-black text-white py-2 rounded-lg font-semibold transition-colors"
                >
                    Login
                </button>

                {/* Register Link */}
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-red-600 hover:underline cursor-pointer"
                    >
                        Register
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Login;
