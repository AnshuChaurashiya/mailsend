import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contex/auth.jsx";
import { FiUser, FiMail, FiLock, FiUserPlus } from "react-icons/fi";

const Register = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
      const res = await axios.post("http://localhost:5000/api/users/register", formData);
      setMessage(res.data.message || "✅ User registered successfully!");
      if (res.data.token) {
        login(
          res.data.user || {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
          res.data.token
        );
        setToken(res.data.token);
      }
      navigate("/home");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "❌ Registration failed. Please try again."
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
          <FiUserPlus className="text-4xl text-blue-600 mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
          <p className="text-gray-500 mt-1 text-sm">
            Join MailCart to send bulk emails with ease
          </p>
        </div>

        {/* Alert Message */}
        {message && (
          <p
            className={`text-center mb-4 text-sm font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Token Alert */}
        {token && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 rounded text-sm">
            <p className="text-green-800 font-medium">Token stored successfully!</p>
            <p className="text-green-600 mt-1">
              Check localStorage for verification.
            </p>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-700"
            />
          </div>

          {/* Last Name */}
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-700"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-700"
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
              placeholder="Password"
              required
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-700"
            />
          </div>

          {/* Submit Button */}
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
                Registering...
              </>
            ) : (
              <>
                <FiUserPlus className="text-lg" /> Register
              </>
            )}
          </button>
        </form>

        {/* Login Redirect */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
