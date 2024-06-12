import useAuth from "@/Hooks/useAuth";
import Loader from "@/pages/Shared/Loader/Loader";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;
  if (user) return children;
  return <Navigate to="/signin" state={{ from: location }} replace="true" />;
};



export default PrivateRoute;
