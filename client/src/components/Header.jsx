import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/user/userSlice.js";
import { Link } from "react-router-dom";
const Header = () => {
  const { currentuser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    const response = await fetch("http://localhost:4000/api/v1/user/logout");
    const data = await response.json();
    dispatch(logoutSuccess());
  };
  return (
    <header className="flex justify-between mx-auto p-4 bg-slate-300 w-[100%]">
      <div className="text-2xl">
        <Link to={"/"}> ToDoList </Link>
      </div>
      {currentuser ? (
        <ul className="flex gap-4">
          <Link to={"/about"}>
            <li>About</li>
          </Link>
          <Link to={"/todos"}>
            <li>Todos</li>
          </Link>
          <Link to={"/profile"}>
            <li>profile</li>
          </Link>

         
        </ul>
      ) : (
        <ul className="flex gap-4">
          <Link to={"/signin"}>
            <li>SignIn</li>
          </Link>
          <Link to={"/signup"}>
            <li>SignUp</li>
          </Link>
        </ul>
      )}
    </header>
  );
};

export default Header;
