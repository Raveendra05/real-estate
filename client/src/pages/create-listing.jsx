import React from 'react'

export default function CreateListing() {
    return (
        <main className='p-3 max-w-4xl  mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
            <form className='flex flex-col sm:flex-row gap-3'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type="text" placeholder='Name' id='name' className='border p-3 rounded-lg' maxLength='60' minLength='10' required />
                    <textarea type="text" placeholder='Description' id='description' className='border p-3 rounded-lg' required />
                    <input type="text" placeholder='Address' id='name' className='border p-3 rounded-lg' required />

                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-1'>
                            <input type="checkbox" className='w-5' id='sale' />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" className='w-5' id='rent' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" className='w-5' id='furnished' />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" className='w-5' id='offer' />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex gap-2 items-center'>
                            <input type="number" id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' />
                            <p>Beds</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input type="number" id='bathrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' />
                            <p>Baths</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input type="number" id='regularPrice' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' />
                            <div className='flex flex-col items-center'>
                                <p>Regular Price</p>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input type="number" id='discountedPrice' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' />
                            <div className='flex  flex-col items-center'>
                                <p>Discounted Price</p>
                                <span className='text-xs'>($/ month)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-3'>
                    <p className='font-semibold'>
                        Images:
                        <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                    </p>
                    <div className='flex gap-4'>
                        <input className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='images/*' multiple />
                        <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80' >Upload</button>
                    </div>
                    <button className='p-3 bg-slate-800 rounded-lg uppercase text-white hover:opacity-90 disabled:opacity-80'>Create Listing</button>
                </div>
            </form>
        </main>
    )
}
