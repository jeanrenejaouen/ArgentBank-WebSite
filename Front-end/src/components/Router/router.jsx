import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "../../components/Header/header.jsx"
import Home from "../../containers/Home/home.jsx"
import Login from "../../containers/Login/login.jsx"
import Profile from "../../containers/Profil/profile.jsx"
import Error from "../../containers/Error/error.jsx"
import Footer from "../Footer/footer.jsx"
import EditUserInfo from "../EditUserInfo/editUserInfo.jsx"
import Welcome from "../Welcome/welcome.jsx"
import ProtectedRoute from "./protectedRoute.jsx"




function Router() {
  return (
    <BrowserRouter>
      <Header />    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/editUserInfo" element={<EditUserInfo />} />
            <Route path="/welcome" element={<Welcome />} />
          </Route>       
          <Route path="*" element={<Error />} />                       
        </Routes>   
      
      <Footer/>
    </BrowserRouter>
  )
}

export default Router