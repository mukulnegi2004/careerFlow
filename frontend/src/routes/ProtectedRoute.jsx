import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectIsAuthenticated } from "../features/auth/authSelectors";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) { 
    return <Navigate to="/auth" replace />;              //React component, Used to redirect the user to another page, replace the current browser history entry instead of adding a new one
  }

  return <Outlet />;                                              //Acts as a placeholder where the child routes will be rendered
}; 

export default ProtectedRoute;