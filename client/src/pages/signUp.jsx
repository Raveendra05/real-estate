import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
export default function SignUp() {
  const [formData , setFormData] = useState({})
  const [Error , setError] = useState(null)
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange=(e)=>{
    setFormData({
      ...formData , 
      [e.target.id]:e.target.value
    })
  }
  const handleSubmit=async(e)=>{
    setLoading(true)
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/signup',{formData})
      if(res.data.sucess === true){
        setLoading(false)
        setError(null)
        navigate('/signin')
      }
    } catch (error) {
      console.log("error" , error)
      setLoading(false)
      setError(error.response.data.message)
    }
  }
  // console.log("Error" , Error);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username'onChange={handleChange}/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email'onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password'onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80' type='submit'>{loading ?"Loading...":"Sign Up"}</button>
      </form>
      <div className='flex gap-2 mt-4'>
        <p>Have An Account ?</p>
        <Link to={'/signin'} className='text-blue-700'>Sign In</Link>
      </div>
      {
        Error && <p className='text-red-500 mt-5'>{Error}</p>
      }
    </div>
  )
}
