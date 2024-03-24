import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import AllRoutes from './routes'
import Header from './component/header'
// import Routes from './routes'
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <AllRoutes/> 
    </BrowserRouter>
  )
}
