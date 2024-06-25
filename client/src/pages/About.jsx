import React from 'react'
import { useSelector } from 'react-redux'

function About() {
  const {currentuser}=useSelector(state=>state.user);
  return (
    <div className='w-[70%] mx-auto my-[5%] rounded-xl text-wrap'>
      <h1 className='text-3xl p-4 '>Know more about {currentuser.username}</h1>
    <div className='w-[100%] bg-slate-300 mx-auto h-auto my-[5%] rounded-xl '>
      <p className='font-serif p-4 '>
         {currentuser.about}
      </p>
    </div>
    </div>
  )
}

export default About