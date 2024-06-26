import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import ListingItem from '../component/listingItem'
export default function Search() {
    const [sidebarData  , setSidebarData]  = useState({
        searchTerm :"",
        type:"all",
        parking:false , 
        furnished:false , 
        offer:false , 
        sort:'created_at' , 
        order:'desc'
    })
    const [loading , setLoading ] = useState(false)
    const [listing , setListing] = useState([]);
    const [showMore , setShowMore] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e)=>{
        if(e.target.id === 'all' || e.target.id === 'sale' || e.target.id === 'rent'){
            setSidebarData({...sidebarData , type:e.target.id})
        }
        if(e.target.id === 'searchTerm'){
            setSidebarData({...sidebarData , searchTerm:e.target.value})
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSidebarData({...sidebarData , [e.target.id]:e.target.checked || e.target.checked === 'true' ? true : false })
        }
        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc'
            setSidebarData({...sidebarData , sort , order})
        }
    }
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        const typeFromUrl = urlParams.get('type')
        const parkingFromUrl = urlParams.get('parking')
        const furnishedFromUrl  = urlParams.get('furnished')
        const offerFromUrl = urlParams.get('offer')
        const sortFromUrl = urlParams.get('sort')
        const orderFromUrl = urlParams.get('order')

        if(searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl){
            setSidebarData({
                searchTerm : searchTermFromUrl || ' ',
                type : typeFromUrl || "all",
                parking : parkingFromUrl === 'true'  ?  true : false , 
                furnished : furnishedFromUrl === 'true' ? true :false , 
                offer : offerFromUrl === 'true' ? true :false, 
                sort : sortFromUrl || 'created_at', 
                order : orderFromUrl || 'desc'
            })
        }
        const fetchListing = async()=>{
            setLoading(true)
            setShowMore(false)
            const searchQuery = urlParams.toString();
            const res =await axios.get(`api/listing/get?${searchQuery}`)
            console.log(res)
            
            if(res.status === 200){
                setListing(res.data)
                setLoading(false) 
            }
            if(res.data.length  > 8){
                setShowMore(true)
            }
            else{
                setShowMore(false)
            }
        }
        fetchListing();
    } , [location.search])
    // console.log(listing);
    const showMoreClick = async()=>{
        const numberOfListings = listing.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('startIndex' , startIndex)
        const searchQuery = urlParams.toString();
        const res = await axios.get(`/api/listing/get?${searchQuery}`)
        if(res.data.length < 9) {
            setShowMore(false)
        }
        setListing([...listing , ...res.data])
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams =new  URLSearchParams()
        urlParams.set('searchTerm' , sidebarData.searchTerm);
        urlParams.set('type' , sidebarData.type)
        urlParams.set('parking' , sidebarData.parking)
        urlParams.set('furnished' , sidebarData.furnished)
        urlParams.set('offer' , sidebarData.offer)
        urlParams.set('sort' , sidebarData.sort)
        urlParams.set('order' , sidebarData.order)
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
                <form  onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className="flex items-center gap-2">
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <input type="text"
                            id='searchTerm'
                            placeholder='Search....'
                            className='p-3 w-full border rounded-lg'
                            onChange={handleChange}
                            value={sidebarData.searchTerm}
                        />
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Type:</label>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='all' className='w-5' onChange={handleChange}
                            checked={sidebarData.type === "all"}
                            />
                            <span>Rent & Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='rent' className='w-5' 
                            onChange={handleChange}
                            checked={sidebarData.type === 'rent'}
                            />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='sale' className='w-5' 
                            onChange={handleChange}
                            checked={sidebarData.type === 'sale'}
                            />
                            <span>Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='offer' className='w-5' 
                            onChange={handleChange}
                            checked={sidebarData.offer}
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Amenities:</label>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='parking' className='w-5'
                            onChange={handleChange}
                            checked={sidebarData.parking}
                            />
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='furnished' className='w-5'
                            onChange={handleChange}
                            checked={sidebarData.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <select id="sort_order"
                         className='border rounded-lg p-3'
                        onChange={handleChange}
                        defaultValue={'created_At_desc'}
                        >
                            <option value='regularPrice_desc'>Price High to Low</option>
                            <option value='regularPrice_asc'>Price Low to High</option>
                            <option value='createdAt_desc'>Latest</option>
                            <option value='createdAt_asc'>Oldest</option>
                        </select>
                    </div>
                    <button className='bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95'>Submit</button>
                </form>
            </div>
            <div className='flex-1'>
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-7'>listing result </h1>
                <div className='p-7 flex flex-wrap gap-4'>
                {!loading && listing.length === 0 && (
                    <p className='text-xl text-slate-700'>No Listing</p>
                )}
                {loading && (
                        <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
                )}
                {
                    !loading && listing.map((listing)=>(
                        <ListingItem key={listing._id}  listing = {listing}/>
                    ))
                }
                {
                    showMore && (
                        <button
                        onClick={showMoreClick}
                        className='text-green-700 p-4 hover:underline w-full text-center '
                        >Show More</button>
                    )
                }
            </div>
            </div>
        </div>
    )
}
