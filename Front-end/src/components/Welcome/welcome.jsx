import React from 'react'
import { useNavigate } from "react-router-dom";
import './welcome.css'

function Welcome() {
  
  const navigate = useNavigate()

  const handleEditName = () => {
    navigate('/')
  }

  return (
    <div className="header">
        <h1>Welcome back<br />Tony Jarvis !</h1>
        <button className="edit-button" onClick={handleEditName}>Edit Name</button>
    </div>
  )
}

export default Welcome