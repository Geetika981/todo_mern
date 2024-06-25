// import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Todo from "./Todo";
// import { Navigate,  } from "react-router-dom";
// /api/v1/todo

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchtodo();
  }, []);
  const handleClick = () => {
    navigate("/newtodo");
  };
  const fetchtodo = async () => {
    const res = await fetch("http://localhost:4000/api/v1/todo/all-todo", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success === false) {
      setError(data.message);
      return;
    }
    console.log(data);
    setTodos(data.data);
  };
  // fetchtodo();
  // console.log(todos);
  return (
    <div className="h-[50%] w-[70%] mx-auto my-[5%] bg-slate-300 rounded-xl p-7 flex flex-col gap-10">
      {error.length > 0 ? (
        <p className="uppercase font-bold text-3xl">{error}</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {todos &&
            todos.map((item, index) => (
              <li key={index}>
                <Todo
                  title={item.title}
                  description={item.description}
                  isDone={item.isDone}
                  _id={item._id}
                />
              </li>
            ))}
        </ul>
      )}

      <p onClick={handleClick} className="text-2xl font-bold cursor-pointer">
        Want to create new todo? <span className="text-blue-900">click here</span>{" "}
      </p>
    </div>
  );
};

export default Todos;
