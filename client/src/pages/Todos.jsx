// import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Todo from "./Todo";
// import { Navigate,  } from "react-router-dom";
// /api/v1/todo

const Todos = () => {
  const [todos, setTodos] = useState([]);
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
    console.log(data);
    setTodos(data.data);
  };
  // fetchtodo();
  console.log(todos);
  return (
    <div>
      <ul>
        {todos && todos.map((item,index) => (
          <li key={index} > 
            <Todo title={item.title} description={item.description} isDone={item.isDone} _id={item._id} />
          </li>
        ))}
      </ul>
      <p onClick={handleClick}>want to create new todo? click here</p>
    </div>
  );
};

export default Todos;
