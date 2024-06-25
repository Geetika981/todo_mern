import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Todo = ({ title, description, isDone, _id }) => {
  const [checked, setChecked] = useState(isDone);
  const [formdata, setFormData] = useState({});
  const navigate = useNavigate();

  const handleClick = async (e) => {
    setChecked((prev) => {
      return !prev;
    });
    setFormData({ ...formdata, [e.target.id]: checked });
    const res = await fetch(`http://localhost:4000/api/v1/todo/${_id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    const data = await res.json();
    if (data.success === false) {
      return;
    }
    navigate("/todos");
  };
  console.log(checked);

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:4000/api/v1/todo/${_id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success === true) {
      navigate("/newtodo");
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl">
      <form className="rounded-xl flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex gap-8">
          <input
            className="rounded-xl p-3 "
            type="checkbox"
            id="isDone"
            checked={checked}
            onClick={handleClick}
          />
          <input
            className="rounded-xl p-3"
            id="title"
            placeholder="title"
            value={title}
          />
          </div>
          
          <button className="rounded-xl p-3 text-red-800" onClick={handleDelete}>
        Delete 
      </button>
        </div>
        <textarea
          type="text"
          className="rounded-xl p-3 w-[90%] mx-auto "
          id="description"
          placeholder="description"
          value={description}
        />
      </form>

      
    </div>
  );
};

export default Todo;
