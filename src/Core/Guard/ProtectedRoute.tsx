import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { reactComponentModel } from "../model/reactCompoenentModel";

const ProtectedRoute = ({ children }: reactComponentModel) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  if (!loading && !isAuthenticated) {
    navigate("/login");
  }
  if (!loading && isAuthenticated) {
    return children;
  }
};

export default ProtectedRoute;
