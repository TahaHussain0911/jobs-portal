import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component }) => {
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  return isLogin ? <Component /> : <Navigate replace to={"/login"} />;
};

export default ProtectedRoute;
