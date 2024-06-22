import React, { useState } from 'react'

const Todo = ({title,description,isDone,_id}) => {
    const [checked,setChecked]=useState(false);

  return (
    <div className='bg-slate-300'>
        <input type='checkbox' checked={isDone} />
        <h2>{title}</h2>
        <p>{description}</p>
        <button>Update</button>

        <button>delete todo</button>

    </div>
  )
}

export default Todo