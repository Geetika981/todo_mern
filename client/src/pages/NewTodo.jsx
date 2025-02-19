import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewTodo = () => {
  const [formData, setFormData] = useState({});
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/v1/todo/create", {
        credentials:'include',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(formData)
      });
      const data=await res.json();
      if(data.success==false){
        return;
      }
      navigate('/todos');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[50%] mx-auto my-[8%]  flex flex-col gap-10">
      <h1 className='font-bold mx-auto text-2xl'>CREATE NEW TODO HERE</h1>
      <form onClick={handleSubmit} className='flex flex-col gap-6'>
        <input
          type="text"
          placeholder="title"
          onChange={handleChange}
          id="title"
          className='p-3 rounded-xl'
        />
        <textarea
          type="text"
          placeholder="description"
          onChange={handleChange}
          id="description"
          className='p-3 rounded-xl'
        />
        <button type="submit" className='rounded-xl bg-blue-900 p-4 text-white uppercase'>Create Todo</button>
      </form>
    </div>
  );
}

export default NewTodo