import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate=useNavigate()
  const [formdata, setFormdata] = useState({});
  const [error,setError]=useState(false);
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  // console.log(formdata);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const response = await fetch("http://localhost:4000/api/v1/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      if(data.success==false){
          setError(true);
          return;
      }
  
      console.log(data);
      navigate('/signin');
    } catch (error) {
      setError(true);
        console.log(error)
        // navigate('/signup')
    }
  };
  return (
    <div className="w-[50%] mx-auto  flex flex-col gap-4">
      <h1 className="mx-auto text-3xl uppercase mt-20">Register</h1>
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
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
      <button className="p-3" type="submit">
        SignUp
      </button>
    </form>
      <div>
        <p>Already have an account?</p>
        <Link to={"/signin"} className="font-serif ">SignIn</Link>
      </div>
      <p>{error && "Something went wrong"}</p>
    </div>
  );
};

export default SignUp;
