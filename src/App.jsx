import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import Doctors from './pages/Doctors'
import MyAppoinment from './pages/MyAppoinment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Appoinment } from './pages/Appoinment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
  return (
    <div className='pt-21 mx-7 sm:mx-[10%] '>
       <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:speciality' element={<Doctors/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/my-appointments' element={<MyAppoinment/>}/>
        <Route path='/appoinment/:docId' element={<Appoinment/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}
