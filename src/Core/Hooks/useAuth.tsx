import { useContext, useEffect } from "react";
import { useState } from "react";
import StoreContext from "../../store/StoreContext";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(StoreContext);

  useEffect(() => {
    function checkAuth() {
      const authToken = localStorage.getItem("userToken") || token;
      setLoading(false);
      setIsAuthenticated(!!authToken);
    }
    checkAuth();
  }, [token]);

  return { isAuthenticated, loading };
}
