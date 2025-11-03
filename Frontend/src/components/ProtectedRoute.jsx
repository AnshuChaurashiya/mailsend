 import { Navigate } from "react-router-dom";
import { useAuth } from "../contex/auth.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Wait until auth status is known
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
