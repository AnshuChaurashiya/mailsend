import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// ✅ Custom hook
export const useAuth = () => useContext(AuthContext);

// ✅ Provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // wait for auth check

  // Fetch user data from backend using stored token
  const fetchUserData = async (storedToken) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${storedToken}` },
      };
      const response = await axios.get(
        "https://mailsend-spjk.onrender.com/api/users/me",
        config
      );

      if (response.status === 200) {
        const fetchedUser = response.data.user;
        setUser(fetchedUser);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(fetchedUser));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  // Load user/token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      if (savedUser) setUser(JSON.parse(savedUser));

      // refresh user info from server
      fetchUserData(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ Login handler
  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  // ✅ Logout handler
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  console.log(user)

  // ✅ Context value
  const value = {
    isAuthenticated,
    user,
    token,
    loading,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
