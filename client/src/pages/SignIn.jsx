import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formdata, setFormdata] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {error,loading}=useSelector(state=>state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await fetch("http://localhost:4000/api/v1/user/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:4000",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      console.log(data);
      if (data.success == false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data.data.user));

      navigate("/todos");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  console.log(formdata);
  return (
    <div>
      <form
        className="w-[50%] mx-auto  flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="mx-auto text-3xl uppercase mt-20">Login</h1>
        <input
          id="username"
          className="p-3 mt-10 rounded-xl "
          type="text"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          id="password"
          className="p-3 rounded-xl "
          type="password"
          placeholder="password"
          onChange={handleChange}
        />

        <button disabled={loading} className="p-3 bg-blue-600 text-white rounded-xl" type="submit">
         { loading?"Loading...":"Sign-in"}
        </button>
        <div className="flex gap-4">
          <p>Don't have an account?</p>
          <Link to={"/signup"} className="text-blue-900">
            SignUp
          </Link>
        </div>
        <p className="text-red-800 italics">{error && error}</p>
      </form>

    </div>
  );
};

export default SignIn;

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import {signInStart,signInFailure,signInSuccess} from "../redux/user/userSlice.js";

// const SignIn = () => {
//   const navigate = useNavigate();
//   const dispatch=useDispatch();
//   const [formdata, setFormdata] = useState({
//     email: "",
//     password: "",
//   });
//   const handleChange = (e) => {
//     setFormdata({ ...formdata, [e.target.id]: e.target.value });
//     console.log(formdata);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(signInStart())
//       const res = await fetch("http://localhost:4000/api/v1/user/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formdata),
//       });
//       const data = await res.json();
//       console.log(data);
//       // if(data.status>=400){
//       //   dispatch(signInFailure(data))
//       //   return;
//       // }
//       // dispatch(signInSuccess(data.data.user))
//       // navigate("/about");
//     } catch (error) {
//       dispatch(signInFailure(error))
//         console.log(error);
//     }
//   };
//   return (
//     <form
//       className="w-[50%] mx-auto  flex flex-col gap-4"
//       onSubmit={handleSubmit}
//     >
//       <h1 className="mx-auto text-3xl uppercase mt-20">Login</h1>
//       <input
//         id="email"
//         className="p-3 mt-10 "
//         type="text"
//         placeholder="email"
//         onChange={handleChange}
//       />
//       <input
//         id="password"
//         className="p-3 "
//         type="password"
//         placeholder="password"
//         onChange={handleChange}
//       />

//       <button className="p-3 " type="submit">
//         SignIn
//       </button>
//       <div>
//         <p>Don't have an account?</p>
//         <Link to={"/signup"}>SignUp</Link>
//       </div>
//     </form>
//   );
// };

// export default SignIn;
