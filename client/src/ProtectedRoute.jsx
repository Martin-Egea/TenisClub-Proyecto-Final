import { useUser } from "./context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { loading, isAuthenticated } = useUser();
  //console.log(loading, isAuthenticated);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
