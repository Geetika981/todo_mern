import React from 'react'
import { useSelector } from 'react-redux'

function About() {
  const {currentuser}=useSelector(state=>state.user);
  return (
    <div>
        {currentuser.about}
    </div>
  )
}

export default About