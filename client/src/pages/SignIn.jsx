import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {signInStart,signInFailure,signInSuccess} from "../redux/user/userSlice.js";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
    // console.log(formdata);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const response = await fetch("http://localhost:4000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      if(data.status>=400){
        dispatch(signInFailure(data))
      }
      console.log(data);
      dispatch(signInSuccess(data))
      navigate("/about");
    } catch (error) {
      dispatch(signInFailure(error))
        console.log(error);
    }
  };
  return (
    <form
      className="w-[50%] mx-auto  flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <h1 className="mx-auto text-3xl uppercase mt-20">Login</h1>
      <input
        id="email"
        className="p-3 mt-10 "
        type="text"
        placeholder="email"
        onChange={handleChange}
      />
      <input
        id="password"
        className="p-3 "
        type="password"
        placeholder="password"
        onChange={handleChange}
      />

      <button className="p-3 " type="submit">
        SignIn
      </button>
      <div>
        <p>Don't have an account?</p>
        <Link to={"/signup"}>SignUp</Link>
      </div>
    </form>
  );
};

export default SignIn;
