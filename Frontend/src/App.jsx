import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from "./pages/login.jsx";
import EmailForm from './pages/EmailForm.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Wrap hooks inside a nested component
const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/register" || location.pathname === "/login";

  return (
    <div className="container mx-auto mt-6 max-w-7xl">
      {!hideNavbar && <Navbar />} 

      <Routes>
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/email" element={<ProtectedRoute><EmailForm /></ProtectedRoute>} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
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
