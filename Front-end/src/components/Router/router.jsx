import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "../../components/Header/header.jsx"
import Home from "../../containers/Home/home.jsx"
import Login from "../../containers/Login/login.jsx"
import Profile from "../../containers/Profil/profil.jsx"
import Error from "../../containers/Error/error.jsx"
import Footer from "../Footer/footer.jsx"




function Router() {
  return (
    <BrowserRouter>
      <Header />    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profil" element={<Profile />}/>        
          <Route path="*" element={<Error />} />                       
        </Routes>   
      
      <Footer/>
    </BrowserRouter>
  )
}

export default Router