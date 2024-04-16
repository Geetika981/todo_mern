import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="bg-slate-200 shadow-md ">
      <div className="flex justify-between mx-auto max-w-6xl p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-lg ">ToDoList</h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search..."
          />
          <FaSearch className="text-slate-500" />
        </form>
        <ul className="flex gap-4 ">
          <Link to={"/"}>
            <li className="hidden sm:inline text-slate-900 hover:underline">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline text-slate-900 hover:underline">
              About
            </li>
          </Link>
          <Link to={"/sign-in"}>
            <li className="  text-slate-900 hover:underline">
              Sign-in
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
