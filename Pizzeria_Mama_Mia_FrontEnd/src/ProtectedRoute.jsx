import { Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user.token) {
    
    return <Navigate to="/login" replace />;
  }

  
  return children;
};

export default ProtectedRoute;
