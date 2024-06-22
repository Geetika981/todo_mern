import React from "react";
import { logoutSuccess,logoutFailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
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
    <div>
      <button onClick={logoutHandler}>logout</button>
    </div>
  );
};

export default Profile;
