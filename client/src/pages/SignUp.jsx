import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [data, setData] = useState({});
  const handleData = (e) => {
    e.preventDefault();
  };
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl my-7 text-center font-bold ">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          className="border p-3 rounded-lg hover:p-4"
          placeholder="username*"
          id="username"
          onChange={handleData}
        />
        <input
          type="text"
          className="border p-3 rounded-lg hover:p-4"
          placeholder="email*"
          id="email"
          onChange={handleData}
        />
        <input
          type="text"
          className="border p-3 rounded-lg hover:p-4"
          placeholder="password*"
          id="password"
          onChange={handleData}
        />
        <textarea
          type="text"
          className="border p-3 rounded-lg hover:p-4"
          placeholder="about"
          id="about"
          onChange={handleData}
        />
        <button className="bg-slate-700 p-4 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-60 cursor-pointer">
          Sign Up
        </button>
      </form>
      <div className="flex gap-3 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
