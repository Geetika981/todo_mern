import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
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
      const res=await fetch('http://localhost:4000/api/v1/user/register',{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify(formData)
      })
      const data=await res.json();
      setMessage(data.message);
      if(data.success===false){
        setLoading(false);
        setError(true);
        return;
      }
      setLoading(false);
      console.log(data);
      naviagte('/sign-in')
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl my-7 text-center font-bold ">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          type="password"
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
        <button disabled={loading} className="bg-slate-700 p-4 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-60 cursor-pointer">
          {loading?'Loading...':'Sign Up'}
        </button>
      </form>
      <div className="flex gap-3 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      <p className={` mt-5 uppercase ${error?'text-red-500':'text-green-500'}`} >{message}</p>
    </div>
  );
}

export default SignUp;
