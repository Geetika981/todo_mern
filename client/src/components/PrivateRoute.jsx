import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const {currentuser} = useSelector((state) => state.user);
  console.log(currentuser);
  return (
    currentuser?<Outlet/>:<Navigate to={'/signin'}/>
    
  );
};

export default PrivateRoute;
