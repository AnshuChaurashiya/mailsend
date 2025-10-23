import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/register"; // hide navbar on /register

  return (
    <>
      {!hideNavbar && <Navbar />}

      <div className="container mx-auto mt-6 max-w-7xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
