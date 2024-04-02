import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact({listings}) {
  const [landLords , setLandLords] = useState(null)
  const [message , setMessage] = useState('')
  useEffect(()=>{
    const fetchLandLord = async ()=>{
      try {
        const res = await axios.get(`/api/user/${listings.userRef}`)
        console.log(res);
        if(res.data.sucess){
          setLandLords(res.data.rest)
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchLandLord();
  },[listings.userRef])
  const handleChange = (e)=>{
    setMessage(e.target.value)
  }
  return (
        <>
        {
          landLords && (
            <div className='flex flex-col gap-4'>
              <p>
                Contact <span className='font-semibold'>
                  {landLords.username} {'  '}
                </span>for {'  '}
                <span className='font-semibold'>{listings.name.toLowerCase()}</span>
              </p>
              <textarea name="message" id="message"  rows="2" 
              value={message} onChange={handleChange}
              placeholder='Enter Your Message Here...'
              className='w-full border rounded-lg p-3'></textarea>

              <Link to={`mailto:${landLords.email}?subject=Regarding ${listings.name}&body=${message}`} 
              className='p-3 bg-slate-700 text-white text-center uppercase rounded-lg hover:opacity-90'
              >
              Send Message
              </Link>
            </div>
          )
        }
        </>
  )
}
