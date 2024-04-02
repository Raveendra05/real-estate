import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SwiperCore from 'swiper'
import {Swiper , SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';
import { FaShare ,FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";
import { useSelector } from 'react-redux'
import Contact from '../component/contact'
export default function Listing() {
    const params = useParams()
    SwiperCore.use([Navigation])
    const [listings , setListings] = useState(null)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    const [copied , setCopied] = useState(false)
    const { currentUser } = useSelector((state) => state.user)
    const [contact , setContact] = useState(false)
    // console.log(copied);
    useEffect(()=>{
        const fetchListing = async()=>{
               try {
                setLoading(true)
                 const res = await axios.get(`/api/listing/get-listing/${params.id}`)
                if(res?.data?.sucess){
                  setError(false)
                  setLoading(false)
                  setListings(res?.data?.userData)
                }
               } catch (error) {
                setError(true)
                setLoading(false)
                console.log(error);
               }
        }
        fetchListing();
    },[])
    console.log("listing-->" , listings);
  return (
    <main>
      {
        loading && <p className='text-center my-7 text-2xl'>Loading...</p>
      }
      {
        error && <p className='text-center my-7 text-2xl'>Something went wrong...</p>
      }
      {
        listings && !loading && !error && (
         <>
         <Swiper navigation>
          {
            listings.imageUrls.map((url)=>(
              <SwiperSlide key={url}>
                <div className='h-[550px]'
                style={{
                  background:`url(${url})  center no-repeat` ,
                  backgroundSize :"cover"
                }}
                >
                </div>
              </SwiperSlide>
            ))
          }
         </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
          <FaShare 
          className='text-slate-500'
          onClick={()=>{
            navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            setTimeout(()=>{
              setCopied(false)
            },2000)
          }}
          />
          </div>
          {
            copied && (
              <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2 '>
                Link Copied
              </p>
            )
          }
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-5'>
            <p className='text-2xl font-semibold'>
              {listings.name} - $(' ')
              {
                listings.offer ? 
                listings.discountedPrice.toLocaleString('en-US')
                :
                listings.regularPrice.toLocaleString('en-US')}
                {listings.type ==='rent'  && '/ month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm'>
            <FaMapMarkerAlt className='text-green-700'/>
            {listings.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>{listings.type === 'rent' ? 'For Rent' : 'For Sale'} </p>
              {
                listings.offer && (
                  <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>${+listings.regularPrice - +listings.discountedPrice}</p>
                )
              }
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold'>
                Description -
              </span>
              {listings.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBed className='text-lg'/>
                {listings.bedrooms >1  ?
                `${listings.bedrooms} beds `
                :`${listings.bedrooms} bed `}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBath className='text-lg'/>
                {listings.bathrooms > 1 ? 
              `${listings.bathrooms} baths `
              :
              `${listings.bathrooms} bath `  
              }
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaParking className='text-lg'/>
                {listings.parking  ? "Parking" : "No Parking"}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaChair className='text-lg'/>
                {listings.furnished ? "Furnished":"UnFurnished"}
                </li>
            </ul>
            {
              currentUser && listings.userRef !== currentUser._id && !contact &&(
                <button onClick={()=>setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 p-3'>Contact Landlord</button>
              )}
              {contact && <Contact listings={listings}/>}
          </div>
         </>
        )}
    </main>
  )}
