import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { updateUserStart, updateUserSucess, updateUserFailure, deleteUserStart, deleteUserSucess, deleteUserFailure, signOutUserStart, signOutUserFailure } from '../redux/user/userSlice'
export default function Profile() {
  const { currentUser, loading, Error } = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [sucessMessage, setSucessMessage] = useState(false)
  const [showListingError, setShowListingError] = useState(false)
  const [listings, setListings] = useState([])
  const dispatch = useDispatch()
  // console.log(formData);
  // console.log(fileUploadError);
  // console.log(file);
  //firebase storage rules
  // rules_version = '2';

  // Craft rules based on data in your Firestore database
  // allow write: if firestore.get(
  // databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
  // service firebase.storage {
  //   match /b/{bucket}/o {
  //     match /{allPaths=**} {
  //       allow read;
  //       allow write: if 
  //       request.resource.size > 2*1024 *1024 &&
  //       request.resource.contentType.matches('images/.*')
  //     }
  //   }
  // }
  // console.log(file);
  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])
  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('upload is' + progress + '% done');
      setFilePerc(Math.round(progress))
      // console.log(filePerc);
    },
      (error) => {
        setFileUploadError(true)
        // console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    )
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  // console.log(currentUser);
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // console.log("formData" , formData);
      dispatch(updateUserStart())
      const res = await axios.post(`/api/user/updateUser/${currentUser._id}`, { formData });
      if (res.status === 200) {
        dispatch(updateUserSucess(res.data))
        setSucessMessage(true)
      }
    } catch (error) {
      dispatch(updateUserFailure(error.response.data.message))
      console.log("error", error);
    }
  }
  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await axios.delete(`/api/user/deleteUser/${currentUser._id}`)
      if (res.status === 200) {
        dispatch(deleteUserSucess(res.data))
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.response.data.message))
    }
  }
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await axios.get(`/api/auth/signout`)
      if (res.status === 200) {
        dispatch(deleteUserSucess(res.data))
      }
    } catch (error) {
      dispatch(signOutUserFailure(error.response.data.message))
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingError(false)
      const res = await axios.get(`/api/user/listings/${currentUser._id}`)
      if (res.data.sucess) {
        setListings(res.data.listings)
      }
      console.log("listings", listings);
    } catch (error) {
      setShowListingError(true)
    }
  }
  const handleDeleteListing = async(listingId)=>{
    try {
      const res = await axios.delete(`/api/listing/delete-listing/${listingId}`)
      if(res.data.sucess){
        setListings((prev)=> prev.filter((listing)=>  listing._id !== listingId))
      }
    } catch (error) {
      console.log(error.message);
    } 
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar} className='rounded-full  h-24 w-24 object-cover cursor-pointer self-center mt-2'
          alt="no-image" />
        <p className='text-sm self-center'>
          {
            fileUploadError ? (
              <span className='text-red-700'>
                Error image upload ! (image must be less than 2 mb)
              </span>
            )
              : filePerc > 0 && filePerc < 100 ?
                (
                  <span className='text-slate-700'>
                    {`Uploading ${filePerc} %`}
                  </span>
                ) : filePerc === 100 ? (
                  <span className='text-green-700'>
                    Image Uploaded Sucessfully
                  </span>
                ) : ("")
          }
        </p>
        <input defaultValue={currentUser.username} id='username' type="text" placeholder='username' className='border p-3 rounded-lg' onChange={handleChange} />
        <input defaultValue={currentUser.email} id='email' type="text" placeholder='email' className='border p-3 rounded-lg' onChange={handleChange} />
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 p-3 rounded-lg text-white  uppercase hover:opacity-95 disabled:opacity-80' type='submit'>{loading ? "Loading..." : " Update"}</button>
        <Link className='bg-green-700 p-3 rounded-lg uppercase text-white text-center hover:opacity-90' to={"/create-listing"}>Create Listing</Link>
      </form>
      <div className='flex justify-between mt-4'>
        <span className='text-red-700 cursor-pointer' onClick={handleDelete}>Delete account</span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>
        {
          Error ? Error : ""
        }
      </p>
      <p className='text-green-700 mt-5'>{
        sucessMessage ? "User is updated Sucessfully" : " "
      }</p>
      <button onClick={handleShowListings} className='text-green-700 w-full'>Show Listing</button>
      <p className='text-red-700 mt-3 text-sm'>{showListingError && "Error in show the Listing"}</p>


      {
        listings && listings.length > 0 &&
        <div className='flex flex-col gap-4'>
          <h1 className='text-center text-2xl font-semibold mt-7'>Your Listings</h1>
          {listings.map((list) => (
            <div key={list._id} className=' border rounded-lg p-3 flex justify-between items-center gap-4'>
              <Link to={`/listings/${list._id}`}>
                <img src={list.imageUrls[0]} alt="no image"
                  className='w-20 h-20  object-contain rounded-lg' />
              </Link>
              <Link to={`listings/${list._id}`} className='text-slate-700 font-semibold hover:underline truncate flex-1'>
                <p className=''>{list.name}</p>
              </Link>
              <div className='flex flex-col items-center'>
                <button onClick={()=>handleDeleteListing(list._id)} className='text-red-600 uppercase'>Delete</button>
                <button className='text-green-700 uppercase'>Edit</button>
              </div>
            </div>
          ))}
        </div>

      }
    </div>
  )
}
