import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function CreateListing() {
    const [files, setFiles] = useState([])
    const { currentUser } = useSelector((state) => state.user)
    const [error, setError] = useState(null)
    const [uploading, setUploading] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: "",
        description: "",
        address: "",
        type: 'rent',
        furnished: false,
        parking: false,
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 500,
        discountedPrice: 0,
        offer: false,
        userRef: currentUser._id

    })
    const [loading, setLoading] = useState(false)
    const [imageUploadError, setImageUploadError] = useState(null)

    // console.log("currentuser" , currentUser);
    // console.log(formData);
    const handleImageSubmit = (e) => {
        e.preventDefault()
        setUploading(true)
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            let promises = []
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]))
            }
            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) })
                // setImageUploadSucess(false)
                setImageUploadError(false)
                setUploading(false)
            }).catch((err) => {
                setImageUploadError('image upload failed (2 mb max per image)')
                setUploading(false)
            })
        }
        else {
            setImageUploadError('you cannot upload more than 6 images per listing')
            setUploading(false)
        }
    }
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`upload is ${progress}% done`);
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                }
            )
        })
    }
    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((url, i) => i !== index),
        })
    }
    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id
            })
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }
        if (e.target.type === 'text' || e.target.type === 'textarea' || e.target.type === 'number') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1) return setError('you had to upload atleast 1 image')
            if (+formData.regularPrice < +formData.discountedPrice) return setError('discounted price should be less than regular price')
            setLoading(true)
            setError(false)
            const res = await axios.post('/api/listing/create-listing', {
                formData
            })
            console.log("res", res);
            if (res.status === 200) {
                setLoading(false);
                navigate(`/listing${res.data._id}`)
            }
        } catch (error) {
            setError(error.response.data.error.message)
            // console.log(error);
        }
    }
    return (
        <main className='p-3 max-w-4xl  mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
            <form className='flex flex-col sm:flex-row gap-3' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type="text" placeholder='Name' id='name' className='border p-3 rounded-lg' maxLength='60' minLength='3' required onChange={handleChange} value={formData.name} />
                    <textarea type="text" placeholder='Description' id='description' className='border p-3 rounded-lg' required onChange={handleChange} value={formData.description} />
                    <input type="text" placeholder='Address' id='address' className='border p-3 rounded-lg' required value={formData.address} onChange={handleChange} />
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-1'>
                            <input type="checkbox" className='w-5' id='sale' onChange={handleChange} checked={formData.type === "sale"} />
                            <span>Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" className='w-5' id='rent' onChange={handleChange} checked={formData.type === 'rent'} />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" className='w-5' id='parking' onChange={handleChange} checked={formData.parking} />
                            <span>Parking Spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" className='w-5' id='furnished' onChange={handleChange} checked={formData.furnished} />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" className='w-5' id='offer' onChange={handleChange} checked={formData.offer} />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex gap-2 items-center'>
                            <input type="number" id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'
                                onChange={handleChange} value={formData.bedrooms}
                            />
                            <p>Beds</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input type="number" id='bathrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'
                                onChange={handleChange} value={formData.bathrooms}
                            />
                            <p>Baths</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input type="number" id='regularPrice' min='1000' max='50000' required className='p-3 border border-gray-300 rounded-lg'
                                onChange={handleChange} value={formData.regularPrice}
                            />
                            <div className='flex flex-col items-center'>
                                <p>Regular Price</p>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>
                        {
                            formData.offer && (
                                <div className='flex gap-2 items-center'>
                                    <input type="number" id='discountedPrice' min='0' max='10000' required className='p-3 border border-gray-300 rounded-lg'
                                        onChange={handleChange} value={formData.discountedPrice}
                                    />
                                    <div className='flex  flex-col items-center'>
                                        <p>Discounted Price</p>
                                        <span className='text-xs'>($/ month)</span>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-3'>
                    <p className='font-semibold'>
                        Images:
                        <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                    </p>
                    <div className='flex gap-4'>
                        <input className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='images/*' multiple onChange={(e) => setFiles(e.target.files)} />
                        <button disabled = {uploading} type='button' onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80' >
                            {uploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                    <p className='text-red-600 text-sm'>{imageUploadError && imageUploadError}</p>
                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                            <div className='flex justify-between p-3 border items-center'>
                                <img src={url} key={index + 1} alt="listing page" className='w-20 h-20 object-contain rounded-lg' />
                                <button type='button' onClick={() => handleRemoveImage(index)} className='text-red-600 uppercase hover:opacity-95 '>Delete</button>
                            </div>
                        ))
                    }
                    <button disabled={uploading || loading} className='p-3 bg-slate-800 rounded-lg uppercase text-white hover:opacity-90 disabled:opacity-80'>{
                        loading ? "Listing...." : "Create Listing"
                    }</button>
                    {
                        <p className='text-red-600 text-sm'>{error && error}</p>
                    }
                </div>
            </form>
        </main>
    )
}
