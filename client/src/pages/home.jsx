import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules'
import ListingItem from '../component/listingItem';
export default function Home() {
  const [offerListing, setOfferListing] = useState([])
  const [saleListing, setSaleListing] = useState([])
  const [rentListing, setRentListing] = useState([])
  SwiperCore.use([Navigation])
  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await axios.get('/api/listing/get?offer=true&limit=4')
        if (res?.status === 200) {
          setOfferListing(res?.data)
          fetchRentListing()
        }
      } catch (error) {
        console.log(error);
      }
    }
    // console.log(offerListing);

    const fetchRentListing = async () => {
      try {
        const res = await axios.get('/api/listing/get?type=rent&limit=4')
        if (res.status === 200) {
          // console.log(res);
          setRentListing(res.data)
          fetchSaleListing()
        }
      } catch (error) {
        console.log(error);
      }
    }
    const fetchSaleListing = async () => {
      try {
        const res = await axios.get('api/listing/get?type=sale&limit=4')
        if (res.status === 200) {
          // console.log(res);
          setSaleListing(res.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListing()
  }, [])
  return (
    <div>
      {/*top */}
      <div className='flex flex-col gap-6 p-24 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'> Find your next <span className='text-slate-500'> perfect</span>
          <br />
          place with ease
        </h1>

        <div className='text-gray-400 text-xs sm:text-sm'>
          Patidar Estate will help you find your home fast , easy  and comfortable.
          <br />
          We have wide properties available for the area you choose from.
        </div>
        <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
          Let's  Start now...
        </Link>
      </div>
      {/* swiper */}
      <Swiper navigation>
        {
          offerListing && offerListing.length > 0 &&
          offerListing.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center  no-repeat`,
                  backgroundSize: "cover"
                }}
                className='h-[500px]'

              >

              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListing && offerListing.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                Show more offers
              </Link>
            </div>
            <div className='flex flex-row flex-wrap gap-4'>
              {
                offerListing.map((listing) => (
                  <ListingItem listing={listing} />
                ))}
            </div>
          </div>
        )
        }
        {rentListing && rentListing.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Places For Rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                Show more places for Rent
              </Link>
            </div>
            <div className='flex flex-row flex-wrap gap-4'>
              {
                rentListing.map((listing) => (
                  <ListingItem listing={listing} />
                ))}
            </div>
          </div>
        )
        }
        {saleListing && saleListing.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Places For Sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                Show more options for sale
              </Link>
            </div>
            <div className='flex flex-row flex-wrap gap-4'>
              {
                saleListing.map((listing) => (
                  <ListingItem listing={listing} />
                ))}
            </div>
          </div>
        )
        }
      </div>
    </div>
  )
}
