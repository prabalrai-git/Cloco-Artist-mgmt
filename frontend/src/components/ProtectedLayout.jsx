import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import SidebarLayout from "./SidebarLayout"; // Import the SidebarLayout

const ProtectedLayout = () => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    // Redirect to login if no token is present
    return <Navigate to="/login" />;
  }

  return <SidebarLayout />; // Use SidebarLayout instead of direct content
};

export default ProtectedLayout;
