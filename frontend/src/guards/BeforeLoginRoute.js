import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const BeforeLoginRoute = ({ component }) => {
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  return !isLogin ? component : <Navigate replace to={"/"} />;
};

export default BeforeLoginRoute;
