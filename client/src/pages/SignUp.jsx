import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate=useNavigate()
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
    about: "",
  });
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
    console.log(formdata);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/v1/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
  
      console.log(data);
      navigate('/signin');
    } catch (error) {
        console.log(error)
        navigate('/signup')
    }
  };
  return (
    <form
      className="w-[50%] mx-auto  flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <h1 className="mx-auto text-3xl uppercase mt-20">Register</h1>
      <input
        id="username"
        className="p-3 mt-10"
        type="text"
        placeholder="username "
        onChange={handleChange}
      />
      <input
        id="email"
        className="p-3 "
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
      <input
        id="about"
        className="p-3 "
        type="text"
        placeholder="about"
        onChange={handleChange}
      />
      <button className="p-3 " type="submit">
        SignUp
      </button>
      <div>
        <p>Already have an account?</p>
        <Link to={"/signin"}>SignIn</Link>
      </div>
    </form>
  );
};

export default SignUp;
