import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicLayout = () => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicLayout;
