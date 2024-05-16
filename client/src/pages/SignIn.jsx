import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [formData, setFormData] = useState({});
  const [error,setError]=useState(false);
  const [message,setMessage]=useState("");
  const [loading,setLoading]=useState(false);
  const naviagte=useNavigate();
  const handleData = (e) => {
    setMessage("");
    setError(false);
    setFormData({
      ...formData,[e.target.id]:e.target.value
    })
  };
  // console.log(formData);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const res=await fetch('http://localhost:4000/api/v1/user/login',{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify(formData)
      })
      const data=await res.json();
      console.log(data);
      // setMessage(data.message);
      // if(data.success===false){
      //   setLoading(false);
      //   setError(true);
      //   return;
      // }
      setLoading(false);
      // console.log(data);
      // naviagte('/')
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl my-7 text-center font-bold ">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border p-3 rounded-lg hover:p-4"
          placeholder="username or email *"
          id="username"
          onChange={handleData}
        />
        <input
          type="password"
          className="border p-3 rounded-lg hover:p-4"
          placeholder="password*"
          id="password"
          onChange={handleData}
        />
 
        <button disabled={loading} className="bg-slate-700 p-4 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-60 cursor-pointer">
          {loading?'Loading...':'Sign In'}
        </button>
      </form>
      <div className="flex gap-3 mt-5">
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      <p className={` mt-5 uppercase ${error?'text-red-500':'text-green-500'}`} >{message}</p>
    </div>
  );
}

export default SignIn;
