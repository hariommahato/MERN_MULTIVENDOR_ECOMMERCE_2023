import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...routeProps }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!loading && isAuthenticated === false) {
    return navigate("/login");
  }

  if (!loading && isAdmin === true && user?.role !== "admin") {
    return navigate("/login");
  }

  return <Component {...routeProps} />;
};
export default ProtectedRoute;
