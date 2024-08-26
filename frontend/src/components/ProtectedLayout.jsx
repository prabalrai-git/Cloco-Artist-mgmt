import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SidebarLayout from "./SidebarLayout"; // Import the SidebarLayout
import { routeRoles } from "../config/permissions";
import { message } from "antd";

const ProtectedLayout = () => {
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.user.role.role);
  const location = useLocation();

  if (!token) {
    // Redirect to login if no token is present
    return <Navigate to="/login" />;
  }

  // Check if the current route is allowed for the user's role
  const allowedRoles = routeRoles[location.pathname] || [];
  if (!allowedRoles.includes(userRole)) {
    message.info("Sorry, you do not have the required permissions");
    return <Navigate to="/artists" />; // as /artists is acessible to all roles
  }

  return <SidebarLayout />;
};

export default ProtectedLayout;
