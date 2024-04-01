import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SwiperCore from 'swiper'
import {Swiper , SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';
export default function Listing() {
    const params = useParams()
    SwiperCore.use([Navigation])
    const [listings , setListings] = useState(null)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
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
         </>
        )
      }
    </main>
  )
}
