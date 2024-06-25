import React, { useState } from "react";
import { logoutSuccess,logoutFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {updateuserStart,updateuserFailure,updateuserSuccess} from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const [formdata,setFormdata]=useState({})
  const {currentuser}=useSelector(state=>state.user);
  const {error}=useSelector(state=>state.user);
  const {loading}=useSelector(state=>state.user);
  const [updated,setUpdated]=useState(false);
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setFormdata({...formdata,[e.target.id]:e.target.value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        dispatch(updateuserStart())
        const res=await fetch(`http://localhost:4000/api/v1/user/update`,{
          credentials:'include',
          method:'PATCH',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formdata)
        })
        const data=await res.json();
          console.log(data);
          if(data.success===false){
            dispatch(updateuserFailure(data.message))
          }
          dispatch(updateuserSuccess(data.data))
          setUpdated(true);
          // navigate('/todos');
    } catch (error) {
      dispatch(updateuserFailure(error))
    }
  }
  const logoutHandler = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/v1/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch(logoutSuccess());
    } catch (error) {
      console.log(error);
    }
  };
  return (

    // {}
    <div className="w-[50%] mx-auto  flex flex-col gap-4">
      <h1 className="mx-auto text-3xl uppercase my-[7%]">Profile</h1>
      <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <input
        id="username"
        defaultValue={currentuser.username}
        className="p-3 rounded-xl"
        type="text"
        placeholder="username "
        onChange={handleChange}
      />
      <input
        id="email"
        defaultValue={currentuser.email}
        className="p-3 rounded-xl"
        type="text"
        placeholder="email"
        onChange={handleChange}
      />
      <input
        id="password"
        className="p-3 rounded-xl "
        type="password"
        placeholder="password"
        onChange={handleChange}
      />
      <textarea
        id="about"
        defaultValue={currentuser.about}
        className="p-3 rounded-xl "
        type="text"
        placeholder="about"
        onChange={handleChange}
      />
      <button disabled={loading} className="p-3 bg-blue-600 text-white rounded-xl" type="submit">
        {loading?"Loading...":"Update"}
      </button>
    </form>
      <button className="p-3 bg-red-600 text-white rounded-xl" onClick={logoutHandler}>logout</button>
      <p className="text-red-800 italic">{error && error}</p>
      {updated && <div className="text-green-800 italic">user updated successfully</div>}
    </div>
  );
};

export default Profile;
