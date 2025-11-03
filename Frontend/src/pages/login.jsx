import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contex/auth.jsx";
import { FiMail, FiLock, FiLogIn, FiUserPlus } from "react-icons/fi";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      setMessage(response.data.message || "User logged in successfully!");
      login(response.data.user || { email: formData.email }, response.data.token);
      setToken(response.data.token);
      navigate("/home");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 sm:p-10 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          <FiLogIn className="text-4xl text-blue-600 mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-1 text-sm">
            Login to access your MailCart dashboard
          </p>
        </div>

        {/* Alert message */}
        {message && (
          <p
            className={`text-center mb-4 text-sm font-medium ${
              message.includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Token alert */}
        {token && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 rounded text-sm">
            <p className="text-green-800 font-medium">
              ✅ Token stored successfully!
            </p>
            <p className="text-green-600 mt-1">
              Check localStorage for verification.
            </p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-700"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-transform duration-200 transform hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              <>
                <FiLogIn className="text-lg" /> Login
              </>
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm flex justify-center items-center gap-2">
            New user?
            <a
              href="/"
              className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              <FiUserPlus /> Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
