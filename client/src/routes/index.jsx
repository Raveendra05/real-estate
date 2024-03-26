import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from '../pages/home'
import About from '../pages/about'
import Profile from '../pages/profile'
import SignIn from '../pages/signIn'
import SignUp from '../pages/signUp'
import NotFound from '../pages/notfound'
import PrivateRoute from '../component/privateRoute'
export default function AllRoutes() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>}  />
    <Route path='/about' element={<About/>}  />
    <Route path='/signin' element={<SignIn/>}  />
    <Route  element={<PrivateRoute/>}>
    <Route path='/profile' element={<Profile/>}  />
    </Route>
    <Route path='/signup' element={<SignUp/>}  />
    <Route path='*' element={<NotFound/>}/>
    </Routes>
    </>
  )
}
