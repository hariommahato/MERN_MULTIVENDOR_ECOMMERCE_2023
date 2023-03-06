import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...routeProps }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  if (!loading && isAuthenticated === false) {
    navigate("/login");
  }

  if ( isAdmin === true && user?.role !== "admin") {
    navigate("/login");
  }

  return <Component {...routeProps} />;
};
export default ProtectedRoute;
