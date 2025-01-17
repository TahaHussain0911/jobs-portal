import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component }) => {
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  return isLogin ? component : <Navigate replace to={"/login"} />;
};

export default ProtectedRoute;
