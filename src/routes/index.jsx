import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from '../pages/home'
import About from '../pages/about'
import Profile from '../pages/profile'
import SignIn from '../pages/signIn'
import SignUp from '../pages/signUp'
export default function AllRoutes() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>}  />
    <Route path='/about' element={<About/>}  />
    <Route path='/profile' element={<Profile/>}  />
    <Route path='/signin' element={<SignIn/>}  />
    <Route path='/signup' element={<SignUp/>}  />

    </Routes>
    </>
  )
}
